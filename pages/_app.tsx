import type { AppProps } from 'next/app'
import Script from 'next/script'
import '../styles/global.css'

export default function App({ Component, pageProps }: AppProps) {
  const analyticsDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
  const analyticsScript = process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL || 'https://plausible.io/js/script.js'

  return (
    <>
      {analyticsDomain && (
        <Script
          defer
          data-domain={analyticsDomain}
          src={analyticsScript}
        />
      )}
      <Component {...pageProps} />
    </>
  )
}
