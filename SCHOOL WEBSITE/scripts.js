// ==========================================================================
// 1. SUBMIT HANDLER (Locks button, hides form, clears inputs)
// ==========================================================================
function handleFormSubmit() {
    const btn = document.getElementById('submitBtn');
    const form = document.getElementById('concernForm');
    const successCard = document.getElementById('successMessage');
    const charCount = document.getElementById('charCount');

    // Step A: Disable button immediately to prevent double-clicks
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span>⏳ Sending...</span>';
    }

    // Step B: Small 50ms delay so browser packages the data, then instant UI change
    setTimeout(() => {
        // Hide the form and clear all inputs
        if (form) {
            form.reset();
            form.style.display = 'none';
        }

        // Reset character count
        if (charCount) {
            charCount.textContent = '0';
        }

        // Show the success card & toast notification
        if (successCard) {
            successCard.style.display = 'block';
            successCard.classList.add('show');
        }
        showToast('✅ Concern submitted anonymously to Google Sheets!');

        // Re-enable button for future use
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<span>📨 Submit Concern Anonymously</span>';
        }
    }, 1500);

    return true; // Allows HTML form to send data into hidden iframe
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