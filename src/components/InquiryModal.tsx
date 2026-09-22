import React, { useState } from 'react';
import { X, Phone, Mail, User, Calendar, CheckCircle2, MessageSquare, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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
  const { language, isRTL } = useLanguage();
  const fontClass = language === 'UR' ? 'font-nastaliq' : language === 'AR' ? 'font-arabic' : 'font-sans';

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

  const badgeText =
    language === 'UR'
      ? 'ڈائریکٹ کنسلٹنٹ ڈیسک'
      : language === 'AR'
      ? 'مكتب الاستشارات المباشر'
      : 'Direct Consultant Desk';

  const subtitleText =
    language === 'UR'
      ? 'اپنی سفری ترجیحات درج کریں اور سعودی عرب میں قائم ہماری ٹریول ایڈوائزری ٹیم آپ کے لیے بہترین کوٹیشن تیار کرے گی۔'
      : language === 'AR'
      ? 'أدخل متطلبات وتفضيلات سفرك ليقوم فريق مستشارينا المعتمدين في المملكة بإعداد أفضل عرض سعر لك.'
      : 'Fill in your travel preferences and our Saudi-based travel advisory team will prepare your quotation.';

  const successHeading =
    language === 'UR'
      ? 'آپ کی انکوائری کامیابی سے موصول ہو گئی ہے!'
      : language === 'AR'
      ? 'تم استلام طلبك واستفسارك بنجاح!'
      : 'Inquiry Received Successfully!';

  const successDesc =
    language === 'UR'
      ? `شکریہ، محترم ${name}۔ سروس "${serviceTitle}" کے لیے تفویض کردہ ہمارے مصدقہ ٹریول کنسلٹنٹ 15 منٹ کے اندر واٹس ایپ یا فون پر آپ سے رابطہ کریں گے۔`
      : language === 'AR'
      ? `شكراً لك، أستاذ ${name}. سيقوم مستشار السفر المعتمد المخصص لخدمة "${serviceTitle}" بالتواصل معك عبر الواتساب أو الهاتف خلال 15 دقيقة.`
      : `Thank you, ${name}. Our certified travel consultant assigned to ${serviceTitle} will contact you via WhatsApp or phone within 15 minutes.`;

  const deskLabel =
    language === 'UR' ? 'آفیشل ٹریول ڈیسک:' : language === 'AR' ? 'المكتب الرسمي للسياحة:' : 'Official Travel Desk:';
  const refLabel =
    language === 'UR' ? 'درخواست کا حوالہ نمبر:' : language === 'AR' ? 'رقم مرجع الطلب:' : 'Service Reference:';
  const whatsappCta =
    language === 'UR'
      ? 'واٹس ایپ پر براہ راست چیٹ کریں'
      : language === 'AR'
      ? 'تواصل مباشرة عبر الواتساب'
      : 'Chat Directly on WhatsApp';
  const closeLabel =
    language === 'UR' ? 'بند کریں' : language === 'AR' ? 'إغلاق' : 'Close';

  const nameLabel =
    language === 'UR' ? 'آپ کا مکمل نام *' : language === 'AR' ? 'الاسم الكامل *' : 'Your Full Name *';
  const phoneLabel =
    language === 'UR' ? 'واٹس ایپ / موبائل نمبر *' : language === 'AR' ? 'رقم الواتساب / الجوال *' : 'WhatsApp Mobile *';
  const dateLabel =
    language === 'UR' ? 'سفر کی متوقع تاریخ' : language === 'AR' ? 'تاريخ السفر المستهدف' : 'Target Travel Date';
  const emailLabel =
    language === 'UR' ? 'ای میل ایڈریس *' : language === 'AR' ? 'البريد الإلكتروني *' : 'Email Address *';
  const notesLabel =
    language === 'UR'
      ? 'خصوصی ضروریات، ایئر لائن یا ہوٹل کی ترجیحات'
      : language === 'AR'
      ? 'متطلبات خاصة أو شركة طيران / فنادق مفضلة'
      : 'Specific Requirements or Preferred Airlines / Hotels';
  const notesPlaceholder =
    language === 'UR'
      ? 'مسافروں کی تعداد، کیبن کلاس، پسندیدہ ہوٹل، یا ویزا کی قسم...'
      : language === 'AR'
      ? 'عدد المسافرين، فئة المقعد، تصنيف الفندق، أو نوع التأشيرة...'
      : 'Number of travelers, preferred cabin class, hotel category, or visa type...';
  const submitLabel =
    language === 'UR' ? 'درخواست جمع کروائیں' : language === 'AR' ? 'إرسال الطلب' : 'Submit Request';
  const hotlineLabel =
    language === 'UR' ? 'ڈائریکٹ ہاٹ لائن:' : language === 'AR' ? 'الخط الساخن المباشر:' : 'Desk Hotline:';

  return (
    <div
      id="inquiry-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-100">
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 rtl:right-auto rtl:left-5 p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 text-[#16A34A] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className={`text-xl font-black text-[#071A3D] font-heading ${fontClass}`}>
              {successHeading}
            </h3>
            <p className={`text-xs text-gray-600 max-w-sm mx-auto leading-relaxed ${fontClass}`}>
              {successDesc}
            </p>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-start text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-gray-500 ${fontClass}`}>{deskLabel}</span>
                <span className="font-bold text-[#071A3D] dir-ltr">+966 50 267 4930</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-gray-500 ${fontClass}`}>{refLabel}</span>
                <span className="font-mono font-bold text-[#E53935]">REQ-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/966502674930?text=${encodeURIComponent(`Assalam u Alaikum Muhammad Aamir Aziz, I submitted an inquiry about ${serviceTitle}`)}`}
                target="_blank"
                rel="noreferrer"
                className={`flex-1 py-3 rounded-xl bg-[#16A34A] text-white text-xs font-bold flex items-center justify-center gap-2 hover:brightness-110 shadow-sm ${fontClass}`}
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>{whatsappCta}</span>
              </a>
              <button
                onClick={handleReset}
                className={`px-5 py-3 rounded-xl bg-[#071A3D] text-white text-xs font-bold ${fontClass}`}
              >
                {closeLabel}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className={`text-[11px] font-extrabold uppercase tracking-wider text-[#E53935] ${fontClass}`}>
                {badgeText}
              </span>
              <h3 className={`text-xl sm:text-2xl font-black text-[#071A3D] font-heading mt-1 ${fontClass}`}>
                {serviceTitle}
              </h3>
              <p className={`text-xs text-gray-500 mt-1 leading-relaxed ${fontClass}`}>
                {subtitleText}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block text-xs font-bold text-gray-700 mb-1 ${fontClass}`}>{nameLabel}</label>
                <div className="flex items-center p-3 rounded-xl bg-gray-50 border border-gray-200">
                  <User className="w-4 h-4 text-gray-400 mr-2 rtl:mr-0 rtl:ml-2" />
                  <input
                    type="text"
                    required
                    placeholder={language === 'UR' ? 'مثلاً: محمد عامر عزیز' : language === 'AR' ? 'مثال: عبد الله الغامدي' : 'e.g. Abdullah Al-Ghamdi'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full bg-transparent text-xs font-semibold text-[#071A3D] outline-none ${fontClass}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={`block text-xs font-bold text-gray-700 mb-1 ${fontClass}`}>{phoneLabel}</label>
                  <div className="flex items-center p-3 rounded-xl bg-gray-50 border border-gray-200">
                    <Phone className="w-4 h-4 text-gray-400 mr-2 rtl:mr-0 rtl:ml-2" />
                    <input
                      type="tel"
                      required
                      dir="ltr"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full bg-transparent text-xs font-semibold text-[#071A3D] outline-none ${fontClass}`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-bold text-gray-700 mb-1 ${fontClass}`}>{dateLabel}</label>
                  <div className="flex items-center p-3 rounded-xl bg-gray-50 border border-gray-200">
                    <Calendar className="w-4 h-4 text-gray-400 mr-2 rtl:mr-0 rtl:ml-2" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={`w-full bg-transparent text-xs font-semibold text-[#071A3D] outline-none ${fontClass}`}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className={`block text-xs font-bold text-gray-700 mb-1 ${fontClass}`}>{emailLabel}</label>
                <div className="flex items-center p-3 rounded-xl bg-gray-50 border border-gray-200">
                  <Mail className="w-4 h-4 text-gray-400 mr-2 rtl:mr-0 rtl:ml-2" />
                  <input
                    type="email"
                    required
                    dir="ltr"
                    placeholder="name@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full bg-transparent text-xs font-semibold text-[#071A3D] outline-none ${fontClass}`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-bold text-gray-700 mb-1 ${fontClass}`}>
                  {notesLabel}
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={notesPlaceholder}
                  className={`w-full p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-[#071A3D] outline-none focus:border-[#071A3D] ${fontClass}`}
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className={`text-[11px] text-gray-400 ${fontClass}`}>
                  {hotlineLabel} <span dir="ltr" className="font-bold text-[#071A3D]">+966 50 267 4930</span>
                </div>
                <button
                  type="submit"
                  className={`px-6 py-3 rounded-xl bg-gradient-to-r from-[#D62828] to-[#E53935] hover:brightness-110 text-white font-black text-xs shadow-md shadow-[#D62828]/30 flex items-center gap-2 ${fontClass}`}
                >
                  <span>{submitLabel}</span>
                  <Send className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
