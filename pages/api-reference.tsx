import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/site.module.css'

const endpoints = [
  ['Discovery', '/.well-known/openid-configuration', 'Issuer metadata and supported protocol capabilities.'],
  ['Authorize', '/oauth2/authorize', 'Starts authorization-code login and consent.'],
  ['Token', '/oauth2/token', 'Exchanges codes, refresh tokens, or client credentials.'],
  ['JWK set', '/oauth2/jwks', 'Public signing keys used to validate JWTs.'],
  ['UserInfo', '/userinfo', 'Returns claims authorized for the current OpenID Connect user.'],
  ['Logout', '/connect/logout', 'Starts OpenID Connect relying-party initiated logout.'],
]

const clientRules = [
  'Register the client under the same tenant issuer host used by the application.',
  'Match redirect URIs exactly, including scheme, host, port, base path, and provider callback id.',
  'Use authorization code with S256 PKCE for browser and server-rendered user sign-in.',
  'Use client credentials only for service clients that were registered for that grant.',
  'Request only scopes assigned to the registered client.',
  'Keep client secrets in a secret manager or Kubernetes Secret, never in source control.',
]

export default function ApiReference() {
  return (
    <>
      <Head>
        <title>OAuth2 and OIDC API Reference | OpenIssuer</title>
        <meta
          name="description"
          content="OpenIssuer issuer discovery, OAuth2 endpoints, OIDC claims, client rules, and integration examples."
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
          <p className={styles.eyebrow}>API reference</p>
          <h1>Integrate through standard OAuth2 and OpenID Connect endpoints.</h1>
          <p>
            Configure clients from the tenant discovery document. The issuer host is
            part of the security boundary: clients, authorizations, signing keys,
            consent, and passkeys are selected for that issuer.
          </p>

          <div className={styles.callout}>
            <h2>Start with discovery</h2>
            <p>Replace the host with the tenant issuer selected for the application.</p>
            <pre className={styles.commandBlock}><code>{`https://free.openissuer.com/issuer/.well-known/openid-configuration`}</code></pre>
          </div>

          <section className={styles.apiSection}>
            <p className={styles.eyebrow}>Issuer endpoints</p>
            <h2>Public Gateway API paths</h2>
            <p>
              The public base URL is <code>https://TENANT_HOST/issuer</code>. The gateway
              strips <code>/issuer</code> before forwarding requests to the authorization server.
            </p>
            <div className={styles.apiTable} role="table" aria-label="OpenIssuer OAuth and OIDC endpoints">
              <div className={styles.apiTableHeader} role="row">
                <span role="columnheader">Endpoint</span>
                <span role="columnheader">Path</span>
                <span role="columnheader">Purpose</span>
              </div>
              {endpoints.map(([name, path, purpose]) => (
                <div role="row" key={name}>
                  <strong role="cell">{name}</strong>
                  <code role="cell">{path}</code>
                  <span role="cell">{purpose}</span>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.apiSection}>
            <p className={styles.eyebrow}>Client registration</p>
            <h2>Grant types, authentication, and scopes</h2>
            <div className={styles.detailGrid}>
              <article>
                <h2>User applications</h2>
                <p><code>authorization_code</code> with <code>S256</code> PKCE and optional <code>refresh_token</code>.</p>
              </article>
              <article>
                <h2>Service applications</h2>
                <p><code>client_credentials</code> with a client authentication method assigned during registration.</p>
              </article>
              <article>
                <h2>Common scopes</h2>
                <p><code>openid profile email</code> plus application scopes such as <code>message.read</code>.</p>
              </article>
            </div>
            <p className={styles.guideNote}>
              Discovery reports server capabilities. A client can use only the grants,
              authentication methods, redirect URIs, and scopes stored in its own registration.
            </p>
            <ol className={styles.stepList}>
              {clientRules.map((rule) => <li key={rule}>{rule}</li>)}
            </ol>
          </section>

          <section className={styles.apiSection}>
            <p className={styles.eyebrow}>Authorization code</p>
            <h2>Start browser authorization</h2>
            <pre className={styles.commandBlock}><code>{`GET https://free.openissuer.com/issuer/oauth2/authorize
  ?response_type=code
  &client_id=CLIENT_ID
  &redirect_uri=https%3A%2F%2Fapp.example.com%2Fapi%2Fauth%2Fcallback%2Fmyauth
  &scope=openid%20profile
  &state=RANDOM_STATE
  &nonce=RANDOM_NONCE
  &code_challenge=BASE64URL_SHA256_VERIFIER
  &code_challenge_method=S256`}</code></pre>
            <p>
              Generate and validate <code>state</code>, <code>nonce</code>, and the PKCE
              verifier with a maintained OAuth/OIDC client library rather than constructing
              the flow manually.
            </p>
          </section>

          <section className={styles.apiSection}>
            <p className={styles.eyebrow}>Token exchange</p>
            <h2>Exchange the authorization code</h2>
            <pre className={styles.commandBlock}><code>{`curl -X POST https://free.openissuer.com/issuer/oauth2/token \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -u "CLIENT_ID:CLIENT_SECRET" \\
  -d "grant_type=authorization_code" \\
  -d "code=AUTHORIZATION_CODE" \\
  -d "redirect_uri=https://app.example.com/api/auth/callback/myauth" \\
  -d "code_verifier=PKCE_VERIFIER"`}</code></pre>
            <p>
              Confidential clients commonly use <code>client_secret_basic</code>. Public
              clients omit the secret and must be registered with no client authentication
              method and required PKCE.
            </p>
          </section>

          <section className={styles.apiSection}>
            <p className={styles.eyebrow}>Claims</p>
            <h2>Tenant-aware token data</h2>
            <div className={styles.claimGrid}>
              <div>
                <h3>ID token</h3>
                <pre className={styles.commandBlock}><code>{`{
  "iss": "https://free.openissuer.com/issuer",
  "sub": "user@example.com",
  "aud": "CLIENT_ID",
  "tenant_id": "free.openissuer.com",
  "name": "Example User",
  "email": "user@example.com",
  "picture": ""
}`}</code></pre>
              </div>
              <div>
                <h3>Access token</h3>
                <pre className={styles.commandBlock}><code>{`{
  "iss": "https://free.openissuer.com/issuer",
  "sub": "user@example.com",
  "scope": ["openid", "profile"],
  "tenant_id": "free.openissuer.com",
  "userId": "USER_UUID",
  "userRole": ["ROLE_NAME"],
  "authFactors": ["FACTOR_PASSWORD"]
}`}</code></pre>
              </div>
            </div>
            <p className={styles.guideNote}>
              Claims depend on principal type, granted scopes, roles, and completed
              authentication factors. Optional claims may be absent.
            </p>
          </section>

          <section className={styles.apiSection}>
            <p className={styles.eyebrow}>Troubleshooting</p>
            <h2>Common integration failures</h2>
            <dl className={styles.troubleshootingList}>
              <div>
                <dt><code>invalid_client</code></dt>
                <dd>Client ID, secret, authentication method, or tenant issuer does not match the registration.</dd>
              </div>
              <div>
                <dt><code>invalid_grant</code></dt>
                <dd>The code is expired or reused, redirect URI changed, or the PKCE verifier is incorrect.</dd>
              </div>
              <div>
                <dt><code>invalid_scope</code></dt>
                <dd>The request contains a scope not assigned to the client.</dd>
              </div>
              <div>
                <dt>Redirect URI rejected</dt>
                <dd>The submitted URI does not exactly match a registered redirect URI.</dd>
              </div>
              <div>
                <dt>Issuer repository not found</dt>
                <dd>The request host is missing from tenant configuration or forwarded host handling is incorrect.</dd>
              </div>
            </dl>
          </section>

          <div className={styles.linkGrid}>
            <Link href="/demo">Test the live NextAuth clients</Link>
            <Link href="/security">Review security and trust guidance</Link>
            <Link href="/request-flows">Trace the authorization flow</Link>
            <a href="https://github.com/sonamsamdupkhangsar/authorization">Authorization source</a>
          </div>
        </section>
      </main>
    </>
  )
}
