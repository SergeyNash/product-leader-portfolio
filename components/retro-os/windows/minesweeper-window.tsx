"use client"

import { useState, useCallback, useEffect } from "react"
import { useI18n } from "../i18n"

const ROWS = 9
const COLS = 9
const MINES = 10

interface Cell {
  hasMine: boolean
  isOpen: boolean
  isFlagged: boolean
  adjacentMines: number
}

type GameStatus = "idle" | "playing" | "won" | "lost"

function createEmptyBoard(): Cell[][] {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      hasMine: false,
      isOpen: false,
      isFlagged: false,
      adjacentMines: 0,
    }))
  )
}

function placeMines(board: Cell[][], safeRow: number, safeCol: number): Cell[][] {
  const newBoard = board.map((row) => row.map((cell) => ({ ...cell })))
  let placed = 0

  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS)
    const c = Math.floor(Math.random() * COLS)
    if (!newBoard[r][c].hasMine && !(r === safeRow && c === safeCol)) {
      newBoard[r][c].hasMine = true
      placed++
    }
  }

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (!newBoard[r][c].hasMine) {
        let count = 0
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr
            const nc = c + dc
            if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && newBoard[nr][nc].hasMine) {
              count++
            }
          }
        }
        newBoard[r][c].adjacentMines = count
      }
    }
  }

  return newBoard
}

function floodOpen(board: Cell[][], startR: number, startC: number): Cell[][] {
  const newBoard = board.map((row) => row.map((cell) => ({ ...cell })))
  const queue: [number, number][] = [[startR, startC]]
  const visited = new Set<string>()

  while (queue.length > 0) {
    const [r, c] = queue.shift()!
    const key = `${r},${c}`
    if (visited.has(key)) continue
    visited.add(key)

    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) continue
    if (newBoard[r][c].isFlagged || newBoard[r][c].hasMine) continue

    newBoard[r][c].isOpen = true

    if (newBoard[r][c].adjacentMines === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue
          const nr = r + dr
          const nc = c + dc
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && !newBoard[nr][nc].isOpen) {
            queue.push([nr, nc])
          }
        }
      }
    }
  }

  return newBoard
}

function checkWin(board: Cell[][]): boolean {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (!board[r][c].hasMine && !board[r][c].isOpen) return false
    }
  }
  return true
}

function revealAll(board: Cell[][]): Cell[][] {
  return board.map((row) =>
    row.map((cell) => ({
      ...cell,
      isOpen: cell.hasMine ? true : cell.isOpen,
    }))
  )
}

const ADJACENT_COLORS: Record<number, string> = {
  1: "#0000FF",
  2: "#007B00",
  3: "#FF0000",
  4: "#00007B",
  5: "#7B0000",
  6: "#007B7B",
  7: "#000000",
  8: "#7B7B7B",
}

export function MinesweeperWindow() {
  const { t } = useI18n()
  const [board, setBoard] = useState<Cell[][]>(createEmptyBoard)
  const [status, setStatus] = useState<GameStatus>("idle")
  const [flagsLeft, setFlagsLeft] = useState(MINES)
  const [time, setTime] = useState(0)

  useEffect(() => {
    if (status !== "playing") return
    const id = setInterval(() => setTime((s) => Math.min(s + 1, 999)), 1000)
    return () => clearInterval(id)
  }, [status])

  const restart = useCallback(() => {
    setBoard(createEmptyBoard())
    setStatus("idle")
    setFlagsLeft(MINES)
    setTime(0)
  }, [])

  const handleClick = useCallback(
    (r: number, c: number) => {
      if (status === "won" || status === "lost") return
      const cell = board[r][c]
      if (cell.isOpen || cell.isFlagged) return

      let currentBoard = board

      if (status === "idle") {
        currentBoard = placeMines(board, r, c)
        setStatus("playing")
        setTime(0)
      }

      if (currentBoard[r][c].hasMine) {
        const revealed = revealAll(currentBoard)
        setBoard(revealed)
        setStatus("lost")
        return
      }

      const opened = floodOpen(currentBoard, r, c)
      setBoard(opened)

      if (checkWin(opened)) {
        setStatus("won")
      }
    },
    [board, status]
  )

  const handleRightClick = useCallback(
    (e: React.MouseEvent, r: number, c: number) => {
      e.preventDefault()
      if (status === "won" || status === "lost") return
      const cell = board[r][c]
      if (cell.isOpen) return

      const newBoard = board.map((row) => row.map((cell) => ({ ...cell })))
      const toggled = !newBoard[r][c].isFlagged
      newBoard[r][c].isFlagged = toggled
      setBoard(newBoard)
      setFlagsLeft((prev) => prev + (toggled ? -1 : 1))
    },
    [board, status]
  )

  const faceLabel =
    status === "won" ? "😎" : status === "lost" ? "😵" : "🙂"

  const statusMsg =
    status === "won"
      ? t("minesweeper.won")
      : status === "lost"
      ? t("minesweeper.lost")
      : "\u00A0"

  const pad3 = (n: number) => String(Math.max(0, Math.min(999, n))).padStart(3, "0")

  return (
    <div
      className="h-full flex flex-col items-center justify-center bg-[#c0c0c0] p-2 select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Top panel */}
      <div
        className="win95-inset flex items-center justify-between px-3 py-1 mb-2 w-full"
        style={{ maxWidth: COLS * 30 + 8 }}
      >
        {/* Mine counter */}
        <div
          className="font-mono text-[#ff0000] bg-black px-1 text-[22px] leading-tight"
          style={{ minWidth: 38, textAlign: "right", fontFamily: "monospace" }}
        >
          {pad3(flagsLeft)}
        </div>

        {/* Restart face button */}
        <button
          className="win95-button text-[18px] leading-none w-9 h-9 flex items-center justify-center"
          onClick={restart}
          title={t("minesweeper.restart")}
        >
          {faceLabel}
        </button>

        {/* Timer */}
        <div
          className="font-mono text-[#ff0000] bg-black px-1 text-[22px] leading-tight"
          style={{ minWidth: 38, textAlign: "right", fontFamily: "monospace" }}
        >
          {pad3(time)}
        </div>
      </div>

      {/* Status message */}
      <div className="text-[13px] font-bold mb-1 text-black" style={{ minHeight: 18 }}>
        {statusMsg}
      </div>

      {/* Grid */}
      <div
        className="win95-inset"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 30px)`,
          gridTemplateRows: `repeat(${ROWS}, 30px)`,
          gap: 0,
        }}
      >
        {board.map((row, r) =>
          row.map((cell, c) => {
            const isLostMine = status === "lost" && cell.hasMine && !cell.isFlagged
            const isLostWrongFlag = status === "lost" && cell.isFlagged && !cell.hasMine
            const isOpen = cell.isOpen

            let content: React.ReactNode = null
            if (isLostWrongFlag) {
              content = (
                <span style={{ position: "relative", display: "inline-block" }}>
                  🚩
                  <span style={{ position: "absolute", left: 0, top: 0, color: "red", fontSize: 18 }}>✕</span>
                </span>
              )
            } else if (isLostMine) {
              content = "💣"
            } else if (cell.isFlagged) {
              content = "🚩"
            } else if (isOpen && cell.hasMine) {
              content = "💣"
            } else if (isOpen && cell.adjacentMines > 0) {
              content = (
                <span style={{ color: ADJACENT_COLORS[cell.adjacentMines], fontWeight: "bold", fontSize: 14 }}>
                  {cell.adjacentMines}
                </span>
              )
            }

            return (
              <button
                key={`${r}-${c}`}
                className="flex items-center justify-center text-[15px] leading-none bg-[#c0c0c0] cursor-pointer"
                style={
                  isOpen
                    ? {
                        width: 30,
                        height: 30,
                        minHeight: 30,
                        padding: 0,
                        borderTop: "1px solid #808080",
                        borderLeft: "1px solid #808080",
                        borderBottom: "1px solid #ffffff",
                        borderRight: "1px solid #ffffff",
                      }
                    : {
                        width: 30,
                        height: 30,
                        minHeight: 30,
                        padding: 0,
                        borderTop: "2px solid #ffffff",
                        borderLeft: "2px solid #ffffff",
                        borderBottom: "2px solid #404040",
                        borderRight: "2px solid #404040",
                        boxShadow: "inset 1px 1px 0 #ffffff",
                      }
                }
                onClick={() => handleClick(r, c)}
                onContextMenu={(e) => handleRightClick(e, r, c)}
                tabIndex={-1}
              >
                {content}
              </button>
            )
          })
        )}
      </div>

      {/* Hint */}
      <div className="text-[11px] text-[#808080] mt-2">
        {t("minesweeper.hint")}
      </div>
    </div>
  )
}
