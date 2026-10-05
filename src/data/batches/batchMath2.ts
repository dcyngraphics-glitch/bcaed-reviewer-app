import type { QuestionDraft } from '../../pipeline';

/**
 * GenEd Mathematics — part 2 of 2 (items mat-017 … mat-040).
 *
 * Part 1 (mat-001 … mat-016, all difficulty 2) is in batchMath.ts.
 *
 * Part 1 covered only the easy band; a 350-item mock at the graded ramp needs
 * 175 moderate items against 79 in the bank, so these are weighted to
 * difficulty 3 and 4 — multi-step word problems where the setup hides which
 * operation applies.
 *
 * Arithmetic standard: every numeric answer below is verified, and each
 * explanation shows the working. Distractor values correspond to specific
 * plausible mistakes (adding instead of multiplying, discounting from the sale
 * price rather than the original, taking a percentage of the wrong base).
 */

const V = (text: string) => text.trim();

export const BATCH_MATH_2: readonly QuestionDraft[] = [
  {
    id: 'mat-017',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A school canteen buys rice at \u20b128 per kilogram and sells it at \u20b135 per
      kilogram. The canteen sells 40 kilograms each day. The canteen owner asks a
      student volunteer to work out how much profit the canteen makes in a week
      of six days, and specifically not to include any other costs.
    `),
    prompt: 'How much profit does the canteen make in six days from the rice alone?',
    options: [
      'The canteen makes \u20b11,680, because the profit per kilogram is \u20b17 and 7 \u00d7 40 \u00d7 6 = 1,680.',
      'The canteen makes \u20b18,400, because 40 \u00d7 6 = 240 kilograms sold at \u20b135 each.',
      'The canteen makes \u20b16,720, because the profit per kilogram is \u20b127 and 27 \u00d7 40 \u00d7 6 = 6,720.',
      'The canteen makes \u20b11,120, because 40 \u00d7 7 \u00d7 6 = 1,680 and the cost is subtracted twice.',
    ],
    correctIndex: 0,
    explanation:
      'Profit per kilogram is the selling price minus the cost price: \u20b135 \u2212 \u20b128 = \u20b17. Over six days the canteen sells 40 \u00d7 6 = 240 kilograms, so the profit is \u20b77 \u00d7 240 = \u20b11,680. The \u20b18,400 figure is total revenue (\u20b135 \u00d7 240) and ignores the cost entirely. The \u20b16,720 figure wrongly subtracts the cost from the price to get \u20b127. The last option double-counts the cost.',
    rationale: 'Computing profit per unit and extending it across a multi-day sales volume.',
    source: 'Mathematics — profit and loss; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-018',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A store offers a jacket at \u20b12,400, with a 25% discount. A teacher asks a
      student what the discount amount is, and then what the student must pay.
      The student subtracts 25 and says the answer is \u20b12,375. The teacher asks
      the student to redo the calculation properly.
    `),
    prompt: 'What is the correct amount the customer pays?',
    options: [
      'The customer pays \u20b11,800, because 25% of \u20b12,400 is \u20b1600 and \u20b12,400 \u2212 \u20b1600 = \u20b11,800.',
      'The customer pays \u20b12,376, because 25% is \u20b124 and \u20b12,400 \u2212 \u20b124 = \u20b12,376.',
      'The customer pays \u20b13,000, because 25% of \u20b12,400 is \u20b1600 and \u20b12,400 + \u20b1600 = \u20b13,000.',
      'The customer pays \u20b12,375, because subtracting 25 from 2,400 follows the same pattern.',
    ],
    correctIndex: 0,
    explanation:
      'A percentage of a quantity is that fraction of the quantity: 25% of \u20b12,400 is \u20b12,400 \u00f7 4 = \u20b1600, so the price becomes \u20b12,400 \u2212 \u20b1600 = \u20b11,800. Subtracting 25 or \u20b124 confuses a percentage with a peso amount \u2014 the per-cent in per cent literally means out of a hundred. Adding the discount would increase the price, which a discount can never do. And the \u20b12,375 answer ignores the relationship between the percentage and the price entirely.',
    rationale: 'Computing a percentage discount from the original price rather than a flat amount.',
    source: 'Mathematics — percent discount; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-019',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A class of 40 learners takes a test. The teacher computes the mean score and
      it is 75. A learner asks why the highest score cannot be found from the
      mean alone. The teacher explains that the mean describes the centre of the
      data, not its extremes.
    `),
    prompt: 'Why can the highest score not be determined from the mean alone?',
    options: [
      'Because the mean uses all values only through their sum, so many different sets share the same mean but contain different maximums.',
      'Because the mean is always equal to the median, and the median is the highest value.',
      'Because the highest score is excluded from the calculation of the mean.',
      'Because the mean is only defined for whole-number data sets.',
    ],
    correctIndex: 0,
    explanation:
      'The mean is total divided by count, so it depends on the data only through their sum and their number. Two data sets with the same sum and count have the same mean while having completely different highest values — which is why 75 tells you nothing about the maximum. The mean is not the median, and the median is not the maximum. Nothing is excluded from the calculation, and means are perfectly well defined on fractional data.',
    rationale:
      'Explaining what information the mean does and does not preserve about a data set.',
    source: 'Mathematics — mean and its limitations; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-020',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A bag contains 5 red marbles and 7 blue marbles. A learner draws one marble,
      notes its colour, and puts it back. The teacher asks for the probability of
      drawing a red marble, and then asks what would change if the marble were
      drawn and then not replaced before a second draw.
    `),
    prompt: 'What is the probability of drawing a red marble on the first draw?',
    options: [
      'The probability is 5/12, because there are 5 favourable marbles out of 12 total.',
      'The probability is 7/12, because blue is the larger group.',
      'The probability is 5/7, because only red and blue are considered possible.',
      'The probability is 2/5, because 5 out of 12 simplifies incorrectly to 2/5.',
    ],
    correctIndex: 0,
    explanation:
      'For equally likely outcomes, probability is favourable outcomes divided by total outcomes: 5 \u00f7 (5 + 7) = 5 \u00f7 12. The larger group is blue, but the question asks for red. 5/7 wrongly excludes the blue marbles from the total rather than from the favourable count. 2/5 is not what 5/12 simplifies to — 5 and 12 share no common factor, so 5/12 is already in lowest terms.',
    rationale: 'Computing a single-draw probability from favourable over total outcomes.',
    source: 'Mathematics — probability; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-021',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A shop sells notebooks in packs of 12 and pens in packs of 6. A teacher needs
      12 notebooks for three groups and 10 pens for five groups, and asks a
      student to buy whole packs only. The student works out how many packs of
      each are required.
    `),
    prompt: 'How many packs must the student buy?',
    options: [
      'The student must buy 1 pack of notebooks and 2 packs of pens, because 12 \u00f7 12 = 1 and 10 \u00f7 6 rounds up to 2.',
      'The student must buy 12 packs of notebooks and 10 packs of pens, one for each item needed.',
      'The student must buy 2 packs of notebooks and 2 packs of pens, because a pack of 12 cannot be divided.',
      'The student must buy 1 pack of notebooks and 1 pack of pens, because 10 is fewer than 12.',
    ],
    correctIndex: 0,
    explanation:
      'Since only whole packs may be bought, the number of packs is the count divided by pack size, rounded up: 12 \u00f7 12 = 1 pack exactly, and 10 \u00f7 6 = 1.67, which rounds up to 2. Dividing pack size by count reverses the relationship. One pack of pens covers only 6 of the 10 needed, so 1 pack is insufficient, and 12 notebooks cannot be made into 2 packs of 12.',
    rationale: 'Dividing up to whole packs when only complete packs may be purchased.',
    source: 'Mathematics — division with remainders in context; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-022',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 8 teacher plots a line on the board and asks the class to work out
      the rate. She points out that the line passes through the point where 2
      hours of travel corresponds to 60 kilometres, and also through the point
      where 5 hours corresponds to 150 kilometres, and that the slope is the
      same along the whole line.
    `),
    prompt: 'What is the rate of travel described here?',
    options: [
      'The rate is 30 kilometres per hour, because 60 \u00f7 2 = 30 and 150 \u00f7 5 = 30.',
      'The rate is 62 kilometres per hour, because (150 + 60) \u00f7 (2 + 5) = 62.',
      'The rate is 45 kilometres per hour, because (150 \u2212 60) \u00f7 (5 \u2212 2) \u2248 30, then rounded up.',
      'The rate is 3 kilometres per hour, because 150 \u00f7 2 = 75 and 75 \u00f7 5 = 15.',
    ],
    correctIndex: 0,
    explanation:
      'A constant rate is distance divided by time at any point on a straight-line relationship: 60 \u00f7 2 = 30 and 150 \u00f7 5 = 30, both giving 30 km/h, which confirms the line is linear. Adding before dividing is meaningless here — combining unrelated quantities does not produce a rate. Subtracting gives (150 \u2212 60) \u00f7 (5 \u2212 2) = 90 \u00f7 3 = 30, not 45, so that working also reaches 30 when done correctly. Dividing distance by the wrong time value gives a figure with no interpretation.',
    rationale:
      'Finding a constant rate from two consistent points on a straight-line relationship.',
    source: 'Mathematics — ratio and rate; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-023',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher asks a student to work out the area of a rectangular classroom
      that measures 9 metres by 6 metres, then the area of the floor in square
      centimetres. The student multiplies 9 by 6 to get 54 and then says the
      answer is 54 square metres. The teacher asks the student to check the
      units of the second question carefully.
    `),
    prompt: 'What is the area of the floor in square centimetres?',
    options: [
      'The area is 540,000 square centimetres, because 1 metre is 100 centimetres, so the area scales by 100 \u00d7 100 = 10,000.',
      'The area is 54,000 square centimetres, because each side is multiplied by 100 rather than both.',
      'The area is 5,400 square centimetres, because 54 \u00d7 100 = 5,400.',
      'The area is 54 square centimetres, because the numeric value does not change when units change.',
    ],
    correctIndex: 0,
    explanation:
      'The area is 9 \u00d7 6 = 54 square metres. Since 1 m = 100 cm, each side becomes 100 times longer in centimetres, and an area scales with the square of the linear factor: 54 \u00d7 10,000 = 540,000 cm\u00b2. Scaling by 100 applies to one dimension only and so suits a length, not an area. 54 \u00d7 100 gives a length-scaled figure, and a numeric value without units cannot be carried across a change of unit.',
    rationale: 'Converting area units by squaring the length conversion factor.',
    source: 'Mathematics — area and unit conversion; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-024',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A fundraiser collects \u20b18,400 in three weeks. The teacher asks the class to
      work out what fraction of the total was raised in the first week, when
      \u20b13,700 came in, and to express it in lowest terms. A learner says the
      fraction is 37/84 and that it cannot be reduced.
    `),
    prompt: 'What is the fraction, in lowest terms, of the total raised in the first week?',
    options: [
      'The fraction is 37/84, because 3,700 ÷ 8,400 reduces by the greatest common factor of 100 and 37 and 84 share none.',
      'The fraction is 7/12, because 3,700 ÷ 8,400 reduces to 37/84 and then by a further 5.',
      'The fraction is 5/12, because 3,700 ÷ 8,400 reduces to 35/84 and then by 7.',
      'The fraction is 3,700/8,400, because a fraction is already in lowest terms when both parts are whole numbers.',
    ],
    correctIndex: 0,
    explanation:
      'The fraction is 3,700 ÷ 8,400. The greatest common factor of 3,700 and 8,400 is 100, so dividing both by 100 gives 37/84. That is already in lowest terms: 37 is a prime number and 84 is not a multiple of it, so they share no further factor. The \u20b17/12 and \u20b15/12 figures come from continuing to reduce past the point where reduction is possible — a common error, because 37 looks as though it might divide into 84. Writing the fraction unsimplified is a legitimate first step but is not lowest terms.',
    rationale:
      'Reducing a large fraction to lowest terms by finding the greatest common factor.',
    source: 'Mathematics — fractions in lowest terms; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-025',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 8 teacher describes a sequence that begins 3, 6, 12, 24 and asks
      the class to continue it. One learner says the next term is 27 because
      they added 3 each time. Another says 48. The teacher asks them to look at
      what changes between consecutive terms.
    `),
    prompt: 'What is the next term of the sequence?',
    options: [
      'The next term is 48, because each term is twice the one before it.',
      'The next term is 27, because each term is 3 more than the one before it.',
      'The next term is 36, because each term is 12 more than the one before it.',
      'The next term is 30, because each term increases by an amount that grows by 3.',
    ],
    correctIndex: 0,
    explanation:
      'The differences between terms are 3, 6 and 12 — each one doubles — so the sequence is geometric with a common ratio of 2, and the next term is 24 \u00d7 2 = 48. Adding 3 works only for the first step, which is the trap: the second step requires adding 6. Adding 12 fits one step only, and an increasing-difference pattern of +3 does not match the actual differences of 3, 6, 12.',
    rationale:
      'Identifying a geometric sequence from the doubling of differences.',
    source: 'Mathematics — sequences and series; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-026',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher describes a telephone plan with a fixed monthly fee of \u20b1500 plus
      \u20b115 for every minute of calls beyond an included 100 minutes. A learner used
      140 minutes last month and worked out the bill by taking 15% of 140 and
      adding the fee. The teacher asks the learner to reread the plan.
    `),
    prompt: 'What is the correct charge for 140 minutes?',
    options: [
      'The charge is \u20b12,100, because only the 40 minutes beyond the included 100 are charged: 40 \u00d7 \u20b115 = \u20b1600, plus \u20b1500.',
      'The charge is \u20b12,600, because all 140 minutes are charged at \u20b115: 140 \u00d7 \u20b115 = \u20b12,100.',
      'The charge is \u20b11,600, because the included 100 minutes are charged at \u20b110 and the rest at \u20b115.',
      'The charge is \u20b13,600, because 140 \u00d7 \u20b115 = \u20b12,100 and \u20b1500 is added twice.',
    ],
    correctIndex: 0,
    explanation:
      'The plan includes 100 minutes, so only 140 \u2212 100 = 40 minutes are billable: 40 \u00d7 \u20b115 = \u20b1600, plus the \u20b1500 fee gives \u20b12,100. Charging all 140 minutes ignores the included allowance. The \u20b11,600 figure invents a rate for the included minutes that the plan does not specify. And \u20b13,600 counts the fixed fee twice, which is not how a fee plus usage works.',
    rationale:
      'Applying a tiered rate correctly, charging only usage beyond an included allowance.',
    source: 'Mathematics — linear pricing with a fixed fee; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-027',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A class is forming teams. There are 8 groups available and 24 learners, and
      the teacher asks how many learners go into each group if all groups are the
      same size. She then asks what would change if 3 learners were absent.
    `),
    prompt: 'How many learners go into each group, and what happens if 3 are absent?',
    options: [
      '3 per group with all present; with 21 learners the groups cannot stay equal, since 21 \u00f7 8 = 2 remainder 5.',
      '3 per group with all present; with 21 learners each group still has 3 and 3 learners are left over.',
      '8 per group with all present, because 24 \u00f7 3 = 8 groups of 3 learners.',
      '3 per group with all present; with 21 learners each group has 2, leaving 5 learners without a group.',
    ],
    correctIndex: 0,
    explanation:
      'With all 24 present, 24 \u00f7 8 = 3 learners per group exactly. With 3 absent, 21 learners remain and 21 \u00f7 8 = 2 remainder 5, so eight equal groups are impossible — five groups would have 3 and three would have 2. Keeping 3 per group would require 24 learners, so that option contradicts the absence. And 8 per group confuses the number of groups with the number of learners per group.',
    rationale:
      'Recognising when a division has a remainder and equal grouping becomes impossible.',
    source: 'Mathematics — division and remainder; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-028',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher shows a bar chart of daily rainfall for a week, with Monday at
      0 mm, Tuesday at 4 mm, Wednesday at 10 mm, Thursday at 0 mm, Friday at 6 mm,
      Saturday at 12 mm and Sunday at 8 mm. She asks the class for the total
      rainfall and then the average per day.
    `),
    prompt: 'What is the total rainfall, and the average per day?',
    options: [
      'The total is 40 mm and the average is 40 \u00f7 7 \u2248 5.7 mm per day.',
      'The total is 40 mm and the average is 40 \u00f7 4 = 10 mm per day, counting only wet days.',
      'The total is 34 mm and the average is 34 \u00f7 7 \u2248 4.9 mm per day.',
      'The total is 40 mm and the average is 6 mm per day, because the median is 6.',
    ],
    correctIndex: 0,
    explanation:
      'The total is the sum of all seven days including the zeros: 0 + 4 + 10 + 0 + 6 + 12 + 8 = 40 mm. The average divides by the number of days in the period, which is 7, giving about 5.7 mm. Dividing by 4 wet days changes the question being asked — and is arithmetically wrong too, since 40 \u00f7 4 = 10 only if 4 were the day count. The median and the mean are different measures and cannot stand in for each other.',
    rationale: 'Finding a mean from chart data while counting zero-rainfall days in the period.',
    source: 'Mathematics — mean from data; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-029',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A barangay plans a fair. Tickets cost \u20b130 for adults and \u20b115 for children. The
      fair sells 120 adult tickets and 80 children\u2019 tickets, and pays \u20b12,500 in
      fixed costs for the venue and permits. The treasurer asks for the profit,
      not the revenue.
    `),
    prompt: 'What is the profit from the fair?',
    options: [
      'The profit is \u20b12,300, because revenue is 120 \u00d7 30 + 80 \u00d7 15 = 4,800, and 4,800 \u2212 2,500 = 2,300.',
      'The profit is \u20b14,800, because that is the total revenue and the costs were never deducted.',
      'The profit is \u20b11,100, because 3,600 \u00d7 2,200 is used instead of adding the ticket types.',
      'The profit is \u20b12,000, because the children\u2019 tickets are assumed to be free.',
    ],
    correctIndex: 0,
    explanation:
      'Revenue combines both ticket types: 120 \u00d7 \u20b130 = \u20b13,600 and 80 \u00d7 \u20b115 = \u20b11,200, giving \u20b14,800. Profit subtracts the \u20b12,500 in fixed costs, leaving \u20b22,300. \u20b14,800 is revenue, not profit. The \u20b21,100 option multiplies two revenue components rather than adding them. And the children\u2019 tickets are explicitly priced at \u20b115, so assuming they are free ignores \u20b11,200 of real income.',
    rationale: 'Distinguishing revenue from profit when both multiple revenue streams are present.',
    source: 'Mathematics — revenue, cost and profit; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-030',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A rectangular plot is measured at 40 metres by 25 metres. The owner wants to
      fence it and also wants a path 1 metre wide around the inside edge. A
      learner computes the area of the plot as 1,000 square metres and
      subtracts 40 and 25 for the path.
    `),
    prompt: 'What is the area of the path itself?',
    options: [
      'The area of the path is 126 square metres, because the inner rectangle is 38 × 23 = 874 and 1,000 − 874 = 126.',
      'The area of the path is 130 square metres, because the perimeter of the plot is 130 metres and that figure is used directly.',
      'The area of the path is 1,000 square metres, because the path covers the whole plot.',
      'The area of the path is 1,874 square metres, because the inner area is added to the outer one.',
    ],
    correctIndex: 0,
    explanation:
      'A path 1 metre wide inside the edge leaves an inner rectangle of (40 − 2) × (25 − 2) = 38 × 23 = 874 square metres, so the path is 1,000 − 874 = 126 square metres. Both dimensions lose 2 metres, because the path takes one metre off each side. The perimeter of 130 metres is a length and cannot serve as an area. And the inner area must be subtracted rather than added, since the path lies inside the plot — adding would give a figure larger than the plot itself, which is impossible.',
    rationale:
      'Computing the area of a border by subtracting the inner rectangle from the outer.',
    source: 'Mathematics — area of composite figures; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-031',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student deposits \u20b15,000 in a savings account that pays simple interest at
      6% per year. After three years the student withdraws \u20b55,900. The teacher
      asks the student to verify the amount against the simple-interest formula,
      and points out that the rate applies to the original principal every year.
    `),
    prompt: 'Is \u20b55,900 the correct amount after three years?',
    options: [
      'Yes, because simple interest is \u20b15,000 \u00d7 0.06 \u00d7 3 = \u20b1900, giving \u20b55,000 + \u20b1900 = \u20b15,900.',
      'No, because simple interest must compound annually, giving a larger amount than \u20b15,900.',
      'No, because the rate applies to the amount including previous interest, which is why the balance is higher.',
      'Yes, because \u20b15,000 \u00f7 0.06 \u00d7 3 = \u20b12,700, giving \u20b17,700.',
    ],
    correctIndex: 0,
    explanation:
      'Simple interest is principal \u00d7 rate \u00d7 time: \u20b15,000 \u00d7 0.06 \u00d7 3 = \u20b1900, so the balance is \u20b15,900 — the withdrawal is correct. Compounding would be compound interest, a different product; the defining feature of simple interest is that the rate applies to the original principal, never to the growing balance. Dividing by the rate instead of multiplying gives \u20b12,700, which is not interest at all.',
    rationale: 'Applying simple interest and distinguishing it from compound interest.',
    source: 'Mathematics — simple interest; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-032',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A committee of 5 members votes on a motion. Three vote yes and two vote no.
      The chair asks whether the motion passes, and a member objects that the
      chair was absent for one of the votes, so the count should be 4 members.
      The chair asks the class what a simple majority means and whether the
      objection is sound.
    `),
    prompt: 'Does the motion pass, and is the objection sound?',
    options: [
      'The motion passes, because 3 of 5 is a simple majority; the objection misstates what a majority requires.',
      'The motion does not pass, because a simple majority must be more than half of all possible voters rather than of those present.',
      'The motion passes, but only if the chair agrees, since a chair\u2019s vote breaks a tie.',
      'The motion does not pass, because a majority of 3 out of 5 is not more than 50%.',
    ],
    correctIndex: 0,
    explanation:
      'A simple majority is more than half of the votes actually cast among those voting: 3 of 5 is 60%, so the motion passes. It is not measured against all possible members, which would penalise absence, and no chair\u2019s casting vote is involved here because there is no tie — 3 is already a clear majority. 3/5 is plainly more than 50%, so the last reading is arithmetically wrong.',
    rationale:
      'Defining a simple majority in terms of votes cast rather than votes possible.',
    source: 'Mathematics — voting and majority; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-033',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A factory produces widgets. Production is constant and it makes 45 widgets
      every hour. A supervisor asks how many complete boxes of 12 widgets can be
      filled in an 8-hour shift, and how many widgets are left over.
    `),
    prompt: 'How many complete boxes can be filled, and how many are left over?',
    options: [
      '30 boxes with none left over, because 45 \u00d7 8 = 360 and 360 \u00f7 12 = 30 exactly.',
      '24 boxes with 12 left over, because 360 \u00f7 12 = 30 but the supervisor asked for 24.',
      '15 boxes with 60 left over, because 45 \u00d7 8 \u00f7 12 was computed as 45 \u00f7 (8 \u00d7 12).',
      '360 boxes with none left over, because 45 \u00d7 8 widgets were each treated as a box.',
    ],
    correctIndex: 0,
    explanation:
      'Total production is 45 \u00d7 8 = 360 widgets, and 360 \u00f7 12 = 30 exactly, so 30 boxes are filled with no remainder. Dividing 45 by (8 \u00d7 12) reverses the order of operations, which is the \u20b115 figure. Treating each widget as a box gives 360, which ignores the box size entirely. And a remainder appears only when the total is not divisible by 12, which here it is.',
    rationale:
      'Solving a two-step rate problem where order of operations changes the answer.',
    source: 'Mathematics — rate, area and order of operations; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-034',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A school compares two transport plans. Plan A costs \u20b11,200 a month plus
      \u20b18 per kilometre. Plan B costs \u20b1800 a month plus \u20b114 per kilometre. The
      administrator asks at what distance the two plans cost the same, given a
      monthly distance of 200 kilometres.
    `),
    prompt: 'Which plan is cheaper, and by how much at 200 kilometres?',
    options: [
      'Plan A is cheaper by \u20b1600: A costs 1,200 + 1,600 = 2,800 and B costs 800 + 2,800 = 3,600.',
      'Plan A is cheaper by \u20b1800: A costs 1,200 + 1,600 = 2,800 and B costs 800 + 1,600 = 2,400.',
      'Plan B is cheaper by \u20b1800: A costs 2,800 and B costs 2,400, so B saves 400.',
      'The plans cost the same, because both include a fixed monthly fee.',
    ],
    correctIndex: 0,
    explanation:
      'At 200 km, Plan A costs \u20b11,200 + (\u20b18 \u00d7 200 = \u20b11,600) = \u20b12,800, and Plan B costs \u20b1800 + (\u20b114 \u00d7 200 = \u20b12,800) = \u20b13,600. The difference is \u20b1800 in favour of Plan A, despite Plan A having the higher fixed fee, because its per-kilometre rate is much lower. The \u20b1800-saving figure in option B comes from charging Plan B at Plan A\u2019s per-kilometre rate. Both plans having a fixed fee does not make their totals equal.',
    rationale:
      'Comparing two linear cost plans at a given distance.',
    source: 'Mathematics — linear relationships in context; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-035',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A basketball team scores 3 points for each long shot and 2 points for each
      short shot. In one game it makes 8 long shots and 12 short shots. A learner
      computes the total as (8 + 12) \u00d7 2 = 40, arguing that every shot is worth 2
      points. The coach asks the learner to separate the two kinds of shot.
    `),
    prompt: 'How many points did the team score?',
    options: [
      'The team scored 48 points, because 8 \u00d7 3 = 24 and 12 \u00d7 2 = 24, giving 48.',
      'The team scored 40 points, because 20 shots \u00d7 2 points is the correct calculation.',
      'The team scored 44 points, because 20 shots \u00d7 2 = 40 and the extra long shots add 4.',
      'The team scored 64 points, because both types are worth 3 points on average.',
    ],
    correctIndex: 0,
    explanation:
      'The two shot types must be valued separately because they are worth different amounts: 8 long shots \u00d7 3 = 24, and 12 short shots \u00d7 2 = 24, for a total of 48. Applying one rate to all shots is exactly the error — long shots are worth one point more each, and eight of them adds 8, not 4. Averaging the two rates and multiplying by the total count cannot work when the counts of each type differ.',
    rationale:
      'Separating two different rates when a weighted total is required.',
    source: 'Mathematics — applied rate problems; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-036',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher gives a class a problem about a square whose sides are doubled.
      The original area is 25 square centimetres. A learner says the new area is
      50 square centimetres because the side doubled, and another says it is 100
      because each side was doubled.
    `),
    prompt: 'What is the area of the larger square?',
    options: [
      'The area is 100 square centimetres, because the side goes from 5 to 10 and area scales with the square of the factor.',
      'The area is 50 square centimetres, because the area doubles when the side doubles.',
      'The area is 125 square centimetres, because 100 is added to the original 25.',
      'The area is 10 square centimetres, because 5 doubled is 10.',
    ],
    correctIndex: 0,
    explanation:
      'The original side is \u221a25 = 5 cm, and doubled it is 10 cm, so the new area is 10 \u00d7 10 = 100 cm\u00b2. Area scales with the square of a linear factor: doubling a side multiplies area by 4, not 2, so 25 \u00d7 4 = 100. The \u20b1250 figure wrongly adds the areas, and \u20b110 is the new side length rather than the area.',
    rationale:
      'Recognising that area scales quadratically when a linear dimension changes.',
    source: 'Mathematics — area and scale factors; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-037',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A learner is asked for the probability of rolling a 6 on a fair die on two
      consecutive rolls. The learner says the probability is 1/6 + 1/6 = 1/3,
      arguing that the two chances should be added. The teacher explains that
      the events are not alternatives but a sequence.
    `),
    prompt: 'What is the probability of rolling a 6 on both rolls?',
    options: [
      'The probability is 1/36, because the second roll must also be a 6: 1/6 \u00d7 1/6 = 1/36.',
      'The probability is 1/3, because the two chances should be added.',
      'The probability is 2/6, because either roll can succeed independently.',
      'The probability is 1/12, because 1/6 is halved by the requirement of two rolls.',
    ],
    correctIndex: 0,
    explanation:
      'Rolling a 6 on both rolls requires one roll to succeed and then the other, so the probabilities multiply: 1/6 \u00d7 1/6 = 1/36. Probabilities add when an event happens if EITHER of two alternatives occurs; here both must occur, so adding is wrong. The 2/6 figure describes at least one success across two rolls, which is a different question, and halving 1/6 has no probabilistic basis.',
    rationale:
      'Distinguishing addition from multiplication for conjunctive events.',
    source: 'Mathematics — compound probability; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-038',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is preparing a shelf-arrangement exercise. She begins with a
      simpler case, asking how many ways 3 different books can be placed in a row
      on the shelf, and a learner answers 6. She then asks how many ways 5
      different books can be placed in a row on the same shelf, and the learner
      answers 10. The teacher asks the class to explain why the second answer
      cannot be found by extending the first.
    `),
    prompt: 'How many ways can 5 different books be arranged on a shelf?',
    options: [
      'There are 120 ways, because 5 \u00d7 4 \u00d7 3 \u00d7 2 \u00d7 1 = 120.',
      'There are 10 ways, because 3 books give 6 ways and 5 books give 10.',
      'There are 60 ways, because 5 \u00d7 4 \u00d7 3 = 60 and the rest are fixed.',
      'There are 6 ways, because there are only ever six arrangements possible.',
    ],
    correctIndex: 0,
    explanation:
      'Arranging 5 distinct books in a line is a permutation: 5! = 5 \u00d7 4 \u00d7 3 \u00d7 2 \u00d7 1 = 120. The learner\u2019s figures of 10 and 6 come from the fact that 3! = 6 — 6 is right for 3 books but does not extend to 5. Stopping at 5 \u00d7 4 \u00d7 3 = 60 omits the remaining placements. There is no ceiling of six arrangements; the count grows rapidly.',
    rationale: 'Applying the permutation formula and understanding why it grows factorially.',
    source: 'Mathematics — permutations; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-039',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A survey records how many hours each of 10 learners spends studying. A
      learner asks whether the mean or the median is the better summary, and
      the teacher points out that one learner studied 14 hours while the rest
      studied between 2 and 5 hours. The teacher asks which measure is less
      distorted.
    `),
    prompt: 'Which measure is less distorted by the outlier, and why?',
    options: [
      'The median, because it depends on the position of the middle value rather than on the size of the extreme value.',
      'The mean, because it uses every value and therefore cannot be distorted by any one of them.',
      'The median, because it is always larger than the mean when an outlier is present.',
      'The range, because it describes the spread and so is unaffected by outliers.',
    ],
    correctIndex: 0,
    explanation:
      'The median is a positional measure — the middle value in an ordered list — so an extreme 14-hour entry shifts it very little, while the mean absorbs the full size of the outlier and is pulled up by it. Using every value is exactly what makes the mean sensitive to extremes, not immune to them. And with a high outlier the median is generally lower than the mean, not higher. The range is the measure most distorted of all, since it is defined by the extremes.',
    rationale:
      'Choosing between mean and median based on the presence of an outlier.',
    source: 'Mathematics — measures of central tendency; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'mat-040',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A class is told that a rectangular garden is to be rebuilt with the same
      area but using more fencing: the original was 10 m by 6 m, and the new one
      has the same 60 square metres but its length is 12 metres. The teacher asks
      the class what happened to the width, and why a shape with the same area
      can need a different amount of fencing.
    `),
    prompt: 'What is the new width, and why does the fencing change?',
    options: [
      'The new width is 5 metres, and the perimeter falls from 32 m to 34 m, because a shape of fixed area can have different perimeters.',
      'The new width is 6 metres, and the perimeter stays 32 m, because the area did not change.',
      'The new width is 5 metres, and the perimeter stays 32 m, because equal area forces equal perimeter.',
      'The new width is 7.2 metres, and the perimeter rises to 38.4 m, because 60 \u00f7 12 = 7.2.',
    ],
    correctIndex: 0,
    explanation:
      'The new width is 60 \u00f7 12 = 5 m. The original perimeter was 2(10 + 6) = 32 m, and the new one is 2(12 + 5) = 34 m, so the fencing changes by 2 m even though the area is identical — a square gives the smallest perimeter for a given area, and shapes further from a square need more. Equal area does not force equal perimeter, so that claim is simply false. And 7.2 m would give an area of 86.4 m\u00b2, not 60.',
    rationale:
      'Computing a new dimension from a fixed area and explaining why perimeter is not fixed by area.',
    source: 'Mathematics — perimeter and area; PRC GenEd TOS — Mathematics',
  },
];

export default BATCH_MATH_2;
