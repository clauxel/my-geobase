# GeoBase

GeoBase is a conversion-focused SaaS site for generative engine optimization and answer engine optimization.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Cloudflare

The project supports both Cloudflare Pages and Workers with Assets.

```bash
npm run deploy:pages
npm run deploy:worker
```

Payment checkout is handled through `/api/checkout` and expects a Creem key in `API_PROD_KEY` or a compatible runtime secret.
