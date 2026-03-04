"use client"

import { useState, useCallback } from "react"
import { BootScreen } from "@/components/retro-os/boot-screen"
import { Desktop } from "@/components/retro-os/desktop"

export default function Home() {
  const [booted, setBooted] = useState(false)

  const handleBootComplete = useCallback(() => {
    setBooted(true)
  }, [])

  return (
    <main className="h-screen w-screen overflow-hidden select-none">
      {!booted ? (
        <BootScreen onBootComplete={handleBootComplete} />
      ) : (
        <Desktop />
      )}
    </main>
  )
}
