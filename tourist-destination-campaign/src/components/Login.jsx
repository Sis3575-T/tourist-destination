import { useState } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

const Login = ({ onLogin, setCurrentPage, apiBase }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const endpoint = isLogin ? `${apiBase}/auth/login` : `${apiBase}/auth/signup`
      
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : { 
            name: formData.name, 
            email: formData.email, 
            password: formData.password, 
            role: formData.role 
          }

      const { data } = await axios.post(endpoint, payload)
      
      if (data.token) {
        localStorage.setItem('token', data.token)
        onLogin(data.user, data.userId)
        setCurrentPage('home')
      } else {
        throw new Error('No token received')
      }
    } catch (err) {
      console.error('Auth Error:', err)
      const message = err.response?.data?.message || err.message || 'Authentication failed'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setError('')
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#2d3e23] selection:bg-[#d4af37] selection:text-[#2d3e23]">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#d4af37]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#4b5a41]/30 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg p-6 relative z-10"
      >
        <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-10 shadow-2xl border border-white/20">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-[#2d3e23] tracking-tighter mb-2">
              {isLogin ? 'Sign In' : 'Create Account'}
            </h2>
            <p className="text-gray-500 font-medium">
              {isLogin ? 'Welcome back to Ethiopian Tourist Destination' : 'Start your journey with us today'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-xs font-bold text-center uppercase tracking-widest"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {!isLogin && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#d4af37] outline-none transition-all"
                  placeholder="Your Name"
                />
              </motion.div>
            )}

            {!isLogin && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Account Type</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#d4af37] outline-none transition-all cursor-pointer"
                >
                  <option value="user">Traveler Account</option>
                  <option value="client">Business Client Account</option>
                </select>
              </motion.div>
            )}

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#d4af37] outline-none transition-all"
                placeholder="name@email.com"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#d4af37] outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-[#2d3e23] text-white font-black rounded-2xl shadow-xl shadow-[#2d3e23]/20 hover:bg-[#3d4a35] transition-all disabled:opacity-50 mt-4 text-sm uppercase tracking-widest"
            >
              {isLoading ? 'Processing...' : (isLogin ? 'Login Now' : 'Register Now')}
            </button>
          </form>

          <div className="mt-8 text-center space-y-4">
            <p className="text-sm text-gray-500 font-medium">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={toggleMode}
                className="ml-2 font-black text-[#d4af37] hover:underline"
              >
                {isLogin ? 'Sign up here' : 'Log in here'}
              </button>
            </p>
            
            <button 
              onClick={() => setCurrentPage('home')}
              className="block w-full text-xs font-black text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-widest"
            >
              ← Back to Exploration
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
