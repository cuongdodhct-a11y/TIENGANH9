import json
from gen_unit_utils import make_unit, write_ts_unit

# ==============================================================================
# UNIT 1: LOCAL COMMUNITY (20 Vocab, 20 Grammar, 8 Listening MC + 4 FIB, 20 Speaking, 10 Reading, 5 Writing)
# ==============================================================================
u1_vocab = [
    {"id": "u1-v1", "word": "artisan", "phonetic": "/ˌɑːtɪˈzæn/", "partOfSpeech": "noun", "vietnameseMeaning": "nghệ nhân làm nghề thủ công", "englishExample": "Master artisans in Bat Trang mold delicate ceramic tea sets entirely by hand.", "vietnameseExample": "Các nghệ nhân bậc thầy ở Bát Tràng nặn những bộ ấm chén gốm tinh xảo hoàn toàn bằng tay."},
    {"id": "u1-v2", "word": "craftsman", "phonetic": "/ˈkrɑːftsmən/", "partOfSpeech": "noun", "vietnameseMeaning": "thợ thủ công lành nghề", "englishExample": "Skilled craftsmen carve intricate dragon patterns onto traditional wooden pillars.", "vietnameseExample": "Những thợ thủ công lành nghề chạm khắc các hoa văn rồng tinh xảo lên những cột gỗ truyền thống."},
    {"id": "u1-v3", "word": "handicraft", "phonetic": "/ˈhændikrɑːft/", "partOfSpeech": "noun", "vietnameseMeaning": "sản phẩm thủ công mỹ nghệ", "englishExample": "Foreign tourists adore buying handmade lacquerware handicrafts as memorable souvenirs.", "vietnameseExample": "Du khách nước ngoài rất thích mua các sản phẩm thủ công mỹ nghệ sơn mài làm quà lưu niệm đáng nhớ."},
    {"id": "u1-v4", "word": "pottery", "phonetic": "/ˈpɒtəri/", "partOfSpeech": "noun", "vietnameseMeaning": "đồ gốm, nghề làm gốm", "englishExample": "Bat Trang pottery is celebrated throughout Asia for its distinctive ivory glazes.", "vietnameseExample": "Gốm Bát Tràng được tôn vinh khắp châu Á nhờ những lớp men ngà voi đặc trưng."},
    {"id": "u1-v5", "word": "conical hat", "phonetic": "/ˈkɒnɪkəl hæt/", "partOfSpeech": "noun", "vietnameseMeaning": "nón lá truyền thống", "englishExample": "The Hue poem conical hat reveals poetic verses when held up against sunlight.", "vietnameseExample": "Chiếc nón bài thơ xứ Huế để lộ những câu thơ khi được soi nghiêng dưới ánh nắng mặt trời."},
    {"id": "u1-v6", "word": "lacquerware", "phonetic": "/ˈlækəweə/", "partOfSpeech": "noun", "vietnameseMeaning": "đồ sơn mài mỹ nghệ", "englishExample": "Crafting high-quality lacquerware requires applying and polishing dozens of natural resin coats.", "vietnameseExample": "Chế tác đồ sơn mài cao cấp đòi hỏi phải quét và mài hàng chục lớp nhựa tự nhiên."},
    {"id": "u1-v7", "word": "community helper", "phonetic": "/kəˈmjuːnɪti ˈhɛlpə/", "partOfSpeech": "noun", "vietnameseMeaning": "người phục vụ cộng đồng (bác sĩ, công an, cứu hỏa, vệ sinh)", "englishExample": "Community helpers dedicate their daily efforts to keeping our neighborhood safe and orderly.", "vietnameseExample": "Những người phục vụ cộng đồng cống hiến nỗ lực hàng ngày để giữ cho khu phố của chúng ta an toàn và trật tự."},
    {"id": "u1-v8", "word": "preserve", "phonetic": "/prɪˈzɜːv/", "partOfSpeech": "verb", "vietnameseMeaning": "bảo tồn, gìn giữ", "englishExample": "Youth clubs organize weekend workshops to preserve traditional folk melodies.", "vietnameseExample": "Các câu lạc bộ thanh niên tổ chức các buổi hội thảo cuối tuần nhằm gìn giữ những giai điệu dân ca truyền thống."},
    {"id": "u1-v9", "word": "pass down", "phonetic": "/pɑːs daʊn/", "partOfSpeech": "phrasal verb", "vietnameseMeaning": "truyền lại cho thế hệ sau", "englishExample": "Silk weaving secrets have been passed down across five generations in Van Phuc.", "vietnameseExample": "Bí quyết dệt lụa đã được truyền lại qua năm thế hệ ở Vạn Phúc."},
    {"id": "u1-v10", "word": "neighborhood", "phonetic": "/ˈneɪbəhʊd/", "partOfSpeech": "noun", "vietnameseMeaning": "khu dân cư, khu phố lân cận", "englishExample": "Neighbors in our peaceful neighborhood cooperate to organize green cleanup drives.", "vietnameseExample": "Bà con trong khu phố yên bình của chúng tôi hợp tác tổ chức các đợt tổng vệ sinh xanh."},
    {"id": "u1-v11", "word": "suburb", "phonetic": "/ˈsʌbɜːb/", "partOfSpeech": "noun", "vietnameseMeaning": "khu vực ngoại ô", "englishExample": "Many craft villages are located in tranquil suburbs surrounded by lush rice fields.", "vietnameseExample": "Nhiều làng nghề nằm ở những vùng ngoại ô yên bình được bao bọc bởi những cánh đồng lúa xanh tốt."},
    {"id": "u1-v12", "word": "speciality", "phonetic": "/ˌspɛʃiˈælɪti/", "partOfSpeech": "noun", "vietnameseMeaning": "đặc sản địa phương, nét độc đáo", "englishExample": "Crispy spring rolls and banh cuon are culinary specialities of our ancient quarter.", "vietnameseExample": "Nem rán giòn rụm và bánh cuốn là những món ăn đặc sản của khu phố cổ chúng tôi."},
    {"id": "u1-v13", "word": "solidarity", "phonetic": "/ˌsɒlɪˈdærɪti/", "partOfSpeech": "noun", "vietnameseMeaning": "tinh thần đoàn kết cộng đồng", "englishExample": "Neighborhood solidarity helps vulnerable families overcome challenging circumstances.", "vietnameseExample": "Tinh thần đoàn kết xóm giềng giúp các gia đình có hoàn cảnh khó khăn vượt qua nghịch cảnh."},
    {"id": "u1-v14", "word": "deliver", "phonetic": "/dɪˈlɪvə/", "partOfSpeech": "verb", "vietnameseMeaning": "giao hàng, chuyển phát bưu phẩm", "englishExample": "The local postal worker delivers letters and care packages to every doorstep promptly.", "vietnameseExample": "Người đưa thư địa phương giao thư từ và các gói bưu phẩm đến từng bậc cửa một cách nhanh chóng."},
    {"id": "u1-v15", "word": "electrician", "phonetic": "/ɪˌlɛkˈtrɪʃən/", "partOfSpeech": "noun", "vietnameseMeaning": "thợ điện", "englishExample": "A qualified electrician was summoned immediately to repair the neighborhood power line.", "vietnameseExample": "Một thợ điện có chứng chỉ đã được gọi ngay lập tức đến để sửa đường dây điện của khu phố."},
    {"id": "u1-v16", "word": "firefighter", "phonetic": "/ˈfaɪəˌfaɪtə/", "partOfSpeech": "noun", "vietnameseMeaning": "chiến sĩ cảnh sát cứu hỏa", "englishExample": "Courageous firefighters rescued three children trapped inside the burning residential building.", "vietnameseExample": "Những chiến sĩ cứu hỏa dũng cảm đã giải cứu ba đứa trẻ bị kẹt bên trong tòa nhà chung cư bốc cháy."},
    {"id": "u1-v17", "word": "garbage collector", "phonetic": "/ˈɡɑːbɪʤ kəˈlɛktə/", "partOfSpeech": "noun", "vietnameseMeaning": "công nhân vệ sinh môi trường, người thu gom rác", "englishExample": "Hardworking garbage collectors keep our communal streets clean and sanitary before dawn.", "vietnameseExample": "Những công nhân thu gom rác chăm chỉ giữ cho đường phố khu dân cư sạch đẹp và vệ sinh trước khi rạng đông."},
    {"id": "u1-v18", "word": "volunteer", "phonetic": "/ˌvɒlənˈtɪə/", "partOfSpeech": "noun", "vietnameseMeaning": "tình nguyện viên", "englishExample": "High school volunteers organize free English tutoring classes for rural primary pupils.", "vietnameseExample": "Các bạn tình nguyện viên trường THPT tổ chức các lớp dạy kèm tiếng Anh miễn phí cho học sinh tiểu học nông thôn."},
    {"id": "u1-v19", "word": "authentic", "phonetic": "/ɔːˈθɛntɪk/", "partOfSpeech": "adjective", "vietnameseMeaning": "chuẩn xác, đích thực, chính gốc", "englishExample": "This shop sells authentic hand-woven brocade fabrics woven by Dao ethnic women.", "vietnameseExample": "Cửa hàng này bán vải thổ cẩm dệt tay chính gốc do phụ nữ dân tộc Dao dệt nên."},
    {"id": "u1-v20", "word": "look after", "phonetic": "/lʊk ˈɑːftə/", "partOfSpeech": "phrasal verb", "vietnameseMeaning": "chăm sóc, trông nom chu đáo", "englishExample": "Neighbors gladly look after each other's pets and gardens whenever someone travels.", "vietnameseExample": "Bà con xóm giềng vui vẻ trông nom thú cưng và vườn cây giúp nhau mỗi khi có người đi xa."}
]

u1_grammar_info = {
    "title": "Cụm Động Từ (Phrasal Verbs) & Từ Để Hỏi Trước Động Từ Nguyên Mẫu (Question Words + To-V)",
    "summary": "Nắm vững các cụm động từ thường gặp trong đời sống cộng đồng (pass down, look after, turn down, come back, find out...) và cấu trúc Wh-word + to-infinitive (who to contact, where to buy, how to preserve...).",
    "formulaBox": [
        "Phrasal Verb: Verb + Preposition / Particle (look after = care for, pass down = transfer to next generation, find out = discover, get on with = have good relation).",
        "Wh-word + To-infinitive: S + V (know / decide / wonder / ask) + what / where / when / how / who + TO-V",
        "Ví dụ: We don't know WHERE TO BUY authentic pottery in Hanoi.",
        "He showed me HOW TO PRESERVE traditional lacquerware."
    ],
    "usagePoints": [
        {"title": "1. Rút gọn mệnh đề danh từ bằng To-Infinitive", "detail": "Cấu trúc 'Wh-word + To-V' thay thế cho mệnh đề phụ khi chủ ngữ hai mệnh đề đồng nhất (I don't know where I should go -> I don't know where to go).", "example": "She wondered who to ask for medical assistance in the new neighborhood."},
        {"title": "2. Cụm động từ có thể tách rời hoặc không", "detail": "Một số cụm như pass down (pass something down / pass it down), turn down (turn the offer down).", "example": "The artisan passed his secret pottery techniques down to his eldest son."}
    ]
}

u1_grammar_exs = [
    {"id": "u1-g1", "question": "The veteran artisan _____ his ceramic glazing techniques to his granddaughter.", "options": ["A. passed down", "B. passed out", "C. passed away", "D. passed by"], "correctAnswer": "A. passed down", "explanation": "'pass down' có nghĩa là truyền lại bí quyết cho thế hệ sau."},
    {"id": "u1-g2", "question": "Can you tell me _____ to find authentic conical hats in this ancient craft village?", "options": ["A. where", "B. what", "C. which", "D. why"], "correctAnswer": "A. where", "explanation": "'where to find' = tìm ở đâu (chỉ nơi chốn)."},
    {"id": "u1-g3", "question": "Our friendly neighbors always _____ our house whenever we travel during summer.", "options": ["A. look after", "B. look for", "C. look up", "D. look into"], "correctAnswer": "A. look after", "explanation": "'look after' = chăm sóc, trông nom nhà cửa."},
    {"id": "u1-g4", "question": "She didn't know _____ to contact when the neighborhood water pipe suddenly burst.", "options": ["A. who", "B. which", "C. why", "D. what"], "correctAnswer": "A. who", "explanation": "'who to contact' = liên hệ với ai (chỉ người)."},
    {"id": "u1-g5", "question": "The village committee is trying to _____ who vandalized the communal playground.", "options": ["A. find out", "B. find in", "C. find at", "D. find off"], "correctAnswer": "A. find out", "explanation": "'find out' = tìm ra, phát hiện ra thông tin."},
    {"id": "u1-g6", "question": "I don't understand _____ to operate this traditional wooden weaving loom.", "options": ["A. how", "B. who", "C. whom", "D. which"], "correctAnswer": "A. how", "explanation": "'how to operate' = cách vận hành khung cửi dệt gỗ."},
    {"id": "u1-g7", "question": "He _____ the prestigious job offer in the city to stay and help his hometown craft workshop.", "options": ["A. turned down", "B. turned off", "C. turned up", "D. turned on"], "correctAnswer": "A. turned down", "explanation": "'turned down' = từ chối một lời đề nghị."},
    {"id": "u1-g8", "question": "They are wondering _____ to organize the annual charity food fair for low-income families.", "options": ["A. when", "B. why", "C. whose", "D. which"], "correctAnswer": "A. when", "explanation": "'when to organize' = khi nào nên tổ chức hội chợ từ thiện."},
    {"id": "u1-g9", "question": "Mai gets _____ well with all the artisans and residents in the pottery guild.", "options": ["A. on", "B. in", "C. at", "D. over"], "correctAnswer": "A. on", "explanation": "'get on well with someone' = có mối quan hệ hòa thuận với ai."},
    {"id": "u1-g10", "question": "The tour guide explained _____ to do in case of an unexpected power outage.", "options": ["A. what", "B. where", "C. who", "D. when"], "correctAnswer": "A. what", "explanation": "'what to do' = phải làm gì (tân ngữ cho động từ do)."},
    {"id": "u1-g11", "question": "We must _____ on single-use plastics to keep our local canals clean and unpolluted.", "options": ["A. cut down", "B. cut off", "C. cut out", "D. cut in"], "correctAnswer": "A. cut down", "explanation": "'cut down on' = cắt giảm việc sử dụng rác thải nhựa."},
    {"id": "u1-g12", "question": "The apprentice asked the master craftsman _____ wood to select for the temple gate.", "options": ["A. which", "B. who", "C. whom", "D. where"], "correctAnswer": "A. which", "explanation": "'which wood to select' = loại gỗ nào nên chọn."},
    {"id": "u1-g13", "question": "After living abroad for ten years, Mr. An decided to _____ to his peaceful native village.", "options": ["A. come back", "B. come across", "C. come into", "D. come up"], "correctAnswer": "A. come back", "explanation": "'come back' = trở về quê hương."},
    {"id": "u1-g14", "question": "Could you advise me on _____ to apply for the community volunteer certificate?", "options": ["A. how", "B. why", "C. whom", "D. which"], "correctAnswer": "A. how", "explanation": "'how to apply' = cách thức nộp đơn đăng ký."},
    {"id": "u1-g15", "question": "The local fire department quickly _____ the fire before it could spread to neighboring houses.", "options": ["A. put out", "B. put off", "C. put on", "D. put up"], "correctAnswer": "A. put out", "explanation": "'put out the fire' = dập tắt đám cháy."},
    {"id": "u1-g16", "question": "Nobody told the new resident _____ to dispose of recyclable cardboard containers.", "options": ["A. where", "B. who", "C. why", "D. which"], "correctAnswer": "A. where", "explanation": "'where to dispose' = vứt bỏ ở nơi nào."},
    {"id": "u1-g17", "question": "We ran _____ cooking oil while preparing twenty charity lunch boxes for elderly neighbors.", "options": ["A. out of", "B. out with", "C. off from", "D. down with"], "correctAnswer": "A. out of", "explanation": "'run out of' = cạn kiệt, hết sạch dầu ăn."},
    {"id": "u1-g18", "question": "The students are debating _____ to invite to their community culture talk show.", "options": ["A. who", "B. where", "C. when", "D. why"], "correctAnswer": "A. who", "explanation": "'who to invite' = nên mời ai đến buổi tọa đàm."},
    {"id": "u1-g19", "question": "You should _____ your shoes before entering the village's sacred communal house.", "options": ["A. take off", "B. take in", "C. take up", "D. take over"], "correctAnswer": "A. take off", "explanation": "'take off' = cởi giày dép ra."},
    {"id": "u1-g20", "question": "They cannot decide _____ to hold the village cleanup campaign: Saturday or Sunday.", "options": ["A. when", "B. why", "C. who", "D. where"], "correctAnswer": "A. when", "explanation": "'when to hold' = tổ chức vào thời điểm nào (Thứ Bảy hay Chủ Nhật)."}
]

u1_listening_info = {
    "audioTitle": "Chuyến Thăm Làng Gốm Bát Tràng (A Visit to Bat Trang Pottery Village)",
    "audioDuration": "3:15",
    "audioScriptSpeaker": "Artisan Mr. Quang & Student Mi",
    "transcriptText": "Mi: Good morning, Mr. Quang! How long has your family practiced pottery making here in Bat Trang?\nMr. Quang: Hello Mi! Our family has molded ceramic pottery for four generations. My great-grandfather passed down these specialized clay mixing formulas to us.\nMi: How do artisans create such smooth, glossy teapots and vases?\nMr. Quang: First, we select high-grade white clay, knead it thoroughly, and shape it on a spinning potter's wheel. After painting intricate lotus patterns, we coat the items with natural wood-ash glaze and bake them inside high-temperature kilns for twelve hours.\nMi: What should young volunteers do to preserve our traditional craft villages?\nMr. Quang: You can share high-definition videos of pottery making on social media, welcome foreign visitors, and appreciate the patience of community craftsmen!",
    "vietnameseTranslation": "Mi: Cháu chào bác Quang ạ! Gia đình bác đã làm nghề gốm ở Bát Tràng được bao lâu rồi ạ?\nBác Quang: Chào cháu Mi! Gia đình bác đã nặn đồ gốm sứ qua bốn thế hệ rồi. Cụ cố của bác đã truyền lại các công thức pha chế đất sét chuyên dụng này cho con cháu.\nMi: Các nghệ nhân làm thế nào để tạo ra những chiếc ấm chén và bình hoa nhẵn bóng như vậy ạ?\nBác Quang: Đầu tiên, chúng ta chọn đất sét trắng thượng hạng, nhào thật kỹ và tạo hình trên bàn xoay gốm. Sau khi vẽ các họa tiết hoa sen tinh xảo, chúng ta phủ lớp men tro gỗ tự nhiên và nung trong lò nhiệt độ cao suốt 12 tiếng.\nMi: Các bạn trẻ tình nguyện viên nên làm gì để gìn giữ các làng nghề truyền thống của chúng ta ạ?\nBác Quang: Các cháu có thể chia sẻ các video độ nét cao về quy trình làm gốm lên mạng xã hội, đón tiếp du khách quốc tế và trân trọng sự kiên nhẫn của những người thợ thủ công trong cộng đồng!"
}

u1_listening_qs = [
    {"id": "u1-l1", "question": "How many generations has Mr. Quang's family practiced pottery making in Bat Trang?", "options": ["A. Four generations", "B. One year", "C. Two days", "D. Ten centuries"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'Our family has molded ceramic pottery for four generations.'"},
    {"id": "u1-l2", "question": "What kind of clay is selected first in the pottery making process?", "options": ["A. High-grade white clay", "B. Sandy red soil", "C. Salty ocean mud", "D. Black coal powder"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'First, we select high-grade white clay.'"},
    {"id": "u1-l3", "question": "How are the clay items shaped according to Mr. Quang?", "options": ["A. On a spinning potter's wheel", "B. With a laser machine", "C. By throwing them against the wall", "D. By freezing in an icebox"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'knead it thoroughly, and shape it on a spinning potter's wheel.'"},
    {"id": "u1-l4", "question": "How long are the ceramic pieces baked inside high-temperature kilns?", "options": ["A. For twelve hours", "B. For ten minutes", "C. For three weeks", "D. For two minutes"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'bake them inside high-temperature kilns for twelve hours.'"},
    {"id": "u1-l5", "question": "What motif is painted on the pottery before applying glaze?", "options": ["A. Intricate lotus patterns", "B. Cartoon robots", "C. European castles", "D. Mathematics equations"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'painting intricate lotus patterns.'"},
    {"id": "u1-l6", "question": "Who passed down the clay mixing formulas to Mr. Quang's family?", "options": ["A. His great-grandfather", "B. A foreign tourist", "C. A university student", "D. A robot manufacturer"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'My great-grandfather passed down these specialized clay mixing formulas.'"},
    {"id": "u1-l7", "question": "What action can young people take to support traditional craft villages?", "options": ["A. Share pottery making videos on social media and welcome foreign visitors", "B. Destroy all craft workshops", "C. Avoid all hand-made products", "D. Throw clay away"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'share high-definition videos of pottery making on social media, welcome foreign visitors.'"},
    {"id": "u1-l8", "question": "What quality of community craftsmen does Mr. Quang emphasize appreciating?", "options": ["A. Their patience and dedication", "B. Their speed in racing cars", "C. Their singing voices", "D. Their physical height"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'appreciate the patience of community craftsmen!'"}
]

u1_listening_fibs = [
    {"id": "u1-f1", "sentenceWithBlank": "Mr. Quang's family molds pottery across four _____.", "correctWord": "generations", "hint": "Các thế hệ gia đình (generations)"},
    {"id": "u1-f2", "sentenceWithBlank": "Artisans shape white clay on a spinning potter's _____.", "correctWord": "wheel", "hint": "Bàn xoay gốm (wheel)"},
    {"id": "u1-f3", "sentenceWithBlank": "They bake the ceramic vases inside hot _____ for 12 hours.", "correctWord": "kilns", "hint": "Lò nung gốm (kilns)"},
    {"id": "u1-f4", "sentenceWithBlank": "Volunteers should appreciate the _____ of skilled craftsmen.", "correctWord": "patience", "hint": "Sự kiên nhẫn và tận tâm (patience)"}
]

# Speaking prompts for Unit 1 (20 items)
u1_speaking = [
    {"id": f"u1-s{i+1}", "targetSentence": s, "ipa": ipa, "vietnameseMeaning": vm, "contextSituation": ctx, "keyPhonicsFocus": kpf, "sampleAudioText": s}
    for i, (s, ipa, vm, ctx, kpf) in enumerate([
        ("Master artisans in Bat Trang mold exquisite ceramic vases and teapots entirely by hand.", "/ˈmɑːstər ˌɑːtɪˈzænz ɪn bɑːt ʧɑːŋ məʊld ɪkˈskwɪzɪt sɪˈræmɪk ˈvɑːzɪz ænd ˈtiːpɒts ɪnˈtaɪəli baɪ hænd/", "Các nghệ nhân bậc thầy ở Bát Tràng nặn những bình hoa và ấm trà gốm tuyệt mỹ hoàn toàn bằng tay.", "Thuyết trình về làng nghề gốm Bát Tràng.", "Phát âm chuẩn từ 'artisans' /ˈɑːtɪˈzænz/ và 'exquisite' /ɪkˈskwɪzɪt/."),
        ("Traditional weaving techniques have been passed down through five generations in Van Phuc silk village.", "/trəˈdɪʃənl ˈwiːvɪŋ tɛkˈniːks hæv biːn pɑːst daʊn θruː faɪv ˌʤɛnəˈreɪʃənz ɪn væn fʊk sɪlk ˈvɪlɪʤ/", "Kỹ thuật dệt lụa truyền thống đã được truyền lại qua 5 thế hệ ở làng lụa Vạn Phúc.", "Giới thiệu lịch sử làng lụa Vạn Phúc.", "Phát âm chuẩn cụm động từ 'passed down'."),
        ("Community helpers like dedicated firefighters and doctors work tirelessly to ensure our safety.", "/kəˈmjuːnɪti ˈhɛlpəz laɪk ˈdɛdɪkeɪtɪd ˈfaɪəˌfaɪtəz ænd ˈdɒktəz wɜːk ˈtaɪəlɪsli tuː ɪnˈʃʊər ˈaʊə ˈseɪfti/", "Những người phục vụ cộng đồng như lính cứu hỏa và bác sĩ tận tâm làm việc không biết mệt mỏi để bảo vệ an toàn cho chúng ta.", "Tôn vinh người phục vụ cộng đồng.", "Phát âm chuẩn từ 'tirelessly' /ˈtaɪəlɪsli/ và 'helpers'."),
        ("Can you show me where to purchase authentic hand-embroidered lacquerware paintings in Ha Noi?", "/kæn juː ʃəʊ miː weə tuː ˈpɜːʧəs ɔːˈθɛntɪk hænd-ɪmˈbrɔɪdəd ˈlækəweə ˈpeɪntɪŋz ɪn hæ nɔɪ/", "Bạn có thể chỉ cho tôi nơi mua tranh sơn mài thêu tay chính gốc ở Hà Nội không?", "Hỏi đường và địa chỉ mua sắm thủ công.", "Phát âm chuẩn cấu trúc 'where to purchase authentic lacquerware'."),
        ("Our neighborhood residents organize monthly environmental cleanup campaigns to collect plastic rubbish.", "/ˈaʊə ˈneɪbəhʊd ˈrɛzɪdənts ˈɔːɡənaɪz ˈmʌnθli ɪnˌvaɪərənˈmɛntl ˈkliːnʌp kæmˈpeɪnz tuː kəˈlɛkt ˈplæstɪk ˈrʌbɪʃ/", "Cư dân khu phố chúng tôi tổ chức các chiến dịch dọn vệ sinh môi trường hàng tháng để thu gom rác nhựa.", "Nói về hoạt động bảo vệ môi trường khu dân cư.", "Phát âm chuẩn từ 'neighborhood' /ˈneɪbəhʊd/ và 'campaigns'."),
        ("We should always look after elderly neighbors who live alone and need daily assistance.", "/wiː ʃʊd ˈɔːlweɪz lʊk ˈɑːftər ˈɛldəli ˈneɪbəz huː lɪv əˈləʊn ænd niːd ˈdeɪli əˈsɪstəns/", "Chúng ta nên luôn quan tâm chăm sóc những người hàng xóm cao tuổi sống một mình và cần sự hỗ trợ hàng ngày.", "Khuyên răn tinh thần tương thân tương ái.", "Phát âm chuẩn cụm động từ 'look after elderly neighbors'."),
        ("The village craftsman explained how to mix wood ash with natural minerals to create durable glaze.", "/ðə ˈvɪlɪʤ ˈkrɑːftsmən ɪksˈpleɪnd haʊ tuː mɪks wʊd æʃ wɪð ˈnæʧrəl ˈmɪnərəlz tuː kriːˈeɪt ˈdjʊərəbl ɡleɪz/", "Người thợ thủ công trong làng đã giải thích cách trộn tro gỗ với khoáng chất tự nhiên để tạo lớp men bền đẹp.", "Thuyết minh về kỹ thuật làm gốm.", "Phát âm chuẩn cấu trúc 'how to mix wood ash'."),
        ("High school volunteers teach free conversational English classes for rural primary school pupils.", "/haɪ skuːl ˌvɒlənˈtɪəz tiːʧ friː ˌkɒnvəˈseɪʃənl ˈɪŋɡlɪʃ ˈklɑːsɪz fɔː ˈrʊərəl ˈpraɪməri skuːl ˈpjuːplz/", "Các bạn tình nguyện viên trường THPT dạy các lớp tiếng Anh giao tiếp miễn phí cho học sinh tiểu học nông thôn.", "Chia sẻ hoạt động tình nguyện hè.", "Phát âm chuẩn từ 'volunteers' /ˌvɒlənˈtɪəz/ và 'conversational'."),
        ("Preserving ancient craft traditions connects modern generations with their rich cultural heritage.", "/prɪˈzɜːvɪŋ ˈeɪnʃənt krɑːft trəˈdɪʃənz kəˈnɛkts ˈmɒdən ˌʤɛnəˈreɪʃənz wɪð ðeə rɪʧ ˈkʌlʧərəl ˈhɛrɪtɪʤ/", "Gìn giữ các truyền thống làng nghề cổ xưa kết nối các thế hệ hiện đại với di sản văn hóa phong phú của họ.", "Nói về ý nghĩa của việc bảo tồn làng nghề.", "Phát âm chuẩn từ 'preserving' và 'heritage' /ˈhɛrɪtɪʤ/."),
        ("He turned down a high-paying corporate salary to inherit and expand his ancestral pottery kiln.", "/hiː tɜːnd daʊn ə haɪ-ˈpeɪɪŋ ˈkɔːpərɪt ˈsæləri tuː ɪnˈhɛrɪt ænd ɪksˈpænd hɪz ænˈsɛstrəl ˈpɒtəri kɪln/", "Anh ấy đã từ chối mức lương cao ở tập đoàn để kế nghiệp và mở rộng lò gốm gia truyền của tổ tiên.", "Kể câu chuyện thanh niên lập nghiệp tại làng nghề.", "Phát âm chuẩn cụm từ 'turned down' và 'ancestral' /ænˈsɛstrəl/."),
        ("Garbage collectors wake up before sunrise to sweep streets and ensure public sanitation.", "/ˈɡɑːbɪʤ kəˈlɛktəz weɪk ʌp bɪˈfɔː ˈsʌnraɪz tuː swiːp striːts ænd ɪnˈʃʊə ˈpʌblɪk ˌsænɪˈteɪʃən/", "Những người công nhân thu gom rác thức dậy trước bình minh để quét dọn đường phố và đảm bảo vệ sinh công cộng.", "Bày tỏ lòng biết ơn công nhân vệ sinh môi trường.", "Phát âm chuẩn từ 'sanitation' /ˌsænɪˈteɪʃən/."),
        ("Do you know who to contact when there is a sudden emergency power outage in the building?", "/duː juː nəʊ huː tuː ˈkɒntækt wɛn ðeər ɪz ə ˈsʌdn ɪˈmɜːʤənsi ˈpaʊər ˈaʊtɪʤ ɪn ðə ˈbɪldɪŋ/", "Bạn có biết liên hệ với ai khi xảy ra sự cố mất điện đột ngột trong tòa nhà không?", "Hỏi về số liên lạc khẩn cấp.", "Phát âm chuẩn cấu trúc 'who to contact when there is an emergency'."),
        ("Hue conical hats are famous worldwide because poems and folk paintings are woven inside layers.", "/hweɪ ˈkɒnɪkəl hæts ɑː ˈfeɪməs ˌwɜːldˈwaɪd bɪˈkɒz ˈpəʊɪmz ænd fəʊk ˈpeɪntɪŋz ɑː ˈwəʊvən ɪnˈsaɪd ˈleɪəz/", "Nón lá xứ Huế nổi tiếng khắp thế giới vì những bài thơ và tranh dân gian được lồng vào giữa các lớp lá.", "Giới thiệu nón bài thơ Huế.", "Phát âm chuẩn từ 'woven' /ˈwəʊvən/ và 'conical' /ˈkɒnɪkəl/."),
        ("Community solidarity makes our residential neighborhood a harmonious and secure haven for all.", "/kəˈmjuːnɪti ˌsɒlɪˈdærɪti meɪks ˈaʊə ˌrɛzɪˈdɛnʃəl ˈneɪbəhʊd ə hɑːˈməʊnjəs ænd sɪˈkjʊə ˈheɪvn fɔːr ɔːl/", "Tinh thần đoàn kết cộng đồng biến khu dân cư của chúng ta thành một mái ấm hòa thuận và bình an cho mọi người.", "Nêu cao giá trị tình làng nghĩa xóm.", "Phát âm chuẩn từ 'solidarity' /ˌsɒlɪˈdærɪti/ và 'haven' /ˈheɪvn/."),
        ("We should cut down on single-use plastic bags when shopping at local wet markets.", "/wiː ʃʊd kʌt daʊn ɒn ˈsɪŋɡl-juːz ˈplæstɪk bæɡz wɛn ˈʃɒpɪŋ æt ˈləʊkəl wɛt ˈmɑːkɪts/", "Chúng ta nên cắt giảm túi nhựa dùng một lần khi đi mua sắm tại các khu chợ dân sinh.", "Khuyên dùng túi vải thân thiện môi trường.", "Phát âm chuẩn cụm động từ 'cut down on single-use plastic bags'."),
        ("The young apprentice wondered what to do next after baking the clay pots inside the kiln.", "/ðə jʌŋ əˈprɛntɪs ˈwʌndəd wɒt tuː duː nɛkst ˈɑːftə ˈbeɪkɪŋ ðə kleɪ pɒts ɪnˈsaɪd ðə kɪln/", "Người thợ học việc trẻ băn khoăn không biết nên làm gì tiếp theo sau khi nung các bình đất sét trong lò.", "Kể về quá trình học nghề làm gốm.", "Phát âm chuẩn cấu trúc 'wondered what to do next'."),
        ("Local police officers and security guards maintain peace and order throughout our communal quarter.", "/ˈləʊkəl pəˈliːs ˈɒfɪsəz ænd sɪˈkjʊərɪti ɡɑːdz meɪnˈteɪn piːs ænd ˈɔːdə θruːˈaʊt ˈaʊə kəˈmjuːnl ˈkwɔːtə/", "Các chiến sĩ công an địa phương và bảo vệ duy trì an ninh trật tự trên khắp khu dân cư của chúng tôi.", "Tri ân lực lượng giữ gìn trật tự.", "Phát âm chuẩn từ 'maintain' /meɪnˈteɪn/ và 'communal' /kəˈmjuːnl/."),
        ("Visiting ancient craft villages allows tourists to try their hand at shaping wet clay on a wheel.", "/ˈvɪzɪtɪŋ ˈeɪnʃənt krɑːft ˈvɪlɪʤɪz əˈlaʊz ˈtʊərɪsts tuː traɪ ðeə hænd æt ˈʃeɪpɪŋ wɛt kleɪ ɒn ə wiːl/", "Tham quan các làng nghề cổ truyền cho phép du khách tự tay thử sức nặn đất sét ướt trên bàn xoay.", "Mời bạn bè trải nghiệm làm gốm.", "Phát âm chuẩn cụm từ 'try their hand at shaping wet clay'."),
        ("Small everyday acts of community kindness build a tightly-knit, empathetic, and joyful society.", "/smɔːl ˈɛvrɪdeɪ ækts ɒv kəˈmjuːnɪti ˈkaɪndnɪs bɪld ə ˈtaɪtli-nɪt ˌɛmpəˈθɛtɪk ænd ˈʤɔɪfʊl səˈsaɪəti/", "Những hành động tử tế nhỏ bé mỗi ngày trong cộng đồng xây dựng nên một xã hội gắn kết bền chặt, giàu thấu cảm và ngập tràn niềm vui.", "Thông điệp về tình người trong khu phố.", "Phát âm chuẩn từ 'tightly-knit' /ˈtaɪtli-nɪt/ và 'empathetic' /ˌɛmpəˈθɛtɪk/."),
        ("May our precious craft villages flourish forever, preserving our ancestors' boundless wisdom.", "/meɪ ˈaʊə ˈprɛʃəs krɑːft ˈvɪlɪʤɪz ˈflʌrɪʃ fəˈrɛvə prɪˈzɜːvɪŋ ˈaʊər ˈænsɛstəz ˈbaʊndlɪs ˈwɪzdəm/", "Chúc các làng nghề quý báu của chúng ta mãi mãi phồn vinh, gìn giữ trọn vẹn trí tuệ vô tận của tổ tiên.", "Lời chúc tốt đẹp dành cho các làng nghề truyền thống.", "Phát âm chuẩn từ 'flourish' /ˈflʌrɪʃ/ và 'ancestors' /ˈænsɛstəz/.")
    ])
]

u1_reading_info = {
    "title": "Bảo Tồn Làng Nghề Thủ Công Truyền Thống Trong Xã Hội Hiện Đại",
    "topic": "Vai trò của làng nghề truyền thống & Đời sống cộng đồng địa phương",
    "passageText": "Traditional craft villages in Viet Nam represent centuries of artistic brilliance, cultural heritage, and community solidarity. From the glossy ivory ceramics of Bat Trang and the iridescent silks of Van Phuc to the conical poem hats of Tay Ho, each craft settlement encapsulates ancestral wisdom passed down across generations. These villages serve not merely as manufacturing hubs, but as living cultural sanctuaries where communal values, festive rituals, and craftsmanship flourish in harmony.\n\nHowever, in an era of rapid industrialization and mass automated production, traditional craft communities confront substantial hurdles. Inexpensive synthetic alternatives frequently undercut handcrafted goods in price. Furthermore, many younger villagers migrate to metropolitan centers in pursuit of high-paying tech jobs, leaving veteran artisans anxious about who to pass their secret techniques down to.\n\nTo revitalize these invaluable heritages, local authorities, artisans, and youthful entrepreneurs are collaborating creatively. Craft villages are modernizing by combining eco-tourism workshops with digital e-commerce marketplaces. Visitors can now shape wet clay on spinning wheels, weave silk patterns on traditional looms, and purchase authentic handicrafts directly online. Through community solidarity and cultural pride, Viet Nam's traditional craft villages are adapting successfully to the contemporary global landscape.",
    "keyVocabularyHighlights": [
        {"word": "ancestral wisdom", "meaning": "trí tuệ và kinh nghiệm quý báu của tổ tiên"},
        {"word": "living cultural sanctuaries", "meaning": "những thánh đường văn hóa sống động"},
        {"word": "synthetic alternatives", "meaning": "các sản phẩm nhân tạo thay thế giá rẻ"},
        {"word": "revitalize", "meaning": "hồi sinh, tiếp thêm sức sống mới"}
    ]
}

u1_reading_qs = [
    {"id": "u1-r1", "question": "What do traditional craft villages in Viet Nam represent according to the passage?", "options": ["A. Centuries of artistic brilliance, cultural heritage, and community solidarity", "B. Heavy steel car factories only", "C. Abandoned empty ruins", "D. Foreign amusement parks"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 1: 'represent centuries of artistic brilliance, cultural heritage, and community solidarity.'"},
    {"id": "u1-r2", "question": "Which famous craft villages are highlighted in paragraph 1?", "options": ["A. Bat Trang ceramics, Van Phuc silk, and Tay Ho conical hats", "B. Silicon Valley software labs", "C. Deep coal mining towns", "D. Modern oil rigs"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 1: 'Bat Trang... Van Phuc... Tay Ho.'"},
    {"id": "u1-r3", "question": "What major challenge do traditional craft communities face due to industrialization?", "options": ["A. Inexpensive synthetic alternatives and youth migration to big cities", "B. Too much rain every day", "C. Lack of clay on the planet", "D. Banning all tourism"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'Inexpensive synthetic alternatives... younger villagers migrate to metropolitan centers.'"},
    {"id": "u1-r4", "question": "Why are veteran artisans anxious about the future?", "options": ["A. About who to pass their secret craftsmanship techniques down to", "B. About electricity bills only", "C. About buying new cars", "D. About learning French"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'leaving veteran artisans anxious about who to pass their secret techniques down to.'"},
    {"id": "u1-r5", "question": "How are modern craft villages revitalizing themselves according to paragraph 3?", "options": ["A. Combining eco-tourism workshops with digital e-commerce marketplaces", "B. Destroying all old kilns and looms", "C. Stopping all production", "D. Forbidding visitors from entering"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'combining eco-tourism workshops with digital e-commerce marketplaces.'"},
    {"id": "u1-r6", "question": "What hands-on activities can tourists experience when visiting craft villages?", "options": ["A. Shaping wet clay on wheels and weaving silk on traditional looms", "B. Driving steam locomotives", "C. Building skyscrapers", "D. Mining coal underground"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'shape wet clay on spinning wheels, weave silk patterns on traditional looms.'"},
    {"id": "u1-r7", "question": "Which word in paragraph 1 is closest in meaning to 'encapsulates'?", "options": ["A. Embodies, represents, or contains completely", "B. Destroys and breaks", "C. Forgets easily", "D. Dislikes strongly"], "correctAnswerIndex": 0, "explanation": "'Encapsulates' có nghĩa là đúc kết, cô đọng trọn vẹn giá trị tinh hoa."},
    {"id": "u1-r8", "question": "Which word in paragraph 3 is closest in meaning to 'revitalize'?", "options": ["A. Breathe new life into, restore, or regenerate", "B. Sell off", "C. Close down permanently", "D. Paint in black"], "correctAnswerIndex": 0, "explanation": "'Revitalize' có nghĩa là hồi sinh, làm bừng sáng sức sống mới."},
    {"id": "u1-r9", "question": "How do craft villages adapt to the modern global era?", "options": ["A. Through community solidarity, cultural pride, and creative modernization", "B. By copying foreign goods entirely", "C. By refusing all technology", "D. By closing their doors to everyone"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'Through community solidarity and cultural pride, Viet Nam's traditional craft villages are adapting successfully.'"},
    {"id": "u1-r10", "question": "What is the best overall title for this reading passage?", "options": ["A. Preserving Traditional Craft Villages in Contemporary Society", "B. The History of Modern Airplane Engines", "C. How to Construct Concrete Highway Bridges", "D. Deep Ocean Fishing Techniques"], "correctAnswerIndex": 0, "explanation": "Toàn bài đọc làm nổi bật việc gìn giữ và chấn hưng các làng nghề truyền thống trong xã hội hiện đại."}
]

u1_writing_prompts = [
    {
        "id": "u1-w1",
        "title": "Đề 1: Write a paragraph about a traditional craft village you know (60-80 words)",
        "description": "Viết một đoạn văn giới thiệu về một làng nghề truyền thống mà em biết (Bát Tràng, Vạn Phúc, nón Chuông...).",
        "suggestedOutline": [
            "Introduction: Name and location of the craft village.",
            "Body: What products artisans make, how they make them, and why they are famous.",
            "Conclusion: Your thoughts on the importance of preserving this village."
        ],
        "usefulPhrases": [
            "Bat Trang is a celebrated pottery village located on the outskirts of Hanoi...",
            "For centuries, skilled artisans have crafted delicate ceramic teapots and vases...",
            "Tourists can try molding clay on spinning wheels and paint their own souvenirs...",
            "Preserving this traditional craft connects us deeply with our ancestors' wisdom."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Bat Trang is a celebrated traditional pottery village located on the outskirts of Hanoi. For more than seven centuries, master artisans have molded exquisite ceramic teapots, decorative bowls, and vases entirely by hand. Visitors can experience shaping wet clay on spinning wheels and painting colorful glazes on their own pottery souvenirs. Preserving this vibrant craft village keeps our ancestors' artistic heritage alive and attracts international tourists to Vietnam."
    },
    {
        "id": "u1-w2",
        "title": "Đề 2: Write a paragraph about a community helper you appreciate (60-80 words)",
        "description": "Viết một đoạn văn bày tỏ lòng biết ơn đối với một người phục vụ cộng đồng (bác sĩ, công an, lính cứu hỏa, công nhân vệ sinh...).",
        "suggestedOutline": [
            "Introduction: Identify the community helper (e.g., local garbage collectors or firefighters).",
            "Body: Describe their daily hard work and how they keep the neighborhood safe/clean.",
            "Conclusion: Express your sincere appreciation for their contributions."
        ],
        "usefulPhrases": [
            "Among many dedicated community helpers, I admire local garbage collectors the most...",
            "Every day before dawn, they tirelessly sweep communal streets and collect refuse...",
            "Thanks to their silent dedication, our residential neighborhood remains clean and sanitary...",
            "We should show our gratitude by sorting household waste properly."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Among many dedicated community helpers, I admire our local garbage collectors the most. Every morning before dawn, they work tirelessly in all weather conditions to sweep communal streets and collect household rubbish. Thanks to their silent dedication, our residential neighborhood remains clean, pleasant, and sanitary. We should express our sincere gratitude by properly sorting our recyclable waste and keeping our sidewalks free of litter."
    },
    {
        "id": "u1-w3",
        "title": "Đề 3: Write a paragraph on how young people can help their neighborhood (60-80 words)",
        "description": "Viết một đoạn văn nêu những việc cụ thể mà thanh thiếu niên có thể làm để giúp đỡ cộng đồng khu dân cư của mình.",
        "suggestedOutline": [
            "Introduction: State that teenagers can make meaningful contributions to their neighborhood.",
            "Body: Give 2-3 specific actions (joining cleanup drives, helping elderly neighbors, tutoring younger kids).",
            "Conclusion: Emphasize that small actions build strong community solidarity."
        ],
        "usefulPhrases": [
            "Young people can take many practical actions to improve their local neighborhood...",
            "First, we can participate actively in weekend environmental clean-up campaigns...",
            "Second, we can assist elderly neighbors with grocery shopping or household chores...",
            "These meaningful community deeds foster warmth, empathy, and neighborhood solidarity."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Young people can take many practical actions to enhance their local community. First, we can actively join weekend green cleanups to collect plastic rubbish and plant flowers in neighborhood parks. Second, we can look after elderly residents by helping them with heavy grocery shopping or small domestic chores. Finally, organizing free tutoring classes for younger children strengthens neighborhood solidarity and spreads warmth and empathy throughout our residential area."
    },
    {
        "id": "u1-w4",
        "title": "Đề 4: Write a paragraph describing a memorable visit to a local market (60-80 words)",
        "description": "Viết một đoạn văn miêu tả chuyến đi chợ quê hoặc chợ truyền thống đầy ắp kỷ niệm với người thân.",
        "suggestedOutline": [
            "Introduction: When and where you visited the local market.",
            "Body: Describe the lively atmosphere, colorful stalls (fresh fruits, handmade crafts, street food), and friendly vendors.",
            "Conclusion: Express why you love the warmth of traditional markets."
        ],
        "usefulPhrases": [
            "Last Sunday, I accompanied my grandmother to our vibrant village morning market...",
            "The market was bustling with colorful stalls selling tropical fruits and traditional delicacies...",
            "Friendly vendors greeted everyone with warm smiles and lively conversation...",
            "Visiting the local market gave me a deep appreciation for our friendly communal lifestyle."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Last Sunday morning, I accompanied my grandmother to our bustling rural market. The open-air stalls were filled with fresh herbs, colorful tropical fruits, and steaming bowls of traditional noodle soup. Friendly local vendors greeted familiar neighbors with cheerful smiles and exchanged lively stories. The vibrant sounds, enticing aromas, and communal warmth made my visit truly unforgettable, reminding me of the unique beauty of Vietnamese village life."
    },
    {
        "id": "u1-w5",
        "title": "Đề 5: Write a paragraph giving suggestions on how to reduce plastic waste in your community (60-80 words)",
        "description": "Viết một đoạn văn đề xuất các giải pháp giúp cộng đồng địa phương giảm thiểu rác thải nhựa.",
        "suggestedOutline": [
            "Introduction: State that reducing plastic waste is vital for our neighborhood environment.",
            "Body: Suggest practical steps (using reusable cloth bags, banning single-use straws, placing sorting bins).",
            "Conclusion: Reiterate that collective effort creates a green, healthy neighborhood."
        ],
        "usefulPhrases": [
            "Reducing plastic waste in our neighborhood requires collective effort from every household...",
            "First, residents should bring reusable cloth tote bags when shopping at local markets...",
            "Second, local food stalls should replace single-use plastic straws with bamboo alternatives...",
            "Together, these proactive habits will make our community greener and cleaner."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Reducing plastic waste in our neighborhood requires proactive cooperation from every family. First, residents should carry reusable cloth bags when grocery shopping instead of taking single-use plastic bags. Second, local beverage stalls should switch to biodegradable paper straws or reusable bamboo cups. Finally, installing separate recycling bins in public parks encourages proper waste sorting. By taking these small consistent steps, we can protect our communal environment and ensure a clean future."
    }
]

unit1 = make_unit(1, "Unit 1: Local Community", "Cộng đồng địa phương & Nghề thủ công truyền thống", "Khám phá các làng nghề truyền thống, người phục vụ cộng đồng, cụm động từ (Phrasal Verbs) và cấu trúc Wh-word + To-V.", "Ngữ âm: Nhấn trọng âm các cụm động từ và ngữ điệu câu hỏi Wh-word", "Users", u1_vocab, u1_grammar_info, u1_grammar_exs, u1_listening_info, u1_listening_qs, u1_listening_fibs, u1_speaking, u1_reading_info, u1_reading_qs, u1_writing_prompts)
write_ts_unit(1, unit1)
print("Unit 1 generated successfully!")

# ==============================================================================
# UNIT 2: CITY LIFE (20 Vocab, 20 Grammar, 8 Listening MC + 4 FIB, 20 Speaking, 10 Reading, 5 Writing)
# ==============================================================================
u2_vocab = [
    {"id": "u2-v1", "word": "metropolis", "phonetic": "/məˈtrɒpəlɪs/", "partOfSpeech": "noun", "vietnameseMeaning": "đại đô thị, thành phố lớn sầm uất", "englishExample": "Tokyo is a bustling metropolis that never sleeps.", "vietnameseExample": "Tokyo là một đại đô thị sầm uất không bao giờ ngủ."},
    {"id": "u2-v2", "word": "bustling", "phonetic": "/ˈbʌslɪŋ/", "partOfSpeech": "adjective", "vietnameseMeaning": "nhộn nhịp, hối hả, đông đúc", "englishExample": "The bustling night markets in District 1 attract thousands of visitors every evening.", "vietnameseExample": "Những khu chợ đêm nhộn nhịp ở Quận 1 thu hút hàng ngàn du khách mỗi tối."},
    {"id": "u2-v3", "word": "traffic congestion", "phonetic": "/ˈtræfɪk kənˈʤɛsʧən/", "partOfSpeech": "noun", "vietnameseMeaning": "tắc nghẽn giao thông, kẹt xe", "englishExample": "Upgrading urban metro lines helps ease severe traffic congestion during rush hours.", "vietnameseExample": "Nâng cấp các tuyến tàu điện ngầm đô thị giúp giảm thiểu tình trạng kẹt xe nghiêm trọng trong giờ cao điểm."},
    {"id": "u2-v4", "word": "public transport", "phonetic": "/ˈpʌblɪk ˈtrænspɔːt/", "partOfSpeech": "noun", "vietnameseMeaning": "phương tiện giao thông công cộng", "englishExample": "Traveling by public transport reduces both carbon emissions and travel expenses.", "vietnameseExample": "Đi lại bằng phương tiện công cộng giúp giảm cả lượng khí thải carbon lẫn chi phí đi lại."},
    {"id": "u2-v5", "word": "amenity", "phonetic": "/əˈmiːnɪti/", "partOfSpeech": "noun", "vietnameseMeaning": "tiện ích sinh hoạt (công viên, hồ bơi, siêu thị, bệnh viện)", "englishExample": "Modern residential compounds offer upscale amenities such as heated pools and fitness centers.", "vietnameseExample": "Các khu chung cư hiện đại cung cấp các tiện ích cao cấp như hồ bơi nước nóng và phòng tập thể hình."},
    {"id": "u2-v6", "word": "skyscrapers", "phonetic": "/ˈskaɪˌskreɪpəz/", "partOfSpeech": "noun", "vietnameseMeaning": "các tòa nhà chọc trời", "englishExample": "Gleaming glass skyscrapers dominate the modern skyline of Da Nang.", "vietnameseExample": "Những tòa nhà chọc trời ốp kính lấp lánh thống trị đường chân trời hiện đại của Đà Nẵng."},
    {"id": "u2-v7", "word": "rush hour", "phonetic": "/rʌʃ ˈaʊə/", "partOfSpeech": "noun", "vietnameseMeaning": "giờ cao điểm", "englishExample": "Commuters should avoid major bridges during the evening rush hour.", "vietnameseExample": "Người đi làm nên tránh qua các cây cầu chính vào giờ cao điểm buổi tối."},
    {"id": "u2-v8", "word": "cosmopolitan", "phonetic": "/ˌkɒzməˈpɒlɪtən/", "partOfSpeech": "adjective", "vietnameseMeaning": "thuộc về thế giới, quốc tế, đa văn hóa", "englishExample": "Ho Chi Minh City has a vibrant cosmopolitan atmosphere with residents from all continents.", "vietnameseExample": "Thành phố Hồ Chí Minh mang bầu không khí quốc tế đa văn hóa sôi động với cư dân đến từ khắp các châu lục."},
    {"id": "u2-v9", "word": "exhaust fumes", "phonetic": "/ɪɡˈzɔːst fjuːmz/", "partOfSpeech": "noun", "vietnameseMeaning": "khí thải độc hại từ động cơ xe cộ", "englishExample": "Switching to electric buses eliminates harmful exhaust fumes from crowded streets.", "vietnameseExample": "Chuyển sang xe buýt điện loại bỏ khí thải độc hại khỏi những con phố đông đúc."},
    {"id": "u2-v10", "word": "urban sprawl", "phonetic": "/ˈɜːbən sprɔːl/", "partOfSpeech": "noun", "vietnameseMeaning": "sự mở rộng đô thị không quy hoạch", "englishExample": "Urban sprawl transforms peaceful green rural landscapes into endless concrete suburbs.", "vietnameseExample": "Sự mở rộng đô thị không quy hoạch biến những vùng quê xanh thanh bình thành các khu ngoại ô bê tông bạt ngàn."},
    {"id": "u2-v11", "word": "pavement", "phonetic": "/ˈpeɪvmənt/", "partOfSpeech": "noun", "vietnameseMeaning": "vỉa hè, lề đường dành cho người đi bộ", "englishExample": "Pedestrians enjoy strolling along spacious pavements decorated with flowering trees.", "vietnameseExample": "Người đi bộ thích thú dạo bước trên những vỉa hè rộng rãi được trang trí bởi những hàng cây trổ hoa."},
    {"id": "u2-v12", "word": "overcrowded", "phonetic": "/ˌəʊvəˈkraʊdɪd/", "partOfSpeech": "adjective", "vietnameseMeaning": "quá đông đúc, quá tải dân số", "englishExample": "Hospitals and public schools can become overcrowded in rapidly expanding urban wards.", "vietnameseExample": "Bệnh viện và trường công có thể trở nên quá tải tại những phường đô thị đang mở rộng nhanh chóng."},
    {"id": "u2-v13", "word": "convenience", "phonetic": "/kənˈviːniəns/", "partOfSpeech": "noun", "vietnameseMeaning": "sự tiện lợi, thuận tiện", "englishExample": "Living downtown provides unmatched convenience with 24-hour supermarkets on every corner.", "vietnameseExample": "Sống ở trung tâm thành phố mang lại sự tiện lợi vô song với các siêu thị 24 giờ ở mọi góc phố."},
    {"id": "u2-v14", "word": "cost of living", "phonetic": "/kɒst ɒv ˈlɪvɪŋ/", "partOfSpeech": "noun", "vietnameseMeaning": "chi phí sinh hoạt", "englishExample": "Although job salaries are higher in cities, the average cost of living is also significantly steeper.", "vietnameseExample": "Mặc dù lương việc làm ở thành phố cao hơn, chi phí sinh hoạt trung bình cũng đắt đỏ hơn đáng kể."},
    {"id": "u2-v15", "word": "green space", "phonetic": "/ɡriːn speɪs/", "partOfSpeech": "noun", "vietnameseMeaning": "không gian xanh (công viên, vườn hoa)", "englishExample": "Urban planners are designing expansive green spaces to improve metropolitan air quality.", "vietnameseExample": "Các nhà quy hoạch đô thị đang thiết kế những không gian xanh rộng lớn để cải thiện chất lượng không khí đại đô thị."},
    {"id": "u2-v16", "word": "pedestrian", "phonetic": "/pɪˈdɛstrɪən/", "partOfSpeech": "noun", "vietnameseMeaning": "người đi bộ trên đường", "englishExample": "The new weekend pedestrian zone around the lake provides a safe haven for strollers and artists.", "vietnameseExample": "Phố đi bộ cuối tuần mới quanh hồ tạo nên một không gian an toàn cho người dạo mát và các nghệ sĩ."},
    {"id": "u2-v17", "word": "noise pollution", "phonetic": "/nɔɪz pəˈluːʃən/", "partOfSpeech": "noun", "vietnameseMeaning": "ô nhiễm tiếng ồn", "englishExample": "Double-glazed acoustic windows insulate city apartments against intrusive street noise pollution.", "vietnameseExample": "Cửa sổ kính hai lớp cách âm bảo vệ các căn hộ thành phố khỏi sự ô nhiễm tiếng ồn đường phố khó chịu."},
    {"id": "u2-v18", "word": "commuter", "phonetic": "/kəˈmjuːtə/", "partOfSpeech": "noun", "vietnameseMeaning": "người đi làm xa bằng phương tiện giao thông mỗi ngày", "englishExample": "Thousands of commuters board the elevated metro train every morning to reach office towers.", "vietnameseExample": "Hàng ngàn người đi làm bước lên tàu điện trên cao mỗi sáng để đến các tòa tháp văn phòng."},
    {"id": "u2-v19", "word": "high-rise", "phonetic": "/ˈhaɪraɪz/", "partOfSpeech": "adjective", "vietnameseMeaning": "cao tầng, nhiều tầng", "englishExample": "Modern high-rise residential complexes feature rooftop gardens and solar panels.", "vietnameseExample": "Các khu phức hợp chung cư cao tầng hiện đại có vườn trên mái và tấm pin năng lượng mặt trời."},
    {"id": "u2-v20", "word": "liveable", "phonetic": "/ˈlɪvəbl/", "partOfSpeech": "adjective", "vietnameseMeaning": "đáng sống, có chất lượng sống tốt", "englishExample": "Da Nang is consistently ranked among the most liveable cities in Southeast Asia.", "vietnameseExample": "Đà Nẵng liên tục được xếp vào nhóm những thành phố đáng sống nhất khu vực Đông Nam Á."}
]

u2_grammar_info = {
    "title": "So Sánh Kép (Double Comparatives) & So Sánh Hơn Của Tính Từ/Trạng Từ (Comparatives of Adjectives & Adverbs)",
    "summary": "Nắm vững cấu trúc so sánh kép 'The more... the more...' (Càng... thì càng...) và so sánh hơn của tính từ, trạng từ ngắn/dài trong miêu tả nhịp sống thành thị.",
    "formulaBox": [
        "So sánh kép 1: The + comparative + S + V, the + comparative + S + V (Càng... thì càng...)",
        "Ví dụ: The BIGGER the city is, the MORE EXPENSIVE the cost of living becomes.",
        "So sánh kép 2: Comparative and Comparative (Ngày càng...)",
        "Ví dụ: Traffic in big cities is becoming HEAVIER AND HEAVIER.",
        "So sánh hơn ngắn: S + V + adj/adv-er + than...",
        "So sánh hơn dài: S + V + more + adj/adv + than..."
    ],
    "usagePoints": [
        {"title": "1. Diễn tả hai hành động hoặc trạng thái tỉ lệ thuận/nghịch", "detail": "Sử dụng 'The + so sánh hơn..., the + so sánh hơn...' để miêu tả sự biến đổi cùng chiều hoặc ngược chiều.", "example": "The closer you live to the center, the more convenient your life is."},
        {"title": "2. Diễn tả sự biến đổi liên tục", "detail": "Sử dụng cấu trúc 'adj-er and adj-er' hoặc 'more and more + adj' để nhấn mạnh mức độ gia tăng.", "example": "Hanoi is becoming more and more cosmopolitan every year."}
    ]
}

u2_grammar_exs = [
    {"id": "u2-g1", "question": "The _____ the city becomes, the more congested the streets are.", "options": ["A. crowded", "B. more crowded", "C. most crowded", "D. as crowded"], "correctAnswer": "B. more crowded", "explanation": "Cấu trúc so sánh kép: The + comparative (more crowded)..., the more congested..."},
    {"id": "u2-g2", "question": "The closer you live to the city center, _____ the house rental prices become.", "options": ["A. the higher", "B. highest", "C. higher", "D. the highest"], "correctAnswer": "A. the higher", "explanation": "Cấu trúc so sánh kép: The closer..., the higher..."},
    {"id": "u2-g3", "question": "Public transport in Da Nang is becoming _____ efficient than in the past.", "options": ["A. more and more", "B. much more", "C. more as", "D. as more"], "correctAnswer": "B. much more", "explanation": "'much more efficient than' = hiệu quả hơn nhiều so với trước kia."},
    {"id": "u2-g4", "question": "The earlier you leave for work in the morning, _____ traffic you will encounter.", "options": ["A. the less", "B. the fewer", "C. the little", "D. the least"], "correctAnswer": "A. the less", "explanation": "'traffic' là danh từ không đếm được -> 'the less traffic'."},
    {"id": "u2-g5", "question": "As urbanization progresses, living costs are getting _____ expensive every year.", "options": ["A. more and more", "B. most and most", "C. much and much", "D. heavier and heavier"], "correctAnswer": "A. more and more", "explanation": "'more and more expensive' = ngày càng đắt đỏ hơn."},
    {"id": "u2-g6", "question": "The more green spaces a city builds, _____ the citizens' quality of life is.", "options": ["A. the better", "B. the good", "C. the best", "D. better"], "correctAnswer": "A. the better", "explanation": "So sánh kép với 'good' -> 'the better'."},
    {"id": "u2-g7", "question": "Subway trains travel _____ than street buses during rush hours.", "options": ["A. faster", "B. more fast", "C. fastly", "D. fastest"], "correctAnswer": "A. faster", "explanation": "'fast' là trạng từ ngắn -> 'faster than'."},
    {"id": "u2-g8", "question": "The _____ you practice conversational English, the more fluently you speak.", "options": ["A. often", "B. more often", "C. most often", "D. as often"], "correctAnswer": "B. more often", "explanation": "'The more often you practice..., the more fluently...'"},
    {"id": "u2-g9", "question": "Air pollution in this industrial zone is getting _____ and worse.", "options": ["A. bad", "B. worse", "C. worst", "D. badly"], "correctAnswer": "B. worse", "explanation": "'worse and worse' = ngày càng tồi tệ hơn."},
    {"id": "u2-g10", "question": "The modern electric bus operates much _____ than the old diesel vehicle.", "options": ["A. more quietly", "B. quietlier", "C. most quiet", "D. as quiet"], "correctAnswer": "A. more quietly", "explanation": "Trạng từ 'quietly' so sánh hơn là 'more quietly'."},
    {"id": "u2-g11", "question": "The more amenities an apartment building provides, _____ the monthly maintenance fee.", "options": ["A. the higher", "B. the highest", "C. high", "D. higher"], "correctAnswer": "A. the higher", "explanation": "Cấu trúc The + comparative..., the higher..."},
    {"id": "u2-g12", "question": "Skyscrapers in our commercial district are built taller and _____ every decade.", "options": ["A. taller", "B. tallest", "C. more tall", "D. most tall"], "correctAnswer": "A. taller", "explanation": "'taller and taller' = ngày càng cao hơn."},
    {"id": "u2-g13", "question": "The more electric vehicles people use, _____ exhaust fumes are emitted into the atmosphere.", "options": ["A. the fewer", "B. the less", "C. the least", "D. the few"], "correctAnswer": "A. the fewer", "explanation": "'exhaust fumes' là danh từ số nhiều đếm được -> 'the fewer'."},
    {"id": "u2-g14", "question": "Life in a bustling metropolis is significantly _____ stressful than in a peaceful countryside village.", "options": ["A. more", "B. most", "C. as", "D. much"], "correctAnswer": "A. more", "explanation": "'significantly more stressful than' = căng thẳng hơn đáng kể."},
    {"id": "u2-g15", "question": "The _____ trees we plant along pedestrian sidewalks, the cooler our city feels.", "options": ["A. more", "B. most", "C. much", "D. many"], "correctAnswer": "A. more", "explanation": "'The more trees..., the cooler...'"},
    {"id": "u2-g16", "question": "Living in a modern high-rise condo is _____ comfortable than residing in a damp basement.", "options": ["A. far more", "B. far most", "C. more far", "D. as far"], "correctAnswer": "A. far more", "explanation": "'far more comfortable than' dùng 'far' để bổ nghĩa tăng cấp độ so sánh hơn."},
    {"id": "u2-g17", "question": "The heavier the rain falls, _____ traffic moves on narrow city overpasses.", "options": ["A. the more slowly", "B. the slowlier", "C. the slowest", "D. slowlier"], "correctAnswer": "A. the more slowly", "explanation": "'The more slowly traffic moves' (trạng từ slowly)."},
    {"id": "u2-g18", "question": "City youth are becoming _____ aware of recycling and environmental protection.", "options": ["A. increasingly", "B. more and more", "C. much and much", "D. as and as"], "correctAnswer": "B. more and more", "explanation": "'more and more aware' = ngày càng có nhận thức cao hơn."},
    {"id": "u2-g19", "question": "The _____ you plan your travel route, the less time you waste stuck in traffic jams.", "options": ["A. better", "B. good", "C. best", "D. well"], "correctAnswer": "A. better", "explanation": "'The better you plan...' (so sánh hơn của well)."},
    {"id": "u2-g20", "question": "Is living downtown really _____ peaceful than living in suburban districts?", "options": ["A. less", "B. least", "C. little", "D. lesser"], "correctAnswer": "A. less", "explanation": "'less peaceful than' = kém yên bình hơn so với ngoại ô."}
]

u2_listening_info = {
    "audioTitle": "Cuộc Sống Ở Đại Đô Thị Hiện Đại (Life in a Modern Metropolis)",
    "audioDuration": "3:10",
    "audioScriptSpeaker": "Urban Planner Laura & Student Phong",
    "transcriptText": "Phong: Hello Laura! What makes living in a bustling metropolis exciting for young people?\nLaura: Hi Phong! Cities offer incredible conveniences: international universities, world-class entertainment centers, and diverse culinary cuisines. The public transport system, like our modern elevated metro, connects commuters everywhere in minutes.\nPhong: But aren't there major disadvantages like traffic congestion and noise pollution?\nLaura: Indeed! The denser the urban population grows, the heavier the traffic congestion becomes during rush hours. That is why green cities are expanding pedestrian zones, planting thousands of shade trees, and promoting electric bicycles.\nPhong: How can city dwellers maintain a healthy lifestyle amidst busy routines?\nLaura: Take advantage of neighborhood parks for morning jogs, choose fresh produce from farmers' markets, and unplug from digital screens on weekends!",
    "vietnameseTranslation": "Phong: Chào cô Laura! Điều gì khiến cuộc sống ở một đại đô thị sầm uất trở nên hào hứng đối với giới trẻ vậy ạ?\nLaura: Chào Phong! Các thành phố mang lại những tiện ích tuyệt vời: các trường đại học quốc tế, trung tâm giải trí đẳng cấp thế giới và ẩm thực đa dạng. Hệ thống giao thông công cộng, như tuyến tàu điện trên cao hiện đại của chúng ta, kết nối người đi làm đến mọi nơi chỉ trong vài phút.\nPhong: Nhưng thành phố có những bất lợi lớn như tắc đường và ô nhiễm tiếng ồn không ạ?\nLaura: Đúng vậy! Mật độ dân số đô thị càng đông đúc, tình trạng kẹt xe càng trở nên trầm trọng trong giờ cao điểm. Đó là lý do các thành phố xanh đang mở rộng các tuyến phố đi bộ, trồng hàng ngàn cây xanh bóng mát và khuyến khích xe đạp điện.\nPhong: Cư dân thành phố có thể làm gì để duy trì lối sống lành mạnh giữa nhịp sống bận rộn ạ?\nLaura: Hãy tận dụng các công viên khu dân cư để chạy bộ buổi sáng, chọn thực phẩm tươi sạch từ các phiên chợ nông sản và tắt các màn hình điện tử vào cuối tuần!"
}

u2_listening_qs = [
    {"id": "u2-l1", "question": "What advantages of living in a metropolis does Laura mention?", "options": ["A. International universities, entertainment centers, and public transport", "B. Only cow pastures", "C. Zero internet access", "D. No electricity"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'international universities, world-class entertainment centers, and diverse culinary cuisines.'"},
    {"id": "u2-l2", "question": "How does the elevated metro benefit commuters according to Laura?", "options": ["A. It connects commuters everywhere in minutes", "B. It causes more traffic jams", "C. It is only open at midnight", "D. It is pulled by horses"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'connects commuters everywhere in minutes.'"},
    {"id": "u2-l3", "question": "What happens as the urban population becomes denser?", "options": ["A. Traffic congestion becomes heavier during rush hours", "B. The city turns into a forest", "C. All cars disappear", "D. School ends permanently"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'The denser the urban population grows, the heavier the traffic congestion becomes.'"},
    {"id": "u2-l4", "question": "What are green cities doing to solve urban environmental issues?", "options": ["A. Expanding pedestrian zones, planting shade trees, and promoting electric bikes", "B. Cutting down all trees", "C. Banning all walking", "D. Building more coal plants"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'expanding pedestrian zones, planting thousands of shade trees, and promoting electric bicycles.'"},
    {"id": "u2-l5", "question": "How can city dwellers maintain a healthy lifestyle?", "options": ["A. Jogging in parks, buying fresh produce, and unplugging from screens", "B. Eating fast food for every meal", "C. Staying indoors 24 hours a day", "D. Never exercising"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'Take advantage of neighborhood parks for morning jogs... unplug from digital screens.'"},
    {"id": "u2-l6", "question": "What time of day is traffic congestion typically at its worst?", "options": ["A. During rush hours", "B. At 3 a.m.", "C. On New Year's night only", "D. Never"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'during rush hours.'"},
    {"id": "u2-l7", "question": "What vehicle does Laura specifically praise for eco-friendly mobility?", "options": ["A. Electric bicycles and elevated metro trains", "B. Heavy diesel trucks", "C. Jet planes on streets", "D. Old motorcycles"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'modern elevated metro... promoting electric bicycles.'"},
    {"id": "u2-l8", "question": "What is the key takeaway about modern city development from Laura?", "options": ["A. Modern cities must balance convenience with green sustainability and wellness", "B. Cities should be abandoned completely", "C. Everyone should work without sleeping", "D. Parks are unnecessary"], "correctAnswerIndex": 0, "explanation": "Laura nhấn mạnh sự phát triển đô thị cần hài hòa giữa tiện ích và không gian xanh sống lành mạnh."}
]

u2_listening_fibs = [
    {"id": "u2-f1", "sentenceWithBlank": "Public transport like the elevated _____ connects commuters quickly.", "correctWord": "metro", "hint": "Tàu điện ngầm / trên cao (metro)"},
    {"id": "u2-f2", "sentenceWithBlank": "The denser the population, the heavier the _____ during rush hours.", "correctWord": "congestion", "hint": "Sự tắc nghẽn (congestion)"},
    {"id": "u2-f3", "sentenceWithBlank": "Green cities expand _____ zones for people to walk safely.", "correctWord": "pedestrian", "hint": "Dành cho người đi bộ (pedestrian)"},
    {"id": "u2-f4", "sentenceWithBlank": "Residents should jog in neighborhood _____ to stay healthy.", "correctWord": "parks", "hint": "Công viên cây xanh (parks)"}
]

u2_speaking = [
    {"id": f"u2-s{i+1}", "targetSentence": s, "ipa": ipa, "vietnameseMeaning": vm, "contextSituation": ctx, "keyPhonicsFocus": kpf, "sampleAudioText": s}
    for i, (s, ipa, vm, ctx, kpf) in enumerate([
        ("The bigger and more modern a metropolis becomes, the faster its daily rhythm moves.", "/ðə ˈbɪɡər ænd mɔː ˈmɒdən ə məˈtrɒpəlɪs bɪˈkʌmz ðə ˈfɑːstər ɪts ˈdeɪli ˈrɪðəm muːvz/", "Một đại đô thị càng lớn và hiện đại thì nhịp sống hàng ngày của nó càng chuyển động nhanh hơn.", "Nói về nhịp sống đô thị hiện đại.", "Phát âm chuẩn 'metropolis' /məˈtrɒpəlɪs/ và 'rhythm' /ˈrɪðəm/."),
        ("Using public transport like electric buses significantly cuts down harmful vehicle emissions.", "/ˈjuːzɪŋ ˈpʌblɪk ˈtrænspɔːt laɪk ɪˈlɛktrɪk ˈbʌsɪz sɪɡˈnɪfɪkəntli kʌts daʊn ˈhɑːmfʊl ˈviːɪkl ɪˈmɪʃənz/", "Sử dụng phương tiện công cộng như xe buýt điện giảm đáng kể lượng khí thải độc hại từ xe cộ.", "Thuyết trình về bảo vệ không khí đô thị.", "Phát âm chuẩn từ 'significantly' và 'emissions' /ɪˈmɪʃənz/."),
        ("The closer your apartment is to the metro station, the more convenient your daily commute is.", "/ðə ˈkləʊsə jɔːr əˈpɑːtmənt ɪz tuː ðə ˈmɛtrəʊ ˈsteɪʃən ðə mɔː kənˈviːniənt jɔː ˈdeɪli kəˈmjuːt ɪz/", "Căn hộ của bạn càng gần ga tàu điện ngầm thì việc đi làm hàng ngày của bạn càng thuận tiện hơn.", "Khuyên chọn nơi ở gần phương tiện công cộng.", "Phát âm chuẩn cấu trúc so sánh kép 'The closer..., the more convenient...'."),
        ("Gleaming glass skyscrapers and luxury shopping malls dominate our vibrant city skyline.", "/ˈɡliːmɪŋ ɡlɑːs ˈskaɪˌskreɪpəz ænd ˈlʌkʃəri ˈʃɒpɪŋ mɔːlz ˈdɒmɪneɪt ˈaʊə ˈvaɪbrənt ˈsɪti ˈskaɪlaɪn/", "Những tòa nhà chọc trời bằng kính lấp lánh và các trung tâm thương mại xa hoa thống trị đường chân trời sôi động của thành phố chúng ta.", "Miêu tả cảnh quan thành phố.", "Phát âm chuẩn từ 'skyscrapers' /ˈskaɪˌskreɪpəz/."),
        ("During evening rush hours, major bridges and crossroads often suffer from severe traffic congestion.", "/ˈdjʊərɪŋ ˈiːvnɪŋ rʌʃ ˈaʊəz ˈmeɪʤə ˈbrɪʤɪz ænd ˈkrɒsˌrəʊdz ˈɒfən ˈsʌfə frɒm sɪˈvɪə ˈtræfɪk kənˈʤɛsʧən/", "Vào giờ cao điểm buổi tối, các cây cầu và ngã tư chính thường phải hứng chịu tình trạng ùn tắc giao thông nghiêm trọng.", "Cảnh báo giờ kẹt xe.", "Phát âm chuẩn 'congestion' /kənˈʤɛsʧən/ và 'severe' /sɪˈvɪə/."),
        ("Urban planners are creating more expansive green parks to improve citizens' mental and physical health.", "/ˈɜːbən ˈplænəz ɑː kriːˈeɪtɪŋ mɔːr ɪksˈpænsɪv ɡriːn pɑːks tuː ɪmˈpruːv ˈsɪtɪznz ˈmɛntl ænd ˈfɪzɪkəl hɛlθ/", "Các nhà quy hoạch đô thị đang tạo thêm nhiều công viên cây xanh rộng lớn để nâng cao sức khỏe thể chất và tinh thần của người dân.", "Nói về giải pháp quy hoạch thành phố.", "Phát âm chuẩn 'expansive' /ɪksˈpænsɪv/ và 'citizens' /ˈsɪtɪznz/."),
        ("The more trees we plant along pedestrian sidewalks, the cooler and cleaner the air feels.", "/ðə mɔː triːz wiː plɑːnt əˈlɒŋ pɪˈdɛstrɪən ˈsaɪdwɔːks ðə ˈkuːlər ænd ˈkliːnə ðə eə fiːlz/", "Chúng ta càng trồng nhiều cây xanh dọc vỉa hè dành cho người đi bộ thì không khí càng mát mẻ và trong lành hơn.", "Khuyến khích phủ xanh đường phố.", "Phát âm chuẩn cấu trúc so sánh kép 'The more trees..., the cooler...'."),
        ("Living downtown offers countless cultural amenities but entails a considerably higher cost of living.", "/ˈlɪvɪŋ ˈdaʊntaʊn ˈɒfəz ˈkaʊntlɪs ˈkʌlʧərəl əˈmiːnɪtiz bʌt ɪnˈteɪlz ə kənˈsɪdərəbli ˈhaɪə kɒst ɒv ˈlɪvɪŋ/", "Sống ở trung tâm thành phố mang lại vô số tiện ích văn hóa nhưng lại kéo theo chi phí sinh hoạt cao hơn đáng kể.", "So sánh ưu nhược điểm của trung tâm.", "Phát âm chuẩn 'amenities' /əˈmiːnɪtiz/ và 'entails' /ɪnˈteɪlz/."),
        ("Noise pollution from construction sites and vehicle horns can cause elevated stress levels.", "/nɔɪz pəˈluːʃən frɒm kənˈstrʌkʃən saɪts ænd ˈviːɪkl hɔːnz kæn kɔːz ˈɛlɪveɪtɪd strɛs ˈlɛvlz/", "Ô nhiễm tiếng ồn từ các công trường xây dựng và còi xe có thể gây ra mức độ căng thẳng tăng cao.", "Nói về tác hại của tiếng ồn.", "Phát âm chuẩn từ 'elevated' /ˈɛlɪveɪtɪd/ và 'construction'."),
        ("Modern high-rise residential buildings are equipped with smart security and solar power systems.", "/ˈmɒdən ˈhaɪraɪz ˌrɛzɪˈdɛnʃəl ˈbɪldɪŋz ɑːr ɪˈkwɪpt wɪð smɑːt sɪˈkjʊərɪti ænd ˈsəʊlə ˈpaʊə ˈsɪstɪmz/", "Các tòa nhà chung cư cao tầng hiện đại được trang bị hệ thống an ninh thông minh và năng lượng mặt trời.", "Giới thiệu căn hộ hiện đại.", "Phát âm chuẩn 'equipped' /ɪˈkwɪpt/ và 'residential' /ˌrɛzɪˈdɛnʃəl/."),
        ("The earlier commuters start their morning journey, the less time they spend stuck in road traffic.", "/ði ˈɜːlɪə kəˈmjuːtəz stɑːt ðeə ˈmɔːnɪŋ ˈʤɜːni ðə lɛs taɪm ðeɪ spɛnd stʌk ɪn rəʊd ˈtræfɪk/", "Người đi làm khởi hành buổi sáng càng sớm thì càng mất ít thời gian bị kẹt xe trên đường.", "Mẹo tránh tắc đường.", "Phát âm chuẩn 'commuters' /kəˈmjuːtəz/ và 'journey' /ˈʤɜːni/."),
        ("Pedestrian streets around the central lake provide a vibrant venue for street artists and weekend walkers.", "/pɪˈdɛstrɪən striːts əˈraʊnd ðə ˈsɛntrəl leɪk prəˈvaɪd ə ˈvaɪbrənt ˈvɛnjuː fɔː striːt ˈɑːtɪsts ænd ˈwiːkɛnd ˈwɔːkəz/", "Phố đi bộ quanh hồ trung tâm tạo nên một địa điểm sôi động cho các nghệ sĩ đường phố và người đi dạo cuối tuần.", "Giới thiệu không gian phố đi bộ.", "Phát âm chuẩn 'pedestrian' /pɪˈdɛstrɪən/ và 'venue' /ˈvɛnjuː/."),
        ("Many families choose to relocate to peaceful suburban neighborhoods to escape downtown air pollution.", "/ˈmɛni ˈfæmɪliz ʧuːz tuː ˌriːləʊˈkeɪt tuː ˈpiːsfʊl səˈbɜːbən ˈneɪbəhʊdz tuː ɪsˈkeɪp ˈdaʊntaʊn eə pəˈluːʃən/", "Nhiều gia đình chọn chuyển về những khu ngoại ô thanh bình để tránh xa ô nhiễm không khí ở trung tâm.", "Giải thích xu hướng chuyển dịch ngoại ô.", "Phát âm chuẩn 'relocate' /ˌriːləʊˈkeɪt/ và 'suburban' /səˈbɜːbən/."),
        ("Electric scooters and bicycles offer flexible, emission-free transport for short city trips.", "/ɪˈlɛktrɪk ˈskuːtəz ænd ˈbaɪsɪklz ˈɒfə ˈflɛksəbl ɪˈmɪʃən-friː ˈtrænspɔːt fɔː ʃɔːt ˈsɪti trɪps/", "Xe máy điện và xe đạp mang lại phương tiện linh hoạt, không phát thải cho các chuyến đi ngắn trong thành phố.", "Ủng hộ phương tiện di chuyển xanh.", "Phát âm chuẩn 'emission-free' /ɪˈmɪʃən-friː/."),
        ("The more international tourists visit Da Nang, the more cosmopolitan its cultural atmosphere becomes.", "/ðə mɔːr ˌɪntəˈnæʃənl ˈtʊərɪsts ˈvɪzɪt dɑː næŋ ðə mɔː ˌkɒzməˈpɒlɪtən ɪts ˈkʌlʧərəl ˈætməsfɪə bɪˈkʌmz/", "Càng nhiều du khách quốc tế đến Đà Nẵng thì bầu không khí văn hóa của thành phố càng trở nên đa văn hóa hơn.", "Nhận xét về sự phát triển du lịch Đà Nẵng.", "Phát âm chuẩn 'cosmopolitan' /ˌkɒzməˈpɒlɪtən/."),
        ("Skilled city workers constantly upgrade their professional talents to thrive in competitive job markets.", "/skɪld ˈsɪti ˈwɜːkəz ˈkɒnstəntli ʌpˈɡreɪd ðeə prəˈfɛʃənl ˈtælənts tuː θraɪv ɪn kəmˈpɛtɪtɪv ʤɒb ˈmɑːkɪts/", "Những người lao động thành phố lành nghề liên tục nâng cao tài năng chuyên môn để phát triển trong thị trường việc làm cạnh tranh.", "Nói về tinh thần cầu tiến.", "Phát âm chuẩn 'competitive' /kəmˈpɛtɪtɪv/ và 'thrive' /θraɪv/."),
        ("A truly liveable city balances rapid economic growth with comprehensive environmental stewardship.", "/ə ˈtruːli ˈlɪvəbl ˈsɪti ˈbælənsɪz ˈræpɪd ˌiːkəˈnɒmɪk ɡrəʊθ wɪð ˌkɒmprɪˈhɛnsɪv ɪnˌvaɪərənˈmɛntl ˈstjuːədʃɪp/", "Một thành phố thực sự đáng sống phải cân bằng giữa tăng trưởng kinh tế nhanh chóng với sự gìn giữ môi trường toàn diện.", "Triết lý phát triển đô thị bền vững.", "Phát âm chuẩn 'liveable' /ˈlɪvəbl/ và 'stewardship' /ˈstjuːədʃɪp/."),
        ("Night markets in big cities buzz with savory street food aromas and lively musical performances.", "/naɪt ˈmɑːkɪts ɪn bɪɡ ˈsɪtiz bʌz wɪð ˈseɪvəri striːt fuːd əˈrəʊməz ænd ˈlaɪvli ˈmjuːzɪkəl pəˈfɔːmənsɪz/", "Các khu chợ đêm ở thành phố lớn rộn ràng hương thơm ẩm thực đường phố đậm đà và những màn biểu diễn âm nhạc sôi nổi.", "Miêu tả không khí chợ đêm.", "Phát âm chuẩn 'savory' /ˈseɪvəri/ và 'aromas' /əˈrəʊməz/."),
        ("The more automated and digitalized urban services become, the smoother public transactions are.", "/ðə mɔːr ˈɔːtəmeɪtɪd ænd ˈdɪʤɪtəlaɪzd ˈɜːbən ˈsɜːvɪsɪz bɪˈkʌm ðə ˈsmuːðə ˈpʌblɪk trænˈzækʃənz ɑː/", "Các dịch vụ đô thị càng được tự động hóa và số hóa thì các giao dịch công cộng càng diễn ra suôn sẻ hơn.", "Nói về thành phố thông minh (Smart City).", "Phát âm chuẩn 'digitalized' và 'transactions' /trænˈzækʃənz/."),
        ("May our cherished metropolitan cities grow greener, smarter, and friendlier for every resident.", "/meɪ ˈaʊə ˈʧɛrɪʃt ˌmɛtrəˈpɒlɪtən ˈsɪtiz ɡrəʊ ˈɡriːnə ˈsmɑːtər ænd ˈfrɛndlɪə fɔːr ˈɛvri ˈrɛzɪdənt/", "Chúc các thành phố đại đô thị thân yêu của chúng ta ngày càng xanh hơn, thông minh hơn và thân thiện hơn với mọi cư dân.", "Lời chúc tương lai cho các đô thị.", "Phát âm chuẩn 'cherished' /ˈʧɛrɪʃt/ và 'metropolitan' /ˌmɛtrəˈpɒlɪtən/.")
    ])
]

u2_reading_info = {
    "title": "Chuyển Đổi Đô Thị Xanh: Tương Lai Của Các Thành Phố Đáng Sống",
    "topic": "Đời sống đô thị hiện đại, giao thông xanh và quy hoạch thành phố tương lai",
    "passageText": "Over the past several decades, rapid urbanization has dramatically reshaped the global landscape. Millions of people have migrated to metropolitan centers drawn by superior educational institutions, vibrant career opportunities, and world-class healthcare amenities. Megacities such as Tokyo, London, Singapore, and Ho Chi Minh City have expanded into powerhouse engines of economic innovation and cross-cultural exchange.\n\nNevertheless, uncontrolled urban sprawl introduces severe environmental and social pressures. Skyrocketing population density generates relentless traffic congestion, elevated noise pollution, and harmful exhaust emissions that degrade air quality. Furthermore, skyrocketing real estate costs make affordable housing scarce for young professionals and families, while concrete surfaces exacerbate urban heat island effects during sweltering summers.\n\nTo overcome these formidable hurdles, pioneering urban planners are championing the concept of 'Smart Green Cities'. These futuristic metropolises prioritize transit-oriented development, replacing gas-guzzling vehicles with elevated electric rail networks and bike-share programs. Extensive rooftop gardens, vertical forests on skyscrapers, and expansive pedestrian precincts reduce ambient temperatures and restore natural biodiversity. By merging clean digital technologies with human-centered urban design, modern cities can ensure a healthy, sustainable, and prosperous life for all citizens.",
    "keyVocabularyHighlights": [
        {"word": "transit-oriented development", "meaning": "mô hình phát triển đô thị định hướng giao thông công cộng"},
        {"word": "urban heat island effect", "meaning": "hiệu ứng đảo nhiệt đô thị (làm thành phố nóng hơn nông thôn)"},
        {"word": "gas-guzzling vehicles", "meaning": "các loại xe ngốn nhiều xăng dầu"},
        {"word": "pedestrian precincts", "meaning": "các khu vực dành riêng cho người đi bộ"}
    ]
}

u2_reading_qs = [
    {"id": "u2-r1", "question": "Why have millions of people migrated to metropolitan centers according to paragraph 1?", "options": ["A. Drawn by superior education, career opportunities, and healthcare amenities", "B. To avoid all electricity and internet", "C. To live in dense jungle caves", "D. To stop working permanently"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 1: 'drawn by superior educational institutions, vibrant career opportunities, and world-class healthcare amenities.'"},
    {"id": "u2-r2", "question": "Which megacities are mentioned as powerhouse engines of innovation?", "options": ["A. Tokyo, London, Singapore, and Ho Chi Minh City", "B. Desert oasis camps only", "C. Submerged deep-sea research pods", "D. Ghost mining towns"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 1: 'Tokyo, London, Singapore, and Ho Chi Minh City.'"},
    {"id": "u2-r3", "question": "What negative impacts does uncontrolled urban sprawl bring according to paragraph 2?", "options": ["A. Relentless traffic congestion, noise pollution, exhaust emissions, and scarce affordable housing", "B. Zero noise anywhere", "C. Free houses for everyone", "D. Cold snowfall all year round"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'relentless traffic congestion, elevated noise pollution, and harmful exhaust emissions... scarce affordable housing.'"},
    {"id": "u2-r4", "question": "What makes concrete urban areas hotter during sweltering summers?", "options": ["A. Urban heat island effects", "B. Ocean currents", "C. Glaciers melting", "D. Polar winds"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'concrete surfaces exacerbate urban heat island effects during sweltering summers.'"},
    {"id": "u2-r5", "question": "What core philosophy defines 'Smart Green Cities' according to paragraph 3?", "options": ["A. Prioritizing transit-oriented development and human-centered sustainable design", "B. Cutting down all remaining trees", "C. Banning all public transport", "D. Covering the city in coal"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'prioritize transit-oriented development... human-centered urban design.'"},
    {"id": "u2-r6", "question": "What replaces gas-guzzling vehicles in progressive green cities?", "options": ["A. Elevated electric rail networks and bike-share programs", "B. Coal steam engines", "C. Horse carriages only", "D. Rocket launchers"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'replacing gas-guzzling vehicles with elevated electric rail networks and bike-share programs.'"},
    {"id": "u2-r7", "question": "How do vertical forests on skyscrapers and rooftop gardens benefit cities?", "options": ["A. By reducing ambient temperatures and restoring natural biodiversity", "B. By making buildings heavier only", "C. By attracting dangerous bears", "D. By stopping all sunshine"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'reduce ambient temperatures and restore natural biodiversity.'"},
    {"id": "u2-r8", "question": "Which word in paragraph 2 is closest in meaning to 'skyrocketing'?", "options": ["A. Rising or increasing extremely rapidly", "B. Falling down deeply", "C. Disappearing completely", "D. Staying frozen"], "correctAnswerIndex": 0, "explanation": "'Skyrocketing' có nghĩa là tăng vọt lên rất nhanh như tên lửa bay lên trời."},
    {"id": "u2-r9", "question": "Which word in paragraph 3 is closest in meaning to 'precincts'?", "options": ["A. Designated zones, areas, or districts", "B. Tall glass chimneys", "C. Deep river canals", "D. Underground basements"], "correctAnswerIndex": 0, "explanation": "'Pedestrian precincts' có nghĩa là các khu vực hoặc phân khu dành riêng cho người đi bộ."},
    {"id": "u2-r10", "question": "What is the primary message of this reading passage?", "options": ["A. Modern cities must integrate green transit and eco-friendly design to become sustainable and liveable", "B. Cities should ban all humans immediately", "C. Everyone should move to the Antarctic", "D. Cars should be the only mode of transport"], "correctAnswerIndex": 0, "explanation": "Toàn bài đọc khẳng định tương lai của các thành phố đáng sống nằm ở quy hoạch xanh và phát triển bền vững."}
]

u2_writing_prompts = [
    {
        "id": "u2-w1",
        "title": "Đề 1: Write a paragraph about the advantages and disadvantages of city life (60-80 words)",
        "description": "Viết một đoạn văn trình bày những thuận lợi và khó khăn khi sống tại một thành phố lớn.",
        "suggestedOutline": [
            "Introduction: State that living in a city has both benefits and drawbacks.",
            "Body: Mention conveniences (modern amenities, top schools, entertainment) vs challenges (traffic jams, high living costs, noise).",
            "Conclusion: State your personal perspective on whether city life suits you."
        ],
        "usefulPhrases": [
            "Living in a bustling city offers distinct advantages and challenges...",
            "On the one hand, urban residents enjoy superb public amenities, top universities, and convenient transport...",
            "On the other hand, traffic congestion, noise pollution, and steep living costs cause daily stress...",
            "Overall, balancing city opportunities with healthy habits is the key to thriving."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Living in a bustling metropolis offers both tremendous opportunities and distinct challenges. On the one hand, urban citizens enjoy world-class amenities, top-tier schools, and efficient public transport like the elevated metro. On the other hand, severe rush-hour traffic congestion, air pollution, and high living costs can cause considerable stress. Overall, I love city life because the vibrant cosmopolitan atmosphere inspires young people to learn, grow, and pursue ambitious dreams."
    },
    {
        "id": "u2-w2",
        "title": "Đề 2: Write a paragraph on how to solve traffic congestion in big cities (60-80 words)",
        "description": "Viết một đoạn văn đề xuất các biện pháp giảm thiểu tắc nghẽn giao thông tại các đô thị lớn.",
        "suggestedOutline": [
            "Introduction: State that traffic congestion is a major headache for urban areas.",
            "Body: Give 2-3 practical solutions (expanding subway lines, encouraging cycling/walking, staggering work/school hours).",
            "Conclusion: Emphasize that community cooperation makes urban mobility smoother."
        ],
        "usefulPhrases": [
            "Easing urban traffic congestion requires smart and multi-faceted solutions...",
            "First, the city should expand elevated metro lines and electric bus networks...",
            "Second, encouraging citizens to walk or ride bicycles for short journeys cuts down private cars...",
            "These proactive measures will ensure smoother and faster journeys for all commuters."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Easing urban traffic congestion requires practical and comprehensive solutions. First, local authorities should expand modern elevated metro networks and electric bus routes to encourage public transit. Second, developing safe bike lanes motivates commuters to cycle instead of driving private cars for short trips. Finally, staggering school and office start times prevents massive rush-hour bottlenecks. These coordinated measures will significantly improve urban mobility and reduce stressful delays."
    },
    {
        "id": "u2-w3",
        "title": "Đề 3: Write a paragraph describing your dream city in the future (60-80 words)",
        "description": "Viết một đoạn văn miêu tả thành phố tương lai trong mơ của em (thông minh, xanh, hiện đại).",
        "suggestedOutline": [
            "Introduction: Introduce your vision of a futuristic dream city.",
            "Body: Describe its features (solar-powered skyscrapers, lush rooftop gardens, driverless electric pods, clean air).",
            "Conclusion: Express your hope to live in such an inspiring green city."
        ],
        "usefulPhrases": [
            "My dream city in the year 2050 is a smart and eco-friendly paradise...",
            "Gleaming skyscrapers will be blanketed with vertical gardens and powered by solar energy...",
            "Automated electric vehicles will glide silently along tree-lined pedestrian avenues...",
            "Living in such a harmonious metropolis will ensure health, happiness, and prosperity for everyone."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "My dream city in the future is a smart, zero-emission green metropolis. Gleaming skyscrapers will be blanketed with vertical forests and powered entirely by clean solar energy. Silent driverless electric pods and elevated monorails will replace smoky vehicles, eliminating traffic jams and air pollution. Spacious pedestrian avenues with blooming flower gardens will allow residents to relax peacefully. I hope our future cities will become healthy, sustainable havens for all generations."
    },
    {
        "id": "u2-w4",
        "title": "Đề 4: Write a paragraph comparing life in the city with life in the countryside (60-80 words)",
        "description": "Viết một đoạn văn so sánh nhịp sống, môi trường và tiện ích giữa thành phố và vùng nông thôn.",
        "suggestedOutline": [
            "Introduction: State that city and countryside life offer contrasting experiences.",
            "Body: Compare pace of life, environment (fresh air vs pollution), and conveniences (malls/hospitals vs green nature).",
            "Conclusion: State which environment you personally prefer."
        ],
        "usefulPhrases": [
            "Life in the city and life in the countryside offer contrasting lifestyles...",
            "While metropolitan life is fast-paced with superior educational and entertainment amenities...",
            "Rural life is much calmer, surrounded by fresh air, green fields, and close-knit communities...",
            "Each setting possesses unique charms depending on personal preferences."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Life in the city and life in the countryside offer strikingly different lifestyles. Metropolitan life is vibrant and convenient, providing access to top hospitals, universities, and modern shopping malls. However, it can be noisy, polluted, and expensive. In contrast, rural life is much calmer, with fresh air, lush rice fields, and tight-knit neighborhood bonds. While I appreciate the serenity of the countryside, I prefer the dynamic opportunities of city life."
    },
    {
        "id": "u2-w5",
        "title": "Đề 5: Write a paragraph on how teenagers can stay healthy while living in a busy city (60-80 words)",
        "description": "Viết một đoạn văn chia sẻ các bí quyết giúp học sinh duy trì sức khỏe tốt giữa môi trường đô thị nhộn nhịp.",
        "suggestedOutline": [
            "Introduction: State that maintaining health in a busy city is essential for teenagers.",
            "Body: Give practical tips (exercising in local parks, eating home-cooked balanced meals, wearing masks against dust).",
            "Conclusion: Reiterate that good habits lead to academic success and vitality."
        ],
        "usefulPhrases": [
            "Teenagers living in busy cities can adopt several healthy habits...",
            "First, we should jog or play sports in public parks every morning to breathe fresh air...",
            "Second, opting for home-cooked meals instead of oily street fast food protects our digestive system...",
            "These positive routines help urban youth stay energetic and physically fit."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Teenagers living in bustling cities can adopt practical habits to maintain excellent health. First, we should jog or cycle in green neighborhood parks early in the morning before traffic fumes peak. Second, prioritizing home-cooked balanced meals over oily fast food provides essential nutrients for our growing bodies. Finally, getting eight hours of restful sleep and limiting late-night screen time reduces mental stress, keeping urban students energetic and focused for their studies."
    }
]

unit2 = make_unit(2, "Unit 2: City Life", "Cuộc sống đô thị & Giao thông hiện đại", "Khám phá đại đô thị, tiện ích sống, tắc nghẽn giao thông, so sánh kép (Double Comparatives) và so sánh hơn của tính từ/trạng từ.", "Ngữ âm: Ngữ điệu câu so sánh kép và nối âm trong các cụm từ chỉ phương tiện", "Building2", u2_vocab, u2_grammar_info, u2_grammar_exs, u2_listening_info, u2_listening_qs, u2_listening_fibs, u2_speaking, u2_reading_info, u2_reading_qs, u2_writing_prompts)
write_ts_unit(2, unit2)
print("Unit 2 generated successfully!")

