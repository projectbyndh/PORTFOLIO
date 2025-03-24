import React from 'react';

function Refer() {
  return (
    <main className="flex-grow flex items-center justify-center bg-gray-50 py-16">
      <div className="min-h-[18rem] w-full md:w-10/12 lg:w-8/12 mx-auto flex flex-col items-center justify-center text-white bg-gradient-to-br from-[#1A2A44] via-[#2B4066] to-[#3B5488] p-8 rounded-xl shadow-2xl relative overflow-hidden">
        
        {/* Tech-inspired background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzAwMCIvPgo8cGF0aCBkPSJNMCwwSDYwVjYwSDBWMHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzRGODlEQyIgc3Ryb2tlLXdpZHRoPSIwLjUiLz4KPC9zdmc+')]"></div>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#f0f0f0] to-[#f0f0f0] relative z-10">
          Affiliation Program
        </h2>
        
        <p className="text-lg md:text-xl text-center mb-8 max-w-2xl text-gray-200">
          <span className="font-semibold text-[#4A8EBC]">Connect Your Network</span> 
          - Share your unique referral code and unlock rewards when your tech peers join our ecosystem.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full text-center relative z-10">
          <div className="flex-1 p-4 hover:transform hover:-translate-y-2 transition-all duration-300">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#4A8EBC]/20 flex items-center justify-center text-[#f0f0f0] font-bold text-xl">1</div>
            <h3 className="text-xl font-semibold text-white mb-2">Share Your Code</h3>
            <p className="text-sm text-gray-300">Access your unique referral link from your tech dashboard</p>
          </div>
          
          <div className="flex-1 p-4 hover:transform hover:-translate-y-2 transition-all duration-300">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#4A8EBC]/20 flex items-center justify-center text-[#f0f0f0] font-bold text-xl">2</div>
            <h3 className="text-xl font-semibold text-white mb-2">Network Joins</h3>
            <p className="text-sm text-gray-300">Your connections sign up using your referral link</p>
          </div>
          
          <div className="flex-1 p-4 hover:transform hover:-translate-y-2 transition-all duration-300">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#4A8EBC]/20 flex items-center justify-center text-[#f0f0f0] font-bold text-xl">3</div>
            <h3 className="text-xl font-semibold text-white mb-2">Earn Tech Credits</h3>
            <p className="text-sm text-gray-300">Receive $10 in platform credits per successful referral</p>
          </div>
        </div>

        <button className="mt-10 bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] text-white font-semibold py-3 px-8 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 relative z-10">
          Start Referring Now
        </button>
      </div>
    </main>
  );
}

export default Refer;