const API_BASE = window.location.origin + '/api';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    // Generic form validation helper
    function validateInput(input, errorMessageElement, validationFn) {
        const value = input.value.trim();
        const error = validationFn(value);
        if (error) {
            errorMessageElement.textContent = error;
            input.classList.add('invalid');
            return false;
        } else {
            errorMessageElement.textContent = '';
            input.classList.remove('invalid');
            return true;
        }
    }

    // Email validation
    function validateEmail(email) {
        if (!email) return 'Email is required.';
        if (!/\S+@\S+\.\S+/.test(email)) return 'Invalid email format.';
        return '';
    }

    // Password validation
    function validatePassword(password) {
        if (!password) return 'Password is required.';
        if (password.length < 6) return 'Password must be at least 6 characters.';
        return '';
    }

    // Name validation
    function validateName(name) {
        if (!name) return 'Full Name is required.';
        return '';
    }

    // Handle Login
    async function handleLogin(e) {
        e.preventDefault();

        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const emailError = document.getElementById('email-error');
        const passwordError = document.getElementById('password-error');
        const serverError = document.getElementById('server-error');
        const loginBtn = document.getElementById('loginBtn');

        serverError.style.display = 'none';
        let isValid = true;

        isValid = validateInput(emailInput, emailError, validateEmail) && isValid;
        isValid = validateInput(passwordInput, passwordError, validatePassword) && isValid;

        if (!isValid) return;

        loginBtn.textContent = 'Logging In...';
        loginBtn.disabled = true;

        try {
            const response = await fetch(`${API_BASE}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: emailInput.value.trim(),
                    password: passwordInput.value
                }),
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('token', data.data.token);
                // Optionally store user data if desired
                // localStorage.setItem('user', JSON.stringify(data.data.user));
                window.location.href = '/dashboard.html';
            } else {
                serverError.textContent = data.message || 'Login failed. Please check your credentials.';
                serverError.style.display = 'block';
            }
        } catch (error) {
            console.error('Login error:', error);
            serverError.textContent = 'An unexpected error occurred. Please try again later.';
            serverError.style.display = 'block';
        } finally {
            loginBtn.textContent = 'Log In';
            loginBtn.disabled = false;
        }
    }

    // Handle Signup
    async function handleSignup(e) {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const termsCheckbox = document.getElementById('terms');

        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const passwordError = document.getElementById('password-error');
        const confirmPasswordError = document.getElementById('confirmPassword-error');
        const termsError = document.getElementById('terms-error');
        const serverError = document.getElementById('server-error');
        const signupBtn = document.getElementById('signupBtn');

        serverError.style.display = 'none';
        termsError.textContent = '';
        let isValid = true;

        isValid = validateInput(nameInput, nameError, validateName) && isValid;
        isValid = validateInput(emailInput, emailError, validateEmail) && isValid;
        isValid = validateInput(passwordInput, passwordError, validatePassword) && isValid;

        // Confirm password validation
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordError.textContent = 'Passwords do not match.';
            confirmPasswordInput.classList.add('invalid');
            isValid = false;
        } else {
            confirmPasswordError.textContent = '';
            confirmPasswordInput.classList.remove('invalid');
        }
        isValid = validateInput(confirmPasswordInput, confirmPasswordError, (val) => val ? '' : 'Confirm password is required.') && isValid;


        // Terms and conditions validation
        if (!termsCheckbox.checked) {
            termsError.textContent = 'You must agree to the terms and conditions.';
            isValid = false;
        } else {
            termsError.textContent = '';
        }

        if (!isValid) return;

        signupBtn.textContent = 'Signing Up...';
        signupBtn.disabled = true;

        try {
            const response = await fetch(`${API_BASE}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: nameInput.value.trim(),
                    email: emailInput.value.trim(),
                    password: passwordInput.value,
                }),
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('token', data.data.token);
                // localStorage.setItem('user', JSON.stringify(data.data.user));
                window.location.href = '/dashboard.html';
            } else {
                serverError.textContent = data.message || 'Signup failed. Please try again.';
                serverError.style.display = 'block';
            }
        } catch (error) {
            console.error('Signup error:', error);
            serverError.textContent = 'An unexpected error occurred. Please try again later.';
            serverError.style.display = 'block';
        } finally {
            signupBtn.textContent = 'Sign Up';
            signupBtn.disabled = false;
        }
    }
});