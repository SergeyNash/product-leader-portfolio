"use client"

import { useState } from "react"
import { useI18n } from "../i18n"

interface DeletedFile {
  name: string
  location: string
  dateDeleted: { en: string; ru: string }
  size: string
  comment: { en: string; ru: string }
}

const DELETED_FILES: DeletedFile[] = [
  {
    name: "bad_ideas_2023.txt",
    location: "C:\\Ideas\\",
    dateDeleted: { en: "11/03/2023", ru: "03.11.2023" },
    size: "2 KB",
    comment: {
      en: "Contains 47 ideas rated 'Let's do it!' in discovery. 0 made it to sprint.",
      ru: "47 идей, оценённых как «Делаем!» на Discovery. В спринт не попала ни одна.",
    },
  },
  {
    name: "rejected_features_Q1.docx",
    location: "C:\\Product\\Backlog\\",
    dateDeleted: { en: "02/15/2024", ru: "15.02.2024" },
    size: "48 KB",
    comment: {
      en: "Features that were 'definitely next quarter' for 6 consecutive quarters.",
      ru: "Фичи, которые «точно в следующем квартале» уже 6 кварталов подряд.",
    },
  },
  {
    name: "roadmap_FINAL_v7_REAL_FINAL.xlsx",
    location: "C:\\Strategy\\2022\\",
    dateDeleted: { en: "01/01/2023", ru: "01.01.2023" },
    size: "124 KB",
    comment: {
      en: "v1 through v6 were also in this folder. Only v7 survived long enough to be deleted.",
      ru: "Версии с 1 по 6 тоже были в этой папке. До удаления дожила только v7.",
    },
  },
  {
    name: "meeting_could_be_email.pptx",
    location: "C:\\Meetings\\",
    dateDeleted: { en: "08/22/2022", ru: "22.08.2022" },
    size: "3.4 MB",
    comment: {
      en: "87 slides. Meeting lasted 3 hours. Outcome: schedule another meeting.",
      ru: "87 слайдов. Встреча длилась 3 часа. Итог: назначить ещё одну встречу.",
    },
  },
  {
    name: "sprint_0_planning.txt",
    location: "C:\\Agile\\",
    dateDeleted: { en: "10/10/2019", ru: "10.10.2019" },
    size: "1 KB",
    comment: {
      en: "Sprint 0 tasks. Sprint 0 lasted 4 months.",
      ru: "Задачи нулевого спринта. Нулевой спринт длился 4 месяца.",
    },
  },
  {
    name: "stakeholder_wishlist_unlimited.xlsx",
    location: "C:\\Requests\\",
    dateDeleted: { en: "never", ru: "никогда" },
    size: "\u221e",
    comment: {
      en: "Cannot delete. Protected by Stakeholder.exe. Grows 3 rows per day.",
      ru: "Удалить невозможно. Защищён процессом Stakeholder.exe. Растёт на 3 строки в день.",
    },
  },
]

type DialogState = "idle" | "confirm" | "error"

export function RecycleBinWindow() {
  const { t, lang } = useI18n()
  const [dialogState, setDialogState] = useState<DialogState>("idle")
  const [selectedFile, setSelectedFile] = useState<DeletedFile | null>(null)

  function handleEmptyClick() {
    setDialogState("confirm")
  }

  function handleConfirmYes() {
    setDialogState("error")
  }

  function handleConfirmNo() {
    setDialogState("idle")
  }

  function handleErrorOk() {
    setDialogState("idle")
  }

  return (
    <div className="flex flex-col h-full relative" style={{ fontSize: "14px" }}>
      {/* Toolbar */}
      <div
        className="flex items-center gap-2 px-3 py-1.5 shrink-0"
        style={{ borderBottom: "1px solid #808080" }}
      >
        <button
          className="win95-button px-3 py-1 text-black font-bold"
          style={{ fontSize: "13px" }}
          onClick={handleEmptyClick}
        >
          {t("recycle.toolbar.empty")}
        </button>
      </div>

      {/* Column headers */}
      <div
        className="flex shrink-0"
        style={{ borderBottom: "2px solid #808080", background: "#c0c0c0" }}
      >
        <div className="win95-button px-2 py-1 font-bold flex-[3] text-left" style={{ fontSize: "13px" }}>
          {t("recycle.col.name")}
        </div>
        <div className="win95-button px-2 py-1 font-bold flex-[2] text-left" style={{ fontSize: "13px" }}>
          {t("recycle.col.location")}
        </div>
        <div className="win95-button px-2 py-1 font-bold flex-[2] text-left" style={{ fontSize: "13px" }}>
          {t("recycle.col.date")}
        </div>
        <div className="win95-button px-2 py-1 font-bold flex-[1] text-right" style={{ fontSize: "13px" }}>
          {t("recycle.col.size")}
        </div>
      </div>

      {/* File list */}
      <div className="flex-1 overflow-y-auto bg-white win95-inset">
        {DELETED_FILES.map((file, index) => (
          <button
            key={file.name}
            className="flex w-full text-left px-0"
            style={{
              background: selectedFile?.name === file.name ? "#000080" : index % 2 === 0 ? "#ffffff" : "#f8f8f8",
              color: selectedFile?.name === file.name ? "#ffffff" : "#000000",
              borderBottom: "1px solid #e0e0e0",
            }}
            onClick={() => setSelectedFile(selectedFile?.name === file.name ? null : file)}
          >
            <div className="flex items-center gap-1.5 px-2 py-1.5 flex-[3]" style={{ fontSize: "13px" }}>
              <FileTypeIcon name={file.name} selected={selectedFile?.name === file.name} />
              <span className="truncate">{file.name}</span>
            </div>
            <div className="px-2 py-1.5 flex-[2] truncate" style={{ fontSize: "13px" }}>
              {file.location}
            </div>
            <div className="px-2 py-1.5 flex-[2]" style={{ fontSize: "13px" }}>
              {lang === "ru" ? file.dateDeleted.ru : file.dateDeleted.en}
            </div>
            <div className="px-2 py-1.5 flex-[1] text-right" style={{ fontSize: "13px" }}>
              {file.size}
            </div>
          </button>
        ))}
      </div>

      {/* Status bar */}
      <div
        className="shrink-0 px-3 py-1 flex gap-4 items-center"
        style={{ borderTop: "2px solid #808080", background: "#c0c0c0", minHeight: "28px" }}
      >
        {selectedFile ? (
          <span
            className="text-[12px] italic"
            style={{ color: "#000080" }}
          >
            {lang === "ru" ? selectedFile.comment.ru : selectedFile.comment.en}
          </span>
        ) : (
          <>
            <span className="win95-inset px-2 py-0.5 text-[12px]">{t("recycle.status")}</span>
            <span className="text-[12px] text-[#808080]">{t("recycle.hint")}</span>
          </>
        )}
      </div>

      {/* Confirm dialog overlay */}
      {dialogState === "confirm" && (
        <Win95Dialog
          title={t("recycle.confirm.title")}
          icon="question"
          message={t("recycle.confirm.text")}
          buttons={[
            { label: t("recycle.confirm.yes"), onClick: handleConfirmYes, primary: true },
            { label: t("recycle.confirm.no"), onClick: handleConfirmNo, primary: false },
          ]}
        />
      )}

      {/* Error dialog overlay */}
      {dialogState === "error" && (
        <Win95Dialog
          title={t("recycle.error.title")}
          icon="error"
          message={t("recycle.error.text")}
          buttons={[
            { label: t("recycle.error.ok"), onClick: handleErrorOk, primary: true },
          ]}
        />
      )}
    </div>
  )
}

function FileTypeIcon({ name, selected }: { name: string; selected: boolean }) {
  const ext = name.split(".").pop()?.toLowerCase()
  const colors: Record<string, string> = {
    txt: "#000080",
    docx: "#1084d0",
    xlsx: "#008000",
    pptx: "#cc4400",
  }
  const color = selected ? "#ffffff" : (colors[ext ?? ""] ?? "#808080")

  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <rect x="2" y="1" width="9" height="13" fill={selected ? "#4169E1" : "#FFFACD"} />
      <polygon points="11,1 11,5 15,5" fill={selected ? "#87CEEB" : "#C0C0C0"} />
      <rect x="11" y="5" width="4" height="9" fill={selected ? "#4169E1" : "#FFFACD"} />
      <rect x="4" y="5" width="5" height="1" fill={color} />
      <rect x="4" y="7" width="7" height="1" fill={color} />
      <rect x="4" y="9" width="6" height="1" fill={color} />
      <rect x="4" y="11" width="4" height="1" fill={color} />
    </svg>
  )
}

interface DialogButton {
  label: string
  onClick: () => void
  primary: boolean
}

function Win95Dialog({
  title,
  icon,
  message,
  buttons,
}: {
  title: string
  icon: "question" | "error"
  message: string
  buttons: DialogButton[]
}) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.3)", zIndex: 50 }}
    >
      <div
        className="win95-window"
        style={{ width: "380px", maxWidth: "90%" }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-1.5 px-2 py-1"
          style={{
            background: "linear-gradient(to right, #000080, #1084d0)",
            color: "#ffffff",
            fontSize: "13px",
            fontWeight: "bold",
          }}
        >
          <span>{title}</span>
        </div>

        {/* Content */}
        <div className="p-4 bg-[#c0c0c0]">
          <div className="flex items-start gap-4 mb-5">
            {icon === "question" ? (
              <QuestionIcon />
            ) : (
              <ErrorIcon />
            )}
            <p style={{ fontSize: "14px", lineHeight: "1.5" }}>{message}</p>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-3">
            {buttons.map((btn) => (
              <button
                key={btn.label}
                className="win95-button px-6 py-1 font-bold text-black"
                style={{ fontSize: "13px", minWidth: "72px" }}
                onClick={btn.onClick}
                autoFocus={btn.primary}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function QuestionIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="16" cy="16" r="14" fill="#000080" />
      <text x="16" y="22" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="bold">?</text>
    </svg>
  )
}

function ErrorIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="16" cy="16" r="14" fill="#ff0000" />
      <text x="16" y="22" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="bold">!</text>
    </svg>
  )
}
