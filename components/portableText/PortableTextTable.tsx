type RichTextTableRow = {
  _key?: string;
  cells?: string[];
};

type RichTextTableValue = {
  caption?: string;
  rows?: RichTextTableRow[];
};

export function PortableTextTable({ value }: { value: RichTextTableValue }) {
  if (!value.rows?.length) {
    return null;
  }

  return (
    <div className="my-8 overflow-x-auto">
      <table className="min-w-full border-collapse border border-slate-300 text-left text-sm">
        {value.caption ? <caption className="mb-2 text-left text-sm text-slate-600">{value.caption}</caption> : null}
        <tbody>
          {value.rows.map((row, rowIndex) => (
            <tr key={row._key || `${rowIndex}`} className="border-b border-slate-200">
              {row.cells?.map((cell, cellIndex) => (
                <td key={`${row._key || rowIndex}-${cellIndex}`} className="border-r border-slate-200 px-3 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
