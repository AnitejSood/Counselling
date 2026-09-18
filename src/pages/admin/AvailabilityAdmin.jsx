import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Clock, Calendar, Save, CheckCircle, PlusCircle } from 'lucide-react';

export const AvailabilityAdmin = () => {
  const { availability, updateAvailability } = useData();
  const [config, setConfig] = useState(availability);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateAvailability(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleDay = (day) => {
    if (config.workingDays.includes(day)) {
      setConfig({ ...config, workingDays: config.workingDays.filter(d => d !== day) });
    } else {
      setConfig({ ...config, workingDays: [...config.workingDays, day] });
    }
  };

  return (
    <div className="space-y-8 w-full">
      
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600">Calendar & Scheduling Setup</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Counsellor Availability Configurator</h1>
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Availability schedule saved! Student booking calendar refreshed.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
        
        {/* Working Days */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">Working Days</label>
          <div className="flex flex-wrap gap-2">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
              const active = config.workingDays.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    active
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Working Hours & Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Start Time</label>
            <input
              type="time"
              value={config.hours.start}
              onChange={(e) => setConfig({ ...config, hours: { ...config.hours, start: e.target.value } })}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">End Time</label>
            <input
              type="time"
              value={config.hours.end}
              onChange={(e) => setConfig({ ...config, hours: { ...config.hours, end: e.target.value } })}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Session Duration (mins)</label>
            <input
              type="number"
              value={config.sessionDurationMinutes}
              onChange={(e) => setConfig({ ...config, sessionDurationMinutes: parseInt(e.target.value) || 45 })}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Break Between Sessions (mins)</label>
            <input
              type="number"
              value={config.breakMinutes}
              onChange={(e) => setConfig({ ...config, breakMinutes: parseInt(e.target.value) || 15 })}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
            />
          </div>
        </div>

        {/* Time Slots Preview */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-700">Active Bookable Time Slots</label>
          <div className="flex flex-wrap gap-2 text-xs">
            {config.timeSlots.map((slot, i) => (
              <span key={i} className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-800 font-bold border border-purple-100">
                {slot}
              </span>
            ))}
          </div>
        </div>

        {/* Blocked Holidays */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-700">Configured Holidays / Out of Office</label>
          <div className="space-y-1 text-xs">
            {config.holidays.map((h, i) => (
              <div key={i} className="flex justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900">{h.date}</span>
                <span className="text-slate-600">{h.reason}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Availability Settings
          </button>
        </div>

      </form>

    </div>
  );
};
