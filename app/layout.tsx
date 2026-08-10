import type { Metadata } from "next";
import Script from "next/script";
import { LightboxProvider } from "@/lib/lightbox-context";
import { BranchProvider } from "@/lib/branch-context";
import { OrderModalProvider } from "@/lib/order-modal-context";
import "./globals.css";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://pizzasta.co"),
  title: "PIZZASTA",
  description:
    "Pizzasta — oven-fresh pizza, cheesy pasta, spin rolls & loaded fries in Bahria Town, Rawalpindi. Order now from Phase 4 or Phase 8.",
  icons: {
    icon: "/images/logo-transparent-yellow.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Fredoka:wght@500;600;700&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
        {FB_PIXEL_ID && (
          <Script id="facebook-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
      </head>
      <body>
        {FB_PIXEL_ID && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        )}
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
