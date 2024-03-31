'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef, useState } from 'react';
import ChatSection from '@/components/chat/ChatSection';
import ChatSettings from '@/components/chat/ChatSettings';

export default function Home() {
  const [selectedTemp, setSelectedTemp] = useState(0);
  const convertedTemp = (selectedTemp / 10000).toFixed(1);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
  } = useChat({ api: '/api/chat', body: { temperature: convertedTemp } });

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const lastJoke = messages.filter((m) => m.role === 'assistant').pop();
  return (
    <main>
      <header className='py-8 text-5xl font-bold text-center mb-4'>
        Joker GPT
      </header>
      <div className='flex min-w-lg'>
        <ChatSettings
          content={lastJoke}
          selectedTemp={selectedTemp}
          convertedTemp={+convertedTemp}
          isLoading={isLoading}
          setSelectedTemp={setSelectedTemp}
          append={append}
        />
        <ChatSection
          messages={messages}
          isLoading={isLoading}
          messagesContainerRef={messagesContainerRef}
        />
      </div>
    </main>
  );
}
