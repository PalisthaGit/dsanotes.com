"use client";

import { useCallback, useEffect } from "react";
import type { CharState } from "@/algorithms/types/string-matching";
import { useStringMatchingEngine } from "@/hooks/use-string-matching-engine";

const DEFAULT_TEXT = "AABACAAB";
const DEFAULT_PATTERN = "AAB";

const CHAR_COLORS: Record<CharState, { bg: string; text: string }> = {
  default: { bg: "#c7d2e8", text: "#374151" },
  active: { bg: "#fbbf24", text: "#92400e" },
  matched: { bg: "#22c55e", text: "#14532d" },
  mismatch: { bg: "#f87171", text: "#7f1d1d" },
  candidate: { bg: "#a5f3fc", text: "#164e63" },
};

const SPEED = [70];

export default function MiniStringVisualizer({
  algorithm = "naive",
}: {
  algorithm?: string;
}) {
  const engine = useStringMatchingEngine();

  useEffect(() => {
    engine.setAlgorithm(algorithm);
    engine.generateSteps(
      { text: DEFAULT_TEXT, pattern: DEFAULT_PATTERN },
      algorithm,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algorithm]);

  const isPlaying = engine.isRunning && !engine.isPaused;
  const isDone =
    engine.steps.length > 0 &&
    engine.currentStep === engine.steps.length - 1;

  const currentStepData = engine.steps[engine.currentStep];
  const textStates = currentStepData?.textStates ?? {};
  const patternStates = currentStepData?.patternStates ?? {};
  const patternOffset = currentStepData?.patternOffset ?? 0;
  const message = currentStepData?.message ?? "Press Play to start";
  const matches = currentStepData?.matches ?? [];

  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      engine.pauseResume(SPEED);
    } else if (engine.isRunning && engine.isPaused) {
      engine.pauseResume(SPEED);
    } else {
      engine.clearTimeouts();
      engine.setIsPaused(false);
      const steps = engine.generateSteps(
        { text: DEFAULT_TEXT, pattern: DEFAULT_PATTERN },
        algorithm,
      );
      engine.startExecuting(steps, SPEED);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, engine, algorithm]);

  const handleReset = useCallback(() => {
    engine.clearTimeouts();
    engine.setIsRunning(false);
    engine.setIsPaused(false);
    engine.generateSteps(
      { text: DEFAULT_TEXT, pattern: DEFAULT_PATTERN },
      algorithm,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [engine, algorithm]);

  const cellSize = 38;

  return (
    <div
      style={{
        border: "1.5px dashed #c7d9f5",
        borderRadius: 16,
        background: "#f5f8ff",
        padding: "20px 24px 20px",
      }}
    >
      {/* String display */}
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <div style={{ minWidth: DEFAULT_TEXT.length * (cellSize + 4), paddingBottom: 8 }}>
          {/* Labels */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
            <span
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 700,
                fontSize: 10,
                color: "#6b7280",
                width: 52,
                flexShrink: 0,
              }}
            >
              TEXT
            </span>
            <div style={{ display: "flex", gap: 4 }}>
              {DEFAULT_TEXT.split("").map((char, i) => {
                const state = (textStates[i] as CharState) ?? "default";
                const colors = CHAR_COLORS[state];
                const isMatch = matches.includes(i);
                return (
                  <div
                    key={i}
                    style={{
                      width: cellSize,
                      height: cellSize,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 8,
                      background: isMatch && state === "default" ? "#bbf7d0" : colors.bg,
                      transition: "background 0.2s",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontWeight: 700,
                        fontSize: 14,
                        color: colors.text,
                      }}
                    >
                      {char}
                    </span>
                    <span
                      style={{
                        fontFamily: "Nunito, sans-serif",
                        fontSize: 9,
                        color: "#9ca3af",
                        fontWeight: 600,
                      }}
                    >
                      {i}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pattern row */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 700,
                fontSize: 10,
                color: "#6b7280",
                width: 52,
                flexShrink: 0,
              }}
            >
              PATTERN
            </span>
            <div style={{ display: "flex", gap: 4 }}>
              {/* Offset spacers */}
              {Array.from({ length: patternOffset }).map((_, i) => (
                <div key={`spacer-${i}`} style={{ width: cellSize, height: cellSize, flexShrink: 0 }} />
              ))}
              {/* Pattern chars */}
              {DEFAULT_PATTERN.split("").map((char, j) => {
                const state = (patternStates[j] as CharState) ?? "default";
                const colors = CHAR_COLORS[state];
                return (
                  <div
                    key={j}
                    style={{
                      width: cellSize,
                      height: cellSize,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 8,
                      background: colors.bg,
                      border: "1.5px solid rgba(111,181,255,0.3)",
                      transition: "background 0.2s",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontWeight: 700,
                        fontSize: 14,
                        color: colors.text,
                      }}
                    >
                      {char}
                    </span>
                    <span
                      style={{
                        fontFamily: "Nunito, sans-serif",
                        fontSize: 9,
                        color: "#9ca3af",
                        fontWeight: 600,
                      }}
                    >
                      {j}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 10 }}>
        {[
          { color: "#c7d2e8", label: "Default" },
          { color: "#fbbf24", label: "Comparing" },
          { color: "#22c55e", label: "Match" },
          { color: "#f87171", label: "Mismatch" },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: item.color }} />
            <span style={{ fontFamily: "Nunito, sans-serif", fontSize: 10, color: "#6b7280", fontWeight: 600 }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Message */}
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
          {message}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span
          style={{
            fontFamily: "Nunito, sans-serif",
            fontWeight: 700,
            fontSize: 11,
            color: "#9ca3af",
            minWidth: 60,
          }}
        >
          {engine.steps.length > 0
            ? `${engine.currentStep + 1} / ${engine.steps.length}`
            : "—"}
        </span>

        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {!isDone && (
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
              {isPlaying
                ? "Pause"
                : engine.isRunning && engine.isPaused
                  ? "Resume"
                  : "Play"}
            </button>
          )}

          <button
            onClick={handleReset}
            style={{
              background: isDone ? "#22c55e" : "#e8edf5",
              border: "none",
              borderRadius: 8,
              padding: "7px 20px",
              fontFamily: "Nunito, sans-serif",
              fontWeight: 700,
              fontSize: 12,
              color: isDone ? "#fff" : "#6b7280",
              cursor: "pointer",
              minWidth: 80,
            }}
          >
            ↺ Reset
          </button>
        </div>
      </div>
    </div>
  );
}
