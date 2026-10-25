import { Bricolage_Grotesque, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import Header from '@/components/Header';
import Cursor from '@/components/Cursor';
import './globals.css';

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const TITLE = 'Banuka Nanayakkara — QA Engineer & Software Engineer';
const DESC =
  'Portfolio of Banuka Nanayakkara — Associate QA Engineer at AtLink Communications and Software Engineering graduate of the University of Westminster. Test automation, machine learning, computer vision and full-stack development.';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://banukadev.pages.dev'),
  title: TITLE,
  description: DESC,
  authors: [{ name: 'Banuka Nanayakkara' }],
  icons: { icon: '/assets/favicon.svg' },
  openGraph: {
    title: TITLE,
    description: 'Building reliable software with 2+ years of experience in test automation and AI/ML.',
    type: 'website',
    images: [{ url: '/assets/social-preview.png', width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: 'Building reliable software with 2+ years of experience in test automation and AI/ML.',
    images: ['/assets/social-preview.png'],
  },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f2eee6' },
    { media: '(prefers-color-scheme: dark)', color: '#111110' },
  ],
};

// Runs before paint so the saved theme never flashes.
const THEME_INIT = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}document.documentElement.classList.add('js')})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to main content</a>
        <Header />
        {children}
        <Cursor />
      </body>
    </html>
  );
}
