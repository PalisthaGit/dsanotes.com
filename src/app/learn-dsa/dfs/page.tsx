import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnSidebar } from '../sidebar'
import MiniGraphVisualizer from '@/components/visualizers/graph/MiniGraphVisualizer'

export const metadata: Metadata = {
  title: 'Depth-First Search (DFS) Explained | Learn DSA',
  description:
    'Learn how Depth-First Search works step by step with examples, recursive and iterative code, and complexity analysis.',
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
  'Push the start node onto the stack and mark it visited.',
  'Pop the top node — if it is the target, done.',
  'Push all unvisited neighbors onto the stack and mark them visited.',
  'If a node has no unvisited neighbors, backtrack by popping to the previous node.',
  'Repeat until the stack is empty or the target is found.',
]

const JAVA_CODE_RECURSIVE = `import java.util.*;

public class DFSRecursive {

    // Graph represented as an adjacency list
    static Map<String, List<String>> graph = new HashMap<>();
    static Set<String> visited = new HashSet<>();
    static Map<String, String> predecessor = new HashMap<>();

    public static void main(String[] args) {
        // Build the graph: A -- B -- D
        //                   |         |
        //                   C ------- E
        graph.put("A", Arrays.asList("B", "C"));
        graph.put("B", Arrays.asList("A", "D"));
        graph.put("C", Arrays.asList("A", "E"));
        graph.put("D", Arrays.asList("B", "E"));
        graph.put("E", Arrays.asList("C", "D"));

        // Run DFS starting from A, looking for E
        dfs("A", "E");

        // Reconstruct path from predecessor map
        List<String> path = reconstructPath("A", "E");
        System.out.println("DFS path found: " + path);
    }

    // Recursive DFS — the call stack IS the stack
    static boolean dfs(String current, String target) {
        visited.add(current); // Mark as visited

        if (current.equals(target)) {
            return true; // Target found!
        }

        // Explore each neighbor recursively
        for (String neighbor : graph.getOrDefault(current, Collections.emptyList())) {
            if (!visited.contains(neighbor)) {
                predecessor.put(neighbor, current); // Track where we came from
                if (dfs(neighbor, target)) {
                    return true; // Propagate success back up
                }
            }
        }

        return false; // This branch did not lead to the target
    }

    static List<String> reconstructPath(String start, String target) {
        LinkedList<String> path = new LinkedList<>();
        String current = target;
        while (current != null) {
            path.addFirst(current);
            current = predecessor.get(current);
        }
        return path;
    }
}`

const JAVA_CODE_ITERATIVE = `import java.util.*;

public class DFSIterative {

    static Map<String, List<String>> graph = new HashMap<>();

    public static void main(String[] args) {
        graph.put("A", Arrays.asList("B", "C"));
        graph.put("B", Arrays.asList("A", "D"));
        graph.put("C", Arrays.asList("A", "E"));
        graph.put("D", Arrays.asList("B", "E"));
        graph.put("E", Arrays.asList("C", "D"));

        List<String> path = dfs("A", "E");
        System.out.println("DFS path found: " + path);
    }

    static List<String> dfs(String start, String target) {
        // Explicit stack replaces the call stack of the recursive version
        Deque<String> stack = new ArrayDeque<>();
        Set<String> visited = new HashSet<>();
        Map<String, String> predecessor = new HashMap<>();

        stack.push(start);  // Push starting node
        visited.add(start);

        while (!stack.isEmpty()) {
            String current = stack.pop(); // Pop top of stack (LIFO)

            if (current.equals(target)) {
                return reconstructPath(predecessor, start, target);
            }

            // Push unvisited neighbors — they will be explored next
            for (String neighbor : graph.getOrDefault(current, Collections.emptyList())) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    predecessor.put(neighbor, current);
                    stack.push(neighbor); // LIFO: last pushed is first explored
                }
            }
        }

        return null; // No path found
    }

    static List<String> reconstructPath(Map<String, String> predecessor,
                                        String start, String target) {
        LinkedList<String> path = new LinkedList<>();
        String current = target;
        while (current != null) {
            path.addFirst(current);
            current = predecessor.get(current);
        }
        return path;
    }
}`

const COMPLEXITY_ROWS = [
  { case: 'Best',    value: 'O(1)',   note: 'Target is the start node — found immediately' },
  { case: 'Average', value: 'O(V+E)', note: 'V vertices, E edges — must follow each path until found or exhausted' },
  { case: 'Worst',   value: 'O(V+E)', note: 'Target is the last node visited or does not exist' },
  { case: 'Space',   value: 'O(V)',   note: 'Stack depth and visited set each hold at most V nodes' },
]

export default function DFSPage() {
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
          <span style={{ color: '#6FB5FF' }}>Depth-First Search</span>
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
              Depth-First Search (DFS)
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
              <MiniGraphVisualizer algorithm="dfs" category="pathfinding" />
            </div>

            {/* Intro callout */}
            <CalloutBox>
              DFS dives deep into a graph, exploring as far as possible down each branch before
              backtracking. It uses a stack (or recursion) instead of a queue, which gives it a
              very different exploration pattern from BFS — and makes it the right tool for a
              different set of problems.
            </CalloutBox>

            <Paragraph>
              Think of DFS like exploring a maze. You pick a corridor and follow it as far as it
              goes. When you hit a dead end, you backtrack to the last junction and try the next
              corridor. You keep going until you find the exit or have explored every passage.
            </Paragraph>

            {/* ── Section 1: How DFS Works ── */}
            <SectionHeading>How DFS Works</SectionHeading>

            <Paragraph>
              DFS uses a <strong>stack</strong> — a Last-In, First-Out (LIFO) data structure — to
              decide which node to visit next. Each time we visit a node, we push all of its
              unvisited neighbors onto the stack. Because the stack is LIFO, we immediately dive
              into the most recently discovered neighbor rather than processing things in order of
              discovery like BFS does.
            </Paragraph>

            <Paragraph>
              Consider the same five-node graph used in the BFS article:{' '}
              <strong>A, B, C, D, E</strong> with edges A–B, A–C, B–D, C–E, D–E. Starting at A,
              DFS might explore in this order (depends on neighbor ordering):
            </Paragraph>

            <CalloutBox>
              Visit A → push B, C{'\n'}
              Pop C → push E (C&apos;s unvisited neighbor){'\n'}
              Pop E — target found! Path: A → C → E{'\n'}
              {'\n'}
              DFS found E after 2 hops — but it is NOT guaranteed to be the shortest path.
              A different neighbor ordering could have sent DFS down A → B → D → E (3 hops) first.
            </CalloutBox>

            <Paragraph>
              Watch the visualizer to see DFS plunge along one path at a time, backtracking only
              when it runs out of unvisited neighbors.
            </Paragraph>

            <div style={{ marginBottom: 24, marginTop: 8 }}>
              <MiniGraphVisualizer algorithm="dfs" category="pathfinding" />
            </div>

            {/* Sub: The Stack */}
            <SubHeading>The Stack</SubHeading>

            <Paragraph>
              The key difference between BFS and DFS is the data structure they use. BFS uses a
              <strong> queue</strong> (FIFO) — the first node added is the first explored. DFS uses
              a <strong>stack</strong> (LIFO) — the last node added is the first explored.
            </Paragraph>

            <Paragraph>
              This small change in data structure completely changes the traversal pattern. With a
              queue, exploration fans outward level by level. With a stack, exploration dives as
              deep as possible along one path before coming back to try alternatives.
            </Paragraph>

            <CalloutBox>
              BFS uses a Queue → explores neighbors breadth-first (level by level){'\n'}
              DFS uses a Stack → explores neighbors depth-first (dive deep, then backtrack)
            </CalloutBox>

            {/* Sub: Backtracking */}
            <SubHeading>Backtracking</SubHeading>

            <Paragraph>
              Backtracking is what makes DFS unique. When DFS reaches a node with no unvisited
              neighbors — a dead end — it simply pops back to the previous node on the stack and
              tries a different neighbor from there.
            </Paragraph>

            <Paragraph>
              In the recursive version, backtracking happens automatically: when a recursive call
              returns, the program continues from wherever it was before that call. The call stack
              itself acts as the history of where we have been, so no extra bookkeeping is needed.
            </Paragraph>

            <Paragraph>
              In the iterative version, we maintain an explicit stack. When we pop a node and find
              no unvisited neighbors to push, the next pop returns us to a node we visited earlier —
              effectively backtracking to the most recent junction that still has unexplored paths.
            </Paragraph>

            {/* Sub: Recursive vs Iterative */}
            <SubHeading>Recursive vs Iterative</SubHeading>

            <Paragraph>
              DFS can be implemented in two equivalent ways:
            </Paragraph>

            <Paragraph>
              <strong>Recursive DFS</strong> is the more elegant and common approach. We call the
              DFS function on the starting node. Inside, we loop over neighbors and call DFS
              recursively on each unvisited one. The operating system&apos;s call stack does the
              heavy lifting — each function call represents one level of depth, and returning from
              the function is the backtrack step. The code is compact and easy to read.
            </Paragraph>

            <Paragraph>
              <strong>Iterative DFS</strong> replaces the call stack with an explicit{' '}
              <code style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 13 }}>Deque</code> (or
              any stack structure). It is preferred when the graph is very deep, because recursion
              on very deep graphs can cause a{' '}
              <code style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 13 }}>
                StackOverflowError
              </code>{' '}
              in Java. With an explicit stack you control the memory and avoid that limit.
            </Paragraph>

            {/* ── Section 2: DFS vs BFS ── */}
            <SectionHeading>DFS vs BFS</SectionHeading>

            <Paragraph>
              DFS and BFS are both fundamental graph traversal algorithms, but they have different
              strengths and trade-offs. Choosing between them depends on your problem.
            </Paragraph>

            <div style={{ overflowX: 'auto', marginBottom: 24 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f0f7ff' }}>
                    {['Property', 'BFS', 'DFS'].map((h) => (
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
                    ['Data structure', 'Queue (FIFO)', 'Stack (LIFO)'],
                    ['Shortest path', 'Yes (unweighted graphs)', 'No — not guaranteed'],
                    ['Memory usage', 'Higher — holds entire frontier', 'Lower — holds one path'],
                    ['Traversal pattern', 'Level by level (broad)', 'Branch by branch (deep)'],
                    ['Best for', 'Shortest path, level-order problems', 'Cycle detection, topological sort, puzzles'],
                    ['Implementation', 'Iterative (queue)', 'Recursive or iterative (stack)'],
                  ].map(([prop, bfs, dfs], i) => (
                    <tr key={prop} style={{ background: i % 2 === 0 ? '#ffffff' : '#f8fbff' }}>
                      <td style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 13, color: '#0d1117', padding: '10px 16px', border: '0.5px solid #e5e7eb' }}>{prop}</td>
                      <td style={{ fontFamily: 'var(--font-nunito)', fontWeight: 600, fontSize: 13, color: '#374151', padding: '10px 16px', border: '0.5px solid #e5e7eb' }}>{bfs}</td>
                      <td style={{ fontFamily: 'var(--font-nunito)', fontWeight: 600, fontSize: 13, color: '#374151', padding: '10px 16px', border: '0.5px solid #e5e7eb' }}>{dfs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Paragraph>
              Use <strong>BFS</strong> when you need the shortest path or want to process nodes
              level by level (e.g., finding the closest friend in a social network, or the fewest
              moves to solve a puzzle). Use <strong>DFS</strong> when memory is limited, when you
              need to detect cycles, when you&apos;re doing topological sorting, or when you want
              to exhaustively explore all paths (e.g., solving mazes, generating permutations).
            </Paragraph>

            {/* ── Section 3: Step by Step ── */}
            <SectionHeading>DFS Algorithm (Step by Step)</SectionHeading>

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

            {/* ── Section 4: Code ── */}
            <SectionHeading>DFS Code</SectionHeading>

            <SubHeading>Recursive DFS</SubHeading>

            <Paragraph>
              The recursive implementation is the most natural way to express DFS. The function
              calls itself for each unvisited neighbor, and returning from the call is the
              backtrack. Java&apos;s call stack acts as the implicit DFS stack.
            </Paragraph>

            <CodeBlock code={JAVA_CODE_RECURSIVE} />

            <SubHeading>Iterative DFS</SubHeading>

            <Paragraph>
              The iterative version uses an explicit{' '}
              <code style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 13 }}>Deque</code> as a
              stack. This avoids potential{' '}
              <code style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 13 }}>
                StackOverflowError
              </code>{' '}
              issues on very deep graphs and gives you full control over the traversal. Notice how
              the only structural difference from BFS is{' '}
              <code style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 13 }}>stack.push</code>{' '}
              /{' '}
              <code style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 13 }}>stack.pop</code>{' '}
              instead of{' '}
              <code style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 13 }}>queue.add</code>{' '}
              /{' '}
              <code style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 13 }}>queue.poll</code>.
            </Paragraph>

            <CodeBlock code={JAVA_CODE_ITERATIVE} />

            {/* ── Section 5: Complexity ── */}
            <SectionHeading>Complexity Analysis</SectionHeading>

            <SubHeading>Time Complexity</SubHeading>

            <Paragraph>
              Like BFS, DFS visits every vertex at most once and traverses every edge at most once.
              The total time complexity is therefore <strong>O(V + E)</strong>, where V is the
              number of vertices and E is the number of edges.
            </Paragraph>

            <Paragraph>
              In the best case, the target happens to be the very first node explored (the starting
              node or a near neighbor), giving <strong>O(1)</strong>. In the worst case, DFS must
              traverse the entire graph before finding the target or determining it is unreachable.
            </Paragraph>

            <ComplexityTable rows={COMPLEXITY_ROWS} />

            <SubHeading>Space Complexity</SubHeading>

            <Paragraph>
              <strong>O(V) — Linear space.</strong> In the recursive version, the call stack can
              grow as deep as the longest path in the graph — up to V frames deep for a graph that
              is essentially a chain. In the iterative version, the explicit stack also holds at
              most V nodes. The visited set adds another O(V).
            </Paragraph>

            <Paragraph>
              In practice, DFS often uses <em>less</em> memory than BFS on wide graphs, because BFS
              must hold the entire frontier (all nodes at the current level) in its queue, while DFS
              only needs to remember the nodes along the current path from root to the active node.
              On a deep, narrow graph the difference disappears, but on a shallow, highly connected
              graph DFS is noticeably more memory-efficient.
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
                DFS is a powerful and flexible algorithm. Its deep-dive, backtrack pattern makes it
                the natural choice for cycle detection, topological sorting, generating all possible
                paths, and solving constraint-satisfaction puzzles. Together with BFS, DFS forms the
                foundation of nearly all advanced graph algorithms. Next, we&apos;ll look at
                Dijkstra&apos;s algorithm — which handles weighted graphs and finds the true
                shortest path even when edges have different costs.
              </p>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link
                  href="/learn-dsa/dijkstra"
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
                  Next: Dijkstra →
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
