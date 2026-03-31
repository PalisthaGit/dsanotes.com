"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Data ──────────────────────────────────────────────────────────────────────

type Pill = { label: string; bg: string; color: string };

interface CardData {
  emoji: string;
  title: string;
  category: string;
  description: string;
  pills: Pill[];
  link: string;
  disabled?: boolean;
}

const cards: CardData[] = [
  {
    emoji: "↕️",
    title: "Sorting Algorithms",
    category: "Sorting",
    description:
      "Visualize various sorting algorithms and understand their mechanics and time complexity.",
    pills: [
      { label: "Bubble Sort", bg: "#dbeeff", color: "#1a6bb5" },
      { label: "Merge Sort", bg: "#fce7f3", color: "#be185d" },
      { label: "Quick Sort", bg: "#dcfce7", color: "#166534" },
    ],
    link: "/visualizer/sorting",
  },
  {
    emoji: "🔍",
    title: "Search Algorithms",
    category: "Searching",
    description:
      "Explore different searching algorithms and see how they operate on data structures.",
    pills: [
      { label: "Linear Search", bg: "#dbeeff", color: "#1a6bb5" },
      { label: "Binary Search", bg: "#fce7f3", color: "#be185d" },
    ],
    link: "/visualizer/searching",
  },
  {
    emoji: "🗺️",
    title: "Pathfinding Algorithms",
    category: "Pathfinding",
    description:
      "Visualize pathfinding algorithms like Dijkstra's and A* to find the shortest path.",
    pills: [
      { label: "Dijkstra's", bg: "#dbeeff", color: "#1a6bb5" },
      { label: "A* Algorithm", bg: "#fce7f3", color: "#be185d" },
    ],
    link: "/visualizer/pathfinding",
  },
  {
    emoji: "🌲",
    title: "MST Algorithms",
    category: "Graph",
    description:
      "Learn about Minimum Spanning Tree algorithms and their applications in graph theory.",
    pills: [
      { label: "Kruskal's", bg: "#dbeeff", color: "#1a6bb5" },
      { label: "Prim's", bg: "#fce7f3", color: "#be185d" },
    ],
    link: "/visualizer/mst",
  },
  {
    emoji: "🔗",
    title: "Strongly Connected",
    category: "Graph",
    description:
      "Discover algorithms for finding strongly connected components in directed graphs.",
    pills: [
      { label: "Tarjan's", bg: "#dbeeff", color: "#1a6bb5" },
      { label: "Kosaraju's", bg: "#fce7f3", color: "#be185d" },
    ],
    link: "/visualizer/scc",
  },
  {
    emoji: "📝",
    title: "String Matching",
    category: "String",
    description:
      "Understand string matching algorithms and their applications in text processing.",
    pills: [
      { label: "KMP", bg: "#dbeeff", color: "#1a6bb5" },
      { label: "Rabin-Karp", bg: "#fce7f3", color: "#be185d" },
      { label: "Boyer-Moore", bg: "#dcfce7", color: "#166534" },
    ],
    link: "/visualizer/string-matching",
  },
];

const FILTER_TABS = ["All", "Sorting", "Searching", "Pathfinding", "Graph", "String"];

// ─── Card ──────────────────────────────────────────────────────────────────────

function VisualizerCard({ card }: { card: CardData }) {
  const { disabled } = card;

  return (
    <div
      style={{
        background: "#f5faff",
        border: "0.5px solid #d4e6ff",
        borderTop: disabled ? "3px solid #d4e6ff" : "3px solid #6FB5FF",
        borderRadius: 14,
        padding: 28,
        display: "flex",
        flexDirection: "column",
        opacity: disabled ? 0.65 : 1,
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 28 }}>{card.emoji}</span>
        {disabled ? (
          <span
            style={{
              background: "#fef9c3",
              color: "#854d0e",
              fontSize: 10,
              fontFamily: "var(--font-nunito)",
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: 20,
            }}
          >
            Coming Soon
          </span>
        ) : (
          <span
            style={{
              background: "#dcfce7",
              color: "#166534",
              fontSize: 10,
              fontFamily: "var(--font-nunito)",
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: 20,
            }}
          >
            Active
          </span>
        )}
      </div>

      {/* Title */}
      <div
        style={{
          fontFamily: "var(--font-poppins)",
          fontWeight: 700,
          fontSize: 18,
          color: "#0d1117",
          marginTop: 12,
        }}
      >
        {card.title}
      </div>

      {/* Description */}
      <div
        style={{
          fontFamily: "var(--font-nunito)",
          fontWeight: 600,
          fontSize: 13,
          color: "#6b7280",
          lineHeight: 1.7,
          marginTop: 8,
          marginBottom: 16,
          flex: 1,
        }}
      >
        {card.description}
      </div>

      {/* Includes label */}
      <div
        style={{
          fontFamily: "var(--font-nunito)",
          fontWeight: 700,
          fontSize: 10,
          color: "#9ca3af",
          letterSpacing: "0.08em",
          marginBottom: 8,
        }}
      >
        INCLUDES
      </div>

      {/* Pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {card.pills.map((pill) => (
          <span
            key={pill.label}
            style={{
              background: pill.bg,
              color: pill.color,
              fontSize: 11,
              fontFamily: "var(--font-nunito)",
              fontWeight: 700,
              padding: "4px 12px",
              borderRadius: 20,
            }}
          >
            {pill.label}
          </span>
        ))}
      </div>

      {/* Button */}
      {disabled ? (
        <button
          disabled
          style={{
            width: "100%",
            background: "#f3f4f6",
            color: "#9ca3af",
            borderRadius: 8,
            padding: 12,
            fontFamily: "var(--font-nunito)",
            fontWeight: 700,
            fontSize: 13,
            border: "none",
            cursor: "not-allowed",
            marginTop: 20,
          }}
        >
          Coming Soon
        </button>
      ) : (
        <Link
          href={card.link}
          style={{
            display: "block",
            textAlign: "center",
            background: "#6FB5FF",
            color: "#ffffff",
            borderRadius: 8,
            padding: 12,
            fontFamily: "var(--font-nunito)",
            fontWeight: 700,
            fontSize: 13,
            textDecoration: "none",
            marginTop: 20,
          }}
        >
          Explore {card.title} →
        </Link>
      )}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function VisualizerPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredCards =
    activeFilter === "All"
      ? cards
      : cards.filter((c) => c.category === activeFilter);

  return (
    <div style={{ background: "#ffffff" }}>
      {/* Section 1 — Page Header */}
      <section style={{ background: "#ffffff", width: "100%" }}>
        <div
          style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center" }}
          className="px-4 sm:px-8 lg:px-12 pt-7 pb-6"
        >
          {/* Breadcrumb */}
          <div
            style={{
              fontFamily: "var(--font-nunito)",
              fontWeight: 600,
              fontSize: 12,
              color: "#9ca3af",
            }}
          >
            <Link
              href="/"
              style={{ color: "#9ca3af", textDecoration: "none" }}
            >
              Home
            </Link>
            {" / "}
            <span style={{ color: "#6FB5FF" }}>Visualizer</span>
          </div>

          {/* H1 */}
          <h1
            style={{
              fontFamily: "var(--font-poppins)",
              fontWeight: 700,
              fontSize: 28,
              color: "#0d1117",
              marginTop: 8,
              marginBottom: 0,
            }}
          >
            Algorithm Visualizers
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "var(--font-nunito)",
              fontWeight: 600,
              fontSize: 13,
              color: "#6b7280",
              marginTop: 4,
              marginBottom: 0,
            }}
          >
            Choose a category to start visualizing algorithms step by step
          </p>
        </div>
      </section>

      {/* Section 2 — Filter Tabs */}
      <section style={{ background: "#ffffff", width: "100%" }}>
        <div
          style={{ maxWidth: 1280, margin: "0 auto", flexWrap: "wrap", gap: 8 }}
          className="px-4 sm:px-8 lg:px-12 py-6 flex"
        >
          {FILTER_TABS.map((tab) => {
            const isActive = tab === activeFilter;
            return (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                style={{
                  background: isActive ? "#6FB5FF" : "#f0f7ff",
                  color: isActive ? "#ffffff" : "#6b7280",
                  border: isActive ? "none" : "0.5px solid #d4e6ff",
                  borderRadius: 20,
                  padding: "7px 18px",
                  fontFamily: "var(--font-nunito)",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </section>

      {/* Section 3 — Cards Grid */}
      <section style={{ background: "#ffffff", width: "100%" }}>
        <div
          style={{ maxWidth: 1280, margin: "0 auto", gap: 20 }}
          className="px-4 sm:px-8 lg:px-12 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredCards.map((card) => (
            <VisualizerCard key={card.title} card={card} />
          ))}
        </div>
      </section>

      {/* Section 4 — CTA Banner */}
      <section style={{ background: "#f0f7ff", width: "100%" }}>
        <div
          style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center" }}
          className="px-4 sm:px-8 lg:px-12 py-12"
        >
          <h2
            style={{
              fontFamily: "var(--font-poppins)",
              fontWeight: 700,
              fontSize: 24,
              color: "#0d1117",
              margin: 0,
            }}
          >
            Not sure where to start?
          </h2>
          <p
            style={{
              fontFamily: "var(--font-nunito)",
              fontWeight: 600,
              fontSize: 14,
              color: "#6b7280",
              marginTop: 8,
              marginBottom: 0,
            }}
          >
            Start with Sorting Algorithms — it&apos;s the most beginner friendly visualizer.
          </p>
          <Link
            href="/visualizer/sorting"
            style={{
              display: "inline-block",
              background: "#6FB5FF",
              color: "#ffffff",
              borderRadius: 10,
              padding: "12px 28px",
              fontFamily: "var(--font-nunito)",
              fontWeight: 700,
              fontSize: 14,
              textDecoration: "none",
              marginTop: 24,
            }}
          >
            Start with Sorting →
          </Link>
        </div>
      </section>
    </div>
  );
}
