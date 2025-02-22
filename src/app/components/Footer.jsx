import React from 'react'

export default function Footer() {
  return (
    <footer className="px-6 py-8 bg-gray-800 text-center">
      <p className="text-sm text-gray-400">
        © {new Date().getFullYear()} Sabhalwal Finance. All Rights Reserved.
      </p>
    </footer>
  )
}
