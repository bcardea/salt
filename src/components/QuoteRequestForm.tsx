import React, { useState } from 'react';
import { X } from 'lucide-react';

interface QuoteRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  churchName: string;
  firstName: string;
  lastName: string;
  role: 'pastor' | 'staff';
  email: string;
  phone: string;
  churchSize: string;
  referralSource: string;
}

const QuoteRequestForm: React.FC<QuoteRequestFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    churchName: '',
    firstName: '',
    lastName: '',
    role: 'pastor',
    email: '',
    phone: '',
    churchSize: '',
    referralSource: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('https://services.leadconnectorhq.com/hooks/jI35EgXT0cs2YnriH7gl/webhook-trigger/bdee5d1f-6a58-40d1-8bbe-c60b6488fbd0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitSuccess(true);
      setTimeout(() => {
        onClose();
        setSubmitSuccess(false);
      }, 2000);
    } catch (error) {
      setSubmitError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>

        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-2xl font-bold text-gray-900">Request Your Quote</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="mb-4 text-green-600">
                  <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600">We've received your request and will be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="churchName" className="block text-sm font-medium text-gray-700">Church Name</label>
                  <input
                    type="text"
                    id="churchName"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#345A7C] focus:ring-[#345A7C] sm:text-sm"
                    value={formData.churchName}
                    onChange={(e) => setFormData(prev => ({ ...prev, churchName: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#345A7C] focus:ring-[#345A7C] sm:text-sm"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#345A7C] focus:ring-[#345A7C] sm:text-sm"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">Your Role</label>
                  <select
                    id="role"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#345A7C] focus:ring-[#345A7C] sm:text-sm"
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as 'pastor' | 'staff' }))}
                  >
                    <option value="pastor">Pastor</option>
                    <option value="staff">Church Staff</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#345A7C] focus:ring-[#345A7C] sm:text-sm"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#345A7C] focus:ring-[#345A7C] sm:text-sm"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div>
                  <label htmlFor="churchSize" className="block text-sm font-medium text-gray-700">Church Size</label>
                  <select
                    id="churchSize"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#345A7C] focus:ring-[#345A7C] sm:text-sm"
                    value={formData.churchSize}
                    onChange={(e) => setFormData(prev => ({ ...prev, churchSize: e.target.value }))}
                  >
                    <option value="">Select size...</option>
                    <option value="0-50">0-50</option>
                    <option value="51-100">51-100</option>
                    <option value="101-250">101-250</option>
                    <option value="251-500">251-500</option>
                    <option value="501-1000">501-1,000</option>
                    <option value="1001+">1,000+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="referralSource" className="block text-sm font-medium text-gray-700">How did you find us?</label>
                  <select
                    id="referralSource"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#345A7C] focus:ring-[#345A7C] sm:text-sm"
                    value={formData.referralSource}
                    onChange={(e) => setFormData(prev => ({ ...prev, referralSource: e.target.value }))}
                  >
                    <option value="">Select source...</option>
                    <option value="google">Google Search</option>
                    <option value="facebook">Facebook</option>
                    <option value="instagram">Instagram</option>
                    <option value="friend">Friend/Colleague</option>
                    <option value="conference">Conference/Event</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {submitError && (
                  <div className="text-red-600 text-sm">{submitError}</div>
                )}

                <div className="mt-5 sm:mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-gradient-to-r from-[#345A7C] to-[#A1C1D7] border border-transparent rounded-md shadow-sm hover:from-[#2A4B6A] hover:to-[#8EAFC5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#345A7C] sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteRequestForm;
