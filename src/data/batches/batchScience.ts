import type { QuestionDraft } from '../../pipeline';

/**
 * GenEd Science — part 1 of 2 (items sci-001 … sci-020).
 *
 * All items are original situational questions in the exam's shape: a vignette,
 * then the question as the final sentence, with the discriminating detail buried
 * mid-choice so the opening cannot be pattern-matched. Difficulty is 2–4 only —
 * the bank was measured as short on easy and moderate items, and a 350-item
 * paper at the graded ramp needs 105 easy and 175 moderate.
 *
 * Written by hand for this project; reviewer files were used for topic signal
 * only, never for wording.
 */

const V = (text: string) => text.trim();

export const BATCH_SCIENCE: readonly QuestionDraft[] = [
  {
    id: 'sci-001',
    subjectId: 'gened',
    topicId: 'gened-science',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 7 teacher is reviewing the unit on plant nutrition. She shows the
      class a photograph of a greenhouse where a farmer has placed a transparent
      cover over the plants. Inside the cover, the leaves are healthy and green
      while plants just outside the cover are pale and stunted. She explains
      that the cover does not add anything to the soil, and that the difference
      between the two groups of plants is not about food from the ground.
    `),
    prompt: 'Which process is the farmer helping the covered plants carry out?',
    options: [
      'The covered plants are carrying out photosynthesis, which uses light energy to convert carbon dioxide and water into food.',
      'The covered plants are carrying out respiration, which releases energy by breaking down food already stored in the cells.',
      'The covered plants are carrying out transpiration, which moves water up the stem and out through the leaves.',
      'The covered plants are carrying out digestion, which breaks down organic matter in the soil into absorbable nutrients.',
    ],
    correctIndex: 0,
    explanation:
      'Photosynthesis uses light energy, carbon dioxide and water to produce glucose and oxygen, and it is why leaves are green — chlorophyll reflects green light. Respiration breaks down the glucose that photosynthesis made, releasing energy the plant needs; it happens at night as well as by day. Transpiration is the loss of water vapour through leaf pores, which the cover reduces but does not make into food-making. Digestion is not a plant process; plants absorb mineral nutrients already dissolved.',
    rationale:
      'Recognising photosynthesis from a described setup where light, not soil nutrients, is the limiting factor.',
    source: 'General science; PRC GenEd TOS — Science and Technology',
  },
  {
    id: 'sci-002',
    subjectId: 'gened',
    topicId: 'gened-science',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 8 teacher holds up two identical balloons. One is inflated by
      breathing out into it, and the other by blowing air from a hand pump. She
      lets both go on a string in the same room. The balloon she blew into rises
      a little and then settles, while the one filled by breathing out sinks.
      She asks the class why the two balloons behave differently even though
      both contain air.
    `),
    prompt: 'Why does the hand-pumped balloon behave differently from the one filled with exhaled air?',
    options: [
      'The hand-pumped balloon contains a higher proportion of oxygen than exhaled air, so it is less dense than the surrounding air and rises.',
      'The hand-pumped balloon contains more nitrogen than exhaled air, so it is less dense than the surrounding air and rises.',
      'The hand-pumped balloon is smaller than the other, so it is pulled down more strongly by gravity and sinks faster.',
      'The hand-pumped balloon is warmer than exhaled air, so it cools on contact with the room and loses its lift.',
    ],
    correctIndex: 0,
    explanation:
      'Room air is roughly 21% oxygen and 78% nitrogen. Exhaled air is roughly 16% oxygen and has more carbon dioxide, so it is slightly denser than room air and the balloon sinks. Air from a pump is closer to room air and is at room temperature, giving a slightly lower density. Nitrogen makes up most of both gases and cannot explain the difference. Balloon size and cooling both work in the opposite direction from what the teacher observed.',
    rationale:
      'Explaining a buoyancy difference by gas composition rather than by size or temperature.',
    source: 'General science — density of gases; PRC GenEd TOS — Science and Technology',
  },
  {
    id: 'sci-003',
    subjectId: 'gened',
    topicId: 'gened-science',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 6 teacher prepares three cups for a class experiment. She fills
      the first with water, the second with water and a spoonful of salt
      dissolved in it, and the third with water and a spoonful of sand stirred
      in. She asks the class what they notice when she shines a torch through
      each cup, and what they notice after letting them stand for an hour.
    `),
    prompt: 'What is the teacher most likely trying to demonstrate?',
    options: [
      'She is trying to demonstrate that a solution is a uniform mixture that does not settle, while a suspension separates on standing.',
      'She is trying to demonstrate that a suspension dissolves faster than a solution when stirred.',
      'She is trying to demonstrate that salt and sand are both soluble in water at room temperature.',
      'She is trying to demonstrate that pure water is always clearer than salt water under a torch.',
    ],
    correctIndex: 0,
    explanation:
      'In the salt cup the salt is dissolved: the mixture is uniform, passes light evenly and cannot be separated by standing. In the sand cup the sand is a suspension — the particles are mixed but undissolved, scatter light more strongly, and settle to the bottom on standing, which is how sedimentation works. Salt is soluble and sand is not, so the third option is backwards. Clarity under a torch is not a reliable test of purity.',
    rationale:
      'Distinguishing a solution from a suspension using uniformity and settling behaviour.',
    source: 'General science — solutions and suspensions; PRC GenEd TOS — Science and Technology',
  },
  {
    id: 'sci-004',
    subjectId: 'gened',
    topicId: 'gened-science',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 7 teacher holds up a steel ball, a plastic spoon and a wooden
      block. She drops each into a tall cylinder of water and asks the class to
      watch what happens. The spoon and the block float, though the block
      slips under briefly before bobbing back up. The ball sinks straight to
      the bottom. She asks the class why all three objects behave differently.
    `),
    prompt: 'What property of matter explains the different behaviour of the three objects?',
    options: [
      'Density relative to water: an object floats when it is less dense than the liquid and sinks when it is denser.',
      'Solubility: an object dissolves when it is more soluble than the liquid and sinks when it is less.',
      'Hardness: an object sinks when its surface is harder than the surface of the liquid.',
      'Magnetic strength: an object sinks when it is strongly attracted to the metal at the base of the cylinder.',
    ],
    correctIndex: 0,
    explanation:
      'An object floats if the mass it displaces weighs as much as the water displaced, which happens when the object is less dense than water. Wood and most plastics are less dense, so they float — the block slipping under briefly is just air escaping from its surface. Steel is much denser, so it sinks. Solubility concerns molecules dispersing in a liquid, which none of these did. Hardness has nothing to do with buoyancy, and the cylinder need not even be metal for the ball to sink.',
    rationale:
      'Identifying density as the property behind floating and sinking.',
    source: 'General science — density and buoyancy; PRC GenEd TOS — Science and Technology',
  },
  {
    id: 'sci-005',
    subjectId: 'gened',
    topicId: 'gened-science',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 8 class is measuring the mass of samples on a balance. A teacher
      puts a sample on the pan and it reads 12.4 grams. She then adds a second
      identical sample and the reading becomes 24.8 grams. A learner asks why
      the number did not become 12.4 plus 12.4 plus some small amount for the
      extra pan, and the teacher explains that the balance is measuring
      something specific.
    `),
    prompt: 'What is the balance measuring that explains the reading?',
    options: [
      'The balance is measuring the mass of the sample, which is the amount of matter in it.',
      'The balance is measuring the volume of the sample, which is the space it occupies.',
      'The balance is measuring the weight of the sample, which is the gravitational force on it.',
      'The balance is measuring the density of the sample, which is its mass divided by its volume.',
    ],
    correctIndex: 0,
    explanation:
      'A balance in a classroom measures mass — the amount of matter — and mass is additive, so two identical samples read exactly twice one. Volume is measured by displacement or by graduated cylinders, not by a balance. Weight is the force gravity exerts on mass and varies with location, which is why a balance calibrated by mass gives the same reading anywhere. Density needs both mass and volume, so a balance alone cannot report it.',
    rationale:
      'Distinguishing mass from weight, volume and density from what a balance actually reads.',
    source: 'General science — mass and weight; PRC GenEd TOS — Science and Technology',
  },
  {
    id: 'sci-006',
    subjectId: 'gened',
    topicId: 'gened-science',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      During a Grade 7 lesson on the solar system, a teacher shows a diagram in
      which the Earth is drawn with a large circle of dashed lines around it, and
      a small planet shown crossing one of those dashed lines. She explains that
      the Earth itself has not moved and that nothing has been drawn to scale,
      and that the diagram is showing a relationship rather than distances.
    `),
    prompt: 'What does the dashed line around the Earth represent?',
    options: [
      'The dashed line represents the orbit of the smaller planet around the Sun, drawn relative to Earth for clarity.',
      'The dashed line represents the Earth\u2019s own path around the Sun, which is the same path the smaller planet takes.',
      'The dashed line represents the boundary of the Earth\u2019s magnetic field, which deflects charged particles.',
      'The dashed line represents the edge of the visible disc of the Earth as seen from the smaller planet.',
    ],
    correctIndex: 0,
    explanation:
      'The diagram is a schematic of orbits: the dashed line traces the smaller planet\u2019s path around the Sun, drawn as though the Earth sat still so the crossing would be easy to see. It is not the Earth\u2019s own orbit, which is a separate line. A magnetic field is shown as field lines leaving the poles, not as a circular dashed boundary. A disc of visibility would depend on the observer\u2019s position and would not be a stable circle.',
    rationale:
      'Reading a schematic orbit diagram as a relationship rather than a scale drawing.',
    source: 'General science — astronomy; PRC GenEd TOS — Science and Technology',
  },
  {
    id: 'sci-007',
    subjectId: 'gened',
    topicId: 'gened-science',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 7 teacher is teaching about forces. She pushes a heavy box across
      a floor and it does not move. She then pushes the same box across a sheet
      of rollers and it slides more easily. She asks the class what changed,
      and specifically whether the box became lighter.
    `),
    prompt: 'Which explanation is correct?',
    options: [
      'The rollers reduced the friction between the box and the floor, so less force was needed to overcome it.',
      'The rollers reduced the mass of the box, so less force was needed to move it.',
      'The rollers reduced the weight of the box, so less force was needed to move it.',
      'The rollers increased the gravitational pull of the Earth on the box, so it pressed harder against the floor.',
    ],
    correctIndex: 0,
    explanation:
      'Rolling contact replaces sliding contact, and sliding friction is much greater than rolling friction, so the same box moves with less applied force. Neither the mass nor the weight of the box changed — the rollers were inserted underneath it, not attached to it. Gravity is unaffected by the presence of rollers and certainly did not increase, which would have made the box harder to move, not easier.',
    rationale:
      'Explaining reduced effort via friction without changing an object\u2019s mass or weight.',
    source: 'General science — forces and friction; PRC GenEd TOS — Science and Technology',
  },
  {
    id: 'sci-008',
    subjectId: 'gened',
    topicId: 'gened-science',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 6 teacher lights a candle and holds a glass jar upside down just
      above the flame. The flame burns for a moment and then goes out. She then
      repeats the demonstration but this time puts a lit candle inside the jar
      first and lowers the jar over it. The candle burns for noticeably longer
      than in the first demonstration.
    `),
    prompt: 'Why does the candle burn longer when it is inside the jar?',
    options: [
      'The candle inside the jar has access to a larger volume of oxygen before the oxygen in the jar is used up.',
      'The candle inside the jar receives more heat because the glass traps heat from the flame.',
      'The candle inside the jar produces more oxygen as it burns, so the flame is sustained.',
      'The candle inside the jar has less wax left to consume, so it appears to burn for longer.',
    ],
    correctIndex: 0,
    explanation:
      'A flame needs oxygen. Held upside down just above the flame, the jar fills quickly with rising carbon dioxide and unburnt air, and the flame goes out almost at once. Lowered over a lit candle, the jar traps a much larger volume of oxygen-containing air, so combustion continues longer. Glass does not produce meaningful heat for the flame, combustion consumes oxygen rather than producing it, and wax supply is unchanged between the two trials.',
    rationale:
      'Explaining flame duration by the volume of available oxygen.',
    source: 'General science — combustion and respiration; PRC GenEd TOS — Science and Technology',
  },
  {
    id: 'sci-009',
    subjectId: 'gened',
    topicId: 'gened-science',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 8 class is discussing how the body fights infection. A teacher
      explains that when a cut in the skin becomes infected, cells travel from
      the blood to the affected tissue. She describes these cells as specialised
      cells that can leave the bloodstream, surround a foreign object and
      engulf it. She asks the class what these cells are called.
    `),
    prompt: 'Which cells is the teacher describing?',
    options: [
      'The cells being described are white blood cells, specifically phagocytes, which engulf foreign objects.',
      'The cells being described are red blood cells, which carry oxygen to the affected tissue.',
      'The cells being described are platelets, which form a clot to stop the bleeding.',
      'The cells being described are nerve cells, which signal pain to the brain.',
    ],
    correctIndex: 0,
    explanation:
      'White blood cells are the defensive cells of the blood; phagocytes among them leave the vessels, move to the site of infection and engulf pathogens — described as phagocytosis. Red blood cells carry oxygen using haemoglobin and do not attack anything. Platelets are cell fragments that help clotting. Nerve cells transmit impulses, including pain signals, but they neither travel to infection sites in the blood nor engulf anything.',
    rationale:
      'Identifying phagocytic white blood cells from their described function.',
    source: 'General science — human body systems; PRC GenEd TOS — Science and Technology',
  },
  {
    id: 'sci-010',
    subjectId: 'gened',
    topicId: 'gened-science',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 7 teacher holds up a bar magnet with the poles marked N and S. She
      brings it near a pile of small iron nails and they jump onto the ends of
      the magnet. She then breaks the magnet in half and shows the class that
      each half still attracts nails, and that each half now has both a north
      and a south end.
    `),
    prompt: 'Why does each half of the magnet still attract iron nails?',
    options: [
      'Because breaking a magnet separates it into two smaller magnets, each with its own north and south pole.',
      'Because the magnetic force resides only in the original magnet as a whole and vanishes when it is cut.',
      'Because each half becomes positively charged and attracts the iron nails by static electricity.',
      'Because breaking the magnet releases the stored magnetic energy, which then pulls the nails in.',
    ],
    correctIndex: 0,
    explanation:
      'Magnetic dipoles exist at the atomic level throughout the material, so cutting a magnet yields two shorter magnets, each with its own north and south pole. You cannot isolate a single pole this way. The force does not vanish on cutting. Static electricity involves charges, not magnetism, and iron filings are not attracted by static in this situation. No stored energy is released — breaking a magnet requires work against the internal alignment.',
    rationale:
      'Explaining persistent magnetism in a cut magnet by the existence of atomic-scale dipoles.',
    source: 'General science — magnetism; PRC GenEd TOS — Science and Technology',
  },
  {
    id: 'sci-011',
    subjectId: 'gened',
    topicId: 'gened-science',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 6 teacher is teaching about the Moon. She explains that the Moon
      does not produce its own light, and that a teacher in another part of
      the world may see the full Moon on the same night that her class sees no
      Moon at all. She says this happens because the Moon is lit by the Sun
      and does not shine on its own.
    `),
    prompt: 'Why can the full Moon be visible from one part of the world while another part sees no Moon at all?',
    options: [
      'Because the Moon orbits the Earth, so the side of the Moon facing a given location is different at a given moment.',
      'Because the Moon emits its own light on one side of the Earth and absorbs it on the other side.',
      'Because cloud cover in one country blocks the Moon while another country has clear skies.',
      'Because the Moon is closer to one half of the Earth than to the other half at any given time.',
    ],
    correctIndex: 0,
    explanation:
      'The Moon shines only by reflecting sunlight, and at any moment roughly half of its surface is lit while the other half is dark. Because the Moon orbits the Earth, the lit half is presented to different parts of the Earth over the month — which is the whole basis of the lunar phases. It emits no light of its own. Clouds could dim the Moon locally but not remove it entirely, and the Moon is essentially the same distance from every point on Earth at a given time.',
    rationale:
      'Explaining lunar phase visibility by orbit geometry rather than by distance or cloud.',
    source: 'General science — astronomy; PRC GenEd TOS — Science and Technology',
  },
  {
    id: 'sci-012',
    subjectId: 'gened',
    topicId: 'gened-science',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 8 teacher is teaching about chemical reactions. She places iron
      wool in a jar and then seals the jar, and separately places iron wool in
      an open dish. After several days the wool in the open dish has rusted
      through, while the wool in the sealed jar has barely changed at all. She
      asks the class what the sealed jar is missing that rusting needs.
    `),
    prompt: 'What does the sealed jar demonstrate about rusting?',
    options: [
      'That rusting requires oxygen from the air, which the sealed jar ran out of.',
      'That rusting requires water from the air, which the sealed jar kept out completely.',
      'That rusting requires the iron wool to be in direct contact with sunlight.',
      'That rusting requires the iron wool to be heated above room temperature.',
    ],
    correctIndex: 0,
    explanation:
      'Rusting is iron reacting with oxygen in the presence of moisture, and in the sealed jar the oxygen supply was quickly used up, so the reaction slowed almost to a stop. Water was present in both setups, so moisture was not what the seal excluded. Sunlight and heat speed up corrosion but are not required for it, and neither jar received extra sunlight — which is why that cannot explain the difference.',
    rationale:
      'Identifying oxygen as the limiting reactant from a sealed-versus-open comparison.',
    source: 'General science — chemical reactions and corrosion; PRC GenEd TOS — Science and Technology',
  },
  {
    id: 'sci-013',
    subjectId: 'gened',
    topicId: 'gened-science',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 7 teacher holds a glass of water and adds a spoonful of sugar.
      The sugar disappears after stirring and the water tastes sweet. She then
      boils the mixture until the water has gone and sugar remains in the
      pan. She asks the class whether the sugar was destroyed by dissolving,
      and how it came to be recovered.
    `),
    prompt: 'What does this demonstration show about dissolving?',
    options: [
      'Dissolving is a physical change: the sugar molecules spread through the water and can be recovered unchanged.',
      'Dissolving is a chemical change: the sugar molecules are broken down and reformed as the water evaporates.',
      'Dissolving is a chemical change: the sugar reacts with water to produce a new substance that tastes sweet.',
      'Dissolving is a physical change: the sugar is converted back into sugar by the boiling water.',
    ],
    correctIndex: 0,
    explanation:
      'Dissolving separates a substance into molecules or ions spread through a solvent without changing the substance itself; evaporation removes the solvent and leaves the original sugar, which proves it was never destroyed. A chemical change would produce new substances that could not be converted back. The taste confirms the sugar is present, not that a new compound formed, and boiling does not convert anything back into sugar — it merely removes the water that was carrying it.',
    rationale:
      'Recognising dissolving as a physical change from the reversibility of the process.',
    source: 'General science — physical and chemical changes; PRC GenEd TOS — Science and Technology',
  },
  {
    id: 'sci-014',
    subjectId: 'gened',
    topicId: 'gened-science',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 6 teacher places a small plant under a box with a small opening on
      one side and leaves it for a week. When the plant is removed, it has grown
      leaning toward the opening. The teacher asks the class what the plant was
      responding to, and how it knew which direction to grow.
    `),
    prompt: 'What is the plant responding to, and how does it detect it?',
    options: [
      'The plant is responding to light, detected by a photosensitive pigment in the shoot tip that causes unequal growth.',
      'The plant is responding to gravity, detected by statoliths in the root that cause the shoot to grow downward.',
      'The plant is responding to wind, detected by flexible stems that bend repeatedly in one direction.',
      'The plant is responding to moisture, detected by root tips that grow toward the dampest soil.',
    ],
    correctIndex: 0,
    explanation:
      'Shoots bend toward a light source by phototropism: a light-sensitive pigment in the tip perceives the direction, and growth becomes uneven so the shaded side elongates, bending the shoot toward the light. Roots do respond to gravity, but gravity would direct them downward, not toward a sideways opening. Wind causes no directional growth response of this kind, and the roots — not the shoot — respond to moisture, which is not what the teacher described.',
    rationale:
      'Identifying phototropism and its detection mechanism from directional shoot growth.',
    source: 'General science — plant responses; PRC GenEd TOS — Science and Technology',
  },
  {
    id: 'sci-015',
    subjectId: 'gened',
    topicId: 'gened-science',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 8 teacher is discussing sound. She strikes a tuning fork and holds it
      in a dish of water, and ripples spread across the surface. She then
      demonstrates in a vacuum jar that a bell cannot be heard when struck,
      even though the clapper is visibly moving. She asks the class what the
      bell needs in order to be heard.
    `),
    prompt: 'What does the bell need in order to be heard?',
    options: [
      'The bell needs a medium such as air or water for its vibrations to travel as sound waves to a receiver.',
      'The bell needs a vacuum between the clapper and the casing so the vibrations are not damped.',
      'The bell needs gravity to keep the clapper in contact with the casing while vibrating.',
      'The bell needs a magnet so the clapper can be pulled back against the casing.',
    ],
    correctIndex: 0,
    explanation:
      'Sound is a mechanical wave: the tuning fork must transfer its vibration to particles, which pass the disturbance on until it reaches an ear. In a vacuum there are no particles to carry it, so the clapper moves but no sound wave forms — that is exactly what the bell demonstration shows. A vacuum would damp vibrations, not help them. Gravity and magnets are irrelevant to whether a vibration can travel.',
    rationale:
      'Explaining why sound requires a medium, using the vacuum demonstration.',
    source: 'General science — sound and waves; PRC GenEd TOS — Science and Technology',
  },
  {
    id: 'sci-016',
    subjectId: 'gened',
    topicId: 'gened-science',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 6 class is discussing what plants need to grow. A teacher shows four
      seedlings. Each was given water and soil, but the first was kept in a dark
      cupboard, the second had water withheld, the third had soil withheld, and
      the fourth had sunlight withheld. Only the fourth grew pale and weak while
      the others showed some growth. She asks the class what the pale seedling
      shows.
    `),
    prompt: 'What does the pale, weak fourth seedling demonstrate?',
    options: [
      'That the seedling could grow without light but could not photosynthesise enough to stay green and sturdy.',
      'That the seedling received enough nutrients from water alone to grow normally without light.',
      'That light is the only resource a plant needs and that soil nutrients are unnecessary.',
      'That the seedling was genetically different from the others and could not produce chlorophyll.',
    ],
    correctIndex: 0,
    explanation:
      'Without light the seedling cannot photosynthesise, so it has little food to build tissue with; it grows long, thin and pale — etiolation — instead of green and sturdy. It still grew because seed reserves carried it through the early stage. Water alone cannot supply the mineral nutrients needed for healthy growth, so the second reading is wrong. Light is not the only requirement, and the other three seedlings were the same species, so genetics cannot explain the difference.',
    rationale:
      'Interpreting etiolation as a light-dependent photosynthetic deficit.',
    source: 'General science — plant growth requirements; PRC GenEd TOS — Science and Technology',
  },
  {
    id: 'sci-017',
    subjectId: 'gened',
    topicId: 'gened-science',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 8 teacher pours hot water into a metal pot and then into a plastic
      container of the same shape. The metal pot burns her hand almost
      immediately; the plastic one can still be held after a short wait. She asks
      the class what property of the two materials accounts for the difference.
    `),
    prompt: 'What property of the materials accounts for the difference?',
    options: [
      'Thermal conductivity: metal transfers heat to the hand far faster than plastic.',
      'Specific heat capacity: metal holds more heat per gram than plastic does.',
      'Density: metal is denser, so it holds the hot water closer to the hand.',
      'Elasticity: metal is less elastic, so it expands and presses against the hand.',
    ],
    correctIndex: 0,
    explanation:
      'Thermal conductivity is how readily heat passes through a material. Metal is a good conductor — it has mobile electrons — so heat reaches the outer surface quickly and burns. Plastic is a poor conductor, an insulator, so the surface stays cooler. Specific heat capacity describes how much energy a material stores per degree, not how fast it passes heat along, and it is not what caused the burn. Density and elasticity do not determine heat transfer to the hand in this situation.',
    rationale:
      'Distinguishing thermal conductivity from specific heat capacity.',
    source: 'General science — heat transfer; PRC GenEd TOS — Science and Technology',
  },
  {
    id: 'sci-018',
    subjectId: 'gened',
    topicId: 'gened-science',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 7 teacher folds a sheet of paper and cuts a small notch in the
      folded edge. When she unfolds the paper she finds two notches, one on each
      side, symmetrically placed. She explains that the paper had been folded
      twice before the cut was made, and asks the class why there are more
      holes than cuts.
    `),
    prompt: 'Why did one cut produce more than one hole?',
    options: [
      'Because the fold created layers that the cut passed through, so one cut went through several layers at once.',
      'Because the paper duplicated itself when it was folded, so both copies had to be cut separately.',
      'Because the cut removed material from both faces of the sheet regardless of the fold.',
      'Because the notches appeared symmetric by chance after the paper was unfolded.',
    ],
    correctIndex: 0,
    explanation:
      'Folding stacks several layers of paper. A single cut through the stack therefore produces a hole in every layer, which is the standard demonstration of symmetry and of how paper folding creates repeated patterns. The paper does not copy itself — folding bends the same material back on itself. A cut only pierces layers it actually passes through, so the number of holes is set by the number of layers, not by which face you cut. Symmetry here is the deliberate result of the fold, not a coincidence.',
    rationale:
      'Explaining multiple holes from one cut as a consequence of layered folding.',
    source: 'General science — properties of materials, symmetry; PRC GenEd TOS — Science and Technology',
  },
  {
    id: 'sci-019',
    subjectId: 'gened',
    topicId: 'gened-science',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 8 teacher is explaining inheritance. She tells the class that a
      certain trait runs in a family: it appears in every generation, and each
      child of an affected parent has about a one-in-four chance of being
      affected regardless of sex. She asks the class what this pattern suggests
      about how the trait is passed on.
    `),
    prompt: 'What does this pattern suggest?',
    options: [
      'That the trait is recessive and controlled by a single gene, with two unaffected carrier parents able to have an affected child.',
      'That the trait is dominant and controlled by a single gene, with every child of an affected parent being affected.',
      'That the trait is controlled by two genes at once, so a one-in-four chance is impossible.',
      'That the trait is acquired from the environment rather than being inherited at all.',
    ],
    correctIndex: 0,
    explanation:
      'A one-in-four chance in each pregnancy, with unaffected parents producing affected children, is the classic signature of a single-gene recessive trait: both parents are carriers and each child has a 25% risk regardless of sex. A dominant trait would appear in every generation and, with full penetrance, pass to every child of an affected parent — not a quarter. Two-gene inheritance gives 9:3:3:1 style ratios, not a clean 1-in-4. Environmental acquisition would not produce a fixed per-pregnancy probability or a consistent generational pattern.',
    rationale:
      'Identifying single-gene recessive inheritance from a 1-in-4 recurrence pattern.',
    source: 'General science — genetics and heredity; PRC GenEd TOS — Science and Technology',
  },
  {
    id: 'sci-020',
    subjectId: 'gened',
    topicId: 'gened-science',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 7 teacher is teaching about the water cycle. She explains that
      water from the ocean rises into the air, cools, and returns to land as
      rain. She then explains that water also flows downhill from the land back
      to the ocean in rivers and groundwater. She asks the class whether the
      water that runs off and the water that falls as rain are part of the same
      continuous process.
    `),
    prompt: 'What best describes the relationship between evaporation, precipitation and runoff?',
    options: [
      'They are stages of one continuous cycle in which water changes state, moves through the air, and returns to the ocean.',
      'They are three independent processes that share the word water but have no connection to one another.',
      'They are a one-way process in which water reaches the ocean and never returns to the atmosphere.',
      'They are a cycle driven entirely by plant transpiration, with evaporation playing no part.',
    ],
    correctIndex: 0,
    explanation:
      'The water cycle is a continuous loop: evaporation changes liquid water to vapour, condensation and precipitation return it to the surface, and runoff and groundwater carry it back to rivers and the ocean, where it evaporates again. The stages are linked rather than independent, and the cycle is not one-way. Transpiration contributes some vapour but is not the driver, and evaporation from oceans and lakes is the largest single source.',
    rationale:
      'Describing the water cycle as a connected loop rather than as separate or one-way processes.',
    source: 'General science — the water cycle; PRC GenEd TOS — Science and Technology',
  },
];

export default BATCH_SCIENCE;
