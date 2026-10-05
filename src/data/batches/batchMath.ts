import type { QuestionDraft } from '../../pipeline';

/**
 * AI-drafted batch: 40 situational mathematics items for `gened-mathematics`.
 *
 * Why this batch exists: the live bank holds 158 approved questions, but a
 * 350-item mock at the PRC graded ramp needs 175 moderate items and only 79
 * exist, and GenEd is the thinnest subject at 33 questions against a 20% TOS
 * weight. Easy and moderate items are the binding constraint, so this file
 * lands 16 at difficulty 2 and 18 at difficulty 3, with 6 at difficulty 4 for
 * the multi-step items where the setup hides the operation.
 *
 * Style notes for reviewers:
 *  - Every option in an item opens with the same words, so the answer cannot be
 *    pattern-matched from the first three words. This mirrors the real exam.
 *  - Every numeric answer is computed and shown in the explanation. Distractors
 *    are the specific mistakes a student would actually make, not random
 *    numbers — that is what makes the item diagnostic.
 *  - All content is original. Existing bank files were read only to avoid
 *    duplicating an item, never as a source.
 *
 * Everything here converts to `status: 'pending'`, so nothing in this file can
 * reach a student until a human approves it at /admin/review-queue.
 */

const V = (text: string) => text.trim();

export const BATCH_MATH: readonly QuestionDraft[] = [
  // ==================================================================
  // DIFFICULTY 2 — 16 items, single clear operation
  // ==================================================================
  {
    id: 'mat-001',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      Ms. Dela Cruz is writing a warm-up expression on the board before her
      Grade 8 class begins. She writes 2 x (12 - 7) + 3^2 and tells the class
      that students who work strictly from left to right will get a wrong
      answer. She asks them to say aloud which rule tells them what to do
      first. Last year several learners subtracted 12 and 7 before doing the
      multiplication, and the result no longer matched any rule they knew.
    `),
    prompt: 'What is the value of the expression Ms. Dela Cruz wrote?',
    options: [
      'The value of the expression, worked step by step, is 19.',
      'The value of the expression, worked step by step, is 26.',
      'The value of the expression, worked step by step, is 16.',
      'The value of the expression, worked step by step, is 28.',
    ],
    correctIndex: 0,
    explanation:
      'Exponents come first, so 3^2 = 9. Brackets next, so 12 - 7 = 5. Multiply before adding, so 2 x 5 = 10. Finally add: 10 + 9 = 19. Working from left to right without regard to order gives 26, which is the error Ms. Dela Cruz warned about. Reading 3^2 as 3 x 2 = 6 gives 16. Adding the bracket result to the power before multiplying gives 28.',
    rationale: 'Applying order of operations across powers, brackets, multiplication and addition in a single expression.',
    source: 'Mathematics; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-002',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      In the home economics kitchen, a group of Grade 7 learners is scaling a
      cookie recipe. The printed card yields 24 cookies and calls for two and
      a half cups of flour. Their teacher needs a tray for the parents' council
      meeting and asks for 36 cookies. She stresses that the recipe must be
      multiplied by a factor, because simply adding the extra twelve cookies'
      worth of flour treats the two batches as if they were the same size.
    `),
    prompt: 'How many cups of flour does the teacher need for 36 cookies?',
    options: [
      'The scaled recipe needs 3 and three-fourths cups of flour.',
      'The scaled recipe needs 5 and one-third cups of flour.',
      'The scaled recipe needs 3 cups of flour.',
      'The scaled recipe needs 2 and one-half cups of flour.',
    ],
    correctIndex: 0,
    explanation:
          'The scale factor is 36 divided by 24, which is 1.5. Multiplying the flour by that factor gives 2.5 x 1.5 = 3.75, or 3 and three-fourths cups. Dividing instead of multiplying, 2.5 divided by 1.5, gives one and two-thirds, so the 5-and-one-third distractor comes from multiplying 2.5 by 36 and ignoring the original 24, a 14.4-fold error. Using the original 2 and one-half cups unchanged ignores the larger batch, and multiplying by 24 instead of 36 gives 3 cups.',
    rationale: 'Scaling a recipe by a ratio rather than adding, using a proper fraction for the result.',
    source: 'Mathematics; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-003',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A barangay health worker lays square vinyl tiles on the floor of a
      clinic. One storeroom shelf holds tiles cut to 84 centimetres, and a
      second holds tiles cut to 126 centimetres. She wants to use one tile size
      for both rooms so that no tile has to be cut, and she asks a Grade 6
      learner to find the largest side length that divides into both numbers
      exactly. She notes in her log that the smallest matching tray size will
      also be needed for the clinic's supplier order.
    `),
    prompt: 'What side length of square tile does the worker need?',
    options: [
      'The tile side length she needs is 42 centimetres.',
      'The tile side length she needs is 21 centimetres.',
      'The tile side length she needs is 63 centimetres.',
      'The tile side length she needs is 126 centimetres.',
    ],
    correctIndex: 0,
    explanation:
      'The largest side that divides both 84 and 126 is their greatest common factor. Prime factors: 84 = 2 x 2 x 3 x 7 and 126 = 2 x 3 x 3 x 7, so the GCF is 2 x 3 x 7 = 42. Check: 84 divided by 42 is 2 and 126 divided by 42 is 3. The 21 answer is a common factor but not the greatest one. The 63 answer pairs the 3 and 7 but leaves 84 short, and 126 is a multiple rather than a factor. The matching tray for the supplier order would be the LCM, 252 centimetres.',
    rationale: 'Finding a greatest common factor from a real cutting problem and rejecting a merely common divisor.',
    source: 'Mathematics; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-004',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      During a number lesson, Ms. Aquino hands four index cards to her Grade 6
      class and asks for the ones that name a prime number. She reminds them
      that a prime number has exactly two factors, one and itself, and that a
      number above 9 needs testing against every prime up to its own square
      root before it can be called prime. Three learners already try to guess
      from the last digit alone.
    `),
    prompt: 'Which of the four numbers is prime?',
    options: [
      'The only prime number among the cards is 149.',
      'The only prime number among the cards is 91.',
      'The only prime number among the cards is 87.',
      'The only prime number among the cards is 51.',
    ],
    correctIndex: 0,
    explanation:
      'The square root of 149 is about 12.2, so test only 2, 3, 5, 7 and 11. The number is odd, its digits sum to 14, it does not end in 5, 7 x 21 = 147 and 11 x 13 = 143, so 149 is prime. The others factor: 91 = 7 x 13, 87 = 3 x 29, and 51 = 3 x 17. Each distractor is composite but was tempting because it is odd and does not end in 0 or 5.',
    rationale: 'Identifying a prime by testing divisors up to the square root rather than by surface pattern.',
    source: 'Mathematics; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-005',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      At a school canteen in Bulacan, a Grade 6 class buys a meal tray for a
      project. The printed subtotal on the receipt is two thousand five hundred
      pesos, and the cashier adds twelve percent value-added tax as required
      by Philippine law. One learner in the group has already added the tax
      onto the total instead of the subtotal, and another has added a flat
      twenty pesos per head. The class wants to know the amount to bring.
    `),
    prompt: 'How much does the class pay in total, including tax?',
    options: [
      'The total the class pays, tax included, is two thousand eight hundred pesos.',
      'The total the class pays, tax included, is two thousand seven hundred fifty pesos.',
      'The total the class pays, tax included, is three thousand pesos.',
      'The total the class pays, tax included, is two thousand five hundred pesos.',
    ],
    correctIndex: 0,
    explanation:
      'Twelve percent of 2,500 is 0.12 x 2,500 = 300 pesos of tax. Adding it to the subtotal gives 2,500 + 300 = 2,800 pesos. The 2,750 answer comes from using ten percent instead of twelve. The 3,000 answer adds twenty percent. The 2,500 answer omits the tax entirely, which is correct only for a customer who is exempt — not the case in this scenario.',
    rationale: 'Computing Philippine VAT as a percentage of the subtotal and adding it once.',
    source: 'Business mathematics; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-006',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 7 class records the quiz scores of six students: 12, 15, 15, 18,
      20 and 25. Their teacher asks the class to describe the set in one
      sentence using the mode and the range, warning them that the two figures
      answer different questions and that a score appearing twice is not
      necessarily the middle value. She also asks them not to report the mean,
      which works out to 17.5 and looks confusing next to a whole number.
    `),
    prompt: 'Which statement about the six scores is correct?',
    options: [
      'The correct statement is that the mode is 15 and the range is 13.',
      'The correct statement is that the mode is 15 and the median is 17.5.',
      'The correct statement is that the median is 15 and the range is 25.',
      'The correct statement is that the mean is 15 and the range is 13.',
    ],
    correctIndex: 0,
    explanation:
      'The mode is the value that appears most often, which is 15 (twice). The range is the largest value minus the smallest, 25 minus 12, which is 13. The second option confuses the mean with the median: the mean is 17.5 while the median is 16.5, and neither is 15. The third option treats the repeated score as the middle and reports the maximum as the range. The fourth option mistakes the mode for the mean, which is 17.5.',
    rationale: 'Separating mode, range, median and mean on one small data set instead of substituting one for another.',
    source: 'Statistics; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-007',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 8 class is asked to estimate the cost of new vinyl flooring for a
      classroom that measures 8 metres by 12 metres. A supplier quotes three
      hundred fifty pesos for each square metre, including installation. Some
      learners propose adding up the four sides of the room and multiplying,
      reasoning that the room has an edge all the way around, and the teacher
      asks them to explain why a floor covering should not be measured by its
      border.
    `),
    prompt: 'What is the total cost of flooring the classroom?',
    options: [
      'The total cost of flooring the classroom is 33,600 pesos.',
      'The total cost of flooring the classroom is 14,000 pesos.',
      'The total cost of flooring the classroom is 3,360 pesos.',
      'The total cost of flooring the classroom is 2,800 pesos.',
    ],
    correctIndex: 0,
    explanation:
      'Flooring covers area, so compute 8 x 12 = 96 square metres. Multiplying by the rate gives 96 x 350 = 33,600 pesos. The 14,000 answer uses the perimeter, 2 x (8 + 12) = 40 metres, which measures the border and not the surface. The 3,360 answer shifts the decimal of the unit price. The 2,800 answer comes from 8 x 12 = 96 treated as if the rate were about 29 pesos, or from halving the area twice by mistake.',
    rationale: 'Distinguishing area from perimeter in a costing problem before applying a unit rate.',
    source: 'Measurement; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-008',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 7 class is measuring a storage tank for a school garden project.
      The tank measures 40 centimetres by 25 centimetres by 20 centimetres, and
      the teacher asks them to report its capacity in cubic centimetres before
      comparing it with a one-litre jar, which holds 1,000 cubic centimetres.
      She warns that adding the three edges together, as several learners
      tried, describes the wire frame of the box rather than what it holds.
    `),
    prompt: 'What is the volume of the tank in cubic centimetres?',
    options: [
      'The volume of the tank is 20,000 cubic centimetres.',
      'The volume of the tank is 2,000 cubic centimetres.',
      'The volume of the tank is 200,000 cubic centimetres.',
      'The volume of the tank is 400,000 cubic centimetres.',
    ],
    correctIndex: 0,
    explanation:
      'Volume of a rectangular solid is length x width x height: 40 x 25 = 1,000, then 1,000 x 20 = 20,000 cubic centimetres. That is 20 litres, since a litre is 1,000 cubic centimetres. The 2,000 answer multiplies only two of the three edges. The 200,000 answer multiplies twice over, and the 400,000 answer doubles the correct figure.',
    rationale: 'Applying the rectangular solid volume formula and converting cubic centimetres to litres.',
    source: 'Measurement; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-009',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 8 class is repairing a wooden triangle for a school fair. One
      vertex of the triangle has been damaged and replaced with a straight
      seam. To check the repair, a learner measures the two untouched interior
      angles of the original triangle as 55 degrees and 68 degrees, then asks
      whether the new seam, which lies outside the shape, can be inferred
      without first measuring it. The teacher reminds the class that an
      exterior angle and the two remote interior angles are not independent.
    `),
    prompt: 'What is the measure of the exterior angle at the replaced vertex?',
    options: [
      'The exterior angle at that vertex measures 123 degrees.',
      'The exterior angle at that vertex measures 77 degrees.',
      'The exterior angle at that vertex measures 57 degrees.',
      'The exterior angle at that vertex measures 180 degrees.',
    ],
    correctIndex: 0,
    explanation:
      'The exterior angle equals the sum of the two remote interior angles, so 55 + 68 = 123 degrees. The same result follows from the angle sum: the third interior angle is 180 - 123 = 57 degrees, and 180 - 57 = 123. The 77 answer incorrectly subtracts 68 from 55. The 57 answer is the interior angle itself, not the seam. The 180 answer belongs to a straight angle, which every pair of adjacent angles forms.',
    rationale: 'Using the exterior angle theorem rather than assuming an exterior angle is supplementary to either adjacent angle alone.',
    source: 'Geometry; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-010',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 8 class is running a probability station using a paper bag.
      The bag holds five red marbles and three blue ones, drawn at random with
      no looking. Their teacher asks for the chance of drawing red and wants
      the answer as a fraction, insisting that the class state the total number
      of equally likely outcomes before naming any chance. She asks them to
      check their fraction with a decimal calculator afterwards.
    `),
    prompt: 'What is the probability of drawing a red marble?',
    options: [
      'The probability of drawing red is five-eighths.',
      'The probability of drawing red is three-eighths.',
      'The probability of drawing red is five-thirds.',
      'The probability of drawing red is eight-fifths.',
    ],
    correctIndex: 0,
    explanation:
      'There are 5 red marbles out of 5 + 3 = 8 marbles in total, so the probability is 5/8, which is 0.625 or 62.5 percent. The 3/8 answer gives the chance of blue, which is the complement. The 5/3 answer inverts the ratio and is greater than 1, which is impossible for a probability. The 8/5 answer also exceeds 1; it treats the total as the numerator.',
    rationale: 'Forming a probability as favourable outcomes over total equally likely outcomes, and rejecting values above 1.',
    source: 'Probability; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-011',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 7 class is comparing the growth of bacteria in a sealed jar. The
      teacher tells them that the culture multiplies by four every hour, and
      asks what the population would be after five hours if it began with one
      organism. Several learners multiply four by five and get 20, while others
      reach for a calculator. The teacher insists they first predict whether
      the answer should be near 20 or much larger, and explain their
      reasoning to a partner.
    `),
    prompt: 'What is the value of 4 raised to the power of 5?',
    options: [
      'The value of four to the fifth power is 1,024.',
      'The value of four to the fifth power is 20.',
      'The value of four to the fifth power is 512.',
      'The value of four to the fifth power is 256.',
    ],
    correctIndex: 0,
    explanation:
      'A power means repeated multiplication of the base, so 4^5 = 4 x 4 x 4 x 4 x 4 = 1,024. You can also build it up: 4^2 = 16, 4^3 = 64, 4^4 = 256, 4^5 = 1,024. The 20 answer multiplies base by exponent. The 512 answer is 4^4 plus 4^3, or 8 cubed, and the 256 answer is one power short.',
    rationale: 'Evaluating a power as repeated multiplication and rejecting the base-times-exponent error.',
    source: 'Mathematics; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-012',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A public works crew mixes concrete for a basketball court repair in a
      fixed ratio of two parts sand to three parts cement to five parts gravel.
      The supervisor says the delivery will consist of forty bags in total,
      but the crew must be told how many bags to open for each material before
      they start. Their teacher uses the school's basketball team to show that
      the parts are a way of dividing a whole, not three separate quantities to
      be guessed.
    `),
    prompt: 'How many bags of sand does the crew need?',
    options: [
      'The crew needs 8 bags of sand.',
      'The crew needs 4 bags of sand.',
      'The crew needs 12 bags of sand.',
      'The crew needs 16 bags of sand.',
    ],
    correctIndex: 0,
    explanation:
      'The three parts total 2 + 3 + 5 = 10 parts, so each part is 40 divided by 10 = 4 bags. Sand takes 2 parts, so 2 x 4 = 8 bags, with 12 bags of cement and 20 of gravel, and 8 + 12 + 20 = 40 checks out. The 4 answer is one part. The 12 answer is the cement figure. The 16 answer doubles the sand share.',
    rationale: 'Converting a part-to-part ratio into actual counts given a whole.',
    source: 'Ratio and proportion; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-013',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 7 class keeps a register of how many learners attend the school
      reading session each day. The Monday, Tuesday, Wednesday, Thursday and
      Friday counts are 45, 52, 48, 51 and 60. The teacher asks the class to
      report both the day with the most readers and how far ahead it is of the
      weakest day, since the class council wants that gap to shrink next term.
      She asks them to justify the gap they report rather than guessing at the
      comparison.
    `),
    prompt: 'Which day had the highest attendance, and by how much?',
    options: [
      'Friday had the highest attendance, by 15 learners.',
      'Friday had the highest attendance, by 12 learners.',
      'Tuesday had the highest attendance, by 7 learners.',
      'Wednesday had the highest attendance, by 3 learners.',
    ],
    correctIndex: 0,
    explanation:
      'The largest count is 60 on Friday and the smallest is 45 on Monday, so the gap is 60 - 45 = 15 learners. The 12 figure compares Friday with Wednesday (60 - 48), which is not the weakest day. The 7 figure is Tuesday over Monday (52 - 45), and the 3 figure is Wednesday over Monday, so each distractor pairs a real pair of numbers without pairing the right one.',
    rationale: 'Reading maximum and minimum from a small data table and taking the difference between them.',
    source: 'Data interpretation; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-014',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 8 arts club lays out a seating plan for a school exhibit. The
      first row holds 12 chairs and each row after it adds six more, so the
      rows hold 12, 18, 24 and so on. The teacher asks the class how many
      chairs the eighth row needs. She reminds them that the first row already
      counts as twelve, so a student must not treat the difference as the
      starting value, and asks them to test their answer on the third row.
    `),
    prompt: 'How many chairs does the eighth row hold?',
    options: [
      'The eighth row holds 54 chairs.',
      'The eighth row holds 60 chairs.',
      'The eighth row holds 48 chairs.',
      'The eighth row holds 96 chairs.',
    ],
    correctIndex: 0,
    explanation:
      'This is an arithmetic sequence with first term 12 and common difference 6. The eighth term is a + (n - 1)d = 12 + 7 x 6 = 12 + 42 = 54. Check with the third row: 12 + 2 x 6 = 24, which matches the sequence. The 60 answer counts eight differences instead of seven. The 48 answer adds six differences but starts from the difference. The 96 answer doubles the first term.',
    rationale: 'Finding a later term of an arithmetic sequence with the nth-term formula rather than counting differences from zero.',
    source: 'Sequences; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-015',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A science club records the population of a city as four and a half
      million people and wants to store the figure compactly in a table that
      will be printed. Their teacher asks them to rewrite it using a power of
      ten and reminds them that the coefficient must be at least one and less
      than ten. She also asks whether another arrangement with the same
      coefficient would still be accepted by the printer's rule.
    `),
    prompt: 'How is the population written in standard scientific notation?',
    options: [
      'The standard scientific notation is 4.5 times ten to the sixth.',
      'The standard scientific notation is 45 times ten to the fifth.',
      'The standard scientific notation is 4.5 times ten to the seventh.',
      'The standard scientific notation is 0.45 times ten to the seventh.',
    ],
    correctIndex: 0,
    explanation:
      'Move the decimal point six places left to get 4.5, which means the power of ten is six: 4.5 x 10^6 = 4,500,000. The 45 x 10^5 option equals the same number but its coefficient is not between 1 and 10, so it is not in standard form. The 4.5 x 10^7 option is forty-five million, ten times too large, and 0.45 x 10^7 also breaks the rule because the coefficient is below 1.',
    rationale: 'Converting a large number to scientific notation and applying the one-to-ten rule on the coefficient.',
    source: 'Mathematics; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-016',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      In a Grade 7 remedial session, Ms. Soriano gives four learners the task
      of checking each other's answers. One pair wrote 3x + 7 = 22 and claimed
      x = 5 without showing work. The teacher asks them to substitute their
      answer back into the original equation, explaining that a solution which
      does not make the equation true was never a solution. She also asks them
      to state which single step isolated the variable.
    `),
    prompt: 'What value of x satisfies the equation?',
    options: [
      'The value of x that satisfies the equation is 5.',
      'The value of x that satisfies the equation is 3.',
      'The value of x that satisfies the equation is 7.',
      'The value of x that satisfies the equation is 15.',
    ],
    correctIndex: 0,
    explanation:
      'Subtract 7 from both sides to get 3x = 15, then divide both sides by 3 to get x = 5. Substitute to check: 3 x 5 + 7 = 22, which matches. The 3 answer keeps only the coefficient. The 7 answer keeps only the constant that was subtracted. The 15 answer stops after subtracting 7 and forgets to divide by the coefficient 3.',
    rationale: 'Solving a one-variable linear equation by inverse operations and verifying by substitution.',
    source: 'Algebra; PRC GenEd TOS — Mathematics',
  },
];

export default BATCH_MATH;