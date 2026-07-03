import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/site.module.css'

export default function Architecture() {
  return (
    <>
      <Head>
        <title>Architecture | OpenIssuer</title>
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
          <p className={styles.eyebrow}>Architecture</p>
          <h1>Host-based multi-tenancy for OAuth2 and OIDC.</h1>
          <p>
            OpenIssuer resolves the issuer from the incoming host, so each tenant can
            use a distinct authorization domain while sharing the same platform.
          </p>
          <div className={styles.diagram}>
            <span>User</span>
            <span>Business App</span>
            <span>Tenant Issuer</span>
            <span>Tokens</span>
          </div>
          <div className={styles.detailGrid}>
            <article>
              <h2>Tenant issuer hosts</h2>
              <p>Issuer metadata, login, token issuance, and claims are resolved for the current host.</p>
            </article>
            <article>
              <h2>Admin management</h2>
              <p>Admins manage organizations, users, roles, OAuth clients, and default organization behavior.</p>
            </article>
            <article>
              <h2>Passkey MFA</h2>
              <p>Users can enroll passkeys and complete MFA during the authorization flow.</p>
            </article>
          </div>
          <div className={styles.linkGrid}>
            <Link href="/request-flows">Trace architecture request flows</Link>
            <Link href="/source-repositories">Browse the source repositories</Link>
            <Link href="/operations-guide">Read the Kubernetes operations guide</Link>
          </div>
        </section>
      </main>
    </>
  )
}
