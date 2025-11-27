import { useState, useEffect } from 'react';
import { FaImage, FaFilePdf, FaHistory } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import ImageUploader from '../components/ImageUploader';
import AskImageModal from '../components/AskImageModal';

/**
 * UploadPage
 * Main page for uploading images and PDFs
 */
const UploadPage = () => {
    const [activeTab, setActiveTab] = useState('image');
    const [uploadedFrames, setUploadedFrames] = useState([]);
    const [showAskModal, setShowAskModal] = useState(false);
    const [currentFrame, setCurrentFrame] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const initialFile = location.state?.file;

    // Clear location state after using it to prevent re-upload on refresh
    useEffect(() => {
        if (initialFile) {
            // Optional: Clear state (React Router doesn't have a direct way to clear state without navigating, 
            // but we can just rely on the component mounting logic)
            window.history.replaceState({}, document.title);
        }
    }, [initialFile]);

    const handleUploadComplete = (frameData) => {
        console.log('Upload complete:', frameData);
        setUploadedFrames(prev => [frameData, ...prev]);
        setCurrentFrame(frameData);
        setShowAskModal(true);
    };

    const handleDoubtCreated = (doubtData) => {
        console.log('Doubt created:', doubtData);
        // Navigate to the doubt page or history
        navigate('/doubts');
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">
                    Upload & Ask
                </h1>
                <p className="text-gray-400">
                    Upload images or PDFs to extract text and ask questions
                </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-4 mb-8">
                <button
                    onClick={() => setActiveTab('image')}
                    className={`
                        px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2
                        ${activeTab === 'image'
                            ? 'bg-accent-teal text-white shadow-lg'
                            : 'bg-dark-panel text-gray-400 hover:bg-dark-card border border-dark-border'
                        }
                    `}
                >
                    <FaImage />
                    Upload Image
                </button>

                <button
                    onClick={() => setActiveTab('pdf')}
                    className={`
                        px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2
                        ${activeTab === 'pdf'
                            ? 'bg-accent-teal text-white shadow-lg'
                            : 'bg-dark-panel text-gray-400 hover:bg-dark-card border border-dark-border'
                        }
                    `}
                >
                    <FaFilePdf />
                    Upload PDF
                </button>

                <button
                    onClick={() => setActiveTab('history')}
                    className={`
                        px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2
                        ${activeTab === 'history'
                            ? 'bg-accent-teal text-white shadow-lg'
                            : 'bg-dark-panel text-gray-400 hover:bg-dark-card border border-dark-border'
                        }
                    `}
                >
                    <FaHistory />
                    Recent Uploads
                </button>
            </div>

            {/* Content */}
            <div className="bg-dark-panel rounded-xl shadow-lg p-8 border border-dark-border">
                {activeTab === 'image' && (
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Upload Image
                        </h2>
                        <p className="text-gray-400 mb-6">
                            Upload an image of a textbook page, problem, or notes.
                            We'll extract the text using OCR and you can ask questions about it.
                        </p>
                        <ImageUploader
                            onUploadComplete={handleUploadComplete}
                            initialFile={initialFile}
                        />
                    </div>
                )}

                {activeTab === 'pdf' && (
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Upload PDF
                        </h2>
                        <p className="text-gray-400 mb-6">
                            Upload a PDF document. We'll extract each page as an image,
                            and you can select specific regions to ask questions about.
                        </p>
                        <div className="text-center py-12 text-gray-500">
                            PDF upload coming soon...
                        </div>
                    </div>
                )}

                {activeTab === 'history' && (
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Recent Uploads
                        </h2>

                        {uploadedFrames.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                No uploads yet. Upload an image or PDF to get started!
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {uploadedFrames.map((frame, index) => (
                                    <div
                                        key={index}
                                        className="border border-dark-border rounded-lg p-4 hover:bg-dark-card transition-colors"
                                    >
                                        <img
                                            src={frame.previewUrl}
                                            alt="Upload preview"
                                            className="w-full h-40 object-cover rounded mb-2"
                                        />
                                        <div className="text-sm text-gray-400">
                                            <p className="font-medium text-white">Frame ID: {frame.frameId}</p>
                                            <p className="text-xs mt-1">Status: {frame.status}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Info Section */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-dark-panel p-6 rounded-lg shadow border border-dark-border">
                    <h3 className="font-bold text-white mb-2">📸 Step 1: Upload</h3>
                    <p className="text-sm text-gray-400">
                        Upload an image or PDF of your study material
                    </p>
                </div>
                <div className="bg-dark-panel p-6 rounded-lg shadow border border-dark-border">
                    <h3 className="font-bold text-white mb-2">🔍 Step 2: Extract</h3>
                    <p className="text-sm text-gray-400">
                        Our AI extracts text using advanced OCR technology
                    </p>
                </div>
                <div className="bg-dark-panel p-6 rounded-lg shadow border border-dark-border">
                    <h3 className="font-bold text-white mb-2">💬 Step 3: Ask</h3>
                    <p className="text-sm text-gray-400">
                        Ask questions and get AI-powered answers with context
                    </p>
                </div>
            </div>

            <AskImageModal
                isOpen={showAskModal}
                onClose={() => setShowAskModal(false)}
                frame={currentFrame}
                onDoubtCreated={handleDoubtCreated}
            />
        </div>
    );
};

export default UploadPage;