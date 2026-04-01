import type { Metadata } from "next";
import SortingVisualizer from "@/components/visualizers/sorting/SortingVisualizer";

export const metadata: Metadata = {
  title: "Sorting Algorithms Visualizer",
  description:
    "Interactive step-by-step visualizer for bubble sort, merge sort, quick sort, insertion sort, and selection sort. Watch each algorithm sort in real time.",
};

export default function SortingPage() {
  return <SortingVisualizer />;
}
