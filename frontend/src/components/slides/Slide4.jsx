import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserCircle, Briefcase, Eye, Settings, ShieldAlert, Check, X } from 'lucide-react'

const principles = [
  'Never Trust, Always Verify', 'Continuous Authentication', 'Least Privilege Access',
  'Assume Breach', 'Strong Identity Verification', 'Continuous Monitoring', 'Risk-Based Access Decisions'
]

const roles = [
  { 
    id: 'student', title: 'Student 🧑‍🎓', icon: UserCircle,
    allowed: ['Access assigned examinations', 'Submit answers', 'View authorized results'],
    denied: ['Access future question papers', 'Modify results', 'Access other students\' exams']
  },
  { 
    id: 'faculty', title: 'Faculty 👨‍🏫', icon: Briefcase,
    allowed: ['Create authorized examinations', 'Evaluate assigned examinations', 'Manage assigned questions'],
    denied: ['Modify unrelated examinations', 'Access unauthorized departments']
  },
  { 
    id: 'invigilator', title: 'Invigilator 👁️', icon: Eye,
    allowed: ['Monitor active examination sessions', 'View examination alerts'],
    denied: ['Access exam content', 'Modify student answers']
  },
  { 
    id: 'exam_admin', title: 'Exam Admin 🧑‍💼', icon: Settings,
    allowed: ['Manage examination schedules', 'Publish authorized results', 'Manage examination sessions'],
    denied: ['Modify evaluation marks', 'Access system infrastructure']
  },
  { 
    id: 'sys_admin', title: 'System Admin 🛠️', icon: ShieldAlert,
    allowed: ['Maintain infrastructure', 'Manage system availability'],
    denied: ['Modify academic marks', 'Access confidential examination content']
  }
]

export default function Slide4() {
  const [activeRole, setActiveRole] = useState(roles[0])

  return (
    <div className="w-full h-full flex flex-col pt-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-cyan-400">Zero Trust Model & Access Control</h2>
        <p className="text-slate-400 mt-2">Role-Based Access Control (RBAC) ensuring Least Privilege.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-full max-h-[70vh]">
        
        {/* Core Principles Sidebar */}
        <div className="w-full lg:w-1/4 crystal-card p-5 overflow-y-auto">
          <h3 className="text-lg font-bold text-cyan-300 mb-4 border-b border-cyan-800 pb-2">Core ZT Principles</h3>
          <ul className="space-y-3">
            {principles.map((p, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2 text-sm text-slate-300 bg-slate-900/50 p-2 rounded border border-slate-700"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_5px_#00ffff]" />
                {p}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* RBAC Interaction Area */}
        <div className="flex-1 flex flex-col gap-4">
          
          {/* Role Selection */}
          <div className="flex flex-wrap gap-2 justify-center">
            {roles.map(role => {
              const isActive = activeRole.id === role.id
              return (
                <button
                  key={role.id}
                  onClick={() => setActiveRole(role)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 border ${isActive ? 'bg-cyan-600 border-cyan-300 text-white shadow-[0_0_15px_rgba(0,255,255,0.4)] scale-105 z-10' : 'bg-slate-800/80 border-slate-700 text-cyan-200 hover:bg-slate-700'}`}
                >
                  <role.icon size={20} />
                  {role.title}
                </button>
              )
            })}
          </div>

          {/* Role Permissions Visualization */}
          <div className="flex-1 crystal-card p-6 flex flex-col items-center justify-center relative mt-4">
            
            {/* Animated Connection Lines Background (Decorative) */}
            <div className="absolute inset-0 pointer-events-none opacity-20 flex justify-center items-center">
               <div className="w-64 h-64 border border-dashed border-cyan-500 rounded-full animate-[spin_20s_linear_infinite]" />
               <div className="absolute w-48 h-48 border border-dashed border-cyan-400 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeRole.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col md:flex-row gap-8 relative z-10"
              >
                {/* Allowed */}
                <div className="flex-1 bg-green-950/30 border border-green-800/50 rounded-2xl p-6">
                  <h4 className="text-green-400 font-bold text-xl mb-4 flex items-center gap-2">
                    <Check className="text-green-500" /> Authorized Access
                  </h4>
                  <ul className="space-y-3">
                    {activeRole.allowed.map((item, i) => (
                      <motion.li 
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }}
                        key={i} className="text-green-100/90 text-sm bg-green-900/40 p-3 rounded-lg border border-green-700/50"
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Denied */}
                <div className="flex-1 bg-red-950/30 border border-red-800/50 rounded-2xl p-6">
                  <h4 className="text-red-400 font-bold text-xl mb-4 flex items-center gap-2">
                    <X className="text-red-500" /> Denied Access
                  </h4>
                  <ul className="space-y-3">
                    {activeRole.denied.map((item, i) => (
                      <motion.li 
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }}
                        key={i} className="text-red-100/90 text-sm bg-red-900/40 p-3 rounded-lg border border-red-700/50"
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>
        </div>

      </div>
    </div>
  )
}
