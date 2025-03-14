
import React from 'react';

interface QuestionNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  onPrevQuestion: () => void;
  onNextQuestion: () => void;
  onSubmitExam: () => void;
}

const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  currentQuestion,
  totalQuestions,
  onPrevQuestion,
  onNextQuestion,
  onSubmitExam
}) => {
  return (
    <div className="flex justify-between mt-8">
      <button 
        onClick={onPrevQuestion} 
        disabled={currentQuestion === 0}
        className={`px-6 py-2 rounded border ${
          currentQuestion === 0 
            ? 'opacity-50 cursor-not-allowed border-gray-700 text-gray-500' 
            : 'border-gray-600 hover:border-gray-400'
        }`}
      >
        Previous
      </button>
      
      {currentQuestion === totalQuestions - 1 ? (
        <button 
          onClick={onSubmitExam}
          className="bg-[#e6e13e] hover:bg-[#c4c034] text-black font-medium py-2 px-6 rounded transition-colors duration-200"
        >
          Submit Exam
        </button>
      ) : (
        <button 
          onClick={onNextQuestion}
          className="px-6 py-2 rounded border border-gray-600 hover:border-gray-400"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default QuestionNavigation;
