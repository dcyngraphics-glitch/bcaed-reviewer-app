import type { QuestionDraft } from '../../pipeline';

/**
 * Culture and Arts Education — items cae-001 … cae-025.
 *
 * CAE is the second of the two subjects still short for a fillable 350-item
 * paper (56 items short after the GenEd batches), and it carries 40% of the
 * Secondary rating, so under-supplying it is the most expensive gap in the bank.
 *
 * Covers all five CAE topics: disciplinal knowledge, creative expressions,
 * pedagogy, research, and accountability.
 *
 * Sources: NCCA Order of National Artists (8 categories) and Gawad sa
 * Manlilikha ng Bayan; Philippine dance, music and visual-art traditions;
 * bul-ul (Cordillera), okir and sarimanok (Maranao and Tausug); Discipline-Based
 * Art Education (DBAE); art criticism and aesthetics; Philippine Statistics
 * Authority; CHED Art Appreciation and culture-based education; DepEd Order
 * No. 35, s. 2016 (basic education in the arts).
 */

const V = (text: string) => text.trim();

export const BATCH_CAE: readonly QuestionDraft[] = [
  // ===================== DISCIPLINAL KNOWLEDGE =====================
  {
    id: 'cae-101',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher shows her class a photograph of a carved wooden figure from the
      Cordillera: a seated human form with shortened limbs and a prominent
      head. She explains that it was placed in a granary to guard the rice, and
      that it was also understood as a representation of an ancestor. She then
      shows a curvilinear design with a bird-like figure at its centre, and says
      it comes from a different people entirely.
    `),
    prompt: 'Which of the following correctly identifies the two objects?',
    options: [
      'The carved figure is a bul-ul of the Cordillera, and the curvilinear design is okir of the Maranao and Tausug.',
      'The carved figure is okir of the Cordillera, and the curvilinear design is a bul-ul of the Maranao.',
      'Both objects are Maranao, differing only in the material used.',
      'Both objects are Cordillera, differing only in their size.',
    ],
    correctIndex: 0,
    explanation:
      'The bul-ul is a carved wooden figure of the Cordillera that served both as a granary guardian and as an ancestral representation \u2014 the two purposes the teacher described. Okir is the curvilinear motif of the Maranao and Tausug, and the bird at its centre is the sarimanok. These are two different peoples with two different traditions, which is exactly what the item asks the learner to keep separate.',
    rationale:
      'Distinguishing a Cordillera carved figure from a Maranao design motif by origin and function.',
    source: 'Philippine art and craft traditions; PRC CAE TOS \u2014 Disciplinal Knowledge',
  },
  {
    id: 'cae-102',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher explains the Order of National Artists to her class. She tells
      them it is the highest national recognition for Filipinos who have
      contributed to Philippine arts, that it is jointly administered by two
      institutions, and that a learner who correctly lists its categories will
      be asked which of them covers a sculptor.
    `),
    prompt: 'Which category of the Order of National Artists covers a sculptor?',
    options: [
      'A sculptor falls under Visual Arts.',
      'A sculptor falls under Architecture and Allied Arts.',
      'A sculptor falls under Literature.',
      'A sculptor falls under Traditional Folk Arts.',
    ],
    correctIndex: 0,
    explanation:
      'The order has eight categories: Music, Dance, Theater, Visual Arts, Literature, Film and Broadcast Arts, and Architecture and Allied Arts. Sculpture sits within Visual Arts, alongside painting and related forms. Traditional folk arts are recognised separately through the Gawad sa Manlilikha ng Bayan, which is a different award \u2014 a distinction the last option blurs and that is the most common error on this topic.',
    rationale:
      'Placing sculpture correctly within the National Artist categories.',
    source: 'NCCA, Order of National Artists; PRC CAE TOS \u2014 Disciplinal Knowledge',
  },
  {
    id: 'cae-103',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher shows a photograph of a dance in which two long bamboo poles are
      clapped together against the ground while a dancer steps in and out between
      them. She explains that the dance comes from Leyte, that its name comes
      from a bird that hops among grass stems, and that the dancer\u2019s footwork
      imitates that bird.
    `),
    prompt: 'Which dance is the teacher describing?',
    options: [
      'The dance being described is the Tinikling, a Leyte folk dance in which dancers step between bamboo poles clapped on the ground.',
      'The dance being described is the Singkil, a Maranao royal dance drawn from the Darangen epic.',
      'The dance being described is the Itik-itik, which imitates the movements of a duck.',
      'The dance being described is the Pandanggo sa Ilaw, in which dancers balance lighted lamps.',
    ],
    correctIndex: 0,
    explanation:
      'Tinikling is from Leyte and takes its name from the tikling bird, whose movement among grass stems the dancer imitates by stepping between two bamboo poles clapped on the ground. Singkil also uses bamboo poles but is a Maranao royal dance from the Darangen, so the prop alone does not identify it. Itik-itik imitates a duck, and Pandanggo sa Ilaw involves balancing lamps \u2014 neither matches a bird hopping among stems.',
    rationale:
      'Identifying a folk dance from its prop, region and the origin of its name together.',
    source: 'Philippine folk dance literature; PRC CAE TOS \u2014 Disciplinal Knowledge',
  },
  {
    id: 'cae-104',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is preparing a display for Buwan ng Wika. She wants to show a
      Filipino love song traditionally sung in triple metre, which the learners
      will first clap in a strong-weak-weak pattern before she names it. She
      asks a learner to name a related form that is also a love song, and the
      learner suggests a form defined by being sung beneath a window.
    `),
    prompt: 'Which vocal form is the teacher presenting?',
    options: [
      'The teacher is presenting a kundiman, a Filipino love song traditionally set in triple metre.',
      'The teacher is presenting a harana, a serenade sung beneath a woman\u2019s window.',
      'The teacher is presenting a balagtasan, a formal poetic debate.',
      'The teacher is presenting a kumintang, a song of the Katipunan period.',
    ],
    correctIndex: 0,
    explanation:
      'The kundiman is an art song of devotion and longing traditionally in 3/4 time, which is why the learners clap a three-beat pattern. A harana is also a courtship song but is defined by being sung outside a woman\u2019s window rather than by its metre \u2014 which is exactly the distinction the learner is being asked to make. A balagtasan is a poetic debate, and a kumintang belongs to the revolutionary period.',
    rationale:
      'Separating two courtship-song forms by metre and function rather than by subject matter.',
    source: 'Philippine music literature; PRC CAE TOS \u2014 Disciplinal Knowledge',
  },
  {
    id: 'cae-105',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher displays two works in her class and asks learners to describe
      them before interpreting anything. She then shows a third work and asks the
      class to judge whether it is successful as art. A learner asks her which of
      the two tasks they are doing.
    `),
    prompt: 'What are the two disciplines the teacher is distinguishing?',
    options: [
      'The first is art criticism, which involves describing, analysing, interpreting and judging a work, and the second is aesthetics, which concerns judgements about beauty.',
      'The first is art criticism and the second is art history, which places the work in its period.',
      'The first is aesthetics and the second is art production, which asks learners to make their own version.',
      'The first is iconography, which identifies subject matter, and the second is iconology, which interprets deeper meaning.',
    ],
    correctIndex: 0,
    explanation:
      'Describing, analysing, interpreting and judging a particular work is art criticism. Judging whether a work succeeds as art \u2014 whether it is good or beautiful \u2014 is aesthetics, which deals with the nature of beauty itself rather than with a specific object. Art history is contextual placement, and art production is making, neither of which the teacher asks for. Iconography and iconology are two stages within interpretation, not the overall split the learner is asking about.',
    rationale:
      'Separating criticism of a particular work from aesthetics as a field.',
    source: 'Discipline-Based Art Education; PRC CAE TOS \u2014 Disciplinal Knowledge',
  },
  // ===================== CREATIVE EXPRESSIONS =====================
  {
    id: 'cae-106',
    subjectId: 'cae',
    topicId: 'cae-creative',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher gives each learner paper and asks them to draw a picture using
      only straight lines. One draws a house with a square body and a triangle
      roof; another draws a face made of rectangles. She then asks which element
      of art the class has been using, explaining that it can be horizontal,
      vertical or diagonal, and that its direction can suggest calm or movement.
    `),
    prompt: 'Which element of art is the teacher teaching?',
    options: [
      'The element being taught is line, which runs horizontally, vertically or diagonally and can suggest calm or movement.',
      'The element being taught is shape, which is a two-dimensional area enclosed by a boundary.',
      'The element being taught is form, which is a three-dimensional object with volume.',
      'The element being taught is texture, which is the surface quality of an object.',
    ],
    correctIndex: 0,
    explanation:
      'Line is the element with length and direction, and its orientation carries meaning: horizontal lines tend to suggest calm, diagonals movement. The instruction to use only straight lines, plus the explanation of direction, identifies line specifically. Shape is the enclosed two-dimensional area the lines create; form is three-dimensional; texture is surface quality. The teacher\u2019s own explanation of direction is the giveaway.',
    rationale:
      'Identifying an element of art from a drawing task and the teacher\u2019s stated property.',
    source: 'Elements of art; PRC CAE TOS \u2014 Creative Expressions',
  },
  {
    id: 'cae-107',
    subjectId: 'cae',
    topicId: 'cae-creative',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher shows her class two photographs of the same rice terrace. The
      first is a wide shot in which the terraces recede into the distance and
      appear small; the second is a close shot of a single terrace edge filling
      the frame. She asks the class how the choice of framing changes what each
      photograph communicates about the place.
    `),
    prompt: 'What is the teacher teaching through this comparison?',
    options: [
      'She is teaching that framing and scale are compositional choices that shape meaning, because the same subject communicates differently depending on how much of it is shown.',
      'She is teaching that the second photograph is technically superior because it shows more detail.',
      'She is teaching that photographs of landscapes should always be taken from a distance.',
      'She is teaching that the two photographs are equivalent because they show the same subject.',
    ],
    correctIndex: 0,
    explanation:
      'Framing and scale are deliberate compositional decisions: the wide shot conveys the extent and setting of the terraces, the close shot conveys texture and craft. Neither is superior \u2014 they communicate different things. Claiming technical superiority, prescribing a single distance, or treating the two as equivalent all miss the point of the comparison, which is that meaning comes from the choices made.',
    rationale: 'Understanding framing as a meaning-making choice rather than a technical quality.',
    source: 'Art appreciation and composition; PRC CAE TOS \u2014 Creative Expressions',
  },
  {
    id: 'cae-108',
    subjectId: 'cae',
    topicId: 'cae-creative',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher plays two short pieces for her class. The first is in duple
      metre and the learners clap a strong-weak pattern; the second is in triple
      metre and they clap strong-weak-weak. She then plays a third piece without
      telling them anything, and asks them to clap along until they can feel the
      pattern repeat.
    `),
    prompt: 'What musical skill is the teacher developing, and why is clapping appropriate?',
    options: [
      'The teacher is developing the ability to identify metre by ear, and clapping works because metre is a recurring strong-weak beat pattern that is felt before it is analysed.',
      'The teacher is developing the ability to read notation, and clapping is appropriate because it replaces the need for a score.',
      'The teacher is developing the ability to sing in tune, and clapping is appropriate because it strengthens pitch.',
      'The teacher is developing knowledge of musical history, and clapping is appropriate because it identifies the period of the piece.',
    ],
    correctIndex: 0,
    explanation:
      'Metre is the recurring pattern of strong and weak beats that organises a piece, and the teacher is training learners to hear it by feeling it first \u2014 clapping until the repetition becomes apparent. This follows the Dalcroze principle that rhythm is understood through the body. Clapping teaches neither notation, nor pitch, nor historical period, and it does not need to: the target is metre alone.',
    rationale:
      'Identifying a rhythm skill and why physical response is the right route to it.',
    source: 'Music education methodology; PRC CAE TOS \u2014 Creative Expressions',
  },
  {
    id: 'cae-109',
    subjectId: 'cae',
    topicId: 'cae-creative',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is planning a performance for a school festival. She wants the
      class to present a folk dance, and she has to decide between staging it
      exactly as it is traditionally performed, with its original costume,
      music and floor patterns, or adapting it so that a small stage and her
      learners\u2019s abilities are accommodated. She asks the class what each choice
      would change about the dance.
    `),
    prompt: 'What is the teacher deciding between?',
    options: [
      'She is deciding between fidelity to the traditional form and adaptation to performance conditions, which changes the work\u2019s cultural content as well as its staging.',
      'She is deciding between choreography and improvisation, since a folk dance is always set in advance.',
      'She is deciding between individual performance and group performance, which depends on her class size.',
      'She is deciding between traditional and contemporary dance, since folk dances are no longer performed.',
    ],
    correctIndex: 0,
    explanation:
      'Preserving a traditional form and adapting it to the stage are both legitimate, but adaptation is not merely cosmetic: changing costume, music or floor patterns changes what the dance signifies culturally. That trade-off is what the teacher is weighing. Folk dance is set in advance, so the second reading inverts the issue. Class size determines casting, not the form itself. And traditional dances continue to be performed, often by precisely the schools deciding these questions.',
    rationale:
      'Recognising the fidelity-versus-adaptation trade-off in presenting traditional art.',
    source: 'Philippine performing arts; PRC CAE TOS \u2014 Creative Expressions',
  },
  {
    id: 'cae-110',
    subjectId: 'cae',
    topicId: 'cae-creative',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher asks her learners to paint a landscape, and one learner produces a
      careful, realistic copy of a photograph. Another paints the same view as
      broad strokes of colour that suggest trees and sky without depicting them
      precisely. The teacher asks the class which painting communicates more
      about the artist\u2019s feelings.
    `),
    prompt: 'Which painting communicates more about the artist\u2019s feelings?',
    options: [
      'The expressive painting, because it distorts form and colour in ways that carry the artist\u2019s emotional response.',
      'The realistic painting, because realism is the highest form of artistic achievement.',
      'Both communicate equally, because artistic quality is purely a matter of personal preference.',
      'The realistic painting, because a photograph is the only reliable source for a landscape.',
    ],
    correctIndex: 0,
    explanation:
      'Expressionism subordinates resemblance to the communication of feeling: distortion, exaggeration and non-naturalistic colour are the means by which inner experience is conveyed, so the expressive painting carries more of the artist\u2019s state. Realism is not a higher achievement \u2014 it is a different aim. That quality is not purely a matter of preference, because the expressive work communicates something specific that the realistic work does not. And a photograph is one reference among many, not a required source.',
    rationale:
      'Identifying expressionism by its aim of conveying feeling rather than resemblance.',
    source: 'Art appreciation; PRC CAE TOS \u2014 Creative Expressions',
  },
  // ===================== PEDAGOGY =====================
  {
    id: 'cae-111',
    subjectId: 'cae',
    topicId: 'cae-pedagogy',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      An art teacher wants learners to understand the difference between
      describing a work of art and interpreting it. She shows a painting and asks
      one group to list only what they can see \u2014 colours, shapes, figures,
      arrangement. She asks a second group to say what they think it means and to
      give a reason from the painting itself for each claim.
    `),
    prompt: 'What is the teacher separating, and what makes the second task interpretive?',
    options: [
      'She is separating description from interpretation within art criticism, and the second task is interpretive because it requires a claim plus evidence from the work.',
      'She is separating art criticism from aesthetics, and the second task is interpretive because it asks learners to judge beauty.',
      'She is separating art production from art history, and the second task is interpretive because it places the work in its period.',
      'She is separating aesthetics from art production, and the second task is interpretive because learners make their own version.',
    ],
    correctIndex: 0,
    explanation:
      'Both groups are doing art criticism, which covers describing, analysing, interpreting and judging. The first describes; the second interprets. What makes the second interpretive rather than merely opinionated is that each claim must be justified with evidence drawn from the work itself. Aesthetics concerns beauty, art history concerns context, and production concerns making \u2014 none of which is what either group is doing.',
    rationale:
      'Distinguishing description from interpretation inside art criticism.',
    source: 'Discipline-Based Art Education; PRC CAE TOS \u2014 Pedagogical Practice',
  },
  {
    id: 'cae-112',
    subjectId: 'cae',
    topicId: 'cae-pedagogy',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      An art teacher is planning a unit on Philippine folk dance for forty
      learners in a small classroom with no sound system and no mirrors. She
      teaches the dance in three stages: first the class learns the rhythm by
      clapping and counting in their seats, then they learn the footwork in place
      without travelling, and only then do they attempt the full movement in
      small groups while the rest of the class counts the beat aloud.
    `),
    prompt: 'What principle is the teacher applying in sequencing the unit this way?',
    options: [
      'She is applying part-to-whole sequencing with task analysis, breaking a complex skill into components mastered separately before being combined.',
      'She is applying whole-method instruction, in which learners attempt the complete skill from the start and correct errors as they arise.',
      'She is applying discovery learning, in which learners work out the dance for themselves without instruction.',
      'She is applying peer tutoring, in which learners teach one another without the teacher\u2019s involvement.',
    ],
    correctIndex: 0,
    explanation:
      'The teacher has analysed the dance into rhythm, then footwork in place, then travelling movement, and sequences them so each is established before the next is added \u2014 part-to-whole task analysis, which suits a complex motor skill under space constraints because it lets learners build components without the full coordination demand at once. Whole-method instruction would have them attempt the dance immediately. Discovery learning would remove instruction, and peer tutoring would remove the teacher, who is plainly directing every stage.',
    rationale:
      'Recognising part-to-whole task analysis from the described sequence.',
    source: 'Instructional planning and motor skill acquisition; PRC CAE TOS \u2014 Pedagogical Practice',
  },
  {
    id: 'cae-113',
    subjectId: 'cae',
    topicId: 'cae-pedagogy',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher has forty-two learners and one art period a week. She wants
      learners to see a wide range of work, so she sets up stations where small
      groups rotate through drawing, painting, collage and sculpture. She is
      worried because some learners finish early and others do not reach the
      sculpture station at all before the period ends.
    `),
    prompt: 'What is the teacher most concerned about?',
    options: [
      'She is concerned about unequal time on tasks, because rotation length is set by the slowest group rather than by each learner\u2019s needs.',
      'She is concerned about insufficient artistic talent among her learners.',
      'She is concerned about the stations being too similar to one another.',
      'She is concerned about learners exceeding the required number of art periods.',
    ],
    correctIndex: 0,
    explanation:
      'In station work the time available at each station is determined by the schedule, so fast finishers wait and slow finishers are cut off \u2014 which is exactly the problem she describes, and it is a matter of pacing design rather than of ability, similarity or scheduling. Talent is not what determines whether a learner reaches a station. Stations with different activities are the point of the arrangement, and the number of periods is fixed by the timetable rather than by learners.',
    rationale: 'Identifying unequal task time in station work as a design consequence, not an ability problem.',
    source: 'Classroom organisation in arts teaching; PRC CAE TOS \u2014 Pedagogical Practice',
  },
  {
    id: 'cae-114',
    subjectId: 'cae',
    topicId: 'cae-pedagogy',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      An art teacher keeps a folder for each learner containing their planning
      sheets, drafts, revised work and a reflection written at the end of each
      unit. At the end of the year she looks at the folders and can see not only
      what each learner can now do but how their approach changed. She explains
      that this is why she has kept them.
    `),
    prompt: 'Why does the teacher keep these folders?',
    options: [
      'To present longitudinal evidence of each learner\u2019s growth and development in the arts, rather than a single final result.',
      'To select the best work of each learner for display at the end-of-year exhibition.',
      'To rank learners from strongest to weakest for the teacher\u2019s own records.',
      'To satisfy a school requirement that a folder of artwork be maintained.',
    ],
    correctIndex: 0,
    explanation:
      'The folders let the teacher see development over time \u2014 the drafts and revisions show how a learner\u2019s thinking changed, which no single final artwork could reveal. That longitudinal record is the stated reason. Choosing the best pieces for display is a legitimate use of a portfolio, but it is not what she says she wants, since she explicitly wants to see how approach changed. Nothing suggests ranking, and while documentation is required, a requirement does not explain why she keeps reflection sheets as well.',
    rationale:
      'Identifying a portfolio\u2019s developmental purpose rather than its display or compliance uses.',
    source: 'Portfolio assessment in the arts; PRC CAE TOS \u2014 Pedagogical Practice',
  },
  // ===================== RESEARCH =====================
  {
    id: 'cae-115',
    subjectId: 'cae',
    topicId: 'cae-research',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher wants to know whether her learners\u2019 attitude toward art class
      changes over a term. She asks them to write a short paragraph at the start
      of the term describing how they feel about art, and another at the end. She
      then reads all the paragraphs and groups the statements into themes, counting
      how many learners express each theme before and after.
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
      'The data are the learners\u2019 own written statements \u2014 words, not numbers \u2014 so the data are qualitative. Grouping statements into themes and counting their frequency is thematic coding, a standard qualitative technique; counting does not convert the data into quantitative, because what is counted is the occurrence of themes derived from the text. Measuring twice does not make a study experimental, and data collected from participants is primary, not secondary.',
    rationale: 'Classifying data by its form rather than by the arithmetic performed on it.',
    source: 'Research methods; PRC CAE TOS \u2014 Research and Extension',
  },
  {
    id: 'cae-116',
    subjectId: 'cae',
    topicId: 'cae-research',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher surveys learners about their art practices and finds that most
      report drawing at home. She then interviews a smaller group in depth, asking
      how they learned, what discouraged them, and what their families think of
      art. She combines the two sets of findings and notes that the interview
      participants explained why the survey figures came out as they did.
    `),
    prompt: 'What does the interview layer contribute that the survey could not?',
    options: [
      'It provides explanation and context for the survey findings, which breadth alone cannot supply.',
      'It provides a larger sample, which makes the findings more generalisable.',
      'It provides objective measurement, which the self-reported survey lacked.',
      'It allows the teacher to select which survey responses to include.',
    ],
    correctIndex: 0,
    explanation:
      'A survey establishes breadth and patterns; a follow-up interview explains the reasons behind them, which is why the teacher could say the interviews showed why the figures came out as they did. The interview group is smaller, so it reduces rather than increases generalisability. Self-reported data is not made objective by interviewing, and the teacher selected nothing \u2014 she explained rather than filtered, and filtering would be a serious flaw.',
    rationale:
      'Distinguishing what a qualitative follow-up adds over breadth from what it costs.',
    source: 'Research methods; PRC CAE TOS \u2014 Research and Extension',
  },
  {
    id: 'cae-117',
    subjectId: 'cae',
    topicId: 'cae-research',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher wants to know whether a school art competition improves learners\u2019
      interest in art. She cannot randomly assign learners to enter or not enter,
      because teachers decide who enters. She compares the interest ratings of
      learners who entered with those who did not, and notes that the two groups
      may have differed before the competition.
    `),
    prompt: 'Why is this study described as quasi-experimental?',
    options: [
      'Because there is a treatment and a comparison group but no random assignment, so pre-existing differences between the groups are a real limitation.',
      'Because no one was manipulated, so the study cannot test cause at all.',
      'Because the comparison group was chosen by the teacher rather than selected at random from all learners.',
      'Because the study used rating scales rather than interviews to measure interest.',
    ],
    correctIndex: 0,
    explanation:
      'Quasi-experimental means experimental in structure but without random assignment \u2014 there is a treatment and a comparison group, and the acknowledged weakness is that the groups may not have been equivalent beforehand. The second reading is wrong: such studies can still support causal inference, cautiously. The third confuses sample selection with assignment to conditions, and the fourth is irrelevant to the design.',
    rationale:
      'Identifying quasi-experimental structure by the absence of random assignment.',
    source: 'Research methods; PRC CAE TOS \u2014 Research and Extension',
  },
  {
    id: 'cae-118',
    subjectId: 'cae',
    topicId: 'cae-research',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher presents a bar graph of enrolment in arts subjects over six
      years. Enrolment rose, then fell, then rose again. She asks a learner what
      conclusion can be drawn, and the learner says enrolment is steadily
      increasing. She asks the learner to look again at the shape of the line.
    `),
    prompt: 'Why is the learner\u2019s conclusion unsupported?',
    options: [
      'Because the overall direction masks a decline in the middle years, so describing the trend as steady discards part of the data.',
      'Because bar graphs cannot represent change over time at all.',
      'Because enrolment figures should be expressed as percentages rather than counts.',
      'Because six years is too short a period to establish any trend.',
    ],
    correctIndex: 0,
    explanation:
      'The data rose, fell, then rose again, so the net change over six years is positive but the path is not monotonic. Summarising that as a steady increase discards the decline, which is the kind of error that happens when only endpoints are compared. Bar graphs represent change over time perfectly well. Counts are appropriate unless the size of the cohort changed, and six years is long enough to describe a pattern even if it cannot establish causation.',
    rationale:
      'Rejecting a trend claim that discards intervening data.',
    source: 'Data interpretation; PRC CAE TOS \u2014 Research and Extension',
  },
  // ===================== ACCOUNTABILITY =====================
  {
    id: 'cae-119',
    subjectId: 'cae',
    topicId: 'cae-accountability',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher reviews the laws that govern her profession. She notes that one
      law created the licensure requirement for teachers and placed it under the
      Professional Regulation Commission, while a different law sets out the
      rights and privileges of public school teachers, including working hours
      and leave entitlements.
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
      'Attributing teacher licensure to the correct statute, separate from the Magna Carta.',
    source: 'Republic Act 7836; PRC CAE TOS \u2014 Professional Accountability',
  },
  {
    id: 'cae-120',
    subjectId: 'cae',
    topicId: 'cae-accountability',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is asked to write a letter of recommendation for a former learner
      applying for an art scholarship. The learner was diligent and cooperative but
      performed poorly in the teacher\u2019s subject, and the family is relying on
      the scholarship. The teacher writes that the learner is hardworking and
      cooperative, which is true, but does not mention the performance, even
      though the scholarship is for that field of study.
    `),
    prompt: 'What is the ethical problem with the letter?',
    options: [
      'The letter is misleading by omission, because it presents only favourable facts and withholds information directly relevant to the panel\u2019s decision.',
      'The letter is unethical because a teacher should never write a recommendation for a former learner.',
      'The letter is unethical because the teacher considered the learner\u2019s family circumstances.',
      'There is no ethical problem, because everything the teacher wrote is factually true.',
    ],
    correctIndex: 0,
    explanation:
      'Truthfulness of each statement is not the only requirement of an honest recommendation. Withholding the learner\u2019s performance in the very field the scholarship covers creates a misleading impression for the panel that must decide \u2014 deception by omission. Writing recommendations is a normal professional act, the family circumstances were never mentioned, and the fact that every sentence is true does not cure a selectively incomplete account.',
    rationale:
      'Recognising deception by omission, and that factual accuracy of each statement is not sufficient.',
    source: 'Code of Ethics for Professional Teachers; PRC CAE TOS \u2014 Professional Accountability',
  },
  {
    id: 'cae-121',
    subjectId: 'cae',
    topicId: 'cae-accountability',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A school holds a cultural festival and a teacher is asked to display
      learners\u2019 artworks. A parent objects that displaying a learner\u2019s artwork
      publicly without consent breaches the learner\u2019s right to privacy. Another
      parent objects that withholding the display penalises the learner. The
      teacher asks the class to weigh the two concerns rather than to pick one.
    `),
    prompt: 'What is the teacher asking the class to do?',
    options: [
      'To weigh a learner\u2019s privacy against their right to recognition, since both are genuine interests and the resolution depends on obtaining consent.',
      'To decide which of the two parents is correct about the law.',
      'To decide whether the festival should be held at all.',
      'To decide whether artworks should be displayed in schools at all.',
    ],
    correctIndex: 0,
    explanation:
      'Both concerns are legitimate: a learner has a right to privacy and also to recognition for their work. The teacher asks for the trade-off to be reasoned about, which in practice means obtaining consent rather than deciding whose objection automatically wins. Deciding which parent is legally correct asks a question the class cannot settle, and both remaining options reduce a specific decision to a general policy question the vignette does not raise.',
    rationale:
      'Weighing competing genuine interests rather than choosing between them.',
    source: 'Child protection and learners\u2019 rights; PRC CAE TOS \u2014 Professional Accountability',
  },
  {
    id: 'cae-122',
    subjectId: 'cae',
    topicId: 'cae-accountability',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is asked to evaluate a colleague who co-taught a unit with her and
      who is a close friend. The colleague asks her directly what score she will
      give. The teacher worries that a high score would look like favouritism and
      that a low one would be unfair, and asks the head teacher how to proceed.
    `),
    prompt: 'What is the most defensible course of action?',
    options: [
      'Declare the conflict, arrange for the rating to be made by someone else, and participate only in the factual parts she can judge impartially.',
      'Rate the colleague herself but keep the score low, so that no one can suspect favouritism.',
      'Rate the colleague at the highest score, because their friendship is evidence that they work well together.',
      'Decline to say anything at all, since any involvement would be improper.',
    ],
    correctIndex: 0,
    explanation:
      'The standard response to a conflict of interest is to disclose it, hand the decision to an impartial party, and still contribute what can be judged without bias \u2014 such as factual observations about agreed criteria. Penalising the colleague to appear even-handed is a different kind of unfairness, and friendship is not evidence of professional quality. Declining entirely is also wrong, because observers have legitimate evidence about their own teaching and withholding it serves nobody.',
    rationale: 'Handling a declared conflict of interest by disclosure and reassignment.',
    source: 'Code of Ethics for Professional Teachers; PRC CAE TOS \u2014 Professional Accountability',
  },
  {
    id: 'cae-123',
    subjectId: 'cae',
    topicId: 'cae-accountability',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher learns that a learner has been given a work of art attributed to a
      famous Filipino artist as part of a school activity. The teacher suspects
      it is a reproduction, and she considers whether to report it. A colleague
      says reporting it would embarrass the learner and achieve nothing, and that
      the teacher should just leave it alone.
    `),
    prompt: 'What is the most appropriate response?',
    options: [
      'Verify the attribution, then report it through the proper channel so the school can correct the record and address how the work was obtained.',
      'Say nothing, because a learner\u2019s embarrassment outweighs the inaccuracy.',
      'Confront the learner publicly, so that other learners learn not to accept unverified attributions.',
      'Report the teacher or parent who supplied the work, without first establishing whether the attribution is inaccurate.',
    ],
    correctIndex: 0,
    explanation:
      'An inaccurate attribution of a work to a named artist is a real inaccuracy that misrepresents cultural heritage, so it should be verified and then addressed through the proper channel. Avoiding embarrassment for one learner does not make an untrue attribution acceptable, and the harm is to the record rather than to the learner\u2019s feelings alone. Public confrontation is unprofessional and is not how a learner is taught accuracy. And reporting a person before establishing the facts risks accusing someone wrongly \u2014 verification comes first.',
    rationale:
      'Verifying before reporting, and addressing a false attribution through proper channels.',
    source: 'Professional accountability; PRC CAE TOS \u2014 Professional Accountability',
  },
  {
    id: 'cae-124',
    subjectId: 'cae',
    topicId: 'cae-accountability',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is asked how she knows whether a lesson succeeded. She lists
      several sources: her own judgement, the learners\u2019 output, their feedback,
      and what she observed during the lesson. She then notes that she did not ask
      the learners whether they found the lesson interesting, and wonders whether
      that omission matters.
    `),
    prompt: 'Does the omission matter?',
    options: [
      'It does matter, because learners\u2019 own perspectives are among the sources of evidence on whether a lesson worked, and they are the only source who can report their experience.',
      'It does not matter, because the teacher\u2019s observation is the most reliable evidence available.',
      'It does not matter, because learner feedback tends to be unrealistically positive and so adds nothing.',
      'It matters only if learners complain, since then a formal feedback process is required.',
    ],
    correctIndex: 0,
    explanation:
      'Reliable assessment of a lesson draws on several sources, and learners are the only ones who can report what the experience of it was like \u2014 their engagement and their account of difficulty are evidence the teacher cannot supply from inside the lesson. The teacher\u2019s observation is valuable but partial. Learners are not uniformly positive, which is why their reports are informative rather than flattering, and no complaint is needed to justify gathering evidence about whether learning occurred.',
    rationale:
      'Recognising learners as a distinct and necessary source of assessment evidence.',
    source: 'Assessment of learning; PRC CAE TOS \u2014 Professional Accountability',
  },
  {
    id: 'cae-125',
    subjectId: 'cae',
    topicId: 'cae-accountability',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is told that her art programme will be reviewed by an external
      team. The review covers not only her lessons but also how she documents
      learner outcomes, her own professional development, and her contribution to
      school activities. She asks whether this review is fair, since she believes
      her classroom practice is strong.
    `),
    prompt: 'What is the fairest assessment of her concern?',
    options: [
      'Her concern is understandable but incomplete: strong classroom practice is one of several indicators, and the others are also legitimately reviewed.',
      'Her concern is unfounded, because external review exists only to identify failing teachers.',
      'Her concern is correct, because classroom practice should be the sole basis for evaluating a teacher.',
      'Her concern is misplaced, because professional development and documentation are administrative rather than professional matters.',
    ],
    correctIndex: 0,
    explanation:
      'Professional evaluation draws on several domains, so strong classroom work is necessary but not sufficient \u2014 documenting outcomes, growing professionally and contributing to the school community are also part of the job, and reviewing them is legitimate. External review is not solely punitive, or it would deter participation. Nor is classroom practice the only valid basis. And documentation and professional development are professional requirements, not administrative filing, because they are how teaching quality is evidenced and sustained.',
    rationale:
      'Recognising that one strong indicator does not satisfy a multi-domain professional review.',
    source: 'DepEd Order No. 42, s. 2017 (PPST Domains 5, 6, 7); PRC CAE TOS \u2014 Professional Accountability',
  },
];

export default BATCH_CAE;
