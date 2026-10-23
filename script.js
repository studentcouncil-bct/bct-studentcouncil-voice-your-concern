// ==========================================================================
// 1. SUBMIT HANDLER (Locks button, hides form, clears inputs)
// ==========================================================================
function handleFormSubmit(event) {
    const btn = document.getElementById('submitBtn');
    const form = document.getElementById('concernForm');
    const successCard = document.getElementById('successMessage');
    const charCount = document.getElementById('charCount');
    const name = document.getElementById('concernName').value.trim();
    const gradeSection = document.getElementById('concernGradeSection').value.trim();
    const nameInput = document.getElementById('concernName');
    const gradeSectionInput = document.getElementById('concernGradeSection');
    const emailInput = document.getElementById('concernEmail');
    const email = emailInput ? emailInput.value.trim() : '';

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Please enter a valid email address, or leave it blank.');
    emailInput.focus();
    return false;
}

    // Popup warning if Grade & Section is missing
    if (!gradeSection) {
        showToast('⚠️ Please enter your Grade & Section.');
        document.getElementById('concernGradeSection').focus();
        return false;
    }

    // Lock button & show loading text
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span>⏳ Submitting...</span>';
    }

    // Delay for 2 seconds before clearing form & showing success card
    setTimeout(() => {
        if (form) {
            form.reset();
            form.style.display = 'none';
        }

        if (charCount) {
            charCount.textContent = '0';
        }

        if (successCard) {
            successCard.style.display = 'block';
            successCard.classList.add('show');
        }

        showToast('✅ Concern successfully submitted!');

        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<span>📨 Submit Concern</span>';
        }
    }, 2000);

    return true; // Send to Google Sheet
}

// ==========================================================================
// 2. RESET FORM (When student clicks "Submit Another Concern")
// ==========================================================================
function resetForm() {
    const form = document.getElementById('concernForm');
    const successCard = document.getElementById('successMessage');
    const charCount = document.getElementById('charCount');

    if (successCard) {
        successCard.style.display = 'none';
        successCard.classList.remove('show');
    }
    if (form) {
        form.reset();
        form.style.display = 'block';
    }
    if (charCount) {
        charCount.textContent = '0';
    }
}

// ==========================================================================
// 3. CHARACTER COUNTER
// ==========================================================================
function updateCharCount() {
    const textarea = document.getElementById('concernDescription');
    const counter = document.getElementById('charCount');
    if (textarea && counter) {
        counter.textContent = textarea.value.length;
    }
}

// ==========================================================================
// 4. MOBILE MENU TOGGLE
// ==========================================================================
function toggleMenu() {
    const nav = document.getElementById('navLinks');
    if (nav) {
        nav.classList.toggle('open');
    }
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const nav = document.getElementById('navLinks');
        if (nav && nav.classList.contains('open')) {
            nav.classList.remove('open');
        }
    });
});

// ==========================================================================
// 5. TOAST NOTIFICATION
// ==========================================================================
let toastTimer = null;
function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = msg;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}

// ==========================================================================
// 6. SMOOTH SCROLLING
// ==========================================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const header = document.getElementById('header');
            const navHeight = header ? header.offsetHeight : 70;
            const topPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({ top: topPos, behavior: 'smooth' });
        }
    });
});

