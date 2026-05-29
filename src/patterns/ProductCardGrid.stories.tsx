import type { Meta, StoryObj } from "@storybook/react-vite";
import { ShoppingCart, Star } from "lucide-react";

import { AspectRatio } from "../components/aspect-ratio/AspectRatio";
import { Badge } from "../components/badge/Badge";
import { Box } from "../components/box/Box";
import { Button } from "../components/button/Button";
import { Card, CardContent, CardFooter, CardHeader } from "../components/card/Card";
import { Grid } from "../components/grid/Grid";
import { Rating } from "../components/rating/Rating";
import { Skeleton } from "../components/skeleton/Skeleton";
import { Stack } from "../components/stack/Stack";
import { Text } from "../components/text/Text";

const meta = {
  title: "Patterns/Product Card Grid",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: { label: string; variant: "success" | "warning" | "destructive" | "info" | "secondary" };
}

const products: Product[] = [
  {
    id: 1,
    name: "Wireless Noise-Cancelling Headphones",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4,
    reviewCount: 2348,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    badge: { label: "Sale", variant: "destructive" },
  },
  {
    id: 2,
    name: "Mechanical Keyboard TKL",
    price: 89.0,
    rating: 5,
    reviewCount: 814,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&q=80",
    badge: { label: "Best seller", variant: "success" },
  },
  {
    id: 3,
    name: "USB-C Hub 7-in-1",
    price: 49.99,
    rating: 3,
    reviewCount: 327,
    image: "https://images.unsplash.com/photo-1625772452859-1c03d884df15?w=600&q=80",
    badge: { label: "New", variant: "info" },
  },
  {
    id: 4,
    name: "Ergonomic Mouse Vertical",
    price: 64.0,
    originalPrice: 80.0,
    rating: 4,
    reviewCount: 1192,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80",
  },
];

function ProductCard({ product }: { product: Product }) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <Card variant="outlined" interactive tabIndex={0} style={{ overflow: "hidden" }}>
      <Box style={{ position: "relative" }}>
        <AspectRatio ratio={4 / 3}>
          <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </AspectRatio>
        {product.badge && (
          <Box style={{ position: "absolute", top: 8, left: 8 }}>
            <Badge size="sm" variant={product.badge.variant}>{product.badge.label}</Badge>
          </Box>
        )}
        {discount && (
          <Box style={{ position: "absolute", top: 8, right: 8 }}>
            <Badge size="sm" variant="destructive">−{discount}%</Badge>
          </Box>
        )}
      </Box>

      <CardHeader style={{ paddingBottom: 4 }}>
        <Text as="div" size="body-sm" weight="semibold" lineClamp={2} style={{ lineHeight: 1.35 }}>
          {product.name}
        </Text>
      </CardHeader>

      <CardContent style={{ paddingBottom: 8, flex: 1 }}>
        <Stack gap={2} style={{ gap: "0.375rem" }}>
          <Stack direction="row" align="center" gap={2}>
            <Rating value={product.rating} count={5} readOnly size="xs" />
            <Text as="span" size="caption" color="muted">({product.reviewCount.toLocaleString()})</Text>
          </Stack>
          <Stack direction="row" align="center" gap={2}>
            <Text as="span" weight="semibold">${product.price.toFixed(2)}</Text>
            {product.originalPrice && (
              <Text as="span" size="body-sm" color="muted" style={{ textDecoration: "line-through" }}>${product.originalPrice.toFixed(2)}</Text>
            )}
          </Stack>
        </Stack>
      </CardContent>

      <CardFooter>
        <Button fullWidth size="sm" leftIcon={<ShoppingCart style={{ width: 14, height: 14 }} />}>Add to cart</Button>
      </CardFooter>
    </Card>
  );
}

export const Default: Story = {
  render: () => (
    <Box p="xl">
      <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap={4}>
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </Grid>
    </Box>
  ),
};

export const Loading: Story = {
  name: "Loading state",
  render: () => (
    <Box p="xl">
      <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap={4}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} variant="outlined" style={{ overflow: "hidden" }}>
            <AspectRatio ratio={4 / 3}>
              <Skeleton className="h-full w-full rounded-none" />
            </AspectRatio>
            <CardHeader style={{ paddingBottom: 4 }}>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4 mt-1" />
            </CardHeader>
            <CardContent style={{ paddingBottom: 8 }}>
              <Stack gap={2}>
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-5 w-16" />
              </Stack>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-8 w-full rounded-md" />
            </CardFooter>
          </Card>
        ))}
      </Grid>
    </Box>
  ),
};

export const WithReviews: Story = {
  name: "Featured — with ratings",
  render: () => (
    <Stack gap={4} style={{ width: "100%", maxWidth: 384 }}>
      {products.slice(0, 1).map((p) => (
        <Card key={p.id} variant="outlined" style={{ overflow: "hidden" }}>
          <AspectRatio ratio={16 / 9}>
            <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </AspectRatio>
          <CardHeader>
            <Text as="div" weight="semibold">{p.name}</Text>
          </CardHeader>
          <CardContent>
            <Stack gap={3}>
              <Stack direction="row" align="center" gap={3}>
                <Rating value={p.rating} count={5} readOnly size="sm" />
                <Text as="span" size="body-sm" weight="semibold">{p.rating}.0</Text>
                <Text as="span" size="body-sm" color="muted">· {p.reviewCount.toLocaleString()} reviews</Text>
              </Stack>
              {[5, 4, 3, 2, 1].map((star) => (
                <Stack key={star} direction="row" align="center" gap={2}>
                  <Text as="span" size="caption" color="muted" style={{ width: 12 }}>{star}</Text>
                  <Star style={{ width: 12, height: 12, color: "hsl(var(--warning))", fill: "currentColor" }} />
                  <Box
                    grow
                    radius="full"
                    overflow="hidden"
                    style={{ height: 6, backgroundColor: "hsl(var(--muted))" }}
                  >
                    <Box
                      radius="full"
                      style={{
                        width: `${[60, 20, 10, 5, 5][5 - star]}%`,
                        height: "100%",
                        backgroundColor: "hsl(var(--warning))",
                      }}
                    />
                  </Box>
                  <Text as="span" size="caption" color="muted" style={{ width: 24, textAlign: "right" }}>{[60, 20, 10, 5, 5][5 - star]}%</Text>
                </Stack>
              ))}
            </Stack>
          </CardContent>
          <CardFooter>
            <Button fullWidth leftIcon={<ShoppingCart style={{ width: 14, height: 14 }} />}>Add to cart — ${p.price}</Button>
          </CardFooter>
        </Card>
      ))}
    </Stack>
  ),
};
