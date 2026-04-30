import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import ChaosDashboard from './pages/ChaosDashboard';

const Placeholder = ({ name }: { name: string }) => (
  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
    <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
    <p className="text-slate-400">The chaos experiment engine is currently synchronizing failure scenarios. This module will be available shortly.</p>
  </div>
);

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<ChaosDashboard />} />
          <Route path="/designer" element={<Placeholder name="Experiment Scenario Designer" />} />
          <Route path="/injections" element={<Placeholder name="Active Fault Injections" />} />
          <Route path="/slo" element={<Placeholder name="SLO & Performance Validation" />} />
          <Route path="/safety" element={<Placeholder name="Safety Guardrails & Rollback Logic" />} />
          <Route path="/analytics" element={<Placeholder name="Resilience ROI & Analytics" />} />
          <Route path="/hypotheses" element={<Placeholder name="Hypothesis Store & Findings" />} />
          <Route path="/rollbacks" element={<Placeholder name="Experiment Rollback History" />} />
          <Route path="/health" element={<Placeholder name="Cluster Health & Observability" />} />
          <Route path="/settings" element={<Placeholder name="Global Chaos Configuration" />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
