import React, { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

interface DropdownMenuProps {
  isSigned: boolean | undefined;
  isLoaded: boolean | undefined;
  firstName: string | undefined | null;
}

const DropdownMenu: React.FC<DropdownMenuProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role;

  const links = [
    { linkText: "Orders", linkUrl: "/orders" },
    { linkText: "Returns", linkUrl: "/returns" },
    ...(isAdmin ? [{ linkText: "Admin", linkUrl: "/admin" }] : []),
  ];

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative xl:inline-block hidden text-left">
      {/* Dropdown Toggle Button */}
      <button
        type='button'
        onClick={toggleDropdown}
        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
      >
        Menu
        <svg
          className="w-5 h-5 ml-2 -mr-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          id="dropdown-menu"
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg focus:outline-none"
          role="menu"
          onMouseLeave={closeDropdown}
          aria-label="Dropdown menu"
        >
          <div className="py-1" role="none">
            {links.map((link, index) => (
              <div role="menuitem" key={index}>
                <Link href={link.linkUrl} legacyBehavior>
                  <a
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    onClick={closeDropdown}
                  >
                    {link.linkText}
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
