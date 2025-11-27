import { motion } from 'framer-motion';

/**
 * Loader Component
 * Displays animated loading spinner with optional text
 */
const Loader = ({ text = 'Loading...', size = 'md' }) => {
    const sizeClasses = {
        sm: 'w-6 h-6 border-2',
        md: 'w-10 h-10 border-3',
        lg: 'w-16 h-16 border-4',
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4 py-8">
            <motion.div
                className={`${sizeClasses[size]} border-accent-teal border-t-transparent rounded-full`}
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />
            {text && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-400 text-sm"
                >
                    {text}
                </motion.p>
            )}
        </div>
    );
};

export default Loader;
