export default function Completion() {
  return (
    <>
      <h1 className="text-center">Evaluations</h1>
      <div className='stats shadow'>
        <div className='stat place-items-center'>
          <div className='stat-title'>Funny</div>
          <div className='stat-value'>31K</div>
          {/* <div className='stat-desc'>From January 1st to February 1st</div> */}
        </div>

        <div className='stat place-items-center'>
          <div className='stat-title'>Offensive</div>
          <div className='stat-value text-secondary'>4,200</div>
          {/* <div className='stat-desc text-secondary'>↗︎ 40 (2%)</div> */}
        </div>

        <div className='stat place-items-center'>
          <div className='stat-title'>Appropriate</div>
          <div className='stat-value'>1,200</div>
          {/* <div className='stat-desc'>↘︎ 90 (14%)</div> */}
        </div>
      </div>
    </>
  );
}
