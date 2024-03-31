import { Message } from 'ai';

interface ChatSectionProps {
  messages: Message[];
  isLoading: boolean;
  messagesContainerRef: React.RefObject<HTMLDivElement>;
}

export default function ChatSection({
  messages,
  isLoading,
  messagesContainerRef,
}: ChatSectionProps) {
  return (
    <>
      <div className='flex flex-col w-full h-5/6 min-w-96 max-w-xl mx-auto'>
        <h2 className='text-2xl font-bold text-center mb-4'>Chat</h2>
        <div className='overflow-auto mb-8 w-full' ref={messagesContainerRef}>
          {messages.map((m) => (
            <div
              key={m.id}
              className={`whitespace-pre-wrap ${
                m.role === 'user'
                  ? 'bg-blue-500 p-3 m-2 rounded-lg'
                  : 'bg-slate-700 p-3 m-2 rounded-lg'
              }`}
            >
              {m.role === 'user' ? (
                <span className='text-yellow-400'>Me: </span>
              ) : (
                <span className='text-red-400'>Joker GPT: </span>
              )}
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
    </>
  );
}
