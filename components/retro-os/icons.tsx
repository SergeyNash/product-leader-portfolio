export function UserIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect x="10" y="4" width="12" height="12" rx="0" fill="#FFD700" />
      <rect x="12" y="6" width="3" height="3" fill="#000" />
      <rect x="17" y="6" width="3" height="3" fill="#000" />
      <rect x="13" y="11" width="6" height="2" fill="#000" />
      <rect x="6" y="18" width="20" height="10" rx="0" fill="#000080" />
      <rect x="8" y="20" width="16" height="6" fill="#4169E1" />
    </svg>
  )
}

export function BriefcaseIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect x="4" y="10" width="24" height="18" fill="#8B4513" />
      <rect x="6" y="12" width="20" height="14" fill="#A0522D" />
      <rect x="12" y="4" width="8" height="8" fill="#8B4513" />
      <rect x="14" y="6" width="4" height="4" fill="#A0522D" />
      <rect x="13" y="17" width="6" height="4" fill="#FFD700" />
    </svg>
  )
}

export function ChipIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect x="8" y="8" width="16" height="16" fill="#2F4F4F" />
      <rect x="10" y="10" width="12" height="12" fill="#006400" />
      <rect x="12" y="12" width="8" height="8" fill="#00FF00" opacity="0.3" />
      {/* Pins */}
      <rect x="4" y="12" width="4" height="2" fill="#C0C0C0" />
      <rect x="4" y="18" width="4" height="2" fill="#C0C0C0" />
      <rect x="24" y="12" width="4" height="2" fill="#C0C0C0" />
      <rect x="24" y="18" width="4" height="2" fill="#C0C0C0" />
      <rect x="12" y="4" width="2" height="4" fill="#C0C0C0" />
      <rect x="18" y="4" width="2" height="4" fill="#C0C0C0" />
      <rect x="12" y="24" width="2" height="4" fill="#C0C0C0" />
      <rect x="18" y="24" width="2" height="4" fill="#C0C0C0" />
    </svg>
  )
}

export function MailIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect x="2" y="8" width="28" height="18" fill="#FFFACD" />
      <rect x="4" y="10" width="24" height="14" fill="#FFF8DC" />
      <polygon points="2,8 16,18 30,8" fill="#DAA520" />
      <polygon points="2,8 16,18 30,8" fill="none" stroke="#B8860B" strokeWidth="1" />
    </svg>
  )
}

export function NotepadIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect x="6" y="2" width="20" height="28" fill="#FFFACD" />
      <rect x="8" y="4" width="16" height="24" fill="#FFFFF0" />
      <rect x="10" y="8" width="12" height="1" fill="#808080" />
      <rect x="10" y="12" width="12" height="1" fill="#808080" />
      <rect x="10" y="16" width="8" height="1" fill="#808080" />
      <rect x="10" y="20" width="10" height="1" fill="#808080" />
      <rect x="6" y="2" width="2" height="28" fill="#FF0000" />
    </svg>
  )
}

export function GlobeIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="12" fill="#4169E1" />
      <ellipse cx="16" cy="16" rx="5" ry="12" fill="none" stroke="#87CEEB" strokeWidth="1.5" />
      <line x1="4" y1="16" x2="28" y2="16" stroke="#87CEEB" strokeWidth="1.5" />
      <line x1="6" y1="10" x2="26" y2="10" stroke="#87CEEB" strokeWidth="1" />
      <line x1="6" y1="22" x2="26" y2="22" stroke="#87CEEB" strokeWidth="1" />
      <rect x="10" y="8" width="4" height="3" fill="#228B22" />
      <rect x="18" y="14" width="5" height="4" fill="#228B22" />
      <rect x="8" y="18" width="3" height="3" fill="#228B22" />
    </svg>
  )
}

export function StarIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <polygon
        points="8,1 10,6 15,6 11,9 12.5,14 8,11 3.5,14 5,9 1,6 6,6"
        fill="#FFD700"
        stroke="#B8860B"
        strokeWidth="0.5"
      />
    </svg>
  )
}

export function FolderIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect x="2" y="8" width="28" height="20" rx="0" fill="#FFD700" />
      <rect x="2" y="4" width="12" height="6" fill="#FFD700" />
      <rect x="4" y="10" width="24" height="16" fill="#FFFACD" />
    </svg>
  )
}

export function WindowsLogoIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <rect x="1" y="1" width="8" height="8" fill="#FF0000" />
      <rect x="11" y="1" width="8" height="8" fill="#00FF00" />
      <rect x="1" y="11" width="8" height="8" fill="#0000FF" />
      <rect x="11" y="11" width="8" height="8" fill="#FFD700" />
    </svg>
  )
}

export function WinampIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Screen */}
      <rect x="2" y="4" width="28" height="22" fill="#000000" />
      <rect x="4" y="6" width="24" height="18" fill="#001a00" />
      {/* Equalizer bars */}
      <rect x="6" y="14" width="3" height="8" fill="#00ff00" />
      <rect x="10" y="10" width="3" height="12" fill="#00ff00" />
      <rect x="14" y="12" width="3" height="10" fill="#00cc00" />
      <rect x="18" y="8" width="3" height="14" fill="#ffaa00" />
      <rect x="22" y="13" width="3" height="9" fill="#00ff00" />
      {/* Base */}
      <rect x="8" y="26" width="16" height="3" fill="#404040" />
      <rect x="6" y="29" width="20" height="1" fill="#808080" />
    </svg>
  )
}

export function RecycleBinIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Bin body */}
      <rect x="6" y="13" width="20" height="16" fill="#808080" />
      <rect x="8" y="15" width="16" height="12" fill="#C0C0C0" />
      {/* Bin lid */}
      <rect x="4" y="10" width="24" height="4" fill="#808080" />
      <rect x="12" y="7" width="8" height="4" fill="#808080" />
      <rect x="13" y="8" width="6" height="2" fill="#C0C0C0" />
      {/* Vertical lines on bin */}
      <rect x="11" y="15" width="2" height="10" fill="#808080" />
      <rect x="15" y="15" width="2" height="10" fill="#808080" />
      <rect x="19" y="15" width="2" height="10" fill="#808080" />
      {/* Papers sticking out */}
      <rect x="9" y="8" width="5" height="6" fill="#FFFFF0" />
      <rect x="10" y="9" width="3" height="1" fill="#808080" />
      <rect x="10" y="11" width="4" height="1" fill="#808080" />
      <rect x="18" y="7" width="6" height="5" fill="#FFFACD" transform="rotate(8 18 7)" />
      <rect x="19" y="8" width="4" height="1" fill="#808080" transform="rotate(8 18 7)" />
    </svg>
  )
}

export function TerminalIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect x="2" y="4" width="28" height="24" fill="#000000" />
      <rect x="4" y="6" width="24" height="20" fill="#000080" />
      <text x="6" y="16" fill="#C0C0C0" fontSize="8" fontFamily="monospace">{"C:\\>"}</text>
      <rect x="22" y="12" width="4" height="2" fill="#C0C0C0" opacity="0.7" />
    </svg>
  )
}
