
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import Camera from '@/components/Camera';

// Sample questions data
const questions = [
  {
    id: 1,
    question: "What is the primary purpose of a proctoring system?",
    options: [
      "To increase exam difficulty",
      "To monitor students during exams",
      "To grade exams automatically",
      "To prepare exam content"
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
  },
  {
    id: 4,
    question: "Which technology is essential for video proctoring?",
    options: [
      "Keyboard",
      "Camera",
      "Printer",
      "Speaker"
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "What action might be flagged as suspicious during an exam?",
    options: [
      "Looking at the screen",
      "Typing answers",
      "Looking away frequently",
      "Sitting still"
    ],
    correctAnswer: 2
  }
];

const Exam = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isExamSubmitted, setIsExamSubmitted] = useState(false);
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

  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-6">
      <div className="container mx-auto max-w-5xl">
        <header className="mb-6 flex flex-col sm:flex-row items-center justify-between">
          <h1 className="text-2xl font-semibold mb-4 sm:mb-0">Dragon Proctoring System</h1>
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-secondary rounded-lg">
              <span className="font-medium">Time Left: </span>
              <span className={`font-mono ${timeLeft < 60 ? 'text-destructive' : ''}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            <button 
              onClick={handleSubmitExam} 
              disabled={isExamSubmitted}
              className="btn-primary"
            >
              Submit Exam
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main content area with questions */}
          <div className="lg:col-span-3 glass-card rounded-xl p-6 animate-fade-in">
            {isExamSubmitted ? (
              <div className="text-center py-12 space-y-6 animate-fade-in">
                <h2 className="text-2xl font-semibold">Exam Completed</h2>
                <p className="text-muted-foreground">Thank you for completing the exam.</p>
                <p>
                  You answered {selectedAnswers.filter(a => a !== -1).length} out of {questions.length} questions.
                </p>
                <button 
                  onClick={() => navigate('/')} 
                  className="btn-primary mt-6"
                >
                  Return to Home
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Question {currentQuestion + 1} of {questions.length}</h3>
                    <span className="text-sm bg-secondary px-3 py-1 rounded-full">
                      {selectedAnswers[currentQuestion] !== -1 ? 'Answered' : 'Unanswered'}
                    </span>
                  </div>
                  <p className="text-xl mb-6">{questions[currentQuestion].question}</p>
                  
                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((option, index) => (
                      <div 
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-primary ${
                          selectedAnswers[currentQuestion] === index ? 'border-primary bg-primary/5' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            selectedAnswers[currentQuestion] === index ? 'border-primary' : 'border-gray-300'
                          }`}>
                            {selectedAnswers[currentQuestion] === index && (
                              <div className="w-3 h-3 rounded-full bg-primary"></div>
                            )}
                          </div>
                          <span>{option}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button 
                    onClick={handlePrevQuestion} 
                    disabled={currentQuestion === 0}
                    className={`px-4 py-2 rounded border ${
                      currentQuestion === 0 
                        ? 'opacity-50 cursor-not-allowed border-gray-200' 
                        : 'border-gray-300 hover:border-primary'
                    }`}
                  >
                    Previous
                  </button>
                  <button 
                    onClick={handleNextQuestion} 
                    disabled={currentQuestion === questions.length - 1}
                    className={`px-4 py-2 rounded border ${
                      currentQuestion === questions.length - 1 
                        ? 'opacity-50 cursor-not-allowed border-gray-200' 
                        : 'border-gray-300 hover:border-primary'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Camera sidebar */}
          <div className="glass-card rounded-xl p-4 space-y-4 animate-fade-in">
            <h3 className="text-lg font-medium text-center">Proctoring Camera</h3>
            <Camera 
              onError={handleCameraError} 
              className="h-[220px] w-full rounded-lg" 
            />
            <div className="space-y-2 text-sm text-muted-foreground pt-2 border-t">
              <p>• Ensure your face is clearly visible</p>
              <p>• Stay within camera view</p>
              <p>• Good lighting is recommended</p>
              <p>• Avoid suspicious movements</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exam;
