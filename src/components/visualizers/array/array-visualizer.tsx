'use client'

import { useState, useRef } from 'react'
import { Eye, Pencil, Plus, Trash2, ChevronRight } from 'lucide-react'

const TOTAL_SLOTS = 6
const STEP_DELAY = 700

type Slot = { name: string | null; emoji: string | null }
type Operation = 'access' | 'update' | 'add' | 'remove' | 'traverse'
type HighlightColor = 'blue' | 'green' | 'red' | 'pink' | 'purple' | 'orange'

const INITIAL_SLOTS: Slot[] = [
  { name: 'Blinding Lights', emoji: '🎵' },
  { name: 'Levitating', emoji: '🪩' },
  { name: 'Stay', emoji: '⭐' },
  { name: 'Heat Waves', emoji: '🌊' },
  { name: 'Peaches', emoji: '🍑' },
  { name: null, emoji: null },
]

const EMOJI_OPTIONS = ['🎵', '🪩', '⭐', '🌊', '🍑', '🎸', '🎹', '🥁', '🎤', '🎶', '🌟', '🔥', '💫']

const HIGHLIGHT_STYLES: Record<HighlightColor, { border: string; ring: string; bg: string }> = {
  blue:   { border: 'border-blue-400',   ring: 'ring-blue-200',   bg: 'bg-blue-50' },
  green:  { border: 'border-green-400',  ring: 'ring-green-200',  bg: 'bg-green-50' },
  red:    { border: 'border-red-400',    ring: 'ring-red-200',    bg: 'bg-red-50' },
  pink:   { border: 'border-pink-400',   ring: 'ring-pink-200',   bg: 'bg-pink-50' },
  purple: { border: 'border-purple-400', ring: 'ring-purple-200', bg: 'bg-purple-50' },
  orange: { border: 'border-orange-400', ring: 'ring-orange-200', bg: 'bg-orange-50' },
}

const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

export function ArrayVisualizer() {
  const [slots, setSlots] = useState<Slot[]>(INITIAL_SLOTS)
  const [operation, setOperation] = useState<Operation>('update')
  const [highlights, setHighlights] = useState<Map<number, HighlightColor>>(new Map())
  const [narration, setNarration] = useState('')
  const [inputIndex, setInputIndex] = useState(0)
  const [inputName, setInputName] = useState('Blinding Lights')
  const [inputEmoji, setInputEmoji] = useState('🎵')
  const [isAnimating, setIsAnimating] = useState(false)
  const [timeComplexity, setTimeComplexity] = useState<string | null>(null)

  const slotsRef = useRef(slots)
  slotsRef.current = slots

  const clearHL = () => setHighlights(new Map())

  const clampedIndex = Math.max(0, Math.min(inputIndex, TOTAL_SLOTS - 1))

  const updateIndex = (i: number) => {
    const clamped = Math.max(0, Math.min(i, TOTAL_SLOTS - 1))
    setInputIndex(clamped)
    if (operation === 'update') {
      const s = slots[clamped]
      if (s?.name) setInputName(s.name)
    }
  }

  const switchOperation = (op: Operation) => {
    if (isAnimating) return
    setOperation(op)
    clearHL()
    setNarration('')
    if (op === 'update') {
      const s = slots[clampedIndex]
      if (s?.name) setInputName(s.name)
    }
    if (op === 'add') setInputName('')
  }

  // --- Access ---
  const handleAccess = () => {
    const i = clampedIndex
    const slot = slotsRef.current[i]
    setHighlights(new Map([[i, 'blue']]))
    setTimeComplexity('O(1)')
    if (!slot.name) {
      setNarration(`index ${i} is empty — nothing lives here yet`)
    } else {
      setNarration(`you accessed ${slot.name} — sitting at index ${i}`)
    }
  }

  // --- Update ---
  const handleUpdate = () => {
    if (!inputName.trim()) return
    const i = clampedIndex
    const old = slotsRef.current[i]?.name ?? 'empty'
    setSlots(prev => prev.map((s, idx) => idx === i ? { ...s, name: inputName.trim() } : s))
    setHighlights(new Map([[i, 'green']]))
    setTimeComplexity('O(1)')
    setNarration(`index ${i} updated from ${old} to ${inputName.trim()}`)
  }

  // --- Add ---
  const handleAdd = async () => {
    if (!inputName.trim() || isAnimating) return
    setIsAnimating(true)
    const i = clampedIndex
    const current = [...slotsRef.current]

    if (!current[i].name) {
      // Empty slot — place directly
      setHighlights(new Map([[i, 'green']]))
      setTimeComplexity('O(1)')
      setNarration(`index ${i} is empty — placing ${inputName.trim()} directly`)
      await sleep(400)
      setSlots(prev => prev.map((s, idx) => idx === i ? { name: inputName.trim(), emoji: inputEmoji } : s))
      setNarration(`${inputName.trim()} is in at index ${i}`)
    } else {
      // Find last filled slot
      let last = -1
      for (let j = TOTAL_SLOTS - 1; j >= 0; j--) {
        if (current[j].name) { last = j; break }
      }

      if (last === TOTAL_SLOTS - 1) {
        setHighlights(new Map([[i, 'red']]))
        setNarration(`no room — all ${TOTAL_SLOTS} slots are filled`)
        setIsAnimating(false)
        return
      }

      // Highlight all affected cells pink
      const hl = new Map<number, HighlightColor>()
      for (let j = i; j <= last + 1; j++) hl.set(j, 'pink')
      setHighlights(hl)
      setTimeComplexity('O(n)')
      setNarration(
        `index ${i} is taken — making room, shifting from index ${last} down to ${i} one step right`
      )
      await sleep(STEP_DELAY)

      // Shift right, starting from last element
      const working = [...current]
      for (let j = last; j >= i; j--) {
        const hl2 = new Map<number, HighlightColor>()
        hl2.set(j, 'orange')
        hl2.set(j + 1, 'orange')
        setHighlights(hl2)
        setNarration(`shifting ${working[j].name} from index ${j} to ${j + 1}`)
        await sleep(STEP_DELAY)
        working[j + 1] = { ...working[j] }
        working[j] = { name: null, emoji: null }
        setSlots([...working])
        await sleep(200)
      }

      // Place new song
      working[i] = { name: inputName.trim(), emoji: inputEmoji }
      setSlots([...working])
      setHighlights(new Map([[i, 'green']]))
      setNarration(`${inputName.trim()} is in at index ${i} — everyone made room`)
    }

    setIsAnimating(false)
  }

  // --- Remove ---
  const handleRemove = async () => {
    if (isAnimating) return
    setIsAnimating(true)
    const i = clampedIndex
    const current = [...slotsRef.current]
    const removedName = current[i].name

    if (!removedName) {
      setHighlights(new Map([[i, 'red']]))
      setNarration(`index ${i} is already empty — nothing to remove`)
      setIsAnimating(false)
      return
    }

    // Find last filled slot at or after i
    let last = i
    for (let j = i + 1; j < TOTAL_SLOTS; j++) {
      if (current[j].name) last = j
      else break
    }

    setHighlights(new Map([[i, 'red']]))

    if (last === i) {
      // No subsequent elements — just clear
      setTimeComplexity('O(1)')
      setNarration(`removing ${removedName} from index ${i}`)
      await sleep(STEP_DELAY)
      setSlots(prev => prev.map((s, idx) => idx === i ? { name: null, emoji: null } : s))
      clearHL()
      setNarration(`done — ${removedName} is out`)
    } else {
      setTimeComplexity('O(n)')
      setNarration(
        `removing ${removedName} from index ${i} — closing the gap, shifting from index ${i + 1} to ${last} one step left`
      )
      await sleep(STEP_DELAY)

      const working = [...current]
      working[i] = { name: null, emoji: null }
      setSlots([...working])

      for (let j = i + 1; j <= last; j++) {
        const hl = new Map<number, HighlightColor>()
        hl.set(j, 'orange')
        hl.set(j - 1, 'orange')
        setHighlights(hl)
        setNarration(`shifting ${working[j].name} from index ${j} to ${j - 1}`)
        await sleep(STEP_DELAY)
        working[j - 1] = { ...working[j] }
        working[j] = { name: null, emoji: null }
        setSlots([...working])
        await sleep(200)
      }

      clearHL()
      setNarration(`done — ${removedName} is out, gap is closed`)
    }

    setIsAnimating(false)
  }

  // --- Traverse ---
  const handleTraverse = async () => {
    if (isAnimating) return
    setIsAnimating(true)
    const current = [...slotsRef.current]
    clearHL()

    for (let i = 0; i < TOTAL_SLOTS; i++) {
      if (!current[i].name) continue
      setHighlights(new Map([[i, 'purple']]))
      setNarration(`now looking at index ${i} — it's ${current[i].name}`)
      await sleep(600)
    }

    clearHL()
    setTimeComplexity('O(n)')
    setNarration('visited every song in the playlist')
    setIsAnimating(false)
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 mb-8">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="text-[11px] tracking-widest text-gray-400 uppercase font-mono mb-1">
            ARRAY VISUALIZER
          </p>
          <h3
            className="text-2xl font-bold text-gray-900"
            style={{ fontFamily: 'var(--font-lora)' }}
          >
            an array of playlist
          </h3>
        </div>
        {timeComplexity && (
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-[10px] tracking-widest text-gray-400 uppercase font-mono">
              time complexity
            </span>
            <span className="text-lg font-bold font-mono text-gray-800">
              {timeComplexity}
            </span>
          </div>
        )}
      </div>

      {/* Cards row */}
      <div className="flex flex-col items-center mb-5">
        <span className="text-sm font-mono text-gray-400 mb-2 select-none">
          playlist
        </span>
        <div className="flex gap-2">
          {slots.map((slot, idx) => {
            const color = highlights.get(idx)
            const hs = color ? HIGHLIGHT_STYLES[color] : null
            return (
              <div key={idx} className="flex flex-col items-center gap-2 shrink-0">
                <div
                  className={[
                    'w-24 h-28 rounded-xl border-2 flex flex-col items-center justify-center gap-2 cursor-pointer select-none',
                    'transition-colors duration-300 shadow-sm ring-2',
                    hs
                      ? `${hs.border} ${hs.ring} ${hs.bg}`
                      : 'border-gray-200 bg-white ring-transparent hover:border-gray-300',
                    !slot.name ? 'border-dashed' : '',
                  ].join(' ')}
                  onClick={() => {
                    if (isAnimating) return
                    setInputIndex(idx)
                    if (operation === 'update' && slot.name) setInputName(slot.name)
                  }}
                >
                  {slot.emoji ? (
                    <span className="text-4xl leading-none">{slot.emoji}</span>
                  ) : (
                    <span className="text-gray-200 text-4xl leading-none">○</span>
                  )}
                  <span
                    className={`text-[11px] font-medium text-center px-2 leading-snug ${
                      slot.name ? 'text-gray-700' : 'text-gray-300'
                    }`}
                  >
                    {slot.name ?? 'empty'}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-gray-400">
                  {idx}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Narration panel */}
      <div className="bg-gray-50 rounded-xl border border-gray-100 px-5 py-4 mb-5 h-[80px] flex items-center overflow-hidden">
        {narration ? (
          <span className="text-sm font-mono text-gray-600">{narration}</span>
        ) : (
          <span className="text-sm font-mono text-gray-300">
            — run an operation to see what happens —
          </span>
        )}
      </div>

      {/* Operation buttons */}
      <div className="flex gap-2 mb-5 flex-wrap">
        <OpButton
          active={operation === 'access'}
          disabled={isAnimating}
          onClick={() => switchOperation('access')}
          activeClass="bg-gray-100 border-gray-400 text-gray-800"
          inactiveClass="bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
          icon={<Eye size={15} />}
          label="Access"
        />
        <OpButton
          active={operation === 'update'}
          disabled={isAnimating}
          onClick={() => switchOperation('update')}
          activeClass="bg-blue-50 border-blue-400 text-blue-700"
          inactiveClass="bg-white border-gray-200 text-blue-500 hover:bg-blue-50"
          icon={<Pencil size={15} />}
          label="Update"
        />
        <OpButton
          active={operation === 'add'}
          disabled={isAnimating}
          onClick={() => switchOperation('add')}
          activeClass="bg-green-50 border-green-400 text-green-700"
          inactiveClass="bg-white border-gray-200 text-green-600 hover:bg-green-50"
          icon={<Plus size={15} />}
          label="Add"
        />
        <OpButton
          active={operation === 'remove'}
          disabled={isAnimating}
          onClick={() => switchOperation('remove')}
          activeClass="bg-red-50 border-red-400 text-red-700"
          inactiveClass="bg-white border-gray-200 text-red-500 hover:bg-red-50"
          icon={<Trash2 size={15} />}
          label="Remove"
        />
        <OpButton
          active={operation === 'traverse'}
          disabled={isAnimating}
          onClick={() => switchOperation('traverse')}
          activeClass="bg-purple-50 border-purple-400 text-purple-700"
          inactiveClass="bg-white border-gray-200 text-purple-600 hover:bg-purple-50"
          icon={<ChevronRight size={15} />}
          label="Traverse"
        />
      </div>

      {/* Contextual controls */}
      <div className="flex items-center gap-4 flex-wrap">
        {/* Index stepper — shown for all except traverse */}
        {operation !== 'traverse' && (
          <>
            <span className="text-sm text-gray-500">index</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateIndex(inputIndex - 1)}
                disabled={isAnimating}
                className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold text-lg leading-none disabled:opacity-40"
              >
                −
              </button>
              <span className="w-8 text-center font-mono font-bold text-gray-800">
                {clampedIndex}
              </span>
              <button
                onClick={() => updateIndex(inputIndex + 1)}
                disabled={isAnimating}
                className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold text-lg leading-none disabled:opacity-40"
              >
                +
              </button>
            </div>
          </>
        )}

        {/* Song name input — update and add */}
        {(operation === 'update' || operation === 'add') && (
          <>
            <span className="text-sm text-gray-500">song name</span>
            <input
              value={inputName}
              onChange={e => setInputName(e.target.value)}
              disabled={isAnimating}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  operation === 'update' ? handleUpdate() : handleAdd()
                }
              }}
              className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-800 outline-none focus:border-blue-400 transition-colors w-44 disabled:opacity-40"
              placeholder="Song name..."
            />
          </>
        )}

        {/* Action buttons */}
        {operation === 'access' && (
          <button
            onClick={handleAccess}
            disabled={isAnimating}
            className="px-5 py-2 bg-gray-800 text-white rounded-xl text-sm font-semibold hover:bg-gray-700 disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            <Eye size={14} /> Access
          </button>
        )}
        {operation === 'update' && (
          <button
            onClick={handleUpdate}
            disabled={isAnimating}
            className="px-5 py-2 bg-blue-500 text-white rounded-xl text-sm font-semibold hover:bg-blue-600 disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            Update <Pencil size={14} />
          </button>
        )}
        {operation === 'add' && (
          <button
            onClick={handleAdd}
            disabled={isAnimating}
            className="px-5 py-2 bg-green-500 text-white rounded-xl text-sm font-semibold hover:bg-green-600 disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            <Plus size={14} /> Add
          </button>
        )}
        {operation === 'remove' && (
          <button
            onClick={handleRemove}
            disabled={isAnimating}
            className="px-5 py-2 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600 disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            <Trash2 size={14} /> Remove
          </button>
        )}
        {operation === 'traverse' && (
          <button
            onClick={handleTraverse}
            disabled={isAnimating}
            className="px-5 py-2 bg-purple-500 text-white rounded-xl text-sm font-semibold hover:bg-purple-600 disabled:opacity-60 transition-colors flex items-center gap-2"
          >
            <ChevronRight size={14} />
            {isAnimating ? 'Traversing...' : 'Traverse'}
          </button>
        )}
      </div>
    </div>
  )
}

function OpButton({
  active,
  disabled,
  onClick,
  activeClass,
  inactiveClass,
  icon,
  label,
}: {
  active: boolean
  disabled: boolean
  onClick: () => void
  activeClass: string
  inactiveClass: string
  icon: React.ReactNode
  label: string
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        'flex-1 min-w-24 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border font-medium text-sm transition-all disabled:opacity-50',
        active ? activeClass : inactiveClass,
      ].join(' ')}
    >
      {icon} {label}
    </button>
  )
}
