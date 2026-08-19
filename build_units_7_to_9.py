import json
from gen_unit_utils import make_unit, write_ts_unit

# ==============================================================================
# UNIT 7: NATURAL WONDERS OF THE WORLD
# ==============================================================================
u7_vocab = [
    {"id": "u7-v1", "word": "magnificent", "phonetic": "/mæɡˈnɪfɪsnt/", "partOfSpeech": "adjective", "vietnameseMeaning": "hùng vĩ tráng lệ, tuyệt mỹ", "englishExample": "The Grand Canyon displays magnificent layers of red sedimentary rock carved over geological epochs.", "vietnameseExample": "Hẻm núi Grand Canyon phô diễn những tầng đá trầm tích đỏ tráng lệ được bồi đắp qua nhiều kỷ nguyên địa chất."},
    {"id": "u7-v2", "word": "coral reef", "phonetic": "/ˈkɒrəl riːf/", "partOfSpeech": "noun", "vietnameseMeaning": "rạn san hô biển", "englishExample": "The Great Barrier Reef in Australia is the largest living coral reef ecosystem on Earth.", "vietnameseExample": "Rạn san hô Great Barrier ở Úc là hệ sinh thái san hô sống lớn nhất trên Trái Đất."},
    {"id": "u7-v3", "word": "aurora borealis", "phonetic": "/ɔːˈrɔːrə ˌbɔːriˈeɪlɪs/", "partOfSpeech": "noun", "vietnameseMeaning": "hiện tượng cực quang phương Bắc (Bắc cực quang)", "englishExample": "The aurora borealis illuminates arctic night skies with dancing curtains of green and purple light.", "vietnameseExample": "Hiện tượng Bắc cực quang thắp sáng bầu trời đêm vùng cực với những dải rèm ánh sáng xanh lá và tím khiêu vũ."},
    {"id": "u7-v4", "word": "glacier", "phonetic": "/ˈɡlæsiə/", "partOfSpeech": "noun", "vietnameseMeaning": "sông băng, khối băng trôi khổng lồ", "englishExample": "Melting glaciers in Greenland are an alarming consequence of global climate change.", "vietnameseExample": "Các dòng sông băng tan chảy ở Greenland là hệ quả đáng báo động của biến đổi khí hậu toàn cầu."},
    {"id": "u7-v5", "word": "waterfall", "phonetic": "/ˈwɔːtəfɔːl/", "partOfSpeech": "noun", "vietnameseMeaning": "thác nước tự nhiên", "englishExample": "Victoria Falls on the Zambezi River is famed for its thunderous roar and misty rainbow spray.", "vietnameseExample": "Thác Victoria trên sông Zambezi nổi tiếng với tiếng gầm sấm sét và làn sương mù cầu vồng lung linh."},
    {"id": "u7-v6", "word": "canyon", "phonetic": "/ˈkænjən/", "partOfSpeech": "noun", "vietnameseMeaning": "hẻm núi sâu, vực thẳm", "englishExample": "The Colorado River carved the colossal canyon over millions of years.", "vietnameseExample": "Dòng sông Colorado đã kiến tạo nên hẻm núi khổng lồ này qua hàng triệu năm."},
    {"id": "u7-v7", "word": "volcano", "phonetic": "/vɒlˈkeɪnəʊ/", "partOfSpeech": "noun", "vietnameseMeaning": "ngọn núi lửa", "englishExample": "Mount Fuji is an iconic dormant volcano crowned with symmetrical snowcaps in Japan.", "vietnameseExample": "Núi Phú Sĩ là một ngọn núi lửa đang ngủ say mang tính biểu tượng với đỉnh tuyết phủ cân đối ở Nhật Bản."},
    {"id": "u7-v8", "word": "summit", "phonetic": "/ˈsʌmɪt/", "partOfSpeech": "noun", "vietnameseMeaning": "đỉnh cao nhất của ngọn núi", "englishExample": "Reaching the icy summit of Mount Everest requires peak physical endurance and oxygen tanks.", "vietnameseExample": "Chinh phục đỉnh tuyết phủ băng giá Everest đòi hỏi thể lực dẻo dai đỉnh cao và bình dưỡng khí."},
    {"id": "u7-v9", "word": "ecosystem", "phonetic": "/ˈiːkəʊˌsɪstɪm/", "partOfSpeech": "noun", "vietnameseMeaning": "hệ sinh thái tự nhiên", "englishExample": "The Amazon Rainforest represents the most biodiverse terrestrial ecosystem on our planet.", "vietnameseExample": "Rừng nhiệt đới Amazon đại diện cho hệ sinh thái trên cạn đa dạng sinh học nhất trên hành tinh chúng ta."},
    {"id": "u7-v10", "word": "geyser", "phonetic": "/ˈɡiːzə/", "partOfSpeech": "noun", "vietnameseMeaning": "mạch nước phun nước nóng ngầm", "englishExample": "Old Faithful in Yellowstone National Park is a world-famous geothermal geyser.", "vietnameseExample": "Old Faithful tại Vườn quốc gia Yellowstone là một mạch nước phun địa nhiệt nổi tiếng thế giới."},
    {"id": "u7-v11", "word": "endangered species", "phonetic": "/ɪnˈdeɪnʤəd ˈspiːʃiːz/", "partOfSpeech": "noun", "vietnameseMeaning": "các loài sinh vật có nguy cơ tuyệt chủng", "englishExample": "Strict environmental laws protect endangered species living inside international nature reserves.", "vietnameseExample": "Luật môi trường nghiêm ngặt bảo vệ các loài có nguy cơ tuyệt chủng đang sinh sống trong các khu bảo tồn thiên nhiên quốc tế."},
    {"id": "u7-v12", "word": "quantifier", "phonetic": "/ˈkwɒntɪfaɪə/", "partOfSpeech": "noun", "vietnameseMeaning": "từ chỉ số lượng (much, many, few, little...)", "englishExample": "Quantifiers are used before nouns to specify exact or general amounts of objects.", "vietnameseExample": "Từ chỉ số lượng được dùng trước danh từ để xác định số lượng cụ thể hoặc khái quát của sự vật."},
    {"id": "u7-v13", "word": "archipelago", "phonetic": "/ˌɑːkɪˈpɛləɡəʊ/", "partOfSpeech": "noun", "vietnameseMeaning": "quần đảo gồm nhiều đảo nhỏ", "englishExample": "The Galapagos Archipelago is celebrated for its unique wildlife and Darwin's evolutionary studies.", "vietnameseExample": "Quần đảo Galapagos nổi tiếng với các loài động vật hoang dã độc đáo và các nghiên cứu tiến hóa của Darwin."},
    {"id": "u7-v14", "word": "monolithic", "phonetic": "/ˌmɒnəˈlɪθɪk/", "partOfSpeech": "adjective", "vietnameseMeaning": "nguyên khối đá tự nhiên khổng lồ", "englishExample": "Uluru in central Australia is an immense monolithic sandstone formation sacred to indigenous peoples.", "vietnameseExample": "Uluru ở miền trung nước Úc là một khối đá sa thạch nguyên khối khổng lồ thiêng liêng đối với người bản địa."},
    {"id": "u7-v15", "word": "rainforest", "phonetic": "/ˈreɪnˌfɒrɪst/", "partOfSpeech": "noun", "vietnameseMeaning": "rừng mưa nhiệt đới", "englishExample": "Tropical rainforests act as the lungs of our planet by absorbing billions of tons of carbon.", "vietnameseExample": "Các khu rừng mưa nhiệt đới hoạt động như lá phổi xanh của hành tinh bằng cách hấp thụ hàng tỷ tấn khí carbon."},
    {"id": "u7-v16", "word": "erosion", "phonetic": "/ɪˈrəʊʒən/", "partOfSpeech": "noun", "vietnameseMeaning": "sự xói mòn, phong hóa tự nhiên", "englishExample": "Wind and water erosion shaped the unbelievable rock formations of Cappadocia.", "vietnameseExample": "Sự xói mòn của gió và nước đã gọt giũa nên những khối đá kỳ ảo khó tin ở Cappadocia."},
    {"id": "u7-v17", "word": "oasis", "phonetic": "/əʊˈeɪsɪs/", "partOfSpeech": "noun", "vietnameseMeaning": "ốc đảo xanh tươi giữa sa mạc", "englishExample": "A tranquil oasis surrounded by date palms provided weary desert travelers with refreshing water.", "vietnameseExample": "Ốc đảo thanh bình rợp bóng cây chà là cung cấp nguồn nước mát lành cho những người lữ hành sa mạc mệt mỏi."},
    {"id": "u7-v18", "word": "preserve", "phonetic": "/prɪˈzɜːv/", "partOfSpeech": "verb", "vietnameseMeaning": "gìn giữ, bảo tồn nguyên trạng", "englishExample": "Global conservation treaties help preserve fragile polar habitats from mining exploitation.", "vietnameseExample": "Các hiệp ước bảo tồn toàn cầu giúp bảo vệ môi trường cực mong manh khỏi hoạt động khai thác khoáng sản."},
    {"id": "u7-v19", "word": "phenomenon", "phonetic": "/fɪˈnɒmɪnən/", "partOfSpeech": "noun", "vietnameseMeaning": "hiện tượng tự nhiên kỳ thú", "englishExample": "Solar eclipses are rare celestial phenomena that attract millions of sky observers.", "vietnameseExample": "Nhật thực là hiện tượng thiên văn hiếm gặp thu hút hàng triệu người quan sát bầu trời."},
    {"id": "u7-v20", "word": "biodiverse", "phonetic": "/ˌbaɪəʊdaɪˈvɜːs/", "partOfSpeech": "adjective", "vietnameseMeaning": "đa dạng sinh học phong phú", "englishExample": "Madagascar is home to one of the most biodiverse flora collections on Earth.", "vietnameseExample": "Madagascar là nơi cư ngụ của một trong những thảm thực vật đa dạng sinh học phong phú nhất trên Trái Đất."}
]

u7_grammar_info = {
    "title": "Từ Chỉ Số Lượng (Quantifiers: Many, Much, A few, A little, Plenty of) & Bị Động Khái Quát",
    "summary": "Từ chỉ số lượng đứng trước danh từ đếm được hoặc không đếm được. Thể bị động (Passive Voice) nhấn mạnh vào đối tượng chịu tác động của hành động.",
    "formulaBox": [
        "Danh từ đếm được số nhiều: Many, A few (một vài, đủ dùng), Few (rất ít, hầu như không có).",
        "Danh từ không đếm được: Much, A little (một chút, đủ dùng), Little (rất ít, hầu như không có).",
        "Dùng cho cả 2 loại danh từ: A lot of / Lots of / Plenty of / Some / Any.",
        "Bị động thì Hiện tại đơn: S + am/is/are + V3/ed (Coral reefs are protected by international maritime laws).",
        "Bị động thì Quá khứ đơn: S + was/were + V3/ed (The canyon was formed millions of years ago)."
    ],
    "usagePoints": [
        {"title": "1. Phân biệt A few / Few và A little / Little", "detail": "'A few / A little' mang nghĩa tích cực (còn có một ít). 'Few / Little' mang nghĩa tiêu cực (quá ít, gần như không có).", "example": "A few tourists booked the arctic tour. / There is little water left in the desert canteen."},
        {"title": "2. Bị động với hiện tượng tự nhiên", "detail": "The Grand Canyon was carved by the Colorado River.", "example": "Millions of tons of carbon are absorbed by tropical rainforests every year."}
    ]
}

u7_grammar_exs = [
    {"id": "u7-g1", "question": "The Great Barrier Reef _____ by millions of marine enthusiasts every year.", "options": ["A. is visited", "B. are visited", "C. was visiting", "D. visits"], "correctAnswer": "A. is visited", "explanation": "Bị động thì hiện tại đơn với chủ ngữ số ít 'The Great Barrier Reef': 'is visited'."},
    {"id": "u7-g2", "question": "There is only _____ fresh water available in the heart of the Sahara Desert.", "options": ["A. a little", "B. a few", "C. many", "D. several"], "correctAnswer": "A. a little", "explanation": "'Water' là danh từ không đếm được, dùng 'a little'."},
    {"id": "u7-g3", "question": "Mount Everest _____ by Sir Edmund Hillary and Tenzing Norgay in 1953.", "options": ["A. was conquered", "B. were conquered", "C. is conquered", "D. has conquered"], "correctAnswer": "A. was conquered", "explanation": "Bị động quá khứ đơn với mốc năm 1953: 'was conquered'."},
    {"id": "u7-g4", "question": "How _____ species of coral are currently threatened by ocean acidification?", "options": ["A. many", "B. much", "C. little", "D. any"], "correctAnswer": "A. many", "explanation": "'Species' là danh từ đếm được số nhiều: 'How many species'."},
    {"id": "u7-g5", "question": "There are _____ rare arctic foxes left on the melting ice sheet.", "options": ["A. few", "B. little", "C. much", "D. a little"], "correctAnswer": "A. few", "explanation": "Danh từ đếm được 'foxes' mang nghĩa tiêu cực (quá ít cá thể còn sót lại): 'few'."},
    {"id": "u7-g6", "question": "The colossal rock columns of Cappadocia _____ by severe wind and rain erosion.", "options": ["A. were sculpted", "B. was sculpted", "C. is sculpting", "D. sculpted"], "correctAnswer": "A. were sculpted", "explanation": "Chủ ngữ số nhiều 'columns' ở thì quá khứ: 'were sculpted'."},
    {"id": "u7-g7", "question": "We have _____ of time to admire the stunning sunset over the canyon.", "options": ["A. plenty", "B. many", "C. few", "D. a few"], "correctAnswer": "A. plenty", "explanation": "Cụm định lượng: 'plenty of time' (rất nhiều thời gian)."},
    {"id": "u7-g8", "question": "Victoria Falls _____ located on the border between Zambia and Zimbabwe.", "options": ["A. is", "B. are", "C. were", "D. been"], "correctAnswer": "A. is", "explanation": "Tên riêng một thác nước số ít: 'is located'."},
    {"id": "u7-g9", "question": "Fortunately, _____ intrepid mountaineers managed to reach the summit safely.", "options": ["A. a few", "B. a little", "C. much", "D. little"], "correctAnswer": "A. a few", "explanation": "Danh từ đếm được số nhiều mang ý tích cực: 'a few intrepid mountaineers'."},
    {"id": "u7-g10", "question": "How _____ pollution is generated by commercial cruise ships in polar waters?", "options": ["A. much", "B. many", "C. few", "D. several"], "correctAnswer": "A. much", "explanation": "'Pollution' là danh từ không đếm được: 'How much pollution'."},
    {"id": "u7-g11", "question": "The northern lights _____ in northern Scandinavia during cold winter months.", "options": ["A. can be seen", "B. can see", "C. is seeing", "D. was seen"], "correctAnswer": "A. can be seen", "explanation": "Bị động với Modal verb: 'can be seen' (có thể được chiêm ngưỡng)."},
    {"id": "u7-g12", "question": "There is _____ hope of recovering the lost expedition gear under the deep snow.", "options": ["A. little", "B. few", "C. many", "D. several"], "correctAnswer": "A. little", "explanation": "'Hope' là danh từ không đếm được mang nghĩa tiêu cực (rất ít hy vọng): 'little'."},
    {"id": "u7-g13", "question": "Thousands of marine animals _____ by single-use plastic debris every year.", "options": ["A. are killed", "B. is killed", "C. was killed", "D. kills"], "correctAnswer " : "A. are killed", "explanation": "Bị động hiện tại đơn với chủ ngữ số nhiều 'animals': 'are killed'."},
    {"id": "u7-g14", "question": "The Amazon Rainforest contains _____ of animal and plant species.", "options": ["A. a lot", "B. many", "C. much", "D. little"], "correctAnswer": "A. a lot", "explanation": "Cụm 'a lot of animal and plant species'."},
    {"id": "u7-g15", "question": "The ancient geyser _____ continuously since the last volcanic eruption.", "options": ["A. has been monitored", "B. was monitored", "C. monitors", "D. is monitoring"], "correctAnswer": "A. has been monitored", "explanation": "Hiện tại hoàn thành bị động với 'since': 'has been monitored'."},
    {"id": "u7-g16", "question": "There were _____ tourists in Antarctica due to strict environmental permit caps.", "options": ["A. very few", "B. very little", "C. much", "D. a little"], "correctAnswer": "A. very few", "explanation": "Danh từ đếm được số nhiều 'tourists': 'very few'."},
    {"id": "u7-g17", "question": "Fragile ecosystems _____ by international wildlife protection treaties.", "options": ["A. are protected", "B. is protected", "C. was protecting", "D. protects"], "correctAnswer": "A. are protected", "explanation": "Bị động số nhiều: 'are protected'."},
    {"id": "u7-g18", "question": "The guide gave us _____ useful tips on photographing the aurora borealis.", "options": ["A. several", "B. much", "C. little", "D. a little"], "correctAnswer": "A. several", "explanation": "Danh từ đếm được số nhiều 'tips': 'several useful tips'."},
    {"id": "u7-g19", "question": "The Grand Canyon _____ by the continuous erosion of the Colorado River.", "options": ["A. was created", "B. created", "C. were created", "D. creates"], "correctAnswer": "A. was created", "explanation": "Bị động quá khứ số ít: 'was created'."},
    {"id": "u7-g20", "question": "Are there _____ direct hiking trails leading down to the riverbed?", "options": ["A. any", "B. much", "C. little", "D. a little"], "correctAnswer": "A. any", "explanation": "Dùng 'any' trong câu hỏi với danh từ số nhiều 'hiking trails'."}
]

u7_listening_info = {
    "audioTitle": "Chiêm Ngưỡng Bắc Cực Quang Ở Na Uy (Chasing the Northern Lights in Norway)",
    "audioDuration": "3:20",
    "audioScriptSpeaker": "Arctic Tour Guide Freja & Traveler Daniel",
    "transcriptText": "Daniel: Freja, is it true that the aurora borealis can be witnessed across northern Norway throughout winter?\nFreja: Absolutely, Daniel! The phenomenon is caused by charged solar particles colliding with Earth's magnetic atmosphere. On clear, freezing nights, emerald green and violet light ribbons dance gracefully across the sky.\nDaniel: How much warm clothing do we need to pack for an Arctic night tour?\nFreja: You must wear plenty of thermal layers, insulated snow boots, and windproof parkas because temperatures plunge below minus twenty degrees Celsius.\nDaniel: Are many tourists allowed to gather in these fragile Arctic wilderness zones?\nFreja: Only a few small guided groups are permitted each evening to prevent noise pollution and protect arctic reindeer habitats.",
    "vietnameseTranslation": "Daniel: Freja ơi, có thật là hiện tượng Bắc cực quang có thể được chiêm ngưỡng khắp miền bắc Na Uy trong suốt mùa đông không?\nFreja: Hoàn toàn chính xác, Daniel à! Hiện tượng này được tạo ra bởi các hạt tích điện từ Mặt Trời va chạm với từ quyển của Trái Đất. Vào những đêm quang đãng, lạnh giá, những dải ruy băng ánh sáng màu xanh ngọc bích và tím khiêu vũ uyển chuyển trên bầu trời.\nDaniel: Chúng tôi cần chuẩn bị bao nhiêu quần áo ấm cho tour đêm vùng Bắc Cực vậy?\nFreja: Bạn phải mặc nhiều lớp áo giữ nhiệt, ủng đi tuyết cách nhiệt và áo khoác chống gió vì nhiệt độ có thể giảm sâu dưới âm hai mươi độ C.\nDaniel: Có nhiều du khách được phép tụ tập tại những khu vực hoang dã Bắc Cực mong manh này không?\nFreja: Chỉ có một vài nhóm nhỏ có hướng dẫn viên được phép mỗi tối để ngăn ngừa ô nhiễm tiếng ồn và bảo vệ môi trường sống của tuần lộc Bắc Cực."
}

u7_listening_qs = [
    {"id": "u7-l1", "question": "Where does the conversation about chasing the Northern Lights take place?", "options": ["A. In northern Norway", "B. In the Sahara Desert", "C. In a tropical rainforest", "D. On a cruise in the Caribbean"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'witnessed across northern Norway throughout winter.'"},
    {"id": "u7-l2", "question": "What causes the celestial phenomenon of the aurora borealis?", "options": ["A. Charged solar particles colliding with Earth's magnetic atmosphere", "B. Giant neon city lamps", "C. Firewood smoke", "D. Volcanic ash clouds"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'charged solar particles colliding with Earth's magnetic atmosphere.'"},
    {"id": "u7-l3", "question": "What colors do the dancing auroral light ribbons display in the Arctic sky?", "options": ["A. Emerald green and violet", "B. Pure black and brown", "C. Silver and gray only", "D. Dull yellow only"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'emerald green and violet light ribbons dance gracefully.'"},
    {"id": "u7-l4", "question": "How cold can temperatures plunge during winter Arctic night tours?", "options": ["A. Below minus twenty degrees Celsius", "B. Plus forty degrees Celsius", "C. Zero degrees exactly", "D. Plus thirty degrees Celsius"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'temperatures plunge below minus twenty degrees Celsius.'"},
    {"id": "u7-l5", "question": "Why are only a few small guided tour groups permitted each evening?", "options": ["A. To prevent noise pollution and protect arctic reindeer habitats", "B. Because tickets are too heavy", "C. Because buses don't have tires", "D. To sell hot coffee"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'prevent noise pollution and protect arctic reindeer habitats.'"},
    {"id": "u7-l6", "question": "What protective gear must travelers wear according to guide Freja?", "options": ["A. Plenty of thermal layers, insulated snow boots, and windproof parkas", "B. Thin cotton t-shirts and sandals", "C. Swimming suits", "D. Silk sunglasses only"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'wear plenty of thermal layers, insulated snow boots, and windproof parkas.'"},
    {"id": "u7-l7", "question": "Who is Daniel speaking with in the audio?", "options": ["A. Arctic Tour Guide Freja", "B. A hotel chef", "C. A airline pilot", "D. A ship captain"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'Arctic Tour Guide Freja & Traveler Daniel.'"},
    {"id": "u7-l8", "question": "When can the Northern Lights be seen best in Norway?", "options": ["A. On clear, freezing winter nights", "B. On hot sunny summer afternoons", "C. During rainstorms at noon", "D. In spring mornings"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'On clear, freezing nights... throughout winter.'"}
]

u7_listening_fibs = [
    {"id": "u7-f1", "sentenceWithBlank": "The aurora borealis is caused by solar _____.", "correctWord": "particles", "hint": "Các hạt vi mô từ Mặt Trời"},
    {"id": "u7-f2", "sentenceWithBlank": "Emerald green light ribbons dance in the _____.", "correctWord": "sky", "hint": "Bầu trời đêm"},
    {"id": "u7-f3", "sentenceWithBlank": "Temperatures drop below minus twenty _____.", "correctWord": "degrees", "hint": "Đơn vị đo độ nhiệt độ (độ C)"},
    {"id": "u7-f4", "sentenceWithBlank": "Strict caps protect arctic reindeer _____.", "correctWord": "habitats", "hint": "Môi trường sống tự nhiên"}
]

u7_speaking = [
    {"id": "u7-s1", "targetSentence": "The Grand Canyon in Arizona was sculpted by the relentless flow of the Colorado River.", "ipa": "/ðə ɡrænd ˈkænjən ɪn ˌærɪˈzəʊnə wɒz ˈskʌlptɪd baɪ ðə rɪˈlɛntlɪs fləʊ ɒv ðə ˌkɒləˈrɑːdəʊ ˈrɪvə/", "vietnameseMeaning": "Hẻm núi Grand Canyon ở Arizona được kiến tạo bởi dòng chảy miệt mài của con sông Colorado.", "contextSituation": "Thuyết minh về quá trình hình thành hẻm núi Grand Canyon.", "keyPhonicsFocus": "Phát âm chuẩn tính từ 'relentless' /rɪˈlɛntlɪs/ và 'sculpted'.", "sampleAudioText": "The Grand Canyon in Arizona was sculpted by the relentless flow of the Colorado River."},
    {"id": "u7-s2", "targetSentence": "Millions of colorful fish and marine creatures are sheltered within the Great Barrier Reef.", "ipa": "/ˈmɪljənz ɒv ˈkʌləfʊl fɪʃ ænd məˈriːn ˈkriːʧəz ɑː ˈʃɛltəd wɪˈðɪn ðə ɡreɪt ˈbærɪə riːf/", "vietnameseMeaning": "Hàng triệu loài cá rực rỡ sắc màu và sinh vật biển được che chở bên trong rạn san hô Great Barrier.", "contextSituation": "Nêu vai trò sinh thái của rạn san hô biển lớn nhất hành tinh.", "keyPhonicsFocus": "Phát âm chuẩn từ 'sheltered' /ˈʃɛltəd/ và 'marine creatures'.", "sampleAudioText": "Millions of colorful fish and marine creatures are sheltered within the Great Barrier Reef."},
    {"id": "u7-s3", "targetSentence": "The celestial northern lights can be witnessed dancing gracefully across arctic winter skies.", "ipa": "/ðə sɪˈlɛstɪəl ˈnɔːðən laɪts kæn biː ˈwɪtnɪst ˈdɑːnsɪŋ ˈɡreɪsfʊli əˈkrɒs ˈɑːktɪk ˈwɪntə skaɪz/", "vietnameseMeaning": "Hiện tượng cực quang thiên văn có thể được chiêm ngưỡng khiêu vũ uyển chuyển trên bầu trời đông vùng cực.", "contextSituation": "Miêu tả vẻ đẹp huyền ảo của Bắc cực quang.", "keyPhonicsFocus": "Phát âm chuẩn từ 'celestial' /sɪˈlɛstɪəl/ và 'gracefully'.", "sampleAudioText": "The celestial northern lights can be witnessed dancing gracefully across arctic winter skies."},
    {"id": "u7-s4", "targetSentence": "Only a few mountaineers succeed in reaching the icy summit of Mount Everest each season.", "ipa": "/ˈəʊnli ə fjuː ˌmaʊntɪˈnɪəz səkˈsiːd ɪn ˈriːʧɪŋ ði ˈaɪsi ˈsʌmɪt ɒv maʊnt ˈɛvərɪst iːʧ ˈsiːzn/", "vietnameseMeaning": "Chỉ có một số ít nhà leo núi thành công trong việc chinh phục đỉnh tuyết phủ băng giá Everest mỗi mùa.", "contextSituation": "Nói về độ khắc nghiệt khi leo đỉnh Everest.", "keyPhonicsFocus": "Phát âm chuẩn từ 'mountaineers' /ˌmaʊntɪˈnɪəz/ và 'summit'.", "sampleAudioText": "Only a few mountaineers succeed in reaching the icy summit of Mount Everest each season."},
    {"id": "u7-s5", "targetSentence": "Victoria Falls creates a thunderous roar and dazzling rainbows visible from miles away.", "ipa": "/vɪkˈtɔːrɪə fɔːlz kriːˈeɪts ə ˈθʌndərəs rɔːr ænd ˈdæzlɪŋ ˈreɪnbəʊz ˈvɪzəbl frɒm maɪlz əˈweɪ/", "vietnameseMeaning": "Thác Victoria tạo nên tiếng gầm sấm sét và những dải cầu vồng rực rỡ có thể nhìn thấy từ cách xa hàng dặm.", "contextSituation": "Thuyết minh về vẻ đẹp hùng vĩ của thác Victoria.", "keyPhonicsFocus": "Phát âm chuẩn từ 'thunderous' /ˈθʌndərəs/ và 'dazzling'.", "sampleAudioText": "Victoria Falls creates a thunderous roar and dazzling rainbows visible from miles away."},
    {"id": "u7-s6", "targetSentence": "A lot of rare flora and fauna in the Amazon Rainforest are threatened by deforestation.", "ipa": "/ə lɒt ɒv reə ˈflɔːrə ænd ˈfɔːnə ɪn ði ˈæməzən ˈreɪnˌfɒrɪst ɑː ˈθrɛtnd baɪ dɪˌfɒrɪˈsteɪʃən/", "vietnameseMeaning": "Rất nhiều loài động thực vật quý hiếm trong Rừng mưa Amazon đang bị đe dọa bởi nạn phá rừng.", "contextSituation": "Cảnh báo nguy cơ mất đa dạng sinh học tại Amazon.", "keyPhonicsFocus": "Phát âm chuẩn cụm từ 'flora and fauna' và 'deforestation'.", "sampleAudioText": "A lot of rare flora and fauna in the Amazon Rainforest are threatened by deforestation."},
    {"id": "u7-s7", "targetSentence": "Mount Fuji is crowned with symmetrical snowcaps, making it an iconic symbol of Japan.", "ipa": "/maʊnt ˈfuːʤi ɪz kraʊnd wɪð sɪˈmɛtrɪkəl ˈsnəʊkæps ˈmeɪkɪŋ ɪt ən aɪˈkɒnɪk ˈsɪmbəl ɒv ʤəˈpæn/", "vietnameseMeaning": "Núi Phú Sĩ được bao phủ bởi chỏm tuyết đối xứng hoàn hảo, biến nơi đây thành biểu tượng của Nhật Bản.", "contextSituation": "Giới thiệu núi Phú Sĩ Nhật Bản.", "keyPhonicsFocus": "Phát âm chuẩn từ 'symmetrical' /sɪˈmɛtrɪkəl/ và 'crowned'.", "sampleAudioText": "Mount Fuji is crowned with symmetrical snowcaps, making it an iconic symbol of Japan."},
    {"id": "u7-s8", "targetSentence": "There is little liquid water on Antarctica's surface due to sub-zero freezing temperatures.", "ipa": "/ðeər ɪz ˈlɪtl ˈlɪkwɪd ˈwɔːtər ɒn ænˈtɑːktɪkəz ˈsɜːfɪs djuː tuː sʌb-ˈzɪərəʊ ˈfriːzɪŋ ˈtɛmprɪʧəz/", "vietnameseMeaning": "Hầu như không có nước dạng lỏng trên bề mặt Nam Cực do nhiệt độ đóng băng dưới 0 độ C.", "contextSituation": "Giải thích khí hậu khắc nghiệt tại Nam Cực.", "keyPhonicsFocus": "Phát âm chuẩn từ 'Antarctica' /ænˈtɑːktɪkə/ và 'liquid'.", "sampleAudioText": "There is little liquid water on Antarctica's surface due to sub-zero freezing temperatures."},
    {"id": "u7-s9", "targetSentence": "The geothermal geyser Old Faithful erupts boiling water columns at regular intervals.", "ipa": "/ðə ˌʤiːəʊˈθɜːməl ˈɡiːzər əʊld ˈfeɪθfʊl ɪˈrʌpts ˈbɔɪlɪŋ ˈwɔːtə ˈkɒləmz æt ˈrɛɡjʊlər ˈɪntəvəlz/", "vietnameseMeaning": "Mạch nước phun địa nhiệt Old Faithful phun những cột nước sôi theo các chu kỳ đều đặn.", "contextSituation": "Miêu tả hiện tượng mạch nước phun Yellowstone.", "keyPhonicsFocus": "Phát âm chuẩn từ 'geothermal' /ˌʤiːəʊˈθɜːməl/ và 'erupts'.", "sampleAudioText": "The geothermal geyser Old Faithful erupts boiling water columns at regular intervals."},
    {"id": "u7-s10", "targetSentence": "How many natural wonders have been recognized as UNESCO World Heritage landmarks?", "ipa": "/haʊ ˈmɛni ˈnæʧrəl ˈwʌndəz hæv biːn ˈrɛkəɡnaɪzd æz juːˈnɛskəʊ wɜːld ˈhɛrɪtɪʤ ˈlændmɑːks/", "vietnameseMeaning": "Có bao nhiêu kỳ quan thiên nhiên đã được công nhận là di sản thế giới của UNESCO?", "contextSituation": "Đặt câu hỏi khảo sát di sản toàn cầu.", "keyPhonicsFocus": "Phát âm chuẩn cấu trúc câu hỏi 'How many natural wonders'.", "sampleAudioText": "How many natural wonders have been recognized as UNESCO World Heritage landmarks?"}
]

# Write rest of speaking for u7 (up to 20 prompts)
u7_speaking_extra = [
    {"id": "u7-s11", "targetSentence": "Preserving the pristine biodiversity of global rainforests is essential for planetary health.", "ipa": "/prɪˈzɜːvɪŋ ðə ˈprɪstiːn ˌbaɪəʊdaɪˈvɜːsɪti ɒv ˈɡləʊbəl ˈreɪnˌfɒrɪsts ɪz ɪˈsɛnʃəl fɔː ˈplænɪtəri hɛlθ/", "vietnameseMeaning": "Bảo tồn sự đa dạng sinh học nguyên sơ của các khu rừng mưa toàn cầu là điều thiết yếu cho sức khỏe hành tinh.", "contextSituation": "Kêu gọi bảo vệ các lá phổi xanh của Trái Đất.", "keyPhonicsFocus": "Phát âm chuẩn từ 'biodiversity' /ˌbaɪəʊdaɪˈvɜːsɪti/.", "sampleAudioText": "Preserving the pristine biodiversity of global rainforests is essential for planetary health."},
    {"id": "u7-s12", "targetSentence": "Melting polar glaciers cause global sea level rise, threatening coastal metropolises.", "ipa": "/ˈmɛltɪŋ ˈpəʊlə ˈɡlæsiəz kɔːz ˈɡləʊbəl siː ˈlɛvl raɪz ˈθrɛtnɪŋ ˈkəʊstl mɪˈtrɒpəlɪsɪz/", "vietnameseMeaning": "Sông băng vùng cực tan chảy gây dâng mực nước biển toàn cầu, đe dọa các đại đô thị ven biển.", "contextSituation": "Cảnh báo hậu quả của hiện tượng băng tan.", "keyPhonicsFocus": "Phát âm chuẩn từ 'glaciers' /ˈɡlæsiəz/.", "sampleAudioText": "Melting polar glaciers cause global sea level rise, threatening coastal metropolises."},
    {"id": "u7-s13", "targetSentence": "Ecotourists are urged to leave no trash behind when exploring delicate natural sanctuaries.", "ipa": "/ˈiːkəʊˌtʊərɪsts ɑːr ɜːʤd tuː liːv nəʊ træʃ bɪˈhaɪnd wɛn ɪksˈplɔːrɪŋ ˈdɛlɪkɪt ˈnæʧrəl ˈsæŋktjʊəriz/", "vietnameseMeaning": "Du khách sinh thái được khuyến cáo không để lại rác thải khi khám phá các khu bảo tồn thiên nhiên mong manh.", "contextSituation": "Nhắc nhở ý thức bảo vệ môi trường du lịch.", "keyPhonicsFocus": "Phát âm chuẩn từ 'sanctuaries' /ˈsæŋktjʊəriz/.", "sampleAudioText": "Ecotourists are urged to leave no trash behind when exploring delicate natural sanctuaries."},
    {"id": "u7-s14", "targetSentence": "Giant monolithic sandstone rocks change color dramatically from ochre to crimson at sunset.", "ipa": "/ˈʤaɪənt ˌmɒnəˈlɪθɪk ˈsændstəʊn rɒks ʧeɪnʤ ˈkʌlə drəˈmætɪkəli frɒm ˈəʊkə tuː ˈkrɪmzn æt ˈsʌnsɛt/", "vietnameseMeaning": "Những khối đá sa thạch nguyên khối khổng lồ đổi màu ngoạn mục từ vàng thổ sang đỏ thẫm khi hoàng hôn buông xuống.", "contextSituation": "Miêu tả núi đá Uluru ở Úc.", "keyPhonicsFocus": "Phát âm chuẩn từ 'monolithic' /ˌmɒnəˈlɪθɪk/ và 'crimson'.", "sampleAudioText": "Giant monolithic sandstone rocks change color dramatically from ochre to crimson at sunset."},
    {"id": "u7-s15", "targetSentence": "Strict international maritime treaties protect endangered sea turtles and humpback whales.", "ipa": "/strɪkt ˌɪntəˈnæʃənl ˈmærɪtaɪm ˈtriːtiz prəˈtɛkt ɪnˈdeɪnʤəd siː ˈtɜːtlz ænd ˈhʌmpbæk weɪlz/", "vietnameseMeaning": "Các hiệp ước hàng hải quốc tế nghiêm ngặt bảo vệ các loài rùa biển và cá voi lưng gù có nguy cơ tuyệt chủng.", "contextSituation": "Nêu cao nỗ lực cứu hộ động vật biển quý hiếm.", "keyPhonicsFocus": "Phát âm chuẩn từ 'maritime treaties' /ˈmærɪtaɪm ˈtriːtiz/.", "sampleAudioText": "Strict international maritime treaties protect endangered sea turtles and humpback whales."},
    {"id": "u7-s16", "targetSentence": "Wind erosion has carved bizarre fairy chimneys and subterranean underground cities in Turkey.", "ipa": "/wɪnd ɪˈrəʊʒən hæz kɑːvd bɪˈzɑː ˈfeəri ˈʧɪmniz ænd ˌʌndəˈɡraʊnd ˈsɪtiz ɪn ˈtɜːki/", "vietnameseMeaning": "Sự xói mòn của gió đã gọt giũa nên những ống khói tiên kỳ dị và các thành phố ngầm ở Thổ Nhĩ Kỳ.", "contextSituation": "Giới thiệu kỳ quan Cappadocia.", "keyPhonicsFocus": "Phát âm chuẩn từ 'erosion' /ɪˈrəʊʒən/ và 'bizarre'.", "sampleAudioText": "Wind erosion has carved bizarre fairy chimneys and subterranean underground cities in Turkey."},
    {"id": "u7-s17", "targetSentence": "Every traveler ought to respect indigenous traditions when visiting sacred ancient mountains.", "ipa": "/ˈɛvri ˈtrævələr ɔːt tuː rɪsˈpɛkt ɪnˈdɪʤɪnəs trəˈdɪʃənz wɛn ˈvɪzɪtɪŋ ˈseɪkrɪd ˈeɪnʃənt ˈmaʊntɪnz/", "vietnameseMeaning": "Mỗi du khách nên tôn trọng truyền thống bản địa khi viếng thăm các ngọn núi cổ linh thiêng.", "contextSituation": "Khuyên du khách ứng xử văn minh và tôn trọng.", "keyPhonicsFocus": "Phát âm chuẩn từ 'indigenous' /ɪnˈdɪʤɪnəs/.", "sampleAudioText": "Every traveler ought to respect indigenous traditions when visiting sacred ancient mountains."},
    {"id": "u7-s18", "targetSentence": "Subterranean stalactite formations grow only a few millimeters over an entire century.", "ipa": "/ˌʌndəˈteɪrɪən ˈstæləktaɪt fɔːˈmeɪʃənz ɡrəʊ ˈəʊnli ə fjuː ˈmɪlɪˌmiːtəz ˈəʊvər ən ɪnˈtaɪə ˈsɛnʧʊri/", "vietnameseMeaning": "Các khối nhũ đá ngầm trong hang chỉ phát triển vài milimet trong suốt cả một thế kỷ.", "contextSituation": "Giải thích sự chậm rãi và quý giá của thạch nhũ hang động.", "keyPhonicsFocus": "Phát âm chuẩn từ 'stalactite' /ˈstæləktaɪt/.", "sampleAudioText": "Subterranean stalactite formations grow only a few millimeters over an entire century."},
    {"id": "u7-s19", "targetSentence": "Solar flares and geomagnetic storms trigger the most intense displays of aurora lights.", "ipa": "/ˈsəʊlə fleəz ænd ˌʤiːəʊmæɡˈnɛtɪk stɔːmz ˈtrɪɡə ðə məʊst ɪnˈtɛns dɪsˈpleɪz ɒv ɔːˈrɔːrə laɪts/", "vietnameseMeaning": "Các cơn bão từ và vết lóa mặt trời kích hoạt những màn trình diễn cực quang rực rỡ mãnh liệt nhất.", "contextSituation": "Giải thích cơ chế vật lý thiên văn của cực quang.", "keyPhonicsFocus": "Phát âm chuẩn từ 'geomagnetic' /ˌʤiːəʊmæɡˈnɛtɪk/.", "sampleAudioText": "Solar flares and geomagnetic storms trigger the most intense displays of aurora lights."},
    {"id": "u7-s20", "targetSentence": "Protecting Earth's magnificent wonders ensures our descendants inherit an awe-inspiring planet.", "ipa": "/prəˈtɛktɪŋ ɜːθs mæɡˈnɪfɪsnt ˈwʌndəz ɪnˈʃʊəz ˈaʊə dɪˈsɛndənts ɪnˈhɛrɪt ən ɔː-ɪnˈspaɪərɪŋ ˈplænɪt/", "vietnameseMeaning": "Bảo vệ các kỳ quan tráng lệ của Trái Đất đảm bảo rằng con cháu chúng ta sẽ thừa hưởng một hành tinh kỳ vĩ.", "contextSituation": "Thông điệp bảo vệ môi trường toàn cầu.", "keyPhonicsFocus": "Phát âm chuẩn từ 'descendants' /dɪˈsɛndənts/ và 'awe-inspiring'.", "sampleAudioText": "Protecting Earth's magnificent wonders ensures our descendants inherit an awe-inspiring planet."}
]
u7_speaking.extend(u7_speaking_extra)

u7_reading_info = {
    "title": "Kỳ Quan Rạn San Hô Great Barrier: Trái Tim Đại Dương Đang Kêu Cứu",
    "topic": "Hệ sinh thái biển & Bảo tồn rạn san hô Great Barrier ở Úc",
    "passageText": "Stretching over 2,300 kilometers along the northeastern coastline of Australia, the Great Barrier Reef is widely acknowledged as the largest living structure on the planet. Composed of billions of tiny coral polyps, this gargantuan underwater wonderland is so vast that it can be clearly discerned from space.\n\nThe reef harbors an astonishing array of biodiversity. It provides vital habitats for over 1,500 species of marine fish, 400 types of hard and soft coral, 4,000 species of mollusks, and several vulnerable species including green sea turtles and dugongs. Furthermore, the reef generates billions of dollars in sustainable eco-tourism revenue for regional economies.\n\nIn recent years, however, escalating oceanic temperatures triggered severe coral bleaching events. When seawater warms abnormally, stressed corals expel their symbiotic zooxanthellae algae, turning pale white and eventually dying of starvation. Global marine biologists emphasize that without drastic reductions in greenhouse gas emissions and strict local anti-pollution regulations, many fragile coral ecosystems will face irreversible collapse.",
    "keyVocabularyHighlights": [
        {"word": "gargantuan structure", "meaning": "công trình cấu trúc sống khổng lồ"},
        {"word": "coral polyps", "meaning": "các cá thể polyp san hô nhỏ bé"},
        {"word": "coral bleaching events", "meaning": "các đợt tẩy trắng san hô do nước biển nóng lên"},
        {"word": "irreversible collapse", "meaning": "sự sụp đổ suy thoái không thể phục hồi"}
    ]
}

u7_reading_qs = [
    {"id": "u7-r1", "question": "Where is the Great Barrier Reef situated?", "options": ["A. Along the northeastern coastline of Australia", "B. In the Mediterranean Sea", "C. Inside the Arctic Circle", "D. In the Red River Delta"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 1: 'along the northeastern coastline of Australia.'"},
    {"id": "u7-r2", "question": "What is the Great Barrier Reef composed of?", "options": ["A. Billions of tiny living coral polyps", "B. Plastic waste", "C. Solid steel blocks", "D. Desert sand"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 1: 'Composed of billions of tiny coral polyps.'"},
    {"id": "u7-r3", "question": "Can the Great Barrier Reef be seen from outer space?", "options": ["A. Yes, it can be clearly discerned from space", "B. No, it is too tiny", "C. Only with a microscope", "D. Never"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 1: 'so vast that it can be clearly discerned from space.'"},
    {"id": "u7-r4", "question": "How many species of marine fish are sheltered within the reef?", "options": ["A. Over 1,500 species", "B. Exactly ten fish", "C. Only two species", "D. Fifty fish"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'vital habitats for over 1,500 species of marine fish.'"},
    {"id": "u7-r5", "question": "Which vulnerable marine animal is mentioned as living in the reef?", "options": ["A. Green sea turtles and dugongs", "B. Polar bears", "C. Mountain goats", "D. Desert camels"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'vulnerable species including green sea turtles and dugongs.'"},
    {"id": "u7-r6", "question": "What causes severe coral bleaching events according to paragraph 3?", "options": ["A. Escalating oceanic water temperatures", "B. Cold snowy weather", "C. Lack of moonlight", "D. Too many swimming fish"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'escalating oceanic temperatures triggered severe coral bleaching events.'"},
    {"id": "u7-r7", "question": "What happens when stressed corals expel their symbiotic algae?", "options": ["A. They turn pale white and may starve to death", "B. They turn solid gold", "C. They swim away to rivers", "D. They grow wings"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'expel their symbiotic zooxanthellae algae, turning pale white and eventually dying of starvation.'"},
    {"id": "u7-r8", "question": "Which word in paragraph 1 is closest in meaning to 'gargantuan'?", "options": ["A. Enormous, gigantic, and colossal", "B. Very tiny", "C. Invisible", "D. Broken"], "correctAnswerIndex": 0, "explanation": "'Gargantuan' có nghĩa là khổng lồ, đồ sộ vô cùng."},
    {"id": "u7-r9", "question": "What is required to prevent the irreversible collapse of coral ecosystems?", "options": ["A. Drastic reductions in greenhouse gas emissions and strict anti-pollution regulations", "B. Pouring chemicals into the ocean", "C. Catching all fish", "D. Building concrete bridges over the reef"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'without drastic reductions in greenhouse gas emissions and strict local anti-pollution regulations.'"},
    {"id": "u7-r10", "question": "What is the best overall title for this reading passage?", "options": ["A. The Great Barrier Reef: The Ocean's Living Heart Under Threat", "B. How to Catch Salmon in North America", "C. Commercial Shipping in the Atlantic", "D. Building High-Speed Submarines"], "correctAnswerIndex": 0, "explanation": "Bài đọc làm nổi bật vẻ đẹp và nguy cơ đe dọa sinh thái đối với Rạn san hô Great Barrier."}
]

u7_writing_prompts = [
    {
        "id": "u7-w1",
        "title": "Đề 1: Write a paragraph describing a natural wonder of the world you wish to visit (60-80 words)",
        "description": "Viết một đoạn văn giới thiệu về một kỳ quan thiên nhiên thế giới mà em mơ ước được ghé thăm (Grand Canyon, Rạn san hô Great Barrier, Cực quang Na Uy, Núi Phú Sĩ...).",
        "suggestedOutline": [
            "Introduction: Name the natural wonder and its location.",
            "Body: Describe its unique geographical features and why it fascinates you.",
            "Conclusion: State your dream of exploring it in the future."
        ],
        "usefulPhrases": [
            "A natural wonder of the world that I dream of visiting is...",
            "Located in..., it is renowned for its breathtaking...",
            "It was formed over millions of years through...",
            "I hope I will have the opportunity to witness this magnificent wonder firsthand."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "A natural wonder of the world that I dream of visiting is the Great Barrier Reef in Australia. Stretching over two thousand kilometers, it is the largest living coral reef ecosystem on Earth. It harbors thousands of vibrant fish species, sea turtles, and colorful marine polyps. Snorkeling in its crystal-clear turquoise waters would be an awe-inspiring experience. I hope to visit this underwater marvel one day and contribute to marine conservation efforts."
    },
    {
        "id": "u7-w2",
        "title": "Đề 2: Write a paragraph about the causes and effects of coral bleaching (60-80 words)",
        "description": "Viết một đoạn văn giải thích hiện tượng tẩy trắng san hô và những tác động tiêu cực đến đại dương.",
        "suggestedOutline": [
            "Introduction: Introduce coral bleaching as an alarming marine crisis.",
            "Body: Explain cause (rising sea temperatures from global warming) and effects (corals lose algae, turn white, marine animals lose shelter).",
            "Conclusion: Call for global climate action."
        ],
        "usefulPhrases": [
            "Coral bleaching has become an alarming environmental crisis across our oceans...",
            "When sea temperatures rise abnormally due to global warming, corals expel their algae...",
            "As a consequence, reefs turn ghostly white and marine habitats are severely degraded...",
            "We must reduce carbon emissions immediately to save these delicate marine treasures."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Coral bleaching has become an alarming ecological crisis across global oceans. When seawater temperatures rise abnormally due to global warming, stressed corals expel their colorful symbiotic algae. Consequently, vast reefs turn ghostly white and face starvation. This disaster destroys the natural habitats of thousands of marine species and harms coastal fishing communities. Urgent reductions in greenhouse gas emissions and strict marine protection laws are imperative to save coral ecosystems."
    },
    {
        "id": "u7-w3",
        "title": "Đề 3: Write a paragraph suggesting ways to protect endangered natural sanctuaries (60-80 words)",
        "description": "Viết một đoạn văn đề xuất các giải pháp bảo vệ các khu bảo tồn thiên nhiên hoang dã trên thế giới.",
        "suggestedOutline": [
            "Introduction: State the importance of protecting fragile natural sanctuaries.",
            "Body: Propose 2 solutions (enforcing strict visitor caps, banning plastic waste and illegal poaching).",
            "Conclusion: Reiterate that responsible travel preserves biodiversity."
        ],
        "usefulPhrases": [
            "To safeguard fragile natural sanctuaries worldwide, strict actions are required...",
            "First, governments should limit daily tourist numbers to avoid overcrowding...",
            "Second, severe penalties must be imposed on illegal poaching and plastic littering...",
            "By practicing eco-friendly tourism, we help preserve biodiversity for future generations."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "To safeguard fragile natural sanctuaries worldwide, coordinated global actions are essential. First, environmental authorities should establish strict daily quotas for tourists to prevent habitat degradation and noise pollution. Second, severe penalties must be imposed on plastic littering, illegal wildlife poaching, and unauthorized deforestation. In addition, educating travelers on sustainable eco-tourism principles ensures that our planet's most pristine wonders remain thriving and unpolluted."
    },
    {
        "id": "u7-w4",
        "title": "Đề 4: Write a paragraph describing the magical beauty of the Northern Lights (60-80 words)",
        "description": "Viết một đoạn văn miêu tả vẻ đẹp kỳ ảo của hiện tượng Bắc cực quang (Aurora Borealis).",
        "suggestedOutline": [
            "Introduction: Introduce the aurora borealis as a celestial spectacle.",
            "Body: Describe how solar particles create dancing emerald and violet lights in the polar sky.",
            "Conclusion: Express the profound emotional feeling of watching it."
        ],
        "usefulPhrases": [
            "The aurora borealis is undoubtedly one of nature's most enchanting spectacles...",
            "Triggered by solar particles interacting with Earth's magnetic field...",
            "Vibrant ribbons of green, purple, and crimson dance gracefully across the night sky...",
            "Watching this celestial display evokes an overwhelming feeling of wonder."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "The aurora borealis is undoubtedly one of nature's most enchanting celestial phenomena. Triggered by solar particles colliding with Earth's magnetic atmosphere, this light show illuminates freezing Arctic night skies in Norway and Iceland. Swirling curtains of emerald green, violet, and soft pink dance gracefully above snowy mountain peaks. Watching this mystical spectacle in silence evokes deep awe and reminds us of the infinite wonders of our cosmos."
    },
    {
        "id": "u7-w5",
        "title": "Đề 5: Write a paragraph about why we must protect tropical rainforests (60-80 words)",
        "description": "Viết một đoạn văn giải thích tầm quan trọng của việc bảo vệ các khu rừng mưa nhiệt đới (như Rừng Amazon).",
        "suggestedOutline": [
            "Introduction: State that rainforests are the green lungs of our planet.",
            "Body: Explain benefits (absorbing billions of tons of CO2, harboring millions of species, regulating climate).",
            "Conclusion: Emphasize that protecting forests secures human survival."
        ],
        "usefulPhrases": [
            "Tropical rainforests serve as the indispensable green lungs of planet Earth...",
            "They absorb billions of tons of carbon dioxide and produce vital oxygen...",
            "Furthermore, they harbor over half of the world's plant and animal species...",
            "Stopping deforestation is essential to combat global climate change."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Tropical rainforests serve as the indispensable green lungs of our planet. They absorb billions of tons of atmospheric carbon dioxide, regulate global rainfall patterns, and release essential oxygen. Moreover, rainforests like the Amazon harbor millions of rare plant and animal species, many of which contain medicinal cures for human diseases. Halting illegal deforestation and supporting indigenous conservation are critical steps to combat climate change and ensure planetary survival."
    }
]

unit7 = make_unit(7, "Unit 7: Natural Wonders of the World", "Kỳ quan thiên nhiên thế giới & Đa dạng sinh học", "Khám phá các kỳ quan thiên nhiên toàn cầu, từ chỉ số lượng (Quantifiers) và câu bị động thì Hiện tại / Quá khứ.", "Ngữ âm: Nhấn trọng âm các từ có tiền tố un-, im-, in- và ngữ điệu câu hỏi với Quantifiers", "Globe", u7_vocab, u7_grammar_info, u7_grammar_exs, u7_listening_info, u7_listening_qs, u7_listening_fibs, u7_speaking, u7_reading_info, u7_reading_qs, u7_writing_prompts)
write_ts_unit(7, unit7)
print("Unit 7 generated successfully!")
