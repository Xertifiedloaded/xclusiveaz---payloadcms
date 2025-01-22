'use client'
import { useCombinedData } from '@/hooks/FetchCollection'
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  GithubIcon,
} from 'lucide-react'
import { FaDiscord, FaTiktok, FaTwitch } from 'react-icons/fa'
export default function Footer() {
  const { footer, loading, error } = useCombinedData()
  if (loading) {
    return (
      <footer className="bg-gray-50 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
            <div className="space-y-4">
              <div className="h-8 w-32 bg-gray-200 animate-pulse rounded-md"></div>
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-4 w-full max-w-[200px] bg-gray-200 animate-pulse rounded"
                  ></div>
                ))}
              </div>
            </div>

            {[...Array(2)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="h-6 w-24 bg-gray-200 animate-pulse rounded"></div>
                <div className="space-y-3">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
                  ))}
                </div>
              </div>
            ))}

            <div className="space-y-4">
              <div className="h-6 w-40 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-12 w-full bg-gray-200 animate-pulse rounded-lg"></div>

              <div className="flex gap-3 mt-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-10 w-10 bg-gray-200 animate-pulse rounded-full"></div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="h-4 w-64 bg-gray-200 animate-pulse rounded"></div>
              <div className="flex space-x-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  if (error) return <div>Error loading header data: {error.message}</div>

  if (!footer) return <div>No Footer data available</div>

  const socialIcons = {
    facebook: <Facebook />,
    twitter: <Twitter />,
    instagram: <Instagram />,
    linkedin: <Linkedin />,
    github: <GithubIcon />,
    tiktok: <FaTiktok size={20} />,
  }

  return (
    <footer className=" text-white">
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{footer?.name}</h2>
            {footer?.contactInfo && (
              <div className="space-y-2 text-gray-300">
                <p className="flex items-center">
                  <a
                    href={`mailto:${footer?.contactInfo?.email}`}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {footer?.contactInfo?.email}
                  </a>
                </p>
                <p className="flex items-center">{footer?.contactInfo?.phone}</p>
                <p className="flex items-center">{footer?.contactInfo?.address}</p>
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="grid grid-cols-1 gap-4">
              {footer?.navigationItems?.map((item, index) => (
                <a
                  key={index}
                  href={item?.link}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {item?.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex flex-wrap gap-4">
              {footer?.socialLinks?.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="bg-gray-700 p-2 flex items-center justify-center rounded-full hover:bg-gray-600 transition-colors"
                  aria-label={social?.platform}
                >
                  {socialIcons[social?.platform?.toLowerCase()] || (
                    <img
                      src={social?.icon?.url}
                      alt={social?.platform}
                      className="h-6 w-6 rounded-full"
                    />
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8">
        <div className="container mx-auto px-4 py-6">
          <p className="text-lg text-gray-400 text-center">
            {footer?.copyrightText ? (
              <>
                <span className='capitalize'>{footer?.copyrightText}</span> © {new Date().getFullYear()} All rights reserved.
                <span className="block mt-2 text-sm text-gray-500">
                  Designed and Developed by Makinde Olaitan
                </span>
              </>
            ) : (
              <>
                © {new Date().getFullYear()} All rights reserved.
                <span className="block mt-2 text-sm text-gray-500">
                  Designed and Developed by Makinde Olaitan
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </footer>
  )
}
