import RSSParser from 'rss-parser';

const parser = new RSSParser();
let cache = {
  timestamp: 0,
  items: []
};
const TTL = 10 * 60 * 1000; // 缓存 10 分钟

export async function GET() {
  try {
    const now = Date.now();
    if (cache.items.length > 0 && (now - cache.timestamp) < TTL) {
      return new Response(JSON.stringify({ source: 'cache', items: cache.items }), {
        status: 200,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'public, max-age=60'
        }
      });
    }

    const feed = await parser.parseURL('https://blog.sitrmoo.com/rss.xml');
    const items = (feed.items || []).map(i => ({
      title: i.title || '无标题',
      link: i.link || '#',
      pubDate: i.pubDate || i.isoDate || '',
      description: i.contentSnippet || i.content || i.summary || ''
    }));

    cache = { timestamp: Date.now(), items };

    return new Response(JSON.stringify({ source: 'origin', items }), {
      status: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'public, max-age=60'
      }
    });
  } catch (err) {
    console.error('RSS fetch error:', err);
    return new Response(JSON.stringify({ error: '无法获取 RSS 源' }), {
      status: 500,
      headers: { 'content-type': 'application/json; charset=utf-8' }
    });
  }
}
