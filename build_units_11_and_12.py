import json
from gen_unit_utils import make_unit, write_ts_unit

# ==============================================================================
# UNIT 11: CHANGING ROLES IN SOCIETY
# ==============================================================================
u11_vocab = [
    {"id": "u11-v1", "word": "gender equality", "phonetic": "/ˈʤɛndə iːˈkwɒlɪti/", "partOfSpeech": "noun", "vietnameseMeaning": "bình đẳng giới giữa nam và nữ", "englishExample": "Achieving true gender equality ensures that women and men enjoy equal educational and professional opportunities.", "vietnameseExample": "Đạt được bình đẳng giới thực chất đảm bảo phụ nữ và nam giới đều được hưởng các cơ hội học tập và nghề nghiệp bình đẳng."},
    {"id": "u11-v2", "word": "breadwinner", "phonetic": "/ˈbrɛdˌwɪnə/", "partOfSpeech": "noun", "vietnameseMeaning": "người trụ cột kiếm tiền nuôi sống gia đình", "englishExample": "In modern households, both spouses often share the role of primary breadwinner equally.", "vietnameseExample": "Trong các gia đình hiện đại, cả vợ lẫn chồng thường cùng chia sẻ vai trò là người trụ cột kinh tế một cách bình đẳng."},
    {"id": "u11-v3", "word": "homemaker", "phonetic": "/ˈhəʊmˌmeɪkə/", "partOfSpeech": "noun", "vietnameseMeaning": "người nội trợ, quán xuyến việc nhà", "englishExample": "Being a homemaker involves managing household finances, childcare, and family well-being.", "vietnameseExample": "Làm người nội trợ bao gồm việc quản lý tài chính gia đình, chăm sóc con cái và chăm lo hạnh phúc gia đình."},
    {"id": "u11-v4", "word": "empowerment", "phonetic": "/ɪmˈpaʊəmənt/", "partOfSpeech": "noun", "vietnameseMeaning": "sự trao quyền, nâng cao vị thế và năng lực", "englishExample": "Female empowerment programs provide rural women with business leadership and digital skills.", "vietnameseExample": "Các chương trình nâng cao vị thế phụ nữ cung cấp cho phụ nữ nông thôn kỹ năng lãnh đạo kinh doanh và kỹ năng số."},
    {"id": "u11-v5", "word": "societal", "phonetic": "/səˈsaɪətl/", "partOfSpeech": "adjective", "vietnameseMeaning": "thuộc về toàn xã hội", "englishExample": "Societal perceptions of traditional gender stereotypes have evolved dramatically in recent years.", "vietnameseExample": "Nhận thức xã hội về các định kiến giới truyền thống đã có bước phát triển thay đổi rõ rệt trong những năm gần đây."},
    {"id": "u11-v6", "word": "automation", "phonetic": "/ˌɔːtəˈmeɪʃən/", "partOfSpeech": "noun", "vietnameseMeaning": "quá trình tự động hóa máy móc công nghiệp", "englishExample": "Industrial automation will handle repetitive manual tasks, freeing workers for creative problem-solving.", "vietnameseExample": "Tự động hóa công nghiệp sẽ đảm nhiệm các công việc chân tay lặp đi lặp lại, giải phóng người lao động để làm các việc sáng tạo."},
    {"id": "u11-v7", "word": "workplace diversity", "phonetic": "/ˈwɜːkpleɪs daɪˈvɜːsɪti/", "partOfSpeech": "noun", "vietnameseMeaning": "sự đa dạng văn hóa và giới tính nơi làm việc", "englishExample": "Promoting workplace diversity fosters higher creativity, innovation, and employee satisfaction.", "vietnameseExample": "Thúc đẩy sự đa dạng nơi làm việc nuôi dưỡng sự sáng tạo, đổi mới và mức độ hài lòng của nhân viên cao hơn."},
    {"id": "u11-v8", "word": "financial independence", "phonetic": "/faɪˈnænʃəl ˌɪndɪˈpɛndəns/", "partOfSpeech": "noun", "vietnameseMeaning": "sự độc lập tự chủ về tài chính cá nhân", "englishExample": "Gaining financial independence allows individuals to pursue their passions with confidence.", "vietnameseExample": "Đạt được sự độc lập tài chính cho phép mỗi cá nhân tự tin theo đuổi đam mê của mình."},
    {"id": "u11-v9", "word": "paternity leave", "phonetic": "/pəˈtɜːnɪti liːv/", "partOfSpeech": "noun", "vietnameseMeaning": "chế độ nghỉ thai sản dành cho người cha", "englishExample": "Progressive labor laws now offer extended paternity leave so fathers can nurture newborn babies.", "vietnameseExample": "Luật lao động tiến bộ hiện nay cung cấp kỳ nghỉ thai sản cho người cha để các ông bố có thể chăm sóc con sơ sinh."},
    {"id": "u11-v10", "word": "stereotype", "phonetic": "/ˈstɛrɪətaɪp/", "partOfSpeech": "noun", "vietnameseMeaning": "định kiến, khuôn mẫu rập khuôn", "englishExample": "Education helps shatter outdated stereotypes about what careers men and women should choose.", "vietnameseExample": "Giáo dục giúp xóa bỏ những định kiến lỗi thời về ngành nghề mà nam giới hay nữ giới nên lựa chọn."},
    {"id": "u11-v11", "word": "collaborative", "phonetic": "/kəˈlæbərətɪv/", "partOfSpeech": "adjective", "vietnameseMeaning": "mang tính hợp tác cùng nhau", "englishExample": "Modern workplace environments emphasize collaborative teamwork and emotional empathy.", "vietnameseExample": "Môi trường làm việc hiện đại nhấn mạnh vào tinh thần làm việc nhóm hợp tác và sự thấu cảm cảm xúc."},
    {"id": "u11-v12", "word": "future passive", "phonetic": "/ˈfjuːʧə ˈpæsɪv/", "partOfSpeech": "noun", "vietnameseMeaning": "thể bị động thì tương lai đơn (will be + V3/ed)", "englishExample": "In the future passive, we say: 'More green jobs will be created by renewable energy sectors.'", "vietnameseExample": "Ở thể bị động tương lai, ta nói: 'Nhiều việc làm xanh hơn sẽ được tạo ra bởi các ngành năng lượng tái tạo.'"},
    {"id": "u11-v13", "word": "work-life balance", "phonetic": "/wɜːk laɪf ˈbæləns/", "partOfSpeech": "noun", "vietnameseMeaning": "sự cân bằng giữa công việc và đời sống cá nhân", "englishExample": "Flexible remote working schedules help employees maintain a healthy work-life balance.", "vietnameseExample": "Lịch làm việc từ xa linh hoạt giúp nhân viên duy trì sự cân bằng lành mạnh giữa công việc và cuộc sống."},
    {"id": "u11-v14", "word": "telecommuting", "phonetic": "/ˈtɛlɪkəˌmjuːtɪŋ/", "partOfSpeech": "noun", "vietnameseMeaning": "hình thức làm việc từ xa qua mạng internet", "englishExample": "Telecommuting allows professionals to collaborate with global clients without long daily commutes.", "vietnameseExample": "Làm việc từ xa cho phép các chuyên gia hợp tác với khách hàng toàn cầu mà không cần phải di chuyển xa mỗi ngày."},
    {"id": "u11-v15", "word": "resilience", "phonetic": "/rɪˈzɪlɪəns/", "partOfSpeech": "noun", "vietnameseMeaning": "sự kiên cường, khả năng thích ứng linh hoạt", "englishExample": "Building emotional resilience enables workers to thrive amid technological disruptions.", "vietnameseExample": "Xây dựng sự kiên cường tâm lý cho phép người lao động phát triển mạnh mẽ giữa các làn sóng đột phá công nghệ."},
    {"id": "u11-v16", "word": "equal opportunity", "phonetic": "/ˈiːkwəl ˌɒpəˈtjuːnɪti/", "partOfSpeech": "noun", "vietnameseMeaning": "cơ hội bình đẳng cho tất cả mọi người", "englishExample": "Modern companies are committed to providing equal opportunities regardless of gender or background.", "vietnameseExample": "Các công ty hiện đại cam kết mang lại cơ hội bình đẳng bất kể giới tính hay xuất thân."},
    {"id": "u11-v17", "word": "artificial intelligence", "phonetic": "/ˌɑːtɪˈfɪʃəl ɪnˈtɛlɪʤəns/", "partOfSpeech": "noun", "vietnameseMeaning": "trí tuệ nhân tạo (AI)", "englishExample": "Artificial intelligence will be integrated into healthcare to diagnose rare conditions accurately.", "vietnameseExample": "Trí tuệ nhân tạo sẽ được tích hợp vào ngành y tế để chẩn đoán chính xác các bệnh lý hiếm gặp."},
    {"id": "u11-v18", "word": "lifelong learning", "phonetic": "/ˈlaɪflɒŋ ˈlɜːnɪŋ/", "partOfSpeech": "noun", "vietnameseMeaning": "tinh thần học tập suốt đời", "englishExample": "Cultivating a lifelong learning mindset is critical for thriving in the 21st-century knowledge economy.", "vietnameseExample": "Nuôi dưỡng tinh thần học tập suốt đời là điều then chốt để thành công trong nền kinh tế tri thức thế kỷ 21."},
    {"id": "u11-v19", "word": "leadership", "phonetic": "/ˈliːdəʃɪp/", "partOfSpeech": "noun", "vietnameseMeaning": "năng lực lãnh đạo, vai trò người đứng đầu", "englishExample": "More women are assuming executive leadership positions in global technology giants.", "vietnameseExample": "Ngày càng có nhiều phụ nữ đảm nhận các vị trí lãnh đạo cấp cao tại các tập đoàn công nghệ khổng lồ."},
    {"id": "u11-v20", "word": "harmonious", "phonetic": "/hɑːˈməʊnjəs/", "partOfSpeech": "adjective", "vietnameseMeaning": "hài hòa, êm ấm, thuận hòa", "englishExample": "Sharing domestic responsibilities fosters a harmonious and mutually supportive marriage.", "vietnameseExample": "Chia sẻ trách nhiệm việc nhà nuôi dưỡng một cuộc sống hôn nhân êm ấm và hỗ trợ lẫn nhau."}
]

u11_grammar_info = {
    "title": "Bị Động Tương Lai (Future Passive: Will be + V3/ed) & Mệnh Đề Quan Hệ Không Xác Định",
    "summary": "Bị động tương lai đơn diễn tả hành động sẽ được thực hiện trong tương lai. Mệnh đề quan hệ không xác định (Non-defining Relative Clauses) bổ sung thông tin cho danh từ riêng hoặc danh từ đã xác định rõ.",
    "formulaBox": [
        "Future Passive: S + will be + V3/ed (By 2030, thousands of green jobs will be created).",
        "Phủ định: S + will not (won't) be + V3/ed",
        "Nghi vấn: Will + S + be + V3/ed?",
        "Non-defining Relative Clause: Noun (đã xác định) + , + who / which / where / whose + ... + , + V",
        "Ví dụ: Dr. Mai, WHO has led the renewable energy lab for a decade, won the national science award."
    ],
    "usagePoints": [
        {"title": "1. Sử dụng bị động tương lai trong dự báo xã hội", "detail": "Dùng khi nói về các xu hướng phát triển công nghệ và chuyển dịch nghề nghiệp.", "example": "Repetitive assembly jobs will be replaced by automated robotics."},
        {"title": "2. Tuyệt đối không dùng THAT trong mệnh đề không xác định", "detail": "Mệnh đề sau dấu phẩy chỉ dùng who, which, where, whose (không dùng that).", "example": "Ha Noi, WHICH is modernizing rapidly, is home to millions of dynamic youth."}
    ]
}

u11_grammar_exs = [
    {"id": "u11-g1", "question": "In the near future, repetitive factory tasks _____ by automated intelligent robots.", "options": ["A. will be handled", "B. will handle", "C. is handled", "D. was handled"], "correctAnswer": "A. will be handled", "explanation": "Bị động thì tương lai đơn: 'will be handled'."},
    {"id": "u11-g2", "question": "Dr. Ha, _____ founded the social enterprise for disabled youth, received an international award.", "options": ["A. who", "B. that", "C. which", "D. whom"], "correctAnswer": "A. who", "explanation": "Mệnh đề không xác định sau tên riêng 'Dr. Ha': dùng 'who' (không dùng that)."},
    {"id": "u11-g3", "question": "More scholarships _____ to talented female students pursuing engineering degrees next term.", "options": ["A. will be awarded", "B. will award", "C. are awarding", "D. awarded"], "correctAnswer": "A. will be awarded", "explanation": "Bị động tương lai: 'will be awarded'."},
    {"id": "u11-g4", "question": "My father, _____ is an architect, fully supports equal household responsibilities.", "options": ["A. who", "B. which", "C. that", "D. whom"], "correctAnswer": "A. who", "explanation": "Mệnh đề không xác định sau 'My father': dùng 'who'."},
    {"id": "u11-g5", "question": "Equal employment opportunities _____ to all candidates regardless of their gender.", "options": ["A. will be guaranteed", "B. will guarantee", "C. guarantees", "D. has guaranteed"], "correctAnswer": "A. will be guaranteed", "explanation": "'will be guaranteed' (sẽ được đảm bảo)."},
    {"id": "u11-g6", "question": "Smart home appliances, _____ save considerable cooking time, will become affordable for everyone.", "options": ["A. which", "B. that", "C. who", "D. whose"], "correctAnswer": "A. which", "explanation": "Mệnh đề không xác định sau dấu phẩy bổ nghĩa cho 'Smart home appliances': dùng 'which'."},
    {"id": "u11-g7", "question": "A new law on extended paternity leave _____ by the National Assembly next month.", "options": ["A. will be debated", "B. will debate", "C. is debating", "D. was debated"], "correctAnswer": "A. will be debated", "explanation": "'will be debated' (sẽ được thảo luận)."},
    {"id": "u11-g8", "question": "Professor Lan, _____ research on AI ethics is world-famous, delivered an inspiring keynote.", "options": ["A. whose", "B. who", "C. which", "D. that"], "correctAnswer": "A. whose", "explanation": "'whose research' (công trình nghiên cứu của Giáo sư Lan)."},
    {"id": "u11-g9", "question": "Millions of electric vehicles _____ on city streets over the next decade.", "options": ["A. will be deployed", "B. will deploy", "C. are deploying", "D. deployed"], "correctAnswer": "A. will be deployed", "explanation": "'will be deployed' (sẽ được triển khai đưa vào sử dụng)."},
    {"id": "u11-g10", "question": "Telecommuting, _____ allows people to work remotely, will reshape urban lifestyles.", "options": ["A. which", "B. that", "C. who", "D. whose"], "correctAnswer": "A. which", "explanation": "'which' trong mệnh đề không xác định."},
    {"id": "u11-g11", "question": "New digital training centers _____ in rural highlands next summer.", "options": ["A. will be built", "B. will build", "C. are building", "D. built"], "correctAnswer": "A. will be built", "explanation": "'will be built' (sẽ được xây dựng)."},
    {"id": "u11-g12", "question": "Mr. Nam, _____ shares all domestic chores with his wife, is a role model for his children.", "options": ["A. who", "B. that", "C. which", "D. whom"], "correctAnswer": "A. who", "explanation": "'who' thay cho 'Mr. Nam'."},
    {"id": "u11-g13", "question": "Old stereotypes about women only being homemakers _____ by future generations.", "options": ["A. will be eliminated", "B. will eliminate", "C. eliminates", "D. eliminated"], "correctAnswer": "A. will be eliminated", "explanation": "'will be eliminated' (sẽ bị xóa bỏ)."},
    {"id": "u11-g14", "question": "Our school library, _____ was renovated with interactive digital screens, will reopen on Monday.", "options": ["A. which", "B. that", "C. who", "D. whose"], "correctAnswer": "A. which", "explanation": "'which' bổ nghĩa cho 'Our school library'."},
    {"id": "u11-g15", "question": "Green renewable energy projects _____ heavily across the provinces.", "options": ["A. will be funded", "B. will fund", "C. are funding", "D. funded"], "correctAnswer": "A. will be funded", "explanation": "'will be funded' (sẽ được cấp vốn)."},
    {"id": "u11-g16", "question": "Ms. Thu, _____ daughter is studying aerospace science abroad, feels immensely proud.", "options": ["A. whose", "B. who", "C. which", "D. that"], "correctAnswer": "A. whose", "explanation": "'whose daughter' (con gái của cô Thu)."},
    {"id": "u11-g17", "question": "Flexible work hours _____ to employees with infant children in modern enterprises.", "options": ["A. will be provided", "B. will provide", "C. is providing", "D. provided"], "correctAnswer": "A. will be provided", "explanation": "'will be provided' (sẽ được cung cấp)."},
    {"id": "u11-g18", "question": "Online telemedicine consultations _____ by rural clinics to treat patients effectively.", "options": ["A. will be utilized", "B. will utilize", "C. utilizes", "D. was utilized"], "correctAnswer": "A. will be utilized", "explanation": "'will be utilized' (sẽ được ứng dụng)."},
    {"id": "u11-g19", "question": "Uncle Minh, _____ has practiced organic farming for thirty years, will teach modern horticulture.", "options": ["A. who", "B. that", "C. which", "D. whom"], "correctAnswer": "A. who", "explanation": "'who' thay cho 'Uncle Minh'."},
    {"id": "u11-g20", "question": "More leadership workshops for female students _____ by the youth union this year.", "options": ["A. will be organized", "B. will organize", "C. organizes", "D. organized"], "correctAnswer": "A. will be organized", "explanation": "'will be organized' (sẽ được tổ chức)."}
]

u11_listening_info = {
    "audioTitle": "Sự Thay Đổi Vai Trò Giới Trong Gia Đình Hiện Đại (Evolving Family Roles in Modern Society)",
    "audioDuration": "3:20",
    "audioScriptSpeaker": "Sociologist Dr. Tram & University Student Hoang",
    "transcriptText": "Hoang: Dr. Tram, how have family roles in Vietnamese households transformed compared to past generations?\nDr. Tram: Hello Hoang! In the past, men were strictly expected to be the sole breadwinners while women handled all domestic chores and childcare. Today, both husbands and wives share career ambitions and household tasks collaboratively.\nHoang: Will more progressive workplace policies be introduced to support young working parents?\nDr. Tram: Yes! Extended paternity leave and flexible remote working hours will be widely adopted by progressive corporations. This allows fathers to play an active, daily role in child-rearing.\nHoang: What is the greatest benefit of this societal shift?\nDr. Tram: It creates equal opportunities for women to thrive in leadership roles while fostering harmonious, deeply bonded family relationships.",
    "vietnameseTranslation": "Hoàng: Thưa Tiến sĩ Trâm, vai trò gia đình trong các gia đình Việt Nam đã chuyển đổi như thế nào so với các thế hệ trước ạ?\nTiến sĩ Trâm: Chào Hoàng! Trong quá khứ, nam giới luôn bị áp đặt phải là người trụ cột kiếm tiền duy nhất trong khi phụ nữ quán xuyến mọi công việc nội trợ và chăm sóc con cái. Ngày nay, cả vợ lẫn chồng đều cùng chia sẻ các khát vọng nghề nghiệp và việc nhà một cách hợp tác.\nHoàng: Liệu có nhiều chính sách nơi làm việc tiến bộ hơn được ban hành để hỗ trợ các bậc phụ huynh trẻ đi làm không ạ?\nTiến sĩ Trâm: Chắc chắn rồi! Chế độ nghỉ thai sản mở rộng cho người cha và giờ làm việc từ xa linh hoạt sẽ được áp dụng rộng rãi tại các tập đoàn tiến bộ. Điều này cho phép người cha tham gia tích cực hàng ngày vào việc nuôi dạy con cái.\nHoàng: Lợi ích lớn nhất của sự chuyển biến xã hội này là gì ạ?\nTiến sĩ Trâm: Nó tạo ra cơ hội bình đẳng cho phụ nữ phát triển ở các vị trí lãnh đạo, đồng thời nuôi dưỡng các mối quan hệ gia đình hòa thuận và gắn kết sâu sắc."
}

u11_listening_qs = [
    {"id": "u11-l1", "question": "How were family roles traditionally divided in past generations according to Dr. Tram?", "options": ["A. Men were sole breadwinners while women handled all domestic chores", "B. Children did all the work", "C. Only grandparents worked", "D. Nobody did housework"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'men were strictly expected to be the sole breadwinners while women handled all domestic chores.'"},
    {"id": "u11-l2", "question": "How do modern husbands and wives handle domestic responsibilities today?", "options": ["A. They share career ambitions and household tasks collaboratively", "B. Men refuse to do any housework", "C. Women work 24 hours without sleep", "D. They hire robots for everything"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'share career ambitions and household tasks collaboratively.'"},
    {"id": "u11-l3", "question": "What workplace policies will be widely adopted to support working parents?", "options": ["A. Extended paternity leave and flexible remote working hours", "B. Twelve-hour night shifts without pay", "C. Banning holidays", "D. Cutting salaries"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'Extended paternity leave and flexible remote working hours will be widely adopted.'"},
    {"id": "u11-l4", "question": "How does paternity leave benefit modern fathers?", "options": ["A. It allows fathers to play an active, daily role in child-rearing", "B. It allows fathers to go on solo vacations", "C. It forbids them from cooking", "D. It makes them leave their family"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'allows fathers to play an active, daily role in child-rearing.'"},
    {"id": "u11-l5", "question": "What is the greatest societal benefit of evolving gender roles?", "options": ["A. Equal opportunities for women in leadership and harmonious families", "B. Closing down all schools", "C. Stopping economic trade", "D. Forbidding people from having jobs"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'equal opportunities for women to thrive in leadership roles while fostering harmonious, deeply bonded family relationships.'"},
    {"id": "u11-l6", "question": "Who is being interviewed by student Hoang?", "options": ["A. Sociologist Dr. Tram", "B. A bus driver", "C. A bank security guard", "D. A ship mechanic"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'Sociologist Dr. Tram & University Student Hoang.'"},
    {"id": "u11-l7", "question": "What term describes the person earning the primary family income?", "options": ["A. Breadwinner", "B. Homemaker", "C. Traveler", "D. Astrobiologist"], "correctAnswerIndex": 0, "explanation": "'Breadwinner' là người trụ cột kiếm tiền nuôi sống gia đình."},
    {"id": "u11-l8", "question": "What kind of corporations will adopt progressive family policies?", "options": ["A. Progressive corporations", "B. Outdated companies only", "C. None", "D. Foreign coal mines only"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'widely adopted by progressive corporations.'"}
]

u11_listening_fibs = [
    {"id": "u11-f1", "sentenceWithBlank": "Men were traditionally expected to be the sole _____.", "correctWord": "breadwinners", "hint": "Người trụ cột kiếm tiền (breadwinners)"},
    {"id": "u11-f2", "sentenceWithBlank": "Spouses share household chores _____.", "correctWord": "collaboratively", "hint": "Một cách hợp tác cùng nhau"},
    {"id": "u11-f3", "sentenceWithBlank": "Extended _____ leave will support young fathers.", "correctWord": "paternity", "hint": "Nghỉ thai sản của người cha (paternity)"},
    {"id": "u11-f4", "sentenceWithBlank": "Shared duties create a _____ and loving home.", "correctWord": "harmonious", "hint": "Êm ấm, thuận hòa (harmonious)"}
]

# Speaking prompts for Unit 11 (20 items)
u11_speaking = [
    {"id": f"u11-s{i+1}", "targetSentence": s, "ipa": ipa, "vietnameseMeaning": vm, "contextSituation": ctx, "keyPhonicsFocus": kpf, "sampleAudioText": s}
    for i, (s, ipa, vm, ctx, kpf) in enumerate([
        ("Gender equality in the modern workplace ensures that every individual can achieve their fullest creative potential.", "/ˈʤɛndər iːˈkwɒlɪti ɪn ðə ˈmɒdən ˈwɜːkpleɪs ɪnˈʃʊəz ðæt ˈɛvri ˌɪndɪˈvɪʤʊəl kæn əˈʧiːv ðeə ˈfʊlɪst kriːˈeɪtɪv pəˈtɛnʃəl/", "Bình đẳng giới nơi làm việc hiện đại đảm bảo mỗi cá nhân đều có thể phát huy tối đa tiềm năng sáng tạo của mình.", "Thuyết trình về bình đẳng giới.", "Phát âm chuẩn cụm từ 'gender equality' và 'fullest creative potential'."),
        ("More leadership opportunities will be provided to women in science, technology, engineering, and mathematics.", "/mɔː ˈliːdəʃɪp ˌɒpəˈtjuːnɪtiz wɪl biː prəˈvaɪdɪd tuː ˈwɪmɪn ɪn ˈsaɪəns tɛkˈnɒləʤi ˌɛnʤɪˈnɪərɪŋ ænd ˌmæθɪˈmætɪks/", "Nhiều cơ hội lãnh đạo hơn sẽ được trao cho phụ nữ trong các ngành khoa học, công nghệ, kỹ thuật và toán học (STEM).", "Nêu cao sự phát triển của phụ nữ trong STEM.", "Phát âm chuẩn cấu trúc Bị động tương lai 'will be provided'."),
        ("Sharing domestic chores equally between partners fosters mutual respect, lasting empathy, and family harmony.", "/ˈʃeərɪŋ dəʊˈmɛstɪk ʧɔːz ˈiːkwəli bɪˈtwiːn ˈpɑːtnəz ˈfɒstəz ˈmjuːʧʊəl rɪsˈpɛkt ˈlɑːstɪŋ ˈɛmpəθi ænd ˈfæmɪli ˈhɑːməni/", "Chia sẻ việc nhà bình đẳng giữa vợ chồng nuôi dưỡng sự tôn trọng lẫn nhau, lòng thấu cảm bền chặt và hòa thuận gia đình.", "Khuyên chia sẻ công việc nhà.", "Phát âm chuẩn từ 'domestic chores' /dəʊˈmɛstɪk ʧɔːz/ và 'harmony'."),
        ("Dr. Lan, who pioneered innovative cancer diagnostic techniques, was honored with the national scientist medal.", "/ˈdɒktə læn huː ˌpaɪəˈnɪəd ɪnˈnɒvətɪv ˈkænsə ˌdaɪəɡˈnɒstɪk tɛkˈniːks wɒz ˈɒnəd wɪð ðə ˈnæʃənl ˈsaɪəntɪst ˈmɛdl/", "Tiến sĩ Lan, người đi tiên phong trong các kỹ thuật chẩn đoán ung thư đột phá, đã được vinh danh bằng huân chương nhà khoa học quốc gia.", "Ca ngợi nhà khoa học nữ tiêu biểu.", "Phát âm chuẩn mệnh đề không xác định 'who pioneered innovative cancer techniques'."),
        ("Outdated social stereotypes about men and women will be replaced by mutual collaboration and mutual respect.", "/ˌaʊtˈdeɪtɪd ˈsəʊʃəl ˈstɛrɪətaɪps əˈbaʊt mɛn ænd ˈwɪmɪn wɪl biː rɪˈpleɪst baɪ ˈmjuːʧʊəl kəˌlæbəˈreɪʃən ænd ˈmjuːʧʊəl rɪsˈpɛkt/", "Các định kiến xã hội lỗi thời về nam giới và nữ giới sẽ được thay thế bằng sự hợp tác và tôn trọng lẫn nhau.", "Nói về sự tiến bộ trong nhận thức xã hội.", "Phát âm chuẩn từ 'stereotypes' /ˈstɛrɪətaɪps/."),
        ("Flexible telecommuting arrangements will be offered by progressive companies to support working mothers and fathers.", "/ˈflɛksəbl ˌtɛlɪkəˈmjuːtɪŋ əˈreɪnʤmənts wɪl biː ˈɒfəd baɪ prəʊˈɡrɛsɪv ˈkʌmpəniz tuː səˈpɔːt ˈwɜːkɪŋ ˈmʌðəz ænd ˈfɑːðəz/", "Các chế độ làm việc từ xa linh hoạt sẽ được các công ty tiến bộ áp dụng để hỗ trợ các ông bố bà mẹ đi làm.", "Nêu lợi ích của làm việc linh hoạt.", "Phát âm chuẩn từ 'telecommuting' /ˌtɛlɪkəˈmjuːtɪŋ/."),
        ("Artificial intelligence and automated robotics will be utilized to handle hazardous and monotonous industrial labor.", "/ˌɑːtɪˈfɪʃəl ɪnˈtɛlɪʤəns ænd ˈɔːtəmeɪtɪd rəʊˈbɒtɪks wɪl biː ˈjuːtɪlaɪzd tuː ˈhændl ˈhæzədəs ænd məˈnɒtnəs ɪnˈdʌstrɪəl ˈleɪbə/", "Trí tuệ nhân tạo và robot tự động sẽ được ứng dụng để giải quyết các công việc công nghiệp nặng nhọc và nguy hiểm.", "Dự báo về tự động hóa sản xuất.", "Phát âm chuẩn từ 'hazardous' /ˈhæzədəs/ và 'monotonous' /məˈnɒtnəs/."),
        ("My uncle Minh, who runs a nationwide green logistics startup, advocates strongly for workplace diversity.", "/maɪ ˈʌŋkl mɪn huː rʌnz ə ˈneɪʃənwaɪd ɡriːn ləˈʤɪstɪks ˈstɑːtʌp ˈædvəkeɪts ˈstrɒŋli fɔː ˈwɜːkpleɪs daɪˈvɜːsɪti/", "Chú Minh của tôi, người điều hành một startup logistics xanh trên toàn quốc, luôn ủng hộ mạnh mẽ sự đa dạng nơi làm việc.", "Giới thiệu doanh nhân đổi mới sáng tạo.", "Phát âm chuẩn mệnh đề không xác định 'who runs a nationwide green logistics startup'."),
        ("Modern education empowers girls to pursue their passions in aviation, computer engineering, and space science.", "/ˈmɒdən ˌɛʤʊˈkeɪʃən ɪmˈpaʊəz ɡɜːlz tuː pəˈsjuː ðeə ˈpæʃənz ɪn ˌeɪvɪˈeɪʃən kəmˈpjuːtər ˌɛnʤɪˈnɪərɪŋ ænd speɪs ˈsaɪəns/", "Giáo dục hiện đại trao quyền cho các nữ sinh theo đuổi đam mê trong ngành hàng không, kỹ thuật máy tính và khoa học vũ trụ.", "Khích lệ nữ sinh học ngành kỹ thuật.", "Phát âm chuẩn từ 'aviation' /ˌeɪvɪˈeɪʃən/ và 'empowers'."),
        ("Financial independence enables both men and women to build secure futures and make autonomous life decisions.", "/faɪˈnænʃəl ˌɪndɪˈpɛndəns ɪˈneɪblz bəʊθ mɛn ænd ˈwɪmɪn tuː bɪld sɪˈkjʊə ˈfjuːʧəz ænd meɪk ɔːˈtɒnəməs laɪf dɪˈsɪʒənz/", "Độc lập tài chính cho phép cả nam và nữ xây dựng tương lai an tâm và đưa ra những quyết định cuộc đời tự chủ.", "Nói về ý nghĩa của tự chủ tài chính.", "Phát âm chuẩn từ 'autonomous' /ɔːˈtɒnəməs/."),
        ("Extended paternity leave will be legally mandated to encourage fathers to bond with their newborn infants.", "/ɪksˈtɛndɪd pəˈtɜːnɪti liːv wɪl biː ˈliːɡəli ˈmændeɪtɪd tuː ɪnˈkʌrɪʤ ˈfɑːðəz tuː bɒnd wɪð ðeə ˈnjuːbɔːn ˈɪnfənts/", "Chế độ nghỉ thai sản mở rộng cho người cha sẽ được quy định bởi luật pháp để khuyến khích các ông bố gắn kết với con sơ sinh.", "Thuyết minh về chính sách thai sản hiện đại.", "Phát âm chuẩn từ 'mandated' /ˈmændeɪtɪd/ và 'paternity'."),
        ("The digital revolution has transformed traditional career pathways, creating unprecedented freelance opportunities.", "/ðə ˈdɪʤɪtl ˌrɛvəˈluːʃən hæz trænsˈfɔːmd trəˈdɪʃənl kəˈrɪə ˈpɑːθweɪz kriːˈeɪtɪŋ ʌnˈprɛsɪdɛntɪd ˈfriːlɑːns ˌɒpəˈtjuːnɪtiz/", "Cuộc cách mạng kỹ thuật số đã chuyển hóa các lộ trình nghề nghiệp truyền thống, tạo ra những cơ hội làm việc tự do chưa từng có.", "Nói về việc làm tự do trong kỷ nguyên số.", "Phát âm chuẩn từ 'unprecedented' /ʌnˈprɛsɪdɛntɪd/."),
        ("Mrs. Huong, whose daughter recently became a commercial airline captain, smiles with radiant pride.", "/ˈmɪsɪz huːŋ huːz ˈdɔːtə ˈriːsntli bɪˈkeɪm ə kəˈmɜːʃəl ˈeəlaɪn ˈkæptɪn smaɪlz wɪð ˈreɪdɪənt praɪd/", "Bác Hương, người có con gái vừa trở thành cơ trưởng máy bay thương mại, mỉm cười với niềm tự hào rạng rỡ.", "Kể về tấm gương nữ cơ trưởng.", "Phát âm chuẩn đại từ quan hệ sở hữu 'whose daughter recently became'."),
        ("Lifelong learning skills will be required for every professional to navigate constant technological disruptions.", "/ˈlaɪflɒŋ ˈlɜːnɪŋ skɪlz wɪl biː rɪˈkwaɪəd fɔːr ˈɛvri prəˈfɛʃənl tuː ˈnævɪɡeɪt ˈkɒnstənt ˌtɛknəˈlɒʤɪkəl dɪsˈrʌpʃənz/", "Kỹ năng học tập suốt đời sẽ là yêu cầu bắt buộc đối với mọi chuyên gia để vượt qua những làn sóng đột phá công nghệ liên tục.", "Nhấn mạnh vai trò của học tập suốt đời.", "Phát âm chuẩn từ 'disruptions' /dɪsˈrʌpʃənz/."),
        ("A balanced division of family labor ensures that both parents have time for personal development and recreation.", "/ə ˈbælənst dɪˈvɪʒən ɒv ˈfæmɪli ˈleɪbər ɪnˈʃʊəz ðæt bəʊθ ˈpeərənts hæv taɪm fɔː ˈpɜːsənl dɪˈvɛləpmənt ænd ˌrɛkrɪˈeɪʃən/", "Phân chia lao động gia đình cân bằng đảm bảo cả cha và mẹ đều có thời gian phát triển bản thân và giải trí.", "Nói về hạnh phúc gia đình văn minh.", "Phát âm chuẩn từ 'recreation' /ˌrɛkrɪˈeɪʃən/."),
        ("New vocational programs in green technology will be launched across vocational schools next semester.", "/njuː vəʊˈkeɪʃənl ˈprəʊɡræmz ɪn ɡriːn tɛkˈnɒləʤi wɪl biː lɔːnʧt əˈkrɒs vəʊˈkeɪʃənl skuːlz nɛkst sɪˈmɛstə/", "Các chương trình đào tạo nghề mới về công nghệ xanh sẽ được triển khai tại các trường nghề vào học kỳ tới.", "Giới thiệu đào tạo nghề xanh.", "Phát âm chuẩn Bị động tương lai 'will be launched'."),
        ("Emotional intelligence and collaborative problem-solving are vital skills that algorithms cannot replace.", "/ɪˈməʊʃənl ɪnˈtɛlɪʤəns ænd kəˈlæbərətɪv ˈprɒbləm-ˈsɒlvɪŋ ɑː ˈvaɪtl skɪlz ðæt ˈælɡərɪðmz ˈkænɒt rɪˈpleɪs/", "Trí tuệ cảm xúc và kỹ năng giải quyết vấn đề hợp tác là những kỹ năng thiết yếu mà các thuật toán không thể thay thế.", "Khẳng định giá trị của trí tuệ con người.", "Phát âm chuẩn từ 'algorithms' /ˈælɡərɪðmz/."),
        ("Professor An, who established the country's first robotics laboratory, mentors young female coders.", "/prəˈfɛsər æn huː ɪsˈtæblɪʃt ðə ˈkʌntriz fɜːst rəʊˈbɒtɪks ləˈbɒrətəri ˈmɛntɔːz jʌŋ ˈfiːmeɪl ˈkəʊdəz/", "Giáo sư An, người thành lập phòng thí nghiệm robot đầu tiên của đất nước, đang trực tiếp hướng dẫn các nữ lập trình viên trẻ.", "Nêu gương giáo sư truyền cảm hứng.", "Phát âm chuẩn mệnh đề không xác định 'who established the country's first robotics lab'."),
        ("Equal respect and unconditional encouragement in the family provide the strongest foundation for children's success.", "/ˈiːkwəl rɪsˈpɛkt ænd ˌʌnkənˈdɪʃənl ɪnˈkʌrɪʤmənt ɪn ðə ˈfæmɪli prəˈvaɪd ðə ˈstrɒŋɡɪst faʊnˈdeɪʃən fɔː ˈʧɪldrənz səkˈsɛs/", "Sự tôn trọng bình đẳng và niềm khích lệ vô điều kiện trong gia đình tạo nền móng vững chắc nhất cho sự thành công của con cái.", "Lời khuyên nuôi dạy con.", "Phát âm chuẩn từ 'unconditional' /ˌʌnkənˈdɪʃənl/."),
        ("May society continue to evolve toward boundless equity, mutual respect, and limitless opportunities for all.", "/meɪ səˈsaɪəti kənˈtɪnjuː tuː ɪˈvɒlv təˈwɔːd ˈbaʊndlɪs ˈɛkwɪti ˈmjuːʧʊəl rɪsˈpɛkt ænd ˈlɪmɪtlɪs ˌɒpəˈtjuːnɪtiz fɔːr ɔːl/", "Mong xã hội sẽ tiếp tục phát triển hướng tới sự công bằng vô bờ, sự tôn trọng lẫn nhau và cơ hội vô hạn cho tất cả mọi người.", "Thông điệp kết luận về bình đẳng xã hội.", "Phát âm chuẩn từ 'equity' /ˈɛkwɪti/ và 'limitless'.")
    ])
]

u11_reading_info = {
    "title": "Chuyển Dịch Vai Trò Xã Hội: Bình Đẳng Giới & Tương Lai Nơi Làm Việc",
    "topic": "Sự tiến hóa vai trò giới trong gia đình và nơi làm việc hiện đại",
    "passageText": "Over the past century, societal expectations regarding gender roles and domestic responsibilities have undergone profound transformations. In traditional agrarian and early industrial societies, a rigid dichotomy prevailed: men functioned predominantly as exterior breadwinners, while women were expected to shoulder domestic homemaking, meal preparation, and childcare within the domestic sphere.\n\nIn contemporary society, however, higher educational attainment, economic independence, and progressive labor policies have dismantled these traditional boundaries. Today, women are breaking through corporate glass ceilings, occupying executive boardrooms, directing innovative scientific laboratories, and piloting commercial aircraft. Simultaneously, modern men are enthusiastically embracing active fatherhood and domestic partnership, viewing cooking, cleaning, and infant care as shared mutual privileges rather than maternal duties alone.\n\nLooking toward the future, the rapid integration of artificial intelligence and flexible telecommuting will accelerate this evolution. As routine mechanical labor is automated, qualities such as emotional empathy, cross-cultural communication, and collaborative leadership will become paramount. In this progressive landscape, both men and women will be evaluated solely on merit, creativity, and ethical character, creating a more equitable, flourishing society.",
    "keyVocabularyHighlights": [
        {"word": "rigid dichotomy", "meaning": "sự phân định rạch ròi, cứng nhắc"},
        {"word": "glass ceilings", "meaning": "những rào cản vô hình kìm hãm sự thăng tiến"},
        {"word": "shared mutual privileges", "meaning": "những đặc quyền chia sẻ lẫn nhau một cách tự nguyện"},
        {"word": "progressive landscape", "meaning": "bối cảnh xã hội phát triển tiến bộ"}
    ]
}

u11_reading_qs = [
    {"id": "u11-r1", "question": "How were roles traditionally divided in early agrarian societies?", "options": ["A. Men were exterior breadwinners while women handled domestic chores", "B. Women did all the farm plowing while men slept", "C. Children ran companies", "D. Nobody lived in houses"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 1: 'men functioned predominantly as exterior breadwinners, while women were expected to shoulder domestic homemaking.'"},
    {"id": "u11-r2", "question": "What factors helped dismantle rigid gender boundaries according to paragraph 2?", "options": ["A. Higher educational attainment, economic independence, and progressive labor policies", "B. Lack of books", "C. Decreasing technology", "D. Banning women from universities"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'higher educational attainment, economic independence, and progressive labor policies have dismantled these traditional boundaries.'"},
    {"id": "u11-r3", "question": "Which professional roles are modern women actively breaking into?", "options": ["A. Executive boardrooms, scientific labs, and commercial airline piloting", "B. Stone grinding only", "C. No modern jobs", "D. Ancient pottery only"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'occupying executive boardrooms, directing innovative scientific laboratories, and piloting commercial aircraft.'"},
    {"id": "u11-r4", "question": "How do modern men view domestic duties like cooking and infant care today?", "options": ["A. As shared mutual privileges and collaborative partnership", "B. As shameful punishments", "C. As completely forbidden", "D. As impossible to do"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'viewing cooking, cleaning, and infant care as shared mutual privileges rather than maternal duties alone.'"},
    {"id": "u11-r5", "question": "What will happen as routine mechanical labor is automated by AI in the future?", "options": ["A. Human qualities like empathy, communication, and collaborative leadership will become paramount", "B. All human communication will end", "C. Everyone will stop studying", "D. Machines will forbid human workers"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'qualities such as emotional empathy, cross-cultural communication, and collaborative leadership will become paramount.'"},
    {"id": "u11-r6", "question": "On what criteria will men and women be evaluated in the future workplace?", "options": ["A. Solely on merit, creativity, and ethical character", "B. On traditional physical strength only", "C. On age only", "D. On handwriting beauty"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'evaluated solely on merit, creativity, and ethical character.'"},
    {"id": "u11-r7", "question": "Which word in paragraph 2 is closest in meaning to 'dismantled'?", "options": ["A. Broken down, dissolved, or eliminated", "B. Built taller", "C. Kept unchanged", "D. Hidden underground"], "correctAnswerIndex": 0, "explanation": "'Dismantled boundaries' có nghĩa là đã phá vỡ, xóa bỏ các ranh giới định kiến."},
    {"id": "u11-r8", "question": "Which word in paragraph 3 is closest in meaning to 'paramount'?", "options": ["A. Of utmost importance, supreme, and vital", "B. Unimportant", "C. Cheap", "D. Dangerous"], "correctAnswerIndex": 0, "explanation": "'Paramount' có nghĩa là tối quan trọng, quan trọng bậc nhất."},
    {"id": "u11-r9", "question": "What is the ultimate goal of progressive societal evolution?", "options": ["A. Creating a more equitable, harmonious, and flourishing society", "B. Isolating individuals", "C. Abolishing all families", "D. Closing universities"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'creating a more equitable, flourishing society.'"},
    {"id": "u11-r10", "question": "What is the best overall title for this reading passage?", "options": ["A. Shifting Societal Roles: Gender Equality & The Future of Work", "B. How to Manufacture Heavy Construction Machinery", "C. The Declining History of Ancient Towns", "D. Building Solar Satellites"], "correctAnswerIndex": 0, "explanation": "Toàn bài đọc phân tích sâu sắc sự chuyển dịch vai trò xã hội, bình đẳng giới và tương lai việc làm."}
]

u11_writing_prompts = [
    {
        "id": "u11-w1",
        "title": "Đề 1: Write a paragraph describing changing family roles in modern society (60-80 words)",
        "description": "Viết một đoạn văn miêu tả sự thay đổi vai trò trong gia đình hiện đại so với thời xưa (chia sẻ việc nhà, cùng kiếm tiền, nuôi dạy con).",
        "suggestedOutline": [
            "Introduction: State that family roles have undergone positive changes.",
            "Body: Contrast past stereotypes (men only earned money, women only cooked) with modern equality (both spouses work and share chores).",
            "Conclusion: Affirm that shared responsibility builds happier homes."
        ],
        "usefulPhrases": [
            "Family roles in modern Vietnamese society have transformed positively...",
            "In the past, men were expected to be the sole breadwinners while women handled domestic chores...",
            "Today, husbands and wives share financial responsibilities and childcare equally...",
            "This equal partnership fosters warmth, mutual respect, and family happiness."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Family roles in modern society have transformed positively over recent decades. In the past, men were strictly expected to be the sole breadwinners while women bore the entire burden of housework and childcare. Today, both husbands and wives pursue meaningful careers and share cooking, cleaning, and parenting collaboratively. This equal partnership reduces domestic stress, models mutual respect for children, and builds a harmonious, supportive family atmosphere."
    },
    {
        "id": "u11-w2",
        "title": "Đề 2: Write a paragraph about why gender equality in education and work is important (60-80 words)",
        "description": "Viết một đoạn văn nêu tầm quan trọng của việc đảm bảo bình đẳng giới trong giáo dục và cơ hội việc làm.",
        "suggestedOutline": [
            "Introduction: State that gender equality is a fundamental human right.",
            "Body: Explain benefits (unleashing female talent in STEM/business, increasing national economic prosperity, inspiring future generations).",
            "Conclusion: Call for equal opportunities for all."
        ],
        "usefulPhrases": [
            "Gender equality in education and the workplace is vital for a flourishing nation...",
            "When women enjoy equal access to higher education and leadership roles, businesses innovate faster...",
            "Breaking traditional stereotypes allows everyone to pursue their true potential...",
            "Providing equal opportunities creates a fair, progressive, and prosperous society."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Gender equality in education and employment is essential for building a thriving nation. When women enjoy equal access to science and technology degrees, national innovation accelerates significantly. Furthermore, companies with diverse leadership teams achieve higher productivity and creative problem-solving. Eliminating outdated prejudices allows every individual to maximize their potential regardless of gender, fostering a fair, progressive, and prosperous society for everyone."
    },
    {
        "id": "u11-w3",
        "title": "Đề 3: Write a paragraph on how automation and AI will change future jobs (60-80 words)",
        "description": "Viết một đoạn văn dự đoán công nghệ tự động hóa và trí tuệ nhân tạo (AI) sẽ thay đổi thị trường lao động trong tương lai như thế nào.",
        "suggestedOutline": [
            "Introduction: Introduce automation and AI as transformative technological forces.",
            "Body: Predict changes (repetitive manual tasks will be automated; demand for creative, analytical, and emotional skills will rise).",
            "Conclusion: Emphasize the necessity of lifelong learning."
        ],
        "usefulPhrases": [
            "Automation and artificial intelligence will reshape future job markets dramatically...",
            "Repetitive and hazardous industrial jobs will be handled by smart robotics...",
            "Consequently, human workers will focus on creative design, critical thinking, and emotional empathy...",
            "Cultivating lifelong learning skills will be essential for future career success."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Automation and artificial intelligence will reshape future employment dramatically. Over the next decades, repetitive calculations and dangerous manual tasks will be handled by intelligent robots and software algorithms. Consequently, human jobs will place greater value on emotional intelligence, creative innovation, and collaborative leadership. To thrive in this dynamic landscape, workers must cultivate adaptability, digital literacy, and a commitment to continuous lifelong learning."
    },
    {
        "id": "u11-w4",
        "title": "Đề 4: Write a paragraph describing a woman you admire for her achievements (60-80 words)",
        "description": "Viết một đoạn văn giới thiệu về một người phụ nữ mà em khâm phục (mẹ, cô giáo, nhà khoa học, bác sĩ, doanh nhân...).",
        "suggestedOutline": [
            "Introduction: Name the inspiring woman you admire.",
            "Body: Describe her dedication, resilience, career achievements, and kindness.",
            "Conclusion: Express what you have learned from her inspiring example."
        ],
        "usefulPhrases": [
            "A woman whom I admire immensely is...",
            "She has demonstrated remarkable resilience in balancing her successful career with...",
            "Her tireless dedication and compassionate spirit inspire everyone around her...",
            "Her shining example motivates me to study hard and pursue my dreams with courage."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "A woman whom I admire immensely is my mother, who is a dedicated high school biology teacher. Despite her demanding teaching schedule, she always makes time to listen to my problems and cook nutritious meals for our family. She continuously updates her digital skills to create interactive science lessons for her students. Her unyielding resilience, warm compassion, and boundless dedication inspire me to pursue my dreams with courage and kindness."
    },
    {
        "id": "u11-w5",
        "title": "Đề 5: Write a paragraph on the benefits of fathers taking paternity leave (60-80 words)",
        "description": "Viết một đoạn văn nêu các lợi ích của việc các ông bố được hưởng chế độ nghỉ thai sản để chăm sóc con sơ sinh.",
        "suggestedOutline": [
            "Introduction: Introduce paternity leave as a progressive social policy.",
            "Body: Give benefits (helps fathers bond deeply with newborn babies, assists mothers in physical recovery, strengthens marriage).",
            "Conclusion: Conclude that paternity leave benefits the whole family."
        ],
        "usefulPhrases": [
            "Offering paternity leave to new fathers brings profound benefits to families...",
            "It allows fathers to bond emotionally with their newborn babies from the earliest days...",
            "Moreover, it provides essential support for mothers during post-partum recovery...",
            "This progressive policy fosters stronger marital partnerships and healthier child development."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Offering extended paternity leave to fathers brings immense emotional and practical benefits to modern families. It provides fathers with the precious opportunity to bond deeply with their newborn infants during critical early weeks. In addition, sharing nighttime feedings and diaper changes relieves physical exhaustion for recovering mothers. Progressive parental leave strengthens marital cooperation and establishes a solid foundation for healthy child development."
    }
]

unit11 = make_unit(11, "Unit 11: Changing Roles in Society", "Sự thay đổi vai trò trong xã hội & Bình đẳng giới", "Tìm hiểu sự chuyển dịch vai trò gia đình, bình đẳng giới, bị động tương lai (will be + V3/ed) và mệnh đề quan hệ không xác định.", "Ngữ âm: Nhấn trọng âm các từ có hậu tố -ment, -ity, -tion và ngữ điệu câu bị động tương lai", "Users", u11_vocab, u11_grammar_info, u11_grammar_exs, u11_listening_info, u11_listening_qs, u11_listening_fibs, u11_speaking, u11_reading_info, u11_reading_qs, u11_writing_prompts)
write_ts_unit(11, unit11)
print("Unit 11 generated successfully!")

# ==============================================================================
# UNIT 12: MY FUTURE CAREER
# ==============================================================================
u12_vocab = [
    {"id": "u12-v1", "word": "career orientation", "phonetic": "/kəˈrɪər ˌɔːrɪɛnˈteɪʃən/", "partOfSpeech": "noun", "vietnameseMeaning": "sự định hướng nghề nghiệp", "englishExample": "High school career orientation workshops help students identify their passions and vocational strengths.", "vietnameseExample": "Các buổi hội thảo định hướng nghề nghiệp ở trường THPT giúp học sinh xác định đam mê và thế mạnh nghề nghiệp."},
    {"id": "u12-v2", "word": "artificial intelligence engineer", "phonetic": "/ˌɑːtɪˈfɪʃəl ɪnˈtɛlɪʤəns ˌɛnʤɪˈnɪə/", "partOfSpeech": "noun", "vietnameseMeaning": "kỹ sư trí tuệ nhân tạo (AI)", "englishExample": "An artificial intelligence engineer develops intelligent algorithms to automate complex data analysis.", "vietnameseExample": "Một kỹ sư trí tuệ nhân tạo phát triển các thuật toán thông minh để tự động hóa việc phân tích dữ liệu phức tạp."},
    {"id": "u12-v3", "word": "software developer", "phonetic": "/ˈsɒftweə dɪˈvɛləpə/", "partOfSpeech": "noun", "vietnameseMeaning": "nhà phát triển phần mềm / lập trình viên", "englishExample": "Talented software developers create mobile applications that connect millions of users worldwide.", "vietnameseExample": "Các nhà phát triển phần mềm tài năng tạo ra các ứng dụng di động kết nối hàng triệu người dùng trên toàn thế giới."},
    {"id": "u12-v4", "word": "biomedical scientist", "phonetic": "/ˌbaɪəʊˈmɛdɪkəl ˈsaɪəntɪst/", "partOfSpeech": "noun", "vietnameseMeaning": "nhà khoa học y sinh học", "englishExample": "Biomedical scientists conduct breakthrough gene research to develop personalized cancer therapies.", "vietnameseExample": "Các nhà khoa học y sinh tiến hành các nghiên cứu gen đột phá để phát triển các liệu pháp điều trị ung thư cá thể hóa."},
    {"id": "u12-v5", "word": "graphic designer", "phonetic": "/ˈɡræfɪk dɪˈzaɪnə/", "partOfSpeech": "noun", "vietnameseMeaning": "nhà thiết kế đồ họa / mỹ thuật số", "englishExample": "A skilled graphic designer uses typography and colors to build compelling visual brand identities.", "vietnameseExample": "Một nhà thiết kế đồ họa lành nghề sử dụng kiểu chữ và màu sắc để xây dựng bộ nhận diện thương hiệu trực quan hấp dẫn."},
    {"id": "u12-v6", "word": "environmental consultant", "phonetic": "/ɪnˌvaɪərənˈmɛntl kənˈsʌltənt/", "partOfSpeech": "noun", "vietnameseMeaning": "chuyên gia tư vấn môi trường", "englishExample": "Environmental consultants advise corporations on how to transition toward zero-carbon operations.", "vietnameseExample": "Các chuyên gia tư vấn môi trường tư vấn cho các doanh nghiệp cách chuyển đổi sang hoạt động không phát thải carbon."},
    {"id": "u12-v7", "word": "data analyst", "phonetic": "/ˈdeɪtə ˈænəlɪst/", "partOfSpeech": "noun", "vietnameseMeaning": "chuyên viên phân tích dữ liệu", "englishExample": "Data analysts extract meaningful trends from massive datasets to guide executive business decisions.", "vietnameseExample": "Các chuyên viên phân tích dữ liệu trích xuất các xu hướng có ý nghĩa từ các tập dữ liệu lớn để định hướng quyết định kinh doanh."},
    {"id": "u12-v8", "word": "vocational training", "phonetic": "/vəʊˈkeɪʃənl ˈtreɪnɪŋ/", "partOfSpeech": "noun", "vietnameseMeaning": "sự đào tạo nghề chuyên sâu", "englishExample": "Hands-on vocational training equips apprentices with practical skills in high-tech mechanics.", "vietnameseExample": "Đào tạo nghề thực hành trang bị cho học viên những kỹ năng thực tế trong ngành cơ khí công nghệ cao."},
    {"id": "u12-v9", "word": "internship", "phonetic": "/ˈɪntɜːnʃɪp/", "partOfSpeech": "noun", "vietnameseMeaning": "kỳ thực tập trải nghiệm công việc thực tế", "englishExample": "Completing a summer internship at a software firm gives university students valuable work experience.", "vietnameseExample": "Hoàn thành kỳ thực tập hè tại một công ty phần mềm mang lại cho sinh viên trải nghiệm làm việc quý giá."},
    {"id": "u12-v10", "word": "adaptability", "phonetic": "/əˌdæptəˈbɪlɪti/", "partOfSpeech": "noun", "vietnameseMeaning": "khả năng thích nghi và ứng biến linh hoạt", "englishExample": "Adaptability is ranked among the most essential soft skills in today's rapidly changing job market.", "vietnameseExample": "Khả năng thích nghi được xếp vào hàng những kỹ năng mềm thiết yếu nhất trong thị trường việc làm biến đổi nhanh ngày nay."},
    {"id": "u12-v11", "word": "passion", "phonetic": "/ˈpæʃən/", "partOfSpeech": "noun", "vietnameseMeaning": "niềm đam mê nhiệt huyết", "englishExample": "Choosing a career aligned with your genuine passion brings lifelong joy and profound fulfillment.", "vietnameseExample": "Chọn một nghề nghiệp gắn liền với đam mê thực sự sẽ mang lại niềm vui suốt đời và sự thỏa nguyện sâu sắc."},
    {"id": "u12-v12", "word": "modal of deduction", "phonetic": "/ˈməʊdl ɒv dɪˈdʌkʃən/", "partOfSpeech": "noun", "vietnameseMeaning": "động từ khuyết thiếu chỉ sự suy đoán (must, might, can't)", "englishExample": "Modals of deduction like 'must be' and 'can't be' express certainty or possibility about situations.", "vietnameseExample": "Các động từ khuyết thiếu suy đoán như 'must be' và 'can't be' diễn tả mức độ chắc chắn hoặc khả năng xảy ra của sự việc."},
    {"id": "u12-v13", "word": "job satisfaction", "phonetic": "/ʤɒb ˌsætɪsˈfækʃən/", "partOfSpeech": "noun", "vietnameseMeaning": "sự hài lòng và yêu thích công việc", "englishExample": "High job satisfaction stems from meaningful work, a supportive team, and continuous growth.", "vietnameseExample": "Sự hài lòng công việc cao bắt nguồn từ công việc có ý nghĩa, đồng đội hỗ trợ và sự phát triển liên tục."},
    {"id": "u12-v14", "word": "problem-solving", "phonetic": "/ˈprɒbləm ˈsɒlvɪŋ/", "partOfSpeech": "noun", "vietnameseMeaning": "kỹ năng giải quyết vấn đề", "englishExample": "Complex problem-solving skills allow engineers to troubleshoot intricate mechanical failures.", "vietnameseExample": "Kỹ năng giải quyết vấn đề phức tạp cho phép các kỹ sư khắc phục những sự cố cơ khí tinh vi."},
    {"id": "u12-v15", "word": "qualification", "phonetic": "/ˌkwɒlɪfɪˈkeɪʃən/", "partOfSpeech": "noun", "vietnameseMeaning": "bằng cấp, chứng chỉ chuyên môn", "englishExample": "Obtaining professional certifications enhances your competitive edge in international job markets.", "vietnameseExample": "Sở hữu các chứng chỉ chuyên môn giúp nâng cao lợi thế cạnh tranh của bạn trên thị trường việc làm quốc tế."},
    {"id": "u12-v16", "word": "curiosity", "phonetic": "/ˌkjʊərɪˈɒsɪti/", "partOfSpeech": "noun", "vietnameseMeaning": "sự tò mò, ham học hỏi khám phá", "englishExample": "Intellectual curiosity drives scientific discoveries and technological breakthroughs.", "vietnameseExample": "Niềm tò mò học hỏi tri thức thúc đẩy các khám phá khoa học và bước đột phá công nghệ."},
    {"id": "u12-v17", "word": "salary package", "phonetic": "/ˈsæləri ˈpækɪʤ/", "partOfSpeech": "noun", "vietnameseMeaning": "chế độ đãi ngộ tiền lương và phúc lợi", "englishExample": "The multinational enterprise offered a competitive salary package along with health insurance.", "vietnameseExample": "Doanh nghiệp đa quốc gia đưa ra mức đãi ngộ lương bổng cạnh tranh cùng với bảo hiểm y tế."},
    {"id": "u12-v18", "word": "perseverance", "phonetic": "/ˌpɜːsɪˈvɪərəns/", "partOfSpeech": "noun", "vietnameseMeaning": "sự kiên trì, bền bỉ không bỏ cuộc", "englishExample": "With dedication and perseverance, aspiring young entrepreneurs can overcome initial setbacks.", "vietnameseExample": "Với sự tận tâm và kiên trì, những doanh nhân trẻ có khát vọng có thể vượt qua những trở ngại ban đầu."},
    {"id": "u12-v19", "word": "critical thinking", "phonetic": "/ˈkrɪtɪkəl ˈθɪŋkɪŋ/", "partOfSpeech": "noun", "vietnameseMeaning": "tư duy phản biện và phân tích logic", "englishExample": "Developing critical thinking helps students evaluate online information objectively and accurately.", "vietnameseExample": "Phát triển tư duy phản biện giúp học sinh đánh giá thông tin trực tuyến một cách khách quan và chính xác."},
    {"id": "u12-v20", "word": "aspiration", "phonetic": "/ˌæspəˈreɪʃən/", "partOfSpeech": "noun", "vietnameseMeaning": "khát vọng, hoài bão lớn", "englishExample": "Nurturing noble career aspirations motivates youth to contribute meaningfully to national progress.", "vietnameseExample": "Nuôi dưỡng hoài bão nghề nghiệp cao đẹp thúc đẩy người trẻ cống hiến có ý nghĩa cho sự tiến bộ của đất nước."}
]

u12_grammar_info = {
    "title": "Động Từ Đi Kèm To-V / V-ing & Động Từ Khuyết Thiếu Suy Đoán (Modals of Deduction)",
    "summary": "Phân biệt các động từ đòi hỏi To-infinitive (decide, promise, manage, plan...) hoặc V-ing (enjoy, avoid, practice, mind...). Động từ khuyết thiếu suy đoán (must, might/may, can't) thể hiện mức độ tin cậy về một giả định.",
    "formulaBox": [
        "Verb + To-infinitive: decide, plan, promise, offer, refuse, manage, aim, hope + TO-V (I decided to study software engineering).",
        "Verb + V-ing: enjoy, avoid, practice, consider, finish, suggest, keep + V-ing (She avoids making careless coding mistakes).",
        "Modals of Deduction: MUST BE (chắc chắn đúng 95%), MIGHT / MAY BE (có thể đúng 50%), CAN'T BE (chắc chắn không thể xảy ra 95%).",
        "Ví dụ: He has won three national coding olympiads; he MUST BE exceptionally talented in computer algorithms."
    ],
    "usagePoints": [
        {"title": "1. Động từ đổi nghĩa khi dùng To-V hoặc V-ing", "detail": "Remember / Forget / Stop / Regret + To-V (nhớ/dừng lại để làm gì) vs. + V-ing (nhớ/dừng việc đã/đang làm).", "example": "Remember to submit your job application on time. / I remember meeting that senior engineer at the seminar."},
        {"title": "2. Suy đoán chắc chắn phủ định với CAN'T (không dùng Mustn't)", "detail": "Khi chắc chắn điều gì không thể là thật, dùng 'can't be' (She can't be at home; I saw her at the hospital).", "example": "This solution can't be correct; the numbers do not match."}
    ]
}

u12_grammar_exs = [
    {"id": "u12-g1", "question": "Minh decided _____ computer science because he loves designing artificial intelligence software.", "options": ["A. to study", "B. studying", "C. study", "D. studied"], "correctAnswer": "A. to study", "explanation": "Động từ 'decide' đi với To-infinitive: 'decided to study'."},
    {"id": "u12-g2", "question": "Lan practices _____ English every day to improve her presentation fluency.", "options": ["A. speaking", "B. to speak", "C. speak", "D. spoke"], "correctAnswer": "A. speaking", "explanation": "Động từ 'practice' đi với V-ing: 'practices speaking'."},
    {"id": "u12-g3", "question": "He has been working on this medical research for fifteen hours straight; he _____ be exhausted.", "options": ["A. must", "B. can't", "C. might not", "D. should not"], "correctAnswer": "A. must", "explanation": "Suy đoán chắc chắn đúng ở hiện tại: 'he must be exhausted' (chắc hẳn anh ấy đang kiệt sức)."},
    {"id": "u12-g4", "question": "Aspiring graphic designers should avoid _____ low-resolution images in their portfolios.", "options": ["A. using", "B. to use", "C. use", "D. used"], "correctAnswer": "A. using", "explanation": "Động từ 'avoid' đi với V-ing: 'avoid using'."},
    {"id": "u12-g5", "question": "That candidate has no programming background; he _____ be qualified for the senior AI architect role.", "options": ["A. can't", "B. must", "C. might", "D. may"], "correctAnswer": "A. can't", "explanation": "Suy đoán chắc chắn phủ định: 'he can't be qualified' (chắc chắn anh ta không thể đủ năng lực)."},
    {"id": "u12-g6", "question": "We plan _____ a vocational career fair next weekend to explore diverse job sectors.", "options": ["A. to attend", "B. attending", "C. attend", "D. attended"], "correctAnswer": "A. to attend", "explanation": "'plan' đi với To-V: 'plan to attend'."},
    {"id": "u12-g7", "question": "The lights in the laboratory are still on; Dr. Ha _____ be finishing her chemical experiment.", "options": ["A. might", "B. can't", "C. shouldn't", "D. won't"], "correctAnswer": "A. might", "explanation": "Suy đoán khả năng (có thể): 'might be finishing'."},
    {"id": "u12-g8", "question": "I enjoy _____ with young students to develop creative multimedia educational games.", "options": ["A. collaborating", "B. to collaborate", "C. collaborate", "D. collaborated"], "correctAnswer": "A. collaborating", "explanation": "'enjoy' đi với V-ing: 'enjoy collaborating'."},
    {"id": "u12-g9", "question": "Don't forget _____ your professional resume before the application deadline tomorrow.", "options": ["A. to submit", "B. submitting", "C. submit", "D. submitted"], "correctAnswer": "A. to submit", "explanation": "'forget + To-V' (quên phải làm gì): 'Don't forget to submit'."},
    {"id": "u12-g10", "question": "She managed _____ an internship at an international green renewable energy company.", "options": ["A. to secure", "B. securing", "C. secure", "D. secured"], "correctAnswer": "A. to secure", "explanation": "'manage' đi với To-V: 'managed to secure'."},
    {"id": "u12-g11", "question": "The surgeon has performed hundreds of complex surgeries successfully; she _____ be very experienced.", "options": ["A. must", "B. can't", "C. might not", "D. should"], "correctAnswer": "A. must", "explanation": "Suy đoán chắc chắn đúng: 'she must be very experienced'."},
    {"id": "u12-g12", "question": "Students should consider _____ internship experience during their university summer breaks.", "options": ["A. gaining", "B. to gain", "C. gain", "D. gained"], "correctAnswer": "A. gaining", "explanation": "'consider' đi với V-ing: 'consider gaining'."},
    {"id": "u12-g13", "question": "He promised _____ me how to code interactive web applications in React.", "options": ["A. to teach", "B. teaching", "C. teach", "D. taught"], "correctAnswer": "A. to teach", "explanation": "'promise' đi với To-V: 'promised to teach'."},
    {"id": "u12-g14", "question": "That phone is ringing in the conference room; it _____ be the foreign client calling.", "options": ["A. may", "B. can't", "C. must not", "D. wouldn't"], "correctAnswer": "A. may", "explanation": "Suy đoán khả năng có thể xảy ra: 'it may be'."},
    {"id": "u12-g15", "question": "I remember _____ this veteran aerospace engineer at the science exhibition two years ago.", "options": ["A. meeting", "B. to meet", "C. meet", "D. met"], "correctAnswer": "A. meeting", "explanation": "'remember + V-ing' (nhớ một kỷ niệm đã xảy ra trong quá khứ): 'remember meeting'."},
    {"id": "u12-g16", "question": "They offered _____ full financial scholarships to outstanding rural STEM candidates.", "options": ["A. to grant", "B. granting", "C. grant", "D. granted"], "correctAnswer": "A. to grant", "explanation": "'offer' đi với To-V: 'offered to grant'."},
    {"id": "u12-g17", "question": "He only started learning coding last week; this intricate algorithm _____ be written by him alone.", "options": ["A. can't", "B. must", "C. might", "D. should"], "correctAnswer": "A. can't", "explanation": "Suy đoán chắc chắn phủ định: 'can't be written by him'."},
    {"id": "u12-g18", "question": "Keep _____ your critical thinking skills by analyzing real-world economic case studies.", "options": ["A. honing", "B. to hone", "C. hone", "D. honed"], "correctAnswer": "A. honing", "explanation": "'keep' đi với V-ing: 'Keep honing'."},
    {"id": "u12-g19", "question": "She hopes _____ a respected pediatric doctor to care for underprivileged rural children.", "options": ["A. to become", "B. becoming", "C. become", "D. became"], "correctAnswer": "A. to become", "explanation": "'hope' đi với To-V: 'hopes to become'."},
    {"id": "u12-g20", "question": "The company decided _____ a comprehensive mental health support program for staff.", "options": ["A. to launch", "B. launching", "C. launch", "D. launched"], "correctAnswer": "A. to launch", "explanation": "'decide' đi với To-V: 'decided to launch'."}
]

u12_listening_info = {
    "audioTitle": "Định Hướng Nghề Nghiệp Kỷ Nguyên Số (Career Orientation in the Digital Era)",
    "audioDuration": "3:25",
    "audioScriptSpeaker": "Career Advisor Ms. Ngoc & High School Senior Trung",
    "transcriptText": "Trung: Ms. Ngoc, as a high school senior, I feel quite overwhelmed by so many emerging career paths in technology, biomedicine, and digital arts!\nMs. Ngoc: That is completely normal, Trung! The job market is evolving rapidly. Instead of merely chasing trendy job titles, you should evaluate three core factors: your genuine passions, your innate strengths, and future societal needs.\nTrung: I really enjoy coding software and solving complex mathematical puzzles. Which career path might suit me best?\nMs. Ngoc: You must be well-suited for a career in artificial intelligence engineering or cybersecurity! These fields offer tremendous opportunities to innovate and make impactful contributions to national digital infrastructure.\nTrung: What practical steps should I take during my upcoming summer break?\nMs. Ngoc: I suggest building simple coding projects on GitHub, participating in open-source competitions, and volunteering at technology education camps for younger pupils.",
    "vietnameseTranslation": "Trung: Thưa cô Ngọc, là một học sinh lớp 12, em cảm thấy khá bối rối trước quá nhiều ngành nghề mới nổi trong lĩnh vực công nghệ, y sinh học và nghệ thuật số ạ!\nCô Ngọc: Điều đó hoàn toàn bình thường, Trung à! Thị trường việc làm đang biến đổi rất nhanh. Thay vì chỉ chạy theo những tên nghề thời thượng, em nên đánh giá ba yếu tố cốt lõi: niềm đam mê thực sự, thế mạnh bẩm sinh của bản thân và nhu cầu tương lai của xã hội.\nTrung: Em rất thích viết mã lập trình phần mềm và giải các câu đố toán học phức tạp. Lộ trình nghề nghiệp nào có thể phù hợp nhất với em ạ?\nCô Ngọc: Em chắc hẳn rất phù hợp với nghề kỹ sư trí tuệ nhân tạo hoặc chuyên gia an ninh mạng! Những lĩnh vực này mang lại cơ hội to lớn để sáng tạo và đóng góp thiết thực cho cơ sở hạ tầng số quốc gia.\nTrung: Em nên thực hiện những bước thực tế nào trong kỳ nghỉ hè sắp tới ạ?\nCô Ngọc: Cô khuyên em nên xây dựng các dự án lập trình đơn giản trên GitHub, tham gia các cuộc thi mã nguồn mở và làm tình nguyện viên tại các trại hè giáo dục công nghệ cho các em nhỏ."
}

u12_listening_qs = [
    {"id": "u12-l1", "question": "How does high school senior Trung feel about emerging career paths?", "options": ["A. He feels quite overwhelmed by diverse emerging options", "B. He does not care about any career", "C. He already owns ten companies", "D. He wants to stop studying completely"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'I feel quite overwhelmed by so many emerging career paths.'"},
    {"id": "u12-l2", "question": "What three core factors does Ms. Ngoc recommend evaluating when choosing a career?", "options": ["A. Genuine passions, innate strengths, and future societal needs", "B. Only the highest initial salary", "C. What friends choose", "D. Nearest distance to home only"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'your genuine passions, your innate strengths, and future societal needs.'"},
    {"id": "u12-l3", "question": "What activities does Trung enjoy doing according to the dialogue?", "options": ["A. Coding software and solving complex mathematical puzzles", "B. Playing football all day", "C. Driving sports cars", "D. Repairing boat engines"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'I really enjoy coding software and solving complex mathematical puzzles.'"},
    {"id": "u12-l4", "question": "Which specific career paths does Ms. Ngoc suggest for Trung?", "options": ["A. Artificial intelligence engineering or cybersecurity", "B. Deep sea pearl diving", "C. Heavy coal mining", "D. Street sweeping"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'career in artificial intelligence engineering or cybersecurity!'"},
    {"id": "u12-l5", "question": "What practical summer step did Ms. Ngoc recommend to Trung?", "options": ["A. Building coding projects on GitHub and volunteering at tech camps", "B. Watching television 12 hours daily", "C. Refusing to read books", "D. Travelling with no plan"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'building simple coding projects on GitHub... volunteering at technology education camps.'"},
    {"id": "u12-l6", "question": "Who is Trung consulting in the audio dialogue?", "options": ["A. Career Advisor Ms. Ngoc", "B. A bus driver", "C. A flight pilot", "D. A store cashier"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'Career Advisor Ms. Ngoc & High School Senior Trung.'"},
    {"id": "u12-l7", "question": "Why are AI and cybersecurity considered high-potential careers in Viet Nam?", "options": ["A. They offer opportunities to innovate and contribute to national digital infrastructure", "B. They require zero study", "C. They have no computers", "D. They are temporary"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'make impactful contributions to national digital infrastructure.'"},
    {"id": "u12-l8", "question": "What is the key takeaway from Ms. Ngoc's career advice?", "options": ["A. Align your passions and strengths with real societal demands", "B. Never change your mind", "C. Pick whatever is easiest", "D. Avoid learning foreign languages"], "correctAnswerIndex": 0, "explanation": "Lời khuyên then chốt là cân bằng giữa đam mê, thế mạnh bản thân và nhu cầu phát triển của xã hội."}
]

u12_listening_fibs = [
    {"id": "u12-f1", "sentenceWithBlank": "Evaluate your genuine _____ and personal strengths.", "correctWord": "passions", "hint": "Đam mê và sở thích (passions)"},
    {"id": "u12-f2", "sentenceWithBlank": "Trung enjoys coding software and solving math _____.", "correctWord": "puzzles", "hint": "Các câu đố và bài toán (puzzles)"},
    {"id": "u12-f3", "sentenceWithBlank": "Fields like AI engineering help national digital _____.", "correctWord": "infrastructure", "hint": "Cơ sở hạ tầng (infrastructure)"},
    {"id": "u12-f4", "sentenceWithBlank": "Upload open-source projects to _____ for practice.", "correctWord": "GitHub", "hint": "Nền tảng chia sẻ mã nguồn GitHub"}
]

# Speaking prompts for Unit 12 (20 items)
u12_speaking = [
    {"id": f"u12-s{i+1}", "targetSentence": s, "ipa": ipa, "vietnameseMeaning": vm, "contextSituation": ctx, "keyPhonicsFocus": kpf, "sampleAudioText": s}
    for i, (s, ipa, vm, ctx, kpf) in enumerate([
        ("Choosing a future career aligned with your authentic passions and innate strengths brings lifelong joy and meaning.", "/ˈʧuːzɪŋ ə ˈfjuːʧə kəˈrɪər əˈlaɪnd wɪð jɔːr ɔːˈθɛntɪk ˈpæʃənz ænd ɪˈneɪt strɛŋθs brɪŋz ˈlaɪflɒŋ ʤɔɪ ænd ˈmiːnɪŋ/", "Lựa chọn một nghề nghiệp tương lai gắn liền với đam mê thực sự và thế mạnh bẩm sinh mang lại niềm vui và ý nghĩa suốt đời.", "Thuyết trình về định hướng nghề nghiệp tương lai.", "Phát âm chuẩn cụm từ 'authentic passions' và 'innate strengths'."),
        ("I decided to pursue software engineering because I love creating interactive applications that empower global users.", "/aɪ dɪˈsaɪdɪd tuː pəˈsjuː ˈsɒftweər ˌɛnʤɪˈnɪərɪŋ bɪˈkɒz aɪ lʌv kriːˈeɪtɪŋ ˌɪntərˈæktɪv ˌæplɪˈkeɪʃənz ðæt ɪmˈpaʊə ˈɡləʊbəl ˈjuːzəz/", "Tôi đã quyết định theo đuổi ngành kỹ thuật phần mềm vì tôi yêu thích việc tạo ra các ứng dụng tương tác trao quyền cho người dùng toàn cầu.", "Chia sẻ ước mơ theo đuổi ngành CNTT.", "Phát âm chuẩn cấu trúc 'decided to pursue'."),
        ("She has won several national coding championships; she must be an exceptionally gifted computer programmer.", "/ʃiː hæz wʌn ˈsɛvrəl ˈnæʃənl ˈkəʊdɪŋ ˈʧæmpjənʃɪps ʃiː mʌst biː ən ɪkˈsɛpʃənəli ˈɡɪftɪd kəmˈpjuːtə ˈprəʊɡræmə/", "Cô ấy đã giành nhiều giải quán quân lập trình toàn quốc; cô ấy chắc hẳn là một lập trình viên máy tính đặc biệt tài năng.", "Khen ngợi tài năng lập trình bằng động từ khuyết thiếu.", "Phát âm chuẩn cấu trúc suy đoán 'she must be an exceptionally gifted'."),
        ("Young students should avoid selecting a university major solely based on superficial social trends.", "/jʌŋ ˈstjuːdənts ʃʊd əˈvɔɪd sɪˈlɛktɪŋ ə ˌjuːnɪˈvɜːsɪti ˈmeɪʤə ˈsəʊlli beɪst ɒn ˌsuːpəˈfɪʃəl ˈsəʊʃəl trɛndz/", "Học sinh trẻ nên tránh chọn ngành đại học chỉ dựa thuần túy vào những trào lưu xã hội nhất thời bề nổi.", "Lời khuyên chọn ngành học tỉnh táo.", "Phát âm chuẩn từ 'avoid selecting' và 'superficial' /ˌsuːpəˈfɪʃəl/."),
        ("Biomedical scientists who conduct genetic research aim to discover personalized therapies for rare illnesses.", "/ˌbaɪəʊˈmɛdɪkəl ˈsaɪəntɪsts huː kənˈdʌkt ʤɪˈnɛtɪk rɪˈsɜːʧ eɪm tuː dɪsˈkʌvə ˈpɜːsənəlaɪzd ˈθɛrəpiz fɔː reər ˈɪlnɪsɪz/", "Các nhà khoa học y sinh tiến hành nghiên cứu di truyền học nhằm mục tiêu tìm ra các liệu pháp cá thể hóa cho các căn bệnh hiếm gặp.", "Thuyết minh về nghề nghiên cứu y sinh.", "Phát âm chuẩn từ 'Biomedical' /ˌbaɪəʊˈmɛdɪkəl/ và 'personalized therapies'."),
        ("Completing a summer internship at a creative design studio equips apprentices with invaluable real-world experience.", "/kəmˈpliːtɪŋ ə ˈsʌmər ˈɪntɜːnʃɪp æt ə kriːˈeɪtɪv dɪˈzaɪn ˈstjuːdɪəʊ ɪˈkwɪps əˈprɛntɪsɪz wɪð ɪnˈvæljʊəbl rɪəl-wɜːld ɪksˈpɪərɪəns/", "Hoàn thành kỳ thực tập hè tại một xưởng thiết kế sáng tạo trang bị cho học viên kinh nghiệm thực tế vô giá.", "Nói về lợi ích của kỳ thực tập sinh.", "Phát âm chuẩn từ 'internship' /ˈɪntɜːnʃɪp/ và 'invaluable'."),
        ("The applicant has zero medical training; he can't be eligible to perform surgical operations in hospitals.", "/ði ˈæplɪkənt hæz ˈzɪərəʊ ˈmɛdɪkəl ˈtreɪnɪŋ hiː kɑːnt biː ˈɛlɪʤəbl tuː pəˈfɔːm ˈsɜːʤɪkəl ˌɒpəˈreɪʃənz ɪn ˈhɒspɪtlz/", "Ứng viên này chưa từng học y khoa; anh ta chắc chắn không thể đủ tư cách thực hiện các ca phẫu thuật tại bệnh viện.", "Luyện câu suy đoán phủ định chắc chắn 'can't be eligible'.", "Phát âm chuẩn từ 'eligible' /ˈɛlɪʤəbl/ và 'surgical'."),
        ("Graphic designers use visual composition, typography, and color psychology to communicate impactful brand stories.", "/ˈɡræfɪk dɪˈzaɪnəz juːz ˈvɪzjʊəl ˌkɒmpəˈzɪʃən taɪˈpɒɡrəfi ænd ˈkʌlə saɪˈkɒləʤi tuː kəˈmjuːnɪkeɪt ɪmˈpæktfʊl brænd ˈstɔːriz/", "Các nhà thiết kế đồ họa sử dụng bố cục trực quan, kiểu chữ và tâm lý học màu sắc để truyền tải những câu chuyện thương hiệu đầy sức hút.", "Giới thiệu nghề thiết kế đồ họa.", "Phát âm chuẩn từ 'typography' /taɪˈpɒɡrəfi/ và 'psychology'."),
        ("Don't forget to practice coding algorithms regularly if you plan to enter international programming hackathons.", "/dəʊnt fəˈɡɛt tuː ˈpræktɪs ˈkəʊdɪŋ ˈælɡərɪðmz ˈrɛɡjʊləli ɪf juː plæn tuː ˈɛntər ˌɪntəˈnæʃənl ˈprəʊɡræmɪŋ ˈhækəθɒnz/", "Đừng quên luyện tập thuật toán lập trình thường xuyên nếu bạn có kế hoạch tham gia các cuộc thi lập trình hackathon quốc tế.", "Lời khuyên rèn luyện kỹ năng lập trình.", "Phát âm chuẩn từ 'algorithms' và 'hackathons' /ˈhækəθɒnz/."),
        ("Environmental consultants collaborate with renewable energy engineers to build zero-emission smart communities.", "/ɪnˌvaɪərənˈmɛntl kənˈsʌltənts kəˈlæbəreɪt wɪð rɪˈnjuːəbl ˈɛnəʤi ˌɛnʤɪˈnɪəz tuː bɪld ˈzɪərəʊ-ɪˈmɪʃən smɑːt kəˈmjuːnɪtiz/", "Các chuyên gia tư vấn môi trường hợp tác cùng các kỹ sư năng lượng tái tạo để xây dựng những cộng đồng thông minh không phát thải.", "Giới thiệu các nghề nghiệp xanh bảo vệ môi trường.", "Phát âm chuẩn cụm từ 'zero-emission smart communities'."),
        ("Mastering critical thinking and creative problem-solving will give future graduates an unbeatable competitive advantage.", "/ˈmɑːstərɪŋ ˈkrɪtɪkəl ˈθɪŋkɪŋ ænd kriːˈeɪtɪv ˈprɒbləm-ˈsɒlvɪŋ wɪl ɡɪv ˈfjuːʧə ˈɡræʤʊeɪts ən ʌnˈbiːtəbl kəmˈpɛtɪtɪv ədˈvɑːntɪʤ/", "Làm chủ tư duy phản biện và kỹ năng giải quyết vấn đề sáng tạo sẽ mang lại cho sinh viên tốt nghiệp tương lai lợi thế cạnh tranh vô địch.", "Nhấn mạnh kỹ năng thế kỷ 21.", "Phát âm chuẩn từ 'unbeatable' /ʌnˈbiːtəbl/."),
        ("I enjoy researching artificial intelligence models that assist doctors in identifying early-stage cancer cells.", "/aɪ ɪnˈʤɔɪ rɪˈsɜːʧɪŋ ˌɑːtɪˈfɪʃəl ɪnˈtɛlɪʤəns ˈmɒdlz ðæt əˈsɪst ˈdɒktəz ɪn aɪˈdɛntɪfaɪɪŋ ˈɜːli-steɪʤ ˈkænsə sɛlz/", "Tôi rất thích nghiên cứu các mô hình trí tuệ nhân tạo hỗ trợ các bác sĩ trong việc phát hiện sớm các tế bào ung thư.", "Bày tỏ đam mê ứng dụng AI trong y tế.", "Phát âm chuẩn cấu trúc 'enjoy researching'."),
        ("The senior doctor is examining the x-ray scans attentively; she might be diagnosing an unusual spinal anomaly.", "/ðə ˈsiːnjə ˈdɒktər ɪz ɪɡˈzæmɪnɪŋ ði ˈɛks-reɪ skænz əˈtɛntɪvli ʃiː maɪt biː ˌdaɪəɡˈnəʊzɪŋ ən ʌnˈjuːʒʊəl ˈspaɪnl əˈnɒməli/", "Bác sĩ trưởng khoa đang chăm chú xem xét các phim chụp X-quang; cô ấy có thể đang chẩn đoán một dị tật cột sống bất thường.", "Luyện câu suy đoán 'might be diagnosing'.", "Phát âm chuẩn từ 'anomaly' /əˈnɒməli/."),
        ("Vocational training centers equip young apprentices with cutting-edge mechanical and precision robotic engineering skills.", "/vəʊˈkeɪʃənl ˈtreɪnɪŋ ˈsɛntəz ɪˈkwɪp jʌŋ əˈprɛntɪsɪz wɪð ˈkʌtɪŋ-ɛʤ mɪˈkænɪkəl ænd prɪˈsɪʒən rəʊˈbɒtɪk ˌɛnʤɪˈnɪərɪŋ skɪlz/", "Các trung tâm đào tạo nghề trang bị cho học viên kỹ năng cơ khí hiện đại và kỹ thuật robot chính xác.", "Nêu cao giá trị của học nghề kỹ thuật cao.", "Phát âm chuẩn từ 'precision' /prɪˈsɪʒən/."),
        ("Remember to build a diverse professional portfolio showcasing your best coding, writing, or design projects.", "/rɪˈmɛmbə tuː bɪld ə daɪˈvɜːs prəˈfɛʃənl pɔːtˈfəʊlɪəʊ ˈʃəʊkeɪsɪŋ jɔː bɛst ˈkəʊdɪŋ ˈraɪtɪŋ ɔː dɪˈzaɪn ˈprɒʤɛkts/", "Hãy nhớ xây dựng một hồ sơ năng lực chuyên nghiệp đa dạng trưng bày những dự án lập trình, viết lách hoặc thiết kế xuất sắc nhất của bạn.", "Lời khuyên chuẩn bị hồ sơ xin việc.", "Phát âm chuẩn từ 'portfolio' /pɔːtˈfəʊlɪəʊ/."),
        ("She managed to deliver an inspiring keynote presentation on green biotechnology at the international youth forum.", "/ʃiː ˈmænɪʤd tuː dɪˈlɪvər ən ɪnˈspaɪərɪŋ ˈkiːnəʊt ˌprɛzɛnˈteɪʃən ɒn ɡriːn ˌbaɪəʊtɛkˈnɒləʤi æt ði ˌɪntəˈnæʃənl juːθ ˈfɔːrəm/", "Cô ấy đã thuyết trình thành công một bài diễn văn truyền cảm hứng về công nghệ sinh học xanh tại diễn đàn thanh niên quốc tế.", "Khen ngợi bài thuyết trình xuất sắc.", "Phát âm chuẩn cấu trúc 'managed to deliver'."),
        ("Lifelong learning and emotional resilience are the true compasses that guide us through uncertain economic times.", "/ˈlaɪflɒŋ ˈlɜːnɪŋ ænd ɪˈməʊʃənl rɪˈzɪlɪəns ɑː ðə truː ˈkʌmpəsɪz ðæt ɡaɪd ʌs θruː ʌnˈsɜːtn ˌiːkəˈnɒmɪk taɪmz/", "Học tập suốt đời và sự kiên cường cảm xúc là chiếc la bàn chân chính dẫn dắt chúng ta qua những thời kỳ kinh tế nhiều biến động.", "Khẳng định giá trị của học tập liên tục.", "Phát âm chuẩn từ 'resilience' /rɪˈzɪlɪəns/."),
        ("Data analysts discover hidden patterns in big data, turning raw numbers into strategic actionable business insights.", "/ˈdeɪtə ˈænəlɪsts dɪsˈkʌvə ˈhɪdn ˈpætənz ɪn bɪɡ ˈdeɪtə ˈtɜːnɪŋ rɔː ˈnʌmbəz ˈɪntuː strəˈtiːʤɪk ˈækʃnəbl ˈbɪznɪs ˈɪnsaɪts/", "Các chuyên viên phân tích dữ liệu khám phá các quy luật ẩn sâu trong dữ liệu lớn, biến những con số thô thành những hiểu biết kinh doanh chiến lược.", "Thuyết minh về nghề phân tích dữ liệu.", "Phát âm chuẩn từ 'insights' /ˈɪnsaɪts/ và 'actionable'."),
        ("Nurturing great aspirations and taking consistent action every single day will turn your career dreams into reality.", "/ˈnɜːʧərɪŋ ɡreɪt ˌæspəˈreɪʃənz ænd ˈteɪkɪŋ kənˈsɪstənt ˈækʃən ˈɛvri ˈsɪŋɡl deɪ wɪl tɜːn jɔː kəˈrɪə driːmz ˈɪntuː riˈælɪti/", "Nuôi dưỡng những hoài bão lớn lao và hành động kiên trì mỗi ngày sẽ biến những giấc mơ nghề nghiệp của bạn thành hiện thực.", "Lời khuyên hành động kiên trì.", "Phát âm chuẩn từ 'nurturing' /ˈnɜːʧərɪŋ/ và 'aspirations'."),
        ("May your chosen career bring immense joy, meaningful fulfillment, and lasting contributions to our beloved Viet Nam.", "/meɪ jɔː ˈʧəʊzn kəˈrɪə brɪŋ ɪˈmɛns ʤɔɪ ˈmiːnɪŋfʊl fʊlˈfɪlmənt ænd ˈlɑːstɪŋ ˌkɒntrɪˈbjuːʃənz tuː ˈaʊə bɪˈlʌvɪd ˌvjɛt ˈnɑːm/", "Mong rằng nghề nghiệp bạn lựa chọn sẽ mang lại niềm vui to lớn, sự thỏa nguyện ý nghĩa và những đóng góp lâu dài cho Việt Nam yêu dấu.", "Lời chúc nghề nghiệp tương lai tốt đẹp nhất.", "Phát âm chuẩn từ 'fulfillment' /fʊlˈfɪlmənt/ và 'contributions'.")
    ])
]

u12_reading_info = {
    "title": "Định Hướng Nghề Nghiệp Thế Kỷ 21: Làm Chủ Kỹ Năng & Kiến Tạo Tương Lai",
    "topic": "Định hướng nghề nghiệp kỷ nguyên số & Phát triển kỹ năng thế kỷ 21",
    "passageText": "The 21st-century global labor landscape is undergoing a monumental paradigm shift propelled by artificial intelligence, green decarbonization, and hyper-connectivity. Traditional vocational concepts that defined careers by rigid single-track lifelong roles are giving way to dynamic, multi-disciplinary portfolios. In this emerging reality, career adaptability and continuous upskilling have become the ultimate determinants of professional success.\n\nEmerging sectors offer unprecedented opportunities for proactive young minds. In technology, artificial intelligence engineers, data architects, and cybersecurity specialists are architecting the backbone of the digital economy. In healthcare and biotechnology, biomedical researchers and genetic counselors develop tailored medical interventions to extend human longevity. Concurrently, the green transition has spurred rapid demand for renewable energy consultants, ecological urban planners, and circular economy specialists.\n\nNevertheless, technical proficiency alone is no longer sufficient. Employers globally prioritize transversal soft skills: critical analytical thinking, emotional intelligence, cross-cultural collaboration, and complex problem-solving. By aligning authentic personal passions with future societal demands, cultivating resilience, and embracing lifelong learning, Vietnamese students can confidently navigate future disruptions and forge fulfilling, impactful careers.",
    "keyVocabularyHighlights": [
        {"word": "monumental paradigm shift", "meaning": "sự chuyển dịch mô hình mang tính bước ngoặt lịch sử"},
        {"word": "hyper-connectivity", "meaning": "sự siêu kết nối trong kỷ nguyên số"},
        {"word": "transversal soft skills", "meaning": "các kỹ năng mềm xuyên suốt mọi ngành nghề"},
        {"word": "impactful careers", "meaning": "những sự nghiệp mang lại giá trị và tầm ảnh hưởng sâu rộng"}
    ]
}

u12_reading_qs = [
    {"id": "u12-r1", "question": "What major forces are propelling the 21st-century labor paradigm shift?", "options": ["A. Artificial intelligence, green decarbonization, and hyper-connectivity", "B. Traditional farming only", "C. Decreasing technology", "D. Stopping international trade"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 1: 'propelled by artificial intelligence, green decarbonization, and hyper-connectivity.'"},
    {"id": "u12-r2", "question": "What has replaced rigid single-track lifelong career roles?", "options": ["A. Dynamic, multi-disciplinary career portfolios", "B. Working in one factory forever with no change", "C. Sitting at home without working", "D. Banning all university degrees"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 1: 'giving way to dynamic, multi-disciplinary portfolios.'"},
    {"id": "u12-r3", "question": "Which tech roles are architecting the backbone of the modern digital economy?", "options": ["A. AI engineers, data architects, and cybersecurity specialists", "B. Steam locomotive drivers", "C. Typewriter repairers", "D. Paper filing clerks"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'artificial intelligence engineers, data architects, and cybersecurity specialists.'"},
    {"id": "u12-r4", "question": "What is the mission of modern biomedical researchers and genetic counselors?", "options": ["A. Developing tailored medical interventions to extend human longevity", "B. Closing hospitals", "C. Banning medicines", "D. Making plastic toys"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'develop tailored medical interventions to extend human longevity.'"},
    {"id": "u12-r5", "question": "Which green career roles have experienced rapid demand?", "options": ["A. Renewable energy consultants, ecological urban planners, and circular economy specialists", "B. Coal power plant builders", "C. Oil spill cleaners only", "D. Tree fellers"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'renewable energy consultants, ecological urban planners, and circular economy specialists.'"},
    {"id": "u12-r6", "question": "What transversal soft skills do global employers prioritize alongside technical abilities?", "options": ["A. Critical analytical thinking, emotional intelligence, collaboration, and complex problem-solving", "B. Speaking loudly only", "C. Working in complete isolation", "D. Memorizing old dictionaries"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'critical analytical thinking, emotional intelligence, cross-cultural collaboration, and complex problem-solving.'"},
    {"id": "u12-r7", "question": "Which word in paragraph 1 is closest in meaning to 'monumental'?", "options": ["A. Historic, colossal, and immensely significant", "B. Tiny and insignificant", "C. Broken", "D. Temporary"], "correctAnswerIndex": 0, "explanation": "'Monumental paradigm shift' có nghĩa là sự chuyển dịch mô hình mang tính bước ngoặt vĩ đại."},
    {"id": "u12-r8", "question": "Which word in paragraph 3 is closest in meaning to 'transversal'?", "options": ["A. Transferable across different fields / Cross-cutting", "B. Useless", "C. Narrow and specific to one machine", "D. Forgotten"], "correctAnswerIndex": 0, "explanation": "'Transversal skills' có nghĩa là các kỹ năng mềm có thể áp dụng linh hoạt trên mọi ngành nghề."},
    {"id": "u12-r9", "question": "How can Vietnamese students forge impactful, fulfilling careers according to paragraph 3?", "options": ["A. Aligning passions with societal demands, cultivating resilience, and embracing lifelong learning", "B. Waiting for luck without studying", "C. Copying others' choices", "D. Avoiding all new technologies"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'aligning authentic personal passions with future societal demands, cultivating resilience, and embracing lifelong learning.'"},
    {"id": "u12-r10", "question": "What is the best overall title for this reading passage?", "options": ["A. 21st-Century Career Orientation: Mastering Skills & Shaping the Future", "B. The Decline of Global Trade", "C. How to Fix Mechanical Clocks", "D. History of Medieval Blacksmiths"], "correctAnswerIndex": 0, "explanation": "Toàn bài đọc làm sáng tỏ định hướng nghề nghiệp thế kỷ 21, làm chủ kỹ năng mềm và kiến tạo tương lai."}
]

u12_writing_prompts = [
    {
        "id": "u12-w1",
        "title": "Đề 1: Write a paragraph about your dream future career and why you chose it (60-80 words)",
        "description": "Viết một đoạn văn giới thiệu về nghề nghiệp mơ ước trong tương lai của em và lý do em lựa chọn con đường này.",
        "suggestedOutline": [
            "Introduction: Name your dream career (software engineer, doctor, teacher, environmentalist).",
            "Body: Explain why it matches your passion/skills and how it helps society.",
            "Conclusion: State what actions you are currently taking to achieve this goal."
        ],
        "usefulPhrases": [
            "My dream career in the future is to become an artificial intelligence engineer...",
            "I chose this path because I have a strong passion for coding and mathematics...",
            "Furthermore, developing smart software can improve healthcare and educational access...",
            "To achieve this ambition, I study computer science and practice English daily."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "My dream career in the future is to become an artificial intelligence engineer. I chose this inspiring profession because I have always possessed a deep passion for coding, algorithms, and mathematical problem-solving. Through artificial intelligence, I aspire to develop innovative diagnostic software to support rural doctors and improve community healthcare. To turn this ambition into reality, I study computer science diligently and hone my English skills every day."
    },
    {
        "id": "u12-w2",
        "title": "Đề 2: Write a paragraph on the most important soft skills needed for future jobs (60-80 words)",
        "description": "Viết một đoạn văn nêu các kỹ năng mềm quan trọng nhất cần thiết cho người lao động trong tương lai (tư duy phản biện, giao tiếp, khả năng thích ứng).",
        "suggestedOutline": [
            "Introduction: State that soft skills are essential in the modern automated workplace.",
            "Body: Mention 2-3 key soft skills (adaptability, emotional intelligence, collaborative problem-solving).",
            "Conclusion: Conclude that soft skills complement technical knowledge."
        ],
        "usefulPhrases": [
            "In an increasingly automated workplace, transversal soft skills are indispensable...",
            "First, adaptability allows workers to learn new digital tools quickly...",
            "Second, emotional intelligence and teamwork foster harmonious collaboration...",
            "Mastering these human skills ensures long-term career success and resilience."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "In an increasingly automated job market, transversal soft skills are just as crucial as technical expertise. First, adaptability enables professionals to navigate rapid technological transformations and master new digital tools effortlessly. Second, emotional intelligence and collaborative communication foster empathetic teamwork and conflict resolution. Finally, critical thinking allows individuals to make logical, ethical decisions. Cultivating these distinctively human attributes guarantees long-term career resilience."
    },
    {
        "id": "u12-w3",
        "title": "Đề 3: Write a paragraph discussing the benefits of doing an internship as a student (60-80 words)",
        "description": "Viết một đoạn văn nêu những lợi ích thiết thực của việc tham gia thực tập đối với học sinh, sinh viên.",
        "suggestedOutline": [
            "Introduction: Introduce internships as an effective bridge between classroom theory and real-world practice.",
            "Body: Highlight benefits (gaining practical work experience, expanding professional network, discovering true strengths).",
            "Conclusion: Encourage students to pursue internships."
        ],
        "usefulPhrases": [
            "Completing an internship provides students with invaluable professional benefits...",
            "It bridges the gap between academic textbook theory and real-world industry practice...",
            "Moreover, interns expand their professional networks and receive mentorship from senior experts...",
            "Internship experience significantly enhances a student's employability and confidence."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Completing an internship provides young students with immense practical and personal benefits. It bridges the gap between theoretical classroom knowledge and dynamic industry practice. Working alongside experienced professionals allows interns to develop hands-on technical skills, cultivate professional etiquette, and build valuable networking connections. Furthermore, internships help students clarify their career passions before graduation. I believe every student should actively seek internship opportunities."
    },
    {
        "id": "u12-w4",
        "title": "Đề 4: Write a paragraph on why lifelong learning is essential for every professional (60-80 words)",
        "description": "Viết một đoạn văn giải thích lý do vì sao tinh thần học tập suốt đời là yếu tố bắt buộc đối với mọi người lao động trong thời đại mới.",
        "suggestedOutline": [
            "Introduction: State that the fast-evolving knowledge economy requires continuous learning.",
            "Body: Explain why (knowledge becomes outdated quickly, new technologies constantly emerge, upskilling opens new opportunities).",
            "Conclusion: Reiterate that lifelong learning is key to staying relevant."
        ],
        "usefulPhrases": [
            "Lifelong learning is no longer an optional choice; it is an absolute necessity...",
            "Because technological innovations emerge at a staggering pace, skills become obsolete quickly...",
            "Professionals who continuously upskill through online courses and books stay competitive...",
            "Embracing intellectual curiosity ensures sustained career growth and fulfillment."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Lifelong learning is no longer an optional advantage; it is an absolute necessity in today's knowledge economy. Because technological breakthroughs emerge at an unprecedented pace, professional skills can become obsolete within a few years. Professionals who continuously upskill through digital courses, books, and industry seminars stay innovative and highly competitive. Embracing intellectual curiosity and continuous self-improvement ensures long-term career relevance and personal fulfillment."
    },
    {
        "id": "u12-w5",
        "title": "Đề 5: Write a paragraph about a career in green technology and renewable energy (60-80 words)",
        "description": "Viết một đoạn văn giới thiệu về các ngành nghề trong lĩnh vực công nghệ xanh và năng lượng tái tạo.",
        "suggestedOutline": [
            "Introduction: Introduce green technology careers as vital for the planet's sustainable future.",
            "Body: Describe jobs (solar/wind engineers, environmental consultants, waste-to-energy specialists) and their positive impact.",
            "Conclusion: Express optimism for youth choosing green careers."
        ],
        "usefulPhrases": [
            "Careers in green technology and renewable energy are among the most impactful paths today...",
            "Environmental consultants and solar engineers design clean power solutions to combat climate change...",
            "These careers not only offer promising economic growth but also protect our ecosystems...",
            "Pursuing a green career allows young professionals to make meaningful contributions to our planet."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Careers in green technology and renewable energy are among the most meaningful and rapidly expanding fields today. Solar power engineers, environmental consultants, and circular economy specialists design sustainable solutions to combat climate change and reduce carbon emissions. These green professions not only offer excellent financial prospects but also protect global biodiversity. Choosing a career in green innovation empowers young people to build a cleaner, healthier future for humanity."
    }
]

unit12 = make_unit(12, "Unit 12: My Future Career", "Định hướng nghề nghiệp tương lai & Kỹ năng thế kỷ 21", "Khám phá các ngành nghề kỷ nguyên số, động từ đi với To-V / V-ing và động từ khuyết thiếu chỉ sự suy đoán (Modals of deduction).", "Ngữ âm: Nhấn trọng âm các từ chỉ chức danh nghề nghiệp và ngữ điệu câu suy đoán Modals", "Briefcase", u12_vocab, u12_grammar_info, u12_grammar_exs, u12_listening_info, u12_listening_qs, u12_listening_fibs, u12_speaking, u12_reading_info, u12_reading_qs, u12_writing_prompts)
write_ts_unit(12, unit12)
print("Unit 12 generated successfully!")
