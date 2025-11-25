import { useImperativeHandle, useRef } from "react";

export interface DropdownButtonRef {
  focus: () => void;
}

interface DropdownButtonProps {
  border?: boolean;
  children?: React.ReactNode;
  onButtonClick?: React.MouseEventHandler;
  ref?: React.Ref<DropdownButtonRef>;
}

export default function DropdownButton({
  border = false,
  children,
  onButtonClick,
  ref,
}: DropdownButtonProps) {
  /* ---------------------------------- Hooks --------------------------------- */

  const buttonRef = useRef<HTMLButtonElement>(null);

  useImperativeHandle(ref, () => {
    return {
      focus() {
        buttonRef.current?.focus();
      },
    };
  });

  /* --------------------------------- Markup --------------------------------- */

  return (
    <button
      className={`${border ? "hover:border-neutral-600" : ""} h-10 w-full rounded-md border border-neutral-800 px-2 text-left text-base outline-offset-1 hover:bg-neutral-700 focus-visible:outline-1`}
      onClick={onButtonClick}
      ref={buttonRef}
      type="button"
    >
      {children}
    </button>
  );
}
