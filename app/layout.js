import { VT323, IBM_Plex_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SiteInteractions from '@/components/SiteInteractions';
import './globals.css';

const vt323 = VT323({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-vt323',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://banukadev.pages.dev'),
  title: 'Banuka Nanayakkara — Associate QA Engineer & Software Engineering Undergraduate',
  description:
    'Portfolio of Banuka Nanayakkara — Associate QA Engineer at AtLink Communications and Software Engineering Undergraduate at University of Westminster. Specializing in Test Automation, Machine Learning, Computer Vision, and Full-Stack Development.',
  authors: [{ name: 'Banuka Nanayakkara' }],
  icons: { icon: '/assets/favicon.svg' },
  openGraph: {
    title: 'Banuka Nanayakkara — Associate QA Engineer & Software Engineering Undergraduate',
    description: 'Building high-quality, reliable software with 2+ years industry experience in test automation and AI/ML.',
    type: 'website',
    images: [{ url: '/assets/social-preview.png', width: 1200, height: 630, alt: 'Banuka Nanayakkara — Software Engineer & QA Specialist' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Banuka Nanayakkara — Associate QA Engineer & Software Engineering Undergraduate',
    description: 'Building high-quality, reliable software with 2+ years industry experience in test automation and AI/ML.',
    images: ['/assets/social-preview.png'],
  },
};

export const viewport = {
  themeColor: '#0a0a0a',
};

const THEME_INIT_SCRIPT = `
  (function () {
    try {
      var stored = localStorage.getItem('phosphor');
      if (stored === 'white') {
        document.documentElement.removeAttribute('data-phosphor');
      } else {
        document.documentElement.setAttribute('data-phosphor', 'green');
      }
    } catch (e) {
      document.documentElement.setAttribute('data-phosphor', 'green');
    }
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${vt323.variable} ${ibmPlexMono.variable}`} suppressHydrationWarning data-phosphor="green">
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <div className="crt-scanlines" aria-hidden="true" />
        <div className="crt-vignette" aria-hidden="true" />
        <Navbar />
        {children}
        <Footer />
        <SiteInteractions />
      </body>
    </html>
  );
}
