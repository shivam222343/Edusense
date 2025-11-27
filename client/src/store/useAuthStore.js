import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../config/api';
import { logoutUser } from '../config/firebase';

const useAuthStore = create(
    persist(
        (set) => ({
            // State
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            // Actions
            setUser: (user) =>
                set({
                    user,
                    isAuthenticated: !!user,
                    error: null,
                }),

            setLoading: (isLoading) => set({ isLoading }),

            setError: (error) => set({ error }),

            clearError: () => set({ error: null }),

            // Fetch current user from backend
            fetchUser: async () => {
                try {
                    set({ isLoading: true, error: null });
                    const response = await api.get('/api/auth/me');

                    if (response.data.success) {
                        set({
                            user: response.data.user,
                            isAuthenticated: true,
                            isLoading: false,
                        });
                        return response.data.user;
                    }
                } catch (error) {
                    console.error('Fetch user error:', error);
                    set({
                        user: null,
                        isAuthenticated: false,
                        isLoading: false,
                        error: error.response?.data?.message || 'Failed to fetch user',
                    });
                    return null;
                }
            },

            // Logout
            logout: async () => {
                try {
                    // Logout from Firebase
                    await logoutUser();

                    // Logout from backend
                    await api.post('/api/auth/logout');

                    set({
                        user: null,
                        isAuthenticated: false,
                        error: null,
                    });
                } catch (error) {
                    console.error('Logout error:', error);
                    // Even if backend logout fails, clear local state
                    set({
                        user: null,
                        isAuthenticated: false,
                    });
                }
            },

            // Clear all auth data
            clearAuth: () =>
                set({
                    user: null,
                    isAuthenticated: false,
                    error: null,
                }),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

export default useAuthStore;
