import { UnitData } from '../types';
import { enhanceGrade9Units } from './unitDataEnhancer';

const RAW_UNITS: UnitData[] = [
  {
    id: 1,
    title: 'Unit 1: Local Community',
    theme: 'Cộng đồng địa phương & Làng nghề truyền thống',
    description: 'Học về các hoạt động cộng đồng, làng nghề thủ công, động từ bất quy tắc và cụm động từ (Phrasal Verbs).',
    pronunciationFocus: 'Ngữ âm: Phát âm chuẩn âm /f/ và /v/',
    badgeIconName: 'Home',
    vocabulary: [
      {
        id: 'u1-v1',
        word: 'handicraft',
        phonetic: '/ˈhændikrɑːft/',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'sản phẩm thủ công mỹ nghệ',
        englishExample: 'Pottery and silk weaving are popular handicrafts in Viet Nam.',
        vietnameseExample: 'Làm gốm và dệt lụa là những sản phẩm thủ công phổ biến ở Việt Nam.',
      },
      {
        id: 'u1-v2',
        word: 'artisan',
        phonetic: '/ˌɑːtɪˈzæn/',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'nghệ nhân',
        englishExample: 'The artisan spent three months making this lacquerware vase.',
        vietnameseExample: 'Nghệ nhân đã dành ba tháng để làm chiếc bình sơn mài này.',
      },
      {
        id: 'u1-v3',
        word: 'pottery',
        phonetic: '/ˈpɒtəri/',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'đồ gốm sứ',
        englishExample: 'Bat Trang is famous for its high-quality ceramic pottery.',
        vietnameseExample: 'Bát Tràng nổi tiếng với các sản phẩm đồ gốm sứ chất lượng cao.',
      },
      {
        id: 'u1-v4',
        word: 'preserve',
        phonetic: '/prɪˈzɜːv/',
        partOfSpeech: 'verb',
        vietnameseMeaning: 'bảo tồn, giữ gìn',
        englishExample: 'We should preserve our traditional craft villages for future generations.',
        vietnameseExample: 'Chúng ta nên bảo tồn các làng nghề truyền thống cho các thế hệ tương lai.',
      },
      {
        id: 'u1-v5',
        word: 'look after',
        phonetic: '/lʊk ˈɑːftə/',
        partOfSpeech: 'phrasal verb',
        vietnameseMeaning: 'chăm sóc, trông nom',
        englishExample: 'Community volunteers look after the elderly citizens in our neighborhood.',
        vietnameseExample: 'Tình nguyện viên cộng đồng chăm sóc những người cao tuổi trong xóm chúng tôi.',
      },
      {
        id: 'u1-v6',
        word: 'pass down',
        phonetic: '/pɑːs daʊn/',
        partOfSpeech: 'phrasal verb',
        vietnameseMeaning: 'truyền lại (qua các thế hệ)',
        englishExample: 'Craft skills are passed down from grandparents to grandchildren.',
        vietnameseExample: 'Kỹ năng làm nghề thủ công được truyền lại từ ông bà cho con cháu.',
      },
      {
        id: 'u1-v7',
        word: 'suburb',
        phonetic: '/ˈsʌbɜːb/',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'vùng ngoại ô',
        englishExample: 'They moved to a quiet suburb near Ha Noi to enjoy fresh air.',
        vietnameseExample: 'Họ đã chuyển đến một vùng ngoại ô yên tĩnh gần Hà Nội để tận hưởng không khí trong lành.',
      },
      {
        id: 'u1-v8',
        word: 'community helper',
        phonetic: '/kəˈmjuːnəti ˈhɛlpə/',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'người trợ giúp cộng đồng (cảnh sát, ve chai, bác sĩ xóm...)',
        englishExample: 'Garbage collectors are essential community helpers who keep our city clean.',
        vietnameseExample: 'Những người thu gom rác là những người hỗ trợ cộng đồng thiết yếu giúp thành phố sạch đẹp.',
      }
    ],
    grammar: {
      title: 'Cụm động từ (Phrasal Verbs) & Thì Quá khứ đơn vs Quá khứ tiếp diễn',
      summary: 'Phrasal Verb bao gồm: Động từ + Giới từ / Tiểu từ (Verb + Preposition/Particle). Ý nghĩa thường thay đổi so với động từ gốc.',
      formulaBox: [
        'Verb + Particle = Phrasal Verb (look after = care for, set up = establish, pass down = hand over)',
        'S + V2/ed (Hành động cắt ngang) WHILE / WHEN S + was/were + V-ing (Hành động đang diễn ra)'
      ],
      usagePoints: [
        {
          title: '1. Cụm động từ thông dụng Unit 1',
          detail: 'look after (chăm sóc), set up (thành lập), pass down (truyền lại), cut down on (cắt giảm), run out of (hết/cạn kiệt).',
          example: 'My uncle set up a pottery workshop in Bat Trang five years ago.'
        },
        {
          title: '2. Phối hợp thì Quá khứ đơn & Quá khứ tiếp diễn',
          detail: 'Dùng để diễn tả một hành động đang xảy ra trong quá khứ thì có một hành động khác xen vào.',
          example: 'When the tourists arrived, the artisans were weaving bamboo baskets.'
        }
      ],
      exercises: [
        {
          id: 'u1-g1',
          question: 'This traditional conical hat making craft has been _____ down through generations in Van Phuc village.',
          options: ['A. passed', 'B. turned', 'C. set', 'D. given'],
          correctAnswer: 'A. passed',
          explanation: 'Cụm động từ "pass down" nghĩa là truyền lại qua các thế hệ.'
        },
        {
          id: 'u1-g2',
          question: 'When we arrived at the local workshop, the artisans _____ pottery vases.',
          options: ['A. are making', 'B. were making', 'C. made', 'D. have made'],
          correctAnswer: 'B. were making',
          explanation: 'Hành động "artisans were making" đang diễn ra trong quá khứ khi hành động "arrived" xen vào.'
        },
        {
          id: 'u1-g3',
          question: 'We should _____ on plastic bags to keep our local community environment clean.',
          options: ['A. cut down', 'B. look up', 'C. turn off', 'D. get on'],
          correctAnswer: 'A. cut down',
          explanation: '"Cut down on" có nghĩa là cắt giảm bớt tiêu thụ/sử dụng.'
        },
        {
          id: 'u1-g4',
          question: 'While the guide was introducing Bat Trang village, the tourists _____ photos of ceramic items.',
          options: ['A. take', 'B. were taking', 'C. are taking', 'D. took'],
          correctAnswer: 'B. were taking',
          explanation: 'Hai hành động song song cùng đang xảy ra trong quá khứ dùng thì Quá khứ tiếp diễn (were taking).'
        },
        {
          id: 'u1-g5',
          question: 'The local artisans decided to _____ a new workshop to teach young villagers traditional weaving.',
          options: ['A. pass down', 'B. turn off', 'C. set up', 'D. get over'],
          correctAnswer: 'C. set up',
          explanation: 'Cụm động từ "set up" có nghĩa là thành lập, xây dựng xưởng mới.'
        },
        {
          id: 'u1-g6',
          question: 'My sister is looking forward to _____ the famous silk village with her classmates next weekend.',
          options: ['A. visit', 'B. visiting', 'C. visited', 'D. visits'],
          correctAnswer: 'B. visiting',
          explanation: 'Cấu trúc "look forward to + V-ing" thể hiện sự mong chờ làm việc gì.'
        }
      ]
    },
    listening: {
      audioTitle: 'Listening: Bat Trang Ceramic Craft Village',
      audioDuration: '2:15',
      audioScriptSpeaker: 'Narrator & Mai',
      transcriptText: `Mai is giving a presentation to her class about her weekend trip to Bat Trang Pottery Village.
"Hello everyone! Last Sunday, my family visited Bat Trang, an ancient craft village located in the suburbs of Ha Noi. Bat Trang is famous for its beautiful ceramic products like tea sets, bowls, and decorative vases.
We met Mr. Hung, a senior artisan whose family has preserved pottery making for over four generations. He explained that making a ceramic piece requires patience, skill, and heat control in the kiln. We even had a chance to shape our own clay bowls on the potter's wheel. It was a wonderful experience that connected us with our cultural heritage!"`,
      vietnameseTranslation: `Mai đang thuyết trình trước lớp về chuyến đi cuối tuần của cô ấy đến Làng gốm Bát Tràng.
"Xin chào mọi người! Chủ nhật tuần trước, gia đình mình đã ghé thăm Bát Tràng, một làng nghề cổ nằm ở vùng ngoại ô Hà Nội. Bát Tràng nổi tiếng với các sản phẩm gốm sứ đẹp mắt như bộ ấm trà, bát đĩa và bình trang trí.
Chúng mình đã gặp bác Hùng, một nghệ nhân lâu năm có gia đình bảo tồn nghề làm gốm qua hơn 4 thế hệ. Bác giải thích rằng việc tạo ra một món đồ gốm đòi hỏi sự kiên nhẫn, khéo léo và điều chỉnh nhiệt độ lò nung. Chúng mình thậm chí còn có cơ hội tự nặn những chiếc bát đất sét trên bàn xoay gốm. Đó là một trải nghiệm tuyệt vời giúp chúng mình kết nối với di sản văn hóa dân tộc!"`,
      questions: [
        {
          id: 'u1-l1',
          question: 'Where is Bat Trang craft village located?',
          options: ['A. In the center of Ha Noi', 'B. In the suburbs of Ha Noi', 'C. In Da Nang city', 'D. Near Ha Long Bay'],
          correctAnswerIndex: 1,
          explanation: 'Bài nghe đề cập: "Bat Trang, an ancient craft village located in the suburbs of Ha Noi."'
        },
        {
          id: 'u1-l2',
          question: 'How many generations has Mr. Hung\'s family preserved pottery making?',
          options: ['A. Two generations', 'B. Three generations', 'C. Over four generations', 'D. Ten generations'],
          correctAnswerIndex: 2,
          explanation: 'Bài nghe nêu rõ: "whose family has preserved pottery making for over four generations."'
        },
        {
          id: 'u1-l3',
          question: 'What skills are required to create a ceramic pottery piece according to Mr. Hung?',
          options: ['A. Speed and luck', 'B. Patience, skill, and heat control in the kiln', 'C. Modern automatic robots', 'D. Expensive imported tools'],
          correctAnswerIndex: 1,
          explanation: 'Bài nghe đề cập: "making a ceramic piece requires patience, skill, and heat control in the kiln."'
        },
        {
          id: 'u1-l4',
          question: 'What interactive activity did Mai and her family participate in?',
          options: ['A. Buying silk scarves', 'B. Painting oil pictures', 'C. Shaping clay bowls on the potter\'s wheel', 'D. Cooking local traditional food'],
          correctAnswerIndex: 2,
          explanation: 'Bài nghe nêu: "We even had a chance to shape our own clay bowls on the potter\'s wheel."'
        }
      ],
      fillInBlankExercises: [
        {
          id: 'u1-lf1',
          sentenceWithBlank: 'Bat Trang is famous for its beautiful _____ products.',
          correctWord: 'ceramic',
          hint: 'Từ chỉ đồ gốm sứ (bắt đầu bằng c)'
        },
        {
          id: 'u1-lf2',
          sentenceWithBlank: 'Mai\'s family formed clay bowls on the potter\'s _____.',
          correctWord: 'wheel',
          hint: 'Bàn xoay gốm (potter\'s ...)'
        },
        {
          id: 'u1-lf3',
          sentenceWithBlank: 'Artisans use heat control in the _____ to bake pottery.',
          correctWord: 'kiln',
          hint: 'Lò nung gốm (bắt đầu bằng k)'
        },
        {
          id: 'u1-lf4',
          sentenceWithBlank: 'Craft village trips help students connect with cultural _____.',
          correctWord: 'heritage',
          hint: 'Di sản văn hóa (bắt đầu bằng h)'
        }
      ]
    },
    speakingPrompts: [
      {
        id: 'u1-s1',
        targetSentence: 'Our local artisans pass down traditional pottery techniques to preserve our heritage.',
        ipa: '/aʊər ˈləʊkəl ˈɑːtɪzænz pɑːs daʊn trəˈdɪʃənl ˈpɒtəri tɛkˈniːks tuː prɪˈzɜːv aʊər ˈhɛrɪtɪʤ/',
        vietnameseMeaning: 'Các nghệ nhân địa phương của chúng tôi truyền lại kỹ thuật làm gốm truyền thống để bảo tồn di sản.',
        contextSituation: 'Nói về sự gắn kết và gìn giữ làng nghề trong cộng đồng của bạn.',
        keyPhonicsFocus: 'Chú ý phát âm phụ âm /v/ trong "preserve" và âm /f/ trong "artisan" / "craft".',
        sampleAudioText: 'Our local artisans pass down traditional pottery techniques to preserve our heritage.'
      },
      {
        id: 'u1-s2',
        targetSentence: 'Community helpers work hard every day to keep our neighborhood safe and clean.',
        ipa: '/kəˈmjuːnɪti ˈhɛlpəz wɜːk hɑːd ˈɛvri deɪ tuː kiːp aʊər ˈneɪbəhʊd seɪf ænd kliːn/',
        vietnameseMeaning: 'Những người hỗ trợ cộng đồng làm việc chăm chỉ mỗi ngày để giữ cho khu phố an toàn và sạch sẽ.',
        contextSituation: 'Nói về vai trò của những người giúp đỡ cộng đồng xung quanh bạn.',
        keyPhonicsFocus: 'Phát âm rõ đuôi /dz/ trong "helpers" và âm /k/ trong "keep/clean".',
        sampleAudioText: 'Community helpers work hard every day to keep our neighborhood safe and clean.'
      },
      {
        id: 'u1-s3',
        targetSentence: 'Young villagers are eager to set up eco-tourism projects to attract international visitors.',
        ipa: '/jʌŋ ˈvɪlɪʤəz ɑːr ˈiːɡə tuː sɛt ʌp ˈiːkəʊ-ˈtʊərɪzm ˈprɒʤɛkts tuː əˈtrækt ˌɪntəˈnæʃənl ˈvɪzɪtəz/',
        vietnameseMeaning: 'Thanh niên trong làng rất háo hức thành lập các dự án du lịch sinh thái để thu hút du khách quốc tế.',
        contextSituation: 'Nói về xu hướng phát triển kinh tế bền vững ở các làng nghề.',
        keyPhonicsFocus: 'Phát âm chuẩn cụm động từ "set up" /sɛt ʌp/ và danh từ "eco-tourism".',
        sampleAudioText: 'Young villagers are eager to set up eco-tourism projects to attract international visitors.'
      },
      {
        id: 'u1-s4',
        targetSentence: 'We should cut down on plastic usage in our local community to protect the environment.',
        ipa: '/wiː ʃʊd kʌt daʊn ɒn ˈplæstɪk ˈjuːzɪʤ ɪn aʊər ˈləʊkəl kəˈmjuːnɪti tuː prəˈtɛkt ði ɪnˈvaɪərənmənt/',
        vietnameseMeaning: 'Chúng ta nên cắt giảm việc sử dụng nhựa trong cộng đồng địa phương để bảo vệ môi trường.',
        contextSituation: 'Thảo luận về hành động bảo vệ môi trường khu phố.',
        keyPhonicsFocus: 'Luyện nối âm "cut down on" và âm /pr/ trong "protect".',
        sampleAudioText: 'We should cut down on plastic usage in our local community to protect the environment.'
      },
      {
        id: 'u1-s5',
        targetSentence: 'Bat Trang pottery village is famous for its hand-painted ceramic teasets and decorative vases.',
        ipa: '/bæt træŋ ˈpɒtəri ˈvɪlɪʤ ɪz ˈfeɪməs fɔːr ɪts hænd-ˈpeɪntɪd sɪˈræmɪk ˈtiːsɛts ænd ˈdɛkərətɪv vɑːzɪz/',
        vietnameseMeaning: 'Làng gốm Bát Tràng nổi tiếng với các bộ ấm trà sứ vẽ tay và bình hoa trang trí.',
        contextSituation: 'Giới thiệu sản phẩm nổi bật của làng nghề Bát Tràng.',
        keyPhonicsFocus: 'Chú ý nhấn trọng âm rơi vào âm tiết đầu của "ceramic" /sɪˈræmɪk/.',
        sampleAudioText: 'Bat Trang pottery village is famous for its hand-painted ceramic teasets and decorative vases.'
      },
      {
        id: 'u1-s6',
        targetSentence: 'Electric buses help reduce carbon emissions and air pollution in modern cities.',
        ipa: '/ɪˈlɛktrɪk ˈbʌsɪz hɛlp rɪˈdjuːs ˈkɑːbən ɪˈmɪʃənz ænd eə pəˈluːʃən ɪn ˈmɒdən ˈsɪtiz/',
        vietnameseMeaning: 'Xe buýt điện giúp giảm lượng khí thải carbon và ô nhiễm không khí ở các thành phố hiện đại.',
        contextSituation: 'Thảo luận phương tiện giao thông xanh bảo vệ môi trường sống.',
        keyPhonicsFocus: 'Luyện phát âm phụ âm /ʃ/ trong "emissions" và "pollution".',
        sampleAudioText: 'Electric buses help reduce carbon emissions and air pollution in modern cities.'
      },
      {
        id: 'u1-s7',
        targetSentence: 'Preserving ancient craft traditions helps boost local tourism and village economic growth.',
        ipa: '/prɪˈzɜːvɪŋ ˈeɪnʃənt krɑːft trəˈdɪʃənz hɛlps buːst ˈləʊkəl ˈtʊərɪzm ænd ˈvɪlɪʤ ˌiːkəˈnɒmɪk ɡrəʊθ/',
        vietnameseMeaning: 'Việc bảo tồn các truyền thống nghề cổ giúp thúc đẩy du lịch địa phương và tăng trưởng kinh tế làng quê.',
        contextSituation: 'Phân tích lợi ích kinh tế xã hội của di sản văn hóa.',
        keyPhonicsFocus: 'Phát âm rõ âm cuối /sts/ trong "boosts" và âm /θ/ trong "growth".',
        sampleAudioText: 'Preserving ancient craft traditions helps boost local tourism and village economic growth.'
      },
      {
        id: 'u1-s8',
        targetSentence: 'My grandfather has been practicing lacquerware crafting for more than fifty years.',
        ipa: '/maɪ ˈɡrænfɑːðər hæz biːn ˈpræktɪsɪŋ ˈlækəweə ˈkrɑːftɪŋ fɔːr mɔː ðæn ˈfɪfti jɪəz/',
        vietnameseMeaning: 'Ông nội tôi đã làm nghề chế tác đồ sơn mài được hơn năm mươi năm.',
        contextSituation: 'Kể về truyền thống tay nghề lâu đời của gia đình.',
        keyPhonicsFocus: 'Luyện phát âm danh từ kép "lacquerware" /ˈlækəweər/.',
        sampleAudioText: 'My grandfather has been practicing lacquerware crafting for more than fifty years.'
      },
      {
        id: 'u1-s9',
        targetSentence: 'It is important to support local artisan markets by buying handmade traditional souvenirs.',
        ipa: '/ɪt ɪz ɪmˈpɔːtənt tuː səˈpɔːt ˈləʊkəl ˈɑːtɪzæn ˈmɑːkɪts baɪ ˈbaɪɪŋ ˌhændˈmeɪd trəˈdɪʃənl ˌsuːvəˈnɪəz/',
        vietnameseMeaning: 'Quan trọng là chúng ta hỗ trợ các chợ nghệ nhân địa phương bằng cách mua quà lưu niệm thủ công truyền thống.',
        contextSituation: 'Kêu gọi tiêu dùng sản phẩm thủ công truyền thống.',
        keyPhonicsFocus: 'Phát âm trọng âm chính xác từ "souvenirs" /ˌsuːvəˈnɪəz/.',
        sampleAudioText: 'It is important to support local artisan markets by buying handmade traditional souvenirs.'
      },
      {
        id: 'u1-s10',
        targetSentence: 'Noise pollution in crowded urban areas can negatively affect students mental health.',
        ipa: '/nɔɪz pəˈluːʃən ɪn ˈkraʊdɪd ˈɜːbən ˈeərɪəz kæn ˈnɛɡətɪvli əˈfɛkt ˈstjuːdənts ˈmɛntl hɛlθ/',
        vietnameseMeaning: 'Ô nhiễm tiếng ồn ở các khu vực đô thị đông đúc có thể ảnh hưởng tiêu cực đến sức khỏe tinh thần của học sinh.',
        contextSituation: 'Thảo luận về vấn đề ô nhiễm tiếng ồn ở thành phố.',
        keyPhonicsFocus: 'Chú ý âm bật /t/ trong "mental" và âm /θ/ trong "health".',
        sampleAudioText: 'Noise pollution in crowded urban areas can negatively affect students mental health.'
      },
      {
        id: 'u1-s11',
        targetSentence: 'The local government has invested in building sustainable public parks for residents.',
        ipa: '/ðə ˈləʊkəl ˈɡʌvnmənt hæz ɪnˈvɛstɪd ɪn ˈbɪldɪŋ səˈsteɪnəbl ˈpʌblɪk pɑːks fɔːr ˈrɛzɪdənts/',
        vietnameseMeaning: 'Chính quyền địa phương đã đầu tư xây dựng các công viên công cộng bền vững cho cư dân.',
        contextSituation: 'Nói về sự cải thiện cơ sở hạ tầng đô thị.',
        keyPhonicsFocus: 'Phát âm chuẩn tính từ "sustainable" /səˈsteɪnəbl/.',
        sampleAudioText: 'The local government has invested in building sustainable public parks for residents.'
      },
      {
        id: 'u1-s12',
        targetSentence: 'Many teenagers enjoy participating in community recycling campaigns every weekend.',
        ipa: '/ˈmɛni ˈtiːnˌeɪʤəz ɪnˈʤɔɪ pɑːˈtɪsɪpeɪtɪŋ ɪn kəˈmjuːnɪti ˌriːˈsaɪklɪŋ kæmˈpeɪnz ˈɛvri ˈwiːkɛnd/',
        vietnameseMeaning: 'Nhiều bạn thiếu niên thích tham gia các chiến dịch tái chế cộng đồng vào mỗi cuối tuần.',
        contextSituation: 'Chia sẻ hoạt động tình nguyện môi trường của giới trẻ.',
        keyPhonicsFocus: 'Phát âm chuẩn động từ "participating" /pɑːˈtɪsɪpeɪtɪŋ/.',
        sampleAudioText: 'Many teenagers enjoy participating in community recycling campaigns every weekend.'
      },
      {
        id: 'u1-s13',
        targetSentence: 'Tourists love visiting historic conical hat villages in the countryside of Viet Nam.',
        ipa: '/ˈtʊərɪsts lʌv ˈvɪzɪtɪŋ hɪsˈtɒrɪk ˈkɒnɪkəl hæt ˈvɪlɪʤɪz ɪn ðə ˈkʌntrɪsaɪd ɒv ˌvɪət ˈnæt/',
        vietnameseMeaning: 'Du khách rất thích ghé thăm các làng nón lá lịch sử ở vùng quê Việt Nam.',
        contextSituation: 'Mô tả sức hút du lịch của nghề nón lá truyền thống.',
        keyPhonicsFocus: 'Phát âm chuẩn cụm "conical hat" /ˈkɒnɪkəl hæt/.',
        sampleAudioText: 'Tourists love visiting historic conical hat villages in the countryside of Viet Nam.'
      },
      {
        id: 'u1-s14',
        targetSentence: 'You can improve your English pronunciation by listening carefully to native speakers every day.',
        ipa: '/juː kæn ɪmˈpruːv jɔːr ˈɪŋɡlɪʃ prəˌnʌnsɪˈeɪʃən baɪ ˈlɪsnɪŋ ˈkeəfʊli tuː ˈneɪtɪv ˈspiːkəz ˈɛvri deɪ/',
        vietnameseMeaning: 'Bạn có thể cải thiện phát âm tiếng Anh bằng cách lắng nghe cẩn thận người bản xứ mỗi ngày.',
        contextSituation: 'Chia sẻ mẹo học tập phát âm hiệu quả.',
        keyPhonicsFocus: 'Luyện trọng âm danh từ dài "pronunciation" /prəˌnʌnsɪˈeɪʃən/.',
        sampleAudioText: 'You can improve your English pronunciation by listening carefully to native speakers every day.'
      },
      {
        id: 'u1-s15',
        targetSentence: 'Our school organized a memorable field trip to a famous traditional silk weaving village.',
        ipa: '/aʊər skuːl ˈɔːɡənaɪzd ə ˈmɛmərəbl fiːld trɪp tuː ə ˈfeɪməs trəˈdɪʃənl sɪlk ˈwiːvɪŋ ˈvɪlɪʤ/',
        vietnameseMeaning: 'Trường chúng tôi đã tổ chức một chuyến tham quan thực tế đáng nhớ đến làng dệt lụa truyền thống nổi tiếng.',
        contextSituation: 'Kể lại trải nghiệm chuyến tham quan thực tế cùng nhà trường.',
        keyPhonicsFocus: 'Nối âm trong cụm "field trip" /fiːld trɪp/.',
        sampleAudioText: 'Our school organized a memorable field trip to a famous traditional silk weaving village.'
      },
      {
        id: 'u1-s16',
        targetSentence: 'Artisans use skill, patience, and precise heat control in the kiln to bake fine pottery.',
        ipa: '/ˈɑːtɪzænz juːz skɪl, ˈpeɪʃəns, ænd prɪˈsaɪs hiːt kənˈtrəʊl ɪn ðə kɪln tuː beɪk faɪn ˈpɒtəri/',
        vietnameseMeaning: 'Các nghệ nhân sử dụng kỹ năng, sự kiên nhẫn và điều chỉnh nhiệt độ chính xác trong lò nung để nung đồ gốm đẹp.',
        contextSituation: 'Mô tả quy trình tỉ mỉ để tạo nên món đồ gốm tinh xảo.',
        keyPhonicsFocus: 'Phát âm phụ âm /k/ trong "kiln" /kɪln/ và "control".',
        sampleAudioText: 'Artisans use skill, patience, and precise heat control in the kiln to bake fine pottery.'
      },
      {
        id: 'u1-s17',
        targetSentence: 'Developing eco-friendly habits contributes to creating a greener and cleaner community.',
        ipa: '/dɪˈvɛləpɪŋ ˈiːkəʊ-ˈfrɛndli ˈhæbɪts kənˈtrɪbjuːts tuː kriːˈeɪtɪŋ ə ˈɡriːnər ænd ˈkliːnər kəˈmjuːnɪti/',
        vietnameseMeaning: 'Phát triển các thói quen thân thiện với môi trường góp phần tạo nên một cộng đồng xanh hơn và sạch hơn.',
        contextSituation: 'Khuyến khích lối sống xanh nâng cao chất lượng môi trường.',
        keyPhonicsFocus: 'Chú ý nhấn trọng âm rơi vào "contributes" /kənˈtrɪbjuːts/.',
        sampleAudioText: 'Developing eco-friendly habits contributes to creating a greener and cleaner community.'
      },
      {
        id: 'u1-s18',
        targetSentence: 'The elder artisans always encourage young villagers to take pride in their cultural identity.',
        ipa: '/ði ˈɛldər ˈɑːtɪzænz ˈɔːlweɪz ɪnˈkʌrɪʤ jʌŋ ˈvɪlɪʤəz tuː teɪk praɪd ɪn ðeər ˈkʌlʧərəl aɪˈdɛntɪti/',
        vietnameseMeaning: 'Các nghệ nhân cao niên luôn khuyến khích thanh niên trong làng tự hào về bản sắc văn hóa của mình.',
        contextSituation: 'Nói về việc truyền cảm hứng gìn giữ cội nguồn cho thế hệ trẻ.',
        keyPhonicsFocus: 'Luyện nối âm cụm "take pride in" /teɪk praɪd ɪn/.',
        sampleAudioText: 'The elder artisans always encourage young villagers to take pride in their cultural identity.'
      },
      {
        id: 'u1-s19',
        targetSentence: 'Interactive workshops allow visitors to shape clay items on the potters wheel themselves.',
        ipa: '/ˌɪntərˈæktɪv ˈwɜːkʃɒps əˈlaʊ ˈvɪzɪtəz tuː ʃeɪp kleɪ ˈaɪtəmz ɒn ðə ˈpɒtəz wiːl ðəmˈsɛlvz/',
        vietnameseMeaning: 'Các xưởng thực hành tương tác cho phép du khách tự tay nặn các món đồ đất sét trên bàn xoay gốm.',
        contextSituation: 'Giới thiệu trải nghiệm làm đồ gốm thủ công.',
        keyPhonicsFocus: 'Phát âm chuẩn âm /ʃ/ trong "shape" /ʃeɪp/ và "workshops".',
        sampleAudioText: 'Interactive workshops allow visitors to shape clay items on the potters wheel themselves.'
      },
      {
        id: 'u1-s20',
        targetSentence: 'Mastering phrasal verbs and sentence intonation is key to scoring high in English exams.',
        ipa: '/ˈmɑːstərɪŋ ˈfreɪzəl vɜːbz ænd ˈsɛntəns ˌɪntəˈneɪʃən ɪz kiː tuː ˈskɔːrɪŋ haɪ ɪn ˈɪŋɡlɪʃ ɪɡˈzæmz/',
        vietnameseMeaning: 'Thành thạo cụm động từ và ngữ điệu câu là chìa khóa để đạt điểm cao trong các bài thi tiếng Anh.',
        contextSituation: 'Lời khuyên học tập để chinh phục kỳ thi Tiếng Anh vào 10.',
        keyPhonicsFocus: 'Phát âm rõ đuôi /z/ trong "verbs" / "exams" và âm /ʃ/ trong "intonation".',
        sampleAudioText: 'Mastering phrasal verbs and sentence intonation is key to scoring high in English exams.'
      }
    ],
    reading: {
      title: 'Preserving Vietnam Traditional Craft Villages',
      topic: 'Bảo tồn làng nghề truyền thống Việt Nam',
      passageText: `Viet Nam is home to thousands of traditional craft villages that produce a wide variety of items, including silk, pottery, bamboo baskets, and lacquerware. These villages not only create jobs for local villagers but also preserve unique cultural values.
However, in modern times, craft villages face several challenges. Young people often move to big cities looking for higher-paying office jobs instead of staying behind to learn traditional crafts. Furthermore, handmade goods often struggle to compete with cheap mass-produced factory items.
To protect craft villages, local authorities are combining traditional craft making with ecotourism. Tourists can visit workshops, make their own souvenirs, and learn directly from master artisans. This eco-cultural approach boosts village incomes and inspires young villagers to take pride in their ancestors' traditional skills.`,
      keyVocabularyHighlights: [
        { word: 'lacquerware', meaning: 'đồ sơn mài' },
        { word: 'mass-produced', meaning: 'sản xuất hàng loạt bằng máy móc' },
        { word: 'ecotourism', meaning: 'du lịch sinh thái' },
        { word: 'ancestors', meaning: 'tổ tiên, ông bà đi trước' }
      ],
      questions: [
        {
          id: 'u1-r1',
          question: 'Why do many young villagers leave their home villages?',
          options: [
            'A. They want to travel abroad.',
            'B. They search for higher-paying office jobs in big cities.',
            'C. They dislike living in Viet Nam.',
            'D. Craft villages no longer produce goods.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Đoạn 2 nêu: "Young people often move to big cities looking for higher-paying office jobs instead of staying behind..."'
        },
        {
          id: 'u1-r2',
          question: 'How are local authorities helping to preserve traditional craft villages?',
          options: [
            'A. By closing factory production.',
            'B. By combining traditional craft making with ecotourism.',
            'C. By giving free cars to villagers.',
            'D. By moving craft villages abroad.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Đoạn 3 đề cập: "To protect craft villages, local authorities are combining traditional craft making with ecotourism."'
        },
        {
          id: 'u1-r3',
          question: 'What difficulty do handmade goods face in modern markets?',
          options: [
            'A. They are banned by the government.',
            'B. They struggle to compete with cheap mass-produced factory goods.',
            'C. Tourists refuse to buy handicrafts.',
            'D. Artisans refuse to sell their products.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Đoạn 2 chỉ ra: "handmade goods often struggle to compete with cheap mass-produced factory items."'
        },
        {
          id: 'u1-r4',
          question: 'What benefit does the eco-cultural tourism approach bring to young villagers?',
          options: [
            'A. It forces them to work in factories.',
            'B. It inspires them to take pride in their ancestors\' skills.',
            'C. It lowers the village total income.',
            'D. It replaces all traditional workshops.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Đoạn 3 kết luận: "inspires young villagers to take pride in their ancestors\' traditional skills."'
        }
      ]
    },
    writing: {
      id: 'u1-w1',
      title: 'Write a paragraph (60-80 words) about a local craft village or community service in your area.',
      description: 'Viết một đoạn văn ngắn (60-80 từ) giới thiệu về một làng nghề truyền thống hoặc dịch vụ cộng đồng tại nơi em sống.',
      suggestedOutline: [
        '1. Introduction: Tên làng nghề / dịch vụ cộng đồng đó là gì và nằm ở đâu?',
        '2. Details: Nơi đó làm ra sản phẩm gì hoặc cung cấp hoạt động gì? (Sử dụng các từ vựng: artisan, pass down, preserve, handicraft)',
        '3. Feelings & Future: Cảm nghĩ của em và đề xuất giải pháp gìn giữ.'
      ],
      usefulPhrases: [
        'My hometown is famous for...',
        'Artisans use traditional skills to make...',
        'These products are passed down from generation to generation.',
        'We should protect and promote our local community crafts.'
      ],
      wordLimit: '60 - 80 từ',
      sampleGrade10Response: `Van Phuc Silk Village is a famous craft village located in Ha Dong district, Ha Noi. For hundreds of years, local artisans have passed down silk weaving skills from generation to generation. Van Phuc silk is renowned for its softness, durability, and exquisite patterns. Visiting the village allows tourists to witness the traditional silk-making process and buy handmade silk scarves. I feel proud of Van Phuc silk village and believe we should promote it to international friends.`
    }
  },
  {
    id: 2,
    title: 'Unit 2: City Life',
    theme: 'Cuộc sống đô thị & So sánh tính từ',
    description: 'Khám phá nhịp sống thành thị, giao thông, ưu nhược điểm của thành phố lớn và tính từ so sánh hơn / so sánh nhất.',
    pronunciationFocus: 'Ngữ âm: Nhấn trọng âm từ có 2 và 3 âm tiết (Stress on multi-syllable words)',
    badgeIconName: 'Building2',
    vocabulary: [
      {
        id: 'u2-v1',
        word: 'metropolis',
        phonetic: '/mɪˈtrɒpəlɪs/',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'đô thị lớn, thành phố trung tâm',
        englishExample: 'Ho Chi Minh City is a bustling metropolis with millions of motorbikes.',
        vietnameseExample: 'Thành phố Hồ Chí Minh là một đô thị nhộn nhịp với hàng triệu xe máy.',
      },
      {
        id: 'u2-v2',
        word: 'bustling',
        phonetic: '/ˈbʌslɪŋ/',
        partOfSpeech: 'adjective',
        vietnameseMeaning: 'hối hả, rộn rã, nhộn nhịp',
        englishExample: 'The night market is bustling with food vendors and happy tourists.',
        vietnameseExample: 'Chợ đêm nhộn nhịp với các hàng ăn và du khách vui vẻ.',
      },
      {
        id: 'u2-v3',
        word: 'traffic jam',
        phonetic: '/ˈtræfɪk ʤæm/',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'ùn tắc giao thông, kẹt xe',
        englishExample: 'Commuters often get stuck in heavy traffic jams during rush hour.',
        vietnameseExample: 'Người đi làm thường bị kẹt trong những vụ tắc đường nghiêm trọng vào giờ cao điểm.',
      },
      {
        id: 'u2-v4',
        word: 'convenient',
        phonetic: '/kənˈviːniənt/',
        partOfSpeech: 'adjective',
        vietnameseMeaning: 'tiện lợi, thuận tiện',
        englishExample: 'Living in the city center is convenient because everything is nearby.',
        vietnameseExample: 'Sống ở trung tâm thành phố rất tiện lợi vì mọi thứ đều ở gần.',
      },
      {
        id: 'u2-v5',
        word: 'polluted',
        phonetic: '/pəˈluːtɪd/',
        partOfSpeech: 'adjective',
        vietnameseMeaning: 'bị ô nhiễm',
        englishExample: 'Exhaust fumes from cars make the city air polluted.',
        vietnameseExample: 'Khí thải từ ô tô làm không khí thành phố bị ô nhiễm.',
      },
      {
        id: 'u2-v6',
        word: 'cost of living',
        phonetic: '/kɒst ɒv ˈlɪvɪŋ/',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'chi phí sinh hoạt',
        englishExample: 'The cost of living in big cities is much higher than in rural areas.',
        vietnameseExample: 'Chi phí sinh hoạt ở các thành phố lớn cao hơn nhiều so với khu vực nông thôn.',
      },
      {
        id: 'u2-v7',
        word: 'crowded',
        phonetic: '/ˈkraʊdɪd/',
        partOfSpeech: 'adjective',
        vietnameseMeaning: 'đông đúc, chật nát',
        englishExample: 'The shopping mall is always crowded with teenagers on weekends.',
        vietnameseExample: 'Trung tâm thương mại luôn đông đúc các bạn trẻ vào cuối tuần.',
      },
      {
        id: 'u2-v8',
        word: 'infrastructure',
        phonetic: '/ˈɪnfrəˌstrʌkʧə/',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'cơ sở hạ tầng (đường xá, cầu cống, xe buýt)',
        englishExample: 'Modern cities invest heavily in upgrading public infrastructure.',
        vietnameseExample: 'Các thành phố hiện đại đầu tư mạnh mẽ vào việc nâng cấp cơ sở hạ tầng công cộng.',
      }
    ],
    grammar: {
      title: 'So sánh hơn & So sánh nhất của tính từ (Comparative & Superlative Adjectives)',
      summary: 'Dùng để so sánh 2 đối tượng (So sánh hơn) hoặc từ 3 đối tượng trở lên (So sánh nhất). Cần chú ý tính từ ngắn và tính từ dài.',
      formulaBox: [
        'So sánh hơn: Short Adj + ER + THAN | MORE + Long Adj + THAN',
        'So sánh nhất: THE + Short Adj + EST | THE MOST + Long Adj',
        'Ngoại lệ: good -> better -> best, bad -> worse -> worst, far -> farther/further -> farthest'
      ],
      usagePoints: [
        {
          title: '1. So sánh hơn tính từ ngắn & dài',
          detail: 'Tính từ 1 âm tiết hoặc kết thúc bằng -y -> thêm -er. Tính từ 2 âm tiết trở lên -> dùng MORE.',
          example: 'Ha Noi is noisier than my peaceful hometown.'
        },
        {
          title: '2. So sánh gấp nhiều lần & Nhấn mạnh',
          detail: 'Dùng "much" hoặc "far" trước so sánh hơn để nhấn mạnh sự khác biệt lớn.',
          example: 'Public transport in Tokyo is much more efficient than in smaller towns.'
        }
      ],
      exercises: [
        {
          id: 'u2-g1',
          question: 'The metro system in the city center is much _____ than going by bus.',
          options: ['A. fast', 'B. faster', 'C. fastest', 'D. more fast'],
          correctAnswer: 'B. faster',
          explanation: '"Fast" là tính từ ngắn nên dạng so sánh hơn là "faster". Dùng "much" để nhấn mạnh.'
        },
        {
          id: 'u2-g2',
          question: 'Air pollution is one of _____ challenges in overcrowded modern metropolises.',
          options: ['A. serious', 'B. more serious', 'C. the most serious', 'D. most serious'],
          correctAnswer: 'C. the most serious',
          explanation: 'Dạng so sánh nhất của tính từ dài "serious" phải có "the most serious".'
        },
        {
          id: 'u2-g3',
          question: 'Living in a big city is getting _____ expensive than living in the countryside.',
          options: ['A. more', 'B. most', 'C. as', 'D. much'],
          correctAnswer: 'A. more',
          explanation: 'Chủ đề so sánh tính từ dài "expensive" trong câu so sánh hơn dùng "more expensive than".'
        },
        {
          id: 'u2-g4',
          question: 'Ho Chi Minh City is _____ metropolis in Viet Nam in terms of population size.',
          options: ['A. large', 'B. larger', 'C. largest', 'D. the largest'],
          correctAnswer: 'D. the largest',
          explanation: 'So sánh nhất tính từ ngắn "large" cần có mạo từ "the largest".'
        },
        {
          id: 'u2-g5',
          question: 'Public transport in Tokyo is _____ efficient than private motorbikes in rush hours.',
          options: ['A. very', 'B. far more', 'C. so', 'D. most'],
          correctAnswer: 'B. far more',
          explanation: 'Dùng "far more" để nhấn mạnh mức độ vượt trội trong so sánh hơn.'
        },
        {
          id: 'u2-g6',
          question: 'Is the cost of living in Da Nang _____ than in Ha Noi?',
          options: ['A. low', 'B. lowest', 'C. lower', 'D. more low'],
          correctAnswer: 'C. lower',
          explanation: 'Tính từ ngắn "low" có dạng so sánh hơn là "lower".'
        }
      ]
    },
    listening: {
      audioTitle: 'Listening: Living in a Smart Metropolis',
      audioDuration: '2:00',
      audioScriptSpeaker: 'Alex & Host',
      transcriptText: `Host: Welcome to Teen Voice podcast! Today we talk with Alex about living in Danang city.
Alex: Hi! Danang is often considered one of the most livable cities in Viet Nam. What I love most is the combination of modern infrastructure and beautiful beaches. The public buses are modern and clean, so getting around is much cheaper than taking taxis.
However, during holiday seasons, the famous Dragon Bridge area gets extremely crowded with visitors. Overall, life here is less stressful than in mega metropolises like Ha Noi or Ho Chi Minh City!`,
      vietnameseTranslation: `MC: Chào mừng đến với podcast Teen Voice! Hôm nay chúng ta trò chuyện với Alex về cuộc sống ở thành phố Đà Nẵng.
Alex: Chào mọi người! Đà Nẵng thường được coi là một trong những thành phố đáng sống nhất Việt Nam. Điều mình thích nhất là sự kết hợp giữa hạ tầng hiện đại và những bãi biển tuyệt đẹp. Xe buýt công cộng hiện đại và sạch sẽ, nên di chuyển rẻ hơn nhiều so với đi taxi.
Tuy nhiên, vào các mùa lễ hội, khu vực Cầu Rồng nổi tiếng thường trở nên cực kỳ đông đúc khách tham quan. Nhìn chung, cuộc sống ở đây ít áp lực hơn so với các siêu đô thị như Hà Nội hay TP. Hồ Chí Minh!`,
      questions: [
        {
          id: 'u2-l1',
          question: 'What does Alex love most about Danang?',
          options: [
            'A. Expensive luxury shopping malls',
            'B. Combination of modern infrastructure and beautiful beaches',
            'C. Quiet countryside life',
            'D. Free taxi rides'
          ],
          correctAnswerIndex: 1,
          explanation: 'Alex phát biểu: "What I love most is the combination of modern infrastructure and beautiful beaches."'
        },
        {
          id: 'u2-l2',
          question: 'Why is getting around Danang by public bus recommended?',
          options: [
            'A. Buses are slow and dirty',
            'B. It is much cheaper than taking taxis and buses are modern and clean',
            'C. Buses are free for tourists',
            'D. Taxis are dangerous'
          ],
          correctAnswerIndex: 1,
          explanation: 'Bài nghe nêu: "The public buses are modern and clean, so getting around is much cheaper than taking taxis."'
        },
        {
          id: 'u2-l3',
          question: 'Which area in Danang gets overcrowded during holiday seasons?',
          options: ['A. The airport', 'B. Dragon Bridge area', 'C. Han river market', 'D. City railway station'],
          correctAnswerIndex: 1,
          explanation: 'Bài nghe nêu: "during holiday seasons, the famous Dragon Bridge area gets extremely crowded..."'
        }
      ],
      fillInBlankExercises: [
        {
          id: 'u2-lf1',
          sentenceWithBlank: 'Danang combines modern infrastructure and beautiful _____.',
          correctWord: 'beaches',
          hint: 'Các bãi biển (bắt đầu bằng b)'
        },
        {
          id: 'u2-lf2',
          sentenceWithBlank: 'Public buses in Danang are clean and much _____ than taxis.',
          correctWord: 'cheaper',
          hint: 'Rẻ hơn (so sánh hơn của cheap)'
        },
        {
          id: 'u2-lf3',
          sentenceWithBlank: 'Life in Danang is less _____ than in mega metropolises like Ha Noi.',
          correctWord: 'stressful',
          hint: 'Gây căng thẳng (bắt đầu bằng s)'
        }
      ]
    },
    speakingPrompts: [
      {
        id: 'u2-s1',
        targetSentence: 'Public transportation is much more convenient and less polluted than private motorbikes.',
        ipa: '/ˈpʌblɪk ˌtrænspɔːˈteɪʃən ɪz mʌʧ mɔː kənˈviːniənt ænd lɛs pəˈluːtɪd ðæn ˈpraɪvɪt ˈməʊtəˌbaɪks/',
        vietnameseMeaning: 'Giao thông công cộng tiện lợi hơn nhiều và ít ô nhiễm hơn so với xe máy cá nhân.',
        contextSituation: 'Thảo luận về giải pháp ưu việt cho giao thông đô thị.',
        keyPhonicsFocus: 'Chú ý nhấn trọng âm rơi vào từ "transportation", "convenient", "polluted".',
        sampleAudioText: 'Public transportation is much more convenient and less polluted than private motorbikes.'
      },
      {
        id: 'u2-s2',
        targetSentence: 'The cost of living in big cities is rising higher every year.',
        ipa: '/ðə kɒst ɒv ˈlɪvɪŋ ɪn bɪɡ ˈsɪtiz ɪz ˈraɪzɪŋ ˈhaɪə ˈɛvri jɪə/',
        vietnameseMeaning: 'Chi phí sinh hoạt ở các thành phố lớn đang tăng cao hơn qua mỗi năm.',
        contextSituation: 'Nói về thách thức chi tiêu sinh hoạt khi sống ở thành thị.',
        keyPhonicsFocus: 'Chú ý phát âm rõ âm /s/ trong "cost" và âm /z/ trong "rising".',
        sampleAudioText: 'The cost of living in big cities is rising higher every year.'
      },
      {
        id: 'u2-s3',
        targetSentence: 'Ho Chi Minh City is the most bustling metropolis in southern Viet Nam.',
        ipa: '/hoʊ ʧiː mɪn ˈsɪti ɪz ðə məʊst ˈbʌslɪŋ mɪˈtrɒpəlɪs ɪn ˈsʌðən vɪet nɑːm/',
        vietnameseMeaning: 'Thành phố Hồ Chí Minh là đô thị nhộn nhịp nhất ở miền Nam Việt Nam.',
        contextSituation: 'Miêu tả nhịp sống sôi động của trung tâm kinh tế phía Nam.',
        keyPhonicsFocus: 'Phát âm cẩn thận trọng âm từ "bustling" /ˈbʌslɪŋ/ và "metropolis" /mɪˈtrɒpəlɪs/.',
        sampleAudioText: 'Ho Chi Minh City is the most bustling metropolis in southern Viet Nam.'
      }
    ],
    reading: {
      title: 'Urbanization and Life in Modern Megacities',
      topic: 'Đô thị hóa và nhịp sống tại các siêu đô thị',
      passageText: `As cities grow rapidly, millions of people move to urban centers in search of better education, high-paying jobs, and advanced healthcare services. Metropolises offer exciting entertainment choices, from shopping malls and cinemas to international food markets.
On the downside, rapid urbanization creates heavy traffic jams, air pollution, and high housing prices. To overcome these problems, smart cities are building underground subway lines, expanding green parks, and using renewable solar energy.`,
      keyVocabularyHighlights: [
        { word: 'urbanization', meaning: 'sự đô thị hóa' },
        { word: 'megacity', meaning: 'siêu đô thị (>10 triệu dân)' },
        { word: 'subway', meaning: 'mạng lưới tàu điện ngầm' }
      ],
      questions: [
        {
          id: 'u2-r1',
          question: 'What is a major advantage of living in modern metropolises mentioned in the text?',
          options: [
            'A. Fresh air and low noise',
            'B. Cheap housing prices',
            'C. Access to better education, jobs, and healthcare',
            'D. Zero traffic jams'
          ],
          correctAnswerIndex: 2,
          explanation: 'Đoạn 1 nêu rõ: "...in search of better education, high-paying jobs, and advanced healthcare services."'
        },
        {
          id: 'u2-r2',
          question: 'What negative consequences result from rapid urbanization?',
          options: [
            'A. Heavy traffic jams, air pollution, and high housing prices',
            'B. Decreased population in cities',
            'C. Lack of entertainment centers',
            'D. Free houses for everyone'
          ],
          correctAnswerIndex: 0,
          explanation: 'Đoạn 2 chỉ ra: "creates heavy traffic jams, air pollution, and high housing prices."'
        },
        {
          id: 'u2-r3',
          question: 'How are smart cities tackling urban environment issues?',
          options: [
            'A. By banning all private cars permanently',
            'B. By building underground subway lines, expanding parks, and using solar energy',
            'C. By moving hospitals to rural areas',
            'D. By cutting down city trees'
          ],
          correctAnswerIndex: 1,
          explanation: 'Đoạn 2 kết luận: "smart cities are building underground subway lines, expanding green parks, and using renewable solar energy."'
        }
      ]
    },
    writing: {
      id: 'u2-w1',
      title: 'Write a short passage comparing living in the city and living in the countryside.',
      description: 'Viết đoạn văn 60-80 từ so sánh giữa cuộc sống ở thành phố và ở nông thôn.',
      suggestedOutline: [
        '1. Sentence 1: Nêu ý chính (cả hai nơi có điểm khác biệt rõ rệt).',
        '2. Sentence 2-3: Thành phố tiện lợi hơn, nhộn nhịp hơn nhưng đắt đỏ và ồn ào hơn.',
        '3. Sentence 4-5: Nông thôn yên bình hơn, không khí trong lành hơn nhưng ít tiện ích hơn.',
        '4. Conclusion: Tóm tắt lại sở thích của em.'
      ],
      usefulPhrases: [
        'Living in the city is much more convenient than...',
        'However, the cost of living is higher in...',
        'On the other hand, the countryside offers fresher air and...',
        'In my opinion, I prefer...'
      ],
      wordLimit: '60 - 80 từ',
      sampleGrade10Response: `Living in the city and living in the countryside have distinct differences. On one hand, city life is much more convenient because of modern schools, entertainment, and efficient healthcare. However, metropolises are noisier, more polluted, and have a higher cost of living. On the other hand, the countryside offers a peaceful environment and fresher air. In my opinion, although the city can be hectic during rush hours, I prefer city life for its educational opportunities.`
    }
  },
  {
    id: 3,
    title: 'Unit 3: Healthy Living for Teens',
    theme: 'Lối sống lành mạnh & Động từ khuyết thiếu',
    description: 'Rèn luyện sức khỏe thể chất và tinh thần cho lứa tuổi teen, các động từ khuyết thiếu (Modal Verbs: should, must, have to).',
    pronunciationFocus: 'Ngữ âm: Âm /h/ và /r/ chuẩn xác trong giao tiếp',
    badgeIconName: 'HeartPulse',
    vocabulary: [
      {
        id: 'u3-v1',
        word: 'well-balanced diet',
        phonetic: '/wɛl-ˈbælənst ˈdaɪət/',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'chế độ ăn uống cân bằng dinh dưỡng',
        englishExample: 'Teens should maintain a well-balanced diet rich in vegetables and proteins.',
        vietnameseExample: 'Lứa tuổi teen nên duy trì một chế độ ăn cân bằng dinh dưỡng giàu rau xanh và chất đạm.',
      },
      {
        id: 'u3-v2',
        word: 'physical health',
        phonetic: '/ˈfɪzɪkəl hɛlθ/',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'sức khỏe thể chất',
        englishExample: 'Doing morning exercises regularly improves physical health.',
        vietnameseExample: 'Tập thể dục buổi sáng thường xuyên làm cải thiện sức khỏe thể chất.',
      },
      {
        id: 'u3-v3',
        word: 'mental wellbeing',
        phonetic: '/ˈmɛntl ˌwɛlˈbiːɪŋ/',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'sức khỏe tinh thần, sự thoải mái tâm trí',
        englishExample: 'Getting enough sleep is crucial for a student mental wellbeing.',
        vietnameseExample: 'Ngủ đủ giấc là điều vô cùng quan trọng đối với sức khỏe tinh thần của học sinh.',
      },
      {
        id: 'u3-v4',
        word: 'manage stress',
        phonetic: '/ˈmænɪʤ strɛs/',
        partOfSpeech: 'verb',
        vietnameseMeaning: 'quản lý / giải tỏa căng thẳng',
        englishExample: 'Listening to calm music helps students manage exam stress effectively.',
        vietnameseExample: 'Nghe nhạc êm dịu giúp học sinh giải tỏa căng thẳng thi cử một cách hiệu quả.',
      }
    ],
    grammar: {
      title: 'Động từ khuyết thiếu: Should / Shouldn\'t, Must / Mustn\'t, Have to',
      summary: 'Dùng để đưa ra lời khuyên (should), nghĩa vụ bắt buộc (must / have to) hoặc điều cấm đoán (mustn\'t).',
      formulaBox: [
        'S + SHOULD / SHOULDN\'T + V-bare (Lời khuyên nên / không nên làm gì)',
        'S + MUST + V-bare (Quy định bắt buộc theo luật hoặc nguyên tắc)',
        'S + MUSTN\'T + V-bare (Cấm tuyệt đối không được làm)'
      ],
      usagePoints: [
        {
          title: '1. Khác biệt Must vs Have to',
          detail: 'Must thể hiện sự bắt buộc từ chủ quan người nói. Have to thể hiện quy định khách quan từ bên ngoài (luật trường, quy chế).',
          example: 'Students must turn off mobile phones during examination hours.'
        }
      ],
      exercises: [
        {
          id: 'u3-g1',
          question: 'Teens _____ stay up late playing video games if they want to stay focused in school.',
          options: ['A. should', 'B. shouldn\'t', 'C. must', 'D. have to'],
          correctAnswer: 'B. shouldn\'t',
          explanation: 'Đưa ra lời khuyên "không nên" thức khuya dùng "shouldn\'t".'
        },
        {
          id: 'u3-g2',
          question: 'All Grade 9 students _____ wear uniform when coming to school on Mondays.',
          options: ['A. have to', 'B. shouldn\'t', 'C. mustn\'t', 'D. don\'t have to'],
          correctAnswer: 'A. have to',
          explanation: 'Nghĩa vụ quy định nội quy nhà trường dùng "have to".'
        },
        {
          id: 'u3-g3',
          question: 'You _____ eat too much fast food and sugary drinks because it harms physical health.',
          options: ['A. should', 'B. must', 'C. mustn\'t', 'D. have to'],
          correctAnswer: 'C. mustn\'t',
          explanation: 'Cấm đoán / không được làm việc có hại sức khỏe dùng "mustn\'t".'
        },
        {
          id: 'u3-g4',
          question: 'To manage exam stress effectively, teenagers _____ get at least 8 hours of sleep every night.',
          options: ['A. should', 'B. shouldn\'t', 'C. mustn\'t', 'D. don\'t have to'],
          correctAnswer: 'A. should',
          explanation: 'Đưa ra lời khuyên hữu ích nên làm dùng "should".'
        },
        {
          id: 'u3-g5',
          question: 'You _____ buy expensive gym equipment; jogging in the local park is free and beneficial.',
          options: ['A. must', 'B. don\'t have to', 'C. shouldn\'t', 'D. have to'],
          correctAnswer: 'B. don\'t have to',
          explanation: 'Không bắt buộc phải làm việc gì dùng "don\'t have to".'
        },
        {
          id: 'u3-g6',
          question: 'Students _____ turn off their mobile phones during examination hours.',
          options: ['A. must', 'B. shouldn\'t', 'C. don\'t have to', 'D. might'],
          correctAnswer: 'A. must',
          explanation: 'Quy chế thi cử bắt buộc nghiêm ngặt dùng "must".'
        }
      ]
    },
    listening: {
      audioTitle: 'Listening: Advice from School Counselor',
      audioDuration: '1:45',
      audioScriptSpeaker: 'Counselor Mrs. Hoa',
      transcriptText: `Good morning students! Today I want to share three simple habits for a healthy teen lifestyle.
First, never skip breakfast. A nutritious meal in the morning gives your brain energy for study.
Second, limit your screen time before bedtime. Blue light from smartphones disturbs your sleep cycle.
Third, talk to a counselor or friend when you feel overwhelmed by schoolwork. Protecting your mental health is as important as physical exercise!`,
      vietnameseTranslation: `Chào buổi sáng các em! Hôm nay cô muốn chia sẻ 3 thói quen đơn giản cho lối sống lành mạnh lứa tuổi teen.
Thứ nhất, không bao giờ bỏ bữa sáng. Bữa ăn dinh dưỡng buổi sáng cung cấp năng lượng cho não bộ học tập.
Thứ hai, hạn chế thời gian dùng màn hình trước khi đi ngủ. Ánh sáng xanh từ điện thoại làm gián đoạn chu kỳ ngủ.
Thứ ba, hãy tâm sự với tư vấn viên hoặc bạn bè khi cảm thấy bị áp lực học tập đè nặng. Bảo vệ sức khỏe tinh thần quan trọng không kém tập thể dục!`,
      questions: [
        {
          id: 'u3-l1',
          question: 'What is the counselor\'s first piece of advice?',
          options: ['A. Play football daily', 'B. Never skip breakfast', 'C. Drink coffee', 'D. Study until 2 AM'],
          correctAnswerIndex: 1,
          explanation: 'Bài nghe nêu rõ: "First, never skip breakfast."'
        }
      ]
    },
    speakingPrompts: [
      {
        id: 'u3-s1',
        targetSentence: 'To manage stress before exams, we should balance study time with regular exercise.',
        ipa: '/tuː ˈmænɪʤ strɛs bɪˈfɔː ɪgˈzæmz, wiː ʃʊd ˈbæləns ˈstʌdi taɪm wɪð ˈrɛgjʊlə ˈɛksəsaɪz/',
        vietnameseMeaning: 'Để quản lý căng thẳng trước kỳ thi, chúng ta nên cân bằng thời gian học tập với việc tập thể dục thường xuyên.',
        contextSituation: 'Đưa ra lời khuyên cho bạn bè trước đợt thi học kỳ.',
        keyPhonicsFocus: 'Chú ý phát âm rõ /s/ trong "stress" và /gz/ trong "exams".',
        sampleAudioText: 'To manage stress before exams, we should balance study time with regular exercise.'
      }
    ],
    reading: {
      title: 'Building Healthy Habits in Adolescence',
      topic: 'Xây dựng thói quen sống khỏe ở lứa tuổi thanh thiếu niên',
      passageText: `Adolescence is a crucial period for physical and emotional growth. Teenagers require about 8 to 10 hours of sleep every night to allow their bodies to recover. Eating fast food frequently leads to weight gain and tiredness. Drinking plenty of water, staying physically active, and practicing mindfulness are key elements for maintaining high energy throughout the day.`,
      keyVocabularyHighlights: [
        { word: 'adolescence', meaning: 'giai đoạn tuổi vị thành niên' },
        { word: 'mindfulness', meaning: 'sự tĩnh tâm, thiền định chánh niệm' }
      ],
      questions: [
        {
          id: 'u3-r1',
          question: 'How many hours of sleep do teenagers need per night according to the passage?',
          options: ['A. 4 to 5 hours', 'B. 6 to 7 hours', 'C. 8 to 10 hours', 'D. 12 hours'],
          correctAnswerIndex: 2,
          explanation: 'Đoạn văn ghi: "Teenagers require about 8 to 10 hours of sleep every night..."'
        }
      ]
    },
    writing: {
      id: 'u3-w1',
      title: 'Write a paragraph (60-80 words) giving advice on how teenagers can maintain a healthy lifestyle.',
      description: 'Viết đoạn văn 60-80 từ đưa ra lời khuyên cách thanh thiếu niên duy trì lối sống lành mạnh.',
      suggestedOutline: [
        '1. Topic sentence: Nêu tầm quan trọng của lối sống lành mạnh cho tuổi teen.',
        '2. Detail 1: Ăn uống cân bằng và tập thể dục (dùng should/shouldn\'t).',
        '3. Detail 2: Ngủ đủ giấc và quản lý căng thẳng.',
        '4. Concluding sentence: Tóm tắt lợi ích.'
      ],
      usefulPhrases: [
        'Teenagers should maintain a well-balanced diet...',
        'To reduce stress, it is important to...',
        'Moreover, we must avoid staying up too late...',
        'In short, healthy habits bring happiness and energy.'
      ],
      wordLimit: '60 - 80 từ',
      sampleGrade10Response: `Maintaining a healthy lifestyle is essential for all teenagers. First, we should eat a well-balanced diet with plenty of fruits and vegetables while limiting junk food. Second, doing regular physical exercise like swimming or cycling keeps our bodies strong. Third, teens must get 8 to 10 hours of sleep every night to recover energy. Lastly, listening to music or playing sports helps us manage stress effectively. Following these habits leads to good mental and physical wellbeing.`
    }
  },
  {
    id: 4,
    title: 'Unit 4: Remember the Past',
    theme: 'Ký ức quá khứ & Cấu trúc Used to',
    description: 'Ôn lại lịch sử, các phong tục truyền thống, cấu trúc Used to và câu ước Wish.',
    pronunciationFocus: 'Ngữ âm: Phát âm chuẩn đuôi /t/ và /d/ trong quá khứ',
    badgeIconName: 'History',
    vocabulary: [
      {
        id: 'u4-v1',
        word: 'used to',
        phonetic: '/juːst tuː/',
        partOfSpeech: 'verb',
        vietnameseMeaning: 'đã từng (thói quen trong quá khứ nay không còn)',
        englishExample: 'My grandfather used to write letters by hand before smartphones existed.',
        vietnameseExample: 'Ông tôi đã từng viết thư tay trước khi có điện thoại thông minh.',
      },
      {
        id: 'u4-v2',
        word: 'tradition',
        phonetic: '/trəˈdɪʃən/',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'truyền thống',
        englishExample: 'Gathering together on Tet holiday is a precious Vietnamese tradition.',
        vietnameseExample: 'Tụ họp cùng nhau vào dịp Tết là một truyền thống quý báu của người Việt Nam.',
      },
      {
        id: 'u4-v3',
        word: 'generation',
        phonetic: '/ˌʤɛnəˈreɪʃən/',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'thế hệ',
        englishExample: 'Extended families of three generations often lived under one roof in the past.',
        vietnameseExample: 'Gia đình đại gia đình gồm ba thế hệ thường sống chung một mái nhà trong quá khứ.',
      }
    ],
    grammar: {
      title: 'Cấu trúc Used to & Cấu trúc ước nguyện ở hiện tại (Wish for present)',
      summary: 'Used to + V-bare: Thói quen trong quá khứ. Wish + S + V-past: Câu ước trái ngược với thực tế ở hiện tại.',
      formulaBox: [
        'Used to: (+) S + used to + V-bare | (-) S + didn\'t use to + V-bare',
        'Wish at present: S + wish(es) + (that) + S + V-past (Were dùng cho mọi ngôi)'
      ],
      usagePoints: [
        {
          title: '1. Cấu trúc Wish trái thực tế hiện tại',
          detail: 'Lùi thì về Quá khứ đơn. Với động từ To Be, dùng WERE cho tất cả các ngôi (I/he/she/it/we/they).',
          example: 'I wish my family lived closer to my hometown. (Thực tế hiện tại: đang sống xa)'
        }
      ],
      exercises: [
        {
          id: 'u4-g1',
          question: 'Many Vietnamese children _____ play traditional games like tug of war in village yards.',
          options: ['A. used to', 'B. use to', 'C. are used to', 'D. get used to'],
          correctAnswer: 'A. used to',
          explanation: 'Thói quen trong quá khứ đã kết thúc dùng "used to + V-bare".'
        },
        {
          id: 'u4-g2',
          question: 'I wish there _____ more green parks in our modern neighborhood nowadays.',
          options: ['A. is', 'B. are', 'C. were', 'D. have been'],
          correctAnswer: 'C. were',
          explanation: 'Câu ước ở hiện tại lùi thì về quá khứ, To Be dùng "were".'
        },
        {
          id: 'u4-g3',
          question: 'My grandmother _____ cook delicious traditional meals on wood stoves in the past.',
          options: ['A. use to', 'B. used to', 'C. is used to', 'D. gets used to'],
          correctAnswer: 'B. used to',
          explanation: 'Kể về thói quen sinh hoạt trong quá khứ dùng "used to".'
        },
        {
          id: 'u4-g4',
          question: 'I wish my parents _____ so busy with work so we could travel to our hometown together.',
          options: ['A. aren\'t', 'B. won\'t be', 'C. weren\'t', 'D. haven\'t been'],
          correctAnswer: 'C. weren\'t',
          explanation: 'Câu ước trái với thực tế hiện tại dùng dạng phủ định quá khứ "weren\'t".'
        },
        {
          id: 'u4-g5',
          question: 'People didn\'t _____ have high-speed internet or smartphones fifty years ago.',
          options: ['A. use to', 'B. used to', 'C. using to', 'D. uses to'],
          correctAnswer: 'A. use to',
          explanation: 'Trong câu phủ định với "didn\'t", động từ trở về nguyên mẫu "use to".'
        },
        {
          id: 'u4-g6',
          question: 'I wish I _____ speak English as fluently as an international tour guide.',
          options: ['A. can', 'B. could', 'C. will', 'D. am able to'],
          correctAnswer: 'B. could',
          explanation: 'Câu ước khả năng ở hiện tại chuyển "can" thành "could".'
        }
      ]
    },
    listening: {
      audioTitle: 'Listening: Life in a Vietnamese Village 50 Years Ago',
      audioDuration: '2:10',
      audioScriptSpeaker: 'Grandmother Ba',
      transcriptText: `In the past, our village life was very simple. We didn't have electricity or modern gas stoves. Every evening, families gathered around oil lamps to share stories after a hard day of harvesting rice.
Children used to play folk games like hide-and-seek, Mandarin square capturing, and kite flying. Although life was tough, people were extremely close and supported each other like a big family!`,
      vietnameseTranslation: `Ngày xưa, cuộc sống làng quê tôi rất giản dị. Chúng tôi không có điện hay bếp gas hiện đại. Mỗi buổi tối, các gia đình quây quần bên đèn dầu chia sẻ chuyện trò sau một ngày gặt lúa vất vả.
Trẻ con đã từng chơi các trò chơi dân gian như trốn tìm, ô ăn quan và thả diều. Tuy cuộc sống vất vả, mọi người lại cực kỳ gắn kết và hỗ trợ lẫn nhau như một gia đình lớn!`,
      questions: [
        {
          id: 'u4-l1',
          question: 'What source of light did families gather around in the past evening?',
          options: ['A. Electric bulbs', 'B. Smartphone lights', 'C. Oil lamps', 'D. Neon tubes'],
          correctAnswerIndex: 2,
          explanation: 'Bài nghe đề cập: "families gathered around oil lamps..."'
        }
      ]
    },
    speakingPrompts: [
      {
        id: 'u4-s1',
        targetSentence: 'My grandparents used to cook traditional meals on wood stoves during cold winters.',
        ipa: '/maɪ ˈgrænˌpɛərənts juːst tuː kʊk trəˈdɪʃənl miːlz ɒn wʊd stəʊvz ˈdjʊərɪŋ kəʊld ˈwɪntəz/',
        vietnameseMeaning: 'Ông bà tôi đã từng nấu các bữa ăn truyền thống trên bếp củi vào những mùa đông lạnh giá.',
        contextSituation: 'Kể về kỷ niệm thói quen ngày xưa của người thân.',
        keyPhonicsFocus: 'Chú ý nối âm giữa "used" và "to" (/juːst tuː/).',
        sampleAudioText: 'My grandparents used to cook traditional meals on wood stoves during cold winters.'
      }
    ],
    reading: {
      title: 'Preserving Traditional Vietnamese Folk Games',
      topic: 'Gìn giữ các trò chơi dân gian Việt Nam',
      passageText: `Folk games are an important part of Vietnamese cultural heritage. In the past, children didn't have electronic tablets or video games. Instead, they played outdoors in courtyard areas. Popular games included Mandarin Square Capturing (Ô ăn quan), Bamboo Jacks (Chơi chuyền), and Tug of War (Kéo co).
These traditional games helped children develop teamwork skills, quick reflexes, and physical strength. Today, many schools are introducing folk games back into physical education classes to preserve cultural traditions.`,
      keyVocabularyHighlights: [
        { word: 'folk games', meaning: 'trò chơi dân gian' },
        { word: 'courtyard', meaning: 'sân nhà, sân đình' },
        { word: 'teamwork', meaning: 'tinh thần làm việc nhóm' }
      ],
      questions: [
        {
          id: 'u4-r1',
          question: 'Why are schools reintroducing folk games into physical education?',
          options: [
            'A. Because video games are banned.',
            'B. To preserve cultural traditions and develop teamwork skills.',
            'C. Because students requested free time.',
            'D. To replace math classes.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Đoạn 2 nêu: "These games helped children develop teamwork... Today, many schools are introducing folk games... to preserve cultural traditions."'
        }
      ]
    },
    writing: {
      id: 'u4-w1',
      title: 'Write a paragraph (60-80 words) about what your grandparents used to do in the past.',
      description: 'Viết đoạn văn 60-80 từ kể về những việc ông bà em từng làm trong quá khứ.',
      suggestedOutline: [
        '1. Introduction: Giới thiệu về cuộc sống của ông bà trong quá khứ.',
        '2. Details: Ông bà đã từng làm gì? (Dùng used to: làm ruộng, nấu bếp củi, thêu thùa, kể chuyện cổ tích).',
        '3. Wish: Em ước gì về sự gắn kết gia đình thời xưa.',
        '4. Conclusion: Tình cảm kính trọng ông bà.'
      ],
      usefulPhrases: [
        'In the past, my grandparents used to live in a small village.',
        'My grandmother used to weave clothes by hand.',
        'I wish life nowadays were as peaceful as in their memories.',
        'I respect my grandparents for their hard work.'
      ],
      wordLimit: '60 - 80 từ',
      sampleGrade10Response: `In the past, my grandparents used to live in a quiet countryside village. Before modern electronics existed, my grandmother used to cook meals on wood stoves and weave warm blankets by hand. My grandfather used to work hard in the rice fields and tell us fascinating folk tales under the oil lamp light. Although life was difficult back then, families were very close. I wish modern teens had more time to listen to historical family stories.`
    }
  },
  {
    id: 5,
    title: 'Unit 5: Wonders of Viet Nam',
    theme: 'Kỳ quan Việt Nam & Câu bị động / Mệnh đề quan hệ',
    description: 'Khám phá các di sản thiên nhiên Việt Nam (Ha Long Bay, Phong Nha Cave, Trang An), câu bị động (Passive voice) và đại từ quan hệ (Who/Which/That).',
    pronunciationFocus: 'Ngữ âm: Nhấn trọng âm từ kép và địa danh',
    badgeIconName: 'Compass',
    vocabulary: [
      {
        id: 'u5-v1',
        word: 'natural wonder',
        phonetic: '/ˈnæʧrəl ˈwʌndə/',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'kỳ quan thiên nhiên',
        englishExample: 'Ha Long Bay is recognized worldwide as an outstanding natural wonder.',
        vietnameseExample: 'Vịnh Hạ Long được công nhận trên toàn thế giới là một kỳ quan thiên nhiên xuất sắc.',
      },
      {
        id: 'u5-v2',
        word: 'limestone cave',
        phonetic: '/ˈlaɪmstəʊn keɪv/',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'hang động đá vôi',
        englishExample: 'Phong Nha - Ke Bang features magnificent limestone caves and underground rivers.',
        vietnameseExample: 'Phong Nha - Kẻ Bàng sở hữu những hang động đá vôi tráng lệ và sông ngầm.',
      },
      {
        id: 'u5-v3',
        word: 'UNESCO World Heritage',
        phonetic: '/juːˈnɛskəʊ wɜːld ˈhɛrɪtɪʤ/',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'Di sản thế giới UNESCO',
        englishExample: 'Trang An Landscape Complex was recognized as a UNESCO World Heritage site.',
        vietnameseExample: 'Quần thể danh thắng Tràng An đã được công nhận là Di sản Thế giới UNESCO.',
      }
    ],
    grammar: {
      title: 'Câu bị động (Passive Voice) & Mệnh đề quan hệ (Relative Clauses: Who, Which, That)',
      summary: 'Dùng câu bị động khi muốn nhấn mạnh đối tượng chịu tác động. Mệnh đề quan hệ bổ nghĩa cho danh từ đứng trước.',
      formulaBox: [
        'Passive Voice: S + BE + V3/ed (+ by O)',
        'Relative Pronouns: WHO (người), WHICH (vật/kỳ quan), THAT (người hoặc vật)'
      ],
      usagePoints: [
        {
          title: '1. Câu bị động thì Hiện tại đơn / Quá khứ đơn',
          detail: 'Hiện tại: S + am/is/are + V3/ed. Quá khứ: S + was/were + V3/ed.',
          example: 'Ha Long Bay was visited by millions of international tourists last year.'
        }
      ],
      exercises: [
        {
          id: 'u5-g1',
          question: 'Phong Nha Cave, _____ is located in Quang Binh province, attracts thousands of speleologists.',
          options: ['A. who', 'B. which', 'C. where', 'D. whose'],
          correctAnswer: 'B. which',
          explanation: 'Mệnh đề quan hệ bổ nghĩa cho danh từ chỉ địa danh/vật "Phong Nha Cave" dùng "which".'
        },
        {
          id: 'u5-g2',
          question: 'Ha Long Bay _____ as a UNESCO World Heritage site twice due to its extraordinary geological value.',
          options: ['A. is recognized', 'B. recognized', 'C. was recognized', 'D. has recognized'],
          correctAnswer: 'C. was recognized',
          explanation: 'Thì quá khứ đơn thể bị động với chủ ngữ số ít "Ha Long Bay" dùng "was recognized".'
        },
        {
          id: 'u5-g3',
          question: 'The local farmer _____ first discovered Son Doong Cave in 1990 is Mr. Ho Khanh.',
          options: ['A. who', 'B. which', 'C. whom', 'D. whose'],
          correctAnswer: 'A. who',
          explanation: 'Mệnh đề quan hệ bổ nghĩa cho từ chỉ người làm chủ ngữ "The local farmer" dùng "who".'
        },
        {
          id: 'u5-g4',
          question: 'Thousands of beautiful handmade souvenirs _____ by local artisans in craft villages every year.',
          options: ['A. make', 'B. are made', 'C. made', 'D. was made'],
          correctAnswer: 'B. are made',
          explanation: 'Thì hiện tại đơn thể bị động với chủ ngữ số nhiều "souvenirs" dùng "are made".'
        },
        {
          id: 'u5-g5',
          question: 'Trang An is a magnificent landscape complex _____ welcomes millions of visitors every year.',
          options: ['A. who', 'B. that', 'C. whom', 'D. where'],
          correctAnswer: 'B. that',
          explanation: 'Mệnh đề quan hệ bổ nghĩa cho danh từ chỉ vật/danh thắng "complex" dùng "that" hoặc "which".'
        },
        {
          id: 'u5-g6',
          question: 'Many ancient wooden boats _____ restored last summer to serve tourists in the bay.',
          options: ['A. were', 'B. was', 'C. are', 'D. have been'],
          correctAnswer: 'A. were',
          explanation: 'Quá khứ đơn bị động với chủ ngữ số nhiều "boats" dùng "were (restored)".'
        }
      ]
    },
    listening: {
      audioTitle: 'Listening: Exploring Son Doong Cave',
      audioDuration: '2:20',
      audioScriptSpeaker: 'Tour Guide Minh',
      transcriptText: `Son Doong Cave, which is located in Phong Nha-Ke Bang National Park, is the largest natural cave in the world. It was discovered by a local farmer named Ho Khanh in 1990 and later explored by British cave experts in 2009.
Inside Son Doong, there is a giant subterranean rainforest and a fast-flowing underground river. Eco-tours to Son Doong are strictly limited each year to protect its delicate ecosystem from human impact.`,
      vietnameseTranslation: `Hang Sơn Đoòng, nằm trong Vườn quốc gia Phong Nha-Kẻ Bàng, là hang động tự nhiên lớn nhất thế giới. Hang được phát hiện bởi một nông dân địa phương tên Hồ Khánh vào năm 1990 và sau đó được khám phá bởi các chuyên gia hang động người Anh vào năm 2009.
Bên trong Sơn Đoòng có một khu rừng rậm dưới lòng đất khổng lồ và một dòng sông ngầm chảy xiết. Các chuyến du lịch sinh thái đến Sơn Đoòng được giới hạn nghiêm ngặt mỗi năm để bảo vệ hệ sinh thái nhạy cảm khỏi tác động của con người.`,
      questions: [
        {
          id: 'u5-l1',
          question: 'Who first discovered Son Doong Cave in 1990?',
          options: ['A. A British scientist', 'B. A local farmer named Ho Khanh', 'C. A tourist group', 'D. UNESCO officers'],
          correctAnswerIndex: 1,
          explanation: 'Bài nghe nêu rõ: "discovered by a local farmer named Ho Khanh in 1990."'
        }
      ]
    },
    speakingPrompts: [
      {
        id: 'u5-s1',
        targetSentence: 'Trang An Complex is a magnificent heritage site which was recognized by UNESCO.',
        ipa: '/træŋ an kəmˈplɛks ɪz ə mægˈnɪfɪsnt ˈhɛrɪtɪʤ saɪt wɪʧ wɒz ˈrɛkəgnaɪzd baɪ juːˈnɛskəʊ/',
        vietnameseMeaning: 'Quần thể Tràng An là một khu di sản tráng lệ được UNESCO công nhận.',
        contextSituation: 'Giới thiệu di sản danh thắng Việt Nam cho bạn bè quốc tế.',
        keyPhonicsFocus: 'Chú ý nhấn trọng âm vào từ "magnificent" và "recognized".',
        sampleAudioText: 'Trang An Complex is a magnificent heritage site which was recognized by UNESCO.'
      }
    ],
    reading: {
      title: 'Ha Long Bay: A Natural Wonder of the World',
      topic: 'Vịnh Hạ Long: Kỳ quan thiên nhiên thế giới',
      passageText: `Ha Long Bay, located in Quang Ninh province, is famous for its emerald waters and thousands of towering limestone islands topped with rainforests. Popular activities include junk boat cruises, kayaking through hidden caves, and visiting floating fishing villages. The bay was designated a UNESCO World Heritage site twice due to its extraordinary geological value and scenic beauty.`,
      keyVocabularyHighlights: [
        { word: 'emerald waters', meaning: 'làn nước xanh ngọc bích' },
        { word: 'geological value', meaning: 'giá trị địa chất' }
      ],
      questions: [
        {
          id: 'u5-r1',
          question: 'Why was Ha Long Bay designated a UNESCO World Heritage site twice?',
          options: [
            'A. Because of its cheap seafood.',
            'B. Due to its extraordinary geological value and scenic beauty.',
            'C. Because it has many modern skyscrapers.',
            'D. For its airport facilities.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Đoạn văn ghi: "...designated a UNESCO World Heritage site twice due to its extraordinary geological value and scenic beauty."'
        }
      ]
    },
    writing: {
      id: 'u5-w1',
      title: 'Write a short description (60-80 words) of a natural wonder in Viet Nam you would like to visit.',
      description: 'Viết đoạn văn 60-80 từ miêu tả một kỳ quan thiên nhiên ở Việt Nam mà em muốn ghé thăm.',
      suggestedOutline: [
        '1. Topic sentence: Nêu tên kỳ quan thiên nhiên (Vịnh Hạ Long / Hang Phong Nha / Fansipan...).',
        '2. Location & Feature: Kỳ quan đó nằm ở đâu và có vẻ đẹp gì đặc biệt? (dùng mệnh đề quan hệ which/that).',
        '3. Activities: Khách du lịch có thể trải nghiệm hoạt động gì ở đó?',
        '4. Conclusion: Lý do em khao khát đến tham quan.'
      ],
      usefulPhrases: [
        'One of the most famous natural wonders in Viet Nam is...',
        '...which is located in province.',
        'It is well-known for its limestone mountains and...',
        'I wish I could travel there next summer.'
      ],
      wordLimit: '60 - 80 từ',
      sampleGrade10Response: `One of the most spectacular natural wonders in Viet Nam is Ha Long Bay, which is located in Quang Ninh province. It is famous worldwide for its emerald green waters and thousands of impressive limestone islands. Tourists visiting Ha Long Bay can enjoy overnight cruise trips, kayak through magnificent caves, and taste fresh seafood. I wish I could visit Ha Long Bay with my family next summer to admire its breathless natural scenery.`
    }
  },
  {
    id: 6,
    title: 'Unit 6: Life Skills',
    theme: 'Kỹ năng sống & Câu tường thuật (Reported Speech)',
    description: 'Học cách tự lập, giải quyết vấn đề, ứng phó áp lực học tập và quy tắc chuyển đổi Câu tường thuật (Reported Speech).',
    pronunciationFocus: 'Ngữ âm: Ngữ điệu câu hỏi gián tiếp và câu trần thuật',
    badgeIconName: 'Lightbulb',
    vocabulary: [
      {
        id: 'u6-v1',
        word: 'self-reliant',
        phonetic: '/sɛlf-rɪˈlaɪənt/',
        partOfSpeech: 'adjective',
        vietnameseMeaning: 'tự lực, tự chủ',
        englishExample: 'Learning how to cook and clean makes students more self-reliant.',
        vietnameseExample: 'Học cách nấu ăn và dọn dẹp giúp học sinh trở nên tự chủ hơn.',
      },
      {
        id: 'u6-v2',
        word: 'time management',
        phonetic: '/taɪm ˈmænɪʤmənt/',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'kỹ năng quản lý thời gian',
        englishExample: 'Good time management skills allow teens to balance study and relaxation.',
        vietnameseExample: 'Kỹ năng quản lý thời gian tốt giúp tuổi teen cân bằng giữa học tập và thư giãn.',
      },
      {
        id: 'u6-v3',
        word: 'problem-solving',
        phonetic: '/ˈprɒbləm-ˈsɒlvɪŋ/',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'kỹ năng giải quyết vấn đề',
        englishExample: 'Participating in outdoor group activities improves problem-solving abilities.',
        vietnameseExample: 'Tham gia các hoạt động nhóm ngoài trời làm cải thiện khả năng giải quyết vấn đề.',
      }
    ],
    grammar: {
      title: 'Câu tường thuật (Reported Speech: Statements & Questions)',
      summary: 'Dùng để thuật lại lời nói của người khác. Cần lùi thì, đổi đại từ nhân xưng và đổi các từ chỉ thời gian / nơi chốn.',
      formulaBox: [
        'Direct: "I study hard," Nam said. -> Reported: Nam said (that) he studied hard.',
        'Yes/No Question: S + asked + O + IF / WHETHER + S + V-past',
        'Wh- Question: S + asked + O + WH-WORD + S + V-past'
      ],
      usagePoints: [
        {
          title: '1. Quy tắc lùi thì cơ bản',
          detail: 'Present Simple -> Past Simple; Present Continuous -> Past Continuous; Will -> Would; Can -> Could.',
          example: 'She said: "I can solve this problem." -> She said that she could solve that problem.'
        }
      ],
      exercises: [
        {
          id: 'u6-g1',
          question: 'The teacher asked Mai if she _____ her life skills assignment on time.',
          options: ['A. finishes', 'B. finished', 'C. will finish', 'D. can finish'],
          correctAnswer: 'B. finished',
          explanation: 'Trong câu tường thuật câu hỏi Yes/No, động từ lùi về thì Quá khứ đơn.'
        },
        {
          id: 'u6-g2',
          question: 'Nam said that he _____ time management skills to balance his study schedule.',
          options: ['A. needed', 'B. needs', 'C. will need', 'D. has needed'],
          correctAnswer: 'A. needed',
          explanation: 'Tường thuật câu trần thuật: Hiện tại đơn "need" lùi thì về Quá khứ đơn "needed".'
        },
        {
          id: 'u6-g3',
          question: 'My mother asked me if I _____ dinner by myself when she was away.',
          options: ['A. can cook', 'B. could cook', 'C. will cook', 'D. am cooking'],
          correctAnswer: 'B. could cook',
          explanation: 'Trợ động từ "can" trong câu hỏi trực tiếp lùi thì thành "could" trong câu tường thuật.'
        },
        {
          id: 'u6-g4',
          question: 'The counselor told her younger brother _____ too many hours on smartphone games.',
          options: ['A. not spend', 'B. to not spend', 'C. don\'t spend', 'D. not to spend'],
          correctAnswer: 'D. not to spend',
          explanation: 'Mệnh lệnh phủ định tường thuật dùng cấu trúc: told + O + NOT TO + V-bare.'
        },
        {
          id: 'u6-g5',
          question: 'The teacher advised us _____ daily task planners to manage exam stress effectively.',
          options: ['A. to create', 'B. creating', 'C. create', 'D. created'],
          correctAnswer: 'A. to create',
          explanation: 'Cấu trúc "advise + O + TO-V" nghĩa là khuyên ai làm việc gì.'
        },
        {
          id: 'u6-g6',
          question: 'Hoa said that she _____ public speaking skills at the youth club that day.',
          options: ['A. is practicing', 'B. was practicing', 'C. practices', 'D. will practice'],
          correctAnswer: 'B. was practicing',
          explanation: 'Thì Hiện tại tiếp diễn lùi thì thành Quá khứ tiếp diễn "was practicing".'
        }
      ]
    },
    listening: {
      audioTitle: 'Listening: Developing Essential Life Skills',
      audioDuration: '1:50',
      audioScriptSpeaker: 'Teacher & Phong',
      transcriptText: `Teacher: Phong, what is the most important life skill for Grade 9 students?
Phong: In my opinion, time management is essential. Last semester, I used to procrastinate until midnight before exam days.
Teacher: How did you fix that?
Phong: I created a daily task planner and set specific time blocks for homework, chores, and sports. Now I feel much more confident and independent!`,
      vietnameseTranslation: `Giáo viên: Phong, đâu là kỹ năng sống quan trọng nhất đối với học sinh lớp 9?
Phong: Theo em, quản lý thời gian là thiết yếu. Kỳ trước, em toàn trì hoãn đến tận nửa đêm trước ngày thi.
Giáo viên: Em đã khắc phục điều đó như thế nào?
Phong: Em đã tạo một sổ kế hoạch công việc hàng ngày và đặt khung giờ cụ thể cho bài tập, việc nhà và thể thao. Bây giờ em cảm thấy tự tin và độc lập hơn nhiều!`,
      questions: [
        {
          id: 'u6-l1',
          question: 'Which life skill does Phong consider most essential?',
          options: ['A. Cooking skills', 'B. Time management', 'C. Driving a car', 'D. Public speaking'],
          correctAnswerIndex: 1,
          explanation: 'Phong trả lời: "In my opinion, time management is essential."'
        }
      ]
    },
    speakingPrompts: [
      {
        id: 'u6-s1',
        targetSentence: 'My teacher advised us that effective time management leads to academic success.',
        ipa: '/maɪ ˈtiːʧər ədˈvaɪzd ʌs ðæt ɪˈfɛktɪv taɪm ˈmænɪʤmənt liːdz tuː ˌækəˈdɛmɪk səkˈsɛs/',
        vietnameseMeaning: 'Thầy giáo khuyên chúng tôi rằng quản lý thời gian hiệu quả sẽ dẫn đến thành công trong học tập.',
        contextSituation: 'Tường thuật lại lời khuyên của thầy cô về kỹ năng quản lý thời gian.',
        keyPhonicsFocus: 'Phát âm chuẩn đuôi /zd/ trong "advised" và /ks/ trong "success".',
        sampleAudioText: 'My teacher advised us that effective time management leads to academic success.'
      }
    ],
    reading: {
      title: 'Why Life Skills Are Essential for Teenagers',
      topic: 'Tại sao kỹ năng sống lại thiết yếu đối với thanh thiếu niên',
      passageText: `Academic knowledge alone is not enough for teens transitioning into adulthood. Essential life skills include emotion regulation, budgeting allowance money, basic cooking, and critical thinking. Mastering these skills builds self-confidence and helps teenagers navigate daily challenges without relying entirely on parents.`,
      keyVocabularyHighlights: [
        { word: 'transitioning', meaning: 'chuyển giao giai đoạn' },
        { word: 'emotion regulation', meaning: 'sự làm chủ cảm xúc' }
      ],
      questions: [
        {
          id: 'u6-r1',
          question: 'What benefit does mastering life skills provide to teenagers?',
          options: [
            'A. It makes them quit school.',
            'B. It builds self-confidence and helps them navigate daily challenges.',
            'C. It earns them lots of money immediately.',
            'D. It allows them to sleep all day.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Đoạn văn ghi: "Mastering these skills builds self-confidence and helps teenagers navigate daily challenges..."'
        }
      ]
    },
    writing: {
      id: 'u6-w1',
      title: 'Write a paragraph (60-80 words) describing an important life skill you have learned recently.',
      description: 'Viết đoạn văn 60-80 từ miêu tả một kỹ năng sống quan trọng mà em vừa học được gần đây.',
      suggestedOutline: [
        '1. Introduction: Nêu tên kỹ năng sống (Cooking / Time management / Cleaning...).',
        '2. How you learned it: Ai dạy em hoặc em tự luyện tập như thế nào?',
        '3. Benefits: Kỹ năng đó giúp em tự lập ra sao? (dùng self-reliant, confident).',
        '4. Conclusion: Khẳng định tầm quan trọng của việc rèn luyện kỹ năng.'
      ],
      usefulPhrases: [
        'Recently, I have learned how to manage my time effectively.',
        'My mother taught me basic cooking skills like...',
        'This skill helps me become more self-reliant and independent.',
        'I believe every teenager should practice this skill.'
      ],
      wordLimit: '60 - 80 từ',
      sampleGrade10Response: `Recently, I have learned the importance of time management skills. In the past, I used to stay up late doing homework right before deadlines. My brother advised me to use a daily planner to organize my tasks. Now, I allocate specific hours for studying, doing household chores, and taking breaks. Managing my time effectively has helped me feel less stressed and become more self-reliant. I believe this skill is crucial for every Grade 9 student.`
    }
  },
  {
    id: 7,
    title: 'Unit 7: Natural Wonders of the World',
    theme: 'Kỳ quan thế giới & Đại từ quan hệ không xác định',
    description: 'Khám phá các kỳ quan thiên nhiên thế giới (Grand Canyon, Great Barrier Reef, Everest) và Đại từ quan hệ nâng cao (Non-defining Relative Clauses).',
    pronunciationFocus: 'Ngữ âm: Nhấn ngữ điệu cảm thán khi miêu tả cảnh đẹp',
    badgeIconName: 'Globe',
    vocabulary: [
      {
        id: 'u7-v1',
        word: 'breathtaking',
        phonetic: '/ˈbrɛθˌteɪkɪŋ/',
        partOfSpeech: 'adjective',
        vietnameseMeaning: 'đẹp ngoạn mục, làm ngợp thở',
        englishExample: 'The view from the top of Mount Everest is truly breathtaking.',
        vietnameseExample: 'Cảnh quan nhìn từ đỉnh núi Everest thực sự đẹp ngoạn mục.',
      },
      {
        id: 'u7-v2',
        word: 'biodiversity',
        phonetic: '/ˌbaɪəʊdaɪˈvɜːsɪti/',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'đa dạng sinh học',
        englishExample: 'The Amazon Rainforest possesses the richest biodiversity on Earth.',
        vietnameseExample: 'Rừng mưa Amazon sở hữu sự đa dạng sinh học phong phú nhất trên Trái Đất.',
      }
    ],
    grammar: {
      title: 'Mệnh đề quan hệ không xác định (Non-defining Relative Clauses)',
      summary: 'Mệnh đề đặt giữa hai dấu phẩy, cung cấp thêm thông tin bổ sung cho danh từ riêng hoặc danh từ đã xác định.',
      formulaBox: [
        'S (danh từ riêng) + , WHO / WHICH + V + O , + V chính...',
        'Lưu ý quan trọng: KHÔNG dùng THAT trong mệnh đề quan hệ không xác định (sau dấu phẩy).'
      ],
      usagePoints: [
        {
          title: '1. Quy tắc dùng dấu phẩy',
          detail: 'Khi danh từ đứng trước là tên riêng (Mount Everest, Grand Canyon) bắt buộc phải có dấu phẩy.',
          example: 'Mount Everest, which is located in the Himalayas, is the highest peak on Earth.'
        }
      ],
      exercises: [
        {
          id: 'u7-g1',
          question: 'The Great Barrier Reef, _____ stretches over 2,300 kilometers, is home to thousands of marine species.',
          options: ['A. that', 'B. which', 'C. where', 'D. who'],
          correctAnswer: 'B. which',
          explanation: 'Sau dấu phẩy trong mệnh đề quan hệ không xác định KHÔNG được dùng "that". Phải dùng "which" chỉ vật.'
        },
        {
          id: 'u7-g2',
          question: 'Mount Everest, _____ peak reaches 8,848 meters above sea level, attracts adventurous climbers.',
          options: ['A. who', 'B. which', 'C. where', 'D. whose'],
          correctAnswer: 'D. whose',
          explanation: 'Mệnh đề quan hệ chỉ sở hữu "dỉnh núi của Mount Everest" dùng "whose".'
        },
        {
          id: 'u7-g3',
          question: 'Dr. Sarah, _____ is a famous marine biologist, gave a lecture on coral reef preservation.',
          options: ['A. who', 'B. which', 'C. that', 'D. whom'],
          correctAnswer: 'A. who',
          explanation: 'Mệnh đề không xác định chỉ người "Dr. Sarah" đứng sau dấu phẩy dùng "who".'
        },
        {
          id: 'u7-g4',
          question: 'The Grand Canyon, _____ was carved by the Colorado River over millions of years, displays red rock layers.',
          options: ['A. who', 'B. that', 'C. which', 'D. where'],
          correctAnswer: 'C. which',
          explanation: 'Mệnh đề không xác định chỉ danh thắng "The Grand Canyon" đứng sau dấu phẩy dùng "which".'
        },
        {
          id: 'u7-g5',
          question: 'Amazon Rainforest, _____ produces about 20% of Earth\'s oxygen, is facing severe deforestation.',
          options: ['A. that', 'B. which', 'C. where', 'D. whose'],
          correctAnswer: 'B. which',
          explanation: 'Đứng sau dấu phẩy bổ nghĩa cho "Amazon Rainforest" dùng đại từ quan hệ "which".'
        },
        {
          id: 'u7-g6',
          question: 'Our tour guide, _____ speaks three foreign languages fluently, led us through the national park safely.',
          options: ['A. who', 'B. which', 'C. that', 'D. whom'],
          correctAnswer: 'A. who',
          explanation: 'Bổ nghĩa cho người "Our tour guide" trong mệnh đề không xác định dùng "who".'
        }
      ]
    },
    listening: {
      audioTitle: 'Listening: Protecting the Great Barrier Reef',
      audioDuration: '2:05',
      audioScriptSpeaker: 'Marine Biologist Dr. Sarah',
      transcriptText: `The Great Barrier Reef, which lies off the coast of Australia, is the world's largest coral reef system. It is so huge that it can be seen from outer space.
Unfortunately, rising sea temperatures caused by global warming are bleaching the colorful corals. Environmental groups are working tirelessly to preserve this natural wonder for future generations.`,
      vietnameseTranslation: `Rặng san hô Great Barrier Reef, nằm ngoài bờ biển Úc, là hệ thống rặng san hô lớn nhất thế giới. Nó lớn đến mức có thể nhìn thấy từ ngoài vũ trụ.
Thật không may, nhiệt độ nước biển tăng do hiện tượng nóng lên toàn cầu đang làm tẩy trắng những rặng san hô rực rỡ. Các nhóm môi trường đang làm việc không mệt mỏi để bảo tồn kỳ quan thiên nhiên này cho thế hệ tương lai.`,
      questions: [
        {
          id: 'u7-l1',
          question: 'Where is the Great Barrier Reef located?',
          options: ['A. Off the coast of Viet Nam', 'B. Off the coast of Australia', 'C. In the North Pole', 'D. Near Africa'],
          correctAnswerIndex: 1,
          explanation: 'Bài nghe đề cập: "The Great Barrier Reef, which lies off the coast of Australia..."'
        }
      ]
    },
    speakingPrompts: [
      {
        id: 'u7-s1',
        targetSentence: 'The Amazon Rainforest, which produces twenty percent of Earth oxygen, must be protected.',
        ipa: '/ði ˈæməzən ˈrɒnˌfɒrɪst, wɪʧ prəˈdjuːsɪz ˈtwɛnti pəˈsɛnt ɒv ɜːθ ˈɒksɪʤən, mʌst biː prəˈtɛktɪd/',
        vietnameseMeaning: 'Rừng mưa Amazon, nơi sản xuất 20% lượng oxy của Trái Đất, phải được bảo vệ khẩn cấp.',
        contextSituation: 'Kêu gọi bảo vệ các kỳ quan và hệ sinh thái thiên nhiên thế giới.',
        keyPhonicsFocus: 'Chú ý nghỉ giữa hai dấu phẩy khi đọc mệnh đề quan hệ bổ sung.',
        sampleAudioText: 'The Amazon Rainforest, which produces twenty percent of Earth oxygen, must be protected.'
      }
    ],
    reading: {
      title: 'Exploring the Grand Canyon',
      topic: 'Khám phá Đại hẻm núi Grand Canyon',
      passageText: `The Grand Canyon, which was carved by the Colorado River over millions of years, is one of the world's most famous natural landscapes. Located in Arizona, USA, the canyon displays colorful layers of red rock. Over five million tourists travel there annually to experience hiking, helicopter tours, and rafting along the river.`,
      keyVocabularyHighlights: [
        { word: 'carved', meaning: 'được chạm khắc / tạo hình qua thời gian' },
        { word: 'annually', meaning: 'hàng năm' }
      ],
      questions: [
        {
          id: 'u7-r1',
          question: 'Which river carved the Grand Canyon?',
          options: ['A. The Amazon River', 'B. The Mekong River', 'C. The Colorado River', 'D. The Nile River'],
          correctAnswerIndex: 2,
          explanation: 'Bài đọc nêu rõ: "The Grand Canyon, which was carved by the Colorado River..."'
        }
      ]
    },
    writing: {
      id: 'u7-w1',
      title: 'Write a short paragraph (60-80 words) introducing a famous world wonder.',
      description: 'Viết đoạn văn 60-80 từ giới thiệu về một kỳ quan thiên nhiên nổi tiếng thế giới.',
      suggestedOutline: [
        '1. Topic sentence: Nêu tên kỳ quan thế giới (Grand Canyon / Amazon Rainforest / Great Barrier Reef).',
        '2. Features: Nối tiếp bằng mệnh đề quan hệ không xác định (, which...).',
        '3. Threat / Importance: Giá trị sinh thái và thách thức biến đổi khí hậu.',
        '4. Conclusion: Lời kêu gọi chung tay bảo vệ.'
      ],
      usefulPhrases: [
        'The Amazon Rainforest, which is located in South America, is...',
        'It is home to thousands of rare animal species.',
        'However, deforestation threatens its biodiversity.',
        'We must take action to protect global natural wonders.'
      ],
      wordLimit: '60 - 80 từ',
      sampleGrade10Response: `The Amazon Rainforest, which is located in South America, is one of the most remarkable natural wonders of the world. Known as the lungs of our planet, it produces about twenty percent of Earth's oxygen and holds incredible biodiversity. Thousands of plant and animal species thrive in its dense jungle. However, severe deforestation threatens its delicate ecosystem. In my opinion, international governments must cooperate to protect this precious natural heritage.`
    }
  },
  {
    id: 8,
    title: 'Unit 8: Tourism',
    theme: 'Du lịch & Từ ghép / Mạo từ (Articles a/an/the)',
    description: 'Học về các loại hình du lịch, danh từ ghép (Compound Nouns) và cách dùng mạo từ A / An / The / Zero article.',
    pronunciationFocus: 'Ngữ âm: Nhấn trọng âm danh từ ghép (Compound Nouns)',
    badgeIconName: 'Luggage',
    vocabulary: [
      {
        id: 'u8-v1',
        word: 'package tour',
        phonetic: '/ˈpækɪʤ tʊə/',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'chuyến du lịch trọn gói',
        englishExample: 'Booking a package tour saves travelers time on hotel and flight arrangements.',
        vietnameseExample: 'Đặt một chuyến du lịch trọn gói giúp du khách tiết kiệm thời gian về khách sạn và vé máy bay.',
      },
      {
        id: 'u8-v2',
        word: 'ecotourism',
        phonetic: '/ˈiːkəʊˌtʊərɪzəm/',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'du lịch sinh thái',
        englishExample: 'Ecotourism encourages responsible travel that respects local culture and environment.',
        vietnameseExample: 'Du lịch sinh thái khuyến khích việc đi lại có trách nhiệm tôn trọng văn hóa và môi trường địa phương.',
      }
    ],
    grammar: {
      title: 'Sử dụng mạo từ (Articles: A / An / The & Zero Article)',
      summary: 'Dùng A/An với danh từ đếm được số ít nhắc đến lần đầu. Dùng THE khi đối tượng đã xác định hoặc duy nhất.',
      formulaBox: [
        'A + phụ âm | AN + nguyên âm (a, e, i, o, u)',
        'THE + Danh từ đã được nhắc trước đó, danh từ duy nhất (the Sun, the Moon, the Earth)',
        'Không dùng mạo từ (Ø) trước danh từ số nhiều nói chung, tên quốc gia đơn (Viet Nam, Japan)'
      ],
      usagePoints: [
        {
          title: '1. Quy tắc phân biệt A/An vs The',
          detail: 'Lần 1 xuất hiện dùng A/An. Lần 2 trở đi nhắc lại dùng THE.',
          example: 'We stayed at a cozy hotel near the beach. The hotel had excellent service.'
        }
      ],
      exercises: [
        {
          id: 'u8-g1',
          question: '_____ Ha Long Bay is one of _____ most visited tourist attractions in Viet Nam.',
          options: ['A. Ø / the', 'B. The / a', 'C. A / the', 'D. Ø / a'],
          correctAnswer: 'A. Ø / the',
          explanation: 'Không dùng mạo từ trước tên riêng danh thắng "Ha Long Bay". Trước so sánh nhất dùng "the most visited".'
        },
        {
          id: 'u8-g2',
          question: 'We booked _____ package tour to explore _____ ancient town of Hoi An last summer.',
          options: ['A. the / a', 'B. a / a', 'C. a / the', 'D. Ø / the'],
          correctAnswer: 'C. a / the',
          explanation: 'Chưa xác định dùng mạo từ "a package tour". Danh từ xác định bổ nghĩa dùng "the ancient town".'
        },
        {
          id: 'u8-g3',
          question: 'Is Phu Quoc _____ island located in _____ south of Viet Nam?',
          options: ['A. a / the', 'B. an / the', 'C. the / Ø', 'D. an / Ø'],
          correctAnswer: 'B. an / the',
          explanation: 'Từ "island" bắt đầu bằng nguyên âm dùng "an island". Danh từ chỉ phương hướng dùng "the south".'
        },
        {
          id: 'u8-g4',
          question: 'Ecotourism helps preserve _____ natural environment while boosting local economy.',
          options: ['A. a', 'B. an', 'C. Ø', 'D. the'],
          correctAnswer: 'D. the',
          explanation: 'Danh từ chỉ môi trường thiên nhiên duy nhất dùng mạo từ "the environment".'
        },
        {
          id: 'u8-g5',
          question: 'They stayed at _____ cozy homestay near _____ beach during their vacation in Da Nang.',
          options: ['A. a / the', 'B. the / a', 'C. an / the', 'D. Ø / a'],
          correctAnswer: 'A. a / the',
          explanation: 'Lần đầu nhắc tới homestay dùng "a cozy homestay", "the beach" chỉ bãi biển địa phương xác định.'
        },
        {
          id: 'u8-g6',
          question: '_____ Mount Fansipan is _____ highest mountain in Indochina.',
          options: ['A. The / the', 'B. Ø / a', 'C. Ø / the', 'D. A / the'],
          correctAnswer: 'C. Ø / the',
          explanation: 'Trước tên riêng ngọn núi đơn lẻ "Mount Fansipan" không dùng mạo từ (Ø). So sánh nhất dùng "the highest".'
        }
      ]
    },
    listening: {
      audioTitle: 'Listening: Planning a Summer Holiday Trip',
      audioDuration: '2:00',
      audioScriptSpeaker: 'Travel Agent & Customer',
      transcriptText: `Travel Agent: Good afternoon! How can I help you plan your summer holiday?
Customer: We are looking for an ecotourism tour in Phong Nha. We prefer staying at a homestay rather than a luxury resort.
Travel Agent: Excellent choice! Our Phong Nha eco-package tour includes guided jungle trekking, local home-cooked meals, and boat rides through dark caves.`,
      vietnameseTranslation: `Nhiên viên du lịch: Chào buổi chiều! Tôi có thể giúp gì cho quý khách lên kế hoạch kỳ nghỉ hè?
Khách hàng: Chúng tôi đang tìm một chuyến du lịch sinh thái ở Phong Nha. Chúng tôi thích ở homestay hơn là khu nghỉ dưỡng sang trọng.
Nhân viên: Lựa chọn tuyệt vời! Gói du lịch sinh thái Phong Nha của chúng tôi bao gồm đi bộ xuyên rừng có hướng dẫn, các bữa ăn gia đình địa phương và đi thuyền qua hang động.`,
      questions: [
        {
          id: 'u8-l1',
          question: 'What kind of accommodation does the customer prefer?',
          options: ['A. A 5-star hotel', 'B. A luxury beach resort', 'C. A local homestay', 'D. Sleeping in a tent'],
          correctAnswerIndex: 2,
          explanation: 'Khách hàng nêu rõ: "We prefer staying at a homestay rather than a luxury resort."'
        }
      ]
    },
    speakingPrompts: [
      {
        id: 'u8-s1',
        targetSentence: 'Ecotourism helps preserve natural sights while benefiting local communities.',
        ipa: '/ˈiːkəʊˌtʊərɪzəm hɛlps prɪˈzɜːv ˈnæʧrəl saɪts waɪl ˈbɛnɪfɪtɪŋ ˈləʊkəl kəˈmjuːnɪtiːz/',
        vietnameseMeaning: 'Du lịch sinh thái giúp bảo tồn các cảnh quan thiên nhiên đồng thời mang lại lợi ích cho cộng đồng địa phương.',
        contextSituation: 'Thảo luận về hình thức du lịch có trách nhiệm.',
        keyPhonicsFocus: 'Chú ý trọng âm danh từ ghép "ecotourism".',
        sampleAudioText: 'Ecotourism helps preserve natural sights while benefiting local communities.'
      }
    ],
    reading: {
      title: 'The Rise of Sustainable Tourism',
      topic: 'Sự phát triển của du lịch bền vững',
      passageText: `Tourism is one of the fastest-growing industries in the world. However, mass tourism often leads to overcrowding, littering, and damage to historical monuments. Sustainable tourism aims to minimize negative environmental impacts. Travelers are encouraged to buy local souvenirs, reduce plastic waste, and respect indigenous customs.`,
      keyVocabularyHighlights: [
        { word: 'mass tourism', meaning: 'du lịch đại quái / ồ ạt' },
        { word: 'indigenous customs', meaning: 'phong tục tập quán bản địa' }
      ],
      questions: [
        {
          id: 'u8-r1',
          question: 'What is the main goal of sustainable tourism?',
          options: [
            'A. To build huge hotels everywhere.',
            'B. To minimize negative environmental impacts.',
            'C. To lower flight prices.',
            'D. To ban all international flights.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Bài đọc ghi rõ: "Sustainable tourism aims to minimize negative environmental impacts."'
        }
      ]
    },
    writing: {
      id: 'u8-w1',
      title: 'Write a paragraph (60-80 words) describing your dream vacation trip.',
      description: 'Viết đoạn văn 60-80 từ miêu tả chuyến du lịch trong mơ của em.',
      suggestedOutline: [
        '1. Topic sentence: Nêu điểm đến du lịch mơ ước (Da Nang / Phu Quoc / Da Lat...).',
        '2. Details: Em sẽ đi cùng ai, bằng phương tiện gì và ở đâu? (Dùng mạo từ a/an/the chính xác).',
        '3. Activities: Những hoạt động em muốn trải nghiệm.',
        '4. Conclusion: Cảm xúc mong chờ.'
      ],
      usefulPhrases: [
        'My dream vacation is a trip to Phu Quoc Island.',
        'I would love to stay at an eco-friendly resort near the beach.',
        'During the tour, I want to try scuba diving and enjoy fresh seafood.',
        'It will be an unforgettable experience.'
      ],
      wordLimit: '60 - 80 từ',
      sampleGrade10Response: `My dream vacation is a week-long ecotourism trip to Phu Quoc Island with my family. I would love to stay at a cozy homestay near the beach so we can enjoy the fresh ocean air. During the day, we plan to visit famous pepper gardens, try snorkeling to observe coral reefs, and eat delicious seafood at the night market. I believe this trip will help us relax after stressful exams and create wonderful memories.`
    }
  },
  {
    id: 9,
    title: 'Unit 9: World Englishes',
    theme: 'Tiếng Anh toàn cầu & Câu điều kiện Type 1 & 2',
    description: 'Tìm hiểu vai trò Tiếng Anh ngôn ngữ toàn cầu, biến thể Anh-Mỹ và Câu điều kiện loại 1 & loại 2.',
    pronunciationFocus: 'Ngữ âm: Nhấn trọng âm từ có hậu tố -ian, -ee, -ese',
    badgeIconName: 'Languages',
    vocabulary: [
      {
        id: 'u9-v1',
        word: 'global language',
        phonetic: '/ˈgləʊbəl ˈlæŋgwɪʤ/',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'ngôn ngữ toàn cầu',
        englishExample: 'English has become a global language used in international business and technology.',
        vietnameseExample: 'Tiếng Anh đã trở thành một ngôn ngữ toàn cầu được sử dụng trong kinh doanh quốc tế và công nghệ.',
      },
      {
        id: 'u9-v2',
        word: 'bilingual',
        phonetic: '/baɪˈlɪŋgwəl/',
        partOfSpeech: 'adjective',
        vietnameseMeaning: 'song ngữ, nói hai ngôn ngữ',
        englishExample: 'Being bilingual opens up many career opportunities in global companies.',
        vietnameseExample: 'Việc thông thạo song ngữ mở ra nhiều cơ hội nghề nghiệp trong các công ty toàn cầu.',
      }
    ],
    grammar: {
      title: 'Câu điều kiện loại 1 & Loại 2 (Conditional Sentences Type 1 & 2)',
      summary: 'Loại 1: Giả thiết có thể xảy ra ở hiện tại/tương lai. Loại 2: Giả thiết không có thực ở hiện tại.',
      formulaBox: [
        'Type 1 (Real at present): IF + S + V-present , S + WILL / CAN + V-bare',
        'Type 2 (Unreal at present): IF + S + V-past (Were) , S + WOULD / COULD + V-bare'
      ],
      usagePoints: [
        {
          title: '1. Phân biệt Type 1 vs Type 2',
          detail: 'Type 1 thể hiện khả năng thực tế (If I study hard, I will pass the exam). Type 2 thể hiện ước muốn tưởng tượng (If I were rich, I would travel around the world).',
          example: 'If I spoke English fluently, I would apply for an exchange program in Canada.'
        }
      ],
      exercises: [
        {
          id: 'u9-g1',
          question: 'If I _____ more time every day, I would practice listening to English news podcasts.',
          options: ['A. have', 'B. had', 'C. will have', 'D. would have'],
          correctAnswer: 'B. had',
          explanation: 'Câu điều kiện loại 2 mệnh đề IF dùng thì Quá khứ đơn "had".'
        },
        {
          id: 'u9-g2',
          question: 'If you practice English speaking daily, your pronunciation _____ rapidly.',
          options: ['A. will improve', 'B. would improve', 'C. improved', 'D. improves'],
          correctAnswer: 'A. will improve',
          explanation: 'Câu điều kiện loại 1 mệnh đề chính dùng "will + V-bare".'
        },
        {
          id: 'u9-g3',
          question: 'If I _____ a native English teacher, I would ask her about British accents.',
          options: ['A. meet', 'B. will meet', 'C. met', 'D. have met'],
          correctAnswer: 'C. met',
          explanation: 'Câu điều kiện loại 2 diễn tả giả định trái thực tế ở hiện tại dùng Quá khứ đơn "met".'
        },
        {
          id: 'u9-g4',
          question: 'If students _____ English fluently, they can easily access international study materials.',
          options: ['A. spoke', 'B. speak', 'C. will speak', 'D. would speak'],
          correctAnswer: 'B. speak',
          explanation: 'Câu điều kiện loại 1 mệnh đề IF dùng Hiện tại đơn "speak".'
        },
        {
          id: 'u9-g5',
          question: 'If I were you, I _____ an AI English app to check my writing errors immediately.',
          options: ['A. will use', 'B. would use', 'C. use', 'D. used'],
          correctAnswer: 'B. would use',
          explanation: 'Cấu trúc khuyên bảo với "If I were you..." trong điều kiện loại 2 dùng "would + V-bare".'
        },
        {
          id: 'u9-g6',
          question: 'What _____ you do if you won a scholarship to study English in Australia?',
          options: ['A. would', 'B. will', 'C. do', 'D. did'],
          correctAnswer: 'A. would',
          explanation: 'Câu hỏi giả định trong điều kiện loại 2 dùng "would + S + V-bare".'
        }
      ]
    },
    listening: {
      audioTitle: 'Listening: English as a Lingua Franca',
      audioDuration: '2:15',
      audioScriptSpeaker: 'Linguist Prof. Davies',
      transcriptText: `Today over 1.5 billion people speak English worldwide, but only 400 million are native speakers. This means English serves as a lingua franca—a common bridge language used by people of different mother tongues to communicate. Whether you are in Tokyo, Berlin, or Ha Noi, English enables global connections in science, aviation, and internet media!`,
      vietnameseTranslation: `Ngày nay hơn 1,5 tỷ người nói tiếng Anh trên toàn thế giới, nhưng chỉ có 400 triệu người là người bản ngữ. Điều này có nghĩa tiếng Anh đóng vai trò là một ngôn ngữ cầu nối chung được sử dụng bởi những người có tiếng mẹ đẻ khác nhau để giao tiếp. Dù bạn ở Tokyo, Berlin hay Hà Nội, tiếng Anh giúp kết nối toàn cầu trong khoa học, hàng không và truyền thông internet!`,
      questions: [
        {
          id: 'u9-l1',
          question: 'What is a lingua franca?',
          options: [
            'A. A language spoken only in France',
            'B. A common bridge language used between speakers of different mother tongues',
            'C. A silent gesture language',
            'D. A programming code'
          ],
          correctAnswerIndex: 1,
          explanation: 'Bài nghe nêu rõ: "lingua franca—a common bridge language used by people of different mother tongues..."'
        }
      ]
    },
    speakingPrompts: [
      {
        id: 'u9-s1',
        targetSentence: 'If I practiced speaking English every day, my pronunciation would improve rapidly.',
        ipa: '/ɪf aɪ ˈpræktɪst ˈspiːkɪŋ ˈɪŋglɪʃ ˈɛvri deɪ, maɪ prəˌnʌnsɪˈeɪʃən wʊd ɪmˈpruːv ˈræpɪdli/',
        vietnameseMeaning: 'Nếu tôi luyện nói tiếng Anh mỗi ngày, phát âm của tôi sẽ cải thiện nhanh chóng.',
        contextSituation: 'Sử dụng câu điều kiện loại 2 để đặt mục tiêu nâng cao phản xạ ngôn ngữ.',
        keyPhonicsFocus: 'Chú ý lướt âm nhẹ "would" và nhấn rõ trọng âm "pronunciation".',
        sampleAudioText: 'If I practiced speaking English every day, my pronunciation would improve rapidly.'
      }
    ],
    reading: {
      title: 'American English vs British English',
      topic: 'Sự khác biệt giữa Anh - Mỹ và Anh - Anh',
      passageText: `Although American English (US) and British English (UK) are mutually understandable, they differ in spelling, vocabulary, and pronunciation. For instance, Americans say "apartment" and "elevator", while the British say "flat" and "lift". Spelling also varies: "color" (US) versus "colour" (UK). Understanding these differences enriches your language awareness!`,
      keyVocabularyHighlights: [
        { word: 'mutually understandable', meaning: 'hiểu lẫn nhau' },
        { word: 'spelling', meaning: 'chính tả cách viết từ' }
      ],
      questions: [
        {
          id: 'u9-r1',
          question: 'What is the British English equivalent for the American word "elevator"?',
          options: ['A. Apartment', 'B. Flat', 'C. Lift', 'D. Subway'],
          correctAnswerIndex: 2,
          explanation: 'Bài đọc nêu: "...while the British say "flat" and "lift"."'
        }
      ]
    },
    writing: {
      id: 'u9-w1',
      title: 'Write a paragraph (60-80 words) discussing why learning English is important for your future.',
      description: 'Viết đoạn văn 60-80 từ nêu lý do tại sao học tiếng Anh lại quan trọng đối với tương lai của em.',
      suggestedOutline: [
        '1. Topic sentence: Khẳng định tầm quan trọng của tiếng Anh ngôn ngữ toàn cầu.',
        '2. Reason 1: Giúp tiếp cận kho tri thức internet và học tập.',
        '3. Reason 2: Mở ra cơ hội nghề nghiệp trong tương lai (dùng câu điều kiện If I master English...).',
        '4. Conclusion: Tầm quan trọng đối với bản thân.'
      ],
      usefulPhrases: [
        'Learning English is extremely important for my future career.',
        'English allows me to communicate with friends from around the world.',
        'If I speak English fluently, I will have better job opportunities.',
        'In conclusion, English is a key to success in the modern world.'
      ],
      wordLimit: '60 - 80 từ',
      sampleGrade10Response: `Learning English is extremely important for my future education and career. First, English is a global language that allows me to access scientific knowledge and study materials on the internet. Second, if I master English fluently, I will have opportunities to study abroad and work for international companies. Furthermore, English enables me to connect with friends worldwide. In conclusion, learning English opens up endless possibilities for my personal development.`
    }
  },
  {
    id: 10,
    title: 'Unit 10: Planet Earth',
    theme: 'Hành tinh Trái Đất & Thì Tương lai tiếp diễn',
    description: 'Bảo vệ môi trường, biến đổi khí hậu, hệ sinh thái và Thì tương lai tiếp diễn / Bị động tương lai.',
    pronunciationFocus: 'Ngữ âm: Trọng âm ngữ điệu câu cảnh báo môi trường',
    badgeIconName: 'Leaf',
    vocabulary: [
      {
        id: 'u10-v1',
        word: 'ecosystem',
        phonetic: '/ˈiːkəʊˌsɪstəm/',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'hệ sinh thái',
        englishExample: 'Protecting tropical rainforest ecosystems is vital for climate stabilization.',
        vietnameseExample: 'Bảo vệ các hệ sinh thái rừng mưa nhiệt đới là điều sống còn đối với sự ổn định khí hậu.',
      },
      {
        id: 'u10-v2',
        word: 'global warming',
        phonetic: '/ˈgləʊbəl ˈwɔːmɪŋ/',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'sự nóng lên toàn cầu',
        englishExample: 'Global warming causes extreme weather events like floods and droughts.',
        vietnameseExample: 'Sự nóng lên toàn cầu gây ra các hiện tượng thời tiết cực đoan như lũ lụt và hạn hán.',
      }
    ],
    grammar: {
      title: 'Thì Tương lai tiếp diễn (Future Continuous: Will be V-ing)',
      summary: 'Diễn tả một hành động sẽ đang xảy ra tại một thời điểm xác định trong tương lai.',
      formulaBox: [
        'S + WILL BE + V-ING (At this time tomorrow / At 9 PM next Sunday...)',
        'Cụm thời gian xác định tương lai: "At 8 AM tomorrow, we will be cleaning the local park."'
      ],
      usagePoints: [
        {
          title: '1. Dấu hiệu nhận biết',
          detail: 'Có mốc giờ cụ thể ở tương lai: "At this time next week...", "At 10 AM tomorrow..."',
          example: 'At 9 AM tomorrow, our volunteers will be planting trees along the river bank.'
        }
      ],
      exercises: [
        {
          id: 'u10-g1',
          question: 'At this time tomorrow, environmental students _____ trash on Do Son beach.',
          options: ['A. will collect', 'B. will be collecting', 'C. collect', 'D. have collected'],
          correctAnswer: 'B. will be collecting',
          explanation: 'Mốc thời gian xác định "At this time tomorrow" dùng thì Tương lai tiếp diễn "will be collecting".'
        },
        {
          id: 'u10-g2',
          question: 'At 8 AM next Sunday, our school green club _____ trees along the canal.',
          options: ['A. will be planting', 'B. plant', 'C. were planting', 'D. planted'],
          correctAnswer: 'A. will be planting',
          explanation: 'Mốc thời gian cụ thể "At 8 AM next Sunday" dùng Tương lai tiếp diễn "will be planting".'
        },
        {
          id: 'u10-g3',
          question: 'By using renewable energy, we _____ reduce greenhouse gas emissions effectively in the future.',
          options: ['A. will', 'B. would', 'C. were', 'D. did'],
          correctAnswer: 'A. will',
          explanation: 'Dự đoán tương lai đơn giản dùng "will + V-bare".'
        },
        {
          id: 'u10-g4',
          question: 'At 10 o\'clock tomorrow, international climate experts _____ a seminar on saving Earth ecosystems.',
          options: ['A. hold', 'B. held', 'C. will hold', 'D. will be holding'],
          correctAnswer: 'D. will be holding',
          explanation: 'Thời điểm cụ thể trong tương lai "At 10 o\'clock tomorrow" dùng "will be holding".'
        },
        {
          id: 'u10-g5',
          question: 'If humans continue wasting clean water, many regions _____ severe droughts.',
          options: ['A. will face', 'B. face', 'C. would face', 'D. faced'],
          correctAnswer: 'A. will face',
          explanation: 'Mệnh đề chính trong câu điều kiện loại 1 dùng "will face".'
        },
        {
          id: 'u10-g6',
          question: 'This time next week, my family _____ on an eco-tour in Phong Nha National Park.',
          options: ['A. travel', 'B. will be traveling', 'C. traveled', 'D. are traveling'],
          correctAnswer: 'B. will be traveling',
          explanation: 'Cụm "This time next week" là dấu hiệu của thì Tương lai tiếp diễn.'
        }
      ]
    },
    listening: {
      audioTitle: 'Listening: Earth Day Youth Action',
      audioDuration: '1:40',
      audioScriptSpeaker: 'Student Club Leader Lan',
      transcriptText: `At 8 AM this Sunday, our school green club will be holding an Earth Day cleanup campaign. We will be collecting plastic bottles, planting native trees, and distributing reusable cloth bags to shoppers. Small eco-friendly actions today guarantee a healthier planet for tomorrow!`,
      vietnameseTranslation: `Vào lúc 8 giờ sáng Chủ Nhật tuần này, câu lạc bộ xanh của trường chúng tôi sẽ tổ chức chiến dịch dọn dẹp hưởng ứng Ngày Trái Đất. Chúng tôi sẽ thu gom chai nhựa, trồng cây bản địa và phát túi vải tái sử dụng cho người đi chợ. Những hành động nhỏ thân thiện với môi trường hôm nay đảm bảo một hành tinh khỏe mạnh hơn cho ngày mai!`,
      questions: [
        {
          id: 'u10-l1',
          question: 'What activity will the green club be doing at 8 AM this Sunday?',
          options: ['A. Playing sports', 'B. Holding an Earth Day cleanup campaign', 'C. Taking an exam', 'D. Watching TV'],
          correctAnswerIndex: 1,
          explanation: 'Bài nghe đề cập: "At 8 AM this Sunday, our school green club will be holding an Earth Day cleanup campaign."'
        }
      ]
    },
    speakingPrompts: [
      {
        id: 'u10-s1',
        targetSentence: 'At eight o\'clock tomorrow morning, we will be planting trees to protect our local ecosystem.',
        ipa: '/æt eɪt əˈklɒk təˈmɒrəʊ ˈmɔːnɪŋ, wiː wɪl biː ˈplɑːntɪŋ triːz tuː prəˈtɛkt aʊər ˈləʊkəl ˈiːkəʊˌsɪstəm/',
        vietnameseMeaning: 'Vào lúc 8 giờ sáng mai, chúng tôi sẽ đang trồng cây để bảo vệ hệ sinh thái địa phương.',
        contextSituation: 'Chia sẻ về các hoạt động môi trường dự kiến diễn ra vào thời gian cụ thể ngày mai.',
        keyPhonicsFocus: 'Phát âm rõ cụm "will be planting" và trọng âm từ "ecosystem".',
        sampleAudioText: 'At eight o\'clock tomorrow morning, we will be planting trees to protect our local ecosystem.'
      }
    ],
    reading: {
      title: 'Combating Climate Change on Earth',
      topic: 'Chung tay ứng phó biến đổi khí hậu trên Trái Đất',
      passageText: `Earth is currently facing rising temperature threats due to excessive carbon emissions. Renewable energy sources like wind, solar, and wave power offer sustainable solutions to replace coal and oil. Individual actions, such as saving electricity and planting trees, play a crucial role in preserving Earth ecosystems.`,
      keyVocabularyHighlights: [
        { word: 'carbon emissions', meaning: 'lượng khí thải cacbon' },
        { word: 'renewable energy', meaning: 'năng lượng tái tạo' }
      ],
      questions: [
        {
          id: 'u10-r1',
          question: 'Which energy sources offer sustainable solutions to replace fossil fuels?',
          options: [
            'A. Coal and oil',
            'B. Wind, solar, and wave power',
            'C. Gasoline and diesel',
            'D. Plastic burning'
          ],
          correctAnswerIndex: 1,
          explanation: 'Đoạn văn nêu: "Renewable energy sources like wind, solar, and wave power offer sustainable solutions..."'
        }
      ]
    },
    writing: {
      id: 'u10-w1',
      title: 'Write a paragraph (60-80 words) describing actions teens can take to protect Planet Earth.',
      description: 'Viết đoạn văn 60-80 từ đề xuất những hành động thanh thiếu niên có thể làm để bảo vệ Trái Đất.',
      suggestedOutline: [
        '1. Topic sentence: Nêu vai trò của tuổi teen trong việc bảo vệ môi trường Trái Đất.',
        '2. Action 1: Cắt giảm nhựa dùng một lần và tái chế (dùng Future Continuous: At 8 AM tomorrow we will be...).',
        '3. Action 2: Tắt thiết bị điện khi không dùng và đi xe đạp.',
        '4. Conclusion: Khẳng định hành động nhỏ mang lại thay đổi lớn.'
      ],
      usefulPhrases: [
        'Protecting planet Earth is the responsibility of everyone.',
        'First, we should reduce single-use plastic bottles.',
        'Second, teens can plant more trees in school gardens.',
        'Together, small actions can save our environment.'
      ],
      wordLimit: '60 - 80 từ',
      sampleGrade10Response: `Protecting planet Earth is the responsibility of every teenager. First, we should reduce single-use plastic items by carrying reusable water bottles and cloth bags. Second, saving electricity by turning off lights when leaving rooms helps conserve natural resources. Tomorrow morning, our youth club will be collecting plastic waste in our neighborhood. Together, these small everyday actions contribute to preserving healthy ecosystems for future generations.`
    }
  },
  {
    id: 11,
    title: 'Unit 11: Electronic Devices',
    theme: 'Thiết bị điện tử & AI trong học tập',
    description: 'Ứng dụng công nghệ, thiết bị thông minh, AI hỗ trợ học tập và Câu tường thuật mệnh lệnh / yêu cầu.',
    pronunciationFocus: 'Ngữ âm: Trọng âm ngữ điệu câu yêu cầu công nghệ',
    badgeIconName: 'Smartphone',
    vocabulary: [
      {
        id: 'u11-v1',
        word: 'smart device',
        phonetic: '/smɑːt dɪˈvaɪs/',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'thiết bị thông minh',
        englishExample: 'Smart devices like tablets enable students to access online learning materials anywhere.',
        vietnameseExample: 'Các thiết bị thông minh như máy tính bảng cho phép học sinh truy cập tài liệu học trực tuyến ở mọi nơi.',
      },
      {
        id: 'u11-v2',
        word: 'artificial intelligence',
        phonetic: '/ˌɑːtɪˈfɪʃəl ɪnˈtɛlɪʤəns/',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'trí tuệ nhân tạo (AI)',
        englishExample: 'Artificial intelligence apps can evaluate student pronunciation in real time.',
        vietnameseExample: 'Các ứng dụng trí tuệ nhân tạo có thể đánh giá phát âm của học sinh theo thời gian thực.',
      }
    ],
    grammar: {
      title: 'Câu tường thuật yêu cầu và mệnh lệnh (Reported Requests & Commands)',
      summary: 'Dùng động từ TELL / ASK / ADVISE / ORDER + O + TO-V / NOT TO-V để tường thuật lời yêu cầu mệnh lệnh.',
      formulaBox: [
        'Reporting Commands/Requests: S + ASKED / TOLD + O + (NOT) TO + V-bare',
        'Ví dụ: "Turn off your tablets," the teacher said. -> The teacher told us to turn off our tablets.'
      ],
      usagePoints: [
        {
          title: '1. Chuyển đổi mệnh lệnh phủ định',
          detail: '"Don\'t + V" -> chuyển thành "NOT TO + V".',
          example: 'She asked me not to use my phone during class hours.'
        }
      ],
      exercises: [
        {
          id: 'u11-g1',
          question: 'The instructor told the students _____ their electronic devices during the online test.',
          options: ['A. not use', 'B. not to use', 'C. don\'t use', 'D. to not using'],
          correctAnswer: 'B. not to use',
          explanation: 'Mệnh lệnh phủ định tường thuật dùng cấu trúc: told + O + NOT TO + V-bare.'
        },
        {
          id: 'u11-g2',
          question: 'The teacher asked us _____ the new AI English learning app on our smartphones.',
          options: ['A. to install', 'B. install', 'C. installing', 'D. installed'],
          correctAnswer: 'A. to install',
          explanation: 'Lời yêu cầu tường thuật dùng cấu trúc: asked + O + TO + V-bare.'
        },
        {
          id: 'u11-g3',
          question: 'My mother told me _____ too much time playing online games on my tablet at night.',
          options: ['A. not spend', 'B. don\'t spend', 'C. not spending', 'D. not to spend'],
          correctAnswer: 'D. not to spend',
          explanation: 'Mệnh lệnh phủ định dùng cấu trúc "told + O + not to V".'
        },
        {
          id: 'u11-g4',
          question: 'The IT technician advised students _____ their passwords regularly to keep devices secure.',
          options: ['A. change', 'B. changing', 'C. to change', 'D. changed'],
          correctAnswer: 'C. to change',
          explanation: 'Cấu trúc khuyên bảo "advise + O + to V".'
        },
        {
          id: 'u11-g5',
          question: 'She asked her classmate _____ her how to use the AI pronunciation evaluation feature.',
          options: ['A. show', 'B. to show', 'C. showing', 'D. showed'],
          correctAnswer: 'B. to show',
          explanation: 'Yêu cầu nhờ giúp đỡ dùng "asked + O + to V".'
        },
        {
          id: 'u11-g6',
          question: 'The librarian requested all students _____ quiet while working in the computer room.',
          options: ['A. to keep', 'B. keep', 'C. keeping', 'D. kept'],
          correctAnswer: 'A. to keep',
          explanation: 'Yêu cầu lịch sự dùng "requested + O + to V".'
        }
      ]
    },
    listening: {
      audioTitle: 'Listening: Using Technology Responsibly in Study',
      audioDuration: '1:55',
      audioScriptSpeaker: 'IT Teacher Mr. Binh',
      transcriptText: `Electronic devices have transformed self-study. Students can now install AI language learning tools to practice English speaking and writing anytime.
However, I always tell my students not to spend excessive hours playing online games on tablets. Electronic gadgets are powerful study tools when used with discipline!`,
      vietnameseTranslation: `Các thiết bị điện tử đã thay đổi cách tự học. Giờ đây học sinh có thể cài đặt các công cụ học ngôn ngữ AI để luyện nói và viết tiếng Anh bất cứ lúc nào.
Tuy nhiên, tôi luôn dặn học sinh không nên dành quá nhiều giờ chơi game online trên máy tính bảng. Thiết bị điện tử là công cụ học tập mạnh mẽ khi được sử dụng có kỷ luật!`,
      questions: [
        {
          id: 'u11-l1',
          question: 'What does Mr. Binh advise his students regarding electronic gadgets?',
          options: [
            'A. To throw away all tablets',
            'B. Not to spend excessive hours playing online games',
            'C. To play games all night',
            'D. Never use AI tools'
          ],
          correctAnswerIndex: 1,
          explanation: 'Bài nghe đề cập: "I always tell my students not to spend excessive hours playing online games..."'
        }
      ]
    },
    speakingPrompts: [
      {
        id: 'u11-s1',
        targetSentence: 'Our teacher told us to use electronic devices smartly for online self-study.',
        ipa: '/aʊər ˈtiːʧər təʊld ʌs tuː juːz ˌɛlɛkˈtrɒnɪk dɪˈvaɪsɪz ˈsmɑːtli fɔːr ˈɒnˌlaɪn sɛlf-ˈstʌdi/',
        vietnameseMeaning: 'Thầy giáo dặn chúng tôi sử dụng các thiết bị điện tử một cách thông minh để tự học trực tuyến.',
        contextSituation: 'Tường thuật lại lời dặn của thầy cô về việc dùng công nghệ tự học.',
        keyPhonicsFocus: 'Chú ý nhấn trọng âm rơi vào từ "electronic", "devices", "smartly".',
        sampleAudioText: 'Our teacher told us to use electronic devices smartly for online self-study.'
      }
    ],
    reading: {
      title: 'How AI and Smart Devices Support Learning',
      topic: 'AI và thiết bị thông minh hỗ trợ học tập như thế nào',
      passageText: `Electronic devices like laptops, tablets, and smartphones have become indispensable tools for modern education. AI-powered applications provide immediate feedback on English grammar errors, pronunciation accuracy, and custom exercise creation. When combined with self-discipline, technology accelerates learning speed.`,
      keyVocabularyHighlights: [
        { word: 'indispensable', meaning: 'không thể thiếu được' },
        { word: 'accelerates', meaning: 'thúc đẩy, gia tăng tốc độ' }
      ],
      questions: [
        {
          id: 'u11-r1',
          question: 'How do AI-powered apps assist language learners?',
          options: [
            'A. By cooking meals for them',
            'B. By providing immediate feedback on grammar and pronunciation',
            'C. By turning off the internet',
            'D. By replacing school teachers'
          ],
          correctAnswerIndex: 1,
          explanation: 'Bài đọc nêu: "AI-powered applications provide immediate feedback on English grammar errors, pronunciation accuracy..."'
        }
      ]
    },
    writing: {
      id: 'u11-w1',
      title: 'Write a paragraph (60-80 words) about how you use electronic devices for your English self-study.',
      description: 'Viết đoạn văn 60-80 từ kể về cách em dùng thiết bị điện tử để tự học tiếng Anh.',
      suggestedOutline: [
        '1. Topic sentence: Giới thiệu thiết bị điện tử em dùng để học tiếng Anh (Laptop / Smartphone / Tablet).',
        '2. Usage: Em học từ vựng, luyện nghe, hoặc dùng AI chấm bài viết ra sao?',
        '3. Advice received: Lời khuyên thầy cô/bố mẹ dặn dò em (dùng reported request: My parents told me to...).',
        '4. Conclusion: Hiệu quả mang lại.'
      ],
      usefulPhrases: [
        'Electronic devices play a vital role in my daily English study.',
        'I use my tablet to practice vocabulary with AI flashcards.',
        'My teacher advised us to use educational apps wisely.',
        'Thanks to technology, my English skills have improved significantly.'
      ],
      wordLimit: '60 - 80 từ',
      sampleGrade10Response: `Electronic devices play a vital role in my daily English self-study. I regularly use my smartphone and laptop to practice vocabulary with online flashcards and listen to English podcasts. Furthermore, AI tools help me correct grammar mistakes in my essay writing immediately. My teacher told us to balance screen time and avoid playing video games. Thanks to smart devices, my self-study efficiency and English confidence have improved significantly.`
    }
  },
  {
    id: 12,
    title: 'Unit 12: Career Paths',
    theme: 'Định hướng nghề nghiệp & Ôn tập thì ngữ pháp',
    description: 'Định hướng tương lai, các ngành nghề trong xã hội hiện đại, kỹ năng làm việc và tổng ôn tập các dạng câu.',
    pronunciationFocus: 'Ngữ âm: Nhấn trọng âm các danh từ chỉ nghề nghiệp',
    badgeIconName: 'Briefcase',
    vocabulary: [
      {
        id: 'u12-v1',
        word: 'career path',
        phonetic: '/kəˈrɪə pɑːθ/',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'con đường sự nghiệp',
        englishExample: 'Choosing the right career path requires understanding your personal strengths and passions.',
        vietnameseExample: 'Lựa chọn con đường sự nghiệp đúng đắn đòi hỏi thấu hiểu điểm mạnh và niềm đam mê của bản thân.',
      },
      {
        id: 'u12-v2',
        word: 'vocational training',
        phonetic: '/vəʊˈkeɪʃənl ˈtreɪnɪŋ/',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'đào tạo nghề thực hành',
        englishExample: 'Vocational training programs prepare students with practical skills for specific jobs.',
        vietnameseExample: 'Các chương trình đào tạo nghề chuẩn bị cho học sinh những kỹ năng thực hành cho công việc cụ thể.',
      }
    ],
    grammar: {
      title: 'Tổng ôn tập các Thì Ngữ Pháp & Mệnh Đề Quan Hệ trong Định Hướng Nghề Nghiệp',
      summary: 'Review tổng hợp Thì Hiện tại hoàn thành, Tương lai đơn, Cấu trúc câu điều kiện và Mệnh đề quan hệ.',
      formulaBox: [
        'Review: Present Perfect (S + have/has + V3) vs Past Simple (S + V2)',
        'Relative Clauses for Jobs: An engineer is a person WHO designs machinery.'
      ],
      usagePoints: [
        {
          title: '1. Định nghĩa nghề nghiệp bằng WHO/WHICH',
          detail: 'Dùng mệnh đề quan hệ bổ nghĩa cho tên gọi nghề nghiệp.',
          example: 'A software developer is a specialist WHO creates computer applications.'
        }
      ],
      exercises: [
        {
          id: 'u12-g1',
          question: 'An architect is a professional _____ designs modern eco-friendly buildings.',
          options: ['A. who', 'B. which', 'C. where', 'D. whose'],
          correctAnswer: 'A. who',
          explanation: 'Bổ nghĩa cho danh từ chỉ người "An architect" dùng mệnh đề quan hệ "who".'
        },
        {
          id: 'u12-g2',
          question: 'An AI software tool _____ evaluates English speaking accuracy is very helpful for self-study.',
          options: ['A. who', 'B. which', 'C. whom', 'D. whose'],
          correctAnswer: 'B. which',
          explanation: 'Mệnh đề quan hệ bổ nghĩa cho danh từ chỉ vật "tool" dùng "which".'
        },
        {
          id: 'u12-g3',
          question: 'My older brother _____ in a vocational training center for two years before working as an electrician.',
          options: ['A. studied', 'B. studies', 'C. has studied', 'D. is studying'],
          correctAnswer: 'C. has studied',
          explanation: 'Diễn tả kinh nghiệm/hành động đã kéo dài "for two years" dùng thì Hiện tại hoàn thành "has studied".'
        },
        {
          id: 'u12-g4',
          question: 'If you choose a career path that matches your personal passion, you _____ happier at work.',
          options: ['A. will be', 'B. are', 'C. were', 'D. would be'],
          correctAnswer: 'A. will be',
          explanation: 'Mệnh đề chính trong câu điều kiện loại 1 dùng "will be".'
        },
        {
          id: 'u12-g5',
          question: 'A doctor is a noble profession _____ requires great dedication and medical knowledge.',
          options: ['A. who', 'B. which', 'C. where', 'D. whom'],
          correctAnswer: 'B. which',
          explanation: 'Bổ nghĩa cho danh từ chỉ ngành nghề/sự vật "profession" dùng "which".'
        },
        {
          id: 'u12-g6',
          question: 'A career counselor is a specialist _____ provides helpful advice to students about future jobs.',
          options: ['A. who', 'B. which', 'C. where', 'D. whose'],
          correctAnswer: 'A. who',
          explanation: 'Bổ nghĩa cho từ chỉ chuyên gia / người "specialist" dùng "who".'
        }
      ]
    },
    listening: {
      audioTitle: 'Listening: Career Day Guidance for Teens',
      audioDuration: '2:10',
      audioScriptSpeaker: 'Career Advisor Ms. Linh',
      transcriptText: `Welcome to Grade 9 Career Guidance Day! When planning your future career path, ask yourself three questions: What subjects do you enjoy? What practical skills are you good at? And what jobs will be in high demand in the future?
Whether you choose university or vocational training, continuous learning and adaptability are key factors for career success.`,
      vietnameseTranslation: `Chào mừng các em đến với Ngày hội Định hướng Nghề nghiệp Lớp 9! Khi lập kế hoạch cho con đường sự nghiệp tương lai, hãy tự hỏi bản thân 3 câu hỏi: Môn học nào em yêu thích? Em giỏi kỹ năng thực hành nào? Và công việc nào sẽ có nhu cầu cao trong tương lai?
Dù các em chọn đại học hay học nghề, việc học tập liên tục và khả năng thích ứng là chìa khóa thành công trong sự nghiệp.`,
      questions: [
        {
          id: 'u12-l1',
          question: 'What are key factors for future career success mentioned by Ms. Linh?',
          options: [
            'A. Having a lot of money immediately',
            'B. Continuous learning and adaptability',
            'C. Never changing jobs',
            'D. Sleeping late'
          ],
          correctAnswerIndex: 1,
          explanation: 'Bài nghe nêu rõ: "continuous learning and adaptability are key factors for career success."'
        }
      ]
    },
    speakingPrompts: [
      {
        id: 'u12-s1',
        targetSentence: 'Choosing a suitable career path requires passion, practical skills, and continuous learning.',
        ipa: '/ˈʧuːzɪŋ ə ˈsjuːtəbl kəˈrɪə pɑːθ rɪˈkwaɪəz ˈpæʃən, ˈpræktɪkəl skɪlz, ænd kənˈtɪnjʊəs ˈlɜːnɪŋ/',
        vietnameseMeaning: 'Lựa chọn một con đường sự nghiệp phù hợp đòi hỏi niềm đam mê, kỹ năng thực hành và tinh thần học hỏi liên tục.',
        contextSituation: 'Nói về tiêu chí lựa chọn công việc tương lai.',
        keyPhonicsFocus: 'Chú ý phát âm rõ /p/ trong "passion" và /k/ trong "continuous".',
        sampleAudioText: 'Choosing a suitable career path requires passion, practical skills, and continuous learning.'
      }
    ],
    reading: {
      title: 'Future Job Trends for the Next Generation',
      topic: 'Xu hướng nghề nghiệp tương lai cho thế hệ trẻ',
      passageText: `As technology advances rapidly, the job market is evolving. In the near future, careers in artificial intelligence, renewable energy, digital marketing, and healthcare will see massive growth. Alongside technical skills, soft skills like communication, teamwork, and problem-solving remain essential for all career paths.`,
      keyVocabularyHighlights: [
        { word: 'evolving', meaning: 'tiến hóa, phát triển không ngừng' },
        { word: 'soft skills', meaning: 'kỹ năng mềm' }
      ],
      questions: [
        {
          id: 'u12-r1',
          question: 'Which soft skills remain essential alongside technical skills?',
          options: [
            'A. Typing speed only',
            'B. Communication, teamwork, and problem-solving',
            'C. Playing online games',
            'D. Fast driving'
          ],
          correctAnswerIndex: 1,
          explanation: 'Bài đọc nêu: "Alongside technical skills, soft skills like communication, teamwork, and problem-solving remain essential..."'
        }
      ]
    },
    writing: {
      id: 'u12-w1',
      title: 'Write a paragraph (60-80 words) describing your future dream job.',
      description: 'Viết đoạn văn 60-80 từ miêu tả công việc mơ ước trong tương lai của em.',
      suggestedOutline: [
        '1. Topic sentence: Giới thiệu công việc mơ ước (Doctor / Software Engineer / Teacher / Architect...).',
        '2. Job definition: Miêu tả công việc đó làm gì (dùng WHO: A doctor is a professional who...).',
        '3. Reasons & Skills: Tại sao em thích và em sẽ làm gì để chuẩn bị (học giỏi Tiếng Anh, rèn kỹ năng mềm).',
        '4. Conclusion: Quyết tâm theo đuổi.'
      ],
      usefulPhrases: [
        'In the future, I dream of becoming a software engineer.',
        'An engineer is a professional who creates useful applications.',
        'To achieve this career goal, I am focusing on math and English.',
        'I am determined to pursue my passion.'
      ],
      wordLimit: '60 - 80 từ',
      sampleGrade10Response: `In the future, I dream of becoming an AI software engineer. An engineer is a skilled professional who designs intelligent applications to assist people in daily life. I am passionate about technology because it can solve complex environmental and medical challenges. To achieve this career path, I am studying hard in mathematics, computer science, and English. I am determined to pursue my passion and contribute to my country's development.`
    }
  }
];

export const GRADE_9_UNITS: UnitData[] = enhanceGrade9Units(RAW_UNITS);
