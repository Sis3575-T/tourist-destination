import { motion } from 'framer-motion'
import axios from 'axios'

const AttendanceTracking = ({ apiBase, workers, fetchWorkers }) => {
  const handleAttendance = async (workerId, status) => {
    try {
      await axios.post(`${apiBase}/workers/${workerId}/attendance`, { status })
      alert(`Successfully marked as ${status}`)
      fetchWorkers()
    } catch (err) {
      alert('Logging failed')
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden"
    >
      <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-[#2d3e23] text-white">
        <div>
          <h2 className="text-2xl font-black tracking-tighter">Attendance Register</h2>
          <p className="text-white/50 text-xs font-bold uppercase tracking-widest mt-1">Daily Operations Check</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-black uppercase tracking-widest text-[#d4af37]">Today</p>
          <p className="font-bold">{new Date().toLocaleDateString()}</p>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-8 py-5 text-[10px] uppercase font-black tracking-widest text-gray-400">Worker</th>
              <th className="px-8 py-4 text-[10px] uppercase font-black tracking-widest text-gray-400">Recent History</th>
              <th className="px-8 py-5 text-[10px] uppercase font-black tracking-widest text-center text-gray-400">Mark Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {workers.map(w => (
              <tr key={w._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-8 py-6">
                  <p className="font-bold text-[#2d3e23]">{w.name}</p>
                  <p className="text-xs text-gray-400">{w.position}</p>
                </td>
                <td className="px-8 py-6">
                  <div className="flex gap-1.5">
                    {w.attendance.slice(-10).map((a, i) => (
                      <div 
                        key={i} 
                        className={`w-3 h-3 rounded-full shadow-sm ${
                          a.status === 'present' ? 'bg-green-500' : 
                          a.status === 'absent' ? 'bg-red-500' : 'bg-amber-500'
                        }`}
                        title={`${new Date(a.date).toLocaleDateString()}: ${a.status}`}
                      ></div>
                    ))}
                    {w.attendance.length === 0 && <span className="text-xs text-gray-300 italic">No history</span>}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex justify-center gap-3">
                    <button 
                      onClick={() => handleAttendance(w._id, 'present')}
                      className="group flex flex-col items-center"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-all shadow-sm font-black">P</div>
                      <span className="text-[8px] font-black uppercase tracking-widest mt-1 text-gray-400">Present</span>
                    </button>
                    <button 
                      onClick={() => handleAttendance(w._id, 'absent')}
                      className="group flex flex-col items-center"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all shadow-sm font-black">A</div>
                      <span className="text-[8px] font-black uppercase tracking-widest mt-1 text-gray-400">Absent</span>
                    </button>
                    <button 
                      onClick={() => handleAttendance(w._id, 'late')}
                      className="group flex flex-col items-center"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-all shadow-sm font-black">L</div>
                      <span className="text-[8px] font-black uppercase tracking-widest mt-1 text-gray-400">Late</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

export default AttendanceTracking
