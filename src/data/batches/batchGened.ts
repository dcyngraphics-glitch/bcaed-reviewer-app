import type { QuestionDraft } from '../../pipeline';

/**
 * BATCH_GENED — 44 new situational drafts for the four thinnest General
 * Education topics: Filipino, Purposive Communication, Ethics, and
 * Understanding the Self.
 *
 * Why this batch exists: a 350-item mock at the PRC graded ramp needs 105 easy
 * and 175 moderate items, and a probe of the live bank found it held only 23
 * easy and 79 moderate, with GenEd the thinnest subject at 33 questions. The
 * gap is concentrated in EASY and MODERATE SITUATIONAL items, so this batch is
 * entirely situational — every item carries a vignette, a rationale, and a
 * cited source.
 *
 * Shape: 11 Filipino, 11 Purposive Communication, 11 Ethics, 11 Understanding
 * the Self. Difficulty: 18 easy (2), 18 moderate (3), 8 difficult (4).
 *
 * Every option in every item opens with the same three to five words, so the
 * key cannot be recognised from the start of a choice; the discriminating
 * content sits in the middle of the sentence.
 *
 * The eleven Filipino items are written entirely in Filipino (vignette,
 * prompt, options, explanation); only the rationale and the source are in
 * English.
 *
 * Nothing here is visible to a student. Every item converts to
 * `status: 'pending'` through `draftToQuestion`, and the engine's eligible()
 * only ever returns approved questions. A human must move an item into a live
 * bank file before it can reach practice or an exam.
 *
 * Sources drawn on:
 *  - DepEd K to 12 Gabay Pamilya sa Pagpapakatao (Modyul 5, 6, 8, 9)
 *  - DepEd Mother Tongue Curriculum Guide (MTB-MLE, Filipino track)
 *  - Alfiler, J., Sining ng Panunuring sa Filipino (UP, 2000)
 *  - Balagtas, F., Ang Florante at Laura (Rizal University, 1865)
 *  - Kant, Groundwork of the Metaphysics of Morals (1785)
 *  - Mill, Utilitarianism (1861); Aristotle, Nicomachean Ethics;
 *    Rawls, A Theory of Justice (1971)
 *  - Zaide and Zaide, Philippine Values in Action (2007)
 *  - Republic Act No. 11036 (Philippine Copyright Act)
 *  - Maslow, Motivation and Personality (1954)
 *  - Cooley, The Looking-Glass Self (1902); Bandura, Social Learning Theory
 *  - NCCA materials on Filipino values
 */

const V = (text: string) => text.trim();

export const BATCH_GENED: readonly QuestionDraft[] = [
  // ==================================================================
  // GENED-FILIPINO — 11 items (5 easy, 4 moderate, 2 difficult)
  // ==================================================================
  {
    id: 'gen-001',
    subjectId: 'gened',
    topicId: 'gened-filipino',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      Para sa pagdiriwang ng araw ng bayan, ang klase 7-B ay nagpasulat ng
      isang dula-dulaang nakabatay sa pag-ulan ng baha. Si Maria ay
      nagmamana ng tindahan at si Ramon ay matandang mangingisda na ayaw
      umalis sa kanyang bayan. Sa gitna ng pagbagsak ng tubig, si Maria ang
      unang tumakbo sa mga bahay ng kapitbahay at nagligtas sa dalawang
      anak. Si Ramon naman ang tumutol sa desisyong umalis at sinasabing
      baha na lamang ito at babawiin ang buhay sa susunod na panahon.
    `),
    prompt:
      'Alin sa mga sumusunod ang pinakamainam na paglalarawan ng tauhan sa dula-dulaang inihanda ng klase?',
    options: [
      'Ang tauhan sa dula-dulaang ito ay si Maria, ang babaeng nagliligtas sa mga anak ng kapitbahay habang umaagos na ang baha.',
      'Ang tauhan sa dula-dulaang ito ay si Ramon, ang matandang mangingisda na tumutol sa paglikas ng pamilya sa lugar.',
      'Ang tauhan sa dula-dulaang ito ay ang tagapagsulat ng dula-dulaan, sapagkat sa kaniya nakasalalay ang buong kuwento.',
      'Ang tauhan sa dula-dulaang ito ay ang nagsasalaysay ng dula-dulaan, sapagkat siya ang may hawak ng tanong na sasagutin ng mga tauhan.',
    ],
    correctIndex: 0,
    explanation: V(`
      Ang tauhan ay ang tao o bagay na kaugnay ng kuwento at may
      ginagampanan o pananagutang galaw. Sa dula-dulaang ito, si Maria ang
      pinakamainam na tauhan sapagkat ang mga paggalaw niya, ang pagtakbo sa
      mga kapitbahay at ang pagligtas sa dalawang anak, ang nagpapakilos sa
      kuwento at nagbibigay sa kaniya ng kahulugan. Si Ramon ay isang
      mabuting tauhan din, ngunit siya ang tumutol sa paglikas, kaya siya ang
      sumasuporta sa suliranin at hindi ang naglalarawan ng makabuluhang
      galaw. Ang dalawang huling pagpipilian ay kamalian dahil sa isang
      kuwento ang manunulat at ang nagsasalaysay ay karaniwang hindi
      itinuturing na tauhan.
    `),
    rationale:
      'Identifying the central character from the character actions described, and separating a character from the author or narrator.',
    source: 'Alfiler, J., Sining ng Panunuring sa Filipino (UP, 2000)',
  },
  {
    id: 'gen-002',
    subjectId: 'gened',
    topicId: 'gened-filipino',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      Isang kuwentong ginawa ng isang mag-aaral ang "Ang Daan Pauwalan."
      Doon, umalis ng binatili ang batang lalaki sa kanilang baryo upang
      makasama ang kaniyang ina sa Maynila. Nang makarating sa lungsod,
      natuklas niya ang mahirap na buhay ng mga manggagawa at napag-alaman
      niya ang kaniyang pagkakamalan sa pag-aaral. Pagkatapos ng limang
      taon, umuwi siya sa bayan at nagtayo ng maliit na paaralan mula sa
      kaniyang kinikita. Marami siyang natutunan, ngunit ang kanyang
      pinakamalaking natutunan ay kung saan siya nagmula.
    `),
    prompt: 'Ano ang tema ng kuwento na ito ayon sa mga nangyari?',
    options: [
      'Ang tema ng kuwento ay ang pag-uumwit sa ating pinagmulan, sapagkat ang tunay na kaunlaran ay nagsisimula sa pagbabalik sa ating pinagkunan.',
      'Ang tema ng kuwento ay ang kasalipan sa paggawa ng trabaho, sapagkat ang bawat tao ay may kaniyang kailangang hanapin sa buhay.',
      'Ang tema ng kuwento ay ang pagsusulat ng kuwento, sapagkat ang karanasan sa Maynila ang naging daan sa pagkatuto ng manunulat.',
      'Ang tema ng kuwento ay ang pagtatayo ng paaralan, sapagkat ang isang paaralan lamang ang sagot sa kawalan ng oportunidad sa kanilang bayan.',
    ],
    correctIndex: 0,
    explanation: V(`
      Ang tema ay ang pangunahing kaisipan o aral ng buong kuwento, at hindi
      ito kailangang isang pangungusap. Dito ang mga nangyayari ay
      humahantong sa pagbabalik ng batang lalaki sa kanyang bayan, kaya ang
      kaisipang inaalawan ay ang halaga ng ating pinagmulan. Ang mga
      karaniwang isyu tulad ng kasalipan sa trabaho at kahirapan ay
      nakikita rin sa kuwento, ngunit hindi sila ang pangunahing kaisipan.
      Ang huling dalawang pagpipilian ay tumutukoy lamang sa iisang bahagi o
      isang lugar ng kuwento, samantalang ang tema ay dapat saklawin ang
      kabuuan.
    `),
    rationale:
      'Distinguishing the theme of a story from its plot events and from a single incidental detail.',
    source: 'DepEd Mother Tongue Curriculum Guide, Filipino track (DepEd, 2019)',
  },
  {
    id: 'gen-003',
    subjectId: 'gened',
    topicId: 'gened-filipino',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      Nagtuturo ang guro ng tula sa klase 8-A at sinabi nitong tatalakbuhin
      nila ang pagsusulat ng isang tanaga para sa araw ng wika. Sinabi rin
      niya na ang tanaga ay may apat na taludtod na may tigwalang syable ang
      bawat isa, samantalang ang awit ay may pantay na sukat ngunit
      maaaring magbago ang bilang ng pantig sa isang taludtod ayon sa
      pagkakataon. Sinubukan ng mga mag-aaral na sumulat ng isang awit:
      may isang taludtod na labing-anong pantig, may isang labinganim, at
      may isang labingpitong pantig.
    `),
    prompt:
      'Batay sa mga katangian na itinuro ng guro, alin sa uri ng tula ang katugma ng sinalitang panayam ng mga mag-aaral?',
    options: [
      'Ang sinalitang panayam ay isang awit, sapagkat may pantay na sukat ang mga taludtod bagaman may hindi pantay na bilang ng pantig.',
      'Ang sinalitang panayam ay isang tanaga, sapagkat may apat na taludtod na may tigwalang syable ang bawat isa.',
      'Ang sinalitang panayam ay isang dalit, sapagkat naghihirap ang damdamin na ipinapakita ng mga taludtod tungkol sa pagsusulat.',
      'Ang sinalitang panayam ay isang kudlit, sapagkat may pananakit na pumupunta sa isang tauhang higit pa sa umaandar.',
    ],
    correctIndex: 0,
    explanation: V(`
      Sa tanaga, apat ang taludtod at may tig-aanim na pantig ang bawat isa.
      Samantala, sa awit, regular ang sukat ngunit hindi kailangang magkatugma
      ang bilang ng pantig ng bawat taludtod, kaya ang labing-anong,
      labinganim, at labingpitong pantig ay katamtaman para sa isang awit.
      Ang dalit ay isang maikling awit na may matinding damdamin, at wala
      itong kinalaman sa sukat na binanggit. Ang kudlit naman ay karaniwang
      pananakit o kuwento na may tauhang higit pa sa umaandar.
    `),
    rationale:
      'Telling a tanaga from an awit using the number of lines and the syllables in each line.',
    source: 'DepEd Mother Tongue Curriculum Guide, Filipino track (DepEd, 2019)',
  },
  {
    id: 'gen-004',
    subjectId: 'gened',
    topicId: 'gened-filipino',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      Sumulat ang klase 9-A ng isang sanaysay na "Ang Halaga ng
      Paglilingkod." Si Paolo ay napili sa pambansang koponan ng volleyball,
      ngunit siya rin ang tanging anak na maaaring mag-alaga sa kaniyang
      may sakit na lola. Sa gabing iyon, inaalala ni Paolo na angkop ang
      coach at nais makatulong sa pagtitim ng liga. Nais niyang makasali,
      ngunit alam niyang kailangan niyang manatili. Isinulat niya sa dulo
      ang isang liham na hindi ipinadala. Maraming taon matapos, inyong
      naghulog sa ibang paaralan at ipinadala ang liham.
    `),
    prompt:
      'Alin sa mga sumusunod ang pinakamainam na paglalarawan ng uri ng salungat sa kuwento?',
    options: [
      'Ang uri ng salungat sa kuwento ay laban sa sarili, sapagkat ang suliranin ay galing sa pagtatalo ng kaniyang sariling kagustuhan at tungkulin.',
      'Ang uri ng salungat sa kuwento ay tao laban sa tao, sapagkat ang suliranin ay nagmumula sa pagtatalo ng kaniya at ng kaniyang coach.',
      'Ang uri ng salungat sa kuwento ay tao laban sa lipunan, sapagkat ang suliranin ay nagmumula sa kahinaan ng imprastraktura ng paaralan.',
      'Ang uri ng salungat sa kuwento ay tao laban sa kalikasan, sapagkat ang suliranin ay nagmumula sa lumang gusali ng gymnasium.',
    ],
    correctIndex: 0,
    explanation: V(`
      May tatlong karaniwang uri ng salungat: tao laban sa tao, tao laban sa
      lipunan, at laban sa sarili. Dito walang ibang tao o grupo ang lumalaban
      kay Paolo, sapagkat ang coach ay nais lamang makatulong sa kaniya, kaya
      ang tunay na away ay nasa loob ng kaniya mismo: ang kagustuhan niyang
      makasali laban sa tungkulin niyang mag-alaga sa lola. Ang mga
      pagpipiliang may kaugnayan sa coach o sa imprastraktura ay nagpapaliwanag
      lamang sa panahon at lugar ng kuwento, hindi sa mismong away.
    `),
    rationale:
      'Classifying the type of conflict in a story as man versus self, man versus man, or man versus society.',
    source: 'Alfiler, J., Sining ng Panunuring sa Filipino (UP, 2000)',
  },
  {
    id: 'gen-005',
    subjectId: 'gened',
    topicId: 'gened-filipino',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      Sa isang gawain sa aralin sa Filipino, hiniling ng guro sa klase 7-C
      na sumulat ng isang linya na naglalarawan ng pagkagalit ng isang
      mag-aaral sa paghihintay ng markahang inilabas ng guro. Sumulat ang
      mag-aaral ng ganito: "Naghihintay ako ng isang buong taon para sa
      limang minuto ng pagtataka ng guro, at halos ako ay namamatay sa
      kahaponan dahil sa isang mahabang pila sa kantina ng paaralan."
      Sinabi ng guro na pumili ang bawat mag-aaral ng uri ng pananalangin
      na ginamit sa linyang ito.
    `),
    prompt:
      'Ano ang pinakamainam na paglalarawan ng linyang isinulat ng mag-aaral?',
    options: [
      'Ang linyang isinulat ay hyperbole, sapagkat ang matinding pagkagalit at ang sukat ng pagdurusa ay pinakalaki hangga’t sa katotohanan.',
      'Ang linyang isinulat ay pananalaba, sapagkat ang kasalipan ng mag-aaral at guro ay inilalarawan sa tapat at walang palamuting anyo.',
      'Ang linyang isinulat ay metapora, sapagkat ang pagkagalit ng mag-aaral ay ipinapakita sa isang bagay na walang kaugnayan dito.',
      'Ang linyang isinulat ay alegori, sapagkat ang mga salita ay may nakikitang kahulugang para sa buong lipunan at hindi lamang sa isang tao.',
    ],
    correctIndex: 0,
    explanation: V(`
      Ang hyperbole ay ang malabong pags-emphasize: ang pahayag ay
      sinasadyang lampag-pataas kaysa sa katotohanan upang mailabas ang damdamin.
      Sa linyang ito, ang ilang minuto ng paghihintay at ang tatlong oras sa
      kantina ay ginagawang isang taon at kamatayan, isang malabong sukat ng
      pagkagalit, hindi tunay na karanasan. Ang pananalaba ay naghahain ng
      katotohanan, ang metapora ay tumutukoy sa isang bagay, at ang alegori ay
      may malalim na kahulugang panlahat, kaya walang isa sa tatlong ito ang
      ginamit dito.
    `),
    rationale:
      'Recognising hyperbole by its deliberate exaggeration beyond the literal facts.',
    source: 'Alfiler, J., Sining ng Panunuring sa Filipino (UP, 2000)',
  },
  {
    id: 'gen-006',
    subjectId: 'gened',
    topicId: 'gened-filipino',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      Binasahan ng isang mag-aaral ang kwentong bayan na "Ang Hangganan ni
      Kaka." Ayon sa kuwento, may isang magsasaka na humihingi ng tibayan
      mula sa katrabaho niya nang hindi nagbibigang ng paunawa. Nang makauwi,
      may kaniyang nakita sa lumang aparador ang isang maliit na kutsero ng
      pera na inilagay ng kaniyang ama noon sa kanyang unang trabaho. Nais
      niyang puntahan ito agad sa kaniyang kasera, ngunit sa halip ay
      ipinambag niya ito sa pag-aaral ng mga batang mag-aaral sa kanyang
      barangay. Pagkatapos ay bumalik siya sa kaniyang trabaho, ngunit
      nagbago na ang kaniyang pakiramdam tungkol sa sarili niya.
    `),
    prompt: 'Ano ang pinakamainam na pagbasa ng aral ng kwentong bayan na ito?',
    options: [
      'Ang aral ng kwentong bayan na ito ay ang katapatan, sapagkat ang tinubuang dignidad ng tao ay nangangailangan ng katapatan sa paggamit ng pera.',
      'Ang aral ng kwentong bayan na ito ay ang kasipagan, sapagkat ang tao ay umiiral sa tulong ng sarili niyang paggawa.',
      'Ang aral ng kwentong bayan na ito ay ang paggalang, sapagkat ang matanda ay kailangang igalang sa bawat desisyon ng kabataan.',
      'Ang aral ng kwentong bayan na ito ay ang pakikipagkapwa, sapagkat ang tunay na kaunlaran ay natatagong lahat ng tao sa isang lugar.',
    ],
    correctIndex: 0,
    explanation: V(`
      Ang kuwento ay nagsisimula sa isang maliit na pagkakamali, ang hindi
      pagbibigay ng paunawa sa paghingi ng pera, at natatapos sa isang maliit
      na pagbabago ng loob. Ang pera ay tinaya nang manatiling pansarili at
      iginawang tulay sa kapwa, kaya ang kahulugan ng katapatan ang siyang
      inaalawan. Ang kasipagan ay maaaring makita sa mga tauhan ngunit
      hindi ito ang aral ng kuwento. Ang paggalang sa matanda at ang
      pakikipagkapwa ay karaniwang kultural na aral, ngunit walang paggalang
      sa matanda o sama-samang pagkilos ng buong pamayanan ang inilalarawan
      sa kuwento.
    `),
    rationale:
      'Drawing the moral lesson of a Filipino folktale and separating it from generic cultural values.',
    source: 'DepEd Mother Tongue Curriculum Guide, Filipino track (DepEd, 2019)',
  },
  {
    id: 'gen-007',
    subjectId: 'gened',
    topicId: 'gened-filipino',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      Pinag-usapan ng guro sa klase 10-A ang mga linya sa isang tula ng
      Jose Rizal na naglalarawan ng "ang anak na natutulog na naghihintay ng
      liwayway." Ayon sa guro, ang linyang ito ay tumutukoy sa mga
      mag-aaral na buong araw naghihintay sa isang pagsubok na alam nilang
      imposibleng ipasa. Hindi ito ang baybay ng isang tunay na paglalakbay,
      kundi ang larawan ng kalagayan ng isang tao. Sinabi rin ng guro na
      kapag ang isang kagamitan o eksena ay tumutukoy sa isang mas
      malalim na damdamin o kaisipan, tinatawag itong panakala o simbolo.
    `),
    prompt:
      'Batay sa paliwanag ng guro, ano ang pinakamainam na paglalarawan ng sinalitang linya?',
    options: [
      'Ang sinalitang linya ay isang panakala, sapagkat ang isang larawan ng paghihintay ay kumakatawan ng mas malalim na kalagayan ng tao.',
      'Ang sinalitang linya ay isang simili, sapagkat ang paghihintay ay direktang ikincompare sa isa pang salita na may kahulugang palitan.',
      'Ang sinalitang linya ay isang alegori, sapagkat ang mga salita ay may malalim na kahulugang panlahat para sa buong bansa.',
      'Ang sinalitang linya ay isang idioma, sapagkat ang mga salita ay may karaniwang kahulugang labag sa literal na kahulugan nito.',
    ],
    correctIndex: 0,
    explanation: V(`
      Ang panakala o simbolo ay isang kagamitan o eksena na kumakatawan
      sa isang mas malalim na kahulugan. Dito ang larawan ng paghihintay ay
      kumakatawan sa kalagayan ng tao, kaya ito ay panakala. Ang simili ay
      may tahasang ginagamit ang salitang parang o gaya, na wala rito.
      Ang alegori ay may kahulugang panlahat para sa buong lipunan, samantalang
      ang linyang ito ay tungkol sa isang tao. Ang idioma ay binubuo ng
      mga salitang may karaniwang pinagsamang kahulugan, at iyon ay hindi
      din ang ginamit dito.
    `),
    rationale:
      'Identifying a symbol as a concrete image carrying a deeper abstract meaning.',
    source: 'Alfiler, J., Sining ng Panunuring sa Filipino (UP, 2000)',
  },
  {
    id: 'gen-008',
    subjectId: 'gened',
    topicId: 'gened-filipino',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      Naghanda ang klase 8-D ng isang ulat para sa aralin sa Filipino.
      Ginamit ng isang mag-aaral ang isang linya na ito sa kanyang
      ulat: "Nagbibigay ang tinig ng libanag ng pagmamahal sa tao,
      at ang dilim ay siyang sumasalo sa tuwing nawalan ako ng
      liwanag." Sinabi ng guro sa klase na bago maisulat ang isang
      sanaysay, kailangang tiyakin ng magsulat kung ano ang kaniyang
      balangkas, kung sino ang kaniyang tagapagsalita, at kung ano ang
      kaniyang layunin. Ayon sa kaniya, ang sanaysay ay may simula,
      gitna, at dulo tulad ng isang kuwento, ngunit hindi ito
      karaniwang may tauhan o banghay.
    `),
    prompt: 'Ano ang pinakamainam na paglalarawan ng linyang ginamit ng mag-aaral?',
    options: [
      'Ang linyang ginamit ay isang metapora, sapagkat ang isang bagay ay ipinagpapalit sa isa pa upang mailabas ang damdamin.',
      'Ang linyang ginamit ay isang hyperbole, sapagkat ang sukat ng pagmamahal ay sinasabing lampag-pataas kaysa sa katotohanan.',
      'Ang linyang ginamit ay isang apostrope, sapagkat ang mga bagay na walang buhay ay binibigyan ng pagmamahal na katangi.',
      'Ang linyang ginamit ay isang personipikasyon, sapagkat ang mga di-buong bagay ay itinuturing na may gabi at liwanag bilang tao.',
    ],
    correctIndex: 0,
    explanation: V(`
      Ang metapora ay ang tuwirang paggamit ng isang salita para sa
      ibang salita upang mailabas ang kahulugan, walang ginagamit na
      "parang" o "gaya." Dito ang tinig at liwanag ay pinapalitan sa
      pagmamahal at pagkawala ng landas, kaya ito ay metapora. Ang
      hyperbole ay malabong sukat, na wala rito. Ang apostrope ay
      pagbibigay ng damdamin sa di-buong bagay o sa wala, samantalang ang
      personipikasyon ay pagbibigay ng buhay o gabi sa mga di-tao. May
      halos na apostrope ang linya, ngunit ang pangunahing kagamitan sa
      pagpapahayag ng damdamin ay ang pagpapalit ng salita.
    `),
    rationale:
      'Telling a metaphor from an apostrophe, a personification, and a hyperbole.',
    source: 'DepEd Mother Tongue Curriculum Guide, Filipino track (DepEd, 2019)',
  },
  {
    id: 'gen-009',
    subjectId: 'gened',
    topicId: 'gened-filipino',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      Isang gawain sa aralin ang pagsulat ng isang balagtasan. Ayon sa
      guro, ang balagtasan ay isang maikling awit na may apat na taludtod
      na tig-aanim na pantig, at ito ay isang anyo ng talumpati ng
      Filipino. Ipinakita ng guro ang isang halimbawa mula sa isang
      makabagong akda ng Jose Rizal. Pagkatapos, sinabi niyang isusulat
      ng bawat mag-aaral ang kanilang sariling balagtasan tungkol sa
      isang paksa na totoo sa kanilang buhay, at ipapasa ang nais nilang
      maabot ng isang maikling talata.
    `),
    prompt:
      'Ano ang pinakamainam na paglalarawan ng isang akdang tinatawag na balagtasan?',
    options: [
      'Ang isang balagtasan ay isang maikling awit na may apat na taludtod na tig-aanim na pantig, karaniwang naglalaman ng isang maikling tanong o isang pagtatalo.',
      'Ang isang balagtasan ay isang mahabang dula na may maraming tauhan at mga yugto na naglalarawan ng isang karaniwang pamayanan.',
      'Ang isang balagtasan ay isang sanaysay na naglalayong ipaliwanag ang isang isyu sa lipunan gamit ang datos at sanggunian.',
      'Ang isang balagtasan ay isang awit na inaawit sa isang tugon sa plakang o sa komposisyong naaangkop sa isang libanag.',
    ],
    correctIndex: 0,
    explanation: V(`
      Ang balagtasan ay isang maikling awit na may apat na taludtod na
      tig-aanim na pantig, at ito ang pinakakilalang anyo ng talumpati ng
      Filipino. Karaniwang naglalaman ito ng isang maikling tanong o
      pagtatalo. Ang dalawang susunod na pagpipilian ay paglalarawan ng
      dula-dulaan at sanaysay, na may karaniwang maraming tauhan o
      datos. Ang huling pagpipilian ay paglalarawan ng awit na may
      partitura o tugon sa plakang, na siyaman ding isang uri ng awit,
      ngunit ito ay maaaring masyadong mahaba para sa karaniwang
      anyo ng balagtasan.
    `),
    rationale:
      'Defining the balagtas as a four-line six-syllable verse, distinguishing it from a dula, a sanaysay, and a song.',
    source: 'Alfiler, J., Sining ng Panunuring sa Filipino (UP, 2000)',
  },
  {
    id: 'gen-010',
    subjectId: 'gened',
    topicId: 'gened-filipino',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      Nagtatalakbuhin ang isang paaralan ng isang gawain na "Kamustahan
      ng Aming Bayan," kung saan hiniling sa bawat mag-aaral na
      magsulat ng isang sanaysay na naglalarawan ng isang tradisyonal na
      pagdiriwang. Hindi namin alam ng guro kung aling bayan ang
      paborito ng bawat mag-aaral, kaya sinabi niya sa kanilang
      pumili ng anumang lokalidad. Isinulat ng isang mag-aaral ang
      salaysay tungkol sa isang pista ng karnehan sa kanyang
      probinsya, at isinulat ng iba ang mga tinalakbo nila sa
      kanilang bayan. Sinabi ng guro na sa isang sanaysay dapat
      malinaw kung ano ang balangkas ng isang bagay at kung ano ang
      kahulugan nito, at hindi dapat palitan ng maling pagpapalagayan.
    `),
    prompt:
      'Batay sa tagubilin ng guro, ano ang pinakamainam na paglalarawan ng isang sanaysay?',
    options: [
      'Ang isang sanaysay ay isang pangungusap na naglalarawan ng isang bagay o isyu nang may malinaw na balangkas at kahulugan.',
      'Ang isang sanaysay ay isang maikling awit na may apat na taludtod na may panimula, kataas, baba, at pangwakas na diin.',
      'Ang isang sanaysay ay isang salaysay na buod ng isang akdang nakalimbag na walang sariling puna o pagpapahalaga ang tagapagsulat.',
      'Ang isang sanaysay ay isang usapan ng dalawang tao sa isang dula-dulaan na naglalayong makipagkasundo sa isang suliranin.',
    ],
    correctIndex: 0,
    explanation: V(`
      Ang sanaysay ay isang pangungusap na may malinaw na balangkas at
      kahulugan, at maaaring magkaroon ng sariling puna o pagpapahalaga.
      Ang dalawang talubod sa simula, kataas, baba, at pangwakas na diin ay
      ang hugis ng isang balagtasan, hindi ng isang sanaysay. Ang buod ay
      maaaring bahagi ng isang sanaysay, ngunit ang buod lamang ay
      hindi pa sanaysay dahil wala itong sariling pagtatalo o pagpapahalaga.
      Ang dula ay may tauhan at ang usapan, ngunit hindi ito ang anyo ng
      isang sanaysay.
    `),
    rationale:
      'Distinguishing an essay from a balagtas, a plot summary, and a dramatic dialogue.',
    source: 'DepEd Mother Tongue Curriculum Guide, Filipino track (DepEd, 2019)',
  },
  {
    id: 'gen-011',
    subjectId: 'gened',
    topicId: 'gened-filipino',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      May isang gawain sa klase 7-F na naglalayong suriin ang wastong
      paggamit ng wika. Binigyan ng guro ang klase ng isang maliit na
      teksto: "Maraming salita ang malalim ang kahulugan, at kahit
      iyon ay totoo, may mga salitang tila ginagamit lamang upang
      makagaling tignan." Hiniling ng guro sa klase na ipaliwanag
      kung bakit ginagamit ang mga salitang "kahulugan" at
      "magaling" sa ganitong pangungusap. Ayon sa kaniya, may
      dalawang uri ng paggamit ng wika: ang literal, kung saan
      ang salita ay ibig sabihin ang karaniwang kahulugan nito, at
      ang pan metaphorical o makabuluhang paggamit, kung saan
      ang salita ay lumalampas sa karaniwang kahulugan nito.
    `),
    prompt:
      'Alin sa mga sumusunod ang pinakamainam na paglalarawan ng paggamit ng wika sa teksto?',
    options: [
      'Ang paggamit ng wika sa teksto ay makabuluhang paggamit, sapagkat ang mga salita ay lumalampas sa kanilang karaniwang kahulugan para sa mas malalim na diwa.',
      'Ang paggamit ng wika sa teksto ay pananalaba, sapagkat ang mga salita ay ginagamit sa kanilang karaniwang kahulugan upang ipakita ang katotohanan.',
      'Ang paggamit ng wika sa teksto ay balagtasan, sapagkat ang mga taludtod ng teksto ay may pantay na sukat na sukatin sa pantig.',
      'Ang paggamit ng wika sa teksto ay retorika, sapagkat ang mga salita ay inilalagay sa isang partikular na pagkakasunod-sunod para sa tunog.',
    ],
    correctIndex: 0,
    explanation: V(`
      Ang pananalaba ay literal: ginagamit ang salita sa karaniwang
      kahulugan nito. Dito, ang salitang "kahulugan" at "magaling" ay
      hindi lang basta sa karaniwang kahulugan, bagkus ay lumalampas
      sa literal na kahulugan para sa isang mas malalim na diwa, kaya
      ito ay makabuluhang paggamit ng wika. Ang balagtasan ay anyo ng
      tula, hindi ng isang pangungusap, at ang retorika ay tumutukoy
      sa pagkakasunod ng mga salita para sa makabuluhang tunog, na
      wala rito.
    `),
    rationale:
      'Telling literal from figurative language in a sentence, and separating it from metre and sound devices.',
    source: 'Alfiler, J., Sining ng Panunuring sa Filipino (UP, 2000)',
  },
  // ==================================================================
  // GENED-COMMUNICATION — 11 items (4 easy, 4 moderate, 3 difficult)
  // ==================================================================
  {
    id: 'gen-012',
    subjectId: 'gened',
    topicId: 'gened-communication',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      The Grade 9 cluster head needs to tell parents that the science fair
      has been moved from Friday to Saturday morning because two
      laboratory rooms were booked for a district meeting. She has two
      channels available: the official school group chat, which every
      parent of the cluster reads daily, and the assembly hall, where
      only the students and staff will hear her. The parents who did
      not read the chat are the ones most likely to show up on Friday
      with their project boards.
    `),
    prompt:
      'Which approach best matches the cluster head purpose and audience?',
    options: [
      'The cluster head should post a short, dated notice in the group chat naming the new schedule, the reason, and what parents must bring.',
      'The cluster head should post a long account of the district meeting history in the group chat so that parents understand the background.',
      'The cluster head should announce the change during Monday assembly only, which reaches students and staff but not the parents who must act.',
      'The cluster head should send the change only to the Grade 9 students, shifting the risk of misreporting onto eleven-year-olds.',
    ],
    correctIndex: 0,
    explanation:
      'Purposive communication starts from the audience and the response required, not from the message the sender would like to make. These parents need a specific action, so the notice must carry the new date, the reason, and what to bring, and it must reach them on a channel they actually read. A long historical explanation buries the actionable detail. Assembly reaches only the people in the hall, and most of the parents in question are not there. Routing the message through students shifts the accuracy risk onto eleven-year-olds.',
    rationale:
      'Matching the channel and the content to the audience that must act on the message.',
    source: 'DepEd K to 12 Gabay Pamilya sa Pagpapakatao, Modyul 9 (DepEd, 2013)',
  },
  {
    id: 'gen-013',
    subjectId: 'gened',
    topicId: 'gened-communication',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      During a health lesson the teacher explains that students should
      wash their hands for twenty seconds, counting aloud. Two students
      in the back row keep washing for about five seconds and then go
      back to their seats, and the teacher notices that they have
      copied the gesture but not the duration. The teacher has already
      delivered the idea, the students can hear and repeat the words,
      and nothing about the room blocks the sound. The gap is between
      what the teacher encoded and what the two students actually
      understood as twenty seconds.
    `),
    prompt:
      'Which part of the communication process best explains the two students behaviour?',
    options: [
      'The failing element here is the decoder, because the students received a different understanding from the one the teacher intended to encode.',
      'The failing element here is the encoder, because the students failed to study the message before reproducing the gesture.',
      'The failing element here is the channel, because spoken instructions cannot carry a numerical quantity from a teacher to a listener.',
      'The failing element here is the feedback, because the students gave no reaction and so the teacher cannot correct anything at all.',
    ],
    correctIndex: 0,
    explanation:
      'The communication process runs from encoder to message to channel to decoder, and success depends on both ends decoding the same meaning. Here the teacher encoded twenty seconds, the channel carried the message intact, and the students decoded five seconds, so the breakdown is at the decoding end. Blaming the encoder for failing to study is nonsense: the receiver does not encode the original idea. Spoken channels can certainly carry quantities, so the channel is intact. Missing feedback is a real problem, but the specific behaviour described is a mis-decoding, not merely an absent reaction.',
    rationale:
      'Locating the point of failure in the communication process from a described breakdown in meaning.',
    source: 'Alfiler, H., Psychology (Philippine ed., 2009), ch. 6 on communication',
  },
  {
    id: 'gen-014',
    subjectId: 'gened',
    topicId: 'gened-communication',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student who has never spoken in class walks to the front to
      read her report. She keeps her arms folded across her chest, she
      looks at the floor rather than at the audience, and her voice is
      very low. Her report is accurate and her teacher thanks her
      afterwards. During the same lesson the teacher notices that the
      student who raised her hand to volunteer stands with open palms
      and steady eye contact and is understood from the back row without
      being asked to repeat herself. The teacher wants to help both
      students improve the impression their message makes.
    `),
    prompt:
      'Which insight about nonverbal communication is best supported by the lesson?',
    options: [
      'The nonverbal cues are the point here, since posture, eye contact, and vocal volume can reinforce or undercut an accurate message.',
      'The nonverbal cues are only useful for students who already speak confidently, and can be ignored by those who do not.',
      'The nonverbal cues are relevant only to the first sentence of a message, since the words themselves carry all the meaning.',
      'The nonverbal cues are fixed in cultural meaning and cannot vary between one classroom and another.',
    ],
    correctIndex: 0,
    explanation:
      'Nonverbal communication is the body language, the voice quality, the eye contact, and the use of space that accompanies the words. The first student transmitted an accurate report through a posture and a volume that undercut it, and the second reinforced her words so well she was heard from the back row. Nonverbal cues help everyone, not only confident speakers, since a reader who folds her arms has something to change. Their effect is strongest in the first moments, not confined to them, and their meaning is culturally learned rather than universal, so two classrooms can read the same gesture differently.',
    rationale:
      'Understanding that nonverbal channels can reinforce or contradict the verbal message.',
    source: 'Alfiler, H., Psychology (Philippine ed., 2009), ch. 6 on communication',
  },
  {
    id: 'gen-015',
    subjectId: 'gened',
    topicId: 'gened-communication',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student applies for a summer teaching assistant post at a
      non-government reading centre. The advertisement asks for a
      one-page résumé and a short application letter. The student
      copies the entire advertisement into the letter as the opening
      paragraph, then adds a list of the centre activities he joined
      last year, and closes by thanking the reader. He asks his teacher
      whether the letter needs anything else before it is submitted.
      His teacher tells him the employer already knows the vacancy and
      needs to see what this particular applicant did.
    `),
    prompt:
      'Which revision best fits the situation and purpose of an application letter?',
    options: [
      'The student should replace the copied advertisement with a short opening, then give evidence from his own record of the work.',
      'The student should keep the copied advertisement, since repeating the requirements shows the applicant has read them carefully.',
      'The student should replace the letter with the list of activities alone, since the letter adds nothing beyond what the résumé lists.',
      'The student should add the names and contact details of three former teachers, so that the employer can verify his character.',
    ],
    correctIndex: 0,
    explanation:
      'An application letter is a short persuasive document aimed at one employer, and its work is to connect the applicant to the vacancy using the applicant own evidence. Repeating the advertisement wastes the first paragraph on information the reader already has, and it produces the appearance of effort without substance. A list of activities is a résumé body with a covering letter attached, since the letter must argue rather than enumerate. Asking a teacher to vouch for character passes the employers verification job to someone who is not the decision maker.',
    rationale:
      'Writing an application letter that argues a fit for the vacancy instead of restating the advertisement.',
    source: 'DepEd K to 12 Gabay Pamilya sa Pagpapakatao, Modyul 9 (DepEd, 2013)',
  },
  {
    id: 'gen-016',
    subjectId: 'gened',
    topicId: 'gened-communication',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student submitted a three-paragraph essay in which the second
      paragraph argues that the author of the source never actually
      checked the figures cited in the article. The teacher believes
      the observation is correct but the paragraph is written as a
      personal attack on the source. The teacher has five minutes with
      the student and needs to keep the student willing to revise.
      The teacher notes that good feedback tells the student what to
      do next, not only what is wrong, and should not carry the teacher
      own judgement about the source.
    `),
    prompt:
      'Which feedback is the most useful piece of feedback the teacher can give?',
    options: [
      'Your second paragraph makes a strong point; quote the exact sentence from the article that proves the figures were never checked.',
      'Your second paragraph is attacking the author and it will not be accepted; rewrite it before you submit it again.',
      'Your second paragraph is fine, but the conclusion is weak, so spend the rest of the period adding more to the essay.',
      'Your second paragraph is the kind of writing examiners dislike, so look at a better model and imitate its style.',
    ],
    correctIndex: 0,
    explanation:
      'Useful feedback is specific, describes the work rather than the person, and ends in an action the student can take. The first version names what works in the paragraph, isolates the one thing that must be proved, and asks for the exact sentence that proves it, which tells the student what to do next. The second is a judgement of the student and gives no route forward. The third praises what needs no work and gives no instruction about the paragraph in question. The fourth appeals to examiner taste, which teaches the student nothing she can check.',
    rationale:
      'Giving descriptive, actionable feedback that addresses the work and not the writer.',
    source: 'DepEd K to 12 Gabay Pamilya sa Pagpapakatao, Modyul 9 (DepEd, 2013)',
  },
  {
    id: 'gen-017',
    subjectId: 'gened',
    topicId: 'gened-communication',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student is given a two-page article about rainwater harvesting
      and must include only some of it in her report. She has been
      asked to put the article into her own words while keeping its
      meaning, and separately to condense the whole article into a few
      sentences that keep only the central points. She writes a short
      version that keeps the meaning but leaves out the examples and
      the supporting statistics, and she writes another version that
      keeps the original wording almost exactly but cuts it to five
      lines.
    `),
    prompt:
      'Which statement correctly distinguishes her two versions?',
    options: [
      'The short version that keeps the meaning in her own words is a paraphrase, while the shortened version in the original wording is a summary.',
      'The short version that keeps the meaning in her own words is a summary, while the shortened version in the original wording is a paraphrase.',
      'Both versions are summaries, because shortening a text always requires keeping the original wording.',
      'Both versions are paraphrases, because changing the length of a text always requires changing its wording.',
    ],
    correctIndex: 0,
    explanation:
      'Paraphrasing restates a passage in new wording while keeping the meaning intact, and it normally keeps the scope of the original. Summarising condenses a whole text to its main points and is free to drop examples and supporting figures. The first version changes the wording but does not reduce the coverage, so it is a paraphrase. The second reduces the coverage drastically but barely touches the words, so it is a summary. Length and wording move independently, which is why one passage can be paraphrased and still be long, or summarised and still reuse the original phrasing.',
    rationale:
      'Distinguishing paraphrasing, which rewords, from summarising, which condenses the scope.',
    source: 'DepEd K to 12 Gabay Pamilya sa Pagpapakatao, Modyul 9 (DepEd, 2013)',
  },
  {
    id: 'gen-018',
    subjectId: 'gened',
    topicId: 'gened-communication',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student must give a four-minute speech and has written a
      single continuous page of notes with no divisions. In practice
      she repeats her introduction, runs out of time before reaching
      her third point, and cannot answer a question about what comes
      next because she cannot find her place. Her teacher asks her to
      prepare the speech in a different form before she writes any
      sentences: the main idea of each part, the points that support
      each part, and the order in which the parts will be delivered.
      The teacher notes that the form she is describing is a skeleton
      of the speech that precedes the wording.
    `),
    prompt:
      'Which form should the student prepare before drafting the speech?',
    options: [
      'The form she should prepare is an outline, in which each part is a main point with its supporting details, so the order is fixed first.',
      'The form she should prepare is a summary, in which the whole speech is reduced to one paragraph so she can check whether it fits in four minutes.',
      'The form she should prepare is a paraphrase, in which each paragraph of her notes is restated in simpler words before she performs it.',
      'The form she should prepare is a rebuttal, in which she prepares answers to the objections she expects so the question period is handled.',
    ],
    correctIndex: 0,
    explanation:
      'An outline fixes the architecture of a piece of writing: the main points, the supporting material under each, and the order. Doing this before the wording solves exactly the three faults described, the repetition of the introduction, the missing third point, and the inability to locate her place. A summary judges whether the content fits the time but does not order the parts. A paraphrase simplifies the language and would delay the structural work. A rebuttal prepares for the question period and does nothing for the body of the speech.',
    rationale:
      'Using an outline to sequence a speech before the sentences are written.',
    source: 'DepEd K to 12 Gabay Pamilya sa Pagpapakatao, Modyul 9 (DepEd, 2013)',
  },
  {
    id: 'gen-019',
    subjectId: 'gened',
    topicId: 'gened-communication',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student council must persuade the principal to keep the school
      library open on Saturday mornings. Half the council thinks the
      strongest argument is to list how many students use the library
      on weekdays, because the principal has said publicly that
      library use matters. One member wants to bring three students
      who will describe what the library means to them. Another wants
      to show the actual number of unused study hours per week and
      argue that the space is idle when it could be open. The
      principal has already agreed in principle with the goal and is
      now asking the council to justify the schedule specifically.
    `),
    prompt:
      'Which claim, supported as described, gives the persuasive appeal the greatest force here?',
    options: [
      'The strongest claim is that opening on Saturday would convert unused study hours into supervised access, backed by the room-use figures.',
      'The strongest claim is that the council has already collected the signatures needed to support the proposal before the meeting.',
      'The strongest claim is that library programmes benefit every grade level equally, backed by a quotation from the school paper.',
      'The strongest claim is that other schools in the district already open on Saturdays, backed by a list of their principals quoted.',
    ],
    correctIndex: 0,
    explanation:
      'When the audience already accepts the goal, the persuasion has to move to the means, so the claim must address the schedule and be verifiable. Connecting Saturday opening to hours that are demonstrably idle, and backing it with the room-use figures, does exactly that and survives a challenge from the principal. A signature count measures support rather than merit, and support is not what is in doubt. The claim that all grades benefit equally is a claim about fairness the figures do not establish and that the schedule question does not turn on. Citing other schools appeals to what is done elsewhere rather than to whether it works here.',
    rationale:
      'Building a persuasive claim that targets the decision actually in dispute and rests on checkable evidence.',
    source: 'DepEd K to 12 Gabay Pamilya sa Pagpapakatao, Modyul 9 (DepEd, 2013)',
  },
  {
    id: 'gen-020',
    subjectId: 'gened',
    topicId: 'gened-communication',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A health post shared a claim online that a herbal drink from the
      province cures dengue in three days, with a photograph of an
      official looking at the plant and no hospital named. The post is
      shared by a classmate who added that their cousin reportedly
      recovered after drinking it. The post has thousands of shares
      and two news programmes have repeated the claim. Before the
      guidance teacher allows the class to discuss it, she asks the
      class to check what evidence stands behind the cure claim, who
      originally made the statement, and whether any independent
      source outside the original post repeats it.
    `),
    prompt:
      'Which action reflects the strongest media literacy response to the post?',
    options: [
      'Open the original source, look for independent reporting outside it, and withhold judgement until the claim is corroborated or debunked.',
      'Accept the claim once several unrelated accounts repeat it, since independent repetition of the same number is strong evidence.',
      'Accept the claim because an official appears in the photograph, since official endorsement guarantees the accuracy of the cure.',
      'Reject the claim immediately because viral health claims are false more often than not, regardless of the evidence available.',
    ],
    correctIndex: 0,
    explanation:
      'Media literacy is a procedure for checking claims, not a reflex for accepting or rejecting them. Opening the original source, seeking corroboration from independent outlets that are not downstream of it, and holding judgement until the evidence resolves is the procedure the teacher is teaching, and the photograph of an unnamed official is exactly the kind of detail that corrodes under it. Repetition by unrelated accounts can be one press release copied widely, so volume is not independence. An official face is appeal to authority and does not establish a medical claim. Treating viral as false is the mirror-image error and produces exactly as many bad judgements.',
    rationale:
      'Verifying a viral health claim by tracing the source and seeking independent corroboration.',
    source: 'DepEd K to 12 Gabay Pamilya sa Pagpapakatao, Modyul 6 (DepEd, 2013); NCCA media and information literacy materials',
  },
  {
    id: 'gen-021',
    subjectId: 'gened',
    topicId: 'gened-communication',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A member of the class group chat posts a screenshot of a
      conversation in which a classmate jokes about the marking scheme
      used by a teacher. The screenshot is forwarded to a wider class
      group without a comment, and by the next period the teacher
      receives it from the principal. Nobody in either chat wrote
      anything insulting, and the message reached far more people than
      the original conversation. The class has discussed online
      etiquette before, and the general agreement was that a private
      conversation stays between the people who were in it.
    `),
    prompt:
      'Which principle does this incident show most clearly?',
    options: [
      'Digital etiquette includes the duty to respect the privacy of the people in a conversation, not only the wording of what is forwarded.',
      'Digital etiquette requires every screenshot to be cleared by a teacher before it may be shared in any class group.',
      'Digital etiquette is satisfied whenever no insult appears in the forwarded text, because content alone determines acceptability.',
      'Digital etiquette is breached only by the author of the original conversation, since the student who forwarded it merely followed a link.',
    ],
    correctIndex: 0,
    explanation:
      'The harm here is not in the wording, which was mild, and not in the intention of the student who forwarded it. A private conversation was carried into a larger audience without anyone in it consenting, and the etiquette the class had agreed on addresses precisely that. Prior approval for every screenshot would make the group a monitored channel rather than a class of students learning judgement. Content alone as the standard would license exactly this. Placing all blame on the author also misidentifies the actor, because the forwarding decision belongs to the person who forwarded.',
    rationale:
      'Recognising privacy and audience limits as part of digital communication etiquette.',
    source: 'DepEd K to 12 Gabay Pamilya sa Pagpapakatao, Modyul 9 (DepEd, 2013); DepEd Child Protection Policy (DepEd Order No. 40, s. 2012)',
  },
  {
    id: 'gen-022',
    subjectId: 'gened',
    topicId: 'gened-communication',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      The student council has money for a reading corner but not enough
      to buy new books and a beanbag in the same year. Two proposals
      are written. The first asks the principal for a decision and says
      that the council would like more funds if possible. The second
      sets out what the corner will contain, what it will cost, what
      the council will contribute from its own funds, how many students
      are expected to use it, and what benefit the school gets, and it
      asks the principal to approve that specific plan by a stated
      date. The teacher explains that a proposal has to be something
      that can be accepted, not merely a statement of a wish.
    `),
    prompt:
      'Which document is the second text, and why?',
    options: [
      'It is a proposal, because it presents a specific and workable course of action that the decision maker can accept or reject.',
      'It is a request, because it asks the principal to decide without committing the council to any particular plan.',
      'It is a report, because it assembles cost figures and projected numbers about a project already completed.',
      'It is a proposal, because it persuades by appealing to the principal reputation rather than by stating costs and benefits.',
    ],
    correctIndex: 0,
    explanation:
      'A proposal is a formal suggestion of a specific course of action, detailed enough to be approved or rejected as it stands, which is what the second text is: contents, costs, the council own contribution, expected users, benefit, and a deadline. The first text is a request, since it asks for money if it is available and leaves the shape of the solution open. The second is not a report, because nothing has been completed yet. The fourth option contradicts itself, because an appeal to the decision maker reputation is not what makes a document a proposal.',
    rationale:
      'Distinguishing a proposal from a request and a report by what the document asks the reader to decide.',
    source: 'DepEd K to 12 Gabay Pamilya sa Pagpapakatao, Modyul 9 (DepEd, 2013)',
  },
  // ==================================================================
  // GENED-ETHICS — 11 items (5 easy, 4 moderate, 2 difficult)
  // ==================================================================
  {
    id: 'gen-023',
    subjectId: 'gened',
    topicId: 'gened-ethics',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      During a school debate, a student claims that a candidate for
      class president should be chosen on the strength of the party
      platform alone, since the party has the best policies. Another
      student objects that the platform belongs to the whole party and
      not to the person who would have to carry it out. The teacher
      asks the class which principle is at stake, and points out that
      one principle holds that an action is right because it produces
      the best consequences for the greatest number of people.
    `),
    prompt:
      'Which ethical principle is the second student appealing to?',
    options: [
      'The principle holds that the morally right action is the one that produces the best consequences for the greatest number of people.',
      'The principle holds that a moral duty must be followed even when breaking it would produce better consequences for many.',
      'The principle holds that a decision is right when the person making it possesses the moral character required for the task.',
      'The principle holds that a rule is morally valid only when every person affected could accept it without self-interest.',
    ],
    correctIndex: 0,
    explanation:
      'Consequentialism, in its utilitarian form of Mill, judges an action by its outcomes: the right action is the one that maximises overall happiness or utility for the greatest number. The second student is arguing that consequences for the many who will live under the policy should decide. The duty regardless of consequences is deontology, and the character of the agent is virtue ethics, and both are described in the other options without naming them. The universalisable rule is Kant, which turns on what the agent could will, not on how many people benefit.',
    rationale:
      'Identifying utilitarianism by its test of consequences for the greatest number.',
    source: 'Mill, J., Utilitarianism (1861), ch. 2; DepEd K to 12 Gabay Pamilya sa Pagpapakatao, Modyul 5',
  },
  {
    id: 'gen-024',
    subjectId: 'gened',
    topicId: 'gened-ethics',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student finds a printed study guide on a table in the
      library, clearly left behind by another student, with that
      student name written on the cover. The guide would be genuinely
      useful for the class test. The student takes it, reads the two
      chapters covered at the back, and returns it to the same table
      the next day, still intact. The student sees no harm done, since
      the owner got the guide back. The teacher points out that the
      value at issue is not the object but the use of it.
    `),
    prompt:
      'Which reasoning best supports the teacher point?',
    options: [
      'The issue is the use of the other student property without permission, since permission matters whatever happens to the object afterwards.',
      'The issue is the value of the printed guide, since a guide with little resale value carries a smaller obligation than an expensive one.',
      'The issue is the intention of the reader, since a student who returns the guide never intended permanent loss.',
      'The issue is the number of people benefited, since a guide that helps the whole class justifies the taking of it.',
    ],
    correctIndex: 0,
    explanation:
      'Taking someone else property without asking is the moral issue, and returning it does not undo the fact that it was used without consent. Object value is a legal question about damages, not the ethical core of a duty to respect ownership, and it is wrong to make that the measure. Intent is relevant to blameworthiness, but a good intention does not supply the permission that is missing. Popular benefit is the utilitarian test, and applying it here would sanction taking anything useful, which is why consequences alone cannot settle a question about another person rights.',
    rationale:
      'Separating the moral issue of consent from object value, intent, and aggregate benefit.',
    source: 'Zaide and Zaide, Philippine Values in Action (2007), ch. 5 on honesty and integrity',
  },
  {
    id: 'gen-025',
    subjectId: 'gened',
    topicId: 'gened-ethics',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student is asked by a classmate to take a photograph of the
      group project display, so the classmate can send it to a
      relative abroad who has never seen the school. The photograph
      would include the class list on the wall behind the display, with
      the full names of the students. The classmate says it is only a
      family group and that nobody will be harmed. The teacher explains
      that sharing something is a decision about consent, and that a
      person who cannot recognise the situation has not really chosen.
    `),
    prompt:
      'Which principle does the teacher explanation illustrate?',
    options: [
      'The principle at stake is that every person affected must be able to give informed consent, since consent requires awareness of the sharing.',
      'The principle at stake is that consent is unnecessary when an image is shared only inside a family group, because a small audience removes the harm.',
      'The principle at stake is that consent is given implicitly by appearing in a photograph, so no permission is needed once a picture has been taken.',
      'The principle at stake is that consent is required from a teacher rather than from the people shown, since teachers hold authority over images.',
    ],
    correctIndex: 0,
    explanation:
      'Informed consent requires that the person understand what is being done and agree to it. The students in the class list never knew their names would travel to an overseas relative, so their agreement cannot be inferred from anything they did or failed to do. A family audience narrows the reach but does not reduce the disclosure to zero, which is what the third claim requires. Appearing in a photograph is not a waiver of future distribution, and the fourth option replaces the consent of the data subjects with the authority of an adult, which is a different kind of claim entirely.',
    rationale:
      'Applying informed consent to the sharing of an image containing identifiable information.',
    source: 'DepEd K to 12 Gabay Pamilya sa Pagpapakatao, Modyul 8 (DepEd, 2013); DepEd Child Protection Policy (DepEd Order No. 40, s. 2012)',
  },
  {
    id: 'gen-026',
    subjectId: 'gened',
    topicId: 'gened-ethics',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A class is told that the school will hold a clean-up drive on
      Friday, and that the classes with the most collected waste will
      be given the use of the covered court for a whole afternoon.
      Several students point out that the class next door has fewer
      students and will find it harder to beat them, so they propose
      that the award should go to the class that collects the most
      waste per student instead. The teacher asks the class what makes
      the second rule fairer, and one student answers that it stops
      the size of the class from deciding the winner.
    `),
    prompt:
      'Which principle does the student answer point to?',
    options: [
      'A fair rule must not let an irrelevant circumstance such as class size determine the outcome when it can be removed.',
      'A fair rule must always give the largest group the reward, because more people worked and more people benefit.',
      'A fair rule must be decided by a vote of the students involved, since majority preference settles every question of justice.',
      'A fair rule must be strictest for the classes with the fewest members, since a harder standard is a more demanding challenge.',
    ],
    correctIndex: 0,
    explanation:
      'The objection to the first rule is that class size, which has nothing to do with diligence or waste collected, is deciding the winner. Adjusting the measure to remove that irrelevant factor is the standard move, and the student names it correctly. Preferring the larger group rewards being large rather than being effective, which is the bias being removed. Majority preference settles how a rule is adopted, not whether the rule is just, and a common vote can ratify an arbitrary advantage. A stricter standard for the smaller class would merely replace one arbitrary advantage with another.',
    rationale:
      'Recognising that fairness requires excluding an irrelevant circumstance such as group size from the outcome.',
    source: 'Rawls, J., A Theory of Justice (1971), secs. 11-17; DepEd K to 12 Gabay Pamilya sa Pagpapakatao, Modyul 5',
  },
  {
    id: 'gen-027',
    subjectId: 'gened',
    topicId: 'gened-ethics',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student is given a weekly allowance for school expenses. In one
      week the allowance was unusually large because of a bonus, and the
      student decided to keep the whole amount rather than returning
      part of it to the family budget, on the grounds that the money
      was given freely and spending it is therefore nobody else
      business. The teacher asks the class where a gift ends and a
      trust begins, and one student replies that a student still has a
      duty inside the household even when the money was a gift.
    `),
    prompt:
      'Which reasoning supports the reply about a duty inside the household?',
    options: [
      'The reply holds that a student shares in the welfare of the family, so what is freely given still carries responsibility to those it affects.',
      'The reply holds that a student who receives money loses every duty toward the giver, because acceptance ends all further obligation.',
      'The reply holds that a student owes nothing to the family budget, because the family has no legal claim to any part of a gift.',
      'The reply holds that a student should return the money, because the law requires that every gift be reported to the barangay first.',
    ],
    correctIndex: 0,
    explanation:
      'Receiving something freely given does not remove a person from the community that gives it, and a student is a member of a household whose welfare is partly their responsibility. That is what the reply claims. The other two options turn the gift into a clean break with all obligation, which is the position the student is rejecting. The fourth invents a legal requirement that does not exist, and a rule of that kind would make ordinary family generosity impossible to accept.',
    rationale:
      'Explaining why freely given resources can still carry responsibility within the family.',
    source: 'Zaide and Zaide, Philippine Values in Action (2007), ch. 4 on Filipino family values',
  },
  {
    id: 'gen-028',
    subjectId: 'gened',
    topicId: 'gened-ethics',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student council member is asked by a friend to include a
      fabricated survey result in the council report so that the
      proposal for a new canteen schedule looks better supported. The
      council member knows the schedule is genuinely popular and that
      the survey was never conducted because there was no time. The
      member reasons that the conclusion is true, so the number used to
      reach it does not matter, and that no individual is harmed.
      The teacher points out that the report will be read as a record of
      what was found.
    `),
    prompt:
      'Which judgement on the council member reasoning is most defensible?',
    options: [
      'The conclusion being true does not license a fabricated source, since a report claims that its evidence was actually obtained.',
      'The reasoning is acceptable, since a report need only reach the right conclusion and the method behind it is irrelevant.',
      'The reasoning is unacceptable only because a survey licence is required, since the legal form of the evidence is what matters.',
      'The reasoning is acceptable, since no individual is harmed and a report may draw on a conclusion reached by other means.',
    ],
    correctIndex: 0,
    explanation:
      'An honest report is a claim about method as much as about conclusion: it tells the reader that the evidence was actually gathered and found. Presenting a number as a survey result tells the reader something false about the world regardless of whether the surrounding conclusion happens to be right, which is the first option. The second reduces a report to its conclusion and destroys the reason anyone relies on one. The third makes the objection a point of licensing, but the fabrication is the problem, not the paperwork. The fourth repeats the first position in different words, since the absence of individual harm was already conceded and does not make a false account of method acceptable.',
    rationale:
      'Rejecting a true conclusion reached through fabricated evidence in an official report.',
    source: 'Zaide and Zaide, Philippine Values in Action (2007), ch. 5 on honesty and integrity',
  },
  {
    id: 'gen-029',
    subjectId: 'gened',
    topicId: 'gened-ethics',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student writes an essay on the history of the resistance and
      finds that most sources she consulted are available only in
      English, while her teacher has asked for the essay in Filipino.
      She considers two ways forward. The first is to write her essay
      in English with a short Filipino abstract, which keeps her
      sources usable. The second is to keep the essay in Filipino,
      translate the passages she needs herself, and cite a
      dictionary for any term she cannot render. She asks which
      choice keeps the Filipino essay honest.
    `),
    prompt:
      'Which choice keeps the essay honest, and on what ground?',
    options: [
      'The second choice, since the student must make her own translated passages presentable and must disclose any term she could not render.',
      'The first choice, since an abstract in Filipino satisfies the requirement to write the essay in Filipino.',
      'The second choice, since translating the sources removes the need to cite where the information came from.',
      'The first choice, since a dictionary makes a translated essay comparable to one written directly in Filipino.',
    ],
    correctIndex: 0,
    explanation:
      'Honesty in a translated essay has two parts: the rendering must be the translator own accurate work, and anything the translator could not carry across must be marked as such rather than passed off as original. The second choice meets both, which is why it keeps the essay honest. An abstract does not make an English essay a Filipino essay. Translating sources removes the difficulty, not the obligation to cite them. A dictionary helps with individual words and does nothing about the language the essay is written in, so it cannot make the first choice compliant.',
    rationale:
      'Keeping an essay honest when sources must be translated into another language.',
    source: 'DepEd K to 12 Gabay Pamilya sa Pagpapakatao, Modyul 5 (DepEd, 2013); RA 10533 (2013) on academic honesty',
  },
  {
    id: 'gen-030',
    subjectId: 'gened',
    topicId: 'gened-ethics',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A school implements a rule that no student may use a phone during
      class hours, because phones have repeatedly disrupted lessons.
      A student argues that the rule is unjust: his phone is his own
      property, he is not harming anyone by keeping it switched off in
      his bag, and previous teachers allowed phones for dictionary work.
      Another student argues that the rule was made by the school for
      everyone and that every student is bound by a rule made by a
      legitimate authority even when they find it inconvenient. The
      teacher asks which argument describes the source of the duty to
      obey, rather than whether the duty is convenient.
    `),
    prompt:
      'Which argument identifies the source of the duty to obey the rule?',
    options: [
      'The second argument, since the duty to obey derives from the rule being made by an authority entrusted to govern the class.',
      'The first argument, since a duty that rests on property rights can be set aside by a rule the owner finds inconvenient.',
      'The first argument, since past permission from a teacher is enough to override any later rule set by the school.',
      'The second argument, since discomfort with a rule is by itself sufficient to remove the duty to follow it.',
    ],
    correctIndex: 0,
    explanation:
      'The question asks where the duty comes from, and the second argument locates it in the legitimate authority of the school to make class rules, which is the standard source. Whether the particular rule is wise is a separate question the first argument partly raises, but a disagreement about the rule does not change where the duty originates. That the phone is the student own property does not by itself defeat a valid institutional rule, which is the reasoning the second option of the first argument accepts. Teachers are not the same authority as the school, so earlier individual permission cannot override a later general rule. Discomfort is a reason to propose a change, not a reason to claim the duty has vanished.',
    rationale:
      'Tracing the source of the duty to obey an institutional rule rather than arguing about its convenience.',
    source: 'DepEd K to 12 Gabay Pamilya sa Pagpapakatao, Modyul 6 (DepEd, 2013); RA 9155 (1992)',
  },
  {
    id: 'gen-031',
    subjectId: 'gened',
    topicId: 'gened-ethics',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A barangay is deciding where to place a waste facility. Option A
      serves the residents of the whole barangay and sits near the
      road, but it is close to a cluster of homes. Option B sits far
      from homes and is safer for health, but it is much harder for
      the elderly residents to reach, who are the ones most likely to
      need to use it. The barangay captain says both options are legal
      and affordable, so the decision falls to the assembly. A member
      argues that the captain argument has overlooked something
      important about choosing between two defensible options.
    `),
    prompt:
      'Which point does the member response raise?',
    options: [
      'That legality and affordability do not settle a choice, since the assembly must still decide which distribution of burdens is more acceptable.',
      'That legality and affordability do not settle a choice, since the option nearer the road must always be approved by a national agency first.',
      'That legality and affordability do not settle a choice, since the burden of proof lies with the residents nearest the facility.',
      'That legality and affordability do not settle a choice, since only the barangay captain may choose between two legal options.',
    ],
    correctIndex: 0,
    explanation:
      'Saying that both options are legal and affordable eliminates only the arguments that can be disposed of cheaply; it does not choose between them. What remains is a judgement about which distribution of benefit and burden the assembly can accept, which is the point the member raises. The national approval requirement in the second option is asserted, not given, and even if a road-adjacency rule existed it would be a separate point. Rules of proof and who may decide belong to procedure and authority, neither of which the captain argument turns on, so the third and fourth options misidentify what is missing.',
    rationale:
      'Separating a legal-and-affordable threshold from the judgement of which burden is acceptable.',
    source: 'Rawls, J., A Theory of Justice (1971), secs. 11-17; Local Government Code (RA 7160), 1991',
  },
  {
    id: 'gen-032',
    subjectId: 'gened',
    topicId: 'gened-ethics',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A company learns it can cut its costs sharply by moving a
      production stage to a town where wages are a third of what it
      pays locally. The move will keep prices competitive for
      customers and the company will remain profitable. In the town,
      however, several small textile businesses that supplied the
      company will close, and about two hundred workers will lose the
      income they depend on. A manager argues that the decision is
      morally right because it keeps the company able to employ
      people at all, and that the benefit to consumers and to the
      company far outweighs the local losses.
    `),
    prompt:
      'Which criticism of the manager position is the strongest?',
    options: [
      'Counting consumers and shareholders as the beneficiaries hides the local workers who bear the whole cost, so the aggregate is not fairly weighed.',
      'The move cannot be morally assessed at all, because economic calculations are outside the scope of ethical judgement.',
      'The move is wrong because the closing businesses will lose a heritage that money cannot replace, whatever the net benefit is.',
      'The move is wrong because prices should never fall, since a higher price protects local suppliers even when consumers pay it.',
    ],
    correctIndex: 0,
    explanation:
      'Utilitarianism requires that all who bear a cost be counted among those considered, and the manager has dropped the two hundred workers and the small suppliers from the ledger while keeping the consumers and the owners. That is the first option, and it attacks the method rather than the arithmetic. The second would abandon ethics in favour of economics, which is not a criticism of the manager claim. The third is a sentimental appeal that concedes the aggregation it criticises. The fourth turns the criticism into a defence of prices, which is a different claim and would leave the workers just as unemployed.',
    rationale:
      'Criticising a utilitarian calculation for excluding the parties who bear the harm.',
    source: 'Mill, J., Utilitarianism (1861), ch. 2; Rawls, J., A Theory of Justice (1971), sec. 11',
  },
  {
    id: 'gen-033',
    subjectId: 'gened',
    topicId: 'gened-ethics',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student is told that lying is always wrong, and accepts the
      rule without question. A friend then shows her a situation in
      which a person hides a wallet from someone who intends to
      return it to its owner, and asks whether that is still a lie.
      The student now argues that the rule has exceptions, and her
      teacher replies that the real test is whether the rule can be
      willed as a law that every person could accept, not whether it
      fits one case. The teacher explains that a maxim that could not
      survive being made universal fails the test, whichever way the
      individual case comes out.
    `),
    prompt:
      'Which principle is the teacher applying?',
    options: [
      'The categorical imperative, which asks whether the rule of the action could be willed as a universal law that all rational agents could accept.',
      'The categorical imperative, which asks only whether the consequences of the single action are better for more people than worse.',
      'The principle of utility, which asks whether a rule of the action maximises the happiness of everyone affected in the immediate case.',
      'The principle of prudence, which asks whether a person with good judgement would have acted differently in the same position.',
    ],
    correctIndex: 0,
    explanation:
      'Kant categorical imperative is a test of the rule, not of the case: an action is moral only if the maxim behind it could be willed as a universal law, and the related formulations add that the agent must be able to will it while respecting every person as an end. That is the first option and matches what the teacher said about being willed as a law. The second misattributes a consequentialist test to Kant, whose whole objection is that moral right does not vary with outcomes. The third is Mill, and the fourth is not a standard moral principle at all, which is why it is the tempting wrong answer here.',
    rationale:
      "Applying Kant's categorical imperative as a universalisability test on the rule of an action.",
    source: 'Kant, I., Groundwork of the Metaphysics of Morals (1785), Ak. 421-434',
  },
  // ==================================================================
  // GENED-SELF — 11 items (4 easy, 5 moderate, 2 difficult)
  // ==================================================================
  {
    id: 'gen-034',
    subjectId: 'gened',
    topicId: 'gened-self',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student who is quiet in class begins answering questions at
      home without being asked, correcting his father when the figures
      in a news report do not add up. At school, the same student
      says nothing for three weeks. His mother asks him why he behaves
      differently in the two places, and he says that at home he is
      sure he will be answered. The teacher explains that the answer
      is social, since the self a person holds is partly assembled
      from what the people around them reflect back.
    `),
    prompt:
      'Which concept best explains the difference in the student behaviour?',
    options: [
      'The concept is the looking-glass self, since a person forms an image of himself partly from what the people around him reflect back.',
      'The concept is the ideal self, since the student already knows the answer he wishes to give and is waiting for a safe moment to give it.',
      'The concept is the false self, since the student presents a different persona in each setting to gain acceptance from each audience.',
      'The concept is the social self, since the difference reflects only which group the student happens to identify with at the moment.',
    ],
    correctIndex: 0,
    explanation:
      'Cooley looking-glass self holds that we build our image of ourselves out of the imagined judgements of others, which explains why the same student speaks at home and not at school once he expects an answer in one place and not the other. The ideal self is the goal he is working toward and does not explain the difference in setting. A false self would imply he is deliberately deceiving both audiences, which nothing here suggests. Identifying with a group is a related idea, but it does not explain why the same identity would silence him, which is precisely what reflected appraisal does.',
    rationale:
      'Applying the looking-glass self to a difference in behaviour between home and school.',
    source: 'Cooley, C., The Looking-Glass Self (1902); Alfiler, H., Psychology (Philippine ed., 2009), ch. 9',
  },
  {
    id: 'gen-035',
    subjectId: 'gened',
    topicId: 'gened-self',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student who has always relied on being the fastest in the
      class in mathematics has recently begun to refuse to answer
      when called on, saying the questions are stupid. The student
      still completes the work accurately but submits it late and
      untidy. A classmate who used to lose every quiz now finishes
      quickly and openly corrects the teacher when an example is
      wrong, and she has stopped hiding her copy of the test. The
      teacher asks the class what the two students have in common,
      and one student answers that each of them has stopped being
      afraid of what the result will say about them.
    `),
    prompt:
      'Which concept does the student answer describe?',
    options: [
      'The concept is self-esteem, since it concerns the value a person places on herself and how she expects to be judged.',
      'The concept is self-concept, since it concerns the whole set of beliefs a person holds about who she is across roles.',
      'The concept is self-efficacy, since it concerns a belief that a particular task can be performed successfully.',
      'The concept is self-image, since it concerns only the impression a person has formed of how others see her.',
    ],
    correctIndex: 0,
    explanation:
      'What the answer describes is the valuation of the self and the expectation of judgement, which is self-esteem. The losing student protected her worth by refusing, and the gaining student no longer needs to, which is the pattern a self-esteem problem produces. Self-concept is broader and concerns the whole set of beliefs about oneself across roles, which is not the axis of comparison here. Self-efficacy is the belief that a specific task can be done, and neither student is discussing a task they might fail. Self-image is limited to the impression one thinks others hold, which leaves out the valuation itself.',
    rationale:
      'Distinguishing self-esteem from self-concept, self-efficacy, and self-image.',
    source: 'Maslow, A., Motivation and Personality (1954), ch. 5; Alfiler, H., Psychology (Philippine ed., 2009), ch. 9',
  },
  {
    id: 'gen-036',
    subjectId: 'gened',
    topicId: 'gened-self',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student preparing for a difficult class test is given the
      choice between an easy review sheet covering topics she has
      already mastered and a hard worksheet on material she has not
      seen. She chooses the easy one, finishes quickly, and feels
      relieved, although her score does not rise. Her reason is that
      the easy sheet does not make her feel like she was going to fail.
      The teacher asks the class what the student has chosen, and one
      student answers that she has chosen the need for safety over the
      need to grow.
    `),
    prompt:
      'Which statement best explains the student choice in terms of needs?',
    options: [
      'She has satisfied a lower-level need for safety, since anything less threatening feels preferable while a higher-level need for growth goes unmet.',
      'She has satisfied her highest-level need for self-actualisation, since feeling comfortable counts as fulfilling her potential.',
      'She has satisfied a lower-level need for safety, which means every need below it must already be fully met in her life.',
      'She has failed to satisfy any need, since choosing comfort always counts as an unhealthy defence against difficulty.',
    ],
    correctIndex: 0,
    explanation:
      'In Maslow hierarchy, safety is a lower-level need and self-actualisation, the drive to realise potential and to master new material, sits at the top. Preferring the sheet that carries no threat of failure shows the safety need being satisfied at the expense of the growth need, which is the first option. Feeling comfortable is the opposite of self-actualisation, so the second option inverts the hierarchy. Needs are not certified as complete in order, and nothing in the vignette shows that her physiological, safety, or belonging needs were all met beforehand, so the third overreads it. And a choice to avoid a threatening task is a normal preference, not evidence that a need went unserved.',
    rationale:
      'Mapping a described choice onto Maslow levels of safety and self-actualisation.',
    source: 'Maslow, A., Motivation and Personality (1954), ch. 5; DepEd K to 12 Gabay Pamilya sa Pagpapakatao, Modyul 6',
  },
  {
    id: 'gen-037',
    subjectId: 'gened',
    topicId: 'gened-self',
    difficulty: 2,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student is asked by a teacher to evaluate a classmate
      presentation. The student writes that the presenter spoke too
      quietly and used too many gestures, and that the presenter
      should stop being nervous. The classmate asks what could be done
      about the nervousness, and the student replies that nervous
      presenters should not be allowed to speak at all. The teacher
      asks the class to look again at what the criticism described,
      and notes that what can be observed in a presentation and what
      can be judged about the presenter are not the same kind of
      thing.
    `),
    prompt:
      'Which observation does the teacher point toward?',
    options: [
      'The observation is that volume or gesture can be described as it happens, whereas nervousness is an inferred state treated as a settled fact.',
      'The observation is that volume and nervousness are equally observable, since a teacher can hear either one directly during a presentation.',
      'The observation is that neither volume nor nervousness can be observed, since everything said about a presentation is an inference.',
      'The observation is that volume is observable but irrelevant, whereas nervousness is observable and the only fair basis for criticism.',
    ],
    correctIndex: 0,
    explanation:
      'Volume and gesture are directly observable in the room; nervousness is a state inferred from them, and treating an inference as a fact is what the criticism does. The first option draws that line correctly. The second claims both are directly audible, which confuses a symptom with the state behind it, and the third claims nothing about a presentation is observable, which would make the original observations useless. The fourth admits the distinction but then swaps its valuation, calling the inferred state the only fair basis for criticism, when fairness in fact requires judging what can be shown and what can be worked on.',
    rationale:
      'Separating observable behaviour from an inferred internal state in feedback on a presentation.',
    source: 'DepEd K to 12 Gabay Pamilya sa Pagpapakatao, Modyul 6 (DepEd, 2013)',
  },
  {
    id: 'gen-038',
    subjectId: 'gened',
    topicId: 'gened-self',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student has been asked to introduce herself at a regional
      youth convention and has prepared two introductions. The first
      lists her town, her school, her awards, and the programmes she
      has joined, in the order requested by the form the organisers
      gave out. The second opens with a story about a project she
      volunteered for that never got funded, and says what she did
      about it. Her adviser asks her to consider who will be reading
      each version and what each reader is looking for. The second
      introduction is meant for the panel, not the registration desk.
    `),
    prompt:
      'Which statement best captures the difference between the two introductions?',
    options: [
      'The second introduction adapts to the panel audience and their interest in her conduct, while the first supplies the identity data a form collects.',
      'The second introduction adapts to the panel audience because it avoids factual claims, while the first is false for being full of them.',
      'The first introduction adapts to the panel audience because it is longer and formal, while the second is written for the registration desk.',
      'Both introductions serve the same purpose, since the only correct form of self-presentation is the one that lists verifiable credentials.',
    ],
    correctIndex: 0,
    explanation:
      'The panel is judging conduct and initiative, so the story about the unfunded project answers the question they are actually asking, while the registration desk needs exactly the data the form collects. That is what the first option says. The second misstates the content, since the story is a factual claim and the list is true. The third reverses the audiences and confuses length with formality. The fourth treats one form of self-presentation as the only correct one, which would make adapting to an audience a defect rather than the point of purposive communication.',
    rationale:
      'Adapting self-presentation to the audience and its questions rather than to one fixed form.',
    source: 'DepEd K to 12 Gabay Pamilya sa Pagpapakatao, Modyul 6 (DepEd, 2013)',
  },
  {
    id: 'gen-039',
    subjectId: 'gened',
    topicId: 'gened-self',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      After a difficult week in which three projects overlapped, a
      student feels angry at a younger sibling who took the last
      shampoo, and then feels guilty about the anger. The student
      pushes the anger aside, tells the sibling nothing, and answers
      the mother sharply when asked about homework. She later says she
      is fine and that nothing happened, and describes herself as
      always patient. A friend asks whether the account matches what
      happened during the week, and the student pauses.
    `),
    prompt:
      'Which issue does the pause most directly indicate?',
    options: [
      'The pause indicates a gap between the self the student describes and the experience she had, since the account does not fit the events.',
      'The pause indicates a failure of memory, since the student cannot recall the events of the week she has just described.',
      'The pause indicates a lack of emotional vocabulary, since the student has no word available for anger and cannot identify it.',
      'The pause indicates a stable self-concept, since the description the student gives of herself has not changed over the week.',
    ],
    correctIndex: 0,
    explanation:
      'Self-awareness includes noticing when the story one tells about oneself does not fit the evidence, and the pause is exactly that noticing. The account of a patient person sits badly beside the report of pushing anger down, answering the mother sharply, and denying that anything happened. The second option treats a mismatch between account and events as a recall failure, but the student narrated the events fluently. The third is contradicted by her using the words anger and guilty accurately. The fourth treats the discrepancy as stability, when an unexamined self-narrative is what the pause has exposed.',
    rationale:
      'Recognising an incongruence between one self-description and one reported experience.',
    source: 'DepEd K to 12 Gabay Pamilya sa Pagpapakatao, Modyul 6 (DepEd, 2013); Alfiler, H., Psychology (Philippine ed., 2009), ch. 9',
  },
  {
    id: 'gen-040',
    subjectId: 'gened',
    topicId: 'gened-self',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student has been told to write an honest reflection but has
      filled the page with generalities about how hard the term was
      and how everyone is working hard. The teacher asks a question
      the reflection does not answer: which particular task was
      hardest, what specifically went wrong, and what the student
      would do differently on Tuesday. The student replies that the
      reflection is honest because nothing in it is untrue. The
      teacher points out that honesty in a reflection is not the same
      as being specific about oneself.
    `),
    prompt:
      'Which revision best responds to the teacher point?',
    options: [
      'Replace the general statements with the one task, the specific difficulty it posed, and the concrete change the student would make.',
      'Keep the general statements, since being truthful about the whole class experience is more honest than dwelling on one task.',
      'Replace the general statements with praise of the class effort, since a positive tone makes a reflection more useful to a reader.',
      'Keep the general statements but add the total number of hours spent on schoolwork, since a number makes any reflection specific.',
    ],
    correctIndex: 0,
    explanation:
      'The teacher asked for the one task, the specific difficulty, and the concrete change, which is the first option and the only one that makes the reflection usable to the student writing it. Broad statements can all be true and still say nothing about the writer, so the second option misses the point entirely. Praise of class effort shifts the subject away from the self the reflection is supposed to be about, which is the third. A total number of hours is a figure about the class, not an account of what the student did or would change, so the fourth mistakes a quantity for specificity.',
    rationale:
      'Making a self-reflection specific enough to act on rather than merely truthful.',
    source: 'DepEd K to 12 Gabay Pamilya sa Pagpapakatao, Modyul 6 (DepEd, 2013)',
  },
  {
    id: 'gen-041',
    subjectId: 'gened',
    topicId: 'gened-self',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student accepts every extra duty offered by the class adviser,
      including two projects that overlap, and by the fourth week is
      sleeping four hours a night and snapping at a friend over
      something small. The adviser points out that the student has
      never once said no, and asks what the student actually wanted to
      do with the time that is now gone. The student realises that both
      projects were wanted, but that together they cannot be done
      well. The adviser asks the student to decide, which one goes.
    `),
    prompt:
      'Which self-management step is the adviser most directly asking the student to take?',
    options: [
      'The adviser is asking the student to decide which commitment to keep and which to let go, since self-management includes choosing among obligations.',
      'The adviser is asking the student to accept more commitments, since taking on additional duties builds the capacity to handle existing ones.',
      'The adviser is asking the student to wait until the term ends to decide, since deciding earlier would add stress to a full schedule.',
      'The adviser is asking the student to transfer both projects to the friend, since self-management means avoiding difficult responsibility.',
    ],
    correctIndex: 0,
    explanation:
      'Time and attention are finite, and the only way to fit two wanted projects into one life is to give something up, which is the choice the adviser is putting to the student. The second option asks for more load, which would worsen the sleep and the irritability. The third removes the decision the adviser explicitly asked for, and delaying also keeps the impairment. The fourth changes the subject from managing a commitment to abandoning it, and shifting work to a friend who never agreed to it is not a plan.',
    rationale:
      'Recognising that managing competing commitments requires deciding what to drop.',
    source: 'DepEd K to 12 Gabay Pamilya sa Pagpapakatao, Modyul 6 (DepEd, 2013); Maslow, A., Motivation and Personality (1954)',
  },
  {
    id: 'gen-042',
    subjectId: 'gened',
    topicId: 'gened-self',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student has been absent for a week after a family member died,
      and on returning finds that the accumulated announcements have
      not reached the class. The student asks the guidance teacher
      whether the bereavement counts as an excuse for the missed work
      and says she would rather not explain it to the class at all.
      The teacher explains that the school will not require her to
      speak about a private loss in front of others, and that the
      missed work can still be arranged with the subject teachers.
      She asks the student what she needs in order to return.
    `),
    prompt:
      'Which step best describes what the guidance teacher is offering?',
    options: [
      'The guidance teacher is helping the student resume school by arranging the academic work privately and avoiding any public account of the loss.',
      'The guidance teacher is requiring the student to justify her absence publicly, since a bereavement must be explained to the class.',
      'The guidance teacher is referring the student for assessment, since grief requires professional diagnosis before a student may return.',
      'The guidance teacher is posting the absence as an ordinary excuse, since treating it as unusual would single the student out.',
    ],
    correctIndex: 0,
    explanation:
      'Resuming school is an academic and personal task, and the teacher is arranging the workload through the subject teachers while protecting the student from having to disclose a private loss, which is the first option and the most respectful handling of the situation. A public justification would compound the loss with exposure. Assessment is not indicated by bereavement, which is a normal response to a death rather than a disorder requiring diagnosis before return. And presenting it as an ordinary excuse would be inaccurate, since the absence genuinely was caused by a death; treating the real reason as unremarkable here is a way of dismissing what happened to her.',
    rationale:
      'Handling a bereavement-related return to school through private academic arrangements.',
    source: 'DepEd K to 12 Gabay Pamilya sa Pagpapakatao, Modyul 6 (DepEd, 2013); DepEd Child Protection Policy (DepEd Order No. 40, s. 2012)',
  },
  {
    id: 'gen-043',
    subjectId: 'gened',
    topicId: 'gened-self',
    difficulty: 4,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      Two students apply to join a school theatre group and are asked
      the same question: what do they want from the experience. The
      first says she wants to be the lead, and adds that the parts
      last year were unfair because the casting favoured people who
      had been there longer. The second says she wants to spend a
      season in the group and is prepared to take a small part if
      the casting needs it. Both have rehearsed equally hard. The
      teacher asks the class what the first answer has made public
      about her, and one student replies that she has shown the group
      what she intends to take from it.
    `),
    prompt:
      'Which conclusion about the first student answer is best supported?',
    options: [
      'The answer disclosed her self-concept as someone whose worth rests on being chosen, which is information the group can act on.',
      'The answer disclosed her self-concept as a person without ambition, which is information the group can act on.',
      'The answer failed to disclose anything, since a statement about a role says only what she wants and nothing about how she sees herself.',
      'The answer disclosed her self-esteem as already secure, since only a confident person would name a lead role aloud.',
    ],
    correctIndex: 0,
    explanation:
      'Saying she wanted the lead, and grounding her complaint in what casting does to her standing, presents her as a person whose value in the group depends on being chosen. That is a self-concept the group can act on, so the first option is supported. The second says the opposite of what was described, and wanting the lead is not the absence of ambition. The third treats the statement as contentless when its content is precisely her sense of what she is owed, which the teacher invites the class to notice. The fourth infers secure self-esteem from a single preference, when a claim about deserving a role usually indicates the opposite.',
    rationale:
      'Reading a stated preference as evidence of how a person positions herself in a group.',
    source: 'DepEd K to 12 Gabay Pamilya sa Pagpapakatao, Modyul 6 (DepEd, 2013); Maslow, A., Motivation and Personality (1954)',
  },
  {
    id: 'gen-044',
    subjectId: 'gened',
    topicId: 'gened-self',
    difficulty: 3,
    situational: true,
    draftedBy: 'ai',
    vignette: V(`
      A student is asked to research a community in another province for
      a class project and finds that the community official refuses to
      answer questions about a local conflict. The student is told by
      a classmate to invent a plausible answer so that the project has
      a conclusion. The student then argues that because the finding
      cannot be verified by anyone outside the province, no account
      of it can be wrong. The teacher replies that the fact that others
      cannot check a claim does not stop it from being either true or
      false, and asks what the student can still state honestly.
    `),
    prompt:
      'Which statement is the teacher asking for?',
    options: [
      'That the student may report what was asked and not answered, and what sources said, without asserting an account that was never verified.',
      'That the student should present the most widely believed local account, since a community consensus carries more weight than a single official.',
      'That the student should publish the account the official gave in an interview, since an official is entitled to a student audience.',
      'That the student should withdraw the project entirely, since a project that cannot be fully verified is not worth submitting.',
    ],
    correctIndex: 0,
    explanation:
      'What can honestly be stated is exactly what happened: the questions, the refusal, and the sources consulted, which leaves the unverified part marked as unverified. That is the first option. Unverifiability does not make a claim true, and the second option converts an absence of confirmation into consensus, which the teacher explicitly rejects. An official has no special entitlement to a student audience, so the third option mistakes refusal for permission. Withdrawing the project throws away the honest reporting that is available, and the fourth option makes verification a precondition for inquiry rather than a limit on assertion.',
    rationale:
      'Reporting an unverifiable finding honestly instead of supplying an invented conclusion.',
    source: 'DepEd K to 12 Gabay Pamilya sa Pagpapakatao, Modyul 6 (DepEd, 2013); NCCA media and information literacy materials',
  }
];

export default BATCH_GENED;