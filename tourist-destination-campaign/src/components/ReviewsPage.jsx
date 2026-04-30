import React from 'react'

const ReviewsPage = ({ setCurrentPage }) => {
  const reviews = [
    {
      id: 1,
      name: "Abebe Kebede",
      location: "Addis Ababa, Ethiopia",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
      rating: 5,
      date: "October 2023",
      text: "Our journey with Ethiopian Tourist Destination was beyond expectations. Sisay was incredibly helpful in planning our route through the Simien Mountains. The 4x4 was in top condition and our driver knew every turn of the road. If you want a worry-free trip, contact them at +251935756054.",
      tag: "Nature & Trekking"
    },
    {
      id: 2,
      name: "Tigist Haile",
      location: "Bahir Dar, Ethiopia",
      avatar: "https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?w=150&h=150&fit=crop",
      rating: 5,
      date: "December 2023",
      text: "Professionalism at its best. We booked a cultural tour of Lalibela and Axum. The guides provided by the agency were deeply knowledgeable. I highly recommend reaching out to Temesgen at sisaytemesgenb@gmail.com for any group travel needs.",
      tag: "Cultural Tour"
    },
    {
      id: 3,
      name: "Samuel Bekele",
      location: "Hawassa, Ethiopia",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      rating: 4,
      date: "January 2024",
      text: "The Danakil Depression expedition was a lifetime experience. The logistics were handled perfectly despite the harsh environment. Safety was clearly a priority. Great communication throughout the booking process.",
      tag: "Adventure"
    },
    {
      id: 4,
      name: "Helen Tekle",
      location: "Gondar, Ethiopia",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      rating: 5,
      date: "February 2024",
      text: "We used their luxury coach for a corporate retreat to Langano. The bus was modern, clean, and very comfortable. Excellent service from start to finish.",
      tag: "Corporate Travel"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <button
            onClick={() => setCurrentPage('home')}
            className="mb-8 inline-flex items-center text-green-700 hover:text-green-800 transition-colors font-semibold"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Client Testimonials</h1>
          <p className="text-lg text-gray-600">What our travelers say about their experiences with us.</p>
        </div>

        <div className="space-y-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                <img 
                  src={review.avatar} 
                  alt={review.name} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-green-100"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xl font-bold text-gray-900">{review.name}</h3>
                    <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      {review.tag}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{review.location} • {review.date}</p>
                </div>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-5 h-5 fill-current ${i < review.rating ? 'text-amber-500' : 'text-gray-200'}`} 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed italic">
                "{review.text}"
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-[#4b5a41] rounded-3xl p-10 text-center text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-6">Ready to Plan Your Journey?</h2>
          <p className="text-lg text-green-50 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied travelers who have explored the Horn of Africa with us. Contact our lead experts today for a personalized quote.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 w-full max-w-md mx-auto">
              <p className="font-bold text-2xl mb-2">Sisay</p>
              <p className="text-green-200 text-lg mb-2">sisay3575@gmail.com</p>
              <p className="text-3xl font-mono">+251 935 756 054</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewsPage
