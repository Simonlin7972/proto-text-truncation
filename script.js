const editableText = document.getElementById('editableText');
const container = document.querySelector('.container');
const draggableButton = document.getElementById('draggableButton');

// Create resizers
const resizers = ['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(position => {
    const resizer = document.createElement('div');
    resizer.classList.add('resizer', position);
    container.appendChild(resizer);
    return resizer;
});

// Show resizers and button on focus
editableText.addEventListener('focus', () => {
    resizers.forEach(resizer => resizer.style.display = 'block');
    draggableButton.style.display = 'block'; // Show button
});

// Hide resizers and button on blur
editableText.addEventListener('blur', () => {
    resizers.forEach(resizer => resizer.style.display = 'none');
    draggableButton.style.display = 'none'; // Hide button
});

// Draggable button functionality
draggableButton.addEventListener('mousedown', (e) => {
    e.preventDefault();
    const offsetX = e.clientX - draggableButton.getBoundingClientRect().left;
    const offsetY = e.clientY - draggableButton.getBoundingClientRect().top;

    const onMouseMove = (moveEvent) => {
        draggableButton.style.left = `${moveEvent.clientX - offsetX}px`;
        draggableButton.style.top = `${moveEvent.clientY - offsetY}px`;
    };

    const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

// Resizing functionality
resizers.forEach(resizer => {
    resizer.addEventListener('mousedown', (e) => {
        e.preventDefault();
        const startFontSize = parseFloat(getComputedStyle(editableText).fontSize);
        const startY = e.clientY;

        const onMouseMove = (moveEvent) => {
            const newFontSize = startFontSize + (moveEvent.clientY - startY) / 10; // Adjust the divisor for sensitivity
            editableText.style.fontSize = `${newFontSize}px`;
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
});