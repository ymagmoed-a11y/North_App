import React from "react";

export default function DashboardPage() {
  return (
    <>
      {/* Header */}
      <header className="flex justify-between items-center w-full px-6 h-16 bg-surface border-b border-outline-variant">
        <div className="flex items-center">
          <span className="font-headline-sm text-headline-sm font-bold text-primary">North Star</span>
        </div>
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 font-label-caps text-label-caps text-on-surface-variant hover:text-primary">
            <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
            Export to PDF
          </button>
          <div className="flex gap-4 items-center">
            <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-transform active:scale-95">notifications</span>
            <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-transform active:scale-95">account_circle</span>
          </div>
        </div>
      </header>

      {/* Main scrollable area */}
      <main className="flex-1 overflow-y-auto bg-surface-container-low p-6">
        <div className="max-w-5xl mx-auto space-y-12 pb-20">
          {/* Identity Section */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-8 space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="font-display-lg text-display-lg text-primary">Arthur Sterling</h2>
                  <p className="font-label-caps text-label-caps text-on-surface-variant mt-1">Chief Executive &amp; Legacy Architect • London / Zurich</p>
                </div>
              </div>
              <div className="p-8 border-l-4 border-gold-accent bg-surface-container-lowest executive-lift">
                <div className="flex justify-between items-start mb-4">
                  <span className="font-label-caps text-label-caps text-gold-accent">Personal Positioning</span>
                  <button className="text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                </div>
                <p className="font-headline-sm text-headline-sm italic text-primary leading-relaxed">
                  "The architect of high-stakes precision systems, bridging the gap between visionary ambition and generational stability through radical clarity and relentless execution."
                </p>
              </div>
            </div>
            <div className="md:col-span-4 h-full">
              <div className="h-full w-full bg-surface-container-highest border border-outline-variant relative group">
                <img alt="Architecture" className="w-full h-full object-cover opacity-80" src="https://via.placeholder.com/400x300" />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors"></div>
              </div>
            </div>
          </section>

          {/* Primary Mission Section */}
          <section className="space-y-6 pt-12 border-t border-outline-variant">
            <div className="flex justify-between items-center">
              <h3 className="font-headline-md text-headline-md text-primary">Primary Mission</h3>
              <button className="text-on-surface-variant hover:text-primary flex items-center gap-2 font-label-caps text-label-caps">
                <span className="material-symbols-outlined text-[18px]">edit</span> Edit
              </button>
            </div>
            <div className="max-w-3xl">
              <p className="font-body-lg text-body-lg text-on-surface leading-relaxed text-justify">
                To construct a global ecosystem of self-sustaining enterprises that catalyze technological advancement while securing a $500M family legacy. I exist to eliminate cognitive friction for elite decision-makers and to leave a blueprint for high-performance living that persists for three generations beyond my own.
              </p>
            </div>
          </section>

          {/* 20‑Year Roadmap – three phases */}
          <section className="space-y-8 pt-12 border-t border-outline-variant">
            <div className="flex justify-between items-center">
              <h3 className="font-headline-md text-headline-md text-primary">Strategic Horizon</h3>
              <span className="font-label-caps text-label-caps text-on-surface-variant">2024 — 2044</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1 px-1 bg-outline-variant">
              {/* Phase 1 */}
              <div className="bg-surface p-8 space-y-6">
                <div className="flex justify-between">
                  <span className="font-data-tabular text-data-tabular text-gold-accent">PHASE 01</span>
                  <span className="font-label-caps text-label-caps text-on-surface-variant">2024‑2029</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-primary">The Foundation</h4>
                <ul className="space-y-3 font-body-md text-body-md text-on-surface-variant">
                  <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 mt-2 rounded-full bg-gold-accent shrink-0"></span>Scale North OS to 10k Enterprise Users.</li>
                  <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 mt-2 rounded-full bg-gold-accent shrink-0"></span>Establish Family Trust in Zurich.</li>
                  <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 mt-2 rounded-full bg-gold-accent shrink-0"></span>Acquire primary estate in the Alps.</li>
                </ul>
              </div>
              {/* Phase 2 */}
              <div className="bg-surface p-8 space-y-6">
                <div className="flex justify-between">
                  <span className="font-data-tabular text-data-tabular text-gold-accent">PHASE 02</span>
                  <span className="font-label-caps text-label-caps text-on-surface-variant">2030‑2037</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-primary">The Multiplier</h4>
                <ul className="space-y-3 font-body-md text-body-md text-on-surface-variant">
                  <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 mt-2 rounded-full bg-gold-accent shrink-0"></span>Portfolio expansion into Deep Tech.</li>
                  <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 mt-2 rounded-full bg-gold-accent shrink-0"></span>Liquid Net Worth target: $150M.</li>
                  <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 mt-2 rounded-full bg-gold-accent shrink-0"></span>Transition to Chairman / Non‑Exec roles.</li>
                </ul>
              </div>
              {/* Phase 3 */}
              <div className="bg-surface p-8 space-y-6">
                <div className="flex justify-between">
                  <span className="font-data-tabular text-data-tabular text-gold-accent">PHASE 03</span>
                  <span className="font-label-caps text-label-caps text-on-surface-variant">2038‑2044</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-primary">The Legacy</h4>
                <ul className="space-y-3 font-body-md text-body-md text-on-surface-variant">
                  <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 mt-2 rounded-full bg-gold-accent shrink-0"></span>Foundation for Philanthropic Logic.</li>
                  <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 mt-2 rounded-full bg-gold-accent shrink-0"></span>Succession plan fully operational.</li>
                  <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 mt-2 rounded-full bg-gold-accent shrink-0"></span>Archiving the "Sterling Methodology".</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Additional sections such as Capital Distribution, Financial Targets, etc. can be added similarly */}
        </div>
      </main>
    </>
  );
}
