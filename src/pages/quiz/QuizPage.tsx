import React from 'react';
import { quizQuestions } from '../../data/quizQuestions';
import Quiz from '../../components/quiz/Quiz';

const QuizPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Quiz questions={quizQuestions} />
    </div>
  );
};

export default QuizPage;