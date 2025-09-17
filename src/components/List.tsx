export default function List({ items }: { items: string[] }) {
  return (
    <div className="flex flex-col uppercase">
      {items.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </div>
  );
}
