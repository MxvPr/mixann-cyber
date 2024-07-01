import React from "react";
import { Link } from "react-router-dom";

const Accueil = () => {
  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200 text-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 mb-8">Bienvenue sur Mixann</h1>
          <p className="text-xl font-semibold mb-10">Découvrez, partagez et connectez autour de l'art sous toutes ses formes.</p>
        </div>

        <Categories />

        <Testimonials />

        <FAQSection />

        <JoinUsCallToAction />
      </div>
    </div>
  );
};

const Categories = () => (
  <section className="mb-20">
    <h2 className="text-center text-4xl font-bold mb-12">Explorez par Catégorie</h2>
    <div className="grid md:grid-cols-3 gap-12">
      <CategoryCard
        imageUrl="https://source.unsplash.com/random/400x300?art"
        title="Art Visuel"
        description="Peinture, dessin, sculpture, et plus."
      />
      <CategoryCard
        imageUrl="https://source.unsplash.com/random/400x300?music"
        title="Musique"
        description="Découvrez de nouveaux genres et artistes."
      />
      <CategoryCard
        imageUrl="https://source.unsplash.com/random/400x300?photography"
        title="Photographie"
        description="Capturez et partagez vos moments."
      />
    </div>
  </section>
);

const CategoryCard = ({ imageUrl, title, description }) => (
  <div className="transform hover:scale-105 transition duration-500 ease-in-out rounded overflow-hidden shadow-lg bg-white hover:shadow-2xl">
    <img className="w-full" src={imageUrl} alt={title} />
    <div className="px-6 py-4">
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="text-gray-700 text-base">{description}</p>
    </div>
  </div>
);

const Testimonials = () => (
  <section className="mb-20">
    <h2 className="text-center text-4xl font-bold mb-12">Ce que disent nos artistes</h2>
    <div className="flex flex-wrap justify-center gap-12">
      <Testimonial
        quote="Mixann a été une révélation pour moi, un espace où je peux exprimer mon art librement."
        author="- Dana, Peintre"
      />
      <Testimonial
        quote="Une communauté inspirante et accueillante. J'ai trouvé mon public grâce à Mixann."
        author="- Leo, Musicien"
      />
    </div>
  </section>
);

const Testimonial = ({ quote, author }) => (
  <div className="max-w-md bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded shadow-lg p-6 transform hover:scale-105 transition duration-500 ease-in-out">
    <p className="text-gray-100 italic">"{quote}"</p>
    <p className="text-right font-semibold mt-4">{author}</p>
  </div>
);

const FAQSection = () => (
  <section className="mb-20">
    <h2 className="text-center text-4xl font-bold mb-12">FAQ</h2>
    <div className="max-w-3xl mx-auto">
      <FAQItem question="Comment partager mon art ?" answer="Créez un compte et commencez à télécharger vos œuvres facilement." />
      <FAQItem question="Est-ce que Mixann est gratuit ?" answer="Absolument, profitez de notre plateforme sans aucun coût." />
    </div>
  </section>
);

const FAQItem = ({ question, answer }) => (
  <div className="mb-8">
    <h3 className="font-bold text-lg mb-2">{question}</h3>
    <p className="text-gray-700">{answer}</p>
  </div>
);

const JoinUsCallToAction = () => (
  <div className="text-center mt-8">
    <Link
      to="/auth"
      className="inline-block bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition ease-in-out duration-150"
    >
      Rejoignez Mixann maintenant
    </Link>
  </div>
);

export default Accueil;
