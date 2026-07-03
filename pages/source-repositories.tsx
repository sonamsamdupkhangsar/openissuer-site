import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/site.module.css'

type Repository = {
  name: string
  description: string
}

type RepositoryGroup = {
  title: string
  description: string
  repositories: Repository[]
}

const githubBase = 'https://github.com/sonamsamdupkhangsar'

const groups: RepositoryGroup[] = [
  {
    title: 'Identity and authorization',
    description: 'Token issuance, authentication, account state, users, and role assignments.',
    repositories: [
      { name: 'authorization', description: 'OAuth2, OpenID Connect, tenant issuers, clients, consent, and passkeys.' },
      { name: 'authentication-rest-service', description: 'Credential authentication and user sign-in verification.' },
      { name: 'account-rest-service', description: 'Account activation, password recovery, locking, and account state.' },
      { name: 'user-rest-service', description: 'User profiles, organization-aware user lookup, and profile photos.' },
      { name: 'role-rest-service', description: 'Application roles plus organization and subdomain admin assignments.' },
    ],
  },
  {
    title: 'Tenant administration',
    description: 'Organizations, subdomains, administrative workflows, and tenant-scoped management.',
    repositories: [
      { name: 'organization-rest-service', description: 'Organizations, subdomain mappings, memberships, and default organizations.' },
      { name: 'authzmanager', description: 'Admin interface for organizations, users, roles, OAuth clients, and profiles.' },
    ],
  },
  {
    title: 'Platform services',
    description: 'Routing and supporting services used by authentication and administration flows.',
    repositories: [
      { name: 'api-gateway', description: 'Gateway routes for local Eureka and deployed service access.' },
      { name: 'attempt-rest-service', description: 'Login-attempt tracking, throttling, and successful-login clearing.' },
      { name: 'email-rest-service', description: 'Transactional email delivery for activation and account recovery.' },
      { name: 'discovery-service', description: 'Eureka registry used by the local development environment.' },
    ],
  },
  {
    title: 'Examples and documentation',
    description: 'Runnable integrations and the public project documentation.',
    repositories: [
      { name: 'next-auth-example', description: 'NextAuth client for tenant OIDC login, callbacks, tokens, and sessions.' },
      { name: 'openissuer-site', description: 'OpenIssuer product, architecture, admin, development, and operations guides.' },
    ],
  },
  {
    title: 'Infrastructure',
    description: 'Reference Kubernetes infrastructure and shared application packaging.',
    repositories: [
      { name: 'do-k8-terraform', description: 'DigitalOcean Kubernetes, Gateway API, DNS, TLS, CloudNativePG, and Helmfile.' },
      { name: 'sonam-helm-chart', description: 'Shared Helm chart used to package OpenIssuer application workloads.' },
    ],
  },
]

export default function SourceRepositories() {
  return (
    <>
      <Head>
        <title>Source Repositories | OpenIssuer</title>
        <meta
          name="description"
          content="Browse the OpenIssuer identity, tenant administration, platform, example, and infrastructure repositories."
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
          <p className={styles.eyebrow}>Open source</p>
          <h1>Find the code behind each platform capability.</h1>
          <p>
            OpenIssuer is split into focused service repositories. Start with the
            repository that owns the workflow you want to understand, then follow its
            README for service-specific development and deployment details.
          </p>

          <div className={styles.sourceActions}>
            <a href={githubBase} className={styles.primaryAction}>Open the GitHub profile</a>
            <Link href="/architecture" className={styles.secondaryAction}>Map services to architecture</Link>
          </div>

          {groups.map((group) => (
            <section className={styles.sourceGroup} key={group.title}>
              <div className={styles.sourceGroupIntro}>
                <h2>{group.title}</h2>
                <p>{group.description}</p>
              </div>
              <div className={styles.repositoryGrid}>
                {group.repositories.map((repository) => (
                  <a
                    className={styles.repositoryItem}
                    href={`${githubBase}/${repository.name}`}
                    key={repository.name}
                  >
                    <strong>{repository.name}</strong>
                    <span>{repository.description}</span>
                    <small>View repository</small>
                  </a>
                ))}
              </div>
            </section>
          ))}

          <div className={styles.linkGrid}>
            <Link href="/local-development">Set up local development</Link>
            <Link href="/operations-guide">Deploy the platform</Link>
            <Link href="/docs">Read integration documentation</Link>
          </div>
        </section>
      </main>
    </>
  )
}
