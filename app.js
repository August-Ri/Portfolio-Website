function openNewWindow() {
  window.open("https://x.com/AugustasArmalis?s=20", "_blank");
}

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

  const angleRad = Math.atan2(deltaMouseY, deltaMouseX);
  const angleDeg = angleRad * (180 / Math.PI);

  const angle = angleDeg + 90;

  const rotateTransform = `rotate(${angle}deg)`;

  const scaleDelta = Math.abs(circle.x - mouse.x) + Math.abs(circle.y - mouse.y);
  const newScale = 1 + scaleDelta * 0.002;
  currentScale += (newScale - currentScale) * speed;

  const scaleTransform = `scale(${currentScale})`;

  const transformValue = `${translateTransform} ${rotateTransform} ${scaleTransform}`;

  circleElement.style.transform = transformValue;

  previousMouse.x = mouse.x;
  previousMouse.y = mouse.y;

  requestAnimationFrame(tick);
};

tick();
