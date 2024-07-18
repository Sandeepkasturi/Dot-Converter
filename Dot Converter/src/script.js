const formats = {
    document: ['PDF', 'DOC', 'DOCX', 'TXT', 'ODT', 'RTF', 'HTML', 'MD', 'EPUB', 'PPT', 'PPTX'],
    image: ['JPG', 'JPEG', 'PNG', 'GIF', 'BMP', 'TIFF', 'TIF', 'SVG', 'PSD', 'AI', 'ICO'],
    audio: ['MP3', 'WAV', 'FLAC', 'AAC', 'OGG', 'M4A'],
    video: ['MP4', 'AVI', 'MKV', 'MOV', 'WMV', 'FLV'],
    archive: ['ZIP', 'RAR', '7Z', 'TAR', 'GZ'],
    other: ['JSON', 'XML', 'CSV']
};

const formatSelect = document.getElementById('formatSelect');
const customFormatInput = document.getElementById('customFormatInput');

function populateFormats() {
    for (const category in formats) {
        const optgroup = document.createElement('optgroup');
        optgroup.label = category.charAt(0).toUpperCase() + category.slice(1);

        formats[category].forEach(format => {
            const option = document.createElement('option');
            option.value = format.toLowerCase();
            option.textContent = format;
            optgroup.appendChild(option);
        });

        formatSelect.appendChild(optgroup);
    }
}

function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
        document.getElementById('fileName').textContent = `Selected File: ${file.name}`;
        formatSelect.style.display = 'block';
        customFormatInput.style.display = 'block';
    }
}

function convertFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const selectedFormat = formatSelect.value;
    const customFormat = customFormatInput.value.trim();

    if (!file) {
        alert('Please select a file to convert.');
        return;
    }

    const newExtension = customFormat ? customFormat : selectedFormat;
    const newFileName = file.name.replace(/\.[^/.]+$/, "") + `_converted.${newExtension}`;

    // Simulate the conversion process
    setTimeout(() => {
        alert(`File converted to: ${newFileName}`);
        downloadFile(newFileName);
    }, 1000);
}

function downloadFile(fileName) {
    const link = document.createElement('a');
    link.href = '#'; // This would be replaced with the actual file URL
    link.download = fileName;
    link.click();
}

function confirmProceed(shouldProceed) {
    const confirmation = document.getElementById('confirmation');
    confirmation.style.display = 'none';

    if (shouldProceed) {
        convertFile();
    }
}

// Initial population of formats
populateFormats();
function handleFileChange(event) {
    const file = event.target.files[0];
    const iframe = document.querySelector('.iframe');

    if (file) {
        const fileURL = URL.createObjectURL(file);
        iframe.src = fileURL;
        document.getElementById('fileName').textContent = `Selected File: ${file.name}`;
        formatSelect.style.display = 'block';
        customFormatInput.style.display = 'block';
    }
}
