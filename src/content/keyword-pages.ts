export type DifferentiationBrief = {
  title: string;
  example: string;
  dataPoint: string;
  contrast: string;
  limitation: string;
};

export type KeywordPageBase = {
  slug: string;
  path: string;
  keyword: string;
  title: string;
  description: string;
  intro: string;
  thesis: string;
  sections: Array<{
    heading: string;
    body: string;
    bullets: string[];
  }>;
  playbook: string[];
  checklist: string[];
};

export type KeywordPage = KeywordPageBase & {
  differentiation: DifferentiationBrief;
};

const rawKeywordPages: KeywordPageBase[] = [
  {
    slug: "generative-engine-optimization",
    path: "/generative-engine-optimization",
    keyword: "Generative Engine Optimization",
    title: "Generative Engine Optimization for Brands That Need AI Visibility",
    description:
      "A practical guide to generative engine optimization, including citation tracking, answer-ready content, source trust, and conversion attribution.",
    intro:
      "Generative engine optimization is the work of making a brand easier for AI answer engines to understand, trust, cite, and send visitors back to. It overlaps with SEO, but the operating metric is different: whether an AI answer uses your brand or page as evidence.",
    thesis:
      "The useful GEO program measures citations first, then improves the pages and signals that make those citations more likely to earn clicks.",
    sections: [
      {
        heading: "What changes from SEO",
        body: "Search results still matter, but buyers increasingly see a synthesized answer before they see a list of links. That means content needs clear entities, direct answers, authoritative evidence, fresh data, and page structures that a model can quote without guessing.",
        bullets: [
          "Track prompts and answer patterns, not only ranked keywords.",
          "Separate brand mentions from linked source citations.",
          "Add evidence blocks, comparison tables, FAQs, definitions, and schema where they help users.",
          "Measure traffic and conversion after citation changes, not only impressions.",
        ],
      },
      {
        heading: "How GeoBase approaches it",
        body: "GeoBase connects the monitoring layer with the optimization layer. A visibility report shows which prompts cite you, which cite competitors, and which pages need stronger trust signals before the next content sprint.",
        bullets: [
          "Citation frequency by brand, product, page, prompt, and answer engine.",
          "Citable-page scoring for structure, source signals, and schema readiness.",
          "Competitor share of answers and source co-occurrence.",
          "AI search attribution estimates tied to first-party events.",
        ],
      },
    ],
    playbook: [
      "Choose the buying questions your audience asks before comparing vendors.",
      "Track answer visibility for your brand, products, and two to five competitors.",
      "Audit pages that should be cited but are missing from answers.",
      "Improve answer blocks, source references, author signals, and schema.",
      "Review weekly citation movement and monthly conversion impact.",
    ],
    checklist: [
      "Prompts match real buyer language.",
      "Pages answer the question within the first screen.",
      "Claims have dated sources or first-party data.",
      "FAQ and schema support the page rather than acting as filler.",
      "Reports separate visibility, click potential, and conversion outcomes.",
    ],
  },
  {
    slug: "answer-engine-optimization",
    path: "/answer-engine-optimization",
    keyword: "Answer Engine Optimization",
    title: "Answer Engine Optimization for AI Search and Decision Pages",
    description:
      "A clear guide to answer engine optimization, from answer-first page structure and FAQ design to AI citation monitoring and attribution.",
    intro:
      "Answer engine optimization makes content easier for search engines and AI systems to use when generating a direct answer. The goal is not to decorate pages with keywords. The goal is to make the answer, evidence, and next step unmistakable.",
    thesis:
      "Strong AEO gives users a concise answer and gives answer engines enough structure and trust to cite it.",
    sections: [
      {
        heading: "The answer-first structure",
        body: "A page built for answer engines usually has a direct answer, supporting evidence, plain definitions, comparison context, and a clear next action. This helps users and machines for the same reason: it reduces ambiguity.",
        bullets: [
          "Put the direct answer near the top of the page.",
          "Use short sections with descriptive headings.",
          "Add tables or bullets only where they make comparison easier.",
          "Show sources, dates, authors, and update signals when claims depend on them.",
        ],
      },
      {
        heading: "Where AEO fits inside GEO",
        body: "AEO improves the page and answer format. GEO adds visibility monitoring, competitor citation analysis, and revenue attribution. Teams need both when AI answers affect discovery, trust, and conversion.",
        bullets: [
          "AEO asks whether the page can answer a question clearly.",
          "GEO asks whether AI engines actually cite the brand or page.",
          "AEO is useful before publishing.",
          "GEO is useful before and after publishing because it measures outcomes.",
        ],
      },
    ],
    playbook: [
      "Map one page to one primary answer job.",
      "Write the direct answer first, then add evidence and caveats.",
      "Use FAQ schema only when the questions are useful to readers.",
      "Monitor whether answer engines quote or link the page after publishing.",
    ],
    checklist: [
      "The page does not hide the answer behind vague introductions.",
      "Headings describe the question being answered.",
      "The next step is obvious for a buyer who trusts the answer.",
      "The content is useful even without knowing the keyword target.",
    ],
  },
  {
    slug: "generative-engine-optimization-github",
    path: "/generative-engine-optimization-github",
    keyword: "Generative Engine Optimization github",
    title: "Generative Engine Optimization GitHub Guide: What to Build and What to Avoid",
    description:
      "How to evaluate and build GitHub workflows for generative engine optimization, including prompt tracking, citation audits, schema checks, and reporting.",
    intro:
      "A GitHub repository can help a team prototype generative engine optimization, but a useful setup needs more than a scraper. It needs repeatable prompts, clean logging, page diagnostics, and a way to connect citation movement to business results.",
    thesis:
      "Open workflows are useful for experimentation; durable GEO needs reliable monitoring, normalized data, and conversion context.",
    sections: [
      {
        heading: "Useful repository components",
        body: "A practical GEO repository should separate prompt inventory, answer capture, citation extraction, page scoring, and reporting. Keeping those modules separate makes it easier to validate results and replace brittle checks.",
        bullets: [
          "Prompt sets grouped by market, product, funnel stage, and intent.",
          "Citation parsers that store source URLs, brand mentions, and answer snippets.",
          "Page audits for schema, headings, claims, authorship, and data freshness.",
          "Reports that compare your brand against named competitors.",
        ],
      },
      {
        heading: "Common mistakes",
        body: "Many experimental scripts count mentions without checking whether the answer linked to the brand, used the page as a source, or sent qualified visitors. That makes the chart look busy while the team still lacks a decision.",
        bullets: [
          "Do not rely on one prompt run as a trend.",
          "Do not store private prompts or customer data in public repositories.",
          "Do not treat a mention and a linked citation as the same thing.",
          "Do not skip manual review for high-value commercial prompts.",
        ],
      },
    ],
    playbook: [
      "Start with a private repository and sanitized prompt samples.",
      "Define a JSON schema for answer runs before collecting data.",
      "Log engine, date, prompt, answer type, cited URLs, and brand positions.",
      "Use GeoBase or a similar system when you need production monitoring and attribution.",
    ],
    checklist: [
      "Secrets are stored outside the repository.",
      "The workflow can rerun the same prompt set consistently.",
      "Outputs distinguish citations, mentions, and competitor references.",
      "Reports are readable by content, growth, and executive teams.",
    ],
  },
  {
    slug: "generative-engine-optimization-pdf",
    path: "/generative-engine-optimization-pdf",
    keyword: "Generative engine optimization pdf",
    title: "Generative Engine Optimization PDF: What a Useful Report Should Include",
    description:
      "A practical outline for a useful generative engine optimization PDF report, including citation trends, competitor visibility, citable-page diagnostics, and recommendations.",
    intro:
      "A generative engine optimization PDF should not be a static keyword report. It should explain how often AI answers cite the brand, where competitors appear instead, which pages need work, and what the team should change next.",
    thesis:
      "The best PDF is a decision memo: it shows the current visibility, the revenue risk, and the next content moves.",
    sections: [
      {
        heading: "Core report sections",
        body: "Executives need the trend, content teams need the causes, and growth teams need the conversion impact. A good PDF gives each group the part they can act on without turning into a hundred-page data dump.",
        bullets: [
          "Executive summary with citation share and competitor gap.",
          "Prompt groups by funnel stage and buyer intent.",
          "Source pages that were cited, ignored, or displaced by competitors.",
          "Next-page recommendations with expected impact and effort.",
        ],
      },
      {
        heading: "How to keep it credible",
        body: "A GEO report is only useful when the methodology is clear. It should disclose engines checked, prompt sampling, date range, and how mentions differ from citations.",
        bullets: [
          "Show the monitoring window and prompt count.",
          "Explain what qualifies as a citation.",
          "Label estimates separately from observed events.",
          "Include screenshots or answer excerpts only when review is needed.",
        ],
      },
    ],
    playbook: [
      "Open with one page of trend, gap, and recommendation.",
      "Group findings by business question rather than by crawler output.",
      "Attach page-level fixes after the summary.",
      "Use the next report to show whether fixes changed citations and conversions.",
    ],
    checklist: [
      "The report is short enough for leadership to read.",
      "Every chart has a decision attached.",
      "The PDF separates data, interpretation, and recommendation.",
      "The next action leads to a page, owner, and timeline.",
    ],
  },
  {
    slug: "generative-engine-optimization-course",
    path: "/generative-engine-optimization-course",
    keyword: "Generative Engine Optimization course",
    title: "Generative Engine Optimization Course Outline for Modern Marketing Teams",
    description:
      "A practical GEO course outline covering AI answer behavior, citation tracking, citable content, competitor visibility, reporting, and attribution.",
    intro:
      "A useful generative engine optimization course should teach teams how AI answers are formed, how citations are measured, and how page improvements translate into visibility and pipeline. It should not be a list of hacks.",
    thesis:
      "The course should train a repeatable operating system: measure, diagnose, improve, attribute, and report.",
    sections: [
      {
        heading: "Core modules",
        body: "The strongest training programs combine search fundamentals with AI answer behavior. Teams need shared language before they can decide which pages to improve or which metrics to trust.",
        bullets: [
          "How AI answer engines summarize, compare, and cite sources.",
          "Prompt inventory design for commercial and informational intent.",
          "Citable-page structure, schema, entity clarity, and evidence blocks.",
          "Reporting, competitor benchmarking, and attribution basics.",
        ],
      },
      {
        heading: "Hands-on exercises",
        body: "A course becomes useful when teams audit real pages and prompts. Each exercise should end with a page change, a measurement plan, or a report that can be used in the next content sprint.",
        bullets: [
          "Build a prompt map for one product category.",
          "Review AI answers for brand mentions and linked sources.",
          "Rewrite a weak page into an answer-ready page.",
          "Create a one-page visibility report for leadership.",
        ],
      },
    ],
    playbook: [
      "Start with one product or market so examples stay concrete.",
      "Use live prompts, but remove private customer data from training.",
      "Give every participant a scorecard they can reuse.",
      "End with a 30-day measurement plan.",
    ],
    checklist: [
      "Participants learn how to interpret citations, not just collect them.",
      "The course includes examples and counterexamples.",
      "Exercises produce real page improvements.",
      "The final deliverable can plug into a monthly GEO report.",
    ],
  },
  {
    slug: "generative-engine-optimization-tool",
    path: "/generative-engine-optimization-tool",
    keyword: "Generative Engine optimization tool",
    title: "Generative Engine Optimization Tool: Features That Actually Matter",
    description:
      "How to choose a generative engine optimization tool for AI citation tracking, citable-page diagnostics, competitor visibility, and attribution.",
    intro:
      "A generative engine optimization tool should show whether AI answers cite you, why they choose certain pages, and how that visibility affects traffic and conversion. A rank tracker alone is not enough.",
    thesis:
      "The right tool makes AI answer visibility measurable, explainable, and improvable.",
    sections: [
      {
        heading: "Must-have features",
        body: "The core job is to make hidden AI search behavior visible. That requires prompt tracking, answer capture, citation normalization, and page diagnostics that the content team can act on.",
        bullets: [
          "Citation tracking across major AI answer surfaces.",
          "Prompt grouping by funnel stage, market, persona, and product.",
          "Competitor share of answers and page-source comparison.",
          "Page-level recommendations for FAQ, schema, references, and structure.",
        ],
      },
      {
        heading: "Buying criteria",
        body: "A useful tool should be easy enough for content teams, rigorous enough for analysts, and clear enough for executives. It should also avoid pretending that every estimate is an observed click.",
        bullets: [
          "Transparent methodology for citations and estimates.",
          "First-party analytics integration or export.",
          "Reports that compare trends week over week.",
          "Controls for brands, regions, and tracked terms.",
        ],
      },
    ],
    playbook: [
      "Start by tracking ten to fifty buyer prompts.",
      "Benchmark against at least three competitors.",
      "Use diagnostics to improve the most commercially relevant pages first.",
      "Review conversion movement after visibility changes.",
    ],
    checklist: [
      "The tool distinguishes mentions from citations.",
      "It supports the regions and engines your buyers use.",
      "It gives specific page fixes, not vague scores.",
      "It can export a report leadership will read.",
    ],
  },
  {
    slug: "generative-engine-optimization-strategies",
    path: "/generative-engine-optimization-strategies",
    keyword: "Generative Engine Optimization strategies",
    title: "Generative Engine Optimization Strategies for AI Search Growth",
    description:
      "Practical generative engine optimization strategies for improving AI citations, answer share, trust signals, and conversion from AI search.",
    intro:
      "Generative engine optimization strategies work best when they start with the questions buyers ask and the sources AI answers already trust. The goal is to improve answer visibility without turning useful pages into keyword clutter.",
    thesis:
      "The strongest strategy improves the evidence, clarity, and authority that answer engines need while protecting conversion quality.",
    sections: [
      {
        heading: "Strategy stack",
        body: "A complete strategy combines prompt mapping, page diagnostics, competitor analysis, content restructuring, and attribution. Skipping any layer makes it hard to know whether the work is improving visibility or only producing more content.",
        bullets: [
          "Map prompts by intent: problem, comparison, evaluation, and purchase.",
          "Audit which competitors are cited and why.",
          "Improve pages with concise answers, evidence, and schema.",
          "Connect visibility movement to sessions, leads, and sales outcomes.",
        ],
      },
      {
        heading: "Prioritization",
        body: "Not every prompt deserves the same effort. Start where a better answer can influence a commercial decision and where the page already has enough authority to become citable with focused improvement.",
        bullets: [
          "Prioritize prompts where competitors appear and you do not.",
          "Fix pages that already rank or earn backlinks before creating new ones.",
          "Use comparison and alternative pages when buyers ask vendor questions.",
          "Refresh data-heavy pages on a predictable schedule.",
        ],
      },
    ],
    playbook: [
      "Build a prompt map for the top buyer journeys.",
      "Measure baseline citation share for your brand and competitors.",
      "Score the pages most likely to earn citations.",
      "Ship focused content changes, then remeasure the same prompt set.",
    ],
    checklist: [
      "The strategy has a baseline and a reporting cadence.",
      "Each recommendation points to a real page.",
      "The team knows which competitor answers matter.",
      "Revenue or conversion indicators are monitored after visibility improves.",
    ],
  },
  {
    slug: "generative-engine-optimization-paper",
    path: "/generative-engine-optimization-paper",
    keyword: "Generative Engine Optimization paper",
    title: "Generative Engine Optimization Paper: How to Read the Research",
    description:
      "A practical reading guide for the generative engine optimization paper and related research, with takeaways for marketing and content teams.",
    intro:
      "The academic work around generative engine optimization helped define the category: websites can change how generative engines present, cite, and rank their content in synthesized answers. Teams should read the research as a framework, not a shortcut.",
    thesis:
      "The research is most useful when translated into measurement, trustworthy content structure, and repeatable experiments.",
    sections: [
      {
        heading: "Key ideas to extract",
        body: "The important lesson is not that one formatting trick wins forever. The lesson is that answer engines respond to signals such as clarity, evidence, authority, quotations, statistics, and page structure when composing answers.",
        bullets: [
          "Measure visibility in generated answers rather than only blue-link rankings.",
          "Test content changes against a stable prompt set.",
          "Look for visibility lift, source quality, and answer usefulness together.",
          "Avoid manipulative changes that reduce reader trust.",
        ],
      },
      {
        heading: "How teams should apply it",
        body: "A marketing team should convert the research into a disciplined workflow. Start with observed prompts, score the pages that should be cited, improve evidence and structure, then compare answer visibility before and after.",
        bullets: [
          "Use experiments, not assumptions, to evaluate page changes.",
          "Keep citation and traffic metrics separate.",
          "Review whether answer quality improves for the user.",
          "Document methods so monthly reports are credible.",
        ],
      },
    ],
    playbook: [
      "Read the abstract and method before the tactics.",
      "Translate each tactic into a page-level hypothesis.",
      "Run tests on pages with commercial value.",
      "Use GeoBase to monitor whether changes alter citations over time.",
    ],
    checklist: [
      "The team understands the difference between research conditions and production search.",
      "Experiments use the same prompt set before and after changes.",
      "Visibility lift is reviewed with content quality.",
      "The findings are not used to justify thin or misleading pages.",
    ],
  },
  {
    slug: "generative-engine-optimization-book",
    path: "/generative-engine-optimization-book",
    keyword: "Generative Engine Optimization book",
    title: "Generative Engine Optimization Book: A Practical Chapter Plan",
    description:
      "What a useful generative engine optimization book should cover, from AI answer behavior and content structure to reporting and attribution.",
    intro:
      "A generative engine optimization book would be useful if it explains the operating model, not only the vocabulary. The reader needs a way to measure AI visibility, improve pages, and connect the work to business outcomes.",
    thesis:
      "The best book structure would teach principles, workflows, examples, and measurement rather than chasing short-lived tricks.",
    sections: [
      {
        heading: "Recommended chapters",
        body: "A strong book should move from foundations to execution. It should help readers understand how AI answers work, how citations differ from rankings, and how content teams can improve page trust without sacrificing conversion.",
        bullets: [
          "AI answer engines and the new visibility problem.",
          "Prompt mapping and buyer-intent research.",
          "Citable content design, schema, evidence, and entity clarity.",
          "Competitor visibility, reporting, and revenue attribution.",
        ],
      },
      {
        heading: "What examples should show",
        body: "Examples should include before-and-after page structures, prompt groups, citation reports, and executive summaries. Readers should finish with templates they can adapt.",
        bullets: [
          "A comparison page that begins earning citations.",
          "A product page that needs stronger evidence.",
          "A competitor visibility leaderboard.",
          "A monthly GEO report tied to pipeline.",
        ],
      },
    ],
    playbook: [
      "Use the chapter plan as a training curriculum.",
      "Build templates for prompt maps and page scorecards.",
      "Apply one lesson to a real page each week.",
      "Track citation changes so the learning becomes measurable.",
    ],
    checklist: [
      "The material teaches measurement before tactics.",
      "Examples include failure cases.",
      "Templates are practical for small teams.",
      "The book connects GEO to SEO, PR, content, and demand generation.",
    ],
  },
  {
    slug: "generative-engine-optimization-examples",
    path: "/generative-engine-optimization-examples",
    keyword: "Generative engine optimization examples",
    title: "Generative Engine Optimization Examples for Real Content Teams",
    description:
      "Concrete generative engine optimization examples showing how pages can improve AI citations, answer share, and qualified traffic.",
    intro:
      "Generative engine optimization examples are most helpful when they show the page problem, the answer-engine behavior, the content fix, and the measurement plan. A vague before-and-after does not help teams repeat the result.",
    thesis:
      "A good example makes the citation gap visible and shows exactly which page change is expected to close it.",
    sections: [
      {
        heading: "Example: comparison page",
        body: "A software brand appears in organic search but AI answers cite two competitors when buyers ask for category comparisons. The page has claims but no dated evidence, no comparison table, and no concise summary.",
        bullets: [
          "Add a direct answer that defines the category and buyer fit.",
          "Use a comparison table with source-backed feature claims.",
          "Add FAQ sections for buyer objections and alternatives.",
          "Monitor the same comparison prompts weekly.",
        ],
      },
      {
        heading: "Example: product evidence page",
        body: "A brand is mentioned in answers but rarely cited as a source. The fix is to create a durable evidence page with original data, definitions, methodology, and linkable charts.",
        bullets: [
          "Publish first-party benchmarks with a clear update date.",
          "Add author and methodology context.",
          "Use schema that matches the content type.",
          "Connect citation changes to assisted sessions and signups.",
        ],
      },
    ],
    playbook: [
      "Choose one missing-citation prompt with commercial intent.",
      "Identify the page that should be cited.",
      "Add evidence, structure, and answer-ready sections.",
      "Measure citations, clicks, and conversions for the next reporting window.",
    ],
    checklist: [
      "The example includes a baseline.",
      "The content fix is visible to users.",
      "The test does not depend on one prompt run.",
      "The result can inform the next page.",
    ],
  },
  {
    slug: "answer-engine-optimization-examples",
    path: "/answer-engine-optimization-examples",
    keyword: "Answer engine optimization examples",
    title: "Answer Engine Optimization Examples That Improve Real Pages",
    description:
      "Answer engine optimization examples for FAQs, comparison pages, product pages, tutorials, and evidence pages.",
    intro:
      "Answer engine optimization examples should show how to make a page easier to understand, cite, and act on. The best examples help humans first and make machine interpretation easier as a result.",
    thesis:
      "AEO works when the page gives a clear answer, trustworthy support, and a next step.",
    sections: [
      {
        heading: "Example: FAQ that earns trust",
        body: "A useful FAQ is not a hidden keyword block. It answers real buyer concerns, links to deeper evidence, and uses schema only when the questions are genuinely part of the page.",
        bullets: [
          "Answer the question in one or two direct sentences.",
          "Add context or caveats immediately after the direct answer.",
          "Use internal links to data, pricing, documentation, or examples.",
          "Avoid repeating the same wording across many pages.",
        ],
      },
      {
        heading: "Example: tutorial page",
        body: "A tutorial page can support answer engines by using step names, prerequisites, expected output, and common failure modes. That structure helps both readers and AI-generated summaries.",
        bullets: [
          "List prerequisites before the steps.",
          "Use numbered steps for the main workflow.",
          "Add troubleshooting sections for common mistakes.",
          "Include a summary that helps users choose the next action.",
        ],
      },
    ],
    playbook: [
      "Pick a page where users arrive with a clear question.",
      "Move the direct answer closer to the top.",
      "Add the missing evidence or caveat.",
      "Monitor whether answer engines cite the improved page.",
    ],
    checklist: [
      "The example solves a user problem.",
      "The page is skimmable without being thin.",
      "The answer is not buried under promotional copy.",
      "The CTA follows naturally from the answer.",
    ],
  },
  {
    slug: "answer-engine-optimization-course",
    path: "/answer-engine-optimization-course",
    keyword: "Answer Engine Optimization course",
    title: "Answer Engine Optimization Course Outline for Content Teams",
    description:
      "A practical answer engine optimization course outline covering answer-first structure, FAQs, schema, evidence, and measurement.",
    intro:
      "An answer engine optimization course should teach teams how to build pages that answer clearly, cite evidence, and support conversion. It should improve editorial judgment rather than encourage mechanical formatting.",
    thesis:
      "The best AEO course trains writers to make the right answer obvious and trustworthy.",
    sections: [
      {
        heading: "Course modules",
        body: "The curriculum should cover how users ask questions, how answer engines parse pages, and how teams can structure content without making it sound unnatural.",
        bullets: [
          "Question research and intent grouping.",
          "Answer-first page architecture.",
          "FAQ, schema, glossary, and comparison formats.",
          "Measurement with citation tracking and conversion indicators.",
        ],
      },
      {
        heading: "Exercises",
        body: "A course should include real page rewrites. Teams learn faster when they can compare the old page, the improved structure, and the monitoring plan.",
        bullets: [
          "Rewrite a vague introduction into a direct answer.",
          "Turn a loose article into a structured guide.",
          "Add evidence and source context to a claim-heavy page.",
          "Create a short report showing whether the page was cited.",
        ],
      },
    ],
    playbook: [
      "Train on one page type at a time.",
      "Review examples from your own site.",
      "Give writers a scoring checklist.",
      "Use GeoBase to track whether improvements affect AI citations.",
    ],
    checklist: [
      "The course improves human readability.",
      "Schema is taught as support, not decoration.",
      "Examples cover both informational and commercial pages.",
      "The team leaves with a repeatable review process.",
    ],
  },
  {
    slug: "answer-engine-optimization-vs-generative-engine-optimization",
    path: "/answer-engine-optimization-vs-generative-engine-optimization",
    keyword: "Answer Engine Optimization vs Generative Engine Optimization",
    title: "Answer Engine Optimization vs Generative Engine Optimization",
    description:
      "A practical comparison of answer engine optimization and generative engine optimization, including where each fits in AI search strategy.",
    intro:
      "Answer engine optimization and generative engine optimization are related, but they are not identical. AEO focuses on making a page answer-ready. GEO adds the measurement and optimization loop for generated AI answers and citations.",
    thesis:
      "Use AEO to improve page clarity and use GEO to measure whether AI answer engines actually cite and convert from that clarity.",
    sections: [
      {
        heading: "The simplest difference",
        body: "AEO asks whether the content can answer a question clearly. GEO asks whether AI answer systems surface, mention, cite, and send visitors from that answer environment.",
        bullets: [
          "AEO is page and format focused.",
          "GEO is visibility, citation, and attribution focused.",
          "AEO often happens before publishing.",
          "GEO continues after publishing because the trend matters.",
        ],
      },
      {
        heading: "How they work together",
        body: "A page can be well structured and still not appear in answers if competitors have stronger authority or source signals. A GEO workflow identifies that gap, while AEO provides many of the page-level fixes.",
        bullets: [
          "Use GEO to pick the prompts and pages that matter.",
          "Use AEO to improve the page experience.",
          "Use competitor visibility to set priorities.",
          "Use attribution to prove the work affected outcomes.",
        ],
      },
    ],
    playbook: [
      "Start with GEO monitoring to find the missing answer opportunities.",
      "Apply AEO structure to the pages most likely to earn citations.",
      "Rerun the same prompts after improvements.",
      "Report answer share, source citations, sessions, and conversions separately.",
    ],
    checklist: [
      "The team is not using the terms interchangeably.",
      "AEO work is tied to a measured GEO opportunity.",
      "The report distinguishes source citations from generic mentions.",
      "The next content sprint follows the visibility data.",
    ],
  },
  {
    slug: "answer-engine-optimization-hubspot",
    path: "/answer-engine-optimization-hubspot",
    keyword: "Answer engine optimization HubSpot",
    title: "Answer Engine Optimization for HubSpot Teams",
    description:
      "How teams using HubSpot can approach answer engine optimization across CMS pages, blogs, landing pages, CRM attribution, and reporting.",
    intro:
      "Teams using HubSpot often have the content, CRM, forms, and reporting needed for answer engine optimization. The missing piece is usually a clear AI citation workflow and page-level diagnostics.",
    thesis:
      "HubSpot can manage the content and conversion layer; GeoBase adds AI answer visibility and citation diagnostics around it.",
    sections: [
      {
        heading: "Where HubSpot helps",
        body: "HubSpot is useful when landing pages, blogs, forms, CTAs, and lifecycle reporting live in one place. That makes it easier to connect answer-ready content to lead capture and pipeline.",
        bullets: [
          "CMS pages can be structured around direct answers and FAQs.",
          "Forms and CTAs can capture demand from answer-driven visits.",
          "CRM stages help review assisted conversion quality.",
          "Campaigns can group AEO work by product or market.",
        ],
      },
      {
        heading: "What to add",
        body: "HubSpot does not replace AI answer monitoring. A team still needs to know which prompts cite the brand, which competitors appear, and which pages need stronger source signals.",
        bullets: [
          "Track answer visibility for priority prompts.",
          "Audit HubSpot pages for citable structure and evidence.",
          "Compare competitor citations before choosing content updates.",
          "Send report insights back into content and campaign planning.",
        ],
      },
    ],
    playbook: [
      "Choose HubSpot pages tied to high-intent campaigns.",
      "Audit each page for direct answers, schema, and source evidence.",
      "Track AI citations before and after updates.",
      "Compare assisted sessions and form conversions by campaign.",
    ],
    checklist: [
      "The page has a clear answer before the CTA.",
      "UTM and lifecycle reporting are consistent.",
      "AI citation trends are reviewed with campaign performance.",
      "The workflow does not depend on copying private CRM data into external prompts.",
    ],
  },
  {
    slug: "answer-engine-optimization-tutorial",
    path: "/answer-engine-optimization-tutorial",
    keyword: "Answer engine optimization tutorial",
    title: "Answer Engine Optimization Tutorial: Build an Answer-Ready Page",
    description:
      "A step-by-step answer engine optimization tutorial for turning a weak page into a clear, citable, conversion-focused page.",
    intro:
      "This answer engine optimization tutorial shows a practical workflow: choose a question, write the direct answer, add evidence, improve structure, apply schema where useful, and monitor citation outcomes.",
    thesis:
      "AEO is a page-improvement workflow, not a one-time metadata task.",
    sections: [
      {
        heading: "Step-by-step process",
        body: "Start with the question the page should answer. Then build around the answer using evidence, definitions, comparisons, examples, and a next step that matches user intent.",
        bullets: [
          "Write the target question and direct answer.",
          "Add supporting evidence, dates, and source context.",
          "Use headings that describe the questions being answered.",
          "Add FAQ or HowTo schema only when it reflects real page content.",
        ],
      },
      {
        heading: "Measurement",
        body: "After publishing, measure whether the page is cited or summarized by AI answer engines. If the page is not appearing, compare it against pages that are cited and look for missing trust signals.",
        bullets: [
          "Track the same prompt set before and after updates.",
          "Review answer sentiment and source URLs.",
          "Check whether competitors are cited instead.",
          "Use traffic and conversion signals to prioritize follow-up work.",
        ],
      },
    ],
    playbook: [
      "Pick one high-intent page.",
      "Add a direct answer and a supporting evidence block.",
      "Improve FAQ, schema, and internal links.",
      "Monitor AI citations weekly for one month.",
    ],
    checklist: [
      "The page answers a real question quickly.",
      "The content includes enough context to be trusted.",
      "Schema matches visible content.",
      "The CTA is aligned with the user's stage.",
    ],
  },
  {
    slug: "answer-engine-optimization-tools",
    path: "/answer-engine-optimization-tools",
    keyword: "Answer Engine optimization tools",
    title: "Answer Engine Optimization Tools: What to Use and Why",
    description:
      "A practical guide to answer engine optimization tools for page structure, schema, AI citation tracking, competitor visibility, and reporting.",
    intro:
      "Answer engine optimization tools should help teams build better answers and verify whether those answers are surfaced. A checklist tool without monitoring leaves the team guessing.",
    thesis:
      "The right tool stack combines page quality checks with AI answer visibility measurement.",
    sections: [
      {
        heading: "Tool categories",
        body: "A useful stack normally includes content planning, page diagnostics, schema validation, citation monitoring, and analytics. Teams can start simple, but the layers should connect over time.",
        bullets: [
          "Question and prompt research tools.",
          "Content structure and schema validators.",
          "AI citation tracking and competitor visibility platforms.",
          "Analytics tools for sessions, leads, and conversion quality.",
        ],
      },
      {
        heading: "Evaluation criteria",
        body: "Choose tools that provide specific recommendations. A score is helpful only when it explains what to change, why it matters, and how to measure the result.",
        bullets: [
          "Transparent scoring for answer clarity and trust signals.",
          "Citation tracking across relevant answer surfaces.",
          "Competitor comparison for the same prompts.",
          "Reports that content and demand teams can use together.",
        ],
      },
    ],
    playbook: [
      "Start with prompt tracking and page diagnostics.",
      "Use schema validation as a support layer.",
      "Benchmark competitors before rewriting content.",
      "Connect AI visibility reports to analytics and CRM outcomes.",
    ],
    checklist: [
      "The tool improves pages for humans.",
      "It does not confuse mentions with source citations.",
      "It supports exportable reports.",
      "It helps decide what to do next.",
    ],
  },
  {
    slug: "ai-answer-engine-optimization",
    path: "/ai-answer-engine-optimization",
    keyword: "AI answer engine optimization",
    title: "AI Answer Engine Optimization for Search, Content, and Demand Teams",
    description:
      "A practical guide to AI answer engine optimization, including page structure, trust signals, AI citations, competitor visibility, and attribution.",
    intro:
      "AI answer engine optimization is the work of making content clear, trustworthy, and useful enough for AI-generated answers to cite. It also requires monitoring because a page can look strong and still lose answer visibility to competitors.",
    thesis:
      "AI answer visibility improves when content clarity, source trust, and measurement work together.",
    sections: [
      {
        heading: "Signals to improve",
        body: "AI answer engines need more than keyword repetition. They need understandable entities, precise answers, reliable evidence, and a page structure that maps to the user's question.",
        bullets: [
          "Direct answer paragraphs for core questions.",
          "Definitions, examples, comparisons, and use cases.",
          "Source links, author context, and update dates where relevant.",
          "Schema that supports the visible content.",
        ],
      },
      {
        heading: "Metrics to monitor",
        body: "The reporting layer should show whether the work is changing AI answers, not only whether a page was edited. Track answer share, citations, competitor mentions, estimated sessions, and conversions.",
        bullets: [
          "Citation frequency by prompt and engine.",
          "Linked sources and page types.",
          "Competitor co-occurrence and displacement.",
          "Assisted sessions, signups, demos, or checkout starts.",
        ],
      },
    ],
    playbook: [
      "Choose the answer jobs that matter for buyers.",
      "Improve the pages most likely to be cited.",
      "Monitor competitors for the same prompts.",
      "Report visibility and conversion outcomes separately.",
    ],
    checklist: [
      "Pages are answer-first without sounding robotic.",
      "Claims are supported by evidence.",
      "AI visibility is measured over time.",
      "Insights are connected to content and demand planning.",
    ],
  },
  {
    slug: "answer-engine-optimization-jobs",
    path: "/answer-engine-optimization-jobs",
    keyword: "Answer Engine Optimization jobs",
    title: "Answer Engine Optimization Jobs: Skills, Responsibilities, and Hiring Signals",
    description:
      "What answer engine optimization jobs require, including content strategy, technical SEO, AI citation tracking, schema, analytics, and reporting.",
    intro:
      "Answer engine optimization jobs are emerging because AI answers change how brands are discovered and evaluated. The role blends content strategy, technical SEO, analytics, editorial judgment, and AI visibility reporting.",
    thesis:
      "A strong AEO hire can improve content for users while proving whether AI answer visibility changed.",
    sections: [
      {
        heading: "Core responsibilities",
        body: "The role usually owns answer-ready content structure, prompt and question research, page diagnostics, schema coordination, competitor monitoring, and reporting to content or growth leadership.",
        bullets: [
          "Build question maps and prompt groups for priority markets.",
          "Audit pages for clarity, evidence, schema, and conversion path.",
          "Track AI answer citations and competitor visibility.",
          "Turn monthly trends into content recommendations.",
        ],
      },
      {
        heading: "Skills to look for",
        body: "AEO is not only a writing role and not only a technical role. The best candidates can edit pages, read analytics, explain uncertainty, and work with SEO, product marketing, PR, and demand generation.",
        bullets: [
          "Strong editorial judgment and search intent analysis.",
          "Technical SEO basics, including schema and crawlability.",
          "Analytics literacy for sessions, attribution, and conversion quality.",
          "Ability to explain AI visibility metrics without overstating precision.",
        ],
      },
    ],
    playbook: [
      "Start with a combined SEO and content strategist when the team is small.",
      "Give candidates a page audit and prompt monitoring exercise.",
      "Ask how they would measure success over 30 days.",
      "Equip the role with a platform that tracks citations and reports outcomes.",
    ],
    checklist: [
      "The job description includes measurement, not only content production.",
      "The candidate can explain mentions versus citations.",
      "The role has access to analytics and content publishing workflows.",
      "Leadership expects trend improvement, not instant certainty.",
    ],
  },
];

const differentiationBriefs: Record<string, DifferentiationBrief> = {
  "generative-engine-optimization": {
    title: "How to make this GEO page less interchangeable",
    example:
      "Use a real visibility audit pattern: choose 40 to 60 buyer prompts, run the same prompt set weekly, and separate brand mentions from linked source citations.",
    dataPoint:
      "Record prompt count, engine, date, cited URL, competitor cited, citation type, and follow-up session or signup signal.",
    contrast:
      "Generic GEO content says AI search is changing SEO. Distinct GEO content shows the exact prompts, missing source citations, and page fixes behind the change.",
    limitation:
      "A single prompt run is not reliable enough for a claim. Treat it as a snapshot until the same prompt set is measured over time.",
  },
  "answer-engine-optimization": {
    title: "How to turn AEO advice into visible page evidence",
    example:
      "Show a before-and-after answer block: one vague introduction, one two-sentence direct answer, and the supporting evidence that makes the answer quotable.",
    dataPoint:
      "Track answer location, heading clarity, visible evidence, schema match, and whether answer engines quote or link the page after the rewrite.",
    contrast:
      "Generic AEO content lists FAQs and schema. Distinct AEO content proves which answer block changed and why it is easier to cite.",
    limitation:
      "AEO can improve clarity, but it does not guarantee citation if competitors have stronger authority, fresher data, or better-known entities.",
  },
  "generative-engine-optimization-github": {
    title: "A GitHub workflow needs inspectable run records",
    example:
      "Include a sample run log with engine, date, prompt, answer text hash, cited URLs, brand position, and manual review status.",
    dataPoint:
      "Store counts for source citations, unlinked mentions, competitor citations, parser failures, and reviewed exceptions.",
    contrast:
      "A generic GitHub guide says build a tracker. A useful one shows the JSON shape, validation steps, and where the script can misread an answer.",
    limitation:
      "Open repositories should not contain private prompts, customer names, API keys, account cookies, or raw outputs that expose client strategy.",
  },
  "generative-engine-optimization-pdf": {
    title: "A PDF report should read like a decision memo",
    example:
      "Add a sample report page with citation share, top three competitor sources, missing source pages, and the next page owner.",
    dataPoint:
      "Report prompt sample size, monitoring window, source citation rate, competitor gap, recommended fixes, and confidence level.",
    contrast:
      "Generic PDF advice lists sections. Distinct advice shows what leadership sees first and what content teams fix next.",
    limitation:
      "Do not mix observed citation data with estimated conversion impact. Label estimates separately so the report stays credible.",
  },
  "generative-engine-optimization-course": {
    title: "Course content should produce a real page improvement",
    example:
      "Use one product page as the class exercise: baseline prompt map, weak answer block, rewritten evidence section, and a 30-day measurement plan.",
    dataPoint:
      "Measure participant output by page score delta, number of evidence blocks added, schema fixes completed, and prompts scheduled for retest.",
    contrast:
      "A generic course outline lists modules. A stronger course page shows the artifact each module creates.",
    limitation:
      "A course cannot teach a durable GEO process if participants never work on live pages or real prompt sets.",
  },
  "generative-engine-optimization-tool": {
    title: "Tool pages need buying criteria with measurable outputs",
    example:
      "Compare tools by whether they expose cited URLs, normalize answer runs, flag competitor displacement, and export page-level fixes.",
    dataPoint:
      "Track prompts monitored, engines covered, citation extraction accuracy, export fields, analytics integrations, and report cadence.",
    contrast:
      "Generic tool pages repeat feature names. Distinct tool pages show which output a buyer receives and how it changes prioritization.",
    limitation:
      "No GEO tool can claim full AI search visibility across every private, personalized, or region-specific answer surface.",
  },
  "generative-engine-optimization-strategies": {
    title: "Strategy should be tied to a prompt-to-page map",
    example:
      "Start with one buyer journey and map problem prompts, comparison prompts, vendor prompts, the page that should answer each, and the current cited competitor.",
    dataPoint:
      "Record baseline citation share, competitor source count, page readiness score, content owner, effort, and next measurement date.",
    contrast:
      "Generic strategy content says optimize for AI. Distinct strategy content shows the exact sequence from missed prompt to page update.",
    limitation:
      "Do not create new pages for every prompt. Strengthen pages that already have authority before expanding the content set.",
  },
  "generative-engine-optimization-paper": {
    title: "Research pages need a translation layer",
    example:
      "Translate one research finding into a content experiment: add statistics, source context, or clearer quotations, then test the same prompt set.",
    dataPoint:
      "Capture the paper claim, the page change inspired by it, prompt baseline, retest window, and whether source citations changed.",
    contrast:
      "Generic research summaries quote the abstract. Distinct pages explain what a marketing team should test and what not to overclaim.",
    limitation:
      "Research findings do not transfer perfectly to every AI answer surface, language, market, or commercial query.",
  },
  "generative-engine-optimization-book": {
    title: "A book page should prove the operating system",
    example:
      "Show a chapter-to-artifact map: prompt inventory, source citation audit, citable-page rewrite, competitor visibility memo, and monthly report.",
    dataPoint:
      "List the templates, worksheets, prompt samples, and measurement fields a reader can use after each chapter.",
    contrast:
      "Generic book pages sell broad expertise. Distinct book pages show what the reader can build by the end.",
    limitation:
      "A book can teach judgment and process, but it cannot replace ongoing monitoring because AI answers keep changing.",
  },
  "generative-engine-optimization-examples": {
    title: "Examples should include the weak version and the improved version",
    example:
      "Use a missed-citation example: a brand is mentioned but not linked, then the page gains a dated evidence section and clearer entity markup.",
    dataPoint:
      "Show baseline prompt, cited competitor, missing evidence, page edit, retest date, and result category.",
    contrast:
      "Generic example pages describe formats. Distinct examples show the problem, the fix, and the measurement plan.",
    limitation:
      "Example outcomes should not promise ranking or citation gains. They should show what changed and how to verify it.",
  },
  "answer-engine-optimization-examples": {
    title: "AEO examples need concrete page fragments",
    example:
      "Show a direct-answer fragment, the evidence sentence that supports it, the FAQ question it replaces, and the internal link that deepens trust.",
    dataPoint:
      "Track answer length, evidence presence, schema match, internal support link, and whether the snippet is quotable without context.",
    contrast:
      "Generic examples say add FAQs. Distinct examples show the exact wording that makes the answer useful.",
    limitation:
      "Short answers can become thin content if the page does not add supporting context, caveats, or next-step guidance.",
  },
  "answer-engine-optimization-course": {
    title: "Training pages should show the review rubric",
    example:
      "Include a scoring rubric for clarity, evidence, schema fit, next action, and measurement plan, then apply it to one sample page.",
    dataPoint:
      "Measure pre-training and post-training scores, number of rewritten answer blocks, and prompts scheduled for validation.",
    contrast:
      "Generic course pages list lessons. Distinct pages show how a writer will judge and improve a page.",
    limitation:
      "AEO training is weak if it teaches formatting without editorial judgment or evidence quality.",
  },
  "answer-engine-optimization-vs-generative-engine-optimization": {
    title: "Comparison pages need decision rules",
    example:
      "Add a decision table: use AEO when the page answer is unclear, use GEO when the page is clear but AI answers still cite competitors.",
    dataPoint:
      "Record page clarity score, citation baseline, competitor citation count, and whether the fix is editorial, technical, or authority-led.",
    contrast:
      "Generic comparisons define two terms. Distinct comparisons tell a team which workflow to run next.",
    limitation:
      "AEO and GEO overlap in practice, so the distinction should guide work allocation rather than create separate silos.",
  },
  "answer-engine-optimization-hubspot": {
    title: "HubSpot pages should connect content and CRM evidence",
    example:
      "Audit one HubSpot landing page for direct answer, form path, campaign attribution, cited source potential, and follow-up lifecycle stage.",
    dataPoint:
      "Track CMS page URL, CTA, UTM discipline, lifecycle stage movement, prompt set, citation status, and competitor source.",
    contrast:
      "Generic HubSpot advice says optimize CMS pages. Distinct advice shows how AI answer visibility links to campaign reporting.",
    limitation:
      "Do not copy private CRM records into external prompts or AI tools. Use aggregated campaign signals and sanitized examples.",
  },
  "answer-engine-optimization-tutorial": {
    title: "Tutorials should show the artifact at every step",
    example:
      "For each step, show the output: target question, direct answer, evidence block, schema choice, internal link, and retest plan.",
    dataPoint:
      "Record completion status for each artifact plus the baseline and retest prompts used to validate the page.",
    contrast:
      "Generic tutorials say improve the page. Distinct tutorials show the exact deliverable a reader should produce.",
    limitation:
      "Schema is only useful when it matches visible content. Adding markup without visible value can make the page weaker.",
  },
  "answer-engine-optimization-tools": {
    title: "Tool stack pages should separate checking from monitoring",
    example:
      "Compare a schema validator, a content editor, a prompt monitor, and an analytics platform by the decision each one supports.",
    dataPoint:
      "Track supported engines, export fields, citation versus mention handling, schema checks, and whether the tool connects to conversion data.",
    contrast:
      "Generic tool lists collect names. Distinct tool pages explain the job each tool does and where it stops.",
    limitation:
      "A tool stack creates overhead if the team has no owner for prompt sets, page updates, and recurring review.",
  },
  "ai-answer-engine-optimization": {
    title: "AI AEO content should show the signal chain",
    example:
      "Map one page from answer clarity to source trust to citation monitoring to assisted conversion, instead of treating AI visibility as one score.",
    dataPoint:
      "Record answer block quality, evidence freshness, source citation status, competitor source, session estimate, and conversion event.",
    contrast:
      "Generic AI AEO content repeats trust signals. Distinct content shows how the signals are measured together.",
    limitation:
      "AI answer engines can personalize and rewrite results, so reports should show trends and confidence instead of claiming perfect coverage.",
  },
  "answer-engine-optimization-jobs": {
    title: "Hiring pages need a practical work sample",
    example:
      "Give candidates a page audit: identify the answer job, rewrite the lead answer, add evidence, choose schema, and define a retest plan.",
    dataPoint:
      "Score candidates on editorial judgment, technical SEO basics, measurement design, competitor analysis, and ability to explain uncertainty.",
    contrast:
      "Generic job pages list skills. Distinct job pages show the work sample that reveals those skills.",
    limitation:
      "AEO is not only a writing role. Hiring only for copy output can miss analytics, schema, and measurement judgment.",
  },
};

export const keywordPages: KeywordPage[] = rawKeywordPages.map((page) => {
  const differentiation = differentiationBriefs[page.slug];
  if (!differentiation) {
    throw new Error(`Missing differentiation brief for ${page.slug}`);
  }

  return {
    ...page,
    differentiation,
  };
});

export const keywordPageMap = new Map(keywordPages.map((page) => [page.slug, page]));
