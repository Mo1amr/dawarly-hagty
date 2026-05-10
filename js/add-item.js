function safe(id) {
    return document.getElementById(id);
}
// ✅ كود تخزين المنتج في localStorage
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addProductForm");
  const imageInput = document.getElementById("image");
  const imagePreview = document.getElementById("imagePreview");
  const message = document.getElementById("message");

  let selectedImage = "";

  // ✅ عرض معاينة الصورة
  imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        selectedImage = evt.target.result;
        imagePreview.innerHTML = `<img src="${selectedImage}" alt="صورة المنتج" style="width:120px;height:120px;border-radius:10px;">`;
      };
      reader.readAsDataURL(file);
    }
  });

  // ✅ حفظ البيانات في localStorage
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const product = {
      name: document.getElementById("productName").value.trim(),
      category: document.getElementById("category").value,
      price: document.getElementById("price").value,
      description: document.getElementById("description").value.trim(),
      image: selectedImage || "image/default.jpg"
    };

    // لو فيه بيانات قديمة نحافظ عليها
    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
    existingProducts.push(product);

    localStorage.setItem("products", JSON.stringify(existingProducts));

    message.textContent = "✅ تم إضافة المنتج بنجاح!";
    message.style.color = "green";
    form.reset();
    imagePreview.innerHTML = "<span>📷 لم يتم اختيار صورة بعد</span>";

    setTimeout(() => message.textContent = "", 3000);
  });
});
