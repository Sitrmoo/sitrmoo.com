import Link from "next/link";
import { ArrowLeft, Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="text-center">
        {/* 动画鬼魂图标 */}
        <div className="mb-8 relative inline-block">
          <div className="absolute inset-0 animate-ping opacity-20">
            <Ghost className="h-32 w-32 text-foreground/20" />
          </div>
          <Ghost className="relative h-32 w-32 text-foreground animate-bounce" />
        </div>

        {/* 404 标题 */}
        <h1 className="mb-4 text-8xl font-bold text-foreground">
          404
        </h1>

        {/* 描述文字 */}
        <p className="mb-2 text-xl font-medium text-foreground">
          哎呀，页面迷路了...
        </p>
        <p className="mb-8 max-w-md text-foreground/60">
          我们都在时间里迷路，恰好，您走到了一个未标注的刻度。
        </p>

        {/* 返回首页按钮 */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-xl bg-foreground/10 px-6 py-3 text-foreground transition-all hover:bg-foreground/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          返回首页
        </Link>
      </div>
    </div>
  );
}