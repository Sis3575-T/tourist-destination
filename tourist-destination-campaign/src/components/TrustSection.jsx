import React from 'react'

const TrustSection = () => {
  const trustFeatures = [
    {
      icon: '🔒',
      title: 'Secure Payments',
      description: 'SSL encrypted transactions with bank-level security'
    },
    {
      icon: '⭐',
      title: '4.9/5 Rating',
      description: 'Over 10,000 satisfied travelers worldwide'
    },
    {
      icon: '🛡️',
      title: '24/7 Support',
      description: 'Round-the-clock assistance in multiple languages'
    },
    {
      icon: '✅',
      title: 'Verified Partners',
      description: 'All tours operated by licensed, insured companies'
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Ethiopia Travel Hub?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of travelers who trust us for their Ethiopian adventures
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustFeatures.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-8 bg-gray-50 px-8 py-4 rounded-full">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">★★★★★</span>
              <span className="text-gray-700 font-semibold">Trustpilot</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-blue-600 font-bold">TripAdvisor</span>
              <span className="text-yellow-500">★★★★★</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-600 font-bold">Google Reviews</span>
              <span className="text-yellow-500">★★★★★</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustSection