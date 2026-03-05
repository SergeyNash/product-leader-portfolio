"use client"

import type { ReactNode } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

interface DesktopIconProps {
  label: string
  icon: ReactNode
  onDoubleClick: () => void
}

export function DesktopIcon({ label, icon, onDoubleClick }: DesktopIconProps) {
  const isMobile = useIsMobile()

  return (
    <button
      className="desktop-icon flex flex-col items-center gap-1 p-1.5 w-[76px] focus:outline-none group"
      onClick={isMobile ? onDoubleClick : undefined}
      onDoubleClick={!isMobile ? onDoubleClick : undefined}
      tabIndex={0}
    >
      <div className="w-8 h-8 flex items-center justify-center">
        {icon}
      </div>
      <span className="icon-label icon-text-shadow text-[11px] text-white text-center leading-tight px-0.5 break-words">
        {label}
      </span>
    </button>
  )
}
