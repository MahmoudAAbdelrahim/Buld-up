// ✅ تأكيد تسجيل الدخول قبل عرض السلة
const user = JSON.parse(localStorage.getItem("loggedUser"));
if (!user) {
  alert("يرجى تسجيل الدخول أولاً للوصول إلى السلة 🛍️");
  window.location.href = "login.html";
}

// 🧺 تحميل بيانات السلة من LocalStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.getElementById("cartContainer");
const totalPriceElement = document.getElementById("totalPrice");

// 🧩 دالة عرض محتوى السلة
function renderCart() {
  cartContainer.innerHTML = ""; // مسح المحتوى القديم
  let total = 0; // متغير لحساب الإجمالي

  // ✅ حالة السلة الفارغة
  if (cart.length === 0) {
    cartContainer.innerHTML = `<p class="text-center text-muted">السلة فارغة حالياً 🛒</p>`;
    totalPriceElement.textContent = "0";
    return;
  }

  // 🔁 عرض كل منتج داخل السلة
  cart.forEach((item, i) => {
    total += item.price;
    cartContainer.innerHTML += `
      <div class="col-md-3">
        <div class="card shadow-sm h-100">
          <img src="${item.img}" class="card-img-top" alt="${item.name}">
          <div class="card-body text-center">
            <h5 class="card-title fw-bold text-dark">${item.name}</h5>
            <p class="text-muted">${item.price} جنيه</p>
            <button class="btn btn-danger btn-sm" onclick="removeItem(${i})">
              <i class="bi bi-trash"></i> حذف
            </button>
          </div>
        </div>
      </div>
    `;
  });

  // 💰 تحديث إجمالي السعر
  totalPriceElement.textContent = total;
}

// ❌ دالة حذف منتج من السلة
function removeItem(index) {
  cart.splice(index, 1); // حذف المنتج من المصفوفة
  localStorage.setItem("cart", JSON.stringify(cart)); // تحديث التخزين المحلي
  renderCart(); // إعادة عرض السلة بعد التعديل
}

// 💳 دالة إكمال عملية الشراء
document.getElementById("checkoutBtn").addEventListener("click", () => {
  // تحقق من أن السلة ليست فارغة
  if (cart.length === 0) {
    alert("⚠️ لا يمكن إتمام الشراء وسلة المشتريات فارغة");
    return;
  }

  // تحديد طريقة الدفع المختارة
  const payment = document.getElementById("paymentMethod").value;
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  // 🧾 إنشاء كائن الطلب الجديد
  const newOrder = {
    user: user.email,
    items: cart,
    payment,
    date: new Date().toLocaleString()
  };

  // تخزين الطلب في LocalStorage
  orders.push(newOrder);
  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.removeItem("cart"); // تفريغ السلة بعد الشراء

  // تنبيه المستخدم وتحويله لصفحة النجاح
  alert("✅  Buld up تمت عملية الشراء بنجاح، شكرًا لتعاملك مع   ");
  window.location.href = "success.html";
});

// 🚪 تسجيل الخروج
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("loggedUser");
  window.location.href = "login.html";
});

// 🚀 أول تشغيل: عرض السلة
renderCart();
