import type { QuestionDraft } from '../../pipeline';

/**
 * Culture and Arts Education — items cae-149 … cae-168: the EASY band.
 *
 * A 140-item CAE section has a 42-item easy quota and the pool held 24, so 20
 * more at difficulty 2 is what closes the section.
 *
 * "Easy" means a single clear concept in a straightforward arts situation \u2014
 * still situational, still requiring the vignette to be read.
 *
 * Sources: NCCA Order of National Artists; Proclamation No. 294 (sampaguita);
 * Proclamation No. 479 (narra); tarsier; Philippine dance and music
 * literature; elements and principles of art; colour theory; Discipline-Based
 * Art Education; DepEd Order No. 35, s. 2016; RA 7836; Code of Ethics for
 * Professional Teachers; learner protection.
 */

const V = (text: string) => text.trim();

export const BATCH_CAE_3: readonly QuestionDraft[] = [
  {
    id: 'cae-149',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher shows her class a photograph of a small primate with enormous eyes,
      gripping a branch. She explains that it is found only in a few forested
      islands in the Philippines, that it is nocturnal, and that it is one of the
      country\u2019s most recognisable animals.
    `),
    prompt: 'Which animal is the teacher describing?',
    options: [
      'The animal is the tarsier, a nocturnal primate with large eyes found only in a few Philippine islands.',
      'The animal is the carabao, a draught animal used in farming.',
      'The animal is the Philippine eagle, a large bird of prey native to the islands.',
      'The animal is the lancet fish, a small fish caught in the South China Sea.',
    ],
    correctIndex: 0,
    explanation:
      'Small primate, enormous eyes, nocturnal, and endemic to a few Philippine islands \u2014 that is the tarsier. The carabao is a draught animal, the eagle is a bird rather than a primate, and the lancet fish is a fish. The primate traits and the nocturnal behaviour together rule out the alternatives.',
    rationale: 'Identifying the tarsier from its primate traits and endemic range.',
    source: 'Philippine fauna; PRC CAE TOS \u2014 Disciplinal Knowledge',
  },
  {
    id: 'cae-150',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher explains that a cultural practice is listed internationally as
      needing safeguarding. She notes that it is passed from parent to child within
      a particular community rather than taught in school, that the community agreed
      to the listing, and that the purpose is to keep the practice from disappearing.
    `),
    prompt: 'Why must the community agree to the listing?',
    options: [
      'Because the practice belongs to that community, which has the right to decide how it is represented.',
      'Because international bodies require community consent for all cultural listings.',
      'Because the practice cannot be listed otherwise.',
      'Because consent protects the community from legal liability.',
    ],
    correctIndex: 0,
    explanation:
      'A community\u2019s intangible heritage is its own, so it holds the right to decide whether and how it is represented \u2014 that is the ethical basis of requiring consent, not a matter of procedure. Consent is indeed required, but framing it as a rule rather than a right misses the principle. And it does protect the community from being represented without its say-so.',
    rationale: 'Explaining community consent as a rights matter rather than a procedural rule.',
    source: 'UNESCO, Intangible Cultural Heritage; PRC CAE TOS \u2014 Disciplinal Knowledge',
  },
  {
    id: 'cae-151',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher explains an award to her class. She says it is the highest national
      recognition conferred on Filipinos who have made an outstanding contribution
      to the arts, that it is administered jointly by two government bodies, and that
      it is granted by the President.
    `),
    prompt: 'Which award is the teacher describing?',
    options: [
      'The award is the Order of National Artists.',
      'The award is the Gawad sa Manlilikha ng Bayan.',
      'The award is the Palanca Awards for Literature.',
      'The award is the Metricolon of the Republic of the Philippines.',
    ],
    correctIndex: 0,
    explanation:
      'The highest national recognition for significant contributions to Philippine arts, conferred by the President and administered jointly, is the Order of National Artists. The Gawad sa Manlilikha ng Bayan honours traditional folk art forms and living bearers rather than individuals\u2019 overall contributions. The Palanca Awards recognise literary excellence specifically, and the Metricolon was a campaign honour.',
    rationale: 'Identifying the Order of National Artists from its conferral and administration.',
    source: 'NCCA, Order of National Artists; PRC CAE TOS \u2014 Disciplinal Knowledge',
  },
  {
    id: 'cae-152',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher shows her class two instruments. One is a boat-shaped wooden
      instrument played by a musician who strikes it with padded sticks while it
      rests on the lap, and the other is a set of eight tuned gongs laid out in a
      row. She explains that both are traditional Philippine instruments.
    `),
    prompt: 'What are these two instruments?',
    options: [
      'They are the kulintang a tiniok, a wooden boat-shaped drum struck with sticks, and the kulintang, a row of tuned gongs.',
      'They are the kulintang, a row of tuned gongs, and the tambora, a guitar-shaped string instrument.',
      'They are the kudyapi, a two-stringed lute, and the kulintang, a row of tuned gongs.',
      'They are the bahay kubo, a bamboo instrument, and the kulintang, a row of tuned gongs.',
    ],
    correctIndex: 0,
    explanation:
      'Eight tuned gongs laid in a row is the kulintang, and the wooden boat-shaped instrument struck with padded sticks is the kulintang a tiniok \u2014 a specific name for the accompanying drum. A tambora is a guitar-shaped stringed instrument, kudyapi is a two-stringed lute, and bahay kubo is a bamboo percussion tube.',
    rationale: 'Identifying two Philippine instruments by their physical description.',
    source: 'Philippine music literature; PRC CAE TOS \u2014 Disciplinal Knowledge',
  },
  {
    id: 'cae-153',
    subjectId: 'cae',
    topicId: 'cae-creative',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher holds up a painting and asks the class what creates the sense of depth
      in a landscape, where a small figure appears far away and a large figure
      appears near. She explains that overlapping forms, diminishing size, and
      placement higher on the picture plane all contribute.
    `),
    prompt: 'Which element of art is the teacher describing?',
    options: [
      'The element is space, which creates depth through overlap, relative size and position.',
      'The element is form, which describes three-dimensional objects.',
      'The element is texture, which describes surface quality.',
      'The element is line, which describes marks with direction.',
    ],
    correctIndex: 0,
    explanation:
      'Creating the illusion of depth and distance is the work of space, achieved through overlap, relative size and placement \u2014 all three mechanisms the teacher names. Form is three-dimensionality in the object itself, texture is surface quality, and line is a mark with direction.',
    rationale: 'Identifying space as the element that creates depth through overlap and scale.',
    source: 'Elements of art; PRC CAE TOS \u2014 Creative Expressions',
  },
  {
    id: 'cae-154',
    subjectId: 'cae',
    topicId: 'cae-creative',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher shows a still life in which every object is on a table directly facing
      the viewer, lit evenly from one side, with nothing overlapping. She asks the
      class what the artist has done to keep the composition from becoming
      confusing, and one learner says the objects do not compete for attention.
    `),
    prompt: 'Which property of the composition is the learner describing?',
    options: [

      'It is the principle of balance, where no area outweighs the rest.',
      'It is the principle of movement, where the eye travels along a path.',
      'It is the principle of emphasis, where one element dominates.',
      'It is the principle of rhythm, where repeated elements create a beat.'
    ],
    correctIndex: 0,
    explanation:
      'Even distribution of visual weight so that no object dominates and the composition reads clearly is balance. Movement concerns the path the eye takes. Emphasis is the opposite: one element dominating. Rhythm depends on repetition, which this still life deliberately avoids.',
    rationale: 'Identifying balance from even weight distribution without dominance.',
    source: 'Principles of design; PRC CAE TOS \u2014 Creative Expressions',
  },
  {
    id: 'cae-155',
    subjectId: 'cae',
    topicId: 'cae-creative',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is teaching about colour temperature. She shows a swatch of
      red-orange beside a swatch of blue-green and asks which swatch a learner would
      associate with fire and sunlight, and which with water and forest shade.
    `),
    prompt: 'What does the teacher describe?',
    options: [

      'The colour group the teacher is describing is warm colours, associated with fire and sunlight.',
      'The colour group the teacher is describing is cool colours, associated with fire and sunlight.',
      'The colour group the teacher is describing is primary colours, associated with fire and sunlight.',
      'The colour group the teacher is describing is neutral colours, associated with fire and sunlight.'
    ],
    correctIndex: 0,
    explanation:
      'Warm colours \u2014 reds, oranges and yellows, including red-orange \u2014 are the group associated with fire, sunlight and energy. Blue-green is cool, the group associated with water and shade, so the second reading reverses them. Primary colours are defined by not being mixed from others. And neutrals are greys, whites and blacks.',
    rationale: 'Identifying warm colours by their associations, not by their position on the wheel.',
    source: 'Colour theory; PRC CAE TOS \u2014 Creative Expressions',
  },
  {
    id: 'cae-156',
    subjectId: 'cae',
    topicId: 'cae-creative',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher shows a photograph and asks learners to name what they can actually
      see \u2014 a woman, a rope, a wooden structure, the expression on the face. She
      then asks what they think the photograph is about, and separates the two
      requests deliberately.
    `),
    prompt: 'What is the teacher distinguishing?',
    options: [
      'She is distinguishing description from interpretation.',
      'She is distinguishing art criticism from aesthetics.',
      'She is distinguishing iconography from iconology.',
      'She is distinguishing art history from art production.',
    ],
    correctIndex: 0,
    explanation:
      'Listing what is visible is description; saying what it is about is interpretation \u2014 the two stages of art criticism she keeps apart. Art criticism versus aesthetics compares judging a particular work with asking about beauty in general. Iconography and iconology are two levels of interpreting subject matter, both interpretive. And art history and art production concern context and making.',
    rationale: 'Distinguishing description from interpretation within art criticism.',
    source: 'Discipline-Based Art Education; PRC CAE TOS \u2014 Creative Expressions',
  },
  {
    id: 'cae-157',
    subjectId: 'cae',
    topicId: 'cae-creative',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher plays a piece of music and asks learners to raise their hands when
      they hear a long sustained sound followed by several short ones. She repeats
      it and asks the class to describe the pattern they heard.
    `),
    prompt: 'What musical concept is the teacher assessing?',
    options: [

      'It is rhythm, the pattern of long and short sounds in time.',
      'It is melody, the succession of pitches forming a tune.',
      'It is harmony, the combination of simultaneous sounds.',
      'It is timbre, the quality of a sound.'
    ],
    correctIndex: 0,
    explanation:
      'Long and short sounds arranged in time is rhythm, which is exactly what learners are asked to hear and describe. Melody is a succession of pitches forming a recognisable tune. Harmony concerns several sounds sounding together. And timbre is the quality that distinguishes one instrument from another.',
    rationale: 'Distinguishing rhythm from melody, harmony and timbre.',
    source: 'Music theory; PRC CAE TOS \u2014 Creative Expressions',
  },
  {
    id: 'cae-158',
    subjectId: 'cae',
    topicId: 'cae-creative',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher asks learners to make a paper construction that stands upright on its
      own without glue. She explains that folds, tabs and rolled tubes can create
      stiffness, and that the material must be arranged so the forces push against
      one another rather than in the same direction.
    `),
    prompt: 'What is the teacher developing?',
    options: [
      'The teacher is developing understanding of how structure and material properties produce stability.',
      'The teacher is developing drawing accuracy in technical drawing.',
      'The teacher is developing knowledge of art history.',
      'The teacher is developing colour harmony.',
    ],
    correctIndex: 0,
    explanation:
      'What makes paper stand without glue is structural \u2014 folds, tabs and tubes create stiffness, and stability comes from arranging forces against one another \u2014 so she is developing understanding of structure and material behaviour. Nothing here involves drawing to scale, art history, or colour.',
    rationale: 'Identifying structural understanding as the learning behind a construction task.',
    source: 'Materials and processes in art; PRC CAE TOS \u2014 Creative Expressions',
  },
  {
    id: 'cae-159',
    subjectId: 'cae',
    topicId: 'cae-pedagogy',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      An art teacher begins a lesson on a traditional pattern by showing a finished
      cloth and asking learners where the shapes repeat, and how many times the
      pattern runs before it comes back to its start. She then has them predict what
      comes next before anyone shows them.
    `),
    prompt: 'What is the teacher doing?',
    options: [

      'The teacher is having learners infer the rule and predict from it.',
      'The teacher is demonstrating copying accurately.',
      'The teacher is teaching the historical origins of the textile.',
      'The teacher is assessing the drawing of the pattern.'
    ],
    correctIndex: 0,
    explanation:
      'Asking learners to identify how the pattern repeats and to predict what follows makes them infer the rule themselves \u2014 mathematical reasoning applied to art. Copying accurately is a valid textile skill but is not what she asks for. No historical origins are mentioned, and the task is not about drawing the pattern.',
    rationale: 'Recognising pattern inference rather than copying as the learning in a textile lesson.',
    source: 'Teaching approaches in the arts; PRC CAE TOS \u2014 Pedagogical Practice',
  },
  {
    id: 'cae-160',
    subjectId: 'cae',
    topicId: 'cae-pedagogy',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher keeps a folder for each learner containing drafts, revisions and a
      short note on what changed and why. She explains that she wants to be able to
      see the learner\u2019s thinking at more than one point, not only in the finished
      work.
    `),
    prompt: 'What is the teacher collecting?',
    options: [

      'The teacher is collecting a portfolio, evidence of development over time.',
      'The teacher is collecting a performance rating, judging performance against standards.',
      'The teacher is collecting a survey, collecting responses from learners.',
      'The teacher is collecting a tally sheet, counting completed activities.'
    ],
    correctIndex: 0,
    explanation:
      'A collection of drafts, revisions and explanatory notes, kept to show development rather than a single endpoint, is a portfolio. A performance rating judges performance against standards. A survey collects responses from others rather than a learner\u2019s own work over time. And a tally sheet counts activities rather than gathering evidence of thinking.',
    rationale: 'Identifying a portfolio as longitudinal evidence of learner development.',
    source: 'Portfolio assessment in the arts; PRC CAE TOS \u2014 Pedagogical Practice',
  },
  {
    id: 'cae-161',
    subjectId: 'cae',
    topicId: 'cae-pedagogy',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher works with a learner who cannot make a straight line freehand. She
      gives her a ruler, then a template, then removes both and has her attempt it
      again, increasing the difficulty each time while keeping the task the same.
    `),
    prompt: 'What is the teacher doing?',
    options: [

      'The teacher is fading the support while keeping the task constant.',
      'The teacher is simplifying the task so less is required.',
      'The teacher is assigning group work so the learner copies a classmate.',
      'The teacher is grading the learner on the finished result only.'
    ],
    correctIndex: 0,
    explanation:
      'The task stays the same and the support is withdrawn in steps \u2014 ruler, then template, then nothing \u2014 which is fading, designed so the learner ends able to perform it independently. The task is not simplified; the aid is removed. Nothing involves a classmate copying anything. And grading on the final result is not what the progression is for.',
    rationale: 'Identifying fading from progressive removal of support on a constant task.',
    source: 'Scaffolding and fading; PRC CAE TOS \u2014 Pedagogical Practice',
  },
  {
    id: 'cae-162',
    subjectId: 'cae',
    topicId: 'cae-pedagogy',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher asks learners to look at a painting and write what they notice before
      discussing it. She explains that in a whole-class discussion the confident
      learners tend to set the direction, and that written notice-taking first gives
      everyone something to bring.
    `),
    prompt: 'Why does the teacher ask for written notice first?',
    options: [

      'She does it because it gives every learner a contribution to make.',
      'She does it because writing improves learners’ handwriting.',
      'She does it because class discussion is not an effective method.',
      'She does it because written work is easier to assess than oral work.'
    ],
    correctIndex: 0,
    explanation:
      'In whole-class talk the confident tend to frame what is discussed, so recording notice individually first gives every learner something to contribute \u2014 which is the teacher\u2019s stated reason. That is the pedagogical point; handwriting and ease of assessment are not part of it. And the method combines written and oral work, so it is not a rejection of discussion.',
    rationale: 'Explaining written-first routines as a remedy for confident learners dominating.',
    source: 'Classroom discussion; PRC CAE TOS \u2014 Pedagogical Practice',
  },
  {
    id: 'cae-163',
    subjectId: 'cae',
    topicId: 'cae-research',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher asks each learner to name one thing they found difficult in the unit.
      She then groups the answers into themes and counts how many learners mention
      each. She explains that she is looking at the learners\u2019 own words rather than
      at scores, so that she knows what to reteach.
    `),
    prompt: 'What kind of data has she collected?',
    options: [

      'The data she has collected are qualitative, the learners’ own statements.',
      'The data she has collected are quantitative, because she counts the themes.',
      'The data she has collected are primary, because she collected them herself.',
      'The data she has collected are experimental, because she gathered them after teaching.'
    ],
    correctIndex: 0,
    explanation:
      'The data are words \u2014 the learners\u2019 own statements \u2014 so they are qualitative, and grouping them into themes and counting is thematic coding. Counting themes does not make the data quantitative. Her data is indeed primary, so that reading is also true but does not answer what she asked. And gathering data after teaching does not make it experimental.',
    rationale: 'Classifying data by its form rather than by how it was collected or analysed.',
    source: 'Research methods; PRC CAE TOS \u2014 Research and Extension',
  },
  {
    id: 'cae-164',
    subjectId: 'cae',
    topicId: 'cae-research',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher surveys learners and finds that many say they would like more time on
      a particular activity. She checks the timetable and finds that the activity is
      allotted more time than any other, and concludes that stated preference and
      actual provision differ here.
    `),
    prompt: 'What has the teacher established?',
    options: [

      'She has established that stated preference and actual provision do not correspond.',
      'She has established that learners cannot be trusted to say what they want.',
      'She has established that the timetable was set against learners’ wishes.',
      'She has established that more time on the activity would improve learning.'
    ],
    correctIndex: 0,
    explanation:
      'Learners can want more of something they already have plenty of, so stated preference and actual provision are different measurements \u2014 which is what she has established. Nothing suggests dishonesty. Deliberate intent is not implied. And while more time might help, neither the survey nor the timetable comparison shows that it would.',
    rationale: 'Distinguishing stated preference from actual provision.',
    source: 'Research methods; PRC CAE TOS \u2014 Research and Extension',
  },
  {
    id: 'cae-165',
    subjectId: 'cae',
    topicId: 'cae-research',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher wants to know whether a new approach improves learners\u2019 work. She
      cannot randomly assign learners because teachers decide who is in which class,
      so she compares one class taught with the approach against another class taught
      as before, and notes that the second class is stronger overall.
    `),
    prompt: 'How should the teacher describe her study?',
    options: [

      'The study is quasi-experimental, groups not randomly assigned.',
      'The study is experimental, with a treatment and comparison group.',
      'The study is correlational, looking for a relationship.',
      'The study is action research, improving her own practice.'
    ],
    correctIndex: 0,
    explanation:
      'A treatment and a comparison group without random assignment is a quasi-experiment, and her note about the second class being stronger identifies the pre-existing difference that limits it. Having groups is not what makes a study experimental \u2014 random assignment is. She is manipulating an approach rather than measuring two variables together. And although she is improving her own practice, the design she describes is quasi-experimental.',
    rationale: 'Identifying quasi-experimental structure by the absence of random assignment.',
    source: 'Research methods; PRC CAE TOS \u2014 Research and Extension',
  },
  {
    id: 'cae-166',
    subjectId: 'cae',
    topicId: 'cae-accountability',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is asked which law created the requirement that teachers be licensed,
      and she explains that it established the licensure system and placed it under
      the Professional Regulation Commission, and that a different law governs
      teachers\u2019 working hours and leave.
    `),
    prompt: 'Which law established teacher licensure?',
    options: [

      'It was established by RA 7836, the Philippine Teachers Professionalization Act of 1994.',
      'It was established by RA 4670, the Magna Carta for Public School Teachers.',
      'It was established by RA 10533, the Enhanced Basic Education Act of 2013.',
      'It was established by RA 7394, the Museums and Galleries Act.'
    ],
    correctIndex: 0,
    explanation:
      'RA 7836 professionalised teaching and placed licensure under the Professional Regulation Commission \u2014 exactly what the teacher describes. RA 4670 is the second law she mentions, covering working hours and leave. RA 10533 established K to 12, and RA 7394 concerns museums and galleries.',
    rationale: 'Attributing teacher licensure to the correct statute.',
    source: 'Republic Act 7836; PRC CAE TOS \u2014 Professional Accountability',
  },
  {
    id: 'cae-167',
    subjectId: 'cae',
    topicId: 'cae-accountability',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is asked to write a recommendation for a learner and chooses to
      mention only what the learner has genuinely done well, leaving out a relevant
      weakness. She reasons that the letter is entirely truthful.
    `),
    prompt: 'What is the problem with the letter?',
    options: [

      'The problem is that it is misleading by omission, a selectively complete account.',
      'The problem is that there is none, since every statement is true.',
      'The problem is that there is none, since recommendations should be positive.',
      'The problem is that it is too short to be considered.'
    ],
    correctIndex: 0,
    explanation:
      'Honesty in a recommendation requires representing the candidate\u2019s competence against the criteria, not only their strengths \u2014 so a truthful letter that omits a relevant weakness still misleads the person deciding. Truth of individual sentences does not cure a selectively incomplete account. Recommendations should not be uniformly positive, and length has nothing to do with it.',
    rationale: 'Recognising deception by omission in an otherwise truthful document.',
    source: 'Code of Ethics for Professional Teachers; PRC CAE TOS \u2014 Professional Accountability',
  },
  {
    id: 'cae-168',
    subjectId: 'cae',
    topicId: 'cae-accountability',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher displays learners\u2019 work at a school exhibition. A parent objects
      that her child\u2019s work is displayed without consent, and another parent objects
      that not displaying it unfairly disadvantages her child. The teacher explains
      that both concerns are legitimate and that the way to address them is to ask
      the learners first.
    `),
    prompt: 'What is the teacher doing?',
    options: [

      'She is weighing two legitimate interests and resolving them by consent.',
      'She is deciding that the parents’ rights override the learners’.',
      'She is deciding that the learners’ rights override the parents’.',
      'She is leaving the decision to the learners without explaining it.'
    ],
    correctIndex: 0,
    explanation:
      'Privacy and recognition are both genuine interests, and neither automatically defeats the other \u2014 so the teacher weighs them and resolves the question by asking the learners, which respects both. Declaring one side\u2019s rights superior would not weigh anything, and it is the learners\u2019 own privacy and recognition at stake. Explaining the reasoning is part of respecting the learners.',
    rationale: 'Weighing competing rights rather than declaring one superior.',
    source: 'Learner protection; PRC CAE TOS \u2014 Professional Accountability',
  },
];

export default BATCH_CAE_3;
