import * as React from 'react'

const MOBILE_BREAKPOINT = 768

function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Mobile = narrow screen AND touch device.
    // A narrow desktop browser window alone is NOT considered mobile.
    const touch = isTouchDevice()

    const check = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT && touch)
    }

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    mql.addEventListener('change', check)
    check()
    return () => mql.removeEventListener('change', check)
  }, [])

  return !!isMobile
}
