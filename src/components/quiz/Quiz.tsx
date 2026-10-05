import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../Button';
import Card from '../Card';
import type { QuizQuestion } from '../../data/quizQuestions';

interface QuizProps {
  questions: QuizQuestion[];
}

const Quiz = ({ questions }: QuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Guard: the old version indexed questions[currentQuestionIndex] unguarded,
  // so an empty set crashed on .question and rendered NaN% on the results screen.
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-md w-full max-w-md p-8 text-center">
          <h2 className="text-xl font-bold mb-2 text-gray-800">No questions available</h2>
          <p className="text-gray-600">Check back once the reviewer set has been imported.</p>
        </div>
      </div>
    );
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    const currentQuestion = questions[currentQuestionIndex];
    if (answerIndex === currentQuestion.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const answered = selectedAnswer !== null;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  if (quizCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center p-4"
      >
        <div className="bg-white rounded-xl shadow-md w-full max-w-md p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Quiz Completed!
          </h2>
          <p className="text-lg mb-6 text-gray-600">
            You scored {score} out of {questions.length}
          </p>
          <div className="mb-6">
            <div className="h-2.5 w-full bg-gray-200 rounded-full">
              <div
                className="h-2.5 bg-green-600 rounded-full transition-all duration-1000"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-gray-500">{percentage}% Accuracy</p>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={handleRestartQuiz}
            className="w-full"
          >
            Retake Quiz
          </Button>
        </div>
      </motion.div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-6">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            Practice Quiz
          </h2>
          <span className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
        </div>
        
        <div className="mb-6">
          <div className="h-1 w-full bg-gray-200 rounded-full">
            <div
              className="h-1 bg-blue-600 rounded-full"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Progress
          </p>
        </div>
        
        <Card className="mb-6 p-6">
          <h3 className="text-lg font-medium mb-4 text-gray-800">
            {currentQuestion.question}
          </h3>
          <div className="space-y-3">
            {/* A correct pick used to render as a plain outline with no positive
                colour, while a wrong one turned solid red. Also: the old guard
                was `!selectedAnswer`, and index 0 is falsy, so the first option
                could never be chosen. h-auto lets long options wrap. */}
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isAnswer = index === currentQuestion.correctAnswer;

              let variant: 'outline' | 'success' | 'destructive' = 'outline';
              if (answered && isSelected && isAnswer) variant = 'success';
              else if (answered && isSelected) variant = 'destructive';
              else if (answered && isAnswer) variant = 'outline';

              return (
                <Button
                  key={option}
                  type="button"
                  variant={variant}
                  size="md"
                  aria-pressed={isSelected}
                  className={`w-full h-auto min-h-10 py-2 text-left whitespace-normal justify-start ${
                    answered && isAnswer ? 'border-green-600 text-green-700' : ''
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={answered}
                >
                  {option}
                </Button>
              );
            })}
          </div>
        </Card>
        
        {showExplanation && !quizCompleted ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-blue-500"
          >
            <h4 className="font-medium mb-2 text-blue-800">
              Explanation
            </h4>
            <p className="text-gray-700">
              {currentQuestion.explanation}
            </p>
          </motion.div>
        ) : null}
        
        <div className="flex justify-between">
          {/* "Skip Question" was gated on !showExplanation and disabled on
              selectedAnswer === null — and handleAnswerSelect always set both,
              so it could never be clicked. Only one action is needed now. */}
          <Button
            variant="primary"
            size="md"
            onClick={handleNextQuestion}
            className="w-full"
          >
            {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Quiz;