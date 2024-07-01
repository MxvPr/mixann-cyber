// src/firebaseAuth.js

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// Votre configuration Firebase (assurez-vous que ces valeurs sont correctes et correspondent à votre projet Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyA9WzFNf3f-DRgZAP1eFV2SmWYEvSUfw6s",
  authDomain: "mixann-2a80e.firebaseapp.com",
  projectId: "mixann-2a80e",
  storageBucket: "mixann-2a80e.appspot.com",
  messagingSenderId: "26266918498",
  appId: "1:26266918498:web:38981ea9812845d4f23b3b",
  measurementId: "G-CFCL37DW43"
};
// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
// Fonction pour s'inscrire
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Utilisateur créé avec succès :", userCredential.user);
    return userCredential;
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    throw error;
  }
};

export const signInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      console.log("Connecté avec succès avec Google :", userCredential.user);
      return userCredential;
    } catch (error) {
      console.error("Erreur de connexion avec Google :", error);
      throw error;
    }
  };

// Fonction pour se connecter
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Connexion réussie :", userCredential.user);
    return userCredential;
  } catch (error) {
    console.error("Erreur de connexion :", error);
    throw error;
  }
};

// Fonction pour se déconnecter
export const signOutUser = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    console.log("Déconnexion réussie");
  } catch (error) {
    console.error("Erreur lors de la déconnexion", error);
  }
};

// Fonction pour surveiller l'état d'authentification
// Fonction pour surveiller l'état d'authentification et retourner la fonction de désinscription
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};


export const getCurrentUser = () => {
  const auth = getAuth();
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        reject('Aucun utilisateur connecté.');
      }
    });
  });
};