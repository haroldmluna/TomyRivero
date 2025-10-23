import "./globals.css";
import ClientLayout from "@/client-layout";
import Providers from "@/providers";
import Script from "next/script";
import GAListener from "@/components/Analytics/GAListener";
import ChatWidget from "@/components/ChatWidget/ChatWidget";
import TopBar from "@/components/TopBar/TopBar";

export const metadata = {
  title: "Tomy Rivero Beauty",
  description: "Beauty Lab and Beauty Café — services, color, and modern rituals.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning data-theme-mode="system" className="theme-dark">
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            try {
              const stored = localStorage.getItem('theme') || 'system';
              const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
              const active = stored === 'system' ? (systemDark ? 'dark' : 'light') : stored;
              const root = document.documentElement;
              root.setAttribute('data-theme-mode', stored);
              root.classList.remove('theme-dark', 'theme-light');
              root.classList.add(active === 'dark' ? 'theme-dark' : 'theme-light');
            } catch (e) {}
          `}
        </Script>
        {/* Google Analytics (loads only if NEXT_PUBLIC_GA_ID is set) */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);} 
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}
        <Providers>
          {process.env.NEXT_PUBLIC_GA_ID && <GAListener />}
          <ChatWidget />
          <ClientLayout>
            <TopBar />
            {children}
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
