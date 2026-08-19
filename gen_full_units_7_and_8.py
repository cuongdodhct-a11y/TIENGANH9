import json
from gen_unit_utils import make_unit, write_ts_unit

# ==============================================================================
# UNIT 7: NATURAL WONDERS OF THE WORLD (20 Vocab, 20 Grammar, 8 Listening MC + 4 FIB, 20 Speaking, 10 Reading, 5 Writing)
# ==============================================================================
u7_vocab = [
    {"id": "u7-v1", "word": "natural wonder", "phonetic": "/ˈnætʃrəl ˈwʌndə/", "partOfSpeech": "noun", "vietnameseMeaning": "kỳ quan thiên nhiên", "englishExample": "Ha Long Bay is globally celebrated as a magnificent natural wonder of the world.", "vietnameseExample": "Vịnh Hạ Long được tôn vinh trên toàn cầu là một kỳ quan thiên nhiên tráng lệ của thế giới."},
    {"id": "u7-v2", "word": "stalactite", "phonetic": "/ˈstæləktaɪt/", "partOfSpeech": "noun", "vietnameseMeaning": "thạch nhũ (từ trần hang rủ xuống)", "englishExample": "Ancient calcium-rich water formed shimmering stalactites hanging from the cave ceiling.", "vietnameseExample": "Nước giàu canxi từ xa xưa đã tạo nên những khối thạch nhũ lấp lánh rủ xuống từ trần hang."},
    {"id": "u7-v3", "word": "stalagmite", "phonetic": "/ˈstæləɡmaɪt/", "partOfSpeech": "noun", "vietnameseMeaning": "măng đá (từ nền hang mọc lên)", "englishExample": "Towering stalagmites rise up from the subterranean floor like sculpted stone pillars.", "vietnameseExample": "Những cột măng đá sừng sững mọc lên từ nền hang ngầm trông như những trụ đá được điêu khắc."},
    {"id": "u7-v4", "word": "limestone karst", "phonetic": "/ˈlaɪmstəʊn kɑːst/", "partOfSpeech": "noun", "vietnameseMeaning": "địa hình karst đá vôi", "englishExample": "The dramatic limestone karsts of Trang An have been sculpted by wind and water over millions of years.", "vietnameseExample": "Những khối karst đá vôi kỳ vĩ ở Tràng An đã được gió và nước tạc nên qua hàng triệu năm."},
    {"id": "u7-v5", "word": "subterranean", "phonetic": "/ˌsʌbtəˈreɪniən/", "partOfSpeech": "adjective", "vietnameseMeaning": "ngầm dưới lòng đất", "englishExample": "Son Doong Cave contains a colossal subterranean river system flowing through vast caverns.", "vietnameseExample": "Hang Sơn Đoòng chứa đựng một hệ thống sông ngầm khổng lồ chảy xuyên qua những vòm hang rộng thênh thang."},
    {"id": "u7-v6", "word": "biodiversity hotspot", "phonetic": "/ˌbaɪəʊdaɪˈvɜːsɪti ˈhɒtspɒt/", "partOfSpeech": "noun", "vietnameseMeaning": "điểm nóng đa dạng sinh học", "englishExample": "Phong Nha - Ke Bang National Park serves as a crucial tropical biodiversity hotspot.", "vietnameseExample": "Vườn quốc gia Phong Nha - Kẻ Bàng đóng vai trò là một điểm nóng đa dạng sinh học nhiệt đới quan trọng."},
    {"id": "u7-v7", "word": "geological formation", "phonetic": "/ˌʤɪəˈlɒʤɪkəl fɔːˈmeɪʃən/", "partOfSpeech": "noun", "vietnameseMeaning": "kiến tạo địa chất, tầng địa chất", "englishExample": "The Grand Canyon displays millions of years of Earth's history through exposed geological formations.", "vietnameseExample": "Hẻm núi Grand Canyon phô bày hàng triệu năm lịch sử Trái Đất qua các tầng kiến tạo địa chất lộ thiên."},
    {"id": "u7-v8", "word": "cascade", "phonetic": "/kæsˈkeɪd/", "partOfSpeech": "noun", "vietnameseMeaning": "thác nước nhiều tầng đổ cuồn cuộn", "englishExample": "Ban Gioc Waterfall features a roaring multi-tiered cascade spilling over emerald terraces.", "vietnameseExample": "Thác Bản Giốc sở hữu một dòng thác nhiều tầng gầm vang đổ tràn qua các bậc thềm xanh ngọc bích."},
    {"id": "u7-v9", "word": "breathtaking vista", "phonetic": "/ˈbrɛθˌteɪkɪŋ ˈvɪstə/", "partOfSpeech": "noun", "vietnameseMeaning": "khung cảnh ngoạn mục mở rộng tầm mắt", "englishExample": "Climbing to the cliff observation deck rewards hikers with a breathtaking vista of the ocean.", "vietnameseExample": "Leo lên đài quan sát vách đá thưởng cho người đi bộ đường dài một khung cảnh ngoạn mục hướng ra đại dương."},
    {"id": "u7-v10", "word": "grotto", "phonetic": "/ˈɡrɒtəʊ/", "partOfSpeech": "noun", "vietnameseMeaning": "hang động nhỏ kỳ ảo", "englishExample": "We boarded a small wooden sampan to row through the mystical light of Tam Coc grottoes.", "vietnameseExample": "Chúng tôi bước lên một chiếc thuyền tam bản nhỏ để chèo qua ánh sáng huyền ảo của các hang động Tam Cốc."},
    {"id": "u7-v11", "word": "ecosystem", "phonetic": "/ˈiːkəʊˌsɪstəm/", "partOfSpeech": "noun", "vietnameseMeaning": "hệ sinh thái tự nhiên", "englishExample": "The fragile mangrove ecosystem protects coastal villages from severe storm surges.", "vietnameseExample": "Hệ sinh thái rừng ngập mặn mỏng manh bảo vệ các làng ven biển khỏi những đợt triều cường bão dữ dội."},
    {"id": "u7-v12", "word": "pristine", "phonetic": "/ˈprɪstiːn/", "partOfSpeech": "adjective", "vietnameseMeaning": "nguyên sơ, thuần khiết, chưa bị tàn phá", "englishExample": "The pristine white sand beaches of Con Dao remain untouched by commercial urbanization.", "vietnameseExample": "Những bãi biển cát trắng nguyên sơ ở Côn Đảo vẫn chưa bị đô thị hóa thương mại xâm lấn."},
    {"id": "u7-v13", "word": "canyon", "phonetic": "/ˈkænjən/", "partOfSpeech": "noun", "vietnameseMeaning": "hẻm núi sâu thăm thẳm", "englishExample": "Tu San Canyon along the Nho Que River is recognized as Southeast Asia's deepest canyon.", "vietnameseExample": "Hẻm Tu Sản dọc sông Nho Quế được công nhận là hẻm núi sâu nhất Đông Nam Á."},
    {"id": "u7-v14", "word": "flora and fauna", "phonetic": "/ˈflɔːrə ænd ˈfɔːnə/", "partOfSpeech": "phrase", "vietnameseMeaning": "quần thể thực vật và động vật", "englishExample": "Scientists continue to document rare endemic flora and fauna inside primary rainforests.", "vietnameseExample": "Các nhà khoa học tiếp tục ghi nhận các loài thực vật và động vật đặc hữu quý hiếm trong rừng nguyên sinh."},
    {"id": "u7-v15", "word": "crater", "phonetic": "/ˈkreɪtə/", "partOfSpeech": "noun", "vietnameseMeaning": "miệng núi lửa", "englishExample": "Bien Ho Lake in Pleiku was formed inside a prehistoric volcanic crater.", "vietnameseExample": "Hồ Biển Hồ ở Pleiku được hình thành bên trong một miệng núi lửa thời tiền sử."},
    {"id": "u7-v16", "word": "preserve intact", "phonetic": "/prɪˈzɜːv ɪnˈtækt/", "partOfSpeech": "phrase", "vietnameseMeaning": "gìn giữ nguyên vẹn không suy suyển", "englishExample": "Strict park conservation laws ensure that marine habitats are preserved intact.", "vietnameseExample": "Luật bảo tồn công viên nghiêm ngặt đảm bảo các sinh cảnh biển được gìn giữ nguyên vẹn."},
    {"id": "u7-v17", "word": "majestic", "phonetic": "/məˈʤɛstɪk/", "partOfSpeech": "adjective", "vietnameseMeaning": "uy nghi, hùng vĩ, tráng lệ", "englishExample": "The majestic peaks of the Hoang Lien Son range pierce through sea of white clouds.", "vietnameseExample": "Những đỉnh núi uy nghi của dãy Hoàng Liên Sơn đâm xuyên qua biển mây trắng bồng bềnh."},
    {"id": "u7-v18", "word": "coral reef", "phonetic": "/ˈkɒrəl riːf/", "partOfSpeech": "noun", "vietnameseMeaning": "rạn san hô", "englishExample": "Global warming causes thermal stress that threatens the survival of delicate coral reefs.", "vietnameseExample": "Sự nóng lên toàn cầu gây ra căng thẳng nhiệt đe dọa sự sống còn của các rạn san hô mong manh."},
    {"id": "u7-v19", "word": "heritage conservation", "phonetic": "/ˈhɛrɪtɪʤ ˌkɒnsəˈveɪʃən/", "partOfSpeech": "noun", "vietnameseMeaning": "công tác bảo tồn di sản", "englishExample": "International funding supports heritage conservation in protected environmental reserves.", "vietnameseExample": "Nguồn tài trợ quốc tế hỗ trợ công tác bảo tồn di sản tại các khu dự trữ môi trường được bảo vệ."},
    {"id": "u7-v20", "word": "awe-inspiring", "phonetic": "/ˈɔː-ɪnˌspaɪərɪŋ/", "partOfSpeech": "adjective", "vietnameseMeaning": "làm kinh ngạc, truyền cảm hứng tôn kính", "englishExample": "Standing inside Son Doong's massive doline delivers an awe-inspiring connection with nature.", "vietnameseExample": "Đứng bên trong hố sụt khổng lồ của Sơn Đoòng mang lại một sự kết nối ngập tràn kính phục với thiên nhiên."}
]

u7_grammar_info = {
    "title": "Câu Bị Động Khách Quan & Thể Bị Động Với Động Từ Chỉ Ý Kiến (Impersonal Passive & Passive Voice: It is said that / S + is believed to...)",
    "summary": "Nắm chắc cấu trúc Bị động khách quan dùng để trích dẫn quan điểm, niềm tin, tin đồn chung trong xã hội mà không cần nêu rõ chủ thể cụ thể (dùng các động từ: say, believe, report, know, claim, think, expect).",
    "formulaBox": [
        "Cách 1: It + is/was + V3/V-ed (said/believed/reported) + that + S + V + O",
        "Ví dụ: IT IS SAID THAT Son Doong is the largest natural cave in the world.",
        "Cách 2: S + is/was + V3/V-ed (said/believed) + to V-inf (cùng thì) / to have V3 (trước thì)",
        "Ví dụ: Son Doong IS BELIEVED TO BE the largest cave on Earth.",
        "Ví dụ: Ha Long Bay IS REPORTED TO HAVE ATTRACTED millions of tourists last year."
    ],
    "usagePoints": [
        {"title": "1. Dùng khi nào", "detail": "Dùng khi nói về sự thật khoa học, tin tức báo chí, nhận định khảo cổ hoặc sự tôn vinh của thế giới đối với các kỳ quan.", "example": "It is estimated that the stalactites took millions of years to form."},
        {"title": "2. Chuyển đổi linh hoạt 2 mẫu câu", "detail": "'It is known that S + V' tương đương 'S is known to V'.", "example": "It is thought that the crater was formed by a volcano. -> The crater is thought to have been formed by a volcano."}
    ]
}

u7_grammar_exs = [
    {"id": "u7-g1", "question": "It is _____ that Ha Long Bay possesses thousands of towering limestone islets.", "options": ["A. reported", "B. reporting", "C. report", "D. reports"], "correctAnswer": "A. reported", "explanation": "Cấu trúc bị động khách quan: 'It is reported that...' (Người ta báo cáo rằng...)."},
    {"id": "u7-g2", "question": "Son Doong Cave is believed _____ the largest natural cave system in the world.", "options": ["A. to be", "B. being", "C. be", "D. was"], "correctAnswer": "A. to be", "explanation": "Cấu trúc: 'S + is believed + to V-inf' -> 'is believed to be'."},
    {"id": "u7-g3", "question": "It _____ said that the stalactites inside Phong Nha Cave took millions of years to develop.", "options": ["A. is", "B. was being", "C. are", "D. has"], "correctAnswer": "A. is", "explanation": "Cấu trúc chuẩn: 'It is said that...' (Người ta nói rằng...)."},
    {"id": "u7-g4", "question": "Ban Gioc Waterfall is known _____ one of the most majestic border waterfalls globally.", "options": ["A. to be", "B. being", "C. is", "D. be"], "correctAnswer": "A. to be", "explanation": "'S + is known + to V-inf' -> 'is known to be'."},
    {"id": "u7-g5", "question": "It is _____ that ancient volcanic eruptions created the geological crater of Pleiku Lake.", "options": ["A. believed", "B. believing", "C. believe", "D. to believe"], "correctAnswer": "A. believed", "explanation": "'It is believed that...' (Người ta tin rằng...)."},
    {"id": "u7-g6", "question": "Trang An Scenic Landscape Complex is reported _____ millions of eco-tourists each year.", "options": ["A. to welcome", "B. welcoming", "C. welcomed", "D. welcome"], "correctAnswer": "A. to welcome", "explanation": "'is reported to welcome' (được ghi nhận là chào đón)."},
    {"id": "u7-g7", "question": "It is widely _____ that preserving pristine ecosystems is vital for our planet's survival.", "options": ["A. acknowledged", "B. acknowledge", "C. acknowledging", "D. acknowledges"], "correctAnswer": "A. acknowledged", "explanation": "'It is widely acknowledged that...' (Được công nhận rộng rãi rằng...)."},
    {"id": "u7-g8", "question": "Mount Everest is said _____ by hundreds of daring mountaineers annually.", "options": ["A. to be scaled", "B. scaling", "C. scale", "D. to scale"], "correctAnswer": "A. to be scaled", "explanation": "'is said to be scaled' (được cho là được chinh phục bởi...)."},
    {"id": "u7-g9", "question": "It is thought that the deep canyon _____ formed over millions of years by river erosion.", "options": ["A. was", "B. is being", "C. will", "D. has"], "correctAnswer": "A. was", "explanation": "Mệnh đề 'that + S + V' trong quá khứ -> 'was formed'."},
    {"id": "u7-g10", "question": "The Great Barrier Reef is claimed _____ severe coral bleaching due to rising ocean temperatures.", "options": ["A. to have suffered", "B. suffering", "C. suffered", "D. to suffer"], "correctAnswer": "A. to have suffered", "explanation": "Hành động đã xảy ra trước thời điểm hiện tại: 'is claimed to have suffered'."},
    {"id": "u7-g11", "question": "It is _____ that many undiscovered subterranean chambers still exist within the national park.", "options": ["A. expected", "B. expect", "C. expecting", "D. to expect"], "correctAnswer": "A. expected", "explanation": "'It is expected that...' (Người ta kỳ vọng/dự đoán rằng...)."},
    {"id": "u7-g12", "question": "The subterranean river inside Son Doong is understood _____ throughout the entire limestone massif.", "options": ["A. to flow", "B. flowing", "C. flew", "D. flow"], "correctAnswer": "A. to flow", "explanation": "'is understood to flow' (được hiểu là chảy qua...)."},
    {"id": "u7-g13", "question": "It is _____ that the pristine coral reefs in Phu Quoc harbor hundreds of rare fish species.", "options": ["A. estimated", "B. estimating", "C. estimate", "D. to estimate"], "correctAnswer": "A. estimated", "explanation": "'It is estimated that...' (Người ta ước tính rằng...)."},
    {"id": "u7-g14", "question": "The ancient grotto is thought _____ by early prehistoric human ancestors.", "options": ["A. to have been inhabited", "B. inhabiting", "C. inhabited", "D. to inhabit"], "correctAnswer": "A. to have been inhabited", "explanation": "Bị động quá khứ hoàn thành: 'to have been inhabited' (từng được cư trú bởi người tiền sử)."},
    {"id": "u7-g15", "question": "It was _____ that a local farmer accidentally found the entrance to Son Doong Cave in 1991.", "options": ["A. revealed", "B. revealing", "C. reveals", "D. to reveal"], "correctAnswer": "A. revealed", "explanation": "'It was revealed that...' (Được tiết lộ rằng...)."},
    {"id": "u7-g16", "question": "The majestic mountain range is claimed _____ home to several critically endangered primate species.", "options": ["A. to be", "B. being", "C. was", "D. been"], "correctAnswer": "A. to be", "explanation": "'is claimed to be' (được khẳng định là...)."},
    {"id": "u7-g17", "question": "It is proved that sustainable eco-tourism _____ local livelihoods while protecting biodiversity.", "options": ["A. enhances", "B. enhance", "C. enhancing", "D. to enhance"], "correctAnswer": "A. enhances", "explanation": "Mệnh đề sau 'that + S + V(hiện tại đơn)' -> 'enhances'."},
    {"id": "u7-g18", "question": "The mineral springs in the valley are considered _____ therapeutic healing properties.", "options": ["A. to possess", "B. possessing", "C. possess", "D. possessed"], "correctAnswer": "A. to possess", "explanation": "'are considered to possess' (được coi là sở hữu)."},
    {"id": "u7-g19", "question": "It is _____ that Tu San Canyon is Southeast Asia's deepest geological chasm.", "options": ["A. confirmed", "B. confirming", "C. confirm", "D. confirms"], "correctAnswer": "A. confirmed", "explanation": "'It is confirmed that...' (Đã được xác nhận rằng...)."},
    {"id": "u7-g20", "question": "The ancient giant banyan tree is believed _____ for over eight centuries in the primary forest.", "options": ["A. to have stood", "B. standing", "C. stands", "D. stood"], "correctAnswer": "A. to have stood", "explanation": "'is believed to have stood' (được tin là đã đứng sừng sững qua hơn 8 thế kỷ)."}
]

u7_listening_info = {
    "audioTitle": "Kỳ Quan Thiên Nhiên Thế Giới & Hang Sơn Đoòng (Natural Wonders & Son Doong)",
    "audioDuration": "3:20",
    "audioScriptSpeaker": "Park Geologist Dr. Elena & Student Huy",
    "transcriptText": "Huy: Dr. Elena, why is Son Doong Cave in Quang Binh considered such an awe-inspiring natural wonder?\nDr. Elena: Hello Huy! Son Doong is recognized globally as the largest natural cave known on Earth. It is so colossal that it contains its own localized weather clouds, a roaring subterranean river, and an underground primeval rainforest growing beneath giant collapsed sinkholes called dolines!\nHuy: How were these astonishing geological formations created?\nDr. Elena: It is estimated that water flowing through soluble limestone over three to five million years carved these immense caverns. Towering stalagmites, some rising over seventy meters high, look like giant stone sentinels.\nHuy: What conservation measures are taken to protect this pristine wonder?\nDr. Elena: Expedition tours are strictly regulated to limit visitor numbers each year. This ensures that the delicate subterranean ecosystem and rare endemic species remain preserved intact for future generations!",
    "vietnameseTranslation": "Huy: Tiến sĩ Elena ơi, tại sao Hang Sơn Đoòng ở Quảng Bình lại được coi là một kỳ quan thiên nhiên kỳ vĩ đến vậy ạ?\nTiến sĩ Elena: Chào Huy! Sơn Đoòng được thế giới công nhận là hang động tự nhiên lớn nhất từng được biết đến trên Trái Đất. Nó khổng lồ đến mức chứa đựng cả hệ thống thời tiết mây mù cục bộ riêng, một dòng sông ngầm gầm vang và một khu rừng nguyên sinh ngầm phát triển bên dưới những hố sụt khổng lồ gọi là dolines!\nHuy: Những kiến tạo địa chất đáng kinh ngạc này đã được hình thành như thế nào ạ?\nTiến sĩ Elena: Người ta ước tính rằng dòng nước chảy qua đá vôi dễ hòa tan trong suốt 3 đến 5 triệu năm đã tạc nên những vòm hang bao la này. Những khối măng đá sừng sững, có khối cao hơn 70 mét, trông như những lính gác bằng đá khổng lồ.\nHuy: Những biện pháp bảo tồn nào đang được thực hiện để bảo vệ kỳ quan nguyên sơ này ạ?\nTiến sĩ Elena: Các chuyến thám hiểm được kiểm soát nghiêm ngặt nhằm giới hạn số lượng khách tham quan mỗi năm. Điều này đảm bảo rằng hệ sinh thái ngầm mỏng manh và các loài đặc hữu quý hiếm được gìn giữ nguyên vẹn cho các thế hệ tương lai!"
}

u7_listening_qs = [
    {"id": "u7-l1", "question": "What title is Son Doong Cave globally recognized for according to Dr. Elena?", "options": ["A. The largest natural cave known on Earth", "B. The smallest cave in Asia", "C. An artificial man-made tunnel", "D. An underground train station"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'recognized globally as the largest natural cave known on Earth.'"},
    {"id": "u7-l2", "question": "What extraordinary internal features does Son Doong contain?", "options": ["A. Local weather clouds, a subterranean river, and an underground primeval rainforest", "B. Concrete highways and gas stations", "C. High-rise office towers", "D. Shopping malls and parking lots"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'contains its own localized weather clouds, a roaring subterranean river, and an underground primeval rainforest.'"},
    {"id": "u7-l3", "question": "What are the giant collapsed sinkholes in the cave called?", "options": ["A. Dolines", "B. Craters", "C. Trenches", "D. Puddles"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'giant collapsed sinkholes called dolines!'"},
    {"id": "u7-l4", "question": "How long did it take for water to carve these immense caverns?", "options": ["A. Over three to five million years", "B. Two days", "C. Ten weeks", "D. One year only"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'over three to five million years carved these immense caverns.'"},
    {"id": "u7-l5", "question": "How tall are some of the towering stalagmites inside Son Doong?", "options": ["A. Over seventy meters high", "B. Ten centimeters", "C. Five meters only", "D. One meter"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'some rising over seventy meters high.'"},
    {"id": "u7-l6", "question": "How are expedition tours managed to protect the cave?", "options": ["A. Strictly regulated to limit visitor numbers each year", "B. Open to millions of people with no tickets", "C. Blasting loud music daily", "D. Building concrete bridges inside"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'Expedition tours are strictly regulated to limit visitor numbers each year.'"},
    {"id": "u7-l7", "question": "Why is strict conservation essential for Son Doong?", "options": ["A. To ensure the delicate subterranean ecosystem is preserved intact", "B. To make it a theme park", "C. To dig for coal", "D. To install air conditioners"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'ensures that the delicate subterranean ecosystem... remain preserved intact.'"},
    {"id": "u7-l8", "question": "What is the primary message of Dr. Elena regarding natural wonders?", "options": ["A. Awe-inspiring natural wonders must be treasured, studied, and preserved sustainably", "B. Caves are dark and useless", "C. Nature should be replaced with factories", "D. Tourists should touch all stalactites"], "correctAnswerIndex": 0, "explanation": "Nội dung cuộc trao đổi khẳng định giá trị vô giá của kỳ quan thiên nhiên và trách nhiệm bảo tồn bền vững."}
]

u7_listening_fibs = [
    {"id": "u7-f1", "sentenceWithBlank": "Son Doong is recognized as the largest _____ cave on Earth.", "correctWord": "natural", "hint": "Tự nhiên (natural)"},
    {"id": "u7-f2", "sentenceWithBlank": "Underground primeval rainforests grow beneath collapsed _____.", "correctWord": "dolines", "hint": "Hố sụt địa chất (dolines)"},
    {"id": "u7-f3", "sentenceWithBlank": "Water carved these caverns over three to five _____ years.", "correctWord": "million", "hint": "Triệu (million)"},
    {"id": "u7-f4", "sentenceWithBlank": "Tours are regulated to keep ecosystems preserved _____.", "correctWord": "intact", "hint": "Nguyên vẹn (intact)"}
]

u7_speaking = [
    {"id": f"u7-s{i+1}", "targetSentence": s, "ipa": ipa, "vietnameseMeaning": vm, "contextSituation": ctx, "keyPhonicsFocus": kpf, "sampleAudioText": s}
    for i, (s, ipa, vm, ctx, kpf) in enumerate([
        ("Ha Long Bay is globally celebrated as an awe-inspiring natural wonder featuring thousands of dramatic limestone karsts.", "/hæ lɒŋ beɪ ɪz ˈɡləʊbəli ˈsɛlɪbreɪtɪd æz ən ˈɔː-ɪnˌspaɪərɪŋ ˈnætʃrəl ˈwʌndə ˈfiːʧərɪŋ ˈθaʊzəndz ɒv drəˈmætɪk ˈlaɪmstəʊn kɑːsts/", "Vịnh Hạ Long được tôn vinh trên toàn cầu là một kỳ quan thiên nhiên kỳ vĩ với hàng ngàn đảo đá vôi kỳ thú.", "Thuyết trình về kỳ quan Vịnh Hạ Long.", "Phát âm chuẩn 'awe-inspiring' /ˈɔː-ɪnˌspaɪərɪŋ/ và 'limestone karsts' /ˈlaɪmstəʊn kɑːsts/."),
        ("Son Doong Cave is believed to be the largest subterranean cave system ever discovered on our planet.", "/ʃɒn dʊŋ keɪv ɪz bɪˈliːvd tuː biː ðə ˈlɑːʤɪst ˌsʌbtəˈreɪniən keɪv ˈsɪstəm ˈɛvə dɪsˈkʌvəd ɒn ˈaʊə ˈplænɪt/", "Hang Sơn Đoòng được tin là hệ thống hang động ngầm dưới lòng đất lớn nhất từng được khám phá trên hành tinh của chúng ta.", "Giới thiệu Hang Sơn Đoòng.", "Phát âm chuẩn 'is believed to be' và 'subterranean' /ˌsʌbtəˈreɪniən/."),
        ("It is estimated that the glittering stalactites and towering stalagmites took over three million years to crystallize.", "/ɪt ɪz ˈɛstɪmeɪtɪd ðæt ðə ˈɡlɪtərɪŋ ˈstæləktaɪts ænd ˈtaʊərɪŋ ˈstæləɡmaɪts tʊk ˈəʊvə θriː ˈmɪljən jɪəz tuː ˈkrɪstəlaɪz/", "Người ta ước tính rằng những khối thạch nhũ lấp lánh và măng đá cao sừng sững đã mất hơn 3 triệu năm để kết tinh.", "Thuyết minh về quá trình tạo nhũ đá.", "Phát âm chuẩn 'stalactites' /ˈstæləktaɪts/ và 'stalagmites' /ˈstæləɡmaɪts/."),
        ("Ban Gioc Waterfall, which straddles the national border, is known to be one of the most spectacular cascades in Asia.", "/bɑːn ʒɒk ˈwɔːtəfɔːl wɪʧ ˈstrædlz ðə ˈnæʃənl ˈbɔːdə ɪz nəʊn tuː biː wʌn ɒv ðə məʊst spɛkˈtækjʊlə kæsˈkeɪdz ɪn ˈeɪʒə/", "Thác Bản Giốc, thác nước nằm vắt ngang biên giới quốc gia, được biết đến là một trong những tầng thác ngoạn mục nhất châu Á.", "Miêu tả Thác Bản Giốc.", "Phát âm chuẩn 'cascades' /kæsˈkeɪdz/ và 'spectacular' /spɛkˈtækjʊlə/."),
        ("Standing atop the observation ridge offers a breathtaking vista of emerald waters and forested cliffs.", "/ˈstændɪŋ əˈtɒp ði ˌɒbzəˈveɪʃən rɪʤ ˈɒfəz ə ˈbrɛθˌteɪkɪŋ ˈvɪstə ɒv ˈɛmərəld ˈwɔːtəz ænd ˈfɒrɪstɪd klɪfs/", "Đứng trên đỉnh dãy núi quan sát mang lại một khung cảnh ngoạn mục của làn nước xanh ngọc bích và các vách đá rợp bóng cây.", "Kể cảm giác ngắm cảnh từ đỉnh cao.", "Phát âm chuẩn 'breathtaking vista' /ˈbrɛθˌteɪkɪŋ ˈvɪstə/."),
        ("It is reported that Phong Nha - Ke Bang National Park harbors hundreds of rare endemic flora and fauna species.", "/ɪt ɪz rɪˈpɔːtɪd ðæt fɒŋ njɑː - keɪ bæŋ ˈnæʃənl pɑːk ˈhɑːbəz ˈhʌndrədz ɒv reər ɛnˈdɛmɪk ˈflɔːrə ænd ˈfɔːnə ˈspiːʃiːz/", "Người ta ghi nhận rằng Vườn Quốc gia Phong Nha - Kẻ Bàng là nơi trú ngụ của hàng trăm loài động thực vật đặc hữu quý hiếm.", "Nói về đa dạng sinh học.", "Phát âm chuẩn 'endemic flora and fauna' /ɛnˈdɛmɪk ˈflɔːrə ænd ˈfɔːnə/."),
        ("The dramatic geological formations of Trang An have been sculpted by persistent wind and flowing rivers.", "/ðə drəˈmætɪk ˌʤɪəˈlɒʤɪkəl fɔːˈmeɪʃənz ɒv trɑːŋ æn hæv biːn ˈskʌlptɪd baɪ pəˈsɪstənt wɪnd ænd ˈfləʊɪŋ ˈrɪvəz/", "Những kiến tạo địa chất kỳ vĩ của Tràng An đã được tạc nên bởi những cơn gió bền bỉ và những dòng sông uốn lượn.", "Giải thích kiến tạo Tràng An.", "Phát âm chuẩn 'sculpted' /ˈskʌlptɪd/ và 'geological' /ˌʤɪəˈlɒʤɪkəl/."),
        ("Tu San Canyon along the turquoise Nho Que River is considered to be the deepest geological chasm in Southeast Asia.", "/tuː sɑːn ˈkænjən əˈlɒŋ ðə ˈtɜːkwɑːz njɒ kweɪ ˈrɪvə ɪz kənˈsɪdəd tuː biː ðə ˈdiːpɪst ˌʤɪəˈlɒʤɪkəl ˈkæzəm ɪn ˌsaʊθˈiːst ˈeɪʒə/", "Hẻm Tu Sản dọc theo dòng sông Nho Quế màu xanh ngọc bích được coi là vực sâu địa chất sâu nhất Đông Nam Á.", "Giới thiệu Hẻm Tu Sản.", "Phát âm chuẩn 'turquoise' /ˈtɜːkwɑːz/ và 'chasm' /ˈkæzəm/."),
        ("Pristine white sand beaches and coral reefs must be shielded from uncontrolled commercial exploitation.", "/ˈprɪstiːn waɪt sænd ˈbiːʧɪz ænd ˈkɒrəl riːfs mʌst biː ˈʃiːldɪd frɒm ˌʌnkənˈtrəʊld kəˈmɜːʃəl ˌɛksplɔɪˈteɪʃən/", "Những bãi biển cát trắng nguyên sơ và rạn san hô phải được bảo vệ khỏi sự khai thác thương mại thiếu kiểm soát.", "Kêu gọi bảo vệ môi trường biển.", "Phát âm chuẩn 'pristine' /ˈprɪstiːn/ và 'exploitation' /ˌɛksplɔɪˈteɪʃən/."),
        ("It is confirmed that strict visitor caps help preserve the fragile subterranean ecosystem of the caves.", "/ɪt ɪz kənˈfɜːmd ðæt strɪkt ˈvɪzɪtə kæps hɛlp prɪˈzɜːv ðə ˈfræʤaɪl ˌsʌbtəˈreɪniən ˈiːkəʊˌsɪstəm ɒv ðə keɪvz/", "Đã có xác nhận rằng việc khống chế nghiêm ngặt số lượng khách giúp bảo tồn hệ sinh thái ngầm mỏng manh của các hang động.", "Nói về giới hạn khách tham quan.", "Phát âm chuẩn 'visitor caps' và 'fragile ecosystem' /ˈfræʤaɪl ˈiːkəʊˌsɪstəm/."),
        ("The colossal doline inside the cavern allows brilliant natural sunlight to nurture lush tropical foliage.", "/ðə kəˈlɒsl dəʊˈliːn ɪnˈsaɪd ðə ˈkævən əˈlaʊz ˈbrɪljənt ˈnætʃrəl ˈsʌnlaɪt tuː ˈnɜːʧə lʌʃ ˈtrɒpɪkəl ˈfəʊlɪɪʤ/", "Hố sụt khổng lồ bên trong vòm hang cho phép ánh sáng mặt trời rực rỡ nuôi dưỡng những tán cây nhiệt đới tươi tốt.", "Miêu tả hố sụt có cây xanh.", "Phát âm chuẩn 'colossal doline' /kəˈlɒsl dəʊˈliːn/ và 'foliage' /ˈfəʊlɪɪʤ/."),
        ("Did you know that Mount Everest is believed to grow a few millimeters taller every single year?", "/dɪd juː nəʊ ðæt maʊnt ˈɛvərɪst ɪz bɪˈliːvd tuː ɡrəʊ ə fjuː ˈmɪlɪˌmiːtəz ˈtɔːlər ˈɛvri ˈsɪŋɡl jɪə/", "Bạn có biết rằng Đỉnh Everest được tin là cao thêm vài milimét mỗi năm không?", "Nói về sự nâng lên địa chất của Everest.", "Phát âm chuẩn 'is believed to grow'."),
        ("The Grand Canyon, which was carved by the Colorado River, displays magnificent red sandstone strata.", "/ðə ɡrænd ˈkænjən wɪʧ wɒz kɑːvd baɪ ðə ˌkɒləˈrɑːdəʊ ˈrɪvə dɪsˈpleɪz mæɡˈnɪfɪsnt rɛd ˈsændstəʊn ˈstrɑːtə/", "Hẻm núi Grand Canyon, được tạc nên bởi sông Colorado, phô diễn những tầng sa thạch đỏ tuyệt mỹ.", "Miêu tả Grand Canyon.", "Phát âm chuẩn 'sandstone strata' /ˈsændstəʊn ˈstrɑːtə/."),
        ("It is universally acknowledged that pristine rainforests act as the indispensable green lungs of our biosphere.", "/ɪt ɪz ˌjuːnɪˈvɜːsəli əkˈnɒlɪʤd ðæt ˈprɪstiːn ˈreɪnˌfɒrɪsts ækt æz ði ˌɪndɪsˈpɛnsəbl ɡriːn lʌŋz ɒv ˈaʊə ˈbaɪəʊsfɪə/", "Được toàn cầu thừa nhận rằng những khu rừng nguyên sinh đóng vai trò là lá phổi xanh không thể thiếu của sinh quyển.", "Nói về vai trò rừng nguyên sinh.", "Phát âm chuẩn 'universally acknowledged' và 'biosphere' /ˈbaɪəʊsfɪə/."),
        ("Rowing softly through mystical subterranean grottoes fills travelers with peaceful wonder and deep humility.", "/ˈrəʊɪŋ ˈsɒftli θruː ˈmɪstɪkəl ˌsʌbtəˈreɪniən ˈɡrɒtəʊz fɪlz ˈtrævləz wɪð ˈpiːsfʊl ˈwʌndər ænd diːp hjuːˈmɪlɪti/", "Chèo thuyền nhẹ nhàng qua các hang động ngầm huyền ảo khiến du khách tràn ngập sự ngỡ ngàng bình yên và lòng khiêm nhường sâu sắc.", "Kể cảm xúc khi đi thuyền qua hang động.", "Phát âm chuẩn 'mystical grottoes' /ˈmɪstɪkəl ˈɡrɒtəʊz/."),
        ("Coral bleaching is reported to have intensified across shallow tropical waters due to climate warming.", "/ˈkɒrəl ˈbliːʧɪŋ ɪz rɪˈpɔːtɪd tuː hæv ɪnˈtɛnsɪfaɪd əˈkrɒs ˈʃæləʊ ˈtrɒpɪkəl ˈwɔːtəz djuː tuː ˈklaɪmɪt ˈwɔːmɪŋ/", "Hiện tượng tẩy trắng san hô được báo cáo là đã gia tăng nghiêm trọng trên các vùng nước nông nhiệt đới do biến đổi khí hậu.", "Cảnh báo hiện tượng san hô tẩy trắng.", "Phát âm chuẩn 'coral bleaching' /ˈkɒrəl ˈbliːʧɪŋ/."),
        ("Every citizen shares a sacred civic responsibility to preserve these irreplaceable natural masterpieces for posterity.", "/ˈɛvri ˈsɪtɪzn ʃeəz ə ˈseɪkrɪd ˈsɪvɪk rɪsˌpɒnsəˈbɪlɪti tuː prɪˈzɜːv ðiːz ˌɪrɪˈpleɪsəbl ˈnætʃrəl ˈmɑːstəpiːsɪz fɔː pɒsˈtɛrɪti/", "Mỗi công dân đều chia sẻ một trách nhiệm công dân thiêng liêng trong việc gìn giữ những kiệt tác thiên nhiên vô giá này cho muôn đời sau.", "Kêu gọi trách nhiệm giữ gìn di sản.", "Phát âm chuẩn 'irreplaceable masterpieces' và 'posterity' /pɒsˈtɛrɪti/."),
        ("The ancient volcanic lake is thought to have been created after a massive prehistoric eruption.", "/ði ˈeɪnʃənt vɒlˈkænɪk leɪk ɪz θɔːt tuː hæv biːn kriˈeɪtɪd ˈɑːftər ə ˈmæsɪv ˌpriːhɪsˈtɒrɪk ɪˈrʌpʃən/", "Hồ nước núi lửa cổ xưa được cho là đã hình thành sau một đợt phun trào tiền sử dữ dội.", "Giải thích nguồn gốc Biển Hồ.", "Phát âm chuẩn 'prehistoric eruption' /ˌpriːhɪsˈtɒrɪk ɪˈrʌpʃən/."),
        ("Witnessing Earth's majestic natural wonders reminds us of nature's boundless power and fragile perfection.", "/ˈwɪtnɪsɪŋ ɜːθs məˈʤɛstɪk ˈnætʃrəl ˈwʌndəz rɪˈmaɪndz ʌs ɒv ˈneɪʧəz ˈbaʊndlɪs ˈpaʊər ænd ˈfræʤaɪl pəˈfɛkʃən/", "Tận mắt chứng kiến những kỳ quan thiên nhiên hùng vĩ của Trái Đất nhắc nhở chúng ta về sức mạnh vô tận và sự hoàn mỹ mỏng manh của tự nhiên.", "Chiêm nghiệm về tự nhiên.", "Phát âm chuẩn 'boundless power' và 'fragile perfection'."),
        ("May these splendid natural wonders remain pristine sanctuaries of life, peace, and eternal beauty.", "/meɪ ðiːz ˈsplɛndɪd ˈnætʃrəl ˈwʌndəz rɪˈmeɪn ˈprɪstiːn ˈsæŋktjʊəriz ɒv laɪf piːs ænd ɪˈtɜːnl ˈbjuːti/", "Nguyện chúc cho những kỳ quan thiên nhiên lộng lẫy này sẽ mãi là những thánh địa nguyên sơ của sự sống, hòa bình và vẻ đẹp vĩnh cửu.", "Lời chúc tôn vinh kỳ quan thiên nhiên.", "Phát âm chuẩn 'sanctuaries' /ˈsæŋktjʊəriz/ và 'eternal beauty' /ɪˈtɜːnl ˈbjuːti/.")
    ])
]

u7_reading_info = {
    "title": "Kiệt Tác Địa Chất Vô Giá: Hang Sơn Đoòng & Hệ Thống Karst Phong Nha",
    "topic": "Khám phá địa chất hang Sơn Đoòng, thạch nhũ triệu năm, hố sụt doline và bảo tồn di sản thế giới",
    "passageText": "Hidden within the dense limestone karst landscapes of Quang Binh Province, Phong Nha - Ke Bang National Park represents one of Earth's most exceptional geological and speleological treasures. Formed more than 400 million years ago during the Paleozoic era, these ancient limestone formations contain the oldest karst massif in Asia. Among its thousands of subterranean caverns, Son Doong Cave stands out as a colossal natural marvel.\n\nAccidentally discovered by a local woodsman named Ho Khanh in 1991 and scientifically surveyed by the British Cave Research Association in 2009, Son Doong is confirmed to be the largest cave passage in the world by volume. Its main chamber is so cavernous that an entire 40-story Manhattan skyscraper or a Boeing 747 aircraft could fit comfortably inside. Even more astounding, the cave has generated its own independent microclimate; warm moist air mixing with cool cave temperatures creates localized atmospheric clouds swirling near the ceiling.\n\nFurthermore, two massive collapsed ceilings, scientifically termed dolines, allow beams of sunlight to pierce deep into the underground world. Beneath these sunlit openings thrive lush primary rainforests inhabited by monkeys, bats, and rare endemic insects. To prevent ecological degradation from mass tourism, authorities have implemented stringent annual visitor quotas and zero-impact trekking protocols, ensuring that this pristine wonder remains preserved for scientific posterity.",
    "keyVocabularyHighlights": [
        {"word": "speleological", "meaning": "thuộc về khoa học thám hiểm và nghiên cứu hang động"},
        {"word": "karst massif", "meaning": "khối núi karst đá vôi đồ sộ"},
        {"word": "microclimate", "meaning": "vi khí hậu cục bộ bên trong không gian kín"},
        {"word": "zero-impact trekking", "meaning": "hình thức đi bộ thám hiểm không để lại tác động môi trường"}
    ]
}

u7_reading_qs = [
    {"id": "u7-r1", "question": "When was the ancient karst massif of Phong Nha - Ke Bang formed according to paragraph 1?", "options": ["A. More than 400 million years ago during the Paleozoic era", "B. Last century", "C. Ten thousand years ago", "D. In 1991"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 1: 'Formed more than 400 million years ago during the Paleozoic era, these ancient limestone formations contain the oldest karst massif in Asia.'"},
    {"id": "u7-r2", "question": "Who initially discovered the entrance to Son Doong Cave in 1991?", "options": ["A. A local woodsman named Ho Khanh", "B. An international astronaut", "C. A university dean", "D. A ship captain"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'Accidentally discovered by a local woodsman named Ho Khanh in 1991.'"},
    {"id": "u7-r3", "question": "How large is the main chamber of Son Doong Cave?", "options": ["A. Large enough to fit a 40-story Manhattan skyscraper or a Boeing 747 aircraft", "B. Only the size of a bedroom", "C. Smaller than a bus", "D. The size of a classroom"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'Its main chamber is so cavernous that an entire 40-story Manhattan skyscraper or a Boeing 747 aircraft could fit comfortably inside.'"},
    {"id": "u7-r4", "question": "What creates the localized atmospheric clouds inside Son Doong?", "options": ["A. Warm moist air mixing with cool cave temperatures", "B. Smoke machines installed by tour guides", "C. Cooking fires from campers", "D. Chemical factories underground"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'warm moist air mixing with cool cave temperatures creates localized atmospheric clouds swirling near the ceiling.'"},
    {"id": "u7-r5", "question": "What allows lush primary rainforests to grow deep inside the cave?", "options": ["A. Sunlight piercing through massive collapsed ceilings (dolines)", "B. Powerful electric ultraviolet lamps", "C. Artificial greenhouse glass", "D. Flashlights carried by tourists"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'two massive collapsed ceilings, scientifically termed dolines, allow beams of sunlight to pierce deep into the underground world.'"},
    {"id": "u7-r6", "question": "What animals inhabit the subterranean rainforest inside Son Doong?", "options": ["A. Monkeys, bats, and rare endemic insects", "B. Whales and sharks", "C. Penguins and polar bears", "D. Elephants and giraffes"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'thrive lush primary rainforests inhabited by monkeys, bats, and rare endemic insects.'"},
    {"id": "u7-r7", "question": "What measures have authorities enforced to prevent ecological degradation?", "options": ["A. Stringent annual visitor quotas and zero-impact trekking protocols", "B. Building high-speed rollercoasters", "C. Paving the cave floor with asphalt", "D. Allowing unguided mass tours"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'implemented stringent annual visitor quotas and zero-impact trekking protocols.'"},
    {"id": "u7-r8", "question": "Which word in paragraph 2 is closest in meaning to 'cavernous'?", "options": ["A. Vast, immense, and extraordinarily spacious", "B. Tiny and narrow", "C. Extremely bright", "D. Very hot"], "correctAnswerIndex": 0, "explanation": "'Cavernous' có nghĩa là mênh mông, rộng thênh thang như một hang động khổng lồ."},
    {"id": "u7-r9", "question": "Which word in paragraph 3 is closest in meaning to 'stringent'?", "options": ["A. Strict, rigorous, and strictly enforced", "B. Loose and careless", "C. Friendly and funny", "D. Optional and brief"], "correctAnswerIndex": 0, "explanation": "'Stringent' có nghĩa là nghiêm ngặt, khắt khe."},
    {"id": "u7-r10", "question": "What is the best title for this passage?", "options": ["A. Son Doong Cave: Geological Marvel and Conservation in Phong Nha", "B. How to Build Commercial Bridges Across Rivers", "C. Agriculture Techniques for Mountain Farming", "D. The History of Modern High-Speed Trains"], "correctAnswerIndex": 0, "explanation": "Tiêu đề chuẩn xác nhất tóm lược kiệt tác địa chất Hang Sơn Đoòng và công tác bảo tồn Phong Nha."}
]

u7_writing_prompts = [
    {
        "id": "u7-w1",
        "title": "Đề 1: Write a paragraph describing a famous natural wonder of Vietnam (60-80 words)",
        "description": "Viết một đoạn văn miêu tả một kỳ quan thiên nhiên nổi tiếng của Việt Nam (Vịnh Hạ Long, Động Phong Nha, Thác Bản Giốc...).",
        "suggestedOutline": [
            "Introduction: Introduce the natural wonder (e.g., Ha Long Bay in Quang Ninh Province).",
            "Body: Describe its outstanding features (thousands of limestone islets, emerald sea, mystical caves).",
            "Conclusion: Express your pride in this UNESCO World Natural Heritage site."
        ],
        "usefulPhrases": [
            "Ha Long Bay in Quang Ninh Province is widely celebrated as an extraordinary UNESCO World Heritage site...",
            "It features thousands of towering limestone karsts and emerald islets rising majestically from turquoise waters...",
            "Visitors can kayak through serene grottoes like Sung Sot Cave to admire shimmering stalactites...",
            "This awe-inspiring natural wonder is a priceless jewel of Vietnam's national heritage."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Ha Long Bay in Quang Ninh Province is widely celebrated as an extraordinary UNESCO World Heritage wonder. It features thousands of dramatic limestone karsts and islets rising majestically from emerald green waters. Visitors can kayak through tranquil grottos to admire shimmering stalactites and mystical hidden lagoons. Watching the sun set over the picturesque seascape is unforgettable. Ha Long Bay is truly a priceless natural masterpiece that every Vietnamese citizen is proud of."
    },
    {
        "id": "u7-w2",
        "title": "Đề 2: Write a paragraph on why we must protect endangered coral reefs (60-80 words)",
        "description": "Viết một đoạn văn phân tích tại sao chúng ta phải khẩn cấp bảo vệ các rạn san hô đang bị đe dọa.",
        "suggestedOutline": [
            "Introduction: State that coral reefs are essential yet extremely fragile marine ecosystems.",
            "Body: Explain their vital roles (sheltering 25% of marine species, protecting coastlines from storms) and threats (bleaching, pollution).",
            "Conclusion: Call for urgent eco-friendly actions to conserve coral reefs."
        ],
        "usefulPhrases": [
            "Protecting marine coral reefs is of paramount importance for preserving ocean biodiversity...",
            "Although covering less than one percent of the ocean floor, coral reefs shelter over a quarter of all marine species...",
            "Furthermore, healthy reefs buffer coastal settlements against violent storm surges and beach erosion...",
            "We must curb plastic pollution and combat climate warming to ensure these underwater sanctuaries thrive."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Protecting fragile coral reefs is of paramount importance for preserving ocean biodiversity. Although covering less than one percent of the seafloor, coral reefs provide vital shelter and feeding grounds for over a quarter of all marine species. Furthermore, healthy reefs act as natural barriers shielding coastal villages against violent storm surges and erosion. We must strictly stop plastic dumping and reduce carbon emissions to protect these dazzling underwater ecosystems from dangerous coral bleaching."
    },
    {
        "id": "u7-w3",
        "title": "Đề 3: Write a paragraph about the uniqueness of Son Doong Cave (60-80 words)",
        "description": "Viết một đoạn văn làm nổi bật nét độc nhất vô nhị của Hang Sơn Đoòng.",
        "suggestedOutline": [
            "Introduction: State that Son Doong is the largest known natural cave in the world.",
            "Body: Detail unique aspects (contains underground clouds, primeval jungle under dolines, immense stalagmites).",
            "Conclusion: Emphasize the necessity of strict conservation."
        ],
        "usefulPhrases": [
            "Son Doong Cave in Quang Binh is renowned as the largest subterranean cavern on Earth...",
            "Its immense passages possess their own microclimate with localized clouds and a roaring subterranean river...",
            "Moreover, collapsed dolines allow sunlight to nourish primeval rainforests inhabited by rare wildlife...",
            "Strict eco-trekking regulations ensure this pristine wonderland remains protected for future generations."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Son Doong Cave in Quang Binh is celebrated worldwide as the largest subterranean cavern on Earth. Its colossal passages possess their own unique microclimate with localized atmospheric clouds and a roaring underground river. Moreover, magnificent collapsed dolines allow natural sunlight to nurture primeval rainforests teeming with rare monkeys and endemic insects. Strict expedition quotas ensure that this awe-inspiring geological treasure remains pristine and protected forever."
    },
    {
        "id": "u7-w4",
        "title": "Đề 4: Write a paragraph on the role of national parks in wildlife conservation (60-80 words)",
        "description": "Viết một đoạn văn trình bày vai trò của các vườn quốc gia trong việc bảo tồn động thực vật hoang dã.",
        "suggestedOutline": [
            "Introduction: State that national parks are crucial sanctuaries for preserving biodiversity.",
            "Body: Explain functions (providing safe natural habitats, preventing illegal poaching/deforestation, enabling scientific research).",
            "Conclusion: Affirm that national parks are vital for ecological balance."
        ],
        "usefulPhrases": [
            "National parks serve as indispensable sanctuaries for safeguarding Earth's vulnerable biodiversity...",
            "By protecting vast primary forests, they provide secure natural habitats where endangered flora and fauna thrive undisturbed...",
            "Additionally, park rangers deter illegal logging and poaching while enabling vital ecological research...",
            "Investing in national park preservation guarantees that ecological equilibrium is maintained for generations."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "National parks serve as indispensable sanctuaries for safeguarding Earth's rich biodiversity. By protecting vast tracts of primary rainforests, they provide safe natural habitats where critically endangered animals and rare plants can thrive without human disruption. Additionally, dedicated rangers prevent illegal hunting and deforestation while scientists conduct vital conservation research. Supporting national parks is essential to maintaining ecological balance and protecting our planet's irreplaceable living heritage."
    },
    {
        "id": "u7-w5",
        "title": "Đề 5: Write a paragraph about what students can do to promote natural wonders (60-80 words)",
        "description": "Viết một đoạn văn nêu những hành động thiết thực học sinh có thể làm để quảng bá và bảo vệ các kỳ quan thiên nhiên.",
        "suggestedOutline": [
            "Introduction: State that students can play an active role in promoting and protecting natural wonders.",
            "Body: Give practical actions (creating digital presentations, sharing bilingual posts, practicing leave-no-trace when traveling).",
            "Conclusion: Conclude that small actions make a big impact."
        ],
        "usefulPhrases": [
            "Students can contribute significantly to promoting and protecting Vietnam's breathtaking natural wonders...",
            "First, we can produce informative bilingual digital videos and blog articles highlighting our heritage sites...",
            "Second, when participating in field trips, we must practice strict leave-no-trace ethics and pick up litter...",
            "Through enthusiastic advocacy and environmental responsibility, youth can inspire global appreciation for our homeland."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Students can contribute significantly to promoting and protecting Vietnam's breathtaking natural wonders. First, we can produce creative bilingual video presentations and social media posts highlighting UNESCO sites like Phong Nha and Ha Long Bay to international friends. Second, whenever traveling, we must strictly practice leave-no-trace principles by never littering or damaging rock formations. Through enthusiastic advocacy and eco-friendly habits, youth can safeguard our natural heritage proudly."
    }
]

unit7 = make_unit(7, "Unit 7: Natural Wonders of the World", "Kỳ quan thiên nhiên thế giới", "Khám phá các kỳ quan thiên nhiên thế giới & Việt Nam (Hang Sơn Đoòng, Vịnh Hạ Long, Thác Bản Giốc), Câu bị động khách quan (It is said that / S + is believed to).", "Ngữ âm: Nhấn trọng âm từ 3-4 âm tiết chỉ địa chất và ngữ điệu câu trích dẫn bị động khách quan", "Mountain", u7_vocab, u7_grammar_info, u7_grammar_exs, u7_listening_info, u7_listening_qs, u7_listening_fibs, u7_speaking, u7_reading_info, u7_reading_qs, u7_writing_prompts)
write_ts_unit(7, unit7)
print("Unit 7 generated successfully!")

# ==============================================================================
# UNIT 8: TOURISM (20 Vocab, 20 Grammar, 8 Listening MC + 4 FIB, 20 Speaking, 10 Reading, 5 Writing)
# ==============================================================================
u8_vocab = [
    {"id": "u8-v1", "word": "sustainable tourism", "phonetic": "/səˈsteɪnəbl ˈtʊərɪzəm/", "partOfSpeech": "noun", "vietnameseMeaning": "du lịch bền vững", "englishExample": "Sustainable tourism aims to minimize ecological footprint while supporting local economic welfare.", "vietnameseExample": "Du lịch bền vững nhằm giảm thiểu dấu chân sinh thái đồng thời hỗ trợ phúc lợi kinh tế địa phương."},
    {"id": "u8-v2", "word": "ecotourism", "phonetic": "/ˈiːkəʊˌtʊərɪzəm/", "partOfSpeech": "noun", "vietnameseMeaning": "du lịch sinh thái", "englishExample": "Ecotourism excursions in national parks educate travelers on delicate plant conservation.", "vietnameseExample": "Các chuyến du lịch sinh thái tại vườn quốc gia giáo dục du khách về công tác bảo tồn thực vật quý."},
    {"id": "u8-v3", "word": "mass tourism", "phonetic": "/mæs ˈtʊərɪzəm/", "partOfSpeech": "noun", "vietnameseMeaning": "du lịch đại trà ồ ạt", "englishExample": "Uncontrolled mass tourism can overburden local sanitation infrastructure and water resources.", "vietnameseExample": "Du lịch đại trà ồ ạt thiếu kiểm soát có thể làm quá tải cơ sở hạ tầng vệ sinh và nguồn nước địa phương."},
    {"id": "u8-v4", "word": "itinerary", "phonetic": "/aɪˈtɪnərəri/", "partOfSpeech": "noun", "vietnameseMeaning": "lịch trình chuyến đi, hành trình", "englishExample": "Our 5-day travel itinerary includes cultural visits to imperial palaces and river boat rides.", "vietnameseExample": "Lịch trình chuyến đi 5 ngày của chúng tôi bao gồm các chuyến tham quan cung điện hoàng gia và du thuyền trên sông."},
    {"id": "u8-v5", "word": "hospitality industry", "phonetic": "/ˌhɒspɪˈtælɪti ˈɪndəstri/", "partOfSpeech": "noun", "vietnameseMeaning": "ngành công nghiệp khách sạn - nhà hàng - dịch vụ hiếu khách", "englishExample": "The hospitality industry creates abundant employment opportunities for local young adults.", "vietnameseExample": "Ngành dịch vụ hiếu khách tạo ra nhiều cơ hội việc làm phong phú cho thanh niên địa phương."},
    {"id": "u8-v6", "word": "package tour", "phonetic": "/ˈpækɪʤ tʊə/", "partOfSpeech": "noun", "vietnameseMeaning": "chuyến du lịch trọn gói", "englishExample": "The all-inclusive package tour covers flight tickets, lodging, guided tours, and three meals daily.", "vietnameseExample": "Chuyến du lịch trọn gói bao gồm vé máy bay, chỗ ở, hướng dẫn viên và ba bữa ăn mỗi ngày."},
    {"id": "u8-v7", "word": "guided excursion", "phonetic": "/ˈɡaɪdɪd ɪksˈkɜːʃən/", "partOfSpeech": "noun", "vietnameseMeaning": "chuyến tham quan có hướng dẫn viên chuyên nghiệp", "englishExample": "A guided excursion through historical ruins offers profound insights into ancient architecture.", "vietnameseExample": "Một chuyến tham quan có hướng dẫn viên qua các tàn tích lịch sử mang lại những hiểu biết sâu sắc về kiến trúc cổ đại."},
    {"id": "u8-v8", "word": "carbon footprint", "phonetic": "/ˈkɑːbən ˈfʊtprɪnt/", "partOfSpeech": "noun", "vietnameseMeaning": "dấu chân carbon (lượng phát thải khí nhà kính)", "englishExample": "Choosing trains over domestic flights significantly lowers your travel carbon footprint.", "vietnameseExample": "Chọn đi tàu hỏa thay vì máy bay nội địa giúp giảm đáng kể dấu chân carbon trong chuyến đi của bạn."},
    {"id": "u8-v9", "word": "local handicraft", "phonetic": "/ˈləʊkəl ˈhændɪkrɑːft/", "partOfSpeech": "noun", "vietnameseMeaning": "đồ thủ công mỹ nghệ địa phương", "englishExample": "Purchasing local handicrafts directly boosts the livelihood of ethnic artisan villages.", "vietnameseExample": "Mua các món đồ thủ công mỹ nghệ địa phương giúp thúc đẩy trực tiếp sinh kế của các làng nghề nghệ nhân dân tộc."},
    {"id": "u8-v10", "word": "overtourism", "phonetic": "/ˌəʊvəˈtʊərɪzəm/", "partOfSpeech": "noun", "vietnameseMeaning": "tình trạng quá tải du lịch", "englishExample": "Overtourism during peak holiday seasons can cause severe traffic congestion and waste spikes.", "vietnameseExample": "Tình trạng quá tải du lịch trong các mùa nghỉ lễ cao điểm có thể gây ùn tắc giao thông nghiêm trọng và rác thải tăng vọt."},
    {"id": "u8-v11", "word": "tourist attraction", "phonetic": "/ˈtʊərɪst əˈtrækʃən/", "partOfSpeech": "noun", "vietnameseMeaning": "điểm thu hút khách du lịch", "englishExample": "The ancient Japanese Covered Bridge in Hoi An is a renowned tourist attraction.", "vietnameseExample": "Chùa Cầu cổ kính ở Hội An là một điểm thu hút khách du lịch trứ danh."},
    {"id": "u8-v12", "word": "off the beaten track", "phonetic": "/ɒf ðə ˈbiːtn træk/", "partOfSpeech": "idiom", "vietnameseMeaning": "nơi hẻo lánh, hoang sơ, ít người biết đến", "englishExample": "Adventurous backpackers prefer exploring tranquil valleys that lie far off the beaten track.", "vietnameseExample": "Những du khách ba lô ưa mạo hiểm thích khám phá những thung lũng yên bình nằm khuất xa những tuyến đường mòn quen thuộc."},
    {"id": "u8-v13", "word": "eco-lodge", "phonetic": "/ˈiːkəʊ-lɒʤ/", "partOfSpeech": "noun", "vietnameseMeaning": "khu nghỉ dưỡng sinh thái thân thiện môi trường", "englishExample": "The eco-lodge uses solar energy, rainwater harvesting, and organic farm-to-table dining.", "vietnameseExample": "Khu nghỉ dưỡng sinh thái sử dụng năng lượng mặt trời, thu gom nước mưa và ẩm thực hữu cơ từ nông trại đến bàn ăn."},
    {"id": "u8-v14", "word": "cultural etiquette", "phonetic": "/ˈkʌlʧərəl ˈɛtɪkɛt/", "partOfSpeech": "noun", "vietnameseMeaning": "quy tắc ứng xử văn hóa", "englishExample": "Tourists should respect cultural etiquette by dressing modestly when visiting temples.", "vietnameseExample": "Du khách nên tôn trọng quy tắc ứng xử văn hóa bằng cách ăn mặc trang nhã khi viếng thăm đền chùa."},
    {"id": "u8-v15", "word": "souvenir vendor", "phonetic": "/ˌsuːvəˈnɪə ˈvɛndə/", "partOfSpeech": "noun", "vietnameseMeaning": "người bán quà lưu niệm", "englishExample": "The friendly souvenir vendor offered colorful bamboo flutes and woven conical hats.", "vietnameseExample": "Người bán quà lưu niệm thân thiện đã mời những cây sáo trúc rực rỡ và nón lá đan tay."},
    {"id": "u8-v16", "word": "peak season", "phonetic": "/piːk ˈsiːzn/", "partOfSpeech": "noun", "vietnameseMeaning": "mùa du lịch cao điểm", "englishExample": "Hotel room rates often double during the peak season from June to August.", "vietnameseExample": "Giá phòng khách sạn thường tăng gấp đôi trong mùa cao điểm từ tháng 6 đến tháng 8."},
    {"id": "u8-v17", "word": "low season", "phonetic": "/ləʊ ˈsiːzn/", "partOfSpeech": "noun", "vietnameseMeaning": "mùa du lịch thấp điểm (mùa vắng khách)", "englishExample": "Traveling during the low season offers cheaper accommodation and peaceful sightseeing.", "vietnameseExample": "Đi du lịch trong mùa thấp điểm mang lại giá phòng rẻ hơn và trải nghiệm ngắm cảnh yên bình."},
    {"id": "u8-v18", "word": "responsible traveler", "phonetic": "/rɪsˈpɒnsəbl ˈtrævələ/", "partOfSpeech": "noun", "vietnameseMeaning": "du khách có trách nhiệm với môi trường & cộng đồng", "englishExample": "A responsible traveler leaves nothing behind except footprints and takes nothing except photos.", "vietnameseExample": "Một du khách có trách nhiệm không để lại gì ngoài những dấu chân và không mang đi gì ngoài những bức ảnh đẹp."},
    {"id": "u8-v19", "word": "community-based tourism", "phonetic": "/kəˈmjuːnɪti-beɪst ˈtʊərɪzəm/", "partOfSpeech": "noun", "vietnameseMeaning": "du lịch dựa vào cộng đồng bản địa", "englishExample": "Community-based tourism empowers villagers by letting them host, guide, and cook for visitors.", "vietnameseExample": "Du lịch cộng đồng trao quyền cho người dân làng bằng cách để họ trực tiếp đón tiếp, hướng dẫn và nấu ăn cho du khách."},
    {"id": "u8-v20", "word": "unforgettable voyage", "phonetic": "/ˌʌnfəˈɡɛtəbl ˈvɔɪɪʤ/", "partOfSpeech": "noun", "vietnameseMeaning": "chuyến hải trình / chuyến du hành khó quên", "englishExample": "Cruising along the Mekong Delta waterways was an unforgettable voyage full of tropical charm.", "vietnameseExample": "Du ngoạn dọc theo những dòng kênh rạch Đồng bằng sông Cửu Long là một chuyến hải trình khó quên đầy nét quyến rũ nhiệt đới."}
]

u8_grammar_info = {
    "title": "Mạo Từ (A, An, The & Zero Article - Không Dùng Mạo Từ)",
    "summary": "Nắm vững quy tắc dùng mạo từ không xác định (a, an), mạo từ xác định (the - vật duy nhất, đại dương, dãy núi, quần đảo, đã xác định) và Không dùng mạo từ (Zero article - tên quốc gia đơn, tên hồ đơn, tên ngọn núi đơn, môn thể thao, bữa ăn).",
    "formulaBox": [
        "A / AN: Dùng với danh từ đếm được số ít, nhắc đến lần đầu (a tourist, an itinerary).",
        "THE: Dùng khi danh từ đã được nhắc lại, là duy nhất (the sun, the world), tên đại dương (the Pacific Ocean), dòng sông (the Mekong River), dãy núi (the Alps, the Himalayas), quần đảo (the Philippines).",
        "ZERO ARTICLE (Ø): Tên quốc gia đơn lẻ (Vietnam, Japan, France), tên núi đơn (Mount Everest, Mount Fansipan), tên hồ đơn (Lake Ba Be, West Lake), bữa ăn (breakfast, dinner), phương tiện sau 'by' (by bus, by plane)."
    ],
    "usagePoints": [
        {"title": "1. Dãy núi vs Đỉnh núi đơn lẻ", "detail": "Dãy núi (số nhiều) dùng 'the' (the Hoang Lien Son range, the Rocky Mountains); Đỉnh núi đơn lẻ không dùng mạo từ (Mount Fansipan, Mount Fuji).", "example": "We scaled Mount Fansipan in the Hoang Lien Son Mountains."},
        {"title": "2. Sông, biển vs Hồ đơn lẻ", "detail": "Sông/biển/đại dương dùng 'the' (the Red River, the East Sea, the Atlantic); Hồ đơn lẻ không dùng mạo từ (Hoan Kiem Lake, Lake Superior).", "example": "The boat sailed down the Perfume River near Hue."}
    ]
}

u8_grammar_exs = [
    {"id": "u8-g1", "question": "Ha Long Bay is located in _____ northern part of Vietnam.", "options": ["A. the", "B. a", "C. an", "D. Ø (no article)"], "correctAnswer": "A. the", "explanation": "Chỉ phương hướng/vùng địa lý xác định: 'in the northern part of...'."},
    {"id": "u8-g2", "question": "We had _____ delicious breakfast of hot pho before embarking on our city tour.", "options": ["A. a", "B. an", "C. the", "D. Ø (no article)"], "correctAnswer": "A. a", "explanation": "Khi có tính từ đứng trước bữa ăn (a delicious breakfast) dùng 'a'."},
    {"id": "u8-g3", "question": "Many daring hikers dream of conquering _____ Mount Fansipan during winter.", "options": ["A. Ø (no article)", "B. the", "C. a", "D. an"], "correctAnswer": "A. Ø (no article)", "explanation": "Tên ngọn núi đơn lẻ có 'Mount' không dùng mạo từ (Ø Mount Fansipan)."},
    {"id": "u8-g4", "question": "_____ Mekong River flows through six Asian countries before reaching the sea.", "options": ["A. The", "B. A", "C. An", "D. Ø (no article)"], "correctAnswer": "A. The", "explanation": "Tên dòng sông luôn có 'The' (The Mekong River)."},
    {"id": "u8-g5", "question": "My uncle works as _____ experienced tour guide in Da Nang.", "options": ["A. an", "B. a", "C. the", "D. Ø (no article)"], "correctAnswer": "A. an", "explanation": "Nghề nghiệp bắt đầu bằng nguyên âm /ɪ/ -> 'an experienced tour guide'."},
    {"id": "u8-g6", "question": "We traveled from Hanoi to Sa Pa by _____ train overnight.", "options": ["A. Ø (no article)", "B. the", "C. a", "D. an"], "correctAnswer": "A. Ø (no article)", "explanation": "Cấu trúc 'by + phương tiện' không dùng mạo từ (by train, by bus, by plane)."},
    {"id": "u8-g7", "question": "_____ Hoan Kiem Lake is situated in the historic center of Hanoi.", "options": ["A. Ø (no article)", "B. The", "C. A", "D. An"], "correctAnswer": "A. Ø (no article)", "explanation": "Tên hồ đơn lẻ không dùng 'the' (Ø Hoan Kiem Lake)."},
    {"id": "u8-g8", "question": "Responsible travelers always try to reduce _____ carbon footprint during their holidays.", "options": ["A. their", "B. a", "C. an", "D. the"], "correctAnswer": "D. the", "explanation": "'reduce the carbon footprint' (giảm dấu chân carbon xác định)."},
    {"id": "u8-g9", "question": "She bought _____ silk scarf in Hoi An, and _____ scarf was exquisitely handcrafted.", "options": ["A. a / the", "B. the / a", "C. a / a", "D. Ø / the"], "correctAnswer": "A. a / the", "explanation": "Nhắc lần đầu dùng 'a silk scarf', nhắc lại lần 2 dùng 'the scarf'."},
    {"id": "u8-g10", "question": "_____ Philippines consists of more than seven thousand tropical islands.", "options": ["A. The", "B. A", "C. An", "D. Ø (no article)"], "correctAnswer": "A. The", "explanation": "Tên quốc gia dạng quần đảo/số nhiều có 'The' (The Philippines)."},
    {"id": "u8-g11", "question": "We watched the sunset over _____ Pacific Ocean from our beach hotel.", "options": ["A. the", "B. a", "C. an", "D. Ø (no article)"], "correctAnswer": "A. the", "explanation": "Tên đại dương luôn có 'the' (the Pacific Ocean)."},
    {"id": "u8-g12", "question": "They arrived in _____ Paris on a rainy Tuesday afternoon.", "options": ["A. Ø (no article)", "B. the", "C. a", "D. an"], "correctAnswer": "A. Ø (no article)", "explanation": "Tên thành phố không dùng mạo từ (Ø Paris, Ø Hanoi)."},
    {"id": "u8-g13", "question": "Sustainable ecotourism plays _____ crucial role in safeguarding national parks.", "options": ["A. a", "B. an", "C. the", "D. Ø (no article)"], "correctAnswer": "A. a", "explanation": "Cụm 'play a crucial role in...' (đóng một vai trò quan trọng)."},
    {"id": "u8-g14", "question": "_____ sun was shining brightly as we boarded the boat in Ha Long.", "options": ["A. The", "B. A", "C. An", "D. Ø (no article)"], "correctAnswer": "A. The", "explanation": "Vật thể duy nhất trong tự nhiên dùng 'The' (The sun, the moon, the earth)."},
    {"id": "u8-g15", "question": "Did you play _____ volleyball on the beach with local teenagers yesterday?", "options": ["A. Ø (no article)", "B. the", "C. a", "D. an"], "correctAnswer": "A. Ø (no article)", "explanation": "Môn thể thao không dùng mạo từ sau play (play volleyball, play football)."},
    {"id": "u8-g16", "question": "_____ United Kingdom welcomes millions of international tourists each year.", "options": ["A. The", "B. A", "C. An", "D. Ø (no article)"], "correctAnswer": "A. The", "explanation": "Tên quốc gia có 'Kingdom, States, Republic' dùng 'The' (The United Kingdom)."},
    {"id": "u8-g17", "question": "He booked _____ all-inclusive package tour to Da Nang last weekend.", "options": ["A. an", "B. a", "C. the", "D. Ø (no article)"], "correctAnswer": "A. an", "explanation": "'all-inclusive' bắt đầu bằng nguyên âm /ɔː/ -> 'an all-inclusive package tour'."},
    {"id": "u8-g18", "question": "_____ Himalayas are the highest mountain range in the entire world.", "options": ["A. The", "B. A", "C. An", "D. Ø (no article)"], "correctAnswer": "A. The", "explanation": "Dãy núi số nhiều luôn dùng 'The' (The Himalayas, the Alps)."},
    {"id": "u8-g19", "question": "We always have _____ lunch together when we are traveling as a family.", "options": ["A. Ø (no article)", "B. the", "C. a", "D. an"], "correctAnswer": "A. Ø (no article)", "explanation": "Bữa ăn nói chung không có tính từ đi kèm -> 'have lunch' (không dùng mạo từ)."},
    {"id": "u8-g20", "question": "This eco-lodge is _____ most environmentally friendly accommodation in the valley.", "options": ["A. the", "B. a", "C. an", "D. Ø (no article)"], "correctAnswer": "A. the", "explanation": "So sánh nhất luôn dùng 'the' (the most environmentally friendly)."}
]

u8_listening_info = {
    "audioTitle": "Du Lịch Sinh Thái Bền Vững & Bảo Tồn Bản Sắc (Sustainable Ecotourism)",
    "audioDuration": "3:20",
    "audioScriptSpeaker": "Ecotourism Consultant Alex & Student Lan",
    "transcriptText": "Lan: Alex, how does sustainable ecotourism differ from conventional mass tourism?\nAlex: Hello Lan! While mass tourism often leads to overcrowded resorts, excessive waste, and cultural dilution, sustainable ecotourism prioritizes environmental preservation and community empowerment. It encourages travelers to stay in eco-lodges, minimize carbon footprints, and purchase authentic local handicrafts.\nLan: Can you give an example of successful community-based tourism in Vietnam?\nAlex: Absolutely! In Mai Chau and Sapa, ethnic minority villagers host travelers in traditional stilt houses, serve organic farm-to-table cuisine, and guide trekking tours along pristine trails. The economic revenue directly funds local schools and medical clinics without altering their cultural identity.\nLan: What golden advice would you give to teenage travelers?\nAlex: Always be a responsible traveler! Take nothing except memorable photographs, leave nothing except delicate footprints, and treat local cultural customs with deep respect!",
    "vietnameseTranslation": "Lan: Anh Alex ơi, du lịch sinh thái bền vững khác với du lịch đại trà thông thường như thế nào ạ?\nAlex: Chào Lan! Trong khi du lịch đại trà thường dẫn đến các khu nghỉ dưỡng quá tải, rác thải quá mức và phai nhạt văn hóa, thì du lịch sinh thái bền vững ưu tiên bảo tồn môi trường và trao quyền cho cộng đồng. Nó khuyến khích du khách ở tại các khu nghỉ dưỡng sinh thái, giảm thiểu dấu chân carbon và mua các sản phẩm thủ công mỹ nghệ địa phương chính hiệu.\nLan: Anh có thể cho một ví dụ về du lịch cộng đồng thành công ở Việt Nam không ạ?\nAlex: Chắc chắn rồi! Ở Mai Châu và Sa Pa, bà con dân tộc thiểu số đón tiếp du khách trong những nếp nhà sàn truyền thống, phục vụ ẩm thực hữu cơ từ vườn nhà và dẫn đường các chuyến đi bộ theo những con đường mòn nguyên sơ. Doanh thu kinh tế tài trợ trực tiếp cho các trường học và trạm y tế địa phương mà không làm thay đổi bản sắc văn hóa của họ.\nLan: Lời khuyên vàng nào anh muốn gửi đến các bạn du khách học sinh ạ?\nAlex: Hãy luôn là một du khách có trách nhiệm! Đừng mang theo gì ngoài những bức ảnh kỷ niệm, đừng để lại gì ngoài những dấu chân nhẹ nhàng và hãy đối xử với các phong tục văn hóa địa phương bằng sự tôn trọng sâu sắc!"
}

u8_listening_qs = [
    {"id": "u8-l1", "question": "What does sustainable ecotourism prioritize according to Alex?", "options": ["A. Environmental preservation and community empowerment", "B. Building huge shopping malls in forests", "C. Cutting down ancient trees", "D. Generating maximum plastic waste"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'sustainable ecotourism prioritizes environmental preservation and community empowerment.'"},
    {"id": "u8-l2", "question": "What negative impacts can mass tourism cause?", "options": ["A. Overcrowded resorts, excessive waste, and cultural dilution", "B. Making mountains taller", "C. Free electricity for everyone", "D. Turning all water into juice"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'mass tourism often leads to overcrowded resorts, excessive waste, and cultural dilution.'"},
    {"id": "u8-l3", "question": "What destinations did Alex highlight as successful community-based tourism examples?", "options": ["A. Mai Chau and Sapa", "B. Large industrial seaports", "C. Highway toll stations", "D. Airport runways"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'In Mai Chau and Sapa, ethnic minority villagers host travelers...'"},
    {"id": "u8-l4", "question": "Where do travelers stay when visiting community-based tourism villages in Mai Chau?", "options": ["A. In traditional stilt houses", "B. In concrete skyscraper hotels", "C. Inside underground caves", "D. In plastic tents on the road"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'host travelers in traditional stilt houses.'"},
    {"id": "u8-l5", "question": "What kind of food is served to travelers at these community homestays?", "options": ["A. Organic farm-to-table cuisine", "B. Highly processed fast food only", "C. Frozen canned dinners", "D. Imported junk food"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'serve organic farm-to-table cuisine.'"},
    {"id": "u8-l6", "question": "How does tourism revenue benefit the local villagers directly?", "options": ["A. Funds local schools and medical clinics", "B. Buys imported luxury sports cars", "C. Builds nuclear reactors", "D. Pays for space travel"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'The economic revenue directly funds local schools and medical clinics.'"},
    {"id": "u8-l7", "question": "What is the classic golden motto for responsible travelers?", "options": ["A. Take nothing except photographs, leave nothing except footprints", "B. Take all the rocks home and leave all trash", "C. Shout loudly in temples", "D. Never talk to local people"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'Take nothing except memorable photographs, leave nothing except delicate footprints.'"},
    {"id": "u8-l8", "question": "What attitude should travelers have toward local cultural customs?", "options": ["A. Treat them with deep respect and understanding", "B. Mock and laugh at them", "C. Ignore them completely", "D. Try to change them immediately"], "correctAnswerIndex": 0, "explanation": "Alex khuyên: 'treat local cultural customs with deep respect!'"}
]

u8_listening_fibs = [
    {"id": "u8-f1", "sentenceWithBlank": "Ecotourism prioritizes environmental preservation and community _____.", "correctWord": "empowerment", "hint": "Trao quyền cho cộng đồng (empowerment)"},
    {"id": "u8-f2", "sentenceWithBlank": "Villagers host travelers in traditional _____ houses.", "correctWord": "stilt", "hint": "Nhà sàn (stilt houses)"},
    {"id": "u8-f3", "sentenceWithBlank": "Tourism revenue directly funds local schools and medical _____.", "correctWord": "clinics", "hint": "Trạm xá y tế (clinics)"},
    {"id": "u8-f4", "sentenceWithBlank": "Responsible travelers leave nothing behind except _____.", "correctWord": "footprints", "hint": "Dấu chân (footprints)"}
]

u8_speaking = [
    {"id": f"u8-s{i+1}", "targetSentence": s, "ipa": ipa, "vietnameseMeaning": vm, "contextSituation": ctx, "keyPhonicsFocus": kpf, "sampleAudioText": s}
    for i, (s, ipa, vm, ctx, kpf) in enumerate([
        ("Sustainable ecotourism encourages mindful travelers to support local communities while protecting delicate natural ecosystems.", "/səˈsteɪnəbl ˈiːkəʊˌtʊərɪzəm ɪnˈkʌrɪʤɪz ˈmaɪndfʊl ˈtrævləz tuː səˈpɔːt ˈləʊkəl kəˈmjuːnɪtiz waɪl prəˈtɛktɪŋ ˈdɛlɪkɪt ˈnætʃrəl ˈiːkəʊˌsɪstəmz/", "Du lịch sinh thái bền vững khuyến khích du khách có chánh niệm hỗ trợ cộng đồng địa phương đồng thời bảo vệ các hệ sinh thái tự nhiên mỏng manh.", "Thuyết trình về lợi ích du lịch sinh thái.", "Phát âm chuẩn 'sustainable ecotourism' và 'mindful travelers' /ˈmaɪndfʊl ˈtrævləz/."),
        ("We booked a guided excursion along the Mekong River to witness the vibrant floating markets of Cai Rang.", "/wiː bʊkt ə ˈɡaɪdɪd ɪksˈkɜːʃən əˈlɒŋ ðə meɪˈkɒŋ ˈrɪvə tuː ˈwɪtnɪs ðə ˈvaɪbrənt ˈfləʊtɪŋ ˈmɑːkɪts ɒv kaɪ ræŋ/", "Chúng tôi đã đặt một chuyến tham quan có hướng dẫn dọc theo sông Mê Kông để tận mắt chứng kiến chợ nổi Cái Răng rực rỡ sắc màu.", "Kể về chuyến đi chợ nổi Cái Răng.", "Phát âm chuẩn 'guided excursion' /ˈɡaɪdɪd ɪksˈkɜːʃən/ và 'the Mekong River'."),
        ("Choosing eco-lodges that utilize clean solar power significantly diminishes our holiday carbon footprint.", "/ˈʧuːzɪŋ ˈiːkəʊ-lɒʤɪz ðæt ˈjuːtɪlaɪz kliːn ˈsəʊlə ˈpaʊə sɪɡˈnɪfɪkəntli dɪˈmɪnɪʃɪz ˈaʊə ˈhɒlɪdeɪ ˈkɑːbən ˈfʊtprɪnt/", "Lựa chọn các khu nghỉ dưỡng sinh thái sử dụng năng lượng mặt trời sạch giúp làm giảm đáng kể dấu chân carbon trong kỳ nghỉ của chúng ta.", "Nói về lưu trú sinh thái.", "Phát âm chuẩn 'eco-lodges' /ˈiːkəʊ-lɒʤɪz/ và 'carbon footprint' /ˈkɑːbən ˈfʊtprɪnt/."),
        ("Purchasing authentic handcrafted brocade directly from ethnic artisans provides vital economic livelihood to mountain hamlets.", "/ˈpɜːʧəsɪŋ ɔːˈθɛntɪk ˈhændˌkrɑːftɪd brəʊˈkeɪd dɪˈrɛktli frɒm ˈɛθnɪk ˈɑːtɪzænz prəˈvaɪdz ˈvaɪtl ˌiːkəˈnɒmɪk ˈlaɪvlɪhʊd tuː ˈmaʊntɪn ˈhæmlɪts/", "Mua thổ cẩm thủ công chính hiệu trực tiếp từ các nghệ nhân dân tộc mang lại sinh kế kinh tế thiết yếu cho các thôn bản vùng cao.", "Kêu gọi ủng hộ sản phẩm địa phương.", "Phát âm chuẩn 'economic livelihood' /ˌiːkəˈnɒmɪk ˈlaɪvlɪhʊd/ và 'artisans' /ˈɑːtɪzænz/."),
        ("Responsible travelers always adhere strictly to local cultural etiquette when entering sacred religious sanctuaries.", "/rɪsˈpɒnsəbl ˈtrævələz ˈɔːlweɪz ədˈhɪə ˈstrɪktli tuː ˈləʊkəl ˈkʌlʧərəl ˈɛtɪkɛt wɛn ˈɛntərɪŋ ˈseɪkrɪd rɪˈlɪʤəs ˈsæŋktjʊəriz/", "Những du khách có trách nhiệm luôn tuân thủ nghiêm ngặt quy tắc ứng xử văn hóa địa phương khi bước vào các thánh đường tôn giáo linh thiêng.", "Nói về ứng xử văn hóa khi du lịch.", "Phát âm chuẩn 'cultural etiquette' /ˈkʌlʧərəl ˈɛtɪkɛt/ và 'adhere' /ədˈhɪə/."),
        ("Community-based tourism empowers local villagers by transforming them into proud cultural ambassadors and guides.", "/kəˈmjuːnɪti-beɪst ˈtʊərɪzəm ɪmˈpaʊəz ˈləʊkəl ˈvɪlɪʤəz baɪ trænsˈfɔːmɪŋ ðɛm ˈɪntuː praʊd ˈkʌlʧərəl æmˈbæsədəz ænd ɡaɪdz/", "Du lịch dựa vào cộng đồng trao quyền cho người dân địa phương bằng cách biến họ thành những đại sứ văn hóa và hướng dẫn viên đầy tự hào.", "Thuyết trình về du lịch cộng đồng.", "Phát âm chuẩn 'cultural ambassadors' /ˈkʌlʧərəl æmˈbæsədəz/."),
        ("Overtourism in popular seaside resorts can overwhelm municipal waste management systems and destroy coral beds.", "/ˌəʊvəˈtʊərɪzəm ɪn ˈpɒpjʊlə ˈsiːsaɪd rɪˈzɔːts kæn ˌəʊvəˈwɛlm mjuːˈnɪsɪpəl weɪst ˈmænɪʤmənt ˈsɪstəmz ænd dɪsˈtrɔɪ ˈkɒrəl bɛdz/", "Tình trạng quá tải du lịch tại các khu nghỉ mát ven biển nổi tiếng có thể làm quá tải hệ thống xử lý rác thải đô thị và hủy hoại các bãi san hô.", "Cảnh báo tác hại quá tải du lịch.", "Phát âm chuẩn 'overtourism' /ˌəʊvəˈtʊərɪzəm/ và 'overwhelm' /ˌəʊvəˈwɛlm/."),
        ("Our comprehensive five-day itinerary balances adventurous jungle trekking with relaxing traditional herbal baths.", "/ˈaʊə ˌkɒmprɪˈhɛnsɪv faɪv-deɪ aɪˈtɪnərəri ˈbælənsɪz ədˈvɛnʧərəs ˈʤʌŋɡl ˈtrɛkɪŋ wɪð rɪˈlæksɪŋ trəˈdɪʃənl ˈhɜːbəl bɑːðz/", "Lịch trình 5 ngày toàn diện của chúng tôi cân bằng giữa đi bộ xuyên rừng mạo hiểm và thư giãn với bồn tắm thảo dược truyền thống.", "Giới thiệu lịch trình du lịch.", "Phát âm chuẩn 'itinerary' /aɪˈtɪnərəri/ và 'herbal baths' /ˈhɜːbəl bɑːðz/."),
        ("Did you taste the mouthwatering local specialty of grilled bamboo-tube rice during your stay in the highlands?", "/dɪd juː teɪst ðə ˈmaʊθˌwɔːtərɪŋ ˈləʊkəl ˈspɛʃəlti ɒv ɡrɪld bæmˈbuː-tjuːb raɪs ˈdjʊərɪŋ jɔː steɪ ɪn ðə ˈhaɪləndz/", "Bạn đã nếm thử món đặc sản địa phương ngon chảy nước miếng là cơm lam nướng trong thời gian ở vùng cao chưa?", "Hỏi về trải nghiệm ẩm thực vùng cao.", "Phát âm chuẩn 'mouthwatering specialty' /ˈmaʊθˌwɔːtərɪŋ ˈspɛʃəlti/."),
        ("Traveling during the off-peak low season enables visitors to enjoy peaceful sightseeing and cheaper lodging rates.", "/ˈtrævlɪŋ ˈdjʊərɪŋ ði ɒf-piːk ləʊ ˈsiːzn ɪˈneɪblz ˈvɪzɪtəz tuː ɪnˈʤɔɪ ˈpiːsfʊl ˈsaɪtˌsiːɪŋ ænd ˈʧiːpə ˈlɒʤɪŋ reɪts/", "Đi du lịch vào mùa thấp điểm vắng khách giúp du khách tận hưởng việc ngắm cảnh yên bình và giá phòng ở rẻ hơn.", "Khuyên đi du lịch mùa thấp điểm.", "Phát âm chuẩn 'off-peak low season' và 'lodging rates'."),
        ("A truly memorable voyage is measured by deep cross-cultural friendships forged rather than souvenirs collected.", "/ə ˈtruːli ˈmɛmərəbl ˈvɔɪɪʤ ɪz ˈmɛʒəd baɪ diːp krɒs-ˈkʌlʧərəl ˈfrɛndʃɪps fɔːʤd ˈrɑːðə ðæn ˌsuːvəˈnɪəz kəˈlɛktɪd/", "Một chuyến du hành thực sự đáng nhớ được đo lường bằng những tình bạn giao lưu văn hóa sâu sắc được tạo dựng hơn là số quà lưu niệm thu thập được.", "Triết lý về du lịch.", "Phát âm chuẩn 'memorable voyage' /ˈmɛmərəbl ˈvɔɪɪʤ/."),
        ("Homestay operators who adopt zero-plastic waste policies inspire global travelers to practice daily sustainability.", "/ˈhəʊmsteɪ ˈɒpəreɪtəz huː əˈdɒpt ˈzɪərəʊ-ˈplæstɪk weɪst ˈpɒlɪsiz ɪnˈspaɪə ˈɡləʊbəl ˈtrævləz tuː ˈpræktɪs ˈdeɪli səsˌteɪnəˈbɪlɪti/", "Những người kinh doanh homestay áp dụng chính sách không rác thải nhựa truyền cảm hứng cho du khách quốc tế thực hành lối sống bền vững hàng ngày.", "Khen ngợi homestay không rác thải nhựa.", "Phát âm chuẩn 'zero-plastic waste' và 'sustainability' /səsˌteɪnəˈbɪlɪti/."),
        ("Take nothing but breathtaking photos and leave nothing behind except gentle footprints on sandy beaches.", "/teɪk ˈnʌθɪŋ bʌt ˈbrɛθˌteɪkɪŋ ˈfəʊtəʊz ænd liːv ˈnʌθɪŋ bɪˈhaɪnd ɪkˈsɛpt ˈʤɛntl ˈfʊtprɪnts ɒn ˈsændi ˈbiːʧɪz/", "Đừng lấy gì ngoài những bức ảnh ngoạn mục và đừng để lại gì phía sau ngoài những dấu chân nhẹ nhàng trên bờ cát.", "Khẩu hiệu du lịch xanh.", "Phát âm chuẩn ngữ điệu nhịp nhàng của câu khẩu hiệu du lịch."),
        ("The hospitality industry in Vietnam continues to integrate green technologies to minimize energy consumption.", "/ðə ˌhɒspɪˈtælɪti ˈɪndəstri ɪn ˌvjɛtnəˈmiːz kənˈtɪnjuːz tuː ˈɪntɪɡreɪt ɡriːn tɛkˈnɒləʤiz tuː ˈmɪnɪmaɪz ˈɛnəʤi kənˈsʌmpʃən/", "Ngành du lịch - khách sạn ở Việt Nam tiếp tục tích hợp các công nghệ xanh nhằm giảm thiểu tiêu thụ năng lượng.", "Nói về chuyển đổi xanh ngành khách sạn.", "Phát âm chuẩn 'hospitality industry' và 'minimize' /ˈmɪnɪmaɪz/."),
        ("Exploring destinations far off the beaten track enables backpackers to encounter untamed wilderness and authentic customs.", "/ɪksˈplɔːrɪŋ ˌdɛstɪˈneɪʃənz fɑːr ɒf ðə ˈbiːtn træk ɪˈneɪblz ˈbækˌpækəz tuː ɪnˈkaʊntər ʌnˈteɪmd ˈwɪldənɪs ænd ɔːˈθɛntɪk ˈkʌstəmz/", "Khám phá những điểm đến xa xôi ít người biết giúp dân phượt bắt gặp thiên nhiên hoang sơ và các phong tục tập quán chân thực.", "Nói về du lịch mạo hiểm hoang sơ.", "Phát âm chuẩn 'off the beaten track' và 'untamed wilderness' /ʌnˈteɪmd ˈwɪldənɪs/."),
        ("Responsible tourism educates young generations to cherish biodiversity and preserve indigenous cultural heritages.", "/rɪsˈpɒnsəbl ˈtʊərɪzəm ˈɛʤʊkeɪts jʌŋ ˌʤɛnəˈreɪʃənz tuː ˈʧɛrɪʃ ˌbaɪəʊdaɪˈvɜːsɪti ænd prɪˈzɜːv ɪnˈdɪʤɪnəs ˈkʌlʧərəl ˈhɛrɪtɪʤɪz/", "Du lịch có trách nhiệm giáo dục các thế hệ trẻ biết trân trọng đa dạng sinh học và giữ gìn các di sản văn hóa bản địa.", "Nhấn mạnh vai trò giáo dục của du lịch.", "Phát âm chuẩn 'indigenous' /ɪnˈdɪʤɪnəs/ và 'cherish' /ˈʧɛrɪʃ/."),
        ("Always support independent local restaurants that serve dishes cooked with locally sourced fresh ingredients.", "/ˈɔːlweɪz səˈpɔːt ˌɪndɪˈpɛndənt ˈləʊkəl ˈrɛstrɒnts ðæt sɜːv ˈdɪʃɪz kʊkt wɪð ˈləʊkəli sɔːst frɛʃ ɪnˈɡriːdiənts/", "Hãy luôn ủng hộ các nhà hàng địa phương độc lập phục vụ những món ăn được chế biến từ nguyên liệu tươi ngon lấy từ nguồn tại chỗ.", "Khuyên ủng hộ quán ăn bản địa.", "Phát âm chuẩn 'locally sourced ingredients'."),
        ("The international travel fair showcased fascinating ecotourism circuits across Vietnam's northern mountains.", "/ði ˌɪntəˈnæʃənl ˈtrævl feə ˈʃəʊkeɪst ˈfæsɪneɪtɪŋ ˈiːkəʊˌtʊərɪzəm ˈsɜːkɪts əˈkrɒs ˌvjɛtnəˈmiːz ˈnɔːðən ˈmaʊntɪnz/", "Hội chợ du lịch quốc tế đã giới thiệu những tour tuyến du lịch sinh thái hấp dẫn khắp núi rừng phía Bắc Việt Nam.", "Kể về hội chợ du lịch.", "Phát âm chuẩn 'showcased' /ˈʃəʊkeɪst/ và 'circuits' /ˈsɜːkɪts/."),
        ("May your travels across our magnificent planet open your heart, illuminate your mind, and foster global peace.", "/meɪ jɔː ˈtrævlz əˈkrɒs ˈaʊə mæɡˈnɪfɪsnt ˈplænɪt ˈəʊpən jɔː hɑːt ɪˈljuːmɪneɪt jɔː maɪnd ænd ˈfɒstə ˈɡləʊbəl piːs/", "Chúc cho những chuyến đi khắp hành tinh tráng lệ của chúng ta sẽ mở rộng trái tim bạn, thắp sáng tâm trí bạn và vun đắp hòa bình toàn cầu.", "Lời chúc du lịch ý nghĩa.", "Phát âm chuẩn 'foster global peace' và 'illuminate' /ɪˈljuːmɪneɪt/."),
        ("Every mindful journey taken today helps preserve our planet's timeless wonders for endless generations tomorrow.", "/ˈɛvri ˈmaɪndfʊl ˈʤɜːni ˈteɪkən təˈdeɪ hɛlps prɪˈzɜːv ˈaʊə ˈplænɪts ˈtaɪmlɪs ˈwʌndəz fɔːr ˈɛndlɪs ˌʤɛnəˈreɪʃənz təˈmɒrəʊ/", "Mỗi hành trình có chánh niệm hôm nay đều giúp gìn giữ những kỳ quan bất tận của hành tinh cho muôn vàn thế hệ mai sau.", "Thông điệp kết thúc về du lịch bền vững.", "Phát âm chuẩn 'mindful journey' và 'timeless wonders'.")
    ])
]

u8_reading_info = {
    "title": "Chuyển Dịch Sang Du Lịch Bền Vững: Cân Bằng Giữa Kinh Tế Và Bảo Tồn",
    "topic": "Phân tích xu hướng du lịch sinh thái bền vững, du lịch cộng đồng và khắc phục hậu quả quá tải du lịch",
    "passageText": "The global tourism industry has long served as a powerful engine for socioeconomic advancement, generating millions of jobs and promoting international cross-cultural understanding. However, the unchecked expansion of conventional mass tourism has inflicted severe ecological scars on vulnerable destinations worldwide. Popular coastal resorts and heritage towns frequently suffer from severe overtourism, characterized by excessive water depletion, unmanageable plastic waste accumulation, coral reef degradation, and cultural commercialization.\n\nIn response to these alarming crises, a profound global shift toward sustainable ecotourism and community-based tourism has gained decisive momentum. Sustainable tourism fundamentally redefines travel ethics by prioritizing three interconnected pillars: ecological conservation, socioeconomic equity for host communities, and authentic experiential enrichment for travelers. By capping visitor quotas in sensitive nature reserves and promoting off-peak travel, destinations can mitigate environmental strain while maintaining consistent economic vitality.\n\nIn Vietnam, community-based tourism models in regions like Mai Chau, Sa Pa, and the Mekong Delta exemplify this harmonious paradigm. Ethnic minority households accommodate travelers in eco-friendly stilt houses, serve organic cuisine sourced from family gardens, and guide treks along ancient ancestral footpaths. The generated revenue directly finances community schooling, healthcare facilities, and cultural preservation funds. Ultimately, the future of tourism belongs to conscious, responsible travelers who perceive travel not as passive consumerism, but as a reciprocal partnership of respect, conservation, and mutual upliftment.",
    "keyVocabularyHighlights": [
        {"word": "socioeconomic equity", "meaning": "sự công bằng và bình đẳng về kinh tế - xã hội"},
        {"word": "reciprocal partnership", "meaning": "mối quan hệ đối tác tương hỗ hai chiều cùng có lợi"},
        {"word": "cultural commercialization", "meaning": "sự thương mại hóa làm mất đi tính nguyên bản của văn hóa"},
        {"word": "visitor quotas", "meaning": "hạn ngạch khống chế số lượng khách tham quan"}
    ]
}

u8_reading_qs = [
    {"id": "u8-r1", "question": "What positive benefits has the global tourism industry historically generated according to paragraph 1?", "options": ["A. Socioeconomic advancement, millions of jobs, and cross-cultural understanding", "B. Elimination of all schools", "C. Total destruction of all languages", "D. Stopping all international flights"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 1: 'engine for socioeconomic advancement, generating millions of jobs and promoting international cross-cultural understanding.'"},
    {"id": "u8-r2", "question": "What severe ecological problems does conventional mass tourism cause?", "options": ["A. Excessive water depletion, unmanageable plastic waste, coral reef degradation, and overtourism", "B. Making oceans too clean", "C. Planting too many trees", "D. Lowering global temperatures"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 1: 'excessive water depletion, unmanageable plastic waste accumulation, coral reef degradation, and cultural commercialization.'"},
    {"id": "u8-r3", "question": "What are the three interconnected pillars of sustainable tourism in paragraph 2?", "options": ["A. Ecological conservation, socioeconomic equity, and authentic experiential enrichment", "B. High prices, fast cars, and luxury yachts", "C. Building huge factories, cutting forests, and selling plastic", "D. Closing all borders"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'three interconnected pillars: ecological conservation, socioeconomic equity for host communities, and authentic experiential enrichment for travelers.'"},
    {"id": "u8-r4", "question": "How can destinations mitigate environmental strain according to paragraph 2?", "options": ["A. By capping visitor quotas and promoting off-peak travel", "B. By allowing millions of unguided tourists daily", "C. By dumping trash into rivers", "D. By cutting down all trees"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'By capping visitor quotas in sensitive nature reserves and promoting off-peak travel...'"},
    {"id": "u8-r5", "question": "What Vietnamese regions are highlighted as successful models of community-based tourism?", "options": ["A. Mai Chau, Sa Pa, and the Mekong Delta", "B. Industrial chemical manufacturing zones", "C. Desert coal mines", "D. Underground submarine docks"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'In Vietnam, community-based tourism models in regions like Mai Chau, Sa Pa, and the Mekong Delta exemplify this harmonious paradigm.'"},
    {"id": "u8-r6", "question": "How do ethnic minority households host travelers in these sustainable models?", "options": ["A. Accommodate in eco-friendly stilt houses, serve organic garden food, and guide treks", "B. Lock them inside dark rooms", "C. Make them work in factories", "D. Force them to buy cars"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'accommodate travelers in eco-friendly stilt houses, serve organic cuisine sourced from family gardens, and guide treks.'"},
    {"id": "u8-r7", "question": "How does community-based tourism revenue support local villages?", "options": ["A. Finances community schooling, healthcare facilities, and cultural preservation funds", "B. Spends all money on imported jewelry", "C. Builds heavy military weapons", "D. Nothing"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'directly finances community schooling, healthcare facilities, and cultural preservation funds.'"},
    {"id": "u8-r8", "question": "Which word in paragraph 1 is closest in meaning to 'depletion'?", "options": ["A. Reduction, exhaustion, or using up of vital resources", "B. Increase and expansion", "C. Production of food", "D. Freezing of water"], "correctAnswerIndex": 0, "explanation": "'Depletion' có nghĩa là sự cạn kiệt, suy giảm nghiêm trọng nguồn tài nguyên."},
    {"id": "u8-r9", "question": "Which word in paragraph 3 is closest in meaning to 'reciprocal'?", "options": ["A. Mutual, two-way, and given and received in return", "B. One-sided and selfish", "C. Hostile and violent", "D. Temporary and fake"], "correctAnswerIndex": 0, "explanation": "'Reciprocal' có nghĩa là tương hỗ, qua lại hai chiều."},
    {"id": "u8-r10", "question": "What is the primary message of the author in this passage?", "options": ["A. Tourism must transition toward sustainability, respect, and community empowerment", "B. All forms of travel should be permanently outlawed", "C. Mass tourism with huge waste is the only good model", "D. Tourists should never talk to villagers"], "correctAnswerIndex": 0, "explanation": "Thông điệp chính khẳng định ngành du lịch cần chuyển dịch sang mô hình bền vững, tôn trọng môi trường và trao quyền cho cộng đồng."}
]

u8_writing_prompts = [
    {
        "id": "u8-w1",
        "title": "Đề 1: Write a paragraph on the benefits of ecotourism for local communities (60-80 words)",
        "description": "Viết một đoạn văn trình bày những lợi ích to lớn của du lịch sinh thái đối với cộng đồng dân cư địa phương.",
        "suggestedOutline": [
            "Introduction: State that ecotourism provides vital socioeconomic and environmental benefits.",
            "Body: Explain benefits (generating sustainable income for villagers, funding local schools/clinics, protecting local forests).",
            "Conclusion: Affirm that ecotourism fosters sustainable community development."
        ],
        "usefulPhrases": [
            "Ecotourism delivers immense socioeconomic and environmental advantages to local communities...",
            "First, it creates sustainable employment as villagers work as homestay hosts, culinary cooks, and tour guides...",
            "Second, tourism earnings directly finance rural schools, healthcare centers, and clean water infrastructure...",
            "Most importantly, it empowers residents to protect their surrounding forests and cherish indigenous traditions."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Ecotourism delivers immense socioeconomic and environmental advantages to local communities. First, it generates sustainable livelihoods for villagers by creating jobs as homestay hosts, local cooks, and nature guides. Second, tourism earnings directly finance village schooling, healthcare clinics, and clean water projects. Most importantly, ecotourism empowers residents to actively preserve their surrounding forests and wildlife rather than engaging in deforestation. It is truly a win-win model for people and nature."
    },
    {
        "id": "u8-w2",
        "title": "Đề 2: Write a paragraph about what makes a responsible tourist (60-80 words)",
        "description": "Viết một đoạn văn định nghĩa và nêu các hành vi chuẩn mực của một du khách có trách nhiệm.",
        "suggestedOutline": [
            "Introduction: Define what it means to be a responsible tourist.",
            "Body: List key actions (minimizing plastic waste, respecting cultural dress codes/customs, buying local handicrafts).",
            "Conclusion: Encourage everyone to practice responsible travel."
        ],
        "usefulPhrases": [
            "Being a responsible tourist means traveling mindfully with deep respect for local cultures and environments...",
            "Responsible travelers minimize plastic waste by carrying reusable water bottles and cloth tote bags...",
            "Additionally, they dress respectfully when visiting sacred temples and support ethnic artisans by purchasing genuine handicrafts...",
            "By leaving positive impacts wherever they go, responsible travelers help keep tourism sustainable."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Being a responsible tourist means traveling mindfully with deep respect for local environments and cultural traditions. Responsible travelers minimize single-use plastic waste by carrying refillable water bottles and reusable tote bags. Furthermore, they dress modestly when entering sacred temples and support local economic livelihoods by purchasing authentic handmade souvenirs directly from artisans. By leaving only footprints and taking only photos, responsible travelers preserve destinations for generations to come."
    },
    {
        "id": "u8-w3",
        "title": "Đề 3: Write a paragraph describing an ideal holiday itinerary in Vietnam (60-80 words)",
        "description": "Viết một đoạn văn miêu tả một lịch trình kỳ nghỉ lý tưởng của em tại Việt Nam.",
        "suggestedOutline": [
            "Introduction: Introduce your ideal holiday itinerary (e.g., a 4-day trip to Da Nang and Hoi An).",
            "Body: Detail daily activities (visiting My Khe Beach, exploring Marble Mountains, walking in Hoi An ancient streets at night).",
            "Conclusion: Express enthusiasm for this fulfilling vacation plan."
        ],
        "usefulPhrases": [
            "My ideal four-day holiday itinerary in central Vietnam seamlessly combines coastal relaxation with cultural heritage...",
            "On the first two days, I would swim at My Khe Beach and explore the mystical Marble Mountains in Da Nang...",
            "Next, I would spend two days in Hoi An, riding bicycles through peaceful rural villages and admiring glowing lanterns...",
            "This picturesque journey would create unforgettable memories of Vietnam's timeless beauty."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "My ideal four-day holiday itinerary in central Vietnam combines scenic relaxation with rich cultural discovery. On the first two days, I would swim in the azure waters of My Khe Beach and explore the mystical caves of Marble Mountains in Da Nang. Afterwards, I would spend two days in Hoi An Ancient Town, cycling through organic vegetable villages and releasing glowing lanterns along the Hoai River at night. This journey would be an unforgettable escape."
    },
    {
        "id": "u8-w4",
        "title": "Đề 4: Write a paragraph on the negative impacts of overtourism (60-80 words)",
        "description": "Viết một đoạn văn cảnh báo những tác động tiêu cực của tình trạng quá tải du lịch tại các điểm đến nổi tiếng.",
        "suggestedOutline": [
            "Introduction: State that overtourism poses severe challenges to fragile tourist destinations.",
            "Body: Detail negative consequences (massive waste generation, traffic congestion, escalating living costs for locals, environmental pollution).",
            "Conclusion: Call for strict tourist caps and sustainable management."
        ],
        "usefulPhrases": [
            "Overtourism poses grave environmental and social challenges to popular travel destinations worldwide...",
            "During peak holiday periods, massive tourist influxes overwhelm municipal waste systems and cause chronic traffic congestion...",
            "Furthermore, excessive commercialization drives up everyday living costs, forcing local residents out of historical centers...",
            "Implementing strict visitor caps and promoting off-peak travel are crucial to preventing ecological collapse."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Overtourism poses severe environmental and social threats to popular travel destinations worldwide. During peak seasons, massive crowds generate mountains of unmanageable plastic waste, deplete scarce clean water supplies, and cause severe traffic congestion. Furthermore, rapid commercialization causes steep price inflation, disrupting the peaceful daily life of local residents. Implementing strict visitor quotas and encouraging tourists to explore off-the-beaten-track locations during low seasons are vital to safeguarding fragile destinations."
    },
    {
        "id": "u8-w5",
        "title": "Đề 5: Write a paragraph about why travelers should explore destinations off the beaten track (60-80 words)",
        "description": "Viết một đoạn văn giải thích lý do tại sao du khách nên khám phá những địa điểm hoang sơ, ít người biết đến.",
        "suggestedOutline": [
            "Introduction: State that traveling off the beaten track offers unique and rewarding experiences.",
            "Body: Explain reasons (avoiding crowded commercial traps, discovering untouched pristine nature, enjoying authentic local hospitality).",
            "Conclusion: Encourage travelers to seek out quiet, off-the-beaten-path gems."
        ],
        "usefulPhrases": [
            "Venturing off the beaten track offers travelers authentic, enriching, and peaceful holiday experiences...",
            "By choosing secluded mountain valleys or quiet coastal fishing hamlets, travelers avoid overcrowded commercial tourist traps...",
            "Moreover, visitors can experience untouched pristine wilderness and connect genuinely with hospitable local villagers...",
            "These hidden journeys nurture adventurous spirits and leave lasting, heartfelt memories."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Venturing off the beaten track offers travelers truly authentic, enriching, and peaceful vacation experiences. By choosing secluded highland valleys or quiet coastal villages, travelers escape noisy crowds and overpriced commercial tourist traps. Moreover, exploring lesser-known paths allows travelers to discover untouched pristine landscapes and enjoy heartfelt hospitality from local villagers. These tranquil adventures not only nurture an adventurous spirit but also help distribute tourism income fairly to remote communities."
    }
]

unit8 = make_unit(8, "Unit 8: Tourism", "Du lịch & Phát triển bền vững", "Khám phá du lịch sinh thái, du lịch cộng đồng, du lịch có trách nhiệm, Mạo từ A/An/The và Zero Article.", "Ngữ âm: Cách dùng mạo từ xác định và không xác định trong diễn đạt tự nhiên và trọng âm từ chỉ du lịch", "Palmtree", u8_vocab, u8_grammar_info, u8_grammar_exs, u8_listening_info, u8_listening_qs, u8_listening_fibs, u8_speaking, u8_reading_info, u8_reading_qs, u8_writing_prompts)
write_ts_unit(8, unit8)
print("Unit 8 generated successfully!")

