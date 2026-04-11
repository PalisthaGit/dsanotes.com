import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnSidebar } from '../sidebar'
import MiniGraphVisualizer from '@/components/visualizers/graph/MiniGraphVisualizer'

export const metadata: Metadata = {
  title: 'Breadth-First Search (BFS) Explained | Learn DSA',
  description:
    'Learn how Breadth-First Search works step by step with examples, code, and complexity analysis. BFS guarantees the shortest path in an unweighted graph.',
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
  'Add the start node to the queue and mark it visited.',
  'Dequeue the front node — if it is the target, done.',
  'Enqueue all unvisited neighbors and mark them visited.',
  'Record each neighbor\'s predecessor for path reconstruction.',
  'Repeat until the queue is empty or the target is found.',
]

const JAVA_CODE = `import java.util.*;

public class BFS {

    // Represent the graph as an adjacency list
    static Map<String, List<String>> graph = new HashMap<>();

    public static void main(String[] args) {
        // Build a simple graph: A -- B -- D
        //                        |         |
        //                        C ------- E
        graph.put("A", Arrays.asList("B", "C"));
        graph.put("B", Arrays.asList("A", "D"));
        graph.put("C", Arrays.asList("A", "E"));
        graph.put("D", Arrays.asList("B", "E"));
        graph.put("E", Arrays.asList("C", "D"));

        String start  = "A";
        String target = "E";

        List<String> path = bfs(start, target);

        if (path != null) {
            System.out.println("Shortest path: " + path);
        } else {
            System.out.println("No path found.");
        }
    }

    static List<String> bfs(String start, String target) {
        // Queue for BFS — processes nodes level by level
        Queue<String> queue = new LinkedList<>();

        // Track visited nodes so we never process one twice
        Set<String> visited = new HashSet<>();

        // Map each node to its predecessor for path reconstruction
        Map<String, String> predecessor = new HashMap<>();

        // Seed the search
        queue.add(start);
        visited.add(start);

        while (!queue.isEmpty()) {
            // Dequeue the next node to explore
            String current = queue.poll();

            // Found the target — reconstruct and return the path
            if (current.equals(target)) {
                return reconstructPath(predecessor, start, target);
            }

            // Explore all neighbors of the current node
            for (String neighbor : graph.getOrDefault(current, Collections.emptyList())) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);          // Mark as visited
                    predecessor.put(neighbor, current); // Remember where we came from
                    queue.add(neighbor);            // Enqueue for later exploration
                }
            }
        }

        // Target was never reached
        return null;
    }

    // Walk backwards through the predecessor map to build the path
    static List<String> reconstructPath(Map<String, String> predecessor,
                                        String start, String target) {
        LinkedList<String> path = new LinkedList<>();
        String current = target;

        while (current != null) {
            path.addFirst(current);          // Prepend to build path in order
            current = predecessor.get(current);
        }

        return path;
    }
}`

const COMPLEXITY_ROWS = [
  { case: 'Best',    value: 'O(1)',   note: 'Target is the start node — found immediately' },
  { case: 'Average', value: 'O(V+E)', note: 'V vertices, E edges — explores level by level' },
  { case: 'Worst',   value: 'O(V+E)', note: 'Must visit every node and every edge to find target' },
  { case: 'Space',   value: 'O(V)',   note: 'Queue and visited set each hold at most V nodes' },
]

export default function BFSPage() {
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
          <span style={{ color: '#6FB5FF' }}>Breadth-First Search</span>
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
              Breadth-First Search (BFS)
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

            {/* Main visualizer */}
            <div style={{ marginBottom: 28 }}>
              <MiniGraphVisualizer algorithm="bfs" category="pathfinding" />
            </div>

            {/* Intro callout */}
            <CalloutBox>
              BFS explores all neighbors at the current distance before moving to the next level. It
              guarantees the shortest path in an unweighted graph — making it one of the most
              important algorithms in computer science.
            </CalloutBox>

            <Paragraph>
              Imagine you&apos;re standing at node A in a graph and want to reach node E. BFS
              doesn&apos;t rush deep into one path — instead, it fans out evenly in all directions,
              visiting every node that is exactly 1 hop away, then 2 hops away, and so on. This
              layer-by-layer expansion is why BFS always finds the shortest route first.
            </Paragraph>

            {/* ── Section 1: How BFS Works ── */}
            <SectionHeading>How BFS Works</SectionHeading>

            <Paragraph>
              BFS uses a <strong>queue</strong> — a First-In, First-Out (FIFO) data structure — to
              keep track of which nodes to visit next. Every time we visit a node, we add all of its
              unvisited neighbors to the back of the queue. We then take the next node off the front
              of the queue and repeat the process.
            </Paragraph>

            <Paragraph>
              Consider a small graph with five nodes:{' '}
              <strong>A, B, C, D, E</strong>. The edges are:
              A–B, A–C, B–D, C–E, D–E. If we start at A and want to reach E, BFS will explore in
              this order:
            </Paragraph>

            <CalloutBox>
              Level 0: A{'\n'}
              Level 1: B, C (neighbors of A){'\n'}
              Level 2: D, E (neighbors of B and C that haven&apos;t been visited yet){'\n'}
              {'\n'}
              BFS reaches E after just 2 hops — the shortest possible path is A → C → E.
            </CalloutBox>

            <Paragraph>
              Watch the visualizer below step through BFS on a graph. Notice how it finishes one
              entire level before moving on to the next.
            </Paragraph>

            <div style={{ marginBottom: 24, marginTop: 8 }}>
              <MiniGraphVisualizer algorithm="bfs" category="pathfinding" />
            </div>

            {/* Sub: The Queue */}
            <SubHeading>The Queue</SubHeading>

            <Paragraph>
              The queue is the heart of BFS. At the start, we place the source node in the queue.
              On every iteration we <strong>dequeue</strong> (remove) the front node, process it,
              and <strong>enqueue</strong> (add) all of its unvisited neighbors to the back.
            </Paragraph>

            <Paragraph>
              Because the queue is FIFO, nodes closer to the source are always dequeued before nodes
              that are farther away. This is exactly what creates the level-by-level traversal
              pattern — you can never reach a node 3 hops away before you have visited every node
              that is only 2 hops away.
            </Paragraph>

            <CalloutBox>
              Queue state during BFS from A on our example graph:{'\n'}
              Start   → [A]{'\n'}
              Dequeue A, enqueue B, C → [B, C]{'\n'}
              Dequeue B, enqueue D   → [C, D]{'\n'}
              Dequeue C, enqueue E   → [D, E]{'\n'}
              Dequeue D (E already in queue) → [E]{'\n'}
              Dequeue E — target found!
            </CalloutBox>

            {/* Sub: Tracking Visited Nodes */}
            <SubHeading>Tracking Visited Nodes</SubHeading>

            <Paragraph>
              Graphs can contain <strong>cycles</strong> — for example, A connects to B and B
              connects back to A. Without tracking which nodes we have already visited, BFS would
              loop forever: enqueue A, dequeue A, enqueue B, dequeue B, enqueue A again...
            </Paragraph>

            <Paragraph>
              We prevent this by maintaining a <strong>visited set</strong>. Before enqueuing any
              neighbor, we check whether it is already in the set. If it is, we skip it. If it
              isn&apos;t, we add it to the set and then enqueue it. Marking nodes at the moment of
              enqueueing (not dequeueing) is important — it stops the same node from being added to
              the queue multiple times from different parents.
            </Paragraph>

            {/* Sub: Finding the Path */}
            <SubHeading>Finding the Path</SubHeading>

            <Paragraph>
              BFS tells us whether a path exists, but to actually <em>recover</em> the shortest
              path we need one more piece of bookkeeping: a <strong>predecessor map</strong>. Every
              time we enqueue a neighbor, we record that its predecessor is the current node.
            </Paragraph>

            <Paragraph>
              When BFS reaches the target, we trace back through the predecessor map — from target
              to start — and reverse the result. This gives us the exact sequence of nodes on the
              shortest path. In Java we can use a{' '}
              <code style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 13 }}>
                LinkedList
              </code>{' '}
              and call{' '}
              <code style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 13 }}>addFirst()</code>{' '}
              to prepend each node, which automatically reverses the order for us.
            </Paragraph>

            {/* ── Section 2: Step by Step ── */}
            <SectionHeading>BFS Step by Step</SectionHeading>

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
                  dangerouslySetInnerHTML={{ __html: step }}
                />
              ))}
            </ol>

            {/* ── Section 3: Code ── */}
            <SectionHeading>BFS Code</SectionHeading>

            <Paragraph>
              The implementation below uses Java&apos;s built-in{' '}
              <code style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 13 }}>
                LinkedList
              </code>{' '}
              as a queue and a{' '}
              <code style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 13 }}>HashSet</code>{' '}
              for the visited set. The graph is represented as an adjacency list using a{' '}
              <code style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 13 }}>HashMap</code>.
              Read through the comments to follow each step.
            </Paragraph>

            <CodeBlock code={JAVA_CODE} />

            {/* ── Section 4: Complexity ── */}
            <SectionHeading>Complexity Analysis</SectionHeading>

            <SubHeading>Time Complexity</SubHeading>

            <Paragraph>
              BFS visits every vertex at most once and traverses every edge at most once. If the
              graph has <strong>V</strong> vertices and <strong>E</strong> edges, the time complexity
              is <strong>O(V + E)</strong>. In the best case — when the target is the starting node
              — BFS terminates in <strong>O(1)</strong> time before ever touching the queue.
            </Paragraph>

            <Paragraph>
              In the worst case, BFS must visit all vertices and all edges before it either finds
              the target or confirms that no path exists. This is still <strong>O(V + E)</strong> —
              linear in the size of the graph — which makes BFS very efficient for sparse graphs.
            </Paragraph>

            <ComplexityTable rows={COMPLEXITY_ROWS} />

            <SubHeading>Space Complexity</SubHeading>

            <Paragraph>
              <strong>O(V) — Linear space.</strong> The queue can hold at most V nodes (one for
              every vertex in the graph). The visited set and the predecessor map also each hold at
              most V entries. So the total extra memory used by BFS grows linearly with the number
              of vertices, regardless of the number of edges.
            </Paragraph>

            <Paragraph>
              In practice, BFS can use significant memory when the graph is wide and heavily
              connected, because all nodes at the current level must be held in the queue
              simultaneously. This is one reason DFS is sometimes preferred for memory-constrained
              environments — though DFS loses the shortest-path guarantee.
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
                BFS is one of the most foundational graph algorithms. Its level-by-level traversal
                guarantees the shortest path in any unweighted graph, and the queue + visited-set
                pattern appears in dozens of real-world systems — from social network friend
                suggestions to GPS navigation. Master BFS and you have a powerful tool in your
                problem-solving toolkit. Next, we&apos;ll look at DFS, which trades the
                shortest-path guarantee for lower memory usage and some unique problem-solving
                abilities.
              </p>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link
                  href="/learn-dsa/dfs"
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
                  Next: DFS →
                </Link>
                <Link
                  href="/visualizer/pathfinding"
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
