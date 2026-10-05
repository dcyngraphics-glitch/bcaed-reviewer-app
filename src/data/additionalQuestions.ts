import type { Question, Difficulty } from '../types/content';

/**
 * Additional question bank — the "additional information" the user asked for,
 * covering areas the first bank was thin on.
 *
 * Every item is ORIGINAL, written for this app. The user's reviewer files are
 * treated only as a specification of the exam's shape, never as a source.
 *
 * This set fills the topics that had fewer than three questions, which the
 * admin coverage view flags as gaps. Sources are cited per item.
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
  situational?: boolean;
  vignette?: string;
  rationale?: string;
}

const SEEDS: readonly Seed[] = [
  // ==================================================================
  // GenEd — Filipino
  // ==================================================================
  {
    id: 'ge-fil-001',
    subjectId: 'gened',
    topicId: 'gened-filipino',
    difficulty: 2,
    prompt:
      'Alin sa mga sumusunod ang tamang kahulugan ng "balagtasan"?',
    options: [
      'Isang uri ng awiting-bayan na inaawit sa panahon ng pag-aani',
      'Isang pagtatalong patula sa pagitan ng dalawang panig na may paksang pinagtatalunan',
      'Isang sayaw na ginagawa sa panahon ng kasal',
      'Isang tulang pasalaysay tungkol sa buhay ng isang bayani',
    ],
    correctIndex: 1,
    explanation:
      'Ang balagtasan ay isang pagtatalong patula sa pagitan ng dalawang panig o koponan, na may paksang pinagtatalunan at hinahatulan ng isang lakandiwa. Ipinangalan ito kay Francisco Balagtas, ang may-akda ng Florante at Laura. Ang awiting-bayan sa pag-aani ay halimbawa ng mga kantahing-bayan, at ang tulang pasalaysay tungkol sa bayani ay epiko.',
    source: 'Panitikang Filipino; PRC GenEd TOS — Malayuning Komunikasyon sa Filipino',
  },
  {
    id: 'ge-fil-002',
    subjectId: 'gened',
    topicId: 'gened-filipino',
    difficulty: 3,
    prompt: 'Ang "Florante at Laura" ay isang halimbawa ng anong uri ng panitikan?',
    options: ['Dula', 'Nobela', 'Awit', 'Sanaysay'],
    correctIndex: 2,
    explanation:
      'Ang Florante at Laura ni Francisco Balagtas ay isang awit — isang tulang pasalaysay na may sukat na labindalawang pantig bawat taludtod. Bagaman may mga pangyayaring tulad ng nobela, ang anyo nito ay patula at inaawit, kaya awit ang tawag. Ang korido naman ay may walong pantig bawat taludtod, gaya ng Ibong Adarna.',
    source: 'Panitikang Filipino; PRC GenEd TOS — Malayuning Komunikasyon sa Filipino',
  },
  {
    id: 'ge-fil-003',
    subjectId: 'gened',
    topicId: 'gened-filipino',
    difficulty: 4,
    prompt:
      'Alin sa mga sumusunod na pangungusap ang gumagamit ng "nang" nang wasto?',
    options: [
      'Nang siya ay dumating, nagsimula na ang klase.',
      'Nang niya ang libro sa mesa kahapon.',
      'Kumain nang kanyang almusal ang bata.',
      'Nang ang mga mag-aaral ay nag-aral nang mabuti.',
    ],
    correctIndex: 0,
    explanation:
      'Ginagamit ang "nang" bilang pang-ugnay sa pang-abay na pamanahon (nang dumating), bilang pinagsamang "na" at "ng" (kumain nang mabilis), at sa pag-uulit (nang mabuti). Ang "ng" naman ay ginagamit bilang pang-ukol o marker ng layon (kinuha niya ang libro). Maling gamit ang una at ikalawa sa mga distractor dahil ang "ng" ang kailangan sa mga lugar na iyon.',
    source: 'Balarilang Filipino; PRC GenEd TOS — Malayuning Komunikasyon sa Filipino',
  },

  // ==================================================================
  // GenEd — Purposive Communication
  // ==================================================================
  {
    id: 'ge-com-001',
    subjectId: 'gened',
    topicId: 'gened-communication',
    difficulty: 2,
    prompt:
      'Which of the following sentences is punctuated correctly?',
    options: [
      'The students who finished early were allowed to leave, the others had to stay.',
      'The students who finished early were allowed to leave; the others had to stay.',
      'The students who finished early were allowed to leave the others had to stay.',
      'The students who finished early, were allowed to leave, the others had to stay.',
    ],
    correctIndex: 1,
    explanation:
      'A semicolon joins two independent clauses that are closely related without a coordinating conjunction. A comma alone between them produces a comma splice, which is the error in the first option. The third option runs the two clauses together with no punctuation at all, and the fourth inserts a comma where the subject and verb should not be separated.',
    source: 'English grammar and composition; PRC GenEd TOS — Purposive Communication',
  },
  {
    id: 'ge-com-002',
    subjectId: 'gened',
    topicId: 'gened-communication',
    difficulty: 4,
    prompt:
      'A writer wants to convince a sceptical audience that a new school policy is worthwhile. Which approach is most likely to be effective?',
    options: [
      'State the conclusion forcefully and repeat it several times so the audience remembers it.',
      'Acknowledge the strongest objection to the policy, then present evidence showing why the policy still succeeds despite it.',
      'Appeal to the audience\u2019s emotions and avoid mentioning any drawbacks of the policy.',
      'Present only the evidence that supports the policy and omit anything that complicates the case.',
    ],
    correctIndex: 1,
    explanation:
      'A sceptical audience is persuaded by argument, not assertion. Acknowledging the strongest counterargument and then answering it with evidence demonstrates that the writer has considered the objections seriously, which builds credibility — this is the classical practice of refutation. Repeating a conclusion without support, appealing to emotion while hiding drawbacks, and omitting complicating evidence all invite the audience to distrust the writer once the omissions become apparent.',
    source: 'Argumentation and rhetoric; PRC GenEd TOS — Purposive Communication',
  },

  // ==================================================================
  // GenEd — Science and Technology
  // ==================================================================
  {
    id: 'ge-sci-001',
    subjectId: 'gened',
    topicId: 'gened-science',
    difficulty: 2,
    prompt:
      'A student observes that ice floats on water. Which property of water best explains this?',
    options: [
      'Water has a high specific heat capacity.',
      'Water is less dense as a solid than as a liquid.',
      'Water is a universal solvent.',
      'Water has strong surface tension.',
    ],
    correctIndex: 1,
    explanation:
      'Ice floats because solid water is less dense than liquid water — the hydrogen bonds in the crystal lattice hold the molecules further apart than in the liquid state. This is unusual: for most substances the solid is denser than the liquid. High specific heat, solvent action and surface tension are all real properties of water, but none of them explains flotation.',
    source: 'General chemistry; PRC GenEd TOS — Science and Technology',
  },
  {
    id: 'ge-sci-002',
    subjectId: 'gened',
    topicId: 'gened-science',
    difficulty: 3,
    prompt:
      'During a thunderstorm, lightning and thunder are produced at the same moment. Why is lightning seen before thunder is heard?',
    options: [
      'Because lightning is produced slightly before thunder during the discharge.',
      'Because light travels far faster than sound, so the light reaches the observer almost instantly while the sound takes time to arrive.',
      'Because thunder is produced only after the lightning strike has ended.',
      'Because sound travels more slowly in humid air than in dry air, and thunderstorm air is humid.',
    ],
    correctIndex: 1,
    explanation:
      'Lightning and thunder occur at the same instant — thunder is the sound of the rapid expansion of air heated by the lightning. Light travels at about 300,000 km per second, effectively instantaneous over the distances involved, while sound travels at roughly 340 metres per second in air. The observer therefore sees the flash first and hears the thunder later, and the delay can be used to estimate the distance of the strike.',
    source: 'General physics; PRC GenEd TOS — Science and Technology',
  },
  {
    id: 'ge-sci-003',
    subjectId: 'gened',
    topicId: 'gened-science',
    difficulty: 3,
    prompt: 'Moulds are classified under which kingdom?',
    options: ['Protista', 'Fungi', 'Plantae', 'Monera'],
    correctIndex: 1,
    explanation:
      'Moulds are fungi. They are heterotrophic — they absorb nutrients from organic matter rather than photosynthesising — and their cell walls contain chitin, which distinguishes them from plants. Protists are mostly single-celled organisms, plants are photosynthetic, and Monera covers the bacteria and archaea.',
    source: 'General biology; PRC GenEd TOS — Science and Technology',
  },
  {
    id: 'ge-sci-004',
    subjectId: 'gened',
    topicId: 'gened-science',
    difficulty: 4,
    prompt:
      'A community wants to reduce the volume of waste reaching its landfill. Which strategy would have the greatest effect?',
    options: [
      'Encouraging residents to compact their waste before disposal so it takes up less space.',
      'Introducing segregation with composting of organic waste and recycling of plastics, paper and metal at source.',
      'Increasing the frequency of waste collection so that waste does not accumulate in the streets.',
      'Building a larger landfill further from the town centre.',
    ],
    correctIndex: 1,
    explanation:
      'Segregation at source with composting and recycling diverts the two largest fractions of municipal waste — organics and recyclables — from the landfill entirely, which reduces volume at the point of disposal. Compacting reduces volume per item but everything still goes to landfill. More frequent collection changes where the waste is, not how much there is. And a larger landfill increases capacity without reducing the waste stream at all.',
    source: 'Environmental science; PRC GenEd TOS — Science and Technology',
  },

  // ==================================================================
  // GenEd — Mathematics
  // ==================================================================
  {
    id: 'ge-mat-001',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 2,
    prompt:
      'A shirt priced at ₱800 is discounted by 25%, and then a further 10% is taken off the discounted price. What does the customer pay?',
    options: ['₱520', '₱540', '₱560', '₱600'],
    correctIndex: 1,
    explanation:
      'A 25% discount leaves ₱800 × 0.75 = ₱600. A further 10% off ₱600 leaves ₱600 × 0.90 = ₱540. The common error is to add the discounts and take 35% off ₱800, which gives ₱520 — but successive discounts compound, they do not add, because the second is applied to the reduced price.',
    source: 'Business mathematics; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'ge-mat-002',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 3,
    prompt:
      'A student\u2019s scores on five quizzes are 70, 80, 85, 90 and 100. What is the difference between the mean and the median?',
    options: ['0', '2', '5', '10'],
    correctIndex: 0,
    explanation:
      'The mean is (70 + 80 + 85 + 90 + 100) ÷ 5 = 425 ÷ 5 = 85. Arranged in order the scores are already 70, 80, 85, 90, 100, so the median is the middle value, 85. The difference is 85 − 85 = 0. The two measures coincide here because the set is symmetric about its middle value — which is not generally true, and the item tests whether the student computes both rather than assuming they agree.',
    source: 'Elementary statistics; PRC GenEd TOS — Mathematics',
  },
  {
    id: 'ge-mat-003',
    subjectId: 'gened',
    topicId: 'gened-mathematics',
    difficulty: 4,
    prompt:
      'A rectangular garden is 3 metres longer than it is wide. If its area is 40 square metres, what is its perimeter?',
    options: ['26 metres', '28 metres', '32 metres', '40 metres'],
    correctIndex: 0,
    explanation:
      'Let the width be w, so the length is w + 3. Then w(w + 3) = 40, giving w² + 3w − 40 = 0, which factors as (w + 8)(w − 5) = 0. Since a width cannot be negative, w = 5 and the length is 8. The perimeter is 2(5 + 8) = 26 metres.',
    source: 'Algebra and geometry; PRC GenEd TOS — Mathematics',
  },

  // ==================================================================
  // GenEd — Ethics
  // ==================================================================
  {
    id: 'ge-eth-001',
    subjectId: 'gened',
    topicId: 'gened-ethics',
    difficulty: 3,
    prompt:
      'A nurse must decide whether to tell a patient the full truth about a terminal diagnosis, knowing the patient\u2019s family has asked her not to. Which ethical approach focuses on the nurse\u2019s duty to tell the truth regardless of the consequences?',
    options: [
      'Utilitarianism, because it weighs the happiness of everyone affected.',
      'Deontology, because it holds that certain acts are right or wrong in themselves, independent of their outcomes.',
      'Ethical egoism, because it considers what is best for the decision-maker.',
      'Virtue ethics, because it asks what a person of good character would do.',
    ],
    correctIndex: 1,
    explanation:
      'Deontology, associated with Kant, holds that certain acts are duties binding regardless of their consequences — telling the truth would be one such duty. Utilitarianism decides by weighing outcomes, which is the opposite approach. Ethical egoism considers the agent\u2019s own interest, which is not at issue. Virtue ethics asks what a virtuous person would do, which is character-based rather than duty-based.',
    source: 'Ethics; PRC GenEd TOS — Ethics',
  },
  {
    id: 'ge-eth-002',
    subjectId: 'gened',
    topicId: 'gened-ethics',
    difficulty: 4,
    prompt:
      'A company can increase profits by moving production to a country where environmental regulations are weaker. A shareholder argues this is justified because it maximises returns for owners. Which criticism is strongest?',
    options: [
      'The decision is wrong because shareholders have no right to influence company policy.',
      'The decision ignores the harm imposed on third parties who bear the environmental cost without consenting to it or benefiting from it.',
      'The decision is wrong because profits should never be a consideration in business.',
      'The decision is acceptable because the laws of the host country permit it.',
    ],
    correctIndex: 1,
    explanation:
      'The strongest objection is that the arrangement imposes costs on people who neither consented to them nor share in the benefit — a classic externality problem. Legal permissibility in the host country does not settle the ethical question, which is why the fourth option is not a defence. The first option misstates the issue, and the third overstates the case by dismissing profit entirely.',
    source: 'Applied ethics; PRC GenEd TOS — Ethics',
  },

  // ==================================================================
  // GenEd — The Contemporary World
  // ==================================================================
  {
    id: 'ge-cw-001',
    subjectId: 'gened',
    topicId: 'gened-contemporary-world',
    difficulty: 3,
    prompt:
      'Which of the following best describes globalisation?',
    options: [
      'The complete elimination of national borders and the creation of a single world government.',
      'The increasing interconnection of economies, cultures and populations through trade, communication, migration and technology.',
      'The dominance of one country\u2019s culture over all others.',
      'The reduction of international trade in favour of local production.',
    ],
    correctIndex: 1,
    explanation:
      'Globalisation is the growing interconnection of economies, cultures and populations through flows of trade, capital, people, information and technology. It does not eliminate national borders or create a world government, and it is not the same as cultural dominance, though it can produce homogenising pressures. Reducing international trade is the opposite of globalisation.',
    source: 'The contemporary world; PRC GenEd TOS — The Contemporary World',
  },
  {
    id: 'ge-cw-002',
    subjectId: 'gened',
    topicId: 'gened-contemporary-world',
    difficulty: 4,
    prompt:
      'A country exports raw materials and imports finished goods. Which of the following is the most likely long-term consequence?',
    options: [
      'The country accumulates manufacturing capacity because it handles the raw materials.',
      'The country remains dependent on volatile commodity prices while the value added by processing accrues to the importing countries.',
      'The country\u2019s terms of trade automatically improve over time.',
      'The country\u2019s workforce shifts toward higher-skilled manufacturing jobs.',
    ],
    correctIndex: 1,
    explanation:
      'Exporting raw materials and importing finished goods is the classic pattern that keeps value addition — and therefore most of the profit and the higher-skilled employment — in the importing countries. The exporting country depends on commodity prices, which are volatile, while the price of the manufactured goods it buys is more stable. Handling raw materials does not by itself build manufacturing capacity, and terms of trade tend to deteriorate for commodity exporters rather than improve.',
    source: 'International economics; PRC GenEd TOS — The Contemporary World',
  },

  // ==================================================================
  // GenEd — Understanding the Self
  // ==================================================================
  {
    id: 'ge-self-001',
    subjectId: 'gened',
    topicId: 'gened-self',
    difficulty: 3,
    prompt:
      'A person describes herself as a daughter, a teacher and a volunteer, and notices that she behaves differently in each role. Which concept best captures this?',
    options: [
      'The self is a single fixed identity that does not change across situations.',
      'The self is multifaceted, comprising multiple social identities that are activated by different contexts.',
      'The self is entirely determined by biology and cannot be shaped by social roles.',
      'The self is an illusion with no continuity across time or situation.',
    ],
    correctIndex: 1,
    explanation:
      'Contemporary accounts of the self recognise it as multifaceted: a person holds multiple social identities — daughter, teacher, volunteer — and different ones become salient in different contexts. This is not the same as having no stable self, because the person still experiences continuity; the identities are aspects of one self rather than separate selves. Nor is the self purely biological, since social roles shape it substantially.',
    source: 'Understanding the self; PRC GenEd TOS — Understanding the Self',
  },
  {
    id: 'ge-self-002',
    subjectId: 'gened',
    topicId: 'gened-self',
    difficulty: 4,
    prompt:
      'A student repeatedly fails to meet deadlines and explains it by saying she simply is not a disciplined person. What is the limitation of this explanation?',
    options: [
      'It is accurate, because personal traits are the strongest predictor of behaviour.',
      'It treats a pattern of behaviour as a fixed trait, which removes the possibility of change and ignores situational factors that may be sustaining the behaviour.',
      'It is accurate, because discipline is determined at an early age and does not change.',
      'It is inaccurate only because the student should be blamed rather than excused.',
    ],
    correctIndex: 1,
    explanation:
      'Explaining behaviour by a fixed trait — "I am not a disciplined person" — closes off the possibility of change and ignores the situational factors that sustain the behaviour, such as workload, unclear expectations or competing demands. Psychological research on self-efficacy shows that behaviour is influenced by both personal and situational factors, and that treating a pattern as unchangeable tends to make it persist. The point is not about blame but about whether the explanation is useful and accurate.',
    source: 'Understanding the self; PRC GenEd TOS — Understanding the Self',
  },

  // ==================================================================
  // ProfEd — Assessment: statistics
  // ==================================================================
  {
    id: 'pe-a-008',
    subjectId: 'profed',
    topicId: 'profed-assessment',
    difficulty: 4,
    prompt:
      'A class\u2019s test scores are 60, 62, 63, 64, 65, 66, 67, 68, 69, 100. Which measure of central tendency best represents the typical performance, and why?',
    options: [
      'The mean, because it uses every score in the data set.',
      'The median, because it is not distorted by the single extreme score of 100.',
      'The mode, because it identifies the most common score.',
      'The range, because it shows how spread out the scores are.',
    ],
    correctIndex: 1,
    explanation:
      'The mean of this set is 68.4, which is higher than nine of the ten scores — the single score of 100 pulls it up and misrepresents the typical performance. The median, 65.5, sits between the two middle values and is unaffected by the extreme score. The mode would be meaningless here because no score repeats. The range is a measure of spread, not of central tendency.',
    source: 'Elementary statistics; PRC ProfEd TOS area D (15%)',
  },

  // ==================================================================
  // ProfEd — Curriculum: Bloom and objectives
  // ==================================================================
  {
    id: 'pe-c-007',
    subjectId: 'profed',
    topicId: 'profed-curriculum',
    difficulty: 4,
    prompt:
      'Which of the following is the best-written learning objective?',
    options: [
      'To understand the causes of the Philippine Revolution.',
      'To appreciate the importance of Philippine history.',
      'To identify three economic causes of the Philippine Revolution in a short written response.',
      'To know more about Philippine history.',
    ],
    correctIndex: 2,
    explanation:
      'A well-written objective names an observable action the learner will perform and the conditions under which it will be assessed. "Identify three economic causes ... in a short written response" does both. "Understand", "appreciate" and "know" are mental states that cannot be observed directly, so none of them tells the teacher what evidence of learning to look for.',
    source: 'Writing instructional objectives; PRC ProfEd TOS area B (30%)',
  },
  {
    id: 'pe-c-008',
    subjectId: 'profed',
    topicId: 'profed-curriculum',
    difficulty: 4,
    prompt:
      'The cone of experience, which arranges learning experiences from the most concrete at the base to the most abstract at the apex, was proposed by:',
    options: ['Jerome Bruner', 'Edgar Dale', 'Benjamin Bloom', 'John Dewey'],
    correctIndex: 1,
    explanation:
      'Edgar Dale published the Cone of Experience in Audio-Visual Methods in Teaching, arranging experiences from direct purposeful experience through to verbal symbols. Bruner proposed a parallel framework of enactive, iconic and symbolic representation, which is often confused with Dale\u2019s. Bloom is known for the taxonomy of objectives, and Dewey for progressive education.',
    source: 'Edgar Dale, Audio-Visual Methods in Teaching; PRC ProfEd TOS area B (30%)',
  },

  // ==================================================================
  // ProfEd — Learners: motivation and individual differences
  // ==================================================================
  {
    id: 'pe-l-008',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 4,
    prompt:
      'A learner who previously enjoyed drawing stops producing work after her drawings are repeatedly displayed as examples of what not to do. Which principle best explains the change?',
    options: [
      'She has reached the limits of her artistic ability.',
      'Public criticism has undermined her sense of competence, which reduces intrinsic motivation to engage in the activity.',
      'She has lost interest because drawing is no longer novel to her.',
      'She is displaying a developmental stage characteristic of her age.',
    ],
    correctIndex: 1,
    explanation:
      'Intrinsic motivation depends partly on a sense of competence. Publicly presenting her work as a negative example attacks that sense directly, and the withdrawal of effort is a predictable response — she is protecting herself from further criticism. The explanation is motivational and situational, not a ceiling on ability, not novelty, and not a developmental stage.',
    source: 'Motivation theory (self-determination theory); PRC ProfEd TOS area C (20%)',
  },
  {
    id: 'pe-l-009',
    subjectId: 'profed',
    topicId: 'profed-learners',
    difficulty: 5,
    prompt:
      'A teacher uses the same instructional approach for all learners in a mixed-ability class and finds that the strongest learners are bored while the weakest fall further behind. What is the most appropriate response?',
    options: [
      'Teach to the middle so that the largest possible number of learners is served adequately.',
      'Differentiate instruction so that learners work toward the same essential outcomes through tasks pitched at different levels of challenge.',
      'Group learners permanently by ability so that each group can be taught at one level.',
      'Focus on the weakest learners and accept that the strongest will progress on their own.',
    ],
    correctIndex: 1,
    explanation:
      'Differentiation keeps the essential learning outcomes constant while varying the task, support or pace so that learners at different levels are all appropriately challenged. Teaching to the middle leaves both ends unserved. Permanent ability grouping tends to entrench differences and lowers expectations for the lower groups. Focusing only on the weakest leaves the strongest without challenge.',
    source: 'Differentiated instruction; PRC ProfEd TOS area C (20%)',
  },

  // ==================================================================
  // ProfEd — Teaching Profession: PPST and evaluation
  // ==================================================================
  {
    id: 'pe-t-005',
    subjectId: 'profed',
    topicId: 'profed-teaching-profession',
    difficulty: 4,
    prompt:
      'Which of the following best describes the purpose of the Philippine Professional Standards for Teachers?',
    options: [
      'To rank teachers against one another for the purpose of promotion.',
      'To set out what teachers should know and be able to do at each career stage, providing a common language for practice, development and evaluation.',
      'To prescribe a single teaching method for all subjects and levels.',
      'To replace the Code of Ethics for Professional Teachers.',
    ],
    correctIndex: 1,
    explanation:
      'The PPST describes what teachers should know and be able to do at each of the four career stages — Beginning, Proficient, Highly Proficient and Distinguished — and gives the profession a shared language for practice, professional development and evaluation. It does not rank teachers against each other, does not prescribe a single method, and complements rather than replaces the Code of Ethics.',
    source: 'DepEd Order No. 42, s. 2017 (PPST); PRC ProfEd TOS area A (15%)',
  },
  {
    id: 'pe-t-006',
    subjectId: 'profed',
    topicId: 'profed-teaching-profession',
    difficulty: 4,
    prompt:
      'A teacher wants to improve her practice but has limited time. Which professional development approach is most likely to change what she does in the classroom?',
    options: [
      'Attending a large lecture on general teaching principles.',
      'Reading a book on educational theory over the school holidays.',
      'Working with a colleague to observe each other\u2019s lessons and give focused feedback on a specific practice over several weeks.',
      'Watching recorded lectures by well-known educators online.',
    ],
    correctIndex: 2,
    explanation:
      'Sustained, focused collaboration with a peer — observation followed by specific feedback on one practice, repeated over weeks — is the form of professional development most consistently linked to changes in classroom practice, because it is concrete, contextual and iterative. Lectures, books and videos can introduce ideas, but they are passive and disconnected from the teacher\u2019s own classroom, so they rarely change practice on their own.',
    source: 'Professional development literature; PRC ProfEd TOS area A (15%)',
  },

  // ==================================================================
  // ProfEd — Field Study: classroom management
  // ==================================================================
  {
    id: 'pe-f-004',
    subjectId: 'profed',
    topicId: 'profed-field-study',
    difficulty: 4,
    prompt:
      'A teacher notices that a learner is repeatedly off-task during independent work. Which first step is most appropriate?',
    options: [
      'Send the learner to the principal\u2019s office so the behaviour does not spread to others.',
      'Observe what precedes the off-task behaviour to work out whether the task is too hard, too easy, unclear, or whether something else is going on.',
      'Ignore the behaviour so as not to reinforce it with attention.',
      'Announce a class-wide consequence so that all learners are held responsible.',
    ],
    correctIndex: 1,
    explanation:
      'Behaviour has a function, and off-task behaviour during independent work is frequently caused by the task being mismatched to the learner — too hard, too easy, or unclear. Observing what precedes the behaviour is how the teacher identifies the cause before choosing a response. Sending the learner out removes them from instruction without addressing the cause, ignoring it lets the gap widen, and a class-wide consequence punishes learners who are not involved.',
    source: 'Classroom management; PRC ProfEd TOS area E (20%)',
  },
  {
    id: 'pe-f-005',
    subjectId: 'profed',
    topicId: 'profed-field-study',
    difficulty: 4,
    prompt:
      'A student teacher is asked to write a reflective journal during the practicum. Which entry demonstrates genuine reflection rather than description?',
    options: [
      '\u201cToday I taught the lesson on folk dances. The class was noisy at the start. I finished at 9:40.\u201d',
      '\u201cToday I taught the lesson on folk dances. The class was noisy at the start because I began talking before they had settled, and I had not planned an opening that required their attention. Next time I will begin with a listening task that makes silence necessary.\u201d',
      '\u201cToday\u2019s lesson went well. The learners seemed to enjoy the folk dances and participated actively throughout the period.\u201d',
      '\u201cToday I taught folk dances. I need to improve my classroom management and my questioning skills and my time management.\u201d',
    ],
    correctIndex: 1,
    explanation:
      'Genuine reflection identifies a cause and commits to a specific change: the noise is attributed to beginning before the class had settled, and the response is a concrete plan for the next lesson. The first entry is a bare record of events. The third is an unsupported positive summary. The fourth lists areas for improvement without diagnosing any cause or deciding what to do differently, which is a list of intentions rather than reflection.',
    source: 'Reflective practice; PRC ProfEd TOS area E (20%)',
  },

  // ==================================================================
  // CAE — Disciplinal: additional coverage
  // ==================================================================
  {
    id: 'cae-d-011',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 4,
    prompt:
      'Which of the following best describes the okir motif?',
    options: [
      'A curvilinear design used by the Maranao and Tausug, featuring the sarimanok, the naga and stylised fern forms.',
      'A geometric pattern used by the Ifugao in weaving and in the decoration of rice terraces.',
      'A style of wood carving practised by the T\u2019boli for the decoration of the torogan.',
      'A form of embroidery practised by the Agusan Manobo on ceremonial garments.',
    ],
    correctIndex: 0,
    explanation:
      'Okir is the curvilinear design and motif used by the Maranao and Tausug peoples, found on wood, metal and textiles. Its principal designs are the sarimanok, a colourful kingfisher with mythical associations; the naga, ancient serpents; and the pako rabing, a stylised fern. It appears on the extended floor beams of the Maranao torogan, on the malong, and on stone grave markers. The torogan is Maranao, not T\u2019boli, and Ifugao work is a different tradition.',
    source: 'Philippine art and craft traditions; PRC CAE TOS — Disciplinal Knowledge',
  },
  {
    id: 'cae-d-012',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 4,
    prompt:
      'The Manunggul Jar, one of the oldest known artefacts in the Philippines, is best described as:',
    options: [
      'A burial jar excavated from the Tabon Caves in Palawan, decorated with a boat carrying two figures.',
      'A bronze vessel used in trade with China during the Song dynasty.',
      'A water jar used in the Ifugao rice terraces for irrigation.',
      'A ceremonial vessel used by the Maranao for the preparation of betel nut.',
    ],
    correctIndex: 0,
    explanation:
      'The Manunggul Jar is a secondary burial jar excavated from the Manunggul cave of the Tabon Caves at Lipuun Point in Palawan. Its lid is decorated with a small boat carrying two figures, which is generally read as a depiction of the journey of the soul to the afterlife. The Maitum jars are a separate find from Sarangani.',
    source: 'Philippine archaeology; PRC CAE TOS — Disciplinal Knowledge',
  },
  {
    id: 'cae-d-013',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 4,
    prompt:
      'The Angono Petroglyphs are significant in Philippine art history because they are:',
    options: [
      'The oldest known artworks in the Philippines — 127 figural carvings engraved on the wall of a shallow cave.',
      'The earliest known example of Philippine weaving.',
      'The first Philippine artworks to be recognised as National Cultural Treasures.',
      'The earliest surviving examples of Philippine metalwork.',
    ],
    correctIndex: 0,
    explanation:
      'The Angono Petroglyphs in Rizal consist of 127 figural carvings engraved on the wall of a shallow cave of volcanic tuff, and they are regarded as the oldest known artworks in the Philippines. They are carvings in rock, not woven textiles, not metalwork, and the item tests whether the student associates the site with rock art rather than another medium.',
    source: 'Philippine archaeology; PRC CAE TOS — Disciplinal Knowledge',
  },
  {
    id: 'cae-d-014',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 5,
    prompt:
      'Which of the following correctly distinguishes the bul-ul from the okir?',
    options: [
      'The bul-ul is a carved granary god and ancestral figure of the Cordillera, while the okir is a curvilinear design motif of the Maranao and Tausug.',
      'The bul-ul is a Maranao design motif, while the okir is a Cordillera carved figure.',
      'Both are Maranao traditions, differing only in the material used.',
      'Both are Cordillera traditions, differing only in size.',
    ],
    correctIndex: 0,
    explanation:
      'The bul-ul is a carved wooden figure made by animistic communities of the Cordillera, functioning both as a granary god and as an ancestral spirit figure. The okir is a curvilinear design motif used by the Maranao and Tausug. They come from different regions, different peoples and different artistic traditions, which is what the item asks the student to keep straight.',
    source: 'Philippine art and craft traditions; PRC CAE TOS — Disciplinal Knowledge',
  },
  {
    id: 'cae-d-015',
    subjectId: 'cae',
    topicId: 'cae-disciplinal',
    difficulty: 5,
    prompt:
      'Which of the following statements about the Order of National Artists is correct?',
    options: [
      'It is jointly administered by the National Commission for Culture and the Arts and the Cultural Center of the Philippines, and conferred by the President on their recommendation.',
      'It is administered solely by the Department of Education and conferred by the Secretary of Education.',
      'It is administered by the National Museum and conferred by the Director of the Museum.',
      'It is administered by the University of the Philippines and conferred by its Board of Regents.',
    ],
    correctIndex: 0,
    explanation:
      'The Order of National Artists is jointly administered by the NCCA and the CCP, and conferred by the President of the Philippines on the recommendation of both institutions. It covers eight categories: Music, Dance, Theater, Visual Arts, Literature, Film and Broadcast Arts, and Architecture and Allied Arts. It is a national honour, not a DepEd, National Museum or university award.',
    source: 'NCCA, Order of National Artists',
  },

  // ==================================================================
  // CAE — Creative Expressions: additional coverage
  // ==================================================================
  {
    id: 'cae-c-007',
    subjectId: 'cae',
    topicId: 'cae-creative',
    difficulty: 3,
    prompt: 'In 3/4 time, how many beats does a dotted half note receive?',
    options: ['Two beats', 'Three beats', 'Four beats', 'One and a half beats'],
    correctIndex: 1,
    explanation:
      'A dot adds half the value of the note it follows. A half note is worth two beats, so a dotted half note is worth two plus one — three beats. In 3/4 time that fills the whole measure.',
    source: 'Music theory fundamentals; PRC CAE TOS — Creative Expressions',
  },
  {
    id: 'cae-c-008',
    subjectId: 'cae',
    topicId: 'cae-creative',
    difficulty: 4,
    prompt:
      'A dancer performs a movement in which the body is deliberately twisted and the proportions distorted to express anguish. Which method of presenting the subject does this reflect?',
    options: ['Realism', 'Distortion within abstraction', 'Symbolism', 'Fauvism'],
    correctIndex: 1,
    explanation:
      'Distortion is one of the methods of abstraction: the subject is presented in a misshapen or twisted condition, irregular in shape, emphasising a detail to the point that the subject is no longer depicted "correctly". It is used to convey emotional intensity rather than to record appearance accurately, which is why it is grouped under abstraction rather than realism. Symbolism uses conventional symbols, and Fauvism is characterised by bright colour rather than distortion of form.',
    source: 'Methods of presenting art subjects; PRC CAE TOS — Creative Expressions',
  },
  {
    id: 'cae-c-009',
    subjectId: 'cae',
    topicId: 'cae-creative',
    difficulty: 5,
    prompt:
      'Which of the following best explains the difference between veristic surrealism and automatism?',
    options: [
      'Veristic surrealism presents subconscious imagery in a highly realistic, detailed manner so that its meaning can be analysed, while automatism represents subconscious imagery in abstract form without imposing meaning on it.',
      'Veristic surrealism uses abstract forms, while automatism uses photographic realism.',
      'Veristic surrealism is a form of cubism, while automatism is a form of fauvism.',
      'Veristic surrealism was practised only in the Philippines, while automatism was practised only in Europe.',
    ],
    correctIndex: 0,
    explanation:
      'Veristic surrealism, associated with artists such as Salvador Dal\u00ed and Ren\u00e9 Magritte, depicts subconscious imagery with the precision of a photograph so that the meaning can be uncovered through analysis. Automatism, or abstract surrealism, presents subconscious imagery in abstract form and deliberately does not burden it with meaning, focusing on feeling rather than analysis. The two are branches of the same movement, not of cubism or fauvism.',
    source: 'Surrealism; PRC CAE TOS — Creative Expressions',
  },
  {
    id: 'cae-c-010',
    subjectId: 'cae',
    topicId: 'cae-creative',
    difficulty: 4,
    prompt:
      'An artist places an ordinary object in an environment where it would never normally appear, changing the viewer\u2019s perception of it. Which surrealist technique is this?',
    options: ['Levitation', 'Dislocation', 'Transformation', 'Scale'],
    correctIndex: 1,
    explanation:
      'Dislocation means taking an object out of its usual environment and placing it in an unfamiliar one, which defamiliarises it and changes how the viewer reads it. Levitation is making objects float that would not normally float. Transformation changes an object in an unusual way, such as a leaf becoming a butterfly. Scale changes an object\u2019s size.',
    source: 'Surrealist techniques; PRC CAE TOS — Creative Expressions',
  },

  // ==================================================================
  // CAE — Research and Extension: additional coverage
  // ==================================================================
  {
    id: 'cae-r-006',
    subjectId: 'cae',
    topicId: 'cae-research',
    difficulty: 4,
    prompt:
      'Which of the following best distinguishes quantitative from qualitative data?',
    options: [
      'Quantitative data is collected from large samples, while qualitative data is collected from small samples.',
      'Quantitative data consists of numbers and can be analysed statistically, while qualitative data consists of words, images and observations and is analysed for meaning and pattern.',
      'Quantitative data is objective, while qualitative data is unreliable.',
      'Quantitative data is collected by teachers, while qualitative data is collected by researchers.',
    ],
    correctIndex: 1,
    explanation:
      'The distinction is the form of the data and how it is analysed: quantitative data is numerical and analysed statistically, while qualitative data is non-numerical — words, images, observations — and analysed for meaning and pattern. Sample size often differs in practice but is not the defining distinction. Calling qualitative data unreliable misstates the case, and the occupation of the researcher is irrelevant.',
    source: 'Research methods; PRC CAE TOS — Research and Extension',
  },
  {
    id: 'cae-r-007',
    subjectId: 'cae',
    topicId: 'cae-research',
    difficulty: 5,
    prompt:
      'A teacher conducts an action research cycle and finds her intervention did not improve the outcome she expected. What is the appropriate next step?',
    options: [
      'Abandon the study, since a null result has no value in action research.',
      'Report the finding, examine why the intervention did not work, and use that understanding to design the next cycle.',
      'Adjust the data so that the results show an improvement.',
      'Publish the study as though the intervention had succeeded, since the intention was sound.',
    ],
    correctIndex: 1,
    explanation:
      'Action research is cyclical: a cycle that did not produce the expected result is still informative, because understanding why the intervention failed is what shapes the next attempt. Reporting the null result and analysing the reason is the correct practice. Abandoning the study discards that learning, and adjusting or misrepresenting the data is research misconduct regardless of the researcher\u2019s intentions.',
    source: 'Action research literature; PRC CAE TOS — Research and Extension',
  },

  // ==================================================================
  // CAE — Professional Accountability: additional coverage
  // ==================================================================
  {
    id: 'cae-a-006',
    subjectId: 'cae',
    topicId: 'cae-accountability',
    difficulty: 4,
    prompt:
      'Under RA 7836, which body is responsible for the licensure of teachers in the Philippines?',
    options: [
      'The Department of Education',
      'The Professional Regulation Commission, through the Board for Professional Teachers',
      'The Commission on Higher Education',
      'The National Commission for Culture and the Arts',
    ],
    correctIndex: 1,
    explanation:
      'RA 7836, the Philippine Teachers Professionalization Act of 1994, placed the licensure of teachers under the Professional Regulation Commission, acting through the Board for Professional Teachers. DepEd governs basic education, CHED governs higher education, and the NCCA is the policy body for culture and the arts — none of them administers teacher licensure.',
    source: 'Republic Act 7836; PRC CAE TOS — Professional Accountability',
  },
  {
    id: 'cae-a-007',
    subjectId: 'cae',
    topicId: 'cae-accountability',
    difficulty: 5,
    prompt:
      'A teacher is asked to sponsor a school cultural performance that requires learners to rehearse after class hours on several days. Which consideration is most important before agreeing?',
    options: [
      'Whether the performance will reflect well on the school.',
      'Whether the rehearsals will interfere with the learners\u2019 other academic work and whether participation is genuinely voluntary.',
      'Whether the teacher will be paid for the extra hours.',
      'Whether the performance can be staged during class time instead.',
    ],
    correctIndex: 1,
    explanation:
      'Rehearsals that run after class hours place demands on learners\u2019 time and may conflict with their academic work and rest. The teacher\u2019s primary duty is to the learners\u2019 welfare and learning, so the questions of academic interference and genuine voluntariness come first. The school\u2019s reputation and the teacher\u2019s own remuneration are secondary considerations, and moving the rehearsals into class time would displace instruction.',
    source: 'Code of Ethics for Professional Teachers; PRC CAE TOS — Professional Accountability',
  },

  // ==================================================================
  // CAE — Pedagogical Practice: additional coverage
  // ==================================================================
  {
    id: 'cae-p-009',
    subjectId: 'cae',
    topicId: 'cae-pedagogy',
    difficulty: 4,
    prompt:
      'A teacher wants to assess whether learners can apply the principles of design in their own work. Which assessment task best serves this purpose?',
    options: [
      'A matching test in which learners pair each principle with its definition.',
      'A task in which learners create a composition and write a short explanation of the design decisions they made.',
      'A multiple-choice test on the names of the principles.',
      'An oral recitation in which learners define each principle from memory.',
    ],
    correctIndex: 1,
    explanation:
      'Application requires learners to use the principles in practice, so the assessment must ask them to produce work and to account for the decisions they made. The explanation is what shows whether they applied the principle deliberately or by accident. Matching, multiple choice and recitation all test recall of the definitions, which is a lower cognitive demand than the objective states.',
    source: 'Assessment of learning; PRC CAE TOS — Pedagogical Practice',
  },
  {
    id: 'cae-p-010',
    subjectId: 'cae',
    topicId: 'cae-pedagogy',
    difficulty: 5,
    prompt:
      'A teacher is planning a lesson on Philippine folk dance for a class of thirty learners with only one small classroom available. Which arrangement is most appropriate?',
    options: [
      'Cancel the practical component and teach the dance through video and written description only.',
      'Adapt the lesson so that learners learn the steps in small rotating groups while the rest work on analysis tasks, then bring the whole class together for a final run-through.',
      'Conduct the practical component in the corridor outside the classroom.',
      'Ask learners to learn the dance at home from videos and assess them the following week.',
    ],
    correctIndex: 1,
    explanation:
      'Rotating small groups is the standard way to manage limited space: while one group practises, the others engage in a genuine learning task, and the whole class comes together at the end. Cancelling the practical component removes the very thing being taught. Using the corridor is a supervision and safety problem. Assigning practice to home shifts the teaching to video without the teacher\u2019s guidance or correction.',
    source: 'Instructional planning; PRC CAE TOS — Pedagogical Practice',
  },
];

export const ADDITIONAL_QUESTIONS: readonly Question[] = SEEDS.map((seed) => ({
  ...seed,
  status: 'approved' as const,
}));

export const ADDITIONAL_COUNT = ADDITIONAL_QUESTIONS.length;
