'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';

export default function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
  } = useChat();

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <header className='py-8 text-5xl font-bold text-center mb-4'>
        Joker GPT
      </header>
      <div className='flex min-w-lg'>
        <div className='bg-slate-500 relative w-[500px]'>
          <div className='fixed bg-slate-900 rounded-md'>
            <div className='flex flex-col justify-center mb-2 items-center p-4'>
              <button
                className='bg-blue-500 p-2 text-white rounded shadow-xl'
                disabled={isLoading}
                onClick={() =>
                  append({ role: 'user', content: 'Give me a random recipe' })
                }
              >
                Generate a Joke
              </button>
            </div>
            <form onSubmit={handleSubmit} className='flex justify-center'>
              <input
                className='w-[95%] p-2 mb-8 border border-gray-300 rounded shadow-xl text-black'
                disabled={isLoading}
                value={input}
                placeholder='Say something...'
                onChange={handleInputChange}
              />
            </form>
          </div>
        </div>
        <div className='flex flex-col w-full h-5/6 min-w-96 max-w-xl mx-auto'>
          <div className='overflow-auto mb-8 w-full' ref={messagesContainerRef}>
            {messages.map((m) => (
              <div
                key={m.id}
                className={`whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-green-700 p-3 m-2 rounded-lg'
                    : 'bg-slate-700 p-3 m-2 rounded-lg'
                }`}
              >
                {m.role === 'user' ? 'User: ' : 'AI: '}
                {m.content}
              </div>
            ))}

            {isLoading && (
              <div className='flex justify-end pr-4'>
                <span className='animate-bounce'>...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
