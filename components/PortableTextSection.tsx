import { PortableTextRenderer } from '@/components/PortableTextRenderer';

type PortableTextSectionProps = {
  value: unknown;
};

export function PortableTextSection({ value }: PortableTextSectionProps) {
  return <PortableTextRenderer value={value} />;
}
