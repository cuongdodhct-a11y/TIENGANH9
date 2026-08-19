import json
from gen_unit_utils import make_unit, write_ts_unit

# ==============================================================================
# UNIT 9: ENGLISH IN THE WORLD
# ==============================================================================
u9_vocab = [
    {"id": "u9-v1", "word": "multilingual", "phonetic": "/ˌmʌltɪˈlɪŋɡwəl/", "partOfSpeech": "adjective", "vietnameseMeaning": "đa ngôn ngữ, nói được nhiều thứ tiếng", "englishExample": "Being multilingual opens up magnificent career opportunities in global international corporations.", "vietnameseExample": "Khả năng nói được nhiều thứ tiếng mở ra những cơ hội nghề nghiệp tuyệt vời trong các tập đoàn quốc tế toàn cầu."},
    {"id": "u9-v2", "word": "lingua franca", "phonetic": "/ˌlɪŋɡwə ˈfræŋkə/", "partOfSpeech": "noun", "vietnameseMeaning": "ngôn ngữ chung trong giao tiếp quốc tế", "englishExample": "English serves as the primary lingua franca for international aviation, diplomacy, and science.", "vietnameseExample": "Tiếng Anh đóng vai trò là ngôn ngữ chung chính trong ngành hàng không, ngoại giao và khoa học quốc tế."},
    {"id": "u9-v3", "word": "dialect", "phonetic": "/ˈdaɪəlɛkt/", "partOfSpeech": "noun", "vietnameseMeaning": "phương ngữ, tiếng địa phương", "englishExample": "Different English-speaking regions possess distinct regional dialects and unique vocabulary.", "vietnameseExample": "Các vùng nói tiếng Anh khác nhau sở hữu những phương ngữ vùng miền và từ vựng độc đáo riêng biệt."},
    {"id": "u9-v4", "word": "accent", "phonetic": "/ˈæksənt/", "partOfSpeech": "noun", "vietnameseMeaning": "giọng phát âm đặc trưng theo vùng miền hoặc quốc gia", "englishExample": "Listening to diverse accents from Britain, America, and Australia sharpens listening comprehension.", "vietnameseExample": "Lắng nghe các giọng phát âm đa dạng từ Anh, Mỹ và Úc giúp nâng cao khả năng nghe hiểu."},
    {"id": "u9-v5", "word": "proficiency", "phonetic": "/prəˈfɪʃənsi/", "partOfSpeech": "noun", "vietnameseMeaning": "sự thành thạo, trình độ năng lực ngôn ngữ", "englishExample": "Demonstrating high English proficiency is a crucial requirement for international university scholarships.", "vietnameseExample": "Chứng minh năng lực tiếng Anh thành thạo là yêu cầu cốt lõi để đạt học bổng đại học quốc tế."},
    {"id": "u9-v6", "word": "bilingual", "phonetic": "/baɪˈlɪŋɡwəl/", "partOfSpeech": "adjective", "vietnameseMeaning": "song ngữ (sử dụng thành thạo hai ngôn ngữ)", "englishExample": "Bilingual children develop exceptional cognitive flexibility and problem-solving skills.", "vietnameseExample": "Trẻ em song ngữ phát triển sự linh hoạt nhận thức và kỹ năng giải quyết vấn đề vượt trội."},
    {"id": "u9-v7", "word": "vocabulary acquisition", "phonetic": "/vəˈkæbjʊləri ˌækwɪˈzɪʃən/", "partOfSpeech": "noun", "vietnameseMeaning": "sự tiếp thu và làm giàu vốn từ vựng", "englishExample": "Extensive reading in English accelerates natural vocabulary acquisition and reading speed.", "vietnameseExample": "Đọc sách tiếng Anh sâu rộng giúp đẩy nhanh quá trình tiếp thu từ vựng tự nhiên và tốc độ đọc hiểu."},
    {"id": "u9-v8", "word": "intonation", "phonetic": "/ˌɪntəʊˈneɪʃən/", "partOfSpeech": "noun", "vietnameseMeaning": "ngữ điệu lên xuống của giọng nói", "englishExample": "Mastering rising and falling intonation makes spoken English natural and expressive.", "vietnameseExample": "Làm chủ ngữ điệu lên và xuống giúp tiếng Anh nói trở nên tự nhiên và giàu cảm xúc."},
    {"id": "u9-v9", "word": "idiomatic expression", "phonetic": "/ˌɪdɪəˈmætɪk ɪksˈprɛʃən/", "partOfSpeech": "noun", "vietnameseMeaning": "thành ngữ mang nghĩa bóng", "englishExample": "Using idiomatic expressions appropriately enriches your conversations with native speakers.", "vietnameseExample": "Sử dụng thành ngữ phù hợp sẽ làm phong phú các cuộc trò chuyện của bạn với người bản xứ."},
    {"id": "u9-v10", "word": "fluency", "phonetic": "/ˈfluːənsi/", "partOfSpeech": "noun", "vietnameseMeaning": "sự trôi chảy, lưu loát khi giao tiếp", "englishExample": "Daily speaking practice with language partners significantly enhances conversational fluency.", "vietnameseExample": "Luyện nói hàng ngày với bạn học giúp nâng cao đáng kể sự trôi chảy trong giao tiếp."},
    {"id": "u9-v11", "word": "mother tongue", "phonetic": "/ˈmʌðə tʌŋ/", "partOfSpeech": "noun", "vietnameseMeaning": "tiếng mẹ đẻ, ngôn ngữ thứ nhất", "englishExample": "Vietnamese is our cherished mother tongue, carrying our deep ancestral heritage.", "vietnameseExample": "Tiếng Việt là tiếng mẹ đẻ thân thương, mang theo di sản ngàn đời của tổ tiên chúng ta."},
    {"id": "u9-v12", "word": "conditional clause", "phonetic": "/kənˈdɪʃənl klɔːz/", "partOfSpeech": "noun", "vietnameseMeaning": "mệnh đề điều kiện (If clause)", "englishExample": "Second conditional clauses express hypothetical or unreal situations in the present.", "vietnameseExample": "Mệnh đề điều kiện loại hai diễn tả tình huống giả định hoặc không có thật ở hiện tại."},
    {"id": "u9-v13", "word": "native speaker", "phonetic": "/ˈneɪtɪv ˈspiːkə/", "partOfSpeech": "noun", "vietnameseMeaning": "người bản xứ nói tiếng mẹ đẻ", "englishExample": "Listening to podcasts recorded by native speakers helps learners acquire authentic pronunciation.", "vietnameseExample": "Nghe các kênh podcast do người bản xứ ghi âm giúp người học tiếp thu phát âm chuẩn xác."},
    {"id": "u9-v14", "word": "clarity", "phonetic": "/ˈklærɪti/", "partOfSpeech": "noun", "vietnameseMeaning": "sự rõ ràng, rành mạch", "englishExample": "Pronouncing word endings with clarity ensures that listeners understand your ideas accurately.", "vietnameseExample": "Phát âm các âm đuôi rõ ràng đảm bảo người nghe hiểu chính xác ý kiến của bạn."},
    {"id": "u9-v15", "word": "linguistic diversity", "phonetic": "/lɪŋˈɡwɪstɪk daɪˈvɜːsɪti/", "partOfSpeech": "noun", "vietnameseMeaning": "sự đa dạng ngôn ngữ của nhân loại", "englishExample": "Preserving global linguistic diversity is vital for safeguarding human cultural heritage.", "vietnameseExample": "Gìn giữ sự đa dạng ngôn ngữ toàn cầu là điều cốt lõi để bảo vệ di sản văn hóa của nhân loại."},
    {"id": "u9-v16", "word": "global integration", "phonetic": "/ˈɡləʊbəl ˌɪntɪˈɡreɪʃən/", "partOfSpeech": "noun", "vietnameseMeaning": "sự hội nhập quốc tế toàn cầu", "englishExample": "English acts as a bridge facilitating Viet Nam's global integration and commercial trade.", "vietnameseExample": "Tiếng Anh hoạt động như một nhịp cầu tạo điều kiện cho sự hội nhập toàn cầu và thương mại của Việt Nam."},
    {"id": "u9-v17", "word": "phonetics", "phonetic": "/fəˈnɛtɪks/", "partOfSpeech": "noun", "vietnameseMeaning": "ngữ âm học, hệ thống âm thanh ngôn ngữ", "englishExample": "Learning phonetics and the IPA chart prevents common mispronunciations of silent letters.", "vietnameseExample": "Học ngữ âm học và bảng IPA giúp ngăn ngừa các lỗi phát âm sai phổ biến về âm câm."},
    {"id": "u9-v18", "word": "subtitles", "phonetic": "/ˈsʌbˌtaɪtlz/", "partOfSpeech": "noun", "vietnameseMeaning": "phụ đề phim ảnh hoặc video", "englishExample": "Watching English movies with English subtitles is an engaging and effective learning method.", "vietnameseExample": "Xem phim tiếng Anh có phụ đề tiếng Anh là phương pháp học tập cuốn hút và vô cùng hiệu quả."},
    {"id": "u9-v19", "word": "hypothetical", "phonetic": "/ˌhaɪpəˈθɛtɪkəl/", "partOfSpeech": "adjective", "vietnameseMeaning": "mang tính giả định, tưởng tượng", "englishExample": "The second conditional describes hypothetical scenarios: 'If I were a diplomat, I would travel often.'", "vietnameseExample": "Câu điều kiện loại hai miêu tả các tình huống mang tính giả định: 'Nếu tôi là nhà ngoại giao, tôi sẽ đi du lịch thường xuyên.'"},
    {"id": "u9-v20", "word": "cross-cultural", "phonetic": "/krɒs-ˈkʌlʧərəl/", "partOfSpeech": "adjective", "vietnameseMeaning": "giao lưu giữa các nền văn hóa", "englishExample": "Cross-cultural communication skills allow young people to collaborate smoothly with international peers.", "vietnameseExample": "Kỹ năng giao tiếp xuyên văn hóa cho phép người trẻ hợp tác nhịp nhàng với bạn bè quốc tế."}
]

u9_grammar_info = {
    "title": "Câu Điều Kiện Loại 2 (Second Conditional) & Mệnh Đề Quan Hệ Xác Định / Không Xác Định",
    "summary": "Câu điều kiện loại 2 diễn tả giả định không có thật ở hiện tại hoặc tương lai. Mệnh đề quan hệ (Defining vs Non-defining Relative Clauses) cung cấp thông tin cho danh từ.",
    "formulaBox": [
        "Second Conditional: If + S + V2/ed (were cho tất cả các ngôi), S + would / could / might + V-bare",
        "Ví dụ: If I were fluent in English, I would apply for an international scholarship.",
        "Defining Relative Clause (Mệnh đề xác định - không có dấu phẩy): The app which I use to learn vocabulary is free.",
        "Non-defining Relative Clause (Mệnh đề không xác định - có dấu phẩy, không dùng THAT): English, which is spoken globally, connects people from diverse cultures."
    ],
    "usagePoints": [
        {"title": "1. Động từ To Be trong câu điều kiện loại 2", "detail": "Trong văn phong chuẩn mực, 'were' được ưu tiên sử dụng cho mọi chủ ngữ (If I were you, If he were here).", "example": "If she were more confident, she could deliver an inspiring English speech."},
        {"title": "2. Dấu phẩy trong mệnh đề quan hệ không xác định", "detail": "Mệnh đề không xác định bổ sung thông tin cho danh từ đã được xác định rõ (tên riêng, có this/that/my). Không bao giờ dùng 'that' sau dấu phẩy.", "example": "Professor David, who taught us phonetics, is from London."}
    ]
}

u9_grammar_exs = [
    {"id": "u9-g1", "question": "If I _____ more free time every evening, I would practice speaking English with native speakers.", "options": ["A. had", "B. have", "C. will have", "D. have had"], "correctAnswer": "A. had", "explanation": "Mệnh đề If của câu điều kiện loại 2 dùng quá khứ đơn: 'had'."},
    {"id": "u9-g2", "question": "If she were more confident in her pronunciation, she _____ the public speaking contest.", "options": ["A. would enter", "B. will enter", "C. enters", "D. entered"], "correctAnswer": "A. would enter", "explanation": "Mệnh đề chính câu điều kiện loại 2: 'would + V-bare' (would enter)."},
    {"id": "u9-g3", "question": "The English language, _____ has borrowed words from over 300 languages, is constantly evolving.", "options": ["A. which", "B. that", "C. who", "D. whose"], "correctAnswer": "A. which", "explanation": "Mệnh đề không xác định sau dấu phẩy bổ nghĩa cho 'The English language': dùng 'which' (không dùng that)."},
    {"id": "u9-g4", "question": "If I _____ you, I would listen to English podcasts every morning on the bus.", "options": ["A. were", "B. am", "C. will be", "D. have been"], "correctAnswer": "A. were", "explanation": "Cấu trúc đưa ra lời khuyên: 'If I were you, I would...'"},
    {"id": "u9-g5", "question": "The international student _____ presentation on cultural diversity won first prize is from Canada.", "options": ["A. whose", "B. who", "C. which", "D. that"], "correctAnswer": "A. whose", "explanation": "Đại từ sở hữu 'whose presentation' (bài thuyết trình của sinh viên đó)."},
    {"id": "u9-g6", "question": "What would you do if you _____ an opportunity to study at Oxford University?", "options": ["A. received", "B. receive", "C. will receive", "D. have received"], "correctAnswer": "A. received", "explanation": "Mệnh đề If điều kiện loại 2: 'received'."},
    {"id": "u9-g7", "question": "Mr. David, _____ is our beloved foreign English instructor, has lived in Viet Nam for five years.", "options": ["A. who", "B. that", "C. which", "D. whom"], "correctAnswer": "A. who", "explanation": "Mệnh đề không xác định sau tên riêng 'Mr. David': dùng 'who' (không dùng that)."},
    {"id": "u9-g8", "question": "If we _____ a common lingua franca, cross-cultural communication would be much harder.", "options": ["A. didn't have", "B. don't have", "C. won't have", "D. hadn't had"], "correctAnswer": "A. didn't have", "explanation": "Phủ định thì Quá khứ đơn trong mệnh đề If loại 2: 'didn't have'."},
    {"id": "u9-g9", "question": "The mobile app _____ helps me memorize 20 new vocabulary words daily is very user-friendly.", "options": ["A. which", "B. who", "C. whom", "D. whose"], "correctAnswer": "A. which", "explanation": "'which' làm chủ ngữ thay cho danh từ chỉ vật 'The mobile app'."},
    {"id": "u9-g10", "question": "If Nam studied in London, he _____ many different British dialects and regional accents.", "options": ["A. could experience", "B. can experience", "C. will experience", "D. experiences"], "correctAnswer": "A. could experience", "explanation": "Mệnh đề chính loại 2: 'could experience'."},
    {"id": "u9-g11", "question": "The library _____ students practice speaking in English every weekend is open until 9 PM.", "options": ["A. where", "B. which", "C. who", "D. whose"], "correctAnswer": "A. where", "explanation": "'where' chỉ nơi chốn nơi học sinh luyện nói tiếng Anh."},
    {"id": "u9-g12", "question": "If I lived in an English-speaking country, my conversational fluency _____ rapidly.", "options": ["A. would improve", "B. will improve", "C. improves", "D. improved"], "correctAnswer": "A. would improve", "explanation": "'would improve' trong mệnh đề chính điều kiện loại 2."},
    {"id": "u9-g13", "question": "Shakespeare, _____ plays are studied across the globe, introduced thousands of words to English.", "options": ["A. whose", "B. who", "C. which", "D. that"], "correctAnswer": "A. whose", "explanation": "'whose plays' (những vở kịch của Shakespeare)."},
    {"id": "u9-g14", "question": "If my brother _____ taller, he could become an international flight attendant.", "options": ["A. were", "B. is", "C. will be", "D. has been"], "correctAnswer": "A. were", "explanation": "'were' trong mệnh đề If loại 2."},
    {"id": "u9-g15", "question": "Students _____ immerse themselves in English podcasts improve their listening comprehension quickly.", "options": ["A. who", "B. which", "C. whom", "D. whose"], "correctAnswer": "A. who", "explanation": "'who' làm chủ ngữ thay cho danh từ chỉ người 'Students'."},
    {"id": "u9-g16", "question": "If we possessed a magic translation device, we _____ not need to study foreign languages.", "options": ["A. would", "B. will", "C. can", "D. shall"], "correctAnswer": "A. would", "explanation": "Điều kiện loại 2: 'would not need'."},
    {"id": "u9-g17", "question": "Ha Noi, _____ is the capital of Viet Nam, hosts many international cultural exchange festivals.", "options": ["A. which", "B. that", "C. where", "D. who"], "correctAnswer": "A. which", "explanation": "Mệnh đề không xác định sau tên riêng 'Ha Noi' làm chủ ngữ cho 'is': dùng 'which'."},
    {"id": "u9-g18", "question": "If you could master any foreign language overnight, which one _____ you choose?", "options": ["A. would", "B. will", "C. do", "D. did"], "correctAnswer": "A. would", "explanation": "Câu hỏi điều kiện loại 2: 'which one would you choose?'"},
    {"id": "u9-g19", "question": "The teacher _____ phonetic pronunciation lessons we love will retire next month.", "options": ["A. whose", "B. who", "C. which", "D. that"], "correctAnswer": "A. whose", "explanation": "'whose phonetic lessons' (những bài giảng phát âm của cô giáo đó)."},
    {"id": "u9-g20", "question": "If there _____ no internet, learning foreign languages would be significantly harder.", "options": ["A. were", "B. is", "C. was", "D. will be"], "correctAnswer": "A. were", "explanation": "'If there were no internet' (giả định không có thật ở hiện tại)."}
]

u9_listening_info = {
    "audioTitle": "Tiếng Anh Toàn Cầu & Lợi Ích Của Việc Học Ngoại Ngữ (English as a Global Lingua Franca)",
    "audioDuration": "3:20",
    "audioScriptSpeaker": "Teacher Mr. David & Student Mai",
    "transcriptText": "Mai: Teacher David, why is English spoken by so many millions of non-native speakers across every continent?\nMr. David: Great question, Mai! English has established itself as the global lingua franca for international science, aviation, commerce, and digital technology.\nMai: If I were completely fluent in English, what career possibilities would open up for me?\nMr. David: You could work as an international diplomat, a cross-border software engineer, or a global journalist! Furthermore, mastering English allows you to access more than half of the world's academic research and literature.\nMai: Which methods do you recommend for accelerating vocabulary acquisition?\nMr. David: I suggest reading English novels with a pocket dictionary, shadowing native podcasts, and speaking fearlessly without worrying about making mistakes!",
    "vietnameseTranslation": "Mai: Thưa thầy David, tại sao tiếng Anh lại được hàng trăm triệu người không phải bản xứ sử dụng trên khắp mọi châu lục ạ?\nThầy David: Câu hỏi rất hay, Mai! Tiếng Anh đã khẳng định vị thế là ngôn ngữ chung toàn cầu trong khoa học quốc tế, hàng không, thương mại và công nghệ kỹ thuật số.\nMai: Nếu em thành thạo tiếng Anh hoàn toàn, những cơ hội nghề nghiệp nào sẽ mở ra cho em ạ?\nThầy David: Em có thể làm việc như một nhà ngoại giao quốc tế, một kỹ sư phần mềm xuyên biên giới, hoặc một nhà báo toàn cầu! Hơn nữa, làm chủ tiếng Anh cho phép em tiếp cận hơn một nửa các nghiên cứu học thuật và văn học trên thế giới.\nMai: Thầy khuyên nên dùng phương pháp nào để đẩy nhanh việc tiếp thu từ vựng ạ?\nThầy David: Thầy khuyên nên đọc tiểu thuyết tiếng Anh với cuốn từ điển bỏ túi, luyện nói nhại theo các kênh podcast của người bản xứ và hãy tự tin giao tiếp mà không sợ mắc lỗi sai!"
}

u9_listening_qs = [
    {"id": "u9-l1", "question": "What role has English established globally according to Mr. David?", "options": ["A. The global lingua franca for science, aviation, commerce, and technology", "B. A language spoken only in one village", "C. A secret code for pilots only", "D. An ancient forgotten tongue"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'the global lingua franca for international science, aviation, commerce, and digital technology.'"},
    {"id": "u9-l2", "question": "Which international careers did Mr. David mention for fluent English speakers?", "options": ["A. International diplomat, cross-border software engineer, or global journalist", "B. Train mechanic only", "C. Deep sea fisherman only", "D. Street sweeper"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'international diplomat, a cross-border software engineer, or a global journalist!'"},
    {"id": "u9-l3", "question": "How much of the world's academic research and literature can be accessed in English?", "options": ["A. More than half of the world's research", "B. Less than one percent", "C. Zero percent", "D. Exactly five books"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'access more than half of the world's academic research and literature.'"},
    {"id": "u9-l4", "question": "What vocabulary learning method does Mr. David suggest?", "options": ["A. Reading English novels with a pocket dictionary and shadowing native podcasts", "B. Copying words once and never reading again", "C. Playing video games in silence", "D. Avoiding all books"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'reading English novels with a pocket dictionary, shadowing native podcasts.'"},
    {"id": "u9-l5", "question": "What mindset does Mr. David encourage regarding speaking mistakes?", "options": ["A. Speaking fearlessly without worrying about making mistakes", "B. Never speaking unless you are 100% perfect", "C. Staying silent forever", "D. Paying fines when making mistakes"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'speaking fearlessly without worrying about making mistakes!'"},
    {"id": "u9-l6", "question": "Who is participating in this dialogue with Mai?", "options": ["A. Teacher Mr. David", "B. A tour bus driver", "C. A bank teller", "D. A flight attendant"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'Teacher Mr. David & Student Mai.'"},
    {"id": "u9-l7", "question": "In which fields is English the primary lingua franca?", "options": ["A. International science, aviation, commerce, and technology", "B. Local street cooking only", "C. Hand carpentry only", "D. Fishing net repair"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'science, aviation, commerce, and digital technology.'"},
    {"id": "u9-l8", "question": "What is the tone of Mr. David's advice to Mai?", "options": ["A. Encouraging, inspiring, and supportive", "B. Angry and demanding", "C. Bored and uninterested", "D. Sarcastic"], "correctAnswerIndex": 0, "explanation": "Thầy David đưa ra những lời khuyên tràn đầy động lực, khích lệ và truyền cảm hứng."}
]

u9_listening_fibs = [
    {"id": "u9-f1", "sentenceWithBlank": "English acts as the global _____ franca for science.", "correctWord": "lingua", "hint": "Từ đầu tiên trong thuật ngữ 'ngôn ngữ chung' (lingua franca)"},
    {"id": "u9-f2", "sentenceWithBlank": "Mastering English opens up international _____ opportunities.", "correctWord": "career", "hint": "Nghề nghiệp và cơ hội việc làm"},
    {"id": "u9-f3", "sentenceWithBlank": "Learners should shadow podcasts recorded by _____ speakers.", "correctWord": "native", "hint": "Người bản xứ nói tiếng mẹ đẻ"},
    {"id": "u9-f4", "sentenceWithBlank": "Students should speak English _____ without fear of mistakes.", "correctWord": "fearlessly", "hint": "Một cách dũng cảm, tự tin không sợ hãi"}
]

# Speaking prompts for Unit 9 (20 items)
u9_speaking = [
    {"id": f"u9-s{i+1}", "targetSentence": s, "ipa": ipa, "vietnameseMeaning": vm, "contextSituation": ctx, "keyPhonicsFocus": kpf, "sampleAudioText": s}
    for i, (s, ipa, vm, ctx, kpf) in enumerate([
        ("If I were fluent in English, I could confidently communicate with friends from every corner of the world.", "/ɪf aɪ wɜː ˈfluːənt ɪn ˈɪŋɡlɪʃ aɪ kʊd ˈkɒnfɪdəntli kəˈmjuːnɪkeɪt wɪð frɛndz frɒm ˈɛvri ˈkɔːnər ɒv ðə wɜːld/", "Nếu tôi thành thạo tiếng Anh, tôi có thể tự tin giao tiếp với bạn bè từ khắp mọi nơi trên thế giới.", "Luyện nói câu điều kiện loại 2 về ước mơ giao tiếp quốc tế.", "Phát âm chuẩn cấu trúc 'If I were fluent... I could confidently...'."),
        ("English, which serves as a global lingua franca, connects diverse nations through science, commerce, and culture.", "/ˈɪŋɡlɪʃ wɪʧ sɜːvz æz ə ˈɡləʊbəl ˈlɪŋɡwə ˈfræŋkə kəˈnɛkts daɪˈvɜːs ˈneɪʃənz θruː ˈsaɪəns ˈkɒmɜːs ænd ˈkʌlʧə/", "Tiếng Anh, ngôn ngữ đóng vai trò là ngôn ngữ chung toàn cầu, kết nối các quốc gia thông qua khoa học, thương mại và văn hóa.", "Thuyết trình về tầm quan trọng của tiếng Anh.", "Phát âm chuẩn mệnh đề không xác định 'which serves as a global lingua franca'."),
        ("Shadowing native audio podcasts daily helps learners master authentic pronunciation and natural sentence intonation.", "/ˈʃædəʊɪŋ ˈneɪtɪv ˈɔːdɪˌəʊ ˈpɒdkɑːsts ˈdeɪli hɛlps ˈlɜːnəz ˈmɑːstər ɔːˈθɛntɪk prəˌnʌnsɪˈeɪʃən ænd ˈnæʧrəl ˈsɛntəns ˌɪntəʊˈneɪʃən/", "Luyện nói nhại theo các kênh podcast bản xứ hàng ngày giúp người học làm chủ phát âm chuẩn xác và ngữ điệu câu tự nhiên.", "Chia sẻ phương pháp tự học phát âm.", "Phát âm chuẩn từ 'shadowing' /ˈʃædəʊɪŋ/ và 'intonation'."),
        ("If you had the chance to study abroad in an English-speaking country, which university would you select?", "/ɪf juː hæd ðə ʧɑːns tuː ˈstʌdi əˈbrɔːd ɪn ən ˈɪŋɡlɪʃ-ˈspiːkɪŋ ˈkʌntri wɪʧ ˌjuːnɪˈvɜːsɪti wʊd juː sɪˈlɛkt/", "Nếu bạn có cơ hội đi du học ở một quốc gia nói tiếng Anh, bạn sẽ chọn trường đại học nào?", "Đặt câu hỏi giao lưu điều kiện loại 2.", "Phát âm chuẩn câu hỏi điều kiện 'which university would you select?'."),
        ("Reading English literature with a pocket dictionary accelerates vocabulary acquisition and critical thinking.", "/ˈriːdɪŋ ˈɪŋɡlɪʃ ˈlɪtərɪʧə wɪð ə ˈpɒkɪt ˈdɪkʃənəri əkˈsɛləreɪts vəˈkæbjʊləri ˌækwɪˈzɪʃən ænd ˈkrɪtɪkəl ˈθɪŋkɪŋ/", "Đọc tác phẩm văn học tiếng Anh với một cuốn từ điển bỏ túi giúp đẩy nhanh quá trình tiếp thu từ vựng và tư duy phản biện.", "Khuyên đọc sách ngoại văn.", "Phát âm chuẩn từ 'acquisition' /ˌækwɪˈzɪʃən/ và 'literature'."),
        ("Our foreign instructor Mr. David, whose pronunciation lessons are vivid and engaging, inspires everyone.", "/ˈaʊə ˈfɒrɪn ɪnˈstrʌktə ˈmɪstə ˈdeɪvɪd huːz prəˌnʌnsɪˈeɪʃən ˈlɛsnz ɑː ˈvɪvɪd ænd ɪnˈɡeɪʤɪŋ ɪnˈspaɪəz ˈɛvrɪwʌn/", "Thầy giáo người nước ngoài của chúng tôi - thầy David, người có các bài học phát âm rất sinh động và lôi cuốn, truyền cảm hứng cho tất cả mọi người.", "Khen ngợi thầy giáo ngoại ngữ.", "Phát âm chuẩn đại từ quan hệ sở hữu 'whose pronunciation lessons'."),
        ("If there were no language barriers, humanity could cooperate more effectively to solve global crises.", "/ɪf ðeə wɜː nəʊ ˈlæŋɡwɪʤ ˈbærɪəz hjuːˈmænɪti kʊd kəʊˈɒpəreɪt mɔːr ɪˈfɛktɪvli tuː sɒlv ˈɡləʊbəl ˈkraɪsiːz/", "Nếu không có rào cản ngôn ngữ, nhân loại có thể hợp tác hiệu quả hơn để giải quyết các cuộc khủng hoảng toàn cầu.", "Nói về sức mạnh của ngôn ngữ trong hòa bình thế giới.", "Phát âm chuẩn từ 'barriers' /ˈbærɪəz/ và 'cooperate'."),
        ("Watching English films with original subtitles is an entertaining method to pick up contemporary idioms.", "/ˈwɒʧɪŋ ˈɪŋɡlɪʃ fɪlmz wɪð əˈrɪʤɪnl ˈsʌbˌtaɪtlz ɪz ən ˌɛntəˈteɪnɪŋ ˈmɛθəd tuː pɪk ʌp kənˈtɛmpərəri ˈɪdɪəmz/", "Xem phim tiếng Anh có phụ đề gốc là phương pháp thú vị để học các thành ngữ đương đại.", "Gợi ý cách học tiếng Anh qua phim ảnh.", "Phát âm chuẩn từ 'contemporary' /kənˈtɛmpərəri/ và 'subtitles'."),
        ("The international conference which brought together scientists from forty nations conducted all discussions in English.", "/ði ˌɪntəˈnæʃənl ˈkɒnfərəns wɪʧ brɔːt təˈɡɛðə ˈsaɪəntɪsts frɒm ˈfɔːti ˈneɪʃənz kənˈdʌktɪd ɔːl dɪsˈkʌʃənz ɪn ˈɪŋɡlɪʃ/", "Hội nghị quốc tế quy tụ các nhà khoa học từ 40 quốc gia đã tiến hành mọi cuộc thảo luận bằng tiếng Anh.", "Nêu vai trò của tiếng Anh trong học thuật.", "Phát âm chuẩn đại từ 'which brought together'."),
        ("If I spoke multiple foreign languages fluently, I would work as an interpreter for the United Nations.", "/ɪf aɪ spəʊk ˈmʌltɪpl ˈfɒrɪn ˈlæŋɡwɪʤɪz ˈfluːəntli aɪ wʊd wɜːk æz ən ɪnˈtɜːprɪtə fɔː ðə jʊˈnaɪtɪd ˈneɪʃənz/", "Nếu tôi nói được nhiều ngoại ngữ trôi chảy, tôi sẽ làm việc như một phiên dịch viên cho Liên Hợp Quốc.", "Bày tỏ ước mơ nghề nghiệp phiên dịch.", "Phát âm chuẩn từ 'interpreter' /ɪnˈtɜːprɪtə/."),
        ("Embracing diverse English accents from around the world enriches our cross-cultural empathy and communication.", "/ɪmˈbreɪsɪŋ daɪˈvɜːs ˈɪŋɡlɪʃ ˈæksənts frɒm əˈraʊnd ðə wɜːld ɪnˈrɪʧɪz ˈaʊə krɒs-ˈkʌlʧərəl ˈɛmpəθi ænd kəˌmjuːnɪˈkeɪʃən/", "Đón nhận các chất giọng tiếng Anh đa dạng trên thế giới làm phong phú thêm sự thấu cảm và giao tiếp xuyên văn hóa của chúng ta.", "Tôn trọng sự đa dạng ngữ âm.", "Phát âm chuẩn từ 'empathy' /ˈɛmpəθi/ và 'accents'."),
        ("Students who practice speaking English without fear of making mistakes achieve fluency much faster.", "/ˈstjuːdənts huː ˈpræktɪs ˈspiːkɪŋ ˈɪŋɡlɪʃ wɪˈðaʊt fɪər ɒv ˈmeɪkɪŋ mɪsˈteɪks əˈʧiːv ˈfluːənsi mʌʧ ˈfɑːstə/", "Những học sinh luyện nói tiếng Anh mà không sợ mắc lỗi sẽ đạt được sự trôi chảy nhanh hơn rất nhiều.", "Khuyên bạn tự tin luyện nói.", "Phát âm chuẩn đại từ quan hệ 'who practice speaking'."),
        ("If our school organized an annual English debate competition, more students would hone their public speaking.", "/ɪf ˈaʊə skuːl ˈɔːɡənaɪzd ən ˈænjʊəl ˈɪŋɡlɪʃ dɪˈbeɪt ˌkɒmpɪˈtɪʃən mɔː ˈstjuːdənts wʊd həʊn ðeə ˈpʌblɪk ˈspiːkɪŋ/", "Nếu trường chúng ta tổ chức cuộc thi tranh biện tiếng Anh hàng năm, nhiều học sinh sẽ trau dồi được kỹ năng thuyết trình trước đám đông.", "Đề xuất hoạt động ngoại khóa.", "Phát âm chuẩn từ 'debate' /dɪˈbeɪt/ và 'hone' /həʊn/."),
        ("Learning the International Phonetic Alphabet enables students to pronounce new vocabulary with total accuracy.", "/ˈlɜːnɪŋ ði ˌɪntəˈnæʃənl fəˈnɛtɪk ˈælfəbɛt ɪˈneɪblz ˈstjuːdənts tuː prəˈnaʊns njuː vəˈkæbjʊləri wɪð ˈtəʊtl ˈækjʊrəsi/", "Học bảng Ký hiệu Ngữ âm Quốc tế giúp học sinh phát âm từ vựng mới với độ chính xác tuyệt đối.", "Nhấn mạnh vai trò của bảng phiên âm IPA.", "Phát âm chuẩn từ 'Alphabet' /ˈælfəbɛt/ và 'accuracy' /ˈækjʊrəsi/."),
        ("The digital translation software which uses artificial intelligence helps bridge immediate language divides.", "/ðə ˈdɪʤɪtl trænsˈleɪʃən ˈsɒftweə wɪʧ ˈjuːzɪz ˌɑːtɪˈfɪʃəl ɪnˈtɛlɪʤəns hɛlps brɪʤ ɪˈmiːdiət ˈlæŋɡwɪʤ dɪˈvaɪdz/", "Phần mềm dịch kỹ thuật số sử dụng trí tuệ nhân tạo giúp xóa nhòa những rào cản ngôn ngữ tức thời.", "Nói về ứng dụng AI trong dịch thuật.", "Phát âm chuẩn cụm từ 'artificial intelligence'."),
        ("If I knew how to write academic English essays effectively, I could publish research in global journals.", "/ɪf aɪ njuː haʊ tuː raɪt ˌækəˈdɛmɪk ˈɪŋɡlɪʃ ˈɛseɪz ɪˈfɛktɪvli aɪ kʊd ˈpʌblɪʃ rɪˈsɜːʧ ɪn ˈɡləʊbəl ˈʤɜːnlz/", "Nếu tôi biết cách viết các bài luận tiếng Anh học thuật hiệu quả, tôi có thể xuất bản nghiên cứu trên các tạp chí quốc tế.", "Ước mơ nghiên cứu khoa học.", "Phát âm chuẩn tính từ 'academic' /ˌækəˈdɛmɪk/ và 'journals'."),
        ("Hanoi University, where hundreds of multilingual translators graduate annually, is a center of excellence.", "/hæˈnɔɪ ˌjuːnɪˈvɜːsɪti weə ˈhʌndrədz ɒv ˌmʌltɪˈlɪŋɡwəl trænsˈleɪtəz ˈɡræʤʊeɪt ˈænjʊəli ɪz ə ˈsɛntər ɒv ˈɛksələns/", "Đại học Hà Nội, nơi hàng trăm biên phiên dịch viên đa ngôn ngữ tốt nghiệp hàng năm, là một trung tâm đào tạo xuất sắc.", "Giới thiệu cơ sở đào tạo ngoại ngữ.", "Phát âm chuẩn từ 'multilingual' /ˌmʌltɪˈlɪŋɡwəl/."),
        ("Consistency and curiosity are the two golden keys that unlock foreign language mastery.", "/kənˈsɪstənsi ænd ˌkjʊərɪˈɒsɪti ɑː ðə tuː ˈɡəʊldən kiːz ðæt ʌnˈlɒk ˈfɒrɪn ˈlæŋɡwɪʤ ˈmɑːstəri/", "Sự kiên trì và niềm tò mò học hỏi là hai chiếc chìa khóa vàng mở ra sự tinh thông ngoại ngữ.", "Lời khuyên đúc kết phương pháp học tập.", "Phát âm chuẩn từ 'consistency' /kənˈsɪstənsi/ và 'curiosity' /ˌkjʊərɪˈɒsɪti/."),
        ("Practicing short English conversations with your classmates every single day builds lasting communicative confidence.", "/ˈpræktɪsɪŋ ʃɔːt ˈɪŋɡlɪʃ ˌkɒnvəˈseɪʃənz wɪð jɔː ˈklɑːsmeɪts ˈɛvri ˈsɪŋɡl deɪ bɪldz ˈlɑːstɪŋ kəˈmjuːnɪkətɪv ˈkɒnfɪdəns/", "Luyện các đoạn hội thoại tiếng Anh ngắn với bạn cùng lớp mỗi ngày xây dựng sự tự tin giao tiếp bền vững.", "Khuyến khích lập nhóm học tập.", "Phát âm chuẩn từ 'communicative' /kəˈmjuːnɪkətɪv/."),
        ("May your English learning journey open limitless doors to knowledge, friendship, and international success.", "/meɪ jɔːr ˈɪŋɡlɪʃ ˈlɜːnɪŋ ˈʤɜːni ˈəʊpən ˈlɪmɪtlɪs dɔːz tuː ˈnɒlɪʤ ˈfrɛndʃɪp ænd ˌɪntəˈnæʃənl səkˈsɛs/", "Chúc hành trình học tiếng Anh của bạn mở ra những cánh cửa vô tận đến với tri thức, tình bạn và thành công quốc tế.", "Lời chúc ý nghĩa dành cho người học tiếng Anh.", "Phát âm chuẩn từ 'limitless' /ˈlɪmɪtlɪs/ và 'success'.")
    ])
]

u9_reading_info = {
    "title": "Tiếng Anh Toàn Cầu: Nhịp Cầu Tri Thức & Hội Nhập Thế Giới",
    "topic": "Vai trò của Tiếng Anh như ngôn ngữ chung quốc tế & Phương pháp học tập",
    "passageText": "In the modern era of globalization, the English language occupies an unparalleled position as the global lingua franca. With over 1.5 billion speakers worldwide—the vast majority of whom learned it as a second or foreign language—English serves as the indispensable communication medium for global commerce, aviation, diplomacy, scientific innovation, and the internet. More than half of the world's academic research and digital content is published in English.\n\nThe global spread of English has also given rise to diverse regional varieties and accents, from British and American English to Australian, Indian, and Singaporean English. Rather than viewing these variations as deviations, linguists celebrate them as reflections of vibrant cultural adaptations. In international business and diplomacy, intelligibility and mutual clarity take precedence over rigid adherence to any single accent.\n\nFor young Vietnamese students, mastering English is not merely an academic requirement; it is a transformative passport to global scholarship, cross-cultural collaboration, and prestigious careers. Combining dedicated daily practice, immersion through digital media, and fearless communicative interaction enables learners to achieve fluency and represent their nation with pride on the international stage.",
    "keyVocabularyHighlights": [
        {"word": "unparalleled position", "meaning": "vị thế độc tôn, không có gì sánh bằng"},
        {"word": "intelligibility and clarity", "meaning": "khả năng nghe hiểu và sự rõ ràng rành mạch"},
        {"word": "transformative passport", "meaning": "tấm hộ chiếu thay đổi tương lai"},
        {"word": "fearless interaction", "meaning": "sự giao tiếp tự tin, không sợ hãi"}
    ]
}

u9_reading_qs = [
    {"id": "u9-r1", "question": "How many English speakers are there worldwide according to the passage?", "options": ["A. Over 1.5 billion speakers", "B. Exactly ten thousand", "C. Fifty million", "D. Only five hundred"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 1: 'With over 1.5 billion speakers worldwide.'"},
    {"id": "u9-r2", "question": "In which global domains does English serve as an indispensable communication medium?", "options": ["A. Commerce, aviation, diplomacy, scientific innovation, and the internet", "B. Ancient stone carving only", "C. Island fishing only", "D. Hand embroidery only"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 1: 'for global commerce, aviation, diplomacy, scientific innovation, and the internet.'"},
    {"id": "u9-r3", "question": "How much of the world's academic research and digital content is published in English?", "options": ["A. More than half of the world's research and digital content", "B. Less than one percent", "C. Zero percent", "D. Exactly three articles"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 1: 'More than half of the world's academic research and digital content is published in English.'"},
    {"id": "u9-r4", "question": "How do modern linguists view diverse regional varieties and accents of English?", "options": ["A. As reflections of vibrant cultural adaptations", "B. As dangerous errors that must be punished", "C. As useless noises", "D. As completely identical"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'linguists celebrate them as reflections of vibrant cultural adaptations.'"},
    {"id": "u9-r5", "question": "What takes precedence over rigid adherence to a single accent in international communication?", "options": ["A. Intelligibility and mutual clarity", "B. Speaking as fast as possible", "C. Using obscure words", "D. Staying silent"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'intelligibility and mutual clarity take precedence over rigid adherence to any single accent.'"},
    {"id": "u9-r6", "question": "Why is mastering English described as a 'transformative passport' for Vietnamese youth?", "options": ["A. Because it unlocks global scholarships, cross-border collaboration, and prestigious careers", "B. Because it is made of paper", "C. Because it allows them to buy free train tickets", "D. Because it has photos"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'a transformative passport to global scholarship, cross-cultural collaboration, and prestigious careers.'"},
    {"id": "u9-r7", "question": "Which word in paragraph 1 is closest in meaning to 'unparalleled'?", "options": ["A. Matchless, exceptional, and unrivaled", "B. Weak and ordinary", "C. Forgotten", "D. Small"], "correctAnswerIndex": 0, "explanation": "'Unparalleled' có nghĩa là vô song, vượt trội không gì sánh bằng."},
    {"id": "u9-r8", "question": "Which word in paragraph 2 is closest in meaning to 'precedence'?", "options": ["A. Priority or greater importance", "B. Low rank", "C. Delay", "D. Danger"], "correctAnswerIndex": 0, "explanation": "'Take precedence' có nghĩa là được ưu tiên, coi trọng hơn."},
    {"id": "u9-r9", "question": "What learning habits help students achieve fluency according to paragraph 3?", "options": ["A. Daily practice, digital media immersion, and fearless communication", "B. Memorizing grammar rules without ever speaking", "C. Refusing to listen to native audio", "D. Speaking only in native language"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'dedicated daily practice, immersion through digital media, and fearless communicative interaction.'"},
    {"id": "u9-r10", "question": "What is the best overall title for this reading passage?", "options": ["A. Global English: A Bridge to Knowledge & International Integration", "B. The Decline of World Literature", "C. How to Build Digital Television Networks", "D. The History of Ancient Latin Words"], "correctAnswerIndex": 0, "explanation": "Toàn bài đọc làm nổi bật vị thế nhịp cầu tri thức và hội nhập thế giới của tiếng Anh."}
]

u9_writing_prompts = [
    {
        "id": "u9-w1",
        "title": "Đề 1: Write a paragraph about why English is important in the modern world (60-80 words)",
        "description": "Viết một đoạn văn nêu tầm quan trọng của tiếng Anh trong thế giới hiện đại và thời kỳ hội nhập quốc tế.",
        "suggestedOutline": [
            "Introduction: State that English is the undisputed global lingua franca.",
            "Body: Mention its role in education, technology, commerce, and international communication.",
            "Conclusion: Emphasize that English empowers young people to reach their potential."
        ],
        "usefulPhrases": [
            "In today's interconnected world, English plays an indispensable role...",
            "It serves as the primary language for science, technology, and global business...",
            "Mastering English opens up access to global knowledge and prestigious scholarships...",
            "It empowers young people to become confident global citizens."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "In today's interconnected world, English plays an indispensable role as the global lingua franca. It is the primary language used in international aviation, scientific research, global trade, and digital media. Mastering English enables students to access vast academic libraries, earn international scholarships, and collaborate with multinational teams. Furthermore, it bridges cultural divides, allowing young people to communicate with confidence and become dynamic global citizens."
    },
    {
        "id": "u9-w2",
        "title": "Đề 2: Write a paragraph describing your favorite method to learn English vocabulary (60-80 words)",
        "description": "Viết một đoạn văn chia sẻ phương pháp học từ vựng tiếng Anh mà em thấy hiệu quả và yêu thích nhất.",
        "suggestedOutline": [
            "Introduction: Introduce your preferred vocabulary learning method (reading books, flashcard apps, watching videos).",
            "Body: Explain how you apply it daily (memorizing in context, reviewing with spaced repetition, making sample sentences).",
            "Conclusion: State how much your vocabulary has improved."
        ],
        "usefulPhrases": [
            "My favorite method for acquiring English vocabulary is using digital flashcard apps with spaced repetition...",
            "Every day, I learn ten new words in authentic example sentences rather than isolated definitions...",
            "I also listen to native audio clips to master accurate IPA pronunciation...",
            "This consistent habit has vastly expanded my lexical range and confidence."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "My favorite method for acquiring English vocabulary is using digital flashcard apps combined with extensive reading. Every day, I learn ten new words within complete example sentences rather than memorizing isolated definitions. I also listen carefully to native pronunciation and repeat the words out loud. Reviewing vocabulary using spaced repetition ensures long-term memory retention. This consistent habit has vastly expanded my vocabulary range and boosted my writing fluency."
    },
    {
        "id": "u9-w3",
        "title": "Đề 3: Write a paragraph on what you would do if you were completely fluent in English (60-80 words)",
        "description": "Viết một đoạn văn sử dụng câu điều kiện loại 2 để kể về những điều em sẽ làm nếu em thành thạo tiếng Anh hoàn toàn.",
        "suggestedOutline": [
            "Introduction: State the hypothesis: 'If I were completely fluent in English...'",
            "Body: Mention 2-3 specific ambitions (applying for a scholarship abroad, working as an international diplomat/programmer, traveling the world).",
            "Conclusion: Reaffirm your dedication to study hard to make that dream come true."
        ],
        "usefulPhrases": [
            "If I were completely fluent in English, many exciting doors would open for me...",
            "First, I would apply for a prestigious university scholarship in the United Kingdom...",
            "Second, I could work as a software engineer for an international tech company...",
            "I am determined to practice diligently every day to achieve this goal."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "If I were completely fluent in English, many exciting possibilities would open for me. First, I would confidently apply for a prestigious university scholarship in Australia to study computer science. Second, I could work as a software engineer for a global technology enterprise and collaborate with international experts. I would also travel independently around the globe to explore diverse cultures. I am determined to study diligently every day to turn this dream into reality."
    },
    {
        "id": "u9-w4",
        "title": "Đề 4: Write a paragraph giving advice on how to improve English listening skills (60-80 words)",
        "description": "Viết một đoạn văn đưa ra lời khuyên giúp bạn bè nâng cao kỹ năng nghe tiếng Anh.",
        "suggestedOutline": [
            "Introduction: State that improving English listening takes patience and regular practice.",
            "Body: Give practical tips (listening to podcasts on favorite topics, watching movies with subtitles, practicing shadowing).",
            "Conclusion: Encourage persistence for noticeable progress."
        ],
        "usefulPhrases": [
            "Improving your English listening skills requires consistency and the right techniques...",
            "First, you should listen to English podcasts on topics you genuinely enjoy for 20 minutes daily...",
            "Second, watching movies with English subtitles helps you connect sounds with spelling...",
            "Practicing shadowing technique will make your ear attuned to natural speech rhythms."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Improving your English listening skills requires consistent daily practice and the right strategies. First, you should listen to English podcasts or TED Talks on topics you love for twenty minutes every day. Second, watching movies with English subtitles helps you match spoken sounds with written words. Finally, practicing the shadowing technique trains your brain to recognize connected speech and natural intonation. With patience and persistence, your listening comprehension will improve dramatically."
    },
    {
        "id": "u9-w5",
        "title": "Đề 5: Write a paragraph about how English helps promote Vietnamese culture to the world (60-80 words)",
        "description": "Viết một đoạn văn nêu vai trò của tiếng Anh trong việc giới thiệu và quảng bá văn hóa, danh lam thắng cảnh Việt Nam ra bạn bè quốc tế.",
        "suggestedOutline": [
            "Introduction: State that English is a vital tool to introduce Vietnamese culture globally.",
            "Body: Explain how (explaining traditional customs, introducing delicacies like Pho and Banh mi, promoting heritage sites like Ha Long Bay).",
            "Conclusion: Express your pride in being a cultural ambassador for Viet Nam."
        ],
        "usefulPhrases": [
            "English serves as a powerful bridge to share Vietnamese culture with the world...",
            "With strong English skills, we can passionately introduce our delicious cuisine like Pho...",
            "We can also explain the profound historical significance of our UNESCO heritage landmarks...",
            "Being able to represent our beautiful fatherland internationally fills me with pride."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "English serves as a powerful bridge to introduce Vietnamese culture and tourism to international friends. With strong English skills, young Vietnamese can passionately explain our unique folklore, historic monuments like Hue Citadel, and famous culinary delicacies like Pho and banh mi. Furthermore, we can create multilingual travel blogs promoting our breathtaking natural wonders. Being able to represent our beautiful fatherland on global platforms fills me with boundless pride."
    }
]

unit9 = make_unit(9, "Unit 9: English in the World", "Tiếng Anh trên toàn cầu & Giao tiếp quốc tế", "Khám phá vai trò của Tiếng Anh toàn cầu, câu điều kiện loại 2 (Second Conditional) và mệnh đề quan hệ xác định / không xác định.", "Ngữ âm: Ngữ điệu câu điều kiện và phân biệt trọng âm các từ đồng âm khác nghĩa", "BookOpen", u9_vocab, u9_grammar_info, u9_grammar_exs, u9_listening_info, u9_listening_qs, u9_listening_fibs, u9_speaking, u9_reading_info, u9_reading_qs, u9_writing_prompts)
write_ts_unit(9, unit9)
print("Unit 9 generated successfully!")
