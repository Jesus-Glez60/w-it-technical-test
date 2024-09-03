function validatePasswords() {
    const password = document.getElementById('password').value;
    const verifyPassword = document.getElementById('verify_password').value;
    const passwordFeedback = document.getElementById('password-feedback');
    const verifyPasswordFeedback = document.getElementById('verify-password-feedback');
    
    // Clear previous feedback
    passwordFeedback.textContent = '';
    passwordFeedback.style.color = 'black';
    verifyPasswordFeedback.textContent = '';
    verifyPasswordFeedback.style.color = 'black';
    
    // Regular expression for password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  
    // Validate password criteria
    if (!passwordRegex.test(password)) {
      passwordFeedback.textContent = 'Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, and a number.';
      passwordFeedback.style.color = 'red';
    }
  
    // Validate matching passwords
    if (verifyPassword && password !== verifyPassword) {
      verifyPasswordFeedback.textContent = 'Passwords do not match.';
      verifyPasswordFeedback.style.color = 'red';
    }
  }
  