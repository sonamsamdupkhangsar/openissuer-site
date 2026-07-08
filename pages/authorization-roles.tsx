import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/site.module.css'

export default function AuthorizationRoles() {
  return (
    <>
      <Head>
        <title>Scoped Authorization Roles | OpenIssuer</title>
        <meta
          name="description"
          content="Understand OpenIssuer organization and subdomain administrator scopes."
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
          <p className={styles.eyebrow}>Authorization model</p>
          <h1>Administrative access is explicitly scoped.</h1>
          <p>
            OpenIssuer stores AuthzManager privileges as assignments to either an
            organization or a tenant subdomain. Application roles remain separate
            from these administrative assignments.
          </p>

          <section className={styles.docsSection}>
            <h2>Role scopes</h2>
            <div className={styles.roleTable} role="table" aria-label="Administrative role scopes">
              <div className={styles.roleTableHeader} role="row">
                <span role="columnheader">Role</span>
                <span role="columnheader">Scope</span>
                <span role="columnheader">Purpose</span>
              </div>
              <div role="row">
                <strong role="cell">OrgAdmin</strong>
                <span role="cell">Organization ID</span>
                <span role="cell">Admin login and management for one organization.</span>
              </div>
              <div role="row">
                <strong role="cell">SubdomainAdmin</strong>
                <span role="cell">Subdomain ID</span>
                <span role="cell">Administration across organizations mapped to one subdomain.</span>
              </div>
            </div>
          </section>

          <section className={styles.docsSection}>
            <h2>Assignment storage</h2>
            <p>
              The role service stores assignments in
              {' '}<code>Authz_Manager_Role_Assignment</code>. The
              {' '}<code>scope_type</code> is <code>ORGANIZATION</code> or
              {' '}<code>SUBDOMAIN</code>, and <code>scope_id</code> contains the
              corresponding UUID.
            </p>
          </section>

          <section className={styles.docsSection}>
            <h2>Administrative capabilities</h2>
            <div className={styles.roleTable} role="table" aria-label="Administrative capabilities">
              <div className={styles.roleTableHeader} role="row">
                <span role="columnheader">Capability</span>
                <span role="columnheader">OrgAdmin</span>
                <span role="columnheader">SubdomainAdmin</span>
              </div>
              <div role="row">
                <strong role="cell">Organizations</strong>
                <span role="cell">View and edit the assigned organization.</span>
                <span role="cell">View and edit organizations in the assigned subdomain.</span>
              </div>
              <div role="row">
                <strong role="cell">Organization users</strong>
                <span role="cell">Search, add, remove, and set defaults in the assigned organization.</span>
                <span role="cell">Perform the same operations across the assigned subdomain.</span>
              </div>
              <div role="row">
                <strong role="cell">Default organization</strong>
                <span role="cell">Available only when the affected user belongs to the organization.</span>
                <span role="cell">Subdomain access does not create organization membership.</span>
              </div>
              <div role="row">
                <strong role="cell">Subdomain administrators</strong>
                <span role="cell">No subdomain-wide delegation.</span>
                <span role="cell">Assign or remove eligible administrators in the same subdomain.</span>
              </div>
              <div role="row">
                <strong role="cell">Role management</strong>
                <span role="cell">Create, edit, and delete roles in the assigned organization.</span>
                <span role="cell">Create, edit, and delete roles from an organization&apos;s Roles tab within the assigned subdomain.</span>
              </div>
            </div>
            <p className={styles.guideNote}>
              Every SubdomainAdmin operation verifies that the target organization
              belongs to the current subdomain. Cross-subdomain access is rejected.
              Roles are bound to their organization when created; there is no separate
              role-to-organization assignment step.
            </p>
          </section>

          <section className={styles.docsSection}>
            <h2>Current login behavior</h2>
            <p>
              AuthzManager login resolves the organization associated with the admin
              host and requires an OrgAdmin assignment for that organization.
              SubdomainAdmin does not currently satisfy this check by itself.
            </p>
            <pre className={styles.commandBlock}><code>{`GET /roles/authzmanagerroles/users/{userId}/organizations/{organizationId}/org-admin`}</code></pre>
            <p className={styles.guideNote}>
              A subdomain administrator currently also needs OrgAdmin for the
              organization used to enter AuthzManager. Removing that duplicate
              assignment requires implementing SubdomainAdmin implication during the
              authorization check.
            </p>
          </section>

          <section className={styles.docsSection}>
            <h2>Manage subdomain administrators</h2>
            <p>
              A current SubdomainAdmin can assign or remove the role from the
              subdomain users page. A candidate must have a default organization in
              the same subdomain and must already be OrgAdmin for that organization.
            </p>
            <p className={styles.guideNote}>
              OpenIssuer rejects cross-subdomain management, duplicate assignments,
              and removal of the final SubdomainAdmin for a subdomain.
            </p>
          </section>

          <div className={styles.linkGrid}>
            <Link href="/admin-guide">Continue to the administration guide</Link>
            <Link href="/architecture">Review the platform architecture</Link>
            <Link href="/docs">Return to documentation</Link>
          </div>
        </section>
      </main>
    </>
  )
}
