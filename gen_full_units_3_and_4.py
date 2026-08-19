import json
from gen_unit_utils import make_unit, write_ts_unit

# ==============================================================================
# UNIT 3: HEALTHY LIVING FOR TEENS (20 Vocab, 20 Grammar, 8 Listening MC + 4 FIB, 20 Speaking, 10 Reading, 5 Writing)
# ==============================================================================
u3_vocab = [
    {"id": "u3-v1", "word": "balanced diet", "phonetic": "/ˌbælənst ˈdaɪət/", "partOfSpeech": "noun", "vietnameseMeaning": "chế độ ăn uống cân đối, đủ chất", "englishExample": "Eating a balanced diet with colorful vegetables gives teenagers boundless vitality.", "vietnameseExample": "Ăn một chế độ dinh dưỡng cân đối với nhiều rau củ đủ màu sắc mang lại cho thanh thiếu niên nguồn sinh lực dồi dào."},
    {"id": "u3-v2", "word": "physical exercise", "phonetic": "/ˈfɪzɪkəl ˈɛksəsaɪz/", "partOfSpeech": "noun", "vietnameseMeaning": "hoạt động thể dục rèn luyện thể chất", "englishExample": "Thirty minutes of daily physical exercise strengthens muscles and enhances cardiovascular health.", "vietnameseExample": "Ba mươi phút tập thể dục thể chất hàng ngày giúp tăng cường cơ bắp và nâng cao sức khỏe tim mạch."},
    {"id": "u3-v3", "word": "manage stress", "phonetic": "/ˈmænɪʤ strɛs/", "partOfSpeech": "phrase", "vietnameseMeaning": "kiểm soát và giải tỏa áp lực, căng thẳng", "englishExample": "Listening to instrumental melodies helps students manage stress during exam periods.", "vietnameseExample": "Nghe những giai điệu không lời giúp học sinh giải tỏa căng thẳng trong các kỳ thi."},
    {"id": "u3-v4", "word": "screen time", "phonetic": "/skriːn taɪm/", "partOfSpeech": "noun", "vietnameseMeaning": "thời gian sử dụng màn hình điện tử", "englishExample": "Doctors recommend reducing recreational screen time before bedtime to ensure deep sleep.", "vietnameseExample": "Bác sĩ khuyến nghị giảm thời gian xem màn hình điện tử giải trí trước khi ngủ để đảm bảo giấc ngủ sâu."},
    {"id": "u3-v5", "word": "stay hydrated", "phonetic": "/steɪ haɪˈdreɪtɪd/", "partOfSpeech": "phrase", "vietnameseMeaning": "uống đủ nước cho cơ thể", "englishExample": "Remember to stay hydrated by drinking at least two liters of pure water daily.", "vietnameseExample": "Hãy nhớ giữ đủ nước cho cơ thể bằng cách uống ít nhất hai lít nước lọc mỗi ngày."},
    {"id": "u3-v6", "word": "nutritious", "phonetic": "/njuːˈtrɪʃəs/", "partOfSpeech": "adjective", "vietnameseMeaning": "bổ dưỡng, giàu chất dinh dưỡng", "englishExample": "Fresh fruits, whole grains, and nuts are nutritious snacks for active teens.", "vietnameseExample": "Trái cây tươi, ngũ cốc nguyên cám và các loại hạt là đồ ăn nhẹ bổ dưỡng cho thanh thiếu niên năng động."},
    {"id": "u3-v7", "word": "mental well-being", "phonetic": "/ˈmɛntl wɛl-ˈbiːɪŋ/", "partOfSpeech": "noun", "vietnameseMeaning": "sức khỏe tinh thần, sự an lạc tâm trí", "englishExample": "Outdoor nature walks contribute immensely to improving teenagers' mental well-being.", "vietnameseExample": "Những buổi đi dạo ngoài thiên nhiên đóng góp to lớn vào việc cải thiện sức khỏe tinh thần của giới trẻ."},
    {"id": "u3-v8", "word": "sleep hygiene", "phonetic": "/sliːp ˈhaɪʤiːn/", "partOfSpeech": "noun", "vietnameseMeaning": "thói quen ngủ khoa học, vệ sinh giấc ngủ", "englishExample": "Maintaining consistent sleep hygiene by going to bed at 10 PM sharp prevents chronic fatigue.", "vietnameseExample": "Duy trì thói quen ngủ khoa học bằng cách đi ngủ đúng 10 giờ tối giúp ngăn ngừa chứng mệt mỏi kinh niên."},
    {"id": "u3-v9", "word": "counselor", "phonetic": "/ˈkaʊnsələ/", "partOfSpeech": "noun", "vietnameseMeaning": "chuyên gia tư vấn tâm lý học đường", "englishExample": "Students can talk openly with the school psychological counselor whenever feeling overwhelmed.", "vietnameseExample": "Học sinh có thể trò chuyện cởi mở với chuyên gia tư vấn tâm lý học đường bất cứ khi nào cảm thấy quá tải."},
    {"id": "u3-v10", "word": "junk food", "phonetic": "/ʤʌŋk fuːd/", "partOfSpeech": "noun", "vietnameseMeaning": "thức ăn nhanh, đồ ăn vặt có hại", "englishExample": "Limiting processed junk food protects teenagers against juvenile obesity and acne.", "vietnameseExample": "Hạn chế đồ ăn vặt chế biến sẵn bảo vệ thanh thiếu niên khỏi béo phì tuổi dậy thì và mụn trứng cá."},
    {"id": "u3-v11", "word": "optimistic", "phonetic": "/ˌɒptɪˈmɪstɪk/", "partOfSpeech": "adjective", "vietnameseMeaning": "lạc quan, yêu đời", "englishExample": "An optimistic attitude enables teenagers to turn academic challenges into learning milestones.", "vietnameseExample": "Thái độ lạc quan giúp thanh thiếu niên biến các thử thách học tập thành những cột mốc tiến bộ."},
    {"id": "u3-v12", "word": "overcome anxiety", "phonetic": "/ˌəʊvəˈkʌm æŋˈzaɪəti/", "partOfSpeech": "phrase", "vietnameseMeaning": "vượt qua cảm giác lo âu, bồn chồn", "englishExample": "Deep breathing exercises assist students in overcoming anxiety before stage presentations.", "vietnameseExample": "Các bài tập hít thở sâu giúp học sinh vượt qua sự lo âu trước những bài thuyết trình trên sân khấu."},
    {"id": "u3-v13", "word": "immune system", "phonetic": "/ɪˈmjuːn ˈsɪstɪm/", "partOfSpeech": "noun", "vietnameseMeaning": "hệ miễn dịch", "englishExample": "Consuming citrus fruits rich in Vitamin C fortifies your immune system against seasonal flu.", "vietnameseExample": "Ăn các loại quả có múi giàu Vitamin C củng cố hệ miễn dịch của bạn chống lại cảm cúm theo mùa."},
    {"id": "u3-v14", "word": "routine", "phonetic": "/ruːˈtiːn/", "partOfSpeech": "noun", "vietnameseMeaning": "thói quen, lịch trình sinh hoạt đều đặn", "englishExample": "A structured morning routine establishes focus and positive energy for the entire study day.", "vietnameseExample": "Một thói quen sinh hoạt buổi sáng nề nếp tạo lập sự tập trung và năng lượng tích cực cho cả ngày học tập."},
    {"id": "u3-v15", "word": "endurance", "phonetic": "/ɪnˈdjʊərəns/", "partOfSpeech": "noun", "vietnameseMeaning": "sức bền, độ dẻo dai", "englishExample": "Long-distance swimming trains stamina and muscular endurance remarkably well.", "vietnameseExample": "Bơi lội đường dài rèn luyện thể lực và sức bền cơ bắp vô cùng hiệu quả."},
    {"id": "u3-v16", "word": "recharge", "phonetic": "/ˌriːˈʧɑːʤ/", "partOfSpeech": "verb", "vietnameseMeaning": "nạp lại năng lượng, phục hồi sức lực", "englishExample": "Spending weekend afternoons reading in a quiet garden allows teenagers to recharge fully.", "vietnameseExample": "Dành những buổi chiều cuối tuần đọc sách trong khu vườn yên tĩnh giúp các bạn trẻ nạp lại năng lượng trọn vẹn."},
    {"id": "u3-v17", "word": "calorie intake", "phonetic": "/ˈkæləri ˈɪnteɪk/", "partOfSpeech": "noun", "vietnameseMeaning": "lượng calo nạp vào cơ thể", "englishExample": "Balancing daily calorie intake with athletic activity maintains an ideal body weight.", "vietnameseExample": "Cân đối lượng calo nạp vào hàng ngày với hoạt động thể thao giúp duy trì cân nặng lý tưởng."},
    {"id": "u3-v18", "word": "meditation", "phonetic": "/ˌmɛdɪˈteɪʃən/", "partOfSpeech": "noun", "vietnameseMeaning": "thiền định, tĩnh tâm", "englishExample": "Ten minutes of mindful meditation each evening calms nervous racing thoughts.", "vietnameseExample": "Mười phút thiền chánh niệm mỗi tối làm dịu đi những suy nghĩ dồn dập căng thẳng."},
    {"id": "u3-v19", "word": "peer pressure", "phonetic": "/pɪə ˈprɛʃə/", "partOfSpeech": "noun", "vietnameseMeaning": "áp lực đồng trang lứa", "englishExample": "Confident adolescents know how to resist negative peer pressure gracefully.", "vietnameseExample": "Những thiếu niên tự tin biết cách từ chối áp lực đồng trang lứa tiêu cực một cách khéo léo."},
    {"id": "u3-v20", "word": "vitality", "phonetic": "/vaɪˈtælɪti/", "partOfSpeech": "noun", "vietnameseMeaning": "sức sống căng tràn, sinh lực", "englishExample": "Regular exercise and laughter fill youth with radiant vitality and self-assurance.", "vietnameseExample": "Tập thể dục đều đặn và tiếng cười lấp đầy tuổi trẻ bằng sức sống rạng rỡ và sự tự tin."}
]

u3_grammar_info = {
    "title": "Động Từ Khuyết Thiếu Chỉ Lời Khuyên & Nghĩa Vụ (Modal Verbs: Should, Ought to, Must, Have to)",
    "summary": "Nắm vững cách sử dụng động từ khuyết thiếu: Should / Ought to (khuyên nên làm gì), Must (bắt buộc theo quy định nội tại), Have to (bắt buộc theo hoàn cảnh bên ngoài) và Mustn't (cấm đoán).",
    "formulaBox": [
        "Khuyên nhủ: S + should / ought to + V-bare (phủ định: should not / shouldn't / ought not to)",
        "Ví dụ: Teenagers SHOULD sleep at least 8 hours each night.",
        "Bắt buộc: S + must / have to + V-bare (phủ định: don't have to = không cần thiết; mustn't = cấm)",
        "Ví dụ: You MUST NOT skip breakfast before morning classes.",
        "Ví dụ: You DON'T HAVE TO go to school on Sundays."
    ],
    "usagePoints": [
        {"title": "1. Khuyên nhủ nhẹ nhàng vs Khuyên mạnh mẽ", "detail": "Dùng 'should' và 'ought to' cho lời khuyên chân thành, mang tính xây dựng cho sức khỏe.", "example": "You ought to drink more warm water and reduce sugar intake."},
        {"title": "2. Phân biệt Mustn't và Don't have to", "detail": "'Mustn't' diễn tả sự cấm đoán tuyệt đối, còn 'don't have to' diễn tả hành động không bắt buộc phải làm.", "example": "You mustn't stay up past midnight browsing social media."}
    ]
}

u3_grammar_exs = [
    {"id": "u3-g1", "question": "Teenagers _____ get at least eight hours of sound sleep every night to stay alert.", "options": ["A. should", "B. shouldn't", "C. mustn't", "D. might not"], "correctAnswer": "A. should", "explanation": "'should get' diễn tả lời khuyên nên ngủ đủ 8 tiếng."},
    {"id": "u3-g2", "question": "You _____ drink sugary bubble tea every afternoon if you want to prevent weight gain.", "options": ["A. ought not to", "B. have to", "C. must", "D. should"], "correctAnswer": "A. ought not to", "explanation": "'ought not to drink' = không nên uống trà sữa nhiều đường."},
    {"id": "u3-g3", "question": "Students _____ cheat or look at other papers during mid-term examination sessions.", "options": ["A. mustn't", "B. don't have to", "C. should", "D. ought to"], "correctAnswer": "A. mustn't", "explanation": "'mustn't' diễn tả sự cấm đoán tuyệt đối trong phòng thi."},
    {"id": "u3-g4", "question": "Tomorrow is Sunday, so we _____ wake up early at 5:30 AM.", "options": ["A. don't have to", "B. mustn't", "C. must", "D. should"], "correctAnswer": "A. don't have to", "explanation": "'don't have to' = không cần thiết phải dậy sớm vào Chủ nhật."},
    {"id": "u3-g5", "question": "You _____ consult a school psychologist if you feel overwhelmed by academic stress.", "options": ["A. should", "B. shouldn't", "C. mustn't", "D. haven't to"], "correctAnswer": "A. should", "explanation": "'should consult' = nên tham vấn ý kiến chuyên gia tâm lý."},
    {"id": "u3-g6", "question": "Athletes _____ drink sufficient water before, during, and after endurance training.", "options": ["A. must", "B. shouldn't", "C. mustn't", "D. ought not to"], "correctAnswer": "A. must", "explanation": "'must drink' nhấn mạnh sự cần thiết bắt buộc để tránh mất nước."},
    {"id": "u3-g7", "question": "We _____ consume expired canned foods under any circumstances.", "options": ["A. mustn't", "B. don't have to", "C. should", "D. ought to"], "correctAnswer": "A. mustn't", "explanation": "'mustn't consume' = tuyệt đối không được ăn đồ hết hạn."},
    {"id": "u3-g8", "question": "You _____ to exercise regularly if you want to build strong muscles.", "options": ["A. ought", "B. should", "C. must", "D. have"], "correctAnswer": "A. ought", "explanation": "Đi kèm với 'to exercise' chỉ có 'ought to'."},
    {"id": "u3-g9", "question": "He _____ take his prescribed allergy medicine before going into the botanical garden.", "options": ["A. has to", "B. doesn't have to", "C. mustn't", "D. ought not to"], "correctAnswer": "A. has to", "explanation": "'has to take' = bắt buộc phải uống thuốc theo đơn bác sĩ."},
    {"id": "u3-g10", "question": "Teens _____ spend more than two hours glued to digital smartphone screens each day.", "options": ["A. shouldn't", "B. must", "C. have to", "D. ought to"], "correctAnswer": "A. shouldn't", "explanation": "'shouldn't spend' = không nên dành quá 2 tiếng xem điện thoại."},
    {"id": "u3-g11", "question": "You _____ wash your hands thoroughly with soap before preparing raw vegetables.", "options": ["A. must", "B. shouldn't", "C. mustn't", "D. don't have to"], "correctAnswer": "A. must", "explanation": "'must wash' = bắt buộc rửa tay sạch để đảm bảo an toàn vệ sinh."},
    {"id": "u3-g12", "question": "Since the museum admission is free today, visitors _____ pay any entrance ticket.", "options": ["A. don't have to", "B. mustn't", "C. should", "D. must"], "correctAnswer": "A. don't have to", "explanation": "'don't have to pay' = không cần phải trả tiền vé."},
    {"id": "u3-g13", "question": "You _____ skip morning breakfast because it provides essential energy for your brain.", "options": ["A. ought not to", "B. must", "C. have to", "D. ought to"], "correctAnswer": "A. ought not to", "explanation": "'ought not to skip' = không nên bỏ bữa sáng."},
    {"id": "u3-g14", "question": "Every student _____ wear their official school uniform on Monday morning assembly.", "options": ["A. has to", "B. doesn't have to", "C. shouldn't", "D. ought not to"], "correctAnswer": "A. has to", "explanation": "'has to wear' = quy định bắt buộc của nhà trường."},
    {"id": "u3-g15", "question": "To manage exam anxiety, you _____ practice deep abdominal breathing exercises.", "options": ["A. should", "B. mustn't", "C. shouldn't", "D. don't have to"], "correctAnswer": "A. should", "explanation": "'should practice' = nên tập hít thở sâu để giảm căng thẳng."},
    {"id": "u3-g16", "question": "Patients _____ stop taking antibiotics halfway without doctor's instructions.", "options": ["A. mustn't", "B. don't have to", "C. should", "D. ought to"], "correctAnswer": "A. mustn't", "explanation": "'mustn't stop' = tuyệt đối không được tự ý dừng thuốc."},
    {"id": "u3-g17", "question": "You _____ worry too much about minor test mistakes; treat them as learning opportunities.", "options": ["A. shouldn't", "B. must", "C. have to", "D. ought to"], "correctAnswer": "A. shouldn't", "explanation": "'shouldn't worry' = không nên lo lắng thái quá."},
    {"id": "u3-g18", "question": "We _____ include colorful fruits and leafy greens in our daily family meals.", "options": ["A. ought to", "B. mustn't", "C. shouldn't", "D. haven't to"], "correctAnswer": "A. ought to", "explanation": "'ought to include' = nên bổ sung rau xanh và trái cây."},
    {"id": "u3-g19", "question": "Children _____ play near deep, unguarded construction water pits.", "options": ["A. mustn't", "B. don't have to", "C. should", "D. ought to"], "correctAnswer": "A. mustn't", "explanation": "'mustn't play' = nghiêm cấm chơi gần hố nước sâu nguy hiểm."},
    {"id": "u3-g20", "question": "Do teenagers _____ get parental permission before joining the overnight camping trip?", "options": ["A. have to", "B. must", "C. should", "D. ought"], "correctAnswer": "A. have to", "explanation": "Trong câu hỏi với trợ động từ 'Do... have to'."}
]

u3_listening_info = {
    "audioTitle": "Lời Khuyên Sống Khỏe Cho Tuổi Thiếu Niên (Teen Health & Stress Management)",
    "audioDuration": "3:05",
    "audioScriptSpeaker": "Dr. Ha & Student Linh",
    "transcriptText": "Linh: Good afternoon, Dr. Ha! Many ninth graders feel constantly fatigued and anxious before high school entrance exams. What advice do you have?\nDr. Ha: Hello Linh! First, teens must prioritize sleep hygiene. Sleeping eight full hours rejuvenates the brain and consolidates memory. Never sacrifice sleep to cram late at night.\nLinh: What about our daily dietary habits and screen time?\nDr. Ha: You should replace sugary soda and greasy junk food with fresh citrus fruits, nuts, and boiled vegetables. Furthermore, turn off smartphones at least 45 minutes before bedtime to prevent blue light from disrupting your melatonin production.\nLinh: How can we deal with sudden emotional stress during revisions?\nDr. Ha: Try the '4-7-8' deep breathing technique, take a twenty-minute walk in nature, or confide in a trusted teacher or counselor. A balanced mind is your greatest superpower!",
    "vietnameseTranslation": "Linh: Cháu chào bác sĩ Hà! Rất nhiều bạn học sinh lớp 9 cảm thấy mệt mỏi và lo âu liên tục trước kỳ thi vào lớp 10. Bác sĩ có lời khuyên nào không ạ?\nBác sĩ Hà: Chào Linh! Đầu tiên, các bạn trẻ phải ưu tiên thói quen ngủ khoa học. Ngủ đủ 8 tiếng giúp phục hồi não bộ và củng cố trí nhớ. Tuyệt đối không hy sinh giấc ngủ để nhồi nhét bài vở lúc nửa đêm.\nLinh: Thế còn thói quen ăn uống hàng ngày và thời gian dùng điện thoại thì sao ạ?\nBác sĩ Hà: Cháu nên thay thế nước ngọt có ga và đồ ăn nhanh nhiều dầu mỡ bằng trái cây tươi có múi, các loại hạt và rau luộc. Hơn nữa, hãy tắt điện thoại thông minh ít nhất 45 phút trước khi ngủ để tránh ánh sáng xanh làm gián đoạn việc sản sinh melatonin.\nLinh: Chúng cháu làm thế nào để giải tỏa cảm xúc căng thẳng đột ngột khi ôn tập ạ?\nBác sĩ Hà: Hãy thử kỹ thuật thở sâu '4-7-8', đi dạo 20 phút ngoài thiên nhiên, hoặc tâm sự với thầy cô hoặc chuyên gia tư vấn đáng tin cậy. Một tâm trí cân bằng chính là siêu năng lực tuyệt vời nhất của các cháu!"
}

u3_listening_qs = [
    {"id": "u3-l1", "question": "Why is getting eight full hours of sleep vital for teens according to Dr. Ha?", "options": ["A. It rejuvenates the brain and consolidates memory", "B. It makes people forget everything", "C. It turns people into robots", "D. It is completely useless"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'Sleeping eight full hours rejuvenates the brain and consolidates memory.'"},
    {"id": "u3-l2", "question": "What should students avoid doing late at night before exams?", "options": ["A. Sacrificing sleep to cram late", "B. Sleeping early", "C. Drinking warm water", "D. Resting calmly"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'Never sacrifice sleep to cram late at night.'"},
    {"id": "u3-l3", "question": "What healthy foods should replace soda and greasy junk food?", "options": ["A. Fresh citrus fruits, nuts, and boiled vegetables", "B. More sugar and candies", "C. French fries only", "D. Coffee with ice"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'replace sugary soda and greasy junk food with fresh citrus fruits, nuts, and boiled vegetables.'"},
    {"id": "u3-l4", "question": "How long before bedtime should teenagers turn off their smartphones?", "options": ["A. At least 45 minutes before bedtime", "B. 2 seconds before", "C. Never turn off", "D. In the morning only"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'turn off smartphones at least 45 minutes before bedtime.'"},
    {"id": "u3-l5", "question": "Why does blue light from screens harm sleep?", "options": ["A. It disrupts natural melatonin production", "B. It turns the phone blue", "C. It makes the bed cold", "D. It breaks the screen"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'to prevent blue light from disrupting your melatonin production.'"},
    {"id": "u3-l6", "question": "What breathing technique does Dr. Ha recommend for relieving sudden stress?", "options": ["A. The '4-7-8' deep breathing technique", "B. Holding breath for five hours", "C. Rapid hyperventilating", "D. Coughing loudly"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'Try the 4-7-8 deep breathing technique.'"},
    {"id": "u3-l7", "question": "Who can students confide in when feeling emotionally overwhelmed?", "options": ["A. A trusted teacher or psychological counselor", "B. Random internet strangers", "C. Nobody at all", "D. A brick wall"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'confide in a trusted teacher or counselor.'"},
    {"id": "u3-l8", "question": "What does Dr. Ha call a balanced mind?", "options": ["A. Your greatest superpower", "B. A heavy burden", "C. An impossible dream", "D. A weak emotion"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'A balanced mind is your greatest superpower!'"}
]

u3_listening_fibs = [
    {"id": "u3-f1", "sentenceWithBlank": "Sleeping eight hours rejuvenates the brain and consolidates _____.", "correctWord": "memory", "hint": "Trí nhớ và khả năng ghi nhớ (memory)"},
    {"id": "u3-f2", "sentenceWithBlank": "Teens should replace junk food with fresh citrus _____ and vegetables.", "correctWord": "fruits", "hint": "Trái cây tươi (fruits)"},
    {"id": "u3-f3", "sentenceWithBlank": "Blue light disrupts the natural production of _____.", "correctWord": "melatonin", "hint": "Hormone điều hòa giấc ngủ (melatonin)"},
    {"id": "u3-f4", "sentenceWithBlank": "Try the 4-7-8 deep _____ technique to calm anxiety.", "correctWord": "breathing", "hint": "Hít thở sâu (breathing)"}
]

u3_speaking = [
    {"id": f"u3-s{i+1}", "targetSentence": s, "ipa": ipa, "vietnameseMeaning": vm, "contextSituation": ctx, "keyPhonicsFocus": kpf, "sampleAudioText": s}
    for i, (s, ipa, vm, ctx, kpf) in enumerate([
        ("Maintaining a nutritious balanced diet and consistent sleep hygiene boosts teenage cognitive performance.", "/meɪnˈteɪnɪŋ ə njuːˈtrɪʃəs ˈbælənst ˈdaɪət ænd kənˈsɪstənt sliːp ˈhaɪʤiːn buːsts ˈtiːneɪʤ ˈkɒɡnɪtɪv pəˈfɔːməns/", "Duy trì chế độ ăn cân đối bổ dưỡng và thói quen ngủ khoa học giúp thúc đẩy hiệu suất nhận thức của thanh thiếu niên.", "Thuyết trình về lối sống lành mạnh.", "Phát âm chuẩn 'nutritious' /njuːˈtrɪʃəs/ và 'cognitive' /ˈkɒɡnɪtɪv/."),
        ("Teenagers should engage in at least forty-five minutes of moderate physical exercise every afternoon.", "/ˈtiːneɪʤəz ʃʊd ɪnˈɡeɪʤ ɪn æt liːst ˈfɔːti-faɪv ˈmɪnɪts ɒv ˈmɒdərɪt ˈfɪzɪkəl ˈɛksəsaɪz ˈɛvri ˈɑːftəˈnuːn/", "Thanh thiếu niên nên tham gia ít nhất 45 phút tập thể dục thể chất vừa phải vào mỗi buổi chiều.", "Đưa ra lời khuyên tập luyện.", "Phát âm chuẩn từ 'moderate' /ˈmɒdərɪt/ và 'exercise' /ˈɛksəsaɪz/."),
        ("You ought to disconnect from electronic screens forty-five minutes before going to bed.", "/juː ɔːt tuː ˌdɪskəˈnɛkt frɒm ˌɪlɛkˈtrɒnɪk skriːnz ˈfɔːti-faɪv ˈmɪnɪts bɪˈfɔː ˈɡəʊɪŋ tuː bɛd/", "Bạn nên ngắt kết nối khỏi các màn hình điện tử 45 phút trước khi đi ngủ.", "Khuyên vệ sinh giấc ngủ.", "Phát âm chuẩn cấu trúc 'ought to disconnect'."),
        ("Practicing mindful deep breathing exercises relieves academic tension and restores inner serenity.", "/ˈpræktɪsɪŋ ˈmaɪndfʊl diːp ˈbriːðɪŋ ˈɛksəsaɪzɪz rɪˈliːvz ˌækəˈdɛmɪk ˈtɛnʃən ænd rɪsˈtɔːz ˈɪnə sɪˈrɛnɪti/", "Thực hành các bài tập thở sâu chánh niệm giúp giải tỏa căng thẳng học tập và phục hồi sự thanh thản nội tâm.", "Hướng dẫn thiền thở.", "Phát âm chuẩn 'serenity' /sɪˈrɛnɪti/ và 'tension' /ˈtɛnʃən/."),
        ("Drinking ample water throughout the day keeps your body hydrated and prevents sudden headaches.", "/ˈdrɪŋkɪŋ ˈæmpl ˈwɔːtə θruːˈaʊt ðə deɪ kiːps jɔː ˈbɒdi haɪˈdreɪtɪd ænd prɪˈvɛnts ˈsʌdn ˈhɛdeɪks/", "Uống đủ nước trong suốt cả ngày giúp cơ thể bạn đủ nước và ngăn ngừa những cơn đau đầu đột ngột.", "Khuyên uống nước đều đặn.", "Phát âm chuẩn 'hydrated' /haɪˈdreɪtɪd/ và 'ample' /ˈæmpl/."),
        ("You must not skip morning breakfast because it supplies vital glucose to your brain.", "/juː mʌst nɒt skɪp ˈmɔːnɪŋ ˈbrɛkfəst bɪˈkɒz ɪt səˈplaɪz ˈvaɪtl ˈɡluːkəʊs tuː jɔː breɪn/", "Bạn không được bỏ bữa sáng vì nó cung cấp lượng đường glucose thiết yếu cho não bộ.", "Nhấn mạnh tầm quan trọng của bữa sáng.", "Phát âm chuẩn 'must not skip' và 'glucose' /ˈɡluːkəʊs/."),
        ("Confiding in school psychological counselors helps students navigate complex emotional turmoil.", "/kənˈfaɪdɪŋ ɪn skuːl ˌsaɪkəˈlɒʤɪkəl ˈkaʊnsələz hɛlps ˈstjuːdənts ˈnævɪɡeɪt ˈkɒmplɛks ɪˈməʊʃənl ˈtɜːmɔɪl/", "Tâm sự với các chuyên gia tư vấn tâm lý học đường giúp học sinh vượt qua những xáo trộn cảm xúc phức tạp.", "Khuyên tìm kiếm sự trợ giúp tâm lý.", "Phát âm chuẩn 'turmoil' /ˈtɜːmɔɪl/ và 'counselors' /ˈkaʊnsələz/."),
        ("Replacing processed snacks with fresh nuts and fruits strengthens your immune defense.", "/rɪˈpleɪsɪŋ ˈprəʊsɛst snæks wɪð frɛʃ nʌts ænd fruːts ˈstrɛŋθənz jɔːr ɪˈmjuːn dɪˈfɛns/", "Thay thế đồ ăn vặt chế biến sẵn bằng các loại hạt và hoa quả tươi củng cố hàng rào phòng thủ miễn dịch của bạn.", "Khuyên ăn uống thông minh.", "Phát âm chuẩn 'immune defense' /ɪˈmjuːn dɪˈfɛns/."),
        ("A positive and resilient mindset turns intimidating examinations into exciting personal milestones.", "/ə ˈpɒzətɪv ænd rɪˈzɪlɪənt ˈmaɪndsɛt tɜːnz ɪnˈtɪmɪdeɪtɪŋ ɪɡˌzæmɪˈneɪʃənz ˈɪntuː ɪkˈsaɪtɪŋ ˈpɜːsənl ˈmaɪlstəʊnz/", "Một tư duy tích cực và kiên cường biến những kỳ thi đáng sợ thành các cột mốc cá nhân đầy hào hứng.", "Động viên tinh thần học tập.", "Phát âm chuẩn 'resilient' /rɪˈzɪlɪənt/ và 'intimidating' /ɪnˈtɪmɪdeɪtɪŋ/."),
        ("We should establish clear boundaries between study sessions and restorative leisure activities.", "/wiː ʃʊd ɪsˈtæblɪʃ klɪə ˈbaʊndəriz bɪˈtwiːn ˈstʌdi ˈsɛʃənz ænd rɪsˈtɔːrətɪv ˈlɛʒər ækˈtɪvɪtiz/", "Chúng ta nên thiết lập ranh giới rõ ràng giữa các buổi học và các hoạt động thư giãn phục hồi năng lượng.", "Khuyên cân bằng học tập và nghỉ ngơi.", "Phát âm chuẩn 'boundaries' /ˈbaʊndəriz/ và 'restorative' /rɪsˈtɔːrətɪv/."),
        ("Swimming and cycling improve muscular endurance while boosting mental well-being simultaneously.", "/ˈswɪmɪŋ ænd ˈsaɪklɪŋ ɪmˈpruːv ˈmʌskjʊlər ɪnˈdjʊərəns waɪl ˈbuːstɪŋ ˈmɛntl wɛl-ˈbiːɪŋ ˌsɪməlˈteɪniəsli/", "Bơi lội và đạp xe nâng cao sức bền cơ bắp đồng thời cải thiện sức khỏe tinh thần cùng một lúc.", "Giới thiệu lợi ích của thể thao.", "Phát âm chuẩn 'simultaneously' /ˌsɪməlˈteɪniəsli/."),
        ("You don't have to study through the entire night before the English mock examination.", "/juː dəʊnt hæv tuː ˈstʌdi θruː ði ɪnˈtaɪə naɪt bɪˈfɔː ði ˈɪŋɡlɪʃ mɒk ɪɡˌzæmɪˈneɪʃən/", "Bạn không cần phải thức trắng đêm để học trước kỳ thi thử môn tiếng Anh.", "Khuyên không nên thức khuya học dồn.", "Phát âm chuẩn 'don't have to study'."),
        ("Spending weekend afternoons in lush green parks lowers stress hormone levels considerably.", "/ˈspɛndɪŋ ˈwiːkɛnd ˈɑːftəˈnuːnz ɪn lʌʃ ɡriːn pɑːks ˈləʊəz strɛs ˈhɔːməʊn ˈlɛvlz kənˈsɪdərəbli/", "Dành những buổi chiều cuối tuần ở các công viên xanh tươi làm giảm đáng kể nồng độ hormone gây căng thẳng.", "Khuyên hòa mình vào thiên nhiên.", "Phát âm chuẩn 'hormone' /ˈhɔːməʊn/ và 'considerably' /kənˈsɪdərəbli/."),
        ("Teens ought not to consume high-caffeine energy drinks that induce rapid heart palpitations.", "/tiːnz ɔːt nɒt tuː kənˈsjuːm haɪ-ˈkæfiːn ˈɛnəʤi drɪŋks ðæt ɪnˈdjuːs ˈræpɪd hɑːt ˌpælpɪˈteɪʃənz/", "Thiếu niên không nên uống các loại nước tăng lực có hàm lượng caffeine cao gây ra hiện tượng tim đập nhanh hồi hộp.", "Cảnh báo tác hại nước tăng lực.", "Phát âm chuẩn 'palpitations' /ˌpælpɪˈteɪʃənz/."),
        ("Expressing sincere gratitude each evening fosters emotional tranquility and optimism.", "/ɪksˈprɛsɪŋ sɪnˈsɪə ˈɡrætɪtjuːd iːʧ ˈiːvnɪŋ ˈfɒstəz ɪˈməʊʃənl træŋˈkwɪlɪti ænd ˈɒptɪmɪzm/", "Bày tỏ lòng biết ơn chân thành mỗi tối nuôi dưỡng sự bình yên trong cảm xúc và thái độ lạc quan.", "Thực hành lòng biết ơn.", "Phát âm chuẩn 'tranquillity' /træŋˈkwɪlɪti/ và 'gratitude' /ˈɡrætɪtjuːd/."),
        ("Every student has to adhere strictly to laboratory safety guidelines during chemistry classes.", "/ˈɛvri ˈstjuːdənt hæz tuː ədˈhɪə ˈstrɪktli tuː ləˈbɒrətəri ˈseɪfti ˈɡaɪdlaɪnz ˈdjʊərɪŋ ˈkɛmɪstri ˈklɑːsɪz/", "Mỗi học sinh đều phải tuân thủ nghiêm ngặt các hướng dẫn an toàn phòng thí nghiệm trong giờ hóa học.", "Nhắc nhở nội quy an toàn.", "Phát âm chuẩn 'adhere strictly' /ədˈhɪə ˈstrɪktli/."),
        ("Overcoming peer pressure requires strong self-belief and unwavering personal values.", "/ˌəʊvəˈkʌmɪŋ pɪə ˈprɛʃə rɪˈkwaɪəz strɒŋ sɛlf-bɪˈliːf ænd ʌnˈweɪvərɪŋ ˈpɜːsənl ˈvæljuːz/", "Vượt qua áp lực đồng trang lứa đòi hỏi niềm tin mạnh mẽ vào bản thân và những giá trị cá nhân vững chắc.", "Khuyên tự tin khẳng định bản thân.", "Phát âm chuẩn 'unwavering' /ʌnˈweɪvərɪŋ/."),
        ("You should prepare a designated tranquil study space free from television and social media alerts.", "/juː ʃʊd prɪˈpeər ə ˈdɛzɪɡneɪtɪd ˈtræŋkwɪl ˈstʌdi speɪs friː frɒm ˈtɛlɪˌvɪʒən ænd ˈsəʊʃəl ˈmiːdiə əˈlɜːts/", "Bạn nên chuẩn bị một không gian học tập yên tĩnh riêng biệt, không có tivi và thông báo mạng xã hội.", "Mẹo tạo góc học tập lý tưởng.", "Phát âm chuẩn 'designated tranquil' /ˈdɛzɪɡneɪtɪd ˈtræŋkwɪl/."),
        ("Nutritional wellness, joyful friendships, and regular recreation create a vibrant teenage life.", "/njuːˈtrɪʃənl ˈwɛlnɪs ˈʤɔɪfʊl ˈfrɛndʃɪps ænd ˈrɛɡjʊlə ˌrɛkrɪˈeɪʃən kriːˈeɪt ə ˈvaɪbrənt ˈtiːneɪʤ laɪf/", "Sức khỏe dinh dưỡng, tình bạn vui tươi và sự giải trí điều độ tạo nên một cuộc sống tuổi thiếu niên tràn đầy sức sống.", "Tổng kết lối sống tươi đẹp.", "Phát âm chuẩn 'wellness' /ˈwɛlnɪs/ và 'recreation' /ˌrɛkrɪˈeɪʃən/."),
        ("May your youthful days be filled with radiant health, boundless energy, and academic triumph.", "/meɪ jɔː ˈjuːθfʊl deɪz biː fɪld wɪð ˈreɪdiənt hɛlθ ˈbaʊndlɪs ˈɛnəʤi ænd ˌækəˈdɛmɪk ˈtraɪəmf/", "Chúc những năm tháng tuổi trẻ của bạn luôn tràn ngập sức khỏe rạng rỡ, năng lượng vô biên và thành công rực rỡ trong học tập.", "Lời chúc sức khỏe và thành công.", "Phát âm chuẩn 'radiant' /ˈreɪdiənt/ và 'triumph' /ˈtraɪəmf/.")
    ])
]

u3_reading_info = {
    "title": "Khoa Học Về Sức Khỏe Toàn Diện Cho Tuổi Thiếu Niên",
    "topic": "Sức khỏe thể chất, dinh dưỡng học đường và cân bằng tâm lý tuổi dậy thì",
    "passageText": "Adolescence represents a transformative phase of profound biological, cognitive, and psychosocial metamorphosis. During these pivotal years, teenagers experience exponential growth spurts accompanied by dramatic hormonal fluctuations. To navigate this demanding transition successfully, cultivating healthy lifestyle habits across physical, nutritional, and emotional dimensions is of paramount importance.\n\nForemost among healthy practices is prioritizing sleep hygiene. Neuroscientific research confirms that the adolescent brain requires between 8.5 and 9.5 hours of uninterrupted sleep each night for neural pruning and memory consolidation. Chronic sleep deprivation, often triggered by late-night smartphone blue light and excessive caffeine intake, impairs emotional regulation, increases irritability, and undermines academic performance. Consequently, establishing a strict digital curfew forty-five minutes before bedtime is strongly advised.\n\nEqually crucial is nourishing the body with a colorful, nutrient-dense diet while engaging in regular cardiovascular exercise. Adolescents should substitute ultra-processed junk foods with antioxidant-rich fruits, leafy greens, healthy omega-3 fatty acids, and wholesome lean proteins. Coupled with at least forty-five minutes of daily athletic activity, these dietary choices fortify the immune system and promote endorphin release, ensuring enduring vitality and psychological resilience.",
    "keyVocabularyHighlights": [
        {"word": "psychosocial metamorphosis", "meaning": "sự biến đổi sâu sắc về tâm lý xã hội"},
        {"word": "neural pruning", "meaning": "quá trình tái cấu trúc và hoàn thiện các đường truyền thần kinh"},
        {"word": "chronic sleep deprivation", "meaning": "sự thiếu ngủ kinh niên"},
        {"word": "endorphin release", "meaning": "sự giải phóng hormone hạnh phúc endorphin"}
    ]
}

u3_reading_qs = [
    {"id": "u3-r1", "question": "What happens during the transformative phase of adolescence according to paragraph 1?", "options": ["A. Profound biological, cognitive, and psychosocial metamorphosis with exponential growth", "B. Nothing changes at all", "C. Humans stop growing permanently", "D. Brain activity stops"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 1: 'transformative phase of profound biological, cognitive, and psychosocial metamorphosis.'"},
    {"id": "u3-r2", "question": "How many hours of sleep does the adolescent brain require each night according to neuroscientific research?", "options": ["A. Between 8.5 and 9.5 hours", "B. 2 hours only", "C. 20 hours", "D. Zero hours"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'requires between 8.5 and 9.5 hours of uninterrupted sleep each night.'"},
    {"id": "u3-r3", "question": "What negative consequences result from chronic sleep deprivation?", "options": ["A. Impaired emotional regulation, irritability, and undermined academic performance", "B. Enhanced intelligence instantly", "C. Perfect memory with no effort", "D. Weight loss without eating"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'impairs emotional regulation, increases irritability, and undermines academic performance.'"},
    {"id": "u3-r4", "question": "What is recommended regarding digital devices before bedtime?", "options": ["A. Establishing a strict digital curfew 45 minutes before bedtime", "B. Staring at screens all night", "C. Putting 5 phones under the pillow", "D. Watching action movies until dawn"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'establishing a strict digital curfew forty-five minutes before bedtime is strongly advised.'"},
    {"id": "u3-r5", "question": "What healthy foods should replace ultra-processed junk foods?", "options": ["A. Antioxidant-rich fruits, leafy greens, omega-3 fatty acids, and lean proteins", "B. High-sugar candy bars", "C. Deep-fried chips and soda", "D. Pure white sugar"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'substitute ultra-processed junk foods with antioxidant-rich fruits, leafy greens, healthy omega-3 fatty acids, and wholesome lean proteins.'"},
    {"id": "u3-r6", "question": "How much daily athletic activity is recommended in paragraph 3?", "options": ["A. At least 45 minutes of daily athletic activity", "B. 1 minute every year", "C. 10 hours without water", "D. None"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'Coupled with at least forty-five minutes of daily athletic activity.'"},
    {"id": "u3-r7", "question": "What physiological benefit does regular exercise produce according to paragraph 3?", "options": ["A. Fortifying the immune system and promoting endorphin release", "B. Making muscles completely disappear", "C. Stopping the heart from beating", "D. Making blood cold"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'fortify the immune system and promote endorphin release.'"},
    {"id": "u3-r8", "question": "Which word in paragraph 1 is closest in meaning to 'paramount'?", "options": ["A. Supreme, utmost, or of greatest importance", "B. Minor and trivial", "C. Boring and slow", "D. Dangerous and harmful"], "correctAnswerIndex": 0, "explanation": "'Paramount' có nghĩa là tối quan trọng, có ý nghĩa then chốt hàng đầu."},
    {"id": "u3-r9", "question": "Which word in paragraph 2 is closest in meaning to 'deprivation'?", "options": ["A. Lack, deficiency, or severe absence of something needed", "B. Excessive surplus", "C. High celebration", "D. Deep swimming pool"], "correctAnswerIndex": 0, "explanation": "'Deprivation' có nghĩa là sự tước đoạt, sự thiếu thốn trầm trọng (ở đây là thiếu ngủ)."},
    {"id": "u3-r10", "question": "What is the best title for this comprehensive reading passage?", "options": ["A. The Science of Holistic Wellness and Healthy Living for Teens", "B. How to Build Deep Sea Submarines", "C. History of Medieval Castles", "D. Methods for Growing Tropical Pineapples"], "correctAnswerIndex": 0, "explanation": "Toàn bài đọc làm rõ khoa học về lối sống lành mạnh toàn diện cả thể chất lẫn tâm lý cho tuổi dậy thì."}
]

u3_writing_prompts = [
    {
        "id": "u3-w1",
        "title": "Đề 1: Write a paragraph giving advice on how to manage exam stress (60-80 words)",
        "description": "Viết một đoạn văn đưa ra các lời khuyên thiết thực giúp học sinh giải tỏa áp lực thi cử.",
        "suggestedOutline": [
            "Introduction: State that managing exam stress is crucial for ninth graders.",
            "Body: Suggest 2-3 methods (making a balanced study schedule, practicing deep breathing, getting 8 hours of sleep).",
            "Conclusion: State that a calm, positive mindset ensures the best exam results."
        ],
        "usefulPhrases": [
            "Managing exam stress effectively requires sensible study and wellness habits...",
            "First, students should draft a realistic revision timetable to avoid last-minute cramming...",
            "Second, practicing the 4-7-8 breathing technique and sleeping 8 hours calms the nervous system...",
            "Maintaining emotional tranquility empowers learners to achieve their fullest potential."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Managing exam stress effectively is essential for ninth-grade students. First, you should create a structured revision timetable with reasonable breaks to avoid last-minute cramming. Second, whenever feeling overwhelmed, practice the 4-7-8 deep breathing technique and take a brisk walk in fresh air. Finally, getting eight hours of restful sleep every night consolidates memory and keeps your mind alert. A calm and confident mindset will lead to outstanding exam results."
    },
    {
        "id": "u3-w2",
        "title": "Đề 2: Write a paragraph about your daily healthy routine (60-80 words)",
        "description": "Viết một đoạn văn miêu tả lịch trình sinh hoạt lành mạnh mỗi ngày của em (thể thao, ăn uống, giấc ngủ).",
        "suggestedOutline": [
            "Introduction: Introduce that having a healthy daily routine keeps you energetic.",
            "Body: Detail your morning exercise, nutritious meals, and evening bedtime habits.",
            "Conclusion: Express how this routine benefits your physical and mental health."
        ],
        "usefulPhrases": [
            "Maintaining a disciplined daily routine keeps me healthy, cheerful, and productive...",
            "Every morning at 6:00 AM, I jog for twenty minutes and drink a glass of warm water...",
            "For meals, I prioritize fresh fruits, vegetables, and lean protein over sugary treats...",
            "Going to bed by 10:00 PM ensures I wake up refreshed and ready for new challenges."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Maintaining a disciplined daily routine keeps me energetic, cheerful, and focused. Every morning at 6:00 AM, I jog for twenty minutes in the local park and drink a glass of warm water. For my meals, I always eat home-cooked food rich in vegetables, eggs, and fresh fruits while avoiding oily junk food. Finally, going to bed by 10:00 PM ensures eight hours of deep sleep, leaving me refreshed for school."
    },
    {
        "id": "u3-w3",
        "title": "Đề 3: Write a paragraph on the harmful effects of excessive screen time (60-80 words)",
        "description": "Viết một đoạn văn phân tích các tác hại của việc lạm dụng điện thoại và màn hình điện tử đối với thanh thiếu niên.",
        "suggestedOutline": [
            "Introduction: State that excessive screen time negatively affects teens' health.",
            "Body: Discuss harms (eye strain, disrupted sleep due to blue light, reduced physical activity, social isolation).",
            "Conclusion: Advise setting screen time limits for a balanced life."
        ],
        "usefulPhrases": [
            "Spending too much screen time on smartphones poses serious health risks for teenagers...",
            "Staring at screens for long hours causes digital eye strain, chronic headaches, and neck stiffness...",
            "Furthermore, nighttime blue light suppresses melatonin, leading to severe insomnia and fatigue...",
            "Therefore, adolescents should limit screen time and spend more moments outdoors."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Spending too much screen time on smartphones poses serious health hazards for teenagers. Staring continuously at digital screens causes severe eye strain, chronic headaches, and poor posture. Furthermore, late-night blue light suppresses melatonin production, disrupting healthy sleep cycles and causing daytime exhaustion. To protect our physical and mental well-being, teenagers should set strict screen time limits, disconnect before bedtime, and engage in outdoor sports with friends."
    },
    {
        "id": "u3-w4",
        "title": "Đề 4: Write a paragraph about the importance of eating breakfast (60-80 words)",
        "description": "Viết một đoạn văn khẳng định tầm quan trọng của bữa ăn sáng đối với học sinh.",
        "suggestedOutline": [
            "Introduction: State that breakfast is the most important meal of the day.",
            "Body: Explain why (provides glucose for the brain, enhances concentration in class, prevents fatigue).",
            "Conclusion: Encourage all students never to skip breakfast."
        ],
        "usefulPhrases": [
            "Breakfast is indisputably the most critical meal of the day for growing teenagers...",
            "After a long overnight fast, a nutritious breakfast replenishes glucose levels in the brain...",
            "Students who eat breakfast enjoy sharper concentration, better memory, and higher energy in morning lessons...",
            "Therefore, you should never skip breakfast, even during busy school mornings."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Breakfast is indisputably the most crucial meal of the day for growing students. After a long overnight fast, a nutritious morning meal replenishes vital glucose levels in the bloodstream, providing immediate fuel for brain activity. Students who eat a balanced breakfast featuring eggs, oatmeal, or bread experience superior concentration, better memory retention, and sustained energy in classes. Therefore, we should never skip breakfast, regardless of how busy our mornings are."
    },
    {
        "id": "u3-w5",
        "title": "Đề 5: Write a paragraph explaining why drinking enough water is essential (60-80 words)",
        "description": "Viết một đoạn văn giải thích tại sao việc uống đủ nước mỗi ngày lại tối quan trọng đối với sức khỏe.",
        "suggestedOutline": [
            "Introduction: State that staying hydrated is fundamental for overall bodily health.",
            "Body: Detail the benefits (flushes toxins, regulates body temperature, keeps skin glowing, prevents tiredness).",
            "Conclusion: Remind everyone to drink at least 2 liters of water daily."
        ],
        "usefulPhrases": [
            "Staying properly hydrated is fundamental for optimal bodily and cognitive functioning...",
            "Drinking two liters of pure water daily helps regulate internal body temperature and flush out toxins...",
            "Moreover, adequate hydration prevents dehydration headaches and maintains radiant, healthy skin...",
            "Carrying a reusable water bottle everywhere is an easy habit to ensure good health."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Staying properly hydrated is fundamental for maintaining peak physical and mental performance. Drinking at least two liters of pure water daily helps regulate internal body temperature, lubricates joints, and effectively flushes metabolic toxins from our system. Moreover, adequate hydration prevents sluggishness and dehydration headaches while keeping skin clear and radiant. Carrying a reusable water bottle to school ensures you stay energized and hydrated throughout the entire day."
    }
]

unit3 = make_unit(3, "Unit 3: Healthy Living for Teens", "Sống khỏe cho tuổi thiếu niên & Dinh dưỡng học đường", "Khám phá thói quen ngủ khoa học, dinh dưỡng cân đối, kiểm soát căng thẳng và động từ khuyết thiếu (Modal Verbs: Should, Ought to, Must, Have to).", "Ngữ âm: Nhấn trọng âm các từ chỉ dinh dưỡng và ngữ điệu câu khuyên nhủ", "HeartPulse", u3_vocab, u3_grammar_info, u3_grammar_exs, u3_listening_info, u3_listening_qs, u3_listening_fibs, u3_speaking, u3_reading_info, u3_reading_qs, u3_writing_prompts)
write_ts_unit(3, unit3)
print("Unit 3 generated successfully!")

# ==============================================================================
# UNIT 4: REMEMBERING THE PAST (20 Vocab, 20 Grammar, 8 Listening MC + 4 FIB, 20 Speaking, 10 Reading, 5 Writing)
# ==============================================================================
u4_vocab = [
    {"id": "u4-v1", "word": "historical monument", "phonetic": "/hɪsˈtɒrɪkəl ˈmɒnjʊmənt/", "partOfSpeech": "noun", "vietnameseMeaning": "di tích lịch sử, đài tưởng niệm", "englishExample": "The Imperial Citadel of Thang Long is a renowned historical monument in Hanoi.", "vietnameseExample": "Hoàng thành Thăng Long là một di tích lịch sử nổi tiếng tại Hà Nội."},
    {"id": "u4-v2", "word": "extended family", "phonetic": "/ɪksˈtɛndɪd ˈfæmɪli/", "partOfSpeech": "noun", "vietnameseMeaning": "đại gia đình nhiều thế hệ sống chung", "englishExample": "In the past, three or four generations lived harmoniously in a single extended family.", "vietnameseExample": "Trong quá khứ, ba hoặc bốn thế hệ từng sống hòa thuận trong một đại gia đình."},
    {"id": "u4-v3", "word": "nuclear family", "phonetic": "/ˈnjuːklɪə ˈfæmɪli/", "partOfSpeech": "noun", "vietnameseMeaning": "gia đình hạt nhân (chỉ có bố mẹ và con cái)", "englishExample": "Modern urban couples often establish nuclear families in city apartments.", "vietnameseExample": "Các cặp vợ chồng đô thị hiện đại thường lập gia đình hạt nhân trong các căn hộ thành phố."},
    {"id": "u4-v4", "word": "tram", "phonetic": "/træm/", "partOfSpeech": "noun", "vietnameseMeaning": "xe điện leng keng thời xưa", "englishExample": "The rhythmic bell of the Hanoi tram echoed through the French Quarter decades ago.", "vietnameseExample": "Tiếng chuông leng keng nhịp nhàng của xe điện Hà Nội từng vang vọng khắp khu phố Pháp nhiều thập kỷ trước."},
    {"id": "u4-v5", "word": "tiled roof", "phonetic": "/taɪld ruːf/", "partOfSpeech": "noun", "vietnameseMeaning": "mái ngói cổ kính", "englishExample": "Ancient communal houses in Duong Lam village boast mossy red tiled roofs.", "vietnameseExample": "Những ngôi nhà cổ ở làng Đường Lâm tự hào với những mái ngói đỏ rêu phong."},
    {"id": "u4-v6", "word": "thatched house", "phonetic": "/θæʧt haʊs/", "partOfSpeech": "noun", "vietnameseMeaning": "nhà tranh vách đất", "englishExample": "Decades ago, many rural families lived in cozy thatched houses woven from bamboo and straw.", "vietnameseExample": "Nhiều thập kỷ trước, nhiều gia đình nông thôn sống trong những ngôi nhà tranh ấm cúng đan từ tre và rơm."},
    {"id": "u4-v7", "word": "tradition", "phonetic": "/trəˈdɪʃən/", "partOfSpeech": "noun", "vietnameseMeaning": "truyền thống văn hóa tốt đẹp", "englishExample": "Wrapping green Chung cakes during Tet is a cherished Vietnamese cultural tradition.", "vietnameseExample": "Gói bánh chưng xanh ngày Tết là một truyền thống văn hóa đáng trân trọng của người Việt."},
    {"id": "u4-v8", "word": "generation gap", "phonetic": "/ˌʤɛnəˈreɪʃən ɡæp/", "partOfSpeech": "noun", "vietnameseMeaning": "khoảng cách thế hệ giữa ông bà, cha mẹ và con cái", "englishExample": "Open-minded conversations bridge the generation gap between grandparents and teenagers.", "vietnameseExample": "Những cuộc trò chuyện cởi mở giúp thu hẹp khoảng cách thế hệ giữa ông bà và các bạn trẻ."},
    {"id": "u4-v9", "word": "preserve heritage", "phonetic": "/prɪˈzɜːv ˈhɛrɪtɪʤ/", "partOfSpeech": "phrase", "vietnameseMeaning": "bảo tồn di sản văn hóa lịch sử", "englishExample": "Schools organize museum excursions to teach students how to preserve heritage.", "vietnameseExample": "Các trường học tổ chức các chuyến tham quan bảo tàng để dạy học sinh cách bảo tồn di sản."},
    {"id": "u4-v10", "word": "ancestors", "phonetic": "/ˈænsɛstəz/", "partOfSpeech": "noun", "vietnameseMeaning": "tổ tiên, ông bà tiền nhân", "englishExample": "Every family places an altar in the central room to venerate their beloved ancestors.", "vietnameseExample": "Mỗi gia đình đều đặt bàn thờ ở gian chính để tưởng nhớ tổ tiên kính yêu."},
    {"id": "u4-v11", "word": "custom", "phonetic": "/ˈkʌstəm/", "partOfSpeech": "noun", "vietnameseMeaning": "phong tục, tập quán lâu đời", "englishExample": "The custom of giving lucky red envelopes on New Year conveys wishes of prosperity.", "vietnameseExample": "Phong tục lì xì bao đỏ ngày đầu năm mới gửi gắm những lời chúc thịnh vượng."},
    {"id": "u4-v12", "word": "communal house", "phonetic": "/kəˈmjuːnl haʊs/", "partOfSpeech": "noun", "vietnameseMeaning": "đình làng, nơi sinh hoạt cộng đồng", "englishExample": "Elders gathered at the village communal house to discuss harvest festivals and disputes.", "vietnameseExample": "Các bậc cao niên tụ họp tại đình làng để bàn bạc về lễ hội mùa màng và các việc làng."},
    {"id": "u4-v13", "word": "subsidy period", "phonetic": "/ˈsʌbsɪdi ˈpɪərɪəd/", "partOfSpeech": "noun", "vietnameseMeaning": "thời kỳ bao cấp (đong gạo, phát tem phiếu)", "englishExample": "During the subsidy period, people used food stamps to purchase rice, fabric, and sugar.", "vietnameseExample": "Trong thời kỳ bao cấp, người dân dùng tem phiếu thực phẩm để mua gạo, vải và đường."},
    {"id": "u4-v14", "word": "folk tale", "phonetic": "/fəʊk teɪl/", "partOfSpeech": "noun", "vietnameseMeaning": "truyện cổ tích, truyện dân gian", "englishExample": "Grandmothers loved reciting moral folk tales like Tam Cam and Thach Sanh by oil lamps.", "vietnameseExample": "Bà thường kể những câu chuyện cổ tích giàu tính giáo dục như Tấm Cám và Thạch Sanh bên ngọn đèn dầu."},
    {"id": "u4-v15", "word": "memorabilia", "phonetic": "/ˌmɛmərəˈbɪliə/", "partOfSpeech": "noun", "vietnameseMeaning": "kỷ vật, hiện vật lưu niệm thời xưa", "englishExample": "The war museum exhibits poignant memorabilia including handwritten letters and old canteen bottles.", "vietnameseExample": "Bảo tàng chiến tranh trưng bày những kỷ vật xúc động bao gồm những lá thư viết tay và bình tông cũ."},
    {"id": "u4-v16", "word": "nostalgia", "phonetic": "/nɒsˈtælʤə/", "partOfSpeech": "noun", "vietnameseMeaning": "nỗi hoài niệm, cảm giác nhớ thương dĩ vãng", "englishExample": "Listening to old radio broadcasts evokes deep nostalgia for childhood days.", "vietnameseExample": "Nghe những buổi phát thanh radio cũ gợi lại nỗi hoài niệm sâu lắng về những ngày ấu thơ."},
    {"id": "u4-v17", "word": "oil lamp", "phonetic": "/ɔɪl læmp/", "partOfSpeech": "noun", "vietnameseMeaning": "đèn dầu thắp sáng", "englishExample": "Before rural electrification, students studied diligent lessons under the dim glow of oil lamps.", "vietnameseExample": "Trước khi có điện lưới nông thôn, các bạn học sinh chăm chỉ học bài dưới ánh sáng lờ mờ của ngọn đèn dầu."},
    {"id": "u4-v18", "word": "handwritten", "phonetic": "/ˈhændˌrɪtn/", "partOfSpeech": "adjective", "vietnameseMeaning": "viết bằng tay (thư từ, nhật ký)", "englishExample": "People treasured handwritten letters sent from soldiers serving on distant battlefronts.", "vietnameseExample": "Mọi người trân quý những bức thư viết tay gửi về từ những người lính ngoài mặt trận xa xôi."},
    {"id": "u4-v19", "word": "well-preserved", "phonetic": "/wɛl-prɪˈzɜːvd/", "partOfSpeech": "adjective", "vietnameseMeaning": "được bảo tồn nguyên vẹn, giữ gìn tốt", "englishExample": "Hoi An Ancient Town has well-preserved wooden shophouses dating back centuries.", "vietnameseExample": "Phố cổ Hội An có những căn nhà phố bằng gỗ được bảo tồn nguyên vẹn có từ nhiều thế kỷ trước."},
    {"id": "u4-v20", "word": "historic battle", "phonetic": "/hɪsˈtɒrɪk ˈbætl/", "partOfSpeech": "noun", "vietnameseMeaning": "trận đánh lịch sử hào hùng", "englishExample": "The historic battle of Dien Bien Phu in 1954 demonstrated Vietnamese extraordinary courage.", "vietnameseExample": "Trận đánh lịch sử Điện Biên Phủ năm 1954 đã chứng minh lòng quả cảm phi thường của người Việt Nam."}
]

u4_grammar_info = {
    "title": "Cấu Trúc 'Used To' & Cấu Trúc Ước 'Wish' Ở Hiện Tại (Used to + V & Wish + Past Simple)",
    "summary": "Nắm vững cách dùng 'used to' để diễn tả thói quen hoặc trạng thái trong quá khứ không còn ở hiện tại, và câu ước 'wish' ở hiện tại với động từ chia ở thì Quá khứ đơn (Past Simple / were).",
    "formulaBox": [
        "Thói quen quá khứ: S + used to + V-bare (phủ định: didn't use to + V-bare; nghi vấn: Did + S + use to + V-bare?)",
        "Ví dụ: People USED TO TRAVEL by old trams in Hanoi.",
        "Ví dụ: We DIDN'T USE TO HAVE smartphones in the subsidy period.",
        "Câu ước hiện tại: S + wish(es) + S + V-ed/V2 (động từ be dùng 'were' cho tất cả các ngôi)",
        "Ví dụ: I WISH my grandparents WERE still here to tell me historic folk tales.",
        "Ví dụ: She WISHES she KNEW more about her family's ancestral traditions."
    ],
    "usagePoints": [
        {"title": "1. Used to vs Be used to", "detail": "'Used to + V' chỉ thói quen trong quá khứ đã chấm dứt; khác với 'be used to + V-ing' chỉ sự quen thuộc với việc gì ở hiện tại.", "example": "My grandfather used to listen to the wooden radio every evening."},
        {"title": "2. Câu ước Wish trái ngược thực tế ở hiện tại", "detail": "Lùi một thì về Quá khứ đơn (Past Simple) để diễn tả điều ước trái ngược với hiện tại.", "example": "I wish our ancient village had more preserved tiled roof houses."}
    ]
}

u4_grammar_exs = [
    {"id": "u4-g1", "question": "My grandfather _____ by old electric trams when he was a university student in Hanoi.", "options": ["A. used to travel", "B. was used to travel", "C. is used to traveling", "D. use to travel"], "correctAnswer": "A. used to travel", "explanation": "'used to travel' diễn tả thói quen đi lại trong quá khứ đã chấm dứt."},
    {"id": "u4-g2", "question": "I wish my grandparents _____ closer so that I could visit them every weekend.", "options": ["A. lived", "B. live", "C. are living", "D. will live"], "correctAnswer": "A. lived", "explanation": "Câu ước ở hiện tại lùi thì về Quá khứ đơn: 'wish + S + lived'."},
    {"id": "u4-g3", "question": "Decades ago, rural families _____ have electric refrigerators or air conditioners.", "options": ["A. didn't use to", "B. didn't used to", "C. not used to", "D. used not"], "correctAnswer": "A. didn't use to", "explanation": "Thể phủ định của used to là 'didn't use to + V-bare'."},
    {"id": "u4-g4", "question": "She wishes she _____ more about her ancestral village's handicraft history.", "options": ["A. knew", "B. knows", "C. is knowing", "D. will know"], "correctAnswer": "A. knew", "explanation": "Câu ước hiện tại: 'wishes she knew'."},
    {"id": "u4-g5", "question": "Did children _____ folk games like tug-of-war and hide-and-seek in the village courtyard?", "options": ["A. use to play", "B. used to play", "C. using to play", "D. used playing"], "correctAnswer": "A. use to play", "explanation": "Câu nghi vấn: 'Did + S + use to + V-bare?'"},
    {"id": "u4-g6", "question": "I wish there _____ more historical museums in our town to exhibit wartime memorabilia.", "options": ["A. were", "B. are", "C. was being", "D. will be"], "correctAnswer": "A. were", "explanation": "Động từ 'to be' trong mệnh đề wish thường dùng 'were' cho tất cả các ngôi."},
    {"id": "u4-g7", "question": "People _____ handwritten letters and wait weeks for the postal reply.", "options": ["A. used to write", "B. used writing", "C. use to write", "D. are used to write"], "correctAnswer": "A. used to write", "explanation": "'used to write' diễn tả thói quen viết thư tay ngày xưa."},
    {"id": "u4-g8", "question": "Nam wishes he _____ have to spend so much time commuting in city traffic jams.", "options": ["A. didn't", "B. doesn't", "C. won't", "D. hasn't"], "correctAnswer": "A. didn't", "explanation": "Câu ước phủ định ở hiện tại: 'wishes he didn't have to'."},
    {"id": "u4-g9", "question": "In the subsidy period, people _____ in long queues with food ration stamps to buy meat.", "options": ["A. used to stand", "B. were used to stand", "C. use to stand", "D. used standing"], "correctAnswer": "A. used to stand", "explanation": "'used to stand' = từng xếp hàng dài trong quá khứ."},
    {"id": "u4-g10", "question": "The students wish they _____ the ancient temple before it was renovated.", "options": ["A. could visit", "B. can visit", "C. will visit", "D. may visit"], "correctAnswer": "A. could visit", "explanation": "'wish they could visit' diễn tả mong muốn có khả năng làm gì."},
    {"id": "u4-g11", "question": "My mother _____ fetch water from the village communal well every dawn.", "options": ["A. used to", "B. is used to", "C. uses to", "D. was used"], "correctAnswer": "A. used to", "explanation": "'used to fetch water' = từng gánh nước giếng làng."},
    {"id": "u4-g12", "question": "I wish the generation gap between parents and teenagers _____ smaller.", "options": ["A. were", "B. is", "C. has been", "D. will be"], "correctAnswer": "A. were", "explanation": "'wish the gap were smaller' (ước khoảng cách thế hệ nhỏ hơn)."},
    {"id": "u4-g13", "question": "We _____ have a large wooden dining table where all three generations gathered.", "options": ["A. used to", "B. were using", "C. use to", "D. are used to"], "correctAnswer": "A. used to", "explanation": "'used to have' = từng có một chiếc bàn gỗ lớn."},
    {"id": "u4-g14", "question": "She wishes she _____ play traditional musical instruments like the Dan Bau fluently.", "options": ["A. could", "B. can", "C. will", "D. may"], "correctAnswer": "A. could", "explanation": "'wish she could play' diễn tả ước muốn về khả năng."},
    {"id": "u4-g15", "question": "Villagers didn't _____ electricity twenty years ago, so they used oil lamps.", "options": ["A. use to have", "B. used to have", "C. use to having", "D. used have"], "correctAnswer": "A. use to have", "explanation": "Sau 'didn't' dùng 'use to have'."},
    {"id": "u4-g16", "question": "They wish modern cities _____ more green spaces and fewer towering concrete blocks.", "options": ["A. had", "B. have", "C. are having", "D. will have"], "correctAnswer": "A. had", "explanation": "'wish modern cities had' (lùi thì quá khứ của have)."},
    {"id": "u4-g17", "question": "My grandmother used to _____ us moral fairy tales under the starlit sky.", "options": ["A. tell", "B. telling", "C. told", "D. tells"], "correctAnswer": "A. tell", "explanation": "Sau 'used to' là động từ nguyên mẫu 'tell'."},
    {"id": "u4-g18", "question": "I wish I _____ travel back in time to witness the historic Dien Bien Phu victory.", "options": ["A. could", "B. can", "C. will", "D. should"], "correctAnswer": "A. could", "explanation": "'wish I could travel back' = ước mình có thể du hành về quá khứ."},
    {"id": "u4-g19", "question": "There _____ be a quiet lotus pond right where the shopping mall stands today.", "options": ["A. used to", "B. was used to", "C. is used to", "D. use to"], "correctAnswer": "A. used to", "explanation": "'There used to be' = từng có một hồ sen yên tĩnh nơi đây."},
    {"id": "u4-g20", "question": "Mai wishes her busy family _____ dinner together more frequently.", "options": ["A. ate", "B. eats", "C. is eating", "D. will eat"], "correctAnswer": "A. ate", "explanation": "'wishes her family ate dinner together' (lùi thì quá khứ của eat)."}
]

u4_listening_info = {
    "audioTitle": "Ký Ức Về Đại Gia Đình & Xe Điện Hà Nội Xưa (Memories of Hanoi's Past)",
    "audioDuration": "3:20",
    "audioScriptSpeaker": "Grandfather Mr. Binh & Grandson Khoa",
    "transcriptText": "Khoa: Grandpa, what was daily life like in Hanoi fifty years ago?\nMr. Binh: Ah Khoa, it was completely different! We used to live in an extended family with four generations sharing a courtyard house with mossy tiled roofs. We didn't use to have air conditioners or televisions; instead, we gathered around the radio every evening to hear folk stories.\nKhoa: How did people travel around the capital back then?\nMr. Binh: Most residents rode bicycles or hopped on the ringing electric tram that ran through the Old Quarter. The distinct 'cling-clang' chime of the tram is something every elder remembers with fond nostalgia.\nKhoa: Do you wish life were still like that today, Grandpa?\nMr. Binh: Modern technology brings wonderful comfort and healthcare, but I truly wish modern families spent more time sharing heartfelt conversations over family meals, just like we used to!",
    "vietnameseTranslation": "Khoa: Ông ơi, cuộc sống hàng ngày ở Hà Nội 50 năm trước như thế nào ạ?\nÔng Bình: Ôi Khoa à, hồi đó khác hoàn toàn bây giờ! Ông bà từng sống trong một đại gia đình với bốn thế hệ cùng chung sống trong một ngôi nhà có sân vườn và mái ngói rêu phong. Thời đó chúng ta không có điều hòa hay tivi; thay vào đó, cả nhà quây quần bên chiếc radio mỗi tối để nghe truyện dân gian.\nKhoa: Hồi đó mọi người đi lại quanh thủ đô bằng phương tiện gì vậy ông?\nÔng Bình: Hầu hết người dân đi xe đạp hoặc nhảy lên chiếc xe điện leng keng chạy qua khu Phố Cổ. Tiếng chuông leng keng đặc trưng của xe điện là điều mà bất kỳ người cao tuổi nào cũng nhớ về với nỗi hoài niệm tha thiết.\nKhoa: Ông có ước cuộc sống ngày nay vẫn như ngày xưa không ạ?\nÔng Bình: Công nghệ hiện đại mang lại sự tiện nghi và y tế tuyệt vời, nhưng ông thực sự ước các gia đình ngày nay dành nhiều thời gian hơn để trò chuyện chân thành trong các bữa cơm gia đình, giống như ngày xưa chúng ta từng làm!"
}

u4_listening_qs = [
    {"id": "u4-l1", "question": "How many generations lived together in Mr. Binh's family in the past?", "options": ["A. Four generations in an extended family", "B. One person only", "C. Ten families in a cave", "D. Zero"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'We used to live in an extended family with four generations.'"},
    {"id": "u4-l2", "question": "What kind of house did Mr. Binh's family share?", "options": ["A. A courtyard house with mossy tiled roofs", "B. A glass skyscraper", "C. A concrete bunker", "D. An underground subway station"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'sharing a courtyard house with mossy tiled roofs.'"},
    {"id": "u4-l3", "question": "What did the family gather around every evening to hear folk stories?", "options": ["A. Around the old radio", "B. Around an iPad", "C. Around a computer screen", "D. Around a gaming console"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'gathered around the radio every evening to hear folk stories.'"},
    {"id": "u4-l4", "question": "How did citizens travel around Hanoi decades ago?", "options": ["A. By bicycles and the ringing electric tram", "B. By airplanes only", "C. By bullet trains", "D. By private helicopters"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'Most residents rode bicycles or hopped on the ringing electric tram.'"},
    {"id": "u4-l5", "question": "What sound evokes fond nostalgia for Hanoi elders?", "options": ["A. The distinct 'cling-clang' chime of the electric tram", "B. Car horn honking", "C. Jet engine roar", "D. Factory alarm sirens"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'The distinct cling-clang chime of the tram is something every elder remembers.'"},
    {"id": "u4-l6", "question": "What advantages of modern life does Grandpa acknowledge?", "options": ["A. Wonderful comfort and healthcare amenities", "B. More traffic jams", "C. Louder construction noise", "D. Higher pollution"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'Modern technology brings wonderful comfort and healthcare.'"},
    {"id": "u4-l7", "question": "What does Grandpa truly wish for modern families?", "options": ["A. That families spent more time sharing heartfelt conversations over meals", "B. That everyone bought 10 laptops", "C. That people never talked to each other", "D. That schools closed down"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'I truly wish modern families spent more time sharing heartfelt conversations over family meals.'"},
    {"id": "u4-l8", "question": "What is the key contrast highlighted in the dialogue?", "options": ["A. The warmth of traditional communal bonds versus modern technological conveniences", "B. The price of food only", "C. The color of trams", "D. The weather in Hanoi"], "correctAnswerIndex": 0, "explanation": "Bài đối thoại làm nổi bật sự đối lập và mong muốn kết hợp giữa sự ấm áp của gia đình xưa và tiện ích ngày nay."}
]

u4_listening_fibs = [
    {"id": "u4-f1", "sentenceWithBlank": "Mr. Binh lived in an _____ family with 4 generations.", "correctWord": "extended", "hint": "Đại gia đình nhiều thế hệ (extended)"},
    {"id": "u4-f2", "sentenceWithBlank": "Hanoi citizens used to ride the electric _____ through the Old Quarter.", "correctWord": "tram", "hint": "Xe điện leng keng (tram)"},
    {"id": "u4-f3", "sentenceWithBlank": "The chime of the tram evokes deep _____ for older citizens.", "correctWord": "nostalgia", "hint": "Nỗi hoài niệm dĩ vãng (nostalgia)"},
    {"id": "u4-f4", "sentenceWithBlank": "Grandpa wishes families shared more heartfelt _____ during meals.", "correctWord": "conversations", "hint": "Các cuộc trò chuyện (conversations)"}
]

u4_speaking = [
    {"id": f"u4-s{i+1}", "targetSentence": s, "ipa": ipa, "vietnameseMeaning": vm, "contextSituation": ctx, "keyPhonicsFocus": kpf, "sampleAudioText": s}
    for i, (s, ipa, vm, ctx, kpf) in enumerate([
        ("My great-grandparents used to live in a serene courtyard house featuring traditional mossy tiled roofs.", "/maɪ ɡreɪt-ˈɡrænˌpeərənts juːzd tuː lɪv ɪn ə sɪˈriːn ˈkɔːtˌjɑːd haʊs ˈfiːʧərɪŋ trəˈdɪʃənl ˈmɒsi taɪld ruːfs/", "Các cụ của tôi từng sống trong một ngôi nhà có sân vườn thanh bình với những mái ngói rêu phong truyền thống.", "Kể về ngôi nhà cổ của gia đình.", "Phát âm chuẩn 'courtyard' /ˈkɔːtˌjɑːd/ và 'mossy tiled roofs'."),
        ("The distinctive cling-clang bell of Hanoi electric trams evokes deep nostalgia among older generations.", "/ðə dɪsˈtɪŋktɪv klɪŋ-klæŋ bɛl ɒv hæ nɔɪ ɪˈlɛktrɪk træmz ɪˈvəʊks diːp nɒsˈtælʤə əˈmʌŋ ˈəʊldə ˌʤɛnəˈreɪʃənz/", "Tiếng chuông leng keng đặc trưng của tàu điện Hà Nội gợi lên nỗi hoài niệm sâu lắng trong các thế hệ cao niên.", "Miêu tả âm thanh xe điện xưa.", "Phát âm chuẩn 'nostalgia' /nɒsˈtælʤə/ và 'distinctive' /dɪsˈtɪŋktɪv/."),
        ("I wish modern family members spent more quality time conversing over warm homemade dinners.", "/aɪ wɪʃ ˈmɒdən ˈfæmɪli ˈmɛmbəz spɛnt mɔː ˈkwɒlɪti taɪm kənˈvɜːsɪŋ ˈəʊvə wɔːm ˈhəʊmˈmeɪd ˈdɪnəz/", "Tôi ước các thành viên trong gia đình hiện đại dành nhiều thời gian chất lượng hơn để trò chuyện bên bữa cơm nhà ấm áp.", "Bày tỏ điều ước về tình cảm gia đình.", "Phát âm chuẩn cấu trúc câu ước 'I wish... spent more quality time'."),
        ("During the subsidy period, citizens had to queue patiently with ration coupons to purchase daily essentials.", "/ˈdjʊərɪŋ ðə ˈsʌbsɪdi ˈpɪərɪəd ˈsɪtɪznz hæd tuː kjuː ˈpeɪʃəntli wɪð ˈræʃən ˈkuːpɒnz tuː ˈpɜːʧəs ˈdeɪli ɪˈsɛnʃəlz/", "Trong thời kỳ bao cấp, người dân phải kiên nhẫn xếp hàng với tem phiếu để mua các nhu yếu phẩm hàng ngày.", "Kể về đời sống thời bao cấp.", "Phát âm chuẩn 'subsidy period' /ˈsʌbsɪdi ˈpɪərɪəd/ và 'ration coupons'."),
        ("Generations gathered closely around the glowing oil lamp to listen to grandmother reciting moral folk legends.", "/ˌʤɛnəˈreɪʃənz ˈɡæðəd ˈkləʊsli əˈraʊnd ðə ˈɡləʊɪŋ ɔɪl læmp tuː ˈlɪsn tuː ˈɡrænˌmʌðə rɪˈsaɪtɪŋ ˈmɒrəl fəʊk ˈlɛʤəndz/", "Các thế hệ quây quần bên ngọn đèn dầu ấm áp để lắng nghe bà kể những truyền thuyết dân gian giàu tính giáo dục.", "Kể kỷ niệm nghe bà kể chuyện.", "Phát âm chuẩn 'reciting' /rɪˈsaɪtɪŋ/ và 'legends' /ˈlɛʤəndz/."),
        ("Preserving ancient historical monuments connects youthful minds with their ancestors' heroic resilience.", "/prɪˈzɜːvɪŋ ˈeɪnʃənt hɪsˈtɒrɪkəl ˈmɒnjʊmənts kəˈnɛkts ˈjuːθfʊl maɪndz wɪð ðeər ˈænsɛstəz hɪˈrəʊɪk rɪˈzɪlɪəns/", "Bảo tồn các di tích lịch sử cổ kính kết nối tâm hồn giới trẻ với lòng kiên cường bất khuất của tổ tiên anh hùng.", "Nói về ý nghĩa của di tích lịch sử.", "Phát âm chuẩn 'monuments' /ˈmɒnjʊmənts/ và 'resilience' /rɪˈzɪlɪəns/."),
        ("Children used to play folk games like shuttlecock kicking and bamboo jacks in the communal courtyard.", "/ˈʧɪldrən juːzd tuː pleɪ fəʊk ɡeɪmz laɪk ˈʃʌtlkɒk ˈkɪkɪŋ ænd bæmˈbuː ʤæks ɪn ðə kəˈmjuːnl ˈkɔːtˌjɑːd/", "Trẻ em ngày xưa từng chơi các trò chơi dân gian như đá cầu và chơi chuyền trong sân đình làng.", "Kể về các trò chơi dân gian xưa.", "Phát âm chuẩn 'shuttlecock' /ˈʃʌtlkɒk/ và 'communal' /kəˈmjuːnl/."),
        ("I wish our ancestral village still had that tranquil lotus pond beside the banyan tree.", "/aɪ wɪʃ ˈaʊər ænˈsɛstrəl ˈvɪlɪʤ stɪl hæd ðæt ˈtræŋkwɪl ˈləʊtəs pɒnd bɪˈsaɪd ðə ˈbænjən triː/", "Tôi ước ngôi làng của tổ tiên chúng tôi vẫn còn ao sen yên ả bên gốc cây đa.", "Bày tỏ nỗi nhớ cảnh quê xưa.", "Phát âm chuẩn 'tranquil' /ˈtræŋkwɪl/ và 'banyan tree' /ˈbænjən triː/."),
        ("Bridging the generation gap requires mutual empathy, patience, and open intergenerational dialogue.", "/ˈbrɪʤɪŋ ðə ˌʤɛnəˈreɪʃən ɡæp rɪˈkwaɪəz ˈmjuːʧʊəl ˈɛmpəθi ˈpeɪʃəns ænd ˈəʊpən ˌɪntəˌʤɛnəˈreɪʃənl ˈdaɪəlɒɡ/", "Thu hẹp khoảng cách thế hệ đòi hỏi sự thấu cảm lẫn nhau, lòng kiên nhẫn và đối thoại cởi mở giữa các thế hệ.", "Bàn về giải pháp gắn kết gia đình.", "Phát âm chuẩn 'intergenerational' /ˌɪntəˌʤɛnəˈreɪʃənl/ và 'dialogue' /ˈdaɪəlɒɡ/."),
        ("People used to treasure handwritten letters sent across miles as priceless emotional keepsakes.", "/ˈpiːpl juːzd tuː ˈtrɛʒə ˈhændˌrɪtn ˈlɛtəz sɛnt əˈkrɒs maɪlz æz ˈpraɪslɪs ɪˈməʊʃənl ˈkiːpseɪks/", "Mọi người từng trân quý những bức thư tay gửi qua muôn dặm như những kỷ vật tình cảm vô giá.", "Nói về giá trị thư tay truyền thống.", "Phát âm chuẩn 'keepsakes' /ˈkiːpseɪks/ và 'priceless' /ˈpraɪslɪs/."),
        ("The historic battle of Dien Bien Phu remains an everlasting symbol of Vietnamese national determination.", "/ðə hɪsˈtɒrɪk ˈbætl ɒv diɛn biɛn fuː rɪˈmeɪnz ən ˌɛvəˈlɑːstɪŋ ˈsɪmbəl ɒv ˌvjɛtnəˈmiːz ˈnæʃənl dɪˌtɜːmɪˈneɪʃən/", "Trận đánh lịch sử Điện Biên Phủ mãi là biểu tượng bất diệt cho ý chí kiên định của dân tộc Việt Nam.", "Tôn vinh chiến công lịch sử.", "Phát âm chuẩn 'everlasting' /ˌɛvəˈlɑːstɪŋ/ và 'determination' /dɪˌtɜːmɪˈneɪʃən/."),
        ("Did your grandparents use to cultivate golden paddy fields by buffalo-drawn wooden ploughs?", "/dɪd jɔː ˈɡrænˌpeərənts juːz tuː ˈkʌltɪveɪt ˈɡəʊldən ˈpædi fiːldz baɪ ˈbʌfələʊ-drɔːn ˈwʊdn plaʊz/", "Ông bà của bạn có từng canh tác những thửa ruộng lúa vàng bằng những chiếc cày gỗ trâu kéo không?", "Hỏi về phương thức nông nghiệp xưa.", "Phát âm chuẩn 'cultivate' /ˈkʌltɪveɪt/ và 'ploughs' /plaʊz/."),
        ("I wish young students had more opportunities to participate in hands-on historical reenactment clubs.", "/aɪ wɪʃ jʌŋ ˈstjuːdənts hæd mɔːr ˌɒpəˈtjuːnɪtiz tuː pɑːˈtɪsɪpeɪt ɪn hændz-ɒn hɪsˈtɒrɪkəl riːɪˈnæktmənt klʌbz/", "Tôi ước các bạn học sinh trẻ có nhiều cơ hội hơn để tham gia các câu lạc bộ tái hiện lịch sử thực tế.", "Đề xuất hoạt động học lịch sử.", "Phát âm chuẩn 'reenactment' /riːɪˈnæktmənt/."),
        ("The village elder narrated ancient heroic legends with profound emotion and inspiring clarity.", "/ðə ˈvɪlɪʤ ˈɛldə nəˈreɪtɪd ˈeɪnʃənt hɪˈrəʊɪk ˈlɛʤəndz wɪð prəˈfaʊnd ɪˈməʊʃən ænd ɪnˈspaɪərɪŋ ˈklærɪti/", "Bậc cao niên trong làng đã kể lại những truyền thuyết anh hùng cổ xưa với cảm xúc sâu lắng và sự truyền cảm rõ nét.", "Miêu tả giọng kể của bô lão.", "Phát âm chuẩn 'narrated' /nəˈreɪtɪd/ và 'profound' /prəˈfaʊnd/."),
        ("We should never forget the immense sacrifices our predecessors endured for peace and freedom.", "/wiː ʃʊd ˈnɛvə fəˈɡɛt ði ɪˈmɛns ˈsækrɪfaɪsɪz ˈaʊə ˈpriːdɪsɛsəz ɪnˈdjʊəd fɔː piːs ænd ˈfriːdəm/", "Chúng ta không bao giờ được quên những sự hy sinh to lớn mà các thế hệ tiền bối đã trải qua vì hòa bình và tự do.", "Lời tri ân thế hệ đi trước.", "Phát âm chuẩn 'predecessors' /ˈpriːdɪsɛsəz/ và 'sacrifices' /ˈsækrɪfaɪsɪz/."),
        ("Ancient traditional folk songs teach invaluable moral lessons regarding filial piety and honesty.", "/ˈeɪnʃənt trəˈdɪʃənl fəʊk sɒŋz tiːʧ ɪnˈvæljʊəbl ˈmɒrəl ˈlɛsnz rɪˈɡɑːdɪŋ ˈfɪlɪəl ˈpaɪəti ænd ˈɒnɪsti/", "Những khúc dân ca cổ truyền dạy những bài học đạo đức vô giá về lòng hiếu thảo và sự trung thực.", "Nói về giá trị dân ca.", "Phát âm chuẩn 'filial piety' /ˈfɪlɪəl ˈpaɪəti/ và 'invaluable' /ɪnˈvæljʊəbl/."),
        ("I wish our family could visit the Imperial Citadel of Hue during the upcoming spring festival.", "/aɪ wɪʃ ˈaʊə ˈfæmɪli kʊd ˈvɪzɪt ði ɪmˈpɪərɪəl ˈsɪtədl ɒv hweɪ ˈdjʊərɪŋ ði ˈʌpˌkʌmɪŋ sprɪŋ ˈfɛstəvəl/", "Tôi ước gia đình mình có thể ghé thăm Đại Nội Hoàng thành Huế trong dịp lễ hội mùa xuân sắp tới.", "Bày tỏ mong muốn du lịch di sản.", "Phát âm chuẩn 'Imperial Citadel' /ɪmˈpɪərɪəl ˈsɪtədl/."),
        ("Old photographs stored inside velvet albums capture unforgettable moments of bygone decades.", "/əʊld ˈfəʊtəɡrɑːfs stɔːd ɪnˈsaɪd ˈvɛlvɪt ˈælbəmz ˈkæpʧər ˌʌnfəˈɡɛtəbl ˈməʊmənts ɒv ˈbaɪɡɒn ˈdɛkeɪdz/", "Những bức ảnh cũ lưu giữ trong cuốn album nhung ghi lại những khoảnh khắc không thể nào quên của những thập kỷ đã qua.", "Nói về ảnh gia đình xưa.", "Phát âm chuẩn 'bygone decades' /ˈbaɪɡɒn ˈdɛkeɪdz/."),
        ("Cherishing historical roots equips youth with unwavering cultural pride and profound identity.", "/ˈʧɛrɪʃɪŋ hɪsˈtɒrɪkəl ruːts ɪˈkwɪps juːθ wɪð ʌnˈweɪvərɪŋ ˈkʌlʧərəl praɪd ænd prəˈfaʊnd aɪˈdɛntɪti/", "Trân trọng cội nguồn lịch sử trang bị cho giới trẻ niềm tự hào văn hóa vững vàng và bản sắc sâu sắc.", "Thông điệp về gìn giữ cội nguồn.", "Phát âm chuẩn 'cherishing' /ˈʧɛrɪʃɪŋ/ và 'identity' /aɪˈdɛntɪti/."),
        ("May the glorious heritage and enduring values of our ancestors shine bright for all eternity.", "/meɪ ðə ˈɡlɔːrɪəs ˈhɛrɪtɪʤ ænd ɪnˈdjʊərɪŋ ˈvæljuːz ɒv ˈaʊər ˈænsɛstəz ʃaɪn braɪt fɔːr ɔːl iːˈtɜːnɪti/", "Nguyện chúc di sản vinh quang và những giá trị trường tồn của tổ tiên chúng ta mãi tỏa sáng muôn đời.", "Lời chúc thiêng liêng về di sản dân tộc.", "Phát âm chuẩn 'eternity' /iːˈtɜːnɪti/ và 'glorious' /ˈɡlɔːrɪəs/.")
    ])
]

u4_reading_info = {
    "title": "Ký Ức Lịch Sử: Hành Trình Từ Thời Bao Cấp Đến Kỷ Nguyên Số",
    "topic": "Lịch sử đời sống gia đình, ký ức thời bao cấp và bảo tồn di sản văn hóa",
    "passageText": "Reflecting upon the past allows modern societies to appreciate the profound journey of social and economic evolution. Only half a century ago, life in Vietnamese cities and rural hamlets operated under strikingly different paradigms. During the subsidy era (thoi bao cap), consumer goods were distributed through state-issued ration coupons. Families stood in disciplined queues to receive staples like rice, pork, and paraffin oil. Luxury amenities like private automobiles and air conditioners were virtually nonexistent; instead, neighborhoods relied on bicycles, electric trams, and communal wells.\n\nFamily dynamics in bygone decades were also deeply rooted in the extended family structure. Three or four generations resided beneath a single tiled roof, sharing domestic chores and venerating ancestral traditions. Elders passed down moral virtues and folklore through oral storytelling beside flickering oil lamps, creating an indelible bond among family members that transcended material hardships.\n\nWhile modern technological transformations have dramatically elevated living standards, they also present subtle challenges like the widening generation gap and digital isolation. Preserving intangible cultural heritage, visiting historic monuments, and reviving meaningful family rituals over shared dinners ensure that contemporary youth remain deeply anchored to their historic roots while embracing a globally connected future.",
    "keyVocabularyHighlights": [
        {"word": "subsidy era", "meaning": "thời kỳ bao cấp với tem phiếu phân phối"},
        {"word": "extended family structure", "meaning": "cơ cấu đại gia đình nhiều thế hệ sống chung"},
        {"word": "indelible bond", "meaning": "sự gắn kết sâu đậm không thể phai mờ"},
        {"word": "intangible cultural heritage", "meaning": "di sản văn hóa phi vật thể"}
    ]
}

u4_reading_qs = [
    {"id": "u4-r1", "question": "How were consumer goods distributed during the subsidy era in Vietnam?", "options": ["A. Through state-issued ration coupons and disciplined queues", "B. By ordering on modern mobile apps", "C. Through automated drone delivery", "D. Free in limitless amounts everywhere"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 1: 'distributed through state-issued ration coupons. Families stood in disciplined queues.'"},
    {"id": "u4-r2", "question": "What transport and domestic facilities did neighborhoods rely on decades ago?", "options": ["A. Bicycles, electric trams, and communal wells", "B. Private sports helicopters and supersonic jets", "C. Self-driving electric cars only", "D. Submarines"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 1: 'neighborhoods relied on bicycles, electric trams, and communal wells.'"},
    {"id": "u4-r3", "question": "How were family living arrangements structured in bygone decades according to paragraph 2?", "options": ["A. Three or four generations resided beneath a single tiled roof in extended families", "B. Each person lived alone on an island", "C. Children left home at age 5", "D. Families lived in glass bubble pods"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'Three or four generations resided beneath a single tiled roof, sharing domestic chores.'"},
    {"id": "u4-r4", "question": "How did elders transmit moral virtues and folklore to younger generations?", "options": ["A. Through oral storytelling beside flickering oil lamps", "B. Through social media video clips", "C. By sending text messages", "D. Through virtual reality video games"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'passed down moral virtues and folklore through oral storytelling beside flickering oil lamps.'"},
    {"id": "u4-r5", "question": "What subtle challenges accompany modern technological transformations?", "options": ["A. Widening generation gap and digital isolation", "B. Running out of sunlight", "C. Trees growing too fast", "D. Oceans disappearing"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'present subtle challenges like the widening generation gap and digital isolation.'"},
    {"id": "u4-r6", "question": "How can modern youth stay anchored to their cultural roots?", "options": ["A. Preserving intangible heritage, visiting monuments, and reviving family meal rituals", "B. Forgetting all history completely", "C. Burning old photo albums", "D. Refusing to speak to grandparents"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'Preserving intangible cultural heritage, visiting historic monuments, and reviving meaningful family rituals.'"},
    {"id": "u4-r7", "question": "Which word in paragraph 2 is closest in meaning to 'indelible'?", "options": ["A. Permanent, lasting, or impossible to forget", "B. Temporary and brief", "C. Cheap and fragile", "D. Cold and bitter"], "correctAnswerIndex": 0, "explanation": "'Indelible' có nghĩa là không thể tẩy xóa, in sâu mãi mãi trong tâm khảm."},
    {"id": "u4-r8", "question": "Which word in paragraph 3 is closest in meaning to 'anchored'?", "options": ["A. Firmly connected, rooted, or grounded", "B. Floating away aimlessly", "C. Broken into pieces", "D. Hidden in darkness"], "correctAnswerIndex": 0, "explanation": "'Anchored' có nghĩa là được neo giữ, gắn kết vững chắc với cội nguồn."},
    {"id": "u4-r9", "question": "What is the central theme conveyed in the passage?", "options": ["A. Honoring past traditions and family values while progressing into the modern digital age", "B. Rejecting all modern medicine", "C. Building only wooden trams", "D. Stopping all international trade"], "correctAnswerIndex": 0, "explanation": "Toàn bài đọc làm sáng tỏ sự quý giá của việc gìn giữ ký ức, truyền thống gia đình xưa khi bước vào kỷ nguyên hiện đại."},
    {"id": "u4-r10", "question": "What is the best title for this passage?", "options": ["A. Historical Memories: The Journey from the Subsidy Era to the Digital Age", "B. The Architecture of High-Speed Racing Boats", "C. How to Generate Solar Electricity", "D. Geology of Volcanic Islands"], "correctAnswerIndex": 0, "explanation": "Tiêu đề chuẩn xác nhất phản ánh hành trình từ thời bao cấp đến thời đại số và ý nghĩa gìn giữ di sản."}
]

u4_writing_prompts = [
    {
        "id": "u4-w1",
        "title": "Đề 1: Write a paragraph about what life used to be like in Vietnam in the past (60-80 words)",
        "description": "Viết một đoạn văn miêu tả cuộc sống của người Việt Nam ngày xưa (nhà ở, đi lại, thói quen sinh hoạt).",
        "suggestedOutline": [
            "Introduction: State that daily life in Vietnam decades ago was simple and communal.",
            "Body: Mention how people lived (extended families in thatched/tiled roof houses), traveled (bicycles, trams), and communicated.",
            "Conclusion: State that despite material hardships, people shared deep warmth and solidarity."
        ],
        "usefulPhrases": [
            "Life in Vietnam decades ago was strikingly simple yet filled with communal warmth...",
            "People used to live in extended families with three generations beneath one tiled roof...",
            "Most citizens traveled by bicycle or electric trams and gathered around radios in the evening...",
            "Despite material hardships, people cherished profound solidarity and close family ties."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Life in Vietnam decades ago was strikingly simple yet filled with communal warmth. Most people lived in large extended families with three or four generations beneath a single tiled roof. Citizens traveled mainly by bicycles or old electric trams and used handwritten letters to communicate across distances. In the evenings, families gathered around warm oil lamps to share stories. Despite material hardships, people cherished profound solidarity and mutual affection."
    },
    {
        "id": "u4-w2",
        "title": "Đề 2: Write a paragraph about a family tradition you cherish (60-80 words)",
        "description": "Viết một đoạn văn kể về một truyền thống gia đình mà em rất trân trọng (gói bánh chưng, cúng tổ tiên, sum họp ngày Tết...).",
        "suggestedOutline": [
            "Introduction: Introduce your favorite family tradition.",
            "Body: Describe how your family prepares and participates together in this ritual.",
            "Conclusion: Explain why this tradition strengthens emotional bonds across generations."
        ],
        "usefulPhrases": [
            "Among our cherished family traditions, wrapping Chung cakes before Tet is my favorite...",
            "Every Lunar New Year Eve, all three generations gather around a crackling wood fire...",
            "My grandparents teach us how to fold green dong leaves and layer fragrant sticky rice...",
            "This precious tradition strengthens our intergenerational love and honors our ancestors."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Among our cherished family traditions, wrapping Chung cakes before Tet is my absolute favorite. Every Lunar New Year Eve, all three generations gather around a warm wood fire. My grandparents patiently teach us how to fold green dong leaves, layer fragrant sticky rice, and wrap square cakes with bamboo strings. Staying up together watching the bubbling pot strengthens our intergenerational love and keeps our ancestors' cultural heritage alive."
    },
    {
        "id": "u4-w3",
        "title": "Đề 3: Write a paragraph on how to bridge the generation gap in modern families (60-80 words)",
        "description": "Viết một đoạn văn đề xuất các cách giúp thu hẹp khoảng cách thế hệ giữa ông bà, cha mẹ và con cái.",
        "suggestedOutline": [
            "Introduction: State that bridging the generation gap is essential for family harmony.",
            "Body: Suggest 2-3 practical ways (having regular family dinners, listening with empathy, teaching tech to elders).",
            "Conclusion: Reiterate that mutual respect fosters lasting family happiness."
        ],
        "usefulPhrases": [
            "Bridging the generation gap requires mutual empathy and quality communication...",
            "First, family members should eat dinner together without staring at smartphone screens...",
            "Second, youth can patiently teach parents and grandparents how to use modern digital apps...",
            "These meaningful exchanges foster mutual respect, understanding, and deep affection."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Bridging the generation gap requires mutual empathy, patience, and regular heartfelt communication. First, families should commit to having daily dinners together without the distraction of digital smartphones. Second, parents should listen empathetically to their teenagers' opinions rather than imposing outdated rules. In return, youth can patiently teach grandparents how to use technology. These loving exchanges nurture mutual understanding and create a harmonious, supportive home."
    },
    {
        "id": "u4-w4",
        "title": "Đề 4: Write a paragraph expressing your wishes for a better future (using 'I wish') (60-80 words)",
        "description": "Viết một đoạn văn sử dụng cấu trúc câu ước 'I wish' để nói về những mong ước của em cho gia đình và xã hội.",
        "suggestedOutline": [
            "Introduction: State that you often reflect on wishes for a brighter world.",
            "Body: Use 'I wish' structures (I wish our city had cleaner air, I wish families spent more time together, I wish all children could access education).",
            "Conclusion: Express your hope to contribute to making these wishes come true."
        ],
        "usefulPhrases": [
            "I frequently contemplate meaningful wishes for a more compassionate world...",
            "First, I wish modern metropolises had more lush green parks and fewer polluting vehicles...",
            "Second, I wish busy family members spent more quality time conversing warmly every evening...",
            "I hope each of us takes positive actions to turn these noble wishes into reality."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "I frequently contemplate meaningful wishes for our society. First, I wish our cities had more expansive green parks and significantly fewer exhaust fumes. Second, I wish modern family members were less attached to digital screens and spent more quality time conversing warmly during meals. Finally, I wish all disadvantaged children in remote villages had access to modern schools. I hope to study hard to help turn these heartfelt wishes into reality."
    },
    {
        "id": "u4-w5",
        "title": "Đề 5: Write a paragraph describing a historical monument you have visited (60-80 words)",
        "description": "Viết một đoạn văn miêu tả chuyến tham quan một di tích lịch sử nổi tiếng (Hoàng thành Thăng Long, Văn Miếu, Cố đô Huế...).",
        "suggestedOutline": [
            "Introduction: Name and location of the historical monument.",
            "Body: Describe its architecture, ancient artifacts, and historical importance.",
            "Conclusion: Express your pride in Vietnam's heroic history and cultural heritage."
        ],
        "usefulPhrases": [
            "Last summer, I visited the ancient Imperial Citadel of Thang Long in Hanoi...",
            "The monumental stone fortress features grand gates, royal palaces, and ancient underground relics...",
            "Seeing antique ceramic artifacts from the Ly and Tran dynasties filled me with awe...",
            "Visiting this historic monument deepened my profound pride in Vietnam's rich heritage."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Last summer, I visited the ancient Imperial Citadel of Thang Long in Hanoi. This magnificent UNESCO World Heritage monument features imposing historic gates, ancient stone dragon steps, and extensive archaeological excavation sites. Walking through museum galleries exhibiting centuries-old royal ceramics and bronze weapons filled me with profound admiration. Visiting this solemn site deepened my pride in our ancestors' heroic resilience and inspired me to protect our national heritage."
    }
]

unit4 = make_unit(4, "Unit 4: Remembering the Past", "Nhớ về quá khứ & Di sản lịch sử", "Khám phá đời sống gia đình xưa, di tích lịch sử, cấu trúc Used to và câu ước Wish ở hiện tại.", "Ngữ âm: Nhấn trọng âm các từ chỉ di sản và ngữ điệu câu ước Wish", "History", u4_vocab, u4_grammar_info, u4_grammar_exs, u4_listening_info, u4_listening_qs, u4_listening_fibs, u4_speaking, u4_reading_info, u4_reading_qs, u4_writing_prompts)
write_ts_unit(4, unit4)
print("Unit 4 generated successfully!")

