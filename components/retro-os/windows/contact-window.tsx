"use client"

import { useState } from "react"
import { useI18n } from "../i18n"

export function ContactWindow() {
  const { t } = useI18n()
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)

  return (
    <div className="p-4 text-[11px] text-black">
      <div className="mb-4 p-2 bg-black text-[#00ff00] font-mono">
        <p>Microsoft Outlook Express v95</p>
        <p className="text-[#808080]">{t("contact.compose")}</p>
      </div>

      <div className="mb-3">
        <div className="flex items-center gap-2 mb-2 pb-1 border-b border-[#c0c0c0]">
          <span className="font-bold w-14 text-[#808080]">{t("contact.to")}</span>
          <span className="text-[#000080]">sergey.sinyakov [at] product.leader</span>
        </div>
        <div className="flex items-center gap-2 mb-2 pb-1 border-b border-[#c0c0c0]">
          <span className="font-bold w-14 text-[#808080]">{t("contact.subj")}</span>
          <span>{t("contact.subject")}</span>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 gap-2 mb-4">
        <a
          href="https://t.me/sergeysinyakov"
          target="_blank"
          rel="noopener noreferrer"
          className="win95-button !p-2 flex items-center gap-2 text-[11px] no-underline text-black"
        >
          <span className="text-[#0088CC] font-bold text-[14px]">@</span>
          <div>
            <div className="font-bold">Telegram</div>
            <div className="text-[#808080]">@sergeysinyakov</div>
          </div>
        </a>

        <a
          href="https://www.linkedin.com/in/sergeysinyakov/"
          target="_blank"
          rel="noopener noreferrer"
          className="win95-button !p-2 flex items-center gap-2 text-[11px] no-underline text-black"
        >
          <span className="text-[#0077B5] font-bold text-[14px]">in</span>
          <div>
            <div className="font-bold">LinkedIn</div>
            <div className="text-[#808080]">linkedin.com/in/sergeysinyakov</div>
          </div>
        </a>

        <a
          href="mailto:contact@sinyakov.pro"
          className="win95-button !p-2 flex items-center gap-2 text-[11px] no-underline text-black"
        >
          <span className="text-[#FF0000] font-bold text-[14px]">M</span>
          <div>
            <div className="font-bold">Email</div>
            <div className="text-[#808080]">contact@sinyakov.pro</div>
          </div>
        </a>
      </div>

      {/* Quick Message */}
      <div className="win95-inset p-2 bg-white">
        <label className="block text-[10px] font-bold text-[#000080] mb-1">
          {t("contact.quickmsg")}
        </label>
        {sent ? (
          <div className="p-3 text-center">
            <p className="text-[#008000] font-bold text-[13px]">{t("contact.sent")}</p>
            <p className="text-[10px] text-[#808080] mt-1">
              {t("contact.joke")}
            </p>
            <button
              className="win95-button mt-2 text-[11px]"
              onClick={() => {
                setSent(false)
                setMessage("")
              }}
            >
              {t("contact.newmsg")}
            </button>
          </div>
        ) : (
          <>
            <textarea
              className="w-full h-16 p-1 text-[11px] border border-[#808080] bg-white resize-none focus:outline-none focus:border-[#000080]"
              placeholder={t("contact.placeholder")}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex gap-2 mt-1">
              <button
                className="win95-button text-[11px]"
                onClick={() => setSent(true)}
                disabled={!message.trim()}
              >
                {t("contact.send")}
              </button>
              <button
                className="win95-button text-[11px]"
                onClick={() => setMessage("")}
              >
                {t("contact.clear")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
