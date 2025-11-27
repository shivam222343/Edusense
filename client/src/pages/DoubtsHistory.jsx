import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaBookmark } from 'react-icons/fa';
import DoubtItem from '../components/DoubtItem';
import Loader from '../components/Loader';
import useDoubtStore from '../store/useDoubtStore';
import { getMyDoubts, deleteDoubt } from '../services/askApi';

const DoubtsHistory = () => {
    const { doubts, loadMyDoubts, setLoading, loading, removeDoubt } = useDoubtStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterSubject, setFilterSubject] = useState('all');
    const [showBookmarked, setShowBookmarked] = useState(false);

    const handleDeleteAll = async () => {
        if (window.confirm(`Are you sure you want to delete ALL ${doubts.length} doubts permanently? This action cannot be undone.`)) {
            try {
                for (const d of doubts) {
                    await deleteDoubt(d.doubtId || d._id);
                    removeDoubt(d.doubtId || d._id);
                }
            } catch (error) {
                console.error('Error deleting all doubts:', error);
            }
        }
    };

    useEffect(() => {
        const loadDoubts = async () => {
            setLoading(true);
            try {
                const response = await getMyDoubts({
                    limit: 100,
                    bookmarked: showBookmarked ? true : null,
                });
                if (response.success) loadMyDoubts(response.data);
            } catch (err) {
                console.error('Error loading doubts:', err);
            } finally {
                setLoading(false);
            }
        };

        loadDoubts();
    }, [showBookmarked, loadMyDoubts, setLoading]);

    const subjects = ['all', ...new Set(doubts.map(d => d.subject).filter(Boolean))];

    const filteredDoubts = doubts.filter(d => {
        const matchesSearch = d.questionText.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSubject = filterSubject === 'all' || d.subject === filterSubject;
        const matchesBookmark = !showBookmarked || d.isBookmarked;
        return matchesSearch && matchesSubject && matchesBookmark;
    });

    return (
        <div className="min-h-screen p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">My Doubts</h1>
                    <p className="text-gray-400">View and manage all your asked questions</p>
                </div>
                {doubts.length > 0 && (
                    <button
                        onClick={handleDeleteAll}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                    >
                        Delete All ({doubts.length})
                    </button>
                )}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6 space-y-4"
            >
                {/* Search bar */}
                <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search your doubts..."
                        className="w-full pl-12 pr-4 py-3 bg-dark-panel border border-dark-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-accent-teal transition-colors"
                    />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                        <FaFilter className="text-gray-400" />
                        <select
                            value={filterSubject}
                            onChange={e => setFilterSubject(e.target.value)}
                            className="px-4 py-2 bg-dark-panel border border-dark-border rounded-lg text-white focus:outline-none focus:border-accent-teal transition-colors"
                        >
                            {subjects.map(sub => (
                                <option key={sub} value={sub}>
                                    {sub === 'all' ? 'All Subjects' : sub}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={() => setShowBookmarked(!showBookmarked)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${showBookmarked
                            ? 'bg-accent-teal text-dark-bg font-semibold'
                            : 'bg-dark-panel border border-dark-border text-white hover:border-accent-teal'
                            }`}
                    >
                        <FaBookmark />
                        Bookmarked Only
                    </button>

                    <div className="ml-auto text-sm text-gray-400">
                        {filteredDoubts.length} {filteredDoubts.length === 1 ? 'result' : 'results'}
                    </div>
                </div>
            </motion.div>

            {/* Doubt list */}
            {loading ? (
                <Loader text="Loading doubts..." />
            ) : filteredDoubts.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                    <div className="text-6xl mb-4">{searchQuery || showBookmarked ? '🔍' : '📚'}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                        {searchQuery || showBookmarked ? 'No doubts found' : 'No doubts yet'}
                    </h3>
                    <p className="text-gray-400">
                        {searchQuery
                            ? 'Try a different search term'
                            : showBookmarked
                                ? "You haven't bookmarked any doubts yet"
                                : 'Start asking questions to build your knowledge base!'}
                    </p>
                </motion.div>
            ) : (
                <div className="space-y-4">
                    {filteredDoubts.map((d, i) => (
                        <motion.div
                            key={d._id || d.doubtId}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <DoubtItem doubt={d} />
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Stats Summary */}
            {filteredDoubts.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4"
                >
                    <div className="bg-dark-panel p-4 rounded-xl border border-dark-border">
                        <div className="text-2xl font-bold text-accent-teal mb-1">{doubts.length}</div>
                        <div className="text-gray-400 text-xs">Total Doubts</div>
                    </div>

                    <div className="bg-dark-panel p-4 rounded-xl border border-dark-border">
                        <div className="text-2xl font-bold text-accent-teal mb-1">
                            {doubts.filter(d => d.isBookmarked).length}
                        </div>
                        <div className="text-gray-400 text-xs">Bookmarked</div>
                    </div>

                    <div className="bg-dark-panel p-4 rounded-xl border border-dark-border">
                        <div className="text-2xl font-bold text-accent-teal mb-1">{subjects.length - 1}</div>
                        <div className="text-gray-400 text-xs">Subjects</div>
                    </div>

                    <div className="bg-dark-panel p-4 rounded-xl border border-dark-border">
                        <div className="text-2xl font-bold text-accent-teal mb-1">
                            {Math.round(
                                (doubts.reduce((acc, d) => acc + (d.confidence || 0), 0) / doubts.length) * 100
                            )}
                            %
                        </div>
                        <div className="text-gray-400 text-xs">Avg Confidence</div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default DoubtsHistory;