// ===============================
// 🔐 إعدادات الأدمن
// ===============================
const ADMIN_EMAIL = "mohamedamr@gmail.com";

// ===============================
// قراءة المستخدم (صح)
// ===============================
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

// 🚨 حماية الصفحة
if (!currentUser) {
  alert("لازم تسجل دخول الأول ❌");
  window.location.href = "index.html";
}

// ✅ تحقق من الأدمن
if (currentUser.role !== "admin") {
  alert("مش مسموح بالدخول ❌");
  window.location.href = "index.html";
}

// ===============================
// إظهار زر الأدمن
// ===============================
const adminBtn = document.getElementById("adminBtn");
if (adminBtn) adminBtn.style.display = "block";


// ===============================
// البيانات
// ===============================
let talents = JSON.parse(localStorage.getItem("talents")) || [];

const pendingDiv = document.getElementById("pending");
const approvedDiv = document.getElementById("approved");


// ===============================
// عرض الفيديوهات
// ===============================
function render() {

  pendingDiv.innerHTML = "";
  approvedDiv.innerHTML = "";

  talents.forEach((t, i) => {

    const card = `
      <div class="card">
        <video src="${t.video}" controls></video>

        <div>
          <h3>${t.name}</h3>
          <p>${t.desc}</p>
          <p>👤 ${t.user}</p>

          ${
            t.status !== "approved"
              ? `
                <button onclick="approve(${i})">✔ قبول</button>
                <button onclick="reject(${i})">❌ رفض</button>
              `
              : ""
          }
        </div>
      </div>
    `;

    if (t.status === "approved") {
      approvedDiv.innerHTML += card;
    } else {
      pendingDiv.innerHTML += card;
    }
  });
}

render();


// ===============================
// قبول
// ===============================
function approve(i) {
  talents[i].status = "approved";
  localStorage.setItem("talents", JSON.stringify(talents));
  render();
}


// ===============================
// رفض
// ===============================
function reject(i) {
  talents.splice(i, 1);
  localStorage.setItem("talents", JSON.stringify(talents));
  render();
}