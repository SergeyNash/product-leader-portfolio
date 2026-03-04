"use client"

import { useState, useEffect } from "react"

const BOOT_LINES = [
  "BIOS v4.51PG - Product Edition",
  "Copyright (C) 2007-2025, Sinyakov Systems Inc.",
  "",
  "CPU: ProductCore(TM) i18-CPO @ 18 Years Experience",
  "RAM: 256MB Strategic Thinking... OK",
  "HDD: 1TB Enterprise Solutions... Detected",
  "",
  "Initializing Product Management OS v2.0...",
  "Loading JTBD Framework.......... OK",
  "Loading CustDev Module.......... OK",
  "Loading OKR Engine.............. OK",
  "Loading Agile/SAFe Kernel....... OK",
  "Loading LLM Integration......... OK",
  "Loading B2B/Enterprise Stack.... OK",
  "",
  "All systems operational.",
  "Starting ProductOS 95...",
]

interface BootScreenProps {
  onBootComplete: () => void
}

export function BootScreen({ onBootComplete }: BootScreenProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0)
  const [showProgress, setShowProgress] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (visibleLines < BOOT_LINES.length) {
      const delay = BOOT_LINES[visibleLines] === "" ? 100 : Math.random() * 80 + 40
      const timer = setTimeout(() => {
        setVisibleLines((prev) => prev + 1)
      }, delay)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => setShowProgress(true), 300)
      return () => clearTimeout(timer)
    }
  }, [visibleLines])

  useEffect(() => {
    if (showProgress && progress < 100) {
      const timer = setTimeout(() => {
        setProgress((prev) => Math.min(prev + Math.random() * 15 + 5, 100))
      }, 100)
      return () => clearTimeout(timer)
    }
    if (progress >= 100) {
      const timer = setTimeout(onBootComplete, 600)
      return () => clearTimeout(timer)
    }
  }, [showProgress, progress, onBootComplete])

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col p-6 font-mono overflow-hidden">
      <div className="flex-1 text-[#00ff00] text-xs leading-relaxed sm:text-sm">
        {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="boot-flicker whitespace-pre">
            {line || "\u00A0"}
          </div>
        ))}
        {visibleLines < BOOT_LINES.length && (
          <span className="blink-cursor" />
        )}
      </div>

      {showProgress && (
        <div className="mb-8">
          <div className="text-[#00ff00] text-xs sm:text-sm mb-2">
            Loading ProductOS 95...
          </div>
          <div className="w-full max-w-md h-5 bg-[#333] win95-inset p-0.5">
            <div className="h-full flex gap-0.5">
              {Array.from({ length: Math.floor(progress / 5) }).map((_, i) => (
                <div
                  key={i}
                  className="h-full w-2.5 bg-[#000080]"
                />
              ))}
            </div>
          </div>
          <div className="text-[#00ff00] text-xs mt-1">
            {Math.floor(progress)}%
          </div>
        </div>
      )}
    </div>
  )
}
