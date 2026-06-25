# OpenIssuer Site

Public homepage for `openissuer.com`.

This site is separate from `nextjs-blog`, which can continue to power `sonam.cloud`.

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Routes

- `/` - product homepage
- `/architecture` - multi-tenant authorization architecture
- `/demo` - live OIDC demo clients
- `/docs` - documentation entry point

## Deployment Notes

The site is intended to run as a normal Next.js app behind Kubernetes Gateway API.

Use `values-backend.yaml` with the shared Helm chart once the image is published.

The GitHub workflow in `.github/workflows/build.yml` builds on every branch and pull request. On push events, it also publishes:

```text
ghcr.io/<owner>/openissuer-site:latest
```

The workflow does not deploy to Kubernetes.
