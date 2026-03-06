"use client"

import { useState, useCallback } from "react"
import { useI18n } from "./i18n"
import { useIsMobile } from "@/hooks/use-mobile"
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
  RecycleBinIcon,
} from "./icons"
import { AboutWindow } from "./windows/about-window"
import { CareerWindow } from "./windows/career-window"
import { SkillsWindow } from "./windows/skills-window"
import { ContactWindow } from "./windows/contact-window"
import { EducationWindow } from "./windows/education-window"
import { TerminalWindow } from "./windows/terminal-window"
import { RecycleBinWindow } from "./windows/recycle-bin-window"

interface WindowState {
  id: string
  titleKey: string
  isOpen: boolean
  isMinimized: boolean
  zIndex: number
  defaultPosition: { x: number; y: number }
  defaultSize: { width: number; height: number }
}

const INITIAL_WINDOWS: WindowState[] = [
  {
    id: "about",
    titleKey: "win.about",
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    defaultPosition: { x: 80, y: 30 },
    defaultSize: { width: 780, height: 720 },
  },
  {
    id: "career",
    titleKey: "win.career",
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    defaultPosition: { x: 120, y: 50 },
    defaultSize: { width: 930, height: 660 },
  },
  {
    id: "skills",
    titleKey: "win.skills",
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    defaultPosition: { x: 160, y: 70 },
    defaultSize: { width: 810, height: 630 },
  },
  {
    id: "education",
    titleKey: "win.education",
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    defaultPosition: { x: 200, y: 40 },
    defaultSize: { width: 690, height: 660 },
  },
  {
    id: "contact",
    titleKey: "win.contact",
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    defaultPosition: { x: 240, y: 60 },
    defaultSize: { width: 660, height: 690 },
  },
  {
    id: "terminal",
    titleKey: "win.terminal",
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    defaultPosition: { x: 100, y: 80 },
    defaultSize: { width: 780, height: 510 },
  },
  {
    id: "recycle",
    titleKey: "win.recycle",
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    defaultPosition: { x: 300, y: 80 },
    defaultSize: { width: 660, height: 420 },
  },
]

const ICON_KEYS = [
  { id: "about", labelKey: "icon.about", icon: <UserIcon /> },
  { id: "career", labelKey: "icon.career", icon: <BriefcaseIcon /> },
  { id: "skills", labelKey: "icon.skills", icon: <ChipIcon /> },
  { id: "education", labelKey: "icon.education", icon: <NotepadIcon /> },
  { id: "contact", labelKey: "icon.contact", icon: <MailIcon /> },
  { id: "terminal", labelKey: "icon.terminal", icon: <TerminalIcon /> },
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
    case "recycle":
      return <RecycleBinWindow />
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
    case "recycle":
      return <RecycleBinIcon size={14} />
    default:
      return null
  }
}

export function Desktop() {
  const { t, lang, toggleLang } = useI18n()
  const isMobile = useIsMobile()
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
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

  return (
    <div
      className="fixed inset-0 crt-effect"
      style={{ background: "var(--win-desktop)" }}
    >
      {/* Desktop Character — hidden on mobile */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {!isMobile && <img
        src={basePath + "/sergey-1.png"}
        alt=""
        className="absolute select-none pointer-events-none"
        style={{
          bottom: "38px",
          left: "50%",
          transform: "translateX(-25%)",
          height: "calc(100vh - 38px)",
          width: "auto",
          zIndex: 0,
        }}
      />}

      {/* Desktop Icons */}
      <div
        className={
          isMobile
            ? "absolute top-3 left-0 right-0 flex flex-wrap justify-start px-1 gap-0.5"
            : "absolute top-3 left-3 flex flex-col gap-1"
        }
        style={{ zIndex: 1 }}
      >
        {ICON_KEYS.map((icon) => (
          <DesktopIcon
            key={icon.id}
            label={t(icon.labelKey)}
            icon={icon.icon}
            onDoubleClick={() => openWindow(icon.id)}
          />
        ))}
      </div>

      {/* Recycle Bin Icon — bottom-left, above taskbar, desktop only */}
      {!isMobile && (
        <div
          className="absolute left-3"
          style={{ bottom: "46px", zIndex: 1 }}
        >
          <DesktopIcon
            label={t("icon.recycle")}
            icon={<RecycleBinIcon />}
            onDoubleClick={() => openWindow("recycle")}
          />
        </div>
      )}

      {/* Language Toggle */}
      <button
        className="win95-button absolute flex items-center gap-1.5 px-3 font-bold text-black"
        style={{
          zIndex: 1,
          top: isMobile ? "auto" : "12px",
          bottom: isMobile ? "52px" : "auto",
          right: "12px",
          height: isMobile ? "32px" : "28px",
          fontSize: isMobile ? "13px" : "12px",
        }}
        onClick={toggleLang}
        aria-label="Toggle language"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="6" stroke="#000080" strokeWidth="1.5" fill="none" />
          <ellipse cx="7" cy="7" rx="3" ry="6" stroke="#000080" strokeWidth="1" fill="none" />
          <line x1="1" y1="7" x2="13" y2="7" stroke="#000080" strokeWidth="1" />
        </svg>
        <span>{lang === "ru" ? "EN" : "RU"}</span>
      </button>

      {/* Watermark — hidden on mobile */}
      {!isMobile && (
        <div className="absolute bottom-12 right-4 text-white/20 text-[11px] select-none" style={{ zIndex: 0 }}>
          {t("watermark")}
        </div>
      )}

      {/* Windows */}
      {windows.map((win) =>
        win.isOpen ? (
          <Window
            key={win.id}
            id={win.id}
            title={t(win.titleKey)}
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
          title: t(w.titleKey),
          isActive: activeWindowId === w.id,
          isMinimized: w.isMinimized,
        }))}
        onWindowClick={handleTaskbarClick}
        onStartMenuOpen={openWindow}
      />
    </div>
  )
}
