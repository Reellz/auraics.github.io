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