import React from 'react';
import { Brain, Sparkles, Compass, Target } from 'lucide-react';

export const CalculationLoader = ({ message = "Analyzing Assessment Responses...", subMessage = "Mapping against O*NET & Psychometric Frameworks" }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center space-y-6 shadow-2xl border border-slate-200">
        
        {/* Animated Icon Ring */}
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin"></div>
          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <Brain className="w-7 h-7 animate-pulse" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <h3 className="text-base font-extrabold text-slate-900">{message}</h3>
          <p className="text-xs text-slate-500 font-medium">{subMessage}</p>
        </div>

        {/* Loading Progress Bar */}
        <div className="space-y-1">
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full animate-pulse"></div>
          </div>
          <span className="text-[10px] font-mono text-slate-400">Processing Psychometric Scoring Vector...</span>
        </div>

      </div>
    </div>
  );
};
