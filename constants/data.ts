const onboardingSlide = [
  {
    id: "1",
    title: "Campus News & Events",
    description: "Stay fully informed about everything happening around your school. Get real-time updates on announcements, academic schedules, tutorials, departmental news, student union information, and exciting campus events. From seminars and workshops to parties and competitions, never miss out on what matters most to you.",
  },
  {
    id: "2",
    title: "Campus Marketplace",
    description: "Buy directly from trusted campus and off-campus vendors offering food, fashion, gadgets, and everyday essentials. Easily browse products, connect with sellers nearby, and enjoy the convenience of shopping within your campus community. Support student entrepreneurs while saving time and stress.",
  },
  {
    id: "3",
    title: "Find & Rent Apartments",
    description: "Easily search for lodges, hostels, shared apartments, and off-campus housing around your school. Browse verified listings, compare prices, view details, and connect directly with landlords or agents. Whether you're looking for a budget-friendly space or something more comfortable, find accommodation that fits your needs without stress.",
  },
  {
    id: "4",
    title: "Connect & Match",
    description: "Build meaningful connections within your school community. Find serious reading partners to boost your academic performance, make new friends who share your interests, or explore relationships in a safe and student-focused environment designed to help you connect authentically.",
  },
  {
    id: "5",
    title: "Handyman & Fixers",
    description: "Need something fixed or set up on campus? Find friendly local handymen for repairs, small jobs, or quick fixes. Browse helpers nearby, book a time, and get things done fast. Support student talent while skipping the stress of doing it yourself.",
  },
  {
    id: "6",
    title: "Advertise on Campus",
    description:
      "Promote your brand, business, or campus event directly to students who matter most. Whether you're launching a product, hosting an event, or growing your hustle, our platform gives you affordable and effective visibility within your school environment.",
  },
  {
    id: "7",
    title: "Buy & Sell Used Items",
    description: "Turn unused items into cash and find great deals from fellow students. Buy and sell fairly-used gadgets, textbooks, furniture, and more within a secure campus-based marketplace. Save money, reduce waste, and trade safely with verified students.",
  },
];

const schools = [
  { 
    state: "Abia", 
    data: [
      { name: "Michael Okpara University of Agriculture Umudike", website: "http://www.mouau.edu.ng", year_est: "1992", symbol: "MOUAU" },
      { name: "Abia State University, Uturu", website: "http://www.absu.edu.ng", year_est: "1981", symbol: "ABSU" },
      { name: "Gregory University, Uturu", website: "http://www.gregoryuniversity.com", year_est: "2012", symbol: "GUU" },
      { name: "Clifford University Owerrinta Abia State", website: "http://www.clifforduni.edu.ng", year_est: "2016", symbol: "CLU" },
      { name: "Spiritan University, Nneochi Abia State", website: "", year_est: "2017", symbol: "SUN" },
      { name: "Abia State Polytechnic, Aba", website: "", year_est: "1992", symbol: "ABIAPOLY" },
      { name: "Covenant Polytechnic, Aba, Abayi, Aba", website: "", year_est: "2010", symbol: "COPOLY" },
      { name: "Temple Gate Polytechnic, Abayi, Osisioma, Aba", website: "", year_est: "2009", symbol: "TGP" },
      { name: "Uma Ukpai Polytechnic, Asaga Ohafia", website: "", year_est: "2017", symbol: "UUP" },
      { name: "Valley View Polytechnic, Ohafia", website: "", year_est: "2016", symbol: "VVP" },
      { name: "College of Education, Arochukwu, Abia", website: "", year_est: "", symbol: "COEA" },
      { name: "Havard Wilson College of Education, Aba", website: "", year_est: "", symbol: "HWCOE" },
      { name: "Diamond College of Education, Aba", website: "", year_est: "", symbol: "DCOE" },
    ]
  },
  { 
    state: "Adamawa", 
    data: [
      { name: "Modibbo Adama University of Technology, Yola", website: "http://www.mautech.edu.ng", year_est: "1981", symbol: "MAUTECH" },
      { name: "Adamawa State University Mubi", website: "http://www.adsu.edu.ng", year_est: "2002", symbol: "ADSU" },
      { name: "American University of Nigeria, Yola", website: "http://www.aun.edu.ng", year_est: "2003", symbol: "AUN" },
      { name: "Federal Polytechnic Mubi, PMB 35 Mubi, Adamawa State", website: "www.federalpolytechnicmubi.edu.ng", year_est: "1979", symbol: "FEDPOM" },
      { name: "Adamawa State Polytechnic, Yola", website: "", year_est: "1991", symbol: "ADPOLY" },
      { name: "Federal College of Education, Yola", website: "", year_est: "", symbol: "FCEY" },
    ]
  },
  { 
    state: "Akwa Ibom", 
    data: [
      { name: "University of Uyo", website: "http://www.uniuyo.edu.ng", year_est: "1991", symbol: "UNIUYO" },
      { name: "Akwa Ibom State University, Ikot Akpaden", website: "http://www.aksu.edu.ng", year_est: "2010", symbol: "AKSU" },
      { name: "Obong University, Obong Ntak", website: "http://www.obonguniversity.net", year_est: "2007", symbol: "OBONGU" },
      { name: "Ritman University, Ikot Ekpene, Akwa Ibom", website: "http://www.ritmanuniversity.edu.ng", year_est: "2015", symbol: "RITMAN" },
      { name: "Federal Polytechnic Ukana, Akwa Ibom State", website: "", year_est: "2014", symbol: "FEDPOUK" },
      { name: "Akwa Ibom State College of Art & Science, Nung Ukim", website: "", year_est: "1997", symbol: "AKSCAS" },
      { name: "Akwa Ibom State Polytechnic, Ikot Osurua, Ikot -Ekpene", website: "", year_est: "1991", symbol: "AKSPOLY" },
      { name: "Heritage Polytechnic, Ikot Udota, Eket, Akwa Ibom State", website: "", year_est: "2010", symbol: "HERIPOLY" },
      { name: "Sure Foundation Polytechnic, Ikot Akai, Ukanafun LGA", website: "", year_est: "2016", symbol: "SFPOLY" },
      { name: "Trinity Polytechnic Uyo", website: "", year_est: "2016", symbol: "TRIPOLY" },
      { name: "Uyo City Polytechnic, Uyo", website: "", year_est: "2014", symbol: "UCITYPOLY" },
      { name: "Akwa Ibom State College of Education, Afahansit", website: "", year_est: "", symbol: "AKSCOE" }
    ]  
  },
  { 
    state: "Anambra", 
    data: [
      { name: "Nnamdi Azikiwe University, Awka", website: "http://www.unizik.edu.ng", year_est: "1992", symbol: "UNIZIK" },
      { name: "Chukwuemeka Odumegwu Ojukwu University, Uli", website: "http://coou.edu.ng", year_est: "2000", symbol: "COOU" },
      { name: "Madonna University, Okija", website: "http://www.madonnauniversity.edu.ng", year_est: "1999", symbol: "MADONNA" },
      { name: "Paul University, Awka - Anambra State", website: "http://www.pauluniversity.edu.ng", year_est: "2009", symbol: "PAULUNI" },
      { name: "Tansian University, Umunya", website: "http://tansianuniversity.edu.ng", year_est: "2007", symbol: "TANSIAN" },
      { name: "Legacy University, Okija Anambra State", website: "http://www.legacyuniversity.edu.ng", year_est: "2016", symbol: "LEGACYU" },
      { name: "Federal Polytechnic Oko, Anambra State", website: "www.federalpolyoko.edu.ng", year_est: "1982", symbol: "FEDPOKO" },
      { name: "Federal College of Education, Umunze", website: "", year_est: "", symbol: "FCEUMZ" },
      { name: "Nwafor Orizu College of Education, Nsugbe", website: "", year_est: "", symbol: "NOCOEN" }
    ]
  },
  { 
    state: "Bauchi", 
    data: [
      { name: "Abubakar Tafawa Balewa University, Bauchi", website: "http://www.atbu.edu.ng", year_est: "1988", symbol: "ATBU" },
      { name: "Bauchi State University, Gadau", website: "http://www.basug.edu.ng", year_est: "2011", symbol: "BASUG" },
      { name: "Federal Polytechnic Bauchi, Bauchi State", website: "www.fptb.edu.ng", year_est: "1979", symbol: "FPTB" },
      { name: "Abubakar Tatari Ali Polytechnic, Bauchi", website: "", year_est: "1988", symbol: "ATAPOLY" },
      { name: "College of Education, Azare", website: "", year_est: "", symbol: "COEAZ" },
      { name: "Bauchi Institute of Arabic & Islamic Studies, Bauchi", website: "", year_est: "", symbol: "BIAIS" }
    ]
  },
  { 
    state: "Bayelsa", 
    data: [
      { name: "Federal University, Otuoke, Bayelsa", website: "http://www.fuotuoke.edu.ng", year_est: "2011", symbol: "FUOTUOKE" },
      { name: "Niger Delta University Yenagoa", website: "http://www.ndu.edu.ng", year_est: "2000", symbol: "NDU" },
      { name: "University of Africa Toru Orua, Bayelsa State", website: "https://www.uat.edu.ng", year_est: "2016", symbol: "UAT" },
      { name: "Federal Polytechnic Ekowe, Bayelsa State", website: "", year_est: "2007", symbol: "FEDEKOWE" },
      { name: "Bayelsa State College of Arts and Science, Elebele, Yenogoa", website: "", year_est: "2002", symbol: "BYSCAS" },
      { name: "Isaac Jasper Boro COE, Sagbama", website: "", year_est: "", symbol: "IJBCOE" }
    ]
  },
  { 
    state: "Benue", 
   data: [
      { name: "University of Agriculture, Makurdi", website: "http://www.uam.edu.ng", year_est: "1988", symbol: "UAM" },
      { name: "Benue State University, Makurdi", website: "http://www.bsum.edu.ng", year_est: "1992", symbol: "BSUM" },
      { name: "University of Mkar, Mkar", website: "http://www.unimkar.edu.ng", year_est: "2005", symbol: "UNIMKAR" },
      { name: "Nigerian Army Institute of Technology and Environmental Science (NAITES) Makurdi", website: "www.naitesmkd.edu.ng", year_est: "1960", symbol: "NAITES" },
      { name: "Benue State Polytechnic, Ugbokolo", website: "", year_est: "1976", symbol: "BENPOLY" },
      { name: "Ashi Polytechnic, Anyiin, Logo Local Government", website: "", year_est: "2018", symbol: "ASHIPOLY" },
      { name: "Fidei Polytechnic, Gboko, Benue State", website: "", year_est: "2007", symbol: "FIDEIPOLY" },
      { name: "Gboko Polytechnic, Gboko, Benue State", website: "", year_est: "2016", symbol: "GBOKOPOLY" },
      { name: "The Polytechnic Otada Adoka, Benue State", website: "", year_est: "2016", symbol: "OTADAPOLY" },
      { name: "Federal College of Education Odugbo", website: "", year_est: "", symbol: "FCEODU" },
      { name: "College of Education, katsina-Ala", website: "", year_est: "", symbol: "COEKALA" },
      { name: "Unity College of Education, Auka Adoka, Benue", website: "", year_est: "", symbol: "UCOEAA" }
    ]
  },
  { 
    state: "Borno", 
    data: [
      { name: "University of Maiduguri", website: "http://www.unimaid.edu.ng", year_est: "1975", symbol: "UNIMAID" },
      { name: "Nigerian Army University Biu", website: "https://naub.edu.ng", year_est: "2018", symbol: "NAUB" },
      { name: "Bornu State University, Maiduguri", website: "", year_est: "2016", symbol: "BOSU" },
      { name: "Ramat Polytechnic, Maiduguri", website: "", year_est: "1976", symbol: "RAMATPOLY" },
      { name: "College of Education, Waka BIU", website: "", year_est: "", symbol: "COEWBIU" },
      { name: "Umar Ibn Ibrahim El-Kanemi College of Education, Science and Technology, Bama", website: "", year_est: "", symbol: "UIIECST" },
      { name: "Kashim Ibrahim College of Educ., Maiduguri", website: "", year_est: "", symbol: "KICOE" }
    ]
  },
  { 
    state: "Cross River", 
    data: [
      { name: "University of Calabar", website: "http://www.unical.edu.ng", year_est: "1975", symbol: "UNICAL" },
      { name: "Cross River State University of Technology, Calabar", website: "http://www.crutech.edu.ng", year_est: "2004", symbol: "CRUTECH" },
      { name: "Arthur Javis University Akpoyubo Cross river State", website: "http://www.arthurjarvisuniversity.edu.ng", year_est: "2016", symbol: "AJU" },
      { name: "Cross River State Institute of Technology And Management, Ugep", website: "", year_est: "2012", symbol: "CRSITM" },
      { name: "Nogak Polytechnic, Ikom, Cross Rivers State", website: "", year_est: "2012", symbol: "NOGAKPOLY" },
      { name: "Federal College of Education, Obudu", website: "", year_est: "", symbol: "FCEOBU" },
      { name: "Cross River State College of Education, Akampa", website: "", year_est: "", symbol: "CRSCOE" }
    ]
  },
  { 
    state: "Delta", 
    data: [
      { name: "Federal University of Petroleum Resources, Effurun", website: "http://www.fupre.edu.ng", year_est: "2007", symbol: "FUPRE" },
      { name: "Nigerian Maritime University Okerenkoko, Delta State", website: "", year_est: "2018", symbol: "NMU" },
      { name: "Delta State University Abraka", website: "http://www.delsu.edu.ng", year_est: "1992", symbol: "DELSU" },
      { name: "Edwin Clark University, Kaigbodo", website: "http://www.edwinclarkuniversity.edu.ng", year_est: "2015", symbol: "ECU" },
      { name: "Micheal & Cecilia Ibru University", website: "http://mciu.edu.ng", year_est: "2015", symbol: "MCIU" },
      { name: "Novena University, Ogume", website: "http://www.novenauniversity.edu.ng", year_est: "2005", symbol: "NOVENA" },
      { name: "Western Delta University, Oghara Delta State", website: "http://wdu.edu.ng", year_est: "2007", symbol: "WDU" },
      { name: "Admiralty University, Ibusa Delta State", website: "http://www.adun.edu.ng", year_est: "2017", symbol: "ADUN" },
      { name: "Petroleum Training Institute Effurun, Delta State", website: "www.pti.edu.ng", year_est: "1972", symbol: "PTI" },
      { name: "Delta State Polytechnic, Ogwashi-Uku", website: "", year_est: "2002", symbol: "DSPU" },
      { name: "Delta State Polytechnic, Otefe-Oghara", website: "", year_est: "2002", symbol: "DSPO" },
      { name: "Delta State Polytechnic, Ozoro", website: "", year_est: "2003", symbol: "DSPOZ" },
      { name: "Calvary Polytechnic, Owa-Oyibo, Delta State", website: "", year_est: "2016", symbol: "CALPOLY" },
      { name: "Federal College of Education (Technical), Asaba", website: "", year_est: "", symbol: "FCETA" },
      { name: "College of Education, Warri", website: "", year_est: "", symbol: "COEW" },
      { name: "Delta State College of Education, Agbor", website: "", year_est: "", symbol: "DSCEA" },
      { name: "Delta State Coll. of Physical Education, Mosogar", website: "", year_est: "", symbol: "DSCPEM" }
    ]
  },
  { 
    state: "Ebonyi", 
    data: [
      { name: "Alex Ekwueme University, Ndufu-Alike, Ebonyi State", website: "http://www.funai.edu.ng", year_est: "2011", symbol: "FUNAI" },
      { name: "Ebonyi State University, Abakaliki", website: "http://www.ebsu.edu.ng", year_est: "2000", symbol: "EBSU" },
      { name: "Evangel University, Akaeze", website: "http://www.evangeluniversity.edu.ng", year_est: "2012", symbol: "EVANGEL" },
      { name: "Akanu Ibiam Federal Polytechnic Unwana, P.M.B 1007, Afikpo, Ebonyi State", website: "www.akanuibiampoly.edu.ng", year_est: "1981", symbol: "AIFPU" },
      { name: "Savanah Institute of Technology, Abakaliki, Ebonyi State", website: "", year_est: "2017", symbol: "SIT" },
      { name: "Ebonyi State College of Education, Ikwo", website: "", year_est: "", symbol: "ESCOE" }
    ]
  },
  { 
    state: "Edo", 
    data: [
      { name: "University of Benin", website: "http://www.uniben.edu.ng", year_est: "1970", symbol: "UNIBEN" },
      { name: "Ambrose Alli University, Ekpoma", website: "http://www.aauekpoma.edu.ng", year_est: "1980", symbol: "AAU" },
      { name: "Edo University Iyamo", website: "http://www.edouniversity.edu.ng", year_est: "2016", symbol: "EDOU" },
      { name: "Benson Idahosa University, Benin City", website: "http://www.idahosauniversity.com", year_est: "2002", symbol: "BIU" },
      { name: "Igbinedion University Okada", website: "http://www.iuokada.edu.ng", year_est: "1999", symbol: "IUO" },
      { name: "Samuel Adegboyega University, Ogwa", website: "http://www.sau.edu.ng", year_est: "2011", symbol: "SAU" },
      { name: "Wellspring University, Evbuobanosa - Edo State", website: "http://www.wellspringuniversity.net", year_est: "2009", symbol: "WUU" },
      { name: "Auchi Polytechnic, Auchi, Edo State", website: "www.auchipoly.edu.ng", year_est: "1973", symbol: "APOLY" },
      { name: "National Institute of Construction Technology Uromi", website: "www.nict.edu.ng", year_est: "2014", symbol: "NICT" },
      { name: "Edo State Institute of Technology and Management, Usen, Benin city", website: "", year_est: "2002", symbol: "ESITM" },
      { name: "Kings Polytechnic, Ubiaja, Edo State", website: "", year_est: "2010", symbol: "KPU" },
      { name: "Lighthouse Polytechnic, Benin City, Edo State", website: "", year_est: "2008", symbol: "LPU" },
      { name: "Shaka Polytechnic, Benin City, Edo State", website: "", year_est: "2013", symbol: "SPU" },
      { name: "College of Education, Ekiadolor-Benin", website: "", year_est: "", symbol: "CEEB" },
      { name: "Edo State College of Education, Igueben", website: "", year_est: "", symbol: "ESCEI" }
    ]
  },
  { 
    state: "Ekiti", 
    data: [
      { name: "Federal University, Oye-Ekiti, Ekiti State", website: "http://www.fuoye.edu.ng", year_est: "2011", symbol: "FUOYE" },
      { name: "Ekiti State University", website: "http://www.eksu.edu.ng", year_est: "1982", symbol: "EKSU" },
      { name: "Afe Babalola University, Ado-Ekiti - Ekiti State", website: "http://www.abuad.edu.ng", year_est: "2009", symbol: "ABUAD" },
      { name: "Federal Polytechnic Ado Ekiti, Ekiti State", website: "www.fedpolyado.edu.ng", year_est: "1977", symbol: "FPAE" },
      { name: "Ajayi Polytechnic Ikere Ekiti, Ekiti State", website: "", year_est: "2017", symbol: "APIE" },
      { name: "Crown Polytechnic, Ado-Ekiti, Odo, Ekiti State", website: "", year_est: "2008", symbol: "CROWE" },
      { name: "College of Education, Ikere-Ekiti", website: "", year_est: "", symbol: "CEIE" }
    ]
  },
  { 
    state: "Enugu", 
    data: [
      { name: "University of Nigeria, Nsukka", website: "http://www.unn.edu.ng", year_est: "1960", symbol: "UNN" },
      { name: "Enugu State University of Science and Technology, Enugu", website: "http://www.esut.edu.ng", year_est: "1982", symbol: "ESUT" },
      { name: "Caritas University, Enugu", website: "http://www.caritasuni.edu.ng", year_est: "2005", symbol: "CARITAS" },
      { name: "Godfrey Okoye University, Ugwuomu-Nike - Enugu State", website: "http://www.gouni.edu.ng", year_est: "2009", symbol: "GOUNI" },
      { name: "Renaissance University, Enugu", website: "http://www.renaissanceuniversityng.com", year_est: "2005", symbol: "RENU" },
      { name: "Coal City University Enugu State", website: "", year_est: "2016", symbol: "CCU" },
      { name: "Institute of Management and Technology, Enugu", website: "", year_est: "1965", symbol: "IMT" },
      { name: "Marist Polytechnic, Umuchigbo, Iji-Nike, Emene", website: "", year_est: "2016", symbol: "MARIST" },
      { name: "Mater Dei Polytechnic", website: "", year_est: "2018", symbol: "MDP" },
      { name: "Our Saviour Institute of Science, Agriculture & Technology, Enugu", website: "", year_est: "1989/1991", symbol: "OSISA" },
      { name: "Federal College of Education, Eha-Amufu", website: "", year_est: "", symbol: "FCEE" },
      { name: "Osisatech College of Education, Enugu", website: "", year_est: "", symbol: "OSISATECH" },
      { name: "Enugu State College of Education, Enugu", website: "", year_est: "", symbol: "ESCE" },
      { name: "Institute of Ecumenical Education, (Thinkers Corner), Enugu", website: "", year_est: "", symbol: "IEE" },
      { name: "OSISA Tech. College of Education, Enugu", website: "", year_est: "", symbol: "OSISA-CE" },
      { name: "African Thinkers Community of Inquiry, Enugu", website: "", year_est: "", symbol: "ATCI" },
      { name: "Peaceland College of Education, Enugu", website: "", year_est: "", symbol: "PEACELAND" },
      { name: "The College of Education, Nsukka", website: "", year_est: "", symbol: "COEN" }
    ]
  },
  { 
    state: "Gombe", 
    data: [
      { name: "Federal University, Kashere, Gombe State", website: "http://www.fukashere.edu.ng", year_est: "2011", symbol: "FUKASHERE" },
      { name: "Gombe State Univeristy, Gombe", website: "http://www.gomsu.org", year_est: "2004", symbol: "GOMSU" },
      { name: "Gombe State University of Science and Technology", website: "", year_est: "2017", symbol: "GSUST" },
      { name: "Federal College of Education (Technical), Gombe", website: "", year_est: "", symbol: "FCETG" }
    ]
  },
  { 
    state: "Imo", 
    data: [
      { name: "Federal University of Technology, Owerri", website: "http://www.futo.edu.ng", year_est: "1980", symbol: "FUTO" },
      { name: "Imo State University, Owerri", website: "http://www.imsu.edu.ng", year_est: "1992", symbol: "IMSU" },
      { name: "Eastern Palm University Ogboko, Imo State", website: "https://www.epu.edu.ng", year_est: "2016", symbol: "EPU" },
      { name: "Hezekiah University, Umudi", website: "http://hezekiah.edu.ng", year_est: "2015", symbol: "HEZUNI" },
      { name: "Federal Polytechnic Nekede, P.M.B 1036, Owerri, Imo State", website: "www.fpno.edu.ng", year_est: "1977", symbol: "FPNO" },
      { name: "Imo State Polytechnic, Umuagwo, Ohaji", website: "", year_est: "1978", symbol: "IMSPOLY" },
      { name: "Alvan Ikoku College of Education, Owerri", website: "", year_est: "", symbol: "AICED" }
    ]
  },
  { 
    state: "Jigawa", 
    data: [
      { name: "Federal University, Dutse, Jigawa State", website: "http://www.fud.edu.ng", year_est: "2011", symbol: "FUD" },
      { name: "Sule Lamido University, Kafin Hausa, Jigawa", website: "http://www.slu.edu.ng", year_est: "2013", symbol: "SLU" },
      { name: "Hussaini Adamu Federal Polytechnic, P.M.B 5004, Kazaure Jigawa State", website: "www.hafedpoly.edu.ng", year_est: "1991", symbol: "HAFEDPOLY" },
      { name: "Binyaminu Usman Polytechnic, Hadejia", website: "", year_est: "2016", symbol: "BUP" },
      { name: "Jigawa State Polytechnic, Dutse", website: "", year_est: "1991/2008", symbol: "JSP" },
      { name: "Jigawa State College of Education, Gumel", website: "", year_est: "", symbol: "JSCOE" }
    ] 
  },
  { 
    state: "Kaduna", 
    data: [ 
      { name: "Ahmadu Bello University, Zaria", website: "http://www.abu.edu.ng", year_est: "1962", symbol: "ABU" },
      { name: "Nigerian Defence Academy Kaduna", website: "http://www.nda.edu.ng", year_est: "1985", symbol: "NDA" },
      { name: "Air Force Institute of Technology, Kaduna", website: "https://afit.edu.ng", year_est: "2018", symbol: "AFIT" },
      { name: "Kaduna State University, Kaduna", website: "http://www.kasu.edu.ng", year_est: "2004", symbol: "KASU" },
      { name: "Kaduna Polytechnic, Kaduna", website: "www.kadunapolytechnic.edu.ng", year_est: "1956", symbol: "KADPOLY" },
      { name: "Nuhu Bamalli Polytechnic, Zaria", website: "", year_est: "1989", symbol: "NBP" },
      { name: "Federal College of Education, Zaria", website: "", year_est: "", symbol: "FCEZ" },
      { name: "Kaduna State College of Education, Gidan-Waya, Kafanchan", website: "", year_est: "", symbol: "KSCOE" },
      { name: "Jama'Atu College of Education (JACE), Kaduna", website: "", year_est: "", symbol: "JACE" }
    ]
  },
  { 
    state: "Kano", 
    data: [
      { name: "Bayero University, Kano", website: "http://www.buk.edu.ng", year_est: "1975", symbol: "BUK" },
      { name: "Nigeria Police Academy Wudil", website: "http://polac.edu.ng", year_est: "2013", symbol: "NPA" },
      { name: "Kano University of Science & Technology, Wudil", website: "http://www.kustportal.edu.ng", year_est: "2000", symbol: "KUST" },
      { name: "Yusuf Maitama Sule University, Kano", website: "http://www.nwu.edu.ng", year_est: "2012", symbol: "YMSU" },
      { name: "Skyline University, Kano", website: "", year_est: "2018", symbol: "SU-K" },
      { name: "Kano State Polytechnic, Kano", website: "", year_est: "1976", symbol: "KSPK" },
      { name: "Federal College of Education, Kano", website: "", year_est: "", symbol: "FC0EK" },
      { name: "Federal College of Education (Technical), Bichi", website: "", year_est: "", symbol: "FCE-TB" },
      { name: "Sa'adatu Rimi College of Education, Kumbotso", website: "", year_est: "", symbol: "SRCOE" }
    ]
  },
  { 
    state: "Katsina", 
    data: [
      { name: "Federal University, Dutsin-Ma, Katsina", website: "http://www.fudutsinma.edu.ng", year_est: "2011", symbol: "FUDMA" },
      { name: "Umar Musa Yar' Adua University, Katsina", website: "http://www.umyu.edu.ng", year_est: "2006", symbol: "UMYU" },
      { name: "Al-Qalam University, Katsina", website: "http://www.auk.edu.ng", year_est: "2005", symbol: "AUK" },
      { name: "Hassan Usman Katsina Polytechnic", website: "", year_est: "1983", symbol: "HUK" },
      { name: "Federal College of Education, Katsina", website: "", year_est: "", symbol: "FCEK" },
      { name: "Isa Kaita College of Education, Dutsin-Ma", website: "", year_est: "", symbol: "IKCOE" }
    ]
  },
  { 
    state: "Kebbi", 
    data: [
      { name: "Federal University, Birnin Kebbi", website: "http://www.fubk.edu.ng", year_est: "2013", symbol: "FUBK" },
      { name: "Kebbi State University of Science and Technology, Aliero", website: "http://www.ksusta.edu.ng", year_est: "2006", symbol: "KSUSTA" },
      { name: "Waziri Umaru Federal Polytechnic, P.M.B. 1034, Birnin Kebbi", website: "www.wufpbk.edu.ng", year_est: "1976", symbol: "WUFPBK" },
      { name: "Adamu Augie College of Education, Argungu", website: "", year_est: "", symbol: "AACOEA" }
    ]
  },
  { 
    state: "Kogi", 
    data: [
      { name: "Federal University, Lokoja, Kogi State", website: "http://www.fulokoja.edu.ng", year_est: "2011", symbol: "FULOKOJA" },
      { name: "Kogi State University, Anyigba", website: "http://www.ksu.edu.ng", year_est: "1999", symbol: "KSU" },
      { name: "Salem University, Lokoja", website: "http://www.salemuniversity.org", year_est: "2007", symbol: "SALEM" },
      { name: "Federal Polytechnic Idah P.M.B 1035, Kogi State", website: "www.fepoda.edu.ng", year_est: "1977", symbol: "FEPOIDA" },
      { name: "Kogi State Polytechnic, Lokoja", website: "", year_est: "1993", symbol: "KSPL" },
      { name: "Prime Polytechnic, Jida Bassa, Ajaokuta, Kogi State", website: "", year_est: "2015", symbol: "PRIMEPOLY" },
      { name: "Federal College of Education, Okene", website: "www.fceokene.edu.ng", year_est: "", symbol: "FCEOKENE" },
      { name: "Kogi State College of Education, Ankpa", website: "", year_est: "", symbol: "KSCOEANKPA" },
      { name: "Kogi State College of Education, Kabba", website: "", year_est: "", symbol: "KSCOEKABBA" }
    ]
  },
  { 
    state: "Kwara", 
    data: [
      { name: "University of Ilorin", website: "http://www.unilorin.edu.ng", year_est: "1975", symbol: "UNILORIN" },
      { name: "Kwara State University, Ilorin", website: "http://www.kwasu.edu.ng", year_est: "2009", symbol: "KWASU" },
      { name: "Al-Hikmah University, Ilorin", website: "https://www.alhikmah.edu.ng", year_est: "2005", symbol: "ALHIKMAH" },
      { name: "Landmark University, Omu-Aran", website: "http://www.lmu.edu.ng", year_est: "2011", symbol: "LMU" },
      { name: "Summit University", website: "http://www.summituniversity.edu.ng", year_est: "2015", symbol: "SUMMIT" },
      { name: "Crown Hill University Eiyenkorin, Kwara State", website: "", year_est: "2016", symbol: "CROWNHILL" },
      { name: "Federal Polytechnic Offa, P.M.B 420, Kwara State", website: "www.fpo.edu.ng", year_est: "1992", symbol: "FPO" },
      { name: "Kwara State Polytechnic, Ilorin", website: "", year_est: "1973", symbol: "KSP" },
      { name: "Lens Polytechnic, Offa, Kwara State", website: "", year_est: "2016", symbol: "LENSPOLY" },
      { name: "The Polytechnic, Igbo-Owu, Kwara State", website: "", year_est: "2015", symbol: "IGBOWU" },
      { name: "Nigerian Army School of Education (NASE), Ilorin", website: "", year_est: "", symbol: "NASE" },
      { name: "Kwara State College of Education, Ilorin", website: "", year_est: "", symbol: "KSCOEILORIN" },
      { name: "Kwara State College of Education, Oro", website: "", year_est: "", symbol: "KSCOEORO" },
      { name: "College of Education (Technical), Lafiagi", website: "", year_est: "", symbol: "CETLAFIAGI" },
      { name: "Muhyideen College of Education, Ilorin", website: "", year_est: "", symbol: "MUHYIDEEN" },
      { name: "College of Education, Offa", website: "", year_est: "", symbol: "COEOFFA" },
      { name: "Kinsey College of Education, Ilorin, Kwara State", website: "", year_est: "", symbol: "KINSEYCOE" }
    ]
  },
  { 
    state: "Lagos", 
    data: [
      { name: "University of Lagos", website: "http://www.unilag.edu.ng", year_est: "1962", symbol: "UNILAG" },
      { name: "Lagos State University, Ojo", website: "http://www.lasu.edu.ng", year_est: "1983", symbol: "LASU" },
      { name: "National Open University of Nigeria, Lagos", website: "http://www.nou.edu.ng", year_est: "2002", symbol: "NOUN" },
      { name: "Caleb University, Lagos", website: "http://www.calebuniversity.edu.ng", year_est: "2007", symbol: "CALEB" },
      { name: "Pan-Atlantic University, Lagos", website: "http://www.pau.edu.ng", year_est: "2002", symbol: "PAU" },
      { name: "Anchor University Ayobo Lagos State", website: "http://www.aul.edu.ng", year_est: "2016", symbol: "AUL" },
      { name: "Eko University of Medical and Health Sciences Ijanikin, Lagos", website: "http://www.ekounivmed.edu.ng", year_est: "2017", symbol: "EKOUNIVMED" },
      { name: "Yaba College of Technology, Yaba, Lagos State", website: "www.yabatech.edu.ng", year_est: "1947", symbol: "YABATECH" },
      { name: "Lagos State University of Science and Technology, Ikorodu", website: "", year_est: "1977", symbol: "LASUSTECH" },
      { name: "Grace Polytechnic, Surulere, Lagos State", website: "", year_est: "1962/1999", symbol: "GRACEPOLY" },
      { name: "Kalac Christal Polytechnic, Sangotedo, Lekki", website: "", year_est: "2014", symbol: "KCPOLY" },
      { name: "Lagos City Polytechnic, Ikeja, Lagos State", website: "", year_est: "1990/1995", symbol: "LCITYPOLY" },
      { name: "Ronik Polytechnic, Ejigbo, Ikeja, Lagos State", website: "", year_est: "2001/2003", symbol: "RONIKPOLY" },
      { name: "Federal College of Education (Technical), Akoka", website: "", year_est: "", symbol: "FCETAKOKA" },
      { name: "Adeniran Ogunsanya College of Education, Otto/Ijanikin", website: "", year_est: "", symbol: "AOCOE" },
      { name: "St. Augustine College of Education (Project Time), Lagos", website: "", year_est: "", symbol: "STACOEP" },
      { name: "Michael Otedola Coll. of Prim. Education, Lagos", website: "", year_est: "", symbol: "MOCPE" },
      { name: "Ansar-Ud-Deen College of Education, Isolo", website: "", year_est: "", symbol: "AUCOE" },
      { name: "St. Augustine College of Education, Akoka", website: "", year_est: "", symbol: "STACOE" },
      { name: "Corner Stone College of Education, Lagos", website: "", year_est: "", symbol: "CSCOE" }
    ]
  },
  { 
    state: "Nasarawa", 
    data: [
      { name: "Federal University, Lafia, Nasarawa State", website: "http://www.fulafia.edu.ng", year_est: "2011", symbol: "FULAFIA" },
      { name: "Nasarawa State University Keffi", website: "http://www.nsuk.edu.ng", year_est: "2002", symbol: "NSUK" },
      { name: "Bingham University, New Karu", website: "http://www.binghamuni.edu.ng", year_est: "2005", symbol: "BINGHAM" },
      { name: "Federal Polytechnic Nasarawa, Nasarawa State", website: "www.fedpolynasarawa.edu.ng", year_est: "1983", symbol: "FPNAS" },
      { name: "Nasarawa State Polytechnic, Lafia", website: "", year_est: "2001", symbol: "NASPOLY" },
      { name: "Al-Hikma Polytechnic, Mararaba Gurku, Karu", website: "", year_est: "2016", symbol: "AHIKMA" },
      { name: "Nacabs Polytechnic, Akwanga, Nasarawa State", website: "", year_est: "2013", symbol: "NACABS" },
      { name: "Nasarrawa State College of Education, Akwanga", website: "", year_est: "", symbol: "NSCOE" },
      { name: "City College of Education, Mararaba, Gurku", website: "", year_est: "", symbol: "CCOE" }
    ]
  },
  { 
    state: "Niger", 
    data: [
      { name: "Federal University of Technology, Minna", website: "http://www.futminna.edu.ng", year_est: "1982", symbol: "FUTMINNA" },
      { name: "Ibrahim Badamasi Babangida University, Lapai", website: "http://www.ibbu.edu.ng", year_est: "2005", symbol: "IBBU" },
      { name: "Federal Polytechnic Bida, P.M.B 55, Niger State", website: "www.fedpolybida.edu.ng", year_est: "1977", symbol: "FPBIDA" },
      { name: "Niger State Polytechnic, Zungeru", website: "", year_est: "1991", symbol: "NIGPOLY" },
      { name: "St. Mary Polytechnic, Kwamba, Suleja, Niger State", website: "", year_est: "2015", symbol: "SMPOLY" },
      { name: "Federal College of Education, Kontagora", website: "", year_est: "", symbol: "FCEKN" },
      { name: "Niger State College of Education, Minna", website: "", year_est: "", symbol: "NSCOE" }
    ]
  },
  { 
    state: "Ogun", 
    data: [
      { name: "Federal University of Agriculture, Abeokuta", website: "http://www.unaab.edu.ng", year_est: "1988", symbol: "FUNAAB" },
      { name: "Olabisi Onabanjo University, Ago Iwoye", website: "http://www.oouagoiwoye.edu.ng", year_est: "1982", symbol: "OOU" },
      { name: "Tai Solarin University of Education Ijebu Ode", website: "http://www.tasued.edu.ng", year_est: "2005", symbol: "TASUED" },
      { name: "Moshood Abiola University of Science and Technology, Abeokuta", website: "", year_est: "2017", symbol: "MAUST" },
      { name: "Babcock University,Ilishan-Remo", website: "http://www.babcock.edu.ng", year_est: "1999", symbol: "BABC" },
      { name: "Bells University of Technology, Otta", website: "http://www.bellsuniversity.org", year_est: "2005", symbol: "BELL" },
      { name: "Chrisland University", website: "http://www.chrislanduniversity.edu.ng", year_est: "2015", symbol: "CHRU" },
      { name: "Covenant University, Ota", website: "http://www.covenantuniversity.edu.ng", year_est: "2002", symbol: "CU" },
      { name: "Crawford University, Igbesa", website: "http://www.crawforduniversity.edu.ng", year_est: "2005", symbol: "CRAW" },
      { name: "Crescent University", website: "http://www.crescent-university.edu.ng", year_est: "2005", symbol: "CRES" },
      { name: "Hallmark University, Ijebi Itele, Ogun", website: "http://www.hallmark.edu.ng", year_est: "2015", symbol: "HMU" },
      { name: "Mcpherson University, Seriki Sotayo, Ajebo", website: "http://www.mcu.edu.ng", year_est: "2012", symbol: "MCU" },
      { name: "Mountain Top University", website: "http://www.mountaintopuniversity.org", year_est: "2015", symbol: "MTU" },
      { name: "Christopher University Mowe", website: "http://www.christopheruniversity.edu.ng", year_est: "2015", symbol: "CHRU2" },
      { name: "Federal Polytechnic Ilaro, Ogun State", website: "www.federalpolyilaro.edu.ng", year_est: "1979", symbol: "FPI" },
      { name: "Abraham Adesanya Polytechnic, Ijebu Igbo", website: "", year_est: "2004", symbol: "AAP" },
      { name: "D.S. Adegbenro ICT Polytechnic, Itori-Ewekoro, Ifo", website: "", year_est: "2004", symbol: "DSA" },
      { name: "Gateway Polytechnic, Isara Ode-Remo, Ogun State", website: "", year_est: "2004", symbol: "GATE" },
      { name: "Ogun State Institute of Technology, Igbesa", website: "", year_est: "2004", symbol: "OSIT" },
      { name: "Ogun State Polytechnic, Ipokia", website: "", year_est: "2017", symbol: "OGPOLY" },
      { name: "Allover Central Polytechnic, Sango Ota", website: "", year_est: "1998/2003", symbol: "ACP" },
      { name: "Landmark Polytechnic, Ado Odo Ota LGA, Ogun State", website: "", year_est: "2018", symbol: "LMP" },
      { name: "Redeemers College of Technology and Management, Mowe, Ogun State", website: "", year_est: "2018", symbol: "RECTEM" },
      { name: "Federal College of Education, Abeokuta", website: "www.fce.abeokuta.edu.ng", year_est: "", symbol: "FCEA" },
      { name: "Tai Solarin College of Education, Ijebu-Ode", website: "", year_est: "", symbol: "TSCOE" },
      { name: "Yewa Central College of Education, Ayetoro", website: "", year_est: "", symbol: "YCCOE" }
    ]
  },
  { 
    state: "Ondo",
    data: [
      { name: "Federal University of Technology, Akure", website: "http://www.futa.edu.ng", year_est: "1981", symbol: "FUTA" },
      { name: "Adekunle Ajasin University, Akungba", website: "http://www.aaua.edu.ng", year_est: "1999", symbol: "AAUA" },
      { name: "Ondo State University of Science and Technology Okitipupa", website: "http://www.osustech.edu.ng", year_est: "2008", symbol: "OSUSTECH" },
      { name: "Ondo State University of Medical Sciences", website: "http://www.unimed.edu.ng", year_est: "2015", symbol: "UNIMED" },
      { name: "Achievers University, Owo", website: "http://www.achievers.edu.ng", year_est: "2007", symbol: "ACHU" },
      { name: "Elizade University, Ilara-Mokin", website: "http://www.elizadeuniversity.edu.ng", year_est: "2012", symbol: "ELIZU" },
      { name: "Southwestern University, Oku Owa", website: "http://www.southwesternuniversity.edu.ng", year_est: "2012", symbol: "SWU" },
      { name: "Wesley University. of Science & Technology, Ondo", website: "http://www.wusto.edu.ng", year_est: "2007", symbol: "WUSTO" },
      { name: "Federal Polytechnic Ile-Oluji, Ondo State", website: "www.fedpolel.edu.ng", year_est: "2016", symbol: "FPI" },
      { name: "Rufus Giwa Polytechnic, Owo", website: "", year_est: "1979", symbol: "RGP" },
      { name: "Best Solution Polytechnic, Akure", website: "", year_est: "2016", symbol: "BSP" },
      { name: "Global Polytechnic, Akure, Ondo State", website: "", year_est: "2016", symbol: "GPOLY" },
      { name: "Adeyemi College of Education, Ondo", website: "", year_est: "", symbol: "ACE" }
    ]
  },
  { 
    state: "Osun", 
    data: [
      { name: "Obafemi Awolowo University, Ile-Ife", website: "http://www.oauife.edu.ng", year_est: "1962", symbol: "OAU" },
      { name: "Osun State University Osogbo", website: "http://www.uniosun.edu.ng", year_est: "2006", symbol: "UNIOSUN" },
      { name: "Adeleke University, Ede", website: "http://www.adelekeuniversity.edu.ng", year_est: "2011", symbol: "AU" },
      { name: "Augustine University", website: "http://www.augustineuniversity.edu.ng", year_est: "2015", symbol: "AUGU" },
      { name: "Bowen University, Iwo", website: "http://www.bowenuniversity-edu.org", year_est: "2001", symbol: "BU" },
      { name: "Fountain University, Oshogbo", website: "http://www.fountainuniversity.edu.ng", year_est: "2007", symbol: "FU" },
      { name: "Joseph Ayo Babalola University, Ikeji-Arakeji", website: "http://www.jabu.edu.ng", year_est: "2006", symbol: "JABU" },
      { name: "Kings University, Ode Omu", website: "http://www.kingsuniversity.edu.ng", year_est: "2015", symbol: "KINGSU" },
      { name: "Oduduwa University, Ipetumodu - Osun State", website: "http://www.oduduwauniversity.edu.ng", year_est: "2009", symbol: "ODUU" },
      { name: "Redeemer's University, Ede", website: "http://www.run.edu.ng", year_est: "2005", symbol: "RUN" },
      { name: "Federal Polytechnic Ede, Osun State", website: "www.federalpolyede.edu.ng", year_est: "1992", symbol: "FPE" },
      { name: "Osun State College of Technology, Esa-Oke", website: "", year_est: "1991", symbol: "OSCOTECH" },
      { name: "Osun State Polytechnic, Iree", website: "", year_est: "1992", symbol: "OSPOLY" },
      { name: "College of Technology, Iresi, Osun State", website: "", year_est: "2014", symbol: "CTI" },
      { name: "Igbajo Polytechnic, Igbajo, Osun State", website: "", year_est: "2009", symbol: "IGBAPOLY" },
      { name: "Interlink Polytechnic, Ijebu-Jesa", website: "", year_est: "2008", symbol: "INTERPOLY" },
      { name: "The Polytechnic, Ile-Ife", website: "", year_est: "1994/1999", symbol: "POLYIFE" },
      { name: "The Polytechnic, Imesi-Ile", website: "", year_est: "2013", symbol: "POLYIMESI" },
      { name: "Wolex Polytechnic, Iwo", website: "", year_est: "1996/1999", symbol: "WOLEX" },
      { name: "Osun State College of Education, Ilesa", website: "", year_est: "", symbol: "OSCOE" },
      { name: "College of Education, Ila-Orangun, Osun State", website: "", year_est: "", symbol: "COEILA" }
    ]
  },
  { 
    state: "Oyo", 
    data: [
      { name: "University of Ibadan", website: "http://www.ui.edu.ng", year_est: "1948", symbol: "UI" },
      { name: "Ladoke Akintola University of Technology, Ogbomoso", website: "http://www.lautech.edu.ng", year_est: "1990", symbol: "LAUTECH" },
      { name: "Oyo State Technical University, Ibadan", website: "https://tech-u.edu.ng", year_est: "2012", symbol: "OYOTECH" },
      { name: "Ajayi Crowther University, Ibadan", website: "http://www.acu.edu.ng", year_est: "2005", symbol: "ACU" },
      { name: "Lead City University, Ibadan", website: "http://www.lcu.edu.ng", year_est: "2005", symbol: "LCU" },
      { name: "Kola Daisi University Ibadan, Oyo State", website: "http://www.koladaisiuniversity.edu.ng", year_est: "2016", symbol: "KDU" },
      { name: "Dominican University Ibadan Oyo State", website: "http://www.dui.edu.ng", year_est: "2016", symbol: "DU" },
      { name: "Precious Cornerstone University, Oyo", website: "", year_est: "2017", symbol: "PCU" },
      { name: "Atiba University Oyo", website: "", year_est: "2017", symbol: "ATIBA" },
      { name: "Ibarapa Polytechnic, Eruwa", website: "", year_est: "2013", symbol: "IBARAPAPOLY" },
      { name: "Oke-Ogun Polytechnic, Shaki", website: "", year_est: "2013", symbol: "OKEGUNPOLY" },
      { name: "The Polytechnic, Ibadan", website: "", year_est: "1970", symbol: "POLYIBADAN" },
      { name: "Bolmor Polytechnic, Dugbe, Ibadan", website: "", year_est: "2015", symbol: "BOLMORPOLY" },
      { name: "Ibadan City Polytechnic, Ibadan, Oyo State", website: "", year_est: "2015", symbol: "ICPOLY" },
      { name: "Saf Polytechnic, Iseyin Oyo State", website: "", year_est: "2018", symbol: "SAFPOLY" },
      { name: "Tower Polytechnic, Ibadan", website: "", year_est: "2010", symbol: "TOWERPOLY" },
      { name: "Federal College of Education (Special), Oyo", website: "www.fceoyo.edu.ng", year_est: "", symbol: "FCEOYO" },
      { name: "Emmanuel Alayande College of Education (EACOED), Oyo", website: "", year_est: "", symbol: "EACOED" },
      { name: "Delar College of Education, Agodi Gate, Ibadan", website: "", year_est: "", symbol: "DELARCOE" },
      { name: "Muftau Olanihun College of Education, Ibadan", website: "", year_est: "", symbol: "MOCOE" }
    ]
  },
  { 
    state: "Plateau", 
    data: [
      { name: "University of Jos", website: "http://www.unijos.edu.ng", year_est: "1975", symbol: "UNIJOS" },
      { name: "Plateau State University Bokkos", website: "http://www.plasu.edu.ng", year_est: "2005", symbol: "PLASU" },
      { name: "Plateau State Polytechnic, Barkin-Ladi, Jos", website: "", year_est: "1978", symbol: "PLASPOLY" },
      { name: "Federal College of Education, Pankshin", website: "", year_est: "", symbol: "FCEPANK" },
      { name: "ECWA College of Education, Jos", website: "", year_est: "", symbol: "ECOEJ" }
    ]
  },
  { 
    state: "Rivers", 
    data: [
      { name: "University of Port-Harcourt", website: "http://www.uniport.edu.ng", year_est: "1975", symbol: "UNIPORT" },
      { name: "Ignatius Ajuru University of Education, Rumuolumeni", website: "http://www.iaue.edu.ng", year_est: "2010", symbol: "IAUE" },
      { name: "River State University", website: "http://www.rsu.edu.ng", year_est: "1979", symbol: "RSU" },
      { name: "Rhema University, Obeama-Asa - Rivers State", website: "http://www.rhemauniversity.edu.ng", year_est: "2009", symbol: "RHEMA" },
      { name: "PAMO University of Medical Sciences, Portharcourt", website: "", year_est: "2017", symbol: "PAMO" },
      { name: "Federal Polytechnic of Oil and Gas Bonny, Rivers State", website: "www.fedpolybonny.edu.ng", year_est: "2014", symbol: "FPOGB" },
      { name: "Ken Sarowiwa Polytechnic, Bori", website: "", year_est: "1988", symbol: "KSPB" },
      { name: "Port-Harcourt Polytechnic, Port-Harcourt", website: "", year_est: "1991", symbol: "PHPOLY" },
      { name: "Eastern Polytechnic, Port Harcourt, Rivers State", website: "", year_est: "2015", symbol: "EASTPOLY" },
      { name: "Federal College of Education (Technical), Omoku", website: "", year_est: "", symbol: "FCETOM" },
      { name: "Rivers College of Education, Rumuolumeni", website: "", year_est: "", symbol: "RCOE" }
    ]
  },
  { 
    state: "Sokoto", 
    data: [
      { name: "Usumanu Danfodiyo University", website: "http://www.udusok.edu.ng", year_est: "1975", symbol: "UDUSOK" },
      { name: "Sokoto State University", website: "http://www.ssu.edu.ng", year_est: "2009", symbol: "SSU" },
      { name: "Umaru Ali Shinkafi Polytechnic, Sokoto", website: "", year_est: "2000", symbol: "UASP" },
      { name: "Shehu Shagari College of Education, Sokoto", website: "", year_est: "", symbol: "SSCOE" }
    ]
  },
  { 
    state: "Taraba", 
    data: [
      { name: "Federal University, Wukari, Taraba State", website: "http://www.fuwukari.edu.ng", year_est: "2011", symbol: "FUWUKARI" },
      { name: "Taraba State University, Jalingo", website: "http://www.tsuniversity.edu.ng", year_est: "2008", symbol: "TSU" },
      { name: "Kwararafa University, Wukari", website: "http://www.wukarijubileeuniversity.org", year_est: "2005", symbol: "KWARUNIV" },
      { name: "Federal Polytechnic Bali, Taraba State", website: "www.fedpobali.edu.ng", year_est: "2007", symbol: "FPBALI" },
      { name: "College of Education, Jalingo", website: "", year_est: "", symbol: "COEJ" }
    ]
  },
  { 
    state: "Yobe", 
    data: [
      { name: "Federal University Gashua, Yobe", website: "http://www.fugashua.edu.ng", year_est: "2013", symbol: "FUGASHUA" },
      { name: "Yobe State University, Damaturu", website: "http://www.ysu.edu.ng", year_est: "2006", symbol: "YSU" },
      { name: "Federal Polytechnic Damaturu, Yobe State", website: "www.fedpodam.edu.ng", year_est: "1993", symbol: "FPDAM" },
      { name: "Mai-Idris Alooma Polytechnic, Geidam", website: "", year_est: "2002", symbol: "MIAP" },
      { name: "Federal College of Education (Tech), Potiskum", website: "fggcpotiskum.sch.ng", year_est: "", symbol: "FCEPT" },
      { name: "College of Education, Gashua, Damaturu", website: "", year_est: "", symbol: "COEGD" }
    ]
  },
  { 
    state: "Zamfara", 
    data: [
      { name: "Federal University, Gusau Zamfara", website: "http://www.fugusau.edu.ng", year_est: "2013", symbol: "FUGUSAU" },
      { name: "Zamfara State University", website: "", year_est: "2018", symbol: "ZSU" },
      { name: "Federal Polytechnic Kaura Namoda, P.M.B, 1012, Zamfara State", website: "www.fedpolykaura.edu.ng", year_est: "1983", symbol: "FPKN" },
      { name: "Abdu Gusau Polytechnic, Talata Mafara", website: "", year_est: "1992", symbol: "AGPTM" },
      { name: "Zamfara State College of Arts and Science, Gusau", website: "", year_est: "2000", symbol: "ZSCAS" },
      { name: "Federal College of Education (Technical), Gusau", website: "", year_est: "", symbol: "FCETG" },
      { name: "Zamfara State College of Education, Maru", website: "", year_est: "", symbol: "ZSCE" }
    ]
  },
  { 
    state: "FCT (Abuja)", 
    data: [
      { name: "University of Abuja, Gwagwalada", website: "http://www.uniabuja.edu.ng", year_est: "1988", symbol: "UNIABUJA" },
      { name: "African University of Science & Technology, Abuja", website: "http://aust.edu.ng", year_est: "2007", symbol: "AUST" },
      { name: "Baze University", website: "http://www.bazeuniversity.edu.ng", year_est: "2011", symbol: "BAZE" },
      { name: "Nile University of Nigeria, Abuja", website: "http://www.ntnu.edu.ng", year_est: "2009", symbol: "NILE" },
      { name: "Veritas University, Abuja", website: "http://www.veritas.edu.ng", year_est: "2007", symbol: "VERITAS" },
      { name: "Citi Polytechnic, Dutse Alhaji, FCT Abuja", website: "", year_est: "2018", symbol: "CITI" },
      { name: "Dorben Polytechnic, Abuja, Bwari", website: "", year_est: "1995/2008", symbol: "DORBEN" },
      { name: "FCT College of Education, Zuba", website: "", year_est: "", symbol: "FCTCE" }
    ]
  }
];

export default { onboardingSlide, schools }
