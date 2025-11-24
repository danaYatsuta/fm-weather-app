interface BaseCardProps {
  children?: React.ReactNode;
  tag?: Tag;
}

type Tag = "div" | "li";

export default function BaseCard({ children, tag = "div" }: BaseCardProps) {
  /* ------------------------------ Derived State ----------------------------- */

  const Tag = tag;

  /* --------------------------------- Markup --------------------------------- */

  return (
    <Tag className={"rounded-xl border border-neutral-600 bg-neutral-800"}>
      {children}
    </Tag>
  );
}
