import { motion } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "E-Commerce Liquid",
    description: "Une boutique ultra-rapide avec panier dynamique et animations de transition de page.",
    tags: ["React", "Stripe", "Framer Motion"],
    // On définit une couleur unique pour l'ambiance de chaque carte
    color: "from-cyan-400 to-blue-600",
    glow: "group-hover:shadow-cyan-500/50" 
  },
  {
    id: 2,
    title: "Dashboard SaaS",
    description: "Interface d'administration complexe avec graphiques en temps réel et mode sombre.",
    tags: ["Next.js", "Tailwind", "Recharts"],
    color: "from-purple-400 to-pink-600",
    glow: "group-hover:shadow-purple-500/50"
  },
  {
    id: 3,
    title: "AI Chat Interface",
    description: "Une interface de chat fluide connectée à l'API OpenAI avec streaming de texte.",
    tags: ["React", "Node.js", "OpenAI"],
    color: "from-emerald-400 to-cyan-600",
    glow: "group-hover:shadow-emerald-500/50"
  },
  {
    id: 4,
    title: "3D Portfolio V1",
    description: "Ma première exploration de la 3D web avec Three.js et des modèles interactifs.",
    tags: ["Three.js", "R3F", "Blender"],
    color: "from-orange-400 to-red-600",
    glow: "group-hover:shadow-orange-500/50"
  },
];

const Projects = () => {
  return (
    <section id="projects" className="min-h-screen py-24 relative flex flex-col items-center justify-center overflow-hidden">
      
      {/* Titre */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20 relative z-10 px-4"
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-100 via-white to-purple-200">
          Projets Sélectionnés
        </h2>
        <div className="w-24 h-1 bg-linear-to-r from-cyan-500 to-purple-500 mx-auto mt-4 rounded-full blur-[2px]" />
      </motion.div>

      {/* Grille */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full px-6 z-10">
        
        {projectsData.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            {/* LA CARTE "LIQUID NEON" 
                Utilisation de 'group' pour gérer les effets au survol sur les enfants
            */}
            <div className={`
              group relative h-full rounded-3xl 
              bg-slate-900/40 backdrop-blur-xl 
              border border-white/5 
              transition-all duration-500
              hover:-translate-y-2 hover:bg-slate-800/60
              ${project.glow} hover:shadow-2xl hover:border-white/20
            `}>
              
              {/* Le "blob" coloré à l'intérieur qui grandit au survol */}
              <div className={`
                absolute top-0 right-0 p-20 rounded-full blur-3xl opacity-20 
                bg-linear-to-br ${project.color}
                transition-all duration-700
                group-hover:opacity-40 group-hover:scale-125
              `} />

              <div className="relative p-8 flex flex-col h-full z-20">
                
                {/* En-tête : Icône et Titre */}
                <div className="mb-6">
                  <div className={`
                    w-12 h-12 mb-4 rounded-2xl 
                    bg-linear-to-br ${project.color} 
                    flex items-center justify-center
                    shadow-lg transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3
                  `}>
                    {/* Petite icône SVG générique */}
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                </div>

                <p className="text-slate-400 mb-8 leading-relaxed">
                  {project.description}
                </p>

                {/* Bas de carte : Tags et Lien */}
                <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5 group-hover:border-white/10 transition-colors">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs py-1 px-3 rounded-full bg-white/5 border border-white/5 text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a href="#" className="flex items-center gap-2 text-sm font-bold text-white transition-all group-hover:text-cyan-400 group-hover:translate-x-1">
                    Voir
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;