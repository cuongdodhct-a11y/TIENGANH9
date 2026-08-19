const fs = require('fs');

const UNITS = [
  {
    id: 1,
    title: 'Unit 1: Local Community',
    theme: 'Cộng đồng địa phương & Làng nghề truyền thống',
    description: 'Học về các hoạt động cộng đồng, làng nghề thủ công, động từ bất quy tắc và cụm động từ (Phrasal Verbs).',
    pronunciationFocus: 'Ngữ âm: Phát âm chuẩn âm /f/ và /v/',
    badgeIconName: 'Home',
    vocabulary: [
      { id: 'u1-v1', word: 'handicraft', phonetic: '/ˈhændikrɑːft/', partOfSpeech: 'noun', vietnameseMeaning: 'sản phẩm thủ công mỹ nghệ', englishExample: 'Pottery and silk weaving are popular handicrafts in Viet Nam.', vietnameseExample: 'Làm gốm và dệt lụa là những sản phẩm thủ công phổ biến ở Việt Nam.' },
      { id: 'u1-v2', word: 'artisan', phonetic: '/ˌɑːtɪˈzæn/', partOfSpeech: 'noun', vietnameseMeaning: 'nghệ nhân', englishExample: 'The artisan spent three months making this lacquerware vase.', vietnameseExample: 'Nghệ nhân đã dành ba tháng để làm chiếc bình sơn mài này.' },
      { id: 'u1-v3', word: 'pottery', phonetic: '/ˈpɒtəri/', partOfSpeech: 'noun', vietnameseMeaning: 'đồ gốm sứ', englishExample: 'Bat Trang is famous for its high-quality ceramic pottery.', vietnameseExample: 'Bát Tràng nổi tiếng với các sản phẩm đồ gốm sứ chất lượng cao.' },
      { id: 'u1-v4', word: 'preserve', phonetic: '/prɪˈzɜːv/', partOfSpeech: 'verb', vietnameseMeaning: 'bảo tồn, giữ gìn', englishExample: 'We should preserve our traditional craft villages for future generations.', vietnameseExample: 'Chúng ta nên bảo tồn các làng nghề truyền thống cho các thế hệ tương lai.' },
      { id: 'u1-v5', word: 'look after', phonetic: '/lʊk ˈɑːftə/', partOfSpeech: 'phrasal verb', vietnameseMeaning: 'chăm sóc, trông nom', englishExample: 'Community volunteers look after the elderly citizens in our neighborhood.', vietnameseExample: 'Tình nguyện viên cộng đồng chăm sóc những người cao tuổi trong xóm chúng tôi.' },
      { id: 'u1-v6', word: 'pass down', phonetic: '/pɑːs daʊn/', partOfSpeech: 'phrasal verb', vietnameseMeaning: 'truyền lại (qua các thế hệ)', englishExample: 'Craft skills are passed down from grandparents to grandchildren.', vietnameseExample: 'Kỹ năng làm nghề thủ công được truyền lại từ ông bà cho con cháu.' },
      { id: 'u1-v7', word: 'suburb', phonetic: '/ˈsʌbɜːb/', partOfSpeech: 'noun', vietnameseMeaning: 'vùng ngoại ô', englishExample: 'They moved to a quiet suburb near Ha Noi to enjoy fresh air.', vietnameseExample: 'Họ đã chuyển đến một vùng ngoại ô yên tĩnh gần Hà Nội để tận hưởng không khí trong lành.' },
      { id: 'u1-v8', word: 'community helper', phonetic: '/kəˈmjuːnəti ˈhɛlpə/', partOfSpeech: 'noun', vietnameseMeaning: 'người trợ giúp cộng đồng', englishExample: 'Garbage collectors are essential community helpers who keep our city clean.', vietnameseExample: 'Những người thu gom rác là những người hỗ trợ cộng đồng thiết yếu giúp thành phố sạch đẹp.' }
    ],
    grammar: {
      title: 'Cụm động từ (Phrasal Verbs) & Thì Quá khứ đơn vs Quá khứ tiếp diễn',
      summary: 'Phrasal Verb bao gồm: Động từ + Giới từ / Tiểu từ. Ý nghĩa thường thay đổi so với động từ gốc.',
      formulaBox: [
        'Verb + Particle = Phrasal Verb (look after = care for, set up = establish, pass down = hand over)',
        'S + V2/ed (Hành động cắt ngang) WHILE / WHEN S + was/were + V-ing (Hành động đang diễn ra)'
      ],
      usagePoints: [
        { title: '1. Cụm động từ thông dụng Unit 1', detail: 'look after (chăm sóc), set up (thành lập), pass down (truyền lại), cut down on (cắt giảm), run out of (hết/cạn kiệt).', example: 'My uncle set up a pottery workshop in Bat Trang five years ago.' },
        { title: '2. Phối hợp thì Quá khứ đơn & Quá khứ tiếp diễn', detail: 'Dùng When/While để diễn tả hành động đang diễn ra trong quá khứ thì có hành động khác xen vào.', example: 'While the artisan was shaping clay, a group of foreign tourists entered the workshop.' }
      ],
      exercises: [
        { id: 'u1-g1', question: 'My grandparents _____ this lacquerware workshop in 1985.', options: ['A. set up', 'B. looked after', 'C. passed down', 'D. ran out'], correctAnswer: 'A. set up', explanation: '"Set up" có nghĩa là thành lập, mở xưởng/công ty.' },
        { id: 'u1-g2', question: 'These weaving techniques have been _____ from generation to generation.', options: ['A. looked after', 'B. passed down', 'C. turned down', 'D. brought up'], correctAnswer: 'B. passed down', explanation: '"Pass down" nghĩa là truyền lại qua các thế hệ.' },
        { id: 'u1-g3', question: 'While the artisans _____ clay vases, the visitors were taking photos.', options: ['A. shaped', 'B. were shaping', 'C. are shaping', 'D. have shaped'], correctAnswer: 'B. were shaping', explanation: 'Hành động đang diễn ra đồng thời trong quá khứ sau "While" chia Quá khứ tiếp diễn (were shaping).' },
        { id: 'u1-g4', question: 'We decided to _____ on plastic bags when shopping at local markets.', options: ['A. cut down', 'B. run out', 'C. get on', 'D. look forward'], correctAnswer: 'A. cut down', explanation: '"Cut down on" có nghĩa là cắt giảm bớt tiêu thụ hoặc sử dụng.' },
        { id: 'u1-g5', question: 'When the teacher entered the classroom, the students _____ about traditional crafts.', options: ['A. discussed', 'B. were discussing', 'C. discuss', 'D. have discussed'], correctAnswer: 'B. were discussing', explanation: 'Hành động đang diễn ra (were discussing) thì hành động khác cắt ngang (entered).' },
        { id: 'u1-g6', question: 'Who is going to _____ your pets while you are on vacation in Bat Trang?', options: ['A. look after', 'B. pass down', 'C. find out', 'D. turn up'], correctAnswer: 'A. look after', explanation: '"Look after" có nghĩa là chăm sóc, trông nom.' }
      ]
    },
    listening: {
      audioTitle: 'Chuyến Tham Quan Làng Lụa Vạn Phúc (Van Phuc Silk Village)',
      audioDuration: '2:15',
      audioScriptSpeaker: 'Minh & Elena (Du khách quốc tế)',
      transcriptText: "Minh: Welcome to Van Phuc Silk Village, Elena! This traditional craft village has a history of more than one thousand years.\nElena: Wow, the silk scarves displayed in these shops look exquisite and colourful!\nMinh: Yes, our local artisans use traditional wooden looms to weave high-quality silk. The skills have been passed down for many generations.\nElena: Are young people in the community continuing to learn this handicraft?\nMinh: Definitely. Many youth are setting up online shops to introduce Van Phuc silk to international customers.",
      vietnameseTranslation: "Minh: Chào mừng bạn đến với Làng lụa Vạn Phúc, Elena! Làng nghề truyền thống này có lịch sử hơn 1.000 năm.\nElena: Ồ, những chiếc khăn lụa trưng bày trong các cửa hàng này trông thật tinh xảo và rực rỡ!\nMinh: Đúng vậy, các nghệ nhân địa phương sử dụng khung dệt gỗ truyền thống để dệt lụa chất lượng cao. Các kỹ năng đã được truyền lại qua nhiều thế hệ.\nElena: Giới trẻ trong cộng đồng có tiếp tục học nghề thủ công này không?\nMinh: Chắc chắn rồi. Nhiều bạn trẻ đang mở các cửa hàng trực tuyến để giới thiệu lụa Vạn Phúc tới khách hàng quốc tế.",
      questions: [
        { id: 'u1-l1', question: 'How long has Van Phuc Silk Village existed according to Minh?', options: ['A. Around one hundred years', 'B. More than one thousand years', 'C. Just fifty years', 'D. Exactly two centuries'], correctAnswerIndex: 1, explanation: 'Trong bài nghe: "This traditional craft village has a history of more than one thousand years."' },
        { id: 'u1-l2', question: 'What equipment do the artisans use to weave silk?', options: ['A. Modern automatic computers', 'B. Traditional wooden looms', 'C. Plastic weaving machines', 'D. Metal printing presses'], correctAnswerIndex: 1, explanation: 'Trong bài nghe: "our local artisans use traditional wooden looms to weave high-quality silk."' },
        { id: 'u1-l3', question: 'How are young people in the village promoting Van Phuc silk?', options: ['A. By giving up silk weaving', 'B. By setting up online shops for international customers', 'C. By moving to other countries', 'D. By selling imported clothes'], correctAnswerIndex: 1, explanation: 'Trong bài nghe: "Many youth are setting up online shops to introduce Van Phuc silk to international customers."' },
        { id: 'u1-l4', question: 'Which phrasal verb is used to describe inheriting skills from ancestors?', options: ['A. Turn down', 'B. Pass down', 'C. Look after', 'D. Run out of'], correctAnswerIndex: 1, explanation: '"The skills have been passed down for many generations."' }
      ],
      fillInBlankExercises: [
        { id: 'u1-f1', sentenceWithBlank: 'Van Phuc is a famous traditional _____ village in Ha Noi.', correctWord: 'silk', hint: 'Loại vải lụa mềm mại dệt từ tơ tằm' },
        { id: 'u1-f2', sentenceWithBlank: 'The artisan skills have been _____ down through generations.', correctWord: 'passed', hint: 'Dạng quá khứ của từ truyền lại' }
      ]
    },
    speakingPrompts: [
      { id: 'u1-s1', targetSentence: 'Our local artisans pass down traditional pottery techniques to preserve our heritage.', ipa: '/ˈaʊər ˈləʊkəl ˈɑːtɪzænz pɑːs daʊn trəˈdɪʃənl ˈpɒtəri tɛkˈniːks tuː prɪˈzɜːv ˈaʊə ˈhɛrɪtɪʤ/', vietnameseMeaning: 'Các nghệ nhân địa phương của chúng tôi truyền lại kỹ thuật làm gốm truyền thống để bảo tồn di sản.', contextSituation: 'Nói về sự tự hào đối với các làng nghề truyền thống của quê hương.', keyPhonicsFocus: 'Luyện nối âm "pass down" và phát âm chuẩn /f/ trong "heritage".', sampleAudioText: 'Our local artisans pass down traditional pottery techniques to preserve our heritage.' },
      { id: 'u1-s2', targetSentence: 'Community helpers work hard every day to keep our neighborhood safe and clean.', ipa: '/kəˈmjuːnəti ˈhɛlpəz wɜːk hɑːd ˈɛvrideɪ tuː kiːp ˈaʊə ˈneɪbəhʊd seɪf ænd kliːn/', vietnameseMeaning: 'Những người hỗ trợ cộng đồng làm việc chăm chỉ mỗi ngày để giữ cho khu phố an toàn và sạch sẽ.', contextSituation: 'Bày tỏ lòng biết ơn đối với những người lao động phục vụ cộng đồng.', keyPhonicsFocus: 'Phát âm chuẩn âm /p/ trong "helpers" và /f/ trong "safe".', sampleAudioText: 'Community helpers work hard every day to keep our neighborhood safe and clean.' },
      { id: 'u1-s3', targetSentence: 'Young villagers are eager to set up eco-tourism projects to attract international visitors.', ipa: '/jʌŋ ˈvɪlɪʤəz ɑːr ˈiːɡə tuː sɛt ʌp ˈiːkəʊ-ˈtʊərɪzəm ˈprɒʤɛkts tuː əˈtrækt ˌɪntəˈnæʃənl ˈvɪzɪtəz/', vietnameseMeaning: 'Thanh niên trong làng rất hào hứng thành lập các dự án du lịch sinh thái để thu hút du khách quốc tế.', contextSituation: 'Thảo luận về các sáng kiến phát triển kinh tế bền vững tại địa phương.', keyPhonicsFocus: 'Nối âm "set up" và phát âm /v/ trong "villagers" và "visitors".', sampleAudioText: 'Young villagers are eager to set up eco-tourism projects to attract international visitors.' },
      { id: 'u1-s4', targetSentence: 'We should cut down on plastic usage in our local community to protect the environment.', ipa: '/wiː ʃʊd kʌt daʊn ɒn ˈplæstɪk ˈjuːsɪʤ ɪn ˈaʊə ˈləʊkəl kəˈmjuːnəti tuː prəˈtɛkt ði ɪnˈvaɪərənmənt/', vietnameseMeaning: 'Chúng ta nên cắt giảm sử dụng nhựa trong cộng đồng địa phương để bảo vệ môi trường.', contextSituation: 'Kêu gọi hành động bảo vệ môi trường sống tại khu dân cư.', keyPhonicsFocus: 'Chú ý phát âm rõ cụm "cut down on" và âm /v/ trong "environment".', sampleAudioText: 'We should cut down on plastic usage in our local community to protect the environment.' },
      { id: 'u1-s5', targetSentence: 'Bat Trang pottery village is famous for its hand-painted ceramic teasets and decorative vases.', ipa: '/bæt træŋ ˈpɒtəri ˈvɪlɪʤ ɪz ˈfeɪməs fɔːr ɪts hænd-ˈpeɪntɪd sɪˈræmɪk ˈtiːsɛts ænd ˈdɛkərətɪv ˈvɑːzɪz/', vietnameseMeaning: 'Làng gốm Bát Tràng nổi tiếng với các bộ ấm chén gốm vẽ tay và lọ hoa trang trí.', contextSituation: 'Giới thiệu các sản phẩm thủ công đặc sắc của Việt Nam với bạn bè quốc tế.', keyPhonicsFocus: 'Phát âm chuẩn âm /f/ trong "famous" và âm /v/ trong "vases".', sampleAudioText: 'Bat Trang pottery village is famous for its hand-painted ceramic teasets and decorative vases.' }
    ],
    reading: {
      title: 'Bảo Tồn Các Làng Nghề Thủ Công Truyền Thống Việt Nam',
      topic: 'Làng nghề truyền thống & Đời sống văn hóa',
      passageText: "Traditional craft villages have played an integral part in Vietnamese culture for hundreds of years. Across the country, thousands of craft villages specialize in creating distinctive handicrafts such as Bat Trang ceramics, Dong Ho folk paintings, and Van Phuc silk.\n\nThese villages are not only production centers but also living museums that preserve ancestral values and artistic techniques. Each finished product reflects the patience, creativity, and dedication of skilled artisans.\n\nHowever, modern industrialization poses significant challenges. Mass-produced plastic and machine-made goods often compete fiercely with handmade items. To overcome this, many craft villages are combining handicraft production with cultural tourism, attracting both local and international visitors who want hands-on experiences.",
      keyVocabularyHighlights: [
        { word: 'integral', meaning: 'thiết yếu, không thể thiếu' },
        { word: 'ancestral values', meaning: 'giá trị truyền thống của cha ông' },
        { word: 'industrialization', meaning: 'quá trình công nghiệp hóa' },
        { word: 'hands-on experience', meaning: 'trải nghiệm thực hành trực tiếp' }
      ],
      questions: [
        { id: 'u1-r1', question: 'What is the main topic of the passage?', options: ['A. The history of modern plastic factories', 'B. Preserving traditional craft villages in modern Viet Nam', 'C. How to export foreign machines', 'D. Famous shopping malls in Ha Noi'], correctAnswerIndex: 1, explanation: 'Bài đọc phân tích vai trò và cách thức bảo tồn các làng nghề thủ công truyền thống ở Việt Nam hiện nay.' },
        { id: 'u1-r2', question: 'Why are craft villages described as "living museums"?', options: ['A. Because they charge expensive entrance tickets', 'B. Because they preserve ancestral values and artistic techniques', 'C. Because nobody lives there anymore', 'D. Because only ancient people work there'], correctAnswerIndex: 1, explanation: 'Trong đoạn 2: "living museums that preserve ancestral values and artistic techniques."' },
        { id: 'u1-r3', question: 'What major challenge do traditional craft villages face today?', options: ['A. Lack of tourists interested in culture', 'B. Competition from mass-produced and machine-made goods', 'C. Too much clean water and fresh air', 'D. High support from local authorities'], correctAnswerIndex: 1, explanation: 'Trong đoạn 3: "Mass-produced plastic and machine-made goods often compete fiercely with handmade items."' },
        { id: 'u1-r4', question: 'How are many villages adapting to survive and thrive?', options: ['A. By closing their workshops permanently', 'B. By combining handicraft production with cultural tourism', 'C. By replacing all artisans with robots', 'D. By stopping all international visits'], correctAnswerIndex: 1, explanation: 'Trong đoạn 3: "many craft villages are combining handicraft production with cultural tourism."' }
      ]
    },
    writing: {
      id: 'u1-w1',
      title: 'Write a paragraph about your local community or a traditional craft village (60-80 words)',
      description: 'Viết một đoạn văn ngắn giới thiệu về cộng đồng nơi bạn sống hoặc một làng nghề truyền thống mà bạn yêu thích.',
      suggestedOutline: [
        'Introduction: Name and location of your community / craft village.',
        'Body: What are the main features, people, or famous handicrafts there?',
        'Conclusion: How do you feel about your community and how can we preserve it?'
      ],
      usefulPhrases: [
        'My neighborhood is located in...',
        'It is famous for traditional handicrafts such as...',
        'The local artisans are very skillful and friendly...',
        'We should preserve our local traditions by...'
      ],
      wordLimit: '60 - 80 từ',
      sampleGrade10Response: 'I live in Bat Trang, a peaceful pottery village in the suburbs of Ha Noi. My village is world-famous for its ceramic products, which are shaped and painted by talented local artisans. These craft skills have been passed down for centuries. Today, many visitors come here to take part in pottery-making workshops. I take great pride in my hometown and believe young people should actively preserve these valuable traditions.'
    }
  },
  {
    id: 2,
    title: 'Unit 2: City Life',
    theme: 'Cuộc sống đô thị & Giao thông hiện đại',
    description: 'Học về so sánh hơn, so sánh kép của tính từ và trạng từ, đời sống tại các thành phố lớn và phương tiện công cộng.',
    pronunciationFocus: 'Ngữ âm: Trọng âm của từ ghép và ngữ điệu trong câu so sánh',
    badgeIconName: 'Building',
    vocabulary: [
      { id: 'u2-v1', word: 'metropolis', phonetic: '/məˈtrɒpəlɪs/', partOfSpeech: 'noun', vietnameseMeaning: 'đô thị lớn, siêu đô thị', englishExample: 'Tokyo is a bustling metropolis with millions of daily commuters.', vietnameseExample: 'Tokyo là một siêu đô thị nhộn nhịp với hàng triệu người đi làm mỗi ngày.' },
      { id: 'u2-v2', word: 'congestion', phonetic: '/kənˈʤɛsʧən/', partOfSpeech: 'noun', vietnameseMeaning: 'sự tắc nghẽn, kẹt xe', englishExample: 'Traffic congestion during rush hour causes serious delays in the city center.', vietnameseExample: 'Tắc nghẽn giao thông trong giờ cao điểm gây chậm trễ nghiêm trọng ở trung tâm thành phố.' },
      { id: 'u2-v3', word: 'public transport', phonetic: '/ˈpʌblɪk ˈtrænspɔːt/', partOfSpeech: 'noun', vietnameseMeaning: 'giao thông công cộng', englishExample: 'Taking public transport helps reduce carbon emissions and saves money.', vietnameseExample: 'Đi phương tiện công cộng giúp giảm lượng khí thải carbon và tiết kiệm tiền.' },
      { id: 'u2-v4', word: 'liveable', phonetic: '/ˈlɪvəbl/', partOfSpeech: 'adjective', vietnameseMeaning: 'đáng sống', englishExample: 'Da Nang is voted one of the most liveable cities in Viet Nam.', vietnameseExample: 'Đà Nẵng được bình chọn là một trong những thành phố đáng sống nhất Việt Nam.' },
      { id: 'u2-v5', word: 'cost of living', phonetic: '/kɒst ɒv ˈlɪvɪŋ/', partOfSpeech: 'noun', vietnameseMeaning: 'chi phí sinh hoạt', englishExample: 'The cost of living in big cities is much higher than in rural areas.', vietnameseExample: 'Chi phí sinh hoạt ở các thành phố lớn cao hơn nhiều so với ở vùng nông thôn.' },
      { id: 'u2-v6', word: 'bustling', phonetic: '/ˈbʌslɪŋ/', partOfSpeech: 'adjective', vietnameseMeaning: 'nhộn nhịp, hối hả', englishExample: 'The night market is always bustling with lively tourists and street food stalls.', vietnameseExample: 'Chợ đêm luôn nhộn nhịp với khách du lịch sôi động và các quán ăn đường phố.' },
      { id: 'u2-v7', word: 'skyscraper', phonetic: '/ˈskaɪˌskreɪpə/', partOfSpeech: 'noun', vietnameseMeaning: 'tòa nhà chọc trời', englishExample: 'Modern skyscrapers dominate the skyline of Ho Chi Minh City.', vietnameseExample: 'Những tòa nhà chọc trời hiện đại thống trị đường chân trời thành phố Hồ Chí Minh.' },
      { id: 'u2-v8', word: 'exhaust fumes', phonetic: '/ɪɡˈzɔːst fjuːmz/', partOfSpeech: 'noun', vietnameseMeaning: 'khí thải xe cộ', englishExample: 'Exhaust fumes from motorbikes contribute significantly to urban air pollution.', vietnameseExample: 'Khí thải từ xe máy góp phần đáng kể vào ô nhiễm không khí đô thị.' }
    ],
    grammar: {
      title: 'So sánh hơn & So sánh kép (Double Comparatives)',
      summary: 'So sánh kép diễn tả sự thay đổi có tính tương hỗ: Càng... thì càng... (The + comparative..., the + comparative...)',
      formulaBox: [
        'Short Adj/Adv: The + adj-er + S + V, the + adj-er + S + V',
        'Long Adj/Adv: The more + adj + S + V, the more + adj + S + V'
      ],
      usagePoints: [
        { title: '1. So sánh kép (The more... the more...)', detail: 'Diễn tả mối tương quan nhân quả hoặc sự tiến triển đồng thời.', example: 'The more crowded the city becomes, the worse the traffic gets.' },
        { title: '2. Nhấn mạnh so sánh hơn (much / far / a bit)', detail: 'Dùng much / far trước so sánh hơn để nhấn mạnh mức độ chênh lệch lớn.', example: 'Living in the metropolis is much more expensive than in the countryside.' }
      ],
      exercises: [
        { id: 'u2-g1', question: 'The _____ the city grows, the _____ the traffic congestion becomes.', options: ['A. bigger - worse', 'B. biggest - worst', 'C. more big - badder', 'D. bigger - badder'], correctAnswer: 'A. bigger - worse', explanation: 'Cấu trúc so sánh kép: The bigger... the worse...' },
        { id: 'u2-g2', question: 'The cost of living in Singapore is _____ higher than in Da Nang.', options: ['A. much', 'B. very', 'C. more', 'D. so'], correctAnswer: 'A. much', explanation: 'Dùng "much" hoặc "far" để nhấn mạnh mức độ so sánh hơn của tính từ (much higher).' },
        { id: 'u2-g3', question: 'The more modern the metro system is, the _____ commuters travel.', options: ['A. faster', 'B. more fast', 'C. fast', 'D. fastest'], correctAnswer: 'A. faster', explanation: 'So sánh kép: The more modern..., the faster...' },
        { id: 'u2-g4', question: 'Air pollution in central districts is getting _____ day by day.', options: ['A. worse and worse', 'B. bad and bad', 'C. more and more bad', 'D. worst and worst'], correctAnswer: 'A. worse and worse', explanation: 'Cấu trúc "worse and worse" diễn tả sự việc ngày càng trở nên tồi tệ hơn.' },
        { id: 'u2-g5', question: 'The _____ you study urban planning, the _____ you understand city dynamics.', options: ['A. harder - better', 'B. hard - good', 'C. hardest - best', 'D. more hard - more good'], correctAnswer: 'A. harder - better', explanation: 'So sánh kép với trạng từ: The harder... the better...' },
        { id: 'u2-g6', question: 'Is public transport in London _____ convenient than in Rome?', options: ['A. more', 'B. most', 'C. much', 'D. as'], correctAnswer: 'A. more', explanation: 'Tính từ dài "convenient" trong câu so sánh hơn dùng "more convenient than".' }
      ]
    },
    listening: {
      audioTitle: 'Phát Triển Hệ Thống Tàu Điện Ngầm Đô Thị (Urban Metro Systems)',
      audioDuration: '2:30',
      audioScriptSpeaker: 'David & An (Kỹ sư quy hoạch giao thông)',
      transcriptText: "David: An, how has the new Cat Linh - Ha Dong metro line changed daily commuting in Ha Noi?\nAn: It has made a tremendous difference! Thousands of commuters now avoid morning traffic jams on Nguyen Trai street.\nDavid: That is impressive. In my hometown, London, the underground tube carries millions of passengers every day.\nAn: Yes, expanding elevated trains and electric buses is definitely the key to creating a cleaner, more liveable metropolis.",
      vietnameseTranslation: "David: An ơi, tuyến tàu điện Cát Linh - Hà Đông mới đã làm thay đổi việc đi lại hàng ngày ở Hà Nội như thế nào?\nAn: Nó đã tạo ra sự khác biệt vô cùng lớn! Hàng ngàn người đi làm giờ đây tránh được kẹt xe buổi sáng trên đường Nguyễn Trãi.\nDavid: Thật ấn tượng. Ở quê tôi, Luân Đôn, hệ thống tàu điện ngầm chở hàng triệu hành khách mỗi ngày.\nAn: Vâng, việc mở rộng tàu điện trên cao và xe buýt điện chắc chắn là chìa khóa để tạo nên một đô thị sạch sẽ, đáng sống hơn.",
      questions: [
        { id: 'u2-l1', question: 'What major benefit of the new metro line does An mention?', options: ['A. Free tickets for everyone', 'B. Avoiding morning traffic jams on busy streets', 'C. Selling food on trains', 'D. Closing down all bus routes'], correctAnswerIndex: 1, explanation: 'Trong bài nghe: "Thousands of commuters now avoid morning traffic jams on Nguyen Trai street."' },
        { id: 'u2-l2', question: 'Where is David from originally?', options: ['A. Tokyo', 'B. London', 'C. New York', 'D. Sydney'], correctAnswerIndex: 1, explanation: 'Trong bài nghe: "In my hometown, London, the underground tube carries millions of passengers every day."' },
        { id: 'u2-l3', question: 'According to An, what is essential to building a liveable city?', options: ['A. Building more motorbike parking lots', 'B. Expanding elevated trains and electric buses', 'C. Cutting down all roadside trees', 'D. Increasing the price of bus tickets'], correctAnswerIndex: 1, explanation: 'Trong bài nghe: "expanding elevated trains and electric buses is definitely the key to creating a cleaner, more liveable metropolis."' },
        { id: 'u2-l4', question: 'What word does An use to describe the impact of the metro line?', options: ['A. Useless', 'B. Tremendous difference', 'C. Negative change', 'D. Boring'], correctAnswerIndex: 1, explanation: 'An nói: "It has made a tremendous difference!"' }
      ],
      fillInBlankExercises: [
        { id: 'u2-f1', sentenceWithBlank: 'Taking the elevated _____ helps commuters avoid heavy traffic jams.', correctWord: 'train', hint: 'Phương tiện đường sắt chở khách' },
        { id: 'u2-f2', sentenceWithBlank: 'Electric buses help build a cleaner and more _____ city.', correctWord: 'liveable', hint: 'Tính từ mang nghĩa đáng sống' }
      ]
    },
    speakingPrompts: [
      { id: 'u2-s1', targetSentence: 'Public transportation is much more convenient and less polluting than private motorbikes.', ipa: '/ˈpʌblɪk ˌtrænspɔːˈteɪʃən ɪz mʌʧ mɔː kənˈviːniənt ænd lɛs pəˈluːtɪŋ ðæn ˈpraɪvɪt ˈməʊtəbaɪks/', vietnameseMeaning: 'Phương tiện giao thông công cộng tiện lợi và ít gây ô nhiễm hơn nhiều so với xe máy cá nhân.', contextSituation: 'Nêu quan điểm ủng hộ việc sử dụng xe buýt và tàu điện đô thị.', keyPhonicsFocus: 'Luyện ngữ điệu so sánh và phát âm chuẩn /v/ trong "convenient".', sampleAudioText: 'Public transportation is much more convenient and less polluting than private motorbikes.' },
      { id: 'u2-s2', targetSentence: 'The cost of living in big cities is rising higher and higher every single year.', ipa: '/ðə kɒst ɒv ˈlɪvɪŋ ɪn bɪɡ ˈsɪtiz ɪz ˈraɪzɪŋ ˈhaɪər ænd ˈhaɪər ˈɛvri ˈsɪŋɡl jɪə/', vietnameseMeaning: 'Chi phí sinh hoạt ở các thành phố lớn ngày càng tăng cao theo từng năm.', contextSituation: 'Bàn luận về áp lực kinh tế và giá cả sinh hoạt tại các đô thị lớn.', keyPhonicsFocus: 'Phát âm nhịp điệu cụm "higher and higher" và âm /s/ trong "cost".', sampleAudioText: 'The cost of living in big cities is rising higher and higher every single year.' },
      { id: 'u2-s3', targetSentence: 'Ho Chi Minh City is the most bustling metropolis in southern Viet Nam.', ipa: '/həʊ ʧiː mɪn ˈsɪti ɪz ðə məʊst ˈbʌslɪŋ məˈtrɒpəlɪs ɪn ˈsʌðən vjet næm/', vietnameseMeaning: 'Thành phố Hồ Chí Minh là siêu đô thị nhộn nhịp nhất ở miền Nam Việt Nam.', contextSituation: 'Giới thiệu về sự năng động và quy mô kinh tế của TP. Hồ Chí Minh.', keyPhonicsFocus: 'Phát âm chuẩn âm câm /t/ trong "bustling" /ˈbʌslɪŋ/.', sampleAudioText: 'Ho Chi Minh City is the most bustling metropolis in southern Viet Nam.' },
      { id: 'u2-s4', targetSentence: 'Rush hour traffic congestion causes serious delays for commuters heading downtown.', ipa: '/rʌʃ ˈaʊə ˈtræfɪk kənˈʤɛsʧən ˈkɔːzɪz ˈsɪərɪəs dɪˈleɪz fɔː kəˈmjuːtəz ˈhɛdɪŋ ˈdaʊntaʊn/', vietnameseMeaning: 'Tắc nghẽn giao thông giờ cao điểm gây ra sự chậm trễ nghiêm trọng cho người đi làm vào trung tâm.', contextSituation: 'Mô tả vấn đề giao thông nhức nhối tại các thành phố lớn.', keyPhonicsFocus: 'Phát âm rõ trọng âm từ "congestion" /kənˈʤɛsʧən/.', sampleAudioText: 'Rush hour traffic congestion causes serious delays for commuters heading downtown.' },
      { id: 'u2-s5', targetSentence: 'Urban planners are expanding green parks to enhance the quality of life for residents.', ipa: '/ˈɜːbən ˈplænəz ɑːr ɪksˈpændɪŋ ɡriːn pɑːks tuː ɪnˈhɑːns ðə ˈkwɒlɪti ɒv laɪf fɔː ˈrɛzɪdənts/', vietnameseMeaning: 'Các nhà quy hoạch đô thị đang mở rộng công viên cây xanh để nâng cao chất lượng cuộc sống cho cư dân.', contextSituation: 'Nói về giải pháp nâng cao không gian sống xanh tại các thành phố.', keyPhonicsFocus: 'Phát âm chuẩn âm /z/ trong "planners" và "residents".', sampleAudioText: 'Urban planners are expanding green parks to enhance the quality of life for residents.' }
    ],
    reading: {
      title: 'Thành Phố Thông Minh & Phát Triển Đô Thị Bền Vững',
      topic: 'Đô thị hóa & Công nghệ xanh',
      passageText: "Urbanization is accelerating across Viet Nam, transforming ancient towns into bustling metropolises. While modern cities offer abundant career opportunities, high-standard hospitals, and entertainment centers, they also bring significant challenges such as traffic jams, air pollution, and high living expenses.\n\nTo tackle these problems, major cities like Ha Noi, Da Nang, and Ho Chi Minh City are adopting smart city solutions. These include intelligent traffic control systems that adjust signal lights in real time, smart energy grids that reduce electricity consumption, and expanded green public parks.\n\nUltimately, a truly developed city is measured not just by the height of its skyscrapers, but by how liveable, clean, and healthy it is for its citizens.",
      keyVocabularyHighlights: [
        { word: 'urbanization', meaning: 'quá trình đô thị hóa' },
        { word: 'intelligent traffic control', meaning: 'hệ thống điều khiển giao thông thông minh' },
        { word: 'living expenses', meaning: 'chi phí sinh hoạt' },
        { word: 'smart energy grids', meaning: 'lưới điện thông minh tiết kiệm năng lượng' }
      ],
      questions: [
        { id: 'u2-r1', question: 'What is the main advantage of big cities mentioned in the first paragraph?', options: ['A. Cheap housing for everyone', 'B. Abundant career opportunities and high-standard hospitals', 'C. Zero traffic congestion', 'D. Free electricity throughout the year'], correctAnswerIndex: 1, explanation: 'Trong đoạn 1: "modern cities offer abundant career opportunities, high-standard hospitals, and entertainment centers."' },
        { id: 'u2-r2', question: 'Which smart city solution helps manage vehicle flow efficiently?', options: ['A. Closing all pedestrian streets', 'B. Intelligent traffic control systems adjusting signal lights in real time', 'C. Forbidding all buses from running', 'D. Building higher fences along roads'], correctAnswerIndex: 1, explanation: 'Trong đoạn 2: "intelligent traffic control systems that adjust signal lights in real time."' },
        { id: 'u2-r3', question: 'According to the author, how should a truly developed city be measured?', options: ['A. Only by the number of luxury cars', 'B. Strictly by the height of its skyscrapers', 'C. By how liveable, clean, and healthy it is for its citizens', 'D. By the price of cinema tickets'], correctAnswerIndex: 2, explanation: 'Trong câu kết: "measured not just by the height of its skyscrapers, but by how liveable, clean, and healthy it is for its citizens."' },
        { id: 'u2-r4', question: 'Which word in paragraph 2 is closest in meaning to "tackle"?', options: ['A. Ignore', 'B. Solve / Address', 'C. Create', 'D. Destroy'], correctAnswerIndex: 1, explanation: '"Tackle problems" có nghĩa là giải quyết, xử lý khó khăn.' }
      ]
    },
    writing: {
      id: 'u2-w1',
      title: 'Write a paragraph about the pros and cons of living in a big city (60-80 words)',
      description: 'Viết một đoạn văn ngắn nêu ưu điểm và nhược điểm của việc sống tại một thành phố lớn.',
      suggestedOutline: [
        'Introduction: State your overall view on city life.',
        'Body: Mention 1-2 advantages (convenience, jobs, modern transport) and 1-2 disadvantages (pollution, traffic, high cost).',
        'Conclusion: Conclude with your personal preference.'
      ],
      usefulPhrases: [
        'Living in a big city offers many advantages such as...',
        'On the other hand, residents often face challenges like...',
        'The more crowded the city becomes, the...',
        'Overall, I enjoy city life because...'
      ],
      wordLimit: '60 - 80 từ',
      sampleGrade10Response: 'Living in a big city has both advantages and disadvantages. On the one hand, cities provide excellent schools, modern hospitals, and convenient public transport systems like electric buses and elevated trains. On the other hand, urban residents often suffer from heavy traffic congestion, noise pollution, and high living costs. Despite these drawbacks, I still prefer living in the city because of its vibrant lifestyle and abundant career opportunities.'
    }
  }
];

// Let's create unit1.ts and unit2.ts
fs.writeFileSync('src/data/units/unit1.ts', 'import { UnitData } from "../../types";\n\nexport const UNIT_1_DATA: UnitData = ' + JSON.stringify(UNITS[0], null, 2) + ';\n');
fs.writeFileSync('src/data/units/unit2.ts', 'import { UnitData } from "../../types";\n\nexport const UNIT_2_DATA: UnitData = ' + JSON.stringify(UNITS[1], null, 2) + ';\n');
console.log("Unit 1 and Unit 2 created successfully");
