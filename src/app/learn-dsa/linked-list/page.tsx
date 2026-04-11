import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnSidebar } from '../sidebar'
import MiniDSVisualizer from '@/components/visualizers/data-structures/MiniDSVisualizer'

export const metadata: Metadata = {
  title: 'Linked List Explained | Learn DSA',
  description:
    'Learn how a singly linked list works with nodes, pointers, key operations, and Java code examples.',
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
  'Start at the head node — this is the entry point of the list.',
  'Read the current node\'s value, then follow its "next" pointer to the next node.',
  'To insert at the head, create a new node and point its "next" to the current head.',
  'To insert at the tail, traverse until you reach the node whose "next" is null, then link it.',
  'To delete a node, find the node before it and update its "next" pointer to skip the target.',
]

const JAVA_CODE = `class SinglyLinkedList {

    // Each node holds a value and a reference to the next node
    static class Node {
        int value;
        Node next;
        Node(int value) { this.value = value; }
    }

    Node head;

    // Insert a new node at the beginning — O(1)
    void addFirst(int value) {
        Node newNode = new Node(value);
        newNode.next = head;
        head = newNode;
    }

    // Insert a new node at the end — O(n)
    void addLast(int value) {
        Node newNode = new Node(value);
        if (head == null) { head = newNode; return; }
        Node current = head;
        while (current.next != null) current = current.next;
        current.next = newNode;
    }

    // Delete the first node with the given value — O(n)
    void delete(int value) {
        if (head == null) return;
        if (head.value == value) { head = head.next; return; }
        Node current = head;
        while (current.next != null && current.next.value != value)
            current = current.next;
        if (current.next != null) current.next = current.next.next;
    }

    // Check if a value exists in the list — O(n)
    boolean contains(int value) {
        Node current = head;
        while (current != null) {
            if (current.value == value) return true;
            current = current.next;
        }
        return false;
    }

    public static void main(String[] args) {
        SinglyLinkedList list = new SinglyLinkedList();
        list.addLast(10);
        list.addLast(20);
        list.addLast(30);
        list.addFirst(5);
        list.delete(20);
        System.out.println(list.contains(10)); // true
        System.out.println(list.contains(20)); // false
    }
}`

export default function LinkedListPage() {
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
          <span style={{ color: '#6FB5FF' }}>Linked List</span>
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
              Linked List
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
                🕐 7 min read
              </span>
              <span style={{ fontFamily: 'var(--font-nunito)', fontWeight: 600, fontSize: 13, color: '#6b7280' }}>
                📘 Beginner
              </span>
            </div>

            {/* Mini visualizer */}
            <div style={{ marginBottom: 28 }}>
              <MiniDSVisualizer type="linked-list" />
            </div>

            {/* Intro callout */}
            <CalloutBox>
              A linked list is a chain of nodes where each node stores a value and a pointer to the
              next node. Unlike arrays, elements are not stored in contiguous memory — they can live
              anywhere, connected only by those pointers.
            </CalloutBox>

            {/* Section 1 */}
            <SectionHeading>What is a Linked List?</SectionHeading>

            <Paragraph>
              Think of a linked list like a treasure hunt: each clue (node) tells you the value and
              where to find the next clue. You always start from the first clue, called the{' '}
              <strong>head</strong>.
            </Paragraph>

            <Paragraph>
              The last node in the list has its <strong>next</strong> pointer set to{' '}
              <strong>null</strong>, marking the end of the chain. There is no index — to reach any
              element, you must walk through the list from the head.
            </Paragraph>

            <CalloutBox>
              Head → [5 | next] → [10 | next] → [20 | next] → [30 | null]
            </CalloutBox>

            <Paragraph>
              Linked lists shine when you need frequent insertions or deletions at the front of a
              collection, since no elements need to shift — you only update a pointer.
            </Paragraph>

            {/* Section 2 */}
            <SectionHeading>Key Operations</SectionHeading>

            <SubHeading>Insert at Head — O(1)</SubHeading>
            <Paragraph>
              Create a new node, set its <strong>next</strong> to the current head, then update the
              head to point to the new node. This is a constant-time operation regardless of list
              size.
            </Paragraph>

            <SubHeading>Insert at Tail — O(n)</SubHeading>
            <Paragraph>
              Traverse the entire list from head until you reach the node whose <strong>next</strong>{' '}
              is null, then link the new node there. This takes linear time because you must walk the
              whole chain.
            </Paragraph>

            <SubHeading>Delete a Node — O(n)</SubHeading>
            <Paragraph>
              Find the node immediately before the target, then update its <strong>next</strong>{' '}
              pointer to skip over the target node. The target is then unreferenced and will be
              garbage-collected.
            </Paragraph>

            <SubHeading>Search — O(n)</SubHeading>
            <Paragraph>
              Start at the head and compare each node&apos;s value to the target. In the worst case
              you visit every node, so search is O(n). There is no random access like an array.
            </Paragraph>

            {/* Algorithm steps */}
            <SectionHeading>Linked List Algorithm Steps</SectionHeading>

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

            {/* Section 3 */}
            <SectionHeading>Linked List Code</SectionHeading>

            <CodeBlock code={JAVA_CODE} />

            {/* Section 4 */}
            <SectionHeading>Complexity of Linked List</SectionHeading>

            <ComplexityTable
              rows={[
                { case: 'Access', value: 'O(n)', note: 'No index — must walk from head' },
                { case: 'Search', value: 'O(n)', note: 'Linear scan from head to tail' },
                { case: 'Insert at Head', value: 'O(1)', note: 'Just update the head pointer' },
                { case: 'Insert at Tail', value: 'O(n)', note: 'Must traverse to the last node' },
                { case: 'Delete', value: 'O(n)', note: 'Must find the predecessor node first' },
                { case: 'Space', value: 'O(n)', note: 'One node allocated per element' },
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
                You now understand how a singly linked list stores data through nodes and pointers,
                and how inserting at the head is far cheaper than working with arrays. Next up, the
                Stack — which is actually built on top of a linked list!
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link
                  href="/learn-dsa/stack"
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
                  Next: Stack →
                </Link>
              </div>
            </div>

          </article>
        </div>
      </div>
    </div>
  )
}
