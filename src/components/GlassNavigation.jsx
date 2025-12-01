import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Les IDs doivent correspondre aux IDs de tes sections (ex: <section id="home">)
const navItems = [
  { id: 'home', label: 'Accueil' },
  { id: 'projects', label: 'Projets' },
  { id: 'about', label: 'À propos' },
  { id: 'contact', label: 'Contact' },
];

const GlassNavigation = () => {
  const [activeId, setActiveId] = useState('home');

  // Ce code détecte où on est sur la page quand on scrolle
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      navItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveId(item.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
      {/* Conteneur de la barre */}
      <div className="flex flex-col items-center gap-6 p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
        
        {navItems.map((item) => (
          <div key={item.id} className="relative group">
            
            {/* L'étiquette (Tooltip) qui apparaît au survol */}
            <span className="absolute left-10 top-1/2 -translate-y-1/2 px-2 py-1 
              bg-slate-800/80 text-white text-xs rounded opacity-0 -translate-x-2 
              group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap border border-white/10">
              {item.label}
            </span>

            {/* Le Bouton (Point) */}
            <button
              onClick={() => scrollToSection(item.id)}
              className={`relative w-3 h-3 rounded-full transition-all duration-300 
                ${activeId === item.id ? 'bg-cyan-400 scale-125 shadow-[0_0_10px_rgba(34,211,238,0.8)]' : 'bg-white/30 hover:bg-white/60'}
              `}
              aria-label={item.label}
            >
              {/* Petit effet d'anneau quand c'est actif */}
              {activeId === item.id && (
                <motion.div
                  layoutId="active-ring"
                  className="absolute -inset-1 rounded-full border border-cyan-400/50"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlassNavigation;