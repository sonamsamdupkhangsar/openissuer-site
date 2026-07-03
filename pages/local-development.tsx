import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/site.module.css'

const services = [
  ['discovery-service', '8761', 'None'],
  ['role-rest-service', '8082', 'role'],
  ['authentication-rest-service', '8083', 'authentication'],
  ['user-rest-service', '8084', 'user'],
  ['email-rest-service', '8085', 'None'],
  ['account-rest-service', '8086', 'account2'],
  ['attempt-rest-service', '8087', 'attempt'],
  ['organization-rest-service', '8088', 'organization'],
  ['authorization', '9001', 'authorization + tenant databases'],
  ['authzmanager', '9093', 'authzmanager'],
  ['api-gateway', '8080', 'None'],
]

const startupSteps = [
  'Start PostgreSQL and confirm every required local database is available.',
  'Start discovery-service and verify the Eureka registry on port 8761.',
  'Start role, authentication, user, account, attempt, organization, and email services.',
  'Confirm the services are registered in Eureka before starting authorization.',
  'Start authorization after its dependencies so tenant and organization seeding can complete.',
  'Start authzmanager and api-gateway, then test the tenant HTTPS URLs.',
]

export default function LocalDevelopment() {
  return (
    <>
      <Head>
        <title>Local Development | OpenIssuer</title>
        <meta
          name="description"
          content="Run OpenIssuer locally with PostgreSQL, Eureka service discovery, HTTPS tenant hosts, Flyway, and Gradle."
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
          <p className={styles.eyebrow}>Local development</p>
          <h1>Run the same tenant flows on your workstation.</h1>
          <p>
            The local environment uses PostgreSQL, Eureka service discovery, tenant
            hostnames, and an optional trusted HTTPS certificate. Use HTTPS when testing
            browser redirects, tenant isolation, or passkeys.
          </p>

          <section className={styles.docsSection}>
            <h2>Profile convention</h2>
            <dl className={styles.troubleshootingList}>
              <div>
                <dt><code>eureka</code></dt>
                <dd>Local database settings, local ports, Eureka registration, and load-balanced service WebClients.</dd>
              </div>
              <div>
                <dt><code>local-https</code></dt>
                <dd>HTTPS overlay for local certificates and direct authorization-server token and issuer URLs.</dd>
              </div>
              <div>
                <dt><code>non-eureka</code></dt>
                <dd>Direct service URLs for environments such as Kubernetes. Do not combine it with the local Eureka profile.</dd>
              </div>
              <div>
                <dt><code>kubernetes</code></dt>
                <dd>Kubernetes environment values, normally paired with <code>non-eureka</code> in deployed workloads.</dd>
              </div>
            </dl>
            <pre className={styles.commandBlock}><code>{`# Local HTTP
SPRING_PROFILES_ACTIVE=eureka ./gradlew bootRun

# Local HTTPS
SPRING_PROFILES_ACTIVE=eureka,local-https ./gradlew bootRun`}</code></pre>
          </section>

          <section className={styles.docsSection}>
            <h2>Service ports and databases</h2>
            <div className={styles.serviceTable} role="table" aria-label="Local OpenIssuer services">
              <div className={styles.serviceTableHeader} role="row">
                <span role="columnheader">Repository</span>
                <span role="columnheader">Port</span>
                <span role="columnheader">Database</span>
              </div>
              {services.map(([service, port, database]) => (
                <div role="row" key={service}>
                  <strong role="cell">{service}</strong>
                  <code role="cell">{port}</code>
                  <span role="cell">{database}</span>
                </div>
              ))}
            </div>
            <p className={styles.guideNote}>
              Authorization also connects to <code>freeauth</code>, <code>business1auth</code>,
              and <code>business2auth</code> for tenant-specific authorization data.
            </p>
          </section>

          <section className={styles.docsSection}>
            <h2>Start services in dependency order</h2>
            <ol className={styles.stepList}>
              {startupSteps.map((step) => <li key={step}>{step}</li>)}
            </ol>
            <p className={styles.guideNote}>
              Eureka uses <code>test:test</code> locally. Verify registrations at
              <code>http://localhost:8761/eureka/apps</code> before diagnosing WebClient failures.
            </p>
          </section>

          <section className={styles.docsSection}>
            <h2>Configure tenant hostnames</h2>
            <p>Add these entries to <code>/etc/hosts</code>:</p>
            <pre className={styles.commandBlock}><code>{`127.0.0.1 platform.openissuer.test
127.0.0.1 free.openissuer.test business1.openissuer.test business2.openissuer.test
127.0.0.1 platform.admin.openissuer.test free.admin.openissuer.test
127.0.0.1 business1.admin.openissuer.test business2.admin.openissuer.test`}</code></pre>
          </section>

          <section className={styles.docsSection}>
            <h2>Create the local HTTPS certificate</h2>
            <p>Install and trust the local certificate authority once:</p>
            <pre className={styles.commandBlock}><code>{`brew install mkcert nss
mkcert -install
mkdir -p ~/openissuer-local-certs`}</code></pre>
            <p>Create the certificate used by the <code>local-https</code> profile:</p>
            <pre className={styles.commandBlock}><code>{`mkcert \\
  -cert-file ~/openissuer-local-certs/openissuer.test.pem \\
  -key-file ~/openissuer-local-certs/openissuer.test-key.pem \\
  platform.openissuer.test free.openissuer.test \\
  business1.openissuer.test business2.openissuer.test \\
  platform.admin.openissuer.test free.admin.openissuer.test \\
  business1.admin.openissuer.test business2.admin.openissuer.test \\
  authorization-server localhost 127.0.0.1`}</code></pre>
            <p className={styles.guideNote}>
              Fully quit and reopen the browser after installing the local CA. Passkeys
              require a trusted secure context, so tenant passkey testing must use HTTPS.
            </p>
          </section>

          <section className={styles.docsSection}>
            <h2>Run the browser-facing services</h2>
            <pre className={styles.commandBlock}><code>{`# authorization repository
SPRING_PROFILES_ACTIVE=eureka,local-https ./gradlew bootRun

# authzmanager repository
SPRING_PROFILES_ACTIVE=eureka,local-https ./gradlew bootRun

# api-gateway repository
SPRING_PROFILES_ACTIVE=eureka,local-https ./gradlew bootRun`}</code></pre>
            <p>Common local URLs:</p>
            <pre className={styles.commandBlock}><code>{`https://free.openissuer.test:9001
https://business1.openissuer.test:9001
https://free.admin.openissuer.test:9093
https://business1.admin.openissuer.test:9093`}</code></pre>
          </section>

          <section className={styles.docsSection}>
            <h2>Database and Flyway behavior</h2>
            <p>
              Each service applies its Flyway migrations when it starts. Never edit an
              already-applied migration in a persistent environment. Add a new migration
              for an incremental schema change.
            </p>
            <div className={styles.warningBlock}>
              A checksum mismatch after an intentional migration squash requires a clean
              local database. Drop and recreate only the affected local application
              database, then restart the service so Flyway can rebuild it. Do not use
              Flyway repair merely to hide an unexpected checksum change.
            </div>
          </section>

          <section className={styles.docsSection}>
            <h2>Run tests and diagnose startup failures</h2>
            <pre className={styles.commandBlock}><code>{`./gradlew test

# Faster compile and test-source verification
./gradlew testClasses`}</code></pre>
            <dl className={styles.troubleshootingList}>
              <div>
                <dt>Unresolved server port</dt>
                <dd>Activate <code>eureka</code> so the local port variables are loaded.</dd>
              </div>
              <div>
                <dt>Eureka returns 401</dt>
                <dd>Confirm the local registry credentials are <code>test:test</code> and the registry is running.</dd>
              </div>
              <div>
                <dt>Service name cannot resolve</dt>
                <dd>Confirm both services use <code>eureka</code> and the target appears in the registry.</dd>
              </div>
              <div>
                <dt>TLS required on this port</dt>
                <dd>Use <code>local-https</code> consistently for services calling the HTTPS authorization server.</dd>
              </div>
              <div>
                <dt>Port already in use</dt>
                <dd>Stop the existing process or verify that another copy of the service is not already running.</dd>
              </div>
            </dl>
          </section>

          <div className={styles.linkGrid}>
            <a href="https://github.com/sonamsamdupkhangsar/authorization/blob/main/docs/07-local-development.md">
              Authorization local HTTPS details
            </a>
            <Link href="/source-repositories">Browse service repositories</Link>
            <Link href="/operations-guide">Continue to Kubernetes operations</Link>
          </div>
        </section>
      </main>
    </>
  )
}
