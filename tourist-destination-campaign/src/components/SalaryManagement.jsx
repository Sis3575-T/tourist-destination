import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'

const SalaryManagement = ({ apiBase, workers, fetchWorkers }) => {
  const handlePaySalary = async (workerId) => {
    try {
      await axios.post(`${apiBase}/workers/${workerId}/pay`)
      alert('Salary payment processed successfully')
      fetchWorkers()
    } catch (err) {
      alert('Payment failed')
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden"
    >
      <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-[#d4af37]">
        <h2 className="text-2xl font-black text-[#2d3e23] tracking-tighter">Payroll & Disbursements</h2>
        <span className="bg-white/20 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-[#2d3e23]">Financial Module</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-8 py-5 text-[10px] uppercase font-black tracking-widest text-gray-400">Employee</th>
              <th className="px-8 py-5 text-[10px] uppercase font-black tracking-widest text-gray-400">Base Salary</th>
              <th className="px-8 py-5 text-[10px] uppercase font-black tracking-widest text-gray-400">Total Life-time Paid</th>
              <th className="px-8 py-5 text-[10px] uppercase font-black tracking-widest text-center text-gray-400">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {workers.map(w => (
              <tr key={w._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-8 py-6">
                  <p className="font-bold text-[#2d3e23]">{w.name}</p>
                  <p className="text-xs text-gray-400">{w.position}</p>
                </td>
                <td className="px-8 py-6 font-black text-gray-600">${w.salary.toLocaleString()}</td>
                <td className="px-8 py-6">
                  <span className="font-bold text-[#2d3e23]">
                    ${w.payments.reduce((acc, p) => acc + p.amount, 0).toLocaleString()}
                  </span>
                </td>
                <td className="px-8 py-6 text-center">
                  <button 
                    onClick={() => handlePaySalary(w._id)}
                    className="bg-[#2d3e23] text-white px-8 py-3 rounded-xl font-bold text-xs hover:bg-[#3d4a35] transition-all shadow-lg hover:shadow-[#2d3e23]/20"
                  >
                    Pay This Month
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

export default SalaryManagement
