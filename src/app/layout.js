import StyledComponentsRegistry from '@/lib/registry';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import GlobalStyles from '@/styles/GlobalStyles';

export const metadata = {
    metadataBase: new URL('https://davidbudeli.com'),
    title: 'David Budeli — Produtos Digitais, IA e Automação',
    description: 'David Budeli cria sites, sistemas, automações e experiências digitais com foco em performance, inteligência artificial e conversão.',
    keywords: ['David Budeli', 'software engineer', 'produtos digitais', 'inteligência artificial', 'automação', 'Next.js', 'TypeScript'],
    authors: [{ name: 'David Budeli' }],
    creator: 'David Budeli',
    openGraph: {
        title: 'David Budeli — Produtos Digitais, IA e Automação',
        description: 'Sites, sistemas, IA aplicada e automações para marcas que precisam vender, operar e crescer.',
        type: 'website',
        url: 'https://davidbudeli.com',
        siteName: 'David Budeli',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" dir="ltr">
            <head>
                {/* DNS prefetch for faster font domain resolution */}
                <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
                <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                {/*
                  Next.js App Router automatically optimizes Google Fonts at build time.
                  Using raw `<link rel="stylesheet">` allows Next.js to inline the CSS,
                  completely eliminating FCP/LCP network delays natively.
                */}
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
                />
            </head>
            <body>
                <StyledComponentsRegistry>
                    <ThemeProvider>
                        <LanguageProvider>
                            <GlobalStyles />
                            {children}
                        </LanguageProvider>
                    </ThemeProvider>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
