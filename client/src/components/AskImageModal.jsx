import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaRobot, FaImage, FaCheck, FaEdit, FaMicrophone } from 'react-icons/fa';
import { askWithImage } from '../services/mediaApi';
import { useNavigate } from 'react-router-dom';

const AskImageModal = ({ isOpen, onClose, frame, onDoubtCreated }) => {
    const [question, setQuestion] = useState('');
    const [ocrText, setOcrText] = useState('');
    const [isEditingOcr, setIsEditingOcr] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (frame) {
            setOcrText(frame.ocrText || '');
            // Pre-fill question with OCR text if it's short, otherwise leave empty
            if (frame.ocrText && frame.ocrText.length < 100) {
                setQuestion(frame.ocrText);
            }
        }
    }, [frame]);

    const startListening = () => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            recognition.onstart = () => setIsListening(true);
            recognition.onend = () => setIsListening(false);
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setQuestion(prev => prev + (prev ? ' ' : '') + transcript);
            };

            recognition.start();
        } else {
            alert('Speech recognition is not supported in this browser.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question.trim()) return;

        setIsSubmitting(true);
        try {
            const result = await askWithImage(frame.frameId, question);

            if (onDoubtCreated) {
                onDoubtCreated(result);
            }

            // Navigate to doubt view or close modal
            onClose();
            // In a real app, we might navigate to the doubt page
            // navigate(`/doubts/${result.doubtId}`);
        } catch (error) {
            console.error('Error submitting doubt:', error);
            // Show error toast
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen || !frame) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
                >
                    {/* Left: Image Preview */}
                    <div className="w-full md:w-1/2 bg-gray-100 p-4 flex items-center justify-center border-r border-gray-200">
                        <div className="relative max-h-full">
                            <img
                                src={frame.cropUrl || frame.sourceUrl}
                                alt="Doubt context"
                                className="max-h-[60vh] md:max-h-[80vh] object-contain rounded-lg shadow-md"
                            />
                            <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                                {frame.sourceType === 'crop' ? 'Cropped Region' : 'Full Image'}
                            </div>
                        </div>
                    </div>

                    {/* Right: Question Form */}
                    <div className="w-full md:w-1/2 flex flex-col h-full">
                        {/* Header */}
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <FaRobot className="text-accent-teal" />
                                Ask AI
                            </h2>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <FaTimes size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {/* OCR Section */}
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <FaImage className="text-gray-400" />
                                        Extracted Text
                                    </h3>
                                    <button
                                        onClick={() => setIsEditingOcr(!isEditingOcr)}
                                        className="text-xs text-accent-teal hover:underline flex items-center gap-1"
                                    >
                                        <FaEdit />
                                        {isEditingOcr ? 'Done' : 'Edit'}
                                    </button>
                                </div>

                                {isEditingOcr ? (
                                    <textarea
                                        value={ocrText}
                                        onChange={(e) => setOcrText(e.target.value)}
                                        className="w-full p-2 text-sm border rounded focus:ring-1 focus:ring-accent-teal outline-none min-h-[100px]"
                                    />
                                ) : (
                                    <p className="text-sm text-gray-600 italic whitespace-pre-wrap">
                                        "{ocrText || 'No text detected'}"
                                    </p>
                                )}
                            </div>

                            {/* Question Input */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Your Question
                                    </label>
                                    <button
                                        onClick={startListening}
                                        className={`
                                            flex items-center gap-1 text-xs px-2 py-1 rounded-full transition-colors
                                            ${isListening
                                                ? 'bg-red-100 text-red-600 animate-pulse'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }
                                        `}
                                        title="Speak your question"
                                    >
                                        <FaMicrophone />
                                        {isListening ? 'Listening...' : 'Voice Input'}
                                    </button>
                                </div>
                                <textarea
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    placeholder="What would you like to know about this?"
                                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-teal focus:border-transparent outline-none min-h-[120px] resize-y"
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-gray-100 bg-gray-50">
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={!question.trim() || isSubmitting}
                                    className={`
                                        px-6 py-2 bg-accent-teal text-white rounded-lg font-medium
                                        flex items-center gap-2 transition-all
                                        ${(!question.trim() || isSubmitting)
                                            ? 'opacity-50 cursor-not-allowed'
                                            : 'hover:bg-accent-teal/90 shadow-lg hover:shadow-xl'
                                        }
                                    `}
                                >
                                    {isSubmitting ? (
                                        <>Processing...</>
                                    ) : (
                                        <>
                                            <FaCheck />
                                            Get Answer
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AskImageModal;
