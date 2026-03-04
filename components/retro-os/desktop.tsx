"use client"

import { useState, useCallback } from "react"
import { DesktopIcon } from "./desktop-icon"
import { Window } from "./window"
import { Taskbar } from "./taskbar"
import {
  UserIcon,
  BriefcaseIcon,
  ChipIcon,
  MailIcon,
  NotepadIcon,
  TerminalIcon,
} from "./icons"
import { AboutWindow } from "./windows/about-window"
import { CareerWindow } from "./windows/career-window"
import { SkillsWindow } from "./windows/skills-window"
import { ContactWindow } from "./windows/contact-window"
import { EducationWindow } from "./windows/education-window"
import { TerminalWindow } from "./windows/terminal-window"

interface WindowState {
  id: string
  title: string
  isOpen: boolean
  isMinimized: boolean
  zIndex: number
  defaultPosition: { x: number; y: number }
  defaultSize: { width: number; height: number }
}

const INITIAL_WINDOWS: WindowState[] = [
  {
    id: "about",
    title: "About - Sergey Sinyakov",
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    defaultPosition: { x: 80, y: 30 },
    defaultSize: { width: 520, height: 480 },
  },
  {
    id: "career",
    title: "Career Explorer",
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    defaultPosition: { x: 120, y: 50 },
    defaultSize: { width: 620, height: 440 },
  },
  {
    id: "skills",
    title: "Skills Matrix v2.0",
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    defaultPosition: { x: 160, y: 70 },
    defaultSize: { width: 540, height: 420 },
  },
  {
    id: "education",
    title: "Education & Certificates",
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    defaultPosition: { x: 200, y: 40 },
    defaultSize: { width: 460, height: 440 },
  },
  {
    id: "contact",
    title: "Contact - Outlook Express",
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    defaultPosition: { x: 240, y: 60 },
    defaultSize: { width: 440, height: 460 },
  },
  {
    id: "terminal",
    title: "Command Prompt",
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    defaultPosition: { x: 100, y: 80 },
    defaultSize: { width: 520, height: 340 },
  },
]

const DESKTOP_ICONS = [
  { id: "about", label: "About Me", icon: <UserIcon /> },
  { id: "career", label: "Career", icon: <BriefcaseIcon /> },
  { id: "skills", label: "Skills", icon: <ChipIcon /> },
  { id: "education", label: "Education", icon: <NotepadIcon /> },
  { id: "contact", label: "Contact", icon: <MailIcon /> },
  { id: "terminal", label: "Terminal", icon: <TerminalIcon /> },
]

function getWindowContent(id: string) {
  switch (id) {
    case "about":
      return <AboutWindow />
    case "career":
      return <CareerWindow />
    case "skills":
      return <SkillsWindow />
    case "contact":
      return <ContactWindow />
    case "education":
      return <EducationWindow />
    case "terminal":
      return <TerminalWindow />
    default:
      return null
  }
}

function getWindowIcon(id: string) {
  switch (id) {
    case "about":
      return <UserIcon size={14} />
    case "career":
      return <BriefcaseIcon size={14} />
    case "skills":
      return <ChipIcon size={14} />
    case "contact":
      return <MailIcon size={14} />
    case "education":
      return <NotepadIcon size={14} />
    case "terminal":
      return <TerminalIcon size={14} />
    default:
      return null
  }
}

export function Desktop() {
  const [windows, setWindows] = useState<WindowState[]>(INITIAL_WINDOWS)
  const [maxZ, setMaxZ] = useState(10)
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null)

  const openWindow = useCallback(
    (id: string) => {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id
            ? { ...w, isOpen: true, isMinimized: false, zIndex: maxZ + 1 }
            : w
        )
      )
      setMaxZ((z) => z + 1)
      setActiveWindowId(id)
    },
    [maxZ]
  )

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, isOpen: false, isMinimized: false } : w
      )
    )
    setActiveWindowId(null)
  }, [])

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    )
    setActiveWindowId(null)
  }, [])

  const focusWindow = useCallback(
    (id: string) => {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id ? { ...w, zIndex: maxZ + 1 } : w
        )
      )
      setMaxZ((z) => z + 1)
      setActiveWindowId(id)
    },
    [maxZ]
  )

  const handleTaskbarClick = useCallback(
    (id: string) => {
      const win = windows.find((w) => w.id === id)
      if (!win) return

      if (win.isMinimized) {
        setWindows((prev) =>
          prev.map((w) =>
            w.id === id
              ? { ...w, isMinimized: false, zIndex: maxZ + 1 }
              : w
          )
        )
        setMaxZ((z) => z + 1)
        setActiveWindowId(id)
      } else if (activeWindowId === id) {
        minimizeWindow(id)
      } else {
        focusWindow(id)
      }
    },
    [windows, maxZ, activeWindowId, minimizeWindow, focusWindow]
  )

  const openWindows = windows.filter((w) => w.isOpen)

  return (
    <div
      className="fixed inset-0 crt-effect"
      style={{ background: "var(--win-desktop)" }}
    >
      {/* Desktop Icons */}
      <div className="absolute top-3 left-3 flex flex-col gap-1" style={{ zIndex: 0 }}>
        {DESKTOP_ICONS.map((icon) => (
          <DesktopIcon
            key={icon.id}
            label={icon.label}
            icon={icon.icon}
            onDoubleClick={() => openWindow(icon.id)}
          />
        ))}
      </div>

      {/* Watermark */}
      <div className="absolute bottom-12 right-4 text-white/20 text-[11px] select-none" style={{ zIndex: 0 }}>
        ProductOS 95 Build 2025.03
      </div>

      {/* Windows */}
      {windows.map((win) =>
        win.isOpen ? (
          <Window
            key={win.id}
            id={win.id}
            title={win.title}
            icon={getWindowIcon(win.id)}
            defaultPosition={win.defaultPosition}
            defaultSize={win.defaultSize}
            isActive={activeWindowId === win.id}
            isMinimized={win.isMinimized}
            onFocus={() => focusWindow(win.id)}
            onClose={() => closeWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
            zIndex={win.zIndex}
          >
            {getWindowContent(win.id)}
          </Window>
        ) : null
      )}

      {/* Taskbar */}
      <Taskbar
        openWindows={openWindows.map((w) => ({
          id: w.id,
          title: w.title,
          isActive: activeWindowId === w.id,
          isMinimized: w.isMinimized,
        }))}
        onWindowClick={handleTaskbarClick}
        onStartMenuOpen={openWindow}
      />
    </div>
  )
}
