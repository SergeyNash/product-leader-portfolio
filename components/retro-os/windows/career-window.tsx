"use client"

import { useState } from "react"
import { useI18n, type Lang } from "../i18n"

interface Job {
  id: string
  company: Record<Lang, string>
  role: Record<Lang, string>
  period: Record<Lang, string>
  description: Record<Lang, string>
  achievements: Record<Lang, string[]>
  tags: string[]
}

const JOBS: Job[] = [
  {
    id: "pt",
    company: { en: "Positive Technologies", ru: "Positive Technologies" },
    role: { en: "Head of Application Security Products", ru: "\u0420\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432 Application Security" },
    period: { en: "Aug 2023 - Present", ru: "\u0410\u0432\u0433 2023 - \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0435\u0435 \u0432\u0440\u0435\u043C\u044F" },
    description: {
      en: "Managing product portfolio in cybersecurity. Working with enterprise and government clients (Strategic Accounts).",
      ru: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043F\u043E\u0440\u0442\u0444\u0435\u043B\u0435\u043C \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432 \u0432 \u0441\u0444\u0435\u0440\u0435 \u043A\u0438\u0431\u0435\u0440\u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438. \u0420\u0430\u0431\u043E\u0442\u0430 \u0441 \u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u044B\u043C\u0438 \u043A\u043B\u0438\u0435\u043D\u0442\u0430\u043C\u0438 (Enterprise, Strategic Accounts).",
    },
    achievements: {
      en: [
        "Unlocked strategic contracts with major federal clients by identifying and closing product gaps through systematic customer interviews",
        "Built Customer Success function from scratch (QBR, proactive support, feedback collection) for retention and expansion",
        "Achieved 0 failed releases in 2025 through transparent planning, early UX validation, and cross-team sync (7-10 teams)",
        "Implemented data-driven culture with CustDev and LLM-powered interview analysis for automated PRD generation",
      ],
      ru: [
        "\u0420\u0430\u0437\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043B \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043A\u043E\u043D\u0442\u0440\u0430\u043A\u0442\u044B \u0441 \u043A\u0440\u0443\u043F\u043D\u0435\u0439\u0448\u0438\u043C\u0438 \u0444\u0435\u0434\u0435\u0440\u0430\u043B\u044C\u043D\u044B\u043C\u0438 \u0437\u0430\u043A\u0430\u0437\u0447\u0438\u043A\u0430\u043C\u0438, \u0432\u044B\u044F\u0432\u0438\u0432 \u0438 \u0437\u0430\u043A\u0440\u044B\u0432 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432\u044B\u0435 \u043F\u0440\u043E\u0431\u0435\u043B\u044B \u0447\u0435\u0440\u0435\u0437 \u0440\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u044B\u0435 \u0438\u043D\u0442\u0435\u0440\u0432\u044C\u044E \u0441 \u043A\u043B\u0438\u0435\u043D\u0442\u0430\u043C\u0438",
        "\u0421\u043E\u0437\u0434\u0430\u043B \u0441 \u043D\u0443\u043B\u044F CS-\u0444\u0443\u043D\u043A\u0446\u0438\u044E (QBR, \u043F\u0440\u043E\u0430\u043A\u0442\u0438\u0432\u043D\u0430\u044F \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430, \u0441\u0431\u043E\u0440 \u0444\u0438\u0434\u0431\u0435\u043A\u0430) \u0434\u043B\u044F \u0443\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u044F \u0438 \u0440\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u0438\u044F \u043A\u043E\u043D\u0442\u0440\u0430\u043A\u0442\u043E\u0432",
        "0 \u0441\u043E\u0440\u0432\u0430\u043D\u043D\u044B\u0445 \u0440\u0435\u043B\u0438\u0437\u043E\u0432 \u0432 2025 \u0433\u043E\u0434\u0443 \u0437\u0430 \u0441\u0447\u0451\u0442 \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E\u0433\u043E \u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F, \u0440\u0430\u043D\u043D\u0438\u0445 UX-\u0432\u0430\u043B\u0438\u0434\u0430\u0446\u0438\u0439 \u0438 \u043A\u0440\u043E\u0441\u0441-\u043A\u043E\u043C\u0430\u043D\u0434\u043D\u043E\u0439 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438 (7\u201310 \u043A\u043E\u043C\u0430\u043D\u0434)",
        "\u0412\u043D\u0435\u0434\u0440\u0438\u043B data-driven \u043A\u0443\u043B\u044C\u0442\u0443\u0440\u0443 \u0441 CustDev \u0438 LLM \u0434\u043B\u044F \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u0438\u043D\u0442\u0435\u0440\u0432\u044C\u044E \u0438 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u0438 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F PRD",
      ],
    },
    tags: ["Cybersecurity", "Enterprise", "B2B", "CS", "LLM"],
  },
  {
    id: "ingo",
    company: { en: "Ingosstrakh", ru: "\u0418\u043D\u0433\u043E\u0441\u0441\u0442\u0440\u0430\u0445" },
    role: { en: "Product Owner / CPO of Digital Channels", ru: "Product Owner / CPO \u0446\u0438\u0444\u0440\u043E\u0432\u044B\u0445 \u043A\u0430\u043D\u0430\u043B\u043E\u0432" },
    period: { en: "Dec 2021 - Aug 2023", ru: "\u0414\u0435\u043A 2021 - \u0410\u0432\u0433 2023" },
    description: {
      en: "CPO for website and online sales channels. Digital transformation of insurance company. Managing 6 cross-functional teams.",
      ru: "CPO \u0434\u043B\u044F \u0441\u0430\u0439\u0442\u0430 \u0438 \u043E\u043D\u043B\u0430\u0439\u043D-\u043A\u0430\u043D\u0430\u043B\u043E\u0432 \u043F\u0440\u043E\u0434\u0430\u0436. \u0426\u0438\u0444\u0440\u043E\u0432\u0430\u044F \u0442\u0440\u0430\u043D\u0441\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u0441\u0442\u0440\u0430\u0445\u043E\u0432\u043E\u0439 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438. \u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 6 \u043A\u0440\u043E\u0441\u0441-\u0444\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u043C\u0438 \u043A\u043E\u043C\u0430\u043D\u0434\u0430\u043C\u0438.",
    },
    achievements: {
      en: [
        "Led complete website redesign: growth in MAU, average check, online revenue, and time-to-market acceleration",
        "Life Insurance: Calculator launch (30K MAU) drove +25% revenue growth and conversion increase",
        "Travel: Funnel optimization reduced loss ratio by 10%, increased payment conversion by 12%",
        "Auth: Gosuslugi + phone login boosted onboarding conversion by 50%",
        "Implemented SAFe and SCRUM across 6 teams for predictable quarterly releases",
      ],
      ru: [
        "\u0420\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u043B \u043F\u043E\u043B\u043D\u044B\u043C \u0440\u0435\u0434\u0438\u0437\u0430\u0439\u043D\u043E\u043C \u0441\u0430\u0439\u0442\u0430: \u0440\u043E\u0441\u0442 MAU, \u0441\u0440\u0435\u0434\u043D\u0435\u0433\u043E \u0447\u0435\u043A\u0430, \u043E\u043D\u043B\u0430\u0439\u043D-\u0441\u0431\u043E\u0440\u043E\u0432 \u0438 \u0443\u0441\u043A\u043E\u0440\u0435\u043D\u0438\u0435 time-to-market",
        "\u0421\u0442\u0440\u0430\u0445\u043E\u0432\u0430\u043D\u0438\u0435 \u0436\u0438\u0437\u043D\u0438: \u0417\u0430\u043F\u0443\u0441\u043A \u043A\u0430\u043B\u044C\u043A\u0443\u043B\u044F\u0442\u043E\u0440\u0430 (30K MAU) \u2014 \u0440\u043E\u0441\u0442 \u0441\u0431\u043E\u0440\u043E\u0432 \u043D\u0430 25% \u0438 \u0440\u043E\u0441\u0442 \u043A\u043E\u043D\u0432\u0435\u0440\u0441\u0438\u0438",
        "\u041F\u0443\u0442\u0435\u0448\u0435\u0441\u0442\u0432\u0438\u044F: \u041E\u043F\u0442\u0438\u043C\u0438\u0437\u0430\u0446\u0438\u044F \u0432\u043E\u0440\u043E\u043D\u043A\u0438 \u2014 \u0441\u043D\u0438\u0436\u0435\u043D\u0438\u0435 \u0443\u0431\u044B\u0442\u043E\u0447\u043D\u043E\u0441\u0442\u0438 \u043D\u0430 10%, \u0440\u043E\u0441\u0442 \u043A\u043E\u043D\u0432\u0435\u0440\u0441\u0438\u0438 \u0432 \u043E\u043F\u043B\u0430\u0442\u0443 \u043D\u0430 12%",
        "\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F: \u0412\u043D\u0435\u0434\u0440\u0435\u043D\u0438\u0435 \u0413\u043E\u0441\u0443\u0441\u043B\u0443\u0433 + \u0432\u0445\u043E\u0434 \u043F\u043E \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0443 \u2014 \u043A\u043E\u043D\u0432\u0435\u0440\u0441\u0438\u044F \u0432 \u043E\u043D\u0431\u043E\u0440\u0434\u0438\u043D\u0433 +50%",
        "\u0412\u043D\u0435\u0434\u0440\u0438\u043B SAFe \u0438 SCRUM \u0434\u043B\u044F 6 \u043A\u043E\u043C\u0430\u043D\u0434 \u0438 \u043F\u0440\u0435\u0434\u0441\u043A\u0430\u0437\u0443\u0435\u043C\u044B\u0445 \u043A\u0432\u0430\u0440\u0442\u0430\u043B\u044C\u043D\u044B\u0445 \u0440\u0435\u043B\u0438\u0437\u043E\u0432",
      ],
    },
    tags: ["Fintech", "Insurance", "B2C", "B2B2C", "SAFe"],
  },
  {
    id: "antrax",
    company: { en: 'MNPP "Antraks"', ru: '\u041C\u041D\u041F\u041F "\u0410\u043D\u0442\u0440\u0430\u043A\u0441"' },
    role: { en: "Head of Software Development / Product Owner", ru: "\u0420\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C \u043E\u0442\u0434\u0435\u043B\u0430 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u041F\u041E / Product Owner" },
    period: { en: "Oct 2019 - Dec 2021", ru: "\u041E\u043A\u0442 2019 - \u0414\u0435\u043A 2021" },
    description: {
      en: "Full product development cycle for energy sector (B2B, Industrial IoT).",
      ru: "\u041F\u043E\u043B\u043D\u044B\u0439 \u0446\u0438\u043A\u043B \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432 \u0434\u043B\u044F \u044D\u043D\u0435\u0440\u0433\u0435\u0442\u0438\u043A\u0438 (B2B, Industrial IoT).",
    },
    achievements: {
      en: [
        "Core product (Power Line Monitoring): +50% user base growth and 2x system efficiency through predictive diagnostics & FLISR",
        "Integrated platform with DJI drones for visual inspection of power transmission lines",
        "Introduced Story Mapping, CustDev, and UX research. Grew dev team from 0 to 8+ engineers",
      ],
      ru: [
        "\u0421\u0438\u0441\u0442\u0435\u043C\u0430 \u043C\u043E\u043D\u0438\u0442\u043E\u0440\u0438\u043D\u0433\u0430 \u041B\u042D\u041F: \u0440\u043E\u0441\u0442 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u043E\u0439 \u0431\u0430\u0437\u044B \u043D\u0430 50% \u0438 \u044D\u0444\u0444\u0435\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C \u0441\u0438\u0441\u0442\u0435\u043C\u044B \u0432 2 \u0440\u0430\u0437\u0430 (\u043F\u0440\u0435\u0434\u0438\u043A\u0442\u0438\u0432\u043D\u0430\u044F \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0430, FLISR)",
        "\u0418\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044F \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u044B \u0441 DJI-\u0434\u0440\u043E\u043D\u0430\u043C\u0438 \u0434\u043B\u044F \u0432\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044F \u043B\u0438\u043D\u0438\u0439 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043F\u0435\u0440\u0435\u0434\u0430\u0447",
        "\u0412\u043D\u0435\u0434\u0440\u0438\u043B Story Mapping, CustDev \u0438 UX-\u0438\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u044F. \u0423\u0432\u0435\u043B\u0438\u0447\u0438\u043B \u0448\u0442\u0430\u0442 \u0441 0 \u0434\u043E 8+ \u0447\u0435\u043B\u043E\u0432\u0435\u043A",
      ],
    },
    tags: ["Industrial IoT", "Energy", "B2B", "Drones"],
  },
  {
    id: "prev",
    company: { en: "Earlier Career", ru: "\u0420\u0430\u043D\u043D\u044F\u044F \u043A\u0430\u0440\u044C\u0435\u0440\u0430" },
    role: { en: "Engineering & Management Roles", ru: "\u0418\u043D\u0436\u0435\u043D\u0435\u0440\u043D\u044B\u0435 \u0438 \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0447\u0435\u0441\u043A\u0438\u0435 \u043F\u043E\u0437\u0438\u0446\u0438\u0438" },
    period: { en: "2007 - 2019", ru: "2007 - 2019" },
    description: {
      en: "Technical foundation across industrial automation, software development, and engineering.",
      ru: "\u0422\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0444\u0443\u043D\u0434\u0430\u043C\u0435\u043D\u0442: \u043F\u0440\u043E\u043C\u044B\u0448\u043B\u0435\u043D\u043D\u0430\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044F, \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u041F\u041E, \u0438\u043D\u0436\u0435\u043D\u0435\u0440\u0438\u044F.",
    },
    achievements: {
      en: [
        "Impeks Elektro: Lead SCADA/ICS specialist - project management, specs writing, negotiations",
        "SST Energomontazh / TransMashHolding: Engineering positions in industrial automation",
        "NII DAR: Software development for metro systems and radar",
      ],
      ru: [
        "\u0418\u043C\u043F\u044D\u043A\u0441 \u042D\u043B\u0435\u043A\u0442\u0440\u043E: \u0412\u0435\u0434\u0443\u0449\u0438\u0439 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442 \u043F\u043E \u0410\u0421\u0423 \u0422\u041F \u2014 \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u0430\u043C\u0438, \u043D\u0430\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0422\u0417, \u043F\u0435\u0440\u0435\u0433\u043E\u0432\u043E\u0440\u044B",
        "\u0421\u0421\u0422\u044D\u043D\u0435\u0440\u0433\u043E\u043C\u043E\u043D\u0442\u0430\u0436 / \u0422\u0440\u0430\u043D\u0441\u041C\u0430\u0448\u0425\u043E\u043B\u0434\u0438\u043D\u0433: \u0418\u043D\u0436\u0435\u043D\u0435\u0440\u043D\u044B\u0435 \u043F\u043E\u0437\u0438\u0446\u0438\u0438 \u0432 \u0410\u0421\u0423 \u0422\u041F",
        "\u041D\u0418\u0418 \u0414\u0410\u0420: \u0420\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u041F\u041E \u0434\u043B\u044F \u043C\u0435\u0442\u0440\u043E \u0438 \u0440\u0430\u0434\u0438\u043E\u043B\u043E\u043A\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0445 \u0441\u0438\u0441\u0442\u0435\u043C",
      ],
    },
    tags: ["SCADA", "Automation", "Engineering"],
  },
]

export function CareerWindow() {
  const { t, lang } = useI18n()
  const [selectedJob, setSelectedJob] = useState<string>("pt")
  const activeJob = JOBS.find((j) => j.id === selectedJob)

  return (
    <div className="flex h-full text-[11px] text-black">
      {/* Left panel - Job list (tree view style) */}
      <div className="w-[180px] shrink-0 border-r-2 border-[#808080] bg-white p-1 overflow-y-auto win95-scrollbar">
        <div className="text-[10px] font-bold text-[#808080] px-1 mb-1">
          {t("career.timeline")}
        </div>
        {JOBS.map((job) => (
          <button
            key={job.id}
            className={`w-full text-left px-2 py-1.5 flex items-start gap-1.5 cursor-pointer ${
              selectedJob === job.id
                ? "bg-[#000080] text-white"
                : "hover:bg-[#e0e0e0]"
            }`}
            onClick={() => setSelectedJob(job.id)}
          >
            <span className="text-[10px] shrink-0 mt-px">
              {selectedJob === job.id ? "[-]" : "[+]"}
            </span>
            <div>
              <div className="font-bold text-[10px] leading-tight">{job.company[lang]}</div>
              <div className={`text-[9px] ${selectedJob === job.id ? "text-[#87CEEB]" : "text-[#808080]"}`}>
                {job.period[lang]}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Right panel - Job details */}
      <div className="flex-1 p-3 overflow-y-auto win95-scrollbar">
        {activeJob && (
          <div>
            <div className="mb-3 pb-2 border-b border-[#c0c0c0]">
              <h2 className="text-[14px] font-bold text-[#000080]">
                {activeJob.company[lang]}
              </h2>
              <p className="text-[12px] font-bold">{activeJob.role[lang]}</p>
              <p className="text-[10px] text-[#808080]">{activeJob.period[lang]}</p>
            </div>

            <p className="text-[11px] mb-3 p-2 bg-[#FFFFCC] win95-inset">
              {activeJob.description[lang]}
            </p>

            <p className="font-bold text-[11px] mb-1 text-[#000080]">
              {t("career.achievements")}
            </p>
            <ul className="flex flex-col gap-1.5 mb-3">
              {activeJob.achievements[lang].map((a, i) => (
                <li key={i} className="flex items-start gap-1.5 text-[11px]">
                  <span className="text-[#008000] font-bold shrink-0">{">>"}</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1 mt-2">
              {activeJob.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-[#000080] text-white text-[9px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
