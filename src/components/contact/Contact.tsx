import { motion } from 'framer-motion'
import { MapPin, ArrowUpRight } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons'
import { Container } from '../layout/Container'
import { SectionTag } from '../layout/SectionHeading'
import { profile } from '../../data/profile'

export function Contact() {
  return (
    <section
      id="contact"
      className="py-24 section-divider"
      aria-label="Contact"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left — identity */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionTag index="05" label="CONTACT" pulse className="mb-6" />

            <p
              className="font-sans font-semibold text-text-primary tracking-tight mb-3"
              style={{ fontSize: 'var(--text-headline-lg)', lineHeight: '1.1', letterSpacing: '-0.03em' }}
            >
              {profile.displayName}
            </p>
            <p className="font-sans text-text-secondary text-[15px] mb-6">
              {profile.role}
            </p>

            <div className="p-4 rounded-lg border border-border-rest bg-surface-low">
              <div className="flex items-center gap-2 mb-1">
                <MapPin size={12} className="text-text-muted" />
                <span className="label-caps">{profile.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-text-secondary animate-pulse-dot" />
                <span className="font-mono text-[12px] text-text-secondary">{profile.availability}</span>
              </div>
            </div>
          </motion.div>

          {/* Center — directory */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="label-caps text-text-faint mb-5">[ DIRECTORY ]</p>
            <nav aria-label="Site directory">
              {[
                { n: '01', label: 'Overview', href: '#hero' },
                { n: '02', label: 'Technical Stack', href: '#stack' },
                { n: '03', label: 'Selected Works', href: '#projects' },
                { n: '04', label: 'Experience', href: '#experience' },
                { n: '05', label: 'Contact', href: '#contact' },
              ].map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    const id = item.href.replace('#', '')
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="flex items-center gap-3 py-2.5 border-b border-border-rest group hover:border-border-hover transition-colors duration-fast"
                >
                  <span className="font-mono text-[11px] text-text-faint w-5">{item.n}</span>
                  <span className="font-sans text-[14px] text-text-secondary group-hover:text-text-primary transition-colors duration-fast">
                    {item.label}
                  </span>
                  <ArrowUpRight size={12} className="ml-auto text-text-faint opacity-0 group-hover:opacity-100 transition-opacity duration-fast" />
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Right — connect */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="label-caps text-text-faint mb-5">[ CONNECT ]</p>

            <div className="space-y-3">
              {/* Email — only shown if present */}
              {profile.email ? (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center justify-between p-4 rounded-lg border border-border-rest bg-surface-low hover:border-border-hover transition-colors duration-fast group"
                >
                  <div>
                    <p className="label-caps text-text-faint mb-0.5">EMAIL</p>
                    <p className="font-mono text-[13px] text-text-secondary group-hover:text-text-primary transition-colors">
                      {profile.email}
                    </p>
                  </div>
                  <ArrowUpRight size={14} className="text-text-muted group-hover:text-text-primary transition-colors" />
                </a>
              ) : (
                <div className="flex items-center justify-between p-4 rounded-lg border border-border-rest bg-surface-low opacity-50">
                  <div>
                    <p className="label-caps text-text-faint mb-0.5">EMAIL</p>
                    <p className="font-mono text-[13px] text-text-muted">Available on request</p>
                  </div>
                </div>
              )}

              {/* GitHub */}
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg border border-border-rest bg-surface-low hover:border-border-hover transition-colors duration-fast group"
              >
                <GitHubIcon size={16} className="text-text-muted group-hover:text-text-primary transition-colors shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="label-caps text-text-faint mb-0.5">GITHUB</p>
                  <p className="font-mono text-[12px] text-text-secondary group-hover:text-text-primary transition-colors truncate">
                    github.com/Sudesh3113
                  </p>
                </div>
                <ArrowUpRight size={14} className="text-text-muted group-hover:text-text-primary transition-colors shrink-0" />
              </a>

              {/* LinkedIn */}
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg border border-border-rest bg-surface-low hover:border-border-hover transition-colors duration-fast group"
              >
                <LinkedInIcon size={16} className="text-text-muted group-hover:text-text-primary transition-colors shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="label-caps text-text-faint mb-0.5">LINKEDIN</p>
                  <p className="font-mono text-[12px] text-text-secondary group-hover:text-text-primary transition-colors truncate">
                    linkedin.com/in/sudesh-beloshe
                  </p>
                </div>
                <ArrowUpRight size={14} className="text-text-muted group-hover:text-text-primary transition-colors shrink-0" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border-rest flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p
            className="font-sans font-semibold text-text-primary"
            style={{ fontSize: 'var(--text-headline-md)', letterSpacing: '-0.02em' }}
          >
            See you around.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-rest text-[13px] font-mono text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors duration-fast"
          >
            Back to Top ↑
          </button>
        </div>
      </Container>
    </section>
  )
}
