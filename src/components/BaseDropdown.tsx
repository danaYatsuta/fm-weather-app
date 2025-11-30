import BaseCard from "./BaseCard";

interface Position {
  bottom?: string;
  left?: string;
  right?: string;
  top?: string;
}

export default function BaseDropdown({
  children,
  id,
  isShown,
  position,
  ref,
}: {
  children: React.ReactNode;
  id?: string;
  isShown: boolean;
  position: Position;
  ref: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      className={`${isShown ? "" : "hidden -translate-y-2 opacity-0"} absolute z-10 transition transition-discrete motion-reduce:transition-none starting:-translate-y-2 starting:opacity-0`}
      id={id}
      ref={ref}
      style={{
        bottom: position.bottom ?? "auto",
        left: position.left ?? "auto",
        right: position.right ?? "auto",
        top: position.top ?? "auto",
      }}
    >
      <BaseCard>{children}</BaseCard>
    </div>
  );
}
