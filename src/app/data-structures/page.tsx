'use client'

import { useState } from 'react'
import Link from 'next/link'
import { dataStructureConfigs } from '@/config/data-structure-config'

type Pill = { label: string; bg: string; color: string }

const PILL_COLORS: [string, string][] = [
  ['#dbeeff', '#1a6bb5'],
  ['#fce7f3', '#be185d'],
  ['#dcfce7', '#166534'],
  ['#fef9c3', '#854d0e'],
  ['#f3e8ff', '#7e22ce'],
  ['#ffedd5', '#9a3412'],
]

const DS_EMOJIS: Record<string, string> = {
  'linked-list': '🔗',
  stack: '📚',
  queue: '🎫',
  'binary-tree': '🌲',
  'hash-table': '🗂️',
  graph: '🕸️',
}

const CATEGORY_FILTERS = ['All', 'Linear', 'Tree', 'Graph']

const DS_CATEGORIES: Record<string, string> = {
  'linked-list': 'Linear',
  stack: 'Linear',
  queue: 'Linear',
  'binary-tree': 'Tree',
  'hash-table': 'Linear',
  graph: 'Graph',
}

interface DSCardData {
  id: string
  emoji: string
  title: string
  description: string
  pills: Pill[]
  link: string
  category: string
}

const cards: DSCardData[] = dataStructureConfigs.map((cfg) => ({
  id: cfg.id,
  emoji: DS_EMOJIS[cfg.id] ?? '📦',
  title: cfg.title,
  description: cfg.description,
  pills: cfg.features.slice(0, 4).map((f, i) => ({
    label: f,
    bg: PILL_COLORS[i % PILL_COLORS.length][0],
    color: PILL_COLORS[i % PILL_COLORS.length][1],
  })),
  link: `/data-structures/${cfg.id}`,
  category: DS_CATEGORIES[cfg.id] ?? 'Linear',
}))

function DSCard({ card }: { card: DSCardData }) {
  return (
    <div
      style={{
        background: '#f5faff',
        border: '0.5px solid #d4e6ff',
        borderTop: '3px solid #6FB5FF',
        borderRadius: 14,
        padding: 28,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 28 }}>{card.emoji}</span>
        <span
          style={{
            background: '#dcfce7',
            color: '#166534',
            fontSize: 10,
            fontFamily: 'var(--font-nunito)',
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: 20,
          }}
        >
          Active
        </span>
      </div>

      <div
        style={{
          fontFamily: 'var(--font-poppins)',
          fontWeight: 700,
          fontSize: 18,
          color: '#0d1117',
          marginTop: 12,
        }}
      >
        {card.title}
      </div>

      <div
        style={{
          fontFamily: 'var(--font-nunito)',
          fontWeight: 600,
          fontSize: 13,
          color: '#6b7280',
          lineHeight: 1.7,
          marginTop: 8,
          marginBottom: 16,
          flex: 1,
        }}
      >
        {card.description}
      </div>

      <div
        style={{
          fontFamily: 'var(--font-nunito)',
          fontWeight: 700,
          fontSize: 10,
          color: '#9ca3af',
          letterSpacing: '0.08em',
          marginBottom: 8,
        }}
      >
        OPERATIONS
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {card.pills.map((pill) => (
          <span
            key={pill.label}
            style={{
              background: pill.bg,
              color: pill.color,
              fontSize: 11,
              fontFamily: 'var(--font-nunito)',
              fontWeight: 700,
              padding: '4px 12px',
              borderRadius: 20,
            }}
          >
            {pill.label}
          </span>
        ))}
      </div>

      <Link
        href={card.link}
        style={{
          display: 'block',
          textAlign: 'center',
          background: '#6FB5FF',
          color: '#ffffff',
          borderRadius: 8,
          padding: 12,
          fontFamily: 'var(--font-nunito)',
          fontWeight: 700,
          fontSize: 13,
          textDecoration: 'none',
          marginTop: 20,
        }}
      >
        Explore {card.title} →
      </Link>
    </div>
  )
}

export default function DataStructuresPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered =
    activeFilter === 'All' ? cards : cards.filter((c) => c.category === activeFilter)

  return (
    <div style={{ background: '#ffffff' }}>
      {/* Header */}
      <section style={{ background: '#ffffff', width: '100%' }}>
        <div
          style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}
          className="px-4 sm:px-8 lg:px-12 pt-7 pb-6"
        >
          <div
            style={{
              fontFamily: 'var(--font-nunito)',
              fontWeight: 600,
              fontSize: 12,
              color: '#9ca3af',
            }}
          >
            <Link href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>
              Home
            </Link>
            {' / '}
            <span style={{ color: '#6FB5FF' }}>Data Structures</span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-poppins)',
              fontWeight: 700,
              fontSize: 28,
              color: '#0d1117',
              marginTop: 8,
              marginBottom: 0,
            }}
          >
            Data Structure Visualizers
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-nunito)',
              fontWeight: 600,
              fontSize: 13,
              color: '#6b7280',
              marginTop: 4,
              marginBottom: 0,
            }}
          >
            Visualize how data structures work internally
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section style={{ background: '#ffffff', width: '100%' }}>
        <div
          style={{ maxWidth: 1280, margin: '0 auto', flexWrap: 'wrap', gap: 8 }}
          className="px-4 sm:px-8 lg:px-12 py-6 flex"
        >
          {CATEGORY_FILTERS.map((tab) => {
            const isActive = tab === activeFilter
            return (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                style={{
                  background: isActive ? '#6FB5FF' : '#f0f7ff',
                  color: isActive ? '#ffffff' : '#6b7280',
                  border: isActive ? 'none' : '0.5px solid #d4e6ff',
                  borderRadius: 20,
                  padding: '7px 18px',
                  fontFamily: 'var(--font-nunito)',
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                {tab}
              </button>
            )
          })}
        </div>
      </section>

      {/* Cards Grid */}
      <section style={{ background: '#ffffff', width: '100%' }}>
        <div
          style={{ maxWidth: 1280, margin: '0 auto', gap: 20 }}
          className="px-4 sm:px-8 lg:px-12 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((card) => (
            <DSCard key={card.id} card={card} />
          ))}
        </div>
      </section>
    </div>
  )
}
