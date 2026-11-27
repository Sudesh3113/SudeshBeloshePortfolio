import { useRef, useState } from 'react'
import { AnimatePresence, m, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, MapPin } from 'lucide-react'
import { Container } from '../layout/Container'
import { SectionTag } from '../layout/SectionHeading'
import { experiences } from '../../data/experience'
import { educations } from '../../data/education'
import { projects } from '../../data/projects'

/* ─────────────────────────── small atoms ─────────────────────────── */

function SkillChip({ label }: { label: string }) {
  return (
    <span className="inline-flex font-mono text-[10px] px-2 py-0.5 rounded border border-border-rest bg-surface-card text-text-muted hover:border-border-hover hover:text-text-secondary transition-colors duration-fast">
      {label}
    </span>
  )
}

function DeliveredSystemsList({ projectIds }: { projectIds: string[] }) {
  const [open, setOpen] = useState(false)
  const items = projectIds
    .map(id => projects.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  if (items.length === 0) return null

  return (
    <div className="pt-3.5 mt-3.5 border-t border-border-rest">
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-2 text-left group/btn"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-text-secondary group-hover/btn:text-text-primary transition-colors duration-fast">
          KEY SYSTEMS · {items.length} DELIVERED
        </span>
        <ChevronDown
          size={13}
          className={`text-text-muted group-hover/btn:text-text-primary transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <m.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="mt-3 space-y-2"
          >
            {items.map(project => (
              <div
                key={project.id}
                className="px-3 py-2 rounded border border-border-rest bg-surface-card hover:border-border-hover transition-colors duration-fast"
              >
                <span className="font-mono text-[9px] uppercase tracking-widest text-text-faint block">
                  {project.label}
                </span>
                <p className="font-sans text-[12px] font-medium text-text-secondary leading-snug">
                  {project.title}
                </p>
              </div>
            ))}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ───────────── desktop: node ring + stem connector ───────────────── */

function DesktopMilestoneNode({
  label,
  direction,
  active = false,
  delay = 0.3,
}: {
  label: string
  direction: 'down' | 'up'
  active?: boolean
  delay?: number
}) {
  const stem = (
    <div
      className={`w-px h-9 ${
        direction === 'down'
          ? 'bg-gradient-to-b from-border-hover to-text-muted/70'
          : 'bg-gradient-to-b from-text-muted/70 to-border-hover'
      }`}
    />
  )

  const ring = (
    <m.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, delay, ease: [0.16, 1, 0.3, 1] as const }}
      className={`relative flex items-center justify-center rounded-full bg-bg transition-all duration-300 group-hover:scale-110 ${
        active
          ? 'w-7 h-7 border-2 border-text-primary shadow-[0_0_16px_rgba(245,245,245,0.16)]'
          : 'w-6 h-6 border-2 border-border-hover group-hover:border-text-primary'
      }`}
    >
      <span
        className={`rounded-full ${
          active
            ? 'w-2 h-2 bg-text-primary animate-pulse-dot'
            : 'w-2 h-2 bg-text-secondary group-hover:bg-text-primary transition-colors duration-300'
        }`}
      />
    </m.div>
  )

  const tag = (
    <span
      className={`font-mono text-[10px] tracking-widest uppercase ${
        active ? 'text-text-secondary' : 'text-text-faint'
      }`}
    >
      {label}
    </span>
  )

  return (
    <div
      className={`hidden lg:flex flex-col items-center ${
        direction === 'down' ? 'mt-5' : 'mb-5'
      }`}
      aria-hidden="true"
    >
      {direction === 'down' ? (
        <>
          {stem}
          {ring}
          <div className="mt-2">{tag}</div>
        </>
      ) : (
        <>
          <div className="mb-2">{tag}</div>
          {ring}
          {stem}
        </>
      )}
    </div>
  )
}

/* ───────────── mobile: left-rail node dot + connecting line ───────── */

function MobileNodeRail({
  isLast = false,
  isActive = false,
}: {
  isLast?: boolean
  isActive?: boolean
}) {
  return (
    <div className="lg:hidden relative flex flex-col items-center pt-1.5 shrink-0" aria-hidden="true">
      <div
        className={`relative flex items-center justify-center w-4 h-4 rounded-full border bg-bg ${
          isActive ? 'border-text-primary' : 'border-border-hover'
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            isActive ? 'bg-text-primary animate-pulse-dot' : 'bg-text-muted'
          }`}
        />
      </div>
      {!isLast && (
        <div className="flex-1 w-px bg-gradient-to-b from-border-hover via-border-rest to-border-rest/30 mt-2" />
      )}
    </div>
  )
}

/* ─────────────────────── main section ────────────────────────────── */

export function ExperienceSection() {
  const mobileRailRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress: mobileProgress } = useScroll({
    target: mobileRailRef,
    offset: ['start 85%', 'end 60%'],
  })
  const mobileRailScaleY = useTransform(mobileProgress, [0, 1], [0, 1])

  const bsc = educations.find(e => e.id === 'bsc')
  const mca = educations.find(e => e.id === 'mca')
  const exp = experiences[0]

  const expDateRange =
    exp?.startDate
      ? `${exp.startDate} — ${exp.status === 'current' ? 'Present' : exp.endDate}`
      : exp?.status === 'current'
        ? 'Present'
        : ''

  return (
    <section
      id="experience"
      className="py-24 section-divider"
      aria-label="Professional experience and education"
    >
      <Container>
        {/* ── Editorial Header ── */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 mb-8 border-b border-border-rest"
        >
          <div>
            <SectionTag index="04" label="CHRONOLOGY & FOUNDATION" pulse className="mb-4" />
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-5">
              <h2
                className="font-sans font-semibold text-text-primary tracking-tight"
                style={{ fontSize: 'var(--text-headline-lg)', lineHeight: '1.1', letterSpacing: '-0.03em' }}
              >
                Experience &amp; Education.
              </h2>
              <p className="font-sans text-[15px] text-text-secondary">The journey so far.</p>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-1">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-text-primary animate-pulse-dot" aria-hidden="true" />
              <span className="label-caps text-text-secondary">CAREER CADENCE // 01 → 03</span>
            </div>
            <span className="font-mono text-[11px] text-text-faint">PUNE, IN · CONTINUOUS RECORD</span>
          </div>
        </m.div>

        {/* ── Desktop Staggered 3-Column S-Curve Composition ── */}
        <div className="hidden lg:block relative pt-8 pb-6">
          {/* Ambient S-Curve SVG Vector Connector sweeping behind the 3 columns */}
          <div
            className="absolute inset-x-0 top-[54%] -translate-y-1/2 pointer-events-none z-0"
            aria-hidden="true"
          >
            <svg
              className="w-full h-44 overflow-visible"
              viewBox="0 0 1200 160"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <linearGradient id="expStreamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#383838" stopOpacity="0.35" />
                  <stop offset="35%" stopColor="#929292" stopOpacity="0.7" />
                  <stop offset="70%" stopColor="#929292" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#F5F5F5" stopOpacity="0.95" />
                </linearGradient>
              </defs>

              {/* Subtle Secondary Ghost Dashed Wave */}
              <path
                d="M 0,80 C 200,80 200,30 400,30 C 600,30 600,130 800,130 C 1000,130 1000,80 1200,80"
                stroke="#262626"
                strokeWidth="1"
                strokeDasharray="4 6"
                opacity="0.75"
              />

              {/* Primary Harmonic Bezier Wave — draws in on scroll */}
              <m.path
                d="M 0,80 C 180,80 220,25 390,25 C 570,25 610,135 790,135 C 970,135 1020,80 1200,80"
                stroke="url(#expStreamGradient)"
                strokeWidth="1.75"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0.25 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] as const }}
              />
            </svg>
          </div>

          {/* 3-Column Staggered Grid */}
          <div className="grid grid-cols-3 gap-8 relative z-10 items-start">
            {/* ── 01 // FOUNDATION (B.Sc. CS) — Top-aligned ── */}
            {bsc && (
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                className="group flex flex-col -translate-y-4"
              >
                <div className="p-6 rounded-lg border border-border-rest bg-surface-low/95 backdrop-blur-sm hover:border-border-hover hover:-translate-y-0.5 transition-all duration-base shadow-xl">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="label-caps text-text-faint">01 // FOUNDATION</span>
                    <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full border border-border-rest bg-surface-card text-text-muted">
                      {bsc.startYear} – {bsc.endYear}
                    </span>
                  </div>

                  <h3
                    className="font-sans font-semibold text-text-primary mb-1.5 group-hover:text-white transition-colors"
                    style={{ fontSize: 'var(--text-headline-sm)' }}
                  >
                    {bsc.degree} {bsc.field}
                  </h3>
                  <p className="font-sans text-[13px] text-text-secondary mb-1">{bsc.institution}</p>
                  <p className="font-mono text-[11px] text-text-muted mb-5">{bsc.location}</p>

                  <div className="pt-3.5 border-t border-border-rest flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-text-faint">
                      UNDERGRADUATE
                    </span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-border-rest bg-surface-card text-text-muted">
                      COMPLETED
                    </span>
                  </div>
                </div>

                <DesktopMilestoneNode label="FOUNDATIONAL" direction="down" delay={0.3} />
              </m.div>
            )}

            {/* ── 02 // SPECIALIZATION (MCA) — Staggered lower ── */}
            {mca && (
              <m.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] as const }}
                className="group flex flex-col mt-16"
              >
                <DesktopMilestoneNode label="POSTGRADUATE" direction="up" delay={0.55} />

                <div className="p-6 rounded-lg border border-border-rest bg-surface-low/95 backdrop-blur-sm hover:border-border-hover hover:-translate-y-0.5 transition-all duration-base shadow-xl">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="label-caps text-text-faint">02 // SPECIALIZATION</span>
                    <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full border border-border-rest bg-surface-card text-text-muted">
                      {mca.startYear} – {mca.endYear}
                    </span>
                  </div>

                  <h3
                    className="font-sans font-semibold text-text-primary mb-1.5 group-hover:text-white transition-colors"
                    style={{ fontSize: 'var(--text-headline-sm)' }}
                  >
                    {mca.field} ({mca.degree})
                  </h3>
                  <p className="font-sans text-[13px] text-text-secondary mb-1">{mca.institution}</p>
                  <p className="font-mono text-[11px] text-text-muted mb-5">{mca.location}</p>

                  <div className="pt-3.5 border-t border-border-rest flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-text-faint">
                      MASTER DEGREE
                    </span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-surface-high text-text-secondary border border-border-hover">
                      {mca.status === 'in-progress' ? 'IN PROGRESS' : 'COMPLETED'}
                    </span>
                  </div>
                </div>
              </m.div>
            )}

            {/* ── 03 // INDUSTRY (Neuro Spark Works) — Top-aligned ── */}
            {exp && (
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.22, ease: [0.16, 1, 0.3, 1] as const }}
                className="group flex flex-col -translate-y-4"
              >
                <div className="relative p-6 rounded-lg border border-border-hover bg-surface-low/95 backdrop-blur-sm hover:border-text-muted/60 hover:-translate-y-0.5 transition-all duration-base shadow-2xl">
                  {/* Subtle monochrome top highlight bar */}
                  <div
                    className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-border-hover via-text-primary/80 to-border-hover rounded-t-lg"
                    aria-hidden="true"
                  />

                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="label-caps text-text-muted">03 // INDUSTRY</span>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-border-hover bg-surface-high">
                      <span className="w-1.5 h-1.5 rounded-full bg-text-primary animate-pulse-dot" aria-hidden="true" />
                      <span className="font-mono text-[10px] text-text-primary uppercase tracking-wider">
                        {expDateRange || 'ACTIVE'}
                      </span>
                    </div>
                  </div>

                  <h3
                    className="font-sans font-semibold text-text-primary mb-1"
                    style={{ fontSize: 'var(--text-headline-sm)' }}
                  >
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3.5">
                    <p className="font-sans text-[13px] font-medium text-text-secondary">{exp.company}</p>
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] text-text-muted">
                      <MapPin size={10} />
                      {exp.location}
                    </span>
                  </div>

                  <p className="font-sans text-[13px] text-text-secondary leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map(skill => (
                      <SkillChip key={skill} label={skill} />
                    ))}
                  </div>

                  <DeliveredSystemsList projectIds={exp.projectIds} />
                </div>

                <DesktopMilestoneNode label="COMMERCIAL" direction="down" active delay={0.8} />
              </m.div>
            )}
          </div>

          {/* Subtle Editorial Telemetry Footer Bar */}
          <m.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
            className="mt-8 px-5 py-3 rounded-lg border border-border-rest bg-surface-low flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded border border-border-hover bg-surface-card text-text-secondary">
                SYS.LOG
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                CHRONOLOGICAL VELOCITY // ACADEMIC RIGOR &amp; COMMERCIAL EXECUTION
              </span>
            </div>
            <div className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-widest text-text-faint">
              <span>STATUS: STABLE</span>
              <span>INDEX: 01 → 03</span>
              <span className="text-text-secondary">ACTIVE</span>
            </div>
          </m.div>
        </div>

        {/* ── Mobile / Tablet Vertical Spine Layout (< lg) ── */}
        <div ref={mobileRailRef} className="lg:hidden relative">
          {/* scroll-linked background spine */}
          <div
            className="absolute left-[7.5px] top-3 bottom-6 w-px bg-border-rest/30 pointer-events-none"
            aria-hidden="true"
          >
            <m.div
              style={{ scaleY: mobileRailScaleY, transformOrigin: 'top' }}
              className="w-full h-full bg-gradient-to-b from-text-secondary/60 via-border-hover to-text-primary/50"
            />
          </div>

          <div className="flex flex-col gap-6">
            {/* B.Sc. */}
            {bsc && (
              <m.div
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                className="flex gap-4"
              >
                <MobileNodeRail />
                <div className="flex-1 pb-2">
                  <div className="p-4 rounded-lg border border-border-rest bg-surface-low hover:border-border-hover transition-all duration-base">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="label-caps text-text-faint">01 // FOUNDATION</span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-border-rest bg-surface-card text-text-muted">
                        {bsc.startYear} – {bsc.endYear}
                      </span>
                    </div>
                    <h3 className="font-sans font-semibold text-text-primary text-[15px] mb-1">
                      {bsc.degree} {bsc.field}
                    </h3>
                    <p className="font-sans text-[13px] text-text-secondary mb-1">{bsc.institution}</p>
                    <p className="font-mono text-[11px] text-text-muted mb-4">{bsc.location}</p>
                    <div className="pt-3 border-t border-border-rest flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-text-faint">UNDERGRADUATE</span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-border-rest bg-surface-card text-text-muted">
                        COMPLETED
                      </span>
                    </div>
                  </div>
                </div>
              </m.div>
            )}

            {/* MCA */}
            {mca && (
              <m.div
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] as const }}
                className="flex gap-4"
              >
                <MobileNodeRail />
                <div className="flex-1 pb-2">
                  <div className="p-4 rounded-lg border border-border-rest bg-surface-low hover:border-border-hover transition-all duration-base">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="label-caps text-text-faint">02 // SPECIALIZATION</span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-border-rest bg-surface-card text-text-muted">
                        {mca.startYear} – {mca.endYear}
                      </span>
                    </div>
                    <h3 className="font-sans font-semibold text-text-primary text-[15px] mb-1">
                      {mca.field} ({mca.degree})
                    </h3>
                    <p className="font-sans text-[13px] text-text-secondary mb-1">{mca.institution}</p>
                    <p className="font-mono text-[11px] text-text-muted mb-4">{mca.location}</p>
                    <div className="pt-3 border-t border-border-rest flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-text-faint">MASTER DEGREE</span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-surface-high text-text-secondary border border-border-hover">
                        {mca.status === 'in-progress' ? 'IN PROGRESS' : 'COMPLETED'}
                      </span>
                    </div>
                  </div>
                </div>
              </m.div>
            )}

            {/* Industry */}
            {exp && (
              <m.div
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: 0.16, ease: [0.16, 1, 0.3, 1] as const }}
                className="flex gap-4"
              >
                <MobileNodeRail isLast isActive />
                <div className="flex-1 pb-2">
                  <div className="relative p-4 rounded-lg border border-border-hover bg-surface-low hover:border-text-muted/60 transition-all duration-base">
                    <div
                      className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-border-hover via-text-primary/80 to-border-hover rounded-t-lg"
                      aria-hidden="true"
                    />
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="label-caps text-text-muted">03 // INDUSTRY</span>
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-border-hover bg-surface-high">
                        <span className="w-1.5 h-1.5 rounded-full bg-text-primary animate-pulse-dot" aria-hidden="true" />
                        <span className="font-mono text-[10px] text-text-primary uppercase tracking-wider">
                          {expDateRange || 'ACTIVE'}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-sans font-semibold text-text-primary text-[15px] mb-1">{exp.role}</h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
                      <p className="font-sans text-[13px] font-medium text-text-secondary">{exp.company}</p>
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] text-text-muted">
                        <MapPin size={10} />
                        {exp.location}
                      </span>
                    </div>
                    <p className="font-sans text-[13px] text-text-secondary leading-relaxed mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.skills.map(skill => (
                        <SkillChip key={skill} label={skill} />
                      ))}
                    </div>
                    <DeliveredSystemsList projectIds={exp.projectIds} />
                  </div>
                </div>
              </m.div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
