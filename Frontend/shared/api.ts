/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

export interface PingResponse {
  message: string;
}

function getBackendBaseUrl() {
  // Vite injects import.meta.env at build-time
  const envUrl = (import.meta as any).env?.VITE_BACKEND_URL as string | undefined;
  return envUrl && envUrl.length > 0 ? envUrl : "http://127.0.0.1:8000";
}

export async function pingBackend(baseUrl: string = getBackendBaseUrl()) {
  const res = await fetch(`${baseUrl}/api/ping`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error(`Ping failed: ${res.status}`);
  }
  const data: PingResponse = await res.json();
  return data;
}

export interface ContactPayload {
  name: string;
  phone: string;
  email?: string;
  service: "Laundry" | "Dry Cleaning" | "Ironing" | "Other";
  address: string;
  message?: string;
}

export interface ContactResponse {
  ok: boolean;
  received: ContactPayload;
}

export async function submitContact(payload: ContactPayload, baseUrl: string = getBackendBaseUrl()) {
  const res = await fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Contact failed: ${res.status} ${errText}`);
  }
  const data: ContactResponse = await res.json();
  return data;
}

export async function fetchWhatsAppLink(text: string, baseUrl: string = getBackendBaseUrl()) {
  const res = await fetch(`${baseUrl}/api/whatsapp-link?text=${encodeURIComponent(text)}`);
  if (!res.ok) throw new Error(`WhatsApp link failed: ${res.status}`);
  const data: { url: string; number: string } = await res.json();
  return data;
}

export type PricingResponse = {
  men: { item: string; washFold?: number; dryClean?: number; iron?: number; steamIron?: number }[];
  women: { item: string; washFold?: number; dryClean?: number; iron?: number; steamIron?: number }[];
  household: { item: string; washFold?: number; dryClean?: number; iron?: number; steamIron?: number }[];
  footwear: { item: string; washFold?: number; dryClean?: number; iron?: number; steamIron?: number }[];
  packages: { name: string; garments: number; turnaround: string; price: number; features: string[] }[];
};

export async function fetchPricing(baseUrl: string = getBackendBaseUrl()) {
  const res = await fetch(`${baseUrl}/api/pricing`);
  if (!res.ok) throw new Error(`Pricing failed: ${res.status}`);
  const data: PricingResponse = await res.json();
  return data;
}

export type SiteInfoResponse = {
  name: string;
  tagline: string;
  whatsappNumber: string;
  phoneDisplay: string;
  phoneNumber?: string;
  instagram?: string;
};

export async function fetchSiteInfo(baseUrl: string = getBackendBaseUrl()) {
  const res = await fetch(`${baseUrl}/api/site-info`);
  if (!res.ok) throw new Error(`Site info failed: ${res.status}`);
  const data: SiteInfoResponse = await res.json();
  return data;
}
