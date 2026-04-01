# Catholic Feast Calendar

A React + Vite web application displaying the full Catholic liturgical calendar — all feast days, saints, solemnities and memorials — with Holy Day of Obligation highlights for **Canada**, the **United States**, and **England & Wales**.

## Features

- **Full Catholic feast calendar** — fixed-date feasts and all moveable feasts (Easter-based: Ash Wednesday, Holy Week, Ascension, Pentecost, Corpus Christi, Sacred Heart, etc.)
- **Saint descriptions** — every feast has a biographical blurb and a direct link to its Wikipedia article
- **Holy Days of Obligation** — marked distinctly for Canada 🇨🇦, United States 🇺🇸, and England & Wales 🏴󠁧󠁢󠁥󠁮󠁧󠁿; filter by country
- **Feast rank colour coding** — Solemnity, Feast, Memorial, Optional Memorial, Commemoration
- **Month / year navigation** — browse any year (Easter algorithm works for any Gregorian year)
- **Sidebar feast list** — quick-glance list of every feast in the current month
- **Detail modal** — click any feast to see description, Wikipedia link, and Holy Day status

## Tech Stack

- [React 19](https://react.dev/) + [Vite 8](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite`
- [Lucide React](https://lucide.dev/) for icons

## Getting Started

```bash
cd saint-calendar
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Building for Production

```bash
npm run build
npm run preview
```

## Holy Days of Obligation

| Country | Holy Days |
|---|---|
| 🇨🇦 Canada | Mary Mother of God (Jan 1), St Joseph (Mar 19), Ascension, Corpus Christi, Nativity of St John Baptist (Jun 24), Sts Peter & Paul (Jun 29), Assumption (Aug 15), All Saints (Nov 1), Immaculate Conception (Dec 8), Christmas (Dec 25) |
| 🇺🇸 United States | Mary Mother of God (Jan 1), Ascension, Assumption (Aug 15), All Saints (Nov 1), Immaculate Conception (Dec 8), Christmas (Dec 25) |
| 🏴󠁧󠁢󠁥󠁮󠁧󠁿 England & Wales | Epiphany (Jan 6), Annunciation (Mar 25), Ascension, Sts Peter & Paul (Jun 29), Assumption (Aug 15), All Saints (Nov 1), Christmas (Dec 25), St Stephen (Dec 26) |

> Note: Some Holy Days transferred to Sunday in certain dioceses are noted in the feast detail.
