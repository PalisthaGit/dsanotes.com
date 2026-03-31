'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { dataStructureConfigs } from '@/config/data-structure-config'
import dynamic from 'next/dynamic'

const PAGE_MAP: Record<string, React.ComponentType> = {
  stack: dynamic(() => import('@/components/data-structures/pages/stack-page')),
  'linked-list': dynamic(() => import('@/components/data-structures/pages/linked-list-page')),
  queue: dynamic(() => import('@/components/data-structures/pages/queue-page')),
  'binary-tree': dynamic(() => import('@/components/data-structures/pages/binary-tree-page')),
  'hash-table': dynamic(() => import('@/components/data-structures/pages/hash-table-page')),
  graph: dynamic(() => import('@/components/data-structures/pages/graph-ds-page')),
}

export default function DataStructureSlugPage() {
  const params = useParams<{ slug: string }>()
  const slug = params?.slug ?? ''

  const config = dataStructureConfigs.find((c) => c.id === slug)
  const PageContent = PAGE_MAP[slug]

  if (!config || !PageContent) {
    return (
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 24px', textAlign: 'center' }}>
        <h1
          style={{
            fontFamily: 'var(--font-poppins)',
            fontWeight: 700,
            fontSize: 28,
            color: '#0d1117',
          }}
        >
          Data Structure Not Found
        </h1>
        <p style={{ fontFamily: 'var(--font-nunito)', color: '#6b7280', marginTop: 12 }}>
          The data structure &ldquo;{slug}&rdquo; does not exist.
        </p>
        <Link
          href="/data-structures"
          style={{
            display: 'inline-block',
            marginTop: 24,
            background: '#6FB5FF',
            color: '#fff',
            borderRadius: 8,
            padding: '10px 24px',
            fontFamily: 'var(--font-nunito)',
            fontWeight: 700,
            fontSize: 14,
            textDecoration: 'none',
          }}
        >
          ← Back to Data Structures
        </Link>
      </div>
    )
  }

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div
        style={{ maxWidth: 1280, margin: '0 auto' }}
        className="px-4 sm:px-8 lg:px-12 pt-6 pb-2"
      >
        <div
          style={{
            fontFamily: 'var(--font-nunito)',
            fontWeight: 600,
            fontSize: 12,
            color: '#9ca3af',
          }}
        >
          <Link href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>
            Home
          </Link>
          {' / '}
          <Link href="/data-structures" style={{ color: '#9ca3af', textDecoration: 'none' }}>
            Data Structures
          </Link>
          {' / '}
          <span style={{ color: '#6FB5FF' }}>{config.title}</span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-poppins)',
            fontWeight: 700,
            fontSize: 24,
            color: '#0d1117',
            marginTop: 8,
            marginBottom: 0,
          }}
        >
          {config.title}
        </h1>
      </div>

      {/* Page Content */}
      <PageContent />
    </div>
  )
}
