import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnSidebar } from '../sidebar'
import MiniDSVisualizer from '@/components/visualizers/data-structures/MiniDSVisualizer'

export const metadata: Metadata = {
  title: 'Queue Explained | Learn DSA',
  description:
    'Learn how a Queue works with FIFO ordering, enqueue/dequeue/peek operations, real-world uses, and Java code examples.',
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
  'Enqueue: add a new element to the back of the queue — it waits its turn.',
  'Dequeue: remove and return the element at the front — the oldest item leaves first.',
  'Peek: read the front element without removing it — see who is next without letting them go.',
  'isEmpty: always check before dequeuing to avoid removing from an empty queue.',
  'The first element enqueued is always the first element dequeued — this is the FIFO rule.',
]

const JAVA_CODE = `import java.util.LinkedList;

class Queue<T> {
    private LinkedList<T> list = new LinkedList<>();

    // Add an element to the back of the queue — O(1)
    public void enqueue(T item) {
        list.addLast(item);
    }

    // Remove and return the front element — O(1)
    public T dequeue() {
        if (isEmpty()) throw new RuntimeException("Queue is empty");
        return list.removeFirst();
    }

    // Return the front element without removing it — O(1)
    public T peek() {
        if (isEmpty()) throw new RuntimeException("Queue is empty");
        return list.getFirst();
    }

    // Check if the queue is empty — O(1)
    public boolean isEmpty() {
        return list.isEmpty();
    }

    public static void main(String[] args) {
        Queue<String> queue = new Queue<>();
        queue.enqueue("Alice");
        queue.enqueue("Bob");
        queue.enqueue("Charlie");
        System.out.println(queue.peek());     // Alice
        System.out.println(queue.dequeue());  // Alice
        System.out.println(queue.dequeue());  // Bob
        System.out.println(queue.isEmpty());  // false
    }
}`

export default function QueuePage() {
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
          <span style={{ color: '#6FB5FF' }}>Queue</span>
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
              Queue
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
                🕐 5 min read
              </span>
              <span style={{ fontFamily: 'var(--font-nunito)', fontWeight: 600, fontSize: 13, color: '#6b7280' }}>
                📘 Beginner
              </span>
            </div>

            {/* Mini visualizer */}
            <div style={{ marginBottom: 28 }}>
              <MiniDSVisualizer type="queue" />
            </div>

            {/* Intro callout */}
            <CalloutBox>
              A queue is a collection that follows <strong>FIFO</strong> — First In, First Out. The
              first element added is always the first one removed, just like a line of people waiting
              at a ticket counter.
            </CalloutBox>

            {/* Section 1 */}
            <SectionHeading>What is a Queue?</SectionHeading>

            <Paragraph>
              Unlike a stack, a queue has two ends: the <strong>back</strong> where new elements
              enter (enqueue), and the <strong>front</strong> where elements leave (dequeue). This
              ensures fair ordering — nothing can skip the line.
            </Paragraph>

            <Paragraph>
              All three core operations — enqueue, dequeue, and peek — run in <strong>O(1)</strong>{' '}
              time when implemented with a doubly-linked list, because you always work at one of the
              two ends.
            </Paragraph>

            <CalloutBox>
              Enqueue A → Enqueue B → Enqueue C → Front: [A, B, C] :Back → Dequeue returns A → Front: [B, C] :Back
            </CalloutBox>

            {/* Section 2 */}
            <SectionHeading>Key Operations</SectionHeading>

            <SubHeading>Enqueue — O(1)</SubHeading>
            <Paragraph>
              Adds a new element to the back of the queue. It joins the end of the line and will
              wait until all elements ahead of it have been dequeued.
            </Paragraph>

            <SubHeading>Dequeue — O(1)</SubHeading>
            <Paragraph>
              Removes and returns the element at the front — the one that has been waiting the
              longest. After dequeuing, the next element in line becomes the new front.
            </Paragraph>

            <SubHeading>Peek — O(1)</SubHeading>
            <Paragraph>
              Returns the front element without removing it. This is useful to check who is next
              before committing to dequeue.
            </Paragraph>

            {/* Section 3 */}
            <SectionHeading>Real-World Uses</SectionHeading>

            <Paragraph>
              Operating systems use queues to schedule <strong>CPU tasks</strong> — processes wait
              their turn and are served in the order they arrived.
            </Paragraph>

            <Paragraph>
              Printers manage <strong>print jobs</strong> with a queue: documents are printed in the
              order they were submitted, never out of sequence.
            </Paragraph>

            <Paragraph>
              <strong>Breadth-First Search (BFS)</strong> on a graph uses a queue to explore nodes
              level by level — every neighbour is enqueued and visited in order.
            </Paragraph>

            {/* Algorithm steps */}
            <SectionHeading>Queue Algorithm Steps</SectionHeading>

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
            <SectionHeading>Queue Code</SectionHeading>

            <CodeBlock code={JAVA_CODE} />

            {/* Section 5 */}
            <SectionHeading>Complexity of Queue</SectionHeading>

            <ComplexityTable
              rows={[
                { case: 'Enqueue', value: 'O(1)', note: 'Added to the back in constant time' },
                { case: 'Dequeue', value: 'O(1)', note: 'Removed from the front in constant time' },
                { case: 'Peek', value: 'O(1)', note: 'Front element is directly accessible' },
                { case: 'Search', value: 'O(n)', note: 'Must dequeue elements to find a value' },
                { case: 'Space', value: 'O(n)', note: 'One slot per element stored' },
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
                You now understand FIFO ordering and how enqueue and dequeue keep things fair and
                efficient. Up next is the Hash Map — a structure that uses clever math to give you
                near-instant lookups for any key.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link
                  href="/learn-dsa/hash-map"
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
                  Next: Hash Map →
                </Link>
              </div>
            </div>

          </article>
        </div>
      </div>
    </div>
  )
}
