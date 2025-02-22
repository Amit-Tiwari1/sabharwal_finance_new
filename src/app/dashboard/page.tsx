import React from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import MainDashboard from './components/MainDashboard'


export default function Dashboard() {
  return (
<main className="text-gray-800 font-inter">
    {/* <!--sidenav --> */}
    {/* <Sidebar/> */}
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay"></div>
    {/* <!-- end sidenav --> */}

    <main className="w-full   bg-gray-200 min-h-screen transition-all main">
        {/* <!-- navbar --> */}
       {/* <Navbar /> */}
        {/* <!-- end navbar --> */}

      {/* <!-- Content --> */}
     <MainDashboard />
      {/* <!-- End Content --> */}
    </main>
</main>
  )}



