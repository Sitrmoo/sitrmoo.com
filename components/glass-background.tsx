export function GlassBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-[hsl(220,80%,60%)] opacity-30 blur-[120px]" />
      <div className="absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full bg-[hsl(200,90%,55%)] opacity-25 blur-[100px]" />
      <div className="absolute bottom-0 left-1/4 h-[350px] w-[350px] rounded-full bg-[hsl(260,70%,55%)] opacity-20 blur-[100px]" />
      <div className="absolute -bottom-20 right-1/4 h-[300px] w-[300px] rounded-full bg-[hsl(330,70%,55%)] opacity-15 blur-[80px]" />
    </div>
  );
}
