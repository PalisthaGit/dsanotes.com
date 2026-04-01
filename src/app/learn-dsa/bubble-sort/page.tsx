import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnSidebar } from '../sidebar'
import MiniSortingVisualizer from '@/components/visualizers/sorting/MiniSortingVisualizer'

export const metadata: Metadata = {
  title: 'Bubble Sort Explained | Learn DSA',
  description:
    'Learn how Bubble Sort works step by step with examples, code, and complexity analysis.',
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
    { case: 'Best', value: 'O(n)', note: 'Already sorted — detects early with swap flag' },
    { case: 'Average', value: 'O(n²)', note: 'Random order — many comparisons needed' },
    { case: 'Worst', value: 'O(n²)', note: 'Reverse sorted — maximum swaps required' },
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
  'Start with the first number in the list.',
  'Compare it with the number next to it.',
  'If the first number is bigger, swap them.',
  'Move to the next pair.',
  'Keep doing this until you reach the end.',
  'Now the largest number is at the end.',
  'Repeat from the beginning, but stop one step earlier.',
  'Keep repeating until the list is sorted.',
]

const JAVA_CODE = `class BubbleSortExample {
    public static void main(String[] args) {
        int[] arr = {222, 40, 66, 99, 12, 5};

        // Bubble sort starts here
        for (int i = 0; i < arr.length - 1; i++) {
            // Go from the beginning up to the part that's not sorted yet
            for (int j = 0; j < arr.length - 1 - i; j++) {
                // Compare current number with the next one
                if (arr[j] > arr[j + 1]) {
                    // Swap if the left number is bigger than the right one
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }

        // Print the sorted array
        System.out.println("Sorted array:");
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}`

export default function BubbleSortPage() {
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
          <span style={{ color: '#6FB5FF' }}>Bubble Sort</span>
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
              Bubble Sort
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
                🕐 8 min read
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

            {/* Full visualizer link */}
            <Link
              href="/visualizer/sorting/bubble-sort"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#6FB5FF',
                color: '#fff',
                borderRadius: 10,
                padding: '10px 20px',
                fontFamily: 'var(--font-nunito)',
                fontWeight: 700,
                fontSize: 13,
                textDecoration: 'none',
                marginBottom: 28,
              }}
            >
              ▶ Open Full Visualizer →
            </Link>

            {/* Intro callout */}
            <CalloutBox>
              Bubble sort is one of the simplest ways to sort a list. It works by looking at two
              adjacent (next to each other) numbers at a time and swapping them if they&apos;re in
              the wrong order. We repeat this process until everything is in the correct position.
            </CalloutBox>

            <Paragraph>
              Let&apos;s take a look at how this works with an example. Click the play button to
              watch the sorting step by step.
            </Paragraph>

            {/* ── Section 1 ── */}
            <SectionHeading>Bubble Sort Step by Step</SectionHeading>

            <Paragraph>Every sorting method arranges data in the correct order.</Paragraph>

            <Paragraph>
              Bubble sort does this by slowly moving the largest number toward the end of the list,
              one round at a time. This gradual movement is often compared to a bubble rising, which
              is where the name &quot;bubble sort&quot; comes from.
            </Paragraph>

            <Paragraph>
              We begin by sorting the last element first, then the second-last, and so on. This
              continues until only one element remains, which will already be in the correct spot.
            </Paragraph>

            {/* Sub: last element */}
            <SubHeading>Sorting the last element</SubHeading>

            <Paragraph>
              <strong>Starting array:</strong> [222, 40, 66, 99, 12, 5]
            </Paragraph>

            <Paragraph>
              We want to make sure the largest number ends up in the last position.
            </Paragraph>

            <Paragraph>
              First, compare 222 and 40. Since 222 is greater, we swap them.
            </Paragraph>

            <CalloutBox>Updated array: [40, 222, 66, 99, 12, 5]</CalloutBox>

            <Paragraph>
              Next, compare the second and third elements: 222 and 66. Again, 222 is greater, so we
              swap them.
            </Paragraph>

            <CalloutBox>Updated array: [40, 66, 222, 99, 12, 5]</CalloutBox>

            <Paragraph>
              We continue comparing each pair of adjacent elements and swapping when needed until we
              reach the end of the list.
            </Paragraph>

            <div style={{ marginBottom: 24, marginTop: 8 }}>
              <MiniSortingVisualizer initialAlgorithm="bubble" maxSortedCount={1} />
            </div>

            {/* Sub: second-last */}
            <SubHeading>Sorting the second-last element</SubHeading>

            <Paragraph>
              Now that the largest element is in place, we don&apos;t need to touch it again.
            </Paragraph>

            <Paragraph>
              Next, we&apos;ll move the second-largest number into the second-last position using the
              same steps. We compare and swap adjacent pairs, but only up to the second-last index.
            </Paragraph>

            <div style={{ marginBottom: 24, marginTop: 8 }}>
              <MiniSortingVisualizer initialAlgorithm="bubble" maxSortedCount={2} />
            </div>

            {/* Sub: third-last */}
            <SubHeading>Sorting the third-last element</SubHeading>

            <Paragraph>
              We repeat the same process again, this time stopping one step earlier — up to the
              third-last index.
            </Paragraph>

            <div style={{ marginBottom: 24, marginTop: 8 }}>
              <MiniSortingVisualizer initialAlgorithm="bubble" maxSortedCount={3} />
            </div>

            {/* Sub: the rest */}
            <SubHeading>Sorting the Rest of the Elements</SubHeading>

            <Paragraph>
              We continue this pattern until the second element is in the correct position. At that
              point, the first element is also automatically in place because everything else around
              it is already sorted.
            </Paragraph>

            <div style={{ marginBottom: 24, marginTop: 8 }}>
              <MiniSortingVisualizer initialAlgorithm="bubble" startFromSortedCount={3} />
            </div>

            <CalloutBox>
              This is bubble sort. One pair at a time. One round at a time. Each round pushes the
              next biggest number to where it belongs.
            </CalloutBox>

            {/* ── Section 2 ── */}
            <SectionHeading>Bubble Sort Algorithm (Step by Step)</SectionHeading>

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
            <SectionHeading>Bubble Sort Code</SectionHeading>

            <CodeBlock code={JAVA_CODE} />

            {/* ── Section 4 ── */}
            <SectionHeading>Complexity of Bubble Sort</SectionHeading>

            <SubHeading>Time Complexity</SubHeading>

            <Paragraph>
              <strong>Worst Case:</strong> When the list is in reverse order, Bubble Sort has to go
              through the entire list and swap almost everything. The number of operations is roughly
              n + (n−1) + (n−2) + … + 1, which gives us <strong>O(n²)</strong>.
            </Paragraph>

            <Paragraph>
              <strong>Best Case:</strong> When the list is already sorted, a version of Bubble Sort
              with a <em>swapped</em> flag can detect this and stop after one pass —{' '}
              <strong>O(n)</strong>.
            </Paragraph>

            <Paragraph>
              <strong>Average Case:</strong> For randomly ordered lists, Bubble Sort still does many
              comparisons and swaps, so on average it is also <strong>O(n²)</strong>.
            </Paragraph>

            <ComplexityTable />

            <SubHeading>Space Complexity</SubHeading>

            <Paragraph>
              <strong>O(1) — Constant space.</strong> Bubble Sort sorts the list in-place. It
              doesn&apos;t use any extra arrays or data structures — only a few loop variables and a
              temporary swap variable. No matter how large the input, the extra memory used stays the
              same.
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
                Bubble Sort is easy to understand and a great starting point for learning sorting
                algorithms. It may not be the fastest, but it&apos;s one of the clearest examples of
                how sorting works under the hood. Once you&apos;re comfortable with this, you&apos;ll
                be ready to explore faster sorts like Insertion Sort, Merge Sort, and Quick Sort.
              </p>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link
                  href="/learn-dsa/insertion-sort"
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
                  Next: Insertion Sort →
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
