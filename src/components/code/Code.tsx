"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "../../lib/cn";

export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  /** Renders as a block (pre) rather than inline code */
  block?: boolean;
  /** Optional language label shown in the top-right corner (block mode only) */
  language?: string;
  /** Shows a copy-to-clipboard button (block mode only) */
  copyable?: boolean;
}

const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, block = false, language, copyable = false, children, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
      const text =
        typeof children === "string"
          ? children
          : ((ref as React.RefObject<HTMLElement>)?.current?.textContent ?? "");
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    };

    if (!block) {
      return (
        <code
          ref={ref as React.Ref<HTMLElement>}
          className={cn(
            "relative rounded bg-muted px-1.5 py-0.5 font-mono text-[0.875em] text-foreground",
            className
          )}
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <div className="relative">
        {(language || copyable) && (
          <div className="flex items-center justify-between rounded-t-md border border-b-0 border-border bg-muted/60 px-4 py-1.5">
            {language ? (
              <span className="text-xs font-medium text-muted-foreground">{language}</span>
            ) : (
              <span />
            )}
            {copyable && (
              <button
                type="button"
                onClick={handleCopy}
                aria-label={copied ? "Copied!" : "Copy code"}
                className="flex items-center gap-1 rounded text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3" aria-hidden="true" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" aria-hidden="true" />
                    Copy
                  </>
                )}
              </button>
            )}
          </div>
        )}
        <pre
          ref={ref as React.Ref<HTMLPreElement>}
          className={cn(
            "overflow-x-auto border border-border bg-muted/30 p-4 font-mono text-sm text-foreground",
            language || copyable ? "rounded-b-md" : "rounded-md",
            className
          )}
          {...(props as React.HTMLAttributes<HTMLPreElement>)}
        >
          <code>{children}</code>
        </pre>
      </div>
    );
  }
);
Code.displayName = "Code";

export { Code };
