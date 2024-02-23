document.getElementById("subscriptionForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMTE4ZGJlYTk5OWMzNjkwYjY5MWYxODJiNmVhMjBmMDY5YjJlYTFhYThiNGViZjNmMDkxYmM3N2E0NmI3ZjEwYmRkNGU5MjgzNTE5MTY1OTMiLCJpYXQiOjE3MDg2ODg2MzcuNzUwMTQsIm5iZiI6MTcwODY4ODYzNy43NTAxNDQsImV4cCI6NDg2NDM2MjIzNy43NDUyOTUsInN1YiI6IjgzNzU4OCIsInNjb3BlcyI6W119.w-4-JmwM5gOZFBlQ3rbRPAt8YVb13MVH2xw0HvHfHVFNtJJEW5xhrTbQ14_JDsYWFNL-sOkHygbtfyOZVa1lO0EG25hwInANzN3d2q730CvfH3lRPZaoHl12HTRtTh1CprsKvuW5J_NMNxfY78R9TJv6MGkKZ6p2RD0oW-eyiu_feYUNUrC62P8P77kIRHLKn_JlqOVnpoB3cN4OSYL28cRZfls4geMj7d_2gOA8XOBIcGjZEqyGCMM145KOc30rAQsWymGD8vpifD8Jd-0UG6Y_J6NW0JcLr-o5ZrJfG8YqztS1Ls88A92ynSw2a-BgexwdXuNQw94_jCiq2MFQMHkptR0pW4G2kDk1b_fxqS5BarndnXOyj5_QtQ9X_f9oO5EF95Cb7sUgYN0n0GBszZL4-tDO1hIeYmjwz2Sba4aNMOtnwmatDW2Y4ynq_mOB2TsOe48Nbg91qyF4aCcx6T9riODAlMsV0E4kUUfPMM6LJyn-LLZ1WZ4x4mk24IsSZoFGg4fTkFkvE7yMem9q4IU4zdZ08n7ZYjTpf2vVvsT7a6uded-mb5dChiS6K2LriyjrsDbcQ74tQy1F7m8t0TdksZntVW_Vz0W_waUHH6SjBsDllmI5rL48wLC2O2lSd_pu22At3eLtSViMV80L3pLK61DPq39pRmuWL4oUBzM";
  
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
