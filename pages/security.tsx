import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/site.module.css'

const boundaries = [
  ['Issuer host', 'Selects tenant clients, authorizations, consent, signing keys, and passkeys.'],
  ['Organization', 'Scopes OrgAdmin access and user membership to one organization.'],
  ['Subdomain', 'Scopes SubdomainAdmin access across organizations mapped to one tenant host.'],
  ['Service identity', 'Uses registered OAuth clients and scoped access tokens for service calls.'],
  ['Kubernetes namespace', 'Separates workload, secret, route, and database resource names for an environment.'],
]

const productionChecklist = [
  'Terminate TLS with trusted certificates and redirect all public HTTP traffic to HTTPS.',
  'Accept forwarded host and protocol information only from a trusted gateway that overwrites client-supplied values.',
  'Require exact redirect and post-logout redirect URI registration.',
  'Require S256 PKCE for public clients and use state and nonce for browser flows.',
  'Keep client secrets, database passwords, API tokens, and Sealed Secrets key material out of source control.',
  'Redact authorization headers, access tokens, refresh tokens, passwords, secrets, cookies, and authorization codes from logs.',
  'Restrict database, backup, secret, and JWK access through least-privilege identities.',
  'Test tenant-boundary and administrative-scope failures as well as successful access.',
  'Document backup restore, signing-key recovery, rotation, revocation, and incident response procedures.',
]

export default function SecurityGuide() {
  return (
    <>
      <Head>
        <title>Security and Trust Guide | OpenIssuer</title>
        <meta
          name="description"
          content="OpenIssuer tenant isolation, OAuth client security, passkeys, signing keys, secrets, logging, and production hardening."
        />
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
          <p className={styles.eyebrow}>Security and trust</p>
          <h1>Protect the issuer, tenant boundary, and credentials together.</h1>
          <p>
            OpenIssuer security depends on consistent host resolution, OAuth client
            policy, scoped administration, protected key material, and operational
            controls. This guide distinguishes application controls from deployment
            responsibilities that operators must enforce.
          </p>

          <section className={styles.apiSection}>
            <p className={styles.eyebrow}>Trust boundaries</p>
            <h2>Authorization decisions have multiple scopes.</h2>
            <div className={styles.apiTable} role="table" aria-label="OpenIssuer security boundaries">
              <div className={styles.securityTableHeader} role="row">
                <span role="columnheader">Boundary</span>
                <span role="columnheader">Security responsibility</span>
              </div>
              {boundaries.map(([boundary, responsibility]) => (
                <div className={styles.securityTableRow} role="row" key={boundary}>
                  <strong role="cell">{boundary}</strong>
                  <span role="cell">{responsibility}</span>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.apiSection}>
            <p className={styles.eyebrow}>Tenant isolation</p>
            <h2>The issuer host selects tenant authorization components.</h2>
            <p>
              Tenant hosts select registered clients, authorization records, consent,
              JWK sets, and passkey credentials. Organization membership and default
              organization checks provide an additional boundary before tenant-bound
              user authorization completes.
            </p>
            <div className={styles.warningBlock}>
              Forwarded host and protocol headers are security-sensitive inputs. The
              public gateway must replace untrusted client values and forward only the
              original host accepted by deployment configuration.
            </div>
          </section>

          <section className={styles.apiSection}>
            <p className={styles.eyebrow}>OAuth clients</p>
            <h2>Apply controls according to client type.</h2>
            <div className={styles.detailGrid}>
              <article>
                <h2>Public clients</h2>
                <p>Use authorization code with required S256 PKCE and no embedded client secret.</p>
              </article>
              <article>
                <h2>Confidential clients</h2>
                <p>Authenticate at the token endpoint and store secrets only in protected runtime configuration.</p>
              </article>
              <article>
                <h2>Browser flows</h2>
                <p>Generate and validate state, nonce, and PKCE values with a maintained OIDC library.</p>
              </article>
            </div>
            <p className={styles.guideNote}>
              Redirect and post-logout redirect URIs must match registered values
              exactly. A client registered under one tenant issuer must not be reused
              against another tenant host.
            </p>
          </section>

          <section className={styles.apiSection}>
            <p className={styles.eyebrow}>Signing keys</p>
            <h2>Each issuer persists its JWK set with authorization data.</h2>
            <p>
              OpenIssuer creates an RSA JWK set when an issuer database is initialized
              and reloads the persisted set on restart. This preserves token validation
              across pod replacement. The public portion is exposed through the issuer
              JWK endpoint.
            </p>
            <div className={styles.warningBlock}>
              Database and backup access includes signing-key material and must be
              treated as highly sensitive. Automated key rotation is not documented as
              an existing platform control; define and test a rotation procedure that
              overlaps old and new public keys before relying on rotation operationally.
            </div>
          </section>

          <section className={styles.apiSection}>
            <p className={styles.eyebrow}>Passkeys</p>
            <h2>WebAuthn credentials remain issuer and user scoped.</h2>
            <p>
              Passkey registration requires an authorization-server session and a
              trusted HTTPS context. Credentials are stored with the tenant issuer and
              are not shared across issuer databases. During login, a user with an
              enrolled credential completes the WebAuthn factor before authorization
              continues.
            </p>
          </section>

          <section className={styles.apiSection}>
            <p className={styles.eyebrow}>Administrative access</p>
            <h2>Identity does not imply tenant-wide administration.</h2>
            <p>
              OrgAdmin assignments are scoped to an organization. SubdomainAdmin
              assignments are scoped to a subdomain and enable cross-organization views
              only for that tenant. Downstream organization and user queries must still
              validate the requested resources against the authorized scope.
            </p>
          </section>

          <section className={styles.apiSection}>
            <p className={styles.eyebrow}>Secrets and logs</p>
            <h2>Prevent runtime credentials from becoming durable records.</h2>
            <p>
              The reference deployment loads infrastructure secrets from macOS Keychain
              and stores Kubernetes values through Secrets or Sealed Secrets. Real
              tfvars, kubeconfigs, private keys, and unsealed secrets must remain outside
              Git.
            </p>
            <div className={styles.warningBlock}>
              Never log passwords, client secrets, authorization headers, access or
              refresh tokens, authorization codes, session cookies, or complete request
              bodies that can contain credentials. Redaction must happen before logs
              leave the application process.
            </div>
          </section>

          <section className={styles.apiSection}>
            <p className={styles.eyebrow}>Production checklist</p>
            <h2>Verify controls before exposing an issuer.</h2>
            <ol className={styles.stepList}>
              {productionChecklist.map((item) => <li key={item}>{item}</li>)}
            </ol>
          </section>

          <div className={styles.linkGrid}>
            <Link href="/api-reference">Review OAuth2 and OIDC integration rules</Link>
            <Link href="/request-flows">Trace service trust boundaries</Link>
            <Link href="/operations-guide">Harden the Kubernetes deployment</Link>
          </div>
        </section>
      </main>
    </>
  )
}
