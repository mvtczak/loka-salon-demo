export default function Eyebrow({
  children,
  align = "start",
}: {
  children: React.ReactNode;
  align?: "start" | "center";
}) {
  return (
    <div className={`flex items-center gap-2.5 ${align === "center" ? "justify-center" : ""}`}>
      <span className="h-px w-6 bg-amber" />
      <span className="text-xs uppercase tracking-[0.3em] text-amber">{children}</span>
      {align === "center" && <span className="h-px w-6 bg-amber" />}
    </div>
  );
}
