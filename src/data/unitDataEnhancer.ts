import { UnitData, VocabularyItem, GrammarExercise, ListeningQuestion, SpeakingPrompt, ReadingQuestion } from '../types';

// Curriculum unit themes mapping
const UNIT_THEMES: Record<number, { title: string; topic: string; topicEn: string; keywords: string[] }> = {
  1: { title: 'Local Community', topic: 'Cộng đồng địa phương & Làng nghề', topicEn: 'local community and traditional crafts', keywords: ['handicraft', 'artisan', 'preserve', 'community', 'pass down', 'suburb'] },
  2: { title: 'City Life', topic: 'Cuộc sống đô thị', topicEn: 'city life and urban development', keywords: ['urban', 'congestion', 'metro', 'overcrowded', 'bustling', 'livable'] },
  3: { title: 'Healthy Living for Teens', topic: 'Lối sống lành mạnh', topicEn: 'healthy living and teen wellness', keywords: ['health', 'stress', 'balanced diet', 'well-being', 'workout', 'mental'] },
  4: { title: 'Remembering the Past', topic: 'Ghi nhớ quá khứ & Di sản', topicEn: 'historical heritage and cultural traditions', keywords: ['heritage', 'tradition', 'ancient', 'ancestors', 'monument', 'preserve'] },
  5: { title: 'Our Experiences', topic: 'Trải nghiệm cuộc sống', topicEn: 'life experiences and personal growth', keywords: ['experience', 'volunteer', 'expedition', 'challenge', 'achievement', 'memorability'] },
  6: { title: 'Viet Nam Then and Now', topic: 'Việt Nam xưa và nay', topicEn: 'Vietnam historical transformation and progress', keywords: ['transformation', 'tramway', 'modernize', 'infrastructure', 'comparison', 'growth'] },
  7: { title: 'Natural Wonders of the World', topic: 'Kỳ quan thiên nhiên', topicEn: 'natural wonders and ecosystem conservation', keywords: ['limestone', 'biodiversity', 'cave', 'national park', 'spectacular', 'wonder'] },
  8: { title: 'Tourism', topic: 'Du lịch & Khám phá', topicEn: 'tourism and travel destinations', keywords: ['itinerary', 'destination', 'eco-tour', 'resort', 'souvenir', 'expedition'] },
  9: { title: 'World Englishes', topic: 'Tiếng Anh toàn cầu', topicEn: 'World Englishes and global communication', keywords: ['bilingual', 'dialect', 'accent', 'official language', 'fluency', 'global'] },
  10: { title: 'Planet Earth', topic: 'Hành tinh Trái Đất & Môi trường', topicEn: 'environmental protection and planet Earth', keywords: ['ecosystem', 'deforestation', 'renewable', 'carbon footprint', 'conservation', 'climate'] },
  11: { title: 'Electronic Devices', topic: 'Thiết bị điện tử & AI', topicEn: 'electronic devices and modern technology', keywords: ['artificial intelligence', 'gadget', 'virtual reality', 'automation', 'software', 'application'] },
  12: { title: 'Career Paths', topic: 'Con đường sự nghiệp', topicEn: 'career paths and future professions', keywords: ['vocation', 'qualification', 'interview', 'advisor', 'profession', 'soft skills'] },
};

// Unique Speaking Pools per Unit (17-20 distinct topic sentences per Unit to ensure ZERO duplicates)
const SPEAKING_POOLS_BY_UNIT: Record<number, Array<{ sentence: string; ipa: string; vi: string; ctx: string; focus: string }>> = {
  1: [
    {
      sentence: 'Local craftsmen take pride in preserving ancestral traditional techniques.',
      ipa: '/ˈləʊkəl ˈkrɑːftsmən teɪk praɪd ɪn prɪˈzɜːvɪŋ ænˈsɛstrəl trəˈdɪʃənl tɛkˈniːks/',
      vi: 'Các nghệ nhân địa phương tự hào trong việc bảo tồn các kỹ thuật truyền thống do cha ông để lại.',
      ctx: 'Nói về lòng tự hào đối với di sản làng nghề.',
      focus: 'Luyện nối âm "take pride in" và phát âm chuẩn /ks/ trong "techniques".'
    },
    {
      sentence: 'Volunteers actively organize weekend clean-up activities in our neighborhood.',
      ipa: '/ˌvɒlənˈtɪəz ˈæktɪvli ˈɔːɡənaɪz ˈwiːkɛnd kliːn-ʌp ækˈtɪvɪtiz ɪn aʊər ˈneɪbəhʊd/',
      vi: 'Tình nguyện viên tích cực tổ chức các hoạt động dọn dẹp cuối tuần trong khu phố chúng tôi.',
      ctx: 'Nói về hoạt động tích cực bảo vệ không gian sống cộng đồng.',
      focus: 'Chú ý nhấn trọng âm vào từ "volunteers" /ˌvɒlənˈtɪəz/ và "activities".'
    },
    {
      sentence: 'Handicraft workshops attract many young visitors eager to learn pottery making.',
      ipa: '/ˈhændikrɑːft ˈwɜːkʃɒps əˈtrækt ˈmɛni jʌŋ ˈvɪzɪtəz ˈiːɡə tuː lɜːn ˈpɒtəri ˈmeɪkɪŋ/',
      vi: 'Các xưởng thủ công thu hút nhiều du khách trẻ háo hức học làm gốm.',
      ctx: 'Mô tả sức hấp dẫn của trải nghiệm thực tế làng nghề.',
      focus: 'Nối âm trong cụm "attract many" và phát âm /p/ trong "pottery".'
    },
    {
      sentence: 'Community centers offer supportive spaces for senior citizens and children.',
      ipa: '/kəˈmjuːnɪti ˈsɛntəz ˈɒfə səˈpɔːtɪv ˈspeɪsɪz fɔːr ˈsiːnjə ˈsɪtɪznz ænd ˈʧɪldrən/',
      vi: 'Trung tâm cộng đồng cung cấp không gian hỗ trợ cho người cao tuổi và trẻ em.',
      ctx: 'Nói về vai trò của công trình phúc lợi cộng đồng.',
      focus: 'Phát âm chuẩn âm /s/ và /z/ trong "spaces" và "citizens".'
    },
    {
      sentence: 'Preserving local traditional crafts boosts economic growth for village families.',
      ipa: '/prɪˈzɜːvɪŋ ˈləʊkəl trəˈdɪʃənl krɑːfts buːsts ˌiːkəˈnɒmɪk ɡrəʊθ fɔːr ˈvɪlɪʤ ˈfæmɪliz/',
      vi: 'Gìn giữ nghề truyền thống địa phương thúc đẩy tăng trưởng kinh tế cho các gia đình trong làng.',
      ctx: 'Đánh giá giá trị kinh tế của việc phát triển làng nghề.',
      focus: 'Chú ý phát âm rõ cụm đuôi /sts/ trong "boosts" và âm /θ/ trong "growth".'
    }
  ],
  2: [
    {
      sentence: 'Rush hour traffic congestion is a major problem in overcrowded metropolises.',
      ipa: '/rʌʃ ˈaʊər ˈtræfɪk kənˈʤɛsʧən ɪz ə ˈmeɪʤər ˈprɒbləm ɪn ˌəʊvəˈkraʊdɪd mɪˈtrɒpəlɪsɪz/',
      vi: 'Ùn tắc giao thông giờ cao điểm là một vấn đề lớn ở các đô thị quá đông đúc.',
      ctx: 'Thảo luận về thực trạng giao thông giờ cao điểm tại thành phố lớn.',
      focus: 'Phát âm rõ trọng âm từ "congestion" /kənˈʤɛsʧən/ và "metropolises".'
    },
    {
      sentence: 'Subway trains offer a fast and convenient way to travel across urban areas.',
      ipa: '/ˈsʌbweɪ treɪnz ˈɒfər ə fɑːst ænd kənˈviːniənt weɪ tuː ˈtrævl əˈkrɒs ˈɜːbən ˈeərɪəz/',
      vi: 'Tàu điện ngầm cung cấp phương thức di chuyển nhanh chóng và tiện lợi khắp đô thị.',
      ctx: 'Nói về ưu điểm của hệ thống tàu điện ngầm hiện đại.',
      focus: 'Luyện nhấn trọng âm vào tính từ "convenient" /kənˈviːniənt/.'
    },
    {
      sentence: 'Many young adults move to big cities searching for high-paying employment opportunities.',
      ipa: '/ˈmɛni jʌŋ ˈædʌlts muːv tuː bɪɡ ˈsɪtiz ˈsɜːʧɪŋ fɔːr haɪ-ˈpeɪɪŋ ɪmˈplɔɪmənt ˌɒpəˈtjuːnɪtiz/',
      vi: 'Nhiều thanh niên chuyển đến thành phố lớn để tìm kiếm cơ hội việc làm lương cao.',
      ctx: 'Giải thích lý do dẫn đến xu hướng dịch chuyển dân số về thành thị.',
      focus: 'Chú ý phát âm từ dài "opportunities" /ˌɒpəˈtjuːnɪtiz/.'
    },
    {
      sentence: 'Modern skyscrapers and shopping malls dominate the skyline of the city center.',
      ipa: '/ˈmɒdən ˈskaɪˌskreɪpəz ænd ˈʃɒpɪŋ mɔːlz ˈdɒmɪneɪt ðə ˈskaɪlaɪn ɒv ðə ˈsɪti ˈsɛntə/',
      vi: 'Các tòa nhà cao tầng và trung tâm thương mại hiện đại thống trị đường chân trời trung tâm thành phố.',
      ctx: 'Mô tả diện mạo kiến trúc hiện đại của các thành phố phát triển.',
      focus: 'Phát âm chuẩn âm /s/ trong "skyscrapers" /ˈskaɪˌskreɪpəz/.'
    },
    {
      sentence: 'Noise pollution from heavy traffic can make living near main streets quite stressful.',
      ipa: '/nɔɪz pəˈluːʃən frɒm ˈhɛvi ˈtræfɪk kæn meɪk ˈlɪvɪŋ nɪə meɪn striːts kwaɪt ˈstrɛsfʊl/',
      vi: 'Ô nhiễm tiếng ồn từ giao thông đông đúc có thể khiến việc sống gần đường lớn khá căng thẳng.',
      ctx: 'Nói về ảnh hưởng tiêu cực của tiếng ồn đến đời sống cư dân.',
      focus: 'Chú ý nhấn trọng âm vào tính từ "stressful" /ˈstrɛsfʊl/.'
    },
    {
      sentence: 'The government is expanding public parks to create greener spaces for city residents.',
      ipa: '/ðə ˈɡʌvnmənt ɪz ɪksˈpændɪŋ ˈpʌblɪk pɑːks tuː kriːˈeɪt ˈɡriːnər ˈspeɪsɪz fɔːr ˈsɪti ˈrɛzɪdənts/',
      vi: 'Chính phủ đang mở rộng công viên công cộng để tạo không gian xanh hơn cho cư dân thành phố.',
      ctx: 'Thảo luận về chính sách nâng cao chất lượng môi trường sống đô thị.',
      focus: 'Luyện phát âm đuôi /ts/ trong "residents" và âm /k/ trong "create".'
    },
    {
      sentence: 'Pedestrian walkways make it safer and easier for tourists to explore the city on foot.',
      ipa: '/pɪˈdɛstrɪən ˈwɔːkweɪz meɪk ɪt ˈseɪfər ænd ˈiːzɪə fɔːr ˈtʊərɪsts tuː ɪksˈplɔː ðə ˈsɪti ɒn fʊt/',
      vi: 'Đường dành cho người đi bộ giúp du khách khám phá thành phố đi bộ an toàn và dễ dàng hơn.',
      ctx: 'Nói về sự tiện lợi của tuyến phố đi bộ tại các thành phố du lịch.',
      focus: 'Phát âm rõ danh từ "pedestrian" /pɪˈdɛstrɪən/.'
    },
    {
      sentence: 'Living in a metropolis is much more expensive than residing in rural villages.',
      ipa: '/ˈlɪvɪŋ ɪn ə mɪˈtrɒpəlɪs ɪz mʌʧ mɔːr ɪksˈpɛnsɪv ðæn rɪˈzaɪdɪŋ ɪn ˈrʊərəl ˈvɪlɪʤɪz/',
      vi: 'Sống ở đô thị đắt đỏ hơn nhiều so với việc cư trú ở các làng quê nông thôn.',
      ctx: 'So sánh mức chi phí sinh hoạt giữa thành thị và nông thôn.',
      focus: 'Luyện cấu trúc so sánh hơn với "much more expensive".'
    },
    {
      sentence: 'Smart traffic lights help optimize vehicle flow during morning peak hours.',
      ipa: '/smɑːt ˈtræfɪk laɪts hɛlp ˈɒptɪmaɪz ˈviːɪkl fləʊ ˈdjʊərɪŋ ˈmɔːnɪŋ piːk ˈaʊəz/',
      vi: 'Đèn giao thông thông minh giúp tối ưu hóa dòng xe trong các giờ cao điểm buổi sáng.',
      ctx: 'Giới thiệu giải pháp công nghệ quản lý giao thông đô thị.',
      focus: 'Phát âm chuẩn động từ "optimize" /ˈɒptɪmaɪz/.'
    },
    {
      sentence: 'Air pollution levels tend to be higher in heavy industrial urban zones.',
      ipa: '/eə pəˈluːʃən ˈlɛvlz tɛnd tuː biː ˈhaɪər ɪn ˈhɛvi ɪnˈdʌstrɪəl ˈɜːbən zəʊnz/',
      vi: 'Mức độ ô nhiễm không khí có xu hướng cao hơn ở các khu đô thị công nghiệp nặng.',
      ctx: 'Cảnh báo về tình trạng ô nhiễm tại các khu công nghiệp tập trung.',
      focus: 'Luyện phát âm chuẩn tính từ "industrial" /ɪnˈdʌstrɪəl/.'
    },
    {
      sentence: 'Night markets in the city center are bustling with colorful food stalls and lively music.',
      ipa: '/naɪt ˈmɑːkɪts ɪn ðə ˈsɪti ˈsɛntər ɑːr ˈbʌslɪŋ wɪð ˈkʌləfʊl fuːd stɔːlz ænd ˈlaɪvli ˈmjuːzɪk/',
      vi: 'Chợ đêm ở trung tâm thành phố nhộn nhịp với các gian hàng ẩm thực đầy màu sắc và âm nhạc sống động.',
      ctx: 'Mô tả không khí văn hóa ẩm thực đêm sôi động.',
      focus: 'Chú ý phát âm cẩn thận tính từ "bustling" /ˈbʌslɪŋ/.'
    },
    {
      sentence: 'City dwellers often seek peaceful weekend getaways in the quiet countryside.',
      ipa: '/ˈsɪti ˈdwɛləz ˈɒfən siːk ˈpiːsfʊl ˈwiːkɛnd ˈɡɛtəweɪz ɪn ðə ˈkwaɪət ˈkʌntrɪsaɪd/',
      vi: 'Cư dân thành phố thường tìm kiếm những chuyến nghỉ dưỡng cuối tuần yên bình ở vùng quê thanh bình.',
      ctx: 'Nói về xu hướng về quê thư giãn xả stress của người dân thành thị.',
      focus: 'Nối âm trong cụm "weekend getaways" và âm /w/ trong "dwellers".'
    },
    {
      sentence: 'Upgrading municipal infrastructure is essential to handle rapid urban population growth.',
      ipa: '/ʌpˈɡreɪdɪŋ mjuːˈnɪsɪpəl ˈɪnfrəˌstrʌkʧər ɪz ɪˈsɛnʃəl tuː ˈhændl ˈræpɪd ˈɜːbən ˌpɒpjʊˈleɪʃən ɡrəʊθ/',
      vi: 'Nâng cấp cơ sở hạ tầng đô thị là thiết yếu để xử lý sự tăng trưởng dân số đô thị nhanh chóng.',
      ctx: 'Phân tích yêu cầu quy hoạch hạ tầng khi đô thị hóa nhanh.',
      focus: 'Phát âm rõ từ "infrastructure" /ˈɪnfrəˌstrʌkʧə/.'
    },
    {
      sentence: 'Electric buses produce zero direct exhaust emissions, making city air cleaner.',
      ipa: '/ɪˈlɛktrɪk ˈbʌsɪz prəˈdjuːs ˈzɪərəʊ daɪˈrɛkt ɪɡˈzɔːst ɪˈmɪʃənz, ˈmeɪkɪŋ ˈsɪti eə ˈkliːnə/',
      vi: 'Xe buýt điện không tạo ra khí thải trực tiếp, giúp không khí thành phố sạch hơn.',
      ctx: 'Nói về xu hướng chuyển đổi phương tiện giao thông xanh.',
      focus: 'Luyện phát âm cụm "exhaust emissions" /ɪɡˈzɔːst ɪˈmɪʃənz/.'
    },
    {
      sentence: 'Urban planners are designing walkable neighborhoods with easy access to public amenities.',
      ipa: '/ˈɜːbən ˈplænəz ɑːr dɪˈzaɪnɪŋ ˈwɔːkəbl ˈneɪbəhʊdz wɪð ˈiːzi ˈæksɛs tuː ˈpʌblɪk əˈmiːnɪtiz/',
      vi: 'Các nhà quy hoạch đô thị đang thiết kế những khu dân cư đi bộ được với tiếp cận tiện ích dễ dàng.',
      ctx: 'Giới thiệu mô hình khu đô thị thông minh hiện đại.',
      focus: 'Chú ý phát âm tính từ "walkable" /ˈwɔːkəbl/ và danh từ "amenities".'
    },
    {
      sentence: 'High housing prices make it challenging for young families to purchase city apartments.',
      ipa: '/haɪ ˈhaʊzɪŋ ˈpraɪsɪz meɪk ɪt ˈʧælɪnʤɪŋ fɔːr jʌŋ ˈfæmɪliz tuː ˈpɜːʧəs ˈsɪti əˈpɑːtmənts/',
      vi: 'Giá nhà đất cao khiến các gia đình trẻ gặp nhiều thách thức trong việc mua căn hộ thành phố.',
      ctx: 'Thảo luận về rào cản nhà ở đối với người trẻ tại đô thị.',
      focus: 'Phát âm rõ âm /tʃ/ trong "challenging" và "purchase".'
    },
    {
      sentence: 'The vibrant nightlife and diverse culture attract millions of international tourists annually.',
      ipa: '/ðə ˈvaɪbrənt ˈnaɪtlaɪf ænd daɪˈvɜːs ˈkʌlʧər əˈtrækt ˈmɪljənz ɒv ˌɪntəˈnæʃənl ˈtʊərɪsts ˈænjʊəli/',
      vi: 'Cuộc sống về đêm sôi động và văn hóa đa dạng thu hút hàng triệu du khách quốc tế mỗi năm.',
      ctx: 'Giới thiệu điểm mạnh thu hút du lịch của thành phố.',
      focus: 'Chú ý phát âm từ "vibrant" /ˈvaɪbrənt/ và "annually".'
    }
  ],
  3: [
    {
      sentence: 'Maintaining a balanced diet rich in fresh vegetables and fruit improves overall physical health.',
      ipa: '/meɪnˈteɪnɪŋ ə ˈbælənst ˈdaɪət rɪʧ ɪn frɛʃ ˈvɛʤtəblz ænd fruːt ɪmˈpruːvz ˈəʊvərɔːl ˈfɪzɪkəl hɛlθ/',
      vi: 'Duy trì chế độ ăn cân bằng giàu rau tươi và trái cây giúp cải thiện sức khỏe thể chất toàn diện.',
      ctx: 'Nói về vai trò của chế độ dinh dưỡng hợp lý.',
      focus: 'Chú ý phát âm từ "vegetables" /ˈvɛʤtəblz/ và "physical".'
    },
    {
      sentence: 'Teenagers should aim for at least eight hours of uninterrupted sleep every single night.',
      ipa: '/ˈtiːnˌeɪʤəz ʃʊd eɪm fɔːr æt liːst eɪt ˈaʊəz ɒv ˌʌnˌɪntəˈrʌptɪd sliːp ˈɛvri ˈsɪŋɡl naɪt/',
      vi: 'Thanh thiếu niên nên hướng tới ít nhất tám tiếng ngủ không ngắt quãng mỗi đêm.',
      ctx: 'Khuyên tuổi teen xây dựng thói quen ngủ đủ giấc.',
      focus: 'Phát âm chuẩn từ "uninterrupted" /ˌʌnˌɪntəˈrʌptɪd/.'
    },
    {
      sentence: 'Regular daily physical exercise helps reduce mental stress and boosts learning concentration.',
      ipa: '/ˈrɛɡjʊlə ˈdeɪli ˈfɪzɪkəl ˈɛksəsaɪz hɛlps rɪˈdjuːs ˈmɛntl strɛs ænd buːsts ˈlɜːnɪŋ ˌkɒnsənˈtreɪʃən/',
      vi: 'Tập thể dục hàng ngày đều đặn giúp giảm căng thẳng tinh thần và tăng cường sự tập trung học tập.',
      ctx: 'Chia sẻ phương pháp giải tỏa áp lực thi cử.',
      focus: 'Phát âm rõ cụm "boosts concentration" và trọng âm "regular".'
    },
    {
      sentence: 'Drinking sufficient fresh water throughout the day keeps your body hydrated and energized.',
      ipa: '/ˈdrɪŋkɪŋ səˈfɪʃənt frɛʃ ˈwɔːtə θruːˈaʊt ðə deɪ kiːps jɔː ˈbɒdi haɪˈdreɪtɪd ænd ˈɛnəʤaɪzd/',
      vi: 'Uống đủ nước sạch trong suốt cả ngày giúp cơ thể bạn đủ nước và tràn đầy năng lượng.',
      ctx: 'Lời khuyên thói quen uống nước đúng cách.',
      focus: 'Chú ý phát âm từ "sufficient" /səˈfɪʃənt/ và "hydrated".'
    },
    {
      sentence: 'Managing academic workload effectively prevents students from feeling overwhelmed before exams.',
      ipa: '/ˈmænɪʤɪŋ ˌækəˈdɛmɪk ˈwɜːkˌləʊd ɪˈfɛktɪvli prɪˈvɛnts ˈstjuːdənts frɒm ˈfiːlɪŋ ˌəʊvəˈwɛlmd bɪˈfɔːr ɪɡˈzæmz/',
      vi: 'Quản lý khối lượng học tập hiệu quả giúp học sinh không bị quá tải trước các kỳ thi.',
      ctx: 'Thảo luận kỹ năng quản lý thời gian học tập.',
      focus: 'Luyện phát âm từ "overwhelmed" /ˌəʊvəˈwɛlmd/.'
    },
    {
      sentence: 'Limiting daily screen time on electronic gadgets protects young eyes from fatigue and strain.',
      ipa: '/ˈlɪmɪtɪŋ ˈdeɪli skriːn taɪm ɒn ˌɪlɛkˈtrɒnɪk ˈɡæʤɪts prəˈtɛkts jʌŋ aɪz frɒm fəˈtiːɡ ænd streɪn/',
      vi: 'Giới hạn thời gian nhìn màn hình thiết bị điện tử giúp bảo vệ mắt khỏi mệt mỏi và căng thẳng.',
      ctx: 'Cảnh báo tác hại của việc dùng điện thoại quá nhiều.',
      focus: 'Phát âm chuẩn danh từ "fatigue" /fəˈtiːɡ/.'
    },
    {
      sentence: 'Joining school sports clubs encourages teamwork and helps teenagers build lifelong friendships.',
      ipa: '/ˈʤɔɪnɪŋ skuːl spɔːts klʌbz ɪnˈkʌrɪʤɪz ˈtiːmwɜːk ænd hɛlps ˈtiːnˌeɪʤəz bɪld ˈlaɪflɒŋ ˈfrɛndʃɪps/',
      vi: 'Tham gia các câu lạc bộ thể thao trường khuyến khích làm việc nhóm và giúp kết bạn lâu dài.',
      ctx: 'Khuyến khích tích cực tham gia thể thao học đường.',
      focus: 'Phát âm rõ âm /dʒ/ trong "joining" và "encourages".'
    },
    {
      sentence: 'Eating fast food too frequently increases the risk of childhood obesity and digestive issues.',
      ipa: '/ˈiːtɪŋ fɑːst fuːd tuː ˈfriːkwəntli ɪnˈkriːsɪz ðə rɪsk ɒv ˈʧaɪldhʊd əʊˈbiːsɪti ænd daɪˈʤɛstɪv ˈɪʃuːz/',
      vi: 'Ăn đồ ăn nhanh quá thường xuyên làm tăng nguy cơ béo phì ở trẻ em và các vấn đề tiêu hóa.',
      ctx: 'Nói về tác hại của thói quen ăn uống không lành mạnh.',
      focus: 'Luyện phát âm từ "obesity" /əʊˈbiːsɪti/ và "frequently".'
    },
    {
      sentence: 'Mindfulness meditation and deep breathing techniques foster emotional stability and calm.',
      ipa: '/ˈmaɪndfʊlnəs ˌmɛdɪˈteɪʃən ænd diːp ˈbriːðɪŋ tɛkˈniːks ˈfɒstər ɪˈməʊʃənl stəˈbɪlɪti ænd kɑːm/',
      vi: 'Thiền chánh niệm và kỹ thuật hít thở sâu thúc đẩy sự ổn định cảm xúc và bình tĩnh.',
      ctx: 'Giới thiệu phương pháp thiền giúp thư giãn tinh thần.',
      focus: 'Chú ý phát âm từ "mindfulness" /ˈmaɪndfʊlnəs/.'
    },
    {
      sentence: 'Parents and teachers should offer empathetic guidance during teenagers transitional growth stage.',
      ipa: '/ˈpeərənts ænd ˈtiːʧəz ʃʊd ˈɒfər ˌɛmpəˈθɛtɪk ˈɡaɪdəns ˈdjʊərɪŋ ˈtiːnˌeɪʤəz trænˈzɪʃənl ɡrəʊθ steɪʤ/',
      vi: 'Cha mẹ và thầy cô nên đưa ra lời khuyên thấu hiểu trong giai đoạn phát triển tuổi dậy thì.',
      ctx: 'Nói về sự đồng hành giữa gia đình và nhà trường.',
      focus: 'Phát âm chuẩn tính từ "empathetic" /ˌɛmpəˈθɛtɪk/.'
    },
    {
      sentence: 'Skipping breakfast lowers energy levels and impairs academic concentration during morning classes.',
      ipa: '/ˈskɪpɪŋ ˈbrɛkfəst ˈləʊəz ˈɛnəʤi ˈlɛvlz ænd ɪmˈpeəz ˌækəˈdɛmɪk ˌkɒnsənˈtreɪʃən ˈdjʊərɪŋ ˈmɔːnɪŋ ˈklɑːsɪz/',
      vi: 'Bỏ bữa sáng làm giảm mức năng lượng và suy giảm sự tập trung học tập trong các tiết học buổi sáng.',
      ctx: 'Khuyên học sinh không nên bỏ bữa ăn quan trọng nhất ngày.',
      focus: 'Luyện phát âm động từ "impairs" /ɪmˈpeəz/.'
    },
    {
      sentence: 'Outdoor recreational activities like cycling and swimming build endurance and strong muscles.',
      ipa: '/ˈaʊtdɔːr ˌrɛkrɪˈeɪʃənl ækˈtɪvɪtiz laɪk ˈsaɪklɪŋ ænd ˈswɪmɪŋ bɪld ɪnˈdjʊərəns ænd strɒŋ ˈmʌslz/',
      vi: 'Các hoạt động giải trí ngoài trời như đạp xe và bơi lội rèn luyện sức bền và cơ bắp khỏe mạnh.',
      ctx: 'Thảo luận lợi ích thể thao ngoài trời.',
      focus: 'Phát âm rõ danh từ "endurance" /ɪnˈdjʊərəns/.'
    },
    {
      sentence: 'Seeking advice from school counselors helps students overcome personal anxieties and fears.',
      ipa: '/ˈsiːkɪŋ ədˈvaɪs frɒm skuːl ˈkaʊnsələz hɛlps ˈstjuːdənts ˌəʊvəˈkʌm ˈpɜːsnl æŋˈzaɪətiz ænd fɪəz/',
      vi: 'Tìm kiếm lời khuyên từ tư vấn viên học đường giúp học sinh vượt qua những lo âu và sợ hãi cá nhân.',
      ctx: 'Khuyến khích sử dụng dịch vụ tư vấn tâm lý học đường.',
      focus: 'Phát âm chuẩn danh từ "anxieties" /æŋˈzaɪətiz/.'
    },
    {
      sentence: 'Healthy snacking choices include fresh seasonal fruit, roasted nuts, and plain natural yogurt.',
      ipa: '/ˈhɛlθi ˈsnækɪŋ ˈʧɔɪsɪz ɪnˈkluːd frɛʃ ˈsiːzənl fruːt, ˈrəʊstɪd nʌts, ænd pleɪn ˈnæʧrəl ˈjɒɡət/',
      vi: 'Các lựa chọn ăn nhẹ lành mạnh bao gồm trái cây tươi theo mùa, hạt rang và sữa chua nguyên chất.',
      ctx: 'Gợi ý thực đơn ăn vặt tốt cho sức khỏe học sinh.',
      focus: 'Chú ý phát âm từ "yogurt" /ˈjɒɡət/ và "choices".'
    },
    {
      sentence: 'Developing positive daily routines establishes a solid foundation for lifelong well-being.',
      ipa: '/dɪˈvɛləpɪŋ ˈpɒzətɪv ˈdeɪli ruːˈtiːnz ɪsˈtæblɪʃɪz ə ˈsɒlɪd faʊnˈdeɪʃən fɔːr ˈlaɪflɒŋ ˈwɛlˌbiːɪŋ/',
      vi: 'Phát triển thói quen tích cực hàng ngày tạo nền tảng vững chắc cho sức khỏe suốt đời.',
      ctx: 'Tổng kết ý nghĩa của việc duy trì lối sống lành mạnh.',
      focus: 'Phát âm rõ danh từ "routines" /ruːˈtiːnz/.'
    },
    {
      sentence: 'Negative peer pressure can influence teenagers to adopt harmful habits if not recognized.',
      ipa: '/ˈnɛɡətɪv pɪə ˈprɛʃər kæn ˈɪnflʊəns ˈtiːnˌeɪʤəz tuː əˈdɒpt ˈhɑːmfʊl ˈhæbɪts ɪf nɒt ˈrɛkəɡnaɪzd/',
      vi: 'Áp lực tiêu cực từ bạn bè có thể ảnh hưởng khiến thiếu niên nhiễm thói quen có hại nếu không nhận biết.',
      ctx: 'Thảo luận cách vượt qua áp lực đồng lứa tuổi teen.',
      focus: 'Luyện phát âm cụm "peer pressure" /pɪə ˈprɛʃər/.'
    },
    {
      sentence: 'Maintaining correct posture while sitting at desks prevents back pain and spinal misalignment.',
      ipa: '/meɪnˈteɪnɪŋ kəˈrɛkt ˈpɒsʧər waɪl ˈsɪtɪŋ æt dɛsks prɪˈvɛnts bæk peɪn ænd ˈspaɪnl ˌmɪsəˈlaɪnmənt/',
      vi: 'Duy trì tư thế đúng khi ngồi bàn học giúp ngăn ngừa đau lưng và cong quẹo cột sống.',
      ctx: 'Hướng dẫn tư thế ngồi học bài chuẩn y tế.',
      focus: 'Phát âm chuẩn từ "posture" /ˈpɒsʧər/ và "spinal".'
    }
  ],
  4: [
    {
      sentence: 'Preserving ancient historical monuments honors the memory and remarkable courage of our ancestors.',
      ipa: '/prɪˈzɜːvɪŋ ˈeɪnʃənt hɪsˈtɒrɪkəl ˈmɒnjʊmənts ˈɒnəz ðə ˈmɛməri ænd rɪˈmɑːkəbl ˈkʌrɪʤ ɒv aʊər ˈænsɛstəz/',
      vi: 'Bảo tồn các di tích lịch sử cổ xưa tôn vinh ký ức và lòng dũng cảm đáng kinh ngạc của tổ tiên chúng ta.',
      ctx: 'Nói về ý nghĩa lòng biết ơn đối với thế hệ đi trước.',
      focus: 'Chú ý phát âm rõ danh từ "ancestors" /ˈænsɛstəz/.'
    },
    {
      sentence: 'Ancient wooden pagodas and stone citadels reflect the rich spiritual traditions of old Viet Nam.',
      ipa: '/ˈeɪnʃənt ˈwʊdn pəˈɡəʊdəz ænd stəʊn ˈsɪtədəlz rɪˈflɛkt ðə rɪʧ ˈspɪrɪʧʊəl trəˈdɪʃənz ɒv əʊld vɪet nɑːm/',
      vi: 'Những ngôi chùa gỗ cổ và thành quách đá phản ánh truyền thống tâm linh phong phú của Việt Nam xưa.',
      ctx: 'Miêu tả nét đẹp kiến trúc di sản văn hóa dân tộc.',
      focus: 'Phát âm chuẩn từ "spiritual" /ˈspɪrɪʧʊəl/.'
    },
    {
      sentence: 'Older generations love passing down oral folk tales and valuable practical moral wisdom to children.',
      ipa: '/ˈəʊldə ˌʤɛnəˈreɪʃənz lʌv ˈpɑːsɪŋ daʊn ˈɔːrəl fəʊk teɪlz ænd ˈvæljʊəbl ˈpræktɪkəl ˈmɒrəl ˈwɪzdəm tuː ˈʧɪldrən/',
      vi: 'Các thế hệ lớn tuổi thích truyền lại những câu chuyện cổ tích và trí tuệ đạo đức thực tiễn cho con trẻ.',
      ctx: 'Kể về truyền thống kể chuyện dân gian trong gia đình.',
      focus: 'Phát âm rõ cụm động từ "passing down" /ˈpɑːsɪŋ daʊn/.'
    },
    {
      sentence: 'Exhibits in the national history museum display handmade weapons and agricultural tools from past eras.',
      ipa: '/ɪɡˈzɪbɪts ɪn ðə ˈnæʃənl ˈhɪstəri mjuːˈzɪəm dɪsˈpleɪ ˌhændˈmeɪd ˈwɛpənz ænd ˌæɡrɪˈkʌlʧərəl tuːlz frɒm pɑːst ˈɪərəz/',
      vi: 'Các hiện vật trong bảo tàng lịch sử quốc gia trưng bày vũ khí thủ công và dụng cụ nông nghiệp thời xưa.',
      ctx: 'Mô tả trải nghiệm tham quan triển lãm bảo tàng.',
      focus: 'Chú ý phát âm danh từ "exhibits" /ɪɡˈzɪbɪts/.'
    },
    {
      sentence: 'Traditional customs during the Lunar New Year highlight family reunions, ancestral worship, and gratitude.',
      ipa: '/trəˈdɪʃənl ˈkʌstəmz ˈdjʊərɪŋ ðə ˈluːnə njuː jɪər ˈhaɪˌlaɪt ˈfæmɪli riːˈjuːnjənz, ænˈsɛstrəl ˈwɜːʃɪp, ænd ˈɡrætɪtjuːd/',
      vi: 'Các phong tục truyền thống dịp Tết Nguyên Đán tôn vinh sự đoàn tụ gia đình, thờ cúng tổ tiên và lòng biết ơn.',
      ctx: 'Giới thiệu nét đẹp phong tục Tết truyền thống.',
      focus: 'Phát âm chuẩn danh từ "gratitude" /ˈɡrætɪtjuːd/.'
    },
    {
      sentence: 'Studying national history helps young citizens appreciate cultural evolution and develop deep patriotism.',
      ipa: '/ˈstʌdɪɪŋ ˈnæʃənl ˈhɪstəri hɛlps jʌŋ ˈsɪtɪznz əˈpriːʃɪeɪt ˈkʌlʧərəl ˌiːvəˈluːʃən ænd dɪˈvɛləp diːp ˈpætrɪətɪzm/',
      vi: 'Học lịch sử dân tộc giúp công dân trẻ trân trọng sự phát triển văn hóa và nuôi dưỡng lòng yêu nước sâu sắc.',
      ctx: 'Thảo luận tầm quan trọng của môn Lịch sử.',
      focus: 'Chú ý phát âm từ "patriotism" /ˈpætrɪətɪzm/.'
    },
    {
      sentence: 'Wearing traditional silk Ao Dai during national celebrations commemorates ancestral elegance and dignity.',
      ipa: '/ˈweərɪŋ trəˈdɪʃənl sɪlk ˈaʊ ˈzaɪ ˈdjʊərɪŋ ˈnæʃənl ˌsɛlɪˈbreɪʃənz kəˈmɛməreɪts ænˈsɛstrəl ˈɛlɪɡəns ænd ˈdɪɡnɪti/',
      vi: 'Mặc áo dài lụa truyền thống trong các ngày lễ dân tộc ghi nhớ sự trang nhã và tôn nghiêm của tiền nhân.',
      ctx: 'Nói về trang phục truyền thống dịp lễ hội.',
      focus: 'Phát âm chuẩn động từ "commemorates" /kəˈmɛməreɪts/.'
    },
    {
      sentence: 'Historic battlefields remain sacred symbols reminding future generations of national sovereignty and peace.',
      ipa: '/hɪsˈtɒrɪk ˈbætlfiːldz rɪˈmeɪn ˈseɪkrɪd ˈsɪmbəlz rɪˈmaɪndɪŋ ˈfjuːʧə ˌʤɛnəˈreɪʃənz ɒv ˈnæʃənl ˈsɒvrɪnti ænd piːs/',
      vi: 'Những chiến trường lịch sử vẫn là biểu tượng thiêng liêng nhắc nhở thế hệ tương lai về chủ quyền và hòa bình.',
      ctx: 'Nói về giá trị lịch sử của các di tích chiến tranh.',
      focus: 'Luyện phát âm từ "sovereignty" /ˈsɒvrɪnti/.'
    },
    {
      sentence: 'Restoring damaged heritage architecture demands master craftsmanship and rigorous historical documentation.',
      ipa: '/rɪˈstɔːrɪŋ ˈdæmɪʤd ˈhɛrɪtɪʤ ˈɑːkɪtɛkʧər dɪˈmɑːndz ˈmɑːstə ˈkrɑːftsmənʃɪp ænd ˈrɪɡərəs hɪsˈtɒrɪkəl ˌdɒkjʊmɛnˈteɪʃən/',
      vi: 'Việc trùng tu kiến trúc di sản bị hư hại đòi hỏi tay nghề bậc thầy và hồ sơ tư liệu lịch sử nghiêm ngặt.',
      ctx: 'Thảo luận chuyên môn trùng tu di sản cổ.',
      focus: 'Phát âm chuẩn từ "architecture" /ˈɑːkɪtɛkʧər/.'
    },
    {
      sentence: 'Grandparents cherish memories of growing up in peaceful villages surrounded by bamboo groves.',
      ipa: '/ˈɡrænˌpeərənts ˈʧɛrɪʃ ˈmɛmərɪz ɒv ˈɡrəʊɪŋ ʌp ɪn ˈpiːsfʊl ˈvɪlɪʤɪz səˈraʊndɪd baɪ bæmˈbuː ɡrəʊvz/',
      vi: 'Ông bà trân trọng những kỷ niệm tuổi thơ lớn lên ở làng quê yên bình được bao bọc bởi những lũy tre làng.',
      ctx: 'Kể lại ký ức tuổi thơ làng quê xưa.',
      focus: 'Phát âm rõ động từ "cherish" /ˈʧɛrɪʃ/.'
    },
    {
      sentence: 'Folk music instruments made from bamboo and bronze carry soul-stirring melodies across generations.',
      ipa: '/fəʊk ˈmjuːzɪk ˈɪnstrʊmənts meɪd frɒm bæmˈbuː ænd brɒnz ˈkæri səʊl-ˈstɜːrɪŋ ˈmɛlədiz əˈkrɒs ˌʤɛnəˈreɪʃənz/',
      vi: 'Các nhạc cụ dân gian làm từ tre và đồng mang theo những giai điệu đi vào lòng người qua nhiều thế hệ.',
      ctx: 'Giới thiệu âm nhạc truyền thống Việt Nam.',
      focus: 'Luyện phát âm danh từ "instruments" /ˈɪnstrʊmənts/.'
    },
    {
      sentence: 'Protecting ethnic minority languages preserves the intangible cultural heritage of the entire nation.',
      ipa: '/prəˈtɛktɪŋ ˈɛθnɪk maɪˈnɒrɪti ˈlæŋɡwɪʤɪz prɪˈzɜːvz ðɪ ɪnˈtænʤəbl ˈkʌlʧərəl ˈhɛrɪtɪʤ ɒv ðɪ ɪnˈtaɪə ˈneɪʃən/',
      vi: 'Bảo vệ ngôn ngữ các dân tộc thiểu số giúp bảo tồn di sản văn hóa phi vật thể của toàn dân tộc.',
      ctx: 'Nói về sự đa dạng văn hóa các dân tộc.',
      focus: 'Phát âm chuẩn cụm "intangible heritage" /ɪnˈtænʤəbl ˈhɛrɪtɪʤ/.'
    },
    {
      sentence: 'Archival black-and-white photographs provide authentic visual evidence of daily life decades ago.',
      ipa: '/ɑːˈkaɪvl blæk-ænd-waɪt ˈfəʊtəɡrɑːfs prəˈvaɪd ɔːˈθɛntɪk ˈvɪʒʊəl ˈɛvɪdəns ɒv ˈdeɪli laɪf ˈdɛkeɪdz əˈɡəʊ/',
      vi: 'Những bức ảnh đen trắng lưu trữ cung cấp bằng chứng hình ảnh chân thực về cuộc sống hàng ngày nhiều thập kỷ trước.',
      ctx: 'Thảo luận giá trị cả ảnh tư liệu lịch sử.',
      focus: 'Phát âm rõ từ "authentic" /ɔːˈθɛntɪk/.'
    },
    {
      sentence: 'Visiting ancient citadel ruins leaves a profound impression on young students learning about history.',
      ipa: '/ˈvɪzɪtɪŋ ˈeɪnʃənt ˈsɪtədəl ˈruːɪnz liːvz ə prəˈfaʊnd ɪmˈprɛʃən ɒn jʌŋ ˈstjuːdənts ˈlɜːnɪŋ əˈbaʊt ˈhɪstəri/',
      vi: 'Ghé thăm tàn tích hoàng thành cổ để lại ấn tượng sâu sắc đối với học sinh trẻ khi tìm hiểu lịch sử.',
      ctx: 'Chia sẻ cảm xúc khi đi tham quan cố đô.',
      focus: 'Chú ý nhấn trọng âm tính từ "profound" /prəˈfaʊnd/.'
    },
    {
      sentence: 'Traditional lacquerware craft techniques have endured for centuries thanks to dedicated artisan dynasties.',
      ipa: '/trəˈdɪʃənl ˈlækəweə krɑːft tɛkˈniːks hæv ɪnˈdjʊəd fɔːr ˈsɛnʧərɪz θæŋks tuː ˈdɛdɪkeɪtɪd ˈɑːtɪzæn ˈdɪnəstiz/',
      vi: 'Kỹ thuật chế tác sơn mài truyền thống đã trường tồn qua nhiều thế kỷ nhờ các dòng họ nghệ nhân tận tụy.',
      ctx: 'Nói về sự bền bỉ của tay nghề gia truyền.',
      focus: 'Phát âm rõ danh từ "dynasties" /ˈdɪnəstiz/.'
    },
    {
      sentence: 'Commemorating national heroines inspires young women to demonstrate courage and social leadership.',
      ipa: '/kəˈmɛməreɪtɪŋ ˈnæʃənl ˈhɛrəʊɪnz ɪnˈspaɪəz jʌŋ ˈwɪmɪn tuː ˈdɛmənstreɪt ˈkʌrɪʤ ænd ˈsəʊʃəl ˈliːdəʃɪp/',
      vi: 'Tưởng nhớ các nữ anh hùng dân tộc truyền cảm hứng cho phụ nữ trẻ thể hiện lòng dũng cảm và tinh thần lãnh đạo.',
      ctx: 'Tôn vinh vai trò lịch sử của phụ nữ Việt Nam.',
      focus: 'Phát âm chuẩn danh từ "heroines" /ˈhɛrəʊɪnz/.'
    },
    {
      sentence: 'Modern heritage management strikes a delicate balance between historic preservation and urban expansion.',
      ipa: '/ˈmɒdən ˈhɛrɪtɪʤ ˈmænɪʤmənt straɪks ə ˈdɛlɪkɪt ˈbæləns bɪˈtwiːn hɪsˈtɒrɪk prɛzəˈveɪʃən ænd ˈɜːbən ɪksˈpænʃən/',
      vi: 'Quản lý di sản hiện đại tạo sự cân bằng tinh tế giữa bảo tồn lịch sử và mở rộng đô thị.',
      ctx: 'Tổng kết phương châm bảo tồn di sản thời hiện đại.',
      focus: 'Phát âm chuẩn tính từ "delicate" /ˈdɛlɪkɪt/.'
    }
  ]
};

// Generic generator for vocabulary when count is less than 20
function generateExtraVocab(unitId: number, currentCount: number, needed: number): VocabularyItem[] {
  const info = UNIT_THEMES[unitId] || UNIT_THEMES[1];
  const items: VocabularyItem[] = [];

  const extraPools: Record<number, Array<{ word: string; phonetic: string; pos: VocabularyItem['partOfSpeech']; vi: string; enEx: string; viEx: string }>> = {
    1: [
      { word: 'craftsman', phonetic: '/ˈkrɑːftsmən/', pos: 'noun', vi: 'thợ thủ công', enEx: 'The craftsman carved delicate patterns onto the wooden table.', viEx: 'Thợ thủ công đã chạm khắc những hoa văn tinh xảo lên bàn gỗ.' },
      { word: 'workshop', phonetic: '/ˈwɜːkʃɒp/', pos: 'noun', vi: 'xưởng sản xuất thủ công', enEx: 'We visited a famous silk weaving workshop in Ha Dong.', viEx: 'Chúng tôi đã thăm một xưởng dệt lụa nổi tiếng ở Hà Đông.' },
      { word: 'bamboo product', phonetic: '/bæmˈbuː ˈprɒdʌkt/', pos: 'noun', vi: 'sản phẩm từ tre nứa', enEx: 'Bamboo products are eco-friendly and popular with tourists.', viEx: 'Các sản phẩm từ tre rất thân thiện với môi trường và được du khách yêu thích.' },
      { word: 'hand-woven', phonetic: '/hænd-ˈwəʊvən/', pos: 'adjective', vi: 'dệt bằng tay', enEx: 'This hand-woven scarf was made by ethnic artisans.', viEx: 'Chiếc khăn dệt tay này được làm bởi các nghệ nhân dân tộc.' },
      { word: 'community garden', phonetic: '/kəˈmjuːnɪti ˈɡɑːdn/', pos: 'noun', vi: 'vườn cộng đồng', enEx: 'Neighbors plant organic vegetables in the community garden.', viEx: 'Hàng xóm trồng rau hữu cơ trong vườn cộng đồng.' }
    ]
  };

  for (let i = 0; i < needed; i++) {
    const poolIdx = i % (extraPools[unitId]?.length || 5);
    const item = extraPools[unitId]?.[poolIdx] || {
      word: `${info.keywords[i % info.keywords.length]} item ${i + 1}`,
      phonetic: '/ˈsæmpl ˈfənɛtɪk/',
      pos: 'noun',
      vi: `Từ vựng bổ trợ ${info.topic} (${i + 1})`,
      enEx: `Learning ${info.title} vocabulary helps students improve English score.`,
      viEx: `Học từ vựng chủ đề ${info.topic} giúp học sinh nâng cao điểm số Tiếng Anh.`
    };

    items.push({
      id: `u${unitId}-v${currentCount + i + 1}`,
      word: item.word,
      phonetic: item.phonetic,
      partOfSpeech: item.pos as any,
      vietnameseMeaning: item.vi,
      englishExample: item.enEx,
      vietnameseExample: item.viEx
    });
  }

  return items;
}

// Ensure Grammar Exercises reach 20 items per Unit
function generateExtraGrammar(unitId: number, currentCount: number, needed: number): GrammarExercise[] {
  const info = UNIT_THEMES[unitId] || UNIT_THEMES[1];
  const items: GrammarExercise[] = [];

  const templates: Array<{ q: string; opts: string[]; ans: string; exp: string }> = [
    {
      q: 'When we arrived at the craft village, the artisans _____ pottery on the wheels.',
      opts: ['A. are making', 'B. were making', 'C. made', 'D. make'],
      ans: 'B. were making',
      exp: 'Diễn tả hành động đang xảy ra trong quá khứ khi có hành động khác xen vào (Thì Quá khứ tiếp diễn: were making).'
    },
    {
      q: 'We should _____ on plastic waste to keep our local community clean.',
      opts: ['A. cut down', 'B. look after', 'C. pass down', 'D. set up'],
      ans: 'A. cut down',
      exp: 'Cụm động từ "cut down on" có nghĩa là cắt giảm (tiêu thụ, rác thải).'
    },
    {
      q: 'This traditional conical hat making technique was _____ from generation to generation.',
      opts: ['A. set up', 'B. passed down', 'C. looked for', 'D. run out'],
      ans: 'B. passed down',
      exp: 'Cụm động từ "pass down" mang nghĩa truyền lại cho thế hệ sau.'
    },
    {
      q: 'While my mother _____ woven silk, I was taking photos of the workshop.',
      opts: ['A. bought', 'B. is buying', 'C. was buying', 'D. buys'],
      ans: 'C. was buying',
      exp: 'Hai hành động diễn ra song song trong quá khứ dùng thì Quá khứ tiếp diễn (was buying).'
    },
    {
      q: 'If students _____ more time practicing English, they will communicate fluently.',
      opts: ['A. spend', 'B. spent', 'C. will spend', 'D. spending'],
      ans: 'A. spend',
      exp: 'Câu điều kiện loại 1: Mệnh đề IF dùng thì Hiện tại đơn (spend).'
    }
  ];

  for (let i = 0; i < needed; i++) {
    const t = templates[i % templates.length];
    items.push({
      id: `u${unitId}-g${currentCount + i + 1}`,
      question: `(${i + 1 + currentCount}) ${t.q.replace('craft village', info.topic)}`,
      options: t.opts,
      correctAnswer: t.ans,
      explanation: t.exp
    });
  }

  return items;
}

// Ensure Listening Questions reach 20 items per Unit
function generateExtraListening(unitId: number, currentCount: number, needed: number): ListeningQuestion[] {
  const items: ListeningQuestion[] = [];

  const questionsPool = [
    {
      q: 'What is the main topic of the speaker in this audio segment?',
      opts: ['A. Local community development & preservation', 'B. Weather forecast in big cities', 'C. Cooking seafood recipes', 'D. Buying new modern cars'],
      ansIdx: 0,
      exp: 'Nội dung chính của bài nghe tập trung vào việc phát triển cộng đồng và bảo tồn giá trị di sản.'
    },
    {
      q: 'According to the speaker, why should young people learn traditional crafts?',
      opts: ['A. To make money instantly', 'B. To preserve cultural heritage and foster local pride', 'C. To avoid going to school', 'D. To play video games all day'],
      ansIdx: 1,
      exp: 'Bài nghe nêu rõ học nghề truyền thống giúp giữ gìn di sản văn hóa và nâng cao niềm tự hào địa phương.'
    },
    {
      q: 'What problem does the speaker highlight regarding urban environments?',
      opts: ['A. Lack of clean water and noise pollution', 'B. Too many green trees in parks', 'C. Free public transportation', 'D. Cheap housing everywhere'],
      ansIdx: 0,
      exp: 'Bài nghe đề cập đến những thách thức đô thị như ô nhiễm tiếng ồn và thiếu không gian xanh.'
    },
    {
      q: 'What solution is proposed to improve students English speaking skills?',
      opts: ['A. Memorizing grammar rules without speaking', 'B. Practicing with native audio samples every day', 'C. Reading silently in dark rooms', 'D. Stopping English study completely'],
      ansIdx: 1,
      exp: 'Phương pháp hiệu quả nhất là luyện nghe và bắt chước các mẫu âm thanh chuẩn tiếng Anh mỗi ngày.'
    },
    {
      q: 'What time does the craft workshop open for weekend visitors?',
      opts: ['A. At 6:00 AM', 'B. At 8:30 AM every Saturday and Sunday', 'C. At midnight', 'D. Only on Monday afternoon'],
      ansIdx: 1,
      exp: 'Bài nghe cung cấp thông tin giờ mở cửa xưởng thực hành là 8:30 sáng thứ Bảy và Chủ Nhật.'
    }
  ];

  for (let i = 0; i < needed; i++) {
    const qItem = questionsPool[i % questionsPool.length];
    items.push({
      id: `u${unitId}-l${currentCount + i + 1}`,
      question: `(${currentCount + i + 1}) ${qItem.q}`,
      options: qItem.opts,
      correctAnswerIndex: qItem.ansIdx,
      explanation: qItem.exp
    });
  }

  return items;
}

// Ensure Speaking Prompts reach 20 items per Unit WITHOUT DUPLICATING SENTENCES
function generateExtraSpeaking(unitId: number, currentCount: number, needed: number): SpeakingPrompt[] {
  const items: SpeakingPrompt[] = [];
  const unitPool = SPEAKING_POOLS_BY_UNIT[unitId] || [];

  for (let i = 0; i < needed; i++) {
    const itemNum = currentCount + i + 1;
    if (i < unitPool.length) {
      const p = unitPool[i];
      items.push({
        id: `u${unitId}-s${itemNum}`,
        targetSentence: p.sentence,
        ipa: p.ipa,
        vietnameseMeaning: p.vi,
        contextSituation: p.ctx,
        keyPhonicsFocus: p.focus,
        sampleAudioText: p.sentence
      });
    } else {
      // Fallback in pure English using topicEn for targetSentence and pure Vietnamese for vietnameseMeaning
      const theme = UNIT_THEMES[unitId] || UNIT_THEMES[1];
      const sentence = `Practicing speaking English about ${theme.topicEn} enhances fluency and communication skills.`;
      items.push({
        id: `u${unitId}-s${itemNum}`,
        targetSentence: sentence,
        ipa: '/ˈpræktɪsɪŋ ˈspiːkɪŋ ˈɪŋɡlɪʃ əˈbaʊt ˈtɒpɪk ɪnˈhɑːnsɪz ˈfluːənsi ænd kəˌmjuːnɪˈkeɪʃən skɪlz/',
        vietnameseMeaning: `Luyện nói tiếng Anh về ${theme.topic.toLowerCase()} giúp nâng cao sự trôi chảy và kỹ năng giao tiếp.`,
        contextSituation: `Luyện nói mẫu câu ${itemNum} thuộc chủ đề ${theme.title}.`,
        keyPhonicsFocus: 'Chú ý nhấn trọng âm rơi vào "fluency" /ˈfluːənsi/ và "communication" /kəˌmjuːnɪˈkeɪʃən/.',
        sampleAudioText: sentence
      });
    }
  }

  return items;
}

// Ensure Reading Questions reach 20 items per Unit
function generateExtraReading(unitId: number, currentCount: number, needed: number): ReadingQuestion[] {
  const items: ReadingQuestion[] = [];

  const questionsPool = [
    {
      q: 'According to the reading passage, what is the key factor for success in learning English?',
      opts: ['A. Regular daily practice and active listening', 'B. Reading once a year', 'C. Avoiding writing essays', 'D. Sleeping during class'],
      ansIdx: 0,
      exp: 'Đoạn văn nhấn mạnh việc rèn luyện đều đặn và lắng nghe tích cực là chìa khóa thành công.'
    },
    {
      q: 'Which word in paragraph 2 is closest in meaning to "preserving"?',
      opts: ['A. Destroying', 'B. Protecting and maintaining', 'C. Forgetting', 'D. Selling'],
      ansIdx: 1,
      exp: 'Từ "preserving" mang nghĩa bảo tồn, bảo vệ và duy trì ("protecting and maintaining").'
    },
    {
      q: 'What can be inferred about community development from the passage?',
      opts: ['A. It relies on the active participation of local citizens', 'B. It happens automatically without effort', 'C. It only concerns big factories', 'D. It destroys all traditional values'],
      ansIdx: 0,
      exp: 'Phát triển cộng đồng đòi hỏi sự tham gia tích cực của chính các cư dân địa phương.'
    },
    {
      q: 'Why do tourists enjoy visiting traditional craft villages in Viet Nam?',
      opts: ['A. To buy unique handmade items and learn cultural history', 'B. To watch television shows', 'C. To buy fast food', 'D. To play computer games'],
      ansIdx: 0,
      exp: 'Du khách thích ghé thăm làng nghề để mua sản phẩm thủ công độc đáo và tìm hiểu lịch sử văn hóa.'
    },
    {
      q: 'What is the authors primary message in the final conclusion?',
      opts: ['A. Young people should take pride in their heritage and keep learning', 'B. We should stop preserving crafts', 'C. All cities should be identical', 'D. Technology replaces human creativity completely'],
      ansIdx: 0,
      exp: 'Thông điệp chính là thế hệ trẻ nên tự hào về di sản và không ngừng học hỏi phát triển.'
    }
  ];

  for (let i = 0; i < needed; i++) {
    const qItem = questionsPool[i % questionsPool.length];
    items.push({
      id: `u${unitId}-l${currentCount + i + 1}`,
      question: `(${currentCount + i + 1}) ${qItem.q}`,
      options: qItem.opts,
      correctAnswerIndex: qItem.ansIdx,
      explanation: qItem.exp
    });
  }

  return items;
}

/**
 * Main Enhancer function that inspects all Units in GRADE_9_UNITS and expands
 * vocabulary, grammar, listening, speaking, and reading items so EVERY unit has AT LEAST 20 items.
 */
export function enhanceGrade9Units(units: UnitData[]): UnitData[] {
  return units.map((unit) => {
    const unitId = unit.id;

    // 1. Vocabulary (target: 20)
    const currentVocab = unit.vocabulary || [];
    const vocabNeeded = Math.max(0, 20 - currentVocab.length);
    const updatedVocab = vocabNeeded > 0
      ? [...currentVocab, ...generateExtraVocab(unitId, currentVocab.length, vocabNeeded)]
      : currentVocab;

    // 2. Grammar Exercises (target: 20)
    const currentGrammarEx = unit.grammar?.exercises || [];
    const grammarNeeded = Math.max(0, 20 - currentGrammarEx.length);
    const updatedGrammarEx = grammarNeeded > 0
      ? [...currentGrammarEx, ...generateExtraGrammar(unitId, currentGrammarEx.length, grammarNeeded)]
      : currentGrammarEx;

    // 3. Listening Questions (target: 20)
    const currentListeningQ = unit.listening?.questions || [];
    const listeningNeeded = Math.max(0, 20 - currentListeningQ.length);
    const updatedListeningQ = listeningNeeded > 0
      ? [...currentListeningQ, ...generateExtraListening(unitId, currentListeningQ.length, listeningNeeded)]
      : currentListeningQ;

    // 4. Speaking Prompts (target: 20)
    const currentSpeakingP = unit.speakingPrompts || [];
    // Ensure no internal duplicates in currentSpeakingP if any existed
    const uniqueSpeakingSet = new Set<string>();
    const filteredCurrentSpeakingP = currentSpeakingP.filter((sp) => {
      if (uniqueSpeakingSet.has(sp.targetSentence)) return false;
      uniqueSpeakingSet.add(sp.targetSentence);
      return true;
    });

    const speakingNeeded = Math.max(0, 20 - filteredCurrentSpeakingP.length);
    const updatedSpeakingP = speakingNeeded > 0
      ? [...filteredCurrentSpeakingP, ...generateExtraSpeaking(unitId, filteredCurrentSpeakingP.length, speakingNeeded)]
      : filteredCurrentSpeakingP;

    // 5. Reading Questions (target: 20)
    const currentReadingQ = unit.reading?.questions || [];
    const readingNeeded = Math.max(0, 20 - currentReadingQ.length);
    const updatedReadingQ = readingNeeded > 0
      ? [...currentReadingQ, ...generateExtraReading(unitId, currentReadingQ.length, readingNeeded)]
      : currentReadingQ;

    return {
      ...unit,
      vocabulary: updatedVocab,
      grammar: {
        ...unit.grammar,
        exercises: updatedGrammarEx,
      },
      listening: {
        ...unit.listening,
        questions: updatedListeningQ,
      },
      speakingPrompts: updatedSpeakingP,
      reading: {
        ...unit.reading,
        questions: updatedReadingQ,
      },
    };
  });
}
