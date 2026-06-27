import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import GameAchievements from './components/GameAchievements'
import Contact from './components/Contact'
import LoadingScreen from './components/LoadingScreen'

function App() {
  const [loaded, setLoaded] = useState(false)

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const href = e.target.closest('a')?.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <>
      {!loaded && <LoadingScreen onLoaded={() => setLoaded(true)} />}

      <div className={`relative min-h-screen transition-opacity duration-1000 ${
        loaded ? 'opacity-100' : 'opacity-0'
      }`}>
        {/* Global Fixed Background - Look Back style */}
        <div
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Semi-transparent overlay for readability */}
        <div className="fixed inset-0 z-[1] bg-black/30" />

        <Navbar />
        <main className="relative z-10">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <GameAchievements />
          <Contact />
        </main>
      </div>
    </>
  )
}

export default App
