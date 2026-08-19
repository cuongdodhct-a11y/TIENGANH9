const fs = require('fs');

const UNITS_3_TO_12 = [
  {
    id: 3,
    title: 'Unit 3: Healthy Living for Teens',
    theme: 'Sống khỏe & Cân bằng cảm xúc tuổi thiếu niên',
    description: 'Học về các thói quen lành mạnh, quản lý căng thẳng, câu điều kiện loại 1 với động từ khuyết thiếu (Modal verbs) và cụm động từ sức khỏe.',
    pronunciationFocus: 'Ngữ âm: Trọng âm của từ 3 âm tiết kết thúc bằng -ion, -ic, -al',
    badgeIconName: 'Heart',
    vocabulary: [
      { id: 'u3-v1', word: 'balanced diet', phonetic: '/ˌbælənst ˈdaɪət/', partOfSpeech: 'noun', vietnameseMeaning: 'chế độ ăn uống cân bằng', englishExample: 'Eating a balanced diet with plenty of vegetables helps teens stay energetic.', vietnameseExample: 'Ăn một chế độ ăn cân bằng với nhiều rau củ giúp thanh thiếu niên luôn tràn đầy năng lượng.' },
      { id: 'u3-v2', word: 'manage stress', phonetic: '/ˈmænɪʤ strɛs/', partOfSpeech: 'verb', vietnameseMeaning: 'quản lý căng thẳng', englishExample: 'Practicing deep breathing and yoga is a great way to manage stress before exams.', vietnameseExample: 'Tập thở sâu và yoga là cách tuyệt vời để kiểm soát căng thẳng trước các kỳ thi.' },
      { id: 'u3-v3', word: 'physical health', phonetic: '/ˈfɪzɪkəl hɛlθ/', partOfSpeech: 'noun', vietnameseMeaning: 'sức khỏe thể chất', englishExample: 'Daily running and swimming improve both physical health and stamina.', vietnameseExample: 'Chạy bộ và bơi lội hàng ngày cải thiện cả sức khỏe thể chất lẫn sức bền.' },
      { id: 'u3-v4', word: 'mental wellbeing', phonetic: '/ˈmɛntl ˌwɛlˈbiːɪŋ/', partOfSpeech: 'noun', vietnameseMeaning: 'sức khỏe tinh thần', englishExample: 'Having supportive friends is essential for good mental wellbeing.', vietnameseExample: 'Có những người bạn luôn ủng hộ là điều cần thiết cho một sức khỏe tinh thần tốt.' },
      { id: 'u3-v5', word: 'counseling', phonetic: '/ˈkaʊnsəlɪŋ/', partOfSpeech: 'noun', vietnameseMeaning: 'sự tư vấn tâm lý', englishExample: 'The school counselor provides helpful counseling for students facing anxiety.', vietnameseExample: 'Chuyên viên tư vấn học đường cung cấp sự tư vấn hữu ích cho học sinh gặp lo âu.' },
      { id: 'u3-v6', word: 'stay up late', phonetic: '/steɪ ʌp leɪt/', partOfSpeech: 'phrasal verb', vietnameseMeaning: 'thức khuya', englishExample: 'You should avoid staying up late playing computer games before school days.', vietnameseExample: 'Bạn nên tránh thức khuya chơi trò chơi điện tử trước các ngày đi học.' },
      { id: 'u3-v7', word: 'peer pressure', phonetic: '/pɪə ˈprɛʃə/', partOfSpeech: 'noun', vietnameseMeaning: 'áp lực từ bạn bè đồng trang lứa', englishExample: 'Teens need strong confidence to resist negative peer pressure.', vietnameseExample: 'Thiếu niên cần sự tự tin vững vàng để chống lại áp lực tiêu cực từ bạn bè.' },
      { id: 'u3-v8', word: 'nutrient', phonetic: '/ˈnjuːtriənt/', partOfSpeech: 'noun', vietnameseMeaning: 'chất dinh dưỡng', englishExample: 'Fresh fruits provide vital nutrients that protect our immune system.', vietnameseExample: 'Trái cây tươi cung cấp các chất dinh dưỡng thiết yếu bảo vệ hệ miễn dịch.' }
    ],
    grammar: {
      title: 'Động từ khuyết thiếu trong Câu điều kiện loại 1 & Cụm từ chỉ lời khuyên',
      summary: 'Trong câu điều kiện loại 1, mệnh đề chính có thể dùng should, must, can, may, might thay cho will để đưa ra lời khuyên, sự cho phép hoặc mức độ chắc chắn.',
      formulaBox: [
        'If + S + V(hiện tại đơn), S + should / must / can / might + V-bare',
        'Should / Ought to + V-bare: Khuyên nên làm gì',
        'Must + V-bare: Bắt buộc phải làm gì để giữ sức khỏe'
      ],
      usagePoints: [
        { title: '1. Đưa ra lời khuyên về lối sống', detail: 'Dùng should / ought to trong mệnh đề chính khi đưa ra giải pháp chăm sóc bản thân.', example: 'If you feel exhausted after school, you should take a short power nap.' },
        { title: '2. Nhắc nhở quy tắc sức khỏe', detail: 'Dùng must / have to khi nói về những điều bắt buộc phải tuân theo.', example: 'If you want to maintain a healthy weight, you must not skip breakfast.' }
      ],
      exercises: [
        { id: 'u3-g1', question: 'If you want to reduce exam anxiety, you _____ practice deep breathing every morning.', options: ['A. should', 'B. must have', 'C. would', 'D. were to'], correctAnswer: 'A. should', explanation: 'Câu điều kiện loại 1 đưa ra lời khuyên dùng "should + V-bare".' },
        { id: 'u3-g2', question: 'If teenagers _____ enough sleep, they can concentrate much better in class.', options: ['A. get', 'B. got', 'C. will get', 'D. are getting'], correctAnswer: 'A. get', explanation: 'Mệnh đề If của câu điều kiện loại 1 chia thì Hiện tại đơn (get).' },
        { id: 'u3-g3', question: 'You _____ eat too much fast food if you want to keep your heart healthy.', options: ['A. shouldn’t', 'B. must', 'C. ought', 'D. would'], correctAnswer: 'A. shouldn’t', explanation: '"Shouldn’t eat" là lời khuyên không nên ăn quá nhiều thức ăn nhanh.' },
        { id: 'u3-g4', question: 'If Lan feels stressed with her homework, she _____ talk to the school counselor.', options: ['A. can', 'B. could have', 'C. will have', 'D. was able to'], correctAnswer: 'A. can', explanation: 'Dùng "can + V-bare" trong mệnh đề chính để chỉ khả năng hoặc gợi ý hành động.' },
        { id: 'u3-g5', question: 'If we _____ regular physical exercise, our muscles and bones become stronger.', options: ['A. do', 'B. did', 'C. will do', 'D. have done'], correctAnswer: 'A. do', explanation: 'Thì hiện tại đơn trong mệnh đề If (do regular exercise).' },
        { id: 'u3-g6', question: 'If you suffer from insomnia, you _____ avoid drinking coffee late in the evening.', options: ['A. ought to', 'B. ought', 'C. would', 'D. should to'], correctAnswer: 'A. ought to', explanation: '"Ought to + V-bare" đồng nghĩa với "should" dùng để đưa ra lời khuyên.' }
      ]
    },
    listening: {
      audioTitle: 'Hội Thảo Kỹ Năng Sống Khỏe & Vượt Qua Áp Lực Thi Cử',
      audioDuration: '2:20',
      audioScriptSpeaker: 'Dr. Harper & Students',
      transcriptText: "Dr. Harper: Good morning, students! Today we are discussing three golden habits for teenage wellness.\nFirst, make sure you maintain a balanced diet with sufficient protein, fresh vegetables, and water.\nSecond, allocate at least thirty minutes each day for physical exercise, such as badminton, cycling, or jogging.\nFinally, learn to manage stress effectively. Never hesitate to talk to your teachers or school counselors when feeling overwhelmed.\nStudent: Dr. Harper, how many hours of sleep should teens get each night?\nDr. Harper: Aim for eight to nine hours of quality sleep to recharge your brain completely.",
      vietnameseTranslation: "Bác sĩ Harper: Chào buổi sáng các em học sinh! Hôm nay chúng ta thảo luận về ba thói quen vàng cho sức khỏe tuổi thiếu niên.\nThứ nhất, hãy đảm bảo các em duy trì chế độ ăn cân bằng với đầy đủ protein, rau tươi và nước lọc.\nThứ hai, hãy dành ít nhất 30 phút mỗi ngày để tập thể dục, ví dụ như cầu lông, đạp xe hoặc chạy bộ.\nCuối cùng, hãy học cách kiểm soát căng thẳng hiệu quả. Đừng ngần ngại tâm sự với thầy cô hoặc chuyên viên tư vấn khi cảm thấy quá tải.\nHọc sinh: Thưa bác sĩ, thiếu niên nên ngủ bao nhiêu tiếng mỗi đêm ạ?\nBác sĩ Harper: Hãy cố gắng ngủ từ 8 đến 9 tiếng chất lượng để não bộ được tái tạo hoàn toàn.",
      questions: [
        { id: 'u3-l1', question: 'How much daily physical exercise does Dr. Harper recommend?', options: ['A. At least ten minutes', 'B. At least thirty minutes', 'C. Two full hours', 'D. None on weekdays'], correctAnswerIndex: 1, explanation: 'Trong bài nghe: "allocate at least thirty minutes each day for physical exercise."' },
        { id: 'u3-l2', question: 'What is the recommended amount of sleep for teenagers?', options: ['A. 4 to 5 hours', 'B. 6 hours', 'C. 8 to 9 hours', 'D. 12 hours'], correctAnswerIndex: 2, explanation: 'Trong bài nghe: "Aim for eight to nine hours of quality sleep to recharge your brain completely."' },
        { id: 'u3-l3', question: 'What should students do when feeling overwhelmed with stress?', options: ['A. Keep silent and skip meals', 'B. Talk to teachers or school counselors', 'C. Play video games all night', 'D. Stop going to school'], correctAnswerIndex: 1, explanation: 'Trong bài nghe: "Never hesitate to talk to your teachers or school counselors when feeling overwhelmed."' },
        { id: 'u3-l4', question: 'Which sports are mentioned as good physical activities for teens?', options: ['A. Scuba diving and skiing', 'B. Badminton, cycling, or jogging', 'C. Car racing', 'D. Bungee jumping'], correctAnswerIndex: 1, explanation: 'Trong bài nghe: "such as badminton, cycling, or jogging."' }
      ],
      fillInBlankExercises: [
        { id: 'u3-f1', sentenceWithBlank: 'Teens need eight to nine hours of quality _____ every night.', correctWord: 'sleep', hint: 'Giấc ngủ nghỉ ngơi ban đêm' },
        { id: 'u3-f2', sentenceWithBlank: 'Eating a _____ diet is essential for physical health.', correctWord: 'balanced', hint: 'Tính từ mang nghĩa cân đối, hài hòa' }
      ]
    },
    speakingPrompts: [
      { id: 'u3-s1', targetSentence: 'Eating a balanced diet and exercising regularly keeps your body energetic and strong.', ipa: '/ˈiːtɪŋ ə ˈbælənst ˈdaɪət ænd ˈɛksəsaɪzɪŋ ˈrɛɡjʊləli kiːps jɔː ˈbɒdi ˌɛnəˈʤɛtɪk ænd strɒŋ/', vietnameseMeaning: 'Ăn một chế độ ăn cân bằng và tập thể dục thường xuyên giúp cơ thể bạn tràn đầy năng lượng và khỏe mạnh.', contextSituation: 'Chia sẻ bí quyết giữ gìn sức khỏe dẻo dai với các bạn trong lớp.', keyPhonicsFocus: 'Luyện nối âm "diet and" và phát âm /d/ trong "balanced".', sampleAudioText: 'Eating a balanced diet and exercising regularly keeps your body energetic and strong.' },
      { id: 'u3-s2', targetSentence: 'Teens should get at least eight hours of restful sleep every night to recharge their brains.', ipa: '/tiːnz ʃʊd ɡɛt æt liːst eɪt ˈaʊəz ɒv ˈrɛstfʊl sliːp ˈɛvri naɪt tuː ˌriːˈʧɑːʤ ðeə breɪnz/', vietnameseMeaning: 'Thiếu niên nên ngủ ít nhất 8 tiếng mỗi đêm để tái tạo năng lượng cho não bộ.', contextSituation: 'Khuyên bạn bè không nên thức khuya học bài hay lướt điện thoại.', keyPhonicsFocus: 'Phát âm chuẩn âm /t/ trong "night" và âm /z/ trong "brains".', sampleAudioText: 'Teens should get at least eight hours of restful sleep every night to recharge their brains.' },
      { id: 'u3-s3', targetSentence: 'Practicing deep breathing helps students manage stress and stay calm during exam periods.', ipa: '/ˈpræktɪsɪŋ diːp ˈbriːðɪŋ hɛlps ˈstjuːdənts ˈmænɪʤ strɛs ænd steɪ kɑːm ˈdjʊərɪŋ ɪɡˈzæm ˈpɪərɪədz/', vietnameseMeaning: 'Luyện tập thở sâu giúp học sinh kiểm soát căng thẳng và giữ bình tĩnh trong các đợt thi cử.', contextSituation: 'Thảo luận về các phương pháp giải tỏa tâm lý học đường.', keyPhonicsFocus: 'Phát âm chuẩn âm /ð/ trong "breathing" và âm câm /l/ trong "calm".', sampleAudioText: 'Practicing deep breathing helps students manage stress and stay calm during exam periods.' },
      { id: 'u3-s4', targetSentence: 'Joining outdoor sports clubs allows teenagers to make new friends and avoid loneliness.', ipa: '/ˈʤɔɪnɪŋ ˈaʊtdɔː spɔːts klʌbz əˈlaʊz ˈtiːnˌeɪʤəz tuː meɪk njuː frɛndz ænd əˈvɔɪd ˈləʊnlɪnəs/', vietnameseMeaning: 'Tham gia các câu lạc bộ thể thao ngoài trời giúp thiếu niên kết bạn mới và tránh sự cô đơn.', contextSituation: 'Khuyến khích bạn bè hòa nhập và tích cực vận động ngoại khóa.', keyPhonicsFocus: 'Phát âm rõ cụm /nz/ trong "friends" và âm /s/ trong "loneliness".', sampleAudioText: 'Joining outdoor sports clubs allows teenagers to make new friends and avoid loneliness.' },
      { id: 'u3-s5', targetSentence: 'Drinking plenty of pure water throughout the day improves concentration and digestion.', ipa: '/ˈdrɪŋkɪŋ ˈplɛnti ɒv pjʊə ˈwɔːtə θruːˈaʊt ðə deɪ ɪmˈpruːvz ˌkɒnsənˈtreɪʃən ænd daɪˈʤɛsʧən/', vietnameseMeaning: 'Uống nhiều nước tinh khiết trong ngày giúp cải thiện khả năng tập trung và hệ tiêu hóa.', contextSituation: 'Nhắc nhở thói quen uống đủ nước mỗi ngày khi đến trường.', keyPhonicsFocus: 'Chú ý nhấn trọng âm vào "concentration" /ˌkɒnsənˈtreɪʃən/.', sampleAudioText: 'Drinking plenty of pure water throughout the day improves concentration and digestion.' }
    ],
    reading: {
      title: 'Chăm Sóc Sức Khỏe Tinh Thần & Thể Chất Tuổi Học Trò',
      topic: 'Lối sống lành mạnh & Kỹ năng tự chăm sóc',
      passageText: "Adolescence is a crucial stage of physical, emotional, and cognitive growth. During these years, teenagers often face heavy academic workloads, extracurricular expectations, and peer pressure. Consequently, balancing physical health and emotional wellbeing is vital.\n\nA common mistake among teenagers is sacrificing sleep to study late or scroll social media. Sleep deprivation impairs memory consolidation, reduces focus, and triggers mood swings. Doctors emphasize that teenagers need around eight to ten hours of sleep nightly.\n\nIn addition, engaging in thirty minutes of moderate physical exercise releases endorphins, the brain's natural mood boosters. Combined with open communication with trusted family members and teachers, teens can build resilience and thrive.",
      keyVocabularyHighlights: [
        { word: 'adolescence', meaning: 'tuổi vị thành niên' },
        { word: 'sleep deprivation', meaning: 'sự thiếu ngủ trầm trọng' },
        { word: 'memory consolidation', meaning: 'quá trình củng cố và ghi nhớ thông tin của não' },
        { word: 'resilience', meaning: 'sức bền bỉ, khả năng phục hồi tinh thần' }
      ],
      questions: [
        { id: 'u3-r1', question: 'What is a common mistake among teenagers mentioned in the text?', options: ['A. Exercising too much in the gym', 'B. Sacrificing sleep to study late or scroll social media', 'C. Drinking too much water', 'D. Talking too much to school counselors'], correctAnswerIndex: 1, explanation: 'Trong đoạn 2: "A common mistake among teenagers is sacrificing sleep to study late or scroll social media."' },
        { id: 'u3-r2', question: 'What negative effects does sleep deprivation cause?', options: ['A. Better test scores and high energy', 'B. Impaired memory, reduced focus, and mood swings', 'C. Stronger physical muscles', 'D. Improved eyesight'], correctAnswerIndex: 1, explanation: 'Trong đoạn 2: "Sleep deprivation impairs memory consolidation, reduces focus, and triggers mood swings."' },
        { id: 'u3-r3', question: 'What chemical substance is released during physical exercise to boost mood?', options: ['A. Caffeine', 'B. Endorphins', 'C. Carbon dioxide', 'D. Sugar'], correctAnswerIndex: 1, explanation: 'Trong đoạn 3: "physical exercise releases endorphins, the brains natural mood boosters."' },
        { id: 'u3-r4', question: 'Which word in paragraph 3 is closest in meaning to "thrive"?', options: ['A. Fail', 'B. Flourish / Develop successfully', 'C. Disappear', 'D. Give up'], correctAnswerIndex: 1, explanation: '"Thrive" có nghĩa là phát triển thịnh vượng, thành công và khỏe mạnh.' }
      ]
    },
    writing: {
      id: 'u3-w1',
      title: 'Write a paragraph giving advice on how to maintain a healthy lifestyle (60-80 words)',
      description: 'Viết một đoạn văn đưa ra lời khuyên cho bạn bè về cách duy trì lối sống lành mạnh và giảm bớt căng thẳng.',
      suggestedOutline: [
        'Introduction: State the importance of a healthy lifestyle for teenagers.',
        'Body: Give 2-3 specific tips (balanced meals, daily exercise, 8 hours of sleep).',
        'Conclusion: Conclude with an encouraging remark.'
      ],
      usefulPhrases: [
        'To lead a healthy lifestyle, teens should...',
        'First and foremost, it is important to eat a balanced diet with...',
        'Moreover, getting at least eight hours of sleep will help...',
        'In conclusion, taking care of your health today guarantees...'
      ],
      wordLimit: '60 - 80 từ',
      sampleGrade10Response: 'Maintaining a healthy lifestyle is crucial for teenage wellbeing. First, you should eat a balanced diet rich in vegetables, fruits, and lean proteins while cutting down on sugary drinks. Second, try to engage in at least thirty minutes of physical exercise daily, such as jogging or cycling. Finally, ensure you get eight hours of restful sleep every night to recharge your mind. By building these positive habits, you can overcome stress and stay energetic.'
    }
  }
];

// Write unit 3
fs.writeFileSync('src/data/units/unit3.ts', 'import { UnitData } from "../../types";\n\nexport const UNIT_3_DATA: UnitData = ' + JSON.stringify(UNITS_3_TO_12[0], null, 2) + ';\n');
console.log("Unit 3 written successfully");
