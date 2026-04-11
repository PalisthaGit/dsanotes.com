"use client";

import { useState, useCallback } from "react";

type DSType = "stack" | "queue" | "linked-list" | "hash-map" | "bst" | "heap";

// ── STACK ────────────────────────────────────────────────────────────────────
interface StackStep { op: string; msg: string; sub: string; items: number[]; highlighted: number | null }
const STACK_STEPS: StackStep[] = [
  { op: "—", msg: "Press Next to start", sub: "The stack is empty. Items will grow upward.", items: [], highlighted: null },
  { op: "push(10)", msg: "Pushed 10 onto the stack", sub: "10 is now at the top.", items: [10], highlighted: 0 },
  { op: "push(20)", msg: "Pushed 20 onto the stack", sub: "20 is now at the top.", items: [10, 20], highlighted: 1 },
  { op: "push(30)", msg: "Pushed 30 onto the stack", sub: "30 is now at the top.", items: [10, 20, 30], highlighted: 2 },
  { op: "peek()", msg: "Peek returns 30", sub: "Top element read without removing it.", items: [10, 20, 30], highlighted: 2 },
  { op: "pop()", msg: "Popped 30 off the stack", sub: "20 is now the new top.", items: [10, 20], highlighted: 1 },
  { op: "pop()", msg: "Popped 20 off the stack", sub: "Only 10 remains in the stack.", items: [10], highlighted: 0 },
];

// ── QUEUE ────────────────────────────────────────────────────────────────────
interface QueueStep { op: string; msg: string; sub: string; items: string[]; highlighted: number | null }
const QUEUE_STEPS: QueueStep[] = [
  { op: "—", msg: "Press Next to start", sub: "The queue is empty. Items enter at the back, leave at the front.", items: [], highlighted: null },
  { op: 'enqueue("Alice")', msg: "Enqueued Alice", sub: "Alice joins the back of the queue.", items: ["Alice"], highlighted: 0 },
  { op: 'enqueue("Bob")', msg: "Enqueued Bob", sub: "Bob joins behind Alice.", items: ["Alice", "Bob"], highlighted: 1 },
  { op: 'enqueue("Charlie")', msg: "Enqueued Charlie", sub: "Charlie is at the back.", items: ["Alice", "Bob", "Charlie"], highlighted: 2 },
  { op: "peek()", msg: "Peek returns Alice", sub: "Front element read — Alice is next in line.", items: ["Alice", "Bob", "Charlie"], highlighted: 0 },
  { op: "dequeue()", msg: "Dequeued Alice", sub: "Bob is now the new front.", items: ["Bob", "Charlie"], highlighted: 0 },
  { op: "dequeue()", msg: "Dequeued Bob", sub: "Charlie is now alone at the front.", items: ["Charlie"], highlighted: 0 },
];

// ── LINKED LIST ──────────────────────────────────────────────────────────────
interface LLStep { op: string; msg: string; sub: string; nodes: number[]; highlighted: number | null }
const LL_STEPS: LLStep[] = [
  { op: "—", msg: "Press Next to start", sub: "Empty list — head → null", nodes: [], highlighted: null },
  { op: "addFirst(5)", msg: "Added 5 at the head", sub: "head → [5] → null", nodes: [5], highlighted: 0 },
  { op: "addLast(10)", msg: "Added 10 at the tail", sub: "Traversed to end, linked new node.", nodes: [5, 10], highlighted: 1 },
  { op: "addLast(20)", msg: "Added 20 at the tail", sub: "head → [5] → [10] → [20] → null", nodes: [5, 10, 20], highlighted: 2 },
  { op: "addLast(30)", msg: "Added 30 at the tail", sub: "head → [5] → [10] → [20] → [30] → null", nodes: [5, 10, 20, 30], highlighted: 3 },
  { op: "contains(20)", msg: "Found 20 after 3 steps", sub: "Traversed from head: 5 → 10 → 20 ✓", nodes: [5, 10, 20, 30], highlighted: 2 },
  { op: "delete(10)", msg: "Deleted node with value 10", sub: "Node before 10 now skips to node after 10.", nodes: [5, 20, 30], highlighted: null },
];

// ── HASH MAP ─────────────────────────────────────────────────────────────────
type Bucket = Array<{ key: string; value: string }>;
interface HashMapStep { op: string; msg: string; sub: string; buckets: Bucket[]; highlighted: number | null }
const HASHMAP_STEPS: HashMapStep[] = [
  { op: "—", msg: "Press Next to start", sub: "5 empty buckets (indices 0–4).", buckets: [[], [], [], [], []], highlighted: null },
  { op: 'put("name", "Alice")', msg: 'Stored "name" → "Alice" at index 0', sub: 'hash("name") = 0. O(1) insert.', buckets: [[{ key: "name", value: "Alice" }], [], [], [], []], highlighted: 0 },
  { op: 'put("age", "25")', msg: 'Stored "age" → "25" at index 2', sub: 'hash("age") = 2. O(1) insert.', buckets: [[{ key: "name", value: "Alice" }], [], [{ key: "age", value: "25" }], [], []], highlighted: 2 },
  { op: 'put("city", "NYC")', msg: 'Stored "city" → "NYC" at index 4', sub: 'hash("city") = 4. O(1) insert.', buckets: [[{ key: "name", value: "Alice" }], [], [{ key: "age", value: "25" }], [], [{ key: "city", value: "NYC" }]], highlighted: 4 },
  { op: 'put("job", "Dev")', msg: 'Stored "job" → "Dev" at index 1', sub: 'hash("job") = 1. O(1) insert.', buckets: [[{ key: "name", value: "Alice" }], [{ key: "job", value: "Dev" }], [{ key: "age", value: "25" }], [], [{ key: "city", value: "NYC" }]], highlighted: 1 },
  { op: 'get("age")', msg: 'Retrieved "age" → "25"', sub: 'hash("age") = 2. Direct O(1) lookup!', buckets: [[{ key: "name", value: "Alice" }], [{ key: "job", value: "Dev" }], [{ key: "age", value: "25" }], [], [{ key: "city", value: "NYC" }]], highlighted: 2 },
  { op: 'remove("city")', msg: 'Removed "city" from index 4', sub: "Bucket 4 is now empty.", buckets: [[{ key: "name", value: "Alice" }], [{ key: "job", value: "Dev" }], [{ key: "age", value: "25" }], [], []], highlighted: 4 },
];

// ── BST ──────────────────────────────────────────────────────────────────────
const BST_NODES = [
  { val: 50, x: 110, y: 22 },
  { val: 30, x: 62,  y: 72 },
  { val: 70, x: 158, y: 72 },
  { val: 20, x: 36,  y: 122 },
  { val: 40, x: 88,  y: 122 },
] as const;
const BST_EDGES: [number, number][] = [[0,1],[0,2],[1,3],[1,4]];

interface BSTStep { op: string; msg: string; sub: string; active: number[]; highlighted: number[] }
const BST_STEPS: BSTStep[] = [
  { op: "—", msg: "Press Next to start", sub: "Empty BST. Smaller values go left, larger go right.", active: [], highlighted: [] },
  { op: "insert(50)", msg: "Inserted 50 as root", sub: "First insertion always becomes the root.", active: [0], highlighted: [0] },
  { op: "insert(30)", msg: "Inserted 30 as left child of 50", sub: "30 < 50 → go left. Insert here.", active: [0,1], highlighted: [1] },
  { op: "insert(70)", msg: "Inserted 70 as right child of 50", sub: "70 > 50 → go right. Insert here.", active: [0,1,2], highlighted: [2] },
  { op: "insert(20)", msg: "Inserted 20 as left child of 30", sub: "20 < 50 → left. 20 < 30 → left again.", active: [0,1,2,3], highlighted: [3] },
  { op: "insert(40)", msg: "Inserted 40 as right child of 30", sub: "40 < 50 → left. 40 > 30 → right.", active: [0,1,2,3,4], highlighted: [4] },
  { op: "search(40)", msg: "Found 40!", sub: "Path: 50 → 30 → 40 (3 comparisons, O(log n)).", active: [0,1,2,3,4], highlighted: [0,1,4] },
];

// ── HEAP ─────────────────────────────────────────────────────────────────────
const HEAP_POS = [
  { x: 110, y: 22  },
  { x: 65,  y: 72  },
  { x: 155, y: 72  },
  { x: 42,  y: 122 },
  { x: 88,  y: 122 },
] as const;
const HEAP_EDGES: [number, number][] = [[0,1],[0,2],[1,3],[1,4]];

interface HeapStep { op: string; msg: string; sub: string; items: number[]; highlighted: number[] }
const HEAP_STEPS: HeapStep[] = [
  { op: "—", msg: "Press Next to start", sub: "Min-Heap: smallest element is always at the root.", items: [], highlighted: [] },
  { op: "insert(40)", msg: "Inserted 40 as root", sub: "First element — no sift-up needed.", items: [40], highlighted: [0] },
  { op: "insert(10)", msg: "Inserted 10 — sifted up to root", sub: "10 < 40 (parent) → swap. 10 is the new root.", items: [10, 40], highlighted: [0, 1] },
  { op: "insert(30)", msg: "Inserted 30 at index 2", sub: "30 > 10 (parent) — no swap needed.", items: [10, 40, 30], highlighted: [2] },
  { op: "insert(5)", msg: "Inserted 5 — sifted up to root", sub: "5 < 40 → swap. 5 < 10 → swap again. New minimum!", items: [5, 10, 30, 40], highlighted: [0] },
  { op: "insert(20)", msg: "Inserted 20 at index 4", sub: "20 > 10 (parent) — no swap needed.", items: [5, 10, 30, 40, 20], highlighted: [4] },
  { op: "extractMin()", msg: "Extracted minimum: 5", sub: "Last element placed at root, sifted down. New min: 10.", items: [10, 20, 30, 40], highlighted: [0] },
];

// ── RENDER HELPERS ───────────────────────────────────────────────────────────
function StackViz({ step }: { step: StackStep }) {
  const { items, highlighted } = step;
  return (
    <div style={{ minHeight: 130, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 4 }}>
      {items.length === 0 && (
        <div style={{ textAlign: "center", fontFamily: "Nunito, sans-serif", fontSize: 13, color: "#9ca3af", marginBottom: 8 }}>
          (empty)
        </div>
      )}
      {[...items].reverse().map((val, ri) => {
        const idx = items.length - 1 - ri;
        const isTop = idx === items.length - 1;
        const isHL = idx === highlighted;
        return (
          <div key={idx} style={{ position: "relative" }}>
            {isTop && (
              <span style={{ position: "absolute", right: "100%", top: "50%", transform: "translateY(-50%)", fontSize: 11, fontFamily: "Nunito, sans-serif", fontWeight: 700, color: "#6FB5FF", paddingRight: 6, whiteSpace: "nowrap" }}>
                TOP →
              </span>
            )}
            <div style={{ background: isHL ? "#6FB5FF" : "#dbeeff", color: isHL ? "#fff" : "#1e3a5f", borderRadius: 8, padding: "8px 0", textAlign: "center", fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: 14, border: isHL ? "none" : "1px solid #c7d9f5", transition: "background 0.2s" }}>
              {val}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function QueueViz({ step }: { step: QueueStep }) {
  const { items, highlighted } = step;
  return (
    <div style={{ minHeight: 60, display: "flex", alignItems: "center" }}>
      {items.length === 0 ? (
        <div style={{ width: "100%", textAlign: "center", fontFamily: "Nunito, sans-serif", fontSize: 13, color: "#9ca3af" }}>(empty)</div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 4, overflowX: "auto", width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, flexShrink: 0 }}>
            <span style={{ fontSize: 10, fontFamily: "Nunito, sans-serif", fontWeight: 700, color: "#22c55e" }}>FRONT</span>
            <span style={{ fontSize: 14, color: "#22c55e" }}>◄</span>
          </div>
          {items.map((item, i) => {
            const isHL = i === highlighted;
            return (
              <div key={i} style={{ background: isHL ? "#6FB5FF" : "#dbeeff", color: isHL ? "#fff" : "#1e3a5f", borderRadius: 8, padding: "8px 12px", fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: 13, whiteSpace: "nowrap", border: isHL ? "none" : "1px solid #c7d9f5", transition: "background 0.2s" }}>
                {item}
              </div>
            );
          })}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, flexShrink: 0 }}>
            <span style={{ fontSize: 10, fontFamily: "Nunito, sans-serif", fontWeight: 700, color: "#f97316" }}>BACK</span>
            <span style={{ fontSize: 14, color: "#f97316" }}>►</span>
          </div>
        </div>
      )}
    </div>
  );
}

function LinkedListViz({ step }: { step: LLStep }) {
  const { nodes, highlighted } = step;
  return (
    <div style={{ minHeight: 60, display: "flex", alignItems: "center", overflowX: "auto" }}>
      <span style={{ fontSize: 11, fontFamily: "Nunito, sans-serif", fontWeight: 700, color: "#6b7280", marginRight: 4, flexShrink: 0 }}>head →</span>
      {nodes.length === 0 ? (
        <span style={{ fontSize: 13, fontFamily: "Nunito, sans-serif", fontWeight: 700, color: "#6b7280" }}>null</span>
      ) : (
        <>
          {nodes.map((val, i) => {
            const isHL = i === highlighted;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                <div style={{ background: isHL ? "#6FB5FF" : "#dbeeff", borderRadius: 8, border: isHL ? "none" : "1px solid #c7d9f5", overflow: "hidden", display: "flex", fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: 13, transition: "background 0.2s" }}>
                  <span style={{ padding: "6px 10px", color: isHL ? "#fff" : "#1e3a5f" }}>{val}</span>
                  <span style={{ padding: "6px 8px", background: isHL ? "rgba(0,0,0,0.15)" : "#c7d9f5", color: isHL ? "#fff" : "#6b7280", fontSize: 11 }}>→</span>
                </div>
                <span style={{ fontSize: 14, color: "#9ca3af", margin: "0 2px" }}>→</span>
              </div>
            );
          })}
          <span style={{ fontSize: 13, fontFamily: "Nunito, sans-serif", fontWeight: 700, color: "#6b7280", flexShrink: 0 }}>null</span>
        </>
      )}
    </div>
  );
}

function HashMapViz({ step }: { step: HashMapStep }) {
  const { buckets, highlighted } = step;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5, minHeight: 140 }}>
      {buckets.map((bucket, i) => {
        const isHL = i === highlighted;
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ background: isHL ? "#6FB5FF" : "#dbeeff", color: isHL ? "#fff" : "#1e3a5f", borderRadius: 6, width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: 11, flexShrink: 0, border: isHL ? "none" : "1px solid #c7d9f5" }}>
              {i}
            </div>
            <div style={{ width: 2, height: 18, background: "#c7d9f5", borderRadius: 1, flexShrink: 0 }} />
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              {bucket.length === 0 ? (
                <span style={{ fontFamily: "Nunito, sans-serif", fontSize: 11, color: "#9ca3af" }}>—</span>
              ) : (
                bucket.map((entry, j) => (
                  <div key={j} style={{ background: isHL ? "#e0f0ff" : "#f0f7ff", border: `1px solid ${isHL ? "#6FB5FF" : "#c7d9f5"}`, borderRadius: 6, padding: "2px 8px", fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: 12, color: "#1e3a5f" }}>
                    {entry.key}: {entry.value}
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function BSTViz({ step }: { step: BSTStep }) {
  const { active, highlighted } = step;
  const R = 18;
  return (
    <div style={{ minHeight: 155 }}>
      {active.length === 0 ? (
        <div style={{ textAlign: "center", fontFamily: "Nunito, sans-serif", fontSize: 13, color: "#9ca3af", paddingTop: 60 }}>(empty tree)</div>
      ) : (
        <svg viewBox="0 0 220 155" style={{ width: "100%", maxHeight: 155 }}>
          {BST_EDGES.map(([f, t]) => {
            if (!active.includes(f) || !active.includes(t)) return null;
            const pathHL = highlighted.includes(f) && highlighted.includes(t);
            return <line key={`${f}-${t}`} x1={BST_NODES[f].x} y1={BST_NODES[f].y} x2={BST_NODES[t].x} y2={BST_NODES[t].y} stroke={pathHL ? "#6FB5FF" : "#c7d9f5"} strokeWidth={pathHL ? 2 : 1.5} />;
          })}
          {BST_NODES.map((node, i) => {
            if (!active.includes(i)) return null;
            const isHL = highlighted.includes(i);
            return (
              <g key={i}>
                <circle cx={node.x} cy={node.y} r={R} fill={isHL ? "#6FB5FF" : "#dbeeff"} stroke={isHL ? "#1a6bb5" : "#c7d9f5"} strokeWidth={1.5} />
                <text x={node.x} y={node.y} textAnchor="middle" dominantBaseline="central" fontFamily="Nunito, sans-serif" fontWeight="700" fontSize="12" fill={isHL ? "#fff" : "#1e3a5f"}>{node.val}</text>
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}

function HeapViz({ step }: { step: HeapStep }) {
  const { items, highlighted } = step;
  const R = 18;
  return (
    <div>
      <div style={{ minHeight: 148 }}>
        {items.length === 0 ? (
          <div style={{ textAlign: "center", fontFamily: "Nunito, sans-serif", fontSize: 13, color: "#9ca3af", paddingTop: 54 }}>(empty heap)</div>
        ) : (
          <svg viewBox="0 0 220 148" style={{ width: "100%", maxHeight: 148 }}>
            {HEAP_EDGES.map(([f, t]) => {
              if (f >= items.length || t >= items.length) return null;
              const edgeHL = highlighted.includes(f) && highlighted.includes(t);
              return <line key={`${f}-${t}`} x1={HEAP_POS[f].x} y1={HEAP_POS[f].y} x2={HEAP_POS[t].x} y2={HEAP_POS[t].y} stroke={edgeHL ? "#6FB5FF" : "#c7d9f5"} strokeWidth={edgeHL ? 2 : 1.5} />;
            })}
            {items.map((val, i) => {
              const isHL = highlighted.includes(i);
              return (
                <g key={i}>
                  <circle cx={HEAP_POS[i].x} cy={HEAP_POS[i].y} r={R} fill={isHL ? "#6FB5FF" : "#dbeeff"} stroke={isHL ? "#1a6bb5" : "#c7d9f5"} strokeWidth={1.5} />
                  <text x={HEAP_POS[i].x} y={HEAP_POS[i].y} textAnchor="middle" dominantBaseline="central" fontFamily="Nunito, sans-serif" fontWeight="700" fontSize="12" fill={isHL ? "#fff" : "#1e3a5f"}>{val}</text>
                </g>
              );
            })}
          </svg>
        )}
      </div>
      {items.length > 0 && (
        <div style={{ display: "flex", gap: 4, justifyContent: "center", marginTop: 2 }}>
          {items.map((val, i) => {
            const isHL = highlighted.includes(i);
            return (
              <div key={i} style={{ background: isHL ? "#6FB5FF" : "#dbeeff", color: isHL ? "#fff" : "#1e3a5f", borderRadius: 6, padding: "3px 10px", fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: 12, border: isHL ? "none" : "1px solid #c7d9f5" }}>
                {val}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function MiniDSVisualizer({ type }: { type: DSType }) {
  const steps = ((): (StackStep | QueueStep | LLStep | HashMapStep | BSTStep | HeapStep)[] => {
    switch (type) {
      case "stack":       return STACK_STEPS;
      case "queue":       return QUEUE_STEPS;
      case "linked-list": return LL_STEPS;
      case "hash-map":    return HASHMAP_STEPS;
      case "bst":         return BST_STEPS;
      case "heap":        return HEAP_STEPS;
    }
  })();

  const [current, setCurrent] = useState(0);
  const step = steps[current];

  const handlePrev  = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), []);
  const handleNext  = useCallback(() => setCurrent((c) => Math.min(steps.length - 1, c + 1)), [steps.length]);
  const handleReset = useCallback(() => setCurrent(0), []);

  const prevDisabled = current === 0;
  const isDone = current === steps.length - 1;

  const viz = () => {
    switch (type) {
      case "stack":       return <StackViz      step={step as StackStep} />;
      case "queue":       return <QueueViz      step={step as QueueStep} />;
      case "linked-list": return <LinkedListViz step={step as LLStep} />;
      case "hash-map":    return <HashMapViz    step={step as HashMapStep} />;
      case "bst":         return <BSTViz        step={step as BSTStep} />;
      case "heap":        return <HeapViz       step={step as HeapStep} />;
    }
  };

  return (
    <div style={{ border: "1.5px dashed #c7d9f5", borderRadius: 16, background: "#f5f8ff", padding: "24px 24px 20px" }}>
      {/* Visualization */}
      <div style={{ marginBottom: 16 }}>{viz()}</div>

      {/* Operation badge */}
      {(step as StackStep).op !== "—" && (
        <div style={{ display: "inline-block", background: "#dbeeff", color: "#1a6bb5", borderRadius: 6, padding: "2px 10px", fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: 12, marginBottom: 8 }}>
          {(step as StackStep).op}
        </div>
      )}

      {/* Message box */}
      <div style={{ background: "#eef3fc", borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
        <div style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: 12, color: "#1e3a5f", lineHeight: 1.4 }}>
          {(step as StackStep).msg}
        </div>
        <div style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: 11, color: "#6b7280", lineHeight: 1.4, marginTop: 2 }}>
          {(step as StackStep).sub}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: 11, color: "#9ca3af", minWidth: 50 }}>
          {current + 1} / {steps.length}
        </span>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={handlePrev} disabled={prevDisabled} style={{ background: "#e8edf5", border: "none", borderRadius: 8, padding: "7px 14px", fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: 12, color: prevDisabled ? "#c0cad8" : "#4b5563", cursor: prevDisabled ? "default" : "pointer" }}>
            ‹ Prev
          </button>
          {isDone ? (
            <button onClick={handleReset} style={{ background: "#22c55e", border: "none", borderRadius: 8, padding: "7px 20px", fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: 12, color: "#fff", cursor: "pointer", minWidth: 80 }}>
              ↺ Reset
            </button>
          ) : (
            <button onClick={handleNext} style={{ background: "#6FB5FF", border: "none", borderRadius: 8, padding: "7px 20px", fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: 12, color: "#fff", cursor: "pointer", minWidth: 80, boxShadow: "0 2px 10px rgba(111,181,255,0.35)" }}>
              Next ›
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
