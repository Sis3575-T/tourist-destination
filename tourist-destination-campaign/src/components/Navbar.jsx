import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = ({ currentPage, setCurrentPage, language, setLanguage, currency, setCurrency, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', page: 'home' },
    { name: 'Destinations', page: 'explorer' },
    { name: 'Smart Match', page: 'recommendations' },
    { name: 'Dashboard', page: 'dashboard' },
    { name: 'Contact', page: 'contact' },
  ]

  const languages = ['EN', 'FR', 'ES', 'AR']
  const currencies = ['USD', 'EUR', 'GBP', 'ETB']

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-0' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center px-6 py-3 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-xl rounded-none border-b border-gray-100'
            : 'bg-white/10 backdrop-blur-md rounded-2xl border border-white/20'
        }`}>

          {/* Logo */}
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-3 shrink-0"
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-lg ${isScrolled ? 'bg-[#2d3e23]' : 'bg-[#d4af37]'}`}>
              <svg className={`w-5 h-5 ${isScrolled ? 'text-[#d4af37]' : 'text-[#2d3e23]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <span className={`text-lg font-black uppercase tracking-tight ${isScrolled ? 'text-[#2d3e23]' : 'text-white'}`}>
              Ethiopian<span className="text-[#d4af37]"> Tourist</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.page}
                onClick={() => setCurrentPage(item.page)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                  currentPage === item.page
                    ? isScrolled ? 'bg-[#2d3e23] text-white' : 'bg-white/20 text-white'
                    : isScrolled ? 'text-gray-600 hover:bg-gray-100 hover:text-[#2d3e23]' : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Right Controls */}
          <div className="hidden md:flex items-center gap-3">
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className={`text-xs font-bold focus:outline-none cursor-pointer bg-transparent ${isScrolled ? 'text-gray-500' : 'text-white/70'}`}
            >
              {languages.map(l => <option key={l} value={l} className="text-gray-900">{l}</option>)}
            </select>
            <div className={`w-px h-4 ${isScrolled ? 'bg-gray-200' : 'bg-white/20'}`} />
            <select
              value={currency}
              onChange={e => setCurrency(e.target.value)}
              className={`text-xs font-bold focus:outline-none cursor-pointer bg-transparent ${isScrolled ? 'text-gray-500' : 'text-white/70'}`}
            >
              {currencies.map(c => <option key={c} value={c} className="text-gray-900">{c}</option>)}
            </select>
            <div className={`w-px h-4 ${isScrolled ? 'bg-gray-200' : 'bg-white/20'}`} />
            {user ? (
              <div className="flex items-center gap-2">
                <button onClick={() => setCurrentPage('dashboard')}
                  className={`text-xs font-bold px-3 py-2 rounded-xl transition-all ${isScrolled ? 'text-[#2d3e23] hover:bg-gray-100' : 'text-white/80 hover:bg-white/10'}`}>
                  👤 {user.name?.split(' ')[0]}
                </button>
                <button onClick={onLogout}
                  className="text-xs font-bold text-red-400 border border-red-200 px-3 py-2 rounded-xl hover:bg-red-50 transition-all">
                  Logout
                </button>
              </div>
            ) : (
              <button onClick={() => setCurrentPage('login')}
                className={`text-xs font-bold px-4 py-2 rounded-xl border transition-all ${isScrolled ? 'border-[#2d3e23] text-[#2d3e23] hover:bg-[#2d3e23] hover:text-white' : 'border-white/30 text-white hover:bg-white/10'}`}>
                Sign In
              </button>
            )}
            <button
              onClick={() => setCurrentPage('booking')}
              className="bg-[#d4af37] text-[#2d3e23] px-5 py-2 rounded-xl text-sm font-black hover:bg-[#f1d38a] transition-all shadow-md"
            >
              Book Now
            </button>
            {/* Admin access — subtle icon */}
            <button
              onClick={() => setCurrentPage('admin')}
              title="Admin Panel"
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                isScrolled ? 'text-gray-300 hover:text-[#2d3e23] hover:bg-gray-100' : 'text-white/20 hover:text-white/60 hover:bg-white/10'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-xl ${isScrolled ? 'text-[#2d3e23] bg-gray-100' : 'text-white bg-white/10'}`}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mx-4 mt-2"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-4 space-y-1 border border-gray-100">
              {navItems.map(item => (
                <button
                  key={item.page}
                  onClick={() => { setCurrentPage(item.page); setIsMenuOpen(false) }}
                  className={`block w-full text-left px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                    currentPage === item.page ? 'bg-[#2d3e23] text-white' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between px-2">
                <select value={language} onChange={e => setLanguage(e.target.value)} className="text-xs font-bold text-gray-500 focus:outline-none bg-transparent">
                  {languages.map(l => <option key={l}>{l}</option>)}
                </select>
                <select value={currency} onChange={e => setCurrency(e.target.value)} className="text-xs font-bold text-gray-500 focus:outline-none bg-transparent">
                  {currencies.map(c => <option key={c}>{c}</option>)}
                </select>
                <button
                  onClick={() => { setCurrentPage('booking'); setIsMenuOpen(false) }}
                  className="bg-[#d4af37] text-[#2d3e23] px-4 py-2 rounded-xl text-xs font-black"
                >
                  Book Now
                </button>
                <button
                  onClick={() => { setCurrentPage('admin'); setIsMenuOpen(false) }}
                  className="text-gray-400 hover:text-[#2d3e23] p-2 rounded-xl hover:bg-gray-100 transition-all"
                  title="Admin"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
