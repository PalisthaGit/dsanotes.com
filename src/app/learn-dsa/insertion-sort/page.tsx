import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnSidebar } from '../sidebar'
import MiniSortingVisualizer from '@/components/visualizers/sorting/MiniSortingVisualizer'

export const metadata: Metadata = {
  title: 'Insertion Sort Explained | Learn DSA',
  description:
    'Learn how Insertion Sort works step by step with examples, code, and complexity analysis.',
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
    { case: 'Best', value: 'O(n)', note: 'Already sorted — inner loop never executes' },
    { case: 'Average', value: 'O(n²)', note: 'Random order — many comparisons and shifts' },
    { case: 'Worst', value: 'O(n²)', note: 'Reverse sorted — maximum shifts every pass' },
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
  'Start with the second element (index 1).',
  'Compare it with elements to its left.',
  'Shift larger elements one position right.',
  'Insert the current element into the correct gap.',
  'Move to the next element.',
  'Repeat until the whole array is sorted.',
]

const JAVA_CODE = `class InsertionSortExample {
    public static void main(String[] args) {
        int[] arr = {38, 27, 43, 12, 52, 19};

        for (int i = 1; i < arr.length; i++) {
            int key = arr[i];
            int j = i - 1;

            // Shift elements greater than key one position to the right
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }

        System.out.println("Sorted array:");
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}`

export default function InsertionSortPage() {
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
          <span style={{ color: '#6FB5FF' }}>Insertion Sort</span>
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
                background: '#dbeeff',
                color: '#1a6bb5',
                fontFamily: 'var(--font-nunito)',
                fontWeight: 700,
                fontSize: 11,
                padding: '4px 12px',
                borderRadius: 20,
                marginBottom: 14,
                letterSpacing: '0.05em',
              }}
            >
              SORTING ALGORITHMS
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
              Insertion Sort
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
                🕐 7 min read
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
              <MiniSortingVisualizer initialAlgorithm="insertion" />
            </div>

            {/* Intro callout */}
            <CalloutBox>
              Insertion sort builds the sorted list one element at a time. It picks each element and
              inserts it into the correct position within the already-sorted portion — like sorting a
              hand of playing cards.
            </CalloutBox>

            {/* ── Section 1 ── */}
            <SectionHeading>How Insertion Sort Works</SectionHeading>

            <Paragraph>
              The array is split into a sorted part (left) and unsorted part (right). We pick the
              first unsorted element and slide it left until it&apos;s in the right spot.
            </Paragraph>

            <Paragraph>
              <strong>Starting array:</strong> [38, 27, 43, 12, 52, 19]
            </Paragraph>

            <SubHeading>Inserting 27</SubHeading>

            <Paragraph>
              38 is already sorted. Now we look at 27. Since 27 &lt; 38, we shift 38 right and
              place 27 before it.
            </Paragraph>

            <CalloutBox>Updated array: [27, 38, 43, 12, 52, 19]</CalloutBox>

            <div style={{ marginBottom: 24, marginTop: 8 }}>
              <MiniSortingVisualizer initialAlgorithm="insertion" maxSortedCount={2} />
            </div>

            <SubHeading>Inserting 43</SubHeading>

            <Paragraph>
              43 &gt; 38, so it stays in place. No shifting needed.
            </Paragraph>

            <div style={{ marginBottom: 24, marginTop: 8 }}>
              <MiniSortingVisualizer initialAlgorithm="insertion" maxSortedCount={3} />
            </div>

            <SubHeading>Inserting the rest</SubHeading>

            <Paragraph>
              We continue this process for 12, 52, and 19, each time finding the right spot.
            </Paragraph>

            <div style={{ marginBottom: 24, marginTop: 8 }}>
              <MiniSortingVisualizer initialAlgorithm="insertion" startFromSortedCount={3} />
            </div>

            <CalloutBox>
              Insertion sort is efficient for small or nearly-sorted lists. Each pass places exactly
              one element into its final position.
            </CalloutBox>

            {/* ── Section 2 ── */}
            <SectionHeading>Insertion Sort Algorithm (Step by Step)</SectionHeading>

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
            <SectionHeading>Insertion Sort Code</SectionHeading>

            <CodeBlock code={JAVA_CODE} />

            {/* ── Section 4 ── */}
            <SectionHeading>Complexity of Insertion Sort</SectionHeading>

            <ComplexityTable />

            <SubHeading>Space Complexity</SubHeading>

            <Paragraph>
              <strong>O(1) — constant space.</strong> Insertion sort sorts in-place using only a
              temporary <code>key</code> variable. No extra arrays are needed regardless of input
              size.
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
                You&apos;ve got the basics!
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
                Insertion sort is simple, intuitive, and great for small or nearly-sorted data. Now
                that you&apos;ve mastered it, you&apos;re ready to explore more powerful divide-and-conquer
                algorithms like Merge Sort and Quick Sort.
              </p>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link
                  href="/learn-dsa/merge-sort"
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
                  Next: Merge Sort →
                </Link>
                <Link
                  href="/visualizer/sorting"
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
