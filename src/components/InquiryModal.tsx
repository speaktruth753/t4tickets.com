import React, { useState } from 'react';
import { X, Phone, Mail, User, Calendar, MapPin, CheckCircle2, MessageSquare, Send } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle: string;
  defaultDestination?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  serviceTitle,
  defaultDestination = ''
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+966 5');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('2026-10-20');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      id="inquiry-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-100">
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 text-[#16A34A] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-xl font-black text-[#071A3D] font-heading">
              Inquiry Received Successfully!
            </h3>
            <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
              Thank you, <strong>{name}</strong>. Our certified travel consultant assigned to <strong>{serviceTitle}</strong> will contact you via WhatsApp or phone within 15 minutes.
            </p>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-left text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Official Travel Desk:</span>
                <span className="font-bold text-[#071A3D]">+966 50 267 4930</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Service Reference:</span>
                <span className="font-mono font-bold text-[#E53935]">REQ-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/966502674930?text=Hello%20T4Tickets,%20I%20inquired%20about%20${encodeURIComponent(serviceTitle)}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 rounded-xl bg-[#16A34A] text-white text-xs font-bold flex items-center justify-center gap-2 hover:brightness-110 shadow-sm"
              >
                <span>Chat Directly on WhatsApp</span>
              </a>
              <button
                onClick={handleReset}
                className="px-5 py-3 rounded-xl bg-[#071A3D] text-white text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#E53935]">
                Direct Consultant Desk
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#071A3D] font-heading mt-1">
                {serviceTitle}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Fill in your travel preferences and our Saudi-based travel advisory team will prepare your quotation.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Your Full Name *</label>
                <div className="flex items-center p-3 rounded-xl bg-gray-50 border border-gray-200">
                  <User className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Abdullah Al-Ghamdi"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent text-xs font-semibold text-[#071A3D] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp Mobile *</label>
                  <div className="flex items-center p-3 rounded-xl bg-gray-50 border border-gray-200">
                    <Phone className="w-4 h-4 text-gray-400 mr-2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-transparent text-xs font-semibold text-[#071A3D] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Target Travel Date</label>
                  <div className="flex items-center p-3 rounded-xl bg-gray-50 border border-gray-200">
                    <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-transparent text-xs font-semibold text-[#071A3D] outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                <div className="flex items-center p-3 rounded-xl bg-gray-50 border border-gray-200">
                  <Mail className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="email"
                    required
                    placeholder="name@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent text-xs font-semibold text-[#071A3D] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Specific Requirements or Preferred Airlines / Hotels
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Number of travelers, preferred cabin class, hotel category, or visa type..."
                  className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-[#071A3D] outline-none focus:border-[#071A3D]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="text-[11px] text-gray-400">
                  Desk Hotline: <span className="font-bold text-[#071A3D]">+966 50 267 4930</span>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D62828] to-[#E53935] hover:brightness-110 text-white font-black text-xs shadow-md shadow-[#D62828]/30 flex items-center gap-2"
                >
                  <span>Submit Request</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
