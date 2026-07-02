import { jsx, jsxs } from "preact/jsx-runtime"

const DAY = 86_400_000
const WEEKS = 53
const DAYS = WEEKS * 7

const isoDate = (date) => date.toISOString().slice(0, 10)

const styles = `
.daily-heatmap{width:100%;max-width:var(--reading-width);margin:clamp(2rem,4vw,3rem) auto clamp(2.5rem,5vw,4rem);padding-top:1.5rem;border-top:1px solid var(--border-subtle)}
.daily-heatmap-header{display:flex;align-items:baseline;justify-content:space-between;gap:1rem;margin-bottom:1rem}
.daily-heatmap-header h2{margin:0;font-size:1.05rem;letter-spacing:-.015em}
.daily-heatmap-header p{margin:0;color:var(--gray);font-family:var(--codeFont);font-size:.7rem}
.daily-heatmap-scroll{overflow-x:auto;padding-bottom:.4rem;scrollbar-width:thin}
.daily-heatmap-grid{display:grid;grid-template-rows:repeat(7,10px);grid-auto-flow:column;grid-auto-columns:10px;gap:3px;width:max-content;min-width:100%}
.daily-heatmap-day{width:10px;height:10px;border-radius:2px;background:var(--lightgray);outline:1px solid color-mix(in srgb,var(--dark) 4%,transparent)}
.daily-heatmap-day[data-active="true"]{background:var(--secondary);outline-color:transparent}
a.daily-heatmap-day:hover{transform:scale(1.18);outline:2px solid color-mix(in srgb,var(--secondary) 25%,transparent);outline-offset:1px}
.daily-heatmap-legend{display:flex;align-items:center;justify-content:flex-end;gap:.4rem;margin-top:.75rem;color:var(--gray);font-size:.7rem}
.daily-heatmap-legend i{display:block;width:10px;height:10px;border-radius:2px;background:var(--lightgray)}
.daily-heatmap-legend i:last-of-type{background:var(--secondary)}
@media(max-width:800px){.daily-heatmap{margin:1.75rem auto 2.5rem}.daily-heatmap-header{align-items:flex-start;flex-direction:column;gap:.35rem}}
`

export const DailyHeatmap = () => {
  const Component = ({ fileData, allFiles }) => {
    if (fileData.slug !== "daily/index") return null

    const entries = new Map()
    for (const file of allFiles) {
      const match = file.slug?.match(/^daily\/(\d{4}-\d{2}-\d{2})$/)
      if (match) entries.set(match[1], file.slug)
    }

    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)
    const end = new Date(today)
    end.setUTCDate(end.getUTCDate() + (6 - end.getUTCDay()))
    const start = new Date(end.getTime() - (DAYS - 1) * DAY)

    const cells = Array.from({ length: DAYS }, (_, index) => {
      const date = new Date(start.getTime() + index * DAY)
      const key = isoDate(date)
      const slug = entries.get(key)
      const future = date > today
      const label = slug ? `${key} · Daily entry` : key
      return slug
        ? jsx("a", {
            class: "daily-heatmap-day",
            href: `./${key}`,
            title: label,
            "aria-label": label,
            "data-active": "true",
          })
        : jsx("span", {
            class: "daily-heatmap-day",
            title: label,
            "aria-hidden": "true",
            style: future ? "visibility:hidden" : undefined,
          })
    })

    return jsxs("section", {
      class: "daily-heatmap",
      "aria-labelledby": "daily-heatmap-title",
      children: [
        jsxs("div", {
          class: "daily-heatmap-header",
          children: [
            jsx("h2", { id: "daily-heatmap-title", children: "Daily Activity" }),
            jsx("p", { children: `${entries.size} entries · last 12 months` }),
          ],
        }),
        jsx("div", {
          class: "daily-heatmap-scroll",
          children: jsx("div", { class: "daily-heatmap-grid", children: cells }),
        }),
        jsxs("div", {
          class: "daily-heatmap-legend",
          "aria-hidden": "true",
          children: ["Less", jsx("i", {}), jsx("i", {}), "More"],
        }),
      ],
    })
  }
  Component.css = styles
  return Component
}
