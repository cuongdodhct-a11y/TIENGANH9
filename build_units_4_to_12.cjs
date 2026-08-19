const fs = require('fs');

const UNITS = [
  {
    id: 4,
    title: 'Unit 4: Remembering the Past',
    theme: 'Nhớ về quá khứ & Di sản truyền thống',
    description: 'Học về cuộc sống xưa, phong tục gia đình, cấu trúc Used to / Didn’t use to và thì Quá khứ hoàn thành (Past Perfect).',
    pronunciationFocus: 'Ngữ âm: Cách phát âm đuôi -ed và ngữ điệu câu hỏi quá khứ',
    badgeIconName: 'BookOpen',
    vocabulary: [
      { id: 'u4-v1', word: 'preserve traditions', phonetic: '/prɪˈzɜːv trəˈdɪʃənz/', partOfSpeech: 'verb', vietnameseMeaning: 'gìn giữ các phong tục truyền thống', englishExample: 'Villagers gather annually to preserve traditions and honor their ancestors.', vietnameseExample: 'Dân làng tập hợp hàng năm để gìn giữ truyền thống và tôn vinh tổ tiên.' },
      { id: 'u4-v2', word: 'family generations', phonetic: '/ˈfæmɪli ˌʤɛnəˈreɪʃənz/', partOfSpeech: 'noun', vietnameseMeaning: 'các thế hệ trong gia đình', englishExample: 'Three family generations lived harmoniously under one thatched roof.', vietnameseExample: 'Ba thế hệ gia đình đã cùng chung sống hòa thuận dưới một mái nhà tranh.' },
      { id: 'u4-v3', word: 'ancestor', phonetic: '/ˈænsɛstə/', partOfSpeech: 'noun', vietnameseMeaning: 'tổ tiên, ông bà cụ kỵ', englishExample: 'We show deep gratitude to our ancestors during the Lunar New Year.', vietnameseExample: 'Chúng tôi bày tỏ lòng biết ơn sâu sắc đến tổ tiên trong dịp Tết Nguyên Đán.' },
      { id: 'u4-v4', word: 'historical monument', phonetic: '/hɪsˈtɒrɪkəl ˈmɒnjʊmənt/', partOfSpeech: 'noun', vietnameseMeaning: 'di tích lịch sử', englishExample: 'The Imperial Citadel of Thang Long is a priceless historical monument.', vietnameseExample: 'Hoàng thành Thăng Long là một di tích lịch sử vô giá.' },
      { id: 'u4-v5', word: 'barefoot', phonetic: '/ˈbeəfʊt/', partOfSpeech: 'adverb', vietnameseMeaning: 'chân trần, đi chân đất', englishExample: 'Children in past decades used to walk barefoot to village schools.', vietnameseExample: 'Trẻ em những thập kỷ trước từng đi chân trần đến trường làng.' },
      { id: 'u4-v6', word: 'extended family', phonetic: '/ɪksˈtɛndɪd ˈfæmɪli/', partOfSpeech: 'noun', vietnameseMeaning: 'đại gia đình (nhiều thế hệ)', englishExample: 'Living in an extended family provided strong emotional support for children.', vietnameseExample: 'Sống trong một đại gia đình mang lại sự hỗ trợ tinh thần vững chắc cho con trẻ.' },
      { id: 'u4-v7', word: 'thatched house', phonetic: '/θæʧt haʊs/', partOfSpeech: 'noun', vietnameseMeaning: 'nhà tranh mái lá', englishExample: 'Most villagers in the nineteenth century lived in simple thatched houses.', vietnameseExample: 'Hầu hết dân làng ở thế kỷ 19 sống trong những ngôi nhà tranh mái lá đơn sơ.' },
      { id: 'u4-v8', word: 'folk game', phonetic: '/fəʊk ɡeɪm/', partOfSpeech: 'noun', vietnameseMeaning: 'trò chơi dân gian (ô ăn quan, trốn tìm...)', englishExample: 'Children enjoyed playing folk games like tug of war during village festivals.', vietnameseExample: 'Trẻ em thích chơi các trò chơi dân gian như kéo co trong các lễ hội làng.' }
    ],
    grammar: {
      title: 'Cấu trúc Used to & Thì Quá khứ hoàn thành (Past Perfect)',
      summary: 'Used to diễn tả thói quen hoặc trạng thái trong quá khứ đã chấm dứt. Quá khứ hoàn thành (had + V3/ed) diễn tả hành động xảy ra trước một hành động khác trong quá khứ.',
      formulaBox: [
        '(+) S + used to + V-bare | (-) S + didn’t use to + V-bare | (?) Did + S + use to + V-bare?',
        'S + had + V3/ed (Xảy ra trước) BEFORE S + V2/ed (Xảy ra sau)'
      ],
      usagePoints: [
        { title: '1. Thói quen quá khứ với Used to', detail: 'Dùng used to để so sánh giữa cuộc sống ngày xưa và ngày nay.', example: 'People used to write handwritten letters before emails were invented.' },
        { title: '2. Quá khứ hoàn thành (Past Perfect)', detail: 'Diễn tả hành động hoàn tất trước một mốc thời gian hoặc trước một hành động khác trong quá khứ.', example: 'By the time electric lights arrived in the village, people had used oil lamps for decades.' }
      ],
      exercises: [
        { id: 'u4-g1', question: 'People in the countryside _____ travel on foot before paved roads were built.', options: ['A. used to', 'B. are used to', 'C. use to', 'D. get used to'], correctAnswer: 'A. used to', explanation: 'Thói quen trong quá khứ nay không còn: "used to + V-bare".' },
        { id: 'u4-g2', question: 'By the time my grandfather retired, he _____ as a craftsman for forty years.', options: ['A. had worked', 'B. worked', 'C. has worked', 'D. was working'], correctAnswer: 'A. had worked', explanation: 'Hành động xảy ra trước thời điểm "retired" trong quá khứ chia Quá khứ hoàn thành (had worked).' },
        { id: 'u4-g3', question: 'Did your grandmother _____ wear traditional ao dai on ordinary days?', options: ['A. use to', 'B. used to', 'C. using to', 'D. uses to'], correctAnswer: 'A. use to', explanation: 'Trong câu hỏi với trợ động từ Did, dùng "use to" (dạng nguyên thể).' },
        { id: 'u4-g4', question: 'Before modern refrigerators were invented, people _____ food using natural salt.', options: ['A. had preserved', 'B. preserved', 'C. have preserved', 'D. were preserving'], correctAnswer: 'A. had preserved', explanation: 'Hành động bảo quản đồ ăn xảy ra trước khi tủ lạnh được phát minh.' },
        { id: 'u4-g5', question: 'Children in our village didn’t _____ have smartphones to play digital games.', options: ['A. use to', 'B. used to', 'C. using to', 'D. uses to'], correctAnswer: 'A. use to', explanation: 'Sau "didn’t" dùng "use to".' },
        { id: 'u4-g6', question: 'When we visited the ancient village, the old communal house _____ restored beautifully.', options: ['A. had been', 'B. was being', 'C. has been', 'D. is'], correctAnswer: 'A. had been', explanation: 'Ngôi đình đã được trùng tu xong trước thời điểm chúng tôi đến thăm (had been restored).' }
      ]
    },
    listening: {
      audioTitle: 'Ký Ức Làng Quê 50 Năm Trước (Memories of Village Life)',
      audioDuration: '2:40',
      audioScriptSpeaker: 'Grandpa Tuan & Grandson Long',
      transcriptText: "Long: Grandpa, what was daily life like in our village when you were my age?\nGrandpa Tuan: Oh, life was much simpler back then, Long! We didn't have electricity or smartphones. In the evenings, families gathered around kerosene oil lamps to tell folklore stories.\nLong: Did children use to walk to school barefoot?\nGrandpa Tuan: Yes, we walked along muddy pathways without shoes. After school, we helped our parents in the rice paddy fields and played folk games like dragon-snake in the moonlight.\nLong: That sounds like a wonderful community bond!",
      vietnameseTranslation: "Long: Ông ơi, cuộc sống hàng ngày ở làng mình như thế nào khi ông bằng tuổi cháu ạ?\nÔng Tuấn: Ồ, cuộc sống ngày ấy giản dị hơn nhiều, Long à! Chúng ta chưa có điện hay điện thoại thông minh. Vào buổi tối, các gia đình quây quần bên đèn dầu hỏa để kể chuyện dân gian.\nLong: Ngày xưa trẻ em có đi bộ chân trần đến trường không ông?\nÔng Tuấn: Có chứ, chúng ông đi bộ dọc theo những con đường đất bùn không có giày dép. Sau giờ học, chúng ông giúp bố mẹ trên đồng lúa và chơi các trò dân gian như rồng rắn lên mây dưới ánh trăng.\nLong: Nghe thật gắn kết tình làng nghĩa xóm tuyệt vời!",
      questions: [
        { id: 'u4-l1', question: 'What did families use for lighting in the evenings fifty years ago?', options: ['A. Modern solar lamps', 'B. Kerosene oil lamps', 'C. Electric flashlights', 'D. Computer screens'], correctAnswerIndex: 1, explanation: 'Trong bài nghe: "families gathered around kerosene oil lamps to tell folklore stories."' },
        { id: 'u4-l2', question: 'How did children travel to school back then?', options: ['A. By private air-conditioned cars', 'B. By walking barefoot along muddy pathways', 'C. By electric scooters', 'D. By high-speed trains'], correctAnswerIndex: 1, explanation: 'Trong bài nghe: "we walked along muddy pathways without shoes."' },
        { id: 'u4-l3', question: 'What activities did children do after school?', options: ['A. Playing video games in bedrooms', 'B. Helping parents in paddy fields and playing folk games', 'C. Shopping at supermarkets', 'D. Watching television all evening'], correctAnswerIndex: 1, explanation: 'Trong bài nghe: "helped our parents in the rice paddy fields and played folk games like dragon-snake in the moonlight."' },
        { id: 'u4-l4', question: 'What feeling does Long express about life in the past?', options: ['A. Disgusted', 'B. Admiring the wonderful community bond', 'C. Scared', 'D. Angry'], correctAnswerIndex: 1, explanation: 'Long nói: "That sounds like a wonderful community bond!"' }
      ],
      fillInBlankExercises: [
        { id: 'u4-f1', sentenceWithBlank: 'Families used to gather around kerosene _____ lamps in the evening.', correctWord: 'oil', hint: 'Loại đèn đốt bằng dầu' },
        { id: 'u4-f2', sentenceWithBlank: 'Children in the past played _____ games like tug of war.', correctWord: 'folk', hint: 'Từ chỉ tính chất dân gian' }
      ]
    },
    speakingPrompts: [
      { id: 'u4-s1', targetSentence: 'My grandparents used to cook traditional meals on wood-burning stoves every evening.', ipa: '/maɪ ˈɡrænˌpeərənts juːst tuː kʊk trəˈdɪʃənl miːlz ɒn wʊd-ˈbɜːnɪŋ stəʊvz ˈɛvri ˈiːvnɪŋ/', vietnameseMeaning: 'Ông bà tôi đã từng nấu các bữa ăn truyền thống trên bếp củi vào mỗi buổi tối.', contextSituation: 'Kể về thói quen sinh hoạt xưa của thế hệ ông bà.', keyPhonicsFocus: 'Luyện phát âm cụm "used to" /juːst tuː/ và âm /v/ trong "stoves".', sampleAudioText: 'My grandparents used to cook traditional meals on wood-burning stoves every evening.' },
      { id: 'u4-s2', targetSentence: 'Children in the past had fun playing traditional folk games under the bright moonlight.', ipa: '/ˈʧɪldrən ɪn ðə pɑːst hæd fʌn ˈpleɪɪŋ trəˈdɪʃənl fəʊk ɡeɪmz ˈʌndə ðə braɪt ˈmuːnlaɪt/', vietnameseMeaning: 'Trẻ em ngày xưa vui vẻ chơi các trò chơi dân gian truyền thống dưới ánh trăng sáng.', contextSituation: 'Hồi tưởng về tuổi thơ thanh bình và giản dị của các thế hệ trước.', keyPhonicsFocus: 'Phát âm chuẩn âm /l/ trong "moonlight" và âm /k/ trong "folk".', sampleAudioText: 'Children in the past had fun playing traditional folk games under the bright moonlight.' },
      { id: 'u4-s3', targetSentence: 'Preserving family values and respecting elders are deep-rooted Vietnamese traditions.', ipa: '/prɪˈzɜːvɪŋ ˈfæmɪli ˈvæljuːz ænd rɪsˈpɛktɪŋ ˈɛldəz ɑː diːp-ˈruːtɪd ˌvjɛtnəˈmiːz trəˈdɪʃənz/', vietnameseMeaning: 'Gìn giữ các giá trị gia đình và kính trọng người lớn tuổi là những truyền thống ăn sâu của người Việt.', contextSituation: 'Nêu ý nghĩa đạo lý uống nước nhớ nguồn của dân tộc.', keyPhonicsFocus: 'Phát âm chuẩn trọng âm "respecting" /rɪsˈpɛktɪŋ/ và "traditions".', sampleAudioText: 'Preserving family values and respecting elders are deep-rooted Vietnamese traditions.' },
      { id: 'u4-s4', targetSentence: 'Before modern transport arrived, villagers had traveled mainly by wooden rowboats.', ipa: '/bɪˈfɔː ˈmɒdən ˈtrænspɔːt əˈraɪvd ˈvɪlɪʤəz hæd ˈtrævld ˈmeɪnli baɪ ˈwʊdn ˈrəʊbəʊts/', vietnameseMeaning: 'Trước khi có giao thông hiện đại, dân làng đã đi lại chủ yếu bằng thuyền chèo gỗ.', contextSituation: 'So sánh phương tiện đi lại giữa quá khứ và hiện tại.', keyPhonicsFocus: 'Phát âm đuôi /vd/ trong "arrived" và "traveled".', sampleAudioText: 'Before modern transport arrived, villagers had traveled mainly by wooden rowboats.' },
      { id: 'u4-s5', targetSentence: 'Historical monuments remind young generations of the courage and sacrifices of our ancestors.', ipa: '/hɪsˈtɒrɪkəl ˈmɒnjʊmənts rɪˈmaɪnd jʌŋ ˌʤɛnəˈreɪʃənz ɒv ðə ˈkʌrɪʤ ænd ˈsækrɪfaɪsɪz ɒv ˈaʊər ˈænsɛstəz/', vietnameseMeaning: 'Các di tích lịch sử nhắc nhở thế hệ trẻ về lòng dũng cảm và sự hy sinh của tổ tiên chúng ta.', contextSituation: 'Bày tỏ lòng tri ân đối với các anh hùng lịch sử khi tham quan di tích.', keyPhonicsFocus: 'Phát âm chuẩn âm /s/ trong "sacrifices" và "ancestors".', sampleAudioText: 'Historical monuments remind young generations of the courage and sacrifices of our ancestors.' }
    ],
    reading: {
      title: 'Khoảng Cách Thế Hệ & Sự Thay Đổi Trong Nếp Sống Gia Đình',
      topic: 'Văn hóa gia đình & Sự biến chuyển xã hội',
      passageText: "In traditional Vietnamese society, extended families consisting of three or even four generations living together were the cultural norm. Grandparents cared for grandchildren, passed down folk tales, and taught moral lessons while parents worked in agriculture.\n\nToday, modern urbanization has shifted family dynamics toward nuclear families. Young couples often live independently in city apartments. Consequently, children have fewer daily interactions with their grandparents.\n\nDespite these changes, core family values such as filial piety and respect for elders remain steadfast. During traditional holidays like Tet, millions of Vietnamese travel back to ancestral hometowns to reunite, ensuring the heritage of family solidarity endures.",
      keyVocabularyHighlights: [
        { word: 'cultural norm', meaning: 'chuẩn mực văn hóa phổ biến' },
        { word: 'nuclear family', meaning: 'gia đình hạt nhân (chỉ gồm cha mẹ và con cái)' },
        { word: 'filial piety', meaning: 'đạo hiếu, lòng hiếu thảo với cha mẹ ông bà' },
        { word: 'family solidarity', meaning: 'sự đoàn kết, gắn bó keo sơn trong gia đình' }
      ],
      questions: [
        { id: 'u4-r1', question: 'What was the traditional family structure in past Vietnamese society?', options: ['A. Only single parents', 'B. Extended families with three or four generations', 'C. Children living alone in boarding schools', 'D. Families without grandparents'], correctAnswerIndex: 1, explanation: 'Trong đoạn 1: "extended families consisting of three or even four generations living together were the cultural norm."' },
        { id: 'u4-r2', question: 'How has urbanization changed family living arrangements?', options: ['A. Everyone moved to rural villages', 'B. More nuclear families live independently in apartments', 'C. Grandparents no longer know their grandchildren', 'D. People stopped celebrating holidays'], correctAnswerIndex: 1, explanation: 'Trong đoạn 2: "shifted family dynamics toward nuclear families. Young couples often live independently in city apartments."' },
        { id: 'u4-r3', question: 'What traditional value remains strong despite modern changes?', options: ['A. Filial piety and respect for elders', 'B. Complete disregard for parents', 'C. Never returning home for Tet', 'D. Forgetting all ancient customs'], correctAnswerIndex: 0, explanation: 'Trong đoạn 3: "core family values such as filial piety and respect for elders remain steadfast."' },
        { id: 'u4-r4', question: 'Which word in paragraph 3 is closest in meaning to "endures"?', options: ['A. Dies out', 'B. Lasts / Continues to exist', 'C. Breaks apart', 'D. Vanishes'], correctAnswerIndex: 1, explanation: '"Endures" có nghĩa là tồn tại bền vững theo thời gian.' }
      ]
    },
    writing: {
      id: 'u4-w1',
      title: 'Write a paragraph describing how life in your hometown has changed compared to the past (60-80 words)',
      description: 'Viết một đoạn văn so sánh cuộc sống ở quê hương bạn ngày nay so với quá khứ (sử dụng cấu trúc used to).',
      suggestedOutline: [
        'Introduction: State what hometown you are talking about.',
        'Body: Describe 2-3 changes (roads, housing, technology, transport) using "used to".',
        'Conclusion: Give your thoughts on these positive developments.'
      ],
      usefulPhrases: [
        'Life in my hometown has changed significantly over the past decades...',
        'People used to travel on dirt roads, but now...',
        'Villagers used to live in thatched houses without electricity...',
        'In conclusion, these modern improvements have made life much more convenient.'
      ],
      wordLimit: '60 - 80 từ',
      sampleGrade10Response: 'Life in my hometown has transformed remarkably over the last fifty years. In the past, villagers used to live in simple thatched houses and travel on narrow dirt paths on foot. Today, asphalt roads connect every corner, and modern brick houses have replaced old cottages. Most families now own motorbikes, smartphones, and internet access. Although life was simpler in the past, I am delighted with the modern conveniences that improve our daily living standards.'
    }
  }
];

// Write unit 4
fs.writeFileSync('src/data/units/unit4.ts', 'import { UnitData } from "../../types";\n\nexport const UNIT_4_DATA: UnitData = ' + JSON.stringify(UNITS[0], null, 2) + ';\n');
console.log("Unit 4 written successfully");
