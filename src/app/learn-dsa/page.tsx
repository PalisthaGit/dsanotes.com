import type { Metadata } from 'next'
import Link from 'next/link'
import { TopicRow } from './topic-row'

export const metadata: Metadata = {
  title: 'Learn DSA | Data Structures and Algorithms Explained',
  description:
    'Learn data structures and algorithms with simple explanations and examples. Includes sorting, searching, and more.',
}

interface Topic {
  id: string
  title: string
  description: string
  href: string
  readMin: number
}

interface Section {
  id: string
  label: string
  pillBg: string
  pillColor: string
  topics: Topic[]
}

const SECTIONS: Section[] = [
  {
    id: 'sorting',
    label: 'Sorting Algorithms',
    pillBg: '#dbeeff',
    pillColor: '#1a6bb5',
    topics: [
      {
        id: 'bubble-sort',
        title: 'Bubble Sort',
        description:
          'The simplest sorting algorithm — repeatedly swaps adjacent elements that are out of order.',
        href: '/learn-dsa/bubble-sort',
        readMin: 5,
      },
      {
        id: 'insertion-sort',
        title: 'Insertion Sort',
        description:
          'Builds the sorted array one element at a time by inserting each into its correct position.',
        href: '/learn-dsa/insertion-sort',
        readMin: 5,
      },
      {
        id: 'merge-sort',
        title: 'Merge Sort',
        description:
          'A divide-and-conquer algorithm that splits, sorts, and merges halves recursively.',
        href: '/learn-dsa/merge-sort',
        readMin: 7,
      },
      {
        id: 'quick-sort',
        title: 'Quick Sort',
        description:
          'Picks a pivot and partitions the array so elements smaller/larger end up on each side.',
        href: '/learn-dsa/quick-sort',
        readMin: 8,
      },
    ],
  },
  {
    id: 'searching',
    label: 'Searching Algorithms',
    pillBg: '#dcfce7',
    pillColor: '#166534',
    topics: [
      {
        id: 'linear-search',
        title: 'Linear Search',
        description:
          'Scans every element one by one until the target is found — works on any list.',
        href: '/learn-dsa/linear-search',
        readMin: 4,
      },
      {
        id: 'binary-search',
        title: 'Binary Search',
        description:
          'Halves the search range each step — requires a sorted array but runs in O(log n).',
        href: '/learn-dsa/binary-search',
        readMin: 6,
      },
    ],
  },
]

export default function LearnDSAPage() {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }} className="px-4 sm:px-8 py-10">
        {/* Breadcrumb */}
        <div
          style={{
            fontFamily: 'var(--font-nunito)',
            fontWeight: 600,
            fontSize: 12,
            color: '#9ca3af',
            marginBottom: 20,
          }}
        >
          <Link href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>
            Home
          </Link>
          {' / '}
          <span style={{ color: '#6FB5FF' }}>Learn DSA</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <span
            style={{
              display: 'inline-block',
              background: '#dbeeff',
              color: '#1a6bb5',
              fontFamily: 'var(--font-nunito)',
              fontWeight: 700,
              fontSize: 12,
              padding: '4px 12px',
              borderRadius: 20,
              marginBottom: 14,
            }}
          >
            DSA
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-poppins)',
              fontWeight: 700,
              fontSize: 32,
              color: '#0d1117',
              marginBottom: 12,
              lineHeight: 1.25,
            }}
          >
            Learn Data Structures and Algorithms
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-nunito)',
              fontWeight: 600,
              fontSize: 15,
              color: '#6b7280',
              lineHeight: 1.7,
              maxWidth: 660,
            }}
          >
            Data structures and algorithms are the building blocks of efficient software. Mastering
            them helps you write faster code, pass technical interviews, and solve complex problems
            with confidence.
          </p>
        </div>

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 44 }}>
          {SECTIONS.map((section) => (
            <section key={section.id}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span
                  style={{
                    background: section.pillBg,
                    color: section.pillColor,
                    fontFamily: 'var(--font-nunito)',
                    fontWeight: 700,
                    fontSize: 11,
                    padding: '3px 10px',
                    borderRadius: 20,
                  }}
                >
                  {section.label}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {section.topics.map((topic, i) => (
                  <TopicRow key={topic.id} topic={topic} index={i} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
