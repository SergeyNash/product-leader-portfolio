"use client"

import { useI18n } from "../i18n"

export function EducationWindow() {
  const { t } = useI18n()

  return (
    <div className="p-6 text-[16px] text-black">
      {/* Terminal Header */}
      <div className="mb-6 p-3 bg-black text-[#00ff00] font-mono">
        <p>{"C:\\Education>"} cat diplomas.txt</p>
      </div>

      {/* Education */}
      <div className="mb-6">
        <p className="font-bold text-[18px] text-[#000080] mb-3">{t("edu.title")}</p>
        <div className="win95-inset p-3 bg-white mb-3">
          <div className="flex items-start gap-3">
            <span className="shrink-0">
              <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
                <polygon points="8,1 1,6 8,11 15,6" fill="#000080" />
                <rect x="3" y="7" width="10" height="6" fill="#000080" />
                <rect x="4" y="8" width="8" height="4" fill="#4169E1" />
              </svg>
            </span>
            <div>
              <p className="font-bold">{t("edu.mei")}</p>
              <p className="text-[#808080]">{t("edu.degree")} (2009)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="mb-6">
        <p className="font-bold text-[18px] text-[#000080] mb-3">{t("edu.certs")}</p>
        {[
          { name: "ChatGPT Prompt Engineering for Developers", issuer: "OpenAI", year: "2025" },
          { name: "Build AI Apps with MCP Server", issuer: "OpenAI", year: "2025" },
          { name: "Data-driven Product Management Simulator", issuer: "Go Practice", year: "2022" },
        ].map((cert) => (
          <div key={cert.name} className="flex items-start gap-3 mb-3 p-3 bg-[#FFFFCC] win95-inset">
            <span className="text-[#FFD700] shrink-0">
              <svg width="21" height="21" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" fill="#FFD700" stroke="#B8860B" />
                <text x="7" y="10" textAnchor="middle" fill="#000" fontSize="8" fontWeight="bold">
                  {"*"}
                </text>
              </svg>
            </span>
            <div>
              <p className="font-bold text-[16px]">{cert.name}</p>
              <p className="text-[15px] text-[#808080]">{cert.issuer} / {cert.year}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Languages */}
      <div>
        <p className="font-bold text-[18px] text-[#000080] mb-3">{t("edu.languages")}</p>
        <div className="flex gap-6">
          <div className="win95-inset p-3 bg-white flex-1 text-center">
            <p className="font-bold text-[20px]">{t("edu.russian")}</p>
            <p className="text-[15px] text-[#808080]">{t("edu.native")}</p>
            <div className="flex justify-center gap-1 mt-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-4 h-4 bg-[#008000]" />
              ))}
            </div>
          </div>
          <div className="win95-inset p-3 bg-white flex-1 text-center">
            <p className="font-bold text-[20px]">{t("edu.english")}</p>
            <p className="text-[15px] text-[#808080]">{t("edu.fluent")}</p>
            <div className="flex justify-center gap-1 mt-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-4 h-4 bg-[#000080]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
