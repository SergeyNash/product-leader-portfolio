"use client"

import { UserIcon, StarIcon } from "../icons"
import { useI18n } from "../i18n"

const COMPETENCIES_EN = [
  { label: "Product Leadership", desc: "Portfolio management, OKR/strategy, Roadmap, P&L, Board-level reporting" },
  { label: "Market Intelligence", desc: "JTBD, CustDev, Continuous Discovery, Strategic Accounts" },
  { label: "B2C / B2B2C", desc: "CJM optimization, LTV, ARPU, Conversion, A/B tests, UX research" },
  { label: "Team Management", desc: "Agile/SAFe, 7-10 cross-functional teams, hiring & developing leads" },
  { label: "Technical Depth", desc: "Enterprise architecture, System Design, LLM (Prompt engineering, MCP, Vibe coding)" },
]

const COMPETENCIES_RU = [
  { label: "Product Leadership", desc: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043F\u043E\u0440\u0442\u0444\u0435\u043B\u0435\u043C \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432, OKR/\u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044F, Roadmap, P&L, \u0440\u0430\u0431\u043E\u0442\u0430 \u0441 \u0441\u043E\u0432\u0435\u0442\u0430\u043C\u0438 \u0434\u0438\u0440\u0435\u043A\u0442\u043E\u0440\u043E\u0432" },
  { label: "Market Intelligence", desc: "JTBD, CustDev, Continuous Discovery, \u0440\u0430\u0431\u043E\u0442\u0430 \u0441 \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u043C\u0438 \u043A\u043B\u0438\u0435\u043D\u0442\u0430\u043C\u0438 (Strategic CIS)" },
  { label: "B2C / B2B2C", desc: "\u0423\u043B\u0443\u0447\u0448\u0435\u043D\u0438\u0435 CJM, LTV, ARPU, \u043A\u043E\u043D\u0432\u0435\u0440\u0441\u0438\u0438, A/B-\u0442\u0435\u0441\u0442\u044B, UX-\u0438\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u044F" },
  { label: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435", desc: "Agile/SAFe, \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0446\u0438\u044F 7\u201310 \u043A\u0440\u043E\u0441\u0441-\u0444\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u043A\u043E\u043C\u0430\u043D\u0434, \u043D\u0430\u0439\u043C \u0438 \u0440\u0430\u0437\u0432\u0438\u0442\u0438\u0435 \u043B\u0438\u0434\u043E\u0432" },
  { label: "\u0422\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0441\u0442\u0435\u043A", desc: "Enterprise-\u0430\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u0430, System Design, LLM (Prompt engineering, MCP, Vibe coding)" },
]

export function AboutWindow() {
  const { t, lang } = useI18n()
  const competencies = lang === "ru" ? COMPETENCIES_RU : COMPETENCIES_EN

  const summary = lang === "ru"
    ? "\u041F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432\u044B\u0439 \u043B\u0438\u0434\u0435\u0440 \u0441 18-\u043B\u0435\u0442\u043D\u0438\u043C \u043E\u043F\u044B\u0442\u043E\u043C \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F B2B/Enterprise-\u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C \u0438 \u0433\u0438\u0431\u0440\u0438\u0434\u043D\u044B\u0445 B2B2C-\u0440\u0435\u0448\u0435\u043D\u0438\u0439 \u0432 \u043A\u0438\u0431\u0435\u0440\u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438, \u0444\u0438\u043D\u0442\u0435\u0445\u0435 (\u0441\u0442\u0440\u0430\u0445\u043E\u0432\u0430\u043D\u0438\u0435) \u0438 \u043F\u0440\u043E\u043C\u044B\u0448\u043B\u0435\u043D\u043D\u043E\u0439 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u0438. \u0421\u043E\u0447\u0435\u0442\u0430\u044E \u0438\u043D\u0436\u0435\u043D\u0435\u0440\u043D\u0443\u044E \u0433\u043B\u0443\u0431\u0438\u043D\u0443 (\u0430\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u0430, system design) \u0441 \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435\u043C P&L \u0438 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432\u044B\u043C\u0438 \u043C\u0435\u0442\u0440\u0438\u043A\u0430\u043C\u0438. \u0421\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u0443\u044E\u0441\u044C \u043D\u0430 \u0432\u044B\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u043D\u0438\u0438 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u043E\u0432 \u043E\u0442 Customer Discovery \u0434\u043E GTM \u0432 \u0441\u043B\u043E\u0436\u043D\u044B\u0445 \u0440\u0435\u0433\u0443\u043B\u0438\u0440\u0443\u0435\u043C\u044B\u0445 \u043E\u0442\u0440\u0430\u0441\u043B\u044F\u0445. \u0410\u043A\u0442\u0438\u0432\u043D\u043E \u0432\u043D\u0435\u0434\u0440\u044F\u044E AI-\u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B (LLM) \u0434\u043B\u044F \u0443\u0441\u043A\u043E\u0440\u0435\u043D\u0438\u044F \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0438, \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u0438 \u0433\u0438\u043F\u043E\u0442\u0435\u0437 \u0438 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u0438 \u0440\u0443\u0442\u0438\u043D\u044B \u043A\u043E\u043C\u0430\u043D\u0434."
    : "Product leader with 18 years of experience building B2B/Enterprise platforms and hybrid B2B2C solutions in cybersecurity, fintech (insurance), and industrial automation. Combines engineering depth (architecture, system design) with P&L management and product metrics. Specializes in building processes from Customer Discovery to GTM in complex regulated industries. Actively implements AI tools (LLM) to accelerate analytics, hypothesis generation, and team routine automation."

  return (
    <div className="p-6 text-[18px] leading-relaxed text-black">
      {/* Header */}
      <div className="flex items-start gap-6 mb-6 pb-4 border-b-2 border-[#808080]">
        <div className="w-24 h-24 flex items-center justify-center bg-[#008080] win95-inset p-1.5 shrink-0">
          <UserIcon size={72} />
        </div>
        <div>
          <h1 className="text-[27px] font-bold text-[#000080]">{t("about.name")}</h1>
          <p className="text-[20px] font-bold">{t("about.title")}</p>
          <p className="text-[16px] text-[#808080]">{t("about.location")}</p>
          <p className="text-[16px] text-[#808080]">{t("about.english")}</p>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6 p-4 bg-[#FFFFCC] win95-inset">
        <p className="font-bold text-[16px] mb-1.5 text-[#000080]">{t("about.sysinfo")}</p>
        <p className="text-[16px] leading-relaxed">{summary}</p>
      </div>

      {/* Competencies */}
      <div>
        <p className="font-bold text-[18px] mb-3 text-[#000080]">
          {t("about.competencies")}
        </p>
        <div className="flex flex-col gap-3">
          {competencies.map((comp) => (
            <div key={comp.label} className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0">
                <StarIcon size={18} />
              </div>
              <div>
                <span className="font-bold text-[16px]">{comp.label}: </span>
                <span className="text-[16px] text-[#404040]">{comp.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fun stats */}
      <div className="mt-6 pt-4 border-t-2 border-[#808080]">
        <p className="text-[15px] text-[#808080]">
          {t("about.uptime")}
        </p>
      </div>
    </div>
  )
}
