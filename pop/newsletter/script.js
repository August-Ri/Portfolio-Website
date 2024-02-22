document.getElementById("subscriptionForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiNDU2YzJiYjZhNGYwZTMwZTY1ZDQ4MTY4MDE5YTliZWYyMzdlZGRhZmU3MWZkMzRiYTQ0NzQzY2ZkMjQ2ZWVjOGQ0NTc5MDY1ZmEyNDk3M2QiLCJpYXQiOjE3MDg1OTQwNDguMzA5MTU4LCJuYmYiOjE3MDg1OTQwNDguMzA5MTYzLCJleHAiOjQ4NjQyNjc2NDguMzA1Mzg0LCJzdWIiOiI4MzgyODIiLCJzY29wZXMiOltdfQ.OUIUzMh95h9KzXd7uqIAsThsNOjbjBCgGlLbpF950lgzy0uIDFyM4WS_RBFj039DoDSQH0A9KtlpMCWyZJZRG6r7MwREeyDeTagcGVGmsQzb_7p3-aZ9w05ksmAanah9pie5w_8Ifbi-kWTM7UL5NmE3bscuEDGdrM6h5yqRFVw0qwbYr8AnZf94qhofmTKyORRU2oTjGQVufGNQoFXediPp4c23A3Ma6z70hnH0UfccPNOULh3POxF1Mh8aWMyblPgPv0uIRMi2Ab7jLuiatAy7eqZUEASzrZXvqZsaKFTIT-xBhJDL04BrJnl_uf8DMqhTj7D9-kdzNWxR6kcjzLsRPKiGvjQJ-tDH3FKdZcJbtbBEWTVrOC8lryCNi9RVQZkjK-dWA8wVxtVZNNpMyl07fyeQq2qWo6OOUWPx0WSro4oigQqYsWDUoNAA0SRSDrIV03oGQyu_ZCEg-ZRF6gQy1InOKzFZno3xEFz0R9UC7epPDcbzfvQtgJNkie1jmj03HOnbidOkoSSanNayl-gpHcnAhdellzegfAAuErvkYOMOi09kzgoplj8iweEy8t9CAItHxTQs7caPI9ArL9i-Q0KWVukxA5YiYkRa-OqQcB0rrJvQKsfqMfwQzXvB0kREIoyS_i85Bt0FeU-5NLyHn90d5lJY0vkk_LOESEw";
  
    fetch('https://connect.mailerlite.com/api/groups?filter[name]=Pop', {
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
