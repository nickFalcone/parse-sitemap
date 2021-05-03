/**
 * Parse a valid XML sitemap and return URL objects.
 * @param {String} sitemapUri - The URI of the sitemap to parse.
 * @returns {Array} sitemapUrls - An array of URL objects.
 */
export default async function parseXmlSitemap(sitemapUri) {
  if (!sitemapUri.includes('.xml')) {
    console.warn(`Please supply an XML file. Supplied: ${sitemapUri}`);
  }
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
        const locations = [...data.querySelectorAll('loc')];
        if (locations.length === 0) {
          console.warn(
            `No <loc> present in ${sitemapUri} See: https://www.sitemaps.org/protocol.html#locdef`
          );
        }
        // <loc> is required for a valid xml sitemap https://www.sitemaps.org/protocol.html#locdef
        locations.forEach((loc) => {
          const url = new URL(loc.textContent);
          sitemapUrls.push(url);
        });
      });
  } catch (e) {
    console.error(e);
  }
  return sitemapUrls;
}
