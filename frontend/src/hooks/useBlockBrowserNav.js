import { useEffect } from 'react'

export default function useBlockBrowserNav() {
  useEffect(() => {
    window.history.pushState(null, '', window.location.href)

    const block = () => {
      window.history.pushState(null, '', window.location.href)
    }

    window.addEventListener('popstate', block)
    return () => window.removeEventListener('popstate', block)
  }, [])
}
