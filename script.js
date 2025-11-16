// Default product data
const DEFAULT_PRODUCTS = [
  { id: 1, name: "Kopi Gayo", price: 25000, stock: 50 },
  { id: 2, name: "Teh Hitam", price: 18000, stock: 30 },
  { id: 3, name: "Coklat Aceh", price: 30000, stock: 20 }
];

function ensureProducts() {
  if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(DEFAULT_PRODUCTS));
  }
}

function isLoggedIn() {
  return sessionStorage.getItem("login") === "true";
}

function protectPage() {
  const page = location.pathname.split("/").pop();
  if ((page === "dashboard.html" || page === "products.html") && !isLoggedIn()) {
    location.href = "index.html";
  }
}

function loginInit() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("password").value.trim();

    if (!email || !pass) return alert("Email & Password wajib diisi!");

    sessionStorage.setItem("login", "true");
    location.href = "dashboard.html";
  });
}

function dashboardInit() {
  const totalProducts = document.getElementById("totalProducts");
  if (!totalProducts) return;

  ensureProducts();
  const list = JSON.parse(localStorage.getItem("products"));

  totalProducts.textContent = list.length;
}

function renderProducts() {
  const table = document.querySelector("#productsTable tbody");
  if (!table) return;

  ensureProducts();
  const list = JSON.parse(localStorage.getItem("products"));

  table.innerHTML = "";

  list.forEach((p, i) => {
    table.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${p.name}</td>
        <td>${p.price}</td>
        <td>${p.stock}</td>
        <td>
          <button onclick="alert('Edit ${p.name}')"><i class="fa-solid fa-pen"></i></button>
          <button onclick="deleteProduct(${p.id})"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
    `;
  });
}

function deleteProduct(id) {
  let list = JSON.parse(localStorage.getItem("products"));
  list = list.filter(p => p.id !== id);
  localStorage.setItem("products", JSON.stringify(list));
  renderProducts();
}

function logoutInit() {
  document.querySelectorAll("#logoutBtn, #logoutBtnProducts").forEach(btn => {
    if (btn) {
      btn.addEventListener("click", () => {
        sessionStorage.clear();
        location.href = "index.html";
      });
    }
  });
}

function viewProductsInit() {
  const viewBtn = document.getElementById("viewProductsBtn");
  if (viewBtn) {
    viewBtn.addEventListener("click", () => {
      window.location.href = "products.html";
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  protectPage();
  loginInit();
  dashboardInit();
  renderProducts();
  logoutInit();
  viewProductsInit(); // ← FIX
});

