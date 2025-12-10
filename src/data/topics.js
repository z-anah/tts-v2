export const topics = {
  1: {
    title: 'Food Vocabulary',
    words: [
      { id: 1, arabic: 'تفاحة', image: '🍎' },
      { id: 2, arabic: 'موز', image: '🍌' },
      { id: 3, arabic: 'برتقال', image: '🍊' },
      { id: 4, arabic: 'عنب', image: '🍇' },
      { id: 5, arabic: 'خبز', image: '🍞' },
      { id: 6, arabic: 'ماء', image: '💧' },
    ],
  },
  2: {
    title: 'Animals',
    words: [
      { id: 1, arabic: 'قط', image: '🐱' },
      { id: 2, arabic: 'كلب', image: '🐕' },
      { id: 3, arabic: 'طائر', image: '🐦' },
      { id: 4, arabic: 'سمكة', image: '🐟' },
      { id: 5, arabic: 'أسد', image: '🦁' },
      { id: 6, arabic: 'فيل', image: '🐘' },
    ],
  },
  3:{
    title: 'Day 1',
    words: [
      { id: 1, arabic: 'باب', image: '🚪' },
      { id: 2, arabic: 'بيت', image: '🏠' },
      { id: 3, arabic: 'خزانة', image: '🗄️' },
      { id: 4, arabic: 'غسالة', image: '🧺' },
      { id: 5, arabic: 'قفل', image: '🔒' },
      { id: 6, arabic: 'مذياع', image: '📻' },
      { id: 7, arabic: 'شمعة', image: '🕯️' },
      { id: 8, arabic: 'هاتف', image: '📱' },
      { id: 9, arabic: 'مفتاح', image: '🗝️' },
      { id: 10, arabic: 'أريكة', image: '🛋️'},
      { id: 11, arabic: 'سرير', image: '🛏️' },
      { id: 12, arabic: 'وسادة', image: '🛏️' },
      { id: 13, arabic: 'ساعة', image: '⏰' },
      { id: 14, arabic: 'نافِذَة / شُبّاك', image: '🪟' },
      { id: 15, arabic: 'مكواة', image: '🧲' },
      { id: 16, arabic: 'كتاب', image: '📖' },
      { id: 17, arabic: 'دفتر', image: '📓' },
      { id: 18, arabic: 'قلم', image: '🖊️' },
      { id: 19, arabic: 'مكتب', image: '🪑' },
      { id: 20, arabic: 'كرسي', image: '🪑' },
      { id: 21, arabic: 'صندوق', image: '📦' },
      { id: 22, arabic: 'مقص', image: '✂️' },
      { id: 23, arabic: 'حاسوب', image: '💻' },
      { id: 24, arabic: 'سبورة', image: '🪟' },
      { id: 25, arabic: 'طاولة', image: '🛋️' },
      { id: 26, arabic: 'دباسة', image: '📎' },
      { id: 27, arabic: 'مبراة', image: '✏️' },
      { id: 28, arabic: 'مسطرة', image: '📏' },
      { id: 29, arabic: 'حقيبة', image: '🎒' },
      { id: 30, arabic: 'كرة', image: '⚽' },
    ],
  },
  // day 2 i learned prepositions of posession, family members, and prepositions of place
  4:{
    title: 'Day 2',
    words: [
      { id: 1, arabic: 'أبي', image: '👨‍🦳' },
      { id: 2, arabic: 'أمي', image: '👩‍🦳' },
      { id: 3, arabic: 'أخ', image: '👦' },
      { id: 4, arabic: 'أخت', image: '👧' },
      { id: 5, arabic: 'جد', image: '👴' },
      { id: 6, arabic: 'جدة', image: '👵' },
      { id: 7, arabic: 'ابن', image: '👦' },
      { id: 8, arabic: 'ابنة', image: '👧' },
      { id: 9, arabic: 'زوج', image: '🤵' },
      { id: 10, arabic: 'زوجة', image: '👰' },

    ],
  }
};

export function getTopicById(id) {
  return topics[id] || null;
}

export function getAllTopics() {
  return Object.entries(topics).map(([id, data]) => ({
    id: Number(id),
    title: data.title,
    path: `/topic/${id}`,
  }));
}
