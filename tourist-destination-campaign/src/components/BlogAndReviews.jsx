import { useEffect, useState } from 'react'
import { API_BASE } from '../api'

const BlogAndReviews = ({ setCurrentPage, onSelectBlog }) => {
  const [blogs, setBlogs] = useState([])
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    fetch(`${API_BASE}/blogs`)
      .then(r => r.json())
      .then(data => setBlogs(Array.isArray(data) ? data : []))
      .catch(() => setBlogs([]))

    fetch(`${API_BASE}/reviews`)
      .then(r => r.json())
      .then(data => setReviews(Array.isArray(data) ? data.slice(0, 3) : []))
      .catch(() => setReviews([]))
  }, [])

  return (
    <section className="py-16 bg-[#f8f7f4]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Blog Section */}
          <div className="flex-1 lg:w-2/3">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold text-slate-800">Travel Tips & Blog</h2>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogs.map(blog => (
                <div key={blog._id} className="bg-white shadow-sm border border-gray-100 flex flex-col group cursor-pointer">
                  <div className="h-48 overflow-hidden">
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-slate-800 mb-3">{blog.title}</h3>
                    <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4 flex-1">{blog.excerpt}</p>
                    <span 
                      onClick={() => {
                        if (onSelectBlog) onSelectBlog(blog)
                        if (setCurrentPage) setCurrentPage('blog-detail')
                      }}
                      className="text-[#4b5a41] text-sm font-semibold flex items-center group-hover:underline"
                    >
                      Read More
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Contact & Reviews Widget */}
          <div className="lg:w-1/3">
            <div className="bg-white border border-gray-200 shadow-sm p-6">
              <div className="flex flex-col items-center border-b border-gray-100 pb-6 mb-4">
                <div className="flex flex-col items-center text-center mb-4">
                  <h3 className="text-xl font-bold text-slate-800">Direct Contact</h3>
                  <p className="text-xs text-gray-500 mt-1">Talk to our lead experts</p>
                </div>
                <div className="space-y-3 w-full">
                  <div className="bg-[#4b5a41] p-4 rounded-lg border border-[#3d4a35] text-white shadow-md">
                    <p className="text-lg font-bold">Sisay</p>
                    <p className="text-sm opacity-90">sisay3575@gmail.com</p>
                    <p className="text-sm font-mono">+251 935 756 054</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-slate-800">Client Reviews</h4>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                {reviews.map(review => (
                  <div key={review._id} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center mb-2">
                      <img 
                        src={review.avatar} 
                        alt={review.name} 
                        className="w-10 h-10 rounded-full mr-3 border border-gray-200 object-cover" 
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">{review.name}</h4>
                        <div className="flex space-x-1 text-[#34e0a1]">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 italic">"{review.text}"</p>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => setCurrentPage && setCurrentPage('reviews')}
                className="w-full mt-6 bg-[#4b5a41] hover:bg-[#3d4a35] text-white font-bold py-2 rounded transition-colors"
              >
                Read All Reviews
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}

export default BlogAndReviews;
