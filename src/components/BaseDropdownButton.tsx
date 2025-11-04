interface BaseDropdownButtonProps {
  children: React.ReactNode;
  onButtonClick: React.MouseEventHandler;
}

function BaseDropdownButton({
  children,
  onButtonClick,
}: BaseDropdownButtonProps) {
  return (
    <button
      className="h-10 rounded-md px-2 text-left outline-offset-1 hover:bg-neutral-700 focus:outline-1"
      onClick={onButtonClick}
    >
      {children}
    </button>
  );
}

export default BaseDropdownButton;
