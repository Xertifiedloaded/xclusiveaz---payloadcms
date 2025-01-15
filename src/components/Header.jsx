'use client'
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; 
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { fetchHeader } from "@/hooks/FetchCollection";

export default function Header() {
  const [header, setHeader] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await fetchHeader();
      setHeader(data);
    })();
  }, []);

  if (!header) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <header className="w-full z-50 bg-black top-0 l-0 r-0  p-4 text-lg    text-white  ">
      <div className="container  mx-auto flex items-center justify-between">
        <div className="flex items-center">
          {header.logo && (
            <img src={header.logo.url} alt="Logo" className="h-10 w-auto" />
          )}
        </div>

        <nav className="hidden md:flex gap-6">
          {header.navigationItems.map((item, index) => (
            <div key={index} className="relative group">
              <a href={item.link} className="text-white hover:text-blue-600">
                {item.label}
              </a>
              {item.subItems && item.subItems.length > 0 && (
                <div className="absolute left-0 mt-2 hidden w-48 bg-white border rounded shadow-md group-hover:block">
                  {item.subItems.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href={subItem.link}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {subItem.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {header.ctaButton && (
          <Button className="text-black bg-white" asChild>
            <a href={header.ctaButton.link} className="">
              {header.ctaButton.text}
            </a>
          </Button>
        )}


        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="md:hidden">
              Menu
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {header.navigationItems.map((item, index) => (
              <DropdownMenuItem key={index} asChild>
                <a href={item.link}>{item.label}</a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
