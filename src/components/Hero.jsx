import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const Hero = () => {
  // --- LOGIQUE D'ANIMATION MOUSE TILT ---
  const ref = useRef(null);

  // Valeurs de la souris (x, y)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Pour adoucir le mouvement (effet physique plus lourd)
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Transformation des coordonnées en degrés de rotation
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // On calcule la position de la souris par rapport au centre de la carte (-0.5 à 0.5)
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    // Remet la carte à plat quand la souris sort
    x.set(0);
    y.set(0);
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900 text-white perspective-1000"
    >
      
      {/* --- FOND LIQUID ANIMÉ (Arrière-plan) --- */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] -z-10"
      />
      <motion.div 
        animate={{ scale: [1, 1.5, 1], x: [0, 100, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[100px] -z-10"
      />

      {/* --- LA CARTE TILT 3D --- */}
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d", // Indispensable pour la 3D
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-3xl px-6 py-20 cursor-default"
      >
        
        {/* L'effet Verre (La "plaque" physique) */}
        <div 
          className="
            absolute inset-0 
            bg-white/5 backdrop-blur-2xl 
            border border-white/10 rounded-3xl 
            shadow-[0_20px_50px_rgba(0,0,0,0.5)]
          "
          style={{ transform: "translateZ(0px)" }} // Base de la profondeur
        >
          {/* Reflet brillant dynamique (Glare effect) */}
          <motion.div 
             style={{
               opacity: useTransform(mouseXSpring, [-0.5, 0.5], [0, 0.3]),
               background: "linear-linear(105deg, transparent 40%, rgba(255,255,255,0.8) 45%, rgba(255,255,255,0) 50%)",
               x: useTransform(mouseXSpring, [-0.5, 0.5], ["-100%", "200%"])
             }}
             className="absolute inset-0 w-full h-full rounded-3xl pointer-events-none"
          />
        </div>

        {/* LE CONTENU (Détaché du verre pour effet 3D) */}
        <div style={{ transform: "translateZ(50px)" }} className="relative text-center px-4 md:px-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-block px-4 py-1 mb-6 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium tracking-wide uppercase"
          >
            Disponible pour Freelance
          </motion.div>

          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-linear-to-b from-white via-white to-white/50">
              CRÉATIF
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-purple-500 blur-sm absolute opacity-50 select-none" aria-hidden="true">
              DEVELOPER
            </span>
            <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-purple-500 relative">
              DEVELOPER
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
            Je transforme le verre et le code en expériences digitales immersives. 
            Bienvenue dans mon portfolio <span className="text-white font-semibold">React & Tailwind</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#projects" className="btn bg-white text-slate-900 hover:bg-slate-200 border-none px-8 py-3 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105">
              Explorer mes travaux
            </a>
            <a href="#contact" className="btn btn-ghost text-white hover:bg-white/10 px-8 py-3 rounded-full text-lg transition-all">
              Me contacter
            </a>
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default Hero;