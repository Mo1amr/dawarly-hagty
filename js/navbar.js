document.addEventListener("DOMContentLoaded", () => {

    const ADMIN_EMAIL = "mohamedamr@gmail.com";

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const users = JSON.parse(localStorage.getItem("users")) || {};

    const nav = document.querySelector(".navbar ul");
    const openLogin = document.getElementById("openLogin");
    const adminLink = document.getElementById("adminLink");

    if (!nav || !currentUser) return;

    const email = currentUser.email;
    const role = currentUser.role;

    // =========================
    // إظهار لينك الأدمن
    // =========================
    if (role === "admin" && adminLink) {
        adminLink.style.display = "block";
    }

    // =========================
    // منع التكرار
    // =========================
    if (document.getElementById("userInfo")) return;

    const avatar = users[email]?.avatar;

    const li = document.createElement("li");
    li.id = "userInfo";
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.gap = "8px";

    li.innerHTML = `
        ${avatar ? `<img src="${avatar}" style="width:30px;height:30px;border-radius:50%;object-fit:cover;">` : ""}
        <span>👤 ${email}</span>
        <a href="#" id="logout">تسجيل خروج</a>
    `;

    nav.appendChild(li);

    if (openLogin) openLogin.style.display = "none";

    document.getElementById("logout").onclick = () => {
        localStorage.removeItem("currentUser");
        location.reload();
    };

});