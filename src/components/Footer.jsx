'use client'
import {  useCombinedData } from '@/hooks/FetchCollection';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, GithubIcon } from "lucide-react"; 

export default function Footer() {
  const { footer, loading, error } = useCombinedData();
  if (loading) {
    return (
      <div className=" text-white">
        <div className="container mx-auto px-4 pt-12 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="h-6 w-32 bg-gray-600 animate-pulse rounded"></div>
              <div className="space-y-2">
                {Array(3).fill('').map((_, index) => (
                  <div key={index} className="h-4 w-48 bg-gray-600 animate-pulse rounded"></div>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="h-6 w-24 bg-gray-600 animate-pulse rounded mb-4"></div>
              <div className="space-y-2">
                {Array(5).fill('').map((_, index) => (
                  <div key={index} className="h-4 w-32 bg-gray-600 animate-pulse rounded"></div>
                ))}
              </div>
            </div>
            <div>
              <div className="h-6 w-36 bg-gray-600 animate-pulse rounded mb-4"></div>
              <div className="flex gap-4">
                {Array(4).fill('').map((_, index) => (
                  <div key={index} className="h-10 w-10 bg-gray-600 animate-pulse rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8">
          <div className="container mx-auto px-4 py-6">
            <div className="h-4 w-64 bg-gray-600 animate-pulse mx-auto rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) return <div>Error loading header data: {error.message}</div>;

  if (!footer) return <div>No Footer data available</div>;

  const socialIcons = {
    facebook: <Facebook />,
    twitter: <Twitter />,
    instagram: <Instagram />,
    linkedin: <Linkedin />,
    github: <GithubIcon />,
  };

  return (

    <footer className=" text-white">
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{footer?.name}</h2>
            {footer?.contactInfo && (
              <div className="space-y-2 text-gray-300">
                <p className="flex items-center">
                  <Mail className="mr-2" />
                  <a href={`mailto:${footer?.contactInfo?.email}`} className="hover:text-blue-400 transition-colors">
                    {footer?.contactInfo?.email}
                  </a>
                </p>
                <p className="flex items-center">
                  <Phone className="mr-2" />
                  {footer?.contactInfo?.phone}
                </p>
                <p className="flex items-center">
                  <MapPin className="mr-2" />
                  {footer?.contactInfo?.address}
                </p>
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="grid grid-cols-1 gap-4">
              {footer?.navigationItems?.map((item, index) => (
                <a key={index} href={item?.link} className="text-gray-300 hover:text-white transition-colors">
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
                  className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors"
                  aria-label={social?.platform}
                >
                  {socialIcons[social?.platform?.toLowerCase()] || (
                    <img
                      src={social?.icon?.url}
                      alt={social?.platform}
                      className="h-6 w-6"
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
          <p className="text-sm text-gray-400 text-center">
            {footer?.copyrightText} {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
