import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/site.module.css'

const capabilities = [
  'Tenant-aware Single Sign-On for connected applications',
  'OAuth2 and OpenID Connect authorization flows',
  'Host-based tenant issuer resolution',
  'Business issuer and OAuth client management',
  'Organization and subdomain admin scopes',
  'User, role, organization, and default-tenant management',
  'NextAuth demo clients for real tenant sign-in'
]

const tenantSteps = [
  'A business signs up and gets a tenant issuer host.',
  'Admins create OAuth clients and manage users.',
  'Applications redirect users to the matching issuer.',
  'OpenIssuer returns tenant-scoped tokens and claims.'
]

const provisioningSteps = [
  'Submit a tenant request with its issuer, administrator, and region details.',
  'Review and approve the generated Terraform change through the admin workflow.',
  'Protected validation and apply jobs create the namespace, databases, routes, and secrets.',
  'Status callbacks mark the tenant ready so the issuer and admin URLs can be used.'
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
            <Link href="/free">Free</Link>
            <Link href="/admin-guide">Admin guide</Link>
            <Link href="/operations-guide">Operations</Link>
            <Link href="/docs">Docs</Link>
            <Link href="/tenant-provisioning">Request a tenant</Link>
          </div>
        </nav>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Single Sign-On · OAuth2 · OIDC · Multi-tenancy</p>
            <h1>Single Sign-On for every tenant.</h1>
            <p className={styles.heroText}>
              OpenIssuer gives connected applications a tenant-aware Single Sign-On
              experience through OAuth2 and OpenID Connect, with tenant-scoped issuers,
              OAuth clients, users, roles, and admin workflows ready to use.
            </p>
            <div className={styles.actions}>
              <Link href="/free" className={styles.primaryAction}>Try OpenIssuer free</Link>
              <Link href="/demo" className={styles.secondaryAction}>Watch the demos</Link>
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
                <strong>OrgAdmin</strong>
                <span>Scoped access</span>
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
            <p className={styles.eyebrow}>One login, connected apps</p>
            <h2>Give users SSO without building an identity platform.</h2>
            <p>
              Register each application as an OIDC client under the right tenant issuer.
              Users authenticate with OpenIssuer once, then move between connected apps
              without signing in again while the tenant keeps its own users, policies, and claims.
            </p>
          </div>
          <ol className={styles.stepList}>
            <li>Users start at any connected application.</li>
            <li>OpenIssuer authenticates them at the tenant issuer.</li>
            <li>OIDC returns identity and authorization tokens to the app.</li>
            <li>Other connected apps reuse the active SSO session.</li>
          </ol>
        </section>

        <section className={styles.splitSection}>
          <div>
            <p className={styles.eyebrow}>For small businesses</p>
            <h2>Launch tenant-specific sign-in without rebuilding OAuth.</h2>
            <p>
              Each tenant can use its own issuer host, admin portal, OAuth clients, and
              organization membership while OpenIssuer keeps the platform services shared.
            </p>
          </div>
          <ol className={styles.stepList}>
            {tenantSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className={styles.splitSection}>
          <div>
            <p className={styles.eyebrow}>Automated tenant delivery</p>
            <h2>From an approved request to a working issuer.</h2>
            <p>
              OpenIssuer turns tenant provisioning into an auditable workflow. Each
              request becomes a reviewed Terraform change, then protected automation
              creates the tenant infrastructure and reports its status back to the portal.
            </p>
            <div className={styles.actions}>
              <Link href="/tenant-provisioning" className={styles.primaryAction}>
                See dedicated tenant provisioning
              </Link>
            </div>
          </div>
          <ol className={styles.stepList}>
            {provisioningSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>Platform</p>
            <h2>Designed as a working authorization system.</h2>
            <p>
              The project uses Spring Boot, Spring Security, PostgreSQL, Kubernetes
              Gateway API, and tenant-aware service routing. The public demo signs in
              through live NextAuth clients for free and business tenants.
            </p>
          </div>
          <div className={styles.linkGrid}>
            <Link href="/architecture">Architecture overview</Link>
            <Link href="/request-flows">Architecture request flows</Link>
            <Link href="/api-reference">OAuth2 and OIDC API reference</Link>
            <Link href="/security">Security and trust guide</Link>
            <Link href="/free">Free evaluation environment</Link>
            <Link href="/demo">Live demo clients</Link>
            <Link href="/admin-guide">Tenant administration guide</Link>
            <Link href="/local-development">Local development guide</Link>
            <Link href="/operations-guide">Kubernetes operations guide</Link>
            <Link href="/source-repositories">Source repositories</Link>
            <Link href="/docs">Project documentation</Link>
          </div>
        </section>
      </main>
    </>
  )
}
