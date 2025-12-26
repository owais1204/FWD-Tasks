function generateGreeting() {
    const name = document.getElementById('name').value.trim();
    const mood = document.getElementById('mood').value;
    const greetingDiv = document.getElementById('greeting');

    if (name === '' || mood === '') {
        alert('Please enter your name and select your mood');
        return;
    }

    const hour = new Date().getHours();
    let timeGreeting = '';

    // Conditional expressions based on time
    if (hour < 12) {
        timeGreeting = 'Good Morning';
    } else if (hour < 18) {
        timeGreeting = 'Good Afternoon';
    } else {
        timeGreeting = 'Good Evening';
    }

    // Mood-based message
    let moodMessage = '';
    switch (mood) {
        case 'happy':
            moodMessage = 'Keep smiling and spread positivity!';
            break;
        case 'sad':
            moodMessage = 'It’s okay to feel sad. Better days are coming.';
            break;
        case 'excited':
            moodMessage = 'Your excitement is contagious! Enjoy the moment.';
            break;
        case 'tired':
            moodMessage = 'Take some rest and recharge yourself.';
            break;
    }

    // Update DOM
    greetingDiv.className = greeting ${mood};
    greetingDiv.innerHTML = ${timeGreeting}, <strong>${name}</strong>!<br>${moodMessage};
    greetingDiv.classList.remove('hidden');
}