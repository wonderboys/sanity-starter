import { ContactCard, type ContactCardValue } from '@/components/blocks/ContactCard';

type ContactBlockValue = {
  title?: string;
  contacts?: ContactCardValue[];
  categoryContacts?: ContactCardValue[];
  contactCategory?: string;
  layout?: 'stacked' | 'grid';
  showRole?: boolean;
  showImage?: boolean;
};

function sortContacts(contacts: ContactCardValue[]) {
  return [...contacts].sort((left, right) => {
    const leftSort = typeof left.sortOrder === 'number' ? left.sortOrder : Number.MAX_SAFE_INTEGER;
    const rightSort = typeof right.sortOrder === 'number' ? right.sortOrder : Number.MAX_SAFE_INTEGER;

    if (leftSort !== rightSort) {
      return leftSort - rightSort;
    }

    return (left.name ?? '').localeCompare(right.name ?? '');
  });
}

export function ContactBlock({ value }: { value: ContactBlockValue }) {
  // Priority: manual references first, then category-based results, otherwise no cards.
  const selectedContacts = value.contacts?.length
    ? sortContacts(value.contacts)
    : value.contactCategory && value.categoryContacts?.length
      ? sortContacts(value.categoryContacts)
      : [];

  const contactGridClass = value.layout === 'grid' ? 'grid gap-6 sm:grid-cols-2' : 'grid gap-6';

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      {value.title ? <h2 className="text-3xl font-semibold text-slate-950">{value.title}</h2> : null}
      {selectedContacts.length ? (
        <div className={value.title ? `mt-5 ${contactGridClass}` : contactGridClass}>
          {selectedContacts.map((contact, index) => (
            <ContactCard
              key={contact._id || contact._key || `${contact.name ?? 'contact'}-${index}`}
              contact={contact}
              showImage={value.showImage !== false}
              showRole={value.showRole !== false}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
