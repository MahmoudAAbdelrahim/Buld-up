document.addEventListener("DOMContentLoaded", () => {
  const navActions = document.getElementById("navActions");
  const container = document.getElementById("productsContainer");
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  function updateNavbar() {
    navActions.innerHTML = "";

    if (loggedUser) {
      navActions.innerHTML = `
        <button class="btn nav-btn" id="orderBtn">
          <i class="bi bi-bag-check"></i> اطلب منتجك
        </button>
        <button class="btn nav-btn" id="profileBtn">
          <i class="bi bi-person-circle"></i> البروفايل
        </button>
        <button class="btn nav-btn" id="cartBtn">
          <i class="bi bi-cart"></i> السلة
        </button>
        <button class="btn nav-btn" id="logoutBtn">
          <i class="bi bi-box-arrow-right"></i> تسجيل الخروج
        </button>
      `;
    } else {
      navActions.innerHTML = `
        <button class="btn nav-btn" id="loginBtn">
          <i class="bi bi-box-arrow-in-right"></i> تسجيل الدخول
        </button>
      `;
    }

    document.getElementById("logoutBtn")?.addEventListener("click", logout);
    document.getElementById("loginBtn")?.addEventListener("click", () => (window.location.href = "login.html"));
    document.getElementById("cartBtn")?.addEventListener("click", () => (window.location.href = "cart.html"));
    document.getElementById("profileBtn")?.addEventListener("click", () => (window.location.href = "profile.html"));
    document.getElementById("orderBtn")?.addEventListener("click", () => (window.location.href = "order.html"));
  }

  function logout() {
    localStorage.removeItem("loggedUser");
    window.location.reload();
  }

  function renderProducts() {
    container.innerHTML = "";
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];

    if (storedProducts.length === 0) {
      container.innerHTML = `<p class="text-center text-muted">لا توجد منتجات حالياً</p>`;
      return;
    }

    storedProducts.forEach(p => {
      const card = `
        <div class="col-md-3 mb-4">
          <div class="card shadow-sm h-100 rounded-3 overflow-hidden">
            <img src="${p.img}" class="card-img-top" alt="${p.name}">
            <div class="card-body text-center">
              <h5 class="card-title fw-bold text-dark">${p.name}</h5>
              <p class="text-muted">${p.price} جنيه</p>
              ${
                loggedUser
                  ? `<button class="btn btn-primary w-100" onclick="addToCart(${p.id})">
                      <i class="bi bi-cart-plus"></i> أضف للسلة
                    </button>`
                  : `<button class="btn btn-secondary w-100" disabled>
                      <i class="bi bi-lock"></i> سجّل دخول أولاً
                    </button>`
              }
            </div>
          </div>
        </div>`;
      container.innerHTML += card;
    });
  }

  window.addToCart = (id) => {
    if (!loggedUser) {
      alert("يرجى تسجيل الدخول أولاً");
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const product = storedProducts.find(p => p.id === id);

    if (product) {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("✅ تمت إضافة المنتج إلى السلة");
    }
  };

  updateNavbar();
  renderProducts();
});
