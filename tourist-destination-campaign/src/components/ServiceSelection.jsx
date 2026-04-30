import React from 'react'

const ServiceSelection = ({ destination, onSelectService, setCurrentPage }) => {
  const fleets = [
    {
      id: 1,
      name: "4x4 SUV Adventure",
      description: "Best for rugged terrains. Includes expert off-road driver.",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&fit=crop",
      pricePerDay: 150,
      icon: "🏔️"
    },
    {
      id: 2,
      name: "Standard Minibus",
      description: "Comfortable for groups. AC and spacious seating.",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&fit=crop",
      pricePerDay: 100,
      icon: "🚐"
    },
    {
      id: 3,
      name: "Luxury Coach",
      description: "Premium long-distance travel with full amenities.",
      image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&fit=crop",
      pricePerDay: 250,
      icon: "🚌"
    }
  ];

  const getServicePrice = (fleet, dest) => {
    if (!dest) return fleet.pricePerDay;
    
    // Logic: Harder terrains or longer distances increase the service price
    // These keys now match the exact names in backend/data/destinations.js
    const destinationStats = {
      'Danakil Depression Expedition': { multiplier: 1.8, label: 'Extreme Off-road & Remote', distance: 'Low Accessibility' },
      'Simien Mountains Trek': { multiplier: 1.6, label: 'High Altitude & Rugged', distance: 'Difficult Terrain' },
      'Omo Valley Cultural Encounter': { multiplier: 1.5, label: 'Remote Southern Region', distance: 'Long Distance' },
      'Lalibela Rock-Hewn Churches': { multiplier: 1.3, label: 'Mountainous Road Access', distance: 'Medium Distance' },
      'Gondar Castles & Fasil Ghebbi': { multiplier: 1.1, label: 'Highland Highway', distance: 'Standard Distance' },
      'Axum Historical Route': { multiplier: 1.2, label: 'Northern Historic Circuit', distance: 'Extended Distance' },
      'Blue Nile Falls Escape': { multiplier: 1.1, label: 'Highland Highway', distance: 'Standard Distance' }
    };

    // Try exact match first, then partial match
    let stats = destinationStats[dest.name];
    
    if (!stats) {
      const key = Object.keys(destinationStats).find(k => dest.name.includes(k.split(' ')[0]));
      stats = key ? destinationStats[key] : { multiplier: 1.0, label: 'Standard Route', distance: 'Varies' };
    }

    return {
      price: Math.round(fleet.pricePerDay * stats.multiplier),
      label: stats.label,
      distance: stats.distance
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Select Transport for {destination?.name}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Vehicle pricing for <span className="font-bold text-green-700">{destination?.name}</span> is calculated based on its unique terrain and travel distance from the capital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {fleets.map((fleet) => {
            const { price, label, distance } = getServicePrice(fleet, destination);
            return (
              <div key={fleet.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col hover:transform hover:scale-[1.02] transition-all">
                <div className="h-48 relative">
                  <img src={fleet.image} alt={fleet.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl text-lg font-black text-gray-900 shadow-lg border border-green-100">
                    {price} USD <span className="text-[10px] block font-normal text-gray-500 uppercase tracking-wider">Per Day</span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">{fleet.icon}</span>
                    <h3 className="text-xl font-bold text-gray-900">{fleet.name}</h3>
                  </div>
                  
                  <div className="space-y-3 mb-6 flex-1">
                    <p className="text-gray-600 text-sm leading-relaxed">{fleet.description}</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      onSelectService({ 
                        ...fleet, 
                        type: 'transport', 
                        pricePerDay: price 
                      });
                      setCurrentPage('booking');
                    }}
                    className="w-full bg-[#4b5a41] text-white py-3 rounded-xl font-bold hover:bg-[#3d4a35] transition-all shadow-md active:scale-95"
                  >
                    Confirm {fleet.name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => setCurrentPage('details')}
            className="text-gray-500 hover:text-gray-700 font-medium"
          >
            ← Back to Destination Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServiceSelection
