import { Command } from "commander";
import { VERSION } from "./utils/consts";
import goodbye from "./utils/goodbye";
import isValidURL from "./utils/isValidURL";
import runTest from "./core/functions/runLoadTest";

const program = new Command();

program
  .name("gabe")
  .description("A load testing cli tool that simulates bots behavior")
  .version(VERSION, "-v, --version", "output the version number");

program.argument("<url>", "entry URL to crawl").action(app);

program.parse();

async function app(url: string) {
  if (!isValidURL(url)) {
    console.log("❌ Invalid URL format");
    return;
  }

  await runTest([url]);
}

process.on("uncaughtException", (error) => {
  if (error instanceof Error && error.name === "ExitPromptError") {
    goodbye();
  } else {
    // Rethrow unknown errors
    throw error;
  }
});
