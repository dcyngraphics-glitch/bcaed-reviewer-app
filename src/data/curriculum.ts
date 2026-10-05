import type { Subject, Topic, Lesson } from '../types/content';

/**
 * Subject/topic structure follows the PRC Table of Specifications, not an
 * invented curriculum.
 *
 * Sources:
 * - PRC Board of Professional Teachers, Resolution No. 11 s. 2025 (LEPT TOS,
 *   effective September 2025), and the PRC–CHED JMC of 10 April 2025 aligning
 *   the LEPT with CMO 82 s. 2017 (BCAEd).
 * - Secondary level weighting: General Education 20%, Professional Education
 *   40%, Specialization (Culture and Arts Education) 40%.
 * - The BCAEd specialization paper is the Culture and Arts Education (CAE)
 *   subject, broken into the five areas below.
 *
 * The administrator can add, rename and reorder all of this at runtime — these
 * are seed values, not a hard-coded curriculum.
 */

export const SUBJECTS: readonly Subject[] = [
  {
    id: 'cae',
    name: 'Culture and Arts Education',
    description:
      'Your LET specialization. 40% of the Secondary rating — 150 items covering disciplinal knowledge, arts pedagogy, creative practice, professional accountability and research.',
  },
  {
    id: 'profed',
    name: 'Professional Education',
    description:
      'The teaching profession, curriculum and methods, child and adolescent development, assessment, and field study. 40% of the Secondary rating.',
  },
  {
    id: 'gened',
    name: 'General Education',
    description:
      'Communication, Filipino, Philippine history, Rizal, the contemporary world, art appreciation, science and technology, mathematics, ethics and the self. 20% of the Secondary rating.',
  },
] as const;

export const TOPICS: readonly Topic[] = [
  // --- Culture and Arts Education (CAE) ---
  { id: 'cae-disciplinal', subjectId: 'cae', name: 'Disciplinal Knowledge' },
  { id: 'cae-pedagogy', subjectId: 'cae', name: 'Pedagogical Practice' },
  { id: 'cae-creative', subjectId: 'cae', name: 'Competency and Proficiency in the Creative Expressions' },
  { id: 'cae-accountability', subjectId: 'cae', name: 'Professional Accountability and Responsibility' },
  { id: 'cae-research', subjectId: 'cae', name: 'Research and Extension' },

  // --- Professional Education (ProfEd) ---
  { id: 'profed-teaching-profession', subjectId: 'profed', name: 'The Teaching Profession' },
  { id: 'profed-curriculum', subjectId: 'profed', name: 'Curriculum, Methods and Educational Technology' },
  { id: 'profed-learners', subjectId: 'profed', name: 'The Child and Adolescent Learners' },
  { id: 'profed-assessment', subjectId: 'profed', name: 'Assessment of Learning' },
  { id: 'profed-field-study', subjectId: 'profed', name: 'Field Study and Teaching Internship' },

  // --- General Education (GenEd) ---
  { id: 'gened-communication', subjectId: 'gened', name: 'Purposive Communication' },
  { id: 'gened-filipino', subjectId: 'gened', name: 'Malayuning Komunikasyon sa Filipino' },
  { id: 'gened-history', subjectId: 'gened', name: 'Readings in Philippine History' },
  { id: 'gened-rizal', subjectId: 'gened', name: 'The Life and Works of Rizal' },
  { id: 'gened-contemporary-world', subjectId: 'gened', name: 'The Contemporary World' },
  { id: 'gened-art-appreciation', subjectId: 'gened', name: 'Art Appreciation' },
  { id: 'gened-science', subjectId: 'gened', name: 'Science and Technology' },
  { id: 'gened-mathematics', subjectId: 'gened', name: 'Mathematics' },
  { id: 'gened-ethics', subjectId: 'gened', name: 'Ethics' },
  { id: 'gened-self', subjectId: 'gened', name: 'Understanding the Self' },
] as const;

export const LESSONS: readonly Lesson[] = [
  {
    id: 'lesson-philippine-folk-dance',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    title: 'Philippine Folk Dance: The Major Forms',
    summary:
      'The dances most often tested are the ones tied to a specific prop, a specific region, or a specific story. Learn each dance by its identifying feature rather than by its name alone.',
    keyPoints: [
      'Tinikling (Leyte): dancers step in and out between two bamboo poles beaten on the ground.',
      'Singkil (Maranao): also uses bamboo poles, but staged as a royal dance drawn from the Darangen epic.',
      'Pandanggo sa Ilaw: dancers balance oil lamps or candles in glasses, on the head and hands.',
      'Cariñosa: a Visayan courtship dance using a fan or handkerchief; the name means "the loving one".',
      'Pantomina (Bicol): the "Dance of the Doves", from the Bicol word salampati meaning dove.',
      'Kuratsa: a courtship dance with a chasing-and-fleeing pattern, associated with Leyte and Samar.',
      'Itik-itik (Surigao): imitates the movements of a duck, traditionally performed to a faster tempo.',
    ],
  },
  {
    id: 'lesson-elements-of-art',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    title: 'The Elements and Principles of Art',
    summary:
      'Elements are the ingredients an artist uses; principles are how those ingredients are organised. LET items usually ask you to classify a described technique as one or the other.',
    keyPoints: [
      'Elements: line, shape, form, colour, value, texture, space.',
      'Principles: balance, emphasis, movement, pattern, rhythm, unity, variety.',
      'Value is the lightness or darkness of a colour; texture is the surface quality.',
      'Symmetrical balance mirrors both sides; asymmetrical balance uses unequal weight to reach stability.',
      'Rhythm is the repetition of elements to create a sense of movement.',
    ],
  },
  {
    id: 'lesson-philippine-visual-arts',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    title: 'Philippine Visual Arts and the National Artists',
    summary:
      'Match each work to its artist. The Spoliarium, the Oblation and the backlit rural landscapes are the three most frequently examined works.',
    keyPoints: [
      'Juan Luna — Spoliarium, a monumental 1884 canvas now in the National Museum of Fine Arts.',
      'Guillermo Tolentino — the Oblation, the icon of the University of the Philippines.',
      'Fernando Amorsolo — "Grand Old Man of Philippine Art", known for backlit rural scenes and the mastery of light.',
      'Carlos "Botong" Francisco — large historical murals and a National Artist for Visual Arts.',
      'Vicente Manansala — pioneered transparent cubism in the Philippines.',
      'Felix Resurreccion Hidalgo — Las Virgenes Cristianas Expuestas al Populacho (Christian Virgins Exposed to the Populace).',
    ],
  },
  {
    id: 'lesson-philippine-music-ensembles',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    title: 'Philippine Music: Instruments, Ensembles and Forms',
    summary:
      'Distinguish the Western-derived Rondalla from the indigenous gong ensembles of Mindanao and the Cordillera, and know the vocal forms by function.',
    keyPoints: [
      'Rondalla: a plucked-string ensemble of bandurria, octavina, laud, guitar and bass.',
      'Kulintang: a row of small horizontal gongs played melodically, central to Maguindanao and Maranao music.',
      'Gangsa: flat gongs of the Cordillera, played with the palm or a stick.',
      'Kundiman: a Filipino love song, traditionally in triple (3/4) metre.',
      'Harana: a serenade sung beneath a woman\u2019s window.',
      'Balagtasan: a formal poetic debate, named after Francisco Balagtas.',
    ],
  },
  {
    id: 'lesson-arts-teaching-methods',
    subjectId: 'cae',
    topicId: 'cae-pedagogy',
    title: 'Approaches to Teaching Music and Art',
    summary:
      'The specialist methods are named after their founders. Learn the one distinguishing idea of each and you can answer most items by elimination.',
    keyPoints: [
      'Orff approach — elemental music-making through speech, movement, singing and percussion.',
      'Kodály method — singing-based, built on folk songs and the movable-do system with hand signs.',
      'Dalcroze Eurhythmics — teaching musical concepts through bodily movement.',
      'Suzuki method — the "mother-tongue approach", beginning instrumental study very young by ear.',
      'DBAE (Discipline-Based Art Education) — art taught through four disciplines: production, history, criticism and aesthetics.',
      'Gardner\u2019s multiple intelligences — linguistic, logical-mathematical, musical, bodily-kinaesthetic, spatial, interpersonal, intrapersonal, naturalist.',
    ],
  },
  {
    id: 'lesson-professional-ethics',
    subjectId: 'cae',
    topicId: 'cae-accountability',
    title: 'The Professional Teacher: Law and Ethics',
    summary:
      'Know which statute does what. Items frequently pair a described situation with the law that governs it.',
    keyPoints: [
      'RA 7836 — the Philippine Teachers Professionalization Act of 1994; created the PRC licensure for teachers.',
      'RA 4670 — the Magna Carta for Public School Teachers.',
      'RA 9155 — the Governance of Basic Education Act of 2001; restructured DepEd and created school-based management.',
      'RA 10533 — the Enhanced Basic Education Act of 2013, the legal basis of the K-12 programme.',
      'The Code of Ethics for Professional Teachers governs conduct toward learners, parents, colleagues and the community.',
      'PPST (Philippine Professional Standards for Teachers) sets out the four career stages: Beginning, Proficient, Highly Proficient, Distinguished.',
    ],
  },
  {
    id: 'lesson-action-research',
    subjectId: 'cae',
    topicId: 'cae-research',
    title: 'Action Research in the Arts Classroom',
    summary:
      'Action research is cyclic and practitioner-driven: you identify a classroom problem, act, observe, reflect, then repeat.',
    keyPoints: [
      'The cycle: plan, act, observe, reflect (Kemmis and McTaggart).',
      'It is practitioner-based — the teacher is both researcher and participant.',
      'Quantitative data uses numbers and statistics; qualitative data uses words, images and observation.',
      'A hypothesis is a testable prediction; a variable is any factor that can change.',
      'Informed consent and confidentiality are non-negotiable when learners are the subjects.',
    ],
  },
  {
    id: 'lesson-assessment-of-learning',
    subjectId: 'profed',
    topicId: 'profed-assessment',
    title: 'Assessment of Learning: Types and Tools',
    summary:
      'The single most examinable distinction is formative versus summative, and assessment for, as, and of learning.',
    keyPoints: [
      'Diagnostic — before instruction, to find out what learners already know.',
      'Formative — during instruction, to guide teaching; not graded.',
      'Summative — after instruction, to judge achievement; graded.',
      'Validity asks whether a test measures what it claims to measure.',
      'Reliability asks whether a test gives consistent results on repeated use.',
      'Item difficulty index = proportion of examinees who answered correctly.',
      'Item discrimination index = how well an item separates high scorers from low scorers.',
      'A performance-based assessment judges a product or a demonstration against a rubric.',
    ],
  },
  {
    id: 'lesson-child-adolescent-development',
    subjectId: 'profed',
    topicId: 'profed-learners',
    title: 'Child and Adolescent Development',
    summary:
      'Piaget and Erikson carry most of the items. Anchor each stage to the age band and its single defining achievement.',
    keyPoints: [
      'Piaget — sensorimotor (0-2), preoperational (2-7), concrete operational (7-11), formal operational (11+).',
      'Object permanence is achieved in the sensorimotor stage.',
      'Conservation, classification and seriation appear in the concrete operational stage.',
      'Egocentrism is characteristic of the preoperational stage.',
      'Erikson — industry vs inferiority (school age), identity vs role confusion (adolescence).',
      'Vygotsky — the zone of proximal development, bridged by scaffolding.',
    ],
  },
  {
    id: 'lesson-rizal',
    subjectId: 'gened',
    topicId: 'gened-rizal',
    title: 'Jose Rizal: Life and Works',
    summary:
      'Know the two novels, their publication years, and the circumstances that produced them.',
    keyPoints: [
      'Noli Me Tangere — published 1887 in Berlin.',
      'El Filibusterismo — published 1891 in Ghent; dedicated to the memory of the Gomburza.',
      'La Solidaridad was the newspaper of the Propaganda Movement; Rizal contributed under the pen name Laong Laan.',
      'Mi Ultimo Adios was written in Fort Santiago on the eve of his execution, 30 December 1896.',
      'RA 1425, the Rizal Law, mandates the study of Rizal\u2019s life and works in Philippine schools.',
    ],
  },
  {
    id: 'lesson-philippine-history',
    subjectId: 'gened',
    topicId: 'gened-history',
    title: 'Readings in Philippine History',
    summary:
      'Focus on the primary sources and the turning points that items are built around.',
    keyPoints: [
      'Antonio Pigafetta\u2019s chronicle is the primary source for the 1521 Battle of Mactan.',
      'The Kartilya ng Katipunan was written by Emilio Jacinto.',
      'The Malolos Constitution of 1899 established the First Philippine Republic.',
      'The Cry of Pugad Lawin (1896) marked the start of the Philippine Revolution.',
      'The Treaty of Paris (1898) ceded the Philippines from Spain to the United States for USD 20 million.',
    ],
  },
] as const;
