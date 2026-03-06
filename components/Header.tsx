import Link from 'next/link';

type HeaderProps = {
  siteTitle: string;
};

export function Header({ siteTitle }: HeaderProps) {
  return (
    <header className="border-b border-slate-200">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold text-slate-950">
          {siteTitle}
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <Link href="/" className="hover:text-slate-950 text-slate-700">
                Home
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
