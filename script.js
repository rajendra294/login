let users = JSON.parse(localStorage.getItem('users')) || [];

document.addEventListener('DOMContentLoaded', () => {
    const regForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('regName').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const password = document.getElementById('regPassword').value.trim();

            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('regEmailError');
            const passError = document.getElementById('regPasswordError');

            nameError.textContent = '';
            emailError.textContent = '';
            passError.textContent = '';

            if (name === '') {
                nameError.textContent = 'Name is required';
                return;
            }

            if (!email.includes('@')) {
                emailError.textContent = 'Enter a valid email';
                return;
            }

            if (users.some(user => user.email === email)) {
                emailError.textContent = 'Email already exists';
                return;
            }

            if (password.length < 6) {
                passError.textContent = 'Password should be at least 6 characters';
                return;
            }

            users.push({ name, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registered successfully!');
            window.location.href = 'index.html';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value.trim();
            const emailError = document.getElementById('loginEmailError');
            const passError = document.getElementById('loginPasswordError');

            emailError.textContent = '';
            passError.textContent = '';

            const user = users.find(user => user.email === email);

            if (!user) {
                emailError.textContent = 'Email not found';
                return;
            }

            if (user.password !== password) {
                passError.textContent = 'Incorrect password';
                return;
            }

            alert(`Welcome back, ${user.name}!`);
        });
    }
});
