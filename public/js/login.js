// login fetch API client JS
const loginFormHandler = async (event) => {
    event.preventDefault();

    // login values username and password
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // if login successful send to homepage
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);