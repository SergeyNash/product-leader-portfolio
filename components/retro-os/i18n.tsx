"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type Lang = "en" | "ru"

interface I18nContextType {
  lang: Lang
  toggleLang: () => void
  t: (key: string) => string
}

const translations: Record<string, Record<Lang, string>> = {
  // Boot screen
  "boot.bios": { en: "BIOS v4.51PG - Product Edition", ru: "BIOS v4.51PG - Product Edition" },
  "boot.copyright": { en: "Copyright (C) 2007-2025, Sinyakov Systems Inc.", ru: "Copyright (C) 2007-2025, Sinyakov Systems Inc." },
  "boot.cpu": { en: "CPU: ProductCore(TM) i18-CPO @ 18 Years Experience", ru: "CPU: ProductCore(TM) i18-CPO @ 18 \u043B\u0435\u0442 \u043E\u043F\u044B\u0442\u0430" },
  "boot.ram": { en: "RAM: 256MB Strategic Thinking... OK", ru: "RAM: 256MB \u0421\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u043C\u044B\u0448\u043B\u0435\u043D\u0438\u0435... OK" },
  "boot.hdd": { en: "HDD: 1TB Enterprise Solutions... Detected", ru: "HDD: 1TB Enterprise \u0440\u0435\u0448\u0435\u043D\u0438\u044F... \u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043E" },
  "boot.init": { en: "Initializing Product Management OS v2.0...", ru: "\u0418\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F Product Management OS v2.0..." },
  "boot.jtbd": { en: "Loading JTBD Framework.......... OK", ru: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 JTBD Framework.......... OK" },
  "boot.custdev": { en: "Loading CustDev Module.......... OK", ru: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 CustDev Module.......... OK" },
  "boot.okr": { en: "Loading OKR Engine.............. OK", ru: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 OKR Engine.............. OK" },
  "boot.agile": { en: "Loading Agile/SAFe Kernel....... OK", ru: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 Agile/SAFe Kernel....... OK" },
  "boot.llm": { en: "Loading LLM Integration......... OK", ru: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 LLM \u0438\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u0438......... OK" },
  "boot.b2b": { en: "Loading B2B/Enterprise Stack.... OK", ru: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 B2B/Enterprise Stack.... OK" },
  "boot.ok": { en: "All systems operational.", ru: "\u0412\u0441\u0435 \u0441\u0438\u0441\u0442\u0435\u043C\u044B \u0433\u043E\u0442\u043E\u0432\u044B." },
  "boot.start": { en: "Starting ProductOS 95...", ru: "\u0417\u0430\u043F\u0443\u0441\u043A ProductOS 95..." },
  "boot.loading": { en: "Loading ProductOS 95...", ru: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 ProductOS 95..." },

  // Desktop icons
  "icon.about": { en: "About Me", ru: "\u041E\u0431\u043E \u043C\u043D\u0435" },
  "icon.career": { en: "Career", ru: "\u041A\u0430\u0440\u044C\u0435\u0440\u0430" },
  "icon.skills": { en: "Skills", ru: "\u041D\u0430\u0432\u044B\u043A\u0438" },
  "icon.education": { en: "Education", ru: "\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435" },
  "icon.contact": { en: "Contact", ru: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B" },
  "icon.terminal": { en: "Terminal", ru: "\u0422\u0435\u0440\u043C\u0438\u043D\u0430\u043B" },
  "icon.recycle": { en: "Recycle Bin", ru: "\u041a\u043e\u0440\u0437\u0438\u043d\u0430" },
  "icon.winamp": { en: "Winamp", ru: "Winamp" },

  // Window titles
  "win.about": { en: "About - Sergey Sinyakov", ru: "\u041E\u0431\u043E \u043C\u043D\u0435 - \u0421\u0435\u0440\u0433\u0435\u0439 \u0421\u0438\u043D\u044F\u043A\u043E\u0432" },
  "win.career": { en: "Career Explorer", ru: "\u041A\u0430\u0440\u044C\u0435\u0440\u043D\u044B\u0439 \u043F\u0443\u0442\u044C" },
  "win.skills": { en: "Skills Matrix v2.0", ru: "\u041C\u0430\u0442\u0440\u0438\u0446\u0430 \u043D\u0430\u0432\u044B\u043A\u043E\u0432 v2.0" },
  "win.education": { en: "Education & Certificates", ru: "\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u0438 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u044B" },
  "win.contact": { en: "Contact - Outlook Express", ru: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B - Outlook Express" },
  "win.terminal": { en: "Command Prompt", ru: "\u041A\u043E\u043C\u0430\u043D\u0434\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430" },
  "win.recycle": { en: "Recycle Bin", ru: "\u041a\u043e\u0440\u0437\u0438\u043d\u0430" },
  "win.winamp": { en: "Winamp 2.95", ru: "Winamp 2.95" },

  // Start menu
  "start.about": { en: "About Me", ru: "\u041E\u0431\u043E \u043C\u043D\u0435" },
  "start.career": { en: "Career History", ru: "\u041A\u0430\u0440\u044C\u0435\u0440\u0430" },
  "start.skills": { en: "Skills Matrix", ru: "\u041C\u0430\u0442\u0440\u0438\u0446\u0430 \u043D\u0430\u0432\u044B\u043A\u043E\u0432" },
  "start.education": { en: "Education", ru: "\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435" },
  "start.contact": { en: "Contact", ru: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B" },
  "start.terminal": { en: "Command Prompt", ru: "\u041A\u043E\u043C\u0430\u043D\u0434\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430" },
  "start.shutdown": { en: "Shut Down...", ru: "\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u0435 \u0440\u0430\u0431\u043E\u0442\u044B..." },

  // About window
  "about.name": { en: "Sergey Sinyakov", ru: "\u0421\u0435\u0440\u0433\u0435\u0439 \u0421\u0438\u043D\u044F\u043A\u043E\u0432" },
  "about.title": { en: "CPO / Head of Product", ru: "CPO / Head of Product" },
  "about.location": { en: "Moscow, Russia", ru: "\u041C\u043E\u0441\u043A\u0432\u0430, \u0420\u043E\u0441\u0441\u0438\u044F" },
  "about.english": { en: "English: C2 (Fluent)", ru: "\u0410\u043D\u0433\u043B\u0438\u0439\u0441\u043A\u0438\u0439: C2 (\u0441\u0432\u043E\u0431\u043E\u0434\u043D\u044B\u0439)" },
  "about.sysinfo": { en: "SYSTEM INFO:", ru: "\u041E \u0421\u0415\u0411\u0415:" },
  "about.summary.en": {
    en: "Product leader with 18 years of experience building B2B/Enterprise platforms and hybrid B2B2C solutions in cybersecurity, fintech (insurance), and industrial automation. Combines engineering depth (architecture, system design) with P&L management and product metrics. Specializes in building processes from Customer Discovery to GTM in complex regulated industries. Actively implements AI tools (LLM) to accelerate analytics, hypothesis generation, and team routine automation.",
    ru: "",
  },
  "about.summary.ru": {
    en: "",
    ru: "\u041F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432\u044B\u0439 \u043B\u0438\u0434\u0435\u0440 \u0441 18-\u043B\u0435\u0442\u043D\u0438\u043C \u043E\u043F\u044B\u0442\u043E\u043C \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F B2B/Enterprise-\u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C \u0438 \u0433\u0438\u0431\u0440\u0438\u0434\u043D\u044B\u0445 B2B2C-\u0440\u0435\u0448\u0435\u043D\u0438\u0439 \u0432 \u043A\u0438\u0431\u0435\u0440\u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438, \u0444\u0438\u043D\u0442\u0435\u0445\u0435 (\u0441\u0442\u0440\u0430\u0445\u043E\u0432\u0430\u043D\u0438\u0435) \u0438 \u043F\u0440\u043E\u043C\u044B\u0448\u043B\u0435\u043D\u043D\u043E\u0439 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u0438. \u0421\u043E\u0447\u0435\u0442\u0430\u044E \u0438\u043D\u0436\u0435\u043D\u0435\u0440\u043D\u0443\u044E \u0433\u043B\u0443\u0431\u0438\u043D\u0443 (\u0430\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u0430, system design) \u0441 \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435\u043C P&L \u0438 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432\u044B\u043C\u0438 \u043C\u0435\u0442\u0440\u0438\u043A\u0430\u043C\u0438. \u0421\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u0443\u044E\u0441\u044C \u043D\u0430 \u0432\u044B\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u043D\u0438\u0438 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u043E\u0432 \u043E\u0442 Customer Discovery \u0434\u043E GTM \u0432 \u0441\u043B\u043E\u0436\u043D\u044B\u0445 \u0440\u0435\u0433\u0443\u043B\u0438\u0440\u0443\u0435\u043C\u044B\u0445 \u043E\u0442\u0440\u0430\u0441\u043B\u044F\u0445. \u0410\u043A\u0442\u0438\u0432\u043D\u043E \u0432\u043D\u0435\u0434\u0440\u044F\u044E AI-\u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B (LLM) \u0434\u043B\u044F \u0443\u0441\u043A\u043E\u0440\u0435\u043D\u0438\u044F \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0438, \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u0438 \u0433\u0438\u043F\u043E\u0442\u0435\u0437 \u0438 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u0438 \u0440\u0443\u0442\u0438\u043D\u044B \u043A\u043E\u043C\u0430\u043D\u0434.",
  },
  "about.competencies": { en: "Key Competencies:", ru: "\u041A\u043B\u044E\u0447\u0435\u0432\u044B\u0435 \u043A\u043E\u043C\u043F\u0435\u0442\u0435\u043D\u0446\u0438\u0438:" },
  "about.uptime": {
    en: "system uptime: 18 years | processes managed: 10+ teams | bugs shipped: 0 release failures (2025)",
    ru: "\u0430\u043F\u0442\u0430\u0439\u043C \u0441\u0438\u0441\u0442\u0435\u043C\u044B: 18 \u043B\u0435\u0442 | \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u043E\u0432 \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u043B: 10+ \u043A\u043E\u043C\u0430\u043D\u0434 | \u0441\u043E\u0440\u0432\u0430\u043D\u043E \u0440\u0435\u043B\u0438\u0437\u043E\u0432: 0 (2025)",
  },

  // Career window
  "career.timeline": { en: "Career Timeline:", ru: "\u041A\u0430\u0440\u044C\u0435\u0440\u043D\u044B\u0439 \u043F\u0443\u0442\u044C:" },
  "career.achievements": { en: "Key Achievements:", ru: "\u041A\u043B\u044E\u0447\u0435\u0432\u044B\u0435 \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u044F:" },

  // Skills window
  "skills.strategy": { en: "Strategy", ru: "\u0421\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044F" },
  "skills.analytics": { en: "Analytics", ru: "\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430" },
  "skills.management": { en: "Management", ru: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435" },
  "skills.technology": { en: "Technology", ru: "\u0422\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0438" },
  "skills.expert": { en: "Expert (90%+)", ru: "\u042D\u043A\u0441\u043F\u0435\u0440\u0442 (90%+)" },
  "skills.advanced": { en: "Advanced (70%+)", ru: "\u041F\u0440\u043E\u0434\u0432\u0438\u043D\u0443\u0442\u044B\u0439 (70%+)" },
  "skills.proficient": { en: "Proficient", ru: "\u0423\u0432\u0435\u0440\u0435\u043D\u043D\u044B\u0439" },

  // Education window
  "edu.title": { en: "Education:", ru: "\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435:" },
  "edu.certs": { en: "Certifications:", ru: "\u0421\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u044B:" },
  "edu.languages": { en: "Languages:", ru: "\u042F\u0437\u044B\u043A\u0438:" },
  "edu.mei": { en: 'NIU "MEI" (Moscow Power Engineering Institute)', ru: '\u041D\u0418\u0423 "\u041C\u042D\u0418" (\u041C\u043E\u0441\u043A\u043E\u0432\u0441\u043A\u0438\u0439 \u044D\u043D\u0435\u0440\u0433\u0435\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0438\u043D\u0441\u0442\u0438\u0442\u0443\u0442)' },
  "edu.degree": { en: "Radio Engineering, Specialist", ru: "\u0420\u0430\u0434\u0438\u043E\u0442\u0435\u0445\u043D\u0438\u043A\u0430, \u0421\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442" },
  "edu.native": { en: "Native", ru: "\u0420\u043E\u0434\u043D\u043E\u0439" },
  "edu.fluent": { en: "C2 - Fluent", ru: "C2 - \u0421\u0432\u043E\u0431\u043E\u0434\u043D\u044B\u0439" },
  "edu.russian": { en: "Russian", ru: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439" },
  "edu.english": { en: "English", ru: "\u0410\u043D\u0433\u043B\u0438\u0439\u0441\u043A\u0438\u0439" },

  // Contact window
  "contact.compose": { en: "> compose new message...", ru: "> \u043D\u043E\u0432\u043E\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435..." },
  "contact.to": { en: "To:", ru: "\u041A\u043E\u043C\u0443:" },
  "contact.subj": { en: "Subj:", ru: "\u0422\u0435\u043C\u0430:" },
  "contact.subject": { en: "Product Leadership Opportunity", ru: "\u041F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043E \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u0447\u0435\u0441\u0442\u0432\u0435" },
  "contact.quickmsg": { en: "Quick Message:", ru: "\u0411\u044B\u0441\u0442\u0440\u043E\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435:" },
  "contact.sent": { en: "Message Sent!", ru: "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E!" },
  "contact.joke": { en: "(Just kidding, this is a demo. Use the links above!)", ru: "(\u0428\u0443\u0442\u043A\u0430, \u044D\u0442\u043E \u0434\u0435\u043C\u043E. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0438 \u0432\u044B\u0448\u0435!)" },
  "contact.newmsg": { en: "New Message", ru: "\u041D\u043E\u0432\u043E\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435" },
  "contact.placeholder": { en: "Type your message here...", ru: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0437\u0434\u0435\u0441\u044C..." },
  "contact.send": { en: "Send", ru: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C" },
  "contact.clear": { en: "Clear", ru: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C" },

  // Terminal
  "term.header": { en: "ProductOS 95 Command Prompt", ru: "ProductOS 95 \u041A\u043E\u043C\u0430\u043D\u0434\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430" },
  "term.hint": { en: '(c) Sinyakov Systems Corp. Type "help" for commands.', ru: '(c) Sinyakov Systems Corp. \u0412\u0432\u0435\u0434\u0438\u0442\u0435 "help" \u0434\u043B\u044F \u0441\u043F\u0438\u0441\u043A\u0430 \u043A\u043E\u043C\u0430\u043D\u0434.' },
  "term.notfound": { en: 'is not recognized. Type "help".', ru: '\u043D\u0435 \u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043D\u0430. \u0412\u0432\u0435\u0434\u0438\u0442\u0435 "help".' },
  "term.bye": { en: "Goodbye! (Window stays open for demo)", ru: "\u0414\u043E \u0441\u0432\u0438\u0434\u0430\u043D\u0438\u044F! (\u041E\u043A\u043D\u043E \u043E\u0441\u0442\u0430\u0451\u0442\u0441\u044F \u043E\u0442\u043A\u0440\u044B\u0442\u044B\u043C)" },

  // Watermark
  "watermark": { en: "ProductOS 95 Build 2025.03", ru: "ProductOS 95 Build 2025.03" },

  // Recycle Bin
  "recycle.toolbar.empty": { en: "Empty Recycle Bin", ru: "\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u044c \u043a\u043e\u0440\u0437\u0438\u043d\u0443" },
  "recycle.col.name": { en: "Name", ru: "\u0418\u043c\u044f" },
  "recycle.col.location": { en: "Original Location", ru: "\u041e\u0442\u043a\u0443\u0434\u0430" },
  "recycle.col.date": { en: "Date Deleted", ru: "\u0414\u0430\u0442\u0430 \u0443\u0434\u0430\u043b\u0435\u043d\u0438\u044f" },
  "recycle.col.size": { en: "Size", ru: "\u0420\u0430\u0437\u043c\u0435\u0440" },
  "recycle.status": { en: "6 objects | 3.6 MB", ru: "6 \u043e\u0431\u044a\u0435\u043a\u0442\u043e\u0432 | 3.6 \u041c\u0411" },
  "recycle.confirm.title": { en: "Confirm File Delete", ru: "\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u0443\u0434\u0430\u043b\u0435\u043d\u0438\u0435" },
  "recycle.confirm.text": { en: "Are you sure you want to permanently delete all items in the Recycle Bin?", ru: "\u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b, \u0447\u0442\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u043d\u0430\u0432\u0441\u0435\u0433\u0434\u0430 \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u0432\u0441\u0435 \u0444\u0430\u0439\u043b\u044b \u0438\u0437 \u043a\u043e\u0440\u0437\u0438\u043d\u044b?" },
  "recycle.confirm.yes": { en: "Yes", ru: "\u0414\u0430" },
  "recycle.confirm.no": { en: "No", ru: "\u041d\u0435\u0442" },
  "recycle.error.title": { en: "Cannot Delete", ru: "\u041d\u0435\u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u0443\u0434\u0430\u043b\u0438\u0442\u044c" },
  "recycle.error.text": { en: "ERROR: Cannot delete. 'stakeholder_wishlist_unlimited.xlsx' is protected by Stakeholder.exe", ru: "\u041e\u0428\u0418\u0411\u041a\u0410: \u041d\u0435\u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u0443\u0434\u0430\u043b\u0438\u0442\u044c. \u0424\u0430\u0439\u043b 'stakeholder_wishlist_unlimited.xlsx' \u0437\u0430\u0449\u0438\u0449\u0451\u043d \u043f\u0440\u043e\u0446\u0435\u0441\u0441\u043e\u043c Stakeholder.exe" },
  "recycle.error.ok": { en: "OK", ru: "OK" },
  "recycle.hint": { en: "Click a file to learn its story", ru: "\u041d\u0430\u0436\u043c\u0438\u0442\u0435 \u043d\u0430 \u0444\u0430\u0439\u043b, \u0447\u0442\u043e\u0431\u044b \u0443\u0437\u043d\u0430\u0442\u044c \u0435\u0433\u043e \u0438\u0441\u0442\u043e\u0440\u0438\u044e" },
}

const I18nContext = createContext<I18nContextType>({
  lang: "ru",
  toggleLang: () => {},
  t: (key: string) => key,
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ru")

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "en" ? "ru" : "en"))
  }, [])

  const t = useCallback(
    (key: string) => {
      return translations[key]?.[lang] || key
    },
    [lang]
  )

  return (
    <I18nContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
