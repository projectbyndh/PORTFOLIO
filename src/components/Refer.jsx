import React from 'react';

const ReferralPage = () => {
  // Reusable Form Field Component
  const FormField = ({ label, id, type = 'text', placeholder, required = false }) => (
    <div className="relative group">
      <label htmlFor={id} className="block text-sm font-medium text-blue-700 mb-2 transition-all duration-300 group-focus-within:text-blue-800">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl 
                  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 
                  transition-all duration-300 text-gray-700 placeholder-gray-400 
                  peer hover:border-blue-300"
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none opacity-0 peer-focus:opacity-100 transition-opacity duration-300">
        <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>
  );

  // Reusable Benefit Item Component
  const BenefitItem = ({ text, icon }) => (
    <li className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-md hover:shadow-lg 
                  transition-all duration-300 transform hover:-translate-y-1">
      <span className="text-blue-500 text-2xl flex-shrink-0">{icon}</span>
      <span className="text-gray-700 text-sm font-medium">{text}</span>
    </li>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-4xl">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl">
          {/* Header with Gradient Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-10 text-center relative">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 animate-fade-in-down 
                          drop-shadow-md">
              Refer & Thrive
            </h1>
            <p className="text-lg text-blue-100 max-w-md mx-auto font-light">
              Invite friends to [Your IT Company] and enjoy exclusive perks together!
            </p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-700 opacity-40 animate-pulse" />
          </div>

          {/* Form Section */}
          <div className="p-8 sm:p-12 bg-gradient-to-b from-blue-50/20 to-white">
            <form className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <FormField
                  label="Your Name"
                  id="your-name"
                  placeholder="John Doe"
                  required
                />
                <FormField
                  label="Your Email"
                  id="your-email"
                  type="email"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <FormField
                  label="Friend's Name"
                  id="friend-name"
                  placeholder="Jane Smith"
                  required
                />
                <FormField
                  label="Friend's Email"
                  id="friend-email"
                  type="email"
                  placeholder="jane@example.com"
                  required
                />
              </div>

              <div className="relative">
                <label htmlFor="message" className="block text-sm font-medium text-blue-700 mb-2">
                  Personal Message (Optional)
                </label>
                <textarea
                  id="message"
                  placeholder="Share why your friend will love our IT solutions..."
                  className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl 
                            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 
                            transition-all duration-300 text-gray-700 placeholder-gray-400 
                            min-h-[140px] resize-y hover:border-blue-300"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 px-8 rounded-xl 
                          font-semibold shadow-lg hover:bg-blue-700 hover:shadow-xl 
                          transition-all duration-300 transform hover:-translate-y-1 
                          flex items-center justify-center gap-2"
              >
                <span>Send Referral Now</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </form>

            {/* Benefits Section */}
            <div className="mt-12 bg-blue-50/50 p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center gap-3">
                <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Your Exclusive Rewards
              </h3>
              <ul className="grid sm:grid-cols-2 gap-5">
                <BenefitItem text="$100 credit per successful referral" icon="💰" />
                <BenefitItem text="Priority tech support access" icon="⚡" />
                <BenefitItem text="Early access to new features" icon="🚀" />
                <BenefitItem text="Monthly tech prize draw entry" icon="🎁" />
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 mt-8">
          © {new Date().getFullYear()} [Your IT Company]. Crafted with <span className="text-blue-500">💙</span> for our community.
        </footer>
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.6s ease-out;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default ReferralPage;

