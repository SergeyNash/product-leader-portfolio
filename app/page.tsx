"use client"

import { useState, useCallback } from "react"
import { I18nProvider } from "@/components/retro-os/i18n"
import { BootScreen } from "@/components/retro-os/boot-screen"
import { Desktop } from "@/components/retro-os/desktop"

export default function Home() {
  const [booted, setBooted] = useState(false)

  const handleBootComplete = useCallback(() => {
    setBooted(true)
  }, [])

  return (
    <I18nProvider>
      <main className="h-screen w-screen overflow-hidden select-none">
        {!booted ? (
          <BootScreen onBootComplete={handleBootComplete} />
        ) : (
          <Desktop />
        )}
      </main>
    </I18nProvider>
  )
}
