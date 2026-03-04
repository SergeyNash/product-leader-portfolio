"use client"

import { useState, useEffect } from "react"

interface SkillCategory {
  name: string
  icon: string
  skills: { name: string; level: number }[]
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Strategy",
    icon: "C:\\Strategy>",
    skills: [
      { name: "Product Strategy", level: 95 },
      { name: "Roadmap Planning", level: 95 },
      { name: "OKR Framework", level: 90 },
      { name: "P&L Management", level: 85 },
      { name: "Unit Economics", level: 85 },
      { name: "GTM Strategy", level: 80 },
    ],
  },
  {
    name: "Analytics",
    icon: "C:\\Analytics>",
    skills: [
      { name: "CJM / JTBD", level: 95 },
      { name: "CustDev", level: 95 },
      { name: "A/B Testing", level: 85 },
      { name: "Product Metrics", level: 90 },
      { name: "LTV / ARPU / Retention", level: 90 },
      { name: "HADI Cycles", level: 85 },
    ],
  },
  {
    name: "Management",
    icon: "C:\\Mgmt>",
    skills: [
      { name: "Agile (Scrum)", level: 95 },
      { name: "SAFe", level: 90 },
      { name: "Backlog Management", level: 95 },
      { name: "Resource Planning", level: 85 },
      { name: "Hiring & Reviews", level: 80 },
      { name: "Distributed Teams", level: 85 },
    ],
  },
  {
    name: "Technology",
    icon: "C:\\Tech>",
    skills: [
      { name: "Enterprise Architecture", level: 80 },
      { name: "System Design", level: 80 },
      { name: "LLM / Prompt Engineering", level: 85 },
      { name: "MCP / Vibe Coding", level: 75 },
      { name: "SCADA / ICS", level: 70 },
      { name: "Industrial Automation", level: 75 },
    ],
  },
]

function SkillBar({ name, level }: { name: string; level: number }) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setWidth(level), 100)
    return () => clearTimeout(timer)
  }, [level])

  const blocks = Math.floor(width / 5)

  return (
    <div className="flex items-center gap-2 text-[11px]">
      <span className="w-[140px] shrink-0 truncate">{name}</span>
      <div className="flex-1 h-3 bg-[#404040] win95-inset flex items-center px-px">
        <div className="flex gap-px h-2" style={{ width: `${width}%` }}>
          {Array.from({ length: blocks }).map((_, i) => (
            <div
              key={i}
              className="h-full w-1.5"
              style={{
                backgroundColor: width >= 90 ? "#00FF00" : width >= 70 ? "#FFFF00" : "#00BFFF",
                transition: `opacity ${i * 30}ms ease`,
              }}
            />
          ))}
        </div>
      </div>
      <span className="w-8 text-right text-[10px] text-[#808080] shrink-0">{level}%</span>
    </div>
  )
}

export function SkillsWindow() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="h-full flex flex-col text-black">
      {/* Tabs */}
      <div className="flex bg-[#c0c0c0] px-1 pt-1">
        {SKILL_CATEGORIES.map((cat, i) => (
          <button
            key={cat.name}
            className={`px-3 py-1 text-[11px] border-t border-l border-r relative ${
              activeTab === i
                ? "bg-white border-[#808080] -mb-px z-10 font-bold"
                : "bg-[#c0c0c0] border-[#808080] text-[#808080]"
            }`}
            onClick={() => setActiveTab(i)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 bg-white border border-[#808080] m-1 p-3 overflow-y-auto win95-scrollbar">
        <div className="mb-3 p-2 bg-black text-[#00ff00] font-mono text-[11px]">
          <span className="text-[#808080]">
            {SKILL_CATEGORIES[activeTab].icon}
          </span>{" "}
          dir /s *.skill
        </div>

        <div className="flex flex-col gap-2">
          {SKILL_CATEGORIES[activeTab].skills.map((skill) => (
            <SkillBar key={skill.name} name={skill.name} level={skill.level} />
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 pt-2 border-t border-[#c0c0c0] flex gap-4 text-[9px] text-[#808080]">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-[#00FF00] inline-block" /> Expert (90%+)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-[#FFFF00] inline-block" /> Advanced (70%+)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-[#00BFFF] inline-block" /> Proficient
          </span>
        </div>
      </div>
    </div>
  )
}
