import { whatsappLink, SITE } from "@/lib/site";

export default function WhatsAppFAB() {
  const href = whatsappLink(`Hi ${SITE.name}, I want to place a laundry order.`);
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 group"
    >
      <div className="relative flex items-center justify-center h-14 w-14 rounded-full shadow-xl transition transform hover:scale-105 focus-visible:outline-none ring-2 ring-white/70 bg-[linear-gradient(135deg,#25D366_0%,#128C7E_100%)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="h-7 w-7 text-white"
          fill="currentColor"
          aria-hidden
        >
          <path d="M19.11 17.53c-.27-.14-1.57-.78-1.81-.87-.24-.09-.42-.14-.6.14-.18.27-.69.87-.84 1.05-.16.18-.31.2-.58.07-.27-.14-1.13-.41-2.15-1.31-.79-.7-1.32-1.57-1.47-1.84-.16-.27-.02-.42.12-.56.12-.12.27-.31.4-.47.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.47-.07-.14-.6-1.45-.82-1.99-.22-.53-.44-.46-.6-.46-.16 0-.34-.02-.52-.02s-.47.07-.71.34c-.24.27-.93.91-.93 2.22s.95 2.58 1.08 2.76c.13.18 1.88 2.87 4.56 4.02.64.28 1.14.45 1.53.58.64.2 1.22.17 1.68.1.51-.08 1.57-.64 1.79-1.25.22-.62.22-1.15.15-1.25-.07-.11-.24-.18-.51-.31z"/>
          <path d="M26.88 5.12C24.13 2.37 20.66 1 17 1S9.87 2.37 7.12 5.12C4.37 7.87 3 11.34 3 15c0 2.49.68 4.92 1.97 7.05L3 31l9.16-1.93C14.24 30.33 15.61 31 17 31c3.66 0 7.13-1.37 9.88-4.12C29.63 24.13 31 20.66 31 17s-1.37-7.13-4.12-9.88zM17 28.5c-1.19 0-2.35-.27-3.44-.79l-.41-.2-5.42 1.14 1.13-5.29-.22-.35C7.14 21.04 6.5 18.95 6.5 16 6.5 9.65 11.65 4.5 18 4.5S29.5 9.65 29.5 16 24.35 28.5 17 28.5z"/>
        </svg>
      </div>
    </a>
  );
}
