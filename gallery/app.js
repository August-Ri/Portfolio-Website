const galleryImages = Array.from({ length: 100 }, (_, index) => `https://source.unsplash.com/random/${getRandomSize()}`);

const imageGallery = document.getElementById('image-gallery');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const loading = document.getElementById('loading');
let currentIndex = 0;

const initialGallerySize = 10;
for (let i = 0; i < initialGallerySize; i++) {
    addImageToGallery(i);
}

function getRandomSize() {
    const width = Math.floor(Math.random() * (1200 - 800 + 1)) + 800;
    const height = Math.floor(Math.random() * (900 - 600 + 1)) + 600;
    return `${width}x${height}`;
}

function addImageToGallery(index) {
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');
    imageContainer.style.animationDelay = `${index * 0.1}s`;

    const imgElement = document.createElement('img');
    imgElement.src = galleryImages[index];
    imgElement.alt = 'Gallery Image';

    const overlay = document.createElement('div');
    overlay.classList.add('image-overlay');
    overlay.innerHTML = 'View';

    overlay.addEventListener('click', () => openModal(index));

    imageContainer.appendChild(imgElement);
    imageContainer.appendChild(overlay);
    imageGallery.appendChild(imageContainer);
}

function handleInfiniteScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollY + windowHeight >= documentHeight - 100) {
        loading.style.opacity = 1;
        loading.style.transform = 'translateY(0)';
        setTimeout(() => {
            loading.style.opacity = 0;
            loading.style.transform = 'translateY(20px)';
            addImageToGallery(currentIndex++);
        }, 1000);
    }
}

window.addEventListener('scroll', handleInfiniteScroll);

function openModal(index) {
    currentIndex = index;
    modalImage.src = galleryImages[index];
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}

function navigate(offset) {
    currentIndex = (currentIndex + offset + galleryImages.length) % galleryImages.length;
    modalImage.src = galleryImages[currentIndex];
}

window.onclick = function (event) {
    if (event.target === modal) {
        closeModal();
    }
};

const circleElement = document.querySelector('.circle');
const mouse = { x: 0, y: 0 };
const previousMouse = { x: 0, y: 0 };
const circle = { x: 0, y: 0 };
let currentScale = 0;
let currentAngle = 0;

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

const speed = 0.17;

const tick = () => {
    circle.x += (mouse.x - circle.x) * speed;
    circle.y += (mouse.y - circle.y) * speed;
    const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

    const deltaMouseX = mouse.x - previousMouse.x;
    const deltaMouseY = mouse.y - previousMouse.y;
    previousMouse.x = mouse.x;
    previousMouse.y = mouse.y;

    const mouseVelocity = Math.min(Math.sqrt(deltaMouseX**2 + deltaMouseY**2) * 4, 150);
    const scaleValue = (mouseVelocity / 150) * 0.5;
    currentScale += (scaleValue - currentScale) * speed;
    const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

    const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;
    if (mouseVelocity > 20) {
        currentAngle = angle;
    }
    const rotateTransform = `rotate(${currentAngle}deg)`;

    circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;

    window.requestAnimationFrame(tick);
}

tick();
