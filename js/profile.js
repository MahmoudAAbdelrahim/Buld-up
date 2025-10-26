// تأكيد تسجيل الدخول
const user = JSON.parse(localStorage.getItem("loggedUser"));
if (!user) {
  alert("سجل الدخول أولاً");
  window.location.href = "login.html";
}

// عرض بيانات المستخدم
document.getElementById("userEmail").textContent = user.email;
document.getElementById("userRole").textContent = user.role === "admin" ? "أدمن" : "عميل";

// تحميل الطلبات الخاصة بالمستخدم
const orders = JSON.parse(localStorage.getItem("orders")) || [];
const myOrders = orders.filter(o => o.user === user.email);
const userOrdersDiv = document.getElementById("userOrders");

if (myOrders.length === 0) {
  userOrdersDiv.innerHTML = `<div class="text-center text-muted"><i class="fa-solid fa-box-open fa-2x mb-2"></i><p>لا توجد طلبات حتى الآن </p></div>`;
} else {
  let html = `
    <div class="table-responsive">
      <table class="table table-bordered text-center align-middle">
        <thead>
          <tr>
            <th>المنتجات</th>
            <th>طريقة الدفع</th>
            <th>التاريخ</th>
          </tr>
        </thead>
        <tbody>
  `;

  myOrders.forEach(order => {
    const items = order.items.map(i => i.name).join("، ");
    html += `
      <tr>
        <td>${items}</td>
        <td>${order.payment === "cash" ? "كاش " : "فيزا "}</td>
        <td>${order.date}</td>
      </tr>
    `;
  });

  html += `</tbody></table></div>`;
  userOrdersDiv.innerHTML = html;
}

// تسجيل الخروج
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("loggedUser");
  window.location.href = "login.html";
});
