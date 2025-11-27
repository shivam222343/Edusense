import { create } from 'zustand';

const useAuthModalStore = create((set) => ({
    // Modal visibility states
    isLoginOpen: false,
    isSignupOpen: false,
    isSetPasswordOpen: false,

    // Actions
    openLogin: () =>
        set({
            isLoginOpen: true,
            isSignupOpen: false,
            isSetPasswordOpen: false,
        }),

    openSignup: () =>
        set({
            isLoginOpen: false,
            isSignupOpen: true,
            isSetPasswordOpen: false,
        }),

    openSetPassword: () =>
        set({
            isLoginOpen: false,
            isSignupOpen: false,
            isSetPasswordOpen: true,
        }),

    closeAll: () =>
        set({
            isLoginOpen: false,
            isSignupOpen: false,
            isSetPasswordOpen: false,
        }),
}));

export default useAuthModalStore;
