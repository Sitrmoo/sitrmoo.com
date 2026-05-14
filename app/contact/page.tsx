import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { cn } from "@/lib/utils";

// Telegram 官方 Logo
const TelegramIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

// Email 图标
const EmailIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const contactMethods = [
  {
    name: "Telegram",
    value: "@Sitrmoo",
    href: "https://t.me/sitrmoo",
    icon: TelegramIcon,
  },
  {
    name: "Email",
    value: "hi@sitrmoo.com",
    href: "mailto:hi@sitrmoo.com",
    icon: EmailIcon,
  },
];

export const metadata: Metadata = {
  title: "联系",
};

export default function ContactPage() {
  return (
    <PageShell title="联系" description="获取联系方式">
      <div className="mt-8 space-y-8">
        <p className="max-w-2xl text-pretty leading-relaxed text-foreground/80">
          谢谢你愿意花时间走进这个小小的数字角落，无论是想聊聊学习生活、分享有趣的想法，还是有什么想一起尝试的事，我都很乐意倾听。
        </p>

        <div className="max-w-2xl">
          <p className="mb-6 font-medium text-foreground">你可以通过以下方式联系我：</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {contactMethods.map((contact) => {
              const Icon = contact.icon;
              return (
                <a
                  key={contact.name}
                  href={contact.href}
                  target={contact.name !== "Email" ? "_blank" : undefined}
                  rel={contact.name !== "Email" ? "noopener noreferrer" : undefined}
                  className={cn(
                    "group relative flex items-center gap-4 rounded-xl p-5",
                    "bg-gradient-to-br from-white/10 to-white/5",
                    "border border-white/20 backdrop-blur-sm",
                    "transition-all duration-300",
                    "hover:border-white/40 hover:shadow-lg hover:shadow-white/5",
                    "hover:-translate-y-0.5"
                  )}
                >
                  <div className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl",
                    "bg-white/20 text-foreground shadow-md",
                    "transition-transform duration-300",
                    "group-hover:scale-110"
                  )}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground/70">
                      {contact.name}
                    </p>
                    <p className="truncate font-semibold text-foreground">
                      {contact.value}
                    </p>
                  </div>
                  <svg
                    className="h-5 w-5 text-foreground/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground/60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
