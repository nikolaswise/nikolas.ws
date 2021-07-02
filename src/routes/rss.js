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

const renderXmlRssFeed = (posts) => `
<?xml version="1.0" encoding="UTF-8" ?>
<rss
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom" version="2.0"
>
  <channel>
    <title>
      <![CDATA[nikolas.ws]]>
    </title>
    <link>
      ${siteUrl}
    </link>
    <description>
      <![CDATA[Texts, projects, notes and art.]]>
    </description>
    <lastBuildDate>
      ${new Date().toUTCString()}
    </lastBuildDate>
    ${posts.map(post => `
      <item>
        <title>${post.title}</title>
        <link>${siteUrl}/${post.slug}</link>
        <guid isPermaLink="true">
          ${siteUrl}/${post.slug}
        </guid>
        <description>
          <![CDATA[${post.description}]]>
        </description>
        <pubDate>
          ${new Date(post.date).toUTCString()}
        </pubDate>
      </item>
    `).join('\n')}
  </channel>

</rss>`;

export function get(req, res) {
  res.writeHead(200, {
    'Cache-Control': `max-age=0, s-max-age=${600}`, // 10 minutes
    'Content-Type': 'application/rss+xml'
  });

  let feed = renderXmlRssFeed(posts)
  res.end(feed);
}