import './globals.css'
import { Silkscreen, Plus_Jakarta_Sans, Space_Mono, JetBrains_Mono } from 'next/font/google'
import Header from '../components/Header';
import { LanguageProvider } from '../context/LanguageContext';

const silkscreen = Silkscreen({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-silkscreen',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-space-mono',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const title = 'Luis Felipe Cadena - AI Engineer & Systems Architect';
const description = 'Luis Felipe Cadena Cortés - AI Engineer building intelligent systems, secure architectures, and applied software. Systems Engineering @ ICESI, based in Cali, Colombia.';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://luisfelipecadena.dev'),
  title,
  description,
  keywords: 'Luis Felipe Cadena, AI Engineer, AI Engineering, LLM, RAG, Cybersecurity, Software Architecture, Ingeniero de Software, ICESI, IEEE, Spring Boot, Django, Next.js, Colombia, Cali',
  authors: [{ name: 'Luis Felipe Cadena Cortés' }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title,
    description,
    type: 'website',
    images: ['/images/BannerLinkedin.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/BannerLinkedin.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${silkscreen.variable} ${spaceMono.variable} ${jetbrainsMono.variable}`}>
      <body className={`${plusJakartaSans.variable} ${silkscreen.variable} ${spaceMono.variable} ${jetbrainsMono.variable}`}>
        <LanguageProvider>
          <Header />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}

