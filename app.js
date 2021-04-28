// Adding import extension '.js' resolves type="module" error:
// Failed to load module script: The server responded with a non-JavaScript MIME type of "text/html".
// Strict MIME type checking is enforced for module scripts per HTML spec.
// eslint-disable-next-line import/extensions
import parseXmlSitemap from './index.js';

(async () => {
  const ul = document.getElementById('sitemapList');
  const urls = await parseXmlSitemap('./sitemap.xml');
  // ts lint warning: omitting await here does not let promise resolve

  urls.forEach((url) => {
    const li = document.createElement('li');
    li.innerText = url.href;
    ul.appendChild(li);
  });
})();
