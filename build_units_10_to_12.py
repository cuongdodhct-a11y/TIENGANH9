import json
from gen_unit_utils import make_unit, write_ts_unit

# ==============================================================================
# UNIT 10: SPACE TRAVEL
# ==============================================================================
u10_vocab = [
    {"id": "u10-v1", "word": "astronaut", "phonetic": "/ˈæstrənɔːt/", "partOfSpeech": "noun", "vietnameseMeaning": "phi hành gia, nhà du hành vũ trụ", "englishExample": "Astronauts undergo years of rigorous physical and psychological training before space missions.", "vietnameseExample": "Các phi hành gia phải trải qua nhiều năm huấn luyện thể chất và tâm lý khắt khe trước các sứ mệnh không gian."},
    {"id": "u10-v2", "word": "weightlessness", "phonetic": "/ˈweɪtlɪsnəs/", "partOfSpeech": "noun", "vietnameseMeaning": "trạng thái không trọng lượng / không trọng lực", "englishExample": "Experiencing zero-gravity weightlessness allows astronauts to float effortlessly inside the spacecraft.", "vietnameseExample": "Trải nghiệm trạng thái không trọng lượng cho phép các phi hành gia lơ lửng nhẹ nhàng bên trong tàu vũ trụ."},
    {"id": "u10-v3", "word": "microgravity", "phonetic": "/ˌmaɪkrəʊˈɡrævɪti/", "partOfSpeech": "noun", "vietnameseMeaning": "môi trường vi trọng lực", "englishExample": "Microgravity enables scientists to conduct unique biological and materials research.", "vietnameseExample": "Môi trường vi trọng lực cho phép các nhà khoa học tiến hành những nghiên cứu vật liệu và sinh học độc đáo."},
    {"id": "u10-v4", "word": "spacecraft", "phonetic": "/ˈspeɪskrɑːft/", "partOfSpeech": "noun", "vietnameseMeaning": "tàu vũ trụ không gian", "englishExample": "The spacecraft re-entered Earth's atmosphere protected by high-temperature heat shields.", "vietnameseExample": "Tàu vũ trụ tái thâm nhập bầu khí quyển Trái Đất dưới sự bảo vệ của các tấm khiên chịu nhiệt cao."},
    {"id": "u10-v5", "word": "International Space Station", "phonetic": "/ˌɪntəˈnæʃənl speɪs ˈsteɪʃən/", "partOfSpeech": "noun", "vietnameseMeaning": "Trạm Vũ trụ Quốc tế (ISS)", "englishExample": "The International Space Station orbits Earth every ninety minutes at tremendous speeds.", "vietnameseExample": "Trạm Vũ trụ Quốc tế quay quanh Trái Đất cứ mỗi chín mươi phút một vòng với tốc độ khủng khiếp."},
    {"id": "u10-v6", "word": "spacewalk", "phonetic": "/ˈspeɪswɔːk/", "partOfSpeech": "noun", "vietnameseMeaning": "chuyến đi bộ ngoài không gian vũ trụ", "englishExample": "During a six-hour spacewalk, the engineer successfully replaced the exterior solar panel.", "vietnameseExample": "Trong chuyến đi bộ ngoài không gian kéo dài 6 tiếng, viên kỹ sư đã thay thế thành công tấm pin mặt trời bên ngoài."},
    {"id": "u10-v7", "word": "spacesuit", "phonetic": "/ˈspeɪssjuːt/", "partOfSpeech": "noun", "vietnameseMeaning": "bộ đồ bảo hộ phi hành gia", "englishExample": "A specialized spacesuit provides oxygen, pressurization, and thermal shielding against cosmic radiation.", "vietnameseExample": "Bộ đồ phi hành gia chuyên dụng cung cấp dưỡng khí oxy, áp suất và lớp chắn nhiệt chống lại bức xạ vũ trụ."},
    {"id": "u10-v8", "word": "orbit", "phonetic": "/ˈɔːbɪt/", "partOfSpeech": "verb", "vietnameseMeaning": "quay quanh quỹ đạo", "englishExample": "Numerous communication and weather satellites orbit the planet continuously.", "vietnameseExample": "Vô số vệ tinh truyền thông và thời tiết liên tục quay quanh quỹ đạo hành tinh."},
    {"id": "u10-v9", "word": "launch pad", "phonetic": "/lɔːnʧ pæd/", "partOfSpeech": "noun", "vietnameseMeaning": "bệ phóng tên lửa vũ trụ", "englishExample": "The countdown echoed across the launch pad as the massive booster ignited.", "vietnameseExample": "Tiếng đếm ngược vang vọng khắp bệ phóng khi động cơ đẩy khổng lồ bốc cháy khai hỏa."},
    {"id": "u10-v10", "word": "telescope", "phonetic": "/ˈtɛlɪskəʊp/", "partOfSpeech": "noun", "vietnameseMeaning": "kính viễn vọng thiên văn", "englishExample": "The James Webb Space Telescope captures breathtaking infrared images of distant newborn galaxies.", "vietnameseExample": "Kính viễn vọng Không gian James Webb ghi lại những hình ảnh hồng ngoại tuyệt đẹp về các thiên hà sơ sinh xa xôi."},
    {"id": "u10-v11", "word": "celestial", "phonetic": "/sɪˈlɛstɪəl/", "partOfSpeech": "adjective", "vietnameseMeaning": "thuộc về bầu trời thiên văn, vũ trụ", "englishExample": "Comets, planets, and asteroids are fascinating celestial bodies in our solar system.", "vietnameseExample": "Sao chổi, các hành tinh và tiểu hành tinh là những thiên thể kỳ thú trong hệ mặt trời của chúng ta."},
    {"id": "u10-v12", "word": "extraterrestrial", "phonetic": "/ˌɛkstrətəˈrɛstrɪəl/", "partOfSpeech": "adjective", "vietnameseMeaning": "ngoài Trái Đất, thuộc về vũ trụ sâu", "englishExample": "Astronomers use radio telescopes to search for extraterrestrial biosignatures on distant exoplanets.", "vietnameseExample": "Các nhà thiên văn học dùng kính viễn vọng vô tuyến để tìm kiếm dấu hiệu sinh học ngoài Trái Đất trên các ngoại hành tinh xa xôi."},
    {"id": "u10-v13", "word": "lunar", "phonetic": "/ˈluːnə/", "partOfSpeech": "adjective", "vietnameseMeaning": "thuộc về Mặt Trăng", "englishExample": "The Apollo missions brought back kilograms of lunar soil and crater rock samples.", "vietnameseExample": "Các sứ mệnh Apollo đã mang về hàng kilôgam mẫu đất và đá hố va chạm từ Mặt Trăng."},
    {"id": "u10-v14", "word": "habitable", "phonetic": "/ˈhæbɪtəbl/", "partOfSpeech": "adjective", "vietnameseMeaning": "có thể sinh sống được (có nước và khí quyển)", "englishExample": "Astrobiologists seek habitable planets within the Goldilocks zone of distant stars.", "vietnameseExample": "Các nhà sinh vật học thiên văn tìm kiếm các hành tinh có thể sinh sống được nằm trong vùng có thể sống của các ngôi sao xa."},
    {"id": "u10-v15", "word": "rocket propulsion", "phonetic": "/ˈrɒkɪt prəˈpʌlʃən/", "partOfSpeech": "noun", "vietnameseMeaning": "hệ thống lực đẩy tên lửa", "englishExample": "Advances in rocket propulsion have drastically reduced the cost of launching orbital payloads.", "vietnameseExample": "Những tiến bộ trong hệ thống lực đẩy tên lửa đã làm giảm đáng kể chi phí phóng tải trọng lên quỹ đạo."},
    {"id": "u10-v16", "word": "meteorite", "phonetic": "/ˈmiːtiəraɪt/", "partOfSpeech": "noun", "vietnameseMeaning": "thiên thạch rơi xuống Trái Đất", "englishExample": "The museum exhibited a four-billion-year-old metallic meteorite recovered from Antarctica.", "vietnameseExample": "Bảo tàng đã trưng bày một khối thiên thạch kim loại bốn tỷ năm tuổi được tìm thấy ở Nam Cực."},
    {"id": "u10-v17", "word": "mission control", "phonetic": "/ˈmɪʃən kənˈtrəʊl/", "partOfSpeech": "noun", "vietnameseMeaning": "trung tâm điều khiển sứ mệnh không gian", "englishExample": "Mission control in Houston monitored the vital telemetry data during the rocket launch.", "vietnameseExample": "Trung tâm điều khiển sứ mệnh tại Houston đã theo dõi chặt chẽ dữ liệu đo từ xa trong suốt vụ phóng tên lửa."},
    {"id": "u10-v18", "word": "interplanetary", "phonetic": "/ˌɪntəˈplænɪtəri/", "partOfSpeech": "adjective", "vietnameseMeaning": "liên hành tinh (giữa các hành tinh)", "englishExample": "Humanity is preparing for its first crewed interplanetary voyage to Mars.", "vietnameseExample": "Nhân loại đang chuẩn bị cho chuyến du hành liên hành tinh có người lái đầu tiên tới Sao Hỏa."},
    {"id": "u10-v19", "word": "gravity", "phonetic": "/ˈɡrævɪti/", "partOfSpeech": "noun", "vietnameseMeaning": "trọng lực, lực hút của Trái Đất", "englishExample": "Earth's gravity pulls objects toward its center and retains our life-sustaining atmosphere.", "vietnameseExample": "Trọng lực Trái Đất kéo mọi vật về tâm và giữ lại bầu khí quyển duy trì sự sống của chúng ta."},
    {"id": "u10-v20", "word": "satellite", "phonetic": "/ˈsætəlaɪt/", "partOfSpeech": "noun", "vietnameseMeaning": "vệ tinh nhân tạo hoặc vệ tinh tự nhiên", "englishExample": "GPS navigation satellites provide pinpoint positional accuracy across the entire globe.", "vietnameseExample": "Các vệ tinh định vị GPS cung cấp độ chính xác vị trí chuẩn xác trên toàn cầu."}
]

u10_grammar_info = {
    "title": "Quá Khứ Đơn (Past Simple) vs Quá Khứ Hoàn Thành (Past Perfect) & Mệnh Đề Quan Hệ Xác Định",
    "summary": "Phân biệt hành động xảy ra trước (Past Perfect: had + V3/ed) và hành động xảy ra sau (Past Simple: V2/ed) trong quá khứ. Mệnh đề quan hệ xác định cung cấp thông tin thiết yếu cho danh từ.",
    "formulaBox": [
        "Past Perfect: S + had + V3/ed (xảy ra trước)",
        "Past Simple: S + V2/ed (xảy ra sau)",
        "Cấu trúc: By the time + S + V(quá khứ đơn), S + had + V3/ed",
        "Defining Relative Clauses: The astronaut who walked on the moon in 1969 was Neil Armstrong.",
        "The spacecraft which carried them was Apollo 11."
    ],
    "usagePoints": [
        {"title": "1. Trình tự thời gian các sự kiện không gian", "detail": "Before Yuri Gagarin flew into orbit in 1961, no human had ever entered outer space.", "example": "By the time the rocket launched, engineers had tested all safety sensors twice."},
        {"title": "2. Đại từ quan hệ chỉ người / vật trong khoa học vũ trụ", "detail": "who (cho nhà khoa học/phi hành gia), which / that (cho tàu vũ trụ, kính viễn vọng, thiên thể).", "example": "The telescope which orbits in deep space captured distant nebulas."}
    ]
}

u10_grammar_exs = [
    {"id": "u10-g1", "question": "Before Yuri Gagarin flew into outer space in 1961, no human _____ into Earth orbit.", "options": ["A. had ever travelled", "B. has ever travelled", "C. travels", "D. was travelling"], "correctAnswer": "A. had ever travelled", "explanation": "Hành động chưa từng xảy ra trước mốc năm 1961: dùng Past Perfect 'had ever travelled'."},
    {"id": "u10-g2", "question": "Neil Armstrong was the first astronaut _____ walked on the surface of the Moon.", "options": ["A. who", "B. which", "C. where", "D. whose"], "correctAnswer": "A. who", "explanation": "Đại từ 'who' làm chủ ngữ thay thế cho danh từ chỉ người 'the first astronaut'."},
    {"id": "u10-g3", "question": "By the time the rocket lifted off from the launch pad, mission control _____ all safety checks.", "options": ["A. had completed", "B. completes", "C. has completed", "D. is completing"], "correctAnswer": "A. had completed", "explanation": "'By the time + Past Simple, Past Perfect' (had completed)."},
    {"id": "u10-g4", "question": "The specialized spacesuit _____ the astronaut wore protected him from extreme solar radiation.", "options": ["A. which", "B. who", "C. whom", "D. where"], "correctAnswer": "A. which", "explanation": "'which' làm tân ngữ thay cho danh từ chỉ vật 'The specialized spacesuit'."},
    {"id": "u10-g5", "question": "Pham Tuan was the first Vietnamese astronaut _____ flew into space aboard Soyuz 37.", "options": ["A. who", "B. which", "C. whose", "D. where"], "correctAnswer": "A. who", "explanation": "'who' thay thế cho danh từ chỉ người 'the first Vietnamese astronaut'."},
    {"id": "u10-g6", "question": "After the capsule _____ with the International Space Station, the crew opened the hatch.", "options": ["A. had docked", "B. docks", "C. has docked", "D. will dock"], "correctAnswer": "A. had docked", "explanation": "Hành động kết nối xảy ra trước khi mở cửa: 'After the capsule had docked'."},
    {"id": "u10-g7", "question": "The space telescope _____ was launched last year captured high-resolution images of distant galaxies.", "options": ["A. that", "B. who", "C. whom", "D. whose"], "correctAnswer": "A. that", "explanation": "'that' thay cho 'The space telescope'."},
    {"id": "u10-g8", "question": "Before they embarked on the six-month mission, the crew _____ under water simulations for two years.", "options": ["A. had trained", "B. have trained", "C. train", "D. are training"], "correctAnswer": "A. had trained", "explanation": "Quá trình huấn luyện hoàn tất trước sứ mệnh: 'had trained'."},
    {"id": "u10-g9", "question": "The scientist _____ team discovered water ice on Mars gave an inspiring lecture.", "options": ["A. whose", "B. who", "C. which", "D. that"], "correctAnswer": "A. whose", "explanation": "'whose team' (nhóm nghiên cứu của nhà khoa học đó)."},
    {"id": "u10-g10", "question": "When the alarms sounded, the flight engineer _____ already switched to backup power.", "options": ["A. had", "B. has", "C. was", "D. is"], "correctAnswer": "A. had", "explanation": "Hành động đã chuyển nguồn dự phòng trước: 'had already switched'."},
    {"id": "u10-g11", "question": "Mars is the planet _____ astronomers believe might harbor micro-bacterial fossil evidence.", "options": ["A. which", "B. who", "C. whom", "D. where"], "correctAnswer": "A. which", "explanation": "'which' thay thế cho danh từ 'the planet'."},
    {"id": "u10-g12", "question": "By 1969, Apollo engineers _____ over a decade designing the colossal Saturn V rocket.", "options": ["A. had spent", "B. have spent", "C. spend", "D. were spending"], "correctAnswer": "A. had spent", "explanation": "Mốc thời gian 'By 1969' + Past Perfect: 'had spent'."},
    {"id": "u10-g13", "question": "The rover _____ touched down on Mars sent back soil composition analyses.", "options": ["A. which", "B. who", "C. whom", "D. whose"], "correctAnswer": "A. which", "explanation": "'which' làm chủ ngữ thay cho danh từ chỉ vật 'The rover'."},
    {"id": "u10-g14", "question": "The astronauts _____ in microgravity for months underwent physical rehabilitation on Earth.", "options": ["A. who had lived", "B. which lived", "C. whose lived", "D. whom had lived"], "correctAnswer": "A. who had lived", "explanation": "'who had lived' (những người đã từng sống trong môi trường vi trọng lực)."},
    {"id": "u10-g15", "question": "Before the solar panels were repaired, the station _____ thirty percent of its power.", "options": ["A. had lost", "B. has lost", "C. loses", "D. is losing"], "correctAnswer": "A. had lost", "explanation": "'had lost' (đã mất nguồn điện trước khi được sửa)."},
    {"id": "u10-g16", "question": "This is the launch complex _____ Apollo 11 began its historic voyage to the Moon.", "options": ["A. where", "B. which", "C. who", "D. whose"], "correctAnswer": "A. where", "explanation": "'where' chỉ nơi chốn nơi tàu Apollo 11 bắt đầu hành trình."},
    {"id": "u10-g17", "question": "The meteoroid _____ entered the upper atmosphere burned brightly as a shooting star.", "options": ["A. that", "B. who", "C. whom", "D. whose"], "correctAnswer": "A. that", "explanation": "'that' làm chủ ngữ thay cho danh từ 'The meteoroid'."},
    {"id": "u10-g18", "question": "By the time the rescue shuttle arrived, the crew _____ their rations carefully for a week.", "options": ["A. had rationed", "B. have rationed", "C. ration", "D. are rationing"], "correctAnswer": "A. had rationed", "explanation": "'By the time + Past Simple, Past Perfect' (had rationed)."},
    {"id": "u10-g19", "question": "The astrophysicist _____ discovered the exoplanet won an international gold medal.", "options": ["A. who", "B. which", "C. whom", "D. where"], "correctAnswer": "A. who", "explanation": "'who' thay cho 'The astrophysicist'."},
    {"id": "u10-g20", "question": "They celebrated because they _____ the first successful soft landing on an asteroid.", "options": ["A. had achieved", "B. achieve", "C. has achieved", "D. are achieving"], "correctAnswer": "A. had achieved", "explanation": "Hành động hạ cánh thành công xảy ra trước khi ăn mừng: 'had achieved'."}
]

u10_listening_info = {
    "audioTitle": "Cuộc Sống Thường Nhật Trên Trạm Vũ Trụ Quốc Tế (Daily Life on the ISS)",
    "audioDuration": "3:25",
    "audioScriptSpeaker": "Astronaut Commander Elena & Student Lucas",
    "transcriptText": "Lucas: Commander Elena, how do astronauts adapt to zero-gravity weightlessness on the International Space Station?\nElena: Hello Lucas! Living in microgravity is exhilarating! We float through the corridors instead of walking. However, because our muscles and bones do not need to fight gravity, we must exercise for two full hours every day on specialized treadmills and stationary bicycles.\nLucas: How do you eat and sleep in space without gravity?\nElena: We sleep in sleeping bags strapped vertically to cabin walls so we don't float into control panels! All our food is packaged in vacuum pouches, and liquids are drunk through sealed straws to avoid stray droplets floating into equipment.\nLucas: Had you trained under water before your first spaceflight?\nElena: Yes! We had completed hundreds of hours in giant neutral buoyancy pools simulating spacewalks before we launched into orbit.",
    "vietnameseTranslation": "Lucas: Thưa Chỉ huy Elena, các phi hành gia thích nghi như thế nào với trạng thái không trọng lượng trên Trạm Vũ trụ Quốc tế ạ?\nElena: Chào Lucas! Sống trong môi trường vi trọng lực thực sự rất phấn khích! Chúng tôi lơ lửng qua các hành lang thay vì đi bộ. Tuy nhiên, vì cơ bắp và xương khớp không phải chống lại lực hút Trái Đất, chúng tôi phải tập thể dục đủ hai tiếng mỗi ngày trên máy chạy bộ và xe đạp cố định chuyên dụng.\nLucas: Mọi người ăn uống và ngủ nghỉ như thế nào trong không gian khi không có trọng lực ạ?\nElena: Chúng tôi ngủ trong túi ngủ buộc chặt thẳng đứng vào vách khoang tàu để không bị trôi lơ lửng vào bảng điều khiển! Mọi thức ăn đều được đóng gói trong túi chân không, và nước uống được hút qua ống hút bịt kín để tránh những giọt nước trôi lơ lửng vào máy móc thiết bị.\nLucas: Cô đã từng huấn luyện dưới nước trước chuyến bay vào vũ trụ đầu tiên chưa ạ?\nElena: Có chứ! Chúng tôi đã hoàn thành hàng trăm giờ trong các bể bơi trung hòa lực đẩy khổng lồ để mô phỏng các chuyến đi bộ ngoài không gian trước khi phóng lên quỹ đạo."
}

u10_listening_qs = [
    {"id": "u10-l1", "question": "How do astronauts move through corridors on the International Space Station?", "options": ["A. They float effortlessly due to zero-gravity microgravity", "B. They ride bicycles along roads", "C. They walk with heavy lead boots", "D. They use roller skates"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'We float through the corridors instead of walking.'"},
    {"id": "u10-l2", "question": "Why must astronauts exercise for two hours every day in orbit?", "options": ["A. Because their muscles and bones do not fight gravity", "B. Because they have nothing else to do", "C. To win a space marathon medal", "D. Because it is too cold"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'muscles and bones do not need to fight gravity, we must exercise for two full hours every day.'"},
    {"id": "u10-l3", "question": "How do astronauts sleep without floating into control panels?", "options": ["A. In sleeping bags strapped vertically to cabin walls", "B. On soft feather beds on the floor", "C. On the ceiling with blankets", "D. Sitting in normal office chairs"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'sleep in sleeping bags strapped vertically to cabin walls.'"},
    {"id": "u10-l4", "question": "How is food and water consumed on the ISS to avoid equipment damage?", "options": ["A. Food in vacuum pouches and liquids through sealed straws", "B. Open bowls of hot soup", "C. Eating from porcelain plates with knives", "D. Throwing food into the air"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'food is packaged in vacuum pouches, and liquids are drunk through sealed straws.'"},
    {"id": "u10-l5", "question": "Where had astronauts trained before their space missions to simulate spacewalks?", "options": ["A. In giant neutral buoyancy water pools", "B. In sandy deserts", "C. Inside deep caves", "D. On top of skyscrapers"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'completed hundreds of hours in giant neutral buoyancy pools simulating spacewalks.'"},
    {"id": "u10-l6", "question": "Who is Lucas interviewing in the audio dialogue?", "options": ["A. Astronaut Commander Elena", "B. An airplane pilot", "C. A submarine captain", "D. A bus mechanic"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'Astronaut Commander Elena & Student Lucas.'"},
    {"id": "u10-l7", "question": "What equipment is used for mandatory daily exercise in space?", "options": ["A. Specialized treadmills and stationary bicycles", "B. Heavy iron dumbbells", "C. Swimming pools", "D. Trampolines"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'specialized treadmills and stationary bicycles.'"},
    {"id": "u10-l8", "question": "What danger could loose floating liquid droplets cause on the station?", "options": ["A. They could float into delicate electrical equipment", "B. They could attract birds", "C. They could freeze into giant mountains", "D. They could make the rocket heavy"], "correctAnswerIndex": 0, "explanation": "Trong bài nghe: 'avoid stray droplets floating into equipment.'"}
]

u10_listening_fibs = [
    {"id": "u10-f1", "sentenceWithBlank": "Astronauts float due to zero-gravity _____.", "correctWord": "microgravity", "hint": "Môi trường vi trọng lực (microgravity)"},
    {"id": "u10-f2", "sentenceWithBlank": "Crew members exercise for two _____ each day.", "correctWord": "hours", "hint": "Đơn vị thời gian (giờ)"},
    {"id": "u10-f3", "sentenceWithBlank": "Sleeping bags are strapped to the cabin _____.", "correctWord": "walls", "hint": "Các vách ngăn tường khoang tàu"},
    {"id": "u10-f4", "sentenceWithBlank": "Astronauts had trained in water _____ before launch.", "correctWord": "pools", "hint": "Các bể bơi huấn luyện không trọng lực"}
]

# Speaking prompts for Unit 10 (20 items)
u10_speaking = [
    {"id": f"u10-s{i+1}", "targetSentence": s, "ipa": ipa, "vietnameseMeaning": vm, "contextSituation": ctx, "keyPhonicsFocus": kpf, "sampleAudioText": s}
    for i, (s, ipa, vm, ctx, kpf) in enumerate([
        ("Astronauts who live on the International Space Station experience sixteen breathtaking sunrises every single day.", "/ˈæstrənɔːts huː lɪv ɒn ði ˌɪntəˈnæʃənl speɪs ˈsteɪʃən ɪksˈpɪərɪəns ˌsɪksˈtiːn ˈbrɛθˌteɪkɪŋ ˈsʌnraɪzɪz ˈɛvri ˈsɪŋɡl deɪ/", "Các phi hành gia sống trên Trạm Vũ trụ Quốc tế được trải nghiệm mười sáu bình minh tuyệt đẹp mỗi ngày.", "Thuyết minh về cuộc sống trên trạm không gian ISS.", "Phát âm chuẩn từ 'astronauts' /ˈæstrənɔːts/ và 'sunrises'."),
        ("Before Neil Armstrong stepped onto the lunar surface in 1969, no human had ever walked on another celestial body.", "/bɪˈfɔː niːl ˈɑːmststrɒŋ stɛpt ˈɒntuː ðə ˈluːnə ˈsɜːfɪs ɪn ˈnaɪnˈtiːn ˈsɪksti-naɪn nəʊ ˈhjuːmən hæd ˈɛvə wɔːkt ɒn əˈnʌðə sɪˈlɛstɪəl ˈbɒdi/", "Trước khi Neil Armstrong đặt chân lên bề mặt Mặt Trăng năm 1969, chưa từng có con người nào bước đi trên một thiên thể khác.", "Kể về dấu mốc lịch sử du hành vũ trụ.", "Phát âm chuẩn cấu trúc Quá khứ hoàn thành 'had ever walked' và 'celestial'."),
        ("Living in microgravity causes muscle atrophy, which is why astronauts must exercise rigorously for two hours daily.", "/ˈlɪvɪŋ ɪn ˌmaɪkrəʊˈɡrævɪti ˈkɔːzɪz ˈmʌsl ˈætrəfi wɪʧ ɪz waɪ ˈæstrənɔːts mʌst ˈɛksəsaɪz ˈrɪɡərəsli fɔː tuː ˈaʊəz ˈdeɪli/", "Sống trong môi trường vi trọng lực gây teo cơ, đó là lý do vì sao phi hành gia phải tập thể dục nghiêm ngặt hai tiếng mỗi ngày.", "Giải thích tác động sinh học của vi trọng lực.", "Phát âm chuẩn từ 'microgravity' /ˌmaɪkrəʊˈɡrævɪti/ và 'rigorously'."),
        ("Pham Tuan was the first heroic Vietnamese astronaut who journeyed into outer space aboard the Soyuz 37 spacecraft.", "/fɑːm twæn wɒz ðə fɜːst hɪˈrəʊɪk ˌvjɛtnəˈmiːz ˈæstrənɔːt huː ˈʤɜːnid ˈɪntuː ˈaʊtə speɪs əˈbɔːd ðə ˈsɔɪjuːz ˈθɜːti-ˈsɛvn ˈspeɪskrɑːft/", "Phạm Tuân là phi hành gia anh hùng đầu tiên của Việt Nam đã bay vào vũ trụ trên con tàu Soyuz 37.", "Tự hào giới thiệu phi hành gia Phạm Tuân.", "Phát âm chuẩn cụm từ 'first heroic Vietnamese astronaut who journeyed'."),
        ("The James Webb Space Telescope, which orbits deep in space, captures stunning infrared views of ancient newborn stars.", "/ðə ʤeɪmz wɛb speɪs ˈtɛlɪskəʊp wɪʧ ˈɔːbɪts diːp ɪn speɪs ˈkæpʧəz ˈstʌnɪŋ ˌɪnfrəˈrɛd vjuːz ɒv ˈeɪnʃənt ˈnjuːbɔːn stɑːz/", "Kính viễn vọng Không gian James Webb, quay quanh quỹ đạo sâu trong không gian, ghi lại những hình ảnh hồng ngoại tuyệt mỹ của các ngôi sao sơ sinh cổ đại.", "Thuyết trình về kính viễn vọng không gian.", "Phát âm chuẩn từ 'infrared' /ˌɪnfrəˈrɛd/ và 'telescope'."),
        ("Space tourism is rapidly becoming a reality for intrepid travelers who dream of admiring Earth from orbit.", "/speɪs ˈtʊərɪzəm ɪz ˈræpɪdli bɪˈkʌmɪŋ ə riˈælɪti fɔːr ɪnˈtrɛpɪd ˈtrævələz huː driːm ɒv ədˈmaɪərɪŋ ɜːθ frɒm ˈɔːbɪt/", "Du lịch vũ trụ đang nhanh chóng trở thành hiện thực cho những du khách dũng cảm mơ ước được ngắm nhìn Trái Đất từ quỹ đạo.", "Nói về xu hướng du lịch không gian.", "Phát âm chuẩn từ 'intrepid' /ɪnˈtrɛpɪd/ và 'reality'."),
        ("Robotic exploration rovers that navigate the dusty Martian terrain search tirelessly for biosignatures of ancient life.", "/rəʊˈbɒtɪk ˌɛksplɔːˈreɪʃən ˈrəʊvəz ðæt ˈnævɪɡeɪt ðə ˈdʌsti ˈmɑːʃən tɛˈreɪn sɜːʧ ˈtaɪəlɪsli fɔː ˌbaɪəʊˈsɪɡnɪʧəz ɒv ˈeɪnʃənt laɪf/", "Các robot tự hành thám hiểm di chuyển trên địa hình Sao Hỏa đầy bụi miệt mài tìm kiếm dấu hiệu sinh học của sự sống cổ đại.", "Miêu tả sứ mệnh thám hiểm Sao Hỏa.", "Phát âm chuẩn từ 'biosignatures' /ˌbaɪəʊˈsɪɡnɪʧəz/ và 'Martian'."),
        ("Specialized pressurized spacesuits protect spacewalking engineers from cosmic radiation and lethal micrometeoroids.", "/ˈspɛʃəlaɪzd ˈprɛʃəraɪzd ˈspeɪssjuːts prəˈtɛkt ˈspeɪsˌwɔːkɪŋ ˌɛnʤɪˈnɪəz frɒm ˈkɒzmɪk ˌreɪdɪˈeɪʃən ænd ˈliːθəl ˌmaɪkrəʊˈmiːtiərɔɪdz/", "Những bộ đồ vũ trụ điều áp chuyên dụng bảo vệ các kỹ sư đi bộ ngoài không gian khỏi bức xạ vũ trụ và vi thiên thạch gây chết người.", "Nêu tầm quan trọng của bộ đồ phi hành gia.", "Phát âm chuẩn từ 'pressurized' /ˈprɛʃəraɪzd/ và 'radiation'."),
        ("By the time the rocket blasted into the stratosphere, the ground crew had monitored hundreds of telemetry indicators.", "/baɪ ðə taɪm ðə ˈrɒkɪt ˈblɑːstɪd ˈɪntuː ðə ˈstrætəʊsfɪə ðə ɡraʊnd kruː hæd ˈmɒnɪtəd ˈhʌndrədz ɒv tɪˈlɛmɪtri ˈɪndɪkeɪtəz/", "Vào thời điểm tên lửa phóng vút vào tầng bình lưu, đội ngũ mặt đất đã theo dõi hàng trăm chỉ số đo từ xa.", "Kể lại quá trình phóng tên lửa vũ trụ.", "Phát âm chuẩn từ 'stratosphere' /ˈstrætəʊsfɪə/ và 'telemetry'."),
        ("Astronomy teaches us humility and deep reverence when contemplating the vastness of the expanding universe.", "/əsˈtrɒnəmi ˈtiːʧɪz ʌs hjuːˈmɪlɪti ænd diːp ˈrɛvərəns wɛn kənˈtɛmpleɪtɪŋ ðə ˈvɑːstnəs ɒv ði ɪksˈpændɪŋ ˈjuːnɪvɜːs/", "Thiên văn học dạy cho chúng ta sự khiêm nhường và niềm tôn kính sâu sắc khi chiêm ngưỡng sự bao la của vũ trụ đang giãn nở.", "Nói về ý nghĩa triết học của thiên văn học.", "Phát âm chuẩn từ 'humility' /hjuːˈmɪlɪti/ và 'reverence'."),
        ("Eating dehydrated meals through sealed pouches prevents food particles from entering sensitive scientific equipment.", "/ˈiːtɪŋ ˌdiːhaɪˈdreɪtɪd miːlz θruː siːld ˈpaʊʧɪz prɪˈvɛnts fuːd ˈpɑːtɪklz frɒm ˈɛntərɪŋ ˈsɛnsɪtɪv ˌsaɪənˈtɪfɪk ɪˈkwɪpmənt/", "Ăn các bữa ăn sấy khô qua túi bịt kín ngăn các mẩu thức ăn bay vào các thiết bị khoa học nhạy cảm.", "Giải thích quy tắc ăn uống trong vũ trụ.", "Phát âm chuẩn từ 'dehydrated' /ˌdiːhaɪˈdreɪtɪd/ và 'pouches'."),
        ("The international space coalition plans to build a permanent lunar orbital outpost called the Gateway.", "/ði ˌɪntəˈnæʃənl speɪs ˌkəʊəˈlɪʃən plænz tuː bɪld ə ˈpɜːmənənt ˈluːnər ˈɔːbɪtl ˈaʊtpəʊst kɔːld ðə ˈɡeɪtweɪ/", "Liên minh không gian quốc tế lên kế hoạch xây dựng một tiền đồn quỹ đạo Mặt Trăng lâu dài mang tên Gateway.", "Thuyết minh về trạm vũ trụ tương lai.", "Phát âm chuẩn từ 'coalition' /ˌkəʊəˈlɪʃən/ và 'outpost'."),
        ("Liquid rocket fuel ignites with tremendous thermal energy to generate the massive thrust needed for orbital escape.", "/ˈlɪkwɪd ˈrɒkɪt fjʊəl ɪɡˈnaɪts wɪð trɪˈmɛndəs ˈθɜːməl ˈɛnəʤi tuː ˈʤɛnəreɪt ðə ˈmæsɪv θrʌst ˈniːdɪd fɔːr ˈɔːbɪtl ɪsˈkeɪp/", "Nhiên liệu tên lửa lỏng bốc cháy với nhiệt lượng khổng lồ để tạo ra lực đẩy cực lớn cần thiết nhằm thoát khỏi quỹ đạo.", "Giải thích nguyên lý lực đẩy tên lửa.", "Phát âm chuẩn từ 'ignites' /ɪɡˈnaɪts/ và 'thrust' /θrʌst/."),
        ("Weightlessness offers astronauts a magical sensation of floating like a bird within an echoing spacecraft chamber.", "/ˈweɪtlɪsnəs ˈɒfəz ˈæstrənɔːts ə ˈmæʤɪkəl sɛnˈseɪʃən ɒv ˈfləʊtɪŋ laɪk ə bɜːd wɪˈðɪn ən ˈɛkəʊɪŋ ˈspeɪskrɑːft ˈʧeɪmbə/", "Trạng thái không trọng lượng mang đến cho phi hành gia cảm giác kỳ diệu như đang bay lơ lửng như chim bên trong khoang tàu vũ trụ vang vọng.", "Miêu tả cảm giác không trọng lực.", "Phát âm chuẩn từ 'weightlessness' /ˈweɪtlɪsnəs/ và 'sensation'."),
        ("Before modern GPS satellites were launched, sailors had relied on compasses and constellations to navigate open oceans.", "/bɪˈfɔː ˈmɒdən ʤiː-piː-ɛs ˈsætəlaɪts wɜː lɔːnʧt ˈseɪləz hæd rɪˈlaɪd ɒn ˈkʌmpəsɪz ænd ˌkɒnstəˈleɪʃənz tuː ˈnævɪɡeɪt ˈəʊpən ˈəʊʃənz/", "Trước khi các vệ tinh GPS hiện đại được phóng lên, các thủy thủ đã dựa vào la bàn và các chòm sao để định hướng trên đại dương bao la.", "So sánh định vị xưa và nay.", "Phát âm chuẩn từ 'constellations' /ˌkɒnstəˈleɪʃənz/."),
        ("Astrobiologists investigate icy moons like Europa which may conceal vast subterranean liquid oceans beneath crusts.", "/ˌæstrəʊbaɪˈɒləʤɪsts ɪnˈvɛstɪɡeɪt ˈaɪsi muːnz laɪk jʊəˈrəʊpə wɪʧ meɪ kənˈsiːl vɑːst ˌʌndəˈteɪrɪən ˈlɪkwɪd ˈəʊʃənz bɪˈniːθ krʌsts/", "Các nhà sinh vật học thiên văn nghiên cứu các mặt trăng băng giá như Europa, nơi có thể ẩn chứa những đại dương nước lỏng ngầm khổng lồ dưới lớp vỏ.", "Giới thiệu sự sống tiềm năng trên mặt trăng Europa.", "Phát âm chuẩn từ 'Astrobiologists' /ˌæstrəʊbaɪˈɒləʤɪsts/."),
        ("The thrilling countdown before a space rocket launch sends waves of electric anticipation through spectators.", "/ðə ˈθrɪlɪŋ ˈkaʊntdaʊn bɪˈfɔːr ə speɪs ˈrɒkɪt lɔːnʧ sɛndz weɪvz ɒv ɪˈlɛktrɪk ænˌtɪsɪˈpeɪʃən θruː spɛkˈteɪtəz/", "Tiếng đếm ngược hồi hộp trước giờ phóng tên lửa vũ trụ truyền những làn sóng háo hức ngập tràn đến mọi khán giả theo dõi.", "Miêu tả khoảnh khắc phóng tàu vũ trụ.", "Phát âm chuẩn từ 'anticipation' /ænˌtɪsɪˈpeɪʃən/."),
        ("Humans who venture into deep interstellar space must demonstrate supreme psychological resilience and composure.", "/ˈhjuːmənz huː ˈvɛnʧər ˈɪntuː diːp ˌɪntəˈstɛlə speɪs mʌst ˈdɛmənstreɪt sjuːˈpriːm ˌsaɪkəˈlɒʤɪkəl rɪˈzɪlɪəns ænd kəmˈpəʊʒə/", "Những con người dấn thân vào không gian liên sao sâu thẳm phải thể hiện bản lĩnh tâm lý kiên cường và sự điềm tĩnh tối thượng.", "Nói về phẩm chất của nhà thám hiểm vũ trụ.", "Phát âm chuẩn từ 'interstellar' /ˌɪntəˈstɛlə/ và 'composure' /kəmˈpəʊʒə/."),
        ("Exploring outer space inspires younger generations to excel in mathematics, engineering, and astrophysics.", "/ɪksˈplɔːrɪŋ ˈaʊtə speɪs ɪnˈspaɪəz ˈjʌŋɡə ˌʤɛnəˈreɪʃənz tuː ɪkˈsɛl ɪn ˌmæθɪˈmætɪks ˌɛnʤɪˈnɪərɪŋ ænd ˌæstrəʊˈfɪzɪks/", "Khám phá vũ trụ bao la truyền cảm hứng cho các thế hệ trẻ vươn lên xuất sắc trong toán học, kỹ thuật và vật lý thiên văn.", "Nêu lợi ích giáo dục STEM của ngành vũ trụ.", "Phát âm chuẩn từ 'astrophysics' /ˌæstrəʊˈfɪzɪks/."),
        ("May the infinite stars ignite your passion for scientific discovery, courage, and boundless imagination.", "/meɪ ði ˈɪnfɪnɪt stɑːz ɪɡˈnaɪt jɔː ˈpæʃən fɔː ˌsaɪənˈtɪfɪk dɪsˈkʌvəri ˈkʌrɪʤ ænd ˈbaʊndlɪs ɪˌmæʤɪˈneɪʃən/", "Mong những vì sao vô tận thắp sáng niềm đam mê khám phá khoa học, lòng dũng cảm và trí tưởng tượng không giới hạn của bạn.", "Lời chúc truyền cảm hứng thiên văn.", "Phát âm chuẩn từ 'infinite' /ˈɪnfɪnɪt/ và 'boundless' /ˈbaʊndlɪs/.")
    ])
]

u10_reading_info = {
    "title": "Chinh Phục Không Gian: Từ Chuyến Bay Lịch Sử Đến Giấc Mơ Sao Hỏa",
    "topic": "Lịch sử du hành vũ trụ & Sứ mệnh thám hiểm liên hành tinh trong tương lai",
    "passageText": "Ever since humanity first gazed up at the sparkling night sky, unlocking the mysteries of outer space has represented one of our greatest collective aspirations. On April 12, 1961, Soviet cosmonaut Yuri Gagarin etched his name into history by becoming the first human to orbit Earth aboard Vostok 1. Barely eight years later in 1969, the Apollo 11 mission accomplished the seemingly impossible feat when Neil Armstrong stepped onto the lunar soil, proclaiming his famous words: 'That's one small step for man, one giant leap for mankind.'\n\nToday, space exploration has transcended national rivalry to become a triumphant symbol of international collaboration. The International Space Station (ISS), which orbits Earth at 28,000 kilometers per hour, serves as a cutting-edge orbital laboratory where astronauts from America, Japan, Europe, and Canada live and conduct microgravity experiments together. Space technology has yielded profound terrestrial spin-offs, from water purification systems and lightweight memory foam to advanced satellite solar arrays.\n\nLooking toward the future, space agencies and private aerospace companies are preparing for crewed expeditions to Mars. Establishing permanent lunar research bases under the Artemis program will serve as a staging ground for humanity's first interplanetary voyage, marking our transition into a truly multi-planetary species.",
    "keyVocabularyHighlights": [
        {"word": "collective aspirations", "meaning": "những khát vọng chung vĩ đại của nhân loại"},
        {"word": "terrestrial spin-offs", "meaning": "các ứng dụng công nghệ vũ trụ phục vụ đời sống trên Trái Đất"},
        {"word": "interplanetary voyage", "meaning": "chuyến du hành vũ trụ liên hành tinh"},
        {"word": "multi-planetary species", "meaning": "loài sinh vật định cư trên nhiều hành tinh"}
    ]
}

u10_reading_qs = [
    {"id": "u10-r1", "question": "Who was the first human to journey into outer space and orbit Earth in 1961?", "options": ["A. Yuri Gagarin", "B. Neil Armstrong", "C. Isaac Newton", "D. Albert Einstein"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 1: 'Soviet cosmonaut Yuri Gagarin etched his name into history by becoming the first human to orbit Earth.'"},
    {"id": "u10-r2", "question": "What historic achievement did Apollo 11 accomplish in 1969?", "options": ["A. Neil Armstrong stepped onto the surface of the Moon", "B. First landing on Mars", "C. Building the first airplane", "D. Sailing around the world"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 1: 'the Apollo 11 mission accomplished... when Neil Armstrong stepped onto the lunar soil.'"},
    {"id": "u10-r3", "question": "At what speed does the International Space Station orbit Earth?", "options": ["A. At 28,000 kilometers per hour", "B. At 50 kilometers per hour", "C. At 10 kilometers per hour", "D. It stays completely stationary"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'orbits Earth at 28,000 kilometers per hour.'"},
    {"id": "u10-r4", "question": "What terrestrial spin-offs have resulted from space exploration technology?", "options": ["A. Water purification systems, memory foam, and solar arrays", "B. Heavy diesel steam engines", "C. Clay cooking pots", "D. Wooden horse carts"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 2: 'terrestrial spin-offs, from water purification systems and lightweight memory foam to advanced satellite solar arrays.'"},
    {"id": "u10-r5", "question": "Which celestial destination is targeted for future crewed expeditions?", "options": ["A. Mars", "B. The center of the Sun", "C. A black hole", "D. Deep inside the Earth's core"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'preparing for crewed expeditions to Mars.'"},
    {"id": "u10-r6", "question": "What is the primary role of the Artemis lunar program?", "options": ["A. Establishing permanent lunar bases as staging grounds for Mars voyages", "B. Building a shopping mall on the moon", "C. Mining all moon dust to sell", "D. Banning all space travel"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'Establishing permanent lunar research bases under the Artemis program will serve as a staging ground for humanity's first interplanetary voyage.'"},
    {"id": "u10-r7", "question": "Which word in paragraph 1 is closest in meaning to 'feat'?", "options": ["A. Remarkable achievement, triumph, or accomplishment", "B. A small mistake", "C. An accident", "D. A biological illness"], "correctAnswerIndex": 0, "explanation": "'Feat' có nghĩa là chiến công hiển hách, thành tựu phi thường."},
    {"id": "u10-r8", "question": "Which word in paragraph 2 is closest in meaning to 'transcended'?", "options": ["A. Surpassed and risen above boundaries", "B. Failed completely", "C. Stopped working", "D. Decreased"], "correctAnswerIndex": 0, "explanation": "'Transcended national rivalry' có nghĩa là vượt qua sự cạnh tranh vị kỷ để vươn tới tầm vóc toàn cầu."},
    {"id": "u10-r9", "question": "What transformation does Mars exploration signify for humanity?", "options": ["A. Transition into a multi-planetary species", "B. Forgetting all science", "C. Leaving Earth forever with no return", "D. Ceasing all technology"], "correctAnswerIndex": 0, "explanation": "Trong đoạn 3: 'marking our transition into a truly multi-planetary species.'"},
    {"id": "u10-r10", "question": "What is the best overall title for this reading passage?", "options": ["A. Conquering Space: From Historic Flights to the Martian Horizon", "B. How to Build Deep Submarines", "C. The Geography of Deserts", "D. The History of Ancient Sailing Vessels"], "correctAnswerIndex": 0, "explanation": "Toàn bài đọc đúc kết lịch sử chinh phục không gian từ những chuyến bay đầu tiên đến giấc mơ thám hiểm Sao Hỏa."}
]

u10_writing_prompts = [
    {
        "id": "u10-w1",
        "title": "Đề 1: Write a paragraph describing life aboard the International Space Station (60-80 words)",
        "description": "Viết một đoạn văn miêu tả cuộc sống hàng ngày của các phi hành gia trên Trạm Vũ trụ Quốc tế (ISS).",
        "suggestedOutline": [
            "Introduction: Introduce life in microgravity on the ISS.",
            "Body: Describe daily routines (floating through modules, exercising 2 hours, eating packaged food, strapped sleeping bags).",
            "Conclusion: State how challenging yet thrilling life in space is."
        ],
        "usefulPhrases": [
            "Life aboard the International Space Station is both exhilarating and demanding...",
            "In zero-gravity microgravity, astronauts float effortlessly through cabin corridors...",
            "They must exercise for two hours daily on specialized machines to maintain muscle density...",
            "Living in space requires exceptional discipline, teamwork, and resilience."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Life aboard the International Space Station is both exhilarating and physically demanding. In zero-gravity microgravity, astronauts float effortlessly through laboratory modules rather than walking. To prevent muscle and bone deterioration, they must exercise for two hours daily on specialized treadmills. They eat dehydrated meals from vacuum pouches and sleep in vertical bags strapped securely to cabin walls. Living in space demands tremendous discipline, mental resilience, and close international teamwork."
    },
    {
        "id": "u10-w2",
        "title": "Đề 2: Write a paragraph on what you would pack if you traveled to space (60-80 words)",
        "description": "Viết một đoạn văn kể về những vật dụng em sẽ mang theo nếu có cơ hội tham gia một chuyến du hành vũ trụ.",
        "suggestedOutline": [
            "Introduction: State your excitement about an opportunity to travel into space.",
            "Body: Mention 3 essential items (a high-resolution camera, a photo of family, a favorite book/music player).",
            "Conclusion: Express your eagerness to view Earth from orbit."
        ],
        "usefulPhrases": [
            "If I were selected for a space voyage, I would carefully choose my personal items...",
            "First, I would bring a high-resolution camera to photograph the breathtaking curve of Earth...",
            "Second, I would pack a cherished family photograph and a miniature national flag...",
            "Gazing at our blue planet from orbit would be the most profound moment of my life."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "If I were given the extraordinary chance to travel into space, I would pack a few deeply meaningful items. First, I would bring a high-resolution digital camera to photograph the breathtaking curve and glowing atmosphere of planet Earth. Second, I would pack a small family photograph and a miniature Vietnamese national flag to remind me of home. Finally, a journal would allow me to record my surreal feelings in zero gravity."
    },
    {
        "id": "u10-w3",
        "title": "Đề 3: Write a paragraph discussing whether space exploration is worth the investment (60-80 words)",
        "description": "Viết một đoạn văn bàn luận về việc liệu đầu tư cho thám hiểm không gian có thực sự xứng đáng hay không.",
        "suggestedOutline": [
            "Introduction: State your viewpoint that space investment is highly beneficial.",
            "Body: Give reasons (spurs technological spin-offs like GPS, water filtration; uncovers knowledge about our origins).",
            "Conclusion: Affirm that space science secures humanity's future."
        ],
        "usefulPhrases": [
            "Investing in space exploration brings immense scientific and technological dividends...",
            "Space research has yielded critical spin-offs including GPS satellites, solar cells, and advanced medical diagnostics...",
            "Furthermore, understanding celestial bodies helps us protect Earth from asteroid threats...",
            "Space exploration is a vital investment in humanity's long-term survival and prosperity."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Investing in space exploration brings immense scientific and societal dividends to humanity. Technological breakthroughs developed for space missions have led to invaluable terrestrial spin-offs, including satellite weather monitoring, GPS navigation, water purification, and lightweight medical materials. Furthermore, exploring celestial bodies inspires youth to pursue scientific careers and prepares humanity for future planetary challenges. Expanding our cosmic horizons is essential for our technological advancement and long-term survival."
    },
    {
        "id": "u10-w4",
        "title": "Đề 4: Write a paragraph about Pham Tuan - the first Vietnamese in space (60-80 words)",
        "description": "Viết một đoạn văn giới thiệu về Anh hùng Lực lượng Vũ trang, Phi hành gia Phạm Tuân và chuyến bay vũ trụ lịch sử năm 1980.",
        "suggestedOutline": [
            "Introduction: Introduce Pham Tuan as the first Vietnamese and Asian astronaut in space.",
            "Body: Mention his historic flight on Soyuz 37 in 1980, conducting scientific experiments.",
            "Conclusion: Express deep pride in his historic milestone for Viet Nam."
        ],
        "usefulPhrases": [
            "Pham Tuan is celebrated as the first Vietnamese and Asian cosmonaut in space...",
            "In July 1980, he embarked on the historic Soyuz 37 mission to the Salyut 6 space station...",
            "During his mission, he conducted biological and atmospheric experiments...",
            "His historic flight remains an enduring source of national pride and scientific inspiration."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Pham Tuan is celebrated as the first Vietnamese cosmonaut and the first Asian citizen to journey into outer space. In July 1980, alongside Soviet cosmonaut Viktor Gorbatko, he launched aboard the Soyuz 37 spacecraft to dock with the Salyut 6 orbital station. During his eight-day mission, Pham Tuan conducted vital biological, medical, and Earth-observation experiments. His historic achievement remains an enduring symbol of Vietnamese bravery, intelligence, and national pride."
    },
    {
        "id": "u10-w5",
        "title": "Đề 5: Write a paragraph describing humanity's future dream of landing on Mars (60-80 words)",
        "description": "Viết một đoạn văn miêu tả khát vọng và sự chuẩn bị của nhân loại cho sứ mệnh đặt chân lên Sao Hỏa.",
        "suggestedOutline": [
            "Introduction: State that Mars is humanity's next great cosmic destination.",
            "Body: Mention preparations (rover explorations, testing deep space propulsion, building habitats).",
            "Conclusion: State that landing on Mars will transform humanity into a multi-planetary species."
        ],
        "usefulPhrases": [
            "Landing astronauts on Mars is humanity's most ambitious space dream for the 21st century...",
            "Robotic rovers are currently analyzing Martian soil and searching for traces of microbial life...",
            "Scientists are developing powerful propulsion engines and closed-loop life support habitats...",
            "Achieving a crewed Mars landing will mark our evolution into a multi-planetary species."
        ],
        "wordLimit": "60 - 80 từ",
        "sampleGrade10Response": "Landing human astronauts on Mars is humanity's most ambitious and captivating space dream for the 21st century. While robotic rovers continue to explore the red planet's dusty terrain and seek biosignatures of ancient life, space agencies are testing powerful heavy-lift rockets. Establishing self-sustaining colonies with oxygen generators and greenhouses will protect future pioneers. Conquering Mars will prove that human courage and scientific ingenuity know no terrestrial bounds."
    }
]

unit10 = make_unit(10, "Unit 10: Space Travel", "Du hành vũ trụ & Khám phá các vì sao", "Tìm hiểu về cuộc sống của các phi hành gia, trạm vũ trụ ISS, thì Quá khứ hoàn thành và mệnh đề quan hệ xác định.", "Ngữ âm: Nhấn trọng âm các từ có hậu tố -ic, -ical và ngữ điệu câu trần thuật phức", "Sparkles", u10_vocab, u10_grammar_info, u10_grammar_exs, u10_listening_info, u10_listening_qs, u10_listening_fibs, u10_speaking, u10_reading_info, u10_reading_qs, u10_writing_prompts)
write_ts_unit(10, unit10)
print("Unit 10 generated successfully!")
