"use client"

import { useState } from "react"

export function ContactWindow() {
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)

  return (
    <div className="p-4 text-[11px] text-black">
      <div className="mb-4 p-2 bg-black text-[#00ff00] font-mono">
        <p>Microsoft Outlook Express v95</p>
        <p className="text-[#808080]">{">"} compose new message...</p>
      </div>

      <div className="mb-3">
        <div className="flex items-center gap-2 mb-2 pb-1 border-b border-[#c0c0c0]">
          <span className="font-bold w-12 text-[#808080]">To:</span>
          <span className="text-[#000080]">sergey.sinyakov [at] product.leader</span>
        </div>
        <div className="flex items-center gap-2 mb-2 pb-1 border-b border-[#c0c0c0]">
          <span className="font-bold w-12 text-[#808080]">Subj:</span>
          <span>Product Leadership Opportunity</span>
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
          Quick Message:
        </label>
        {sent ? (
          <div className="p-3 text-center">
            <p className="text-[#008000] font-bold text-[13px]">Message Sent!</p>
            <p className="text-[10px] text-[#808080] mt-1">
              (Just kidding, this is a demo. Use the links above!)
            </p>
            <button
              className="win95-button mt-2 text-[11px]"
              onClick={() => {
                setSent(false)
                setMessage("")
              }}
            >
              New Message
            </button>
          </div>
        ) : (
          <>
            <textarea
              className="w-full h-16 p-1 text-[11px] border border-[#808080] bg-white resize-none focus:outline-none focus:border-[#000080]"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex gap-2 mt-1">
              <button
                className="win95-button text-[11px]"
                onClick={() => setSent(true)}
                disabled={!message.trim()}
              >
                Send
              </button>
              <button
                className="win95-button text-[11px]"
                onClick={() => setMessage("")}
              >
                Clear
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
