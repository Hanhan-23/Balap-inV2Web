import { Instrument_Sans } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
})

export const metadata = {
  title: 'BALAP-IN',
  description: 'Aplikasi pelaporan infrastruktur',
  icons: { icon: '/logo.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={instrumentSans.variable}
      suppressHydrationWarning
    >
      <body className="antialiased font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
