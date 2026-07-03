import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/site.module.css'

const demos = [
  {
    name: 'Free tenant',
    description: 'A public free-tier tenant using its own issuer host and NextAuth client.',
    appUrl: 'https://free.openissuer.com/nextauth',
    issuer: 'https://free.openissuer.com/issuer',
    callback: 'https://free.openissuer.com/nextauth/api/auth/callback/myauth',
  },
  {
    name: 'Business1 tenant',
    description: 'A business tenant with the same OIDC flow isolated to the business issuer.',
    appUrl: 'https://business1.openissuer.com/nextauth',
    issuer: 'https://business1.openissuer.com/issuer',
    callback: 'https://business1.openissuer.com/nextauth/api/auth/callback/myauth',
  },
]

export default function Demo() {
  return (
    <>
      <Head>
        <title>Live OIDC Demo | OpenIssuer</title>
      </Head>
      <main className={styles.page}>
        <nav className={styles.nav} aria-label="Main navigation">
          <Link href="/" className={styles.brand}>OpenIssuer</Link>
          <div className={styles.navLinks}>
            <Link href="/architecture">Architecture</Link>
            <Link href="/demo">Demo</Link>
            <Link href="/admin-guide">Admin guide</Link>
            <Link href="/operations-guide">Operations</Link>
            <Link href="/docs">Docs</Link>
          </div>
        </nav>
        <section className={styles.contentPage}>
          <p className={styles.eyebrow}>Demo</p>
          <h1>Try OpenIssuer with real NextAuth clients.</h1>
          <p>
            These demos use live tenant issuer URLs and standard OIDC authorization code
            flow with PKCE through NextAuth. Each tenant has its own issuer, client
            registration, callback URL, and token issuer claim.
          </p>

          <div className={styles.demoGrid}>
            {demos.map((demo) => (
              <article className={styles.demoCard} key={demo.name}>
                <h2>{demo.name}</h2>
                <p>{demo.description}</p>
                <dl className={styles.endpointList}>
                  <div>
                    <dt>App</dt>
                    <dd><a href={demo.appUrl}>{demo.appUrl}</a></dd>
                  </div>
                  <div>
                    <dt>Issuer</dt>
                    <dd><code>{demo.issuer}</code></dd>
                  </div>
                  <div>
                    <dt>Callback</dt>
                    <dd><code>{demo.callback}</code></dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

          <div className={styles.callout}>
            <h2>What to check after sign-in</h2>
            <p>
              Open the session view in the demo client and compare the issuer and tenant
              values. The free and business1 apps use the same client application code,
              but OpenIssuer resolves each authorization request from the tenant host.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
