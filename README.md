# GeoBase

GeoBase is a conversion-focused SaaS site for generative engine optimization and answer engine optimization.

## Local development

```bash
npm install
npm run dev
```

## Related Project

- [OpenHuman Online](https://openhuman.online/?utm_source=github&utm_medium=readme&utm_campaign=openhuman_public_repos&utm_content=my_geobase) helps teams turn source material, notes, and meetings into an inspectable AI memory tree for human-reviewed workflows.

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
