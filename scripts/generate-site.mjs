import { mkdir, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { deflateSync } from 'node:zlib'

const root = new URL('..', import.meta.url)
const publicDir = new URL('public/', root)
const assetsDir = new URL('public/assets/', root)
const siteUrl = 'https://veovido.space'
const today = new Date().toISOString().slice(0, 10)

const keywordPages = [
  {
    keyword: 'Veo AI video generator',
    slug: 'veo-ai-video-generator',
    title: 'Veo AI Video Generator for Selfie-to-Movie Scenes',
    description: 'A practical guide to using a Veo AI video generator workflow for cinematic selfie videos, scene formats, voice, friends, and social exports.',
    intent: 'People searching this phrase usually want to turn a prompt or image into a polished short video without learning a production pipeline.',
    angle: 'VeoVido narrows that job to a conversion-ready flow: upload one selfie, pick a cinematic scene format, choose the role, and create a shareable 15 to 60 second movie clip.',
    caution: 'Always use faces, voices, and likenesses you have permission to use.',
  },
  {
    keyword: 'Veo 3 Google AI',
    slug: 'veo-3-google-ai',
    title: 'Veo 3 Google AI: What Creators Need Before They Generate',
    description: 'Understand the creative workflow around Veo 3 Google AI and how a selfie-led SaaS flow can make cinematic clips easier to plan and share.',
    intent: 'The search intent is usually research-oriented: what Veo 3 is, how Google AI video generation fits into creator workflows, and what a practical product flow should include.',
    angle: 'VeoVido focuses on the product layer around that intent: identity-safe selfie upload, genre scene formats, script controls, voice options, and export sizes for social video.',
    caution: 'VeoVido is an independent SaaS concept and is not affiliated with Google.',
  },
  {
    keyword: 'Veo 3 AI video',
    slug: 'veo-3-ai-video',
    title: 'Veo 3 AI Video Workflow for Personal Movie Clips',
    description: 'Plan a Veo 3 AI video workflow from selfie upload to cinematic scene selection, dialogue, voice, export, and sharing.',
    intent: 'Searchers want to know how to make a finished AI video instead of stopping at a raw generated shot.',
    angle: 'The useful workflow is not just prompt in, video out. It needs a character anchor, a role, a scene language, shot continuity, audio, and the right export format.',
    caution: 'Short AI clips should be reviewed before publication for likeness, copyright, and platform rules.',
  },
  {
    keyword: 'Veo 3 AI free unlimited',
    slug: 'veo-3-ai-free-unlimited',
    title: 'Veo 3 AI Free Unlimited: What Is Realistic for Creators',
    description: 'A clear explanation of free-unlimited Veo 3 AI claims, what costs money in video generation, and how to plan an affordable workflow.',
    intent: 'This query often comes from creators trying to avoid wasted credits or unclear trial pages.',
    angle: 'VeoVido makes pricing explicit: one clean HD generation for Star, a Director subscription for repeat creators, and Studio for high-volume teams.',
    caution: 'Free-unlimited claims are often misleading because high-quality video generation, storage, voice, and 4K exports all create real infrastructure cost.',
  },
  {
    keyword: 'Veo 3 Flow',
    slug: 'veo-3-flow',
    title: 'Veo 3 Flow: A Practical Creation Flow for Short Films',
    description: 'Build a practical Veo 3 Flow for selfie-led AI films: upload, choose genre, set role, add voice, invite friends, and export.',
    intent: 'Searchers want an organized production path rather than a blank prompt box.',
    angle: 'VeoVido turns the flow into a guided studio where each step improves conversion: identity, genre, plot, performance, voice, and social output.',
    caution: 'A strong flow should reduce creative friction without hiding consent and review requirements.',
  },
  {
    keyword: 'Gemini Veo 3 AI',
    slug: 'gemini-veo-3-ai',
    title: 'Gemini Veo 3 AI: From Prompt Idea to Shareable Clip',
    description: 'How Gemini Veo 3 AI interest maps to a creator workflow for short cinematic videos, with guidance on prompts, roles, voices, and exports.',
    intent: 'Many users search this phrase when they hear about Google AI video in the Gemini ecosystem and want a practical way to create.',
    angle: 'VeoVido is designed as the product experience around the creative moment: it captures the person, builds the movie scene, and prepares the share format.',
    caution: 'Keep brand, platform, and model availability claims current before publishing paid ads or public comparisons.',
  },
  {
    keyword: 'Google AI video generator',
    slug: 'google-ai-video-generator',
    title: 'Google AI Video Generator Alternatives for Personal Movie Moments',
    description: 'Compare what creators expect from a Google AI video generator with a selfie-to-movie SaaS workflow built for conversion and sharing.',
    intent: 'The broad query includes researchers, creators, and marketers comparing AI video options.',
    angle: 'A focused product can convert better than a generic generator when it gives users a concrete job: become the hero of a movie-style short.',
    caution: 'This page discusses search intent and creator workflows; it does not claim official Google affiliation.',
  },
  {
    keyword: 'Gemini Veo 3 free',
    slug: 'gemini-veo-3-free',
    title: 'Gemini Veo 3 Free: Trial Planning and Paid Export Reality',
    description: 'What to consider when looking for Gemini Veo 3 free access, including trial limits, export quality, voice, rights, and paid workflows.',
    intent: 'People want to test AI video before paying, but they also want a real result worth sharing.',
    angle: 'VeoVido can support a low-friction entry by letting users plan the clip first, then pay only when they are ready for a clean export.',
    caution: 'Free trials should be evaluated by output quality, watermark policy, privacy, and the ability to finish the video.',
  },
  {
    keyword: 'Veo AI',
    slug: 'veo-ai',
    title: 'Veo AI for Creators: The Selfie-to-Cinema Use Case',
    description: 'A useful overview of Veo AI search intent and how creators can turn AI video interest into cinematic clips with a guided SaaS flow.',
    intent: 'This short query can mean several things, so the page helps creators pick the right path.',
    angle: 'For personal video creation, the strongest product angle is not a generic model page. It is a memorable transformation: upload a selfie and become the lead character.',
    caution: 'Because Veo can also refer to other products, clear page copy reduces wrong-click traffic.',
  },
  {
    keyword: 'Veo price',
    slug: 'veo-price',
    title: 'Veo Price Guide: How to Think About AI Video Cost',
    description: 'A practical Veo price guide for AI video shoppers comparing one-off generations, subscriptions, 4K exports, voice, storage, and API access.',
    intent: 'The user is usually comparing cost before choosing a tool.',
    angle: 'VeoVido keeps the buying decision simple with Star for a single clip, Director for repeat creators, and Studio for teams and API use.',
    caution: 'The right price depends on render length, resolution, voice cloning, storage, and whether commercial use is included.',
  },
  {
    keyword: 'Veo sports',
    slug: 'veo-sports',
    title: 'Veo Sports Search Intent: AI Highlights vs Sports Cameras',
    description: 'Clarify Veo sports search intent and learn how cinematic AI sports highlight scenes differ from sports camera and analysis products.',
    intent: 'Some searchers mean sports camera systems; others want AI-generated sports highlight videos.',
    angle: 'VeoVido is for cinematic sports fantasy scenes such as last-second shots, walkout clips, training montages, and fan edits starring the uploaded person.',
    caution: 'VeoVido is not a sports camera, match recording system, or official team analysis platform.',
  },
  {
    keyword: 'Veo camera',
    slug: 'veo-camera',
    title: 'Veo Camera vs AI Movie Generator: Choose the Right Tool',
    description: 'Understand the difference between Veo camera searches and a Veo 3 video generator workflow for cinematic personal videos.',
    intent: 'This query often points to hardware research, but some users are looking for AI video creation.',
    angle: 'If the goal is to record real sports matches, a camera product is the right category. If the goal is a movie-style generated clip, VeoVido is the relevant workflow.',
    caution: 'Use accurate product language so hardware shoppers and AI video creators both find the correct next step.',
  },
  {
    keyword: 'Veo watch',
    slug: 'veo-watch',
    title: 'Veo Watch: Watching, Sharing, and Reviewing AI Video Clips',
    description: 'A useful guide for people searching Veo watch, covering playback expectations, social exports, review steps, and creator sharing workflows.',
    intent: 'The query can mean watching Veo-related videos, product demos, or generated clips.',
    angle: 'VeoVido treats viewing as part of conversion: preview the scene, approve the likeness, export the right aspect ratio, and share with a caption that fits the platform.',
    caution: 'Review generated media before sharing, especially when faces, friends, voice, or sensitive scenes are involved.',
  },
  {
    keyword: 'Veo 3 AI',
    slug: 'veo-3-ai',
    title: 'Veo 3 AI: Creator Workflow, Use Cases, and Pricing Signals',
    description: 'A practical Veo 3 AI guide for creators who want movie-style clips, social-ready exports, voice options, and clear pricing.',
    intent: 'This is a broad commercial research query with strong curiosity and early buying intent.',
    angle: 'VeoVido answers the concrete creator question: how do I become the main character in a short video without directing every technical detail?',
    caution: 'Broad AI model searches need natural explanations and useful next steps rather than keyword stuffing.',
  },
  {
    keyword: 'Veo app download',
    slug: 'veo-app-download',
    title: 'Veo App Download Search: Web App or Native App?',
    description: 'What people should know when searching Veo app download, including web-based AI video creation, mobile sharing, and account safety.',
    intent: 'The searcher is ready to try something and may prefer a quick app-like experience.',
    angle: 'VeoVido is designed as a web-first studio that works on desktop and mobile browsers, so creators can purchase, generate, and share without a risky unofficial download.',
    caution: 'Avoid unofficial downloads that request credentials or install unknown software.',
  },
  {
    keyword: 'Veo 3 price',
    slug: 'veo-3-price',
    title: 'Veo 3 Price: Compare Single Clip, Creator, and Studio Plans',
    description: 'A clear Veo 3 price guide for people comparing AI video generation plans, annual discounts, 4K, voice cloning, and API needs.',
    intent: 'This query is close to purchase intent because the user wants a plan and value comparison.',
    angle: 'The Director annual plan is the default recommendation because repeat creators usually need more than one video, voice cloning, and higher quality export.',
    caution: 'Be careful comparing prices unless the same length, resolution, watermark, and commercial terms are included.',
  },
  {
    keyword: 'Veo 3 AI free',
    slug: 'veo-3-ai-free',
    title: 'Veo 3 AI Free: How to Test Before Paying for Exports',
    description: 'A practical guide for testing Veo 3 AI free options before paying for clean exports, voice cloning, 4K, or commercial use.',
    intent: 'The user wants to try AI video with low commitment.',
    angle: 'A good SaaS flow can let users explore scene formats and plan the clip first, while keeping payment tied to the finished export value.',
    caution: 'Free access may be limited by credits, watermark, wait time, resolution, or region.',
  },
  {
    keyword: 'Google Veo 3 video generator',
    slug: 'google-veo-3-video-generator',
    title: 'Google Veo 3 Video Generator Workflow for Movie-Style Clips',
    description: 'How Google Veo 3 video generator interest can become a practical selfie-to-movie workflow with scene formats, voice, friends, and exports.',
    intent: 'Searchers often know the model name and need a product path that gets them to a finished clip.',
    angle: 'VeoVido packages that path around a clear creator promise: upload one selfie and become the star of a cinematic short made for social sharing.',
    caution: 'This is an independent product page about workflow and search intent, not an official Google page.',
  },
]

const css = String.raw`
:root {
  --ink: #101828;
  --muted: #5b6475;
  --soft: #f6f2ea;
  --paper: #fffaf1;
  --night: #11151f;
  --wine: #6f1d3b;
  --coral: #f46d4f;
  --gold: #f4bd4c;
  --teal: #3aa99e;
  --line: rgba(16,24,40,.14);
  --shadow: 0 24px 70px rgba(17,21,31,.18);
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: var(--ink);
  background: var(--paper);
  line-height: 1.6;
}
a { color: inherit; text-decoration: none; }
img { max-width: 100%; display: block; }
button, input, select, textarea { font: inherit; }
.nav {
  position: sticky;
  top: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 14px clamp(18px, 4vw, 56px);
  background: rgba(255,250,241,.86);
  border-bottom: 1px solid rgba(16,24,40,.09);
  backdrop-filter: blur(18px);
}
.brand { display: inline-flex; align-items: center; gap: 10px; font-weight: 900; letter-spacing: 0; }
.brand-mark {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  color: white;
  background: linear-gradient(135deg, var(--wine), var(--coral) 55%, var(--gold));
  box-shadow: 0 12px 30px rgba(111,29,59,.28);
}
.nav-links { display: flex; align-items: center; gap: 24px; font-size: 14px; color: var(--muted); }
.nav-links a:hover { color: var(--wine); }
.nav-actions { display: flex; align-items: center; gap: 10px; }
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  border-radius: 8px;
  padding: 0 18px;
  border: 1px solid var(--line);
  background: white;
  color: var(--ink);
  font-weight: 800;
  cursor: pointer;
  transition: transform .18s ease, box-shadow .18s ease, background .18s ease;
}
.btn:hover { transform: translateY(-1px); box-shadow: 0 12px 28px rgba(17,21,31,.10); }
.btn.primary { background: var(--night); color: white; border-color: var(--night); }
.btn.primary:hover { background: var(--wine); border-color: var(--wine); }
.btn.coral { background: var(--coral); color: white; border-color: var(--coral); }
.hero {
  min-height: calc(100vh - 68px);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(420px, .96fr);
  gap: clamp(28px, 5vw, 72px);
  align-items: start;
  padding: clamp(30px, 5vw, 70px) clamp(18px, 4vw, 56px) 28px;
  background:
    radial-gradient(circle at 88% 14%, rgba(244,189,76,.22), transparent 28%),
    radial-gradient(circle at 10% 86%, rgba(58,169,158,.14), transparent 30%),
    linear-gradient(180deg, #fffaf1 0%, #f6f2ea 100%);
}
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 18px;
  padding: 6px 12px;
  border: 1px solid rgba(111,29,59,.18);
  border-radius: 999px;
  color: var(--wine);
  background: rgba(111,29,59,.06);
  font-size: 12px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: .08em;
}
h1, h2, h3 { line-height: 1.05; letter-spacing: 0; margin: 0; }
h1 { font-size: clamp(36px, 4.9vw, 58px); max-width: 780px; }
.hero-copy { max-width: 760px; }
.hero-copy .lead {
  margin: 22px 0 0;
  max-width: 660px;
  font-size: clamp(17px, 1.7vw, 20px);
  color: #394150;
}
.hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 22px; }
.trust-row { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; margin-top: 22px; max-width: 640px; }
.trust-item { border-left: 3px solid var(--coral); padding-left: 12px; }
.trust-value { font-size: 26px; font-weight: 950; }
.trust-label { color: var(--muted); font-size: 13px; }
.studio {
  border: 1px solid rgba(16,24,40,.12);
  border-radius: 8px;
  background: rgba(255,255,255,.78);
  box-shadow: var(--shadow);
  overflow: hidden;
}
.studio-top {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  padding: 14px 16px;
  background: var(--night);
  color: white;
}
.dots { display: flex; gap: 7px; align-items: center; }
.dots span { width: 10px; height: 10px; border-radius: 50%; background: var(--coral); }
.dots span:nth-child(2) { background: var(--gold); }
.dots span:nth-child(3) { background: var(--teal); }
.studio-body { padding: 18px; display: grid; gap: 16px; }
.preview-wrap { position: relative; border-radius: 8px; overflow: hidden; background: var(--night); }
.preview-wrap img { width: 100%; aspect-ratio: 16 / 10; object-fit: cover; }
.preview-badge {
  position: absolute;
  left: 16px;
  bottom: 16px;
  padding: 8px 11px;
  border-radius: 8px;
  color: white;
  background: rgba(17,21,31,.72);
  backdrop-filter: blur(10px);
  font-size: 13px;
  font-weight: 800;
}
.studio-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.field { display: grid; gap: 7px; }
.field span { color: var(--muted); font-size: 12px; font-weight: 850; text-transform: uppercase; letter-spacing: .08em; }
.field input, .field select, .field textarea {
  width: 100%;
  min-height: 44px;
  border-radius: 8px;
  border: 1px solid rgba(16,24,40,.14);
  background: white;
  padding: 10px 12px;
  color: var(--ink);
  outline: none;
}
.field textarea { min-height: 88px; resize: vertical; grid-column: 1 / -1; }
.upload-box {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 92px;
  border: 1px dashed rgba(111,29,59,.32);
  border-radius: 8px;
  background: rgba(111,29,59,.04);
  text-align: center;
  padding: 12px;
  cursor: pointer;
}
.upload-box input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
.upload-title { display: block; font-weight: 900; }
.upload-note { display: block; color: var(--muted); font-size: 13px; margin-top: 4px; }
.section { padding: 82px clamp(18px, 4vw, 56px); }
.section.alt { background: #f4eadf; }
.container { max-width: 1180px; margin: 0 auto; }
.section-head { max-width: 760px; margin-bottom: 34px; }
.section-head.center { text-align: center; margin-left: auto; margin-right: auto; }
.kicker { color: var(--wine); text-transform: uppercase; letter-spacing: .08em; font-size: 12px; font-weight: 950; margin: 0 0 10px; }
.section h2 { font-size: clamp(32px, 4vw, 54px); }
.section-desc { color: var(--muted); font-size: 18px; margin-top: 16px; }
.grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }
.grid-4 { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
.card {
  border: 1px solid rgba(16,24,40,.12);
  border-radius: 8px;
  background: rgba(255,255,255,.72);
  padding: 22px;
  box-shadow: 0 14px 42px rgba(17,21,31,.07);
}
.card.dark { background: var(--night); color: white; border-color: rgba(255,255,255,.12); }
.card h3 { font-size: 21px; margin-bottom: 10px; }
.card p, .card li { color: var(--muted); }
.card.dark p, .card.dark li { color: rgba(255,255,255,.72); }
.icon-pill { width: 42px; height: 42px; border-radius: 8px; display: grid; place-items: center; margin-bottom: 16px; background: rgba(244,109,79,.12); color: var(--wine); font-weight: 950; }
.scene-card { min-height: 154px; display: flex; flex-direction: column; justify-content: space-between; background: linear-gradient(145deg, rgba(17,21,31,.95), rgba(111,29,59,.86)); color: white; }
.scene-card:nth-child(2n) { background: linear-gradient(145deg, rgba(16,24,40,.95), rgba(58,169,158,.82)); }
.scene-card p { color: rgba(255,255,255,.74); }
.pricing-toolbar { display: flex; align-items: center; justify-content: center; gap: 14px; margin: 18px 0 30px; flex-wrap: wrap; }
.billing-toggle { display: inline-grid; grid-template-columns: 1fr 1fr; padding: 4px; border-radius: 8px; border: 1px solid var(--line); background: white; }
.billing-chip { border: 0; border-radius: 7px; min-height: 40px; padding: 0 14px; background: transparent; color: var(--muted); font-weight: 900; cursor: pointer; }
.billing-chip.is-active { background: var(--night); color: white; }
.pricing-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; align-items: stretch; }
.pricing-card { position: relative; display: flex; flex-direction: column; border: 1px solid rgba(16,24,40,.12); border-radius: 8px; background: white; padding: 24px; cursor: pointer; }
.pricing-card.featured { background: var(--night); color: white; transform: translateY(-8px); box-shadow: var(--shadow); }
.pricing-badge { position: absolute; top: -13px; left: 22px; border-radius: 999px; padding: 5px 10px; background: var(--gold); color: var(--night); font-size: 12px; font-weight: 950; }
.pricing-name { font-size: 25px; font-weight: 950; }
.pricing-desc { min-height: 72px; color: var(--muted); }
.pricing-card.featured .pricing-desc, .pricing-card.featured .pricing-note, .pricing-card.featured li { color: rgba(255,255,255,.74); }
.pricing-price { margin-top: 12px; display: flex; align-items: baseline; gap: 6px; }
.price-currency { font-size: 24px; font-weight: 900; }
.price-amount { font-size: 52px; font-weight: 950; line-height: 1; }
.price-period { color: var(--muted); font-size: 14px; }
.pricing-note { color: var(--muted); font-size: 13px; min-height: 40px; }
.pricing-features { padding: 0; margin: 18px 0 22px; list-style: none; display: grid; gap: 10px; }
.pricing-feature { display: flex; gap: 9px; align-items: flex-start; }
.pricing-feature-icon { flex: 0 0 20px; width: 20px; height: 20px; border-radius: 50%; display: grid; place-items: center; background: rgba(58,169,158,.16); color: var(--teal); font-size: 12px; font-weight: 950; margin-top: 2px; }
.pricing-card.featured .pricing-feature-icon { background: rgba(244,189,76,.18); color: var(--gold); }
.btn-pricing { margin-top: auto; width: 100%; }
.faq-list { display: grid; gap: 12px; max-width: 860px; margin: 0 auto; }
.faq-item { border: 1px solid rgba(16,24,40,.12); border-radius: 8px; background: white; overflow: hidden; }
.faq-question { width: 100%; text-align: left; border: 0; background: white; padding: 18px 20px; font-weight: 950; cursor: pointer; display: flex; justify-content: space-between; gap: 12px; }
.faq-answer { padding: 0 20px 18px; color: var(--muted); }
.faq-item:not(.open) .faq-answer { display: none; }
.cta-band { background: var(--night); color: white; border-radius: 8px; padding: clamp(30px, 5vw, 54px); display: grid; grid-template-columns: 1fr auto; gap: 24px; align-items: center; }
.cta-band p { color: rgba(255,255,255,.72); max-width: 620px; }
.footer { padding: 50px clamp(18px, 4vw, 56px); background: #0d1118; color: rgba(255,255,255,.72); }
.footer-grid { display: grid; grid-template-columns: 1.2fr repeat(3, 1fr); gap: 28px; max-width: 1180px; margin: 0 auto; }
.footer a:hover { color: white; }
.footer-title { color: white; font-weight: 950; margin-bottom: 12px; }
.footer-links { display: grid; gap: 9px; font-size: 14px; }
.footer-bottom { max-width: 1180px; margin: 30px auto 0; padding-top: 20px; border-top: 1px solid rgba(255,255,255,.12); display: flex; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
body.launch-modal-open { overflow: hidden; }
.launch-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: 22px;
  background: rgba(17,21,31,.68);
  backdrop-filter: blur(12px);
}
.launch-modal-overlay[hidden] { display: none; }
.launch-modal-shell {
  width: min(980px, 100%);
  max-height: min(92vh, 860px);
  overflow: auto;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,.14);
  background: #fffaf1;
  box-shadow: 0 36px 100px rgba(0,0,0,.34);
  padding: clamp(20px, 4vw, 34px);
  position: relative;
}
.launch-modal-close { position: absolute; right: 14px; top: 14px; width: 36px; height: 36px; border-radius: 8px; border: 1px solid var(--line); background: white; cursor: pointer; font-weight: 950; }
.launch-modal-eyebrow { color: var(--wine); font-size: 12px; text-transform: uppercase; letter-spacing: .08em; font-weight: 950; margin: 0 0 8px; }
.launch-modal-title { font-size: clamp(28px, 4vw, 46px); }
.launch-modal-desc { color: var(--muted); max-width: 720px; }
.launch-plan-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; margin-top: 24px; }
.launch-plan-card { text-align: left; border-radius: 8px; border: 1px solid rgba(16,24,40,.14); background: white; padding: 18px; cursor: pointer; }
.launch-plan-card.is-featured, .launch-plan-card.is-selected { border-color: var(--coral); box-shadow: 0 0 0 2px rgba(244,109,79,.22); }
.launch-plan-chip { display: inline-flex; border-radius: 999px; background: rgba(244,109,79,.12); color: var(--wine); padding: 4px 9px; font-size: 12px; font-weight: 950; }
.launch-plan-name { margin-top: 12px; font-size: 22px; font-weight: 950; }
.launch-plan-price { margin-top: 14px; display: flex; align-items: baseline; gap: 5px; }
.launch-plan-price-amount { font-size: 36px; font-weight: 950; }
.launch-plan-meta, .launch-plan-desc { color: var(--muted); font-size: 14px; }
.launch-plan-features { display: grid; gap: 7px; margin-top: 14px; color: #3b4555; font-size: 13px; }
.launch-plan-feature::before { content: "✓"; color: var(--teal); font-weight: 950; margin-right: 7px; }
.launch-modal-footer, .payment-summary-card { margin-top: 24px; border: 1px solid rgba(16,24,40,.12); border-radius: 8px; background: white; padding: 18px; }
.launch-modal-footer { display: flex; justify-content: space-between; gap: 18px; align-items: center; }
.launch-selection-label, .payment-summary-label { color: var(--muted); font-size: 12px; text-transform: uppercase; letter-spacing: .08em; font-weight: 900; }
.launch-selection-value, .payment-summary-value { font-weight: 950; }
.launch-footer-actions, .payment-actions, .launch-success-actions { display: flex; gap: 10px; flex-wrap: wrap; }
.launch-primary-button, .launch-secondary-button {
  min-height: 44px;
  border-radius: 8px;
  padding: 0 18px;
  border: 1px solid var(--night);
  cursor: pointer;
  font-weight: 950;
}
.launch-primary-button { background: var(--night); color: white; }
.launch-secondary-button { background: white; color: var(--ink); border-color: var(--line); }
.launch-link-button { display: inline-flex; align-items: center; justify-content: center; }
.launch-back-link { margin-bottom: 18px; border: 0; background: transparent; color: var(--wine); font-weight: 950; cursor: pointer; }
.payment-summary-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
.payment-status { margin-top: 18px; color: var(--muted); }
.launch-success-card { text-align: center; max-width: 680px; margin: 0 auto; }
.launch-success-badge { display: inline-flex; padding: 6px 10px; border-radius: 999px; background: rgba(58,169,158,.14); color: var(--teal); font-weight: 950; margin-bottom: 12px; }
.legal-article { max-width: 940px; margin: 0 auto; }
.legal-article .panel { border: 1px solid rgba(16,24,40,.12); border-radius: 8px; background: white; padding: 22px; margin: 16px 0; }
.keyword-hero { padding-top: 70px; padding-bottom: 44px; }
.keyword-body { max-width: 980px; margin: 0 auto; display: grid; gap: 18px; }
.keyword-body .panel { border: 1px solid rgba(16,24,40,.12); border-radius: 8px; background: white; padding: 24px; }
.keyword-body ul { margin: 10px 0 0; }
.keyword-cta { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 18px; }
@media (max-width: 980px) {
  .hero { grid-template-columns: 1fr; min-height: 0; }
  .grid-3, .grid-4, .pricing-grid, .launch-plan-grid, .footer-grid { grid-template-columns: 1fr; }
  .pricing-card.featured { transform: none; }
  .cta-band { grid-template-columns: 1fr; }
  .payment-summary-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 720px) {
  .nav-links { display: none; }
  .nav { padding: 12px 16px; }
  .nav-actions .btn:not(.primary) { display: none; }
  .hero { padding-top: 34px; }
  .trust-row, .studio-grid { grid-template-columns: 1fr; }
  .section { padding: 58px 16px; }
  .launch-modal-footer { align-items: stretch; flex-direction: column; }
  .payment-summary-grid { grid-template-columns: 1fr; }
}
`

const analyticsJs = String.raw`
(function () {
  var visitorStorageKey = 'veovido-analytics-visitor-id'
  var sessionStorageKey = 'veovido-analytics-session'
  var pendingEventsStorageKey = 'veovido-analytics-pending-events'
  var endpoint = '/api/analytics/events'
  var pendingEvents = []
  var initialized = false
  var viewedSections = new Set()
  var scrollDepths = new Set()

  function uuid() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') return window.crypto.randomUUID()
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
      var random = Math.random() * 16 | 0
      var value = char === 'x' ? random : (random & 0x3 | 0x8)
      return value.toString(16)
    })
  }

  function clean(value, max) {
    var normalized = String(value || '').trim().toLowerCase().replace(/[^a-z0-9_:/?.#-]+/g, '_').replace(/^_+|_+$/g, '')
    return normalized ? normalized.slice(0, max || 96) : null
  }

  function visitorId() {
    try {
      var existing = localStorage.getItem(visitorStorageKey)
      if (existing) return existing
      var id = uuid()
      localStorage.setItem(visitorStorageKey, id)
      return id
    } catch { return uuid() }
  }

  function sessionId() {
    var now = Date.now()
    try {
      var existing = JSON.parse(sessionStorage.getItem(sessionStorageKey) || 'null')
      if (existing && existing.id && now - Number(existing.startedAt || 0) < 30 * 60 * 1000) return existing.id
    } catch {}
    var next = { id: uuid(), startedAt: now }
    try { sessionStorage.setItem(sessionStorageKey, JSON.stringify(next)) } catch {}
    return next.id
  }

  function getUtm(name) {
    try { return new URLSearchParams(window.location.search).get(name) || '' } catch { return '' }
  }

  function base(input) {
    var path = (window.location.pathname || '/') + (window.location.search || '')
    var referrerHost = ''
    try { referrerHost = document.referrer ? new URL(document.referrer).hostname : '' } catch {}
    return {
      id: uuid(),
      visitorId: visitorId(),
      sessionId: sessionId(),
      eventType: clean(input.eventType, 32) || 'unknown',
      eventName: clean(input.eventName, 64) || 'unknown_event',
      routePath: path,
      pageKey: clean(window.location.pathname === '/' ? 'home' : window.location.pathname, 96),
      sectionKey: clean(input.sectionKey, 96),
      elementKey: clean(input.elementKey, 96),
      referrerHost: referrerHost,
      utmSource: getUtm('utm_source'),
      utmMedium: getUtm('utm_medium'),
      utmCampaign: getUtm('utm_campaign'),
      deviceType: window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop',
      metadata: input.metadata || {},
      occurredAt: new Date().toISOString(),
    }
  }

  function save() {
    try { localStorage.setItem(pendingEventsStorageKey, JSON.stringify(pendingEvents.slice(-250))) } catch {}
  }

  function load() {
    try {
      var saved = JSON.parse(localStorage.getItem(pendingEventsStorageKey) || '[]')
      if (Array.isArray(saved)) pendingEvents = saved.slice(-250)
    } catch {}
  }

  function flush(useBeacon) {
    if (!pendingEvents.length) return
    var batch = pendingEvents.slice(0, 50)
    var body = JSON.stringify({ events: batch })
    if (useBeacon && navigator.sendBeacon) {
      if (navigator.sendBeacon(endpoint, new Blob([body], { type: 'application/json' }))) {
        pendingEvents = pendingEvents.slice(batch.length)
        save()
        return
      }
    }
    fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: useBeacon })
      .then(function (response) {
        if (response.ok) {
          pendingEvents = pendingEvents.slice(batch.length)
          save()
        }
      })
      .catch(function () {})
  }

  function track(input) {
    pendingEvents.push(base(input))
    pendingEvents = pendingEvents.slice(-250)
    save()
    window.setTimeout(function () { flush(false) }, 90)
  }

  function describeClick(target) {
    var element = target && target.closest ? target.closest('[data-analytics-click], a[href], button, input, textarea, select') : null
    if (!element || element.dataset.analyticsIgnore === 'true') return null
    var section = element.closest('[data-analytics-section], section[id]')
    var href = element.getAttribute('href') || ''
    var text = (element.getAttribute('aria-label') || element.textContent || element.name || element.id || '').trim().slice(0, 140)
    var isCta = element.dataset.analyticsCta === 'true' || element.classList.contains('primary') || element.classList.contains('btn-pricing')
    return {
      eventType: 'click',
      eventName: isCta ? 'cta_click' : 'ui_click',
      sectionKey: section ? (section.dataset.analyticsSection || section.id || '') : '',
      elementKey: element.dataset.analyticsClick || text || href || element.tagName,
      metadata: { href: href, text: text, tag: element.tagName.toLowerCase() },
    }
  }

  function observeSections() {
    if (typeof IntersectionObserver !== 'function') return
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return
        var key = entry.target.dataset.analyticsSection || entry.target.id || ''
        if (!key || viewedSections.has(key)) return
        viewedSections.add(key)
        track({ eventType: 'section', eventName: 'content_view', sectionKey: key })
      })
    }, { threshold: 0.35 })
    document.querySelectorAll('section[id], [data-analytics-section]').forEach(function (section) { observer.observe(section) })
  }

  function scrollDepth() {
    var height = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    var depth = Math.min(100, Math.round(((window.scrollY || 0) / height) * 100))
    ;[25, 50, 75, 90].forEach(function (threshold) {
      if (depth >= threshold && !scrollDepths.has(threshold)) {
        scrollDepths.add(threshold)
        track({ eventType: 'scroll', eventName: 'scroll_depth', metadata: { depth: threshold } })
      }
    })
  }

  function init() {
    if (initialized) return
    initialized = true
    load()
    window.VeoVidoAnalytics = { track: track, flush: flush }
    track({ eventType: 'session', eventName: 'session_started' })
    track({ eventType: 'page', eventName: 'page_view' })
    document.addEventListener('click', function (event) {
      var click = describeClick(event.target)
      if (click) track(click)
    }, true)
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') flush(true)
    })
    window.addEventListener('pagehide', function () { flush(true) })
    window.addEventListener('scroll', scrollDepth, { passive: true })
    window.setTimeout(observeSections, 120)
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init)
  else init()
})()
`

const launchFlowJs = String.raw`
(function () {
  const defaultPlanId = 'director'
  const defaultBillingCycle = 'annual'
  const annualDiscountMultiplier = 0.5
  const currency = 'USD'
  const completedOrderIds = new Set()

  const planCatalog = {
    star: {
      id: 'star',
      name: 'Star',
      monthlyAmountCents: 900,
      oneTime: true,
      subtitle: 'One finished HD short',
      launchMode: 'checkout',
    },
    director: {
      id: 'director',
      name: 'Director',
      monthlyAmountCents: 2900,
      subtitle: '10 clips, voice clone, 4K',
      launchMode: 'checkout',
      annualDiscountMultiplier: annualDiscountMultiplier,
    },
    studio: {
      id: 'studio',
      name: 'Studio',
      monthlyAmountCents: 7900,
      subtitle: 'Unlimited, co-stars, API',
      launchMode: 'checkout',
      annualDiscountMultiplier: annualDiscountMultiplier,
    },
  }

  const state = {
    selectedPlanId: defaultPlanId,
    billingCycle: defaultBillingCycle,
    step: 'plans',
    source: 'hero_cta',
    modalOpen: false,
    popup: null,
    popupMonitor: null,
    checkoutUrl: '',
    orderId: '',
    paymentStatus: 'idle',
    paymentMessage: '',
    requestInFlight: false,
  }

  const elements = {}

  function formatMoney(amountCents) {
    const hasDecimals = amountCents % 100 !== 0
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: hasDecimals ? 2 : 0,
      maximumFractionDigits: hasDecimals ? 2 : 0,
    }).format(amountCents / 100)
  }

  function getPlan(planId) {
    return planCatalog[planId] || planCatalog[defaultPlanId]
  }

  function getPricing(planId, billingCycle) {
    const plan = getPlan(planId)
    if (plan.oneTime) {
      return {
        plan: plan,
        planId: plan.id,
        billingCycle: 'single',
        selectionId: plan.id + ':single',
        amountCents: plan.monthlyAmountCents,
        displayAmount: formatMoney(plan.monthlyAmountCents),
        displayPeriod: '/ generation',
        sectionNote: formatMoney(plan.monthlyAmountCents) + ' charged once for one HD no-watermark short.',
        selectionNote: 'One HD generation with no watermark. Upgrade later if you need repeat videos or 4K.',
        paymentBilling: formatMoney(plan.monthlyAmountCents) + ' one-time charge',
        discountLabel: 'Single generation',
      }
    }

    const isAnnual = billingCycle === 'annual'
    const annualAmountCents = Math.round(plan.monthlyAmountCents * 12 * (plan.annualDiscountMultiplier || 1))
    const annualMonthlyCents = Math.round(annualAmountCents / 12)
    const amountCents = isAnnual ? annualAmountCents : plan.monthlyAmountCents
    const displayAmountCents = isAnnual ? annualMonthlyCents : plan.monthlyAmountCents
    const savingsPercent = plan.annualDiscountMultiplier ? Math.round((1 - plan.annualDiscountMultiplier) * 100) : 0
    return {
      plan: plan,
      planId: plan.id,
      billingCycle: billingCycle,
      selectionId: plan.id + ':' + billingCycle,
      amountCents: amountCents,
      displayAmount: formatMoney(displayAmountCents),
      displayPeriod: isAnnual ? '/ mo billed yearly' : '/ month',
      sectionNote: isAnnual
        ? formatMoney(annualAmountCents) + ' charged yearly. Save ' + savingsPercent + '% on annual billing.'
        : formatMoney(plan.monthlyAmountCents) + ' charged monthly. Switch to yearly for ' + savingsPercent + '% savings.',
      selectionNote: isAnnual
        ? formatMoney(annualAmountCents) + ' charged yearly. Equivalent to ' + formatMoney(annualMonthlyCents) + ' per month.'
        : formatMoney(plan.monthlyAmountCents) + ' charged monthly.',
      paymentBilling: isAnnual ? formatMoney(annualAmountCents) + ' charged yearly' : formatMoney(plan.monthlyAmountCents) + ' charged monthly',
      discountLabel: isAnnual ? savingsPercent + '% off yearly pricing' : 'Monthly billing',
    }
  }

  function safeTrack(eventName, metadata) {
    if (!window.VeoVidoAnalytics || typeof window.VeoVidoAnalytics.track !== 'function') return
    const eventType =
      eventName === 'plan_selected'
        ? 'plan'
        : eventName.indexOf('checkout') >= 0 || eventName === 'payment_completed'
          ? 'checkout'
          : 'click'
    try {
      window.VeoVidoAnalytics.track({
        eventType: eventType,
        eventName: eventName,
        sectionKey: 'pricing',
        elementKey: metadata && metadata.elementKey ? metadata.elementKey : eventName,
        metadata: metadata || {},
      })
    } catch {}
  }

  function setStep(step) {
    state.step = step
    elements.steps.forEach(function (stepElement) {
      stepElement.hidden = stepElement.getAttribute('data-launch-step') !== step
    })
  }

  function showModal() {
    state.modalOpen = true
    document.body.classList.add('launch-modal-open')
    elements.overlay.hidden = false
  }

  function clearPopupMonitor() {
    if (state.popupMonitor) {
      window.clearInterval(state.popupMonitor)
      state.popupMonitor = null
    }
  }

  function closeModal() {
    state.modalOpen = false
    document.body.classList.remove('launch-modal-open')
    elements.overlay.hidden = true
    clearPopupMonitor()
    state.paymentStatus = 'idle'
    state.paymentMessage = ''
    state.checkoutUrl = ''
    state.orderId = ''
    state.requestInFlight = false
    setStep('plans')
    render()
  }

  function openPricingModal(options) {
    state.selectedPlanId = options.planId || defaultPlanId
    state.billingCycle = options.billingCycle || defaultBillingCycle
    state.source = options.source || 'cta'
    state.paymentStatus = 'idle'
    state.paymentMessage = ''
    state.checkoutUrl = ''
    state.orderId = ''
    state.requestInFlight = false
    setStep('plans')
    showModal()
    render()
    safeTrack('launch_clicked', { source: state.source, planId: getPricing(state.selectedPlanId, state.billingCycle).selectionId })
  }

  function openCenteredPopup(name, width, height) {
    const popupWidth = Math.min(width || 560, window.screen.availWidth - 32)
    const popupHeight = Math.min(height || 780, window.screen.availHeight - 48)
    const left = Math.max(0, Math.round(window.screenX + (window.outerWidth - popupWidth) / 2))
    const top = Math.max(0, Math.round(window.screenY + (window.outerHeight - popupHeight) / 2))
    const features = ['popup=yes', 'resizable=yes', 'scrollbars=yes', 'width=' + popupWidth, 'height=' + popupHeight, 'left=' + left, 'top=' + top].join(',')
    const popup = window.open('about:blank', name, features)
    if (popup) popup.focus()
    return popup
  }

  function getPaymentProviderLabel(provider) {
    return provider === 'nowpayments' ? 'USDC wallet checkout' : 'Secure Creem popup'
  }

  function getPaymentPopupName(provider) {
    return provider === 'nowpayments' ? 'veovido-usdc-wallet-checkout' : 'veovido-creem-checkout'
  }

  function writePopupLoading(popup, pricing, provider) {
    if (!popup || popup.closed) return
    const loadingText = provider === 'nowpayments'
      ? 'Preparing your USDC wallet payment window.'
      : 'Preparing your secure Creem payment window.'
    popup.document.open()
    popup.document.write('<!doctype html><html lang="en"><head><meta charset="utf-8"><title>VeoVido Checkout</title><style>body{margin:0;font-family:Inter,Arial,sans-serif;background:#11151f;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:24px}main{max-width:380px;text-align:center;border:1px solid rgba(255,255,255,.14);border-radius:8px;padding:28px;background:rgba(255,255,255,.06)}strong{color:#f4bd4c;text-transform:uppercase;letter-spacing:.12em;font-size:12px}h1{font-size:28px;line-height:1.1;margin:12px 0}p{color:rgba(255,255,255,.72);line-height:1.6}</style></head><body><main><strong>VeoVido</strong><h1>' + pricing.plan.name + ' checkout</h1><p>' + loadingText + '</p></main></body></html>')
    popup.document.close()
  }

  function ensurePopupMonitor() {
    clearPopupMonitor()
    state.popupMonitor = window.setInterval(function () {
      if (!state.popup || state.popup.closed) {
        clearPopupMonitor()
        state.popup = null
        if (state.step === 'payment' && state.paymentStatus !== 'success' && state.paymentStatus !== 'error') {
          state.paymentStatus = 'closed'
          state.paymentMessage = 'The payment popup was closed before checkout finished. You can reopen it here.'
          render()
        }
      }
    }, 700)
  }

  function navigatePopup(popup, url, provider) {
    if (!url) return false
    const activePopup = popup || openCenteredPopup(getPaymentPopupName(provider), 560, 780)
    if (!activePopup) return false
    try {
      activePopup.location.href = url
      activePopup.focus()
      state.popup = activePopup
      ensurePopupMonitor()
      return true
    } catch {
      return false
    }
  }

  async function requestCheckoutSession(pricing, provider) {
    const endpoint = provider === 'nowpayments' ? '/api/nowpayments-checkout' : '/api/launch-checkout'
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ planId: pricing.selectionId, source: state.source }),
      credentials: 'same-origin',
    })
    const rawText = await response.text()
    const payload = rawText ? JSON.parse(rawText) : {}
    if (!response.ok) throw new Error(payload && payload.message ? payload.message : 'Checkout could not be started.')
    return payload
  }

  async function startCheckoutFlow(provider) {
    const paymentProvider = provider === 'nowpayments' ? 'nowpayments' : 'creem'
    const pricing = getPricing(state.selectedPlanId, state.billingCycle)
    if (state.requestInFlight) return
    state.requestInFlight = true
    state.paymentProvider = paymentProvider
    state.paymentStatus = 'loading'
    state.paymentMessage = paymentProvider === 'nowpayments'
      ? 'Preparing your checkout session. A USDC wallet payment popup should appear over this page in a moment.'
      : 'Preparing your checkout session. A secure Creem payment popup should appear over this page in a moment.'
    state.checkoutUrl = ''
    state.orderId = ''
    setStep('payment')
    render()

    const popup = openCenteredPopup(getPaymentPopupName(paymentProvider), 560, 780)
    if (popup) {
      state.popup = popup
      writePopupLoading(popup, pricing, paymentProvider)
      ensurePopupMonitor()
    }

    safeTrack('plan_selected', { source: state.source, planId: pricing.selectionId, billingCycle: pricing.billingCycle, amountCents: pricing.amountCents })
    safeTrack('checkout_started', { source: state.source, planId: pricing.selectionId, billingCycle: pricing.billingCycle, amountCents: pricing.amountCents, provider: paymentProvider })

    try {
      const payload = await requestCheckoutSession(pricing, paymentProvider)
      state.orderId = payload.orderId || ''
      state.checkoutUrl = payload.checkoutUrl || ''
      const opened = navigatePopup(popup, state.checkoutUrl, paymentProvider)
      state.paymentStatus = opened ? 'ready' : 'blocked'
      state.paymentMessage = opened
        ? (paymentProvider === 'nowpayments'
          ? 'Your USDC wallet payment popup is open. Finish payment there and this page will remain ready behind it.'
          : 'Your secure Creem payment popup is open. Finish payment there and this page will remain ready behind it.')
        : 'Your browser blocked the popup. Use the button below to reopen secure payment.'
      safeTrack('checkout_redirected', { source: state.source, planId: pricing.selectionId, orderId: state.orderId, popupMode: opened ? 'auto' : 'manual', provider: paymentProvider })
    } catch (error) {
      state.paymentStatus = 'error'
      state.paymentMessage = 'Checkout is not available yet. Please try again in a moment.'
      safeTrack('checkout_start_failed', { source: state.source, planId: pricing.selectionId, message: error instanceof Error ? error.message : 'Checkout failed', provider: paymentProvider })
      try { if (popup && !popup.closed) popup.close() } catch {}
    } finally {
      state.requestInFlight = false
      render()
    }
  }

  function handleCheckoutMessage(event) {
    if (event.origin !== window.location.origin) return
    if (!event.data || event.data.type !== 'veovido-checkout-result') return
    if (event.data.status === 'success') {
      const orderId = String(event.data.orderId || '')
      const alreadyCompleted = orderId ? completedOrderIds.has(orderId) : false
      if (orderId) completedOrderIds.add(orderId)
      state.orderId = orderId
      state.paymentStatus = 'success'
      state.paymentMessage = ''
      state.checkoutUrl = ''
      state.requestInFlight = false
      clearPopupMonitor()
      closeModal()
      if (!alreadyCompleted) safeTrack('payment_completed', { source: state.source, orderId: orderId })
      window.location.href = '/'
    }
  }

  function handlePopupReturn() {
    const params = new URLSearchParams(window.location.search)
    const checkoutStatus = params.get('checkout')
    if (!checkoutStatus) return false
    const payload = {
      type: 'veovido-checkout-result',
      status: checkoutStatus,
      orderId: params.get('order') || '',
      planId: params.get('plan') || '',
    }
    if (window.opener && window.opener !== window) {
      try {
        window.opener.postMessage(payload, window.location.origin)
        if (checkoutStatus === 'success') {
          window.close()
          return true
        }
      } catch {}
    }
    if (checkoutStatus === 'success') {
      safeTrack('payment_completed', { source: 'direct_return', orderId: payload.orderId, planId: payload.planId })
      window.history.replaceState({}, document.title, '/')
    }
    return true
  }

  function renderPriceGroup(amountTargets, periodTargets, noteTargets, pricing) {
    amountTargets.forEach(function (node) {
      node.textContent = pricing.displayAmount.replace('$', '').replace(/\.00$/, '')
    })
    periodTargets.forEach(function (node) { node.textContent = pricing.displayPeriod })
    noteTargets.forEach(function (node) { node.textContent = pricing.sectionNote })
  }

  function formatSelectionTitle(pricing) {
    if (pricing.plan.oneTime) return pricing.plan.name + ' - Single generation'
    return pricing.plan.name + ' - ' + (pricing.billingCycle === 'annual' ? 'Yearly' : 'Monthly')
  }

  function render() {
    const pricing = getPricing(state.selectedPlanId, state.billingCycle)
    elements.billingButtons.forEach(function (button) {
      const isActive = button.getAttribute('data-billing-option') === state.billingCycle
      button.classList.toggle('is-active', isActive)
      button.setAttribute('aria-pressed', String(isActive))
    })
    Object.keys(planCatalog).forEach(function (planId) {
      const planPricing = getPricing(planId, state.billingCycle)
      renderPriceGroup(elements.sectionPriceAmount[planId] || [], elements.sectionPricePeriod[planId] || [], elements.sectionPriceNote[planId] || [], planPricing)
      renderPriceGroup(elements.modalPriceAmount[planId] || [], elements.modalPricePeriod[planId] || [], elements.modalPriceNote[planId] || [], planPricing)
      ;(elements.pricingCards[planId] || []).forEach(function (card) { card.classList.toggle('is-selected', planId === state.selectedPlanId) })
      ;(elements.modalPlanCards[planId] || []).forEach(function (card) { card.classList.toggle('is-selected', planId === state.selectedPlanId) })
    })
    if (elements.selectionTitle) elements.selectionTitle.textContent = formatSelectionTitle(pricing)
    if (elements.selectionNote) elements.selectionNote.textContent = pricing.selectionNote
    if (elements.paymentPlan) elements.paymentPlan.textContent = formatSelectionTitle(pricing)
    if (elements.paymentBilling) elements.paymentBilling.textContent = pricing.paymentBilling
    if (elements.paymentDiscount) elements.paymentDiscount.textContent = pricing.discountLabel
    if (elements.paymentProvider) elements.paymentProvider.textContent = getPaymentProviderLabel(state.paymentProvider)
    if (elements.paymentStatus) elements.paymentStatus.textContent = state.paymentMessage || 'Preparing your checkout session.'
    if (elements.paymentLink) {
      if (state.checkoutUrl) {
        elements.paymentLink.hidden = false
        elements.paymentLink.href = state.checkoutUrl
        elements.paymentLink.target = getPaymentPopupName(state.paymentProvider)
      } else {
        elements.paymentLink.hidden = true
        elements.paymentLink.removeAttribute('href')
      }
    }
  }

  function collectByPlanAttribute(selector, attributeName) {
    const map = {}
    document.querySelectorAll(selector).forEach(function (node) {
      const key = node.getAttribute(attributeName)
      if (!key) return
      if (!map[key]) map[key] = []
      map[key].push(node)
    })
    return map
  }

  function initializeElements() {
    elements.overlay = document.getElementById('launch-modal')
    if (!elements.overlay) return false
    elements.steps = Array.from(document.querySelectorAll('[data-launch-step]'))
    elements.billingButtons = Array.from(document.querySelectorAll('[data-billing-option]'))
    elements.sectionPriceAmount = collectByPlanAttribute('[data-plan-price-amount]', 'data-plan-price-amount')
    elements.sectionPricePeriod = collectByPlanAttribute('[data-plan-price-period]', 'data-plan-price-period')
    elements.sectionPriceNote = collectByPlanAttribute('[data-plan-price-note]', 'data-plan-price-note')
    elements.modalPriceAmount = collectByPlanAttribute('[data-modal-price-amount]', 'data-modal-price-amount')
    elements.modalPricePeriod = collectByPlanAttribute('[data-modal-price-period]', 'data-modal-price-period')
    elements.modalPriceNote = collectByPlanAttribute('[data-modal-price-note]', 'data-modal-price-note')
    elements.pricingCards = collectByPlanAttribute('[data-pricing-plan]', 'data-pricing-plan')
    elements.modalPlanCards = collectByPlanAttribute('[data-modal-plan]', 'data-modal-plan')
    elements.selectionTitle = document.querySelector('[data-selection-title]')
    elements.selectionNote = document.querySelector('[data-selection-note]')
    elements.continueButton = document.querySelector('[data-launch-continue]')
    elements.walletButton = document.querySelector('[data-launch-wallet]')
    elements.paymentPlan = document.querySelector('[data-payment-plan]')
    elements.paymentBilling = document.querySelector('[data-payment-billing]')
    elements.paymentDiscount = document.querySelector('[data-payment-discount]')
    elements.paymentProvider = document.querySelector('[data-payment-provider]')
    elements.paymentStatus = document.querySelector('[data-payment-status]')
    elements.paymentLink = document.querySelector('[data-payment-link]')
    return true
  }

  function attachEvents() {
    document.querySelectorAll('[data-launch-open], [data-pricing-action]').forEach(function (button) {
      button.addEventListener('click', function (event) {
        event.preventDefault()
        openPricingModal({
          source: button.getAttribute('data-launch-source') || button.getAttribute('data-pricing-source') || 'cta',
          planId: button.getAttribute('data-launch-plan') || button.getAttribute('data-pricing-action') || defaultPlanId,
          billingCycle: button.getAttribute('data-launch-billing') || defaultBillingCycle,
        })
      })
    })
    document.querySelectorAll('[data-launch-close]').forEach(function (button) { button.addEventListener('click', closeModal) })
    elements.overlay.addEventListener('click', function (event) { if (event.target === elements.overlay) closeModal() })
    document.addEventListener('keydown', function (event) { if (event.key === 'Escape' && state.modalOpen) closeModal() })
    elements.billingButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        state.billingCycle = button.getAttribute('data-billing-option') === 'monthly' ? 'monthly' : 'annual'
        render()
      })
    })
    document.querySelectorAll('[data-modal-plan], [data-pricing-plan]').forEach(function (button) {
      button.addEventListener('click', function () {
        state.selectedPlanId = button.getAttribute('data-modal-plan') || button.getAttribute('data-pricing-plan') || defaultPlanId
        render()
      })
    })
    if (elements.continueButton) elements.continueButton.addEventListener('click', function () { startCheckoutFlow('creem') })
    if (elements.walletButton) elements.walletButton.addEventListener('click', function () { startCheckoutFlow('nowpayments') })
    const backButton = document.querySelector('[data-launch-back]')
    if (backButton) backButton.addEventListener('click', function () { state.paymentStatus = 'idle'; setStep('plans'); render() })
    if (elements.paymentLink) {
      elements.paymentLink.addEventListener('click', function () {
        safeTrack('checkout_redirected', { source: state.source, planId: getPricing(state.selectedPlanId, state.billingCycle).selectionId, popupMode: 'manual_reopen', provider: state.paymentProvider })
      })
    }
    window.addEventListener('message', handleCheckoutMessage)
  }

  if (!initializeElements()) return
  setStep('plans')
  elements.overlay.hidden = true
  attachEvents()
  handlePopupReturn()
  render()
})()
`

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function shell(title, description, path, body, options = {}) {
  const canonical = `${siteUrl}${path === '/' ? '/' : `${path}/`}`
  const pageTitle = options.rawTitle ? title : `${title} | VeoVido`
  const schema = options.schema || {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    url: canonical,
    description,
    isPartOf: { '@type': 'WebSite', name: 'VeoVido', url: siteUrl },
  }
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <meta name="theme-color" content="#fffaf1">
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="keywords" content="Veo 3 video generator, veo, AI video generator, VeoVido">
  <link rel="canonical" href="${canonical}">
  <meta name="robots" content="index, follow">
  <meta property="og:title" content="${escapeHtml(pageTitle)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:site_name" content="VeoVido">
  <meta property="og:image" content="${siteUrl}/assets/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(pageTitle)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${siteUrl}/assets/og-image.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/site.css">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
  <script defer src="/assets/analytics.js"></script>
</head>
<body>
  ${nav()}
  ${body}
  ${footer()}
  <script defer src="/assets/launch-flow.js?v=20260512"></script>
</body>
</html>`
}

function nav() {
  return `<nav class="nav" aria-label="Main navigation" data-analytics-section="nav">
    <a class="brand" href="/">
      <span class="brand-mark">V</span>
      <span>VeoVido</span>
    </a>
    <div class="nav-links">
      <a href="/#scenes">Scenes</a>
      <a href="/#workflow">Workflow</a>
      <a href="/#pricing">Pricing</a>
      <a href="/veo-3-ai-video/">Veo 3 AI video</a>
    </div>
    <div class="nav-actions">
      <a class="btn" href="/google-veo-3-video-generator/">Guide</a>
      <a class="btn primary" href="#pricing" data-launch-open data-launch-source="nav_cta" data-launch-plan="director" data-launch-billing="annual" data-analytics-click="nav_checkout" data-analytics-cta="true">Choose Director annual</a>
    </div>
  </nav>`
}

function footer() {
  const links = keywordPages.slice(0, 10).map((page) => `<a href="/${page.slug}/">${page.keyword}</a>`).join('')
  return `<footer class="footer">
    <div class="footer-grid">
      <div>
        <a class="brand" href="/" style="color:white"><span class="brand-mark">V</span><span>VeoVido</span></a>
        <p>Selfie-to-cinema SaaS for creators who want a clear Veo 3 video generator workflow, cinematic scene formats, voice options, co-star scenes, and social-ready exports.</p>
        <p><strong>Markets:</strong> United States, global English market, and Southeast Asia.</p>
        <p><a href="mailto:support@aigeamy.com">support@aigeamy.com</a></p>
      </div>
      <div><div class="footer-title">Product</div><div class="footer-links">
        <a href="/#studio">Selfie studio</a>
        <a href="/#scenes">Scene library</a>
        <a href="/#pricing">Pricing</a>
        <a href="/veo-3-flow/">Veo 3 Flow</a>
      </div></div>
      <div><div class="footer-title">Guides</div><div class="footer-links">${links}</div></div>
      <div><div class="footer-title">Company</div><div class="footer-links">
        <a href="/privacy/">Privacy</a>
        <a href="/terms/">Terms</a>
        <a href="/sitemap.xml">Sitemap</a>
        <a href="mailto:support@aigeamy.com">Support</a>
      </div></div>
    </div>
    <div class="footer-bottom">
      <span>Copyright ${new Date().getFullYear()} VeoVido. Independent SaaS product. Not affiliated with Google or any third-party model provider.</span>
      <span>Veo 3 video generator workflow for creators.</span>
    </div>
  </footer>`
}

function homeHtml() {
  const appSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'VeoVido',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Web',
        url: siteUrl,
        description: 'VeoVido is a selfie-to-cinematic-video SaaS for creators searching for a Veo 3 video generator workflow.',
        offers: [
          { '@type': 'Offer', name: 'Star', price: '9', priceCurrency: 'USD' },
          { '@type': 'Offer', name: 'Director', price: '29', priceCurrency: 'USD' },
          { '@type': 'Offer', name: 'Studio', price: '79', priceCurrency: 'USD' },
        ],
        featureList: ['Selfie character integration', '100+ cinematic scene formats', 'Dialogue and plot control', 'AI voice clone workflow', 'Friend co-star mode', 'Social export presets'],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is VeoVido?', acceptedAnswer: { '@type': 'Answer', text: 'VeoVido is a web SaaS for turning a selfie, role, and scene format into a cinematic short video workflow.' } },
          { '@type': 'Question', name: 'Which plan is selected by default?', acceptedAnswer: { '@type': 'Answer', text: 'Director annual is selected by default because repeat creators usually need 10 videos per month, voice cloning, and 4K export.' } },
        ],
      },
    ],
  }

  const features = [
    ['Face-fit scene engine', 'Upload one selfie and keep the character consistent across film-style shots, lighting, motion, and closeups.'],
    ['100+ genre scene formats', 'Action, romance, sci-fi, horror, wuxia, sports highlights, fantasy trailers, travel reels, and creator intros.'],
    ['Script and role control', 'Pick your line, opponent, co-star, ending, camera mood, and the 15 to 60 second story shape.'],
    ['Voice workflow', 'Record a short sample for a matching voice direction or choose an AI voice actor for safer public exports.'],
    ['Friend co-star mode', 'Invite a friend to upload a selfie and appear in the same short with matched scene logic.'],
    ['Social export presets', 'TikTok, Instagram Reels, YouTube Shorts, and WeChat-friendly formats with caption starters.'],
  ]
  const sceneFormats = [
    ['Hollywood chase', 'Explosive street escape, dramatic light, trailer-style pacing.'],
    ['Romantic airport ending', 'Soft lens, emotional line, final boarding call.'],
    ['Sci-fi commander', 'Neon bridge, planetary threat, heroic closeup.'],
    ['Horror hallway', 'One-take suspense, flickering light, whisper reveal.'],
    ['Wuxia moon duel', 'Ancient roofline, silk motion, sword-light finish.'],
    ['Sports final shot', 'Stadium roar, slow-motion highlight, victory cut.'],
    ['Luxury travel reel', 'Golden-hour arrival, cinematic car door, skyline reveal.'],
    ['Friend cameo comedy', 'Two-person setup, reaction beat, punchline ending.'],
  ]
  const workflow = [
    ['1', 'Upload', 'Add one clear selfie and choose whether the clip is solo or co-star mode.'],
    ['2', 'Direct', 'Pick genre, role, dialogue, opponent, mood, and export ratio.'],
    ['3', 'Preview', 'Review likeness, prompt safety, caption, and voice settings before checkout.'],
    ['4', 'Share', 'Export a clean HD or 4K short for the social channel you choose.'],
  ]
  const faq = [
    ['Is VeoVido a generic video prompt box?', 'No. The first screen is built around a specific creator outcome: upload a selfie and become the lead character in a cinematic short.'],
    ['Why is Director annual selected first?', 'Director annual gives repeat creators the best value: 10 videos per month, voice cloning, 4K export, and 50% annual savings.'],
    ['Can I use a friend or celebrity face?', 'You should only upload faces, voices, and likenesses you have permission to use. VeoVido is designed for consent-based creative use.'],
    ['Does VeoVido claim free unlimited Veo 3 AI generation?', 'No. High-quality video, storage, voice, and 4K output have real cost. The pricing is shown clearly before checkout.'],
  ]

  return shell(
    'Veo 3 Video Generator for Selfie-to-Movie AI Shorts',
    'VeoVido is a Veo 3 video generator workflow that turns one selfie into cinematic AI short videos with scene formats, dialogue, voice, friend co-stars, and social exports.',
    '/',
    `<main>
      <section class="hero" id="studio" data-analytics-section="hero">
        <div class="hero-copy">
          <p class="eyebrow">Veo 3 video generator - selfie to cinema</p>
          <h1>Veo 3 video generator for your movie moment.</h1>
          <p class="lead">Upload one selfie, choose the scene, add your line, and turn it into a cinematic 15 to 60 second AI short with voice, co-stars, and social-ready exports.</p>
          <div class="hero-actions">
            <a class="btn primary" href="#pricing" data-launch-open data-launch-source="hero_primary" data-launch-plan="director" data-launch-billing="annual" data-analytics-click="hero_checkout" data-analytics-cta="true">Choose Director annual</a>
            <a class="btn" href="#scenes" data-analytics-click="hero_scenes">Explore scenes</a>
          </div>
          <div class="trust-row">
            <div class="trust-item"><div class="trust-value">100+</div><div class="trust-label">cinematic scene formats</div></div>
            <div class="trust-item"><div class="trust-value">15-60s</div><div class="trust-label">social-ready short films</div></div>
            <div class="trust-item"><div class="trust-value">50%</div><div class="trust-label">annual Director savings</div></div>
          </div>
        </div>
        <div class="studio" aria-label="VeoVido selfie movie studio">
          <div class="studio-top"><div class="dots"><span></span><span></span><span></span></div><strong>Movie moment builder</strong><span>Live preview</span></div>
          <div class="studio-body">
            <div class="preview-wrap">
              <img src="/assets/veovido-cinematic-preview.png" width="1200" height="760" alt="VeoVido preview showing a selfie becoming the hero of a cinematic AI short">
              <div class="preview-badge" id="scene-status">Selfie ready - sci-fi epic selected</div>
            </div>
            <label class="upload-box">
              <input id="selfie-input" type="file" accept="image/*" data-analytics-click="selfie_upload">
              <span><span class="upload-title" id="upload-title">Upload your selfie</span><span class="upload-note">One clear face photo is enough to plan the clip.</span></span>
            </label>
            <div class="studio-grid">
              <label class="field"><span>Genre</span><select id="genre-select"><option>Sci-fi epic</option><option>Hollywood action</option><option>Romantic drama</option><option>Horror thriller</option><option>Wuxia fantasy</option><option>Sports highlight</option></select></label>
              <label class="field"><span>Export</span><select><option>9:16 TikTok / Reels</option><option>16:9 YouTube</option><option>1:1 social square</option></select></label>
              <label class="field" style="grid-column:1/-1"><span>Your line</span><textarea id="line-input">I was not written into the movie. I rewrote the scene.</textarea></label>
            </div>
            <button class="btn coral" data-launch-open data-launch-source="studio_builder" data-launch-plan="director" data-launch-billing="annual" data-analytics-click="studio_generate" data-analytics-cta="true">Generate my movie moment</button>
          </div>
        </div>
      </section>

      <section class="section" id="features" data-analytics-section="features">
        <div class="container">
          <div class="section-head center">
            <p class="kicker">Built for conversion</p>
            <h2>A focused Veo 3 video generator workflow, not another blank prompt box</h2>
            <p class="section-desc">Every control exists to move a creator from curiosity to a finished clip they can picture, approve, buy, and share.</p>
          </div>
          <div class="grid-3">
            ${features.map((item, index) => `<article class="card"><div class="icon-pill">${index + 1}</div><h3>${item[0]}</h3><p>${item[1]}</p></article>`).join('')}
          </div>
        </div>
      </section>

      <section class="section alt" id="evidence" data-analytics-section="evidence">
        <div class="container">
          <div class="section-head">
            <p class="kicker">Problem, solution, evidence</p>
            <h2>A creator can see the job, the paid output, and the proof before checkout</h2>
            <p class="section-desc">The problem is vague video generation intent. The solution is a guided selfie-to-scene workflow. The evidence is a preview, plan, usage limit, consent note, and export receipt that a buyer can review.</p>
          </div>
          <div class="grid-4">
            <article class="card"><h3>Problem</h3><p>Creators know the movie moment they want but do not want to manage raw prompts, likeness risk, voice settings, and export ratios separately.</p></article>
            <article class="card"><h3>Solution</h3><p>VeoVido turns one selfie, a role, a scene format, dialogue, and export size into a paid cinematic short workflow.</p></article>
            <article class="card"><h3>Evidence</h3><p>The page exposes pricing, safety notes, FAQ answers, llms.txt, sitemap, and structured data for humans and AI assistants.</p></article>
            <article class="card"><h3>Receipt</h3><p>Checkout leads to a Director annual workflow with the generated clip, caption starter, and export settings kept together.</p></article>
          </div>
        </div>
      </section>

      <section class="section" id="scenes" data-analytics-section="scenes">
        <div class="container">
          <div class="section-head">
            <p class="kicker">Scene library</p>
            <h2>Pick a genre people instantly understand</h2>
            <p class="section-desc">The scene library turns vague AI video interest into concrete desire: this role, this shot, this caption, this export.</p>
          </div>
          <div class="grid-4">${sceneFormats.map((item) => `<article class="card scene-card"><h3>${item[0]}</h3><p>${item[1]}</p></article>`).join('')}</div>
        </div>
      </section>

      <section class="section" id="workflow" data-analytics-section="workflow">
        <div class="container">
          <div class="section-head center">
            <p class="kicker">Veo 3 Flow</p>
            <h2>From selfie to shareable film in one guided path</h2>
          </div>
          <div class="grid-4">${workflow.map((item) => `<article class="card dark"><div class="icon-pill">${item[0]}</div><h3>${item[1]}</h3><p>${item[2]}</p></article>`).join('')}</div>
        </div>
      </section>

      ${pricingSection()}

      <section class="section alt" id="guides" data-analytics-section="guides">
        <div class="container">
          <div class="section-head">
            <p class="kicker">Useful guides</p>
            <h2>Pages for the real questions people ask before they buy</h2>
          </div>
          <div class="grid-3">${keywordPages.slice(0, 9).map((page) => `<a class="card" href="/${page.slug}/"><h3>${page.keyword}</h3><p>${page.description}</p></a>`).join('')}</div>
        </div>
      </section>

      <section class="section" id="faq" data-analytics-section="faq">
        <div class="container">
          <div class="section-head center"><p class="kicker">Questions</p><h2>Clear answers before checkout</h2></div>
          <div class="faq-list">${faq.map((item, index) => `<article class="faq-item ${index === 0 ? 'open' : ''}"><button class="faq-question" type="button" aria-expanded="${index === 0 ? 'true' : 'false'}">${item[0]}<span>+</span></button><div class="faq-answer">${item[1]}</div></article>`).join('')}</div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="cta-band">
            <div><h2>Make the first clip feel inevitable.</h2><p>Director annual is selected by default because the first successful video usually leads to a series: new scenes, friends, voice, 4K exports, and faster social production.</p></div>
            <a class="btn coral" href="#pricing" data-launch-open data-launch-source="bottom_cta" data-launch-plan="director" data-launch-billing="annual" data-analytics-click="bottom_checkout" data-analytics-cta="true">Checkout Director annual</a>
          </div>
        </div>
      </section>
      ${launchModal()}
      <script>
        document.querySelectorAll('.faq-question').forEach(function (button) {
          button.addEventListener('click', function () {
            var item = button.closest('.faq-item')
            var open = item.classList.contains('open')
            document.querySelectorAll('.faq-item.open').forEach(function (node) {
              node.classList.remove('open')
              node.querySelector('.faq-question').setAttribute('aria-expanded', 'false')
            })
            if (!open) {
              item.classList.add('open')
              button.setAttribute('aria-expanded', 'true')
            }
          })
        })
        var input = document.getElementById('selfie-input')
        var title = document.getElementById('upload-title')
        var genre = document.getElementById('genre-select')
        var status = document.getElementById('scene-status')
        if (input) input.addEventListener('change', function () {
          if (input.files && input.files[0]) {
            title.textContent = 'Selfie selected'
            status.textContent = 'Selfie ready - ' + genre.value.toLowerCase() + ' selected'
          }
        })
        if (genre) genre.addEventListener('change', function () {
          status.textContent = 'Selfie ready - ' + genre.value.toLowerCase() + ' selected'
        })
      </script>
    </main>`,
    { rawTitle: true, schema: appSchema },
  )
}

function pricingSection() {
  return `<section id="pricing" class="section pricing-section" data-analytics-section="pricing">
    <div class="container">
      <div class="section-head center">
        <p class="kicker">Pricing</p>
        <h2>Start with Director annual, save 50%, and keep the page open during payment</h2>
        <p class="section-desc">The middle plan is selected because most creators need more than one generation, voice, and 4K export after the first successful clip.</p>
      </div>
      <div class="pricing-toolbar">
        <div class="billing-toggle" role="tablist" aria-label="Choose monthly or yearly billing">
          <button type="button" class="billing-chip" data-billing-option="monthly" aria-pressed="false">Monthly</button>
          <button type="button" class="billing-chip is-active" data-billing-option="annual" aria-pressed="true">Annual - 50% off</button>
        </div>
      </div>
      <div class="pricing-grid">
        ${planCard('star', 'Star', 'Single generation for creators who want one polished HD clip without watermark.', ['1 finished HD video', 'No watermark', '15 to 60 second export', 'Basic social caption'], false)}
        ${planCard('director', 'Director', 'The default creator plan for repeat movie moments, voice, and higher-quality exports.', ['10 videos per month', 'Voice clone workflow', '4K export', 'Priority render queue', 'Friend invite preview'], true)}
        ${planCard('studio', 'Studio', 'For teams, creators, and agencies that need high volume, co-stars, and API access.', ['Unlimited videos', 'Friend co-star mode', 'API access', 'Team scene library', 'Commercial workflow support'], false)}
      </div>
    </div>
  </section>`
}

function planCard(id, name, desc, features, featured) {
  const initialAmount = id === 'star' ? '9' : id === 'director' ? '14.50' : '39.50'
  const period = id === 'star' ? '/ generation' : '/ mo billed yearly'
  const note = id === 'star' ? '$9 charged once for one HD no-watermark short.' : id === 'director' ? '$174 charged yearly. Save 50% on annual billing.' : '$474 charged yearly. Save 50% on annual billing.'
  return `<article class="pricing-card ${featured ? 'featured' : ''}" data-pricing-plan="${id}">
    ${featured ? '<div class="pricing-badge">Default choice</div>' : ''}
    <div class="pricing-name">${name}</div>
    <p class="pricing-desc">${desc}</p>
    <div class="pricing-price"><span class="price-currency">$</span><span class="price-amount" data-plan-price-amount="${id}">${initialAmount}</span><span class="price-period" data-plan-price-period="${id}">${period}</span></div>
    <p class="pricing-note" data-plan-price-note="${id}">${note}</p>
    <ul class="pricing-features">${features.map((feature) => `<li class="pricing-feature"><span class="pricing-feature-icon">✓</span>${feature}</li>`).join('')}</ul>
    <button type="button" class="btn btn-pricing ${featured ? 'coral' : ''}" data-pricing-action="${id}" data-pricing-source="pricing_${id}" data-analytics-click="pricing_${id}" data-analytics-cta="true">Checkout ${name}${id === 'star' ? '' : ' annual'}</button>
  </article>`
}

function launchModal() {
  return `<div class="launch-modal-overlay" id="launch-modal" hidden>
    <div class="launch-modal-shell" role="dialog" aria-modal="true" aria-labelledby="launch-modal-title">
      <button type="button" class="launch-modal-close" data-launch-close aria-label="Close checkout">x</button>
      <div class="launch-modal-step" data-launch-step="plans">
        <p class="launch-modal-eyebrow">Choose your plan</p>
        <h2 class="launch-modal-title" id="launch-modal-title">Confirm the clip volume before secure checkout</h2>
        <p class="launch-modal-desc">Annual billing is selected by default and makes Director 50% cheaper. Payment opens in a centered Creem popup while this page stays in place behind it.</p>
        <div class="billing-toggle launch-billing-toggle" role="tablist" aria-label="Choose billing in modal">
          <button type="button" class="billing-chip" data-billing-option="monthly" aria-pressed="false">Monthly</button>
          <button type="button" class="billing-chip is-active" data-billing-option="annual" aria-pressed="true">Yearly 50% off</button>
        </div>
        <div class="launch-plan-grid">
          ${modalPlan('star', 'Star', 'One polished HD short for a single movie moment.', ['1 HD export', 'No watermark', 'Social caption starter'])}
          ${modalPlan('director', 'Director', 'The recommended plan for regular creators.', ['10 videos per month', 'Voice clone workflow', '4K export'], true)}
          ${modalPlan('studio', 'Studio', 'High-volume creation with co-stars and API.', ['Unlimited videos', 'Friend co-star mode', 'API access'])}
        </div>
        <div class="launch-modal-footer">
          <div><div class="launch-selection-label">Selected plan</div><div class="launch-selection-value" data-selection-title>Director - Yearly</div><div class="launch-selection-note" data-selection-note>$174 charged yearly. Equivalent to $14.50 per month.</div></div>
          <div class="launch-footer-actions"><button type="button" class="launch-secondary-button" data-launch-close>Not now</button><button type="button" class="launch-primary-button" data-launch-continue data-analytics-click="launch_modal_continue" data-analytics-cta="true">Continue to Checkout</button><button type="button" class="launch-secondary-button" data-launch-wallet data-analytics-click="launch_modal_usdc_wallet" data-analytics-cta="true">Pay with USDC Wallet</button></div>
        </div>
      </div>
      <div class="launch-modal-step" data-launch-step="payment" hidden>
        <button type="button" class="launch-back-link" data-launch-back>&lt; Back to plans</button>
        <p class="launch-modal-eyebrow">Secure checkout</p>
        <h2 class="launch-modal-title">Finish your VeoVido purchase</h2>
        <p class="launch-modal-desc">A payment popup opens centered on your screen. The product page stays open and blurred behind this step.</p>
        <div class="payment-summary-card"><div class="payment-summary-grid">
          <div><div class="payment-summary-label">Plan</div><div class="payment-summary-value" data-payment-plan>Director - Yearly</div></div>
          <div><div class="payment-summary-label">Billing</div><div class="payment-summary-value" data-payment-billing>$174 charged yearly</div></div>
          <div><div class="payment-summary-label">Discount</div><div class="payment-summary-value" data-payment-discount>50% off yearly pricing</div></div>
          <div><div class="payment-summary-label">Provider</div><div class="payment-summary-value" data-payment-provider>Secure Creem popup</div></div>
        </div></div>
        <div class="payment-status" data-payment-status>Preparing your checkout session.</div>
        <div class="payment-actions"><a href="#" class="launch-primary-button launch-link-button" data-payment-link target="veovido-creem-checkout" rel="noopener" hidden data-analytics-click="reopen_payment_popup" data-analytics-cta="true">Open secure payment</a><button type="button" class="launch-secondary-button" data-launch-close>Continue later</button></div>
      </div>
    </div>
  </div>`
}

function modalPlan(id, name, desc, features, featured = false) {
  const initialAmount = id === 'star' ? '9' : id === 'director' ? '14.50' : '39.50'
  const period = id === 'star' ? '/ generation' : '/ mo billed yearly'
  const note = id === 'star' ? '$9 charged once.' : id === 'director' ? '$174 charged yearly.' : '$474 charged yearly.'
  return `<button type="button" class="launch-plan-card ${featured ? 'is-featured is-selected' : ''}" data-modal-plan="${id}">
    <span class="launch-plan-chip">${featured ? 'Default choice' : name}</span>
    <div class="launch-plan-name">${name}</div>
    <p class="launch-plan-desc">${desc}</p>
    <div class="launch-plan-price"><span class="price-currency">$</span><span class="launch-plan-price-amount" data-modal-price-amount="${id}">${initialAmount}</span><span class="launch-plan-price-period" data-modal-price-period="${id}">${period}</span></div>
    <p class="launch-plan-meta" data-modal-price-note="${id}">${note}</p>
    <div class="launch-plan-features">${features.map((feature) => `<div class="launch-plan-feature">${feature}</div>`).join('')}</div>
  </button>`
}

function keywordPageHtml(page) {
  const related = keywordPages.filter((item) => item.slug !== page.slug).slice(0, 6)
  const body = `<main>
    <section class="section keyword-hero">
      <div class="container">
        <p class="eyebrow">${page.keyword}</p>
        <h1>${page.title}</h1>
        <p class="section-desc">${page.description}</p>
        <div class="keyword-cta">
          <a class="btn primary" href="/#pricing" data-launch-open data-launch-source="keyword_${page.slug}" data-launch-plan="director" data-launch-billing="annual" data-analytics-click="keyword_checkout" data-analytics-cta="true">Choose Director annual</a>
          <a class="btn" href="/#studio">Try the studio flow</a>
        </div>
      </div>
    </section>
    <section class="section alt">
      <div class="keyword-body">
        <article class="panel">
          <h2>What this search usually means</h2>
          <p>${page.intent}</p>
          <p>${page.angle}</p>
        </article>
        <article class="panel">
          <h2>How to turn the intent into a finished video</h2>
          <ul>
            <li>Start with one clear selfie so the character identity is anchored before scene generation.</li>
            <li>Pick a genre scene format instead of writing a vague prompt from scratch.</li>
            <li>Define the role, one strong line of dialogue, and the emotional ending before checkout.</li>
            <li>Choose the export ratio for TikTok, Instagram Reels, YouTube Shorts, or WeChat before rendering.</li>
            <li>Review likeness, voice, and rights before publishing or inviting a friend as co-star.</li>
          </ul>
        </article>
        <article class="panel">
          <h2>Where VeoVido fits</h2>
          <p>VeoVido is built for the creator who already wants AI video and now needs a guided purchase path. The product experience keeps the first screen concrete, shows the default Director annual plan before payment, and opens checkout in a centered Creem popup so the original page is never lost.</p>
          <p>${page.caution}</p>
        </article>
        <article class="panel">
          <h2>Related Veo guides</h2>
          <div class="grid-3">${related.map((item) => `<a class="card" href="/${item.slug}/"><h3>${item.keyword}</h3><p>${item.description}</p></a>`).join('')}</div>
        </article>
      </div>
    </section>
    ${pricingSection()}
    ${launchModal()}
  </main>`
  return shell(page.title, page.description, `/${page.slug}`, body)
}

function legalPage(kind) {
  const isPrivacy = kind === 'privacy'
  const title = isPrivacy ? 'Privacy Policy' : 'Terms of Service'
  const description = isPrivacy
    ? 'Privacy information for VeoVido visitors, purchasers, creators, and people whose face or voice may be submitted with consent.'
    : 'Terms governing VeoVido website access, checkout, AI video workflows, face and voice uploads, acceptable use, disclaimers, and liability limits.'
  const sections = isPrivacy
    ? [
        ['Last updated', `May 12, 2026. This policy applies to VeoVido at ${siteUrl} and related checkout, support, analytics, and hosted product flows.`],
        ['Information we collect', 'We may collect account, contact, payment-related, support, device, usage, analytics, and content information that you intentionally submit, including selfies, voice samples, prompts, scene choices, and invited co-star materials. Payment details are processed by payment providers and are not stored as full card data by VeoVido.'],
        ['How information is used', 'We use information to operate the service, create and deliver requested video workflows, process checkout, prevent abuse, improve conversion and reliability, provide support, comply with law, enforce terms, and protect users, rights holders, and the service.'],
        ['Faces, voices, and consent', 'You should only upload faces, voices, names, likenesses, or other personal materials when you have all required rights, permissions, and consents. We may restrict or remove content that appears non-consensual, deceptive, illegal, or unsafe.'],
        ['Service providers', 'We may use infrastructure, analytics, payment, storage, email, support, security, and AI processing providers. They may process information only as needed to provide their services, subject to their own legal obligations and contracts.'],
        ['Retention and security', 'We retain information as needed for product operation, security, legal, accounting, dispute resolution, and legitimate business purposes. No online service can guarantee absolute security, but we use reasonable safeguards and limit access where appropriate.'],
        ['Your choices', 'You may contact support@aigeamy.com to request access, correction, deletion, or export of personal information, subject to applicable law, fraud prevention, billing, security, and legitimate operational needs.'],
      ]
    : [
        ['Last updated', 'May 12, 2026. By accessing or using VeoVido, you agree to these Terms. If you use the service for an organization, you represent that you have authority to bind that organization.'],
        ['Service description', 'VeoVido provides website, checkout, and AI-video workflow experiences for planning and generating cinematic short videos from user-provided prompts, selfies, voice samples, and scene selections. Features may change, pause, or depend on third-party infrastructure.'],
        ['Consent and rights', 'You are solely responsible for ensuring that you have all rights, permissions, releases, and lawful bases needed for any face, voice, name, likeness, brand, music, image, prompt, or other content you submit. Do not upload a person without consent. Do not create deceptive, harassing, sexual, exploitative, illegal, or rights-infringing media.'],
        ['Payments and plans', 'Fees, plan limits, renewal terms, annual discounts, taxes, refunds, and support levels are shown in checkout, invoices, order pages, or written agreements. Unless required by law or a separate signed agreement, purchases are not guaranteed to be refundable after generation resources, storage, or provider costs are incurred.'],
        ['Outputs and review', 'AI outputs can be inaccurate, unexpected, incomplete, offensive, or unsuitable. You are responsible for reviewing outputs before use, publication, advertising, or sharing. VeoVido does not guarantee factual accuracy, commercial performance, platform acceptance, or legal suitability of outputs.'],
        ['Acceptable use', 'You may not misuse the service, bypass security, scrape, overload systems, reverse engineer restricted components, upload malware, violate laws or third-party rights, impersonate others deceptively, or use outputs for unlawful surveillance, fraud, discrimination, harassment, or non-consensual intimate or biometric content.'],
        ['Intellectual property', 'VeoVido and its website, branding, software, designs, and service materials are owned by their respective rights holders. You retain rights you have in submitted content, while granting us the permissions needed to process it and provide the service. Third-party model, payment, and infrastructure services remain owned by their providers.'],
        ['Disclaimers', 'To the maximum extent permitted by law, the service is provided as is and as available, without warranties of merchantability, fitness for a particular purpose, non-infringement, uninterrupted operation, or error-free results.'],
        ['Liability limits', 'To the maximum extent permitted by law, VeoVido will not be liable for indirect, incidental, special, consequential, exemplary, punitive, lost profit, lost revenue, lost data, reputational, or business interruption damages. Aggregate liability is limited to the amount you paid to VeoVido for the service giving rise to the claim in the three months before the event, or USD $100 if no payment was made.'],
        ['Indemnity and disputes', 'You agree to defend, indemnify, and hold VeoVido harmless from claims arising from your submitted content, misuse, violation of law, violation of these Terms, or infringement of rights. Disputes must first be raised through support@aigeamy.com so the parties can attempt informal resolution before legal action, except where prohibited by law.'],
      ]
  const body = `<main>
    <section class="section keyword-hero"><div class="container"><p class="eyebrow">Legal</p><h1>${title}</h1><p class="section-desc">${description}</p><div class="keyword-cta"><a class="btn primary" href="mailto:support@aigeamy.com">Email support</a><a class="btn" href="/${isPrivacy ? 'terms' : 'privacy'}/">${isPrivacy ? 'Read Terms' : 'Read Privacy'}</a></div></div></section>
    <section class="section alt"><article class="legal-article">${sections.map((item) => `<div class="panel"><h2>${item[0]}</h2><p>${item[1]}</p></div>`).join('')}</article></section>
    ${launchModal()}
  </main>`
  return shell(title, description, `/${kind}`, body)
}

function writePng(fileUrl, width, height, mode) {
  const bytesPerPixel = 4
  const raw = Buffer.alloc((width * bytesPerPixel + 1) * height)
  function setPixel(x, y, r, g, b, a = 255) {
    if (x < 0 || y < 0 || x >= width || y >= height) return
    const idx = y * (width * bytesPerPixel + 1) + 1 + x * bytesPerPixel
    raw[idx] = r
    raw[idx + 1] = g
    raw[idx + 2] = b
    raw[idx + 3] = a
  }
  for (let y = 0; y < height; y++) {
    raw[y * (width * bytesPerPixel + 1)] = 0
    for (let x = 0; x < width; x++) {
      const nx = x / width
      const ny = y / height
      let r = 18 + Math.round(46 * nx + 42 * (1 - ny))
      let g = 22 + Math.round(32 * ny)
      let b = 34 + Math.round(42 * (1 - nx))
      if (mode === 'og') {
        r += 18
        g += 10
      }
      setPixel(x, y, r, g, b, 255)
    }
  }
  function rect(x, y, w, h, color, alpha = 255) {
    for (let yy = y; yy < y + h; yy++) {
      for (let xx = x; xx < x + w; xx++) {
        const idx = yy * (width * bytesPerPixel + 1) + 1 + xx * bytesPerPixel
        const a = alpha / 255
        raw[idx] = Math.round(color[0] * a + raw[idx] * (1 - a))
        raw[idx + 1] = Math.round(color[1] * a + raw[idx + 1] * (1 - a))
        raw[idx + 2] = Math.round(color[2] * a + raw[idx + 2] * (1 - a))
        raw[idx + 3] = 255
      }
    }
  }
  function circle(cx, cy, radius, color, alpha = 255) {
    const rr = radius * radius
    for (let y = cy - radius; y <= cy + radius; y++) {
      for (let x = cx - radius; x <= cx + radius; x++) {
        if ((x - cx) * (x - cx) + (y - cy) * (y - cy) <= rr) rect(x, y, 1, 1, color, alpha)
      }
    }
  }
  rect(62, 62, width - 124, height - 124, [255, 250, 241], 24)
  rect(110, 120, Math.round(width * .38), height - 230, [255, 255, 255], 210)
  rect(Math.round(width * .53), 120, Math.round(width * .36), height - 230, [17, 21, 31], 230)
  rect(Math.round(width * .56), 154, Math.round(width * .30), Math.round(height * .28), [111, 29, 59], 210)
  rect(Math.round(width * .58), Math.round(height * .47), Math.round(width * .26), 44, [244, 109, 79], 230)
  rect(Math.round(width * .58), Math.round(height * .57), Math.round(width * .20), 28, [244, 189, 76], 210)
  rect(Math.round(width * .58), Math.round(height * .66), Math.round(width * .24), 28, [58, 169, 158], 210)
  circle(245, 245, 72, [244, 189, 76], 255)
  circle(245, 230, 38, [111, 29, 59], 245)
  rect(180, 330, 280, 34, [111, 29, 59], 230)
  rect(180, 386, 360, 24, [244, 109, 79], 180)
  rect(180, 430, 300, 24, [58, 169, 158], 180)
  for (let i = 0; i < 9; i++) {
    rect(Math.round(width * .535) + i * 50, height - 145, 28, 36, [255, 255, 255], 70)
  }
  const signature = Buffer.from(mode === 'og' ? 'VeoVido' : 'selfie to cinema')
  for (let i = 0; i < signature.length; i++) {
    const val = signature[i]
    rect(180 + i * 18, height - 115, 9, 42 - (val % 20), [255, 250, 241], 150)
  }
  const png = encodePng(width, height, raw)
  return writeFile(fileUrl, png)
}

function encodePng(width, height, raw) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8
  ihdr[9] = 6
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0
  return Buffer.concat([signature, chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0))])
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type)
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length, 0)
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0)
  return Buffer.concat([len, typeBuf, data, crc])
}

const crcTable = new Uint32Array(256).map((_, n) => {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  return c >>> 0
})

function crc32(buf) {
  let c = 0xffffffff
  for (const byte of buf) c = crcTable[(c ^ byte) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function sitemapXml() {
  const paths = ['/', ...keywordPages.map((page) => `/${page.slug}`), '/privacy', '/terms']
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <url>
    <loc>${siteUrl}${path === '/' ? '/' : `${path}/`}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${path === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${path === '/' ? '1.0' : path === '/privacy' || path === '/terms' ? '0.35' : '0.82'}</priority>
  </url>`).join('\n')}
</urlset>`
}

async function main() {
  await rm(publicDir, { recursive: true, force: true })
  await mkdir(assetsDir, { recursive: true })
  await writeFile(new URL('assets/site.css', publicDir), css)
  await writeFile(new URL('assets/analytics.js', publicDir), analyticsJs)
  await writeFile(new URL('assets/launch-flow.js', publicDir), launchFlowJs)
  await writeFile(new URL('favicon.svg', publicDir), '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#11151f"/><path d="M16 18h32l-5 28H21L16 18Zm9 7 5 13h4l6-13h-6l-3 8-3-8h-3Z" fill="#f46d4f"/><circle cx="47" cy="18" r="7" fill="#f4bd4c"/></svg>')
  await writePng(new URL('assets/veovido-cinematic-preview.png', publicDir), 1200, 760, 'preview')
  await writePng(new URL('assets/og-image.png', publicDir), 1200, 630, 'og')
  await writeFile(new URL('index.html', publicDir), homeHtml())
  for (const page of keywordPages) {
    await mkdir(new URL(`${page.slug}/`, publicDir), { recursive: true })
    await writeFile(new URL(`${page.slug}/index.html`, publicDir), keywordPageHtml(page))
  }
  await mkdir(new URL('privacy/', publicDir), { recursive: true })
  await mkdir(new URL('terms/', publicDir), { recursive: true })
  await writeFile(new URL('privacy/index.html', publicDir), legalPage('privacy'))
  await writeFile(new URL('terms/index.html', publicDir), legalPage('terms'))
  await writeFile(new URL('sitemap.xml', publicDir), sitemapXml())
  await writeFile(new URL('robots.txt', publicDir), `User-agent: *
Allow: /
Disallow: /api/
Sitemap: ${siteUrl}/sitemap.xml
`)
  await writeFile(new URL('_headers', publicDir), `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), payment=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
`)
  await writeFile(new URL('BingSiteAuth.xml', publicDir), '<?xml version="1.0"?><users></users>')
}

await main()
