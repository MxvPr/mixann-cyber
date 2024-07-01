import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOutUser, onAuthStateChange } from '../firebaseAuth'; // Assurez-vous que le chemin est correct
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Ajouté pour Firestore

const Header = () => {
    const [search, setSearch] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [users, setUsers] = useState([]); // Ajouté pour stocker les utilisateurs pour la recherche
    const [suggestions, setSuggestions] = useState([]); // Ajouté pour gérer les suggestions de recherche
    const navigate = useNavigate();

    useEffect(() => {
        // Écoute l'état d'authentification pour ajuster isUserLoggedIn
        const unsubscribe = onAuthStateChange((user) => {
            setIsUserLoggedIn(!!user);
        });

        // Récupère tous les utilisateurs pour la fonctionnalité de recherche
        const fetchUsers = async () => {
            const db = getFirestore();
            const querySnapshot = await getDocs(collection(db, "usersInfo"));
            const usersData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsers(usersData);
        };

        fetchUsers();

        // Retourne une fonction pour nettoyer l'abonnement
        return () => {
            if (unsubscribe) {
                unsubscribe(); // Nettoyez l'abonnement
            }
        };
    }, []);

    // Mise à jour des suggestions basées sur la recherche
    useEffect(() => {
        if (search.trim()) {
            const filteredSuggestions = users.filter(user =>
                user.username.toLowerCase().startsWith(search.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    }, [search, users]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (search.trim() !== '') {
            navigate(`/profile/${search.trim()}`);
            setSearch('');
            setSuggestions([]);
            setIsMenuOpen(false);
        }
    };

    const handleSignOutClick = async () => {
        try {
            await signOutUser();
            navigate('/auth');
            setIsMenuOpen(false);
        } catch (error) {
            console.error("Erreur lors de la déconnexion", error);
        }
    };

    return (
        <header className="bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow-md relative">
            <nav className="flex justify-between items-center p-4">
                <Link to="/" className="font-semibold text-xl tracking-tight" onClick={() => setIsMenuOpen(false)}>Mixann</Link>
                <div className="md:flex hidden items-center space-x-4">
                    <NavigationLinks handleSearchSubmit={handleSearchSubmit} search={search} setSearch={setSearch} suggestions={suggestions} setIsMenuOpen={setIsMenuOpen} />
                    {isUserLoggedIn ? (
                        <button onClick={handleSignOutClick} className="hover:bg-blue-700 px-3 py-2 rounded transition-colors duration-200">Déconnexion</button>
                    ) : (
                        <Link to="/auth" className="hover:bg-blue-700 px-3 py-2 rounded transition-colors duration-200">Connexion</Link>
                    )}
                </div>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden px-3 py-2 rounded hover:bg-blue-700 transition-colors duration-200">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                </button>
            </nav>
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-gradient-to-r from-blue-500 to-teal-400 z-10">
                    <div className="px-4 py-2">
                        <NavigationLinks handleSearchSubmit={handleSearchSubmit} search={search} setSearch={setSearch} isMobile={true} suggestions={suggestions} setIsMenuOpen={setIsMenuOpen} />
                        {isUserLoggedIn ? (
                            <button onClick={handleSignOutClick} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-600 transition-colors duration-200">Déconnexion</button>
                        ) : (
                            <Link to="/auth" className="block w-full text-left px-3 py-2 rounded hover:bg-blue-600 transition-colors duration-200">Connexion</Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

const NavigationLinks = ({ handleSearchSubmit, search, setSearch, isMobile = false, suggestions, setIsMenuOpen }) => (
    <React.Fragment>
        <Link to="/galerie" className={`block ${isMobile ? 'py-2' : 'px-3 py-2'} hover:bg-blue-600 rounded transition-colors duration-200`} onClick={() => setIsMenuOpen(false)}>Galerie</Link>
        <Link to="/artistes" className={`block ${isMobile ? 'py-2' : 'px-3 py-2'} hover:bg-blue-600 rounded transition-colors duration-200`} onClick={() => setIsMenuOpen(false)}>Artistes</Link>
        <div className="relative"> {/* Ce div englobe le formulaire de recherche et le menu déroulant */}
            <form onSubmit={handleSearchSubmit} className="flex">
                <input
                    type="search"
                    placeholder="Rechercher utilisateur..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-transparent border-b border-white text-white py-1 px-2 leading-tight focus:outline-none"
                />
                <button type="submit" className="text-white px-3 py-2 hover:bg-blue-600 rounded transition-colors duration-200">
                    🔍
                </button>
            </form>
            {suggestions.length > 0 && (
                <ul className="absolute left-0 right-0 bg-white text-black mt-1 z-10 shadow rounded overflow-hidden"> {/* Ce ul est le menu déroulant qui s'affiche sous la barre de recherche */}
                    {suggestions.map((user) => (
                        <li key={user.id} className="px-4 py-2 hover:bg-gray-100 transition-colors duration-200">
                            <Link to={`/profile/${user.username}`} onClick={() => {
                                setSearch('');
                                setSuggestions([]);
                                setIsMenuOpen(false);
                            }}>
                                {user.username}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </React.Fragment>
);

export default Header;
