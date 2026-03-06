"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { useI18n, type Lang } from "../i18n"

const MATRIX_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#%&*$!?<>{}[]"

function randomMatrixChar() {
  return MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
}

function randomBrightness(): string {
  const r = Math.random()
  if (r > 0.95) return "#ffffff"
  if (r > 0.6) return "#00ff00"
  if (r > 0.3) return "#00aa00"
  return "#004400"
}

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

  // --- Easter eggs (not listed in help) ---
  "sudo hire sergey": {
    en: `Checking credentials...
Verifying 18 years of experience... OK
Validating B2B/Enterprise expertise... OK
Confirming LLM integration skills... OK
Running reference checks... OK

ACCESS GRANTED.
Welcome to the team, Sergey.
Please report to your new office Monday 9:00 AM.
(This terminal cannot actually hire anyone. Use Contact.)`,
    ru: `\u041f\u0440\u043e\u0432\u0435\u0440\u043a\u0430 \u0443\u0447\u0451\u0442\u043d\u044b\u0445 \u0434\u0430\u043d\u043d\u044b\u0445...
\u041f\u0440\u043e\u0432\u0435\u0440\u043a\u0430 18 \u043b\u0435\u0442 \u043e\u043f\u044b\u0442\u0430... OK
\u041f\u0440\u043e\u0432\u0435\u0440\u043a\u0430 B2B/Enterprise \u044d\u043a\u0441\u043f\u0435\u0440\u0442\u0438\u0437\u044b... OK
\u041f\u0440\u043e\u0432\u0435\u0440\u043a\u0430 \u043d\u0430\u0432\u044b\u043a\u043e\u0432 LLM \u0438\u043d\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u0438... OK
\u041f\u0440\u043e\u0432\u0435\u0440\u043a\u0430 \u0440\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0430\u0446\u0438\u0439... OK

\u0414\u041e\u0421\u0422\u0423\u041f \u0420\u0410\u0417\u0420\u0415\u0428\u0401\u041d.
\u0421\u0435\u0440\u0433\u0435\u0439, \u0434\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c \u0432 \u043a\u043e\u043c\u0430\u043d\u0434\u0443.
\u041f\u0440\u043e\u0441\u044c\u0431\u0430 \u043f\u0440\u0438\u0439\u0442\u0438 \u0432 \u043f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a \u043a 9:00.
(\u042d\u0442\u043e\u0442 \u0442\u0435\u0440\u043c\u0438\u043d\u0430\u043b \u043d\u0435 \u043c\u043e\u0436\u0435\u0442 \u043d\u0438\u043a\u043e\u0433\u043e \u043d\u0430\u043d\u044f\u0442\u044c. \u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435 Contact.)`,
  },
  "ping stakeholder": {
    en: `Pinging stakeholder [192.168.1.42] with 32 bytes of data:
Request timeout for host stakeholder.
Request timeout for host stakeholder.
Request timeout for host stakeholder.
Request timeout for host stakeholder.

Ping statistics:
  Packets: Sent = 4, Received = 0, Lost = 4 (100% loss)

Suggestion: Try scheduling a meeting.
Then another meeting about that meeting.`,
    ru: `\u041f\u0438\u043d\u0433 stakeholder [192.168.1.42] 32 \u0431\u0430\u0439\u0442\u0430\u043c\u0438 \u0434\u0430\u043d\u043d\u044b\u0445:
\u0418\u0441\u0442\u0435\u0447\u0435\u043d\u0438\u0435 \u0432\u0440\u0435\u043c\u0435\u043d\u0438 \u043e\u0436\u0438\u0434\u0430\u043d\u0438\u044f \u0434\u043b\u044f \u0443\u0437\u043b\u0430 stakeholder.
\u0418\u0441\u0442\u0435\u0447\u0435\u043d\u0438\u0435 \u0432\u0440\u0435\u043c\u0435\u043d\u0438 \u043e\u0436\u0438\u0434\u0430\u043d\u0438\u044f \u0434\u043b\u044f \u0443\u0437\u043b\u0430 stakeholder.
\u0418\u0441\u0442\u0435\u0447\u0435\u043d\u0438\u0435 \u0432\u0440\u0435\u043c\u0435\u043d\u0438 \u043e\u0436\u0438\u0434\u0430\u043d\u0438\u044f \u0434\u043b\u044f \u0443\u0437\u043b\u0430 stakeholder.
\u0418\u0441\u0442\u0435\u0447\u0435\u043d\u0438\u0435 \u0432\u0440\u0435\u043c\u0435\u043d\u0438 \u043e\u0436\u0438\u0434\u0430\u043d\u0438\u044f \u0434\u043b\u044f \u0443\u0437\u043b\u0430 stakeholder.

\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043a\u0430 \u043f\u0438\u043d\u0433\u0430:
  \u041e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043e: 4, \u041f\u043e\u043b\u0443\u0447\u0435\u043d\u043e: 0, \u041f\u043e\u0442\u0435\u0440\u044f\u043d\u043e: 4 (100%)

\u0421\u043e\u0432\u0435\u0442: \u041d\u0430\u0437\u043d\u0430\u0447\u044c\u0442\u0435 \u0432\u0441\u0442\u0440\u0435\u0447\u0443.
\u0417\u0430\u0442\u0435\u043c \u0435\u0449\u0451 \u043e\u0434\u043d\u0443 \u0432\u0441\u0442\u0440\u0435\u0447\u0443 \u043e \u0442\u043e\u043c, \u043a\u0430\u043a \u043f\u0440\u043e\u0432\u0435\u0441\u0442\u0438 \u043f\u0435\u0440\u0432\u0443\u044e \u0432\u0441\u0442\u0440\u0435\u0447\u0443.`,
  },
  "rm -rf /": {
    en: `rm: cannot remove '/': Permission denied.
You don't have enough political capital to delete the entire system.
Try 'rm -rf /backlog' instead.`,
    ru: `rm: \u043d\u0435\u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u0443\u0434\u0430\u043b\u0438\u0442\u044c '/': \u041e\u0442\u043a\u0430\u0437\u0430\u043d\u043e \u0432 \u0434\u043e\u0441\u0442\u0443\u043f\u0435.
\u0423 \u0432\u0430\u0441 \u043d\u0435\u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u043f\u043e\u043b\u0438\u0442\u0438\u0447\u0435\u0441\u043a\u043e\u0433\u043e \u043a\u0430\u043f\u0438\u0442\u0430\u043b\u0430 \u0434\u043b\u044f \u0443\u0434\u0430\u043b\u0435\u043d\u0438\u044f \u0432\u0441\u0435\u0439 \u0441\u0438\u0441\u0442\u0435\u043c\u044b.
\u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 'rm -rf /backlog'.`,
  },
  "git blame": {
    en: `Blame assigned to:
  product_requirements.doc    (last modified: never)
  stakeholder_verbal_agreement.txt  (untracked)
  sprint_scope_creep.exe      (running in background)

No commits found. The feature was 'discussed'.`,
    ru: `\u041e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0441\u0442\u044c \u043d\u0430\u0437\u043d\u0430\u0447\u0435\u043d\u0430:
  product_requirements.doc          (\u043f\u043e\u0441\u043b\u0435\u0434\u043d\u0435\u0435 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u0435: \u043d\u0438\u043a\u043e\u0433\u0434\u0430)
  stakeholder_verbal_agreement.txt  (untracked)
  sprint_scope_creep.exe            (\u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0442 \u0432 \u0444\u043e\u043d\u0435)

\u041a\u043e\u043c\u043c\u0438\u0442\u043e\u0432 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e. \u0424\u0438\u0447\u0430 \u0431\u044b\u043b\u0430 '\u043e\u0431\u0441\u0443\u0436\u0434\u0435\u043d\u0430'.`,
  },
}

const CHAR_W = 10
const CHAR_H = 20

export function TerminalWindow() {
  const { t, lang } = useI18n()
  const [lines, setLines] = useState<{ text: string; isCommand: boolean }[]>([
    { text: "", isCommand: false },
  ])
  const [input, setInput] = useState("")
  const [initialized, setInitialized] = useState(false)
  const [matrixMode, setMatrixMode] = useState(false)
  const [matrixGrid, setMatrixGrid] = useState<{ ch: string; color: string }[][]>([])
  const containerRef = useRef<HTMLDivElement>(null)
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

  // Matrix animation
  useEffect(() => {
    if (!matrixMode) return

    const el = containerRef.current
    if (!el) return

    const cols = Math.floor(el.clientWidth / CHAR_W)
    const rows = Math.floor((el.clientHeight - 40) / CHAR_H)

    const buildGrid = () =>
      Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({
          ch: randomMatrixChar(),
          color: randomBrightness(),
        }))
      )

    setMatrixGrid(buildGrid())

    const id = setInterval(() => {
      setMatrixGrid(buildGrid())
    }, 80)

    return () => clearInterval(id)
  }, [matrixMode])

  const exitMatrix = useCallback(() => {
    setMatrixMode(false)
    setLines((prev) => [
      ...prev,
      { text: "Exiting simulation...", isCommand: false },
      { text: "", isCommand: false },
    ])
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [])

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

    if (trimmed === "matrix") {
      newLines.push({ text: "Entering the Matrix...", isCommand: false })
      setLines(newLines)
      setInput("")
      setTimeout(() => setMatrixMode(true), 300)
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

  if (matrixMode) {
    return (
      <div
        ref={containerRef}
        className="h-full bg-black font-mono overflow-hidden cursor-pointer select-none"
        style={{ fontSize: "13px", lineHeight: `${CHAR_H}px` }}
        onClick={exitMatrix}
        onKeyDown={exitMatrix}
        tabIndex={0}
        autoFocus
      >
        {matrixGrid.map((row, r) => (
          <div key={r} className="flex whitespace-pre">
            {row.map((cell, c) => (
              <span key={c} style={{ color: cell.color, width: `${CHAR_W}px`, display: "inline-block" }}>
                {cell.ch}
              </span>
            ))}
          </div>
        ))}
        <div
          className="text-center mt-2"
          style={{ color: "#00ff00", animation: "blink 1s step-end infinite" }}
        >
          [ Press any key or click to exit ]
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
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
