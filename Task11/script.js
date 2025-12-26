import { searchPlaces, getWeather } from './modules/api.js';
import { iconFor, describeCode } from './modules/icons.js';
import { getState, setState, initTheme } from './modules/state.js';
import { $, setStatus, renderCurrent, renderForecast, showSuggestions } from './modules/ui.js';

initTheme('#themeBtn');

const q = $('#q');
const suggestionsBox = $('#suggestions');
const currentEl = $('#current');
const forecastEl = $('#forecast');
const statusEl = $('#status');

// Default city for first load (India TZ)
const DEFAULT_CITY = 'Vijayawada';

async function boot() {
  const st = getState();
  const query = st.lastQuery || DEFAULT_CITY;
  q.value = query;
  await lookupAndRender(query);
}

async function lookupAndRender(query) {
  if (!query || !query.trim()) return;

  setStatus(statusEl, 'info', `Searching “${query}”…`);
  currentEl.setAttribute('aria-busy', 'true');

  try {
    const results = await searchPlaces(query.trim());
    if (!results.length) {
      setStatus(statusEl, 'error', 'No results. Try a different city.');
      suggestionsBox.classList.remove('show');
      currentEl.setAttribute('aria-busy', 'false');
      return;
    }

    // show the top 5 suggestions in dropdown
    showSuggestions(suggestionsBox, results, async (picked) => {
      q.value = picked.label;
      suggestionsBox.classList.remove('show');
      await fetchAndRenderWeather(picked.lat, picked.lon, picked.label);
    });

    // also immediately fetch the first one for speed
    const top = results[0];
    await fetchAndRenderWeather(top.lat, top.lon, top.label);

    setState({ lastQuery: query });
  } catch (err) {
    console.error(err);
    setStatus(statusEl, 'error', 'Search failed. Please check your network.');
  } finally {
    currentEl.setAttribute('aria-busy', 'false');
  }
}

async function fetchAndRenderWeather(lat, lon, label) {
  setStatus(statusEl, 'info', `Loading weather for ${label}…`);

  try {
    const data = await getWeather(lat, lon);
    setStatus(statusEl, ''); // clear

    // Current
    const cur = data.current;
    renderCurrent(currentEl, {
      place: label,
      temp: cur.temperature_2m,
      feels: cur.apparent_temperature,
      wind: cur.wind_speed_10m,
      humidity: cur.relative_humidity_2m,
      code: cur.weather_code,
      desc: describeCode(cur.weather_code),
      icon: iconFor(cur.weather_code),
      time: cur.time
    });

    // Forecast (next 5 days)
    const days = data.daily.time.slice(0, 5).map((date, i) => ({
      date,
      tmax: data.daily.temperature_2m_max[i],
      tmin: data.daily.temperature_2m_min[i],
      code: data.daily.weather_code[i],
      icon: iconFor(data.daily.weather_code[i]),
      desc: describeCode(data.daily.weather_code[i]),
      prec: data.daily.precipitation_sum[i]
    }));
    renderForecast(forecastEl, days);
  } catch (err) {
    console.error(err);
    setStatus(statusEl, 'error', 'Could not load weather. Try again.');
  }
}

/* ---------- Events ---------- */
// Debounced search
let t;
q.addEventListener('input', () => {
  clearTimeout(t);
  const val = q.value.trim();
  if (!val) {
    suggestionsBox.classList.remove('show');
    return;
  }
  t = setTimeout(() => lookupAndRender(val), 400);
});

// Enter key -> force lookup top result
q.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    lookupAndRender(q.value.trim());
  }
});

// Click outside suggestions to close
document.addEventListener('click', (e) => {
  if (!suggestionsBox.contains(e.target) && e.target !== q) {
    suggestionsBox.classList.remove('show');
  }
});

// Start
boot();