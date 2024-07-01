import React, { useState } from 'react';
import { signUp, signIn, signInWithGoogle } from '../firebaseAuth';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Contrôle l'affichage de la connexion ou de l'inscription
  const navigate = useNavigate();

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        // Tente de s'inscrire si l'état est configuré pour l'inscription
        await signUp(email, password);
        console.log('Inscrit avec succès');
      } else {
        // Sinon, tente de se connecter
        await signIn(email, password);
        console.log('Connecté avec succès');
      }
      navigate('/galerie'); // Redirigez vers la page d'accueil ou une autre page selon votre flow
    } catch (error) {
      console.error('Erreur', error.message);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await signInWithGoogle();
      console.log('Authentification avec Google réussie');
      navigate('/galerie');
    } catch (error) {
      console.error('Erreur d\'authentification avec Google', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="max-w-md w-full shadow-lg rounded-lg overflow-hidden p-8 bg-white">
        <h2 className="text-2xl font-bold mb-4">{isSignUp ? 'Inscription' : 'Connexion'}</h2>
        <form onSubmit={handleAuthSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            {isSignUp ? 'S\'inscrire' : 'Se connecter'}
          </button>
        </form>
        <button onClick={handleGoogleAuth} className="w-full px-4 py-2 mt-4 bg-red-500 text-white rounded hover:bg-red-600">
          {isSignUp ? 'S\'inscrire avec Google' : 'Se connecter avec Google'}
        </button>
        <button onClick={() => setIsSignUp(!isSignUp)} className="mt-4 w-full px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition duration-300">
          {isSignUp ? 'Vous avez déjà un compte ? Connectez-vous' : 'Pas de compte ? Inscrivez-vous'}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
