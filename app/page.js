import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./dashboard/_components/Header";
import { AtomIcon, Edit, Share2 } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      {/* Background Image (optional) */}
      {/* <Image src={'/grid.svg'} className="absolute z-[-10] w-full" width={1200} height={300} /> */}
      
      <Header />

      {/* Hero Section */}
      <section className="z-50">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <a href="#" className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert">
            <span className="text-xs bg-primary rounded-full text-white px-4 py-1.5 mr-3">New</span> 
            <span className="text-sm font-medium">All new Apps</span>
            <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
          </a>

          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Welcome to InterVeda</h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Double your chances of landing that job offer with our AI-powered interview prep.
          </p>

          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <a href="/dashboard" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-primary focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
              Get Started
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </a>

            <a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
              <svg className="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
              </svg>
              How to use
            </a>
          </div>

          {/* FEATURED IN Section */}
          <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
            <span className="font-semibold text-gray-400 uppercase">FEATURED IN</span>
            <div className="flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between">
              <a href="#" className="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
                <svg className="h-8" viewBox="0 0 132 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M39.4555 5.17846C..." />
                </svg>
              </a>
              <a href="#" className="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
                <svg className="h-11" viewBox="0 0 208 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M42.7714 20.729C..." />
                </svg>
              </a>
            </div>
          </div>
          {/* END FEATURED IN Section */}
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-8 bg-gray-50 dark:bg-gray-900 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h2 className="font-bold text-3xl dark:text-white">How it Works?</h2>
        <h2 className="text-md text-gray-500 dark:text-gray-400">Give mock interviews in just 3 easy steps</h2>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: <AtomIcon className='h-8 w-8 text-indigo-600 dark:text-indigo-400' />, title: "Write a prompt for your form" },
            { icon: <Edit className='h-8 w-8 text-indigo-600 dark:text-indigo-400' />, title: "Edit Your Form" },
            { icon: <Share2 className='h-8 w-8 text-indigo-600 dark:text-indigo-400' />, title: "Share & Start Accepting Responses" }
          ].map((item, index) => (
            <a key={index} className="block rounded-xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10">
              {item.icon}
              <h2 className="mt-4 text-xl font-bold text-black dark:text-white">{item.title}</h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
        &copy; 2025 InterVeda. All rights reserved.
      </footer>
    </div>
  );
}
