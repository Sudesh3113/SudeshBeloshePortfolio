import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { profile } from '../../data/profile'

const NAV_LINKS = [
  { label: 'Overview', href: '#hero' },
  { label: 'Stack', href: '#stack' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = NAV_LINKS.map(l => l.href.replace('#', ''))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      const offset = 80
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  return (
    <header
      className="fixed top-4 inset-x-0 z-50 flex justify-center px-4"
      role="banner"
    >
      {/* Pill nav */}
      <nav
        className={`
          flex items-center gap-1 px-2 py-2 rounded-full border
          transition-all duration-250 ease-out
          ${scrolled
            ? 'bg-surface-card/90 border-border-rest backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.6)]'
            : 'bg-surface-card/70 border-border-rest backdrop-blur-sm'
          }
        `}
        aria-label="Primary navigation"
      >
        {/* Brand */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="px-3 py-1 font-sans font-semibold text-[14px] text-text-primary tracking-tight leading-none select-none"
          aria-label={`${profile.displayName} — home`}
        >
          {profile.displayName}
        </a>

        {/* Divider */}
        <span className="hidden sm:block w-px h-4 bg-border-rest mx-1" aria-hidden="true" />

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-0.5">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`
                px-3 py-1.5 rounded-full font-sans text-[13px] font-medium
                transition-colors duration-fast
                ${activeSection === link.href.replace('#', '')
                  ? 'text-text-primary bg-surface-high'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                }
              `}
              aria-current={activeSection === link.href.replace('#', '') ? 'page' : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Divider */}
        <span className="hidden sm:block w-px h-4 bg-border-rest mx-1" aria-hidden="true" />

        {/* Mobile menu toggle */}
        <button
          className="sm:hidden p-2 rounded-full text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors duration-fast"
          onClick={() => setMenuOpen(o => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="absolute top-16 left-4 right-4 bg-surface-card border border-border-rest rounded-lg p-3 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-md sm:hidden"
          role="dialog"
          aria-label="Navigation menu"
        >
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`
                block px-4 py-3 rounded-md font-sans text-[14px] font-medium
                transition-colors duration-fast
                ${activeSection === link.href.replace('#', '')
                  ? 'text-text-primary bg-surface-high'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                }
              `}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
