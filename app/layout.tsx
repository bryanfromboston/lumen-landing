import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ExitIntentProvider from "@/components/exit-intent/ExitIntentProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumen Internet On Demand | Flex Your Network",
  description: "Secure, fast connectivity from 100 Mbps to 100 Gbps. Pay only for bandwidth you use. Activate in 5 minutes. No contracts.",
  keywords: ["internet", "bandwidth", "on-demand", "connectivity", "enterprise", "network"],
  openGraph: {
    title: "Lumen Internet On Demand",
    description: "Flex your network with consumption-based pricing. 100 Mbps to 100 Gbps in 5 minutes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="antialiased">
        <ExitIntentProvider>
          <Header />
          {children}
          <Footer />
        </ExitIntentProvider>
      </body>
    </html>
  );
}
