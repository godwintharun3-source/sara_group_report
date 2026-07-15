const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// SLIDE 6: Interactive Digital Examination System Live Demo

app.post('/api/auth/student', (req, res) => {
  const { username, password } = req.body;
  if (username === 'student' && password === 'zero2026') {
    return res.json({ success: true, token: 'demo-token-123', role: 'student' });
  }
  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

app.get('/api/student/exam', (req, res) => {
  res.json({
    id: 'exam-101',
    title: 'Cybersecurity Finals',
    questions: [
      { id: 1, text: 'What is the core principle of Zero Trust?', options: ['Implicit Trust', 'Never Trust, Always Verify', 'Perimeter Defense'], correct: 1 }
    ]
  });
});

app.get('/api/admin/events', (req, res) => {
  res.json([
    { id: 1, timestamp: new Date().toISOString(), type: 'LOGIN_SUCCESS', user: 'student_1' },
    { id: 2, timestamp: new Date(Date.now() - 5000).toISOString(), type: 'THREAT_DETECTED', details: 'Suspicious IP Blocked' }
  ]);
});

// SLIDE 7: Zero Trust Security Live Simulation

app.post('/api/auth/simulate', (req, res) => {
  const { scenario } = req.body;
  
  switch(scenario) {
    case 'A':
      return res.json({ riskScore: 10, decision: '🟢 ACCESS GRANTED', details: 'Normal Login: All checks passed.' });
    case 'B':
      return res.json({ riskScore: 65, decision: '🟡 RE-AUTHENTICATION REQUIRED', details: 'Suspicious Login: New device detected.' });
    case 'C':
      return res.json({ riskScore: 85, decision: '🔴 ACCESS DENIED', details: 'Least Privilege Violation: Attempted access to unreleased paper.' });
    case 'D':
      return res.json({ riskScore: 95, decision: '🔴 SESSION BLOCKED', details: 'Possible Compromise: Unusual location, multiple failed attempts.' });
    default:
      return res.status(400).json({ error: 'Unknown scenario' });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Zero Trust Backend API running on port ${PORT}`);
});
