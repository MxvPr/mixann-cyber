import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const RencontrezLesArtistes = () => {
  const [artistes, setArtistes] = useState([]);

  useEffect(() => {
    const fetchArtistes = async () => {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, "usersInfo"));
      const artistesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        imageUrl: doc.data().imageUrl || []
      })).map(artiste => ({
        ...artiste,
        randomImageUrl: getRandomImage(artiste.imageUrl)
      }));
      setArtistes(artistesData);
    };

    fetchArtistes();
  }, []);

  const getRandomImage = (imageUrl) => {
    if (imageUrl.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * imageUrl.length);
    return imageUrl[randomIndex];
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold mb-10 text-center">Rencontrez les Artistes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {artistes.map(artiste => (
          <Link to={`/profile/${artiste.username}`} key={artiste.id} className="block transform hover:scale-105 transition duration-500 ease-in-out">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              {artiste.randomImageUrl ? (
                <img src={artiste.randomImageUrl} alt={artiste.username} className="w-full h-48 object-cover"/>
              ) : (
                <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                  <span className="text-lg font-semibold">Pas d'image</span>
                </div>
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-center">{artiste.username}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RencontrezLesArtistes;
