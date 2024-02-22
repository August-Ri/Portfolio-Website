document.getElementById("subscriptionForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMmE0YjEwMDY3MjAyMzI0NzYyYTEwYThhMjRkOWM2YjdiM2U4YzhkMzViNWU0YmRjZTU5ZDc1OGE5YWI1NjcxNjgyYTM3MWM5ZWE3MDcwNjMiLCJpYXQiOjE3MDg1OTQ2ODkuOTIwMzQ3LCJuYmYiOjE3MDg1OTQ2ODkuOTIwMzUsImV4cCI6NDg2NDI2ODI4OS45MTE3MjEsInN1YiI6IjgzODI4MiIsInNjb3BlcyI6W119.t2SLYnHl6vbgidFpvZ92gZHXSHH3IrmxhfWy4rIyTNJcRICeRZQe0iEcl35nR4Fu4k1kwrpV7jNwOv_Ek0qckCCMHeUq3ZzokuCJw_CY8AoWvyXn86fHcMwNxJ9s5Dddfzzf6_prlLzC45BwC0Fo3CFu6vrS9PCDfE34Wae1bgKTYG77AWMEgtSvXEKjsf7NE-rCZRAVJN97iivRUPXykEEgy7wZM03-s_W5d8rBNgr5ig_hOEOLV6t_u1T05UOmXPFI-jV-7TVJVia7Tpngk377qY4huTc85mUpxXM0poPwGk2r7Waq3l6bTG25sO16z493aawIkNHwpVE2Vh_c3e-y637Do4RnP45jUbT6QEjNDJTgcDHdhwS1-1hjkVN_EdEfFcVrchlxidWrPqrugrR65Kk1bBNGQDPA0qUe7KabGIphxfGzvTGOln5oaVS11-nrBDNrCXKXc3yLvPu7OUNxA040QJKxGUA659e0lTQB8FfeV1gBmiZ2ZWcV9iA7_eX_I0hbDmmwj9lFKUEtIm4xeT9PtcJ47dXif4342rOU0SwhJCYsv7_Gv_bGosgOKFVGhi1ilDKcoJ7iOcbmAyyF7C9o80jqUI167z7UzXnCk5661eDUQlTmXn0sduXR3d-uS1DuKLLXDea0w4gDHSB1W4KrlsOe5TH0yrgovRk";
  
    fetch('https://connect.mailerlite.com/api/groups?filter[name]=Newsletter', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to retrieve group information'); 
        }
        return response.json();
    })
    .then(data => {
        const groupId = data.data[0].id;

        fetch('https://connect.mailerlite.com/api/subscribers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                email: email,
                fields: {
                    name: name
                },
                groups: [groupId]
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Subscription failed');
            }
            document.getElementById("subscriptionForm").classList.add("hidden");
            document.getElementById("thankYouMessage").style.display = "flex";
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Subscription failed');
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to retrieve group information');
    });
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
