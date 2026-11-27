import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, m, useScroll } from 'framer-motion'
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
  const headerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll()

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

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    const onPointerDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onPointerDown)
    }
  }, [menuOpen])

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
      ref={headerRef}
      className="fixed top-4 inset-x-0 z-50 flex justify-center px-4"
      role="banner"
    >
      {/* Pill nav */}
      <nav
        className={`
          relative overflow-hidden flex items-center gap-1 px-2 py-2 rounded-full border
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
          className="px-3 py-1 font-sans font-semibold text-[14px] text-text-primary tracking-tight leading-none select-none transition-opacity duration-fast hover:opacity-80"
          aria-label={`${profile.displayName} — home`}
        >
          {profile.displayName}
        </a>

        {/* Divider */}
        <span className="hidden sm:block w-px h-4 bg-border-rest mx-1" aria-hidden="true" />

        {/* Desktop links with sliding active pill */}
        <div className="hidden sm:flex items-center gap-0.5">
          {NAV_LINKS.map(link => {
            const id = link.href.replace('#', '')
            const isActive = activeSection === id
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`
                  relative px-3 py-1.5 rounded-full font-sans text-[13px] font-medium
                  transition-colors duration-fast
                  ${isActive
                    ? 'text-text-primary'
                    : 'text-text-secondary hover:text-text-primary'
                  }
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                {isActive && (
                  <m.span
                    layoutId="nav-active-pill"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    className="absolute inset-0 rounded-full bg-surface-high border border-border-hover/60"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            )
          })}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="sm:hidden p-2 rounded-full text-text-secondary hover:text-text-primary hover:bg-surface-hover active:scale-95 transition-all duration-fast"
          onClick={() => setMenuOpen(o => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>

        {/* Scroll progress hairline */}
        <m.div
          className="absolute bottom-0 inset-x-4 h-px bg-text-primary/35 origin-left pointer-events-none"
          style={{ scaleX: scrollYProgress }}
          aria-hidden="true"
        />
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-16 left-4 right-4 bg-surface-card/95 border border-border-rest rounded-lg p-3 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-md sm:hidden"
            role="dialog"
            aria-label="Navigation menu"
          >
            {NAV_LINKS.map(link => {
              const isActive = activeSection === link.href.replace('#', '')
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`
                    block px-4 py-3 rounded-md font-sans text-[14px] font-medium
                    transition-colors duration-fast
                    ${isActive
                      ? 'text-text-primary bg-surface-high'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                    }
                  `}
                >
                  {link.label}
                </a>
              )
            })}
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
