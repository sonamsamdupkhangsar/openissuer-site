import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/site.module.css'

export default function Demo() {
  return (
    <>
      <Head>
        <title>Demo | OpenIssuer</title>
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
          <p className={styles.eyebrow}>Demo</p>
          <h1>Try OpenIssuer with real OIDC clients.</h1>
          <p>
            These NextAuth test clients exercise the authorization server, tenant issuer
            routing, sign-in flow, and issued claims.
          </p>
          <div className={styles.demoGrid}>
            <a href="https://free.openissuer.com/nextauth">Free issuer demo</a>
            <a href="https://business1.openissuer.com/nextauth">Business issuer demo</a>
          </div>
        </section>
      </main>
    </>
  )
}
