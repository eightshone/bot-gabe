function cleanupSitemapUrl(baseUrl: string, sitemapUrl: string) {
  // if the sitemap url is absolute then return it as is
  if (/^https?:\/\//i.test(sitemapUrl)) {
    return sitemapUrl;
  }

  // return absolute sitemap url
  return `${baseUrl.replace(/\/$/, "")}/${sitemapUrl.replace(/^\//, "")}`;
}

export default cleanupSitemapUrl;
