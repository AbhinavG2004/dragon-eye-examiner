
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import ExamHeader from '@/components/exam/ExamHeader';
import ExamProgressBar from '@/components/exam/ExamProgressBar';
import QuestionCard from '@/components/exam/QuestionCard';
import QuestionNavigation from '@/components/exam/QuestionNavigation';
import ExamCompletionCard from '@/components/exam/ExamCompletionCard';
import { Question } from '@/types/exam';

// Sample questions data
const questions: Question[] = [
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

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#111827] text-white">
      <ExamHeader 
        studentName={studentName}
        studentId={studentId}
        onCameraError={handleCameraError}
      />
      
      <ExamProgressBar 
        currentQuestion={currentQuestion}
        totalQuestions={questions.length}
        timeLeft={timeLeft}
      />

      <div className="container mx-auto p-6">
        {isExamSubmitted ? (
          <ExamCompletionCard 
            totalQuestions={questions.length}
            answeredQuestions={selectedAnswers.filter(a => a !== -1).length}
            onReturnHome={handleReturnHome}
          />
        ) : (
          <div>
            <QuestionCard 
              questionNumber={currentQuestion + 1}
              question={questions[currentQuestion].question}
              options={questions[currentQuestion].options}
              selectedAnswer={selectedAnswers[currentQuestion]}
              onSelectAnswer={handleAnswerSelect}
            />
            
            <QuestionNavigation 
              currentQuestion={currentQuestion}
              totalQuestions={questions.length}
              onPrevQuestion={handlePrevQuestion}
              onNextQuestion={handleNextQuestion}
              onSubmitExam={handleSubmitExam}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Exam;
