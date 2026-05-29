import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MoreHorizontal, Reply, ThumbsUp } from "lucide-react";

import { Avatar } from "../components/avatar/Avatar";
import { Badge } from "../components/badge/Badge";
import { Box } from "../components/box/Box";
import { Button } from "../components/button/Button";
import { Separator } from "../components/separator/Separator";
import { Stack } from "../components/stack/Stack";
import { Text } from "../components/text/Text";
import { Textarea } from "../components/textarea/Textarea";

const meta = {
  title: "Patterns/Comment Thread",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

interface Comment {
  id: number;
  author: string;
  avatar: string;
  role?: string;
  body: string;
  time: string;
  likes: number;
  isAuthor?: boolean;
  replies?: Comment[];
}

const thread: Comment[] = [
  {
    id: 1,
    author: "Sofia Hernandez",
    avatar: "https://i.pravatar.cc/150?img=9",
    role: "Author",
    body: "Great question! The key difference between compound components and render props is that compound components give consumers more control over layout and composition without requiring them to thread callbacks through multiple layers.",
    time: "3 hr ago",
    likes: 12,
    isAuthor: true,
    replies: [
      {
        id: 2,
        author: "Alice Johnson",
        avatar: "https://i.pravatar.cc/150?img=1",
        body: "That makes a lot of sense. So compound components work best when you need flexibility in how sub-components are arranged?",
        time: "2 hr ago",
        likes: 4,
      },
      {
        id: 3,
        author: "Bob Smith",
        avatar: "https://i.pravatar.cc/150?img=2",
        body: "I&apos;d add that the Context API is what makes compound components really shine — no prop drilling at all.",
        time: "1 hr ago",
        likes: 7,
      },
    ],
  },
  {
    id: 4,
    author: "Carol Williams",
    avatar: "https://i.pravatar.cc/150?img=3",
    body: "Excellent write-up. I&apos;ve been using this pattern in production for two years and it&apos;s reduced our component API surface area significantly.",
    time: "1 hr ago",
    likes: 9,
  },
];

function CommentAction({ liked, onClick, icon, children }: { liked?: boolean; onClick: () => void; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.25rem",
        fontSize: "0.75rem",
        color: liked ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
        fontWeight: liked ? 500 : undefined,
      }}
    >
      {icon}
      {children}
    </button>
  );
}

function CommentCard({ comment, nested = false }: { comment: Comment; nested?: boolean }) {
  const [liked, setLiked] = useState(false);
  const [showReply, setShowReply] = useState(false);

  return (
    <Box style={nested ? { paddingLeft: 40 } : undefined}>
      <Stack gap={3}>
        <Stack direction="row" gap={3}>
          <Box shrink={false} style={{ marginTop: "0.125rem" }}>
            <Avatar src={comment.avatar} alt={comment.author} size="sm" fallback={comment.author[0]} />
          </Box>
          <Box grow style={{ minWidth: 0 }}>
            <Box
              radius="lg"
              p="sm"
              style={{ border: "1px solid hsl(var(--border))", backgroundColor: "hsl(var(--muted) / 0.3)" }}
            >
              <Stack gap={2} style={{ gap: "0.375rem" }}>
                <Stack direction="row" align="center" justify="between" gap={2}>
                  <Stack direction="row" align="center" gap={2}>
                    <Text as="span" size="body-sm" weight="semibold">{comment.author}</Text>
                    {comment.isAuthor && <Badge size="xs" variant="info">Author</Badge>}
                    <Text as="span" size="caption" color="muted">{comment.time}</Text>
                  </Stack>
                  <Button size="icon" variant="ghost" aria-label="More options" style={{ width: 24, height: 24 }}>
                    <MoreHorizontal style={{ width: 14, height: 14 }} />
                  </Button>
                </Stack>
                <Text size="body-sm" style={{ lineHeight: 1.625 }}>{comment.body}</Text>
              </Stack>
            </Box>
            <Stack direction="row" align="center" gap={3} style={{ marginTop: "0.375rem", marginLeft: "0.25rem" }}>
              <CommentAction
                liked={liked}
                onClick={() => setLiked((v) => !v)}
                icon={<ThumbsUp style={{ width: 14, height: 14 }} />}
              >
                {comment.likes + (liked ? 1 : 0)}
              </CommentAction>
              <CommentAction
                onClick={() => setShowReply((v) => !v)}
                icon={<Reply style={{ width: 14, height: 14 }} />}
              >
                Reply
              </CommentAction>
            </Stack>
          </Box>
        </Stack>

        {comment.replies?.map((reply) => (
          <CommentCard key={reply.id} comment={reply} nested />
        ))}

        {showReply && (
          <Box style={nested ? undefined : { paddingLeft: 40 }}>
            <Stack direction="row" gap={3}>
              <Box shrink={false} style={{ marginTop: "0.125rem" }}>
                <Avatar fallback="Y" size="sm" />
              </Box>
              <Box grow>
                <Stack gap={2}>
                  <Textarea placeholder="Write a reply…" rows={2} />
                  <Box style={{ marginLeft: "auto" }}>
                    <Stack direction="row" gap={2}>
                      <Button size="sm" variant="ghost" onClick={() => setShowReply(false)}>Cancel</Button>
                      <Button size="sm">Post reply</Button>
                    </Stack>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Box>
        )}
      </Stack>
    </Box>
  );
}

function CommentThreadStory() {
  const [showForm, setShowForm] = useState(false);

  return (
    <Box style={{ width: "100%", maxWidth: 600 }}>
      <Stack gap={5}>
        <Stack direction="row" align="center" justify="between">
          <Stack direction="row" align="center" gap={2}>
            <Text as="span" size="body-sm" weight="semibold">Comments</Text>
            <Badge size="xs" variant="secondary">4</Badge>
          </Stack>
          <Button size="sm" variant="outline" onClick={() => setShowForm((v) => !v)}>
            {showForm ? "Cancel" : "Add comment"}
          </Button>
        </Stack>

        {showForm && (
          <Stack direction="row" gap={3}>
            <Box shrink={false} style={{ marginTop: "0.125rem" }}>
              <Avatar fallback="Y" size="sm" />
            </Box>
            <Box grow>
              <Stack gap={2}>
                <Textarea placeholder="Share your thoughts…" rows={3} />
                <Box style={{ marginLeft: "auto" }}>
                  <Stack direction="row" gap={2}>
                    <Button size="sm" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
                    <Button size="sm">Post comment</Button>
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </Stack>
        )}

        <Separator />

        <Stack gap={5}>
          {thread.map((comment, i) => (
            <div key={comment.id}>
              <CommentCard comment={comment} />
              {i < thread.length - 1 && <Separator style={{ marginTop: "1.25rem" }} />}
            </div>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}

export const Default: Story = {
  render: () => <CommentThreadStory />,
};
