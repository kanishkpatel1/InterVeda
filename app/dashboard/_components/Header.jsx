"use client";
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

function Header() {
  const path = usePathname();
  const [darkMode, setDarkMode] = useState(false);

  // Only run dark mode effects client-side after the initial render
  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(storedDarkMode);

    if (storedDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Handle dark mode toggle and reload
  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());

    // Apply the dark mode class to document after dark mode state changes
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Reload the page to apply changes
    window.location.reload();
  };

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm dark:bg-gray-800 dark:text-white">
      <Image src={'/logo.png'} width={160} height={100} alt="logo" />
      <ul className="hidden md:flex gap-6">
        <Link href={"/"}>
          <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/' && 'text-primary font-bold'}`}>
            Home
          </li>
        </Link>
        <Link href={"/dashboard"}>
          <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard' && 'text-primary font-bold'}`}>
            Dashboard
          </li>
        </Link>
        <Link href={"/dashboard/upgrade"}>
          <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/upgrade' && 'text-primary font-bold'}`}>
            Upgrade
          </li>
        </Link>
        <Link href={"/how-it-works"}>
          <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/how-it-works' && 'text-primary font-bold'}`}>
            How It Works
          </li>
        </Link>
        <Link href={"/about-us"}>
          <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/about-us' && 'text-primary font-bold'}`}>
            About Us
          </li>
        </Link>
      </ul>
      <div className="flex items-center gap-4">
        <button
          onClick={handleDarkModeToggle}
          className="p-2 rounded bg-gray-200 dark:bg-gray-700 dark:text-white transition"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
