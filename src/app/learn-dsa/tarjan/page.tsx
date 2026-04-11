import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnSidebar } from '../sidebar'
import MiniGraphVisualizer from '@/components/visualizers/graph/MiniGraphVisualizer'

export const metadata: Metadata = {
  title: "Tarjan's Algorithm Explained | Learn DSA",
  description:
    "Learn how Tarjan's Algorithm finds Strongly Connected Components in a directed graph using a single DFS pass.",
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
  'Run DFS, assigning each node a discovery time and a low-link value.',
  'Push each node onto a stack when first visited.',
  'For each neighbor: recurse if unvisited, then update low[u] = min(low[u], low[v]).',
  'If a neighbor is already on the stack, update low[u] = min(low[u], disc[v]).',
  'If low[u] == disc[u], pop the stack until u is reached — those nodes form one SCC.',
]

const JAVA_CODE = `import java.util.*;

public class TarjanSCC {

    private int[] disc;      // Discovery time of each vertex
    private int[] low;       // Lowest discovery time reachable from subtree
    private boolean[] onStack; // Whether the vertex is currently on the stack
    private Deque<Integer> stack;
    private List<List<Integer>> sccs; // All discovered SCCs
    private int timer = 0;
    private int V;           // Number of vertices
    private List<List<Integer>> adj; // Adjacency list

    public TarjanSCC(int v, List<List<Integer>> adj) {
        this.V = v;
        this.adj = adj;
        disc = new int[V];
        low = new int[V];
        onStack = new boolean[V];
        stack = new ArrayDeque<>();
        sccs = new ArrayList<>();
        Arrays.fill(disc, -1); // -1 means unvisited
    }

    // Recursive DFS that computes disc and low values
    private void dfs(int u) {
        // Set discovery time and low-link to current timer
        disc[u] = low[u] = timer++;

        // Push this vertex onto the stack
        stack.push(u);
        onStack[u] = true;

        // Explore all neighbors
        for (int v : adj.get(u)) {
            if (disc[v] == -1) {
                // v has not been visited — tree edge
                dfs(v);
                // After returning, update low[u] with what the subtree found
                low[u] = Math.min(low[u], low[v]);
            } else if (onStack[v]) {
                // v is already on the stack — back edge to an ancestor
                // Use disc[v] (not low[v]) to stay within the current SCC
                low[u] = Math.min(low[u], disc[v]);
            }
        }

        // If low[u] == disc[u], u is the root of an SCC
        if (low[u] == disc[u]) {
            List<Integer> scc = new ArrayList<>();
            // Pop vertices from the stack until we reach u
            while (true) {
                int w = stack.pop();
                onStack[w] = false;
                scc.add(w);
                if (w == u) break; // u itself is the last vertex of this SCC
            }
            sccs.add(scc);
        }
    }

    // Run Tarjan's algorithm and return all SCCs
    public List<List<Integer>> findSCCs() {
        for (int i = 0; i < V; i++) {
            if (disc[i] == -1) {
                dfs(i); // Start DFS from every unvisited node
            }
        }
        return sccs;
    }

    public static void main(String[] args) {
        // Build a directed graph: A=0, B=1, C=2, D=3
        // Edges: A→B, B→C, C→A, B→D
        int V = 4;
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < V; i++) adj.add(new ArrayList<>());

        adj.get(0).add(1); // A → B
        adj.get(1).add(2); // B → C
        adj.get(2).add(0); // C → A  (creates an SCC: A, B, C)
        adj.get(1).add(3); // B → D  (D is its own SCC)

        TarjanSCC tarjan = new TarjanSCC(V, adj);
        List<List<Integer>> result = tarjan.findSCCs();

        System.out.println("Strongly Connected Components:");
        for (List<Integer> scc : result) {
            System.out.println(scc);
        }
        // Output:
        // [3]       → D is alone
        // [0, 2, 1] → A, B, C form one SCC
    }
}`

const COMPLEXITY_ROWS = [
  { case: 'Best', value: 'O(V + E)', note: 'Single DFS pass over all vertices and edges' },
  { case: 'Average', value: 'O(V + E)', note: 'Linear in the size of the graph' },
  { case: 'Worst', value: 'O(V + E)', note: 'Always linear — no worse case possible' },
]

export default function TarjanPage() {
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
          <span style={{ color: '#6FB5FF' }}>Tarjan&apos;s Algorithm</span>
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
              Tarjan&apos;s Algorithm
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
                🕐 14 min read
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
              <MiniGraphVisualizer algorithm="tarjan" category="scc" />
            </div>

            {/* Intro callout */}
            <CalloutBox>
              Tarjan&apos;s algorithm finds all Strongly Connected Components (SCCs) in a directed
              graph using a single DFS pass. An SCC is a group of nodes where every node can reach
              every other node.
            </CalloutBox>

            <Paragraph>
              Designed by Robert Tarjan in 1972, this algorithm is considered one of the most elegant
              results in graph theory. It achieves in one pass what seems like it should require
              multiple traversals — identifying every cluster of mutually reachable nodes
              simultaneously.
            </Paragraph>

            <Paragraph>
              Understanding Tarjan&apos;s algorithm requires comfort with DFS, recursion stacks, and
              two key concepts: <strong>discovery time</strong> and <strong>low-link values</strong>.
              Once you grasp these, the algorithm clicks into place beautifully.
            </Paragraph>

            {/* ── Section 1 ── */}
            <SectionHeading>What is an SCC?</SectionHeading>

            <Paragraph>
              A <strong>Strongly Connected Component</strong> is a maximal set of vertices in a
              directed graph such that there is a directed path from every vertex to every other
              vertex in the set.
            </Paragraph>

            <Paragraph>
              Consider this directed graph: A → B → C → A. Starting from any of these three nodes,
              you can reach all the others by following directed edges. Therefore A, B, and C form
              one SCC.
            </Paragraph>

            <CalloutBox>
              If node D is added with only incoming edges (e.g., B → D) and no edges leaving D back
              into the group, then D cannot reach A, B, or C. D is isolated in its own SCC —{' '}
              {'{D}'}.
            </CalloutBox>

            <Paragraph>
              Every directed graph can be decomposed into SCCs. Even a node with no edges forms its
              own trivial SCC of size one. Finding all SCCs is a foundational step in many graph
              analysis tasks.
            </Paragraph>

            <SubHeading>Why SCCs Matter</SubHeading>

            <Paragraph>
              SCCs appear in a wide range of real-world problems:
            </Paragraph>

            <Paragraph>
              <strong>Compilers and dependency resolution:</strong> When modules depend on each
              other, SCCs reveal circular dependencies that must be compiled together or reported as
              errors.
            </Paragraph>

            <Paragraph>
              <strong>Social networks:</strong> SCCs identify groups of users who all follow each
              other — tightly knit communities within a larger network.
            </Paragraph>

            <Paragraph>
              <strong>Deadlock detection:</strong> In operating systems, processes waiting on each
              other form a directed graph. An SCC with more than one node indicates a deadlock cycle.
            </Paragraph>

            <Paragraph>
              <strong>Web crawling:</strong> SCCs in the web link graph help search engines
              understand which pages are part of strongly interconnected clusters versus isolated
              pages.
            </Paragraph>

            {/* ── Section 2 ── */}
            <SectionHeading>How Tarjan Works</SectionHeading>

            <Paragraph>
              Tarjan&apos;s algorithm performs a depth-first search and maintains two values for
              every visited node: its <strong>discovery time</strong> and its{' '}
              <strong>low-link value</strong>. It also keeps a stack of nodes currently in the DFS
              path.
            </Paragraph>

            <Paragraph>
              When the DFS finishes exploring a node, it checks a simple condition: if the
              node&apos;s low-link value equals its own discovery time, the node is the &quot;root&quot;
              of an SCC. Everything above it on the stack until and including itself forms that SCC.
            </Paragraph>

            <div style={{ marginBottom: 24, marginTop: 8 }}>
              <MiniGraphVisualizer algorithm="tarjan" category="scc" />
            </div>

            <SubHeading>Discovery Time</SubHeading>

            <Paragraph>
              Each node gets a unique <strong>discovery time</strong> (also called <em>disc</em>)
              when it is first visited during DFS. The timer starts at 0 and increments with every
              new node visited. Discovery times establish a strict ordering — a node with a smaller
              disc value was visited earlier.
            </Paragraph>

            <Paragraph>
              Discovery time is immutable once assigned. It records when during the DFS traversal a
              particular node was first encountered.
            </Paragraph>

            <SubHeading>Low-Link Value</SubHeading>

            <Paragraph>
              The <strong>low-link value</strong> (also called <em>low</em>) for a node u is the
              minimum discovery time reachable from u&apos;s subtree in the DFS tree, including u
              itself. In other words: how far &quot;back&quot; can you reach from u or any of its
              DFS descendants?
            </Paragraph>

            <Paragraph>
              If a back edge from a descendant of u reaches an ancestor with discovery time t, then
              low[u] may be updated to t. This propagation bubbles up through the recursion, letting
              ancestors know about back edges deeper in the tree.
            </Paragraph>

            <SubHeading>The Stack</SubHeading>

            <Paragraph>
              As Tarjan&apos;s DFS visits nodes, each node is pushed onto an explicit stack (separate
              from the call stack). Nodes remain on this stack until their entire SCC is identified.
            </Paragraph>

            <Paragraph>
              When a node u is determined to be an SCC root (low[u] == disc[u]), the algorithm pops
              nodes from the stack one by one until u is popped. All popped nodes — from the top
              down to u — constitute one complete SCC.
            </Paragraph>

            <CalloutBox>
              The stack only contains nodes whose SCCs have not yet been fully determined. A node is
              removed from the stack the moment its SCC is identified, preventing it from being
              included in another SCC.
            </CalloutBox>

            {/* ── Section 3 ── */}
            <SectionHeading>Tarjan Step by Step</SectionHeading>

            <Paragraph>
              Using the directed graph: A → B, B → C, C → A, B → D (nodes A=0, B=1, C=2, D=3):
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

            {/* ── Section 4 ── */}
            <SectionHeading>Tarjan Code</SectionHeading>

            <Paragraph>
              The Java implementation below uses an iterative DFS where each node is visited exactly
              once. Comments explain each key decision point in the algorithm.
            </Paragraph>

            <CodeBlock code={JAVA_CODE} />

            {/* ── Section 5 ── */}
            <SectionHeading>Complexity Analysis</SectionHeading>

            <SubHeading>Time Complexity</SubHeading>

            <Paragraph>
              Tarjan&apos;s algorithm visits every vertex exactly once and processes every edge
              exactly once during the DFS. The additional work per node (stack operations, low-link
              updates) is constant. This gives a total time complexity of{' '}
              <strong>O(V + E)</strong> — linear in the size of the graph.
            </Paragraph>

            <Paragraph>
              There is no worst case that degrades this bound. Whether the graph is sparse, dense,
              has many SCCs or just one, the algorithm always runs in O(V + E).
            </Paragraph>

            <ComplexityTable rows={COMPLEXITY_ROWS} />

            <SubHeading>Space Complexity</SubHeading>

            <Paragraph>
              <strong>O(V) — Linear space.</strong> Tarjan&apos;s algorithm maintains the disc and
              low arrays (each of size V), the onStack boolean array (size V), and the explicit stack
              which holds at most V nodes at any time. The recursive DFS call stack also reaches a
              maximum depth of V in the worst case (a graph that is one long chain). Total space is
              O(V).
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
                You&apos;ve mastered Tarjan&apos;s Algorithm!
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
                Tarjan&apos;s is one of the most impressive algorithms in computer science — a single
                DFS pass that finds every SCC. Next, explore Kosaraju&apos;s algorithm, which solves
                the same problem with a different two-pass approach that many find easier to reason
                about.
              </p>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link
                  href="/learn-dsa/kosaraju"
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
                  Next: Kosaraju&apos;s Algorithm →
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
