/**
 * Consent-aware analytics layer.
 *
 * - Meta Pixel is loaded ONLY after the user accepts "all" cookies.
 * - All tracking calls are no-ops until consent is granted.
 * - User can revoke consent any time (clearConsent()).
 */

const STORAGE_KEY = "vd-cookie-consent";
const PIXEL_ID = "1562756102090908";

let pixelLoaded = false;

export function getConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function hasMarketingConsent() {
  const c = getConsent();
  return c && c.value === "all";
}

export function setConsent(value) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ value, at: new Date().toISOString() }),
  );
  if (value === "all") {
    loadMetaPixel();
  }
}

export function clearConsent() {
  localStorage.removeItem(STORAGE_KEY);
}

/** Loads the Meta Pixel script + initializes it. Safe to call multiple times. */
export function loadMetaPixel() {
  if (pixelLoaded || typeof window === "undefined") return;
  pixelLoaded = true;

  /* eslint-disable */
  (function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod
        ? n.callMethod.apply(n, arguments)
        : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(
    window,
    document,
    "script",
    "https://connect.facebook.net/en_US/fbevents.js",
  );
  /* eslint-enable */

  window.fbq("init", PIXEL_ID);
  window.fbq("track", "PageView");
}

/** Initialise on app boot: if user previously accepted, load pixel automatically. */
export function initAnalytics() {
  if (hasMarketingConsent()) {
    loadMetaPixel();
  }
}

/** Guarded tracking — fires only if consent + pixel is loaded. */
export function track(eventName, params) {
  if (!hasMarketingConsent()) return;
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  if (params) {
    window.fbq("track", eventName, params);
  } else {
    window.fbq("track", eventName);
  }
}

export function trackPageView() {
  track("PageView");
}
