import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/site.module.css'

export default function Docs() {
  return (
    <>
      <Head>
        <title>Docs | OpenIssuer</title>
      </Head>
      <main className={styles.page}>
        <nav className={styles.nav} aria-label="Main navigation">
          <Link href="/" className={styles.brand}>OpenIssuer</Link>
          <div className={styles.navLinks}>
            <Link href="/architecture">Architecture</Link>
            <Link href="/demo">Demo</Link>
            <Link href="/docs">Docs</Link>
          </div>
        </nav>
        <section className={styles.contentPage}>
          <p className={styles.eyebrow}>Documentation</p>
          <h1>Project notes and implementation details.</h1>
          <p>
            This page is a starting point for public OpenIssuer documentation. Add links
            here as the authorization server, admin portal, deployment, and passkey docs
            are published.
          </p>
          <div className={styles.detailGrid}>
            <article>
              <h2>Authorization server</h2>
              <p>OAuth2, OIDC, tenant issuer resolution, token claims, and passkey MFA.</p>
            </article>
            <article>
              <h2>Admin portal</h2>
              <p>Business signup, organizations, users, roles, and OAuth client setup.</p>
            </article>
            <article>
              <h2>Deployment</h2>
              <p>Kubernetes Gateway API, Helm, CNPG databases, and runtime secrets.</p>
            </article>
          </div>
        </section>
      </main>
    </>
  )
}
