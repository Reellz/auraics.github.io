// In your form submission handler (replace the setTimeout with this)
fetch('https://webforms3.com/api/submit', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        formId: '56eb5523-71c2-4b5f-ad18-0bd1f35e193a',
        formData: Object.fromEntries(new FormData(form))
    })
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        window.location.href = 'thank-you.html';
    } else {
        alert('There was an error submitting the form. Please try again.');
        submitButton.disabled = false;
        submitButton.querySelector('.submit-text').style.display = 'block';
        submitButton.querySelector('.loading-spinner').style.display = 'none';
    }
})
.catch(error => {
    console.error('Error:', error);
    alert('There was an error submitting the form. Please try again.');
    submitButton.disabled = false;
    submitButton.querySelector('.submit-text').style.display = 'block';
    submitButton.querySelector('.loading-spinner').style.display = 'none';
});

document.addEventListener('DOMContentLoaded', () => {
    const countdownElement = document.getElementById('countdown');
    const redirectUrl = 'index.html'; 
    let secondsRemaining = 10;

    if (!countdownElement) {
        console.error("Countdown element with ID 'countdown' not found.");
        return;
    }


    countdownElement.textContent = secondsRemaining;

    const timer = setInterval(() => {
        secondsRemaining--;
        
        countdownElement.textContent = secondsRemaining;
        if (secondsRemaining <= 0) {
            clearInterval(timer);
            window.location.href = redirectUrl;
        }
    }, 1000); 
});
