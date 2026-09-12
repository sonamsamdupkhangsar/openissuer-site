import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/site.module.css'

const demos = [
  {
    name: 'Demo tenant',
    description: 'A public demo tenant using its own issuer host and NextAuth client.',
    appUrl: 'https://demo.openissuer.com/nextauth',
    adminUrl: 'https://demo.admin.openissuer.com',
    issuer: 'https://demo.openissuer.com/issuer',
    callback: 'https://demo.openissuer.com/nextauth/api/auth/callback/myauth',
  },
]

const demoVideoUrl = 'https://youtu.be/gGxyLnDpPDI'
const demoVideoEmbedUrl = 'https://www.youtube.com/embed/gGxyLnDpPDI'

const passkeyVideos = [
  {
    title: 'Register and sign in with a passkey',
    description:
      'See a user register a passkey with Touch ID, sign out, and return to OpenIssuer using passwordless passkey authentication.',
    url: 'https://youtu.be/UylB9l_U-24',
    embedUrl: 'https://www.youtube.com/embed/UylB9l_U-24',
  },
  {
    title: 'Enforce passkey verification after password login',
    description:
      'See OpenIssuer require the registered passkey as an additional factor after the user verifies a username and password.',
    url: 'https://youtu.be/aIyNOSRlNUk',
    embedUrl: 'https://www.youtube.com/embed/aIyNOSRlNUk',
  },
]

export default function Demo() {
  return (
    <>
      <Head>
        <title>Live OIDC Demo | OpenIssuer</title>
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
          </div>
        </nav>
        <section className={styles.contentPage}>
          <p className={styles.eyebrow}>Demo</p>
          <h1>Try OpenIssuer with the demo NextAuth client.</h1>
          <p>
            The demo uses a live tenant issuer URL and the standard OIDC authorization
            code flow with PKCE through NextAuth. The demo tenant has its own issuer,
            admin portal, client registration, callback URL, and token issuer claim.
          </p>

          <section className={styles.videoSection} aria-labelledby="demo-video">
            <h2 id="demo-video">Watch the demo walkthrough</h2>
            <p>
              This video shows the demo page, tenant admin portal, OAuth client setup,
              and the NextAuth app signing in through OpenIssuer.
            </p>
            <div className={styles.videoFrame}>
              <iframe
                src={demoVideoEmbedUrl}
                title="OpenIssuer demo walkthrough"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className={styles.calloutLinks}>
              <a href={demoVideoUrl}>Open the demo video on YouTube</a>
            </div>
          </section>

          <section className={styles.passkeyVideoSection} aria-labelledby="passkey-videos">
            <p className={styles.eyebrow}>Passkeys</p>
            <h2 id="passkey-videos">Watch passkey authentication in action</h2>
            <p>
              These demonstrations show passwordless passkey sign-in and passkey
              verification enforced as an additional factor after password login.
            </p>
            <div className={styles.passkeyVideoGrid}>
              {passkeyVideos.map((video) => (
                <article className={styles.passkeyVideo} key={video.url}>
                  <div className={styles.videoFrame}>
                    <iframe
                      src={video.embedUrl}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                  <a href={video.url}>Watch on YouTube</a>
                </article>
              ))}
            </div>
          </section>

          <div className={styles.demoGrid}>
            {demos.map((demo) => (
              <article className={styles.demoCard} key={demo.name}>
                <h2>{demo.name}</h2>
                <p>{demo.description}</p>
                <dl className={styles.endpointList}>
                  <div>
                    <dt>App</dt>
                    <dd><a href={demo.appUrl}>{demo.appUrl}</a></dd>
                  </div>
                  <div>
                    <dt>Admin portal</dt>
                    <dd><a href={demo.adminUrl}>{demo.adminUrl}</a></dd>
                  </div>
                  <div>
                    <dt>Issuer</dt>
                    <dd><code>{demo.issuer}</code></dd>
                  </div>
                  <div>
                    <dt>Callback</dt>
                    <dd><code>{demo.callback}</code></dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

          <div className={styles.callout}>
            <h2>What to check after sign-in</h2>
            <p>
              Open the session view in the demo client and check the issuer and tenant
              values. OpenIssuer resolves the authorization request from the demo tenant
              host.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
