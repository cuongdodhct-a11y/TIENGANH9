import json
from gen_unit_utils import make_unit, write_ts_unit

# ==============================================================================
# UNIT 4: REMEMBERING THE PAST
# ==============================================================================
u4_vocab = [
    {"id": "u4-v1", "word": "folklore", "phonetic": "/ˈfəʊklɔː/", "partOfSpeech": "noun", "vietnameseMeaning": "văn học dân gian, phong tục cổ truyền", "englishExample": "Vietnamese folklore is filled with inspiring legends of national resilience.", "vietnameseExample": "Văn học dân gian Việt Nam tràn đầy những truyền thuyết truyền cảm hứng về lòng kiên cường dân tộc."},
    {"id": "u4-v2", "word": "memorabilia", "phonetic": "/ˌmɛmərəˈbɪliə/", "partOfSpeech": "noun", "vietnameseMeaning": "kỷ vật, hiện vật lưu niệm thời xưa", "englishExample": "Grandfather's antique copper oil lamp is a priceless family memorabilia.", "vietnameseExample": "Chiếc đèn dầu bằng đồng cổ của ông nội là kỷ vật gia đình vô giá."},
    {"id": "u4-v3", "word": "tradition", "phonetic": "/trəˈdɪʃən/", "partOfSpeech": "noun", "vietnameseMeaning": "truyền thống lâu đời", "englishExample": "Making Chung cake during Lunar New Year is a cherished family tradition.", "vietnameseExample": "Gói bánh chưng dịp Tết Nguyên Đán là một truyền thống gia đình quý báu."},
    {"id": "u4-v4", "word": "extended family", "phonetic": "/ɪkˈstɛndɪd ˈfæmɪli/", "partOfSpeech": "noun", "vietnameseMeaning": "đại gia đình nhiều thế hệ sống chung", "englishExample": "In the past, four generations lived harmoniously in an extended family.", "vietnameseExample": "Trong quá khứ, bốn thế hệ từng sống hòa thuận dưới một mái nhà đại gia đình."},
    {"id": "u4-v5", "word": "illiterate", "phonetic": "/ɪˈlɪtərɪt/", "partOfSpeech": "adjective", "vietnameseMeaning": "mù chữ, không biết đọc biết viết", "englishExample": "Decades ago, nationwide literacy campaigns helped illiterate villagers learn to read.", "vietnameseExample": "Nhiều thập kỷ trước, các chiến dịch bình dân học vụ đã giúp những người dân mù chữ biết đọc."},
    {"id": "u4-v6", "word": "tugging game", "phonetic": "/ˈtʌɡɪŋ ɡeɪm/", "partOfSpeech": "noun", "vietnameseMeaning": "trò chơi kéo co truyền thống", "englishExample": "Tugging ritual games in Viet Nam were inscribed on UNESCO's Intangible Heritage list.", "vietnameseExample": "Nghi lễ và trò chơi kéo co ở Việt Nam đã được ghi danh vào danh sách Di sản Phi vật thể của UNESCO."},
    {"id": "u4-v7", "word": "used to", "phonetic": "/juːzd tuː/", "partOfSpeech": "modal verb", "vietnameseMeaning": "đã từng (thói quen trong quá khứ nay không còn)", "englishExample": "Village children used to play hide-and-seek under the shade of ancient banyan trees.", "vietnameseExample": "Trẻ em trong làng từng chơi trốn tìm dưới bóng mát cây đa cổ thụ."},
    {"id": "u4-v8", "word": "subsidy period", "phonetic": "/ˈsʌbsɪdi ˈpɪərɪəd/", "partOfSpeech": "noun", "vietnameseMeaning": "thời kỳ bao cấp", "englishExample": "During the subsidy period, food and textiles were distributed via coupon stamps.", "vietnameseExample": "Trong thời kỳ bao cấp, lương thực và vải vóc được phân phối qua tem phiếu."},
    {"id": "u4-v9", "word": "banyan tree", "phonetic": "/ˈbænjən triː/", "partOfSpeech": "noun", "vietnameseMeaning": "cây đa đầu làng", "englishExample": "The centenary banyan tree at the village entrance witnessed centuries of historic shifts.", "vietnameseExample": "Cây đa trăm tuổi ở đầu làng đã chứng kiến bao thăng trầm lịch sử qua nhiều thế kỷ."},
    {"id": "u4-v10", "word": "barefooted", "phonetic": "/ˈbeəfʊtɪd/", "partOfSpeech": "adjective", "vietnameseMeaning": "chân trần, không đi giày dép", "englishExample": "Rural children used to run barefooted along muddy paddy dikes during summer rains.", "vietnameseExample": "Trẻ em nông thôn ngày xưa thường chạy chân trần dọc các bờ đê ruộng lúa trong mưa mùa hè."},
    {"id": "u4-v11", "word": "thatched house", "phonetic": "/θæʧt haʊs/", "partOfSpeech": "noun", "vietnameseMeaning": "nhà tranh mái lá", "englishExample": "Traditional thatched houses stayed cool during humid summers and warm in winter.", "vietnameseExample": "Những ngôi nhà tranh mái lá truyền thống luôn mát mẻ vào mùa hè oi bức và ấm áp vào mùa đông."},
    {"id": "u4-v12", "word": "kerosene lamp", "phonetic": "/ˈkɛrəsiːn læmp/", "partOfSpeech": "noun", "vietnameseMeaning": "đèn dầu hỏa", "englishExample": "Students used to study their lessons under the flickering yellow glow of kerosene lamps.", "vietnameseExample": "Học sinh ngày xưa thường học bài dưới ánh sáng vàng lung linh của chiếc đèn dầu hỏa."},
    {"id": "u4-v13", "word": "tramcar", "phonetic": "/ˈtræmkɑː/", "partOfSpeech": "noun", "vietnameseMeaning": "tàu điện leng keng thời xưa", "englishExample": "The nostalgic chiming sound of Ha Noi tramcars echoes in the memories of the elderly.", "vietnameseExample": "Tiếng chuông leng keng đầy hoài niệm của tàu điện Hà Nội vẫn vang vọng trong ký ức người cao tuổi."},
    {"id": "u4-v14", "word": "folk game", "phonetic": "/fəʊk ɡeɪm/", "partOfSpeech": "noun", "vietnameseMeaning": "trò chơi dân gian", "englishExample": "Mandarin square capturing is a captivating intellectual folk game of Vietnamese children.", "vietnameseExample": "Ô ăn quan là một trò chơi dân gian trí tuệ đầy lôi cuốn của trẻ em Việt Nam."},
    {"id": "u4-v15", "word": "storyteller", "phonetic": "/ˈstɔːrɪˌtɛlə/", "partOfSpeech": "noun", "vietnameseMeaning": "người kể chuyện dân gian", "englishExample": "Village storytellers recited mythical tales beside crackling winter fires.", "vietnameseExample": "Những người kể chuyện trong làng ngâm ngợi những câu chuyện thần thoại bên đống lửa mùa đông."},
    {"id": "u4-v16", "word": "nostalgia", "phonetic": "/nɒˈstælʤə/", "partOfSpeech": "noun", "vietnameseMeaning": "nỗi nhớ hoài niệm quá khứ", "englishExample": "Old photographs of the ancient quarter evoked deep feelings of nostalgia.", "vietnameseExample": "Những bức ảnh chụp phố cổ thời xưa khơi dậy niềm hoài niệm sâu lắng."},
    {"id": "u4-v17", "word": "straw mat", "phonetic": "/strɔː mæt/", "partOfSpeech": "noun", "vietnameseMeaning": "chiếc chiếu cói truyền thống", "englishExample": "Families gathered on handwoven straw mats in the courtyard to enjoy moonlit tea.", "vietnameseExample": "Cả gia đình quây quần trên chiếc chiếu cói dệt tay giữa sân để thưởng trà dưới ánh trăng."},
    {"id": "u4-v18", "word": "clay oven", "phonetic": "/kleɪ ˈʌvən/", "partOfSpeech": "noun", "vietnameseMeaning": "bếp lò đất nung", "englishExample": "Meals cooked with firewood on a traditional clay oven have an unmistakable fragrance.", "vietnameseExample": "Những bữa cơm nấu bằng củi trên bếp lò đất nung có hương vị thơm ngon không thể trộn lẫn."},
    {"id": "u4-v19", "word": "bamboo flutes", "phonetic": "/bæmˈbuː fluːts/", "partOfSpeech": "noun", "vietnameseMeaning": "tiếng sáo trúc dân tộc", "englishExample": "Melodious tunes from bamboo flutes echoed across vast golden rice fields.", "vietnameseExample": "Những giai điệu du dương từ tiếng sáo trúc vang vọng khắp những cánh đồng lúa chín vàng."},
    {"id": "u4-v20", "word": "solidarity", "phonetic": "/ˌsɒlɪˈdærɪti/", "partOfSpeech": "noun", "vietnameseMeaning": "tinh thần tương thân tương ái, đoàn kết", "englishExample": "Mutual solidarity helped our ancestors overcome floods, droughts, and wars.", "vietnameseExample": "Tinh thần đoàn kết tương thân tương ái đã giúp tổ tiên ta vượt qua bão lũ, hạn hán và chiến tranh."}
]

u4_grammar_info = {
    "title": "Cấu Trúc 'Used to' & Câu Ước Cho Hiện Tại (Wish + Past Simple)",
    "summary": "Used to + V-bare diễn tả thói quen hoặc trạng thái trong quá khứ nay không còn nữa. Cấu trúc Wish diễn tả mong ước không có thật ở hiện tại.",
    "formulaBox": [
        "Khẳng định: S + used to + V-bare (They used to live in thatched houses).",
        "Phủ định: S + didn't use to + V-bare (We didn't use to have smart televisions).",
        "Nghi vấn: Did + S + use to + V-bare? (Did your grandmother use to chew betel leaves?)",
        "Wish cho hiện tại: S + wish(es) + (that) + S + V-ed/V2 / were (I wish I had more free time / I wish I were taller)."
    ],
    "usagePoints": [
        {"title": "1. Used to vs. Be used to", "detail": "Used to + V: từng làm gì trong quá khứ. Be used to + V-ing: quen với việc gì ở hiện tại.", "example": "He used to walk to school. Now he is used to taking the metro."},
        {"title": "2. Động từ To-be trong câu Wish", "detail": "Trong câu ước trang trọng, 'were' được dùng cho tất cả các ngôi (I wish I were a bird).", "example": "Nam wishes he knew how to play traditional bamboo flutes."}
    ]
}

u4_grammar_exs = [
    {"id": "u4-g1", "question": "My grandfather _____ walk five kilometers through muddy fields to reach his primary school.", "options": ["A. used to", "B. is used to", "C. uses to", "D. use to"], "correctAnswer": "A. used to", "explanation": "Thói quen trong quá khứ: 'used to + V-bare'."},
    {"id": "u4-g2", "question": "I wish our neighborhood _____ more ancient banyan trees and open green playgrounds.", "options": ["A. had", "B. has", "C. will have", "D. having"], "correctAnswer": "A. had", "explanation": "Câu ước cho hiện tại dùng thì Quá khứ đơn: 'wish our neighborhood had'."},
    {"id": "u4-g3", "question": "Children in the 1980s didn't _____ have smartphones or online video games.", "options": ["A. use to", "B. used to", "C. using to", "D. used"], "correctAnswer": "A. use to", "explanation": "Dạng phủ định với trợ động từ 'didn't use to + V'."},
    {"id": "u4-g4", "question": "Mai wishes she _____ play the traditional folk game 'Mandarin square capturing' skillfully.", "options": ["A. could", "B. can", "C. will", "D. may"], "correctAnswer": "A. could", "explanation": "Ước về khả năng ở hiện tại: 'could + V-bare'."},
    {"id": "u4-g5", "question": "_____ your parents use to write handwritten letters to distant relatives?", "options": ["A. Did", "B. Were", "C. Do", "D. Have"], "correctAnswer": "A. Did", "explanation": "Câu hỏi với used to: 'Did + S + use to + V-bare?'"},
    {"id": "u4-g6", "question": "The village elders wish they _____ bring back the nostalgic chiming of Ha Noi electric tramcars.", "options": ["A. could", "B. can", "C. will", "D. should"], "correctAnswer": "A. could", "explanation": "Wish + could + V."},
    {"id": "u4-g7", "question": "There _____ be a deep communal freshwater well in the middle of our village square.", "options": ["A. used to", "B. use to", "C. is used to", "D. was used"], "correctAnswer": "A. used to", "explanation": "'There used to be' (Đã từng có)."},
    {"id": "u4-g8", "question": "I wish I _____ alive during the glorious historical eras to witness the building of Hue Citadel.", "options": ["A. were", "B. am", "C. will be", "D. have been"], "correctAnswer": "A. were", "explanation": "Cấu trúc ước trang trọng dùng 'were' cho tất cả các ngôi."},
    {"id": "u4-g9", "question": "Villagers used to _____ their drinking water from clean natural mountain streams.", "options": ["A. fetch", "B. fetching", "C. fetched", "D. fetches"], "correctAnswer": "A. fetch", "explanation": "'used to + V-bare' (fetch)."},
    {"id": "u4-g10", "question": "Phong wishes he _____ not have so many stressful exams this semester.", "options": ["A. did", "B. does", "C. will", "D. has"], "correctAnswer": "A. did", "explanation": "Phủ định của Wish hiện tại: 'wishes he did not have'."},
    {"id": "u4-g11", "question": "People _____ use oil lamps before the nationwide electrical power grid was constructed.", "options": ["A. used to", "B. didn't use to", "C. are used to", "D. use to"], "correctAnswer": "A. used to", "explanation": "Thói quen trong quá khứ: 'used to use oil lamps'."},
    {"id": "u4-g12", "question": "We wish young teenagers _____ more interest in preserving traditional folk songs.", "options": ["A. took", "B. take", "C. will take", "D. are taking"], "correctAnswer": "A. took", "explanation": "Wish + S + V-ed (took)."},
    {"id": "u4-g13", "question": "Did you _____ to play tug of war with neighborhood friends during the autumn moon festival?", "options": ["A. use", "B. used", "C. using", "D. uses"], "correctAnswer": "A. use", "explanation": "Sau trợ động từ 'Did' dùng 'use to'."},
    {"id": "u4-g14", "question": "Hoa wishes she _____ fly back in time to meet her beloved great-grandmother.", "options": ["A. could", "B. can", "C. will", "D. should"], "correctAnswer": "A. could", "explanation": "'could fly'."},
    {"id": "u4-g15", "question": "Families used to _____ under the moonlight on woven straw mats to hear mythical folklore.", "options": ["A. gather", "B. gathered", "C. gathering", "D. gathers"], "correctAnswer": "A. gather", "explanation": "used to + V-bare: 'gather'."},
    {"id": "u4-g16", "question": "I wish everyone in our community _____ aware of the cultural value of historic relics.", "options": ["A. were", "B. is", "C. will be", "D. has been"], "correctAnswer": "A. were", "explanation": "Wish + were."},
    {"id": "u4-g17", "question": "Our ancestors _____ live in high-rise concrete apartments; they lived in thatched wooden houses.", "options": ["A. didn't use to", "B. used to", "C. weren't used to", "D. not used to"], "correctAnswer": "A. didn't use to", "explanation": "'didn't use to live' (đã không từng sống)."},
    {"id": "u4-g18", "question": "The students wish their school _____ a traditional cultural museum on campus.", "options": ["A. had", "B. has", "C. will have", "D. is having"], "correctAnswer": "A. had", "explanation": "Wish + had."},
    {"id": "u4-g19", "question": "Women in ancient times _____ dye their teeth black as a distinctive symbol of traditional beauty.", "options": ["A. used to", "B. are used to", "C. use to", "D. were using"], "correctAnswer": "A. used to", "explanation": "Phong tục xưa: 'used to dye'."},
    {"id": "u4-g20", "question": "I wish I _____ time travel to experience the peaceful atmosphere of ancient Thang Long.", "options": ["A. could", "B. can", "C. will", "D. may"], "correctAnswer": "A. could", "explanation": "Ước điều giả định: 'could time travel'."}
]

u4_listening_info = {
    "audioTitle": "Ký Ức Thời Thơ Ấu Của Bà (Grandmother's Childhood Memories)",
    "audioDuration": "3:18",
    "audioScriptSpeaker": "Grandmother Ba & Grandson Minh",
    "transcriptText": "Minh: Grandma, what was life like when you were my age in the 1960s?\nGrandmother Ba: Life was much simpler but full of community warmth, Minh! We did not have electricity or televisions. In the evenings, our entire extended family gathered around a flickering kerosene lamp to listen to grandfather recite historic poems.\nMinh: Did children have toys like bicycles and electronic games?\nGrandmother Ba: Oh no! We created our own toys from nature. We made shuttlecocks from rooster feathers and crafted bamboo flutes. During harvest seasons, we played hide-and-seek among golden straw stacks.\nMinh: Wow, that sounds so poetic! Do you miss those old days, Grandma?\nGrandmother Ba: I cherish those memories deeply. Although modern life is far more comfortable, I wish today's youth spent more time connecting with nature and family.",
    "vietnameseTranslation": "Minh: Bà ơi, cuộc sống thời bà bằng tuổi cháu vào những năm 1960 như thế nào ạ?\nBà Ba: Cuộc sống hồi đó giản dị hơn nhiều nhưng tràn ngập sự ấm áp tình làng nghĩa xóm, Minh à! Thời đó không có điện hay tivi. Vào các buổi tối, cả đại gia đình quây quần bên ngọn đèn dầu le lói để nghe ông kể thơ lịch sử.\nMinh: Trẻ con thời đó có đồ chơi như xe đạp và trò chơi điện tử không ạ?\nBà Ba: Ồ không đâu cháu! Tụi bà tự làm đồ chơi từ thiên nhiên. Tụi bà làm quả cầu đá từ lông gà trống và tự vót sáo trúc. Vào mùa gặt, tụi bà chơi trốn tìm quanh những đụn rơm vàng óng.\nMinh: Oa, nghe thơ mộng quá bà ơi! Bà có nhớ những ngày xưa ấy không ạ?\nBà Ba: Bà trân trọng những kỷ niệm đó sâu sắc. Dù cuộc sống ngày nay tiện nghi hơn rất nhiều, bà vẫn ước các bạn trẻ ngày nay dành nhiều thời gian hơn để gắn kết với thiên nhiên và gia đình."
}

u4_listening_qs = [
    {"id": "u4-l1", "question": "What decade was Grandmother Ba describing during her childhood?", "options": ["A. The 1960s", "B. The 1800s", "C. The 2010s", "D. The 1750s"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'when you were my age in the 1960s?'"},
    {"id": "u4-l2", "question": "How did the extended family spend their evenings without electricity?", "options": ["A. Gathering around a kerosene lamp to listen to grandfather recite poems", "B. Going to modern movie theaters", "C. Surfing the internet", "D. Driving cars around the city"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'gathered around a flickering kerosene lamp to listen to grandfather recite historic poems.'"},
    {"id": "u4-l3", "question": "What materials did rural children use to craft their own handmade toys?", "options": ["A. Plastic and microchips", "B. Natural items like rooster feathers, bamboo, and golden straw", "C. Imported steel", "D. Gold and silver"], "correctAnswerIndex": 1, "explanation": "Trong bài nghe: 'made shuttlecocks from rooster feathers and crafted bamboo flutes.'"},
    {"id": "u4-l4", "question": "What folk game did children play around straw stacks during harvest time?", "options": ["A. Hide-and-seek", "B. Online chess", "C. Video racing", "D. Virtual reality sports"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'played hide-and-seek among golden straw stacks.'"},
    {"id": "u4-l5", "question": "What does Grandmother Ba wish for contemporary young generations?", "options": ["A. That they spend more time connecting with nature and family", "B. That they buy more luxury cars", "C. That they abandon all schools", "D. That they stay indoors playing video games"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'I wish today's youth spent more time connecting with nature and family.'"},
    {"id": "u4-l6", "question": "Did Grandmother Ba's family have a television in the 1960s?", "options": ["A. No, they did not have electricity or televisions", "B. Yes, they had three color TVs", "C. Yes, a giant flat screen", "D. They watched movies all night"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'We did not have electricity or televisions.'"},
    {"id": "u4-l7", "question": "Who is Minh talking to in the recording?", "options": ["A. Grandmother Ba", "B. A tour guide", "C. A history professor", "D. A pilot"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'Grandmother Ba & Grandson Minh.'"},
    {"id": "u4-l8", "question": "How does Grandmother Ba feel about her childhood memories?", "options": ["A. She cherishes them deeply", "B. She hates them", "C. She forgot everything", "D. She feels ashamed"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'I cherish those memories deeply.'"}
]

u4_listening_fibs = [
    {"id": "u4-f1", "sentenceWithBlank": "Families gathered around a flickering _____ lamp.", "correctWord": "kerosene", "hint": "Loại đèn chạy bằng dầu hỏa"},
    {"id": "u4-f2", "sentenceWithBlank": "Children crafted shuttlecocks from rooster _____.", "correctWord": "feathers", "hint": "Lông vũ của gà trống"},
    {"id": "u4-f3", "sentenceWithBlank": "They played hide-and-seek among golden _____ stacks.", "correctWord": "straw", "hint": "Đụn rơm rạ mùa gặt"},
    {"id": "u4-f4", "sentenceWithBlank": "Grandma wishes teens connected more with _____.", "correctWord": "nature", "hint": "Thiên nhiên tươi đẹp"}
]

u4_speaking = [
    {"id": "u4-s1", "targetSentence": "In the past, generations of Vietnamese families used to live under one roof in harmony.", "ipa": "/ɪn ðə pɑːst ˌʤɛnəˈreɪʃənz ɒv ˌvjɛtnəˈmiːz ˈfæmɪliz juːzd tuː lɪv ˈʌndə wʌn ruːf ɪn ˈhɑːməni/", "vietnameseMeaning": "Trong quá khứ, nhiều thế hệ trong các gia đình Việt Nam từng sống hòa thuận dưới một mái nhà.", "contextSituation": "Nói về mô hình đại gia đình truyền thống.", "keyPhonicsFocus": "Phát âm chuẩn cụm từ 'used to live' /juːzd tuː lɪv/ và 'harmony'.", "sampleAudioText": "In the past, generations of Vietnamese families used to live under one roof in harmony."},
    {"id": "u4-s2", "targetSentence": "I wish I could experience the serene atmosphere of ancient Hanoi when tramcars were operating.", "ipa": "/aɪ wɪʃ aɪ kʊd ɪksˈpɪərɪəns ðə sɪˈriːn ˈætməsfɪə ɒv ˈeɪnʃənt hæˈnɔɪ wɛn ˈtræmkɑːz wɜːr ˈɒpəreɪtɪŋ/", "vietnameseMeaning": "Tôi ước mình có thể trải nghiệm bầu không khí thanh bình của Hà Nội xưa khi những chuyến tàu điện còn hoạt động.", "contextSituation": "Bày tỏ niềm hoài niệm về Hà Nội xưa.", "keyPhonicsFocus": "Phát âm chuẩn tính từ 'serene' /sɪˈriːn/ và cấu trúc 'I wish I could'.", "sampleAudioText": "I wish I could experience the serene atmosphere of ancient Hanoi when tramcars were operating."},
    {"id": "u4-s3", "targetSentence": "Children used to play imaginative folk games like tug of war and mandarin square capturing.", "ipa": "/ˈʧɪldrən juːzd tuː pleɪ ɪˈmæʤɪnətɪv fəʊk ɡeɪmz laɪk tʌɡ ɒv wɔːr ænd ˈmændərɪn skweə ˈkæpʧərɪŋ/", "vietnameseMeaning": "Trẻ em xưa từng chơi các trò chơi dân gian giàu tính tưởng tượng như kéo co và ô ăn quan.", "contextSituation": "Kể về các trò chơi tuổi thơ truyền thống.", "keyPhonicsFocus": "Phát âm chuẩn cụm từ 'tug of war' và 'mandarin square capturing'.", "sampleAudioText": "Children used to play imaginative folk games like tug of war and mandarin square capturing."},
    {"id": "u4-s4", "targetSentence": "During the subsidy era, essential household goods were distributed through coupon stamps.", "ipa": "/ˈdjʊərɪŋ ðə ˈsʌbsɪdi ˈɪərə ɪˈsɛnʃəl ˈhaʊshəʊld ɡʊdz wɜː ˌdɪstrɪˈbjuːtɪd θruː ˈkuːpɒn stæmps/", "vietnameseMeaning": "Trong thời kỳ bao cấp, hàng hóa thiết yếu gia đình được phân phối qua các tem phiếu.", "contextSituation": "Thuyết minh về lịch sử thời kỳ bao cấp.", "keyPhonicsFocus": "Phát âm chuẩn từ 'subsidy' /ˈsʌbsɪdi/ và 'coupon'.", "sampleAudioText": "During the subsidy era, essential household goods were distributed through coupon stamps."},
    {"id": "u4-s5", "targetSentence": "The village storyteller used to recount fascinating ancient legends beside the winter fire.", "ipa": "/ðə ˈvɪlɪʤ ˈstɔːrɪˌtɛlə juːzd tuː rɪˈkaʊnt ˈfæsɪneɪtɪŋ ˈeɪnʃənt ˈlɛʤəndz bɪˈsaɪd ðə ˈwɪntə ˈfaɪə/", "vietnameseMeaning": "Người kể chuyện trong làng từng thuật lại những truyền thuyết cổ xưa hấp dẫn bên bếp lửa mùa đông.", "contextSituation": "Miêu tả nét đẹp văn hóa truyền khẩu dân gian.", "keyPhonicsFocus": "Phát âm chuẩn từ 'recount' /rɪˈkaʊnt/ và 'fascinating'.", "sampleAudioText": "The village storyteller used to recount fascinating ancient legends beside the winter fire."},
    {"id": "u4-s6", "targetSentence": "Elderly artisans wish modern youngsters would show greater dedication to traditional crafts.", "ipa": "/ˈɛldəli ˈɑːtɪzænz wɪʃ ˈmɒdən ˈjʌŋstəz wʊd ʃəʊ ˈɡreɪtə ˌdɛdɪˈkeɪʃən tuː trəˈdɪʃənl krɑːfts/", "vietnameseMeaning": "Các nghệ nhân cao tuổi mong ước giới trẻ ngày nay sẽ thể hiện sự tâm huyết lớn hơn đối với nghề truyền thống.", "contextSituation": "Bày tỏ tâm tư của các bậc tiền bối làng nghề.", "keyPhonicsFocus": "Phát âm chuẩn từ 'dedication' /ˌdɛdɪˈkeɪʃən/.", "sampleAudioText": "Elderly artisans wish modern youngsters would show greater dedication to traditional crafts."},
    {"id": "u4-s7", "targetSentence": "Rural students used to study diligence under the flickering yellow glow of kerosene lamps.", "ipa": "/ˈrʊərəl ˈstjuːdnts juːzd tuː ˈstʌdi ˈdɪlɪʤəns ˈʌndə ðə ˈflɪkərɪŋ ˈjɛləʊ ɡləʊ ɒv ˈkɛrəsiːn læmps/", "vietnameseMeaning": "Học sinh nông thôn ngày xưa từng cần cù học bài dưới ánh sáng vàng lung linh của chiếc đèn dầu.", "contextSituation": "Khen ngợi tinh thần hiếu học vượt khó của thế hệ trước.", "keyPhonicsFocus": "Phát âm chuẩn từ 'diligence' /ˈdɪlɪʤəns/ và 'kerosene'.", "sampleAudioText": "Rural students used to study diligence under the flickering yellow glow of kerosene lamps."},
    {"id": "u4-s8", "targetSentence": "I wish there were more cultural exhibitions displaying historical artifacts in our town.", "ipa": "/aɪ wɪʃ ðeə wɜː mɔː ˈkʌlʧərəl ˌɛksɪˈbɪʃənz dɪsˈpleɪɪŋ hɪsˈtɒrɪkəl ˈɑːtɪfækts ɪn ˈaʊə taʊn/", "vietnameseMeaning": "Tôi ước có thêm nhiều triển lãm văn hóa trưng bày các hiện vật lịch sử tại thị trấn của chúng ta.", "contextSituation": "Đề xuất quảng bá di sản lịch sử địa phương.", "keyPhonicsFocus": "Phát âm chuẩn từ 'artifacts' /ˈɑːtɪfækts/ và 'exhibitions'.", "sampleAudioText": "I wish there were more cultural exhibitions displaying historical artifacts in our town."},
    {"id": "u4-s9", "targetSentence": "Centuries ago, literacy campaigns helped millions of illiterate citizens learn to read and write.", "ipa": "/ˈsɛnʧʊriz əˈɡəʊ ˈlɪtərəsi kæmˈpeɪnz hɛlpt ˈmɪljənz ɒv ɪˈlɪtərɪt ˈsɪtɪznz lɜːn tuː riːd ænd raɪt/", "vietnameseMeaning": "Nhiều thập kỷ trước, các chiến dịch xóa mù chữ đã giúp hàng triệu người dân biết đọc và biết viết.", "contextSituation": "Nói về thành tựu giáo dục của các phong trào bình dân học vụ.", "keyPhonicsFocus": "Phát âm chuẩn từ 'literacy' /ˈlɪtərəsi/ và 'illiterate'.", "sampleAudioText": "Centuries ago, literacy campaigns helped millions of illiterate citizens learn to read and write."},
    {"id": "u4-s10", "targetSentence": "We used to celebrate the Mid-Autumn Festival with homemade bamboo star lanterns.", "ipa": "/wiː juːzd tuː ˈsɛlɪbreɪt ðə mɪd-ˈɔːtəm ˈfɛstəvəl wɪð ˌhəʊmˈmeɪd bæmˈbuː stɑː ˈlæntənz/", "vietnameseMeaning": "Chúng tôi từng đón Tết Trung Thu bằng những chiếc đèn ông sao bằng tre tự làm ở nhà.", "contextSituation": "Nhớ lại kỷ niệm rước đèn Trung Thu xưa.", "keyPhonicsFocus": "Phát âm chuẩn cụm từ 'star lanterns' /stɑː ˈlæntənz/.", "sampleAudioText": "We used to celebrate the Mid-Autumn Festival with homemade bamboo star lanterns."},
    {"id": "u4-s11", "targetSentence": "Grandmother wishes she could preserve every precious folk custom for future generations.", "ipa": "/ˈɡrændˌmʌðə ˈwɪʃɪz ʃiː kʊd prɪˈzɜːv ˈɛvri ˈprɛʃəs fəʊk ˈkʌstəm fɔː ˈfjuːʧə ˌʤɛnəˈreɪʃənz/", "vietnameseMeaning": "Bà ước mình có thể lưu giữ mọi phong tục dân gian quý báu cho các thế hệ tương lai.", "contextSituation": "Nói về ước nguyện của người cao tuổi.", "keyPhonicsFocus": "Phát âm chuẩn từ 'precious' /ˈprɛʃəs/ và 'custom'.", "sampleAudioText": "Grandmother wishes she could preserve every precious folk custom for future generations."},
    {"id": "u4-s12", "targetSentence": "People didn't use to rely on air conditioners; they used handmade palm-leaf fans to cool down.", "ipa": "/ˈpiːpl dɪdnt juːz tuː rɪˈlaɪ ɒn eə kənˈdɪʃənəz ðeɪ juːzd hændˈmeɪd pɑːm-liːf fænz tuː kuːl daʊn/", "vietnameseMeaning": "Mọi người ngày xưa không phụ thuộc vào máy điều hòa; họ dùng quạt mo cau làm mát.", "contextSituation": "So sánh cách sống mộc mạc xưa và nay.", "keyPhonicsFocus": "Phát âm chuẩn cụm từ 'didn't use to rely' và 'palm-leaf fans'.", "sampleAudioText": "People didn't use to rely on air conditioners; they used handmade palm-leaf fans to cool down."},
    {"id": "u4-s13", "targetSentence": "Traditional thatched roofs provided natural insulation against scorching tropical heat.", "ipa": "/trəˈdɪʃənl θæʧt ruːfs prəˈvaɪdɪd ˈnæʧrəl ˌɪnsjʊˈleɪʃən əˈɡɛnst ˈskɔːʧɪŋ ˈtrɒpɪkəl hiːt/", "vietnameseMeaning": "Mái tranh truyền thống mang lại khả năng cách nhiệt tự nhiên chống lại cái nóng nhiệt đới gay gắt.", "contextSituation": "Giải thích cấu trúc nhà ở cổ truyền.", "keyPhonicsFocus": "Phát âm chuẩn từ 'thatched' /θæʧt/ và 'insulation'.", "sampleAudioText": "Traditional thatched roofs provided natural insulation against scorching tropical heat."},
    {"id": "u4-s14", "targetSentence": "I wish our fast-paced society appreciated the slow, peaceful rhythm of village life.", "ipa": "/aɪ wɪʃ ˈaʊə fɑːst-peɪst səˈsaɪəti əˈpriːʃɪeɪtɪd ðə sləʊ ˈpiːsfʊl ˈrɪðəm ɒv ˈvɪlɪʤ laɪf/", "vietnameseMeaning": "Tôi ước xã hội hối hả ngày nay trân trọng hơn nhịp sống chậm rãi và thanh bình của làng quê.", "contextSituation": "Bày tỏ suy ngẫm về lối sống hiện đại.", "keyPhonicsFocus": "Phát âm chuẩn động từ 'appreciated' /əˈpriːʃɪeɪtɪd/ và 'rhythm'.", "sampleAudioText": "I wish our fast-paced society appreciated the slow, peaceful rhythm of village life."},
    {"id": "u4-s15", "targetSentence": "Our ancestors used to rely on solar and lunar calendars to coordinate crop planting cycles.", "ipa": "/ˈaʊər ˈænsɪstəz juːzd tuː rɪˈlaɪ ɒn ˈsəʊlər ænd ˈluːnə ˈkælɪndəz tuː kəʊˈɔːdɪneɪt krɒp ˈplɑːntɪŋ ˈsaɪklz/", "vietnameseMeaning": "Tổ tiên ta từng dựa vào âm lịch và dương lịch để điều phối các mùa vụ gieo trồng.", "contextSituation": "Nói về tri thức nông nghiệp truyền thống.", "keyPhonicsFocus": "Phát âm chuẩn từ 'coordinate' /kəʊˈɔːdɪneɪt/ và 'calendars'.", "sampleAudioText": "Our ancestors used to rely on solar and lunar calendars to coordinate crop planting cycles."},
    {"id": "u4-s16", "targetSentence": "Vietnamese women used to wear traditional four-panel dresses and conical hats during celebrations.", "ipa": "/ˌvjɛtnəˈmiːz ˈwɪmɪn juːzd tuː weə trəˈdɪʃənl fɔː-ˈpænl ˈdrɛsɪz ænd ˈkɒnɪkəl hæts ˈdjʊərɪŋ ˌsɛlɪˈbreɪʃənz/", "vietnameseMeaning": "Phụ nữ Việt Nam xưa từng mặc áo tứ thân truyền thống và đội nón quai thao trong các dịp lễ hội.", "contextSituation": "Giới thiệu trang phục dân tộc cổ truyền.", "keyPhonicsFocus": "Phát âm chuẩn số nhiều 'women' /ˈwɪmɪn/ và 'four-panel'.", "sampleAudioText": "Vietnamese women used to wear traditional four-panel dresses and conical hats during celebrations."},
    {"id": "u4-s17", "targetSentence": "I wish I had the opportunity to learn how to play ancient bronze gongs.", "ipa": "/aɪ wɪʃ aɪ hæd ði ˌɒpəˈtjuːnɪti tuː lɜːn haʊ tuː pleɪ ˈeɪnʃənt brɒnz ɡɒŋz/", "vietnameseMeaning": "Tôi ước mình có cơ hội được học cách diễn tấu cồng chiêng đồng cổ truyền.", "contextSituation": "Bày tỏ niềm đam mê nhạc cụ dân tộc.", "keyPhonicsFocus": "Phát âm chuẩn cấu trúc 'I wish I had' và danh từ 'bronze gongs'.", "sampleAudioText": "I wish I had the opportunity to learn how to play ancient bronze gongs."},
    {"id": "u4-s18", "targetSentence": "Villagers used to share farming tools and help one another harvest crops without payment.", "ipa": "/ˈvɪlɪʤəz juːzd tuː ʃeə ˈfɑːmɪŋ tuːlz ænd hɛlp wʌn əˈnʌðə ˈhɑːvɪst krɒps wɪˈðaʊt ˈpeɪmənt/", "vietnameseMeaning": "Dân làng ngày xưa từng chia sẻ công cụ canh tác và giúp nhau gặt lúa mà không cần trả công.", "contextSituation": "Kể về nét đẹp 'vần công, đổi công' ở làng quê.", "keyPhonicsFocus": "Phát âm chuẩn cụm từ 'without payment' /wɪˈðaʊt ˈpeɪmənt/.", "sampleAudioText": "Villagers used to share farming tools and help one another harvest crops without payment."},
    {"id": "u4-s19", "targetSentence": "Old family photo albums preserve unforgettable memories of our resilient ancestors.", "ipa": "/əʊld ˈfæmɪli ˈfəʊtəʊ ˈælbəmz prɪˈzɜːv ˌʌnfəˈɡɛtəbl ˈmɛməriz ɒv ˈaʊə rɪˈzɪlɪənt ˈænsɪstəz/", "vietnameseMeaning": "Những cuốn an-bum ảnh gia đình cũ gìn giữ những ký ức không thể nào quên về thế hệ ông cha kiên cường.", "contextSituation": "Ý nghĩa của việc trân trọng kỷ vật gia đình.", "keyPhonicsFocus": "Phát âm chuẩn tính từ 'unforgettable' và 'resilient'.", "sampleAudioText": "Old family photo albums preserve unforgettable memories of our resilient ancestors."},
    {"id": "u4-s20", "targetSentence": "Remembering our past teaches us humility, gratitude, and deep cultural responsibility.", "ipa": "/rɪˈmɛmbərɪŋ ˈaʊə pɑːst ˈtiːʧɪz ʌs hjuːˈmɪlɪti ˈɡrætɪtjuːd ænd diːp ˈkʌlʧərəl rɪsˌpɒnsəˈbɪlɪti/", "vietnameseMeaning": "Nhớ về quá khứ dạy cho chúng ta lòng khiêm nhường, sự biết ơn và trách nhiệm văn hóa sâu sắc.", "contextSituation": "Thông điệp bài học tổng kết về lòng tri ân nguồn cội.", "keyPhonicsFocus": "Phát âm chuẩn danh từ 'humility' /hjuːˈmɪlɪti/ và 'gratitude'.", "sampleAudioText": "Remembering our past teaches us humility, gratitude, and deep cultural responsibility."}
]

u4_reading_info = {
    "title": "Ký Ức Đêm Trăng & Những Trò Chơi Tuổi Thơ Thời Chưa Có Màn Hình Điện Tử",
    "topic": "Văn hóa dân gian & Ký ức tuổi thơ truyền thống",
    "passageText": "Before the digital revolution and ubiquitous smartphones redefined childhood entertainment, Vietnamese children engaged with their environment through rich communal folk games. Rural village courtyards, threshing grounds, and riverbanks functioned as open-air playgrounds where imagination reigned supreme.\n\nWithout commercial toys, children exercised remarkable ingenuity. They collected dried pomelo seeds to string together into aromatic holiday candles, carved bamboo segments into piercing flutes, and bound rooster tail feathers around lead washers to craft aerodynamic shuttlecocks. On luminous full-moon evenings, the entire village youth assembled under the century-old banyan tree to play 'Dragon-Snake Ascending to the Sky' (Rồng rắn lên mây) and 'Tugging the Rope' (Kéo co). These lively pursuits not only cultivated physical agility and stamina but also forged lifelong camaraderie and collective resilience.\n\nToday, as rapid urban development replaces traditional threshing fields with concrete high-rises, many traditional games face the risk of oblivion. Fortunately, educational initiatives and heritage clubs are actively reintroducing these historic pastimes into school curricula, allowing contemporary students to reconnect with the soulful spirit of their cultural roots.",
    "keyVocabularyHighlights": [
        {"word": "ubiquitous technology", "meaning": "công nghệ hiện diện khắp muôn nơi"},
        {"word": "remarkable ingenuity", "meaning": "sự khéo léo và sáng tạo đáng kinh ngạc"},
        {"word": "lifelong camaraderie", "meaning": "tình bạn gắn kết bền chặt suốt đời"},
        {"word": "soulful cultural roots", "meaning": "cội nguồn văn hóa sâu lắng, giàu bản sắc"}
    ]
}

u4_reading_qs = [
    {"id": "u4-r1", "question": "Where did Vietnamese children traditionally play folk games in the past?", "options": ["A. Inside virtual computer rooms", "B. In village courtyards, threshing grounds, and riverbanks", "C. In underground mining tunnels", "D. On top of skyscrapers"], "correctAnswerIndex": 1, "explanation": "Trong đoạn 1: 'Rural village courtyards, threshing grounds, and riverbanks functioned as open-air playgrounds.'"},
    {"id": "u4-r2", "question": "How did children create holiday candles without buying commercial ones?", "options": ["A. By collecting and stringing together dried pomelo seeds", "B. By burning petroleum", "C. By using electric flashlights", "D. By melting plastic cups"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'collected dried pomelo seeds to string together into aromatic holiday candles.'"},
    {"id": "u4-r3", "question": "What items were used to make traditional shuttlecocks?", "options": ["A. Rooster tail feathers and lead washers", "B. Cotton cloth and rubber bands", "C. Solid rock blocks", "D. Metal nails"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'bound rooster tail feathers around lead washers to craft aerodynamic shuttlecocks.'"},
    {"id": "u4-r4", "question": "Where did the village youth assemble on full-moon evenings?", "options": ["A. Inside shopping centers", "B. Under the century-old banyan tree", "C. On airplanes", "D. At private swimming pools"], "correctAnswerIndex": 1, "explanation": "Trong đoạn 2: 'assembled under the century-old banyan tree.'"},
    {"id": "u4-r5", "question": "Which traditional games are explicitly mentioned in paragraph 2?", "options": ["A. Video racing and digital soccer", "B. 'Dragon-Snake Ascending to the Sky' and 'Tugging the Rope'", "C. Chess and card games", "D. Swimming and tennis"], "correctAnswerIndex": 1, "explanation": "Trong đoạn 2: ''Dragon-Snake Ascending to the Sky' (Rồng rắn lên mây) and 'Tugging the Rope' (Kéo co).'"},
    {"id": "u4-r6", "question": "What qualities did participating in communal folk games develop in children?", "options": ["A. Eye fatigue and headache", "B. Physical agility, stamina, camaraderie, and collective resilience", "C. Laziness and fear", "D. Selfishness"], "correctAnswerIndex": 1, "explanation": "Trong đoạn 2: 'cultivated physical agility and stamina but also forged lifelong camaraderie and collective resilience.'"},
    {"id": "u4-r7", "question": "Which word in paragraph 1 is closest in meaning to 'ubiquitous'?", "options": ["A. Present everywhere / Widespread", "B. Extremely rare", "C. Dangerous", "D. Expensive"], "correctAnswerIndex": 0, "explanation": "'Ubiquitous' có nghĩa là phổ biến khắp mọi nơi (ubiquitous smartphones)."},
    {"id": "u4-r8", "question": "Which word in paragraph 3 is closest in meaning to 'oblivion'?", "options": ["A. The state of being forgotten or disappearing", "B. Great fame", "C. High speed", "D. Victory"], "correctAnswerIndex": 0, "explanation": "'Risk of oblivion' mang nghĩa nguy cơ bị lãng quên, mai một hoàn toàn."},
    {"id": "u4-r9", "question": "How are educational initiatives preserving traditional folk games today?", "options": ["A. By banning all sports", "B. By actively reintroducing historic pastimes into school curricula", "C. By destroying ancient courtyards", "D. By locking students inside classrooms"], "correctAnswerIndex": 1, "explanation": "Trong đoạn 3: 'actively reintroducing these historic pastimes into school curricula.'"},
    {"id": "u4-r10", "question": "What is the best overall title for this reading passage?", "options": ["A. The History of Modern Smartphones", "B. Moonlight Memories & The Joy of Traditional Childhood Folk Games", "C. How to Build Concrete High-Rises", "D. Agricultural Techniques in Europe"], "correctAnswerIndex": 1, "explanation": "Toàn bài đọc làm nổi bật những ký ức tuổi thơ tươi đẹp gắn liền với các trò chơi dân gian truyền thống."}
]

u4_writing_prompts = [
    {
        "id": "u4-w1",
        "title": "Đề 1: Write a paragraph describing a traditional folk game you wish to preserve (60-80 words)",
        "description": "Viết một đoạn văn giới thiệu về một trò chơi dân gian Việt Nam (kéo co, ô ăn quan, rồng rắn lên mây...) và lý do nên bảo tồn nó.",
        "suggestedOutline": [
            "Introduction: Name the traditional folk game.",
            "Body: Explain how it is played and its benefits (teamwork, fun, physical agility).",
            "Conclusion: State why we should preserve this cultural game in modern times."
        ],
        "usefulPhrases": [
            "One of my favorite traditional folk games is...",
            "In this game, players use simple items like...",
            "It not only brings tremendous joy but also promotes teamwork and...",
            "I wish more schools would include this game in physical education lessons."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "One of my favorite traditional folk games is 'Mandarin Square Capturing' (Ô ăn quan). In this game, two players use fifty small pebbles and two large stones on a drawn board to calculate winning moves. It requires strategic thinking and patient calculation without needing expensive technology. I wish modern students played this folk game more often during recess. Preserving it keeps our ancestors' intellectual legacy alive and connects teenagers with Vietnamese cultural heritage."
    },
    {
        "id": "u4-w2",
        "title": "Đề 2: Write a paragraph about a past custom or tradition that you find fascinating (60-80 words)",
        "description": "Viết một đoạn văn về một phong tục tập quán xưa của người Việt mà em thấy ấn tượng nhất (gói bánh chưng, têm trầu, rước đèn...).",
        "suggestedOutline": [
            "Introduction: Introduce the traditional custom.",
            "Body: Describe how it was practiced in the past and its cultural meaning.",
            "Conclusion: Express your feelings and respect for this tradition."
        ],
        "usefulPhrases": [
            "A traditional custom that I find deeply fascinating is...",
            "In the past, families used to gather around...",
            "This meaningful custom symbolizes filial piety, solidarity, and...",
            "We ought to uphold and pass down this tradition to future generations."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "A traditional custom that I find deeply fascinating is gathering to wrap Chung cake during the Lunar New Year. In the past, multi-generational families used to sit together around a boiling woodstove throughout the chilly winter night, sharing mythical folktales and historic memories. This heartwarming custom symbolizes filial piety and family reunion. Even though life is much busier today, upholding this tradition preserves the soul of Vietnamese Tet."
    },
    {
        "id": "u4-w3",
        "title": "Đề 3: Write a paragraph comparing childhood in the past and childhood today (60-80 words)",
        "description": "Viết một đoạn văn so sánh tuổi thơ xưa (gần gũi thiên nhiên) và tuổi thơ nay (tiện nghi công nghệ).",
        "suggestedOutline": [
            "Introduction: State that childhood has changed dramatically over decades.",
            "Body: Compare past pastimes (outdoor folk games, nature) with modern entertainment (screens, smart devices).",
            "Conclusion: Give a balanced conclusion on what modern children can learn from the past."
        ],
        "usefulPhrases": [
            "Childhood today is vastly different from that of our grandparents' generation...",
            "In the past, children used to play outdoors, making handmade toys from nature...",
            "In contrast, modern youth have access to advanced digital entertainment...",
            "I wish children today spent more time exploring the natural world."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Childhood today has transformed dramatically compared to past generations. Decades ago, children used to play outdoor folk games, swim in clean rivers, and craft toys from bamboo and rooster feathers. In contrast, modern youth enjoy superior educational conditions and digital technology but often suffer from sedentary screen addiction. While modern conveniences are advantageous, teenagers should spend more time outdoors connecting with nature and fostering genuine face-to-face friendships."
    },
    {
        "id": "u4-w4",
        "title": "Đề 4: Write a paragraph about a family heirloom or antique object you cherish (60-80 words)",
        "description": "Viết một đoạn văn kể về một kỷ vật hoặc món đồ cổ của gia đình mà em vô cùng trân quý (chiếc đồng hồ quả lắc, chiếc đèn dầu, bức ảnh cũ...).",
        "suggestedOutline": [
            "Introduction: Introduce the heirloom and who passed it down.",
            "Body: Describe the object and the story or memories attached to it.",
            "Conclusion: Explain why it is meaningful and how you will preserve it."
        ],
        "usefulPhrases": [
            "Our most cherished family heirloom is an antique...",
            "It was handed down to my parents from my great-grandfather...",
            "Whenever I look at it, I am reminded of...",
            "I promise to look after this precious object carefully."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Our most cherished family heirloom is an antique brass clock that was handed down from my great-grandfather. Crafted over sixty years ago, its rhythmic ticking has witnessed our family's historic milestones through joyful and challenging times. Whenever I hear its melodic chime, I am reminded of my ancestors' resilience and diligence. I promise to look after this precious clock carefully as a living link to our family's heritage."
    },
    {
        "id": "u4-w5",
        "title": "Đề 5: Write a paragraph expressing your wishes for preserving historical relics (60-80 words)",
        "description": "Viết một đoạn văn bày tỏ mong ước về việc bảo tồn các di tích lịch sử và di sản văn hóa dân tộc.",
        "suggestedOutline": [
            "Introduction: State the importance of protecting historical monuments and ancient temples.",
            "Body: Express specific wishes (restoring ancient architectures, organizing guided youth tours).",
            "Conclusion: Reaffirm that heritage preservation builds national pride."
        ],
        "usefulPhrases": [
            "Historical relics are priceless treasures of our nation...",
            "I wish the government would invest more in restoring ancient temples and...",
            "Moreover, schools should organize educational field trips so students can...",
            "Preserving our historical past builds strong national pride and identity."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Historical relics are invaluable treasures that connect us with our glorious past. I wish our local authorities would allocate more resources to restore crumbling ancient temples, communal houses, and citadel gates. Furthermore, I wish schools organized regular historical field trips so students could learn history vividly on-site. Protecting our tangible heritage instills deep gratitude toward our ancestors and fosters immense national pride in the hearts of the younger generation."
    }
]

unit4 = make_unit(4, "Unit 4: Remembering the Past", "Nhớ về quá khứ & Di sản truyền thống", "Tìm hiểu về cuộc sống thời xưa, trò chơi dân gian, cấu trúc Used to và câu ước cho hiện tại (Wish + Past Simple).", "Ngữ âm: Ngữ điệu câu ước Wish và phân biệt đuôi phát âm -ed trong quá khứ", "History", u4_vocab, u4_grammar_info, u4_grammar_exs, u4_listening_info, u4_listening_qs, u4_listening_fibs, u4_speaking, u4_reading_info, u4_reading_qs, u4_writing_prompts)
write_ts_unit(4, unit4)
print("Unit 4 generated successfully!")
