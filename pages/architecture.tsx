import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/site.module.css'

const dedicatedTenantConfigExample = `{
  "deploymentModel": "dedicated-namespace",
  "namespace": "dedicated-tenant",
  "tenants": [
    {
      "name": "business1",
      "issuerHost": "business1.example.com",
      "adminHost": "business1.admin.example.com",
      "authorizationDatabase": "business1auth"
    },
    {
      "name": "demo",
      "issuerHost": "demo.example.com",
      "adminHost": "demo.admin.example.com",
      "authorizationDatabase": "demoauth"
    }
  ]
}`

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
            <Link href="/free">Free</Link>
            <Link href="/admin-guide">Admin guide</Link>
            <Link href="/operations-guide">Operations</Link>
            <Link href="/docs">Docs</Link>
          </div>
        </nav>
        <section className={styles.contentPage}>
          <p className={styles.eyebrow}>Architecture</p>
          <h1>Host-based multi-tenancy for OAuth2 and OIDC.</h1>
          <p>
            OpenIssuer resolves the tenant from the incoming host, loads that tenant's
            policy and authorization data, and returns tenant-scoped tokens. The same
            flow works whether the tenant uses shared services or a dedicated namespace.
          </p>
          <div className={styles.diagram}>
            <span>Incoming request</span>
            <span>Host resolution</span>
            <span>Tenant issuer</span>
            <span>Scoped tokens</span>
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
          <section className={styles.docsSection}>
            <h2>Choose the deployment boundary that fits your organization</h2>
            <p>
              OpenIssuer supports two ways to serve multiple organizations. Start with
              logical tenant isolation on a shared application stack, or give a business
              its own application and database stack when independent operations matter.
            </p>
            <div className={styles.detailGrid}>
              <article>
                <h2>Shared multi-tenant</h2>
                <p>
                  Each tenant gets its own issuer hostname, authorization data, OAuth
                  clients, and policies. Tenants share the application services and service
                  databases, keeping operations and cost low while preserving logical boundaries.
                </p>
                <p><code>business.example.com → shared stack</code></p>
              </article>
              <article>
                <h2>Dedicated deployment</h2>
                <p>
                  A business or entity gets a complete copy of the OpenIssuer services and
                  databases in its own Kubernetes namespace. It shares only cluster-level
                  infrastructure such as the Gateway, TLS, and operators, while gaining
                  independent rollouts, quotas, backups, and namespace policy boundaries.
                </p>
                <p><code>business.example.com → business namespace</code></p>
              </article>
              <article>
                <h2>One platform, both models</h2>
                <p>
                  The models can coexist. A platform can keep evaluation and smaller
                  customers on the shared stack while placing a regulated, high-volume, or
                  operationally independent business on a dedicated deployment.
                </p>
              </article>
            </div>
          </section>
          <section className={styles.docsSection}>
            <h2>See both models in the OpenIssuer deployment</h2>
            <p>
              The running platform uses both patterns. These examples show how a logical
              tenant and a dedicated namespace can share the same cluster while keeping
              their operational boundaries clear.
            </p>
            <div className={styles.detailGrid}>
              <article>
                <h2>Main namespace · logical tenants</h2>
                <p>
                  Platform, Business 1, Free, and Demo use the shared services in
                  <code>main</code>. Each has its own issuer host and authorization database.
                </p>
                <div className={styles.calloutLinks}>
                  <a href="https://free.openissuer.com/issuer/.well-known/openid-configuration">Free issuer metadata</a>
                  <a href="https://demo.openissuer.com/issuer/.well-known/openid-configuration">Demo issuer metadata</a>
                </div>
              </article>
              <article>
                <h2>Dedicated namespace · complete stack</h2>
                <p>
                  The dedicated tenant runs its own gateway-facing services and PostgreSQL
                  databases in the <code>dedicated-tenant</code> namespace.
                </p>
                <div className={styles.calloutLinks}>
                  <a href="https://dedicated-tenant.openissuer.com/issuer/.well-known/openid-configuration">Dedicated issuer metadata</a>
                  <a href="https://dedicated-tenant.admin.openissuer.com">Dedicated admin portal</a>
                </div>
              </article>
            </div>
          </section>
          <section className={styles.docsSection}>
            <h2>Add logical tenants inside a dedicated deployment</h2>
            <p>
              A dedicated namespace can still host more than one logical tenant. Add
              tenant entries to its catalog, then assign each issuer and admin hostname
              to its own authorization database. The application stack and service
              databases remain dedicated to that namespace.
            </p>
            <pre className={styles.commandBlock}><code>{dedicatedTenantConfigExample}</code></pre>
            <p>
              This pattern gives a business a dedicated operational boundary while
              allowing its brands, environments, or subsidiaries to remain separate
              logical issuers. Keep credentials in the approved secret workflow; the
              catalog contains configuration, not passwords.
            </p>
          </section>
          <div className={styles.linkGrid}>
            <Link href="/request-flows">Trace architecture request flows</Link>
            <Link href="/docs">Read deployment and integration docs</Link>
            <Link href="/source-repositories">Browse the source repositories</Link>
            <Link href="/operations-guide">Read the Kubernetes operations guide</Link>
          </div>
        </section>
      </main>
    </>
  )
}
