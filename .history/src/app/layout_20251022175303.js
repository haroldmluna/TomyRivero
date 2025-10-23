import "./globals.css";
import ClientLayout from "@/client-layout";
import Providers from "@/providers";
import TopBar from "@/components/TopBar/TopBar";

export const metadata = {
  title: "Terrene | MWT by Codegrid ",
  description: "Monthly Website Template by Codegrid | August 2025",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ClientLayout>
            <TopBar />
            {children}
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
