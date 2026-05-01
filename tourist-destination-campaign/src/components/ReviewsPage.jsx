import { useEffect, useState } from 'react'
import { API_BASE } from '../api'

const ReviewsPage = ({ setCurrentPage }) => {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/reviews`)
      .then(r => r.json())
      .then(data => setReviews(Array.isArray(data) ? data : []))
      .catch(() => setReviews([]))
  }, [])

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
            <div key={review._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                <img 
                  src={review.avatar} 
                  alt={review.name} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-green-100"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xl font-bold text-gray-900">{review.name}</h3>
                    {review.tag && (
                      <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                        {review.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{review.location}{review.date ? ` • ${review.date}` : ''}</p>
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
