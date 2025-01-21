import config from '@payload-config'
import '@payloadcms/next/css'
import type { ServerFunctionClient } from 'payload'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import React from 'react'
import { Fraunces, Inter, Manrope } from 'next/font/google'
import { importMap } from './admin/importMap.js'
import './custom.scss'
import './globals.css'
import Header from '@/components/Header.jsx'
import Footer from '@/components/Footer.jsx'
import { Toaster } from '../../components/ui/toaster'
import { CartProvider } from '../../context/CartContext.js'


export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: 'no',
  themeColor: 'black'
}
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

const fraunces = Fraunces({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
})

const manrope = Manrope({
  weight: ['200', '300', '400', '600', '700', '800'],
  subsets: ['latin'],
})

export const metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  title: {
    default: 'Xclusive AZ',
  },
  description: 'Discover our amazing products and exclusive deals',
  keywords: ['xclusive', 'azeemat', 'xclusive','az'],
  openGraph: {
    title: 'Xclusive AZ',
    description: 'Discover our amazing products and exclusive deals',
    url: 'https://yourdomain.com',
    siteName: 'Xclusive AZ',
    images: [
      {
        url: 'https://xclusiveaz.vercel.app/api/media/file/xclusive.jpg',
        width: 1200,
        height: 630,
        alt: 'Xclusive AZ'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Xclusive AZ',
    description: 'Discover our amazing products and exclusive deals',
    creator: '@zeemah_x',
    images: ['https://xclusiveaz.vercel.app/api/media/file/xclusive.jpg'],
  },
  icons: {
    icon: '/xclusive.jpg',
    apple: '/xclusive.jpg',
    shortcut: '/xclusive.jpg'
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    <CartProvider>
      <div className={`${inter.className} ${fraunces.className} ${manrope.className}`}>
        <Header />
        {children}
        <Footer />
      </div>
    </CartProvider>
    <Toaster/>
  </RootLayout>
)

export default Layout