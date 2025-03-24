import axios from "axios";

async function getSitemap(url: string) {
  let sitemap = "sitemap.xml";
  const response = await axios.get(`${url}/robots.txt`);
  if (response?.data) {
    const lines = response.data.split("\n");
    for (const line of lines) {
      const match = line.match(/^Sitemap:\s*(.+)$/i);
      if (match) {
        sitemap = match[1];
        break; // Stops looping once a sitemap is found
      }
    }
  }

  return sitemap;
}

export default getSitemap;
