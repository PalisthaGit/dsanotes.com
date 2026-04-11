import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnSidebar } from '../sidebar'
import MiniDSVisualizer from '@/components/visualizers/data-structures/MiniDSVisualizer'

export const metadata: Metadata = {
  title: 'Binary Search Tree Explained | Learn DSA',
  description:
    'Learn how a Binary Search Tree works with the BST property, insert, search, delete, in-order traversal, and Java code examples.',
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
  'Start at the root node and compare the target value against the current node.',
  'If target is smaller, move to the left child; if larger, move to the right child.',
  'Repeat until you find the value or reach a null — a null means the value is not in the tree.',
  'To insert, follow the same path and place the new node at the first null position you reach.',
  'In-order traversal (left → node → right) visits all nodes in sorted ascending order.',
]

const JAVA_CODE = `class BST {

    static class Node {
        int value;
        Node left, right;
        Node(int value) { this.value = value; }
    }

    Node root;

    // Insert a value into the BST — O(log n) average
    void insert(int value) {
        root = insertRec(root, value);
    }

    private Node insertRec(Node node, int value) {
        if (node == null) return new Node(value);
        if (value < node.value)      node.left  = insertRec(node.left,  value);
        else if (value > node.value) node.right = insertRec(node.right, value);
        return node; // duplicate values are ignored
    }

    // Search for a value — O(log n) average
    boolean search(int value) {
        return searchRec(root, value);
    }

    private boolean searchRec(Node node, int value) {
        if (node == null) return false;
        if (value == node.value) return true;
        return value < node.value
            ? searchRec(node.left,  value)
            : searchRec(node.right, value);
    }

    // In-order traversal: prints values in sorted order — O(n)
    void inorder() {
        inorderRec(root);
        System.out.println();
    }

    private void inorderRec(Node node) {
        if (node == null) return;
        inorderRec(node.left);
        System.out.print(node.value + " ");
        inorderRec(node.right);
    }

    public static void main(String[] args) {
        BST tree = new BST();
        tree.insert(50);
        tree.insert(30);
        tree.insert(70);
        tree.insert(20);
        tree.insert(40);
        tree.inorder();            // 20 30 40 50 70
        System.out.println(tree.search(40));  // true
        System.out.println(tree.search(99));  // false
    }
}`

export default function BinarySearchTreePage() {
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
          <span style={{ color: '#6FB5FF' }}>Binary Search Tree</span>
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
              Binary Search Tree
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
                🕐 10 min read
              </span>
              <span style={{ fontFamily: 'var(--font-nunito)', fontWeight: 600, fontSize: 13, color: '#6b7280' }}>
                📙 Intermediate
              </span>
            </div>

            {/* Mini visualizer */}
            <div style={{ marginBottom: 28 }}>
              <MiniDSVisualizer type="bst" />
            </div>

            {/* Intro callout */}
            <CalloutBox>
              A Binary Search Tree (BST) is a tree where every node follows one rule: all values in
              the <strong>left subtree are smaller</strong> than the node, and all values in the{' '}
              <strong>right subtree are larger</strong>. This property makes searching as efficient
              as binary search — O(log n) on average.
            </CalloutBox>

            {/* Section 1 */}
            <SectionHeading>What is a BST?</SectionHeading>

            <Paragraph>
              Each node in a BST has at most two children: a left child and a right child. The BST
              property is maintained for every node in the entire tree, not just the root — this is
              what makes it so powerful.
            </Paragraph>

            <Paragraph>
              When the tree is balanced, each comparison eliminates roughly half the remaining nodes,
              giving O(log n) search time. An unbalanced tree — where all nodes are inserted in
              sorted order — degrades into a linked list with O(n) operations.
            </Paragraph>

            <CalloutBox>
              {'        50\n       /  \\\n      30   70\n     / \\     \\\n    20  40   80'}
            </CalloutBox>

            {/* Section 2 */}
            <SectionHeading>Key Operations</SectionHeading>

            <SubHeading>Insert — O(log n) average</SubHeading>
            <Paragraph>
              Start at the root and compare the new value against each node. Go left if smaller, go
              right if larger, and repeat until you reach an empty spot — that is where the new node
              is placed.
            </Paragraph>

            <SubHeading>Search — O(log n) average</SubHeading>
            <Paragraph>
              Follow the same left/right decision at each node. If you find a match, return true. If
              you reach a null node, the value does not exist in the tree.
            </Paragraph>

            <SubHeading>Delete — O(log n) average</SubHeading>
            <Paragraph>
              Deleting a node has three cases: the node has no children (just remove it), one child
              (replace the node with its child), or two children (replace the node&apos;s value with
              its in-order successor — the smallest value in its right subtree — then delete that
              successor).
            </Paragraph>

            {/* Section 3 */}
            <SectionHeading>In-Order Traversal</SectionHeading>

            <Paragraph>
              In-order traversal visits nodes in the sequence: <strong>left subtree → current node → right subtree</strong>.
              Because of the BST property, this always visits nodes in ascending sorted order.
            </Paragraph>

            <Paragraph>
              This is useful for producing a sorted list from a BST, or for checking whether a given
              tree is a valid BST by verifying that the sequence is strictly increasing.
            </Paragraph>

            {/* Algorithm steps */}
            <SectionHeading>BST Algorithm Steps</SectionHeading>

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
            <SectionHeading>BST Code</SectionHeading>

            <CodeBlock code={JAVA_CODE} />

            {/* Section 5 */}
            <SectionHeading>Complexity of BST</SectionHeading>

            <ComplexityTable
              rows={[
                { case: 'Search', value: 'O(log n) avg / O(n) worst', note: 'Worst case on a completely unbalanced tree' },
                { case: 'Insert', value: 'O(log n) avg / O(n) worst', note: 'Sorted input creates a degenerate tree' },
                { case: 'Delete', value: 'O(log n) avg / O(n) worst', note: 'Must find node before removing' },
                { case: 'In-order Traversal', value: 'O(n)', note: 'Every node is visited exactly once' },
                { case: 'Space', value: 'O(n)', note: 'One node allocated per value stored' },
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
                You now understand how the BST property enables fast O(log n) operations and how
                in-order traversal produces a sorted sequence. Next up, the Heap — a tree that
                always keeps the minimum (or maximum) value instantly accessible at the root.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link
                  href="/learn-dsa/heap"
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
                  Next: Heap →
                </Link>
              </div>
            </div>

          </article>
        </div>
      </div>
    </div>
  )
}
