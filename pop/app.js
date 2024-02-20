document.addEventListener('DOMContentLoaded', function () {
  var accordions = document.querySelectorAll('.accordion');
  accordions.forEach(function (accordion) {
    accordion.addEventListener('click', function () {
      this.classList.toggle('active');
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        var totalHeight = panel.scrollHeight;
        var nestedPanels = panel.querySelectorAll('.panel');
        nestedPanels.forEach(function(nestedPanel) {
          totalHeight += nestedPanel.scrollHeight;
        });
        panel.style.maxHeight = totalHeight + 'px';
      }
    });
  });
});

// Menu

document.addEventListener('DOMContentLoaded', function () {
  var burgerMenu = document.getElementById('burger-menu');
  var slidingMenu = document.getElementById('sliding-menu');
  var body = document.querySelector('body');

  burgerMenu.addEventListener('click', function () {
    toggleMenu();
    toggleIcon();
    toggleScroll();
  });

  function toggleMenu() {
    slidingMenu.classList.toggle('open');
  }

  function toggleIcon() {
    burgerMenu.classList.toggle('open');
  }

  function toggleScroll() {
    body.classList.toggle('open-menu');
  }
});

// Custom cursor circle

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

const speed = 0.1;

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
};

tick();

// Reading Bar

window.addEventListener('scroll', function() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const documentHeight = document.body.clientHeight;
  const scrollPercent = ((scrollTop) / (documentHeight - windowHeight)) * 100;

  const readingProgressBar = document.getElementById('reading-progress-bar');

  readingProgressBar.style.height = scrollPercent + '%';
});

window.addEventListener('load', function() {
  const readingProgressBar = document.getElementById('reading-progress-bar');
  readingProgressBar.style.height = '0';
});
