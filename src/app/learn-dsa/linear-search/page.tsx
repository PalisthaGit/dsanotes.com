import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnSidebar } from '../sidebar'
import MiniSearchVisualizer from '@/components/visualizers/searching/MiniSearchVisualizer'

export const metadata: Metadata = {
  title: 'Linear Search Explained | Learn DSA',
  description:
    'Learn how Linear Search works step by step with examples, code, and complexity analysis.',
}

function CalloutBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        borderLeft: '4px solid #6FB5FF',
        background: '#f0f7ff',
        borderRadius: '0 10px 10px 0',
        padding: '16px 20px',
        fontFamily: 'var(--font-nunito)',
        fontWeight: 600,
        fontSize: 15,
        color: '#1e3a5f',
        lineHeight: 1.7,
        marginBottom: 24,
      }}
    >
      {children}
    </div>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: 'var(--font-poppins)',
        fontWeight: 700,
        fontSize: 20,
        color: '#0d1117',
        marginTop: 40,
        marginBottom: 12,
      }}
    >
      {children}
    </h2>
  )
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: 'var(--font-poppins)',
        fontWeight: 700,
        fontSize: 16,
        color: '#0d1117',
        marginTop: 28,
        marginBottom: 8,
      }}
    >
      {children}
    </h3>
  )
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: 'var(--font-nunito)',
        fontWeight: 600,
        fontSize: 15,
        color: '#374151',
        lineHeight: 1.8,
        marginBottom: 16,
      }}
    >
      {children}
    </p>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div
      style={{
        background: '#0d1117',
        borderRadius: 12,
        padding: '20px 24px',
        marginBottom: 24,
        overflow: 'auto',
      }}
    >
      <pre
        style={{
          fontFamily: 'var(--font-jetbrains)',
          fontSize: 13,
          color: '#e6edf3',
          lineHeight: 1.7,
          margin: 0,
          whiteSpace: 'pre',
        }}
      >
        {code}
      </pre>
    </div>
  )
}

function ComplexityTable() {
  const rows = [
    { case: 'Best', value: 'O(1)', note: 'Target is the first element' },
    { case: 'Average', value: 'O(n/2) ≈ O(n)', note: 'Target is somewhere in the middle on average' },
    { case: 'Worst', value: 'O(n)', note: 'Target is last or not present — must check every element' },
  ]

  return (
    <div style={{ overflowX: 'auto', marginBottom: 24 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f0f7ff' }}>
            {['Case', 'Time Complexity', 'Notes'].map((h) => (
              <th
                key={h}
                style={{
                  fontFamily: 'var(--font-poppins)',
                  fontWeight: 700,
                  fontSize: 12,
                  color: '#1a6bb5',
                  textAlign: 'left',
                  padding: '10px 16px',
                  borderBottom: '1.5px solid #d4e6ff',
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.case} style={{ background: i % 2 === 0 ? '#ffffff' : '#f8fbff' }}>
              <td
                style={{
                  fontFamily: 'var(--font-poppins)',
                  fontWeight: 700,
                  fontSize: 13,
                  color: '#0d1117',
                  padding: '10px 16px',
                  border: '0.5px solid #e5e7eb',
                }}
              >
                {row.case}
              </td>
              <td
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontWeight: 600,
                  fontSize: 13,
                  color: '#6FB5FF',
                  padding: '10px 16px',
                  border: '0.5px solid #e5e7eb',
                }}
              >
                {row.value}
              </td>
              <td
                style={{
                  fontFamily: 'var(--font-nunito)',
                  fontWeight: 600,
                  fontSize: 13,
                  color: '#6b7280',
                  padding: '10px 16px',
                  border: '0.5px solid #e5e7eb',
                }}
              >
                {row.note}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const ALGORITHM_STEPS = [
  'Start at the first element (index 0).',
  'Compare the current element with the target.',
  'If they match, return the index — search complete.',
  'If not, move to the next element.',
  'Repeat until the end of the list.',
  'If the end is reached without a match, return -1 (not found).',
]

const JAVA_CODE = `class LinearSearchExample {
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i; // Found — return index
            }
        }
        return -1; // Not found
    }

    public static void main(String[] args) {
        int[] arr = {3, 7, 12, 18, 25, 31, 38};
        int target = 25;
        int result = linearSearch(arr, target);

        if (result != -1) {
            System.out.println("Found " + target + " at index " + result);
        } else {
            System.out.println(target + " not found in array");
        }
    }
}`

export default function LinearSearchPage() {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }} className="px-4 sm:px-8 py-10">

        {/* Breadcrumb */}
        <div
          style={{
            fontFamily: 'var(--font-nunito)',
            fontWeight: 600,
            fontSize: 12,
            color: '#9ca3af',
            marginBottom: 24,
          }}
        >
          <Link href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Home</Link>
          {' / '}
          <Link href="/learn-dsa" style={{ color: '#9ca3af', textDecoration: 'none' }}>Learn DSA</Link>
          {' / '}
          <span style={{ color: '#6FB5FF' }}>Linear Search</span>
        </div>

        {/* Two-column layout */}
        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>

          {/* Sidebar */}
          <div className="hidden lg:block" style={{ position: 'sticky', top: 80 }}>
            <LearnSidebar />
          </div>

          {/* Main article */}
          <article style={{ flex: 1, minWidth: 0 }}>

            {/* Category pill */}
            <span
              style={{
                display: 'inline-block',
                background: '#dcfce7',
                color: '#166534',
                fontFamily: 'var(--font-nunito)',
                fontWeight: 700,
                fontSize: 11,
                padding: '4px 12px',
                borderRadius: 20,
                marginBottom: 14,
                letterSpacing: '0.05em',
              }}
            >
              SEARCHING ALGORITHMS
            </span>

            {/* Title */}
            <h1
              style={{
                fontFamily: 'var(--font-poppins)',
                fontWeight: 700,
                fontSize: 34,
                color: '#0d1117',
                marginBottom: 12,
                lineHeight: 1.2,
              }}
            >
              Linear Search
            </h1>

            {/* Meta row */}
            <div
              style={{
                display: 'flex',
                gap: 16,
                alignItems: 'center',
                marginBottom: 28,
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-nunito)',
                  fontWeight: 600,
                  fontSize: 13,
                  color: '#6b7280',
                }}
              >
                🕐 5 min read
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-nunito)',
                  fontWeight: 600,
                  fontSize: 13,
                  color: '#6b7280',
                }}
              >
                📘 Beginner
              </span>
            </div>

            {/* Inbuilt visualizer */}
            <div style={{ marginBottom: 28 }}>
              <MiniSearchVisualizer initialAlgorithm="linear" />
            </div>

            {/* Intro callout */}
            <CalloutBox>
              Linear search is the simplest way to find an element in a list. It checks each element
              one by one from left to right until it finds the target — or reaches the end.
            </CalloutBox>

            {/* ── Section 1 ── */}
            <SectionHeading>How Linear Search Works</SectionHeading>

            <Paragraph>
              Imagine you lost your keys and you&apos;re searching through every drawer in your house
              one at a time. That&apos;s linear search. No skipping, no shortcutting — just
              methodical checking.
            </Paragraph>

            <SubHeading>Searching for 25 in [3, 7, 12, 18, 25, 31]</SubHeading>

            <Paragraph>
              Start at index 0. Is 3 == 25? No. Move to index 1. Is 7 == 25? No. Continue until we
              reach index 4.
            </Paragraph>

            <CalloutBox>
              Checking: 3 → 7 → 12 → 18 → 25 ✓ Found at index 4 after 5 comparisons.
            </CalloutBox>

            <div style={{ marginBottom: 24, marginTop: 8 }}>
              <MiniSearchVisualizer initialAlgorithm="linear" />
            </div>

            <SubHeading>When the element is not found</SubHeading>

            <Paragraph>
              If we search for 99 in the same array, linear search checks every single element before
              concluding it&apos;s not there. This is why it&apos;s O(n) in the worst case.
            </Paragraph>

            <CalloutBox>
              Linear search works on any list — sorted or unsorted. It&apos;s the only option when
              the list isn&apos;t sorted.
            </CalloutBox>

            {/* ── Section 2 ── */}
            <SectionHeading>Linear Search Algorithm (Step by Step)</SectionHeading>

            <ol style={{ margin: '0 0 24px 0', padding: '0 0 0 24px' }}>
              {ALGORITHM_STEPS.map((step, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: 'var(--font-nunito)',
                    fontWeight: 600,
                    fontSize: 15,
                    color: '#374151',
                    lineHeight: 1.8,
                    marginBottom: 6,
                  }}
                >
                  {step}
                </li>
              ))}
            </ol>

            {/* ── Section 3 ── */}
            <SectionHeading>Linear Search Code</SectionHeading>

            <CodeBlock code={JAVA_CODE} />

            {/* ── Section 4 ── */}
            <SectionHeading>Complexity of Linear Search</SectionHeading>

            <ComplexityTable />

            <SubHeading>Space Complexity</SubHeading>

            <Paragraph>
              <strong>O(1) — constant space.</strong> Linear search only uses a loop counter. No
              extra memory is needed regardless of array size.
            </Paragraph>

            {/* Closing card */}
            <div
              style={{
                background: '#f0f7ff',
                border: '0.5px solid #d4e6ff',
                borderRadius: 14,
                padding: '24px 28px',
                marginTop: 40,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-poppins)',
                  fontWeight: 700,
                  fontSize: 15,
                  color: '#0d1117',
                  marginBottom: 10,
                }}
              >
                Well done!
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-nunito)',
                  fontWeight: 600,
                  fontSize: 15,
                  color: '#374151',
                  lineHeight: 1.8,
                  marginBottom: 16,
                }}
              >
                Linear search is the foundation of all searching. It&apos;s simple, reliable, and
                works on any list. When your data is sorted, you can do much better — Binary Search
                cuts the work in half every step, reaching O(log n).
              </p>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link
                  href="/learn-dsa/binary-search"
                  style={{
                    background: '#6FB5FF',
                    color: '#fff',
                    borderRadius: 8,
                    padding: '9px 18px',
                    fontFamily: 'var(--font-nunito)',
                    fontWeight: 700,
                    fontSize: 13,
                    textDecoration: 'none',
                  }}
                >
                  Next: Binary Search →
                </Link>
                <Link
                  href="/visualizer/searching"
                  style={{
                    background: '#dbeeff',
                    color: '#1a6bb5',
                    borderRadius: 8,
                    padding: '9px 18px',
                    fontFamily: 'var(--font-nunito)',
                    fontWeight: 700,
                    fontSize: 13,
                    textDecoration: 'none',
                  }}
                >
                  Practice in Visualizer
                </Link>
              </div>
            </div>

          </article>
        </div>
      </div>
    </div>
  )
}
