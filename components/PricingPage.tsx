import React from 'react';
import { SubscriptionPlan } from '../types';
import { CheckCircle, XCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface PricingPageProps {
    currentPlan?: SubscriptionPlan;
    onUpgradePlan: (newPlan: SubscriptionPlan) => void;
}

const plans = {
    Free: {
        name: 'Free',
        price: 'Pay as you go',
        priceSuffix: '',
        description: 'Register students individually with no upfront cost. Standard fees apply.',
        features: [
            { text: 'Up to 50 approved students', included: true },
            { text: 'Standard registration fee (₦5,000/student)', included: true },
            { text: 'Basic student management', included: true },
            { text: 'Bulk Student Registration', included: false },
            { text: 'Basic & Advanced Analytics', included: false },
        ],
        button: {
            text: 'Current Plan',
            variant: 'secondary'
        }
    },
    Basic: {
        name: 'Basic',
        price: '₦15,000',
        priceSuffix: '/ year',
        description: 'Ideal for growing schools that need more capacity and tools.',
        features: [
            { text: 'Up to 200 approved students', included: true },
            { text: 'Discounted registration (20% off)', included: true },
            { text: 'Basic Analytics', included: true },
            { text: 'Basic student management', included: true },
            { text: 'Bulk Student Registration', included: false },
            { text: 'Advanced Analytics', included: false },
        ],
        button: {
            text: 'Upgrade to Basic',
            variant: 'primary'
        }
    },
    Premium: {
        name: 'Premium',
        price: '₦50,000',
        priceSuffix: '/ year',
        description: 'The ultimate package for schools wanting to maximize their impact.',
        features: [
            { text: 'Unlimited approved students', included: true },
            { text: 'Best value registration (50% off)', included: true },
            { text: 'Bulk Student Registration', included: true },
            { text: 'Advanced Analytics', included: true },
            { text: 'Priority support', included: true },
        ],
        button: {
            text: 'Upgrade to Premium',
            variant: 'primary'
        }
    },
};


const PricingPage: React.FC<PricingPageProps> = ({ currentPlan, onUpgradePlan }) => {
    
    const handlePlanSelect = (plan: SubscriptionPlan) => {
        if (plan !== currentPlan) {
            onUpgradePlan(plan);
        }
    };
    
    return (
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-gray-100">Our Pricing Plans</h1>
                <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-400">Choose the plan that's right for your school. Annual plans unlock powerful features and registration discounts.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-stretch">
                {Object.values(plans).map((plan) => {
                    const isCurrent = plan.name === currentPlan;
                    const isDowngrade = (currentPlan === 'Premium' && plan.name !== 'Premium') || (currentPlan === 'Basic' && plan.name === 'Free');
                    
                    let buttonText = plan.button.text;
                    if (isCurrent) buttonText = 'Current Plan';
                    else if (isDowngrade) buttonText = 'Contact Support to Downgrade';
                    
                    return (
                        <div key={plan.name} className={cn(
                            "bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col border",
                            isCurrent ? "border-emerald-500 border-2" : "border-gray-200 dark:border-gray-700",
                            plan.name === 'Premium' ? 'relative' : ''
                        )}>
                             {plan.name === 'Premium' && (
                                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                                    <span className="bg-emerald-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">Most Popular</span>
                                </div>
                            )}
                            {isCurrent && (
                                <div className="text-center mb-4">
                                    <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full">CURRENT PLAN</span>
                                </div>
                            )}
                            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">{plan.name}</h2>
                            <p className="mt-4 text-center text-gray-500 dark:text-gray-400 h-16">{plan.description}</p>
                            <div className="my-8 text-center">
                                <span className="text-5xl font-extrabold text-gray-900 dark:text-gray-100">{plan.price}</span>
                                <span className="text-lg font-medium text-gray-500 dark:text-gray-400">{plan.priceSuffix}</span>
                            </div>
                            
                            <ul className="space-y-4 flex-grow">
                                {plan.features.map(feature => (
                                    <li key={feature.text} className="flex items-start">
                                        {feature.included ? <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mr-3 mt-1" /> : <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mr-3 mt-1" />}
                                        <span className="text-gray-600 dark:text-gray-300">{feature.text}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handlePlanSelect(plan.name as SubscriptionPlan)}
                                disabled={isCurrent || isDowngrade}
                                className={cn(
                                    "w-full py-3 px-6 rounded-lg font-bold text-lg mt-8 transition-colors",
                                    isCurrent
                                        ? "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 cursor-default"
                                        : isDowngrade
                                        ? "bg-gray-400 text-white cursor-not-allowed"
                                        : plan.name === 'Premium' 
                                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                                )}
                            >
                                {buttonText}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PricingPage;