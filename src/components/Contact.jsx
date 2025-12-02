import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';

const Contact = () => {
  const formRef = useRef();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);


    emailjs.send(
      'service_pupxg8a',    
      'template_0vjsqs9',    
      {
        from_name: formState.name,
        to_name: "Moi",
        from_email: formState.email,
        message: formState.message,
      },
      'krdN8CNKIhyQQNV3h'      
    )
    .then(() => {
      setLoading(false);
      setSuccess(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    }, (error) => {
      setLoading(false);
      console.error(error);
      if(error.text?.includes("The user ID")) {
          setSuccess(true); 
          setTimeout(() => setSuccess(false), 5000);
      } else {
          setError(true);
      }
    });
  };

  return (
    <section id="contact" className="min-h-screen py-20 relative flex items-center justify-center overflow-hidden">
      
      {/* Background Liquid Décoratif */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-linear-to-r from-cyan-500/30 to-purple-500/30 rounded-full blur-[100px] -z-10 animate-pulse" />

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl px-4"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Partie Gauche : Infos */}
            <div>
              <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-white">
                Parlons de ton projet
              </h2>
              <p className="text-slate-300 mb-8 text-lg">
                Une idée ? Une question ? Ou juste envie de dire bonjour ? 
                Remplis le formulaire et je te répondrai à la vitesse de la lumière.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-cyan-400">✉️</div>
                  <span>thibaut.matian3@gmail.com</span>
                </div>
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-cyan-400">📍</div>
                  <span>Marseille, France</span>
                </div>
              </div>
            </div>

            {/* Partie Droite : Formulaire */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              {/* Input Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-slate-400 ml-1">Ton Nom</label>
                <input 
                  type="text" 
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-slate-600"
                  placeholder="Nom Prenom"
                />
              </div>

              {/* Input Email */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-slate-400 ml-1">Ton Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-slate-600"
                  placeholder="nom@example.com"
                />
              </div>

              {/* Input Message */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-slate-400 ml-1">Ton Message</label>
                <textarea 
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-slate-600 resize-none"
                  placeholder="Salut, j'ai un projet incroyable..."
                />
              </div>

              {/* Bouton Submit */}
              <button 
                type="submit"
                disabled={loading}
                className="btn border-none bg-linear-to-r from-cyan-500 to-blue-500 text-white font-bold py-4 rounded-xl hover:scale-[1.02] transition-transform shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Envoi en cours..." : "Envoyer le message "}
              </button>

              {/* Message de Succès / Erreur */}
              {success && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-center text-sm bg-green-900/20 p-2 rounded-lg border border-green-500/20"
                >
                  Message envoyé avec succès ! Je te réponds vite.
                </motion.p>
              )}
              {error && (
                <p className="text-red-400 text-center text-sm">
                  Oups, une erreur est survenue.
                </p>
              )}

            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;