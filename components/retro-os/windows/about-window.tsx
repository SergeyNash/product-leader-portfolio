"use client"

import { UserIcon, StarIcon } from "../icons"

const COMPETENCIES = [
  { label: "Product Leadership", desc: "Portfolio management, OKR/strategy, Roadmap, P&L, Board-level reporting" },
  { label: "Market Intelligence", desc: "JTBD, CustDev, Continuous Discovery, Strategic Accounts" },
  { label: "B2C / B2B2C", desc: "CJM optimization, LTV, ARPU, Conversion, A/B tests, UX research" },
  { label: "Team Management", desc: "Agile/SAFe, 7-10 cross-functional teams, hiring & developing leads" },
  { label: "Technical Depth", desc: "Enterprise architecture, System Design, LLM (Prompt engineering, MCP, Vibe coding)" },
]

export function AboutWindow() {
  return (
    <div className="p-4 text-[12px] leading-relaxed text-black">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4 pb-3 border-b-2 border-[#808080]">
        <div className="w-16 h-16 flex items-center justify-center bg-[#008080] win95-inset p-1 shrink-0">
          <UserIcon size={48} />
        </div>
        <div>
          <h1 className="text-lg font-bold text-[#000080]">Sergey Sinyakov</h1>
          <p className="text-[13px] font-bold">CPO / Head of Product</p>
          <p className="text-[11px] text-[#808080]">Moscow, Russia</p>
          <p className="text-[11px] text-[#808080]">English: C2 (Fluent)</p>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-4 p-3 bg-[#FFFFCC] win95-inset">
        <p className="font-bold text-[11px] mb-1 text-[#000080]">SYSTEM INFO:</p>
        <p className="text-[11px] leading-relaxed">
          Product leader with 18 years of experience building B2B/Enterprise platforms
          and hybrid B2B2C solutions in cybersecurity, fintech (insurance), and industrial
          automation. Combines engineering depth (architecture, system design) with P&L management
          and product metrics. Specializes in building processes from Customer Discovery to GTM
          in complex regulated industries. Actively implements AI tools (LLM) to accelerate
          analytics, hypothesis generation, and team routine automation.
        </p>
      </div>

      {/* Competencies */}
      <div>
        <p className="font-bold text-[12px] mb-2 text-[#000080]">
          Key Competencies:
        </p>
        <div className="flex flex-col gap-2">
          {COMPETENCIES.map((comp) => (
            <div key={comp.label} className="flex items-start gap-2">
              <div className="mt-0.5 shrink-0">
                <StarIcon size={12} />
              </div>
              <div>
                <span className="font-bold text-[11px]">{comp.label}: </span>
                <span className="text-[11px] text-[#404040]">{comp.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fun stats */}
      <div className="mt-4 pt-3 border-t-2 border-[#808080]">
        <p className="text-[10px] text-[#808080]">
          system uptime: 18 years | processes managed: 10+ teams | bugs shipped: 0 release failures (2025)
        </p>
      </div>
    </div>
  )
}
