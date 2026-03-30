'use client'

import Link from 'next/link'

const columns = [
  {
    heading: 'VISUALIZE',
    links: [
      { label: 'Sorting Algorithms', href: '/visualize/sorting' },
      { label: 'Search Algorithms', href: '/visualize/search' },
      { label: 'Pathfinding', href: '/visualize/pathfinding' },
      { label: 'MST Algorithms', href: '/visualize/mst' },
      { label: 'Strongly Connected', href: '/visualize/scc' },
      { label: 'String Matching', href: '/visualize/string-matching' },
    ],
  },
  {
    heading: 'LEARN',
    links: [
      { label: 'Learn DSA', href: '/learn' },
      { label: 'Common Problems', href: '/learn/problems' },
      { label: 'Data Structures', href: '/learn/data-structures' },
      { label: 'Algorithms', href: '/learn/algorithms' },
    ],
  },
  {
    heading: 'COMPANY',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  },
]

export default function Footer() {
  return (
    <footer style={{ background: '#f0f7ff', width: '100%' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 96px 24px' }}>
        {/* Top section */}
        <div style={{ display: 'flex', gap: '40px' }}>
          {/* Left: logo + tagline */}
          <div style={{ flexBasis: '30%', flexShrink: 0 }}>
            <span
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 700,
                color: '#0d1117',
                fontSize: '20px',
                display: 'block',
              }}
            >
              DSANotes
            </span>
            <p
              style={{
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 400,
                color: '#9ca3af',
                fontSize: '14px',
                maxWidth: '220px',
                lineHeight: 1.7,
                marginTop: '10px',
                marginBottom: 0,
              }}
            >
              Visualize algorithms. Master DSA.
            </p>
          </div>

          {/* Right: three columns */}
          <div style={{ flexBasis: '70%', display: 'flex', gap: '40px' }}>
            {columns.map((col) => (
              <div key={col.heading} style={{ flex: 1 }}>
                <p
                  style={{
                    fontFamily: 'Nunito, sans-serif',
                    fontWeight: 700,
                    color: '#6FB5FF',
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                    marginTop: 0,
                  }}
                >
                  {col.heading}
                </p>
                {col.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      display: 'block',
                      fontFamily: 'Nunito, sans-serif',
                      fontWeight: 400,
                      color: '#6b7280',
                      fontSize: '14px',
                      marginBottom: '12px',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#6FB5FF' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#6b7280' }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '0.5px solid #d4e6ff', marginTop: '40px' }} />

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '20px',
          }}
        >
          <span
            style={{
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 400,
              color: '#9ca3af',
              fontSize: '12px',
            }}
          >
            © 2025 DSANotes. All rights reserved.
          </span>
          <span
            style={{
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 400,
              color: '#9ca3af',
              fontSize: '12px',
            }}
          >
            Free for everyone. Always.
          </span>
        </div>
      </div>
    </footer>
  )
}
