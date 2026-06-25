import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/site.module.css'

const capabilities = [
  'OAuth2 and OpenID Connect authorization flows',
  'Host-based tenant issuer resolution',
  'Business issuer and OAuth client management',
  'Passkey MFA built into the sign-in flow',
  'User, role, organization, and default-tenant management',
  'Kubernetes-ready services with tenant-aware routing'
]

const tenantSteps = [
  'A business signs up and gets a tenant issuer host.',
  'Admins create OAuth clients and manage users.',
  'Applications redirect users to the matching issuer.',
  'OpenIssuer returns tenant-scoped tokens and claims.'
]

export default function Home() {
  return (
    <>
      <Head>
        <title>OpenIssuer | Multi-tenant OAuth2 and OIDC authorization server</title>
        <meta
          name="description"
          content="OpenIssuer is a host-based OAuth2 and OpenID Connect authorization server for multi-tenant apps, small businesses, and developers."
        />
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

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>OAuth2 · OIDC · Passkeys · Multi-tenancy</p>
            <h1>A tenant-aware authorization server for modern apps.</h1>
            <p className={styles.heroText}>
              OpenIssuer gives each business its own issuer host while keeping client
              management, users, roles, and passkey MFA in one focused platform.
            </p>
            <div className={styles.actions}>
              <Link href="/demo" className={styles.primaryAction}>Try the demo</Link>
              <Link href="/architecture" className={styles.secondaryAction}>Read the architecture</Link>
            </div>
          </div>

          <div className={styles.authPanel} aria-label="OpenIssuer token flow preview">
            <div className={styles.panelHeader}>
              <span />
              <span />
              <span />
            </div>
            <div className={styles.flowRows}>
              <div className={styles.flowRow}>
                <strong>free.openissuer.com</strong>
                <span>Issuer</span>
              </div>
              <div className={styles.flowArrow}>→</div>
              <div className={styles.flowRow}>
                <strong>OIDC Client</strong>
                <span>Redirect + PKCE</span>
              </div>
              <div className={styles.flowArrow}>→</div>
              <div className={styles.flowRow}>
                <strong>Passkey MFA</strong>
                <span>Step-up security</span>
              </div>
              <div className={styles.tokenPreview}>
                <code>{'{ "tenant_id": "free.openissuer.com", "scope": ["openid", "profile"] }'}</code>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>Capabilities</p>
            <h2>Built around real authorization workflows.</h2>
          </div>
          <div className={styles.capabilityGrid}>
            {capabilities.map((item) => (
              <article className={styles.card} key={item}>
                <span className={styles.check}>✓</span>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.splitSection}>
          <div>
            <p className={styles.eyebrow}>For small businesses</p>
            <h2>Launch a business issuer without building identity from scratch.</h2>
            <p>
              A business can create an issuer, add users, create OAuth clients, and
              connect apps through standard OIDC flows while keeping tokens scoped to
              that business host.
            </p>
          </div>
          <ol className={styles.stepList}>
            {tenantSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>Platform</p>
            <h2>Designed as a working authorization system.</h2>
            <p>
              The project uses Spring Boot 4, Spring Security, PostgreSQL, Kubernetes
              Gateway API, and tenant-aware service routing to support real deployment
              and testing.
            </p>
          </div>
          <div className={styles.linkGrid}>
            <Link href="/architecture">Architecture overview</Link>
            <Link href="/demo">Live demo clients</Link>
            <Link href="/docs">Project documentation</Link>
          </div>
        </section>
      </main>
    </>
  )
}
