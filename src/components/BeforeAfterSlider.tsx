"use client";

import { useState } from "react";
import Image from "next/image";

type Pair = {
  label: string;
  before: string;
  after: string;
};

export default function BeforeAfterSlider({ pairs }: { pairs: Pair[] }) {
  const [active, setActive] = useState(0);
  const [value, setValue] = useState(50);
  const pair = pairs[active];

  return (
    <div>
      {pairs.length > 1 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {pairs.map((p, i) => (
            <button
              key={p.label}
              onClick={() => {
                setActive(i);
                setValue(50);
              }}
              className={`border px-3.5 py-1.5 text-xs uppercase tracking-[0.15em] transition ${
                i === active ? "border-amber bg-amber text-onamber" : "border-line text-ink-soft hover:border-amber"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      <div className="relative aspect-[4/3] w-full select-none overflow-hidden border border-line bg-cream-dark sm:aspect-[16/9]">
        <div className="absolute inset-0">
          <Image src={pair.before} alt={`${pair.label} - przed`} fill className="object-cover" sizes="(min-width: 1024px) 800px, 100vw" />
          <span className="absolute bottom-3 right-3 border border-ink-soft/40 bg-ink/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-ink backdrop-blur-sm">
            Przed
          </span>
        </div>

        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
          <Image src={pair.after} alt={`${pair.label} - po`} fill className="object-cover" sizes="(min-width: 1024px) 800px, 100vw" />
          <span className="absolute bottom-3 left-3 border border-amber/60 bg-amber px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-onamber">
            Po
          </span>
        </div>

        <div className="pointer-events-none absolute inset-y-0 z-10" style={{ left: `${value}%` }}>
          <div className="h-full w-px -translate-x-1/2 bg-amber" />
          <div className="absolute top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-amber bg-ink text-amber shadow-amber-glow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M8 6 2 12l6 6M16 6l6 6-6 6" />
            </svg>
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          aria-label="Suwak porównania przed i po"
          className="absolute inset-0 z-20 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
        />
      </div>
    </div>
  );
}
