// ----------------------------
// Classes (OOP with inheritance)
// ----------------------------
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price; // number
  }

  get formattedPrice() {
    return `₹${this.price.toFixed(2)}`;
  }
}

class CartItem extends Product {
  constructor(product, quantity = 1) {
    super(product.id, product.name, product.price); // inherit fields
    this.quantity = quantity;
  }

  increment() {
    this.quantity += 1;
  }

  get totalPrice() {
    return this.price * this.quantity;
  }

  get formattedTotal() {
    return `₹${this.totalPrice.toFixed(2)}`;
  }
}

class Cart {
  constructor() {
    this.items = [];
  }

  add(product) {
    const existing = this.items.find((item) => item.id === product.id);
    if (existing) {
      existing.increment();
    } else {
      this.items.push(new CartItem(product));
    }
    this.save();
  }

  remove(id) {
    this.items = this.items.filter((item) => item.id !== id);
    this.save();
  }

  clear() {
    this.items = [];
    this.save();
  }

  get totalCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalAmount() {
    return this.items.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  // Save to localStorage (only id + quantity)
  save() {
    const plain = this.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));
    localStorage.setItem("miniCart-items", JSON.stringify(plain));
  }

  // Load from localStorage and rebuild CartItem objects
  load(products) {
    const stored = localStorage.getItem("miniCart-items");
    if (!stored) return;

    try {
      const raw = JSON.parse(stored);
      this.items = raw
        .map((row) => {
          const prod = products.find((p) => p.id === row.id);
          if (!prod) return null;
          return new CartItem(prod, row.quantity);
        })
        .filter(Boolean);
    } catch (err) {
      console.error("Failed to load cart data", err);
      this.items = [];
    }
  }
}

// ----------------------------
// Data (Product list)
// ----------------------------
const products = [
  new Product("p1", "Wireless Mouse", 799),
  new Product("p2", "Mechanical Keyboard", 2499),
  new Product("p3", "Noise-Cancelling Headphones", 3999),
  new Product("p4", "USB-C Hub", 1299),
];

// ----------------------------
// DOM elements
// ----------------------------
const productListEl = document.getElementById("product-list");
const cartItemsEl = document.getElementById("cart-items");
const cartCountEl = document.getElementById("cart-count");
const cartTotalEl = document.getElementById("cart-total");
const clearCartBtn = document.getElementById("clear-cart");
const themeToggleBtn = document.getElementById("theme-toggle");

const cart = new Cart();

// ----------------------------
// Render products
// ----------------------------
function renderProducts() {
  productListEl.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    const title = document.createElement("h3");
    title.className = "product-card__title";
    title.textContent = product.name;

    const price = document.createElement("p");
    price.className = "product-card__price";
    price.textContent = product.formattedPrice;

    const footer = document.createElement("div");
    footer.className = "product-card__footer";

    const tag = document.createElement("span");
    tag.textContent = "Fast delivery";
    tag.style.fontSize = "0.75rem";
    tag.style.opacity = "0.8";

    const addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "btn btn--primary";
    addBtn.textContent = "Add to cart";

    addBtn.addEventListener("click", () => {
      cart.add(product);   // OOP + cart logic
      renderCart();        // DOM update
      bumpCartCount();     // small animation
    });

    footer.appendChild(tag);
    footer.appendChild(addBtn);

    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(footer);

    productListEl.appendChild(card);
  });
}

// ----------------------------
// Render cart
// ----------------------------
function renderCart() {
  cartItemsEl.innerHTML = "";

  if (cart.items.length === 0) {
    const empty = document.createElement("li");
    empty.className = "cart-empty";
    empty.textContent = "Your cart is empty.";
    cartItemsEl.appendChild(empty);
  } else {
    cart.items.forEach((item) => {
      const li = document.createElement("li");
      li.className = "cart__item";

      const main = document.createElement("div");
      main.className = "cart__item-main";

      const name = document.createElement("span");
      name.className = "cart__item-name";
      name.textContent = item.name;

      const meta = document.createElement("span");
      meta.className = "cart__item-meta";
      meta.textContent = `Qty: ${item.quantity} × ₹${item.price.toFixed(2)}`;

      main.appendChild(name);
      main.appendChild(meta);

      const right = document.createElement("div");
      right.className = "cart__item-right";

      const price = document.createElement("span");
      price.className = "cart__item-price";
      price.textContent = item.formattedTotal;

      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "cart-remove";
      removeBtn.textContent = "×";

      removeBtn.addEventListener("click", () => {
        cart.remove(item.id);
        renderCart();
        bumpCartCount();
      });

      right.appendChild(price);
      right.appendChild(removeBtn);

      li.appendChild(main);
      li.appendChild(right);

      cartItemsEl.appendChild(li);
    });
  }

  cartCountEl.textContent = cart.totalCount;
  cartTotalEl.textContent = "₹" + cart.totalAmount.toFixed(2);
}

// Small animation when cart count changes
function bumpCartCount() {
  cartCountEl.classList.remove("cart__count--bump");
  // force reflow
  void cartCountEl.offsetWidth;
  cartCountEl.classList.add("cart__count--bump");
}

// ----------------------------
// Theme handling (CSS custom props + localStorage)
// ----------------------------
function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  themeToggleBtn.textContent = theme === "dark" ? "🌙 Dark" : "🌞 Light";
  localStorage.setItem("miniCart-theme", theme);
}

function loadTheme() {
  const saved = localStorage.getItem("miniCart-theme");
  if (saved === "dark" || saved === "light") {
    applyTheme(saved);
  } else {
    applyTheme("light");
  }
}

// ----------------------------
// Events
// ----------------------------
clearCartBtn.addEventListener("click", () => {
  cart.clear();
  renderCart();
  bumpCartCount();
});

themeToggleBtn.addEventListener("click", () => {
  const current = document.body.getAttribute("data-theme") || "light";
  const next = current === "light" ? "dark" : "light";
  applyTheme(next);
});

// Init on page load
document.addEventListener("DOMContentLoaded", () => {
  loadTheme();          // theme from storage
  cart.load(products);  // cart from storage
  renderProducts();
  renderCart();
});