import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { 
  FlaskConical, 
  Activity, 
  ShieldAlert, 
  RotateCcw, 
  Play, 
  Zap,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Skull
} from 'lucide-react';

const resilienceData = [
  { day: 'Mon', score: 82, experiments: 4 },
  { day: 'Tue', score: 85, experiments: 6 },
  { day: 'Wed', score: 78, experiments: 8 },
  { day: 'Thu', score: 91, experiments: 5 },
  { day: 'Fri', score: 88, experiments: 3 },
  { day: 'Sat', score: 92, experiments: 2 },
  { day: 'Sun', score: 94, experiments: 1 },
];

const KPI_CARDS = [
  { title: 'Resilience Score', value: '92/100', trend: '+4% from last audit', color: 'rose', icon: TrendingUp },
  { title: 'Active Experiments', value: '4', trend: 'Network & Resource failure', color: 'amber', icon: Zap },
  { title: 'Recovery Success', value: '99.2%', trend: 'Auto-rollback functional', color: 'emerald', icon: ShieldCheck },
  { title: 'Hypotheses Proven', value: '142', trend: 'Critical vulnerabilities fixed', color: 'rose', icon: Skull },
];

const ChaosDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Chaos Experimentation Hub</h1>
          <p className="text-slate-400">Driving system reliability through controlled failure injection and hypothesis validation.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2">
            <FlaskConical size={16} /> New Experiment
          </button>
          <button className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2">
            <Play size={16} /> Run Global Resilience Audit
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((card) => (
          <div key={card.title} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-2 bg-${card.color}-600/10 rounded-lg`}>
                <card.icon className={`w-6 h-6 text-${card.color}-400`} />
              </div>
              <div className={`text-xs font-medium text-slate-400`}>
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-500 font-medium">{card.title}</p>
              <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resilience Trend Chart */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">System Resilience Index (SRI)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={resilienceData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="score" stroke="#f43f5e" fill="url(#colorScore)" name="Resilience Score" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Injections */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Active Injections</h3>
            <span className="bg-rose-500/10 text-rose-400 text-xs px-2 py-1 rounded border border-rose-500/20">BLAST RADIUS: MINIMAL</span>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-4">
            {[
              { type: 'Network Latency', target: 'Payment-SVC', status: 'Injected', detail: '200ms delay added to egress traffic' },
              { type: 'Pod Termination', target: 'Auth-API-Cluster', status: 'Running', detail: 'Random pod kill (1/10 interval)' },
              { type: 'CPU Exhaustion', target: 'Worker-Nodes-V3', status: 'Pending', detail: 'Stress-test to 95% utilization' },
              { type: 'DNS Failure', target: 'Global-Ingress', status: 'Rollback', detail: 'Simulated DNS resolution errors' },
            ].map((event, i) => (
              <div key={i} className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    {event.status === 'Rollback' ? <RotateCcw className="w-4 h-4 text-amber-500" /> : <Zap className="w-4 h-4 text-rose-500" />}
                    <span className="font-semibold text-sm text-slate-200">{event.type}</span>
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    event.status === 'Injected' ? 'bg-rose-500/10 text-rose-400' : 
                    event.status === 'Rollback' ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-800 text-slate-500'
                  }`}>{event.status}</span>
                </div>
                <p className="text-sm text-slate-300 mb-1">{event.target}</p>
                <p className="text-xs text-slate-500 italic">{event.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Experiment Scenarios */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Experiment Library (Production-Safe)</h3>
          <button className="text-rose-400 hover:text-rose-300 text-sm font-medium">Browse Templates</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Scenario Name</th>
                <th className="px-6 py-4 font-semibold">Hypothesis</th>
                <th className="px-6 py-4 font-semibold">Risk Score</th>
                <th className="px-6 py-4 font-semibold">Safety Guardrail</th>
                <th className="px-6 py-4 font-semibold">Last Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { name: 'Multi-AZ DB Failover', hyp: 'App recovers within 30s', risk: 'Medium', safety: 'No prod impact allowed', result: 'PASSED' },
                { name: 'Auth Token Latency', hyp: 'Circuit breaker trips at 500ms', risk: 'Low', safety: 'Scoped to staging only', result: 'FAILED' },
                { name: 'S3 Regional Outage', hyp: 'Failover to secondary bucket', risk: 'High', safety: 'Requires VP Approval', result: 'NOT RUN' },
                { name: 'Redis Cache Purge', hyp: 'DB handles sudden load spike', risk: 'Low', safety: 'Automated throttle active', result: 'PASSED' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FlaskConical className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-300">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{row.hyp}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                      row.risk === 'High' ? 'bg-rose-500/10 text-rose-400' : 
                      row.risk === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'
                    }`}>{row.risk}</span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500 font-mono italic">{row.safety}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {row.result === 'PASSED' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : 
                       row.result === 'FAILED' ? <AlertTriangle className="w-4 h-4 text-rose-500" /> : <Activity className="w-4 h-4 text-slate-600" />}
                      <span className="text-xs font-bold text-slate-300">{row.result}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ChaosDashboard;
