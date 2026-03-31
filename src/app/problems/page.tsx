import Link from 'next/link'
import { commonProblemConfigs } from '@/config/common-problem-config'

type Difficulty = 'Easy' | 'Medium' | 'Hard'
type Paradigm = 'Dynamic Programming' | 'Backtracking' | 'Greedy' | 'Divide & Conquer'

interface ProblemMeta {
  id: string
  title: string
  description: string
  difficulty: Difficulty
  paradigm: Paradigm
  features: string[]
}

const PARADIGM_MAP: Record<string, Paradigm> = {
  fibonacci: 'Dynamic Programming',
  'coin-change': 'Dynamic Programming',
  knapsack: 'Dynamic Programming',
  lcs: 'Dynamic Programming',
  'egg-drop': 'Dynamic Programming',
  'n-queens': 'Backtracking',
  maze: 'Backtracking',
  'activity-selection': 'Greedy',
  huffman: 'Greedy',
  karatsuba: 'Divide & Conquer',
  'closest-pair': 'Divide & Conquer',
  crt: 'Divide & Conquer',
}

const DIFFICULTY_MAP: Record<string, Difficulty> = {
  fibonacci: 'Easy',
  'coin-change': 'Medium',
  knapsack: 'Medium',
  lcs: 'Medium',
  'egg-drop': 'Hard',
  'n-queens': 'Hard',
  maze: 'Medium',
  'activity-selection': 'Easy',
  huffman: 'Medium',
  karatsuba: 'Hard',
  'closest-pair': 'Hard',
  crt: 'Hard',
}

const DIFFICULTY_STYLES: Record<Difficulty, { bg: string; color: string }> = {
  Easy: { bg: '#dcfce7', color: '#166534' },
  Medium: { bg: '#fef9c3', color: '#854d0e' },
  Hard: { bg: '#fee2e2', color: '#991b1b' },
}

const PARADIGM_COLORS: Record<Paradigm, [string, string]> = {
  'Dynamic Programming': ['#dbeeff', '#1a6bb5'],
  Backtracking: ['#fce7f3', '#be185d'],
  Greedy: ['#dcfce7', '#166534'],
  'Divide & Conquer': ['#f3e8ff', '#7e22ce'],
}

const CATEGORY_FILTERS = ['All', 'Dynamic Programming', 'Backtracking', 'Greedy', 'Divide & Conquer']

const problems: ProblemMeta[] = commonProblemConfigs.map((cfg) => ({
  id: cfg.id,
  title: cfg.title,
  description: cfg.description,
  difficulty: DIFFICULTY_MAP[cfg.id] ?? 'Medium',
  paradigm: PARADIGM_MAP[cfg.id] ?? 'Dynamic Programming',
  features: cfg.features,
}))

function ProblemCard({ problem }: { problem: ProblemMeta }) {
  const diffStyle = DIFFICULTY_STYLES[problem.difficulty]
  const [catBg, catColor] = PARADIGM_COLORS[problem.paradigm]

  return (
    <div
      style={{
        background: '#f5faff',
        border: '0.5px solid #d4e6ff',
        borderRadius: 12,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      {/* Title row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <div
          style={{
            fontFamily: 'var(--font-poppins)',
            fontWeight: 700,
            fontSize: 15,
            color: '#0d1117',
            lineHeight: 1.3,
          }}
        >
          {problem.title}
        </div>
        <span
          style={{
            background: diffStyle.bg,
            color: diffStyle.color,
            fontSize: 10,
            fontFamily: 'var(--font-nunito)',
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: 20,
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {problem.difficulty}
        </span>
      </div>

      {/* Description */}
      <div
        style={{
          fontFamily: 'var(--font-nunito)',
          fontWeight: 600,
          fontSize: 12,
          color: '#6b7280',
          lineHeight: 1.6,
          flex: 1,
        }}
      >
        {problem.description}
      </div>

      {/* Category + Solve button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
        <span
          style={{
            background: catBg,
            color: catColor,
            fontSize: 10,
            fontFamily: 'var(--font-nunito)',
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: 20,
          }}
        >
          {problem.paradigm}
        </span>

        <Link
          href={`/problems/${problem.id}`}
          style={{
            background: '#6FB5FF',
            color: '#fff',
            borderRadius: 8,
            padding: '7px 16px',
            fontFamily: 'var(--font-nunito)',
            fontWeight: 700,
            fontSize: 12,
            textDecoration: 'none',
          }}
        >
          Solve →
        </Link>
      </div>
    </div>
  )
}

export default function ProblemsPage() {
  return (
    <div style={{ background: '#ffffff' }}>
      {/* Header */}
      <section style={{ background: '#f0f7ff', width: '100%' }}>
        <div
          style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}
          className="px-4 sm:px-8 lg:px-12 pt-7 pb-8"
        >
          <div
            style={{
              fontFamily: 'var(--font-nunito)',
              fontWeight: 600,
              fontSize: 12,
              color: '#9ca3af',
              marginBottom: 8,
            }}
          >
            <Link href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>
              Home
            </Link>
            {' / '}
            <span style={{ color: '#6FB5FF' }}>Problems</span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-poppins)',
              fontWeight: 700,
              fontSize: 28,
              color: '#0d1117',
              marginBottom: 6,
            }}
          >
            Common Problems
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-nunito)',
              fontWeight: 600,
              fontSize: 13,
              color: '#6b7280',
            }}
          >
            Practice the most frequently asked DSA problems
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: '#ffffff', width: '100%' }}>
        <div
          style={{ maxWidth: 1280, margin: '0 auto', gap: 12 }}
          className="px-4 sm:px-8 lg:px-12 py-6 flex flex-wrap"
        >
          {CATEGORY_FILTERS.slice(1).map((cat) => {
            const count = problems.filter((p) => p.paradigm === cat).length
            return (
              <div
                key={cat}
                style={{
                  background: '#f0f7ff',
                  border: '0.5px solid #d4e6ff',
                  borderRadius: 10,
                  padding: '8px 16px',
                  fontFamily: 'var(--font-nunito)',
                  fontWeight: 700,
                  fontSize: 12,
                  color: '#1a6bb5',
                }}
              >
                {cat} ({count})
              </div>
            )
          })}
        </div>
      </section>

      {/* Problems Grid */}
      <section style={{ background: '#ffffff', width: '100%' }}>
        <div
          style={{ maxWidth: 1280, margin: '0 auto', gap: 16 }}
          className="px-4 sm:px-8 lg:px-12 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {problems.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} />
          ))}
        </div>
      </section>
    </div>
  )
}
