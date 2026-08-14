import { MillionaireQuestion } from '../types';

export const MILLIONAIRE_QUESTIONS: MillionaireQuestion[] = [
  {
    id: 1,
    level: 1,
    prize: '200.000 VNĐ',
    question: 'Trong Unit 1 Tiếng Anh 9, từ "handicraft" có nghĩa là gì?',
    options: ['A. Môn thể thao', 'B. Sản phẩm thủ công mỹ nghệ', 'C. Máy vi tính', 'D. Bệnh viện'],
    correctIndex: 1,
    explanation: '"Handicraft" nghĩa là sản phẩm thủ công mỹ nghệ được làm bằng tay.',
    category: 'Vocabulary'
  },
  {
    id: 2,
    level: 2,
    prize: '400.000 VNĐ',
    question: 'Điền cụm động từ thích hợp: "Craft skills are _____ down from grandparents to children."',
    options: ['A. looked', 'B. passed', 'C. turned', 'D. given'],
    correctIndex: 1,
    explanation: '"Pass down" có nghĩa là truyền lại từ thế hệ trước sang thế hệ sau.',
    category: 'Grammar'
  },
  {
    id: 3,
    level: 3,
    prize: '600.000 VNĐ',
    question: 'Dạng so sánh hơn của tính từ ngắn "fast" là gì?',
    options: ['A. More fast', 'B. Fasted', 'C. Faster', 'D. Most fast'],
    correctIndex: 2,
    explanation: 'Tính từ ngắn "fast" thêm đuôi -er thành "faster".',
    category: 'Grammar'
  },
  {
    id: 4,
    level: 4,
    prize: '1.000.000 VNĐ',
    question: 'Từ nào dưới đây chỉ "người nghệ nhân" làm đồ gốm hay dệt lụa?',
    options: ['A. Artisan', 'B. Engineer', 'C. Pilot', 'D. Accountant'],
    correctIndex: 0,
    explanation: '"Artisan" (/ˈɑːtɪzæn/) là nghệ nhân làm các nghề thủ công.',
    category: 'Vocabulary'
  },
  {
    id: 5,
    level: 5,
    prize: '2.000.000 VNĐ',
    question: 'Cấu trúc "S + used to + V-bare" dùng để diễn tả điều gì?',
    options: [
      'A. Lời hứa trong tương lai',
      'B. Thói quen trong quá khứ nay không còn nữa',
      'C. Hành động đang xảy ra lúc nói',
      'D. Sự thật hiển nhiên'
    ],
    correctIndex: 1,
    explanation: '"Used to + V-bare" diễn tả một thói quen hoặc trạng thái từng xảy ra trong quá khứ.',
    category: 'Grammar'
  },
  {
    id: 6,
    level: 6,
    prize: '3.000.000 VNĐ',
    question: 'Di sản thiên nhiên thế giới nào nổi tiếng với hang động đá vôi tráng lệ ở Quảng Bình?',
    options: ['A. Phong Nha - Ke Bang', 'B. Fan Si Pan', 'C. Ba Be Lake', 'D. Cuc Phuong'],
    correctIndex: 0,
    explanation: 'Phong Nha - Kẻ Bàng ở Quảng Bình nổi tiếng thế giới với hệ thống hang động đá vôi.',
    category: 'SGK Culture'
  },
  {
    id: 7,
    level: 7,
    prize: '6.000.000 VNĐ',
    question: 'Khi chuyển câu hỏi Yes/No sang câu tường thuật (Reported Speech), ta dùng từ nối nào?',
    options: ['A. Because', 'B. If hoặc Whether', 'C. So', 'D. Although'],
    correctIndex: 1,
    explanation: 'Câu hỏi Yes/No trong câu tường thuật dùng "if" hoặc "whether" + S + V-past.',
    category: 'Grammar'
  },
  {
    id: 8,
    level: 8,
    prize: '10.000.000 VNĐ',
    question: 'Từ "ecotourism" trong Unit 8 Tiếng Anh 9 có nghĩa là gì?',
    options: ['A. Du lịch vũ trụ', 'B. Du lịch sinh thái', 'C. Du lịch mạo hiểm', 'D. Du lịch mua sắm'],
    correctIndex: 1,
    explanation: '"Ecotourism" là du lịch sinh thái tôn trọng thiên nhiên và môi trường.',
    category: 'Vocabulary'
  },
  {
    id: 9,
    level: 9,
    prize: '14.000.000 VNĐ',
    question: 'Chọn từ đúng cho mệnh đề quan hệ không xác định: "The Amazon Rainforest, _____ lies in South America, produces 20% of Earth oxygen."',
    options: ['A. that', 'B. who', 'C. which', 'D. where'],
    correctIndex: 2,
    explanation: 'Sau dấu phẩy trong mệnh đề quan hệ bổ sung KHÔNG dùng "that", phải dùng "which" cho danh từ chỉ vật.',
    category: 'Grammar'
  },
  {
    id: 10,
    level: 10,
    prize: '22.000.000 VNĐ',
    question: 'Thì Tương lai tiếp diễn (Future Continuous) có công thức cấu trúc là gì?',
    options: [
      'A. S + will + V-bare',
      'B. S + will be + V-ing',
      'C. S + have + V3',
      'D. S + was/were + V-ing'
    ],
    correctIndex: 1,
    explanation: 'Thì Tương lai tiếp diễn có dạng "S + WILL BE + V-ING".',
    category: 'Grammar'
  },
  {
    id: 11,
    level: 11,
    prize: '30.000.000 VNĐ',
    question: 'Thành phố nào của Việt Nam nổi tiếng với làng gốm Bát Tràng nằm ở vùng ngoại ô?',
    options: ['A. Ha Noi', 'B. Da Nang', 'C. Hue', 'D. Can Tho'],
    correctIndex: 0,
    explanation: 'Làng gốm Bát Tràng thuộc huyện Gia Lâm, ngoại thành Hà Nội.',
    category: 'SGK Culture'
  },
  {
    id: 12,
    level: 12,
    prize: '40.000.000 VNĐ',
    question: 'Từ nào có nghĩa là "sự đa dạng sinh học" trong Unit 7 Tiếng Anh 9?',
    options: ['A. Biodiversity', 'B. Biotechnology', 'C. Biography', 'D. Biosphere'],
    correctIndex: 0,
    explanation: '"Biodiversity" (/ˌbaɪəʊdaɪˈvɜːsɪti/) là sự đa dạng sinh học.',
    category: 'Vocabulary'
  },
  {
    id: 13,
    level: 13,
    prize: '60.000.000 VNĐ',
    question: 'Chọn câu điều kiện loại 2 đúng cấu trúc ngữ pháp:',
    options: [
      'A. If I am you, I will buy that book.',
      'B. If I were you, I would study harder for the grade 10 exam.',
      'C. If I will be you, I would buy.',
      'D. If I was you, I will study.'
    ],
    correctIndex: 1,
    explanation: 'Câu điều kiện loại 2: Mệnh đề IF dùng "were" cho mọi ngôi, mệnh đề chính dùng "would + V-bare".',
    category: 'Grammar'
  },
  {
    id: 14,
    level: 14,
    prize: '85.000.000 VNĐ',
    question: 'Khái niệm "lingua franca" trong Unit 9 World Englishes hiểu chính xác là gì?',
    options: [
      'A. Tiếng Pháp cổ đại',
      'B. Ngôn ngữ cầu nối chung được dùng giữa những người khác tiếng mẹ đẻ',
      'C. Tiếng Anh của người Úc',
      'D. Ngôn ngữ ký hiệu'
    ],
    correctIndex: 1,
    explanation: 'Lingua franca là ngôn ngữ cầu nối giao tiếp quốc tế.',
    category: 'Vocabulary'
  },
  {
    id: 15,
    level: 15,
    prize: '150.000.000 VNĐ',
    question: 'Cụm từ "metropolitan" bắt nguồn từ tiếng Hy Lạp mang nghĩa gốc là gì?',
    options: ['A. Thành phố mẹ (Mother city)', 'B. Bãi biển đẹp', 'C. Ngọn núi cao', 'D. Con sông dài'],
    correctIndex: 0,
    explanation: 'Metropolis xuất phát từ "meter" (mẹ) + "polis" (thành phố) -> Thành phố mẹ / Thủ phủ đô thị.',
    category: 'SGK Culture'
  }
];
