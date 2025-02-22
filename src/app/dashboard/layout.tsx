import React from 'react'
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

export default async function RestaurantLayout({
    children,
    params
  }: Readonly<{
    children: React.ReactNode,params: { slug: string }
    ;
  }>) {
  return (
    <>
      <main className="text-gray-800 font-inter">
      <Sidebar/>
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay"></div>
    <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-200 min-h-screen transition-all main">

      <Navbar />
      {children}
      </main>
      </main>
      </>
  )
}
