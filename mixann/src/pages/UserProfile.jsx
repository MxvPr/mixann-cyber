import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, query, collection, where, getDocs } from 'firebase/firestore';
import Masonry from 'react-masonry-css';

const UserProfile = () => {
  const { username } = useParams(); // Récupère le username de l'URL
  const [userProfile, setUserProfile] = useState(null); // Initialise userProfile à null
  const [loading, setLoading] = useState(true); // Ajoute un état pour le chargement

  useEffect(() => {
    const fetchUserProfileByUsername = async () => {
      setLoading(true); // Commence le chargement
      const db = getFirestore();
      const usersRef = collection(db, 'usersInfo');
      const q = query(usersRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].data();
        setUserProfile(userDoc); // Définit les données de l'utilisateur
      } else {
        setUserProfile(null); // Aucun utilisateur trouvé
      }
      setLoading(false); // Fin du chargement
    };

    fetchUserProfileByUsername();
  }, [username]);

  if (loading) {
    return <div className="text-center">Chargement...</div>;
  }

  if (!userProfile) {
    return <div className="text-center">Aucun utilisateur trouvé.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-5">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profil de {userProfile.username}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-100 p-3 rounded">
              <p className="text-md text-gray-600">Nom d'utilisateur: <span className="font-semibold">{userProfile.username}</span></p>
            </div>
            {userProfile.bio && 
              <div className="bg-gray-100 p-3 rounded">
                <p><span className="font-semibold">Bio:</span> {userProfile.bio}</p>
              </div>
            }
            {userProfile.competences && 
              <div className="bg-gray-100 p-3 rounded">
                <p><span className="font-semibold">Compétences:</span> {userProfile.competences}</p>
              </div>
            }
            {userProfile.styleArtistique && 
              <div className="bg-gray-100 p-3 rounded">
                <p><span className="font-semibold">Style Artistique:</span> {userProfile.styleArtistique}</p>
              </div>
            }
            {userProfile.inspirations && 
              <div className="bg-gray-100 p-3 rounded">
                <p><span className="font-semibold">Inspirations:</span> {userProfile.inspirations}</p>
              </div>
            }
            {userProfile.portfolioURL && 
              <div className="bg-gray-100 p-3 rounded">
                <p>
                  <span className="font-semibold">Portfolio URL:</span> 
                  <a href={userProfile.portfolioURL.startsWith('http') ? userProfile.portfolioURL : `http://${userProfile.portfolioURL}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 ml-2">
                    {userProfile.portfolioURL}
                  </a>
                </p>
              </div>
            }
          </div>
          {userProfile.imageUrl && 
            <Masonry
              breakpointCols={{default: 3, 1100: 2, 700: 1}}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {userProfile.imageUrl.map((url, index) => (
                <div key={index} className="flex justify-center mb-4">
                  <img src={url} alt={`Profil ${index}`} className="max-w-xs rounded-lg shadow-md"/>
                </div>
              ))}
            </Masonry>
          }
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
