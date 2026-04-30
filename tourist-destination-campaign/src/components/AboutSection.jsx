const AboutSection = ({ setCurrentPage }) => {
  return (
    <section className="bg-[#f5f3ef] py-14 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-10">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-slate-800 mb-1">About Ethiopian Tourist Destination</h2>
          <div className="w-full h-px bg-gray-300 mb-6"></div>
          
          <h3 className="text-xl font-semibold text-slate-700 mb-2">Your Gateway to Ethiopia</h3>
          <div className="w-24 h-0.5 bg-gray-400 mb-5"></div>
          
          <p className="text-slate-600 mb-8 leading-relaxed text-[15px]">
            Ethiopian Tourist Destination has over a decade of experience in providing high-quality, personalized tours throughout Ethiopia.
          </p>
          
          <button 
            onClick={() => setCurrentPage && setCurrentPage('about')}
            className="bg-[#4b5a41] text-white px-6 py-2.5 text-sm font-semibold shadow hover:bg-[#3d4a35] transition-colors"
          >
            Read More About Us
          </button>
        </div>
        
        <div className="flex-1 flex justify-end">
          <div className="bg-white p-3 shadow-md inline-block" style={{ transform: 'rotate(1deg)' }}>
            <img 
              src="https://images.unsplash.com/photo-1528127269322-539801943592?w=800&fit=crop" 
              alt="Ethiopian landscape" 
              className="w-full max-w-md h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection;
