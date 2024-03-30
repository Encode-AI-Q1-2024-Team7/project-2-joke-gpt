'use client';

import DropDownBox from '@/components/ui/dropdown';
import { useChat } from 'ai/react';
import { useEffect, useRef, useState } from 'react';
import { Option } from '@/components/ui/dropdown';

const Topics: Option[] = [
  { id: 0, name: 'Select...' },
  { id: 1, name: 'People' },
  { id: 2, name: 'Jobs' },
  { id: 3, name: 'SciFi' },
  { id: 4, name: 'Animals' },
  // More topics...
];

const Tones: Option[] = [
  { id: 0, name: 'Select...' },
  { id: 1, name: 'Witty' },
  { id: 2, name: 'Boring' },
  { id: 3, name: 'Dark' },
  { id: 4, name: 'Rushed' },
  // More tones...
];

const Types: Option[] = [
  { id: 0, name: 'Select...' },
  { id: 1, name: 'Story' },
  { id: 2, name: 'Knock Knock' },
  { id: 3, name: 'Poetic' },
  { id: 4, name: 'Country' },
  // More types...
];

export default function Chat() {
  const [selectedTopic, setSelectedTopic] = useState(Topics[0]);
  const [selectedTone, setSelectedTone] = useState(Tones[0]);
  const [selectedType, setSelectedType] = useState(Types[0]);
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
        <div className='relative min-w-[500px]'>
          <h2 className='text-2xl font-bold text-center mb-4'>GPT Settings</h2>
          <div className='sticky top-36 bg-slate-900 rounded-md mx-3 py-4'>
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
            <div className='flex justify-center py-2'>
              <DropDownBox
                state={selectedTopic}
                setState={setSelectedTopic}
                title='topic'
                options={Topics}
              />
            </div>
            <div className='flex justify-center py-2'>
              <DropDownBox
                state={selectedTone}
                setState={setSelectedTone}
                title='tone'
                options={Tones}
              />
            </div>
            <div className='flex justify-center py-2'>
              <DropDownBox
                state={selectedType}
                setState={setSelectedType}
                title='joke type'
                options={Tones}
              />
            </div>
            {/* <form onSubmit={handleSubmit} className='flex justify-center'>
              <input
                className='w-[95%] p-2 mb-8 border border-gray-300 rounded shadow-xl text-black'
                disabled={isLoading}
                value={input}
                placeholder='Say something...'
                onChange={handleInputChange}
              />
            </form> */}
          </div>
        </div>
        <div className='flex flex-col w-full h-5/6 min-w-96 max-w-xl mx-auto'>
          <h2 className='text-2xl font-bold text-center mb-4'>Chat</h2>
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
