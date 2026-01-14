// ARABIC FUSHA

const arabicChatExpressions = {
  greetings: [
    { ar: "السلام عليكم", ar_t: "ٱلسَّلَامُ عَلَيْكُمْ", en: "Peace be upon you" },
    { ar: "وعليكم السلام", ar_t: "وَعَلَيْكُمُ ٱلسَّلَامُ", en: "And peace be upon you" },
    {
      ar: "السلام عليكم ورحمة الله وبركاته",
      ar_t: "ٱلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللّٰهِ وَبَرَكَاتُهُ",
      en: "Peace, mercy, and blessings of Allah be upon you"
    },
    {
      ar: "وعليكم السلام ورحمة الله وبركاته",
      ar_t: "وَعَلَيْكُمُ ٱلسَّلَامُ وَرَحْمَةُ ٱللّٰهِ وَبَرَكَاتُهُ",
      en: "And peace, mercy, and blessings of Allah be upon you"
    },
    { ar: "أهلاً", ar_t: "أَهْلًا", en: "Welcome / Hi" },
    { ar: "مرحبا", ar_t: "مَرْحَبًا", en: "Hello" },
    { ar: "هلا", ar_t: "هَلَا", en: "Hi / Hey" },
    { ar: "صباح الخير", ar_t: "صَبَاحُ الْخَيْرِ", en: "Good morning" },
    { ar: "مساء الخير", ar_t: "مَسَاءُ الْخَيْرِ", en: "Good evening" },
    { ar: "نهارك سعيد", ar_t: "نَهَارُكَ سَعِيدٌ", en: "Have a nice day" },
    { ar: "أهلاً وسهلاً", ar_t: "أَهْلًا وَسَهْلًا", en: "Welcome" },
    { ar: "تشرفنا", ar_t: "تَشَرَّفْنَا", en: "Nice to meet you" },
    { ar: "كيف حالك؟", ar_t: "كَيْفَ حَالُكَ؟", en: "How are you?" },
    { ar: "كيف الأمور؟", ar_t: "كَيْفَ الْأُمُورُ؟", en: "How are things?" },
    { ar: "كيف الأحوال؟", ar_t: "كَيْفَ الْأَحْوَالُ؟", en: "How's everything?" },
    { ar: "أهلاً بك", ar_t: "أَهْلًا بِكَ", en: "Welcome to you" },
    { ar: "سعيد بلقائك", ar_t: "سَعِيدٌ بِلِقَائِكَ", en: "Happy to meet you" }
  ],

  politeness: [
    { ar: "شكراً", ar_t: "شُكْرًا", en: "Thank you" },
    { ar: "من فضلكِ", ar_t: "مِنْ فَضْلِكِ", en: "Please" }, // feminine
    { ar: "عفواً", ar_t: "عَفْوًا", en: "You’re welcome / Excuse me" }
  ],

  religious_praise: [
    { ar: "الحمد لله", ar_t: "ٱلْـحَمْدُ لِلّٰهِ", en: "Praise be to God" },
    { ar: "سبحان الله", ar_t: "سُبْحَانَ ٱللّٰهِ", en: "Glory be to Allah" },
    { ar: "ما شاء الله", ar_t: "مَا شَاءَ ٱللّٰهُ", en: "What God has willed" },
    { ar: "لا إله إلا الله", ar_t: "لَا إِلٰهَ إِلَّا ٱللّٰهُ", en: "There is no god but Allah" },
    { ar: "الله أكبر", ar_t: "ٱللّٰهُ أَكْبَرُ", en: "Allah is the Greatest" }
  ],

  religious_prayers: [
    {
      ar: "آمين",
      ar_t: "آمِينَ",
      en: "Amen"
    },
    {
      ar: "آمين يا رب",
      ar_t: "آمِينَ يَا رَبِّ",
      en: "Amen, O Lord"
    },
    {
      ar: "آمين يا رب العالمين",
      ar_t: "آمِينَ يَا رَبَّ ٱلْعَالَمِينَ",
      en: "Amen, Lord of all worlds"
    },
    { ar: "إن شاء الله", ar_t: "إِنْ شَاءَ ٱللّٰهُ", en: "God willing" },
    { ar: "الله يبارك", ar_t: "ٱللّٰهُ يُبَارِكُ", en: "May God bless" },
    { ar: "الله يعافيكي", ar_t: "ٱللّٰهُ يُعَافِيكِ", en: "May God grant you health" }, // feminine
    { ar: "آمين يا رب العالمين", ar_t: "آمِينَ يَا رَبَّ ٱلْعَالَمِينَ", en: "Amen, Lord of all worlds" },
    { ar: "اللهم اغفر لي", ar_t: "ٱللَّهُمَّ ٱغْفِرْ لِي", en: "O Allah, forgive me" },
    { ar: "اللهم ارحمني", ar_t: "ٱللَّهُمَّ ٱرْحَمْنِي", en: "O Allah, have mercy on me" },
    { ar: "اللهم ارزقني", ar_t: "ٱللَّهُمَّ ٱرْزُقْنِي", en: "O Allah, grant me sustenance" },
    { ar: "اللهم اشفِ مرضانا", ar_t: "ٱللَّهُمَّ ٱشْفِ مَرْضَانَا", en: "O Allah, heal our sick" },
    { ar: "اللهم وفقنا لما تحب وترضى", ar_t: "ٱللَّهُمَّ وَفِّقْنَا لِمَا تُحِبُّ وَتَرْضَى", en: "O Allah, grant us success in what You love and are pleased with" },
    { ar: "اللهم إني أسألك العفو والعافية", ar_t: "ٱللَّهُمَّ إِنِّي أَسْأَلُكَ ٱلْعَفْوَ وَٱلْعَافِيَةَ", en: "O Allah, I ask You for pardon and well-being" },
    { ar: "اللهم صل وسلم على نبينا محمد", ar_t: "ٱللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ", en: "O Allah, send blessings and peace upon our Prophet Muhammad" }
  ],

  religious_forgiveness: [
    { ar: "أستغفر الله", ar_t: "أَسْتَغْفِرُ ٱللّٰهَ", en: "I seek forgiveness from Allah" },
    { ar: "توكلت على الله", ar_t: "تَوَكَّلْتُ عَلَى ٱللّٰهِ", en: "I put my trust in Allah" },
    { ar: "لا حول ولا قوة إلا بالله العلي العظيم", ar_t: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِٱللّٰهِ ٱلْعَلِيِّ ٱلْعَظِيمِ", en: "There is no power nor strength except with Allah, the Most High, the Most Great" }
  ],

  religious_quran: [
    { ar: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ", ar_t: "إِنَّ ٱللّٰهَ مَعَ ٱلصَّابِرِينَ", en: "Indeed, Allah is with the patient" },
    { ar: "ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار", ar_t: "رَبَّنَا آتِنَا فِي ٱلدُّنْيَا حَسَنَةً وَفِي ٱلْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ ٱلنَّارِ", en: "Our Lord, give us good in this world and good in the Hereafter and protect us from the punishment of the Fire" },
    { ar: "وَعَسَى أَنْ تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَكُمْ", ar_t: "وَعَسَى أَنْ تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَكُمْ", en: "But perhaps you hate a thing and it is good for you" },
    { ar: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", ar_t: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", en: "Indeed, with hardship comes ease" },
    { ar: "إِنَّ اللَّهَ غَفُورٌ رَحِيمٌ", ar_t: "إِنَّ اللَّهَ غَفُورٌ رَحِيمٌ", en: "Indeed, Allah is Forgiving and Merciful" },
    { ar: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", ar_t: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", en: "For indeed, with hardship [will be] ease" },
    { ar: "اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ", ar_t: "اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ", en: "Allah is the Light of the heavens and the earth" },
    { ar: "وَقُلْ رَبِّ زِدْنِي عِلْمًا", ar_t: "وَقُلْ رَبِّ زِدْنِي عِلْمًا", en: "And say, 'My Lord, increase me in knowledge.'" },
    { ar: "إِنَّ اللَّهَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", ar_t: "إِنَّ اللَّهَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", en: "Indeed, Allah is over all things competent." },
    { ar: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", ar_t: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", en: "Indeed, with hardship comes ease." },
    { ar: "إِنَّ اللَّهَ يُحِبُّ الْمُحْسِنِينَ", ar_t: "إِنَّ اللَّهَ يُحِبُّ الْمُحْسِنِينَ", en: "Indeed, Allah loves the doers of good." },
    { ar: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", ar_t: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", en: "For indeed, with hardship [will be] ease." }
  ],

  religious_protection: [
    { ar: "اللهم ثبت قلبي على دينك", ar_t: "ٱللَّهُمَّ ثَبِّتْ قَلْبِي عَلَى دِينِكَ", en: "O Allah, keep my heart firm on Your religion" },
    { ar: "اللهم إني أعوذ بك من الهم والحزن", ar_t: "ٱللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ ٱلْهَمِّ وَٱلْحَزَنِ", en: "O Allah, I seek refuge in You from worry and grief" },
    { ar: "اللهم إني أعوذ بك من شر ما خلقت", ar_t: "ٱللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا خَلَقْتَ", en: "O Allah, I seek refuge in You from the evil of what You have created" },
    { ar: "اللهم إني أسألك الجنة وأعوذ بك من النار", ar_t: "ٱللَّهُمَّ إِنِّي أَسْأَلُكَ ٱلْجَنَّةَ وَأَعُوذُ بِكَ مِنَ ٱلنَّارِ", en: "O Allah, I ask You for Paradise and seek refuge in You from the Fire" }
  ],

  agreement: [
    { ar: "نعم", ar_t: "نَعَمْ", en: "Yes" },
    { ar: "تمام", ar_t: "تَمَامٌ", en: "Okay / All good" },
    { ar: "صح", ar_t: "صَحْ", en: "Correct" },
  ],

  emotion: [
    { ar: "والله", ar_t: "وَٱللّٰهِ", en: "I swear / Truly" },
    { ar: "يا سلام", ar_t: "يَا سَلَامُ", en: "Wow / Nice" },
    { ar: "حلو", ar_t: "حُلْوٌ", en: "Nice / Sweet" },
    { ar: "جميل", ar_t: "جَمِيلٌ", en: "Beautiful" },
    { ar: "رهيب", ar_t: "رَهِيبٌ", en: "Awesome" }
  ],

  closing: [
    { ar: "مع السلامة", ar_t: "مَعَ ٱلسَّلَامَةِ", en: "Goodbye" },
    { ar: "في أمان الله", ar_t: "فِي أَمَانِ ٱللّٰهِ", en: "In God’s protection" },
    { ar: "إلى اللقاء", ar_t: "إِلَى ٱللِّقَاءِ", en: "See you later" },
    { ar: "أراك لاحقاً", ar_t: "أَرَاكَ لَاحِقًا", en: "See you later" },
    { ar: "أراك قريباً", ar_t: "أَرَاكَ قَرِيبًا", en: "See you soon" },
    { ar: "وداعاً", ar_t: "وَدَاعًا", en: "Farewell" },
    { ar: "تصبح على خير", ar_t: "تُصْبِحُ عَلَى خَيْرٍ", en: "Good night" },
    { ar: "أحلام سعيدة", ar_t: "أَحْلَامٌ سَعِيدَةٌ", en: "Sweet dreams" },
    { ar: "دمت بخير", ar_t: "دُمْتَ بِخَيْرٍ", en: "Stay well" }
  ],

  laughter: [
    { ar: "هه", ar_t: "هَهْ", en: "Heh" },
    { ar: "هههه", ar_t: "هَهَهَ", en: "Haha" },
    { ar: "ههههه", ar_t: "هَهَهَهَ", en: "Hahaha" },
    { ar: "هاها", ar_t: "هَاهَا", en: "Haha" }
  ],

  reactions: [
    { ar: "اوه", ar_t: "أُوهْ", en: "Oh" },
    { ar: "ياااه", ar_t: "يَااَاهْ", en: "Wow" },
    { ar: "عن جد", ar_t: "عَنْ جَدٍّ", en: "Really" },
    { ar: "بجد", ar_t: "بِجَدٍّ", en: "Seriously" }
  ],

  casual: [
    { ar: "ايه", ar_t: "إِيْهْ", en: "Yeah" },
    { ar: "لا", ar_t: "لَا", en: "No" },
    { ar: "خلاص", ar_t: "خَلَاصٌ", en: "Done / Enough" },
    { ar: "طيب", ar_t: "طَيِّبٌ", en: "Okay" },
    { ar: "ماشي", ar_t: "مَاشِي", en: "Alright / Fine" },
    { ar: "تمام", ar_t: "تَمَام", en: "All good / Fine" },
    { ar: "يلا", ar_t: "يَلَّا", en: "Let's go / Come on" },
    { ar: "براحتك", ar_t: "بِرَاحْتَك", en: "As you like / Up to you" },
    { ar: "ولا يهمك", ar_t: "وَلَا يُهِمُّك", en: "Don't worry about it" },
    { ar: "ولا يهمني", ar_t: "وَلَا يُهِمُّنِي", en: "I don't care" },
    { ar: "على راحتك", ar_t: "عَلَى رَاحْتَك", en: "Take your time" },
    { ar: "ولا يهم", ar_t: "وَلَا يَهُم", en: "No worries" },
    { ar: "لا مشكلة", ar_t: "لَا مُشْكِلَةَ", en: "No problem" }
  ],

  fillers: [
    { ar: "يعني", ar_t: "يَعْنِي", en: "I mean" },
    { ar: "شوي", ar_t: "شُوَيْ", en: "A bit" },
    { ar: "لحظة", ar_t: "لَحْظَةٌ", en: "Wait a moment" },
    { ar: "قليلاً", ar_t: "قَلِيلًا", en: "A little / A bit" },
    { ar: "جداً", ar_t: "جِدًّا", en: "Very" },
    { ar: "نوعاً ما", ar_t: "نَوْعًا مَا", en: "Somewhat / Kind of" },
    { ar: "إلى حد ما", ar_t: "إِلَى حَدٍّ مَا", en: "To some extent" },
    { ar: "تقريباً", ar_t: "تَقْرِيبًا", en: "Almost / Nearly" },
    { ar: "فعلاً", ar_t: "فِعْلًا", en: "Really / Indeed" },
    { ar: "حسناً", ar_t: "حَسَنًا", en: "Well / Okay" },
    { ar: "بصراحة", ar_t: "بِصَرَاحَةٍ", en: "Honestly" },
    { ar: "أصلاً", ar_t: "أَصْلًا", en: "Actually / In fact" },
    { ar: "بالمناسبة", ar_t: "بِالْمُنَاسَبَةِ", en: "By the way" },
    { ar: "على فكرة", ar_t: "عَلَى فِكْرَةٍ", en: "By the way" },
    { ar: "بالتأكيد", ar_t: "بِالتَّأْكِيدِ", en: "Certainly / For sure" },
    { ar: "ربما", ar_t: "رُبَّمَا", en: "Maybe / Perhaps" },
    { ar: "أعتقد", ar_t: "أَعْتَقِدُ", en: "I think" },
    { ar: "خلينا نشوف", ar_t: "خَلِّينَا نَشُوف", en: "Let's see" },
    { ar: "بص", ar_t: "بُصّ", en: "Look" },
    { ar: "يعني مثلاً", ar_t: "يَعْنِي مَثَلًا", en: "Like for example" },
    { ar: "شوف", ar_t: "شُوف", en: "See / Look" },
    { ar: "أصلاً", ar_t: "أَصْلًا", en: "Actually" },
    { ar: "المهم", ar_t: "ٱلْمُهِمُّ", en: "Anyway / The important thing" },
    { ar: "على العموم", ar_t: "عَلَى ٱلْعُمُومِ", en: "In general / Anyway" },
    { ar: "بعدين", ar_t: "بَعْدَيْن", en: "Then / Later" },
    { ar: "كذا", ar_t: "كَذَا", en: "Like this / So" }
  ],

  
  questions_health: [
    { ar: "كيف صحتك؟", ar_t: "كَيْفَ صِحَّتُكَ؟", en: "How's your health?" },
    { ar: "كيف حالك؟", ar_t: "كَيْفَ حَالُكَ؟", en: "How are you?" }
  ],

  questions_personal: [
    { ar: "ما اسمك؟", ar_t: "مَا ٱسْمُكَ؟", en: "What's your name?" },
    { ar: "من أين أنت؟", ar_t: "مِنْ أَيْنَ أَنْتَ؟", en: "Where are you from?" },
    { ar: "ما تخصصك؟", ar_t: "مَا تَخَصُّصُكَ؟", en: "What's your major?" },
    { ar: "ما هواياتك؟", ar_t: "مَا هِوَايَاتُكَ؟", en: "What are your hobbies?" },
    { ar: "أين درست؟", ar_t: "أَيْنَ دَرَسْتَ؟", en: "Where did you study?" },
    { ar: "هل لديك إخوة؟", ar_t: "هَلْ لَدَيْكَ إِخْوَةٌ؟", en: "Do you have siblings?" }
  ],

  questions_plans: [
    { ar: "ما خططك؟", ar_t: "مَا خُطَطُكَ؟", en: "What are your plans?" },
    { ar: "ماذا ستفعل غداً؟", ar_t: "مَاذَا سَتَفْعَلُ غَدًا؟", en: "What are you doing tomorrow?" },
    { ar: "إلى أين ستذهب؟", ar_t: "إِلَى أَيْنَ سَتَذْهَبُ؟", en: "Where will you go?" }
  ],

  questions_preferences: [
    { ar: "هل تحب القهوة؟", ar_t: "هَلْ تُحِبُّ ٱلْقَهْوَةَ؟", en: "Do you like coffee?" },
    { ar: "هل تحب السفر؟", ar_t: "هَلْ تُحِبُّ ٱلسَّفَرَ؟", en: "Do you like traveling?" }
  ],

  questions_time: [
    { ar: "كم الساعة؟", ar_t: "كَمِ ٱلسَّاعَةُ؟", en: "What time is it?" },
    { ar: "متى؟", ar_t: "مَتَى؟", en: "When?" }
  ],

  questions_weather: [
    { ar: "كيف الطقس اليوم؟", ar_t: "كَيْفَ ٱلطَّقْسُ ٱلْيَوْمَ؟", en: "How's the weather today?" }
  ],

  questions_general: [
    { ar: "ما الأخبار؟", ar_t: "مَا ٱلْأَخْبَارُ؟", en: "What's up?" },
    { ar: "ما الجديد؟", ar_t: "مَا ٱلْجَدِيدُ؟", en: "What's new?" },
    { ar: "ماذا تفعل؟", ar_t: "مَاذَا تَفْعَلُ؟", en: "What are you doing?" },
    { ar: "ماذا تريد؟", ar_t: "مَاذَا تُرِيدُ؟", en: "What do you want?" },
    { ar: "ماذا أكلت؟", ar_t: "مَاذَا أَكَلْتَ؟", en: "What did you eat?" },
    { ar: "كيف كان يومك؟", ar_t: "كَيْفَ كَانَ يَوْمُكَ؟", en: "How was your day?" },
    { ar: "كيف كانت عطلتك؟", ar_t: "كَيْفَ كَانَتْ عُطْلَتُكَ؟", en: "How was your holiday?" }
  ],

  questions_opinion: [
    { ar: "ما رأيك؟", ar_t: "مَا رَأْيُكَ؟", en: "What do you think?" },
    { ar: "ما رأيك في هذا؟", ar_t: "مَا رَأْيُكَ فِي هَذَا؟", en: "What do you think about this?" }
  ],

  questions_other: [
    { ar: "أين أنت؟", ar_t: "أَيْنَ أَنْتَ؟", en: "Where are you?" },
    { ar: "أين؟", ar_t: "أَيْنَ؟", en: "Where?" },
    { ar: "مع من؟", ar_t: "مَعَ مَنْ؟", en: "With whom?" },
    { ar: "لماذا؟", ar_t: "لِمَاذَا؟", en: "Why?" },
    { ar: "هل لديك وقت؟", ar_t: "هَلْ لَدَيْكَ وَقْتٌ؟", en: "Do you have time?" }
  ],
};

export default arabicChatExpressions;