import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnSidebar } from '../sidebar'
import MiniGraphVisualizer from '@/components/visualizers/graph/MiniGraphVisualizer'

export const metadata: Metadata = {
  title: "Kosaraju's Algorithm Explained | Learn DSA",
  description:
    "Learn how Kosaraju's Algorithm finds Strongly Connected Components using two DFS passes on the original and reversed graph.",
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
  'Run DFS on the original graph; push each node onto a stack when it finishes.',
  'Build the transposed graph by reversing every edge.',
  'Pop the top node from the stack.',
  'Run DFS from it on the transposed graph — all reachable nodes form one SCC.',
  'Repeat until the stack is empty.',
]

const JAVA_CODE = `import java.util.*;

public class KosarajuSCC {

    private int V;                    // Number of vertices
    private List<List<Integer>> adj;  // Original adjacency list
    private List<List<Integer>> radj; // Reversed adjacency list

    public KosarajuSCC(int v) {
        this.V = v;
        adj = new ArrayList<>();
        radj = new ArrayList<>();
        for (int i = 0; i < V; i++) {
            adj.add(new ArrayList<>());
            radj.add(new ArrayList<>());
        }
    }

    // Add a directed edge u → v to both the original and reversed graphs
    public void addEdge(int u, int v) {
        adj.get(u).add(v);   // original edge u → v
        radj.get(v).add(u);  // reversed edge v → u
    }

    // Pass 1: DFS on original graph to fill finish-order stack
    private void fillOrder(int u, boolean[] visited, Deque<Integer> stack) {
        visited[u] = true;

        for (int v : adj.get(u)) {
            if (!visited[v]) {
                fillOrder(v, visited, stack);
            }
        }

        // Push AFTER all descendants are processed (finish time ordering)
        stack.push(u);
    }

    // Pass 2: DFS on reversed graph to collect one SCC
    private void dfsReversed(int u, boolean[] visited, List<Integer> component) {
        visited[u] = true;
        component.add(u);

        for (int v : radj.get(u)) {
            if (!visited[v]) {
                dfsReversed(v, visited, component);
            }
        }
    }

    // Main method: runs both passes and returns all SCCs
    public List<List<Integer>> findSCCs() {
        Deque<Integer> stack = new ArrayDeque<>();
        boolean[] visited = new boolean[V];

        // ── Pass 1: fill finish-order stack ────────────────────────────────
        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                fillOrder(i, visited, stack);
            }
        }

        // Reset visited array for Pass 2
        Arrays.fill(visited, false);

        List<List<Integer>> allSCCs = new ArrayList<>();

        // ── Pass 2: DFS on reversed graph in finish-time order ─────────────
        while (!stack.isEmpty()) {
            int u = stack.pop();

            if (!visited[u]) {
                List<Integer> component = new ArrayList<>();
                dfsReversed(u, visited, component);
                allSCCs.add(component); // This component is one SCC
            }
        }

        return allSCCs;
    }

    public static void main(String[] args) {
        // Directed graph: A=0, B=1, C=2, D=3
        // Edges: A→B, B→C, C→A, B→D
        KosarajuSCC g = new KosarajuSCC(4);
        g.addEdge(0, 1); // A → B
        g.addEdge(1, 2); // B → C
        g.addEdge(2, 0); // C → A  (cycle: SCC = {A, B, C})
        g.addEdge(1, 3); // B → D  (D is isolated: SCC = {D})

        List<List<Integer>> sccs = g.findSCCs();

        System.out.println("Strongly Connected Components:");
        for (List<Integer> scc : sccs) {
            System.out.println(scc);
        }
        // Output (order may vary):
        // [0, 2, 1]  → A, B, C
        // [3]        → D
    }
}`

const COMPARISON_ROWS = [
  { case: 'Passes', value: 'Tarjan: 1', note: 'Kosaraju needs 2 DFS passes' },
  { case: 'Complexity', value: 'O(V+E)', note: 'Both are O(V+E) — equally fast in practice' },
  { case: 'Stack usage', value: 'Explicit stack', note: 'Tarjan: one stack; Kosaraju: two pass visits' },
  { case: 'Simplicity', value: 'Kosaraju wins', note: 'Easier to explain and implement correctly' },
  { case: 'Low-link needed?', value: 'Tarjan: yes', note: 'Kosaraju avoids disc/low bookkeeping' },
]

const COMPLEXITY_ROWS = [
  { case: 'Best', value: 'O(V + E)', note: 'Two linear DFS passes on the graph' },
  { case: 'Average', value: 'O(V + E)', note: 'Always exactly two passes regardless of structure' },
  { case: 'Worst', value: 'O(V + E)', note: 'Always linear — graph reversal is also O(V+E)' },
]

export default function KosarajuPage() {
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
          <span style={{ color: '#6FB5FF' }}>Kosaraju&apos;s Algorithm</span>
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
                background: '#fee2e2',
                color: '#991b1b',
                fontFamily: 'var(--font-nunito)',
                fontWeight: 700,
                fontSize: 11,
                padding: '4px 12px',
                borderRadius: 20,
                marginBottom: 14,
                letterSpacing: '0.05em',
              }}
            >
              STRONGLY CONNECTED COMPONENTS
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
              Kosaraju&apos;s Algorithm
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
                📕 Advanced
              </span>
            </div>

            {/* Mini visualizer */}
            <div style={{ marginBottom: 28 }}>
              <MiniGraphVisualizer algorithm="kosaraju" category="scc" />
            </div>

            {/* Intro callout */}
            <CalloutBox>
              Kosaraju&apos;s algorithm finds all SCCs using two DFS passes — one on the original
              graph and one on the reversed (transposed) graph. It&apos;s conceptually elegant and
              easy to implement.
            </CalloutBox>

            <Paragraph>
              Developed independently by S. Rao Kosaraju and Micha Sharir in the 1970s–80s,
              Kosaraju&apos;s algorithm finds all Strongly Connected Components in O(V + E) time
              using a beautifully simple insight: reversing all edges in a graph preserves its SCCs
              but breaks the connections between them.
            </Paragraph>

            <Paragraph>
              If you found Tarjan&apos;s algorithm with its discovery times and low-link values a
              bit dense, Kosaraju&apos;s approach may feel more natural. Two clean DFS passes, each
              with a clear purpose.
            </Paragraph>

            {/* ── Section 1 ── */}
            <SectionHeading>The Two-Pass Approach</SectionHeading>

            <Paragraph>
              Kosaraju&apos;s algorithm works in two distinct phases, each a standard DFS:
            </Paragraph>

            <Paragraph>
              <strong>Pass 1</strong> runs DFS on the <em>original</em> graph. Nodes are pushed
              onto a stack in the order they finish — the last node to finish is pushed last and will
              be popped first in Pass 2.
            </Paragraph>

            <Paragraph>
              <strong>Pass 2</strong> runs DFS on the <em>reversed</em> graph, processing nodes in
              the order they are popped from the stack. Each DFS tree in this pass corresponds to
              exactly one SCC.
            </Paragraph>

            <div style={{ marginBottom: 24, marginTop: 8 }}>
              <MiniGraphVisualizer algorithm="kosaraju" category="scc" />
            </div>

            <SubHeading>Pass 1: Finish Time Ordering</SubHeading>

            <Paragraph>
              The first DFS explores the graph normally. The key bookkeeping is: when a node&apos;s
              DFS finishes (all its reachable nodes have been explored), push it onto a stack.
            </Paragraph>

            <Paragraph>
              This &quot;finish time&quot; ordering is crucial. Nodes that finish later have explored
              more of the graph and are closer to the &quot;source&quot; SCCs — SCCs that have
              outgoing edges to other SCCs but no incoming edges from them. We want to process those
              first in Pass 2.
            </Paragraph>

            <CalloutBox>
              Think of it as topological ordering of SCCs. The node that finishes last in Pass 1
              belongs to the SCC that comes first in topological order — the one with the most
              outgoing &quot;authority.&quot;
            </CalloutBox>

            <SubHeading>Pass 2: Reversed Graph</SubHeading>

            <Paragraph>
              With the original finish-order stack ready, Pass 2 builds and traverses the{' '}
              <strong>transposed graph</strong> — identical to the original except every directed
              edge u → v is flipped to v → u.
            </Paragraph>

            <Paragraph>
              Nodes are popped from the stack one by one. For each unvisited node, a DFS runs on the
              reversed graph. All nodes reachable in this DFS form a single SCC. Once identified,
              those nodes are marked visited and will not appear in any future SCC.
            </Paragraph>

            {/* ── Section 2 ── */}
            <SectionHeading>Why Reversing Works</SectionHeading>

            <Paragraph>
              The key intuition: if node A can reach node B in the original graph, then B can reach
              A in the reversed graph. SCCs are groups of nodes that can all reach each other, so
              reversing edges preserves every SCC intact — the same set of nodes still form a
              complete cycle.
            </Paragraph>

            <Paragraph>
              What changes with reversal is the connections <em>between</em> SCCs. In the original
              graph, SCC-X might have edges going into SCC-Y. After reversal, those edges now go
              from SCC-Y back into SCC-X. This blocks &quot;contamination&quot; between SCCs during
              the second DFS.
            </Paragraph>

            <Paragraph>
              So when Pass 2 starts a DFS from a node in SCC-X on the reversed graph, it can reach
              every other node in SCC-X (because the SCC is preserved), but it cannot accidentally
              travel into SCC-Y (because the inter-SCC edges now point the wrong way).
            </Paragraph>

            <CalloutBox>
              The finish-order stack guarantees we start Pass 2 from a node in a &quot;source&quot;
              SCC. Reversing the edges guarantees we cannot escape that SCC into other SCCs. Together
              they isolate each SCC perfectly.
            </CalloutBox>

            {/* ── Section 3 ── */}
            <SectionHeading>Tarjan vs Kosaraju</SectionHeading>

            <Paragraph>
              Both algorithms find all SCCs in O(V + E) time. Here is a direct comparison:
            </Paragraph>

            <div style={{ overflowX: 'auto', marginBottom: 24 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f0f7ff' }}>
                    {['Property', 'Tarjan', 'Kosaraju'].map((h) => (
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
                  {[
                    ['DFS passes', '1', '2'],
                    ['Time complexity', 'O(V+E)', 'O(V+E)'],
                    ['Space complexity', 'O(V)', 'O(V+E) for reversed graph'],
                    ['Conceptual complexity', 'Higher — disc/low values', 'Lower — two straightforward DFS'],
                    ['Implementation difficulty', 'Moderate', 'Easy'],
                    ['Graph reversal needed?', 'No', 'Yes'],
                  ].map(([prop, tarjan, kosaraju], i) => (
                    <tr key={prop} style={{ background: i % 2 === 0 ? '#ffffff' : '#f8fbff' }}>
                      <td style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 13, color: '#0d1117', padding: '10px 16px', border: '0.5px solid #e5e7eb' }}>{prop}</td>
                      <td style={{ fontFamily: 'var(--font-nunito)', fontWeight: 600, fontSize: 13, color: '#374151', padding: '10px 16px', border: '0.5px solid #e5e7eb' }}>{tarjan}</td>
                      <td style={{ fontFamily: 'var(--font-nunito)', fontWeight: 600, fontSize: 13, color: '#374151', padding: '10px 16px', border: '0.5px solid #e5e7eb' }}>{kosaraju}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Paragraph>
              In practice, Tarjan&apos;s is slightly more cache-friendly (one pass, one graph) while
              Kosaraju&apos;s is easier to verify for correctness. Both are standard answers in
              technical interviews and competitive programming.
            </Paragraph>

            {/* ── Section 4 ── */}
            <SectionHeading>Kosaraju Step by Step</SectionHeading>

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

            {/* ── Section 5 ── */}
            <SectionHeading>Kosaraju Code</SectionHeading>

            <Paragraph>
              The implementation below uses two separate DFS methods — one to fill the
              finish-order stack and one to explore the reversed graph. Both follow the same DFS
              pattern, making the code easy to read and verify.
            </Paragraph>

            <CodeBlock code={JAVA_CODE} />

            {/* ── Section 6 ── */}
            <SectionHeading>Complexity Analysis</SectionHeading>

            <SubHeading>Time Complexity</SubHeading>

            <Paragraph>
              Kosaraju&apos;s algorithm runs two complete DFS traversals. Each DFS visits every
              vertex once and every edge once, costing O(V + E) per pass. Building the reversed
              graph also costs O(V + E). The total is{' '}
              <strong>O(V + E) + O(V + E) = O(V + E)</strong> — still linear. The constant factor
              is roughly 2x compared to Tarjan&apos;s single pass.
            </Paragraph>

            <Paragraph>
              The algorithm has no best or worst case variation — it always runs both passes in full
              regardless of the graph structure.
            </Paragraph>

            <ComplexityTable rows={COMPLEXITY_ROWS} />

            <SubHeading>Space Complexity</SubHeading>

            <Paragraph>
              <strong>O(V + E) — Linear space.</strong> Kosaraju&apos;s algorithm must store both
              the original graph and the reversed graph simultaneously, each requiring O(V + E)
              space. Additionally it maintains the finish-order stack (at most V entries) and the
              visited arrays (O(V) each). The dominant cost is storing both adjacency lists:{' '}
              <strong>O(V + E)</strong>.
            </Paragraph>

            <Paragraph>
              This is slightly more memory-intensive than Tarjan&apos;s O(V), since Tarjan does not
              need a separate reversed graph. In practice this is rarely a concern unless the graph
              is extremely large.
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
                Excellent — you know two SCC algorithms now!
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
                Kosaraju&apos;s algorithm is a beautiful example of how reversing a graph&apos;s
                edges can unlock structural information that was hidden in the original. Between
                Tarjan&apos;s one-pass elegance and Kosaraju&apos;s two-pass clarity, you now have
                two powerful tools for analysing directed graphs. Up next: pattern searching with
                Naive String Search.
              </p>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link
                  href="/learn-dsa/naive-string-search"
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
                  Next: Naive String Search →
                </Link>
                <Link
                  href="/visualizer/graph"
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
