import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import InteractiveImage from './InteractiveImage';

const PdfPageViewer = ({ pdfFrames, onCropSelect }) => {
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');

    const currentPage = pdfFrames && pdfFrames.length > 0 ? pdfFrames[currentPageIndex] : null;

    useEffect(() => {
        // Reset text when page changes for selective extraction
        setDisplayedText('');
        if (onCropSelect) {
            onCropSelect('');
        }

        if (currentPage) {
            console.log(`📄 Page ${currentPageIndex + 1} loaded:`, currentPage);
            console.log(`📊 OCR Raw words:`, currentPage.ocrRaw?.words?.length || 0);
        }
    }, [currentPageIndex, currentPage]); // Only reset on page change

    const goToNextPage = () => {
        if (currentPageIndex < pdfFrames.length - 1) {
            setCurrentPageIndex(prev => prev + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPageIndex > 0) {
            setCurrentPageIndex(prev => prev - 1);
        }
    };

    const handleCropSelection = (cropData) => {
        if (cropData && cropData.extractedText && cropData.extractedText.trim().length > 0) {
            setDisplayedText(cropData.extractedText);
            if (onCropSelect) {
                onCropSelect(cropData.extractedText);
            }
        } else if (cropData === null) {
            // Selection cleared
            setDisplayedText('');
            if (onCropSelect) {
                onCropSelect('');
            }
        }
    };

    if (!pdfFrames || pdfFrames.length === 0) {
        return (
            <div className="text-center p-8 text-gray-500">
                No PDF pages available
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Page Navigation */}
            <div className="flex items-center justify-between bg-dark-card p-4 rounded-lg border border-gray-700">
                <button
                    onClick={goToPreviousPage}
                    disabled={currentPageIndex === 0}
                    className="p-2 rounded-lg bg-accent-teal/20 text-accent-teal hover:bg-accent-teal/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    <FaChevronLeft />
                </button>

                <div className="text-center">
                    <p className="text-white font-medium">
                        Page {currentPageIndex + 1} of {pdfFrames.length}
                    </p>
                    <p className="text-gray-400 text-sm">
                        {currentPage?.pageNumber ? `PDF Page ${currentPage.pageNumber}` : ''}
                    </p>
                </div>

                <button
                    onClick={goToNextPage}
                    disabled={currentPageIndex === pdfFrames.length - 1}
                    className="p-2 rounded-lg bg-accent-teal/20 text-accent-teal hover:bg-accent-teal/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    <FaChevronRight />
                </button>
            </div>

            {/* Page Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* PDF Page Image */}
                <div className="relative rounded-lg overflow-hidden bg-black/20 border border-gray-700 min-h-[400px] flex items-center justify-center">
                    {currentPage ? (
                        <InteractiveImage
                            imageUrl={currentPage.previewUrl || currentPage.sourceUrl}
                            ocrRaw={currentPage.ocrRaw}
                            onCropSelect={handleCropSelection}
                        />
                    ) : (
                        <div className="text-gray-500">Loading page...</div>
                    )}
                </div>

                {/* Extracted Text */}
                <div className="bg-black/20 rounded-lg p-4 border border-gray-700 h-full max-h-[500px] overflow-y-auto">
                    <h4 className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">
                        Extracted Text
                    </h4>
                    {displayedText ? (
                        <div className="prose prose-invert prose-sm max-w-none">
                            <p className="whitespace-pre-wrap text-gray-300">{displayedText}</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-40 text-gray-500 italic">
                            <p>Select an area on the page to extract text</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Page Thumbnails (Optional - can be added later) */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {pdfFrames.map((page, idx) => (
                    <button
                        key={page._id || idx}
                        onClick={() => setCurrentPageIndex(idx)}
                        className={`flex-shrink-0 w-20 h-24 rounded border-2 overflow-hidden transition-all ${idx === currentPageIndex
                            ? 'border-accent-teal shadow-lg'
                            : 'border-gray-600 opacity-60 hover:opacity-100'
                            }`}
                    >
                        <img
                            src={page.previewUrl || page.sourceUrl}
                            alt={`Page ${idx + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PdfPageViewer;
