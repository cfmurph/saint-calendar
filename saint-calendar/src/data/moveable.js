/**
 * Moveable feasts for the 1962 Missale Romanum (Traditional Latin Mass).
 *
 * Notable differences from the Novus Ordo:
 *  - Pre-Lent begins 3 Sundays before Ash Wednesday:
 *      Septuagesima, Sexagesima, Quinquagesima (in Violet)
 *  - Ash Wednesday, Holy Week, Easter Triduum
 *  - Ascension Thursday (always Thursday — never transferred to Sunday)
 *  - Pentecost Vigil is a fully privileged vigil with 6 prophecies
 *  - Holy Trinity Sunday (First Sunday after Pentecost)
 *  - Corpus Christi always on Thursday
 *  - Sacred Heart (Friday after the Octave of Corpus Christi)
 *  - Christ the King on the LAST Sunday of October (not Nov)
 *  - Feast of the Holy Name on the Sunday between Jan 2–5 (or Jan 2)
 *  - Holy Family on the Sunday within the Octave of Epiphany
 *
 * Gregorian Easter algorithm: Meeus/Jones/Butcher.
 */

export function computeEaster(year) {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31)
  const day = ((h + l - 7 * m + 114) % 31) + 1
  return new Date(year, month - 1, day)
}

function addDays(date, n) {
  const d = new Date(date)
  d.setDate(d.getDate() + n)
  return d
}

/** Return the Nth occurrence of a weekday in a given month (1-indexed, 0=Sun) */
function nthWeekdayOfMonth(year, month, weekday, n) {
  const d = new Date(year, month - 1, 1)
  let count = 0
  while (true) {
    if (d.getDay() === weekday) {
      count++
      if (count === n) return new Date(d)
    }
    d.setDate(d.getDate() + 1)
  }
}

/** Last occurrence of a weekday in a month */
function lastWeekdayOfMonth(year, month, weekday) {
  const d = new Date(year, month, 0) // last day of month
  while (d.getDay() !== weekday) d.setDate(d.getDate() - 1)
  return new Date(d)
}

/** Sunday between Jan 2–5, or Jan 2 if none */
function holyNameDate(year) {
  for (let day = 2; day <= 5; day++) {
    const d = new Date(year, 0, day)
    if (d.getDay() === 0) return d
  }
  return new Date(year, 0, 2)
}

/** First Sunday after January 6 */
function holyFamilyDate(year) {
  const d = new Date(year, 0, 7)
  while (d.getDay() !== 0) d.setDate(d.getDate() + 1)
  return new Date(d)
}

const make = (date, id, name, rank, liturgicalColor, holyDayOf, description, wikipedia, icon, note) => ({
  id,
  month: date.getMonth() + 1,
  day: date.getDate(),
  name,
  rank,
  liturgicalColor,
  holyDayOf: holyDayOf || [],
  description,
  wikipedia,
  icon: icon || '✝',
  moveable: true,
  note,
})

export function getMoveableFeasts(year) {
  const easter = computeEaster(year)

  /* ── Pre-Lent ────────────────────────────────────────────────────── */
  const septuagesima  = addDays(easter, -63) // 9 Sundays before Easter
  const sexagesima    = addDays(easter, -56) // 8 Sundays before Easter
  const quinquagesima = addDays(easter, -49) // 7 Sundays before Easter

  /* ── Lent ────────────────────────────────────────────────────────── */
  const ashWednesday = addDays(easter, -46)
  // Ember Days (Wednesday, Friday, Saturday after Ash Wednesday)
  const emberWedLent  = addDays(ashWednesday, 0) // Ash Wednesday IS Wednesday
  const emberFriLent  = addDays(ashWednesday, 2)
  const emberSatLent  = addDays(ashWednesday, 3)

  /* ── Holy Week ───────────────────────────────────────────────────── */
  const passionSunday    = addDays(easter, -14) // 2 Sundays before Easter
  const palmSunday       = addDays(easter, -7)
  const spySpy           = addDays(easter, -4)  // Wednesday of Holy Week
  const holyThursday     = addDays(easter, -3)
  const goodFriday       = addDays(easter, -2)
  const holySaturday     = addDays(easter, -1)

  /* ── Easter season ───────────────────────────────────────────────── */
  const lowSunday       = addDays(easter, 7)   // "Quasimodo" / "in albis"
  const rogationMonday  = addDays(easter, 36)  // Rogation Days Mon–Wed
  const rogationTuesday = addDays(easter, 37)
  const rogationWednesday= addDays(easter, 38)
  const ascension       = addDays(easter, 39)  // Always Thursday
  const pentecostVigil  = addDays(easter, 48)
  const pentecost       = addDays(easter, 49)
  // Ember Days after Pentecost (Wed, Fri, Sat)
  const emberWedPent    = addDays(pentecost, 3)
  const emberFriPent    = addDays(pentecost, 5)
  const emberSatPent    = addDays(pentecost, 6)
  const trinityS        = addDays(easter, 56)
  const corpusChristi   = addDays(easter, 60)  // Always Thursday
  // Ember Days after Holy Cross (Sept) — fixed: Wed/Fri/Sat after Sept 14
  // Sacred Heart: Friday after Octave of Corpus Christi
  const sacredHeart     = addDays(easter, 68)  // Friday, 19 days after Corpus

  /* ── Christ the King (last Sunday of October, 1962 calendar) ─────── */
  const christKing = lastWeekdayOfMonth(year, 10, 0)

  /* ── Holy Name and Holy Family ──────────────────────────────────── */
  const holyName   = holyNameDate(year)
  const holyFamily = holyFamilyDate(year)

  /* ── Gaudete & Laetare (Rose Sundays) — derived from Advent/Lent ── */
  // Advent starts 4 Sundays before Christmas
  // 1st Sunday of Advent
  const christmas = new Date(year, 11, 25)
  let advent1 = new Date(christmas)
  // Find the Sunday on or before Dec 25 then go back 3 more Sundays
  while (advent1.getDay() !== 0) advent1.setDate(advent1.getDate() - 1)
  advent1.setDate(advent1.getDate() - 21) // 3 weeks back = 1st Sunday of Advent
  // If Christmas itself is Sunday, Advent 1 would be Dec 4 — adjust
  // Actually correct algorithm: Sunday nearest Nov 30 (St Andrew's Day)
  const stAndrew = new Date(year, 10, 30)
  advent1 = new Date(stAndrew)
  const stAndrewDay = stAndrew.getDay()
  if (stAndrewDay <= 3) { // Sun=0, Mon=1, Tue=2, Wed=3 → go to previous Sunday
    advent1.setDate(stAndrew.getDate() - stAndrewDay)
    if (stAndrewDay === 0) advent1 = new Date(stAndrew)
  } else { // Thu=4, Fri=5, Sat=6 → go to next Sunday
    advent1.setDate(stAndrew.getDate() + (7 - stAndrewDay))
  }
  const gaudete  = addDays(advent1, 14) // 3rd Sunday of Advent
  const laetare  = addDays(easter, -21) // 4th Sunday of Lent

  const feasts = []

  /* ── Holy Name ────────────────────────────────────────────────────── */
  feasts.push(make(holyName, 'holy-name-moveable',
    'Most Holy Name of Jesus',
    'class-2', 'white', [],
    'The feast of the Holy Name honours the name "Jesus" given to Our Lord at his Circumcision. This Sunday feast is placed between January 2 and 5 — in the first days of the new year — so that the Church begins the year in the adoration of the Holy Name. The IHS monogram (popularised by St Bernardine of Siena) adorns many Jesuit churches.',
    'https://en.wikipedia.org/wiki/Holy_Name_of_Jesus',
    '✨',
    'Sunday between Jan 2–5, or Jan 2 if no Sunday falls in that range.',
  ))

  /* ── Holy Family ───────────────────────────────────────────────────── */
  feasts.push(make(holyFamily, 'holy-family-moveable',
    'Holy Family of Jesus, Mary & Joseph',
    'class-2', 'white', [],
    'Celebrated on the first Sunday after the Epiphany (within the Octave of Epiphany), this feast presents the family at Nazareth as the model of all Christian family life. Jesus, Mary and Joseph lived in poverty, prayer and labour — the school of perfection. Pope Leo XIII instituted the feast; Benedict XV placed it on the universal calendar in 1921.',
    'https://en.wikipedia.org/wiki/Feast_of_the_Holy_Family',
    '👨‍👩‍👦',
    'First Sunday after January 6 (Sunday within the Octave of Epiphany).',
  ))

  /* ── Pre-Lent ─────────────────────────────────────────────────────── */
  feasts.push(make(septuagesima, 'septuagesima',
    'Septuagesima Sunday',
    'class-2', 'violet', [],
    'Septuagesima ("seventy days") begins the three-week Pre-Lenten season of the traditional calendar. Violet vestments are worn, the Gloria and Alleluia are omitted, and the mood turns penitential. Septuagesima falls approximately 70 days before Easter (actually 63). The Pre-Lenten season was abolished in the 1969 reform.',
    'https://en.wikipedia.org/wiki/Septuagesima',
    '🟣',
    'Nine Sundays before Easter.',
  ))

  feasts.push(make(sexagesima, 'sexagesima',
    'Sexagesima Sunday',
    'class-2', 'violet', [],
    'Sexagesima ("sixty days") is the second Sunday of the Pre-Lenten season, approximately 60 days before Easter (actually 56). The Epistle (2 Cor 11:19–12:9) describes St Paul\'s sufferings, and the Gospel (Luke 8:4–15) is the Parable of the Sower. St Paul\'s feast (January 25) is its immediate antecedent.',
    'https://en.wikipedia.org/wiki/Sexagesima',
    '🟣',
    'Eight Sundays before Easter.',
  ))

  feasts.push(make(quinquagesima, 'quinquagesima',
    'Quinquagesima Sunday',
    'class-2', 'violet', [],
    'Quinquagesima ("fifty days") is the Sunday before Ash Wednesday and the last Sunday before Lent. The Gospel (Luke 18:31–43) is the healing of the blind man outside Jericho — a traditional symbol of the soul seeking sight before its Lenten journey. The Alleluia is sung for the last time until Easter, and Carnevale celebrations traditionally end today.',
    'https://en.wikipedia.org/wiki/Quinquagesima',
    '🟣',
    'Seven Sundays before Easter (immediately before Ash Wednesday).',
  ))

  /* ── Ash Wednesday & Lenten Ember Days ────────────────────────────── */
  feasts.push(make(ashWednesday, 'ash-wednesday',
    'Ash Wednesday',
    'privileged-feria', 'violet', [],
    'Ash Wednesday marks the beginning of Lent with the imposition of ashes in the form of a cross, accompanied by the words "Memento, homo, quia pulvis es et in pulverem reverteris" (Remember, man, that thou art dust, and to dust thou shalt return). It is a day of strict fasting and abstinence. It coincides with the First Lenten Ember Day — the Ember Wednesday.',
    'https://en.wikipedia.org/wiki/Ash_Wednesday',
    '💨',
  ))

  feasts.push(make(emberFriLent, 'ember-fri-lent',
    'Friday of the First Week of Lent (Ember Friday)',
    'privileged-feria', 'violet', [],
    'The Ember Days of Lent (Wednesday, Friday, Saturday of the first week of Lent) are the first set of Ember Days in the liturgical year. Ember Days are days of prayer, fasting and abstinence for the blessing of the four seasons and the ordination of clergy. In the traditional calendar, Ember Friday is a day of strict fast and abstinence.',
    'https://en.wikipedia.org/wiki/Ember_days',
    '🙏',
  ))

  feasts.push(make(emberSatLent, 'ember-sat-lent',
    'Saturday of the First Week of Lent (Ember Saturday)',
    'privileged-feria', 'violet', [],
    'Ember Saturday has a distinctive Mass with twelve prophecies (like Holy Saturday). Ordinations have traditionally been conferred on the night of the Ember Saturday. The long vigil prepares for the following Sunday which, in Lent, is Laetare Sunday in the 4th week or the First Sunday of Lent.',
    'https://en.wikipedia.org/wiki/Ember_days',
    '🙏',
  ))

  /* ── Laetare Sunday ───────────────────────────────────────────────── */
  feasts.push(make(laetare, 'laetare',
    'Laetare Sunday (IV Sunday of Lent)',
    'class-2', 'rose', [],
    'Laetare Sunday ("Rejoice!") is the fourth Sunday of Lent, named from its Introit: "Laetare Ierusalem" (Rejoice, O Jerusalem). Rose vestments are worn, flowers may be placed on the altar, and the organ may be played — a brief respite from Lenten severity. The "Golden Rose" blessed by the Pope on this day symbolises joy.',
    'https://en.wikipedia.org/wiki/Laetare_Sunday',
    '🌹',
    'Fourth Sunday of Lent — approximately 21 days before Easter.',
  ))

  /* ── Passion Sunday ───────────────────────────────────────────────── */
  feasts.push(make(passionSunday, 'passion-sunday',
    'Passion Sunday',
    'class-2', 'violet', [],
    'Passion Sunday marks the beginning of Passiontide — the last two weeks of Lent. From this day all crucifixes, statues and sacred images in the church are veiled in violet. The Gloria Patri is omitted, and the readings focus intensely on the approaching Passion. This distinctive two-week Passiontide was compressed into Holy Week only in the 1969 reform.',
    'https://en.wikipedia.org/wiki/Passion_Sunday',
    '🟣',
    'Two Sundays before Easter.',
  ))

  /* ── Holy Week ─────────────────────────────────────────────────────── */
  feasts.push(make(palmSunday, 'palm-sunday',
    'Sunday of the Passion (Palm Sunday)',
    'class-1', 'red', [],
    'The Mass on Palm Sunday begins with a procession in which palms are blessed and the faithful carry them as they re-enact the triumphal entry of Jesus into Jerusalem. At Mass, the long Passion narrative according to Matthew (or in Holy Week, according to the day\'s Gospel) is sung by three deacons. Palms traditionally kept until next Ash Wednesday, when they are burned for ashes.',
    'https://en.wikipedia.org/wiki/Palm_Sunday',
    '🌿',
  ))

  feasts.push(make(spySpy, 'spy-wednesday',
    'Wednesday of Holy Week (Spy Wednesday)',
    'privileged-feria', 'violet', [],
    'The Wednesday of Holy Week is called "Spy Wednesday" in the English tradition for Judas\'s agreement to betray Jesus. The Tenebrae Office (Matins and Lauds of the next day sung on the preceding evening) is celebrated from Wednesday through Friday night, with candles extinguished one by one. The strepitus (loud noise) at the end symbolises the earthquake at Christ\'s death.',
    'https://en.wikipedia.org/wiki/Spy_Wednesday',
    '⚫',
  ))

  feasts.push(make(holyThursday, 'holy-thursday',
    'Holy Thursday (Maundy Thursday — Mass of the Lord\'s Supper)',
    'class-1', 'white', [],
    'Holy Thursday commemorates the institution of the Most Holy Eucharist and the Sacred Priesthood at the Last Supper. The Mass ends with a solemn procession of the Blessed Sacrament to the Altar of Repose. Bells and organs fall silent until the Gloria at the Easter Vigil. The washing of feet (Mandatum) is traditionally performed. This begins the Easter Triduum.',
    'https://en.wikipedia.org/wiki/Maundy_Thursday',
    '🍷',
  ))

  feasts.push(make(goodFriday, 'good-friday',
    'Good Friday (Friday of the Passion and Death of Our Lord)',
    'class-1', 'black', ['CA', 'UK'],
    'Good Friday is the most solemn day of the liturgical year. No Mass is celebrated. The traditional liturgy consists of three parts: the Mass of the Presanctified (with the reading of John\'s Passion), the Solemn Intercessions (the ancient prayer of the faithful), and the Veneration of the Cross. Black vestments are worn. A strict fast is kept.',
    'https://en.wikipedia.org/wiki/Good_Friday',
    '✝',
  ))

  feasts.push(make(holySaturday, 'holy-saturday',
    'Holy Saturday (Easter Vigil)',
    'class-1', 'white', [],
    'Holy Saturday is the last and greatest vigil of the year. In the restored rite of 1951/1955, the Easter Vigil begins after nightfall: the blessing of the Easter fire, the singing of the Exsultet, twelve Old Testament prophecies, the blessing of the baptismal font, Baptism of new Catholics, the Litany of the Saints, and finally the first Mass of Easter. Bells ring out at the Gloria.',
    'https://en.wikipedia.org/wiki/Holy_Saturday',
    '🕯️',
  ))

  feasts.push(make(easter, 'easter-sunday',
    'Easter Sunday (Resurrection of Our Lord Jesus Christ)',
    'class-1', 'white', ['CA', 'US', 'UK'],
    'Easter is the greatest and most ancient feast of the Christian year, celebrating the Resurrection of Jesus Christ on the third day after his death. The date is calculated as the first Sunday after the first full moon on or after March 21. All other moveable feasts depend on Easter. The Easter Octave lasts eight days, all treated as First-Class feasts.',
    'https://en.wikipedia.org/wiki/Easter',
    '✝',
  ))

  /* ── Easter Octave / Season ─────────────────────────────────────── */
  feasts.push(make(lowSunday, 'low-sunday',
    'Low Sunday (Dominica in Albis)',
    'class-1', 'white', [],
    'Low Sunday (Quasimodo Sunday, "in Albis Depositis") is the Octave Day of Easter — still a First-Class feast. The newly baptised, who wore their white baptismal robes all week, laid them aside today. The Mass begins with the Introit "Quasi modo geniti infantes" (As newborn babes). Divine Mercy Sunday was not yet in the 1962 calendar.',
    'https://en.wikipedia.org/wiki/Quasimodo_Sunday',
    '✝',
    'Octave Day of Easter.',
  ))

  /* ── Rogation Days ───────────────────────────────────────────────── */
  feasts.push(make(rogationMonday, 'rogation-mon',
    'Rogation Monday',
    'privileged-feria', 'violet', [],
    'The Rogation Days (Monday–Wednesday before Ascension Thursday) are days of prayer, fasting and procession, petitioning God\'s blessing on the crops and protection from calamity. They include the singing of the Litany of the Saints in procession. The Minor Rogation Days (as opposed to the Major Rogation, April 25) were removed from the 1969 calendar.',
    'https://en.wikipedia.org/wiki/Rogation_days',
    '🌾',
  ))
  feasts.push(make(rogationTuesday, 'rogation-tue',
    'Rogation Tuesday',
    'privileged-feria', 'violet', [],
    'The second of the three Rogation Days before Ascension Thursday. Processions and litanies are held asking God\'s blessing on the growing crops.',
    'https://en.wikipedia.org/wiki/Rogation_days',
    '🌾',
  ))
  feasts.push(make(rogationWednesday, 'rogation-wed',
    'Rogation Wednesday',
    'privileged-feria', 'violet', [],
    'The third Rogation Day. The Vigil of the Ascension is also kept today in the traditional calendar. Evening gives way to the great feast of the Ascension tomorrow.',
    'https://en.wikipedia.org/wiki/Rogation_days',
    '🌾',
  ))

  /* ── Ascension ───────────────────────────────────────────────────── */
  feasts.push(make(ascension, 'ascension',
    'Ascension of Our Lord Jesus Christ',
    'class-1', 'white', ['CA', 'UK'],
    'The Ascension commemorates the bodily ascension of Jesus into heaven on the fortieth day after Easter (Acts 1:9), witnessed by the Apostles at the Mount of Olives. In the 1962 calendar, this is ALWAYS Thursday — never transferred to Sunday. It is a Holy Day of Obligation in most countries. The Paschal Candle is extinguished after the Gospel on this day.',
    'https://en.wikipedia.org/wiki/Ascension_of_Jesus',
    '☁️',
    'Always the Thursday 40 days after Easter — NEVER transferred to Sunday in the traditional calendar.',
  ))

  /* ── Pentecost ───────────────────────────────────────────────────── */
  feasts.push(make(pentecostVigil, 'pentecost-vigil',
    'Vigil of Pentecost',
    'vigil', 'red', [],
    'The Vigil of Pentecost is the second most solemn vigil of the year after Holy Saturday. The traditional Vigil Mass includes the blessing of the baptismal font and six Old Testament prophecies — commemorating the vigil kept by the Apostles in the Upper Room between the Ascension and Pentecost. Baptism may be administered at this vigil.',
    'https://en.wikipedia.org/wiki/Pentecost',
    '🔥',
  ))

  feasts.push(make(pentecost, 'pentecost',
    'Pentecost (Whit Sunday)',
    'class-1', 'red', ['CA', 'US', 'UK'],
    'Pentecost ("fiftieth day") celebrates the descent of the Holy Spirit upon the Apostles and the Virgin Mary in the Upper Room 50 days after Easter. The sequence Veni Sancte Spiritus is sung. The Octave of Pentecost (Whitsun week) was a Second-Class liturgical season — all eight days are feasts. The sequence and full octave were removed in 1969.',
    'https://en.wikipedia.org/wiki/Pentecost',
    '🔥',
  ))

  /* ── Pentecost Ember Days ────────────────────────────────────────── */
  feasts.push(make(emberWedPent, 'ember-wed-pent',
    'Ember Wednesday (after Pentecost)',
    'privileged-feria', 'red', [],
    'The Ember Days after Pentecost (Wednesday, Friday, Saturday) are the Summer Ember Days. They are days of fasting, abstinence and prayer, traditionally the occasion for ordination of priests and deacons. Red vestments are worn throughout the Octave of Pentecost.',
    'https://en.wikipedia.org/wiki/Ember_days',
    '🙏',
  ))
  feasts.push(make(emberFriPent, 'ember-fri-pent',
    'Ember Friday (after Pentecost)',
    'privileged-feria', 'red', [],
    'Second of the three Pentecost Ember Days. Fasting and abstinence are prescribed.',
    'https://en.wikipedia.org/wiki/Ember_days',
    '🙏',
  ))
  feasts.push(make(emberSatPent, 'ember-sat-pent',
    'Ember Saturday (after Pentecost)',
    'privileged-feria', 'red', [],
    'The third Pentecost Ember Day. Like the Lenten Ember Saturday, ordinations have traditionally been performed after this vigil. The following day is Trinity Sunday.',
    'https://en.wikipedia.org/wiki/Ember_days',
    '🙏',
  ))

  /* ── Trinity Sunday ──────────────────────────────────────────────── */
  feasts.push(make(trinityS, 'trinity-sunday',
    'Most Holy Trinity',
    'class-1', 'white', [],
    'Trinity Sunday is the First Sunday after Pentecost in the traditional calendar. It celebrates the mystery of the one God in three divine Persons: Father, Son and Holy Spirit — co-equal and co-eternal. The liturgical season following Pentecost is named "Time after Pentecost" in the 1962 calendar (not "Ordinary Time"); Sundays are counted from Pentecost.',
    'https://en.wikipedia.org/wiki/Trinity_Sunday',
    '☘️',
    'First Sunday after Pentecost.',
  ))

  /* ── Corpus Christi ──────────────────────────────────────────────── */
  feasts.push(make(corpusChristi, 'corpus-christi',
    'Corpus Christi (Most Holy Body of Christ)',
    'class-1', 'white', ['CA', 'UK'],
    'Corpus Christi celebrates the Real Presence of Christ — body, blood, soul and divinity — in the Blessed Sacrament. Instituted by Urban IV in 1264, it falls on the Thursday after Trinity Sunday (60 days after Easter). In the 1962 calendar this is ALWAYS Thursday. St Thomas Aquinas composed the magnificent Office and Mass, including the hymns Pange Lingua and Tantum Ergo. The Eucharistic Procession through the streets is its hallmark.',
    'https://en.wikipedia.org/wiki/Corpus_Christi_(feast)',
    '🍞',
    'Always Thursday — the Thursday after Trinity Sunday. Never transferred to Sunday in the traditional calendar.',
  ))

  /* ── Sacred Heart ────────────────────────────────────────────────── */
  feasts.push(make(sacredHeart, 'sacred-heart',
    'Most Sacred Heart of Jesus',
    'class-1', 'white', [],
    'The Sacred Heart is the greatest devotion promoted by the revelations of St Margaret Mary Alacoque (1673–75) and St John Eudes. The feast falls on the Friday after the Octave of Corpus Christi. Pius XI\'s Quas Primas (1925) and Miserentissimus Redemptor (1928) greatly promoted the devotion. The Act of Consecration of the Human Race to the Sacred Heart is renewed on this feast.',
    'https://en.wikipedia.org/wiki/Sacred_Heart',
    '❤️',
    'Friday after the Octave of Corpus Christi (19 days after Corpus Christi).',
  ))

  /* ── Gaudete Sunday ──────────────────────────────────────────────── */
  feasts.push(make(gaudete, 'gaudete',
    'Gaudete Sunday (III Sunday of Advent)',
    'class-2', 'rose', [],
    'Gaudete Sunday ("Rejoice!"), the Third Sunday of Advent, takes its name from the Introit: "Gaudete in Domino semper" (Rejoice in the Lord always). Rose vestments are worn, flowers may adorn the altar, and the organ may be played — a brief relaxation of the violet penitential season. The lighting of the third (rose) Advent candle marks this Sunday.',
    'https://en.wikipedia.org/wiki/Gaudete_Sunday',
    '🌹',
    'Third Sunday of Advent.',
  ))

  /* ── Christ the King (last Sunday of October in 1962 calendar) ────── */
  feasts.push(make(christKing, 'christ-king',
    'Our Lord Jesus Christ, King of the Universe',
    'class-1', 'white', [],
    'Instituted by Pius XI in Quas Primas (1925) on the LAST Sunday of October, this feast proclaims Christ\'s universal kingship over all nations, societies and individuals. It is a response to the rising tide of secularism and nationalism. In 1969 it was moved to the LAST Sunday of the liturgical year (before Advent). The 1962 calendar keeps it in October — its original place.',
    'https://en.wikipedia.org/wiki/Feast_of_Christ_the_King',
    '👑',
    'Last Sunday of October in the 1962 calendar (moved to last Sunday before Advent in 1969).',
  ))

  return feasts
}
