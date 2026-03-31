import Link from 'next/link'

export default function LearnPage() {
  return (
    <div style={{ background: '#ffffff', minHeight: '60vh' }}>
      <div
        style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}
        className="px-4 sm:px-8 lg:px-24 py-20"
      >
        <div
          style={{
            fontFamily: 'var(--font-nunito)',
            fontWeight: 600,
            fontSize: 12,
            color: '#9ca3af',
            marginBottom: 16,
          }}
        >
          <Link href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>
            Home
          </Link>
          {' / '}
          <span style={{ color: '#6FB5FF' }}>Learn DSA</span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-poppins)',
            fontWeight: 700,
            fontSize: 32,
            color: '#0d1117',
            marginBottom: 12,
          }}
        >
          Learn DSA
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-nunito)',
            fontWeight: 600,
            fontSize: 14,
            color: '#6b7280',
            marginBottom: 32,
          }}
        >
          Coming soon — structured DSA learning content is in progress.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/visualizer"
            style={{
              background: '#6FB5FF',
              color: '#fff',
              borderRadius: 10,
              padding: '12px 24px',
              fontFamily: 'var(--font-nunito)',
              fontWeight: 700,
              fontSize: 14,
              textDecoration: 'none',
            }}
          >
            Explore Visualizers →
          </Link>
          <Link
            href="/problems"
            style={{
              background: '#dbeeff',
              color: '#1a6bb5',
              borderRadius: 10,
              padding: '12px 24px',
              fontFamily: 'var(--font-nunito)',
              fontWeight: 700,
              fontSize: 14,
              textDecoration: 'none',
            }}
          >
            Practice Problems
          </Link>
        </div>
      </div>
    </div>
  )
}
