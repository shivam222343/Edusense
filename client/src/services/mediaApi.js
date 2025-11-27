import api from '../config/api';

/**
 * Upload image for OCR processing
 * @param {File} file - Image file
 * @param {string} lectureId - Optional lecture ID
 * @param {Function} onProgress - Optional progress callback (percentage)
 * @returns {Promise} - { frameId, previewUrl, status }
 */
export const uploadImage = async (file, lectureId = null, onProgress = null) => {
    const formData = new FormData();
    formData.append('file', file);
    if (lectureId) {
        formData.append('lectureId', lectureId);
    }

    console.log(`📤 Uploading image...`);

    const response = await api.post('/api/media/upload-image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
            if (onProgress) {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                onProgress(percentCompleted);
            }
        },
    });

    return response.data;
};

/**
 * Upload PDF for page extraction
 * @param {File} file - PDF file
 * @param {string} lectureId - Optional lecture ID
 * @returns {Promise} - { pdfId, pageCount, status }
 */
export const uploadPdf = async (file, lectureId = null) => {
    const formData = new FormData();
    formData.append('file', file);
    if (lectureId) {
        formData.append('lectureId', lectureId);
    }

    const response = await api.post('/api/media/upload-pdf', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    console.log("response.data: ", response.data);


    return response.data;
};

/**
 * Extract crop from image/PDF page
 * @param {string} frameId - Source frame ID
 * @param {Object} cropData - { x, y, width, height, scale }
 * @returns {Promise} - { cropFrameId, cropUrl, status }
 */
export const extractCrop = async (frameId, cropData) => {
    const response = await api.post('/api/media/extract-crop', {
        frameId,
        ...cropData,
    });

    return response.data;
};

/**
 * Get frame by ID
 * @param {string} frameId - Frame ID
 * @returns {Promise} - Frame data
 */
export const getFrame = async (frameId) => {
    const response = await api.get(`/api/media/frames/${frameId}`);
    return response.data;
};

/**
 * Ask question with image context
 * @param {string} frameId - Frame ID
 * @param {string} questionText - Question text
 * @returns {Promise} - Doubt/answer data
 */
export const askWithImage = async (frameId, questionText) => {
    const response = await api.post('/api/ask/image', {
        frameId,
        questionText,
    });

    return response.data;
};

/**
 * Get pages for a PDF frame
 * @param {string} pdfId - PDF Frame ID
 * @returns {Promise} - Array of page frames
 */
export const getPdfPages = async (pdfId) => {
    const response = await api.get(`/api/media/frames/${pdfId}/pages`);
    return response.data;
};

/**
 * Get user's past uploads
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @returns {Promise} - { uploads, pagination }
 */
export const getUserUploads = async (page = 1, limit = 20) => {
    const response = await api.get('/api/media/my-uploads', {
        params: { page, limit },
    });

    return response.data;
};

/**
 * Delete frame
 * @param {string} frameId - Frame ID
 * @returns {Promise} - Success status
 */
export const deleteFrame = async (frameId) => {
    const response = await api.delete(`/api/media/frames/${frameId}`);
    return response.data;
};
