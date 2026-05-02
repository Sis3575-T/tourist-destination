import { useState } from 'react'

const Footer = ({ setCurrentPage, user }) => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 5000)
    }
  }

  const navigateTo = (page) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setCurrentPage(page)
  }

  return (
    <footer className="bg-[#2d3e23] text-white pt-20 pb-10 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[100px] -mr-48 -mt-48"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand & Mission */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#d4af37] rounded-xl flex items-center justify-center shadow-lg transform -rotate-3">
                <svg className="w-6 h-6 text-[#2d3e23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tighter">Ethio<span className="text-[#d4af37]">Tour</span></h3>
            </div>
            <p className="text-gray-400 font-light leading-relaxed mb-8">
              Crafting unforgettable premium journeys through the ancient landscapes and vibrant cultures of the Horn of Africa.
            </p>
            <div className="flex gap-4">
              {[
                { id: 'facebook', url: 'https://facebook.com' },
                { id: 'twitter', url: 'https://twitter.com' },
                { id: 'instagram', url: 'https://instagram.com' },
                { id: 'youtube', url: 'https://youtube.com' }
              ].map(social => (
                <a 
                  key={social.id} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-[#d4af37] hover:text-[#2d3e23] transition-all border border-white/10 group"
                >
                  <span className="sr-only">{social.id}</span>
                  <div className="w-5 h-5 flex items-center justify-center">
                    {social.id === 'facebook' && <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>}
                    {social.id === 'twitter' && <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>}
                    {social.id === 'instagram' && <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>}
                    {social.id === 'youtube' && <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Functional Navigation */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-[#d4af37] mb-8">Quick Navigation</h4>
            <ul className="space-y-4">
              {[
                { name: 'Discover Home', page: 'home' },
                { name: 'All Destinations', page: 'explorer' },
                { name: 'Personalized Trips', page: 'recommendations' },
                { name: 'User Dashboard', page: 'dashboard' },
                { name: 'Latest Reviews', page: 'reviews' }
              ].map(link => (
                <li key={link.name}>
                  <button 
                    onClick={() => navigateTo(link.page)}
                    className="text-gray-400 hover:text-white transition-all hover:translate-x-1 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-px bg-[#d4af37] opacity-0 group-hover:opacity-100 transition-all"></span>
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Support */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-[#d4af37] mb-8">Direct Support</h4>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shrink-0">
                  <svg className="w-5 h-5 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Call Us Now</p>
                  <p className="font-bold">+251 935 756 054</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shrink-0">
                  <svg className="w-5 h-5 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Email Support</p>
                  <p className="font-bold">sisay3575@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter - Functional */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-[#d4af37] mb-8">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-6 font-light">Join our elite list for exclusive travel deals.</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input 
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#d4af37] transition-all"
              />
              <button 
                type="submit"
                className="w-full bg-[#d4af37] text-[#2d3e23] py-3 rounded-xl font-bold text-sm hover:bg-[#f1d38a] transition-all"
              >
                {subscribed ? '✓ Subscribed' : 'Join Now'}
              </button>
            </form>
          </div>

        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-xs font-medium tracking-wide">
            © 2026 ETHIO TOUR EXPERIENCE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <button className="text-gray-500 hover:text-white text-xs transition-colors" onClick={() => setCurrentPage('contact')}>Contact Us</button>
            <button className="text-gray-500 hover:text-white text-xs transition-colors" onClick={() => setCurrentPage('admin')}>Admin</button>
            <button className="text-gray-500 hover:text-white text-xs transition-colors">Privacy Policy</button>
            <button className="text-gray-500 hover:text-white text-xs transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer