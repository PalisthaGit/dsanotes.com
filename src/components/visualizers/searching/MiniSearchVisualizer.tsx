"use client";

import { useCallback, useEffect, useState } from "react";
import type { SearchStep } from "@/algorithms/types/searching";
import { useSearchVisualization } from "@/hooks/use-search-visualization";

const DEFAULT_ARRAY = [3, 7, 12, 18, 25, 31, 38, 45];
const DEFAULT_SEARCH_VALUE = 25;

type CellState = "found" | "current" | "visited" | "eliminated" | "default";

const CELL_COLORS: Record<CellState, string> = {
  found: "#22c55e",
  current: "#fbbf24",
  visited: "#fca5a5",
  eliminated: "#d1d5db",
  default: "#c7d2e8",
};

function getCellState(
  index: number,
  step: SearchStep | undefined,
  algorithm: string,
): CellState {
  if (!step) return "default";
  if (step.foundIndex === index) return "found";
  if (step.currentIndex === index && step.foundIndex === -1) return "current";
  if (step.visitedIndices.includes(index) && step.foundIndex === -1)
    return "visited";
  if (
    algorithm === "binary" &&
    step.eliminatedIndices.includes(index) &&
    step.foundIndex === -1
  )
    return "eliminated";
  return "default";
}

export default function MiniSearchVisualizer({
  initialAlgorithm = "linear",
}: {
  initialAlgorithm?: string;
}) {
  const {
    algorithm,
    setAlgorithm,
    steps,
    currentStep,
    isRunning,
    isPaused,
    startSearch,
    handlePauseResume,
    handleStopSearch,
    stepForward,
    setSortedArray,
    setSearchValue,
  } = useSearchVisualization(DEFAULT_ARRAY);

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    setSortedArray(DEFAULT_ARRAY);
    setSearchValue(DEFAULT_SEARCH_VALUE);
    if (initialAlgorithm !== "linear") {
      setAlgorithm(initialAlgorithm);
    }
    setInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isPlaying = isRunning && !isPaused;
  const isDone = steps.length > 0 && currentStep === steps.length - 1;

  const currentStepData = steps[currentStep] as SearchStep | undefined;

  const getMessage = () => {
    if (!initialized || steps.length === 0) return "Press Play to start";
    return currentStepData?.message ?? "Press Play to start";
  };

  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      handlePauseResume();
    } else if (isRunning && isPaused) {
      handlePauseResume();
    } else {
      startSearch();
    }
  }, [isPlaying, isRunning, isPaused, handlePauseResume, startSearch]);

  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      stepForward(1);
    }
  }, [currentStep, steps.length, stepForward]);

  const handleReset = useCallback(() => {
    handleStopSearch();
    setSortedArray(DEFAULT_ARRAY);
    setSearchValue(DEFAULT_SEARCH_VALUE);
  }, [handleStopSearch, setSortedArray, setSearchValue]);

  return (
    <div
      style={{
        border: "1.5px dashed #c7d9f5",
        borderRadius: 16,
        background: "#f5f8ff",
        padding: "24px 24px 20px",
      }}
    >
      {/* Array cells */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 6,
          marginBottom: 16,
        }}
      >
        {DEFAULT_ARRAY.map((val, i) => {
          const state = getCellState(i, currentStepData, algorithm);
          const bgColor = CELL_COLORS[state];
          return (
            <div
              key={i}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
              }}
            >
              <div
                style={{
                  width: "100%",
                  background: bgColor,
                  borderRadius: 8,
                  padding: "10px 0",
                  textAlign: "center",
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  color:
                    state === "found"
                      ? "#14532d"
                      : state === "current"
                        ? "#92400e"
                        : state === "visited"
                          ? "#991b1b"
                          : state === "eliminated"
                            ? "#9ca3af"
                            : "#374151",
                  transition: "background 0.2s",
                }}
              >
                {val}
              </div>
              <span
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 600,
                  fontSize: 10,
                  color: "#9ca3af",
                }}
              >
                {i}
              </span>
            </div>
          );
        })}
      </div>

      {/* Message box */}
      <div
        style={{
          background: "#eef3fc",
          borderRadius: 10,
          padding: "10px 14px",
          marginBottom: 12,
        }}
      >
        <div
          style={{
            fontFamily: "Nunito, sans-serif",
            fontWeight: 700,
            fontSize: 12,
            color: "#1e3a5f",
            lineHeight: 1.4,
          }}
        >
          {getMessage()}
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
          {steps.length > 0 ? `${currentStep + 1} / ${steps.length}` : "—"}
        </span>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
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
              {isPlaying ? "Pause" : isRunning && isPaused ? "Resume" : "Play"}
            </button>
          )}

          <button
            onClick={handleNext}
            disabled={isDone || steps.length === 0 || currentStep >= steps.length - 1}
            style={{
              background: "#e8edf5",
              border: "none",
              borderRadius: 8,
              padding: "7px 14px",
              fontFamily: "Nunito, sans-serif",
              fontWeight: 700,
              fontSize: 12,
              color:
                isDone || steps.length === 0 || currentStep >= steps.length - 1
                  ? "#c0cad8"
                  : "#4b5563",
              cursor:
                isDone || steps.length === 0 || currentStep >= steps.length - 1
                  ? "default"
                  : "pointer",
            }}
          >
            Next ›
          </button>
        </div>
      </div>
    </div>
  );
}
