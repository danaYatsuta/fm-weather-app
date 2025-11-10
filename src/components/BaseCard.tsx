interface BaseCardProps {
  children?: React.ReactNode;
  tag?: Tag;
}

type Tag = "div" | "li";

function BaseCard({ children, tag = "div" }: BaseCardProps) {
  const Tag = tag;

  return (
    <Tag className={"rounded-xl border border-neutral-600 bg-neutral-800"}>
      {children}
    </Tag>
  );
}

export default BaseCard;
