import { motion } from "framer-motion";
import { useState } from "react";

const projectsData = [
  {
    id: 1,
    title: "Secret Santa",
    description: "Un site ultra-rapide pour évévements comme secret santa, ou cadeau entre personnes",
    tags: ["React", "Tailwind/DaisyUI", "API"],
    link: "https://santa-react-gamma.vercel.app", 
    color: "from-cyan-400 to-blue-600",
    image: "/projets/img/secret_santa.png"
  },
  {
    id: 2,
    title: "Site de Voyage",
    description: "Site vitrine de site de voyage.",
    tags: ["HTML", "CSS"],
    link: "/projets/voyages/index.html",
    color: "from-purple-400 to-pink-600",
    image: "/projets/img/voyage.png"
  },
  {
    id: 3,
    title: "Memory",
    description: "Une interface de memory game avec connexion/inscription et classement.",
    tags: ["HTML", "CSS/LIQUID EFFECT", "SQL"],
    link: "http://memory.alwaysdata.net",
    color: "from-emerald-400 to-cyan-600",
    image: "/projets/img/memory.png"
  },
  {
    id: 4,
    title: "Fansite",
    description: "Apprentissage de l'HTML/CSS par la creation d'un fansite.",
    tags: ["HTML", "CSS"],
    link: "/projets/fansite/index.html",
    color: "from-orange-400 to-red-600",
    image: "/projets/img/fansite.png"
  },
];

const FlipCard = ({ project }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Fonction pour gérer le flip au clic ou survol
  const handleFlip = () => {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  };

  return (
    <div 
      className="relative w-full h-[400px] cursor-pointer group perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-full relative"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, animationDirection: "normal" }}
        onAnimationComplete={() => setIsAnimating(false)}
        style={{ transformStyle: "preserve-3d" }}
      >
        
        {/* --- FACE AVANT (RECTO) --- */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-3xl overflow-hidden border border-white/10 shadow-xl"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Image de fond avec overlay */}
          <div className="absolute inset-0 bg-slate-900">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-110" 
            />
            <div className={`absolute inset-0 bg-linear-to-t ${project.color} opacity-40 mix-blend-overlay`} />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent" />
          </div>

          {/* Contenu Face Avant */}
          <div className="absolute bottom-0 left-0 p-8 w-full">
            <div className={`w-12 h-1 mb-4 rounded-full bg-linear-to-r ${project.color}`} />
            <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">{project.title}</h3>
            <p className="text-sm text-slate-300 uppercase tracking-widest font-semibold">Survolez pour voir</p>
          </div>
        </div>


        {/* --- FACE ARRIÈRE (VERSO) --- */}
        <div 
          className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden border border-white/10 bg-slate-900/95 backdrop-blur-xl p-8 flex flex-col justify-center text-center shadow-[0_0_30px_rgba(0,0,0,0.5)]"
          style={{ 
            backfaceVisibility: 'hidden', 
            transform: 'rotateY(180deg)' // La face arrière est déjà tournée
          }}
        >
          {/* Décoration Glow Interne */}
          <div className={`absolute -top-20 -right-20 w-40 h-40 bg-linear-to-br ${project.color} blur-[60px] opacity-40 rounded-full`} />
          <div className={`absolute -bottom-20 -left-20 w-40 h-40 bg-linear-to-br ${project.color} blur-[60px] opacity-40 rounded-full`} />

          <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{project.title}</h3>
          
          <p className="text-slate-300 mb-6 leading-relaxed relative z-10">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 relative z-10">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 border border-white/10 text-cyan-200">
                {tag}
              </span>
            ))}
          </div>

          {/* Bouton Lien */}
          <a 
            href={project.link}
            target="_blank" 
            rel="noopener noreferrer"
            className={`
              relative z-10 inline-flex items-center justify-center gap-2
              px-6 py-3 rounded-full 
              bg-linear-to-r ${project.color} 
              text-white font-bold shadow-lg
              hover:scale-105 transition-transform duration-300
            `}
          >
            Voir le projet
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

      </motion.div>
    </div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="min-h-screen py-24 relative flex flex-col items-center justify-center overflow-hidden">
      
      {/* Titre Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20 relative z-10 px-4"
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-100 via-white to-purple-200">
          Projets Interactifs
        </h2>
        <div className="w-24 h-1 bg-linear-to-r from-cyan-500 to-purple-500 mx-auto mt-4 rounded-full blur-[2px]" />
      </motion.div>

      {/* Grille des Cartes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full px-6 z-10">
        {projectsData.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <FlipCard project={project} />
          </motion.div>
        ))}
      </div>

    </section>
  );
};

export default Projects;