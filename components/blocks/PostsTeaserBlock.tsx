import Link from 'next/link';

import { PostCard, type PostCardValue } from '@/components/posts/PostCard';

type PostsTeaserBlockValue = {
  title?: string;
  category?: string;
  limit?: number;
  showArchiveLink?: boolean;
  archiveLinkLabel?: string;
  posts?: PostCardValue[];
};

export function PostsTeaserBlock({ value }: { value: PostsTeaserBlockValue }) {
  const posts = (value.posts ?? []).slice(0, value.limit ?? 3);

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      {value.title ? <h2 className="text-3xl font-semibold text-slate-950">{value.title}</h2> : null}

      {posts.length ? (
        <div className={value.title ? 'mt-8 grid gap-6 md:grid-cols-3' : 'grid gap-6 md:grid-cols-3'}>
          {posts.map((post) => (
            <PostCard key={post._id || post.slug?.current} post={post} />
          ))}
        </div>
      ) : null}

      {value.showArchiveLink ? (
        <div className={posts.length || value.title ? 'mt-6' : ''}>
          <Link href="/nyheter" className="text-slate-900 underline underline-offset-2 hover:text-slate-700">
            {value.archiveLinkLabel || 'Visa alla nyheter'}
          </Link>
        </div>
      ) : null}
    </section>
  );
}
