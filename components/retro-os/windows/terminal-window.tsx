"use client"

import { useState, useRef, useEffect } from "react"

const COMMANDS: Record<string, string> = {
  help: `Available commands:
  help      - Show this help message
  about     - About Sergey Sinyakov
  skills    - List key skills
  career    - Career summary
  contact   - Contact information
  cls       - Clear screen
  exit      - Close terminal
  whoami    - Current user info
  ver       - System version`,
  about: `Sergey Sinyakov - CPO / Head of Product
Moscow, Russia | 18 years in tech

Product leader specializing in B2B/Enterprise
platforms across cybersecurity, fintech, and
industrial automation. Engineering + business.`,
  skills: `[Strategy]  Product Strategy, OKR, P&L, GTM
[Analytics] JTBD, CustDev, A/B, LTV, ARPU
[Mgmt]      Agile, SAFe, 10+ teams, hiring
[Tech]      Architecture, LLM, MCP, SCADA`,
  career: `2023-now  Positive Technologies - Head of AppSec Products
2021-2023 Ingosstrakh - CPO Digital Channels
2019-2021 MNPP Antraks - Head of Dev / PO
2007-2019 Engineering & Management Roles`,
  contact: `Telegram:  @sergeysinyakov
LinkedIn:  linkedin.com/in/sergeysinyakov
Email:     contact@sinyakov.pro`,
  whoami: `C:\\Users\\Recruiter
Access Level: Visitor
Session: Active`,
  ver: `ProductOS 95 [Version 2.0.2025]
(c) Sinyakov Systems Corporation.`,
}

export function TerminalWindow() {
  const [lines, setLines] = useState<{ text: string; isCommand: boolean }[]>([
    { text: "ProductOS 95 Command Prompt", isCommand: false },
    { text: '(c) Sinyakov Systems Corp. Type "help" for commands.', isCommand: false },
    { text: "", isCommand: false },
  ])
  const [input, setInput] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

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
      newLines.push({ text: "Goodbye! (Window stays open for demo)", isCommand: false })
      setLines(newLines)
      setInput("")
      return
    }

    const response = COMMANDS[trimmed]
    if (response) {
      response.split("\n").forEach((line) => {
        newLines.push({ text: line, isCommand: false })
      })
    } else if (trimmed) {
      newLines.push({
        text: `'${trimmed}' is not recognized. Type "help".`,
        isCommand: false,
      })
    }
    newLines.push({ text: "", isCommand: false })
    setLines(newLines)
    setInput("")
  }

  return (
    <div
      className="h-full bg-black text-[#c0c0c0] font-mono p-2 text-[11px] overflow-y-auto cursor-text win95-scrollbar"
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
        <span className="text-white mr-1">{"C:\\>"}</span>
        <input
          ref={inputRef}
          type="text"
          className="flex-1 bg-transparent border-none outline-none text-white text-[11px] font-mono caret-white"
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
