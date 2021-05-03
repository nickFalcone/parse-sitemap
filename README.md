# [parse-sitemap]() 🗺️
#
[![NPM info](https://img.shields.io/npm/v/@nfalcone/parse-xmlsitemap)](https://www.npmjs.com/package/@nfalcone/parse-xmlsitemap)
[![NPM bundle](https://img.shields.io/bundlephobia/min/@nfalcone/parse-xmlsitemap)](https://img.shields.io/bundlephobia/min/@nfalcone/parse-xmlsitemap)

A tiny zero-dependency function to parse an XML sitemap and return an array of URL objects.

## Use

Import the `parseXmlSitemap` module directly, or use a module bundler of your choice. 

Then, in an async function, `await parseXmlSitemap('./path-to/sitemap.xml')` supplying the path to your sitemap file:

```js
import parseXmlSitemap from 'https://unpkg.com/@nfalcone/parse-xmlsitemap@0.2.0/index.min.js';

(async () => {
  const ul = document.getElementById('sitemapList');
  const urls = await parseXmlSitemap('./path-to/sitemap.xml'); // despite the warning, await is needed here.
})();
```

In the example above, `urls` is an array of URL objects. Each URL object contains [properties](https://developer.mozilla.org/en-US/docs/Web/API/URL#properties) including [href](https://developer.mozilla.org/en-US/docs/Web/API/URL/href).

Assuming an `<ul id="sitemapList"></ul>`, we can add list items for our site's URLs:

```js
import parseXmlSitemap from 'https://unpkg.com/@nfalcone/parse-xmlsitemap@0.2.0/index.min.js';

(async () => {
  const ul = document.getElementById('sitemapList');
  const urls = await parseXmlSitemap('./sitemap.xml'); // despite the warning, await is needed here.

  urls.forEach((url) => {
    const li = document.createElement('li');
    li.innerText = url.href;
    ul.appendChild(li);
  });
})();
```

### Cross origin note

If the sitemap.xml file is hosted on a different origin, proper [CORS headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#the_http_response_headers) should be in place.

## Develop

```bash
$ git clone git@github.com:nickFalcone/parse-sitemap.git
$ cd parse-sitemap/
$ npm install
$ http-server # runs the app.js demo
```

