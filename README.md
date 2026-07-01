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

## Deploy to Kubernetes

Run these commands from this repository after the GitHub build has published the image.

```bash
export KUBECONFIG=/Users/sonamsamdupkhangsar/Documents/github/do-k8-terraform-1/utils/kubeconfig_tutorial-1.yaml

helm repo add sonam https://sonamsamdupkhangsar.github.io/sonam-helm-chart/
helm repo update

helm upgrade --install openissuer-site sonam/mychart \
  -f values-backend.yaml \
  --set image.repository=ghcr.io/sonamsamdupkhangsar/openissuer-site \
  --set image.tag=latest \
  --version 0.1.28 \
  --namespace main
```

Check the deployment:

```bash
kubectl get pods -n main | grep openissuer-site
kubectl get httproute -n main | grep openissuer-site
```

Then open:

```text
https://openissuer.com
```
