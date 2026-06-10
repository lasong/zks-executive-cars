import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

export const metadata: Metadata = {
  title: "Privacy Policy — ZKS Executive Cars",
  description:
    "How ZKS Executive Cars collects, uses and protects your personal data.",
};

const components: Components = {
  h2: ({ children }) => (
    <h2 className="font-display text-2xl text-foreground mt-10 mb-3 first:mt-0">
      {children}
    </h2>
  ),
  p: ({ children }) => (
    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground text-sm sm:text-base mb-4">
      {children}
    </ul>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => (
    <strong className="text-foreground font-semibold">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="text-muted-foreground text-sm not-italic">{children}</em>
  ),
  a: ({ href, children }) => {
    const className =
      "text-gold hover:text-gold-light underline underline-offset-2 transition-colors";

    if (!href || href.startsWith("/")) {
      return (
        <Link href={href ?? "#"} className={className}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  },
};

export default async function PrivacyPolicyPage() {
  const filePath = path.join(process.cwd(), "content", "privacy-policy.md");
  const content = await readFile(filePath, "utf-8");

  return (
    <div className="bg-background px-4 py-16 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-display text-4xl text-foreground mb-8">
          Privacy Policy
        </h1>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
