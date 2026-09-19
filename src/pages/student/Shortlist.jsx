import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Bookmark, Trash2, CheckCircle, ArrowRightLeft, Sparkles } from 'lucide-react';

export const Shortlist = () => {
  const { shortlists, removeFromShortlist, recommendations, counsellors, counsellorSwitchState } = useData();
  const [selectedForCompare, setSelectedForCompare] = useState([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  const assignedCounsellor = counsellors?.find(c => c.id === counsellorSwitchState?.assignedCounsellorId) || counsellors?.[0];
  const counsellorName = assignedCounsellor?.fullName || 'Assigned Counsellor';

  const toggleCompareSelect = (item) => {
    if (selectedForCompare.some(i => i.id === item.id)) {
      setSelectedForCompare(selectedForCompare.filter(i => i.id !== item.id));
    } else {
      if (selectedForCompare.length < 3) {
        setSelectedForCompare([...selectedForCompare, item]);
      }
    }
  };

  // Find rich recommendation data corresponding to shortlist items if available
  const compareItemsRich = selectedForCompare.map(sl => {
    const matchedRec = recommendations.find(r => r.name === sl.name || r.id === sl.itemId);
    return {
      name: sl.name,
      country: sl.country,
      tuition: sl.tuition,
      intake: sl.intake,
      deadline: sl.deadline,
      counsellorNotes: sl.counsellorNotes,
      pros: matchedRec?.pros || [],
      whyRecommend: matchedRec?.whyIRecommendThis || ''
    };
  });

  return (
    <div className="space-y-8 w-full">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Saved Options</span>
          <h1 className="text-2xl font-extrabold text-slate-900">My Shortlist & Comparator</h1>
        </div>

        {selectedForCompare.length >= 2 && (
          <button
            onClick={() => setCompareModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span>Compare Selected ({selectedForCompare.length} of 3)</span>
          </button>
        )}
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <p className="text-xs text-slate-500 font-medium">
          Select up to 3 shortlisted items to launch the side-by-side metric comparison tool.
        </p>

        <div className="space-y-3">
          {shortlists.map((item) => {
            const isSelected = selectedForCompare.some(i => i.id === item.id);
            return (
              <div key={item.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleCompareSelect(item)}
                    className="mt-1 rounded text-blue-600"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">{item.country}</span>
                    <h3 className="text-base font-bold text-slate-900">{item.name}</h3>
                    <p className="text-xs text-slate-500">Tuition: {item.tuition} • Intake: {item.intake} • Deadline: {item.deadline}</p>
                    {item.counsellorNotes && (
                      <p className="text-xs text-slate-700 italic mt-1">"{counsellorName}: {item.counsellorNotes}"</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => removeFromShortlist(item.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3-Way Comparator Modal */}
      {compareModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase text-blue-600">Metric Comparison Tool</span>
                <h3 className="text-xl font-bold text-slate-900">Side-by-Side Shortlist Evaluation</h3>
              </div>
              <button
                onClick={() => setCompareModalOpen(false)}
                className="px-3 py-1 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {compareItemsRich.map((item, idx) => (
                <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 text-xs">
                  <div className="border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-bold text-blue-600 uppercase">{item.country}</span>
                    <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-600 uppercase block">Tuition:</span>
                    <span className="font-bold text-[#0B2545]">{item.tuition}</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-600 uppercase block">Target Intake:</span>
                    <span className="font-semibold text-slate-800">{item.intake}</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-600 uppercase block">Deadline:</span>
                    <span className="font-semibold text-rose-600">{item.deadline}</span>
                  </div>

                  {item.whyRecommend && (
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
                      <span className="text-[10px] font-bold text-blue-800 uppercase block">Counsellor Rationale:</span>
                      <p className="italic text-slate-700">{item.whyRecommend}</p>
                    </div>
                  )}

                  {item.pros.length > 0 && (
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase block">Key Advantages:</span>
                      <ul className="space-y-1 text-slate-700">
                        {item.pros.map((p, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
