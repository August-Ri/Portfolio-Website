document.getElementById("subscriptionForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMDM0MWVkNTZkYWZkYmY2MmQ4NDM3NTJhMDA5NzE1ZGFiNGNmNjdhODY3M2UwM2I0YjQyYTFiMDY4MjFiN2RhMTM1ZTBiNjE3YTRmNTNkMzkiLCJpYXQiOjE3MDc4NDU2MzAuMzUzODM2LCJuYmYiOjE3MDc4NDU2MzAuMzUzODM3LCJleHAiOjQ4NjM1MTkyMzAuMzQ5OTk4LCJzdWIiOiI4Mzc1ODgiLCJzY29wZXMiOltdfQ.S5_c2D4gwdmzY_NanRego2vAGOp_z3u4Tr_MoIowqenT2-tzX5iftwbX8ISB1cURFR92rjAQggK-I8C2aL0pCnEI5pEh-P8BrIIk9aYCY_OPPVPJn0U2UJSzN-NIac5zlgT61eGj-lrrbmKqI5FYpbV6yjiMt_hmK7c9PI_DOuN5z2nH6Gn8KoaVrGwJApGlWnThFzKpUeOCsEcXdy4taEDx8ic8dSjId8FwiyBopEUwyX3CwBY1c3JfgtNLPIxbB2ExfWhUBKsFHzc-kknioRyxtlDnWBfs48ebIVF0Gq8QRgJq-DZ_yL1PFLBqYZlUJbjtAowqb7uQs4C0M7Y0iAj1LR_7YwT3YF8Y2-TxD4zSvurmmMA2oRJecxNbSjq3ZvQEoXEKrYNX-QLzVJOqF4k23CZM3osHkCmdcdEqA1YpobKBwAZ4BUyxQtjOiBlM3uvohBRtWlyMoC6Nfg4Ru_LbQYUwQTOjI2KezE7_i8JMFVLQpU5RdoWBCG7wu176IJ6yNNO3KtWYm-RSUNMcigAFcT_DjhchUbOQaapM8MGP9gXaCDxwOIiOJDBmRufdUCAfq69N-54soch4DFVKk1PIT5yqyEp5l8gLjpiF0BSp_bUd0Qozo90LNNGTs8ScsJzyQC4kQJQm0ZmcwQVmpS6xRyNoN1sZjpbzrUcf-r8";
  
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
