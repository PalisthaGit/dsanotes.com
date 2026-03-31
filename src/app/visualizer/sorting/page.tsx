"use client";

import Link from "next/link";
import { type CSSProperties, useCallback, useMemo, useState } from "react";
import type { SortingStep } from "@/algorithms/types/sorting";
import { useSortVisualization } from "@/hooks/use-sort-visualization";

// ── Algorithm pill config ─────────────────────────────────────────────────────
const ALGORITHMS = [
  { key: "bubble", label: "Bubble" },
  { key: "merge", label: "Merge" },
  { key: "quick", label: "Quick" },
  { key: "insertion", label: "Insertion" },
  { key: "selection", label: "Selection" },
];

// ── Speed mapping (speed value → delay: 1000 - v*10 ms) ──────────────────────
const SPEED_MAP: Record<string, number> = {
  "0.5×": 20, // 800 ms
  "1×": 60,   // 400 ms
  "2×": 85,   // 150 ms
};

// ── Bar colour per step state ─────────────────────────────────────────────────
function getBarStyle(index: number, step: SortingStep | undefined): CSSProperties {
  if (!step) return { backgroundColor: "#6FB5FF" };
  if (step.sorted?.includes(index)) return { backgroundColor: "#22c55e" };
  if (step.pivot === index) return { backgroundColor: "#facc15" };
  if (step.comparing?.includes(index) || step.merging?.includes(index))
    return { backgroundColor: "#f472b6", boxShadow: "0 0 14px rgba(244,114,182,0.5)" };
  if (step.swapping?.includes(index)) return { backgroundColor: "#fb923c" };
  return { backgroundColor: "#6FB5FF" };
}

// ── Legend ────────────────────────────────────────────────────────────────────
const LEGEND_STATES = {
  unsorted:  { label: "Unsorted",  color: "#6FB5FF" },
  comparing: { label: "Comparing", color: "#f472b6" },
  pivot:     { label: "Pivot",     color: "#facc15" },
  swapping:  { label: "Swapping",  color: "#fb923c" },
  sorted:    { label: "Sorted",    color: "#22c55e" },
} as const;

type LegendKey = keyof typeof LEGEND_STATES;

const ALGO_LEGEND: Record<string, LegendKey[]> = {
  bubble:    ["unsorted", "comparing", "swapping", "sorted"],
  merge:     ["unsorted", "comparing", "swapping", "sorted"],
  quick:     ["unsorted", "comparing", "pivot", "swapping", "sorted"],
  insertion: ["unsorted", "comparing", "swapping", "sorted"],
  selection: ["unsorted", "comparing", "swapping", "sorted"],
};

// ── Page ──────────────────────────────────────────────────────────────────────
export default function SortingPage() {
  const {
    array,
    resetArray,
    setCustomArray,
    algorithm,
    setAlgorithm,
    setSpeed,
    steps,
    currentStep,
    isRunning,
    isPaused,
    startSorting,
    handlePauseResume,
    handleStopSorting,
    stepForward,
  } = useSortVisualization(20);

  const [showModal, setShowModal]     = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [speedLabel, setSpeedLabel]   = useState<"0.5×" | "1×" | "2×">("1×");

  const isPlaying      = isRunning && !isPaused;
  const totalSteps     = steps.length;
  const currentStepData = steps[currentStep] as SortingStep | undefined;
  const maxValue       = useMemo(() => Math.max(...array.map((e) => e.value), 1), [array]);
  const legendKeys     = ALGO_LEGEND[algorithm] ?? ALGO_LEGEND.bubble;
  const canStep        = !isRunning || isPaused;

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleAlgorithmChange = useCallback(
    (algo: string) => {
      handleStopSorting();
      resetArray();
      setAlgorithm(algo);
    },
    [handleStopSorting, resetArray, setAlgorithm],
  );

  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      handlePauseResume();
    } else if (isRunning && isPaused) {
      handlePauseResume();
    } else {
      startSorting();
    }
  }, [isPlaying, isRunning, isPaused, handlePauseResume, startSorting]);

  const handlePrevStep = useCallback(() => {
    if (currentStep > 0 && canStep) stepForward(-1);
  }, [currentStep, canStep, stepForward]);

  const handleNextStep = useCallback(() => {
    if (currentStep < totalSteps - 1 && canStep) stepForward(1);
  }, [currentStep, totalSteps, canStep, stepForward]);

  const handleReset = useCallback(() => {
    handleStopSorting();
    resetArray();
  }, [handleStopSorting, resetArray]);

  const handleSpeedChange = useCallback(
    (label: string) => {
      const key = label as "0.5×" | "1×" | "2×";
      setSpeedLabel(key);
      setSpeed([SPEED_MAP[key]]);
    },
    [setSpeed],
  );

  const handleApplyCustomArray = useCallback(() => {
    const nums = customInput
      .split(",")
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n) && n >= 1 && n <= 100);
    if (nums.length >= 1 && nums.length <= 20) {
      handleStopSorting();
      setCustomArray(nums);
      setShowModal(false);
      setCustomInput("");
    }
  }, [customInput, handleStopSorting, setCustomArray]);

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div style={{ background: "#f2f4f7", minHeight: "100vh" }}>

      {/* ── Breadcrumb ── */}
      <nav style={{ background: "#f2f4f7", padding: "16px 48px" }}>
        <span style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: 12 }}>
          <Link href="/" style={{ color: "#9ca3af", textDecoration: "none" }}>
            Home
          </Link>
          <span style={{ color: "#9ca3af", margin: "0 6px" }}>/</span>
          <Link href="/visualizer" style={{ color: "#9ca3af", textDecoration: "none" }}>
            Visualizer
          </Link>
          <span style={{ color: "#9ca3af", margin: "0 6px" }}>/</span>
          <span style={{ color: "#6FB5FF" }}>Sorting Algorithms</span>
        </span>
      </nav>

      <div style={{ padding: "0 48px 48px" }}>

        {/* ── Title + Pill Switcher ── */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <h1
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: 22,
              color: "#0d1117",
              margin: "0 0 16px",
            }}
          >
            Sorting Algorithms
          </h1>

          <div
            style={{
              display: "inline-flex",
              background: "#e8edf5",
              borderRadius: 14,
              padding: 4,
              gap: 2,
            }}
          >
            {ALGORITHMS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => handleAlgorithmChange(key)}
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 700,
                  fontSize: 12,
                  padding: "8px 20px",
                  borderRadius: 10,
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  ...(algorithm === key
                    ? { background: "#fff", color: "#0d1117", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }
                    : { background: "transparent", color: "#9ca3af" }),
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Main dark card ── */}
        <div
          style={{
            background: "#12151f",
            borderRadius: 24,
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 48px",
          }}
        >
          {/* Bars area */}
          <div style={{ padding: "36px 36px 28px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                height: 260,
                gap: 6,
              }}
            >
              {array.map((element, index) => {
                const heightPct = Math.max((element.value / maxValue) * 100, 2);
                return (
                  <div
                    key={element.id}
                    style={{
                      flex: 1,
                      height: `${heightPct}%`,
                      borderRadius: "6px 6px 0 0",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      ...getBarStyle(index, currentStepData),
                    }}
                  >
                    {array.length <= 20 && (
                      <span
                        style={{
                          fontSize: 10,
                          color: "#fff",
                          fontWeight: 700,
                          lineHeight: 1,
                          paddingTop: 2,
                        }}
                      >
                        {element.value}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 16 }}>
              {legendKeys.map((key) => {
                const item = LEGEND_STATES[key];
                return (
                  <div key={key} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div
                      style={{
                        width: 9,
                        height: 9,
                        borderRadius: 2,
                        background: item.color,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "Nunito, sans-serif",
                        fontWeight: 600,
                        fontSize: 10,
                        color: "#3a4460",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls bar */}
          <div
            style={{
              background: "#0d1018",
              padding: "18px 36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: "0 0 24px 24px",
            }}
          >
            {/* Left — Step counter */}
            <div style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: 12 }}>
              <span style={{ color: "#3a4460" }}>Step </span>
              <span style={{ color: "#6FB5FF" }}>{totalSteps > 0 ? currentStep + 1 : 0}</span>
              <span style={{ color: "#3a4460" }}> / </span>
              <span style={{ color: "#6b7a99" }}>{totalSteps}</span>
            </div>

            {/* Center — Prev | Play/Pause | Next */}
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <button
                onClick={handlePrevStep}
                style={{
                  background: "transparent",
                  border: "0.5px solid #1e2438",
                  borderRadius: 10,
                  padding: "11px 24px",
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#4a5680",
                  cursor: "pointer",
                }}
              >
                Previous
              </button>

              <button
                onClick={handlePlayPause}
                style={{
                  borderRadius: 10,
                  padding: "12px 40px",
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  minWidth: 120,
                  border: "none",
                  cursor: "pointer",
                  ...(isPlaying
                    ? { background: "#1e2438", color: "#6FB5FF", boxShadow: "none" }
                    : { background: "#6FB5FF", color: "#fff", boxShadow: "0 4px 20px rgba(111,181,255,0.35)" }),
                }}
              >
                {isPlaying ? "Pause" : "Play"}
              </button>

              <button
                onClick={handleNextStep}
                style={{
                  background: "transparent",
                  border: "0.5px solid #1e2438",
                  borderRadius: 10,
                  padding: "11px 24px",
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#4a5680",
                  cursor: "pointer",
                }}
              >
                Next
              </button>
            </div>

            {/* Right — Speed */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 700,
                  fontSize: 12,
                  color: "#3a4460",
                }}
              >
                Speed
              </span>
              <select
                value={speedLabel}
                onChange={(e) => handleSpeedChange(e.target.value)}
                style={{
                  background: "#1a1f2e",
                  border: "0.5px solid #252b3e",
                  borderRadius: 8,
                  padding: "7px 10px",
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 700,
                  fontSize: 12,
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                <option value="0.5×">0.5×</option>
                <option value="1×">1×</option>
                <option value="2×">2×</option>
              </select>
            </div>
          </div>
        </div>

        {/* ── Below card — Custom Array + Reset ── */}
        <div
          style={{
            marginTop: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <button
            onClick={() => setShowModal(true)}
            style={{
              background: "none",
              border: "none",
              fontFamily: "Nunito, sans-serif",
              fontWeight: 700,
              fontSize: 12,
              color: "#6FB5FF",
              cursor: "pointer",
            }}
          >
            + Custom Array
          </button>

          <div style={{ width: 1, height: 16, background: "#d4e6ff" }} />

          <button
            onClick={handleReset}
            style={{
              background: "none",
              border: "none",
              fontFamily: "Nunito, sans-serif",
              fontWeight: 700,
              fontSize: 12,
              color: "#9ca3af",
              cursor: "pointer",
            }}
          >
            ↺ Reset
          </button>
        </div>
      </div>

      {/* ── Custom Array Modal ── */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,19,32,0.7)",
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: 28,
              width: 340,
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  color: "#0d1117",
                }}
              >
                Custom Array
              </span>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#9ca3af",
                  fontSize: 20,
                  cursor: "pointer",
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>

            <p
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 600,
                fontSize: 12,
                color: "#9ca3af",
                margin: "0 0 12px",
              }}
            >
              Enter numbers separated by commas
            </p>

            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleApplyCustomArray()}
              placeholder="e.g. 5, 3, 8, 1, 9, 2, 7, 4"
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 13,
                color: "#0d1117",
                border: "0.5px solid #d4e6ff",
                borderRadius: 10,
                padding: "12px 14px",
                background: "#f5faff",
                width: "100%",
                boxSizing: "border-box",
                marginBottom: 8,
                outline: "none",
              }}
            />

            <p
              style={{
                fontSize: 11,
                color: "#c0c8d8",
                margin: "0 0 20px",
              }}
            >
              Max 20 numbers · values between 1 and 100
            </p>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  flex: 1,
                  background: "#f5faff",
                  border: "0.5px solid #d4e6ff",
                  borderRadius: 10,
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#9ca3af",
                  padding: "10px 0",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleApplyCustomArray}
                style={{
                  flex: 1,
                  background: "#6FB5FF",
                  border: "none",
                  borderRadius: 10,
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#fff",
                  padding: "10px 0",
                  cursor: "pointer",
                }}
              >
                Apply →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
