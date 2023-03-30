const show = (elem, displayType = 'inline-block') => {
    elem.style.display = displayType;
};

const hide = (elem) => {
    elem.style.display = 'none';
}

const failMsg = 'Unable to save radlib text. Please try again.';
const saveSuccess = document.querySelector('#save-success');

if (saveSuccess) {
    hide(saveSuccess);
}

const saveInstanceText = async (e) => {
    e.preventDefault();

    const divElem = document.querySelector(".radlib-completed");
    const id = divElem.getAttribute("id").split("-")[1];

    const p = document.querySelector('.radlib-completed > p');
    const text = p.textContent.trim();

    try {
        const response = await fetch(`/api/radlibs/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed_text: text }),
        });

    if (response.ok) {
        const data = await response.json();
        show(saveSuccess);
        saveSuccess.textContent = data.message;
    } else {
        console.error(response.statusText);
        alert(failMsg);
    }

    } catch (err) {
        console.error(err);
        alert(failMsg)
    }
};

const saveButton = document.querySelector('#save-completed-text');

if (saveButton) {
    saveButton.addEventListener('click', saveInstanceText, { once: true });
}