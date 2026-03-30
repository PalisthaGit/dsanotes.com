import Link from "next/link";

// ─── Hero ────────────────────────────────────────────────────────────────────

function HeroVisualizerCard() {
  const bars = [
    { color: "#4ade80", height: 30 },
    { color: "#f472b6", height: 75 },
    { color: "#f472b6", height: 55 },
    { color: "#facc15", height: 90 },
    { color: "#4ade80", height: 42 },
    { color: "#6FB5FF", height: 65 },
    { color: "#4ade80", height: 80 },
    { color: "#6FB5FF", height: 50 },
  ];

  const legend = [
    { color: "#f472b6", label: "Comparing" },
    { color: "#4ade80", label: "Sorted" },
    { color: "#facc15", label: "Pivot" },
    { color: "#6FB5FF", label: "Unsorted" },
  ];

  return (
    <div
      style={{
        background: "#1a1a2e",
        borderRadius: 14,
        padding: 24,
        flex: "0 0 380px",
      }}
    >
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <span style={{ fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: 11, color: "#a0aec0" }}>
          Bubble Sort — step 3
        </span>
        <span
          style={{
            background: "rgba(111,181,255,0.15)",
            color: "#6FB5FF",
            fontSize: 10,
            borderRadius: 20,
            padding: "3px 10px",
            fontFamily: "var(--font-nunito)",
            fontWeight: 700,
          }}
        >
          Running
        </span>
      </div>

      {/* Bar chart */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 130, marginBottom: 16 }}>
        {bars.map((bar, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${bar.height}%`,
              background: bar.color,
              borderRadius: 4,
            }}
          />
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 12px" }}>
        {legend.map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color }} />
            <span style={{ fontFamily: "var(--font-nunito)", fontWeight: 600, fontSize: 10, color: "#a0aec0" }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section style={{ background: "#ffffff", width: "100%" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "64px 96px",
          display: "flex",
          alignItems: "center",
          gap: 56,
        }}
      >
        {/* Left */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <span
            style={{
              display: "inline-block",
              background: "#dbeeff",
              color: "#1a6bb5",
              fontSize: 11,
              fontFamily: "var(--font-nunito)",
              fontWeight: 700,
              borderRadius: 20,
              padding: "5px 14px",
              letterSpacing: "0.07em",
              marginBottom: 20,
            }}
          >
            FREE &amp; BEGINNER-FRIENDLY
          </span>

          <h1
            style={{
              fontFamily: "var(--font-poppins)",
              fontWeight: 700,
              fontSize: 48,
              color: "#0d1117",
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            Understand DSA
            <br />
            One Step at a{" "}
            <span style={{ color: "#6FB5FF" }}>Time</span>
          </h1>

          <p
            style={{
              fontFamily: "var(--font-nunito)",
              fontWeight: 600,
              fontSize: 15,
              color: "#6b7280",
              lineHeight: 1.8,
              maxWidth: 420,
              marginBottom: 32,
            }}
          >
            Interactive visualizations that make algorithms click. Watch every step, understand every move.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link
              href="/visualizer"
              style={{
                background: "#6FB5FF",
                color: "#ffffff",
                borderRadius: 10,
                padding: "13px 28px",
                fontFamily: "var(--font-nunito)",
                fontWeight: 700,
                fontSize: 14,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Explore Visualizers →
            </Link>
            <Link
              href="/learn"
              style={{
                background: "#dbeeff",
                color: "#1a6bb5",
                borderRadius: 10,
                padding: "13px 28px",
                fontFamily: "var(--font-nunito)",
                fontWeight: 700,
                fontSize: 14,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Learn DSA
            </Link>
          </div>
        </div>

        {/* Right */}
        <HeroVisualizerCard />
      </div>
    </section>
  );
}

// ─── Stats Strip ─────────────────────────────────────────────────────────────

const stats = [
  { number: "15+", label: "Algorithms" },
  { number: "6", label: "Categories" },
  { number: "Free", label: "Always" },
  { number: "Step", label: "By Step" },
];

function StatsStrip() {
  return (
    <section style={{ background: "#f0f7ff", width: "100%" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "32px 96px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "#ffffff",
              border: "0.5px solid #d4e6ff",
              borderRadius: 12,
              padding: 18,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 700,
                fontSize: 22,
                color: "#6FB5FF",
              }}
            >
              {stat.number}
            </div>
            <div
              style={{
                fontFamily: "var(--font-nunito)",
                fontWeight: 700,
                fontSize: 11,
                color: "#9ca3af",
                marginTop: 4,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Visualizer Cards ─────────────────────────────────────────────────────────

type Pill = { label: string; bg: string; color: string };

interface CardData {
  emoji: string;
  title: string;
  description: string;
  pills: Pill[];
  link: string;
  disabled?: boolean;
}

const cards: CardData[] = [
  {
    emoji: "↕️",
    title: "Sorting Algorithms",
    description: "Visualize sorting algorithms step by step.",
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
    description: "See how searching works visually.",
    pills: [
      { label: "Linear Search", bg: "#dbeeff", color: "#1a6bb5" },
      { label: "Binary Search", bg: "#fce7f3", color: "#be185d" },
    ],
    link: "/visualizer/searching",
  },
  {
    emoji: "🗺️",
    title: "Pathfinding",
    description: "Dijkstra's and A* to find shortest path.",
    pills: [
      { label: "Dijkstra's", bg: "#dbeeff", color: "#1a6bb5" },
      { label: "A* Algorithm", bg: "#fce7f3", color: "#be185d" },
    ],
    link: "/visualizer/pathfinding",
  },
  {
    emoji: "🌲",
    title: "MST Algorithms",
    description: "Minimum Spanning Tree algorithms explained.",
    pills: [
      { label: "Kruskal's", bg: "#dbeeff", color: "#1a6bb5" },
      { label: "Prim's", bg: "#fce7f3", color: "#be185d" },
    ],
    link: "/visualizer/mst",
  },
  {
    emoji: "🔗",
    title: "Strongly Connected",
    description: "Find strongly connected components in graphs.",
    pills: [
      { label: "Tarjan's", bg: "#dbeeff", color: "#1a6bb5" },
      { label: "Kosaraju's", bg: "#fce7f3", color: "#be185d" },
    ],
    link: "/visualizer/scc",
  },
  {
    emoji: "📝",
    title: "String Matching",
    description: "KMP, Rabin-Karp, Boyer-Moore algorithms.",
    pills: [
      { label: "KMP", bg: "#f3f4f6", color: "#9ca3af" },
      { label: "Rabin-Karp", bg: "#f3f4f6", color: "#9ca3af" },
    ],
    link: "/visualizer/string-matching",
    disabled: true,
  },
];

function VisualizerCard({ card }: { card: CardData }) {
  const { disabled } = card;

  return (
    <div
      style={{
        background: "#f5faff",
        border: "0.5px solid #d4e6ff",
        borderTop: disabled ? "3px solid #d4e6ff" : "3px solid #6FB5FF",
        borderRadius: 12,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        opacity: disabled ? 0.65 : 1,
      }}
    >
      {/* Top row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: 20 }}>{card.emoji}</span>
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
          fontSize: 14,
          color: "#0d1117",
          marginBottom: 6,
        }}
      >
        {card.title}
      </div>

      {/* Description */}
      <div
        style={{
          fontFamily: "var(--font-nunito)",
          fontWeight: 600,
          fontSize: 11,
          color: "#9ca3af",
          lineHeight: 1.6,
          marginBottom: 12,
          flex: 1,
        }}
      >
        {card.description}
      </div>

      {/* Pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
        {card.pills.map((pill) => (
          <span
            key={pill.label}
            style={{
              background: pill.bg,
              color: pill.color,
              fontSize: 10,
              fontFamily: "var(--font-nunito)",
              fontWeight: 700,
              padding: "3px 10px",
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
            padding: 10,
            fontFamily: "var(--font-nunito)",
            fontWeight: 700,
            fontSize: 12,
            border: "none",
            cursor: "not-allowed",
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
            padding: 10,
            fontFamily: "var(--font-nunito)",
            fontWeight: 700,
            fontSize: 12,
            textDecoration: "none",
          }}
        >
          Explore
        </Link>
      )}
    </div>
  );
}

function VisualizerCardsSection() {
  return (
    <section style={{ background: "#ffffff", width: "100%" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "44px 96px" }}>
        <h2
          style={{
            fontFamily: "var(--font-poppins)",
            fontWeight: 700,
            fontSize: 24,
            color: "#0d1117",
            marginBottom: 6,
          }}
        >
          Algorithm Visualizers
        </h2>
        <p
          style={{
            fontFamily: "var(--font-nunito)",
            fontWeight: 600,
            fontSize: 13,
            color: "#9ca3af",
            marginBottom: 24,
          }}
        >
          Pick a category and start visualizing
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 14,
          }}
        >
          {cards.map((card) => (
            <VisualizerCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div style={{ background: "#ffffff" }}>
      <HeroSection />
      <StatsStrip />
      <VisualizerCardsSection />
    </div>
  );
}
