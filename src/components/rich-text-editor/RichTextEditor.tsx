"use client";

import * as React from "react";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";
import {
  Bold,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Strikethrough,
} from "lucide-react";

import { cn } from "../../lib/cn";
import { Button } from "../button/Button";

export interface RichTextEditorProps {
  value?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  toolbar?: boolean;
  minHeight?: number;
}

interface ToolbarAction {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
  canRun?: boolean;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Start writing…",
  disabled = false,
  className,
  toolbar = true,
  minHeight = 200,
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        link: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: "noopener noreferrer nofollow",
          target: "_blank",
        },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: value ?? "",
    editable: !disabled,
    onUpdate: ({ editor: currentEditor }) => {
      onChange?.(currentEditor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          "ProseMirror min-h-full p-4 text-sm text-foreground focus:outline-none",
          disabled && "cursor-not-allowed opacity-70"
        ),
      },
    },
  });

  React.useEffect(() => {
    if (!editor) {
      return;
    }

    editor.setEditable(!disabled);
  }, [disabled, editor]);

  React.useEffect(() => {
    if (!editor || value === undefined) {
      return;
    }

    const currentHtml = editor.getHTML();
    if (currentHtml !== value) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [editor, value]);

  const handleLink = React.useCallback(() => {
    if (!editor) {
      return;
    }

    if (editor.isActive("link")) {
      editor.chain().focus().unsetLink().run();
      return;
    }

    const url = window.prompt("Enter a URL", "https://");
    if (!url) {
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const toolbarSections = React.useMemo<ToolbarAction[][]>(() => {
    if (!editor) {
      return [];
    }

    return [
      [
        {
          label: "Bold",
          icon: <Bold className="h-4 w-4" aria-hidden="true" />,
          onClick: () => editor.chain().focus().toggleBold().run(),
          isActive: editor.isActive("bold"),
          canRun: editor.can().chain().focus().toggleBold().run(),
        },
        {
          label: "Italic",
          icon: <Italic className="h-4 w-4" aria-hidden="true" />,
          onClick: () => editor.chain().focus().toggleItalic().run(),
          isActive: editor.isActive("italic"),
          canRun: editor.can().chain().focus().toggleItalic().run(),
        },
        {
          label: "Strikethrough",
          icon: <Strikethrough className="h-4 w-4" aria-hidden="true" />,
          onClick: () => editor.chain().focus().toggleStrike().run(),
          isActive: editor.isActive("strike"),
          canRun: editor.can().chain().focus().toggleStrike().run(),
        },
      ],
      [
        {
          label: "Heading 1",
          icon: <Heading1 className="h-4 w-4" aria-hidden="true" />,
          onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
          isActive: editor.isActive("heading", { level: 1 }),
          canRun: editor.can().chain().focus().toggleHeading({ level: 1 }).run(),
        },
        {
          label: "Heading 2",
          icon: <Heading2 className="h-4 w-4" aria-hidden="true" />,
          onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
          isActive: editor.isActive("heading", { level: 2 }),
          canRun: editor.can().chain().focus().toggleHeading({ level: 2 }).run(),
        },
        {
          label: "Heading 3",
          icon: <Heading3 className="h-4 w-4" aria-hidden="true" />,
          onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
          isActive: editor.isActive("heading", { level: 3 }),
          canRun: editor.can().chain().focus().toggleHeading({ level: 3 }).run(),
        },
      ],
      [
        {
          label: "Bullet list",
          icon: <List className="h-4 w-4" aria-hidden="true" />,
          onClick: () => editor.chain().focus().toggleBulletList().run(),
          isActive: editor.isActive("bulletList"),
          canRun: editor.can().chain().focus().toggleBulletList().run(),
        },
        {
          label: "Ordered list",
          icon: <ListOrdered className="h-4 w-4" aria-hidden="true" />,
          onClick: () => editor.chain().focus().toggleOrderedList().run(),
          isActive: editor.isActive("orderedList"),
          canRun: editor.can().chain().focus().toggleOrderedList().run(),
        },
      ],
      [
        {
          label: "Blockquote",
          icon: <Quote className="h-4 w-4" aria-hidden="true" />,
          onClick: () => editor.chain().focus().toggleBlockquote().run(),
          isActive: editor.isActive("blockquote"),
          canRun: editor.can().chain().focus().toggleBlockquote().run(),
        },
        {
          label: "Code block",
          icon: <Code2 className="h-4 w-4" aria-hidden="true" />,
          onClick: () => editor.chain().focus().toggleCodeBlock().run(),
          isActive: editor.isActive("codeBlock"),
          canRun: editor.can().chain().focus().toggleCodeBlock().run(),
        },
      ],
      [
        {
          label: "Link",
          icon: <LinkIcon className="h-4 w-4" aria-hidden="true" />,
          onClick: handleLink,
          isActive: editor.isActive("link"),
          canRun: true,
        },
      ],
    ];
  }, [editor, handleLink]);

  return (
    <div
      className={cn("yetric-rich-text-editor border-border bg-card rounded-lg border", className)}
    >
      <style>{`
        .yetric-rich-text-editor .ProseMirror p.is-editor-empty:first-child::before {
          color: hsl(var(--muted-foreground));
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }

        .yetric-rich-text-editor .ProseMirror a {
          color: hsl(var(--primary));
          text-decoration: underline;
        }

        .yetric-rich-text-editor .ProseMirror blockquote {
          border-left: 2px solid hsl(var(--border));
          margin: 0;
          padding-left: 1rem;
        }

        .yetric-rich-text-editor .ProseMirror pre {
          background: hsl(var(--muted));
          border-radius: var(--radius);
          padding: 0.75rem 1rem;
        }
      `}</style>
      {toolbar && editor ? (
        <div className="border-border flex flex-wrap items-center gap-2 border-b p-2">
          {toolbarSections.map((section, sectionIndex) => (
            <React.Fragment key={section[0]?.label ?? sectionIndex}>
              {sectionIndex > 0 ? (
                <span className="bg-border mx-1 h-6 w-px" aria-hidden="true" />
              ) : null}
              {section.map((action) => (
                <Button
                  key={action.label}
                  type="button"
                  size="sm"
                  variant={action.isActive ? "secondary" : "ghost"}
                  disabled={disabled || action.canRun === false}
                  aria-label={action.label}
                  title={action.label}
                  onClick={action.onClick}
                >
                  {action.icon}
                </Button>
              ))}
            </React.Fragment>
          ))}
        </div>
      ) : null}
      <EditorContent
        editor={editor}
        className="[&_.ProseMirror]:min-h-[var(--rich-text-editor-min-height)]"
        style={{ ["--rich-text-editor-min-height" as string]: `${minHeight}px` }}
      />
    </div>
  );
}
