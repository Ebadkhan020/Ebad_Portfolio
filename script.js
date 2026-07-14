const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const typingText = document.getElementById('typing');
const projectCard = document.querySelector('.project-card.upload-card');
const uploadButton = document.querySelector('.upload-form .btn');
const fileInput = document.getElementById('project-file');
const projectList = document.querySelector('.project-list');

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

function createProjectEntry(title, link, file) {
    const projectItem = document.createElement('div');
    projectItem.className = 'project-item';

    const icon = document.createElement('i');
    icon.className = `fas ${link ? 'fa-link' : 'fa-file-upload'} project-item-icon`;

    const content = document.createElement('div');
    content.className = 'project-item-content';

    const titleEl = document.createElement('h4');
    titleEl.textContent = title;
    content.appendChild(titleEl);

    if (link) {
        const linkEl = document.createElement('a');
        linkEl.href = link.startsWith('http') ? link : `https://${link}`;
        linkEl.target = '_blank';
        linkEl.rel = 'noreferrer';
        linkEl.textContent = link;
        content.appendChild(linkEl);
    }

    if (file) {
        const fileEl = document.createElement('span');
        fileEl.textContent = `Uploaded file: ${file.name}`;
        content.appendChild(fileEl);
    }

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.type = 'button';
    removeBtn.innerHTML = '<i class="fas fa-trash"></i> Remove';
    removeBtn.addEventListener('click', () => projectItem.remove());

    projectItem.append(icon, content, removeBtn);
    return projectItem;
}

function handleUploadAction() {
    const projectName = document.getElementById('project-name').value.trim();
    const projectLink = document.getElementById('project-link').value.trim();
    const projectFile = fileInput.files[0];

    if (!projectName && !projectLink && !projectFile) {
        alert('Please add a project title, link, or upload a file.');
        return;
    }

    const projectTitle = projectName || (projectFile ? projectFile.name.replace(/\.[^/.]+$/, '') : projectLink);
    const projectEntry = createProjectEntry(projectTitle, projectLink, projectFile);
    projectList.appendChild(projectEntry);

    const uploadMessage = document.createElement('div');
    uploadMessage.className = 'upload-success';
    uploadMessage.textContent = `Project "${projectTitle}" is ready to share!`;
    projectCard.appendChild(uploadMessage);

    setTimeout(() => {
        uploadMessage.remove();
    }, 3200);

    document.getElementById('project-name').value = '';
    document.getElementById('project-link').value = '';
    fileInput.value = '';
}

menuBtn?.addEventListener('click', toggleMenu);
uploadButton?.addEventListener('click', handleUploadAction);
window.addEventListener('scroll', () => {
    revealOnScroll();
    document.querySelector('header')?.classList.toggle('scrolled', window.scrollY > 20);
});

window.addEventListener('load', () => {
    updateTyping();
    revealOnScroll();
    document.querySelector('header')?.classList.toggle('scrolled', window.scrollY > 20);
});
