import React from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { getAllDocsSlugs, getDocBySlug } from "../../lib/docs";
import DocsLayout from "../../components/docs/DocsLayout";
import { MDXComponents } from "../../components/mdx-components";
import { DocNavigationBar } from "../../components/docs/DocNavigationBar";
import Head from "next/head";
import { NextSeo } from "next-seo";
import { Typography } from "@mui/material";

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

  const isComponentPage = React.useMemo(() => {
    const currentUrl = `/docs/${slug}`;
    const currentDoc = docsTree.find((item) => {
      if (item.url === currentUrl) return true;
      if (slug === "" && item.title === "Setup") return true;
      return false;
    });
    return currentDoc?.category === "Components";
  }, [docsTree, slug]);

  if (!Component) {
    return <div>Error: Could not load the document.</div>;
  }

  return (
    <>
      <NextSeo
        title={`${frontmatter.title} – Sync UI Docs`}
        description={
          frontmatter.description ||
          `${frontmatter.title} documentation for Sync UI. Learn how to use, customize, and integrate this component in React and Next.js projects.`
        }
        canonical={`https://www.syncui.design/docs/${slug}`}
        openGraph={{
          url: `https://www.syncui.design/docs/${slug}`,
          title: `${frontmatter.title} – Sync UI Documentation`,
          description:
            frontmatter.description ||
            `Official Sync UI documentation for ${frontmatter.title}. Usage examples, props, and integration details.`,
          images: [
            {
              url: "https://www.syncui.design/default-og-image.png",
              width: 1200,
              height: 630,
              alt: `${frontmatter.title} – Sync UI Docs`,
            },
          ],
          siteName: "Sync UI",
          type: "article",
        }}
        twitter={{
          cardType: "summary_large_image",
          site: "@syncuidesign",
          creator: "@abhivarde",
          title: `${frontmatter.title} – Sync UI Docs`,
          description:
            frontmatter.description ||
            `Learn how to use the ${frontmatter.title} component in Sync UI.`,
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content: `
        ${frontmatter.title},
        Sync UI docs,
        React UI documentation,
        MUI components,
        motion react components,
        Framer Motion UI,
        React UI blocks,
        Next.js UI components,
        Sync UI components
      `,
          },
        ]}
      />
      <Head>
        <title>{frontmatter.title} // Sync UI</title>
      </Head>
      <DocsLayout toc={toc} docsTree={docsTree}>
        <article>
          {isComponentPage && (
            <DocNavigationBar
              slug={slug}
              docsTree={docsTree}
              title={frontmatter.title}
            />
          )}

          {!isComponentPage && (
            <Typography
              variant="h3"
              fontWeight={500}
              sx={{
                mb: 3,
                wordBreak: "break-word",
              }}
            >
              {frontmatter.title}
            </Typography>
          )}

          <Component components={MDXComponents} />
        </article>
      </DocsLayout>
    </>
  );
}

export async function getStaticProps({ params }) {
  const slug = params.slug?.join("/") || "";

  const docData = await getDocBySlug(slug);

  if (!docData) {
    return {
      notFound: true,
    };
  }

  const { code, frontmatter, toc } = docData;
  const docsTree = await getAllDocsSlugs();

  return {
    props: {
      code,
      frontmatter,
      toc,
      docsTree,
      slug,
    },
  };
}

export async function getStaticPaths() {
  const slugs = await getAllDocsSlugs();

  const paths = slugs.map((item) => ({
    params: { slug: item.slug === "" ? [] : item.slug.split("/") },
  }));

  return {
    paths,
    fallback: false,
  };
}
