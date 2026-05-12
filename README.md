# VeoVido

VeoVido is a conversion-focused SaaS site for a selfie-to-cinematic-video workflow around the search intent "Veo 3 video generator".

The structure uses a static SaaS landing architecture:

- Static first screen and SEO pages in `public/`
- Plan confirmation and centered Creem checkout popup
- Cloudflare Pages Functions in `functions/`
- Cloudflare Worker Assets deployment in `worker/`
- First-party analytics endpoint with optional Cloudflare KV persistence
