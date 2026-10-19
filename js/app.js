'use strict';
const WA = '251970752729';
/* iOS < 15.4 has no <dialog>.showModal(): small fallback */
document.querySelectorAll('dialog').forEach(d => { if (typeof d.showModal !== 'function') { d.showModal = function () { this.setAttribute('open', ''); }; d.close = function () { if (!this.hasAttribute('open')) return; this.removeAttribute('open'); this.dispatchEvent(new Event('close')); }; } });
const T = (en, am) => `<span class="en">${en}</span><span class="am">${am}</span>`;

const BOOKS = [
 {id:'hidu', cat:'life', en:'Go!', am:'ሂዱ', price:350, isNew:true, bg:'#000', fit:'contain',
  sub:['God, the God of the mission','እግዚአብሔር የተልዕኮ አምላክ'],
  short:['A mission guide: it is not the road you take but where you are sent and why it matters.','ዋናው የሚሄዱበት ቦታና ዓላማ እንጂ መንገዱ አይደለም።'],
  desc:['Built on our Lord Jesus Christ’s command “Go, go”, this book unveils deep spiritual truth about how believers must follow God’s leading and command when they go out on the Gospel mission. Among the many journeys and methods used to carry the Gospel today, the focus is on where you go and the purpose you reach, not on the road you take. A remarkable guide to the apostolic mission.',
        '«ሂዱ ሂዱ» በሚለው የጌታችን የኢየሱስ ክርስቶስ የተልዕኮ ትእዛዝ ላይ የተመሠረተው ይህ መጽሐፍ፤ አማኞች ለወንጌል ተልዕኮ በሚሰማሩበት ጊዜ የእግዚአብሔርን መሪነትና ትእዛዝ እንዴት መከተል እንዳለባቸው ጥልቅ መንፈሳዊ እውነትን ይገልጣል። በዘመናችን ወንጌልን ለማድረስ በሚከናወኑ ልዩ ልዩ የጉዞ መንገዶችና ዘዴዎች ውስጥ፣ ዋናው ትኩረት የሚሄዱበት ቦታና የሚደርሱበት ዓላማ (ተልዕኮው) እንጂ የሚሄዱበት መንገድ አለመሆኑን የሚያብራራ ድንቅ የሐዋርያዊ ተልዕኮ መመሪያ ነው።']},
 {id:'gize', cat:'life', en:'Time', am:'ጊዜ', price:350, bg:'#fff', fit:'contain',
  sub:['Time, the precious treasure','የከበረ ሀብት'],
  short:['Time is life’s most precious, irreplaceable treasure. Use what remains with wisdom.','ጊዜ በፍጹም የማይተካ ውድ ሀብት ነው፤ የቀረንን በጥበብ እንድንጠቀም ያስተምራል።'],
  desc:['Time is the most precious, irreplaceable treasure in life. Knowing we live among life’s struggles and responsibilities, this book teaches us to use the time we have left with wisdom, understanding and responsibility, and so avoid the regret and the heavy price that come from wasting it.',
        'ጊዜ በፍጹም የማይተካ እጅግ ውድ የሕይወት ሀብት በመሆኑ፣ በሕይወት ውጣ ውረድና አላፊነት ውስጥ እንዳለን ተረድተን፣ የቀረንን ጊዜ በጥበብ፣ በማስተዋልና በኃላፊነት በመጠቀም የሚመጣብንን ተጸጽቶና ውድ ዋጋ የመክፈል መዘዝ ማስቀረት እንዳለብን የሚያስተምር ነው።']},
 {id:'porni', cat:'free', en:'Freedom from Pornography', am:'ፖርኒ-ግራፊ', price:150, bg:'#fff', fit:'contain',
  sub:['How can you break free from the addiction?','እንዴት ከፖርኖግራፊ ሱስ መላቀቅ ይቻላል'],
  short:['The real scale of the danger and the path out. Face the truth and walk free.','የአደጋው ስፋትና የመፍትሔው መንገድ። እውነትን ተጋፍጠው ነጻ ይውጡ።'],
  desc:['Many dismiss pornography addiction as “harmless”, but it is as vast as an ocean and quietly kills a life. Making light of it and deceiving yourself comes at a price. By facing the facts and understanding the depth of the danger, you can walk completely free of this dark bondage and live a healthy life.',
        'ከፖርኖግራፊ ሱስ መላቀቅ፡ የአደጋው ስፋትና የመፍትሔው መንገድ። ብዙዎች የፖርኖግራፊን ሱስ "ጉዳት የለውም" በማለት በንቀት ቢመለከቱትም፣ ሱስ አደገኛነቱ ከሰፊ ውቅያኖስ ጋር የሚመሳሰልና ሕይወትን በጸጥታ የሚገድል ከባድ ፈተና ነው። ችግሩን አቅልሎ ማየትና ራስን ማታለል ዋጋ ያስከፍላል፤ በመሆኑም እውነታውን በመጋፈጥና ጥልቁን አደጋ በመረዳት ከዚህ የጨለመ እስራት ሙሉ በሙሉ ነፃ መውጣትና ጤናማ ሕይወት መምራት ይቻላል።']},
 {id:'tefewes', cat:'free', en:'Healed', am:'ተፈወሰ', price:250, bg:'#fff', fit:'contain',
  sub:['From sickness, pain and disease','ከበሽታ፣ ከህመም፣ ከደዌ'],
  short:['A message of healing and faith: free from sin, sickness and poverty through Christ.','የፈውስና የእምነት መልእክት፤ በክርስቶስ ከኃጢአት፣ ከህመምና ከድህነት ነጻ መውጣት።'],
  desc:['A message of healing and faith: through the sacrifice paid on the cross of Christ Jesus, we can be set free from sin, sickness and every yoke of poverty, and live a life of full health and victory.',
        'በክርስቶስ ኢየሱስ መስቀል ላይ በተከፈለው መስዋዕትነት ከኃጢአት፣ ከህመም እና ከማንኛውም የድህነት ቀንበር ነፃ ወጥተን ፍጹም ጤና እና የድል ህይወት መኖር እንደምንችል የሚያስተምር የፈውስና የእምነት መልዕክት ነው።']},
 {id:'lewt', cat:'life', en:'Change', am:'ለውጥ', price:400, bg:'#403a2e', fit:'cover',
  sub:['Do not conform. Be transformed.','አትምሰሉ፣ ተለወጡ እንጂ'],
  short:['Break old mindsets, find peace of mind and live in God’s will. A map for real change.','የቆዩ አስተሳሰቦችን ሰብረው በእግዚአብሔር ፈቃድ ይኑሩ። የለውጥ ካርታ።'],
  desc:['How to break old, unhelpful chains of thought. The wisdom of finding peace of mind and spiritual strength. The secret of living in God’s will, free of outside pressure. “Do not conform… be transformed!” This book is a map of change, made not only to be read but to bring practical change to your life.',
        'የቆዩና የማይጠቅሙ የአስተሳሰብ ሰንሰለቶችን እንዴት መስበር እንደሚቻል፤ የአእምሮ ሰላምንና መንፈሳዊ ጥንካሬን የማግኘት ጥበብ፤ ከውጫዊ ተፅዕኖ ወጥቶ በእግዚአብሔር ፈቃድ ውስጥ የመኖር ሚስጥር። "አትምሰሉ... ተለወጡ እንጂ!" ይህ መጽሐፍ እንዲነበብ ብቻ ሳይሆን ህይወትህ ላይ ተግባራዊ ለውጥ እንዲያመጣ ተደርጎ የተዘጋጀ የለውጥ ካርታ ነው።']},
 {id:'mintayalehu', cat:'life', en:'What Do You See?', am:'ምን ታያለህ', price:350, bg:'#d0d0d1', fit:'cover',
  sub:['Seeing by faith','በእምነት ማየት'],
  short:['We reach only as far as we can see by faith. Write your God-given vision and declare it.','በእምነት ማየት እስከቻልነው ርቀት ድረስ እንደርሳለን፤ ራዕይዎን ጽፈው ያውጁ።'],
  desc:['Our lives can only reach as far as we can see by faith. God’s thoughts toward us are of peace, hope and a good end, not evil. We should write down the hope we have seen and desired, and declare it over our lives by faith. As God told Jeremiah, “You have seen well”, so He is faithful to fulfil the good we see by faith.',
        'ሕይወታችን ልንደርስበት የምንችለው በእምነት ማየት እስከቻልንበት ርቀት ድረስ ብቻ ነው። እግዚአብሔር ስለ እኛ ያለው አሳብ የሰላም፣ የተስፋና የመልካም ፍጻሜ እንጂ የክፉ አይደለም። ያየነውንና የተመኘነውን ተስፋ በወረቀት ላይ ጽፎ በሕይወታችን ላይ በዕምነት ማወጅ ይገባል። እግዚአብሔር ኤርምያስን «መልካም አይተሃል» እንዳለው፣ በእምነት ያየነውን መልካም ነገር ሊፈጽም እሱ የታመነ ነው።']},
 {id:'ketlo', cat:'life', en:'What Next?', am:'ቀጥሎ ምን ላድርግ', price:200, bg:'#fff', fit:'contain',
  sub:['Fear God and keep His commands','እግዚአብሔርን ፍራ ትእዛዙንም ፈጽም'],
  short:['Wealth, power, fame: all vanity without God. Read what to do next.','ሀብት፣ ስልጣንና ዝና ያለ እግዚአብሔር ከንቱ ናቸው። ቀጥሎ ምን እንደሚደረግ ያንብቡ።'],
  desc:['What I have read, I share. Even if we have everything in life (wealth, power, knowledge, fame, strength, honour, happiness), all of it is vanity of vanities. So what should you do next? On the road and in everything you do, fear God and keep His commands. This alone is not vanity, not chasing the wind. Get the book and read what to do next.',
        'ካነበብኩት ላካፍላችሁ፤ በሕይወታችን ሁሉም ነገር ኖሮን ለምሳሌ ሀብት ስልጣን እውቀት ታዋቂ ብንሆን ሀይል ቢኖረን ክብር ቢኖረን ደስታ ቢኖረን #ይሄ_ሁሉ_ከንቱ_የከንቱ_ከንቱ_ነው! ታድያ ቀጥሎ ምን ማድረግ እንዳለቦ ልንገርዎ፤ በመንገድ በምታደርገው ነገር ሁሉ እግዚአብሔርን ፍራ ትእዛዙንም ፈጽም። ይህ ብቻ ነው የከንቱ ከንቱ ያልሆነው፣ ንፋስን እንደመከተል ያልሆነው። ቀጥሎ ምን ማድረግ እንዳለባችሁ ገዝታችሁ አንብቡ።']},
 {id:'takach', cat:'life', en:'The Lazy Person', am:'ታካች ሰው', price:250, bg:'#fff', fit:'contain',
  sub:null,
  short:['A clean, beautiful place points to a diligent person. A lazy one’s home is known by its mess.','ንጹህና ውብ ቦታ ትጉህ ሰው እንዳለ ያሳያል፤ የታካች ቤት በመዝረክረክ ይታወቃል።'],
  desc:['When you see a clean and beautiful place, it is a sign that a diligent person lives nearby. The home of a lazy person, however, is known by its disorder and dirt. This book calls you to a life of diligence.',
        'ታካች ሰው ንፁህ እና ውብ ቦታ ከተመለከታችሁ እዛ አካባቢ አንድ ትጉህ ሰው እነዳለ የሚናገር ምልክት ነው። የታካች ሰው ቤት ግን በመዝረክረክ እና በቆሻሻ ይታወቃል።']},
 {id:'lijihn', cat:'life', en:'Rescue Your Child', am:'ልጅህን ታደግ', price:300, bg:'#000', fit:'contain',
  sub:null,
  short:['Protect children from worldly pressure by planting God’s Word in their hearts.','የእግዚአብሔርን ቃል በልባቸው በመትከል ልጆችን ከዓለማዊ ተጽዕኖ ይታደጉ።'],
  desc:['Children are rescued from worldly pressure by planting God’s Word in their hearts. In daily life, at home and on the road, we must teach and recall the Word. Parents must raise their children in the Lord’s counsel and discipline, without provoking or frightening them. Discipline joined with love and patience leads children onto a good path. Children follow what they see more than what they hear, so parents must be a good example in their own lives. The good way set in them in childhood will not leave them all their days.',
        'ልጆችን ከዓለማዊ ተጽዕኖ መታደግ የሚቻለው የእግዚአብሔርን ቃል በልባቸው በመትከል ነው። በዕለት ተዕለት ሕይወታችን፣ በቤት ውስጥም ሆነ በመንገድ ላይ ቃሉን ማስተማርና ማስታወስ ይገባናል። ወላጆች ልጆቻቸውን ሳያበሳጩ ወይም ሳያስፈራሩ በጌታ ምክርና ገሥጸት ማሳደግ አለባቸው። ሥነ-ሥርዓት ከፍቅርና ከትዕግሥት ጋር ሲጣመር ልጆች በበጎ ጎዳና ይመራሉ። ልጆች የሚሰሙትን ብቻ ሳይሆን የሚያዩትን ስለሚከተሉ፣ ወላጆች በራሳቸው ሕይወት መልካም ምሳሌ መሆን አለባቸው። በሕፃንነታቸው የተቀረጹበት በጎ መንገድ በእድሜያቸው ሁሉ አይለያቸውም።']},
{"id": "ergman", "en": "Breaking the Power of Curses", "am": "የእርግማንን ኃይል መስበር", "price": 300, "isNew": true, "frame": true, "cat": "free", "sub": ["A call to freedom: be free from the power of the curse", "የነፃነት ጥሪ — ከእርግማን ኃይል ነፃ ውጣ"], "short": ["Stuck in a cycle of failure? Learn the divine laws that set a believer free from every curse.", "በህይወትህ ውስጥ የማይቀየር የውድቀት አዙሪት አጋጥሞሃል? አማኝ ከእርግማን ነፃ የሚወጣበትን መለኮታዊ ህግጋት ተማር።"], "desc": ["Have you met a cycle of failure, or some barrier in your life that never seems to change? This book plainly explains the causes of curses, the secrets of how they work, and the divine laws by which a believer is set free from them.", "በህይወትህ ውስጥ የማይቀየር የውድቀት አዙሪት ወይም አንዳች እንቅፋት አጋጥሞሃል? ይህ መጽሐፍ የእርግማንን መንስኤዎች፣ የአሰራር ምስጢራት እና አማኝ ከእርግማን ነፃ የሚወጣበትን መለኮታዊ ህግጋት በግልጽ ያብራራል።"], "listTitle": ["Inside the book", "በመጽሐፉ ውስጥ"], "list": [["The doors that let a curse in, and their solutions", "የእርግማን መግቢያ በሮች እና መፍትሔዎቻቸው"], ["Can a believer fall under a curse?", "አማኝ በእርግማን ስር ሊወድቅ ይችላል?"], ["The secret of establishing blessing in your life", "በረከትን በህይወትህ የማጽናት ምስጢር"]], "close": ["Be free from every cycle of bondage and establish your blessing!", "ከማንኛውም የእስራት አዙሪት ነፃ ወጥተህ በረከትህን አጽና!"]},
{"id": "tsom", "en": "Develop a Life of Fasting and Prayer", "am": "የጾም ጸሎት ህይወት አዳብር", "price": 250, "isNew": true, "frame": true, "cat": "prayer", "sub": ["“We fast often, so why does our life not change?”", "«ብዙ እንጾማለን፤ ነገር ግን ለምን ሕይወታችን አይቀየርም?»"], "short": ["A practical manual that lifts fasting out of habit into real spiritual depth and visible fruit.", "ጾምን ከባህላዊ ልማድነት ወደ እውነተኛ የመንፈስ ጥልቀትና ወደ ተገለጠ የሕይወት ፍሬ የሚያሸጋግር ተግባራዊ ማኑዋል።"], "desc": ["Many of us think of fasting only as hunger and outward rules. But the true, biblical secret of fasting goes beyond an empty stomach: it is a spiritual key that renews the inner person, brings mental clarity and releases great spiritual power. This book lifts fasting out of cultural habit into real spiritual depth and visible fruit in life.", "ብዙዎቻችን ጾምን የምናስበው በረሃብና በውጫዊ የሕግጋት ቅጽር ውስጥ ብቻ ነው። ሆኖም ግን መጽሐፍ ቅዱሳዊውና እውነተኛው የጾም ምስጢር ከሆድ መራብ ያለፈ፣ የውስጥ ማንነትን የሚያድስ፣ የአእምሮ ጥራትን የሚያመጣና ታላቅ የመንፈስ ኃይልን የሚያስለቅቅ መንፈሳዊ ቁልፍ ነው። ይህ መጽሐፍ ጾምን ከባህላዊ ልማድነት አውጥተህ ወደ እውነተኛ የመንፈስ ጥልቀትና ወደ ተገለጠ የሕይወት ፍሬ እንድትሸጋገር የሚያስችል ተግባራዊ ማኑዋል ነው።"], "listTitle": ["What you will find in depth", "በጥልቅ የሚያገኙት"], "list": [["The 9 types of fasts in the Bible and their sets of days", "በመጽሐፍ ቅዱስ የተገለጹት 9ኙ የጾም ዓይነቶችና የቀናት ስብስብ"], ["The spiritual, mental and physical (autophagy) fruits of fasting", "የጾም መንፈሳዊ፣ አእምሮአዊና አካላዊ (Autophagy) ፍሬዎች"], ["The cautions of heart and conscience before a fast", "ከጾም በፊት ሊደረጉ የሚገባቸው የልብና የሕሊና ጥንቃቄዎች"], ["How to guard and sustain the spiritual victory after a fast", "ከጾም በኋላ የተቀበሉትን መንፈሳዊ ድል የመጠበቂያና የማስቀጠያ ጥበቦች"]], "close": ["Not for reading only: a guide made for practical life renewal!", "ይህ መጽሐፍ ለንባብ ብቻ ሳይሆን፣ ለተግባራዊ የሕይወት መታደስ የተዘጋጀ መመሪያ ነው!"]},
{"id": "tselot", "en": "How to Grow My Prayer Life", "am": "እንዴት የጸሎት ህይወቴን ላሳድግ", "price": 300, "isNew": true, "frame": true, "cat": "prayer", "sub": ["A practical guide into a deep prayer life", "ወደ ጥልቅ የጸሎት ህይወት ልምምድ የሚያሸጋግር ተግባራዊ መምሪያ"], "short": ["Build your prayer life on a firm foundation with this new practical guide.", "የጸሎት ህይወትዎን በፅኑ መሰረት ላይ ለመገንባት የሚረዳ አዲስ መጽሐፍ።"], "desc": ["Do you long to practise a deep prayer life? The new book to help you build your prayer life on a firm foundation is now on the market: “How to Grow My Prayer Life”.", "ጥልቅ የጸሎት ህይወትን የመለማመድ ፍላጎት አለዎት? የጸሎት ህይወትዎን በፅኑ መሰረት ላይ ለመገንባት የሚረዳዎት አዲሱ መጽሐፍ አሁን በገበያ ላይ ውሏል። «እንዴት የጸሎት ህይወቴን ላሳድግ»"]},
{"id": "study", "en": "Studying and Interpreting the Bible", "am": "መጽሐፍ ቅዱስን ማጥናት እና መተርጎም", "price": 300, "isNew": true, "frame": true, "cat": "bible", "sub": ["“What does this passage mean, and how do I live it?”", "«ይህ ክፍል ምን ማለቱ ነው? እንዴትስ በሕይወቴ እተግብረዋለሁ?»"], "short": ["A practical guide using the OIA and SOAP methods to understand Scripture for yourself.", "የ OIA እና የ SOAP ዘዴዎችን በመጠቀም መጽሐፍ ቅዱስን በግልዎ ለመረዳት የሚያስችል ተግባራዊ መመሪያ።"], "desc": ["Does the question “What does this passage mean, and how do I apply it to my life?” challenge you when you read the Bible? This is a practical guide that uses the OIA (Observation, Interpretation, Application) and SOAP methods to help you understand the historical and spiritual depth of Scripture for yourself.", "መጽሐፍ ቅዱስን በሚያነቡበት ጊዜ «ይህ ክፍል ምን ማለቱ ነው? እንዴትስ በሕይወቴ እተግብረዋለሁ?» የሚል ጥያቄ ተፈታታኝ ሆኖብዎታል? ይህ መጽሐፍ የ OIA (ምልከታ፣ ትርጓሜ፣ ትግበራ) እና የ SOAP ዘዴዎችን በመጠቀም የመጽሐፍ ቅዱስን ታሪካዊና መንፈሳዊ ጥልቀት በግልዎ እንዲረዱ የሚያስችል ተግባራዊ መመሪያ ነው።"], "listTitle": ["Who is this book for?", "ይህ መጽሐፍ ለማን የተዘጋጀ ነው?"], "list": [["Believers who want deep, personal Bible study", "ጥልቅ የሆነ የግል የመጽሐፍ ቅዱስ ጥናት ማድረግ ለሚፈልጉ አማኞች"], ["Sunday school teachers and ministry leaders", "የሰንበት ትምህርት ቤት አስተማሪዎችና የአገልግሎት መሪዎች"], ["Anyone who wants to learn the principles of Bible interpretation (Hermeneutics) in a simple way", "የመጽሐፍ ቅዱስ አተረጓጎም (Hermeneutics) መርሆችን በቀላል መንገድ መማር የሚፈልጉ"]]},
{"id": "dreams", "en": "100 Dreams and Their Biblical Meanings", "am": "100 ሕልሞች እና መጽሐፍ ቅዱሳዊ ፍቺዎቻቸው", "price": 400, "isNew": true, "frame": true, "cat": "bible", "sub": ["Every dream may carry a message from God", "እያንዳንዱ ሕልም ከእግዚአብሔር የተላከ መልእክት አለው"], "short": ["100 dream symbols explained through Scripture and culture, so you can read your night visions with wisdom.", "100 የሕልም ምልክቶች በመጽሐፍ ቅዱስና በባህላዊ እውቀት ተተንትነዋል።"], "desc": ["Pause and think: what did you dream in the last few days? Do the strange things seen in the world of sleep, the hidden signs and the meanings of numbers look like empty dreams? Not at all! Every dream carries a message from God, a warning, or an announcement of blessing. After long spiritual study and research, Evangelist Eyosias Girma (Eyu) brings you this unique, life-changing manual.", "እስቲ ቆም ብለው ያስቡ... ባለፉት ጥቂት ቀናት ውስጥ ምን አይነት ሕልም አዩ? በእንቅልፍ ዓለም ውስጥ የሚታዩት እንግዳ ነገሮች፣ የተደበቁ ምልክቶች እና የቁጥር ፍቺዎች ከንቱ ሕልሞች ይመስሉዎታል? ፈጽሞ አይደለም! እያንዳንዱ ሕልም ከእግዚአብሔር የተላከ መልእክት፣ ማስጠንቀቂያ ወይም የበረከት ማብሰሪያ አለው። ኢቫንጀሊስት ኢዮሲያስ ግርማ (ኢዩ) ከረጅም መንፈሳዊ ጥናትና ምርምር በኋላ «100 ሕልሞች እና መጽሐፍ ቅዱሳዊ ፍቺዎቻቸው» የተሰኘውን ይህን ልዩ እና ሕይወትን የሚቀይር ማኑዋል ይዞልዎ መጥቷል!"], "listTitle": ["What you will find", "የሚያገኙት"], "list": [["An analysis of 100 striking dream symbols, such as fire, thief, the dead and land", "እንደ እሳት፣ ሌባ፣ ሙታን እና መሬት ያሉ 100 አስገራሚ የሕልም ምልክቶች ትንታኔ"], ["The one guide to understanding your dream alongside the Bible and cultural knowledge", "ሕልምዎን ከመጽሐፍ ቅዱስ እና ከባህላዊ እውቀት ጋር አጣጥሞ መረዳት የሚያስችል ብቸኛ መመሪያ"], ["A heavenly solution for lost peace, a closed door of blessing and a cleansed conscience", "የጠፋውን ሰላም፣ የተዘጋውን የበረከት በር እና የህሊና ጽዳት የሚያሳይ ሰማያዊ መፍትሔ"]], "close": ["This book helps you understand your night visions, stay clear of coming trials and lead your life by God’s wisdom!", "ይህ መጽሐፍ የሌሊት ራዕይዎን እንዲረዱ፣ ከሚመጡ ፈተናዎች ራቅ እንዲሉ እና ሕይወትዎን በእግዚአብሔር ጥበብ እንዲመሩ ያደርጋል!"]},
{"id": "telegram", "en": "Studying the Bible on Telegram", "am": "መጽሐፍ ቅዱስን በቴሌግራም የማጥናት ጥበብና መምሪያ", "price": 800, "isNew": true, "frame": true, "cat": "bible", "sub": ["A complete guide and training for small groups", "አጠቃላይ መምሪያ እና ስልጠና"], "short": ["A step-by-step guide to using Telegram to start a living, effective Bible study group.", "ቴሌግራምን ተጠቅሞ ሕያውና ውጤታማ የመጽሐፍ ቅዱስ ጥናት ቡድን ለማደራጀት ደረጃ በደረጃ የሚመራ መምሪያ።"], "desc": ["Do you want to use technology to advance God’s kingdom? Distance, time and borders could not stop the apostles’ spoken teaching, and today, in the digital age, God’s Word keeps changing hearts. This guide shows you step by step how to use Telegram, the largest social platform of our time, to organise a deep, living and effective Bible study group. It equips you to lead small groups, bind members together in one spirit, and wisely pass through the challenges that arise in discussion.", "ቴክኖሎጂን ለእግዚአብሔር መንግሥት ማስፋፊያ ማድረግ ይፈልጋሉ? ርቀት, ሰዓት እና ድንበር የሐዋርያትን የቃል ትምህርት ሊያቆሙ አልቻሉም፤ ዛሬም በዲጂታል ዘመን የእግዚአብሔር ቃል ልቦችን መለወጡን ቀጥሏል። ይህ መጽሐፍ/መምሪያ በዘመናችን ትልቁን የማህበራዊ ግንኙነት መድረክ—ቴሌግራምን—ተጠቅመው እንዴት ጥልቅ፣ ሕያው እና ውጤታማ የሆነ የመጽሐፍ ቅዱስ ጥናት ቡድን ማደራጀት እንደሚችሉ ደረጃ በደረጃ የሚያሳይ አቅጣጫ ይሰጥዎታል። አነስተኛ ቡድኖችን (Small Groups) እንዴት መምራት እንዳለብዎ፣ አባላትን በአንድ መንፈስ ማስተሳሰር እንደሚቻል፣ እና በውይይት ወቅት የሚነሱ ፈተናዎችን በብልህነት ማለፍ የሚችሉበትን ልምድ ያስጨብጥዎታል።"], "close": ["God’s Word cannot be chained! Follow this guide today, start your own spiritual Telegram fellowship and share the light of life with those around you. — Evangelist Eyosias Girma (Eyu)", "የእግዚአብሔር ቃል በምንም ሰንሰለት ሊታሰር አይችልም! ዛሬውኑ ይህንን መምሪያ በመከተል የራስዎን መንፈሳዊ የቴሌግራም ኅብረት ይጀምሩ፤ በዙሪያዎ ላሉትም የሕይወት ብርሃንን ያካፍሉ። — በወንጌላዊ ኢዮሲያስ ግርማ (ኢዩ)"]},
{"id": "sigara", "en": "How I Escaped Smoking", "am": "ከሲጋራ ሱስ እንዴት አመለጥኩ", "price": 300, "isNew": true, "frame": true, "cat": "free", "sub": ["From bondage to lasting freedom", "ከሲጋራ ባርነት ወደ ዘላቂ ነፃነት"], "short": ["A true journey from the chains of smoke to full freedom, with scientific and spiritual secrets.", "ከጭስ እስራት ወደ ሙሉ ነፃነት የተደረገ እውነተኛ ጉዞ፤ ሳይንሳዊና መንፈሳዊ ምስጢራት።"], "desc": ["Have you tried many times to quit smoking and lost hope? The problem is not a lack of determination but a lack of knowing the right way! Written by author and life-skills coach Eyosias Girma, this book brings you the scientific and spiritual secrets for defeating the smoking addiction in body, mind and spirit.", "ሲጋራን ለመተው ብዙ ጊዜ ሞክረው ተስፋ ቆርጠዋል? ችግሩ የቁርጠኝነት ማነስ ሳይሆን የትክክለኛ መንገድ እውቀት ማጣት ነው! በደራሲና የህይወት ክህሎት አሰልጣኝ ኢዮሲያስ ግርማ የተጻፈው «ከእሥራት ወደ ነጻነት» መጽሐፍ የሲጋራ ሱስን በአካል፣ በአእምሮና በመንፈስ ደረጃ ድል የሚያደርጉበትን ሳይንሳዊና መንፈሳዊ ምስጢራት ይዞልዎት ቀርቧል።"], "close": ["The truth you receive today and the decision you make will lead you into a new life of freedom.", "ዛሬ የተቀበሉት እውነትና የወሰኑት ውሳኔ ወደ አዲሱ የነፃነት ህይወት ይመራዎታል።"]}
];
const BOOK = id => BOOKS.find(b => b.id === id);
const VERSES = [
 {en:'And ye shall know the truth, and the truth shall make you free.', am:'እውነትንም ታውቃላችሁ፤ እውነትም ነጻ ያወጣችኋል።', ref:['John 8:32','ዮሐንስ 8፡32']},
 {en:'Go ye therefore, and teach all nations.', am:'እንግዲህ ሂዱና አሕዛብን ሁሉ ደቀ መዛሙርት አድርጓቸው።', ref:['Matthew 28:19','ማቴዎስ 28፡19']},
 {en:'Be not conformed to this world: but be ye transformed.', am:'ይህንም ዓለም አትምሰሉ፤ ነገር ግን በልባችሁ መታደስ ተለወጡ።', ref:['Romans 12:2','ሮሜ 12፡2']},
 {en:'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil.', am:'ለእናንተ የማስበውን አሳብ አውቃለሁና፥ ይላል እግዚአብሔር፥ የሰላም አሳብ እንጂ የክፉ አይደለም።', ref:['Jeremiah 29:11','ኤርምያስ 29፡11']},
 {en:'Train up a child in the way he should go: and when he is old, he will not depart from it.', am:'ሕፃን የሚሄድበትን መንገድ ምራው፥ በሸመገለ ጊዜ እንኳ ከእርሱ ዘንድ ፈቀቅ አይልም።', ref:['Proverbs 22:6','ምሳሌ 22፡6']},
 {en:'I can do all things through Christ which strengtheneth me.', am:'ኃይልን በሚሰጠኝ በክርስቶስ ሁሉን እችላለሁ።', ref:['Philippians 4:13','ፊልጵስዩስ 4፡13']},
 {en:'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.', am:'በእርሱ የሚያምን ሁሉ የዘላለም ሕይወት እንዲኖረው እንጂ እንዳይጠፋ እግዚአብሔር አንድያ ልጁን እስኪሰጥ ድረስ ዓለሙን እንዲሁ ወዶአልና።', ref:['John 3:16','ዮሐንስ 3፡16']},
 {en:'The LORD is my shepherd; I shall not want.', am:'እግዚአብሔር እረኛዬ ነው፥ የሚያሳጣኝም የለም።', ref:['Psalm 23:1','መዝሙር 23፡1']},
 {en:'Come unto me, all ye that labour and are heavy laden, and I will give you rest.', am:'እናንተ ደካሞች ሸክማችሁ የከበደ ሁሉ፥ ወደ እኔ ኑ፥ እኔም አሳርፋችኋለሁ።', ref:['Matthew 11:28','ማቴዎስ 11፡28']},
 {en:'So teach us to number our days, that we may apply our hearts unto wisdom.', am:'የልብን ጥበብ እናገኝ ዘንድ ዘመኖቻችንን እንድንቆጥር እንዲሁ አስተምረን።', ref:['Psalm 90:12','መዝሙር 90፡12']}
];

const PLAN = [
 ['Read John 8:32 and pray for freedom','ዮሐንስ 8፡32ን አንብቡ፤ ስለ ነጻነት ጸልዩ'],
 ['Thank God for three answered prayers','ለተመለሱ ሦስት ጸሎቶች እግዚአብሔርን አመስግኑ'],
 ['Read Romans 12:2 and write one change you will make','ሮሜ 12፡2ን አንብቡ፤ የሚያደርጉትን አንድ ለውጥ ጻፉ'],
 ['Pray for one person by name','ለአንድ ሰው በስሙ ጸልዩ'],
 ['Write down the vision God has given you','እግዚአብሔር የሰጠዎትን ራዕይ ይጻፉ'],
 ['Share a verse with a friend','አንድ ጥቅስ ለጓደኛ ያካፍሉ'],
 ['Rest, worship, and commit to your next step','ዕረፍት፣ አምልኮ፣ ቀጣይ እርምጃዎን ቃል ግቡ']
];

/* =========================================================
   STORY (chapters)
   ========================================================= */
const CHAPTERS = [
 {t:['The Boy Everyone Watched','ሁሉም የሚያየው ልጅ'], theme:'dark',
  p:[['Addis Ababa. A house full of voices: a mother, a father, an older sister he trusted, and a brother and sister following close behind. In the middle of it all stands a boy who lights up every room he walks into.',
      'አዲስ አበባ። በድምጽ የተሞላ ቤት፤ እናት፣ አባት፣ የሚተማመንበት ታላቅ እህት፣ ከኋላው የሚከተሉት ወንድምና እህት። በመካከላቸው አንድ ልጅ ቆሟል፤ የገባበትን ክፍል ሁሉ የሚያበራ።'],
     ['He is confident. People lean in when he speaks. His family looks at him and sees a big future. Nobody imagines it will be a spiritual one.',
      'በራሱ የሚተማመን ነበር። ሲናገር ሰዎች ጆሮ ይሰጡት ነበር። ቤተሰቡ ሲያየው ትልቅ ነገር ወደፊት ይታየዋል። መንፈሳዊ እንደሚሆን ግን ማንም አላሰበም።']]},
 {t:['The Wrong Door','የተሳሳተው በር'], theme:'dark deeper',
  p:[['Then come the teenage years, and a door that looks like freedom. Drugs. The wrong friends. The wrong relationships. One bad decision stacked on another.',
      'ከዚያ የጉርምስና ዘመን መጣ፤ ነጻነት የሚመስል በርም ተከፈተ። ሱስ። መጥፎ ጓደኞች። የተሳሳቱ ግንኙነቶች። አንድ የተሳሳተ ውሳኔ በሌላው ላይ ተደራረበ።'],
     ['The sickness comes first. Then the depression. Then the anger. The people who loved him start to notice, and the good relationships turn painful. By high school the habit has roots. Around him, other stories are ending: friends are taken to prison. Some are buried.',
      'መጀመሪያ ህመም መጣ፤ ከዚያም ድብርት፤ ከዚያም ቁጣ። የሚወዱት ሰዎች ለውጡን ማየት ጀመሩ፤ መልካም ግንኙነቶቹም ተበላሹ። ሁለተኛ ደረጃ ሲደርስ ልማዱ ሥር ሰድዶ ነበር። በዙሪያው የሌሎች ታሪክ እያበቃ ነበር፤ ጓደኞቹ ታሰሩ፤ አንዳንዶቹም ሞቱ።'],
     ['He is still standing. He does not yet know why.','እሱ ግን አሁንም ቆሟል። ለምን እንደሆነ ገና አያውቅም።']]},
 {t:['A Mother’s Prayer','የእናት ጸሎት'], theme:'dark deeper',
  p:[['Somewhere in that house, a woman is on her knees. His mother never stops praying.',
      'በዚያ ቤት ውስጥ አንዲት እናት በጉልበቷ ተንበርክካለች። እናቱ መጸለይ አላቆመችም።'],
     ['He should not have survived those years. Many of his friends did not. He did, and it was not luck. God had a plan on him, and a mother’s prayer stood guard until it was time.',
      'እነዚያን ዓመታት ሊተርፍ አይገባውም ነበር። ከጓደኞቹ ብዙዎቹ አልተረፉም። እሱ ግን ተረፈ፤ ዕድል አልነበረም። እግዚአብሔር በእሱ ላይ እቅድ ነበረው፤ የእናት ጸሎትም ጊዜው እስኪደርስ ጠበቀው።']],
  quote:['If I am alive today, it is because of my mother’s prayers.','ዛሬ በሕይወት ካለሁ በእናቴ ጸሎት ነው።']},
 {t:['The Degree and the Silence','ዲግሪውና ዝምታው'], theme:'dark',
  p:[['2005 E.C. Addis Ababa University. Civil Engineering. A name the family says with pride, while inside, nothing is under control.',
      '2005 ዓ.ም. አዲስ አበባ ዩኒቨርሲቲ። ሲቪል ምህንድስና። ቤተሰቡ በኩራት የሚጠራው ስም፤ ውስጡ ግን ምንም በቁጥጥር ሥር አልነበረም።'],
     ['He sits in churches. He goes to parties. He studies, meditates, tries everything that promises an answer. None of it tells him what he is for. Something in him is burning, and he cannot name it.',
      'ቤተ ክርስቲያን ይሄዳል። ድግስ ይሄዳል። ያጠናል፣ ያሰላስላል፣ መልስ ይሰጣሉ የሚላቸውን ሁሉ ይሞክራል። አንዳቸውም ለምን እንደተፈጠረ አልነገሩትም። በውስጡ የሚነድ ነገር አለ፤ ስም ግን ሊያወጣለት አልቻለም።'],
     ['2009 E.C. He graduates, his sister standing beside him. Now the neighbourhood, his little siblings and his whole family are waiting for him to figure out his life and serve the society that raised him. The weight is crushing.',
      '2009 ዓ.ም. ተመረቀ፤ እህቱ ከጎኑ ቆማ ነበር። አሁን ሰፈሩ፣ ታናናሾቹና መላው ቤተሰቡ ሕይወቱን እንዲያስተካክልና ያሳደገውን ማህበረሰብ እንዲያገለግል ይጠብቁታል። ሸክሙ ከባድ ነበር።']],
  timeline:[['2005 E.C.','Enrolled, Addis Ababa University','ገባ፣ አዲስ አበባ ዩኒቨርሲቲ'],['2009 E.C.','Graduated, Civil Engineering','ተመረቀ፣ ሲቪል ምህንድስና']]},
 {t:['Truth Will Set You Free','እውነት ነጻ ያወጣችኋል'], theme:'light',
  p:[['One day, a preacher opens John 8:32.','አንድ ቀን አንድ ሰባኪ ዮሐንስ 8፡32ን ከፈተ።']],
  verse:true,
  after:[['It stops being a sermon. It becomes a voice, and it is speaking to him. He starts reading the Bible like a man who has finally found water. He carves out time with God and the Holy Spirit. And this time, God helps.',
          'ስብከት መሆኑ ቀረ። ድምጽ ሆነ፤ ለእሱም እየተናገረ ነበር። በመጨረሻ ውሃ እንዳገኘ ሰው መጽሐፍ ቅዱስን ማንበብ ጀመረ። ከእግዚአብሔርና ከመንፈስ ቅዱስ ጋር ጊዜ ለየ። በዚህ ጊዜ እግዚአብሔር ረዳው።']]},
 {t:['The Job That Could Not Hold His Heart','ልቡን ያልያዘው ሥራ'], theme:'light',
  p:[['God helps, and a good job comes: a civil engineer, in a good position. By any measure, he has made it.',
      'እግዚአብሔር ረዳ፤ ጥሩ ሥራም መጣ፤ ጥሩ ደረጃ ያለው ሲቪል መሐንዲስ ሆነ። በማንኛውም መስፈሪያ ደርሷል።'],
     ['But his heart cannot settle. His soul wants a peace that no salary can buy, and he knows this is not his destination. So he does what few would do. He walks away, to find what God has seen for him.',
      'ልቡ ግን አልተረጋጋም። ነፍሱ ደመወዝ የማይገዛውን ሰላም ትፈልጋለች፤ ይህ መድረሻው እንዳልሆነም ያውቃል። ጥቂቶች የማያደርጉትን አደረገ፤ እግዚአብሔር ለእሱ ያየውን ለመፈለግ ተወ።']]},
 {t:['Edge to Edge','ከዳር እስከ ዳር'], theme:'dark',
  p:[['He finds it. And the rest, as they say, is history.','አገኘው። የቀረው ደግሞ ታሪክ ነው።'],
     ['He carries the Gospel out of Addis Ababa and across Ethiopia, edge to edge, city after city, road after road.',
      'ወንጌልን ከአዲስ አበባ አውጥቶ በመላው ኢትዮጵያ ከዳር እስከ ዳር፣ ከተማ በከተማ፣ መንገድ በመንገድ ይዞ ሄደ።']],
  film:[['road-gate','Evangelist Eyu giving a thumbs-up beneath a town entrance gate','Town after town','ከተማ በከተማ'],
        ['road-omo','Evangelist Eyu standing in a rural landscape beside tall stilt-walkers','Wherever the road leads','መንገዱ በሚወስድበት ሁሉ'],
        ['road-people','Evangelist Eyu smiling in a selfie with an elderly woman and another man outdoors','Faces, not crowds','ሕዝብ ሳይሆን ፊቶች']]},
 {t:['The Pen','ብዕሩ'], theme:'light',
  p:[['The message does not stay in the air. It goes onto paper.','መልእክቱ በአየር ላይ አልቀረም፤ በወረቀት ላይ ተጻፈ።'],
     ['Books on time, on freedom, on healing, on laziness, on raising children, on vision, on change. One of them is translated into Oromiffa and Tigrigna. And Hidu, “Go”, is built on the command that started it all: go.',
      'ስለ ጊዜ፣ ስለ ነጻነት፣ ስለ ፈውስ፣ ስለ ታካችነት፣ ልጅን ስለ ማሳደግ፣ ስለ ራዕይ፣ ስለ ለውጥ የተጻፉ መጻሕፍት። ከእነርሱ አንዱ ወደ ኦሮምኛና ትግርኛ ተተርጉሟል። «ሂዱ» የተሰኘው ደግሞ ሁሉን በጀመረው ትእዛዝ ላይ የተመሠረተ ነው፤ ሂዱ።']],
  link:['Meet the books','መጻሕፍቱን ይወቁ','#/books'],
  mosaic:[['launch-guest','Evangelist Eyu in a green suit with a guest, both holding books at a launch','big'],
          ['signing','Evangelist Eyu signing a copy of his book','sm'],
          ['books-table','Copies of his book displayed on a table at a launch','sm']]},
 {t:['Yegeta Serawit','የጌታ ሠራዊት'], theme:'dark',
  p:[['Today he is the visionary behind a team called Yegeta Serawit, the Lord’s Army.','ዛሬ የጌታ ሠራዊት የተሰኘው ቡድን ባለራዕይ ነው።'],
     ['Together they train and empower young people, help the needy, spend holidays with inmates, and spread the Good News across Ethiopia and beyond.',
      'በአንድነት ወጣቶችን ያሰለጥናሉ፣ ያበረታታሉ፣ ችግረኞችን ይረዳሉ፣ በዓላትን ከእስረኞች ጋር ያሳልፋሉ፣ የምሥራቹንም በኢትዮጵያና ከዚያ ባሻገር ያደርሳሉ።']],
  duo:[['team-group','The Yegeta Serawit team gathered together for a group photo'],
       ['team-wife','Evangelist Eyu with his wife, wearing a Yegeta Serawit shirt']]},
 {t:['Today','ዛሬ'], theme:'light',
  p:[['Eyosias Girma is 31. A husband. A father of three. A missionary, author, evangelist and trainer.',
      'ኢዮስያስ ግርማ የ31 ዓመት ባል፣ የሦስት ልጆች አባት፣ ሚስዮናዊ፣ ደራሲ፣ ወንጌላዊና አሰልጣኝ ነው።'],
     ['He never forgot the voice. John 8:32 gave him the purpose he was looking for, and he has been walking in it ever since.',
      'ድምጹን አልረሳውም። ዮሐንስ 8፡32 የሚፈልገውን ዓላማ ሰጠው፤ ከዚያ ወዲህ በዚያ እየተጓዘ ነው።']],
  quote:['God found me when I wasn’t looking, and trusted me when I didn’t trust myself.','እግዚአብሔር ሳልፈልገው አገኘኝ፤ እኔ ራሴን ሳላምን አመነኝ።'],
  family:'Eyosias Girma with his wife and three children, seated together'}
];

const AM_NOTE = '<p class="notice am">እነዚህ መመሪያዎች በአሁኑ ጊዜ በእንግሊዝኛ ብቻ ይገኛሉ። ጥያቄ ካለዎት በአማርኛ ይጻፉልን።</p>';
const LEGAL = {
 privacy:`
<p>Evangelisteyu is the ministry website of Evangelist Eyosias Girma. This page explains, in plain language, what the site does with information. Questions: <a class="link" href="mailto:Eyosiasgirma47@gmail.com">Eyosiasgirma47@gmail.com</a>.</p>
<h2>What this site stores on your device</h2>
<p>Your browser keeps a few small settings so the site remembers you: your language, your colour theme, your Bible challenge scores and your daily streak. This stays on your device. It is not sent to us and is not linked to an account. You can clear it in your browser settings, or by clearing this site’s data.</p>
<h2>The questionnaire</h2>
<p>Your answers to “Find your next step” are worked out inside your browser. They are not saved and not sent anywhere.</p>
<h2>Forms and messages</h2>
<p>This site has no forms that send data to a server. When you order a book, ask for prayer or contact us, the site opens WhatsApp, Telegram or your email app with a message ready. You choose whether to send it. After that, what you send is handled by that service under its own privacy policy, and we see what you send to us.</p>
<h2>Third-party services</h2>
<ul>
<li><strong>Google Fonts.</strong> Your browser requests fonts from Google when a page loads.</li>
<li><strong>Video.</strong> The featured message plays from this site. YouTube links open outside this site.</li>
<li><strong>WhatsApp, Telegram, Facebook, YouTube links.</strong> These open outside this site and follow their own policies.</li>
<li><strong>Payment services.</strong> Commercial Bank of Ethiopia, Telebirr, PayPal and international banks process your payment under their own terms. This site does not take payments and never sees your card or account login.</li>
</ul>
<h2>Analytics and advertising</h2>
<p>This site does not currently run analytics or advertising trackers. If that changes, this page will be updated first.</p>
<h2>Your choices</h2>
<p>Write to us if you want us to delete a conversation or any information you sent us.</p>`,
 terms:`
<p>By using this website you agree to these simple terms. They are a practical summary, not legal advice.</p>
<h2>Using the site</h2>
<p>You may read, watch and share links to this site for personal and church use. Please do not misuse the site, copy it as your own, or try to interfere with how it works.</p>
<h2>Ownership of content</h2>
<p>The books, text and original photographs on this site are the work of Eyosias Girma and Evangelisteyu unless stated otherwise. Videos hosted on YouTube, and messages on Telegram, Facebook and WhatsApp, remain subject to those services’ own terms.</p>
<h2>Books and digital copies</h2>
<p>A purchased book is for your personal use. Please do not resell it, publish it, or share the file widely. If you want to quote or translate a book, ask for permission first.</p>
<h2>Scripture quotations</h2>
<p>English verses on this site follow the King James Version, which is in the public domain.</p>
<h2>Spiritual content and the questionnaire</h2>
<p>The teaching and the questionnaire are offered for reflection and spiritual growth. They are not medical, psychological or legal advice and not a diagnosis. If you are struggling with your health or safety, please also speak to a qualified professional or someone you trust.</p>
<h2>Availability and changes</h2>
<p>We aim to keep the site working but cannot promise it will always be available. We may change prices, books or these terms; the current version is always on this page.</p>
<h2>Contact</h2>
<p><a class="link" href="mailto:Eyosiasgirma47@gmail.com">Eyosiasgirma47@gmail.com</a></p>`,
 refund:`
<h2>What you are buying</h2>
<p>When you order, you buy one digital copy of the book you chose, at the price shown in Ethiopian Birr (ETB) on the book page.</p>
<h2>How delivery works</h2>
<p>Delivery is manual. You pay, send your proof of payment on WhatsApp or Telegram, and we confirm the payment by hand. We then send your digital copy to you in that conversation, or another way we agree with you. This website has no accounts and no automatic download links.</p>
<h2>How long it takes</h2>
<p>Delivery is not instant. It happens after the payment is confirmed, so the time depends on when we see your message. We do not promise a fixed delivery time.</p>
<h2>If you paid and nothing arrives</h2>
<p>Message us on WhatsApp or Telegram with your proof of payment and the book title. We will check and send it. The same applies if you receive the wrong or a damaged file.</p>
<h2>Refunds</h2>
<p>A fixed refund rule has not been published. If you have a concern, contact us. Refund requests are handled directly by the ministry, one by one.</p>
<h2>International buyers</h2>
<p>Prices are listed in ETB. The US dollar price is the ETB price converted at 250 ETB = $10. If you pay by PayPal or international transfer, send that dollar amount.</p>
<h2>Support</h2>
<p>WhatsApp <a class="link" href="https://wa.me/251970752729" target="_blank" rel="noopener">+251 970 752 729</a> · Telegram <a class="link" href="https://t.me/Evangelisteyuu" target="_blank" rel="noopener">@Evangelisteyuu</a> · <a class="link" href="mailto:Eyosiasgirma47@gmail.com">Eyosiasgirma47@gmail.com</a></p>`
};


const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
const store = {
  get(k, d = null) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};
const lang = () => document.documentElement.lang === 'am' ? 1 : 0;
const pick = a => a[lang()];
const RATE = 25; /* 250 ETB = $10 */
const usd = n => '$' + (n / RATE).toFixed(n % RATE ? 2 : 0);
const etb = n => T(`${n} ETB`, `${n} ብር`) + ` <span class="usd">≈ ${usd(n)}</span>`;
const waLink = text => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function copyText(text, btn, done, idle) {
  const ok = () => { btn.innerHTML = done; btn.classList.add('ok'); setTimeout(() => { btn.innerHTML = idle; btn.classList.remove('ok'); }, 1800); };
  const fallback = () => { const a = document.createElement('textarea'); a.value = text; a.style.position = 'fixed'; a.style.opacity = '0'; document.body.append(a); a.select(); try { document.execCommand('copy'); } catch (e) {} a.remove(); ok(); };
  if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(ok, fallback); else fallback();
}

/* =========================================================
   LANGUAGE + THEME
   ========================================================= */
function setLang(l, persist = true) {
  document.documentElement.lang = l;
  $('#lang-en').setAttribute('aria-pressed', l === 'en');
  $('#lang-am').setAttribute('aria-pressed', l === 'am');
  $('#buy-close').setAttribute('aria-label', l === 'am' ? 'ዝጋ' : 'Close');
  $('#burger').setAttribute('aria-label', l === 'am' ? 'ምናሌ ክፈት' : 'Open menu');
  $('#theme-btn').setAttribute('aria-label', l === 'am' ? 'የቀለም ገጽታ ቀይር' : 'Switch colour theme');
  $('#prayer').placeholder = l === 'am' ? 'ጥያቄዎን እዚህ ይጻፉ…' : 'Write your request here…';
  if (persist) store.set('ev_l', l);
  const v = $('.view.active'); if (v) document.title = viewTitle(v);
}
$('#lang-en').onclick = () => setLang('en');
$('#lang-am').onclick = () => setLang('am');
(function initLang() {
  const saved = store.get('ev_l');
  setLang(saved || ((navigator.language || '').toLowerCase().startsWith('am') ? 'am' : 'en'), false);
})();

const root = document.documentElement;
const sysDark = window.matchMedia('(prefers-color-scheme: dark)');
function applyTheme(t) { if (t) root.setAttribute('data-theme', t); else root.removeAttribute('data-theme'); }
applyTheme(store.get('ev_t'));
$('#theme-btn').onclick = () => {
  const cur = root.getAttribute('data-theme') || (sysDark.matches ? 'dark' : 'light');
  const next = cur === 'dark' ? 'light' : 'dark';
  applyTheme(next); store.set('ev_t', next);
};


const dlg = $('#buy');
let buyTrigger = null, buyBook = null;
const METHODS = {'t-cbe':'CBE','t-tele':'Telebirr','t-pp':'PayPal','t-swift':'SWIFT / international transfer'};
function proofLink() {
  const b = buyBook, m = METHODS[$('.tabs [aria-selected="true"]').id];
  $('#buy-wa').href = waLink(`Hello Evangelist Eyu, I have paid for the book "${b.en} / ${b.am}" (listed price ${b.price} ETB / ${usd(b.price)} USD) using ${m}. Here is my proof of payment. Please send the book.`);
}
function openBuy(id, trigger) {
  buyBook = BOOK(id); buyTrigger = trigger;
  $('#buy-title').innerHTML = T(esc(buyBook.en), esc(buyBook.am));
  $('#buy-price').innerHTML = etb(buyBook.price); $$('.usd-due').forEach(x => x.textContent = usd(buyBook.price));
  selectTab($('#t-cbe'), false);
  proofLink();
  document.documentElement.style.overflow = 'hidden';
  dlg.showModal();
  dlg.scrollTop = 0;
}
function closeBuy() { dlg.close(); }
dlg.addEventListener('close', () => {
  document.documentElement.style.overflow = '';
  if (buyTrigger && document.contains(buyTrigger) && buyTrigger.offsetParent !== null) buyTrigger.focus();
  buyTrigger = null;
});
dlg.addEventListener('click', e => { if (e.target === dlg) closeBuy(); });
$('#buy-close').onclick = closeBuy;
$('#buy-policy').addEventListener('click', () => { buyTrigger = null; closeBuy(); });
const tabs = $$('.tabs [role="tab"]');
function selectTab(t, focus = true) {
  tabs.forEach(x => { const on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; $('#' + x.getAttribute('aria-controls')).hidden = !on; });
  if (focus) t.focus();
  if (buyBook) proofLink();
}
tabs.forEach((t, i) => {
  t.addEventListener('click', () => selectTab(t));
  t.addEventListener('keydown', e => {
    let n = null;
    if (e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
    if (e.key === 'ArrowLeft') n = tabs[(i + tabs.length - 1) % tabs.length];
    if (e.key === 'Home') n = tabs[0];
    if (e.key === 'End') n = tabs[tabs.length - 1];
    if (n) { e.preventDefault(); selectTab(n); }
  });
});
$$('[data-copy]').forEach(b => { const idle = b.innerHTML; b.addEventListener('click', () => copyText(b.dataset.copy, b, T('Copied', 'ተቀድቷል'), idle)); });


/* =========================================================
   EXTRAS PER BOOK (glow colour behind each cover)
   ========================================================= */
const GLOW = {
  hidu:['#4f8a45','rgba(110,200,90,.55)'], gize:['#6db4de','rgba(110,190,235,.55)'], porni:['#f2674a','rgba(250,100,70,.55)'],
  tefewes:['#e1b52f','rgba(240,190,50,.55)'], lewt:['#c47a3e','rgba(220,140,70,.55)'], mintayalehu:['#3f7ad8','rgba(70,130,240,.6)'],
  ketlo:['#a5bbd2','rgba(170,200,235,.55)'], takach:['#8cc67c','rgba(140,210,120,.55)'], lijihn:['#e6a746','rgba(240,170,60,.55)'],
  ergman:["#2f6bd0", "rgba(50,110,220,.6)"],tsom:["#f08a2e", "rgba(250,140,40,.55)"],tselot:["#f0b240", "rgba(250,190,70,.55)"],study:["#d9b36b", "rgba(220,180,110,.5)"],dreams:["#8a5cf0", "rgba(140,90,240,.6)"],telegram:["#b0344a", "rgba(190,60,90,.55)"],sigara:["#f0a030", "rgba(250,170,50,.55)"]
};
const bimg = (id, side = 'front') => A(`img/books/${id}-${side}.webp`);
const backFace = (b, cls) => `<div class="${cls} bk2" style="--g:${GLOW[b.id][0]}"><span class="bk2-k">${T('Evangelist Eyu', 'ወንጌላዊ ኢዩ')}</span><h4>${T(esc(b.en), esc(b.am))}</h4>${b.sub ? `<em>${T(esc(b.sub[0]), esc(b.sub[1]))}</em>` : ''}<p>${T(esc(b.short[0]), esc(b.short[1]))}</p><span class="bk2-p">${T(b.price + ' ETB', b.price + ' ብር')}</span></div>`;
const photo = (name, alt = '', extra = '') => `<img src="${A(`img/photos/${name}.webp`)}" alt="${esc(alt)}" loading="lazy" ${extra}>`;
const ICON = {
  chk: '<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#chk"/></svg>',
  prev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
  next: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>',
  flip: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12a9 9 0 0 1 15.5-6.2L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.5 6.2L3 16"/><path d="M3 21v-5h5"/></svg>'
};

/* ---------- reveal on scroll ---------- */
const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -6% 0px' }) : null;
function watch(root = document) {
  $$('.rv:not(.in),.drop:not(.in)', root).forEach(el => io ? io.observe(el) : el.classList.add('in'));
}

/* =========================================================
   BOOK CARD, FLOW (3D carousel), DETAIL
   ========================================================= */
function bookCard(b, i = 0) {
  const g = GLOW[b.id][0];
  return `<article class="bc drop" style="--g:${g};--d:${(i % 3) * .12}s;--rot:${[-4, 3, -2][i % 3]}deg">
    <a class="stage" href="#/books/${b.id}" aria-label="${esc(b.en)}">${b.isNew ? `<span class="badge">${T('New', 'አዲስ')}</span>` : ''}<img class="${b.frame ? 'fr' : ''}" src="${bimg(b.id)}" alt="${esc(b.en)} ${esc(b.am)}" loading="lazy"><span class="glare"></span></a>
    <div class="in">
      <h3><a href="#/books/${b.id}" style="text-decoration:none">${T(esc(b.en), esc(b.am))}</a></h3>
      <p>${T(esc(b.short[0]), esc(b.short[1]))}</p>
      <div class="foot"><span class="price">${etb(b.price)}</span><button type="button" class="btn sm" data-buy="${b.id}">${T('Order', 'ይዘዙ')}</button></div>
    </div></article>`;
}

function mountFlow(rootEl) {
  const stage = $('[data-flow]', rootEl), dotsEl = $('[data-dots]', rootEl), info = $('[data-info]', rootEl), n = BOOKS.length;
  let cur = 0, pos = 0, tgt = 0, vis = false, paused = false, lastTouch = 0, drag = null, moved = false, raf = 0, auto = 0;
  stage.innerHTML = '<div class="aura"></div>' + BOOKS.map((b, k) => `<div class="fb" data-i="${k}"><div class="lev"><div class="fi"><img class="ff${b.frame ? ' fr' : ''}" src="${bimg(b.id)}" alt="${esc(b.en)} ${esc(b.am)}" draggable="false">${b.frame ? backFace(b, 'fk') : `<img class="fk" src="${bimg(b.id, 'back')}" alt="" draggable="false" loading="lazy">`}</div></div></div>`).join('')
    + `<div class="flow-hint"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12a9 9 0 0 1 15.5-6.2L21 8M21 3v5h-5"/></svg>${T('Tap the front book to turn it over', 'ፊት ያለውን መጽሐፍ ይንኩ፤ ይገለበጣል')}</div>`;
  dotsEl.innerHTML = BOOKS.map((b, k) => `<button type="button" aria-label="${esc(b.en)}" data-d="${k}"></button>`).join('');
  const items = $$('.fb', stage), dots = $$('button', dotsEl), aura = $('.aura', stage);
  const wrapd = d => { d = ((d % n) + n) % n; return d > n / 2 ? d - n : d; };
  function layout() {
    const cw = items[0].offsetWidth, narrow = stage.clientWidth < 620, lim = narrow ? 1.3 : 3.2;
    items.forEach((el, k) => {
      const d = wrapd(k - pos), a = Math.abs(d), sg = Math.sign(d), a1 = Math.min(a, 1);
      const x = sg * (a1 * cw * (narrow ? .62 : .78) + Math.max(a - 1, 0) * cw * (narrow ? .3 : .42));
      const z = a <= 1 ? 80 - 210 * a : -130 - (a - 1) * 130;
      el.style.transform = `translate(-50%,-50%) translateX(${x}px) translateZ(${z}px) rotateY(${-sg * a1 * (narrow ? 42 : 52)}deg) scale(${1.12 - .12 * a1})`;
      el.style.opacity = a <= lim ? 1 : Math.max(0, 1 - (a - lim) * 2);
      el.style.filter = `brightness(${Math.max(.45, 1 - a * .2).toFixed(2)})`;
      el.style.zIndex = 50 - Math.round(a * 4);
      el.style.pointerEvents = a <= lim ? 'auto' : 'none';
      const act = Math.round(a * 100) === 0 || a < .5; el.classList.toggle('act', act);
      if (!act) el.classList.remove('flip');
    });
  }
  function paint(first) {
    const b = BOOKS[cur];
    dots.forEach((x, k) => x.setAttribute('aria-current', k === cur));
    aura.style.opacity = 0; setTimeout(() => { stage.style.setProperty('--aura', GLOW[b.id][1]); aura.style.opacity = 1; }, 180);
    const html = `<div class="txt"><span class="flow-count">${String(cur + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')}</span><h3>${T(esc(b.en), esc(b.am))}</h3>
      <p class="sub">${b.sub ? T(esc(b.sub[0]), esc(b.sub[1])) : '&nbsp;'}</p>
      <p>${T(esc(b.short[0]), esc(b.short[1]))}</p>
      <div class="row" style="margin-top:18px;align-items:center"><span class="price">${etb(b.price)}</span>
        <button type="button" class="btn on-night sm" data-flip>${T('Turn over', 'ገልብጥ')}</button>
        <a class="btn gold sm" href="#/books/${b.id}">${T('Open the book', 'መጽሐፉን ክፈት')}</a>
        <button type="button" class="btn on-night sm" data-buy="${b.id}">${T('Order now', 'አሁን ይዘዙ')}</button></div>
      <div class="flow-bar" aria-hidden="true"><i></i></div></div>
      <div class="flow-ctl"><button type="button" class="arrow" data-prev aria-label="Previous">${ICON.prev}</button><button type="button" class="arrow" data-next aria-label="Next">${ICON.next}</button></div>`;
    if (first) { info.innerHTML = html; return; }
    const t = $('.txt', info); if (t) t.classList.add('sw');
    setTimeout(() => { info.innerHTML = html; }, 200);
  }
  function tick() {
    if (!drag) { const df = tgt - pos; pos += df * .12; if (Math.abs(df) < .002) pos = tgt; }
    layout();
    const c = ((Math.round(pos) % n) + n) % n; if (c !== cur) { cur = c; paint(false); }
    raf = (drag || pos !== tgt) ? requestAnimationFrame(tick) : 0;
  }
  const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
  function go(to, byUser) { tgt = to; if (byUser) { lastTouch = Date.now(); auto = 0; } kick(); }
  const flip = () => { const el = items[cur]; if (el) { el.classList.toggle('flip'); el.classList.remove('turning'); void el.offsetWidth; el.classList.add('turning'); setTimeout(() => el.classList.remove('turning'), 950); lastTouch = Date.now(); } };
  info.addEventListener('click', e => {
    if (e.target.closest('[data-prev]')) go(Math.round(tgt) - 1, true);
    if (e.target.closest('[data-next]')) go(Math.round(tgt) + 1, true);
    if (e.target.closest('[data-flip]')) flip();
  });
  dotsEl.addEventListener('click', e => { const d = e.target.closest('[data-d]'); if (d) go(Math.round(pos) + wrapd(+d.dataset.d - cur), true); });
  stage.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { go(Math.round(tgt) + 1, true); e.preventDefault(); } if (e.key === 'ArrowLeft') { go(Math.round(tgt) - 1, true); e.preventDefault(); } if (e.key === 'Enter' || e.key === ' ') { flip(); e.preventDefault(); } });
  stage.addEventListener('pointerdown', e => { drag = { x: e.clientX, p0: pos, lx: e.clientX, lt: performance.now(), v: 0 }; moved = false; kick(); });
  addEventListener('pointermove', e => {
    if (!drag) return; const cw = items[0].offsetWidth, dx = e.clientX - drag.x;
    if (Math.abs(dx) > 6) moved = true;
    pos = drag.p0 - dx / (cw * .55);
    const t = performance.now(), dt = Math.max(1, t - drag.lt); drag.v = .8 * drag.v + .2 * (-(e.clientX - drag.lx) / (cw * .55) / dt); drag.lx = e.clientX; drag.lt = t;
  });
  addEventListener('pointerup', () => {
    if (!drag) return; const v = drag.v; drag = null; lastTouch = Date.now();
    tgt = Math.round(pos + Math.max(-2, Math.min(2, v * 260))); kick();
  });
  stage.addEventListener('click', e => {
    if (moved) { moved = false; return; }
    const it = e.target.closest('.fb'); if (!it) return; const k = +it.dataset.i;
    if (k === cur) flip(); else go(Math.round(pos) + wrapd(k - cur), true);
  });
  stage.addEventListener('mouseenter', () => paused = true);
  stage.addEventListener('mouseleave', () => paused = false);
  new ResizeObserver(layout).observe(stage);
  if (io) new IntersectionObserver(es => vis = es[0].isIntersecting, { threshold: .25 }).observe(stage); else vis = true;
  if (!reduce) setInterval(() => {
    const t = $('.flow-bar i', info), el = items[cur];
    if (t) t.style.width = Math.min(100, (Date.now() - Math.max(lastTouch, 0)) / 40) + '%';
    if (vis && !paused && !drag && !document.hidden && Date.now() - lastTouch > 4200 && !el.classList.contains('flip') && stage.closest('.view.active')) { go(Math.round(tgt) + 1, false); lastTouch = Date.now(); }
  }, 120);
  layout(); paint(true);
}

function renderBook(id) {
  const b = BOOK(id), g = GLOW[id], others = BOOKS.filter(x => x.id !== id).sort(() => .5 - Math.random()).slice(0, 3);
  $('#book-detail').innerHTML = `
  <div class="detail">
    <div class="sceneb" style="--g:${g[0]}" id="sceneb">
      <div class="turn" id="turn"><div class="f"><img class="${b.frame ? 'fr' : ''}" src="${bimg(id)}" alt="${esc(b.en)} ${esc(b.am)} cover" id="turn-img"></div><div class="b">${b.frame ? backFace(b, 'bkx') : `<img src="${bimg(id, 'back')}" alt="${esc(b.en)} back cover">`}</div></div>
      <button type="button" class="flipbtn" id="flipbtn">${ICON.flip}<span class="en">Turn the book over</span><span class="am">መጽሐፉን ገልብጥ</span></button>
    </div>
    <div class="dinfo">
      <a class="link" href="#/books"><span class="en">All books</span><span class="am">ሁሉም መጻሕፍት</span></a>
      <h1 style="margin-top:14px">${T(esc(b.en), esc(b.am))}</h1>
      ${b.sub ? `<p class="sub">${T(esc(b.sub[0]), esc(b.sub[1]))}</p>` : ''}
      <p class="desc">${T(esc(b.desc[0]), esc(b.desc[1]))}</p>
      ${b.list ? `<div class="dlist"><h2>${T(esc(b.listTitle[0]), esc(b.listTitle[1]))}</h2><ul>${b.list.map(x => `<li>${ICON.chk}<span>${T(esc(x[0]), esc(x[1]))}</span></li>`).join('')}</ul></div>` : ''}
      ${b.close ? `<p class="dclose">${T(esc(b.close[0]), esc(b.close[1]))}</p>` : ''}
      <div class="row" style="align-items:center"><span class="price">${etb(b.price)}</span>
        <button type="button" class="btn gold big pulse" data-buy="${id}"><span class="en">Order this book</span><span class="am">ይዘዙ</span></button></div>
      <p style="margin-top:16px;color:var(--muted)"><span class="en">Not sure it is the right one?</span><span class="am">ትክክለኛው መሆኑን እርግጠኛ አይደሉም?</span> <a class="link" href="#/find"><span class="en">Take the personality test</span><span class="am">የባሕርይ ፈተናውን ይውሰዱ</span></a></p>
    </div>
  </div>
  <div class="related"><h2 class="h2" style="font-size:clamp(1.6rem,3vw,2.3rem)"><span class="en">You may also need</span><span class="am">ሊፈልጓቸው የሚችሉ</span></h2><div class="shelf">${others.map((o, i) => bookCard(o, i)).join('')}</div></div>`;
  const turn = $('#turn'), sc = $('#sceneb'), img = $('#turn-img');
  img.addEventListener('load', () => turn.style.setProperty('--ar', img.naturalWidth / img.naturalHeight));
  if (img.complete && img.naturalWidth) turn.style.setProperty('--ar', img.naturalWidth / img.naturalHeight);
  $('#flipbtn').onclick = () => turn.classList.toggle('flip');
  if (!reduce) {
    sc.addEventListener('pointermove', e => { const r = sc.getBoundingClientRect(); turn.style.setProperty('--ry', ((e.clientX - r.left) / r.width - .5) * 26 + 'deg'); turn.style.setProperty('--rx', (.5 - (e.clientY - r.top) / r.height) * 18 + 'deg'); });
    sc.addEventListener('pointerleave', () => { turn.style.setProperty('--ry', '0deg'); turn.style.setProperty('--rx', '0deg'); });
  }
  watch($('#book-detail')); tiltCards($('#book-detail'));
}

/* 3D tilt + glare on book cards */
function tiltCards(root) {
  if (reduce) return;
  $$('.bc', root).forEach(c => {
    c.addEventListener('pointermove', e => {
      const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      c.style.transform = `perspective(900px) rotateY(${(x - .5) * 10}deg) rotateX(${(.5 - y) * 8}deg) translateY(-6px)`;
      c.style.setProperty('--gx', x * 100 + '%'); c.style.setProperty('--gy', y * 100 + '%');
    });
    c.addEventListener('pointerleave', () => { c.style.transform = ''; });
  });
}

/* =========================================================
   TRAINING
   ========================================================= */
const TRAIN = [
  { id: 'vision', t: ['Vision and purpose', 'ራዕይና ዓላማ'], book: 'mintayalehu',
    d: ['Find out why God made you, then write the vision down so you can walk toward it.', 'እግዚአብሔር ለምን እንደፈጠረዎ ይወቁ፤ ከዚያም ራዕዩን ጽፈው ወደ እሱ ይጓዙ።'],
    p: [['Name the purpose God gave you', 'እግዚአብሔር የሰጠዎትን ዓላማ ይለዩ'], ['Write a one-page vision', 'የአንድ ገጽ ራዕይ ይጻፉ'], ['Take your first step this week', 'በዚህ ሳምንት የመጀመሪያ እርምጃ ይውሰዱ']],
    ic: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>' },
  { id: 'evangelism', t: ['Evangelism 101', 'ወንጌላዊነት 101'], book: 'hidu',
    d: ['Learn to share the Gospel simply and boldly, wherever you are sent.', 'በተላኩበት ሁሉ ወንጌልን በቀላሉና በድፍረት መናገር ይማሩ።'],
    p: [['Tell your testimony clearly', 'ምስክርነትዎን በግልጽ ይናገሩ'], ['Start a Gospel conversation without fear', 'ያለ ፍርሃት ስለ ወንጌል ይነጋገሩ'], ['Follow up with the people you meet', 'ያገኟቸውን ሰዎች ይከታተሉ']],
    ic: '<path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z"/><path d="M15 9a4 4 0 0 1 0 6"/><path d="M18 6a8 8 0 0 1 0 12"/>' },
  { id: 'time', t: ['Time management', 'የጊዜ አጠቃቀም'], book: 'gize',
    d: ['Stop losing hours. Plan your days with wisdom, order and responsibility.', 'ሰዓታትን ማባከን ያቁሙ። ቀናትዎን በጥበብ፣ በሥርዓትና በኃላፊነት ያቅዱ።'],
    p: [['See where your time really goes', 'ጊዜዎ በእውነት የት እንደሚሄድ ይመልከቱ'], ['Build a weekly rhythm that fits your calling', 'ከጥሪዎ ጋር የሚስማማ ሳምንታዊ ሥርዓት ይገንቡ'], ['Say no without guilt', 'ያለ ጸጸት «አይሆንም» ይበሉ']],
    ic: '<path d="M6 3h12M6 21h12"/><path d="M7 3c0 5 5 6 5 9s-5 4-5 9"/><path d="M17 3c0 5-5 6-5 9s5 4 5 9"/>' },
  { id: 'child', t: ['Rescue Your Child', 'ልጅህን ታደግ'], book: 'lijihn',
    d: ['For parents: plant God’s Word in your children and lead them with love and patience.', 'ለወላጆች፦ የእግዚአብሔርን ቃል በልጆችዎ ልብ ይትከሉ፤ በፍቅርና በትዕግሥት ይምሯቸው።'],
    p: [['Teach the Word at home and on the road', 'ቃሉን በቤትና በመንገድ ያስተምሩ'], ['Discipline without provoking', 'ሳያስቆጡ ሥነ ሥርዓት ያስተምሩ'], ['Become the example they follow', 'የሚከተሉት ምሳሌ ይሁኑ']],
    ic: '<circle cx="9" cy="7" r="3"/><circle cx="17" cy="10" r="2.2"/><path d="M3 20v-2a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v2"/><path d="M15.5 20v-1.5a3.5 3.5 0 0 1 5.5-2.9"/>' },
  { id: 'social', t: ['Social media and Christian', 'ማህበራዊ ሚዲያና ክርስቲያን'], book: 'porni',
    d: ['Use your phone for the Kingdom instead of letting it use you. Guard your heart and shape your feed.', 'ስልክዎ እርስዎን እንዲጠቀም ከመፍቀድ ይልቅ ለመንግሥቱ ይጠቀሙበት። ልብዎን ይጠብቁ፤ የሚያዩትን ይቅረጹ።'],
    p: [['Set limits that you can keep', 'ሊጠብቋቸው የሚችሉ ገደቦችን ያስቀምጡ'], ['Share your faith online with wisdom', 'እምነትዎን በመስመር ላይ በጥበብ ያካፍሉ'], ['Protect your purity', 'ንጽሕናዎን ይጠብቁ']],
    ic: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/><path d="M10 8.5l2-2 2 2M12 6.5v6"/>' },
  { id: 'youth', t: ['Youth leader', 'የወጣት መሪ'], book: 'lewt',
    d: ['Lead young people with character, vision and a servant’s heart.', 'ወጣቶችን በባሕርይ፣ በራዕይና በአገልጋይ ልብ ይምሯቸው።'],
    p: [['Build a team that lasts', 'የሚዘልቅ ቡድን ይገንቡ'], ['Mentor one person at a time', 'አንድ በአንድ ሰው ያብቁ'], ['Handle conflict with grace', 'ግጭትን በጸጋ ይፍቱ']],
    ic: '<path d="M5 21V4"/><path d="M5 4h12l-2.5 4L17 12H5"/>' }
];
$('#tr-grid').innerHTML = TRAIN.map((c, i) => `<article class="tc rv" style="--d:${(i % 3) * .1}s">
  <div class="ic"><svg viewBox="0 0 24 24" aria-hidden="true">${c.ic}</svg></div>
  <h3>${T(esc(c.t[0]), esc(c.t[1]))}</h3>
  <p>${T(esc(c.d[0]), esc(c.d[1]))}</p>
  <ul>${c.p.map(x => `<li>${ICON.chk}<span>${T(esc(x[0]), esc(x[1]))}</span></li>`).join('')}</ul>
  <div class="go"><a class="btn gold sm" target="_blank" rel="noopener" href="${waLink(`Hello Evangelist Eyu, I want to join the training: ${c.t[0]} / ${c.t[1]}. Please tell me the next step.`)}">${T('Join today', 'ዛሬ ይቀላቀሉ')}</a>
  <a class="pair link" href="#/books/${c.book}">${T('Pairs with: ', 'የሚያጣምረው፦ ')}${T(esc(BOOK(c.book).en), esc(BOOK(c.book).am))}</a></div></article>`).join('');
$$('.tc').forEach(c => c.addEventListener('pointermove', e => { const r = c.getBoundingClientRect(); c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px'); }));

/* =========================================================
   TICKER, MOMENTS, LIGHTBOX, SHELF, LAUNCH GALLERY
   ========================================================= */
(function () {
  const items = [T('16 books published', '16 መጻሕፍት ታትመዋል'), T('4 translated language books', '4 የተተረጎሙ መጻሕፍት'), T('50+ trainings given', '50+ ስልጠናዎች ተሰጥተዋል'), T('9+ years of experience', '9+ ዓመታት ልምድ'),
    ...TRAIN.map(c => T(esc(c.t[0]), esc(c.t[1])))];
  const one = items.map(x => `<span>${x}<svg viewBox="0 0 24 24"><use href="#cross"/></svg></span>`).join('');
  $('#ticker').innerHTML = one + one;
  const r1 = ['launch-ribbon', 'team-group', 'road-people', 'signing', 'launch-guest', 'road-omo', 'library-2'];
  const r2 = ['launch-elders', 'library-1', 'launch-wife', 'road-gate', 'launch-ribbon2', 'team-shirt', 'launch-book'];
  const fig = n => `<figure data-lb="${n}">${photo(n, '')}</figure>`;
  $('#mrow1').innerHTML = [...r1, ...r1].map(fig).join('');
  $('#mrow2').innerHTML = [...r2, ...r2].map(fig).join('');
  const renderShelf = c => {
    const list = BOOKS.filter(b => c === 'all' || (c === 'new' ? b.isNew : b.cat === c));
    $('#shelf').innerHTML = list.map((b, i) => bookCard(b, i)).join('');
    watch($('#shelf')); tiltCards($('#shelf'));
  };
  renderShelf('all');
  $('#chips').addEventListener('click', e => {
    const x = e.target.closest('button[data-c]'); if (!x) return;
    $$('#chips button').forEach(k => k.setAttribute('aria-pressed', k === x)); renderShelf(x.dataset.c);
  });
  $('#launch-gallery').innerHTML = ['launch-book', 'launch-guest', 'launch-wife', 'launch-ribbon', 'launch-elders', 'books-table', 'launch-ribbon2', 'library-2'].map(n => `<figure data-lb="${n}" class="rv">${photo(n, 'Book launch moment')}</figure>`).join('');
  mountFlow($('#library')); mountFlow($('#v-books .lib'));
  tiltCards($('#shelf'));
})();
const lb = $('#lb');
document.addEventListener('click', e => {
  const f = e.target.closest('[data-lb]');
  if (f) { $('#lb-img').src = A(`img/photos/${f.dataset.lb}.webp`); lb.showModal(); }
});
$('#lb-x').onclick = () => lb.close();
lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
document.addEventListener('click', e => { const b = e.target.closest('[data-buy]'); if (b) openBuy(b.dataset.buy, b); });

/* =========================================================
   STORY
   ========================================================= */
$('#chapters').innerHTML = CHAPTERS.map((c, i) => {
  const n = i + 1;
  let h = `<section class="scene ${c.theme}" aria-labelledby="ch-${n}"><div class="wrap"><div style="max-width:720px">
    <span class="chno" aria-hidden="true">${n}</span>
    <span class="ch-label rv">${T(`Chapter ${n}`, `ምዕራፍ ${n}`)}</span>
    <h2 id="ch-${n}" class="rv">${T(esc(c.t[0]), esc(c.t[1]))}</h2>
    <div class="body">${c.p.map(p => `<p class="rv">${T(esc(p[0]), esc(p[1]))}</p>`).join('')}</div>`;
  if (c.verse) { const v = VERSES[0]; h += `<p class="verse-big rv">${T('“' + esc(v.en) + '”', '“' + esc(v.am) + '”')}</p><p class="ch-label" style="margin-top:14px">${T(esc(v.ref[0]), esc(v.ref[1]))}</p>`;
    h += `<div class="body" style="margin-top:22px">${c.after.map(p => `<p class="rv">${T(esc(p[0]), esc(p[1]))}</p>`).join('')}</div>`; }
  if (c.quote) h += `<blockquote class="rv">${T('“' + esc(c.quote[0]) + '”', '“' + esc(c.quote[1]) + '”')}</blockquote>`;
  if (c.timeline) h += `<div class="timeline">${c.timeline.map(t => `<div><b>${t[0]}</b><span>${T(esc(t[1]), esc(t[2]))}</span></div>`).join('')}</div>`;
  if (c.link) h += `<p style="margin-top:26px"><a class="btn" href="${c.link[2]}">${T(c.link[0], c.link[1])}</a></p>`;
  h += `</div>`;
  if (c.film) h += `<div class="film">${c.film.map((f, k) => `<figure class="rv pop" style="--d:${k * .12}s"><div class="arch">${photo(f[0], f[1])}</div><figcaption>${T(f[2], f[3])}</figcaption></figure>`).join('')}</div>`;
  if (c.mosaic) h += `<div class="mosaic">${c.mosaic.map((m, k) => `<figure class="rv pop ${m[2] === 'big' ? 'big' : ''}" style="--d:${k * .12}s">${photo(m[0], m[1])}</figure>`).join('')}</div>`;
  if (c.duo) h += `<div class="duo">${c.duo.map((m, k) => `<figure class="rv pop" style="--d:${k * .12}s">${photo(m[0], m[1])}</figure>`).join('')}</div>`;
  if (c.family) h += `<figure class="family rv pop">${photo('family', c.family)}</figure>`;
  return h + `</div></section>`;
}).join('');

/* =========================================================
   YOUTUBE (loads only on press)
   ========================================================= */
const INTERVIEWS = [
  { id: '8QZpJAJE8NU', t: ['ከአምስቱ የማይረዷችሁ ሰዎች በቶሎ ራቁ ... ከእነማን?', 'ከአምስቱ የማይረዷችሁ ሰዎች በቶሎ ራቁ ... ከእነማን?'] },
  { id: 'e2enQts7a9g', t: ['እናንተስ በእነዚህ መለኪያ ምን ያህል ሰነፍ ናችሁ ?', 'እናንተስ በእነዚህ መለኪያ ምን ያህል ሰነፍ ናችሁ ?'] },
  { id: 's0NrHB4pTI4', t: ['እያየውት ሊሞት ደረሰ‼️ቆሜ ነው የቀበርኳት #Evangelist_Eyosias_Girma', 'እያየውት ሊሞት ደረሰ‼️ቆሜ ነው የቀበርኳት #Evangelist_Eyosias_Girma'] }
];
const PLAYLISTS = [
  { v: 'SRZxqcbtbQw', list: null, n: ['Long teachings', 'ረጃጅም ትምህርቶች'], tag: ['Go deep', 'ጠለቅ ብለው ይግቡ'],
    d: ['Sit down and take your time. Full-length teachings for when you want to go further with God.', 'ተረጋግተው ይቀመጡ። ከእግዚአብሔር ጋር ይበልጥ ለመራቅ ሲፈልጉ የሚሆኑ ሙሉ ርዝመት ያላቸው ትምህርቶች።'] },
  { v: 'Mf38VLId7d8', list: 'PL66Ujr9LBe6Pl68VhB2tLACxsTmZEfQ7d', n: ['Teachings', 'ትምህርት'], tag: ['For every day', 'ለዕለት ተዕለት'],
    d: ['The Word for your everyday life. Press play and let it speak to exactly where you are.', 'ለዕለት ተዕለት ሕይወትዎ የሚሆን ቃል። ያጫውቱት፤ ባሉበት ሁኔታ ልብዎን ይንካው።'] },
  { v: 'hMUUlmRFmCU', list: null, n: ['Short teachings', 'አጫጭር ትምህርቶች'], tag: ['A few minutes', 'ጥቂት ደቂቃዎች'],
    d: ['A few minutes, one truth. Perfect for your break, your ride home or the end of a long night.', 'ጥቂት ደቂቃ፣ አንድ እውነት። ለእረፍት ሰዓት፣ ወደ ቤት ለሚደረግ መንገድ ወይም ለረጅም ሌሊት መጨረሻ ተስማሚ።'] }
];
function plHtml() {
  const chan = 'https://www.youtube.com/@evangelisteyu/playlists';
  return `<div class="pl-wrap"><span class="pl-eyebrow">${T('Playlists', 'የትምህርት ዝርዝሮች')}</span>
  <h3 class="pl-h">${T('Start here. Pick what you need today.', 'ከዚህ ይጀምሩ። ዛሬ የሚያስፈልግዎን ይምረጡ።')}</h3>
  <p class="pl-sub">${T('Three playlists, one tap each. Watch free on YouTube.', 'ሦስት የትምህርት ዝርዝሮች፣ እያንዳንዱ በአንድ ንክኪ። በዩቲዩብ በነጻ ይመልከቱ።')}</p>
  <div class="pl-grid">${PLAYLISTS.map((p, i) => {
    const start = `https://www.youtube.com/watch?v=${p.v}` + (p.list ? `&list=${p.list}` : '');
    const full = p.list ? `https://www.youtube.com/playlist?list=${p.list}` : chan;
    return `<article class="pl"><a class="pl-th" href="${start}" target="_blank" rel="noopener" aria-label="${esc(p.n[0])}"><img src="https://i.ytimg.com/vi/${p.v}/hqdefault.jpg" alt="" loading="lazy" onerror="this.style.display='none'"><span class="pl-n">${T('Playlist', 'ዝርዝር')} ${i + 1}</span><span class="pl-play"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l13-7.5z"/></svg></span><span class="pl-tag">${T(esc(p.tag[0]), esc(p.tag[1]))}</span></a>
    <div class="pl-body"><h4>${T(esc(p.n[0]), esc(p.n[1]))}</h4><p>${T(esc(p.d[0]), esc(p.d[1]))}</p>
    <div class="row"><a class="btn gold sm" href="${start}" target="_blank" rel="noopener">${T('Start watching', 'ማየት ጀምር')}</a><a class="btn sm ghost" href="${full}" target="_blank" rel="noopener">${p.list ? T('Full playlist', 'ሙሉ ዝርዝር') : T('More on YouTube', 'ተጨማሪ በዩቲዩብ')}</a></div></div></article>`;
  }).join('')}</div></div>`;
}
function ivHtml() {
  return `<h3 class="iv-h">${T('Interviews with Evangelist Eyu', 'ከወንጌላዊ ኢዮ ጋር የተደረጉ ቃለ መጠይቆች')}</h3><p class="iv-sub">${T('Hear his story and teaching in conversation. Tap a video to watch on YouTube.', 'ታሪኩንና ትምህርቱን በውይይት ይስሙ። ለመመልከት ቪዲዮውን ይንኩ።')}</p>
  <div class="iv-grid">${INTERVIEWS.map((v, i) => `<a class="iv" href="https://youtu.be/${v.id}" target="_blank" rel="noopener"><span class="iv-th"><img src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt="" loading="lazy" onerror="this.style.display='none'"><span class="iv-n">${T('Interview', 'ቃለ መጠይቅ')} ${i + 1}</span><span class="iv-play"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l13-7.5z"/></svg></span></span><span class="iv-t"><b>${v.t ? T(esc(v.t[0]), esc(v.t[1])) : T('Interview with Evangelist Eyu', 'ከወንጌላዊ ኢዮ ጋር ቃለ መጠይቅ')}</b><small>${T('Watch on YouTube', 'በዩቲዩብ ይመልከቱ')}</small></span></a>`).join('')}</div>`;
}
$$('[data-yt]').forEach(el => {
  el.innerHTML = `<div class="player"><video data-vid controls playsinline webkit-playsinline preload="none" poster="${A('media/eyu-poster.jpg')}" aria-label="Message from Evangelist Eyu"></video></div>
  <p style="margin-top:12px;color:var(--muted)">${T('More messages on', 'ተጨማሪ መልዕክቶች በ')} <a class="link" href="https://www.youtube.com/@evangelisteyu" target="_blank" rel="noopener">YouTube</a></p>`;
  el.insertAdjacentHTML('beforeend', plHtml());
  el.insertAdjacentHTML('beforeend', ivHtml());
  attachVideo($('video', el));
  $('video', el).addEventListener('play', e => $$('video').forEach(v => v !== e.target && v.pause()));
});

/* =========================================================
   HERO: live counters, embers, parallax
   ========================================================= */
(function counters() {
  $$('.stat .num').forEach((el, k) => {
    const to = String(el.dataset.to), plus = el.dataset.plus;
    const reels = [...to].map(ch => `<span class="col"><span class="reel" data-t="${+ch + 10}">${Array.from({ length: 20 }, (_, i) => `<span>${i % 10}</span>`).join('')}</span></span>`).join('');
    el.innerHTML = reels + (plus ? '<span class="plus">+</span>' : '');
    el.setAttribute('role', 'img');
  });
  const run = () => $$('.stat .reel').forEach((r, i) => { r.style.transitionDelay = (i * .22) + 's'; r.style.transform = `translateY(${-(+r.dataset.t) * 5}%)`; });
  if (reduce) { $$('.stat .reel').forEach(r => { r.style.transition = 'none'; r.style.transform = `translateY(${-(+r.dataset.t) * 5}%)`; }); return; }
  const st = $('#stats');
  let ran = false;
  const trig = () => { if (!ran && st.closest('.view.active')) { ran = true; setTimeout(run, 500); } };
  if (io) new IntersectionObserver(es => { if (es[0].isIntersecting) trig(); }, { threshold: .3 }).observe(st); else run();
  addEventListener('hashchange', () => setTimeout(trig, 300));
  setTimeout(trig, 900);
})();

(function embers() {
  const cv = $('#fx'), ctx = cv.getContext('2d'); let W, H, P = [], run = false;
  const size = () => { const r = cv.parentElement.getBoundingClientRect(); const dpr = innerWidth < 700 ? 1 : Math.min(devicePixelRatio || 1, 2); W = cv.width = r.width * dpr; H = cv.height = r.height * dpr; };
  const mk = (init) => ({ x: Math.random() * W, y: init ? Math.random() * H : H + 10, r: (Math.random() * 1.6 + .5) * (W > 1200 ? 1.3 : 1), v: Math.random() * .5 + .18, a: Math.random() * .45 + .12, ph: Math.random() * 6 });
  function init() { size(); P = Array.from({ length: Math.round(Math.min(innerWidth < 700 ? 16 : 70, W / 22)) }, () => mk(true)); }
  function frame(t) {
    if (!run) return; ctx.clearRect(0, 0, W, H);
    P.forEach(p => { p.y -= p.v; p.x += Math.sin(t / 1400 + p.ph) * .3; if (p.y < -10) Object.assign(p, mk(false));
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3.4); g.addColorStop(0, `rgba(255,214,132,${p.a})`); g.addColorStop(1, 'rgba(255,214,132,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3.4, 0, 6.3); ctx.fill(); });
    requestAnimationFrame(frame);
  }
  init(); (function(){ let lw = innerWidth, tm; addEventListener('resize', () => { if (innerWidth === lw) return; lw = innerWidth; clearTimeout(tm); tm = setTimeout(init, 200); }); })();
  if (reduce) { run = true; frame(0); run = false; return; }
  if (io) new IntersectionObserver(es => { const v = es[0].isIntersecting && document.querySelector('#v-home.active'); if (v && !run) { run = true; requestAnimationFrame(frame); } else if (!v) run = false; }).observe(cv);
  addEventListener('hashchange', () => setTimeout(() => { if (document.querySelector('#v-home.active') && !run) { run = true; requestAnimationFrame(frame); } }, 200));
})();

(function parallax() {
  if (reduce || matchMedia('(hover:none)').matches) return;
  const art = $('[data-parallax]'); if (!art) return;
  const els = $$('[data-depth]', art);
  $('.hero').addEventListener('pointermove', e => {
    const r = art.getBoundingClientRect(), x = (e.clientX - (r.left + r.width / 2)) / r.width, y = (e.clientY - (r.top + r.height / 2)) / r.height;
    els.forEach(el => { const d = +el.dataset.depth; el.style.translate = `${-x * d}px ${-y * d}px`; });
    $('.arch img', art).style.transform = `scale(1.1) translate(${x * -8}px,${y * -8}px)`;
  });
})();

/* =========================================================
   KNOW YOUR PERSONALITY (10 questions, scored to all 16 books)
   ========================================================= */
const PRIORITY = ['ketlo', 'lewt', 'mintayalehu', 'gize', 'hidu', 'takach', 'tefewes', 'porni', 'lijihn', 'ergman', 'tselot', 'tsom', 'study', 'dreams', 'sigara', 'telegram'];
const QUIZ = [
  { q: ['The day is over and the house is quiet. What is the first thing you feel?', 'ቀኑ አልቋል፤ ቤቱም ጸጥ ብሏል። መጀመሪያ የሚሰማዎት ምንድን ነው?'],
    n: ['Take a breath. Nobody is watching.', 'ትንፋሽ ይውሰዱ። ማንም አያይዎትም።'],
    o: [['A tiredness sleep cannot fix. I have achieved things, yet I feel empty.', 'እንቅልፍ የማይፈታው ድካም። ብዙ አሳክቻለሁ፤ ግን ውስጤ ባዶ ነው።', { ketlo: 3, mintayalehu: 1 }],
        ['Shame about something I do in secret.', 'በስውር ስለማደርገው ነገር ሀፍረት።', { porni: 2, sigara: 2 }],
        ['Pain in my body that never fully leaves.', 'ሙሉ በሙሉ የማይተወኝ የሰውነት ህመም።', { tefewes: 3 }],
        ['Worry for the children I love.', 'ለምወዳቸው ልጆች ጭንቀት።', { lijihn: 3 }],
        ['I want to pray, but my words feel dry.', 'መጸለይ እፈልጋለሁ፤ ግን ቃላቶቼ ደርቀዋል።', { tselot: 3 }],
        ['Where did today go? Another day, gone.', 'ዛሬ ወዴት ሄደ? ሌላ ቀን አለፈ።', { gize: 3, takach: 1 }]] },
  { q: ['Which sentence is closest to a secret you carry?', 'ከሚሸከሙት ምስጢር ጋር በጣም የሚቀርበው የትኛው ዓረፍተ ነገር ነው?'],
    n: ['Be honest. This stays on your phone only.', 'በቅንነት ይመልሱ። ይህ በስልክዎ ላይ ብቻ ይቀራል።'],
    o: [['Something holds me, and I cannot say it out loud.', 'አንድ ነገር አስሮኛል፤ ጮክ ብዬ መናገር ግን አልችልም።', { porni: 3 }],
        ['I have tried to quit smoking, or another habit, again and again, and failed.', 'ሲጋራን ወይም ሌላ ልማድን ለማቆም ደጋግሜ ሞክሬ ወድቄያለሁ።', { sigara: 3, porni: 1 }],
        ['The same failure keeps returning in my life or my family.', 'ተመሳሳይ ውድቀት በሕይወቴ ወይም በቤተሰቤ ደጋግሞ ይመጣል።', { ergman: 3, lewt: 1 }],
        ['I know I am capable of more, and I keep delaying.', 'ከዚህ የበለጠ እንደምችል አውቃለሁ፤ ግን አዘገያለሁ።', { takach: 3, gize: 1 }],
        ['I doubt that God really hears me.', 'እግዚአብሔር በእውነት እንደሚሰማኝ እጠራጠራለሁ።', { tselot: 3 }],
        ['I have a dream for my life that I am afraid to say.', 'ለመናገር የምፈራው የሕይወት ህልም አለኝ።', { mintayalehu: 3, hidu: 1, dreams: 1 }]] },
  { q: ['Finish the sentence: what quietly steals my peace is…', 'ዓረፍተ ነገሩን ያሟሉ፦ ሰላሜን በጸጥታ የሚሰርቀው…'],
    n: ['You are not the only one who feels this.', 'ይህን የሚሰማዎት እርስዎ ብቻ አይደሉም።'],
    o: [['my own thoughts, going round in the same circles.', 'የራሴ አሳቦች ናቸው፤ በተመሳሳይ ዙር ይዞራሉ።', { lewt: 3 }],
        ['the years passing faster than I can use them.', 'ዓመታት ልጠቀምባቸው ከምችለው በላይ ፈጥነው ማለፋቸው።', { gize: 3 }],
        ['not understanding the Bible when I read it.', 'መጽሐፍ ቅዱስን ሳነብ አለመረዳቴ።', { study: 3, dreams: 1 }],
        ['strange dreams I cannot explain.', 'ማስረዳት የማልችላቸው እንግዳ ሕልሞች።', { dreams: 3 }],
        ['fasting and praying again and again, with little change.', 'ደጋግሞ መጾምና መጸለይ፤ ግን ብዙም ለውጥ አለማየት።', { tsom: 3, tselot: 1 }],
        ['closed doors, even though I do everything right.', 'ሁሉን በትክክል ባደርግም የሚዘጉ በሮች።', { ergman: 3 }]] },
  { q: ['When you pray or open your Bible lately, it feels like…', 'ሲጸልዩ ወይም መጽሐፍ ቅዱስዎን ሲከፍቱ በቅርቡ የሚሰማዎት…'],
    n: ['God is not angry at your honesty.', 'እግዚአብሔር በቅንነትዎ አይቆጣም።'],
    o: [['talking into silence. I do not know how to go deeper.', 'ዝምታ ውስጥ ማውራት ነው። እንዴት ጠልቄ እንደምገባ አላውቅም።', { tselot: 3 }],
        ['I fast, I follow every rule, and still nothing moves.', 'እጾማለሁ፤ ሥርዓቱን ሁሉ እጠብቃለሁ፤ ግን ምንም አይነቃነቅም።', { tsom: 3, ergman: 1 }],
        ['reading words I cannot connect to my life.', 'ከሕይወቴ ጋር ማገናኘት የማልችላቸውን ቃላት ማንበብ ነው።', { study: 3 }],
        ['God may be speaking to me at night, and I do not understand.', 'እግዚአብሔር በሌሊት እየተናገረኝ ይሆናል፤ እኔ ግን አልገባኝም።', { dreams: 3, mintayalehu: 1 }],
        ['being close to Him, and wanting to carry His Word to others.', 'ወደ እሱ ቅርብ መሆን ነው፤ ቃሉንም ለሌሎች ማድረስ እፈልጋለሁ።', { telegram: 3, hidu: 1 }],
        ['being far away. Shame made me stop.', 'ሩቅ መሆን ነው። ሀፍረት እንዳቆም አደረገኝ።', { porni: 1, sigara: 2, ketlo: 1 }]] },
  { q: ['In the last year, which of these hurt you most?', 'ባለፈው ዓመት ከእነዚህ የትኛው በጣም አሳመመዎት?'],
    n: ['A pain you name is a pain that can begin to heal.', 'ስም የሰጡት ህመም መፈወስ ሊጀምር ይችላል።'],
    o: [['A sickness, mine or someone close to me.', 'የእኔ ወይም የቅርብ ሰው ህመም።', { tefewes: 3 }],
        ['Falling again into a habit I hate.', 'የምጠላው ልማድ ውስጥ እንደገና መውደቅ።', { sigara: 3, porni: 1 }],
        ['Watching my child drift away from God.', 'ልጄ ከእግዚአብሔር ሲርቅ ማየት።', { lijihn: 3 }],
        ['A door of blessing closing, again and again.', 'የበረከት በር ደጋግሞ ሲዘጋ ማየት።', { ergman: 3 }],
        ['Wasted months I can never get back.', 'ተመልሰው የማይመጡ የባከኑ ወራት።', { gize: 3, takach: 1 }],
        ['Seeing people around me lost, and doing nothing.', 'በዙሪያዬ ያሉ ሰዎች ሲጠፉ አይቼ ምንም አለማድረጌ።', { hidu: 3, telegram: 2 }]] },
  { q: ['If you could reach thousands of people today, what would you do?', 'ዛሬ ሺዎችን ማግኘት ቢችሉ ምን ያደርጋሉ?'],
    n: ['Your answer says a lot about your calling.', 'መልስዎ ስለ ጥሪዎ ብዙ ይናገራል።'],
    o: [['Gather them to study God’s Word together, even by phone.', 'በስልክም ቢሆን ቃሉን አብረን እንድናጠና እሰበስባቸዋለሁ።', { telegram: 3, study: 1 }],
        ['Go to the ones who have never heard the Gospel.', 'ወንጌልን ገና ላልሰሙት እሄዳለሁ።', { hidu: 3 }],
        ['Teach them to read Scripture for themselves.', 'መጽሐፍ ቅዱስን በራሳቸው እንዲያነቡ አስተምራቸዋለሁ።', { study: 3, telegram: 1 }],
        ['Pray with them until something breaks.', 'አንድ ነገር እስኪሰበር ድረስ አብሬ እጸልያለሁ።', { tselot: 2, tsom: 2 }],
        ['Protect their children.', 'ልጆቻቸውን እጠብቃለሁ።', { lijihn: 3 }],
        ['Honestly? I must first fix myself.', 'እውነቱን? መጀመሪያ ራሴን ማስተካከል አለብኝ።', { takach: 2, lewt: 2 }]] },
  { q: ['Your phone is in your hand all day. What is it really doing to you?', 'ስልክዎ ቀኑን ሙሉ በእጅዎ ነው። በእውነት ምን እያደረገዎት ነው?'],
    n: ['No judgment here. Only truth.', 'እዚህ ፍርድ የለም፤ እውነት ብቻ።'],
    o: [['Stealing my hours.', 'ሰዓቶቼን እየሰረቀ ነው።', { gize: 2, takach: 2 }],
        ['Feeding something I want to leave behind.', 'ልተወው የምፈልገውን ነገር እየመገበ ነው።', { porni: 2, sigara: 1 }],
        ['Keeping me connected, and I want to use it for God’s kingdom.', 'አገናኝቶኛል፤ ለእግዚአብሔር መንግሥት ልጠቀምበት እፈልጋለሁ።', { telegram: 3, hidu: 1 }],
        ['Giving me noise, never peace.', 'ጫጫታ እንጂ ሰላም አይሰጠኝም።', { ketlo: 2, lewt: 2 }]] },
  { q: ['Which picture is most like your heart today?', 'ዛሬ ልብዎን በጣም የሚመስለው የትኛው ሥዕል ነው?'],
    n: ['Go with the first one that touched you.', 'መጀመሪያ ልብዎን የነካውን ይምረጡ።'],
    o: [['A locked room with a thin line of light under the door.', 'በበሩ ስር ቀጭን ብርሃን የሚታይበት የተቆለፈ ክፍል።', { porni: 2, sigara: 2 }],
        ['A chain on my ankle that I did not choose.', 'እኔ ያልመረጥኩት በቁርጭምጭሚቴ ላይ ያለ ሰንሰለት።', { ergman: 3, sigara: 2 }],
        ['A seed in a pot, still waiting for the sun.', 'ፀሐይን እየጠበቀ በማሰሮ ውስጥ ያለ ዘር።', { mintayalehu: 3, lewt: 1 }],
        ['A lamp with almost no oil left.', 'ዘይቱ ሊያልቅ የተቃረበ መብራት።', { tselot: 2, tsom: 2 }],
        ['A full house with one empty room in the middle.', 'መሃሉ ላይ አንድ ባዶ ክፍል ያለው የተሞላ ቤት።', { ketlo: 3, lijihn: 1 }],
        ['A suitcase by the door, still not packed.', 'በበሩ አጠገብ ያለ፣ ገና ያልተሞላ ሻንጣ።', { hidu: 3, takach: 1 }]] },
  { q: ['Imagine standing before God. He asks, “What did you do with what I gave you?”', 'በእግዚአብሔር ፊት እንደቆሙ ያስቡ። «የሰጠሁህን ምን አደረግኸው?» ይላል።'],
    n: ['Almost there. You are doing well.', 'ሊጨርሱ ነው። በጣም ጥሩ እየሠሩ ነው።'],
    o: [['I wasted my time and my strength.', 'ጊዜዬንና ጉልበቴን አባከንኩ።', { takach: 3, gize: 2 }],
        ['I gained so much, and still had nothing.', 'ብዙ አግኝቼ ምንም አልነበረኝም።', { ketlo: 3 }],
        ['I kept the Gospel to myself.', 'ወንጌልን ለራሴ ብቻ ያዝኩ።', { hidu: 3, telegram: 2 }],
        ['I did not guard the ones entrusted to me.', 'የተሰጡኝን አልጠበቅኳቸውም።', { lijihn: 3 }],
        ['I carried what You had already paid for.', 'አንተ ቀድሞ የከፈልክለትን ሸክም ተሸከምኩ።', { tefewes: 2, ergman: 2 }],
        ['I never became who You made me to be.', 'አንተ የፈጠርከኝ ሰው አልሆንኩም።', { lewt: 3, mintayalehu: 2 }],
        ['I fasted and prayed with my lips, but my heart stayed far away.', 'በከንፈሬ ጾምኩ፣ ጸለይኩ፤ ልቤ ግን ሩቅ ቀረ።', { tsom: 3, tselot: 1 }]] },
  { q: ['What do you most need to hear from God right now?', 'አሁን ከእግዚአብሔር መስማት የሚያስፈልግዎ በጣም ምንድን ነው?'],
    n: ['Last one. Let your heart answer.', 'የመጨረሻው ነው። ልብዎ ይመልስ።'],
    o: [['“You are free.”', '«ነጻ ነህ።»', { porni: 1, sigara: 2, ergman: 2 }],
        ['“You are healed.”', '«ተፈውሰሃል።»', { tefewes: 3 }],
        ['“I hear you.”', '«እሰማሃለሁ።»', { tselot: 3 }],
        ['“I will show you the way.”', '«መንገዱን አሳይሃለሁ።»', { study: 2, dreams: 3, mintayalehu: 1 }],
        ['“Go. I am sending you.”', '«ሂድ፤ እኔ እልክሃለሁ።»', { hidu: 3, telegram: 2 }],
        ['“Begin again. Today.”', '«እንደገና ጀምር፤ ዛሬ።»', { takach: 3, lewt: 1, gize: 1 }]] }
];
const PERSONA = {
  hidu: { t: ['The Sent One', 'የተላከው'], s: ['You carry a restlessness for people who have not heard. Comfort feels like a cage to you. You were made to go.', 'ገና ላልሰሙ ሰዎች የማይተው ጭንቀት በውስጥዎ አለ። ምቾት ለእርስዎ እስር ቤት ነው። የተፈጠሩት ለመሄድ ነው።'], g: ['Courage and a readiness to obey.', 'ድፍረትና ለመታዘዝ ዝግጁነት።'], e: ['Running ahead of God’s timing, or forgetting the people closest to you while you chase the faraway.', 'ከእግዚአብሔር ጊዜ ቀድሞ መሮጥ፣ ወይም የሩቁን ሲከተሉ የቅርቦችን መርሳት።'], w: ['Go! shows how to follow God’s leading when you step out on the mission.', '«ሂዱ» ለተልዕኮ ሲወጡ የእግዚአብሔርን መሪነት እንዴት እንደሚከተሉ ያሳያል።'] },
  gize: { t: ['The Time-Conscious Reflector', 'ጊዜን የሚመዝን አሳቢ'], s: ['You feel the weight of every hour. You see how fast life moves and you do not want to reach the end with regret.', 'የእያንዳንዱ ሰዓት ክብደት ይሰማዎታል። ሕይወት ምን ያህል ፈጣን እንደሆነ ያያሉ፤ በጸጸት መጨረስ አይፈልጉም።'], g: ['Awareness. You already know time is a gift.', 'ንቃት። ጊዜ ስጦታ እንደሆነ አስቀድመው ያውቃሉ።'], e: ['Living in regret, so the hour in front of you slips by while you grieve the past.', 'በጸጸት መኖር፤ ያለፈውን እያዘኑ ፊት ለፊትዎ ያለው ሰዓት ያመልጣል።'], w: ['Time teaches you to use what remains with wisdom, understanding and responsibility.', '«ጊዜ» የቀረውን በጥበብ፣ በማስተዋልና በኃላፊነት እንዲጠቀሙ ያስተምራል።'] },
  porni: { t: ['The Hidden Fighter', 'በጸጥታ የሚታገል ተዋጊ'], s: ['You are carrying something privately, and it is heavier than anyone knows. That you are still looking for a way out says there is a fighter in you.', 'በግልዎ የሚሸከሙት ነገር አለ፤ ማንም ከሚያውቀው በላይ ከባድ ነው። አሁንም መውጫ መንገድ መፈለግዎ በውስጥዎ ተዋጊ እንዳለ ያሳያል።'], g: ['Honesty with yourself and the will to be free.', 'ከራስ ጋር ቅንነትና ነጻ የመውጣት ፍላጎት።'], e: ['Hiding. A secret grows in the dark, and loneliness is the fuel it burns.', 'መደበቅ። ምስጢር በጨለማ ያድጋል፤ ብቸኝነትም የሚነድበት ነዳጅ ነው።'], w: ['Freedom from Pornography faces the real size of the danger and shows a way out.', '«ፖርኒ-ግራፊ» የአደጋውን እውነተኛ ስፋት ተጋፍጦ መውጫ መንገድ ያሳያል።'] },
  tefewes: { t: ['The One Longing for Wholeness', 'ሙሉነትን የሚናፍቅ'], s: ['Your body, mind or spirit is tired of carrying pain. Deep down you wonder if what Christ paid for on the cross is for you. It is.', 'ሰውነትዎ፣ አእምሮዎ ወይም መንፈስዎ ህመም መሸከም ደክሟል። ክርስቶስ በመስቀል የከፈለው ለእርስዎም እንደሆነ በውስጥዎ ይጠይቃሉ። ነው።'], g: ['Endurance and honesty about your pain.', 'ጽናትና ስለ ህመምዎ ቅንነት።'], e: ['Letting the pain tell you who you are, until faith feels too heavy to lift.', 'ህመም ማንነትዎን እንዲነግርዎ መፍቀድ፤ እምነት ለማንሳት እስኪከብድ ድረስ።'], w: ['Healed is a message of healing and faith: free from sin, sickness and poverty through Christ.', '«ተፈወሰ» የፈውስና የእምነት መልዕክት ነው፤ በክርስቶስ ከኃጢአት፣ ከህመምና ከድህነት ነጻ መውጣት።'] },
  lewt: { t: ['The Mind in Transformation', 'ለውጥን የሚፈልግ አእምሮ'], s: ['You can see the patterns that hold you back, and you are tired of repeating them. You are ready to be renewed, not only reformed.', 'የሚያግዱዎትን ልማዶች ያያሉ፤ መድገም ሰልችቷቸዋል። ለመስተካከል ብቻ ሳይሆን ለመታደስ ዝግጁ ነዎት።'], g: ['Self-awareness and a hunger to change.', 'ራስን ማወቅና የመለወጥ ረሃብ።'], e: ['Trying to change by willpower alone, then punishing yourself when you slip.', 'በራስ ጉልበት ብቻ ለመለወጥ መሞከርና ሲሰናከሉ ራስን መቅጣት።'], w: ['Change is a map for breaking old mindsets and living in God’s will.', '«ለውጥ» የቆዩ አስተሳሰቦችን ሰብሮ በእግዚአብሔር ፈቃድ ለመኖር የሚረዳ ካርታ ነው።'] },
  mintayalehu: { t: ['The Quiet Visionary', 'ዝምተኛው ባለራዕይ'], s: ['You sense there is more ahead than you can describe yet. You feel it in pictures and hopes you rarely say out loud.', 'ገና መግለጽ ከሚችሉት በላይ ወደፊት እንዳለ ይሰማዎታል። በሥዕሎችና በተስፋዎች ውስጥ ያዩታል፤ ግን ብዙ ጊዜ አይናገሩትም።'], g: ['Imagination and faith.', 'ምናብና እምነት።'], e: ['Keeping the vision silent. A dream never spoken or written stays a dream.', 'ራዕዩን ዝም ማሰኘት። ያልተነገረና ያልተጻፈ ህልም ህልም ሆኖ ይቀራል።'], w: ['What Do You See? teaches you to see by faith and to write down what God shows you.', '«ምን ታያለህ» በእምነት ማየትንና እግዚአብሔር የሚያሳይዎትን መጻፍን ያስተምራል።'] },
  ketlo: { t: ['The Seeker of What Lasts', 'የማይጠፋውን የሚፈልግ'], s: ['You have tasted achievement and found it too small for the hunger inside. You are asking the right question: what next?', 'ስኬትን ቀምሰዋል፤ ለውስጥዎ ረሃብ ግን ትንሽ ሆኖ አግኝተውታል። ትክክለኛውን ጥያቄ እየጠየቁ ነው፦ ቀጥሎ ምን?'], g: ['Depth. Shiny things do not fool you.', 'ጥልቀት። የሚያብረቀርቁ ነገሮች አያታልሉዎትም።'], e: ['Chasing the next achievement to quiet a hunger only God can fill.', 'እግዚአብሔር ብቻ ሊሞላው የሚችለውን ረሃብ ቀጣዩን ስኬት በማሳደድ ለማረጋጋት መሞከር።'], w: ['What Next? answers the question with the one thing that is not chasing the wind.', '«ቀጥሎ ምን ላድርግ» ንፋስን እንደመከተል ያልሆነውን አንድ ነገር በመግለጥ ጥያቄውን ይመልሳል።'] },
  takach: { t: ['The Sleeping Giant', 'የተኛው ግዙፍ'], s: ['There is far more in you than your routine shows. Delay and disorder are the only things standing between you and the life you want.', 'ከልማድዎ በላይ ብዙ ነገር በውስጥዎ አለ። በእርስዎና በሚፈልጉት ሕይወት መካከል ያሉት ማዘግየትና ሥርዓት አልባነት ብቻ ናቸው።'], g: ['Potential, and the honesty to admit the delay.', 'አቅምና መዘግየትን የመቀበል ቅንነት።'], e: ['Delay. You wait for the perfect feeling, and the feeling never comes.', 'ማዘግየት። ፍጹም ስሜትን ይጠብቃሉ፤ ስሜቱ ግን አይመጣም።'], w: ['The Lazy Person calls you to a life of diligence, one clean step at a time.', '«ታካች ሰው» ወደ ትጋት ሕይወት በአንድ ንጹህ እርምጃ ይጠራዎታል።'] },
  lijihn: { t: ['The Guardian Parent', 'ጠባቂው ወላጅ'], s: ['Your heart is turned toward the next generation. You worry because you love, and you want your children to follow God.', 'ልብዎ ወደ ቀጣዩ ትውልድ ዘወር ብሏል። የሚጨነቁት ስለሚወዱ ነው፤ ልጆችዎ እግዚአብሔርን እንዲከተሉ ይፈልጋሉ።'], g: ['Love and a sense of responsibility.', 'ፍቅርና የኃላፊነት ስሜት።'], e: ['Carrying every worry alone, and teaching more with words than with your own life.', 'ሁሉንም ጭንቀት ብቻዎን መሸከምና ከራስዎ ሕይወት ይልቅ በቃላት ማስተማር።'], w: ['Rescue Your Child shows how to protect children by planting God’s Word in their hearts.', '«ልጅህን ታደግ» የእግዚአብሔርን ቃል በልባቸው በመትከል ልጆችን እንዴት መታደግ እንደሚቻል ያሳያል።'] },
  ergman: { t: ['The Chain-Breaker in Waiting', 'ሰንሰለት ሰባሪው፣ ገና የሚጠብቅ'], s: ['You work hard and you pray, yet the same walls keep coming back. That does not mean you are failing. It may mean something older than your effort is holding you, and there is a way out.', 'ይለፋሉ፣ ይጸልያሉ፤ ግን ተመሳሳይ ግድግዳዎች ደጋግመው ይመጣሉ። ይህ እየወደቁ ነዎት ማለት አይደለም። ከጥረትዎ የቀደመ ነገር ይዞዎት ሊሆን ይችላል፤ መውጫ መንገድም አለ።'], g: ['Perseverance. Even tired, you have not quit.', 'ጽናት። ደክመውም አላቆሙም።'], e: ['Blaming yourself or your family, when the problem needs truth and authority, not shame.', 'ችግሩ ሀፍረት ሳይሆን እውነትና ሥልጣን ሲፈልግ ራስዎን ወይም ቤተሰብዎን መውቀስ።'], w: ['Breaking the Power of Curses explains the divine laws by which a believer walks free.', '«የእርግማንን ኃይል መስበር» አማኝ ነጻ የሚወጣበትን መለኮታዊ ሕግጋት ያብራራል።'] },
  tsom: { t: ['The Hungry Disciple', 'የተራበው ደቀ መዝሙር'], s: ['You have fasted and kept the rules, and you still long for something real. That hunger is not failure. It is God drawing you deeper.', 'ጾመዋል፣ ሥርዓቱንም ጠብቀዋል፤ ግን አሁንም እውነተኛ ነገር ይናፍቃሉ። ይህ ረሃብ ውድቀት አይደለም፤ እግዚአብሔር ወደ ጥልቁ እየሳበዎት ነው።'], g: ['Discipline. You show up even when it is hard.', 'ሥነ ሥርዓት። ሲከብድም ይገኛሉ።'], e: ['Treating fasting as a duty to finish instead of a door to meet God.', 'ጾምን እግዚአብሔርን የሚያገኙበት በር ሳይሆን የሚጨርሱት ግዴታ አድርጎ ማየት።'], w: ['Develop a Life of Fasting and Prayer lifts fasting from habit into real depth and visible fruit.', '«የጾም ጸሎት ህይወት አዳብር» ጾምን ከልማድ ወደ እውነተኛ ጥልቀትና የሚታይ ፍሬ ያሸጋግራል።'] },
  tselot: { t: ['The Thirsty Pray-er', 'የተጠማው ጸሎተኛ'], s: ['You want to talk with God for real, not just recite words. Your prayers feel dry, yet your thirst is proof that He is already calling you closer.', 'እግዚአብሔርን በእውነት ማነጋገር እንጂ ቃላትን መድገም ብቻ አይፈልጉም። ጸሎትዎ ደርቋል፤ ጥማትዎ ግን ቀድሞ እየጠራዎት እንደሆነ ማረጋገጫ ነው።'], g: ['Longing. You want God more than answers.', 'ናፍቆት። ከመልሶች ይልቅ እግዚአብሔርን ይፈልጋሉ።'], e: ['Waiting to feel ready, and stopping when prayer feels empty instead of building a steady rhythm.', 'ዝግጁ እስኪሰማዎት መጠበቅና ጸሎት ባዶ ሲመስል ቋሚ ልምድ ከመገንባት ይልቅ ማቆም።'], w: ['How to Grow My Prayer Life is a practical guide to build prayer on a firm foundation.', '«እንዴት የጸሎት ህይወቴን ላሳድግ» ጸሎትን በጽኑ መሠረት ለመገንባት ተግባራዊ መምሪያ ነው።'] },
  study: { t: ['The Seeker of Understanding', 'ማስተዋልን የሚሻ'], s: ['You open the Word with a sincere heart, but too often you close it asking what it means for your life. You do not want only to read. You want to understand and to live it.', 'ቃሉን በቅን ልብ ይከፍታሉ፤ ግን ብዙ ጊዜ «ለሕይወቴ ምን ማለት ነው?» እያሉ ይዘጉታል። ማንበብ ብቻ ሳይሆን መረዳትና መኖር ይፈልጋሉ።'], g: ['A hunger for truth and the humility to learn.', 'የእውነት ረሃብና ለመማር ትሕትና።'], e: ['Depending only on others to explain Scripture, or reading in a rush without stopping to ask and apply.', 'መጽሐፍ ቅዱስን በሌሎች ማብራሪያ ላይ ብቻ መደገፍ፣ ወይም ቆም ብሎ ሳይጠይቁና ሳይተገብሩ በችኮላ ማንበብ።'], w: ['Studying and Interpreting the Bible teaches the OIA and SOAP methods so you can understand Scripture for yourself.', '«መጽሐፍ ቅዱስን ማጥናት እና መተርጎም» ቃሉን በራስዎ እንዲረዱ የ OIA እና SOAP ዘዴዎችን ያስተምራል።'] },
  dreams: { t: ['The Night Listener', 'ሌሊት የሚያዳምጥ'], s: ['God may speak to you in the quiet of the night. You feel the weight of what you saw but not the meaning. You are not strange. You are listening.', 'እግዚአብሔር በሌሊት ጸጥታ ሊናገርዎ ይችላል። ያዩትን ክብደት ይሰማዎታል እንጂ ትርጉሙን አያውቁም። እንግዳ አይደሉም፤ እያዳመጡ ነው።'], g: ['Spiritual sensitivity. You notice what others sleep through.', 'መንፈሳዊ ስሜታዊነት። ሌሎች የሚያልፉትን ያስተውላሉ።'], e: ['Reading every dream as a command, or fearing before you test it against Scripture.', 'ሁሉንም ሕልም እንደ ትእዛዝ ማንበብ፣ ወይም በመጽሐፍ ቅዱስ ሳይመዝኑ መፍራት።'], w: ['100 Dreams and Their Biblical Meanings explains dream symbols through Scripture so you can read them with wisdom.', '«100 ሕልሞች እና መጽሐፍ ቅዱሳዊ ፍቺዎቻቸው» ሕልሞችን በጥበብ እንዲያነቡ በመጽሐፍ ቅዱስ ይተነትናል።'] },
  telegram: { t: ['The Digital Shepherd', 'ዲጂታል እረኛ'], s: ['You see the phone in your hand not as a toy but as a pulpit. You believe distance and borders should not stop the Word, and you want to gather people around it.', 'በእጅዎ ያለውን ስልክ እንደ መጫወቻ ሳይሆን እንደ መድረክ ያዩታል። ርቀትና ድንበር ቃሉን ሊያግዱ እንደማይገባ ያምናሉ፤ ሰዎችን በዙሪያው መሰብሰብም ይፈልጋሉ።'], g: ['Initiative and a heart to gather people.', 'ተነሳሽነትና ሰዎችን የመሰብሰብ ልብ።'], e: ['Starting groups with energy, then struggling to keep them alive with structure and care.', 'ቡድኖችን በጉልበት መጀመርና በአደረጃጀትና በእንክብካቤ ሕያው አድርጎ ማቆየት መቸገር።'], w: ['Studying the Bible on Telegram is a step-by-step guide to starting a living, effective Bible study group.', '«መጽሐፍ ቅዱስን በቴሌግራም የማጥናት ጥበብና መምሪያ» ሕያውና ውጤታማ የጥናት ቡድን ለመጀመር ደረጃ በደረጃ ይመራል።'] },
  sigara: { t: ['The One Who Wants to Break Free', 'ነጻ መውጣት የሚፈልግ'], s: ['You have tried more than once, and each fall makes it harder to believe again. But someone who keeps trying has not given up on himself. Your problem is not a weak will. It is not yet knowing the right way out.', 'ከአንድ ጊዜ በላይ ሞክረዋል፤ እያንዳንዱ ውድቀት እንደገና ማመንን ያከብዳል። ነገር ግን መሞከሩን የማያቆም ሰው በራሱ ተስፋ አልቆረጠም። ችግሩ ደካማ ፈቃድ ሳይሆን ትክክለኛውን መውጫ ገና አለማወቅ ነው።'], g: ['Resilience. You get back up after you fall.', 'መቋቋም። ከወደቁ በኋላ ተመልሰው ይነሳሉ።'], e: ['Believing the lie that you are weak, and fighting the battle alone in body, mind and spirit.', 'ደካማ ነኝ የሚለውን ውሸት ማመንና ጦርነቱን በአካል፣ በአእምሮና በመንፈስ ብቻዎን መዋጋት።'], w: ['How I Escaped Smoking is a true journey with scientific and spiritual keys to full freedom.', '«ከሲጋራ ሱስ እንዴት አመለጥኩ» ወደ ሙሉ ነጻነት የሚያደርሱ ሳይንሳዊና መንፈሳዊ ቁልፎች ያሉት እውነተኛ ጉዞ ነው።'] }
};
const RES_KEY = 'ev_res';
const resList = () => store.get(RES_KEY, []);
function pastHtml() {
  const L = resList().slice(-5).reverse(); if (!L.length) return '';
  return `<div class="past"><h4>${T('Saved results on this device', 'በዚህ መሣሪያ የተቀመጡ ውጤቶች')}</h4><ul>${L.map(r => { const p = PERSONA[r.id], b = BOOK(r.id); if (!p) return ''; return `<li><i>${esc((r.n || '?').charAt(0).toUpperCase())}</i><span><b>${esc(r.n || '—')}</b><small>${T(esc(p.t[0]), esc(p.t[1]))} · ${T(esc(b.en), esc(b.am))}</small></span><time>${new Date(r.ts).toLocaleDateString()}</time></li>`; }).join('')}</ul></div>`;
}
(function quiz() {
  const el = $('#quiz'); let step = -1, ans = [], busy = false;
  function intro() {
    step = -1; ans = [];
    el.innerHTML = `<div class="intro"><h3>${T('Who are you, really, right now?', 'አሁን በእውነት ማን ነዎት?')}</h3>
      <p>${T('Ten short questions about your nights, your secrets, your fears and your hopes. There are no right answers, and nobody is judging you. Pick the one that is most true today. The more honest you are, the more this will touch you.', 'ስለ ሌሊቶችዎ፣ ምስጢሮችዎ፣ ፍርሃቶችዎና ተስፋዎችዎ አሥር አጫጭር ጥያቄዎች። ትክክለኛ መልስ የለም፤ ማንም አይፈርድብዎትም። ዛሬ በጣም እውነት የሆነውን ይምረጡ። በቅንነት በመለሱ መጠን ይበልጥ ይነካዎታል።')}</p>
      <div class="facts"><span>${T('10 questions', '10 ጥያቄዎች')}</span><span>${T('About 2 minutes', 'ወደ 2 ደቂቃ')}</span><span>${T('Private. Stays on your phone', 'የግል። በስልክዎ ላይ ይቀራል')}</span></div>
      <div><button type="button" class="btn gold big pulse" id="qstart">${T('Start the test', 'ፈተናውን ጀምር')}</button></div>${pastHtml()}</div>`;
    $('#qstart').onclick = () => { step = 0; ask(); };
  }
  function ask(dir) {
    const Q = QUIZ[step];
    el.innerHTML = `<div class="qz-top"><div class="segs" aria-hidden="true">${QUIZ.map((_, i) => `<i class="${i < step ? 'on' : ''}"></i>`).join('')}</div><span class="qz-count">${step + 1}/${QUIZ.length}</span></div>
      <div class="qz-body"><div class="qstep" id="qstep"><h3>${T(esc(Q.q[0]), esc(Q.q[1]))}</h3>
      <div class="opts" role="radiogroup">${Q.o.map((o, i) => `<button type="button" class="opt ${ans[step] === i ? 'sel' : ''}" role="radio" aria-checked="${ans[step] === i}" data-i="${i}"><span class="rad"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#chk"/></svg></span><span>${T(esc(o[0]), esc(o[1]))}</span></button>`).join('')}</div></div></div>
      <div class="qz-foot"><span>${Q.n ? T(esc(Q.n[0]), esc(Q.n[1])) : T('Go with your first instinct.', 'የመጀመሪያውን ስሜትዎን ይከተሉ።')}</span><button type="button" id="qback" ${step ? '' : 'hidden'}>${T('Back', 'ተመለስ')}</button></div>`;
    $('#qback').onclick = () => { if (busy) return; step--; ask(); };
    $$('.opt', el).forEach(b => b.onclick = () => {
      if (busy) return; busy = true; ans[step] = +b.dataset.i;
      $$('.opt', el).forEach(x => { x.classList.remove('sel'); x.setAttribute('aria-checked', 'false'); }); b.classList.add('sel'); b.setAttribute('aria-checked', 'true');
      setTimeout(() => { $('#qstep').classList.add('out'); setTimeout(() => { busy = false; step++; step < QUIZ.length ? ask() : analyse(); }, reduce ? 0 : 300); }, reduce ? 100 : 480);
    });
  }
  function analyse() {
    const lines = [['Reading your answers…', 'መልሶችዎን በማንበብ ላይ…'], ['Weighing what you chose…', 'የመረጡትን በመመዘን ላይ…'], ['Finding the book written for you…', 'ለእርስዎ የተጻፈውን መጽሐፍ በመፈለግ ላይ…']];
    el.innerHTML = `<div class="qz-top"><div class="segs">${QUIZ.map(() => '<i class="on"></i>').join('')}</div><span class="qz-count">${QUIZ.length}/${QUIZ.length}</span></div><div class="scan"><div class="orb"><div class="bx sm" aria-hidden="true"><div class="bx-say"><span>${T('Why am I like this? 🤔','ለምን እንዲህ ነኝ? 🤔')}</span><span>${T('What should I do next?','ቀጥሎ ምን ላድርግ?')}</span><span>${T('Found my book! 🎉','መጽሐፌን አገኘሁ! 🎉')}</span></div><div class="bx-glow"></div><svg viewBox="0 0 200 180" class="bx-svg"><defs><linearGradient id="bxg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE0A0"/><stop offset="1" stop-color="#E8A021"/></linearGradient></defs><g class="bx-rays" stroke="#FFD684" stroke-width="3" stroke-linecap="round"><path d="M100 4v-0M52 30l-8-6M148 30l8-6M34 62l-9-2M166 62l9-2"/></g><g class="bx-cross"><path d="M93 14h14v22h22v14h-22v34H93V50H71V36h22z" fill="url(#bxg)"/></g><path d="M8 150c32-8 68-6 92 10 24-16 60-18 92-10V104c-32-8-68-6-92 10-24-16-60-18-92-10z" fill="#123A5F" stroke="#FFD684" stroke-width="2"/><path d="M14 142c30-6 66-4 86 10V112c-20-14-56-16-86-10z" fill="#fff"/><path d="M186 142c-30-6-66-4-86 10V112c20-14 56-16 86-10z" fill="#F3F7FB"/><g stroke="#9DB4CB" stroke-width="2" stroke-linecap="round"><path d="M26 116c14-2 28-1 40 5M26 126c14-2 28-1 40 5M26 136c14-2 28-1 40 5M174 116c-14-2-28-1-40 5M174 126c-14-2-28-1-40 5"/></g><path class="bx-flap" d="M100 112c20-14 56-16 86-10v40c-30-6-66-4-86 10z" fill="#fff" stroke="#D3DEE9" stroke-width="1"/><path d="M100 112v50" stroke="#C9D6E3" stroke-width="2"/></svg></div></div><p id="scan-t">${T(lines[0][0], lines[0][1])}</p></div>`;
    let k = 0; const t = setInterval(() => { k++; if (k < lines.length) $('#scan-t').innerHTML = T(lines[k][0], lines[k][1]); }, 850);
    setTimeout(() => { clearInterval(t); result(); }, reduce ? 200 : 2700);
  }
  function result() {
    const sc = Object.fromEntries(BOOKS.map(b => [b.id, 0]));
    ans.forEach((a, qi) => Object.entries(QUIZ[qi].o[a][2]).forEach(([k, v]) => sc[k] += v));
    const rank = PRIORITY.slice().sort((a, b) => sc[b] - sc[a] || PRIORITY.indexOf(a) - PRIORITY.indexOf(b));
    const top = rank[0], b = BOOK(top), p = PERSONA[top], mx = sc[top] || 1;
    const rec = { n: store.get('ev_me', ''), id: top, ts: Date.now() }; { const L = resList(); L.push(rec); store.set(RES_KEY, L.slice(-200)); }
    const meHtml = () => rec.n ? `<div class="me-line"><span>${T('Saved for', 'የተቀመጠው ለ')} <b>${esc(rec.n)}</b></span><button type="button" class="lnk" id="me-no">${T('Not you?', 'እርስዎ አይደሉም?')}</button></div>` : `<div class="me-line"><input id="me-in" maxlength="18" autocomplete="nickname" placeholder="${lang() ? 'ስምዎን ያስገቡ' : 'Your name, to save this result'}"><button type="button" class="btn sm gold" id="me-save">${T('Save', 'አስቀምጥ')}</button></div>`;
    el.innerHTML = `<div class="res"><div class="bk" style="--glow:${GLOW[top][1]}"><img src="${bimg(top)}" alt="${esc(b.en)} ${esc(b.am)}"></div>
      <div><span class="tag">${T('Your personality right now', 'አሁን ያለዎት ባሕርይ')}</span><p class="warm">${rec.n ? esc(rec.n) + ', ' : ''}${T('thank you for being honest. Here is what your answers say about you.', 'በቅንነት ስለመለሱ እናመሰግናለን። መልሶችዎ ስለ እርስዎ የሚሉት ይህ ነው።')}</p><h3>${T(esc(p.t[0]), esc(p.t[1]))}</h3>
      <p>${T(esc(p.s[0]), esc(p.s[1]))}</p>
      <div class="two"><div><b>${T('Your strength', 'ጥንካሬዎ')}</b>${T(esc(p.g[0]), esc(p.g[1]))}</div><div><b>${T('Your weakness', 'ድክመትዎ')}</b>${T(esc(p.e[0]), esc(p.e[1]))}</div></div>
      <p style="color:#fff;font-weight:700;margin-bottom:12px">${T('We recommend ', 'የምንመክርዎ፦ ')}<span style="color:var(--gold)">${T(esc(b.en), esc(b.am))}</span>. ${T(esc(p.w[0]), esc(p.w[1]))}</p>
      <div class="fit">${rank.slice(0, 3).map(id => `<div><span>${T(esc(BOOK(id).en), esc(BOOK(id).am))}</span><i><b data-w="${Math.max(14, Math.round(sc[id] / mx * 100))}"></b></i></div>`).join('')}</div>
      <div class="row"><button type="button" class="btn gold big pulse" data-buy="${top}">${T('Get this book', 'ይህን መጽሐፍ ይግዙ')} · ${etb(b.price)}</button><a class="btn on-night" href="#/books/${top}">${T('Read about it', 'ስለ መጽሐፉ ያንብቡ')}</a></div>
      <div class="row" style="margin-top:12px"><button type="button" class="btn sm on-night" id="qretake">${T('Retake the test', 'ፈተናውን እንደገና ውሰድ')}</button><a class="btn sm on-night" target="_blank" rel="noopener" href="${waLink(`I took the Know Your Personality test on Evangelist Eyu's website. My result: ${p.t[0]} (${p.t[1]}). Recommended book: ${b.en} / ${b.am}.`)}">${T('Share my result', 'ውጤቴን አጋራ')}</a></div>
      <div id="me-slot">${meHtml()}</div><div id="past-slot">${pastHtml()}</div>
      <p class="note-s">${T('This is a reflection to help you choose a book. It is not a medical or psychological diagnosis. Your name and result are remembered in this browser on this device only. Nothing is sent anywhere.', 'ይህ መጽሐፍ እንዲመርጡ የሚረዳ ነጸብራቅ ነው። የሕክምና ወይም የሥነ ልቦና ምርመራ አይደለም። ስምዎና ውጤትዎ በዚህ መሣሪያ በዚህ ብሮውዘር ላይ ብቻ ይታወሳል። ምንም ወደ ሌላ አይላክም።')}</p></div></div>`;
    const bindMe = () => {
      const upd = () => { const L = resList(); const x = L.findIndex(r => r.ts === rec.ts); if (x > -1) { L[x] = rec; store.set(RES_KEY, L); } };
      const sv = $('#me-save'), no = $('#me-no');
      if (sv) sv.onclick = () => { const v = $('#me-in').value.trim().slice(0, 18); if (!v) { $('#me-in').focus(); return; } rec.n = v; store.set('ev_me', v); upd(); $('#me-slot').innerHTML = meHtml(); $('#past-slot').innerHTML = pastHtml(); bindMe(); if (typeof lbRender === 'function') lbRender(); };
      if (no) no.onclick = () => { store.set('ev_me', ''); rec.n = ''; upd(); $('#me-slot').innerHTML = meHtml(); $('#past-slot').innerHTML = pastHtml(); bindMe(); if (typeof lbRender === 'function') lbRender(); };
    };
    bindMe();
    $('#qretake').onclick = intro;
    requestAnimationFrame(() => setTimeout(() => $$('.fit b', el).forEach(x => x.style.width = x.dataset.w + '%'), 120));
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }
  intro();
})();
const todayVerse = VERSES[Math.floor(Date.now() / 864e5) % VERSES.length];
/* ---- day helpers + streak ---- */
const dayKey = (d = new Date()) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const dayNum = k => { const [y, m, d] = k.split('-').map(Number); return Math.round(Date.UTC(y, m - 1, d) / 864e5); };
const K0 = { s: 0, b: 0, l: null, days: [] };
function streakNow() { const d = { ...K0, ...store.get('ev_k', K0) }; if (d.l && dayNum(dayKey()) - dayNum(d.l) > 1) d.s = 0; return d; }
function checkin() {
  const d = streakNow(), t = dayKey(); if (d.l === t) return false;
  d.s = d.l && dayNum(t) - dayNum(d.l) === 1 ? d.s + 1 : 1; d.b = Math.max(d.b, d.s); d.l = t; d.days = [...d.days.slice(-40), t];
  store.set('ev_k', d); renderVerse(); refreshFlame(); return true;
}
function refreshFlame() {
  const d = streakNow(), f = $('#flame'), today = d.l === dayKey();
  $('#flame-n').textContent = d.s; f.classList.toggle('on', d.s > 0 && today); f.classList.toggle('nudge', !today);
  f.title = today ? '' : (lang() ? 'ዛሬ ጥቅስዎን ያንብቡ' : 'Read today’s verse to keep your streak');
}
function renderVerse() {
  const d = streakNow(), t = dayKey(), got = d.l === t, base = dayNum(t);
  const wk = Array.from({ length: 7 }, (_, i) => { const k = dayKey(new Date((base - 6 + i) * 864e5 + 12 * 36e5)); return `<i class="${d.days.includes(k) ? 'on' : ''} ${i === 6 ? 'today' : ''}" aria-hidden="true">${'SMTWTFS'[new Date((base - 6 + i) * 864e5 + 12 * 36e5).getUTCDay()]}</i>`; }).join('');
  const msg = d.s >= 30 ? T('30 days. A giant of faith.', '30 ቀን። የእምነት ግዙፍ።') : d.s >= 7 ? T('A full week. Keep going.', 'ሙሉ ሳምንት። ይቀጥሉ።') : d.s >= 3 ? T('Momentum is building.', 'ግስጋሴ እየጨመረ ነው።') : T('Come back tomorrow to grow it.', 'ለማሳደግ ነገ ይመለሱ።');
  $$('[data-verse]').forEach(el => {
    el.innerHTML = `<div class="vtop"><span>${T('Verse of the day', 'የዛሬ ቃል')}</span><span>${new Date().toLocaleDateString(lang() ? 'am-ET' : 'en-GB', { day: 'numeric', month: 'short' })}</span></div>
    <q>${T(esc(todayVerse.en), esc(todayVerse.am))}</q><cite>${T(esc(todayVerse.ref[0]), esc(todayVerse.ref[1]))}</cite>
    <div class="row"><button type="button" class="btn sm ${got ? 'on-night' : 'gold'}" data-vread ${got ? 'disabled' : ''}>${got ? T('Read today ✓', 'ዛሬ ተነብቧል ✓') : T('I read it today', 'ዛሬ አንብቤአለሁ')}</button><button type="button" class="btn sm on-night" data-vcopy>${T('Copy', 'ቅዳ')}</button><button type="button" class="btn sm on-night" data-vshare>${T('Share', 'አጋራ')}</button></div>
    <div class="vstreak"><span class="big">${d.s}</span><div><b>${T('day streak', 'ቀን ተከታታይ')}</b><small>${got ? msg : T('Tap “I read it today” to count today.', 'ዛሬን ለመቁጠር «ዛሬ አንብቤአለሁ» ይንኩ።')}</small></div><div class="wk" aria-label="Last 7 days">${wk}</div></div>`;
  });
}
function verseText() { const i = lang(); return `“${i ? todayVerse.am : todayVerse.en}” (${todayVerse.ref[i]})`; }
document.addEventListener('click', e => {
  if (e.target.closest('[data-vread]')) { checkin(); return; }
  const c = e.target.closest('[data-vcopy]');
  if (c) {
    const orig = c.innerHTML, t = verseText();
    const ok = () => { c.textContent = lang() ? 'ተቀድቷል' : 'Copied'; setTimeout(() => { c.innerHTML = orig; }, 1800); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(t).then(ok, ok); else { const a = document.createElement('textarea'); a.value = t; document.body.append(a); a.select(); try { document.execCommand('copy'); } catch (x) {} a.remove(); ok(); }
  }
  const s = e.target.closest('[data-vshare]');
  if (s) { const t = verseText(); if (navigator.share) navigator.share({ text: t }).catch(() => {}); else window.open('https://wa.me/?text=' + encodeURIComponent(t), '_blank', 'noopener'); }
});
renderVerse(); refreshFlame();
$('#lang-en').addEventListener('click', renderVerse); $('#lang-am').addEventListener('click', renderVerse);

/* =========================================================
   BIBLE STUDY CHALLENGE: 50 levels, one new level per day
   Level = [reference, hint, [[question, [options], correctIndex] x3]]
   Add more levels by pushing to a track's L array.
   ========================================================= */
const TRACKS = {
  journey: { n: ['Journey through the Bible', 'የመጽሐፍ ቅዱስ ጉዞ'], L: [
    ['Genesis 1', 'Notice what God makes on each day.', [['On which day did God make the sun, moon and stars?', ['Third', 'Fourth', 'Sixth'], 1], ['What did God create on the sixth day?', ['Birds and sea creatures', 'Light', 'Land animals and humankind'], 2], ['What did God do on the seventh day?', ['Rested', 'Sent rain', 'Made Adam'], 0]]],
    ['Genesis 3', 'Follow the conversation in the garden.', [['Who spoke to Eve in the garden?', ['An angel', 'The serpent', 'Adam'], 1], ['Which tree were they told not to eat from?', ['Tree of life', 'Fig tree', 'Tree of the knowledge of good and evil'], 2], ['What did Adam and Eve do after they ate?', ['Hid from God', 'Left the garden at once', 'Built an altar'], 0]]],
    ['Genesis 22', 'Watch Abraham’s obedience and God’s provision.', [['Which son did God ask Abraham to offer?', ['Ishmael', 'Isaac', 'Jacob'], 1], ['What did God provide in place of the son?', ['A lamb from the flock', 'A dove', 'A ram caught in a thicket'], 2], ['What did Abraham say God would provide?', ['A lamb for the burnt offering', 'Rain', 'A servant'], 0]]],
    ['Exodus 14', 'Israel is trapped between Pharaoh and the sea.', [['Which sea did Israel cross?', ['Dead Sea', 'Red Sea', 'Sea of Galilee'], 1], ['What did Moses do at God’s command?', ['Struck the rock', 'Lifted his hands in prayer only', 'Stretched out his hand over the sea'], 2], ['Who pursued Israel?', ['Pharaoh and the Egyptians', 'The Philistines', 'The Amorites'], 0]]],
    ['Psalm 23', 'A short psalm. Read it slowly.', [['“The LORD is my…”', ['King', 'Shepherd', 'Rock'], 1], ['Where does He lead me?', ['Beside still waters', 'Into the city', 'Over the mountains'], 0], ['“I will fear no ___, for You are with me.”', ['Man', 'Hunger', 'Evil'], 2]]],
    ['Joshua 1', 'God commissions a new leader.', [['Who took over from Moses?', ['Caleb', 'Joshua', 'Aaron'], 1], ['“Be strong and of good…”', ['Courage', 'Cheer', 'Health'], 0], ['What must not depart from your mouth?', ['The Book of the Law', 'A song', 'A prayer list'], 0]]],
    ['1 Samuel 17', 'A shepherd boy meets a giant.', [['Who was the giant?', ['Goliath', 'Agag', 'Og'], 0], ['What did David use against him?', ['A spear', 'A sling and a stone', 'A sword'], 1], ['In whose name did David say he came?', ['King Saul', 'His father', 'The LORD of hosts'], 2]]],
    ['Daniel 6', 'Notice what Daniel does three times a day.', [['Where was Daniel thrown?', ['A furnace', 'A den of lions', 'A pit of snakes'], 1], ['Why was he punished?', ['He prayed to his God', 'He stole', 'He refused to work'], 0], ['What shut the lions’ mouths?', ['Daniel’s staff', 'The king’s guards', 'God’s angel'], 2]]],
    ['Matthew 5', 'The Sermon on the Mount begins.', [['Where did Jesus teach this sermon?', ['On a mountain', 'In the temple', 'On a boat'], 0], ['“Blessed are the poor in spirit, for theirs is…”', ['The earth', 'The kingdom of heaven', 'Great reward'], 1], ['“You are the ___ of the earth.”', ['Light', 'Salt', 'Wheat'], 1]]],
    ['Luke 15', 'Three stories about being lost and found.', [['Which of these is NOT a parable in the chapter?', ['The lost sheep', 'The lost coin', 'The sower'], 2], ['What job did the younger son take?', ['Feeding pigs', 'Building walls', 'Fishing'], 0], ['How did the father greet him?', ['Sent him away', 'Ran and embraced him', 'Asked for repayment'], 1]]],
    ['John 3', 'A night-time conversation with a teacher.', [['Who came to Jesus by night?', ['Nicodemus', 'Peter', 'Pilate'], 0], ['What must a person be?', ['Baptised twice', 'Born again', 'Circumcised'], 1], ['God gave His…', ['Only Son', 'Law', 'Angels'], 0]]],
    ['John 8', 'The chapter that changed Eyu’s life.', [['“The truth shall make you…”', ['Rich', 'Wise', 'Free'], 2], ['Jesus said whoever commits sin is…', ['A slave of sin', 'A stranger', 'A fool'], 0], ['“If you abide in My word, you are truly My…”', ['Friends', 'Disciples', 'Servants'], 1]]],
    ['Romans 12', 'Look for what changes: mind, body, community.', [['“Do not be conformed to this…”', ['Age', 'World', 'Law'], 1], ['We are transformed by the renewal of our…', ['Mind', 'Strength', 'Wealth'], 0], ['Present your bodies as a living…', ['Temple', 'Sacrifice', 'Stone'], 1]]],
    ['Philippians 4', 'Paul writes from prison about peace.', [['Be anxious for…', ['Nothing', 'Tomorrow', 'Money'], 0], ['The peace of God surpasses all…', ['Understanding', 'Riches', 'Fear'], 0], ['“I can do all things through Christ who…”', ['Saves me', 'Strengthens me', 'Leads me'], 1]]],
    ['Revelation 21', 'The last pages: a new creation.', [['What will God wipe away?', ['Every tear', 'Every sin only', 'The sea'], 0], ['What does John see?', ['A new heaven and a new earth', 'A new temple in Rome', 'A new mountain'], 0], ['“I am the Alpha and the…”', ['Beginning', 'Omega', 'Way'], 1]]]
  ] },
  wisdom: { n: ['Wisdom for daily life (Proverbs)', 'የዕለት ጥበብ (ምሳሌ)'], L: [
    ['Proverbs 1', 'Where does wisdom begin?', [['The fear of the LORD is the beginning of…', ['Knowledge', 'Wealth', 'Peace'], 0], ['Who despise wisdom and instruction?', ['Kings', 'Fools', 'Children'], 1], ['“If sinners entice you, ___ you not.”', ['Fear', 'Consent', 'Argue'], 1]]],
    ['Proverbs 3', 'Three short commands about trust.', [['“Trust in the LORD with all your…”', ['Heart', 'Money', 'Time'], 0], ['“Lean not on your own…”', ['Strength', 'Understanding', 'Friends'], 1], ['“He shall ___ your paths.”', ['Direct', 'Hide', 'Lengthen'], 0]]],
    ['Proverbs 15', 'Words, joy and the eyes of the LORD.', [['A soft answer turns away…', ['Friends', 'Wrath', 'Hunger'], 1], ['A merry heart does good like…', ['Medicine', 'Bread', 'Gold'], 0], ['The eyes of the LORD are in every place, watching the evil and the…', ['Wise', 'Good', 'Proud'], 1]]],
    ['Proverbs 16', 'Plans, pride and who guides the step.', [['Pride goes before…', ['Honour', 'Destruction', 'Wealth'], 1], ['Commit your works to the LORD and your thoughts will be…', ['Established', 'Forgotten', 'Hidden'], 0], ['A man plans his way, but the LORD…', ['Ignores', 'Directs his steps', 'Removes it'], 1]]],
    ['Proverbs 22', 'Names, children and debt.', [['A good name is better than great…', ['Riches', 'Houses', 'Fame'], 0], ['When he is old, a trained child will not…', ['Forget', 'Depart from it', 'Fear'], 1], ['The borrower is servant to the…', ['King', 'Judge', 'Lender'], 2]]]
  ] }
};
const AMQ={journey:[
['እግዚአብሔር በየቀኑ የሚፈጥረውን ልብ ይበሉ።','እግዚአብሔር ፀሐይን፣ ጨረቃንና ከዋክብትን የፈጠረው በየትኛው ቀን ነው?',['ሦስተኛ','አራተኛ','ስድስተኛ'],'እግዚአብሔር በስድስተኛው ቀን ምን ፈጠረ?',['ወፎችንና የባሕር ፍጥረታትን','ብርሃንን','የምድር እንስሳትንና ሰውን'],'እግዚአብሔር በሰባተኛው ቀን ምን አደረገ?',['ዐረፈ','ዝናብ ላከ','አዳምን ፈጠረ']],
['በገነት የተደረገውን ውይይት ተከተሉ።','በገነት ሔዋንን ያነጋገራት ማን ነው?',['መልአክ','እባብ','አዳም'],'ከየትኛው ዛፍ እንዳይበሉ ተነገራቸው?',['ከሕይወት ዛፍ','ከበለስ ዛፍ','መልካምንና ክፉን ከሚያስታውቀው ዛፍ'],'አዳምና ሔዋን ከበሉ በኋላ ምን አደረጉ?',['ከእግዚአብሔር ተሸሸጉ','ወዲያው ከገነት ወጡ','መሠዊያ ሠሩ']],
['የአብርሃምን ታዛዥነትና የእግዚአብሔርን ዝግጅት ተመልከቱ።','እግዚአብሔር አብርሃምን የትኛውን ልጁን እንዲሠዋ ጠየቀው?',['እስማኤልን','ይስሐቅን','ያዕቆብን'],'እግዚአብሔር በልጁ ፋንታ ምን አዘጋጀ?',['ከመንጋው ግልገል','ርግብ','በቁጥቋጦ የተያዘ በግ'],'አብርሃም እግዚአብሔር ምን እንደሚያዘጋጅ ተናገረ?',['ለሚቃጠል መሥዋዕት ጠቦት','ዝናብ','አገልጋይ']],
['እስራኤል በፈርዖንና በባሕሩ መካከል ተያዘ።','እስራኤል የተሻገረው የትኛውን ባሕር ነው?',['ሙት ባሕር','ቀይ ባሕር','የገሊላ ባሕር'],'ሙሴ በእግዚአብሔር ትእዛዝ ምን አደረገ?',['ዓለቱን መታ','በጸሎት ብቻ እጁን አነሣ','እጁን በባሕሩ ላይ ዘረጋ'],'እስራኤልን ያሳደደው ማን ነው?',['ፈርዖንና ግብጻውያን','ፍልስጥኤማውያን','አሞራውያን']],
['አጭር መዝሙር ነው፤ ቀስ ብለው ያንብቡት።','“እግዚአብሔር ___ ነው።”',['ንጉሤ','እረኛዬ','ዐለቴ'],'ወዴት ይመራኛል?',['ወደ ዕረፍት ውኃ','ወደ ከተማ','በተራሮች ላይ'],'“አንተ ከእኔ ጋር ነህና ___ አልፈራም።”',['ሰውን','ረሃብን','ክፉን']],
['እግዚአብሔር አዲስ መሪ ይሾማል።','ከሙሴ በኋላ የመራው ማን ነው?',['ካሌብ','ኢያሱ','አሮን'],'“ጽና፣ በርታም፤ ___ ይኑርህ።”',['ድፍረት','ደስታ','ጤና'],'ከአፍህ እንዳይለይ የተባለው ምንድን ነው?',['የሕጉ መጽሐፍ','መዝሙር','የጸሎት ዝርዝር']],
['አንድ እረኛ ልጅ ከግዙፍ ጋር ተገናኘ።','ግዙፉ ማን ነበር?',['ጎልያድ','አጋግ','ዓግ'],'ዳዊት በእርሱ ላይ የተጠቀመው ምንድን ነው?',['ጦር','ወንጭፍና ጠጠር','ሰይፍ'],'ዳዊት በማን ስም እንደመጣ ተናገረ?',['በንጉሥ ሳኦል','በአባቱ','በሠራዊት ጌታ በእግዚአብሔር']],
['ዳንኤል በቀን ሦስት ጊዜ የሚያደርገውን ልብ ይበሉ።','ዳንኤል የተጣለው የት ነው?',['በእቶን እሳት','በአንበሶች ጉድጓድ','በእባቦች ጉድጓድ'],'ለምን ተቀጣ?',['ወደ አምላኩ ስለ ጸለየ','ስለ ሰረቀ','ሥራ ስላልሠራ'],'የአንበሶቹን አፍ የዘጋው ምንድን ነው?',['የዳንኤል በትር','የንጉሡ ጠባቂዎች','የእግዚአብሔር መልአክ']],
['የተራራው ስብከት ይጀምራል።','ኢየሱስ ይህን ስብከት ያስተማረው የት ነው?',['በተራራ ላይ','በቤተ መቅደስ','በጀልባ ላይ'],'“በመንፈስ ድሆች ብፁዓን ናቸው፤ የእነርሱ ___ ናትና።”',['ምድር','መንግሥተ ሰማያት','ታላቅ ዋጋ'],'“እናንተ የምድር ___ ናችሁ።”',['ብርሃን','ጨው','ስንዴ']],
['ስለ መጥፋትና መገኘት ሦስት ታሪኮች።','በምዕራፉ ውስጥ የሌለው ምሳሌ የትኛው ነው?',['የጠፋው በግ','የጠፋው ድሪም','ዘሪው'],'ታናሹ ልጅ የተቀጠረበት ሥራ ምንድን ነው?',['እሪያ መጠበቅ','ግንብ መገንባት','ዓሣ ማጥመድ'],'አባቱ እንዴት ተቀበለው?',['አሰናበተው','ሮጦ አቀፈው','ዕዳውን ጠየቀው']],
['ከአንድ መምህር ጋር የሌሊት ውይይት።','ሌሊት ወደ ኢየሱስ የመጣው ማን ነው?',['ኒቆዲሞስ','ጴጥሮስ','ጲላጦስ'],'ሰው ምን መሆን አለበት?',['ሁለት ጊዜ መጠመቅ','ዳግመኛ መወለድ','መገረዝ'],'እግዚአብሔር የሰጠው…',['አንድያ ልጁን','ሕግን','መላእክትን']],
['የኢዮን ሕይወት የለወጠው ምዕራፍ።','“እውነትም ___ ያወጣችኋል።”',['ሀብታም','ጠቢብ','ነጻ'],'ኢየሱስ ኃጢአትን የሚያደርግ ሁሉ ምን ነው አለ?',['የኃጢአት ባሪያ','እንግዳ','ሰነፍ'],'“በቃሌ ብትኖሩ በእውነት ___ ናችሁ።”',['ወዳጆቼ','ደቀ መዛሙርቴ','አገልጋዮቼ']],
['የሚለወጠውን ፈልጉ፤ አእምሮ፣ ሰውነት፣ ማኅበረሰብ።','“ይህንም ___ አትምሰሉ።”',['ዘመን','ዓለም','ሕግ'],'የምንለወጠው የምንታደሰው በየትኛው ነው?',['በአእምሮ','በኃይል','በሀብት'],'ሰውነታችሁን ሕያው ___ አድርጋችሁ አቅርቡ።',['ቤተ መቅደስ','መሥዋዕት','ድንጋይ']],
['ጳውሎስ ከእስር ቤት ስለ ሰላም ይጽፋል።','“ስለ ___ አትጨነቁ።”',['ምንም','ነገ','ገንዘብ'],'“የእግዚአብሔር ሰላም ከሁሉ ___ ይበልጣል።”',['ከአእምሮ','ከሀብት','ከፍርሃት'],'“ሁሉን ማድረግ እችላለሁ፤ ክርስቶስ ___”',['ያድነኛል','ያበረታኛል','ይመራኛል']],
['የመጨረሻዎቹ ገጾች፤ አዲስ ፍጥረት።','እግዚአብሔር ምን ያብሳል?',['እንባን ሁሉ','ኃጢአትን ብቻ','ባሕርን'],'ዮሐንስ ምን አየ?',['አዲስ ሰማይና አዲስ ምድር','በሮም አዲስ ቤተ መቅደስ','አዲስ ተራራ'],'“እኔ አልፋና ___ ነኝ።”',['መጀመሪያ','ዖሜጋ','መንገድ']]
],wisdom:[
['ጥበብ ከየት ይጀምራል?','“እግዚአብሔርን መፍራት የ___ መጀመሪያ ነው።”',['እውቀት','ሀብት','ሰላም'],'ጥበብንና ተግሣጽን የሚንቁ እነማን ናቸው?',['ነገሥታት','ሰነፎች','ልጆች'],'“ኃጢአተኞች ቢያባብሉህ ___ እንዳትል።”',['አልፈራም','እሺ','ልከራከር']],
['ስለ መታመን ሦስት አጫጭር ትእዛዞች።','“በፍጹም ___ በእግዚአብሔር ታመን።”',['ልብህ','ገንዘብህ','ጊዜህ'],'“በራስህ ___ አትደገፍ።”',['ብርታት','ማስተዋል','ወዳጆች'],'“እርሱ መንገድህን ___”',['ያቀናል','ይሰውራል','ያረዝማል']],
['ቃል፣ ደስታና የእግዚአብሔር ዓይኖች።','“የዋህ መልስ ___ ይመልሳል።”',['ወዳጆችን','ቍጣን','ረሃብን'],'“ደስተኛ ልብ እንደ ___ ይጠቅማል።”',['መድኃኒት','እንጀራ','ወርቅ'],'የእግዚአብሔር ዓይኖች ክፉዎችንና ___ ይመለከታሉ።',['ጠቢባንን','ደጎችን','ትዕቢተኞችን']],
['ዕቅድ፣ ትዕቢትና እርምጃን የሚመራው።','“ትዕቢት ከ___ በፊት ይመጣል።”',['ክብር','ጥፋት','ሀብት'],'ሥራህን ለእግዚአብሔር ስጥ፤ አሳብህም…',['ይጸናል','ይረሳል','ይሰወራል'],'ሰው መንገዱን ያቅዳል፤ እግዚአብሔር ግን…',['ችላ ይላል','እርምጃውን ይመራል','ያስወግደዋል']],
['ስም፣ ልጆችና ዕዳ።','መልካም ስም ከብዙ ___ ይሻላል።',['ሀብት','ቤቶች','ዝና'],'ሲያረጅ የተሰለጠነ ልጅ…',['አይረሳውም','ከእርሱ ፈቀቅ አይልም','አይፈራም'],'ተበዳሪ ለ___ ባሪያ ነው።',['ንጉሥ','ዳኛ','አበዳሪ']]
]};
const BN={'Genesis':'ዘፍጥረት','Exodus':'ዘፀአት','Psalm':'መዝሙር','Joshua':'ኢያሱ','1 Samuel':'1ኛ ሳሙኤል','Daniel':'ዳንኤል','Matthew':'ማቴዎስ','Luke':'ሉቃስ','John':'ዮሐንስ','Romans':'ሮሜ','Philippians':'ፊልጵስዩስ','Revelation':'ራእይ','Proverbs':'ምሳሌ'};
const refAm=r=>r.replace(/^(\d )?[A-Za-z]+/,m=>BN[m]||m);
const RF=r=>T(esc(r),esc(refAm(r)));
const AQ=(k,n,i)=>{const a=AMQ[k][n-1];return[a[1+2*i],a[2+2*i]]};

const RANKS = [[0, 'Seeker', 'ፈላጊ'], [60, 'Reader', 'አንባቢ'], [180, 'Disciple', 'ደቀ መዝሙር'], [380, 'Scholar', 'ሊቅ'], [700, 'Elder', 'አባት'], [1100, 'Giant of faith', 'የእምነት ግዙፍ']];
const CH0 = { xp: 0, lv: {}, hist: [] };
const CH = () => ({ ...CH0, ...store.get('ev_ch', CH0) });
const chSave = c => store.set('ev_ch', c);
let chTrack = 'journey', chMode = { m: 'home' }, chTimer = null;
const passed = (c, tr, n) => c.lv[tr + n] && c.lv[tr + n].pass;
function unlocked(c, tr, n) { if (n === 1) return true; const p = c.lv[tr + (n - 1)]; return !!(p && p.pass && p.t < dayKey()); }
function nextLvl(c, tr) { let n = 1; while (passed(c, tr, n)) n++; return n; }
function burst(el) { for (let i = 0; i < 26; i++) { const b = document.createElement('i'); b.className = 'bs'; b.style.cssText = `left:50%;top:40%;background:${['#F0B240', '#8FBCE3', '#17673F', '#FFD684'][i % 4]};--x:${(Math.random() - .5) * 420}px;--y:${-60 + Math.random() * 320}px`; el.append(b); setTimeout(() => b.remove(), 1200); } }
function renderChal() {
  const c = CH(), d = streakNow(), tr = TRACKS[chTrack], t = dayKey();
  const done = Object.values(c.lv).filter(x => x.pass).length;
  const all = Object.values(c.lv), acc = all.length ? Math.round(all.reduce((a, x) => a + x.best, 0) / (all.length * 3) * 100) : 0;
  let ri = 0; RANKS.forEach((r, k) => { if (c.xp >= r[0]) ri = k; }); const nx = RANKS[ri + 1];
  const last = [...c.hist].reverse().find(h => h.t < t);
  $('#ch-top').innerHTML = `<div class="ch-card"><h3>${T('Your progress', 'እድገትዎ')}</h3>
    <div class="ch-stats"><div><b>${c.xp}</b><small>XP</small></div><div><b>${done}</b><small>${T('levels passed', 'ያለፉ ደረጃዎች')}</small></div><div><b>${acc}%</b><small>${T('accuracy', 'ትክክለኛነት')}</small></div></div>
    <p class="rank">${T(RANKS[ri][1], RANKS[ri][2])}${nx ? ` <small style="color:var(--muted);font-weight:600">· ${nx[0] - c.xp} XP ${T('to', 'እስከ')} ${T(nx[1], nx[2])}</small>` : ''}</p>
    <div class="prog" style="margin-top:8px"><i style="width:${nx ? (c.xp - RANKS[ri][0]) / (nx[0] - RANKS[ri][0]) * 100 : 100}%"></i></div>
    ${last ? `<p style="margin-top:12px;color:var(--muted)">${T('Last time', 'ባለፈው')}: ${T(TRACKS[last.tr].n[0], TRACKS[last.tr].n[1])} · ${T('Level', 'ደረጃ')} ${last.n} · <b>${last.s}/3</b> ${last.s >= 2 ? '✓' : ''} (${last.t})</p>` : ''}</div>`;
  const nl = nextLvl(c, chTrack), L = tr.L[nl - 1], open = L && unlocked(c, chTrack, nl);
  const midnight = new Date(); midnight.setHours(24, 0, 0, 0);
  let body;
  if (chMode.m === 'home') {
    const today = !L ? `<h3>${T('You finished every level available.', 'ያሉትን ሁሉ ደረጃዎች ጨርሰዋል።')}</h3><p>${T('More levels are coming. Try the other challenge.', 'ተጨማሪ ደረጃዎች ይመጣሉ። ሌላውን ውድድር ይሞክሩ።')}</p>`
      : open ? `<div><h3>${T('Today: Level', 'ዛሬ፦ ደረጃ')} ${nl} · ${RF(L[0])}</h3><p>${T('Read the chapter, then take a 3-question quiz.', 'ምዕራፉን ያንብቡ፤ ከዚያ ባለ3 ጥያቄ ፈተና ይውሰዱ።')}</p></div><button type="button" class="btn gold big pulse" data-play="${nl}">${T('Start Level', 'ደረጃውን ጀምር')} ${nl}</button>`
      : `<div><h3>${T('Level', 'ደረጃ')} ${nl} ${T('unlocks tomorrow', 'ነገ ይከፈታል')}</h3><p>${T('You passed today’s level. Opens in', 'የዛሬውን ደረጃ አልፈዋል። ይከፈታል በ')} <b id="cd"></b></p></div><span class="urgent"><span class="dot"></span>${T('Come back tomorrow', 'ነገ ይመለሱ')}</span>`;
    body = `<div class="today">${today}</div>
    <div class="lad" role="list">${Array.from({ length: 50 }, (_, k) => { const n = k + 1, lv = c.lv[chTrack + n], has = !!tr.L[k];
      const st = lv && lv.pass ? 'done' : has && n === nl && open ? 'cur' : has && unlocked(c, chTrack, n) ? 'cur' : has ? 'lock' : 'soon';
      return `<button type="button" class="node ${st}" role="listitem" ${has && (st === 'done' || st === 'cur') ? `data-play="${n}"` : 'disabled'} aria-label="${lang() ? 'ደረጃ' : 'Level'} ${n}">${n}${lv && lv.pass ? `<small>${'★'.repeat(lv.best >= 3 ? 3 : 2)}</small>` : ''}</button>`; }).join('')}</div>
    <p style="margin-top:12px;color:var(--muted);font-size:.9rem">${T(`Levels 1 to ${tr.L.length} are open. The rest are being written.`, `ደረጃ 1 እስከ ${tr.L.length} ክፍት ናቸው። የቀሩት እየተዘጋጁ ነው።`)}</p>`;
  } else {
    const n = chMode.n, Lv = tr.L[n - 1], bible = `https://www.biblegateway.com/passage/?search=${encodeURIComponent(Lv[0])}&version=KJV`;
    if (chMode.m === 'read') body = `<div class="pl"><button type="button" class="link" data-home>← ${T('All levels', 'ሁሉም ደረጃዎች')}</button>
      <p style="margin-top:14px;font-weight:800;color:var(--gold-deep)">${T('Level', 'ደረጃ')} ${n} · ${T(tr.n[0], tr.n[1])}</p><p class="ref">${RF(Lv[0])}</p><p class="lead" style="margin-top:6px">${T(esc(Lv[1]),esc(AMQ[chTrack][n-1][0]))}</p>
      <div class="row" style="margin-top:22px"><a class="btn ghost" href="${bible}" target="_blank" rel="noopener">${T('Open the chapter', 'ምዕራፉን ክፈት')}</a><button type="button" class="btn gold big" data-quiz>${T('I have read it · Start quiz', 'አንብቤአለሁ · ፈተናውን ጀምር')}</button></div></div>`;
    if (chMode.m === 'quiz') { const q = Lv[2][chMode.q];
      body = `<div class="pl"><div class="qbar">${Lv[2].map((_, k) => `<i class="${k < chMode.q ? (chMode.r[k] ? 'ok' : 'bad') : k === chMode.q ? 'on' : ''}"></i>`).join('')}</div>
      <p style="font-weight:800;color:var(--muted)">${RF(Lv[0])} · ${chMode.q + 1}/3</p><h3 style="font-size:clamp(1.3rem,2.6vw,1.9rem);margin-top:6px">${T(esc(q[0]),esc(AQ(chTrack,n,chMode.q)[0]))}</h3>
      <div class="qo">${q[1].map((o, k) => `<button type="button" data-ans="${k}">${T(esc(o),esc(AQ(chTrack,n,chMode.q)[1][k]))}</button>`).join('')}</div><div id="qnext"></div></div>`; }
    if (chMode.m === 'res') { const sc = chMode.r.filter(Boolean).length, ok = sc >= 2, nxt = n + 1 <= tr.L.length;
      body = `<div class="pl" style="text-align:center;position:relative"><p style="font-weight:800;color:var(--gold-deep)">${T('Level', 'ደረጃ')} ${n} · ${RF(Lv[0])}</p>
      <div class="stars" style="justify-content:center">${[1, 2, 3].map(k => `<span class="${k <= sc ? 'on' : ''}" style="animation-delay:${k * .2}s">★</span>`).join('')}</div>
      <p class="ref">${sc}/3 · ${Math.round(sc / 3 * 100)}%</p>
      <p class="lead" style="margin:0 auto">${ok ? T(`Level passed. +${chMode.xp} XP. Your streak is safe.`, `ደረጃውን አልፈዋል። +${chMode.xp} XP። ተከታታይ ቀንዎ ተጠብቋል።`) : T('Not yet. Read the chapter again and retry. You need 2 of 3.', 'ገና አይደለም። ምዕራፉን እንደገና አንብበው ይሞክሩ። ከ3 ሁለት ያስፈልጋል።')}</p>
      ${ok ? `<p style="margin-top:10px;color:var(--muted)">${nxt ? T(`Level ${n + 1} unlocks tomorrow.`, `ደረጃ ${n + 1} ነገ ይከፈታል።`) : T('You finished this challenge’s open levels.', 'የዚህ ውድድር ክፍት ደረጃዎችን ጨርሰዋል።')}</p>` : ''}
      <div class="row" style="justify-content:center;margin-top:20px">${ok ? '' : `<button type="button" class="btn gold" data-play="${n}">${T('Try again', 'እንደገና ሞክር')}</button>`}<button type="button" class="btn ghost" data-home>${T('Back to levels', 'ወደ ደረጃዎች')}</button><a class="btn ghost" target="_blank" rel="noopener" href="${waLink(`I scored ${sc}/3 on Level ${n} (${Lv[0]}) of the Bible challenge on Evangelist Eyu’s site!`)}">${T('Share', 'አጋራ')}</a></div></div>`; }
  }
  $('#chal').innerHTML = `<div class="tabs2" role="group" aria-label="Challenge">${Object.entries(TRACKS).map(([k, v]) => `<button type="button" aria-pressed="${k === chTrack}" data-track="${k}">${T(v.n[0], v.n[1])}</button>`).join('')}</div>` + body;
  if (chMode.m === 'res' && chMode.r.filter(Boolean).length >= 2) burst($('#chal'));
  clearInterval(chTimer); const cd = $('#cd');
  if (cd) { const f = () => { const ms = midnight - Date.now(); if (ms <= 0) { renderChal(); return; } const h = Math.floor(ms / 36e5), m = Math.floor(ms % 36e5 / 6e4), sx = Math.floor(ms % 6e4 / 1e3); cd.textContent = `${h}h ${String(m).padStart(2, '0')}m ${String(sx).padStart(2, '0')}s`; }; f(); chTimer = setInterval(f, 1000); }
}
$('#v-grow').addEventListener('click', e => {
  const tk = e.target.closest('[data-track]'); if (tk) { chTrack = tk.dataset.track; chMode = { m: 'home' }; renderChal(); return; }
  if (e.target.closest('[data-home]')) { chMode = { m: 'home' }; renderChal(); return; }
  const pl = e.target.closest('[data-play]'); if (pl) { chMode = { m: 'read', n: +pl.dataset.play }; renderChal(); $('#chal').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); return; }
  if (e.target.closest('[data-quiz]')) { chMode = { m: 'quiz', n: chMode.n, q: 0, r: [] }; renderChal(); return; }
  const a = e.target.closest('[data-ans]');
  if (a && !a.disabled) {
    const Lv = TRACKS[chTrack].L[chMode.n - 1], q = Lv[2][chMode.q], k = +a.dataset.ans, good = k === q[2];
    $$('.qo button').forEach((b, i) => { b.disabled = true; if (i === q[2]) b.classList.add('ok'); else if (i === k) b.classList.add('bad'); });
    chMode.r[chMode.q] = good; const last = chMode.q === Lv[2].length - 1;
    $('#qnext').innerHTML = `<button type="button" class="btn ${good ? '' : 'ghost'}" data-next-q>${good ? T('Correct!', 'ትክክል!') : T('Not quite.', 'አይደለም።')} ${last ? T('See result', 'ውጤት ይመልከቱ') : T('Next question', 'ቀጣይ ጥያቄ')}</button>`; $('[data-next-q]').focus();
  }
  if (e.target.closest('[data-next-q]')) {
    const Lv = TRACKS[chTrack].L[chMode.n - 1];
    if (chMode.q < Lv[2].length - 1) { chMode.q++; renderChal(); return; }
    const c = CH(), sc = chMode.r.filter(Boolean).length, ok = sc >= 2, key = chTrack + chMode.n, old = c.lv[key], t = dayKey();
    let xp = 0; if (ok && !(old && old.pass)) xp = sc * 10 + 20;
    c.lv[key] = { pass: ok || !!(old && old.pass), best: Math.max(sc, old ? old.best : 0), t: ok && !(old && old.pass) ? t : (old ? old.t : t) };
    c.xp += xp; c.hist = [...c.hist.slice(-29), { t, tr: chTrack, n: chMode.n, s: sc }]; chSave(c);
    if (ok) checkin();
    chMode = { m: 'res', n: chMode.n, r: chMode.r, xp }; renderChal();
  }
});
/* ===== LEADERBOARD =====
   Works on this device out of the box. To share one board between everyone,
   paste an API / Google Apps Script URL below (GET returns [{n,xp,s,l,w}], POST accepts one entry). */
const LB_URL = '';
let lbTab = 'xp', lbRemote = [];
const wkNum = () => Math.floor((dayNum(dayKey()) + 3) / 7);
function lbMe() {
  const c = CH(), d = streakNow(), all = Object.values(c.lv);
  let w = store.get('ev_wk', null); if (!w || w.k !== wkNum()) { w = { k: wkNum(), b: c.xp }; store.set('ev_wk', w); }
  return { n: store.get('ev_me', ''), xp: c.xp, s: Math.max(d.b, d.s), l: all.filter(x => x.pass).length, w: c.xp - w.b, perfect: all.some(x => x.best >= 3), shared: !!store.get('ev_sh', 0) };
}
const BADGES = [
  ['🌱', 'First step', 'የመጀመሪያ እርምጃ', m => m.l >= 1], ['🔥', '3-day streak', '3 ቀን ተከታታይ', m => m.s >= 3],
  ['📖', '5 levels', '5 ደረጃዎች', m => m.l >= 5], ['⭐', 'Perfect score', 'ሙሉ ውጤት', m => m.perfect],
  ['🕊️', 'Encourager', 'አበረታች', m => m.shared], ['👑', 'Faithful', 'ታማኝ', m => m.xp >= 380]
];
function lbPull() {
  if (!LB_URL) return;
  const m = lbMe(); if (m.n) fetch(LB_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify({ n: m.n, xp: m.xp, s: m.s, l: m.l, w: m.w }) }).catch(() => {});
  fetch(LB_URL).then(r => r.json()).then(a => { if (Array.isArray(a)) { lbRemote = a; lbRender(); } }).catch(() => {});
}
function lbRemember(list) {
  const c = store.get('ev_board', {});
  list.forEach(r => { if (!r || !r.n) return; const n = String(r.n).slice(0, 18), o = c[n] || { n, xp: 0, s: 0, l: 0, w: 0 };
    c[n] = { n, xp: Math.max(o.xp, +r.xp || 0), s: Math.max(o.s, +r.s || 0), l: Math.max(o.l, +r.l || 0), w: Math.max(o.w, +r.w || 0) }; });
  store.set('ev_board', c);
}
function lbRender() {
  const box = $('#lboard'); if (!box) return;
  const m = lbMe(), key = { xp: 'xp', streak: 's', week: 'w' }[lbTab];
  lbRemember(lbRemote); if (m.n) lbRemember([m]);
  const rows = Object.values(store.get('ev_board', {})).filter(r => r && r.n && r.n !== m.n).map(r => ({ n: String(r.n).slice(0, 18), xp: +r.xp || 0, s: +r.s || 0, l: +r.l || 0, w: +r.w || 0 }));
  if (m.n) rows.push({ ...m, me: true });
  rows.sort((a, b) => b[key] - a[key] || b.xp - a.xp);
  const unit = { xp: 'XP', s: T('days', 'ቀን'), w: 'XP' }[key], top = rows.slice(0, 10), pos = rows.findIndex(r => r.me) + 1;
  const med = ['🥇', '🥈', '🥉'], pod = [1, 0, 2].map(i => rows[i]);
  const tabs = [['xp', 'All-time', 'ጠቅላላ'], ['streak', 'Streak', 'ተከታታይ'], ['week', 'This week', 'በዚህ ሳምንት']];
  box.innerHTML = `<div class="tabs2" role="group" aria-label="Leaderboard">${tabs.map(t => `<button type="button" aria-pressed="${t[0] === lbTab}" data-lbt="${t[0]}">${T(t[1], t[2])}</button>`).join('')}</div>
  ${m.n ? '' : `<div class="lb-join"><label class="fl" for="lb-name">${T('Pick a nickname and join. Anyone can play.', 'ቅጽል ስም ይምረጡና ይቀላቀሉ። ማንም መሳተፍ ይችላል።')}</label><div class="row"><input id="lb-name" maxlength="18" autocomplete="nickname" placeholder="${lang() ? 'ስምዎ' : 'Your name'}"><button type="button" class="btn gold" id="lb-go">${T('Join the board', 'ሰንጠረዡን ይቀላቀሉ')}</button></div><small>${T('Your name and past scores are remembered on this device. No account needed.', 'ስምዎና ያለፉ ውጤቶችዎ በዚህ መሣሪያ ይታወሳሉ። መለያ አያስፈልግም።')}</small></div>`}
  <div class="podium">${pod.map((r, k) => { const rk = [1, 0, 2][k]; return `<div class="pd p${rk + 1} ${r && r.me ? 'me' : ''}"><span class="md">${med[rk]}</span><b>${r ? esc(r.n) : T('Open spot', 'ክፍት ቦታ')}</b><small>${r ? r[key] + ' ' + unit : '—'}</small></div>`; }).join('')}</div>
  <ol class="lb-list">${top.slice(3).map((r, i) => `<li class="${r.me ? 'me' : ''}"><span>${i + 4}</span><b>${esc(r.n)}${r.me ? ' ' + T('(you)', '(እርስዎ)') : ''}</b><em>${r[key]} ${unit}</em></li>`).join('')}</ol>
  ${m.n && pos > 10 ? `<p class="rank">${T('Your rank', 'ደረጃዎ')}: #${pos}</p>` : ''}
  ${rows.length < 4 ? `<p class="lb-hint">${T('Be the first on the podium. Invite a friend, a cell group or your family and climb together.', 'መድረኩ ላይ የመጀመሪያው ይሁኑ። ጓደኛ፣ የሕብረት ቡድን ወይም ቤተሰብ ይጋብዙ፤ በአንድነት ይውጡ።')}</p>` : ''}
  <h3 style="margin-top:22px;font-size:1.25rem">${T('Your badges', 'ሜዳሊያዎችዎ')} <small style="color:var(--muted);font-weight:600">· ${T('everyone earns something', 'ሁሉም የሚያገኘው አለ')}</small></h3>
  <div class="bdg">${BADGES.map(b => `<div class="${b[3](m) ? 'got' : ''}"><span>${b[0]}</span><small>${T(b[1], b[2])}</small></div>`).join('')}</div>
  <div class="row" style="margin-top:18px"><button type="button" class="btn" id="lb-share">${T('Invite friends', 'ጓደኞችን ጋብዙ')}</button></div>`;
}
$('#lboard').addEventListener('click', e => {
  const t = e.target.closest('[data-lbt]'); if (t) { lbTab = t.dataset.lbt; lbRender(); return; }
  if (e.target.closest('#lb-go')) { const v = $('#lb-name').value.trim().slice(0, 18); if (v) { store.set('ev_me', v); lbRender(); lbPull(); } else $('#lb-name').focus(); return; }
  if (e.target.closest('#lb-share')) {
    store.set('ev_sh', 1); const m = lbMe(), url = location.href.split('#')[0] + '#/grow';
    const txt = lang() ? `በወንጌላዊ ኢዮ የመጽሐፍ ቅዱስ ውድድር ${m.xp} XP አለኝ! ይቀላቀሉኝ፦ ${url}` : `I have ${m.xp} XP in Evangelist Eyu's Bible challenge! Join me: ${url}`;
    if (navigator.share) navigator.share({ text: txt }).catch(() => {}); else window.open(waLink(txt), '_blank', 'noopener');
    lbRender();
  }
});
const _rc = renderChal; renderChal = function () { _rc(); lbRender(); lbPull.t = lbPull.t || setTimeout(() => { lbPull.t = 0; lbPull(); }, 1500); };
addEventListener('click', e => { if (e.target.closest('#lang-en,#lang-am')) lbRender(); });
renderChal();


const prayer = $('#prayer'), psend = $('#prayer-send');
function syncPrayer() {
  const v = prayer.value.trim();
  psend.href = v ? waLink('🙏 Prayer request: ' + v) : '#';
  psend.setAttribute('aria-disabled', v ? 'false' : 'true');
  psend.style.opacity = v ? '' : '.5';
}
prayer.addEventListener('input', syncPrayer);
psend.addEventListener('click', e => { if (!prayer.value.trim()) { e.preventDefault(); prayer.focus(); } });
syncPrayer();
$('#invite-link').href = waLink('Hello Evangelist Eyu, I would like to invite you to teach. Topic: … Place: … Date: …');
(function give() {
  const sum = $('#gsum'), inp = $('#amt-in'); let amt = 500;
  const show = () => { sum.innerHTML = amt > 0 ? T(`${amt.toLocaleString()} ETB ≈ ${usd(amt)} USD`, `${amt.toLocaleString()} ብር ≈ ${usd(amt)} USD`) : ''; $('#give-link').href = waLink(`Hello, I have given ${amt > 0 ? amt + ' ETB (' + usd(amt) + ')' : ''} toward the ministry. God bless you.`); };
  $$('#amt button').forEach(b => b.onclick = () => { amt = +b.dataset.a; inp.value = ''; $$('#amt button').forEach(x => x.setAttribute('aria-pressed', x === b)); show(); });
  inp.addEventListener('input', () => { amt = Math.max(0, +inp.value || 0); $$('#amt button').forEach(x => x.setAttribute('aria-pressed', 'false')); show(); });
  $$('[data-copyall]').forEach(b => { const idle = b.innerHTML; b.onclick = () => { const t = b.dataset.copyall; const ok = () => { b.innerHTML = T('Copied ✓', 'ተቀድቷል ✓'); setTimeout(() => b.innerHTML = idle, 1800); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(t).then(ok, ok); else { const a = document.createElement('textarea'); a.value = t; a.style.position = 'fixed'; document.body.append(a); a.select(); try { document.execCommand('copy'); } catch (x) {} a.remove(); ok(); } }; });
  show(); addEventListener('click', e => { if (e.target.closest('#lang-en,#lang-am')) show(); });
})();
$('#yr').textContent = new Date().getFullYear();
$$('.prose').forEach(p => { const k = p.id.replace('prose-', ''); p.innerHTML = AM_NOTE + `<div lang="en">${LEGAL[k]}</div>`; });

/* =========================================================
   ROUTER (hash based, so Back/Forward, refresh and shared links work)
   #/  #/story  #/books  #/books/gize  #/watch  #/grow  #/support  #/contact
   #/privacy  #/terms  #/refund  #/find (jumps to the questionnaire on Home)
   ========================================================= */
/* =========================================================
   ROUTER (hash based: Back/Forward, refresh and shared links work)
   #/  #/story  #/books  #/books/gize  #/watch  #/grow  #/support  #/contact
   #/privacy  #/terms  #/refund  #/find  #/training (both jump to a section on Home)
   ========================================================= */
const VIEWS = ['home','story','books','book','watch','grow','support','contact','privacy','terms','refund'];
const menu = $('#menu'), burger = $('#burger'), curtain = $('#curtain'), readbar = $('#readbar');
function viewTitle(v) {
  if (v.id === 'v-book') { const b = BOOK(location.hash.split('/')[2]); return b ? `${pick([b.en, b.am])} · Evangelist Eyu` : 'Evangelist Eyu'; }
  return v.dataset.title || 'Evangelist Eyu';
}
function setMenu(open) {
  if (open) { const hd = document.querySelector('.site-header'); menu.style.top = Math.max(0, hd.getBoundingClientRect().bottom) + 'px'; }
  menu.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  document.body.style.overflow = open ? 'hidden' : '';
}
burger.onclick = () => setMenu(!menu.classList.contains('open'));
addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); burger.focus(); } });
menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
addEventListener('orientationchange', () => setMenu(false));
matchMedia('(min-width:981px)').addEventListener('change', e => { if (e.matches) setMenu(false); });
function updateReadbar() {
  const v = $('.view.active'); if (!v || v.id !== 'v-story') { readbar.style.display = 'none'; return; }
  readbar.style.display = 'block';
  const h = document.documentElement.scrollHeight - innerHeight;
  readbar.style.width = (h > 0 ? scrollY / h * 100 : 0) + '%';
}
addEventListener('scroll', updateReadbar, { passive: true });

let firstRoute = true;
function show(name, jump, navKey) {
  $$('.view').forEach(v => v.classList.toggle('active', v.id === 'v-' + name));
  const v = $('#v-' + name);
  $$('[data-nav]').forEach(a => { if (a.dataset.nav === navKey) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
  document.title = viewTitle(v);
  setMenu(false);
  watch(v);
  if (jump && $('#' + jump)) { $('#' + jump).scrollIntoView({ block: 'start', behavior: 'instant' }); }
  else { window.scrollTo({ top: 0, behavior: 'instant' }); v.focus({ preventScroll: true }); }
  updateReadbar();
}
function route() {
  const raw = location.hash.replace(/^#\/?/, '').replace(/\/+$/, ''), parts = raw.split('/'), a = parts[0], b = parts[1];
  if (raw && ![...VIEWS, 'find', 'training'].includes(a)) { if (document.getElementById(raw)) return; }
  let name = a || 'home', jump = null, navKey = name;
  if (a === 'find' || a === 'training') { name = 'home'; jump = a; navKey = a; }
  if (a === 'books' && b) { name = 'book'; navKey = 'books'; }
  if (!VIEWS.includes(name)) { name = 'home'; navKey = 'home'; }
  if (name === 'book') { if (!BOOK(b)) { location.replace('#/books'); return; } renderBook(b); }
  const cur = $('.view.active');
  if (cur && cur.id === 'v-' + name && name === 'home') {   /* same page: just glide to the section */
    $$('[data-nav]').forEach(x => { if (x.dataset.nav === navKey) x.setAttribute('aria-current', 'page'); else x.removeAttribute('aria-current'); });
    setMenu(false);
    const t = jump ? $('#' + jump) : null; if (t) t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); else window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    return;
  }
  if (firstRoute || reduce || matchMedia('(max-width:980px)').matches) { firstRoute = false; show(name, jump, navKey); return; }
  curtain.className = 'curtain in';
  setTimeout(() => { show(name, jump, navKey); curtain.className = 'curtain out'; setTimeout(() => { curtain.className = 'curtain'; }, 520); }, 340);
}
addEventListener('hashchange', route);
$('.skip').addEventListener('click', e => { e.preventDefault(); const v = $('.view.active'); if (v) v.focus(); window.scrollTo(0, $('#main').offsetTop); });
document.documentElement.classList.add('js');
route();
watch();

