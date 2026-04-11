import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnSidebar } from '../sidebar'
import MiniGraphVisualizer from '@/components/visualizers/graph/MiniGraphVisualizer'

export const metadata: Metadata = {
  title: "Prim's Algorithm Explained | Learn DSA",
  description:
    "Learn how Prim's Algorithm builds a Minimum Spanning Tree step by step with examples, code, and complexity analysis.",
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
  'Start from any node — it is now part of the MST.',
  'Look at all edges connecting the MST to unvisited nodes (the frontier).',
  'Pick the frontier edge with the smallest weight.',
  'Add its destination node to the MST and expand the frontier.',
  'Repeat until every node is in the MST.',
]

const JAVA_CODE = `import java.util.*;

public class PrimAlgorithm {

    // Number of vertices in the graph
    static final int V = 5;

    // Find the vertex with the minimum key value
    // from the set of vertices not yet in the MST
    int minKey(int[] key, boolean[] mstSet) {
        int min = Integer.MAX_VALUE;
        int minIndex = -1;

        for (int v = 0; v < V; v++) {
            // Only consider vertices not yet included in MST
            if (!mstSet[v] && key[v] < min) {
                min = key[v];
                minIndex = v;
            }
        }
        return minIndex;
    }

    // Print the constructed MST edges and their weights
    void printMST(int[] parent, int[][] graph) {
        System.out.println("Edge \\t Weight");
        for (int i = 1; i < V; i++) {
            System.out.println(parent[i] + " - " + i + "\\t" + graph[i][parent[i]]);
        }
    }

    // Build the MST using Prim's algorithm with a simple adjacency matrix
    void primMST(int[][] graph) {
        // parent[i] stores which MST vertex connected to vertex i
        int[] parent = new int[V];

        // key[i] holds the minimum weight edge to reach vertex i
        int[] key = new int[V];

        // mstSet[i] is true once vertex i is included in the MST
        boolean[] mstSet = new boolean[V];

        // Initialize all keys to infinity (unreachable)
        Arrays.fill(key, Integer.MAX_VALUE);

        // Start from vertex 0; it has no parent and key = 0
        key[0] = 0;
        parent[0] = -1;

        for (int count = 0; count < V - 1; count++) {
            // Pick the frontier vertex with the smallest key
            int u = minKey(key, mstSet);

            // Mark this vertex as part of the MST
            mstSet[u] = true;

            // Update key values of all adjacent vertices of u
            for (int v = 0; v < V; v++) {
                // graph[u][v] != 0  → there is an edge u–v
                // !mstSet[v]        → v is not yet in the MST
                // graph[u][v] < key[v] → this edge is cheaper than what we found before
                if (graph[u][v] != 0 && !mstSet[v] && graph[u][v] < key[v]) {
                    parent[v] = u;
                    key[v] = graph[u][v];
                }
            }
        }

        printMST(parent, graph);
    }

    public static void main(String[] args) {
        PrimAlgorithm t = new PrimAlgorithm();

        // Adjacency matrix for a weighted undirected graph
        // Nodes: A=0, B=1, C=2, D=3, E=4
        int[][] graph = {
            // A   B   C   D   E
            {  0,  4,  0,  3,  0 }, // A
            {  4,  0,  2,  1,  5 }, // B
            {  0,  2,  0,  0,  3 }, // C
            {  3,  1,  0,  0,  2 }, // D
            {  0,  5,  3,  2,  0 }, // E
        };

        t.primMST(graph);
    }
}`

const COMPLEXITY_ROWS = [
  { case: 'Best', value: 'O(E log V)', note: 'With binary heap priority queue' },
  { case: 'Average', value: 'O(E log V)', note: 'Standard implementation with min-heap' },
  { case: 'Worst', value: 'O(V²)', note: 'With simple array instead of priority queue' },
]

export default function PrimPage() {
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
          <span style={{ color: '#6FB5FF' }}>Prim&apos;s Algorithm</span>
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
                background: '#fef3c7',
                color: '#92400e',
                fontFamily: 'var(--font-nunito)',
                fontWeight: 700,
                fontSize: 11,
                padding: '4px 12px',
                borderRadius: 20,
                marginBottom: 14,
                letterSpacing: '0.05em',
              }}
            >
              MINIMUM SPANNING TREE
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
              Prim&apos;s Algorithm
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
                🕐 10 min read
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
              <MiniGraphVisualizer algorithm="prim" category="mst" />
            </div>

            {/* Intro callout */}
            <CalloutBox>
              Prim&apos;s algorithm builds a Minimum Spanning Tree by growing it one edge at a time
              from a starting node. It always picks the minimum weight edge connecting the MST to an
              unvisited node.
            </CalloutBox>

            <Paragraph>
              A Minimum Spanning Tree (MST) connects all nodes in a weighted graph with the smallest
              possible total edge weight, using no cycles. Prim&apos;s algorithm is one of the two
              classic approaches to finding it — the other being Kruskal&apos;s algorithm.
            </Paragraph>

            <Paragraph>
              Think of it like laying cable across cities. You want every city connected, and you
              want to use the least total cable. Prim&apos;s algorithm starts at one city and greedily
              extends the network by always choosing the cheapest available link to a new city.
            </Paragraph>

            {/* ── Section 1 ── */}
            <SectionHeading>Prim vs Kruskal</SectionHeading>

            <Paragraph>
              Both Prim&apos;s and Kruskal&apos;s algorithms find a Minimum Spanning Tree, but they
              approach the problem from different angles.
            </Paragraph>

            <Paragraph>
              <strong>Prim&apos;s</strong> is vertex-based — it grows the MST one vertex at a time,
              always extending from the current MST boundary. At each step it asks: &quot;What is the
              cheapest edge leaving the MST right now?&quot;
            </Paragraph>

            <Paragraph>
              <strong>Kruskal&apos;s</strong> is edge-based — it sorts all edges globally by weight
              and adds them one by one, skipping any that would create a cycle. It doesn&apos;t grow
              from a single root; instead the MST forms from multiple components that eventually
              merge.
            </Paragraph>

            <CalloutBox>
              Key insight: Prim&apos;s tends to perform better on dense graphs (many edges), while
              Kruskal&apos;s is often preferred for sparse graphs where sorting edges is cheaper.
            </CalloutBox>

            <div style={{ marginBottom: 24, marginTop: 8 }}>
              <MiniGraphVisualizer algorithm="prim" category="mst" />
            </div>

            <SubHeading>The Frontier</SubHeading>

            <Paragraph>
              At any point during Prim&apos;s algorithm, the <strong>frontier</strong> is the
              collection of edges that have one endpoint inside the MST and one endpoint outside it.
              These are the candidate edges — the algorithm&apos;s choices for what to add next.
            </Paragraph>

            <Paragraph>
              When a new vertex is added to the MST, its outgoing edges to unvisited vertices join
              the frontier. Any edges that now connect two MST vertices are discarded because adding
              them would form a cycle.
            </Paragraph>

            <SubHeading>Always Pick the Minimum</SubHeading>

            <Paragraph>
              The core rule of Prim&apos;s algorithm is simple: from the frontier, always choose the
              edge with the smallest weight. This greedy choice is what guarantees the resulting
              spanning tree is minimal — no other spanning tree can have a smaller total weight.
            </Paragraph>

            <Paragraph>
              A priority queue (min-heap) is used in efficient implementations to retrieve the
              frontier&apos;s cheapest edge in O(log E) time rather than scanning the whole list.
            </Paragraph>

            {/* ── Section 2 ── */}
            <SectionHeading>How Prim Works Step by Step</SectionHeading>

            <Paragraph>
              Consider the following graph with five nodes and seven edges:
            </Paragraph>

            <CalloutBox>
              Nodes: A, B, C, D, E{'\n'}
              Edges: A–B (4), A–D (3), B–C (2), B–D (1), B–E (5), C–E (3), D–E (2)
            </CalloutBox>

            <Paragraph>
              <strong>Start at node A.</strong> The MST contains {'{A}'}. The frontier is{' '}
              {'{A–B (4), A–D (3)}'}.
            </Paragraph>

            <Paragraph>
              <strong>Pick A–D (weight 3)</strong> — the cheapest frontier edge. Add D to the MST.
              MST: {'{A, D}'}. New frontier edges from D: D–B (1), D–E (2). Updated frontier:{' '}
              {'{A–B (4), D–B (1), D–E (2)}'}.
            </Paragraph>

            <Paragraph>
              <strong>Pick D–B (weight 1)</strong> — cheapest now. Add B. MST: {'{A, D, B}'}.
              New frontier edges from B: B–C (2), B–E (5). A–B is now internal — removed. Frontier:{' '}
              {'{D–E (2), B–C (2), B–E (5)}'}.
            </Paragraph>

            <Paragraph>
              <strong>Pick D–E (weight 2)</strong> — ties with B–C; we choose D–E. Add E. MST:{' '}
              {'{A, D, B, E}'}. B–E is now internal — removed. Frontier: {'{B–C (2), C–E (3)}'}.
            </Paragraph>

            <Paragraph>
              <strong>Pick B–C (weight 2)</strong>. Add C. All 5 nodes are in the MST.{' '}
              <strong>Done!</strong> Total MST weight: 3 + 1 + 2 + 2 = <strong>8</strong>.
            </Paragraph>

            {/* ── Section 3 ── */}
            <SectionHeading>Prim Algorithm Steps</SectionHeading>

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
            <SectionHeading>Prim Code</SectionHeading>

            <Paragraph>
              The implementation below uses a simple adjacency matrix and a linear scan to find the
              minimum key vertex. For large graphs, replace the scan with a priority queue for better
              performance.
            </Paragraph>

            <CodeBlock code={JAVA_CODE} />

            {/* ── Section 5 ── */}
            <SectionHeading>Complexity Analysis</SectionHeading>

            <SubHeading>Time Complexity</SubHeading>

            <Paragraph>
              <strong>With a binary heap priority queue:</strong> Each vertex is extracted from the
              heap once — O(V log V). Each edge may trigger a key update — O(E log V). Total:{' '}
              <strong>O(E log V)</strong>.
            </Paragraph>

            <Paragraph>
              <strong>With a simple array (no priority queue):</strong> Finding the minimum key each
              round takes O(V). Repeated V times, that is <strong>O(V²)</strong>. This is acceptable
              for dense graphs where E is close to V².
            </Paragraph>

            <Paragraph>
              <strong>With a Fibonacci heap:</strong> Key decreases cost O(1) amortized, giving a
              theoretical best of <strong>O(E + V log V)</strong> — optimal but complex to implement.
            </Paragraph>

            <ComplexityTable rows={COMPLEXITY_ROWS} />

            <SubHeading>Space Complexity</SubHeading>

            <Paragraph>
              <strong>O(V + E) — Linear space.</strong> Prim&apos;s algorithm needs to store the
              graph&apos;s adjacency structure (O(V + E)), the key array (O(V)), the parent array
              (O(V)), and the visited set or priority queue (O(V)). There is no recursive call stack
              as the algorithm is iterative.
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
                Great work building the MST!
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
                Prim&apos;s algorithm is a fundamental greedy technique that shows up in network
                design, clustering, and many optimization problems. Once you&apos;re comfortable with
                how the frontier grows, you&apos;ll be well prepared for more advanced graph
                algorithms like Tarjan&apos;s SCC.
              </p>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link
                  href="/learn-dsa/tarjan"
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
                  Next: Tarjan&apos;s SCC →
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
