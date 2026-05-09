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

// ── Step-by-step mini visualizer helpers ──────────────────────────────────────

function StackDiagram({
  items,
  highlightTop = false,
  removingTop = false,
  label,
}: {
  items: number[]
  highlightTop?: boolean
  removingTop?: boolean
  label?: string
}) {
  // items[0] = bottom, items[last] = top
  const displayed = [...items].reverse() // render top-first
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
      {label && (
        <div
          style={{
            fontFamily: 'var(--font-nunito)',
            fontWeight: 700,
            fontSize: 11,
            color: '#6b7280',
            marginBottom: 6,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </div>
      )}
      {displayed.length === 0 ? (
        <div
          style={{
            width: 80,
            height: 44,
            border: '2px dashed #d1d5db',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-nunito)',
            fontWeight: 700,
            fontSize: 12,
            color: '#9ca3af',
          }}
        >
          empty
        </div>
      ) : (
        displayed.map((val, i) => {
          const isTop = i === 0
          const isRemoving = isTop && removingTop
          const isHighlight = isTop && highlightTop
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div
                style={{
                  width: 80,
                  height: 40,
                  background: isRemoving
                    ? '#fee2e2'
                    : isHighlight
                    ? '#dbeafe'
                    : i === 0
                    ? '#eff6ff'
                    : '#f9fafb',
                  border: isRemoving
                    ? '2px solid #f87171'
                    : isHighlight
                    ? '2px solid #3b82f6'
                    : i === 0
                    ? '2px solid #6FB5FF'
                    : '2px solid #e5e7eb',
                  borderRadius: i === 0 ? '8px 8px 4px 4px' : i === displayed.length - 1 ? '4px 4px 8px 8px' : 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-poppins)',
                  fontWeight: 700,
                  fontSize: 16,
                  color: isRemoving ? '#ef4444' : isHighlight ? '#1d4ed8' : '#0d1117',
                  marginBottom: 2,
                  transition: 'all 0.2s',
                }}
              >
                {val}
              </div>
              {isTop && (
                <span
                  style={{
                    fontFamily: 'var(--font-nunito)',
                    fontWeight: 700,
                    fontSize: 11,
                    color: isRemoving ? '#ef4444' : '#6FB5FF',
                    whiteSpace: 'nowrap',
                  }}
                >
                  ← TOP{isRemoving ? ' (removed)' : ''}
                </span>
              )}
            </div>
          )
        })
      )}
      <div
        style={{
          width: 80,
          height: 6,
          background: '#e5e7eb',
          borderRadius: '0 0 8px 8px',
          marginTop: 2,
        }}
      />
    </div>
  )
}

function StepCard({
  num,
  title,
  desc,
  code,
  children,
}: {
  num: number
  title: string
  desc: string
  code?: string
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        border: '1.5px solid #e5e7eb',
        borderRadius: 14,
        padding: '20px 22px',
        marginBottom: 16,
        background: '#fafafa',
        display: 'flex',
        gap: 24,
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      }}
    >
      {/* Left: number + text */}
      <div style={{ flex: 1, minWidth: 180 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: '#6FB5FF',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-poppins)',
              fontWeight: 700,
              fontSize: 14,
              flexShrink: 0,
            }}
          >
            {num}
          </div>
          <span
            style={{
              fontFamily: 'var(--font-poppins)',
              fontWeight: 700,
              fontSize: 15,
              color: '#0d1117',
            }}
          >
            {title}
          </span>
        </div>
        <p
          style={{
            fontFamily: 'var(--font-nunito)',
            fontWeight: 600,
            fontSize: 14,
            color: '#374151',
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {desc}
        </p>
        {code && (
          <div
            style={{
              marginTop: 10,
              background: '#0d1117',
              borderRadius: 8,
              padding: '8px 14px',
              fontFamily: 'var(--font-jetbrains)',
              fontSize: 13,
              color: '#6FB5FF',
              display: 'inline-block',
            }}
          >
            {code}
          </div>
        )}
      </div>
      {/* Right: visualizer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 160,
          paddingTop: 4,
        }}
      >
        {children}
      </div>
    </div>
  )
}

// ── Static data ────────────────────────────────────────────────────────────────

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

            {/* Step-by-step walkthrough */}
            <SectionHeading>Step-by-Step Walkthrough</SectionHeading>

            <Paragraph>
              Let&apos;s push three numbers onto a stack one by one, then peek and pop — and watch exactly what happens at each step.
            </Paragraph>

            <StepCard
              num={1}
              title="Start — empty stack"
              desc="We create a brand-new stack. Nothing is in it yet. The stack is completely empty."
              code="Stack<Integer> stack = new Stack<>();"
            >
              <StackDiagram items={[]} label="Stack" />
            </StepCard>

            <StepCard
              num={2}
              title="Push 10"
              desc="We push the number 10. It goes straight to the top — it's also the only element, so it sits at the bottom too."
              code="stack.push(10);"
            >
              <StackDiagram items={[10]} label="Stack" />
            </StepCard>

            <StepCard
              num={3}
              title="Push 20"
              desc="We push 20 next. It lands on top of 10. Now 20 is the TOP. If we pop right now, we'd get 20 back — not 10."
              code="stack.push(20);"
            >
              <StackDiagram items={[10, 20]} label="Stack" />
            </StepCard>

            <StepCard
              num={4}
              title="Push 30"
              desc="We push 30. It lands on top of 20. Now 30 is the TOP. The order from bottom to top is 10 → 20 → 30."
              code="stack.push(30);"
            >
              <StackDiagram items={[10, 20, 30]} label="Stack" />
            </StepCard>

            <StepCard
              num={5}
              title="Peek — look at the top"
              desc="Peek lets us see what's on top WITHOUT removing it. We see 30. The stack is unchanged — all three numbers are still there."
              code="stack.peek(); // → 30"
            >
              <StackDiagram items={[10, 20, 30]} highlightTop label="Stack" />
            </StepCard>

            <StepCard
              num={6}
              title="Pop — remove the top"
              desc="Pop removes and returns the top element. 30 comes out. Now 20 becomes the new TOP. The stack has two elements left."
              code="stack.pop(); // → 30"
            >
              <StackDiagram items={[10, 20, 30]} removingTop label="Stack" />
            </StepCard>

            <StepCard
              num={7}
              title="Pop again — remove 20"
              desc="We pop once more. 20 comes out. Now 10 is the new TOP. We started with 3 numbers; we've popped 2, so 1 remains."
              code="stack.pop(); // → 20"
            >
              <StackDiagram items={[10, 20]} removingTop label="Stack" />
            </StepCard>

            <StepCard
              num={8}
              title="Only 10 is left"
              desc="After two pops, only 10 remains. It was the FIRST number we pushed, but it will be the LAST one popped. That's LIFO!"
              code="// stack: [10]"
            >
              <StackDiagram items={[10]} label="Stack" />
            </StepCard>

            <CalloutBox>
              Notice the pattern: the <strong>last number in</strong> (30) was always the <strong>first number out</strong>. That is exactly what <strong>LIFO</strong> means.
            </CalloutBox>

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
