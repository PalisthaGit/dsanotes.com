import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnSidebar } from '../sidebar'

export const metadata: Metadata = {
  title: 'What is an Array in Programming | Learn DSA',
  description:
    'Learn how arrays work from scratch — indexing, traversal, insertion, deletion, and search with C++ examples.',
}

function CalloutBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        borderLeft: '2px solid #7F77DD',
        paddingLeft: 20,
        paddingTop: 4,
        paddingBottom: 4,
        fontFamily: 'var(--font-lora)',
        fontStyle: 'italic',
        fontSize: 15,
        color: '#888',
        lineHeight: 1.9,
        marginBottom: 24,
      }}
    >
      {children}
    </div>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: 'var(--font-lora)',
        fontWeight: 700,
        fontSize: 20,
        color: '#1a1a1a',
        marginTop: 0,
        marginBottom: 12,
        paddingTop: 32,
        borderTop: '1px solid #e8e8e8',
      }}
    >
      {children}
    </h2>
  )
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: 'var(--font-lora)',
        fontWeight: 700,
        fontSize: 17,
        color: '#1a1a1a',
        marginTop: 28,
        marginBottom: 8,
      }}
    >
      {children}
    </h3>
  )
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: 'var(--font-figtree)',
        fontWeight: 400,
        fontSize: 15,
        color: '#1a1a1a',
        lineHeight: 1.85,
        marginBottom: 16,
      }}
    >
      {children}
    </p>
  )
}

const CPP_KEYWORDS = new Set([
  'int', 'string', 'using', 'namespace', 'return', 'for', 'if', 'else',
  'while', 'do', 'cout', 'cin', 'endl', 'void', 'bool', 'char', 'float',
  'double', 'const', 'auto', 'true', 'false', 'include',
])

type CppToken = { text: string; color: string; italic?: boolean }

function tokenizeCppLine(line: string): CppToken[] {
  const tokens: CppToken[] = []
  const isIncludeLine = line.trimStart().startsWith('#include')
  let i = 0

  while (i < line.length) {
    // Comment
    if (line[i] === '/' && line[i + 1] === '/') {
      tokens.push({ text: line.slice(i), color: '#546e7a', italic: true })
      break
    }
    // String literal
    if (line[i] === '"') {
      let j = i + 1
      while (j < line.length && line[j] !== '"') j++
      tokens.push({ text: line.slice(i, j + 1), color: '#c3e88d' })
      i = j + 1
      continue
    }
    // Angle-bracket include path
    if (isIncludeLine && line[i] === '<') {
      let j = i + 1
      while (j < line.length && line[j] !== '>') j++
      tokens.push({ text: line.slice(i, j + 1), color: '#c3e88d' })
      i = j + 1
      continue
    }
    // Preprocessor keyword (#include, #define…)
    if (line[i] === '#') {
      let j = i + 1
      while (j < line.length && /\w/.test(line[j])) j++
      tokens.push({ text: line.slice(i, j), color: '#c792ea' })
      i = j
      continue
    }
    // Identifiers & keywords
    if (/[a-zA-Z_]/.test(line[i])) {
      let j = i + 1
      while (j < line.length && /\w/.test(line[j])) j++
      const word = line.slice(i, j)
      tokens.push({ text: word, color: CPP_KEYWORDS.has(word) ? '#c792ea' : '#82aaff' })
      i = j
      continue
    }
    // Numbers
    if (/\d/.test(line[i])) {
      let j = i + 1
      while (j < line.length && /\d/.test(line[j])) j++
      tokens.push({ text: line.slice(i, j), color: '#f78c6c' })
      i = j
      continue
    }
    // Multi-char operators
    if ('=<>!+*&|'.includes(line[i])) {
      let j = i + 1
      while (j < line.length && '=<>!+*&|'.includes(line[j])) j++
      tokens.push({ text: line.slice(i, j), color: '#89ddff' })
      i = j
      continue
    }
    // Single-char minus (avoid stealing from --)
    if (line[i] === '-') {
      if (line[i + 1] === '-') {
        tokens.push({ text: '--', color: '#89ddff' })
        i += 2
      } else {
        tokens.push({ text: '-', color: '#89ddff' })
        i++
      }
      continue
    }
    // Punctuation
    if ('[]{}();,.'.includes(line[i])) {
      tokens.push({ text: line[i], color: '#89ddff' })
      i++
      continue
    }
    // Whitespace / other — no color
    tokens.push({ text: line[i], color: '#cdd3de' })
    i++
  }

  return tokens
}

function CodeBlock({ code }: { code: string }) {
  const lines = code.split('\n')
  return (
    <div
      style={{
        background: '#1e2233',
        borderRadius: 10,
        padding: '1.25rem 1.5rem',
        marginBottom: 24,
        overflow: 'auto',
      }}
    >
      <pre
        style={{
          fontFamily: 'var(--font-jetbrains)',
          fontSize: 13,
          lineHeight: 1.7,
          margin: 0,
          whiteSpace: 'pre',
        }}
      >
        {lines.map((line, li) => (
          <div key={li}>
            {tokenizeCppLine(line).map((tok, ti) => (
              <span
                key={ti}
                style={{ color: tok.color, fontStyle: tok.italic ? 'italic' : undefined }}
              >
                {tok.text}
              </span>
            ))}
            {li < lines.length - 1 ? '' : null}
          </div>
        ))}
      </pre>
    </div>
  )
}

function MemoryBlock({ children }: { children: string }) {
  return (
    <div
      style={{
        background: '#1e2233',
        borderRadius: 10,
        padding: '1.25rem 1.5rem',
        marginBottom: 24,
        overflow: 'auto',
      }}
    >
      <pre
        style={{
          fontFamily: 'var(--font-jetbrains)',
          fontSize: 12,
          color: '#cdd3de',
          margin: 0,
          lineHeight: 1.8,
          whiteSpace: 'pre',
        }}
      >
        {children}
      </pre>
    </div>
  )
}

function ComplexityList({ rows }: { rows: { case: string; value: string; note: string }[] }) {
  return (
    <div style={{ marginBottom: 24 }}>
      {rows.map((row) => (
        <div key={row.case} style={rowStyle}>
          <code style={termStyle('#7F77DD')}>{row.value}</code>
          <span style={descStyle}>
            <span style={{ fontWeight: 600, color: '#1a1a1a' }}>{row.case}</span>
            {' — '}
            {row.note}
          </span>
        </div>
      ))}
    </div>
  )
}

const PLAYLIST_SONGS = [
  { index: 0, title: 'Blinding Lights', artist: 'The Weeknd' },
  { index: 1, title: 'Levitating', artist: 'Dua Lipa' },
  { index: 2, title: 'Stay', artist: 'Kid LAROI' },
  { index: 3, title: 'Heat Waves', artist: 'Glass Animals' },
  { index: 4, title: 'Peaches', artist: 'Justin Bieber' },
]

function PlaylistVisual() {
  return (
    <div
      style={{
        background: '#f5f5f5',
        border: '1px solid #e8e8e8',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 24,
      }}
    >
      <div
        style={{
          padding: '12px 20px',
          borderBottom: '1px solid #e8e8e8',
          fontFamily: 'var(--font-jetbrains)',
          fontWeight: 400,
          fontSize: 11,
          color: '#aaa',
          letterSpacing: '0.08em',
        }}
      >
        A playlist — songs stored in a row, one after another.
      </div>
      {PLAYLIST_SONGS.map((song) => (
        <div
          key={song.index}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '12px 20px',
            borderBottom: '1px solid #e8e8e8',
            background: '#ffffff',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: 13,
              color: '#7F77DD',
              minWidth: 20,
              fontWeight: 400,
            }}
          >
            {song.index}
          </span>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-figtree)',
                fontWeight: 500,
                fontSize: 14,
                color: '#1a1a1a',
              }}
            >
              {song.title}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-figtree)',
                fontWeight: 400,
                fontSize: 12,
                color: '#aaa',
              }}
            >
              {song.artist}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function IndexVisual() {
  return (
    <div
      style={{
        background: '#f5f5f5',
        border: '1px solid #e8e8e8',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 24,
      }}
    >
      <div
        style={{
          padding: '12px 20px',
          borderBottom: '1px solid #e8e8e8',
          fontFamily: 'var(--font-jetbrains)',
          fontWeight: 400,
          fontSize: 11,
          color: '#aaa',
          letterSpacing: '0.08em',
        }}
      >
        Five slots numbered 0 to 4. First song is at index 0 — not 1.
      </div>
      {PLAYLIST_SONGS.map((song) => (
        <div
          key={song.index}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '12px 20px',
            borderBottom: '1px solid #e8e8e8',
            background: '#ffffff',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: 11,
              color: '#aaa',
              minWidth: 60,
              fontWeight: 400,
            }}
          >
            index {song.index}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-figtree)',
              fontWeight: 500,
              fontSize: 14,
              color: '#1a1a1a',
            }}
          >
            {song.title}
          </span>
        </div>
      ))}
    </div>
  )
}

function RemovalVisual() {
  const before = [
    { index: 0, title: 'Blinding Lights' },
    { index: 1, title: 'Levitating' },
    { index: 2, title: 'Stay', removed: true },
    { index: 3, title: 'Heat Waves' },
    { index: 4, title: 'Peaches' },
  ]
  const after = [
    { index: 0, title: 'Blinding Lights' },
    { index: 1, title: 'Levitating' },
    { index: 2, title: 'Heat Waves', shifted: true },
    { index: 3, title: 'Peaches', shifted: true },
    { index: 4, title: '', ignored: true },
  ]

  return (
    <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
      {[{ label: 'Before', rows: before }, { label: 'After', rows: after }].map(({ label, rows }) => (
        <div key={label} style={{ flex: 1, minWidth: 200 }}>
          <div
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontWeight: 400,
              fontSize: 11,
              color: '#aaa',
              marginBottom: 8,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            {label}
          </div>
          <div style={{ background: '#f5f5f5', border: '1px solid #e8e8e8', borderRadius: 10, overflow: 'hidden' }}>
            {rows.map((row) => (
              <div
                key={row.index}
                style={{
                  display: 'flex',
                  gap: 12,
                  padding: '10px 16px',
                  borderBottom: '1px solid #e8e8e8',
                  background: (row as { removed?: boolean }).removed
                    ? '#fff5f5'
                    : (row as { ignored?: boolean }).ignored
                    ? '#fafafa'
                    : '#ffffff',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: 11,
                    color: '#ccc',
                    minWidth: 52,
                  }}
                >
                  index {row.index}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-figtree)',
                    fontWeight: 500,
                    fontSize: 13,
                    color: (row as { removed?: boolean }).removed
                      ? '#ef4444'
                      : (row as { ignored?: boolean }).ignored
                      ? '#ccc'
                      : (row as { shifted?: boolean }).shifted
                      ? '#16a34a'
                      : '#1a1a1a',
                    textDecoration: (row as { removed?: boolean }).removed ? 'line-through' : 'none',
                  }}
                >
                  {(row as { ignored?: boolean }).ignored ? 'ignored' : row.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const CODE_INIT = `string playlist[5] = {"Blinding Lights", "Levitating", "Stay", "Heat Waves", "Peaches"};`

const CODE_DECLARE_FULL = `#include <iostream>
#include <string>
using namespace std;

int main(){
    string playlist[5] = {"Blinding Lights", "Levitating", "Stay", "Heat Waves", "Peaches"};

    return 0;
}`

const CODE_ACCESS = `#include <iostream>
#include <string>
using namespace std;

int main(){
    string playlist[5] = {"Blinding Lights", "Levitating", "Stay", "Heat Waves", "Peaches"};

    cout << playlist[0] << "\\n";   // Blinding Lights
    cout << playlist[2] << "\\n";   // Stay
    cout << playlist[4] << "\\n";   // Peaches

    return 0;
}`

const CODE_TRAVERSE = `#include <iostream>
#include <string>
using namespace std;

int main(){
    string playlist[5] = {"Blinding Lights", "Levitating", "Stay", "Heat Waves", "Peaches"};
    int n = 5;

    for(int i = 0; i < n; i++){
        cout << playlist[i] << "\\n";
    }

    return 0;
}

// Blinding Lights
// Levitating
// Stay
// Heat Waves
// Peaches`

const CODE_ADD_END = `#include <iostream>
#include <string>
using namespace std;

int main(){
    string playlist[10] = {"Blinding Lights", "Levitating", "Stay", "Heat Waves", "Peaches"};
    int n = 5;

    playlist[n] = "Montero";
    n++;

    for(int i = 0; i < n; i++){
        cout << playlist[i] << "\\n";
    }

    return 0;
}

// Blinding Lights
// Levitating
// Stay
// Heat Waves
// Peaches
// Montero`

const CODE_REMOVE_END = `#include <iostream>
#include <string>
using namespace std;

int main(){
    string playlist[10] = {"Blinding Lights", "Levitating", "Stay", "Heat Waves", "Peaches"};
    int n = 5;

    playlist[n - 1] = "";
    n--;

    for(int i = 0; i < n; i++){
        cout << playlist[i] << "\\n";
    }

    return 0;
}

// Blinding Lights
// Levitating
// Stay
// Heat Waves`

const CODE_REMOVE_MIDDLE = `#include <iostream>
#include <string>
using namespace std;

int main(){
    string playlist[10] = {"Blinding Lights", "Levitating", "Stay", "Heat Waves", "Peaches"};
    int n = 5;

    for(int i = 2; i < n - 1; i++){
        playlist[i] = playlist[i + 1];
    }
    playlist[n - 1] = "";
    n--;

    for(int i = 0; i < n; i++){
        cout << playlist[i] << "\\n";
    }

    return 0;
}

// Blinding Lights
// Levitating
// Heat Waves
// Peaches`

const CODE_ADD_SPECIFIC = `for(int i = n; i > 2; i--){
    playlist[i] = playlist[i - 1];
}
playlist[2] = "Montero";
n++;

for(int i = 0; i < n; i++){
    cout << playlist[i] << "\\n";
}

// Blinding Lights
// Levitating
// Montero
// Stay
// Heat Waves
// Peaches`

const EXERCISES = [
  'Declare an array of 5 songs and print all of them using a loop.',
  'Print only the second and fourth songs directly using their index.',
  'Declare an array of size 10, fill 5 songs, add a new song at the end and print the result.',
  'Remove the last song and print the updated playlist.',
  'Remove the song at index 1, shift everything correctly and print the updated playlist.',
  'Add a new song at index 0. Shift everything to the right first, then place it and print the result.',
]

const rowStyle = {
  display: 'flex',
  gap: 20,
  padding: '12px 0',
  borderBottom: '1px solid #ebebeb',
  alignItems: 'flex-start' as const,
}

const termStyle = (color: string) => ({
  fontFamily: 'var(--font-jetbrains)',
  fontSize: 13,
  color,
  minWidth: 110,
  flexShrink: 0 as const,
  lineHeight: 1.6,
})

const descStyle = {
  fontFamily: 'var(--font-figtree)',
  fontWeight: 400,
  fontSize: 14,
  color: '#666',
  lineHeight: 1.75,
}

export default function ArrayPage() {
  return (
    <div style={{ background: '#fafaf9', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }} className="px-4 sm:px-8 py-10">

        {/* Breadcrumb */}
        <div
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontWeight: 400,
            fontSize: 12,
            color: '#bbb',
            marginBottom: 24,
          }}
        >
          <Link href="/" style={{ color: '#bbb', textDecoration: 'none' }}>Home</Link>
          {' / '}
          <Link href="/learn-dsa" style={{ color: '#bbb', textDecoration: 'none' }}>Learn DSA</Link>
          {' / '}
          <span style={{ color: '#7F77DD' }}>Array</span>
        </div>

        {/* Two-column layout */}
        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>

          {/* Sidebar */}
          <div className="hidden lg:block" style={{ position: 'sticky', top: 80 }}>
            <LearnSidebar />
          </div>

          {/* Main article */}
          <article style={{ flex: 1, minWidth: 0 }}>

            {/* Category pill */}
            <span
              style={{
                display: 'inline-block',
                background: 'transparent',
                color: '#d97706',
                fontFamily: 'var(--font-jetbrains)',
                fontWeight: 400,
                fontSize: 11,
                padding: '3px 10px',
                borderRadius: 20,
                marginBottom: 14,
                letterSpacing: '0.08em',
                border: '1px solid #fde68a',
              }}
            >
              DATA STRUCTURES
            </span>

            {/* Title */}
            <h1
              style={{
                fontFamily: 'var(--font-lora)',
                fontWeight: 700,
                fontSize: 34,
                color: '#1a1a1a',
                marginBottom: 8,
                lineHeight: 1.2,
              }}
            >
              What is an Array in Programming
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontFamily: 'var(--font-figtree)',
                fontWeight: 400,
                fontSize: 15,
                color: '#666',
                marginBottom: 20,
                lineHeight: 1.6,
              }}
            >
              From zero to fully understanding arrays — step by step, no experience needed.
            </p>

            {/* Meta row */}
            <div
              style={{
                display: 'flex',
                gap: 10,
                alignItems: 'center',
                marginBottom: 40,
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontWeight: 400,
                  fontSize: 12,
                  color: '#888',
                  border: '1px solid #e8e8e8',
                  padding: '3px 12px',
                  borderRadius: 20,
                }}
              >
                12 min read
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontWeight: 400,
                  fontSize: 12,
                  color: '#16a34a',
                  border: '1px solid #bbf7d0',
                  background: '#f0fdf4',
                  padding: '3px 12px',
                  borderRadius: 20,
                }}
              >
                Beginner
              </span>
            </div>

            {/* Intro */}
            <SectionHeading>Before anything, let me ask you something</SectionHeading>

            <Paragraph>
              Think about going to school. Just you. You&apos;d hop on your cycle and go.
            </Paragraph>

            <Paragraph>
              Now imagine you and 40 friends are going together. You could each take your own
              cycle — 40 separate cycles, 40 separate trips. Or you could just take one bus.
            </Paragraph>

            <Paragraph>
              Same idea in programming.
            </Paragraph>

            <Paragraph>
              If you have one value to store, you use a variable:
            </Paragraph>

            <CodeBlock code={`int var = 10;`} />

            <Paragraph>
              But if you have 10 different numbers to store? You could store them in 10 different
              variables. However you could also save them all in one variable — like taking a bus
              for 40 students instead of 40 separate cycles.
            </Paragraph>

            <CalloutBox>
              That one variable that holds everything together is called an array.
            </CalloutBox>

            {/* What is an array */}
            <SectionHeading>What is an array?</SectionHeading>

            <Paragraph>
              If you open your music app, what do you see?
            </Paragraph>

            <PlaylistVisual />

            <Paragraph>
              That is an array. An array is a collection of items of the same type.
              Now let&apos;s see how to create one.
            </Paragraph>

            {/* How to create */}
            <SectionHeading>How to create an array in C++?</SectionHeading>

            <Paragraph>We create one like this:</Paragraph>

            <MemoryBlock>{`datatype  arrayName[how many items]`}</MemoryBlock>

            <Paragraph>Let&apos;s create a playlist array:</Paragraph>

            <CodeBlock code={CODE_INIT} />

            <Paragraph>
              This creates an array named playlist that stores strings and holds 5 of them.
              Let me break it down:
            </Paragraph>

            <div style={{ marginBottom: 24 }}>
              {[
                { term: 'string', color: '#c792ea', desc: 'The data type. We are storing song names — text — so we write string. Storing numbers? Write int.' },
                { term: 'playlist', color: '#82aaff', desc: 'The name of the array.' },
                { term: '[5]', color: '#89ddff', desc: 'How many items it holds. The computer reserves exactly 5 slots.' },
                { term: '{}', color: '#89ddff', desc: 'The songs we are adding. Each one goes into a slot, in order, left to right.' },
              ].map(({ term, color, desc }) => (
                <div key={term} style={rowStyle}>
                  <code style={termStyle(color)}>{term}</code>
                  <span style={descStyle}>{desc}</span>
                </div>
              ))}
            </div>

            <Paragraph>Next, let&apos;s see how arrays are stored.</Paragraph>

            {/* How are arrays stored */}
            <SectionHeading>How are arrays stored in the computer?</SectionHeading>

            <Paragraph>
              Think of your computer having this memory:
            </Paragraph>

            <MemoryBlock>{`[ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]`}</MemoryBlock>

            <Paragraph>
              Now, our array is of size 5. So the computer searches for a place where 5 empty
              slots are available together. It finds one and stores all 5 songs there, like this:
            </Paragraph>

            <MemoryBlock>{`[ ][ ][ ][Blinding Lights][Levitating][Stay][Heat Waves][Peaches][ ][ ][ ][ ]`}</MemoryBlock>

            <Paragraph>
              Now each slot has a number. That number is called an index.
            </Paragraph>

            <IndexVisual />

            {/* Access */}
            <SectionHeading>Access a specific element in an array</SectionHeading>

            <Paragraph>
              Sometimes you don&apos;t want to play the whole playlist. You want one specific song.
              You just tap it and it plays directly.
            </Paragraph>

            <Paragraph>
              Same in arrays. You can access any element directly using its index number.
            </Paragraph>

            <Paragraph>
              Important thing to notice — index starts at 0, not 1. To access any element you just do:
            </Paragraph>

            <MemoryBlock>{`arrayName[index]`}</MemoryBlock>

            <Paragraph>So to access our playlist at index 0:</Paragraph>

            <CodeBlock code={`playlist[0]`} />

            <Paragraph>And to print it:</Paragraph>

            <CodeBlock code={`cout << playlist[0];  // Blinding Lights`} />

            <Paragraph>Similarly, this is how you access all 5:</Paragraph>

            <CodeBlock code={`cout << playlist[0];  // Blinding Lights\ncout << playlist[1];  // Levitating\ncout << playlist[2];  // Stay\ncout << playlist[3];  // Heat Waves\ncout << playlist[4];  // Peaches`} />

            <Paragraph>
              So to access Stay it is one step. To access Peaches it is one step. Even if there
              were 1000 songs it would still be one step — because we know exactly where the song
              is. We just give the index and the computer goes directly there.
              The time complexity remains constant. That is O(1).
            </Paragraph>

            {/* Update */}
            <SectionHeading>Update an element</SectionHeading>

            <Paragraph>
              Say you want to update a song. Your playlist looks like this:
            </Paragraph>

            <IndexVisual />

            <Paragraph>
              You just go to its index and overwrite it:
            </Paragraph>

            <CodeBlock code={`playlist[2] = "Shape of You";`} />

            <Paragraph>
              Now your playlist looks like this — Stay is now replaced with Shape of You.
              One step. We go directly to the index and change it. So the time complexity is O(1).
            </Paragraph>

            <CalloutBox>
              So if the array had 100 songs or 1000 songs it would still be one step. Because
              we know the index and we can directly go there and change it. The time complexity
              is O(1) — constant.
            </CalloutBox>

            {/* Traversal */}
            <SectionHeading>Traversal — going through every element</SectionHeading>

            <Paragraph>
              Sometimes you don&apos;t choose a song. You just hit play and every song plays one by
              one on auto mode. Going through each element one by one is called traversal.
              To traverse we just loop through each element:
            </Paragraph>

            <CodeBlock code={`for(int i = 0; i < n; i++){\n    cout << playlist[i] << "\\n";\n}`} />

            <div style={{ marginBottom: 24 }}>
              {[
                { term: 'int i = 0', desc: 'Start at index 0. The first slot.' },
                { term: 'i < n', desc: 'Keep going while i is less than n. We visit 0, 1, 2 ... n-1 and stop. We never touch index n — it does not exist.' },
                { term: 'i++', desc: 'After each element, move to the next index.' },
              ].map(({ term, desc }) => (
                <div key={term} style={rowStyle}>
                  <code style={termStyle('#c792ea')}>{term}</code>
                  <span style={descStyle}>{desc}</span>
                </div>
              ))}
            </div>

            <CodeBlock code={CODE_TRAVERSE} />

            <Paragraph>
              Now, to access each song we take one step per song. One song — one step. Two songs
              — two steps. Five songs — five steps. So if there are n elements, it takes n steps.
              That is why the time complexity of traversal is O(n).
            </Paragraph>

            {/* Remove last */}
            <SectionHeading>Remove last element</SectionHeading>

            <Paragraph>
              Say you want to remove a song. You delete it right? However in programming it does
              not work like that. We cannot delete a slot. The size is fixed. So what we do is
              just overwrite it with an empty value.
            </Paragraph>

            <CodeBlock code={`playlist[4] = "";\nn--;`} />

            <Paragraph>
              That is it. Peaches is gone. We can also do n-- to track that our active array is
              now 4 elements instead of 5. Now if we print:
            </Paragraph>

            <CodeBlock code={`for(int i = 0; i < n; i++){\n    cout << playlist[i] << "\\n";\n}`} />

            <div style={{ marginBottom: 24 }}>
              {[
                { term: 'playlist[4] = ""', color: '#82aaff', desc: 'We overwrite the last slot with an empty value. Peaches is gone.' },
                { term: 'n--', color: '#c792ea', desc: 'We reduce the active size by 1. Now our array has 4 songs instead of 5.' },
              ].map(({ term, color, desc }) => (
                <div key={term} style={rowStyle}>
                  <code style={termStyle(color)}>{term}</code>
                  <span style={descStyle}>{desc}</span>
                </div>
              ))}
            </div>

            <Paragraph>
              To remove the last element it is one step only. If there were 100 songs it would
              still be one step. It is always one step no matter what. So the time complexity is O(1).
            </Paragraph>

            <CodeBlock code={CODE_REMOVE_END} />

            {/* Remove from any index */}
            <SectionHeading>Remove from any index</SectionHeading>

            <Paragraph>
              Say you want to remove Stay — which is at index 2. You cannot just overwrite it
              with empty and call it done — because now you have a gap in the middle:
            </Paragraph>

            <MemoryBlock>{`[Blinding Lights][Levitating][  ][Heat Waves][Peaches]\n        0              1       2       3           4`}</MemoryBlock>

            <Paragraph>
              So what we do is shift everything after it one step to the left:
            </Paragraph>

            <CodeBlock code={`for(int i = 2; i < n-1; i++){\n    playlist[i] = playlist[i+1];\n}\nplaylist[n-1] = "";\nn--;`} />

            <div style={{ marginBottom: 24 }}>
              {[
                { term: 'playlist[i] = playlist[i+1]', color: '#82aaff', desc: 'Each element moves one step to the left.' },
                { term: 'playlist[n-1] = ""', color: '#82aaff', desc: 'The last slot is now empty so we overwrite it.' },
                { term: 'n--', color: '#c792ea', desc: 'We reduce the active size by 1.' },
              ].map(({ term, color, desc }) => (
                <div key={term} style={rowStyle}>
                  <code style={termStyle(color)}>{term}</code>
                  <span style={descStyle}>{desc}</span>
                </div>
              ))}
            </div>

            <RemovalVisual />

            <CodeBlock code={CODE_REMOVE_MIDDLE} />

            <Paragraph>
              To remove from any index we have to shift all elements after it. If we had 100 songs
              and removed the first one we would have to shift 99 elements. If there were n songs
              it would take n steps. So the time complexity is O(n) — linear.
            </Paragraph>

            {/* Adding at end */}
            <SectionHeading>Adding an element at the end · O(1)</SectionHeading>

            <Paragraph>
              Before we write the code — one important thing to understand first.
            </Paragraph>

            <Paragraph>
              In C++, an array has a fixed size.{' '}
              <code style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 13, color: '#82aaff', background: '#f0f4ff', borderRadius: 4, padding: '1px 5px' }}>string playlist[5]</code>
              {' '}means 5 slots forever. So if you want to add songs later you need to plan ahead.
              Declare the array bigger than you currently need. In practice — just double it. Have
              5 songs today? Declare 10. This gives you room to grow.
            </Paragraph>

            <Paragraph>
              We also keep a variable{' '}
              <code style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 13, color: '#c792ea', background: '#f8f0ff', borderRadius: 4, padding: '1px 5px' }}>n</code>
              {' '}that tracks how many slots are actually filled. The rest are just sitting there
              empty and waiting.
            </Paragraph>

            <MemoryBlock>{`[Blinding Lights][Levitating][Stay][Heat Waves][Peaches][  ][  ][  ][  ][  ]\n        0              1        2       3           4      5    6    7    8    9`}</MemoryBlock>

            <Paragraph>
              Now to add a song we just place it at index n — which is always the next empty slot:
            </Paragraph>

            <CodeBlock code={`playlist[n] = "Montero";\nn++;`} />

            <div style={{ marginBottom: 24 }}>
              {[
                { term: 'playlist[n]', desc: 'n is how many slots are filled. Since index starts at 0, index n is always the next empty one. 5 filled means next empty is at index 5.' },
                { term: 'n++', desc: 'Update the count. Without this n stays wrong and your next song overwrites this one.' },
              ].map(({ term, desc }) => (
                <div key={term} style={rowStyle}>
                  <code style={termStyle('#c792ea')}>{term}</code>
                  <span style={descStyle}>{desc}</span>
                </div>
              ))}
            </div>

            <CodeBlock code={CODE_ADD_END} />

            <Paragraph>
              One write. One step. No matter how many songs are already there — adding at the end
              is always one step. So the time complexity is O(1) — constant.
            </Paragraph>

            <CalloutBox>
              Also — if you don&apos;t want to worry about size at all, you can use a vector. It grows
              automatically as you add more elements. But that is a topic for another day.
            </CalloutBox>

            {/* Adding at specific index */}
            <SectionHeading>Adding an element at a specific index · O(n)</SectionHeading>

            <Paragraph>
              Say you want to add Montero at index 2 — right between Levitating and Stay.
            </Paragraph>

            <Paragraph>
              But remember — array is fixed size. You cannot just magically create a new slot in
              the middle. So similar to adding at the end, if you don&apos;t have empty slots you need
              to declare a new bigger array and copy everything over. So always plan ahead and
              declare more than you need:
            </Paragraph>

            <CodeBlock code={`string playlist[10] = {"Blinding Lights", "Levitating", "Stay", "Heat Waves", "Peaches"};\nint n = 5;`} />

            <Paragraph>
              5 filled. 5 empty and waiting at the end. Now we have room.
            </Paragraph>

            <Paragraph>
              Now — you cannot just place Montero at index 2 directly. Stay is already sitting
              there. If you do that Stay is gone forever. So what do we do? We make room first.
              We pick up everything from index 2 onwards and shift it one step to the right:
            </Paragraph>

            <MemoryBlock>{`[Blinding Lights][Levitating][Stay][Heat Waves][Peaches][  ]\n                                ↓        ↓          ↓\n[Blinding Lights][Levitating][  ][Stay][Heat Waves][Peaches]`}</MemoryBlock>

            <Paragraph>
              Now index 2 is empty and waiting. We place Montero right there:
            </Paragraph>

            <MemoryBlock>{`[Blinding Lights][Levitating][Montero][Stay][Heat Waves][Peaches]`}</MemoryBlock>

            <Paragraph>
              Nobody got overwritten. Nobody got lost. Everything is clean. In code:
            </Paragraph>

            <CodeBlock code={CODE_ADD_SPECIFIC} />

            <Paragraph>
              Now think about it — to add at index 2 we shifted 3 songs. If the array had 100
              songs and we added at index 2 we would shift 98 songs. The more songs there are
              the more shifting we do. So the time complexity is O(n) — linear.
            </Paragraph>

            {/* FAQ */}
            <SectionHeading>FAQ</SectionHeading>

            <SubHeading>How do you create an empty array?</SubHeading>

            <Paragraph>
              You can declare an array and initialize it with empty values like this:
            </Paragraph>

            <CodeBlock code={`string playlist[10] = {};`} />

            <Paragraph>
              This creates an array of 10 slots — all empty and waiting. For int it is the same:
            </Paragraph>

            <CodeBlock code={`int numbers[10] = {};`} />

            <Paragraph>
              {`{}`} always works for any type. For string it fills with empty strings, for int it
              fills with 0. Just track how many slots are filled using n — start it at 0:
            </Paragraph>

            <CodeBlock code={`int n = 0;`} />

            <Paragraph>
              Now as you add elements, keep doing n++ so you always know how many slots are filled.
            </Paragraph>

            <SubHeading>What happens if you go out of bounds — like accessing index 10 in an array of 5?</SubHeading>

            <Paragraph>
              Bad things. The array only has slots 0 to 4. If you try to access index 10 you are
              going out of bounds — you are reading memory that does not belong to you:
            </Paragraph>

            <CodeBlock code={`string playlist[5] = {"Blinding Lights", "Levitating", "Stay", "Heat Waves", "Peaches"};\n\ncout << playlist[10];  // out of bounds — index 10 does not exist`} />

            <Paragraph>
              Your program might crash. Or worse — it might give you a random value and keep
              running. C++ does not warn you. It just does it. So always make sure your index
              stays within range. A safe rule — if your array has size n, valid indexes are only
              0 to n-1. Never touch n or beyond.
            </Paragraph>

            <SubHeading>How do you get the size of an array?</SubHeading>

            <Paragraph>
              To get the size of an array in C++ you do this:
            </Paragraph>

            <CodeBlock code={`int size = sizeof(playlist) / sizeof(playlist[0]);`} />

            <div style={{ marginBottom: 24 }}>
              {[
                { term: 'sizeof(playlist)', color: '#82aaff', desc: 'gives the total memory the array takes.' },
                { term: 'sizeof(playlist[0])', color: '#82aaff', desc: 'gives the memory one slot takes.' },
              ].map(({ term, color, desc }) => (
                <div key={term} style={rowStyle}>
                  <code style={termStyle(color)}>{term}</code>
                  <span style={descStyle}>{desc}</span>
                </div>
              ))}
            </div>

            <Paragraph>Divide them and you get the number of slots.</Paragraph>

            <SubHeading>Can an array hold different types — like a string and an int together?</SubHeading>

            <Paragraph>
              No. An array is one type only. When you declare it you pick one type and every slot
              must be that type. Forever.
            </Paragraph>

            <CodeBlock code={`string playlist[5];   // every slot must be a string\nint scores[5];        // every slot must be an int`} />

            <Paragraph>
              If you try to store a number in a string array or a word in an int array — the
              compiler will throw an error. Think of it like a box that is labelled. A box
              labelled &quot;strings only&quot; will not accept numbers. You want to store both? You need
              two separate arrays.
            </Paragraph>

            <SubHeading>What is the difference between an array and a vector?</SubHeading>

            <Paragraph>
              An array is fixed size. You decide the size when you create it and it never changes.
              If you declared 5 slots and fill all 5 — you are stuck. No more room.
            </Paragraph>

            <CodeBlock code={`string playlist[5];  // always 5. no more, no less.`} />

            <Paragraph>
              A vector is different. It grows automatically as you add more elements. You never
              have to worry about running out of space or planning ahead:
            </Paragraph>

            <CodeBlock code={`vector<string> playlist;\n\nplaylist.push_back("Blinding Lights");\nplaylist.push_back("Levitating");\nplaylist.push_back("Stay");`} />

            <Paragraph>
              Just keep adding. The vector handles the rest. If you are just starting out, learn
              arrays first — they teach you how memory actually works. Once you are comfortable,
              vectors will feel like a natural upgrade.
            </Paragraph>


            {/* Exercises */}
            <SectionHeading>Now your turn</SectionHeading>

            <Paragraph>
              Do not skip this. Reading is not learning. Writing code is. Use your own favourite
              songs.
            </Paragraph>

            <ol style={{ margin: '0 0 32px 0', padding: '0 0 0 24px' }}>
              {EXERCISES.map((ex, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: 'var(--font-figtree)',
                    fontWeight: 400,
                    fontSize: 15,
                    color: '#1a1a1a',
                    lineHeight: 1.85,
                    marginBottom: 8,
                  }}
                >
                  {ex}
                </li>
              ))}
            </ol>

            {/* Closing card */}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e8e8e8',
                borderRadius: 10,
                padding: '24px 28px',
                marginTop: 40,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-lora)',
                  fontWeight: 700,
                  fontSize: 16,
                  color: '#1a1a1a',
                  marginBottom: 10,
                }}
              >
                You&apos;ve got the basics!
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-figtree)',
                  fontWeight: 400,
                  fontSize: 15,
                  color: '#666',
                  lineHeight: 1.8,
                  marginBottom: 16,
                }}
              >
                You now understand how arrays store data in a fixed line of memory slots, how
                indexing gives you instant access, and how insertion and removal work. Next up,
                the Linked List — a structure that trades that instant access for cheap insertions
                anywhere.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link
                  href="/learn-dsa/linked-list"
                  style={{
                    background: '#7F77DD',
                    color: '#fff',
                    borderRadius: 6,
                    padding: '9px 18px',
                    fontFamily: 'var(--font-figtree)',
                    fontWeight: 600,
                    fontSize: 13,
                    textDecoration: 'none',
                  }}
                >
                  Next: Linked List →
                </Link>
              </div>
            </div>

          </article>
        </div>
      </div>
    </div>
  )
}
