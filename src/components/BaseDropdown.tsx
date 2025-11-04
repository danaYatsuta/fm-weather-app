type DropdownType = "unitDropdown" | "weekdayDropdown";

interface BaseDropdownProps {
  children: React.ReactNode;
  dropdownType: DropdownType;
  ref: React.Ref<HTMLDivElement>;
}

const dropdownTypes: Record<DropdownType, string> = {
  unitDropdown: "top-[54px] right-0 py-1",
  weekdayDropdown: "top-[70px] right-6 py-2",
};

function BaseDropdown({
  children,
  dropdownType: position,
  ref,
}: BaseDropdownProps) {
  return (
    <div
      className={`${dropdownTypes[position]} absolute z-10 flex min-w-[214px] flex-col gap-0.5 rounded-xl border border-neutral-600 bg-neutral-800 px-2 text-base`}
      ref={ref}
    >
      {children}
    </div>
  );
}

export default BaseDropdown;
