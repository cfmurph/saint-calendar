/**
 * Calculate moveable feast dates based on Easter for a given year.
 * Uses the Anonymous Gregorian algorithm (Meeus/Jones/Butcher).
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
  const month = Math.floor((h + l - 7 * m + 114) / 31) // 3=March, 4=April
  const day = ((h + l - 7 * m + 114) % 31) + 1
  return new Date(year, month - 1, day)
}

function addDays(date, days) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

export function getMoveableFeasts(year) {
  const easter = computeEaster(year)
  const easterMonth = easter.getMonth() + 1
  const easterDay = easter.getDate()

  const ashWednesday = addDays(easter, -46)
  const palmSunday = addDays(easter, -7)
  const holyThursday = addDays(easter, -3)
  const goodFriday = addDays(easter, -2)
  const holySaturday = addDays(easter, -1)
  const divMercySunday = addDays(easter, 7)
  const ascension = addDays(easter, 39)
  const pentecost = addDays(easter, 49)
  const trinityS = addDays(easter, 56)
  const corpusChristi = addDays(easter, 60)
  const sacredHeart = addDays(easter, 68)

  const makeEntry = (date, id, name, type, holyDayOf, description, wikipedia, icon, note) => ({
    id,
    month: date.getMonth() + 1,
    day: date.getDate(),
    name,
    type,
    holyDayOf: holyDayOf || [],
    description,
    wikipedia,
    icon: icon || '✝',
    moveable: true,
    note,
  })

  return [
    makeEntry(
      ashWednesday,
      'ash-wednesday',
      'Ash Wednesday',
      'commemoration',
      [],
      'Ash Wednesday marks the beginning of Lent, the 40-day period of penance and preparation for Easter. The faithful receive ashes on their foreheads, marked in the shape of a cross, with the words "Remember you are dust, and to dust you shall return." It is a day of fasting and abstinence.',
      'https://en.wikipedia.org/wiki/Ash_Wednesday',
      '💨',
    ),
    makeEntry(
      palmSunday,
      'palm-sunday',
      'Palm Sunday',
      'solemnity',
      [],
      'Palm Sunday commemorates Jesus\'s triumphal entry into Jerusalem, when crowds waved palm branches and cried "Hosanna!" It begins Holy Week. The Gospel narrative of the Passion is read at Mass. Palms blessed on this day are traditionally kept in homes until the following Ash Wednesday.',
      'https://en.wikipedia.org/wiki/Palm_Sunday',
      '🌿',
    ),
    makeEntry(
      holyThursday,
      'holy-thursday',
      'Holy Thursday (Mass of the Lord\'s Supper)',
      'solemnity',
      [],
      'Holy Thursday (Maundy Thursday) celebrates the institution of the Eucharist at the Last Supper, and of the Ministerial Priesthood. Jesus washed the feet of his Apostles. The evening Mass ends with the transfer of the Blessed Sacrament and the stripping of the altar, beginning the Easter Triduum.',
      'https://en.wikipedia.org/wiki/Maundy_Thursday',
      '🍷',
    ),
    makeEntry(
      goodFriday,
      'good-friday',
      'Good Friday (Passion of the Lord)',
      'solemnity',
      ['CA', 'UK'],
      'Good Friday commemorates the crucifixion and death of Jesus Christ. No Mass is celebrated; instead the Liturgy of the Passion includes the reading of the Passion according to John, the veneration of the Cross, and reception of Communion from the previous day\'s consecration. It is a day of strict fasting and abstinence.',
      'https://en.wikipedia.org/wiki/Good_Friday',
      '✝',
    ),
    makeEntry(
      holySaturday,
      'holy-saturday',
      'Holy Saturday (Easter Vigil)',
      'solemnity',
      [],
      'Holy Saturday is a day of quiet vigil at the tomb of Christ. The Easter Vigil — the mother of all vigils — begins after nightfall: lighting the Easter fire, the Exsultet, readings from Scripture, baptism of new Catholics, and the first Mass of Easter Sunday.',
      'https://en.wikipedia.org/wiki/Holy_Saturday',
      '🕯️',
    ),
    makeEntry(
      easter,
      'easter-sunday',
      'Easter Sunday (Resurrection of the Lord)',
      'solemnity',
      ['CA', 'US', 'UK'],
      'Easter is the greatest and oldest feast of the Christian year, celebrating the Resurrection of Jesus Christ from the dead on the third day after his crucifixion. The date is calculated as the first Sunday after the first full moon on or after 21 March. All other moveable feasts depend on Easter.',
      'https://en.wikipedia.org/wiki/Easter',
      '✝',
    ),
    makeEntry(
      divMercySunday,
      'divine-mercy',
      'Divine Mercy Sunday',
      'feast',
      [],
      'The Second Sunday of Easter is Divine Mercy Sunday, instituted by John Paul II in 2000 in response to the visions of St Faustina Kowalska. Jesus appeared to her promising special mercy to those who receive Communion and confess on this day. It is the octave day of Easter.',
      'https://en.wikipedia.org/wiki/Divine_Mercy_Sunday',
      '❤️',
    ),
    makeEntry(
      ascension,
      'ascension',
      'Ascension of the Lord',
      'solemnity',
      ['CA', 'UK'],
      'The Ascension commemorates Jesus\'s bodily ascension into heaven 40 days after Easter, before the eyes of his disciples at the Mount of Olives. In many countries it has been transferred to the following Sunday. It marks the end of Jesus\'s resurrection appearances and his glorification at the Father\'s right hand.',
      'https://en.wikipedia.org/wiki/Ascension_of_Jesus',
      '☁️',
      'Traditionally 40 days after Easter (Thursday); transferred to Sunday in some dioceses',
    ),
    makeEntry(
      pentecost,
      'pentecost',
      'Pentecost Sunday',
      'solemnity',
      ['CA', 'US', 'UK'],
      'Pentecost celebrates the descent of the Holy Spirit upon the Apostles and disciples 50 days after Easter (Acts 2), as promised by Jesus. The sound of rushing wind and tongues of fire accompanied the event; the disciples spoke in many languages. Pentecost is called the "birthday of the Church."',
      'https://en.wikipedia.org/wiki/Pentecost',
      '🔥',
    ),
    makeEntry(
      trinityS,
      'trinity-sunday',
      'Most Holy Trinity',
      'solemnity',
      [],
      'Trinity Sunday celebrates the central Christian mystery: one God in three divine Persons — Father, Son and Holy Spirit — co-equal and co-eternal. It is the only feast dedicated to a doctrine rather than an event. It falls on the Sunday after Pentecost.',
      'https://en.wikipedia.org/wiki/Trinity_Sunday',
      '☘️',
    ),
    makeEntry(
      corpusChristi,
      'corpus-christi',
      'Corpus Christi (Body and Blood of Christ)',
      'solemnity',
      ['CA', 'UK'],
      'Corpus Christi celebrates the Real Presence of Jesus Christ — body, blood, soul and divinity — in the Eucharist. Instituted in 1264 by Urban IV at the request of St Thomas Aquinas (who composed the Office) and St Juliana of Liège. The Eucharistic Procession through the streets is a hallmark of the feast.',
      'https://en.wikipedia.org/wiki/Corpus_Christi_(feast)',
      '🍞',
      'Traditionally Thursday; transferred to Sunday in many countries including Canada and the UK',
    ),
    makeEntry(
      sacredHeart,
      'sacred-heart',
      'Most Sacred Heart of Jesus',
      'solemnity',
      [],
      'The Sacred Heart devotion focuses on the physical heart of Jesus as a symbol of his divine love for humanity, including his suffering for sin. The feast was promoted by the visions of St Margaret Mary Alacoque (17th c.) and formally extended to the universal Church in 1856. It falls on the Friday after Corpus Christi.',
      'https://en.wikipedia.org/wiki/Sacred_Heart',
      '❤️',
    ),
  ]
}
