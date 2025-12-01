import { motion } from "framer-motion";

// Liste simple, sans icônes
const skills = [
  "React",
  "Tailwind CSS",
  "JavaScript",
  "HTLM CSS",
  "Node.js",
  "Framer Motion",
  "Git / GitHub",
  "Figma",
  "Vite"
];

const About = () => {
  
  const handleDownloadCV = () => {
    // Rappel : mets ton fichier 'cv.pdf' dans le dossier 'public'
    // window.open("/cv.pdf", "_blank");
    alert("Lien CV à configurer (voir code)");
  };

  return (
    <section id="about" className="min-h-screen relative flex items-center justify-center py-20 px-6 overflow-hidden">
      
      {/* Fond Décoratif discret */}
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-purple-900/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        
        {/* COLONNE 1 : BIO */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="sticky top-24"> {/* Petit effet sticky sympa si la page est grande */}
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              Développeur <br/>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-400">
                & Créateur d'expériences.
              </span>
            </h2>
            
            <div className="space-y-4 text-slate-300 text-lg leading-relaxed mb-8">
              <p>
                Le code est pour moi un outil de création autant que de résolution de problèmes. 
                J'aime construire des interfaces qui semblent simples, même quand la logique derrière est complexe.
              </p>
              <p>
                Mon approche est pragmatique : <strong className="text-white">performance</strong>, <strong className="text-white">accessibilité</strong> et <strong className="text-white">design</strong> soigné.
              </p>
            </div>

            <button 
              onClick={handleDownloadCV}
              className="group relative px-8 py-3 rounded-full bg-white text-slate-900 font-bold overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
            >
              Télécharger mon CV
            </button>
          </div>
        </motion.div>


        {/* COLONNE 2 : STACK (Version Minimaliste Texte) */}
        <div>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-8">
             Technologies & Outils
          </h3>
          
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="
                  cursor-default
                  px-6 py-3 
                  rounded-xl
                  bg-slate-800/30 backdrop-blur-sm border border-white/10
                  text-slate-300 font-medium tracking-wide
                  hover:bg-white/10 hover:text-cyan-300 hover:border-cyan-500/30
                  transition-all duration-300
                "
              >
                {skill}
              </motion.div>
            ))}
          </div>

          {/* Bloc Statut */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-12 pt-8 border-t border-white/5"
          >
            <div className="flex items-center gap-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <p className="text-slate-400 text-sm">
                Disponible pour de nouveaux projets.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default About;