import { forwardRef } from "react";
import Link from "next/link";

const DocsLink = forwardRef(({ href, children, ...props }, ref) => {
  if (href?.startsWith("/docs")) {
    const handleClick = (e) => {
      e.preventDefault();

      const path = href === "/docs" ? "" : href.replace("/docs/", "");
      const docsUrl = `https://docs.syncui.design/${path}`;

      // Navigate to docs subdomain
      window.location.href = docsUrl;
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
