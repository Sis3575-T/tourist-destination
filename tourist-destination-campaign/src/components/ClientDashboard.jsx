import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import SalaryManagement from './SalaryManagement'
import AttendanceTracking from './AttendanceTracking'

const ClientDashboard = ({ user, apiBase }) => {
  const [workers, setWorkers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newWorker, setNewWorker] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    salary: ''
  })

  useEffect(() => {
    fetchWorkers()
  }, [])

  const fetchWorkers = async () => {
    try {
      const { data } = await axios.get(`${apiBase}/workers`)
      setWorkers(data)
    } catch (err) {
      console.error('Failed to fetch workers:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegisterWorker = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${apiBase}/workers`, newWorker)
      setShowAddForm(false)
      setNewWorker({ name: '', email: '', phone: '', position: '', salary: '' })
      fetchWorkers()
      setActiveTab('overview')
    } catch (err) {
      alert('Failed to register worker')
    }
  }

  if (user?.role !== 'client' && user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfbf7]">
        <div className="text-center p-12 bg-white rounded-[2.5rem] shadow-xl border border-red-100">
          <div className="text-6xl mb-6">🚫</div>
          <h2 className="text-3xl font-black text-[#2d3e23] mb-4">Access Denied</h2>
          <p className="text-gray-500 max-w-md mx-auto">This portal is restricted to Business Clients and Administrators only.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fcfbf7] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Portal Header */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-end">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl font-black text-[#2d3e23] tracking-tighter mb-2">Client Portal</h1>
            <p className="text-gray-500 font-medium italic">Welcome back, {user.name} | Tour Operator Workspace</p>
          </motion.div>
          <div className="mt-6 md:mt-0">
            <button 
              onClick={() => setShowAddForm(true)}
              className="bg-[#2d3e23] text-white px-8 py-4 rounded-2xl font-black shadow-xl hover:bg-[#3d4a35] transition-all flex items-center gap-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"/></svg>
              Add New Staff
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-4 mb-10">
          {[
            { id: 'overview', label: 'Staff Overview', icon: '👥' },
            { id: 'salary', label: 'Salary Page', icon: '💰' },
            { id: 'attendance', label: 'Attendance Page', icon: '📅' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all ${
                activeTab === tab.id 
                ? 'bg-[#d4af37] text-[#2d3e23] shadow-xl scale-105' 
                : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { label: 'Registered Workers', val: workers.length, icon: '👷' },
                  { label: 'Active Monthly Payroll', val: `$${workers.reduce((a, b) => a + b.salary, 0).toLocaleString()}`, icon: '📉' },
                  { label: 'Company Status', val: 'Operational', icon: '✅' }
                ].map(s => (
                  <div key={s.label} className="bg-white p-8 rounded-[2rem] shadow-lg border border-gray-100 flex items-center gap-6">
                    <div className="text-3xl">{s.icon}</div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">{s.label}</p>
                      <p className="text-3xl font-black text-[#2d3e23]">{s.val}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-[#2d3e23] text-white">
                    <tr>
                      <th className="px-8 py-6 text-[10px] uppercase font-black tracking-widest">Worker Information</th>
                      <th className="px-8 py-6 text-[10px] uppercase font-black tracking-widest">Position</th>
                      <th className="px-8 py-6 text-[10px] uppercase font-black tracking-widest text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {workers.map(w => (
                      <tr key={w._id} className="hover:bg-gray-50/50">
                        <td className="px-8 py-8">
                          <p className="font-bold text-[#2d3e23] text-lg">{w.name}</p>
                          <p className="text-sm text-gray-400">{w.email}</p>
                        </td>
                        <td className="px-8 py-8 font-bold text-gray-600">{w.position}</td>
                        <td className="px-8 py-8 text-center">
                          <span className="px-4 py-1.5 bg-green-50 text-green-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-green-100">
                            {w.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'salary' && (
            <SalaryManagement apiBase={apiBase} workers={workers} fetchWorkers={fetchWorkers} />
          )}

          {activeTab === 'attendance' && (
            <AttendanceTracking apiBase={apiBase} workers={workers} fetchWorkers={fetchWorkers} />
          )}
        </AnimatePresence>
      </div>

      {/* Onboarding Modal */}
      <AnimatePresence>
        {showAddForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#2d3e23]/70 backdrop-blur-md" onClick={() => setShowAddForm(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl p-12">
              <h2 className="text-4xl font-black text-[#2d3e23] mb-8 tracking-tighter">Onboard New Worker</h2>
              <form onSubmit={handleRegisterWorker} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1">Full Professional Name</label>
                  <input required type="text" value={newWorker.name} onChange={(e) => setNewWorker({...newWorker, name: e.target.value})} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all" placeholder="Enter name" />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1">Official Email</label>
                    <input required type="email" value={newWorker.email} onChange={(e) => setNewWorker({...newWorker, email: e.target.value})} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl" placeholder="email@company.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1">Phone Number</label>
                    <input required type="text" value={newWorker.phone} onChange={(e) => setNewWorker({...newWorker, phone: e.target.value})} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl" placeholder="+251..." />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1">Assigned Position</label>
                    <input required type="text" value={newWorker.position} onChange={(e) => setNewWorker({...newWorker, position: e.target.value})} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl" placeholder="e.g. Tour Guide" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1">Monthly Salary ($)</label>
                    <input required type="number" value={newWorker.salary} onChange={(e) => setNewWorker({...newWorker, salary: e.target.value})} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl" />
                  </div>
                </div>
                <div className="flex gap-4 pt-6">
                  <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 py-5 border border-gray-100 rounded-2xl font-bold text-gray-400 hover:bg-gray-50 transition-all">Cancel</button>
                  <button type="submit" className="flex-1 py-5 bg-[#2d3e23] text-white rounded-2xl font-bold shadow-xl shadow-[#2d3e23]/20 hover:bg-[#3d4a35] transition-all">Confirm Onboarding</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ClientDashboard
