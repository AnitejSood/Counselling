import React, { useState } from 'react';
import { Save, CheckCircle2, ShieldCheck, DollarSign, Clock, Tag, Plus, Trash2, Edit3, Package, Sparkles } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { formatINR } from '../../lib/formatters';

export const CounsellorProfileBuild = () => {
  const { counsellors, counsellorServices, addCounsellorService, updateCounsellorService, deleteCounsellorService } = useData();
  const counsellor = counsellors[0];

  const [bio, setBio] = useState(counsellor.bio);
  const [rate, setRate] = useState(counsellor.pricePerSession);
  const [saved, setSaved] = useState(false);
  const [notice, setNotice] = useState('');

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [srvForm, setSrvForm] = useState({
    title: '',
    description: '',
    price: 15000,
    duration: '1 Month',
    track: 'Study abroad admissions',
    featuresText: ''
  });

  const showMsg = (msg) => { setNotice(msg); setTimeout(() => setNotice(''), 3000); };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSaved(true);
    showMsg('Profile bio & baseline rates saved!');
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSaveServiceSubmit = (e) => {
    e.preventDefault();
    if (!srvForm.title || !srvForm.price) return;

    const features = srvForm.featuresText ? srvForm.featuresText.split('\n').filter(Boolean) : [
      '1-on-1 Consultation Call',
      'Custom Strategy Document'
    ];

    if (editingId) {
      updateCounsellorService(editingId, {
        title: srvForm.title,
        description: srvForm.description,
        price: parseInt(srvForm.price),
        duration: srvForm.duration,
        track: srvForm.track,
        features
      });
      showMsg('Service package updated!');
      setEditingId(null);
    } else {
      addCounsellorService({
        title: srvForm.title,
        description: srvForm.description,
        price: parseInt(srvForm.price),
        duration: srvForm.duration,
        track: srvForm.track,
        features
      });
      showMsg('New service & pricing package published to marketplace!');
    }

    setSrvForm({ title: '', description: '', price: 15000, duration: '1 Month', track: 'Study abroad admissions', featuresText: '' });
    setShowAddForm(false);
  };

  const handleStartEdit = (srv) => {
    setEditingId(srv.id);
    setSrvForm({
      title: srv.title,
      description: srv.description,
      price: srv.price,
      duration: srv.duration,
      track: srv.track || 'Study abroad admissions',
      featuresText: (srv.features || []).join('\n')
    });
    setShowAddForm(true);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Marketplace Identity & Offerings
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">My Profile & Services Pricing</h1>
        </div>
        
        <button 
          onClick={() => { setEditingId(null); setSrvForm({ title: '', description: '', price: 15000, duration: '1 Month', track: 'Study abroad admissions', featuresText: '' }); setShowAddForm(!showAddForm); }}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition"
        >
          <Plus className="w-4 h-4" /> Add Service Package
        </button>
      </div>

      {notice && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{notice}</span>
        </div>
      )}

      {/* Services & Packages Builder */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-emerald-600" /> Offered Service Packages & Pricing ({counsellorServices.length})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Students can book these exact service packages directly from your profile.</p>
          </div>
        </div>

        {/* Add / Edit Form */}
        {showAddForm && (
          <form onSubmit={handleSaveServiceSubmit} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">{editingId ? 'Edit Service Offering' : 'Create New Service & Pricing Offering'}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Service Title *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Comprehensive Admissions Package"
                  value={srvForm.title}
                  onChange={e => setSrvForm(p => ({ ...p, title: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Package Price (₹) *</label>
                <input
                  required
                  type="number"
                  placeholder="e.g. 25000"
                  value={srvForm.price}
                  onChange={e => setSrvForm(p => ({ ...p, price: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Duration</label>
                <input
                  type="text"
                  placeholder="e.g. 6 Months or 45 Mins"
                  value={srvForm.duration}
                  onChange={e => setSrvForm(p => ({ ...p, duration: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Specialization Track</label>
                <input
                  type="text"
                  placeholder="e.g. Study abroad admissions"
                  value={srvForm.track}
                  onChange={e => setSrvForm(p => ({ ...p, track: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-semibold focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 uppercase mb-1">Service Description</label>
                <input
                  type="text"
                  placeholder="e.g. Complete 6-month mentorship for top-tier US & UK university applications."
                  value={srvForm.description}
                  onChange={e => setSrvForm(p => ({ ...p, description: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 uppercase mb-1">Key Included Deliverables / Features (One per line)</label>
                <textarea
                  rows={3}
                  placeholder={"12 Strategy Calls\nUnlimited SOP Revisions\n8 University Shortlists"}
                  value={srvForm.featuresText}
                  onChange={e => setSrvForm(p => ({ ...p, featuresText: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-slate-200 rounded-xl text-xs font-bold">Cancel</button>
              <button type="submit" className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1">
                <Save className="w-4 h-4" /> Save Package
              </button>
            </div>
          </form>
        )}

        {/* Existing Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {counsellorServices.map(srv => (
            <div key={srv.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative group hover:border-emerald-300 transition">
              <div className="flex justify-between items-start">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase inline-block mb-1">
                    {srv.duration || 'Package'}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base">{srv.title}</h3>
                </div>
                <span className="text-lg font-black text-slate-900">{formatINR(srv.price)}</span>
              </div>

              <p className="text-xs text-slate-600">{srv.description}</p>

              {(srv.features || []).length > 0 && (
                <div className="space-y-1 pt-1 border-t border-slate-200/60">
                  {srv.features.map((feat, idx) => (
                    <div key={idx} className="text-[11px] text-slate-700 flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => handleStartEdit(srv)} className="p-1.5 rounded-lg bg-white border text-indigo-600 hover:bg-indigo-50 text-xs font-bold flex items-center gap-1">
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </button>
                <button onClick={() => { deleteCounsellorService(srv.id); showMsg('Service removed'); }} className="p-1.5 rounded-lg bg-white border text-rose-600 hover:bg-rose-50 text-xs font-bold flex items-center gap-1">
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bio Form */}
      <form onSubmit={handleSaveProfile} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-slate-500">Public Bio & Base Rates</h2>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Public Bio & Philosophy</label>
          <textarea 
            rows={4}
            value={bio}
            onChange={e => setBio(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none font-medium"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Starting Rate per 45-Min Session (₹)</label>
            <input 
              type="number"
              value={rate}
              onChange={e => setRate(parseInt(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-bold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Average Response Time Metric</label>
            <input 
              type="text"
              readOnly
              value={counsellor.responseTime}
              className="w-full bg-slate-100 border border-slate-200 rounded-xl p-3 text-xs text-slate-700 font-medium cursor-not-allowed"
            />
          </div>
        </div>

        <button type="submit" className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2">
          <Save className="w-4 h-4" /> Save Bio & Base Rates
        </button>
      </form>
    </div>
  );
};
