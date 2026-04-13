function safe(id) {
    return document.getElementById(id);
}
// ============================
//  كود تواصل معنا الاحترافي
// ============================

// عناصر الصفحة
const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");

// عناصر للرسائل
const successPopup = document.getElementById("successPopup");
const closePopup = document.getElementById("closePopup");

// زرار الإرسال
const submitBtn = form.querySelector("button");

// دالة إظهار رسالة خطأ تحت كل Input
function showError(input, msg) {
    const parent = input.parentElement;
    let error = parent.querySelector(".error-msg");

    if (!error) {
        error = document.createElement("small");
        error.className = "error-msg";
        parent.appendChild(error);
    }

    error.textContent = msg;
    input.classList.add("error");
}

// دالة مسح الأخطاء من Input
function clearError(input) {
    const parent = input.parentElement;
    const error = parent.querySelector(".error-msg");

    if (error) error.remove();
    input.classList.remove("error");
}

// دالة تتحقق من صحة الإيميل
function validEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

// Shake Animation للفورم
function shakeForm() {
    form.classList.add("shake");
    setTimeout(() => form.classList.remove("shake"), 400);
}

// ----------------------------
//      حدث إرسال الفورم
// ----------------------------
form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;

    // الاسم
    if (nameInput.value.trim().length < 3) {
        showError(nameInput, "الاسم لازم يكون 3 أحرف على الأقل");
        valid = false;
    } else {
        clearError(nameInput);
    }

    // الإيميل
    if (!validEmail(emailInput.value.trim())) {
        showError(emailInput, "اكتب بريد إلكتروني صالح");
        valid = false;
    } else {
        clearError(emailInput);
    }

    // الهاتف
    if (phoneInput.value.trim().length < 10) {
        showError(phoneInput, "اكتب رقم هاتف صحيح");
        valid = false;
    } else {
        clearError(phoneInput);
    }

    // الرسالة
    if (messageInput.value.trim().length < 5) {
        showError(messageInput, "الرسالة قصيرة جدًا");
        valid = false;
    } else {
        clearError(messageInput);
    }

    // لو فيه غلط → Shake
    if (!valid) {
        shakeForm();
        return;
    }

    // زرار يتحول Loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = "جارٍ الإرسال...";

    setTimeout(() => {
        // حفظ البيانات في LocalStorage
        const messageData = {
            name: nameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            message: messageInput.value,
            date: new Date().toLocaleString()
        };

        // Array للرسائل
        const saved = JSON.parse(localStorage.getItem("messages")) || [];
        saved.push(messageData);
        localStorage.setItem("messages", JSON.stringify(saved));

        // إظهار الـ Popup
        successPopup.classList.add("show");

        // يرجع الزرار لحالته
        submitBtn.disabled = false;
        submitBtn.innerHTML = "إرسال الرسالة";

        // مسح الفورم
        form.reset();

    }, 1200);
});

// زر إغلاق الـ Popup
closePopup.addEventListener("click", () => {
    successPopup.classList.remove("show");
});
