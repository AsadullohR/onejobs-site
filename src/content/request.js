// "Request workers" form (Netlify form name: job-order). Values sent to Netlify stay in English
// (sector names) so submissions read the same whatever language the employer used.
export const SECTOR_VALUES = ["Construction", "Hotels & restaurants", "Farms & agriculture", "Drivers & machinery", "Other"];

export const request = {
  en: {
    company: "Company", contact: "Your name", email: "Email or WhatsApp", country: "Country of work", countryPh: "e.g. Bulgaria",
    sector: "Sector", sectorPh: "Select a sector…", sectors: ["Construction", "Hotels & restaurants", "Farms & agriculture", "Drivers & machinery", "Other"],
    roles: "Roles and number of workers", rolesPh: "e.g. 10 tilers, 5 helpers", start: "Start date", startPh: "e.g. March 2027",
    details: "Salary, housing, and other details", detailsPh: "Net salary, working hours, accommodation, language needs…",
    submit: "Request Workers →", privacy: "We use your details only to answer this request.",
  },
  bg: {
    company: "Фирма", contact: "Вашето име", email: "Имейл или WhatsApp", country: "Държава на работа", countryPh: "напр. България",
    sector: "Сектор", sectorPh: "Изберете сектор…", sectors: ["Строителство", "Хотели и ресторанти", "Селско стопанство", "Шофьори и техника", "Друго"],
    roles: "Позиции и брой работници", rolesPh: "напр. 10 плочкаджии, 5 общи работници", start: "Начална дата", startPh: "напр. март 2027",
    details: "Заплата, настаняване и други подробности", detailsPh: "Нетна заплата, работно време, настаняване, изисквания за език…",
    submit: "Заявете работници →", privacy: "Използваме данните ви само за да отговорим на тази заявка.",
  },
  me: {
    company: "Kompanija", contact: "Vaše ime", email: "E-mail ili WhatsApp", country: "Država rada", countryPh: "npr. Crna Gora",
    sector: "Sektor", sectorPh: "Izaberite sektor…", sectors: ["Građevina", "Hoteli i restorani", "Poljoprivreda", "Vozači i mašine", "Drugo"],
    roles: "Pozicije i broj radnika", rolesPh: "npr. 10 keramičara, 5 pomoćnih radnika", start: "Datum početka", startPh: "npr. mart 2027.",
    details: "Plata, smještaj i ostali detalji", detailsPh: "Neto plata, radno vrijeme, smještaj, potreban jezik…",
    submit: "Zatražite radnike →", privacy: "Vaše podatke koristimo samo da odgovorimo na ovaj zahtjev.",
  },
  ru: {
    company: "Компания", contact: "Ваше имя", email: "Email или WhatsApp", country: "Страна работы", countryPh: "напр. Болгария",
    sector: "Сфера", sectorPh: "Выберите сферу…", sectors: ["Строительство", "Отели и рестораны", "Сельское хозяйство", "Водители и техника", "Другое"],
    roles: "Позиции и количество работников", rolesPh: "напр. 10 плиточников, 5 разнорабочих", start: "Дата начала", startPh: "напр. март 2027",
    details: "Зарплата, жильё и другие детали", detailsPh: "Зарплата нетто, график, жильё, требования к языку…",
    submit: "Запросить работников →", privacy: "Мы используем ваши данные только для ответа на эту заявку.",
  },
  uz: {
    company: "Kompaniya", contact: "Ismingiz", email: "Email yoki WhatsApp", country: "Ish davlati", countryPh: "masalan, Bolgariya",
    sector: "Soha", sectorPh: "Sohani tanlang…", sectors: ["Qurilish", "Mehmonxona va restoranlar", "Qishloq xoʻjaligi", "Haydovchilar va texnika", "Boshqa"],
    roles: "Lavozimlar va ishchilar soni", rolesPh: "masalan, 10 kafelchi, 5 yordamchi", start: "Boshlanish sanasi", startPh: "masalan, 2027-yil mart",
    details: "Maosh, turar joy va boshqa tafsilotlar", detailsPh: "Sof maosh, ish vaqti, turar joy, til talablari…",
    submit: "Ishchi soʻrash →", privacy: "Maʼlumotlaringizdan faqat shu arizaga javob berish uchun foydalanamiz.",
  },
};
