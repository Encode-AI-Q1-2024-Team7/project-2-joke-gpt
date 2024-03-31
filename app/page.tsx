'use client';

import DropDownBox from '@/components/ui/dropdown';
import { useChat } from 'ai/react';
import { useEffect, useRef, useState } from 'react';
import { Option } from '@/components/ui/dropdown';
import Evaluations from '@/components/ui/evaluations';
import { Chat } from 'openai/resources/index.mjs';
import ChatSection from '@/components/chat/ChatSection';
import ChatSettings from '@/components/chat/ChatSettings';

// const Topics: Option[] = [
//   { id: 1, name: 'People' },
//   { id: 2, name: 'Jobs' },
//   { id: 3, name: 'SciFi' },
//   { id: 4, name: 'Animals' },
//   // More topics...
// ];

// const Tones: Option[] = [
//   { id: 1, name: 'Witty' },
//   { id: 2, name: 'Boring' },
//   { id: 3, name: 'Dark' },
//   { id: 4, name: 'Rushed' },
//   // More tones...
// ];

// const Types: Option[] = [
//   { id: 1, name: 'Story' },
//   { id: 2, name: 'Knock Knock' },
//   { id: 3, name: 'Poetic' },
//   { id: 4, name: 'Country' },
//   // More types...
// ];

export default function Home() {
  // const [selectedTopic, setSelectedTopic] = useState(Topics[0]);
  // const [selectedTone, setSelectedTone] = useState(Tones[0]);
  // const [selectedType, setSelectedType] = useState(Types[0]);
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

  return (
    <main>
      <header className='py-8 text-5xl font-bold text-center mb-4'>
        Joker GPT
      </header>
      <div className='flex min-w-lg'>
        <ChatSettings
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
