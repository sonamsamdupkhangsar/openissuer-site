import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/site.module.css'

export default function SsoDemo() {
  return (
    <>
      <Head>
        <title>SSO Demo | OpenIssuer</title>
        <meta
          name="description"
          content="Watch OpenIssuer Workspace and Reports share a Summit-backed Single Sign-On session."
        />
      </Head>
      <main className={styles.page}>
        <nav className={styles.nav} aria-label="Main navigation">
          <Link href="/" className={styles.brand}>OpenIssuer</Link>
          <div className={styles.navLinks}>
            <Link href="/architecture">Architecture</Link>
            <Link href="/demo">Demo</Link>
            <Link href="/free">Free</Link>
            <Link href="/admin-guide">Admin guide</Link>
            <Link href="/operations-guide">Operations</Link>
            <Link href="/docs">Docs</Link>
            <Link href="/sso-demo">SSO demo</Link>
            <Link href="/tenant-provisioning">Request a tenant</Link>
          </div>
        </nav>

        <section className={styles.contentPage}>
          <p className={styles.eyebrow}>Live Single Sign-On</p>
          <h1>One Summit login. Two connected apps.</h1>
          <p>
            This recording shows OpenIssuer Workspace authenticating through the Summit
            tenant, then opening OpenIssuer Reports without asking for credentials again.
            Each app uses its own OAuth client and local session.
          </p>

          <div className={styles.callout}>
            <iframe
              width="100%"
              height="420"
              src="https://www.youtube.com/embed/0fywnTg4bn4"
              title="OpenIssuer Single Sign-On demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ border: 0, borderRadius: '12px' }}
            />
            <p>
              Prefer a local copy? <a href="/videos/full-sso-demo.mov">Download the video</a>.
            </p>
          </div>

          <section className={styles.docsSection}>
            <h2>What the demo proves</h2>
            <ol className={styles.stepList}>
              <li>Workspace redirects to Summit and authenticates the user.</li>
              <li>Workspace shows an active local session.</li>
              <li>Reports starts its own OAuth flow and reuses the Summit session.</li>
              <li>Reports returns signed in without a second credential prompt.</li>
            </ol>
            <div className={styles.calloutLinks}>
              <a href="https://sso-workspace.openissuer.com/nextauth">Open Workspace</a>
              <a href="https://sso-reports.openissuer.com/nextauth">Open Reports</a>
              <a href="https://youtu.be/0fywnTg4bn4" target="_blank" rel="noreferrer">
                Watch the demo on YouTube
              </a>
              <Link href="/docs">Read the SSO documentation</Link>
            </div>
          </section>
        </section>
      </main>
    </>
  )
}
