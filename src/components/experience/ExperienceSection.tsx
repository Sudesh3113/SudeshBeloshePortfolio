import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { Container } from '../layout/Container'
import { SectionTag } from '../layout/SectionHeading'
import { experiences } from '../../data/experience'
import { educations } from '../../data/education'
import { projects } from '../../data/projects'

function SkillChip({ label }: { label: string }) {
  return (
    <span className="inline-flex font-mono text-[11px] px-2.5 py-1 rounded border border-border-rest bg-surface-card text-text-muted">
      {label}
    </span>
  )
}

function ProjectSubCard({ projectId }: { projectId: string }) {
  const project = projects.find(p => p.id === projectId)
  if (!project) return null
  return (
    <div className="p-3 rounded-md border border-border-rest bg-surface-card">
      <span className="label-caps text-text-faint mb-1 block">{project.label}</span>
      <p className="font-sans text-[13px] font-medium text-text-secondary leading-snug">
        {project.title}
      </p>
    </div>
  )
}

function ExperienceRow() {
  const exp = experiences[0]
  if (!exp) return null

  const dateRange = exp.startDate
    ? `${exp.startDate} — ${exp.status === 'current' ? 'Present' : exp.endDate}`
    : exp.status === 'current' ? 'Present' : ''

  return (
    <div className="flex gap-6 md:gap-10">
      {/* Timeline rail */}
      <div className="relative flex flex-col items-center pt-1">
        <div className="w-3 h-3 rounded-full border-2 border-text-secondary bg-bg shrink-0 mt-0.5" />
        <div className="flex-1 w-px bg-gradient-to-b from-text-secondary/40 via-border-hover/60 to-transparent mt-2" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-12">
        <SectionTag index="01" label="EXPERIENCE" className="mb-5" />

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          {dateRange && (
            <span className="font-mono text-[11px] px-3 py-1 rounded-full border border-border-rest text-text-muted bg-surface-card">
              {dateRange}
            </span>
          )}
          <span className="flex items-center gap-1 font-mono text-[11px] px-3 py-1 rounded-full border border-border-rest text-text-muted bg-surface-card">
            <MapPin size={10} />
            {exp.location}
          </span>
        </div>

        <h3
          className="font-sans font-semibold text-text-primary mb-1"
          style={{ fontSize: 'var(--text-headline-sm)' }}
        >
          {exp.role}
        </h3>
        <p className="font-sans text-[14px] text-text-secondary mb-4">{exp.company}</p>

        <p className="font-sans text-[14px] text-text-secondary leading-relaxed mb-6">
          {exp.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {exp.skills.map(s => <SkillChip key={s} label={s} />)}
        </div>

        {/* Key projects */}
        {exp.projectIds.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border-rest">
              <span className="label-caps">KEY PRODUCTION SYSTEMS</span>
              <span className="font-mono text-[11px] text-text-faint">
                {exp.projectIds.length} DELIVERED
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {exp.projectIds.map(id => (
                <ProjectSubCard key={id} projectId={id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function EducationRow() {
  return (
    <div className="flex gap-6 md:gap-10">
      {/* Timeline rail */}
      <div className="relative flex flex-col items-center pt-1">
        <div className="w-3 h-3 rounded-full border-2 border-border-hover bg-bg shrink-0 mt-0.5" />
        <div className="flex-1 w-px bg-gradient-to-b from-border-hover/60 to-transparent mt-2" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <SectionTag index="02" label="EDUCATION" className="mb-5" />

        <div className="space-y-4">
          {educations.map(edu => (
            <div
              key={edu.id}
              className="p-5 rounded-lg border border-border-rest bg-surface-low"
            >
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div>
                  <span className="label-caps text-text-faint block mb-1">
                    {edu.degree} · {edu.field}
                  </span>
                  <h4 className="font-sans font-medium text-text-primary text-[15px]">
                    {edu.institution}
                  </h4>
                  <p className="font-mono text-[11px] text-text-muted mt-0.5">{edu.location}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full border border-border-rest text-text-muted">
                    {edu.startYear} – {edu.endYear}
                  </span>
                  <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full ${
                    edu.status === 'in-progress'
                      ? 'bg-surface-high text-text-secondary border border-border-hover'
                      : 'bg-surface-card text-text-muted border border-border-rest'
                  }`}>
                    {edu.status === 'in-progress' ? 'IN PROGRESS' : 'COMPLETED'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="py-24 section-divider"
      aria-label="Professional experience and education"
    >
      <Container>
        {/* Section label */}
        <div className="mb-12">
          <SectionTag index="04" label="CAREER JOURNEY" pulse className="mb-5" />
          <h2
            className="font-sans font-semibold text-text-primary tracking-tight"
            style={{ fontSize: 'var(--text-headline-lg)', lineHeight: '1.1', letterSpacing: '-0.03em' }}
          >
            Experience &amp; Education.
          </h2>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <ExperienceRow />
          <EducationRow />
        </motion.div>
      </Container>
    </section>
  )
}
