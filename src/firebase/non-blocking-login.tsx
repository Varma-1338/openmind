'use client';
import {
  Auth, // Import Auth type for type hinting
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

/**
 * Initiates an anonymous sign-in. This is a non-blocking call.
 * Auth state changes are handled by the global onAuthStateChanged listener.
 */
function initiateAnonymousSignIn(authInstance: Auth): void {
  signInAnonymously(authInstance);
}

/**
 * Initiates an email/password sign-up. Returns a promise to handle success or failure.
 * Auth state changes are also handled by the global onAuthStateChanged listener.
 */
function initiateEmailSignUp(authInstance: Auth, email: string, password: string) {
  return createUserWithEmailAndPassword(authInstance, email, password);
}

/**
 * Initiates an email/password sign-in. Returns a promise to handle success or failure.
 * Auth state changes are also handled by the global onAuthStateChanged listener.
 */
function initiateEmailSignIn(authInstance: Auth, email: string, password: string) {
  return signInWithEmailAndPassword(authInstance, email, password);
}

/**
 * A stable API object for authentication methods.
 * Exporting a single object like this is more friendly to Next.js Fast Refresh.
 */
export const authApi = {
    anonymousSignIn: initiateAnonymousSignIn,
    emailSignUp: initiateEmailSignUp,
    emailSignIn: initiateEmailSignIn,
};
