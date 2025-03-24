import Sitemapper from "sitemapper";

async function getSiteUrls(sitemapUrl: string, fallback: string) {
  const sitemap = new Sitemapper({
    url: sitemapUrl,
    timeout: 15000,
  });
  const sites = await sitemap.fetch();

  return sites?.sites?.length ? sites?.sites : [fallback];
}

export default getSiteUrls;
