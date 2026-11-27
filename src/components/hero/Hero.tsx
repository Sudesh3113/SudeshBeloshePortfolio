import { useRef } from 'react'
import { m, useScroll, useTransform } from 'framer-motion'
import { MapPin, ArrowRight } from 'lucide-react'
import { profile } from '../../data/profile'
import { SectionTag } from '../layout/SectionHeading'
import { Container } from '../layout/Container'

const CORE_STACK = ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker']

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
}
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09 } },
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 48])
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
      aria-label="Introduction"
    >
      {/* Ambient glow with subtle scroll parallax */}
      <m.div
        className="absolute inset-0 ambient-glow pointer-events-none"
        style={{ y: glowY, opacity: glowOpacity }}
        aria-hidden="true"
      />

      <Container>
        <m.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {/* ── Left column: profile ── */}
          <m.div
            variants={fadeUp}
            className="lg:col-span-4 order-2 lg:order-1"
          >
            <SectionTag index="01" label="PROFILE" className="mb-6" />

            <div className="mb-6">
              <h1
                className="font-sans font-semibold text-text-primary tracking-tight"
                style={{ fontSize: 'var(--text-display-xl)', lineHeight: '1.05', letterSpacing: '-0.04em' }}
              >
                {profile.displayName}
              </h1>
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
            <div className="p-4 rounded-lg border border-border-rest bg-surface-low hover:border-border-hover transition-colors duration-fast mb-4">
              <p className="label-caps text-text-muted mb-1">STATUS</p>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-text-secondary animate-pulse-dot" aria-hidden="true" />
                <span className="font-sans text-[13px] text-text-primary font-medium">
                  {profile.availability}
                </span>
              </div>
            </div>

            {/* Core Stack card */}
            <div className="p-4 rounded-lg border border-border-rest bg-surface-low hover:border-border-hover transition-colors duration-fast">
              <p className="label-caps text-text-muted mb-3">CORE STACK</p>
              <div className="flex flex-wrap gap-2">
                {CORE_STACK.map(tech => (
                  <span
                    key={tech}
                    className="font-mono text-[11px] px-2.5 py-1 rounded-full border border-border-rest bg-surface-card text-text-secondary hover:border-border-hover hover:text-text-primary transition-colors duration-fast"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </m.div>

          {/* ── Center column: portrait ── */}
          <m.div
            variants={fadeUp}
            className="lg:col-span-4 order-1 lg:order-2 flex justify-center"
          >
            <div className="relative w-full max-w-[300px] lg:max-w-none group">
              {/* Portrait frame */}
              <div
                className="relative aspect-[3/4] rounded-lg border border-border-rest group-hover:border-border-hover bg-surface-low overflow-hidden transition-colors duration-base"
                style={{ maxHeight: '460px' }}
              >
                {/* Corner brackets */}
                {[
                  'top-2 left-2 border-t border-l group-hover:translate-x-0.5 group-hover:translate-y-0.5',
                  'top-2 right-2 border-t border-r group-hover:-translate-x-0.5 group-hover:translate-y-0.5',
                  'bottom-2 left-2 border-b border-l group-hover:translate-x-0.5 group-hover:-translate-y-0.5',
                  'bottom-2 right-2 border-b border-r group-hover:-translate-x-0.5 group-hover:-translate-y-0.5',
                ].map((classes, i) => (
                  <m.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className={`absolute w-5 h-5 ${classes} border-text-muted/40 group-hover:border-text-muted/70 transition-all duration-base`}
                    aria-hidden="true"
                  />
                ))}

                {/* Placeholder portrait */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-surface-high border border-border-rest group-hover:border-border-hover group-hover:scale-105 transition-all duration-base flex items-center justify-center">
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
          </m.div>

          {/* ── Right column: statement ── */}
          <m.div
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
                className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-text-primary text-bg font-sans font-medium text-[14px] transition-all duration-fast hover:opacity-90 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                Explore Projects
                <ArrowRight size={14} className="transition-transform duration-fast group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-border-rest text-text-secondary font-sans font-medium text-[14px] transition-all duration-fast hover:text-text-primary hover:border-border-hover active:scale-[0.98]"
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
          </m.div>
        </m.div>
      </Container>
    </section>
  )
}
