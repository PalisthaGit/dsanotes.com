"use client";

import { useCallback, useEffect, useState } from "react";
import type {
  GraphData,
  EdgeState,
  NodeState,
} from "@/algorithms/types/graph";
import { useGraphEngine } from "@/hooks/use-graph-engine";
import type { GraphAlgorithmCategory } from "@/algorithms/registry/graph-algorithms-registry";

// ── Fixed undirected graph (pathfinding + MST) ─────────────────────────────
const UNDIRECTED_GRAPH: GraphData = {
  nodes: [
    { id: "A", x: 65, y: 50, label: "A" },
    { id: "B", x: 185, y: 50, label: "B" },
    { id: "C", x: 305, y: 50, label: "C" },
    { id: "D", x: 125, y: 135, label: "D" },
    { id: "E", x: 245, y: 135, label: "E" },
  ],
  edges: [
    { id: "AB", from: "A", to: "B", weight: 4 },
    { id: "BC", from: "B", to: "C", weight: 2 },
    { id: "AD", from: "A", to: "D", weight: 3 },
    { id: "BD", from: "B", to: "D", weight: 1 },
    { id: "BE", from: "B", to: "E", weight: 5 },
    { id: "CE", from: "C", to: "E", weight: 3 },
    { id: "DE", from: "D", to: "E", weight: 2 },
  ],
};

// ── Fixed directed graph (SCC) ─────────────────────────────────────────────
const DIRECTED_GRAPH: GraphData = {
  nodes: [
    { id: "A", x: 80, y: 90, label: "A" },
    { id: "B", x: 185, y: 35, label: "B" },
    { id: "C", x: 290, y: 90, label: "C" },
    { id: "D", x: 185, y: 145, label: "D" },
  ],
  edges: [
    { id: "AB", from: "A", to: "B", weight: 1 },
    { id: "BC", from: "B", to: "C", weight: 1 },
    { id: "CA", from: "C", to: "A", weight: 1 },
    { id: "BD", from: "B", to: "D", weight: 1 },
  ],
};

// ── Color maps ─────────────────────────────────────────────────────────────
const NODE_COLORS: Record<NodeState, string> = {
  default: "#c7d2e8",
  visited: "#93c5fd",
  current: "#fbbf24",
  candidate: "#a5f3fc",
  rejected: "#fca5a5",
  component: "#86efac",
};

const EDGE_COLORS: Record<EdgeState, string> = {
  default: "#d1d5db",
  tree: "#22c55e",
  current: "#fb923c",
  candidate: "#93c5fd",
  rejected: "#fca5a5",
  back: "#c084fc",
  cross: "#94a3b8",
  forward: "#86efac",
};

const SPEED = [70];

// ── Helpers ────────────────────────────────────────────────────────────────
function getArrowhead(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  r = 18,
): { ax: number; ay: number } {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / len;
  const uy = dy / len;
  return { ax: x2 - ux * r, ay: y2 - uy * r };
}

// ── Component ──────────────────────────────────────────────────────────────
export default function MiniGraphVisualizer({
  algorithm,
  category,
}: {
  algorithm: string;
  category: GraphAlgorithmCategory;
}) {
  const engine = useGraphEngine(category);
  const [hasStarted, setHasStarted] = useState(false);
  const isDirected = category === "scc";
  const graphData = isDirected ? DIRECTED_GRAPH : UNDIRECTED_GRAPH;
  const options =
    category === "pathfinding"
      ? { startNodeId: "A", endNodeId: "C" }
      : category === "mst"
        ? { startNodeId: "A" }
        : undefined;

  useEffect(() => {
    engine.generateSteps(graphData, options, algorithm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algorithm]);

  const isPlaying = engine.isRunning && !engine.isPaused;
  const isDone =
    engine.steps.length > 0 &&
    engine.currentStep === engine.steps.length - 1;

  const currentStepData = hasStarted ? engine.steps[engine.currentStep] : undefined;
  const nodeStates = currentStepData?.nodeStates ?? {};
  const edgeStates = currentStepData?.edgeStates ?? {};
  const message = currentStepData?.message ?? "Press Play to start";

  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      engine.pauseResume(SPEED);
    } else if (engine.isRunning && engine.isPaused) {
      engine.pauseResume(SPEED);
    } else {
      setHasStarted(true);
      engine.clearTimeouts();
      engine.setIsPaused(false);
      const steps = engine.generateSteps(graphData, options, algorithm);
      engine.startExecuting(steps, SPEED);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, engine, algorithm]);

  const handleReset = useCallback(() => {
    engine.clearTimeouts();
    engine.setIsRunning(false);
    engine.setIsPaused(false);
    engine.generateSteps(graphData, options, algorithm);
    setHasStarted(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [engine, algorithm]);

  const viewBox = isDirected ? "0 0 370 185" : "0 0 370 185";

  return (
    <div
      style={{
        border: "1.5px dashed #c7d9f5",
        borderRadius: 16,
        background: "#f5f8ff",
        padding: "20px 24px 20px",
      }}
    >
      {/* SVG Graph */}
      <div style={{ marginBottom: 12 }}>
        <svg
          viewBox={viewBox}
          style={{ width: "100%", height: "auto", maxHeight: 185 }}
        >
          {/* Arrowhead marker for directed graphs */}
          {isDirected && (
            <defs>
              <marker
                id="arrowhead"
                markerWidth="8"
                markerHeight="6"
                refX="6"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#d1d5db" />
              </marker>
            </defs>
          )}

          {/* Edges */}
          {graphData.edges.map((edge) => {
            const from = graphData.nodes.find((n) => n.id === edge.from)!;
            const to = graphData.nodes.find((n) => n.id === edge.to)!;
            const state = edgeStates[edge.id] ?? "default";
            const color = EDGE_COLORS[state];
            const isBold = state === "tree" || state === "current";
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2;

            if (isDirected) {
              const { ax, ay } = getArrowhead(from.x, from.y, to.x, to.y);
              return (
                <g key={edge.id}>
                  <line
                    x1={from.x}
                    y1={from.y}
                    x2={ax}
                    y2={ay}
                    stroke={color}
                    strokeWidth={isBold ? 2.5 : 1.5}
                    strokeLinecap="round"
                    markerEnd="url(#arrowhead)"
                  />
                </g>
              );
            }

            return (
              <g key={edge.id}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={color}
                  strokeWidth={isBold ? 2.5 : 1.5}
                  strokeLinecap="round"
                />
                <text
                  x={midX}
                  y={midY - 5}
                  textAnchor="middle"
                  fontSize={9}
                  fill="#9ca3af"
                  fontFamily="Nunito, sans-serif"
                  fontWeight={700}
                >
                  {edge.weight}
                </text>
              </g>
            );
          })}

          {/* Nodes */}
          {graphData.nodes.map((node) => {
            const state = nodeStates[node.id] ?? "default";
            const color = NODE_COLORS[state];
            return (
              <g key={node.id}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={18}
                  fill={color}
                  stroke="#ffffff"
                  strokeWidth={2}
                />
                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  fontSize={13}
                  fontWeight={700}
                  fontFamily="Poppins, sans-serif"
                  fill="#374151"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          marginBottom: 10,
        }}
      >
        {[
          { color: "#c7d2e8", label: "Unvisited" },
          { color: "#fbbf24", label: "Current" },
          { color: "#93c5fd", label: "Visited" },
          { color: "#22c55e", label: category === "mst" ? "MST Edge" : "Path" },
        ].map((item) => (
          <div
            key={item.label}
            style={{ display: "flex", alignItems: "center", gap: 4 }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: item.color,
              }}
            />
            <span
              style={{
                fontFamily: "Nunito, sans-serif",
                fontSize: 10,
                color: "#6b7280",
                fontWeight: 600,
              }}
            >
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
