import json
from gen_unit_utils import make_unit, write_ts_unit

# ==============================================================================
# UNIT 5: EXPERIENCES (20 Vocab, 20 Grammar, 8 Listening MC + 4 FIB, 20 Speaking, 10 Reading, 5 Writing)
# ==============================================================================
u5_vocab = [
    {"id": "u5-v1", "word": "breathtaking", "phonetic": "/ˈbrɛθˌteɪkɪŋ/", "partOfSpeech": "adjective", "vietnameseMeaning": "đẹp ngoạn mục, choáng ngợp đến nghẹt thở", "englishExample": "Standing atop Mount Fansipan, we enjoyed breathtaking panoramas of swirling misty clouds.", "vietnameseExample": "Đứng trên đỉnh Fansipan, chúng tôi chiêm ngưỡng toàn cảnh ngoạn mục đến nghẹt thở của những làn mây bồng bềnh."},
    {"id": "u5-v2", "word": "scuba diving", "phonetic": "/ˈskuːbə ˈdaɪvɪŋ/", "partOfSpeech": "noun", "vietnameseMeaning": "lặn biển có bình dưỡng khí", "englishExample": "Scuba diving in Phu Quoc allowed us to swim among colorful coral reefs and exotic sea turtles.", "vietnameseExample": "Lặn biển có bình dưỡng khí ở Phú Quốc giúp chúng tôi bơi giữa những rạn san hô rực rỡ và những chú rùa biển quý hiếm."},
    {"id": "u5-v3", "word": "unforgettable", "phonetic": "/ˌʌnfəˈɡɛtəbl/", "partOfSpeech": "adjective", "vietnameseMeaning": "không thể nào quên, khắc sâu trong tâm trí", "englishExample": "Camping overnight in Son Doong Cave was an unforgettable lifetime adventure.", "vietnameseExample": "Cắm trại qua đêm trong Hang Sơn Đoòng là một chuyến phiêu lưu để đời không thể nào quên."},
    {"id": "u5-v4", "word": "volunteer trip", "phonetic": "/ˌvɒlənˈtɪə trɪp/", "partOfSpeech": "noun", "vietnameseMeaning": "chuyến đi tình nguyện, thiện nguyện", "englishExample": "Joining the summer volunteer trip to build highland libraries changed my life perspective.", "vietnameseExample": "Tham gia chuyến đi tình nguyện mùa hè để xây thư viện vùng cao đã thay đổi góc nhìn cuộc sống của tôi."},
    {"id": "u5-v5", "word": "paragliding", "phonetic": "/ˈpærəˌɡlaɪdɪŋ/", "partOfSpeech": "noun", "vietnameseMeaning": "môn dù lượn trên không", "englishExample": "Paragliding over the golden terraced fields of Mu Cang Chai is an exhilarating experience.", "vietnameseExample": "Bay dù lượn trên những thửa ruộng bậc thang vàng óng ở Mù Cang Chải là một trải nghiệm vô cùng phấn khích."},
    {"id": "u5-v6", "word": "fascinating", "phonetic": "/ˈfæsɪneɪtɪŋ/", "partOfSpeech": "adjective", "vietnameseMeaning": "hấp dẫn, lôi cuốn, quyến rũ", "englishExample": "The guide gave a fascinating lecture on deep-sea marine ecosystems.", "vietnameseExample": "Người hướng dẫn đã có một bài thuyết trình hấp dẫn về hệ sinh thái biển sâu."},
    {"id": "u5-v7", "word": "thrilling", "phonetic": "/ˈθrɪlɪŋ/", "partOfSpeech": "adjective", "vietnameseMeaning": "ly kỳ, hồi hộp, gay cấn", "englishExample": "White-water rafting along turbulent mountain rapids gave us a thrilling rush of adrenaline.", "vietnameseExample": "Chèo xuồng vượt thác ghềnh cuồn cuộn mang lại cho chúng tôi cảm giác hồi hộp đầy kích thích."},
    {"id": "u5-v8", "word": "homestay", "phonetic": "/ˈhəʊmsteɪ/", "partOfSpeech": "noun", "vietnameseMeaning": "hình thức lưu trú nhà dân bản địa", "englishExample": "Staying at a traditional Tay ethnic homestay gave us authentic cultural insights.", "vietnameseExample": "Nghỉ tại một homestay của người Tày bản địa mang lại cho chúng tôi những hiểu biết văn hóa chân thực."},
    {"id": "u5-v9", "word": "spectacular", "phonetic": "/spɛkˈtækjʊlə/", "partOfSpeech": "adjective", "vietnameseMeaning": "hùng vĩ, tráng lệ, ngoạn mục", "englishExample": "Ban Gioc Waterfall displayed a spectacular cascade of white foamy water into emerald lakes.", "vietnameseExample": "Thác Bản Giốc phô diễn một dòng thác trắng xóa hùng vĩ đổ xuống những hồ nước xanh ngọc bích."},
    {"id": "u5-v10", "word": "trekking", "phonetic": "/ˈtrɛkɪŋ/", "partOfSpeech": "noun", "vietnameseMeaning": "hoạt động đi bộ đường dài dã ngoại", "englishExample": "Three days of jungle trekking tested our endurance, navigation skills, and teamwork.", "vietnameseExample": "Ba ngày đi bộ xuyên rừng đã thử thách sức bền, kỹ năng định hướng và tinh thần đồng đội của chúng tôi."},
    {"id": "u5-v11", "word": "terraced field", "phonetic": "/ˈtɛrəst fiːld/", "partOfSpeech": "noun", "vietnameseMeaning": "ruộng bậc thang", "englishExample": "The ripe golden terraced fields in Sapa look like giant steps climbing up to the sky.", "vietnameseExample": "Những thửa ruộng bậc thang chín vàng ở Sa Pa trông như những bậc thang khổng lồ leo thẳng lên bầu trời."},
    {"id": "u5-v12", "word": "overcome fear", "phonetic": "/ˌəʊvəˈkʌm fɪə/", "partOfSpeech": "phrase", "vietnameseMeaning": "vượt qua nỗi sợ hãi", "englishExample": "Zip-lining across the deep jungle canyon helped me overcome my fear of heights.", "vietnameseExample": "Trượt zipline qua hẻm núi rừng sâu đã giúp tôi vượt qua nỗi sợ độ cao."},
    {"id": "u5-v13", "word": "campfire", "phonetic": "/ˈkæmpˌfaɪə/", "partOfSpeech": "noun", "vietnameseMeaning": "lửa trại", "englishExample": "We sang folk ballads and roasted sweet potatoes around the crackling campfire.", "vietnameseExample": "Chúng tôi hát những khúc tình ca dân gian và nướng khoai quanh ngọn lửa trại tí tách."},
    {"id": "u5-v14", "word": "kayaking", "phonetic": "/ˈkaɪækɪŋ/", "partOfSpeech": "noun", "vietnameseMeaning": "chèo thuyền kayak", "englishExample": "Kayaking through the limestone grottos of Ha Long Bay was serene and majestic.", "vietnameseExample": "Chèo thuyền kayak qua các hang động đá vôi ở Vịnh Hạ Long thật yên bình và kỳ vĩ."},
    {"id": "u5-v15", "word": "cultural immersion", "phonetic": "/ˈkʌlʧərəl ɪˈmɜːʃən/", "partOfSpeech": "noun", "vietnameseMeaning": "sự trải nghiệm hòa mình sâu sắc vào văn hóa", "englishExample": "Living with a local host family provided rich cultural immersion for young learners.", "vietnameseExample": "Sống cùng một gia đình bản địa đã mang lại trải nghiệm hòa mình văn hóa phong phú cho các bạn học sinh trẻ."},
    {"id": "u5-v16", "word": "adrenaline rush", "phonetic": "/əˈdrɛnəlɪn rʌʃ/", "partOfSpeech": "noun", "vietnameseMeaning": "cảm giác hưng phấn tột độ", "englishExample": "Bungee jumping off the coastal bridge provided an explosive adrenaline rush.", "vietnameseExample": "Nhảy bungee từ trên cây cầu ven biển mang lại cảm giác hưng phấn tột độ bùng nổ."},
    {"id": "u5-v17", "word": "hospitality", "phonetic": "/ˌhɒspɪˈtælɪti/", "partOfSpeech": "noun", "vietnameseMeaning": "lòng hiếu khách, sự đón tiếp nồng hậu", "englishExample": "We were deeply touched by the warm hospitality and generous smiles of the islanders.", "vietnameseExample": "Chúng tôi vô cùng xúc động trước lòng hiếu khách nồng hậu và những nụ cười hào sảng của người dân trên đảo."},
    {"id": "u5-v18", "word": "souvenir", "phonetic": "/ˌsuːvəˈnɪə/", "partOfSpeech": "noun", "vietnameseMeaning": "quà lưu niệm", "englishExample": "She bought handcrafted brocade scarves as souvenirs for her classmates.", "vietnameseExample": "Cô ấy đã mua những chiếc khăn thổ cẩm thủ công làm quà lưu niệm cho các bạn cùng lớp."},
    {"id": "u5-v19", "word": "milestone", "phonetic": "/ˈmaɪlstəʊn/", "partOfSpeech": "noun", "vietnameseMeaning": "cột mốc quan trọng trong đời", "englishExample": "Winning the national English speaking contest was a glorious milestone in his student life.", "vietnameseExample": "Đoạt giải quán quân cuộc thi hùng biện tiếng Anh toàn quốc là một cột mốc rực rỡ trong đời học sinh của anh ấy."},
    {"id": "u5-v20", "word": "enriching", "phonetic": "/ɪnˈrɪʧɪŋ/", "partOfSpeech": "adjective", "vietnameseMeaning": "làm phong phú thêm, bổ ích sâu sắc", "englishExample": "Traveling and meeting diverse people provides an enriching life experience.", "vietnameseExample": "Đi du lịch và gặp gỡ nhiều người mang lại một trải nghiệm sống vô cùng bổ ích."}
]

u5_grammar_info = {
    "title": "Thì Hiện Tại Hoàn Thành & Quá Khứ Đơn (Present Perfect vs Past Simple & Since/For/Ever/Never/Yet/Already)",
    "summary": "Phân biệt rõ thì Hiện tại hoàn thành (diễn tả trải nghiệm từng làm hoặc chưa từng làm tính đến nay, không có mốc thời gian cụ thể) và thì Quá khứ đơn (hành động đã kết thúc tại một thời điểm xác định trong quá khứ).",
    "formulaBox": [
        "Hiện tại hoàn thành: S + have/has + V-ed/V3 (kinh nghiệm, trải nghiệm)",
        "Ví dụ: Have you EVER tried scuba diving? - I have NEVER eaten durian.",
        "Ví dụ: She HAS ALREADY VISITED Son Doong Cave twice.",
        "Quá khứ đơn: S + V-ed/V2 (thời điểm cụ thể: yesterday, last year, in 2023, 3 days ago)",
        "Ví dụ: Last summer, we TRAVELED to Phu Quoc and TRIED paragliding."
    ],
    "usagePoints": [
        {"title": "1. Dấu hiệu trải nghiệm", "detail": "Dùng 'ever, never, already, yet, so far, several times' với Hiện tại hoàn thành.", "example": "Have you ever climbed Mount Fansipan?"},
        {"title": "2. Chuyển đổi giữa HTHT và QKĐ", "detail": "Khi câu hỏi hỏi về trải nghiệm chung dùng HTHT, nhưng khi kể chi tiết thời gian, địa điểm thì chuyển sang QKĐ.", "example": "Yes, I have. I climbed it last October with my father."}
    ]
}

u5_grammar_exs = [
    {"id": "u5-g1", "question": "Have you ever _____ paragliding over Mu Cang Chai terraced fields?", "options": ["A. tried", "B. try", "C. trying", "D. was tried"], "correctAnswer": "A. tried", "explanation": "Sau 'Have you ever' dùng quá khứ phân từ V3/V-ed 'tried'."},
    {"id": "u5-g2", "question": "Last October, our class _____ an unforgettable volunteer trip to Ha Giang.", "options": ["A. organized", "B. has organized", "C. have organized", "D. organizes"], "correctAnswer": "A. organized", "explanation": "Có mốc thời gian cụ thể trong quá khứ 'Last October' -> dùng Quá khứ đơn 'organized'."},
    {"id": "u5-g3", "question": "Mai has never _____ in an ancient ethnic stilt house before.", "options": ["A. stayed", "B. stays", "C. staying", "D. stay"], "correctAnswer": "A. stayed", "explanation": "'has never stayed' (Hiện tại hoàn thành)."},
    {"id": "u5-g4", "question": "We _____ in a cozy homestay when we traveled to Da Lat three years ago.", "options": ["A. stayed", "B. have stayed", "C. has stayed", "D. are staying"], "correctAnswer": "A. stayed", "explanation": "'three years ago' là thời điểm xác định trong quá khứ -> dùng 'stayed'."},
    {"id": "u5-g5", "question": "She _____ scuba diving three times in her life so far.", "options": ["A. has experienced", "B. experienced", "C. experiences", "D. was experiencing"], "correctAnswer": "A. has experienced", "explanation": "'three times... so far' diễn tả số lần trải nghiệm -> dùng HTHT 'has experienced'."},
    {"id": "u5-g6", "question": "Phong _____ Son Doong Cave last summer with his expedition team.", "options": ["A. explored", "B. has explored", "C. have explored", "D. explores"], "correctAnswer": "A. explored", "explanation": "'last summer' -> dùng Quá khứ đơn 'explored'."},
    {"id": "u5-g7", "question": "Have you finished packing your trekking backpack _____?", "options": ["A. yet", "B. already", "C. ever", "D. never"], "correctAnswer": "A. yet", "explanation": "'yet' đứng cuối câu hỏi hoặc câu phủ định trong thì HTHT."},
    {"id": "u5-g8", "question": "I have _____ seen such a breathtaking sunrise over the ocean.", "options": ["A. never", "B. ever", "C. yet", "D. ago"], "correctAnswer": "A. never", "explanation": "'have never seen' = chưa bao giờ nhìn thấy."},
    {"id": "u5-g9", "question": "They _____ to Ha Long Bay in 2022 and kayaked through Luon Cave.", "options": ["A. went", "B. have gone", "C. has gone", "D. go"], "correctAnswer": "A. went", "explanation": "'in 2022' là năm trong quá khứ -> dùng Quá khứ đơn 'went'."},
    {"id": "u5-g10", "question": "My older brother has worked as a tour guide _____ five years.", "options": ["A. for", "B. since", "C. ago", "D. in"], "correctAnswer": "A. for", "explanation": "'for + khoảng thời gian' (for five years)."},
    {"id": "u5-g11", "question": "We have participated in community beach cleanup campaigns _____ 2021.", "options": ["A. since", "B. for", "C. ago", "D. during"], "correctAnswer": "A. since", "explanation": "'since + mốc thời gian' (since 2021)."},
    {"id": "u5-g12", "question": "Did you _____ white-water rafting when you visited Da Lat last vacation?", "options": ["A. try", "B. tried", "C. have tried", "D. trying"], "correctAnswer": "A. try", "explanation": "Trong câu hỏi Quá khứ đơn: 'Did + S + V-bare?' -> 'Did you try'."},
    {"id": "u5-g13", "question": "I have _____ bought all the handcrafted souvenirs for my cousins.", "options": ["A. already", "B. yet", "C. ever", "D. ago"], "correctAnswer": "A. already", "explanation": "'have already bought' = đã mua xong rồi."},
    {"id": "u5-g14", "question": "When _____ you first witness the majestic Ban Gioc Waterfall?", "options": ["A. did", "B. have", "C. has", "D. do"], "correctAnswer": "A. did", "explanation": "Hỏi về thời điểm quá khứ cụ thể 'When did you first witness...'."},
    {"id": "u5-g15", "question": "They haven't climbed to the peak of Mount Fansipan _____.", "options": ["A. yet", "B. already", "C. ever", "D. never"], "correctAnswer": "A. yet", "explanation": "'haven't climbed... yet' = vẫn chưa leo lên đỉnh."},
    {"id": "u5-g16", "question": "This is the most thrilling adventure I have _____ experienced.", "options": ["A. ever", "B. never", "C. yet", "D. ago"], "correctAnswer": "A. ever", "explanation": "Cấu trúc so sánh nhất: 'the most thrilling adventure I have ever experienced'."},
    {"id": "u5-g17", "question": "We _____ our tent beside the mountain stream two hours ago.", "options": ["A. pitched", "B. have pitched", "C. pitch", "D. are pitching"], "correctAnswer": "A. pitched", "explanation": "'two hours ago' -> Quá khứ đơn 'pitched'."},
    {"id": "u5-g18", "question": "How many times _____ you visited Hue Imperial City?", "options": ["A. have", "B. did", "C. were", "D. had"], "correctAnswer": "A. have", "explanation": "Hỏi về số lần trải nghiệm: 'How many times have you visited...'."},
    {"id": "u5-g19", "question": "Yesterday evening, the campers _____ folk songs around the campfire.", "options": ["A. sang", "B. have sung", "C. sing", "D. has sung"], "correctAnswer": "A. sang", "explanation": "'Yesterday evening' -> Quá khứ đơn 'sang'."},
    {"id": "u5-g20", "question": "She _____ in a zip-lining contest before, so she felt nervous.", "options": ["A. had never participated", "B. has never participated", "C. never participates", "D. not participated"], "correctAnswer": "B. has never participated", "explanation": "'has never participated... before' diễn tả kinh nghiệm chưa từng tham gia."}
]

u5_listening_info = {
    "audioTitle": "Những Trải Nghiệm Khám Phá Kỳ Thú (Exciting Travel Experiences)",
    "audioDuration": "3:15",
    "audioScriptSpeaker": "Backpacker Daniel & Student Trang",
    "transcriptText": "Trang: Daniel, what has been your most thrilling travel experience in Vietnam so far?\nDaniel: Hello Trang! I have had so many unforgettable moments, but scuba diving in Phu Quoc and paragliding above the golden terraced fields of Mu Cang Chai were truly breathtaking! Floating high in the sky and seeing emerald mountain valleys beneath you gives an incredible adrenaline rush.\nTrang: Have you ever stayed in an ethnic homestay in the northern mountains?\nDaniel: Yes, I have! Last October, I spent three days at a traditional Tay homestay near Ba Be Lake. The local family cooked delicious bamboo-tube rice and taught us folk dances around a crackling evening campfire.\nTrang: Did you face any difficulties during jungle trekking?\nDaniel: We encountered sudden heavy rain, but overcoming those hurdles together forged lifelong friendships. Travel broadens your mind in ways books never can!",
    "vietnameseTranslation": "Trang: Anh Daniel ơi, trải nghiệm du lịch nào là ly kỳ nhất của anh tại Việt Nam cho đến nay ạ?\nDaniel: Chào Trang! Anh đã có rất nhiều khoảnh khắc không thể nào quên, nhưng lặn biển ngắm san hô ở Phú Quốc và bay dù lượn trên những thửa ruộng bậc thang vàng óng ở Mù Cang Chải thực sự ngoạn mục đến nghẹt thở! Lơ lửng trên bầu trời cao và ngắm nhìn những thung lũng núi xanh ngọc bích bên dưới mang lại cảm giác phấn khích tột độ.\nTrang: Anh đã bao giờ ở homestay của người dân tộc ở vùng núi phía Bắc chưa ạ?\nDaniel: Có chứ, anh đã từng ở! Tháng 10 năm ngoái, anh đã dành ba ngày tại một homestay truyền thống của người Tày gần Hồ Ba Bể. Gia đình bản địa đã nấu cơm lam thơm ngon và dạy chúng anh những điệu múa dân gian quanh ngọn lửa trại buổi tối tí tách.\nTrang: Anh có gặp khó khăn nào khi đi bộ xuyên rừng không ạ?\nDaniel: Bọn anh gặp một cơn mưa lớn bất chợt, nhưng việc cùng nhau vượt qua những trở ngại đó đã tạo nên những tình bạn bền chặt cả đời. Đi du lịch mở rộng tầm mắt theo những cách mà sách vở không bao giờ làm được!"
}

u5_listening_qs = [
    {"id": "u5-l1", "question": "What two thrilling experiences in Vietnam did Daniel highlight?", "options": ["A. Scuba diving in Phu Quoc and paragliding in Mu Cang Chai", "B. Watching TV and sleeping all day", "C. Eating ice cream indoors", "D. Waiting in bus queues"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'scuba diving in Phu Quoc and paragliding above the golden terraced fields of Mu Cang Chai.'"},
    {"id": "u5-l2", "question": "What feeling did floating high in the sky give Daniel?", "options": ["A. An incredible adrenaline rush", "B. Extreme boredom", "C. Severe sickness", "D. Sleepiness"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'gives an incredible adrenaline rush.'"},
    {"id": "u5-l3", "question": "Where did Daniel stay for three days last October?", "options": ["A. At a traditional Tay ethnic homestay near Ba Be Lake", "B. At a luxury 5-star hotel downtown", "C. In a cave with no food", "D. In an airport"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'spent three days at a traditional Tay homestay near Ba Be Lake.'"},
    {"id": "u5-l4", "question": "What delicious local specialty did the host family cook?", "options": ["A. Bamboo-tube rice (com lam)", "B. Raw cheese", "C. Canned soup", "D. Pizza"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'cooked delicious bamboo-tube rice.'"},
    {"id": "u5-l5", "question": "What activity did they do around the evening campfire?", "options": ["A. Danced folk dances together", "B. Slept quietly", "C. Took math tests", "D. Read textbooks silently"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'taught us folk dances around a crackling evening campfire.'"},
    {"id": "u5-l6", "question": "What challenge did Daniel's group encounter during trekking?", "options": ["A. Sudden heavy rain", "B. A snow blizzard", "C. A desert sandstorm", "D. Lost passports"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'We encountered sudden heavy rain.'"},
    {"id": "u5-l7", "question": "What was the positive outcome of overcoming hurdles together?", "options": ["A. It forged lifelong friendships", "B. They gave up traveling forever", "C. They bought more backpacks", "D. Nothing"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'overcoming those hurdles together forged lifelong friendships.'"},
    {"id": "u5-l8", "question": "What core philosophy about travel does Daniel express?", "options": ["A. Travel broadens your mind in ways books never can", "B. Travel is a waste of time", "C. Staying at home is always better", "D. Never talk to local people"], "correctAnswerIndex": 0, "explanation": "Daniel khẳng định: 'Travel broadens your mind in ways books never can!'"}
]

u5_listening_fibs = [
    {"id": "u5-f1", "sentenceWithBlank": "Paragliding above golden terraced fields was truly _____.", "correctWord": "breathtaking", "hint": "Đẹp ngoạn mục nghẹt thở (breathtaking)"},
    {"id": "u5-f2", "sentenceWithBlank": "Daniel stayed at a traditional Tay ethnic _____ near Ba Be Lake.", "correctWord": "homestay", "hint": "Nhà dân lưu trú (homestay)"},
    {"id": "u5-f3", "sentenceWithBlank": "They danced around a crackling evening _____.", "correctWord": "campfire", "hint": "Lửa trại (campfire)"},
    {"id": "u5-f4", "sentenceWithBlank": "Overcoming trekking hurdles forged lifelong _____.", "correctWord": "friendships", "hint": "Tình bạn bền vững (friendships)"}
]

u5_speaking = [
    {"id": f"u5-s{i+1}", "targetSentence": s, "ipa": ipa, "vietnameseMeaning": vm, "contextSituation": ctx, "keyPhonicsFocus": kpf, "sampleAudioText": s}
    for i, (s, ipa, vm, ctx, kpf) in enumerate([
        ("Paragliding high above the golden terraced fields of Mu Cang Chai was a truly breathtaking experience.", "/ˌpærəˈɡlaɪdɪŋ haɪ əˈbʌv ðə ˈɡəʊldən ˈtɛrəst fiːldz ɒv muː kɑːŋ ʧaɪ wɒz ə ˈtruːli ˈbrɛθˌteɪkɪŋ ɪksˈpɪərɪəns/", "Bay dù lượn trên cao ngắm những thửa ruộng bậc thang vàng óng ở Mù Cang Chải là một trải nghiệm thực sự ngoạn mục.", "Kể về trải nghiệm dù lượn.", "Phát âm chuẩn 'paragliding' /ˌpærəˈɡlaɪdɪŋ/ và 'breathtaking' /ˈbrɛθˌteɪkɪŋ/."),
        ("Have you ever explored the gigantic underground chambers of Son Doong Cave with an expedition team?", "/hæv juː ˈɛvər ɪksˈplɔːd ðə ˌʤaɪˈɡæntɪk ˈʌndəɡraʊnd ˈʧeɪmbəz ɒv ʃɒn dʊŋ keɪv wɪð ən ˌɛkspɪˈdɪʃən tiːm/", "Bạn đã bao giờ khám phá những vòm hang ngầm khổng lồ của Hang Sơn Đoòng cùng với một đoàn thám hiểm chưa?", "Hỏi về trải nghiệm hang động.", "Phát âm chuẩn 'gigantic' /ˌʤaɪˈɡæntɪk/ và 'expedition' /ˌɛkspɪˈdɪʃən/."),
        ("Last summer, our youth volunteer squad built a cozy community library for highland children in Ha Giang.", "/lɑːst ˈsʌmə ˈaʊə juːθ ˌvɒlənˈtɪə skwɒd bɪlt ə ˈkəʊzi kəˈmjuːnɪti ˈlaɪbrəri fɔː ˈhaɪlənd ˈʧɪldrən ɪn hɑː ɡiɑːŋ/", "Mùa hè năm ngoái, đội tình nguyện viên trẻ của chúng tôi đã xây một thư viện cộng đồng ấm cúng cho trẻ em vùng cao Hà Giang.", "Kể về chuyến đi tình nguyện.", "Phát âm chuẩn 'volunteer squad' /ˌvɒlənˈtɪə skwɒd/."),
        ("Scuba diving among vibrant coral reefs in Phu Quoc gave me an unforgettable glimpse of marine biodiversity.", "/ˈskuːbə ˈdaɪvɪŋ əˈmʌŋ ˈvaɪbrənt ˈkɒrəl riːfs ɪn fuː kwɒk ɡeɪv miː ən ˌʌnfəˈɡɛtəbl ɡlɪmps ɒv məˈriːn ˌbaɪəʊdaɪˈvɜːsɪti/", "Lặn biển có bình khí giữa những rạn san hô rực rỡ ở Phú Quốc đã cho tôi cái nhìn thoáng qua khó quên về sự đa dạng sinh học biển.", "Kể về lặn biển.", "Phát âm chuẩn 'biodiversity' /ˌbaɪəʊdaɪˈvɜːsɪti/ và 'marine' /məˈriːn/."),
        ("We pitched our camping tents beside the crystal-clear mountain stream and roasted corn around the campfire.", "/wiː pɪʧt ˈaʊə ˈkæmpɪŋ tɛnts bɪˈsaɪd ðə ˈkrɪstl-klɪə ˈmaʊntɪn striːm ænd ˈrəʊstɪd kɔːn əˈraʊnd ðə ˈkæmpˌfaɪə/", "Chúng tôi dựng lều cắm trại bên dòng suối núi trong vắt và nướng ngô quanh ngọn lửa trại.", "Miêu tả cảnh cắm trại.", "Phát âm chuẩn 'crystal-clear' /ˈkrɪstl-klɪə/ và 'pitched' /pɪʧt/."),
        ("Staying with a local ethnic family provided authentic cultural immersion and unforgettable culinary discoveries.", "/ˈsteɪɪŋ wɪð ə ˈləʊkəl ˈɛθnɪk ˈfæmɪli prəˈvaɪdɪd ɔːˈθɛntɪk ˈkʌlʧərəl ɪˈmɜːʃən ænd ˌʌnfəˈɡɛtəbl ˌkʌlɪnəri dɪsˈkʌvəriz/", "Ở cùng một gia đình dân tộc bản địa đã mang lại sự trải nghiệm hòa mình văn hóa chân thực và những khám phá ẩm thực khó quên.", "Kể về trải nghiệm homestay.", "Phát âm chuẩn 'culinary' /ˈkʌlɪnəri/ và 'immersion' /ɪˈmɜːʃən/."),
        ("White-water kayaking through rocky river rapids delivered an exhilarating surge of adrenaline.", "/waɪt-ˈwɔːtə ˈkaɪækɪŋ θruː ˈrɒki ˈrɪvə ˈræpɪdz dɪˈlɪvəd ən ɪɡˈzɪləreɪtɪŋ sɜːʤ ɒv əˈdrɛnəlɪn/", "Chèo thuyền kayak vượt qua những ghềnh sông đá cuồn cuộn đã mang lại một luồng cảm giác phấn khích tột độ dâng trào.", "Miêu tả cảm giác chèo kayak mạo hiểm.", "Phát âm chuẩn 'exhilarating' /ɪɡˈzɪləreɪtɪŋ/ và 'rapids' /ˈræpɪdz/."),
        ("Conquering the towering rocky peak of Mount Fansipan helped me completely overcome my fear of heights.", "/ˈkɒŋkərɪŋ ðə ˈtaʊərɪŋ ˈrɒki piːk ɒv maʊnt ˈfænsɪpæn hɛlpt miː kəmˈpliːtli ˌəʊvəˈkʌm maɪ fɪər ɒv haɪts/", "Chinh phục đỉnh núi đá cao chót vót của Fansipan đã giúp tôi hoàn toàn vượt qua nỗi sợ độ cao.", "Kể về chinh phục đỉnh núi.", "Phát âm chuẩn 'conquering' /ˈkɒŋkərɪŋ/ và 'towering' /ˈtaʊərɪŋ/."),
        ("I have already visited the ancient UNESCO heritage town of Hoi An twice with my family.", "/aɪ hæv ɔːlˈrɛdi ˈvɪzɪtɪd ði ˈeɪnʃənt juːˈnɛskəʊ ˈhɛrɪtɪʤ taʊn ɒv hɔɪ æn twaɪs wɪð maɪ ˈfæmɪli/", "Tôi đã từng đến thăm thị trấn di sản UNESCO cổ kính Hội An hai lần cùng với gia đình mình.", "Nói về số lần đến Hội An.", "Phát âm chuẩn 'have already visited'."),
        ("The generous hospitality and radiant smiles of the island residents made us feel right at home.", "/ðə ˈʤɛnərəs ˌhɒspɪˈtælɪti ænd ˈreɪdiənt smaɪlz ɒv ði ˈaɪlənd ˈrɛzɪdənts meɪd ʌs fiːl raɪt æt həʊm/", "Lòng hiếu khách hào hiệp và nụ cười rạng rỡ của cư dân trên đảo khiến chúng tôi cảm thấy gần gũi như ở nhà.", "Khen ngợi lòng hiếu khách.", "Phát âm chuẩn 'hospitality' /ˌhɒspɪˈtælɪti/ và 'generous' /ˈʤɛnərəs/."),
        ("Overcoming harsh monsoon storms during the mountain expedition forged unbreakable bonds of friendship.", "/ˌəʊvəˈkʌmɪŋ hɑːʃ mɒnˈsuːn stɔːmz ˈdjʊərɪŋ ðə ˈmaʊntɪn ˌɛkspɪˈdɪʃən fɔːʤd ʌnˈbreɪkəbl bɒndz ɒv ˈfrɛndʃɪp/", "Vượt qua những cơn bão gió mùa khắc nghiệt trong chuyến thám hiểm núi đã trui rèn nên những sợi dây tình bạn không thể phá vỡ.", "Nói về tình đồng đội.", "Phát âm chuẩn 'monsoon' /mɒnˈsuːn/ và 'unbreakable' /ʌnˈbreɪkəbl/."),
        ("Have you ever tasted traditional grilled five-color sticky rice prepared by Tay culinary masters?", "/hæv juː ˈɛvə ˈteɪstɪd trəˈdɪʃənl ɡrɪld faɪv-ˈkʌlə ˈstɪki raɪs prɪˈpeəd baɪ teɪ ˈkʌlɪnəri ˈmɑːstəz/", "Bạn đã bao giờ nếm thử món xôi ngũ sắc nướng truyền thống do các nghệ nhân ẩm thực người Tày chế biến chưa?", "Hỏi về món xôi ngũ sắc.", "Phát âm chuẩn 'five-color sticky rice'."),
        ("Watching the magnificent sunrise slowly illuminate the misty valley filled my heart with profound wonder.", "/ˈwɒʧɪŋ ðə mæɡˈnɪfɪsnt ˈsʌnraɪz ˈsləʊli ɪˈljuːmɪneɪt ðə ˈmɪsti ˈvæli fɪld maɪ hɑːt wɪð prəˈfaʊnd ˈwʌndə/", "Ngắm nhìn bình minh tráng lệ từ từ soi sáng thung lũng sương mờ khiến trái tim tôi tràn ngập sự ngỡ ngàng sâu sắc.", "Miêu tả cảnh bình minh trên núi.", "Phát âm chuẩn 'illuminate' /ɪˈljuːmɪneɪt/ và 'profound wonder'."),
        ("Taking part in the international youth cultural exchange was a transformative milestone in my education.", "/ˈteɪkɪŋ pɑːt ɪn ði ˌɪntəˈnæʃənl juːθ ˈkʌlʧərəl ɪksˈʧeɪnʤ wɒz ə trænsˈfɔːmətɪv ˈmaɪlstəʊn ɪn maɪ ˌɛʤʊˈkeɪʃən/", "Tham gia buổi giao lưu văn hóa thanh niên quốc tế là một cột mốc mang tính biến đổi trong quá trình học tập của tôi.", "Nói về ý nghĩa giao lưu văn hóa.", "Phát âm chuẩn 'transformative' /trænsˈfɔːmətɪv/."),
        ("We collected colorful handcrafted brocade souvenirs to present to our teachers and friends.", "/wiː kəˈlɛktɪd ˈkʌləfʊl ˈhændˌkrɑːftɪd brəʊˈkeɪd ˌsuːvəˈnɪəz tuː prɪˈzɛnt tuː ˈaʊə ˈtiːʧəz ænd frɛndz/", "Chúng tôi đã sưu tầm những món quà lưu niệm bằng thổ cẩm thủ công rực rỡ sắc màu để tặng thầy cô và bạn bè.", "Kể về mua quà lưu niệm.", "Phát âm chuẩn 'brocade souvenirs' /brəʊˈkeɪd ˌsuːvəˈnɪəz/."),
        ("Did you encounter any rare wild birds while hiking through the tropical primary rainforest?", "/dɪd juː ɪnˈkaʊntər ˈɛni reə waɪld bɜːdz waɪl ˈhaɪkɪŋ θruː ðə ˈtrɒpɪkəl ˈpraɪməri ˈreɪnˌfɒrɪst/", "Bạn có bắt gặp loài chim rừng quý hiếm nào khi đi bộ xuyên qua khu rừng nhiệt đới nguyên sinh không?", "Hỏi về quan sát thiên nhiên hoang dã.", "Phát âm chuẩn 'primary rainforest' /ˈpraɪməri ˈreɪnˌfɒrɪst/."),
        ("Exploring remote geographical destinations cultivates open-mindedness, self-reliance, and deep empathy.", "/ɪksˈplɔːrɪŋ rɪˈməʊt ˌʤɪəˈɡræfɪkəl ˌdɛstɪˈneɪʃənz ˈkʌltɪveɪts ˌəʊpən-ˈmaɪndɪdnəs sɛlf-rɪˈlaɪəns ænd diːp ˈɛmpəθi/", "Khám phá những điểm đến địa lý xa xôi nuôi dưỡng sự cởi mở, tính tự lập và lòng thấu cảm sâu sắc.", "Nói về giá trị của đi du lịch trải nghiệm.", "Phát âm chuẩn 'self-reliance' /sɛlf-rɪˈlaɪəns/ và 'empathy' /ˈɛmpəθi/."),
        ("I haven't completed my travel journal yet because every day brought brand new surprises.", "/aɪ hævnt kəmˈpliːtɪd maɪ ˈtrævl ˈʤɜːnl jɛt bɪˈkɒz ˈɛvri deɪ brɔːt brænd njuː səˈpraɪzɪz/", "Tôi vẫn chưa hoàn thành cuốn nhật ký hành trình của mình vì mỗi ngày trôi qua đều mang đến những bất ngờ hoàn toàn mới.", "Kể về viết nhật ký du lịch.", "Phát âm chuẩn 'travel journal' /ˈtrævl ˈʤɜːnl/."),
        ("Every daring venture into the unknown enriches our worldview and illuminates our inner strength.", "/ˈɛvri ˈdeərɪŋ ˈvɛnʧər ˈɪntuː ði ʌnˈnəʊn ɪnˈrɪʧɪz ˈaʊə ˈwɜːldvjuː ænd ɪˈljuːmɪneɪts ˈaʊər ˈɪnə strɛŋθ/", "Mỗi chuyến phiêu lưu dũng cảm vào những điều chưa biết đều làm phong phú thêm thế giới quan và thắp sáng sức mạnh nội tâm của chúng ta.", "Thông điệp về tinh thần phiêu lưu.", "Phát âm chuẩn 'daring venture' /ˈdeərɪŋ ˈvɛnʧə/."),
        ("May your youthful journeys be blessed with wondrous discoveries, boundless joy, and enduring friendships.", "/meɪ jɔː ˈjuːθfʊl ˈʤɜːniz biː blɛst wɪð ˈwʌndrəs dɪsˈkʌvəriz ˈbaʊndlɪs ʤɔɪ ænd ɪnˈdjʊərɪŋ ˈfrɛndʃɪps/", "Chúc cho những hành trình tuổi trẻ của bạn được chúc phúc với những khám phá kỳ diệu, niềm vui vô tận và những tình bạn bền lâu.", "Lời chúc dành cho các hành trình tuổi trẻ.", "Phát âm chuẩn 'wondrous' /ˈwʌndrəs/ và 'boundless' /ˈbaʊndlɪs/.")
    ])
]

u5_reading_info = {
    "title": "Sức Mạnh Biến Đổi Của Những Trải Nghiệm Thực Tế & Du Lịch Khám Phá",
    "topic": "Trải nghiệm khám phá thiên nhiên, du lịch thiện nguyện và phát triển bản thân",
    "passageText": "Experiential learning beyond traditional classroom walls possesses a profound capacity to shape character and broaden perspectives. While textbooks provide foundational theoretical knowledge, immersing oneself in novel environments—whether scaling rugged mountains, participating in community volunteer missions, or engaging in cross-cultural exchanges—transforms abstract concepts into indelible life wisdom.\n\nOutdoor expeditions, such as trekking through national parks or navigating turbulent river rapids, cultivate mental fortitude and team synergy. When confronted with unexpected meteorological shifts or demanding physical terrains, participants must overcome self-doubt, collaborate seamlessly with peers, and exercise adaptive problem-solving. Research demonstrates that conquering these formidable hurdles dramatically elevates self-efficacy and emotional resilience.\n\nEqually impactful are volunteer journeys to remote highland hamlets. Living alongside ethnic minority families fosters deep empathy, dismantles preconceived stereotypes, and instills genuine gratitude for everyday privileges. Ultimately, experiential adventures do not merely entertain; they forge compassionate, self-reliant global citizens equipped to navigate an interconnected world with courage and open hearts.",
    "keyVocabularyHighlights": [
        {"word": "experiential learning", "meaning": "học tập thông qua trải nghiệm thực tế"},
        {"word": "team synergy", "meaning": "sự hiệp lực và ăn ý của tinh thần đồng đội"},
        {"word": "self-efficacy", "meaning": "niềm tin vững chắc vào năng lực bản thân"},
        {"word": "preconceived stereotypes", "meaning": "những định kiến có sẵn từ trước"}
    ]
}

u5_reading_qs = [
    {"id": "u5-r1", "question": "What is the primary benefit of experiential learning mentioned in paragraph 1?", "options": ["A. It shapes character, broadens perspectives, and turns abstract concepts into life wisdom", "B. It makes textbooks completely illegal", "C. It allows students to never study again", "D. It closes all schools down"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 1: 'possesses a profound capacity to shape character and broaden perspectives... transforms abstract concepts into indelible life wisdom.'"},
    {"id": "u5-r2", "question": "What qualities do outdoor expeditions cultivate according to paragraph 2?", "options": ["A. Mental fortitude and team synergy", "B. Laziness and boredom", "C. Extreme fear of all trees", "D. Physical weakness"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'cultivate mental fortitude and team synergy.'"},
    {"id": "u5-r3", "question": "How do participants respond when facing unexpected challenges on expeditions?", "options": ["A. Overcome self-doubt, collaborate seamlessly, and exercise adaptive problem-solving", "B. Cry and run home immediately", "C. Blame their teammates angrily", "D. Refuse to move"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'overcome self-doubt, collaborate seamlessly with peers, and exercise adaptive problem-solving.'"},
    {"id": "u5-r4", "question": "What does research show about conquering outdoor hurdles?", "options": ["A. It dramatically elevates self-efficacy and emotional resilience", "B. It reduces intelligence", "C. It makes people lose their memory", "D. It causes permanent dizziness"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'conquering these formidable hurdles dramatically elevates self-efficacy and emotional resilience.'"},
    {"id": "u5-r5", "question": "What positive effects stem from volunteer journeys to highland hamlets?", "options": ["A. Fosters deep empathy, dismantles stereotypes, and instills genuine gratitude", "B. Makes volunteers boastful", "C. Teaches people how to build airplanes", "D. Stops all farming"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'fosters deep empathy, dismantles preconceived stereotypes, and instills genuine gratitude for everyday privileges.'"},
    {"id": "u5-r6", "question": "What kind of citizens do experiential adventures ultimately forge?", "options": ["A. Compassionate, self-reliant global citizens equipped with courage", "B. Selfish and isolated individuals", "C. Wealthy movie stars only", "D. Video game champions"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'forge compassionate, self-reliant global citizens equipped to navigate an interconnected world with courage.'"},
    {"id": "u5-r7", "question": "Which word in paragraph 2 is closest in meaning to 'meteorological'?", "options": ["A. Relating to atmospheric weather conditions", "B. Relating to underground rocks", "C. Relating to sea creatures", "D. Relating to outer space stars"], "correctAnswerIndex": 0, "explanation": "'Meteorological' có nghĩa là thuộc về khí tượng, thời tiết."},
    {"id": "u5-r8", "question": "Which word in paragraph 2 is closest in meaning to 'fortitude'?", "options": ["A. Courage, mental strength, and bravery in enduring hardship", "B. Weakness and fear", "C. Physical height", "D. Fast running speed"], "correctAnswerIndex": 0, "explanation": "'Fortitude' có nghĩa là sự kiên cường, dũng cảm và nghị lực tinh thần."},
    {"id": "u5-r9", "question": "What is the tone of the author in this passage?", "options": ["A. Inspiring, analytical, and appreciative of experiential growth", "B. Angry and sarcastic", "C. Hopeless and pessimistic", "D. Indifferent and bored"], "correctAnswerIndex": 0, "explanation": "Giọng điệu của tác giả mang tính truyền cảm hứng, phân tích sâu sắc và trân trọng sự trưởng thành qua trải nghiệm."},
    {"id": "u5-r10", "question": "What is the most suitable title for this passage?", "options": ["A. The Transformative Power of Real-World Experiences and Travel", "B. Safety Procedures for Commercial Aviation", "C. How to Construct Wooden Bridges", "D. A Guide to Deep-Sea Fishing Techniques"], "correctAnswerIndex": 0, "explanation": "Tiêu đề chuẩn xác nhất tóm lược sức mạnh biến đổi bản thân của trải nghiệm thực tế và du lịch khám phá."}
]

u5_writing_prompts = [
    {
        "id": "u5-w1",
        "title": "Đề 1: Write a paragraph about an unforgettable travel experience you have had (60-80 words)",
        "description": "Viết một đoạn văn kể về một trải nghiệm du lịch đáng nhớ mà em đã từng trải qua.",
        "suggestedOutline": [
            "Introduction: Introduce where and when you went on this memorable trip.",
            "Body: Describe what activities you did (climbing mountains, swimming in the sea, trying local foods) and what you saw.",
            "Conclusion: State why this experience remains unforgettable to you."
        ],
        "usefulPhrases": [
            "My trip to Sapa last winter remains the most unforgettable travel experience of my life...",
            "We trekked through picturesque valleys blanketed in swirling mist and visited ethnic villages...",
            "Standing atop Mount Fansipan to watch the golden sunrise took my breath away...",
            "This incredible adventure taught me to appreciate the majestic beauty of our homeland."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "My trip to Sapa last autumn remains the most unforgettable travel experience of my life. Together with my family, I trekked through picturesque terraced valleys and stayed at a warm ethnic homestay. Standing atop Mount Fansipan, witnessing golden sunlight pierce through swirling clouds, was breathtaking. Moreover, tasting delicious bamboo-tube rice around an evening campfire warmed our spirits. This incredible adventure deepened my love for Vietnam's breathtaking natural landscapes."
    },
    {
        "id": "u5-w2",
        "title": "Đề 2: Write a paragraph on the benefits of participating in a volunteer trip (60-80 words)",
        "description": "Viết một đoạn văn trình bày những lợi ích quý báu khi tham gia một chuyến đi tình nguyện.",
        "suggestedOutline": [
            "Introduction: State that volunteer trips offer tremendous personal growth.",
            "Body: Explain benefits (helping disadvantaged communities, developing teamwork/communication, building empathy).",
            "Conclusion: Encourage youth to join volunteer activities."
        ],
        "usefulPhrases": [
            "Participating in volunteer trips offers teenagers invaluable opportunities for personal growth...",
            "First, helping disadvantaged children build libraries or paint classrooms brings meaningful joy...",
            "Second, working in team squads cultivates leadership, communication, and empathy...",
            "These meaningful journeys inspire youth to become compassionate and responsible global citizens."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Participating in volunteer trips offers teenagers invaluable opportunities for personal growth. First, helping disadvantaged highland children by donating books and repairing classrooms brings immense fulfillment. Second, collaborating in volunteer squads enhances essential soft skills like teamwork, leadership, and crisis management. Finally, living alongside local communities nurtures profound empathy and gratitude for everyday blessings. Every student should join at least one volunteer journey to enrich their youthful days."
    },
    {
        "id": "u5-w3",
        "title": "Đề 3: Write a paragraph describing a daring adventure sport you want to try (60-80 words)",
        "description": "Viết một đoạn văn miêu tả một môn thể thao phiêu lưu mạo hiểm mà em muốn thử sức (dù lượn, lặn biển, nhảy bungee...).",
        "suggestedOutline": [
            "Introduction: Name the adventure sport you dream of trying (e.g., scuba diving).",
            "Body: Explain why it excites you (exploring underwater reefs, floating with sea creatures) and where you want to do it.",
            "Conclusion: Express your determination to overcome fear and try it."
        ],
        "usefulPhrases": [
            "I have always dreamed of trying scuba diving in the azure waters of Phu Quoc...",
            "Gliding weightlessly beneath the waves to admire vibrant coral reefs and exotic turtles excites me...",
            "Although breathing through an oxygen tank seems intimidating, conquering my fear will be empowering...",
            "I look forward to experiencing this magical underwater wonderland soon."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "I have always dreamed of trying scuba diving in the crystal-clear waters of Phu Quoc Island. Gliding weightlessly beneath turquoise waves to explore vibrant coral reefs and swim alongside exotic sea turtles excites me tremendously. Although breathing through an oxygen regulator underwater might feel intimidating initially, conquering that fear will boost my confidence. I eagerly look forward to discovering this magical marine paradise during my next summer vacation."
    },
    {
        "id": "u5-w4",
        "title": "Đề 4: Write a paragraph about the importance of overcoming personal fears (60-80 words)",
        "description": "Viết một đoạn văn phân tích tại sao việc vượt qua nỗi sợ hãi cá nhân là chìa khóa để trưởng thành.",
        "suggestedOutline": [
            "Introduction: State that overcoming personal fear is the key to unlocking self-potential.",
            "Body: Explain how facing fears (fear of public speaking, fear of failure, fear of heights) makes a person stronger and more resilient.",
            "Conclusion: Reiterate that courage leads to continuous self-improvement."
        ],
        "usefulPhrases": [
            "Overcoming personal fears is the ultimate catalyst for personal growth and self-discovery...",
            "Whether it is conquering fear of public speaking or fear of heights, stepping out of our comfort zone builds resilience...",
            "Each triumph over anxiety proves that our perceived limitations exist only in our minds...",
            "Embracing bold challenges transforms nervous hesitation into unwavering self-assurance."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Overcoming personal fears is the ultimate catalyst for emotional growth and personal development. Whether it is conquering stage fright before a presentation or facing a fear of heights during climbing, stepping outside our comfort zone builds mental resilience. Each triumph over anxiety proves that our limitations are self-imposed. By courageously confronting new challenges, teenagers transform nervous hesitation into unwavering confidence, unlocking their fullest potential in life."
    },
    {
        "id": "u5-w5",
        "title": "Đề 5: Write a paragraph describing a homestay experience with a local family (60-80 words)",
        "description": "Viết một đoạn văn miêu tả trải nghiệm ở homestay cùng một gia đình người dân tộc thiểu số.",
        "suggestedOutline": [
            "Introduction: Introduce the homestay location (e.g., in a traditional stilt house in Mai Chau).",
            "Body: Describe the warm reception, participating in cooking traditional dishes, and learning cultural customs.",
            "Conclusion: Express your fond memories of the family's genuine hospitality."
        ],
        "usefulPhrases": [
            "Staying at a traditional Thai ethnic homestay in Mai Chau was a deeply heartwarming experience...",
            "The host family welcomed us with fragrant herbal tea and cooked delicious grilled fish and sticky rice...",
            "In the evening, we sat together on the polished bamboo floor listening to ancient folk tales...",
            "Their genuine hospitality and generous kindness left an everlasting impression on my heart."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Staying at a traditional Thai ethnic homestay in Mai Chau was a deeply heartwarming experience. The host family welcomed us warmly with fragrant herbal tea and invited us into their wooden stilt house. We helped prepare delicious grilled stream fish and steamed sticky rice before gathering on the bamboo floor for dinner. In the evening, we shared folk songs under starry skies. Their genuine hospitality made me feel like an honored family member."
    }
]

unit5 = make_unit(5, "Unit 5: Experiences", "Những trải nghiệm kỳ thú & Khám phá thế giới", "Khám phá các chuyến du lịch mạo hiểm, du lịch thiện nguyện, thì Hiện tại hoàn thành và Quá khứ đơn.", "Ngữ âm: Nhấn trọng âm các tính từ chỉ cảm xúc và ngữ điệu câu hỏi trải nghiệm Have you ever...", "Compass", u5_vocab, u5_grammar_info, u5_grammar_exs, u5_listening_info, u5_listening_qs, u5_listening_fibs, u5_speaking, u5_reading_info, u5_reading_qs, u5_writing_prompts)
write_ts_unit(5, unit5)
print("Unit 5 generated successfully!")

# ==============================================================================
# UNIT 6: VIETNAMESE LIFESTYLE: THEN AND NOW (20 Vocab, 20 Grammar, 8 Listening MC + 4 FIB, 20 Speaking, 10 Reading, 5 Writing)
# ==============================================================================
u6_vocab = [
    {"id": "u6-v1", "word": "traditional lifestyle", "phonetic": "/trəˈdɪʃənl ˈlaɪfstaɪl/", "partOfSpeech": "noun", "vietnameseMeaning": "lối sống truyền thống, nếp nhà xưa", "englishExample": "The traditional lifestyle was centered around communal harmony, agrarian seasons, and tight family bonds.", "vietnameseExample": "Lối sống truyền thống xoay quanh sự hòa thuận cộng đồng, mùa vụ nông nghiệp và sự gắn kết gia đình bền chặt."},
    {"id": "u6-v2", "word": "modern lifestyle", "phonetic": "/ˈmɒdən ˈlaɪfstaɪl/", "partOfSpeech": "noun", "vietnameseMeaning": "lối sống hiện đại, phong cách sống số", "englishExample": "The modern lifestyle in big cities offers digital convenience and dynamic career pathways.", "vietnameseExample": "Lối sống hiện đại ở các thành phố lớn mang lại sự tiện ích số và những con đường sự nghiệp năng động."},
    {"id": "u6-v3", "word": "open-air market", "phonetic": "/ˈəʊpən-eə ˈmɑːkɪt/", "partOfSpeech": "noun", "vietnameseMeaning": "chợ truyền thống ngoài trời, chợ phiên", "englishExample": "Homemakers used to buy fresh farm vegetables at the bustling morning open-air market.", "vietnameseExample": "Các bà nội trợ từng mua rau củ quả tươi từ trang trại tại khu chợ phiên ngoài trời nhộn nhịp buổi sáng."},
    {"id": "u6-v4", "word": "supermarket chain", "phonetic": "/ˈsuːpəˌmɑːkɪt ʧeɪn/", "partOfSpeech": "noun", "vietnameseMeaning": "chuỗi siêu thị hiện đại", "englishExample": "Urban families now prefer shopping at convenient air-conditioned supermarket chains.", "vietnameseExample": "Các gia đình thành thị giờ đây ưa chuộng mua sắm tại các chuỗi siêu thị có điều hòa tiện lợi."},
    {"id": "u6-v5", "word": "online shopping", "phonetic": "/ˈɒnˌlaɪn ˈʃɒpɪŋ/", "partOfSpeech": "noun", "vietnameseMeaning": "mua sắm trực tuyến qua mạng", "englishExample": "Online shopping allows customers to order goods with a simple tap on their smartphone.", "vietnameseExample": "Mua sắm trực tuyến cho phép khách hàng đặt hàng chỉ với một cái chạm nhẹ trên điện thoại thông minh."},
    {"id": "u6-v6", "word": "street food vendor", "phonetic": "/striːt fuːd ˈvɛndə/", "partOfSpeech": "noun", "vietnameseMeaning": "người bán hàng rong trên phố", "englishExample": "Street food vendors carrying shoulder poles were familiar fixtures along old Hanoi sidewalks.", "vietnameseExample": "Những người bán hàng rong gánh gồng trên vai từng là hình ảnh thân quen trên các vỉa hè Hà Nội xưa."},
    {"id": "u6-v7", "word": "convenience store", "phonetic": "/kənˈviːniəns stɔː/", "partOfSpeech": "noun", "vietnameseMeaning": "cửa hàng tiện lợi 24/7", "englishExample": "Brightly lit convenience stores operate 24 hours a day on almost every major corner.", "vietnameseExample": "Các cửa hàng tiện lợi sáng rực hoạt động 24 giờ mỗi ngày tại hầu hết các góc phố chính."},
    {"id": "u6-v8", "word": "cashless payment", "phonetic": "/ˈkæʃlɪs ˈpeɪmənt/", "partOfSpeech": "noun", "vietnameseMeaning": "thanh toán không dùng tiền mặt (quét mã QR)", "englishExample": "QR-code cashless payment has replaced physical banknotes in many Vietnamese markets.", "vietnameseExample": "Thanh toán không dùng tiền mặt qua mã QR đã thay thế tiền giấy tại nhiều khu chợ Việt Nam."},
    {"id": "u6-v9", "word": "face-to-face interaction", "phonetic": "/feɪs-tuː-feɪs ˌɪntərˈækʃən/", "partOfSpeech": "noun", "vietnameseMeaning": "sự tương tác trực tiếp mặt đối mặt", "englishExample": "Nothing can truly replace the heartfelt emotional warmth of face-to-face interaction.", "vietnameseExample": "Không gì có thể thực sự thay thế được sự ấm áp tình cảm chân thành của việc tương tác trực tiếp mặt đối mặt."},
    {"id": "u6-v10", "word": "virtual connection", "phonetic": "/ˈvɜːʧʊəl kəˈnɛkʃən/", "partOfSpeech": "noun", "vietnameseMeaning": "sự kết nối trên không gian mạng ảo", "englishExample": "Social media provides instant virtual connection with friends residing across continents.", "vietnameseExample": "Mạng xã hội mang lại sự kết nối ảo tức thì với bạn bè đang sinh sống ở khắp các châu lục."},
    {"id": "u6-v11", "word": "culinary habit", "phonetic": "/ˈkʌlɪnəri ˈhæbɪt/", "partOfSpeech": "noun", "vietnameseMeaning": "thói quen ẩm thực, nếp ăn uống", "englishExample": "Vietnamese culinary habits emphasize fresh herbs, clear broths, and balanced flavors.", "vietnameseExample": "Thói quen ẩm thực của người Việt chú trọng rau thơm tươi, nước dùng thanh và hương vị hài hòa."},
    {"id": "u6-v12", "word": "home-cooked meal", "phonetic": "/həʊm-kʊkt miːl/", "partOfSpeech": "noun", "vietnameseMeaning": "bữa cơm nấu tại gia đình", "englishExample": "A wholesome home-cooked meal brings family members together after demanding workdays.", "vietnameseExample": "Một bữa cơm nhà lành mạnh gắn kết các thành viên gia đình lại với nhau sau những ngày làm việc vất vả."},
    {"id": "u6-v13", "word": "fast food", "phonetic": "/fɑːst fuːd/", "partOfSpeech": "noun", "vietnameseMeaning": "đồ ăn nhanh công nghiệp", "englishExample": "Over-reliance on commercial fast food can contribute to lifestyle-related health conditions.", "vietnameseExample": "Việc quá phụ thuộc vào đồ ăn nhanh công nghiệp có thể dẫn đến các bệnh lý liên quan đến lối sống."},
    {"id": "u6-v14", "word": "digital transformation", "phonetic": "/ˈdɪʤɪtl ˌtrænsfəˈmeɪʃən/", "partOfSpeech": "noun", "vietnameseMeaning": "quá trình chuyển đổi số toàn diện", "englishExample": "Digital transformation is reshaping public administration, schooling, and daily commerce.", "vietnameseExample": "Chuyển đổi số đang tái định hình nền hành chính công, trường học và thương mại hàng ngày."},
    {"id": "u6-v15", "word": "work-life balance", "phonetic": "/wɜːk-laɪf ˈbæləns/", "partOfSpeech": "noun", "vietnameseMeaning": "sự cân bằng giữa công việc và cuộc sống", "englishExample": "Maintaining an optimal work-life balance ensures lasting productivity and mental peace.", "vietnameseExample": "Duy trì sự cân bằng tối ưu giữa công việc và cuộc sống đảm bảo năng suất bền vững và sự bình an tâm trí."},
    {"id": "u6-v16", "word": "folk games", "phonetic": "/fəʊk ɡeɪmz/", "partOfSpeech": "noun", "vietnameseMeaning": "các trò chơi dân gian (ô ăn quan, nhảy dây...)", "englishExample": "Children used to play folk games like mandarin square capturing in the village square.", "vietnameseExample": "Trẻ em từng chơi các trò chơi dân gian như ô ăn quan ở quảng trường làng."},
    {"id": "u6-v17", "word": "video gaming", "phonetic": "/ˈvɪdɪəʊ ˈɡeɪmɪŋ/", "partOfSpeech": "noun", "vietnameseMeaning": "chơi trò chơi điện tử trực tuyến", "englishExample": "Excessive video gaming without physical exercise can lead to sedentary health issues.", "vietnameseExample": "Chơi game điện tử quá nhiều mà không tập thể dục có thể dẫn đến các vấn đề sức khỏe do ít vận động."},
    {"id": "u6-v18", "word": "agrarian", "phonetic": "/əˈɡreərɪən/", "partOfSpeech": "adjective", "vietnameseMeaning": "thuộc về nông nghiệp, nhà nông", "englishExample": "Ancient Vietnamese agrarian society synchronized its festivals with seasonal rice cultivation cycles.", "vietnameseExample": "Xã hội nông nghiệp Việt Nam cổ xưa đồng điệu các lễ hội của mình với chu kỳ canh tác lúa theo mùa."},
    {"id": "u6-v19", "word": "interconnected", "phonetic": "/ˌɪntəkəˈnɛktɪd/", "partOfSpeech": "adjective", "vietnameseMeaning": "gắn kết liên thông, kết nối toàn cầu", "englishExample": "Today's youth grow up in a deeply interconnected globalized digital ecosystem.", "vietnameseExample": "Thanh thiếu niên ngày nay lớn lên trong một hệ sinh thái số toàn cầu hóa được kết nối sâu sắc."},
    {"id": "u6-v20", "word": "cultural identity", "phonetic": "/ˈkʌlʧərəl aɪˈdɛntɪti/", "partOfSpeech": "noun", "vietnameseMeaning": "bản sắc văn hóa dân tộc", "englishExample": "Preserving cultural identity while adopting modern technologies is a key national priority.", "vietnameseExample": "Gìn giữ bản sắc văn hóa đồng thời tiếp thu công nghệ hiện đại là một ưu tiên quốc gia trọng điểm."}
]

u6_grammar_info = {
    "title": "Mệnh Đề Quan Hệ Xác Định & Không Xác Định (Defining & Non-defining Relative Clauses: Who, Whom, Which, That, Whose)",
    "summary": "Nắm vững cách sử dụng đại từ quan hệ (Who - người, Which - vật, That - thay thế who/which trong MĐQH xác định, Whose - sở hữu) và phân biệt Mệnh đề quan hệ xác định (không có dấu phẩy) với Không xác định (có dấu phẩy, cung cấp thông tin bổ sung).",
    "formulaBox": [
        "MĐQH xác định (Defining): S + relative pronoun + clause (bắt buộc, không có dấu phẩy)",
        "Ví dụ: The woman WHO sells traditional street food has worked here for 30 years.",
        "Ví dụ: The smartphone THAT/WHICH I bought yesterday supports QR cashless payment.",
        "MĐQH không xác định (Non-defining): S, relative pronoun + clause, V (bổ sung, có dấu phẩy, KHÔNG dùng That)",
        "Ví dụ: Hanoi, WHICH is the capital of Vietnam, has preserved its ancient charm.",
        "Ví dụ: Mr. Hai, WHOSE stilt house is famous, welcomed our study tour warmly."
    ],
    "usagePoints": [
        {"title": "1. Khi nào dùng Non-defining (có dấu phẩy)", "detail": "Khi danh từ đứng trước là tên riêng, danh từ xác định bởi 'this/that/these/those' hoặc tính từ sở hữu (my, his, our...).", "example": "Duong Lam village, which is over a thousand years old, attracts many cultural researchers."},
        {"title": "2. Lưu ý cấm kỵ với 'That'", "detail": "Tuyệt đối không dùng 'That' trong mệnh đề quan hệ có dấu phẩy (Non-defining) hoặc sau giới từ.", "example": "This ancient tea set, WHICH (không dùng that) belonged to my grandmother, is priceless."}
    ]
}

u6_grammar_exs = [
    {"id": "u6-g1", "question": "The street food vendor _____ sells savory banh mi on Dinh Tien Hoang Street is very friendly.", "options": ["A. who", "B. which", "C. whose", "D. whom"], "correctAnswer": "A. who", "explanation": "Thay thế cho danh từ chỉ người 'The street food vendor' làm chủ ngữ -> dùng 'who'."},
    {"id": "u6-g2", "question": "Hoi An Ancient Town, _____ was recognized by UNESCO in 1999, attracts millions of visitors.", "options": ["A. which", "B. that", "C. who", "D. where"], "correctAnswer": "A. which", "explanation": "Mệnh đề quan hệ không xác định (có dấu phẩy) chỉ vật/địa danh -> dùng 'which' (không dùng that)."},
    {"id": "u6-g3", "question": "The mobile application _____ enables cashless QR payments was developed by Vietnamese engineers.", "options": ["A. which", "B. who", "C. whom", "D. whose"], "correctAnswer": "A. which", "explanation": "Thay thế cho danh từ chỉ vật 'The mobile application' -> dùng 'which' hoặc 'that'."},
    {"id": "u6-g4", "question": "The artisan _____ intricate ceramic vases were displayed at the exhibition received a gold medal.", "options": ["A. whose", "B. who", "C. which", "D. whom"], "correctAnswer": "A. whose", "explanation": "Chỉ sự sở hữu 'whose intricate ceramic vases' (bình gốm của nghệ nhân)."},
    {"id": "u6-g5", "question": "The elderly man _____ we interviewed in Duong Lam village shared fascinating stories about the past.", "options": ["A. whom", "B. which", "C. whose", "D. where"], "correctAnswer": "A. whom", "explanation": "Thay thế cho danh từ chỉ người làm tân ngữ của 'we interviewed' -> dùng 'whom' (hoặc who)."},
    {"id": "u6-g6", "question": "My grandfather, _____ is eighty-two years old, still rides his bicycle to the communal house.", "options": ["A. who", "B. that", "C. which", "D. whose"], "correctAnswer": "A. who", "explanation": "Mệnh đề không xác định sau 'My grandfather' chỉ người -> dùng 'who'."},
    {"id": "u6-g7", "question": "Is that the convenience store _____ is open twenty-four hours a day?", "options": ["A. which", "B. who", "C. whom", "D. whose"], "correctAnswer": "A. which", "explanation": "Thay thế cho 'the convenience store' (vật) -> dùng 'which' hoặc 'that'."},
    {"id": "u6-g8", "question": "People _____ live in bustling metropolitan cities often experience higher levels of noise pollution.", "options": ["A. who", "B. which", "C. whose", "D. whom"], "correctAnswer": "A. who", "explanation": "Thay thế cho 'People' (người) làm chủ ngữ -> dùng 'who'."},
    {"id": "u6-g9", "question": "The old wooden radio, _____ belonged to my great-grandfather, still works perfectly.", "options": ["A. which", "B. that", "C. who", "D. whose"], "correctAnswer": "A. which", "explanation": "Mệnh đề không xác định chỉ vật -> dùng 'which' (không dùng that)."},
    {"id": "u6-g10", "question": "The students _____ participated in the cultural lifestyle research project presented their findings today.", "options": ["A. who", "B. which", "C. whom", "D. whose"], "correctAnswer": "A. who", "explanation": "Thay thế cho 'The students' (người) -> dùng 'who'."},
    {"id": "u6-g11", "question": "Dr. Minh, _____ research focuses on Vietnamese agrarian folklore, gave an inspiring speech.", "options": ["A. whose", "B. who", "C. which", "D. whom"], "correctAnswer": "A. whose", "explanation": "Sở hữu: 'whose research' (nghiên cứu của Tiến sĩ Minh)."},
    {"id": "u6-g12", "question": "Online food delivery apps, _____ have become extremely popular, allow families to order meals instantly.", "options": ["A. which", "B. that", "C. who", "D. whose"], "correctAnswer": "A. which", "explanation": "Mệnh đề không xác định có dấu phẩy chỉ vật -> dùng 'which'."},
    {"id": "u6-g13", "question": "The traditional folk game _____ children played in the schoolyard is called mandarin square capturing.", "options": ["A. that", "B. who", "C. whom", "D. whose"], "correctAnswer": "A. that", "explanation": "Thay thế cho 'The traditional folk game' (vật) trong MĐQH xác định -> dùng 'that' hoặc 'which'."},
    {"id": "u6-g14", "question": "The village elder to _____ we showed the historical photographs was moved to tears.", "options": ["A. whom", "B. who", "C. that", "D. which"], "correctAnswer": "A. whom", "explanation": "Sau giới từ 'to' chỉ người bắt buộc phải dùng 'whom'."},
    {"id": "u6-g15", "question": "The electric smart scooter _____ I ride to school produces zero exhaust fumes.", "options": ["A. which", "B. who", "C. whom", "D. whose"], "correctAnswer": "A. which", "explanation": "Thay thế cho 'The electric smart scooter' (vật) -> dùng 'which' / 'that'."},
    {"id": "u6-g16", "question": "Sa Pa, _____ terraced fields attract global tourists, is a picturesque highland town.", "options": ["A. whose", "B. which", "C. who", "D. that"], "correctAnswer": "A. whose", "explanation": "Sở hữu: 'whose terraced fields' (những thửa ruộng bậc thang của Sa Pa)."},
    {"id": "u6-g17", "question": "The family values _____ our ancestors upheld remain profoundly relevant in the digital age.", "options": ["A. which", "B. who", "C. whom", "D. whose"], "correctAnswer": "A. which", "explanation": "Thay thế cho 'The family values' (vật) -> dùng 'which' hoặc 'that'."},
    {"id": "u6-g18", "question": "Nguyen Du, _____ wrote the literary masterpiece 'The Tale of Kieu', is a celebrated cultural figure.", "options": ["A. who", "B. that", "C. which", "D. whose"], "correctAnswer": "A. who", "explanation": "Mệnh đề không xác định sau tên riêng 'Nguyen Du' -> dùng 'who'."},
    {"id": "u6-g19", "question": "The modern convenience stores _____ are spreading across residential wards offer diverse ready-to-eat meals.", "options": ["A. that", "B. who", "C. whom", "D. whose"], "correctAnswer": "A. that", "explanation": "Thay thế cho 'The modern convenience stores' (vật) -> dùng 'that' / 'which'."},
    {"id": "u6-g20", "question": "This is the historical research documentary _____ explores the evolution of Vietnamese daily lifestyles.", "options": ["A. which", "B. who", "C. whom", "D. whose"], "correctAnswer": "A. which", "explanation": "Thay thế cho 'the historical research documentary' (vật) -> dùng 'which' hoặc 'that'."}
]

u6_listening_info = {
    "audioTitle": "Lối Sống Người Việt: Xưa Và Nay (Vietnamese Lifestyle: Then and Now)",
    "audioDuration": "3:25",
    "audioScriptSpeaker": "Cultural Sociologist Ms. Mai & Student Tuan",
    "transcriptText": "Tuan: Ms. Mai, how has the daily lifestyle of Vietnamese families evolved compared to fifty years ago?\nMs. Mai: Hello Tuan! The contrast is remarkable. In the past, daily commerce was anchored in open-air wet markets where neighbors bargained and chatted face-to-face. Today, modern urbanites shop at air-conditioned supermarket chains or order groceries via digital apps using QR cashless payments.\nTuan: What about recreational pastimes and social connectivity?\nMs. Mai: Decades ago, children engaged in creative folk games like dragon-snake marches and rope skipping in village squares. Now, teenagers connect through social networks and video gaming. While digital transformation brings immense convenience, it also risks reducing authentic human warmth.\nTuan: How can we harmonize modern benefits with our traditional identity?\nMs. Mai: We should embrace technological efficiency for work and study, while deliberately reserving time for family dinners and communal cultural festivals!",
    "vietnameseTranslation": "Tuấn: Cô Mai ơi, lối sống hàng ngày của các gia đình Việt Nam đã phát triển và thay đổi như thế nào so với 50 năm trước ạ?\nCô Mai: Chào Tuấn! Sự tương phản thật đáng kinh ngạc. Ngày xưa, thương mại hàng ngày gắn liền với các khu chợ dân sinh ngoài trời, nơi hàng xóm trả giá và trò chuyện trực tiếp mặt đối mặt. Ngày nay, cư dân thành thị mua sắm tại các chuỗi siêu thị có điều hòa hoặc đặt thực phẩm qua các ứng dụng số bằng thanh toán không tiền mặt qua mã QR.\nTuấn: Thế còn các trò chơi giải trí và sự gắn kết xã hội thì sao ạ?\nCô Mai: Nhiều thập kỷ trước, trẻ em chơi các trò chơi dân gian sáng tạo như rồng rắn lên mây và nhảy dây ở sân đình làng. Giờ đây, các bạn thiếu niên kết nối qua mạng xã hội và chơi game trực tuyến. Mặc dù chuyển đổi số mang lại sự tiện ích to lớn, nó cũng có nguy cơ làm giảm đi sự ấm áp chân thành giữa con người với nhau.\nTuấn: Chúng ta làm thế nào để dung hòa những lợi ích hiện đại với bản sắc truyền thống ạ?\nCô Mai: Chúng ta nên tiếp thu sự hiệu quả của công nghệ cho công việc và học tập, đồng thời chủ động dành thời gian cho những bữa cơm gia đình và các lễ hội văn hóa cộng đồng!"
}

u6_listening_qs = [
    {"id": "u6-l1", "question": "Where was daily commerce anchored in the past according to Ms. Mai?", "options": ["A. In open-air wet markets with face-to-face bargaining", "B. In automated spaceship stations", "C. Inside submarine pods", "D. On virtual reality servers only"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'anchored in open-air wet markets where neighbors bargained and chatted face-to-face.'"},
    {"id": "u6-l2", "question": "How do modern urbanites commonly buy groceries today?", "options": ["A. At air-conditioned supermarkets or via apps using QR cashless payments", "B. By hunting in jungles only", "C. By waiting for cargo ships", "D. By trading cows"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'shop at air-conditioned supermarket chains or order groceries via digital apps using QR cashless payments.'"},
    {"id": "u6-l3", "question": "What folk games did children play in village squares decades ago?", "options": ["A. Dragon-snake marches and rope skipping", "B. High-speed drone racing", "C. Virtual reality combat", "D. Watching 3D cinema"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'dragon-snake marches and rope skipping in village squares.'"},
    {"id": "u6-l4", "question": "How do contemporary teenagers connect socially today?", "options": ["A. Through social networks and video gaming", "B. By carrier pigeons only", "C. By smoke signals", "D. By banging drums"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'teenagers connect through social networks and video gaming.'"},
    {"id": "u6-l5", "question": "What potential risk accompanies rapid digital transformation?", "options": ["A. Reducing authentic human warmth and face-to-face bonding", "B. Making food too salty", "C. Turning the sky green", "D. Causing permanent winter"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'it also risks reducing authentic human warmth.'"},
    {"id": "u6-l6", "question": "How does Ms. Mai suggest harmonizing modern tools with traditional identity?", "options": ["A. Using tech for efficiency while reserving time for family dinners and cultural festivals", "B. Throwing away all computers", "C. Living without electricity forever", "D. Never talking to family members"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'embrace technological efficiency... while deliberately reserving time for family dinners and communal cultural festivals.'"},
    {"id": "u6-l7", "question": "What payment method has become widespread in Vietnamese cities?", "options": ["A. QR-code cashless payments", "B. Heavy gold coins only", "C. Bartering bags of salt", "D. Ancient cowrie shells"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'using QR cashless payments.'"},
    {"id": "u6-l8", "question": "What is the overarching theme of Ms. Mai's insights?", "options": ["A. Navigating lifestyle modernization while preserving core humanistic and cultural values", "B. Technology is completely evil", "C. Old lifestyles had no good points", "D. Supermarkets should be abolished"], "correctAnswerIndex": 0, "explanation": "Toàn bài đàm thoại làm rõ cách thích ứng với lối sống hiện đại tiện ích mà vẫn giữ gìn giá trị văn hóa truyền thống tốt đẹp."}
]

u6_listening_fibs = [
    {"id": "u6-f1", "sentenceWithBlank": "Past commerce occurred in open-air _____ markets.", "correctWord": "wet", "hint": "Chợ dân sinh truyền thống (wet markets)"},
    {"id": "u6-f2", "sentenceWithBlank": "Shoppers today pay with QR _____ payment systems.", "correctWord": "cashless", "hint": "Không dùng tiền mặt (cashless)"},
    {"id": "u6-f3", "sentenceWithBlank": "Children used to play _____ games in village squares.", "correctWord": "folk", "hint": "Dân gian (folk)"},
    {"id": "u6-f4", "sentenceWithBlank": "Families should reserve quality time for shared _____.", "correctWord": "dinners", "hint": "Bữa cơm tối (dinners)"}
]

u6_speaking = [
    {"id": f"u6-s{i+1}", "targetSentence": s, "ipa": ipa, "vietnameseMeaning": vm, "contextSituation": ctx, "keyPhonicsFocus": kpf, "sampleAudioText": s}
    for i, (s, ipa, vm, ctx, kpf) in enumerate([
        ("Vietnamese lifestyle has experienced a dramatic transformation from traditional agrarian roots to dynamic digital lifestyles.", "/ˌvjɛtnəˈmiːz ˈlaɪfstaɪl hæz ɪksˈpɪərɪənst ə drəˈmætɪk ˌtrænsfəˈmeɪʃən frɒm trəˈdɪʃənl əˈɡreərɪən ruːts tuː daɪˈnæmɪk ˈdɪʤɪtl ˈlaɪfstaɪlz/", "Lối sống của người Việt Nam đã trải qua một sự chuyển mình ngoạn mục từ cội nguồn nông nghiệp truyền thống sang phong cách sống số năng động.", "Thuyết trình về sự biến đổi lối sống.", "Phát âm chuẩn 'agrarian roots' /əˈɡreərɪən ruːts/ và 'transformation' /ˌtrænsfəˈmeɪʃən/."),
        ("In the past, homemakers who shopped at morning open-air wet markets bargained warmly with familiar vendors.", "/ɪn ðə pɑːst ˈhəʊmˌmeɪkəz huː ʃɒpt æt ˈmɔːnɪŋ ˈəʊpən-eə wɛt ˈmɑːkɪts ˈbɑːɡɪnd ˈwɔːmli wɪð fəˈmɪlɪə ˈvɛndəz/", "Ngày xưa, những người nội trợ mua sắm ở các khu chợ dân sinh buổi sáng đã trả giá và trò chuyện niềm nở với những người bán hàng quen thuộc.", "Miêu tả cảnh chợ truyền thống.", "Phát âm chuẩn mệnh đề 'homemakers who shopped' và 'bargained' /ˈbɑːɡɪnd/."),
        ("Modern urban citizens prefer air-conditioned supermarket chains that provide seamless QR-code cashless checkout.", "/ˈmɒdən ˈɜːbən ˈsɪtɪznz priˈfɜːr eə-kənˈdɪʃənd ˈsuːpəˌmɑːkɪt ʧeɪnz ðæt prəˈvaɪd ˈsiːmlɪs kjuː-ɑː-kəʊd ˈkæʃlɪs ˈʧɛkaʊt/", "Cư dân thành thị hiện đại ưa chuộng các chuỗi siêu thị có điều hòa cung cấp thanh toán không tiền mặt qua mã QR nhanh chóng mượt mà.", "Nói về xu hướng mua sắm siêu thị.", "Phát âm chuẩn 'seamless' /ˈsiːmlɪs/ và 'cashless checkout' /ˈkæʃlɪs ˈʧɛkaʊt/."),
        ("Children who used to play folk games in communal courtyards now connect through online gaming and social networks.", "/ˈʧɪldrən huː juːzd tuː pleɪ fəʊk ɡeɪmz ɪn kəˈmjuːnl ˈkɔːtˌjɑːdz naʊ kəˈnɛkt θruː ˈɒnˌlaɪn ˈɡeɪmɪŋ ænd ˈsəʊʃəl ˈnɛtwɜːks/", "Trẻ em từng chơi các trò chơi dân gian ở sân đình ngày xưa giờ đây kết nối qua game trực tuyến và mạng xã hội.", "So sánh hoạt động vui chơi trẻ em.", "Phát âm chuẩn 'communal courtyards' /kəˈmjuːnl ˈkɔːtˌjɑːdz/."),
        ("Hanoi, which is celebrated for its rich millennium heritage, harmoniously blends vintage charms with futuristic high-rises.", "/hæ nɔɪ wɪʧ ɪz ˈsɛlɪbreɪtɪd fɔːr ɪts rɪʧ mɪˈlɛnɪəm ˈhɛrɪtɪʤ ˈhɑːməniəsli blɛndz ˈvɪntɪʤ ʧɑːmz wɪð ˌfjuːʧəˈrɪstɪk ˈhaɪraɪzɪz/", "Hà Nội, nơi nổi tiếng với di sản ngàn năm phong phú, hòa quyện một cách hài hòa nét duyên dáng cổ kính với những tòa nhà chọc trời tương lai.", "Miêu tả nét đẹp giao thoa Hà Nội.", "Phát âm chuẩn mệnh đề không xác định 'Hanoi, which is celebrated...'."),
        ("The artisan whose handmade lacquerware vases won international acclaim preserves centuries-old guild secrets.", "/ði ˈɑːtɪzæn huːz ˈhændˈmeɪd ˈlækəweə ˈvɑːzɪz wʌn ˌɪntəˈnæʃənl əˈkleɪm prɪˈzɜːvz ˈsɛnʧʊriz-əʊld ɡɪld ˈsiːkrɪts/", "Nghệ nhân có những chiếc bình sơn mài thủ công đoạt giải thưởng quốc tế vẫn đang gìn giữ những bí quyết phường nghề hàng thế kỷ.", "Giới thiệu nghệ nhân sơn mài.", "Phát âm chuẩn 'lacquerware' /ˈlækəweə/ và 'acclaim' /əˈkleɪm/."),
        ("Eating nutritious home-cooked meals together strengthens empathetic communication within contemporary families.", "/ˈiːtɪŋ njuːˈtrɪʃəs həʊm-kʊkt miːlz təˈɡɛðə ˈstrɛŋθənz ˌɛmpəˈθɛtɪk kəˌmjuːnɪˈkeɪʃən wɪðˈɪn kənˈtɛmpərəri ˈfæmɪliz/", "Ăn những bữa cơm nhà bổ dưỡng cùng nhau giúp củng cố sự giao tiếp thấu cảm bên trong các gia đình đương đại.", "Nhấn mạnh giá trị bữa cơm gia đình.", "Phát âm chuẩn 'empathetic' /ˌɛmpəˈθɛtɪk/ và 'contemporary' /kənˈtɛmpərəri/."),
        ("Smartphones and high-speed internet that penetrate every corner of society facilitate instantaneous global communication.", "/ˈsmɑːtfəʊnz ænd haɪ-spiːd ˈɪntəˌnɛt ðæt ˈpɛnɪtreɪt ˈɛvri ˈkɔːnər ɒv səˈsaɪəti fəˈsɪlɪteɪt ˌɪnstənˈteɪniəs ˈɡləʊbəl kəˌmjuːnɪˈkeɪʃən/", "Điện thoại thông minh và internet tốc độ cao len lỏi vào mọi góc ngách xã hội tạo điều kiện cho sự giao tiếp toàn cầu tức thì.", "Nói về vai trò của công nghệ.", "Phát âm chuẩn 'instantaneous' /ˌɪnstənˈteɪniəs/ và 'penetrate' /ˈpɛnɪtreɪt/."),
        ("The traditional culinary habits that prioritize fresh herbs and light broths ensure longevity and vitality.", "/ðə trəˈdɪʃənl ˈkʌlɪnəri ˈhæbɪts ðæt praɪˈɒrɪˌtaɪz frɛʃ hɜːbz ænd laɪt brɒθs ɪnˈʃʊə lɒnˈʤɛvɪti ænd vaɪˈtælɪti/", "Những thói quen ẩm thực truyền thống ưu tiên rau thơm tươi và nước dùng thanh đảm bảo sự trường thọ và sức sống dồi dào.", "Nói về ẩm thực lành mạnh của Việt Nam.", "Phát âm chuẩn 'longevity' /lɒnˈʤɛvɪti/ và 'prioritize' /praɪˈɒrɪˌtaɪz/."),
        ("Street food vendors whom tourists encounter along winding alleys offer delicious, authentic gastronomic delights.", "/striːt fuːd ˈvɛndəz huːm ˈtʊərɪsts ɪnˈkaʊntər əˈlɒŋ ˈwaɪndɪŋ ˈælɪz ˈɒfə dɪˈlɪʃəs ɔːˈθɛntɪk ˌɡæstrəˈnɒmɪk dɪˈlaɪts/", "Những người bán hàng rong trên phố mà du khách bắt gặp dọc các con ngõ quanh co mang đến những món ăn ngon miệng đậm đà bản sắc.", "Khen ngợi ẩm thực đường phố.", "Phát âm chuẩn 'gastronomic' /ˌɡæstrəˈnɒmɪk/ và 'winding alleys' /ˈwaɪndɪŋ ˈælɪz/."),
        ("Maintaining a healthy work-life balance is crucial for professionals navigating intense corporate demands.", "/meɪnˈteɪnɪŋ ə ˈhɛlθi wɜːk-laɪf ˈbæləns ɪz ˈkruːʃəl fɔː prəˈfɛʃənlz ˈnævɪɡeɪtɪŋ ɪnˈtɛns ˈkɔːpərɪt dɪˈmɑːndz/", "Duy trì sự cân bằng lành mạnh giữa công việc và cuộc sống là điều tối quan trọng đối với các chuyên gia làm việc trong môi trường doanh nghiệp áp lực.", "Khuyên cân bằng lối sống.", "Phát âm chuẩn 'work-life balance' và 'corporate' /ˈkɔːpərɪt/."),
        ("Duong Lam, which is renowned as an ancient village of laterite houses, retains timeless rural tranquility.", "/zʊəŋ læm wɪʧ ɪz rɪˈnaʊnd æz ən ˈeɪnʃənt ˈvɪlɪʤ ɒv ˈlætəraɪt ˈhaʊzɪz rɪˈteɪnz ˈtaɪmlɪs ˈrʊərəl træŋˈkwɪlɪti/", "Đường Lâm, ngôi làng nổi tiếng với những ngôi nhà xây bằng đá ong cổ kính, vẫn giữ nguyên vẹn sự thanh bình thôn quê vượt thời gian.", "Giới thiệu làng cổ Đường Lâm.", "Phát âm chuẩn 'laterite' /ˈlætəraɪt/ và 'timeless' /ˈtaɪmlɪs/."),
        ("Convenience stores which operate round the clock have become popular hangout spots for urban teenagers.", "/kənˈviːniəns stɔːz wɪʧ ˈɒpəreɪt raʊnd ðə klɒk hæv bɪˈkʌm ˈpɒpjʊlə ˈhæŋaʊt spɒts fɔːr ˈɜːbən ˈtiːneɪʤəz/", "Các cửa hàng tiện lợi hoạt động suốt ngày đêm đã trở thành điểm tụ tập ưa thích của giới trẻ thành thị.", "Nói về văn hóa cửa hàng tiện lợi.", "Phát âm chuẩn 'round the clock' và 'hangout spots'."),
        ("The elderly generation whose memories bridge war and peace offers invaluable wisdom to contemporary youth.", "/ði ˈɛldəli ˌʤɛnəˈreɪʃən huːz ˈmɛmərɪz brɪʤ wɔːr ænd piːs ˈɒfəz ɪnˈvæljʊəbl ˈwɪzdəm tuː kənˈtɛmpərəri juːθ/", "Thế hệ cao niên có những ký ức nối liền thời chiến và thời bình mang lại những bài học thông thái vô giá cho tuổi trẻ ngày nay.", "Tôn vinh trí tuệ người đi trước.", "Phát âm chuẩn 'wisdom' /ˈwɪzdəm/ và 'invaluable' /ɪnˈvæljʊəbl/."),
        ("Cashless payment technologies which are adopted widely in Vietnam make daily retail transactions smooth and secure.", "/ˈkæʃlɪs ˈpeɪmənt tɛkˈnɒləʤiz wɪʧ ɑːr əˈdɒptɪd ˈwaɪdli ɪn ˌvjɛtnəˈmiːz meɪk ˈdeɪli ˈriːteɪl trænˈzækʃənz smuːð ænd sɪˈkjʊə/", "Các công nghệ thanh toán không dùng tiền mặt được ứng dụng rộng rãi ở Việt Nam giúp các giao dịch bán lẻ hàng ngày diễn ra suôn sẻ và an toàn.", "Nói về thanh toán số.", "Phát âm chuẩn 'transactions' /trænˈzækʃənz/ và 'technologies'."),
        ("We should never abandon the noble core values of filial piety, communal solidarity, and humility.", "/wiː ʃʊd ˈnɛvər əˈbændən ðə ˈnəʊbl kɔː ˈvæljuːz ɒv ˈfɪlɪəl ˈpaɪəti kəˈmjuːnl ˌsɒlɪˈdærɪti ænd hjuːˈmɪlɪti/", "Chúng ta không bao giờ được từ bỏ những giá trị cốt lõi cao đẹp như lòng hiếu thảo, tình đoàn kết cộng đồng và đức tính khiêm nhường.", "Nhắc nhở gìn giữ đạo đức truyền thống.", "Phát âm chuẩn 'humility' /hjuːˈmɪlɪti/ và 'solidarity' /ˌsɒlɪˈdærɪti/."),
        ("The digital tools that we utilize daily should serve human well-being rather than causing social isolation.", "/ðə ˈdɪʤɪtl tuːlz ðæt wiː ˈjuːtɪlaɪz ˈdeɪli ʃʊd sɜːv ˈhjuːmən wɛl-ˈbiːɪŋ ˈrɑːðə ðæn ˈkɔːzɪŋ ˈsəʊʃəl ˌaɪsəˈleɪʃən/", "Những công cụ số mà chúng ta sử dụng hàng ngày cần phục vụ cho hạnh phúc con người thay vì gây ra sự cô lập xã hội.", "Bàn về mục đích của công nghệ.", "Phát âm chuẩn 'utilize' /ˈjuːtɪlaɪz/ và 'isolation' /ˌaɪsəˈleɪʃən/."),
        ("Dr. Anh, whose research on cultural transitions was published recently, advocates for mindful technology adoption.", "/ˈdɒktər ænh huːz rɪˈsɜːʧ ɒn ˈkʌlʧərəl trænˈzɪʃənz wɒz ˈpʌblɪʃt ˈriːsntli ˈædvəkeɪts fɔː ˈmaɪndfʊl tɛkˈnɒləʤi əˈdɒpʃən/", "Tiến sĩ Ánh, người có nghiên cứu về sự chuyển đổi văn hóa được xuất bản gần đây, ủng hộ việc tiếp thu công nghệ một cách có chánh niệm.", "Giới thiệu chuyên gia văn hóa.", "Phát âm chuẩn 'advocates' /ˈædvəkeɪts/ và 'transitions' /trænˈzɪʃənz/."),
        ("Preserving our authentic cultural soul empowers Vietnamese youth to step onto the global stage with immense confidence.", "/prɪˈzɜːvɪŋ ˈaʊər ɔːˈθɛntɪk ˈkʌlʧərəl səʊl ɪmˈpaʊəz ˌvjɛtnəˈmiːz juːθ tuː stɛp ˈɒntuː ðə ˈɡləʊbəl steɪʤ wɪð ɪˈmɛns ˈkɒnfɪdəns/", "Gìn giữ cái hồn văn hóa đích thực của dân tộc tiếp thêm sức mạnh cho thanh niên Việt Nam tự tin bước ra vũ đài quốc tế.", "Thông điệp về tự hào dân tộc.", "Phát âm chuẩn 'empowers' /ɪmˈpaʊəz/ và 'cultural soul' /ˈkʌlʧərəl səʊl/."),
        ("May the harmony of traditional values and modern technological innovation enrich every Vietnamese home.", "/meɪ ðə ˈhɑːməni ɒv trəˈdɪʃənl ˈvæljuːz ænd ˈmɒdən ˌtɛknəˈlɒʤɪkəl ˌɪnəʊˈveɪʃən ɪnˈrɪʧ ˈɛvri ˌvjɛtnəˈmiːz həʊm/", "Nguyện chúc sự hòa quyện giữa các giá trị truyền thống và sự đổi mới công nghệ hiện đại sẽ làm giàu đẹp thêm cho mỗi mái ấm gia đình Việt Nam.", "Lời chúc hòa hợp truyền thống và tương lai.", "Phát âm chuẩn 'innovation' /ˌɪnəʊˈveɪʃən/ và 'enrich' /ɪnˈrɪʧ/.")
    ])
]

u6_reading_info = {
    "title": "Sự Tiến Hóa Của Lối Sống Người Việt: Giao Thoa Giữa Bản Sắc Và Hiện Đại",
    "topic": "So sánh lối sống truyền thống và hiện đại, thương mại số và bảo tồn giá trị văn hóa",
    "passageText": "Over the past several decades, the fabric of Vietnamese daily life has experienced a dramatic metamorphosis. Historically rooted in agrarian traditions, Vietnamese lifestyle revolved around close-knit village hamlets, communal agricultural routines, and extended multi-generational households. Daily commerce occurred primarily at lively open-air wet markets where community members negotiated prices, exchanged neighborhood news, and nurtured warm face-to-face bonds.\n\nIn contemporary metropolitan centers, however, the rapid acceleration of digital transformation and urbanization has inaugurated a brand-new lifestyle paradigm. Modern urbanites now frequent brightly lit 24-hour convenience stores and modern supermarket chains, while mobile applications enable seamless instant delivery and QR-code cashless transactions. Furthermore, social interactions have increasingly shifted from village communal courtyards to digital platforms and virtual connectivity.\n\nNevertheless, this rapid transition presents both remarkable conveniences and poignant sociopsychological questions. While modern technologies liberate individuals from laborious physical tasks, excessive screen immersion risks eroding deep interpersonal empathy and authentic family communion. Consequently, progressive Vietnamese thinkers champion a harmonious synthesis: leveraging cutting-edge technological tools for educational and professional productivity while steadfastly honoring traditional family dinners, ancestral veneration, and communal cultural rituals.",
    "keyVocabularyHighlights": [
        {"word": "metamorphosis", "meaning": "sự biến đổi sâu sắc, sự lột xác toàn diện"},
        {"word": "cashless transactions", "meaning": "các giao dịch thanh toán không dùng tiền mặt"},
        {"word": "harmonious synthesis", "meaning": "sự kết hợp, tổng hòa hài hòa giữa các yếu tố"},
        {"word": "ancestral veneration", "meaning": "sự tôn kính và tưởng nhớ tổ tiên"}
    ]
}

u6_reading_qs = [
    {"id": "u6-r1", "question": "What was the traditional Vietnamese lifestyle historically centered upon according to paragraph 1?", "options": ["A. Agrarian traditions, close-knit villages, communal routines, and extended families", "B. Automated factories in space", "C. Solitary living on mountain peaks", "D. High-speed racing circuits"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 1: 'rooted in agrarian traditions... revolved around close-knit village hamlets, communal agricultural routines, and extended multi-generational households.'"},
    {"id": "u6-r2", "question": "What role did open-air wet markets play besides commerce in the past?", "options": ["A. Exchanging neighborhood news and nurturing warm face-to-face bonds", "B. Launching rockets", "C. Storing military tanks", "D. Mining precious gems"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 1: 'negotiated prices, exchanged neighborhood news, and nurtured warm face-to-face bonds.'"},
    {"id": "u6-r3", "question": "What modern commercial facilities do contemporary urbanites frequent?", "options": ["A. Brightly lit 24-hour convenience stores and modern supermarket chains", "B. Underground stone caves", "C. Deep forest treehouses", "D. Abandoned train wagons"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'frequent brightly lit 24-hour convenience stores and modern supermarket chains.'"},
    {"id": "u6-r4", "question": "How have shopping transactions and food delivery transformed today?", "options": ["A. Enabled by mobile apps and QR-code cashless transactions", "B. Only through trading bags of rice", "C. Using ancient gold bars", "D. By barter only"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'mobile applications enable seamless instant delivery and QR-code cashless transactions.'"},
    {"id": "u6-r5", "question": "Where have social interactions increasingly shifted towards according to paragraph 2?", "options": ["A. Towards digital platforms and virtual connectivity", "B. Village wells only", "C. Riverboats exclusively", "D. Underground bunkers"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'shifted from village communal courtyards to digital platforms and virtual connectivity.'"},
    {"id": "u6-r6", "question": "What risk arises from excessive screen immersion in modern life?", "options": ["A. Eroding deep interpersonal empathy and authentic family communion", "B. Making people too strong", "C. Decreasing the speed of light", "D. Stopping rain from falling"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'excessive screen immersion risks eroding deep interpersonal empathy and authentic family communion.'"},
    {"id": "u6-r7", "question": "What harmonious synthesis do progressive thinkers advocate?", "options": ["A. Leveraging digital tech for productivity while steadfastly honoring traditional family and cultural rituals", "B. Banning all electricity forever", "C. Forgetting all history completely", "D. Closing down all universities"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'leveraging cutting-edge technological tools for educational and professional productivity while steadfastly honoring traditional family dinners, ancestral veneration, and communal cultural rituals.'"},
    {"id": "u6-r8", "question": "Which word in paragraph 1 is closest in meaning to 'revolved'?", "options": ["A. Centered, rotated, or focused primarily upon", "B. Stopped completely", "C. Disappeared suddenly", "D. Exploded violently"], "correctAnswerIndex": 0, "explanation": "'Revolved around' có nghĩa là xoay quanh, tập trung chủ yếu vào."},
    {"id": "u6-r9", "question": "Which word in paragraph 3 is closest in meaning to 'laborious'?", "options": ["A. Requiring heavy, arduous, or exhausting physical effort", "B. Effortless and easy", "C. Colorful and pretty", "D. Fast and sweet"], "correctAnswerIndex": 0, "explanation": "'Laborious' có nghĩa là nặng nhọc, tốn nhiều công sức vất vả."},
    {"id": "u6-r10", "question": "What is the best title for this comprehensive reading passage?", "options": ["A. The Evolution of Vietnamese Lifestyle: Harmonizing Tradition and Modernity", "B. Manufacturing Techniques for Modern Glass Skyscrapers", "C. The Biology of Marine Plankton", "D. History of European Medieval Guilds"], "correctAnswerIndex": 0, "explanation": "Tiêu đề chuẩn xác nhất phản ánh sự tiến hóa của lối sống người Việt giữa truyền thống và hiện đại."}
]

u6_writing_prompts = [
    {
        "id": "u6-w1",
        "title": "Đề 1: Write a paragraph comparing shopping at wet markets with shopping at supermarkets (60-80 words)",
        "description": "Viết một đoạn văn so sánh trải nghiệm mua sắm tại chợ truyền thống và siêu thị hiện đại.",
        "suggestedOutline": [
            "Introduction: State that shopping habits in Vietnam have evolved from wet markets to modern supermarkets.",
            "Body: Compare advantages (wet markets offer freshness and social bargaining vs supermarkets offer air conditioning and convenience).",
            "Conclusion: State which shopping mode you and your family prefer."
        ],
        "usefulPhrases": [
            "Shopping habits in Vietnam present a fascinating contrast between traditional wet markets and supermarkets...",
            "Wet markets offer fresh farm produce, friendly bargaining, and vibrant communal interactions...",
            "In contrast, modern supermarket chains provide air-conditioned comfort, clear price tags, and cashless checkout...",
            "Both retail options enrich Vietnamese daily commerce in complementary ways."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Shopping habits in Vietnam present an interesting contrast between traditional wet markets and modern supermarkets. Open-air wet markets offer remarkably fresh produce, lively bargaining, and warm social exchanges with familiar vendors. In contrast, modern supermarket chains provide air-conditioned comfort, standardized food hygiene, and rapid QR-code cashless checkout. While my mother still enjoys the vibrant human warmth of traditional wet markets, I appreciate the modern convenience of supermarkets."
    },
    {
        "id": "u6-w2",
        "title": "Đề 2: Write a paragraph on the benefits and drawbacks of online food delivery apps (60-80 words)",
        "description": "Viết một đoạn văn phân tích mặt lợi và mặt hại của các ứng dụng đặt đồ ăn trực tuyến đối với giới trẻ.",
        "suggestedOutline": [
            "Introduction: State that online food delivery apps are ubiquitous among urban youth.",
            "Body: Discuss benefits (saving time, diverse choices) vs drawbacks (eating too much fast food, less cooking at home, plastic waste).",
            "Conclusion: Advise using food apps moderately while prioritizing home meals."
        ],
        "usefulPhrases": [
            "Online food delivery applications offer undeniable convenience but also present notable drawbacks...",
            "On the one hand, users can order diverse culinary meals with a few taps during busy study hours...",
            "On the other hand, over-reliance on food apps reduces healthy home cooking and generates excessive single-use plastic waste...",
            "Therefore, teenagers should use food delivery apps sensibly while valuing home-cooked nutrition."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Online food delivery applications offer undeniable convenience but also present notable drawbacks. On the one hand, they save valuable study time and offer endless culinary choices delivered straight to your doorstep with cashless ease. On the other hand, overusing delivery apps discourages cooking fresh meals at home and generates excessive plastic packaging waste. Therefore, teenagers should utilize food apps sensibly while prioritizing nutritious home-cooked family meals."
    },
    {
        "id": "u6-w3",
        "title": "Đề 3: Write a paragraph about how smartphones have changed teenage communication (60-80 words)",
        "description": "Viết một đoạn văn phân tích cách điện thoại thông minh đã làm thay đổi cách thức giao tiếp của thanh thiếu niên.",
        "suggestedOutline": [
            "Introduction: State that smartphones have fundamentally transformed teenage communication.",
            "Body: Detail changes (instant messaging, video calls across distances vs less face-to-face talking, distraction).",
            "Conclusion: Emphasize balancing digital chatting with real-life conversations."
        ],
        "usefulPhrases": [
            "Smartphones have fundamentally revolutionized how contemporary adolescents communicate and socialize...",
            "Through social networking apps, teenagers exchange messages, share study notes, and video call friends instantaneously...",
            "However, constant screen immersion can diminish deep emotional bonding and real-life interpersonal skills...",
            "Striking a balance between online chat and genuine face-to-face interaction is essential for healthy friendships."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Smartphones have fundamentally revolutionized how contemporary teenagers communicate and socialize. With instant messaging and social media platforms, students can collaborate on group homework, share photos, and video call distant friends in seconds. However, excessive screen attachment can undermine real-life interpersonal skills and reduce heartfelt face-to-face conversations. To nurture authentic relationships, young people must balance virtual connectivity with genuine, present interactions in the real world."
    },
    {
        "id": "u6-w4",
        "title": "Đề 4: Write a paragraph on the importance of preserving traditional family dinners (60-80 words)",
        "description": "Viết một đoạn văn khẳng định tầm quan trọng của việc duy trì bữa cơm tối gia đình trong cuộc sống hiện đại.",
        "suggestedOutline": [
            "Introduction: State that traditional family dinners are the emotional anchor of every home.",
            "Body: Explain benefits (sharing daily experiences, strengthening mutual care, passing down moral values from parents).",
            "Conclusion: Urge everyone to cherish family mealtime without phone distractions."
        ],
        "usefulPhrases": [
            "Traditional family dinners remain the indispensable emotional anchor of Vietnamese household life...",
            "Gathering around the dining table allows parents and children to share daily stories and relieve tension...",
            "Moreover, home-cooked dinners pass down cultural culinary heritage and nurture deep mutual affection...",
            "Putting away smartphones during meals preserves this priceless haven of love and warmth."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Traditional family dinners remain the indispensable emotional anchor of Vietnamese household life. Gathering around a warm dinner table allows parents and children to unwind, share daily experiences, and listen to one another with heartfelt empathy. Moreover, enjoying home-cooked dishes together reinforces generational bonds and preserves our culinary heritage. Putting away digital smartphones during dinner ensures that mealtime remains a sacred space of love, laughter, and mutual care."
    },
    {
        "id": "u6-w5",
        "title": "Đề 5: Write a paragraph explaining why young people should learn traditional folk games (60-80 words)",
        "description": "Viết một đoạn văn giải thích tại sao học sinh nên học và chơi các trò chơi dân gian truyền thống.",
        "suggestedOutline": [
            "Introduction: State that traditional folk games are a valuable part of Vietnamese cultural heritage.",
            "Body: Give reasons (encourage physical exercise, foster teamwork and creativity, reduce screen addiction).",
            "Conclusion: Encourage schools to integrate folk games into break times."
        ],
        "usefulPhrases": [
            "Learning traditional Vietnamese folk games offers multifaceted benefits for contemporary students...",
            "Games like mandarin square capturing, tug-of-war, and shuttlecock kicking encourage physical agility and strategic thinking...",
            "Furthermore, playing folk games in school courtyards fosters spontaneous teamwork and relieves digital screen fatigue...",
            "Preserving these cherished games keeps our ancestors' joyful spirit alive in modern schools."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Learning traditional Vietnamese folk games offers multifaceted benefits for contemporary students. Energetic games like tug-of-war, bamboo jacks, and mandarin square capturing encourage physical agility, strategic thinking, and creative problem-solving. Furthermore, playing folk games in the schoolyard fosters vibrant teamwork and effectively relieves digital eye fatigue caused by excessive screen time. Preserving these joyful games keeps our rich cultural identity thriving in the modern era."
    }
]

unit6 = make_unit(6, "Unit 6: Vietnamese Lifestyle: Then and Now", "Lối sống người Việt: Xưa và nay", "Khám phá sự chuyển mình từ nếp sống nông thôn sang lối sống số, chợ truyền thống vs siêu thị, Mệnh đề quan hệ xác định và không xác định.", "Ngữ âm: Ngữ điệu mệnh đề quan hệ không xác định và nối âm trong các cụm từ thương mại số", "Clock", u6_vocab, u6_grammar_info, u6_grammar_exs, u6_listening_info, u6_listening_qs, u6_listening_fibs, u6_speaking, u6_reading_info, u6_reading_qs, u6_writing_prompts)
write_ts_unit(6, unit6)
print("Unit 6 generated successfully!")

