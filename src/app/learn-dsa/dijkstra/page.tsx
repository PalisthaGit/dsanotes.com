import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnSidebar } from '../sidebar'
import MiniGraphVisualizer from '@/components/visualizers/graph/MiniGraphVisualizer'

export const metadata: Metadata = {
  title: "Dijkstra's Algorithm Explained | Learn DSA",
  description:
    "Learn how Dijkstra's algorithm finds shortest paths in a weighted graph, with step-by-step examples, Java code, and complexity analysis.",
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
  'Set source distance to 0 and all others to infinity. Add source to the priority queue.',
  'Pop the node with the smallest known distance.',
  'For each neighbor, check if going through the current node gives a shorter path.',
  'If yes, update the neighbor\'s distance and add it to the priority queue.',
  'Mark the current node as visited — its shortest distance is now final.',
  'Repeat until the priority queue is empty.',
]

const JAVA_CODE = `import java.util.*;

public class Dijkstra {

    // Represents a weighted edge in the graph
    static class Edge {
        int destination, weight;
        Edge(int destination, int weight) {
            this.destination = destination;
            this.weight = weight;
        }
    }

    // Represents a node entry in the priority queue
    static class Node implements Comparable<Node> {
        int id, distance;
        Node(int id, int distance) {
            this.id = id;
            this.distance = distance;
        }

        @Override
        public int compareTo(Node other) {
            return Integer.compare(this.distance, other.distance);
        }
    }

    public static int[] dijkstra(List<List<Edge>> graph, int source) {
        int n = graph.size();
        int[] dist = new int[n];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[source] = 0;

        // Min-heap priority queue: always process the closest node first
        PriorityQueue<Node> pq = new PriorityQueue<>();
        pq.offer(new Node(source, 0));

        while (!pq.isEmpty()) {
            Node current = pq.poll();
            int u = current.id;

            // Skip if we already found a shorter path to this node
            if (current.distance > dist[u]) continue;

            // Relax all edges from current node
            for (Edge edge : graph.get(u)) {
                int v = edge.destination;
                int newDist = dist[u] + edge.weight;

                // If a shorter path is found, update and enqueue
                if (newDist < dist[v]) {
                    dist[v] = newDist;
                    pq.offer(new Node(v, newDist));
                }
            }
        }

        return dist; // Shortest distances from source to all nodes
    }

    public static void main(String[] args) {
        int n = 5; // Number of nodes (0 to 4)
        List<List<Edge>> graph = new ArrayList<>();
        for (int i = 0; i < n; i++) graph.add(new ArrayList<>());

        // Add weighted edges (undirected)
        graph.get(0).add(new Edge(1, 4));
        graph.get(0).add(new Edge(2, 1));
        graph.get(2).add(new Edge(1, 2));
        graph.get(1).add(new Edge(3, 1));
        graph.get(2).add(new Edge(3, 5));
        graph.get(3).add(new Edge(4, 3));

        int[] distances = dijkstra(graph, 0);

        System.out.println("Shortest distances from node 0:");
        for (int i = 0; i < n; i++) {
            System.out.println("  Node " + i + " -> " + distances[i]);
        }
    }
}`

const COMPLEXITY_ROWS = [
  {
    case: 'Best',
    value: 'O((V+E) log V)',
    note: 'With binary heap — sparse graphs',
  },
  {
    case: 'Average',
    value: 'O((V+E) log V)',
    note: 'Standard implementation with priority queue',
  },
  {
    case: 'Worst',
    value: 'O(V²)',
    note: 'Without priority queue (naive implementation)',
  },
]

export default function DijkstraPage() {
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
          <span style={{ color: '#6FB5FF' }}>Dijkstra&apos;s Algorithm</span>
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
                background: '#ede9fe',
                color: '#5b21b6',
                fontFamily: 'var(--font-nunito)',
                fontWeight: 700,
                fontSize: 11,
                padding: '4px 12px',
                borderRadius: 20,
                marginBottom: 14,
                letterSpacing: '0.05em',
              }}
            >
              PATHFINDING ALGORITHMS
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
              Dijkstra&apos;s Algorithm
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

            {/* Inbuilt visualizer */}
            <div style={{ marginBottom: 28 }}>
              <MiniGraphVisualizer algorithm="dijkstra" category="pathfinding" />
            </div>

            {/* Intro callout */}
            <CalloutBox>
              Dijkstra&apos;s algorithm finds the shortest path from a source node to all other
              nodes in a weighted graph. Unlike BFS (which works for unweighted graphs), Dijkstra
              considers edge weights — meaning it accounts for the cost of traveling along each
              connection, not just the number of hops.
            </CalloutBox>

            <Paragraph>
              Imagine you&apos;re planning a road trip and you want to find the fastest route between
              cities. The roads have different distances, so simply counting the number of roads you
              cross isn&apos;t enough. You need to account for the actual travel distance on each
              road. That&apos;s exactly the problem Dijkstra&apos;s algorithm solves.
            </Paragraph>

            <Paragraph>
              Proposed by computer scientist Edsger W. Dijkstra in 1956, this algorithm has become
              the backbone of GPS navigation, network routing, and countless real-world systems that
              need to find optimal paths efficiently.
            </Paragraph>

            {/* ── Section 1 ── */}
            <SectionHeading>How Dijkstra Works</SectionHeading>

            <Paragraph>
              At its core, Dijkstra&apos;s algorithm is a <strong>greedy algorithm</strong> — it
              always makes the locally optimal choice at each step. It maintains a set of tentative
              distances from the source node to every other node, and it gradually refines those
              distances until it finds the true shortest paths.
            </Paragraph>

            <Paragraph>
              The key idea is simple: always process the node that currently has the smallest known
              distance from the source. When you process a node, you look at all its neighbors and
              ask: &quot;Can I reach this neighbor faster by going through the current node?&quot;
              If yes, update the neighbor&apos;s distance. This process of updating distances is
              called <strong>relaxing an edge</strong>.
            </Paragraph>

            <div style={{ marginBottom: 24, marginTop: 8 }}>
              <MiniGraphVisualizer algorithm="dijkstra" category="pathfinding" />
            </div>

            <SubHeading>The Priority Queue</SubHeading>

            <Paragraph>
              To efficiently always pick the node with the smallest tentative distance, Dijkstra
              uses a <strong>min-heap priority queue</strong>. Think of it as a waiting room where
              every person holds a number — but instead of serving people in the order they arrived,
              you always serve the person with the lowest number first.
            </Paragraph>

            <Paragraph>
              In Dijkstra&apos;s algorithm, each entry in the priority queue is a pair: (node,
              current tentative distance). The priority queue ensures that every time we pick the
              next node to process, we get the one closest to the source — which is exactly what the
              greedy strategy requires.
            </Paragraph>

            <CalloutBox>
              A min-heap priority queue lets us find and remove the minimum-distance node in
              O(log V) time, instead of O(V) with a simple array scan. This is what makes
              Dijkstra efficient on large graphs.
            </CalloutBox>

            <SubHeading>Relaxing Edges</SubHeading>

            <Paragraph>
              Edge relaxation is the heart of Dijkstra&apos;s algorithm. When we visit a node{' '}
              <strong>u</strong>, we look at each of its neighbors <strong>v</strong> and check:
            </Paragraph>

            <Paragraph>
              <strong>dist[u] + weight(u, v) &lt; dist[v]?</strong>
            </Paragraph>

            <Paragraph>
              If this is true, it means we&apos;ve found a shorter way to reach <strong>v</strong>{' '}
              by going through <strong>u</strong>. We update dist[v] with this shorter distance and
              add <strong>v</strong> back to the priority queue with its updated distance.
            </Paragraph>

            <Paragraph>
              We keep relaxing edges until every node has been finalized — meaning no shorter path
              to it can possibly be found. At that point, the dist[] array holds the true shortest
              distance from the source to every reachable node.
            </Paragraph>

            <SubHeading>Why It&apos;s Greedy</SubHeading>

            <Paragraph>
              Dijkstra&apos;s algorithm is greedy because it never reconsiders a decision. Once a
              node is marked as visited (finalized), its shortest distance is permanently locked in.
              The algorithm trusts that the smallest known distance at any point is the true
              shortest — and with non-negative edge weights, this is always correct.
            </Paragraph>

            <Paragraph>
              Here&apos;s the intuition: if all edge weights are non-negative, then going
              further along the graph can only increase the distance. So the first time we pop a
              node from the priority queue, we know we&apos;ve found the cheapest way to reach it.
              There&apos;s no way a future path could be shorter when all remaining edges have
              non-negative weights.
            </Paragraph>

            <CalloutBox>
              Important: Dijkstra&apos;s algorithm does NOT work with negative edge weights. If
              your graph has negative weights, use the Bellman-Ford algorithm instead.
            </CalloutBox>

            {/* ── Section 2 ── */}
            <SectionHeading>Dijkstra Step by Step</SectionHeading>

            <Paragraph>
              Let&apos;s trace through the algorithm on a small example graph with 5 nodes (0–4)
              and weighted edges. The source node is node 0.
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
              Let&apos;s say the graph has these edges: 0→1 (weight 4), 0→2 (weight 1), 2→1
              (weight 2), 1→3 (weight 1), 2→3 (weight 5), 3→4 (weight 3).
            </Paragraph>

            <Paragraph>
              Starting from node 0: dist = [0, ∞, ∞, ∞, ∞]. We process node 0, relax edges to
              node 1 (dist 4) and node 2 (dist 1). Next, node 2 has the smallest distance (1).
              We relax: node 1 becomes dist 3 (1+2), node 3 becomes dist 6 (1+5). Next we process
              node 1 (dist 3), relaxing to node 3: dist 4 (3+1). Then node 3 (dist 4), relaxing
              to node 4: dist 7 (4+3). Final shortest distances: [0, 3, 1, 4, 7].
            </Paragraph>

            <CalloutBox>
              Final answer: From node 0 — node 1 costs 3, node 2 costs 1, node 3 costs 4, node
              4 costs 7. The algorithm explored only the most promising paths at each step.
            </CalloutBox>

            {/* ── Section 3 ── */}
            <SectionHeading>Dijkstra Code</SectionHeading>

            <Paragraph>
              Here is a complete Java implementation of Dijkstra&apos;s algorithm using a
              PriorityQueue. The graph is stored as an adjacency list, and each edge carries a
              weight. The algorithm returns an array of shortest distances from the source to every
              other node.
            </Paragraph>

            <CodeBlock code={JAVA_CODE} />

            <Paragraph>
              The inner <strong>Node</strong> class implements <strong>Comparable</strong> so the
              PriorityQueue can automatically order nodes by their current tentative distance. The
              check <strong>if (current.distance &gt; dist[u]) continue;</strong> skips stale
              entries — nodes that were added to the queue before we found a shorter path to them.
            </Paragraph>

            {/* ── Section 4 ── */}
            <SectionHeading>Complexity Analysis</SectionHeading>

            <SubHeading>Time Complexity</SubHeading>

            <Paragraph>
              <strong>With a binary heap (PriorityQueue):</strong> Each node is added to and
              removed from the priority queue at most once — O(V log V). Each edge triggers at most
              one decrease-key operation — O(E log V). Total: <strong>O((V+E) log V)</strong>.
            </Paragraph>

            <Paragraph>
              <strong>Without a priority queue (naive array scan):</strong> Finding the minimum
              distance node takes O(V) time each round, and we do this V times. Total:{' '}
              <strong>O(V²)</strong>. This is actually faster for dense graphs where E ≈ V².
            </Paragraph>

            <Paragraph>
              <strong>With a Fibonacci heap:</strong> Theoretically achieves O(E + V log V), but
              is rarely used in practice due to implementation complexity.
            </Paragraph>

            <ComplexityTable rows={COMPLEXITY_ROWS} />

            <SubHeading>Space Complexity</SubHeading>

            <Paragraph>
              <strong>O(V + E)</strong> — We store the adjacency list (O(V + E)), the distance
              array (O(V)), and the priority queue which holds at most O(E) entries in the worst
              case (when many stale entries accumulate before being skipped).
            </Paragraph>

            <CalloutBox>
              Remember: Dijkstra only works on graphs with non-negative edge weights. For graphs
              with negative weights, use Bellman-Ford (O(VE)) instead. For all-pairs shortest
              paths, consider Floyd-Warshall.
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
                You understand shortest paths!
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
                Dijkstra&apos;s algorithm is the backbone of GPS navigation, internet routing
                protocols (like OSPF), and game AI pathfinding. It&apos;s an elegant combination of
                the greedy strategy and the priority queue data structure. Once you&apos;re
                comfortable with Dijkstra, you&apos;re ready to explore other graph algorithms like
                Kruskal&apos;s MST, which takes a completely different approach to building optimal
                graph structures.
              </p>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link
                  href="/learn-dsa/kruskal"
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
                  Next: Kruskal&apos;s MST →
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
