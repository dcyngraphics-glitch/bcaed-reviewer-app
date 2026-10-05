import type { Question, Difficulty } from '../types/content';

/**
 * Situational question bank.
 *
 * Every item here is ORIGINAL — written for this app, not copied from any
 * reviewer. The user's own reviewer files are used only as a specification of
 * the exam's shape, never as a source of text.
 *
 * The shape mirrors exam day, where roughly 80% of the paper is built this way:
 *   1. A vignette — a scenario, a classroom situation, or a definitional
 *      paragraph — sits BEFORE the question.
 *   2. The actual question is the final sentence and asks for application.
 *   3. The discriminating detail is buried MID-CHOICE. The first four or five
 *      words of every option are near-identical, so pattern-matching the
 *      opening gets you nothing.
 *
 * Sources are cited per item. Facts were verified against:
 *  - NCCA, Order of National Artists (ncca.gov.ph)
 *  - NCCA, Gawad sa Manlilikha ng Bayan awardees
 *  - Presidential Proclamation No. 427, s. 2023 (the 2023 GAMABA conferment)
 *  - PRC Board for Professional Teachers Resolution No. 11, s. 2025
 *  - PRC–CHED Joint Memorandum Circular, 10 April 2025 (CMO 82 s. 2017)
 *  - RA 7355 (Gawad sa Manlilikha ng Bayan Act), RA 10533, RA 9155, RA 7836
 *  - DepEd Order No. 42, s. 2017 (PPST)
 */

interface Seed {
  id: string;
  subjectId: string;
  topicId: string;
  difficulty: Difficulty;
  /** The set-up. Rendered above the question. */
  vignette: string;
  /** The actual question — the last sentence of the item. */
  prompt: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
  /** What the item tests, stated plainly. */
  rationale: string;
  source: string;
}

const SEEDS: readonly Seed[] = [
  // ==================================================================
  // Culture and Arts Education — Disciplinal Knowledge
  // ==================================================================
  {
    id: 'sit-cae-d-001',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 5,
    vignette:
      'A Grade 8 class is studying the Gawad sa Manlilikha ng Bayan, the National Living Treasures Award. The teacher explains that the award was institutionalised by Republic Act No. 7355 in April 1992, and that it is administered by the National Commission for Culture and the Arts through a dedicated Executive Council. The award does not recognise a single masterpiece. Instead, it recognises a practitioner who has attained the highest level of skill in a traditional art and who has demonstrated a commitment to passing that skill on. The teacher then asks the class to distinguish this award from the Order of National Artists, which the students studied the previous week.',
    prompt:
      'Which of the following statements most accurately distinguishes the Gawad sa Manlilikha ng Bayan from the Order of National Artists?',
    options: [
      'The Gawad sa Manlilikha ng Bayan is conferred on traditional and folk practitioners for safeguarding an indigenous art form, whereas the Order of National Artists recognises individual artists for their contribution to the development of Philippine arts across defined categories.',
      'The Gawad sa Manlilikha ng Bayan is conferred on living artists only, whereas the Order of National Artists is conferred posthumously in most cases and therefore recognises a different stage of an artist\u2019s career.',
      'The Gawad sa Manlilikha ng Bayan is administered by the Cultural Center of the Philippines, whereas the Order of National Artists is administered by the National Commission for Culture and the Arts.',
      'The Gawad sa Manlilikha ng Bayan is awarded every year to several practitioners at once, whereas the Order of National Artists is awarded only once every ten years to a single recipient.',
    ],
    correctIndex: 0,
    explanation:
      'The two awards recognise different things. The Gawad sa Manlilikha ng Bayan, created by RA 7355 and administered by the NCCA, honours traditional and folk practitioners who have mastered an indigenous art form and who work to transmit it \u2014 the award is explicitly about safeguarding a living tradition. The Order of National Artists, jointly administered by the NCCA and the CCP, recognises individual artists for their contribution to the development of Philippine arts across eight categories: Music, Dance, Theater, Visual Arts, Literature, Film and Broadcast Arts, and Architecture and Allied Arts.',
    rationale:
      'Distinguishing two national arts honours by what each one recognises, not by who administers them or how often they are given.',
    source: 'RA 7355; NCCA, Order of National Artists; NCCA, Gawad sa Manlilikha ng Bayan',
  },
  {
    id: 'sit-cae-d-002',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 5,
    vignette:
      'A teacher is preparing a lesson on the T\u2019boli people of Lake Sebu, South Cotabato. She gathers materials on three T\u2019boli practitioners who were declared Manlilikha ng Bayan in the 2023 conferment: Lang Dulay, who was honoured in 1998 for abaca-ikat weaving; Barbara Kibed Ofong, honoured for t\u2019nalak ikat weaving; and Rosie Godwino Sula, honoured for lingon chanting. She also notes that Bundos Bansil Fara, a T\u2019boli brass caster, was declared in the same 2023 cycle for the temwel tradition. The teacher wants her students to understand that a single community can be the custodian of several distinct traditional arts.',
    prompt:
      'Which of the following best explains why several Manlilikha ng Bayan have come from the same T\u2019boli community of Lake Sebu?',
    options: [
      'Because the award is allocated by region, and South Cotabato has been given a fixed number of slots in each conferment cycle since the award was institutionalised.',
      'Because the T\u2019boli community sustains several distinct traditional art forms \u2014 weaving, brass casting and chanting among them \u2014 each with its own master practitioner, and the award recognises a practitioner\u2019s mastery of one specific tradition rather than the community as a whole.',
      'Because the T\u2019boli are the largest indigenous group in Mindanao, and the award is therefore proportioned to the size of an ethnic group\u2019s population.',
      'Because the award recognises a family lineage rather than an individual, so once one T\u2019boli practitioner is honoured the honour extends to their relatives in the same cycle.',
    ],
    correctIndex: 1,
    explanation:
      'The award is conferred on an individual practitioner for mastery of one specific traditional art. The T\u2019boli of Lake Sebu sustain several distinct traditions \u2014 t\u2019nalak ikat weaving, temwel brass casting, and lingon chanting among them \u2014 so it is expected that more than one T\u2019boli practitioner would be recognised, each for a different art form. There is no regional quota, no population-based proportioning, and the award does not pass down a family line.',
    rationale:
      'The award recognises an individual\u2019s mastery of one art form; multiple awardees from one community reflect that community\u2019s range of traditions.',
    source:
      'Presidential Proclamation No. 427, s. 2023; NCCA, Gawad sa Manlilikha ng Bayan awardees',
  },
  {
    id: 'sit-cae-d-003',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 4,
    vignette:
      'In a lesson on Philippine folk dance, a teacher presents two dances that both use bamboo poles. The first is Tinikling, from Leyte, in which dancers step in and out between two poles that are clapped together on the ground, taking their name from the tikling bird. The second is Singkil, a Maranao dance that also employs bamboo poles but is staged as a royal dance and draws its narrative from the Darangen, the Maranao epic. A student asks why the two dances are often confused with each other.',
    prompt:
      'Which of the following best explains why Tinikling and Singkil are frequently confused despite their different origins?',
    options: [
      'Because both dances were choreographed by the same National Artist for Dance during the same period of revival in the 1950s.',
      'Because both dances share the same identifying prop \u2014 bamboo poles clapped on the ground \u2014 even though they come from different regions and carry entirely different narratives, so the shared prop masks the difference in origin and meaning.',
      'Because both dances originated in the Visayas and were later adopted by the Maranao and the Leyte\u00f1o communities respectively.',
      'Because both dances are performed exclusively by women, and the gender restriction makes the two traditions difficult to tell apart in performance.',
    ],
    correctIndex: 1,
    explanation:
      'The confusion is caused by the shared prop. Both dances use bamboo poles clapped on the ground, and that is the single most memorable feature of each. But Tinikling is a Leyte folk dance named for the tikling bird and imitating its movements, while Singkil is a Maranao royal dance drawn from the Darangen epic and associated with the story of Princess Gandingan. The prop is the same; the region, the narrative and the social function are not.',
    rationale:
      'Identifying a dance by its prop alone is unreliable \u2014 the prop can be shared across unrelated traditions.',
    source: 'Philippine folk dance literature; PRC CAE TOS \u2014 Disciplinal Knowledge',
  },
  {
    id: 'sit-cae-d-004',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 5,
    vignette:
      'A teacher is discussing the elements and principles of art with a class that keeps mixing the two up. She explains that elements are the raw ingredients an artist works with \u2014 line, shape, form, colour, value, texture and space \u2014 while principles are the ways those ingredients are organised, such as balance, emphasis, movement, pattern, rhythm, unity and variety. She then shows the class a mural in which a single bright red figure stands against a muted grey background, drawing every viewer\u2019s eye to that figure before anything else in the composition.',
    prompt:
      'Which principle of art is most clearly at work in the mural the teacher showed, and why?',
    options: [
      'The principle at work is rhythm, because the repetition of the grey tones across the background creates a sense of movement that carries the viewer toward the red figure.',
      'The principle at work is emphasis, because the contrast in colour and value between the red figure and the muted grey background establishes a focal point that directs the viewer\u2019s attention.',
      'The principle at work is proportion, because the red figure is larger relative to the background than the other shapes in the composition.',
      'The principle at work is variety, because the mural uses more than one colour and therefore provides visual interest across the whole surface.',
    ],
    correctIndex: 1,
    explanation:
      'Emphasis is the principle of drawing the viewer\u2019s attention to a focal point, and it is most often achieved through contrast \u2014 in this case the contrast of a saturated red against desaturated greys. Rhythm requires repetition, which the mural does not use to create movement. Proportion concerns relative size, and the item does not say the figure is larger. Variety is about visual interest across a composition, not about directing attention to one point.',
    rationale:
      'Naming the principle that produces a described visual effect, and rejecting the principles that would require features the description does not mention.',
    source: 'Elements and principles of art; PRC CAE TOS \u2014 Disciplinal Knowledge',
  },
  {
    id: 'sit-cae-d-005',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 5,
    vignette:
      'A teacher shows her class three works and asks them to match each to its maker. The first is the Spoliarium, a monumental 1884 canvas depicting fallen gladiators being dragged from an arena, which won a gold medal at the Madrid Exposition and now hangs in the National Museum of Fine Arts. The second is the Oblation, the iconic figure of a naked man with arms outstretched that has become the symbol of the University of the Philippines. The third is a backlit rural landscape of a woman carrying a harvest, painted by the artist known as the \u201cGrand Old Man of Philippine Art\u201d.',
    prompt:
      'Which of the following correctly identifies the makers of the three works described?',
    options: [
      'The Spoliarium by Felix Resurreccion Hidalgo, the Oblation by Guillermo Tolentino, and the rural landscape by Juan Luna.',
      'The Spoliarium by Juan Luna, the Oblation by Guillermo Tolentino, and the rural landscape by Fernando Amorsolo.',
      'The Spoliarium by Juan Luna, the Oblation by Napoleon Abueva, and the rural landscape by Fernando Amorsolo.',
      'The Spoliarium by Felix Resurreccion Hidalgo, the Oblation by Napoleon Abueva, and the rural landscape by Carlos Francisco.',
    ],
    correctIndex: 1,
    explanation:
      'Juan Luna painted the Spoliarium in 1884. Guillermo Tolentino, later a National Artist for Sculpture, created the Oblation in 1935. Fernando Amorsolo, the \u201cGrand Old Man of Philippine Art\u201d, is known for backlit rural scenes. Napoleon Abueva was Tolentino\u2019s student and is called the \u201cFather of Modern Philippine Sculpture\u201d, but he did not make the Oblation. Felix Resurreccion Hidalgo painted Las V\u00edrgenes Cristianas Expuestas al Populacho, not the Spoliarium.',
    rationale:
      'Matching three canonical Philippine works to their makers, and rejecting the near-miss pairings that the exam relies on.',
    source: 'Philippine art history; PRC CAE TOS \u2014 Disciplinal Knowledge',
  },
  {
    id: 'sit-cae-d-006',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 5,
    vignette:
      'A teacher is explaining Philippine gong traditions to a class that has conflated them. She describes one tradition in which a rack of small horizontal gongs is played melodically, with the player striking the bosses in a fixed melodic pattern, and which forms the melodic core of Maguindanao and Maranao ensembles. She then describes a second tradition from the Cordillera in which flat gongs are struck with the palm or with a stick, producing a rhythmic rather than a melodic function, and which is played in ensembles that accompany community rituals.',
    prompt:
      'Which of the following correctly names the two traditions the teacher described, in the order she described them?',
    options: [
      'The first is the gangsa of the Cordillera, and the second is the kulintang of the Maguindanao and Maranao.',
      'The first is the kulintang of the Maguindanao and Maranao, and the second is the gangsa of the Cordillera.',
      'The first is the agung of the Maguindanao, and the second is the gabbang of the Tausug.',
      'The first is the tongatong of the Kalinga, and the second is the babandil of the Maranao.',
    ],
    correctIndex: 1,
    explanation:
      'Kulintang is a rack of small horizontal gongs played melodically, and it is central to Maguindanao and Maranao music. Gangsa are the flat gongs of the Cordillera, struck with the palm or a stick, serving a rhythmic function in ritual ensembles. The agung is a large suspended gong, the gabbang is a bamboo xylophone, and the tongatong are stamped bamboo tubes \u2014 none of which matches the description given.',
    rationale:
      'Distinguishing a melodic horizontal-gong tradition from a rhythmic flat-gong tradition by how each is played and what it does in the ensemble.',
    source: 'Philippine music literature; PRC CAE TOS \u2014 Disciplinal Knowledge',
  },
  {
    id: 'sit-cae-d-007',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 5,
    vignette:
      'A teacher is discussing the Order of National Artists with her class. She explains that the order is the highest national recognition for Filipino individuals who have contributed to the development of Philippine arts, that it is jointly administered by the National Commission for Culture and the Arts and the Cultural Center of the Philippines, and that it is conferred by the President on the recommendation of both institutions. She notes that the categories include Music, Dance, Theater, Visual Arts, Literature, Film and Broadcast Arts, and Architecture and Allied Arts. She then asks the class which of the following artists was recognised in the Dance category.',
    prompt:
      'Which of the following artists was recognised as a National Artist for Dance?',
    options: [
      'The National Artist for Dance is Francisca Reyes Aquino, honoured for her research into and documentation of Philippine folk dances.',
      'The National Artist for Dance is Honorata \u201cAtang\u201d dela Rama, honoured for her contributions to the Philippine stage.',
      'The National Artist for Dance is Levi Celerio, honoured for his work as a composer and lyricist.',
      'The National Artist for Dance is Carlos \u201cBotong\u201d Francisco, honoured for his historical murals.',
    ],
    correctIndex: 0,
    explanation:
      'Francisca Reyes Aquino is a National Artist for Dance, recognised for her pioneering research into and documentation of Philippine folk dances. Honorata \u201cAtang\u201d dela Rama was honoured in both Music and Theater. Levi Celerio was a National Artist for Music. Carlos \u201cBotong\u201d Francisco was a National Artist for Visual Arts. The item tests whether the student knows the category each artist belongs to, not merely the name.',
    rationale:
      'Attributing National Artists to their correct category rather than recognising the names alone.',
    source: 'NCCA, Order of National Artists',
  },

  // ==================================================================
  // Culture and Arts Education — Pedagogical Practice
  // ==================================================================
  {
    id: 'sit-cae-p-001',
    subjectId: 'cae',
    topicId: 'cae-pedagogy',
    difficulty: 5,
    vignette:
      'A music teacher wants her Grade 7 class to internalise the relationship between pitches in a scale before she introduces any notation. In each lesson she sings a short folk song with the class, and as they sing she shapes her hand at different heights, moving it up and down to show each scale degree\u2019s position relative to the others. She does not name the notes and does not use the staff. By the end of the term, the students can sing a song they have never seen before by following her hand, and they can tell when a pitch is out of place.',
    prompt:
      'Which approach to music teaching is the teacher applying, and what is the function of the hand signs she uses?',
    options: [
      'The approach the teacher is applying is the Orff approach, in which hand signs indicate the dynamic level of each phrase so that the class can shape the song\u2019s expression as it sings.',
      'The approach the teacher is applying is the Kod\u00e1ly method, in which hand signs give each scale degree a physical position in space so that singers internalise pitch relationships \u2014 the basis of movable-do sight-singing.',
      'The approach the teacher is applying is the Dalcroze approach, in which hand signs mark the beat so that the class can maintain a steady tempo while moving around the room.',
      'The approach the teacher is applying is the Suzuki method, in which hand signs replace written notation entirely so that young learners never depend on reading music.',
    ],
    correctIndex: 1,
    explanation:
      'Curwen\u2013Kod\u00e1ly hand signs give each scale degree a physical position in space, so a singer learns the relationship between pitches through the body before meeting notation. That is what allows the class to sing an unfamiliar song from the hand alone. Orff uses speech, movement and percussion rather than hand signs for pitch. Dalcroze teaches through whole-body movement to rhythm, not through hand signs for pitch. Suzuki is the mother-tongue approach, beginning instrumental study by ear at a very young age \u2014 it does not use hand signs.',
    rationale:
      'Identifying a specialist method from its defining technique, and distinguishing it from the three other named methods.',
    source: 'Music education methodology; PRC CAE TOS \u2014 Pedagogical Practice',
  },
  {
    id: 'sit-cae-p-002',
    subjectId: 'cae',
    topicId: 'cae-pedagogy',
    difficulty: 5,
    vignette:
      'An art teacher wants her students to engage with a painting beyond describing what they can see. She structures a unit in which the class first paints their own composition using the same subject matter, then researches the period in which the original was made and the circumstances of its creation, then writes a critique of the original using criteria the class agreed on, and finally debates whether the work should be considered beautiful and why. She shares the four-part structure with the class at the start of the unit so they know where each activity is heading.',
    prompt:
      'Which framework for art education is the teacher applying, and what are its four components?',
    options: [
      'The framework the teacher is applying is Visual Thinking Strategies, whose four components are describing, interpreting, questioning and revising.',
      'The framework the teacher is applying is Discipline-Based Art Education, whose four components are art production, art history, art criticism and aesthetics.',
      'The framework the teacher is applying is the Reggio Emilia approach, whose four components are observation, documentation, provocation and reflection.',
      'The framework the teacher is applying is Teaching for Artistic Behavior, whose four components are choice, studio practice, critique and exhibition.',
    ],
    correctIndex: 1,
    explanation:
      'Discipline-Based Art Education organises art learning around four disciplines: art production (the students paint), art history (they research the period and circumstances), art criticism (they write a critique against agreed criteria), and aesthetics (they debate the nature of beauty). Visual Thinking Strategies is a discussion method built on open-ended questioning about an image, with no production component. Reggio Emilia is an early-childhood philosophy, and Teaching for Artistic Behavior is a choice-based studio model \u2014 neither is structured around these four disciplines.',
    rationale:
      'Recognising DBAE from its four named disciplines, and rejecting frameworks that are discussion- or studio-based rather than discipline-based.',
    source: 'Discipline-Based Art Education (Getty Center); PRC CAE TOS \u2014 Pedagogical Practice',
  },
  {
    id: 'sit-cae-p-003',
    subjectId: 'cae',
    topicId: 'cae-pedagogy',
    difficulty: 5,
    vignette:
      'A teacher assigns a group project on the elements of art. She divides the class into five home groups. Within each home group, one member is assigned to become an expert on line, another on colour, another on texture, another on form, and another on space. The experts then leave their home groups and meet as an expert group to study their assigned element in depth. Afterwards each expert returns to their home group and teaches that element to the other four members, so that every home group ends up with a complete set of five experts.',
    prompt:
      'Which cooperative learning strategy is the teacher using, and why is the expert-group stage essential to it?',
    options: [
      'The strategy the teacher is using is Think-Pair-Share, and the expert-group stage is essential because it gives each student a private moment to rehearse an answer before speaking to a partner.',
      'The strategy the teacher is using is Jigsaw, and the expert-group stage is essential because it is where each student acquires the expertise they will later be responsible for teaching to their home group \u2014 creating interdependence, since no group can succeed unless every member contributes.',
      'The strategy the teacher is using is Student Teams-Achievement Divisions, and the expert-group stage is essential because it is where teams are quizzed individually so that scores can be compared against a team average.',
      'The strategy the teacher is using is Numbered Heads Together, and the expert-group stage is essential because it is where the teacher calls a number at random and that student answers for the whole team.',
    ],
    correctIndex: 1,
    explanation:
      'The Jigsaw method splits content into expert groups and then redistributes members so each home group holds a full set of expertise. The expert stage is what creates positive interdependence: each student is the only source of their element for their home group, so the group cannot complete the task unless every member teaches accurately. Think-Pair-Share is a brief paired discussion, STAD uses team quizzes and improvement scores, and Numbered Heads Together uses random individual accountability \u2014 none of them uses an expert-group stage.',
    rationale:
      'Identifying Jigsaw from the expert-group structure, and explaining the interdependence that structure creates.',
    source: 'Cooperative learning literature (Aronson, Jigsaw); PRC CAE TOS \u2014 Pedagogical Practice',
  },
  {
    id: 'sit-cae-p-004',
    subjectId: 'cae',
    topicId: 'cae-pedagogy',
    difficulty: 5,
    vignette:
      'A teacher is planning a unit on local festivals. Rather than lecturing, she designs a sequence in which her students first identify a festival celebrated in their own barangay, then interview a folk artist or elder who participates in it, then document what they learn through photographs, recordings and written notes, and finally mount an exhibit for the school community that presents the festival and credits the people they interviewed. She allocates three weeks to the unit and arranges for the class to visit the barangay twice.',
    prompt:
      'What is the primary educational value of designing the unit this way?',
    options: [
      'The primary value of the design is that it covers the greatest number of festival topics within the shortest possible teaching time, which is the main constraint in a crowded curriculum.',
      'The primary value of the design is that it connects art learning to an authentic cultural context and to the learners\u2019 own community, so that the study of art is grounded in lived heritage and in the people who sustain it rather than in a textbook description.',
      'The primary value of the design is that it guarantees higher scores on the written assessment because students remember material they have gathered themselves more reliably than material they have been told.',
      'The primary value of the design is that it keeps the learners occupied during periods when the teacher is absent, since the fieldwork can proceed with minimal supervision.',
    ],
    correctIndex: 1,
    explanation:
      'The design is culturally responsive and authentic: it grounds art in the learners\u2019 own community, involves the actual practitioners of the tradition, and produces work with a real audience. Coverage of many topics is not the aim of the design and would in fact be reduced by spending three weeks on one festival. Higher test scores are a possible side effect, not the primary value. And the design requires substantial teacher involvement, not less of it.',
    rationale:
      'Recognising culturally responsive, authentic learning as the design rationale rather than judging the unit by coverage or test outcomes.',
    source: 'Culturally responsive pedagogy; PRC CAE TOS \u2014 Pedagogical Practice',
  },
  {
    id: 'sit-cae-p-005',
    subjectId: 'cae',
    topicId: 'cae-pedagogy',
    difficulty: 5,
    vignette:
      'A teacher asks her class to compare two folk dances they have studied and to explain how the movement vocabulary of each reflects the environment and livelihood of its region. One dance uses light, hopping steps that imitate a bird moving among grass stems; the other uses heavy, grounded steps with a low centre of gravity, performed by dancers who carry loads. The teacher does not ask the class to describe the dances; she asks them to explain the relationship between the movement and the place it comes from.',
    prompt:
      'At which level of the revised Bloom\u2019s Taxonomy is the teacher\u2019s task pitched, and why?',
    options: [
      'The task is pitched at the level of remembering, because the learners must first recall the steps of both dances before they can say anything about them.',
      'The task is pitched at the level of understanding, because the learners must explain in their own words what each dance looks like when it is performed.',
      'The task is pitched at the level of analysing, because the learners must break each dance into its movement components and draw out the relationship between those components and the environment the dance comes from.',
      'The task is pitched at the level of creating, because the learners must produce a new comparison that did not exist before the task was set.',
    ],
    correctIndex: 2,
    explanation:
      'Analysing is the cognitive process of breaking material into its constituent parts and detecting how those parts relate to one another and to an overall structure or purpose. The task asks learners to decompose each dance into its movement components and then establish a relationship between those components and the region\u2019s environment \u2014 that is analysis. Remembering would be recalling the steps; understanding would be explaining what the dance looks like; creating would require producing a new dance or a new synthesis, which the task does not ask for.',
    rationale:
      'Classifying a task by the cognitive process it demands, using the relationship-drawing in the task as the marker of analysis.',
    source: 'Anderson & Krathwohl, revised Bloom\u2019s Taxonomy; PRC CAE TOS \u2014 Pedagogical Practice',
  },
  {
    id: 'sit-cae-p-006',
    subjectId: 'cae',
    topicId: 'cae-pedagogy',
    difficulty: 4,
    vignette:
      'A teacher is designing assessment for a unit on Philippine folk dance. She wants to judge whether her students can perform a dance accurately, expressively and in time with the music, and she wants the judgement to be consistent across the five groups she will observe on different days. She decides not to use a written test, because a written test would only tell her whether the students can describe the dance.',
    prompt:
      'Which assessment approach best serves the teacher\u2019s purpose, and why?',
    options: [
      'The most appropriate approach is a fifty-item multiple-choice test on the history and terminology of the dance, because it can be scored objectively and will produce a reliable numerical result.',
      'The most appropriate approach is a performance-based assessment scored against a rubric shared with the learners before the task, because it judges the actual performance against explicit criteria and keeps the scoring consistent across groups observed on different days.',
      'The most appropriate approach is a written book report on a National Artist for Dance, because it allows the learners to demonstrate their understanding of the dance tradition in depth.',
      'The most appropriate approach is a ranking of the five groups from best to worst, with grades assigned on a curve, because ranking removes the need to define criteria in advance.',
    ],
    correctIndex: 1,
    explanation:
      'Performance-based assessment requires learners to demonstrate a skill or produce work judged against criteria, which is exactly what the teacher wants to judge. A rubric shared in advance makes the criteria transparent and the scoring consistent across groups and across days, supporting both validity and fairness. A multiple-choice test measures recall, not performance \u2014 the teacher has already rejected it for that reason. A book report is a written task. Grading on a curve substitutes relative standing for achievement against criteria and would make the judgement depend on which group a learner happened to be in.',
    rationale:
      'Matching an assessment method to the intended learning outcome, and recognising that a rubric is what makes performance judgement consistent.',
    source: 'Assessment of learning; PRC CAE TOS \u2014 Pedagogical Practice',
  },
  {
    id: 'sit-cae-p-007',
    subjectId: 'cae',
    topicId: 'cae-pedagogy',
    difficulty: 5,
    vignette:
      'A teacher notices that one of her students grasps musical concepts unusually quickly \u2014 she can reproduce a rhythm after hearing it once, and she identifies intervals accurately without any training. However, the same student refuses to work in groups, will not share materials, and becomes upset when asked to take a role in an ensemble. The teacher wants to describe this student\u2019s profile accurately so she can plan appropriate support.',
    prompt:
      'Using Gardner\u2019s theory of multiple intelligences, which of the following most accurately describes this student\u2019s profile?',
    options: [
      'The student shows strength in interpersonal intelligence and a relative weakness in musical intelligence.',
      'The student shows strength in musical intelligence and a relative weakness in interpersonal intelligence.',
      'The student shows strength in bodily-kinaesthetic intelligence and a relative weakness in spatial intelligence.',
      'The student shows strength in intrapersonal intelligence and a relative weakness in linguistic intelligence.',
    ],
    correctIndex: 1,
    explanation:
      'Reproducing a rhythm after a single hearing and identifying intervals without training are markers of musical intelligence. Difficulty working with classmates, refusing to share, and distress at taking an ensemble role point to a relative weakness in interpersonal intelligence \u2014 the capacity to perceive and respond to the moods, temperaments and intentions of others. The item deliberately separates the two: the student\u2019s strength and her difficulty sit in different intelligences, and the profile must name both.',
    rationale:
      'Reading a described student profile against Gardner\u2019s intelligences, and reporting both the strength and the weakness rather than only one.',
    source: 'Howard Gardner, Frames of Mind; PRC CAE TOS \u2014 Pedagogical Practice',
  },

  // ==================================================================
  // Culture and Arts Education — Creative Expressions
  // ==================================================================
  {
    id: 'sit-cae-c-001',
    subjectId: 'cae',
    topicId: 'cae-creative',
    difficulty: 5,
    vignette:
      'A teacher is working with a class on the relationship between music and movement. She plays a recording of a kundiman \u2014 a Filipino love song traditionally set in triple metre \u2014 and asks the class to listen without speaking. She then asks them to create a short movement piece that expresses what they heard. She gives one constraint: they may not use any of the song\u2019s lyrics, and they may not simply mime the words. When the groups perform, she asks the audience to say what emotion each piece conveyed.',
    prompt:
      'What competency is the teacher primarily developing through this task?',
    options: [
      'The competency being developed is memorising the melody of the kundiman so that the class can sing it accurately from memory in a later lesson.',
      'The competency being developed is translating the emotional content of one expressive medium into another, so that learners read meaning in the music and re-express it through movement rather than reproducing it literally.',
      'The competency being developed is copying a recorded choreography exactly, so that the class develops precision and unison in performance.',
      'The competency being developed is identifying the composer of the kundiman and placing the work in its historical period.',
    ],
    correctIndex: 1,
    explanation:
      'The task is cross-modal translation. Learners must first read the emotional content of the music, then re-express that content through a different medium. The prohibition on lyrics and on miming the words is what forces interpretation rather than reproduction \u2014 without it, a group could simply act out the words and bypass the musical understanding entirely. Memorising the melody, copying a choreography, and identifying the composer are all recall or reproduction tasks, and none of them is what the constraint is designed to produce.',
    rationale:
      'Recognising a cross-modal translation task, and understanding why the stated constraints are what make it interpretive rather than reproductive.',
    source: 'Creative expression in arts education; PRC CAE TOS \u2014 Creative Expressions',
  },
  {
    id: 'sit-cae-c-002',
    subjectId: 'cae',
    topicId: 'cae-creative',
    difficulty: 5,
    vignette:
      'A teacher is teaching perspective to a drawing class. She shows two student works. In the first, a row of trees recedes into the distance, each tree drawn smaller than the one in front of it, with the tops converging toward a single point on the horizon. In the second, the same row of trees is drawn with every tree at the same size, and the row simply continues across the page without any change. She asks the class to explain what is wrong with the second drawing.',
    prompt:
      'Which technique has the student in the second drawing failed to apply, and what is its effect?',
    options: [
      'The student has failed to apply repetition, so the drawing lacks pattern and the eye has nothing to follow across the composition.',
      'The student has failed to apply perspective, so the drawing lacks depth \u2014 distant objects drawn at the same size as near ones flatten the picture plane instead of creating the illusion of recession.',
      'The student has failed to apply complementary colour, so the drawing lacks contrast and the trees do not stand out from the background.',
      'The student has failed to apply negative space, so the drawing feels crowded and the trees have no room to breathe.',
    ],
    correctIndex: 1,
    explanation:
      'Perspective uses scale and converging lines to create the illusion of depth: objects further away appear smaller, and parallel lines receding from the viewer converge toward a vanishing point. Drawing distant objects at the same size as near ones removes that cue entirely, so the picture reads as flat. Repetition and pattern are present in the second drawing \u2014 the trees do repeat \u2014 but repetition alone does not create depth. Complementary colour and negative space are unrelated to the fault described.',
    rationale:
      'Diagnosing a specific compositional fault and naming the technique whose absence causes it.',
    source: 'Drawing and composition fundamentals; PRC CAE TOS \u2014 Creative Expressions',
  },
  {
    id: 'sit-cae-c-003',
    subjectId: 'cae',
    topicId: 'cae-creative',
    difficulty: 5,
    vignette:
      'A teacher is introducing her class to the methods artists use to present a subject. She shows a series of works. In the first, the artist has depicted a subject exactly as the eye would see it, with no exaggeration, and the work is associated with a movement that began in France in the 1850s and rejected exaggerated emotionalism. In the second, the artist has not shown the subject as an objective reality at all, but only the artist\u2019s ideas or feelings about it. In the third, the artist has systematically used symbols to concentrate meaning, making the work more subjective and conventional than the first two.',
    prompt:
      'Which of the following correctly names the three methods of presenting a subject, in the order described?',
    options: [
      'The first is abstraction, the second is realism, and the third is symbolism.',
      'The first is realism, the second is abstraction, and the third is symbolism.',
      'The first is symbolism, the second is realism, and the third is abstraction.',
      'The first is realism, the second is symbolism, and the third is abstraction.',
    ],
    correctIndex: 1,
    explanation:
      'Realism depicts what the eye can see without exaggeration and is associated with a French movement of the 1850s. Abstraction does not show the subject as objective reality but only the artist\u2019s ideas or feelings about it. Symbolism systematically uses symbols to concentrate or intensify meaning, making the work more subjective and conventional. The order matters here: the item tests whether the student can hold all three definitions and match them to descriptions rather than recognising only one.',
    rationale:
      'Matching three definitions of presenting a subject to their correct labels, in sequence.',
    source: 'Methods of presenting art subjects; PRC CAE TOS \u2014 Creative Expressions',
  },

  // ==================================================================
  // Culture and Arts Education — Professional Accountability
  // ==================================================================
  {
    id: 'sit-cae-a-001',
    subjectId: 'cae',
    topicId: 'cae-accountability',
    difficulty: 5,
    vignette:
      'A newly appointed teacher learns that a colleague in the same department has been accepting payment from learners in exchange for passing grades. The colleague is popular with the administration, and the teacher is still on probationary status. The teacher considers three options: say nothing and keep out of it, raise the matter privately with the colleague and ask them to stop, or report the matter to the school head in writing. The teacher is unsure which course of action the Code of Ethics for Professional Teachers requires.',
    prompt:
      'Which of the following is the course of action the Code of Ethics requires of the teacher?',
    options: [
      'Say nothing, because a probationary teacher has no standing to question a colleague\u2019s conduct and raising it would jeopardise the teacher\u2019s own appointment.',
      'Report the matter to the proper authority in writing and, if warranted, file a formal complaint, because the Code requires a teacher to report misconduct rather than remain silent about it.',
      'Raise the matter privately with the colleague and accept their assurance that it will stop, because the Code prioritises professional harmony among colleagues over formal reporting.',
      'Raise the matter with the learners\u2019 parents first, so that the parents can decide whether the matter should be brought to the school head.',
    ],
    correctIndex: 1,
    explanation:
      'The Code of Ethics for Professional Teachers requires a teacher who learns of a colleague\u2019s misconduct to report it to the proper authority. Remaining silent because of probationary status is not permitted \u2014 the duty owed to learners is not conditional on the teacher\u2019s employment status. A private word that leaves the conduct unreported does not satisfy the duty, and the Code does not place professional harmony above the welfare of learners. Informing parents first inverts the proper order: the school head is the proper authority, and parents are not responsible for investigating a teacher.',
    rationale:
      'Applying the Code of Ethics to a situation where reporting carries a personal cost, and rejecting the rationales that would justify silence.',
    source: 'Code of Ethics for Professional Teachers; PRC CAE TOS \u2014 Professional Accountability',
  },
  {
    id: 'sit-cae-a-002',
    subjectId: 'cae',
    topicId: 'cae-accountability',
    difficulty: 5,
    vignette:
      'A school principal instructs a teacher to raise the grades of several learners who are performing poorly, explaining that the school\u2019s performance report is due and that low grades will reflect badly on the institution. The principal is the teacher\u2019s immediate supervisor and signs the teacher\u2019s performance rating. The teacher knows the learners have not met the standards for the grades being requested, and that no reassessment has been conducted.',
    prompt:
      'What should the teacher do, and on what basis?',
    options: [
      'The teacher should comply, because a lawful directive from a principal is binding on a teacher and the principal bears responsibility for the outcome.',
      'The teacher should comply, but keep a private record of the learners\u2019 actual scores so that the true results can be produced if the matter is ever questioned.',
      'The teacher should refuse, because altering grades without valid grounds breaches both the Code of Ethics and the integrity of assessment \u2014 the obligation to a supervisor does not override the teacher\u2019s professional and ethical duty.',
      'The teacher should resign from the position immediately, because remaining in a school where such a directive has been made would make the teacher complicit.',
    ],
    correctIndex: 2,
    explanation:
      'Grades must reflect actual achievement. Raising them without valid grounds falsifies the record of learning and breaches both the Code of Ethics and the integrity of assessment. A teacher\u2019s obligation to a supervisor does not override professional and ethical duty, and the fact that the principal bears responsibility does not transfer the teacher\u2019s own accountability. Keeping a private record does not undo the falsification \u2014 the false grades are still the official record. Resigning would remove the teacher from the situation without protecting the learners or correcting the record.',
    rationale:
      'Recognising that a supervisor\u2019s directive does not displace a teacher\u2019s professional duty, and identifying falsification of assessment as the breach.',
    source: 'Code of Ethics for Professional Teachers; PRC CAE TOS \u2014 Professional Accountability',
  },
  {
    id: 'sit-cae-a-003',
    subjectId: 'cae',
    topicId: 'cae-accountability',
    difficulty: 5,
    vignette:
      'A teacher is preparing for her performance evaluation. Her rater explains that the Philippine Professional Standards for Teachers organises a teacher\u2019s career into four stages, and that the evaluation will judge her against the descriptors for the stage she currently occupies. The teacher has been teaching for four years and has consistently met the expectations for her stage, but she has not yet taken on the leadership and mentoring responsibilities associated with the next stage.',
    prompt:
      'Which of the following correctly states the four PPST career stages in order?',
    options: [
      'The four PPST career stages are Beginning, Developing, Proficient and Distinguished.',
      'The four PPST career stages are Beginning, Proficient, Highly Proficient and Distinguished.',
      'The four PPST career stages are Novice, Intermediate, Advanced and Expert.',
      'The four PPST career stages are Provisional, Permanent, Master and Specialist.',
    ],
    correctIndex: 1,
    explanation:
      'The PPST defines four career stages: Beginning, Proficient, Highly Proficient and Distinguished. \u201cDeveloping\u201d is not a career stage \u2014 it is a domain within the standards, which is why it is the most common wrong answer. The other two sequences are invented. The stages describe increasing levels of practice, with Highly Proficient and Distinguished involving leadership and mentoring beyond the classroom.',
    rationale:
      'Recalling the four PPST career stages in order, and rejecting the domain name that is often mistaken for a stage.',
    source: 'DepEd Order No. 42, s. 2017 (PPST); PRC CAE TOS \u2014 Professional Accountability',
  },
  {
    id: 'sit-cae-a-004',
    subjectId: 'cae',
    topicId: 'cae-accountability',
    difficulty: 5,
    vignette:
      'A teacher wants to take her class on a field trip to a museum to study original works of art. She reviews the legal framework governing Philippine education before submitting her request. She notes that one law restructured the Department of Education and made the school head the key management figure at the school level, and that a different law established the Enhanced Basic Education programme adding kindergarten and senior high school. She wants to cite the correct law when she explains to her school head why the activity is within the school\u2019s mandate.',
    prompt:
      'Which law established the Enhanced Basic Education programme, and which law governs basic education at the school level?',
    options: [
      'The Enhanced Basic Education programme was established by RA 9155, and basic education governance is set by RA 10533.',
      'The Enhanced Basic Education programme was established by RA 10533, and basic education governance is set by RA 9155.',
      'The Enhanced Basic Education programme was established by RA 7836, and basic education governance is set by RA 4670.',
      'The Enhanced Basic Education programme was established by RA 4670, and basic education governance is set by RA 7836.',
    ],
    correctIndex: 1,
    explanation:
      'RA 10533, the Enhanced Basic Education Act of 2013, is the legal basis of the K to 12 programme \u2014 it added kindergarten and senior high school. RA 9155, the Governance of Basic Education Act of 2001, restructured DepEd and made the school head the key management figure at the school level. RA 7836 professionalised teaching and placed licensure under the PRC, and RA 4670 is the Magna Carta for Public School Teachers. The two laws in the item are frequently swapped, which is what the item tests.',
    rationale:
      'Attributing two frequently-confused education statutes to their correct subject matter.',
    source: 'RA 10533; RA 9155; PRC CAE TOS \u2014 Professional Accountability',
  },

  // ==================================================================
  // Culture and Arts Education — Research and Extension
  // ==================================================================
  {
    id: 'sit-cae-r-001',
    subjectId: 'cae',
    topicId: 'cae-research',
    difficulty: 5,
    vignette:
      'A teacher notices that her Grade 9 students rarely contribute during art critique sessions. She suspects the problem is that she has been asking the whole class open questions and only the confident students answer. She decides to investigate. She introduces a structured critique protocol in which every student writes one observation before anyone speaks, then shares it with a partner, and only then does the class discuss. She records the number of contributions in each session before and after the change, and keeps a journal of what she observes.',
    prompt:
      'Which type of research is the teacher conducting, and what distinguishes it from conventional experimental research?',
    options: [
      'The teacher is conducting a large-scale survey, because she is collecting data from a whole class of students over several sessions.',
      'The teacher is conducting action research, because it is practitioner-driven, aimed at improving her own practice in her own setting, and conducted in repeated cycles of planning, acting, observing and reflecting rather than seeking generalisable findings.',
      'The teacher is conducting a purely theoretical literature review, because she has grounded her intervention in existing work on classroom discourse.',
      'The teacher is conducting a laboratory experiment, because she has introduced a controlled change and is measuring its effect on a defined variable.',
    ],
    correctIndex: 1,
    explanation:
      'Action research is conducted by the practitioner, on the practitioner\u2019s own setting, in repeated cycles of planning, acting, observing and reflecting. Its purpose is local improvement rather than generalisable theory, which is what separates it from conventional experimental research. A survey collects data without intervening. A literature review involves no intervention at all. And a laboratory experiment seeks controlled, generalisable findings under conditions that a classroom cannot provide \u2014 the teacher is changing her own practice to improve it, not testing a hypothesis for publication.',
    rationale:
      'Distinguishing action research from other inquiry types by its practitioner-driven, local-improvement purpose and its cyclical structure.',
    source: 'Action research literature (Kemmis & McTaggart); PRC CAE TOS \u2014 Research and Extension',
  },
  {
    id: 'sit-cae-r-002',
    subjectId: 'cae',
    topicId: 'cae-research',
    difficulty: 5,
    vignette:
      'A teacher completes an action research study on the critique protocol she introduced. She writes up her findings and wants to publish the report on the school website. Her report includes photographs of her students during a critique session, and quotes from three students describing why they found the protocol helpful. The students are all between fourteen and sixteen years old. Before publishing, she considers what she must do to comply with research ethics.',
    prompt:
      'What must the teacher obtain before publishing the report with the photographs and quotations?',
    options: [
      'The teacher must obtain nothing further, because the research was conducted in her own classroom as part of her normal teaching duties and therefore falls outside the scope of research ethics.',
      'The teacher must obtain informed consent from the learners and their parents or guardians, because the learners are minors and identifiable in the photographs and quotations.',
      'The teacher must obtain only the learners\u2019 own permission, because at fourteen to sixteen years old they are old enough to decide whether their image and words may be published.',
      'The teacher must obtain nothing further, provided she removes the learners\u2019 names from the report so that they cannot be identified by name.',
    ],
    correctIndex: 1,
    explanation:
      'The learners are minors, so informed consent must come from their parents or guardians, and the learners themselves should assent. Removing names does not by itself satisfy the requirement, because photographs make the learners identifiable regardless of whether their names appear, and the quotations may identify them to classmates and teachers who know the context. Conducting research in one\u2019s own classroom does not exempt a teacher from research ethics \u2014 if anything it increases the duty of care, because the learners are in a dependent relationship with the researcher.',
    rationale:
      'Applying informed-consent requirements to identifiable minors, and recognising that anonymising names does not anonymise photographs.',
    source: 'Research ethics with minor participants; PRC CAE TOS \u2014 Research and Extension',
  },
  {
    id: 'sit-cae-r-003',
    subjectId: 'cae',
    topicId: 'cae-research',
    difficulty: 4,
    vignette:
      'A teacher is designing an action research study on whether a new approach to teaching art history improves her students\u2019 ability to analyse unfamiliar works. She plans to measure the students\u2019 scores on an analysis task before introducing the approach, then introduce the approach over six weeks, then measure their scores on a comparable analysis task afterwards. She also plans to interview six students about how they approached the tasks.',
    prompt:
      'In this study, which of the following correctly identifies the independent variable and the type of data the interviews will produce?',
    options: [
      'The independent variable is the students\u2019 score on the analysis task, and the interviews will produce quantitative data.',
      'The independent variable is the new approach to teaching art history, and the interviews will produce qualitative data.',
      'The independent variable is the six-week duration of the study, and the interviews will produce quantitative data.',
      'The independent variable is the students\u2019 ability to analyse unfamiliar works, and the interviews will produce qualitative data.',
    ],
    correctIndex: 1,
    explanation:
      'The independent variable is the factor the teacher manipulates \u2014 here, the new teaching approach. The dependent variable is what she measures \u2014 the students\u2019 scores on the analysis task. The interviews produce qualitative data: words, accounts and reasoning rather than numbers. Duration is a feature of the design, not a variable being manipulated. The students\u2019 ability is the dependent variable, not the independent one.',
    rationale:
      'Identifying the manipulated variable in a described design, and distinguishing qualitative from quantitative data.',
    source: 'Research methodology; PRC CAE TOS \u2014 Research and Extension',
  },

  // ==================================================================
  // Professional Education — Assessment of Learning
  // ==================================================================
  {
    id: 'sit-pe-a-001',
    subjectId: 'profed',
    topicId: 'profed-assessment',
    difficulty: 5,
    vignette:
      'A teacher has finished marking a 40-item unit test. She wants to know whether the test was any good before she files it away for reuse. She calculates, for each item, the proportion of the class that answered it correctly, and separately compares how the top third of the class performed on each item against how the bottom third performed. She finds that one item was answered correctly by 94% of the class, and that the top third and the bottom third performed almost identically on it. She decides to rewrite that item.',
    prompt:
      'Why is the teacher right to rewrite the item, and what do the two statistics she calculated tell her?',
    options: [
      'The item has a high difficulty index and a low discrimination index, so it is too easy to be useful and it does not separate stronger learners from weaker ones \u2014 it should be rewritten or replaced.',
      'The item has a low difficulty index and a high discrimination index, so it is too hard for the class and it is unfairly penalising the weaker learners.',
      'The item has a high difficulty index and a high discrimination index, so it is functioning well and should be retained as a good example of an easy item.',
      'The item has a low difficulty index and a low discrimination index, so it is measuring something the class has not been taught and should be removed from the syllabus.',
    ],
    correctIndex: 0,
    explanation:
      'The difficulty index is the proportion of examinees who answered the item correctly. At 94%, the item is very easy \u2014 a high difficulty index. The discrimination index measures how well an item separates high scorers from low scorers; if the top third and bottom third performed almost identically, the item discriminates poorly \u2014 a low discrimination index. An item that is both very easy and non-discriminating adds nothing to the information the test provides, so rewriting or replacing it is correct. The item is not too hard, and it is not functioning well.',
    rationale:
      'Reading item-analysis statistics correctly and drawing the right conclusion about whether an item should be retained.',
    source: 'Item analysis; PRC ProfEd TOS area D (15%)',
  },
  {
    id: 'sit-pe-a-002',
    subjectId: 'profed',
    topicId: 'profed-assessment',
    difficulty: 5,
    vignette:
      'A teacher administers a 30-item test on the elements of art to her class in the first week of the term. She marks it and finds that most learners scored between 20% and 35%. She does not record these scores in her gradebook. Instead, she uses the results to decide which elements she needs to spend more time on, and she plans her next three weeks of lessons around the gaps she has identified.',
    prompt:
      'Which type of assessment did the teacher conduct, and why was she correct not to record the scores?',
    options: [
      'The teacher conducted summative assessment, and she was correct not to record the scores because a test given in the first week cannot fairly be counted toward a term grade.',
      'The teacher conducted diagnostic assessment, and she was correct not to record the scores because its purpose is to identify what learners already know and to guide teaching, not to judge achievement.',
      'The teacher conducted formative assessment, and she was correct not to record the scores because formative assessment is never graded under any circumstances.',
      'The teacher conducted norm-referenced assessment, and she was correct not to record the scores because norm-referenced tests compare learners against each other rather than against standards.',
    ],
    correctIndex: 1,
    explanation:
      'Diagnostic assessment is administered before instruction to identify prior knowledge and gaps so that teaching can start from the right point. That is exactly what the teacher did: she tested before teaching the unit and used the results to plan. Summative assessment comes after instruction and judges achievement. Formative assessment happens during instruction and also guides teaching, but the distinguishing feature here is that the test came before the unit began. Norm-referenced assessment is a way of interpreting scores, not a purpose for testing.',
    rationale:
      'Distinguishing diagnostic from formative and summative assessment by when it occurs and what it is for.',
    source: 'Assessment of learning; PRC ProfEd TOS area D (15%)',
  },
  {
    id: 'sit-pe-a-003',
    subjectId: 'profed',
    topicId: 'profed-assessment',
    difficulty: 5,
    vignette:
      'A teacher is evaluating a test she has been given by a colleague. The test is titled \u201cArtistic Creativity Assessment\u201d and its stated purpose is to measure learners\u2019 creative ability in the visual arts. When she examines the items, she finds that all thirty of them ask learners to recall definitions of art terms, identify the artist who painted a named work, and state the year a named work was completed. No item asks learners to produce, evaluate or respond to a work of art.',
    prompt:
      'What is the principal weakness of this test, and which property of a good test does it lack?',
    options: [
      'The test lacks reliability, because thirty items is too few to produce a stable score and the results would vary if the test were administered again.',
      'The test lacks validity, because it claims to measure artistic creativity but in fact measures only the recall of art-historical facts \u2014 it does not measure what it says it measures.',
      'The test lacks usability, because it would take too long to administer and score within a single class period.',
      'The test lacks objectivity, because the teacher who wrote the items would be the same person who scores them.',
    ],
    correctIndex: 1,
    explanation:
      'Validity is the degree to which a test measures what it claims to measure. A test titled and described as a measure of creative ability, whose items all require recall of definitions, artists and dates, does not measure creativity \u2014 it measures recall. That is a validity failure, and it is the most serious kind because the scores will be interpreted as evidence of something they do not show. Reliability concerns consistency, not what is being measured. Usability concerns practical administration. Objectivity concerns scorer bias, which is not the issue here.',
    rationale:
      'Identifying a construct-validity failure: a test whose items do not match its stated purpose.',
    source: 'Assessment of learning; PRC ProfEd TOS area D (15%)',
  },
  {
    id: 'sit-pe-a-004',
    subjectId: 'profed',
    topicId: 'profed-assessment',
    difficulty: 5,
    vignette:
      'A teacher wants to assess her students\u2019 ability to compose a short piece of music. She decides against a written test. Instead, each student submits a composition and performs it for the class. Before the task begins, the teacher gives every student a copy of the rubric she will use, and she goes through each criterion with the class, explaining what a strong submission looks like against each one. She then scores every performance using the same rubric.',
    prompt:
      'Which of the following best explains why sharing the rubric in advance improves the assessment?',
    options: [
      'Sharing the rubric in advance removes the need for the teacher to exercise judgement, because the rubric converts a subjective judgement into an objective one.',
      'Sharing the rubric in advance makes the criteria transparent to the learners and keeps the scoring consistent across submissions, which supports both the fairness of the assessment and the validity of the judgements made against it.',
      'Sharing the rubric in advance guarantees that every student will receive a high score, because learners who know the criteria will always meet them.',
      'Sharing the rubric in advance allows the teacher to avoid giving written feedback, because the rubric itself tells the learners what they did well and what they did not.',
    ],
    correctIndex: 1,
    explanation:
      'A rubric shared in advance makes the criteria explicit, so learners know what is being judged and the teacher applies the same standard to every submission. That transparency supports fairness, and the consistency it produces supports the validity of the judgements \u2014 the scores mean the same thing across students. A rubric does not remove judgement; the teacher still has to decide where each submission falls on each criterion. It does not guarantee high scores, and it does not replace feedback, which still has to be given.',
    rationale:
      'Explaining why transparency and consistency in criteria improve a performance assessment, without overstating what a rubric does.',
    source: 'Performance assessment and rubrics; PRC ProfEd TOS area D (15%)',
  },

  // ==================================================================
  // Professional Education — Child and Adolescent Learners
  // ==================================================================
  {
    id: 'sit-pe-l-001',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 5,
    vignette:
      'A Grade 7 teacher is planning a lesson on the water cycle. She knows that many of her learners are still developing the ability to reason about processes they cannot directly observe. She decides to begin with a physical demonstration: she heats water in a clear container, holds a cool plate above it, and lets the learners watch the droplets form and fall. She then asks them to explain what they saw and only afterwards introduces the terms evaporation, condensation and precipitation.',
    prompt:
      'Which principle from Piaget\u2019s theory best justifies the teacher\u2019s decision to begin with the physical demonstration?',
    options: [
      'Learners in the formal operational stage require abstract symbols before they can understand a process, so the demonstration should have come after the terminology.',
      'Learners in the concrete operational stage reason best about phenomena they can observe and manipulate directly, so grounding the concept in a visible demonstration before naming it supports their thinking rather than asking them to operate on abstractions first.',
      'Learners in the preoperational stage are egocentric and cannot take another person\u2019s viewpoint, so the demonstration is needed to hold their attention.',
      'Learners in the sensorimotor stage learn only through their own physical actions on objects, so the teacher should have let each learner handle the apparatus personally.',
    ],
    correctIndex: 1,
    explanation:
      'Concrete operational learners, roughly ages seven to eleven, reason most effectively about tangible, observable situations and struggle to operate on abstractions in isolation. Beginning with a demonstration the learners can watch and then naming the process gives them something concrete to attach the terminology to. Formal operational learners, who can handle abstraction, would not need this. Preoperational and sensorimotor stages describe much younger children and are not the relevant stages for Grade 7 learners \u2014 the item tests whether the student applies the correct stage to the described age group.',
    rationale:
      'Applying the correct Piagetian stage to a described classroom decision, and rejecting stages that do not match the learners\u2019 age.',
    source: 'Jean Piaget, cognitive development theory; PRC ProfEd TOS area C (20%)',
  },
  {
    id: 'sit-pe-l-002',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 5,
    vignette:
      'A Grade 10 learner has been withdrawn for several weeks. She has stopped participating in class, has changed her group of friends twice, has dyed her hair and then cut it short, and has told her adviser that she does not know what she wants to do after school. Her grades have dropped in some subjects but improved in others. Her adviser is concerned and wants to understand what the learner is going through before deciding how to respond.',
    prompt:
      'Using Erikson\u2019s psychosocial theory, which stage is this learner most likely negotiating, and what is the central task of that stage?',
    options: [
      'The learner is negotiating industry versus inferiority, in which the central task is to develop competence through successful completion of tasks valued by peers and adults.',
      'The learner is negotiating identity versus role confusion, in which the central task is to develop a coherent and stable sense of self, including commitments to values, beliefs and future direction.',
      'The learner is negotiating intimacy versus isolation, in which the central task is to form close, committed relationships with others.',
      'The learner is negotiating trust versus mistrust, in which the central task is to develop a basic sense of security about the world and the people in it.',
    ],
    correctIndex: 1,
    explanation:
      'Identity versus role confusion is the adolescent stage, roughly ages twelve to eighteen, and its central task is forming a coherent sense of self \u2014 including values, beliefs and future direction. The described behaviour fits: shifting peer groups, changing appearance, and uncertainty about the future are all markers of identity exploration. Industry versus inferiority belongs to the elementary years. Intimacy versus isolation is the young-adult stage, and trust versus mistrust is the infancy stage.',
    rationale:
      'Matching observed adolescent behaviour to the correct Eriksonian stage and naming its central developmental task.',
    source: 'Erik Erikson, psychosocial development; PRC ProfEd TOS area C (20%)',
  },
  {
    id: 'sit-pe-l-003',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 5,
    vignette:
      'A teacher assigns a complex task: writing a short research report on a local environmental issue. She knows her learners cannot yet complete the task unaided. In the first week, she models how to frame a research question and gives the class sentence starters for each section. In the second week, she provides an outline template but no sentence starters. In the third week, she gives only a checklist of what the report must contain. By the fourth week, the learners submit their reports with no scaffolding at all.',
    prompt:
      'Which concept best explains the teacher\u2019s gradual withdrawal of support, and why is the withdrawal essential?',
    options: [
      'The concept is reinforcement, and the withdrawal is essential because support that is never withdrawn becomes a reward the learners depend on rather than a means to an end.',
      'The concept is scaffolding within the zone of proximal development, and the withdrawal is essential because the support is only useful while the task lies beyond what the learner can do alone \u2014 as competence grows, the support must recede or it becomes the thing the learner depends on instead of developing independence.',
      'The concept is shaping, and the withdrawal is essential because each stage of the task must be reinforced separately before the next stage is introduced.',
      'The concept is modelling, and the withdrawal is essential because learners must eventually imitate the model without the model being present.',
    ],
    correctIndex: 1,
    explanation:
      'Scaffolding is temporary, gradually withdrawn support that keeps a task within the learner\u2019s zone of proximal development \u2014 the range between what a learner can do alone and what they can do with guidance. As competence grows, the task moves inside what the learner can manage unaided, so the scaffold must be removed; leaving it in place would keep the learner dependent on support they no longer need. Reinforcement increases the likelihood of a behaviour, shaping reinforces successive approximations of a target behaviour, and modelling is demonstration \u2014 none of them describes graduated withdrawal of task support.',
    rationale:
      'Recognising scaffolding from its defining feature \u2014 graduated withdrawal \u2014 and explaining why the withdrawal is part of the technique rather than an ending of it.',
    source: 'Vygotsky; Wood, Bruner & Ross, scaffolding; PRC ProfEd TOS area C (20%)',
  },

  // ==================================================================
  // Professional Education — Curriculum, Methods and EdTech
  // ==================================================================
  {
    id: 'sit-pe-c-001',
    subjectId: 'profed',
    topicId: 'profed-curriculum',
    difficulty: 5,
    vignette:
      'A school is reviewing its Grade 9 art curriculum. The review committee gathers four kinds of information. First, it examines the school\u2019s context: the community\u2019s cultural resources, the learners\u2019 backgrounds, and the needs the curriculum is meant to serve. Second, it examines the resources available: the budget, the teachers\u2019 qualifications, and the materials on hand. Third, it observes how the curriculum is actually being taught in classrooms. Fourth, it examines learner outcomes against the intended objectives. The committee then uses all four to decide whether to continue, modify or replace the programme.',
    prompt:
      'Which curriculum evaluation model is the committee using, and what are its four components?',
    options: [
      'The committee is using Stake\u2019s Countenance Model, whose four components are antecedents, transactions, outcomes and standards.',
      'The committee is using Stufflebeam\u2019s CIPP model, whose four components are Context, Input, Process and Product evaluation.',
      'The committee is using Tyler\u2019s Objectives Model, whose four components are objectives, content, organisation and evaluation.',
      'The committee is using Scriven\u2019s Goal-Free Model, whose four components are needs, implementation, effects and costs.',
    ],
    correctIndex: 1,
    explanation:
      'CIPP stands for Context, Input, Process and Product evaluation, and it is decision-oriented \u2014 exactly as described. Context evaluation examines the setting and needs; input evaluation examines the resources and strategies available; process evaluation examines implementation; product evaluation examines outcomes. Stake\u2019s Countenance Model is a separate framework built on antecedents, transactions and outcomes, which does not match the four kinds of information the committee gathered. Tyler\u2019s model is a curriculum-design model, and the goal-free model deliberately avoids examining stated objectives.',
    rationale:
      'Identifying an evaluation model from its four named components, and distinguishing it from the other named models.',
    source: 'Stufflebeam, CIPP evaluation model; PRC ProfEd TOS area B (30%)',
  },
  {
    id: 'sit-pe-c-002',
    subjectId: 'profed',
    topicId: 'profed-curriculum',
    difficulty: 5,
    vignette:
      'A teacher wants her learners to take more responsibility for their own progress. She sets up a digital portfolio for each learner. At the start of each unit, learners record what they intend to achieve and why. During the unit, they upload drafts, photographs of their work in progress, and short reflections on what they found difficult. At the end of the unit, they review their own entries and write a short assessment of how far they met their stated intentions and what they would do differently. The teacher comments on the portfolio but does not grade it.',
    prompt:
      'What is the principal value of using the portfolio this way, and why does the teacher\u2019s decision not to grade it matter?',
    options: [
      'The principal value is that the portfolio replaces the need for teacher assessment, and not grading it matters because a graded portfolio would duplicate the teacher\u2019s other assessments.',
      'The principal value is that the portfolio makes goals, evidence and progress visible to the learner, which builds metacognition and ownership of learning, and not grading it matters because grading would shift the learner\u2019s attention from reflecting on their progress to performing for a mark.',
      'The principal value is that the portfolio provides a convenient storage location for learner work, and not grading it matters because grading would require the teacher to store the work for longer.',
      'The principal value is that the portfolio allows the teacher to compare learners against one another, and not grading it matters because comparison between learners is not permitted in the K to 12 programme.',
    ],
    correctIndex: 1,
    explanation:
      'A portfolio of this kind makes the learner\u2019s goals, evidence and reflections visible to the learner themselves, which is what develops metacognition \u2014 the capacity to monitor and direct one\u2019s own learning \u2014 and shifts ownership from the teacher to the learner. Not grading it matters because a mark would change what the learner is doing: they would write for the grade rather than to understand their own progress, and the reflective value would be lost. The portfolio does not replace teacher assessment, is not merely storage, and its purpose is not comparison between learners.',
    rationale:
      'Explaining how a reflective portfolio builds metacognition, and why removing the grade is what preserves its purpose.',
    source: 'Educational technology and assessment for learning; PRC ProfEd TOS area B (30%)',
  },
  {
    id: 'sit-pe-c-003',
    subjectId: 'profed',
    topicId: 'profed-curriculum',
    difficulty: 5,
    vignette:
      'A teacher is planning a unit on disaster preparedness. She wants her learners to practise the decisions they would have to make during an earthquake, but she cannot create a real earthquake and would not want to frighten the learners with a realistic drill on the first attempt. She designs an activity in which learners work through a series of written scenarios, making a decision at each stage, and then see the consequences of that decision before moving to the next stage. She runs the activity twice, changing the scenarios the second time.',
    prompt:
      'What is the principal advantage of using this activity rather than a lecture on earthquake preparedness?',
    options: [
      'Its principal advantage is that it is cheaper to run than a real drill, because it requires no equipment and no coordination with the school\u2019s disaster office.',
      'Its principal advantage is that it provides controlled, repeatable practice of decision-making under conditions that are too risky, costly or impractical to reproduce for real, and it can be run again with different scenarios so that learners encounter more than one situation.',
      'Its principal advantage is that it removes the need for any assessment, because the learners\u2019 decisions during the activity reveal what they have understood.',
      'Its principal advantage is that it replaces the teacher entirely, because the scenarios supply all the information the learners need to reach the correct decisions.',
    ],
    correctIndex: 1,
    explanation:
      'A simulation gives learners authentic practice with the risk, cost or impracticality of the real setting removed, and it can be repeated. That is what the teacher gains: learners make the decisions they would face in an earthquake, see the consequences, and try again with new scenarios, all without the danger of a real drill. Cost is sometimes a benefit but is not the defining advantage. The activity does not remove the need for assessment \u2014 the decisions still have to be judged \u2014 and it does not replace the teacher, who still has to debrief and correct misconceptions.',
    rationale:
      'Identifying the defining advantage of simulation \u2014 safe, repeatable practice of otherwise impractical decisions.',
    source: 'Educational technology and methods; PRC ProfEd TOS area B (30%)',
  },
  {
    id: 'sit-pe-c-004',
    subjectId: 'profed',
    topicId: 'profed-curriculum',
    difficulty: 5,
    vignette:
      'A teacher is planning a unit and wants to make sure her assessment is fair to what she taught. She writes her intended learning outcomes first, in terms of what learners should be able to do. She then designs the activities the learners will do to reach those outcomes. Only after that does she design the assessment, choosing tasks that require learners to demonstrate the outcomes she wrote. She checks that every outcome is assessed by at least one task, and that no task assesses something she did not teach.',
    prompt:
      'Which principle is the teacher applying, and why does the order in which she works matter?',
    options: [
      'The principle being applied is curriculum differentiation, and the order matters because learners of different abilities need different outcomes before activities can be planned.',
      'The principle being applied is constructive alignment, and the order matters because designing the assessment after the outcomes and activities ensures that what is assessed is what was taught and what learners were asked to do \u2014 rather than the assessment driving the teaching or measuring something never covered.',
      'The principle being applied is curriculum integration, and the order matters because outcomes from different subjects must be combined before activities can be designed.',
      'The principle being applied is mastery learning, and the order matters because learners must demonstrate one outcome before they are permitted to begin the next.',
    ],
    correctIndex: 1,
    explanation:
      'Constructive alignment matches intended learning outcomes, the activities learners do, and the assessment used to judge them. Working outcomes-first, then activities, then assessment is what guarantees the three line up: the assessment measures the stated outcomes, and the activities prepare learners for it. If assessment were designed first, teaching would tend to follow the test rather than the outcomes. Differentiation, integration and mastery learning are different principles \u2014 none of them is about aligning outcomes, activities and assessment.',
    rationale:
      'Recognising constructive alignment and explaining why the sequence of design decisions is what produces it.',
    source: 'Biggs, constructive alignment; PRC ProfEd TOS area B (30%)',
  },

  // ==================================================================
  // Professional Education — The Teaching Profession
  // ==================================================================
  {
    id: 'sit-pe-t-001',
    subjectId: 'profed',
    topicId: 'profed-teaching-profession',
    difficulty: 5,
    vignette:
      'A teacher keeps a folder throughout the school year. In it she places her lesson plans, samples of learner work that show a range of achievement, her written reflections after lessons that did not go as planned, notes from a peer observation she invited, and a record of the professional development sessions she attended and what she took from each. At the end of the year she reviews the folder and writes a short account of how her practice has changed. Her rater uses the folder as part of her performance evaluation.',
    prompt:
      'What is the principal professional purpose of the folder the teacher keeps?',
    options: [
      'Its principal purpose is that it satisfies the documentation requirement of her performance evaluation with the least possible effort, since the folder can be assembled from material she already produces.',
      'Its principal purpose is that it documents and reflects on her professional growth and provides evidence for evaluation, because the reflections and the record of change are what turn a collection of documents into evidence of developing practice.',
      'Its principal purpose is that it provides a means of comparing her learners against one another, since it contains work samples from a range of achievement levels.',
      'Its principal purpose is that it replaces classroom observation entirely, since the folder contains a fuller record of her practice than an observer could gather in a single lesson.',
    ],
    correctIndex: 1,
    explanation:
      'A teaching portfolio is a reflective record of practice used as evidence of growth and performance. What makes it more than a folder of documents is the reflection \u2014 the account of how practice has changed and why \u2014 and the range of evidence, including work samples, peer observation and professional development. It does not replace classroom observation, which captures practice as it happens in a way no folder can. And the purpose of the work samples is to show a range of achievement, not to rank learners against each other.',
    rationale:
      'Identifying the reflective purpose of a teaching portfolio and what distinguishes evidence of growth from a mere collection of documents.',
    source: 'PPST and RPMS; PRC ProfEd TOS area A (15%)',
  },
  {
    id: 'sit-pe-t-002',
    subjectId: 'profed',
    topicId: 'profed-teaching-profession',
    difficulty: 5,
    vignette:
      'A student teacher is asked in a seminar why teaching is described as a profession rather than simply as a job. Several answers are offered. One participant says it is because teachers are paid a salary. Another says it is because teachers work in classrooms under a principal\u2019s supervision. A third says it is because teachers are licensed, hold a specialised body of knowledge, exercise judgement in their work, and are bound by a code of ethics. A fourth says it is because teachers are required to attend professional development sessions each year.',
    prompt:
      'Which participant has given the most accurate account of what makes teaching a profession?',
    options: [
      'The most accurate account is given by the first, because remuneration distinguishes work that is formally employed from work that is not.',
      'The most accurate account is given by the second, because working under supervision within an institution is what distinguishes a profession from a trade.',
      'The most accurate account is given by the third, because a profession is defined by a licensure requirement, a specialised knowledge base, autonomy in judgement, and adherence to a code of ethics.',
      'The most accurate account is given by the fourth, because a requirement for continuing professional development is the defining feature of a profession.',
    ],
    correctIndex: 2,
    explanation:
      'The defining marks of a profession are a licensure requirement, a specialised body of knowledge, autonomy in professional judgement, and a code of ethics governing conduct. Salary, workplace, supervision and mandatory professional development are all features that many occupations share and none of them distinguishes a profession from a job. Continuing professional development is a consequence of professional status rather than its definition.',
    rationale:
      'Recalling the defining characteristics of a profession and rejecting features that are common to many kinds of employment.',
    source: 'The teaching profession; PRC ProfEd TOS area A (15%)',
  },

  // ==================================================================
  // Professional Education — Field Study and Internship
  // ==================================================================
  {
    id: 'sit-pe-f-001',
    subjectId: 'profed',
    topicId: 'profed-field-study',
    difficulty: 5,
    vignette:
      'A student teacher has just finished teaching a lesson that went badly. The learners were confused by the second activity, several finished early and started talking, and she ran out of time before the closing summary. She is tempted to move straight on to planning the next lesson, because she has a lot of material to cover before the end of her practicum. Her cooperating teacher suggests she spend twenty minutes on the lesson before moving on.',
    prompt:
      'Why is the cooperating teacher right to insist on this, and what should the student teacher actually do in those twenty minutes?',
    options: [
      'The teacher is right because the cooperating teacher is required to document the student teacher\u2019s errors for the practicum record, and the twenty minutes should be spent writing an account of what went wrong.',
      'The teacher is right because reflection turns experience into learning, and the twenty minutes should be spent working out what specifically caused the confusion in the second activity and what she would change, so that the next lesson does not repeat the same fault.',
      'The teacher is right because the lesson must be taught again to the same class before the learners forget the material, and the twenty minutes should be spent planning the reteach.',
      'The teacher is right because the student teacher should record the learners\u2019 names for the purpose of reporting their behaviour to their parents, and the twenty minutes should be spent compiling that list.',
    ],
    correctIndex: 1,
    explanation:
      'Reflective practice is what converts an experience into learning: the teacher reviews what happened, asks why, and changes the next iteration. The twenty minutes are best spent identifying the specific cause of the confusion \u2014 was the instruction unclear, was the activity too hard, was the transition mismanaged \u2014 and deciding what to change. Simply writing an account of what went wrong is description, not reflection. Reteaching without understanding the cause would repeat the fault. And the learners\u2019 talking was a symptom of the lesson design, not a discipline problem to be reported.',
    rationale:
      'Distinguishing reflection from description, and identifying the diagnostic work that makes reflection useful.',
    source: 'Reflective practice; PRC ProfEd TOS area E (20%)',
  },
  {
    id: 'sit-pe-f-002',
    subjectId: 'profed',
    topicId: 'profed-field-study',
    difficulty: 5,
    vignette:
      'A student teacher is about to begin her practicum. Her cooperating teacher advises her to spend the first two weeks establishing routines: how learners enter the room, how materials are distributed and collected, how the class transitions between activities, and what learners should do when they finish early. The student teacher is impatient \u2014 she wants to start teaching content immediately, and she feels that spending two weeks on routines is a waste of her limited practicum time.',
    prompt:
      'Why is the cooperating teacher\u2019s advice sound?',
    options: [
      'The advice is sound because routines make the class quieter, which makes the student teacher look more competent to the observers who will assess her practicum.',
      'The advice is sound because predictable routines remove ambiguity about what learners should do next, which reduces time lost to transitions and to off-task behaviour and returns that time to instruction \u2014 so the two weeks are an investment in the teaching time that follows.',
      'The advice is sound because routines are required by DepEd order, and a student teacher who does not establish them will fail the practicum on a technicality.',
      'The advice is sound because routines replace the need for classroom rules, and a class without rules cannot be taught.',
    ],
    correctIndex: 1,
    explanation:
      'Routines make behaviour predictable, so learners do not have to be told what to do at each transition and the teacher does not have to manage uncertainty. The time saved on transitions and off-task behaviour is time returned to instruction, which is why establishing routines early pays for itself. Quieter classes and a better impression on observers are side effects, not the reason. Routines are not a DepEd requirement, and they complement rules rather than replacing them.',
    rationale:
      'Explaining the instructional rationale for routines \u2014 recovered teaching time \u2014 rather than accepting surface justifications.',
    source: 'Classroom management; PRC ProfEd TOS area E (20%)',
  },
  {
    id: 'sit-pe-f-003',
    subjectId: 'profed',
    topicId: 'profed-field-study',
    difficulty: 5,
    vignette:
      'A student teacher wants to conduct action research during her practicum. She proposes a study titled \u201cImproving the Academic Performance of All Learners in the School.\u201d Her supervisor asks her to narrow it. After discussion, she revises it to \u201cDoes a weekly five-minute peer-feedback routine improve Grade 8 learners\u2019 use of evidence in written art critiques?\u201d',
    prompt:
      'Why is the revised title more appropriate for action research than the original?',
    options: [
      'Because the revised title is shorter and therefore easier to fit on the cover page of the research report.',
      'Because the revised title names a specific, observable practice, a defined group of learners and a measurable outcome, all of which lie within the student teacher\u2019s power to influence during a practicum \u2014 whereas the original was too broad to be investigated or resolved within one cycle.',
      'Because the revised title avoids mentioning academic performance, which is not an appropriate focus for action research conducted by a student teacher.',
      'Because the revised title focuses on a single grade level, and action research may only be conducted with one class at a time.',
    ],
    correctIndex: 1,
    explanation:
      'Action research addresses a real, local problem that the practitioner can act on, so the problem statement must be narrow enough to investigate and resolve within the available time. The revised title specifies the intervention (a weekly five-minute peer-feedback routine), the participants (Grade 8 learners), and the outcome (use of evidence in written art critiques), all of which the student teacher can influence. The original was so broad that no single cycle could address it. Length, the topic of academic performance, and the number of classes are not the issues.',
    rationale:
      'Recognising that action research requires a narrow, actionable problem statement bounded by what the practitioner can influence.',
    source: 'Action research in teaching internship; PRC ProfEd TOS area E (20%)',
  },

  // ==================================================================
  // General Education — Art Appreciation
  // ==================================================================
  {
    id: 'sit-ge-art-001',
    subjectId: 'gened',
    topicId: 'gened-art-appreciation',
    difficulty: 5,
    vignette:
      'A student visits a museum for the first time. She walks past a large abstract painting and says she does not understand it, and that a child could have painted it. Her companion, who has studied art, does not disagree with her reaction. Instead, he asks her what colours she notices first, where her eye travels after that, what the painting makes her feel, and what the artist might have been trying to do. By the end of the conversation the student is still unsure whether she likes the painting, but she can describe what it is doing and why it was made that way.',
    prompt:
      'What has the student developed through this conversation, and what does that tell us about art appreciation?',
    options: [
      'She has learned to like the painting, which shows that art appreciation is ultimately about developing a positive response to works of art.',
      'She has developed the ability to perceive, interpret and evaluate a work of art, which shows that art appreciation is about building the capacity to engage with a work on its own terms rather than about reaching a predetermined verdict on it.',
      'She has learned the date and artist of the painting, which shows that art appreciation depends on factual knowledge of art history.',
      'She has learned to paint in an abstract style, which shows that art appreciation requires practical skill in making art.',
    ],
    correctIndex: 1,
    explanation:
      'Art appreciation builds the viewer\u2019s capacity to perceive, interpret and evaluate works using knowledge of the elements, principles and context. The student ends the conversation able to describe what the painting is doing and why, even though she still does not know whether she likes it \u2014 and that is the point. Appreciation is not the same as liking, and it does not require factual recall or practical skill, though both can inform it. The item tests whether the student understands that appreciation is a capacity, not a verdict.',
    rationale:
      'Distinguishing art appreciation as a capacity to engage from liking a work, and rejecting factual recall and production skill as its definition.',
    source: 'Art appreciation; PRC GenEd TOS',
  },
  {
    id: 'sit-ge-art-002',
    subjectId: 'gened',
    topicId: 'gened-art-appreciation',
    difficulty: 5,
    vignette:
      'A teacher shows her class a mural in which unequal shapes are arranged on either side of a central figure. The left side carries a large dark mass low in the composition; the right side carries several smaller bright shapes higher up. Despite the imbalance in size and colour, the composition feels stable, and the class agrees that nothing seems to be falling over. The teacher asks the class to explain how the mural achieves this.',
    prompt:
      'Which principle of art explains why the mural feels stable despite its unequal sides?',
    options: [
      'The principle at work is symmetrical balance, because the central figure divides the composition into two halves that mirror each other.',
      'The principle at work is asymmetrical balance, because visual stability is achieved through unequal elements \u2014 a large dark mass on one side balanced by several smaller bright shapes on the other \u2014 rather than through mirroring.',
      'The principle at work is radial balance, because the composition radiates outward from the central figure toward the edges of the mural.',
      'The principle at work is emphasis, because the central figure draws the viewer\u2019s attention and the eye settles there rather than noticing the imbalance.',
    ],
    correctIndex: 1,
    explanation:
      'Asymmetrical balance achieves visual stability through unequal elements rather than through mirroring. A large dark mass can be balanced by several smaller bright shapes because visual weight depends on size, value and colour together, not on size alone. Symmetrical balance would require the two sides to match, which the item says they do not. Radial balance radiates from a centre, and emphasis directs attention to a focal point \u2014 neither explains why the composition does not feel like it is tipping over.',
    rationale:
      'Recognising asymmetrical balance from a described composition, and understanding that visual weight is not determined by size alone.',
    source: 'Principles of art; PRC GenEd TOS',
  },

  // ==================================================================
  // General Education — Rizal
  // ==================================================================
  {
    id: 'sit-ge-riz-001',
    subjectId: 'gened',
    topicId: 'gened-rizal',
    difficulty: 5,
    vignette:
      'A teacher is comparing Rizal\u2019s two novels with her class. She explains that the first was published in Berlin in 1887 and that its publication was financed by Rizal\u2019s friend Maximo Viola, who had come to Europe partly to check on Rizal\u2019s health. She explains that the second was published in Ghent in 1891, and that Rizal dedicated it to the memory of three priests executed in 1872 following the Cavite mutiny. She asks the class to explain what the dedication reveals about the novel\u2019s purpose.',
    prompt:
      'Which of the following best explains what the dedication of the second novel reveals about its purpose?',
    options: [
      'It shows that the second novel was written as a personal tribute to three friends of Rizal\u2019s family, and that its political content was incidental to that purpose.',
      'It shows that the second novel was written to expose the injustice that had been done to the three priests and, through them, the wider abuse of power under Spanish rule \u2014 so the novel was conceived as a work of political protest rather than merely a sequel.',
      'It shows that the second novel was intended for a Spanish readership rather than a Filipino one, since a dedication to martyrs would carry more weight with Spanish readers.',
      'It shows that the second novel was written after Rizal had abandoned the reformist aims of the first and had committed himself to armed revolution.',
    ],
    correctIndex: 1,
    explanation:
      'El Filibusterismo is dedicated to the memory of the Gomburza \u2014 the priests Mariano Gomez, Jose Burgos and Jacinto Zamora, executed in 1872 after the Cavite mutiny. The dedication frames the novel as an indictment of the injustice done to them and, by extension, of the abuse of power under Spanish colonial rule. That makes the novel a work of political protest, and it is darker in tone than the Noli as a result. Rizal did not advocate armed revolution \u2014 he explicitly disavowed it, which is one of the novel\u2019s central tensions.',
    rationale:
      'Reading the dedication of El Filibusterismo as evidence of the novel\u2019s political purpose, and rejecting the claim that Rizal turned to revolution.',
    source: 'Jose Rizal, El Filibusterismo (1891); PRC GenEd TOS',
  },
  {
    id: 'sit-ge-riz-002',
    subjectId: 'gened',
    topicId: 'gened-rizal',
    difficulty: 5,
    vignette:
      'A teacher is discussing the Rizal Law with her class. She explains that the law was passed in 1956 and that it requires all Philippine schools to offer courses on Rizal\u2019s life, works and writings, particularly his two novels. A student asks why the law singles out the novels rather than Rizal\u2019s other writings. The teacher explains that the novels were written for a general readership and that they dramatised the social conditions of the time in a way that a treatise could not.',
    prompt:
      'Which of the following best explains why the Rizal Law gives particular emphasis to the two novels?',
    options: [
      'Because the novels are the only works Rizal wrote in the Philippines, and the law applies only to works written on Philippine soil.',
      'Because the novels reached a broad readership and dramatised the social and political conditions of the period through narrative, making them the most effective of Rizal\u2019s works for developing a critical understanding of Philippine history and national identity.',
      'Because the novels were the only works of Rizal\u2019s that were translated into Filipino, and the law requires materials in the national language.',
      'Because the novels were written after Rizal returned from Europe, and the law covers only his mature works.',
    ],
    correctIndex: 1,
    explanation:
      'The Rizal Law mandates the study of Rizal\u2019s life, works and writings, and gives particular emphasis to the two novels because they reached a wide readership and dramatised colonial conditions through narrative rather than argument. That made them the most effective vehicle for the law\u2019s purpose, which was to develop a critical understanding of Philippine history and national identity. The Noli was written in Europe, not in the Philippines, so the first option is factually wrong, and the other two invent restrictions the law does not contain.',
    rationale:
      'Explaining the rationale for the Rizal Law\u2019s emphasis on the novels, and rejecting factually incorrect accounts of where and when they were written.',
    source: 'RA 1425 (Rizal Law); PRC GenEd TOS',
  },

  // ==================================================================
  // General Education — Philippine History
  // ==================================================================
  {
    id: 'sit-ge-his-001',
    subjectId: 'gened',
    topicId: 'gened-history',
    difficulty: 5,
    vignette:
      'A teacher is teaching historical method using the 1521 Battle of Mactan as an example. She explains that the principal account of the battle comes from the chronicle of Antonio Pigafetta, who was a member of Magellan\u2019s expedition and an eyewitness to the events. She then asks her class to consider what this means for how the battle should be studied, given that the only detailed account was written by a member of the force that was defeated.',
    prompt:
      'What is the most important methodological point the teacher is making about the study of the Battle of Mactan?',
    options: [
      'That the Battle of Mactan cannot be studied historically at all, because the only available account is unreliable and therefore worthless as evidence.',
      'That the account is a primary source and is valuable precisely because it is an eyewitness record, but that it must be read critically \u2014 recognising whose perspective it represents and what it was written to do \u2014 rather than accepted as a neutral record.',
      'That the account should be disregarded in favour of later Filipino accounts, because only accounts written by Filipinos can be trusted to describe Filipino history accurately.',
      'That the account is a secondary source, because Pigafetta wrote it after the events rather than during them, and secondary sources must always be corroborated.',
    ],
    correctIndex: 1,
    explanation:
      'Pigafetta\u2019s chronicle is a primary source \u2014 an eyewitness record produced by a participant. That makes it valuable, because it is the closest available account to the events. But primary does not mean neutral: the account represents the perspective of the expedition, and reading it critically means asking whose interests it served and what it was written to accomplish. The methodological point is that a source can be both indispensable and partial at the same time. Disregarding it entirely, or rejecting it because of its author\u2019s nationality, would leave the historian with nothing to work from.',
    rationale:
      'Understanding that a primary source is valuable and partial at once, and that critical reading \u2014 not rejection \u2014 is the correct response.',
    source: 'Pigafetta\u2019s chronicle; PRC GenEd TOS \u2014 Readings in Philippine History',
  },
  {
    id: 'sit-ge-his-002',
    subjectId: 'gened',
    topicId: 'gened-history',
    difficulty: 5,
    vignette:
      'A teacher is explaining the significance of the Malolos Constitution of 1899 to her class. She notes that it established the First Philippine Republic under Emilio Aguinaldo, and that the republic is often described as the first constitutional republic in Asia. A student asks how this can be claimed when the Philippines was under American control shortly afterwards. The teacher explains that the claim concerns what the constitution established at the time it was promulgated, not how long the republic survived.',
    prompt:
      'Which of the following best states the historical significance of the Malolos Constitution?',
    options: [
      'Its significance is that it ended the Philippine Revolution by establishing a government that both Spain and the United States recognised.',
      'Its significance is that it established the First Philippine Republic, a constitutional government under Emilio Aguinaldo, and is significant as an early constitutional republic in Asia \u2014 a significance that rests on what it created, not on how long the republic lasted.',
      'Its significance is that it created the Philippine public school system and established Filipino as the language of instruction.',
      'Its significance is that it formally ceded the Philippines from Spain to the United States, ending Spanish colonial rule.',
    ],
    correctIndex: 1,
    explanation:
      'The Malolos Constitution established the First Philippine Republic under Emilio Aguinaldo, and it is significant as one of the earliest constitutional republics in Asia. Its significance lies in what it established \u2014 a constitutional government with a separation of powers \u2014 rather than in the duration of the republic, which was cut short by the Philippine\u2013American War. The revolution was not ended by it. The public school system came later under American administration. And the cession of the Philippines to the United States was effected by the Treaty of Paris in 1898, not by the Malolos Constitution.',
    rationale:
      'Stating the significance of the Malolos Constitution in terms of what it established, and separating it from the Treaty of Paris and later developments.',
    source: 'Malolos Constitution (1899); PRC GenEd TOS \u2014 Readings in Philippine History',
  },
];

export const SITUATIONAL_QUESTIONS: readonly Question[] = SEEDS.map((seed) => ({
  ...seed,
  status: 'approved' as const,
  situational: true,
}));

export const SITUATIONAL_COUNT = SITUATIONAL_QUESTIONS.length;
