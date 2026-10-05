import type { QuestionDraft } from '../../pipeline';

/**
 * Professional Education — part 3 (items pe-026 … pe-050).
 *
 * Batch 1 of the ProfEd/CAE push. After the GenEd batches the 350-item paper's
 * GenEd section filled completely but ProfEd was 73 items short and CAE 56.
 *
 * Spreads across all five ProfEd topics. Sources: Bruner, The Process of
 * Education; Ausubel; Rogers; Thorndike; child protection statutes (RA 7610,
 * RA 9262, RA 10931); PPST Domains 1-7; Stufflebeam CIPP; Tyler; Bloom;
 * cooperative learning; action research; Code of Ethics for Professional
 * Teachers.
 */

const V = (text: string) => text.trim();

export const BATCH_PROFED_3: readonly QuestionDraft[] = [
  {
    id: 'pe-026',
    subjectId: 'profed',
    topicId: 'profed-curriculum',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is planning a lesson and has identified four things she wants
      learners to be able to do by the end of it. She then works out what must
      be taught for each of those to be possible, selects the material that
      serves them, decides the order and the activities, and finally decides how
      she will check whether the objectives were met. She is troubled because
      her principal says this is not how a teacher should plan.
    `),
    prompt: 'Why does the principal object?',
    options: [
      'The principal objects because the teacher is starting from objectives, which is Tyler\u2019s approach and places objectives before content and method.',
      'The principal objects because the teacher should start from the textbook rather than from objectives.',
      'The principal objects because objectives should be written only after the assessment, so that they describe what was tested.',
      'The principal objects because four objectives is too many for a single lesson.',
    ],
    correctIndex: 0,
    explanation:
      'Working backwards from objectives to content, method and assessment is Tyler\u2019s basic principle: define what should be learned, then select the experiences and materials that produce it. That ordering is a recognised design, not a mistake. Objectives do not need to follow the textbook \u2014 they specify the outcome the textbook is selected to serve. Objectives are stated before assessment so the assessment can be chosen to measure them. And the number of objectives is a judgement call, not the principal\u2019s stated concern.',
    rationale: 'Recognising Tyler\u2019s objectives-first sequence as a legitimate design.',
    source: 'Tyler, Basic Principles of Curriculum and Instruction; PRC ProfEd TOS area B (30%)',
  },
  {
    id: 'pe-027',
    subjectId: 'profed',
    topicId: 'profed-curriculum',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is given a long list of content for a term and too little time.
      She decides to concentrate on the concepts that organise the most material,
      rather than trying to cover every topic, and she explains that learners who
      understand the organising ideas can reconstruct much of the detail
      themselves. Her colleagues think content coverage is what matters.
    `),
    prompt: 'What is the teacher applying?',
    options: [
      'The teacher is applying the process of organisation described by Bruner, in which a few key ideas are taught in depth so that structure can be generated.',
      'The teacher is applying Tyler\u2019s objectives model, which requires all essential content to be covered.',
      'The teacher is applying the decongested curriculum, which removes content purely to reduce the number of competencies.',
      'The teacher is applying the core curriculum, which fuses all subjects into a single integrated study.',
    ],
    correctIndex: 0,
    explanation:
      'Bruner\u2019s process of organisation holds that any subject can be taught to any learner if the material is organised around its key ideas, because grasping structure allows the rest to be generated. That is the reasoning the teacher gives. Tyler\u2019s model does not demand exhaustive coverage. Decongestion is about reducing content for practical reasons, not about teaching fewer things more deeply. A core curriculum fuses subjects, which is not happening here.',
    rationale: 'Identifying Bruner\u2019s process of organisation from teaching structure rather than coverage.',
    source: 'Bruner, The Process of Education; PRC ProfEd TOS area B (30%)',
  },
  {
    id: 'pe-028',
    subjectId: 'profed',
    topicId: 'profed-curriculum',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher wants to teach a topic without telling learners the answer. She
      arranges the material so learners encounter a problem that cannot be solved
      with what they already know, then guides them toward discovering the
      solution themselves. She says the aim is to develop the capacity to solve
      unfamiliar problems later, not merely to acquire this one answer.
    `),
    prompt: 'What is the teacher describing?',
    options: [
      'The teacher is describing discovery learning, in which learners reconstruct the knowledge rather than receiving it.',
      'The teacher is describing programmed instruction, in which content is delivered in small verified steps.',
      'The teacher is describing mastery learning, in which learners proceed only after reaching a criterion.',
      'The teacher is describing direct instruction, in which the teacher explains the material directly to save time.',
    ],
    correctIndex: 0,
    explanation:
      'Arranging a situation in which learners must generate the solution themselves, with the aim of building the capacity to handle new problems, is discovery learning. Programmed instruction is about the delivery sequence and immediate verification. Mastery learning concerns the criterion for moving on. Direct instruction is the opposite of what she describes: she is deliberately not telling them.',
    rationale: 'Identifying discovery learning from its aim and its deliberate withholding of the answer.',
    source: 'Bruner, The Process of Education; PRC ProfEd TOS area B (30%)',
  },
  {
    id: 'pe-029',
    subjectId: 'profed',
    topicId: 'profed-curriculum',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is asked why her lesson did not work. She reviews what happened,
      considers what she would do differently, and then changes one element of her
      teaching and tries again. She explains that this is not the same as
      following a fixed curriculum guide, because she is deriving the guide from
      what she observes rather than the other way round.
    `),
    prompt: 'What is the teacher doing?',
    options: [
      'She is engaging in reflective practice, deriving future action from what actually happened rather than following a prescribed script.',
      'She is engaging in action research, because she is investigating her own practice systematically.',
      'She is engaging in the clinical method, which follows a prescribed diagnostic and prescriptive sequence.',
      'She is engaging in the deductive method, which proceeds from general principles to specific cases.',
    ],
    correctIndex: 0,
    explanation:
      'Reviewing what happened, deciding what to change and acting on it is reflective practice, and her framing \u2014 deriving the guide from observation rather than the reverse \u2014 is exactly that. Action research requires a stated problem, a method, recorded data and a data-based decision, none of which is described. The clinical method follows a fixed diagnostic sequence, which is the opposite of what she says. Reasoning from a case back toward general principles is induction, not deduction.',
    rationale: 'Distinguishing reflective practice from action research and from fixed clinical or deductive methods.',
    source: 'Reflective teaching practice; PRC ProfEd TOS area B (30%)',
  },
  {
    id: 'pe-030',
    subjectId: 'profed',
    topicId: 'profed-teaching-profession',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A school principal introduces a programme in which every teacher is paired
      with a more experienced teacher for a year. The experienced teacher observes,
      offers feedback, models lessons and shares materials, while the beginner
      plans her own lessons and reports how they went. The principal explains that
      the arrangement is not an inspection of the beginner.
    `),
    prompt: 'What is the arrangement?',
    options: [
      'It is mentoring or induction, in which a more experienced teacher supports a beginning teacher\u2019s professional growth.',
      'It is clinical supervision, in which the supervisor evaluates the beginner against a fixed rubric.',
      'It is a performance rating, in which the beginner is scored on her lessons.',
      'It is peer tutoring, in which two teachers of equal experience teach each other\u2019s classes.',
    ],
    correctIndex: 0,
    explanation:
      'Pairing a beginning teacher with an experienced colleague for observation, feedback and modelling is mentoring or induction, and the principal\u2019s note that it is not an inspection is the defining feature. Clinical supervision involves evaluation against criteria. A performance rating is a scored judgement. Peer tutoring implies equal experience, whereas the arrangement is explicitly asymmetric.',
    rationale: 'Identifying mentoring or induction by its supportive rather than evaluative purpose.',
    source: 'Professional development and mentoring; PRC ProfEd TOS area A (15%)',
  },
  {
    id: 'pe-031',
    subjectId: 'profed',
    topicId: 'profed-teaching-profession',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher attends a two-day seminar on using formative assessment. She
      returns and reports that the seminar was well organised, the speakers were
      clear, and she enjoyed the company of other teachers. Her principal asks
      what she will actually do differently on Monday, and she cannot answer.
    `),
    prompt: 'What is the principal identifying?',
    options: [
      'That the teacher has gained awareness and possibly interest, but not yet the observable practice change that would show transfer.',
      'That the teacher learned nothing from the seminar.',
      'That the teacher has already fully transferred the learning into her classroom.',
      'That the principal should not expect classroom change from a seminar.',
    ],
    correctIndex: 0,
    explanation:
      'She can describe the experience and her enjoyment, which is awareness and attitude, but she cannot name a change in practice, which is the transfer that matters. Nothing suggests she learned nothing. Nor is there evidence of change, so full transfer cannot be claimed. Expecting classroom change from professional development is entirely reasonable.',
    rationale: 'Distinguishing awareness, interest and demonstrated practice change in professional learning.',
    source: 'Professional development; PRC ProfEd TOS area A (15%)',
  },
  {
    id: 'pe-032',
    subjectId: 'profed',
    topicId: 'profed-teaching-profession',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher keeps a reflective diary, and at the end of each lesson writes three
      lines: what she intended, what actually happened, and what she will change.
      After two terms she rereads the entries and notices that the same problem
      appears repeatedly \u2014 that she runs out of time before the closing activity.
      She adjusts her timing.
    `),
    prompt: 'What is the teacher doing, and what has she acquired?',
    options: [
      'She is keeping a reflective diary and has acquired reflective practice, a basic skill in which self-observation becomes a basis for future action.',
      'She is keeping an action research log and has acquired a research cycle.',
      'She is keeping a portfolio and has acquired reflective practice.',
      'She is keeping a gradebook and has acquired reflective practice.',
    ],
    correctIndex: 0,
    explanation:
      'Recording what she intended against what happened and converting that into a specific change is reflective practice, and the repeated problem she identifies is exactly the insight reflection produces. A reflective diary is not action research, which needs a method and recorded data. A portfolio assembles evidence of work and growth rather than a lesson-by-lesson log. A gradebook records scores.',
    rationale: 'Identifying reflective practice from a self-observation log that changes future action.',
    source: 'Reflective teaching practice; PRC ProfEd TOS area A (15%)',
  },
  {
    id: 'pe-033',
    subjectId: 'profed',
    topicId: 'profed-teaching-profession',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A school has introduced a teaching method that requires every lesson to
      follow the same fixed sequence, with no room for the teacher to adapt it to
      her learners. She is enthusiastic about the consistency it brings. A
      colleague asks her what happens to a learner for whom the method does not
      work.
    `),
    prompt: 'What is the colleague questioning?',
    options: [
      'Whether a method that cannot be adapted to individual learners serves them all equally.',
      'Whether teachers should be allowed to use methods their colleagues find unconvincing.',
      'Whether consistency across a school is more valuable than professional autonomy.',
      'Whether the method is academically sound.',
    ],
    correctIndex: 0,
    explanation:
      'The colleague is raising whether a method with no adaptation point actually fits every learner, which is a question about learner outcomes and differentiation. Teachers may use methods their colleagues dislike; that is not at issue. Consistency versus autonomy is a real debate, but the colleague is asking something narrower. And nothing suggests the method is unsound.',
    rationale: 'Identifying the differentiation question hidden beneath a method-adoption discussion.',
    source: 'Philippine Professional Standards for Teachers; PRC ProfEd TOS area A (15%)',
  },
  {
    id: 'pe-034',
    subjectId: 'profed',
    topicId: 'profed-teaching-profession',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher has been asked to take on a class she has not taught before, three
      months into the year. She asks the head teacher for the class profile and the
      previous records and gets neither, and is told to just start teaching. She is
      determined to assess the learners in her first week to find out what they know.
    `),
    prompt: 'What is the most defensible reason for her plan?',
    options: [
      'Without records, an early assessment substitutes for the missing history and establishes where the learners actually are.',
      'Early assessment is required by the professional standards for every teacher in every class.',
      'Early assessment is a formality that satisfies the head teacher\u2019s expectation of proper procedure.',
      'Early assessment lets the teacher identify learners who should be transferred to another class.',
    ],
    correctIndex: 0,
    explanation:
      'With no class profile and no records, the only way to know what learners know is to measure it, which is precisely what an early diagnostic does. The standards do not mandate an assessment in every class in the first week. It is not a formality, since the teacher\u2019s own reasoning is that she needs the data. And nothing in the plan concerns transfers.',
    rationale: 'Justifying early assessment as a substitute for missing records rather than as a requirement.',
    source: 'Assessment of learning; PRC ProfEd TOS area D (15%)',
  },
  {
    id: 'pe-035',
    subjectId: 'profed',
    topicId: 'profed-teaching-profession',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher prepares a lesson and, on reflection, decides that the opening
      activity will take ten minutes longer than she planned. She cuts it short and
      removes the example she had planned to model, keeping the explanation she had
      reasoned was essential. A colleague asks why she abandoned her own plan.
    `),
    prompt: 'What is the teacher demonstrating?',
    options: [
      'Flexibility in following the plan, which is a deliberate professional judgement about what matters in the moment.',
      'Lack of preparation, because a well-prepared lesson should not need adjusting.',
      'Irresponsibility, because a teacher should not deviate from an approved plan.',
      'Weak classroom management, because the activity ran longer than it should have.',
    ],
    correctIndex: 0,
    explanation:
      'Flexibility is an explicit professional quality: a plan is a judgement made in advance, and the teacher revised it while preserving the element she judged essential. A well-prepared lesson can still meet an unexpected turn. Deviating is not irresponsible when the deviation serves the objective, and running an activity long says nothing about classroom management.',
    rationale: 'Recognising professional flexibility rather than treating deviation as failure.',
    source: 'Philippine Professional Standards for Teachers; PRC ProfEd TOS area A (15%)',
  },
  {
    id: 'pe-036',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher gives learners a task and asks them to think about it silently for
      two minutes before anyone speaks. She then pairs them to compare answers,
      then has the pairs report to the class. She explains that the silent thinking
      matters as much as the talking, because a learner who commits to an answer
      first is more willing to defend or revise it.
    `),
    prompt: 'Why does the teacher insist on the silent thinking?',
    options: [
      'Because thinking alone before discussion makes every learner contribute, instead of only the confident few.',
      'Because silent work is faster and leaves more time for discussion.',
      'Because group discussion is less effective than individual work in any lesson.',
      'Because learners should not be asked to explain their reasoning to peers.',
    ],
    correctIndex: 0,
    explanation:
      'Where the confident answer first, the rest of the group tends to defer. Committing to an answer privately first means every learner has a position to contribute or revise, which is the point of think-pair-share. Speed is a side benefit, not the reason. Discussion is not inferior to individual work \u2014 the two are combined here \u2014 and having learners explain reasoning to peers is exactly what the paired stage is for.',
    rationale: 'Explaining think-pair-share by its effect on participation, not on efficiency.',
    source: 'Active learning strategies; PRC ProfEd TOS area B (30%)',
  },
  {
    id: 'pe-037',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is teaching a procedure and demonstrates it while narrating each
      step aloud. She then has a learner repeat the narration while performing it,
      then a pair works through it together, and finally each learner does it
      alone. She explains that the same material is present at every stage, only
      the support is being withdrawn.
    `),
    prompt: 'What is the teacher doing?',
    options: [
      'Fading, in which support is gradually withdrawn while the task stays constant.',
      'Scaffolding, in which support is added as the learner becomes able to work independently.',
      'Chunking, in which the material is divided into small sequential parts.',
      'Mastery learning, in which learners proceed only after reaching a criterion.',
    ],
    correctIndex: 0,
    explanation:
      'The defining feature is that the task never changes while support is progressively removed \u2014 model, guided practice, paired practice, independent. Scaffolding refers to support that is added and then removed, but what she describes is specifically the removal. Chunking concerns size, not support. And no criterion is being tested.',
    rationale: 'Identifying fading by withdrawal of support while the task stays constant.',
    source: 'Scaffolding and fading in instruction; PRC ProfEd TOS area B (30%)',
  },
  {
    id: 'pe-038',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is planning for a class of fifty-eight learners with wide
      differences in reading level. She prepares three versions of the same task at
      three levels of complexity, groups learners by what they can currently
      manage, and plans to move them between groups as they progress.
    `),
    prompt: 'What is the teacher doing?',
    options: [
      'Grouping learners by level and adjusting the task, which is differentiated instruction.',
      'Tracking learners permanently by ability, which is differentiated instruction.',
      'Grouping learners randomly, which is differentiated instruction.',
      'Teaching the whole class the same task and letting learners struggle, which is differentiated instruction.',
    ],
    correctIndex: 0,
    explanation:
      'Same objective, three task complexities, groups based on current performance, and movement between groups is differentiation by task, and the intention to move learners keeps it from becoming fixed tracking. Permanent ability grouping is tracking. Random grouping would not match tasks to readiness. Giving everyone an identical task they will struggle with is the opposite of differentiation.',
    rationale: 'Distinguishing flexible level-grouping from permanent tracking and from uniform tasks.',
    source: 'Differentiation; PRC ProfEd TOS areas B and C (30%, 20%)',
  },
  {
    id: 'pe-039',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher asks learners to write their own name at the top of a page and
      describe who they are and who they would like to be. She then asks them to
      share only with a partner. She explains that some learners do not want to
      discuss their identity publicly, and that the written and paired format
      gives them a way to participate without exposure.
    `),
    prompt: 'What is the teacher protecting?',
    options: [
      'The learners\u2019 right to participate without being compelled to disclose personal information publicly.',
      'The learners\u2019 right to keep their writing private from the teacher.',
      'The learners\u2019 right to be assessed individually rather than in pairs.',
      'The learners\u2019 right to change what they have written before submitting.',
    ],
    correctIndex: 0,
    explanation:
      'The written-then-paired format lets every learner take part without being put on the spot about identity in front of the class, which is a real constraint some learners have. Writing is not concealed from the teacher. Paired work is still a form of assessment contact, and the design is about participation format. Nothing concerns editing before submission.',
    rationale: 'Identifying participation without compulsory public disclosure as the protected interest.',
    source: 'Learner rights and safe learning environments; PRC ProfEd TOS area C (20%)',
  },
  {
    id: 'pe-040',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is told that a learner has said something indicating she has been
      harmed at home. The teacher considers reporting it and asks a colleague what
      she should do. The colleague says the law requires a teacher to report such
      a suspicion, and that she may not simply ask the learner about it and then
      say nothing.
    `),
    prompt: 'What is the colleague describing?',
    options: [
      'A mandatory reporting duty, under which a teacher who has reason to believe a child is abused must report it to the proper authority.',
      'A discretionary duty, under which a teacher may report suspected abuse if she judges it appropriate.',
      'A confidentiality duty, under which the teacher may not disclose what a learner has told her.',
      'An assessment duty, under which the teacher must first confirm the abuse before reporting it.',
    ],
    correctIndex: 0,
    explanation:
      'Child protection law makes reporting mandatory once a teacher has reason to believe a child has been subjected to abuse \u2014 triggered by the belief, not by proof. That is why her colleague says she cannot simply ask and then stay silent. The duty is not discretionary. And she is not required to investigate or confirm it herself.',
    rationale: 'Identifying mandatory reporting as triggered by reasonable belief rather than proof.',
    source: 'RA 7610; RA 9262; RA 10931; PRC ProfEd TOS area C (20%)',
  },
  {
    id: 'pe-041',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher has a class with a wide range of reading levels. She asks whether
      she should give each learner a different book from the same list, or one
      common book for everyone and extra support where needed. She explains that
      both approaches exist and that her decision depends on what she is trying
      to achieve.
    `),
    prompt: 'What is the most accurate way to state the trade-off?',
    options: [
      'Different books match reading level but reduce the shared text for discussion; a common book creates shared reference points but risks frustrating learners below level.',
      'Different books are always superior because they respect each learner\u2019s level.',
      'A common book is always superior because it guarantees the same learning for everyone.',
      'Neither approach matters, since reading level has no effect on comprehension.',
    ],
    correctIndex: 0,
    explanation:
      'Both are legitimate and each costs something: differentiated texts match level but remove the common reference points that make discussion possible, while a common text preserves those but may sit above some learners. Neither is categorically better, which is why her decision depends on her purpose. Reading level plainly affects comprehension.',
    rationale: 'Stating the differentiated-versus-common-text trade-off without a false absolute.',
    source: 'Reading instruction; PRC ProfEd TOS areas B and C (30%, 20%)',
  },
  {
    id: 'pe-042',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher has been teaching for twenty-six years. She knows that when she
      asks a question, three learners will answer, four more will not try, and the
      rest will disengage. She has started inviting responses by name at random, and
      she notices that some learners she has never heard speak in class can explain
      the idea well when asked directly.
    `),
    prompt: 'What does the teacher describe?',
    options: [
      'The effect of recitation, in which a small number of learners dominate and many never participate.',
      'The effect of the halo effect, in which a first impression colours later judgement.',
      'The effect of social loafing, in which individuals reduce effort in a group.',
      'The effect of the Pygmalion effect, in which expectations alter performance.',
    ],
    correctIndex: 0,
    explanation:
      'That a few learners answer, some do not try, and the rest disengage is the standard description of recitation\u2019s effect. Naming volunteers also favours the confident, which is why she finds unexpected ability when she asks randomly. The halo effect is about one trait colouring judgement, social loafing is about reduced effort in groups, and Pygmalion concerns teacher expectations \u2014 none is about who volunteers.',
    rationale: 'Identifying recitation\u2019s participation bias from who volunteers to answer.',
    source: 'Classroom discussion and questioning; PRC ProfEd TOS area B (30%)',
  },
  {
    id: 'pe-043',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is asked how she knows her learners understand a concept. She
      says she cannot be certain, but she can ask them to apply the idea to a
      situation she did not present, and if they can, the concept is likely to be
      secure rather than merely familiar. She explains that a learner can repeat
      her explanation accurately without ever having understood it.
    `),
    prompt: 'What principle is the teacher describing?',
    options: [
      'That understanding is best evidenced by applying an idea in a new situation, not by reproducing it.',
      'That learners should never be asked to explain a concept in their own words.',
      'That accurate reproduction demonstrates that understanding is secure.',
      'That application in a new situation is too demanding to use as evidence.',
    ],
    correctIndex: 0,
    explanation:
      'The teacher is distinguishing knowing from understanding: a learner can reproduce her wording and still not have grasped the idea, while transferring it to an unpresented situation is strong evidence of genuine grasp. Nothing here discourages asking learners to explain. The reading that reproduction proves understanding inverts her argument. And transfer is demanding, which is why it is informative.',
    rationale: 'Distinguishing reproduction from transfer as evidence of understanding.',
    source: 'Assessment of learning; PRC ProfEd TOS areas B and D (30%, 15%)',
  },
  {
    id: 'pe-044',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher explains a lesson using a diagram on the board. Later she notices
      that several learners drew exactly the same diagram in their notebooks,
      including the same arrangement and the same labels, and that they have not
      drawn anything of their own. She concludes something about the task.
    `),
    prompt: 'What is the most reasonable conclusion?',
    options: [
      'The copying suggests the learners engaged with reproducing the visual rather than with the reasoning behind it.',
      'The copying proves the learners do not understand the concept at all.',
      'The copying is normal note-taking and carries no implication for learning.',
      'The copying shows the diagram was a poor teaching choice and should not be used again.',
    ],
    correctIndex: 0,
    explanation:
      'Faithful copying without adding anything points to reproduction as the activity, which is a weaker form of engagement than reconstructing the idea. It does not prove absence of understanding. Note-taking is normal, so that reading ignores what the identical copying signals. And the diagram was not necessarily poor \u2014 the issue is what learners were asked to do with it.',
    rationale: 'Reading identical copying as evidence about the task, not about the learners or the medium.',
    source: 'Assessment of learning; PRC ProfEd TOS area D (15%)',
  },
  {
    id: 'pe-045',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A learner who has never volunteered is given the role of reporting her
      group\u2019s findings. She produces a report that is clearly not her own work
      and is more fluent than anything she has said all term. The teacher confronts
      her and she says she did not want to be looked at in front of everyone and
      that her group did it for her.
    `),
    prompt: 'What does this situation suggest, and what is the appropriate response?',
    options: [
      'It suggests social anxiety and a need for a lower-visibility contribution; the response is a private conversation and a role that does not require public speaking.',
      'It suggests deliberate dishonesty, and the response is to report her for academic misconduct.',
      'It suggests she is not capable of contributing at all, and the response is to remove her from group work.',
      'It suggests the group was correct to help her, and the response is to accept the report as the group\u2019s work.',
    ],
    correctIndex: 0,
    explanation:
      'A jump to fluency she has never displayed, combined with a stated fear of public attention, points to social anxiety that made the visible role untenable. The proportionate response is a private conversation and a role she can genuinely do. That is not the same as declaring misconduct: nothing suggests she intended to deceive. Equally, the work cannot simply be accepted as the group\u2019s when she is accountable for her own contribution.',
    rationale: 'Separating anxiety-driven non-performance from dishonesty and choosing a proportionate response.',
    source: 'Learner development and inclusive teaching; PRC ProfEd TOS area C (20%)',
  },
  {
    id: 'pe-046',
    subjectId: 'profed',
    topicId: 'profed-assessment',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher wants to know whether her learners can apply a concept rather than
      recall it. She prepares a task in which each learner is given an unfamiliar
      problem, and there is no single correct answer \u2014 several defensible answers
      exist. She scores the response against stated criteria rather than against
      one answer.
    `),
    prompt: 'What kind of assessment is this, and why?',
    options: [
      'An authentic assessment, which asks learners to perform a real task and is scored against criteria rather than one right answer.',
      'A diagnostic assessment, which identifies what learners already know before instruction.',
      'A summative assessment, which judges achievement after instruction for grading.',
      'A norm-referenced assessment, which ranks learners against each other.',
    ],
    correctIndex: 0,
    explanation:
      'A realistic task with no single right answer, scored against stated criteria, is an authentic assessment. Diagnostic assessment precedes instruction. Summative assessment is graded and comes after instruction, whereas what distinguishes this is criterion-based scoring of a real task, not its timing. And criterion-referenced scoring is the opposite of norm-referenced ranking.',
    rationale: 'Identifying an authentic assessment from its criterion-based scoring of a real task.',
    source: 'Assessment of learning; PRC ProfEd TOS area D (15%)',
  },
  {
    id: 'pe-047',
    subjectId: 'profed',
    topicId: 'profed-assessment',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher has two assessments that both produce a number. One shows how a
      learner compares with the rest of the class; the other shows whether a learner
      has met the learning outcomes. A colleague observes that a learner can score
      well on the first and poorly on the second, and asks which is the better
      assessment.
    `),
    prompt: 'What does the colleague describe?',
    options: [
      'The difference between norm-referenced and criterion-referenced assessment, which compare learners with each other and with objectives respectively.',
      'The difference between formative and summative assessment.',
      'The difference between reliability and validity.',
      'The difference between objective and subjective assessment.',
    ],
    correctIndex: 0,
    explanation:
      'Comparing a learner with the rest of the class is norm-referenced; comparing a learner with the stated objectives is criterion-referenced, and the two can diverge. Neither tells you when the assessment occurs, which is what formative and summative distinguish. Reliability is consistency and validity is whether it measures what matters. Both can be objective or subjective.',
    rationale: 'Distinguishing what an assessment is compared against from when it occurs.',
    source: 'Assessment of learning; PRC ProfEd TOS area D (15%)',
  },
  {
    id: 'pe-048',
    subjectId: 'profed',
    topicId: 'profed-assessment',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is concerned about a learner who is always at the top of the class
      and one who is always at the bottom. She asks whether the test is measuring
      the learners or measuring something about them that has nothing to do with
      the subject. She explains that a test can be perfectly consistent and still
      be measuring the wrong thing.
    `),
    prompt: 'What distinction is the teacher drawing?',
    options: [
      'Reliability is consistency of measurement; validity is whether the test measures what it is intended to measure.',
      'Reliability measures difficulty; validity measures consistency.',
      'Reliability concerns speed of administration; validity concerns length.',
      'Reliability and validity are the same property under two names.',
    ],
    correctIndex: 0,
    explanation:
      'A test can give the same result on every administration and still measure something other than what it claims \u2014 consistency without meaning, which is exactly the situation she describes. A valid test is usually built on a reliable one. Difficulty is a property of an item. Speed and length affect practicality. And they are not synonyms.',
    rationale: 'Distinguishing reliability as consistency from validity as measuring the intended construct.',
    source: 'Assessment of learning; PRC ProfEd TOS area D (15%)',
  },
  {
    id: 'pe-049',
    subjectId: 'profed',
    topicId: 'profed-assessment',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher gives a test that every learner passes easily, and she plans to use
      the results to decide whether to move on or to reteach. She is troubled
      because a test that everyone passes tells her nothing about who has grasped
      the material and who has merely recognised it.
    `),
    prompt: 'What should she conclude about using this test for her decision?',
    options: [
      'The test lacks the difficulty to discriminate between learners, so it cannot support a decision about who needs reteaching.',
      'The test is reliable, so it supports the decision perfectly well.',
      'The test is invalid, so it should be discarded entirely.',
      'The test should be graded more strictly, which will make it discriminate.',
    ],
    correctIndex: 0,
    explanation:
      'When every learner passes, the test cannot separate those who have grasped the material from those who have not, which makes it useless for her stated purpose even though it is perfectly reliable. Reliability alone never made it fit. The problem is difficulty, not validity. And stricter grading does not create discrimination.',
    rationale: 'Recognising that an easy reliable test cannot support a decision requiring discrimination.',
    source: 'Item analysis; PRC ProfEd TOS area D (15%)',
  },
  {
    id: 'pe-050',
    subjectId: 'profed',
    topicId: 'profed-field-study',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student teacher asks her adviser how she should evaluate a lesson she has
      taught. The adviser recommends two independent observers, each recording
      what happened, and then notes that if the two records disagree substantially
      she will need to know why. She adds that agreement between observers is not
      the goal in itself.
    `),
    prompt: 'What does the adviser mean by agreement between observers?',
    options: [
      'Agreement indicates the record is trustworthy as a measure, but high agreement can also mean the observers are not noticing anything that distinguishes the lesson.',
      'Agreement is the goal and should be maximised at all costs.',
      'Agreement between observers indicates that the lesson was successful.',
      'Agreement between observers shows that the observers were both correct.',
    ],
    correctIndex: 0,
    explanation:
      'Inter-rater agreement is evidence that the instrument produces a dependable measure rather than one observer\u2019s impression \u2014 but two observers can agree closely on a record that distinguishes nothing, so high agreement can indicate a measure too coarse to be useful. It is evidence, not an end. Agreement says nothing about whether the lesson succeeded, and it does not establish that either observer was correct.',
    rationale: 'Reading inter-rater agreement as evidence of a trustworthy measure, not as a goal.',
    source: 'Research methodology; PRC ProfEd TOS area E (20%)',
  },
];

export default BATCH_PROFED_3;
