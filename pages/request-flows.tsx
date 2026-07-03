import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/site.module.css'

type FlowStep = {
  label: string
  detail: string
}

type Flow = {
  eyebrow: string
  title: string
  description: string
  steps: FlowStep[]
  repositories: string[]
}

const githubBase = 'https://github.com/sonamsamdupkhangsar'

const flows: Flow[] = [
  {
    eyebrow: 'OIDC authorization code',
    title: 'A tenant host controls the complete sign-in context.',
    description:
      'The application starts a standard authorization-code flow with PKCE. OpenIssuer resolves the tenant from the issuer host before authenticating the user or loading client data.',
    steps: [
      { label: 'Client application', detail: 'Redirects the browser to the tenant /oauth2/authorize endpoint.' },
      { label: 'Authorization server', detail: 'Resolves the issuer host and loads tenant-specific clients, keys, and authorization state.' },
      { label: 'Authentication service', detail: 'Verifies credentials while account and attempt services enforce account state and login policy.' },
      { label: 'Tenant boundary', detail: 'Confirms user, default organization, and OAuth client belong to the current tenant context.' },
      { label: 'Client callback', detail: 'Returns the code, validates PKCE, and exchanges it for tenant-scoped tokens.' },
    ],
    repositories: ['authorization', 'authentication-rest-service', 'account-rest-service', 'attempt-rest-service'],
  },
  {
    eyebrow: 'Tenant resolution',
    title: 'Hostnames select tenant data before authorization decisions run.',
    description:
      'Public issuer and admin hosts are normalized to the organization tenant host. Tenant-specific authorization data stays in the matching database while shared profile and organization services enforce membership.',
    steps: [
      { label: 'Incoming host', detail: 'free.openissuer.com or business1.openissuer.com identifies the issuer.' },
      { label: 'Host resolver', detail: 'Normalizes issuer and admin hosts to the configured tenant host.' },
      { label: 'Tenant components', detail: 'Selects the tenant client repository, signing keys, authorizations, consent, and passkeys.' },
      { label: 'Organization service', detail: 'Resolves host-to-organization mappings and validates default organization access.' },
      { label: 'Token claims', detail: 'Emits issuer and tenant_id values for the resolved host.' },
    ],
    repositories: ['authorization', 'organization-rest-service', 'user-rest-service'],
  },
  {
    eyebrow: 'Passkey MFA',
    title: 'Passkeys extend the authenticated tenant session.',
    description:
      'Passkey management requires an authorization-server session. During sign-in, users with an enrolled credential complete a WebAuthn challenge before token issuance continues.',
    steps: [
      { label: 'Your Profile', detail: 'Links the signed-in user to the tenant /mfa/passkeys page.' },
      { label: 'Session check', detail: 'Redirects unauthenticated requests through sign-in instead of returning a raw bearer 401.' },
      { label: 'Credential options', detail: 'Creates registration or authentication options for the current tenant and user.' },
      { label: 'Authenticator', detail: 'Uses a platform biometric or cross-device QR flow to prove possession.' },
      { label: 'Authorization continues', detail: 'Records the factor and resumes the OAuth authorization request.' },
    ],
    repositories: ['authorization', 'authzmanager'],
  },
  {
    eyebrow: 'Administrative scope',
    title: 'Role assignments decide how much tenant data an admin can see.',
    description:
      'Authentication establishes identity. Role assignments then scope administrative access to one organization or to all organizations mapped to a subdomain.',
    steps: [
      { label: 'AuthzManager session', detail: 'Signs the administrator in through the matching tenant issuer.' },
      { label: 'Role service', detail: 'Checks OrgAdmin assignments by organization and SubdomainAdmin assignments by subdomain.' },
      { label: 'Organization service', detail: 'Validates organization-to-subdomain mappings before returning scoped data.' },
      { label: 'User service', detail: 'Returns organization users or paged users across the authorized subdomain.' },
      { label: 'Admin view', detail: 'Shows organization controls and the subdomain menu only when the assignments allow them.' },
    ],
    repositories: ['authzmanager', 'role-rest-service', 'organization-rest-service', 'user-rest-service'],
  },
  {
    eyebrow: 'Service routing',
    title: 'Local and Kubernetes environments use different discovery paths.',
    description:
      'The application contract stays the same while WebClient configuration changes how service names are resolved. Token calls can remain direct when HTTPS requires a concrete issuer URL.',
    steps: [
      { label: 'Local eureka', detail: 'Services register on port 8761 and load-balanced WebClients resolve Spring service IDs.' },
      { label: 'Local HTTPS', detail: 'Keeps Eureka for service calls while token and issuer calls use direct trusted HTTPS URLs.' },
      { label: 'Kubernetes Gateway', detail: 'HTTPRoutes match public hostnames and path prefixes at the cluster edge.' },
      { label: 'Non-Eureka services', detail: 'Direct WebClients call Kubernetes Service DNS names in the configured namespace.' },
      { label: 'Application database', detail: 'Each service connects to its CloudNativePG writable service and applies Flyway migrations.' },
    ],
    repositories: ['api-gateway', 'discovery-service', 'do-k8-terraform', 'sonam-helm-chart'],
  },
]

export default function RequestFlows() {
  return (
    <>
      <Head>
        <title>Architecture Request Flows | OpenIssuer</title>
        <meta
          name="description"
          content="Follow OpenIssuer OIDC, tenant resolution, passkey, administration, and Kubernetes request flows across services."
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
          <p className={styles.eyebrow}>Request flows</p>
          <h1>Trace a request across tenant and service boundaries.</h1>
          <p>
            These flows show where OpenIssuer resolves tenant context, authenticates a
            user, enforces administrative scope, and changes service discovery between
            local development and Kubernetes.
          </p>

          {flows.map((flow) => (
            <section className={styles.flowSection} key={flow.eyebrow}>
              <p className={styles.eyebrow}>{flow.eyebrow}</p>
              <h2>{flow.title}</h2>
              <p>{flow.description}</p>
              <div className={styles.flowTrack}>
                {flow.steps.map((step, index) => (
                  <div className={styles.flowStep} key={step.label}>
                    <span className={styles.flowNumber}>{index + 1}</span>
                    <strong>{step.label}</strong>
                    <span>{step.detail}</span>
                  </div>
                ))}
              </div>
              <div className={styles.repositoryLinks} aria-label={`${flow.eyebrow} source repositories`}>
                {flow.repositories.map((repository) => (
                  <a href={`${githubBase}/${repository}`} key={repository}>{repository}</a>
                ))}
              </div>
            </section>
          ))}

          <div className={styles.linkGrid}>
            <Link href="/architecture">Return to the architecture overview</Link>
            <Link href="/api-reference">Read the OAuth2 and OIDC API reference</Link>
            <Link href="/source-repositories">Browse all source repositories</Link>
            <Link href="/local-development">Run the flows locally</Link>
          </div>
        </section>
      </main>
    </>
  )
}
