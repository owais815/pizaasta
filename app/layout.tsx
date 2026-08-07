import type { Metadata } from "next";
import { LightboxProvider } from "@/lib/lightbox-context";
import { BranchProvider } from "@/lib/branch-context";
import { OrderModalProvider } from "@/lib/order-modal-context";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pizzasta.co"),
  title: "Pizzasta — Every Bite Melts Right | Bahria Town, Rawalpindi",
  description:
    "Pizzasta — oven-fresh pizza, cheesy pasta, spin rolls & loaded fries in Bahria Town, Rawalpindi. Order now from Phase 4 or Phase 8.",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='46' fill='%23FFC91E' stroke='%23A80E16' stroke-width='6'/%3E%3Ctext x='50' y='64' font-size='55' text-anchor='middle'%3E%F0%9F%8D%95%3C/text%3E%3C/svg%3E",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Fredoka:wght@500;600;700&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
          <symbol id="icon-whatsapp" viewBox="0 0 32 32">
            <path d="M16.04 3C9.37 3 3.98 8.4 3.98 15.07c0 2.19.58 4.33 1.68 6.22L3 29l7.9-2.07a12.04 12.04 0 0 0 5.13 1.15h.01c6.67 0 12.06-5.4 12.06-12.07C28.1 8.4 22.71 3 16.04 3zm0 21.9h-.01a10.05 10.05 0 0 1-5.11-1.4l-.37-.22-4.69 1.23 1.25-4.57-.24-.38a9.98 9.98 0 0 1-1.53-5.31c0-5.53 4.5-10.03 10.05-10.03 2.69 0 5.21 1.05 7.11 2.95a9.98 9.98 0 0 1 2.94 7.09c0 5.54-4.5 10.04-10.06 10.04zm5.5-7.53c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.79-1.68-2.09-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.68-1.64-.93-2.24-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.53.07-.8.38-.28.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.13 3.25 5.16 4.56.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.13-.27-.2-.57-.35z" />
          </symbol>
        </svg>
        <BranchProvider>
          <OrderModalProvider>
            <LightboxProvider>{children}</LightboxProvider>
          </OrderModalProvider>
        </BranchProvider>
      </body>
    </html>
  );
}
