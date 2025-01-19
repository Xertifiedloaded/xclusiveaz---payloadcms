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
    <div className={`${inter.className} ${fraunces.className} ${manrope.className}`}>
    <Header />
        {children}
        <Footer />
    </div>
  </RootLayout>
)

export default Layout
