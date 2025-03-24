#!/usr/bin/env node

import { Command } from "commander";
import { VERSION } from "./utils/consts";
import goodbye from "./utils/goodbye";
import isValidURL from "./utils/isValidURL";
import runTest from "./core/functions/runLoadTest";
import getSiteUrls from "./utils/getSiteUrls";
import getSitemap from "./utils/getSitemap";
import cleanupSitemapUrl from "./utils/cleanupSitemapUrl";
import shuffleArray from "./utils/shuffleArray";

const program = new Command();

program
  .name("gabe")
  .description("A load testing cli tool that simulates bots behavior")
  .version(VERSION, "-v, --version", "output the version number");

program
  .argument("<url>", "entry URL to crawl")
  .option("-s, --single-url", "skips sitemap files and only tests given url")
  .action(app);

program.parse();

async function app(url: string, options) {
  if (!isValidURL(url)) {
    console.log("❌ Invalid URL format");
    return;
  }

  await runTest(
    options.singleUrl
      ? [url]
      : shuffleArray(
          await getSiteUrls(cleanupSitemapUrl(url, await getSitemap(url)), url)
        )
  );
}

process.on("uncaughtException", (error) => {
  if (error instanceof Error && error.name === "ExitPromptError") {
    goodbye();
  } else {
    // Rethrow unknown errors
    throw error;
  }
});
