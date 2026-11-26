import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { GitHubIcon } from '../ui/BrandIcons'
import { Container } from '../layout/Container'
import { SectionTag } from '../layout/SectionHeading'
import { projects, type Project } from '../../data/projects'
import { profile } from '../../data/profile'

/* Monochrome window dot colors — no macOS traffic lights */
const WIN_DOTS = ['bg-[#4a4a4a]', 'bg-[#5e5e5e]', 'bg-[#6e6e6e]']

function CodeWindowPreview({ filename, index }: { filename: string; index: number }) {
  /* Stacked/rotated mock windows that fan out subtly */
  const rotations = [5, 2.5, 0]
  const translateY = [8, 4, 0]
  const translateX = [6, 3, 0]

  return (
    <div className="relative h-[180px] mb-4">
      {rotations.map((rot, i) => (
        <div
          key={i}
          className="absolute inset-x-0 bottom-0 rounded-md border border-border-rest bg-surface-low overflow-hidden"
          style={{
            transform: `rotate(${rot}deg) translateY(-${translateY[i]}px) translateX(${translateX[i]}px)`,
            transformOrigin: 'bottom center',
            zIndex: i === 2 ? 3 : i === 1 ? 2 : 1,
          }}
          aria-hidden={i < 2}
        >
          {/* Window chrome */}
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border-rest bg-surface-card">
            {WIN_DOTS.map((dot, j) => (
              <span key={j} className={`w-2 h-2 rounded-full ${dot}`} />
            ))}
            {i === 2 && (
              <span className="ml-2 font-mono text-[10px] text-text-faint">{filename}</span>
            )}
          </div>

          {/* Mock code lines */}
          <div className="p-3 space-y-1.5">
            {Array.from({ length: 5 }).map((_, li) => (
              <div key={li} className="flex items-center gap-2">
                <span className="font-mono text-[9px] text-text-faint w-3 shrink-0">{li + (index * 3) + 1}</span>
                <div
                  className="h-1.5 rounded-full bg-surface-high"
                  style={{ width: `${[65, 85, 50, 75, 40][li]}%`, opacity: 0.6 + li * 0.08 }}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      className="flex flex-col border border-border-rest rounded-lg bg-surface-low p-5 hover:border-border-hover transition-colors duration-base group"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Label */}
      <div className="flex items-center justify-between mb-3">
        <span className="label-caps text-text-faint">{project.label}</span>
        <span className="font-mono text-[10px] text-text-faint">0{index + 1}</span>
      </div>

      {/* Code window preview */}
      <CodeWindowPreview filename={project.windowFilename} index={index} />

      {/* Title */}
      <h3
        className="font-sans font-semibold text-text-primary mb-2 leading-snug"
        style={{ fontSize: 'var(--text-headline-sm)' }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p className="font-sans text-[13px] text-text-secondary leading-relaxed mb-4 flex-1">
        {project.description}
      </p>

      {/* Tech chips */}
      {project.technologies.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map(tech => (
            <span
              key={tech}
              className="font-mono text-[10px] px-2 py-0.5 rounded border border-border-subtle bg-surface-card text-text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 mt-auto pt-3 border-t border-border-rest">
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-[11px] text-text-muted hover:text-text-primary transition-colors duration-fast"
          >
            View Project <ArrowUpRight size={11} />
          </a>
        ) : (
          <span className="inline-flex items-center gap-1 font-mono text-[11px] text-text-faint cursor-default">
            View Project <ArrowUpRight size={11} />
          </span>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-[11px] text-text-muted hover:text-text-primary transition-colors duration-fast ml-auto"
          >
            <GitHubIcon size={11} /> Source
          </a>
        )}
      </div>
    </motion.article>
  )
}

export function Projects() {
  return (
    <section
      id="projects"
      className="py-24 section-divider"
      aria-label="Selected projects"
    >
      <Container>
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
          <SectionTag index="03" label="SELECTED WORKS" pulse />
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-rest text-[12px] font-mono text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors duration-fast"
          >
            <GitHubIcon size={12} />
            GitHub Profile
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Callout banner */}
        <div className="mt-10 p-6 md:p-8 rounded-lg border border-border-rest bg-surface-low flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <p className="label-caps text-text-muted mb-2">ENGINEERING PRACTICE</p>
            <p className="font-sans font-semibold text-text-primary text-[16px] leading-snug">
              Interested in what I can build for you?
            </p>
            <p className="font-sans text-[14px] text-text-secondary mt-1">
              I focus on clean, maintainable code and practical solutions.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-text-primary text-bg font-sans font-medium text-[13px] hover:opacity-90 transition-opacity duration-fast"
            >
              Get in Touch
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-border-rest text-text-secondary font-sans font-medium text-[13px] hover:text-text-primary hover:border-border-hover transition-colors duration-fast"
            >
              <GitHubIcon size={13} />
              Explore GitHub
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
