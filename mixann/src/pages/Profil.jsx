import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const InfosSupplementaires = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    nom: '',
    prenom: '',
    bio: '',
    website: '',
    competences: '',
    styleArtistique: '',
    inspirations: '',
    portfolioURL: '',
    imageUrl: []
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;
  const db = getFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const fetchUserInfo = async () => {
        const docRef = doc(db, "usersInfo", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserInfo(docSnap.data());
        }
      };
      fetchUserInfo();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImages([...images, ...Array.from(e.target.files)]);
  };

  const handleDeleteImage = async (imageUrl, index) => {
    const newImageUrls = userInfo.imageUrl.filter((_, idx) => idx !== index);
    setUserInfo({ ...userInfo, imageUrl: newImageUrls });

    // Delete from storage if it's a URL
    if (imageUrl.startsWith('http')) {
      const imageRef = ref(getStorage(), imageUrl);
      await deleteObject(imageRef);
    }

    // Update document in Firestore
    await setDoc(doc(db, "usersInfo", user.uid), { imageUrl: newImageUrls }, { merge: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const uploadedImageUrls = await Promise.all(images.map(async (image) => {
      const imageRef = ref(getStorage(), `userImages/${user.uid}/${uuidv4()}`);
      const snapshot = await uploadBytes(imageRef, image);
      return getDownloadURL(snapshot.ref);
    }));

    const finalUserInfo = {
      ...userInfo,
      imageUrl: [...userInfo.imageUrl, ...uploadedImageUrls],
    };

    await setDoc(doc(db, "usersInfo", user.uid), finalUserInfo, { merge: true });
    setLoading(false);
    navigate('/galerie');
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6">Mise à jour du profil</h2>
      {loading ? (
        <div className="text-center">Chargement...</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="nom" className="text-sm font-semibold">Nom</label>
              <input type="text" name="nom" value={userInfo.nom} onChange={handleChange} placeholder="Nom" className="mt-1 p-2 border rounded-lg" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="prenom" className="text-sm font-semibold">Prénom</label>
              <input type="text" name="prenom" value={userInfo.prenom} onChange={handleChange} placeholder="Prénom" className="mt-1 p-2 border rounded-lg" />
            </div>
            <div className="flex flex-col col-span-2">
              <label htmlFor="username" className="text-sm font-semibold">Nom d'utilisateur</label>
              <input type="text" name="username" value={userInfo.username} onChange={handleChange} placeholder="Nom d'utilisateur" className="mt-1 p-2 border rounded-lg" />
            </div>
            <div className="flex flex-col col-span-2">
              <label htmlFor="bio" className="text-sm font-semibold">Biographie</label>
              <textarea name="bio" value={userInfo.bio} onChange={handleChange} placeholder="Biographie" rows="3" className="mt-1 p-2 border rounded-lg"></textarea>
            </div>
            <div className="flex flex-col col-span-2">
              <label htmlFor="website" className="text-sm font-semibold">Site Web</label>
              <input type="text" name="website" value={userInfo.website} onChange={handleChange} placeholder="Site Web" className="mt-1 p-2 border rounded-lg" />
            </div>
            <div className="flex flex-col col-span-2">
              <label htmlFor="competences" className="text-sm font-semibold">Compétences</label>
              <input type="text" name="competences" value={userInfo.competences} onChange={handleChange} placeholder="Compétences" className="mt-1 p-2 border rounded-lg" />
            </div>
            <div className="flex flex-col col-span-2">
              <label htmlFor="styleArtistique" className="text-sm font-semibold">Style Artistique</label>
              <input type="text" name="styleArtistique" value={userInfo.styleArtistique} onChange={handleChange} placeholder="Style Artistique" className="mt-1 p-2 border rounded-lg" />
            </div>
            <div className="flex flex-col col-span-2">
              <label htmlFor="inspirations" className="text-sm font-semibold">Inspirations</label>
              <input type="text" name="inspirations" value={userInfo.inspirations} onChange={handleChange} placeholder="Inspirations" className="mt-1 p-2 border rounded-lg" />
            </div>
            <div className="flex flex-col col-span-2">
              <label htmlFor="portfolioURL" className="text-sm font-semibold">Portfolio URL</label>
              <input type="text" name="portfolioURL" value={userInfo.portfolioURL} onChange={handleChange} placeholder="Portfolio URL" className="mt-1 p-2 border rounded-lg" />
            </div>
            
            {/* Répétez le motif ci-dessus pour les champs supplémentaires */}
          </div>
  
          <div className="flex flex-col mt-4">
            <label className="text-sm font-semibold mb-2">Images de profil</label>
            <input type="file" multiple onChange={handleImageChange} className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
            <div className="flex flex-wrap mt-4">
              {userInfo.imageUrl.map((url, index) => (
                <div key={url} className="relative w-24 h-24 mr-2 mb-2">
                  <img src={url} alt="Image de profil" className="rounded-md object-cover w-full h-full" />
                  <button onClick={() => handleDeleteImage(url, index)} className="absolute top-0 right-0 bg-red-500 hover:bg-red-700 text-white p-1 rounded-full">
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
  
          <div className="flex justify-center mt-6">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
              Enregistrer les modifications
            </button>
          </div>
        </form>
      )}
    </div>
  );
  
};

export default InfosSupplementaires;
