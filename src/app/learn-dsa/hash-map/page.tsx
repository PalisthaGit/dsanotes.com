import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnSidebar } from '../sidebar'
import MiniDSVisualizer from '@/components/visualizers/data-structures/MiniDSVisualizer'

export const metadata: Metadata = {
  title: 'Hash Map Explained | Learn DSA',
  description:
    'Learn how a Hash Map works with hashing, collision handling, key-value operations, and Java code examples.',
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
  'Compute a hash code from the key — this converts the key into an integer index.',
  'Use the index to directly jump to the correct bucket in the underlying array.',
  'Store the key-value pair in that bucket — retrieval later uses the same index.',
  'If two keys hash to the same bucket (collision), chain them in a linked list at that slot.',
  'On get or remove, hash the key, go to the bucket, then scan the chain for an exact key match.',
]

const JAVA_CODE = `import java.util.HashMap;

public class HashMapExample {
    public static void main(String[] args) {
        // Create a HashMap with String keys and Integer values
        HashMap<String, Integer> scores = new HashMap<>();

        // put: add or update a key-value pair — O(1) average
        scores.put("Alice", 95);
        scores.put("Bob", 82);
        scores.put("Charlie", 78);

        // get: retrieve a value by key — O(1) average
        System.out.println(scores.get("Alice"));   // 95
        System.out.println(scores.get("Bob"));     // 82

        // containsKey: check if a key exists — O(1) average
        System.out.println(scores.containsKey("Charlie")); // true
        System.out.println(scores.containsKey("Diana"));   // false

        // remove: delete a key-value pair — O(1) average
        scores.remove("Bob");
        System.out.println(scores.containsKey("Bob")); // false

        // Iterate over all entries
        for (HashMap.Entry<String, Integer> entry : scores.entrySet()) {
            System.out.println(entry.getKey() + " -> " + entry.getValue());
        }
    }
}`

export default function HashMapPage() {
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
          <span style={{ color: '#6FB5FF' }}>Hash Map</span>
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
              Hash Map
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
              <MiniDSVisualizer type="hash-map" />
            </div>

            {/* Intro callout */}
            <CalloutBox>
              A hash map (also called a hash table or dictionary) stores data as{' '}
              <strong>key-value pairs</strong> and gives you O(1) average-time access to any value
              as long as you know its key. It achieves this speed by converting the key into an
              array index using a <strong>hash function</strong>.
            </CalloutBox>

            {/* Section 1 */}
            <SectionHeading>What is a Hash Map?</SectionHeading>

            <Paragraph>
              Imagine you have a locker room with numbered lockers. Instead of searching every
              locker, you use a formula to compute exactly which locker holds your item — that
              formula is the hash function, and the locker number is the index.
            </Paragraph>

            <Paragraph>
              Hash maps are one of the most frequently used data structures in software development.
              They power everything from database indexes to counting word frequencies in text
              processing.
            </Paragraph>

            {/* Section 2 */}
            <SectionHeading>How Hashing Works</SectionHeading>

            <Paragraph>
              A <strong>hash function</strong> takes a key (like a string or integer) and produces
              a non-negative integer called a hash code. That code is then reduced (usually via
              modulo) to fit inside the bounds of the internal array.
            </Paragraph>

            <CalloutBox>
              Example: key = &quot;Alice&quot; → hashCode() = 63609 → 63609 % 16 = 9 → stored at index 9
            </CalloutBox>

            <Paragraph>
              A good hash function distributes keys evenly across all buckets to minimise collisions
              and keep average-case performance at O(1).
            </Paragraph>

            {/* Section 3 */}
            <SectionHeading>Handling Collisions</SectionHeading>

            <Paragraph>
              A <strong>collision</strong> occurs when two different keys produce the same bucket
              index. The most common solution is <strong>separate chaining</strong>: each bucket
              holds a linked list, and all colliding key-value pairs are appended to that list.
            </Paragraph>

            <Paragraph>
              On a get or remove, you first jump to the correct bucket (O(1)), then scan the chain
              for the exact key match. If the hash function is good, chains stay short and lookups
              remain fast.
            </Paragraph>

            <CalloutBox>
              Bucket 9: [&quot;Alice&quot;→95] → [&quot;Eve&quot;→88] → null — two keys collided at index 9 and are chained together.
            </CalloutBox>

            {/* Algorithm steps */}
            <SectionHeading>Hash Map Algorithm Steps</SectionHeading>

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
            <SectionHeading>Hash Map Code</SectionHeading>

            <CodeBlock code={JAVA_CODE} />

            {/* Section 5 */}
            <SectionHeading>Complexity of Hash Map</SectionHeading>

            <ComplexityTable
              rows={[
                { case: 'Get', value: 'O(1) avg / O(n) worst', note: 'Worst case when all keys collide into one bucket' },
                { case: 'Put', value: 'O(1) avg / O(n) worst', note: 'Worst case due to collision chaining' },
                { case: 'Remove', value: 'O(1) avg', note: 'Hash to bucket, then remove from chain' },
                { case: 'ContainsKey', value: 'O(1) avg', note: 'Same as get — hash and check' },
                { case: 'Space', value: 'O(n)', note: 'Proportional to the number of entries' },
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
                Hash maps are one of the most powerful tools in a developer&apos;s toolkit — once
                you understand hashing and collision handling, you can solve many problems in O(1)
                average time. Next up, the Binary Search Tree — a structure that keeps data sorted
                for fast O(log n) operations.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link
                  href="/learn-dsa/binary-search-tree"
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
                  Next: Binary Search Tree →
                </Link>
              </div>
            </div>

          </article>
        </div>
      </div>
    </div>
  )
}
