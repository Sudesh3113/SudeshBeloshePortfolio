import React from 'react'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export function Container({ children, className = '', as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full max-w-container px-5 md:px-10 lg:px-16 ${className}`}
    >
      {children}
    </Tag>
  )
}
