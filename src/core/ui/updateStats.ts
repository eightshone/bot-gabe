import * as readline from "readline";

function updateStats(
  batchSize: number,
  successCount: number | string,
  failureCount: number | string,
  failureRate: number | string,
  totalRequests: number | string,
  totalSuccess: number | string,
  totalFailures: number | string,
  avgFailureRate: number | string
): void {
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
  process.stdout.write(
    `Batch Size: ${batchSize} | Success: ${successCount} | Failures: ${failureCount} | Fail Rate: ${
      typeof failureRate === "string" ? failureRate : failureRate.toFixed(2)
    }% | Total Sent: ${totalRequests} | Total Success: ${totalSuccess} | Total Failures: ${totalFailures} | Avg Fail Rate: ${
      typeof avgFailureRate === "string"
        ? avgFailureRate
        : avgFailureRate.toFixed(2)
    }%`
  );
}

export default updateStats;
