// src/algorithms/types/searching-algorithms-registry.ts
//
// ─── HOW TO ADD A NEW SEARCH ALGORITHM ───────────────────────────────────────
//
//  1. Create a new file in src/algorithms/utils/searching-algorithms/
//     Use any existing file as a template (e.g. linearSearch.ts)
//
//  2. Implement your search function, then export a `definition` object:
//
//       export const definition: SearchAlgorithmDefinition = {
//         key: "mySearch",        ← unique key, camelCase
//         name: "My Search",      ← display name shown in the UI
//         func: mySearch,         ← your search function
//       };
//
//  That's it. No imports to add here, no registry to update manually.
//
// ─────────────────────────────────────────────────────────────────────────────

import type { SearchStep } from "@/algorithms/types/searching";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface SearchAlgorithmDefinition {
  key: string;
  name: string;
  func: (array: number[], target: number) => SearchStep[];
}

// ── Explicit imports (Next.js compatible — no import.meta.glob) ───────────────

import * as binarySearch from "@/algorithms/utils/searching-algorithms/binarySearch";
import * as exponentialSearch from "@/algorithms/utils/searching-algorithms/exponentialSearch";
import * as fibonacciSearch from "@/algorithms/utils/searching-algorithms/fibonacciSearch";
import * as interpolationSearch from "@/algorithms/utils/searching-algorithms/interpolationSearch";
import * as jumpSearch from "@/algorithms/utils/searching-algorithms/jumpSearch";
import * as linearSearch from "@/algorithms/utils/searching-algorithms/linearSearch";
import * as ternarySearch from "@/algorithms/utils/searching-algorithms/ternarySearch";

const allModules = [
  binarySearch, exponentialSearch, fibonacciSearch, interpolationSearch,
  jumpSearch, linearSearch, ternarySearch,
];

// ── Build registry ────────────────────────────────────────────────────────────

export const SEARCH_ALGORITHMS: Record<string, SearchAlgorithmDefinition> =
  allModules.reduce(
    (acc, mod) => {
      if (mod.definition) {
        acc[mod.definition.key] = mod.definition;
      }
      return acc;
    },
    {} as Record<string, SearchAlgorithmDefinition>,
  );

export type SearchAlgorithmKey = string;
