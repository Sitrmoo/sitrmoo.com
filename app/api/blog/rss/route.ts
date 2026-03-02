import { NextResponse } from "next/server";

interface RssItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
}

function extractTag(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>|<${tag}[^>]*>([\\s\\S]*?)</${tag}>`);
  const match = xml.match(regex);
  if (!match) return "";
  return (match[1] ?? match[2] ?? "").trim();
}

function parseRssItems(xml: string): RssItem[] {
  const items: RssItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];
    const title = extractTag(itemXml, "title");
    const description = extractTag(itemXml, "description");
    const link = extractTag(itemXml, "link");
    const pubDate = extractTag(itemXml, "pubDate");

    items.push({ title, description, link, pubDate });
  }

  return items;
}

export async function GET() {
  try {
    const res = await fetch("https://blog.sitrmoo.com/rss.xml", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json({ items: [] }, { status: 200 });
    }

    const xml = await res.text();
    const items = parseRssItems(xml).slice(0, 10);

    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}
