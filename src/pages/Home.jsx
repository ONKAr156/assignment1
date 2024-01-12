import React, { useState, useEffect } from 'react';

const Home = () => {
  // Setting initial time for defaultValue and breakValue.
  //-----------------min * sec ----------------------------------------------------------
  const defaultValue = 25 * 60; // 25 minutes
  const breakValue = 5 * 60; // 5 minutes
  const [currentTime, setCurrentTime] = useState(defaultValue); // total seconds
  const [status, setStatus] = useState(false);
  const [isBreakOn, setIsBreakOn] = useState(false);


  //  Start Logic  ------------------------------------------------------------------------
  const startWork = () => {
    setIsBreakOn(false);
    setCurrentTime(defaultValue);
    setStatus(true);
  }
  //  Break Timmer Logic  ------------------------------------------------------------------
  const startBreak = () => {
    setIsBreakOn(true);
    setCurrentTime(breakValue);
    setStatus(true);
  }

  //  Reset logic --------------------------------------------------------------------------
  const resetTimer = () => {
    setStatus(false);
    setCurrentTime(defaultValue); // Reset to defaultValue value 
    setIsBreakOn(false);         // Ensure we are not in break mode
  }

  //  Display current Time ----------------------------------------------------------------- 
  const showCurrentTime = (e) => {
    const minutes = Math.floor(e / 60); // with floor we got the round off value in mins
    const remainingSeconds = e % 60; //    here we got current second
    const totalSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
    return `${minutes}:${totalSeconds}`
  }

  // Pause and Resest function ------------------------------------------------------------
  const toggleTimer = () => {
    setStatus(!status);
  }

  useEffect(() => {
    let timerInterval;

    if (status && currentTime > 0) {
      timerInterval = setInterval(() => {
        setCurrentTime((seconds) => seconds - 1);
      }, 1000);
      // When work timer is over, break timer is started
    } else if (status && currentTime === 0 && !isBreakOn) {
      startBreak();
      //  resetting timer when the break is over
    } else if (status && currentTime === 0 && isBreakOn) {
      resetTimer();
    }

    return () => clearInterval(timerInterval);
  }, [status, currentTime, isBreakOn])



  return <>
    <div className="min-h-screen bg-blue-950 flex flex-col items-center justify-center gap-4 p-4">
      <div className="flex gap-3 my-4">
        <button onClick={startWork} className="bg-blue-500 text-white py-2 px-4 ">
          Start Work
        </button>

        <button onClick={startBreak} className="bg-blue-500 text-white py-2 px-4 ">
          Start Break
        </button>
      </div>

      <div className="flex justify-center items-center w-48 h-48 sm:w-64 sm:h-64 bg-blue-700 rounded-full mb-8">
        <span className="text-3xl sm:text-4xl lg:text-6xl text-white">
          {showCurrentTime(currentTime)}
        </span>
      </div>

      <div className="flex gap-3">
        <button onClick={toggleTimer} className="bg-blue-500   text-black py-2 px-4 rounded-lg focus:outline-none">
          {status ? 'Pause' : 'Resume'}
        </button>
        <button onClick={resetTimer} className="bg-blue-500 text-black py-2 px-4   rounded-lg focus:outline-none">
          Reset
        </button>
      </div>

      {
        isBreakOn ?
          <div className="my-3 text-center md:text-lg text-green-500">
            <p>Break time !!</p>
            <p>Relax go for a walk ...🚶‍♂️ or stay away from your screen 💻</p>
          </div> : ""
      }
    </div>

  </>

};

export default Home;