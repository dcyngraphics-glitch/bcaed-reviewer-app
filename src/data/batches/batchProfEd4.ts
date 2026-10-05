import type { QuestionDraft } from '../../pipeline';

/**
 * Professional Education — part 4 (items pe-051 … pe-074): the EASY band.
 *
 * Measuring per-band rather than per-subject showed the real constraint. A
 * 140-item section has a 42-item easy quota:
 *
 *   ProfEd  easy quota 42, held 23 -> 19 short   (moderate 73/70, difficult 20/28)
 *   CAE     easy quota 42, held 24 -> 18 short   (moderate 78/70, difficult 30/28)
 *
 * The binding constraint was EASY items in both subjects, not the difficult ones
 * the previous batches supplied. These 24 are all difficulty 2 for that reason.
 *
 * "Easy" means a single clear concept applied to a straightforward situation, not
 * a trivial question \u2014 the real exam's easy items are still situational.
 *
 * Sources: PPST Domains 1-3 and career stages; RA 7836; RA 4670; DepEd Order
 * No. 21, s. 2019; Maslow; Piaget; Ausubel; Tyler; CIPP; Bloom; behaviourist
 * ABC model; cooperative learning; action research; Code of Ethics for
 * Professional Teachers; child protection statutes.
 */

const V = (text: string) => text.trim();

export const BATCH_PROFED_4: readonly QuestionDraft[] = [
  {
    id: 'pe-051',
    subjectId: 'profed',
    topicId: 'profed-teaching-profession',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A school principal introduces a professional development session and
      explains that teachers are expected to attend, that the sessions are
      scheduled during instructional hours so that no one has to give up a
      Sunday, and that attendance will be recorded.
    `),
    prompt: 'Is the teacher obliged to attend?',
    options: [

      'The requirement is that she attend, because professional development is part of the service and is scheduled in working time.',
      'The requirement is that she may decline it without consequence.',
      'The requirement is that she attend, but only because her attendance is recorded.',
      'The requirement is that she attend only if she is being rated this year.'
    ],
    correctIndex: 0,
    explanation:
      'Continuous professional development is a requirement of the teaching service, not a preference \u2014 which is why it is scheduled during instructional hours, so compliance costs teachers nothing in their own time. Attendance being recorded is how the requirement is verified, not what creates it. And the requirement is not confined to those being rated this year.',
    rationale: 'Recognising professional development as a service requirement rather than an option.',
    source: 'DepEd Order No. 42, s. 2017 (PPST); PRC ProfEd TOS area A (15%)',
  },
  {
    id: 'pe-052',
    subjectId: 'profed',
    topicId: 'profed-teaching-profession',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is asked by a parent why her child receives a low grade. She
      explains that the grade reflects performance against the learning objectives
      for the quarter, that she has told the parents previously when a learner fell
      behind, and that she is required to report progress rather than to protect a
      learner from an accurate assessment.
    `),
    prompt: 'What is the teacher explaining?',
    options: [

      'What she is explaining is that reporting progress against objectives is an obligation even when unflattering.',
      'What she is explaining is that a grade may be adjusted to avoid upsetting a parent.',
      'What she is explaining is that parents have no right to ask about progress.',
      'What she is explaining is that grades should reflect effort rather than achievement.'
    ],
    correctIndex: 0,
    explanation:
      'Reporting progress against objectives is part of the job, and accuracy does not become optional when a parent is unhappy. Grades are not private judgment. Parents\u2019 right to ask is exactly what triggered the conversation. And grades must reflect achievement, with effort accounted for separately rather than substituted in.',
    rationale: 'Treating progress reporting as a duty that survives an unflattering result.',
    source: 'PPST Domain 5; PRC ProfEd TOS area D (15%)',
  },
  {
    id: 'pe-053',
    subjectId: 'profed',
    topicId: 'profed-curriculum',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is reviewing her subject and finds that the same concept appears in
      Grade 4, again in Grade 7, and again in Grade 10. In Grade 4 learners name
      it, in Grade 7 they explain how it works, and in Grade 10 they apply it to
      unfamiliar problems.
    `),
    prompt: 'What curriculum principle does this illustrate?',
    options: [

      'It illustrates spiral progression, revisiting a concept at increasing depth.',
      'It illustrates repetition, teaching the same lesson identically each year.',
      'It illustrates decongestion, reducing content across grade levels.',
      'It illustrates the core curriculum, fusing all subjects into one.'
    ],
    correctIndex: 0,
    explanation:
      'The same concept returning at rising levels of demand \u2014 naming, then explaining, then applying \u2014 is spiral progression. It is not repetition, because what learners do with the concept changes each time. Decongestion removes content rather than revisiting it. A core curriculum fuses subjects, and these are separate grade levels within one subject.',
    rationale: 'Identifying spiral progression from a concept revisited at increasing depth.',
    source: 'RA 10533; PRC ProfEd TOS area B (30%)',
  },
  {
    id: 'pe-054',
    subjectId: 'profed',
    topicId: 'profed-curriculum',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is asked what her learners should be able to do by the end of the
      term. She writes them as observable actions \u2014 identify, classify, explain,
      construct, evaluate \u2014 rather than as topics covered, because she wants any
      colleague reading them to know exactly what a learner must be able to do.
    `),
    prompt: 'Why does the teacher write objectives as observable actions?',
    options: [
      'Because observable actions make the objective testable, so whether it was met can be determined rather than assumed.',
      'Because topic-based objectives are not permitted in the K to 12 curriculum.',
      'Because observable actions are easier to write than topic statements.',
      'Because topics cannot be turned into meaningful lessons.',
    ],
    correctIndex: 0,
    explanation:
      'An objective stated as an observable action can be assessed directly, so attainment is evidenced rather than assumed \u2014 that is the reason for the form. Topic-based objectives are permitted and common; they are simply weaker. And nothing about the form makes it easier or harder to write.',
    rationale: 'Explaining observable-action objectives by their testability.',
    source: 'Objective writing; PRC ProfEd TOS areas B and D (30%, 15%)',
  },
  {
    id: 'pe-055',
    subjectId: 'profed',
    topicId: 'profed-curriculum',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher uses the textbook\u2019s examples but replaces them with ones drawn from
      her learners\u2019 own town, keeps every learning objective the curriculum
      requires, and checks her list against the curriculum guide at the end of
      planning.
    `),
    prompt: 'Which principle is the teacher applying?',
    options: [

      'The principle she is applying is contextualisation, adapting examples while keeping the prescribed competencies.',
      'The principle she is applying is decongestion, reducing the number of competencies.',
      'The principle she is applying is curriculum localisation, removing objectives that cannot be taught locally.',
      'The principle she is applying is escalation, raising the difficulty of the competencies.'
    ],
    correctIndex: 0,
    explanation:
      'Adapting content and examples to learners\u2019 local context while holding the prescribed competencies constant is contextualisation, and her check against the guide is what keeps her from straying. Decongestion reduces competencies, which she is not doing. Localisation is not a curriculum principle in this sense. And escalation would raise the competency level, whereas her change is to the examples.',
    rationale: 'Distinguishing contextualisation from content reduction or escalation.',
    source: 'RA 10533; DepEd Order No. 21, s. 2019; PRC ProfEd TOS area B (30%)',
  },
  {
    id: 'pe-056',
    subjectId: 'profed',
    topicId: 'profed-curriculum',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is asked how she will know whether her instruction worked. She
      lists what she expects learners to do, and the resources and methods she will
      provide, and then the process of teaching itself, and finally the outcomes
      learners should reach \u2014 four distinct kinds of question.
    `),
    prompt: 'Which evaluation model is the teacher describing?',
    options: [

      'She is describing the CIPP model, evaluating Context, Input, Process and Product.',
      'She is describing Tyler’s model, evaluating only whether objectives were achieved.',
      'She is describing the goal-free model, which avoids evaluating stated objectives.',
      'She is describing the case study method, which examines one unit in depth.'
    ],
    correctIndex: 0,
    explanation:
      'Four questions covering context, inputs, process and outcomes is the CIPP structure. Tyler\u2019s model asks only whether objectives were achieved, which is one of the four. A goal-free model deliberately sets aside the stated objectives, and she has made them the first item. A case study is a method for examining one unit, not a framework of four evaluation types.',
    rationale: 'Identifying CIPP from the four categories of question.',
    source: 'Stufflebeam, CIPP Evaluation Model; PRC ProfEd TOS area B (30%)',
  },
  {
    id: 'pe-057',
    subjectId: 'profed',
    topicId: 'profed-curriculum',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is shown a diagram in which the central box says \u201cBehaviour\u201d and
      three boxes point into it from \u201cAntecedents\u201d, and three boxes point out to
      \u201cConsequences\u201d. She is told the diagram is a teaching model, and asked what
      it suggests a teacher should do.
    `),
    prompt: 'What does the model suggest?',
    options: [

      'The model suggests that a teacher should arrange antecedents and consequences, since behaviour follows its consequences.',
      'The model suggests that a teacher should focus only on antecedents, because consequences cannot be controlled.',
      'The model suggests that behaviour is determined entirely by internal traits.',
      'The model suggests that consequences should follow every behaviour, whatever it was.'
    ],
    correctIndex: 0,
    explanation:
      'The antecedents-behaviour-consequence model holds that behaviour is shaped by what precedes it and, decisively, by what follows it \u2014 so both are the teacher\u2019s to arrange. Ignoring consequences is exactly what the model warns against. Internal traits do matter, but the model is about the environment a teacher can shape. And consequences have to follow the behaviour worth reinforcing.',
    rationale: 'Applying the ABC model to the teacher\u2019s control of antecedents and consequences.',
    source: 'Behaviourist approaches to learning; PRC ProfEd TOS area B (30%)',
  },
  {
    id: 'pe-058',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher has just taught a lesson and asks learners to write down the three
      most important things they learned. She then reads the responses before the
      next lesson and adjusts what she emphasises based on what she finds. She
      never records the responses in her gradebook.
    `),
    prompt: 'What is the teacher doing?',
    options: [

      'She is conducting formative assessment, using the responses to adjust instruction rather than to grade.',
      'She is conducting summative assessment, gathering evidence for the term grade.',
      'She is conducting diagnostic assessment, identifying what learners knew before the lesson.',
      'She is conducting norm-referenced assessment, ranking learners against each other.'
    ],
    correctIndex: 0,
    explanation:
      'Gathering evidence after a lesson and using it to decide what to do next, without recording a grade, is formative assessment. Summative assessment would contribute to the grade, which she avoids. Diagnostic assessment precedes instruction to establish prior knowledge, whereas this follows a lesson she has already taught. And nothing compares learners to one another.',
    rationale: 'Identifying formative assessment by its use to adjust instruction rather than to grade.',
    source: 'Assessment of learning; PRC ProfEd TOS area D (15%)',
  },
  {
    id: 'pe-059',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher asks her class to close their eyes and picture their morning, then
      to write about what they saw, then to share it with a partner. She explains
      that the activity is not graded and that learners who prefer not to share may
      keep their writing to themselves.
    `),
    prompt: 'What is the purpose of the activity?',
    options: [

      'The purpose is to help learners access personal experience as a starting point for interpreting a text.',
      'The purpose is to assess learners’ writing against a standard.',
      'The purpose is to identify which learners have poor self-esteem.',
      'The purpose is to collect information for parents about learners’ home lives.'
    ],
    correctIndex: 0,
    explanation:
      'Guiding learners to picture and describe personal experience is a standard way to prepare them to read a text against their own experience, and that is what the activity is for \u2014 it precedes interpretation. It is not graded, so it is not an assessment of writing ability. Drawing a conclusion about self-esteem from one visualisation would be unfounded, and nothing is collected for parents.',
    rationale: 'Recognising experience-based pre-reading as preparation for interpretation.',
    source: 'Reading instruction; PRC ProfEd TOS areas B and C (30%, 20%)',
  },
  {
    id: 'pe-060',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is planning a lesson about a historical event and decides to begin by
      asking learners what they already believe about why it happened, before telling
      them anything. She explains that if she starts with her own account, learners
      will try to memorise it, whereas if they commit to their own account first they
      will have to reconcile it with what she says.
    `),
    prompt: 'What is the teacher doing?',
    options: [

      'She is activating prior knowledge, which must be surfaced before new material can attach to it.',
      'She is correcting misconceptions before teaching, which is the same thing.',
      'She is testing prior attainment, which determines where teaching begins.',
      'She is encouraging debate, which requires different views.'
    ],
    correctIndex: 0,
    explanation:
      'Surfacing what learners already believe so new material has something to attach to is prior-knowledge activation, and her reason is exactly the rationale. Correcting misconceptions is a related but different purpose, and she is not correcting anything yet. Asking what they believe is not a test of attainment. And her aim is activation, not debate.',
    rationale: 'Distinguishing prior-knowledge activation from misconception correction and testing.',
    source: 'Ausubel; Bruner; PRC ProfEd TOS area B (30%)',
  },
  {
    id: 'pe-061',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 1 teacher teaches letter sounds by showing a letter, saying its sound,
      and having learners say it back. She then does the same with a blend of two
      letters and has them segment and blend it. She explains that she is teaching
      the sounds and how they combine, not the names of the letters.
    `),
    prompt: 'What is the teacher teaching?',
    options: [

      'She is teaching phonemic awareness, the ability to hear and manipulate sounds of language.',
      'She is teaching alphabetisation, the sequence in which letters appear.',
      'She is teaching handwriting, the formation of letter shapes.',
      'She is teaching vocabulary, the number of words a learner knows.'
    ],
    correctIndex: 0,
    explanation:
      'Teaching the sounds letters make, and how sounds combine and segment, is phonemic awareness, which underlies reading. Alphabetisation is the alphabetical order of letters. Handwriting concerns forming shapes on paper, not sounds in the ear. And vocabulary is word knowledge, a different system entirely.',
    rationale: 'Identifying phonemic awareness from work on sounds rather than letters.',
    source: 'Reading instruction; PRC ProfEd TOS areas B and C (30%, 20%)',
  },
  {
    id: 'pe-062',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher asks learners to work in groups of four on a task, and gives each
      member a different role: one reads the task aloud, one keeps time, one
      records, one reports to the class. She explains that everyone is responsible
      for the group succeeding and that no one can succeed by working alone.
    `),
    prompt: 'Which principle of cooperative learning is described?',
    options: [

      'The principle described is positive interdependence, the outcome depending on every member contributing.',
      'The principle described is individual accountability, each member assessed separately.',
      'The principle described is group processing, the group evaluating how well it worked together.',
      'The principle described is social cohesion, members liking each other.'
    ],
    correctIndex: 0,
    explanation:
      'That no one can succeed alone, so the outcome depends on everyone, is positive interdependence \u2014 the defining feature of cooperative learning. Individual accountability is about separate assessment. Group processing is about the group reviewing its own functioning. And liking each other is social cohesion, which helps but is not the dependency she describes.',
    rationale: 'Identifying positive interdependence from shared dependence on group success.',
    source: 'Cooperative learning; PRC ProfEd TOS area B (30%)',
  },
  {
    id: 'pe-063',
    subjectId: 'profed',
    topicId: 'profed-assessment',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher gives a test and one item asks learners to define a term. She then
      notes that almost every learner scored the same on that item, but scored very
      differently on items requiring them to apply the term, and decides the
      definition item is not useful for her purpose.
    `),
    prompt: 'Why is the definition item not useful?',
    options: [

      'The item is not useful because it does not discriminate, since almost all scored alike.',
      'The item is not useful because it is too easy to be valid.',
      'The item is not useful because recalling a definition is not a legitimate objective.',
      'The item is not useful because the item used an unfair amount of time.'
    ],
    correctIndex: 0,
    explanation:
      'An item everyone answers alike separates nobody, so it contributes no information about who has learned what. Being easy does not make an item invalid; validity concerns what it measures, and recall is a legitimate objective. And nothing here concerns timing. The problem is a very high difficulty index and poor discrimination.',
    rationale: 'Recognising a non-discriminating item by the absence of score variation.',
    source: 'Item analysis; PRC ProfEd TOS area D (15%)',
  },
  {
    id: 'pe-064',
    subjectId: 'profed',
    topicId: 'profed-assessment',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is comparing two learners. One scored 92 and one scored 68, and she
      asks whether the higher score means the learner knows more. She explains that
      the scores come from a test she wrote herself for this class only, and that
      she cannot yet say whether it measured what she intended.
    `),
    prompt: 'What is the teacher cautious about?',
    options: [

      'She is cautious about whether the test is valid, whether it measured what she intended.',
      'She is cautious about whether the score difference is large enough to mean anything.',
      'She is cautious about whether a teacher-written test can ever be used.',
      'She is cautious about whether she is qualified to write a test.'
    ],
    correctIndex: 0,
    explanation:
      'She distinguishes what she has from evidence that the instrument measures what it claims \u2014 that is validity, a separate question from reliability. A score difference is uninformative about that. And there is nothing improper about a teacher writing her own test; the concern is technical, not about her authority.',
    rationale: 'Identifying validity as a question about the instrument rather than the score.',
    source: 'Assessment of learning; PRC ProfEd TOS area D (15%)',
  },
  {
    id: 'pe-065',
    subjectId: 'profed',
    topicId: 'profed-assessment',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher asks learners to perform a task that resembles the real work of the
      subject, and scores each performance against criteria she has stated in
      advance. Several different answers can be judged successful, and she tells
      learners the criteria before they begin.
    `),
    prompt: 'What kind of assessment is this?',
    options: [

      'This is an authentic assessment, a real task with stated criteria.',
      'This is a norm-referenced assessment, ranking learners against each other.',
      'This is a diagnostic assessment, identifying what learners knew beforehand.',
      'This is a conventional test, requiring one correct answer from memory.'
    ],
    correctIndex: 0,
    explanation:
      'A task resembling real work, scored against criteria stated in advance with more than one defensible successful answer, is authentic assessment. Norm-referenced assessment compares learners with each other. Diagnostic assessment precedes instruction, and this follows it. A conventional test requires one memorised answer, which this deliberately does not.',
    rationale: 'Identifying authentic assessment from a real task with multiple valid answers.',
    source: 'Assessment of learning; PRC ProfEd TOS area D (15%)',
  },
  {
    id: 'pe-066',
    subjectId: 'profed',
    topicId: 'profed-assessment',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher plans to assess learners on the ability to analyse a text, and
      realises that a test of recalling facts about the text would not measure that
      at all. She decides to require learners to support each claim they make with
      a quotation from the text.
    `),
    prompt: 'Why is requiring a quotation important?',
    options: [

      'Requiring a quotation matters because it ties every claim to evidence, so the assessment measures analysis.',
      'Requiring a quotation matters because quotations are easier to mark than extended answers.',
      'Requiring a quotation matters because it shortens the time needed to mark the work.',
      'Requiring a quotation matters because it prevents learners from disagreeing with each other.'
    ],
    correctIndex: 0,
    explanation:
      'Requiring evidence for each claim is what separates analysis from unsupported opinion, which is the teacher\u2019s stated aim. Requiring quotations often makes marking slower, not easier or faster. And learners may well still disagree; the requirement governs how a disagreement is supported, not whether disagreement is permitted.',
    rationale: 'Recognising evidence requirements as what make an assessment measure reasoning.',
    source: 'Assessment of learning; PRC ProfEd TOS area D (15%)',
  },
  {
    id: 'pe-067',
    subjectId: 'profed',
    topicId: 'profed-field-study',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student teacher wants to find out whether a particular classroom management
      technique works. She chooses one technique, changes her practice accordingly,
      records what happens for several weeks, and then decides whether to keep it.
      She explains that she is investigating her own practice rather than studying
      other teachers.
    `),
    prompt: 'What is the student teacher doing?',
    options: [

      'The student teacher is conducting action research on her own classroom practice.',
      'The student teacher is conducting a formal experiment with a control group.',
      'The student teacher is conducting a survey of other teachers’ practices.',
      'The student teacher is conducting a correlational study on two variables.'
    ],
    correctIndex: 0,
    explanation:
      'Investigating your own practice \u2014 changing something, observing the effect, recording it, and deciding what to do \u2014 is action research. No control group is mentioned. She is not gathering reports from other teachers. And she is not measuring two variables to see whether they covary.',
    rationale: 'Identifying action research as investigation of one\u2019s own practice over time.',
    source: 'Research in education; PRC ProfEd TOS area E (20%)',
  },
  {
    id: 'pe-068',
    subjectId: 'profed',
    topicId: 'profed-field-study',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student teacher reports that in her class, the learners who sat near the front
      completed more of the worksheet, and she explains that she has no way of knowing
      whether sitting front caused the completion or whether the more diligent
      learners simply chose to sit there.
    `),
    prompt: 'What is the student teacher acknowledging?',
    options: [

      'She is acknowledging that the variables covary but the direction of effect is not established.',
      'She is acknowledging that the worksheet was too difficult for the class.',
      'She is acknowledging that seating has no effect on learning.',
      'She is acknowledging that her sample was too small to be valid.'
    ],
    correctIndex: 0,
    explanation:
      'She is distinguishing correlation from causation: the two vary together, but front-sitting learners may simply have been the diligent ones. Nothing in the finding concerns worksheet difficulty. And the problem she identifies is not sample size but confounding \u2014 a larger sample would not establish direction of effect either.',
    rationale: 'Distinguishing an observed association from an unsupported causal claim.',
    source: 'Research methods; PRC ProfEd TOS area E (20%)',
  },
  {
    id: 'pe-069',
    subjectId: 'profed',
    topicId: 'profed-field-study',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student teacher is asked to grade her practicum and is given criteria with
      descriptions of what exemplary, satisfactory and poor performance look like
      in each. She places her performance against a level and writes her reasons,
      explaining that the descriptors told her what each level actually meant.
    `),
    prompt: 'What is this instrument?',
    options: [

      'The instrument is a rubric, which describes performance levels against criteria.',
      'The instrument is a checklist, which records whether each item is present.',
      'The instrument is a questionnaire, which collects responses from learners.',
      'The instrument is a tally sheet, which counts observable behaviours.'
    ],
    correctIndex: 0,
    explanation:
      'Criteria described at several defined performance levels is a rubric, and the descriptors are what tell a rater what each level means \u2014 the teacher\u2019s stated reason. A checklist records presence or absence and carries no levels. A questionnaire collects responses from others. And a tally sheet counts behaviours rather than judging quality.',
    rationale: 'Identifying a rubric by its pre-stated level descriptors.',
    source: 'Assessment of performance; PRC ProfEd TOS areas D and E (15%, 20%)',
  },
  {
    id: 'pe-070',
    subjectId: 'profed',
    topicId: 'profed-field-study',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student teacher submits her entire practicum portfolio: her plans, her
      annotated observation records, learners\u2019 work with her markings, and her
      reflective notes. She explains that no single piece of it shows how she
      developed, but the collection does.
    `),
    prompt: 'Why is the whole portfolio submitted rather than one best piece?',
    options: [

      'The whole portfolio is submitted because growth over time is evidenced by a body of work.',
      'The whole portfolio is submitted because a larger submission always receives a higher grade.',
      'The whole portfolio is submitted because individual pieces cannot be assessed at all.',
      'The whole portfolio is submitted because the portfolio replaces the final rating.'
    ],
    correctIndex: 0,
    explanation:
      'Her stated reason is that development is visible across a body of work but not in any one artefact \u2014 that is what a portfolio is for. Size does not earn marks, and single pieces are assessed, they just cannot show growth. And the portfolio adds evidence to the rating rather than replacing it.',
    rationale: 'Explaining a portfolio as longitudinal evidence of development.',
    source: 'Portfolio assessment; PRC ProfEd TOS areas D and E (15%, 20%)',
  },
  {
    id: 'pe-071',
    subjectId: 'profed',
    topicId: 'profed-teaching-profession',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is asked whether she may accept a gift from a parent. She explains
      that gifts of substantial value are prohibited, that ordinary courtesies are
      not, and that the rule exists because accepting substantial gifts could
      compromise her judgement of a learner.
    `),
    prompt: 'Why are gifts of substantial value prohibited?',
    options: [

      'Substantial gifts are prohibited because they could compromise impartial judgement of a learner.',
      'Substantial gifts are prohibited because accepting any gift at all is unlawful.',
      'Substantial gifts are prohibited because gifts must be reported regardless of value.',
      'Substantial gifts are prohibited because gifts replace the professional standards.'
    ],
    correctIndex: 0,
    explanation:
      'The reason is impartiality: a substantial gift creates an obligation that could affect how a learner is treated, which is why the prohibition is framed around value. Ordinary courtesies are explicitly permitted. And reporting thresholds apply according to value. Professional standards remain the basis for judgement in either case.',
    rationale: 'Explaining a gift prohibition by impartiality rather than by a blanket rule.',
    source: 'Code of Ethics for Professional Teachers; PRC ProfEd TOS area A (15%)',
  },
  {
    id: 'pe-072',
    subjectId: 'profed',
    topicId: 'profed-teaching-profession',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher has completed six years of service, has mentored four beginning
      teachers, has led professional development in her school, and has contributed
      to the revision of her school\u2019s curriculum. She is now being considered for
      the highest career stage.
    `),
    prompt: 'Which career stage is she being considered for?',
    options: [

      'She is being considered for Distinguished, which requires leading colleagues in promoting quality learning.',
      'She is being considered for Highly Proficient, which requires mentoring and leading professional development.',
      'She is being considered for Proficient, which requires professional independence.',
      'She is being considered for Beginning, which is the entry stage for new teachers.'
    ],
    correctIndex: 0,
    explanation:
      'The four stages are Beginning, Proficient, Highly Proficient and Distinguished. Her mentoring and professional development show she has already met Highly Proficient; being considered for the next one means Distinguished, whose distinguishing work is leading colleagues in promoting quality learning. She is long past entry.',
    rationale: 'Placing a teacher on the PPST career ladder from the responsibilities already held.',
    source: 'DepEd Order No. 42, s. 2017 (PPST career stages); PRC ProfEd TOS area A (15%)',
  },
  {
    id: 'pe-073',
    subjectId: 'profed',
    topicId: 'profed-teaching-profession',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher learns that a fellow teacher has been copying test answers and giving
      them to learners. She is uncertain whether to report it, and explains that she
      knows the teacher personally and that reporting will affect their friendship.
    `),
    prompt: 'What does professional obligation require?',
    options: [

      'Professional obligation requires that she report through the proper channel, since duty to learners overrides personal loyalty.',
      'Professional obligation requires that she discuss it privately first and report only if nothing changes.',
      'Professional obligation requires that she remain silent, since it does not affect her class.',
      'Professional obligation requires that she confront the teacher in front of the department.'
    ],
    correctIndex: 0,
    explanation:
      'Failing learners is an abuse of the teaching profession that her duty to learners requires her to report through the proper channel; personal loyalty does not override it. Discussing it first is not the procedure, and doing nothing leaves the harm continuing. The affected learners are not only in the other class. And public confrontation is unprofessional.',
    rationale: 'Recognising the duty to report despite personal loyalty.',
    source: 'Code of Ethics for Professional Teachers; PRC ProfEd TOS area A (15%)',
  },
  {
    id: 'pe-074',
    subjectId: 'profed',
    topicId: 'profed-assessment',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher asks a learner to explain her reasoning aloud while solving a
      problem. She then reads the explanation and uses it to decide what to reteach.
      She notes that the learner\u2019s final answer was wrong, but her reasoning was
      sound until a specific step, which is where she begins next lesson.
    `),
    prompt: 'Why did the teacher ask the learner to explain her reasoning?',
    options: [

      'She asked for the reasoning because it reveals where the process broke down, which the answer does not show.',
      'She asked for the reasoning because verbalising improves memory regardless of correctness.',
      'She asked for the reasoning because it is what learners are examined on instead of the answer.',
      'She asked for the reasoning because reasoning can only be assessed by asking it aloud.'
    ],
    correctIndex: 0,
    explanation:
      'She wanted to locate the exact step where a correct process went wrong, which is only visible in the reasoning. Verbalising may incidentally help memory, but that is not what she used it for. The answer remains what learners are examined on, and reasoning can certainly be assessed in writing.',
    rationale: 'Recognising reasoning aloud as a diagnostic that locates the error precisely.',
    source: 'Assessment of learning; PRC ProfEd TOS area D (15%)',
  },
];

export default BATCH_PROFED_4;
