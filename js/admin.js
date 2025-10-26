// ✅ عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {

  // 🧩 تحقق من أن المستخدم أدمن
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  if (!user || user.role !== "admin") {
    alert("🚫 غير مصرح بالدخول هنا");
    window.location.href = "login.html";
    return;
  }

  // 🧩 تعريف العناصر من الصفحة
  const form = document.getElementById("addProductForm");
  const container = document.getElementById("productsContainer");
  const ordersContainer = document.getElementById("ordersContainer");

  // 🧱 تحميل المنتجات من localStorage
  function loadProducts() {
    container.innerHTML = "";
    const products = JSON.parse(localStorage.getItem("products")) || [];

    if (products.length === 0) {
      container.innerHTML = `<p class="text-center text-muted">لا توجد منتجات بعد</p>`;
      return;
    }

    products.forEach((p, index) => {
      const card = `
        <div class="col-md-3 mb-4">
          <div class="card shadow-sm h-100 border-0">
            <img src="${p.img}" class="card-img-top rounded-top" alt="${p.name}">
            <div class="card-body text-center">
              <h5 class="fw-bold text-primary">${p.name}</h5>
              <p class="text-muted mb-2">${p.price} جنيه</p>
              <button class="btn btn-sm btn-danger" onclick="deleteProduct(${index})"> حذف</button>
            </div>
          </div>
        </div>`;
      container.innerHTML += card;
    });
  }

  // 🧾 تحميل الطلبات
  function loadOrders() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    if (orders.length === 0) {
      ordersContainer.innerHTML = `<p class="text-center text-muted">لا توجد طلبات حالياً </p>`;
      return;
    }

    let html = `
      <table class="table table-bordered table-striped text-center align-middle">
        <thead class="table-primary">
          <tr>
            <th>اسم العميل</th>
            <th>المنتجات</th>
            <th>طريقة الدفع</th>
            <th>تاريخ الطلب</th>
          </tr>
        </thead>
        <tbody>
    `;

    orders.forEach(order => {
      const items = order.items.map(i => i.name).join("، ");
      html += `
        <tr>
          <td class="fw-semibold">${order.user}</td>
          <td>${items}</td>
          <td>${order.payment === "cash" ? "كاش عند الاستلام " : "بطاقة "}</td>
          <td>${order.date}</td>
        </tr>
      `;
    });

    html += `</tbody></table>`;
    ordersContainer.innerHTML = html;
  }

  // ➕ إضافة منتج جديد
  form.addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const img = document.getElementById("productImg").value;

    if (!name || !price || !img) {
      alert("⚠️ أكمل جميع الحقول قبل الإضافة");
      return;
    }

    const newProduct = { id: Date.now(), name, price: +price, img };
    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));

    alert("✅ تمت إضافة المنتج بنجاح");
    form.reset();
    loadProducts();
  });

  // ❌ حذف منتج
  window.deleteProduct = (index) => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    loadProducts();
  };

  // 🚪 تسجيل الخروج
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("loggedUser");
    window.location.href = "login.html";
  });

  // 🔁 تحميل البيانات عند فتح الصفحة
  loadProducts();
  loadOrders();
});
