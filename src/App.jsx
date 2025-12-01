import Hero from "./components/Hero";
import GlassNavigation from "./components/GlassNavigation";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact"; // <--- Import

export default function App() {
  return (
    <div className="bg-slate-900 min-h-screen text-white relative selection:bg-cyan-500 selection:text-white">
      
      <GlassNavigation />

      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
      
    </div>
  )
}