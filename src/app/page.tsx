"use client";

import React, { useState, useMemo, useEffect, useCallback, memo } from "react";
import { CATEGORIES, PLATFORMS } from "@/constants";

// 1. MEMOIZED LEAD CARD (Absolute Performance)
const LeadCard = memo(({ lead, index, onStatusUpdate }: { lead: any, index: number, onStatusUpdate: any }) => (
  <div className="bg-white border border-slate-200/60 rounded-3xl p-5 md:p-6 hover:border-indigo-400/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12 relative overflow-hidden mb-4">
    <div className="absolute top-0 left-0 bg-slate-100 text-slate-400 text-[9px] font-black px-2 py-1 rounded-br-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">#{index}</div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-3 mb-1.5 mt-2 md:mt-0">
        <h3 className="text-[17px] font-black text-slate-800 tracking-tight truncate group-hover:text-indigo-600 transition-colors leading-none">{lead.name}</h3>
        <div className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-2.5 py-1 rounded-lg border border-indigo-100 uppercase tracking-tighter leading-none">#{lead.category}</div>
        <div className="flex items-center text-amber-500 text-[13px] font-black bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100 leading-none">
          {lead.rating} ★ <span className="text-slate-400 font-bold ml-1 text-[10px]">({lead.reviews_count || 0})</span>
        </div>
        {lead.pipeline_status !== 'New' && (
          <div className={`text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-widest ${lead.pipeline_status === 'Contacted' ? 'bg-indigo-100 text-indigo-600' : 'bg-rose-100 text-red-600'}`}>
            {lead.pipeline_status}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 text-slate-500 text-xs font-bold leading-relaxed mb-3">
        <svg className="w-4 h-4 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lead.name + ' ' + lead.address)}`} target="_blank" className="hover:text-indigo-600 transition-colors underline decoration-slate-200 underline-offset-4 truncate">{lead.address}</a>
      </div>
      <div className="flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
        <button onClick={() => onStatusUpdate(lead.id, 'Contacted')} className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase hover:bg-indigo-600 hover:text-white transition-all shadow-sm">Mark Contacted</button>
        <button onClick={() => onStatusUpdate(lead.id, 'Interesting')} className="px-3 py-1.5 bg-rose-50 text-rose-600 rounded-lg text-[10px] font-black uppercase hover:bg-rose-600 hover:text-white transition-all shadow-sm">High Priority</button>
      </div>
    </div>

    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-10 shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
      <div className="flex flex-col md:items-end gap-2 min-w-0 md:min-w-45">
        <a href={`tel:${lead.phone}`} className="text-[15px] font-black text-slate-800 hover:text-indigo-600 transition-all font-mono tracking-tighter flex items-center justify-center md:justify-end gap-2.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 leading-none">
          {lead.phone || 'MISSING_CONTACT'}
        </a>
        <a href={`mailto:${lead.email}`} className="text-[11px] font-black text-indigo-500 hover:text-indigo-700 transition-colors lowercase tracking-tight flex items-center justify-center md:justify-end gap-2.5 underline decoration-indigo-100 underline-offset-8 leading-none">
          <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          {lead.email || 'B2B Verified Contact'}
        </a>
      </div>

      <div className="flex gap-2.5 justify-center">
        <a href={lead.website} target="_blank" className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center border border-slate-200 hover:bg-indigo-600 hover:border-indigo-500 hover:text-white transition-all shadow-sm group/icon">
          <svg className="w-5 h-5 text-slate-400 group-hover/icon:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9h18"></path></svg>
        </a>
        <a href={`https://wa.me/${lead.phone?.replace(/\D/g, '')}`} target="_blank" className="w-11 h-11 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100 hover:bg-emerald-600 hover:border-emerald-500 hover:text-white transition-all shadow-sm group/icon">
          <svg className="w-5 h-5 text-emerald-600 group-hover/icon:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.438-9.89 9.886-.001 2.15.633 4.192 1.815 5.834l-1.104 4.036 6.179-1.618z"></path></svg>
        </a>
      </div>

      <div className="flex gap-2">
        <div className={`px-4 py-2.5 rounded-2xl border-2 text-center min-w-[90px] flex flex-col justify-center ${lead.verification_status === 'Verified' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
          <div className="text-[12px] font-black uppercase tracking-tight leading-none">{lead.verification_status || 'Unverified'}</div>
          <div className="text-[7px] font-black tracking-widest opacity-50 uppercase mt-1 leading-none">Deliverability</div>
        </div>

        <div className={`px-4 py-2.5 rounded-2xl border-2 text-center min-w-[90px] flex flex-col justify-center ${lead.quality_score === 'High' ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-lg shadow-indigo-500/5' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
          <div className="text-[12px] font-black uppercase tracking-tight leading-none">{lead.quality_score}</div>
          <div className="text-[7px] font-black tracking-widest opacity-50 uppercase mt-1 leading-none">Trust Score</div>
        </div>
      </div>
    </div>
    <div className="absolute left-0 top-0 w-1.5 h-full bg-linear-to-b from-indigo-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
  </div>
));
LeadCard.displayName = 'LeadCard';

// 2. MAIN APP
export default function Home() {
  const [selectedPlatform, setSelectedPlatform] = useState(PLATFORMS[0]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [customKeywords, setCustomKeywords] = useState("");
  const [location, setLocation] = useState("");
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [missionStatus, setMissionStatus] = useState({ status: "Idle", last_mission: null });
  const [showUnverified, setShowUnverified] = useState(false);

  // Production Fallback to ensure it always works
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://growzix-leads-backend.hf.space";

  useEffect(() => {
    fetchLeads();
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`${API_BASE}/status`);
        const data = await response.json();
        setMissionStatus(data);
        if (data.status === "Idle") fetchLeads();
      } catch (e) {
        console.error("Status check failed");
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [API_BASE]);

  const fetchLeads = async () => {
    try {
      const response = await fetch(`${API_BASE}/leads`);
      const data = await response.json();
      if (data.status === "success") setLeads(data.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const wipeData = async () => {
    if (!confirm("Are you sure? This will delete ALL previous leads.")) return;
    try {
      await fetch(`${API_BASE}/leads/clear`, { method: "DELETE" });
      setLeads([]);
      alert("Database Cleared!");
    } catch (error) {
      alert("Failed to clear database.");
    }
  };

  const verifyAll = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/leads/verify-all`, { method: "POST" });
      const data = await response.json();
      if (data.status === "success") {
        alert(data.message);
      }
    } catch (error) {
      alert("Verification Failed.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = useCallback(async (leadId: number, status: string) => {
    try {
      const response = await fetch(`${API_BASE}/leads/${leadId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        setLeads(prev => prev.map(l => l.id === leadId ? { ...l, pipeline_status: status } : l));
      }
    } catch (error) {
      console.error("Status update error:", error);
    }
  }, [API_BASE]);

  const { latestLeads, historicalLeads, unverifiedLeads } = useMemo(() => {
    if (leads.length === 0) return { latestLeads: [], historicalLeads: [], unverifiedLeads: [] };
    
    const filterFn = (l: any) => 
      l.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.address?.toLowerCase().includes(searchTerm.toLowerCase());

    const filtered = leads.filter(filterFn);
    
    const verified = filtered.filter(l => l.verification_status === 'Verified');
    const unverified = filtered.filter(l => l.verification_status !== 'Verified');

    if (verified.length === 0) return { latestLeads: [], historicalLeads: [], unverifiedLeads: unverified };

    const sortedVerified = [...verified].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    const latestTime = new Date(sortedVerified[0].created_at).getTime();
    
    const latest = sortedVerified.filter(l => (latestTime - new Date(l.created_at).getTime()) < 10 * 60 * 1000);
    const historical = sortedVerified.filter(l => !latest.includes(l));

    return { latestLeads: latest, historicalLeads: historical, unverifiedLeads: unverified };
  }, [leads, searchTerm]);

  const stats = useMemo(() => ({
    total: leads.length,
    gold: leads.filter(l => l.quality_score === 'High').length,
    emails: leads.filter(l => l.email && l.email !== 'N/A').length,
  }), [leads]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const startScraping = async () => {
    const allKeywords = [...selectedCategories, ...customKeywords.split('\n').map(k => k.trim()).filter(k => k)];
    if (!location || allKeywords.length === 0) return alert("Enter Location & Keywords");
    setLoading(true);
    setMobileMenuOpen(false);
    try {
      await fetch(`${API_BASE}/scrape`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform: selectedPlatform, categories: allKeywords, location, max_leads: 300 }),
      });
      alert("Scan started! Results will populate automatically.");
    } catch (error) {
      alert("Error starting scan.");
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    const headers = ["Name", "Phone", "Email", "Website", "Address", "Category", "Rating", "Reviews"];
    const rows = [headers.join(","), ...leads.map(l => [
      `"${l.name}"`, `"${l.phone || ''}"`, `"${l.email || ''}"`, `"${l.website || ''}"`, `"${l.address || ''}"`, `"${l.category}"`, `"${l.rating}"`, `"${l.reviews_count || 0}"`
    ].join(","))];
    const blob = new Blob(["\uFEFF" + rows.join("\n")], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `Leads_Export_${new Date().getTime()}.csv`;
    a.click();
  };

  return (
    <main className="flex flex-col lg:flex-row h-screen bg-white text-slate-700 font-sans overflow-hidden text-sm">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white p-4 flex items-center justify-between border-b border-slate-200 shrink-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg"><svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div>
          <h1 className="text-sm font-black text-slate-800 uppercase italic">LeadAgent<span className="text-indigo-600">PRO</span></h1>
        </div>
        <div className="flex items-center gap-2">
           <button onClick={exportCSV} className="p-2 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg></button>
           <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-600"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path></svg></button>
        </div>
      </div>

      {/* Sidebar - Modern Light */}
      <aside className={`fixed inset-y-0 left-0 w-80 lg:relative lg:w-96 bg-slate-50 border-r border-slate-200 flex flex-col shadow-2xl lg:shadow-none z-40 transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-8 border-b border-slate-200 hidden lg:block bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg"><svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div>
            <h1 className="text-xl font-black text-slate-800 uppercase italic">LeadAgent<span className="text-indigo-600">PRO</span></h1>
          </div>
          <p className="text-[10px] mt-2 font-bold text-slate-400 uppercase tracking-widest">Quantum B2B Harvester</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Source Engine</label>
              <select className="w-full bg-white border border-slate-200 rounded-xl p-3.5 text-xs font-bold focus:ring-2 focus:ring-indigo-600 outline-none" value={selectedPlatform} onChange={(e) => setSelectedPlatform(e.target.value)}>
                {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Targets</label>
              <textarea placeholder="Keywords..." className="w-full bg-white border border-slate-200 rounded-xl p-3.5 text-xs font-bold focus:ring-2 focus:ring-indigo-600 outline-none min-h-24" value={customKeywords} onChange={(e) => setCustomKeywords(e.target.value)} />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Zone</label>
              <textarea placeholder="Location..." className="w-full bg-white border border-slate-200 rounded-xl p-3.5 text-xs font-bold focus:ring-2 focus:ring-indigo-600 outline-none min-h-24" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block border-b border-slate-200 pb-2">Top Sectors</label>
            <div className="grid grid-cols-1 gap-2">
              {Object.values(CATEGORIES).flat().slice(0, 8).map(cat => (
                <label key={cat} className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${selectedCategories.includes(cat) ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'}`}>
                  <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => handleCategoryToggle(cat)} className="hidden" />
                  <span className="text-[11px] font-bold">{cat}</span>
                  <div className={`w-3.5 h-3.5 rounded border-2 flex items-center justify-center ${selectedCategories.includes(cat) ? 'bg-white border-white' : 'border-slate-300'}`}>
                    {selectedCategories.includes(cat) && <div className="w-1.5 h-1.5 bg-indigo-600 rounded-sm animate-pulse"></div>}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border-t border-slate-200">
          <div className="grid grid-cols-2 gap-3 mb-4">
             <button onClick={verifyAll} disabled={missionStatus.status !== "Idle"} className="py-2.5 bg-emerald-50 text-emerald-700 rounded-xl font-bold text-[10px] uppercase tracking-wider border border-emerald-100 hover:bg-emerald-600 hover:text-white disabled:opacity-50 transition-all">Verify All</button>
             <button onClick={wipeData} className="py-2.5 bg-rose-50 text-rose-700 rounded-xl font-bold text-[10px] uppercase tracking-wider border border-rose-100 hover:bg-rose-600 hover:text-white transition-all">Wipe DB</button>
          </div>
          <button onClick={startScraping} disabled={loading || missionStatus.status !== "Idle"} className={`w-full py-4.5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl ${loading || missionStatus.status !== "Idle" ? 'bg-slate-100 text-slate-400' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'}`}>
            {missionStatus.status === "Scanning" ? "Scanning..." : missionStatus.status === "Verifying" ? "Verifying..." : "Initialize Scan"}
          </button>
        </div>
      </aside>

      {/* Main Panel */}
      <section className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="hidden lg:flex h-20 border-b border-slate-200 px-10 items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-10">
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tighter uppercase italic leading-none">ControlHub</h2>
              <div className="flex items-center gap-2 mt-1.5">
                {missionStatus.status !== "Idle" ? (
                  <span className="flex items-center gap-1.5 text-[9px] font-black text-rose-600 uppercase tracking-widest animate-pulse">
                    <span className="w-2 h-2 bg-rose-600 rounded-full"></span>
                    Mission: {missionStatus.status}
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-[9px] font-black text-emerald-600 uppercase tracking-widest">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                    System Idle
                  </span>
                )}
              </div>
            </div>
            <input type="text" placeholder="Search leads..." className="w-80 bg-slate-50 border border-slate-200 rounded-2xl py-3 px-6 text-[11px] font-bold text-slate-700 focus:ring-2 focus:ring-indigo-600 outline-none" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <button onClick={exportCSV} className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl flex items-center gap-3">
             <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
             Download CSV
          </button>
        </header>

        <div className="bg-[#F8FAFC] border-b border-slate-200 px-6 lg:px-10 py-5 flex gap-10 lg:gap-20 overflow-x-auto shrink-0 no-scrollbar shadow-inner">
          {[
            { label: "Total Data", val: stats.total, color: "text-slate-900" },
            { label: "Elite Gold", val: stats.gold, color: "text-emerald-600" },
            { label: "Verified Emails", val: stats.emails, color: "text-indigo-600" },
          ].map((s, i) => (
            <div key={i} className="flex flex-col min-w-max">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</span>
              <span className={`text-2xl font-black tracking-tighter leading-none ${s.color}`}>{s.val}</span>
            </div>
          ))}
        </div>

        <div className="flex-1 overflow-auto p-4 lg:p-10 custom-scrollbar bg-white">
          <div className="max-w-6xl mx-auto">
            {/* View Selection Tabs */}
            <div className="flex gap-6 mb-10 border-b border-slate-100 pb-4">
              <button 
                onClick={() => setShowUnverified(false)}
                className={`text-xs font-black uppercase tracking-widest transition-all ${!showUnverified ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                💎 Diamond Intelligence ({latestLeads.length + historicalLeads.length})
              </button>
              <button 
                onClick={() => setShowUnverified(true)}
                className={`text-xs font-black uppercase tracking-widest transition-all ${showUnverified ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                📂 Raw Data Pool ({unverifiedLeads.length})
              </button>
            </div>

            {!showUnverified ? (
              <>
                {latestLeads.length > 0 && (
                  <div className="mb-12">
                    <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">Newly Secured Diamonds</h3>
                    {latestLeads.map((l, i) => <LeadCard key={l.id} lead={l} index={i+1} onStatusUpdate={updateStatus} />)}
                  </div>
                )}
                {historicalLeads.length > 0 && (
                  <div>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Diamond Archive</h3>
                    {historicalLeads.map((l, i) => <LeadCard key={l.id} lead={l} index={latestLeads.length + i + 1} onStatusUpdate={updateStatus} />)}
                  </div>
                )}
                {latestLeads.length === 0 && historicalLeads.length === 0 && (
                  <div className="h-64 flex flex-col items-center justify-center text-center">
                    <div className="text-slate-300 uppercase font-black tracking-[0.2em] text-xs italic mb-4">No Diamonds Secured Yet</div>
                    <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Click 'Verify All' to process raw data or start a new scan.</p>
                  </div>
                )}
              </>
            ) : (
              <div className="animate-in fade-in duration-300">
                <div className="mb-8 p-4 bg-amber-50 border border-amber-100 rounded-2xl">
                   <p className="text-[10px] text-amber-700 font-bold uppercase tracking-widest leading-relaxed">
                     ⚠️ These leads haven't been verified yet. Use the 'Verify All' button to find their 'Diamond' emails and move them to the main workspace.
                   </p>
                </div>
                {unverifiedLeads.map((l, i) => <LeadCard key={l.id} lead={l} index={i+1} onStatusUpdate={updateStatus} />)}
                {unverifiedLeads.length === 0 && (
                  <div className="h-64 flex items-center justify-center text-slate-300 uppercase font-black tracking-[0.2em] text-xs italic">Archive Empty</div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #6366f1; border-radius: 10px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        @keyframes fade-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: fade-up 0.3s ease-out forwards; }
      `}</style>
    </main>
  );
}
