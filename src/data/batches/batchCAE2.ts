import type { QuestionDraft } from '../../pipeline';

/**
 * Culture and Arts Education — items cae-126 … cae-148.
 *
 * Companion to batchCAE.ts. Targets the disciplines, creative expression,
 * pedagogy, research and accountability topics.
 *
 * Sources: Philippine dance (sakuting, carinosa, binaylan, zarzuela,
 * sarswela, komedya, bodabil); Philippine music (kumintang, kundyapi,
 * tambora, bahay kubo); tarsier; bougainvillea; sampaguita; Proclamation
 * No. 294, s. 1934; Proclamation No. 479, s. 1934; NCCA Order of National
 * Artists; UNESCO intangible cultural heritage; Discipline-Based Art
 * Education; DepEd Order No. 35, s. 2016; RA 7394; creative-thinking research
 * (Torrance); research methods.
 */

const V = (text: string) => text.trim();

export const BATCH_CAE_2: readonly QuestionDraft[] = [
  {
    id: 'cae-126',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher shows her class a photograph of two dancers facing each other
      behind a rack of suspended sticks, striking them together as a girl steps
      between them. She explains that the dance comes from the Maranao people and
      that its name refers to the fact that the dancers move according to
      prescribed steps.
    `),
    prompt: 'Which dance is the teacher describing?',
    options: [
      'The dance being described is the Singkil, a Maranao dance in which the movements follow prescribed steps.',
      'The dance being described is the Tinikling, a Leyte dance in which dancers step between bamboo poles.',
      'The dance being described is the Sarangay, in which dancers imitate the movements of a cobra.',
      'The dance being described is the Binaylan, in which dancers carry trays on their heads.',
    ],
    correctIndex: 0,
    explanation:
      'Singkil is a Maranao dance whose name refers to prescribed steps, performed with a rack of sticks struck together as a dancer steps through. Tinikling also uses poles but is Leyte, from the tikling bird. Sarangay imitates a cobra and Binaylan involves carrying trays \u2014 neither matches the rack of sticks or the name given.',
    rationale: 'Identifying Singkil by its Maranao origin, stick rack, and the meaning of its name.',
    source: 'Philippine folk dance literature; PRC CAE TOS \u2014 Disciplinal Knowledge',
  },
  {
    id: 'cae-127',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is preparing a lesson on the national flower. She explains that the
      sampaguita does not have the largest or most showy bloom of any Philippine
      flower, but that it is chosen because of its fragrance, its abundance and
      the meanings attached to it. She asks the class why the selection was not
      made on appearance alone.
    `),
    prompt: 'Why was the sampaguita chosen as the national flower?',
    options: [
      'It was chosen for reasons of cultural significance, fragrance and prevalence rather than for visual spectacle.',
      'It was chosen because it has the largest flower of any Philippine plant.',
      'It was chosen because it grows only in the Philippines and nowhere else.',
      'It was chosen because it was the first flower introduced by Spanish colonisers.',
    ],
    correctIndex: 0,
    explanation:
      'The sampaguita was declared the national flower on the strength of its fragrance, how common and easy it is to grow, and the meanings it carries \u2014 not because it is visually dominant. It is not endemic; it grows in many tropical places. And it is native to the Philippines rather than an introduction from Spain.',
    rationale: 'Explaining a national-symbol selection by significance rather than appearance or rarity.',
    source: 'Proclamation No. 294, s. 1934; PRC CAE TOS \u2014 Disciplinal Knowledge',
  },
  {
    id: 'cae-128',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is discussing a genre of Philippine theatre. She explains that the
      genre developed from a religious performance, that its stories concern saints
      and the struggles of ordinary people against evil, and that it was performed
      in Spanish during the colonial period with dialogue in both Spanish and
      Tagalog.
    `),
    prompt: 'Which genre is the teacher describing?',
    options: [
      'The teacher is describing the sarswela, a genre that grew from religious drama and dealt with saints and everyday virtue.',
      'The teacher is describing the zarzuela, which originated in Spain and was sung throughout.',
      'The teacher is describing the komedya, which told the story of dusty roads and travellers.',
      'The teacher is describing the bodabil, which was a form of vaudeville.',
    ],
    correctIndex: 0,
    explanation:
      'The sarswela grew out of Spanish religious drama, kept religious subject matter while adding moral conflicts faced by ordinary people, and used a mix of Spanish and Tagalog. The zarzuela is Spanish in origin and sung, which is not what she describes. The komedya was about ordinary travellers on difficult roads, and the bodabil was a burlesque or vaudeville form \u2014 both are secular and later in origin.',
    rationale: 'Identifying sarswela from its religious origins and bilingual performance tradition.',
    source: 'Philippine theatre history; PRC CAE TOS \u2014 Disciplinal Knowledge',
  },
  {
    id: 'cae-129',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher explains that a cultural practice is being considered for an
      international list of heritage that needs safeguarding. She notes that the
      practice is transmitted within a particular community rather than taught
      formally in schools, that the community itself must consent to it being
      listed, and that the aim is to keep it alive rather than to display it.
    `),
    prompt: 'What is being described?',
    options: [
      'Intangible cultural heritage, which is safeguarding a living practice transmitted within a community that consents to its listing.',
      'A national museum collection, which preserves artefacts permanently under government custody.',
      'A cultural property declared a World Heritage site, which protects a physical place.',
      'A curriculum subject, which teaches heritage formally to all learners.',
    ],
    correctIndex: 0,
    explanation:
      'A practice transmitted within a community, listed with that community\u2019s consent for safeguarding rather than display, is intangible cultural heritage. A museum collection preserves objects, and this is explicitly a practice. A World Heritage listing protects a physical place. And because it is not transmitted formally in schools, the last reading is wrong on two counts.',
    rationale: 'Identifying intangible cultural heritage by community transmission and consent.',
    source: 'UNESCO, Intangible Cultural Heritage; PRC CAE TOS \u2014 Disciplinal Knowledge',
  },
  {
    id: 'cae-130',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher explains that a wood from the Philippines is valued for its hardness
      and its resistance to water, that it was traditionally used for furniture and
      for the hulls of boats, and that it was declared the national tree. She asks
      the class why a wood would be chosen to represent a nation.
    `),
    prompt: 'Which wood is the national tree of the Philippines?',
    options: [
      'The national tree is the narra, valued for its hardwood and its resistance to water.',
      'The national tree is the acacia, valued for its shade and its rapid growth.',
      'The national tree is the molave, valued for the toughness of its timber.',
      'The national tree is the narra, valued for the fragrance of its flowers.',
    ],
    correctIndex: 0,
    explanation:
      'Narra is the national tree, chosen for a durable hardwood historically used for furniture, boat hulls and house posts. The acacia and molave are both real Philippine trees, but neither is the national tree. The fourth option names narra for a property \u2014 fragrance \u2014 that does not belong to it, which is the trap.',
    rationale: 'Identifying narra and the property that made it the national tree.',
    source: 'Proclamation No. 479, s. 1934; PRC CAE TOS \u2014 Disciplinal Knowledge',
  },
  {
    id: 'cae-131',
    subjectId: 'cae',
    topicId: 'cae-creative',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher gives learners an object such as a key or a leaf and asks them to
      draw it as many times as they can in thirty seconds. She then explains that
      the point is not the drawing but how many ideas each learner produced, and
      that a learner who produced three ideas has more material to work with than
      one who produced a single careful attempt.
    `),
    prompt: 'What is the teacher developing?',
    options: [
      'Fluency, the ability to generate many ideas or solutions without judging them as they come.',
      'Flexibility, the ability to vary an idea once it has been produced.',
      'Elaboration, the ability to add detail to an idea.',
      'Originality, the ability to produce ideas no one else has.',
    ],
    correctIndex: 0,
    explanation:
      'Rapid production of many unjudged alternatives is fluency \u2014 generating quantity without self-editing during the process. Flexibility comes after, varying an existing idea. Elaboration would mean adding detail to one idea. And originality is not the target: the exercise rewards how many ideas someone generates, not how unprecedented they are.',
    rationale: 'Distinguishing fluency from flexibility, elaboration and originality.',
    source: 'Creative thinking; PRC CAE TOS \u2014 Creative Expressions',
  },
  {
    id: 'cae-132',
    subjectId: 'cae',
    topicId: 'cae-creative',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher shows a ceramic vessel whose surface has been coated and fired so
      that it became hard and glassy and no longer absorbs water. She explains that
      the same material, left unfired and porous, has traditionally been used for
      jars and pots, and that the transformation depends entirely on the
      temperature and duration of the firing.
    `),
    prompt: 'What is the teacher describing?',
    options: [
      'The transformation of clay into a hard, non-absorbent material through firing.',
      'The addition of glaze to an already-fired ceramic surface.',
      'The carving of a vessel from a single piece of stone.',
      'The construction of a vessel by joining two fired halves.',
    ],
    correctIndex: 0,
    explanation:
      'Firing clay drives off water and changes its structure so it becomes hard, vitrified and non-porous \u2014 which is why the fired vessel no longer absorbs water while unfired clay does. That is a change in the material itself. Glazing is applying a surface coating to an already-fired piece. Neither carving stone nor joining halves describes a single fired vessel.',
    rationale: 'Identifying ceramic transformation through firing rather than surface decoration.',
    source: 'Materials and processes in art; PRC CAE TOS \u2014 Creative Expressions',
  },
  {
    id: 'cae-133',
    subjectId: 'cae',
    topicId: 'cae-creative',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher plays two recordings to her class. In the first a single instrument
      carries the main line with others accompanying. In the second the parts
      trade places, so that what was accompaniment becomes prominent and the
      melody is passed between them. She asks the class what technique is being
      demonstrated.
    `),
    prompt: 'What technique is being demonstrated?',
    options: [
      'The technique is imitation or call and response, where the parts exchange the melodic material.',
      'The technique is counterpoint, where independent melodies sound simultaneously without exchanging material.',
      'The technique is serialism, where a tone row governs the whole work.',
      'The technique is homophony, where one melody is accompanied throughout.',
    ],
    correctIndex: 0,
    explanation:
      'Passing the main material between voices so that accompaniment and melody trade places is imitation \u2014 often heard as call and response. Counterpoint is independent lines sounding together without taking over from one another. Serialism governs a work from a fixed series of tones. And homophony is the first arrangement described, which the second recording deliberately is not.',
    rationale: 'Distinguishing imitation from counterpoint, serialism and homophony.',
    source: 'Music theory; PRC CAE TOS \u2014 Creative Expressions',
  },
  {
    id: 'cae-134',
    subjectId: 'cae',
    topicId: 'cae-creative',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is explaining a design principle and holds up a poster in which
      small shapes at one edge lead the eye toward a much larger shape at the
      other. She explains that the eye is drawn along a path through the
      composition, and that the artist has deliberately arranged things so the
      viewer\u2019s attention arrives somewhere specific.
    `),
    prompt: 'Which principle of design is the teacher describing?',
    options: [
      'The principle is movement, which guides the eye through a composition toward a point of emphasis.',
      'The principle is rhythm, which repeats elements to create a visual beat.',
      'The principle is balance, which distributes visual weight evenly.',
      'The principle is unity, which makes elements feel of a piece.',
    ],
    correctIndex: 0,
    explanation:
      'Directing the eye along a path toward a focal point is movement \u2014 the principle concerned with how attention travels within a work. Rhythm works through repetition producing a beat. Balance is about the distribution of visual weight, not direction. And unity concerns elements belonging together, which says nothing about where the eye goes.',
    rationale: 'Identifying movement as the principle governing the eye\u2019s path.',
    source: 'Principles of design; PRC CAE TOS \u2014 Creative Expressions',
  },
  {
    id: 'cae-135',
    subjectId: 'cae',
    topicId: 'cae-creative',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is teaching colour and shows learners a set of paint chips. She
      puts yellow next to violet and asks what the pair has in common, then puts
      blue next to orange and asks again. She explains that these pairs sit
      directly opposite each other on the colour wheel and produce the strongest
      contrast when placed side by side.
    `),
    prompt: 'What is the teacher describing?',
    options: [
      'She is describing complementary colours, which sit opposite each other on the colour wheel.',
      'She is describing analogous colours, which sit next to each other on the colour wheel.',
      'She is describing triadic colours, which sit evenly spaced around the colour wheel.',
      'She is describing primary colours, which cannot be produced by mixing others.',
    ],
    correctIndex: 0,
    explanation:
      'Colours opposite each other on the wheel \u2014 yellow and violet, blue and orange \u2014 are complementary, and produce maximum contrast side by side. Analogous colours are neighbours, the opposite relationship. Triadic colours are three spaced evenly around the wheel, not a pair. And primary colours are defined by not being mixable from others.',
    rationale: 'Identifying complementary colours by their opposition on the colour wheel.',
    source: 'Colour theory; PRC CAE TOS \u2014 Creative Expressions',
  },
  {
    id: 'cae-136',
    subjectId: 'cae',
    topicId: 'cae-pedagogy',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      An art teacher shows learners a photograph and asks them to write down what
      they can actually see \u2014 a woman, a rope, a wooden structure, the
      expression on the face. She then asks what they think the photograph is
      about, then what they think it is about beyond its subject matter, and
      finally what they think of it as art.
    `),
    prompt: 'What is the teacher doing?',
    options: [
      'She is taking learners through the four stages of art criticism, from description to judgement.',
      'She is teaching aesthetics, which concerns judgements about beauty in general.',
      'She is teaching art history, which places the work in its period.',
      'She is teaching the elements of art, which are the materials the work is made from.',
    ],
    correctIndex: 0,
    explanation:
      'Describing, analysing, interpreting and judging are the four stages of art criticism, applied in sequence. Aesthetics concerns beauty as a general question rather than a sequence applied to a particular work. Art history is contextual placement. And the elements of art are the components of the work, not a way of responding to it.',
    rationale: 'Identifying the four stages of art criticism from the sequence of questions.',
    source: 'Discipline-Based Art Education; PRC CAE TOS \u2014 Pedagogical Practice',
  },
  {
    id: 'cae-137',
    subjectId: 'cae',
    topicId: 'cae-pedagogy',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      An art teacher wants learners to learn the history of Philippine batik. She
      finds a genuine batek from a particular community and brings it in, then
      shows how wax-resist works by letting learners try it themselves before she
      explains the history of the technique in that community.
    `),
    prompt: 'What order of teaching does this represent?',
    options: [
      'Teaching from the specific to the general \u2014 the concrete artefact before the abstract history.',
      'Teaching from the general to the specific \u2014 the historical context before the artefact.',
      'Teaching chronologically, from earliest historical period to most recent.',
      'Teaching deductively, from a stated principle to its application.',
    ],
    correctIndex: 0,
    explanation:
      'Beginning with a concrete artefact learners can examine and handle, and moving from it to the abstract historical account, is teaching from the specific toward the general. The general-to-specific order would present the history first. Neither is chronological, because the sequence here is conceptual. And deductive reasoning would start from a stated principle.',
    rationale: 'Identifying the specific-to-general teaching sequence from the order of presentation.',
    source: 'Teaching approaches in the arts; PRC CAE TOS \u2014 Pedagogical Practice',
  },
  {
    id: 'cae-138',
    subjectId: 'cae',
    topicId: 'cae-pedagogy',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      An art teacher reviews her year and notices that learners who drew often
      scored higher than learners who did not. She considers concluding that art
      practice causes higher attainment, and then stops, because the learners who
      drew more may also have had more time at home, better materials, or a
      teacher who encouraged them.
    `),
    prompt: 'What has the teacher recognised?',
    options: [
      'That a correlation does not establish causation, because other variables may explain the relationship.',
      'That drawing has no effect on attainment at all.',
      'That the study should be repeated with a larger sample before any conclusion is drawn.',
      'That the correlation is strong enough to establish causation.',
    ],
    correctIndex: 0,
    explanation:
      'She has identified confounding variables \u2014 time at home, materials, teacher encouragement \u2014 that could produce the observed relationship without drawing causing higher attainment. It does not follow that drawing has no effect; the design simply cannot show it. Repeating the study with more learners would not address the confounding. And the correlation\u2019s strength is not what licenses a causal claim.',
    rationale: 'Recognising confounding as the reason a correlation cannot support a causal claim.',
    source: 'Research methods; PRC CAE TOS \u2014 Pedagogical Practice',
  },
  {
    id: 'cae-139',
    subjectId: 'cae',
    topicId: 'cae-pedagogy',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      An art teacher has forty-two learners in a room with six tables. She plans a
      task in which learners must reach a shared mural on all four walls. She
      realises that whoever starts at the far wall will have to work alone while
      the others begin, and asks the class how she could organise the room so that
      everyone has something to do from the start.
    `),
    prompt: 'What does the teacher need to account for?',
    options: [
      'That space and sightlines affect participation, so learners who are isolated will work without interacting.',
      'That learners prefer to work alone and should be permitted to do so.',
      'That mural work requires each learner to have an equal share of wall area.',
      'That groups should be formed by ability so the strongest painter leads.',
    ],
    correctIndex: 0,
    explanation:
      'When tasks require collaboration across a space, how the room is arranged determines who can interact and who is left at a distance working alone \u2014 so seating and sightlines are part of the pedagogy. Learners do not generally prefer working alone on a collaborative task. Equal share of wall area is not the aim. And grouping by ability would concentrate skill, a different decision the teacher has not made.',
    rationale: 'Recognising spatial arrangement as affecting participation in collaborative art tasks.',
    source: 'Classroom organisation in arts teaching; PRC CAE TOS \u2014 Pedagogical Practice',
  },
  {
    id: 'cae-140',
    subjectId: 'cae',
    topicId: 'cae-pedagogy',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is reviewing a unit and finds that learners can name and describe
      the elements of art in Philippine work but cannot explain why a particular
      choice was made by a particular artist. She concludes that learners have
      acquired vocabulary without the underlying understanding, and asks what she
      should assess next.
    `),
    prompt: 'What should the teacher assess next?',
    options: [
      'How learners analyse and interpret a work, since naming elements is knowledge without understanding.',
      'Whether learners can recall more element names, since vocabulary comes first.',
      'Whether learners can produce work using all seven elements correctly.',
      'Whether learners can name the artist who made a particular work.',
    ],
    correctIndex: 0,
    explanation:
      'Learners who can name elements but not explain a choice have vocabulary without understanding, so the next assessment must target analysis and interpretation. More terminology would deepen the same gap. Producing work using all seven elements tests execution rather than interpretive understanding. And attributing a work to an artist is factual recall, the level learners have already mastered.',
    rationale: 'Choosing an assessment that targets understanding rather than more vocabulary.',
    source: 'Discipline-Based Art Education; PRC CAE TOS \u2014 Pedagogical Practice',
  },
  {
    id: 'cae-141',
    subjectId: 'cae',
    topicId: 'cae-research',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher wants to know whether learners prefer working in the art room or
      in the classroom for a particular lesson. She asks each learner to choose one
      and explain why in a sentence, then groups the responses by theme. One theme
      is that the art room has better light, another that it is further from the
      noise of the corridor.
    `),
    prompt: 'What does grouping responses by theme allow the teacher to do?',
    options: [
      'Identify patterns of preference and the reasons behind them, which raw counts of choices would not show.',
      'Measure the difference between the two options with statistical precision.',
      'Establish that one option causes better learning outcomes.',
      'Determine how many learners chose each option without any interpretation.',
    ],
    correctIndex: 0,
    explanation:
      'Grouping written responses by theme surfaces the reasons behind the preferences \u2014 better light, less noise \u2014 which is what a simple tally of choices discards. Three learners choosing each option would look identical whether for good reasons or poor ones. Nothing here measures a difference with statistical precision, and a stated preference cannot establish an effect on learning. And the tally was never the object: the explanations were collected to be read.',
    rationale: 'Recognising what thematic grouping yields over a simple frequency count.',
    source: 'Research methods; PRC CAE TOS \u2014 Research and Extension',
  },
  {
    id: 'cae-142',
    subjectId: 'cae',
    topicId: 'cae-research',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is comparing two ways of teaching the same art lesson. She cannot
      use the same learners for both, because once they have seen one approach they
      cannot unsee it, so she uses one class for one approach and another class for
      the other. She notes that the second class has generally higher average scores
      in every subject.
    `),
    prompt: 'What is the teacher\u2019s method, and what is its weakness?',
    options: [
      'It is a quasi-experiment using intact classes, and its weakness is that the groups differed before the intervention.',
      'It is a true experiment, and its weakness is that the sample was too small.',
      'It is an action research study, and its weakness is that it lacked repetition.',
      'It is a correlational study, and its weakness is that it measured two variables at one time.',
    ],
    correctIndex: 0,
    explanation:
      'Using existing classes rather than randomly assigning learners makes this quasi-experimental, and the second class\u2019s consistently higher averages are the pre-existing difference that limits the conclusion. A true experiment would require random assignment. Action research is investigation of one\u2019s own practice over time, not a comparison of two groups. And she is manipulating a method, not measuring two variables for correlation.',
    rationale: 'Identifying the intact-class design and its pre-existing group difference.',
    source: 'Research methods; PRC CAE TOS \u2014 Research and Extension',
  },
  {
    id: 'cae-143',
    subjectId: 'cae',
    topicId: 'cae-research',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher surveys her learners about art and finds that a large majority say
      art is important. She then checks how art is actually timetabled in the
      schools around her and finds that arts subjects are frequently squeezed out
      when other subjects need more time.
    `),
    prompt: 'What does the discrepancy mean?',
    options: [
      'That stated value and actual provision are different things, and a survey alone does not show whether a commitment is acted on.',
      'That learners are dishonest about valuing art.',
      'That art should be removed from the timetable since it is not valued.',
      'That the survey was unnecessary because the timetable already answers the question.',
    ],
    correctIndex: 0,
    explanation:
      'Learners can value art sincerely while the system provides little of it \u2014 so stated value and actual provision are separate questions, and only the second shows whether the commitment survives competing demands. Nothing suggests dishonesty. Removing art would compound the problem. And the timetable did not answer the question asked, because the survey was about learners\u2019 values while the timetable is about institutional provision.',
    rationale: 'Distinguishing stated value from actual provision as separate findings.',
    source: 'Research methods; PRC CAE TOS \u2014 Research and Extension',
  },
  {
    id: 'cae-144',
    subjectId: 'cae',
    topicId: 'cae-accountability',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher has been asked to explain how arts education contributes to a
      learner\u2019s overall development. She notes that the arts are not only about
      producing work but about learning to observe carefully, to express an idea,
      to accept criticism and to persist through difficulty \u2014 abilities she can
      point to in learners who were previously disengaged.
    `),
    prompt: 'What is the teacher describing?',
    options: [
      'The transfer of skills developed in arts education to other areas of learning and life.',
      'The contribution of arts education to national economic output.',
      'The assessment of learners\u2019 artistic talent for career streaming.',
      'The compliance of arts teaching with curriculum standards.',
    ],
    correctIndex: 0,
    explanation:
      'Identifying that abilities learned in the arts \u2014 observation, expression, receiving criticism, persistence \u2014 carry over into other subjects and settings is transfer, which is what she is describing with a concrete example. Economic output is not what a classroom lesson does. Talent assessment for streaming is a different purpose. And compliance with standards concerns following a document, not the learner-facing effect she is citing.',
    rationale: 'Identifying skill transfer from arts education into other learning contexts.',
    source: 'Arts education; PRC CAE TOS \u2014 Professional Accountability',
  },
  {
    id: 'cae-145',
    subjectId: 'cae',
    topicId: 'cae-accountability',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is asked to select which learners\u2019 artworks will represent the
      school at a district exhibition. She considers selecting the ones that will
      look best, and also the ones that best represent what the learners learned.
      A colleague asks her which principle she is applying.
    `),
    prompt: 'What are the competing considerations, and how should she decide?',
    options: [
      'Aesthetic quality and representational accuracy of the learning are different criteria; she should decide by first fixing what the exhibition is for, then choosing the criterion that follows from it.',
      'Aesthetic quality is the only legitimate criterion, because exhibitions exist to display skill.',
      'Representational accuracy is the only legitimate criterion, because exhibitions exist to demonstrate curriculum coverage.',
      'The two criteria are the same thing, so she may choose whichever is easier to apply.',
    ],
    correctIndex: 0,
    explanation:
      'Work that is technically impressive and work that best evidences the learning are not the same selection, so the criteria must be separated before either can be applied. Deciding the exhibition\u2019s purpose first makes the choice principled. Neither criterion is the only legitimate one: exhibitions serve both display and demonstration. And the criteria are clearly distinct.',
    rationale: 'Separating two distinct selection criteria and grounding the choice in purpose.',
    source: 'Professional accountability; PRC CAE TOS \u2014 Professional Accountability',
  },
  {
    id: 'cae-146',
    subjectId: 'cae',
    topicId: 'cae-accountability',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher asks her learners to keep a sketchbook for the whole year. One
      learner has drawn in it almost daily; another has four drawings in it. The
      teacher considers reporting the second learner as not participating, and then
      pauses, because the second learner has produced four drawings she describes
      as more considered than anything the first has made.
    `),
    prompt: 'What should the teacher weigh before reporting non-participation?',
    options: [
      'That quantity of output is not the measure of engagement, and the standard should be whether the learner is doing the thinking the task asks for.',
      'That the teacher should report both learners, since neither has met a daily target.',
      'That the teacher should ignore the second learner entirely, since she has produced some work.',
      'That the standard is whatever the teacher decides, since sketchbooks are not formally assessed.',
    ],
    correctIndex: 0,
    explanation:
      'A daily drawing rate measures frequency, not engagement, and a learner who drew four considered pieces has done the work the task asks for while a learner filling pages may not have. Reporting both against an invented daily target invents a standard that was never set. Ignoring non-participation entirely would also fail a genuine case \u2014 and the absence of formal assessment does not mean absence of a standard.',
    rationale: 'Distinguishing frequency of output from the engagement a task actually requires.',
    source: 'Assessment of learning; PRC CAE TOS \u2014 Professional Accountability',
  },
  {
    id: 'cae-147',
    subjectId: 'cae',
    topicId: 'cae-accountability',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is asked to justify the arts programme to a parent who says art
      takes time away from mathematics and science. She notes that the arts are
      part of the required curriculum and that the time is already allocated. She
      also notes that learners who find art engaging attend and participate more in
      the subjects the parent is worried about.
    `),
    prompt: 'What is the strongest ground for the teacher\u2019s response?',
    options: [
      'The arts are required by the curriculum and already time-allocated, and engagement gained in art supports performance elsewhere.',
      'Art improves mathematics scores, so the time is repaid in the parent\u2019s own terms.',
      'The arts develop creativity, which is valuable in its own right regardless of other subjects.',
      'Parents who oppose art have not read the curriculum.',
    ],
    correctIndex: 0,
    explanation:
      'Combining the curricular requirement with the engagement benefit is strongest, because it answers the parent\u2019s premise \u2014 that arts are optional time taken from other subjects \u2014 while adding a reason learners do better elsewhere. Claiming art raises mathematics scores would be an unsupported causal claim. Creativity\u2019s intrinsic value is genuine but does not address the concern about time. And the last reading is an ad hominem that would forfeit the conversation.',
    rationale: 'Choosing the response grounded in curriculum requirement plus cross-subject engagement.',
    source: 'DepEd Order No. 35, s. 2016; PRC CAE TOS \u2014 Professional Accountability',
  },
  {
    id: 'cae-148',
    subjectId: 'cae',
    topicId: 'cae-accountability',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is given an allocation to buy art supplies for the year. She divides
      it so that every learner will have produced the same amount of work
      regardless of what materials that requires \u2014 so some learners paint, some
      draw, some construct. A colleague asks whether equal spending has produced
      equal opportunity.
    `),
    prompt: 'What is the weakness in the teacher\u2019s reasoning?',
    options: [
      'Equal spending does not guarantee equal opportunity, because materials differ in what they make possible.',
      'Equal spending is the only fair approach, so the reasoning is sound.',
      'Equal spending guarantees identical outcomes, so the reasoning is sound.',
      'Materials do not affect what learners can make, so spending is irrelevant.',
    ],
    correctIndex: 0,
    explanation:
      'Equal money buys equal amounts of different things, and a kilo of clay, a set of brushes and a block of paper enable quite different work \u2014 so equal spending is not equal opportunity. Equal spending is a reasonable fairness principle but not the only one. It does not guarantee identical outcomes, which depend on learners too. And materials plainly determine what can be made.',
    rationale: 'Distinguishing equal resource allocation from equal opportunity.',
    source: 'Professional accountability; PRC CAE TOS \u2014 Professional Accountability',
  },
];

export default BATCH_CAE_2;
