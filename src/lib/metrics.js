export function trackPortfolioEvent(event) {
  void fetch('/api/metrics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event }),
    keepalive: true,
  }).catch(() => {});
}
