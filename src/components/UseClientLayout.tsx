'use client'
import { usePathname } from 'next/navigation'
import { Fraunces, Inter, Manrope } from 'next/font/google'
import Header from './Header'
import Footer from './Footer'
const fraunces = Fraunces({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
})

const manrope = Manrope({
  weight: ['200', '300', '400', '600', '700', '800'],
  subsets: ['latin'],
})
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})
const  UseClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const adminPaths = ['/admin', '/admin/login', '/admin/create']
  const shouldHideHeaderFooter = adminPaths.includes(pathname || '')

  return (
    <div className={`${inter.className} ${fraunces.className} ${manrope.className}`}>
      {!shouldHideHeaderFooter && <Header />}
      {children}
      {!shouldHideHeaderFooter && <Footer />}
    </div>
  )
}
export default UseClientLayout