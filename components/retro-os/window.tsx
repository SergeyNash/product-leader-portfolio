"use client"

import { useState, useRef, useCallback, type ReactNode, type MouseEvent } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

interface WindowProps {
  id: string
  title: string
  icon?: ReactNode
  children: ReactNode
  defaultPosition?: { x: number; y: number }
  defaultSize?: { width: number; height: number }
  isActive: boolean
  isMinimized: boolean
  onFocus: () => void
  onClose: () => void
  onMinimize: () => void
  zIndex: number
}

export function Window({
  title,
  icon,
  children,
  defaultPosition = { x: 60, y: 40 },
  defaultSize = { width: 500, height: 400 },
  isActive,
  isMinimized,
  onFocus,
  onClose,
  onMinimize,
  zIndex,
}: WindowProps) {
  const isMobile = useIsMobile()
  const [position, setPosition] = useState(defaultPosition)
  const [size] = useState(defaultSize)
  const [isMaximized, setIsMaximized] = useState(false)
  const dragRef = useRef<{ startX: number; startY: number; posX: number; posY: number } | null>(null)
  const windowRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (isMaximized || isMobile) return
      onFocus()
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        posX: position.x,
        posY: position.y,
      }

      const handleMouseMove = (e: globalThis.MouseEvent) => {
        if (!dragRef.current) return
        const dx = e.clientX - dragRef.current.startX
        const dy = e.clientY - dragRef.current.startY
        setPosition({
          x: dragRef.current.posX + dx,
          y: Math.max(0, dragRef.current.posY + dy),
        })
      }

      const handleMouseUp = () => {
        dragRef.current = null
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    },
    [position, isMaximized, isMobile, onFocus]
  )

  if (isMinimized) return null

  const taskbarH = isMobile ? 44 : 36

  const windowStyle = isMobile
    ? { top: 0, left: 0, width: "100%", height: `calc(100vh - ${taskbarH}px)`, zIndex }
    : isMaximized
    ? { top: 0, left: 0, width: "100%", height: "calc(100vh - 36px)", zIndex }
    : {
        top: position.y,
        left: position.x,
        width: Math.min(size.width, typeof window !== "undefined" ? window.innerWidth - 20 : size.width),
        height: size.height,
        zIndex,
      }

  return (
    <div
      ref={windowRef}
      className="win95-window fixed flex flex-col"
      style={windowStyle}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div
        className={`win95-title-bar ${!isActive ? "win95-title-bar-inactive" : ""} shrink-0 ${isMobile ? "cursor-default" : "cursor-grab active:cursor-grabbing"}`}
        onMouseDown={handleMouseDown}
      >
        {icon && <span className="mr-1.5 flex items-center">{icon}</span>}
        <span className="flex-1 truncate text-[11px] font-bold">{title}</span>
        <div className="flex gap-0.5 ml-2">
          {!isMobile && (
            <>
              <button
                className="win95-button !p-0 w-4 h-3.5 flex items-center justify-center text-[8px] leading-none"
                onClick={(e) => {
                  e.stopPropagation()
                  onMinimize()
                }}
                aria-label="Minimize"
              >
                <span className="block w-1.5 h-px bg-black mt-1" />
              </button>
              <button
                className="win95-button !p-0 w-4 h-3.5 flex items-center justify-center text-[8px] leading-none"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsMaximized(!isMaximized)
                }}
                aria-label="Maximize"
              >
                <span className="block w-2 h-2 border border-black" />
              </button>
            </>
          )}
          <button
            className={`win95-button !p-0 flex items-center justify-center leading-none font-bold ${isMobile ? "w-8 h-7 text-[12px]" : "w-4 h-3.5 text-[9px]"}`}
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            aria-label="Close"
          >
            X
          </button>
        </div>
      </div>

      {/* Menu Bar — hidden on mobile */}
      {!isMobile && (
        <div className="flex gap-3 px-2 py-0.5 text-[11px] border-b border-[#808080] bg-[#c0c0c0] shrink-0">
          <span className="hover:bg-[#000080] hover:text-white px-1 cursor-default">
            <span className="underline">F</span>ile
          </span>
          <span className="hover:bg-[#000080] hover:text-white px-1 cursor-default">
            <span className="underline">E</span>dit
          </span>
          <span className="hover:bg-[#000080] hover:text-white px-1 cursor-default">
            <span className="underline">V</span>iew
          </span>
          <span className="hover:bg-[#000080] hover:text-white px-1 cursor-default">
            <span className="underline">H</span>elp
          </span>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 overflow-auto win95-inset m-1 bg-white win95-scrollbar">
        {children}
      </div>

      {/* Status Bar — hidden on mobile */}
      {!isMobile && (
        <div className="win95-inset mx-1 mb-1 px-2 py-0.5 text-[10px] text-[#808080] shrink-0">
          Ready
        </div>
      )}
    </div>
  )
}
