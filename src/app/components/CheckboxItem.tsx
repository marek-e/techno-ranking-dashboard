export function CheckboxItem({
  label,
  checked,
  onChange,
  color,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  color: string;
}) {
  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      style={{ color }}
      onClick={() => onChange(!checked)}
    >
      <input
        type="checkbox"
        className="w-4 h-4 cursor-pointer"
        checked={checked}
        readOnly
      />
      <span className="truncate">{label}</span>
    </div>
  );
}
