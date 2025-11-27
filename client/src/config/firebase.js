import { initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updatePassword,
    EmailAuthProvider,
    reauthenticateWithCredential,
} from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Configure Google provider
googleProvider.setCustomParameters({
    prompt: 'select_account',
});

/**
 * Sign in with Google
 * @returns {Promise<Object>} User credential and ID token
 */
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const idToken = await result.user.getIdToken();

        return {
            user: result.user,
            idToken,
            credential: result.credential,
        };
    } catch (error) {
        console.error('Google sign-in error:', error);
        throw error;
    }
};

/**
 * Sign up with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} User credential and ID token
 */
export const signUpWithEmail = async (email, password) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const idToken = await result.user.getIdToken();

        return {
            user: result.user,
            idToken,
        };
    } catch (error) {
        console.error('Email sign-up error:', error);
        throw error;
    }
};

/**
 * Login with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} User credential and ID token
 */
export const loginWithEmail = async (email, password) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await result.user.getIdToken();

        return {
            user: result.user,
            idToken,
        };
    } catch (error) {
        console.error('Email login error:', error);
        throw error;
    }
};

/**
 * Set password for Google user
 * @param {string} newPassword - New password to set
 * @returns {Promise<void>}
 */
export const setPasswordForGoogleUser = async (newPassword) => {
    try {
        const user = auth.currentUser;

        if (!user) {
            throw new Error('No user is currently signed in');
        }

        // Update password
        await updatePassword(user, newPassword);

        return true;
    } catch (error) {
        console.error('Set password error:', error);
        throw error;
    }
};

/**
 * Send password reset email
 * @param {string} email - User email
 * @returns {Promise<void>}
 */
export const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        console.error('Password reset error:', error);
        throw error;
    }
};

/**
 * Sign out current user
 * @returns {Promise<void>}
 */
export const logoutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};

/**
 * Get current user's ID token
 * @returns {Promise<string|null>} ID token or null
 */
export const getCurrentUserToken = async () => {
    try {
        const user = auth.currentUser;
        if (user) {
            return await user.getIdToken();
        }
        return null;
    } catch (error) {
        console.error('Get token error:', error);
        return null;
    }
};

export { auth };
