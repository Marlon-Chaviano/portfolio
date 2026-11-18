import type { MDXComponents } from "mdx/types";

// Post styling lives in the `.prose` rules in globals.css; external links open in a new tab.
const components: MDXComponents = {
  a: ({ href = "", children, ...props }) =>
    /^https?:\/\//.test(href) ? (
      <a href={href} target="_blank" rel="noopener" {...props}>
        {children}
      </a>
    ) : (
      <a href={href} {...props}>
        {children}
      </a>
    ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
