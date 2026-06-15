# SEO/GEO Non-Homogeneous Content Report

Date: 2026-05-26

## Scope

This report reviews the GeoBase marketing site against one SEO/GEO rule:

> Avoid generic templated content. Use first-hand experience, examples, data, comparisons, and limitations to create meaningful differentiation.

## Overall Finding

Many websites fail this rule because they publish pages that are correct but interchangeable. GeoBase had the same risk on long-tail SEO/GEO pages: the pages were readable and relevant, but many used the same article shape and did not show enough page-specific evidence.

Risk level before changes: medium-high for long-tail pages, medium for the homepage.

## Audit Findings

1. Long-tail keyword pages shared the same structure.
   - Pattern: intro, thesis, two sections, playbook, checklist.
   - Risk: users and AI systems may see the pages as keyword variants rather than distinct resources.
   - Fix applied: added a page-specific "Non-generic content proof" section to every keyword page.

2. Pages lacked concrete examples and measurement artifacts.
   - Pattern: advice mentioned tracking, citation reports, and page diagnostics, but did not show the exact evidence a team should collect.
   - Risk: the content sounded useful but could still be copied by a competitor with little loss.
   - Fix applied: each keyword page now includes a specific example and the data points to capture.

3. Comparison and limitation language was too implicit.
   - Pattern: pages explained concepts but did not consistently say what separates a generic version from a stronger version.
   - Risk: GEO pages can overpromise because answer-engine visibility is unstable and hard to measure perfectly.
   - Fix applied: each page now includes "Generic vs distinct" and "Limitation" rows.

4. Homepage proof was too testimonial-like.
   - Pattern: proof cards used generic customer-style quotes.
   - Risk: generic testimonials are weaker than operational evidence for SEO/GEO trust.
   - Fix applied: replaced the quote section with field patterns that show real GEO/AEO diagnostic situations and measurement signals.

## Changes Applied

1. Added a typed differentiation model to keyword content.
   - New fields: title, example, data point, generic-vs-distinct contrast, limitation.

2. Added differentiation briefs for all 18 keyword pages.
   - Examples cover prompt logs, PDF reports, GitHub run records, course artifacts, tool comparisons, HubSpot workflows, hiring work samples, and tutorial outputs.

3. Updated the keyword page template.
   - Every keyword page now renders a "Non-generic content proof" block.

4. Updated homepage proof.
   - The page now shows field patterns: mention without source, clear page with weak evidence, and citation lift without pipeline impact.

## Remaining Recommendations

1. Replace sample evidence with real product screenshots or anonymized run exports when available.
2. Add dated benchmark pages after enough prompt monitoring data exists.
3. Add two or three public examples with before/after page fragments.
4. Keep legal/privacy boundaries clear: do not expose private prompts, customer data, or CRM records.
