"use client"

import { useI18n } from "../i18n"

export function EducationWindow() {
  const { t } = useI18n()

  return (
    <div className="p-4 text-[11px] text-black">
      {/* Terminal Header */}
      <div className="mb-4 p-2 bg-black text-[#00ff00] font-mono">
        <p>{"C:\\Education>"} cat diplomas.txt</p>
      </div>

      {/* Education */}
      <div className="mb-4">
        <p className="font-bold text-[12px] text-[#000080] mb-2">{t("edu.title")}</p>
        <div className="win95-inset p-2 bg-white mb-2">
          <div className="flex items-start gap-2">
            <span className="text-[16px]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
      <div className="mb-4">
        <p className="font-bold text-[12px] text-[#000080] mb-2">{t("edu.certs")}</p>
        {[
          { name: "ChatGPT Prompt Engineering for Developers", issuer: "OpenAI", year: "2025" },
          { name: "Build AI Apps with MCP Server", issuer: "OpenAI", year: "2025" },
          { name: "Data-driven Product Management Simulator", issuer: "Go Practice", year: "2022" },
        ].map((cert) => (
          <div key={cert.name} className="flex items-start gap-2 mb-2 p-2 bg-[#FFFFCC] win95-inset">
            <span className="text-[#FFD700] shrink-0">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" fill="#FFD700" stroke="#B8860B" />
                <text x="7" y="10" textAnchor="middle" fill="#000" fontSize="8" fontWeight="bold">
                  {"*"}
                </text>
              </svg>
            </span>
            <div>
              <p className="font-bold text-[11px]">{cert.name}</p>
              <p className="text-[10px] text-[#808080]">{cert.issuer} / {cert.year}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Languages */}
      <div>
        <p className="font-bold text-[12px] text-[#000080] mb-2">{t("edu.languages")}</p>
        <div className="flex gap-4">
          <div className="win95-inset p-2 bg-white flex-1 text-center">
            <p className="font-bold text-[13px]">{t("edu.russian")}</p>
            <p className="text-[10px] text-[#808080]">{t("edu.native")}</p>
            <div className="flex justify-center gap-0.5 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-2.5 h-2.5 bg-[#008000]" />
              ))}
            </div>
          </div>
          <div className="win95-inset p-2 bg-white flex-1 text-center">
            <p className="font-bold text-[13px]">{t("edu.english")}</p>
            <p className="text-[10px] text-[#808080]">{t("edu.fluent")}</p>
            <div className="flex justify-center gap-0.5 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-2.5 h-2.5 bg-[#000080]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
