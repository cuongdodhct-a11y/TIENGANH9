import json
from gen_unit_utils import make_unit, write_ts_unit
import gen_unit1_to_3

# ==============================================================================
# UNIT 2: CITY LIFE
# ==============================================================================
u2_vocab = [
    {"id": "u2-v1", "word": "metropolis", "phonetic": "/mɪˈtrɒpəlɪs/", "partOfSpeech": "noun", "vietnameseMeaning": "đại đô thị sầm uất", "englishExample": "Ho Chi Minh City has transformed into a bustling international metropolis.", "vietnameseExample": "Thành phố Hồ Chí Minh đã chuyển mình thành một đại đô thị quốc tế sầm uất."},
    {"id": "u2-v2", "word": "congested", "phonetic": "/kənˈʤɛstɪd/", "partOfSpeech": "adjective", "vietnameseMeaning": "tắc nghẽn, đông đúc nghẹt thở", "englishExample": "The downtown avenues become heavily congested during evening rush hours.", "vietnameseExample": "Các đại lộ trung tâm bị tắc nghẽn nặng nề trong giờ cao điểm buổi tối."},
    {"id": "u2-v3", "word": "livable", "phonetic": "/ˈlɪvəbl/", "partOfSpeech": "adjective", "vietnameseMeaning": "đáng sống, tiện nghi", "englishExample": "Da Nang is celebrated as one of the most livable coastal cities in Southeast Asia.", "vietnameseExample": "Đà Nẵng được ca ngợi là một trong những thành phố ven biển đáng sống nhất Đông Nam Á."},
    {"id": "u2-v4", "word": "metro line", "phonetic": "/ˈmɛtrəʊ laɪn/", "partOfSpeech": "noun", "vietnameseMeaning": "tuyến tàu điện ngầm đô thị", "englishExample": "The new metro line helps commuters travel across the capital in twenty minutes.", "vietnameseExample": "Tuyến tàu điện ngầm mới giúp người đi làm di chuyển khắp thủ đô chỉ trong hai mươi phút."},
    {"id": "u2-v5", "word": "amenity", "phonetic": "/əˈmiːnɪti/", "partOfSpeech": "noun", "vietnameseMeaning": "tiện ích công cộng (công viên, hồ bơi, thư viện)", "englishExample": "Modern residential complexes provide residents with high-end sports amenities.", "vietnameseExample": "Các khu phức hợp chung cư hiện đại cung cấp cho cư dân các tiện ích thể thao cao cấp."},
    {"id": "u2-v6", "word": "bustling", "phonetic": "/ˈbʌslɪŋ/", "partOfSpeech": "adjective", "vietnameseMeaning": "nhộn nhịp, hối hả", "englishExample": "The night market is bustling with street food stalls and lively acoustic music.", "vietnameseExample": "Chợ đêm nhộn nhịp với các quầy ẩm thực đường phố và âm nhạc mộc sống động."},
    {"id": "u2-v7", "word": "cost of living", "phonetic": "/kɒst ɒv ˈlɪvɪŋ/", "partOfSpeech": "noun", "vietnameseMeaning": "chi phí sinh hoạt", "englishExample": "The high cost of living in major cities forces students to budget carefully.", "vietnameseExample": "Chi phí sinh hoạt đắt đỏ tại các thành phố lớn buộc sinh viên phải chi tiêu cẩn thận."},
    {"id": "u2-v8", "word": "pavement", "phonetic": "/ˈpeɪvmənt/", "partOfSpeech": "noun", "vietnameseMeaning": "vỉa hè cho người đi bộ", "englishExample": "City authorities are clearing pavements to ensure safety for pedestrians.", "vietnameseExample": "Chính quyền thành phố đang giải tỏa vỉa hè để đảm bảo an toàn cho người đi bộ."},
    {"id": "u2-v9", "word": "commuter", "phonetic": "/kəˈmjuːtə/", "partOfSpeech": "noun", "vietnameseMeaning": "người đi làm bằng phương tiện công cộng", "englishExample": "Thousands of commuters take the elevated railway every morning.", "vietnameseExample": "Hàng ngàn người đi làm lựa chọn tuyến đường sắt trên cao mỗi buổi sáng."},
    {"id": "u2-v10", "word": "air pollution", "phonetic": "/eə pəˈluːʃən/", "partOfSpeech": "noun", "vietnameseMeaning": "ô nhiễm không khí đô thị", "englishExample": "Planting urban green corridors is vital to combat severe air pollution.", "vietnameseExample": "Trồng các hành lang cây xanh đô thị là rất quan trọng để chống lại ô nhiễm không khí nặng nề."},
    {"id": "u2-v11", "word": "skyscraper", "phonetic": "/ˈskaɪˌskreɪpə/", "partOfSpeech": "noun", "vietnameseMeaning": "tòa nhà chọc trời", "englishExample": "Landmark 81 is currently the tallest skyscraper in Viet Nam.", "vietnameseExample": "Landmark 81 hiện là tòa nhà chọc trời cao nhất Việt Nam."},
    {"id": "u2-v12", "word": "residential area", "phonetic": "/ˌrɛzɪˈdɛnʃəl ˈeərɪə/", "partOfSpeech": "noun", "vietnameseMeaning": "khu dân cư", "englishExample": "Quiet residential areas offer a peaceful refuge away from city noise.", "vietnameseExample": "Những khu dân cư yên tĩnh mang lại chốn nghỉ ngơi thanh bình tránh xa tiếng ồn thành phố."},
    {"id": "u2-v13", "word": "pedestrian zone", "phonetic": "/pɪˈdɛstrɪən zəʊn/", "partOfSpeech": "noun", "vietnameseMeaning": "phố đi bộ", "englishExample": "Nguyen Hue pedestrian zone is crowded with young people every weekend.", "vietnameseExample": "Phố đi bộ Nguyễn Huệ luôn đông đúc giới trẻ vào mỗi dịp cuối tuần."},
    {"id": "u2-v14", "word": "overcrowded", "phonetic": "/ˌəʊvəˈkraʊdɪd/", "partOfSpeech": "adjective", "vietnameseMeaning": "quá đông đúc, quá tải", "englishExample": "Public buses are often overcrowded during morning peak commute hours.", "vietnameseExample": "Xe buýt công cộng thường bị quá tải vào các khung giờ cao điểm buổi sáng."},
    {"id": "u2-v15", "word": "urbanization", "phonetic": "/ˌɜːbənaɪˈzeɪʃən/", "partOfSpeech": "noun", "vietnameseMeaning": "quá trình đô thị hóa", "englishExample": "Rapid urbanization has brought both economic opportunities and environmental challenges.", "vietnameseExample": "Đô thị hóa nhanh chóng mang lại cả cơ hội kinh tế lẫn những thách thức môi trường."},
    {"id": "u2-v16", "word": "convenience", "phonetic": "/kənˈviːniəns/", "partOfSpeech": "noun", "vietnameseMeaning": "sự tiện lợi, tiện nghi", "englishExample": "Living near convenience 24/7 stores makes daily shopping effortless.", "vietnameseExample": "Sống gần các cửa hàng tiện lợi 24/7 giúp việc mua sắm hàng ngày trở nên dễ dàng."},
    {"id": "u2-v17", "word": "infrastructure", "phonetic": "/ˈɪnfrəˌstrʌkʧə/", "partOfSpeech": "noun", "vietnameseMeaning": "cơ sở hạ tầng đô thị", "englishExample": "The municipal government invested millions into smart transport infrastructure.", "vietnameseExample": "Chính quyền thành phố đã đầu tư hàng triệu đô la vào cơ sở hạ tầng giao thông thông minh."},
    {"id": "u2-v18", "word": "get around", "phonetic": "/ɡɛt əˈraʊnd/", "partOfSpeech": "phrasal verb", "vietnameseMeaning": "di chuyển qua lại trong thành phố", "englishExample": "It is very convenient to get around Ha Noi using electric public buses.", "vietnameseExample": "Rất tiện lợi để di chuyển quanh Hà Nội bằng xe buýt điện công cộng."},
    {"id": "u2-v19", "word": "look forward to", "phonetic": "/lʊk ˈfɔːwəd tuː/", "partOfSpeech": "phrasal verb", "vietnameseMeaning": "háo hức mong đợi điều gì", "englishExample": "Citizens look forward to the opening of the new ring road expressway.", "vietnameseExample": "Người dân háo hức mong đợi ngày thông xe tuyến đường cao tốc vành đai mới."},
    {"id": "u2-v20", "word": "noise pollution", "phonetic": "/nɔɪz pəˈluːʃən/", "partOfSpeech": "noun", "vietnameseMeaning": "ô nhiễm tiếng ồn", "englishExample": "Soundproof windows help reduce noise pollution from honking vehicles.", "vietnameseExample": "Cửa sổ cách âm giúp giảm thiểu ô nhiễm tiếng ồn từ còi xe cộ."}
]

u2_grammar_info = {
    "title": "So Sánh Kép (Double Comparatives: The more... the more...)",
    "summary": "Cấu trúc so sánh kép diễn tả hai sự việc thay đổi tỉ lệ thuận hoặc nghịch: Càng... thì càng...",
    "formulaBox": [
        "The + comparative + S + V, the + comparative + S + V",
        "Tính từ ngắn: The + adj-er + S + V, the + adj-er + S + V (The bigger the city is, the noisier it gets.)",
        "Tính từ dài: The more + adj + S + V, the more + adj + S + V (The more modern the metro is, the more convenient travel becomes.)",
        "Danh từ/Động từ: The more + S + V, the more + N + S + V (The more people drive cars, the more traffic jams occur.)"
    ],
    "usagePoints": [
        {"title": "1. So sánh kép với tính từ ngắn & dài", "detail": "Dùng để diễn tả sự phát triển đồng thời của hai yếu tố đô thị.", "example": "The closer you live to downtown, the higher the rent is."},
        {"title": "2. So sánh kép với trạng từ và mệnh đề", "detail": "The faster you drive in city streets, the more dangerous it is.", "example": "The more we use green public transit, the cleaner the air becomes."}
    ]
}

u2_grammar_exs = [
    {"id": "u2-g1", "question": "The larger a metropolis grows, _____ congested its arterial roads become.", "options": ["A. the more", "B. more", "C. the most", "D. most"], "correctAnswer": "A. the more", "explanation": "Cấu trúc so sánh kép: The + comparative..., the + comparative... (the more congested)."},
    {"id": "u2-g2", "question": "The closer you reside to the city center, _____ the rent gets.", "options": ["A. the higher", "B. higher", "C. the highest", "D. as high"], "correctAnswer": "A. the higher", "explanation": "Tính từ ngắn 'high' chuyển thành so sánh hơn 'the higher'."},
    {"id": "u2-g3", "question": "The more modern the public transport system is, _____ people rely on private vehicles.", "options": ["A. the fewer", "B. the less", "C. fewer", "D. the fewest"], "correctAnswer": "A. the fewer", "explanation": "People là danh từ đếm được số nhiều, dùng 'the fewer'."},
    {"id": "u2-g4", "question": "The _____ you exercise in the urban park, the healthier you feel.", "options": ["A. more", "B. most", "C. good", "D. best"], "correctAnswer": "A. more", "explanation": "The more you exercise: bạn càng tập luyện nhiều."},
    {"id": "u2-g5", "question": "The more green trees we plant along streets, _____ the urban atmosphere becomes.", "options": ["A. the fresher", "B. freshest", "C. more fresh", "D. as fresh"], "correctAnswer": "A. the fresher", "explanation": "Tính từ ngắn 'fresh' dạng so sánh kép: 'the fresher'."},
    {"id": "u2-g6", "question": "The longer you get stuck in traffic jams, _____ you feel.", "options": ["A. the more stressed", "B. the most stressed", "C. more stressful", "D. stressed"], "correctAnswer": "A. the more stressed", "explanation": "The more stressed (bạn càng cảm thấy căng thẳng)."},
    {"id": "u2-g7", "question": "The more convenient public amenities are, _____ the living standard of citizens is.", "options": ["A. the higher", "B. highest", "C. more high", "D. as high"], "correctAnswer": "A. the higher", "explanation": "The higher the living standard: mức sống càng cao."},
    {"id": "u2-g8", "question": "The earlier you leave for school in the morning, _____ traffic you encounter.", "options": ["A. the less", "B. the fewer", "C. less", "D. least"], "correctAnswer": "A. the less", "explanation": "Traffic là danh từ không đếm được, dùng 'the less traffic'."},
    {"id": "u2-g9", "question": "The more expensive housing in downtown becomes, _____ people move to suburban districts.", "options": ["A. the more", "B. more", "C. the most", "D. most of"], "correctAnswer": "A. the more", "explanation": "The more people move: càng có nhiều người chuyển ra ngoại ô."},
    {"id": "u2-g10", "question": "The bigger the shopping mall is, _____ choices shoppers have.", "options": ["A. the more", "B. the most", "C. more", "D. many"], "correctAnswer": "A. the more", "explanation": "The more choices: càng có nhiều sự lựa chọn."},
    {"id": "u2-g11", "question": "The _____ the air quality index is, the safer it is for elderly residents to jog outdoors.", "options": ["A. better", "B. good", "C. best", "D. well"], "correctAnswer": "A. better", "explanation": "The better the air quality index is: chỉ số chất lượng không khí càng tốt."},
    {"id": "u2-g12", "question": "The more crowded the subway carriage gets, _____ comfortable passengers feel.", "options": ["A. the less", "B. the least", "C. less", "D. little"], "correctAnswer": "A. the less", "explanation": "The less comfortable: càng ít thoải mái."},
    {"id": "u2-g13", "question": "The _____ vehicles emit exhaust fumes, the worse the greenhouse effect becomes.", "options": ["A. more", "B. most", "C. much", "D. many"], "correctAnswer": "A. more", "explanation": "The more vehicles emit: càng có nhiều xe cộ thải khí."},
    {"id": "u2-g14", "question": "The faster the smart city develops, _____ job opportunities it generates.", "options": ["A. the more", "B. more", "C. most", "D. the most"], "correctAnswer": "A. the more", "explanation": "The more job opportunities: càng tạo ra nhiều cơ hội việc làm."},
    {"id": "u2-g15", "question": "The hotter the summer heatwave is in the city, _____ electricity households consume.", "options": ["A. the more", "B. the many", "C. more", "D. most"], "correctAnswer": "A. the more", "explanation": "The more electricity: càng tiêu thụ nhiều điện năng."},
    {"id": "u2-g16", "question": "The _____ noise pollution there is in the neighborhood, the sounder children sleep.", "options": ["A. less", "B. least", "C. few", "D. fewer"], "correctAnswer": "A. less", "explanation": "The less noise pollution: càng ít ô nhiễm tiếng ồn."},
    {"id": "u2-g17", "question": "The better the cycling lanes are designed, _____ people choose bicycles for commuting.", "options": ["A. the more", "B. more", "C. the most", "D. as many"], "correctAnswer": "A. the more", "explanation": "The more people choose: càng có nhiều người lựa chọn xe đạp."},
    {"id": "u2-g18", "question": "The _____ you explore historic city corners, the more fascinating stories you discover.", "options": ["A. more", "B. most", "C. much", "D. great"], "correctAnswer": "A. more", "explanation": "The more you explore: bạn càng khám phá nhiều."},
    {"id": "u2-g19", "question": "The cleaner our sidewalks and pedestrian zones are kept, _____ attractive the city looks to tourists.", "options": ["A. the more", "B. the most", "C. more", "D. as much"], "correctAnswer": "A. the more", "explanation": "The more attractive: thành phố trông càng hấp dẫn."},
    {"id": "u2-g20", "question": "The _____ you understand urban challenges, the more responsibly you protect city life.", "options": ["A. better", "B. good", "C. best", "D. well"], "correctAnswer": "A. better", "explanation": "The better you understand: bạn càng thấu hiểu rõ hơn."}
]

u2_listening_info = {
    "audioTitle": "Sống Tại Đô Thị Thông Minh (Life in a Smart Eco-City)",
    "audioDuration": "3:20",
    "audioScriptSpeaker": "City Planner Ms. Linh & High School Student Phong",
    "transcriptText": "Phong: Ms. Linh, what makes our new eco-urban district so livable and modern?\nMs. Linh: We designed the entire district around green public mobility, Phong! Automated electric buses and underground metro lines connect every neighborhood.\nPhong: Has that reduced traffic congestion during morning peak hours?\nMs. Linh: Significantly! Over seventy percent of commuters now use electric trains instead of personal motorbikes.\nPhong: What about air quality and green recreational spaces for teenagers?\nMs. Linh: We constructed rooftop community gardens and vast pedestrian boulevards where cars are strictly prohibited.",
    "vietnameseTranslation": "Phong: Chào cô Linh, điều gì đã làm cho khu đô thị sinh thái mới của chúng ta trở nên đáng sống và hiện đại như vậy ạ?\nCô Linh: Chúng tôi đã thiết kế toàn bộ khu đô thị xoay quanh giao thông công cộng xanh, Phong à! Xe buýt điện tự hành và các tuyến tàu điện ngầm kết nối mọi khu dân cư.\nPhong: Điều đó có làm giảm bớt tình trạng ùn tắc giao thông vào các khung giờ cao điểm buổi sáng không ạ?\nCô Linh: Giảm rõ rệt luôn! Hơn 70% người đi làm hiện nay sử dụng tàu điện thay vì xe máy cá nhân.\nPhong: Còn chất lượng không khí và không gian vui chơi giải trí xanh cho lứa tuổi thiếu niên thì sao ạ?\nCô Linh: Chúng tôi đã xây dựng các khu vườn cộng đồng trên sân thượng và những đại lộ đi bộ rộng lớn nơi các phương tiện xe cơ giới bị cấm hoàn toàn."
}

u2_listening_qs = [
    {"id": "u2-l1", "question": "What is the core design philosophy of the new eco-urban district?", "options": ["A. Green public mobility and electric transit", "B. Building more gas stations", "C. Banning all schools", "D. Cutting down urban trees"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'designed the entire district around green public mobility.'"},
    {"id": "u2-l2", "question": "What percentage of commuters currently use electric trains in the district?", "options": ["A. Over seventy percent", "B. Only ten percent", "C. One hundred percent", "D. Zero percent"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'Over seventy percent of commuters now use electric trains.'"},
    {"id": "u2-l3", "question": "What special green features were built on buildings for the community?", "options": ["A. Rooftop community gardens", "B. Helicopter parking lots", "C. Giant advertising billboards", "D. Steel factories"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'constructed rooftop community gardens.'"},
    {"id": "u2-l4", "question": "Are private motor cars allowed in the pedestrian boulevards?", "options": ["A. No, cars are strictly prohibited", "B. Yes, at high speed", "C. Only during night time", "D. Yes, anytime"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'pedestrian boulevards where cars are strictly prohibited.'"},
    {"id": "u2-l5", "question": "What connects every neighborhood in the eco-city?", "options": ["A. Automated electric buses and underground metro lines", "B. Only horse carts", "C. Dusty dirt roads", "D. Deep rivers without bridges"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'Automated electric buses and underground metro lines connect every neighborhood.'"},
    {"id": "u2-l6", "question": "How did the new transport system affect traffic congestion?", "options": ["A. It reduced traffic jams significantly", "B. It made traffic twice as bad", "C. It had no effect at all", "D. It stopped all travel"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'Significantly! Over seventy percent of commuters now use electric trains.'"},
    {"id": "u2-l7", "question": "Who is Phong talking to in the audio?", "options": ["A. City Planner Ms. Linh", "B. A bus driver", "C. A shopkeeper", "D. A tourist from Australia"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'City Planner Ms. Linh & High School Student Phong.'"},
    {"id": "u2-l8", "question": "Why did people switch from personal motorbikes to electric trains?", "options": ["A. Because the metro is fast, green, and convenient", "B. Because motorbikes were destroyed", "C. Because it rained every day", "D. Because tickets were banned"], "correctAnswerIndex": 0, "explanation": "Tàu điện ngầm xanh kết nối thuận tiện giúp giảm thiểu xe cá nhân."}
]

u2_listening_fibs = [
    {"id": "u2-f1", "sentenceWithBlank": "The district is designed around green public _____.", "correctWord": "mobility", "hint": "Từ chỉ sự di chuyển, giao thông linh hoạt"},
    {"id": "u2-f2", "sentenceWithBlank": "Over seventy percent of _____ take electric trains daily.", "correctWord": "commuters", "hint": "Người đi làm hàng ngày bằng phương tiện công cộng"},
    {"id": "u2-f3", "sentenceWithBlank": "Motor cars are strictly _____ in pedestrian zones.", "correctWord": "prohibited", "hint": "Bị nghiêm cấm hoàn toàn"},
    {"id": "u2-f4", "sentenceWithBlank": "Rooftop community _____ improve air quality and green space.", "correctWord": "gardens", "hint": "Những khu vườn xanh trên cao"}
]

u2_speaking = [
    {"id": "u2-s1", "targetSentence": "The more modern public transportation becomes, the easier it is to get around the city.", "ipa": "/ðə mɔː ˈmɒdən ˈpʌblɪk ˌtrænspɔːˈteɪʃən bɪˈkʌmz ðɪ ˈiːzɪər ɪt ɪz tuː ɡɛt əˈraʊnd ðə ˈsɪti/", "vietnameseMeaning": "Phương tiện giao thông công cộng càng hiện đại, việc đi lại quanh thành phố càng trở nên dễ dàng.", "contextSituation": "Nêu lợi ích của hệ thống tàu điện ngầm và xe buýt điện.", "keyPhonicsFocus": "Luyện ngữ điệu tăng giảm trong câu so sánh kép 'The more... the easier...'.", "sampleAudioText": "The more modern public transportation becomes, the easier it is to get around the city."},
    {"id": "u2-s2", "targetSentence": "Living in a bustling metropolis offers numerous entertainment facilities and career opportunities.", "ipa": "/ˈlɪvɪŋ ɪn ə ˈbʌslɪŋ mɪˈtrɒpəlɪs ˈɒfəz ˈnjuːmərəs ˌɛntəˈteɪnmənt fəˈsɪlɪtiz ænd kəˈrɪər ˌɒpəˈtjuːnɪtiz/", "vietnameseMeaning": "Sống tại một đại đô thị sầm uất mang lại vô số tiện ích giải trí và cơ hội việc làm.", "contextSituation": "Thảo luận về ưu điểm của cuộc sống thành thị.", "keyPhonicsFocus": "Phát âm chuẩn âm câm /t/ trong 'bustling' /ˈbʌslɪŋ/ và trọng âm 'metropolis'.", "sampleAudioText": "Living in a bustling metropolis offers numerous entertainment facilities and career opportunities."},
    {"id": "u2-s3", "targetSentence": "The higher the cost of living rises, the more carefully families have to manage their expenses.", "ipa": "/ðə ˈhaɪə ðə kɒst ɒv ˈlɪvɪŋ ˈraɪzɪz ðə mɔː ˈkeəfʊli ˈfæmɪliz hæv tuː ˈmænɪʤ ðeər ɪksˈpɛnsɪz/", "vietnameseMeaning": "Chi phí sinh hoạt càng tăng cao, các gia đình càng phải quản lý chi tiêu cẩn thận hơn.", "contextSituation": "Nói về áp lực tài chính tại các thành phố lớn.", "keyPhonicsFocus": "Phát âm rõ ràng đuôi /z/ trong 'rises' và 'expenses'.", "sampleAudioText": "The higher the cost of living rises, the more carefully families have to manage their expenses."},
    {"id": "u2-s4", "targetSentence": "Pedestrian zones in downtown areas provide safe walking spaces for children and elderly citizens.", "ipa": "/pɪˈdɛstrɪən zəʊnz ɪn ˈdaʊntaʊn ˈeərɪəz prəˈvaɪd seɪf ˈwɔːkɪŋ ˈspeɪsɪz fɔː ˈʧɪldrən ænd ˈɛldəli ˈsɪtɪznz/", "vietnameseMeaning": "Các tuyến phố đi bộ ở khu trung tâm mang lại không gian dạo bộ an toàn cho trẻ em và người cao tuổi.", "contextSituation": "Ủng hộ việc mở rộng không gian đi bộ đô thị.", "keyPhonicsFocus": "Phát âm chuẩn âm /z/ trong 'zones' và 'spaces'.", "sampleAudioText": "Pedestrian zones in downtown areas provide safe walking spaces for children and elderly citizens."},
    {"id": "u2-s5", "targetSentence": "The more green trees we plant along streets, the cleaner and cooler the city air feels.", "ipa": "/ðə mɔː ɡriːn triːz wiː plɑːnt əˈlɒŋ striːts ðə ˈkliːnər ænd ˈkuːlər ðə ˈsɪti eə fiːlz/", "vietnameseMeaning": "Chúng ta càng trồng nhiều cây xanh dọc các con phố, không khí thành phố càng trong lành và mát mẻ.", "contextSituation": "Kêu gọi phủ xanh đường phố đô thị.", "keyPhonicsFocus": "Phát âm chuẩn so sánh hơn 'cleaner and cooler'.", "sampleAudioText": "The more green trees we plant along streets, the cleaner and cooler the city air feels."},
    {"id": "u2-s6", "targetSentence": "Commuters can avoid exhausting traffic jams by taking the newly opened elevated railway.", "ipa": "/kəˈmjuːtəz kæn əˈvɔɪd ɪɡˈzɔːstɪŋ ˈtræfɪk ʤæmz baɪ ˈteɪkɪŋ ðə ˈnjuːli ˈəʊpənd ˈɛlɪveɪtɪd ˈreɪlweɪ/", "vietnameseMeaning": "Người đi làm có thể tránh được những vụ kẹt xe mệt mỏi bằng cách đi tuyến đường sắt trên cao mới khánh thành.", "contextSituation": "Khuyên bạn bè lựa chọn phương tiện giao thông công cộng.", "keyPhonicsFocus": "Phát âm chuẩn tính từ 'exhausting' /ɪɡˈzɔːstɪŋ/ và 'elevated'.", "sampleAudioText": "Commuters can avoid exhausting traffic jams by taking the newly opened elevated railway."},
    {"id": "u2-s7", "targetSentence": "Urban planners are installing noise barriers near highways to protect neighboring communities.", "ipa": "/ˈɜːbən ˈplænəz ɑːr ɪnˈstɔːlɪŋ nɔɪz ˈbærɪəz nɪə ˈhaɪweɪz tuː prəˈtɛkt ˈneɪbərɪŋ kəˈmjuːnɪtiz/", "vietnameseMeaning": "Các nhà quy hoạch đô thị đang lắp đặt tường cách âm gần đường cao tốc để bảo vệ các khu dân cư lân cận.", "contextSituation": "Thảo luận về các biện pháp giảm ô nhiễm tiếng ồn.", "keyPhonicsFocus": "Phát âm chuẩn cụm danh từ 'noise barriers' /nɔɪz ˈbærɪəz/.", "sampleAudioText": "Urban planners are installing noise barriers near highways to protect neighboring communities."},
    {"id": "u2-s8", "targetSentence": "The busier the city streets become at twilight, the brighter the neon lights shine.", "ipa": "/ðə ˈbɪzɪə ðə ˈsɪti striːts bɪˈkʌm æt ˈtwaɪlaɪt ðə ˈbraɪtə ðə ˈniːɒn laɪts ʃaɪn/", "vietnameseMeaning": "Đường phố càng nhộn nhịp lúc chạng vạng, những ánh đèn neon càng tỏa sáng rực rỡ.", "contextSituation": "Miêu tả vẻ đẹp lung linh của thành phố về đêm.", "keyPhonicsFocus": "Phát âm chuẩn tính từ 'twilight' /ˈtwaɪlaɪt/ và 'brighter'.", "sampleAudioText": "The busier the city streets become at twilight, the brighter the neon lights shine."},
    {"id": "u2-s9", "targetSentence": "We must carry out regular inspections to prevent illegal construction on pedestrian sidewalks.", "ipa": "/wiː mʌst ˈkæri aʊt ˈrɛɡjʊlə ɪnˈspɛkʃənz tuː prɪˈvɛnt ɪˈliːɡəl kənˈstrʌkʃən ɒn pɪˈdɛstrɪən ˈsaɪdwɔːks/", "vietnameseMeaning": "Chúng ta phải tiến hành thanh tra thường xuyên để ngăn chặn việc lấn chiếm xây dựng trái phép trên vỉa hè đi bộ.", "contextSituation": "Nói về việc giữ gìn văn minh đô thị.", "keyPhonicsFocus": "Phát âm chuẩn cụm động từ 'carry out' /ˈkæri aʊt/ và 'inspections'.", "sampleAudioText": "We must carry out regular inspections to prevent illegal construction on pedestrian sidewalks."},
    {"id": "u2-s10", "targetSentence": "Modern skyscrapers equipped with solar panels help reduce the city’s total energy footprint.", "ipa": "/ˈmɒdən ˈskaɪˌskreɪpəz ɪˈkwɪpt wɪð ˈsəʊlə ˈpænlz hɛlp rɪˈdjuːs ðə ˈsɪtiz ˈtəʊtl ˈɛnəʤi ˈfʊtprɪnt/", "vietnameseMeaning": "Các tòa nhà chọc trời hiện đại trang bị tấm pin năng lượng mặt trời giúp giảm lượng tiêu thụ năng lượng của thành phố.", "contextSituation": "Giới thiệu về kiến trúc công trình xanh.", "keyPhonicsFocus": "Phát âm chuẩn đuôi /t/ trong 'equipped' /ɪˈkwɪpt/ và 'footprint'.", "sampleAudioText": "Modern skyscrapers equipped with solar panels help reduce the city’s total energy footprint."},
    {"id": "u2-s11", "targetSentence": "The more accessible healthcare centers are, the better the well-being of urban dwellers.", "ipa": "/ðə mɔːr əkˈsɛsəbl ˈhɛlθkeə ˈsɛntəz ɑː ðə ˈbɛtə ðə wɛl-ˈbiːɪŋ ɒv ˈɜːbən ˈdwɛləz/", "vietnameseMeaning": "Các trung tâm y tế càng dễ tiếp cận, sức khỏe và đời sống của cư dân đô thị càng được nâng cao.", "contextSituation": "Bàn luận về hệ thống y tế công cộng.", "keyPhonicsFocus": "Phát âm chuẩn từ 'accessible' /əkˈsɛsəbl/ và 'dwellers'.", "sampleAudioText": "The more accessible healthcare centers are, the better the well-being of urban dwellers."},
    {"id": "u2-s12", "targetSentence": "Young people find it exciting to experience diverse culinary cultures in night markets.", "ipa": "/jʌŋ ˈpiːpl faɪnd ɪt ɪkˈsaɪtɪŋ tuː ɪksˈpɪərɪəns daɪˈvɜːs ˈkʌlɪnəri ˈkʌlʧəz ɪn naɪt ˈmɑːkɪts/", "vietnameseMeaning": "Giới trẻ thấy rất hào hứng khi được trải nghiệm nền văn hóa ẩm thực đa dạng tại các khu chợ đêm.", "contextSituation": "Kể về sở thích khám phá ẩm thực đường phố.", "keyPhonicsFocus": "Phát âm chuẩn tính từ 'culinary' /ˈkʌlɪnəri/ và 'diverse'.", "sampleAudioText": "Young people find it exciting to experience diverse culinary cultures in night markets."},
    {"id": "u2-s13", "targetSentence": "The more effectively we recycle domestic waste, the less polluted our landfill sites will be.", "ipa": "/ðə mɔːr ɪˈfɛktɪvli wiː ˌriːˈsaɪkl dəʊˈmɛstɪk weɪst ðə lɛs pəˈluːtɪd ˈaʊə ˈlændfɪl saɪts wɪl biː/", "vietnameseMeaning": "Chúng ta càng tái chế rác thải sinh hoạt hiệu quả, các bãi chôn lấp rác sẽ càng ít bị ô nhiễm hơn.", "contextSituation": "Tuyên truyền phân loại rác tại nguồn.", "keyPhonicsFocus": "Phát âm chuẩn trạng từ 'effectively' /ɪˈfɛktɪvli/ và 'domestic'.", "sampleAudioText": "The more effectively we recycle domestic waste, the less polluted our landfill sites will be."},
    {"id": "u2-s14", "targetSentence": "Da Nang is widely recognized as a clean, peaceful, and hospitable destination for travelers.", "ipa": "/dɑː næŋ ɪz ˈwaɪdli ˈrɛkəɡnaɪzd æz ə kliːn ˈpiːsfʊl ænd ˈhɒspɪtəbl ˌdɛstɪˈneɪʃən fɔː ˈtrævələz/", "vietnameseMeaning": "Đà Nẵng được công nhận rộng rãi là một điểm đến sạch đẹp, thanh bình và hiếu khách đối với du khách.", "contextSituation": "Giới thiệu thành phố đáng sống Đà Nẵng.", "keyPhonicsFocus": "Phát âm chuẩn tính từ 'hospitable' /ˈhɒspɪtəbl/ và 'recognized'.", "sampleAudioText": "Da Nang is widely recognized as a clean, peaceful, and hospitable destination for travelers."},
    {"id": "u2-s15", "targetSentence": "The worse the morning smog is, the more essential wearing protective face masks becomes.", "ipa": "/ðə wɜːs ðə ˈmɔːnɪŋ smɒɡ ɪz ðə mɔːr ɪˈsɛnʃəl ˈweərɪŋ prəˈtɛktɪv feɪs mɑːsks bɪˈkʌmz/", "vietnameseMeaning": "Sương mù ô nhiễm buổi sáng càng dày đặc, việc đeo khẩu trang bảo vệ càng trở nên cần thiết hơn.", "contextSituation": "Cảnh báo bảo vệ sức khỏe trước bụi mịn đô thị.", "keyPhonicsFocus": "Phát âm chuẩn âm /ɡ/ trong 'smog' và /ʃ/ trong 'essential'.", "sampleAudioText": "The worse the morning smog is, the more essential wearing protective face masks becomes."},
    {"id": "u2-s16", "targetSentence": "Smart traffic light sensors automatically adjust timing to ease congested road intersections.", "ipa": "/smɑːt ˈtræfɪk laɪt ˈsɛnsəz ˌɔːtəˈmætɪkəli əˈʤʌst ˈtaɪmɪŋ tuː iːz kənˈʤɛstɪd rəʊd ˌɪntəˈsɛkʃənz/", "vietnameseMeaning": "Các cảm biến đèn giao thông thông minh tự động điều chỉnh chu kỳ để giảm ùn tắc tại các nút giao cắt.", "contextSituation": "Nói về ứng dụng trí tuệ nhân tạo trong điều tiết giao thông.", "keyPhonicsFocus": "Phát âm chuẩn động từ 'adjust' /əˈʤʌst/ và 'intersections'.", "sampleAudioText": "Smart traffic light sensors automatically adjust timing to ease congested road intersections."},
    {"id": "u2-s17", "targetSentence": "Many young professionals move to the suburbs to enjoy a quieter and more relaxed lifestyle.", "ipa": "/ˈmɛni jʌŋ prəˈfɛʃənlz muːv tuː ðə ˈsʌbɜːbz tuː ɪnˈʤɔɪ ə ˈkwaɪətər ænd mɔː rɪˈlækst ˈlaɪfstaɪl/", "vietnameseMeaning": "Nhiều người trẻ đi làm chọn chuyển ra vùng ngoại ô để tận hưởng lối sống yên tĩnh và thư thái hơn.", "contextSituation": "Giải thích xu hướng chuyển dịch dân cư ra ngoại thành.", "keyPhonicsFocus": "Phát âm chuẩn danh từ 'suburbs' /ˈsʌbɜːbz/ và 'professionals'.", "sampleAudioText": "Many young professionals move to the suburbs to enjoy a quieter and more relaxed lifestyle."},
    {"id": "u2-s18", "targetSentence": "The more efficiently cities manage stormwater drainage, the fewer floods occur during heavy storms.", "ipa": "/ðə mɔːr ɪˈfɪʃəntli ˈsɪtiz ˈmænɪʤ ˈstɔːmwɔːtə ˈdreɪnɪʤ ðə ˈfjuːə flʌdz əˈkɜː ˈdjʊərɪŋ ˈhɛvi stɔːmz/", "vietnameseMeaning": "Các thành phố càng quản lý hệ thống thoát nước mưa hiệu quả, càng ít xảy ra ngập lụt khi có mưa bão lớn.", "contextSituation": "Nói về giải pháp chống ngập đô thị.", "keyPhonicsFocus": "Phát âm chuẩn từ 'drainage' /ˈdreɪnɪʤ/ và 'efficiently'.", "sampleAudioText": "The more efficiently cities manage stormwater drainage, the fewer floods occur during heavy storms."},
    {"id": "u2-s19", "targetSentence": "Community libraries and cultural centers offer free learning spaces for underprivileged students.", "ipa": "/kəˈmjuːnɪti ˈlaɪbrəriz ænd ˈkʌlʧərəl ˈsɛntəz ˈɒfə friː ˈlɜːnɪŋ ˈspeɪsɪz fɔːr ˌʌndəˈprɪvɪlɪʤd ˈstjuːdnts/", "vietnameseMeaning": "Các thư viện cộng đồng và nhà văn hóa cung cấp không gian học tập miễn phí cho học sinh có hoàn cảnh khó khăn.", "contextSituation": "Khen ngợi các công trình phúc lợi xã hội đô thị.", "keyPhonicsFocus": "Phát âm chuẩn từ 'underprivileged' /ˌʌndəˈprɪvɪlɪʤd/.", "sampleAudioText": "Community libraries and cultural centers offer free learning spaces for underprivileged students."},
    {"id": "u2-s20", "targetSentence": "Building a smart and civilized city requires the active cooperation of every responsible citizen.", "ipa": "/ˈbɪldɪŋ ə smɑːt ænd ˈsɪvɪlaɪzd ˈsɪti rɪˈkwaɪəz ði ˈæktɪv kəʊˌɒpəˈreɪʃən ɒv ˈɛvri rɪsˈpɒnsəbl ˈsɪtɪzn/", "vietnameseMeaning": "Xây dựng một thành phố thông minh và văn minh đòi hỏi sự chung tay tích cực của mỗi người công dân có trách nhiệm.", "contextSituation": "Thông điệp kết luận về tinh thần công dân đô thị.", "keyPhonicsFocus": "Phát âm chuẩn tính từ 'civilized' /ˈsɪvɪlaɪzd/ và 'responsible'.", "sampleAudioText": "Building a smart and civilized city requires the active cooperation of every responsible citizen."}
]

u2_reading_info = {
    "title": "Chuyển Mình Thành Đại Đô Thị Đáng Sống: Tầm Nhìn Xanh Của Các Thành Phố Tương Lai",
    "topic": "Đô thị hóa bền vững & Giao thông xanh",
    "passageText": "Over the past three decades, Southeast Asian cities have witnessed extraordinary economic transformations accompanied by relentless population growth. Mega-cities like Bangkok, Jakarta, and Ho Chi Minh City face pressing challenges: relentless traffic congestion, soaring living costs, and alarming air pollution indices. In response, municipal planners are pioneering transformative models to construct greener and more livable urban environments.\n\nA cornerstone of this urban revolution is transit-oriented development (TOD). Instead of relying on gasoline-powered private cars and motorbikes, modern cities are expanding electric metro lines, zero-emission bus rapid transit (BRT), and dedicated cycling corridors. Studies consistently prove that the more accessible high-speed public transit becomes, the fewer carbon emissions cities produce.\n\nFurthermore, forward-thinking cities are integrating the '15-Minute City' framework. In these smart communities, residents can reach essential daily amenities—schools, organic grocery markets, medical clinics, and recreational green parks—within a fifteen-minute stroll or bicycle ride from their doorsteps. By decentralizing urban services, cities not only slash commute times but also rejuvenate neighborhood bonds and improve public health.",
    "keyVocabularyHighlights": [
        {"word": "transit-oriented development", "meaning": "mô hình phát triển đô thị gắn liền với giao thông công cộng"},
        {"word": "zero-emission transit", "meaning": "phương tiện giao thông không phát thải khí nhà kính"},
        {"word": "15-Minute City framework", "meaning": "mô hình thành phố 15 phút (mọi tiện ích trong bán kính 15 phút đi bộ)"},
        {"word": "decentralizing urban services", "meaning": "phi tập trung hóa các dịch vụ tiện ích đô thị"}
    ]
}

u2_reading_qs = [
    {"id": "u2-r1", "question": "What major challenges do rapidly expanding Southeast Asian mega-cities face?", "options": ["A. Lack of rainfall", "B. Traffic congestion, soaring living costs, and alarming air pollution", "C. Too few buildings", "D. Cold snowy winters"], "correctAnswerIndex": 1, "explanation": "Trong đoạn 1: 'traffic congestion, soaring living costs, and alarming air pollution indices.'"},
    {"id": "u2-r2", "question": "What is transit-oriented development (TOD) centered around?", "options": ["A. Encouraging more private gasoline cars", "B. Expanding electric metro lines, zero-emission buses, and cycling corridors", "C. Closing down public transit", "D. Building airports in every neighborhood"], "correctAnswerIndex": 1, "explanation": "Trong đoạn 2: 'expanding electric metro lines, zero-emission bus rapid transit (BRT), and dedicated cycling corridors.'"},
    {"id": "u2-r3", "question": "According to the passage, what happens when public transit becomes more accessible?", "options": ["A. Cities produce fewer carbon emissions", "B. Streets become dirtier", "C. Train tickets become completely useless", "D. People stop going to work"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'the more accessible high-speed public transit becomes, the fewer carbon emissions cities produce.'"},
    {"id": "u2-r4", "question": "What is the core principle of the '15-Minute City' framework?", "options": ["A. Everyone must work fifteen hours a day", "B. Residents can reach essential daily amenities within a 15-minute walk or bike ride", "C. Buses only run every fifteen days", "D. All shops close after 15 minutes"], "correctAnswerIndex": 1, "explanation": "Trong đoạn 3: 'residents can reach essential daily amenities... within a fifteen-minute stroll or bicycle ride.'"},
    {"id": "u2-r5", "question": "What benefits does decentralizing urban services bring to citizens?", "options": ["A. It slashes commute times, rejuvenates neighborhood bonds, and improves public health", "B. It forces everyone to buy expensive cars", "C. It shuts down all parks", "D. It increases noise pollution"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'slash commute times but also rejuvenate neighborhood bonds and improve public health.'"},
    {"id": "u2-r6", "question": "Which of the following cities is explicitly mentioned in paragraph 1?", "options": ["A. Paris", "B. Ho Chi Minh City", "C. New York", "D. Tokyo"], "correctAnswerIndex": 1, "explanation": "Trong đoạn 1: 'Mega-cities like Bangkok, Jakarta, and Ho Chi Minh City.'"},
    {"id": "u2-r7", "question": "Which word in paragraph 1 is closest in meaning to 'relentless'?", "options": ["A. Continuous and unyielding / Non-stop", "B. Gentle", "C. Temporary", "D. Weak"], "correctAnswerIndex": 0, "explanation": "'Relentless' mang ý nghĩa liên tục, không ngừng nghỉ (relentless traffic congestion)."},
    {"id": "u2-r8", "question": "Which word in paragraph 3 is closest in meaning to 'stroll'?", "options": ["A. A leisurely and relaxing walk", "B. A fast flight", "C. A car race", "D. A swimming contest"], "correctAnswerIndex": 0, "explanation": "'Stroll' có nghĩa là đi dạo thong thả, thư thái."},
    {"id": "u2-r9", "question": "Which mode of transportation is promoted as zero-emission in the text?", "options": ["A. Heavy diesel trucks", "B. Bus rapid transit (BRT) and electric metro lines", "C. Old gasoline motorbikes", "D. Coal-powered locomotives"], "correctAnswerIndex": 1, "explanation": "Trong đoạn 2: 'zero-emission bus rapid transit (BRT).'"},
    {"id": "u2-r10", "question": "What is the best title for this passage?", "options": ["A. The Dangers of Walking in the Rain", "B. Transforming Into Livable Megacities: The Green Vision of Future Urban Living", "C. Why Suburbs Are Abandoned", "D. The History of Private Automobiles"], "correctAnswerIndex": 1, "explanation": "Bài viết làm nổi bật sự chuyển đổi xanh và tầm nhìn xây dựng đô thị đáng sống của tương lai."}
]

u2_writing_prompts = [
    {
        "id": "u2-w1",
        "title": "Đề 1: Write a paragraph about the advantages of living in a big city (60-80 words)",
        "description": "Viết một đoạn văn nêu các lợi ích nổi bật của cuộc sống ở các thành phố lớn (tiện ích hiện đại, cơ hội giáo dục, y tế...).",
        "suggestedOutline": [
            "Introduction: State your general opinion on city life.",
            "Body: Highlight 2 main advantages (modern amenities & excellent educational/career opportunities).",
            "Conclusion: Summarize why city life is dynamic and appealing."
        ],
        "usefulPhrases": [
            "Living in a major city offers numerous remarkable advantages...",
            "First, residents have convenient access to high-quality amenities such as...",
            "Second, big cities provide abundant educational facilities and job prospects...",
            "In conclusion, urban living is dynamic, convenient, and full of opportunities."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Living in a major city offers numerous remarkable advantages. First, residents enjoy convenient access to top-tier healthcare, reputable schools, and modern public transit like electric metro lines. Second, big cities provide abundant entertainment amenities such as shopping malls, cinemas, and pedestrian walking zones. The more developed the city is, the more diverse career opportunities young people can explore. In conclusion, urban life is vibrant, convenient, and fosters personal growth."
    },
    {
        "id": "u2-w2",
        "title": "Đề 2: Write a paragraph discussing a major problem of city life and propose solutions (60-80 words)",
        "description": "Viết một đoạn văn về một vấn đề nhức nhối ở thành phố (kẹt xe hoặc ô nhiễm) và đề xuất giải pháp.",
        "suggestedOutline": [
            "Introduction: Identify the problem (e.g., traffic congestion).",
            "Body: Explain its negative effects and give 2 practical solutions (using public transit, carpooling).",
            "Conclusion: Emphasize that community cooperation will make the city better."
        ],
        "usefulPhrases": [
            "One of the most pressing issues in big cities is severe traffic congestion...",
            "This problem causes excessive stress and increases air pollution...",
            "To alleviate this, city authorities should expand electric bus routes and...",
            "Furthermore, citizens should choose public transit instead of personal vehicles."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "One of the most pressing problems in major cities is severe traffic congestion during rush hours. This issue wastes valuable time and worsens urban air pollution. To solve this, municipal authorities should expand electric metro lines and construct dedicated cycling lanes. Additionally, citizens should be encouraged to use public transit and carpool. If everyone cooperates, our city roads will become safer, smoother, and much greener."
    },
    {
        "id": "u2-w3",
        "title": "Đề 3: Write a paragraph comparing city life and countryside life (60-80 words)",
        "description": "Viết một đoạn văn so sánh cuộc sống thành thị và nông thôn, nêu rõ sở thích của bản thân.",
        "suggestedOutline": [
            "Introduction: Introduce the difference between city and country life.",
            "Body: Compare pace of life, air quality, and modern conveniences.",
            "Conclusion: State which environment you prefer and why."
        ],
        "usefulPhrases": [
            "There are distinct differences between city life and rural living...",
            "While cities are bustling and offer modern conveniences, the countryside is...",
            "The cleaner the country air is, the more peaceful life feels...",
            "Personally, I prefer... because..."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "There are striking contrasts between urban and rural living. City life is fast-paced, offering modern conveniences, diverse entertainment, and high-paying jobs. In contrast, the countryside provides a peaceful atmosphere, fresh air, and close neighborhood solidarity. While living in the city can be noisy and congested, its dynamic environment helps teenagers develop modern skills. Personally, I prefer city life because it offers endless opportunities for learning and personal advancement."
    },
    {
        "id": "u2-w4",
        "title": "Đề 4: Write a paragraph describing your ideal smart city in the future (60-80 words)",
        "description": "Viết một đoạn văn miêu tả thành phố thông minh trong mơ của em trong tương lai.",
        "suggestedOutline": [
            "Introduction: Introduce your vision of the future smart city.",
            "Body: Describe smart features (AI traffic management, 100% renewable solar energy, rooftop parks).",
            "Conclusion: State how this smart city will improve human well-being."
        ],
        "usefulPhrases": [
            "My ideal future city is a smart and eco-friendly metropolis...",
            "All vehicles will be powered by clean electricity and managed by AI sensors...",
            "Skyscrapers will be covered with rooftop gardens to purify the air...",
            "Living in such an innovative city will guarantee a sustainable and happy lifestyle."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "My ideal future city is a smart, zero-emission metropolis powered entirely by renewable solar and wind energy. Automated electric buses and underground maglev trains will connect all neighborhoods, eliminating traffic jams. Furthermore, every skyscraper will feature rooftop green parks and AI waste recycling systems. Essential amenities will be reachable within a ten-minute walk. Living in such an innovative city will provide citizens with a clean, safe, and truly sustainable lifestyle."
    },
    {
        "id": "u2-w5",
        "title": "Đề 5: Write a paragraph about the benefits of pedestrian walking streets (60-80 words)",
        "description": "Viết một đoạn văn nêu lợi ích của các tuyến phố đi bộ đối với cư dân thành thị và du khách.",
        "suggestedOutline": [
            "Introduction: Introduce downtown pedestrian zones (e.g., Nguyen Hue or Hoan Kiem walking streets).",
            "Body: Explain benefits (safe walking, cultural street performances, reducing vehicular emissions).",
            "Conclusion: Confirm why more pedestrian zones should be created."
        ],
        "usefulPhrases": [
            "Pedestrian walking zones have become popular highlights in modern cities...",
            "First, they create a safe and vehicle-free space where families can stroll and...",
            "Second, they host lively street art performances and traditional folk games...",
            "Therefore, establishing more pedestrian streets enhances city livability."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Pedestrian walking streets have become wonderful highlights in major Vietnamese cities. First, they provide safe, vehicle-free spaces where children and adults can stroll comfortably without worrying about traffic accidents. Second, these zones host vibrant acoustic concerts, traditional folk games, and delicious street food stalls on weekends. They also help reduce vehicle exhaust fumes downtown. In conclusion, expanding pedestrian zones creates a joyful community atmosphere and makes our cities far more livable."
    }
]

unit2 = make_unit(2, "Unit 2: City Life", "Cuộc sống đô thị & Giao thông hiện đại", "Tìm hiểu cuộc sống thành thị, đô thị thông minh, tiện ích công cộng và cấu trúc so sánh kép (The more... the more...).", "Ngữ âm: Ngữ điệu câu so sánh kép và nối âm phụ âm - nguyên âm trong giao tiếp", "Building", u2_vocab, u2_grammar_info, u2_grammar_exs, u2_listening_info, u2_listening_qs, u2_listening_fibs, u2_speaking, u2_reading_info, u2_reading_qs, u2_writing_prompts)
write_ts_unit(2, unit2)

print("Unit 1 and Unit 2 successfully generated!")
