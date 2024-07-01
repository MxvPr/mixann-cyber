import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const AffichageInfosUtilisateur = () => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserInfo(user.uid);
      } else {
        navigate('/auth');
      }
    });
    return () => unsubscribe();
  }, [navigate, auth]);

  const fetchUserInfo = async (userId) => {
    setIsLoading(true);
    const db = getFirestore();
    const docRef = doc(db, "usersInfo", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserInfo(docSnap.data());
    } else {
      console.log("No such document!");
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Profil de l'utilisateur</h2>
      <div className="space-y-4">
        <p><strong>Nom d'utilisateur :</strong> {userInfo.username}</p>
        <p><strong>Nom :</strong> {userInfo.nom}</p>
        <p><strong>Prénom :</strong> {userInfo.prenom}</p>
        <p><strong>Biographie :</strong> {userInfo.bio}</p>
        <p><strong>Compétences :</strong> {userInfo.competences}</p>
        <p><strong>Style Artistique :</strong> {userInfo.styleArtistique}</p>
        <p><strong>Inspirations :</strong> {userInfo.inspirations}</p>
        <p><strong>Portfolio URL :</strong> <a href={userInfo.portfolioURL} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{userInfo.portfolioURL}</a></p>
        <div>
          <strong>Images :</strong>
          <div className="flex flex-wrap gap-4 mt-2">
            {userInfo.imageUrl?.map((url, index) => (
              <img key={index} src={url} alt={`Profil ${index}`} className="h-24 w-24 object-cover rounded-md" />
            ))}
          </div>
        </div>
      </div>
      <button onClick={() => navigate('/profil')} className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300">Modifier le profil</button>
    </div>
  );
};

export default AffichageInfosUtilisateur;
