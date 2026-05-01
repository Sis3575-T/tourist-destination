import { motion } from 'framer-motion'

const DestinationDetail = ({ destination, setCurrentPage, currency }) => {
  if (!destination) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-600">
        <p className="text-xl mb-4">Destination not found.</p>
        <button 
          onClick={() => setCurrentPage('home')}
          className="bg-[#2d3e23] text-white px-8 py-3 rounded-xl shadow-lg hover:bg-[#3d4a35]"
        >
          Back to Explore
        </button>
      </div>
    );
  }

  const currencyRates = { USD: 1, EUR: 0.92, GBP: 0.79, ETB: 55 };
  const currencySymbols = { USD: '$', EUR: '€', GBP: '£', ETB: 'Br' };

  const formatPrice = (price) => {
    const rate = currencyRates[currency] || 1;
    const symbol = currencySymbols[currency] || '$';
    return `${symbol}${Math.round(price * rate).toLocaleString()}`;
  };

  return (
    <div className="bg-[#fcfbf7] min-h-screen pb-24">
      {/* Hero Header */}
      <div className="relative h-[60vh] overflow-hidden">
        <motion.img 
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={destination.image} 
          alt={destination.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2d3e23] via-[#2d3e23]/20 to-transparent" />
        
        <div className="absolute top-10 left-10">
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setCurrentPage('explorer')}
            className="glass text-[#2d3e23] px-6 py-3 rounded-2xl shadow-xl hover:bg-white transition-all flex items-center gap-2 font-bold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Explore
          </motion.button>
        </div>

        <div className="absolute bottom-12 left-10 md:left-24 right-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-[#d4af37] text-white px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase mb-4 inline-block shadow-lg">
              {destination.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter">{destination.name}</h1>
            <p className="text-white/90 text-xl md:text-2xl flex items-center gap-2 font-light">
              <svg className="w-6 h-6 text-[#d4af37]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {destination.location}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 space-y-12"
          >
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100">
              <h2 className="text-3xl font-black text-[#2d3e23] mb-8 flex items-center gap-4">
                <span className="w-10 h-px bg-[#d4af37]"></span>
                The Experience
              </h2>
              <p className="text-gray-600 leading-relaxed text-xl font-light whitespace-pre-wrap">
                {destination.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 pt-12 border-t border-gray-50">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Duration</p>
                  <p className="text-lg font-bold text-[#2d3e23]">{destination.duration}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Best Season</p>
                  <p className="text-lg font-bold text-[#2d3e23]">{destination.bestSeason}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Distance</p>
                  <p className="text-lg font-bold text-[#2d3e23]">{destination.distanceFromAddis} km</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Difficulty</p>
                  <p className="text-lg font-bold text-[#2d3e23]">Moderate</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100">
              <h2 className="text-3xl font-black text-[#2d3e23] mb-8 flex items-center gap-4">
                <span className="w-10 h-px bg-[#d4af37]"></span>
                Planned Activities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destination.activities && destination.activities.map((activity, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:bg-[#2d3e23] hover:text-white transition-all cursor-default">
                    <span className="w-8 h-8 bg-[#d4af37] text-white rounded-lg flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </span>
                    <span className="font-bold">{activity}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Booking Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-32 bg-[#2d3e23] p-10 rounded-[2.5rem] text-white shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
              
              <div className="relative z-10">
                <p className="text-white/60 font-bold uppercase tracking-[0.2em] text-xs mb-2">Package Starts From</p>
                <div className="flex items-baseline gap-2 mb-8">
                  <h3 className="text-5xl font-black text-[#d4af37]">{formatPrice(destination.price)}</h3>
                  <span className="text-white/60 font-medium">/ person</span>
                </div>
                
                <div className="space-y-4 mb-10">
                  {['Guided Exploration', 'Private Transport', 'Accommodation Incl.', 'Entrance Fees Paid'].map(item => (
                    <div key={item} className="flex items-center gap-3 text-sm font-medium">
                      <svg className="w-5 h-5 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                      {item}
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setCurrentPage('service-selection');
                  }}
                  className="w-full bg-[#d4af37] text-[#2d3e23] py-5 rounded-[1.5rem] font-black text-xl hover:bg-[#f1d38a] transition-all transform hover:scale-105 shadow-xl"
                >
                  Book Now — Choose Transport
                </button>
                
                <p className="text-center mt-6 text-white/40 text-xs font-medium">
                  Secure checkout with 24/7 support
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
