import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/site.module.css'

const clientSteps = [
  'Open the admin portal for the same tenant host used by the application issuer.',
  'Create the OAuth client and select the required scopes and authorization code grant.',
  'Add the application callback URI exactly, including its base path and provider id.',
  'Submit the client form and store the generated client secret outside source control.',
  'Configure the application with the matching issuer, client id, and client secret.',
]

const userSteps = [
  'Open Organizations and select an organization to view its Details, Roles, and Users tabs.',
  'A SubdomainAdmin can open, rename, and manage users for organizations in the assigned subdomain.',
  'Search for an existing user to add, remove, or change their default organization.',
  'A user must belong to the selected organization before it can become their default organization.',
  'Use the organization Roles tab to create, rename, or delete roles for that organization.',
]

export default function AdminGuide() {
  return (
    <>
      <Head>
        <title>Admin Guide | OpenIssuer</title>
        <meta
          name="description"
          content="Manage OpenIssuer organizations, subdomains, users, OAuth clients, roles, and passkeys."
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
          <p className={styles.eyebrow}>Admin guide</p>
          <h1>Manage a tenant without crossing its boundaries.</h1>
          <p>
            OpenIssuer separates organization administration from subdomain-wide
            administration. Use the narrowest scope that matches the work an
            administrator needs to perform.
          </p>

          <section className={styles.docsSection}>
            <h2>Understand the hierarchy</h2>
            <div className={styles.roleTable} role="table" aria-label="OpenIssuer administration scopes">
              <div className={styles.roleTableHeader} role="row">
                <span role="columnheader">Role</span>
                <span role="columnheader">Scope</span>
                <span role="columnheader">Access</span>
              </div>
              <div role="row">
                <strong role="cell">OrgAdmin</strong>
                <span role="cell">One organization</span>
                <span role="cell">Users, roles, clients, and settings for that organization.</span>
              </div>
              <div role="row">
                <strong role="cell">SubdomainAdmin</strong>
                <span role="cell">One tenant subdomain</span>
                <span role="cell">View and edit organizations and manage their users and roles across that subdomain.</span>
              </div>
            </div>
            <p className={styles.guideNote}>
              Assign a SubdomainAdmin the OrgAdmin role for the organization they use
              as their default organization. Authentication continues to enforce the
              organization-level assignment while the additional role enables
              subdomain-wide administration.
            </p>
          </section>

          <section className={styles.docsSection}>
            <h2>Create an OAuth client</h2>
            <ol className={styles.stepList}>
              {clientSteps.map((step) => <li key={step}>{step}</li>)}
            </ol>
            <div className={styles.calloutInline}>
              <strong>Callback example</strong>
              <code>https://your-app.example.com/api/auth/callback/myauth</code>
            </div>
          </section>

          <section className={styles.docsSection}>
            <h2>Manage organizations and users</h2>
            <ol className={styles.stepList}>
              {userSteps.map((step) => <li key={step}>{step}</li>)}
            </ol>
            <p className={styles.guideNote}>
              SubdomainAdmin access does not make the administrator a member of every
              organization. A user must belong to an organization before it can become
              their default. Operations outside the assigned subdomain are rejected.
            </p>
          </section>

          <section className={styles.docsSection}>
            <h2>Manage organization roles</h2>
            <p>
              Select an organization, then open <strong>Roles</strong>. An OrgAdmin for
              that organization or a SubdomainAdmin for its subdomain can create,
              rename, and delete its roles.
            </p>
            <p className={styles.guideNote}>
              A role is bound to the selected organization when it is created. There
              is no separate role-to-organization assignment step. The organization
              in the URL is authoritative, and cross-subdomain access is rejected.
            </p>
          </section>

          <section className={styles.docsSection}>
            <h2>Delegate subdomain administration</h2>
            <p>
              Open <strong>Subdomain</strong>, then <strong>Users</strong>. Eligible
              users can be assigned or removed with the SubdomainAdmin action in the
              user table.
            </p>
            <p className={styles.guideNote}>
              The user must have a default organization in this subdomain and be
              OrgAdmin for it. The final SubdomainAdmin cannot be removed.
            </p>
          </section>

          <section className={styles.docsSection}>
            <h2>Enroll and use passkeys</h2>
            <p>
              Open <strong>Your Profile</strong>, select <strong>Passkeys</strong>, and
              register a platform authenticator or another device. A user who opens the
              page without an authorization-server session is sent through sign-in
              before passkey management is displayed.
            </p>
            <p className={styles.guideNote}>
              Test from a guest browser profile to verify the complete flow. Cross-device
              authentication may show a QR code and ask for biometric confirmation on
              the device that stores the passkey.
            </p>
          </section>

          <section className={styles.docsSection}>
            <h2>Diagnose common failures</h2>
            <dl className={styles.troubleshootingList}>
              <div>
                <dt>OAuth client not found</dt>
                <dd>Confirm the client was submitted and belongs to the current issuer host.</dd>
              </div>
              <div>
                <dt>Redirect URI mismatch</dt>
                <dd>Match scheme, host, base path, callback path, and provider id exactly.</dd>
              </div>
              <div>
                <dt>User cannot open an organization</dt>
                <dd>Verify the user is OrgAdmin for it or SubdomainAdmin for the subdomain that contains it.</dd>
              </div>
              <div>
                <dt>Organization belongs to another subdomain</dt>
                <dd>Use an organization mapped to the current admin host. Cross-subdomain administration is denied.</dd>
              </div>
              <div>
                <dt>Subdomain menu is missing</dt>
                <dd>Verify the user has a SubdomainAdmin assignment for the current subdomain, then start a new session.</dd>
              </div>
              <div>
                <dt>Passkeys returns unauthorized</dt>
                <dd>Start from the profile link and complete authorization-server sign-in when prompted.</dd>
              </div>
            </dl>
          </section>

          <div className={styles.linkGrid}>
            <Link href="/authorization-roles">Read the scoped authorization model</Link>
            <Link href="/demo">Test a live tenant</Link>
            <Link href="/operations-guide">Operate the Kubernetes deployment</Link>
            <Link href="/docs">Continue to developer documentation</Link>
          </div>
        </section>
      </main>
    </>
  )
}
