type Item = {
  label: string;
  value: number;
  accent?: string;
};

export function InfographicCard({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: Item[];
}) {
  const safeValues = items.map((item) => Math.max(0, item.value));
  const max = Math.max(1, ...safeValues);

  return (
    <article className="north-card p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">{subtitle}</p>
      <h3 className="text-xl mt-1 mb-4">{title}</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-ink-soft">{item.label}</span>
              <span className="font-medium">{item.value}</span>
            </div>
            <div className="h-2 rounded bg-[#ece6db]">
              <div
                className="h-2 rounded"
                style={{
                  width: `${(Math.max(0, item.value) / max) * 100}%`,
                  background: item.accent ?? "#b18a3d",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
