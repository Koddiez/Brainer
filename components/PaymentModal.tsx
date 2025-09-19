
import React, { useState, useMemo } from 'react';
import { Competition, User, SubscriptionPlan } from '../types';
import Modal from './ui/Modal';
import { Banknote, Ticket, Landmark, Hash } from 'lucide-react';

interface PaymentModalProps {
  competition: Competition;
  user: User;
  onClose: () => void;
  onPaymentSuccess: (competitionId: number) => void;
  subscriptionPlan?: SubscriptionPlan;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ competition, user, onPaymentSuccess, subscriptionPlan, onClose }) => {
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const getBasePrice = () => {
    const INDIVIDUAL_FEE = 10000;
    const SCHOOL_BASE_FEE = 5000;

    if (!user.schoolId) return INDIVIDUAL_FEE;

    switch (subscriptionPlan) {
      case 'Basic': return SCHOOL_BASE_FEE * 0.8; // 20% discount
      case 'Premium': return SCHOOL_BASE_FEE * 0.5; // 50% discount
      case 'Free':
      default:
        return SCHOOL_BASE_FEE;
    }
  };
  const basePrice = getBasePrice();

  const finalPrice = useMemo(() => {
    return basePrice - (basePrice * discount);
  }, [basePrice, discount]);

  const handleApplyDiscount = () => {
    setError('');
    // Individuals cannot use school discount codes
    if (!user.schoolId) {
        setError('Discount codes are for school-affiliated students only.');
        return;
    }
    
    const codeUpper = discountCode.toUpperCase();
    const parts = codeUpper.split('-');

    if (parts.length === 2 && parts[0].startsWith('SCHOOL')) {
        const percentage = parseInt(parts[1], 10);
        if (!isNaN(percentage) && percentage >= 10 && percentage <= 50) { // Set a reasonable upper bound for discount
            setDiscount(percentage / 100);
            return;
        }
    }
    
    setDiscount(0);
    setError('Invalid or expired discount code.');
  };

  const handlePayment = async (method: string) => {
    // API_CALL: const paymentResponse = await api.processPayment({ amount: finalPrice, method, userId: user.id });
    setPaymentStatus('processing');
    
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate a successful payment
    setPaymentStatus('success');
    
    // Wait a bit on the success screen before closing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onPaymentSuccess(competition.id);
  };
  
  const renderContent = () => {
    if (paymentStatus === 'processing' || paymentStatus === 'success') {
      return (
        <div className="text-center py-12">
            {paymentStatus === 'processing' ? (
                <>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
                    <p className="text-lg text-gray-600 dark:text-gray-400">Processing your payment...</p>
                </>
            ) : (
                <>
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                     <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">Payment Successful!</p>
                     <p className="text-gray-600 dark:text-gray-400">You're all set. Good luck!</p>
                </>
            )}
        </div>
      );
    }
      
    return (
        <>
            <div className="p-6">
                <div className="text-center mb-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                        Registration Fee
                    </h3>
                    <p className="mt-2 text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
                        ₦{finalPrice.toLocaleString()}
                    </p>
                    {discount > 0 && (
                        <p className="text-sm text-green-600 dark:text-green-400">
                            (Original: ₦{basePrice.toLocaleString()}, {(discount * 100).toFixed(0)}% off applied)
                        </p>
                    )}
                </div>

                <div className="space-y-4 mb-6">
                    <div className="flex items-end gap-2">
                        <div className="flex-grow">
                            <label htmlFor="discount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Discount Code</label>
                            <input
                                type="text"
                                id="discount"
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value)}
                                placeholder="e.g., SCHOOLABC-10"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        <button onClick={handleApplyDiscount} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Apply</button>
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                </div>

                <div>
                    <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-3">Choose Payment Method</h4>
                    <div className="space-y-3">
                         <button onClick={() => handlePayment('bank_transfer')} className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <Landmark className="h-6 w-6 text-indigo-500" />
                            <span className="font-semibold text-gray-700 dark:text-gray-200">Bank Transfer</span>
                        </button>
                        <button onClick={() => handlePayment('ussd')} className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <Hash className="h-6 w-6 text-emerald-500" />
                            <span className="font-semibold text-gray-700 dark:text-gray-200">USSD</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                    type="button"
                    onClick={onClose}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                    Cancel
                </button>
            </div>
        </>
    );
  };

  return (
    <Modal
      title={`Register for ${competition.title}`}
      isOpen={true}
      onClose={paymentStatus === 'idle' ? onClose : () => {}}
    >
      {renderContent()}
    </Modal>
  );
};

export default PaymentModal;