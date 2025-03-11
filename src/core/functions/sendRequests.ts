import axios from "axios";

async function sendRequests(
  urls: string[],
  batchSize: number,
  timeout: number
): Promise<{
  successCount: number;
  failureCount: number;
  minResponseTime: number;
  maxResponseTime: number;
  avgResponseTime: number;
}> {
  let successCount: number = 0;
  let failureCount: number = 0;
  let responseTimes: number[] = [];
  let requests: Promise<void | number>[] = [];

  for (let i = 0; i < batchSize; i++) {
    const startTime = Date.now();
    requests.push(
      axios
        .get(urls[(urls.length - 1) % batchSize], {
          timeout,
        })
        .then(() => {
          successCount++;
          responseTimes.push(Date.now() - startTime);
        })
        .catch(() => {
          failureCount++;
        })
    );
  }

  await Promise.all(requests);

  const minResponseTime =
    responseTimes.length > 0 ? Math.min(...responseTimes) : 0;
  const maxResponseTime =
    responseTimes.length > 0 ? Math.max(...responseTimes) : 0;
  const avgResponseTime =
    responseTimes.length > 0
      ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
      : 0;

  return {
    successCount,
    failureCount,
    minResponseTime,
    maxResponseTime,
    avgResponseTime,
  };
}

export default sendRequests;
