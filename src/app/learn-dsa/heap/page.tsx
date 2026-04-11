import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnSidebar } from '../sidebar'
import MiniDSVisualizer from '@/components/visualizers/data-structures/MiniDSVisualizer'

export const metadata: Metadata = {
  title: 'Heap Explained | Learn DSA',
  description:
    'Learn how a min-heap works with insert, bubble-up, extract-min, bubble-down, and Java PriorityQueue examples.',
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

function ComplexityTable({ rows }: { rows: { case: string; value: string; note: string }[] }) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: 24 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f0f7ff' }}>
            {['Operation', 'Time Complexity', 'Notes'].map((h) => (
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
  'Insert: place the new element at the end of the array (the next available leaf position).',
  'Bubble Up: compare the new element with its parent; if smaller, swap them and repeat upward.',
  'Extract Min: the root is always the minimum — swap it with the last element, then remove the last.',
  'Bubble Down: compare the new root with its children; swap with the smaller child and repeat downward.',
  'The heap invariant (parent ≤ children) is restored after every insert and extract operation.',
]

const JAVA_CODE = `import java.util.PriorityQueue;

public class HeapExample {
    public static void main(String[] args) {
        // Java's PriorityQueue is a min-heap by default
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();

        // Insert elements — O(log n) each
        minHeap.offer(40);
        minHeap.offer(10);
        minHeap.offer(30);
        minHeap.offer(5);
        minHeap.offer(20);

        // peek: view the minimum without removing — O(1)
        System.out.println("Min: " + minHeap.peek()); // 5

        // poll: remove and return the minimum — O(log n)
        System.out.println(minHeap.poll()); // 5
        System.out.println(minHeap.poll()); // 10
        System.out.println(minHeap.poll()); // 20

        // Heap sort: keep polling to get elements in ascending order
        PriorityQueue<Integer> heap = new PriorityQueue<>();
        int[] data = {15, 3, 9, 1, 7};
        for (int n : data) heap.offer(n);
        System.out.print("Sorted: ");
        while (!heap.isEmpty()) System.out.print(heap.poll() + " ");
        // Output: Sorted: 1 3 7 9 15
    }
}`

export default function HeapPage() {
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
          <span style={{ color: '#6FB5FF' }}>Heap</span>
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
                background: '#fff7ed',
                color: '#c2410c',
                fontFamily: 'var(--font-nunito)',
                fontWeight: 700,
                fontSize: 11,
                padding: '4px 12px',
                borderRadius: 20,
                marginBottom: 14,
                letterSpacing: '0.05em',
              }}
            >
              DATA STRUCTURES
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
              Heap
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
              <span style={{ fontFamily: 'var(--font-nunito)', fontWeight: 600, fontSize: 13, color: '#6b7280' }}>
                🕐 8 min read
              </span>
              <span style={{ fontFamily: 'var(--font-nunito)', fontWeight: 600, fontSize: 13, color: '#6b7280' }}>
                📙 Intermediate
              </span>
            </div>

            {/* Mini visualizer */}
            <div style={{ marginBottom: 28 }}>
              <MiniDSVisualizer type="heap" />
            </div>

            {/* Intro callout */}
            <CalloutBox>
              A <strong>min-heap</strong> is a complete binary tree where every parent is less than
              or equal to its children. This single rule guarantees that the{' '}
              <strong>minimum element is always at the root</strong>, accessible in O(1) time. Heaps
              power priority queues, scheduling systems, and algorithms like Dijkstra&apos;s.
            </CalloutBox>

            {/* Section 1 */}
            <SectionHeading>What is a Heap?</SectionHeading>

            <Paragraph>
              A heap is typically stored as an array — no explicit left/right pointers needed. For a
              node at index <strong>i</strong>, its left child is at <strong>2i + 1</strong>, its
              right child at <strong>2i + 2</strong>, and its parent at{' '}
              <strong>floor((i − 1) / 2)</strong>.
            </Paragraph>

            <Paragraph>
              Because a heap is a <strong>complete binary tree</strong> (all levels are full except
              possibly the last, which is filled left to right), its height is always O(log n). This
              bounded height is what gives insert and extract their O(log n) performance.
            </Paragraph>

            <CalloutBox>
              Array: [1, 3, 5, 7, 9, 8] represents the tree where 1 is the root, 3 and 5 are its children, and so on.
            </CalloutBox>

            {/* Section 2 */}
            <SectionHeading>Insert and Bubble Up</SectionHeading>

            <Paragraph>
              To insert a new element, add it to the end of the array (the next leaf position). This
              might violate the heap property if the new element is smaller than its parent.
            </Paragraph>

            <Paragraph>
              Fix it by <strong>bubbling up</strong>: compare the new element with its parent and
              swap if smaller. Repeat this process moving up toward the root until the heap property
              is restored or the root is reached. Each level takes constant work, so this is O(log n).
            </Paragraph>

            <SubHeading>Example: Insert 2 into [1, 3, 5, 7, 9, 8]</SubHeading>

            <Paragraph>
              2 is appended at the end: [1, 3, 5, 7, 9, 8, 2]. Its parent at index 2 is 5, which is
              larger, so swap: [1, 3, 2, 7, 9, 8, 5]. Now 2&apos;s parent at index 0 is 1, which is
              smaller — heap property is satisfied.
            </Paragraph>

            {/* Section 3 */}
            <SectionHeading>Extract Min and Bubble Down</SectionHeading>

            <Paragraph>
              To extract the minimum, take the root (index 0), move the last element to the root
              position, and remove the last slot. The heap property may now be violated at the root.
            </Paragraph>

            <Paragraph>
              Fix it by <strong>bubbling down</strong>: compare the root with its two children and
              swap with the <strong>smaller</strong> child. Repeat downward until the element is in
              the correct position or there are no more children. This is also O(log n).
            </Paragraph>

            {/* Algorithm steps */}
            <SectionHeading>Heap Algorithm Steps</SectionHeading>

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

            {/* Section 4 */}
            <SectionHeading>Heap Code</SectionHeading>

            <CodeBlock code={JAVA_CODE} />

            {/* Section 5 */}
            <SectionHeading>Complexity of Heap</SectionHeading>

            <ComplexityTable
              rows={[
                { case: 'Insert', value: 'O(log n)', note: 'Bubble up traverses at most the tree height' },
                { case: 'Extract Min', value: 'O(log n)', note: 'Bubble down traverses at most the tree height' },
                { case: 'Peek (Min)', value: 'O(1)', note: 'Root is always the minimum — direct access' },
                { case: 'Build Heap', value: 'O(n)', note: 'Heapify all nodes bottom-up is linear' },
                { case: 'Space', value: 'O(n)', note: 'One array slot per element' },
              ]}
            />

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
                You now understand how heaps maintain the min-element at the root through bubble-up
                and bubble-down, and how Java&apos;s PriorityQueue gives you a production-ready
                min-heap out of the box. You&apos;ve covered all six core data structures — head
                back to the Learn DSA overview to explore algorithms that use them!
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
                  Back to Learn DSA →
                </Link>
              </div>
            </div>

          </article>
        </div>
      </div>
    </div>
  )
}
