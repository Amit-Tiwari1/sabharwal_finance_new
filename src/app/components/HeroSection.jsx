import React from 'react'
import Link from "next/link";
import AnimatedButton from './AnimatedButton';

export default function HeroSection() {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between px-6 py-20 sm:py-32 lg:py-48">
      {/* Left: Company Name */}
      <div className="lg:w-1/2 text-center lg:text-left">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
          Welcome to <span className="text-teal-500">Sabhalwal Finance</span>
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto lg:mx-0 mb-8">
          Explore a world of finance and innovation. Manage your goals with ease and efficiency.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/about">
            <AnimatedButton label="Learn More" />
          </Link >
          <Link href="/contact">
          <AnimatedButton label="Contact Us" />
          </Link>
        </div>
      </div>

      {/* Right: New Schemes */}
      <div className="lg:w-1/2 bg-gray-800 p-6 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-teal-500 mb-4">New Investment Scheme</h2>
        <p className="text-gray-300">Earn up to 12% annual returns with our latest investment plan.</p>
        <button className="mt-4 px-6 py-3 bg-teal-500 text-black font-semibold rounded-lg">
          Explore Now
        </button>
      </div>
    </section>
  )
}
