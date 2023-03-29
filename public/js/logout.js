// logout fetch API client JS
const logout = async (e) => {
    e.preventDefault(); 
    // not sure if this is the right route to fetch, but this is what they look like on the activities from last week
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        // redirect the user to the homepage?
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

// this will only be visible to a logged in user and since there will be no submit button it is listening for a click on whatever we name that button to logout
document.querySelector('#logout').addEventListener('click', logout);