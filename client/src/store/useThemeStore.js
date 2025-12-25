import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Theme Store
 * Manages application theme (dark/light mode)
 * Persists theme preference to localStorage
 */
const useThemeStore = create(
    persist(
        (set) => ({
            theme: 'dark', // 'dark' or 'light'

            toggleTheme: () => set((state) => {
                const newTheme = state.theme === 'dark' ? 'light' : 'dark';
                // Update document class for Tailwind
                if (newTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
                return { theme: newTheme };
            }),

            setTheme: (theme) => set(() => {
                // Update document class for Tailwind
                if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
                return { theme };
            }),
        }),
        {
            name: 'theme-storage',
            onRehydrateStorage: () => (state) => {
                // Apply theme on initial load
                if (state?.theme === 'dark') {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            },
        }
    )
);

export default useThemeStore;
