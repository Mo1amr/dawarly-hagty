function safe(id) {
    return document.getElementById(id);
}
// ✅ كود صفحة المواهب لموقع دورلي حاجتي
document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("addTalentForm");
  const talentsGrid = document.getElementById("talentsGrid");
  const mediaInput = document.getElementById("media");
  const preview = document.getElementById("mediaPreview");

  // ✅ عرض المعاينة قبل الرفع
  mediaInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file) {
      preview.innerHTML = "🎥 لم يتم اختيار ملف";
      return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      if (file.type.startsWith("image/")) {
        preview.innerHTML = `<img src="${event.target.result}" alt="معاينة الصورة" style="width:100%;border-radius:10px;">`;
      } else if (file.type.startsWith("video/")) {
        preview.innerHTML = `<video src="${event.target.result}" controls style="width:100%;border-radius:10px;"></video>`;
      } else {
        preview.innerHTML = "⚠️ نوع الملف غير مدعوم";
      }
    };
    reader.readAsDataURL(file);
  });

  // ✅ تحميل المواهب من localStorage
  function loadTalents() {
    const talents = JSON.parse(localStorage.getItem("talents")) || [];
    talentsGrid.innerHTML = "";

    if (talents.length === 0) {
      talentsGrid.innerHTML = `<p style="grid-column:1/-1;color:#8B6B4A;">لا توجد مواهب حالياً.</p>`;
      return;
    }

    talents.forEach(talent => {
      const card = document.createElement("article");
      card.classList.add("talent-card");
      card.innerHTML = `
        <div class="talent-media">
          ${talent.mediaType === "image"
            ? `<img src="${talent.media}" alt="صورة موهبة">`
            : `<video src="${talent.media}" controls></video>`}
        </div>
        <div class="talent-info">
          <h3 class="talent-name">${talent.name}</h3>
          <p class="talent-category">الفئة: ${talent.category}</p>
          <p class="talent-desc">${talent.description}</p>
        </div>
      `;
      talentsGrid.appendChild(card);
    });
  }

  // ✅ عند إرسال النموذج
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("talentName").value.trim();
    const category = document.getElementById("talentCategory").value;
    const description = document.getElementById("talentDescription").value.trim();
    const file = mediaInput.files[0];

    if (!name || !category || !file) {
      alert("⚠️ من فضلك املأ جميع الحقول المطلوبة!");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      const newTalent = {
        name,
        category,
        description,
        media: event.target.result,
        mediaType: file.type.startsWith("image/") ? "image" : "video"
      };

      const talents = JSON.parse(localStorage.getItem("talents")) || [];
      talents.push(newTalent);
      localStorage.setItem("talents", JSON.stringify(talents));

      form.reset();
      preview.innerHTML = "🎥 لم يتم اختيار ملف";
      loadTalents();

      alert("✅ تمت إضافة الموهبة بنجاح!");
    };
    reader.readAsDataURL(file);
  });

  // ✅ تحميل المواهب عند فتح الصفحة
  loadTalents();
});
