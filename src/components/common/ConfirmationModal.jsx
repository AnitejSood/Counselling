import React from 'react';
import { AlertTriangle, CheckCircle2, Trash2, X, AlertCircle } from 'lucide-react';

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed with this action?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger', // 'danger' | 'warning' | 'primary' | 'success'
  isProcessing = false
}) => {
  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      icon: Trash2,
      iconBg: 'bg-rose-50 text-rose-600 border border-rose-200',
      btn: 'bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20'
    },
    warning: {
      icon: AlertTriangle,
      iconBg: 'bg-amber-50 text-amber-700 border border-amber-200',
      btn: 'bg-[#CFA25E] hover:bg-[#b88c49] text-[#0B2545] font-extrabold shadow-md'
    },
    primary: {
      icon: AlertCircle,
      iconBg: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
      btn: 'bg-[#0B2545] hover:bg-[#133E6D] text-white shadow-md'
    },
    success: {
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
      btn: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
    }
  };

  const currentVariant = variantStyles[variant] || variantStyles.primary;
  const Icon = currentVariant.icon;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-5 animate-in zoom-in-95 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${currentVariant.iconBg}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="space-y-1 pr-6">
            <h3 className="text-base font-extrabold text-slate-900">{title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            disabled={isProcessing}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition cursor-pointer disabled:opacity-50 flex items-center gap-1.5 ${currentVariant.btn}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
