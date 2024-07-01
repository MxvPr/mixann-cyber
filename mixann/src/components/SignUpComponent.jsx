// Exemple d'utilisation dans un composant React
import React, { useState } from 'react';
import { signUp } from './firebaseAuth'; // Assurez-vous que le chemin d'accès est correct

const SignUpComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      console.log('Utilisateur inscrit avec succès');
      // Redirection ou mise à jour de l'interface utilisateur après inscription
    } catch (error) {
      console.error('Erreur lors de linscription', error);
    }
  };

  return (
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
      <button onClick={handleSignUp}>S'inscrire</button>
    </div>
  );
};

export default SignUpComponent;
