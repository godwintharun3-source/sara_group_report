import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, BookOpen, ShieldCheck, Calendar, FileText, MonitorPlay, UploadCloud, CheckCircle, BarChart3, Database } from 'lucide-react'

const workflowStages = [
  { id: 1, title: 'Student Registration', icon: Users, desc: 'Students enroll and register their biometric/identity details securely.' },
  { id: 2, title: 'Identity Authentication', icon: ShieldCheck, desc: 'Zero Trust verifies identity continuously during login.' },
  { id: 3, title: 'MFA Verification', icon: ShieldCheck, desc: 'Multi-Factor Authentication secures the session.' },
  { id: 4, title: 'Examination Scheduling', icon: Calendar, desc: 'Admins allocate time slots and resources for exams.' },
  { id: 5, title: 'Secure Question Distribution', icon: FileText, desc: 'Encrypted papers are delivered just-in-time to verified nodes.' },
  { id: 6, title: 'Online Examination', icon: MonitorPlay, desc: 'Students take the exam in a locked-down, monitored browser.' },
  { id: 7, title: 'Answer Submission', icon: UploadCloud, desc: 'Encrypted answers are submitted to the secure database.' },
  { id: 8, title: 'Faculty Evaluation', icon: CheckCircle, desc: 'Faculty grade submissions securely without seeing student identities.' },
  { id: 9, title: 'Result Generation', icon: BarChart3, desc: 'Automated compilation of marks into final result sheets.' },
  { id: 10, title: 'Secure Record Management', icon: Database, desc: 'Immutable storage of academic records.' },
]

const mainUsers = ['Student', 'Faculty', 'Invigilator', 'Examination Administrator', 'System Administrator']

export default function Slide2() {
  const [activeStage, setActiveStage] = useState(workflowStages[0])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center pt-10">
      <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">How the Digital Examination System Works</h1>
      <p className="text-cyan-100/60 mb-8">Click on any stage in the workflow to view details.</p>

      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Timeline / Workflow */}
        <div className="flex-1 w-full crystal-card p-6 flex flex-col md:flex-row md:flex-wrap justify-center gap-4 relative">
          {/* Animated data packet connecting line (visual only) */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-cyan-900/50 -z-10 hidden md:block">
            <motion.div 
              animate={{ x: ['0%', '100%'] }} 
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="h-full w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#00ffff]"
            />
          </div>

          {workflowStages.map((stage, idx) => {
            const Icon = stage.icon
            const isActive = activeStage.id === stage.id
            return (
              <motion.button
                key={stage.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveStage(stage)}
                className={`relative flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 w-32 ${isActive ? 'bg-cyan-600/40 border border-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.3)]' : 'bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50'}`}
              >
                <div className={`p-3 rounded-full mb-2 ${isActive ? 'bg-cyan-500 text-slate-900' : 'bg-slate-700 text-cyan-300'}`}>
                  <Icon size={24} />
                </div>
                <span className="text-[10px] font-semibold text-center leading-tight">{stage.title}</span>
                {idx < workflowStages.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-cyan-500/50 text-xs">→</div>
                )}
              </motion.button>
            )
          })}
        </div>

        {/* Info Card & Users */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="crystal-card p-6 h-48 border-l-4 border-l-cyan-400 flex flex-col justify-center"
            >
              <div className="flex items-center gap-3 mb-4 text-cyan-300">
                <activeStage.icon size={28} />
                <h3 className="text-xl font-bold">{activeStage.title}</h3>
              </div>
              <p className="text-slate-300">{activeStage.desc}</p>
            </motion.div>
          </AnimatePresence>

          <div className="crystal-card p-6">
            <h4 className="text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">System Users</h4>
            <div className="flex flex-wrap gap-2">
              {mainUsers.map(user => (
                <span key={user} className="text-xs bg-slate-900/80 text-cyan-200 px-3 py-1.5 rounded-full border border-cyan-800">
                  {user}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
