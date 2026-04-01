'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarTopic {
  id: string
  title: string
  href: string
}

interface SidebarSection {
  id: string
  label: string
  topics: SidebarTopic[]
}

const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    id: 'sorting',
    label: 'Sorting Algorithms',
    topics: [
      { id: 'bubble-sort', title: 'Bubble Sort', href: '/learn-dsa/bubble-sort' },
      { id: 'insertion-sort', title: 'Insertion Sort', href: '/learn-dsa/insertion-sort' },
      { id: 'merge-sort', title: 'Merge Sort', href: '/learn-dsa/merge-sort' },
      { id: 'quick-sort', title: 'Quick Sort', href: '/learn-dsa/quick-sort' },
    ],
  },
  {
    id: 'searching',
    label: 'Searching Algorithms',
    topics: [
      { id: 'linear-search', title: 'Linear Search', href: '/learn-dsa/linear-search' },
      { id: 'binary-search', title: 'Binary Search', href: '/learn-dsa/binary-search' },
    ],
  },
]

export function LearnSidebar() {
  const pathname = usePathname()

  return (
    <aside
      style={{
        width: 220,
        minWidth: 220,
        paddingTop: 8,
        paddingRight: 8,
      }}
    >
      {/* Back link */}
      <Link
        href="/learn-dsa"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontFamily: 'var(--font-nunito)',
          fontWeight: 600,
          fontSize: 13,
          color: '#6b7280',
          textDecoration: 'none',
          marginBottom: 24,
        }}
      >
        ← All Topics
      </Link>

      {/* Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {SIDEBAR_SECTIONS.map((section) => (
          <div key={section.id}>
            <div
              style={{
                fontFamily: 'var(--font-poppins)',
                fontWeight: 700,
                fontSize: 10,
                color: '#6FB5FF',
                letterSpacing: '0.1em',
                marginBottom: 10,
              }}
            >
              {section.label.toUpperCase()}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {section.topics.map((topic) => {
                const isActive = pathname === topic.href
                return (
                  <Link
                    key={topic.id}
                    href={topic.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '7px 10px',
                      borderRadius: 8,
                      fontFamily: 'var(--font-nunito)',
                      fontWeight: isActive ? 700 : 600,
                      fontSize: 13,
                      color: isActive ? '#ffffff' : '#374151',
                      background: isActive ? '#6FB5FF' : 'transparent',
                      textDecoration: 'none',
                    }}
                  >
                    {/* Checkmark */}
                    <span style={{ color: isActive ? '#ffffff' : '#6FB5FF', fontSize: 11 }}>✓</span>
                    {topic.title}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
