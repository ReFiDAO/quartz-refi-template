// Micro-app logic initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log('App initialized');

    const actionBtn = document.getElementById('action-btn');
    const resultDisplay = document.getElementById('result');

    if (actionBtn) {
        actionBtn.addEventListener('click', () => {
            const now = new Date().toLocaleTimeString();
            resultDisplay.textContent = `Button clicked at ${now}!`;
            
            // Add a small animation or effect
            actionBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                actionBtn.style.transform = 'scale(1)';
            }, 100);
        });
    }
});


