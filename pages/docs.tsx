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
          </div>

          <div className={styles.detailGrid}>
            <article>
              <h2>Free tenant</h2>
              <p>Issuer URL for public free-tier demos and OAuth clients.</p>
              <code>https://free.openissuer.com/issuer</code>
            </article>
            <article>
              <h2>Business1 tenant</h2>
              <p>Issuer URL for the business1 demo tenant and its client registrations.</p>
              <code>https://business1.openissuer.com/issuer</code>
            </article>
            <article>
              <h2>Scopes</h2>
              <p>The demo clients request the standard OpenID Connect scopes.</p>
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
            <h2>Admin portals</h2>
            <p>
              Tenant admins use the admin portal to manage OAuth clients, users,
              organizations, roles, and default organization access.
            </p>
            <div className={styles.linkGrid}>
              <a href="https://free.admin.openissuer.com">Free admin portal</a>
              <a href="https://business1.admin.openissuer.com">Business1 admin portal</a>
            </div>
          </section>

          <section className={styles.docsSection}>
            <h2>Deployment model</h2>
            <p>
              OpenIssuer is deployed as Spring services behind Kubernetes Gateway API
              routes, with PostgreSQL databases and tenant-aware routing. Demo apps are
              deployed as separate NextAuth releases for each tenant host.
            </p>
          </section>
        </section>
      </main>
    </>
  )
}
