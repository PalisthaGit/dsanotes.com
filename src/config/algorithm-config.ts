// src/config/algorithm-config.ts
import { MoveRight, Search, SortAsc, Trees } from "lucide-react";
import type { FeatureConfig } from "./feature-config";

export const algorithmConfigs: FeatureConfig[] = [
  {
    id: "sorting-algorithms",
    title: "Sorting Algorithms",
    description:
      "Visualize various sorting algorithms and understand their mechanics.",
    path: "algorithms/sorting",
    status: "active",
    icon: SortAsc,
    type: "Algorithms",
    tags: ["sorting", "algorithm", "algorithms"],
    features: ["Bubble Sort", "Merge Sort", "Quick Sort"],
  },
  {
    id: "searching-algorithms",
    title: "Search Algorithms",
    description:
      "Explore different searching algorithms and see how they operate on data structures.",
    path: "algorithms/searching",
    status: "active",
    icon: Search,
    type: "Algorithms",
    tags: ["search", "algorithm", "algorithms"],
    features: ["Linear Search", "Binary Search"],
  },
  {
    id: "minimum-spanning-tree",
    title: "MST Algorithms",
    description:
      "Learn about Minimum Spanning Tree algorithms and their applications in graph theory.",
    path: "algorithms/mst",
    status: "active",
    icon: Trees,
    type: "Algorithms",
    tags: ["mst", "minimum spanning tree", "algorithm", "algorithms"],
    features: ["Kruskal's Algorithm", "Prim's Algorithm"],
  },
  {
    id: "pathfinding-algorithms",
    title: "Pathfinding Algorithms",
    description:
      "Visualize pathfinding algorithms like Dijkstra's and A* to find the shortest path.",
    path: "algorithms/pathfinding",
    status: "active",
    icon: MoveRight,
    type: "Algorithms",
    tags: ["pathfinding", "algorithm", "algorithms"],
    features: ["Dijkstra's Algorithm", "A* Algorithm"],
  },
  {
    id: "scc-algorithms",
    title: "Strongly Connected Components",
    description:
      "Discover algorithms for finding strongly connected components in directed graphs and their applications.",
    path: "algorithms/scc",
    status: "active",
    icon: MoveRight,
    type: "Algorithms",
    tags: ["graph", "algorithm", "algorithms"],
    features: ["Tarjan's Algorithm", "Kosaraju's Algorithm"],
  },
  {
    id: "string-matching-algorithms",
    title: "String Matching Algorithms",
    description:
      "Understand string matching algorithms and their applications in text processing.",
    path: "algorithms/string-matching",
    status: "active",
    icon: MoveRight,
    type: "Algorithms",
    tags: ["string matching", "algorithm", "algorithms"],
    features: ["Knuth-Morris-Pratt", "Rabin-Karp", "Boyer-Moore"],
  },
];
