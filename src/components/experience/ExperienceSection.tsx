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
        onClick={e => {
          e.stopPropagation()
          setOpen(prev => !prev)
        }}
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

/* ───────────── desktop: S-curve wave with locked nodes ───────────── */

/**
 * viewBox 1200 × 104:
 *   Col 1 center = 15.78% (x = 189, y = 20) — Crest 1
 *   Col 2 center = 50.00% (x = 600, y = 84) — Trough
 *   Col 3 center = 84.22% (x = 1011, y = 20) — Crest 2
 * Every dot and stem is positioned inside this same container so the dots
 * sit 100% on the SVG Bezier path at every desktop viewport width.
 */
type MilestoneId = 'bsc' | 'mca' | 'exp' | null

function DesktopWaveTrack({ hoveredId }: { hoveredId: MilestoneId }) {
  const wavePath =
    'M 0,52 C 70,52 110,20 189,20 C 330,20 460,84 600,84 C 740,84 870,20 1011,20 C 1090,20 1130,52 1200,52'

  const bscActive = hoveredId === 'bsc'
  const mcaActive = hoveredId === 'mca'
  const expActive = hoveredId === 'exp'

  return (
    <div className="hidden lg:block relative w-full h-[104px] pointer-events-none select-none" aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full overflow-visible"
        viewBox="0 0 1200 104"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="expStreamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#383838" stopOpacity="0.35" />
            <stop offset="35%" stopColor="#929292" stopOpacity="0.75" />
            <stop offset="70%" stopColor="#929292" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#F5F5F5" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* Subtle Secondary Ghost Dashed Wave */}
        <path
          d={wavePath}
          stroke="#262626"
          strokeWidth="1"
          strokeDasharray="4 6"
          opacity="0.7"
        />

        {/* Primary Harmonic Bezier Wave — draws in on scroll */}
        <m.path
          d={wavePath}
          stroke="url(#expStreamGradient)"
          strokeWidth="1.75"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.25 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] as const }}
        />
      </svg>

      {/* ── Node 01: FOUNDATIONAL (on Crest 1: left 15.78%, top 20px) ── */}
      <div
        className="absolute top-0 bottom-0 -translate-x-1/2 flex flex-col items-center"
        style={{ left: '15.78%' }}
      >
        <div
          className={`w-px h-[20px] transition-colors duration-300 ${
            bscActive
              ? 'bg-gradient-to-b from-text-primary/80 to-text-primary'
              : 'bg-gradient-to-b from-border-hover to-text-muted/70'
          }`}
        />
        <m.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35, delay: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
          className={`-mt-3 flex items-center justify-center w-6 h-6 rounded-full bg-bg border-2 transition-all duration-300 ${
            bscActive
              ? 'scale-125 border-text-primary shadow-[0_0_20px_rgba(245,245,245,0.28)]'
              : 'border-border-hover'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              bscActive ? 'bg-text-primary' : 'bg-text-secondary'
            }`}
          />
        </m.div>
        <span
          className={`mt-2 font-mono text-[10px] tracking-widest uppercase transition-colors duration-300 ${
            bscActive ? 'text-text-primary' : 'text-text-faint'
          }`}
        >
          FOUNDATIONAL
        </span>
      </div>

      {/* ── Node 02: POSTGRADUATE (on Trough: left 50%, top 84px) ── */}
      <div
        className="absolute top-0 bottom-0 -translate-x-1/2 flex flex-col items-center justify-end"
        style={{ left: '50%' }}
      >
        <span
          className={`mb-2 font-mono text-[10px] tracking-widest uppercase transition-colors duration-300 ${
            mcaActive ? 'text-text-primary' : 'text-text-faint'
          }`}
        >
          POSTGRADUATE
        </span>
        <m.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35, delay: 0.55, ease: [0.16, 1, 0.3, 1] as const }}
          className={`-mb-3 relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-bg border-2 transition-all duration-300 ${
            mcaActive
              ? 'scale-125 border-text-primary shadow-[0_0_20px_rgba(245,245,245,0.28)]'
              : 'border-border-hover'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              mcaActive ? 'bg-text-primary' : 'bg-text-secondary'
            }`}
          />
        </m.div>
        <div
          className={`w-px h-[20px] transition-colors duration-300 ${
            mcaActive
              ? 'bg-gradient-to-b from-text-primary to-text-primary/80'
              : 'bg-gradient-to-b from-text-muted/70 to-border-hover'
          }`}
        />
      </div>

      {/* ── Node 03: COMMERCIAL (on Crest 2: left 84.22%, top 20px) ── */}
      <div
        className="absolute top-0 bottom-0 -translate-x-1/2 flex flex-col items-center"
        style={{ left: '84.22%' }}
      >
        <div
          className={`w-px h-[20px] transition-colors duration-300 ${
            expActive
              ? 'bg-gradient-to-b from-text-primary to-text-primary'
              : 'bg-gradient-to-b from-border-hover to-text-primary/80'
          }`}
        />
        <m.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35, delay: 0.85, ease: [0.16, 1, 0.3, 1] as const }}
          className={`-mt-3.5 flex items-center justify-center w-7 h-7 rounded-full bg-bg border-2 border-text-primary transition-all duration-300 ${
            expActive
              ? 'scale-125 shadow-[0_0_24px_rgba(245,245,245,0.35)]'
              : 'shadow-[0_0_16px_rgba(245,245,245,0.16)]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-text-primary animate-pulse-dot" />
        </m.div>
        <span
          className={`mt-2 font-mono text-[10px] tracking-widest uppercase transition-colors duration-300 ${
            expActive ? 'text-text-primary' : 'text-text-secondary'
          }`}
        >
          COMMERCIAL
        </span>
      </div>
    </div>
  )
}

/* ───────────── mobile: left-rail node dot + connecting line ───────── */

function MobileNodeRail({
  isLast = false,
  isActive = false,
  highlighted = false,
  delay = 0,
}: {
  isLast?: boolean
  isActive?: boolean
  highlighted?: boolean
  delay?: number
}) {
  return (
    <div className="lg:hidden relative flex flex-col items-center pt-1.5 shrink-0" aria-hidden="true">
      <m.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.3, delay, ease: [0.16, 1, 0.3, 1] as const }}
        className={`relative flex items-center justify-center w-5 h-5 rounded-full border-2 bg-bg transition-all duration-300 ${
          highlighted
            ? 'scale-125 border-text-primary shadow-[0_0_18px_rgba(245,245,245,0.3)]'
            : isActive
              ? 'border-text-primary shadow-[0_0_12px_rgba(245,245,245,0.14)]'
              : 'border-border-hover'
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
            highlighted || isActive
              ? `bg-text-primary ${isActive ? 'animate-pulse-dot' : ''}`
              : 'bg-text-muted'
          }`}
        />
      </m.div>
      {!isLast && (
        <div
          className={`flex-1 w-px mt-2 transition-colors duration-300 ${
            highlighted
              ? 'bg-gradient-to-b from-text-primary/80 via-border-hover to-border-rest/30'
              : 'bg-gradient-to-b from-border-hover via-border-rest to-border-rest/30'
          }`}
        />
      )}
    </div>
  )
}

/* ─────────────────────── main section ────────────────────────────── */

export function ExperienceSection() {
  const [hoveredId, setHoveredId] = useState<MilestoneId>(null)
  const [selectedMobileId, setSelectedMobileId] = useState<MilestoneId>(null)
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

        {/* ── Desktop 3-Column S-Curve Composition ── */}
        <div className="hidden lg:block">
          {/* Top Row: Col 1 (B.Sc.) and Col 3 (Industry) bottom-aligned flush to the wave stems */}
          <div className="grid grid-cols-3 gap-8 items-end">
            {/* Col 1 — 01 // FOUNDATION */}
            <div>
              {bsc && (
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.035, y: -6 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
                  onMouseEnter={() => setHoveredId('bsc')}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{ transformOrigin: 'bottom center' }}
                  className={`p-5 rounded-lg border transition-all duration-300 ${
                    hoveredId === 'bsc'
                      ? 'border-text-muted/60 bg-surface-card shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_20px_48px_rgba(0,0,0,0.65),0_0_32px_rgba(245,245,245,0.05)]'
                      : 'border-border-rest bg-surface-low shadow-xl'
                  }`}
                >
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
                </m.div>
              )}
            </div>

            {/* Col 2 — Empty on top row */}
            <div />

            {/* Col 3 — 03 // INDUSTRY */}
            <div>
              {exp && (
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.035, y: -6 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
                  onMouseEnter={() => setHoveredId('exp')}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{ transformOrigin: 'bottom center' }}
                  className={`relative p-5 rounded-lg border transition-all duration-300 ${
                    hoveredId === 'exp'
                      ? 'border-text-muted/75 bg-surface-card shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_24px_56px_rgba(0,0,0,0.7),0_0_36px_rgba(245,245,245,0.07)]'
                      : 'border-border-hover bg-surface-low shadow-2xl'
                  }`}
                >
                  <div
                    className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-border-hover via-text-primary/80 to-border-hover rounded-t-lg"
                    aria-hidden="true"
                  />

                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
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
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
                    <p className="font-sans text-[13px] font-medium text-text-secondary">{exp.company}</p>
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] text-text-muted">
                      <MapPin size={10} />
                      {exp.location}
                    </span>
                  </div>

                  <p className="font-sans text-[13px] text-text-secondary leading-relaxed mb-3.5">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map(skill => (
                      <SkillChip key={skill} label={skill} />
                    ))}
                  </div>

                  <DeliveredSystemsList projectIds={exp.projectIds} />
                </m.div>
              )}
            </div>
          </div>

          {/* Middle Row: S-Curve Wave with 3 Milestone Dots locked directly onto the path */}
          <DesktopWaveTrack hoveredId={hoveredId} />

          {/* Bottom Row: Col 2 (MCA) flush below Node 02's stem */}
          <div className="grid grid-cols-3 gap-8">
            <div />
            <div>
              {mca && (
                <m.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.035, y: 6 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
                  onMouseEnter={() => setHoveredId('mca')}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{ transformOrigin: 'top center' }}
                  className={`p-5 rounded-lg border transition-all duration-300 ${
                    hoveredId === 'mca'
                      ? 'border-text-muted/60 bg-surface-card shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_20px_48px_rgba(0,0,0,0.65),0_0_32px_rgba(245,245,245,0.05)]'
                      : 'border-border-rest bg-surface-low shadow-xl'
                  }`}
                >
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
                </m.div>
              )}
            </div>
            <div />
          </div>

          {/* Subtle Editorial Telemetry Footer Bar */}
          <m.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
            className="mt-10 px-5 py-3 rounded-lg border border-border-rest bg-surface-low flex items-center justify-between gap-4"
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
            className="absolute left-[9.5px] top-3 bottom-6 w-px bg-border-rest/30 pointer-events-none"
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
                <MobileNodeRail highlighted={selectedMobileId === 'bsc'} delay={0.1} />
                <div className="flex-1 pb-2">
                  <m.div
                    animate={{ scale: selectedMobileId === 'bsc' ? 1.025 : 1 }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
                    onClick={() => setSelectedMobileId(prev => (prev === 'bsc' ? null : 'bsc'))}
                    className={`cursor-pointer p-4 rounded-lg border transition-all duration-300 ${
                      selectedMobileId === 'bsc'
                        ? 'border-text-muted/60 bg-surface-card shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_16px_40px_rgba(0,0,0,0.6),0_0_28px_rgba(245,245,245,0.05)]'
                        : 'border-border-rest bg-surface-low'
                    }`}
                  >
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
                  </m.div>
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
                <MobileNodeRail highlighted={selectedMobileId === 'mca'} delay={0.18} />
                <div className="flex-1 pb-2">
                  <m.div
                    animate={{ scale: selectedMobileId === 'mca' ? 1.025 : 1 }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
                    onClick={() => setSelectedMobileId(prev => (prev === 'mca' ? null : 'mca'))}
                    className={`cursor-pointer p-4 rounded-lg border transition-all duration-300 ${
                      selectedMobileId === 'mca'
                        ? 'border-text-muted/60 bg-surface-card shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_16px_40px_rgba(0,0,0,0.6),0_0_28px_rgba(245,245,245,0.05)]'
                        : 'border-border-rest bg-surface-low'
                    }`}
                  >
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
                  </m.div>
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
                <MobileNodeRail isLast isActive highlighted={selectedMobileId === 'exp'} delay={0.26} />
                <div className="flex-1 pb-2">
                  <m.div
                    animate={{ scale: selectedMobileId === 'exp' ? 1.025 : 1 }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
                    onClick={() => setSelectedMobileId(prev => (prev === 'exp' ? null : 'exp'))}
                    className={`cursor-pointer relative p-4 rounded-lg border transition-all duration-300 ${
                      selectedMobileId === 'exp'
                        ? 'border-text-muted/75 bg-surface-card shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_18px_44px_rgba(0,0,0,0.65),0_0_32px_rgba(245,245,245,0.07)]'
                        : 'border-border-hover bg-surface-low'
                    }`}
                  >
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
                  </m.div>
                </div>
              </m.div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
