import updateStats from "../ui/updateStats";
import sendRequests from "./sendRequests";

async function runTest(
  urls: string[],
  batchSize: number = 1,
  incrementFactor: number = 2,
  timeout: number = 30000,
  totalRequests: number = 1,
  totalSuccess: number = 0,
  totalFailures: number = 0,
  failureThresholdPercentage: number = 40
): Promise<void> {
  console.log(`Starting load test on ${urls[0]}\n`);

  while (true) {
    if (batchSize === 1) {
      updateStats(1, "-", "-", "-", "-", "-", "-", "-");
    }
    const { successCount, failureCount } = await sendRequests(
      urls,
      batchSize,
      timeout
    );
    const total: number = successCount + failureCount;
    const failureRate: number = (failureCount / total) * 100;

    totalRequests += total;
    totalSuccess += successCount;
    totalFailures += failureCount;
    const avgFailureRate: number = (totalFailures / totalRequests) * 100;

    updateStats(
      batchSize,
      successCount,
      failureCount,
      failureRate,
      totalRequests,
      totalSuccess,
      totalFailures,
      avgFailureRate
    );

    if (failureRate >= failureThresholdPercentage) {
      console.log("\nFailure threshold reached. Stopping test.");
      return;
    }

    batchSize *= incrementFactor;
  }
}

export default runTest;
