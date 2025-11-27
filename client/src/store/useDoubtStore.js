import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Doubt Store
 * Manages all doubt-related state including questions, answers, and history
 */
const useDoubtStore = create(
    persist(
        (set, get) => ({
            // State
            doubts: [],
            currentDoubt: null,
            loading: false,
            error: null,
            askingQuestion: false,

            // Actions
            setDoubts: (doubts) => set({ doubts }),

            addDoubt: (doubt) =>
                set((state) => ({
                    doubts: [doubt, ...state.doubts],
                    currentDoubt: doubt,
                })),

            setCurrentDoubt: (doubt) => set({ currentDoubt: doubt }),

            setLoading: (loading) => set({ loading }),

            setAskingQuestion: (asking) => set({ askingQuestion: asking }),

            setError: (error) => set({ error }),

            clearError: () => set({ error: null }),

            // Load user's doubts
            loadMyDoubts: (doubts) =>
                set({
                    doubts,
                    loading: false,
                    error: null,
                }),

            // Update a specific doubt (e.g., after bookmark/rate)
            updateDoubt: (doubtId, updates) =>
                set((state) => ({
                    doubts: state.doubts.map((doubt) =>
                        doubt._id === doubtId || doubt.doubtId === doubtId
                            ? { ...doubt, ...updates }
                            : doubt
                    ),
                    currentDoubt:
                        state.currentDoubt?._id === doubtId ||
                            state.currentDoubt?.doubtId === doubtId
                            ? { ...state.currentDoubt, ...updates }
                            : state.currentDoubt,
                })),

            // Remove a doubt
            removeDoubt: (doubtId) =>
                set((state) => ({
                    doubts: state.doubts.filter(
                        (doubt) => doubt._id !== doubtId && doubt.doubtId !== doubtId
                    ),
                })),

            // Clear all doubts
            clearDoubts: () =>
                set({
                    doubts: [],
                    currentDoubt: null,
                    error: null,
                }),

            // Get doubt by ID
            getDoubtById: (doubtId) => {
                const doubts = get().doubts;
                return doubts.find(
                    (doubt) => doubt._id === doubtId || doubt.doubtId === doubtId
                );
            },

            // Filter doubts by subject
            getDoubtsBySubject: (subject) => {
                const doubts = get().doubts;
                return doubts.filter((doubt) => doubt.subject === subject);
            },

            // Get bookmarked doubts
            getBookmarkedDoubts: () => {
                const doubts = get().doubts;
                return doubts.filter((doubt) => doubt.isBookmarked);
            },
        }),
        {
            name: 'doubt-storage',
            partialize: (state) => ({
                doubts: state.doubts,
                currentDoubt: state.currentDoubt,
            }),
        }
    )
);

export default useDoubtStore;
