interface SectionInputProps {
  value: string;
  onChange: (name: string) => void;
}

export function SectionInput({ value, onChange }: SectionInputProps) {
  return (
    <input
      className="text-sm font-light text-gray-300 bg-transparent"
      onChange={(event) => onChange(event.target.value)}
      value={value}
    />
  );
}
