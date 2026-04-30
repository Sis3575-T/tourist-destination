import React from 'react'

const BlogDetail = ({ blog, setCurrentPage }) => {
  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h2>
          <button
            onClick={() => setCurrentPage('home')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    )
  }

  // Extended content for blogs
  const fullContent = {
    1: {
      date: "May 15, 2024",
      author: "Sisay Temesgen",
      content: [
        "Ethiopia is a land of wonder, from the ancient rock-hewn churches of Lalibela to the dramatic landscapes of the Simien Mountains. Here are the top 10 things you must see on your first visit.",
        "1. Lalibela: Known as the 'Eighth Wonder of the World', these monolithic churches are carved directly into the red volcanic rock.",
        "2. Simien Mountains: A UNESCO World Heritage site home to endemic wildlife like the Gelada baboon and Walia ibex.",
        "3. Danakil Depression: One of the lowest and hottest places on Earth, featuring neon-colored hydrothermal fields.",
        "4. Gondar: The 'Camelot of Africa', home to a complex of medieval castles.",
        "5. Axum: The center of the ancient Aksumite Empire, featuring massive stone stelae.",
        "6. Blue Nile Falls: A spectacular waterfall known locally as Tis Abay.",
        "7. Lake Tana Monasteries: Ancient churches hidden on the islands of Ethiopia's largest lake.",
        "8. Omo Valley: Home to diverse tribes with unique cultural traditions.",
        "9. Harar: A walled city with 82 mosques, considered the fourth holiest city in Islam.",
        "10. Bale Mountains: A high-altitude plateau with rare wildlife and stunning alpine scenery."
      ]
    },
    2: {
      date: "June 2, 2024",
      author: "Temesgen Bekele",
      content: [
        "The Lower Omo Valley is one of the most culturally diverse places on the planet. Home to over a dozen distinct tribes, it offers a glimpse into ancient traditions that have survived for millennia.",
        "Visiting the Mursi tribe is often a highlight for many travelers. Known for the clay plates worn in the lower lips of women, the Mursi have a complex social structure and unique rituals.",
        "The Hamer tribe are famous for their 'Bull Jumping' ceremony, a rite of passage for young men entering adulthood. Their elaborate hairstyles and leather clothing are works of art in themselves.",
        "In the village of the Karo tribe, you will see intricate body painting using white chalk and colored ochre. Their villages overlook the winding Omo River, providing a stunning backdrop to their daily lives.",
        "Traveling through the Omo Valley requires respect and a deep understanding of local customs. Our guides are trained to facilitate these encounters ethically and authentically."
      ]
    }
  }

  const blogInfo = fullContent[blog.id] || { date: "Recent", author: "Staff", content: [blog.excerpt] }

  return (
    <div className="min-h-screen bg-white">
      {/* Article Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <button
          onClick={() => setCurrentPage('home')}
          className="mb-8 flex items-center text-green-700 hover:text-green-800 transition-colors font-semibold"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blog
        </button>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{blog.title}</h1>
        <div className="flex items-center text-gray-500 text-sm space-x-6 border-b border-gray-100 pb-8">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {blogInfo.author}
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {blogInfo.date}
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            5 min read
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="prose prose-xl prose-green text-gray-700 leading-relaxed">
          {blogInfo.content.map((paragraph, index) => (
            <p key={index} className="mb-8 text-lg md:text-xl">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Share Section */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <span className="font-bold text-gray-900">Share this article:</span>
            <div className="flex space-x-2">
              {[1, 2, 3].map(i => (
                <button key={i} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-green-100 hover:text-green-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => setCurrentPage('explorer')}
            className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-100"
          >
            Book a Tour Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlogDetail
