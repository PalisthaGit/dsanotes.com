import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnSidebar } from '../sidebar'
import MiniStringVisualizer from '@/components/visualizers/string-matching/MiniStringVisualizer'

export const metadata: Metadata = {
  title: 'KMP Algorithm Explained | Learn DSA',
  description:
    'Learn the Knuth-Morris-Pratt (KMP) string matching algorithm step by step — failure function, LPS array, Java code, and complexity analysis.',
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
  'Build the LPS array: for each pattern position, find the longest proper prefix that is also a suffix.',
  'Start matching text[i] against pattern[j].',
  'If they match, advance both i and j.',
  'If j reaches the pattern length, a match is found — use lps[j-1] to continue without resetting i.',
  'On a mismatch, jump j back to lps[j-1] instead of restarting from zero.',
  'Repeat until the end of the text.',
]

const JAVA_CODE = `class KMP {

    /**
     * Build the LPS (Longest Proper Prefix which is also Suffix) array.
     * lps[i] = length of longest proper prefix of pattern[0..i]
     *          that is also a suffix of pattern[0..i].
     */
    static int[] buildLPS(String pattern) {
        int m = pattern.length();
        int[] lps = new int[m];

        int len = 0;   // length of previous longest prefix suffix
        int i   = 1;
        lps[0]  = 0;   // always 0 by definition

        while (i < m) {
            if (pattern.charAt(i) == pattern.charAt(len)) {
                len++;
                lps[i] = len;
                i++;
            } else {
                if (len != 0) {
                    // Fall back — do NOT increment i
                    len = lps[len - 1];
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }
        return lps;
    }

    /**
     * KMP search — finds all occurrences of pattern in text.
     * Time: O(n + m)  Space: O(m)
     */
    static void kmpSearch(String text, String pattern) {
        int n = text.length();
        int m = pattern.length();

        int[] lps = buildLPS(pattern);

        int i = 0; // index into text
        int j = 0; // index into pattern

        while (i < n) {
            if (text.charAt(i) == pattern.charAt(j)) {
                i++;
                j++;
            }

            if (j == m) {
                System.out.println("Pattern found at index " + (i - j));
                j = lps[j - 1]; // prepare for next potential match
            } else if (i < n && text.charAt(i) != pattern.charAt(j)) {
                if (j != 0) {
                    j = lps[j - 1]; // use LPS to skip re-comparisons
                } else {
                    i++;
                }
            }
        }
    }

    public static void main(String[] args) {
        String text    = "AABAABAAB";
        String pattern = "AABAAB";
        kmpSearch(text, pattern);
        // Output:
        // Pattern found at index 0
        // Pattern found at index 3
    }
}`

export default function KMPPage() {
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
          <span style={{ color: '#0d9488' }}>KMP Algorithm</span>
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
              KMP Algorithm
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
                🕐 12 min read
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

            {/* Mini visualizer */}
            <div style={{ marginBottom: 28 }}>
              <MiniStringVisualizer algorithm="kmp" />
            </div>

            {/* Intro callout */}
            <CalloutBox>
              The Knuth-Morris-Pratt (KMP) algorithm improves on naive search by never re-comparing
              characters that were already matched. It preprocesses the pattern to build a{' '}
              <em>failure function</em> (the LPS array) that tells us exactly how far to jump on a
              mismatch — achieving O(n + m) time instead of O(n &times; m).
            </CalloutBox>

            {/* ── Section 1: Problem with Naive ── */}
            <SectionHeading>The Problem with Naive Search</SectionHeading>

            <Paragraph>
              Naive search is correct, but it wastes work. When the pattern partially matches a
              window of the text and then a mismatch occurs, naive search discards everything it
              learned about those matched characters and starts the pattern comparison from scratch
              at the next text position.
            </Paragraph>

            <Paragraph>
              Consider text = <strong>&quot;AABAABAAB&quot;</strong> and pattern ={' '}
              <strong>&quot;AABAAB&quot;</strong>. Naive search at position 0 would match A, A, B,
              A, A then hit B vs B — wait, it matches! But if we shift that example slightly: text
              = <strong>&quot;AAAAB&quot;</strong>, pattern = <strong>&quot;AAAB&quot;</strong>.
              At i=0: A=A, A=A, A=A, B≠A — mismatch at j=3. We slide to i=1 and compare A=A,
              A=A, B≠A — we already knew those first two A&apos;s from the previous window but
              naive forgets this entirely.
            </Paragraph>

            <div style={{ marginBottom: 24, marginTop: 8 }}>
              <MiniStringVisualizer algorithm="kmp" />
            </div>

            <CalloutBox>
              The key waste in naive search: when a mismatch happens after j matched characters,
              we throw away information about those j characters and restart. KMP uses that
              information to skip ahead intelligently.
            </CalloutBox>

            {/* ── Section 2: Failure Function / LPS ── */}
            <SectionHeading>The Failure Function (LPS Array)</SectionHeading>

            <Paragraph>
              The heart of KMP is the <strong>LPS array</strong> — Longest Proper Prefix which is
              also a Suffix. For each position i in the pattern, lps[i] stores the length of the
              longest prefix of pattern[0..i] that is also a suffix of pattern[0..i].
            </Paragraph>

            <Paragraph>
              A <em>proper</em> prefix or suffix means it cannot be the entire string itself. So
              for a string of length k, we consider prefixes and suffixes of length 1 to k-1.
            </Paragraph>

            <Paragraph>
              For pattern <strong>&quot;AABAABAAB&quot;</strong> (length 9), the LPS array is:
            </Paragraph>

            <div
              style={{
                overflowX: 'auto',
                marginBottom: 24,
                background: '#f8f9fa',
                borderRadius: 10,
                padding: '16px 20px',
              }}
            >
              <table style={{ borderCollapse: 'collapse', fontFamily: 'var(--font-jetbrains)', fontSize: 13 }}>
                <thead>
                  <tr>
                    {['Index', '0', '1', '2', '3', '4', '5', '6', '7', '8'].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: '6px 14px',
                          color: '#6b7280',
                          fontWeight: 700,
                          borderBottom: '1px solid #e5e7eb',
                          textAlign: 'center',
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {['Pattern', 'A', 'A', 'B', 'A', 'A', 'B', 'A', 'A', 'B'].map((v, i) => (
                      <td
                        key={i}
                        style={{
                          padding: '6px 14px',
                          color: '#0d1117',
                          fontWeight: 700,
                          textAlign: 'center',
                          borderBottom: '1px solid #e5e7eb',
                        }}
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    {['LPS', '0', '1', '0', '1', '2', '3', '4', '5', '6'].map((v, i) => (
                      <td
                        key={i}
                        style={{
                          padding: '6px 14px',
                          color: i === 0 ? '#6b7280' : '#0d9488',
                          fontWeight: 700,
                          textAlign: 'center',
                        }}
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <SubHeading>Building the LPS Array</SubHeading>

            <Paragraph>
              Let&apos;s build the LPS array step by step for the simpler pattern{' '}
              <strong>&quot;AAB&quot;</strong>:
            </Paragraph>

            <ul style={{ margin: '0 0 20px 0', padding: '0 0 0 24px' }}>
              <li
                style={{
                  fontFamily: 'var(--font-nunito)',
                  fontWeight: 600,
                  fontSize: 15,
                  color: '#374151',
                  lineHeight: 1.8,
                  marginBottom: 6,
                }}
              >
                lps[0] = 0 by definition (a single character has no proper prefix or suffix).
              </li>
              <li
                style={{
                  fontFamily: 'var(--font-nunito)',
                  fontWeight: 600,
                  fontSize: 15,
                  color: '#374151',
                  lineHeight: 1.8,
                  marginBottom: 6,
                }}
              >
                i=1, len=0: pattern[1]=&apos;A&apos; vs pattern[0]=&apos;A&apos; — match! lps[1] = 1.
              </li>
              <li
                style={{
                  fontFamily: 'var(--font-nunito)',
                  fontWeight: 600,
                  fontSize: 15,
                  color: '#374151',
                  lineHeight: 1.8,
                  marginBottom: 6,
                }}
              >
                i=2, len=1: pattern[2]=&apos;B&apos; vs pattern[1]=&apos;A&apos; — mismatch. len = lps[0] = 0. Now len=0, so lps[2] = 0.
              </li>
            </ul>

            <Paragraph>
              Result: lps = [0, 1, 0]. This tells us: if we&apos;ve matched 2 characters of &quot;AAB&quot;
              (&apos;A&apos; and &apos;A&apos;) and then hit a mismatch, we can fall back to position
              lps[1] = 1 — meaning we already have a prefix of length 1 matched, so we don&apos;t
              go all the way back to position 0.
            </Paragraph>

            <SubHeading>Using LPS on Mismatch</SubHeading>

            <Paragraph>
              During the search phase, when a mismatch occurs at pattern position j, instead of
              resetting j to 0 (as naive does), KMP sets j = lps[j - 1]. This &quot;falls back&quot;
              to the longest prefix of the pattern that is guaranteed to already match the current
              suffix of the text — so those characters never need to be re-compared.
            </Paragraph>

            <CalloutBox>
              Think of lps[j-1] as a shortcut: &quot;Even though position j didn&apos;t match,
              I know the first lps[j-1] characters of the pattern already match the most recent
              part of the text — I can resume comparing from there.&quot;
            </CalloutBox>

            {/* ── Section 3: How KMP Avoids Re-comparisons ── */}
            <SectionHeading>How KMP Avoids Re-comparisons</SectionHeading>

            <Paragraph>
              The crucial guarantee is that the text pointer i never moves backwards. In naive
              search, after a partial match of length j fails, you effectively go back to text
              position i - j + 1. In KMP, i stays where it is (or advances), and only the pattern
              pointer j is adjusted using the LPS array.
            </Paragraph>

            <Paragraph>
              This means every character in the text is visited at most twice — once by i advancing
              forward during comparisons, and the LPS fallback only repositions j in the pattern,
              not i in the text. The total number of operations across both the preprocessing and
              search phases is strictly O(n + m).
            </Paragraph>

            <Paragraph>
              To see this concretely: with text = <strong>&quot;AABAABAAB&quot;</strong> (n=9) and
              pattern = <strong>&quot;AABAAB&quot;</strong> (m=6), naive search performs up to 9 &times; 6
              = 54 character comparisons in the worst case. KMP performs at most 9 + 6 = 15. On
              large inputs — think gigabyte log files searched with a multi-kilobyte pattern — this
              difference is enormous.
            </Paragraph>

            {/* ── Section 4: Step by Step ── */}
            <SectionHeading>KMP Step by Step</SectionHeading>

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

            {/* ── Section 5: Code ── */}
            <SectionHeading>KMP Code</SectionHeading>

            <Paragraph>
              The implementation consists of two methods: <code>buildLPS</code> that preprocesses
              the pattern in O(m), and <code>kmpSearch</code> that performs the search in O(n).
              Together they give O(n + m).
            </Paragraph>

            <CodeBlock code={JAVA_CODE} />

            {/* ── Section 6: Naive vs KMP ── */}
            <SectionHeading>Naive vs KMP Comparison</SectionHeading>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 16,
                marginBottom: 28,
              }}
            >
              {/* Naive column */}
              <div
                style={{
                  background: '#fff7ed',
                  border: '1px solid #fed7aa',
                  borderRadius: 12,
                  padding: '20px 22px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-poppins)',
                    fontWeight: 700,
                    fontSize: 14,
                    color: '#92400e',
                    marginBottom: 12,
                  }}
                >
                  Naive Search
                </div>
                <ul style={{ margin: 0, padding: '0 0 0 18px' }}>
                  {[
                    'Time: O(n \u00d7 m)',
                    'Space: O(1)',
                    'No preprocessing',
                    'Resets pattern pointer to 0 on mismatch',
                    'Re-compares already-matched characters',
                    'Slow on repetitive text/pattern',
                  ].map((item) => (
                    <li
                      key={item}
                      style={{
                        fontFamily: 'var(--font-nunito)',
                        fontWeight: 600,
                        fontSize: 13,
                        color: '#78350f',
                        lineHeight: 1.8,
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* KMP column */}
              <div
                style={{
                  background: '#f0fdf4',
                  border: '1px solid #86efac',
                  borderRadius: 12,
                  padding: '20px 22px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-poppins)',
                    fontWeight: 700,
                    fontSize: 14,
                    color: '#166534',
                    marginBottom: 12,
                  }}
                >
                  KMP Algorithm
                </div>
                <ul style={{ margin: 0, padding: '0 0 0 18px' }}>
                  {[
                    'Time: O(n + m)',
                    'Space: O(m) for LPS array',
                    'Preprocessing: build LPS in O(m)',
                    'Uses LPS to jump on mismatch',
                    'Never re-compares matched characters',
                    'Consistently fast on all inputs',
                  ].map((item) => (
                    <li
                      key={item}
                      style={{
                        fontFamily: 'var(--font-nunito)',
                        fontWeight: 600,
                        fontSize: 13,
                        color: '#14532d',
                        lineHeight: 1.8,
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── Section 7: Complexity ── */}
            <SectionHeading>Complexity Analysis</SectionHeading>

            <ComplexityTable
              rows={[
                {
                  case: 'Best',
                  value: 'O(n)',
                  note: 'No backtracking needed — pattern found at first comparison or mismatches at j=0 every time',
                },
                {
                  case: 'Average',
                  value: 'O(n + m)',
                  note: 'n = text length, m = pattern length — includes O(m) preprocessing and O(n) search',
                },
                {
                  case: 'Worst',
                  value: 'O(n + m)',
                  note: 'Still linear even for worst-case patterns like text="AAAA" pattern="AAAB" — LPS ensures no re-comparisons',
                },
              ]}
            />

            <SubHeading>Space Complexity</SubHeading>

            <Paragraph>
              <strong>O(m)</strong> — KMP requires an auxiliary LPS array of size m (the pattern
              length). This is a small trade-off: by spending O(m) extra memory on the failure
              function, we eliminate the O(n &times; m) worst-case time of naive search. In
              practice, patterns are almost always far shorter than the text being searched, making
              this overhead negligible.
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
                KMP revolutionized string searching
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
                Published by Knuth, Morris, and Pratt in 1977, KMP was one of the first algorithms
                to prove that string matching could be done in linear time. The core insight —
                that information about the pattern&apos;s self-similarity (captured in the LPS array)
                can be used to avoid re-comparisons — laid the groundwork for even more powerful
                algorithms like Boyer-Moore and Aho-Corasick. Understanding KMP gives you a deep
                intuition for how preprocessing can transform an algorithm from quadratic to linear.
              </p>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link
                  href="/visualizer/string-matching"
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
                  Practice in Visualizer →
                </Link>
                <Link
                  href="/learn-dsa/naive-string-search"
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
                  ← Naive String Search
                </Link>
              </div>
            </div>

          </article>
        </div>
      </div>
    </div>
  )
}
