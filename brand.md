# DSANotes — Brand Guidelines

## What is DSANotes?
A DSA visualizer platform that helps developers learn Data Structures
and Algorithms through interactive visualizations.

## One Sentence
"DSANotes helps you understand DSA concepts by visualizing how
algorithms work step by step."

## Target User
Students and developers preparing for coding interviews who learn
better visually than through text alone.

---

## Colors

### Core Palette
| Token          | Hex       | Usage                          |
|----------------|-----------|--------------------------------|
| navbar         | #6FB5FF   | Navbar background              |
| bg-primary     | #ffffff   | Main page background           |
| bg-secondary   | #f0f7ff   | Alternate sections, footer     |
| bg-card        | #f5faff   | Card backgrounds               |
| border         | #d4e6ff   | Borders, dividers              |
| dark           | #1a1a2e   | Visualizer bg, dark surfaces   |

### Text Colors
| Token          | Hex       | Usage                          |
|----------------|-----------|--------------------------------|
| text-primary   | #0d1117   | Headings, primary text         |
| text-secondary | #6b7280   | Body text, descriptions        |
| text-muted     | #9ca3af   | Subtext, placeholders          |
| text-navbar    | #1a1a2e   | Text on navbar                 |
| text-accent    | #6FB5FF   | Accent text, links, footer     |
| text-accent-dark | #1a6bb5 | Darker accent for pills        |

### Accent
| Token          | Hex       | Usage                          |
|----------------|-----------|--------------------------------|
| accent         | #6FB5FF   | Buttons, highlights, borders   |
| accent-light   | #dbeeff   | Pill backgrounds, badge bg     |

### Algorithm Pill Colors
| Algorithm type | Background | Text    |
|----------------|------------|---------|
| Blue pill      | #dbeeff    | #1a6bb5 |
| Pink pill      | #fce7f3    | #be185d |
| Green pill     | #dcfce7    | #166534 |

### Status Colors
| Token     | Hex     | Background | Text    |
|-----------|---------|------------|---------|
| active    | -       | #dcfce7    | #166534 |
| coming    | -       | #fef9c3    | #854d0e |
| error     | #f87171 | -          | -       |

---

## Typography
| Role        | Font           | Weight   | Letter Spacing |
|-------------|----------------|----------|----------------|
| Headings    | Poppins        | 600, 700 | 0.04em         |
| Body / UI   | Nunito         | 400, 600 | 0.03em         |
| Code blocks | JetBrains Mono | 400, 500 | 0.02em         |

---

## Buttons
| Name      | Background | Text    | Usage            |
|-----------|------------|---------|------------------|
| Primary   | #6FB5FF    | #ffffff | Main CTA         |
| Secondary | #dbeeff    | #1a6bb5 | Secondary action |
| Disabled  | #f3f4f6    | #9ca3af | Coming soon      |

### Rules
- Border radius: 8px for card buttons, 10px for hero buttons
- Font: Nunito 700
- Letter spacing: 0.04em

---

## Card Style
- Background: #f5faff
- Border: 0.5px solid #d4e6ff
- Border top: 3px solid #6FB5FF (active), 3px solid #d4e6ff (disabled)
- Border radius: 12px
- Padding: 20px

---

## Section Alternating Pattern
1. Navbar       → #6FB5FF
2. Hero         → #ffffff
3. Stats strip  → #f0f7ff
4. Cards        → #ffffff
5. Footer       → #f0f7ff

---

## Visualizer Bar Colors
| State      | Color   |
|------------|---------|
| Comparing  | #f472b6 |
| Sorted     | #4ade80 |
| Pivot      | #facc15 |
| Unsorted   | #6FB5FF |

---

## Pages
| Route                    | Description                        |
|--------------------------|------------------------------------|
| /                        | Landing page                       |
| /visualizer              | All visualizers grid               |
| /visualizer/sorting      | Sorting algorithms visualizer      |
| /visualizer/searching    | Search algorithms visualizer       |
| /visualizer/pathfinding  | Pathfinding algorithms visualizer  |
| /visualizer/mst          | MST algorithms visualizer          |
| /visualizer/scc          | Strongly connected components      |
| /visualizer/string       | String matching visualizer         |
