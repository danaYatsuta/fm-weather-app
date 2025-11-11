interface DropdownButtonProps {
  border?: boolean;
  children?: React.ReactNode;
  fullWidth?: boolean;
  onButtonClick?: React.MouseEventHandler;
  ref?: React.Ref<HTMLButtonElement>;
}

function DropdownButton({
  border = false,
  children,
  fullWidth = false,
  onButtonClick,
  ref,
}: DropdownButtonProps) {
  /* --------------------------------- Markup --------------------------------- */

  return (
    <button
      className={`${border ? "hover:border-neutral-600" : ""} ${fullWidth ? "w-full" : ""} h-10 rounded-md border border-neutral-800 px-2 text-left text-base outline-offset-1 hover:bg-neutral-700 focus:outline-1`}
      onClick={onButtonClick}
      ref={ref}
      type="button"
    >
      {children}
    </button>
  );
}

export default DropdownButton;
