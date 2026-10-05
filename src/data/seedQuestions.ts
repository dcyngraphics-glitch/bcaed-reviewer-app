import type { Question, Difficulty } from '../types/content';

/**
 * Seed question bank.
 *
 * Every item is an original multiple-choice question written against verified
 * reference material — the plan forbids copying from other reviewers, so these
 * are composed here and each carries the source it was checked against.
 *
 * `status: 'approved'` marks content the administrator has accepted. Questions
 * drafted by the AI-assist workflow land as `'pending'` and are invisible to
 * students until reviewed.
 *
 * `subjectId` / `topicId` match src/data/curriculum.ts.
 */

interface Seed {
  id: string;
  subjectId: string;
  topicId: string;
  difficulty: Difficulty;
  prompt: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
  source?: string;
}

const SEEDS: readonly Seed[] = [
  // ------------------------------------------------------------------
  // Culture and Arts Education — Disciplinal Knowledge
  // ------------------------------------------------------------------
  {
    id: 'cae-d-001',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 1,
    prompt: 'What is the defining feature of the Tinikling dance?',
    options: [
      'Dancers balance lighted lamps on their heads',
      'Dancers step in and out between two bamboo poles beaten on the ground',
      'Dancers imitate the movements of a duck',
      'Dancers perform a chasing-and-fleeing courtship pattern',
    ],
    correctIndex: 1,
    explanation:
      'Tinikling, from Leyte, takes its name from the tikling bird. Two people clap bamboo poles on the ground while dancers step in and out between them. The lamp-balancing dance is Pandanggo sa Ilaw; the duck imitation is Itik-itik.',
    source: 'Philippine Folk Dance literature; PRC CAE TOS — Disciplinal Knowledge',
  },
  {
    id: 'cae-d-002',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 2,
    prompt: 'Which Philippine folk dance is known as the "Dance of the Doves"?',
    options: ['Tinikling', 'Pandanggo sa Ilaw', 'Pantomina', 'Singkil'],
    correctIndex: 2,
    explanation:
      'Pantomina is the Bicolano courtship dance called the "Dance of the Doves". Its name comes from the Bicol word salampati, meaning dove. Singkil also uses bamboo poles but is a Maranao royal dance from the Darangen epic.',
    source: 'Bicol folk dance literature; PRC CAE TOS — Disciplinal Knowledge',
  },
  {
    id: 'cae-d-003',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 2,
    prompt: 'In the Pandanggo sa Ilaw, what do the dancers balance?',
    options: [
      'Books on their heads',
      'Oil lamps or candles in glasses',
      'Fruit baskets on their shoulders',
      'Bamboo poles between their hands',
    ],
    correctIndex: 1,
    explanation:
      'Pandanggo sa Ilaw means "fandango with lights". Dancers balance oil lamps or candles set in glasses, typically on the head and the backs of the hands, while keeping the steps light.',
    source: 'Philippine Folk Dance literature; PRC CAE TOS — Disciplinal Knowledge',
  },
  {
    id: 'cae-d-004',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 3,
    prompt:
      'Which dance is characterised by a chasing-and-fleeing pattern between a couple, accompanied by the waving of handkerchiefs?',
    options: ['Cariñosa', 'Kuratsa', 'Pantomina', 'Singkil'],
    correctIndex: 1,
    explanation:
      'Kuratsa is a courtship dance from Leyte and Samar built on a chase-and-flee pattern, with handkerchiefs waved to express shyness and affection. Cariñosa also uses a fan or handkerchief, but it is a flirtatious hide-and-seek dance, not a chase.',
    source: 'Philippine Folk Dance literature; PRC CAE TOS — Disciplinal Knowledge',
  },
  {
    id: 'cae-d-005',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 3,
    prompt: 'Which of the following is NOT an element of art?',
    options: ['Line', 'Texture', 'Rhythm', 'Value'],
    correctIndex: 2,
    explanation:
      'Rhythm is a principle of art, not an element. The elements are line, shape, form, colour, value, texture and space; the principles include balance, emphasis, movement, pattern, rhythm, unity and variety.',
    source: 'Art Appreciation / elements and principles of art; PRC CAE TOS',
  },
  {
    id: 'cae-d-006',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 2,
    prompt: 'Who painted the Spoliarium?',
    options: ['Fernando Amorsolo', 'Juan Luna', 'Felix Resurreccion Hidalgo', 'Guillermo Tolentino'],
    correctIndex: 1,
    explanation:
      'Juan Luna painted the Spoliarium in 1884; it won a gold medal at the Madrid Exposition and now hangs in the National Museum of Fine Arts. Guillermo Tolentino is a sculptor, not the painter of the Spoliarium.',
    source: 'Philippine art history; PRC CAE TOS — Disciplinal Knowledge',
  },
  {
    id: 'cae-d-007',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 4,
    prompt: 'The Oblation, the iconic sculpture of the University of the Philippines, was created by:',
    options: [
      'Guillermo Tolentino',
      'Napoleon Abueva',
      'Juan Luna',
      'Carlos "Botong" Francisco',
    ],
    correctIndex: 0,
    explanation:
      'Guillermo Tolentino, later a National Artist for Sculpture, created the Oblation in 1935. Napoleon Abueva was his student and is known as the "Father of Modern Philippine Sculpture".',
    source: 'Philippine art history; PRC CAE TOS — Disciplinal Knowledge',
  },
  {
    id: 'cae-d-008',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 3,
    prompt: 'Which ensemble is made up of plucked string instruments such as the bandurria, octavina and laud?',
    options: ['Kulintang', 'Gangsa', 'Rondalla', 'Pangkat Kawayan'],
    correctIndex: 2,
    explanation:
      'The Rondalla is a plucked-string ensemble of bandurria, octavina, laud, guitar and bass, derived from Spanish string bands. Kulintang and gangsa are gong traditions, not string ensembles.',
    source: 'Philippine music literature; PRC CAE TOS — Disciplinal Knowledge',
  },
  {
    id: 'cae-d-009',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 4,
    prompt: 'The Kulintang is best described as:',
    options: [
      'A set of flat gongs played with a stick in the Cordillera',
      'A row of small horizontal gongs played melodically in Maguindanao and Maranao music',
      'A two-stringed bowed lute of the Visayas',
      'A bamboo nose flute of the T\u2019boli',
    ],
    correctIndex: 1,
    explanation:
      'Kulintang is a rack of small horizontal gongs played melodically and is central to Maguindanao and Maranao music. Flat gongs played with the palm or a stick are gangsa, a Cordillera tradition.',
    source: 'Philippine music literature; PRC CAE TOS — Disciplinal Knowledge',
  },
  {
    id: 'cae-d-010',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 3,
    prompt: 'A Filipino love song traditionally written in triple metre is called a:',
    options: ['Harana', 'Kundiman', 'Balagtasan', 'Kumintang'],
    correctIndex: 1,
    explanation:
      'The Kundiman is a Filipino art song of devotion, traditionally in 3/4 time. A Harana is a serenade sung outside a woman\u2019s window, and a Balagtasan is a formal poetic debate.',
    source: 'Philippine music literature; PRC CAE TOS — Disciplinal Knowledge',
  },

  // ------------------------------------------------------------------
  // Culture and Arts Education — Pedagogical Practice
  // ------------------------------------------------------------------
  {
    id: 'cae-p-001',
    subjectId: 'cae',
    topicId: 'cae-pedagogy',
    difficulty: 2,
    prompt:
      'Which music teaching approach uses speech, movement, singing and percussion to develop elemental music-making?',
    options: ['Kodály method', 'Orff approach', 'Suzuki method', 'Dalcroze Eurhythmics'],
    correctIndex: 1,
    explanation:
      'The Orff approach builds musicianship from speech patterns, movement, singing and simple percussion. Kodály is singing-based with movable-do and hand signs; Suzuki is the mother-tongue approach; Dalcroze teaches through bodily movement.',
    source: 'Music education methodology; PRC CAE TOS — Pedagogical Practice',
  },
  {
    id: 'cae-p-002',
    subjectId: 'cae',
    topicId: 'cae-pedagogy',
    difficulty: 3,
    prompt: 'Dalcroze Eurhythmics teaches musical concepts primarily through:',
    options: [
      'Sight-singing using hand signs',
      'Bodily movement and response to rhythm',
      'Beginning instrumental study by ear at a very young age',
      'Improvisation on barred percussion instruments',
    ],
    correctIndex: 1,
    explanation:
      'Émile Jaques-Dalcroze held that rhythm is best understood through the body, so eurhythmics uses movement to teach tempo, metre and phrasing. Hand signs belong to Kodály; early by-ear study is Suzuki.',
    source: 'Music education methodology; PRC CAE TOS — Pedagogical Practice',
  },
  {
    id: 'cae-p-003',
    subjectId: 'cae',
    topicId: 'cae-pedagogy',
    difficulty: 4,
    prompt:
      'An art teacher wants learners to study artworks through production, history, criticism and aesthetics. Which framework is being applied?',
    options: [
      'Discipline-Based Art Education (DBAE)',
      'Visual Thinking Strategies (VTS)',
      'Reggio Emilia approach',
      'Teaching for Artistic Behavior (TAB)',
    ],
    correctIndex: 0,
    explanation:
      'DBAE, associated with the Getty Center, organises art learning around four disciplines: art production, art history, art criticism and aesthetics. VTS is a discussion method built on open-ended questioning.',
    source: 'Art education frameworks; PRC CAE TOS — Pedagogical Practice',
  },
  {
    id: 'cae-p-004',
    subjectId: 'cae',
    topicId: 'cae-pedagogy',
    difficulty: 3,
    prompt:
      'A learner who grasps musical concepts quickly but struggles to work with classmates is strongest in which of Gardner\u2019s intelligences?',
    options: [
      'Interpersonal',
      'Musical',
      'Bodily-kinaesthetic',
      'Naturalist',
    ],
    correctIndex: 1,
    explanation:
      'The learner\u2019s strength is musical intelligence. Difficulty working with others points to a relative weakness in interpersonal intelligence, which is a separate area.',
    source: 'Howard Gardner, Frames of Mind; PRC CAE TOS — Pedagogical Practice',
  },
  {
    id: 'cae-p-005',
    subjectId: 'cae',
    topicId: 'cae-pedagogy',
    difficulty: 4,
    prompt:
      'A teacher assigns each group a different element of art to master, then regroups so each new group has one expert on every element. Which cooperative strategy is this?',
    options: ['Think-Pair-Share', 'Jigsaw', 'STAD', 'Numbered Heads Together'],
    correctIndex: 1,
    explanation:
      'The Jigsaw method splits content into expert groups and then redistributes members so each new group holds a full set of expertise. STAD and Numbered Heads Together use teams and individual accountability but not the expert-group structure.',
    source: 'Cooperative learning literature; PRC CAE TOS — Pedagogical Practice',
  },
  {
    id: 'cae-p-006',
    subjectId: 'cae',
    topicId: 'cae-pedagogy',
    difficulty: 3,
    prompt:
      'Learners are asked to examine two folk dances and identify how their movements reflect the environment of their region. Which thinking level does this demand?',
    options: [
      'Remembering',
      'Understanding',
      'Analysing',
      'Creating',
    ],
    correctIndex: 2,
    explanation:
      'Breaking material into parts and detecting relationships between them is analysing. Understanding would be explaining the dances; creating would be composing a new one.',
    source: 'Revised Bloom\u2019s Taxonomy; PRC CAE TOS — Pedagogical Practice',
  },
  {
    id: 'cae-p-007',
    subjectId: 'cae',
    topicId: 'cae-pedagogy',
    difficulty: 5,
    prompt:
      'A teacher builds a unit in which learners study the local festival, interview a folk artist, and mount a community exhibit. The main value of this design is that it:',
    options: [
      'Covers the most topics in the shortest time',
      'Connects art learning to authentic cultural context and the community',
      'Guarantees high scores in the written assessment',
      'Keeps learners occupied during vacant periods',
    ],
    correctIndex: 1,
    explanation:
      'The unit is an example of culturally responsive, authentic learning: it grounds art in the learners\u2019 own community and heritage. Test coverage is not the purpose of the design.',
    source: 'Culturally responsive pedagogy; PRC CAE TOS — Pedagogical Practice',
  },
  {
    id: 'cae-p-008',
    subjectId: 'cae',
    topicId: 'cae-pedagogy',
    difficulty: 2,
    prompt: 'Which of the following is the best example of a performance-based assessment in the arts?',
    options: [
      'A 50-item multiple-choice test on the elements of art',
      'A written book report on a National Artist\u2019s biography',
      'A rubric-scored original dance composition performed for the class',
      'A spelling quiz on art vocabulary',
    ],
    correctIndex: 2,
    explanation:
      'Performance-based assessment requires learners to demonstrate skills or produce work judged against criteria. A rubric-scored dance composition does this; the other options are written recall tasks.',
    source: 'Assessment of learning; PRC CAE TOS — Pedagogical Practice',
  },

  // ------------------------------------------------------------------
  // Culture and Arts Education — Creative Expressions
  // ------------------------------------------------------------------
  {
    id: 'cae-c-001',
    subjectId: 'cae',
    topicId: 'cae-creative',
    difficulty: 3,
    prompt: 'In 2/4 time, a whole note is held for how many beats?',
    options: ['Two beats', 'Four beats', 'Eight beats', 'One beat'],
    correctIndex: 1,
    explanation:
      'A whole note always occupies a full measure in common time: four beats in 4/4 and four beats in 2/4 when written across two tied measures. In simple time the whole note is worth four quarter-note beats.',
    source: 'Music theory fundamentals; PRC CAE TOS — Creative Expressions',
  },
  {
    id: 'cae-c-002',
    subjectId: 'cae',
    topicId: 'cae-creative',
    difficulty: 2,
    prompt: 'Which element of art refers to the lightness or darkness of a colour?',
    options: ['Hue', 'Value', 'Saturation', 'Texture'],
    correctIndex: 1,
    explanation:
      'Value is the lightness or darkness of a colour or tone. Hue is the colour itself, saturation is its intensity, and texture is the surface quality.',
    source: 'Elements of art; PRC CAE TOS — Creative Expressions',
  },
  {
    id: 'cae-c-003',
    subjectId: 'cae',
    topicId: 'cae-creative',
    difficulty: 4,
    prompt:
      'A mural uses unequal shapes on either side of a central figure yet still feels stable. Which principle is at work?',
    options: ['Symmetrical balance', 'Asymmetrical balance', 'Radial balance', 'Emphasis'],
    correctIndex: 1,
    explanation:
      'Asymmetrical balance achieves visual stability through unequal elements rather than mirroring. Symmetrical balance would require the two sides to match.',
    source: 'Principles of art; PRC CAE TOS — Creative Expressions',
  },
  {
    id: 'cae-c-004',
    subjectId: 'cae',
    topicId: 'cae-creative',
    difficulty: 3,
    prompt: 'In the Kodály method, hand signs are used mainly to:',
    options: [
      'Indicate the dynamic level of a phrase',
      'Show pitch relationships while singing',
      'Mark the beat of the conductor',
      'Signal a change of tempo',
    ],
    correctIndex: 1,
    explanation:
      'Curwen-Kodály hand signs give each scale degree a physical position in space, so singers internalise pitch relationships — the basis of movable-do sight-singing.',
    source: 'Kodály method; PRC CAE TOS — Creative Expressions',
  },
  {
    id: 'cae-c-005',
    subjectId: 'cae',
    topicId: 'cae-creative',
    difficulty: 4,
    prompt:
      'A learner draws a scene in which the distant mountains are drawn the same size as the near trees. Which technique has the learner failed to apply?',
    options: [
      'Perspective and scale',
      'Repetition and pattern',
      'Complementary colour',
      'Negative space',
    ],
    correctIndex: 0,
    explanation:
      'Perspective uses scale and converging lines to create depth; objects further away appear smaller. Drawing distant objects at the same size flattens the picture plane.',
    source: 'Drawing and composition fundamentals; PRC CAE TOS — Creative Expressions',
  },
  {
    id: 'cae-c-006',
    subjectId: 'cae',
    topicId: 'cae-creative',
    difficulty: 5,
    prompt:
      'A teacher asks learners to create a movement piece that interprets a kundiman without using any lyrics. The primary competency being developed is:',
    options: [
      'Memorising the song\u2019s melody',
      'Translating musical mood into another expressive medium',
      'Copying a recorded choreography exactly',
      'Identifying the song\u2019s composer',
    ],
    correctIndex: 1,
    explanation:
      'The task is cross-modal translation: learners read the emotional content of the music and re-express it through movement. Exact copying would not require interpretation.',
    source: 'Creative expression in arts education; PRC CAE TOS — Creative Expressions',
  },

  // ------------------------------------------------------------------
  // Culture and Arts Education — Professional Accountability
  // ------------------------------------------------------------------
  {
    id: 'cae-a-001',
    subjectId: 'cae',
    topicId: 'cae-accountability',
    difficulty: 2,
    prompt: 'Which law is known as the Philippine Teachers Professionalization Act of 1994?',
    options: ['RA 4670', 'RA 7836', 'RA 9155', 'RA 10533'],
    correctIndex: 1,
    explanation:
      'RA 7836 professionalised teaching and placed teacher licensure under the PRC. RA 4670 is the Magna Carta for Public School Teachers; RA 9155 governs basic education; RA 10533 is the Enhanced Basic Education Act.',
    source: 'Republic Act 7836; PRC CAE TOS — Professional Accountability',
  },
  {
    id: 'cae-a-002',
    subjectId: 'cae',
    topicId: 'cae-accountability',
    difficulty: 3,
    prompt: 'The Magna Carta for Public School Teachers is:',
    options: ['RA 4670', 'RA 7836', 'RA 1425', 'RA 7722'],
    correctIndex: 0,
    explanation:
      'RA 4670 (1966) sets out the rights and privileges of public school teachers, including working hours, leave and salary protections. RA 1425 is the Rizal Law; RA 7722 created CHED.',
    source: 'Republic Act 4670; PRC CAE TOS — Professional Accountability',
  },
  {
    id: 'cae-a-003',
    subjectId: 'cae',
    topicId: 'cae-accountability',
    difficulty: 4,
    prompt:
      'Under the Code of Ethics for Professional Teachers, a teacher who learns of a colleague\u2019s misconduct toward a learner should:',
    options: [
      'Report it to the learners\u2019 parents before anyone else',
      'Ignore it to preserve professional harmony',
      'Report it to the proper authority in writing and, if warranted, file a formal complaint',
      'Confront the colleague publicly during class hours',
    ],
    correctIndex: 2,
    explanation:
      'The Code requires a teacher to report misconduct to the proper authority rather than remain silent or take it public. Ignoring it violates the duty owed to learners.',
    source: 'Code of Ethics for Professional Teachers; PRC CAE TOS',
  },
  {
    id: 'cae-a-004',
    subjectId: 'cae',
    topicId: 'cae-accountability',
    difficulty: 4,
    prompt:
      'The Philippine Professional Standards for Teachers (PPST) organises a teacher\u2019s career into which sequence of stages?',
    options: [
      'Beginning, Developing, Proficient, Distinguished',
      'Beginning, Proficient, Highly Proficient, Distinguished',
      'Novice, Intermediate, Advanced, Expert',
      'Provisional, Permanent, Master, Specialist',
    ],
    correctIndex: 1,
    explanation:
      'The PPST defines four career stages: Beginning, Proficient, Highly Proficient and Distinguished. "Developing" is a domain within the standards, not a career stage.',
    source: 'DepEd Order No. 42, s. 2017 (PPST); PRC CAE TOS',
  },
  {
    id: 'cae-a-005',
    subjectId: 'cae',
    topicId: 'cae-accountability',
    difficulty: 5,
    prompt:
      'A principal instructs a teacher to inflate the grades of learners who are behind so the school\u2019s report looks better. The teacher should:',
    options: [
      'Comply, because a principal\u2019s directive is binding',
      'Comply but record the real scores privately',
      'Refuse, because altering grades without valid grounds violates professional ethics and assessment integrity',
      'Resign immediately without raising the matter',
    ],
    correctIndex: 2,
    explanation:
      'Grades must reflect actual achievement; falsifying them breaches both the Code of Ethics and the integrity of assessment. Obligation to a supervisor does not override professional and ethical duty.',
    source: 'Code of Ethics for Professional Teachers; PRC CAE TOS',
  },

  // ------------------------------------------------------------------
  // Culture and Arts Education — Research and Extension
  // ------------------------------------------------------------------
  {
    id: 'cae-r-001',
    subjectId: 'cae',
    topicId: 'cae-research',
    difficulty: 2,
    prompt: 'Action research is best described as:',
    options: [
      'A large-scale survey conducted by a research institute',
      'A cyclical, practitioner-driven inquiry aimed at improving one\u2019s own practice',
      'A purely theoretical review of existing literature',
      'An experiment conducted in a laboratory setting',
    ],
    correctIndex: 1,
    explanation:
      'Action research is done by the practitioner, on the practitioner\u2019s own setting, in repeated cycles of planning, acting, observing and reflecting. Its purpose is local improvement, not generalisable theory.',
    source: 'Action research literature; PRC CAE TOS — Research and Extension',
  },
  {
    id: 'cae-r-002',
    subjectId: 'cae',
    topicId: 'cae-research',
    difficulty: 3,
    prompt: 'The four stages of the action research cycle are:',
    options: [
      'Plan, act, observe, reflect',
      'Hypothesise, test, publish, replicate',
      'Survey, interview, tabulate, report',
      'Design, sample, measure, generalise',
    ],
    correctIndex: 0,
    explanation:
      'Kemmis and McTaggart\u2019s action research spiral is plan, act, observe, reflect — then repeat. The other sequences describe conventional experimental research.',
    source: 'Kemmis & McTaggart, action research cycle; PRC CAE TOS',
  },
  {
    id: 'cae-r-003',
    subjectId: 'cae',
    topicId: 'cae-research',
    difficulty: 3,
    prompt:
      'A teacher records how often learners participate in art critique sessions by tallying the number of contributions per session. This is:',
    options: ['Qualitative data', 'Quantitative data', 'Theoretical data', 'Anecdotal data'],
    correctIndex: 1,
    explanation:
      'Counting and tallying produces numerical data, which is quantitative. Qualitative data would be the words and reasoning behind the contributions.',
    source: 'Research methods; PRC CAE TOS — Research and Extension',
  },
  {
    id: 'cae-r-004',
    subjectId: 'cae',
    topicId: 'cae-research',
    difficulty: 4,
    prompt:
      'Before publishing photographs of learners in an action research report, the teacher must first:',
    options: [
      'Ask the learners to sign the report',
      'Obtain informed consent from the learners and their parents or guardians',
      'Publish the photographs without names',
      'Submit the report to the school paper',
    ],
    correctIndex: 1,
    explanation:
      'Learners are minors, so informed consent must come from parents or guardians, and the learners themselves should assent. Removing names does not by itself satisfy the ethical requirement.',
    source: 'Research ethics with minor participants; PRC CAE TOS',
  },
  {
    id: 'cae-r-005',
    subjectId: 'cae',
    topicId: 'cae-research',
    difficulty: 4,
    prompt: 'In research, a variable is:',
    options: [
      'A conclusion drawn from the data',
      'Any factor that can change in value or characteristic',
      'A fixed condition that never changes',
      'The summary of the research findings',
    ],
    correctIndex: 1,
    explanation:
      'A variable is any characteristic that can take different values. The independent variable is manipulated; the dependent variable is measured.',
    source: 'Research methodology; PRC CAE TOS — Research and Extension',
  },

  // ------------------------------------------------------------------
  // Professional Education — Assessment of Learning
  // ------------------------------------------------------------------
  {
    id: 'pe-a-001',
    subjectId: 'profed',
    topicId: 'profed-assessment',
    difficulty: 1,
    prompt: 'A test given before instruction to find out what learners already know is:',
    options: ['Formative', 'Summative', 'Diagnostic', 'Norm-referenced'],
    correctIndex: 2,
    explanation:
      'Diagnostic assessment is administered before instruction to identify prior knowledge and gaps, so teaching can start from the right point. Formative is during; summative is after.',
    source: 'Assessment of learning; PRC ProfEd TOS area D (15%)',
  },
  {
    id: 'pe-a-002',
    subjectId: 'profed',
    topicId: 'profed-assessment',
    difficulty: 2,
    prompt:
      'A teacher checks learners\u2019 understanding with a quick exit ticket at the end of each lesson and adjusts the next lesson accordingly. This is assessment:',
    options: ['Of learning', 'For learning', 'As learning', 'Of and as learning'],
    correctIndex: 1,
    explanation:
      'Assessment for learning is formative: its purpose is to inform teaching and learning while it is still happening. Assessment of learning is summative.',
    source: 'Assessment of learning; PRC ProfEd TOS area D (15%)',
  },
  {
    id: 'pe-a-003',
    subjectId: 'profed',
    topicId: 'profed-assessment',
    difficulty: 3,
    prompt:
      'A test claims to measure artistic creativity but actually measures only the ability to recall definitions. The test lacks:',
    options: ['Reliability', 'Validity', 'Usability', 'Objectivity'],
    correctIndex: 1,
    explanation:
      'Validity is the degree to which a test measures what it claims to measure. Reliability is about consistency, not about what is being measured.',
    source: 'Assessment of learning; PRC ProfEd TOS area D (15%)',
  },
  {
    id: 'pe-a-004',
    subjectId: 'profed',
    topicId: 'profed-assessment',
    difficulty: 3,
    prompt:
      'In item analysis, the difficulty index of an item is the:',
    options: [
      'Proportion of examinees who answered the item correctly',
      'Difference between the highest and lowest scores',
      'Number of distractors chosen by high scorers',
      'Average score of the upper and lower groups',
    ],
    correctIndex: 0,
    explanation:
      'The difficulty index (p) is the proportion who got the item right. A high p means an easy item. The discrimination index is the separate measure that compares upper and lower groups.',
    source: 'Item analysis; PRC ProfEd TOS area D (15%)',
  },
  {
    id: 'pe-a-005',
    subjectId: 'profed',
    topicId: 'profed-assessment',
    difficulty: 4,
    prompt:
      'A teacher administers the same test to the same class twice within two weeks and gets very similar results. The test demonstrates:',
    options: ['Content validity', 'Test-retest reliability', 'Construct validity', 'Discrimination'],
    correctIndex: 1,
    explanation:
      'Test-retest reliability is the consistency of scores across two administrations. Validity would ask whether the test measures the right construct in the first place.',
    source: 'Assessment of learning; PRC ProfEd TOS area D (15%)',
  },
  {
    id: 'pe-a-006',
    subjectId: 'profed',
    topicId: 'profed-assessment',
    difficulty: 4,
    prompt:
      'An item that is answered correctly by almost all high scorers and almost no low scorers has:',
    options: [
      'A low discrimination index',
      'A high discrimination index',
      'A high difficulty index',
      'No relationship to discrimination',
    ],
    correctIndex: 1,
    explanation:
      'The discrimination index measures how well an item separates strong from weak examinees. Answering it correctly is a marker of high performance, so the index is high. Its difficulty index is moderate, not high.',
    source: 'Item analysis; PRC ProfEd TOS area D (15%)',
  },
  {
    id: 'pe-a-007',
    subjectId: 'profed',
    topicId: 'profed-assessment',
    difficulty: 5,
    prompt:
      'A teacher is grading a dance composition. Which is the most defensible practice?',
    options: [
      'Give every group the same grade so no one feels bad',
      'Grade on effort alone since talent varies',
      'Score each group against a rubric shared with learners before the task',
      'Rank the groups and assign grades on a curve',
    ],
    correctIndex: 2,
    explanation:
      'A rubric shared in advance makes the criteria transparent and the scoring consistent, which supports both validity and fairness. Grading on effort or on a curve substitutes non-achievement factors for the criteria.',
    source: 'Performance assessment and rubrics; PRC ProfEd TOS area D (15%)',
  },

  // ------------------------------------------------------------------
  // Professional Education — The Child and Adolescent Learners
  // ------------------------------------------------------------------
  {
    id: 'pe-l-001',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 1,
    prompt: 'According to Piaget, a child who has just achieved object permanence is in the:',
    options: [
      'Sensorimotor stage',
      'Preoperational stage',
      'Concrete operational stage',
      'Formal operational stage',
    ],
    correctIndex: 0,
    explanation:
      'Object permanence — knowing that things continue to exist when out of sight — develops in the sensorimotor stage (0-2 years).',
    source: 'Jean Piaget, cognitive development theory; PRC ProfEd TOS area C (20%)',
  },
  {
    id: 'pe-l-002',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 2,
    prompt:
      'A Grade 4 learner can now tell that the amount of water stays the same when poured into a narrower glass. This shows the learner has acquired:',
    options: ['Egocentrism', 'Conservation', 'Object permanence', 'Abstract reasoning'],
    correctIndex: 1,
    explanation:
      'Conservation — understanding that quantity does not change with a change in appearance — is the hallmark of the concrete operational stage (7-11). Egocentrism belongs to the earlier preoperational stage.',
    source: 'Jean Piaget, cognitive development theory; PRC ProfEd TOS area C (20%)',
  },
  {
    id: 'pe-l-003',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 3,
    prompt:
      'A learner insists that everyone sees the picture exactly as she does. According to Piaget this is:',
    options: ['Animism', 'Egocentrism', 'Centration', 'Conservation'],
    correctIndex: 1,
    explanation:
      'Egocentrism is the preoperational child\u2019s inability to take another person\u2019s viewpoint. Animism is attributing life to inanimate objects; centration is focusing on one dimension at a time.',
    source: 'Jean Piaget, cognitive development theory; PRC ProfEd TOS area C (20%)',
  },
  {
    id: 'pe-l-004',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 3,
    prompt:
      'Which Erikson stage is most characteristic of junior high school learners?',
    options: [
      'Trust vs Mistrust',
      'Industry vs Inferiority',
      'Identity vs Role Confusion',
      'Intimacy vs Isolation',
    ],
    correctIndex: 2,
    explanation:
      'Identity vs Role Confusion is the adolescent stage, roughly 12-18, and covers junior and senior high school. Industry vs Inferiority belongs to the elementary years.',
    source: 'Erik Erikson, psychosocial development; PRC ProfEd TOS area C (20%)',
  },
  {
    id: 'pe-l-005',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 3,
    prompt:
      'Vygotsky\u2019s zone of proximal development refers to the range of tasks a learner:',
    options: [
      'Can already do independently',
      'Cannot do even with help',
      'Can accomplish with guidance from a more capable other',
      'Has mastered through repetition',
    ],
    correctIndex: 2,
    explanation:
      'The ZPD sits between what a learner can do alone and what is out of reach, and is where instruction is most effective. Support within the ZPD is called scaffolding.',
    source: 'Lev Vygotsky, sociocultural theory; PRC ProfEd TOS area C (20%)',
  },
  {
    id: 'pe-l-006',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 4,
    prompt:
      'A teacher gives hints and prompts at the start of a task and gradually withdraws them as the learner succeeds. The teacher is applying:',
    options: ['Scaffolding', 'Reinforcement', 'Shaping', 'Modelling'],
    correctIndex: 0,
    explanation:
      'Scaffolding is temporary, gradually withdrawn support that keeps a task within the learner\u2019s ZPD. Reinforcement increases the likelihood of a behaviour; shaping reinforces successive approximations.',
    source: 'Vygotsky / Wood, Bruner & Ross, scaffolding; PRC ProfEd TOS area C (20%)',
  },
  {
    id: 'pe-l-007',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 5,
    prompt:
      'An adolescent who has not resolved the identity stage may be expected to:',
    options: [
      'Show strong commitment to a clear set of values',
      'Struggle with a coherent sense of self and shifting peer allegiances',
      'Regress to object permanence errors',
      'Lose the capacity for conservation',
    ],
    correctIndex: 1,
    explanation:
      'Unresolved Identity vs Role Confusion shows up as an unstable sense of self, uncertainty about values, and shifting group identifications. The cognitive achievements of earlier stages are not lost.',
    source: 'Erik Erikson, psychosocial development; PRC ProfEd TOS area C (20%)',
  },

  // ------------------------------------------------------------------
  // Professional Education — Curriculum, Methods and EdTech
  // ------------------------------------------------------------------
  {
    id: 'pe-c-001',
    subjectId: 'profed',
    topicId: 'profed-curriculum',
    difficulty: 3,
    prompt:
      'Stufflebeam\u2019s CIPP model evaluates curriculum in terms of:',
    options: [
      'Content, Instruction, Practice, Performance',
      'Context, Input, Process, Product',
      'Cognition, Interaction, Progress, Proficiency',
      'Concept, Inquiry, Participation, Portfolio',
    ],
    correctIndex: 1,
    explanation:
      'CIPP stands for Context, Input, Process and Product evaluation, and it is decision-oriented. Stake\u2019s Countenance Model is a separate framework built on antecedents, transactions and outcomes.',
    source: 'Stufflebeam, CIPP evaluation model; PRC ProfEd TOS area B (30%)',
  },
  {
    id: 'pe-c-002',
    subjectId: 'profed',
    topicId: 'profed-curriculum',
    difficulty: 2,
    prompt:
      'Which teaching strategy begins with a question or a problem for learners to investigate rather than with an explanation?',
    options: ['Direct instruction', 'Inquiry-based learning', 'Lecture method', 'Demonstration'],
    correctIndex: 1,
    explanation:
      'Inquiry-based learning opens with a question or problem that learners investigate to construct understanding. Direct instruction and lecture begin with the teacher\u2019s explanation.',
    source: 'Teaching methods; PRC ProfEd TOS area B (30%)',
  },
  {
    id: 'pe-c-003',
    subjectId: 'profed',
    topicId: 'profed-curriculum',
    difficulty: 4,
    prompt:
      'A teacher uses a simulation to let learners experience a real-world problem safely. The main advantage of simulation is that it:',
    options: [
      'Is always cheaper than fieldwork',
      'Provides controlled, repeatable practice of skills too risky or costly to practise for real',
      'Removes the need for assessment',
      'Replaces the teacher entirely',
    ],
    correctIndex: 1,
    explanation:
      'Simulations give learners authentic practice with the risk, cost or time of the real setting removed, and they can be repeated. Cost is sometimes a benefit but not the defining advantage.',
    source: 'Educational technology and methods; PRC ProfEd TOS area B (30%)',
  },
  {
    id: 'pe-c-004',
    subjectId: 'profed',
    topicId: 'profed-curriculum',
    difficulty: 4,
    prompt:
      'The cone of experience, from most concrete to most abstract, was proposed by:',
    options: ['Jerome Bruner', 'Edgar Dale', 'Benjamin Bloom', 'John Dewey'],
    correctIndex: 1,
    explanation:
      'Edgar Dale\u2019s Cone of Experience arranges learning experiences from direct, purposeful experience at the base to verbal symbols at the apex. Bruner\u2019s parallel framework is enactive, iconic and symbolic.',
    source: 'Edgar Dale, Audio-Visual Methods in Teaching; PRC ProfEd TOS area B (30%)',
  },
  {
    id: 'pe-c-005',
    subjectId: 'profed',
    topicId: 'profed-curriculum',
    difficulty: 3,
    prompt: 'Curriculum alignment means ensuring that:',
    options: [
      'Objectives, learning activities and assessment all target the same competencies',
      'Every teacher uses identical lesson plans',
      'Learners take the same test nationwide',
      'Textbooks are chosen before objectives',
    ],
    correctIndex: 0,
    explanation:
      'Constructive alignment matches intended learning outcomes, the activities learners do, and the assessment used to judge them. Standardising lesson plans or tests is a different concern.',
    source: 'Curriculum development; PRC ProfEd TOS area B (30%)',
  },
  {
    id: 'pe-c-006',
    subjectId: 'profed',
    topicId: 'profed-curriculum',
    difficulty: 5,
    prompt:
      'A teacher wants learners to take responsibility for their own learning progress. The most appropriate use of technology is to:',
    options: [
      'Show a recorded lecture for the whole period',
      'Have learners track their own goals and progress in a shared digital portfolio',
      'Post the same worksheet every week online',
      'Replace discussion with an automated quiz generator',
    ],
    correctIndex: 1,
    explanation:
      'A digital portfolio makes goals, evidence and progress visible to the learner, which builds metacognition and ownership. Passive media consumption does not shift responsibility to the learner.',
    source: 'Educational technology; PRC ProfEd TOS area B (30%)',
  },

  // ------------------------------------------------------------------
  // Professional Education — Teaching Profession
  // ------------------------------------------------------------------
  {
    id: 'pe-t-001',
    subjectId: 'profed',
    topicId: 'profed-teaching-profession',
    difficulty: 2,
    prompt: 'The legal basis of the K to 12 program in the Philippines is:',
    options: ['RA 9155', 'RA 10533', 'RA 7836', 'RA 4670'],
    correctIndex: 1,
    explanation:
      'RA 10533, the Enhanced Basic Education Act of 2013, added kindergarten and senior high school. RA 9155 governs basic education governance; RA 7836 professionalised teaching.',
    source: 'Republic Act 10533; PRC ProfEd TOS area A (15%)',
  },
  {
    id: 'pe-t-002',
    subjectId: 'profed',
    topicId: 'profed-teaching-profession',
    difficulty: 3,
    prompt: 'The Governance of Basic Education Act of 2001, which created school-based management, is:',
    options: ['RA 9155', 'RA 10533', 'RA 4670', 'RA 7722'],
    correctIndex: 0,
    explanation:
      'RA 9155 restructured DepEd, defined the roles of the regional, division, district and school levels, and made the school head the key management figure at the school level.',
    source: 'Republic Act 9155; PRC ProfEd TOS area A (15%)',
  },
  {
    id: 'pe-t-003',
    subjectId: 'profed',
    topicId: 'profed-teaching-profession',
    difficulty: 4,
    prompt:
      'A teacher maintains a portfolio of lesson plans, reflection notes and learner work samples for the year. The main professional purpose is to:',
    options: [
      'Satisfy a requirement with the least effort',
      'Document and reflect on professional growth as evidence for evaluation',
      'Compare learners against each other',
      'Replace formal observation entirely',
    ],
    correctIndex: 1,
    explanation:
      'A teaching portfolio is a reflective record of practice used as evidence of growth and performance. It complements, rather than replaces, classroom observation.',
    source: 'PPST and RPMS; PRC ProfEd TOS area A (15%)',
  },
  {
    id: 'pe-t-004',
    subjectId: 'profed',
    topicId: 'profed-teaching-profession',
    difficulty: 4,
    prompt:
      'Which of the following best reflects the principle that teaching is a profession rather than a job?',
    options: [
      'It is performed for a salary',
      'It requires a licence, a body of specialised knowledge, and adherence to a code of ethics',
      'It is done in a classroom',
      'It is supervised by a principal',
    ],
    correctIndex: 1,
    explanation:
      'The defining marks of a profession are a licensure requirement, a specialised knowledge base, autonomy in judgement and a code of ethics — not the location, the pay or the supervision.',
    source: 'The teaching profession; PRC ProfEd TOS area A (15%)',
  },

  // ------------------------------------------------------------------
  // Professional Education — Field Study and Teaching Internship
  // ------------------------------------------------------------------
  {
    id: 'pe-f-001',
    subjectId: 'profed',
    topicId: 'profed-field-study',
    difficulty: 2,
    prompt: 'Reflective teaching requires the teacher to:',
    options: [
      'Repeat the same lesson exactly each year',
      'Examine what happened in a lesson and adjust future practice accordingly',
      'Record only the learners\u2019 errors',
      'Rely entirely on the textbook',
    ],
    correctIndex: 1,
    explanation:
      'Reflection turns experience into learning: the teacher reviews the lesson, asks what worked and why, and changes the next iteration. Repetition without reflection is not reflective practice.',
    source: 'Reflective practice; PRC ProfEd TOS area E (20%)',
  },
  {
    id: 'pe-f-002',
    subjectId: 'profed',
    topicId: 'profed-field-study',
    difficulty: 3,
    prompt:
      'During practice teaching, a cooperating teacher advises that classroom routines should be established in the first weeks. The reason is that routines:',
    options: [
      'Make the class quieter for the teacher',
      'Reduce time lost to management so more time goes to learning',
      'Are required by DepEd order',
      'Replace the need for rules',
    ],
    correctIndex: 1,
    explanation:
      'Predictable routines remove ambiguity about what to do next, cutting transition time and disruptive behaviour, which returns instructional time to learning.',
    source: 'Classroom management; PRC ProfEd TOS area E (20%)',
  },
  {
    id: 'pe-f-003',
    subjectId: 'profed',
    topicId: 'profed-field-study',
    difficulty: 4,
    prompt:
      'In action research conducted during internship, the problem statement should be:',
    options: [
      'As broad as possible to cover all concerns',
      'Specific, observable and within the intern\u2019s power to influence',
      'Written only after the intervention is complete',
      'Chosen by the cooperating teacher alone',
    ],
    correctIndex: 1,
    explanation:
      'Action research addresses a real, local problem the practitioner can act on, so it must be narrow and observable. A broad problem cannot be resolved within one cycle.',
    source: 'Action research in teaching internship; PRC ProfEd TOS area E (20%)',
  },

  // ------------------------------------------------------------------
  // General Education — Art Appreciation
  // ------------------------------------------------------------------
  {
    id: 'ge-art-001',
    subjectId: 'gened',
    topicId: 'gened-art-appreciation',
    difficulty: 2,
    prompt: 'Art appreciation is primarily concerned with:',
    options: [
      'Memorising the dates of artworks',
      'Developing the ability to perceive, interpret and evaluate art',
      'Learning to paint realistically',
      'Cataloguing museum collections',
    ],
    correctIndex: 1,
    explanation:
      'Art appreciation builds the viewer\u2019s capacity to notice, interpret and judge works using knowledge of elements, principles and context. Technical production is a separate concern.',
    source: 'Art appreciation; PRC GenEd TOS',
  },
  {
    id: 'ge-art-002',
    subjectId: 'gened',
    topicId: 'gened-art-appreciation',
    difficulty: 4,
    prompt:
      'An artist uses a single bright red figure against a muted grey background. The principle most clearly at work is:',
    options: ['Rhythm', 'Emphasis', 'Pattern', 'Proportion'],
    correctIndex: 1,
    explanation:
      'Emphasis draws the viewer\u2019s attention to a focal point, often through contrast of colour or value. Rhythm and pattern require repetition; proportion concerns relative size.',
    source: 'Principles of art; PRC GenEd TOS',
  },

  // ------------------------------------------------------------------
  // General Education — Rizal
  // ------------------------------------------------------------------
  {
    id: 'ge-riz-001',
    subjectId: 'gened',
    topicId: 'gened-rizal',
    difficulty: 1,
    prompt: 'Jose Rizal\u2019s first novel, Noli Me Tangere, was published in:',
    options: ['1887', '1891', '1896', '1898'],
    correctIndex: 0,
    explanation:
      'Noli Me Tangere was published in Berlin in 1887. Its sequel, El Filibusterismo, followed in Ghent in 1891.',
    source: 'Jose Rizal, Noli Me Tangere (1887); PRC GenEd TOS',
  },
  {
    id: 'ge-riz-002',
    subjectId: 'gened',
    topicId: 'gened-rizal',
    difficulty: 3,
    prompt: 'El Filibusterismo is dedicated to:',
    options: [
      'The memory of the Gomburza',
      'Rizal\u2019s parents',
      'The Propaganda Movement',
      'The ilustrados of Madrid',
    ],
    correctIndex: 0,
    explanation:
      'Rizal dedicated El Filibusterismo to the memory of the three priests Gomez, Burgos and Zamora — the Gomburza — executed in 1872 after the Cavite mutiny.',
    source: 'Jose Rizal, El Filibusterismo (1891); PRC GenEd TOS',
  },
  {
    id: 'ge-riz-003',
    subjectId: 'gened',
    topicId: 'gened-rizal',
    difficulty: 4,
    prompt: 'The Rizal Law, which mandates the study of Rizal\u2019s life and works, is:',
    options: ['RA 1425', 'RA 4670', 'RA 7836', 'RA 10533'],
    correctIndex: 0,
    explanation:
      'RA 1425, passed in 1956, requires all Philippine schools to offer courses on Rizal\u2019s life, works and writings, particularly the two novels.',
    source: 'Republic Act 1425 (Rizal Law); PRC GenEd TOS',
  },

  // ------------------------------------------------------------------
  // General Education — Philippine History
  // ------------------------------------------------------------------
  {
    id: 'ge-his-001',
    subjectId: 'gened',
    topicId: 'gened-history',
    difficulty: 2,
    prompt: 'The primary source for the 1521 Battle of Mactan is the chronicle of:',
    options: ['Antonio Pigafetta', 'Miguel Lopez de Legazpi', 'Juan de Plasencia', 'Pedro Chirino'],
    correctIndex: 0,
    explanation:
      'Antonio Pigafetta, the chronicler of Magellan\u2019s expedition, recorded the battle in which Magellan was killed by Lapulapu\u2019s forces on 27 April 1521.',
    source: 'Pigafetta\u2019s chronicle; PRC GenEd TOS — Readings in Philippine History',
  },
  {
    id: 'ge-his-002',
    subjectId: 'gened',
    topicId: 'gened-history',
    difficulty: 3,
    prompt: 'The Kartilya ng Katipunan was written by:',
    options: ['Andres Bonifacio', 'Emilio Jacinto', 'Emilio Aguinaldo', 'Apolinario Mabini'],
    correctIndex: 1,
    explanation:
      'Emilio Jacinto, the "Brains of the Katipunan", wrote the Kartilya, the society\u2019s code of conduct. Bonifacio wrote the earlier Decalogue.',
    source: 'Kartilya ng Katipunan; PRC GenEd TOS — Readings in Philippine History',
  },
  {
    id: 'ge-his-003',
    subjectId: 'gened',
    topicId: 'gened-history',
    difficulty: 4,
    prompt: 'The Malolos Constitution of 1899 is significant because it:',
    options: [
      'Established the First Philippine Republic',
      'Ended the Philippine Revolution',
      'Created the public school system',
      'Ceded the Philippines to the United States',
    ],
    correctIndex: 0,
    explanation:
      'The Malolos Constitution established the First Philippine Republic under Emilio Aguinaldo, Asia\u2019s first constitutional republic. The Philippines was ceded to the United States by the 1898 Treaty of Paris.',
    source: 'Malolos Constitution (1899); PRC GenEd TOS — Readings in Philippine History',
  },
  {
    id: 'ge-his-004',
    subjectId: 'gened',
    topicId: 'gened-history',
    difficulty: 4,
    prompt: 'Under the Treaty of Paris of 1898, Spain ceded the Philippines to the United States for:',
    options: ['USD 20 million', 'USD 2 million', 'USD 200,000', 'Nothing; it was a gift'],
    correctIndex: 0,
    explanation:
      'The Treaty of Paris transferred the Philippines to the United States for USD 20 million, which triggered the Philippine-American War.',
    source: 'Treaty of Paris (1898); PRC GenEd TOS — Readings in Philippine History',
  },
];

export const SEED_QUESTIONS: readonly Question[] = SEEDS.map((seed) => ({
  ...seed,
  status: 'approved' as const,
}));

/** Convenience lookups used by the pages. */
export const QUESTION_COUNT = SEED_QUESTIONS.length;
