// ===============================
// تأثير دخول الصفحة
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    document.body.style.opacity = 0;

    setTimeout(() => {
        document.body.style.transition = "opacity 1s";
        document.body.style.opacity = 1;
    }, 200);
});


// ===============================
// ADMIN DATA
// ===============================
const ADMIN_EMAIL = "mohamedamr@gmail.com";
const ADMIN_PASSWORD = "2007";


// ===============================
// LOGIN SYSTEM
// ===============================
document.addEventListener("DOMContentLoaded", () => {

    const openLogin = document.getElementById("openLogin");
    const loginModal = document.getElementById("loginModal");
    const closeLogin = document.getElementById("closeLogin");

    const loginBtn = document.getElementById("loginBtn");
    const switchMode = document.getElementById("switchMode");
    const formTitle = document.getElementById("formTitle");

    let isLogin = true;

    // فتح / غلق
    if (openLogin && loginModal) {
        openLogin.onclick = () => loginModal.classList.add("show");
    }

    if (closeLogin && loginModal) {
        closeLogin.onclick = () => loginModal.classList.remove("show");
    }

    // تبديل
    if (switchMode) {
        switchMode.onclick = () => {
            isLogin = !isLogin;

            formTitle.innerText = isLogin ? "تسجيل الدخول" : "إنشاء حساب";
            loginBtn.innerText = isLogin ? "دخول" : "تسجيل";
            switchMode.innerText = isLogin ? "إنشاء حساب" : "تسجيل الدخول";
        };
    }

    // تسجيل / إنشاء
    if (loginBtn) {
        loginBtn.onclick = () => {

            const email = document.getElementById("email")?.value.trim();
            const pass = document.getElementById("password")?.value.trim();
            const file = document.getElementById("avatar")?.files[0];

            if (!email || !pass) {
                alert("املأ البيانات");
                return;
            }

            let users = JSON.parse(localStorage.getItem("users")) || {};

            // =========================
            // LOGIN
            // =========================
            if (isLogin) {

                // ADMIN LOGIN
                if (email === ADMIN_EMAIL && pass === ADMIN_PASSWORD) {

                    localStorage.setItem("currentUser", JSON.stringify({
                        email: email,
                        role: "admin"
                    }));

                    alert("تم تسجيل الدخول كأدمن 🔥");
                    location.reload();
                    return;
                }

                // USER LOGIN
                if (users[email] && users[email].pass === pass) {

                    localStorage.setItem("currentUser", JSON.stringify({
                        email: email,
                        role: "user"
                    }));

                    alert("تم تسجيل الدخول 👤");
                    location.reload();

                } else {
                    alert("بيانات غلط");
                }
            }

            // =========================
            // SIGNUP
            // =========================
            else {

                const saveUser = (avatar = "") => {
                    users[email] = {
                        pass: pass,
                        avatar: avatar
                    };

                    localStorage.setItem("users", JSON.stringify(users));
                    alert("تم إنشاء الحساب ✅");
                };

                if (file) {
                    const reader = new FileReader();
                    reader.onload = () => saveUser(reader.result);
                    reader.readAsDataURL(file);
                } else {
                    saveUser("");
                }
            }
        };
    }


    // ===============================
    // NAVBAR DISPLAY (FIXED)
    // ===============================
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (currentUser) {

        const nav = document.querySelector(".navbar ul");
        const email = currentUser.email;

        const avatar = users[email]?.avatar;

        if (nav && !document.getElementById("userInfo")) {

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
        }
    }

});