import type { Metadata } from 'next'
import Link from 'next/link'
import { TopicRow } from './topic-row'

export const metadata: Metadata = {
  title: 'Learn DSA | Data Structures and Algorithms Explained',
  description:
    'Learn data structures and algorithms with simple explanations and examples. Includes sorting, searching, and more.',
}

interface Topic {
  id: string
  title: string
  description: string
  href: string
  readMin: number
}

interface Section {
  id: string
  label: string
  pillBg: string
  pillColor: string
  topics: Topic[]
}

const SECTIONS: Section[] = [
  {
    id: 'data-structures',
    label: 'Data Structures',
    pillBg: '#fff7ed',
    pillColor: '#c2410c',
    topics: [
      {
        id: 'linked-list',
        title: 'Linked List',
        description: 'A chain of nodes where each node holds a value and a pointer to the next — the foundation of stacks, queues, and more.',
        href: '/learn-dsa/linked-list',
        readMin: 7,
      },
      {
        id: 'stack',
        title: 'Stack',
        description: 'Last-In, First-Out — push and pop from the same end. Used in recursion, undo systems, and expression parsing.',
        href: '/learn-dsa/stack',
        readMin: 5,
      },
      {
        id: 'queue',
        title: 'Queue',
        description: 'First-In, First-Out — enqueue at the back, dequeue from the front. The backbone of BFS and task scheduling.',
        href: '/learn-dsa/queue',
        readMin: 5,
      },
      {
        id: 'hash-map',
        title: 'Hash Map',
        description: 'Stores key-value pairs with O(1) average lookup using a hash function to map keys to array indices.',
        href: '/learn-dsa/hash-map',
        readMin: 8,
      },
      {
        id: 'binary-search-tree',
        title: 'Binary Search Tree',
        description: 'A tree where every left child is smaller and every right child is larger — enables fast search, insert, and delete.',
        href: '/learn-dsa/binary-search-tree',
        readMin: 10,
      },
      {
        id: 'heap',
        title: 'Heap',
        description: 'A complete binary tree that always keeps the smallest (or largest) element at the root — powers priority queues.',
        href: '/learn-dsa/heap',
        readMin: 8,
      },
    ],
  },
  {
    id: 'sorting',
    label: 'Sorting Algorithms',
    pillBg: '#dbeeff',
    pillColor: '#1a6bb5',
    topics: [
      {
        id: 'bubble-sort',
        title: 'Bubble Sort',
        description:
          'The simplest sorting algorithm — repeatedly swaps adjacent elements that are out of order.',
        href: '/learn-dsa/bubble-sort',
        readMin: 5,
      },
      {
        id: 'insertion-sort',
        title: 'Insertion Sort',
        description:
          'Builds the sorted array one element at a time by inserting each into its correct position.',
        href: '/learn-dsa/insertion-sort',
        readMin: 5,
      },
      {
        id: 'merge-sort',
        title: 'Merge Sort',
        description:
          'A divide-and-conquer algorithm that splits, sorts, and merges halves recursively.',
        href: '/learn-dsa/merge-sort',
        readMin: 7,
      },
      {
        id: 'quick-sort',
        title: 'Quick Sort',
        description:
          'Picks a pivot and partitions the array so elements smaller/larger end up on each side.',
        href: '/learn-dsa/quick-sort',
        readMin: 8,
      },
    ],
  },
  {
    id: 'searching',
    label: 'Searching Algorithms',
    pillBg: '#dcfce7',
    pillColor: '#166534',
    topics: [
      {
        id: 'linear-search',
        title: 'Linear Search',
        description:
          'Scans every element one by one until the target is found — works on any list.',
        href: '/learn-dsa/linear-search',
        readMin: 4,
      },
      {
        id: 'binary-search',
        title: 'Binary Search',
        description:
          'Halves the search range each step — requires a sorted array but runs in O(log n).',
        href: '/learn-dsa/binary-search',
        readMin: 6,
      },
    ],
  },
  {
    id: 'pathfinding',
    label: 'Pathfinding Algorithms',
    pillBg: '#ede9fe',
    pillColor: '#5b21b6',
    topics: [
      {
        id: 'bfs',
        title: 'Breadth-First Search',
        description: 'Explores all neighbors layer by layer — guarantees shortest path in unweighted graphs.',
        href: '/learn-dsa/bfs',
        readMin: 10,
      },
      {
        id: 'dfs',
        title: 'Depth-First Search',
        description: 'Dives as deep as possible before backtracking — uses a stack or recursion.',
        href: '/learn-dsa/dfs',
        readMin: 10,
      },
      {
        id: 'dijkstra',
        title: "Dijkstra's Algorithm",
        description: 'Finds shortest paths in weighted graphs using a priority queue — the backbone of GPS navigation.',
        href: '/learn-dsa/dijkstra',
        readMin: 12,
      },
    ],
  },
  {
    id: 'mst',
    label: 'Minimum Spanning Tree',
    pillBg: '#fef3c7',
    pillColor: '#92400e',
    topics: [
      {
        id: 'kruskal',
        title: "Kruskal's Algorithm",
        description: 'Builds MST by picking the cheapest edge that does not create a cycle — uses Union-Find.',
        href: '/learn-dsa/kruskal',
        readMin: 10,
      },
      {
        id: 'prim',
        title: "Prim's Algorithm",
        description: 'Grows the MST one edge at a time from a starting node — uses a priority queue.',
        href: '/learn-dsa/prim',
        readMin: 10,
      },
    ],
  },
  {
    id: 'scc',
    label: 'Strongly Connected Components',
    pillBg: '#fee2e2',
    pillColor: '#991b1b',
    topics: [
      {
        id: 'tarjan',
        title: "Tarjan's Algorithm",
        description: 'Finds all SCCs in one DFS pass using discovery times and low-link values.',
        href: '/learn-dsa/tarjan',
        readMin: 14,
      },
      {
        id: 'kosaraju',
        title: "Kosaraju's Algorithm",
        description: 'Finds SCCs using two DFS passes — once on original graph, once on the reversed graph.',
        href: '/learn-dsa/kosaraju',
        readMin: 12,
      },
    ],
  },
  {
    id: 'string-matching',
    label: 'String Matching',
    pillBg: '#ccfbf1',
    pillColor: '#115e59',
    topics: [
      {
        id: 'naive-string-search',
        title: 'Naive String Search',
        description: 'Slides the pattern across the text one step at a time — simple but O(n\u00d7m) worst case.',
        href: '/learn-dsa/naive-string-search',
        readMin: 8,
      },
      {
        id: 'kmp',
        title: 'KMP Algorithm',
        description: 'Uses a failure function to skip re-comparisons — achieves O(n+m) with preprocessing.',
        href: '/learn-dsa/kmp',
        readMin: 12,
      },
    ],
  },
]

export default function LearnDSAPage() {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }} className="px-4 sm:px-8 py-10">
        {/* Breadcrumb */}
        <div
          style={{
            fontFamily: 'var(--font-nunito)',
            fontWeight: 600,
            fontSize: 12,
            color: '#9ca3af',
            marginBottom: 20,
          }}
        >
          <Link href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>
            Home
          </Link>
          {' / '}
          <span style={{ color: '#6FB5FF' }}>Learn DSA</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <span
            style={{
              display: 'inline-block',
              background: '#dbeeff',
              color: '#1a6bb5',
              fontFamily: 'var(--font-nunito)',
              fontWeight: 700,
              fontSize: 12,
              padding: '4px 12px',
              borderRadius: 20,
              marginBottom: 14,
            }}
          >
            DSA
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-poppins)',
              fontWeight: 700,
              fontSize: 32,
              color: '#0d1117',
              marginBottom: 12,
              lineHeight: 1.25,
            }}
          >
            Learn Data Structures and Algorithms
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-nunito)',
              fontWeight: 600,
              fontSize: 15,
              color: '#6b7280',
              lineHeight: 1.7,
              maxWidth: 660,
            }}
          >
            Data structures and algorithms are the building blocks of efficient software. Mastering
            them helps you write faster code, pass technical interviews, and solve complex problems
            with confidence.
          </p>
        </div>

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 44 }}>
          {SECTIONS.map((section) => (
            <section key={section.id}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span
                  style={{
                    background: section.pillBg,
                    color: section.pillColor,
                    fontFamily: 'var(--font-nunito)',
                    fontWeight: 700,
                    fontSize: 11,
                    padding: '3px 10px',
                    borderRadius: 20,
                  }}
                >
                  {section.label}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {section.topics.map((topic, i) => (
                  <TopicRow key={topic.id} topic={topic} index={i} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
