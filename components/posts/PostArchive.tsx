import { PostCard, type PostCardValue } from '@/components/posts/PostCard';
import { PostCategoryFilter } from '@/components/posts/PostCategoryFilter';

type PostArchiveProps = {
  posts: PostCardValue[];
  categories: string[];
  selectedCategory?: string;
};

export function PostArchive({ posts, categories, selectedCategory }: PostArchiveProps) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Nyheter</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">Senaste nytt</h1>
        <p className="mt-4 text-lg text-slate-700">
          {selectedCategory ? `Visar nyheter i kategorin ${selectedCategory}.` : 'Alla publicerade nyheter.'}
        </p>
      </div>

      {categories.length ? (
        <div className="mt-8">
          <PostCategoryFilter categories={categories} selectedCategory={selectedCategory} />
        </div>
      ) : null}

      {posts.length ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post._id || post.slug?.current} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-slate-700">Det finns inga nyheter i den valda kategorin.</p>
      )}
    </section>
  );
}
