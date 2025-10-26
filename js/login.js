// بيانات المستخدمين الثابتة
const users = [
  { email: "admin@store.com", password: "admin123", role: "admin" },
  { email: "user@store.com", password: "user123", role: "user" }
];

const form = document.getElementById("loginForm");
const registerLink = document.getElementById("registerLink");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("loggedUser", JSON.stringify(user));
    alert("تم تسجيل الدخول بنجاح");

    if (user.role === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "index.html";
    }
  } else {
    alert("بيانات غير صحيحة");
  }
});

registerLink.addEventListener("click", () => {
  alert("ميزة التسجيل قادمة قريبًا ✨");
});
