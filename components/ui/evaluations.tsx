import { Message, useCompletion } from 'ai/react';
import { useCallback, useState } from 'react';

interface EvaluationsProps {
  content: Message | undefined;
}

export default function Evaluations({ content }: EvaluationsProps) {
  const [ratings, setRatings] = useState({
    funny: 'N/A',
    dark: 'N/A',
    appropriate: 'N/A',
  });
  const { complete, isLoading } = useCompletion({
    api: '/api/completion',
  });

  const runEvals = useCallback(
    async (c: string) => {
      const completion = await complete(c);
      if (!completion) throw new Error('AI Server Error');
      const evaluations = JSON.parse(completion);
      console.log('evaluations: ');
      console.log(evaluations);
      if (
        'funny' in evaluations &&
        'dark' in evaluations &&
        'appropriate' in evaluations
      ) {
        setRatings({
          funny: evaluations.funny !== '' ? evaluations.funny : 'N/A',
          dark: evaluations.dark !== '' ? evaluations.dark : 'N/A',
          appropriate:
            evaluations.appropriate !== '' ? evaluations.appropriate : 'N/A',
        });
      } else {
        setRatings({
          funny: 'N/A',
          dark: 'N/A',
          appropriate: 'N/A',
        });
      }
    },
    [complete]
  );

  return (
    <>
      <div className='flex mx-auto'>
        <h1 className='text-center'>Ratings: </h1>
      </div>
      <div className='stats shadow my-2'>
        <div className='stat place-items-center'>
          <div className='stat-title'>Funny</div>
          {isLoading ? (
            <span className='loading loading-spinner loading-md'></span>
          ) : (
            <div className='stat-value'>{ratings.funny}</div>
          )}
        </div>

        <div className='stat place-items-center'>
          <div className='stat-title'>Dark</div>
          {isLoading ? (
            <span className='loading loading-spinner loading-md'></span>
          ) : (
            <div className='stat-value text-secondary'>{ratings.dark}</div>
          )}
        </div>

        <div className='stat place-items-center'>
          <div className='stat-title'>Appropriate</div>
          {isLoading ? (
            <span className='loading loading-spinner loading-md'></span>
          ) : (
            <div className='stat-value'>{ratings.appropriate}</div>
          )}
        </div>
      </div>
      <div className='flex flex-col justify-center mb-2 items-center p-4'>
        <button
          className='bg-blue-500 p-2 text-white rounded shadow-xl'
          disabled={isLoading}
          onClick={() => {
            if (content) {
              runEvals(content.content);
            } else {
              alert('No content to evaluate');
            }
          }}
        >
          Evaluate Last Joke
        </button>
      </div>
    </>
  );
}
