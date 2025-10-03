import { fetchSiteInfo } from "@shared/api";

export const SITE = {
  name: "Foldfresh",
  tagline: "Premium Laundry & Dry Cleaning",
  whatsappNumber: "",
  phoneDisplay: "+91 98765 43210",
  phoneNumber: "",
  instagram: "",
};

let siteInitStarted = false;
export async function initSiteFromBackend() {
  if (siteInitStarted) return;
  siteInitStarted = true;
  try {
    const data = await fetchSiteInfo();
    SITE.name = data.name || SITE.name;
    SITE.tagline = data.tagline || SITE.tagline;
    SITE.whatsappNumber = data.whatsappNumber || SITE.whatsappNumber;
    SITE.phoneDisplay = data.phoneDisplay || SITE.phoneDisplay;
    SITE.phoneNumber = data.phoneNumber || SITE.phoneNumber;
    SITE.instagram = data.instagram || SITE.instagram;
  } catch (e) {
    // ignore and keep defaults
  }
}

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${SITE.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
