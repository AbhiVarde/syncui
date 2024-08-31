import React from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { getAllDocsSlugs, getDocBySlug } from "../../lib/docs";
import DocsLayout from "../../components/docs/DocsLayout";
import { MDXComponents } from "../../components/mdx-components";
import { DocPager } from "../../components/docs/DocPager";
import Head from "next/head";
import { MDXProvider } from "@mdx-js/react";

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

  if (!Component) {
    return <div>Error: Could not load the document.</div>;
  }

  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
      </Head>
      <DocsLayout toc={toc} docsTree={docsTree}>
        <article>
          <h1>{frontmatter.title}</h1>
          <MDXProvider>
            <Component components={MDXComponents} />
          </MDXProvider>
        </article>
        <DocPager slug={slug} docsTree={docsTree} />
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
