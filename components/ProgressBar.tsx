import React from 'react';

interface ProgressBarProps {
  progress: number; // A value between 0 and 100 representing the progress percentage
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#e0e0e0',
        borderRadius: '10px',
        height: '20px',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress}%`,
          backgroundColor: progress >= 100 ? 'green' : 'blue',
          borderRadius: '10px',
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
