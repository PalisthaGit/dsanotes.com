"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

// ─── Types ──────────────────────────────────────────────────────────────────────

interface Step {
  array: number[];
  states: Record<number, string>;
  comparisons: number;
  swaps: number;
}

// ─── Helpers ────────────────────────────────────────────────────────────────────

function randomArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
}

function getBarColor(state: string | undefined): string {
  switch (state) {
    case "comparing": return "#f472b6";
    case "sorted":    return "#4ade80";
    case "pivot":     return "#facc15";
    case "merging":   return "#a78bfa";
    case "swapping":  return "#fb923c";
    default:          return "#6FB5FF";
  }
}

function buildSortedStates(sorted: Set<number>): Record<number, string> {
  const s: Record<number, string> = {};
  for (const i of sorted) s[i] = "sorted";
  return s;
}

// ─── Algorithm Step Generators ──────────────────────────────────────────────────

function generateBubbleSortSteps(input: number[]): Step[] {
  const steps: Step[] = [];
  const a = [...input];
  const n = a.length;
  let comparisons = 0;
  let swaps = 0;
  const sorted = new Set<number>();

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      const cmp: Record<number, string> = { ...buildSortedStates(sorted), [j]: "comparing", [j + 1]: "comparing" };
      steps.push({ array: [...a], states: cmp, comparisons, swaps });

      if (a[j] > a[j + 1]) {
        swaps++;
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        const sw: Record<number, string> = { ...buildSortedStates(sorted), [j]: "swapping", [j + 1]: "swapping" };
        steps.push({ array: [...a], states: sw, comparisons, swaps });
      }
    }
    sorted.add(n - 1 - i);
  }
  sorted.add(0);

  const fin: Record<number, string> = {};
  for (let i = 0; i < n; i++) fin[i] = "sorted";
  steps.push({ array: [...a], states: fin, comparisons, swaps });
  return steps;
}

function generateInsertionSortSteps(input: number[]): Step[] {
  const steps: Step[] = [];
  const a = [...input];
  const n = a.length;
  let comparisons = 0;
  let swaps = 0;

  for (let i = 1; i < n; i++) {
    let j = i;
    while (j > 0) {
      comparisons++;
      steps.push({ array: [...a], states: { [j]: "comparing", [j - 1]: "comparing" }, comparisons, swaps });
      if (a[j] < a[j - 1]) {
        swaps++;
        [a[j], a[j - 1]] = [a[j - 1], a[j]];
        steps.push({ array: [...a], states: { [j]: "swapping", [j - 1]: "swapping" }, comparisons, swaps });
        j--;
      } else {
        break;
      }
    }
  }

  const fin: Record<number, string> = {};
  for (let i = 0; i < n; i++) fin[i] = "sorted";
  steps.push({ array: [...a], states: fin, comparisons, swaps });
  return steps;
}

function generateSelectionSortSteps(input: number[]): Step[] {
  const steps: Step[] = [];
  const a = [...input];
  const n = a.length;
  let comparisons = 0;
  let swaps = 0;
  const sorted = new Set<number>();

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      comparisons++;
      const st: Record<number, string> = { ...buildSortedStates(sorted), [minIdx]: "pivot", [j]: "comparing" };
      steps.push({ array: [...a], states: st, comparisons, swaps });
      if (a[j] < a[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      swaps++;
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      const sw: Record<number, string> = { ...buildSortedStates(sorted), [i]: "swapping", [minIdx]: "swapping" };
      steps.push({ array: [...a], states: sw, comparisons, swaps });
    }
    sorted.add(i);
  }
  sorted.add(n - 1);

  const fin: Record<number, string> = {};
  for (let i = 0; i < n; i++) fin[i] = "sorted";
  steps.push({ array: [...a], states: fin, comparisons, swaps });
  return steps;
}

function generateMergeSortSteps(input: number[]): Step[] {
  const steps: Step[] = [];
  const a = [...input];
  const n = a.length;
  let comparisons = 0;
  let swaps = 0;

  function mergeArr(arr: number[], left: number, mid: number, right: number): void {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      comparisons++;
      const st: Record<number, string> = {};
      for (let x = left; x <= right; x++) st[x] = "merging";
      steps.push({ array: [...arr], states: st, comparisons, swaps });
      if (leftArr[i] <= rightArr[j]) { arr[k] = leftArr[i]; i++; }
      else { arr[k] = rightArr[j]; j++; swaps++; }
      k++;
    }
    while (i < leftArr.length) { arr[k] = leftArr[i]; i++; k++; }
    while (j < rightArr.length) { arr[k] = rightArr[j]; j++; k++; }

    const st: Record<number, string> = {};
    for (let x = left; x <= right; x++) st[x] = "merging";
    steps.push({ array: [...arr], states: st, comparisons, swaps });
  }

  function sortArr(arr: number[], left: number, right: number): void {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    sortArr(arr, left, mid);
    sortArr(arr, mid + 1, right);
    mergeArr(arr, left, mid, right);
  }

  sortArr(a, 0, n - 1);

  const fin: Record<number, string> = {};
  for (let i = 0; i < n; i++) fin[i] = "sorted";
  steps.push({ array: [...a], states: fin, comparisons, swaps });
  return steps;
}

function generateQuickSortSteps(input: number[]): Step[] {
  const steps: Step[] = [];
  const a = [...input];
  let comparisons = 0;
  let swaps = 0;
  const sorted = new Set<number>();

  function partitionArr(arr: number[], low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;

    steps.push({ array: [...arr], states: { ...buildSortedStates(sorted), [high]: "pivot" }, comparisons, swaps });

    for (let j = low; j < high; j++) {
      comparisons++;
      steps.push({ array: [...arr], states: { ...buildSortedStates(sorted), [high]: "pivot", [j]: "comparing" }, comparisons, swaps });
      if (arr[j] <= pivot) {
        i++;
        if (i !== j) {
          swaps++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          steps.push({ array: [...arr], states: { ...buildSortedStates(sorted), [high]: "pivot", [i]: "swapping", [j]: "swapping" }, comparisons, swaps });
        }
      }
    }

    swaps++;
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({ array: [...arr], states: { ...buildSortedStates(sorted), [i + 1]: "swapping", [high]: "swapping" }, comparisons, swaps });
    return i + 1;
  }

  function quickSort(arr: number[], low: number, high: number): void {
    if (low >= high) {
      if (low === high) sorted.add(low);
      return;
    }
    const pi = partitionArr(arr, low, high);
    sorted.add(pi);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }

  quickSort(a, 0, a.length - 1);

  const fin: Record<number, string> = {};
  for (let i = 0; i < a.length; i++) fin[i] = "sorted";
  steps.push({ array: [...a], states: fin, comparisons, swaps });
  return steps;
}

// ─── Constants ──────────────────────────────────────────────────────────────────

const ALGORITHMS = ["Bubble Sort", "Merge Sort", "Quick Sort", "Insertion Sort", "Selection Sort"];

const LEGEND_ITEMS = [
  { state: "default",   label: "Unsorted"  },
  { state: "comparing", label: "Comparing" },
  { state: "sorted",    label: "Sorted"    },
  { state: "pivot",     label: "Pivot"     },
  { state: "merging",   label: "Merging"   },
  { state: "swapping",  label: "Swapping"  },
];

function getStepsForAlgorithm(alg: string, arr: number[]): Step[] {
  switch (alg) {
    case "Bubble Sort":    return generateBubbleSortSteps(arr);
    case "Merge Sort":     return generateMergeSortSteps(arr);
    case "Quick Sort":     return generateQuickSortSteps(arr);
    case "Insertion Sort": return generateInsertionSortSteps(arr);
    case "Selection Sort": return generateSelectionSortSteps(arr);
    default:               return generateBubbleSortSteps(arr);
  }
}

// ─── Page ────────────────────────────────────────────────────────────────────────

export default function SortingVisualizerPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("Bubble Sort");
  const [inputMode, setInputMode]     = useState<"random" | "custom">("random");
  const [arraySize, setArraySize]     = useState(20);
  const [customInput, setCustomInput] = useState("");
  const [playbackMode, setPlaybackMode] = useState<"auto" | "step">("auto");
  const [speed, setSpeed]         = useState(50);
  const [isRunning, setIsRunning] = useState(false);
  const [array, setArray]         = useState<number[]>(() => randomArray(20));
  const [steps, setSteps]         = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Derived display state ─────────────────────────────────────────────────────
  const stepData      = currentStep >= 0 && currentStep < steps.length ? steps[currentStep] : null;
  const displayArray  = stepData ? stepData.array : array;
  const displayStates = stepData ? stepData.states : {};
  const comparisons   = stepData?.comparisons ?? 0;
  const swaps         = stepData?.swaps ?? 0;
  const maxVal        = Math.max(...displayArray, 1);

  // ── Stop playback ─────────────────────────────────────────────────────────────
  const stopPlayback = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  }, []);

  // ── Auto playback interval ───────────────────────────────────────────────────
  useEffect(() => {
    if (!isRunning) return;
    const delay = 850 - speed * 8;
    intervalRef.current = setInterval(() => {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }, delay);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, speed, steps]);

  // ── Stop when last step reached ───────────────────────────────────────────────
  useEffect(() => {
    if (isRunning && steps.length > 0 && currentStep >= steps.length - 1) {
      stopPlayback();
    }
  }, [currentStep, isRunning, steps.length, stopPlayback]);

  // ── Cleanup on unmount ────────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // ── Helpers ───────────────────────────────────────────────────────────────────
  const getActiveArray = (): number[] => {
    if (inputMode === "custom") {
      const parsed = customInput.split(",").map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n) && n > 0);
      if (parsed.length > 0) return parsed;
    }
    return array;
  };

  const handleShuffle = () => {
    stopPlayback();
    const newArr = randomArray(arraySize);
    setArray(newArr);
    setSteps([]);
    setCurrentStep(-1);
  };

  const handleReset = () => {
    stopPlayback();
    setSteps([]);
    setCurrentStep(-1);
  };

  const handleArraySizeChange = (size: number) => {
    stopPlayback();
    setArraySize(size);
    const newArr = randomArray(size);
    setArray(newArr);
    setSteps([]);
    setCurrentStep(-1);
  };

  const handleAlgorithmChange = (alg: string) => {
    stopPlayback();
    setSelectedAlgorithm(alg);
    setSteps([]);
    setCurrentStep(-1);
  };

  const handlePlaybackModeChange = (mode: "auto" | "step") => {
    stopPlayback();
    setPlaybackMode(mode);
    setSteps([]);
    setCurrentStep(-1);
  };

  const handleStart = () => {
    if (isRunning) { stopPlayback(); return; }
    const arr = getActiveArray();
    const generated = getStepsForAlgorithm(selectedAlgorithm, arr);
    setSteps(generated);
    setCurrentStep(0);
    if (playbackMode === "auto") setIsRunning(true);
  };

  const handleNextStep = () => {
    if (steps.length === 0) {
      const arr = getActiveArray();
      const generated = getStepsForAlgorithm(selectedAlgorithm, arr);
      setSteps(generated);
      setCurrentStep(0);
    } else if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  // ── Shared styles ──────────────────────────────────────────────────────────────
  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-nunito)",
    fontWeight: 700,
    fontSize: 12,
    color: "#a0aec0",
    marginBottom: 8,
  };

  const toggleBtn = (active: boolean): React.CSSProperties => ({
    flex: 1,
    background: active ? "#6FB5FF" : "#252b4a",
    color: active ? "#ffffff" : "#a0aec0",
    border: "none",
    borderRadius: 8,
    padding: "8px 16px",
    fontFamily: "var(--font-nunito)",
    fontWeight: 700,
    fontSize: 13,
    cursor: "pointer",
  });

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div style={{ background: "#f0f7ff", minHeight: "100vh" }}>

      {/* ── Page Header ─────────────────────────────────────────────────────── */}
      <div style={{ padding: "24px 48px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--font-nunito)", fontWeight: 600, fontSize: 12, color: "#9ca3af" }}>
            <Link href="/" style={{ color: "#9ca3af", textDecoration: "none" }}>Home</Link>
            {" / "}
            <Link href="/visualizer" style={{ color: "#9ca3af", textDecoration: "none" }}>Visualizer</Link>
            {" / "}
            <span>Sorting Algorithms</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-poppins)", fontWeight: 700, fontSize: 28, color: "#0d1117", marginTop: 8, marginBottom: 0 }}>
            Sorting Algorithms
          </h1>
        </div>
      </div>

      {/* ── Main Content ────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 48px", display: "flex", gap: 24, alignItems: "flex-start" }}>

        {/* ── LEFT PANEL ──────────────────────────────────────────────────── */}
        <div style={{ flexShrink: 0, width: 300, background: "#1a1a2e", borderRadius: 14, padding: 24 }}>

          {/* Algorithm */}
          <div style={{ marginBottom: 20 }}>
            <div style={labelStyle}>Algorithm</div>
            <select
              value={selectedAlgorithm}
              onChange={e => handleAlgorithmChange(e.target.value)}
              style={{
                width: "100%",
                background: "#252b4a",
                color: "#ffffff",
                border: "0.5px solid #3a4060",
                borderRadius: 8,
                padding: "10px 12px",
                fontFamily: "var(--font-nunito)",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                outline: "none",
              }}
            >
              {ALGORITHMS.map(alg => <option key={alg} value={alg}>{alg}</option>)}
            </select>
          </div>

          {/* Array Input */}
          <div style={{ marginBottom: 20 }}>
            <div style={labelStyle}>Array Input</div>

            {/* Random / Custom toggle */}
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              {(["random", "custom"] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => { stopPlayback(); setInputMode(mode); setSteps([]); setCurrentStep(-1); }}
                  style={toggleBtn(inputMode === mode)}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>

            {/* Size slider or custom text */}
            {inputMode === "random" ? (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontFamily: "var(--font-nunito)", fontWeight: 600, fontSize: 12, color: "#a0aec0" }}>Size</span>
                  <span style={{ fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: 12, color: "#ffffff" }}>{arraySize}</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={50}
                  value={arraySize}
                  onChange={e => handleArraySizeChange(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "#6FB5FF" }}
                />
              </div>
            ) : (
              <input
                type="text"
                value={customInput}
                onChange={e => { setCustomInput(e.target.value); setSteps([]); setCurrentStep(-1); }}
                placeholder="e.g. 5,3,8,1,9,2"
                style={{
                  width: "100%",
                  background: "#252b4a",
                  color: "#ffffff",
                  border: "0.5px solid #3a4060",
                  borderRadius: 8,
                  padding: "10px 12px",
                  fontFamily: "var(--font-nunito)",
                  fontWeight: 600,
                  fontSize: 13,
                  boxSizing: "border-box",
                  outline: "none",
                }}
              />
            )}

            {/* Shuffle / Reset */}
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button
                onClick={handleShuffle}
                style={{ flex: 1, background: "#252b4a", color: "#a0aec0", border: "0.5px solid #3a4060", borderRadius: 8, padding: 8, fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: 12, cursor: "pointer" }}
              >
                Shuffle
              </button>
              <button
                onClick={handleReset}
                style={{ flex: 1, background: "#252b4a", color: "#a0aec0", border: "0.5px solid #3a4060", borderRadius: 8, padding: 8, fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: 12, cursor: "pointer" }}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Playback Mode */}
          <div style={{ marginBottom: 20 }}>
            <div style={labelStyle}>Playback Mode</div>
            <div style={{ display: "flex", gap: 8 }}>
              {(["auto", "step"] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => handlePlaybackModeChange(mode)}
                  style={toggleBtn(playbackMode === mode)}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Speed (auto only) */}
          {playbackMode === "auto" && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: 12, color: "#a0aec0" }}>Speed</span>
                <span style={{ fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: 12, color: "#ffffff" }}>{speed}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                value={speed}
                onChange={e => setSpeed(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#6FB5FF" }}
              />
            </div>
          )}

          {/* Start / Next Step */}
          <div style={{ marginBottom: 20 }}>
            {playbackMode === "auto" ? (
              <button
                onClick={handleStart}
                style={{ width: "100%", background: "#6FB5FF", color: "#ffffff", borderRadius: 8, padding: 12, fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer" }}
              >
                {isRunning ? "⏸ Pause" : "▶ Start"}
              </button>
            ) : (
              <button
                onClick={handleNextStep}
                style={{ width: "100%", background: "#6FB5FF", color: "#ffffff", borderRadius: 8, padding: 12, fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer" }}
              >
                Next Step →
              </button>
            )}
          </div>

          {/* Stats */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {([{ label: "Comparisons", value: comparisons }, { label: "Swaps", value: swaps }]).map(stat => (
              <div
                key={stat.label}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#252b4a", borderRadius: 8, padding: "10px 14px" }}
              >
                <span style={{ fontFamily: "var(--font-nunito)", fontWeight: 600, fontSize: 13, color: "#a0aec0" }}>{stat.label}</span>
                <span style={{ fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: 13, color: "#ffffff" }}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT PANEL ─────────────────────────────────────────────────── */}
        <div style={{ flex: 1, minWidth: 0, background: "#1a1a2e", borderRadius: 14, padding: 24, minHeight: 480 }}>
          <div style={{ fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: 13, color: "#a0aec0", marginBottom: 20 }}>
            Visualization
          </div>

          {/* Bar chart */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: 320 }}>
            {displayArray.map((val, idx) => {
              const state     = displayStates[idx];
              const heightPct = (val / maxVal) * 100;
              const barColor  = getBarColor(state);
              const showLabel = displayArray.length <= 20;
              return (
                <div
                  key={idx}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", flex: 1, height: "100%" }}
                >
                  {showLabel && (
                    <span style={{ fontSize: 10, color: "#ffffff", textAlign: "center", marginBottom: 2, lineHeight: 1, fontFamily: "var(--font-nunito)" }}>
                      {val}
                    </span>
                  )}
                  <div
                    style={{
                      width: "80%",
                      height: `${heightPct}%`,
                      background: barColor,
                      borderRadius: "4px 4px 0 0",
                      minHeight: 2,
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 16 }}>
            {LEGEND_ITEMS.map(item => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: getBarColor(item.state) }} />
                <span style={{ fontFamily: "var(--font-nunito)", fontWeight: 600, fontSize: 11, color: "#a0aec0" }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
