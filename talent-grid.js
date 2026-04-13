function safe(id) {
  return document.getElementById(id);
}

const container = document.getElementById("talents");
const modal = document.getElementById("modal");

const openForm = document.getElementById("openForm");
const closeBtn = document.getElementById("close");
const submitBtn = document.getElementById("submit");

let talents = JSON.parse(localStorage.getItem("talents")) || [];

/* ===============================
   ADMIN SETUP
=============================== */
const ADMIN_EMAIL = "mohamedamr@gmail.com";

/* ===============================
   USER (STRING SYSTEM)
=============================== */
const currentUser = localStorage.getItem("currentUser");

/* ===============================
   MODAL
=============================== */
if (openForm) openForm.onclick = () => modal.classList.add("show");
if (closeBtn) closeBtn.onclick = () => modal.classList.remove("show");

/* ===============================
   DISPLAY VIDEOS
=============================== */
function display() {
  if (!container) return;

  container.innerHTML = "";

  talents
    .map((t, i) => ({ ...t, realIndex: i }))
    .forEach((t) => {

      // إخفاء غير المقبول لغير الأدمن
      if (t.status !== "approved" && currentUser !== ADMIN_EMAIL) return;

      const card = document.createElement("div");
      card.classList.add("talent-card");

      card.innerHTML = `
        <video controls src="${t.video}"></video>

        <div class="card-body">
          <h3>${t.name}</h3>
          <p>${t.desc}</p>
          <p>👤 ${t.user || "مستخدم"}</p>
          <p>📌 ${t.status || "pending"}</p>

          <div class="card-footer">
            <button class="btn" onclick="goProduct('${t.product}')">
              شوف المنتج
            </button>

            ${
              currentUser === ADMIN_EMAIL
                ? `
                  <button class="btn" onclick="approveVideo(${t.realIndex})">✔ قبول</button>
                  <button class="btn delete-btn" onclick="deleteVideo(${t.realIndex})">❌ حذف</button>
                `
                : (t.user === currentUser
                    ? `<button class="btn delete-btn" onclick="deleteVideo(${t.realIndex})">حذف</button>`
                    : "")
            }
          </div>
        </div>
      `;

      container.appendChild(card);
    });
}

display();

/* ===============================
   ADD VIDEO
=============================== */
if (submitBtn) {
  submitBtn.onclick = () => {

    if (!currentUser) {
      alert("لازم تسجل دخول 🔒");
      return;
    }

    const name = document.getElementById("name").value.trim();
    const desc = document.getElementById("desc").value.trim();
    const product = document.getElementById("product").value;
    const file = document.getElementById("video").files[0];

    if (!name || !desc || !file) {
      alert("اكمل البيانات");
      return;
    }

    const url = URL.createObjectURL(file);

    talents.push({
      name,
      desc,
      product,
      video: url,
      user: currentUser,
      status: "pending"
    });

    localStorage.setItem("talents", JSON.stringify(talents));

    modal.classList.remove("show");
    display();
  };
}

/* ===============================
   APPROVE (ADMIN ONLY)
=============================== */
function approveVideo(i) {
  if (currentUser !== ADMIN_EMAIL) return;

  talents[i].status = "approved";
  localStorage.setItem("talents", JSON.stringify(talents));
  display();
}

/* ===============================
   DELETE
=============================== */
function deleteVideo(i) {

  const owner = talents[i]?.user;

  if (currentUser !== ADMIN_EMAIL && currentUser !== owner) {
    alert("مش مسموح ❌");
    return;
  }

  talents.splice(i, 1);
  localStorage.setItem("talents", JSON.stringify(talents));
  display();
}

/* ===============================
   GO PRODUCT
=============================== */
function goProduct(cat) {
  localStorage.setItem("selectedCategory", cat);
  window.location.href = "products.html";
}

/* ===============================
   ADMIN BUTTON IN NAVBAR
=============================== */
document.addEventListener("DOMContentLoaded", () => {

  const adminBtn = document.getElementById("adminBtn");

  if (currentUser === ADMIN_EMAIL && adminBtn) {
    adminBtn.style.display = "block";
  }
});