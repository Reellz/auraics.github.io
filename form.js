document.addEventListener('DOMContentLoaded', function() {
    // Form navigation and validation
    const form = document.getElementById('admissionForm');
    const formSteps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-steps .step');
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    const submitButton = document.querySelector('.btn-submit');
    const successMessage = document.querySelector('.form-success');
    
    let currentStep = 1;
    const totalSteps = 4;
    
    // Initialize form
    showStep(currentStep);
    
    // Next button click handler
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const nextStep = parseInt(this.getAttribute('data-next'));
            
            if (validateStep(currentStep)) {
                currentStep = nextStep;
                updateProgress();
                showStep(currentStep);
                scrollToTop();
            }
        });
    });
    
    // Previous button click handler
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const prevStep = parseInt(this.getAttribute('data-prev'));
            currentStep = prevStep;
            updateProgress();
            showStep(currentStep);
            scrollToTop();
        });
    });
    
    // Form submission handler with Formspree AJAX
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (!validateStep(currentStep)) return;

        if (!document.getElementById('terms').checked) {
            showError('termsError', 'You must accept the terms to submit the application');
            return;
        }

        submitButton.disabled = true;
        submitButton.querySelector('.submit-text').style.display = 'none';
        submitButton.querySelector('.loading-spinner').style.display = 'block';

        const formData = new FormData(form);

        try {
            const response = await fetch('https://formspree.io/f/mgvzdydp', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                form.style.display = 'none';
                successMessage.style.display = 'block';
                scrollToTop();
            } else {
                const data = await response.json();
                if (data.errors) {
                    alert(data.errors.map(err => err.message).join("\n"));
                } else {
                    alert("Oops! There was a problem submitting your form.");
                }
                submitButton.disabled = false;
                submitButton.querySelector('.submit-text').style.display = 'block';
                submitButton.querySelector('.loading-spinner').style.display = 'none';
            }
        } catch (error) {
            alert("Oops! There was a problem submitting your form.");
            submitButton.disabled = false;
            submitButton.querySelector('.submit-text').style.display = 'block';
            submitButton.querySelector('.loading-spinner').style.display = 'none';
            console.error(error);
        }
    });
    
    // Show the current step and hide others
    function showStep(stepNumber) {
        formSteps.forEach(step => {
            if (parseInt(step.getAttribute('data-step')) === stepNumber) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // On the review step, populate the review sections
        if (stepNumber === 4) {
            populateReviewSections();
        }
    }
    
    // Update progress indicators
    function updateProgress() {
        progressSteps.forEach(step => {
            const stepNum = parseInt(step.getAttribute('data-step'));
            
            if (stepNum < currentStep) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (stepNum === currentStep) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });
    }
    
    // Validate current step before proceeding
    function validateStep(stepNumber) {
        let isValid = true;
        
        // Reset error messages
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
            el.style.display = 'none';
        });
        
        // Step 1 validation
        if (stepNumber === 1) {
            const firstName = document.getElementById('firstName');
            const lastName = document.getElementById('lastName');
            const dob = document.getElementById('dob');
            const gender = document.getElementById('gender');
            const country = document.getElementById('country');
            const address = document.getElementById('address');
            
            if (!firstName.value.trim()) {
                showError('firstNameError', 'First name is required');
                isValid = false;
            }
            
            if (!lastName.value.trim()) {
                showError('lastNameError', 'Last name is required');
                isValid = false;
            }
            
            if (!dob.value) {
                showError('dobError', 'Date of birth is required');
                isValid = false;
            }
            
            if (!gender.value) {
                showError('genderError', 'Gender is required');
                isValid = false;
            }
            
            if (!country.value) {
                showError('countryError', 'Country is required');
                isValid = false;
            }
            
            if (!address.value.trim()) {
                showError('addressError', 'Current place of residence is required');
                isValid = false;
            }
        }
        
        // Step 2 validation
        if (stepNumber === 2) {
            const parent1Name = document.getElementById('parent1Name');
            const parent1Relationship = document.getElementById('parent1Relationship');
            const parent1Phone = document.getElementById('parent1Phone');
            const emergencyContact = document.getElementById('emergencyContact');
            const emergencyRelationship = document.getElementById('emergencyRelationship');
            const emergencyPhone = document.getElementById('emergencyPhone');
            
            if (!parent1Name.value.trim()) {
                showError('parent1NameError', 'Parent/guardian name is required');
                isValid = false;
            }
            
            if (!parent1Relationship.value) {
                showError('parent1RelationshipError', 'Relationship is required');
                isValid = false;
            }
            
            if (!parent1Phone.value.trim()) {
                showError('parent1PhoneError', 'Phone number is required');
                isValid = false;
            }
            
            if (!emergencyContact.value.trim()) {
                showError('emergencyContactError', 'Emergency contact name is required');
                isValid = false;
            }
            
            if (!emergencyRelationship.value.trim()) {
                showError('emergencyRelationshipError', 'Emergency contact relationship is required');
                isValid = false;
            }
            
            if (!emergencyPhone.value.trim()) {
                showError('emergencyPhoneError', 'Emergency phone number is required');
                isValid = false;
            }
            
            const parent1Email = document.getElementById('parent1Email');
            if (parent1Email.value && !validateEmail(parent1Email.value)) {
                showError('parent1EmailError', 'Please enter a valid email address');
                isValid = false;
            }
        }
        
        // Step 3 validation
        if (stepNumber === 3) {
            const prevSchool = document.getElementById('prevSchool');
            const gradeApplying = document.getElementById('gradeApplying');
            const startDate = document.getElementById('startDate');
            
            if (!prevSchool.value.trim()) {
                showError('prevSchoolError', 'Previous school is required');
                isValid = false;
            }
            
            if (!gradeApplying.value) {
                showError('gradeApplyingError', 'Grade is required');
                isValid = false;
            }
            
            if (!startDate.value) {
                showError('startDateError', 'Start date is required');
                isValid = false;
            }
        }
        
        // Step 4 validation
        if (stepNumber === 4) {
            const hearAboutUs = document.getElementById('hearAboutUs');
            
            if (!hearAboutUs.value) {
                showError('hearAboutUsError', 'Please tell us how you heard about us');
                isValid = false;
            }
            
            if (!document.getElementById('terms').checked) {
                showError('termsError', 'You must accept the terms and conditions');
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    // Show error message
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    // Email validation helper
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Populate review sections
    function populateReviewSections() {
        // Student Info
        const studentInfo = `
            <div class="review-item">
                <strong>Full Name</strong>
                <span>${document.getElementById('firstName').value} ${document.getElementById('lastName').value}</span>
            </div>
            <div class="review-item">
                <strong>Date of Birth</strong>
                <span>${formatDate(document.getElementById('dob').value)}</span>
            </div>
            <div class="review-item">
                <strong>Gender</strong>
                <span>${capitalizeFirstLetter(document.getElementById('gender').value)}</span>
            </div>
            <div class="review-item">
                <strong>Country</strong>
                <span>${document.getElementById('country').options[document.getElementById('country').selectedIndex].text}</span>
            </div>
            <div class="review-item">
                <strong>Place of Birth</strong>
                <span>${document.getElementById('pob').value || 'Not provided'}</span>
            </div>
            <div class="review-item">
                <strong>Current Residence</strong>
                <span>${document.getElementById('address').value}</span>
            </div>
        `;
        
        document.getElementById('reviewStudentInfo').innerHTML = studentInfo;
        
        // Parent Info
        const parent1Info = `
            <div class="review-item">
                <strong>Primary Parent/Guardian</strong>
                <span>${document.getElementById('parent1Name').value}</span>
            </div>
            <div class="review-item">
                <strong>Relationship</strong>
                <span>${capitalizeFirstLetter(document.getElementById('parent1Relationship').value)}</span>
            </div>
            <div class="review-item">
                <strong>Phone</strong>
                <span>${document.getElementById('parent1Phone').value}</span>
            </div>
            <div class="review-item">
                <strong>Email</strong>
                <span>${document.getElementById('parent1Email').value || 'Not provided'}</span>
            </div>
            <div class="review-item">
                <strong>Occupation</strong>
                <span>${document.getElementById('parent1Occupation').value || 'Not provided'}</span>
            </div>
            <div class="review-item">
                <strong>Residence</strong>
                <span>${document.getElementById('parent1Residence').value || 'Same as student'}</span>
            </div>
        `;
        
        const emergencyInfo = `
            <div class="review-item">
                <strong>Emergency Contact</strong>
                <span>${document.getElementById('emergencyContact').value}</span>
            </div>
            <div class="review-item">
                <strong>Relationship</strong>
                <span>${capitalizeFirstLetter(document.getElementById('emergencyRelationship').value)}</span>
            </div>
            <div class="review-item">
                <strong>Phone</strong>
                <span>${document.getElementById('emergencyPhone').value}</span>
            </div>
            <div class="review-item">
                <strong>Email</strong>
                <span>${document.getElementById('emergencyEmail').value || 'Not provided'}</span>
            </div>
        `;
        
        document.getElementById('reviewParentInfo').innerHTML = parent1Info + emergencyInfo;
        
        // Academic Info
        const academicInfo = `
            <div class="review-item">
                <strong>Previous School</strong>
                <span>${document.getElementById('prevSchool').value}</span>
            </div>
            <div class="review-item">
                <strong>Grade Applying For</strong>
                <span>${formatGrade(document.getElementById('gradeApplying').value)}</span>
            </div>
            <div class="review-item">
                <strong>Preferred Start Date</strong>
                <span>${formatDate(document.getElementById('startDate').value)}</span>
            </div>
            <div class="review-item">
                <strong>Special Needs</strong>
                <span>${document.getElementById('specialNeeds').value || 'None'}</span>
            </div>
            <div class="review-item">
                <strong>Extracurricular Interests</strong>
                <span>${document.getElementById('extracurricular').value || 'None'}</span>
            </div>
            <div class="review-item">
                <strong>Medical Conditions</strong>
                <span>${document.getElementById('medicalConditions').value || 'None'}</span>
            </div>
            <div class="review-item">
                <strong>Physician's Name</strong>
                <span>${document.getElementById('physicianName').value || 'Not provided'}</span>
            </div>
            <div class="review-item">
                <strong>Physician's Phone</strong>
                <span>${document.getElementById('physicianPhone').value || 'Not provided'}</span>
            </div>
        `;
        
        document.getElementById('reviewAcademicInfo').innerHTML = academicInfo;
    }
    
    // Helper function to format date
    function formatDate(dateString) {
        if (!dateString) return 'Not specified';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }
    
    // Helper function to capitalize first letter
    function capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    // Helper function to format grade
    function formatGrade(gradeValue) {
        if (!gradeValue) return 'Not specified';
        
        const gradeMap = {
            'daycare': 'Daycare',
            'kindergarten': 'Kindergarten',
            'grade1': 'Grade 1',
            'grade2': 'Grade 2',
            'grade3': 'Grade 3',
            'grade4': 'Grade 4',
            'grade5': 'Grade 5',
            'grade6': 'Grade 6',
            'grade7': 'Grade 7',
            'grade8': 'Grade 8',
            'grade9': 'Grade 9',
            'grade10': 'Grade 10',
            'grade11': 'Grade 11',
            'grade12': 'Grade 12'
        };
        
        return gradeMap[gradeValue] || gradeValue;
    }
    
    // Scroll to top of form
    function scrollToTop() {
        window.scrollTo({
            top: document.querySelector('.form-container').offsetTop - 20,
            behavior: 'smooth'
        });
    }
    
    // Mobile menu toggle
    document.querySelector('.mobile-menu-toggle').addEventListener('click', function() {
        document.querySelector('.main-nav').classList.toggle('open');
    });
});
