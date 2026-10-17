// Page titles and descriptions for search engines and link previews, per language.
// Employer pages exist in all languages; worker pages (jobseekers, countries) only in en/ru/uz.
export const SITE_URL = "https://onegroup.uz";
export const EMPLOYER_LANGS = ["en", "bg", "me", "ru", "uz"];
export const WORKER_LANGS = ["en", "ru", "uz"];

export const seo = {
  home: {
    en: { title: "Workers from Uzbekistan for European Employers | OneJobs", description: "Licensed agency supplying verified, document-ready workers from Uzbekistan for construction, hotels, farms, and transport in Bulgaria, Montenegro, Croatia, Germany, and Turkey. Shortlist in 7–14 days." },
    bg: { title: "Работници от Узбекистан за работодатели в България и Европа | OneJobs", description: "Лицензирана агенция: проверени работници от Узбекистан с готови документи за строителство, хотели, селско стопанство и транспорт. Кандидати за 7–14 дни." },
    me: { title: "Radnici iz Uzbekistana za poslodavce u Crnoj Gori i Evropi | OneJobs", description: "Licencirana agencija: provjereni radnici iz Uzbekistana sa spremnom dokumentacijom za građevinu, hotele, poljoprivredu i transport. Kandidati za 7–14 dana." },
    ru: { title: "Работники из Узбекистана для работодателей в Европе | OneJobs", description: "Лицензированное агентство: проверенные работники из Узбекистана с готовыми документами для строительства, отелей, сельского хозяйства и транспорта. Шорт-лист за 7–14 дней." },
    uz: { title: "Yevropa ish beruvchilari uchun Oʻzbekistondan ishchilar | OneJobs", description: "Litsenziyali agentlik: qurilish, mehmonxona, qishloq xoʻjaligi va transport uchun tekshirilgan, hujjatlari tayyor ishchilar. Nomzodlar 7–14 kunda." },
  },
  employers: {
    en: { title: "Hire Workers from Uzbekistan — For Employers | OneJobs", description: "How we recruit, screen, and deliver workers from Uzbekistan: sectors, process, permits, visas, and free worker replacement. Request workers online." },
    bg: { title: "Наемане на работници от Узбекистан — за работодатели | OneJobs", description: "Как подбираме и изпращаме работници от Узбекистан: сектори, процес, разрешения за работа, визи и безплатна замяна на работник. Заявете работници онлайн." },
    me: { title: "Zapošljavanje radnika iz Uzbekistana — za poslodavce | OneJobs", description: "Kako biramo i šaljemo radnike iz Uzbekistana: sektori, proces, radne dozvole, vize i besplatna zamjena radnika. Zatražite radnike online." },
    ru: { title: "Найм работников из Узбекистана — работодателям | OneJobs", description: "Как мы подбираем и направляем работников из Узбекистана: отрасли, процесс, разрешения, визы и бесплатная замена работника. Запросите работников онлайн." },
    uz: { title: "Oʻzbekistondan ishchi yollash — ish beruvchilarga | OneJobs", description: "Oʻzbekistondan ishchilarni qanday tanlab yuboramiz: sohalar, jarayon, ruxsatnomalar, vizalar va ishchini bepul almashtirish." },
  },
  agencies: {
    en: { title: "Partnerships for Recruitment Agencies | OneJobs", description: "Share job orders, refer candidates, or white-label our recruitment from Uzbekistan. Partnership models for licensed agencies." },
    bg: { title: "Партньорство за агенции за подбор | OneJobs", description: "Споделяйте заявки, препращайте кандидати или използвайте нашия подбор от Узбекистан под своя марка. Модели за лицензирани агенции." },
    me: { title: "Saradnja za agencije za zapošljavanje | OneJobs", description: "Dijelite zahtjeve, preporučujte kandidate ili koristite naše zapošljavanje iz Uzbekistana pod svojim brendom. Modeli za licencirane agencije." },
    ru: { title: "Партнёрство для кадровых агентств | OneJobs", description: "Обмен заявками, передача кандидатов или white-label подбор из Узбекистана. Модели сотрудничества для лицензированных агентств." },
    uz: { title: "Rekruting agentliklari uchun hamkorlik | OneJobs", description: "Buyurtmalar almashinuvi, nomzodlarni yuborish yoki Oʻzbekistondan rekrutingni oʻz brendingiz ostida. Litsenziyali agentliklar uchun." },
  },
  jobseekers: {
    en: { title: "Jobs Abroad for Workers from Uzbekistan | OneJobs", description: "Official jobs in Bulgaria, Montenegro, Germany, Turkey, and Croatia. Current vacancies, documents, visa, and travel support." },
    ru: { title: "Работа за рубежом для граждан Узбекистана | OneJobs", description: "Официальная работа в Болгарии, Черногории, Германии, Турции и Хорватии. Актуальные вакансии, документы, визы и дорога." },
    uz: { title: "Xorijda ish — Bolgariya, Chernogoriya, Germaniya, Turkiya, Xorvatiya | OneJobs", description: "Rasmiy ish oʻrinlari, hozirgi vakansiyalar, hujjatlar, viza va yoʻl boʻyicha yordam." },
  },
  countries: {
    en: { title: "Countries We Send Workers To | OneJobs", description: "Bulgaria, Montenegro, Germany, Turkey, and Croatia: salaries, visas, housing, and current vacancies." },
    ru: { title: "Страны трудоустройства | OneJobs", description: "Болгария, Черногория, Германия, Турция и Хорватия: зарплаты, визы, жильё и актуальные вакансии." },
    uz: { title: "Ishchi yuboradigan davlatlarimiz | OneJobs", description: "Bolgariya, Chernogoriya, Germaniya, Turkiya va Xorvatiya: maosh, viza, turar joy va vakansiyalar." },
  },
  country: {
    en: { title: (n) => `Work in ${n}: Salary, Visa, Vacancies | OneJobs`, description: (n) => `Jobs in ${n} for workers from Uzbekistan: salary range, visa type, housing, requirements, documents, and current vacancies.` },
    ru: { title: (n) => `Работа: ${n} — зарплата, виза, вакансии | OneJobs`, description: (n) => `Работа (${n}) для граждан Узбекистана: зарплата, тип визы, жильё, требования, документы и актуальные вакансии.` },
    uz: { title: (n) => `${n}: maosh, viza, vakansiyalar | OneJobs`, description: (n) => `${n} — Oʻzbekiston fuqarolari uchun ish: maosh, viza turi, turar joy, talablar, hujjatlar va hozirgi vakansiyalar.` },
  },
};
