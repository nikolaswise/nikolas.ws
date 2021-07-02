import items from '../data/meta.json'

const siteUrl = 'https://nikolas.ws';

const posts = items
  .filter(item => typeof item.type != 'undefined')
  .filter(item => !item.draft)
  .filter(item => !item.archived)
  .map(post => {
    return {
      title: post.title,
      date: post.timestamp,
      description: post.description,
      slug: post.slug,
    };
  });

const renderXmlSiteMap = (nodes) => `
  <?xml version="1.0" encoding="UTF-8" ?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>
        ${siteUrl}/
      </loc>
    </url>
    <url>
      <loc>
        ${siteUrl}/art
      </loc>
    </url>
    <url>
      <loc>
        ${siteUrl}/resources
      </loc>
    </url>
    <url>
      <loc>
        ${siteUrl}/bibliography
      </loc>
    </url>
    <url>
      <loc>
        ${siteUrl}/projects
      </loc>
    </url>
    <url>
      <loc>
        ${siteUrl}/texts
      </loc>
    </url>
    ${nodes.map(node => `
      <url>
        <loc>
          ${siteUrl}/${node.slug}
        </loc>
      </url>
    `).join('\n')}
  </urlset>
`;

export function get(req, res) {
  res.writeHead(200, {
    'Cache-Control': `max-age=0, s-max-age=${600}`, // 10 minutes
    'Content-Type': 'application/rss+xml'
  });

  let feed = renderXmlSiteMap(posts)
  res.end(feed);
}