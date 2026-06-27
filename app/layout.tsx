import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono, Syne } from "next/font/google";
import "@/styles/globals.css";
import { SmoothScrollProvider } from "@/components/animations/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://davidbudeli.com"),
  title: "David Budeli | Software Engineer",
  description:
    "David Budeli constrói produtos digitais, infraestrutura de IA, automações e sistemas de alta performance para marcas e operações premium.",
  keywords: [
    "David Budeli",
    "Software Engineer",
    "engenheiro de software",
    "produtos digitais",
    "infraestrutura de IA",
    "automações",
    "Next.js",
    "TypeScript",
    "Hyper Galaxy",
    "HyperAG",
    "HyperPag",
    "fintech",
    "IA",
  ],
  authors: [{ name: "David Budeli" }],
  creator: "David Budeli",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://davidbudeli.com",
    title: "David Budeli | Software Engineer",
    description:
      "Produtos digitais, infraestrutura de IA, automações e sistemas de alta performance.",
    siteName: "David Budeli",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "David Budeli - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "David Budeli | Software Engineer",
    description:
      "Produtos digitais, infraestrutura de IA, automações e sistemas de alta performance.",
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030303",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-bg-0 text-ice font-body antialiased overflow-x-hidden">
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
