// signup fetch API client JS
const signupFormHandler = async (event) => {
    event.preventDefault();

    // signup values username and password correct
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // if signup successful send to homepage
            document.location.replace('/homepage');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);