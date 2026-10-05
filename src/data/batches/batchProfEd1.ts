import type { QuestionDraft } from '../../pipeline';

/**
 * Professional Education — part 1 of 2 (items pe-001 … pe-014).
 *
 * Targets `profed-teaching-profession`, `profed-curriculum` and
 * `profed-learners`. Part 2 (assessment + field study) is in batchProfEd2.ts.
 *
 * Why these subjects: after the GenEd batches the 350-item paper's GenEd
 * section fills completely, but ProfEd is 73 items short and CAE 56. GenEd
 * writing cannot shorten those sections, so the remaining gap is entirely
 * ProfEd and CAE.
 *
 * Sources: DepEd Order No. 42, s. 2017 (PPST, 7 domains / 37 strands);
 * RA 10533; RA 7836; RA 4670; RA 9155; DepEd Order No. 21, s. 2019 (K to 12
 * curriculum principles); Stufflebeam CIPP; Tyler; Taba; Piaget, Vygotsky,
 * Bruner, Maslow, Bandura; Felten's principles of good practice; CNRP.
 */

const V = (text: string) => text.trim();

export const BATCH_PROFED_1: readonly QuestionDraft[] = [
  {
    id: 'pe-001',
    subjectId: 'profed',
    topicId: 'profed-teaching-profession',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A school principal is asked by a new teacher what her professional
      obligations are. She explains that beyond knowing her subject, she is
      expected to know her learners, to use assessment results to adjust her
      teaching, to contribute to the school community, and to grow
      professionally. She says these expectations were set out in a national
      document organised into seven domains and thirty-seven strands, and that
      they apply to every teacher regardless of subject or school.
    `),
    prompt: 'Which document is the principal referring to?',
    options: [
      'The principal is referring to the Philippine Professional Standards for Teachers, which sets expectations across seven domains and thirty-seven strands.',
      'The principal is referring to the Magna Carta for Public School Teachers, which lists the rights and privileges of teachers.',
      'The principal is referring to the Code of Ethics for Professional Teachers, which lists the penalties for misconduct.',
      'The principal is referring to the Table of Specifications, which sets the coverage of the licensure examination.',
    ],
    correctIndex: 0,
    explanation:
      'DepEd Order No. 42, s. 2017 issued the Philippine Professional Standards for Teachers, defining teacher quality across seven domains and thirty-seven strands, including what teachers must know, value and be able to do at each of the four career stages. The Magna Carta concerns rights and privileges rather than standards of quality. The Code of Ethics governs conduct and sanctions, not the seven-domain structure described. The Table of Specifications sets licensure coverage.',
    rationale: 'Identifying the PPST from its structure and its function.',
    source: 'DepEd Order No. 42, s. 2017 (PPST); PRC ProfEd TOS area A (15%)',
  },
  {
    id: 'pe-002',
    subjectId: 'profed',
    topicId: 'profed-teaching-profession',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher has been asked to write a recommendation for a colleague who is
      applying for a promotion. The colleague is a strong classroom practitioner
      but has repeatedly refused to help new teachers and has not attended a
      single professional development activity in three years. The teacher knows
      that promotion to the next career stage requires mentoring colleagues and
      leading professional development, not only strong teaching.
    `),
    prompt: 'What is the ethical problem with writing a strong recommendation?',
    options: [
      'The recommendation would be misleading by omission, because the specific competency the promotion requires is one the colleague has not demonstrated.',
      'There is no problem, because teaching quality is the most important criterion for promotion.',
      'The problem is that a teacher may not write a recommendation for a colleague at all.',
      'The problem is that the recommendation should be written by the principal rather than by a peer.',
    ],
    correctIndex: 0,
    explanation:
      'Honesty in a recommendation requires representing the candidate\u2019s full competence against the criteria, not only their strengths. Mentoring and leading professional development is an explicit indicator for the next career stage, so withholding that the colleague has not demonstrated it creates a false impression for the panel that must decide. Peer recommendations are normal and the principal is not the only permissible authoriser. Writing one that is favourable on the criteria that were met, while being silent on one that was not, is deception by omission.',
    rationale:
      'Recognising misleading-by-omission against a specific promotion criterion, not a general duty to be positive.',
    source: 'DepEd Order No. 42, s. 2017 (PPST career stages); Code of Ethics for Professional Teachers',
  },
  {
    id: 'pe-003',
    subjectId: 'profed',
    topicId: 'profed-teaching-profession',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A first-year teacher is about to face her first class of forty-two
      Grade 7 learners. She asks her mentor what she should prioritise on the
      first day. The mentor tells her that knowing the learners\u2019 names,
      establishing routines that signal what will happen in the room, and
      checking what learners already know are more valuable than any activity
      she might plan to impress them.
    `),
    prompt: 'What is the mentor emphasising?',
    options: [
      'The mentor is emphasising that meaningful learning depends on knowing the learners, structuring the learning environment, and building on prior knowledge.',
      'The mentor is emphasising that first impressions determine learner motivation for the whole year.',
      'The mentor is emphasising that a lesson plan should always be completed before learners arrive.',
      'The mentor is emphasising that classroom size has no effect on what can be achieved.',
    ],
    correctIndex: 0,
    explanation:
      'The three things named correspond to core PPST strands: knowing the learners, establishing a learning environment with clear routines, and building on what learners already know. These are prerequisites for any activity, because instruction cannot be adapted to learners a teacher has not understood. Motivation is built through consistent practice rather than first impressions, and a plan that ignores the actual learners is worth little. Classroom size affects what is feasible and is not irrelevant.',
    rationale:
      'Identifying the foundational teaching priorities that precede any specific activity.',
    source: 'DepEd Order No. 42, s. 2017 (PPST Domains 2, 3); Felten, Principles of Good Practice',
  },
  {
    id: 'pe-004',
    subjectId: 'profed',
    topicId: 'profed-teaching-profession',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is observed for her performance rating. The rater explains that
      her teaching is technically sound and that her learners clearly understand
      the content, but that she has never shared a lesson plan with a colleague,
      has not led any professional development, and has not contributed to the
      school\u2019s curriculum review. The rater explains that the rating covers
      indicators beyond her own classroom, and asks how she should respond.
    `),
    prompt: 'What is the most accurate reading of the rater\u2019s feedback?',
    options: [
      'The rater is applying career-stage indicators that include mentoring and contribution beyond the classroom, so strong teaching alone does not meet this stage.',
      'The rater is saying her teaching quality is unsatisfactory and should be corrected immediately.',
      'The rater is applying a rubric that is identical for every career stage, so the feedback is inconsistent.',
      'The rater is encouraging her to reduce classroom time in order to take on school-wide duties.',
    ],
    correctIndex: 0,
    explanation:
      'The PPST describes four career stages, and the Highly Proficient stage requires accomplished practice in the classroom plus mentoring colleagues and leading professional development. Teaching well is necessary but not sufficient at that stage, which is exactly what the rater is telling her. Nothing about her classroom practice was criticised. The indicators do differ by stage, so the rubric is not uniform, and nothing suggests she should reduce her teaching time \u2014 the strand requires adding to it.',
    rationale:
      'Reading PPST career-stage indicators as broader than classroom teaching quality.',
    source: 'DepEd Order No. 42, s. 2017 (PPST Domains 6, 7 and career stages)',
  },
  {
    id: 'pe-005',
    subjectId: 'profed',
    topicId: 'profed-curriculum',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is explaining her subject to a class and repeatedly checks
      whether the class has followed, stopping to re-explain when she sees blank
      faces. She begins from what she knows rather than from what learners know,
      and she covers the content in the order the textbook lists. Her lesson is
      thorough and she is confident in it, but at the end of the period she
      realises she does not actually know whether the class understood anything.
    `),
    prompt: 'Which approach to teaching does the teacher describe?',
    options: [
      'The teacher is describing a teacher-centred approach, in which the teacher rather than the learners is the source and the measure of learning.',
      'The teacher is describing a learner-centred approach, in which learners determine what is learned and how fast.',
      'The teacher is describing a constructivist approach, in which learners build knowledge actively from prior experience.',
      'The teacher is describing a collaborative approach, in which learners work together in groups to produce a shared product.',
    ],
    correctIndex: 0,
    explanation:
      'Every marker here points away from the learner as the reference point: content and its sequence come from the textbook, checking is brief and remedial, and the teacher judges whether the class has understood rather than the learners demonstrating it. That is teacher-centred. Learner-centred would start from learners\u2019 needs and interests; constructivist would require learners to actively build understanding from prior experience; collaborative requires group work and a joint product. The teacher is careful and thorough, but none of that makes her approach learner-centred.',
    rationale:
      'Distinguishing teacher-centred practice from three learner-centred approaches it is easily confused with.',
    source: 'Approaches to teaching; PRC ProfEd TOS area B (30%)',
  },
  {
    id: 'pe-006',
    subjectId: 'profed',
    topicId: 'profed-curriculum',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is reviewing her subject\u2019s curriculum. She finds that the topics
      are arranged in a sequence that begins with broad principles and moves to
      more specific and complex applications, that every learner covers the same
      content, and that the outcomes are stated as what the learner will be able
      to do rather than as content to be covered. She asks a colleague what kind
      of design she is looking at.
    `),
    prompt: 'What curriculum design does the teacher describe?',
    options: [
      'The teacher is looking at a subject-centred design, which organises content around a body of knowledge arranged from general to specific.',
      'The teacher is looking at a learner-centred design, which organises content around the interests and needs of learners.',
      'The teacher is looking at a core or integrated design, which fuses separate subjects around common themes.',
      'The teacher is looking at a competency-based design, which organises content around demonstrated performance rather than content.',
    ],
    correctIndex: 0,
    explanation:
      'Organising content around a discipline\u2019s own body of knowledge, sequenced from principles to applications, with identical content for every learner, is a subject-centred design \u2014 the Tyler tradition. Learner-centred would vary the content by learner interest; a core or integrated design would deliberately blur subject boundaries around themes, which is the opposite of a per-subject sequence; and a competency-based design would organise around demonstrated capability, not around the body of knowledge even if outcomes are written as performances. Competency-based outcomes are compatible with a subject-centred content structure, which is the trap here.',
    rationale:
      'Identifying a subject-centred design and not confusing competency-based outcomes with a competency-based content structure.',
    source: 'Tyler, Basic Principles of Curriculum and Instruction; PRC ProfEd TOS area B (30%)',
  },
  {
    id: 'pe-007',
    subjectId: 'profed',
    topicId: 'profed-curriculum',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A school has run a year of a programme that was intended to raise
      achievement. Attendance fell, dropout rose, and results did not improve. A
      review team gathers information in four categories: the school\u2019s context
      and needs, the resources and strategies actually supplied, the way the
      programme was implemented day to day, and the outcomes. The team
      recommends changing how it is run rather than abandoning it.
    `),
    prompt: 'Which evaluation model is the team using?',
    options: [
      'The team is using Stufflebeam\u2019s CIPP model, which evaluates Context, Input, Process and Product.',
      'The team is using Tyler\u2019s objectives model, which evaluates only whether stated objectives were met.',
      'The team is using a goal-free model, which deliberately avoids looking at the programme\u2019s stated objectives.',
      'The team is using a simple outcomes-only model, which compares results against the previous year\u2019s results.',
    ],
    correctIndex: 0,
    explanation:
      'Four categories gathered, with the aim of deciding how to improve the programme rather than whether it exists, is the signature of the CIPP model \u2014 Context, Input, Process, Product. Tyler\u2019s model asks only whether objectives were achieved, which cannot explain a fall in attendance. A goal-free model explicitly avoids the stated objectives, which this team used as its basis. Comparing against last year\u2019s results would be a single comparison, not the four-category diagnostic the team actually ran, and would not support the process-level change they recommended.',
    rationale:
      'Identifying CIPP from its four components and its improvement-oriented purpose.',
    source: 'Stufflebeam, CIPP Evaluation Model; PRC ProfEd TOS area B (30%)',
  },
  {
    id: 'pe-008',
    subjectId: 'profed',
    topicId: 'profed-curriculum',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A principal must choose between two curriculum options. Option A is
      detailed, prescribes exactly what to teach and in what order, and is easy
      for a substitute teacher to follow. Option B specifies only the learning
      outcomes and leaves the sequence, materials and methods entirely to the
      teacher. The principal wants a document that does not over-prescribe, on
      the grounds that teachers know their learners better than a central office
      does.
    `),
    prompt: 'Which criticism does the principal\u2019s reasoning overlook?',
    options: [
      'Non-prescription also removes any guarantee of coverage, so learners in different schools may receive quite different content.',
      'Non-prescription is impossible in practice because the law requires a detailed syllabus.',
      'Non-prescription is desirable because different learners always need different content anyway.',
      'Non-prescription only affects experienced teachers, since novices require detailed prescriptions.',
    ],
    correctIndex: 0,
    explanation:
      'The trade-off the principal is not seeing is between teacher autonomy and guaranteed coverage. Leaving sequence and content to the teacher means a class may not touch a required topic at all, which is precisely why a national curriculum exists. The law does not require a lesson-by-lesson prescription, so the second reading is wrong. Non-prescription is not automatically desirable \u2014 standardisation exists because unguided choice produces gaps. And it affects novices most, not least: the detailed version the principal dismissed as over-prescriptive is exactly what a beginning or substitute teacher needs.',
    rationale:
      'Identifying the coverage-versus-autonomy trade-off that an autonomy argument ignores.',
    source: 'Curriculum development; PRC ProfEd TOS area B (30%)',
  },
  {
    id: 'pe-009',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 2 learner is given a row of five coins and then a row of five coins
      with one coin visibly removed. When asked which row had more, the learner
      points to the longer row. The teacher notes that the learner is attending
      carefully to length and spacing, and ignoring the thing that actually
      changed, which was the number of coins.
    `),
    prompt: 'Which concept is the learner demonstrating?',
    options: [
      'The learner is demonstrating centration, the tendency to focus on one dimension of a situation and ignore the others.',
      'The learner is demonstrating conservation, the understanding that quantity does not change when appearance changes.',
      'The learner is demonstrating object permanence, the understanding that objects continue to exist when out of sight.',
      'The learner is demonstrating seriation, the ability to arrange objects in order by size.',
    ],
    correctIndex: 0,
    explanation:
      'Centration is the preoperational tendency to attend to one salient dimension \u2014 here, length \u2014 while ignoring the others, which is exactly what the learner does. Conservation is the understanding the learner has not yet acquired and the reason the task is used. Object permanence is achieved well before this stage. Seriation is ordering by size, which is not what the learner is doing. Naming centration rather than conservation matters, because centration explains the error while conservation only names the missing skill.',
    rationale:
      'Distinguishing the cognitive limitation that explains an error from the ability that is lacking.',
    source: 'Jean Piaget, cognitive development theory; PRC ProfEd TOS area C (20%)',
  },
  {
    id: 'pe-010',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is planning a task that requires learners to work in groups. She
      explains that she will assign each learner a role with a genuine
      responsibility \u2014 a facilitator, a recorder, a checker of the answer
      against the rubric \u2014 and rotate the roles every few sessions. She notes
      that one learner has volunteered for the facilitator role each time, and
      asks the class what the rotating roles are for.
    `),
    prompt: 'What are the rotating roles for?',
    options: [
      'The roles distribute responsibility so that every learner develops the interpersonal skills cooperation requires, instead of one learner doing the work.',
      'The roles let the teacher identify which learners are the strongest so she can group them deliberately.',
      'The roles speed up the completion of group work by assigning each task to one person.',
      'The roles ensure that every group produces work of identical quality.',
    ],
    correctIndex: 0,
    explanation:
      'Cooperative learning is defined by positive interdependence, individual accountability and promotive interaction, and the shared responsibility is the point. Rotating roles so that every learner holds each one builds the communication and participation the arrangement is meant to develop. Assigning roles by ability is grouping, not cooperation, and it would exclude the learner who keeps volunteering. Roles do not speed work up \u2014 they slow it slightly while raising what each learner does. Equal quality is not the purpose either; individual accountability means holding each learner responsible for their own part.',
    rationale:
      'Explaining cooperative roles as shared responsibility rather than task distribution.',
    source: 'Cooperative learning; PRC ProfEd TOS area B (30%)',
  },
  {
    id: 'pe-011',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 7 teacher finds that learners who read her lesson carefully score
      poorly, while learners who talk with peers about the idea first score well.
      She moves from a quiet individual reading to a pair discussion before she
      explains the concept, and requires each pair to write one question before
      she addresses the class. Her results improve the following term.
    `),
    prompt: 'What does the teacher describe?',
    options: [
      'The teacher is describing advance organisers, which activate prior knowledge and give learners a framework for absorbing new material.',
      'The teacher is describing discovery learning, in which learners work out the concept for themselves with no teacher explanation.',
      'The teacher is describing the advance-organiser theory of Ausubel, which requires the teacher to withhold all explanation until discovery is complete.',
      'The teacher is describing the sponge model, in which repetition and practice consolidate what is already understood.',
    ],
    correctIndex: 0,
    explanation:
      'Getting learners to engage with prior knowledge and articulate a question before instruction gives the lesson a framework to attach to, which is what an advance organiser does \u2014 and pairing learners is consistent with the cooperative principle of strengthening others\u2019 thinking. This is not discovery learning: the teacher still explains, rather than withholding explanation. Ausubel\u2019s theory requires the organiser, not the absence of teaching, so that reading is wrong. And repetition and practice, the sponge model, consolidate material already learned rather than preparing learners to receive it.',
    rationale:
      'Identifying advance organisers from the sequence of prior engagement before instruction.',
    source: 'Ausubel, The Organization and Retention of Learning; PRC ProfEd TOS area B (30%)',
  },
  {
    id: 'pe-012',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher gives a task and tells learners they will be graded on the work.
      She then tells them that they may use any resource they like. A learner
      searches the internet and submits an answer copied from a summary site,
      and another works through the problem unaided. The teacher asks the class
      what the second learner gained that the first did not.
    `),
    prompt: 'What is the significance of letting learners use resources freely while still grading the outcome?',
    options: [
      'The grade reflects what the learner can do unaided, so resources are permitted as scaffolding but cannot substitute for the assessed competency.',
      'Free use of resources makes the grade meaningless, because different learners had different advantages.',
      'Free use of resources is unfair to learners who lack internet access at home.',
      'Free use of resources should be prohibited because it undermines the teacher\u2019s authority in the classroom.',
    ],
    correctIndex: 0,
    explanation:
      'What is assessed determines what resources may be used for. Because the grade measures an individual\u2019s unaided capability, resources are legitimate as scaffolding and illegitimate as a substitute \u2014 the copied answer is not evidence of the competency the grade claims to report. Different advantages are a fairness consideration for any assessment, not a reason a grade stops meaning anything. Access inequity is a real concern about resource-permitting tasks, but the teacher\u2019s framing addresses it by assessing unaided work, which is not true of the copied submission. Nothing about this undermines the teacher\u2019s authority.',
    rationale:
      'Connecting resource freedom to what the assessment actually measures.',
    source: 'Assessment of learning; PRC ProfEd TOS areas B and D (30%, 15%)',
  },
  {
    id: 'pe-013',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher asks her class to list things they need in order to feel safe in
      the classroom. She then asks which of those needs are basic physical needs,
      which are psychological, and which belong to self-actualisation. She
      explains that people strive to meet lower needs before higher ones, and
      that a learner who is hungry or frightened cannot be expected to attend to
      a lesson.
    `),
    prompt: 'Which theorist is the teacher describing?',
    options: [
      'The teacher is describing Abraham Maslow, whose hierarchy orders human needs from physiological to self-actualisation.',
      'The teacher is describing Carl Rogers, whose client-centred theory places unconditional positive regard at the centre of learning.',
      'The teacher is describing Erik Erikson, whose stages of psychosocial development span the whole lifespan.',
      'The teacher is describing Albert Bandura, whose social learning theory explains learning through observation and modelling.',
    ],
    correctIndex: 0,
    explanation:
      'A hierarchy in which physiological, safety and belonging needs precede esteem and self-actualisation, and in which unmet lower needs block attention to higher ones, is Maslow\u2019s. Rogers\u2019s contribution is the relationship between teacher and learner, not a need hierarchy. Erikson\u2019s stages are developmental crises across a lifetime rather than a ranked list of needs. Bandura\u2019s theory concerns observational learning and self-efficacy \u2014 relevant to many things in this class, but not to the ordering of needs the teacher is explaining.',
    rationale: 'Identifying Maslow\u2019s hierarchy of needs from its structure and its central claim.',
    source: 'Maslow, A Theory of Human Motivation; PRC ProfEd TOS area C (20%)',
  },
  {
    id: 'pe-014',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher notices that a learner who once volunteered answers no longer
      raises her hand, though she still completes the work correctly. The teacher
      changes nothing about the content or the difficulty and simply begins
      praising the learner\u2019s effort on completed tasks in front of the class. Over
      several weeks the learner begins to raise her hand again.
    `),
    prompt: 'Which principle is the teacher applying?',
    options: [
      'The teacher is strengthening the learner\u2019s self-efficacy through mastery experiences, attributing success to the learner\u2019s own effort.',
      'The teacher is reinforcing the learner\u2019s behaviour with praise, which will transfer to participation automatically.',
      'The teacher is using negative reinforcement, since the withdrawal is being removed by the teacher\u2019s attention.',
      'The teacher is motivating the learner through extrinsic reward, since praise is a reward from the teacher.',
    ],
    correctIndex: 0,
    explanation:
      'Self-efficacy is a person\u2019s belief in their own capability, and the most powerful source of it is genuine mastery experiences \u2014 succeeding through one\u2019s own effort. Praising effort on real, correctly completed work supplies exactly that, which is why it works where praising ability often does not. Praise as reinforcement describes the contingency between behaviour and response but not the mechanism of belief, and transfer to participation is not automatic. Nothing is being removed, so this is not negative reinforcement. And because the praise is for work actually accomplished rather than for compliance, extrinsic reward is the wrong frame.',
    rationale:
      'Distinguishing self-efficacy through mastery from reinforcement and reward framings.',
    source: 'Bandura, Self-Efficacy: The Exercise of Control; PRC ProfEd TOS area C (20%)',
  },
];

export default BATCH_PROFED_1;
