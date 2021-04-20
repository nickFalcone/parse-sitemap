/**
 * Parse a valid XML sitemap and return URL objects.
 * @param {String} sitemapUri - The URI of the sitemap to parse.
 * @returns {Array} sitemapUrls - An array of URL objects.
 */
export default async function parseXmlSitemap(sitemapUri) {
  const sitemapUrls = [];
  try {
    await fetch(sitemapUri)
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        return console.error(`Error fetching sitemap at: ${sitemapUri}`);
      })
      .then((string) =>
        new window.DOMParser().parseFromString(string, 'text/html')
      )
      .then((data) => {
        // <loc> is required for valid xml sitemap https://www.sitemaps.org/protocol.html#locdef
        [...data.querySelectorAll('loc')].forEach((loc) => {
          const url = new URL(loc.textContent);
          sitemapUrls.push(url);
        });
      });
  } catch (e) {
    console.error(e);
  }
  return sitemapUrls;
}
