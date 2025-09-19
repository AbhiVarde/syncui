import { forwardRef } from "react";
import Link from "next/link";

const DocsLink = forwardRef(({ href, children, ...props }, ref) => {
  if (href?.startsWith("/docs")) {
    const handleClick = (e) => {
      e.preventDefault();

      // Check if we're already on the docs subdomain
      const isDocsSubdomain =
        typeof window !== "undefined" &&
        (window.location.hostname === "docs.syncui.design" ||
          window.location.hostname === "localhost");

      if (isDocsSubdomain) {
        // If we're on docs subdomain, navigate to the path without /docs prefix
        const path = href === "/docs" ? "/" : href.replace("/docs/", "/");
        window.location.href = path;
      } else {
        // If we're on main site, redirect to docs subdomain
        const path = href === "/docs" ? "" : href.replace("/docs/", "");
        const docsUrl = `https://docs.syncui.design/${path}`;
        window.location.href = docsUrl;
      }
    };

    return (
      <Link href={href} {...props} ref={ref}>
        <span
          onClick={handleClick}
          style={{ cursor: "pointer", display: "contents" }}
        >
          {children}
        </span>
      </Link>
    );
  }

  // For non-docs links, use regular Link
  return (
    <Link href={href} {...props} ref={ref}>
      {children}
    </Link>
  );
});

DocsLink.displayName = "DocsLink";

export default DocsLink;
