"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { SortingStep } from "@/algorithms/types/sorting";
import { useSortVisualization } from "@/hooks/use-sort-visualization";

const DEFAULT_ARRAY = [38, 27, 43, 12, 52, 19];

type BarState = "compare" | "swapping" | "sorted" | "unsorted";

function getBarState(index: number, step: SortingStep | undefined): BarState {
  if (!step) return "unsorted";
  if (step.sorted?.includes(index)) return "sorted";
  if (step.swapping?.includes(index)) return "swapping";
  if (step.comparing?.includes(index) || step.merging?.includes(index)) return "compare";
  return "unsorted";
}

const BAR_COLORS: Record<BarState, string> = {
  unsorted: "#c7d2e8",
  compare: "#6FB5FF",
  swapping: "#fb923c",
  sorted: "#22c55e",
};

type Msg =
  | { type: "compare"; val1: number; val2: number; needsSwap: boolean }
  | { type: "swapping"; val1: number; val2: number }
  | { type: "sorted"; val: number }
  | { type: "done" }
  | { type: "idle" };

function deriveMsg(step: SortingStep | undefined): Msg {
  if (!step) return { type: "idle" };
  if (step.stepType === "complete") return { type: "done" };
  if (step.swapping && step.swapping.length >= 2) {
    const [i, j] = step.swapping;
    return { type: "swapping", val1: step.array[i]?.value ?? 0, val2: step.array[j]?.value ?? 0 };
  }
  if (step.comparing && step.comparing.length >= 2) {
    const [i, j] = step.comparing;
    const val1 = step.array[i]?.value ?? 0;
    const val2 = step.array[j]?.value ?? 0;
    return { type: "compare", val1, val2, needsSwap: val1 > val2 };
  }
  if (step.stepType === "sorted" && step.sorted && step.sorted.length > 0 && !step.comparing && !step.swapping) {
    const sortedIdx = step.sorted[step.sorted.length - 1];
    return { type: "sorted", val: step.array[sortedIdx]?.value ?? 0 };
  }
  return { type: "idle" };
}

// maxSortedCount: auto-stop and disable Next once this many bars are green-sorted
// startFromSortedCount: how many bars should already be green on first load
export default function MiniSortingVisualizer({
  initialAlgorithm = "bubble",
  maxSortedCount,
  startFromSortedCount: startFromProp,
}: {
  initialAlgorithm?: string;
  maxSortedCount?: number;
  startFromSortedCount?: number;
}) {
  const {
    array,
    setCustomArray,
    steps,
    currentStep,
    isRunning,
    isPaused,
    startSorting,
    handlePauseResume,
    handleStopSorting,
    stepForward,
    generateSteps,
    pauseAtCurrentStep,
  } = useSortVisualization(20, initialAlgorithm);

  // How many elements should already appear sorted when this visualizer first loads.
  // Explicit prop takes priority; otherwise derived from maxSortedCount - 1.
  const startFromSortedCount = startFromProp !== undefined
    ? startFromProp
    : (maxSortedCount !== undefined && maxSortedCount > 1 ? maxSortedCount - 1 : 0);

  const genDone = useRef(false);
  const seekDone = useRef(false);

  // Phase 1: once the custom array has been set (array.length flips from 20 → 6),
  // generate the full step list without starting playback.
  useEffect(() => {
    if (genDone.current || startFromSortedCount <= 0) return;
    if (array.length !== DEFAULT_ARRAY.length) return;
    genDone.current = true;
    generateSteps();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [array.length]);

  // Phase 2: once steps are available, seek to the first step where the right
  // number of elements is already sorted (e.g. 52 green before the user presses Play).
  // Then mark the engine as "paused" so pressing Play resumes from here — not step 0.
  useEffect(() => {
    if (seekDone.current || startFromSortedCount <= 0 || steps.length === 0) return;
    const targetIdx = (steps as SortingStep[]).findIndex(
      (s) => s.sorted && s.sorted.length >= startFromSortedCount,
    );
    if (targetIdx > 0) {
      stepForward(targetIdx);
      pauseAtCurrentStep();
      seekDone.current = true;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps.length]);

  const isPlaying = isRunning && !isPaused;
  const canStep = !isRunning || isPaused;

  // The last allowed step index (first step where sorted.length >= maxSortedCount)
  const maxAllowedStep = useMemo(() => {
    if (maxSortedCount === undefined) return steps.length - 1;
    const idx = (steps as SortingStep[]).findIndex(
      (s) => s.sorted && s.sorted.length >= maxSortedCount,
    );
    return idx >= 0 ? idx : steps.length - 1;
  }, [steps, maxSortedCount]);

  const effectiveTotal = maxSortedCount !== undefined ? maxAllowedStep + 1 : steps.length;

  // Auto-stop when auto-play hits the limit
  useEffect(() => {
    if (maxSortedCount !== undefined && isRunning && !isPaused && currentStep >= maxAllowedStep) {
      handleStopSorting();
    }
  }, [currentStep, isRunning, isPaused, maxAllowedStep, maxSortedCount, handleStopSorting]);

  // Visual step with grey gap between highlights
  const [visualStep, setVisualStep] = useState<SortingStep | undefined>(undefined);
  const gapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (gapTimerRef.current) clearTimeout(gapTimerRef.current);
    const step = steps[currentStep] as SortingStep | undefined;
    const prevStep = steps[currentStep - 1] as SortingStep | undefined;
    if (!step) { setVisualStep(undefined); return; }
    if (prevStep?.comparing || prevStep?.swapping) {
      setVisualStep(undefined);
      const gap = prevStep?.swapping ? 220 : 90;
      gapTimerRef.current = setTimeout(() => setVisualStep(step), gap);
      return () => { if (gapTimerRef.current) clearTimeout(gapTimerRef.current); };
    }
    setVisualStep(step);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, steps]);

  // Display array — use pre-swap heights during swap animation
  const currentStepData = steps[currentStep] as SortingStep | undefined;
  const displayArray = useMemo(() => {
    if (currentStepData?.swapping && currentStep > 0) {
      return (steps[currentStep - 1] as SortingStep | undefined)?.array ?? array;
    }
    return array;
  }, [currentStepData, currentStep, steps, array]);

  const maxValue = useMemo(
    () => Math.max(...displayArray.map((e) => e.value), 1),
    [displayArray],
  );

  const swappingIndices = visualStep?.swapping ?? [];
  const msg = deriveMsg(visualStep);

  useEffect(() => {
    setCustomArray(DEFAULT_ARRAY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const atLimit = maxSortedCount !== undefined && currentStep >= maxAllowedStep && steps.length > 0;

  const handlePlayPause = useCallback(() => {
    if (isPlaying) handlePauseResume();
    else if (isRunning && isPaused) handlePauseResume();
    else startSorting();
  }, [isPlaying, isRunning, isPaused, handlePauseResume, startSorting]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0 && canStep) stepForward(-1);
  }, [currentStep, canStep, stepForward]);

  const handleNext = useCallback(() => {
    const limit = maxSortedCount !== undefined ? maxAllowedStep : steps.length - 1;
    if (currentStep < limit && canStep) stepForward(1);
  }, [currentStep, maxAllowedStep, maxSortedCount, steps.length, canStep, stepForward]);

  const handleReset = useCallback(() => {
    handleStopSorting();
    setCustomArray(DEFAULT_ARRAY);
  }, [handleStopSorting, setCustomArray]);

  const isDone = atLimit || steps[currentStep]?.stepType === "complete";

  const nextDisabled = atLimit || currentStep >= steps.length - 1 || !canStep;
  const prevDisabled = currentStep === 0 || !canStep;

  return (
    <>
      <style>{`
        @keyframes miniGentleBounce {
          0%,100% { transform: translateY(0); }
          40%     { transform: translateY(-5px); }
          70%     { transform: translateY(-2px); }
        }
        @keyframes miniSwapRight {
          0%   { transform: translateY(-5px) translateX(0); }
          100% { transform: translateY(-5px) translateX(calc(100% + 8px)); }
        }
        @keyframes miniSwapLeft {
          0%   { transform: translateY(-5px) translateX(0); }
          100% { transform: translateY(-5px) translateX(calc(-100% - 8px)); }
        }
        .mini-bar { border-radius: 4px 4px 0 0; position: relative; width: 100%; transition: background 0.15s; }
        .mini-bar.compare { animation: miniGentleBounce 0.7s infinite; }
        .mini-bar.swapping { transform: translateY(-5px); }
        .mini-bar.swapping.slide-right { animation: miniSwapRight 0.5s cubic-bezier(0.34,1.2,0.64,1) forwards; }
        .mini-bar.swapping.slide-left  { animation: miniSwapLeft  0.5s cubic-bezier(0.34,1.2,0.64,1) forwards; }
      `}</style>

      <div
        style={{
          border: "1.5px dashed #c7d9f5",
          borderRadius: 16,
          background: "#f5f8ff",
          padding: "24px 24px 20px",
        }}
      >
        {/* Bars */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            height: 110,
            gap: 6,
            marginBottom: 16,
            paddingTop: 20,
          }}
        >
          {displayArray.map((el, i) => {
            const heightPct = Math.max((el.value / maxValue) * 100, 4);
            const state = getBarState(i, visualStep);
            let slideClass = "";
            if (state === "swapping" && swappingIndices.length === 2) {
              const [a, b] = swappingIndices;
              slideClass = i === Math.min(a, b) ? "slide-right" : "slide-left";
            }
            return (
              <div
                key={i}
                className={`mini-bar ${state !== "unsorted" ? state : ""} ${slideClass}`}
                style={{
                  flex: 1,
                  height: `${heightPct}%`,
                  background: BAR_COLORS[state],
                }}
              >
                {/* Value label above bar */}
                <span
                  style={{
                    position: "absolute",
                    bottom: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    marginBottom: 3,
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: 700,
                    fontSize: 11,
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                    color: state === "sorted" ? "#16a34a" : state === "swapping" ? "#ea580c" : state === "compare" ? "#2563eb" : "#6b7280",
                  }}
                >
                  {el.value}
                </span>
              </div>
            );
          })}
        </div>

        {/* What is happening */}
        <div
          style={{
            background: "#eef3fc",
            borderRadius: 10,
            padding: "10px 14px",
            marginBottom: 12,
            display: "flex",
            alignItems: "flex-start",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 13, flexShrink: 0, lineHeight: 1.4 }}>
            {msg.type === "compare" ? "👀" : msg.type === "swapping" ? "⇄" : msg.type === "sorted" ? "✅" : msg.type === "done" ? "🎉" : "👀"}
          </span>
          <div>
            <div
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 700,
                fontSize: 12,
                color: "#1e3a5f",
                lineHeight: 1.4,
              }}
            >
              {msg.type === "compare" && <>Looking at <span style={{ color: "#2563eb" }}>{msg.val1}</span> and <span style={{ color: "#2563eb" }}>{msg.val2}</span></>}
              {msg.type === "swapping" && <>Swapping <span style={{ color: "#ea580c" }}>{msg.val1}</span> and <span style={{ color: "#ea580c" }}>{msg.val2}</span></>}
              {msg.type === "sorted" && <><span style={{ color: "#16a34a" }}>{msg.val}</span> is done!</>}
              {msg.type === "done" && "All sorted!"}
              {msg.type === "idle" && "Press Play to start"}
            </div>
            <div
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 600,
                fontSize: 11,
                color: "#6b7280",
                lineHeight: 1.4,
              }}
            >
              {msg.type === "compare" && msg.needsSwap && `${msg.val1} > ${msg.val2} — swap needed`}
              {msg.type === "compare" && !msg.needsSwap && `${msg.val1} ≤ ${msg.val2} — no swap`}
              {msg.type === "swapping" && `Moving ${msg.val1} and ${msg.val2} into place`}
              {msg.type === "sorted" && "It found its correct spot."}
              {msg.type === "done" && "Every element is in the right place."}
              {msg.type === "idle" && "Choose an algorithm and press play."}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Step counter */}
          <span
            style={{
              fontFamily: "Nunito, sans-serif",
              fontWeight: 700,
              fontSize: 11,
              color: "#9ca3af",
              minWidth: 60,
            }}
          >
            {effectiveTotal > 0 ? `${currentStep + 1} / ${effectiveTotal}` : "—"}
          </span>

          {/* Playback buttons */}
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <button
              onClick={handlePrev}
              disabled={prevDisabled}
              style={{
                background: "#e8edf5",
                border: "none",
                borderRadius: 8,
                padding: "7px 14px",
                fontFamily: "Nunito, sans-serif",
                fontWeight: 700,
                fontSize: 12,
                color: prevDisabled ? "#c0cad8" : "#4b5563",
                cursor: prevDisabled ? "default" : "pointer",
              }}
            >
              ‹ Prev
            </button>

            {isDone ? (
              <button
                onClick={handleReset}
                style={{
                  background: "#22c55e",
                  border: "none",
                  borderRadius: 8,
                  padding: "7px 20px",
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 700,
                  fontSize: 12,
                  color: "#fff",
                  cursor: "pointer",
                  minWidth: 80,
                }}
              >
                ↺ Reset
              </button>
            ) : (
              <button
                onClick={handlePlayPause}
                style={{
                  background: "#6FB5FF",
                  border: "none",
                  borderRadius: 8,
                  padding: "7px 20px",
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 700,
                  fontSize: 12,
                  color: "#fff",
                  cursor: "pointer",
                  minWidth: 80,
                  boxShadow: "0 2px 10px rgba(111,181,255,0.35)",
                }}
              >
                {isPlaying ? "Pause" : "Play"}
              </button>
            )}

            <button
              onClick={handleNext}
              disabled={nextDisabled}
              style={{
                background: "#e8edf5",
                border: "none",
                borderRadius: 8,
                padding: "7px 14px",
                fontFamily: "Nunito, sans-serif",
                fontWeight: 700,
                fontSize: 12,
                color: nextDisabled ? "#c0cad8" : "#4b5563",
                cursor: nextDisabled ? "default" : "pointer",
              }}
            >
              Next ›
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
