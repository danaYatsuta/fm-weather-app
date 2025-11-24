export default function DropdownRadioInput({
  checked,
  label,
  onChange,
  onMouseDown,
}: {
  checked: boolean;
  label: string;
  onChange: () => void;
  onMouseDown: () => void;
}) {
  return (
    <label
      className="flex h-10 items-center rounded-md border border-neutral-800 px-2 text-left text-base outline-offset-1 hover:bg-neutral-700 has-checked:bg-neutral-700 has-focus-visible:outline-1"
      onMouseDown={onMouseDown}
    >
      {label}
      <input
        checked={checked}
        className="sr-only"
        onChange={onChange}
        type="radio"
      />
    </label>
  );
}
