import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/site.module.css'

const integrationSteps = [
  'Choose the tenant issuer URL for the customer or environment.',
  'Register an OAuth client in that tenant admin portal.',
  'Add the application callback URL to the client registration.',
  'Configure the app with issuer, client id, client secret, and scopes.',
  'Start the authorization code flow with openid and profile scopes.',
]

const nextAuthSteps = [
  'Create an OAuth client in the tenant admin portal.',
  'Register the callback URL ending in /api/auth/callback/myauth.',
  'Configure the issuer, client id, client secret, and NextAuth secret.',
  'Deploy the app and verify the issuer and tenant claims in the session.',
]

export default function Docs() {
  return (
    <>
      <Head>
        <title>Docs | OpenIssuer OAuth and OIDC Integration</title>
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
          <p className={styles.eyebrow}>Documentation</p>
          <h1>Integrate apps with tenant-scoped OIDC.</h1>
          <p>
            OpenIssuer exposes a standard OAuth2 and OpenID Connect issuer per tenant
            host. Applications use normal OIDC client settings while OpenIssuer handles
            tenant resolution, users, roles, organizations, and OAuth client management.
          </p>

          <div className={styles.callout}>
            <h2>NextAuth callback format</h2>
            <p>
              Register the callback URL that matches the app host, base path, and provider id.
            </p>
            <code>https://your-app.example.com/api/auth/callback/myauth</code>
            <div className={styles.calloutLinks}>
              <Link href="/api-reference">Open the OAuth2 and OIDC API reference</Link>
            </div>
          </div>

          <div className={styles.detailGrid}>
            <article>
              <h2>Demo tenant</h2>
              <p>Issuer URL for the public OpenIssuer demo and OAuth clients.</p>
              <code>https://demo.openissuer.com/issuer</code>
            </article>
            <article>
              <h2>Demo admin</h2>
              <p>Admin portal for creating and inspecting demo OAuth clients.</p>
              <code>https://demo.admin.openissuer.com</code>
            </article>
            <article>
              <h2>Scopes</h2>
              <p>The demo client requests the standard OpenID Connect scopes.</p>
              <code>openid profile</code>
            </article>
          </div>

          <section className={styles.docsSection}>
            <h2>Integration flow</h2>
            <ol className={styles.stepList}>
              {integrationSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          <section className={styles.docsSection}>
            <h2>NextAuth quickstart</h2>
            <p>
              Use the maintained example client to validate an OpenIssuer tenant from
              OAuth client registration through token and session inspection.
            </p>
            <ol className={styles.stepList}>
              {nextAuthSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <div className={styles.linkGrid}>
              <a href="https://demo.openissuer.com/nextauth">Open the live Demo client</a>
              <a href="https://github.com/sonamsamdupkhangsar/next-auth-example">
                Read the complete quickstart
              </a>
            </div>
          </section>

          <section className={styles.docsSection}>
            <h2>Admin portals</h2>
            <p>
              Tenant admins use the admin portal to manage OAuth clients, users,
              organizations, roles, and default organization access.
            </p>
            <div className={styles.linkGrid}>
              <Link href="/authorization-roles">Understand scoped authorization roles</Link>
              <a href="https://free.admin.openissuer.com">Free admin portal</a>
              <a href="https://business1.admin.openissuer.com">Business1 admin portal</a>
              <Link href="/admin-guide">Read the administration guide</Link>
            </div>
          </section>

          <section className={styles.docsSection}>
            <h2>Deployment model</h2>
            <p>
              OpenIssuer is deployed as Spring services behind Kubernetes Gateway API
              routes, with PostgreSQL databases and tenant-aware routing. Demo apps are
              deployed as separate NextAuth releases for each tenant host.
            </p>
            <div className={styles.linkGrid}>
              <Link href="/local-development">Run OpenIssuer locally</Link>
              <Link href="/operations-guide">Read the Kubernetes operations guide</Link>
              <Link href="/architecture">Review the platform architecture</Link>
              <Link href="/request-flows">Trace architecture request flows</Link>
              <Link href="/api-reference">Read the API integration reference</Link>
              <Link href="/security">Review security and production hardening</Link>
              <Link href="/source-repositories">Browse the source repositories</Link>
            </div>
          </section>
        </section>
      </main>
    </>
  )
}
