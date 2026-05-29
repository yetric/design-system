"use client";

import * as React from "react";
import { SearchX } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../command/Command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../dialog/Dialog";
import { EmptyState } from "../empty-state/EmptyState";
import { cn } from "../../lib/cn";

export interface CommandPaletteItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  onSelect: () => void;
  group?: string;
}

export interface CommandPaletteProps {
  items: CommandPaletteItem[];
  placeholder?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  className?: string;
}

const platformIsMac = () =>
  typeof navigator !== "undefined" && /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);

const isEditableTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
};

const groupItems = (items: CommandPaletteItem[]) => {
  const ungrouped: CommandPaletteItem[] = [];
  const grouped = new Map<string, CommandPaletteItem[]>();

  items.forEach((item) => {
    if (!item.group) {
      ungrouped.push(item);
      return;
    }

    const groupItems = grouped.get(item.group) ?? [];
    groupItems.push(item);
    grouped.set(item.group, groupItems);
  });

  return { ungrouped, grouped: Array.from(grouped.entries()) };
};

const CommandPalette = ({
  items,
  placeholder = "Search commands…",
  open,
  onOpenChange,
  trigger,
  className,
}: CommandPaletteProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : uncontrolledOpen;
  const groupedItems = React.useMemo(() => groupItems(items), [items]);

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }

      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange]
  );

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "k") {
        return;
      }

      if (!isOpen && isEditableTarget(event.target)) {
        return;
      }

      const hasShortcut = platformIsMac() ? event.metaKey : event.ctrlKey;
      if (!hasShortcut) {
        return;
      }

      event.preventDefault();
      handleOpenChange(!isOpen);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleOpenChange, isOpen]);

  const handleSelect = React.useCallback(
    (item: CommandPaletteItem) => {
      item.onSelect();
      handleOpenChange(false);
    },
    [handleOpenChange]
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {trigger &&
        (React.isValidElement(trigger) ? (
          <DialogTrigger asChild>{trigger}</DialogTrigger>
        ) : (
          <DialogTrigger>{trigger}</DialogTrigger>
        ))}
      <DialogContent className={cn("overflow-hidden p-0", className)}>
        <DialogTitle className="sr-only">Command palette</DialogTitle>
        <DialogDescription className="sr-only">
          Search available commands and run an action.
        </DialogDescription>
        <Command className="[&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-item]]:gap-3 [&_[cmdk-item]_svg]:size-4 [&_[cmdk-item]_svg]:shrink-0">
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty className="p-4">
              <EmptyState
                icon={SearchX}
                title="No results found"
                description="Try a different search term or browse another command group."
              />
            </CommandEmpty>
            {groupedItems.ungrouped.map((item) => {
              const Icon = item.icon;

              return (
                <CommandItem
                  key={item.id}
                  value={[item.label, item.description, item.group].filter(Boolean).join(" ")}
                  onSelect={() => handleSelect(item)}
                  className="items-start"
                >
                  {Icon && <Icon className="mt-0.5 text-muted-foreground" />}
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="font-medium">{item.label}</span>
                    {item.description && (
                      <span className="text-xs text-muted-foreground">{item.description}</span>
                    )}
                  </div>
                </CommandItem>
              );
            })}
            {groupedItems.grouped.map(([group, groupItems]) => (
              <CommandGroup key={group} heading={group}>
                {groupItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <CommandItem
                      key={item.id}
                      value={[item.label, item.description, item.group].filter(Boolean).join(" ")}
                      onSelect={() => handleSelect(item)}
                      className="items-start"
                    >
                      {Icon && <Icon className="mt-0.5 text-muted-foreground" />}
                      <div className="flex min-w-0 flex-1 flex-col">
                        <span className="font-medium">{item.label}</span>
                        {item.description && (
                          <span className="text-xs text-muted-foreground">{item.description}</span>
                        )}
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

CommandPalette.displayName = "CommandPalette";

export { CommandPalette };
