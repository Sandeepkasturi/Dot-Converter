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
    const iframe = document.querySelector('.iframe');

    if (file) {
        const fileURL = URL.createObjectURL(file);
        iframe.src = fileURL;
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
        downloadFile(file, newFileName, newExtension);
    }, 1000);
}

function downloadFile(file, newFileName, newExtension) {
    // Create a blob URL for the converted file
    const blob = new Blob([file], { type: getMimeType(newExtension) });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = newFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function getMimeType(extension) {
    const mimeTypes = {
        pdf: 'application/pdf',
        doc: 'application/msword',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        txt: 'text/plain',
        odt: 'application/vnd.oasis.opendocument.text',
        rtf: 'application/rtf',
        html: 'text/html',
        md: 'text/markdown',
        epub: 'application/epub+zip',
        ppt: 'application/vnd.ms-powerpoint',
        pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        gif: 'image/gif',
        bmp: 'image/bmp',
        tiff: 'image/tiff',
        tif: 'image/tiff',
        svg: 'image/svg+xml',
        psd: 'image/vnd.adobe.photoshop',
        ai: 'application/postscript',
        ico: 'image/vnd.microsoft.icon',
        mp3: 'audio/mpeg',
        wav: 'audio/wav',
        flac: 'audio/flac',
        aac: 'audio/aac',
        ogg: 'audio/ogg',
        m4a: 'audio/mp4',
        mp4: 'video/mp4',
        avi: 'video/x-msvideo',
        mkv: 'video/x-matroska',
        mov: 'video/quicktime',
        wmv: 'video/x-ms-wmv',
        flv: 'video/x-flv',
        zip: 'application/zip',
        rar: 'application/x-rar-compressed',
        '7z': 'application/x-7z-compressed',
        tar: 'application/x-tar',
        gz: 'application/gzip',
        json: 'application/json',
        xml: 'application/xml',
        csv: 'text/csv'
    };
    return mimeTypes[extension.toLowerCase()] || 'application/octet-stream';
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
