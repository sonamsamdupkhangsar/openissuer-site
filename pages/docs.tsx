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
            <Link href="/free">Free</Link>
            <Link href="/admin-guide">Admin guide</Link>
            <Link href="/operations-guide">Operations</Link>
            <Link href="/docs">Docs</Link>
            <Link href="/tenant-provisioning">Request a tenant</Link>
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
            <div className={`${styles.calloutLinks} ${styles.stackedLinks}`}>
              <Link href="/api-reference">Open the OAuth2 and OIDC API reference</Link>
            </div>
          </div>

          <section className={styles.docsSection}>
            <h2>Tenant-aware Single Sign-On</h2>
            <p>
              OpenIssuer provides SSO through OpenID Connect. Register each application
              as an OAuth client under the tenant issuer, and users can authenticate once
              before accessing multiple connected applications. OAuth2 handles delegated
              authorization; OIDC supplies the signed identity and session claims.
            </p>
            <div className={`${styles.calloutLinks} ${styles.stackedLinks}`}>
              <Link href="/api-reference">See the authorization and token endpoints</Link>
              <Link href="/demo">Try the connected demo clients</Link>
              <Link href="/sso-demo">Watch the Workspace → Reports SSO demo</Link>
              <a href="https://youtu.be/0RveSgy5CPI" target="_blank" rel="noreferrer">
                Watch the SSO recording on YouTube
              </a>
            </div>
          </section>

          <section className={styles.docsSection}>
            <h2>Live two-app SSO showcase</h2>
            <p>
              The Summit tenant currently backs two separate OAuth clients: OpenIssuer
              Workspace and OpenIssuer Reports. Sign in to either app, then open the
              other app. Summit reuses the existing issuer session, while each app still
              creates and protects its own local NextAuth session.
            </p>
            <div className={styles.detailGrid}>
              <article>
                <h2>OpenIssuer Workspace</h2>
                <p>OIDC client using the Summit tenant issuer.</p>
                <a href="https://sso-workspace.openissuer.com/nextauth">
                  Open Workspace
                </a>
              </article>
              <article>
                <h2>OpenIssuer Reports</h2>
                <p>Separate OIDC client using the same Summit issuer session.</p>
                <a href="https://sso-reports.openissuer.com/nextauth">
                  Open Reports
                </a>
              </article>
            </div>
            <h3>Try the Workspace → Reports flow</h3>
            <ol className={styles.stepList}>
              <li>
                Open <a href="https://sso-workspace.openissuer.com/nextauth">Workspace</a>
                and sign in with the Summit tenant.
              </li>
              <li>
                Select <strong>OpenIssuer Reports</strong> from the active-session notice.
              </li>
              <li>
                Reports redirects through Summit and returns signed in without asking for
                credentials again.
              </li>
            </ol>
            <p className={styles.callout}>
              This is SSO, not shared application credentials: each client has its own
              redirect URI, secret, tokens, and app session. Signing out of one app does
              not automatically erase the Summit issuer session or the other app's cookie.
            </p>
            <p>
              The showcase depends on the <code>summit</code> issuer, not the separate
              <code>northstar</code> dedicated namespace. Retiring Northstar should not
              affect either SSO app; verify the shared TLS certificate after infrastructure
              changes because it covers multiple tenant and application hostnames.
            </p>
          </section>

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
              <a href="https://youtu.be/gGxyLnDpPDI">Watch the OpenIssuer demo video</a>
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
              <a href="https://demo.admin.openissuer.com">Open the demo admin portal</a>
              <a href="https://youtu.be/gGxyLnDpPDI">Watch the admin portal walkthrough</a>
              <Link href="/admin-guide">Read the administration guide</Link>
            </div>
          </section>

          <section className={styles.docsSection}>
            <h2>Deployment model</h2>
            <p>
              OpenIssuer supports both a shared multi-tenant deployment and a dedicated
              deployment for a business or entity. Both use standard host-based OAuth2 and
              OIDC issuers; the difference is where application workloads and service
              databases run.
            </p>
            <div className={styles.detailGrid}>
              <article>
                <h2>Shared multi-tenant</h2>
                <p>
                  Use this model when tenants can share service capacity and a common
                  release lifecycle. Tenant-specific issuer databases and policies preserve
                  logical boundaries without duplicating the platform stack.
                </p>
              </article>
              <article>
                <h2>Dedicated deployment</h2>
                <p>
                  Use this model when a business needs independent rollouts, quotas,
                  backups, network policies, or stronger namespace-level isolation. The
                  tenant receives its own services and databases inside the Kubernetes cluster.
                </p>
              </article>
            </div>
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
