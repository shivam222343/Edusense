import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt, FaImage, FaSpinner, FaCheckCircle, FaPaste } from 'react-icons/fa';
import { uploadImage } from '../services/mediaApi';

/**
 * ImageUploader Component
 * Drag & drop, paste, or click to upload images for OCR processing
 */
const ImageUploader = ({ onUploadComplete, initialFile }) => {
    const [uploading, setUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(null);
    const [preview, setPreview] = useState(null);
    const [progress, setProgress] = useState(0);

    const onDrop = useCallback(async (acceptedFiles) => {
        if (acceptedFiles.length === 0) return;

        const file = acceptedFiles[0];

        // Show preview
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(file);

        // Upload
        setUploading(true);
        setUploadStatus(null);
        setProgress(0);

        try {
            const response = await uploadImage(file, null, (percent) => {
                setProgress(percent);
            });

            if (response.success) {
                setUploadStatus('success');

                // Notify parent component
                if (onUploadComplete) {
                    onUploadComplete(response.data);
                }
            } else {
                setUploadStatus('error');
            }
        } catch (error) {
            console.error('Upload error:', error);
            setUploadStatus('error');
        } finally {
            setUploading(false);
        }
    }, [onUploadComplete]);

    // Handle initial file
    useEffect(() => {
        if (initialFile) {
            onDrop([initialFile]);
        }
    }, [initialFile, onDrop]);

    // Handle paste events
    useEffect(() => {
        const handlePaste = (e) => {
            if (e.clipboardData && e.clipboardData.items) {
                const items = e.clipboardData.items;
                for (let i = 0; i < items.length; i++) {
                    if (items[i].type.indexOf('image') !== -1) {
                        const file = items[i].getAsFile();
                        onDrop([file]);
                        break;
                    }
                }
            }
        };

        document.addEventListener('paste', handlePaste);
        return () => document.removeEventListener('paste', handlePaste);
    }, [onDrop]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
        },
        maxFiles: 1,
        maxSize: 10 * 1024 * 1024, // 10MB
    });

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div
                {...getRootProps()}
                className={`
                    relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
                    transition-all duration-200
                    ${isDragActive
                        ? 'border-accent-teal bg-accent-teal/10'
                        : 'border-gray-700 hover:border-accent-teal hover:bg-dark-card'
                    }
                    ${uploading ? 'pointer-events-none opacity-50' : ''}
                `}
            >
                <input {...getInputProps()} />

                {preview ? (
                    <div className="space-y-4">
                        <img
                            src={preview}
                            alt="Preview"
                            className="max-h-64 mx-auto rounded-lg shadow-md border border-gray-700"
                        />

                        {uploading && (
                            <div className="w-full max-w-xs mx-auto">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium text-accent-teal">Uploading...</span>
                                    <span className="text-sm font-medium text-accent-teal">{progress}%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2.5">
                                    <div
                                        className="bg-accent-teal h-2.5 rounded-full transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        {uploadStatus === 'success' && (
                            <div className="flex items-center justify-center gap-2 text-green-400">
                                <FaCheckCircle className="text-2xl" />
                                <span className="font-medium">Upload successful!</span>
                            </div>
                        )}

                        {uploadStatus === 'error' && (
                            <div className="text-red-400 font-medium">
                                Upload failed. Please try again.
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        <FaCloudUploadAlt className="mx-auto text-6xl text-gray-500" />

                        <div>
                            <p className="text-lg font-medium text-white">
                                {isDragActive
                                    ? 'Drop image here...'
                                    : 'Drag & drop, Paste (Ctrl+V), or click to select'
                                }
                            </p>
                            <p className="text-sm text-gray-400 mt-2">
                                Supports: JPEG, PNG, WebP (max 10MB)
                            </p>
                        </div>

                        <button
                            type="button"
                            className="px-6 py-3 bg-accent-teal text-white rounded-lg font-medium
                                     hover:bg-accent-teal/90 transition-colors"
                        >
                            <FaImage className="inline mr-2" />
                            Choose Image
                        </button>
                    </div>
                )}
            </div>

            {uploadStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-900/20 border border-green-800 rounded-lg">
                    <p className="text-sm text-green-400">
                        ✅ Image uploaded successfully! OCR processing started.
                        You'll be notified when text extraction is complete.
                    </p>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
