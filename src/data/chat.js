const arabicChatExpressions = {
  greetings: [
    { ar: "السلام عليكم", en: "Peace be upon you" },
    { ar: "وعليكم السلام", en: "And peace be upon you" },
    { ar: "أهلاً", en: "Welcome / Hi" },
    { ar: "مرحبا", en: "Hello" },
    { ar: "هلا", en: "Hi / Hey" }
  ],

  politeness: [
    { ar: "شكراً", en: "Thank you" },
    { ar: "من فضلكِ", en: "Please" }, // feminine
    { ar: "عفواً", en: "You’re welcome / Excuse me" }
  ],

  religious: [
    { ar: "إن شاء الله", en: "God willing" },
    { ar: "الحمد لله", en: "Praise be to God" },
    { ar: "ما شاء الله", en: "What God has willed" },
    { ar: "الله يبارك", en: "May God bless" },
    { ar: "الله يعافيكي", en: "May God grant you health" }, // feminine
    { ar: "آمين يا رب العالمين", en: "Amen, Lord of all worlds" },
    { ar: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ", en: "Indeed, Allah is with the patient" },
    { ar: "اللهم اغفر لي", en: "O Allah, forgive me" },
    { ar: "اللهم ارحمني", en: "O Allah, have mercy on me" },
    { ar: "اللهم ارزقني", en: "O Allah, grant me sustenance" },
    { ar: "اللهم اشفِ مرضانا", en: "O Allah, heal our sick" },
    { ar: "اللهم وفقنا لما تحب وترضى", en: "O Allah, grant us success in what You love and are pleased with" },
    { ar: "اللهم إني أسألك العفو والعافية", en: "O Allah, I ask You for pardon and well-being" },
    { ar: "اللهم صل وسلم على نبينا محمد", en: "O Allah, send blessings and peace upon our Prophet Muhammad" },
    { ar: "أستغفر الله", en: "I seek forgiveness from Allah" },
    { ar: "سبحان الله", en: "Glory be to Allah" },
    { ar: "لا إله إلا الله", en: "There is no god but Allah" },
    { ar: "الله أكبر", en: "Allah is the Greatest" },
    { ar: "توكلت على الله", en: "I put my trust in Allah" },
    { ar: "لا حول ولا قوة إلا بالله العلي العظيم", en: "There is no power nor strength except with Allah, the Most High, the Most Great" },
    { ar: "ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار", en: "Our Lord, give us good in this world and good in the Hereafter and protect us from the punishment of the Fire" },
    { ar: "اللهم ثبت قلبي على دينك", en: "O Allah, keep my heart firm on Your religion" },
    { ar: "اللهم إني أعوذ بك من الهم والحزن", en: "O Allah, I seek refuge in You from worry and grief" },
    { ar: "اللهم إني أعوذ بك من شر ما خلقت", en: "O Allah, I seek refuge in You from the evil of what You have created" },
    { ar: "اللهم إني أسألك الجنة وأعوذ بك من النار", en: "O Allah, I ask You for Paradise and seek refuge in You from the Fire" }
  ],

  agreement: [
    { ar: "نعم", en: "Yes" },
    { ar: "تمام", en: "Okay / All good" },
    { ar: "صح", en: "Correct" },
  ],

  emotion: [
    { ar: "والله", en: "I swear / Truly" },
    { ar: "يا سلام", en: "Wow / Nice" },
    { ar: "حلو", en: "Nice / Sweet" },
    { ar: "جميل", en: "Beautiful" },
    { ar: "رهيب", en: "Awesome" }
  ],

  closing: [
    { ar: "مع السلامة", en: "Goodbye" },
    { ar: "في أمان الله", en: "In God’s protection" },
    { ar: "إلى اللقاء", en: "See you later" }
  ],

  laughter: [
    { ar: "هه", en: "Heh" },
    { ar: "هههه", en: "Haha" },
    { ar: "ههههه", en: "Hahaha" },
    { ar: "هاها", en: "Haha" }
  ],

  reactions: [
    { ar: "اوه", en: "Oh" },
    { ar: "ياااه", en: "Wow" },
    { ar: "عن جد", en: "Really" },
    { ar: "بجد", en: "Seriously" }
  ],

  casual: [
    { ar: "ايه", en: "Yeah" },
    { ar: "لا", en: "No" },
    { ar: "خلاص", en: "Done / Enough" },
    { ar: "طيب", en: "Okay" }
  ],

  fillers: [
    { ar: "يعني", en: "I mean" },
    { ar: "شوي", en: "A bit" },
    { ar: "لحظة", en: "Wait a moment" }
  ],

  questions: [
    { ar: "كيف حالك؟", en: "How are you?" },
    { ar: "ما الأخبار؟", en: "What's up?" },
    { ar: "أين أنت؟", en: "Where are you?" },
    { ar: "ماذا تفعل؟", en: "What are you doing?" },
    { ar: "كيف كان يومك؟", en: "How was your day?" },
    { ar: "ما رأيك؟", en: "What do you think?" },
    { ar: "لماذا؟", en: "Why?" },
    { ar: "متى؟", en: "When?" },
    { ar: "أين؟", en: "Where?" },
    { ar: "مع من؟", en: "With whom?" },
    { ar: "كم الساعة؟", en: "What time is it?" },
    { ar: "ماذا تريد؟", en: "What do you want?" },
    { ar: "ما الجديد؟", en: "What's new?" },
    { ar: "كيف الطقس اليوم؟", en: "How's the weather today?" },
    { ar: "ما خططك؟", en: "What are your plans?" },
    { ar: "ماذا أكلت؟", en: "What did you eat?" },
    { ar: "إلى أين ستذهب؟", en: "Where will you go?" },
    { ar: "كيف صحتك؟", en: "How's your health?" },
    { ar: "ما اسمك؟", en: "What's your name?" },
    { ar: "من أين أنت؟", en: "Where are you from?" },
    { ar: "هل لديك وقت؟", en: "Do you have time?" },
    { ar: "هل تحب القهوة؟", en: "Do you like coffee?" },
    { ar: "ما تخصصك؟", en: "What's your major?" },
    { ar: "ما رأيك في هذا؟", en: "What do you think about this?" },
    { ar: "كيف كانت عطلتك؟", en: "How was your holiday?" },
    { ar: "ماذا ستفعل غداً؟", en: "What are you doing tomorrow?" },
    { ar: "أين درست؟", en: "Where did you study?" },
    { ar: "هل لديك إخوة؟", en: "Do you have siblings?" },
    { ar: "هل تحب السفر؟", en: "Do you like traveling?" },
    { ar: "ما هواياتك؟", en: "What are your hobbies?" }
  ]
};

export default arabicChatExpressions;