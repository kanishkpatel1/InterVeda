import React from 'react'
import Header from './_components/Header'

function DashboardLayout({ children }) {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <div className="mx-5 md:mx-20 lg:mx-36">
        {children}
      </div>
      <footer className="py-6 text-center bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
        &copy; 2025 InterVeda. All rights reserved.
      </footer>
    </div>
  );
}

export default DashboardLayout;
