export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // index of the correct option
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the basic step pattern in Tinikling dance?',
    options: [
      'Two steps to the left, two steps to the right',
      'In-and-out footwork between bamboo poles',
      'Clapping hands while stepping',
      'Spinning in a circle'
    ],
    correctAnswer: 1,
    explanation: 'Tinikling involves dancers stepping in and out of between two bamboo poles that are being beaten together on the ground.'
  },
  {
      id: 2,
      question: 'Which Philippine folk dance is known as the "Dance of the Doves"?',
      options: [
        'Tinikling',
        'Pandanggo sa Ilaw',
        'Pantomina',
        'Singkil'
      ],
      correctAnswer: 2,
      explanation: 'Pantomina is the Bicolano dance known as the "Dance of the Doves." Its name derives from the Bicol word "salampati," meaning dove. This question previously attributed the title to Itik-itik, which is duck-mimicry from the Visayas.'
    },
  {
    id: 3,
    question: 'In Pandanggo sa Ilaw, what do dancers typically balance?',
    options: [
      'Books on their heads',
      'Oil lamps or candles in glasses',
      'Fruit baskets',
      'Musical instruments'
    ],
    correctAnswer: 1,
    explanation: 'Pandanggo sa Ilaw (Fandango with Lights) requires dancers to balance oil lamps or candles placed in glasses on their heads and hands while dancing.'
  },
  {
    id: 4,
    question: 'Which of the following is a characteristic of the Kuratsa dance?',
    options: [
      'Performed with bamboo poles',
      'Involves waving of handkerchiefs',
      'Features a chasing and fleeing pattern between couples',
      'Performed exclusively by men'
    ],
    correctAnswer: 2,
    explanation: 'Kuratsa is a dance of courtship where couples perform a chasing and fleeing pattern, often accompanied by the waving of handkerchiefs.'
  },
  {
    id: 5,
    question: 'What is the origin of the Cariñosa dance?',
    options: [
      'Northern Luzon',
      'Visayas region',
      'Mindanao',
      'Palawan'
    ],
    correctAnswer: 1,
    explanation: 'The Cariñosa dance originated in the Visayas region and is known as a flirtatious dance that uses a fan or handkerchief as props.'
  }
];