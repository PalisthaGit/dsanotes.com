// src/lib/sorting-seo.ts
// SEO metadata for each sorting algorithm's dedicated page.

export interface AlgorithmSEOData {
  slug: string;
  key: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  timeComplexity: { best: string; average: string; worst: string };
  spaceComplexity: string;
  stable: boolean;
  howItWorks: string[];
  useCases: string[];
}

export const SORTING_ALGORITHM_SEO: Record<string, AlgorithmSEOData> = {
  "bubble-sort": {
    slug: "bubble-sort",
    key: "bubble",
    name: "Bubble Sort",
    metaTitle: "Bubble Sort Visualizer — Step-by-Step Animation",
    metaDescription:
      "Visualize bubble sort with step-by-step animation. Learn how bubble sort compares adjacent elements, when it swaps, and why it runs in O(n²) time.",
    intro:
      "Bubble Sort is one of the simplest sorting algorithms. It repeatedly steps through the list, compares adjacent elements, and swaps them if they're in the wrong order. After each pass, the largest unsorted element \"bubbles up\" to its correct position at the end of the array.",
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    stable: true,
    howItWorks: [
      "Start at the beginning of the array.",
      "Compare each pair of adjacent elements.",
      "Swap them if the left element is greater than the right.",
      "After each full pass, the largest unsorted element is in its final position.",
      "Repeat until no swaps occur in a full pass — the array is sorted.",
    ],
    useCases: [
      "Teaching and learning — its simplicity makes it ideal for beginners.",
      "Nearly-sorted arrays — best-case O(n) when only a few elements are out of place.",
      "Small datasets where simplicity matters more than performance.",
    ],
  },

  "merge-sort": {
    slug: "merge-sort",
    key: "merge",
    name: "Merge Sort",
    metaTitle: "Merge Sort Visualizer — Step-by-Step Animation",
    metaDescription:
      "Visualize merge sort with step-by-step animation. See how divide-and-conquer splits and merges subarrays to achieve guaranteed O(n log n) performance.",
    intro:
      "Merge Sort is a divide-and-conquer algorithm that splits the array in half, recursively sorts each half, then merges the sorted halves back together. It guarantees O(n log n) time in all cases, making it one of the most reliable general-purpose sorting algorithms.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(n)",
    stable: true,
    howItWorks: [
      "Divide the array into two halves.",
      "Recursively sort the left half.",
      "Recursively sort the right half.",
      "Merge the two sorted halves by comparing elements one at a time.",
      "The merge step always produces a sorted result.",
    ],
    useCases: [
      "Large datasets requiring guaranteed O(n log n) performance.",
      "Sorting linked lists — merge sort is efficient on linked lists.",
      "External sorting — when data doesn't fit in memory, merge sort handles disk-based sorting well.",
      "When stable sorting is required (preserves relative order of equal elements).",
    ],
  },

  "quick-sort": {
    slug: "quick-sort",
    key: "quick",
    name: "Quick Sort",
    metaTitle: "Quick Sort Visualizer — Step-by-Step Animation",
    metaDescription:
      "Visualize quicksort with step-by-step animation. Learn how partitioning works, why quicksort is fast in practice, and when it degrades to O(n²).",
    intro:
      "Quick Sort is a divide-and-conquer algorithm that picks a pivot element and partitions the array around it — elements smaller than the pivot go left, larger go right. It then recursively sorts each partition. Quick Sort is one of the fastest sorting algorithms in practice due to its excellent cache performance.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(log n)",
    stable: false,
    howItWorks: [
      "Choose a pivot element (last element in this implementation).",
      "Partition: move all elements smaller than the pivot to its left, larger to its right.",
      "The pivot is now in its final sorted position.",
      "Recursively apply the same process to the left and right partitions.",
      "Base case: a partition of 0 or 1 elements is already sorted.",
    ],
    useCases: [
      "General-purpose sorting — fastest in practice for most real-world data.",
      "In-place sorting where extra memory is limited.",
      "Systems where average-case performance matters more than worst-case guarantees.",
    ],
  },

  "insertion-sort": {
    slug: "insertion-sort",
    key: "insertion",
    name: "Insertion Sort",
    metaTitle: "Insertion Sort Visualizer — Step-by-Step Animation",
    metaDescription:
      "Visualize insertion sort with step-by-step animation. See how insertion sort builds a sorted portion one element at a time, and why it excels on small or nearly-sorted arrays.",
    intro:
      "Insertion Sort builds the sorted array one element at a time. It picks each new element and inserts it into its correct position within the already-sorted portion, shifting other elements to make room. It's efficient for small arrays and nearly-sorted data, and is used as the base case in production hybrid algorithms like Timsort.",
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    stable: true,
    howItWorks: [
      "Start with the second element (the first element is trivially sorted).",
      "Pick the current element as the 'key'.",
      "Compare the key with each element in the sorted portion (to its left).",
      "Shift elements that are greater than the key one position to the right.",
      "Insert the key into its correct position.",
      "Repeat for all remaining elements.",
    ],
    useCases: [
      "Small arrays — faster than O(n log n) algorithms for very small n due to low overhead.",
      "Nearly-sorted arrays — best-case O(n) when data is almost in order.",
      "Online sorting — can sort as data arrives, one element at a time.",
      "Often used as the base case in hybrid algorithms like Timsort.",
    ],
  },

  "selection-sort": {
    slug: "selection-sort",
    key: "selection",
    name: "Selection Sort",
    metaTitle: "Selection Sort Visualizer — Step-by-Step Animation",
    metaDescription:
      "Visualize selection sort with step-by-step animation. Learn how selection sort repeatedly finds the minimum element and places it in sorted position.",
    intro:
      "Selection Sort divides the array into a sorted and unsorted region. In each pass, it finds the minimum element in the unsorted region and swaps it to the end of the sorted region. It makes exactly n−1 swaps regardless of input order, making it useful in situations where writes (swaps) are expensive.",
    timeComplexity: { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    stable: false,
    howItWorks: [
      "Find the minimum element in the entire unsorted portion of the array.",
      "Swap it with the first element of the unsorted region.",
      "Expand the sorted region by one position.",
      "Repeat from the new start of the unsorted region.",
      "After n−1 passes, the entire array is sorted.",
    ],
    useCases: [
      "When the number of writes (swaps) must be minimized — selection sort makes at most O(n) swaps.",
      "Small arrays where simplicity of implementation matters.",
      "Memory-constrained environments (O(1) space).",
    ],
  },
};

export const ALGORITHM_SLUGS = Object.keys(SORTING_ALGORITHM_SEO);

export const KEY_TO_SLUG: Record<string, string> = Object.fromEntries(
  Object.values(SORTING_ALGORITHM_SEO).map((algo) => [algo.key, algo.slug]),
);
