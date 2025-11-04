type DropdownType = "searchDropdown" | "unitDropdown" | "weekdayDropdown";

interface BaseDropdownProps {
  children: React.ReactNode;
  dropdownType: DropdownType;
  ref: React.Ref<HTMLDivElement>;
}

const dropdownTypes: Record<DropdownType, string> = {
  searchDropdown: "py-2 top-[66px] left-0 right-0",
  unitDropdown: "top-[54px] right-0 py-1",
  weekdayDropdown: "top-[70px] right-6 py-2",
};

function BaseDropdown({ children, dropdownType, ref }: BaseDropdownProps) {
  return (
    <div
      className={`${dropdownTypes[dropdownType]} absolute z-10 flex min-w-[214px] flex-col gap-0.5 rounded-xl border border-neutral-600 bg-neutral-800 px-2 text-base`}
      ref={ref}
    >
      {children}
    </div>
  );
}

export default BaseDropdown;
