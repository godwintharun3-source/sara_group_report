import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, ShieldAlert, Activity, RefreshCw } from 'lucide-react'

const scenarios = [
  { id: 'A', name: 'Normal Login', desc: 'Correct credentials, registered device, expected location.' },
  { id: 'B', name: 'Suspicious Login', desc: 'New device, different location, simultaneous login.' },
  { id: 'C', name: 'Unauthorized Access', desc: 'Student attempts to access an unreleased question paper.' },
  { id: 'D', name: 'Account Compromise', desc: 'Multiple failed attempts, unusual location, abnormal behavior.' }
]

const pipelineSteps = ['Request', 'Identity', 'Device', 'Location', 'Behavior', 'Risk Engine', 'Policy Engine', 'Decision']

export default function Slide7() {
  const [activeScenario, setActiveScenario] = useState(null)
  const [simulationState, setSimulationState] = useState(null)
  const [currentStep, setCurrentStep] = useState(-1)
  const [logs, setLogs] = useState([])

  const runSimulation = async (scenarioId) => {
    setActiveScenario(scenarioId)
    setSimulationState(null)
    setCurrentStep(-1)
    setLogs([])

    // Simulate pipeline visually
    for (let i = 0; i < pipelineSteps.length; i++) {
      await new Promise(r => setTimeout(r, 400))
      setCurrentStep(i)
      setLogs(prev => [...prev, `[PIPELINE] Analyzing: ${pipelineSteps[i]}...`])
    }

    // Fetch result from backend simulator
    try {
      const res = await fetch('http://localhost:5001/api/auth/simulate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario: scenarioId })
      })
      const data = await res.json()
      setSimulationState(data)
      setLogs(prev => [...prev, `[DECISION] ${data.decision}`, `[DETAILS] ${data.details}`])
    } catch(e) {
      // Fallback
      let fallbackData = { riskScore: 50, decision: 'API ERROR', details: 'Backend not running.' }
      if (scenarioId === 'A') fallbackData = { riskScore: 10, decision: '🟢 ACCESS GRANTED', details: 'Normal Login.' }
      if (scenarioId === 'B') fallbackData = { riskScore: 65, decision: '🟡 RE-AUTHENTICATION REQUIRED', details: 'Suspicious Login.' }
      if (scenarioId === 'C') fallbackData = { riskScore: 85, decision: '🔴 ACCESS DENIED', details: 'Least Privilege Violation.' }
      if (scenarioId === 'D') fallbackData = { riskScore: 95, decision: '🔴 SESSION BLOCKED', details: 'Possible Compromise.' }
      
      setSimulationState(fallbackData)
      setLogs(prev => [...prev, `[DECISION] ${fallbackData.decision}`, `[DETAILS] ${fallbackData.details}`])
    }
  }

  const resetSimulation = () => {
    setActiveScenario(null)
    setSimulationState(null)
    setCurrentStep(-1)
    setLogs([])
  }

  // Determine colors based on risk score
  const getRiskColor = (score) => {
    if (score < 30) return 'text-green-500 bg-green-500'
    if (score < 70) return 'text-yellow-500 bg-yellow-500'
    return 'text-red-500 bg-red-500'
  }

  return (
    <div className="w-full h-full flex flex-col pt-8">
      <h2 className="text-3xl font-bold text-cyan-400 text-center mb-6">Zero Trust Security Live Simulation</h2>
      
      <div className="flex flex-col lg:flex-row gap-6 h-[70vh]">
        
        {/* Scenarios Selection */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-bold text-white">Select Scenario</h3>
            <button onClick={resetSimulation} className="text-cyan-500 hover:text-cyan-300 flex items-center gap-1 text-sm"><RefreshCw size={14}/> Reset</button>
          </div>
          
          {scenarios.map(sc => (
            <button
              key={sc.id}
              onClick={() => runSimulation(sc.id)}
              disabled={currentStep > -1 && currentStep < pipelineSteps.length}
              className={`text-left p-4 rounded-xl border transition-all ${activeScenario === sc.id ? 'bg-cyan-900/50 border-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.2)]' : 'bg-slate-900/50 border-slate-700 hover:border-cyan-700 disabled:opacity-50'}`}
            >
              <h4 className="font-bold text-cyan-100 flex justify-between">Scenario {sc.id}: {sc.name} {activeScenario === sc.id && <Activity size={18} className="animate-pulse text-cyan-400"/>}</h4>
              <p className="text-sm text-slate-400 mt-1">{sc.desc}</p>
            </button>
          ))}
        </div>

        {/* Simulation Output Area */}
        <div className="w-full lg:w-2/3 flex flex-col gap-4">
          
          {/* Animated Decision Pipeline */}
          <div className="crystal-card p-4 overflow-hidden relative">
            <h4 className="text-sm text-slate-400 mb-4 font-bold uppercase tracking-wider">Policy Engine Pipeline</h4>
            <div className="flex flex-wrap gap-2 justify-center items-center">
              {pipelineSteps.map((step, idx) => {
                const isActive = currentStep === idx
                const isPassed = currentStep > idx
                return (
                  <React.Fragment key={step}>
                    <motion.div 
                      className={`px-3 py-1.5 rounded text-sm font-mono border transition-all ${isPassed ? 'bg-cyan-900/40 text-cyan-300 border-cyan-700' : isActive ? 'bg-cyan-500 text-slate-900 border-cyan-300 shadow-[0_0_10px_#00ffff]' : 'bg-slate-800 text-slate-500 border-slate-700'}`}
                    >
                      {step}
                    </motion.div>
                    {idx < pipelineSteps.length - 1 && <span className={`text-xs ${isPassed ? 'text-cyan-600' : 'text-slate-700'}`}>→</span>}
                  </React.Fragment>
                )
              })}
            </div>
          </div>

          {/* Results & Logs */}
          <div className="flex-1 flex gap-4 h-full">
            {/* Risk Meter */}
            <div className="w-1/3 crystal-card p-6 flex flex-col items-center justify-center relative">
              <h4 className="text-sm text-slate-400 font-bold uppercase mb-4">Risk Score</h4>
              <div className="relative w-32 h-32 rounded-full border-4 border-slate-800 flex items-center justify-center bg-slate-900">
                <AnimatePresence>
                  {simulationState && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute inset-0 flex flex-col items-center justify-center rounded-full"
                    >
                      <span className={`text-4xl font-extrabold ${getRiskColor(simulationState.riskScore).split(' ')[0]}`}>
                        {simulationState.riskScore}
                      </span>
                      <span className="text-xs text-slate-400">/ 100</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {simulationState && (
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mt-6 text-center font-bold text-lg">
                  {simulationState.decision}
                </motion.div>
              )}
            </div>

            {/* Security Logs */}
            <div className="w-2/3 bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-y-auto font-mono text-xs">
               <h4 className="text-cyan-500 mb-2 border-b border-slate-800 pb-2 flex items-center gap-2">
                 <ShieldAlert size={14}/> SECURITY LOGS
               </h4>
               <div className="space-y-1">
                 {logs.map((log, i) => (
                   <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className={log.includes('DECISION') ? 'text-white font-bold bg-slate-800 p-1 rounded mt-2' : log.includes('ACCESS DENIED') || log.includes('BLOCKED') ? 'text-red-400' : log.includes('RE-AUTHENTICATION') ? 'text-yellow-400' : 'text-slate-400'}>
                     {log}
                   </motion.div>
                 ))}
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
