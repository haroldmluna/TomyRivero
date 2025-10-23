import "./globals.css";
import ClientLayout from "@/client-layout";
import Providers from "@/providers";
import ChatWidget from "@/components/ChatWidget/ChatWidget";
import TopBar from "@/components/TopBar/TopBar";

export const metadata = {
  title: "Tomy Rivero Beauty",
  description: "Beauty Lab and Beauty Café — services, color, and modern rituals.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
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
