import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
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
  title: "David Budeli - Arquitetando o Infinito",
  description:
    "Engenheiro de software de elite, fundador de ecossistema tecnológico e estrategista digital. Desenvolvendo ecossistemas digitais ultra-premium.",
  keywords: [
    "David Budeli",
    "engenheiro de software",
    "Next.js",
    "TypeScript",
    "Hyper Galaxy",
    "HyperAG",
    "HyperPag",
    "fintech",
    "automação",
    "IA",
  ],
  authors: [{ name: "David Budeli" }],
  creator: "David Budeli",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://davidbudeli.com",
    title: "David Budeli - Arquitetando o Infinito",
    description:
      "Engenheiro de software de elite e fundador de ecossistema tecnológico.",
    siteName: "David Budeli",
  },
  twitter: {
    card: "summary_large_image",
    title: "David Budeli - Arquitetando o Infinito",
    description:
      "Engenheiro de software de elite e fundador de ecossistema tecnológico.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
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
