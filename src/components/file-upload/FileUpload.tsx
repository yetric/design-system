"use client";

import * as React from "react";
import { File as FileIcon, Upload, X } from "lucide-react";

import { cn } from "../../lib/cn";
import { Paper } from "../paper/Paper";

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  disabled?: boolean;
  onFilesChange?: (files: File[]) => void;
  className?: string;
}

type FileUploadItem = {
  id: string;
  file: File;
  previewUrl?: string;
};

const isImageFile = (file: File) => file.type.startsWith("image/");

const formatFileSize = (size: number) => {
  if (size >= 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(size >= 10 * 1024 * 1024 ? 0 : 1)} MB`;
  }

  return `${Math.max(size / 1024, 0.1).toFixed(size >= 10 * 1024 ? 0 : 1)} KB`;
};

const createErrorMessage = (fileCount: number, label: string) =>
  `${fileCount} ${label}${fileCount === 1 ? "" : "s"} ${fileCount === 1 ? "was" : "were"} skipped.`;

const revokePreview = (item: FileUploadItem) => {
  if (item.previewUrl && typeof URL.revokeObjectURL === "function") {
    URL.revokeObjectURL(item.previewUrl);
  }
};

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    { accept, multiple = false, maxSize, maxFiles, disabled = false, onFilesChange, className },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const itemsRef = React.useRef<FileUploadItem[]>([]);
    const itemIdRef = React.useRef(0);
    const [items, setItems] = React.useState<FileUploadItem[]>([]);
    const [error, setError] = React.useState<string | null>(null);
    const [isDragging, setIsDragging] = React.useState(false);

    React.useEffect(() => {
      itemsRef.current = items;
    }, [items]);

    React.useEffect(
      () => () => {
        itemsRef.current.forEach(revokePreview);
      },
      []
    );

    const updateItems = React.useCallback(
      (nextItems: FileUploadItem[]) => {
        itemsRef.current = nextItems;
        setItems(nextItems);
        onFilesChange?.(nextItems.map((item) => item.file));
      },
      [onFilesChange]
    );

    const createItem = React.useCallback((file: File): FileUploadItem => {
      const canPreview = isImageFile(file) && typeof URL.createObjectURL === "function";

      return {
        id: `${file.name}-${file.lastModified}-${itemIdRef.current++}`,
        file,
        previewUrl: canPreview ? URL.createObjectURL(file) : undefined,
      };
    }, []);

    const openFileDialog = React.useCallback(() => {
      if (!disabled) {
        inputRef.current?.click();
      }
    }, [disabled]);

    const handleAddFiles = React.useCallback(
      (incomingFiles: File[]) => {
        if (disabled || incomingFiles.length === 0) {
          return;
        }

        const nextErrors: string[] = [];
        let nextFiles = [...incomingFiles];

        if (!multiple && nextFiles.length > 1) {
          nextFiles = nextFiles.slice(0, 1);
        }

        if (maxSize !== undefined) {
          const oversizedFiles = nextFiles.filter((file) => file.size > maxSize);
          if (oversizedFiles.length > 0) {
            nextErrors.push(
              createErrorMessage(oversizedFiles.length, "file exceeding the size limit")
            );
            nextFiles = nextFiles.filter((file) => file.size <= maxSize);
          }
        }

        const existingItems = multiple ? itemsRef.current : [];
        const remainingSlots =
          maxFiles === undefined ? nextFiles.length : Math.max(maxFiles - existingItems.length, 0);

        if (maxFiles !== undefined && nextFiles.length > remainingSlots) {
          nextErrors.push(
            createErrorMessage(nextFiles.length - remainingSlots, "file over the maximum count")
          );
          nextFiles = nextFiles.slice(0, remainingSlots);
        }

        if (nextFiles.length === 0) {
          setError(nextErrors[0] ?? null);
          return;
        }

        const createdItems = nextFiles.map(createItem);
        const previousSingleItems = multiple ? [] : itemsRef.current;
        previousSingleItems.forEach(revokePreview);

        setError(nextErrors[0] ?? null);
        updateItems(multiple ? [...existingItems, ...createdItems] : createdItems);
      },
      [createItem, disabled, maxFiles, maxSize, multiple, updateItems]
    );

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      handleAddFiles(Array.from(event.target.files ?? []));
      event.target.value = "";
    };

    const handleRemove = (itemId: string) => {
      const nextItems = itemsRef.current.filter((item) => item.id !== itemId);
      const removedItem = itemsRef.current.find((item) => item.id === itemId);

      if (removedItem) {
        revokePreview(removedItem);
      }

      setError(null);
      updateItems(nextItems);
    };

    return (
      <div ref={ref} className={cn("w-full", className)}>
        <Paper
          p={6}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled || undefined}
          onClick={openFileDialog}
          onKeyDown={(event) => {
            if (disabled) return;

            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              openFileDialog();
            }
          }}
          onDragEnter={(event) => {
            event.preventDefault();
            if (!disabled) setIsDragging(true);
          }}
          onDragOver={(event) => {
            event.preventDefault();
            if (!disabled) setIsDragging(true);
          }}
          onDragLeave={(event) => {
            event.preventDefault();
            if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
              return;
            }
            setIsDragging(false);
          }}
          onDrop={(event) => {
            event.preventDefault();
            setIsDragging(false);
            handleAddFiles(Array.from(event.dataTransfer.files ?? []));
          }}
          className={cn(
            "duration-base flex min-h-52 flex-col items-center justify-center gap-3 border-dashed text-center transition-colors",
            disabled && "cursor-not-allowed opacity-50",
            !disabled && "hover:border-primary/50 hover:bg-accent/30 cursor-pointer",
            isDragging && !disabled && "border-primary bg-accent/40"
          )}
        >
          <Upload className="text-muted-foreground h-8 w-8" aria-hidden="true" />
          <div className="space-y-1">
            <p className="text-foreground text-sm font-medium">
              Drop files here or click to upload
            </p>
            <p className="text-muted-foreground text-xs">
              {accept ? `Accepted formats: ${accept}` : "Any file type accepted"}
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            className="sr-only"
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            onChange={handleInputChange}
            tabIndex={-1}
          />
        </Paper>

        {error && (
          <p className="text-destructive mt-2 text-sm" role="alert">
            {error}
          </p>
        )}

        {items.length > 0 && (
          <ul className="mt-4 space-y-2">
            {items.map((item) => (
              <li
                key={item.id}
                className="border-border bg-card flex items-center gap-3 rounded-md border px-3 py-2"
              >
                {item.previewUrl ? (
                  <img
                    src={item.previewUrl}
                    alt={item.file.name}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                ) : (
                  <span className="bg-muted text-muted-foreground flex h-12 w-12 items-center justify-center rounded-md">
                    <FileIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-foreground truncate text-sm font-medium">{item.file.name}</p>
                  <p className="text-muted-foreground text-xs">{formatFileSize(item.file.size)}</p>
                </div>
                <button
                  type="button"
                  className="text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:ring-ring inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none"
                  aria-label={`Remove ${item.file.name}`}
                  onClick={() => handleRemove(item.id)}
                  disabled={disabled}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);
FileUpload.displayName = "FileUpload";

export type { FileUploadProps };
export { FileUpload };
