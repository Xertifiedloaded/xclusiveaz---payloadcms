'use client'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {  useCombinedData } from '@/hooks/FetchCollection';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, GithubIcon } from "lucide-react"; 

export default function Footer() {
  const { footer, loading, error } = useCombinedData();
  if (loading) return <div>Loading...</div>; 
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

    <footer className="bg-gray-800 text-white">
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

      <div className="md:hidden px-4 py-4 border-t border-gray-700">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full">
              Quick Links
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[calc(100vw-2rem)] mx-4">
            {footer?.navigationItems?.map((item, index) => (
              <DropdownMenuItem key={index} asChild>
                <a href={item?.link} className="w-full">
                  {item.label}
                </a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="border-t border-gray-700 mt-8">
        <div className="container mx-auto px-4 py-6">
          <p className="text-sm text-gray-400 text-center">
            {footer?.copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
}
