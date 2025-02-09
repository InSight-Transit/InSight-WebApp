'use client';
import React, { useState, useEffect } from 'react';

function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 60000); // Update every minute instead of every second

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div>
      <h1 className="text-white text-[5vw] font-bold">{formattedTime}</h1>
    </div>
  );
}

export default DigitalClock;
