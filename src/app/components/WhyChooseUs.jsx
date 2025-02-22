import React from 'react'
const features = [
    { icon: "📈", title: "Analytics", desc: "Gain insights with advanced analytics tools." },
    { icon: "🔒", title: "Security", desc: "Your data is protected with top security measures." },
    { icon: "🌐", title: "Global Access", desc: "Access from anywhere in the world, anytime." },
  ];
export default function WhyChooseUs() {
  return (
    <section className="px-6 py-16 sm:py-24 lg:py-32 bg-gray-900">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {features.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-teal-500 text-black rounded-full">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
            <p className="text-gray-400">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
