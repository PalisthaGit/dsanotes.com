"use client";
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface SimpleBreadcrumbProps {
  items: BreadcrumbItem[];
}

export function SimpleBreadcrumb({ items }: SimpleBreadcrumbProps) {
  return (
    <div style={{ background: '#f0f7ff', padding: '20px 48px' }}>
      {items.map((item, index) => (
        <span key={index}>
          {index > 0 && (
            <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600, fontSize: '12px', color: '#9ca3af' }}> / </span>
          )}
          {item.href ? (
            <Link href={item.href} style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600, fontSize: '12px', color: '#9ca3af', textDecoration: 'none' }}>
              {item.label}
            </Link>
          ) : (
            <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600, fontSize: '12px', color: '#6FB5FF' }}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
