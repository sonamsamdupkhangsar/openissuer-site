import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from '../styles/site.module.css'

const passkeyVideos = [
  {
    title: 'Passwordless passkey sign-in',
    description:
      'Register a passkey with Touch ID, sign out, and return to OpenIssuer without entering a password.',
    url: 'https://youtu.be/UylB9l_U-24',
    embedUrl: 'https://www.youtube.com/embed/UylB9l_U-24',
  },
  {
    title: 'Passkey-enforced MFA',
    description:
      'See OpenIssuer require a registered passkey after username and password verification.',
    url: 'https://youtu.be/aIyNOSRlNUk',
    embedUrl: 'https://www.youtube.com/embed/aIyNOSRlNUk',
  },
]

export default function Free() {
  const [expandedImage, setExpandedImage] = useState<{ src: string; alt: string } | null>(null)

  useEffect(() => {
    if (!expandedImage) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpandedImage(null)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [expandedImage])

  return (
    <>
      <Head>
        <title>Try OpenIssuer Free | OAuth2, OIDC, and Passkeys</title>
        <meta
          name="description"
          content="Create a free OpenIssuer evaluation account and try OAuth2 and OpenID Connect authentication with passwordless passkeys and passkey-enforced MFA."
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
          </div>
        </nav>

        <section className={styles.contentPage}>
          <p className={styles.eyebrow}>Free evaluation</p>
          <h1>Try OAuth2, OpenID Connect, and passkeys with OpenIssuer.</h1>
          <p>
            OpenIssuer is an OAuth 2.0 and OpenID Connect authorization service.
            Create a free evaluation account, register an OAuth client for your
            application, and experience user authentication within its authorization
            flows. You can also protect sign-in with passwordless passkeys and
            passkey-enforced multifactor authentication.
          </p>

          <div className={styles.actions}>
            <a href="https://free.openissuer.com" className={styles.primaryAction}>Create a free account</a>
            <Link href="/demo" className={styles.secondaryAction}>Watch all demos</Link>
          </div>

          <section className={styles.docsSection} aria-labelledby="free-capabilities">
            <h2 id="free-capabilities">What you can try</h2>
            <ul>
              <li>Register a tenant-scoped OAuth 2.0/OpenID Connect client.</li>
              <li>Connect your own application using the authorization code flow.</li>
              <li>Inspect the identity, issuer, and tenant claims returned to your application.</li>
              <li>Protect user authentication with a WebAuthn passkey.</li>
              <li>Compare passwordless sign-in with passkey-enforced MFA.</li>
            </ul>
          </section>

          <section className={styles.docsSection} aria-labelledby="getting-started">
            <h2 id="getting-started">Create your account</h2>
            <ol>
              <li>Visit <a href="https://free.openissuer.com">free.openissuer.com</a>.</li>
              <li>Select <strong>Sign up</strong> and create an account.</li>
              <li>Activate the account using the link sent to your email.</li>
            </ol>
          </section>

          <section className={styles.screenshotSection} aria-labelledby="free-workflow">
            <p className={styles.eyebrow}>How it works</p>
            <h2 id="free-workflow">From signup to a working OpenID Connect client</h2>
            <p>
              Create an account and organization, register a confidential OAuth client,
              and use it to sign in to a local NextAuth application.
            </p>
            <div className={styles.screenshotGrid}>
              <figure className={styles.screenshotStep}>
                <button
                  className={styles.screenshotButton}
                  type="button"
                  onClick={() => setExpandedImage({
                    src: '/images/free/create-account.png',
                    alt: 'OpenIssuer free account signup form completed with example user and organization details',
                  })}
                  aria-label="Enlarge the account signup screenshot"
                >
                  <img
                    src="/images/free/create-account.png"
                    alt="OpenIssuer free account signup form completed with example user and organization details"
                    width="1449"
                    height="1274"
                  />
                </button>
                <figcaption><strong>1. Create your account</strong> Sign up with your user and organization details.</figcaption>
              </figure>
              <figure className={styles.screenshotStep}>
                <button
                  className={styles.screenshotButton}
                  type="button"
                  onClick={() => setExpandedImage({
                    src: '/images/free/oauth-client-created.png',
                    alt: 'OpenIssuer Admin showing a newly created OAuth client with authorization code and OpenID Connect settings',
                  })}
                  aria-label="Enlarge the OAuth client screenshot"
                >
                  <img
                    src="/images/free/oauth-client-created.png"
                    alt="OpenIssuer Admin showing a newly created OAuth client with authorization code and OpenID Connect settings"
                    width="1376"
                    height="1554"
                  />
                </button>
                <figcaption><strong>2. Register an OAuth client</strong> Configure the grant, scopes, secret, and callback URI.</figcaption>
              </figure>
              <figure className={styles.screenshotStep}>
                <button
                  className={styles.screenshotButton}
                  type="button"
                  onClick={() => setExpandedImage({
                    src: '/images/free/nextauth-ready.png',
                    alt: 'Local NextAuth example application ready to sign in through OpenIssuer',
                  })}
                  aria-label="Enlarge the NextAuth application screenshot"
                >
                  <img
                    src="/images/free/nextauth-ready.png"
                    alt="Local NextAuth example application ready to sign in through OpenIssuer"
                    width="1391"
                    height="1171"
                  />
                </button>
                <figcaption><strong>3. Connect your application</strong> Start the local NextAuth client with your OpenIssuer configuration.</figcaption>
              </figure>
              <figure className={styles.screenshotStep}>
                <button
                  className={styles.screenshotButton}
                  type="button"
                  onClick={() => setExpandedImage({
                    src: '/images/free/identity-claims.png',
                    alt: 'NextAuth example showing the authenticated OpenIssuer identity and OpenID Connect claims',
                  })}
                  aria-label="Enlarge the identity claims screenshot"
                >
                  <img
                    src="/images/free/identity-claims.png"
                    alt="NextAuth example showing the authenticated OpenIssuer identity and OpenID Connect claims"
                    width="1350"
                    height="1399"
                  />
                </button>
                <figcaption><strong>4. Verify the identity</strong> Sign in and inspect the issuer, tenant, and identity claims.</figcaption>
              </figure>
            </div>
          </section>

          {expandedImage && (
            <div
              className={styles.imageLightbox}
              role="dialog"
              aria-modal="true"
              aria-label="Expanded screenshot"
              onClick={() => setExpandedImage(null)}
            >
              <div className={styles.imageLightboxContent} onClick={(event) => event.stopPropagation()}>
                <button
                  className={styles.imageLightboxClose}
                  type="button"
                  onClick={() => setExpandedImage(null)}
                  autoFocus
                >
                  Close
                </button>
                <img src={expandedImage.src} alt={expandedImage.alt} />
              </div>
            </div>
          )}

          <section className={styles.videoSection} aria-labelledby="oauth-client-video">
            <p className={styles.eyebrow}>Free account walkthrough</p>
            <h2 id="oauth-client-video">Create an account and connect NextAuth</h2>
            <p>
              This walkthrough shows free account signup and activation, OAuth client
              registration, local NextAuth configuration, and an application signing in
              through OpenIssuer with OpenID Connect.
            </p>
            <div className={styles.videoFrame}>
              <iframe
                src="https://www.youtube.com/embed/YBAKGMEpAJ4"
                title="Create a free OpenIssuer account, register an OAuth client, and connect NextAuth"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className={styles.calloutLinks}>
              <a href="https://youtu.be/YBAKGMEpAJ4">Watch the free account walkthrough on YouTube</a>
              <a href="https://demo.openissuer.com/nextauth">Open the live NextAuth demo client</a>
            </div>
          </section>

          <section className={styles.docsSection} aria-labelledby="connect-application">
            <h2 id="connect-application">Connect your own application</h2>
            <p>
              The passkey experience protects the user authentication step of a real
              OAuth 2.0 or OpenID Connect authorization flow. Free users can register
              an OAuth client in the tenant admin portal and connect an application to
              the free issuer.
            </p>
            <ol>
              <li>Open <a href="https://free.admin.openissuer.com">free.admin.openissuer.com</a>.</li>
              <li>Create an OAuth client using the authorization code grant.</li>
              <li>Add your application's redirect URI and select its scopes.</li>
              <li>Configure the application to use the OpenIssuer client credentials and issuer.</li>
              <li>Start the sign-in flow and inspect the returned identity and tenant claims.</li>
            </ol>
            <div className={styles.calloutInline}>
              <strong>NextAuth callback example</strong>
              <code>https://your-app.example.com/api/auth/callback/myauth</code>
            </div>
            <div className={styles.calloutLinks}>
              <Link href="/docs">Read the integration guide</Link>
              <Link href="/admin-guide">Read the OAuth client setup guide</Link>
              <a href="https://github.com/sonamsamdupkhangsar/next-auth-example">View the NextAuth example source</a>
              <a href="https://demo.openissuer.com/nextauth">Open the NextAuth demo client</a>
            </div>
          </section>

          <section className={styles.docsSection} aria-labelledby="secure-with-passkeys">
            <h2 id="secure-with-passkeys">Secure sign-in with a passkey</h2>
            <ol>
              <li>Return to <a href="https://free.openissuer.com">free.openissuer.com</a>.</li>
              <li>Sign in and select <strong>Manage your account</strong>.</li>
              <li>Open <strong>Passkeys</strong> and register your device.</li>
              <li>Sign out and select <strong>Sign in with a passkey</strong>.</li>
            </ol>
            <p>
              Your biometric information remains on your device. OpenIssuer receives
              the cryptographic WebAuthn response used to verify the passkey.
            </p>
          </section>

          <section className={styles.passkeyVideoSection} aria-labelledby="free-videos">
            <p className={styles.eyebrow}>Passkey demonstrations</p>
            <h2 id="free-videos">See both authentication modes</h2>
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

          <div className={styles.callout}>
            <h2>Evaluation use</h2>
            <p>
              The free environment is intended for evaluation, learning, and feedback.
              Do not use it for production applications or sensitive data.
            </p>
            <div className={styles.calloutLinks}>
              <a href="https://free.openissuer.com">Try OpenIssuer free</a>
              <Link href="/security">Review security and trust guidance</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
