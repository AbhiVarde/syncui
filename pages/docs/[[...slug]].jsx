import React from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { getAllDocsSlugs, getDocBySlug } from "../../lib/docs";
import DocsLayout from "../../components/docs/DocsLayout";
import { MDXComponents } from "../../components/mdx-components";
import { DocNavigationBar } from "../../components/docs/DocNavigationBar";
import Head from "next/head";
import { Typography } from "@mui/material";
import { DocPageNavigation } from "@/components/docs/DocPageNavigation";

export default function DocPage({ code, frontmatter, toc, docsTree, slug }) {
  const Component = React.useMemo(() => {
    if (code) {
      try {
        return getMDXComponent(code);
      } catch (error) {
        console.error("Error in getMDXComponent:", error);
        return null;
      }
    }
    return null;
  }, [code]);

  const shouldShowNavigationBar = React.useMemo(() => {
    const currentUrl = `/docs/${slug}`;
    const currentDoc = docsTree.find((item) => {
      if (item.url === currentUrl) return true;
      if (slug === "" && item.title === "Setup") return true;
      return false;
    });
    return (
      ["Components", "Blocks"].includes(currentDoc?.category) ||
      slug === "installation" ||
      slug.startsWith("installation/")
    );
  }, [docsTree, slug]);

  if (!Component) {
    return <div>Error: Could not load the document.</div>;
  }

  const pageTitle = `${frontmatter.title} - Sync UI Documentation`;
  const pageDescription =
    frontmatter.description ||
    `Complete documentation for ${frontmatter.title}. Learn implementation, customization, and integration with React and Next.js.`;
  const canonicalUrl = `https://www.syncui.design/docs/${slug}`;

  return (
    <>
      <Head>
        <title>{frontmatter.title} // Sync UI</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta
          name="keywords"
          content={`${frontmatter.title}, Sync UI, React components, MUI, Motion, documentation, tutorial, Next.js`}
        />

        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Sync UI" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta
          property="og:image"
          content="https://www.syncui.design/og-image.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content={`${frontmatter.title} - Sync UI Docs`}
        />
        <meta property="og:image:type" content="image/png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@syncuidesign" />
        <meta name="twitter:creator" content="@abhivarde" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta
          name="twitter:image"
          content="https://www.syncui.design/og-image.png"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TechArticle",
              headline: frontmatter.title,
              description: pageDescription,
              url: canonicalUrl,
              publisher: {
                "@type": "Organization",
                name: "Sync UI",
                logo: "https://www.syncui.design/logo.png",
              },
              author: {
                "@type": "Person",
                name: "Abhi Varde",
                url: "https://www.abhivarde.in/",
              },
            }),
          }}
        />
      </Head>

      <DocsLayout toc={toc} docsTree={docsTree}>
        <article>
          {shouldShowNavigationBar && (
            <DocNavigationBar
              slug={slug}
              docsTree={docsTree}
              title={frontmatter.title}
            />
          )}

          {!shouldShowNavigationBar && (
            <Typography
              variant="h3"
              fontWeight={500}
              sx={{ mb: 3, wordBreak: "break-word" }}
            >
              {frontmatter.title}
            </Typography>
          )}

          <Component components={MDXComponents} />

          <DocPageNavigation slug={slug} docsTree={docsTree} />
        </article>
      </DocsLayout>
    </>
  );
}

export async function getStaticProps({ params }) {
  const slug = params.slug?.join("/") || "";
  const docData = await getDocBySlug(slug);

  if (!docData) return { notFound: true };

  const { code, frontmatter, toc } = docData;
  const docsTree = await getAllDocsSlugs();

  return {
    props: { code, frontmatter, toc, docsTree, slug },
  };
}

export async function getStaticPaths() {
  const slugs = await getAllDocsSlugs();
  const paths = slugs.map((item) => ({
    params: { slug: item.slug === "" ? [] : item.slug.split("/") },
  }));

  return { paths, fallback: false };
}
