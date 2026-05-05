import React from 'react'

const AboutDetail = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
         <img
           src="/destinations/semien_mountain.jpg"
           alt="Ethiopian Highlands"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">About Ethiopian Tourist Destination</h1>
            <p className="text-xl text-gray-200">Your Premier Partner for Authentic Horn of Africa Experiences</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <button
          onClick={() => setCurrentPage('home')}
          className="mb-12 flex items-center text-green-700 hover:text-green-800 transition-colors font-semibold"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </button>

        <div className="prose prose-lg max-w-none text-gray-600">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ethiopia's Leading Tour Operator</h2>
          <p className="mb-6">
            Ethiopian Tourist Destination is a premier travel management company dedicated to showcasing the unparalleled beauty, rich history, and vibrant cultures of Ethiopia and the Horn of Africa. Established with a deep-rooted love for our homeland, we have spent over a decade perfecting the art of the African expedition.
          </p>
          <p className="mb-6">
            From the mystical rock-hewn churches of Lalibela to the futuristic architecture of Asmara and the otherworldly landscapes of the Danakil Depression, we provide travelers with exclusive access to the most extraordinary corners of the region. Our journey began with a simple mission: to provide world-class travel services while fostering a profound respect for local heritage and environment.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p>To provide immersive, safe, and authentic travel experiences that bridge cultures while supporting local communities and preserving the natural beauty of the Horn of Africa.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p>To become the leading sustainable travel partner in East Africa, recognized for our commitment to heritage preservation and exceptional customer service.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Expertise You Can Trust</h2>
          <p className="mb-6">
            Our team consists of more than 50 professional guides, drivers, and logistical experts. Every guide is licensed by the Ethiopian Ministry of Culture and Tourism and possesses specialized knowledge in subjects ranging from archaeology and religious history to wildlife biology.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Sustainable Tourism</h2>
          <p className="mb-8">
            We believe that travel should be a force for good. We partner with local village cooperatives in the Omo Valley and Simien Mountains to ensure that tourism revenue directly benefits the families who call these places home. We strictly follow "Leave No Trace" principles on all our treks and expeditions.
          </p>

          <div className="relative rounded-2xl overflow-hidden mb-12 shadow-xl">
             <img 
               src="/destinations/lalibela.jpg" 
               alt="Lalibela Church" 
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <p className="text-white italic text-lg font-medium">"We don't just show you the sights; we reveal the stories that make Ethiopia the soul of Africa."</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Travel With Us?</h2>
          <ul className="space-y-4 mb-12 list-none p-0">
            {[
              'Tailor-made itineraries based on your interests and budget.',
              'A modern, well-maintained fleet of 4x4 vehicles and luxury coaches.',
              'Round-the-clock support from our operations center in Addis Ababa.',
              'Small group sizes for a more intimate and personalized experience.',
              'Unmatched access to remote locations and cultural festivals.',
            ].map((item, i) => (
              <li key={i} className="flex items-center bg-green-50 p-4 rounded-xl border border-green-100">
                <svg className="w-6 h-6 text-green-600 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-800 font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AboutDetail
