const arabicChatExpressions = {
  greetings: [
    { 
      ar: "السلام عليكم", 
      ar_t: "ٱلسَّلَامُ عَلَيْكُمْ", 
      en: "Peace be upon you" 
    },
    { 
      ar: "وعليكم السلام", 
      ar_t: "وَعَلَيْكُمُ ٱلسَّلَامُ", 
      en: "And peace be upon you" 
    },
    { 
      ar: "أهلاً", 
      ar_t: "أَهْلًا", 
      en: "Welcome / Hi" 
    },
    { 
      ar: "مرحبا", 
      ar_t: "مَرْحَبًا", 
      en: "Hello" 
    },
    { 
      ar: "هلا", 
      ar_t: "هَلَا", 
      en: "Hi / Hey" 
    }
  ],

  politeness: [
    { ar: "شكراً", ar_t: "شُكْرًا", en: "Thank you" },
    { ar: "من فضلكِ", ar_t: "مِنْ فَضْلِكِ", en: "Please" }, // feminine
    { ar: "عفواً", ar_t: "عَفْوًا", en: "You’re welcome / Excuse me" }
  ],

  religious: [
    { ar: "إن شاء الله", ar_t: "إِنْ شَاءَ ٱللّٰهُ", en: "God willing" },
    { ar: "الحمد لله", ar_t: "ٱلْـحَمْدُ لِلّٰهِ", en: "Praise be to God" },
    { ar: "ما شاء الله", ar_t: "مَا شَاءَ ٱللّٰهُ", en: "What God has willed" },
    { ar: "الله يبارك", ar_t: "ٱللّٰهُ يُبَارِكُ", en: "May God bless" },
    { ar: "الله يعافيكي", ar_t: "ٱللّٰهُ يُعَافِيكِ", en: "May God grant you health" }, // feminine
    { ar: "آمين يا رب العالمين", ar_t: "آمِينَ يَا رَبَّ ٱلْعَالَمِينَ", en: "Amen, Lord of all worlds" },
    { ar: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ", ar_t: "إِنَّ ٱللّٰهَ مَعَ ٱلصَّابِرِينَ", en: "Indeed, Allah is with the patient" },
    { ar: "اللهم اغفر لي", ar_t: "ٱللَّهُمَّ ٱغْفِرْ لِي", en: "O Allah, forgive me" },
    { ar: "اللهم ارحمني", ar_t: "ٱللَّهُمَّ ٱرْحَمْنِي", en: "O Allah, have mercy on me" },
    { ar: "اللهم ارزقني", ar_t: "ٱللَّهُمَّ ٱرْزُقْنِي", en: "O Allah, grant me sustenance" },
    { ar: "اللهم اشفِ مرضانا", ar_t: "ٱللَّهُمَّ ٱشْفِ مَرْضَانَا", en: "O Allah, heal our sick" },
    { ar: "اللهم وفقنا لما تحب وترضى", ar_t: "ٱللَّهُمَّ وَفِّقْنَا لِمَا تُحِبُّ وَتَرْضَى", en: "O Allah, grant us success in what You love and are pleased with" },
    { ar: "اللهم إني أسألك العفو والعافية", ar_t: "ٱللَّهُمَّ إِنِّي أَسْأَلُكَ ٱلْعَفْوَ وَٱلْعَافِيَةَ", en: "O Allah, I ask You for pardon and well-being" },
    { ar: "اللهم صل وسلم على نبينا محمد", ar_t: "ٱللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ", en: "O Allah, send blessings and peace upon our Prophet Muhammad" },
    { ar: "أستغفر الله", ar_t: "أَسْتَغْفِرُ ٱللّٰهَ", en: "I seek forgiveness from Allah" },
    { ar: "سبحان الله", ar_t: "سُبْحَانَ ٱللّٰهِ", en: "Glory be to Allah" },
    { ar: "لا إله إلا الله", ar_t: "لَا إِلٰهَ إِلَّا ٱللّٰهُ", en: "There is no god but Allah" },
    { ar: "الله أكبر", ar_t: "ٱللّٰهُ أَكْبَرُ", en: "Allah is the Greatest" },
    { ar: "توكلت على الله", ar_t: "تَوَكَّلْتُ عَلَى ٱللّٰهِ", en: "I put my trust in Allah" },
    { ar: "لا حول ولا قوة إلا بالله العلي العظيم", ar_t: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِٱللّٰهِ ٱلْعَلِيِّ ٱلْعَظِيمِ", en: "There is no power nor strength except with Allah, the Most High, the Most Great" },
    { ar: "ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار", ar_t: "رَبَّنَا آتِنَا فِي ٱلدُّنْيَا حَسَنَةً وَفِي ٱلْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ ٱلنَّارِ", en: "Our Lord, give us good in this world and good in the Hereafter and protect us from the punishment of the Fire" },
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
    { ar: "إلى اللقاء", ar_t: "إِلَى ٱللِّقَاءِ", en: "See you later" }
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
    { ar: "طيب", ar_t: "طَيِّبٌ", en: "Okay" }
  ],

  fillers: [
    { ar: "يعني", ar_t: "يَعْنِي", en: "I mean" },
    { ar: "شوي", ar_t: "شُوَيْ", en: "A bit" },
    { ar: "لحظة", ar_t: "لَحْظَةٌ", en: "Wait a moment" }
  ],

  questions: [
    { ar: "كيف حالك؟", ar_t: "كَيْفَ حَالُكَ؟", en: "How are you?" },
    { ar: "ما الأخبار؟", ar_t: "مَا ٱلْأَخْبَارُ؟", en: "What's up?" },
    { ar: "أين أنت؟", ar_t: "أَيْنَ أَنْتَ؟", en: "Where are you?" },
    { ar: "ماذا تفعل؟", ar_t: "مَاذَا تَفْعَلُ؟", en: "What are you doing?" },
    { ar: "كيف كان يومك؟", ar_t: "كَيْفَ كَانَ يَوْمُكَ؟", en: "How was your day?" },
    { ar: "ما رأيك؟", ar_t: "مَا رَأْيُكَ؟", en: "What do you think?" },
    { ar: "لماذا؟", ar_t: "لِمَاذَا؟", en: "Why?" },
    { ar: "متى؟", ar_t: "مَتَى؟", en: "When?" },
    { ar: "أين؟", ar_t: "أَيْنَ؟", en: "Where?" },
    { ar: "مع من؟", ar_t: "مَعَ مَنْ؟", en: "With whom?" },
    { ar: "كم الساعة؟", ar_t: "كَمِ ٱلسَّاعَةُ؟", en: "What time is it?" },
    { ar: "ماذا تريد؟", ar_t: "مَاذَا تُرِيدُ؟", en: "What do you want?" },
    { ar: "ما الجديد؟", ar_t: "مَا ٱلْجَدِيدُ؟", en: "What's new?" },
    { ar: "كيف الطقس اليوم؟", ar_t: "كَيْفَ ٱلطَّقْسُ ٱلْيَوْمَ؟", en: "How's the weather today?" },
    { ar: "ما خططك؟", ar_t: "مَا خُطَطُكَ؟", en: "What are your plans?" },
    { ar: "ماذا أكلت؟", ar_t: "مَاذَا أَكَلْتَ؟", en: "What did you eat?" },
    { ar: "إلى أين ستذهب؟", ar_t: "إِلَى أَيْنَ سَتَذْهَبُ؟", en: "Where will you go?" },
    { ar: "كيف صحتك؟", ar_t: "كَيْفَ صِحَّتُكَ؟", en: "How's your health?" },
    { ar: "ما اسمك؟", ar_t: "مَا ٱسْمُكَ؟", en: "What's your name?" },
    { ar: "من أين أنت؟", ar_t: "مِنْ أَيْنَ أَنْتَ؟", en: "Where are you from?" },
    { ar: "هل لديك وقت؟", ar_t: "هَلْ لَدَيْكَ وَقْتٌ؟", en: "Do you have time?" },
    { ar: "هل تحب القهوة؟", ar_t: "هَلْ تُحِبُّ ٱلْقَهْوَةَ؟", en: "Do you like coffee?" },
    { ar: "ما تخصصك؟", ar_t: "مَا تَخَصُّصُكَ؟", en: "What's your major?" },
    { ar: "ما رأيك في هذا؟", ar_t: "مَا رَأْيُكَ فِي هَذَا؟", en: "What do you think about this?" },
    { ar: "كيف كانت عطلتك؟", ar_t: "كَيْفَ كَانَتْ عُطْلَتُكَ؟", en: "How was your holiday?" },
    { ar: "ماذا ستفعل غداً؟", ar_t: "مَاذَا سَتَفْعَلُ غَدًا؟", en: "What are you doing tomorrow?" },
    { ar: "أين درست؟", ar_t: "أَيْنَ دَرَسْتَ؟", en: "Where did you study?" },
    { ar: "هل لديك إخوة؟", ar_t: "هَلْ لَدَيْكَ إِخْوَةٌ؟", en: "Do you have siblings?" },
    { ar: "هل تحب السفر؟", ar_t: "هَلْ تُحِبُّ ٱلسَّفَرَ؟", en: "Do you like traveling?" },
    { ar: "ما هواياتك؟", ar_t: "مَا هِوَايَاتُكَ؟", en: "What are your hobbies?" }
  ]
};

export default arabicChatExpressions;