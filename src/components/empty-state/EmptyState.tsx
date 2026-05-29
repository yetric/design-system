"use client";

import * as React from "react";
import { Box } from "../box/Box";
import { Button } from "../button/Button";
import { Paper } from "../paper/Paper";
import { Stack } from "../stack/Stack";
import { Heading, Text } from "../text/Text";

export interface EmptyStateAction {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost" | "secondary";
  icon?: React.ReactNode;
}

export interface EmptyStateProps {
  /** Lucide icon or any React element to display at the top */
  icon?: React.ElementType;
  title: string;
  description?: string;
  action?: EmptyStateAction;
  className?: string;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon: Icon, title, description, action, className }, ref) => {
    return (
      <Paper
        ref={ref}
        radius="xl"
        p={0}
        className={className}
        style={{
          maxWidth: "24rem",
          padding: "4rem 2rem",
          textAlign: "center",
          borderStyle: "dashed",
        }}
      >
        <Stack align="center" justify="center" gap={4}>
          {Icon && (
            <Box
              radius="full"
              style={{
                display: "flex",
                width: 56,
                height: 56,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "hsl(var(--muted))",
              }}
            >
              <Icon style={{ width: 24, height: 24, color: "hsl(var(--muted-foreground))" }} />
            </Box>
          )}
          <Stack gap={2} style={{ gap: "0.375rem" }}>
            <Heading as="h3" size="h6">
              {title}
            </Heading>
            {description && (
              <Text size="body-sm" color="muted" style={{ lineHeight: 1.625 }}>
                {description}
              </Text>
            )}
          </Stack>
          {action && (
            <Button
              variant={action.variant ?? "primary"}
              size="sm"
              onClick={action.onClick}
              leftIcon={action.icon}
            >
              {action.label}
            </Button>
          )}
        </Stack>
      </Paper>
    );
  }
);

EmptyState.displayName = "EmptyState";

export { EmptyState };
