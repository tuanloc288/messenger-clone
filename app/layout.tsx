import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import ThemeProvider from './components/Provider'
import ToasterContext from './context/ToasterContext'
import AuthContext from './context/AuthContext'
import ActiveStatus from './components/ActiveStatus'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Messenger',
  description: 'Messenger clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body className={inter.className}>
        <AuthContext>
          <ThemeProvider>
            <ToasterContext />
            <ActiveStatus/>
            {children}
          </ThemeProvider>
        </AuthContext>
      </body>
    </html>
  )
}
