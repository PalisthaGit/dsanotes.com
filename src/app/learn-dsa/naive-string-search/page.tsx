import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnSidebar } from '../sidebar'
import MiniStringVisualizer from '@/components/visualizers/string-matching/MiniStringVisualizer'

export const metadata: Metadata = {
  title: 'Naive String Search Explained | Learn DSA',
  description:
    'Learn how Naive (Brute Force) String Search works step by step with examples, Java code, and complexity analysis.',
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
          <tr style={{ background: '#f0fff4' }}>
            {['Case', 'Time Complexity', 'Notes'].map((h) => (
              <th
                key={h}
                style={{
                  fontFamily: 'var(--font-poppins)',
                  fontWeight: 700,
                  fontSize: 12,
                  color: '#115e59',
                  textAlign: 'left',
                  padding: '10px 16px',
                  borderBottom: '1.5px solid #99f6e4',
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.case} style={{ background: i % 2 === 0 ? '#ffffff' : '#f0fdf4' }}>
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
                  color: '#0d9488',
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
  'Align the pattern at position i = 0 in the text.',
  'Compare pattern characters one by one with text[i], text[i+1], …',
  'If all match, record i as a match position.',
  'If any mismatch, slide the pattern one step right (i++).',
  'Repeat until the pattern no longer fits in the remaining text.',
]

const JAVA_CODE = `class NaiveStringSearch {

    /**
     * Returns all starting indices where pattern occurs in text.
     */
    public static void naiveSearch(String text, String pattern) {
        int n = text.length();
        int m = pattern.length();

        for (int i = 0; i <= n - m; i++) {
            int j = 0;

            // Compare pattern with the current window in text
            while (j < m && text.charAt(i + j) == pattern.charAt(j)) {
                j++;
            }

            if (j == m) {
                // All m characters matched
                System.out.println("Pattern found at index " + i);
            }
        }
    }

    public static void main(String[] args) {
        String text    = "AABACAAB";
        String pattern = "AAB";
        naiveSearch(text, pattern);
        // Output:
        // Pattern found at index 0
        // Pattern found at index 5
    }
}`

export default function NaiveStringSearchPage() {
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
          <span style={{ color: '#0d9488' }}>Naive String Search</span>
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
                background: '#ccfbf1',
                color: '#115e59',
                fontFamily: 'var(--font-nunito)',
                fontWeight: 700,
                fontSize: 11,
                padding: '4px 12px',
                borderRadius: 20,
                marginBottom: 14,
                letterSpacing: '0.05em',
              }}
            >
              STRING MATCHING
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
              Naive String Search
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

            {/* Mini visualizer */}
            <div style={{ marginBottom: 28 }}>
              <MiniStringVisualizer algorithm="naive" />
            </div>

            {/* Intro callout */}
            <CalloutBox>
              Naive string search (also called Brute Force) checks if a pattern exists in a text by
              sliding the pattern one position at a time and comparing character by character. It
              requires no preprocessing and is the simplest approach to the string matching problem.
            </CalloutBox>

            {/* ── Section 1: How It Works ── */}
            <SectionHeading>How Naive Search Works</SectionHeading>

            <Paragraph>
              Imagine you have a long piece of text and you want to find every occurrence of a
              shorter pattern inside it. The naive approach tries the simplest possible strategy:
              place the pattern at position 0 of the text, compare each character one by one, and
              slide the pattern one step to the right when you&apos;re done — whether or not a match
              was found.
            </Paragraph>

            <Paragraph>
              Consider text = <strong>&quot;AABACAAB&quot;</strong> and pattern ={' '}
              <strong>&quot;AAB&quot;</strong>. The algorithm tries the pattern at every index from
              0 to 5 (since 8 &minus; 3 = 5 is the last valid start). At index 0 it finds{' '}
              <strong>AAB</strong> — a match. It slides right and keeps searching, eventually finding
              a second match at index 5.
            </Paragraph>

            <div style={{ marginBottom: 24, marginTop: 8 }}>
              <MiniStringVisualizer algorithm="naive" />
            </div>

            <SubHeading>The Sliding Window</SubHeading>

            <Paragraph>
              The core idea is a <em>sliding window</em> of size m (the pattern length) that moves
              across the text one character at a time. At each position i, the window covers
              text[i..i+m-1]. We ask: does this window exactly equal the pattern?
            </Paragraph>

            <Paragraph>
              Because we move by exactly one position every iteration, we never skip any possible
              starting location. This guarantees correctness — every match will be found. The cost
              is that we may repeat comparisons we&apos;ve already done, which is why naive search
              can be slow on certain inputs.
            </Paragraph>

            <SubHeading>Character Comparison</SubHeading>

            <Paragraph>
              At each position i, we start an inner loop at j = 0 and compare text[i + j] against
              pattern[j]. If the characters match, j increments and we compare the next pair. The
              inner loop continues until either every character in the pattern has matched (j reaches
              m) or a mismatch is detected. At the first mismatch we immediately break the inner
              loop — there is no need to compare the remaining characters for this window.
            </Paragraph>

            <CalloutBox>
              Key insight: When a mismatch occurs at position j inside the pattern, we discard all
              the j comparisons we just made and start fresh at the next text position. This
              re-comparing of already-seen characters is exactly the inefficiency that KMP fixes.
            </CalloutBox>

            <SubHeading>When a Match Is Found</SubHeading>

            <Paragraph>
              If the inner loop reaches j == m, every character in the pattern matched the
              corresponding character in the current window. We record i as a match starting
              position. Crucially, the outer loop continues — we do NOT stop at the first match.
              There may be overlapping or additional occurrences of the pattern later in the text,
              and naive search finds all of them.
            </Paragraph>

            {/* ── Section 2: Step by Step ── */}
            <SectionHeading>Naive Search Step by Step</SectionHeading>

            <Paragraph>
              Let&apos;s trace through text = <strong>&quot;AABACAAB&quot;</strong>, pattern ={' '}
              <strong>&quot;AAB&quot;</strong> (n=8, m=3):
            </Paragraph>

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

            <CalloutBox>
              Trace for &quot;AABACAAB&quot; / &quot;AAB&quot;: i=0 → A=A, A=A, B=B ✓ match at 0.
              i=1 → A=A, B≠A ✗. i=2 → B≠A ✗. i=3 → A=A, C≠A ✗. i=4 → C≠A ✗.
              i=5 → A=A, A=A, B=B ✓ match at 5. Done — two matches found.
            </CalloutBox>

            {/* ── Section 3: Code ── */}
            <SectionHeading>Naive Search Code</SectionHeading>

            <Paragraph>
              The implementation is straightforward — an outer loop over text positions and an inner
              loop over pattern characters. No preprocessing is needed.
            </Paragraph>

            <CodeBlock code={JAVA_CODE} />

            {/* ── Section 4: Complexity ── */}
            <SectionHeading>Complexity Analysis</SectionHeading>

            <ComplexityTable
              rows={[
                {
                  case: 'Best',
                  value: 'O(n)',
                  note: 'Pattern found at first position or mismatches occur on first character every time',
                },
                {
                  case: 'Average',
                  value: 'O(n \u00d7 m)',
                  note: 'n = text length, m = pattern length — inner loop runs partially on most positions',
                },
                {
                  case: 'Worst',
                  value: 'O(n \u00d7 m)',
                  note: 'Pattern almost matches every position (e.g., text="AAAA", pattern="AAB") — inner loop runs to m-1 each time',
                },
              ]}
            />

            <SubHeading>Space Complexity</SubHeading>

            <Paragraph>
              <strong>O(1)</strong> — no extra data structures are used. The algorithm operates
              directly on the input strings using only two integer counters (i and j). This is one
              of its main advantages over more sophisticated algorithms that require preprocessing
              arrays.
            </Paragraph>

            <Paragraph>
              In practice, naive search performs well when the pattern is short or when mismatches
              tend to occur early in the inner loop. For long patterns with repetitive characters
              (like searching for &quot;AAAB&quot; in &quot;AAAAAAAAAA...&quot;), performance
              degrades to O(n &times; m). This is the scenario where KMP shines.
            </Paragraph>

            {/* Closing card */}
            <div
              style={{
                background: '#f0fdf4',
                border: '0.5px solid #99f6e4',
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
                Up next: KMP Algorithm
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
                Now that you understand the brute-force approach and its limitations, the KMP
                (Knuth-Morris-Pratt) algorithm shows how to avoid re-comparing already-matched
                characters. By building a failure function from the pattern, KMP achieves O(n + m)
                — a dramatic improvement for patterns with repeated characters.
              </p>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link
                  href="/learn-dsa/kmp"
                  style={{
                    background: '#0d9488',
                    color: '#fff',
                    borderRadius: 8,
                    padding: '9px 18px',
                    fontFamily: 'var(--font-nunito)',
                    fontWeight: 700,
                    fontSize: 13,
                    textDecoration: 'none',
                  }}
                >
                  Next: KMP Algorithm →
                </Link>
                <Link
                  href="/visualizer/string-matching"
                  style={{
                    background: '#ccfbf1',
                    color: '#115e59',
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
