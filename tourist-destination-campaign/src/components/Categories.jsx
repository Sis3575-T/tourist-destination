const Categories = ({ setCurrentPage }) => {
  const categories = [
    {
      name: 'Camping Tours',
      description: 'Experience Ethiopia\'s wilderness with our premium camping adventures',
      image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=400',
      count: '12+ Tours'
    },
    {
      name: 'Cultural Tours',
      description: 'Immerse yourself in Ethiopia\'s rich history and traditions',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      count: '8+ Tours'
    },
    {
      name: 'Adventure Trips',
      description: 'Thrilling adventures from volcanoes to mountain treks',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      count: '15+ Tours'
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore by Category</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose your adventure type and let us create the perfect Ethiopian experience for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              onClick={() => setCurrentPage('explorer')}
            >
              <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-gray-200 mb-3">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {category.count}
                    </span>
                    <span className="text-sm font-medium">Explore →</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => setCurrentPage('recommendations')}
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Get Smart Recommendations
          </button>
        </div>
      </div>
    </section>
  )
}

export default Categories