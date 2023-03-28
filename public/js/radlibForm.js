const radlibFormHandler = async (event) => {
    event.preventDefault();

    const inputElements = document.querySelectorAll('.radlib-input');

    let content = []
    for (const input of inputElements){
        const value = input.value.trim();
        const blankId = input.getAttribute('id');

        content.push({content: value, blank_id: blankId});
    }

    if (inputElements) {
        const response = await fetch('/api/radlibs/', {
            method: 'POST',
            body: JSON.stringify(content),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            const data = await response.json();
            const id = data.radlibId;
            document.location.replace(`/radlibs/${id}`);
        } else {
            console.error (response.statusText);
        }
    }
};

const form = document.querySelector('#radlib').addEventListener('submit', radlibFormHandler);