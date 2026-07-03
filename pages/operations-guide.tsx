import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/site.module.css'

const releaseChecks = [
  'Confirm CloudNativePG clusters report a healthy primary before starting applications.',
  'Confirm required Kubernetes and Sealed Secrets exist in the configured namespace.',
  'Run Helmfile from the deployment repository so sibling values paths resolve correctly.',
  'Wait for deployment rollouts and inspect pod age, readiness, and logs.',
  'Smoke-test tenant login, OAuth callback, admin access, and passkey management.',
]

export default function OperationsGuide() {
  return (
    <>
      <Head>
        <title>Kubernetes Operations Guide | OpenIssuer</title>
        <meta
          name="description"
          content="Deploy and operate OpenIssuer with Terraform, CloudNativePG, Sealed Secrets, Helmfile, and Kubernetes Gateway API."
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
          <p className={styles.eyebrow}>Operations guide</p>
          <h1>Deploy the platform in a predictable order.</h1>
          <p>
            Terraform owns infrastructure and PostgreSQL. Helmfile owns the OpenIssuer
            application releases. Keeping that boundary clear makes deployment,
            recovery, and troubleshooting substantially safer.
          </p>

          <div className={styles.detailGrid}>
            <article>
              <h2>Terraform</h2>
              <p>Cluster services, Gateway API dependencies, DNS, certificates, and CloudNativePG.</p>
            </article>
            <article>
              <h2>Sealed Secrets</h2>
              <p>Registry, service credentials, tenant seed configuration, and other sensitive values.</p>
            </article>
            <article>
              <h2>Helmfile</h2>
              <p>Application releases and their repository-specific Helm values in the configured namespace.</p>
            </article>
          </div>

          <div className={styles.callout}>
            <h2>Namespace convention</h2>
            <p>
              The reference deployment currently uses <code>main</code>, but OpenIssuer
              does not require that namespace. Set the namespace consistently in
              Terraform, Helmfile, Helm values, secrets, and Gateway API resources. The
              commands below use an environment variable so the value can be changed.
            </p>
            <pre className={styles.commandBlock}><code>{`export NAMESPACE=main`}</code></pre>
          </div>

          <section className={styles.docsSection}>
            <h2>1. Provision platform resources</h2>
            <p>Run the deployment Makefile from the Terraform repository root:</p>
            <pre className={styles.commandBlock}><code>{`make platform-init
make platform-apply
make platform-output
make generate-utils-vars
make utils-init
make utils-apply`}</code></pre>
            <p className={styles.guideNote}>
              The Makefile loads secret Terraform variables from macOS Keychain. Do not
              commit DigitalOcean tokens, PostgreSQL passwords, or generated tfvars.
            </p>
          </section>

          <section className={styles.docsSection}>
            <h2>2. Verify PostgreSQL</h2>
            <p>
              OpenIssuer uses one CloudNativePG cluster per application database. The
              reference configuration provisions 5 GiB volumes in the configured namespace.
            </p>
            <pre className={styles.commandBlock}><code>{`kubectl get clusters.postgresql.cnpg.io -n "$NAMESPACE"
kubectl get pvc -n "$NAMESPACE"
kubectl get pods -n "$NAMESPACE"`}</code></pre>
            <p className={styles.guideNote}>
              Continue only when every required database cluster reports a healthy
              primary and its PVC is bound.
            </p>
          </section>

          <section className={styles.docsSection}>
            <h2>3. Apply application secrets</h2>
            <p>Create or refresh the registry and service secrets through the repository targets:</p>
            <pre className={styles.commandBlock}><code>{`make github-registry-secret
make account-rest-service-secret
make email-rest-service-secret
make do-s3-secret`}</code></pre>
            <p>
              Tenant seed values are converted into <code>SPRING_APPLICATION_JSON</code>
              and sealed before they are stored in the cluster. For the current zsh-based
              local setup, run:
            </p>
            <pre className={styles.commandBlock}><code>{`NAMESPACE="$NAMESPACE" ./scripts/apply-authorization-seed-from-zshrc.sh
kubectl get sealedsecret authorization-seed -n "$NAMESPACE"
kubectl get secret authorization-seed -n "$NAMESPACE"`}</code></pre>
          </section>

          <section className={styles.docsSection}>
            <h2>4. Deploy applications with Helmfile</h2>
            <p>From the deployment repository root, synchronize all managed releases:</p>
            <pre className={styles.commandBlock}><code>{`helmfile sync`}</code></pre>
            <p>Deploy or update one application by its Helmfile release name:</p>
            <pre className={styles.commandBlock}><code>{`helmfile -l name=authorization-server sync
helmfile -l name=attempt-rest-service sync`}</code></pre>
            <p className={styles.guideNote}>
              Helmfile release names match Kubernetes workload names. Internal WebClient
              calls resolve Kubernetes Service names supplied by each chart&apos;s
              <code>fullnameOverride</code>.
            </p>
          </section>

          <section className={styles.docsSection}>
            <h2>5. Handle reusable image tags</h2>
            <p>
              A tag such as <code>latest</code> can point to a new image without
              changing the Deployment manifest. Helmfile therefore may have nothing to
              update. Force new pods after the image has been published:
            </p>
            <pre className={styles.commandBlock}><code>{`kubectl rollout restart deployment/authorization-server -n "$NAMESPACE"
kubectl rollout status deployment/authorization-server -n "$NAMESPACE"`}</code></pre>
            <p>
              <code>RESTARTS</code> counts container restarts inside a pod. A successful
              rollout normally creates a new pod with a recent age and a restart count of zero.
            </p>
          </section>

          <section className={styles.docsSection}>
            <h2>6. Verify a release</h2>
            <ol className={styles.stepList}>
              {releaseChecks.map((step) => <li key={step}>{step}</li>)}
            </ol>
            <pre className={styles.commandBlock}><code>{`helm list -n "$NAMESPACE"
kubectl get deployments,pods,httproutes -n "$NAMESPACE"
kubectl logs -n "$NAMESPACE" deployment/authorization-server --tail=100`}</code></pre>
          </section>

          <section className={styles.docsSection}>
            <h2>Database reset and recovery</h2>
            <p>
              Deleting CloudNativePG clusters or PVCs permanently removes application
              data. Scale dependent applications down first, confirm backups or accept
              the data loss, remove only the intended database resources, and reapply
              Terraform from the <code>utils</code> directory. Start applications only
              after every recreated cluster and PVC is healthy.
            </p>
            <div className={styles.warningBlock}>
              Do not use broad deletion commands until <code>kubectl get</code> output has
              been reviewed. Terraform must be run from <code>platform</code> or
              <code>utils</code>; running it from the repository root has no configuration.
            </div>
          </section>

          <section className={styles.docsSection}>
            <h2>Rollback and diagnose</h2>
            <dl className={styles.troubleshootingList}>
              <div>
                <dt>Image did not change</dt>
                <dd>Confirm the registry build completed, then force a rollout for reusable tags.</dd>
              </div>
              <div>
                <dt>InvalidImageName</dt>
                <dd>Inspect the release values and confirm both image repository and tag are present.</dd>
              </div>
              <div>
                <dt>Helm operation in progress</dt>
                <dd>Inspect Helm history and release status before retrying or rolling back.</dd>
              </div>
              <div>
                <dt>Route returns 404 or misses CSS</dt>
                <dd>Inspect the HTTPRoute path prefixes and verify the request reaches the intended Service.</dd>
              </div>
              <div>
                <dt>Application starts before its schema exists</dt>
                <dd>Verify database readiness and review Flyway output before restarting the service.</dd>
              </div>
            </dl>
            <pre className={styles.commandBlock}><code>{`helm history authorization-server -n "$NAMESPACE"
helm rollback authorization-server REVISION -n "$NAMESPACE"
kubectl describe pod POD_NAME -n "$NAMESPACE"`}</code></pre>
          </section>

          <div className={styles.linkGrid}>
            <Link href="/security">Review production security controls</Link>
            <Link href="/local-development">Set up local development</Link>
            <Link href="/source-repositories">Browse infrastructure and service repositories</Link>
            <Link href="/architecture">Review the platform architecture</Link>
            <Link href="/docs">Return to developer documentation</Link>
          </div>
        </section>
      </main>
    </>
  )
}
