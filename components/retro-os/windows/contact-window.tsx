"use client"

import { useState } from "react"
import { useI18n } from "../i18n"

export function ContactWindow() {
  const { t } = useI18n()
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)

  return (
    <div className="p-6 text-[16px] text-black">
      <div className="mb-6 p-3 bg-black text-[#00ff00] font-mono">
        <p>Microsoft Outlook Express v95</p>
        <p className="text-[#808080]">{t("contact.compose")}</p>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-3 mb-3 pb-1.5 border-b border-[#c0c0c0]">
          <span className="font-bold w-20 text-[#808080]">{t("contact.to")}</span>
          <span className="text-[#000080]">sergey.sinyakov [at] product.leader</span>
        </div>
        <div className="flex items-center gap-3 mb-3 pb-1.5 border-b border-[#c0c0c0]">
          <span className="font-bold w-20 text-[#808080]">{t("contact.subj")}</span>
          <span>{t("contact.subject")}</span>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        <a
          href="https://t.me/sergeysinyakov"
          target="_blank"
          rel="noopener noreferrer"
          className="win95-button !p-3 flex items-center gap-3 text-[16px] no-underline text-black"
        >
          <span className="text-[#0088CC] font-bold text-[21px]">@</span>
          <div>
            <div className="font-bold">Telegram</div>
            <div className="text-[#808080]">@sergeysinyakov</div>
          </div>
        </a>

        <a
          href="https://www.linkedin.com/in/sergeysinyakov/"
          target="_blank"
          rel="noopener noreferrer"
          className="win95-button !p-3 flex items-center gap-3 text-[16px] no-underline text-black"
        >
          <span className="text-[#0077B5] font-bold text-[21px]">in</span>
          <div>
            <div className="font-bold">LinkedIn</div>
            <div className="text-[#808080]">linkedin.com/in/sergeysinyakov</div>
          </div>
        </a>

        <a
          href="mailto:contact@sinyakov.pro"
          className="win95-button !p-3 flex items-center gap-3 text-[16px] no-underline text-black"
        >
          <span className="text-[#FF0000] font-bold text-[21px]">M</span>
          <div>
            <div className="font-bold">Email</div>
            <div className="text-[#808080]">contact@sinyakov.pro</div>
          </div>
        </a>
      </div>

      {/* Quick Message */}
      <div className="win95-inset p-3 bg-white">
        <label className="block text-[15px] font-bold text-[#000080] mb-1.5">
          {t("contact.quickmsg")}
        </label>
        {sent ? (
          <div className="p-4 text-center">
            <p className="text-[#008000] font-bold text-[20px]">{t("contact.sent")}</p>
            <p className="text-[15px] text-[#808080] mt-1.5">
              {t("contact.joke")}
            </p>
            <button
              className="win95-button mt-3 text-[16px]"
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
              className="w-full h-24 p-1.5 text-[16px] border border-[#808080] bg-white resize-none focus:outline-none focus:border-[#000080]"
              placeholder={t("contact.placeholder")}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex gap-3 mt-1.5">
              <button
                className="win95-button text-[16px]"
                onClick={() => setSent(true)}
                disabled={!message.trim()}
              >
                {t("contact.send")}
              </button>
              <button
                className="win95-button text-[16px]"
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
