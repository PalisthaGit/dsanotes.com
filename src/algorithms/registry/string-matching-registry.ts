// src/algorithms/types/string-matching-registry.ts
//
// ─── HOW TO ADD A NEW STRING MATCHING ALGORITHM ───────────────────────────────
//
//  1. Create a file in:
//       src/algorithms/utils/string-matching-algorithms/
//
//  2. Export a `definition` object:
//
//       export const definition: StringMatchingAlgorithmDefinition = {
//         key: "myAlgorithm",
//         name: "My Algorithm",
//         func: myAlgorithm,
//       };
//
// ─────────────────────────────────────────────────────────────────────────────

import type {
  StringMatchingOptions,
  StringMatchingStep,
} from "@/algorithms/types/string-matching";

export interface StringMatchingAlgorithmDefinition {
  key: string;
  name: string;
  func: (options: StringMatchingOptions) => StringMatchingStep[];
}

// ── Explicit imports (Next.js compatible — no import.meta.glob) ───────────────

import * as ahoCorasick from "@/algorithms/utils/string-matching-algorithms/aho-corasick";
import * as boyerMoore from "@/algorithms/utils/string-matching-algorithms/boyer-moore";
import * as kmp from "@/algorithms/utils/string-matching-algorithms/kmp";
import * as naive from "@/algorithms/utils/string-matching-algorithms/naive";
import * as rabinKarp from "@/algorithms/utils/string-matching-algorithms/rabin-karp";
import * as zAlgorithm from "@/algorithms/utils/string-matching-algorithms/z-algorithm";

const allModules = [ahoCorasick, boyerMoore, kmp, naive, rabinKarp, zAlgorithm];

export const STRING_MATCHING_ALGORITHMS: Record<
  string,
  StringMatchingAlgorithmDefinition
> = allModules.reduce(
  (acc, mod) => {
    if (mod.definition) acc[mod.definition.key] = mod.definition;
    return acc;
  },
  {} as Record<string, StringMatchingAlgorithmDefinition>,
);

export type StringMatchingAlgorithmKey = string;
