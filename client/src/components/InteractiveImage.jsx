import React, { useState, useRef, useEffect } from 'react';
import { FaCrop, FaExpand, FaTimes } from 'react-icons/fa';

const InteractiveImage = ({ imageUrl, ocrRaw, onCropSelect }) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
    const [selection, setSelection] = useState(null);
    const [hoveredWord, setHoveredWord] = useState(null);
    const imageRef = useRef(null);
    const containerRef = useRef(null);

    // Reset selection when image changes
    useEffect(() => {
        setSelection(null);
        setHoveredWord(null);
    }, [imageUrl]);

    const getRelativeCoordinates = (e) => {
        if (!imageRef.current) return { x: 0, y: 0 };
        const rect = imageRef.current.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    const handleMouseDown = (e) => {
        e.preventDefault();
        const coords = getRelativeCoordinates(e);
        setIsDrawing(true);
        setStartPos(coords);
        setCurrentPos(coords);
        setSelection(null); // Clear previous selection
    };

    const handleMouseMove = (e) => {
        const coords = getRelativeCoordinates(e);

        if (isDrawing) {
            setCurrentPos(coords);
        } else {
            // Hover logic for words
            if (ocrRaw && ocrRaw.words && imageRef.current) {
                const img = imageRef.current;
                const scaleX = img.width / img.naturalWidth;
                const scaleY = img.height / img.naturalHeight;

                // Find word under cursor
                const word = ocrRaw.words.find(w => {
                    if (!w.bbox) return false;
                    // Tesseract bbox: { x0, y0, x1, y1 }
                    const x0 = w.bbox.x0 * scaleX;
                    const y0 = w.bbox.y0 * scaleY;
                    const x1 = w.bbox.x1 * scaleX;
                    const y1 = w.bbox.y1 * scaleY;

                    return coords.x >= x0 && coords.x <= x1 && coords.y >= y0 && coords.y <= y1;
                });

                setHoveredWord(word || null);
            }
        }
    };

    const handleMouseUp = () => {
        if (!isDrawing) return;
        setIsDrawing(false);

        // Calculate selection box
        const x = Math.min(startPos.x, currentPos.x);
        const y = Math.min(startPos.y, currentPos.y);
        const width = Math.abs(currentPos.x - startPos.x);
        const height = Math.abs(currentPos.y - startPos.y);

        // Ignore tiny accidental clicks
        if (width > 10 && height > 10) {
            const newSelection = { x, y, width, height };
            setSelection(newSelection);


            if (imageRef.current) {
                const img = imageRef.current;
                const scaleX = img.naturalWidth / img.width;
                const scaleY = img.naturalHeight / img.height;
                const displayScaleX = img.width / img.naturalWidth;
                const displayScaleY = img.height / img.naturalHeight;

                console.log('🔍 Selection made:', { x, y, width, height });
                console.log('📊 OCR Data:', ocrRaw);

                // Filter words inside selection
                let extractedText = '';
                if (ocrRaw && ocrRaw.words) {
                    console.log(`📝 Total words available: ${ocrRaw.words.length}`);

                    const selectedWords = ocrRaw.words.filter(w => {
                        if (!w.bbox) {
                            console.warn('⚠️ Word without bbox:', w);
                            return false;
                        }
                        const wx0 = w.bbox.x0 * displayScaleX;
                        const wy0 = w.bbox.y0 * displayScaleY;
                        const wx1 = w.bbox.x1 * displayScaleX;
                        const wy1 = w.bbox.y1 * displayScaleY;

                        // Check if word center is inside selection
                        const centerX = (wx0 + wx1) / 2;
                        const centerY = (wy0 + wy1) / 2;

                        const isInside = centerX >= x && centerX <= x + width && centerY >= y && centerY <= y + height;

                        if (isInside) {
                            console.log(`✅ Selected word: "${w.text}" at (${centerX}, ${centerY})`);
                        }

                        return isInside;
                    });

                    extractedText = selectedWords.map(w => w.text).join(' ');
                    console.log(`📋 Extracted text from ${selectedWords.length} words: "${extractedText}"`);
                } else {
                    console.warn('⚠️ No OCR words data available');
                }

                if (onCropSelect) {
                    onCropSelect({
                        x: x * scaleX,
                        y: y * scaleY,
                        width: width * scaleX,
                        height: height * scaleY,
                        displaySelection: newSelection,
                        extractedText: extractedText // Pass extracted text back
                    });
                }
            }
        }
    };

    const clearSelection = () => {
        setSelection(null);
        if (onCropSelect) onCropSelect(null);
    };

    return (
        <div
            ref={containerRef}
            className="relative select-none inline-block"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setIsDrawing(false)}
        >
            <img
                ref={imageRef}
                src={imageUrl}
                alt="Interactive content"
                className="max-w-full max-h-[500px] object-contain cursor-crosshair"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                draggable={false}
            />

            {/* Show all word boundaries for debugging (optional - can be toggled) */}
            {!isDrawing && ocrRaw && ocrRaw.words && imageRef.current && (
                <>
                    {ocrRaw.words.map((word, idx) => {
                        if (!word.bbox) return null;
                        const img = imageRef.current;
                        const scaleX = img.width / img.naturalWidth;
                        const scaleY = img.height / img.naturalHeight;

                        return (
                            <div
                                key={idx}
                                className="absolute border border-blue-400/30 pointer-events-none"
                                style={{
                                    left: word.bbox.x0 * scaleX,
                                    top: word.bbox.y0 * scaleY,
                                    width: (word.bbox.x1 - word.bbox.x0) * scaleX,
                                    height: (word.bbox.y1 - word.bbox.y0) * scaleY,
                                }}
                                title={word.text}
                            />
                        );
                    })}
                </>
            )}

            {/* Hovered Word Highlight */}
            {hoveredWord && !isDrawing && imageRef.current && (
                <div
                    className="absolute bg-yellow-400/30 border-2 border-yellow-400 pointer-events-none z-10"
                    style={{
                        left: hoveredWord.bbox.x0 * (imageRef.current.width / imageRef.current.naturalWidth),
                        top: hoveredWord.bbox.y0 * (imageRef.current.height / imageRef.current.naturalHeight),
                        width: (hoveredWord.bbox.x1 - hoveredWord.bbox.x0) * (imageRef.current.width / imageRef.current.naturalWidth),
                        height: (hoveredWord.bbox.y1 - hoveredWord.bbox.y0) * (imageRef.current.height / imageRef.current.naturalHeight),
                    }}
                >
                    <div className="absolute -top-6 left-0 bg-yellow-400 text-black text-xs px-1 py-0.5 rounded whitespace-nowrap">
                        {hoveredWord.text}
                    </div>
                </div>
            )}

            {/* Drawing Selection Box */}
            {isDrawing && (
                <div
                    className="absolute border-2 border-accent-teal bg-accent-teal/20 pointer-events-none"
                    style={{
                        left: Math.min(startPos.x, currentPos.x),
                        top: Math.min(startPos.y, currentPos.y),
                        width: Math.abs(currentPos.x - startPos.x),
                        height: Math.abs(currentPos.y - startPos.y),
                    }}
                />
            )}

            {/* Final Selection Box */}
            {selection && !isDrawing && (
                <div
                    className="absolute border-2 border-accent-teal bg-transparent"
                    style={{
                        left: selection.x,
                        top: selection.y,
                        width: selection.width,
                        height: selection.height,
                    }}
                >
                    <div className="absolute -top-8 left-0 bg-accent-teal text-white text-xs px-2 py-1 rounded flex items-center gap-2">
                        <span>Area Selected</span>
                        <button onClick={clearSelection} className="hover:text-red-200"><FaTimes /></button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InteractiveImage;
