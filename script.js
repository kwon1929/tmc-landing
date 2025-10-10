// Smooth scroll to contact section
function scrollToContact() {
    document.getElementById('contact').scrollIntoView({
        behavior: 'smooth'
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        return;
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    }

    lastScroll = currentScroll;
});

// Google Apps Script URL (구글 시트 연동을 위한 URL)
// GOOGLE_SHEETS_SETUP.md 파일을 참고하여 설정하세요
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzDf0lU3_AxvbcmoWk_Sg5a9UijVUpt7OwDCKR5rhwIDIOfinXAIlosIs8S8DsLa8AK3Q/exec';

// Form submission handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = {
        company: document.getElementById('company').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };

    // 버튼 비활성화 (중복 제출 방지)
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = '전송 중...';

    // Google Sheets로 전송
    if (GOOGLE_SCRIPT_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        sendToGoogleSheets(formData, submitBtn, this);
    } else {
        // URL이 설정되지 않은 경우 로컬 저장
        console.log('Form submitted:', formData);
        alert('문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.\n\n(구글 시트 연동을 위해서는 GOOGLE_SHEETS_SETUP.md를 참고하세요)');
        submitBtn.disabled = false;
        submitBtn.textContent = '문의하기';
        this.reset();
    }
});

// Function to send data to Google Sheets
function sendToGoogleSheets(data, submitBtn, form) {
    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'no-cors' // Google Apps Script requires no-cors mode
    })
    .then(() => {
        // no-cors 모드에서는 응답을 읽을 수 없으므로 성공으로 간주
        console.log('Form data sent successfully');
        alert('문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = '문의하기';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('문의 전송 중 오류가 발생했습니다. 다시 시도해주세요.\n또는 이메일(bckwon@tmcad.co.kr)로 직접 문의 부탁드립니다.');
        submitBtn.disabled = false;
        submitBtn.textContent = '문의하기';
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for fade-in animation
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Mobile menu toggle (if you want to add mobile menu later)
// You can uncomment and customize this
/*
const menuToggle = document.createElement('button');
menuToggle.classList.add('menu-toggle');
menuToggle.innerHTML = '☰';
menuToggle.style.display = 'none';

document.querySelector('.header .container').appendChild(menuToggle);

menuToggle.addEventListener('click', () => {
    document.querySelector('.nav').classList.toggle('active');
});

// Show menu toggle on mobile
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        menuToggle.style.display = 'block';
    } else {
        menuToggle.style.display = 'none';
        document.querySelector('.nav').classList.remove('active');
    }
});
*/
