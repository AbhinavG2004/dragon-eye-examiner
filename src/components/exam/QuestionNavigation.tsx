
import React from 'react';
import { Button } from "@/components/ui/button";

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
    <div className="flex justify-between mt-8 max-w-4xl mx-auto">
      <Button 
        onClick={onPrevQuestion} 
        disabled={currentQuestion === 0}
        variant="outline" 
        className={`border ${
          currentQuestion === 0 
            ? 'opacity-50 cursor-not-allowed border-gray-700 text-gray-500' 
            : 'border-gray-600 hover:border-gray-400 hover:bg-gray-800/30'
        }`}
      >
        Previous
      </Button>
      
      {currentQuestion === totalQuestions - 1 ? (
        <Button 
          onClick={onSubmitExam}
          className="bg-[#e6e13e] hover:bg-[#c4c034] text-black font-medium"
        >
          Submit Exam
        </Button>
      ) : (
        <Button 
          onClick={onNextQuestion}
          variant="outline"
          className="border border-gray-600 hover:border-gray-400 hover:bg-gray-800/30"
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default QuestionNavigation;
