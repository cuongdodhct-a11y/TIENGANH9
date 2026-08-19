import json
from gen_unit_utils import make_unit, write_ts_unit

# ==============================================================================
# UNIT 3: HEALTHY LIVING FOR TEENS
# ==============================================================================
u3_vocab = [
    {"id": "u3-v1", "word": "balanced diet", "phonetic": "/ˈbælənst ˈdaɪət/", "partOfSpeech": "noun", "vietnameseMeaning": "chế độ ăn uống cân bằng dinh dưỡng", "englishExample": "Maintaining a balanced diet rich in leafy greens strengthens your immune system.", "vietnameseExample": "Duy trì chế độ ăn uống cân bằng giàu rau xanh giúp tăng cường hệ miễn dịch."},
    {"id": "u3-v2", "word": "stress management", "phonetic": "/strɛs ˈmænɪʤmənt/", "partOfSpeech": "noun", "vietnameseMeaning": "kỹ năng quản lý và giải tỏa căng thẳng", "englishExample": "Teens should master stress management techniques before national exam periods.", "vietnameseExample": "Thanh thiếu niên nên nắm vững kỹ năng giải tỏa căng thẳng trước các kỳ thi quốc gia."},
    {"id": "u3-v3", "word": "physical fitness", "phonetic": "/ˈfɪzɪkəl ˈfɪtnɪs/", "partOfSpeech": "noun", "vietnameseMeaning": "thể lực, sức khỏe thể chất", "englishExample": "Daily morning calisthenics improves cardiovascular health and physical fitness.", "vietnameseExample": "Thể dục buổi sáng hàng ngày giúp cải thiện sức khỏe tim mạch và thể lực."},
    {"id": "u3-v4", "word": "well-being", "phonetic": "/ˌwɛlˈbiːɪŋ/", "partOfSpeech": "noun", "vietnameseMeaning": "sự khỏe mạnh về thể chất lẫn tinh thần", "englishExample": "Adequate sleep is crucial for emotional stability and overall mental well-being.", "vietnameseExample": "Ngủ đủ giấc là yếu tố sống còn cho sự ổn định cảm xúc và tinh thần khỏe mạnh tổng thể."},
    {"id": "u3-v5", "word": "counselor", "phonetic": "/ˈkaʊnsələ/", "partOfSpeech": "noun", "vietnameseMeaning": "chuyên gia tư vấn tâm lý học đường", "englishExample": "The school counselor gave students constructive advice on overcoming peer pressure.", "vietnameseExample": "Chuyên gia tư vấn học đường đã cho học sinh lời khuyên bổ ích để vượt qua áp lực đồng trang lứa."},
    {"id": "u3-v6", "word": "calorie intake", "phonetic": "/ˈkæləri ˈɪnteɪk/", "partOfSpeech": "noun", "vietnameseMeaning": "lượng calo nạp vào cơ thể", "englishExample": "Limiting sugary beverage intake helps regulate daily calorie intake effectively.", "vietnameseExample": "Hạn chế đồ uống có đường giúp kiểm soát lượng calo nạp vào mỗi ngày một cách hiệu quả."},
    {"id": "u3-v7", "word": "anxiety", "phonetic": "/æŋˈzaɪəti/", "partOfSpeech": "noun", "vietnameseMeaning": "sự lo âu, cảm giác bồn chồn", "englishExample": "Mindful deep breathing exercises help teenagers calm their exam anxiety.", "vietnameseExample": "Các bài tập thở sâu chánh niệm giúp học sinh giải tỏa sự lo âu trong phòng thi."},
    {"id": "u3-v8", "word": "stay in shape", "phonetic": "/steɪ ɪn ʃeɪp/", "partOfSpeech": "idiom", "vietnameseMeaning": "giữ dáng, duy trì cơ thể săn chắc", "englishExample": "Playing badminton three times a week helps teenagers stay in shape.", "vietnameseExample": "Chơi cầu lông 3 lần mỗi tuần giúp các bạn tuổi teen giữ gìn vóc dáng cân đối."},
    {"id": "u3-v9", "word": "screen time", "phonetic": "/skriːn taɪm/", "partOfSpeech": "noun", "vietnameseMeaning": "thời gian sử dụng màn hình điện tử", "englishExample": "Excessive screen time before bedtime causes chronic insomnia in adolescents.", "vietnameseExample": "Dùng thiết bị điện tử quá nhiều trước khi ngủ gây mất ngủ kinh niên ở thanh thiếu niên."},
    {"id": "u3-v10", "word": "peer pressure", "phonetic": "/pɪə ˈprɛʃə/", "partOfSpeech": "noun", "vietnameseMeaning": "áp lực từ bạn bè cùng trang lứa", "englishExample": "Parents should listen empathetically to help teens deal with peer pressure.", "vietnameseExample": "Cha mẹ nên lắng nghe thấu cảm để giúp con đối mặt với áp lực bạn bè."},
    {"id": "u3-v11", "word": "sedentary lifestyle", "phonetic": "/ˈsɛdntəri ˈlaɪfstaɪl/", "partOfSpeech": "noun", "vietnameseMeaning": "lối sống lười vận động, ngồi nhiều", "englishExample": "A sedentary lifestyle increases the risk of juvenile obesity and poor posture.", "vietnameseExample": "Lối sống lười vận động làm tăng nguy cơ béo phì học đường và vẹo cột sống."},
    {"id": "u3-v12", "word": "mental health", "phonetic": "/ˈmɛntl hɛlθ/", "partOfSpeech": "noun", "vietnameseMeaning": "sức khỏe tinh thần, tâm lý", "englishExample": "Schools now provide specialized psychological workshops to foster student mental health.", "vietnameseExample": "Các trường học hiện tổ chức các buổi hội thảo tâm lý chuyên sâu để nuôi dưỡng sức khỏe tinh thần cho học sinh."},
    {"id": "u3-v13", "word": "processed food", "phonetic": "/ˈprəʊsɛst fuːd/", "partOfSpeech": "noun", "vietnameseMeaning": "thực phẩm chế biến sẵn đóng hộp", "englishExample": "Consuming too much processed food can lead to nutritional deficiencies.", "vietnameseExample": "Ăn quá nhiều đồ chế biến sẵn có thể dẫn đến mất cân bằng và thiếu hụt dinh dưỡng."},
    {"id": "u3-v14", "word": "hydrate", "phonetic": "/ˈhaɪdreɪt/", "partOfSpeech": "verb", "vietnameseMeaning": "cung cấp đủ nước cho cơ thể", "englishExample": "Remember to hydrate properly by drinking at least two liters of water daily.", "vietnameseExample": "Hãy nhớ cung cấp đủ nước cho cơ thể bằng cách uống tối thiểu 2 lít nước mỗi ngày."},
    {"id": "u3-v15", "word": "sleep deprivation", "phonetic": "/sliːp ˌdɛprɪˈveɪʃən/", "partOfSpeech": "noun", "vietnameseMeaning": "sự thiếu ngủ, mất ngủ kéo dài", "englishExample": "Sleep deprivation severely impairs cognitive concentration and memory retention.", "vietnameseExample": "Thiếu ngủ làm suy giảm nghiêm trọng khả năng tập trung và ghi nhớ bài học."},
    {"id": "u3-v16", "word": "optimistic", "phonetic": "/ˌɒptɪˈmɪstɪk/", "partOfSpeech": "adjective", "vietnameseMeaning": "lạc quan, tích cực", "englishExample": "Keeping an optimistic mindset helps students overcome unexpected academic setbacks.", "vietnameseExample": "Giữ tinh thần lạc quan giúp học sinh vượt qua những trở ngại học tập bất ngờ."},
    {"id": "u3-v17", "word": "immune system", "phonetic": "/ɪˈmjuːn ˈsɪstɪm/", "partOfSpeech": "noun", "vietnameseMeaning": "hệ thống miễn dịch", "englishExample": "Vitamin C from citrus fruits strengthens the human immune system against seasonal flu.", "vietnameseExample": "Vitamin C từ các loại quả có múi tăng cường hệ miễn dịch chống lại cảm cúm theo mùa."},
    {"id": "u3-v18", "word": "work-life balance", "phonetic": "/wɜːk laɪf ˈbæləns/", "partOfSpeech": "noun", "vietnameseMeaning": "sự cân bằng giữa học tập/làm việc và nghỉ ngơi", "englishExample": "Establishing a healthy study-life balance prevents teenager burnout.", "vietnameseExample": "Tạo dựng sự cân bằng giữa học tập và cuộc sống giúp ngăn ngừa kiệt sức ở lứa tuổi học sinh."},
    {"id": "u3-v19", "word": "cut down on", "phonetic": "/kʌt daʊn ɒn/", "partOfSpeech": "phrasal verb", "vietnameseMeaning": "cắt giảm, giảm bớt lượng tiêu thụ", "englishExample": "You ought to cut down on fast food and soft drinks to stay healthy.", "vietnameseExample": "Bạn nên cắt giảm thức ăn nhanh và nước ngọt có gas để giữ gìn sức khỏe."},
    {"id": "u3-v20", "word": "recharge", "phonetic": "/riːˈʧɑːʤ/", "partOfSpeech": "verb", "vietnameseMeaning": "nạp lại năng lượng, phục hồi sức lực", "englishExample": "Taking a weekend nature hike allows students to recharge their mental energy.", "vietnameseExample": "Đi dạo hòa mình vào thiên nhiên cuối tuần giúp học sinh nạp lại nguồn năng lượng tinh thần."}
]

u3_grammar_info = {
    "title": "Động Từ Khuyết Thiếu (Modal Verbs: Must, Have to, Should, Ought to) & Câu Điều Kiện Loại 1",
    "summary": "Must/Have to diễn tả sự bắt buộc hoặc nghĩa vụ. Should/Ought to đưa ra lời khuyên hữu ích. Câu điều kiện loại 1 diễn tả sự việc có thể xảy ra ở hiện tại hoặc tương lai.",
    "formulaBox": [
        "Must + V-bare: Bắt buộc từ phía người nói hoặc quy tắc nội bộ (You must sleep 8 hours).",
        "Have to + V-bare: Bắt buộc mang tính khách quan từ ngoại cảnh (Teens have to wear uniforms).",
        "Mustn't: Cấm đoán (You mustn't skip breakfast). / Don't have to: Không cần thiết.",
        "Should / Ought to + V-bare: Lời khuyên (You should cut down on sugary snacks).",
        "Conditional Type 1: If + S + V(hiện tại đơn), S + will/can/must/should + V-bare"
    ],
    "usagePoints": [
        {"title": "1. Phân biệt Must và Have to", "detail": "Must mang tính chủ quan; Have to do luật lệ hoặc yêu cầu bên ngoài quy định.", "example": "I must finish my revision tonight. Students have to submit projects by Friday."},
        {"title": "2. Câu điều kiện loại 1 chỉ lời khuyên sức khỏe", "detail": "If you exercise regularly, you will feel energized throughout the day.", "example": "If you suffer from stress, you should consult a counselor."}
    ]
}

u3_grammar_exs = [
    {"id": "u3-g1", "question": "You _____ eat so many salty chips if you want to protect your cardiovascular health.", "options": ["A. shouldn't", "B. must", "C. ought", "D. have to"], "correctAnswer": "A. shouldn't", "explanation": "Lời khuyên không nên ăn nhiều khoai tây chiên nhiều muối: 'shouldn't'."},
    {"id": "u3-g2", "question": "If you _____ at least eight hours every night, your brain will function much faster.", "options": ["A. sleep", "B. slept", "C. will sleep", "D. sleeping"], "correctAnswer": "A. sleep", "explanation": "Mệnh đề If trong câu điều kiện loại 1 chia thì Hiện tại đơn: 'If you sleep'."},
    {"id": "u3-g3", "question": "Students _____ wear protective sports gear during gymnastic lessons; it is a school safety rule.", "options": ["A. have to", "B. shouldn't", "C. might", "D. ought"], "correctAnswer": "A. have to", "explanation": "Quy tắc an toàn của nhà trường bắt buộc: 'have to'."},
    {"id": "u3-g4", "question": "If teenagers feel overwhelmed by exam pressure, they _____ talk openly to the school counselor.", "options": ["A. should", "B. would", "C. had", "D. must not"], "correctAnswer": "A. should", "explanation": "Lời khuyên trong câu điều kiện loại 1: 'they should talk'."},
    {"id": "u3-g5", "question": "You _____ skip morning breakfast because it provides essential glucose for learning.", "options": ["A. mustn't", "B. don't have to", "C. shouldn't", "D. both A and C are suitable"], "correctAnswer": "D. both A and C are suitable", "explanation": "Cả 'mustn't' (không được) và 'shouldn't' (không nên) đều mang ý khuyên bảo hoặc cấm kỵ bỏ bữa sáng."},
    {"id": "u3-g6", "question": "If you don't reduce your daily screen time, your eyesight _____ deteriorate.", "options": ["A. will", "B. would", "C. had", "D. is"], "correctAnswer": "A. will", "explanation": "Mệnh đề chính của câu điều kiện loại 1: 'will deteriorate'."},
    {"id": "u3-g7", "question": "You _____ bring your medical card today; our school clinic already has your digital records.", "options": ["A. don't have to", "B. mustn't", "C. should", "D. ought"], "correctAnswer": "A. don't have to", "explanation": "'don't have to' diễn đạt việc không bắt buộc / không cần thiết phải mang thẻ giấy."},
    {"id": "u3-g8", "question": "Teens ought _____ drink at least two liters of filtered water daily to stay hydrated.", "options": ["A. to", "B. of", "C. for", "D. on"], "correctAnswer": "A. to", "explanation": "Cấu trúc lời khuyên chuẩn: 'ought to + V-bare'."},
    {"id": "u3-g9", "question": "If Lan _____ her time effectively, she will not suffer from late-night revision panic.", "options": ["A. manages", "B. managed", "C. will manage", "D. manage"], "correctAnswer": "A. manages", "explanation": "Chủ ngữ Lan số ít, động từ chia thì hiện tại đơn trong mệnh đề If: 'manages'."},
    {"id": "u3-g10", "question": "We _____ stay up past midnight playing online video games before school days.", "options": ["A. mustn't", "B. don't need", "C. have to", "D. ought"], "correctAnswer": "A. mustn't", "explanation": "'mustn't' thể hiện sự cấm đoán không được thức khuya chơi game."},
    {"id": "u3-g11", "question": "If you _____ regular physical exercise, you can prevent adolescent obesity.", "options": ["A. take", "B. took", "C. will take", "D. taken"], "correctAnswer": "A. take", "explanation": "Thì hiện tại đơn trong mệnh đề If loại 1: 'If you take'."},
    {"id": "u3-g12", "question": "You _____ wash your hands with antibacterial soap before preparing your meals.", "options": ["A. must", "B. might", "C. could", "D. wouldn't"], "correctAnswer": "A. must", "explanation": "'must' thể hiện nghĩa vụ và nguyên tắc vệ sinh bắt buộc."},
    {"id": "u3-g13", "question": "If he eats too much processed junk food, his cholesterol levels _____ rise.", "options": ["A. will", "B. would", "C. had", "D. were"], "correctAnswer": "A. will", "explanation": "Mệnh đề chính loại 1 dùng 'will + V'."},
    {"id": "u3-g14", "question": "According to the fitness instructor, you _____ stretch your muscles before lifting weights.", "options": ["A. should", "B. might not", "C. wouldn't", "D. won't"], "correctAnswer": "A. should", "explanation": "Lời khuyên kỹ thuật thể thao: 'should stretch'."},
    {"id": "u3-g15", "question": "If you _____ persistent headaches, you must see a doctor immediately.", "options": ["A. experience", "B. experienced", "C. will experience", "D. experiencing"], "correctAnswer": "A. experience", "explanation": "Mệnh đề If loại 1 chia hiện tại đơn: 'experience'."},
    {"id": "u3-g16", "question": "Students _____ cheat on physical health examinations; it is strictly prohibited.", "options": ["A. mustn't", "B. don't have to", "C. should", "D. needn't"], "correctAnswer": "A. mustn't", "explanation": "'mustn't' thể hiện lệnh cấm tuyệt đối."},
    {"id": "u3-g17", "question": "If we _____ a positive outlook on life, we can overcome challenges with ease.", "options": ["A. maintain", "B. maintained", "C. will maintain", "D. maintaining"], "correctAnswer": "A. maintain", "explanation": "Hiện tại đơn: 'maintain'."},
    {"id": "u3-g18", "question": "You _____ buy expensive gym equipment; simple jogging and push-ups are equally effective.", "options": ["A. don't have to", "B. mustn't", "C. ought to", "D. must"], "correctAnswer": "A. don't have to", "explanation": "'don't have to' mang ý nghĩa không cần thiết phải mua thiết bị đắt tiền."},
    {"id": "u3-g19", "question": "If you want to have glowing skin, you _____ drink enough water every single day.", "options": ["A. must", "B. wouldn't", "C. had", "D. could have"], "correctAnswer": "A. must", "explanation": "'must' nhấn mạnh tầm quan trọng thiết yếu."},
    {"id": "u3-g20", "question": "Unless you practice deep breathing, you _____ control your public speaking anxiety.", "options": ["A. won't", "B. would", "C. will", "D. can"], "correctAnswer": "A. won't", "explanation": "'Unless' = If not. Mệnh đề chính: 'you won't control'."}
]

u3_listening_info = {
    "audioTitle": "Lời Khuyên Từ Chuyên Gia Tâm Lý Học Đường (Tips from the School Counselor)",
    "audioDuration": "3:10",
    "audioScriptSpeaker": "Counselor Dr. Robert & Grade 9 Student Mai",
    "transcriptText": "Mai: Dr. Robert, I often feel overwhelmed by endless homework assignments and exam pressure. What should I do?\nDr. Robert: That is a very common feeling among Grade 9 students, Mai! First, you must prioritize your tasks using a daily planner. Break large study projects into bite-sized 25-minute study intervals.\nMai: How can I manage my anxiety when I sit in front of a difficult test paper?\nDr. Robert: Practice the 4-7-8 breathing technique: inhale for four seconds, hold your breath for seven seconds, and exhale gently for eight seconds. Also, ensure you sleep eight hours every night to keep your brain refreshed.\nMai: Thank you, Dr. Robert! I will also cut down on midnight smartphone browsing.",
    "vietnameseTranslation": "Mai: Thưa bác sĩ Robert, em thường cảm thấy bị quá tải bởi bài tập về nhà dày đặc và áp lực thi cử. Em nên làm gì ạ?\nBác sĩ Robert: Đó là cảm giác rất phổ biến ở các bạn học sinh lớp 9, Mai à! Trước tiên, em cần sắp xếp thứ tự ưu tiên cho công việc bằng sổ kế hoạch. Hãy chia nhỏ các bài học lớn thành các khoảng thời gian 25 phút tập trung.\nMai: Em có thể kiểm soát sự lo lắng thế nào khi ngồi trước một đề thi khó ạ?\nBác sĩ Robert: Hãy thực hành kỹ thuật thở 4-7-8: hít vào trong 4 giây, giữ hơi trong 7 giây và thở ra nhẹ nhàng trong 8 giây. Ngoài ra, hãy đảm bảo ngủ đủ 8 tiếng mỗi đêm để não bộ luôn minh mẫn.\nMai: Em cảm ơn bác sĩ Robert! Em cũng sẽ cắt giảm việc lướt điện thoại lúc nửa đêm ạ."
}

u3_listening_qs = [
    {"id": "u3-l1", "question": "Why does student Mai visit Counselor Dr. Robert?", "options": ["A. Because she feels overwhelmed by homework and exam pressure", "B. Because she lost her school bag", "C. Because she wants to join the football club", "D. Because she dislikes painting"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'I often feel overwhelmed by endless homework assignments and exam pressure.'"},
    {"id": "u3-l2", "question": "What study technique does Dr. Robert recommend to handle large projects?", "options": ["A. Studying for 10 hours without resting", "B. Breaking projects into bite-sized 25-minute study intervals", "C. Copying answers from classmates", "D. Skipping all homework"], "correctAnswerIndex": 1, "explanation": "Trong bài nghe: 'Break large study projects into bite-sized 25-minute study intervals.'"},
    {"id": "u3-l3", "question": "What is the sequence of the 4-7-8 breathing technique?", "options": ["A. Inhale 4s, hold 7s, exhale gently 8s", "B. Inhale 10s, exhale 10s", "C. Hold breath for 40s", "D. Breathe as fast as possible"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'inhale for four seconds, hold your breath for seven seconds, and exhale gently for eight seconds.'"},
    {"id": "u3-l4", "question": "How many hours of sleep every night does Dr. Robert advise Mai to get?", "options": ["A. Four hours", "B. Eight hours", "C. Twelve hours", "D. Only two hours"], "correctAnswerIndex": 1, "explanation": "Trong bài nghe: 'ensure you sleep eight hours every night.'"},
    {"id": "u3-l5", "question": "What habit does Mai promise to cut down on at the end of the conversation?", "options": ["A. Midnight smartphone browsing", "B. Eating fruits", "C. Reading English textbooks", "D. Drinking water"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'cut down on midnight smartphone browsing.'"},
    {"id": "u3-l6", "question": "Who is Dr. Robert?", "options": ["A. The school counselor", "B. A bus conductor", "C. A sports referee", "D. A mathematics teacher"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'Counselor Dr. Robert.'"},
    {"id": "u3-l7", "question": "What tool does Dr. Robert suggest for prioritizing tasks?", "options": ["A. A daily planner", "B. A calculator", "C. A stopwatch only", "D. A television screen"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'prioritize your tasks using a daily planner.'"},
    {"id": "u3-l8", "question": "How does adequate sleep benefit the brain according to the counselor?", "options": ["A. It keeps the brain refreshed and alert", "B. It makes people forget everything", "C. It causes headaches", "D. It reduces physical height"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'keep your brain refreshed.'"}
]

u3_listening_fibs = [
    {"id": "u3-f1", "sentenceWithBlank": "Teens should prioritize tasks using a daily _____.", "correctWord": "planner", "hint": "Sổ lên kế hoạch công việc"},
    {"id": "u3-f2", "sentenceWithBlank": "Break study sessions into twenty-five minute _____.", "correctWord": "intervals", "hint": "Các khoảng thời gian ngắn"},
    {"id": "u3-f3", "sentenceWithBlank": "The four-seven-eight _____ method relieves exam panic.", "correctWord": "breathing", "hint": "Kỹ thuật hít thở điều hòa"},
    {"id": "u3-f4", "sentenceWithBlank": "Students need to get eight hours of _____ each night.", "correctWord": "sleep", "hint": "Giấc ngủ nghỉ ngơi phục hồi"}
]

u3_speaking = [
    {"id": "u3-s1", "targetSentence": "Maintaining a balanced diet and exercising regularly are vital for teenagers' physical development.", "ipa": "/meɪnˈteɪnɪŋ ə ˈbælənst ˈdaɪət ænd ˈɛksəsaɪzɪŋ ˈrɛɡjʊləli ɑː ˈvaɪtl fɔː ˈtiːnˌeɪʤəz ˈfɪzɪkəl dɪˈvɛləpmənt/", "vietnameseMeaning": "Duy trì chế độ ăn uống cân bằng và tập thể dục đều đặn là điều thiết yếu cho sự phát triển thể chất của tuổi thiếu niên.", "contextSituation": "Khuyên các bạn cùng lớp xây dựng lối sống lành mạnh.", "keyPhonicsFocus": "Phát âm chuẩn tính từ 'vital' /ˈvaɪtl/ và trọng âm 'physical development'.", "sampleAudioText": "Maintaining a balanced diet and exercising regularly are vital for teenagers' physical development."},
    {"id": "u3-s2", "targetSentence": "If you practice mindfulness and deep breathing, you can manage your exam stress effectively.", "ipa": "/ɪf juː ˈpræktɪs ˈmaɪndfʊlnɪs ænd diːp ˈbriːðɪŋ juː kæn ˈmænɪʤ jɔːr ɪɡˈzæm strɛs ɪˈfɛktɪvli/", "vietnameseMeaning": "Nếu bạn thực hành chánh niệm và thở sâu, bạn có thể kiểm soát căng thẳng thi cử một cách hiệu quả.", "contextSituation": "Chia sẻ kinh nghiệm giảm căng thẳng phòng thi.", "keyPhonicsFocus": "Phát âm chuẩn âm /ð/ trong 'breathing' /ˈbriːðɪŋ/.", "sampleAudioText": "If you practice mindfulness and deep breathing, you can manage your exam stress effectively."},
    {"id": "u3-s3", "targetSentence": "Students should not stay up past midnight staring at computer screens or smartphones.", "ipa": "/ˈstjuːdnts ʃʊd nɒt steɪ ʌp pɑːst ˈmɪdnaɪt ˈsteərɪŋ æt kəmˈpjuːtə skriːnz ɔː ˈsmɑːtfəʊnz/", "vietnameseMeaning": "Học sinh không nên thức quá nửa đêm nhìn chằm chằm vào màn hình máy tính hay điện thoại thông minh.", "contextSituation": "Cảnh báo tác hại của việc thức khuya dùng điện thoại.", "keyPhonicsFocus": "Phát âm rõ ràng phụ âm đầu /st/ trong 'staring' và 'smartphones'.", "sampleAudioText": "Students should not stay up past midnight staring at computer screens or smartphones."},
    {"id": "u3-s4", "targetSentence": "Drinking plenty of fresh water throughout the day keeps our bodies energized and hydrated.", "ipa": "/ˈdrɪŋkɪŋ ˈplɛnti ɒv frɛʃ ˈwɔːtə θruːˈaʊt ðə deɪ kiːps ˈaʊə ˈbɒdiz ˈɛnəʤaɪzd ænd ˈhaɪdreɪtɪd/", "vietnameseMeaning": "Uống nhiều nước lọc trong suốt cả ngày giúp cơ thể tràn đầy sinh lực và đủ nước.", "contextSituation": "Nhắc nhở bạn bè thói quen uống nước.", "keyPhonicsFocus": "Phát âm chuẩn đuôi /dɪd/ trong 'hydrated' /ˈhaɪdreɪtɪd/.", "sampleAudioText": "Drinking plenty of fresh water throughout the day keeps our bodies energized and hydrated."},
    {"id": "u3-s5", "targetSentence": "Whenever you encounter difficult emotional dilemmas, seeking advice from school counselors is beneficial.", "ipa": "/wɛnˈɛvə juː ɪnˈkaʊntə ˈdɪfɪkəlt ɪˈməʊʃənl dɪˈlɛməz ˈsiːkɪŋ ədˈvaɪs frɒm skuːl ˈkaʊnsələz ɪz ˌbɛnɪˈfɪʃəl/", "vietnameseMeaning": "Bất cứ khi nào bạn gặp phải những khúc mắc tâm lý khó khăn, tìm kiếm lời khuyên từ chuyên gia tư vấn là rất có ích.", "contextSituation": "Khuyến khích tìm kiếm sự trợ giúp tâm lý học đường.", "keyPhonicsFocus": "Phát âm chuẩn từ 'dilemmas' /dɪˈlɛməz/ và 'beneficial'.", "sampleAudioText": "Whenever you encounter difficult emotional dilemmas, seeking advice from school counselors is beneficial."},
    {"id": "u3-s6", "targetSentence": "Cutting down on junk food and sugary soft drinks helps prevent diabetes and adolescent obesity.", "ipa": "/ˈkʌtɪŋ daʊn ɒn ʤʌŋk fuːd ænd ˈʃʊɡəri sɒft drɪŋks hɛlps prɪˈvɛnt ˌdaɪəˈbiːtiːz ænd ˌædəˈlɛsnt əʊˈbiːsɪti/", "vietnameseMeaning": "Cắt giảm đồ ăn vặt và nước ngọt có ga giúp phòng ngừa bệnh tiểu đường và béo phì tuổi học trò.", "contextSituation": "Nêu cao chế độ ăn uống lành mạnh.", "keyPhonicsFocus": "Phát âm chuẩn từ 'diabetes' /ˌdaɪəˈbiːtiːz/ và 'obesity'.", "sampleAudioText": "Cutting down on junk food and sugary soft drinks helps prevent diabetes and adolescent obesity."},
    {"id": "u3-s7", "targetSentence": "Taking short five-minute walking breaks during study hours prevents muscle stiffness and eye strain.", "ipa": "/ˈteɪkɪŋ ʃɔːt faɪv-ˈmɪnɪt ˈwɔːkɪŋ breɪks ˈdjʊərɪŋ ˈstʌdi ˈaʊəz prɪˈvɛnts ˈmʌsl ˈstɪfnɪs ænd aɪ streɪn/", "vietnameseMeaning": "Đi dạo nghỉ giải lao ngắn năm phút trong giờ học giúp ngăn ngừa đau mỏi cơ bắp và mỏi mắt.", "contextSituation": "Mẹo học tập thông minh bảo vệ sức khỏe.", "keyPhonicsFocus": "Phát âm chuẩn từ 'stiffness' /ˈstɪfnɪs/ và âm câm trong 'muscle' /ˈmʌsl/.", "sampleAudioText": "Taking short five-minute walking breaks during study hours prevents muscle stiffness and eye strain."},
    {"id": "u3-s8", "targetSentence": "An optimistic mindset enables students to face challenging academic competitions with self-confidence.", "ipa": "/ən ˌɒptɪˈmɪstɪk ˈmaɪndsɛt ɪˈneɪblz ˈstjuːdnts tuː feɪs ˈʧælɪnʤɪŋ ˌækəˈdɛmɪk ˌkɒmpɪˈtɪʃənz wɪð sɛlf-ˈkɒnfɪdəns/", "vietnameseMeaning": "Tư duy lạc quan giúp học sinh đối mặt với các kỳ thi học thuật đầy thử thách với sự tự tin.", "contextSituation": "Khích lệ tinh thần thi cử tích cực.", "keyPhonicsFocus": "Phát âm chuẩn từ 'optimistic' /ˌɒptɪˈmɪstɪk/ và 'competitions'.", "sampleAudioText": "An optimistic mindset enables students to face challenging academic competitions with self-confidence."},
    {"id": "u3-s9", "targetSentence": "Participating in team sports like basketball builds physical endurance and wonderful friendships.", "ipa": "/pɑːˈtɪsɪpeɪtɪŋ ɪn tiːm spɔːts laɪk ˈbɑːskɪtˌbɔːl bɪldz ˈfɪzɪkəl ɪnˈdjʊərəns ænd ˈwʌndəfʊl ˈfrɛndʃɪps/", "vietnameseMeaning": "Tham gia các môn thể thao đồng đội như bóng rổ rèn luyện sức bền thể lực và tình bạn tuyệt vời.", "contextSituation": "Nêu lợi ích của việc chơi thể thao cùng bạn bè.", "keyPhonicsFocus": "Phát âm chuẩn từ 'endurance' /ɪnˈdjʊərəns/ và 'friendships'.", "sampleAudioText": "Participating in team sports like basketball builds physical endurance and wonderful friendships."},
    {"id": "u3-s10", "targetSentence": "Teens must learn how to say no politely when facing negative peer pressure.", "ipa": "/tiːnz mʌst lɜːn haʊ tuː seɪ nəʊ pəˈlaɪtli wɛn ˈfeɪsɪŋ ˈnɛɡətɪv pɪə ˈprɛʃə/", "vietnameseMeaning": "Các bạn trẻ cần học cách từ chối lịch sự khi đối mặt với áp lực tiêu cực từ bạn bè bè phái.", "contextSituation": "Rèn luyện kỹ năng sống độc lập và kiên định.", "keyPhonicsFocus": "Phát âm chuẩn trạng từ 'politely' /pəˈlaɪtli/ và 'negative'.", "sampleAudioText": "Teens must learn how to say no politely when facing negative peer pressure."},
    {"id": "u3-s11", "targetSentence": "Adequate sleep empowers our immune system to combat viral infections and seasonal illnesses.", "ipa": "/ˈædɪkwət sliːp ɪmˈpaʊəz ˈaʊər ɪˈmjuːn ˈsɪstɪm tuː ˈkɒmbæt ˈvaɪrəl ɪnˈfɛkʃənz ænd ˈsiːznl ˈɪlnɪsɪz/", "vietnameseMeaning": "Ngủ đủ giấc trao cho hệ miễn dịch sức mạnh chống lại nhiễm virus và các bệnh ốm vặt theo mùa.", "contextSituation": "Giải thích cơ chế miễn dịch của giấc ngủ.", "keyPhonicsFocus": "Phát âm chuẩn từ 'adequate' /ˈædɪkwət/ và 'empowers'.", "sampleAudioText": "Adequate sleep empowers our immune system to combat viral infections and seasonal illnesses."},
    {"id": "u3-s12", "targetSentence": "Allocating twenty minutes daily for outdoor cycling significantly improves cardiovascular performance.", "ipa": "/ˈæləkeɪtɪŋ ˈtwɛnti ˈmɪnɪts ˈdeɪli fɔːr ˈaʊtdɔː ˈsaɪklɪŋ sɪɡˈnɪfɪkəntli ɪmˈpruːvz ˌkɑːdɪəʊˈvæskjʊlə pəˈfɔːməns/", "vietnameseMeaning": "Dành 20 phút mỗi ngày để đạp xe ngoài trời cải thiện rõ rệt chức năng tim mạch.", "contextSituation": "Khuyến khích hoạt động thể chất ngoài trời.", "keyPhonicsFocus": "Phát âm chuẩn từ 'cardiovascular' /ˌkɑːdɪəʊˈvæskjʊlə/.", "sampleAudioText": "Allocating twenty minutes daily for outdoor cycling significantly improves cardiovascular performance."},
    {"id": "u3-s13", "targetSentence": "Eating fresh fruits and raw vegetables provides dietary fiber and vital micronutrients.", "ipa": "/ˈiːtɪŋ frɛʃ fruːts ænd rɔː ˈvɛʤtəblz prəˈvaɪdz ˈdaɪətəri ˈfaɪbə ænd ˈvaɪtl ˈmaɪkrəʊˌnjuːtrɪənts/", "vietnameseMeaning": "Ăn hoa quả tươi và rau củ cung cấp chất xơ và các vi chất dinh dưỡng thiết yếu.", "contextSituation": "Thuyết trình về tháp dinh dưỡng học đường.", "keyPhonicsFocus": "Phát âm chuẩn từ 'vegetables' /ˈvɛʤtəblz/ và 'micronutrients'.", "sampleAudioText": "Eating fresh fruits and raw vegetables provides dietary fiber and vital micronutrients."},
    {"id": "u3-s14", "targetSentence": "If you schedule your revision plan early, you won't suffer from last-minute exam anxiety.", "ipa": "/ɪf juː ˈʃɛdjuːl jɔː rɪˈvɪʒən plæn ˈɜːli juː wəʊnt ˈsʌfə frɒm lɑːst-ˈmɪnɪt ɪɡˈzæm æŋˈzaɪəti/", "vietnameseMeaning": "Nếu bạn lên lịch ôn tập từ sớm, bạn sẽ không bị hoảng loạn thi cử vào phút chót.", "contextSituation": "Khuyên bạn lập kế hoạch ôn thi lớp 10.", "keyPhonicsFocus": "Phát âm chuẩn từ 'schedule' /ˈʃɛdjuːl/ và 'anxiety'.", "sampleAudioText": "If you schedule your revision plan early, you won't suffer from last-minute exam anxiety."},
    {"id": "u3-s15", "targetSentence": "Meditation and yoga help calm the nervous system after demanding school days.", "ipa": "/ˌmɛdɪˈteɪʃən ænd ˈjəʊɡə hɛlp kɑːm ðə ˈnɜːvəs ˈsɪstɪm ˈɑːftə dɪˈmɑːndɪŋ skuːl deɪz/", "vietnameseMeaning": "Thiền định và yoga giúp làm dịu hệ thần kinh sau những ngày học căng thẳng.", "contextSituation": "Gợi ý các phương pháp thư giãn lành mạnh.", "keyPhonicsFocus": "Phát âm chuẩn từ 'meditation' /ˌmɛdɪˈteɪʃən/ và 'nervous'.", "sampleAudioText": "Meditation and yoga help calm the nervous system after demanding school days."},
    {"id": "u3-s16", "targetSentence": "We ought to support our classmates whenever they face psychological distress.", "ipa": "/wiː ɔːt tuː səˈpɔːt ˈaʊə ˈklɑːsmeɪts wɛnˈɛvə ðeɪ feɪs ˌsaɪkəˈlɒʤɪkəl dɪsˈtrɛs/", "vietnameseMeaning": "Chúng ta nên đồng hành hỗ trợ bạn bè cùng lớp mỗi khi họ gặp phải bất ổn tâm lý.", "contextSituation": "Nêu cao tình bạn và sự đồng cảm học đường.", "keyPhonicsFocus": "Phát âm chuẩn từ 'psychological' /ˌsaɪkəˈlɒʤɪkəl/.", "sampleAudioText": "We ought to support our classmates whenever they face psychological distress."},
    {"id": "u3-s17", "targetSentence": "Reducing processed sugar intake protects dental enamel and stabilizes daily mood.", "ipa": "/rɪˈdjuːsɪŋ ˈprəʊsɛst ˈʃʊɡər ˈɪnteɪk prəˈtɛkts ˈdɛntl ɪˈnæməl ænd ˈsteɪbɪlaɪzɪz ˈdeɪli muːd/", "vietnameseMeaning": "Giảm lượng đường chế biến giúp bảo vệ men răng và ổn định tâm trạng hàng ngày.", "contextSituation": "Nói về lợi ích của việc giảm đồ ngọt.", "keyPhonicsFocus": "Phát âm chuẩn từ 'enamel' /ɪˈnæməl/ và 'stabilizes'.", "sampleAudioText": "Reducing processed sugar intake protects dental enamel and stabilizes daily mood."},
    {"id": "u3-s18", "targetSentence": "Regular physical stretching enhances joint flexibility and corrects slouching postures.", "ipa": "/ˈrɛɡjʊlə ˈfɪzɪkəl ˈstrɛʧɪŋ ɪnˈhɑːnsɪz ʤɔɪnt ˌflɛksəˈbɪlɪti ænd kəˈrɛkts ˈslaʊʧɪŋ ˈpɒsʧəz/", "vietnameseMeaning": "Kéo giãn cơ thể đều đặn giúp tăng độ dẻo dai của khớp xương và điều chỉnh tư thế ngồi gù lưng.", "contextSituation": "Lời khuyên khắc phục tật gù lưng học đường.", "keyPhonicsFocus": "Phát âm chuẩn từ 'flexibility' /ˌflɛksəˈbɪlɪti/ và 'postures'.", "sampleAudioText": "Regular physical stretching enhances joint flexibility and corrects slouching postures."},
    {"id": "u3-s19", "targetSentence": "Spending weekends outdoors in nature revitalizes creative inspiration and mental clarity.", "ipa": "/ˈspɛndɪŋ ˈwiːkɛndz ˌaʊtˈdɔːz ɪn ˈneɪʧə ˌriːˈvaɪtəlaɪzɪz kriːˈeɪtɪv ˌɪnspəˈreɪʃən ænd ˈmɛntl ˈklærɪti/", "vietnameseMeaning": "Dành những ngày cuối tuần hòa mình vào thiên nhiên giúp hồi sinh cảm hứng sáng tạo và sự minh mẫn.", "contextSituation": "Khuyên bạn trẻ thư giãn với thiên nhiên.", "keyPhonicsFocus": "Phát âm chuẩn động từ 'revitalizes' /ˌriːˈvaɪtəlaɪzɪz/.", "sampleAudioText": "Spending weekends outdoors in nature revitalizes creative inspiration and mental clarity."},
    {"id": "u3-s20", "targetSentence": "True healthy living is a harmonious harmony of physical fitness, nutritious fuel, and emotional peace.", "ipa": "/truː ˈhɛlθi ˈlɪvɪŋ ɪz ə hɑːˈməʊniəs ˈhɑːməni ɒv ˈfɪzɪkəl ˈfɪtnɪs njuːˈtrɪʃəs fjʊəl ænd ɪˈməʊʃənl piːs/", "vietnameseMeaning": "Lối sống lành mạnh thực sự là sự hòa quyện hài hòa giữa thể lực, dinh dưỡng đủ chất và sự bình an trong tâm hồn.", "contextSituation": "Kết luận về định nghĩa lối sống toàn diện.", "keyPhonicsFocus": "Phát âm chuẩn tính từ 'nutritious' /njuːˈtrɪʃəs/ và 'harmonious'.", "sampleAudioText": "True healthy living is a harmonious harmony of physical fitness, nutritious fuel, and emotional peace."}
]

u3_reading_info = {
    "title": "Nuôi Dưỡng Thân Tâm: Cẩm Nang Sống Khỏe Toàn Diện Cho Tuổi Thiếu Niên",
    "topic": "Sức khỏe thể chất & Quản lý cảm xúc lứa tuổi dậy thì",
    "passageText": "The adolescent years represent a dynamic phase of accelerated physical growth, cognitive maturation, and emotional discovery. However, contemporary teenagers confront multifaceted pressures: rigorous academic expectations, digital connectivity overload, and sedentary indoor routines. Establishing holistic wellness habits during this developmental window is essential for lifelong vitality.\n\nFirst and foremost, biological restoration hinges upon consistent, deep sleep. Neuroscientific research confirms that during stages of slow-wave sleep, the adolescent brain consolidates acquired knowledge, flushes out metabolic toxins, and regulates mood-balancing neurotransmitters. Health authorities urge adolescents to secure eight to nine hours of undisturbed sleep every night by establishing screen-free bedrooms before lights out.\n\nEqually important is nutritional mindfulness. Diets laden with refined carbohydrates and carbonated energy drinks trigger rapid glycemic spikes followed by precipitous energy crashes, intensifying mood swings and brain fog. Conversely, wholesome meals comprising colorful vegetables, lean proteins, and complex whole grains fuel sustained cognitive focus.\n\nFinally, physical movement serves as a potent natural antidote to anxiety. Engaging in moderate cardiovascular exercise triggers the release of endorphins—the body's natural mood elevators. When teenagers balance nutritious eating, adequate rest, and joyful movement, they build resilient foundations to thrive in school and beyond.",
    "keyVocabularyHighlights": [
        {"word": "accelerated maturation", "meaning": "sự trưởng thành và phát triển thể chất vượt bậc"},
        {"word": "neuroscientific research", "meaning": "nghiên cứu khoa học thần kinh"},
        {"word": "natural mood elevators", "meaning": "chất kích thích nâng cao tâm trạng tự nhiên (endorphin)"},
        {"word": "resilient foundations", "meaning": "nền tảng vững chắc và dẻo dai cho tương lai"}
    ]
}

u3_reading_qs = [
    {"id": "u3-r1", "question": "What multifaceted pressures do contemporary teenagers confront according to paragraph 1?", "options": ["A. Lack of school books", "B. Rigorous academic expectations, digital overload, and sedentary routines", "C. Extreme cold weather all year round", "D. Too much outdoor farming"], "correctAnswerIndex": 1, "explanation": "Trong đoạn 1: 'rigorous academic expectations, digital connectivity overload, and sedentary indoor routines.'"},
    {"id": "u3-r2", "question": "What critical biological processes occur in the adolescent brain during slow-wave sleep?", "options": ["A. Knowledge consolidation, toxin elimination, and mood regulation", "B. Loss of all memories", "C. Immediate tooth growth", "D. Cessation of all blood flow"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'consolidates acquired knowledge, flushes out metabolic toxins, and regulates mood-balancing neurotransmitters.'"},
    {"id": "u3-r3", "question": "How many hours of sleep do health authorities recommend for adolescents per night?", "options": ["A. 4 to 5 hours", "B. 8 to 9 hours", "C. 12 to 14 hours", "D. Only 2 hours"], "correctAnswerIndex": 1, "explanation": "Trong đoạn 2: 'secure eight to nine hours of undisturbed sleep every night.'"},
    {"id": "u3-r4", "question": "Why is establishing a screen-free bedroom before bedtime recommended?", "options": ["A. To ensure undisturbed and restorative sleep", "B. To save batteries only", "C. To stop electricity bills", "D. To clean the floor"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'establishing screen-free bedrooms before lights out.'"},
    {"id": "u3-r5", "question": "What is the consequence of consuming diets high in refined carbs and sugary energy drinks?", "options": ["A. Rapid glycemic spikes followed by energy crashes and brain fog", "B. Improved mathematical memory", "C. Better night vision", "D. Permanent calm feelings"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'trigger rapid glycemic spikes followed by precipitous energy crashes, intensifying mood swings and brain fog.'"},
    {"id": "u3-r6", "question": "Which food group is highlighted as fueling sustained cognitive focus?", "options": ["A. Greasy deep-fried sausages", "B. Colorful vegetables, lean proteins, and complex whole grains", "C. Pure sugar candies", "D. Ice cream cups"], "correctAnswerIndex": 1, "explanation": "Trong đoạn 3: 'wholesome meals comprising colorful vegetables, lean proteins, and complex whole grains.'"},
    {"id": "u3-r7", "question": "What natural chemicals does cardiovascular exercise release to elevate mood?", "options": ["A. Endorphins", "B. Carbon dioxide", "C. Lactic acid only", "D. Excess sodium"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 4: 'triggers the release of endorphins—the body's natural mood elevators.'"},
    {"id": "u3-r8", "question": "Which word in paragraph 4 is closest in meaning to 'antidote'?", "options": ["A. A remedy or counteracting cure", "B. A poisonous substance", "C. A heavy obstacle", "D. A mathematical problem"], "correctAnswerIndex": 0, "explanation": "'Antidote' mang nghĩa phương thuốc giải hoặc giải pháp hóa giải hữu hiệu."},
    {"id": "u3-r9", "question": "Which word in paragraph 2 is closest in meaning to 'consolidates'?", "options": ["A. Strengthens and solidifies", "B. Erases", "C. Forgets", "D. Breaks down"], "correctAnswerIndex": 0, "explanation": "'Consolidates knowledge' có nghĩa là củng cố và khắc sâu kiến thức vào trí nhớ dài hạn."},
    {"id": "u3-r10", "question": "What is the overarching conclusion of the reading passage?", "options": ["A. Balancing nutrition, adequate rest, and movement builds resilient foundations for teens", "B. Students should never take exams", "C. Exercise is only for professional athletes", "D. Fast food has no effect on health"], "correctAnswerIndex": 0, "explanation": "Đoạn cuối nhấn mạnh: 'When teenagers balance nutritious eating, adequate rest, and joyful movement, they build resilient foundations to thrive.'"}
]

u3_writing_prompts = [
    {
        "id": "u3-w1",
        "title": "Đề 1: Write a paragraph giving advice on how to maintain a healthy lifestyle (60-80 words)",
        "description": "Viết một đoạn văn đưa ra các lời khuyên thiết thực giúp các bạn tuổi teen duy trì lối sống lành mạnh (ăn uống, vận động, ngủ nghỉ).",
        "suggestedOutline": [
            "Introduction: State the importance of a healthy lifestyle for teenagers.",
            "Body: Give 2-3 specific tips (balanced diet, daily sports, 8 hours of sleep).",
            "Conclusion: State the long-term benefits for body and mind."
        ],
        "usefulPhrases": [
            "Maintaining a healthy lifestyle is vital for every teenager's growth...",
            "First, we should eat a balanced diet with plenty of green vegetables...",
            "Second, teens ought to get at least eight hours of sleep every night...",
            "By following these habits, we can stay energized and perform well in school."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Maintaining a healthy lifestyle is vital for every teenager's physical and mental development. First, we should follow a balanced diet by eating plenty of fresh vegetables, fruits, and lean proteins while cutting down on sugary fast food. Second, teenagers ought to engage in daily physical exercise, such as jogging or badminton, for at least thirty minutes. Finally, securing eight hours of restful sleep every night keeps our minds sharp and refreshed."
    },
    {
        "id": "u3-w2",
        "title": "Đề 2: Write a paragraph suggesting ways to manage exam stress effectively (60-80 words)",
        "description": "Viết một đoạn văn đề xuất các biện pháp giúp học sinh kiểm soát và vượt qua áp lực thi cử.",
        "suggestedOutline": [
            "Introduction: Acknowledge that exam stress is common among Grade 9 students.",
            "Body: Suggest 2 practical techniques (making a study timetable, practicing deep breathing or taking short breaks).",
            "Conclusion: Reiterate that keeping a positive mindset leads to exam success."
        ],
        "usefulPhrases": [
            "Exam stress is a frequent challenge faced by Grade 9 students...",
            "To overcome this, students should organize a clear daily study schedule...",
            "Moreover, practicing deep breathing exercises helps calm nerves...",
            "Staying optimistic and well-prepared will ensure high exam scores."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Exam pressure is a common challenge for Grade 9 students preparing for high school entrance exams. To manage stress effectively, students should create a structured study timetable to avoid last-minute cramming. Additionally, taking short five-minute walking breaks and practicing deep breathing techniques help relax the brain. Talking openly with parents or school counselors also relieves psychological anxiety. Maintaining an optimistic mindset is key to achieving exam triumph."
    },
    {
        "id": "u3-w3",
        "title": "Đề 3: Write a paragraph about the harmful effects of excessive screen time (60-80 words)",
        "description": "Viết một đoạn văn nêu tác hại của việc lạm dụng điện thoại, máy tính và đề xuất cách hạn chế.",
        "suggestedOutline": [
            "Introduction: Introduce the problem of excessive screen time among adolescents.",
            "Body: Explain consequences (eye strain, insomnia, poor concentration) and give a solution.",
            "Conclusion: Conclude that balancing screen time promotes real-world connections."
        ],
        "usefulPhrases": [
            "Spending too much screen time on smartphones leads to severe health issues...",
            "First, blue light emitted from screens causes eye strain and chronic insomnia...",
            "Second, it encourages a sedentary lifestyle and impairs academic focus...",
            "Therefore, teens should limit entertainment screen time to one hour daily."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Excessive screen time on smartphones and tablets poses serious risks to adolescents' well-being. First, prolonged exposure to blue light causes acute eye strain and triggers chronic insomnia. Second, sitting for hours playing online video games leads to a sedentary lifestyle and poor posture. To combat this, teenagers should limit entertainment screen use to one hour daily and participate in outdoor sports with friends to enrich real-life experiences."
    },
    {
        "id": "u3-w4",
        "title": "Đề 4: Write a paragraph about your favorite sport and its health benefits (60-80 words)",
        "description": "Viết một đoạn văn giới thiệu môn thể thao yêu thích của em và những lợi ích sức khỏe mà nó mang lại.",
        "suggestedOutline": [
            "Introduction: Name your favorite sport and how often you play it.",
            "Body: Describe the physical benefits (improving stamina, agility) and mental benefits (relieving tension).",
            "Conclusion: Encourage classmates to take up this sport."
        ],
        "usefulPhrases": [
            "My favorite sport is swimming, which I practice three times a week...",
            "It offers comprehensive health benefits, such as strengthening cardiovascular fitness...",
            "In addition, gliding through cool water helps me wash away all school stress...",
            "I highly recommend swimming to anyone looking to stay fit and refreshed."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "My favorite sport is badminton, which I play three times a week with my classmates. This fast-paced sport provides excellent cardiovascular exercise, enhances eye-hand coordination, and improves body flexibility. Moreover, running and smashing the shuttlecock helps me release school stress and recharge positive energy. Playing badminton also fosters wonderful teamwork and camaraderie. I encourage all teenagers to practice badminton regularly to maintain superb physical fitness."
    },
    {
        "id": "u3-w5",
        "title": "Đề 5: Write a paragraph about the importance of a nutritious breakfast (60-80 words)",
        "description": "Viết một đoạn văn giải thích lý do tại sao học sinh không bao giờ nên bỏ bữa sáng.",
        "suggestedOutline": [
            "Introduction: State that breakfast is the most essential meal of the day.",
            "Body: Explain how breakfast fuels the brain with energy, boosts memory, and prevents fatigue.",
            "Conclusion: Recommend healthy breakfast options (eggs, oatmeal, whole milk)."
        ],
        "usefulPhrases": [
            "Breakfast is undoubtedly the most important meal of the day for teenagers...",
            "After a long night of sleep, a nutritious breakfast supplies essential glucose...",
            "Skipping breakfast causes fatigue, dizziness, and decreased concentration in class...",
            "Therefore, students must always eat a balanced breakfast before heading to school."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Breakfast is undoubtedly the most crucial meal of the day for growing teenagers. After eight hours of overnight fasting, a nutritious breakfast provides vital glucose to energize the brain and enhance classroom concentration. Students who skip breakfast often experience morning fatigue, stomach aches, and poor academic performance. Eating a wholesome breakfast with whole-grain bread, boiled eggs, and fresh milk sets a productive tone for a successful school day."
    }
]

unit3 = make_unit(3, "Unit 3: Healthy Living for Teens", "Sống khỏe & Cân bằng cảm xúc tuổi thiếu niên", "Khám phá thói quen sinh hoạt lành mạnh, quản lý căng thẳng, động từ khuyết thiếu (Must, Should, Have to) và câu điều kiện loại 1.", "Ngữ âm: Trọng âm của từ có 3 âm tiết trở lên và ngữ điệu câu điều kiện", "Heart", u3_vocab, u3_grammar_info, u3_grammar_exs, u3_listening_info, u3_listening_qs, u3_listening_fibs, u3_speaking, u3_reading_info, u3_reading_qs, u3_writing_prompts)
write_ts_unit(3, unit3)
print("Unit 3 generated successfully!")
