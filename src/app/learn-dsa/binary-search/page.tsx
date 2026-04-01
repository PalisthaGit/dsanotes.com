import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnSidebar } from '../sidebar'
import MiniSearchVisualizer from '@/components/visualizers/searching/MiniSearchVisualizer'

export const metadata: Metadata = {
  title: 'Binary Search Explained | Learn DSA',
  description:
    'Learn how Binary Search works step by step with examples, code, and complexity analysis.',
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
    { case: 'Best', value: 'O(1)', note: 'Target is exactly at the midpoint on first check' },
    { case: 'Average', value: 'O(log n)', note: 'Halves the search space each step' },
    { case: 'Worst', value: 'O(log n)', note: 'Target is at the end of repeated halving — still logarithmic' },
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
  'Ensure the array is sorted.',
  'Set low = 0, high = last index.',
  'Calculate mid = (low + high) / 2.',
  'If arr[mid] == target, return mid.',
  'If arr[mid] < target, set low = mid + 1 (search right half).',
  'If arr[mid] > target, set high = mid - 1 (search left half).',
  'Repeat until low > high (not found) or target found.',
]

const JAVA_CODE = `class BinarySearchExample {
    public static int binarySearch(int[] arr, int target) {
        int low = 0, high = arr.length - 1;

        while (low <= high) {
            int mid = (low + high) / 2;

            if (arr[mid] == target)  return mid;        // Found
            else if (arr[mid] < target) low  = mid + 1; // Search right
            else                        high = mid - 1; // Search left
        }
        return -1; // Not found
    }

    public static void main(String[] args) {
        int[] arr = {3, 7, 12, 18, 25, 31, 38, 45};
        int target = 25;
        int result = binarySearch(arr, target);

        if (result != -1) {
            System.out.println("Found " + target + " at index " + result);
        } else {
            System.out.println(target + " is not in the array");
        }
    }
}`

export default function BinarySearchPage() {
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
          <span style={{ color: '#6FB5FF' }}>Binary Search</span>
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
              Binary Search
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
                📗 Intermediate
              </span>
            </div>

            {/* Inbuilt visualizer */}
            <div style={{ marginBottom: 28 }}>
              <MiniSearchVisualizer initialAlgorithm="binary" />
            </div>

            {/* Intro callout */}
            <CalloutBox>
              Binary search is dramatically faster than linear search — but it only works on a sorted
              array. Each step cuts the search space in half, making it O(log n).
            </CalloutBox>

            {/* ── Section 1 ── */}
            <SectionHeading>How Binary Search Works</SectionHeading>

            <Paragraph>
              Think of looking up a word in a dictionary. You don&apos;t start at page 1 — you open
              to the middle, check if the word is before or after, then repeat on the correct half.
            </Paragraph>

            <SubHeading>Searching for 25 in [3, 7, 12, 18, 25, 31, 38, 45]</SubHeading>

            <Paragraph>
              Set low=0, high=7. Mid = (0+7)/2 = 3. arr[3] = 18. Since 25 &gt; 18, the target must
              be in the right half. Set low = mid+1 = 4.
            </Paragraph>

            <CalloutBox>
              Round 1: mid=3, value=18. 25 &gt; 18 → search right half [25, 31, 38, 45]
            </CalloutBox>

            <SubHeading>Narrowing down</SubHeading>

            <Paragraph>
              Now low=4, high=7. Mid = (4+7)/2 = 5. arr[5] = 31. Since 25 &lt; 31, search left. Set
              high = mid-1 = 4.
            </Paragraph>

            <CalloutBox>
              Round 2: mid=5, value=31. 25 &lt; 31 → search left half [25]
            </CalloutBox>

            <SubHeading>Found!</SubHeading>

            <Paragraph>
              low=4, high=4, mid=4. arr[4]=25. Match! Found in just 3 steps instead of 5 (linear
              search would take 5).
            </Paragraph>

            <div style={{ marginBottom: 24, marginTop: 8 }}>
              <MiniSearchVisualizer initialAlgorithm="binary" />
            </div>

            <CalloutBox>
              Binary search cuts the problem in half every round. An array of 1,000,000 elements
              takes at most 20 comparisons. That&apos;s the power of O(log n).
            </CalloutBox>

            {/* ── Section 2 ── */}
            <SectionHeading>Binary Search Algorithm (Step by Step)</SectionHeading>

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
            <SectionHeading>Binary Search Code</SectionHeading>

            <CodeBlock code={JAVA_CODE} />

            {/* ── Section 4 ── */}
            <SectionHeading>Complexity of Binary Search</SectionHeading>

            <ComplexityTable />

            <SubHeading>Space Complexity</SubHeading>

            <Paragraph>
              <strong>O(1) — iterative binary search uses only a few variables</strong> (low, high,
              mid). No extra memory proportional to the array size is needed.
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
                You&apos;ve mastered searching!
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
                Linear search and binary search are the two foundational searching algorithms. Together
                they cover the full spectrum — from simple unsorted lookups to blazing-fast searches on
                sorted data. These are the building blocks for more advanced search structures like
                binary search trees and hash maps.
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
                  Back to All Topics →
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
