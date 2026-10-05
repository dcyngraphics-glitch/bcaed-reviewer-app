import type { QuestionDraft } from '../pipeline';

/**
 * AI-drafted questions awaiting admin review.
 *
 * NOTHING HERE IS VISIBLE TO A STUDENT. Every item converts to
 * `status: 'pending'` through `draftToQuestion`, and the engine's `eligible()`
 * only ever returns approved questions — so a draft cannot reach practice or an
 * exam until a human moves it out of this file.
 *
 * Why these particular items: a probe of the live bank showed a 60-item mock
 * needs 14 easy-situational and 24 moderate-situational items, and the bank had
 * 0 and 3. That is why the mock could only reach 13/60 situational against an
 * 80% target. This batch targets that gap directly.
 *
 * Every fact is cited. Sources:
 *  - DepEd Order No. 42, s. 2017 (PPST): 7 domains, 37 strands
 *  - RA 10533 (Enhanced Basic Education Act of 2013)
 *  - DepEd Mother Tongue Curriculum Guide (MTB-MLE, two-track method)
 *  - NCCA, Order of National Artists; Gawad sa Manlilikha ng Bayan
 *  - PRC Board for Professional Teachers Resolution No. 11, s. 2025
 *  - RA 1425 (Rizal Law); RA 9155; RA 7836; RA 4670
 *  - Philippine folk dance and music literature
 */

const V = (text: string) => text.trim();

export const DRAFT_QUESTIONS: readonly QuestionDraft[] = [
  // ==================================================================
  // EASY SITUATIONAL — the biggest gap (0 in the bank, 14 needed)
  // ==================================================================
  {
    id: 'draft-es-001',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 1 teacher in Aklan begins the school year by teaching all her
      lessons in Akeanon, the language her learners speak at home. She does not
      begin with English. Her principal explains that this is deliberate: the
      K to 12 programme requires the learner's mother tongue to be the medium of
      instruction in the early grades, because a child learns to read more
      easily in a language they already speak. English and Filipino are
      introduced later, through a language bridge programme, once literacy in
      the first language is established.
    `),
    prompt: 'Which DepEd programme is the teacher implementing?',
    options: [
      'The teacher is implementing the Mother Tongue-Based Multilingual Education programme, which uses the learner\u2019s first language as the medium of instruction in the early grades.',
      'The teacher is implementing the Special Program in Foreign Language, which introduces a second language to learners at an early age.',
      'The teacher is implementing the Alternative Learning System, which delivers basic education outside the formal school setting.',
      'The teacher is implementing the Madrasah Education Program, which uses Arabic as the language of instruction.',
    ],
    correctIndex: 0,
    explanation:
      'Mother Tongue-Based Multilingual Education (MTB-MLE) is the DepEd programme that uses the learner\u2019s mother tongue as the medium of instruction and as the foundation for literacy in the early grades, with Filipino and English introduced gradually through a language bridge. It is a distinct feature of the K to 12 programme under RA 10533. The Special Program in Foreign Language teaches an additional foreign language, the Alternative Learning System serves learners outside formal schooling, and the Madrasah Education Program is for Muslim learners.',
    rationale:
      'Recognising MTB-MLE from a described classroom practice, and distinguishing it from the other named DepEd programmes.',
    source: 'DepEd Mother Tongue Curriculum Guide (MTB-MLE); RA 10533',
  },
  {
    id: 'draft-es-002',
    subjectId: 'profed',
    topicId: 'profed-curriculum',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A science teacher notices that her Grade 7 class is studying the water
      cycle, a topic they also met in Grade 4. In Grade 4 they learned to name
      the stages. In Grade 7 they are asked to explain how human activity
      changes the cycle, and to predict the effect of deforestation on local
      rainfall. The teacher explains to a parent that this is intentional: the
      same topic is revisited at increasing levels of complexity across grade
      levels, so that understanding deepens rather than being learned once and
      left behind.
    `),
    prompt: 'Which curriculum approach is the teacher describing?',
    options: [
      'The teacher is describing the spiral progression approach, in which concepts are introduced early and revisited at increasing depth in succeeding grade levels.',
      'The teacher is describing the decongested curriculum, in which topics are removed to reduce the number of competencies learners must master.',
      'The teacher is describing the contextualised curriculum, in which content is adapted to the local environment and culture of the learners.',
      'The teacher is describing the differentiated curriculum, in which different learners study different content according to their ability.',
    ],
    correctIndex: 0,
    explanation:
      'Spiral progression is the K to 12 principle that concepts are introduced at an early age and deepened in succeeding years, so learners revisit a topic several times across their schooling at rising levels of complexity. The water cycle appearing in Grade 4 as naming and in Grade 7 as analysis and prediction is exactly that pattern. Decongestion is about reducing content, contextualisation is about adapting content to local context, and differentiation is about varying content by learner — none of which describes revisiting a topic at greater depth.',
    rationale:
      'Recognising spiral progression from a described sequence of lessons, and distinguishing it from three other curriculum principles.',
    source: 'RA 10533; DepEd Order No. 21, s. 2019 (K to 12 curriculum principles)',
  },
  {
    id: 'draft-es-003',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher shows her class a photograph of a dance in which two people hold
      two long bamboo poles and clap them together against the ground while a
      dancer steps in and out between them. She tells the class the dance comes
      from Leyte and that its name comes from a bird that hops among grass
      stems, which the dancer's footwork imitates. She asks the class to name
      the dance.
    `),
    prompt: 'Which dance is the teacher describing?',
    options: [
      'The dance being described is the Tinikling, a Leyte folk dance in which dancers step between bamboo poles clapped on the ground.',
      'The dance being described is the Singkil, a Maranao royal dance drawn from the Darangen epic.',
      'The dance being described is the Pandanggo sa Ilaw, in which dancers balance lighted lamps.',
      'The dance being described is the Itik-itik, which imitates the movements of a duck.',
    ],
    correctIndex: 0,
    explanation:
      'Tinikling is from Leyte and takes its name from the tikling bird, whose movement among grass stems the dancers imitate by stepping in and out between two bamboo poles clapped on the ground. Singkil also uses bamboo poles but is a Maranao royal dance from the Darangen. Pandanggo sa Ilaw involves balancing lamps, and Itik-itik imitates a duck rather than a bird stepping among stems.',
    rationale:
      'Identifying a folk dance from its prop, its region and the origin of its name.',
    source: 'Philippine folk dance literature; PRC CAE TOS — Disciplinal Knowledge',
  },
  {
    id: 'draft-es-004',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is preparing a display for Buwan ng Wika. She wants to show the
      class an example of a Filipino love song that is traditionally sung in
      triple metre and is often described as a song of devotion or longing. She
      chooses a recording and asks the class to clap the beat so they can feel
      the three-beat pattern before she names the form.
    `),
    prompt: 'Which vocal form is the teacher presenting?',
    options: [
      'The teacher is presenting a kundiman, a Filipino love song traditionally set in triple metre.',
      'The teacher is presenting a harana, a serenade sung beneath a woman\u2019s window.',
      'The teacher is presenting a balagtasan, a formal poetic debate.',
      'The teacher is presenting a kumintang, a war song of the Katipunan.',
    ],
    correctIndex: 0,
    explanation:
      'The kundiman is a Filipino art song of devotion and longing, traditionally in 3/4 time, which is why the teacher has the class clap the three-beat pattern. A harana is also a courtship song but is defined by being sung outside a woman\u2019s window rather than by its metre. A balagtasan is a poetic debate, and a kumintang is associated with the revolutionary period.',
    rationale:
      'Matching a described vocal form to its name using metre and function as the distinguishing features.',
    source: 'Philippine music literature; PRC CAE TOS — Disciplinal Knowledge',
  },
  {
    id: 'draft-es-005',
    subjectId: 'cae',
    topicId: 'cae-creative',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher gives each learner a sheet of paper and asks them to draw a
      picture using only straight lines. One learner draws a house with a square
      body and a triangle roof. Another draws a face made of rectangles. The
      teacher then asks the class which element of art they have been using, and
      explains that this element can be horizontal, vertical or diagonal, and
      that it can suggest calm or movement depending on its direction.
    `),
    prompt: 'Which element of art is the teacher teaching?',
    options: [
      'The element being taught is line, which can run horizontally, vertically or diagonally and can suggest calm or movement.',
      'The element being taught is shape, which is a two-dimensional area enclosed by a boundary.',
      'The element being taught is form, which is a three-dimensional object with volume.',
      'The element being taught is texture, which is the surface quality of an object.',
    ],
    correctIndex: 0,
    explanation:
      'Line is the element of art that describes a mark with length and direction, and its orientation carries meaning — horizontal lines tend to suggest calm, diagonals movement. The teacher\u2019s instruction to use only straight lines, and her explanation of direction, identify line specifically. Shape is the enclosed two-dimensional area the lines create, form is three-dimensional, and texture is surface quality.',
    rationale:
      'Identifying an element of art from a described drawing task and the teacher\u2019s own explanation of its properties.',
    source: 'Elements of art; PRC CAE TOS — Creative Expressions',
  },
  {
    id: 'draft-es-006',
    subjectId: 'cae',
    topicId: 'cae-accountability',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is reviewing the laws that govern her profession. She notes that
      one law created the licensure requirement for teachers and placed it under
      the Professional Regulation Commission, and that a different law sets out
      the rights and privileges of public school teachers, including their
      working hours and leave entitlements. She wants to cite the correct law
      when she explains the licensure requirement to a student teacher.
    `),
    prompt: 'Which law created the licensure requirement for teachers?',
    options: [
      'The licensure requirement was created by RA 7836, the Philippine Teachers Professionalization Act of 1994.',
      'The licensure requirement was created by RA 4670, the Magna Carta for Public School Teachers.',
      'The licensure requirement was created by RA 9155, the Governance of Basic Education Act of 2001.',
      'The licensure requirement was created by RA 10533, the Enhanced Basic Education Act of 2013.',
    ],
    correctIndex: 0,
    explanation:
      'RA 7836, the Philippine Teachers Professionalization Act of 1994, professionalised teaching and placed teacher licensure under the Professional Regulation Commission through the Board for Professional Teachers. RA 4670 sets out the rights and privileges of public school teachers, which is the second law the teacher described. RA 9155 governs basic education, and RA 10533 established the K to 12 programme.',
    rationale:
      'Attributing the teacher licensure requirement to the correct statute, and separating it from the Magna Carta.',
    source: 'Republic Act 7836; PRC CAE TOS — Professional Accountability',
  },
  {
    id: 'draft-es-007',
    subjectId: 'profed',
    topicId: 'profed-assessment',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher finishes a unit on the elements of art and gives her class a
      twenty-item test. She marks the tests, records the scores in her
      gradebook, and uses them as part of the learners' grades for the quarter.
      She then moves on to the next unit. A colleague asks her what kind of
      assessment she has just conducted.
    `),
    prompt: 'What kind of assessment did the teacher conduct?',
    options: [
      'The teacher conducted summative assessment, which judges achievement after instruction and contributes to the learner\u2019s grade.',
      'The teacher conducted formative assessment, which guides teaching while instruction is still in progress.',
      'The teacher conducted diagnostic assessment, which identifies what learners already know before instruction begins.',
      'The teacher conducted placement assessment, which decides the level at which a learner should begin.',
    ],
    correctIndex: 0,
    explanation:
      'Summative assessment comes after instruction, judges achievement against the learning outcomes, and is recorded as part of the grade — which is what the teacher did. Formative assessment happens during instruction and is used to adjust teaching rather than to grade. Diagnostic assessment happens before instruction to identify prior knowledge, and placement assessment decides a starting level.',
    rationale:
      'Classifying an assessment by when it occurs and whether it is graded.',
    source: 'Assessment of learning; PRC ProfEd TOS area D (15%)',
  },
  {
    id: 'draft-es-008',
    subjectId: 'profed',
    topicId: 'profed-teaching-profession',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A school holds a general assembly at the start of the year. The principal
      reminds the staff that the school is a place where learners are safe, that
      every learner is treated fairly regardless of background, and that
      teachers are expected to conduct themselves according to a shared set of
      professional expectations. She tells the teachers that these expectations
      are set out in a document that also describes what teachers should know
      and be able to do at each stage of their career.
    `),
    prompt: 'Which document is the principal referring to?',
    options: [
      'The principal is referring to the Philippine Professional Standards for Teachers, which sets out what teachers should know and be able to do at each career stage.',
      'The principal is referring to the Magna Carta for Public School Teachers, which sets out teachers\u2019 rights and privileges.',
      'The principal is referring to the Enhanced Basic Education Act, which establishes the K to 12 programme.',
      'The principal is referring to the Table of Specifications, which sets out the coverage of the licensure examination.',
    ],
    correctIndex: 0,
    explanation:
      'The Philippine Professional Standards for Teachers (PPST), issued through DepEd Order No. 42, s. 2017, defines teacher quality across seven domains and 37 strands, and describes what teachers should know, value and be able to do at each of the four career stages. The Magna Carta covers rights and privileges, the Enhanced Basic Education Act establishes K to 12, and the Table of Specifications describes licensure exam coverage.',
    rationale:
      'Identifying the PPST from its purpose — describing teacher quality across career stages.',
    source: 'DepEd Order No. 42, s. 2017 (PPST); PRC ProfEd TOS area A (15%)',
  },
  {
    id: 'draft-es-009',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 2 learner is shown two rows of five coins. The coins in the second
      row are spread further apart than those in the first. When asked which row
      has more coins, the learner says the second row does, because it is
      longer. The teacher notes that the learner is focusing on only one
      dimension of the display — its length — and is ignoring the number of
      coins.
    `),
    prompt: 'Which cognitive limitation is the learner demonstrating?',
    options: [
      'The learner is demonstrating centration, the tendency to focus on a single dimension of a situation and ignore the others.',
      'The learner is demonstrating object permanence, the understanding that objects continue to exist when out of sight.',
      'The learner is demonstrating conservation, the understanding that quantity does not change with appearance.',
      'The learner is demonstrating seriation, the ability to arrange objects in order by size.',
    ],
    correctIndex: 0,
    explanation:
      'Centration is the preoperational tendency to focus on one dimension of a situation while ignoring others, which is why the learner attends to the length of the row and not the number of coins. This is the same limitation that produces the classic failure of conservation tasks. Object permanence is achieved much earlier, conservation is the understanding the learner has not yet reached, and seriation is ordering by size.',
    rationale:
      'Naming the specific preoperational limitation from a described task, rather than the broader failure it produces.',
    source: 'Jean Piaget, cognitive development theory; PRC ProfEd TOS area C (20%)',
  },
  {
    id: 'draft-es-010',
    subjectId: 'gened',
    topicId: 'gened-science',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher boils water in a kettle. She holds a cold metal spoon above the
      spout and shows the class that water droplets form on the spoon and begin
      to drip. She then asks the class to name the change that turned the
      invisible water vapour into liquid droplets on the cold surface.
    `),
    prompt: 'Which process is the teacher demonstrating?',
    options: [
      'The teacher is demonstrating condensation, the change of water vapour into liquid when it meets a cooler surface.',
      'The teacher is demonstrating evaporation, the change of liquid water into vapour when heated.',
      'The teacher is demonstrating sublimation, the change of a solid directly into a gas.',
      'The teacher is demonstrating precipitation, the falling of water from clouds to the ground.',
    ],
    correctIndex: 0,
    explanation:
      'Condensation is the change of water vapour into liquid water, and it happens when vapour meets a surface cooler than its dew point — which is why droplets form on the cold spoon. Evaporation is the reverse change, from liquid to vapour, and is what happened in the kettle. Sublimation is solid to gas, and precipitation is rain or snow falling from clouds.',
    rationale:
      'Naming the phase change from the direction of the change and the role of the cold surface.',
    source: 'General science; PRC GenEd TOS — Science and Technology',
  },
  {
    id: 'draft-es-011',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher writes a list of numbers on the board: 3, 6, 9, 12. She asks the
      class what number comes next. A learner answers 15 and explains that each
      number is three more than the one before it. The teacher asks the class to
      describe the rule they used to work out the next number.
    `),
    prompt: 'Which kind of reasoning did the learner use?',
    options: [
      'The learner used inductive reasoning, working out a general rule from the pattern in the given numbers.',
      'The learner used deductive reasoning, applying a general rule that was given in advance to reach a specific answer.',
      'The learner used proportional reasoning, comparing two ratios to find an unknown value.',
      'The learner used spatial reasoning, mentally rotating and manipulating shapes.',
    ],
    correctIndex: 0,
    explanation:
      'Inductive reasoning moves from specific instances to a general rule — the learner examined the given numbers, noticed a constant difference of three, and used that rule to predict the next term. Deductive reasoning runs the other way, from a stated general rule to a specific conclusion. Proportional and spatial reasoning describe different kinds of problem entirely.',
    rationale:
      'Distinguishing inductive from deductive reasoning by the direction of the inference.',
    source: 'Mathematics reasoning; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'draft-es-012',
    subjectId: 'gened',
    topicId: 'gened-filipino',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      Sa isang klase, ipinabasa ng guro ang isang maikling kuwento tungkol sa
      isang batang nag-aaral sa kabila ng kahirapan. Pagkatapos, tinanong niya
      ang mga mag-aaral kung ano ang pangunahing aral na nais iparating ng
      kuwento. Sinabi ng isang mag-aaral na ang kuwento ay tungkol sa
      pagpupunyagi at pag-asa.
    `),
    prompt: 'Anong elemento ng kuwento ang tinukoy ng mag-aaral?',
    options: [
      'Ang tinukoy ng mag-aaral ay ang tema, ang pangunahing kaisipan o aral na nais iparating ng kuwento.',
      'Ang tinukoy ng mag-aaral ay ang banghay, ang pagkakasunod-sunod ng mga pangyayari sa kuwento.',
      'Ang tinukoy ng mag-aaral ay ang tauhan, ang mga kumikilos sa kuwento.',
      'Ang tinukoy ng mag-aaral ay ang tagpuan, ang lugar at panahon kung saan naganap ang kuwento.',
    ],
    correctIndex: 0,
    explanation:
      'Ang tema ay ang pangunahing kaisipan o aral na nais iparating ng akda, at iyon ang tinukoy ng mag-aaral nang sabihin niyang tungkol ito sa pagpupunyagi at pag-asa. Ang banghay ay ang pagkakasunod-sunod ng mga pangyayari, ang tauhan ay ang mga kumikilos, at ang tagpuan ay ang lugar at panahon. Ang tanong ng guro tungkol sa "aral" ay direktang tumutukoy sa tema.',
    rationale:
      'Pagkilala sa tema mula sa tanong tungkol sa aral ng akda, at pagtatangi nito sa iba pang elemento ng kuwento.',
    source: 'Panitikang Filipino; PRC GenEd TOS — Malayuning Komunikasyon sa Filipino',
  },
  {
    id: 'draft-es-013',
    subjectId: 'gened',
    topicId: 'gened-history',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher shows her class a monument in Rizal Park depicting a man
      standing with one arm raised and the other holding a book. She explains
      that the figure represents a Filipino who wrote two novels that exposed
      the abuses of Spanish colonial rule, and who was executed at Bagumbayan in
      December 1896. She asks the class to identify him.
    `),
    prompt: 'Who does the monument depict?',
    options: [
      'The monument depicts Jose Rizal, whose two novels exposed colonial abuses and who was executed at Bagumbayan in 1896.',
      'The monument depicts Andres Bonifacio, who founded the Katipunan in 1892.',
      'The monument depicts Emilio Aguinaldo, who led the First Philippine Republic.',
      'The monument depicts Apolinario Mabini, who served as the first Prime Minister of the First Philippine Republic.',
    ],
    correctIndex: 0,
    explanation:
      'Jose Rizal wrote Noli Me Tangere and El Filibusterismo, which exposed the abuses of Spanish colonial rule, and was executed at Bagumbayan on 30 December 1896. Andres Bonifacio founded the Katipunan but was not a novelist. Emilio Aguinaldo led the First Philippine Republic, and Apolinario Mabini was its first Prime Minister — neither wrote the novels described.',
    rationale:
      'Identifying a historical figure from the two facts that most reliably distinguish him: the novels and the place of execution.',
    source: 'Philippine history; PRC GenEd TOS — Readings in Philippine History',
  },
  {
    id: 'draft-es-014',
    subjectId: 'gened',
    topicId: 'gened-ethics',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A learner finds a wallet in the school corridor containing a large amount
      of money and a student identification card. Nobody saw her pick it up. She
      considers keeping it, since she does not know who the owner is and no one
      would know she found it. She decides instead to hand it to the office so
      it can be returned to the learner named on the card.
    `),
    prompt: 'Which ethical principle best explains the learner\u2019s decision?',
    options: [
      'The learner acted on the principle of honesty, doing what is right regardless of whether anyone would know.',
      'The learner acted on the principle of utility, choosing the action that produces the greatest benefit for the greatest number.',
      'The learner acted on the principle of prudence, choosing the action that best protects her own interests.',
      'The learner acted on the principle of obedience, following a rule because an authority has commanded it.',
    ],
    correctIndex: 0,
    explanation:
      'The learner chose the honest action even though nobody would have known had she kept the money, which is the mark of acting on principle rather than on consequences or on being watched. Utility weighs outcomes for the greatest number, prudence considers her own interest — which would have favoured keeping the money — and obedience requires a command, which is not mentioned.',
    rationale:
      'Identifying the principle at work from the fact that the decision held even without any possibility of being observed.',
    source: 'Ethics; PRC GenEd TOS — Ethics',
  },

  // ==================================================================
  // MODERATE SITUATIONAL — the second gap (3 in the bank, 24 needed)
  // ==================================================================
  {
    id: 'draft-ms-001',
    subjectId: 'profed',
    topicId: 'profed-curriculum',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is planning a unit on local festivals for a Grade 8 class in a
      town that holds an annual harvest festival. The textbook unit uses
      examples from other provinces. The teacher decides to keep the same
      learning competencies but replace the textbook examples with the
      learners' own festival, invite a local organiser to speak, and set the
      assessment on the festival the learners can actually observe. She checks
      that the competencies she is still covering are the ones in the
      curriculum guide.
    `),
    prompt: 'Which curriculum principle is the teacher applying, and why does it matter?',
    options: [
      'The teacher is applying contextualisation, adapting the content to the learners\u2019 own environment and culture while keeping the prescribed competencies, which makes the learning more meaningful without departing from the curriculum.',
      'The teacher is applying decongestion, removing content from the unit so that learners have less to master within the same time.',
      'The teacher is applying spiral progression, revisiting a topic the learners studied in an earlier grade level at greater depth.',
      'The teacher is applying standardisation, ensuring that her unit matches what every other school in the division is teaching.',
    ],
    correctIndex: 0,
    explanation:
      'Contextualisation adapts content and examples to the learners\u2019 local environment, culture and experience while holding the prescribed learning competencies constant — which is exactly what the teacher did, and why she checked the competencies against the curriculum guide. Decongestion reduces content, spiral progression revisits a topic across grade levels, and standardisation would push toward uniformity rather than local adaptation.',
    rationale:
      'Recognising contextualisation, and understanding that it changes examples rather than competencies.',
    source: 'RA 10533; DepEd Order No. 21, s. 2019; PRC ProfEd TOS area B (30%)',
  },
  {
    id: 'draft-ms-002',
    subjectId: 'profed',
    topicId: 'profed-teaching-profession',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is told by her principal that she will be observed for her
      performance rating. The principal explains that the observation will be
      judged against the Philippine Professional Standards for Teachers, and
      that the standards are organised into seven domains. The teacher asks
      which domain covers her work in establishing a classroom where learners
      feel safe, are treated fairly, and are encouraged to participate. The
      principal tells her it is the domain concerned with the learning
      environment.
    `),
    prompt: 'Which PPST domain covers the teacher\u2019s work in establishing a safe and fair classroom?',
    options: [
      'The domain concerned is Domain 2, Learning Environment, which covers learner safety, a fair learning environment, classroom management and support for learner participation.',
      'The domain concerned is Domain 1, Content Knowledge and Pedagogy, which covers mastery of subject matter and how to teach it.',
      'The domain concerned is Domain 3, Diversity of Learners, which covers responsiveness to learners\u2019 backgrounds and needs.',
      'The domain concerned is Domain 5, Assessment and Reporting, which covers the design and use of assessment.',
    ],
    correctIndex: 0,
    explanation:
      'Domain 2, Learning Environment, covers learner safety and security, a fair learning environment, management of classroom structure and activities, support for learner participation, promotion of purposive learning, and management of learner behaviour — all of which the teacher described. Domain 1 covers content and pedagogy, Domain 3 covers diversity of learners, and Domain 5 covers assessment and reporting.',
    rationale:
      'Mapping a described teaching responsibility to the correct PPST domain.',
    source: 'DepEd Order No. 42, s. 2017 (PPST, 7 domains); PRC ProfEd TOS area A (15%)',
  },
  {
    id: 'draft-ms-003',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher has a learner in her class who has recently moved from another
      province and speaks a different first language. The learner understands
      the lessons but is reluctant to speak in class and often answers in
      single words. The teacher decides not to pressure the learner to speak in
      front of the class, allows written responses where oral ones are not
      essential, and pairs the learner with a classmate who speaks the same
      language for group work. She continues to include the learner in
      whole-class activities.
    `),
    prompt: 'Which PPST domain is the teacher addressing through these adjustments?',
    options: [
      'The teacher is addressing Domain 3, Diversity of Learners, which covers learners\u2019 linguistic, cultural, socio-economic and religious backgrounds.',
      'The teacher is addressing Domain 2, Learning Environment, which covers classroom structure and the management of learner behaviour.',
      'The teacher is addressing Domain 4, Curriculum and Planning, which covers the planning and management of the teaching and learning process.',
      'The teacher is addressing Domain 7, Personal Growth and Professional Development, which covers reflection and professional goals.',
    ],
    correctIndex: 0,
    explanation:
      'Domain 3, Diversity of Learners, explicitly includes a strand on learners\u2019 linguistic, cultural, socio-economic and religious backgrounds. The teacher\u2019s adjustments — accepting written responses, pairing by shared language, not forcing oral performance — are responses to the learner\u2019s linguistic background. Domain 2 concerns the learning environment generally, Domain 4 concerns planning, and Domain 7 concerns the teacher\u2019s own development.',
    rationale:
      'Mapping an adjustment made for a learner\u2019s language background to the PPST domain that names it.',
    source: 'DepEd Order No. 42, s. 2017 (PPST Domain 3); PRC ProfEd TOS area C (20%)',
  },
  {
    id: 'draft-ms-004',
    subjectId: 'profed',
    topicId: 'profed-assessment',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher marks a set of essays and writes comments on each one. On one
      essay she writes that the argument is clear and well supported, but that
      the conclusion does not follow from the evidence presented, and she
      suggests one way the learner could strengthen it. She does not write a
      grade on the essay, because the essay is a draft that the learner will
      revise before submitting it for a mark.
    `),
    prompt: 'Which PPST strand is the teacher demonstrating, and why is withholding the grade consistent with it?',
    options: [
      'The teacher is demonstrating the strand on feedback to improve learning, and withholding the grade is consistent because the purpose of the feedback is to guide revision rather than to judge the work.',
      'The teacher is demonstrating the strand on communication of learner progress to stakeholders, and withholding the grade is consistent because parents are not yet informed.',
      'The teacher is demonstrating the strand on the design and selection of assessment strategies, and withholding the grade is consistent because essays are not a valid assessment tool.',
      'The teacher is demonstrating the strand on the use of assessment data to enhance programmes, and withholding the grade is consistent because a single essay cannot inform programme decisions.',
    ],
    correctIndex: 0,
    explanation:
      'The strand on feedback to improve learning concerns giving learners specific, actionable information about their work so they can improve it. The teacher\u2019s comment names what is working, identifies a specific weakness, and suggests a way forward — and because the essay is a draft for revision, a grade would shift the learner\u2019s attention from improving the work to the mark it received. The other strands concern communicating with stakeholders, designing assessment tools, and using data at programme level.',
    rationale:
      'Recognising the feedback strand, and explaining why formative feedback is withheld from the grade.',
    source: 'DepEd Order No. 42, s. 2017 (PPST Domain 5, strand 5.3); PRC ProfEd TOS area D (15%)',
  },
  {
    id: 'draft-ms-005',
    subjectId: 'profed',
    topicId: 'profed-field-study',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student teacher notices that a group of learners in her class finish
      their work quickly and then disturb others, while another group never
      finishes. She decides to prepare a short extension task that the fast
      finishers can begin without instruction, and to work directly with the
      slower group while the rest of the class is occupied. She tries this for
      two weeks and keeps notes on what happens each day.
    `),
    prompt: 'What is the student teacher doing, and why is keeping notes essential to it?',
    options: [
      'The student teacher is conducting action research on her own practice, and the notes are essential because they are the data she will use to judge whether the change worked and what to adjust next.',
      'The student teacher is conducting a formal experiment, and the notes are essential because they form the control condition of the study.',
      'The student teacher is conducting a survey of learner behaviour, and the notes are essential because they record the learners\u2019 own opinions.',
      'The student teacher is compiling a portfolio for her practicum, and the notes are essential because they document her compliance with the requirements.',
    ],
    correctIndex: 0,
    explanation:
      'The student teacher identified a problem in her own classroom, introduced a change, and is recording what happens — the plan-act-observe-reflect cycle of action research. The notes are the observational data that let her judge the effect of the change and decide what to do next, which is what makes the cycle a cycle rather than a one-off attempt. It is not a controlled experiment, not a survey of opinions, and not merely compliance documentation.',
    rationale:
      'Recognising action research in a practicum setting, and identifying why the record-keeping is part of the method rather than an add-on.',
    source: 'Action research in teaching internship; PRC ProfEd TOS area E (20%)',
  },
  {
    id: 'draft-ms-006',
    subjectId: 'cae',
    topicId: 'cae-pedagogy',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      An art teacher wants her learners to understand the difference between
      describing a work of art and interpreting it. She shows a painting and
      asks one group to list only what they can actually see — colours, shapes,
      figures, arrangement. She asks a second group to say what they think the
      painting means and to give a reason from the painting itself for each
      claim they make. She then has the two groups compare their lists.
    `),
    prompt: 'Which two disciplines of art education is the teacher separating, and what makes the second group\u2019s task interpretive?',
    options: [
      'The teacher is separating art criticism from aesthetics, and the second group\u2019s task is interpretive because it asks them to judge whether the work is beautiful.',
      'The teacher is separating description from interpretation within art criticism, and the second group\u2019s task is interpretive because it requires them to propose meaning and to justify each claim with evidence from the work itself.',
      'The teacher is separating art production from art history, and the second group\u2019s task is interpretive because it asks them to place the work in its historical period.',
      'The teacher is separating aesthetics from art production, and the second group\u2019s task is interpretive because it asks them to make their own version of the work.',
    ],
    correctIndex: 1,
    explanation:
      'Both groups are engaged in art criticism, which covers describing, analysing, interpreting and judging a work. The first group describes; the second interprets. What makes the second task interpretive rather than merely descriptive is that it requires the learners to propose a meaning and to support each claim with evidence drawn from the work — which is what separates interpretation from opinion. Aesthetics concerns judgements about beauty, art history concerns context, and art production concerns making.',
    rationale:
      'Distinguishing description from interpretation inside art criticism, and identifying evidence-based justification as the marker of interpretation.',
    source: 'Discipline-Based Art Education; PRC CAE TOS — Pedagogical Practice',
  },
  {
    id: 'draft-ms-007',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is explaining the Order of National Artists to her class. She
      tells them that the order is the highest national recognition for
      Filipinos who have contributed to the development of Philippine arts, that
      it is jointly administered by two institutions, and that it is conferred
      by the President. She then asks the class which categories the order
      covers, and a learner correctly lists eight.
    `),
    prompt: 'Which of the following correctly lists the categories of the Order of National Artists?',
    options: [
      'The order covers Music, Dance, Theater, Visual Arts, Literature, Film and Broadcast Arts, and Architecture and Allied Arts.',
      'The order covers Music, Dance, Theater, Visual Arts, Literature, and Sculpture only.',
      'The order covers Music, Painting, Sculpture, Architecture, and Creative Writing only.',
      'The order covers Music, Dance, Theater, Visual Arts, Literature, Film and Broadcast Arts, Architecture and Allied Arts, and Traditional Folk Arts.',
    ],
    correctIndex: 0,
    explanation:
      'The Order of National Artists covers eight categories: Music, Dance, Theater, Visual Arts, Literature, Film and Broadcast Arts, and Architecture and Allied Arts. Traditional folk arts are recognised separately through the Gawad sa Manlilikha ng Bayan, which is a different award — that is the distinction the last option blurs, and it is the most common error.',
    rationale:
      'Recalling the eight National Artist categories, and keeping them separate from the Gawad sa Manlilikha ng Bayan.',
    source: 'NCCA, Order of National Artists; PRC CAE TOS — Disciplinal Knowledge',
  },
  {
    id: 'draft-ms-008',
    subjectId: 'cae',
    topicId: 'cae-research',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher wants to know whether her learners' attitude toward art class
      changes over a term. She decides to ask them to write a short paragraph at
      the start of the term describing how they feel about art, and to write
      another at the end. She then reads all the paragraphs and groups the
      statements into themes, counting how many learners express each theme
      before and after.
    `),
    prompt: 'What kind of data has the teacher collected, and how is she analysing it?',
    options: [
      'She has collected qualitative data \u2014 the learners\u2019 own written statements \u2014 and she is analysing it by coding the statements into themes and counting their frequency.',
      'She has collected quantitative data, because she is counting how many learners express each theme.',
      'She has collected experimental data, because she has measured the learners twice.',
      'She has collected secondary data, because the paragraphs were written by the learners rather than by her.',
    ],
    correctIndex: 0,
    explanation:
      'The data are the learners\u2019 written statements, which are words rather than numbers — so the data are qualitative. Grouping statements into themes and counting their frequency is thematic coding, a standard qualitative analysis technique; the counting does not convert the data into quantitative data, because what is being counted is the occurrence of themes derived from the text. Measuring twice does not make a study experimental, and data collected directly from participants is primary, not secondary.',
    rationale:
      'Classifying data by its form rather than by the arithmetic performed on it.',
    source: 'Research methods; PRC CAE TOS — Research and Extension',
  },
  {
    id: 'draft-ms-009',
    subjectId: 'cae',
    topicId: 'cae-accountability',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is asked to write a letter of recommendation for a former
      learner who is applying for a scholarship. The learner was hardworking but
      performed poorly in the teacher's subject, and the teacher knows the
      learner's family is relying on the scholarship. The teacher writes that
      the learner is diligent and cooperative, which is true, but does not
      mention the poor performance in her subject, even though the scholarship
      is for that field of study.
    `),
    prompt: 'What is the ethical problem with the teacher\u2019s letter?',
    options: [
      'The letter is misleading by omission, because it presents only the favourable facts and leaves out information that is directly relevant to the decision the scholarship panel has to make.',
      'The letter is unethical because a teacher should never write a recommendation for a former learner.',
      'The letter is unethical because the teacher mentioned the learner\u2019s family circumstances.',
      'There is no ethical problem, because everything the teacher wrote is factually true.',
    ],
    correctIndex: 0,
    explanation:
      'Everything in the letter is true, but truthfulness is not the only requirement of an honest recommendation. By omitting the learner\u2019s performance in the very field the scholarship covers, the letter creates a misleading impression for the panel that must decide. That is deception by omission. Writing recommendations is a normal professional act, the teacher did not mention the family circumstances, and the fact that each statement is true does not cure the omission.',
    rationale:
      'Recognising deception by omission, and understanding that factual accuracy of each statement does not make a selectively incomplete account honest.',
    source: 'Code of Ethics for Professional Teachers; PRC CAE TOS — Professional Accountability',
  },
  {
    id: 'draft-ms-010',
    subjectId: 'cae',
    topicId: 'cae-creative',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher plays two short pieces for her class. The first is in duple
      metre and the learners clap a strong-weak pattern. The second is in triple
      metre and they clap a strong-weak-weak pattern. She then asks the class to
      identify the metre of a third piece she plays, without telling them
      anything about it, by clapping along until they can feel the pattern
      repeat.
    `),
    prompt: 'What musical skill is the teacher developing, and why is clapping the appropriate way to develop it?',
    options: [
      'The teacher is developing the learners\u2019 ability to identify metre by ear, and clapping is appropriate because metre is a pattern of recurring strong and weak beats that is felt physically before it is analysed.',
      'The teacher is developing the learners\u2019 ability to read notation, and clapping is appropriate because it replaces the need for a score.',
      'The teacher is developing the learners\u2019 ability to sing in tune, and clapping is appropriate because it strengthens the sense of pitch.',
      'The teacher is developing the learners\u2019 knowledge of musical history, and clapping is appropriate because it identifies the period of the piece.',
    ],
    correctIndex: 0,
    explanation:
      'Metre is the recurring pattern of strong and weak beats that organises a piece, and the teacher is training the learners to hear it by feeling it first — clapping the strong-weak or strong-weak-weak pattern until the repetition becomes apparent. This is the Dalcroze principle that rhythm is understood through the body. Clapping does not teach notation, does not develop pitch, and does not identify a historical period.',
    rationale:
      'Identifying a rhythm skill and explaining why physical response is the appropriate route to it.',
    source: 'Music education methodology; PRC CAE TOS — Creative Expressions',
  },
  {
    id: 'draft-ms-011',
    subjectId: 'profed',
    topicId: 'profed-curriculum',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher wants to use a short video in her lesson but the classroom has
      no projector and only one laptop. She decides to divide the class into
      five groups, give each group a different segment of the video to watch on
      the laptop in rotation, and have each group report what their segment
      showed so that the whole class assembles the full picture. She gives each
      group a question to answer while watching.
    `),
    prompt: 'What does this arrangement demonstrate about the use of ICT in teaching?',
    options: [
      'It demonstrates that ICT is used effectively when the teacher adapts the technology to the available resources and designs the activity so that every learner has a task, rather than when the technology is simply present.',
      'It demonstrates that ICT should be avoided when the classroom lacks a projector, because partial access disadvantages the learners who are not watching.',
      'It demonstrates that ICT is only useful for whole-class presentation, and that group use is a poor substitute for it.',
      'It demonstrates that the teacher should have cancelled the activity until the school provided adequate equipment.',
    ],
    correctIndex: 0,
    explanation:
      'The teacher has adapted the technology to what is available and designed a structure — rotation, assigned segments, a question per group, and a whole-class assembly of the parts — so that every learner has a task and the class still reaches the full content. That is the PPST strand on the positive use of ICT: the technology serves the learning, and the teacher\u2019s design is what makes it work. Avoiding ICT, restricting it to whole-class presentation, or cancelling the lesson would all remove a learning opportunity that the adaptation preserved.',
    rationale:
      'Recognising that effective ICT use is a matter of instructional design under real constraints, not of equipment alone.',
    source: 'DepEd Order No. 42, s. 2017 (PPST Domain 1, strand 1.3); PRC ProfEd TOS area B (30%)',
  },
  {
    id: 'draft-ms-012',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher notices that a learner who normally participates actively has
      become withdrawn over several weeks. The learner's attendance is irregular
      and homework is often incomplete. When the teacher asks quietly after
      class, the learner says things at home have been difficult but does not
      give details. The teacher decides not to press for information, refers the
      learner to the guidance office, and makes a point of greeting the learner
      by name each day and giving brief encouraging comments on work that is
      completed.
    `),
    prompt: 'Which PPST domain is the teacher addressing, and why is not pressing for details the right choice?',
    options: [
      'The teacher is addressing Domain 3, Diversity of Learners, specifically the strand on learners in difficult circumstances, and not pressing for details respects the learner\u2019s privacy while still connecting them to support.',
      'The teacher is addressing Domain 2, Learning Environment, and not pressing for details avoids disrupting the lesson.',
      'The teacher is addressing Domain 5, Assessment and Reporting, and not pressing for details avoids biasing the learner\u2019s grades.',
      'The teacher is addressing Domain 6, Community Linkages, and not pressing for details avoids involving the community too early.',
    ],
    correctIndex: 0,
    explanation:
      'Domain 3, Diversity of Learners, includes a strand on learners in difficult circumstances. The teacher recognised the signs, made a gentle approach, and then referred the learner to the guidance office rather than investigating personally — which is the correct boundary, because the teacher is not trained for that role and pressing for details would intrude on the learner\u2019s privacy without adding anything the referral will not provide. Greeting the learner and acknowledging completed work keeps the connection open without demanding disclosure.',
    rationale:
      'Mapping a response to a learner in difficulty to the correct PPST domain, and recognising the professional boundary in not investigating personally.',
    source: 'DepEd Order No. 42, s. 2017 (PPST Domain 3, strand 3.4); PRC ProfEd TOS area C (20%)',
  },
  {
    id: 'draft-ms-013',
    subjectId: 'gened',
    topicId: 'gened-communication',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student is writing a report on a local environmental issue. In her first
      draft she writes: "The river is polluted. Factories dump waste into it.
      This is bad for the community." Her teacher comments that the claims are
      unsupported and that the writing does not distinguish between what the
      student observed and what she concluded. The student revises to include
      the date she visited the river, what she saw, and a statement of what she
      infers from it.
    `),
    prompt: 'What has the student improved in her revision?',
    options: [
      'She has separated observation from inference and supported her claims with specific evidence, which strengthens the report\u2019s credibility.',
      'She has made the report longer, which is the main requirement of a report.',
      'She has replaced her opinion with the opinions of others, which is required for objectivity.',
      'She has added dates, which is the only requirement for a report to be credible.',
    ],
    correctIndex: 0,
    explanation:
      'The teacher\u2019s comment identified two problems: unsupported claims and a failure to distinguish observation from inference. The revision addresses both by recording what the student actually saw and when, and by marking her conclusion as an inference drawn from that evidence. That distinction is what makes a report credible, because a reader can then judge the evidence separately from the conclusion. Length, substituting others\u2019 opinions, and dates alone do not accomplish this.',
    rationale:
      'Recognising the observation/inference distinction and evidence-based support as what makes a report credible.',
    source: 'Purposive communication; PRC GenEd TOS — Purposive Communication',
  },
  {
    id: 'draft-ms-014',
    subjectId: 'gened',
    topicId: 'gened-contemporary-world',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher asks her class to examine the labels on their own clothing and
      school supplies and to note where each item was made. The learners find
      items from several countries. The teacher then asks them to consider why a
      single item — a pair of shoes, for example — might be designed in one
      country, have its materials sourced from several others, be assembled in
      another, and be sold worldwide. She asks what this pattern suggests about
      how the world economy is organised.
    `),
    prompt: 'Which concept is the teacher illustrating through this activity?',
    options: [
      'The teacher is illustrating globalisation, the increasing interconnection of economies through trade, production and communication across national borders.',
      'The teacher is illustrating protectionism, the policy of restricting imports to shield domestic industries.',
      'The teacher is illustrating isolationism, the policy of withdrawing from international engagement.',
      'The teacher is illustrating colonialism, the direct political control of one country by another.',
    ],
    correctIndex: 0,
    explanation:
      'A single product designed in one country, sourced from several, assembled in another and sold worldwide is the characteristic pattern of globalised production, in which the stages of making a product are distributed across borders according to cost and capability. Protectionism and isolationism would both reduce this kind of cross-border production, and colonialism describes political control rather than contemporary supply chains.',
    rationale:
      'Recognising globalisation from a described production pattern rather than from a definition.',
    source: 'The contemporary world; PRC GenEd TOS — The Contemporary World',
  },
  {
    id: 'draft-ms-015',
    subjectId: 'gened',
    topicId: 'gened-self',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student who has always thought of herself as "not a maths person" begins
      to notice that she can solve problems when she works through them slowly
      and asks questions. Over a term her test scores rise. She tells her
      teacher that she has started to think of herself differently, and that she
      now believes effort matters more than whether she was born with a talent
      for the subject.
    `),
    prompt: 'What has changed in the student, according to the concept of self-efficacy?',
    options: [
      'Her belief about her own capability in mathematics has changed, and that belief is itself part of what improved her performance.',
      'Her innate mathematical ability has increased, which is what produced the higher scores.',
      'Her personality has changed from introverted to extroverted.',
      'Her memory capacity has increased as a result of practice.',
    ],
    correctIndex: 0,
    explanation:
      'Self-efficacy is a person\u2019s belief in their own capability to perform a task. The student moved from a fixed view of herself as "not a maths person" to a belief that effort matters — and that belief is not merely a symptom of improvement but a contributor to it, because learners who believe they can improve persist longer and seek help. Innate ability, personality type and memory capacity are separate constructs and none of them is what the student described.',
    rationale:
      'Recognising a change in self-efficacy, and understanding that the belief is a cause of improved performance rather than only a result.',
    source: 'Bandura, self-efficacy; PRC GenEd TOS — Understanding the Self',
  },
  {
    id: 'draft-ms-016',
    subjectId: 'gened',
    topicId: 'gened-art-appreciation',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher shows her class two photographs of the same subject: a rice
      terrace. The first is a wide shot in which the terraces recede into the
      distance and appear small. The second is a close shot of a single terrace
      edge, filling the frame. She asks the class how the choice of framing
      changes what each photograph communicates about the place.
    `),
    prompt: 'What is the teacher teaching through this comparison?',
    options: [
      'She is teaching that framing and scale are compositional choices that shape meaning, because the same subject communicates differently depending on how much of it is shown and from what distance.',
      'She is teaching that the second photograph is technically superior because it shows more detail.',
      'She is teaching that photographs of landscapes should always be taken from a distance.',
      'She is teaching that the two photographs are equivalent because they show the same subject.',
    ],
    correctIndex: 0,
    explanation:
      'Framing and scale are deliberate compositional decisions. The wide shot conveys the extent and setting of the terraces; the close shot conveys texture and craft. Neither is superior — they communicate different things, and the teacher\u2019s question asks the class to notice that. Claiming one is technically better, prescribing a single distance for landscapes, or treating the two as equivalent all miss the point of the comparison.',
    rationale:
      'Understanding that framing is a meaning-making choice rather than a technical quality issue.',
    source: 'Art appreciation and composition; PRC GenEd TOS — Art Appreciation',
  },
  {
    id: 'draft-ms-017',
    subjectId: 'gened',
    topicId: 'gened-rizal',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is discussing why Rizal's novels were effective instruments of
      reform. She notes that Rizal did not advocate armed revolution — in fact
      he explicitly disavowed it — and that the novels nevertheless exposed the
      abuses of colonial rule so effectively that the authorities banned them.
      She asks the class to explain how a work that rejected revolution could
      still be considered dangerous by the government.
    `),
    prompt: 'Which of the following best explains this apparent contradiction?',
    options: [
      'The novels were dangerous because they made the abuses of colonial rule visible and recognisable to a wide readership, creating the conditions for reform and for national consciousness even without advocating revolt.',
      'The novels were dangerous because they contained detailed instructions for organising an armed uprising.',
      'The novels were dangerous because they were written in Spanish, which the authorities could not censor.',
      'The novels were not actually dangerous, and the ban was a bureaucratic error.',
    ],
    correctIndex: 0,
    explanation:
      'Rizal\u2019s position was reform rather than revolution, but exposing colonial abuses through narrative that reached a broad readership was dangerous to the authorities precisely because it made those abuses visible and recognisable. A population that can name an injustice is harder to govern by the same means. The novels contain no instructions for uprising, they were written in Spanish and were banned despite that, and the ban was a deliberate response rather than an error.',
    rationale:
      'Explaining how exposure of injustice can threaten a regime without advocating revolt, and rejecting the claim that Rizal sought revolution.',
    source: 'Jose Rizal, Noli Me Tangere (1887) and El Filibusterismo (1891); RA 1425; PRC GenEd TOS',
  },
  {
    id: 'draft-ms-018',
    subjectId: 'gened',
    topicId: 'gened-science',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A community near a river notices that fish catches have declined over
      several years. Several explanations are offered at a barangay meeting. One
      resident says the fish have moved upstream. Another says the water has
      become warmer. A third says waste from upstream farms has increased. A
      fourth says the river is simply too polluted for fish to survive. The
      barangay captain asks how they could find out which explanation is
      correct.
    `),
    prompt: 'What is the most appropriate next step for the community?',
    options: [
      'Collect evidence that could distinguish between the explanations \u2014 measuring water quality and temperature at several points, and recording where and when catches decline \u2014 so that the explanations can be tested against observation.',
      'Adopt the explanation offered by the resident who has lived there longest, since long residence implies greater knowledge.',
      'Act on all four explanations at once so that whichever one is correct will be addressed.',
      'Wait to see whether the catches recover on their own before taking any action.',
    ],
    correctIndex: 0,
    explanation:
      'The four explanations make different predictions about what should be observed — if the water is warmer, temperature readings should show it; if farm waste is the cause, the decline should track the waste. Collecting evidence that can distinguish between them is what turns competing guesses into a testable question. Deferring to seniority is not evidence, acting on all four at once makes it impossible to learn which was right, and waiting allows the decline to continue.',
    rationale:
      'Recognising that competing explanations must be distinguished by evidence that discriminates between them.',
    source: 'Scientific method; PRC GenEd TOS — Science and Technology',
  },
  {
    id: 'draft-ms-019',
    subjectId: 'profed',
    topicId: 'profed-assessment',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher has marked a 50-item test. She notices that one item was
      answered correctly by nearly every learner in the class, including those
      who performed poorly overall. She also notices that a second item was
      answered correctly by only a few learners, and that those who got it right
      were mostly the stronger learners. She wants to decide what to do with
      each item.
    `),
    prompt: 'What should the teacher do with each of the two items?',
    options: [
      'She should revise the first item, because it is too easy to discriminate between learners, and retain the second, because it is difficult but still separates stronger learners from weaker ones.',
      'She should retain the first item, because a high success rate shows the class understood the material, and revise the second, because too few learners got it right.',
      'She should revise both items, because an item that is not answered correctly by most of the class is not a fair item.',
      'She should retain both items, because item difficulty is a matter of learner ability rather than of item quality.',
    ],
    correctIndex: 0,
    explanation:
      'The first item has a very high difficulty index and discriminates poorly — everyone got it right, including the weakest learners, so it adds no information about who has learned what. It should be revised or replaced. The second item is difficult but discriminates well, because the learners who got it right were mostly the stronger ones; a hard item that separates strong from weak learners is doing its job and should be retained. Revising an item merely because it is hard, or retaining one merely because it is easy, confuses difficulty with quality.',
    rationale:
      'Reading difficulty and discrimination together, and recognising that a hard item can be a good item.',
    source: 'Item analysis; PRC ProfEd TOS area D (15%)',
  },
  {
    id: 'draft-ms-020',
    subjectId: 'cae',
    topicId: 'cae-pedagogy',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is planning a unit on Philippine folk dance for a class of
      forty learners in a small classroom. She has no sound system and no
      mirrors. She decides to teach the dance in three stages: first the class
      learns the rhythm by clapping and counting in their seats, then they learn
      the footwork in place without travelling, and only then do they attempt
      the full movement in small groups while the rest of the class counts the
      beat aloud.
    `),
    prompt: 'What principle is the teacher applying in sequencing the unit this way?',
    options: [
      'She is applying part-to-whole sequencing with task analysis, breaking a complex skill into components that are mastered separately before being combined.',
      'She is applying whole-method instruction, in which learners attempt the complete skill from the beginning and correct errors as they arise.',
      'She is applying discovery learning, in which learners work out the dance for themselves without instruction.',
      'She is applying peer tutoring, in which learners teach one another without the teacher\u2019s involvement.',
    ],
    correctIndex: 0,
    explanation:
      'The teacher has analysed the dance into its components — rhythm, then footwork in place, then travelling movement — and sequences them so each is established before the next is added. That is part-to-whole sequencing, and it is the appropriate response to a complex motor skill in a constrained space, because it lets learners build the components without the full coordination demand at once. Whole-method instruction would have them attempt the complete dance immediately, discovery learning would remove instruction, and peer tutoring would remove the teacher.',
    rationale:
      'Recognising part-to-whole task analysis from the described sequence, and understanding why it suits a complex motor skill under constraints.',
    source: 'Instructional planning and motor skill acquisition; PRC CAE TOS — Pedagogical Practice',
  },
  {
    id: 'draft-ms-021',
    subjectId: 'profed',
    topicId: 'profed-curriculum',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A school's curriculum committee is reviewing the Grade 9 programme. It
      gathers four kinds of information: the community's needs and the learners'
      backgrounds; the teachers' qualifications, the budget and the materials
      available; how the programme is actually being taught in classrooms; and
      whether learner outcomes match the intended objectives. The committee uses
      all four to decide whether to continue, modify or replace the programme.
    `),
    prompt: 'Which curriculum evaluation model is the committee using, and what are its four components?',
    options: [
      'The committee is using Stufflebeam\u2019s CIPP model, whose four components are Context, Input, Process and Product evaluation.',
      'The committee is using Stake\u2019s Countenance Model, whose four components are antecedents, transactions, outcomes and standards.',
      'The committee is using Tyler\u2019s Objectives Model, whose four components are objectives, content, organisation and evaluation.',
      'The committee is using Scriven\u2019s Goal-Free Model, whose four components are needs, implementation, effects and costs.',
    ],
    correctIndex: 0,
    explanation:
      'CIPP stands for Context, Input, Process and Product, and it is decision-oriented — which is exactly the four kinds of information the committee gathered and the decision it has to make. Context evaluation examines the setting and needs; input evaluation examines the resources and strategies; process evaluation examines implementation; product evaluation examines outcomes. Stake\u2019s model uses antecedents, transactions and outcomes, which does not match the four gathered. Tyler\u2019s is a design model, and the goal-free model deliberately avoids examining stated objectives.',
    rationale:
      'Identifying an evaluation model from its four named components and its decision-oriented purpose.',
    source: 'Stufflebeam, CIPP evaluation model; PRC ProfEd TOS area B (30%)',
  },
  {
    id: 'draft-ms-022',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher shows her class a photograph of a carved wooden figure from the
      Cordillera. It is a seated human figure with shortened limbs and a
      prominent head, and she explains that it served two purposes in the
      community that made it: it was placed in the granary as a guardian of the
      rice, and it was also understood as a representation of an ancestor. She
      then shows a photograph of a curvilinear design covering the beam of a
      large house, with a bird-like figure at its centre, and explains that this
      design belongs to a different people entirely.
    `),
    prompt: 'Which of the following correctly identifies the two objects the teacher showed?',
    options: [
      'The carved figure is a bul-ul of the Cordillera, and the curvilinear design is okir of the Maranao and Tausug.',
      'The carved figure is okir of the Cordillera, and the curvilinear design is a bul-ul of the Maranao.',
      'Both objects are Maranao, differing only in the material used.',
      'Both objects are Cordillera, differing only in size.',
    ],
    correctIndex: 0,
    explanation:
      'The bul-ul is a carved wooden figure of the Cordillera that functioned both as a granary guardian and as an ancestral representation — the two purposes the teacher described. Okir is the curvilinear design motif of the Maranao and Tausug, and the bird-like figure at its centre is the sarimanok. The two come from different peoples and different traditions, which is what the item asks the student to keep separate.',
    rationale:
      'Distinguishing a Cordillera carved figure from a Maranao design motif by their origin and function.',
    source: 'Philippine art and craft traditions; PRC CAE TOS — Disciplinal Knowledge',
  },
  {
    id: 'draft-ms-023',
    subjectId: 'gened',
    topicId: 'gened-history',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is teaching historical method. She gives her class two accounts
      of the same event: one written by a participant on the winning side, and
      one written fifty years later by a historian who had access to documents
      from both sides. She asks the class which account they would trust more,
      and a learner answers that the second must be better because it is more
      recent and more complete.
    `),
    prompt: 'What is the most important correction the teacher should make to the learner\u2019s reasoning?',
    options: [
      'The teacher should explain that the two accounts answer different questions: the participant\u2019s account is a primary source valuable for what the participant saw and believed, while the historian\u2019s is a secondary source valuable for synthesis \u2014 and neither is automatically more trustworthy than the other.',
      'The teacher should explain that the participant\u2019s account is worthless because a participant on the winning side is always biased.',
      'The teacher should explain that the historian\u2019s account is worthless because it was written long after the event.',
      'The teacher should explain that both accounts are equally worthless and that only physical evidence can be trusted.',
    ],
    correctIndex: 0,
    explanation:
      'The learner has confused recency and completeness with reliability. The two sources are different kinds of evidence: the participant\u2019s account is primary, and its value lies in recording what someone present actually observed and believed, including their bias, which is itself historical evidence. The historian\u2019s account is secondary, and its value lies in synthesis across multiple sources. Neither kind is inherently more trustworthy — each must be assessed for what it can and cannot support. Dismissing either entirely discards usable evidence.',
    rationale:
      'Correcting the assumption that newer and more complete means more reliable, and distinguishing what primary and secondary sources are each good for.',
    source: 'Historical method; PRC GenEd TOS — Readings in Philippine History',
  },
  {
    id: 'draft-ms-024',
    subjectId: 'profed',
    topicId: 'profed-teaching-profession',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is in her fourth year of service. Her rater tells her that her
      evaluation will be judged against the descriptors for the career stage she
      currently occupies, and that progression to the next stage will depend on
      demonstrating the indicators for that stage — which include mentoring
      colleagues and leading professional development, not only classroom
      teaching.
    `),
    prompt: 'Which career stage is the teacher in, and which stage is she working toward?',
    options: [
      'She is at the Proficient stage and working toward Highly Proficient, which adds mentoring colleagues and leading professional development beyond her own classroom.',
      'She is at the Beginning stage and working toward Proficient, which adds independence in applying teaching skills.',
      'She is at the Highly Proficient stage and working toward Distinguished, which adds leading colleagues in promoting quality learning.',
      'She is at the Distinguished stage and working toward a leadership position outside teaching.',
    ],
    correctIndex: 0,
    explanation:
      'The PPST defines four career stages. Beginning teachers have the qualifications for entry; Proficient teachers are professionally independent in applying the skills vital to teaching and learning; Highly Proficient teachers are accomplished practitioners who mentor and work collegially with other staff; Distinguished teachers lead colleagues in promoting quality learning. A teacher of four years who is independent in her classroom but has not yet taken on mentoring is Proficient, working toward Highly Proficient — which is the stage that adds mentoring and leading professional development.',
    rationale:
      'Placing a teacher on the PPST career ladder from her years of service and the responsibilities she has and has not yet taken on.',
    source: 'DepEd Order No. 42, s. 2017 (PPST career stages); PRC ProfEd TOS area A (15%)',
  },
];
