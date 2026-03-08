import Link from 'next/link';

type PostCategoryFilterProps = {
  categories: string[];
  selectedCategory?: string;
};

export function PostCategoryFilter({ categories, selectedCategory }: PostCategoryFilterProps) {
  if (!categories.length) {
    return null;
  }

  return (
    <nav aria-label="Filtrera nyheter" className="flex flex-wrap gap-3">
      <Link
        href="/nyheter"
        className={`rounded-full border px-4 py-2 text-sm ${
          !selectedCategory
            ? 'border-slate-900 bg-slate-900 text-white'
            : 'border-slate-300 text-slate-700 hover:border-slate-400'
        }`}
      >
        Alla
      </Link>
      {categories.map((category) => (
        <Link
          key={category}
          href={`/nyheter?kategori=${encodeURIComponent(category)}`}
          className={`rounded-full border px-4 py-2 text-sm ${
            selectedCategory === category
              ? 'border-slate-900 bg-slate-900 text-white'
              : 'border-slate-300 text-slate-700 hover:border-slate-400'
          }`}
        >
          {category}
        </Link>
      ))}
    </nav>
  );
}
