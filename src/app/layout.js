import './globals.css'
import { Inter } from 'next/font/google'
import Header from '../components/Header';
import { LanguageProvider } from '../context/LanguageContext';

const inter = Inter({ subsets: ['latin'] })

const title = 'Luis Felipe Cadena — AI Engineer & Systems Architect';
const description = 'Luis Felipe Cadena Cortés — AI Engineer building intelligent systems, secure architectures, and applied software. Systems Engineering @ ICESI, based in Cali, Colombia.';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://luisfelipecadena.dev'),
  title,
  description,
  keywords: 'Luis Felipe Cadena, AI Engineer, AI Engineering, LLM, RAG, Cybersecurity, Software Architecture, Ingeniero de Software, ICESI, IEEE, Spring Boot, Django, Next.js, Colombia, Cali',
  authors: [{ name: 'Luis Felipe Cadena Cortés' }],
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
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <Header />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
