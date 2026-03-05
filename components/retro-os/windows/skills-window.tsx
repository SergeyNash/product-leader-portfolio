"use client"

import { useState, useEffect } from "react"
import { useI18n, type Lang } from "../i18n"

interface SkillCategory {
  nameKey: string
  icon: string
  skills: { name: Record<Lang, string>; level: number }[]
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    nameKey: "skills.strategy",
    icon: "C:\\Strategy>",
    skills: [
      { name: { en: "Product Strategy", ru: "\u041F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432\u0430\u044F \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044F" }, level: 95 },
      { name: { en: "Roadmap Planning", ru: "\u041F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 Roadmap" }, level: 95 },
      { name: { en: "OKR Framework", ru: "OKR Framework" }, level: 90 },
      { name: { en: "P&L Management", ru: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 P&L" }, level: 85 },
      { name: { en: "Unit Economics", ru: "Unit-\u044D\u043A\u043E\u043D\u043E\u043C\u0438\u043A\u0430" }, level: 85 },
      { name: { en: "GTM Strategy", ru: "GTM-\u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044F" }, level: 80 },
    ],
  },
  {
    nameKey: "skills.analytics",
    icon: "C:\\Analytics>",
    skills: [
      { name: { en: "CJM / JTBD", ru: "CJM / JTBD" }, level: 95 },
      { name: { en: "CustDev", ru: "CustDev" }, level: 95 },
      { name: { en: "A/B Testing", ru: "A/B-\u0442\u0435\u0441\u0442\u044B" }, level: 85 },
      { name: { en: "Product Metrics", ru: "\u041F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432\u044B\u0435 \u043C\u0435\u0442\u0440\u0438\u043A\u0438" }, level: 90 },
      { name: { en: "LTV / ARPU / Retention", ru: "LTV / ARPU / Retention" }, level: 90 },
      { name: { en: "HADI Cycles", ru: "\u0426\u0438\u043A\u043B\u044B HADI" }, level: 85 },
    ],
  },
  {
    nameKey: "skills.management",
    icon: "C:\\Mgmt>",
    skills: [
      { name: { en: "Agile (Scrum)", ru: "Agile (Scrum)" }, level: 95 },
      { name: { en: "SAFe", ru: "SAFe" }, level: 90 },
      { name: { en: "Backlog Management", ru: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0431\u044D\u043A\u043B\u043E\u0433\u043E\u043C" }, level: 95 },
      { name: { en: "Resource Planning", ru: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0440\u0435\u0441\u0443\u0440\u0441\u0430\u043C\u0438" }, level: 85 },
      { name: { en: "Hiring & Reviews", ru: "\u041D\u0430\u0439\u043C \u0438 \u0440\u0435\u0432\u044C\u044E" }, level: 80 },
      { name: { en: "Distributed Teams", ru: "\u0420\u0430\u0441\u043F\u0440\u0435\u0434\u0435\u043B\u0451\u043D\u043D\u044B\u0435 \u043A\u043E\u043C\u0430\u043D\u0434\u044B" }, level: 85 },
    ],
  },
  {
    nameKey: "skills.technology",
    icon: "C:\\Tech>",
    skills: [
      { name: { en: "Enterprise Architecture", ru: "Enterprise-\u0430\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u0430" }, level: 80 },
      { name: { en: "System Design", ru: "System Design" }, level: 80 },
      { name: { en: "LLM / Prompt Engineering", ru: "LLM / Prompt Engineering" }, level: 85 },
      { name: { en: "MCP / Vibe Coding", ru: "MCP / Vibe Coding" }, level: 75 },
      { name: { en: "SCADA / ICS", ru: "\u0410\u0421\u0423 \u0422\u041F / SCADA" }, level: 70 },
      { name: { en: "Industrial Automation", ru: "\u041F\u0440\u043E\u043C\u044B\u0448\u043B\u0435\u043D\u043D\u0430\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044F" }, level: 75 },
    ],
  },
]

function SkillBar({ name, level }: { name: string; level: number }) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setWidth(level), 100)
    return () => clearTimeout(timer)
  }, [level])

  const totalBlocks = 20
  const filledBlocks = Math.round((width / 100) * totalBlocks)
  const color = level >= 90 ? "#00FF00" : level >= 70 ? "#FFFF00" : "#00BFFF"

  return (
    <div className="flex items-center gap-2 text-[11px]">
      <span className="w-[160px] shrink-0 truncate">{name}</span>
      <div className="flex-1 h-4 bg-[#404040] win95-inset flex items-center px-[2px]">
        <div className="flex gap-[2px] h-[10px] w-full">
          {Array.from({ length: totalBlocks }).map((_, i) => (
            <div
              key={i}
              className="h-full flex-1"
              style={{
                backgroundColor: i < filledBlocks ? color : "transparent",
                transition: `background-color ${i * 40}ms ease`,
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
  const { t, lang } = useI18n()
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="h-full flex flex-col text-black">
      {/* Tabs */}
      <div className="flex bg-[#c0c0c0] px-1 pt-1">
        {SKILL_CATEGORIES.map((cat, i) => (
          <button
            key={cat.nameKey}
            className={`px-3 py-1 text-[11px] border-t border-l border-r relative ${
              activeTab === i
                ? "bg-white border-[#808080] -mb-px z-10 font-bold"
                : "bg-[#c0c0c0] border-[#808080] text-[#808080]"
            }`}
            onClick={() => setActiveTab(i)}
          >
            {t(cat.nameKey)}
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
            <SkillBar key={skill.name.en} name={skill.name[lang]} level={skill.level} />
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 pt-2 border-t border-[#c0c0c0] flex gap-4 text-[9px] text-[#808080]">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-[#00FF00] inline-block" /> {t("skills.expert")}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-[#FFFF00] inline-block" /> {t("skills.advanced")}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-[#00BFFF] inline-block" /> {t("skills.proficient")}
          </span>
        </div>
      </div>
    </div>
  )
}
