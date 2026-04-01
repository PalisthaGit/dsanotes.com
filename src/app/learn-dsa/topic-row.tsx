'use client'

import Link from 'next/link'
import { useState } from 'react'

interface Topic {
  id: string
  title: string
  description: string
  href: string
  readMin: number
}

export function TopicRow({ topic, index }: { topic: Topic; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link href={topic.href} style={{ textDecoration: 'none' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 16,
          padding: '20px 24px',
          border: `0.5px solid ${hovered ? '#6FB5FF' : '#e5e7eb'}`,
          borderRadius: 12,
          background: '#ffffff',
          cursor: 'pointer',
          boxShadow: hovered ? '0 2px 10px rgba(111,181,255,0.15)' : 'none',
          transition: 'border-color 0.15s, box-shadow 0.15s',
        }}
      >
        {/* Index circle */}
        <div
          style={{
            minWidth: 32,
            height: 32,
            borderRadius: '50%',
            background: '#f0f7ff',
            color: '#6FB5FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-poppins)',
            fontWeight: 700,
            fontSize: 13,
          }}
        >
          {index + 1}
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: 'var(--font-poppins)',
              fontWeight: 700,
              fontSize: 15,
              color: '#0d1117',
              marginBottom: 4,
            }}
          >
            {topic.title}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-nunito)',
              fontWeight: 600,
              fontSize: 13,
              color: '#6b7280',
              lineHeight: 1.6,
            }}
          >
            {topic.description}
          </div>
        </div>

        {/* Read time */}
        <div
          style={{
            fontFamily: 'var(--font-nunito)',
            fontWeight: 700,
            fontSize: 12,
            color: '#9ca3af',
            whiteSpace: 'nowrap',
            paddingTop: 6,
          }}
        >
          {topic.readMin} min read
        </div>
      </div>
    </Link>
  )
}
