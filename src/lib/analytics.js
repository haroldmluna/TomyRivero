export function track(action, params = {}) {
  if (typeof window === "undefined" || !window.gtag || !process.env.NEXT_PUBLIC_GA_ID) return;
  try {
    window.gtag("event", action, params);
  } catch (e) {
    // no-op
  }
}
