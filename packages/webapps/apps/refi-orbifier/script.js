// ReFi Orbifier Logic
// Ported and adapted for Quartz ReFi Template

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const apiKeyInput = document.getElementById('api-key');
    const saveKeyBtn = document.getElementById('save-key');
    const apiStatus = document.getElementById('api-status');
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const loadingOverlay = document.getElementById('loading-overlay');
    const resultSection = document.getElementById('result-section');
    const uploadSection = document.getElementById('upload-section');
    const canvas = document.getElementById('orb-canvas');
    const ctx = canvas.getContext('2d');
    const downloadBtn = document.getElementById('download-btn');
    const shareBtn = document.getElementById('share-btn');
    const resetBtn = document.getElementById('reset-btn');

    // State
    let orbifiedImage = null;

    // Load saved API key
    const savedKey = localStorage.getItem('remove-bg-api-key');
    if (savedKey) {
        apiKeyInput.value = savedKey;
        showApiStatus('API key loaded from storage', 'success');
    }

    // API Key Management
    saveKeyBtn.addEventListener('click', () => {
        const key = apiKeyInput.value.trim();
        if (key) {
            localStorage.setItem('remove-bg-api-key', key);
            showApiStatus('API key saved successfully!', 'success');
        } else {
            localStorage.removeItem('remove-bg-api-key');
            showApiStatus('API key removed', '');
        }
    });

    function showApiStatus(msg, type) {
        apiStatus.textContent = msg;
        apiStatus.className = type;
    }

    // Upload Handling
    dropZone.addEventListener('click', () => fileInput.click());

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) handleFile(file);
    });

    async function handleFile(file) {
        const key = localStorage.getItem('remove-bg-api-key');
        if (!key) {
            alert('Please enter and save a remove.bg API key first.');
            return;
        }

        loadingOverlay.classList.remove('hidden');

        try {
            // 1. Remove Background
            const noBgBlob = await removeBackground(file, key);
            
            // 2. Process with Canvas
            await processImage(noBgBlob);

            // 3. Show Result
            uploadSection.classList.add('hidden');
            resultSection.classList.remove('hidden');
        } catch (error) {
            console.error(error);
            alert('Error processing image: ' + error.message);
        } finally {
            loadingOverlay.classList.add('hidden');
        }
    }

    async function removeBackground(file, key) {
        const formData = new FormData();
        formData.append('image_file', file);
        formData.append('size', 'auto');

        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: { 'X-Api-Key': key },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors?.[0]?.title || 'Failed to remove background');
        }

        return await response.blob();
    }

    function processImage(blob) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                // Set canvas size (square)
                const size = Math.min(img.width, img.height, 1000);
                canvas.width = size;
                canvas.height = size;

                // Draw background circle (the orb)
                const centerX = size / 2;
                const centerY = size / 2;
                const radius = size / 2;

                // Gradient for the orb
                const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.5, centerX, centerY, radius);
                gradient.addColorStop(0, '#22c55e'); // ReFi Green
                gradient.addColorStop(1, '#166534'); // Darker Green

                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                // Draw the person/object
                const scale = size / Math.max(img.width, img.height);
                const drawWidth = img.width * scale;
                const drawHeight = img.height * scale;
                const drawX = (size - drawWidth) / 2;
                const drawY = (size - drawHeight) / 2;

                ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

                // Add a slight glass effect overlay
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                const glassGradient = ctx.createLinearGradient(0, 0, size, size);
                glassGradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
                glassGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
                glassGradient.addColorStop(1, 'rgba(0, 0, 0, 0.1)');
                ctx.fillStyle = glassGradient;
                ctx.fill();

                orbifiedImage = canvas.toDataURL('image/png');
                resolve();
            };
            img.src = URL.createObjectURL(blob);
        });
    }

    // Actions
    downloadBtn.addEventListener('click', () => {
        if (!orbifiedImage) return;
        const link = document.createElement('a');
        link.download = 'refi-pfp.png';
        link.href = orbifiedImage;
        link.click();
    });

    shareBtn.addEventListener('click', () => {
        const text = encodeURIComponent('Just orbified my PFP for the ReFi community! 🟢✨\n\nBuild yours at: ' + window.location.href);
        window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
    });

    resetBtn.addEventListener('click', () => {
        resultSection.classList.add('hidden');
        uploadSection.classList.remove('hidden');
        fileInput.value = '';
        orbifiedImage = null;
    });
});


