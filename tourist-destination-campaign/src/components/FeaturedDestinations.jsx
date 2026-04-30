const FeaturedDestinations = ({ destinations, onSelectDestination, setCurrentPage, currency }) => {
  const currencyRates = { USD: 1, EUR: 0.92, GBP: 0.79, ETB: 55 }
  const currencySymbols = { USD: '$', EUR: '€', GBP: '£', ETB: 'Br' }

  const formatPrice = (price) => {
    const rate = currencyRates[currency] || 1
    const symbol = currencySymbols[currency] || '$'
    return `${symbol}${Math.round(price * rate).toLocaleString()}`
  }

  const handleBookNow = (destination) => {
    onSelectDestination(destination)
    setCurrentPage('details')
  }

  const StarIcon = () => (
    <svg className="w-3.5 h-3.5 fill-current text-amber-500" viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  )

  return (
    <section className="py-16 bg-[#f8f7f4]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline gap-4 mb-10">
          <h2 className="text-3xl font-bold text-slate-800">Discover Ethiopia</h2>
          <span className="text-lg text-slate-500 font-light hidden sm:block">Culture, Nature, History & Adventure</span>
          <div className="flex-1 h-px bg-gray-300 self-center"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {destinations.slice(0, 3).map((destination) => (
            <div key={destination._id} className="bg-white shadow hover:shadow-md transition-shadow border border-gray-100 flex flex-col">
              <div className="h-48 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-slate-800 mb-2">{destination.name}</h3>
                
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-slate-600">{destination.duration || '7 Days'} From {formatPrice(destination.price)}</span>
                  <div className="flex items-center gap-1">
                    {/* Person icon */}
                    <svg className="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                    </svg>
                    <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                  </div>
                </div>

                <p className="text-sm text-slate-500 mb-4 line-clamp-2 leading-relaxed flex-1">
                  {destination.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                  <div className="flex space-x-3 text-[#4b5a41]">
                    {/* Hiking person */}
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"/>
                    </svg>
                    {/* Compass */}
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z"/>
                    </svg>
                    {/* Camera */}
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 15.2c1.77 0 3.2-1.43 3.2-3.2S13.77 8.8 12 8.8 8.8 10.23 8.8 12s1.43 3.2 3.2 3.2zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/>
                    </svg>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        onSelectDestination(destination)
                        setCurrentPage('service-selection')
                      }}
                      className="bg-green-600 text-white px-4 py-1.5 text-sm font-bold hover:bg-green-700 transition-colors rounded shadow-sm shadow-green-100"
                    >
                      Book Now
                    </button>
                    <button
                      onClick={() => {
                        onSelectDestination(destination)
                        setCurrentPage('details')
                      }}
                      className="bg-[#4b5a41] text-white px-4 py-1.5 text-sm font-medium hover:bg-[#3d4a35] transition-colors rounded"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setCurrentPage('explorer')}
            className="bg-[#4b5a41] text-white px-8 py-2 font-medium hover:bg-[#3d4a35] transition-colors inline-flex items-center"
          >
            View All Tours
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedDestinations