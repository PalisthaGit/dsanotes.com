'use client'

import Link from 'next/link'
import { Search, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { label: 'Visualizer', href: '/visualizer' },
  { label: 'Learn DSA', href: '/learn' },
  { label: 'Common Problems', href: '/problems' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-navbar shadow-sm">
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px' }}>
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading text-xl font-bold text-text-navbar tracking-wide select-none"
          >
            DSANotes
          </Link>

          {/* Center links — hidden on mobile */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body font-bold text-text-navbar hover:opacity-70 transition-opacity text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side: search + hamburger */}
          <div className="flex items-center gap-3">
            {/* Search input */}
            <div className="relative hidden sm:flex items-center">
              <Search
                className="absolute left-3 text-text-secondary"
                size={16}
                aria-hidden="true"
              />
              <input
                type="search"
                placeholder="Search algorithms..."
                className="bg-white rounded-lg pl-9 pr-3 py-1.5 text-sm text-text-primary placeholder:text-text-muted outline-none focus:ring-2 focus:ring-accent/50"
                style={{ minWidth: '180px' }}
              />
            </div>

            {/* Hamburger — visible on mobile only */}
            <button
              className="md:hidden text-text-navbar"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-navbar border-t border-border">
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px' }}>
            <div className="pb-4 flex flex-col gap-3">
              {/* Mobile search */}
              <div className="relative flex items-center mt-3">
                <Search
                  className="absolute left-3 text-text-secondary"
                  size={16}
                  aria-hidden="true"
                />
                <input
                  type="search"
                  placeholder="Search algorithms..."
                  className="w-full bg-white rounded-lg pl-9 pr-3 py-1.5 text-sm text-text-primary placeholder:text-text-muted outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body font-bold text-text-navbar text-sm hover:opacity-70 transition-opacity"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
