import type { QuestionDraft } from '../../pipeline';

/**
 * GenEd batch: Art Appreciation, The Contemporary World, Readings in
 * Philippine History, and The Life and Works of Rizal.
 *
 * Why this batch exists: a probe of the approved bank found 33 GenEd items
 * against a 20% TOS weight, and only 23 easy and 79 moderate items overall,
 * while a 350-item mock at the PRC graded ramp needs 105 easy, 175 moderate
 * and 70 difficult, most of them situational. So this file is 44 situational
 * items only, weighted toward the easy and moderate bands.
 *
 * Sources cited per item: PRC Board for Professional Teachers Resolution
 * No. 11, s. 2025 (LEPT Table of Specifications, General Education 20%);
 * DepEd K to 12 Arts Grade 10 and the CHED Art Appreciation syllabus;
 * Philippine history textbooks on prehistory, the colonial period and the
 * revolution; Jose Rizal, Noli Me Tangere (1887) and El Filibusterismo (1891);
 * RA 1425 (Rizal Law, 1956); the Treaty of Paris (1898); the Tydings-McDuffie
 * Act (1934); UN Sustainable Development Goals (2015).
 *
 * Historical caution is deliberate. Where a specific date or name could
 * plausibly be contested, the vignette supplies the detail and the item tests
 * a well-established fact, so a wrong answer key cannot be defended as the
 * single right reading.
 */

const V = (text: string) => text.trim();

export const BATCH_WORLD: readonly QuestionDraft[] = [
  // ==================================================================
  // ART APPRECIATION — 11 items (5 easy, 4 moderate, 2 difficult)
  // ==================================================================
  {
    id: 'wld-001',
    subjectId: 'gened',
    topicId: 'gened-art-appreciation',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      In a Grade 7 art class, a student is asked to copy the outline of a
      standing figure. The teacher hands her charcoal and a single stick, and
      tells her to make one continuous mark from the top of the head to the
      tip of the foot without lifting the hand, and not to go back over the
      mark to correct it. The student asks whether she may add shading later to
      make the figure look solid. The teacher says she may, but the exercise
      that matters is the mark itself: the whole point of the assignment is the
      single travelling stroke and what it records about the human figure.
    `),
    prompt: 'Which element of art is the teacher asking the student to use?',
    options: [
      'The element the teacher is asking for is line, because the exercise turns on a single travelling mark that records direction and contour.',
      'The element the teacher is asking for is form, because the exercise turns on a single travelling mark that records direction and contour.',
      'The element the teacher is asking for is value, because the exercise turns on a single travelling mark that records direction and contour.',
      'The element the teacher is asking for is texture, because the exercise turns on a single travelling mark that records direction and contour.',
    ],
    correctIndex: 0,
    explanation:
      'Line is the element that records direction and contour: a mark with a beginning, an end and a direction, and the one continuous stroke is exactly what is being practised here. Form is the illusion of three-dimensional volume, which the teacher postpones by telling the student she may shade later. Value is the lightness or darkness of a tone, and texture is the surface quality of a material, so neither is what the exercise asks for. Students who answer form are reading the figure as the goal rather than the mark.',
    rationale: 'Naming line from a described continuous-stroke exercise, and separating it from form, value and texture.',
    source: 'Elements of art; DepEd K to 12 Arts, Grade 10',
  },
  {
    id: 'wld-002',
    subjectId: 'gened',
    topicId: 'gened-art-appreciation',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student mixes paint on a palette and, without adding a second pigment,
      manages to turn one hue into several distinct tones, from almost white to
      almost black. The class asks her how she did it. She explains that she
      added more and more of the white of the palette, and then more and more
      of it, and that the hue stayed the same while something else changed. The
      teacher writes on the board that a hue can be made lighter by adding white
      and darker by adding black, and asks the class which element of art the
      student was actually controlling.
    `),
    prompt: 'Which element of art did the student vary while keeping the hue constant?',
    options: [
      'The element the student varied is value, because lightening and darkening a single hue changes its tone without changing its identity.',
      'The element the student varied is hue, because lightening and darkening a single hue changes its tone without changing its identity.',
      'The element the student varied is saturation, because lightening and darkening a single hue changes its tone without changing its identity.',
      'The element the student varied is form, because lightening and darkening a single hue changes its tone without changing its identity.',
    ],
    correctIndex: 0,
    explanation:
      'Value is the lightness or darkness of a colour. Adding white produces a tint and adding black produces a shade, and in both cases the hue stays recognisably the same, which is exactly what the student reports. Hue is the name of the colour itself (red, blue, yellow), so it did not change. Saturation concerns how pure or intense a colour is rather than how light or dark it is. Form is three-dimensional volume and has nothing to do with tone on a palette.',
    rationale: 'Separating value from hue and saturation when a single colour is made lighter and darker.',
    source: 'Elements of art; DepEd K to 12 Arts, Grade 10',
  },
  {
    id: 'wld-003',
    subjectId: 'gened',
    topicId: 'gened-art-appreciation',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student is asked to make a drawing that looks, at a distance, like a
      woven mat of abaca. She is given a pencil, a piece of coarse paper, and
      no eraser. She discovers that if she drags the side of the pencil slowly
      across the grain of the paper, the paper itself supplies the roughness and
      her drawing comes out convincingly fibrous. Her classmate, working on
      smooth paper, tries the same technique and produces a flat grey area. The
      teacher points out that the first student has reproduced something about
      the mat that she never actually drew.
    `),
    prompt: 'Which element of art has the first student reproduced?',
    options: [
      'The element reproduced is texture, because the drawing conveys how a surface would feel to the touch without any line describing it.',
      'The element reproduced is line, because the drawing conveys how a surface would feel to the touch without any line describing it.',
      'The element reproduced is space, because the drawing conveys how a surface would feel to the touch without any line describing it.',
      'The element reproduced is balance, because the drawing conveys how a surface would feel to the touch without any line describing it.',
    ],
    correctIndex: 0,
    explanation:
      'Texture is the surface quality of a material, felt or seen. Here the student reproduces implied texture: the drawing suggests a coarse surface without any line stating it, which is why the technique fails on smooth paper. Line is a mark with direction and is what the drawing does have, but it is not what the drawing communicates. Space concerns depth and area, and balance concerns the arrangement of visual weight, so neither explains why the drawing reads as fibrous.',
    rationale: 'Recognising implied texture from a described rubbing technique on coarse versus smooth paper.',
    source: 'Elements of art; implied texture in drawing; DepEd K to 12 Arts',
  },
  {
    id: 'wld-004',
    subjectId: 'gened',
    topicId: 'gened-art-appreciation',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      Two versions of the same landscape are hung side by side in a classroom.
      The first builds the whole picture out of orange, red and yellow, and
      viewers step toward it involuntarily and describe it as hot, immediate and
      loud. The second uses blue, green and violet, and viewers settle back,
      describing it as cool and receding even though the two pictures show the
      same field, the same sky and the same trees in the same positions. The
      teacher asks the class what, exactly, has been changed between the two
      works.
    `),
    prompt: 'What accounts for the difference in how the two viewers react?',
    options: [
      'The difference comes from warm and cool colour, because reds and oranges advance toward the viewer while blues and greens recede.',
      'The difference comes from pattern and rhythm, because reds and oranges advance toward the viewer while blues and greens recede.',
      'The difference comes from scale and proportion, because reds and oranges advance toward the viewer while blues and greens recede.',
      'The difference comes from texture and relief, because reds and oranges advance toward the viewer while blues and greens recede.',
    ],
    correctIndex: 0,
    explanation:
      'The two pictures are identical in content and differ only in hue temperature, which is why the difference in response points to warm and cool colour. Warm hues, reds through yellows, appear to advance; cool hues, blues through greens, appear to recede. Pattern and rhythm concern repetition, scale and proportion concern relative size, and texture concerns surface, so none of them explains why the same composition feels close in one version and distant in the other.',
    rationale: 'Linking an observed difference in emotional and spatial response to warm and cool colour.',
    source: 'Colour theory; DepEd K to 12 Arts, Grade 10',
  },
  {
    id: 'wld-005',
    subjectId: 'gened',
    topicId: 'gened-art-appreciation',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A Grade 8 student is decorating a folder cover and has painted the same
      small motif, a stylised leaf, six times in a straight row down the centre,
      spacing each one evenly. Her classmate painted the same motif, but placed
      it six times in an arc that sweeps from the bottom left corner toward the
      top right, again spaced evenly, so that the eye is carried along the arc
      and arrives at the corner. Both students used one motif and neither varied
      its size or colour. The teacher asks the class why the two covers do not
      have the same effect.
    `),
    prompt: 'Which principle of design best explains the effect of the two covers?',
    options: [
      'The principle at work is rhythm, because repeating a motif at regular intervals makes the eye move across the work in a predictable way.',
      'The principle at work is texture, because repeating a motif at regular intervals makes the eye move across the work in a predictable way.',
      'The principle at work is value, because repeating a motif at regular intervals makes the eye move across the work in a predictable way.',
      'The principle at work is space, because repeating a motif at regular intervals makes the eye move across the work in a predictable way.',
    ],
    correctIndex: 0,
    explanation:
      'Rhythm is produced by the repetition of an element at regular intervals, and it is what makes an eye travel along the row or along the arc. The two covers use identical motifs, so the only variable is how the repetition is arranged. Texture is the surface quality of a material, value is the lightness or darkness of a tone, and space concerns depth and area. None of those is created simply by repeating a shape, which is the definition of rhythm.',
    rationale: 'Identifying rhythm as the effect of repeating one motif at regular intervals in different arrangements.',
    source: 'Principles of design: rhythm; DepEd K to 12 Arts, Grade 10',
  },
  {
    id: 'wld-006',
    subjectId: 'gened',
    topicId: 'gened-art-appreciation',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student paints a crowded market scene in which the stalls, baskets,
      animals and people are all painted in the same grey-brown mixture at the
      same value. Halfway through she stops and paints one vendor in the centre
      in full colour, leaving everything else exactly as it was. The picture now
      has a centre that the eye goes to first, and the class says the vendor has
      become the subject of the painting, even though nothing was moved and
      nothing was added. The teacher asks the class to say what the student did.
    `),
    prompt: 'Which principle of design does the student create by repainting one figure in full colour?',
    options: [
      'The principle created is emphasis, because the vendor is made to stand out and become the focal point of the composition.',
      'The principle created is balance, because the vendor is made to stand out and become the focal point of the composition.',
      'The principle created is pattern, because the vendor is made to stand out and become the focal point of the composition.',
      'The principle created is unity, because the vendor is made to stand out and become the focal point of the composition.',
    ],
    correctIndex: 0,
    explanation:
      'Emphasis is the principle by which an artist makes one area dominate so that it becomes the focal point, and isolating one figure in full colour against a muted field is the classic way of doing it. Balance concerns the distribution of visual weight so that a composition rests stably, and here the vendor has in fact been made heavier, not balanced. Pattern is the repetition of a motif, and unity is the coherence of all parts in one work, which this painting arguably lacks rather than gains.',
    rationale: 'Distinguishing emphasis from balance, pattern and unity when one element is visually isolated.',
    source: 'Principles of design: emphasis; DepEd K to 12 Arts, Grade 10',
  },
  {
    id: 'wld-007',
    subjectId: 'gened',
    topicId: 'gened-art-appreciation',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student is painting a banana leaf cutout for a school fair. She paints
      the surrounding field a flat dark green and then leaves the shape of the
      leaf itself unpainted, so that the pale paper inside the outline of the
      leaf is what the viewer sees as the leaf. Her teacher asks her to try the
      opposite arrangement, a pale field with a dark leaf. The student finds that
      the second version makes her eyes search for the shape instead of finding
      it immediately, and the class discusses why the same outline behaves so
      differently in the two versions.
    `),
    prompt: 'What does the contrast between the two versions demonstrate?',
    options: [
      'The comparison demonstrates space, because the figure-ground relationship decides which shape reads as the subject of a drawing.',
      'The comparison demonstrates balance, because the figure-ground relationship decides which shape reads as the subject of a drawing.',
      'The comparison demonstrates emphasis, because the figure-ground relationship decides which shape reads as the subject of a drawing.',
      'The comparison demonstrates rhythm, because the figure-ground relationship decides which shape reads as the subject of a drawing.',
    ],
    correctIndex: 0,
    explanation:
      'What reads as the figure and what reads as the ground is a matter of space, and swapping which area is dark and which is light reverses the figure-ground relationship so the eye finds the shape less easily. Emphasis is close to what is happening, but emphasis is a decision about where the eye should go within a settled composition, whereas the vignette is about which of two areas becomes the shape at all. Balance concerns weight, and rhythm concerns repetition, so neither accounts for the reversal.',
    rationale: 'Explaining a reversal in figure-ground reading as a problem of space rather than of emphasis or balance.',
    source: 'Elements of art: space, positive and negative shape; DepEd K to 12 Arts',
  },
  {
    id: 'wld-008',
    subjectId: 'gened',
    topicId: 'gened-art-appreciation',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student looks at a colour wheel and is asked which colour she would get
      if she mixed equal amounts of the yellow and the blue on it. She answers
      green and is correct. She is then asked about mixing the blue and the
      yellow and a little of the red, and about placing a colour next to the one
      opposite it on the wheel. Her classmate asks why the wheel is arranged the
      way it is, and the teacher says the wheel is not decoration but a map: it
      shows which colours are made from others and which colours contradict each
      other, and that is why painters use it.
    `),
    prompt: 'What is the principal function of the colour wheel in art?',
    options: [
      'The principal function is classification, because it maps which colours are primary, which are mixed from them, and which contrast each other.',
      'The principal function is ornament, because it maps which colours are primary, which are mixed from them, and which contrast each other.',
      'The principal function is measurement, because it maps which colours are primary, which are mixed from them, and which contrast each other.',
      'The principal function is reproduction, because it maps which colours are primary, which are mixed from them, and which contrast each other.',
    ],
    correctIndex: 0,
    explanation:
      'The colour wheel is a working diagram. Its inner ring holds the primaries, the next ring the secondaries made from them, and positions on opposite sides mark complementary colours that intensify each other when placed side by side. That makes its function classification and reference. Calling it ornament mistakes a tool for decoration; calling it measurement confuses colour with size; calling it reproduction confuses the diagram with printing colour. A painter consults the wheel to predict mixtures and clashes, which is exactly what the students did.',
    rationale: 'Reading the colour wheel as a map of mixtures and complementary pairs rather than as decoration.',
    source: 'Colour theory; CHED Art Appreciation syllabus',
  },
  {
    id: 'wld-009',
    subjectId: 'gened',
    topicId: 'gened-art-appreciation',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student in an art criticism class looks at a painting and lists what she
      can see: the figures, the colours, the arrangement of the bodies, the
      direction of the light. The teacher then asks her three further questions:
      what the light and the arrangement are doing to the viewer, why the
      painter might have chosen this arrangement over another, and what judgement
      the work makes about its subject. The student finds these much harder than
      the inventory of objects, and the teacher explains that the inventory is
      the easy half of a method and the other half is what the work is doing.
    `),
    prompt: 'Which activity is the teacher conducting?',
    options: [
      'The teacher is conducting art criticism, because the work is being described, analysed, interpreted and judged rather than merely viewed.',
      'The teacher is conducting art aesthetics, because the work is being described, analysed, interpreted and judged rather than merely viewed.',
      'The teacher is conducting art production, because the work is being described, analysed, interpreted and judged rather than merely viewed.',
      'The teacher is conducting art history, because the work is being described, analysed, interpreted and judged rather than merely viewed.',
    ],
    correctIndex: 0,
    explanation:
      'Art criticism is the discipline of responding to a work in order to describe it, analyse how it works, interpret its meaning and make a judgement about it, and the teacher is walking the student through exactly those stages. Aesthetics is the philosophical inquiry into what art is and whether beauty exists, which is a different kind of question. Production concerns making works, and history concerns placing a work in its period, so neither fits what the teacher is doing with this painting.',
    rationale: 'Separating art criticism from aesthetics, production and history in a described classroom sequence.',
    source: 'Discipline-Based Art Education; DepEd K to 12 Arts, Grade 10',
  },
  {
    id: 'wld-010',
    subjectId: 'gened',
    topicId: 'gened-art-appreciation',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is planning an art appreciation unit and writes four strands of
      learning outcomes on the board. Students should make an artwork of their
      own; they should learn what was happening in art in a given period; they
      should examine an existing work and say what it does and why; and they
      should argue about questions such as whether a plain wooden chair is a work
      of art. The teacher explains that the first three strands can be assessed
      by looking at student work and written answers, but that the fourth strand
      has no answer key and requires the class to reason about the definition of
      art itself.
    `),
    prompt: 'Which discipline does the fourth strand of the lesson plan belong to?',
    options: [
      'The fourth strand belongs to aesthetics, because it deals with the nature of art and beauty as questions of philosophy rather than of description.',
      'The fourth strand belongs to art history, because it deals with the nature of art and beauty as questions of philosophy rather than of description.',
      'The fourth strand belongs to art criticism, because it deals with the nature of art and beauty as questions of philosophy rather than of description.',
      'The fourth strand belongs to art production, because it deals with the nature of art and beauty as questions of philosophy rather than of description.',
    ],
    correctIndex: 0,
    explanation:
      'Aesthetics is the branch of philosophy that asks what art is, what beauty is, and by what standard a work is judged, which is precisely what the chair question raises. Art criticism, though it also asks students to argue, works on particular works: describing, analysing, interpreting and judging a given artefact. Art history situates works in their periods, and art production concerns making them. The teacher himself marks the fourth strand as the one with no answer key, which is the clue.',
    rationale: 'Placing a definitional question about whether an object is art within aesthetics rather than criticism.',
    source: 'Discipline-Based Art Education; aesthetics; DepEd K to 12 Arts',
  },
  {
    id: 'wld-011',
    subjectId: 'gened',
    topicId: 'gened-art-appreciation',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student sees a figure of a saint holding a book in a church altarpiece
      and identifies the saint, the book and the halo. Her teacher asks her to go
      further: to investigate what the halo meant in the painting of that period,
      what the patron who commissioned the work intended it to say about the
      family who paid for it, and how the meaning of the attribute changed as the
      idea moved from one culture to another. The teacher explains that naming
      the objects is only the first half of the job, and that the second half
      traces the ideas the objects carried with them.
    `),
    prompt: 'What is the second half of the job that the teacher is describing?',
    options: [
      'The second half is iconology, because it traces the deeper cultural, religious and philosophical meanings attached to the identified subject matter.',
      'The second half is iconography, because it traces the deeper cultural, religious and philosophical meanings attached to the identified subject matter.',
      'The second half is formal analysis, because it traces the deeper cultural, religious and philosophical meanings attached to the identified subject matter.',
      'The second half is provenance research, because it traces the deeper cultural, religious and philosophical meanings attached to the identified subject matter.',
    ],
    correctIndex: 0,
    explanation:
      'Identifying the saint, the book and the halo is iconography, the identification of subject matter; tracing what those objects meant in their own period, and what the patron intended, is iconology, the deeper level of cultural and philosophical meaning. The vignette separates the two halves deliberately, and the answer is the second one. Formal analysis concerns line, colour and composition rather than meaning, and provenance concerns the ownership history of a work rather than its symbolism.',
    rationale: 'Distinguishing iconology from iconography, formal analysis and provenance in a described study of religious art.',
    source: 'Panofsky, iconography and iconology; CHED Art Appreciation syllabus',
  },
  {
    id: 'wld-012',
    subjectId: 'gened',
    topicId: 'gened-contemporary-world',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student in a small provincial town notices that a garment shop in the
      city centre now sells only clothes made abroad, and that the tailor two
      streets away has closed. Her aunt, who works in the city, explains that
      the garments arrive because import duties are low and because the same
      garment can be made more cheaply where wages are lower. The student asks
      whether this is a good thing or a bad thing, and her aunt says it is both,
      and that the only honest answer is to look at what is gained and what is
      lost at the same time. The class takes this as its starting point.
    `),
    prompt: 'Which statement best describes globalisation?',
    options: [
      'Globalisation is the widening of economic, political, cultural and social connections across national borders, bringing gains and losses at the same time.',
      'Globalisation is the total removal of national borders, which ends the authority of every government within its own territory.',
      'Globalisation is the export of Filipino labour overseas, which reduces the need for reform at home because income arrives in pesos.',
      'Globalisation is the spread of a single culture worldwide, which necessarily erases every local tradition it comes into contact with.',
    ],
    correctIndex: 0,
    explanation:
      'Globalisation is the intensification of cross-border flows of goods, capital, people, information and culture; analysts argue about its benefits and its costs rather than about whether it exists. It does not abolish borders, and governments keep their authority. It is not the same as migration, which is one of several flows rather than the whole process. Nor does it mean a single uniform culture: global and local coexist, and local traditions are often revived rather than erased.',
    rationale: 'Defining globalisation as cross-border interconnection with both gains and costs, and rejecting the extremes.',
    source: 'The Contemporary World syllabus; PRC GenEd TOS',
  },
  {
    id: 'wld-013',
    subjectId: 'gened',
    topicId: 'gened-contemporary-world',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      During a class discussion on health, a student says that a traditional
      herbal remedy works because the people who have used it for generations
      cannot be wrong. Her classmate counters that belief has never been shown
      to cause a remedy to work, and adds that the remedy has survived partly
      because people tell each other that it works. Their teacher praises the
      counter-argument and then adds a caution: some traditional remedies have
      been shown to work, and some have not, and the way to find out is testing,
      not popularity and not dismissal.
    `),
    prompt: 'Which statement best describes the relationship between tradition and evidence?',
    options: [
      'A tradition is a claim worth testing, and it earns acceptance only when controlled evidence supports it, regardless of its age or popularity.',
      'A tradition is a claim that age alone settles, so long use is sufficient evidence that the practice is beneficial.',
      'A tradition is a claim that only modern laboratories may judge, so any practice outside formal science must be abandoned at once.',
      'A tradition is a claim that belief and practice are unrelated, so a remedy works only if its users expect it to work.',
    ],
    correctIndex: 0,
    explanation:
      'The scientific position is neutral about age: a practice is accepted on the strength of testable evidence, so some traditional remedies are vindicated and others are not. Option two commits the appeal-to-tradition fallacy, treating long use as proof. Option three inverts the same error by treating anything outside laboratory science as worthless, discarding remedies that have been tested successfully. Option four mistakes placebo effect for the whole of how a remedy works.',
    rationale: 'Rejecting appeal to tradition and its mirror-image rejection of untested tradition alike.',
    source: 'Scientific method and critical thinking; The Contemporary World syllabus',
  },
  {
    id: 'wld-014',
    subjectId: 'gened',
    topicId: 'gened-contemporary-world',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A group of students is asked to design a poster about waste reduction for
      their school fair. One suggests showing a photograph of a landfill with a
      caption that names the problem and gives three concrete actions a student
      can take this week. Another suggests showing a photograph of a landfill
      and asking the viewer to feel bad about being part of the problem. A third
      proposes a poster with no photograph at all, only the three actions and
      the slogan, arguing that a message which does not change behaviour is
      worthless. The class has to decide which design its intended audience will
      actually act on.
    `),
    prompt:
      'Which statement best describes the design most likely to change this audience’s behaviour?',
    options: [
      'The strongest design is the one that pairs a picture establishing the problem with a specific action the viewer can take this week.',
      'The strongest design is the one that shames the viewer into realising they are personally responsible for the waste around them.',
      'The strongest design is the one that carries a memorable slogan and leaves the details of the action to the viewer.',
      'The strongest design is the one that drops the photograph, since a message carrying no evidence can be repeated without ever being checked.',
    ],
    correctIndex: 0,
    explanation:
      'Persuasive communication supports a message that does two jobs: an image or fact that establishes why the problem matters, and a small specific action the viewer can actually perform. Guilt is unreliable as a motivator, and shaming tends to produce avoidance rather than change. A slogan without an action leaves the viewer unable to do anything with the message, while a message with no evidence cannot be checked and is easily dismissed. The practical test is whether the viewer ends the encounter knowing what to do next, and only the paired design satisfies it.',
    rationale: 'Choosing a persuasive design that pairs a reason to act with a specific attainable action.',
    source: 'Media and information literacy; persuasive communication principles',
  },
  {
    id: 'wld-015',
    subjectId: 'gened',
    topicId: 'gened-contemporary-world',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student is asked to check a claim before using it in a report. The post
      says that a widely shared photograph shows a crowd at a rally in one
      country. The student finds the same photograph posted two years earlier
      with a caption naming a completely different country, and finds no
      reliable news report matching the version being shared. The student also
      checks whether the organisation that first posted it is known for accuracy.
      The teacher asks the student to write one sentence describing what the
      evidence shows, and the student concludes that the photograph has
      circulated for years with a changing caption and cannot currently be
      trusted as proof of anything about the rally.
    `),
    prompt: 'Which skill did the student demonstrate?',
    options: [
      'The skill demonstrated is fact-checking, because the claim was tested against earlier instances of the same image and against independent reporting.',
      'The skill demonstrated is sourcing, because the claim was tested against earlier instances of the same image and against independent reporting.',
      'The skill demonstrated is copyright, because the claim was tested against earlier instances of the same image and against independent reporting.',
      'The skill demonstrated is etiquette, because the claim was tested against earlier instances of the same image and against independent reporting.',
    ],
    correctIndex: 0,
    explanation:
      'Fact-checking means testing a claim against what can be independently confirmed: tracing an image back through earlier posts carrying different captions, and searching for independent reporting. Sourcing concerns who produced a piece of work, which is a different question, and crediting the first publisher would conflate origin with accuracy. Copyright concerns reuse rights and does not establish whether a claim is true. Etiquette concerns respectful practice and also does not establish truth. Popularity is not verification either, since falsehoods spread faster than corrections.',
    rationale: 'Recognising fact-checking through image tracing and independent corroboration, not popularity.',
    source: 'Media and information literacy; verification in the age of social media',
  },
  {
    id: 'wld-016',
    subjectId: 'gened',
    topicId: 'gened-contemporary-world',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student posts a photograph of herself and a friend on a public account.
      She later learns that a classmate had copied both faces out of the picture
      and used them on a page that sells weight-loss products. The student
      complains to her teacher, who asks her to work through the question of
      what a person owes to others online. The class agrees that posting a
      picture of a friend without asking is already a small breach, and that
      using someone's face to sell something is a much larger one. The teacher
      points out that the harm here was not accidental.
    `),
    prompt: 'What principle of digital citizenship does the teacher illustrate?',
    options: [
      'The principle is digital responsibility, because people remain accountable for the foreseeable harm their online actions cause other people.',
      'The principle is digital anonymity, because people are not identifiable online and cannot be held accountable for what they publish.',
      'The principle is digital neutrality, because the same image posted in two places carries the same meaning in both.',
      'The principle is digital literacy, because the skill of recognising file formats is what prevents this kind of misuse.',
    ],
    correctIndex: 0,
    explanation:
      'Digital responsibility holds that online conduct has consequences for real people and that the actor is accountable, which is the point of the teacher pressing the question of what one owes to others. Anonymity is not a defence; the same person can be found. Neutrality fails because an image stripped of its context can carry a different meaning from its original. Technical skill in file formats does nothing to address consent or harm, which are the issues actually raised here.',
    rationale: 'Applying digital responsibility to the foreseeable harm done through another person’s likeness.',
    source: 'Digital citizenship; media and information literacy',
  },
  {
    id: 'wld-017',
    subjectId: 'gened',
    topicId: 'gened-contemporary-world',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student reads a long article online that argues the country should build
      a large dam to solve a water shortage. The article is bylined, cites
      government studies, and includes a section on environmental harm. The
      student is asked to write a summary. Their summary states only the dam
      argument and omits the environmental harm section, because the author
      presents it briefly and the student thought the main point was the dam. A
      classmate points out that omitting a counter-argument in a summary
      misrepresents the original. The teacher asks: whose view is the summary
      reporting, and has anything from the original been left out that a reader
      would need?
    `),
    prompt: 'What is the main flaw in the first student summary?',
    options: [
      'The summary drops a significant counter-argument from the original, so it distorts the author’s overall position by leaving it out.',
      'The summary is too short to be usable, because a summary of a long article can never do justice to the argument.',
      'The summary should have quoted the article verbatim, because paraphrase in a summary inevitably introduces the summariser’s own bias.',
      'The summary should have included the student’s own opinion, because an objective summary cannot represent a contested question.',
    ],
    correctIndex: 0,
    explanation:
      'Summarising means representing the original faithfully, including the parts that complicate the main claim; leaving out the environmental harm section makes the article look more one-sided than it is. Option two confuses summary with length, since a good summary is short by design. Option three is wrong about method: paraphrase is standard and summarising in one’s own words is what avoids plagiarism, whereas verbatim copying is the opposite of a summary. Option four mistakes summary for argument, since adding the writer’s opinion defeats the purpose.',
    rationale: 'Detecting the distortion caused by dropping a counter-argument when summarising an argued article.',
    source: 'Media and information literacy; summarising and paraphrasing technique',
  },
  {
    id: 'wld-018',
    subjectId: 'gened',
    topicId: 'gened-contemporary-world',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student is shown two photographs for a class analysis. The first is a
      full view of a fishing boat at sea, in which all elements carry similar
      visual weight. The second is a tight crop of the same boat in which the
      hull fills the frame and the horizon is gone. The teacher asks what has
      changed, and the students notice that the crop has removed the sea, the
      horizon and the sky, so the boat now presses against the frame with
      nowhere to go. The teacher asks whether the crop misrepresents the
      photograph, and the class concludes that it does not, because nothing has
      been invented, but that it certainly changes what the photograph is able
      to mean.
    `),
    prompt: 'What does the comparison of the two photographs demonstrate?',
    options: [
      'It demonstrates that a photograph is not neutral, because cropping selects and excludes, and selection is an interpretive act.',
      'It demonstrates that a photograph is neutral, because cropping selects and excludes, and selection is an interpretive act.',
      'It demonstrates that photographs are only reliable when they carry captions, because cropping selects and excludes, and selection is an interpretive act.',
      'It demonstrates that photographs are unreliable because they are edited, because cropping selects and excludes, and selection is an interpretive act.',
    ],
    correctIndex: 0,
    explanation:
      'The class’s own conclusion is the answer: nothing was invented, yet the crop changed the meaning, which shows that photographs carry editorial choices and are not neutral records. Option two denies the demonstrated effect. Option three confuses the issue: captions matter, but the effect appeared before any caption was added. Option four makes the common error of treating editing as falsehood. The two positions are compatible: a photograph is evidence, and it is also evidence that someone framed something.',
    rationale: 'Reading the choice of framing and cropping as evidence that photographs are not neutral.',
    source: 'Media and information literacy; Philippine media and image studies',
  },
  {
    id: 'wld-019',
    subjectId: 'gened',
    topicId: 'gened-contemporary-world',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A class is assigned to argue one side of whether a proposed development
      project should proceed near their town. The teacher insists that each
      side must do two things: state the arguments it accepts are genuinely
      strong, and then say plainly what evidence would change its mind. A
      student on the side against the project objects that this weakens their
      argument, since naming the strength of the opposing case gives the other
      side material to use. The teacher replies that an argument which cannot
      survive a fair statement of the best case against it is not strong enough
      to decide anything, and that anticipating counter-arguments is what makes
      a case testable.
    `),
    prompt: 'Which of the following does the teacher require of the students?',
    options: [
      'The teacher requires intellectual honesty, because each side must state the strongest opposing argument and the evidence that would change its own mind.',
      'The teacher requires intellectual honesty, because each side must avoid naming any argument that weakens its own position.',
      'The teacher requires persuasion, because each side must state the strongest opposing argument and the evidence that would change its own mind.',
      'The teacher requires neutrality, because each side must state the strongest opposing argument and the evidence that would change its own mind.',
    ],
    correctIndex: 0,
    explanation:
      'Intellectual honesty means not concealing the strongest case against your own view and being willing to say what evidence would change it. Avoiding the opposing argument is the opposite of honesty, since it hides information the reader needs. Persuasion aims at winning, whereas the teacher is making the arguments checkable. Neutrality would mean withholding the side one is assigned, but the class is arguing a side and the teacher wants that side made sturdy rather than softened.',
    rationale: 'Naming intellectual honesty as the demand to state the strongest opposing case and falsifying conditions.',
    source: 'Critical thinking; argumentation and intellectual honesty',
  },
  {
    id: 'wld-020',
    subjectId: 'gened',
    topicId: 'gened-contemporary-world',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A coastal town loses a large share of its income from fishing after the
      fish stock collapses. The town council must decide what to do with the
      remaining budget. One plan pays each fishing family a monthly allowance.
      Another funds a retraining programme that teaches ex-fisherfolk to repair
      boat engines and solar panels, at which the town already has a shortage of
      workers. A third funds a festival to attract tourists. The students argue
      about which is most humane and which is most realistic, and the teacher
      asks them to consider which plan changes the underlying condition and
      which only relieves its symptoms for a time.
    `),
    prompt: 'Which plan addresses the underlying cause of the town’s economic distress?',
    options: [
      'The plan that answers the question is the retraining programme, because it builds the local skill base and moves workers into a sector with a genuine labour shortage.',
      'The plan that answers the question is the monthly allowance, because it relieves hardship now without touching the depleted stock or the skills base.',
      'The plan that answers the question is the tourism festival, because it brings income in while leaving the town just as dependent on the fish stock.',
      'The plan that answers the question is none of the three, because each of them only puts some money into the local economy.',
    ],
    correctIndex: 0,
    explanation:
      'The test is whether the plan changes the condition that produced the distress or merely compensates for it. Retraining is the plan that changes it: it alters what the labour force is able to do and it meets a shortage that already exists. An allowance relieves the symptom without touching the depleted stock or the skills base, and a festival is a short-term injection that leaves the town just as dependent as before. Retraining is also slower and dearer in the short run, which is exactly why the class finds it contested.',
    rationale: 'Distinguishing a plan that changes a structural condition from ones that only compensate for it.',
    source: 'Sustainable development; human capital and structural adjustment',
  },
  {
    id: 'wld-021',
    subjectId: 'gened',
    topicId: 'gened-contemporary-world',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is explaining the difference between two kinds of civic
      participation. She describes one as the ordinary work of voting in an
      election and signing a petition, carried out by people who already have the
      resources to do so. She describes the other as the work of organising
      neighbours who are not usually heard in public meetings, going to their
      barangay assembly and speaking there so that their concerns are recorded
      in the minutes. Her students are not satisfied by this description and
      ask which of the two the government should actually prefer.
    `),
    prompt: 'How would the teacher best explain the difference the students are asking about?',
    options: [
      'Conventional political participation uses established channels and is open to all who can use them, while non-conventional participation bypasses those channels and can include people who cannot use them.',
      'Conventional political participation bypasses official channels and is open to all who can use them, while non-conventional participation uses established channels and can include people who cannot use them.',
      'Conventional political participation refers to helping other people organise, while non-conventional participation refers to voting in an official election.',
      'Conventional political participation refers to work done inside government, while non-conventional participation refers to work done outside it entirely.',
    ],
    correctIndex: 0,
    explanation:
      'The conventional/non-conventional distinction is about the channel used: conventional participation works through established institutions such as elections, petitions and assemblies, while non-conventional participation works outside them through protest, community organising and similar means. Option two reverses the labels. Option three confuses civic participation with community organising as though they were separate activities, when organising neighbours is precisely one of the non-conventional forms. Option four wrongly places voting outside government, when elections are government business.',
    rationale: 'Defining conventional and non-conventional participation by the channel used, not by the activity.',
    source: 'Political science concepts in The Contemporary World syllabus',
  },
  {
    id: 'wld-022',
    subjectId: 'gened',
    topicId: 'gened-contemporary-world',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student group decides to act on a local waste problem and, wanting results
      quickly, promotes an app that lets residents report overflowing bins and
      posts it widely on social media. Traffic rises. After four months the app
      has thousands of installs and the bins are still overflowing, because the
      app recorded complaints without ever pressing the city to schedule the
      trucks. A member of the group observes that the project succeeded at
      raising awareness and failed at producing change, and asks the group to
      read the United Nations Sustainable Development Goals to see whether it
      had addressed the kind of problem it thought it was addressing.
    `),
    prompt: 'What does the group’s experience show about its approach to civic action?',
    options: [
      'The group confused awareness with capacity, because documenting a problem through an app is not the same as building the institutional means to solve it.',
      'The group confused awareness with capacity, because it should have avoided any technology in order to keep the project genuinely participatory.',
      'The group confused participation with publicity, because documenting a problem through an app is not the same as building the institutional means to solve it.',
      'The group confused participation with indifference, because documenting a problem through an app is not the same as building the institutional means to solve it.',
    ],
    correctIndex: 0,
    explanation:
      'The gap is between naming a problem and being able to act on it: an app produces data and attention, while a solved waste problem needs schedules, budgets, personnel and political will, none of which the group built. Blaming technology in general is not what the account shows, and open tools are often genuinely useful for participation. Framing it as publicity understates the case, since the group did try to act. Framing it as indifference is simply inconsistent with the effort described.',
    rationale: 'Analysing why sustained civic action needs institutional capacity, not only public attention.',
    source: 'UN Sustainable Development Goals (2015); civic action and collective efficacy',
  },
  {
    id: 'wld-023',
    subjectId: 'gened',
    topicId: 'gened-history',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher shows her class a photograph of a cooking pot of excavated
      sherds and a drawing of a boat with a high prow found in the same
      archaeological layer. She explains that these came out of the ground at a
      site where the artefacts were deposited long before any written record of
      the people who made them exists. She asks the class what such finds can
      and cannot tell us. The class concludes that they can show how people
      lived, what they made and what they traded, but that the reasons people
      gave for what they did are not recoverable from sherds.
    `),
    prompt: 'What does this archaeological evidence allow a historian to reconstruct?',
    options: [
      'It allows a reconstruction of everyday life and material culture, since artefacts record what people made, used and traded.',
      'It allows a reconstruction of the beliefs and motives of the people who made the artefacts, since artefacts record what people made, used and traded.',
      'It allows a reconstruction of the exact words the people spoke, since artefacts record what people made, used and traded.',
      'It allows a reconstruction of the political institutions of the community, since artefacts record what people made, used and traded.',
    ],
    correctIndex: 0,
    explanation:
      'Archaeological evidence is strong on material culture: tools, pottery, burials, plant remains and trade goods show how people lived. Beliefs, motives, spoken language and political structures leave no direct trace, so an archaeologist infers rather than reads them, and must say so. Conflating what people made with why they made it is the standard error; the vignette itself draws the line between material evidence and motive.',
    rationale: 'Reading archaeological finds as evidence of material life rather than of belief or political structure.',
    source: 'Philippine prehistory; archaeology and material culture',
  },
  {
    id: 'wld-024',
    subjectId: 'gened',
    topicId: 'gened-history',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is explaining how the people of the archipelago came to be
      there. She tells her class that a language family now spoken across the
      islands, from the Batanes in the north to the Sulu archipelago in the
      south, shares vocabulary and grammatical patterns that bear no
      resemblance to the languages of their neighbours on the Asian mainland. She
      explains that the migration was gradual, over many generations, and that
      the migrants carried with them the boat-building skills, the rice-growing
      knowledge and the religious practices that the Negrito communities they
      encountered already had.
    `),
    prompt: 'What does the linguistic pattern described in the vignette indicate?',
    options: [
      'It indicates a migration from the Austronesian-speaking regions of Southeast Asia, brought by a seafaring people who absorbed what was already here.',
      'It indicates a migration from the Negrito hunter-gatherers of the islands, who later spread outward across the rest of the archipelago.',
      'It indicates a migration from the Spanish provinces, since the shared vocabulary originated among the colonisers who settled the north.',
      'It indicates a migration from the United States, since the shared vocabulary dates from the twentieth-century occupation of the islands.',
    ],
    correctIndex: 0,
    explanation:
      'The distribution of an Austronesian language family across the islands, together with the arrival of associated skills such as boat-building and rice cultivation, points to migration from the Austronesian-speaking regions of Southeast Asia. The Negrito peoples were earlier inhabitants whose distinct languages survive in pockets, so they are not the source of the widespread family. Spanish and American arrivals are historically documented and are not reflected in precolonial language patterns. The gradual absorption of existing communities is the accepted reading.',
    rationale: 'Inferring Austronesian migration in the archipelago from the spread of a language family.',
    source: 'Philippine prehistory and the Austronesian migration',
  },
  {
    id: 'wld-025',
    subjectId: 'gened',
    topicId: 'gened-history',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student is shown the opening page of a printed book in Spanish that
      describes the social order of a Filipino town before the arrival of
      Spanish authorities. The book names three groups: a local ruler, a
      hereditary class from which the ruler drew his officials, and a large
      third group of farmers, fishers and artisans who paid tribute to the ruler
      in labour or goods and could not enter the hereditary class. The teacher
      asks the class to name the arrangement. The students note that the
      structure has a ruler at the top and an entire class excluded from
      promotion, and that it operated before colonial government was imposed.
    `),
    prompt: 'Which social arrangement does the source describe?',
    options: [
      'It describes the pre-colonial barangay system, in which a local ruler led a community divided into a hereditary elite and a common class.',
      'It describes the encomienda system, in which a local ruler led a community divided into a hereditary elite and a common class.',
      'It describes the hacienda system, in which a local ruler led a community divided into a hereditary elite and a common class.',
      'It describes the uisaje, in which a local ruler led a community divided into a hereditary elite and a common class.',
    ],
    correctIndex: 0,
    explanation:
      'The barangay, with a datu or ruler at its head, a hereditary elite such as the maharlika class, and a larger common population owing tribute in labour or goods, is the pre-colonial social arrangement. The encomienda was a Spanish colonial arrangement involving tribute and forced labour, not a pre-colonial structure. The hacienda was a Spanish agricultural estate employing workers. The term "uisaje" is not a recognised name for any of these, so it fails as a label.',
    rationale: 'Identifying the pre-colonial barangay structure and rejecting later colonial arrangements as labels.',
    source: 'Pre-colonial Philippine social structure; barangay and datus',
  },
  {
    id: 'wld-026',
    subjectId: 'gened',
    topicId: 'gened-history',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher shows her class a document from the Spanish period that ordered
      the public performance of a particular religious procession at a stated
      time and prescribed penalties for failing to attend. A student asks why the
      colonial government wanted this. The teacher explains that the government
      relied on the Church for everything from baptisms to marriage records and
      schooling, and that the procession was therefore a convenient way to
      gather people under Church authority while appearing voluntary. Another
      student observes that the penalty clause suggests attendance was not in
      fact voluntary.
    `),
    prompt: 'Why did the Spanish colonial government strengthen the role of the Church?',
    options: [
      'It relied on the Church as the only institution with a presence in every settlement, handling religion, education, marriage and the census.',
      'It relied on the Church as the only institution with a presence in every settlement, handling trade, taxation and the regulation of exports.',
      'It relied on the Church as the only institution with a presence in every settlement, handling the construction of roads and the distribution of land.',
      'It relied on the Church as the only institution with a presence in every settlement, handling the training of soldiers and the defence of the coast.',
    ],
    correctIndex: 0,
    explanation:
      'The Church was the colonial government’s instrument everywhere: it baptised, recorded marriages, kept parish registers that served as the census, and ran schools. That made the governor and the parish priest partners in rule, which is what the procession order illustrates. Trade, taxation and exports were state functions, not Church ones. Roads and land distribution were also colonial administrative matters. Training soldiers and coastal defence were explicitly kept away from the friars for fear of a rival power base.',
    rationale: 'Explaining the Church–State partnership through the Church’s civil as well as religious functions.',
    source: 'Spanish colonial rule; Philippine colonial history',
  },
  {
    id: 'wld-027',
    subjectId: 'gened',
    topicId: 'gened-history',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher introduces a reform movement of the 1880s whose members were
      educated Filipino men, many of them graduates of Spanish universities.
      Their ideas first appeared in a newspaper printed in Spain, and they wrote
      in Spanish while their readers spoke Filipino at home. They demanded an
      immediate overhaul of the colonial system, argued that Filipinos were
      being denied the very freedoms the Spanish themselves valued, and used
      printing, public assemblies and letters rather than arms. The teacher notes
      that the movement’s name comes from its newspaper, and asks the class to
      describe what kind of change the members were asking for.
    `),
    prompt: 'What kind of change did the members of this movement seek?',
    options: [
      'They sought reform of the colonial system through printing and persuasion, arguing that Filipinos were entitled to the freedoms Spain itself professed.',
      'They sought reform of the colonial system through armed revolt, arguing that Filipinos were entitled to the freedoms Spain itself professed.',
      'They sought the removal of Filipino participation in government, arguing that Filipinos were entitled to the freedoms Spain itself professed.',
      'They sought the restoration of pre-colonial titles and privileges, arguing that Filipinos were entitled to the freedoms Spain itself professed.',
    ],
    correctIndex: 0,
    explanation:
      'The Propaganda Movement used the printed word and argument rather than arms, and its central claim was consistency: Spain professed liberal values and denied them to its own colony. Its newspaper, La Solidaridad, gives the movement its name, and Rizal contributed to it under the pen name Laong Laan. Armed revolt belongs to the Revolution that followed in 1896, not to the 1880s reformers. Neither withdrawing participation nor restoring pre-colonial titles was on the programme.',
    rationale: 'Identifying reform through persuasion as the aim of the Propaganda Movement.',
    source: 'La Solidaridad and the Propaganda Movement; Philippine colonial history',
  },
  {
    id: 'wld-028',
    subjectId: 'gened',
    topicId: 'gened-history',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A class is shown two descriptions of the same 1896 outbreak. The first
      calls it a rebellion of frustrated ilustrados against a colonial power that
      had ignored reform. The second calls it a revolution of the masses, in
      which ordinary Filipinos supplied the soldiers and the leaders came largely
      from the towns. The teacher asks the class which description fits the
      evidence better, and the students observe that the leaders were indeed
      educated reform-era Filipinos while the fighting force was overwhelmingly
      rural. They conclude that both elements are present and that neither
      description alone accounts for what happened.
    `),
    prompt: 'What is the best interpretation of the 1896 Philippine Revolution?',
    options: [
      'It was a revolution led by ilustrado reformers whose programme was taken up by a mass base, so both accounts describe real aspects of it.',
      'It was a revolution led by ilustrado reformers whose programme was taken up by a mass base, so only the second account is accurate.',
      'It was a revolution led by ilustrado reformers whose programme was taken up by a mass base, so only the first account is accurate.',
      'It was a revolution led by ilustrado reformers whose programme was taken up by a mass base, so neither account is supported by the evidence.',
    ],
    correctIndex: 0,
    explanation:
      'The Revolution joined an educated leadership drawn from the reform movement to a mass of ordinary Filipinos who supplied the rank and file, which is exactly what the two descriptions each capture. Declaring only the second account accurate ignores the leadership, and only the first ignores the scale of popular participation. Saying neither is supported contradicts the evidence the class has just weighed. The point of the exercise is that a period-defining event can have both a reformist programme and a social revolution in one.',
    rationale: 'Holding both the ilustrado leadership and the mass base of the 1896 Revolution together.',
    source: 'The Philippine Revolution, 1896; Philippine history textbooks',
  },
  {
    id: 'wld-029',
    subjectId: 'gened',
    topicId: 'gened-history',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher shows her class the text of a provision that said the United
      States would, for a payment of twenty million dollars, take possession of
      the islands and pay for damages that might be inflicted upon the United
      States by the cession. The document was signed in December 1898. Students
      notice that the provision speaks of the United States receiving the islands
      and paying for them, and ask whether the Filipino people were party to it.
      The teacher explains the historical context: a Philippine republic had been
      proclaimed the previous year, and American forces had already taken
      Manila in the course of the fighting against Spain.
    `),
    prompt: 'What does the text of this provision show about the status of the Filipino people?',
    options: [
      'It shows that the cession was negotiated between two foreign powers, with the Filipino people and their republic absent from the transaction.',
      'It shows that the cession was negotiated by the Filipino people acting through their own republic, with the two foreign powers present at their request.',
      'It shows that the cession transferred the islands to a new colonial power, with the Filipino people consulted before the terms were fixed.',
      'It shows that thecession restored sovereignty to the Filipino people, with the two foreign powers acting only as temporary administrators.',
    ],
    correctIndex: 0,
    explanation:
      'The Treaty of Paris of December 1898 ceded the islands from Spain to the United States without the participation of Emilio Aguinaldo’s Philippine republic, which had been proclaimed in 1898 and which American forces had already displaced from Manila. The wording shows the two powers treating the islands as a transferable possession between themselves. Claiming Filipino participation or consultation misreads the document, and the treaty did the opposite of restoring sovereignty: it exchanged one colonial power for another.',
    rationale: 'Reading the Treaty of Paris as a transfer between foreign powers to which Filipinos were not party.',
    source: 'Treaty of Paris, December 1898; Philippine-American War',
  },
  {
    id: 'wld-030',
    subjectId: 'gened',
    topicId: 'gened-history',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is describing a legal instrument that set out a ten-year
      transition, in which the United States would govern while a Philippine
      legislature exercised limited authority, after which the Philippines could
      become fully independent if certain conditions were met, or otherwise be
      left under American sovereignty. It was ratified by the Philippine people in
      a public plebiscite in July 1934 and is remembered chiefly because its
      provision for what would happen if independence did not come allowed the
      United States to keep Philippine military bases.
    `),
    prompt: 'Which instrument is the teacher describing?',
    options: [
      'The teacher is describing the Tydings-McDuffie Act, which set a ten-year transition and provided for American military bases if independence failed.',
      'The teacher is describing the Jones Law, which set a ten-year transition and provided for American military bases if independence failed.',
      'The teacher is describing the Philippine Independence Act, which set a ten-year transition and provided for American military bases if independence failed.',
      'The teacher is describing the Malolos Constitution, which set a ten-year transition and provided for American military bases if independence failed.',
    ],
    correctIndex: 0,
    explanation:
      'The Tydings-McDuffie Act of 1934 established a ten-year Commonwealth transition under a US president-general, required a plebiscite on independence, and provided for the retention of US military bases in the Philippines if independence was not achieved. The Jones Law of 1902 was the earlier Philippine Organic Act, which merely set a ceiling on the number of US military bases. The Philippine Independence Act of 1934 gave immediate independence and did not contain a transition. The Malolos Constitution of 1899 concerned the First Republic.',
    rationale: 'Identifying the Tydings-McDuffie Act from its transition period and base-retention clause.',
    source: 'Tydings-McDuffie Act, 1934; Commonwealth period',
  },
  {
    id: 'wld-031',
    subjectId: 'gened',
    topicId: 'gened-history',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A class is shown the first page of a school history textbook. Its opening
      sentence reads that in December 1941 the occupation of the Philippines
      began and lasted for nearly four years, ending when the local resistance
      and the United States forces liberated the islands, after which
      independence was declared on 4 July 1946. The teacher circles the
      sentence and asks the class why this account of a war of invasion is
      unusually flat. A student answers that nothing in the sentence names
      anyone who decided the invasion or fought the liberation, and that the
      people who lived through it do not appear as agents at all.
    `),
    prompt: 'What is the chief weakness of the textbook sentence as history?',
    options: [
      'The weakness of the sentence as history is that it omits agency and cause, since the people who decided the invasion and fought the liberation do not appear.',
      'The weakness of the sentence as history is not that it is inaccurate, since the dates it gives are correct and the resistance is named.',
      'The weakness of the sentence as history is not that it exaggerates, since the sentence gives the resistance no more credit than the sources allow.',
      'The weakness of the sentence as history is not that it confuses periods, since the sentence keeps the occupation and the war properly apart.',
    ],
    correctIndex: 0,
    explanation:
      'A sentence that names no agent and no cause can state the sequence correctly while conveying nothing about why the occupation happened or how it ended, which is what the class objects to. Nothing in the account is inaccurate, exaggerated or confused about the sequence, so those readings fail. The dates, the existence of a resistance, and independence on 4 July 1946 are all right; the problem is that accuracy of chronology is not the same as history, since history is about what people did and why.',
    rationale: 'Identifying the loss of agency and cause in an accurate but agentless textbook account.',
    source: 'Japanese occupation of the Philippines, 1941-1945; historical method',
  },
  {
    id: 'wld-032',
    subjectId: 'gened',
    topicId: 'gened-history',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is teaching about the period between the war and the restoration
      of democracy. She shows a photograph of a crowd filling a street with
      placards in English calling for the ouster of the president, and she names
      the martial law era in which the constitution had been suspended, the
      legislature dissolved and opposition leaders detained. She then shows a
      photograph of military officers standing on a barricade, names the
      August 1986 revolution, and asks her class what the two photographs have in
      common beyond being dated photographs of crowds and soldiers.
    `),
    prompt: 'What connects the two events shown in the photographs?',
    options: [
      'Both were acts of popular mobilisation against a government that had curtailed constitutional rights, one under dictatorship and one under an administration accused of corruption.',
      'Both were acts of popular mobilisation against a government that had curtailed constitutional rights, one under dictatorship and one under a military dictatorship.',
      'Both were acts of popular mobilisation against a government that had curtailed constitutional rights, one under a foreign occupation and one under a colonial power.',
      'Both were acts of popular mobilisation against a government that had curtailed constitutional rights, one under dictatorship and one under a communist government.',
    ],
    correctIndex: 0,
    explanation:
      'The martial law era and the 1986 revolution share a cause: constitutional government had been suspended and opposition suppressed, and both events are remembered as the Filipino people reclaiming it through organised public action. Calling the post-EDSA government a military dictatorship is inaccurate, since the Aquino administration took office through the 1986 elections and is not treated as a dictatorship. Neither involved a foreign occupation or a colonial power. A communist government is not what was opposed in 1986 either.',
    rationale: 'Linking the martial law era and the 1986 revolution through the suppression of constitutional rights.',
    source: 'Martial Law and the 1986 EDSA revolution; Philippine history textbooks',
  },
  {
    id: 'wld-033',
    subjectId: 'gened',
    topicId: 'gened-history',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher hands her class a printed newspaper clipping dated 1904 and asks
      them to classify it. It reports a military campaign and quotes statements
      by officers and officials of the time, and it was printed within months of
      the events it describes. She then hands them a book published in 1980
      that draws on army records, casualty lists and the writer’s own
      recollection, and asks for a classification of that as well. Students are
      asked to notice that both are evidence and that they are not the same kind
      of evidence, and the teacher points out that the later book also contains
      the older documents and that a later account can be checked against the
      record it cites.
    `),
    prompt: 'What is the difference between the two sources?',
    options: [
      'The first is a primary source created at the time by witnesses, while the second is a secondary account that interprets and reuses such records.',
      'The first is a primary source created at the time by witnesses, while the second is a secondary account that ignores such records in favour of opinion.',
      'The first is a primary source created at the time by witnesses, while the second is a primary source because it quotes documents of the time.',
      'The first is a secondary account written later, while the second is a primary source created at the time by witnesses.',
    ],
    correctIndex: 0,
    explanation:
      'The primary and secondary distinction turns on when a source was created and on the creator’s relationship to the events. The 1904 clipping was made at the time by people close to the events; the 1980 book interprets those events by drawing on records. Quoting documents does not make a work primary, because the class was created after the fact; and the later work can be assessed by checking it against the records it cites, which is a main reason for keeping primary sources. Option four reverses the two, which is the most common error.',
    rationale: 'Classifying a contemporaneous newspaper and a later book as primary and secondary sources respectively.',
    source: 'Historical method: primary and secondary sources; Philippine history',
  },
  {
    id: 'wld-034',
    subjectId: 'gened',
    topicId: 'gened-rizal',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher shows her class a portrait photograph of a young man taken in
      Europe in the 1880s. She explains that the sitter left the Philippines for
      Europe at nineteen, studied there for several years at his own expense,
      and returned briefly before leaving again. She asks the class what he did
      with the education he acquired, and the students observe that he did not
      take a government post or a teaching position but published novels and
      articles instead, using them to expose abuses in the colony. One student
      asks whether that makes him a rebel, and the teacher asks the class to
      decide on the evidence rather than on the label.
    `),
    prompt: 'How should the class characterise Rizal’s method of reform?',
    options: [
      'He used the pen rather than the sword, exposing abuses in writing and appealing to public opinion in Spain.',
      'He used the pen rather than the sword, exposing abuses by organising armed resistance in the provinces.',
      'He used the pen rather than the sword, exposing abuses by serving in the Spanish colonial administration.',
      'He used the pen rather than the sword, exposing abuses by petitioning the Spanish crown alone, without printing.',
    ],
    correctIndex: 0,
    explanation:
      'Rizal wrote. He did not organise an armed movement, and he did not enter the colonial administration, though he served in Spanish municipalities as a town official at times. His strategy was publication and publicity aimed at Spain itself, in the belief that abuses would stop if they became known to Spanish opinion. Printing was central, not incidental, which is why the fourth option is wrong despite being a method he also used. The slogan about the pen and the sword was his own summary of this position.',
    rationale: 'Characterising Rizal’s reform as literary and public rather than armed or administrative.',
    source: 'Jose Rizal, life and works; Philippine history textbooks',
  },
  {
    id: 'wld-035',
    subjectId: 'gened',
    topicId: 'gened-rizal',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher describes a novel published in Berlin in 1887 with the
      financial help of a friend who had travelled to Europe partly to check
      on the author’s health. She explains that the book opens with a procession
      of Sopor Agetis in a town called San Diego, and that the characters
      connected with that religious corporation are the book’s main targets. A
      student asks why the novel spends so much of its opening on church
      processions and parish life rather than on politics. The teacher explains
      that the novel’s title itself names what it means to wake up, and that
      everything else in the book is built on that theme.
    `),
    prompt: 'What is the central theme of the 1887 novel?',
    options: [
      'The novel attacks the abuses of the colonial friar, exposing how the religious corporation used its power over Philippine society.',
      'The novel attacks the abuses of the colonial friar, exposing how the colonial government mismanaged the collection of taxes.',
      'The novel attacks the abuses of the colonial friar, exposing how the secular courts denied Filipinos a fair trial.',
      'The novel attacks the abuses of the colonial friar, exposing how the town council failed to maintain the roads and bridges.',
    ],
    correctIndex: 0,
    explanation:
      'Noli Me Tangere, published in Berlin in 1887, attacks the friar: Elias, Padre Camorra and the Sopor Agetis corporation are its targets, and the procession that opens the book belongs to that corporation. Taxation, the secular courts and municipal infrastructure are all criticised elsewhere in Philippine writing but are not the book’s organising subject. The title means "that which should be awakened," and the friar is what has to be woken up to, since his power had dulled Filipino awareness.',
    rationale: 'Identifying the friar as the subject of Noli Me Tangere from its opening procession.',
    source: 'Jose Rizal, Noli Me Tangere (1887), opening chapter and title',
  },
  {
    id: 'wld-036',
    subjectId: 'gened',
    topicId: 'gened-rizal',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher introduces the second of Rizal’s novels, published in Ghent in
      1891. She explains that it is darker and more openly political than the
      first, that its title is Italian, and that it was dedicated to the memory
      of three priests executed by the state in 1872 after the mutiny of workers
      at a Manila tobacco factory. She reads out the dedication and asks the
      class what it commits the book to remembering. A student answers that the
      novel takes the side of those executed by the colonial government and
      holds the state responsible.
    `),
    prompt: 'What does the dedication of this second novel commit it to?',
    options: [
      'It commits the novel to remembering those killed by the colonial state and holding that state accountable.',
      'It commits the novel to remembering those killed by a religious order and holding that order accountable.',
      'It commits the novel to remembering the leaders of the 1887 Propaganda Movement and honouring their propaganda work.',
      'It commits the novel to remembering the tobacco workers who mutinied and celebrating their victory over the factory.',
    ],
    correctIndex: 0,
    explanation:
      'The dedication to the Gomburza, the three priests hanged in 1872 after the Cavite mutiny, casts the novel against the colonial government that executed them, and gives it its Italian title: the light that must be extinguished once and for all. The second option misdirects blame to a religious order, when the Gomburza were killed by state authorities on the stated charge of association with the mutiny. The third confuses the Propaganda Movement, which is the context of the 1880s rather than the dedication. The fourth misreads the dedication as a victory, when the mutiny was crushed and its leaders executed.',
    rationale: 'Reading the Gomburza dedication of El Filibusterismo as placing the colonial state on trial.',
    source: 'Jose Rizal, El Filibusterismo (1891), dedication to the Gomburza',
  },
  {
    id: 'wld-037',
    subjectId: 'gened',
    topicId: 'gened-rizal',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher is asked by her class why two novels by the same author are taught
      separately rather than as one unit. She puts two rows on the board. In the
      first row she writes that the earlier novel is lighter in tone, is built
      around a woman’s moral awakening, and treats the friar as its chief
      target. In the second she writes that the later novel is darker, carries a
      call to action, and takes up corruption, the secular power and the
      revolutionaries’ own flaws. She notes that the two books share many
      characters, that events in the second follow on from the first, and that
      some readers treat them as a two-volume work. Her students are asked to
      describe what distinguishes them.
    `),
    prompt: 'How do the two novels differ?',
    options: [
      'The first is a lighter novel of awakening centred on a woman, while the second is a darker call to action that also indicts the revolutionaries.',
      'The first is a lighter novel of awakening centred on a woman, while the second is a darker call to action that merely repeats its attacks.',
      'The first is a lighter novel of awakening centred on a man, while the second is a darker call to action that also indicts the revolutionaries.',
      'The first is a lighter novel of awakening centred on a woman, while the second is a history text with no fictional characters at all.',
    ],
    correctIndex: 0,
    explanation:
      'Noli Me Tangere follows Marina Dizon’s awakening and indicts the friar; El Filibusterismo is more openly political, calls for action, and indicts corruption in the secular government while also showing how the revolutionaries failed through their own weaknesses. Saying it merely repeats the attacks misses the change in purpose and the self-criticism. Making the first novel centre on a man misstates the story it tells. Calling the second a history text is wrong: it is a novel, and its characters and plots continue from the first.',
    rationale: 'Contrasting the two novels by tone, central figure and purpose, including the second novel’s self-indictment.',
    source: 'Jose Rizal, Noli Me Tangere (1887) and El Filibusterismo (1891)',
  },
  {
    id: 'wld-038',
    subjectId: 'gened',
    topicId: 'gened-rizal',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher explains that while Rizal was in Madrid in 1889 he was asked to
      write something for a Spanish-language periodical that appeared in Madrid,
      and that instead of a conventional article he sent a piece built around
      a fictional observer visiting the Philippines. He added a second part,
      which is a direct response to critics who had attacked his account. The
      teacher asks the class what the second part is called and why an author
      would add it to the same publication. A student observes that the second
      part answers attacks on the first, so readers who doubted it could see the
      reply in the same place.
    `),
    prompt: 'What is the second part of this work, and what does it do?',
    options: [
      'It is the “Vision over the Simunul,” and it answers critics of the first part who doubted his account.',
      'It is the “Vision over the Simunul,” and it introduces a brand new subject matter the first part had not covered.',
      'It is a reply to critics of the first part who had already accepted his account entirely.',
      'It is a reply to critics of the first part which withdrew from publication every claim made in that part.',
    ],
    correctIndex: 0,
    explanation:
      'The annotated Spanish periodical piece published in Madrid in 1889 is known as the annotations of El Tiempo, and its second part, the "Vision over the Simunul," is Rizal’s answer to the critics of the first part. Its purpose is argumentative, not thematic: it defends the claims readers had rejected. Option two mistakes a rebuttal for new subject matter. Option three inverts the situation, since there were critics to answer precisely because the account was contested. Option four overstates the reply into a withdrawal, which would leave the annotations pointless.',
    rationale: 'Identifying the Vision over the Simunul as the rebuttal section of the annotations of El Tiempo.',
    source: 'Jose Rizal, annotations of El Tiempo, Madrid, 1889',
  },
  {
    id: 'wld-039',
    subjectId: 'gened',
    topicId: 'gened-rizal',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher gives her class a short reading from a novel whose hero returns
      to his home town after years abroad. On his way he is seized without trial
      and taken to a prison under the fortress where he had previously been
      confined, and the officers tell him that his crime is that he writes, and
      that the authorities will not tolerate it. The novel ends with his
      execution. The teacher asks the class to name the work and to say why its
      hero had been sentenced to the fortress in the first place, which the
      novel also explains.
    `),
    prompt: 'Which work is the teacher describing, and why was its hero in prison?',
    options: [
      'It is Noli Me Tangere, and the hero was jailed because he kept a lighted lamp in his window, which authorities treated as insolence.',
      'It is Noli Me Tangere, and the hero was jailed because he worked as the town\u2019s public prosecutor.',
      'It is Noli Me Tangere, and the hero was jailed because he attended the Sopor Agetis procession out of protest.',
      'It is Noli Me Tangere, and the hero was jailed because he published articles in a newspaper in Madrid.',
    ],
    correctIndex: 0,
    explanation:
      'The hero is Ibarra, confined for keeping a lighted lamp in his window, which colonial authorities read as insolence; he is later wrongly implicated in the uprising and executed, which is the novel’s climax. He never held the post of public prosecutor. The Sopor Agetis procession is a scene, not the occasion of his arrest, and he attends it calmly rather than in protest. The Madrid articles belong to Rizal’s own life, and in the novel the authorities forbid his writing, so he cannot have been jailed for publishing there.',
    rationale: 'Naming Noli Me Tangere and the lamp in the window as the cause of Ibarra’s imprisonment.',
    source: 'Jose Rizal, Noli Me Tangere (1887), chapters on Ibarra’s confinement',
  },
  {
    id: 'wld-040',
    subjectId: 'gened',
    topicId: 'gened-rizal',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher shows her class two pieces of Rizal’s writing in German, which he
      took up while in Germany, and a short poem he published in English in
      London during the same period of self-study. She points out that the German
      work is a philosophical and political essay, not a novel, and that the
      English piece is a poem. She asks the class what the range of languages
      demonstrates. A student answers that Rizal learned languages to reach
      readers and audiences that Spanish alone would not reach, and that his
      travels in Europe were years of study rather than years of pleasure.
    `),
    prompt: 'What does the range of languages and genres demonstrate?',
    options: [
      'That his European years were periods of rigorous study, directed at equipping himself to argue for reform.',
      'That his European years were periods of travel and amusement, directed at relieving himself from colonial duties.',
      'That his European years were periods of hiding from colonial authorities, directed at keeping his own writings untraceable.',
      'That his European years were periods of diplomatic service, directed at negotiating reforms directly with Madrid.',
    ],
    correctIndex: 0,
    explanation:
      'The German essays and the English poem show sustained study aimed at reaching audiences and acquiring the intellectual equipment for argument; Rizal took a doctorate in philosophy and medicine in Europe while he was at it. The travels were not chiefly for pleasure. He was not in hiding, since he published in Spain and Germany under his own name and sought publication as his purpose. Nor was he a diplomat: he held no diplomatic post, and his influence came through print and public opinion rather than negotiation.',
    rationale: 'Reading a multilingual body of work as evidence of deliberate European study for reform.',
    source: 'Rizal’s German and English writings; Philippine history textbooks',
  },
  {
    id: 'wld-041',
    subjectId: 'gened',
    topicId: 'gened-rizal',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher shows her class the last document written by a condemned man,
      composed in prison on the evening before his execution. The teacher
      explains that it was written in a cell at Fort Santiago in Manila, that it
      consists of stanzas rather than an argument, that it addresses his family,
           his fellow Filipinos and his country, and that it was found in his
      possession. The class asks what such a document is called, and whether its
      existence shows that he had come to accept the sentence. The teacher
      explains that the poem is not a confession and that it does not take back
      his novels.
    `),
    prompt: 'What is the document, and what does its writing show?',
    options: [
      'It is Mi Ultimo Adios, and its writing shows that he met death affirming what he had written.',
      'It is Mi Ultimo Adios, and its writing shows that he renounced everything he had written.',
      'It is the El Tiempo annotations, and its writing shows that he met death affirming what he had written.',
      'It is the Simunul vision, and its writing shows that he renounced everything he had written.',
    ],
    correctIndex: 0,
    explanation:
      'Mi Ultimo Adios was written in Fort Santiago on the evening of 29 December 1896, before his execution on 30 December, and it addresses his family, his country and his fellow men without withdrawing a word of the novels. The annotations of El Tiempo are the periodical pieces from Madrid in 1889, so they cannot be a last document. The "Vision over the Simunul" is likewise from the 1889 annotations, not from a prison cell. Its existence is evidence that he died owning his position rather than disowning it.',
    rationale: 'Identifying Mi Ultimo Adios and reading it as an affirmation rather than a retraction.',
    source: 'Jose Rizal, Mi Ultimo Adios, Fort Santiago, 29 December 1896',
  },
  {
    id: 'wld-042',
    subjectId: 'gened',
    topicId: 'gened-rizal',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher asks her class which people Rizal set out to influence in his
      writings. She tells them that one of them he praised as the model of a
      Spanish reformer who brought liberal ideas to the colony, and that another
      he held up as an example of a government official who refused to enrich
      himself and was punished for honesty. She also tells them that in his
      essays he attacked Spanish colonial historians for writing about the
      Philippines as a backward country, and that in his novels he painted the
      friar as the root of many of the colony’s ills. Her students are asked to
      sort these into the two kinds of figure he treats.
    `),
    prompt: 'How did Rizal’s writings treat both Spanish figures and the friars?',
    options: [
      'He praised reform-minded Spaniards who served the colony honestly, and attacked the friars and the colonial historians.',
      'He praised reform-minded Spaniards who served the colony honestly, and defended the friars and the colonial historians.',
      'He attacked reform-minded Spaniards who served the colony honestly, and attacked the friars and the colonial historians.',
      'He attacked reform-minded Spaniards who served the colony honestly, and defended the friars and the colonial historians.',
    ],
    correctIndex: 0,
    explanation:
      'Rizal distinguished the Spanish reformer from the friar. He admired men like the liberal governor general who introduced reforms and officials like Juan de la Cruz who kept clean hands, and he argued that a Spanish colony ought to have more of them. He attacked the friars for their power and for their exemption from taxation and accountability, and he attacked colonial historians for writing an apologetic, backward history of the islands. Attacking the reformers would contradict the argument of his essays, which is that Spain could rule better and should.',
    rationale: 'Sorting Rizal’s targets into the reformers he praised and the friars and historians he attacked.',
    source: 'Rizal’s essays and novels; Philippine history textbooks',
  },
  {
    id: 'wld-043',
    subjectId: 'gened',
    topicId: 'gened-rizal',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher explains that a controversy surrounded a priest with whom Rizal
      had studied and corresponded, and that Rizal later returned to that
      relationship in writing. She describes the accusation that circulated
      against the friar, which turned on a supposed insult to the Virgin Mary,
      and she explains that Rizal responded to it in his own work. She then
      explains what the teacher considers the deeper disagreement: that in the
      novels the friar stands for an institution answerable to no earthly
      authority, which she says is an argument about power and accountability as
      much as a quarrel about one man.
    `),
    prompt: 'What is the relationship between the personal quarrel and the larger argument?',
    options: [
      'The quarrel became the occasion for a structural argument about an institution answerable to no earthly authority.',
      'The quarrel became the occasion for a structural argument about the accuracy of a translation made in Madrid.',
      'The quarrel became the occasion for a structural argument about the running of a university established in Manila.',
      'The quarrel became the occasion for a structural argument about the law regulating the export of abaca fibre.',
    ],
    correctIndex: 0,
    explanation:
      'Rizal used the accusation against the priest as the vehicle for a much larger claim: that the friar, as an institution, held enormous power over ordinary Filipinos while being accountable to no earthly authority. That is the argument the novels develop, so the quarrel and the criticism are one thing rather than two. A translation dispute, university administration and export regulation are all unrelated to the controversy and to what the novels are about. The vignette’s own framing, power and accountability, points to the structural reading.',
    rationale: 'Connecting a documented personal controversy to the institutional argument about unaccountable power.',
    source: 'Rizal’s writings on the friars; Philippine history textbooks',
  },
  {
    id: 'wld-044',
    subjectId: 'gened',
    topicId: 'gened-rizal',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A teacher reads a paragraph of a statute to her class. It requires all
      Philippine schools, elementary and secondary, to teach courses on the life,
      works and writings of Rizal, with particular attention to his two novels,
      and it directs that instruction in them be given in the original languages
      they were written in whenever practicable. The teacher notes that the law
      was passed in 1956 and that another later law requires the teaching of
      Rizal’s life and works in every state university and college. She asks the
      class to state what the 1956 law is called and, more importantly, what it
      actually obliges schools to do.
    `),
    prompt: 'Which law is this, and what does it require?',
    options: [
      'It is RA 1425, the Rizal Law, and it requires all schools to teach courses on Rizal’s life, works and writings.',
      'It is RA 9259, and it requires all schools to teach courses on Rizal’s life, works and writings.',
      'It is RA 10533, and it requires all schools to teach courses on Rizal’s life, works and writings.',
      'It is RA 8439, and it requires all schools to teach courses on Rizal’s life, works and writings.',
    ],
    correctIndex: 0,
    explanation:
      'The 1956 statute is RA 1425, the Rizal Law, which directs all schools to teach courses on Rizal’s life, works and writings and to read them in the original languages where practicable. RA 9259 is a different measure entirely, so it cannot be the statute read aloud. RA 10533 is the Enhanced Basic Education Act of 2013, which restructured basic education rather than mandating a Rizal course, though it did carry the subject into the curriculum. RA 8439 concerns the modernisation of the police, so it has nothing to do with Rizal. The original-language clause is the tell that this is the Rizal Law specifically.',
    rationale: 'Identifying RA 1425 and what it obliges schools to teach, using the original-language clause as the clue.',
    source: 'Republic Act No. 1425, the Rizal Law (1956); RA 10533',
  },
];

export default BATCH_WORLD;
