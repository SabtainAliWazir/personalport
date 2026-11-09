const optimized = new Set([
  '/images/blog/air-gap-vs-stuxnet-breach.png',
  '/images/blog/bad-prompt-vs-good-prompt-ai.png',
  '/images/blog/big-bang-rewrite-vs-strangler-fig.png',
  '/images/blog/bloated-spa-vs-html-first.png',
  '/images/blog/chatbot-vs-ai-agent-comparison.png',
  '/images/blog/closed-book-vs-open-book-rag.png',
  '/images/blog/exposed-iot-vs-hardened-ot-network.png',
  '/images/blog/forward-vs-reverse-engineering.png',
  '/images/blog/gps-follower-vs-map-navigator.png',
  '/images/blog/insecure-vs-hardened-php.png',
  '/images/blog/proprietary-integrations-vs-mcp.png',
  '/images/blog/traditional-vs-vibe-coding.png',
  '/images/blog/vibe-check-vs-rigorous-evals.png',
]);

export function inlineBlogImage(href) {
  return optimized.has(href) ? href.replace(/\.png$/, '.webp') : href;
}
