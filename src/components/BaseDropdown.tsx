type Position = "unitDropdown" | "weekdayDropdown";

interface BaseDropdownProps {
  children: React.ReactNode;
  position: Position;
  ref: React.Ref<HTMLDivElement>;
}

const positions: Record<Position, string> = {
  unitDropdown: "top-[54px] right-0",
  weekdayDropdown: "top-[70px] right-6",
};

function BaseDropdown({ children, position, ref }: BaseDropdownProps) {
  return (
    <div
      className={`${positions[position]} absolute z-10 flex min-w-[214px] flex-col gap-0.5 rounded-lg border border-neutral-600 bg-neutral-800 p-2 text-base`}
      ref={ref}
    >
      {children}
    </div>
  );
}

export default BaseDropdown;
