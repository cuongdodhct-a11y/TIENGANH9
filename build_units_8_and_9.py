import json
from gen_unit_utils import make_unit, write_ts_unit

# ==============================================================================
# UNIT 8: TOURISM
# ==============================================================================
u8_vocab = [
    {"id": "u8-v1", "word": "ecotourism", "phonetic": "/ˈiːkəʊˌtʊərɪzəm/", "partOfSpeech": "noun", "vietnameseMeaning": "du lịch sinh thái bền vững", "englishExample": "Ecotourism encourages travelers to respect local wildlife and minimize ecological footprints.", "vietnameseExample": "Du lịch sinh thái khuyến khích du khách tôn trọng đời sống hoang dã bản địa và giảm thiểu tác động môi trường."},
    {"id": "u8-v2", "word": "package holiday", "phonetic": "/ˈpækɪʤ ˈhɒlɪdeɪ/", "partOfSpeech": "noun", "vietnameseMeaning": "chuyến du lịch trọn gói", "englishExample": "Booking an all-inclusive package holiday saves travelers significant time and money.", "vietnameseExample": "Đặt một kỳ nghỉ trọn gói bao gồm tất cả dịch vụ giúp du khách tiết kiệm đáng kể thời gian và tiền bạc."},
    {"id": "u8-v3", "word": "jet lag", "phonetic": "/ˈʤɛt læɡ/", "partOfSpeech": "noun", "vietnameseMeaning": "sự mệt mỏi do chênh lệch múi giờ sau chuyến bay dài", "englishExample": "Drinking plenty of water and taking short power naps helps overcome severe jet lag.", "vietnameseExample": "Uống nhiều nước và chợp mắt ngắn giúp vượt qua tình trạng mệt mỏi do lệch múi giờ."},
    {"id": "u8-v4", "word": "travel guide", "phonetic": "/ˈtrævl ɡaɪd/", "partOfSpeech": "noun", "vietnameseMeaning": "sách hướng dẫn du lịch hoặc hướng dẫn viên", "englishExample": "The knowledgeable travel guide explained the spiritual folklore behind the ancient temple.", "vietnameseExample": "Người hướng dẫn viên du lịch uyên bác đã giải thích những câu chuyện dân gian tâm linh đằng sau ngôi đền cổ."},
    {"id": "u8-v5", "word": "itinerary", "phonetic": "/aɪˈtɪnərəri/", "partOfSpeech": "noun", "vietnameseMeaning": "lịch trình chuyến đi chi tiết", "englishExample": "Our 5-day travel itinerary includes exploring the imperial citadel and cruising along the bay.", "vietnameseExample": "Lịch trình du lịch 5 ngày của chúng tôi bao gồm tham quan hoàng thành và đi du thuyền quanh vịnh."},
    {"id": "u8-v6", "word": "check-in", "phonetic": "/ˈʧɛk ɪn/", "partOfSpeech": "noun", "vietnameseMeaning": "thủ tục nhận phòng hoặc làm thủ tục sân bay", "englishExample": "Online flight check-in allows passengers to select their preferred window seats in advance.", "vietnameseExample": "Làm thủ tục chuyến bay trực tuyến cho phép hành khách chọn trước chỗ ngồi cạnh cửa sổ yêu thích."},
    {"id": "u8-v7", "word": "homestay", "phonetic": "/ˈhəʊmsteɪ/", "partOfSpeech": "noun", "vietnameseMeaning": "loại hình lưu trú nhà dân bản địa", "englishExample": "Staying at an authentic homestay in Sapa offers tourists genuine cultural immersion.", "vietnameseExample": "Lưu trú tại một homestay bản địa ở Sa Pa mang đến cho du khách trải nghiệm hòa nhập văn hóa chân thực."},
    {"id": "u8-v8", "word": "sustainable tourism", "phonetic": "/səˈsteɪnəbl ˈtʊərɪzəm/", "partOfSpeech": "noun", "vietnameseMeaning": "du lịch bền vững bảo vệ môi trường và văn hóa", "englishExample": "Sustainable tourism ensures economic benefits without degrading sensitive natural ecosystems.", "vietnameseExample": "Du lịch bền vững đảm bảo lợi ích kinh tế mà không làm suy thoái các hệ sinh thái tự nhiên nhạy cảm."},
    {"id": "u8-v9", "word": "destination", "phonetic": "/ˌdɛstɪˈneɪʃən/", "partOfSpeech": "noun", "vietnameseMeaning": "điểm đến du lịch", "englishExample": "Da Nang is ranked as one of the most attractive coastal destinations in Asia.", "vietnameseExample": "Đà Nẵng được xếp hạng là một trong những điểm đến ven biển hấp dẫn nhất châu Á."},
    {"id": "u8-v10", "word": "round trip", "phonetic": "/raʊnd trɪp/", "partOfSpeech": "noun", "vietnameseMeaning": "chuyến đi khứ hồi", "englishExample": "We booked round-trip train tickets from Ha Noi to Hue for our summer vacation.", "vietnameseExample": "Chúng tôi đã đặt vé tàu khứ hồi từ Hà Nội đi Huế cho kỳ nghỉ hè."},
    {"id": "u8-v11", "word": "souvenir", "phonetic": "/ˌsuːvəˈnɪə/", "partOfSpeech": "noun", "vietnameseMeaning": "quà lưu niệm mang về", "englishExample": "Handmade silk scarves and ceramic cups are popular souvenirs among tourists.", "vietnameseExample": "Khăn lụa dệt tay và cốc gốm là những món quà lưu niệm phổ biến đối với du khách."},
    {"id": "u8-v12", "word": "hospitality", "phonetic": "/ˌhɒspɪˈtælɪti/", "partOfSpeech": "noun", "vietnameseMeaning": "lòng hiếu khách, ngành dịch vụ khách sạn", "englishExample": "Vietnamese people are universally praised for their warmth, friendliness, and heartfelt hospitality.", "vietnameseExample": "Người dân Việt Nam được ca ngợi khắp nơi nhờ sự ấm áp, thân thiện và lòng hiếu khách chân thành."},
    {"id": "u8-v13", "word": "stopover", "phonetic": "/ˈstɒpˌəʊvə/", "partOfSpeech": "noun", "vietnameseMeaning": "điểm dừng chân quá cảnh trong chuyến bay", "englishExample": "We enjoyed a 12-hour stopover in Singapore to visit the famous Jewel Changi Airport.", "vietnameseExample": "Chúng tôi đã tận hưởng 12 giờ quá cảnh tại Singapore để tham quan sân bay nổi tiếng Jewel Changi."},
    {"id": "u8-v14", "word": "off the beaten track", "phonetic": "/ɒf ðə ˈbiːtn træk/", "partOfSpeech": "idiom", "vietnameseMeaning": "nơi hẻo lánh, hoang sơ chưa nhiều người biết đến", "englishExample": "Adventurous backpackers love exploring secluded mountain villages off the beaten track.", "vietnameseExample": "Những du khách phượt thích phiêu lưu rất mê khám phá các bản làng vùng cao hoang sơ chưa nhiều người đặt chân tới."},
    {"id": "u8-v15", "word": "high season", "phonetic": "/haɪ ˈsiːzn/", "partOfSpeech": "noun", "vietnameseMeaning": "mùa cao điểm du lịch", "englishExample": "Hotel room rates increase sharply during the summer high season.", "vietnameseExample": "Giá phòng khách sạn tăng mạnh trong mùa cao điểm du lịch hè."},
    {"id": "u8-v16", "word": "low season", "phonetic": "/ləʊ ˈsiːzn/", "partOfSpeech": "noun", "vietnameseMeaning": "mùa thấp điểm du lịch", "englishExample": "Traveling during the low season guarantees quieter attractions and major travel discounts.", "vietnameseExample": "Đi du lịch vào mùa thấp điểm đảm bảo các điểm tham quan vắng vẻ hơn và có nhiều ưu đãi giảm giá lớn."},
    {"id": "u8-v17", "word": "sightseeing", "phonetic": "/ˈsaɪtˌsiːɪŋ/", "partOfSpeech": "noun", "vietnameseMeaning": "hoạt động tham quan ngắm cảnh", "englishExample": "Taking an open-top double-decker bus is a fantastic way to go sightseeing in the capital.", "vietnameseExample": "Đi xe buýt hai tầng mui trần là một cách tuyệt vời để tham quan ngắm cảnh thủ đô."},
    {"id": "u8-v18", "word": "local delicacy", "phonetic": "/ˈləʊkəl ˈdɛlɪkəsi/", "partOfSpeech": "noun", "vietnameseMeaning": "đặc sản ẩm thực địa phương", "englishExample": "Quang noodles and Cao Lau are famous local delicacies in central Viet Nam.", "vietnameseExample": "Mì Quảng và Cao Lầu là những món đặc sản ẩm thực nức tiếng của miền Trung Việt Nam."},
    {"id": "u8-v19", "word": "overtourism", "phonetic": "/ˌəʊvəˈtʊərɪzəm/", "partOfSpeech": "noun", "vietnameseMeaning": "hiện tượng quá tải khách du lịch", "englishExample": "Overtourism can degrade historic monuments and cause price inflation for residents.", "vietnameseExample": "Quá tải du lịch có thể làm xuống cấp các di tích lịch sử và gây lạm phát giá cả đối với người dân địa phương."},
    {"id": "u8-v20", "word": "breathtaking scenery", "phonetic": "/ˈbrɛθˌteɪkɪŋ ˈsiːnəri/", "partOfSpeech": "noun", "vietnameseMeaning": "phong cảnh thiên nhiên đẹp ngỡ ngàng", "englishExample": "The pass road over Ma Pi Leng offers breathtaking scenery of the deep Nho Que River gorge.", "vietnameseExample": "Cung đường đèo Mã Pí Lèng mang lại phong cảnh đẹp ngỡ ngàng của hẻm vực sâu sông Nho Quế."}
]

u8_grammar_info = {
    "title": "Danh Từ Ghép (Compound Nouns) & Mệnh Đề Quan Hệ (Relative Clauses: Who, Which, That, Where, Whose)",
    "summary": "Danh từ ghép kết hợp hai hoặc nhiều từ (Noun+Noun, Verb+Adverb, Noun+Verb). Mệnh đề quan hệ bổ nghĩa cho danh từ đứng trước.",
    "formulaBox": [
        "Compound Noun forms: Noun + Noun (bus stop, package tour, travel guide), Verb + Adverb (check-in, check-out, stopover, takeaway), Adjective + Noun (greenhouse, high season).",
        "Relative Pronouns: WHO (người làm chủ ngữ/tân ngữ), WHICH (vật/sự việc), THAT (thay cho who/which), WHERE (nơi chốn), WHOSE (sở hữu cách).",
        "Ví dụ: The tourist WHO lost his passport contacted the embassy. / This is the ancient town WHERE artisans make lanterns."
    ],
    "usagePoints": [
        {"title": "1. Cách tạo và trọng âm của danh từ ghép", "detail": "Trọng âm thường rơi vào từ đầu tiên trong danh từ ghép (PACKAGE tour, JET lag, CHECK-in).", "example": "We booked a round-trip ticket online."},
        {"title": "2. Đại từ quan hệ chỉ nơi chốn WHERE vs. WHICH", "detail": "WHERE = in/at which (chỉ địa điểm xảy ra hành động). WHICH đóng vai trò chủ ngữ hoặc tân ngữ trong mệnh đề.", "example": "The hotel WHERE we stayed was eco-friendly. / The hotel WHICH was built last year is very modern."}
    ]
}

u8_grammar_exs = [
    {"id": "u8-g1", "question": "The local travel guide _____ showed us around Hoi An was extremely knowledgeable.", "options": ["A. who", "B. which", "C. where", "D. whose"], "correctAnswer": "A. who", "explanation": "Đại từ quan hệ 'who' thay thế cho danh từ chỉ người 'The local travel guide'."},
    {"id": "u8-g2", "question": "We stayed at a lovely homestay _____ offered panoramic mountain views.", "options": ["A. which", "B. who", "C. where", "D. whose"], "correctAnswer": "A. which", "explanation": "Đại từ quan hệ 'which' thay thế cho danh từ chỉ vật 'a lovely homestay' làm chủ ngữ cho 'offered'."},
    {"id": "u8-g3", "question": "Da Nang is the coastal city _____ our family spent our memorable summer holiday.", "options": ["A. where", "B. which", "C. who", "D. whose"], "correctAnswer": "A. where", "explanation": "Trạng từ quan hệ 'where' chỉ nơi chốn diễn ra hành động 'our family spent holiday'."},
    {"id": "u8-g4", "question": "The tourist _____ luggage was lost at the airport filed a complaint.", "options": ["A. whose", "B. who", "C. which", "D. where"], "correctAnswer": "A. whose", "explanation": "Đại từ quan hệ sở hữu 'whose luggage' (hành lý của du khách đó)."},
    {"id": "u8-g5", "question": "Passengers must complete their flight _____ at least two hours before departure.", "options": ["A. check-in", "B. checkout", "C. checkup", "D. setback"], "correctAnswer": "A. check-in", "explanation": "Danh từ ghép 'check-in' (thủ tục lên máy bay/nhận phòng)."},
    {"id": "u8-g6", "question": "The souvenir _____ I purchased at the night market was handcrafted from silk.", "options": ["A. that", "B. who", "C. where", "D. whose"], "correctAnswer": "A. that", "explanation": "'that' thay cho danh từ chỉ vật 'The souvenir'."},
    {"id": "u8-g7", "question": "Long-distance international flights often cause severe _____ due to time zone differences.", "options": ["A. jet lag", "B. road trip", "C. sunstroke", "D. footprint"], "correctAnswer": "A. jet lag", "explanation": "Danh từ ghép 'jet lag' (sự mệt mỏi do lệch múi giờ)."},
    {"id": "u8-g8", "question": "This is the ancient pagoda _____ was constructed in the eleventh century.", "options": ["A. which", "B. where", "C. who", "D. whose"], "correctAnswer": "A. which", "explanation": "'which' làm chủ ngữ cho động từ bị động 'was constructed'."},
    {"id": "u8-g9", "question": "We are looking for an eco-friendly resort _____ uses one hundred percent solar power.", "options": ["A. that", "B. who", "C. where", "D. whose"], "correctAnswer": "A. that", "explanation": "'that' thay cho 'an eco-friendly resort'."},
    {"id": "u8-g10", "question": "The mountain pass _____ scenery is world-famous is called Ma Pi Leng.", "options": ["A. whose", "B. which", "C. where", "D. who"], "correctAnswer": "A. whose", "explanation": "'whose scenery' (phong cảnh của con đèo đó)."},
    {"id": "u8-g11", "question": "A _____ tour includes transportation, hotel accommodation, and meals in one single price.", "options": ["A. package", "B. stopover", "C. takeaway", "D. pileup"], "correctAnswer": "A. package", "explanation": "Cụm danh từ ghép: 'package tour' (tour du lịch trọn gói)."},
    {"id": "u8-g12", "question": "Is this the restaurant _____ serves the most authentic Quang noodles in town?", "options": ["A. which", "B. where", "C. who", "D. whose"], "correctAnswer": "A. which", "explanation": "'which' làm chủ ngữ cho động từ 'serves'."},
    {"id": "u8-g13", "question": "During the summer _____ season, tourist destinations become extremely crowded.", "options": ["A. high", "B. tall", "C. deep", "D. heavy"], "correctAnswer": "A. high", "explanation": "Cụm danh từ: 'high season' (mùa du lịch cao điểm)."},
    {"id": "u8-g14", "question": "The artisan _____ workshop we visited demonstrated how to print Dong Ho folk paintings.", "options": ["A. whose", "B. who", "C. which", "D. where"], "correctAnswer": "A. whose", "explanation": "'whose workshop' (xưởng của nghệ nhân đó)."},
    {"id": "u8-g15", "question": "The island _____ we went scuba diving is renowned for its colorful coral reefs.", "options": ["A. where", "B. which", "C. who", "D. whose"], "correctAnswer": "A. where", "explanation": "'where we went scuba diving' chỉ địa điểm lặn ngắm san hô."},
    {"id": "u8-g16", "question": "Booking a _____ trip ticket is usually cheaper than purchasing two single one-way tickets.", "options": ["A. round-trip", "B. check-in", "C. stopover", "D. touchdown"], "correctAnswer": "A. round-trip", "explanation": "'round-trip ticket' (vé khứ hồi)."},
    {"id": "u8-g17", "question": "The students _____ participated in the eco-tour planted fifty mangrove trees.", "options": ["A. who", "B. which", "C. where", "D. whose"], "correctAnswer": "A. who", "explanation": "'who' thay cho 'The students'."},
    {"id": "u8-g18", "question": "We had a two-hour _____ at Incheon Airport before flying directly to San Francisco.", "options": ["A. stopover", "B. checkout", "C. breakdown", "D. look-out"], "correctAnswer": "A. stopover", "explanation": "Danh từ ghép 'stopover' (điểm dừng quá cảnh)."},
    {"id": "u8-g19", "question": "The travel brochure _____ our teacher handed out contains detailed safety advice.", "options": ["A. which", "B. who", "C. where", "D. whose"], "correctAnswer": "A. which", "explanation": "'which' thay thế cho 'The travel brochure'."},
    {"id": "u8-g20", "question": "Phong Nha is the national park _____ Son Doong Cave is located.", "options": ["A. where", "B. which", "C. who", "D. whose"], "correctAnswer": "A. where", "explanation": "'where' chỉ nơi chốn nơi hang Sơn Đoòng tọa lạc."}
]

u8_listening_info = {
    "audioTitle": "Du Lịch Xanh Tại Sa Pa (Sustainable Tourism in Sa Pa)",
    "audioDuration": "3:15",
    "audioScriptSpeaker": "Homestay Host Mr. A Vang & Backpacker Sarah",
    "transcriptText": "Sarah: Mr. A Vang, your traditional wooden homestay in Ta Van Village is so charming!\nMr. A Vang: Welcome to Sa Pa, Sarah! Our village cooperative practices community-based ecotourism. All our meals are cooked with fresh organic vegetables harvested straight from terraced gardens.\nSarah: That is wonderful! How does ecotourism benefit the local ethnic minority families here?\nMr. A Vang: It allows us to preserve our traditional brocade weaving and indigenous culture while earning steady income. Young villagers who used to leave for big cities can now work proudly as trekking guides.\nSarah: What rules should responsible tourists follow when trekking along these scenic mountain trails?\nMr. A Vang: We ask all visitors to avoid single-use plastics, never pick endangered wild mountain orchids, and respect our spiritual sacred forests.",
    "vietnameseTranslation": "Sarah: Chào anh A Vàng, ngôi nhà homestay bằng gỗ truyền thống của anh ở bản Tả Van thật là duyên dáng!\nAnh A Vàng: Chào mừng bạn đến Sa Pa, Sarah! Hợp tác xã bản làng chúng tôi làm du lịch sinh thái cộng đồng. Mọi bữa ăn đều được nấu từ rau củ hữu cơ tươi ngon thu hoạch trực tiếp từ các thửa ruộng bậc thang.\nSarah: Thật tuyệt vời! Du lịch sinh thái mang lại lợi ích gì cho các gia đình đồng bào thiểu số ở đây vậy anh?\nAnh A Vàng: Giúp chúng tôi gìn giữ nghề dệt thổ cẩm truyền thống và văn hóa bản địa, đồng thời có nguồn thu nhập ổn định. Các thanh niên trong bản trước đây từng phải tha hương đến các thành phố lớn nay có thể tự hào làm hướng dẫn viên leo núi.\nSarah: Du khách có trách nhiệm nên tuân theo những nguyên tắc nào khi đi bộ đường dài trên các cung đường núi thơ mộng này ạ?\nAnh A Vàng: Chúng tôi mong mọi du khách tránh dùng đồ nhựa dùng một lần, tuyệt đối không hái hoa lan rừng quý hiếm và tôn trọng các khu rừng thiêng tâm linh của chúng tôi."
}

u8_listening_qs = [
    {"id": "u8-l1", "question": "Where is Mr. A Vang's traditional wooden homestay located?", "options": ["A. In Ta Van Village, Sa Pa", "B. On a beach in Phu Quoc", "C. Inside Ha Noi Old Quarter", "D. In the Mekong Delta"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'traditional wooden homestay in Ta Van Village.'"},
    {"id": "u8-l2", "question": "What type of tourism model does the village cooperative practice?", "options": ["A. Community-based ecotourism", "B. Heavy industrial mining tourism", "C. High-rise casino gambling", "D. Mass commercial tour with big buses"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'Our village cooperative practices community-based ecotourism.'"},
    {"id": "u8-l3", "question": "Where do the ingredients for meals at the homestay come from?", "options": ["A. Fresh organic vegetables harvested straight from terraced gardens", "B. Canned processed food from foreign factories", "C. Fast food stores", "D. Plastic packages"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'organic vegetables harvested straight from terraced gardens.'"},
    {"id": "u8-l4", "question": "How does ecotourism benefit young villagers according to Mr. A Vang?", "options": ["A. They can work proudly as trekking guides instead of leaving for big cities", "B. They must stop speaking their native language", "C. They have to work in coal mines", "D. They cannot stay at home"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'Young villagers who used to leave for big cities can now work proudly as trekking guides.'"},
    {"id": "u8-l5", "question": "What rule should responsible tourists follow regarding wild plants?", "options": ["A. Never pick endangered wild mountain orchids", "B. Cut down all mountain trees", "C. Collect all wild flowers to sell", "D. Burn the forest leaves"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'never pick endangered wild mountain orchids.'"},
    {"id": "u8-l6", "question": "What material are visitors urged to avoid using?", "options": ["A. Single-use plastics", "B. Reusable water bottles", "C. Warm wool jackets", "D. Sturdy hiking shoes"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'avoid single-use plastics.'"},
    {"id": "u8-l7", "question": "What traditional craft is preserved through ecotourism in Ta Van?", "options": ["A. Traditional brocade weaving", "B. Glass blowing", "C. Plastic molding", "D. Car manufacturing"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'preserve our traditional brocade weaving and indigenous culture.'"},
    {"id": "u8-l8", "question": "Who is Sarah talking to in the audio recording?", "options": ["A. Homestay Host Mr. A Vang", "B. A city bus driver", "C. A hotel receptionist in Da Nang", "D. A pilot at the airport"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'Homestay Host Mr. A Vang & Backpacker Sarah.'"}
]

u8_listening_fibs = [
    {"id": "u8-f1", "sentenceWithBlank": "The village cooperative practices community _____.", "correctWord": "ecotourism", "hint": "Du lịch sinh thái"},
    {"id": "u8-f2", "sentenceWithBlank": "Meals are cooked with fresh _____ vegetables.", "correctWord": "organic", "hint": "Thực phẩm hữu cơ sạch"},
    {"id": "u8-f3", "sentenceWithBlank": "Tourism helps preserve traditional brocade _____.", "correctWord": "weaving", "hint": "Nghề dệt thổ cẩm"},
    {"id": "u8-f4", "sentenceWithBlank": "Hikers must avoid single-use _____ on mountain trails.", "correctWord": "plastics", "hint": "Rác thải nhựa"}
]

# Speaking prompts for Unit 8 (20 items)
u8_speaking = [
    {"id": f"u8-s{i+1}", "targetSentence": s, "ipa": ipa, "vietnameseMeaning": vm, "contextSituation": ctx, "keyPhonicsFocus": kpf, "sampleAudioText": s}
    for i, (s, ipa, vm, ctx, kpf) in enumerate([
        ("Community-based ecotourism empowers local ethnic minority families while safeguarding fragile ecosystems.", "/kəˈmjuːnɪti-beɪst ˈiːkəʊˌtʊərɪzəm ɪmˈpaʊəz ˈləʊkəl ˈɛθnɪk maɪˈnɒrɪti ˈfæmɪliz waɪl ˈseɪfɡɑːdɪŋ ˈfræʤaɪl ˈiːkəʊˌsɪstɪmz/", "Du lịch sinh thái cộng đồng trao quyền cho các gia đình đồng bào thiểu số đồng thời bảo vệ các hệ sinh thái mỏng manh.", "Thuyết trình về lợi ích của du lịch sinh thái.", "Phát âm chuẩn từ 'empowers' /ɪmˈpaʊəz/ và 'ecosystems'."),
        ("Travelers who choose sustainable homestays enjoy authentic cultural immersion and delicious home-cooked meals.", "/ˈtrævələz huː ʧuːz səsˈteɪnəbl ˈhəʊmsteɪz ɪnˈʤɔɪ ɔːˈθɛntɪk ˈkʌlʧərəl ɪˈmɜːʃən ænd dɪˈlɪʃəs həʊm-kʊkt miːlz/", "Du khách lựa chọn các homestay bền vững được trải nghiệm sự hòa nhập văn hóa chân thực và những bữa cơm gia đình thơm ngon.", "Khen ngợi trải nghiệm lưu trú nhà dân.", "Phát âm chuẩn từ 'immersion' /ɪˈmɜːʃən/ và 'sustainable'."),
        ("The knowledgeable travel guide who accompanied our group shared captivating historical anecdotes about Hue Citadel.", "/ðə ˈnɒlɪʤəbl ˈtrævl ɡaɪd huː əˈkʌmpənid ˈaʊə ɡruːp ʃeəd ˈkæptɪveɪtɪŋ hɪsˈtɒrɪkəl ˈænɪkdəʊts əˈbaʊt hjuː ˈsɪtədl/", "Người hướng dẫn viên uyên bác đi cùng đoàn đã chia sẻ những câu chuyện lịch sử lôi cuốn về Cố đô Huế.", "Khen ngợi người hướng dẫn viên du lịch.", "Phát âm chuẩn từ 'anecdotes' /ˈænɪkdəʊts/ và 'knowledgeable'."),
        ("Booking an all-inclusive package tour helps holidaymakers avoid unexpected travel expenses and transport stress.", "/ˈbʊkɪŋ ən ɔːl-ɪnˈkluːsɪv ˈpækɪʤ tʊə hɛlps ˈhɒlɪdeɪˌmeɪkəz əˈvɔɪd ˌʌnɪksˈpɛktɪd ˈtrævl ɪksˈpɛnsɪz ænd ˈtrænspɔːt strɛs/", "Đặt tour du lịch trọn gói giúp du khách tránh được các khoản chi phí phát sinh và căng thẳng phương tiện đi lại.", "Khuyên bạn bè lựa chọn tour trọn gói.", "Phát âm chuẩn cụm danh từ ghép 'package tour' /ˈpækɪʤ tʊə/."),
        ("We should never purchase endangered wildlife souvenirs or leave plastic waste along hiking trails.", "/wiː ʃʊd ˈnɛvə ˈpɜːʧəs ɪnˈdeɪnʤəd ˈwaɪldlaɪf ˌsuːvəˈnɪəz ɔː liːv ˈplæstɪk weɪst əˈlɒŋ ˈhaɪkɪŋ treɪlz/", "Chúng ta tuyệt đối không nên mua quà lưu niệm từ động vật hoang dã hoặc xả rác nhựa dọc các đường mòn leo núi.", "Nhắc nhở nguyên tắc du lịch có trách nhiệm.", "Phát âm chuẩn từ 'souvenirs' /ˌsuːvəˈnɪəz/."),
        ("Exploring remote mountainous destinations off the beaten track offers unforgettable and breathtaking vistas.", "/ɪksˈplɔːrɪŋ rɪˈməʊt ˈmaʊntɪnəs ˌdɛstɪˈneɪʃənz ɒf ðə ˈbiːtn træk ˈɒfəz ˌʌnfəˈɡɛtəbl ænd ˈbrɛθˌteɪkɪŋ ˈvɪstəz/", "Khám phá các điểm đến vùng núi hoang sơ chưa nhiều người biết mang lại những tầm nhìn tuyệt đẹp không thể nào quên.", "Kể về đam mê du lịch phượt.", "Phát âm chuẩn thành ngữ 'off the beaten track'."),
        ("The coastal resort where we spent our summer vacation utilized one hundred percent renewable solar electricity.", "/ðə ˈkəʊstl rɪˈzɔːt weə wiː spɛnt ˈaʊə ˈsʌmə vəˈkeɪʃən ˈjuːtɪlaɪzd wʌn ˈhʌndrəd pəˈsɛnt rɪˈnjuːəbl ˈsəʊlə ɪlɛkˈtrɪsɪti/", "Khu nghỉ dưỡng ven biển nơi chúng tôi nghỉ hè đã sử dụng 100% điện năng lượng mặt trời tái tạo.", "Khen ngợi khu nghỉ dưỡng xanh.", "Phát âm chuẩn trạng từ quan hệ 'where' và 'renewable'."),
        ("Drinking enough water and adjusting sleep schedules in advance helps international passengers mitigate jet lag.", "/ˈdrɪŋkɪŋ ɪˈnʌf ˈwɔːtər ænd əˈʤʌstɪŋ sliːp ˈʃɛdjuːlz ɪn ədˈvɑːns hɛlps ˌɪntəˈnæʃənl ˈpæsɪnʤəz ˈmɪtɪɡeɪt ʤɛt læɡ/", "Uống đủ nước và điều chỉnh lịch ngủ từ trước giúp hành khách quốc tế giảm bớt sự mệt mỏi do lệch múi giờ.", "Mẹo chống say máy bay và lệch múi giờ.", "Phát âm chuẩn từ 'mitigate' /ˈmɪtɪɡeɪt/ và 'jet lag'."),
        ("Hoi An is an ancient trading port where vibrant silk lanterns illuminate tranquil riverside alleyways at night.", "/hɔɪ æn ɪz ən ˈeɪnʃənt ˈtreɪdɪŋ pɔːt weə ˈvaɪbrənt sɪlk ˈlæntənz ɪˈluːmɪneɪt ˈtræŋkwɪl ˈrɪvəsaɪd ˈæliweɪz æt naɪt/", "Hội An là thương cảng cổ nơi những chiếc đèn lồng lụa rực rỡ thắp sáng các con hẻm ven sông thanh bình về đêm.", "Giới thiệu vẻ đẹp đêm phố cổ Hội An.", "Phát âm chuẩn từ 'illuminate' /ɪˈluːmɪneɪt/ và 'tranquil'."),
        ("Overtourism can inflict severe damage on fragile historical ruins and cause congestion for local residents.", "/ˌəʊvəˈtʊərɪzəm kæn ɪnˈflɪkt sɪˈvɪə ˈdæmɪʤ ɒn ˈfræʤaɪl hɪsˈtɒrɪkəl ˈruːɪnz ænd kɔːz kənˈʤɛsʧən fɔː ˈləʊkəl ˈrɛzɪdənts/", "Tình trạng quá tải du lịch có thể gây tổn hại nghiêm trọng đến các phế tích lịch sử và làm tắc nghẽn giao thông dân cư.", "Cảnh báo tác hại của du lịch quá tải.", "Phát âm chuẩn từ 'overtourism' /ˌəʊvəˈtʊərɪzəm/ và 'ruins'."),
        ("Passengers should complete their online check-in twenty-four hours prior to scheduled departure.", "/ˈpæsɪnʤəz ʃʊd kəmˈpliːt ðeər ˈɒnˌlaɪn ˈʧɛk-ɪn ˈtwɛnti-fɔːr ˈaʊəz ˈpraɪə tuː ˈʃɛdjuːld dɪˈpɑːʧə/", "Hành khách nên hoàn tất thủ tục check-in trực tuyến hai mươi bốn giờ trước giờ khởi hành dự kiến.", "Hướng dẫn thủ tục hàng không.", "Phát âm chuẩn từ 'check-in' và 'departure' /dɪˈpɑːʧə/."),
        ("Tasting regional delicacies at bustling night markets is one of the most delightful joys of traveling.", "/ˈteɪstɪŋ ˈriːʤənl ˈdɛlɪkəsiz æt ˈbʌslɪŋ naɪt ˈmɑːkɪts ɪz wʌn ɒv ðə məʊst dɪˈlaɪtfʊl ʤɔɪz ɒv ˈtrævlɪŋ/", "Thưởng thức các món đặc sản vùng miền tại các khu chợ đêm nhộn nhịp là một trong những niềm vui thú vị nhất khi đi du lịch.", "Nói về đam mê ẩm thực du lịch.", "Phát âm chuẩn từ 'delicacies' /ˈdɛlɪkəsiz/."),
        ("The artisan whose family has crafted conical hats for four generations demonstrated his meticulous stitching technique.", "/ði ˈɑːtɪzæn huːz ˈfæmɪli hæz ˈkrɑːftɪd ˈkɒnɪkəl hæts fɔː fɔː ˌʤɛnəˈreɪʃənz ˈdɛmənstreɪtɪd hɪz mɪˈtɪkjʊləs ˈstɪʧɪŋ tɛkˈniːk/", "Nghệ nhân có gia đình làm nón lá suốt bốn thế hệ đã trình diễn kỹ thuật khâu nón vô cùng tỉ mỉ của mình.", "Thuyết minh về nghệ nhân làng nghề.", "Phát âm chuẩn đại từ quan hệ sở hữu 'whose family'."),
        ("Traveling during the low season guarantees affordable room rates, personalized service, and serene environments.", "/ˈtrævlɪŋ ˈdjʊərɪŋ ðə ləʊ ˈsiːzn ˌɡærənˈtiːz əˈfɔːdəbl ruːm reɪts ˈpɜːsənəlaɪzd ˈsɜːvɪs ænd sɪˈriːn ɪnˈvaɪərənmənts/", "Đi du lịch vào mùa thấp điểm đảm bảo giá phòng phải chăng, dịch vụ chu đáo và không gian thanh bình.", "Phân tích ưu điểm của du lịch trái mùa.", "Phát âm chuẩn từ 'guarantees' /ˌɡærənˈtiːz/."),
        ("We enjoyed an exhilarating boat excursion that navigated through mystical karst water grottos in Ninh Binh.", "/wiː ɪnˈʤɔɪd ən ɪɡˈzɪləreɪtɪŋ bəʊt ɪksˈkɜːʃən ðæt ˈnævɪɡeɪtɪd θruː ˈmɪstɪkəl kɑːst ˈwɔːtə ˈɡrɒtəʊz ɪn nɪn bɪn/", "Chúng tôi đã tận hưởng chuyến du ngoạn bằng thuyền thú vị luồn lách qua các hang nước karst huyền ảo ở Ninh Bình.", "Miêu tả chuyến đi thuyền Tràng An.", "Phát âm chuẩn từ 'exhilarating' /ɪɡˈzɪləreɪtɪŋ/ và 'grottos'."),
        ("Responsible ecotourists always respect indigenous sacred customs and dress modestly when visiting temples.", "/rɪsˈpɒnsəbl ˈiːkəʊˌtʊərɪsts ˈɔːlweɪz rɪsˈpɛkt ɪnˈdɪʤɪnəs ˈseɪkrɪd ˈkʌstəmz ænd drɛs ˈmɒdɪstli wɛn ˈvɪzɪtɪŋ ˈtɛmplz/", "Du khách sinh thái có trách nhiệm luôn tôn trọng các phong tục thiêng liêng bản địa và ăn mặc lịch sự khi viếng đền chùa.", "Lời khuyên văn hóa khi tham quan chốn tôn nghiêm.", "Phát âm chuẩn từ 'modestly' /ˈmɒdɪstli/."),
        ("The high-speed train which connects major urban cities offers comfortable seating and panoramic landscape views.", "/ðə haɪ-spiːd treɪn wɪʧ kəˈnɛkts ˈmeɪʤər ˈɜːbən ˈsɪtiz ˈɒfəz ˈkʌmfətəbl ˈsiːtɪŋ ænd ˌpænəˈræmɪk ˈlænskeɪp vjuːz/", "Tuyến tàu cao tốc kết nối các thành phố lớn mang lại chỗ ngồi thoải mái và tầm nhìn phong cảnh bao la.", "Nói về trải nghiệm tàu hỏa du lịch.", "Phát âm chuẩn đại từ 'which connects'."),
        ("Preserving intangible cultural heritage along with pristine landscapes fosters lasting pride and prosperity.", "/prɪˈzɜːvɪŋ ɪnˈtænʤəbl ˈkʌlʧərəl ˈhɛrɪtɪʤ əˈlɒŋ wɪð ˈprɪstiːn ˈlænskeɪps ˈfɒstəz ˈlɑːstɪŋ praɪd ænd prɒsˈpɛrɪti/", "Bảo tồn di sản văn hóa phi vật thể cùng cảnh quan nguyên sơ nuôi dưỡng niềm tự hào và sự thịnh vượng lâu dài.", "Khẳng định ý nghĩa của bảo tồn di sản.", "Phát âm chuẩn từ 'intangible' /ɪnˈtænʤəbl/."),
        ("Tourists who carry reusable stainless steel water bottles help prevent tons of plastic pollution annually.", "/ˈtʊərɪsts huː ˈkæri riːˈjuːzəbl ˈsteɪnlɪs stiːl ˈwɔːtə ˈbɒtlz hɛlp prɪˈvɛnt tʌnz ɒv ˈplæstɪk pəˈluːʃən ˈænjʊəli/", "Du khách mang theo bình nước inox tái sử dụng giúp ngăn chặn hàng tấn rác thải nhựa mỗi năm.", "Kêu gọi giảm thiểu rác thải nhựa du lịch.", "Phát âm chuẩn từ 'stainless steel' /ˈsteɪnlɪs stiːl/."),
        ("May your travels across Viet Nam bring you joyful memories, profound discoveries, and lifelong friendships.", "/meɪ jɔː ˈtrævlz əˈkrɒs ˌvjɛt ˈnɑːm brɪŋ juː ˈʤɔɪfʊl ˈmɛməriz prəˈfaʊnd dɪsˈkʌvəriz ænd ˈlaɪflɒŋ ˈfrɛndʃɪps/", "Chúc những chuyến hành trình khắp Việt Nam mang đến cho bạn những kỷ niệm ngọt ngào, những khám phá sâu sắc và tình bạn bền chặt.", "Lời chúc kết thúc chuyến hành trình.", "Phát âm chuẩn từ 'profound' /prəˈfaʊnd/ và 'lifelong'.")
    ])
]

u8_reading_info = {
    "title": "Du Lịch Sinh Thái Bền Vững: Xu Hướng Khám Phá Xanh Của Thế Hệ Trẻ",
    "topic": "Du lịch sinh thái & Trách nhiệm bảo vệ môi trường",
    "passageText": "In an era characterized by rapid global mobility and expanding tourism infrastructure, the travel industry has reached a crucial turning point. Traditional mass tourism, which often prioritized rapid commercial profits over environmental conservation, has caused severe ecological strains: overflowing plastic waste in pristine bays, degraded coral reefs, and cultural commodification. In response, a transformative paradigm known as sustainable ecotourism has emerged as a beacon of progressive travel.\n\nEcotourism fundamentally shifts the focus from passive consumption to conscious appreciation and active stewardship. Responsible travelers seek authentic homestays where revenue directly enriches local indigenous host families rather than multinational hotel chains. In regions like Sa Pa, Mai Chau, and Phong Nha, community-based cooperatives empower local villagers to guide hiking expeditions, prepare organic culinary delights, and showcase ancestral handicrafts.\n\nMoreover, sustainable travelers adhere to strict environmental ethics: carrying reusable canteens, respecting wildlife boundaries, and participating in habitat reforestation projects. By fostering cross-cultural understanding and funding biodiversity reserves, ecotourism proves that travel can be a powerful catalyst for healing our planet and uplifting local communities.",
    "keyVocabularyHighlights": [
        {"word": "cultural commodification", "meaning": "sự thương mại hóa làm mất bản sắc văn hóa"},
        {"word": "active stewardship", "meaning": "tinh thần trách nhiệm và chăm sóc bảo vệ thiên nhiên chủ động"},
        {"word": "community-based cooperatives", "meaning": "các hợp tác xã du lịch cộng đồng bản địa"},
        {"word": "cross-cultural catalyst", "meaning": "chất xúc tác thúc đẩy sự hiểu biết giao thoa văn hóa"}
    ]
}

u8_reading_qs = [
    {"id": "u8-r1", "question": "What negative impacts did traditional mass tourism cause according to paragraph 1?", "options": ["A. Severe ecological strains, plastic waste, degraded coral reefs, and cultural commodification", "B. Lack of airplanes", "C. Too much quietness", "D. Falling hotel prices"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 1: 'overflowing plastic waste in pristine bays, degraded coral reefs, and cultural commodification.'"},
    {"id": "u8-r2", "question": "How does sustainable ecotourism fundamentally differ from mass tourism?", "options": ["A. It shifts focus from passive consumption to conscious appreciation and active stewardship", "B. It bans all people from traveling", "C. It builds bigger shopping malls", "D. It cuts down national forests"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'shifts the focus from passive consumption to conscious appreciation and active stewardship.'"},
    {"id": "u8-r3", "question": "Where does revenue from authentic homestays directly go?", "options": ["A. Directly enriches local indigenous host families", "B. Foreign advertising companies only", "C. Big car manufacturers", "D. Space agencies"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'revenue directly enriches local indigenous host families.'"},
    {"id": "u8-r4", "question": "Which Vietnamese regions are mentioned as examples of community cooperatives?", "options": ["A. Sa Pa, Mai Chau, and Phong Nha", "B. Only central London", "C. Desert regions in Africa", "D. Tokyo airport"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'In regions like Sa Pa, Mai Chau, and Phong Nha.'"},
    {"id": "u8-r5", "question": "What activities do community cooperatives empower villagers to do?", "options": ["A. Guide hiking expeditions, cook organic meals, and showcase handicrafts", "B. Drive heavy industrial bulldozers", "C. Cut mountain trees for factories", "D. Abandon their hometowns"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'empower local villagers to guide hiking expeditions, prepare organic culinary delights, and showcase ancestral handicrafts.'"},
    {"id": "u8-r6", "question": "What environmental ethics do sustainable travelers adhere to?", "options": ["A. Carrying reusable canteens, respecting wildlife, and participating in reforestation", "B. Leaving plastic bags everywhere", "C. Feeding wild animals candy", "D. Playing loud music all night"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'carrying reusable canteens, respecting wildlife boundaries, and participating in habitat reforestation.'"},
    {"id": "u8-r7", "question": "Which word in paragraph 1 is closest in meaning to 'strains'?", "options": ["A. Pressures, burdens, and severe stress", "B. Songs", "C. Gifts", "D. Ropes"], "correctAnswerIndex": 0, "explanation": "'Ecological strains' mang nghĩa áp lực và gánh nặng sinh thái nặng nề."},
    {"id": "u8-r8", "question": "Which word in paragraph 3 is closest in meaning to 'catalyst'?", "options": ["A. An agent or force that causes positive change / Stimulus", "B. A dangerous poison", "C. A heavy lock", "D. An old vehicle"], "correctAnswerIndex": 0, "explanation": "'Catalyst for healing' có nghĩa là chất xúc tác, động lực thúc đẩy sự thay đổi tích cực."},
    {"id": "u8-r9", "question": "How does ecotourism benefit cross-cultural relations?", "options": ["A. By fostering mutual cross-cultural understanding and empathy", "B. By causing arguments between visitors and locals", "C. By eliminating local languages", "D. By forcing tourists to stay indoors"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'fostering cross-cultural understanding.'"},
    {"id": "u8-r10", "question": "What is the best overall title for this reading passage?", "options": ["A. Sustainable Ecotourism: The Green Discovery Trend of the Modern Era", "B. How to Construct Luxury Five-Star Hotels", "C. The Decline of World Airlines", "D. The History of Cruise Ships"], "correctAnswerIndex": 0, "explanation": "Toàn bài đọc tôn vinh xu hướng du lịch sinh thái bền vững và trách nhiệm bảo vệ môi trường."}
]

u8_writing_prompts = [
    {
        "id": "u8-w1",
        "title": "Đề 1: Write a paragraph describing a memorable tourist destination in Viet Nam (60-80 words)",
        "description": "Viết một đoạn văn giới thiệu về một điểm đến du lịch đáng nhớ ở Việt Nam mà em từng đến hoặc muốn đến (Đà Nẵng, Sa Pa, Hội An, Phú Quốc...).",
        "suggestedOutline": [
            "Introduction: Name the destination and where it is located.",
            "Body: Describe what makes it special (scenery, food, hospitality, activities).",
            "Conclusion: State why you recommend this place to everyone."
        ],
        "usefulPhrases": [
            "One of the most memorable travel destinations in Viet Nam is...",
            "It attracts tourists with its picturesque landscapes and...",
            "Visitors can savor mouthwatering local delicacies such as...",
            "I highly recommend this captivating destination to all travel enthusiasts."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "One of the most memorable travel destinations in Viet Nam is Da Nang, a vibrant coastal city. Renowned for its pristine My Khe Beach and the architectural marvel of the Golden Bridge on Ba Na Hills, it offers unforgettable experiences. Travelers can also savor mouthwatering local delicacies like Quang noodles and crispy banh xeo. The local residents are exceptionally hospitable and friendly. I highly recommend Da Nang to anyone seeking a dynamic yet relaxing vacation."
    },
    {
        "id": "u8-w2",
        "title": "Đề 2: Write a paragraph giving advice on how to be a responsible ecotourist (60-80 words)",
        "description": "Viết một đoạn văn đưa ra lời khuyên về cách trở thành một du khách sinh thái có trách nhiệm với môi trường và văn hóa bản địa.",
        "suggestedOutline": [
            "Introduction: State that responsible ecotourism is essential today.",
            "Body: Give 2-3 specific rules (carrying reusable bottles, staying in local homestays, respecting dress codes at temples).",
            "Conclusion: Confirm that responsible travel protects our planet."
        ],
        "usefulPhrases": [
            "Being a responsible ecotourist is vital to preserve our natural environment...",
            "First, travelers should carry reusable stainless steel bottles and avoid single-use plastics...",
            "Second, staying at local homestays directly supports indigenous families...",
            "By traveling mindfully, we protect delicate ecosystems for future generations."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Being a responsible ecotourist is vital to safeguarding our natural and cultural treasures. First, travelers should bring reusable water bottles and fabric tote bags to eliminate single-use plastic waste. Second, booking community-based homestays helps support ethnic minority families directly. Furthermore, visitors must respect local sacred customs and dress modestly when visiting ancient temples. By adopting these mindful habits, we ensure that tourism remains a positive force for local communities."
    },
    {
        "id": "u8-w3",
        "title": "Đề 3: Write a paragraph comparing package tours and independent backpacking (60-80 words)",
        "description": "Viết một đoạn văn so sánh giữa đi du lịch trọn gói (package tour) và đi phượt tự túc (backpacking).",
        "suggestedOutline": [
            "Introduction: State that travelers can choose between package tours and independent backpacking.",
            "Body: Compare convenience/safety of package tours vs. flexibility/adventure of backpacking.",
            "Conclusion: State which travel style you personally prefer."
        ],
        "usefulPhrases": [
            "Both package tours and independent backpacking have distinct advantages...",
            "While package tours offer stress-free itineraries and guaranteed accommodation...",
            "Independent backpacking allows adventurous travelers the freedom to explore off the beaten track...",
            "Personally, I prefer... because..."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Both package tours and independent backpacking offer distinct advantages for travelers. Package tours provide structured itineraries, pre-booked hotels, and knowledgeable guides, making them stress-free for families. In contrast, independent backpacking grants adventurers the flexibility to explore off the beaten track and immerse themselves in local lifestyles on their own schedule. Personally, I prefer independent travel because it fosters self-reliance, spontaneous discoveries, and authentic cross-cultural connections."
    },
    {
        "id": "u8-w4",
        "title": "Đề 4: Write a paragraph about how to overcome jet lag on long-distance flights (60-80 words)",
        "description": "Viết một đoạn văn chia sẻ các mẹo khắc phục tình trạng mệt mỏi do lệch múi giờ (jet lag) khi bay quốc tế.",
        "suggestedOutline": [
            "Introduction: Introduce jet lag as a common challenge for long-distance travelers.",
            "Body: Suggest 2 practical tips (drinking plenty of water, adjusting sleep schedule to the destination time zone before flying).",
            "Conclusion: Conclude that good preparation ensures an enjoyable holiday."
        ],
        "usefulPhrases": [
            "Jet lag can cause exhaustion and insomnia on long-haul flights...",
            "To overcome this, passengers should hydrate regularly and avoid caffeinated drinks...",
            "Additionally, adjusting your watch and sleeping rhythm to the new time zone is crucial...",
            "These proactive steps help travelers stay energized upon arrival."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Jet lag is a frequent challenge for travelers crossing multiple time zones on long-haul flights. To minimize fatigue, passengers should drink plenty of fresh water and avoid caffeinated beverages during flight. Additionally, adjusting your watch and sleeping schedule to the destination's local time a day before departure helps your biological clock adapt smoothly. Taking short morning walks in natural sunlight upon arrival effectively resets your circadian rhythm and boosts daytime alertness."
    },
    {
        "id": "u8-w5",
        "title": "Đề 5: Write a paragraph explaining the benefits of staying in an authentic homestay (60-80 words)",
        "description": "Viết một đoạn văn nêu các lợi ích của việc lưu trú tại homestay nhà dân bản địa.",
        "suggestedOutline": [
            "Introduction: Introduce homestays as a popular and enriching travel accommodation.",
            "Body: Highlight benefits (eating authentic home-cooked food, learning local customs, directly aiding the local economy).",
            "Conclusion: Recommend homestays for meaningful travel."
        ],
        "usefulPhrases": [
            "Staying in an authentic homestay offers a profoundly enriching travel experience...",
            "Guests have the unique opportunity to share traditional meals cooked with fresh local ingredients...",
            "Moreover, homestays allow travelers to learn ancestral customs and folklore firsthand...",
            "It is a heartwarming way to support local hosts while making lasting memories."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Staying in an authentic homestay offers a deeply enriching and memorable travel experience. Unlike impersonal high-rise hotels, homestays allow guests to interact warmly with host families, savor traditional home-cooked delicacies, and learn indigenous folklore firsthand. Furthermore, money spent on homestays directly improves the living standards of local villagers. For travelers seeking genuine cultural immersion and meaningful human connections, choosing a homestay is the ultimate choice."
    }
]

unit8 = make_unit(8, "Unit 8: Tourism", "Du lịch bền vững & Khám phá thế giới", "Khám phá các loại hình du lịch sinh thái, danh từ ghép (Compound Nouns) và mệnh đề quan hệ (Relative Clauses).", "Ngữ âm: Trọng âm của danh từ ghép và ngữ điệu câu có mệnh đề quan hệ", "Plane", u8_vocab, u8_grammar_info, u8_grammar_exs, u8_listening_info, u8_listening_qs, u8_listening_fibs, u8_speaking, u8_reading_info, u8_reading_qs, u8_writing_prompts)
write_ts_unit(8, unit8)
print("Unit 8 generated successfully!")
