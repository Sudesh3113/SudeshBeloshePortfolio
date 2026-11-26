import React from 'react'

interface SectionTagProps {
  index: string    // e.g. "01"
  label: string    // e.g. "TECHNICAL ARSENAL"
  className?: string
  pulse?: boolean
}

export function SectionTag({ index, label, className = '', pulse = false }: SectionTagProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {pulse && (
        <span
          className="w-1.5 h-1.5 rounded-full bg-text-muted animate-pulse-dot"
          aria-hidden="true"
        />
      )}
      <span className="label-caps">
        [ {index} // {label} ]
      </span>
    </div>
  )
}

interface SectionHeadingProps {
  tag?: React.ReactNode
  heading: React.ReactNode
  description?: React.ReactNode
  className?: string
  headingClassName?: string
}

export function SectionHeading({
  tag,
  heading,
  description,
  className = '',
  headingClassName = '',
}: SectionHeadingProps) {
  return (
    <div className={className}>
      {tag && <div className="mb-4">{tag}</div>}
      <h2
        className={`font-sans font-semibold tracking-tight text-text-primary leading-tight ${headingClassName}`}
        style={{ fontSize: 'var(--text-headline-lg)' }}
      >
        {heading}
      </h2>
      {description && (
        <p
          className="mt-4 text-text-secondary"
          style={{ fontSize: 'var(--text-body-lg)', lineHeight: 'var(--leading-normal)' }}
        >
          {description}
        </p>
      )}
    </div>
  )
}
