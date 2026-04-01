"use client";

import Link from "next/link";
import {
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
  "0.5×": 2000,
  "1×": 1000,
  "2×": 400,
};

// ── Bar visual state ───────────────────────────────────────────────────────────
type BarVisualState =
  | "compare"
  | "swapping"
  | "just-swapped"
  | "sorted"
  | "unsorted";

function computeSwappedSet(
  steps: SortingStep[],
  currentStep: number,
): Set<number> {
  const set = new Set<number>();
  if (!steps.length) return set;

  // Find the start of the current pass (right after the last "sorted" step)
  let passStart = 0;
  for (let i = currentStep - 1; i >= 0; i--) {
    if (steps[i].stepType === "sorted") {
      passStart = i + 1;
      break;
    }
  }

  // Collect all swapping indices from passStart up to (but not including) the current step
  for (let i = passStart; i < currentStep; i++) {
    steps[i].swapping?.forEach((idx) => set.add(idx));
  }

  return set;
}

function getBarVisualState(
  index: number,
  step: SortingStep | undefined,
  swappedSet: Set<number>,
): BarVisualState {
  if (!step) return "unsorted";

  // Permanently sorted — highest priority
  if (step.sorted?.includes(index)) return "sorted";

  // Currently swapping
  if (step.swapping?.includes(index)) return "swapping";

  // Currently comparing
  if (step.comparing?.includes(index) || step.merging?.includes(index))
    return "compare";

  // Was swapped in this pass — orange flash then fades
  if (swappedSet.has(index)) return "just-swapped";

  return "unsorted";
}

// ── Message derivation ────────────────────────────────────────────────────────
type Msg =
  | { type: "compare"; val1: number; val2: number; needsSwap: boolean }
  | { type: "swapping"; val1: number; val2: number }
  | { type: "just-swapped" }
  | { type: "pass-done" }
  | { type: "sorted" }
  | { type: "done" }
  | { type: "idle" };

function deriveMsg(
  step: SortingStep | undefined,
  prevStep?: SortingStep,
): Msg {
  if (!step) return { type: "idle" };

  if (step.stepType === "complete") return { type: "done" };

  if (step.stepType === "sorted" && !step.comparing && !step.swapping)
    return { type: "pass-done" };

  if (step.swapping && step.swapping.length >= 2) {
    const [i, j] = step.swapping;
    return {
      type: "swapping",
      val1: step.array[i]?.value ?? 0,
      val2: step.array[j]?.value ?? 0,
    };
  }

  // Immediately after a swap — show orange flash message
  if (prevStep?.swapping && prevStep.swapping.length >= 2 && !step.swapping) {
    return { type: "just-swapped" };
  }

  if (step.comparing && step.comparing.length >= 2) {
    const [i, j] = step.comparing;
    const val1 = step.array[i]?.value ?? 0;
    const val2 = step.array[j]?.value ?? 0;
    return { type: "compare", val1, val2, needsSwap: val1 > val2 };
  }

  if (
    step.stepType === "sorted" &&
    step.sorted &&
    step.sorted.length > 0 &&
    !step.comparing &&
    !step.swapping
  )
    return { type: "sorted" };

  return { type: "idle" };
}

// ── Swap icon ─────────────────────────────────────────────────────────────────
function SwapIcon({ animKey }: { animKey: number }) {
  return (
    <svg
      key={animKey}
      width={42}
      height={42}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        top: -58,
        left: "calc(100% + 5px)",
        transform: "translateX(-50%)",
        zIndex: 10,
        filter: "drop-shadow(0 0 8px rgba(45,212,191,0.8))",
        animation: "spinIn 0.4s forwards, iconPulse 0.6s 0.4s infinite",
      }}
    >
      {/* Top arrow — goes right */}
      <path
        d="M 10 40 Q 50 5 90 40"
        stroke="#2dd4bf"
        strokeWidth={11}
        strokeLinecap="round"
        fill="none"
      />
      <polygon points="80,26 96,44 74,48" fill="#2dd4bf" />

      {/* Bottom arrow — goes left */}
      <path
        d="M 90 60 Q 50 95 10 60"
        stroke="#2dd4bf"
        strokeWidth={11}
        strokeLinecap="round"
        fill="none"
      />
      <polygon points="20,74 4,56 26,52" fill="#2dd4bf" />
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

  // Swapped set for current pass
  const swappedSet = useMemo(
    () => computeSwappedSet(steps, currentStep),
    [steps, currentStep],
  );

  // Set default array on mount
  useEffect(() => {
    setCustomArray(DEFAULT_ARRAY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prevStepData = steps[currentStep - 1] as SortingStep | undefined;
  const msg = deriveMsg(currentStepData, prevStepData);

  // Swapping bar indices for the slide animation + icon
  const swappingIndices = currentStepData?.swapping ?? [];
  const swapLeft =
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

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div style={{ background: "#f2f4f7", minHeight: "100vh" }}>
      {/* Keyframes + bar classes */}
      <style>{`
        @keyframes gentleBounce {
          0%,100% { transform: translateY(0px); }
          40%     { transform: translateY(-8px); }
          70%     { transform: translateY(-4px); }
        }
        @keyframes orangeFlash {
          0%   { outline-color: #fb923c; box-shadow: 0 4px 14px rgba(251,146,60,0.3); }
          60%  { outline-color: #fb923c; box-shadow: 0 4px 14px rgba(251,146,60,0.3); }
          100% { outline-color: transparent; box-shadow: none; }
        }
        @keyframes spinIn {
          0%   { opacity: 0; transform: translateX(-50%) scale(0.3) rotate(-120deg); }
          60%  { opacity: 1; transform: translateX(-50%) scale(1.2) rotate(15deg); }
          100% { opacity: 1; transform: translateX(-50%) scale(1)   rotate(0deg); }
        }
        @keyframes iconPulse {
          0%,100% { transform: translateX(-50%) scale(1);   }
          50%     { transform: translateX(-50%) scale(1.1); }
        }
        @keyframes swapSlideRight {
          0%   { transform: translateY(-8px) translateX(0); }
          100% { transform: translateY(-8px) translateX(calc(100% + 10px)); }
        }
        @keyframes swapSlideLeft {
          0%   { transform: translateY(-8px) translateX(0); }
          100% { transform: translateY(-8px) translateX(calc(-100% - 10px)); }
        }

        .bar-base {
          background: #2a3350;
          outline: 2px solid transparent;
          outline-offset: 4px;
          border-radius: 6px 6px 0 0;
          transition: transform 0.35s cubic-bezier(0.34,1.4,0.64,1),
                      outline 0.25s ease,
                      box-shadow 0.3s ease;
          position: relative;
          width: 100%;
        }
        .bar-base.compare {
          outline: 2.5px solid #6FB5FF;
          outline-offset: 4px;
          box-shadow: 0 4px 14px rgba(111,181,255,0.2);
          animation: gentleBounce 0.7s cubic-bezier(0.34,1.4,0.64,1) infinite;
        }
        .bar-base.swapping {
          outline: 2.5px solid #6FB5FF;
          outline-offset: 4px;
          box-shadow: 0 4px 14px rgba(111,181,255,0.2);
          transform: translateY(-8px);
        }
        .bar-base.swapping.slide-right {
          animation: swapSlideRight 0.5s cubic-bezier(0.34,1.2,0.64,1) forwards;
        }
        .bar-base.swapping.slide-left {
          animation: swapSlideLeft 0.5s cubic-bezier(0.34,1.2,0.64,1) forwards;
        }
        .bar-base.just-swapped {
          background: #2a3350;
          transform: translateY(0);
          animation: orangeFlash 0.6s ease forwards;
        }
        .bar-base.sorted {
          background: #22c55e;
          outline: 2px solid transparent;
          animation: none;
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
        <div style={{ textAlign: "center", marginBottom: 24 }}>
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
          <div style={{ padding: "52px 36px 24px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                height: 240,
                gap: 10,
                position: "relative",
                overflow: "visible",
              }}
            >
              {array.map((element, index) => {
                const heightPct = Math.max(
                  (element.value / maxValue) * 100,
                  2,
                );
                const barState = getBarVisualState(
                  index,
                  currentStepData,
                  swappedSet,
                );
                const isSwapLeft = index === swapLeft;

                let slideClass = "";
                if (barState === "swapping" && swappingIndices.length === 2) {
                  const [a, b] = swappingIndices;
                  slideClass =
                    index === Math.min(a, b) ? "slide-right" : "slide-left";
                }

                const stateClass = barState !== "unsorted" ? barState : "";

                return (
                  <div
                    key={index}
                    className={`bar-base ${stateClass} ${slideClass}`}
                    style={{ flex: 1, height: `${heightPct}%` }}
                  >
                    {/* Value label — always visible above the bar */}
                    <span
                      style={{
                        position: "absolute",
                        bottom: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        marginBottom: 6,
                        fontSize: 13,
                        color: "#fff",
                        fontWeight: 700,
                        lineHeight: 1,
                        whiteSpace: "nowrap",
                        pointerEvents: "none",
                      }}
                    >
                      {element.value}
                    </span>

                    {/* Swap icon — on the left swapping bar */}
                    {isSwapLeft && <SwapIcon animKey={currentStep} />}
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
            <span style={{ fontSize: 15, flexShrink: 0 }}>
              {msg.type === "compare"
                ? "🔍"
                : msg.type === "swapping"
                  ? "⇄"
                  : msg.type === "just-swapped"
                    ? "🟠"
                    : msg.type === "pass-done"
                      ? "✔️"
                      : msg.type === "sorted"
                        ? "✅"
                        : msg.type === "done"
                          ? "🎉"
                          : "🔍"}
            </span>

            {/* Title + Sub */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#e2e8f0",
                  marginBottom: 2,
                }}
              >
                {msg.type === "compare" && (
                  <>
                    Comparing{" "}
                    <span style={{ color: "#6FB5FF" }}>{msg.val1}</span> and{" "}
                    <span style={{ color: "#6FB5FF" }}>{msg.val2}</span>
                  </>
                )}
                {msg.type === "swapping" && (
                  <>
                    Swapping{" "}
                    <span style={{ color: "#6FB5FF" }}>{msg.val1}</span> and{" "}
                    <span style={{ color: "#6FB5FF" }}>{msg.val2}</span>
                  </>
                )}
                {msg.type === "just-swapped" && (
                  <span style={{ color: "#fb923c" }}>Swapped!</span>
                )}
                {msg.type === "pass-done" && "Pass complete!"}
                {msg.type === "sorted" && (
                  <span style={{ color: "#22c55e" }}>Element sorted!</span>
                )}
                {msg.type === "done" && "Array fully sorted!"}
                {msg.type === "idle" && "Press Play to start"}
              </div>

              <div
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 600,
                  fontSize: 11,
                  color: "#6b7a99",
                }}
              >
                {msg.type === "compare" &&
                  (msg.needsSwap
                    ? `${msg.val1} is greater — swap needed!`
                    : "Already in order!")}
                {msg.type === "swapping" && "Bars sliding to new positions!"}
                {msg.type === "just-swapped" &&
                  "Orange confirms the swap — fading now!"}
                {msg.type === "pass-done" &&
                  "Orange outlines fading — ready for next pass."}
                {msg.type === "sorted" &&
                  "This element is now in its correct position."}
                {msg.type === "done" && "All elements are in their correct order."}
                {msg.type === "idle" && "Choose an algorithm and press play."}
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
              gap: 14,
              flexWrap: "wrap",
              paddingBottom: 20,
              paddingLeft: 4,
            }}
          >
            {/* Unsorted */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 2,
                  background: "#2a3350",
                  border: "1.5px solid #3a4460",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 600,
                  fontSize: 9,
                  color: "#3a4460",
                }}
              >
                Unsorted
              </span>
            </div>

            {/* Comparing + Swapping */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 2,
                  background: "#2a3350",
                  border: "1.5px solid #6FB5FF",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 600,
                  fontSize: 9,
                  color: "#3a4460",
                }}
              >
                Comparing + Swapping
              </span>
            </div>

            {/* After swap */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 2,
                  background: "#2a3350",
                  border: "1.5px solid #fb923c",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 600,
                  fontSize: 9,
                  color: "#3a4460",
                }}
              >
                Just swapped
              </span>
            </div>

            {/* Sorted */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 2,
                  background: "#22c55e",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 600,
                  fontSize: 9,
                  color: "#3a4460",
                }}
              >
                Sorted
              </span>
            </div>
          </div>

          {/* Controls bar */}
          <div
            style={{
              background: "#0d1018",
              padding: "16px 36px",
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

            {/* Center — Previous | Play/Pause | Next */}
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <button
                onClick={handlePrevStep}
                style={{
                  background: "transparent",
                  border: "0.5px solid #1e2438",
                  borderRadius: 10,
                  padding: "10px 20px",
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 700,
                  fontSize: 12,
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
                  padding: "11px 36px",
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  minWidth: 110,
                  border: "none",
                  cursor: "pointer",
                  ...(isPlaying
                    ? { background: "#1e2438", color: "#6FB5FF" }
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
                  padding: "10px 20px",
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 700,
                  fontSize: 12,
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
                  fontSize: 11,
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

            <p style={{ fontSize: 11, color: "#c0c8d8", margin: "0 0 20px" }}>
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
