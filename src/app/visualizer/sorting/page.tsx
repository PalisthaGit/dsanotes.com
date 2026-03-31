"use client";

import Link from "next/link";
import {
  type CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { SortingStep } from "@/algorithms/types/sorting";
import { useSortVisualization } from "@/hooks/use-sort-visualization";

// ── Constants ─────────────────────────────────────────────────────────────────
const DEFAULT_ARRAY = [38, 27, 43, 12, 52, 19];

const ALGORITHMS = [
  { key: "bubble", label: "Bubble" },
  { key: "merge", label: "Merge" },
  { key: "quick", label: "Quick" },
  { key: "insertion", label: "Insertion" },
  { key: "selection", label: "Selection" },
];

const SPEED_MAP: Record<string, number> = {
  "0.5×": 20,
  "1×": 60,
  "2×": 85,
};

const LEGEND = [
  { label: "Unsorted", color: "#2a3350" },
  { label: "Comparing", color: "#6FB5FF" },
  { label: "Swapping", color: "#fb923c" },
  { label: "Sorted", color: "#22c55e" },
];

// ── Bar helpers ───────────────────────────────────────────────────────────────
type BarState = "sorted" | "swapping" | "comparing" | "unsorted";

function getBarState(index: number, step: SortingStep | undefined): BarState {
  if (!step) return "unsorted";
  if (step.sorted?.includes(index)) return "sorted";
  if (step.swapping?.includes(index)) return "swapping";
  if (step.comparing?.includes(index) || step.merging?.includes(index))
    return "comparing";
  return "unsorted";
}

function getBarStyle(state: BarState): CSSProperties {
  switch (state) {
    case "sorted":
      return { backgroundColor: "#22c55e" };
    case "swapping":
      return {
        backgroundColor: "#fb923c",
        boxShadow: "0 0 20px rgba(251,146,60,0.5)",
      };
    case "comparing":
      return {
        backgroundColor: "#6FB5FF",
        boxShadow: "0 0 16px rgba(111,181,255,0.5)",
      };
    default:
      return { backgroundColor: "#2a3350" };
  }
}

// ── Message derivation ────────────────────────────────────────────────────────
type MessageData =
  | { type: "comparing"; val1: number; val2: number; needsSwap: boolean }
  | { type: "swapping"; val1: number; val2: number }
  | { type: "sorted" }
  | { type: "done" }
  | { type: "info"; text: string }
  | { type: "idle" };

function deriveMessage(step: SortingStep | undefined): MessageData {
  if (!step) return { type: "idle" };

  const { stepType, array, comparing, swapping, sorted } = step;

  if (stepType === "complete") return { type: "done" };

  if (swapping && swapping.length >= 2) {
    const [i, j] = swapping;
    return {
      type: "swapping",
      val1: array[i]?.value ?? 0,
      val2: array[j]?.value ?? 0,
    };
  }

  if (comparing && comparing.length >= 2) {
    const [i, j] = comparing;
    const val1 = array[i]?.value ?? 0;
    const val2 = array[j]?.value ?? 0;
    return { type: "comparing", val1, val2, needsSwap: val1 > val2 };
  }

  if (
    stepType === "sorted" &&
    sorted &&
    sorted.length > 0 &&
    !comparing &&
    !swapping
  ) {
    return { type: "sorted" };
  }

  if (step.message) return { type: "info", text: step.message };

  return { type: "idle" };
}

// ── Swap icon SVG ─────────────────────────────────────────────────────────────
function SwapIcon({ animKey }: { animKey: number }) {
  return (
    <svg
      key={animKey}
      width={52}
      height={52}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        left: "calc(100% - 20px)",
        top: -58,
        zIndex: 10,
        filter: "drop-shadow(0 0 10px rgba(45,212,191,0.6))",
        animation:
          "swapIconIn 0.45s cubic-bezier(0.34,1.4,0.64,1) forwards, swapIconPulse 0.7s ease-in-out 0.45s infinite",
      }}
    >
      {/* Top arrow: curves right */}
      <path
        d="M 10 42 C 12 20, 72 18, 78 36"
        stroke="#2dd4bf"
        strokeWidth={10}
        strokeLinecap="round"
        fill="none"
      />
      {/* Top arrowhead */}
      <polyline
        points="62,20 80,36 68,52"
        stroke="#2dd4bf"
        strokeWidth={10}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Bottom arrow: curves left */}
      <path
        d="M 90 58 C 88 80, 28 82, 22 64"
        stroke="#2dd4bf"
        strokeWidth={10}
        strokeLinecap="round"
        fill="none"
      />
      {/* Bottom arrowhead */}
      <polyline
        points="38,80 20,64 32,48"
        stroke="#2dd4bf"
        strokeWidth={10}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

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
    comparisons,
    swaps,
    isRunning,
    isPaused,
    startSorting,
    handlePauseResume,
    handleStopSorting,
    stepForward,
  } = useSortVisualization(20);

  const [showModal, setShowModal] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [speedLabel, setSpeedLabel] = useState<"0.5×" | "1×" | "2×">("1×");

  const isPlaying = isRunning && !isPaused;
  const totalSteps = steps.length;
  const currentStepData = steps[currentStep] as SortingStep | undefined;
  const maxValue = useMemo(
    () => Math.max(...array.map((e) => e.value), 1),
    [array],
  );
  const canStep = !isRunning || isPaused;

  // Set default array on mount
  useEffect(() => {
    setCustomArray(DEFAULT_ARRAY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Derive message
  const msg = deriveMessage(currentStepData);

  // Identify swapping bar indices (lower index gets the icon)
  const swappingIndices = currentStepData?.swapping ?? [];
  const swapLow =
    swappingIndices.length === 2
      ? Math.min(swappingIndices[0], swappingIndices[1])
      : -1;

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
      {/* Keyframe animations */}
      <style>{`
        @keyframes swapIconIn {
          0%   { transform: scale(0.3) rotate(-120deg); opacity: 0; }
          100% { transform: scale(1)   rotate(0deg);   opacity: 1; }
        }
        @keyframes swapIconPulse {
          0%, 100% { transform: scale(1);   }
          50%      { transform: scale(1.1); }
        }
        @keyframes swapSlideRight {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(100% + 6px)); }
        }
        @keyframes swapSlideLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% - 6px)); }
        }
      `}</style>

      {/* ── Breadcrumb ── */}
      <nav style={{ background: "#f2f4f7", padding: "16px 48px" }}>
        <span
          style={{
            fontFamily: "Nunito, sans-serif",
            fontWeight: 600,
            fontSize: 12,
          }}
        >
          <Link href="/" style={{ color: "#9ca3af", textDecoration: "none" }}>
            Home
          </Link>
          <span style={{ color: "#9ca3af", margin: "0 6px" }}>/</span>
          <Link
            href="/visualizer"
            style={{ color: "#9ca3af", textDecoration: "none" }}
          >
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
                    ? {
                        background: "#fff",
                        color: "#0d1117",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                      }
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
                position: "relative",
              }}
            >
              {array.map((element, index) => {
                const heightPct = Math.max(
                  (element.value / maxValue) * 100,
                  2,
                );
                const barState = getBarState(index, currentStepData);
                const isSwapLow = index === swapLow;
                const isSwappingBar = swappingIndices.includes(index);

                // Slide animation for swapping bars
                let slideAnim: string | undefined;
                if (isSwappingBar && swappingIndices.length === 2) {
                  const [a, b] = swappingIndices;
                  if (index === Math.min(a, b)) {
                    slideAnim = `swapSlideRight 0.5s cubic-bezier(0.34,1.2,0.64,1) forwards`;
                  } else {
                    slideAnim = `swapSlideLeft 0.5s cubic-bezier(0.34,1.2,0.64,1) forwards`;
                  }
                }

                return (
                  <div
                    key={index}
                    style={{
                      flex: 1,
                      height: `${heightPct}%`,
                      borderRadius: "6px 6px 0 0",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      position: "relative",
                      animation: slideAnim,
                      ...getBarStyle(barState),
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        color: "#fff",
                        fontWeight: 700,
                        lineHeight: 1,
                        paddingTop: 4,
                      }}
                    >
                      {element.value}
                    </span>

                    {/* Swap icon — rendered on the lower-index swapping bar */}
                    {isSwapLow && (
                      <SwapIcon animKey={currentStep} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Message bar */}
          <div
            style={{
              background: "#1a1f2e",
              borderRadius: 12,
              padding: "14px 18px",
              marginBottom: 18,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            {/* Icon */}
            <span style={{ fontSize: 16, flexShrink: 0 }}>
              {msg.type === "comparing"
                ? "🔍"
                : msg.type === "swapping"
                  ? "⇄"
                  : msg.type === "sorted"
                    ? "✅"
                    : msg.type === "done"
                      ? "🎉"
                      : "🔍"}
            </span>

            {/* Title + Sub */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Title */}
              <div
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#e2e8f0",
                  marginBottom: 2,
                }}
              >
                {msg.type === "comparing" && (
                  <>
                    Comparing{" "}
                    <span style={{ color: "#6FB5FF" }}>{msg.val1}</span> and{" "}
                    <span style={{ color: "#6FB5FF" }}>{msg.val2}</span>
                  </>
                )}
                {msg.type === "swapping" && (
                  <>
                    Swapping{" "}
                    <span style={{ color: "#fb923c" }}>{msg.val1}</span> and{" "}
                    <span style={{ color: "#fb923c" }}>{msg.val2}</span>
                  </>
                )}
                {msg.type === "sorted" && (
                  <span style={{ color: "#22c55e" }}>Sorted!</span>
                )}
                {msg.type === "done" && "Array fully sorted!"}
                {msg.type === "info" && msg.text}
                {msg.type === "idle" && "Press Play to start"}
              </div>

              {/* Sub */}
              <div
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 600,
                  fontSize: 12,
                  color: "#6b7a99",
                }}
              >
                {msg.type === "comparing" &&
                  (msg.needsSwap
                    ? `${msg.val1} is greater — a swap is needed!`
                    : "Already in order — no swap needed.")}
                {msg.type === "swapping" && "Bars are swapping positions!"}
                {msg.type === "sorted" &&
                  "This element is now in its correct position."}
                {msg.type === "done" && "All elements are in their correct order."}
                {msg.type === "idle" &&
                  "Choose an algorithm and press play."}
              </div>
            </div>

            {/* Comparisons + Swaps */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 2,
                flexShrink: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span
                  style={{
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: 600,
                    fontSize: 10,
                    color: "#3a4460",
                  }}
                >
                  Comparisons
                </span>
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                    fontSize: 18,
                    color: "#6FB5FF",
                    lineHeight: 1,
                  }}
                >
                  {comparisons}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span
                  style={{
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: 600,
                    fontSize: 10,
                    color: "#3a4460",
                  }}
                >
                  Swaps
                </span>
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                    fontSize: 18,
                    color: "#22c55e",
                    lineHeight: 1,
                  }}
                >
                  {swaps}
                </span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div
            style={{
              display: "flex",
              gap: 20,
              flexWrap: "wrap",
              paddingBottom: 20,
              paddingLeft: 4,
            }}
          >
            {LEGEND.map(({ label, color }) => (
              <div
                key={label}
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                <div
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: 2,
                    background: color,
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
                  {label}
                </span>
              </div>
            ))}
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
              margin: "0 -48px",
            }}
          >
            {/* Left — Step counter */}
            <div
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 700,
                fontSize: 12,
              }}
            >
              <span style={{ color: "#3a4460" }}>Step </span>
              <span style={{ color: "#6FB5FF" }}>
                {totalSteps > 0 ? currentStep + 1 : 0}
              </span>
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
                    ? {
                        background: "#1e2438",
                        color: "#6FB5FF",
                        boxShadow: "none",
                      }
                    : {
                        background: "#6FB5FF",
                        color: "#fff",
                        boxShadow: "0 4px 20px rgba(111,181,255,0.35)",
                      }),
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

          <div
            style={{ width: 1, height: 16, background: "#d4e6ff" }}
          />

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
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
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
