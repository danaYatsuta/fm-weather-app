interface BaseDropdownButtonProps {
  border?: boolean;
  fullWidth?: boolean;
  onButtonClick?: React.MouseEventHandler;
  children?: React.ReactNode;
}

function BaseDropdownButton({
  border = false,
  fullWidth = false,
  onButtonClick,
  children,
}: BaseDropdownButtonProps) {
  return (
    <button
      className={`${border ? "hover:border-neutral-600" : ""} ${fullWidth ? "w-full" : ""} h-10 rounded-md border border-neutral-800 px-2 text-left text-base outline-offset-1 hover:bg-neutral-700 focus:outline-1`}
      onClick={onButtonClick}
    >
      {children}
    </button>
  );
}

export default BaseDropdownButton;
