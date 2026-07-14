const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const typingText = document.getElementById('typing');
const projectCard = document.querySelector('.project-card.upload-card');
const addProjectButton = document.querySelector('.btn-add-project');
const projectForm = document.querySelector('.project-form');
const sendEmailButton = document.querySelector('.btn-send-email');

const typingWords = ['Frontend Developer.', 'Full Stack Learner.', 'Creative Designer.', 'UI/UX Enthusiast.'];
let typingIndex = 0;
let charIndex = 0;
let typingForward = true;

function updateTyping() {
    const currentWord = typingWords[typingIndex];

    if (typingForward) {
        typingText.textContent = currentWord.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentWord.length) {
            typingForward = false;
            setTimeout(updateTyping, 1400);
            return;
        }
    } else {
        typingText.textContent = currentWord.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            typingForward = true;
            typingIndex = (typingIndex + 1) % typingWords.length;
        }
    }

    setTimeout(updateTyping, typingForward ? 120 : 60);
}

function revealOnScroll() {
    const revealItems = document.querySelectorAll('.glass');
    const triggerBottom = window.innerHeight * 0.88;

    revealItems.forEach((item) => {
        const itemTop = item.getBoundingClientRect().top;
        if (itemTop < triggerBottom) {
            item.classList.add('reveal');
        }
    });
}

function toggleMenu() {
    navLinks.classList.toggle('active');
}

function toggleProjectForm() {
    projectForm.classList.toggle('hidden');
    projectForm.classList.toggle('visible');
    addProjectButton.innerHTML = projectForm.classList.contains('visible')
        ? '<i class="fas fa-minus"></i> Close Form'
        : '<i class="fas fa-plus"></i> Add Project';
}

function handleSendEmail() {
    const projectName = document.getElementById('project-name').value.trim();
    const projectLink = document.getElementById('project-link').value.trim();

    if (!projectName && !projectLink) {
        alert('Please add a project title or a project link.');
        return;
    }

    const title = projectName || 'New Project';
    const subject = encodeURIComponent(`Project Submission: ${title}`);
    const body = encodeURIComponent(`Hello,%0D%0A%0D%0AI would like to share a project with you.%0D%0A%0D%0AProject Title: ${title}%0D%0AProject Link: ${projectLink || 'N/A'}%0D%0A%0D%0APlease review this project and let me know your thoughts.%0D%0A%0D%0AThanks!`);
    window.location.href = `mailto:khanebad732@gmail.com?subject=${subject}&body=${body}`;
}

menuBtn?.addEventListener('click', toggleMenu);
addProjectButton?.addEventListener('click', toggleProjectForm);
sendEmailButton?.addEventListener('click', handleSendEmail);
window.addEventListener('scroll', () => {
    revealOnScroll();
    document.querySelector('header')?.classList.toggle('scrolled', window.scrollY > 20);
});

window.addEventListener('load', () => {
    updateTyping();
    revealOnScroll();
    document.querySelector('header')?.classList.toggle('scrolled', window.scrollY > 20);
});

