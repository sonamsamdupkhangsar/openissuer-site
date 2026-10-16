import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/site.module.css'

export default function TenantProvisioning() {
  return (
    <>
      <Head>
        <title>Request a Tenant | OpenIssuer</title>
        <meta
          name="description"
          content="Learn how to request and track a dedicated OpenIssuer tenant."
        />
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
          <p className={styles.eyebrow}>Dedicated tenants</p>
          <h1>Request a new OpenIssuer tenant.</h1>
          <p>
            An approved platform user can request an isolated OpenIssuer environment
            from the tenant portal. The request is reviewed before infrastructure is
            created, so submitting the form does not immediately deploy a tenant.
          </p>

          <section className={styles.docsSection} aria-labelledby="automation">
            <p className={styles.eyebrow}>How it works</p>
            <h2 id="automation">A protected provisioning workflow</h2>
            <p>
              OpenIssuer connects the tenant portal to a reviewable infrastructure
              workflow. Approval produces a Terraform pull request; protected checks
              validate the generated environment before the apply job creates the
              namespace, PostgreSQL databases, gateway routes, secrets, and seed data.
              The workflow then calls back with <strong>READY</strong>, so the issuer and
              admin URLs are available without manually coordinating each deployment step.
            </p>
            <ol className={styles.stepList}>
              <li>Submit the tenant form and track the request in the portal.</li>
              <li>Approve the request from the platform administration view.</li>
              <li>Review the generated Terraform plan and let protected automation apply it.</li>
              <li>Use the issuer and admin URLs after the request reaches <strong>READY</strong>.</li>
            </ol>
          </section>

          <section className={styles.docsSection} aria-labelledby="request-steps">
            <h2 id="request-steps">Request steps</h2>
            <ol className={styles.stepList}>
              <li>
                Create or activate your account at{' '}
                <a href="https://platform.openissuer.com">platform.openissuer.com</a>.
              </li>
              <li>
                Open <a href="https://tenant-portal.openissuer.com">tenant-portal.openissuer.com</a>{' '}
                and sign in with that account.
              </li>
              <li>
                Enter a friendly tenant name and a unique lowercase subdomain. The
                subdomain becomes the tenant host, such as{' '}
                <code>acme-demo.openissuer.com</code>.
              </li>
              <li>
                Enter the seed administrator&apos;s first name, last name, and email
                address. This user receives the activation email for the new tenant.
              </li>
              <li>
                Select the deployment region and choose <strong>Request tenant</strong>.
                Request history shows the current status.
              </li>
            </ol>
          </section>

          <section className={styles.screenshotSection} aria-labelledby="request-form">
            <p className={styles.eyebrow}>Tenant portal</p>
            <h2 id="request-form">Complete the request form</h2>
            <p>
              Use a unique lowercase subdomain and an administrator email you control.
              The example values below are for illustration only.
            </p>
            <figure className={styles.screenshotStep}>
              <img
                className={styles.tenantRequestScreenshot}
                src="/docs/tenant-request-form.png"
                alt="Tenant portal request form with example tenant and seed administrator values"
                width="1832"
                height="858"
              />
              <figcaption>
                <strong>Submit the request</strong>
                Your request appears in request history after submission. For this example,
                the generated admin URL is{' '}
                <a href="https://pr-test-20.admin.openissuer.com">pr-test-20.admin.openissuer.com</a>.
              </figcaption>
            </figure>
            <p className={styles.callout}>
              <strong>Testing note:</strong> The <code>pr-test-20</code> issuer is a
              disposable test tenant. It may be unavailable while provisioning or
              retirement is being tested, and its hostname may change over time.
            </p>
            <div className={styles.calloutLinks}>
              <a href="https://pr-test-20.openissuer.com">Try the pr-test-20 tenant issuer (when available)</a>
            </div>
          </section>

          <section className={styles.screenshotSection} aria-labelledby="admin-review">
            <p className={styles.eyebrow}>Platform administration</p>
            <h2 id="admin-review">Review the request</h2>
            <p>
              A platform administrator reviews the request in the approvals view before
              provisioning begins. The example below uses <code>pr-test-20</code>; seed
              first and last names are redacted.
            </p>
            <figure className={styles.screenshotStep}>
              <img
                className={styles.tenantRequestScreenshot}
                src="/docs/tenant-approval-dashboard.png"
                alt="Sanitized tenant approvals view showing pr-test-20 with redacted seed names"
                width="1436"
                height="1095"
              />
              <figcaption>
                <strong>Approve or cancel</strong>
                Requests are grouped by requester, with status and pagination controls for review.
              </figcaption>
            </figure>
          </section>

          <section className={styles.docsSection} aria-labelledby="statuses">
            <h2 id="statuses">Request statuses</h2>
            <div className={styles.callout}>
              <p>
                <strong>PENDING</strong> means the request was submitted.{' '}
                <strong>VALIDATING</strong> means the provisioning workflow is checking
                the generated configuration. <strong>PROVISIONING</strong> means the
                infrastructure is being created. <strong>READY</strong> means the tenant
                URLs are available. Failed or cancelled requests can be reviewed before
                submitting a new request.
              </p>
            </div>
          </section>
        </section>
      </main>
    </>
  )
}
