import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SortingVisualizer from "@/components/visualizers/sorting/SortingVisualizer";
import {
  SORTING_ALGORITHM_SEO,
  ALGORITHM_SLUGS,
} from "@/lib/sorting-seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return ALGORITHM_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const algo = SORTING_ALGORITHM_SEO[slug];
  if (!algo) return { title: "Not Found" };

  return {
    title: algo.metaTitle,
    description: algo.metaDescription,
    openGraph: {
      title: algo.metaTitle,
      description: algo.metaDescription,
      type: "website",
    },
  };
}

export default async function SortingAlgorithmPage({ params }: Props) {
  const { slug } = await params;
  const algo = SORTING_ALGORITHM_SEO[slug];
  if (!algo) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: `${algo.name} Visualizer`,
    description: algo.metaDescription,
    educationalLevel: "beginner",
    learningResourceType: "interactive resource",
    teaches: algo.name,
    provider: {
      "@type": "Organization",
      name: "DSANotes",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SortingVisualizer initialAlgorithm={algo.key} />

      {/* ── Educational content ── */}
      <div
        style={{
          background: "#f2f4f7",
          padding: "0 48px 80px",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        {/* Intro */}
        <section style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: 20,
              color: "#0d1117",
              margin: "0 0 12px",
            }}
          >
            What is {algo.name}?
          </h2>
          <p
            style={{
              fontFamily: "Nunito, sans-serif",
              fontWeight: 600,
              fontSize: 15,
              color: "#374151",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {algo.intro}
          </p>
        </section>

        <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
          {/* How it works */}
          <section style={{ flex: "1 1 320px" }}>
            <h2
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                fontSize: 18,
                color: "#0d1117",
                margin: "0 0 16px",
              }}
            >
              How it works
            </h2>
            <ol style={{ margin: 0, padding: "0 0 0 20px" }}>
              {algo.howItWorks.map((step, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#374151",
                    lineHeight: 1.6,
                    marginBottom: 8,
                  }}
                >
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <div style={{ flex: "1 1 280px", display: "flex", flexDirection: "column", gap: 32 }}>
            {/* Complexity */}
            <section>
              <h2
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  color: "#0d1117",
                  margin: "0 0 16px",
                }}
              >
                Complexity
              </h2>
              <table
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                  background: "#fff",
                  borderRadius: 12,
                  overflow: "hidden",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}
              >
                <tbody>
                  {[
                    { label: "Best time", value: algo.timeComplexity.best },
                    { label: "Average time", value: algo.timeComplexity.average },
                    { label: "Worst time", value: algo.timeComplexity.worst },
                    { label: "Space", value: algo.spaceComplexity },
                    { label: "Stable", value: algo.stable ? "Yes" : "No" },
                  ].map(({ label, value }) => (
                    <tr key={label}>
                      <td
                        style={{
                          fontFamily: "Nunito, sans-serif",
                          fontWeight: 600,
                          fontSize: 13,
                          color: "#6b7280",
                          padding: "10px 16px",
                          borderBottom: "1px solid #f3f4f6",
                          width: "50%",
                        }}
                      >
                        {label}
                      </td>
                      <td
                        style={{
                          fontFamily: '"JetBrains Mono", monospace',
                          fontWeight: 500,
                          fontSize: 13,
                          color: "#0d1117",
                          padding: "10px 16px",
                          borderBottom: "1px solid #f3f4f6",
                        }}
                      >
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* Use cases */}
            <section>
              <h2
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  color: "#0d1117",
                  margin: "0 0 16px",
                }}
              >
                When to use it
              </h2>
              <ul style={{ margin: 0, padding: "0 0 0 20px" }}>
                {algo.useCases.map((uc, i) => (
                  <li
                    key={i}
                    style={{
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: 600,
                      fontSize: 14,
                      color: "#374151",
                      lineHeight: 1.6,
                      marginBottom: 8,
                    }}
                  >
                    {uc}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
