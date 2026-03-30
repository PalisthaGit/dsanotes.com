// src/algorithms/types/graph-algorithms-registry.ts
//
// ─── HOW TO ADD A NEW GRAPH ALGORITHM ────────────────────────────────────────
//
//  1. Create a new file in the appropriate subfolder:
//       src/algorithms/utils/graph-algorithms/mst-algorithms/
//       src/algorithms/utils/graph-algorithms/pathfinding-algorithms/
//       src/algorithms/utils/graph-algorithms/scc-algorithms/
//       src/algorithms/utils/graph-algorithms/traversal-algorithms/
//
//  2. Implement your algorithm, then export a `definition` object:
//
//       export const definition: GraphAlgorithmDefinition = {
//         key: "myAlgorithm",
//         name: "My Algorithm",
//         category: "mst",           ← "mst" | "pathfinding" | "scc" | "traversal"
//         func: myAlgorithm,
//       };
//
//  That's it. No imports to add here, no registry to update manually.
//
// ─────────────────────────────────────────────────────────────────────────────

import type {
  GraphAlgorithmOptions,
  GraphData,
  GraphStep,
} from "@/algorithms/types/graph";

// ── Types ─────────────────────────────────────────────────────────────────────

export type GraphAlgorithmCategory =
  | "mst"
  | "pathfinding"
  | "scc"
  | "traversal";

export interface GraphAlgorithmDefinition {
  key: string;
  name: string;
  category: GraphAlgorithmCategory;
  func: (graph: GraphData, options?: GraphAlgorithmOptions) => GraphStep[];
}

// ── Explicit imports (Next.js compatible — no import.meta.glob) ───────────────

import * as boruvka from "@/algorithms/utils/graph-algorithms/mst-algorithms/boruvka";
import * as kruskal from "@/algorithms/utils/graph-algorithms/mst-algorithms/kruskal";
import * as prim from "@/algorithms/utils/graph-algorithms/mst-algorithms/prim";
import * as reverseDelete from "@/algorithms/utils/graph-algorithms/mst-algorithms/reverse-delete";
import * as aStar from "@/algorithms/utils/graph-algorithms/pathfinding-algorithms/a-star";
import * as bellmanFord from "@/algorithms/utils/graph-algorithms/pathfinding-algorithms/bellman-ford";
import * as bfs from "@/algorithms/utils/graph-algorithms/pathfinding-algorithms/bfs";
import * as dfs from "@/algorithms/utils/graph-algorithms/pathfinding-algorithms/dfs";
import * as dijkstra from "@/algorithms/utils/graph-algorithms/pathfinding-algorithms/dijkstra";
import * as kosaraju from "@/algorithms/utils/graph-algorithms/scc-algorithms/kosaraju";
import * as tarjan from "@/algorithms/utils/graph-algorithms/scc-algorithms/tarjan";

const allModules = [
  boruvka, kruskal, prim, reverseDelete,
  aStar, bellmanFord, bfs, dfs, dijkstra,
  kosaraju, tarjan,
];

// ── Build registry ────────────────────────────────────────────────────────────

export const GRAPH_ALGORITHMS: Record<string, GraphAlgorithmDefinition> =
  allModules.reduce(
    (acc, mod) => {
      if (mod.definition) {
        acc[mod.definition.key] = mod.definition;
      }
      return acc;
    },
    {} as Record<string, GraphAlgorithmDefinition>,
  );

// ── Per-category helpers ──────────────────────────────────────────────────────

export function getAlgorithmsByCategory(
  category: GraphAlgorithmCategory,
): GraphAlgorithmDefinition[] {
  return Object.values(GRAPH_ALGORITHMS).filter(
    (def) => def.category === category,
  );
}

export type GraphAlgorithmKey = string;
