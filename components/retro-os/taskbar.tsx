"use client"

import { useState, useEffect, useRef } from "react"
import { WindowsLogoIcon, UserIcon, BriefcaseIcon, ChipIcon, MailIcon, NotepadIcon, TerminalIcon } from "./icons"

interface TaskbarWindow {
  id: string
  title: string
  isActive: boolean
  isMinimized: boolean
}

interface TaskbarProps {
  openWindows: TaskbarWindow[]
  onWindowClick: (id: string) => void
  onStartMenuOpen: (id: string) => void
}

const START_MENU_ITEMS = [
  { id: "about", label: "About Me", icon: <UserIcon size={20} /> },
  { id: "career", label: "Career History", icon: <BriefcaseIcon size={20} /> },
  { id: "skills", label: "Skills Matrix", icon: <ChipIcon size={20} /> },
  { id: "education", label: "Education", icon: <NotepadIcon size={20} /> },
  { id: "contact", label: "Contact", icon: <MailIcon size={20} /> },
  { id: "terminal", label: "Command Prompt", icon: <TerminalIcon size={20} /> },
]

export function Taskbar({ openWindows, onWindowClick, onStartMenuOpen }: TaskbarProps) {
  const [showStart, setShowStart] = useState(false)
  const [time, setTime] = useState("")
  const startRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (startRef.current && !startRef.current.contains(e.target as Node)) {
        setShowStart(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <>
      {/* Start Menu */}
      {showStart && (
        <div
          ref={startRef}
          className="fixed bottom-[36px] left-0 win95-window z-[10000] animate-slide-up"
          style={{ width: 220 }}
        >
          {/* Side banner */}
          <div className="flex">
            <div className="w-7 bg-[#808080] flex items-end justify-center py-2 shrink-0">
              <span
                className="text-white font-bold text-[10px] writing-mode-vertical"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                ProductOS 95
              </span>
            </div>
            <div className="flex-1 bg-[#c0c0c0]">
              {START_MENU_ITEMS.map((item, i) => (
                <button
                  key={item.id}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#000080] hover:text-white text-[12px] text-left text-black"
                  onClick={() => {
                    onStartMenuOpen(item.id)
                    setShowStart(false)
                  }}
                >
                  <span className="w-5 h-5 flex items-center justify-center shrink-0">
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              ))}
              {/* Divider */}
              <div className="mx-2 my-1 border-t border-[#808080] border-b border-b-white" />
              <button
                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#000080] hover:text-white text-[12px] text-left text-black"
                onClick={() => setShowStart(false)}
              >
                <span className="w-5 h-5 flex items-center justify-center text-[14px] shrink-0">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="2" y="6" width="16" height="12" fill="#808080" />
                    <rect x="4" y="8" width="12" height="8" fill="#000" />
                    <circle cx="10" cy="4" r="3" fill="#ff0000" />
                  </svg>
                </span>
                Shut Down...
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-[36px] bg-[#c0c0c0] border-t-2 border-white flex items-center px-1 gap-1 z-[9999]">
        {/* Start Button */}
        <button
          className={`win95-button flex items-center gap-1 px-2 h-[26px] font-bold text-[12px] shrink-0 ${
            showStart ? "win95-button-pressed" : ""
          }`}
          onClick={() => setShowStart(!showStart)}
        >
          <WindowsLogoIcon size={16} />
          <span>Start</span>
        </button>

        {/* Divider */}
        <div className="w-px h-[24px] bg-[#808080] mx-0.5 shrink-0" />

        {/* Window buttons */}
        <div className="flex-1 flex gap-0.5 overflow-x-auto min-w-0">
          {openWindows.map((win) => (
            <button
              key={win.id}
              className={`flex items-center gap-1 px-2 h-[24px] text-[11px] truncate min-w-[80px] max-w-[160px] ${
                win.isActive
                  ? "win95-button-pressed bg-white font-bold"
                  : "win95-button"
              }`}
              onClick={() => onWindowClick(win.id)}
            >
              <span className="truncate">{win.title}</span>
            </button>
          ))}
        </div>

        {/* System Tray */}
        <div className="win95-inset flex items-center gap-2 px-2 h-[24px] shrink-0">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5" fill="#FFD700" />
            <circle cx="7" cy="7" r="4" fill="#FFFF00" />
          </svg>
          <span className="text-[11px] text-black">{time}</span>
        </div>
      </div>
    </>
  )
}
