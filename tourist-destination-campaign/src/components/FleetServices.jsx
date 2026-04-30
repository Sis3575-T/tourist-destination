const FleetServices = ({ setCurrentPage, onSelectService }) => {
  const fleets = [
    {
      id: 1,
      name: "4x4 SUV for off-road Adventures",
      description: "Agile 4x4 vehicles built for rugged terrains. Perfect for Danakil Depression and Omo Valley expeditions.",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&fit=crop",
      rating: 4.8,
      reviews: "Getpoint Site"
    },
    {
      id: 2,
      name: "Minibuses for Group Travel",
      description: "Comfortable air-conditioned minibuses with spacious seating, ideal for small groups and family tours.",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&fit=crop",
      rating: 4.7,
      reviews: "Getpoint Site"
    },
    {
      id: 3,
      name: "Luxury Coaches for Long Journeys",
      description: "Spacious luxury coaches equipped with modern amenities for long-distance city-to-city travel.",
      image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&fit=crop",
      rating: 4.9,
      reviews: "On aparat Site"
    }
  ];

  const StarIcon = ({ filled }) => (
    <svg className={`w-3.5 h-3.5 fill-current ${filled ? 'text-amber-500' : 'text-gray-300'}`} viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  )

  return (
    <section className="py-16 bg-[#ebe8e0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline gap-4 mb-10">
          <h2 className="text-3xl font-bold text-slate-800">Our Fleet & Services</h2>
          <span className="text-lg text-slate-500 font-light hidden sm:block">Travel in Comfort & Safety</span>
          <div className="flex-1 h-px bg-gray-300 self-center"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fleets.map((fleet) => (
            <div key={fleet.id} className="bg-white shadow hover:shadow-md transition-shadow border border-gray-100 flex flex-col">
              <div className="h-48 overflow-hidden">
                <img
                  src={fleet.image}
                  alt={fleet.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-slate-800 mb-2 leading-snug">{fleet.name}</h3>
                <p className="text-sm text-slate-500 mb-4 line-clamp-3 leading-relaxed flex-1">
                  {fleet.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      {/* Person icon */}
                      <svg className="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-sm font-bold text-slate-700">{fleet.rating}</span>
                      <StarIcon filled /><StarIcon filled /><StarIcon filled /><StarIcon filled />
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <svg className="w-3.5 h-3.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-xs text-slate-400">{fleet.reviews}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (onSelectService) onSelectService(fleet)
                      if (setCurrentPage) setCurrentPage('service-details')
                    }}
                    className="bg-[#4b5a41] text-white px-5 py-1.5 text-sm font-medium hover:bg-[#3d4a35] transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setCurrentPage && setCurrentPage('explorer')}
            className="bg-[#4b5a41] text-white px-8 py-2 font-medium hover:bg-[#3d4a35] transition-colors inline-flex items-center"
          >
            View All Vehicles
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default FleetServices;
