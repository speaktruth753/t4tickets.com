/**
 * Google Analytics & Event Tracking Utility
 * Provides standardized event dispatching for GA4 (gtag.js) and Google Tag Manager (dataLayer).
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Initializes the Google Analytics / dataLayer queue so event triggers never fail,
 * even before external GA4 scripts have fully downloaded.
 */
export function initGoogleAnalytics(): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag(...args: any[]) {
      window.dataLayer?.push(args);
    };
  }

  // Load GA4 script dynamically if VITE_GA_MEASUREMENT_ID is configured
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (gaId && !document.getElementById('ga4-script')) {
    const script = document.createElement('script');
    script.id = 'ga4-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
    document.head.appendChild(script);

    window.gtag('js', new Date());
    window.gtag('config', gaId, {
      send_page_view: true
    });
  }
}

/**
 * Standard Google Analytics event dispatcher
 */
export function trackGAEvent(eventName: string, params: Record<string, any> = {}): void {
  if (typeof window === 'undefined') return;

  // Ensure queue exists
  initGoogleAnalytics();

  const enhancedParams = {
    ...params,
    page_location: window.location.href,
    page_path: window.location.pathname,
    timestamp: new Date().toISOString()
  };

  // 1. Dispatch via standard GA4 gtag('event', ...)
  if (typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, enhancedParams);
    } catch (err) {
      console.warn('[Analytics] Failed to send GA4 event:', err);
    }
  }

  // 2. Dispatch via Google Tag Manager dataLayer
  if (Array.isArray(window.dataLayer)) {
    try {
      window.dataLayer.push({
        event: eventName,
        ...enhancedParams
      });
    } catch (err) {
      console.warn('[Analytics] Failed to push to dataLayer:', err);
    }
  }

  // Debug log in dev mode
  if (import.meta.env.DEV) {
    console.log(`[Analytics] Event triggered: ${eventName}`, enhancedParams);
  }
}

/**
 * Specifically tracks clicks on the floating WhatsApp direct support button
 * Target: 'floating-whatsapp-direct-btn'
 */
export function trackFloatingWhatsAppDirectClick(): void {
  trackGAEvent('whatsapp_direct_support_click', {
    event_category: 'Contact & Support',
    event_action: 'Click WhatsApp Direct Support',
    event_label: 'Floating WhatsApp Button - Muhammad Aamir Aziz',
    button_id: 'floating-whatsapp-direct-btn',
    support_channel: 'WhatsApp Direct Chat',
    agent_name: 'Muhammad Aamir Aziz',
    phone_number: '+966 50 267 4930',
    transport_type: 'beacon'
  });
}
