import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnSidebar } from '../sidebar'
import MiniGraphVisualizer from '@/components/visualizers/graph/MiniGraphVisualizer'

export const metadata: Metadata = {
  title: "Kruskal's Algorithm Explained | Learn DSA",
  description:
    "Learn how Kruskal's algorithm builds a Minimum Spanning Tree using Union-Find, with step-by-step examples, Java code, and complexity analysis.",
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
  'Sort all edges by weight, cheapest first.',
  'For each edge, check if its two endpoints are in different sets (Union-Find).',
  'If different sets, add the edge to the MST and merge the two sets.',
  'If same set, skip it — adding it would create a cycle.',
  'Stop when the MST has V-1 edges.',
]

const JAVA_CODE = `import java.util.*;

public class Kruskal {

    // Represents a weighted edge in the graph
    static class Edge implements Comparable<Edge> {
        int src, dest, weight;
        Edge(int src, int dest, int weight) {
            this.src = src;
            this.dest = dest;
            this.weight = weight;
        }

        @Override
        public int compareTo(Edge other) {
            return Integer.compare(this.weight, other.weight);
        }
    }

    // Union-Find (Disjoint Set Union) data structure
    static class UnionFind {
        int[] parent, rank;

        UnionFind(int n) {
            parent = new int[n];
            rank = new int[n];
            // Each node starts as its own parent (its own set)
            for (int i = 0; i < n; i++) parent[i] = i;
        }

        // Find the root of the set containing x (with path compression)
        int find(int x) {
            if (parent[x] != x) {
                parent[x] = find(parent[x]); // Path compression
            }
            return parent[x];
        }

        // Merge the sets containing x and y (union by rank)
        boolean union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);

            if (rootX == rootY) return false; // Already in the same set — would form a cycle

            // Attach smaller tree under the larger tree
            if (rank[rootX] < rank[rootY]) {
                parent[rootX] = rootY;
            } else if (rank[rootX] > rank[rootY]) {
                parent[rootY] = rootX;
            } else {
                parent[rootY] = rootX;
                rank[rootX]++;
            }
            return true;
        }
    }

    public static List<Edge> kruskal(int n, List<Edge> edges) {
        // Step 1: Sort all edges by weight
        Collections.sort(edges);

        UnionFind uf = new UnionFind(n);
        List<Edge> mst = new ArrayList<>();

        // Step 2: Greedily add the cheapest edge that doesn't form a cycle
        for (Edge edge : edges) {
            if (uf.union(edge.src, edge.dest)) {
                mst.add(edge);
                // MST is complete when it has V-1 edges
                if (mst.size() == n - 1) break;
            }
        }

        return mst;
    }

    public static void main(String[] args) {
        int n = 5; // Number of nodes (0 to 4)
        List<Edge> edges = new ArrayList<>();

        // Add edges: (src, dest, weight)
        edges.add(new Edge(0, 1, 4));
        edges.add(new Edge(0, 2, 1));
        edges.add(new Edge(2, 1, 2));
        edges.add(new Edge(1, 3, 1));
        edges.add(new Edge(2, 3, 5));
        edges.add(new Edge(3, 4, 3));

        List<Edge> mst = kruskal(n, edges);

        int totalWeight = 0;
        System.out.println("Minimum Spanning Tree edges:");
        for (Edge e : mst) {
            System.out.println("  " + e.src + " -- " + e.dest + " (weight: " + e.weight + ")");
            totalWeight += e.weight;
        }
        System.out.println("Total MST weight: " + totalWeight);
    }
}`

const COMPLEXITY_ROWS = [
  {
    case: 'Best',
    value: 'O(E log E)',
    note: 'Dominated by sorting the edges',
  },
  {
    case: 'Average',
    value: 'O(E log E)',
    note: 'Same for any input — sorting always takes O(E log E)',
  },
  {
    case: 'Worst',
    value: 'O(E log E)',
    note: 'Worst case is still dominated by the sort step',
  },
]

export default function KruskalPage() {
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
          <span style={{ color: '#6FB5FF' }}>Kruskal&apos;s Algorithm</span>
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
              Kruskal&apos;s Algorithm
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

            {/* Inbuilt visualizer */}
            <div style={{ marginBottom: 28 }}>
              <MiniGraphVisualizer algorithm="kruskal" category="mst" />
            </div>

            {/* Intro callout */}
            <CalloutBox>
              Kruskal&apos;s algorithm builds a Minimum Spanning Tree (MST) by always picking the
              cheapest available edge that doesn&apos;t create a cycle. It uses the Union-Find data
              structure to efficiently detect whether adding an edge would form a cycle — making it
              both simple to understand and highly efficient in practice.
            </CalloutBox>

            <Paragraph>
              Imagine you&apos;re a city planner tasked with connecting several towns using roads.
              You want every town to be reachable from every other town, but you also want to
              minimize the total cost of building roads. You don&apos;t need a road between every
              pair of towns — you just need the cheapest set of roads that keeps everything
              connected. That&apos;s exactly what a Minimum Spanning Tree gives you, and
              Kruskal&apos;s algorithm finds it greedily.
            </Paragraph>

            {/* ── Section 1 ── */}
            <SectionHeading>What is a Minimum Spanning Tree?</SectionHeading>

            <Paragraph>
              A <strong>Spanning Tree</strong> of a graph is a subgraph that connects all nodes
              with the minimum number of edges — exactly V-1 edges for V nodes — and contains no
              cycles. A <strong>Minimum Spanning Tree (MST)</strong> is the spanning tree with the
              smallest possible total edge weight.
            </Paragraph>

            <Paragraph>
              Three defining properties of an MST:
            </Paragraph>

            <ol style={{ margin: '0 0 24px 0', padding: '0 0 0 24px' }}>
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
                <strong>Connects all nodes</strong> — every node in the graph is included in the MST.
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
                <strong>No cycles</strong> — removing any edge from the MST would disconnect the tree.
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
                <strong>Minimum total weight</strong> — no other spanning tree has a lower sum of edge weights.
              </li>
            </ol>

            <SubHeading>Why MST Matters</SubHeading>

            <Paragraph>
              Minimum Spanning Trees appear everywhere in engineering and computer science:
            </Paragraph>

            <Paragraph>
              <strong>Network cables:</strong> When designing a computer network or telephone
              network, you want to lay cable between locations so that every location is connected,
              but use the least total cable length (cost). An MST gives you exactly that layout.
            </Paragraph>

            <Paragraph>
              <strong>Road planning:</strong> City planners use MST-based algorithms to decide
              which roads to build to connect all neighborhoods at minimum construction cost, without
              building redundant routes.
            </Paragraph>

            <Paragraph>
              <strong>Electric grids:</strong> Power companies need to connect all substations to
              the grid. An MST minimizes the total length of transmission lines needed, reducing
              both material cost and energy loss.
            </Paragraph>

            <Paragraph>
              <strong>Cluster analysis:</strong> In machine learning, MSTs are used to identify
              clusters in data — removing the longest edges of an MST naturally separates groups of
              closely related points.
            </Paragraph>

            {/* ── Section 2 ── */}
            <SectionHeading>How Kruskal Works</SectionHeading>

            <Paragraph>
              Kruskal&apos;s algorithm is beautifully simple: it processes edges from cheapest to
              most expensive, and greedily adds each edge to the MST as long as it doesn&apos;t
              create a cycle. The trick is efficiently detecting whether adding an edge would form a
              cycle — and that&apos;s where Union-Find comes in.
            </Paragraph>

            <div style={{ marginBottom: 24, marginTop: 8 }}>
              <MiniGraphVisualizer algorithm="kruskal" category="mst" />
            </div>

            <SubHeading>Sorting Edges</SubHeading>

            <Paragraph>
              The first step is to collect all edges in the graph and sort them in ascending order
              by weight. This ensures we always consider the cheapest option first — the greedy
              choice that leads to a globally optimal MST.
            </Paragraph>

            <Paragraph>
              For example, if your graph has edges with weights [4, 1, 2, 1, 5, 3], after sorting
              they become [1, 1, 2, 3, 4, 5]. We&apos;ll try to add them in this order, skipping
              any that would create a cycle.
            </Paragraph>

            <CalloutBox>
              Sorting the edges takes O(E log E) time, and this dominates the overall time
              complexity of Kruskal&apos;s algorithm. Everything else runs in nearly O(E) time
              thanks to Union-Find.
            </CalloutBox>

            <SubHeading>Union-Find (Disjoint Set)</SubHeading>

            <Paragraph>
              The <strong>Union-Find</strong> (also called Disjoint Set Union or DSU) is a data
              structure that tracks which nodes belong to the same connected component. It supports
              two core operations:
            </Paragraph>

            <Paragraph>
              <strong>find(x):</strong> Returns the &quot;root&quot; representative of the set
              containing node x. Two nodes are in the same connected component if and only if they
              have the same root. With <em>path compression</em>, this runs in nearly O(1) time.
            </Paragraph>

            <Paragraph>
              <strong>union(x, y):</strong> Merges the two sets containing x and y into one. With
              <em> union by rank</em>, this also runs in nearly O(1) time. If x and y are already
              in the same set, union() returns false — this means adding the edge would create a
              cycle, so we skip it.
            </Paragraph>

            <Paragraph>
              Initially, every node is its own set (its own tree with itself as the root). As we
              add edges, we merge sets together. When all nodes end up in a single set, the MST is
              complete.
            </Paragraph>

            <SubHeading>Adding Edges</SubHeading>

            <Paragraph>
              For each edge in the sorted list, we check: do the two endpoint nodes belong to
              different sets? If yes, connecting them won&apos;t create a cycle — we add this edge
              to the MST and merge their sets. If they&apos;re already in the same set, a path
              already exists between them, and adding this edge would create a redundant cycle —
              so we skip it.
            </Paragraph>

            <Paragraph>
              We continue until we&apos;ve added exactly V-1 edges (where V is the number of
              nodes). At that point, all nodes are connected into a single tree — the MST.
            </Paragraph>

            {/* ── Section 3 ── */}
            <SectionHeading>Kruskal Step by Step</SectionHeading>

            <Paragraph>
              Let&apos;s trace through the algorithm on a graph with 5 nodes (0–4) and edges:
              0-1 (4), 0-2 (1), 2-1 (2), 1-3 (1), 2-3 (5), 3-4 (3).
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

            <Paragraph>
              Tracing our example: Sorted edges = [(0-2, 1), (1-3, 1), (2-1, 2), (3-4, 3), (0-1,
              4), (2-3, 5)].
            </Paragraph>

            <Paragraph>
              Add (0-2, weight 1): nodes 0 and 2 are in different sets → add to MST, union(0,2).
              Add (1-3, weight 1): nodes 1 and 3 are in different sets → add to MST, union(1,3).
              Add (2-1, weight 2): nodes 2 and 1 are in different sets → add to MST, union(0,1,2,3).
              Add (3-4, weight 3): nodes 3 and 4 are in different sets → add to MST, union all.
              Skip (0-1, weight 4): nodes 0 and 1 are now in the same set → would create cycle.
              MST complete: 4 edges for 5 nodes.
            </Paragraph>

            <CalloutBox>
              Final MST edges: (0-2, 1), (1-3, 1), (2-1, 2), (3-4, 3). Total weight = 7. This
              is the minimum cost to connect all 5 nodes.
            </CalloutBox>

            {/* ── Section 4 ── */}
            <SectionHeading>Kruskal Code</SectionHeading>

            <Paragraph>
              Here is a complete Java implementation of Kruskal&apos;s algorithm with a full
              Union-Find inner class. Edges are sorted using Java&apos;s built-in sort, and
              Union-Find uses both path compression and union by rank for maximum efficiency.
            </Paragraph>

            <CodeBlock code={JAVA_CODE} />

            <Paragraph>
              The <strong>UnionFind</strong> class does all the heavy lifting for cycle detection.
              The <strong>find()</strong> method flattens the tree as it searches (path
              compression), and <strong>union()</strong> always attaches the smaller tree under the
              larger one (union by rank). Together these optimizations make each Union-Find
              operation run in amortized nearly O(1) time.
            </Paragraph>

            {/* ── Section 5 ── */}
            <SectionHeading>Complexity Analysis</SectionHeading>

            <SubHeading>Time Complexity</SubHeading>

            <Paragraph>
              The dominant cost in Kruskal&apos;s algorithm is sorting the edges:{' '}
              <strong>O(E log E)</strong>. After sorting, we iterate through each edge once and
              perform two Union-Find operations per edge. With path compression and union by rank,
              each Union-Find operation runs in amortized O(α(V)) time — where α is the inverse
              Ackermann function, which is effectively constant for any practical input size.
            </Paragraph>

            <Paragraph>
              The overall time complexity is therefore <strong>O(E log E)</strong>, which is also
              equivalent to <strong>O(E log V)</strong> since E ≤ V² implies log E ≤ 2 log V.
            </Paragraph>

            <ComplexityTable rows={COMPLEXITY_ROWS} />

            <SubHeading>Space Complexity</SubHeading>

            <Paragraph>
              <strong>O(V)</strong> for the Union-Find arrays (parent and rank), plus O(E) to store
              the sorted edge list. The MST result list holds at most V-1 edges.
              Overall space: <strong>O(V + E)</strong>.
            </Paragraph>

            <CalloutBox>
              Kruskal&apos;s is ideal for sparse graphs (few edges). For dense graphs, Prim&apos;s
              algorithm with an adjacency matrix runs in O(V²) and can be faster in practice.
              Both algorithms always produce a valid MST — they just take different approaches to
              find it.
            </CalloutBox>

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
                You can build a Minimum Spanning Tree!
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
                Kruskal&apos;s algorithm is a beautiful example of greedy thinking — by always
                picking the cheapest safe edge, you&apos;re guaranteed to end up with the globally
                optimal spanning tree. The Union-Find data structure makes this both practical and
                efficient. Now that you understand Kruskal&apos;s, you&apos;re ready to explore
                Prim&apos;s algorithm — another MST approach that grows the tree one node at a time
                rather than one edge at a time.
              </p>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link
                  href="/learn-dsa/prim"
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
                  Next: Prim&apos;s Algorithm →
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
