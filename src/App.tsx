import './styles/globals.css'
import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/hero/Hero'
import { TechStack } from './components/tech-stack/TechStack'
import { Projects } from './components/projects/Projects'
import { ExperienceSection } from './components/experience/ExperienceSection'
import { Contact } from './components/contact/Contact'
import { PanoramaFooter } from './components/footer/PanoramaFooter'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TechStack />
        <Projects />
        <ExperienceSection />
        <Contact />
      </main>
      <PanoramaFooter />
    </>
  )
}

export default App
