
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import Camera from '@/components/Camera';

// Sample questions data
const questions = [
  {
    id: 1,
    question: "Which of the following is a characteristic of a secure proctoring system?",
    options: [
      "Recording the screen without student's consent",
      "Continuous identity verification during the exam",
      "Allowing unlimited access to external resources",
      "Disabling computer functionality completely"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Which of the following is a benefit of online proctoring?",
    options: [
      "Reduced accessibility",
      "Increased exam costs",
      "Remote exam supervision",
      "Slower grading process"
    ],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "What does 'Dragon' represent in this system?",
    options: [
      "The mascot of the institution",
      "The password for access",
      "The developer's name",
      "The security protocol used"
    ],
    correctAnswer: 1
  }
];

const Exam = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [isExamSubmitted, setIsExamSubmitted] = useState(false);
  const [studentName] = useState("ABHINAV");
  const [studentId] = useState("RA2211003011638");
  const navigate = useNavigate();

  useEffect(() => {
    // Timer countdown effect
    if (timeLeft > 0 && !isExamSubmitted) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isExamSubmitted) {
      handleSubmitExam();
    }
  }, [timeLeft, isExamSubmitted]);

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitExam = () => {
    // Calculate score
    const correctAnswers = selectedAnswers.filter(
      (answer, index) => answer === questions[index].correctAnswer
    ).length;
    
    setIsExamSubmitted(true);
    
    toast({
      title: "Exam Submitted",
      description: `You scored ${correctAnswers} out of ${questions.length} questions correctly.`
    });
  };

  const handleCameraError = (error: string) => {
    toast({
      title: "Proctoring Error",
      description: error,
      variant: "destructive",
    });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#111827] text-white">
      {/* Header */}
      <header className="bg-[#0f1623] py-3 px-6 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold mr-3 text-[#e6e13e]">Dragon</h1>
          <span className="bg-[#1e2736] text-sm px-3 py-1 rounded">Proctor</span>
        </div>
        <div className="flex items-center">
          <div className="mr-8 text-right">
            <p className="font-medium">{studentName}</p>
            <p className="text-xs text-gray-400">ID: {studentId}</p>
          </div>
          <div className="relative border-2 border-[#1e2736] rounded-lg w-20 h-20 overflow-hidden">
            <Camera 
              onError={handleCameraError} 
              className="h-full w-full" 
            />
            <div className="absolute top-1 left-1 flex items-center">
              <span className="inline-flex items-center text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-white rounded-full mr-0.5 animate-pulse"></span>
                inactive
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-[#0f1623] py-2 px-6 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center space-x-2 w-full max-w-xs">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-400">{currentQuestion + 1}/{questions.length}</span>
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

      {/* Main content */}
      <div className="container mx-auto p-6">
        {isExamSubmitted ? (
          <div className="bg-[#1e2736]/60 rounded-xl p-10 text-center max-w-2xl mx-auto mt-20">
            <h2 className="text-2xl font-bold mb-4">Exam Completed</h2>
            <p className="text-gray-300 mb-6">Thank you for completing the exam.</p>
            <p className="text-xl mb-8">
              You answered {selectedAnswers.filter(a => a !== -1).length} out of {questions.length} questions.
            </p>
            <button 
              onClick={() => navigate('/')} 
              className="bg-[#e6e13e] hover:bg-[#c4c034] text-black font-medium py-2.5 px-8 rounded transition-colors duration-200"
            >
              Return to Home
            </button>
          </div>
        ) : (
          <div className="bg-[#1e2736]/60 rounded-xl p-8 backdrop-blur-sm max-w-4xl mx-auto">
            <p className="text-sm text-gray-400 mb-2">Question {currentQuestion + 1}</p>
            <h2 className="text-2xl font-medium mb-8">{questions[currentQuestion].question}</h2>
            
            <div className="space-y-4 mb-10">
              {questions[currentQuestion].options.map((option, index) => (
                <div 
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedAnswers[currentQuestion] === index 
                      ? 'bg-[#2d3748] border border-[#e6e13e]/30' 
                      : 'bg-[#1a202c] hover:bg-[#2d3748]/70'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 flex-shrink-0 rounded-full border flex items-center justify-center mr-3 ${
                      selectedAnswers[currentQuestion] === index 
                        ? 'border-[#e6e13e]' 
                        : 'border-gray-600'
                    }`}>
                      {selectedAnswers[currentQuestion] === index && (
                        <div className="w-3 h-3 rounded-full bg-[#e6e13e]"></div>
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <button 
                onClick={handlePrevQuestion} 
                disabled={currentQuestion === 0}
                className={`px-6 py-2 rounded border ${
                  currentQuestion === 0 
                    ? 'opacity-50 cursor-not-allowed border-gray-700 text-gray-500' 
                    : 'border-gray-600 hover:border-gray-400'
                }`}
              >
                Previous
              </button>
              
              {currentQuestion === questions.length - 1 ? (
                <button 
                  onClick={handleSubmitExam}
                  className="bg-[#e6e13e] hover:bg-[#c4c034] text-black font-medium py-2 px-6 rounded transition-colors duration-200"
                >
                  Submit Exam
                </button>
              ) : (
                <button 
                  onClick={handleNextQuestion}
                  className="px-6 py-2 rounded border border-gray-600 hover:border-gray-400"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Exam;
