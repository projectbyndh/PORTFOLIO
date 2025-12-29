
import React from 'react';
import useMessageStore from '../Store/MessageStore';
import AdminLayout from './Layout';

export default function Messages() {
  const messages = useMessageStore((state) => state.messages);


  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto w-full">
        <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-2xl p-10 min-h-[80vh] border border-[#4A8EBC]/20">
          <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC] mb-10 text-center tracking-tight">Contact Messages</h2>
          {messages.length === 0 ? (
            <div className="text-gray-500 text-center text-lg">No messages received yet.</div>
          ) : (
            <div className="grid gap-8">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className="relative group bg-gradient-to-br from-[#F5FAFF] via-[#EAF5FF] to-[#D8EBFF] border border-[#4A8EBC]/30 rounded-3xl p-8 shadow-2xl hover:shadow-[0_8px_32px_0_rgba(74,142,188,0.15)] transition-all duration-300 overflow-hidden"
                >
                  {/* Decorative blurred circle */}
                  <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-[#4A8EBC]/10 blur-2xl opacity-60 pointer-events-none z-0"></div>
                  <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-[#3B5488]/10 blur-2xl opacity-50 pointer-events-none z-0"></div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#4A8EBC]/30 to-[#EAF5FF] flex items-center justify-center text-[#4A8EBC] font-extrabold text-2xl border-2 border-[#4A8EBC]/30 shadow-md">
                        <svg className="w-7 h-7 text-[#4A8EBC]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      </div>
                      <div>
                        <div className="font-extrabold text-xl text-[#1A2A44] leading-tight tracking-tight flex items-center gap-2">
                          {msg.name}
                          <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-[#4A8EBC]/10 text-[#4A8EBC] font-semibold">{msg.service}</span>
                        </div>
                        <div className="text-sm text-[#4A8EBC] flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 01-8 0 4 4 0 018 0z" /></svg>
                          {msg.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col md:items-end text-sm text-[#2B4066]/80 gap-1">
                      <div className="flex items-center gap-1"><svg className="w-4 h-4 text-[#4A8EBC]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10l1.553 1.553a2 2 0 002.828 0l.707-.707a2 2 0 012.828 0l.707.707a2 2 0 002.828 0L21 10" /></svg><span className="font-semibold">Phone:</span> {msg.phone}</div>
                      <div className="flex items-center gap-1"><svg className="w-4 h-4 text-[#4A8EBC]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h4" /></svg><span className="font-semibold">Company:</span> {msg.company}</div>
                    </div>
                  </div>
                  <div className="my-6 px-2 text-[#2B4066] text-lg leading-relaxed border-l-4 border-[#4A8EBC]/40 pl-6 italic relative z-10">
                    <svg className="w-6 h-6 text-[#4A8EBC] inline-block mr-2 align-top" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2-2 2 2h4a2 2 0 012 2v12a2 2 0 01-2 2z" /></svg>
                    {msg.message}
                  </div>
                  <div className="absolute top-4 right-4 text-xs text-gray-400 italic select-none z-20">
                    {msg.date ? new Date(msg.date).toLocaleString() : ''}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
