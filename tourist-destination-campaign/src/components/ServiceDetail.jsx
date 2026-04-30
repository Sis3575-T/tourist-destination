import React from 'react'

const ServiceDetail = ({ service, setCurrentPage }) => {
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h2>
          <button
            onClick={() => setCurrentPage('home')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    )
  }

  const features = {
    1: [
      'Heavy-duty 4WD system for extreme terrains',
      'High ground clearance for deep river crossings',
      'Reinforced suspension and off-road tires',
      'Rooftop luggage carrier and spare fuel tanks',
      'Experienced off-road driver-guide included',
      'Air conditioning and charging ports',
    ],
    2: [
      'Comfortable seating for up to 12-15 passengers',
      'Dual-zone climate control/Air conditioning',
      'Large windows for scenic viewing',
      'Ample luggage space in the rear or on top',
      'Ideal for group sightseeing and airport transfers',
      'PA system for guide announcements',
    ],
    3: [
      'Reclining ergonomic seats with extra legroom',
      'Full climate control and on-board restroom',
      'Multimedia entertainment system',
      'On-board Wi-Fi (subject to network coverage)',
      'Large under-floor luggage compartments',
      'Refreshments and professional service crew',
    ],
  }

  const serviceFeatures = features[service.id] || []

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <button
              onClick={() => setCurrentPage('home')}
              className="mb-6 flex items-center text-white hover:text-green-400 transition-colors bg-black/20 backdrop-blur-md px-4 py-2 rounded-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Services
            </button>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{service.name}</h1>
            <p className="text-xl text-gray-200">Travel in Style, Comfort, and Safety</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Service Overview</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {service.description} Our {service.name} service is designed to provide the ultimate travel experience in the Horn of Africa. Whether you are traversing the rugged salt flats of Danakil or the paved highways between historic cities, we prioritize your comfort and safety above all else.
            </p>

            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features & Amenities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {serviceFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start bg-gray-50 p-4 rounded-lg">
                    <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100">
              <h3 className="text-2xl font-bold text-emerald-900 mb-4">Why Choose Our Fleet?</h3>
              <p className="text-emerald-800 mb-6 leading-relaxed">
                We maintain our own fleet with a dedicated maintenance team. Every vehicle undergoes a rigorous safety check before each expedition. Our drivers are not just operators; they are experienced professionals with deep knowledge of local routes and cultures.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-emerald-700 bg-white px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                  24/7 Support
                </div>
                <div className="flex items-center text-emerald-700 bg-white px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                  Professional Drivers
                </div>
                <div className="flex items-center text-emerald-700 bg-white px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                  Fully Insured
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar / CTA */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg sticky top-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-500">Service Rating</span>
                  <div className="flex items-center">
                    <span className="text-xl font-bold text-gray-900 mr-2">{service.rating}</span>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 text-center mb-6">{service.reviews} Verified Reviews</div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setCurrentPage('explorer')}
                  className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all transform hover:scale-[1.02] shadow-lg shadow-green-200"
                >
                  Book This Vehicle
                </button>
                <button
                  onClick={() => setCurrentPage('explorer')}
                  className="w-full bg-white text-gray-900 border-2 border-gray-200 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all"
                >
                  Contact For Quote
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <h4 className="font-bold text-gray-900 mb-4 italic">"The most reliable transport we found in Ethiopia. The driver was a true expert on the mountain roads."</h4>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 overflow-hidden">
                    <img src="https://i.pravatar.cc/150?u=4" alt="Reviewer" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">David Wilson</div>
                    <div className="text-xs text-gray-500">Adventure Traveler</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceDetail
