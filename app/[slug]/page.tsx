import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { keywordPageMap, keywordPages } from "@/src/content/keyword-pages";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return keywordPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = keywordPageMap.get(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `https://geobase.online${page.path}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `https://geobase.online${page.path}`,
      images: ["/og-image.png"],
    },
  };
}

export default async function KeywordPage({ params }: PageProps) {
  const { slug } = await params;
  const page = keywordPageMap.get(slug);
  if (!page) notFound();

  const related = keywordPages.filter((item) => item.slug !== page.slug).slice(0, 4);

  return (
    <main className="bg-[#071019]">
      <section className="border-b border-white/10 bg-[#091622] py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="hover:text-cyan-200">
              Home
            </Link>
            <span>/</span>
            <span className="text-cyan-100">{page.keyword}</span>
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">{page.keyword}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight text-white md:text-6xl">{page.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{page.intro}</p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-lg border border-white/10 bg-[#091622] p-6">
              <h2 className="text-lg font-black text-white">Decision principle</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">{page.thesis}</p>
              <Link
                href="/pricing#choose-growth"
                className="mt-6 inline-flex w-full justify-center rounded-md bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950 hover:bg-lime-300"
              >
                Choose Growth annual
              </Link>
            </div>
          </aside>

          <div className="grid gap-6">
            {page.sections.map((section) => (
              <article key={section.heading} className="rounded-lg border border-white/10 bg-[#091622] p-6 md:p-8">
                <h2 className="text-2xl font-black text-white">{section.heading}</h2>
                <p className="mt-4 text-base leading-8 text-slate-300">{section.body}</p>
                <ul className="mt-5 grid gap-3">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm leading-6 text-slate-400">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-300" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}

            <section className="grid gap-5 md:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-[#091622] p-6">
                <h2 className="text-xl font-black text-white">Practical playbook</h2>
                <ol className="mt-5 grid gap-3">
                  {page.playbook.map((item, index) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-slate-400">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-cyan-300 text-xs font-black text-slate-950">
                        {index + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#091622] p-6">
                <h2 className="text-xl font-black text-white">Quality checklist</h2>
                <ul className="mt-5 grid gap-3">
                  {page.checklist.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-slate-400">
                      <span className="mt-1 h-5 w-5 shrink-0 rounded-md border border-lime-300/50 bg-lime-300/10" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="rounded-lg border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.10),rgba(9,22,34,0.96)_55%,rgba(250,204,21,0.08))] p-6 md:p-8">
              <h2 className="text-2xl font-black text-white">Related AI visibility guides</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={item.path}
                    className="rounded-md border border-white/10 bg-black/15 p-4 text-sm font-semibold text-slate-200 hover:border-cyan-200 hover:text-cyan-100"
                  >
                    {item.keyword}
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
