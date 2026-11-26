import { motion } from 'framer-motion'
import { MapPin, ArrowRight } from 'lucide-react'
import { profile } from '../../data/profile'
import { SectionTag } from '../layout/SectionHeading'
import { Container } from '../layout/Container'

const CORE_STACK = ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker']

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
}
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
      aria-label="Introduction"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 ambient-glow pointer-events-none"
        aria-hidden="true"
      />

      <Container>
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {/* ── Left column: profile ── */}
          <motion.div
            variants={fadeUp}
            className="lg:col-span-4 order-2 lg:order-1"
          >
            <SectionTag index="01" label="PROFILE" className="mb-6" />

            <div className="mb-6">
              <p
                className="font-sans font-semibold text-text-primary tracking-tight"
                style={{ fontSize: 'var(--text-display-xl)', lineHeight: '1.05', letterSpacing: '-0.04em' }}
              >
                {profile.displayName}
              </p>
              <p
                className="mt-2 font-sans text-text-secondary"
                style={{ fontSize: 'var(--text-headline-sm)' }}
              >
                {profile.role}
              </p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-border-rest mb-6" />

            {/* Location */}
            <div className="flex items-center gap-2 mb-6">
              <MapPin size={12} className="text-text-muted shrink-0" />
              <span className="label-caps">{profile.location} · {profile.timezone}</span>
            </div>

            {/* Availability card */}
            <div className="p-4 rounded-lg border border-border-rest bg-surface-low mb-4">
              <p className="label-caps text-text-muted mb-1">STATUS</p>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-text-secondary animate-pulse-dot" aria-hidden="true" />
                <span className="font-sans text-[13px] text-text-primary font-medium">
                  {profile.availability}
                </span>
              </div>
            </div>

            {/* Core Stack card */}
            <div className="p-4 rounded-lg border border-border-rest bg-surface-low">
              <p className="label-caps text-text-muted mb-3">CORE STACK</p>
              <div className="flex flex-wrap gap-2">
                {CORE_STACK.map(tech => (
                  <span
                    key={tech}
                    className="font-mono text-[11px] px-2.5 py-1 rounded-full border border-border-rest bg-surface-card text-text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Center column: portrait ── */}
          <motion.div
            variants={fadeUp}
            className="lg:col-span-4 order-1 lg:order-2 flex justify-center"
          >
            <div className="relative w-full max-w-[300px] lg:max-w-none">
              {/* Portrait frame */}
              <div
                className="relative aspect-[3/4] rounded-lg border border-border-rest bg-surface-low overflow-hidden"
                style={{ maxHeight: '460px' }}
              >
                {/* Corner brackets */}
                {[
                  'top-2 left-2 border-t border-l',
                  'top-2 right-2 border-t border-r',
                  'bottom-2 left-2 border-b border-l',
                  'bottom-2 right-2 border-b border-r',
                ].map((classes, i) => (
                  <span
                    key={i}
                    className={`absolute w-5 h-5 ${classes} border-text-muted/40`}
                    aria-hidden="true"
                  />
                ))}

                {/* Placeholder portrait */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-surface-high border border-border-rest flex items-center justify-center">
                    <span className="font-sans font-semibold text-text-muted text-xl">SB</span>
                  </div>
                  <span className="label-caps text-text-faint">Photo — Coming Soon</span>
                </div>

                {/* Bottom overlay badge */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-surface-low/90 to-transparent">
                  <p className="font-sans font-semibold text-[13px] text-text-primary">{profile.displayName}</p>
                  <p className="label-caps text-text-muted">{profile.role}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Right column: statement ── */}
          <motion.div
            variants={fadeUp}
            className="lg:col-span-4 order-3"
          >
            <SectionTag index="STATEMENT" label="SCOPE" className="mb-6" />

            <h2
              className="font-sans font-semibold text-text-primary mb-6"
              style={{
                fontSize: 'var(--text-headline-md)',
                lineHeight: '1.35',
                letterSpacing: '-0.02em',
              }}
            >
              {profile.tagline}
            </h2>

            <p
              className="text-text-secondary mb-8"
              style={{ fontSize: 'var(--text-body-lg)', lineHeight: '1.65' }}
            >
              {profile.bio}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 mb-8">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-text-primary text-bg font-sans font-medium text-[14px] transition-opacity duration-fast hover:opacity-90 focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                Explore Projects
                <ArrowRight size={14} />
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-border-rest text-text-secondary font-sans font-medium text-[14px] transition-colors duration-fast hover:text-text-primary hover:border-border-hover"
              >
                Get in Touch
              </a>
            </div>

            {/* Focus metadata */}
            <div className="border-t border-border-rest pt-5">
              <p className="label-caps text-text-faint mb-2">FOCUS:</p>
              <p className="font-mono text-[12px] text-text-muted leading-relaxed">
                Full-Stack Web · Enterprise Systems · REST APIs · Auth & IAM · IoT / Embedded
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
