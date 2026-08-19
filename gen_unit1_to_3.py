import json
from gen_unit_utils import make_unit, write_ts_unit

# ==============================================================================
# UNIT 1: LOCAL COMMUNITY
# ==============================================================================
u1_vocab = [
    {"id": "u1-v1", "word": "artisan", "phonetic": "/ˌɑːtɪˈzæn/", "partOfSpeech": "noun", "vietnameseMeaning": "thợ thủ công lành nghề", "englishExample": "The skilled artisan spent three days carving this intricate wooden statue.", "vietnameseExample": "Người thợ thủ công lành nghề đã dành 3 ngày để chạm khắc bức tượng gỗ tinh xảo này."},
    {"id": "u1-v2", "word": "handicraft", "phonetic": "/ˈhændɪkrɑːft/", "partOfSpeech": "noun", "vietnameseMeaning": "sản phẩm thủ công mỹ nghệ", "englishExample": "Tourists love purchasing traditional handicrafts at the night market.", "vietnameseExample": "Du khách rất thích mua sắm các sản phẩm thủ công mỹ nghệ tại chợ đêm."},
    {"id": "u1-v3", "word": "pottery", "phonetic": "/ˈpɒtəri/", "partOfSpeech": "noun", "vietnameseMeaning": "đồ gốm sứ, nghề làm gốm", "englishExample": "Bat Trang is internationally renowned for its centuries-old ceramic and pottery craft.", "vietnameseExample": "Bát Tràng nổi tiếng quốc tế với nghề thủ công gốm sứ có từ nhiều thế kỷ."},
    {"id": "u1-v4", "word": "preserve", "phonetic": "/prɪˈzɜːv/", "partOfSpeech": "verb", "vietnameseMeaning": "bảo tồn, gìn giữ", "englishExample": "Young villagers strive to preserve ancient weaving techniques from disappearing.", "vietnameseExample": "Các thanh niên trong làng nỗ lực gìn giữ các kỹ thuật dệt cổ truyền không bị mai một."},
    {"id": "u1-v5", "word": "pass down", "phonetic": "/pɑːs daʊn/", "partOfSpeech": "phrasal verb", "vietnameseMeaning": "truyền lại qua nhiều thế hệ", "englishExample": "Secret embroidery patterns are passed down from grandmothers to daughters.", "vietnameseExample": "Bí quyết thêu hoa văn được truyền lại từ bà cho các thế hệ con gái."},
    {"id": "u1-v6", "word": "look after", "phonetic": "/lʊk ˈɑːftə/", "partOfSpeech": "phrasal verb", "vietnameseMeaning": "chăm sóc, trông nom", "englishExample": "Community volunteers look after elderly craftsmen in the heritage village.", "vietnameseExample": "Tình nguyện viên cộng đồng chăm sóc các nghệ nhân cao tuổi trong làng di sản."},
    {"id": "u1-v7", "word": "hand down", "phonetic": "/hænd daʊn/", "partOfSpeech": "phrasal verb", "vietnameseMeaning": "lưu truyền, để lại", "englishExample": "These precious ceramic glaze formulas were handed down through six generations.", "vietnameseExample": "Những công thức men gốm quý giá này đã được lưu truyền qua sáu thế hệ."},
    {"id": "u1-v8", "word": "live on", "phonetic": "/lɪv ɒn/", "partOfSpeech": "phrasal verb", "vietnameseMeaning": "sống bằng, dựa vào (thu nhập)", "englishExample": "Most families in this coastal commune live on making conical hats and fishing.", "vietnameseExample": "Hầu hết các gia đình ở xã ven biển này sống bằng nghề làm nón lá và đánh bắt hải sản."},
    {"id": "u1-v9", "word": "conical hat", "phonetic": "/ˈkɒnɪkəl hæt/", "partOfSpeech": "noun", "vietnameseMeaning": "chiếc nón lá truyền thống", "englishExample": "Chuong Village in Ha Noi is celebrated for crafting delicate poem conical hats.", "vietnameseExample": "Làng Chuông ở Hà Nội nổi tiếng với việc làm ra những chiếc nón lá bài thơ thanh tao."},
    {"id": "u1-v10", "word": "authenticity", "phonetic": "/ˌɔːθɛnˈtɪsɪti/", "partOfSpeech": "noun", "vietnameseMeaning": "tính chân thực, nguồn gốc chính gốc", "englishExample": "Collectors value the authenticity and historic value of Dong Ho folk paintings.", "vietnameseExample": "Các nhà sưu tập trân trọng tính chính gốc và giá trị lịch sử của tranh dân gian Đông Hồ."},
    {"id": "u1-v11", "word": "lacquerware", "phonetic": "/ˈlækəweə/", "partOfSpeech": "noun", "vietnameseMeaning": "đồ sơn mài mỹ nghệ", "englishExample": "Creating fine lacquerware requires applying dozens of delicate resin coats.", "vietnameseExample": "Tạo nên đồ sơn mài tinh xảo đòi hỏi phải quét hàng chục lớp sơn nhựa cây tỉ mỉ."},
    {"id": "u1-v12", "word": "silk weave", "phonetic": "/sɪlk wiːv/", "partOfSpeech": "noun", "vietnameseMeaning": "mảnh lụa dệt thủ công", "englishExample": "Van Phuc silk weave is exceptionally smooth, breathable, and colorful.", "vietnameseExample": "Lụa dệt Vạn Phúc đặc biệt mịn màng, thoáng mát và rực rỡ sắc màu."},
    {"id": "u1-v13", "word": "carve", "phonetic": "/kɑːv/", "partOfSpeech": "verb", "vietnameseMeaning": "chạm khắc (gỗ, đá)", "englishExample": "Non Nuoc sculptors carve incredible animal statues out of solid marble.", "vietnameseExample": "Các nghệ nhân Non Nước chạm khắc những bức tượng linh vật kỳ vĩ từ đá cẩm thạch nguyên khối."},
    {"id": "u1-v14", "word": "embroidery", "phonetic": "/ɪmˈbrɔɪdəri/", "partOfSpeech": "noun", "vietnameseMeaning": "nghệ thuật thêu thùa", "englishExample": "Quat Dong embroidery village produces vivid pictures stitched with silk threads.", "vietnameseExample": "Làng thêu Quất Động tạo ra những bức tranh sống động được khâu bằng chỉ tơ tằm."},
    {"id": "u1-v15", "word": "communal house", "phonetic": "/ˈkɒmjʊnl haʊs/", "partOfSpeech": "noun", "vietnameseMeaning": "đình làng, nhà rông cộng đồng", "englishExample": "The village elders gathered at the communal house to organize the spring festival.", "vietnameseExample": "Các bô lão trong làng tụ họp tại đình làng để chuẩn bị lễ hội mùa xuân."},
    {"id": "u1-v16", "word": "workshop", "phonetic": "/ˈwɜːkʃɒp/", "partOfSpeech": "noun", "vietnameseMeaning": "xưởng sản xuất thủ công", "englishExample": "Visitors can participate in a pottery molding workshop guided by master potters.", "vietnameseExample": "Du khách có thể tham gia xưởng thực hành nặn gốm dưới sự hướng dẫn của nghệ nhân bậc thầy."},
    {"id": "u1-v17", "word": "turn up", "phonetic": "/tɜːn ʌp/", "partOfSpeech": "phrasal verb", "vietnameseMeaning": "xuất hiện, đến nơi", "englishExample": "Hundreds of local residents turned up to clean the neighborhood park on Sunday.", "vietnameseExample": "Hàng trăm cư dân địa phương đã có mặt để dọn dẹp công viên khu phố vào Chủ Nhật."},
    {"id": "u1-v18", "word": "set off", "phonetic": "/sɛt ɒf/", "partOfSpeech": "phrasal verb", "vietnameseMeaning": "khởi hành chuyến đi", "englishExample": "Our study tour set off early in the morning to catch the morning sunrise at the craft village.", "vietnameseExample": "Đoàn học tập của chúng tôi khởi hành từ sáng sớm để đón bình minh tại làng nghề."},
    {"id": "u1-v19", "word": "cultural heritage", "phonetic": "/ˈkʌlʧərəl ˈhɛrɪtɪʤ/", "partOfSpeech": "noun", "vietnameseMeaning": "di sản văn hóa quý báu", "englishExample": "Traditional craft villages are an indispensable part of our national cultural heritage.", "vietnameseExample": "Các làng nghề truyền thống là một phần không thể thiếu của di sản văn hóa dân tộc ta."},
    {"id": "u1-v20", "word": "neighborhood spirit", "phonetic": "/ˈneɪbəhʊd ˈspɪrɪt/", "partOfSpeech": "noun", "vietnameseMeaning": "tình làng nghĩa xóm, tinh thần cộng đồng", "englishExample": "Close-knit neighborhood spirit helps families overcome hardships together.", "vietnameseExample": "Tình làng nghĩa xóm gắn kết giúp các gia đình cùng nhau vượt qua khó khăn."}
]

u1_grammar_info = {
    "title": "Cụm Động Từ (Phrasal Verbs) & Wh-word + To-infinitive",
    "summary": "Cụm động từ gồm Verb + Preposition/Particle. Cấu trúc Wh-word (what, where, how, when, who) + to-V dùng để rút gọn mệnh đề danh từ hoặc câu hỏi gián tiếp.",
    "formulaBox": [
        "Phrasal Verb = Verb + Particle (pass down, look after, turn up, find out, set off, live on, deal with)",
        "Question Word + To-Infinitive: S + verb (know, decide, tell, ask, wonder) + Wh-word + TO + V-bare",
        "Ví dụ: We did not know WHERE TO BUY authentic pottery. / She taught me HOW TO WEAVE silk."
    ],
    "usagePoints": [
        {"title": "1. Cụm động từ chỉ hoạt động làng nghề", "detail": "Học sinh cần nắm vững các cụm động từ thông dụng trong đời sống cộng đồng.", "example": "These traditions were handed down through generations."},
        {"title": "2. Cấu trúc Wh-word + To-infinitive", "detail": "Rút gọn câu khi chủ ngữ mệnh đề chính và phụ là một người.", "example": "Lan wonders what to prepare for the cultural exchange fair."}
    ]
}

u1_grammar_exs = [
    {"id": "u1-g1", "question": "These delicate weaving patterns were _____ down from my great-grandmother.", "options": ["A. passed", "B. passing", "C. pass", "D. passes"], "correctAnswer": "A. passed", "explanation": "Dạng bị động của phrasal verb: 'were passed down' (được truyền lại)."},
    {"id": "u1-g2", "question": "My elder brother taught me _____ to carve wooden keychains.", "options": ["A. how", "B. what", "C. why", "D. which"], "correctAnswer": "A. how", "explanation": "Cấu trúc chỉ cách thức thực hiện: 'how + to + V-bare' (how to carve)."},
    {"id": "u1-g3", "question": "We decided to _____ off early to avoid morning traffic jams on the way to Bat Trang.", "options": ["A. set", "B. look", "C. turn", "D. find"], "correctAnswer": "A. set", "explanation": "'set off' có nghĩa là khởi hành chuyến đi."},
    {"id": "u1-g4", "question": "She does not know _____ to ask for directions to the traditional communal house.", "options": ["A. who", "B. which", "C. what", "D. whose"], "correctAnswer": "A. who", "explanation": "'who to ask' (hỏi ai) chỉ người cần tìm sự trợ giúp."},
    {"id": "u1-g5", "question": "Many villagers in the coastal area _____ on making fish sauce and weaving fishing nets.", "options": ["A. live", "B. pass", "C. take", "D. turn"], "correctAnswer": "A. live", "explanation": "'live on' có nghĩa là sống bằng nguồn thu nhập hoặc nghề nghiệp nào."},
    {"id": "u1-g6", "question": "The tourists wondered _____ to find authentic lacquerware souvenirs in Ha Noi.", "options": ["A. where", "B. what", "C. why", "D. who"], "correctAnswer": "A. where", "explanation": "'where to find' chỉ địa điểm tìm mua quà lưu niệm."},
    {"id": "u1-g7", "question": "Please _____ after the pottery workshop while the master craftsman is away.", "options": ["A. look", "B. pass", "C. find", "D. come"], "correctAnswer": "A. look", "explanation": "'look after' có nghĩa là chăm sóc, trông coi."},
    {"id": "u1-g8", "question": "Our youth club wants to _____ out more about the history of Chuong conical hat village.", "options": ["A. find", "B. take", "C. go", "D. get"], "correctAnswer": "A. find", "explanation": "'find out' có nghĩa là tìm hiểu, khám phá thông tin."},
    {"id": "u1-g9", "question": "Lan asked her mother _____ to bake traditional mid-autumn mooncakes.", "options": ["A. how", "B. which", "C. whom", "D. why"], "correctAnswer": "A. how", "explanation": "'how to bake' mang ý nghĩa cách thức làm bánh."},
    {"id": "u1-g10", "question": "Despite the heavy rain, over fifty volunteers _____ up to clean the neighborhood canal.", "options": ["A. turned", "B. set", "C. passed", "D. looked"], "correctAnswer": "A. turned", "explanation": "'turned up' có nghĩa là xuất hiện, có mặt tham gia."},
    {"id": "u1-g11", "question": "They haven’t decided _____ to invite to the upcoming craft village cultural festival.", "options": ["A. whom", "B. where", "C. what", "D. whose"], "correctAnswer": "A. whom", "explanation": "'whom to invite' dùng cho tân ngữ chỉ người được mời."},
    {"id": "u1-g12", "question": "You must _____ up early if you want to catch the morning pottery market in Bat Trang.", "options": ["A. get", "B. give", "C. take", "D. turn"], "correctAnswer": "A. get", "explanation": "'get up' có nghĩa là thức dậy sớm."},
    {"id": "u1-g13", "question": "I don’t know _____ to choose between the blue ceramic vase and the green one.", "options": ["A. which", "B. where", "C. whom", "D. why"], "correctAnswer": "A. which", "explanation": "'which to choose' diễn đạt sự lựa chọn giữa các vật thể cụ thể."},
    {"id": "u1-g14", "question": "The artisan showed the apprentices _____ to apply gold foil onto lacquer boxes.", "options": ["A. how", "B. what", "C. who", "D. whose"], "correctAnswer": "A. how", "explanation": "'how to apply' (cách dát vàng lên hộp sơn mài)."},
    {"id": "u1-g15", "question": "If you don’t understand the technique, you should ask the teacher _____ to do it step by step.", "options": ["A. how", "B. when", "C. why", "D. which"], "correctAnswer": "A. how", "explanation": "'how to do' (cách thực hiện từng bước)."},
    {"id": "u1-g16", "question": "The village committee will _____ down new environmental guidelines for workshops.", "options": ["A. hand", "B. turn", "C. set", "D. look"], "correctAnswer": "A. hand", "explanation": "'hand down' có nghĩa là ban hành hoặc truyền đạt hướng dẫn."},
    {"id": "u1-g17", "question": "Could you tell me _____ to buy raw clay materials for our pottery project?", "options": ["A. where", "B. whom", "C. why", "D. which"], "correctAnswer": "A. where", "explanation": "'where to buy' chỉ địa điểm mua nguyên liệu đất sét."},
    {"id": "u1-g18", "question": "We need to _____ up with innovative ideas to promote local handmade products online.", "options": ["A. come", "B. put", "C. catch", "D. keep"], "correctAnswer": "A. come", "explanation": "'come up with' có nghĩa là nảy ra ý tưởng mới."},
    {"id": "u1-g19", "question": "The students were confused about _____ to start their community service report.", "options": ["A. when", "B. whose", "C. whom", "D. which"], "correctAnswer": "A. when", "explanation": "'when to start' chỉ thời điểm bắt đầu viết bài báo cáo."},
    {"id": "u1-g20", "question": "My grandparents always encourage me to _____ on our family’s traditional bamboo craft.", "options": ["A. carry", "B. look", "C. turn", "D. give"], "correctAnswer": "A. carry", "explanation": "'carry on' có nghĩa là tiếp tục duy trì nghề truyền thống."}
]

u1_listening_info = {
    "audioTitle": "Chuyến Tham Quan Làng Gốm Bát Tràng (A Field Trip to Bat Trang)",
    "audioDuration": "3:15",
    "audioScriptSpeaker": "Artisan Uncle Hung & Student Mi",
    "transcriptText": "Mi: Uncle Hung, how long has Bat Trang been producing ceramics?\nUncle Hung: For over seven centuries, Mi! Our ancestors settled here along the Red River because of the rich, white clay beds.\nMi: That is incredible! How do potters create such glossy and durable glazes?\nUncle Hung: It requires years of dedicated practice. Each family possesses secret formulas handed down from past generations. We blend crushed seashells, wood ashes, and natural river minerals.\nMi: Are younger generations still interested in carrying on this pottery craft?\nUncle Hung: Yes! Many young artisans now integrate 3D computer design with traditional pottery wheel molding, attracting international collectors.",
    "vietnameseTranslation": "Mi: Bác Hùng ơi, Bát Tràng đã sản xuất đồ gốm sứ được bao lâu rồi ạ?\nBác Hùng: Đã hơn bảy thế kỷ rồi cháu à! Tổ tiên chúng ta định cư tại đây dọc theo sông Hồng nhờ có những mỏ đất sét trắng trù phú.\nMi: Thật đáng kinh ngạc! Làm thế nào các nghệ nhân tạo ra lớp men bóng bẩy và bền đẹp như vậy ạ?\nBác Hùng: Đòi hỏi nhiều năm luyện tập tận tâm. Mỗi gia đình đều có những công thức bí truyền được truyền lại từ các thế hệ trước. Chúng tôi pha trộn vỏ sò nghiền nát, tro củi và khoáng chất tự nhiên từ sông.\nMi: Các thế hệ trẻ ngày nay có còn quan tâm đến việc tiếp nối nghề làm gốm này không ạ?\nBác Hùng: Có chứ! Nhiều nghệ nhân trẻ hiện nay kết hợp thiết kế 3D trên máy tính với kỹ thuật nặn vuốt trên bàn xoay truyền thống, thu hút sự chú ý của các nhà sưu tập quốc tế."
}

u1_listening_qs = [
    {"id": "u1-l1", "question": "How long has Bat Trang ceramic village existed?", "options": ["A. For over seven centuries", "B. Exactly fifty years", "C. Only two decades", "D. Around ten years"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'For over seven centuries, Mi!'"},
    {"id": "u1-l2", "question": "Why did the ancestors choose to settle in Bat Trang along the Red River?", "options": ["A. Because of rich white clay beds", "B. Because of gold mines", "C. Because of cold weather", "D. Because of deep sea ports"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'settled here along the Red River because of the rich, white clay beds.'"},
    {"id": "u1-l3", "question": "What natural ingredients are blended to formulate traditional ceramic glaze?", "options": ["A. Synthetic plastic powder", "B. Crushed seashells, wood ashes, and river minerals", "C. Petroleum and coal tar", "D. Sea salt and sugar"], "correctAnswerIndex": 1, "explanation": "Trong bài nghe: 'We blend crushed seashells, wood ashes, and natural river minerals.'"},
    {"id": "u1-l4", "question": "How do young artisans modernize Bat Trang pottery today?", "options": ["A. By abandoning pottery entirely", "B. By integrating 3D computer design with traditional wheel molding", "C. By importing cheap plastic cups", "D. By closing down all ancient kilns"], "correctAnswerIndex": 1, "explanation": "Trong bài nghe: 'young artisans now integrate 3D computer design with traditional pottery wheel molding.'"},
    {"id": "u1-l5", "question": "Where is Bat Trang pottery village situated?", "options": ["A. Along the Red River", "B. On the top of Ba Vi mountain", "C. Inside a subterranean cavern", "D. In the Mekong Delta"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'settled here along the Red River.'"},
    {"id": "u1-l6", "question": "What is required to become a master potter according to Uncle Hung?", "options": ["A. Years of dedicated practice", "B. Winning a lottery prize", "C. Fast typing speed", "D. Buying thousands of books"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'It requires years of dedicated practice.'"},
    {"id": "u1-l7", "question": "How are secret ceramic glaze formulas passed through time?", "options": ["A. Handed down from past generations within families", "B. Broadcasted on commercial television", "C. Printed on billboards", "D. Sold in foreign supermarkets"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'Each family possesses secret formulas handed down from past generations.'"},
    {"id": "u1-l8", "question": "Who is showing keen interest in contemporary Bat Trang pottery products?", "options": ["A. International collectors", "B. Space scientists only", "C. Car drivers", "D. Mining companies"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'attracting international collectors.'"}
]

u1_listening_fibs = [
    {"id": "u1-f1", "sentenceWithBlank": "Bat Trang has produced fine ceramics for over seven _____.", "correctWord": "centuries", "hint": "Từ chỉ nhiều thế kỷ (100 năm/thế kỷ)"},
    {"id": "u1-f2", "sentenceWithBlank": "Potters utilize rich white _____ from the riverbed to shape vases.", "correctWord": "clay", "hint": "Chất liệu đất sét trắng dẻo"},
    {"id": "u1-f3", "sentenceWithBlank": "Glaze formulas are _____ down through family generations.", "correctWord": "handed", "hint": "Dạng quá khứ phân từ của động từ hand"},
    {"id": "u1-f4", "sentenceWithBlank": "Young potters combine 3D technology with traditional _____ skills.", "correctWord": "craft", "hint": "Kỹ năng thủ công mỹ nghệ"}
]

u1_speaking = [
    {"id": "u1-s1", "targetSentence": "Bat Trang ceramic village is world-famous for its exquisite handcrafted porcelain and pottery.", "ipa": "/bɑːt trɑːŋ sɪˈræmɪk ˈvɪlɪʤ ɪz wɜːld-ˈfeɪməs fɔːr ɪts ˈɛkskwɪzɪt ˈhændˌkrɑːftɪd ˈpɔːsəlɪn ænd ˈpɒtəri/", "vietnameseMeaning": "Làng gốm Bát Tràng nổi tiếng khắp thế giới nhờ đồ sứ và đồ gốm thủ công tinh xảo.", "contextSituation": "Giới thiệu làng nghề truyền thống Bát Tràng với du khách quốc tế.", "keyPhonicsFocus": "Phát âm chuẩn âm /s/ và /z/ trong 'ceramics' và 'exquisite'.", "sampleAudioText": "Bat Trang ceramic village is world-famous for its exquisite handcrafted porcelain and pottery."},
    {"id": "u1-s2", "targetSentence": "Young villagers strive to preserve ancient weaving techniques from disappearing over time.", "ipa": "/jʌŋ ˈvɪlɪʤəz straɪv tuː prɪˈzɜːv ˈeɪnʃənt ˈwiːvɪŋ tɛkˈniːks frɒm ˌdɪsəˈpɪərɪŋ ˈəʊvə taɪm/", "vietnameseMeaning": "Thanh niên trong làng nỗ lực gìn giữ các kỹ thuật dệt cổ truyền không bị mai một theo thời gian.", "contextSituation": "Nói về trách nhiệm gìn giữ di sản làng nghề của thế hệ trẻ.", "keyPhonicsFocus": "Luyện nhấn trọng âm vào động từ 'preserve' /prɪˈzɜːv/ và 'disappearing'.", "sampleAudioText": "Young villagers strive to preserve ancient weaving techniques from disappearing over time."},
    {"id": "u1-s3", "targetSentence": "These secret glaze formulas have been handed down through seven successive generations.", "ipa": "/ðiːz ˈsiːkrɪt ɡleɪz ˈfɔːmjʊliː hæv biːn ˈhændɪd daʊn θruː ˈsɛvn səkˈsɛsɪv ˌʤɛnəˈreɪʃənz/", "vietnameseMeaning": "Những công thức men bí truyền này đã được lưu truyền qua bảy thế hệ liên tiếp.", "contextSituation": "Thuyết minh về giá trị gia truyền của làng nghề gốm sứ.", "keyPhonicsFocus": "Phát âm chuẩn âm /θ/ trong 'through' và đuôi /dɪd/ trong 'handed down'.", "sampleAudioText": "These secret glaze formulas have been handed down through seven successive generations."},
    {"id": "u1-s4", "targetSentence": "The master artisan patiently taught the new apprentices how to mold wet clay on the wheel.", "ipa": "/ðə ˈmɑːstər ˈɑːtɪzæn ˈpeɪʃəntli tɔːt ðə njuː əˈprɛntɪsɪz haʊ tuː məʊld wɛt kleɪ ɒn ðə wiːl/", "vietnameseMeaning": "Nghệ nhân bậc thầy kiên nhẫn chỉ cho các học việc cách nặn đất sét ướt trên bàn xoay.", "contextSituation": "Miêu tả không khí học nghề trong xưởng thủ công.", "keyPhonicsFocus": "Phát âm rõ cụm từ 'how to mold' và âm /tʃ/ trong 'taught'.", "sampleAudioText": "The master artisan patiently taught the new apprentices how to mold wet clay on the wheel."},
    {"id": "u1-s5", "targetSentence": "Van Phuc silk is renowned across the country for its lightweight, smooth, and breathable texture.", "ipa": "/væn fʊk sɪlk ɪz rɪˈnaʊnd əˈkrɒs ðə ˈkʌntri fɔːr ɪts ˈlaɪtweɪt smuːð ænd ˈbriːðəbl ˈtɛksʧə/", "vietnameseMeaning": "Lụa Vạn Phúc nức tiếng cả nước nhờ độ nhẹ, mượt mà và cảm giác thoáng mát.", "contextSituation": "Giới thiệu về chất lượng lụa Hà Đông cao cấp.", "keyPhonicsFocus": "Phát âm chuẩn âm /ð/ trong 'smooth' và 'breathable'.", "sampleAudioText": "Van Phuc silk is renowned across the country for its lightweight, smooth, and breathable texture."},
    {"id": "u1-s6", "targetSentence": "Participating in community volunteer campaigns helps strengthen neighborhood bonds.", "ipa": "/pɑːˈtɪsɪpeɪtɪŋ ɪn kəˈmjuːnɪti ˌvɒlənˈtɪə kæmˈpeɪnz hɛlps ˈstrɛŋθən ˈneɪbəhʊd bɒndz/", "vietnameseMeaning": "Tham gia các chiến dịch tình nguyện cộng đồng giúp củng cố tình làng nghĩa xóm.", "contextSituation": "Nêu cao tinh thần đoàn kết khu dân cư.", "keyPhonicsFocus": "Phát âm chuẩn âm /ŋθ/ trong 'strengthen' và /z/ trong 'campaigns'.", "sampleAudioText": "Participating in community volunteer campaigns helps strengthen neighborhood bonds."},
    {"id": "u1-s7", "targetSentence": "Chuong Village artisans craft delicate conical hats that feature picturesque landscapes of Viet Nam.", "ipa": "/ʧuːŋ ˈvɪlɪʤ ˈɑːtɪzænz krɑːft ˈdɛlɪkɪt ˈkɒnɪkəl hæts ðæt ˈfiːʧə ˌpɪkʧəˈrɛsk ˈlænskeɪps ɒv ˌvjɛt ˈnɑːm/", "vietnameseMeaning": "Các nghệ nhân Làng Chuông làm ra những chiếc nón lá thanh tao mang hình ảnh phong cảnh hữu tình Việt Nam.", "contextSituation": "Thuyết minh về nét độc đáo của nón lá bài thơ Làng Chuông.", "keyPhonicsFocus": "Phát âm chuẩn tính từ 'picturesque' /ˌpɪkʧəˈrɛsk/ và 'conical'.", "sampleAudioText": "Chuong Village artisans craft delicate conical hats that feature picturesque landscapes of Viet Nam."},
    {"id": "u1-s8", "targetSentence": "Most local families in this riverside commune live on weaving traditional bamboo baskets.", "ipa": "/məʊst ˈləʊkəl ˈfæmɪliz ɪn ðɪs ˈrɪvəsaɪd ˈkɒmjuːn lɪv ɒn ˈwiːvɪŋ trəˈdɪʃənl bæmˈbuː ˈbɑːskɪts/", "vietnameseMeaning": "Hầu hết các gia đình địa phương ở xã ven sông này sống bằng nghề đan rổ rá tre truyền thống.", "contextSituation": "Kể về nguồn thu nhập chính của người dân làng nghề mây tre đan.", "keyPhonicsFocus": "Phát âm rõ cụm động từ 'live on' /lɪv ɒn/ và âm /uː/ trong 'bamboo'.", "sampleAudioText": "Most local families in this riverside commune live on weaving traditional bamboo baskets."},
    {"id": "u1-s9", "targetSentence": "We organized a weekend field trip to discover how Dong Ho folk paintings are printed.", "ipa": "/wiː ˈɔːɡənaɪzd ə ˈwiːkɛnd fiːld trɪp tuː dɪsˈkʌvə haʊ dɒŋ hoʊ fəʊk ˈpeɪntɪŋz ɑː ˈprɪntɪd/", "vietnameseMeaning": "Chúng tôi đã tổ chức chuyến dã ngoại cuối tuần để khám phá cách in tranh dân gian Đông Hồ.", "contextSituation": "Kể về chuyến đi trải nghiệm văn hóa truyền thống.", "keyPhonicsFocus": "Luyện nối âm 'field trip to' và phát âm /dɪd/ trong 'printed'.", "sampleAudioText": "We organized a weekend field trip to discover how Dong Ho folk paintings are printed."},
    {"id": "u1-s10", "targetSentence": "Skillful sculptors carve magnificent statues out of natural marble blocks in Da Nang.", "ipa": "/ˈskɪlfʊl ˈskʌlptəz kɑːv mæɡˈnɪfɪsnt ˈstætjuːz aʊt ɒv ˈnæʧrəl ˈmɑːbl blɒks ɪn dɑː næŋ/", "vietnameseMeaning": "Những người thợ điêu khắc tài hoa chạm trổ những bức tượng tráng lệ từ khối đá cẩm thạch tự nhiên ở Đà Nẵng.", "contextSituation": "Nói về làng đá mỹ nghệ Non Nước Ngũ Hành Sơn.", "keyPhonicsFocus": "Phát âm chuẩn âm /sk/ trong 'skillful' và /pt/ trong 'sculptors'.", "sampleAudioText": "Skillful sculptors carve magnificent statues out of natural marble blocks in Da Nang."},
    {"id": "u1-s11", "targetSentence": "Our teacher explained where to find reliable sources about historic handicraft villages.", "ipa": "/ˈaʊə ˈtiːʧər ɪksˈpleɪnd weə tuː faɪnd rɪˈlaɪəbl ˈsɔːsɪz əˈbaʊt hɪsˈtɒrɪk ˈhændɪkrɑːft ˈvɪlɪʤɪz/", "vietnameseMeaning": "Cô giáo đã giải thích nơi tìm kiếm các nguồn tư liệu đáng tin cậy về các làng nghề thủ công lịch sử.", "contextSituation": "Báo cáo về phương pháp tra cứu tư liệu học tập.", "keyPhonicsFocus": "Phát âm chuẩn cấu trúc 'where to find' /weə tuː faɪnd/.", "sampleAudioText": "Our teacher explained where to find reliable sources about historic handicraft villages."},
    {"id": "u1-s12", "targetSentence": "Local youth clubs clean up public spaces to promote a healthier living environment.", "ipa": "/ˈləʊkəl juːθ klʌbz kliːn ʌp ˈpʌblɪk ˈspeɪsɪz tuː prəˈməʊt ə ˈhɛlθɪə ˈlɪvɪŋ ɪnˈvaɪərənmənt/", "vietnameseMeaning": "Các câu lạc bộ thanh niên địa phương dọn dẹp không gian công cộng để thúc đẩy môi trường sống trong lành hơn.", "contextSituation": "Nói về các hoạt động bảo vệ môi trường khu dân cư.", "keyPhonicsFocus": "Phát âm chuẩn cụm động từ 'clean up' /kliːn ʌp/ và 'healthier'.", "sampleAudioText": "Local youth clubs clean up public spaces to promote a healthier living environment."},
    {"id": "u1-s13", "targetSentence": "Preserving our intangible cultural heritage fosters deep community pride and identity.", "ipa": "/prɪˈzɜːvɪŋ ˈaʊər ɪnˈtænʤəbl ˈkʌlʧərəl ˈhɛrɪtɪʤ ˈfɒstəz diːp kəˈmjuːnɪti praɪd ænd aɪˈdɛntɪti/", "vietnameseMeaning": "Bảo tồn di sản văn hóa phi vật thể nuôi dưỡng niềm tự hào và bản sắc cộng đồng sâu sắc.", "contextSituation": "Khẳng định ý nghĩa của việc lưu giữ văn hóa truyền thống.", "keyPhonicsFocus": "Phát âm chuẩn từ 'intangible' /ɪnˈtænʤəbl/ và 'identity'.", "sampleAudioText": "Preserving our intangible cultural heritage fosters deep community pride and identity."},
    {"id": "u1-s14", "targetSentence": "The village festival provides an excellent venue for artisans to showcase their finest works.", "ipa": "/ðə ˈvɪlɪʤ ˈfɛstəvəl prəˈvaɪdz ən ˈɛksələnt ˈvɛnjuː fɔːr ˈɑːtɪzænz tuː ˈʃəʊkeɪs ðeə ˈfaɪnɪst wɜːks/", "vietnameseMeaning": "Lễ hội làng là dịp tuyệt vời để các nghệ nhân trưng bày những tác phẩm xuất sắc nhất của mình.", "contextSituation": "Miêu tả không khí trưng bày tại hội làng.", "keyPhonicsFocus": "Phát âm chuẩn âm /ʃ/ trong 'showcase' và /ts/ trong 'finest'.", "sampleAudioText": "The village festival provides an excellent venue for artisans to showcase their finest works."},
    {"id": "u1-s15", "targetSentence": "She did not know what to say when she met the veteran conical hat maker.", "ipa": "/ʃiː dɪd nɒt nəʊ wɒt tuː seɪ wɛn ʃiː mɛt ðə ˈvɛtərən ˈkɒnɪkəl hæt ˈmeɪkə/", "vietnameseMeaning": "Cô ấy đã không biết phải nói gì khi lần đầu gặp nghệ nhân làm nón lá kỳ cựu.", "contextSituation": "Diễn tả sự ngưỡng mộ trước bậc tiền bối làng nghề.", "keyPhonicsFocus": "Phát âm chuẩn cấu trúc 'what to say' /wɒt tuː seɪ/.", "sampleAudioText": "She did not know what to say when she met the veteran conical hat maker."},
    {"id": "u1-s16", "targetSentence": "Crafting fine lacquerware requires great patience, meticulous attention, and artistic vision.", "ipa": "/ˈkrɑːftɪŋ faɪn ˈlækəweə rɪˈkwaɪəz ɡreɪt ˈpeɪʃəns mɪˈtɪkjʊləs əˈtɛnʃən ænd ɑːˈtɪstɪk ˈvɪʒən/", "vietnameseMeaning": "Tạo nên đồ sơn mài tinh xảo đòi hỏi sự kiên nhẫn lớn, sự tỉ mỉ và tầm nhìn nghệ thuật.", "contextSituation": "Nói về sự công phu của nghề làm tranh và đồ sơn mài.", "keyPhonicsFocus": "Phát âm chuẩn âm /ʃ/ trong 'patience' và /ʒ/ trong 'vision'.", "sampleAudioText": "Crafting fine lacquerware requires great patience, meticulous attention, and artistic vision."},
    {"id": "u1-s17", "targetSentence": "We should encourage tourists to purchase authentic local handicrafts instead of mass-produced items.", "ipa": "/wiː ʃʊd ɪnˈkʌrɪʤ ˈtʊərɪsts tuː ˈpɜːʧəs ɔːˈθɛntɪk ˈləʊkəl ˈhændɪkrɑːfts ɪnˈstɛd ɒv mæs-prəˈdjuːst ˈaɪtəmz/", "vietnameseMeaning": "Chúng ta nên khuyến khích du khách mua hàng thủ công chính gốc thay vì hàng sản xuất đại trà.", "contextSituation": "Kêu gọi ủng hộ sản phẩm của nghệ nhân bản địa.", "keyPhonicsFocus": "Phát âm chuẩn từ 'authentic' /ɔːˈθɛntɪk/ và 'handicrafts'.", "sampleAudioText": "We should encourage tourists to purchase authentic local handicrafts instead of mass-produced items."},
    {"id": "u1-s18", "targetSentence": "The elders at the communal house shared inspiring stories about our village’s foundation.", "ipa": "/ði ˈɛldəz æt ðə ˈkɒmjʊnl haʊs ʃeəd ɪnˈspaɪərɪŋ ˈstɔːriz əˈbaʊt ˈaʊə ˈvɪlɪʤɪz faʊnˈdeɪʃən/", "vietnameseMeaning": "Các bậc cao niên tại đình làng đã kể những câu chuyện truyền cảm hứng về lịch sử lập làng.", "contextSituation": "Kể về buổi sinh hoạt truyền thống tại đình làng.", "keyPhonicsFocus": "Phát âm chuẩn âm /ʃ/ trong 'shared' và 'foundation'.", "sampleAudioText": "The elders at the communal house shared inspiring stories about our village’s foundation."},
    {"id": "u1-s19", "targetSentence": "Modern technology helps local cooperatives market their handmade crafts to international buyers.", "ipa": "/ˈmɒdən tɛkˈnɒləʤi hɛlps ˈləʊkəl kəʊˈɒpərətɪvz ˈmɑːkɪt ðeə hændˈmeɪd krɑːfts tuː ˌɪntəˈnæʃənl ˈbaɪəz/", "vietnameseMeaning": "Công nghệ hiện đại giúp các hợp tác xã địa phương quảng bá sản phẩm thủ công tới khách mua quốc tế.", "contextSituation": "Nói về sự đổi mới trong kinh doanh làng nghề.", "keyPhonicsFocus": "Nhấn đúng trọng âm từ 'cooperatives' /kəʊˈɒpərətɪvz/.", "sampleAudioText": "Modern technology helps local cooperatives market their handmade crafts to international buyers."},
    {"id": "u1-s20", "targetSentence": "Living harmoniously with our neighbors creates a safe, caring, and vibrant community.", "ipa": "/ˈlɪvɪŋ hɑːˈməʊniəsli wɪð ˈaʊə ˈneɪbəz kriːˈeɪts ə seɪf ˈkeərɪŋ ænd ˈvaɪbrənt kəˈmjuːnɪti/", "vietnameseMeaning": "Sống hòa thuận với láng giềng tạo nên một cộng đồng an toàn, ấm áp và tràn đầy sức sống.", "contextSituation": "Kết luận về giá trị cốt lõi của đời sống cộng đồng.", "keyPhonicsFocus": "Phát âm chuẩn trạng từ 'harmoniously' /hɑːˈməʊniəsli/ và tính từ 'vibrant'.", "sampleAudioText": "Living harmoniously with our neighbors creates a safe, caring, and vibrant community."}
]

u1_reading_info = {
    "title": "Gìn Giữ Hồn Quê: Sức Sống Mãnh Liệt Của Các Làng Nghề Truyền Thống",
    "topic": "Bảo tồn làng nghề & Phát triển kinh tế cộng đồng",
    "passageText": "Traditional craft villages have long been recognized as the cradle of Vietnamese material culture and community identity. From the intricate silk looms of Van Phuc to the fiery ceramic kilns of Bat Trang and the scented bamboo workshops of Chuong Village, these historic hubs showcase centuries of artisanal ingenuity.\n\nHistorically, each craft village functioned as an interconnected socioeconomic unit where knowledge was guarded as precious family secrets and handed down from generation to generation. Villagers took immense pride in their craft, establishing guild temples and communal houses to venerate their ancestral craft founders.\n\nIn recent decades, however, rapid industrialization and mass plastic manufacturing posed existential challenges to handmade products. To survive and thrive in the modern economy, dynamic artisans are reinventing their crafts. They combine eco-friendly materials, contemporary artistic aesthetics, and digital e-commerce platforms to introduce Vietnamese handicrafts to discerning international markets. By supporting these craft communities, we help safeguard our national heritage while fostering sustainable local livelihoods.",
    "keyVocabularyHighlights": [
        {"word": "cradle of culture", "meaning": "cái nôi nuôi dưỡng nền văn hóa"},
        {"word": "artisanal ingenuity", "meaning": "sự khéo léo và tài hoa của người thợ thủ công"},
        {"word": "venerate ancestral founders", "meaning": "thờ phụng và tri ân các vị tổ nghề"},
        {"word": "sustainable livelihoods", "meaning": "kế sinh nhai bền vững cho người dân địa phương"}
    ]
}

u1_reading_qs = [
    {"id": "u1-r1", "question": "What role have traditional craft villages played in Vietnamese history?", "options": ["A. They served only as military bases", "B. They have been recognized as the cradle of culture and community identity", "C. They produced only imported goods", "D. They were completely isolated from society"], "correctAnswerIndex": 1, "explanation": "Trong đoạn 1: 'recognized as the cradle of Vietnamese material culture and community identity.'"},
    {"id": "u1-r2", "question": "How was artisanal knowledge traditionally preserved in craft villages?", "options": ["A. By broadcasting formulas on public television", "B. By guarding formulas as family secrets handed down through generations", "C. By writing books for foreign countries", "D. By forgetting them after every festival"], "correctAnswerIndex": 1, "explanation": "Trong đoạn 2: 'where knowledge was guarded as precious family secrets and handed down from generation to generation.'"},
    {"id": "u1-r3", "question": "Why did villagers establish guild temples and communal houses?", "options": ["A. To store excess grain only", "B. To venerate ancestral craft founders and celebrate community pride", "C. To sell plastic toys", "D. To host international sports contests"], "correctAnswerIndex": 1, "explanation": "Trong đoạn 2: 'establishing guild temples and communal houses to venerate their ancestral craft founders.'"},
    {"id": "u1-r4", "question": "What major challenge did craft villages face in recent decades?", "options": ["A. Lack of sunshine", "B. Rapid industrialization and mass plastic manufacturing", "C. Too many tourists visiting", "D. Excessive rainfall in summer"], "correctAnswerIndex": 1, "explanation": "Trong đoạn 3: 'rapid industrialization and mass plastic manufacturing posed existential challenges.'"},
    {"id": "u1-r5", "question": "How are modern dynamic artisans reinventing their traditional crafts?", "options": ["A. By shutting down all workshops", "B. By combining eco-friendly materials, modern aesthetics, and digital e-commerce", "C. By using cheap synthetic dyes", "D. By copying foreign machines completely"], "correctAnswerIndex": 1, "explanation": "Trong đoạn 3: 'They combine eco-friendly materials, contemporary artistic aesthetics, and digital e-commerce platforms.'"},
    {"id": "u1-r6", "question": "Which craft is specifically associated with Van Phuc Village in the passage?", "options": ["A. Ceramic kilns", "B. Silk looms", "C. Marble statues", "D. Conical hats"], "correctAnswerIndex": 1, "explanation": "Trong đoạn 1: 'intricate silk looms of Van Phuc.'"},
    {"id": "u1-r7", "question": "Which word in paragraph 1 is closest in meaning to 'ingenuity'?", "options": ["A. Cleverness and creativity / Skill", "B. Laziness", "C. Weakness", "D. Silence"], "correctAnswerIndex": 0, "explanation": "'Artisanal ingenuity' mang nghĩa sự tài hoa, khéo léo và sáng tạo của nghệ nhân."},
    {"id": "u1-r8", "question": "Which word in paragraph 2 is closest in meaning to 'venerate'?", "options": ["A. Respect and honor deeply", "B. Ignore", "C. Dislike", "D. Destroy"], "correctAnswerIndex": 0, "explanation": "'Venerate' có nghĩa là tôn kính, thờ phụng sâu sắc tổ nghề."},
    {"id": "u1-r9", "question": "According to the passage, why should we support traditional craft communities?", "options": ["A. To replace all modern factories", "B. To safeguard national heritage and foster sustainable livelihoods", "C. To prevent students from using computers", "D. To stop international trade"], "correctAnswerIndex": 1, "explanation": "Trong đoạn 3: 'help safeguard our national heritage while fostering sustainable local livelihoods.'"},
    {"id": "u1-r10", "question": "What is the best overall title for this reading passage?", "options": ["A. The History of Modern Plastic Factories", "B. Preserving the Soul of the Nation: The Vitality of Traditional Craft Villages", "C. How to Build a High-Rise Apartment", "D. Tourism in European Cities"], "correctAnswerIndex": 1, "explanation": "Toàn bài đọc làm nổi bật sức sống và nỗ lực bảo tồn của các làng nghề truyền thống Việt Nam."}
]

u1_writing_prompts = [
    {
        "id": "u1-w1",
        "title": "Đề 1: Write a paragraph describing a traditional craft village in Viet Nam (60-80 words)",
        "description": "Viết một đoạn văn giới thiệu về một làng nghề truyền thống nổi tiếng ở Việt Nam (Gốm Bát Tràng, Lụa Vạn Phúc, Nón Làng Chuông...).",
        "suggestedOutline": [
            "Introduction: Name and location of the craft village.",
            "Body: Describe its special products, traditional techniques, and materials.",
            "Conclusion: Express your pride and why we should preserve this craft."
        ],
        "usefulPhrases": [
            "One of the most renowned craft villages in Viet Nam is...",
            "It is famous for producing exquisite...",
            "The artisan techniques have been handed down through...",
            "In my opinion, preserving this craft helps keep our cultural heritage alive."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "One of the most famous craft villages in Viet Nam is Bat Trang Ceramic Village, located near Ha Noi. For over seven centuries, local artisans have utilized white clay from the Red River to produce exquisite pottery and porcelain vases. Secret glaze formulas have been handed down through generations, creating durable and glossy items. Visiting Bat Trang allows tourists to shape raw clay with their own hands. We must preserve this village to safeguard our national culture."
    },
    {
        "id": "u1-w2",
        "title": "Đề 2: Write a paragraph about a community service project in your neighborhood (60-80 words)",
        "description": "Viết một đoạn văn kể về một hoạt động vì cộng đồng tại nơi em sinh sống (dọn rác, trồng cây, giúp đỡ người già...).",
        "suggestedOutline": [
            "Introduction: Introduce the community activity and when it happened.",
            "Body: Explain what you and the neighbors did (cleaning canals, planting flowers, sorting recyclables).",
            "Conclusion: Share your feelings and the positive impact on the neighborhood."
        ],
        "usefulPhrases": [
            "Last weekend, our neighborhood youth club organized a campaign to...",
            "We gathered at the communal house and divided into small groups to...",
            "Thanks to everyone’s hard work, our public park became...",
            "This meaningful activity strengthened our neighborhood bonds."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Last Sunday, our neighborhood youth club organized a 'Green Weekend' campaign to clean up the local park. Early in the morning, dozens of volunteers gathered with trash bags and brooms to sweep walking paths, collect plastic waste, and plant colorful flowers along the canal. Working together was fun and meaningful. The park is now much cleaner and greener. This community activity helped strengthen neighborhood solidarity and raised environmental awareness among teenagers."
    },
    {
        "id": "u1-w3",
        "title": "Đề 3: Write a paragraph suggesting ways to help local artisans promote their crafts (60-80 words)",
        "description": "Viết một đoạn văn đề xuất các giải pháp giúp các nghệ nhân quảng bá sản phẩm thủ công tới giới trẻ và du khách.",
        "suggestedOutline": [
            "Introduction: State the need to support traditional craft artisans.",
            "Body: Give 2 practical solutions (organizing hands-on workshops, selling on e-commerce & social media).",
            "Conclusion: State the long-term benefit for the local economy."
        ],
        "usefulPhrases": [
            "To help local artisans thrive, we should take several practical steps...",
            "First, craft villages can organize interactive hands-on workshops for students...",
            "Second, young people can assist craftsmen in marketing products on e-commerce platforms...",
            "These actions will boost sales and preserve traditional skills."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "To help local artisans sustain their traditional crafts, several solutions should be implemented. First, craft cooperatives should host interactive molding and weaving workshops so young visitors can experience crafting firsthand. Second, students can support elderly artisans by creating engaging social media videos and selling authentic handicrafts on e-commerce platforms. These modern strategies will attract international buyers and ensure stable income for local craftsman families in the digital era."
    },
    {
        "id": "u1-w4",
        "title": "Đề 4: Write a paragraph about the importance of neighborhood spirit (60-80 words)",
        "description": "Viết một đoạn văn bàn về tầm quan trọng của tình làng nghĩa xóm trong đời sống hiện đại.",
        "suggestedOutline": [
            "Introduction: State why good neighborhood relationships matter.",
            "Body: Mention specific ways neighbors help each other (sharing food, looking after houses, organizing festivals).",
            "Conclusion: Conclude on how harmony makes life happier."
        ],
        "usefulPhrases": [
            "A supportive neighborhood spirit plays an essential role in our daily lives...",
            "When neighbors care for each other, they can...",
            "In addition, close community bonds make everyone feel safe and...",
            "Therefore, we should always maintain friendly relations with our neighbors."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "A close-knit neighborhood spirit plays a crucial role in modern urban life. When neighbors cultivate friendly relationships, they look after each other’s homes and provide immediate assistance during emergencies. Furthermore, celebrating communal festivals together creates a warm and caring environment for growing children and the elderly. In conclusion, maintaining harmony and mutual respect with our neighbors brings peace of mind and builds a happier living community."
    },
    {
        "id": "u1-w5",
        "title": "Đề 5: Write a paragraph about your favorite handmade souvenir (60-80 words)",
        "description": "Viết một đoạn văn giới thiệu về một món đồ lưu niệm thủ công mà em yêu thích nhất (nón lá, bình gốm, tranh dân gian...).",
        "suggestedOutline": [
            "Introduction: Name your favorite souvenir and where you bought or received it.",
            "Body: Describe its appearance, materials, and special meaning.",
            "Conclusion: Express why it is precious to you."
        ],
        "usefulPhrases": [
            "My favorite handmade souvenir is a...",
            "It was crafted from natural materials like...",
            "What makes it unique is the intricate pattern of...",
            "I cherish this souvenir because it reminds me of..."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "My favorite handmade souvenir is a delicate poem conical hat that I bought during a school trip to Chuong Village. Made from soft palm leaves and bamboo rings, it reveals a charming landscape poem of Hanoi when held against the sunlight. It is lightweight, beautifully stitched, and practical on sunny days. I cherish this souvenir because it represents the skill of Vietnamese artisans and reminds me of an unforgettable trip with my classmates."
    }
]

unit1 = make_unit(1, "Unit 1: Local Community", "Cộng đồng địa phương & Làng nghề truyền thống", "Khám phá các làng nghề thủ công mỹ nghệ, kỹ năng giao tiếp trong cộng đồng, cụm động từ (Phrasal Verbs) và từ để hỏi trước To-infinitive.", "Ngữ âm: Nhấn trọng âm ở cụm động từ (Phrasal verbs) và ngữ điệu câu hỏi thông tin", "Users", u1_vocab, u1_grammar_info, u1_grammar_exs, u1_listening_info, u1_listening_qs, u1_listening_fibs, u1_speaking, u1_reading_info, u1_reading_qs, u1_writing_prompts)
write_ts_unit(1, unit1)
