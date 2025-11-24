import { useImperativeHandle, useRef } from "react";

interface DropdownButtonProps {
  border?: boolean;
  children?: React.ReactNode;
  fullWidth?: boolean;
  onButtonClick?: React.MouseEventHandler;
  ref?: React.Ref<DropdownButtonRef>;
}

interface DropdownButtonRef {
  contains: (otherNode: Node | null) => boolean;
  focus: () => void;
}

function DropdownButton({
  border = false,
  children,
  fullWidth = false,
  onButtonClick,
  ref,
}: DropdownButtonProps) {
  /* ---------------------------------- Hooks --------------------------------- */

  const buttonRef = useRef<HTMLButtonElement>(null);

  useImperativeHandle(ref, () => {
    return {
      contains(otherNode: Node | null) {
        if (!buttonRef.current) return false;

        return buttonRef.current.contains(otherNode);
      },
      focus() {
        buttonRef.current?.focus();
      },
    };
  });

  /* --------------------------------- Markup --------------------------------- */

  return (
    <button
      className={`${border ? "hover:border-neutral-600" : ""} ${fullWidth ? "w-full" : ""} h-10 rounded-md border border-neutral-800 px-2 text-left text-base outline-offset-1 hover:bg-neutral-700 focus-visible:outline-1`}
      onClick={onButtonClick}
      ref={buttonRef}
      type="button"
    >
      {children}
    </button>
  );
}

export default DropdownButton;
