import type { QuestionDraft } from '../../pipeline';

/**
 * Professional Education — part 2 of 2 (items pe-015 … pe-025).
 *
 * Targets `profed-assessment` and `profed-field-study`. Part 1 (teaching
 * profession, curriculum, learners) is in batchProfEd1.ts.
 *
 * Sources: Stufflebeam CIPP; Bloom's taxonomy; Popham and Naseger criterion
 * referenced; Gronlund on formative assessment; action research in the
 * Philippine teacher internship; Terminology in Educational Research (action
 * research, quasi-experimental, ethnography, rubric, reliability, validity).
 */

const V = (text: string) => text.trim();

export const BATCH_PROFED_2: readonly QuestionDraft[] = [
  {
    id: 'pe-015',
    subjectId: 'profed',
    topicId: 'profed-assessment',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher gives a thirty-item test at the end of a unit, marks it, records
      the scores in her gradebook, and uses the results in the learners'
      quarterly grades. She then moves on to the next unit without changing how
      she teaches. A colleague asks what kind of assessment she has just
      conducted.
    `),
    prompt: 'What kind of assessment did the teacher conduct?',
    options: [
      'The teacher conducted summative assessment, which judges achievement after instruction and contributes to the grade.',
      'The teacher conducted formative assessment, which guides teaching while instruction is still in progress.',
      'The teacher conducted diagnostic assessment, which identifies what learners already know before instruction begins.',
      'The teacher conducted placement assessment, which decides the level at which a learner should begin.',
    ],
    correctIndex: 0,
    explanation:
      'Summative assessment occurs after instruction, judges achievement against the outcomes, and is recorded as a grade \u2014 which is exactly what the teacher did. Formative assessment happens during instruction to adjust teaching, and she explicitly did not adjust hers. Diagnostic assessment precedes instruction to establish prior knowledge. Placement assessment decides a starting level for a course or programme.',
    rationale: 'Classifying an assessment by its timing and whether it is graded.',
    source: 'Assessment of learning; PRC ProfEd TOS area D (15%)',
  },
  {
    id: 'pe-016',
    subjectId: 'profed',
    topicId: 'profed-assessment',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher writes comments on a draft essay. On one she notes that the
      argument is clear and well supported but that the conclusion does not
      follow from the evidence given, and she suggests one way to strengthen it.
      She does not write a grade, because the essay is a draft the learner will
      revise before it is submitted for a mark.
    `),
    prompt: 'Why is withholding the grade consistent with good assessment practice here?',
    options: [
      'The purpose of the feedback is to guide revision, and a grade would redirect the learner\u2019s attention from improving the work to the mark it received.',
      'Grades should never be given on drafts, because a grade cannot be revised.',
      'Feedback and grades are two separate activities that should never occur in the same lesson.',
      'The comment is sufficient on its own, so the essay does not need to be revised.',
    ],
    correctIndex: 0,
    explanation:
      'Feedback on a draft is formative by function: its purpose is to improve the work, and a grade competes with that purpose by making the mark the thing the learner attends to. A draft is precisely the stage where withholding the mark is correct, since the work is not yet the finished artifact. Feedback and grading can certainly occur together when both serve the learner, so the third reading is too absolute. And the comment invites revision rather than replacing it.',
    rationale: 'Distinguishing formative feedback function from summative grading purpose.',
    source: 'Assessment of learning; PPST Domain 5, strand 5.3; PRC ProfEd TOS area D (15%)',
  },
  {
    id: 'pe-017',
    subjectId: 'profed',
    topicId: 'profed-assessment',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher gives the same test to two classes that have had identical
      instruction. The test produces scores ranging from 20 to 98 across both
      classes, and the same items were answered correctly by roughly the same
      proportion in each class. She asks what this tells her about the test.
    `),
    prompt: 'What does this tell the teacher about the test?',
    options: [
      'The test appears to have good reliability, because it gives a spread of scores and behaves consistently across the two classes.',
      'The test has good validity, because it measures exactly what the teacher intended to measure.',
      'The test has poor reliability, because the scores are spread too widely across the classes.',
      'The test is easy, because the same items were answered correctly by the same proportion of learners.',
    ],
    correctIndex: 0,
    explanation:
      'Reliability is consistency of measurement, and a wide spread of scores plus similar performance by item across two independent classes indicates the test is discriminating and stable. Validity is a separate question about whether it measures what matters, which nothing here establishes. A wide spread is evidence of a discriminating test, not of unreliability. And consistent item difficulty is a desirable property, not evidence of easiness.',
    rationale: 'Distinguishing reliability from validity, and reading score spread correctly.',
    source: 'Assessment of learning; PRC ProfEd TOS area D (15%)',
  },
  {
    id: 'pe-018',
    subjectId: 'profed',
    topicId: 'profed-assessment',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher has marked a fifty-item test. One item was answered correctly by
      nearly every learner in the class, including those who performed poorly
      overall. A second item was answered correctly by only a few learners, and
      those who got it right were mostly the stronger ones. She wants to decide
      what to do with each.
    `),
    prompt: 'What should the teacher do with the two items?',
    options: [
      'She should revise the first item, which is too easy to discriminate between learners, and retain the second, which is difficult but still separates stronger from weaker learners.',
      'She should retain the first item, because a high success rate shows the class understood the material, and revise the second, because too few learners answered it correctly.',
      'She should revise both items, because an item most learners get wrong is not a fair item.',
      'She should retain both items, because item difficulty depends on learner ability rather than on item quality.',
    ],
    correctIndex: 0,
    explanation:
      'The first item has a very high difficulty index and discriminates poorly: everyone passed it, including the weakest learners, so it separates nobody and should be revised. The second is difficult but discriminates well, because the learners who answered it were mostly the strong ones \u2014 that is a good item doing its job. Revising an item merely for being hard, or keeping one merely for being easy, confuses difficulty with quality.',
    rationale:
      'Reading difficulty and discrimination together rather than difficulty alone.',
    source: 'Item analysis; PRC ProfEd TOS area D (15%)',
  },
  {
    id: 'pe-019',
    subjectId: 'profed',
    topicId: 'profed-assessment',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher asks learners to explain photosynthesis in their own words and
      to draw a diagram labelling it. She then asks learners to design an
      experiment to test whether light affects the rate. She wants to know which
      level of her objective the first task reaches and which the second does.
    `),
    prompt: 'Which levels of Bloom\u2019s taxonomy do these two tasks address, in order?',
    options: [
      'The first is understanding, since learners process and explain the content; the second is creating, since learners must design a procedure.',
      'The first is applying, since learners use the content; the second is evaluating, since learners judge an experiment.',
      'The first is remembering, since learners recall the stages; the second is understanding, since they understand the process.',
      'The first is analysing, since learners break photosynthesis into parts; the second is synthesising, since they combine knowledge.',
    ],
    correctIndex: 0,
    explanation:
      'Explaining a process in one\u2019s own words and representing it in a labelled diagram are understanding tasks: the content is being processed into new form, not merely recalled. Designing an experiment to test a relationship is creating, because the learner must construct a procedure that did not previously exist. Applying means using a known procedure in a new situation, which the first task partly does but which is not its dominant demand. Labelled stages in a diagram are remembering, not analysing, unless the learner is distinguishing between parts and their relations.',
    rationale:
      'Distinguishing understanding from applying, remembering and creating in concrete task demands.',
    source: 'Bloom, Taxonomy of Educational Objectives; PRC ProfEd TOS area D (15%)',
  },
  {
    id: 'pe-020',
    subjectId: 'profed',
    topicId: 'profed-field-study',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student teacher notices that a group of learners finish their work quickly
      and then disturb others, while another group rarely finishes. She changes
      her classroom routine, tries it for two weeks, and keeps a dated note each
      day recording what happened. She then decides whether to keep the change.
    `),
    prompt: 'What is the student teacher doing?',
    options: [
      'She is conducting action research on her own practice, using the dated notes as the observational data that will decide whether the change worked.',
      'She is conducting a formal experiment, with the other group serving as the control condition.',
      'She is conducting a survey, collecting the learners\u2019 opinions about the routine.',
      'She is complying with a practicum requirement to document her teaching hours.',
    ],
    correctIndex: 0,
    explanation:
      'Identifying a problem in her own classroom, changing something, observing the result over time and using that observation to decide what to do next is the plan-act-observe-reflect cycle of action research. The dated notes are what make it research rather than an attempt: they are the data the judgement is based on. There is no controlled comparison here, so it is not an experiment; no opinions were collected, so it is not a survey; and documentation is the method, not the purpose.',
    rationale:
      'Recognising action research in a practicum setting and identifying why the record-keeping is part of the method.',
    source: 'Action research in teaching internship; PRC ProfEd TOS area E (20%)',
  },
  {
    id: 'pe-021',
    subjectId: 'profed',
    topicId: 'profed-field-study',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student teacher wants to know whether a new worksheet format improves
      learners\u2019 writing. She cannot randomly assign learners to conditions,
      because the two classes meet at different times and the head teacher
      will not let her swap them. She compares the two classes\u2019 results before
      and after the change, and acknowledges that the two classes may have
      differed beforehand.
    `),
    prompt: 'What kind of study is the student teacher conducting?',
    options: [
      'A quasi-experimental study, because she compares groups without random assignment and acknowledges that the groups may not have been equivalent at the start.',
      'A true experimental study, because she has a comparison group and a treatment.',
      'An action research study, because the study examines her own classroom practice.',
      'A correlational study, because she is looking for a relationship between format and quality.',
    ],
    correctIndex: 0,
    explanation:
      'Having a treatment and a comparison group but no random assignment, and with pre-existing differences between groups acknowledged as a limitation, is the definition of a quasi-experiment. A true experiment would require random assignment, which she was explicitly refused. Her focus on improving her own practice is action research, but the design she describes \u2014 groups, treatment, comparison, pre-test \u2014 is quasi-experimental, and naming it precisely is what makes her acknowledged limitation legitimate rather than disqualifying. She is not measuring two variables to see whether they covary, which is what correlational means.',
    rationale:
      'Distinguishing quasi-experimental from true experimental and action research designs.',
    source: 'Research in education; PRC ProfEd TOS area E (20%)',
  },
  {
    id: 'pe-022',
    subjectId: 'profed',
    topicId: 'profed-field-study',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student teacher spends six weeks in a community, joining its local
      basketball practices, its council meetings and its family gatherings. She
      records what people say and do, and at the end she describes the community\u2019s
      way of resolving disputes as it is actually practised, including the parts
      no official document describes.
    `),
    prompt: 'What research design is the student teacher using?',
    options: [
      'Ethnography, because she is describing a culture as it is practised by participating in it over time.',
      'A case study, because she is examining one community in detail.',
      'A survey, because she recorded what people said.',
      'An experiment, because she collected data over a period of weeks.',
    ],
    correctIndex: 0,
    explanation:
      'Prolonged participation in a community in order to describe its practices as they are lived is ethnography. A case study is an in-depth examination of a bounded unit for any purpose and need not involve participation. Recording what people say does not make a study a survey, which collects data from a sample through structured instruments. And collecting data over weeks is duration, not experimental design \u2014 nothing was manipulated and there was no control condition.',
    rationale:
      'Identifying ethnography from prolonged participation rather than from depth or duration alone.',
    source: 'Ethnography in education; PRC ProfEd TOS area E (20%)',
  },
  {
    id: 'pe-023',
    subjectId: 'profed',
    topicId: 'profed-field-study',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student teacher is told to assess her practicum. She is given a document
      with criteria such as preparation, establishment of rapport, and presentation
      of the lesson, each described at five levels from poor to exemplary, and she
      is asked to place her performance at one level for each criterion with
      written justification. She notices that the criteria and the levels are
      spelled out in advance.
    `),
    prompt: 'What is this instrument, and what is the significance of the levels being spelled out in advance?',
    options: [
      'It is a rubric, and spelling out the levels in advance is what makes judgements consistent across raters rather than personal.',
      'It is a checklist, and spelling out the levels in advance means the observation cannot be objective.',
      'It is a rating scale, and spelling out the levels in advance makes the ratings unreliable.',
      'It is a portfolio, and spelling out the levels in advance is required by the internship guidelines.',
    ],
    correctIndex: 0,
    explanation:
      'Performance criteria described at several defined levels is a rubric, and the level descriptors are its defining feature: they are what allows two raters to judge the same performance similarly. Pre-stating them is precisely what produces inter-rater consistency. A checklist records whether something is present or absent and carries no levels. Pre-stating levels does not make ratings unreliable \u2014 it makes them more reliable \u2014 and a portfolio is a collection of work over time, not a judging instrument.',
    rationale:
      'Identifying a rubric and explaining the role of pre-stated level descriptors in rater consistency.',
    source: 'Assessment of performance; PRC ProfEd TOS areas D and E (15%, 20%)',
  },
  {
    id: 'pe-024',
    subjectId: 'profed',
    topicId: 'profed-field-study',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student teacher finds that a lesson went well but that her notes are a
      list of what she did rather than what she learned. Her teacher adviser
      asks her to write a narrative account instead, covering what she planned,
      what actually happened, what the learners said and did, and what she would
      change. She asks why a narrative is preferred to a list.
    `),
    prompt: 'Why does the adviser prefer a narrative report?',
    options: [
      'A narrative report captures what happened and the thinking behind it in context, so the reasoning can be examined rather than just the actions.',
      'A narrative report is shorter and easier to grade than a list of activities.',
      'A narrative report is required by the internship guidelines, while a list is not acceptable.',
      'A narrative report allows the adviser to fill in what the student teacher should have written.',
    ],
    correctIndex: 0,
    explanation:
      'The value of a narrative is that it preserves context and reasoning: an adviser can see why a decision was taken, what the learners actually did, and where the student teacher\u2019s interpretation may be wrong. A list of activities records what happened without any of that. Narrative reports are generally longer, not shorter, so grading convenience is not the reason. It is a preferred format in practice, and the adviser\u2019s request is guidance rather than a citation of a rule. And it does not transfer the writing to the adviser \u2014 that would defeat the purpose of the exercise.',
    rationale:
      'Explaining what a narrative report preserves that an activity list does not.',
    source: 'Reflective reporting in teaching internship; PRC ProfEd TOS area E (20%)',
  },
  {
    id: 'pe-025',
    subjectId: 'profed',
    topicId: 'profed-field-study',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student teacher reviews her practicum folder and finds that it contains
      her lesson plans, her annotated observation checklists, her scored quizzes
      with learners\u2019 written work attached, and her reflection notes. She is
      asked to submit it and a classmate asks what the point of collecting all
      that evidence is, since it is not a single test result.
    `),
    prompt: 'What is the point of a portfolio such as this one?',
    options: [
      'The point is to present a body of evidence of the teacher\u2019s practice and growth over time rather than a single snapshot of achievement.',
      'The point is to find the single strongest piece of evidence, since one good result is worth more than many.',
      'The point is to satisfy a requirement, since the contents do not affect how the practice is judged.',
      'The point is to compare the student teacher with her classmates, since the folder is read by the whole cohort.',
    ],
    correctIndex: 0,
    explanation:
      'A portfolio assembles multiple artefacts over time so that growth and sustained practice can be judged from a body of evidence rather than from one snapshot. Selecting the single best item would defeat that purpose by discarding the record of development. The contents are exactly what makes it evaluable, so the folder is not merely a formality. And it is assessed on its own merits rather than used to rank a cohort.',
    rationale:
      'Explaining a portfolio as longitudinal evidence rather than a best-results collection.',
    source: 'Assessment of learning; PRC ProfEd TOS areas D and E (15%, 20%)',
  },
];

export default BATCH_PROFED_2;
