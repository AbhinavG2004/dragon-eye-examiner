
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface QuestionCardProps {
  questionNumber: number;
  question: string;
  options: string[];
  selectedAnswer: number;
  onSelectAnswer: (optionIndex: number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  questionNumber,
  question,
  options,
  selectedAnswer,
  onSelectAnswer
}) => {
  return (
    <Card className="bg-[#1e2736]/80 border-[#2a3749] backdrop-blur-sm rounded-xl max-w-4xl mx-auto">
      <CardContent className="p-8">
        <p className="text-sm text-gray-400 mb-2">Question {questionNumber}</p>
        <h2 className="text-2xl font-medium mb-8">{question}</h2>
        
        <div className="space-y-4 mb-6">
          {options.map((option, index) => (
            <div 
              key={index}
              onClick={() => onSelectAnswer(index)}
              className={`p-4 rounded-lg cursor-pointer transition-colors ${
                selectedAnswer === index 
                  ? 'bg-[#2d3748] border border-[#e6e13e]/40' 
                  : 'bg-[#1a202c] hover:bg-[#2d3748]/70'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 flex-shrink-0 rounded-full border flex items-center justify-center mr-3 ${
                  selectedAnswer === index 
                    ? 'border-[#e6e13e]' 
                    : 'border-gray-600'
                }`}>
                  {selectedAnswer === index && (
                    <div className="w-3 h-3 rounded-full bg-[#e6e13e]"></div>
                  )}
                </div>
                <span className="text-[#e6e13e]">{option}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
