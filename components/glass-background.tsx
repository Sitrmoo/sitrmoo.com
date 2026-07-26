export function GlassBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      {/* 两侧细线框（大屏可见），营造纸面版式感 */}
      <div className="absolute inset-y-0 left-1/2 hidden w-full max-w-5xl -translate-x-1/2 lg:block">
        <div className="absolute inset-y-0 left-0 w-px bg-border/70" />
        <div className="absolute inset-y-0 right-0 w-px bg-border/70" />
      </div>

      {/* 顶部细微点阵，向下淡出 */}
      <div
        className="dot-pattern absolute inset-x-0 top-0 h-64 opacity-[0.35] [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />
    </div>
  );
}
