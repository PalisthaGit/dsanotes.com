// src/algorithms/types/sortingAlgorithms.ts
//
// ─── HOW TO ADD A NEW SORTING ALGORITHM ──────────────────────────────────────
//
//  1. Create a new file in src/algorithms/utils/sortingAlgorithms/
//     Use any existing file as a template (e.g. bubbleSort.ts)
//
//  2. Implement your sort function, then export a `definition` object:
//
//       export const definition: SortingAlgorithmDefinition = {
//         key: "mySort",          ← unique key, camelCase
//         name: "My Sort",        ← display name shown in the UI
//         func: mySort,           ← your sort function
//       };
//
//  That's it. No imports to add here, no registry to update manually.
//
// ─────────────────────────────────────────────────────────────────────────────

import type { ArrayElement, SortingStep } from "@/algorithms/types/sorting";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface SortingAlgorithmDefinition {
  key: string;
  name: string;
  func: (array: ArrayElement[]) => SortingStep[];
}

// ── Explicit imports (Next.js compatible — no import.meta.glob) ───────────────

import * as bubbleSort from "@/algorithms/utils/sorting-algorithms/bubbleSort";
import * as bucketSort from "@/algorithms/utils/sorting-algorithms/bucketSort";
import * as cocktailSort from "@/algorithms/utils/sorting-algorithms/cocktailSort";
import * as combSort from "@/algorithms/utils/sorting-algorithms/combSort";
import * as countingSort from "@/algorithms/utils/sorting-algorithms/countingSort";
import * as gnomeSort from "@/algorithms/utils/sorting-algorithms/gnomeSort";
import * as insertionSort from "@/algorithms/utils/sorting-algorithms/insertionSort";
import * as mergeSort from "@/algorithms/utils/sorting-algorithms/mergeSort";
import * as oddevenSort from "@/algorithms/utils/sorting-algorithms/oddevenSort";
import * as pancakeSort from "@/algorithms/utils/sorting-algorithms/pancakeSort";
import * as quickSort from "@/algorithms/utils/sorting-algorithms/quickSort";
import * as radixSort from "@/algorithms/utils/sorting-algorithms/radixSort";
import * as selectionSort from "@/algorithms/utils/sorting-algorithms/selectionSort";
import * as shellSort from "@/algorithms/utils/sorting-algorithms/shellSort";
import * as stoogeSort from "@/algorithms/utils/sorting-algorithms/stoogeSort";

const allModules = [
  bubbleSort, bucketSort, cocktailSort, combSort, countingSort,
  gnomeSort, insertionSort, mergeSort, oddevenSort, pancakeSort,
  quickSort, radixSort, selectionSort, shellSort, stoogeSort,
];

// ── Build registry ────────────────────────────────────────────────────────────

export const SORTING_ALGORITHMS: Record<string, SortingAlgorithmDefinition> =
  allModules.reduce(
    (acc, mod) => {
      if (mod.definition) {
        acc[mod.definition.key] = mod.definition;
      }
      return acc;
    },
    {} as Record<string, SortingAlgorithmDefinition>,
  );

export type SortingAlgorithmKey = string;
