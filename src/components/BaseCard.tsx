type Tag = "div" | "li";

interface BaseCardProps {
  tag?: Tag;
  children?: React.ReactNode;
}

function BaseCard({ tag = "div", children }: BaseCardProps) {
  const Tag = tag;

  return (
    <Tag className={"rounded-xl border border-neutral-600 bg-neutral-800"}>
      {children}
    </Tag>
  );
}

export default BaseCard;
