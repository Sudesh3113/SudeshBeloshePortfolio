import { motion } from 'framer-motion'
import { Container } from '../layout/Container'
import { SectionTag, SectionHeading } from '../layout/SectionHeading'

interface StackItem {
  name: string
  subtitle: string
}

interface StackCategory {
  index: string
  label: string
  items: StackItem[]
}

const STACK_CATEGORIES: StackCategory[] = [
  {
    index: '01',
    label: 'LANGUAGES',
    items: [
      { name: 'JavaScript', subtitle: 'ESNext' },
      { name: 'TypeScript', subtitle: 'Strict Types' },
      { name: 'Java', subtitle: 'Core OOP' },
      { name: 'C++', subtitle: 'Algorithms' },
      { name: 'Python', subtitle: 'Automation' },
      { name: 'PHP', subtitle: 'Backend Scripts' },
      { name: 'SQL', subtitle: 'Relational Queries' },
    ],
  },
  {
    index: '02',
    label: 'FRAMEWORKS & DEVELOPMENT',
    items: [
      { name: 'React', subtitle: 'UI Components' },
      { name: 'Node.js', subtitle: 'V8 Runtime' },
      { name: 'Express.js', subtitle: 'Middleware & Routing' },
      { name: 'HTML', subtitle: 'Semantic DOM' },
      { name: 'CSS', subtitle: 'Modern Styling' },
      { name: 'REST APIs', subtitle: 'API Contracts' },
    ],
  },
  {
    index: '03',
    label: 'DATABASES & TOOLS',
    items: [
      { name: 'MongoDB', subtitle: 'Document Store' },
      { name: 'PostgreSQL', subtitle: 'Relational ACID' },
      { name: 'MySQL', subtitle: 'Relational DB' },
      { name: 'Docker', subtitle: 'Containerization' },
      { name: 'Git', subtitle: 'Version Control' },
      { name: 'GitHub', subtitle: 'CI/CD & Workflows' },
      { name: 'Keycloak', subtitle: 'Auth & IAM' },
      { name: 'Postman', subtitle: 'API Testing' },
    ],
  },
  {
    index: '04',
    label: 'EMBEDDED & IOT INTERESTS',
    items: [
      { name: 'Arduino', subtitle: 'Microcontroller Prototyping' },
      { name: 'ESP32', subtitle: 'Wi-Fi / Bluetooth IoT' },
      { name: 'Raspberry Pi', subtitle: 'Embedded Linux & Edge' },
      { name: 'NodeMCU', subtitle: 'ESP8266 Sensor Nodes' },
    ],
  },
]

function StackTile({ name, subtitle }: StackItem) {
  return (
    <div className="px-3.5 py-3 rounded-md bg-surface-card border border-border-rest hover:border-border-hover hover:bg-surface-hover transition-colors duration-fast group">
      <p className="font-sans text-[14px] font-medium text-text-primary group-hover:text-text-primary">
        {name}
      </p>
      <p className="font-mono text-[11px] text-text-muted mt-0.5">{subtitle}</p>
    </div>
  )
}

function StackCategory({ index, label, items }: StackCategory) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border-rest">
        <span className="font-mono text-[11px] text-text-faint">{index}</span>
        <span className="label-caps">{label}</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        {items.map(item => (
          <StackTile key={item.name} {...item} />
        ))}
      </div>
    </div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
}

export function TechStack() {
  return (
    <section
      id="stack"
      className="py-24 section-divider"
      aria-label="Technology stack"
    >
      <Container>
        {/* Section header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          <div className="lg:col-span-6">
            <SectionTag index="02" label="TECHNICAL ARSENAL" pulse className="mb-5" />
            <SectionHeading
              heading="Tech Stack."
              headingClassName="text-text-primary"
            />
          </div>
          <div className="lg:col-span-6 flex items-end">
            <p className="text-text-secondary" style={{ fontSize: 'var(--text-body-lg)', lineHeight: '1.65' }}>
              A practical toolset built through real production work—from enterprise web platforms to embedded IoT prototypes.
            </p>
          </div>
        </div>

        {/* Categories */}
        <motion.div
          className="space-y-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          {STACK_CATEGORIES.map(cat => (
            <motion.div key={cat.index} variants={fadeUp}>
              <StackCategory {...cat} />
            </motion.div>
          ))}
        </motion.div>

        {/* Manifesto footer */}
        <div className="mt-14 pt-8 border-t border-border-rest flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-mono text-[12px] text-text-muted leading-relaxed max-w-lg">
            I pick tools that solve real problems—not for résumé decoration. Every item on this list has shipped to production or powered a working prototype.
          </p>
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-rest text-[13px] font-medium text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors duration-fast font-sans"
          >
            See Projects →
          </a>
        </div>
      </Container>
    </section>
  )
}
