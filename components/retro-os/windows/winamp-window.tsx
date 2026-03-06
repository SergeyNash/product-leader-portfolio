"use client"

import { useState, useEffect, useRef } from "react"

interface Track {
  id: number
  title: string
  artist: string
  duration: number
  year: string
}

const TRACKS: Track[] = [
  { id: 1, title: "Engineering Roots", artist: "Sinyakov", duration: 432, year: "2007-2019" },
  { id: 2, title: "Industrial IoT Era", artist: "Sinyakov", duration: 254, year: "2019-2021" },
  { id: 3, title: "Insurance Fintech", artist: "Sinyakov", duration: 212, year: "2021-2023" },
  { id: 4, title: "Cybersecurity Chapter", artist: "Sinyakov", duration: 180, year: "2023-now" },
]

const VIZ_BARS = 20

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val))
}

export function WinampWindow() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [trackIdx, setTrackIdx] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [vizBars, setVizBars] = useState<number[]>(Array(VIZ_BARS).fill(0))
  const [volume] = useState(80)
  const vizRef = useRef<number[]>(Array(VIZ_BARS).fill(0))

  const track = TRACKS[trackIdx]
  const progress = track.duration > 0 ? (elapsed / track.duration) * 100 : 0

  // Progress timer
  useEffect(() => {
    if (!isPlaying) return
    const id = setInterval(() => {
      setElapsed((prev) => {
        if (prev + 1 >= track.duration) {
          // Auto-advance to next track
          setTrackIdx((t) => (t + 1) % TRACKS.length)
          return 0
        }
        return prev + 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [isPlaying, track.duration])

  // Visualizer animation
  useEffect(() => {
    if (!isPlaying) {
      // Slowly decay bars to zero
      const id = setInterval(() => {
        vizRef.current = vizRef.current.map((v) => Math.max(0, v - 8))
        setVizBars([...vizRef.current])
        if (vizRef.current.every((v) => v === 0)) clearInterval(id)
      }, 80)
      return () => clearInterval(id)
    }

    const id = setInterval(() => {
      vizRef.current = vizRef.current.map((v) => {
        const delta = (Math.random() - 0.4) * 40
        return clamp(v + delta, 0, 100)
      })
      setVizBars([...vizRef.current])
    }, 80)
    return () => clearInterval(id)
  }, [isPlaying])

  function play() { setIsPlaying(true) }
  function pause() { setIsPlaying(false) }
  function stop() { setIsPlaying(false); setElapsed(0) }

  function prev() {
    setTrackIdx((t) => (t - 1 + TRACKS.length) % TRACKS.length)
    setElapsed(0)
  }

  function next() {
    setTrackIdx((t) => (t + 1) % TRACKS.length)
    setElapsed(0)
  }

  const marqueeText = `${String(track.id).padStart(2, "0")}. ${track.title}  —  ${track.artist}  [${track.year}]          `

  return (
    <div
      className="flex flex-col select-none"
      style={{ background: "#232323", height: "100%", userSelect: "none", overflow: "hidden" }}
    >
      {/* Top display panel */}
      <div
        style={{
          background: "#000",
          padding: "5px 8px 3px",
          borderBottom: "1px solid #404040",
        }}
      >
        {/* Winamp logo row */}
        <div className="flex items-center justify-between mb-1">
          <span style={{ color: "#00aaff", fontSize: "11px", fontFamily: "monospace", fontWeight: "bold", letterSpacing: "2px" }}>
            WINAMP
          </span>
          <span style={{ color: "#ffaa00", fontSize: "10px", fontFamily: "monospace" }}>
            v2.95
          </span>
        </div>

        {/* Scrolling marquee */}
        <div
          style={{
            overflow: "hidden",
            height: "22px",
            background: "#001100",
            border: "1px solid #004400",
            marginBottom: "4px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              whiteSpace: "nowrap",
              color: "#00ff00",
              fontSize: "13px",
              fontFamily: "monospace",
              lineHeight: "22px",
              paddingLeft: "100%",
              animationName: "winampMarquee",
              animationDuration: `${marqueeText.length * 0.22}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationPlayState: isPlaying ? "running" : "paused",
            }}
          >
            {marqueeText}
          </div>
        </div>

        {/* Time + kbps row */}
        <div className="flex items-center justify-between">
          <span style={{ color: "#00ff00", fontSize: "22px", fontFamily: "monospace", fontWeight: "bold", letterSpacing: "3px" }}>
            {formatTime(elapsed)}
          </span>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#00cc00", fontSize: "9px", fontFamily: "monospace" }}>128kbps</div>
            <div style={{ color: "#00cc00", fontSize: "9px", fontFamily: "monospace" }}>44kHz</div>
          </div>
        </div>
      </div>

      {/* Visualizer */}
      <div
        style={{
          background: "#000",
          padding: "3px 8px",
          display: "flex",
          alignItems: "flex-end",
          gap: "2px",
          height: "50px",
          borderBottom: "1px solid #404040",
        }}
      >
        {vizBars.map((h, i) => {
          const heightPx = Math.round((h / 100) * 38)
          const isHot = h > 70
          return (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${heightPx}px`,
                background: isHot ? "#ffaa00" : "#00cc00",
                minHeight: "1px",
                transition: "height 0.05s ease-out",
              }}
            />
          )
        })}
      </div>

      {/* Progress bar */}
      <div style={{ padding: "5px 8px 3px", background: "#1a1a1a" }}>
        <div
          style={{
            height: "8px",
            background: "#004400",
            border: "1px solid #006600",
            position: "relative",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "#00cc00",
              transition: "width 0.5s linear",
            }}
          />
          {/* Playhead */}
          <div
            style={{
              position: "absolute",
              top: "-2px",
              left: `${progress}%`,
              width: "6px",
              height: "12px",
              background: "#00ff00",
              transform: "translateX(-3px)",
              transition: "left 0.5s linear",
            }}
          />
        </div>
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "3px",
          padding: "5px 8px",
          background: "#1a1a1a",
          borderBottom: "1px solid #404040",
        }}
      >
        <WinBtn onClick={prev} title="Previous">&#x23EE;</WinBtn>
        <WinBtn onClick={play} title="Play" active={isPlaying && true}>&#x25B6;</WinBtn>
        <WinBtn onClick={pause} title="Pause" active={!isPlaying && elapsed > 0}>&#x23F8;</WinBtn>
        <WinBtn onClick={stop} title="Stop">&#x23F9;</WinBtn>
        <WinBtn onClick={next} title="Next">&#x23ED;</WinBtn>
      </div>

      {/* Volume */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "5px 8px 4px", background: "#1a1a1a", borderBottom: "1px solid #404040" }}>
        <span style={{ color: "#808080", fontSize: "10px", fontFamily: "monospace", whiteSpace: "nowrap" }}>
          VOL
        </span>
        <div
          style={{
            flex: 1,
            height: "6px",
            background: "#004400",
            border: "1px solid #006600",
            position: "relative",
          }}
        >
          <div style={{ width: `${volume}%`, height: "100%", background: "#00aa00" }} />
          <div
            style={{
              position: "absolute",
              top: "-3px",
              left: `${volume}%`,
              width: "5px",
              height: "12px",
              background: "#00ff00",
              transform: "translateX(-2px)",
            }}
          />
        </div>
      </div>

      {/* Track list */}
      <div style={{ background: "#111", padding: "2px 0" }}>
        {TRACKS.map((t, i) => (
          <button
            key={t.id}
            onClick={() => { setTrackIdx(i); setElapsed(0) }}
            style={{
              display: "flex",
              width: "100%",
              textAlign: "left",
              background: i === trackIdx ? "#004400" : "transparent",
              border: "none",
              padding: "2px 8px",
              cursor: "pointer",
              gap: "6px",
              alignItems: "center",
              lineHeight: "1.4",
            }}
          >
            <span style={{ color: i === trackIdx ? "#00ff00" : "#006600", fontSize: "11px", fontFamily: "monospace", minWidth: "16px" }}>
              {i === trackIdx && isPlaying ? "▶" : String(i + 1).padStart(2, "0")}
            </span>
            <span style={{ color: i === trackIdx ? "#00ff00" : "#005500", fontSize: "11px", fontFamily: "monospace", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {t.title}
            </span>
            <span style={{ color: i === trackIdx ? "#008800" : "#003300", fontSize: "11px", fontFamily: "monospace" }}>
              {formatTime(t.duration)}
            </span>
          </button>
        ))}
      </div>

      {/* CSS for marquee animation */}
      <style>{`
        @keyframes winampMarquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  )
}

function WinBtn({
  children,
  onClick,
  title,
  active,
}: {
  children: React.ReactNode
  onClick: () => void
  title?: string
  active?: boolean
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        background: active ? "#003300" : "#1a1a1a",
        border: active ? "1px solid #00ff00" : "1px solid #404040",
        color: active ? "#00ff00" : "#aaaaaa",
        fontSize: "14px",
        padding: "2px 6px",
        cursor: "pointer",
        fontFamily: "monospace",
        lineHeight: 1,
        minWidth: "28px",
      }}
    >
      {children}
    </button>
  )
}
