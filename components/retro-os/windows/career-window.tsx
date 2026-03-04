"use client"

import { useState } from "react"

interface Job {
  id: string
  company: string
  role: string
  period: string
  description: string
  achievements: string[]
  tags: string[]
}

const JOBS: Job[] = [
  {
    id: "pt",
    company: "Positive Technologies",
    role: "Head of Application Security Products",
    period: "Aug 2023 - Present",
    description: "Managing product portfolio in cybersecurity. Working with enterprise and government clients (Strategic Accounts).",
    achievements: [
      "Unlocked strategic contracts with major federal clients by identifying and closing product gaps through systematic customer interviews",
      "Built Customer Success function from scratch (QBR, proactive support, feedback collection) for retention and expansion",
      "Achieved 0 failed releases in 2025 through transparent planning, early UX validation, and cross-team sync (7-10 teams)",
      "Implemented data-driven culture with CustDev and LLM-powered interview analysis for automated PRD generation",
    ],
    tags: ["Cybersecurity", "Enterprise", "B2B", "CS", "LLM"],
  },
  {
    id: "ingo",
    company: "Ingosstrakh",
    role: "Product Owner / CPO of Digital Channels",
    period: "Dec 2021 - Aug 2023",
    description: "CPO for website and online sales channels. Digital transformation of insurance company. Managing 6 cross-functional teams.",
    achievements: [
      "Led complete website redesign: growth in MAU, average check, online revenue, and time-to-market acceleration",
      "Life Insurance: Calculator launch (30K MAU) drove +25% revenue growth and conversion increase",
      "Travel: Funnel optimization reduced loss ratio by 10%, increased payment conversion by 12%",
      "Auth: Gosuslugi + phone login boosted onboarding conversion by 50%",
      "Implemented SAFe and SCRUM across 6 teams for predictable quarterly releases",
    ],
    tags: ["Fintech", "Insurance", "B2C", "B2B2C", "SAFe"],
  },
  {
    id: "antrax",
    company: 'MNPP "Antraks"',
    role: "Head of Software Development / Product Owner",
    period: "Oct 2019 - Dec 2021",
    description: "Full product development cycle for energy sector (B2B, Industrial IoT).",
    achievements: [
      "Core product (Power Line Monitoring): +50% user base growth and 2x system efficiency through predictive diagnostics & FLISR",
      "Integrated platform with DJI drones for visual inspection of power transmission lines",
      "Introduced Story Mapping, CustDev, and UX research. Grew dev team from 0 to 8+ engineers",
    ],
    tags: ["Industrial IoT", "Energy", "B2B", "Drones"],
  },
  {
    id: "prev",
    company: "Earlier Career",
    role: "Engineering & Management Roles",
    period: "2007 - 2019",
    description: "Technical foundation across industrial automation, software development, and engineering.",
    achievements: [
      "Impeks Elektro: Lead SCADA/ICS specialist - project management, specs writing, negotiations",
      "SST Energomontazh / TransMashHolding: Engineering positions in industrial automation",
      "NII DAR: Software development for metro systems and radar",
    ],
    tags: ["SCADA", "Automation", "Engineering"],
  },
]

export function CareerWindow() {
  const [selectedJob, setSelectedJob] = useState<string>("pt")
  const activeJob = JOBS.find((j) => j.id === selectedJob)

  return (
    <div className="flex h-full text-[11px] text-black">
      {/* Left panel - Job list (tree view style) */}
      <div className="w-[180px] shrink-0 border-r-2 border-[#808080] bg-white p-1 overflow-y-auto win95-scrollbar">
        <div className="text-[10px] font-bold text-[#808080] px-1 mb-1">
          Career Timeline:
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
              <div className="font-bold text-[10px] leading-tight">{job.company}</div>
              <div className={`text-[9px] ${selectedJob === job.id ? "text-[#87CEEB]" : "text-[#808080]"}`}>
                {job.period}
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
                {activeJob.company}
              </h2>
              <p className="text-[12px] font-bold">{activeJob.role}</p>
              <p className="text-[10px] text-[#808080]">{activeJob.period}</p>
            </div>

            <p className="text-[11px] mb-3 p-2 bg-[#FFFFCC] win95-inset">
              {activeJob.description}
            </p>

            <p className="font-bold text-[11px] mb-1 text-[#000080]">
              Key Achievements:
            </p>
            <ul className="flex flex-col gap-1.5 mb-3">
              {activeJob.achievements.map((a, i) => (
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
