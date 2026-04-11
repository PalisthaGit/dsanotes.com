import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnSidebar } from '../sidebar'
import MiniDSVisualizer from '@/components/visualizers/data-structures/MiniDSVisualizer'

export const metadata: Metadata = {
  title: 'Stack Explained | Learn DSA',
  description:
    'Learn how a Stack works with LIFO ordering, push/pop/peek operations, real-world uses, and Java code examples.',
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
  'Push: place a new element on top of the stack — it becomes the new top.',
  'Pop: remove and return the top element — the element below it becomes the new top.',
  'Peek: read the top element without removing it — useful to inspect without modifying.',
  'isEmpty: check whether the stack contains any elements before popping to avoid errors.',
  'The last element pushed is always the first element popped — this is the LIFO rule.',
]

const JAVA_CODE = `import java.util.LinkedList;

class Stack<T> {
    private LinkedList<T> list = new LinkedList<>();

    // Push an element onto the top — O(1)
    public void push(T item) {
        list.addFirst(item);
    }

    // Remove and return the top element — O(1)
    public T pop() {
        if (isEmpty()) throw new RuntimeException("Stack is empty");
        return list.removeFirst();
    }

    // Return the top element without removing it — O(1)
    public T peek() {
        if (isEmpty()) throw new RuntimeException("Stack is empty");
        return list.getFirst();
    }

    // Check if the stack is empty — O(1)
    public boolean isEmpty() {
        return list.isEmpty();
    }

    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();
        stack.push(10);
        stack.push(20);
        stack.push(30);
        System.out.println(stack.peek()); // 30
        System.out.println(stack.pop());  // 30
        System.out.println(stack.pop());  // 20
        System.out.println(stack.isEmpty()); // false
    }
}`

export default function StackPage() {
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
          <span style={{ color: '#6FB5FF' }}>Stack</span>
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
              Stack
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
              <MiniDSVisualizer type="stack" />
            </div>

            {/* Intro callout */}
            <CalloutBox>
              A stack is a collection that follows <strong>LIFO</strong> — Last In, First Out. The
              last element you push onto the stack is always the first one you get back when you pop.
              Think of a stack of plates: you always take the top one first.
            </CalloutBox>

            {/* Section 1 */}
            <SectionHeading>What is a Stack?</SectionHeading>

            <Paragraph>
              A stack restricts how you interact with its elements. You can only add to or remove
              from one end — called the <strong>top</strong>. This constraint makes stacks extremely
              predictable and efficient.
            </Paragraph>

            <Paragraph>
              All three core operations — push, pop, and peek — run in <strong>O(1)</strong> time
              because you always work with the top element only, never searching through the rest.
            </Paragraph>

            <CalloutBox>
              Push 10 → Push 20 → Push 30 → Stack: [10, 20, 30↑] → Pop returns 30 → Stack: [10, 20↑]
            </CalloutBox>

            {/* Section 2 */}
            <SectionHeading>Key Operations</SectionHeading>

            <SubHeading>Push — O(1)</SubHeading>
            <Paragraph>
              Adds a new element to the top of the stack. The new element immediately becomes the
              top, and all previous elements shift conceptually one position down.
            </Paragraph>

            <SubHeading>Pop — O(1)</SubHeading>
            <Paragraph>
              Removes and returns the top element. After popping, the element that was second from
              the top is now the new top. Always check that the stack is not empty before popping.
            </Paragraph>

            <SubHeading>Peek — O(1)</SubHeading>
            <Paragraph>
              Returns the top element without removing it. This is useful when you need to inspect
              what&apos;s on top before deciding whether to pop.
            </Paragraph>

            {/* Section 3 */}
            <SectionHeading>Real-World Uses</SectionHeading>

            <Paragraph>
              The <strong>call stack</strong> in your program is literally a stack — when a function
              calls another function, the new call is pushed on top, and when it returns, it is
              popped off.
            </Paragraph>

            <Paragraph>
              Text editors use a stack to implement <strong>undo</strong>: every action is pushed,
              and Ctrl+Z pops the last action to reverse it.
            </Paragraph>

            <Paragraph>
              Bracket matching (e.g., checking if <code>{`{[()]}`}</code> is valid) is solved
              elegantly with a stack — push opening brackets, and pop when you see a closing one.
            </Paragraph>

            {/* Algorithm steps */}
            <SectionHeading>Stack Algorithm Steps</SectionHeading>

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
            <SectionHeading>Stack Code</SectionHeading>

            <CodeBlock code={JAVA_CODE} />

            {/* Section 5 */}
            <SectionHeading>Complexity of Stack</SectionHeading>

            <ComplexityTable
              rows={[
                { case: 'Push', value: 'O(1)', note: 'Always added to the top' },
                { case: 'Pop', value: 'O(1)', note: 'Always removed from the top' },
                { case: 'Peek', value: 'O(1)', note: 'Top element is directly accessible' },
                { case: 'Search', value: 'O(n)', note: 'Must pop elements to find a value' },
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
                You now understand the LIFO principle and how push, pop, and peek all work in
                constant time. The Stack&apos;s sibling — the Queue — flips the ordering to FIFO.
                Let&apos;s explore that next!
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link
                  href="/learn-dsa/queue"
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
                  Next: Queue →
                </Link>
              </div>
            </div>

          </article>
        </div>
      </div>
    </div>
  )
}
