type HeroSectionProps = {
  heading: string;
  subheading?: string;
};

export function HeroSection({ heading, subheading }: HeroSectionProps) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight text-slate-950">{heading}</h1>
      {subheading ? <p className="mt-4 max-w-3xl text-lg text-slate-700">{subheading}</p> : null}
    </section>
  );
}
