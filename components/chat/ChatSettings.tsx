import { useState } from 'react';
import DropDownBox, { Option } from '@/components/ui/dropdown';
import Evaluations from '../ui/evaluations';
import { ChatRequestOptions, CreateMessage, Message } from 'ai';

const Topics: Option[] = [
  { id: 1, name: 'People' },
  { id: 2, name: 'Jobs' },
  { id: 3, name: 'SciFi' },
  { id: 4, name: 'Animals' },
  // More topics...
];

const Tones: Option[] = [
  { id: 1, name: 'Witty' },
  { id: 2, name: 'Boring' },
  { id: 3, name: 'Dark' },
  { id: 4, name: 'Rushed' },
  // More tones...
];

const Types: Option[] = [
  { id: 1, name: 'Story' },
  { id: 2, name: 'Knock Knock' },
  { id: 3, name: 'Poetic' },
  { id: 4, name: 'Country' },
  // More types...
];

interface ChatSettingsProps {
  selectedTemp: number;
  convertedTemp: number;
  isLoading: boolean;
  setSelectedTemp: (temp: number) => void;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
}

export default function ChatSettings({
  selectedTemp,
  convertedTemp,
  isLoading,
  setSelectedTemp,
  append,
}: ChatSettingsProps) {
  const [selectedTopic, setSelectedTopic] = useState(Topics[0]);
  const [selectedTone, setSelectedTone] = useState(Tones[0]);
  const [selectedType, setSelectedType] = useState(Types[0]);
  return (
    <div className='relative min-w-[500px]'>
      <h2 className='text-2xl font-bold text-center mb-4'>GPT Settings</h2>
      <div className='sticky top-36 bg-slate-900 rounded-md mx-3 py-4'>
        <div className='flex flex-col justify-center mb-2 items-center p-4'>
          <button
            className='bg-blue-500 p-2 text-white rounded shadow-xl'
            disabled={isLoading}
            onClick={() =>
              append({
                role: 'user',
                content: `Tell me a joke, using a ${selectedType.name} format with a ${selectedTone.name} tone. The joke must be about ${selectedTopic.name}`,
              })
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
            options={Types}
          />
        </div>
        <div className='flex flex-col justify-center py-2 w-[200px] mx-auto'>
          <div className='text-sm font-medium leading-6 text-white-900 text-center'>
            Temperature: {convertedTemp}
          </div>
          <input
            type='range'
            min='0'
            max='200'
            value={selectedTemp / 100}
            onChange={(e) => setSelectedTemp(parseFloat(e.target.value) * 100)}
            className='range range-info'
          />
        </div>
        <div className='flex flex-col justify-center py-2 mx-auto px-5'>
          <Evaluations />
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
  );
}
