
import React from 'react';

interface ExamProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
  timeLeft: number;
}

const ExamProgressBar: React.FC<ExamProgressBarProps> = ({
  currentQuestion,
  totalQuestions,
  timeLeft
}) => {
  const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-[#0f1623] py-2 px-6 flex items-center justify-between border-b border-gray-800">
      <div className="flex items-center space-x-2 w-full max-w-xs">
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-orange-500 h-2 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <span className="text-sm text-gray-400">{currentQuestion + 1}/{totalQuestions}</span>
      </div>
      <div className="flex items-center">
        <div className="flex items-center text-lg">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" strokeWidth="2" stroke="currentColor"></circle>
            <path strokeLinecap="round" strokeWidth="2" d="M12 6v6l4 2"></path>
          </svg>
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>
    </div>
  );
};

export default ExamProgressBar;
