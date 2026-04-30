import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = ({ currentPage, setCurrentPage, user, onLogout, language, setLanguage, currency, setCurrency }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', page: 'home' },
    { name: 'Destinations', page: 'explorer' },
    { name: 'Recommendations', page: 'recommendations' },
    { name: 'Dashboard', page: 'dashboard' },
  ]

  const languages = ['EN', 'FR', 'ES', 'AR']
  const currencies = ['USD', 'EUR', 'GBP', 'ETB']

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'py-2' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`glass rounded-2xl md:rounded-[2rem] px-6 py-3 flex justify-between items-center transition-all duration-500 ${
          isScrolled ? 'shadow-xl border-white/40' : 'shadow-none border-transparent'
        }`}>
          <div className="flex items-center">
            <div 
              className="flex-shrink-0 cursor-pointer flex items-center gap-3" 
              onClick={() => setCurrentPage('home')}
            >
              <div className="w-10 h-10 bg-[#2d3e23] rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                <svg className="w-6 h-6 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h1 className="text-lg md:text-xl font-black text-[#2d3e23] tracking-tight uppercase">
                Ethio<span className="text-[#d4af37]">Tour</span>
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => setCurrentPage(item.page)}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                  currentPage === item.page
                    ? 'bg-[#2d3e23] text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-[#2d3e23]'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Settings & User */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-xs font-bold text-gray-500 focus:outline-none cursor-pointer hover:text-[#2d3e23]"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
              <div className="w-px h-4 bg-gray-200"></div>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent text-xs font-bold text-gray-500 focus:outline-none cursor-pointer hover:text-[#2d3e23]"
              >
                {currencies.map((code) => (
                  <option key={code} value={code}>{code}</option>
                ))}
              </select>
            </div>

            <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

            {user ? (
              <div className="flex items-center gap-4">
                <button 
                  onClick={onLogout}
                  className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-100 transition-colors border border-red-100"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setCurrentPage('login')}
                className="bg-[#2d3e23] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#3d4a35] transition-all shadow-md hover:shadow-lg"
              >
                Login
              </button>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-[#2d3e23] bg-gray-100 rounded-xl"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden px-4 mt-2"
          >
            <div className="glass rounded-3xl p-4 shadow-2xl space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    setCurrentPage(item.page)
                    setIsMenuOpen(false)
                  }}
                  className={`block px-6 py-4 text-base font-bold w-full text-left rounded-2xl ${
                    currentPage === item.page
                      ? 'bg-[#2d3e23] text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar