import React, { useState, useEffect } from 'react';
import './LoadingComponent.css'; // CSS file for styling (see below)

const LoadingComponent: React.FC = () => {
  const [loadingText, setLoadingText] = useState('Loading');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingText((prevText) => {
        if (prevText === 'Loading...') return 'Loading';
        return `${prevText}.`;
      });
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='loading-background'>
        <div className="loading-container">
            <div className="loading-bars">
                {[1, 2, 3, 4, 5].map((barNum) => (
                <div key={barNum} className={`loading-bar bar-${barNum}`}></div>
                ))}
            </div>
            <div className="loading-text">
                {loadingText}
            </div>
        </div>
    </div>
  );
};

export default LoadingComponent;