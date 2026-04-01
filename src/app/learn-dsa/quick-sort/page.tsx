import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnSidebar } from '../sidebar'
import MiniSortingVisualizer from '@/components/visualizers/sorting/MiniSortingVisualizer'

export const metadata: Metadata = {
  title: 'Quick Sort Explained | Learn DSA',
  description:
    'Learn how Quick Sort works step by step with examples, code, and complexity analysis.',
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
    { case: 'Best', value: 'O(n log n)', note: 'Pivot always splits array evenly' },
    { case: 'Average', value: 'O(n log n)', note: 'Random pivots usually produce balanced splits' },
    { case: 'Worst', value: 'O(n²)', note: 'Pivot is always the smallest or largest — sorted/reverse-sorted input' },
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
  'If the array has one or zero elements, return.',
  'Pick a pivot (last element is common).',
  'Partition: move elements smaller than pivot to the left, larger to the right.',
  'Place the pivot in its final sorted position.',
  'Recursively sort the left sub-array.',
  'Recursively sort the right sub-array.',
]

const JAVA_CODE = `class QuickSortExample {
    public static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;

        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
            }
        }
        // Place pivot in its correct position
        int temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
        return i + 1;
    }

    public static void quickSort(int[] arr, int low, int high) {
        if (low >= high) return;
        int pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }

    public static void main(String[] args) {
        int[] arr = {38, 27, 43, 12, 52, 19};
        quickSort(arr, 0, arr.length - 1);
        System.out.println("Sorted array:");
        for (int num : arr) System.out.print(num + " ");
    }
}`

export default function QuickSortPage() {
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
          <span style={{ color: '#6FB5FF' }}>Quick Sort</span>
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
              Quick Sort
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
                🕐 9 min read
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-nunito)',
                  fontWeight: 600,
                  fontSize: 13,
                  color: '#6b7280',
                }}
              >
                📗 Intermediate
              </span>
            </div>

            {/* Inbuilt visualizer */}
            <div style={{ marginBottom: 28 }}>
              <MiniSortingVisualizer initialAlgorithm="quick" />
            </div>

            {/* Intro callout */}
            <CalloutBox>
              Quick sort picks a &apos;pivot&apos; element and rearranges the array so all smaller
              elements come before it and all larger elements come after. Then it recursively does the
              same for each side.
            </CalloutBox>

            {/* ── Section 1 ── */}
            <SectionHeading>How Quick Sort Works</SectionHeading>

            <SubHeading>Choosing a pivot</SubHeading>

            <Paragraph>
              We pick one element as the pivot (often the last element). We then scan the rest of the
              array and put everything smaller than the pivot on its left and everything larger on its
              right.
            </Paragraph>

            <Paragraph>
              <strong>Starting array:</strong> [38, 27, 43, 12, 52, 19] — Pivot = 19 (last element)
            </Paragraph>

            <CalloutBox>
              Scanning: 38 &gt; 19 (right), 27 &gt; 19 (right), 43 &gt; 19 (right), 12 &lt; 19
              (left) → after partition: [12, 19, 43, 27, 52, 38]
            </CalloutBox>

            <SubHeading>After partitioning</SubHeading>

            <Paragraph>
              19 is now in its final position. Everything to its left is smaller, everything to its
              right is larger. Now repeat the process on each side.
            </Paragraph>

            <div style={{ marginBottom: 24, marginTop: 8 }}>
              <MiniSortingVisualizer initialAlgorithm="quick" maxSortedCount={2} />
            </div>

            <SubHeading>Recursing on each side</SubHeading>

            <Paragraph>
              Apply the same pivot-and-partition logic to [12] (already sorted) and [43, 27, 52,
              38]. Each recursive call places one more element in its final position.
            </Paragraph>

            <div style={{ marginBottom: 24, marginTop: 8 }}>
              <MiniSortingVisualizer initialAlgorithm="quick" startFromSortedCount={2} />
            </div>

            <CalloutBox>
              Quick sort is fast in practice because it sorts in-place without needing extra arrays
              — unlike merge sort.
            </CalloutBox>

            {/* ── Section 2 ── */}
            <SectionHeading>Quick Sort Algorithm (Step by Step)</SectionHeading>

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
            <SectionHeading>Quick Sort Code</SectionHeading>

            <CodeBlock code={JAVA_CODE} />

            {/* ── Section 4 ── */}
            <SectionHeading>Complexity of Quick Sort</SectionHeading>

            <ComplexityTable />

            <SubHeading>Space Complexity</SubHeading>

            <Paragraph>
              <strong>O(log n) average — the recursion stack depth.</strong> No extra array is
              needed, but the call stack grows with each recursive level. In the worst case (already
              sorted input with a bad pivot), the stack can reach O(n).
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
                Excellent!
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
                You&apos;ve now mastered the three most important comparison-based sorting algorithms.
                Bubble Sort, Insertion Sort, Merge Sort, and Quick Sort form the foundation of how
                computers organize data efficiently. Experiment in the visualizer to see them in
                action on different arrays.
              </p>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link
                  href="/learn-dsa"
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
                  Back to Sorting →
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
