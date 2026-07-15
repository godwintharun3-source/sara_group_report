import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Maximize2, Minimize2, User, Key, CheckCircle, Clock, AlertTriangle, Monitor, Users } from 'lucide-react'
import useStore from '../../store'

export default function Slide6() {
  const { setDemoActive, isPlaying, togglePlay } = useStore()
  const [isFullscreenDemo, setIsFullscreenDemo] = useState(false)
  const [activePortal, setActivePortal] = useState('student') // student, faculty, admin
  const [studentState, setStudentState] = useState('login') // login, dashboard, exam, submitted
  const [examData, setExamData] = useState(null)
  
  // Pause presentation when interacting with demo
  useEffect(() => {
    setDemoActive(true)
    if (isPlaying) togglePlay()
    return () => setDemoActive(false)
  }, [setDemoActive, isPlaying, togglePlay])

  const handleStudentLogin = async (e) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value
    // Simulated Backend Call
    try {
      // Serverless Simulation (replaces localhost backend)
      await new Promise(resolve => setTimeout(resolve, 800))
      
      let resData;
      if (username === 'student' && password === 'zero2026') {
        resData = { success: true, token: 'demo-token-123', role: 'student' }
      } else {
        resData = { success: false, message: 'Invalid credentials' }
      }

      if (resData.success) {
        setStudentState('dashboard')
        fetchExam()
      } else {
        alert("Invalid credentials. Use student / zero2026")
      }
    } catch (err) {
      // Fallback if backend is down
      setStudentState('dashboard')
      setExamData({ title: 'Cybersecurity Finals (Fallback)', questions: [{ id: 1, text: 'What is Zero Trust?', options: ['Implicit', 'Never Trust, Verify'], correct: 1 }] })
    }
  }

  const fetchExam = async () => {
    // Serverless Mock Exam Data
    await new Promise(resolve => setTimeout(resolve, 500))
    setExamData({ 
      title: 'Cybersecurity Finals 2026', 
      questions: [{ 
        id: 1, 
        text: 'Which architectural model assumes no implicit trust granted to assets or user accounts based solely on their physical or network location?', 
        options: ['Perimeter Defense Model', 'Zero Trust Architecture', 'Castle-and-Moat Model'], 
        correct: 1 
      }] 
    })
  }

  const toggleDemoFullscreen = () => {
    setIsFullscreenDemo(!isFullscreenDemo)
  }

  return (
    <div className={`flex flex-col items-center justify-center transition-all duration-500 ${isFullscreenDemo ? 'fixed inset-0 z-50 bg-slate-950 p-6' : 'w-full h-full pt-8'}`}>
      
      {!isFullscreenDemo && (
        <h2 className="text-3xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
          🚀 DIGITAL EXAMINATION SYSTEM — LIVE DEMO
        </h2>
      )}

      <div className={`crystal-card flex flex-col overflow-hidden w-full max-w-5xl transition-all duration-500 ${isFullscreenDemo ? 'h-full' : 'h-[65vh]'}`}>
        
        {/* Demo Header */}
        <div className="bg-slate-900 border-b border-cyan-800 p-3 flex justify-between items-center">
          <div className="flex gap-2">
            <button onClick={() => {setActivePortal('student'); setStudentState('login')}} className={`px-4 py-1 text-sm rounded-full ${activePortal === 'student' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-cyan-300'}`}>🧑‍🎓 Student</button>
            <button onClick={() => setActivePortal('faculty')} className={`px-4 py-1 text-sm rounded-full ${activePortal === 'faculty' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-cyan-300'}`}>👨‍🏫 Faculty</button>
            <button onClick={() => setActivePortal('admin')} className={`px-4 py-1 text-sm rounded-full ${activePortal === 'admin' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-cyan-300'}`}>🧑‍💼 Admin</button>
          </div>
          <button onClick={toggleDemoFullscreen} className="text-cyan-400 hover:text-white flex items-center gap-1 text-sm">
            {isFullscreenDemo ? <><Minimize2 size={16}/> Exit Full Demo</> : <><Maximize2 size={16}/> Launch Full Demo</>}
          </button>
        </div>

        {/* Demo Body */}
        <div className="flex-1 bg-slate-950/80 p-6 overflow-y-auto relative">
          
          {/* STUDENT PORTAL */}
          {activePortal === 'student' && (
            <AnimatePresence mode="wait">
              {studentState === 'login' && (
                <motion.form key="login" onSubmit={handleStudentLogin} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-sm mx-auto mt-10 bg-slate-900 p-8 rounded-xl border border-slate-800">
                  <h3 className="text-xl font-bold text-center mb-6 text-white">Student Login</h3>
                  <div className="mb-4">
                    <label className="text-xs text-slate-400 block mb-1">Username (student)</label>
                    <div className="flex bg-slate-950 border border-slate-800 rounded p-2"><User size={16} className="text-cyan-500 mr-2"/><input required defaultValue="student" className="bg-transparent text-white w-full outline-none text-sm"/></div>
                  </div>
                  <div className="mb-6">
                    <label className="text-xs text-slate-400 block mb-1">Password (zero2026)</label>
                    <div className="flex bg-slate-950 border border-slate-800 rounded p-2"><Key size={16} className="text-cyan-500 mr-2"/><input required type="password" defaultValue="zero2026" className="bg-transparent text-white w-full outline-none text-sm"/></div>
                  </div>
                  <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-2 rounded font-bold transition">Login & MFA Verify</button>
                </motion.form>
              )}

              {studentState === 'dashboard' && (
                <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto mt-10">
                  <h3 className="text-2xl font-bold text-white mb-6">Assigned Examinations</h3>
                  <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-bold text-cyan-300">{examData?.title || 'Loading...'}</h4>
                      <p className="text-sm text-slate-400 flex items-center gap-2 mt-1"><Clock size={14}/> Duration: 60 mins | Protected by Zero Trust</p>
                    </div>
                    <button onClick={() => setStudentState('exam')} className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded font-bold shadow-[0_0_15px_rgba(34,197,94,0.4)]">Start Exam</button>
                  </div>
                </motion.div>
              )}

              {studentState === 'exam' && (
                <motion.div key="exam" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto h-full flex flex-col">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-6">
                    <h3 className="text-xl font-bold text-cyan-300">{examData?.title}</h3>
                    <div className="text-red-400 font-mono text-xl flex items-center gap-2"><Clock/> 59:59</div>
                  </div>
                  <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-8">
                    <h4 className="text-lg text-white mb-6">Q1. {examData?.questions[0]?.text}</h4>
                    <div className="space-y-3">
                      {examData?.questions[0]?.options.map((opt, i) => (
                        <label key={i} className="flex items-center gap-3 p-4 border border-slate-700 rounded hover:bg-slate-800 cursor-pointer transition">
                          <input type="radio" name="q1" className="accent-cyan-500 w-4 h-4"/>
                          <span className="text-slate-200">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <button className="px-6 py-2 bg-slate-800 text-white rounded">Flag Question</button>
                    <button onClick={() => setStudentState('submitted')} className="px-8 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded">Submit Examination</button>
                  </div>
                </motion.div>
              )}

              {studentState === 'submitted' && (
                <motion.div key="submitted" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center justify-center h-full mt-20">
                  <CheckCircle size={80} className="text-green-500 mb-6 shadow-[0_0_30px_rgba(34,197,94,0.5)] rounded-full"/>
                  <h3 className="text-3xl font-bold text-white mb-2">Submission Successful</h3>
                  <p className="text-slate-400">Your encrypted answers have been securely transmitted.</p>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* FACULTY PORTAL */}
          {activePortal === 'faculty' && (
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-6">Faculty Dashboard</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-cyan-300 mb-4">Create Exam</h4>
                  <input type="text" placeholder="Exam Title" className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white mb-3"/>
                  <button className="w-full bg-cyan-600 text-white py-2 rounded font-bold">Publish to Secure Node</button>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-cyan-300 mb-4">Evaluate Submissions</h4>
                  <div className="flex justify-between items-center bg-slate-950 p-3 rounded mb-2 border border-slate-800">
                    <span className="text-slate-300">Anon-ID: 8X9F2A</span>
                    <button className="bg-green-600/50 text-green-200 px-3 py-1 rounded text-xs">Evaluate</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ADMIN PORTAL */}
          {activePortal === 'admin' && (
            <div className="max-w-5xl mx-auto h-full flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-6">Zero Trust Security Operations Center</h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                 <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-4"><Monitor className="text-cyan-500"/><div><div className="text-2xl font-bold text-white">124</div><div className="text-xs text-slate-400">Active Exams</div></div></div>
                 <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-4"><Users className="text-blue-500"/><div><div className="text-2xl font-bold text-white">4,092</div><div className="text-xs text-slate-400">Verified Nodes</div></div></div>
                 <div className="bg-red-950/30 border border-red-900/50 p-4 rounded-xl flex items-center gap-4"><AlertTriangle className="text-red-500 animate-pulse"/><div><div className="text-2xl font-bold text-red-400">3</div><div className="text-xs text-slate-400">Blocked Threats</div></div></div>
              </div>
              <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-4 overflow-y-auto">
                <h4 className="text-cyan-300 font-bold mb-4">Live Security Events</h4>
                <div className="space-y-2 font-mono text-xs">
                  <div className="bg-green-900/20 text-green-400 p-2 rounded">[10:42:01] LOGIN_SUCCESS - Node: student_1</div>
                  <div className="bg-red-900/20 text-red-400 p-2 rounded">[10:41:55] THREAT_DETECTED - Suspicious IP Blocked by Policy Engine</div>
                  <div className="bg-yellow-900/20 text-yellow-400 p-2 rounded">[10:40:12] MFA_CHALLENGE - New device context</div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
