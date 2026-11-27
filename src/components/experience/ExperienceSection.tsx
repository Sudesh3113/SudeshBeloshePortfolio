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
    <div className="pt-4 mt-4 border-t border-border-rest">
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

/* ──────────────────────── card wrappers ───────────────────────────── */

/** Top-row card: B.Sc. or Industry — sits ABOVE the wave, stem goes DOWN */
function TopCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const }}
      className="flex flex-col"
    >
      {children}
      {/* Stem connecting card bottom → wave node */}
      <div className="hidden lg:flex flex-col items-center mt-4" aria-hidden="true">
        <div className="w-px flex-1 min-h-[32px] bg-gradient-to-b from-border-hover to-transparent" />
      </div>
    </m.div>
  )
}

/** Bottom-row card: MCA — sits BELOW the wave, stem goes UP */
function BottomCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <m.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const }}
      className="flex flex-col"
    >
      {/* Stem connecting wave node → card top */}
      <div className="hidden lg:flex flex-col items-center mb-4" aria-hidden="true">
        <div className="w-px flex-1 min-h-[32px] bg-gradient-to-b from-transparent to-border-hover" />
      </div>
      {children}
    </m.div>
  )
}

/* ──────────────────────── wave + nodes ────────────────────────────── */

/**
 * SVG S-curve from left-mid → up-left crest → down-centre trough → up-right crest
 * viewBox 1200 × 96; nodes at:
 *   01  x=200  y=16   → left=16.666%  top=16.666%
 *   02  x=600  y=80   → left=50%      top=83.333%
 *   03  x=1000 y=16   → left=83.333%  top=16.666%
 */
function DesktopWave() {
  const PATH =
    'M 0,48 C 80,48 120,16 200,16 C 320,16 480,80 600,80 C 720,80 880,16 1000,16 C 1080,16 1120,48 1200,48'

  const nodes: Array<{
    left: string
    top: string
    delay: number
    active?: boolean
    label: string
  }> = [
    { left: '16.666%', top: '16.666%', delay: 0.3, label: 'B.SC.' },
    { left: '50%', top: '83.333%', delay: 0.55, label: 'MCA' },
    { left: '83.333%', top: '16.666%', delay: 0.8, active: true, label: 'INDUSTRY' },
  ]

  return (
    <div
      className="hidden lg:block relative w-full h-[96px] pointer-events-none select-none my-0"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 w-full h-full overflow-visible"
        viewBox="0 0 1200 96"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="expWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#383838" stopOpacity="0.5" />
            <stop offset="45%" stopColor="#929292" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#F5F5F5" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* faint dashed guide — always visible */}
        <path
          d={PATH}
          stroke="#262626"
          strokeWidth="1"
          strokeDasharray="4 7"
        />

        {/* animated primary curve */}
        <m.path
          d={PATH}
          stroke="url(#expWaveGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
        />
      </svg>

      {/* milestone node rings */}
      {nodes.map((node, i) => (
        <m.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.3, delay: node.delay }}
          className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-bg ${
            node.active
              ? 'w-7 h-7 border-2 border-text-primary shadow-[0_0_14px_rgba(245,245,245,0.12)]'
              : 'w-5 h-5 border border-border-hover'
          }`}
          style={{ left: node.left, top: node.top }}
        >
          <span
            className={`rounded-full ${
              node.active
                ? 'w-2 h-2 bg-text-primary animate-pulse-dot'
                : 'w-1.5 h-1.5 bg-text-secondary'
            }`}
          />
        </m.div>
      ))}
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
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 mb-10 border-b border-border-rest"
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

        {/* ── Desktop S-Curve Layout ── */}
        <div className="hidden lg:block">
          {/*
            Structure:
              Row A  → [BSc card col-1] [empty col-2] [Industry card col-3]   (top cards)
              Row B  → [wave spanning all 3 cols]
              Row C  → [empty col-1] [MCA card col-2] [empty col-3]           (bottom card)
            
            We use a plain flex approach so heights are deterministic:
            - Top row: 3-column flex, each column `flex-1`
            - Wave row: fixed height div
            - Bottom row: MCA centred in col-2 position
          */}

          {/* Row A: top cards */}
          <div className="flex gap-8 items-stretch">
            {/* Col 1 — BSc */}
            <div className="flex-1">
              {bsc && (
                <TopCard delay={0}>
                  <div className="p-5 rounded-lg border border-border-rest bg-surface-low hover:border-border-hover hover:-translate-y-0.5 transition-all duration-base group">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <span className="label-caps text-text-faint">01 // FOUNDATION</span>
                      <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full border border-border-rest bg-surface-card text-text-muted">
                        {bsc.startYear} – {bsc.endYear}
                      </span>
                    </div>
                    <h3
                      className="font-sans font-semibold text-text-primary mb-1"
                      style={{ fontSize: 'var(--text-headline-sm)' }}
                    >
                      {bsc.degree} {bsc.field}
                    </h3>
                    <p className="font-sans text-[13px] text-text-secondary mb-1">{bsc.institution}</p>
                    <p className="font-mono text-[11px] text-text-muted mb-5">{bsc.location}</p>
                    <div className="pt-3 border-t border-border-rest flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-text-faint">
                        UNDERGRADUATE
                      </span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-border-rest bg-surface-card text-text-muted">
                        COMPLETED
                      </span>
                    </div>
                  </div>
                </TopCard>
              )}
            </div>

            {/* Col 2 — empty on top row */}
            <div className="flex-1" />

            {/* Col 3 — Industry */}
            <div className="flex-1">
              {exp && (
                <TopCard delay={0.15}>
                  <div className="relative p-5 rounded-lg border border-border-hover bg-surface-low hover:border-text-muted/60 hover:-translate-y-0.5 transition-all duration-base">
                    {/* top highlight bar */}
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
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
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
                </TopCard>
              )}
            </div>
          </div>

          {/* Row B: S-Curve Wave */}
          <DesktopWave />

          {/* Row C: MCA card centred in col-2 position */}
          <div className="flex gap-8">
            {/* Col 1 — empty */}
            <div className="flex-1" />

            {/* Col 2 — MCA */}
            <div className="flex-1">
              {mca && (
                <BottomCard delay={0.1}>
                  <div className="p-5 rounded-lg border border-border-rest bg-surface-low hover:border-border-hover hover:-translate-y-0.5 transition-all duration-base">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <span className="label-caps text-text-faint">02 // SPECIALIZATION</span>
                      <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full border border-border-rest bg-surface-card text-text-muted">
                        {mca.startYear} – {mca.endYear}
                      </span>
                    </div>
                    <h3
                      className="font-sans font-semibold text-text-primary mb-1"
                      style={{ fontSize: 'var(--text-headline-sm)' }}
                    >
                      {mca.field} ({mca.degree})
                    </h3>
                    <p className="font-sans text-[13px] text-text-secondary mb-1">{mca.institution}</p>
                    <p className="font-mono text-[11px] text-text-muted mb-5">{mca.location}</p>
                    <div className="pt-3 border-t border-border-rest flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-text-faint">
                        MASTER DEGREE
                      </span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-surface-high text-text-secondary border border-border-hover">
                        {mca.status === 'in-progress' ? 'IN PROGRESS' : 'COMPLETED'}
                      </span>
                    </div>
                  </div>
                </BottomCard>
              )}
            </div>

            {/* Col 3 — empty */}
            <div className="flex-1" />
          </div>
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
