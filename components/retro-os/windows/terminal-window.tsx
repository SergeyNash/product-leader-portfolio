"use client"

import { useState, useRef, useEffect } from "react"
import { useI18n, type Lang } from "../i18n"

const COMMANDS: Record<string, Record<Lang, string>> = {
  help: {
    en: `Available commands:
  help      - Show this help message
  about     - About Sergey Sinyakov
  skills    - List key skills
  career    - Career summary
  contact   - Contact information
  cls       - Clear screen
  exit      - Close terminal
  whoami    - Current user info
  ver       - System version`,
    ru: `\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0435 \u043A\u043E\u043C\u0430\u043D\u0434\u044B:
  help      - \u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0441\u043F\u0440\u0430\u0432\u043A\u0443
  about     - \u041E \u0421\u0435\u0440\u0433\u0435\u0435 \u0421\u0438\u043D\u044F\u043A\u043E\u0432\u0435
  skills    - \u041A\u043B\u044E\u0447\u0435\u0432\u044B\u0435 \u043D\u0430\u0432\u044B\u043A\u0438
  career    - \u041A\u0430\u0440\u044C\u0435\u0440\u0430
  contact   - \u041A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F
  cls       - \u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u044D\u043A\u0440\u0430\u043D
  exit      - \u0417\u0430\u043A\u0440\u044B\u0442\u044C \u0442\u0435\u0440\u043C\u0438\u043D\u0430\u043B
  whoami    - \u0418\u043D\u0444\u043E \u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435
  ver       - \u0412\u0435\u0440\u0441\u0438\u044F \u0441\u0438\u0441\u0442\u0435\u043C\u044B`,
  },
  about: {
    en: `Sergey Sinyakov - CPO / Head of Product
Moscow, Russia | 18 years in tech

Product leader specializing in B2B/Enterprise
platforms across cybersecurity, fintech, and
industrial automation. Engineering + business.`,
    ru: `\u0421\u0435\u0440\u0433\u0435\u0439 \u0421\u0438\u043D\u044F\u043A\u043E\u0432 - CPO / Head of Product
\u041C\u043E\u0441\u043A\u0432\u0430, \u0420\u043E\u0441\u0441\u0438\u044F | 18 \u043B\u0435\u0442 \u0432 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u044F\u0445

\u041F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432\u044B\u0439 \u043B\u0438\u0434\u0435\u0440, \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F: B2B/Enterprise-
\u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u044B \u0432 \u043A\u0438\u0431\u0435\u0440\u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438, \u0444\u0438\u043D\u0442\u0435\u0445\u0435 \u0438
\u043F\u0440\u043E\u043C\u044B\u0448\u043B\u0435\u043D\u043D\u043E\u0439 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u0438.`,
  },
  skills: {
    en: `[Strategy]  Product Strategy, OKR, P&L, GTM
[Analytics] JTBD, CustDev, A/B, LTV, ARPU
[Mgmt]      Agile, SAFe, 10+ teams, hiring
[Tech]      Architecture, LLM, MCP, SCADA`,
    ru: `[\u0421\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044F]   \u041F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432\u0430\u044F \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044F, OKR, P&L, GTM
[\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430]  JTBD, CustDev, A/B, LTV, ARPU
[\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435] Agile, SAFe, 10+ \u043A\u043E\u043C\u0430\u043D\u0434, \u043D\u0430\u0439\u043C
[\u0422\u0435\u0445]        \u0410\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u0430, LLM, MCP, \u0410\u0421\u0423 \u0422\u041F`,
  },
  career: {
    en: `2023-now  Positive Technologies - Head of AppSec Products
2021-2023 Ingosstrakh - CPO Digital Channels
2019-2021 MNPP Antraks - Head of Dev / PO
2007-2019 Engineering & Management Roles`,
    ru: `2023-\u043D.\u0432.  Positive Technologies - \u0420\u0443\u043A. \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432 AppSec
2021-2023 \u0418\u043D\u0433\u043E\u0441\u0441\u0442\u0440\u0430\u0445 - CPO \u0446\u0438\u0444\u0440\u043E\u0432\u044B\u0445 \u043A\u0430\u043D\u0430\u043B\u043E\u0432
2019-2021 \u041C\u041D\u041F\u041F \u0410\u043D\u0442\u0440\u0430\u043A\u0441 - \u0420\u0443\u043A. \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0438 / PO
2007-2019 \u0418\u043D\u0436\u0435\u043D\u0435\u0440\u043D\u044B\u0435 \u0438 \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0447\u0435\u0441\u043A\u0438\u0435 \u0440\u043E\u043B\u0438`,
  },
  contact: {
    en: `Telegram:  @sergeysinyakov
LinkedIn:  linkedin.com/in/sergeysinyakov
Email:     contact@sinyakov.pro`,
    ru: `Telegram:  @sergeysinyakov
LinkedIn:  linkedin.com/in/sergeysinyakov
Email:     contact@sinyakov.pro`,
  },
  whoami: {
    en: `C:\\Users\\Recruiter
Access Level: Visitor
Session: Active`,
    ru: `C:\\Users\\\u0420\u0435\u043A\u0440\u0443\u0442\u0435\u0440
\u0423\u0440\u043E\u0432\u0435\u043D\u044C \u0434\u043E\u0441\u0442\u0443\u043F\u0430: \u041F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u044C
\u0421\u0435\u0441\u0441\u0438\u044F: \u0410\u043A\u0442\u0438\u0432\u043D\u0430`,
  },
  ver: {
    en: `ProductOS 95 [Version 2.0.2025]
(c) Sinyakov Systems Corporation.`,
    ru: `ProductOS 95 [\u0412\u0435\u0440\u0441\u0438\u044F 2.0.2025]
(c) Sinyakov Systems Corporation.`,
  },
}

export function TerminalWindow() {
  const { t, lang } = useI18n()
  const [lines, setLines] = useState<{ text: string; isCommand: boolean }[]>([
    { text: "", isCommand: false },
  ])
  const [input, setInput] = useState("")
  const [initialized, setInitialized] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!initialized) {
      setLines([
        { text: t("term.header"), isCommand: false },
        { text: t("term.hint"), isCommand: false },
        { text: "", isCommand: false },
      ])
      setInitialized(true)
    }
  }, [initialized, t])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [lines])

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    const newLines = [...lines, { text: `C:\\> ${cmd}`, isCommand: true }]

    if (trimmed === "cls") {
      setLines([])
      setInput("")
      return
    }

    if (trimmed === "exit") {
      newLines.push({ text: t("term.bye"), isCommand: false })
      setLines(newLines)
      setInput("")
      return
    }

    const response = COMMANDS[trimmed]
    if (response) {
      response[lang].split("\n").forEach((line) => {
        newLines.push({ text: line, isCommand: false })
      })
    } else if (trimmed) {
      newLines.push({
        text: `'${trimmed}' ${t("term.notfound")}`,
        isCommand: false,
      })
    }
    newLines.push({ text: "", isCommand: false })
    setLines(newLines)
    setInput("")
  }

  return (
    <div
      className="h-full bg-black text-[#c0c0c0] font-mono p-3 text-[16px] overflow-y-auto cursor-text win95-scrollbar"
      onClick={() => inputRef.current?.focus()}
    >
      {lines.map((line, i) => (
        <div
          key={i}
          className={`whitespace-pre-wrap ${line.isCommand ? "text-white" : "text-[#c0c0c0]"}`}
        >
          {line.text || "\u00A0"}
        </div>
      ))}
      <div className="flex items-center">
        <span className="text-white mr-1.5">{"C:\\>"}</span>
        <input
          ref={inputRef}
          type="text"
          className="flex-1 bg-transparent border-none outline-none text-white text-[16px] font-mono caret-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleCommand(input)
          }}
          autoFocus
          spellCheck={false}
          aria-label="Terminal input"
        />
      </div>
      <div ref={bottomRef} />
    </div>
  )
}
