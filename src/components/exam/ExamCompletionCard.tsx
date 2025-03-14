
import React from 'react';

interface ExamCompletionCardProps {
  totalQuestions: number;
  answeredQuestions: number;
  onReturnHome: () => void;
}

const ExamCompletionCard: React.FC<ExamCompletionCardProps> = ({
  totalQuestions,
  answeredQuestions,
  onReturnHome
}) => {
  return (
    <div className="bg-[#1e2736]/60 rounded-xl p-10 text-center max-w-2xl mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-4">Exam Completed</h2>
      <p className="text-gray-300 mb-6">Thank you for completing the exam.</p>
      <p className="text-xl mb-8">
        You answered {answeredQuestions} out of {totalQuestions} questions.
      </p>
      <button 
        onClick={onReturnHome} 
        className="bg-[#e6e13e] hover:bg-[#c4c034] text-black font-medium py-2.5 px-8 rounded transition-colors duration-200"
      >
        Return to Home
      </button>
    </div>
  );
};

export default ExamCompletionCard;
