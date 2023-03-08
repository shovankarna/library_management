import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 fixed bottom-0 w-full">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center text-gray-400 text-sm">
          <p className="inline-flex items-center">
            &copy; 2023 LibManager. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer