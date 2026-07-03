import { jsx, jsxs } from "preact/jsx-runtime"

const DAY = 86_400_000
const WEEKS = 53
const DAYS = WEEKS * 7

const isoDate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

const styles = `
.daily-heatmap{--heatmap-cell:clamp(3.5px,1.25vw,12px);--heatmap-gap:clamp(1px,.2vw,3px);width:100%;max-width:900px;margin:clamp(2rem,4vw,3rem) auto clamp(2.5rem,5vw,4rem);overflow:hidden}
.daily-heatmap-header{display:flex;align-items:flex-end;justify-content:space-between;gap:1rem;margin-bottom:1.25rem}
.daily-heatmap-header h2{margin:0;font-size:1.15rem;letter-spacing:-.025em}
.daily-heatmap-summary{margin:0;color:var(--gray);font-family:var(--codeFont);font-size:.7rem;white-space:nowrap}
.daily-heatmap-scroll{width:100%;overflow:hidden}
.daily-heatmap-chart{width:100%}
.daily-heatmap-months{display:grid;grid-template-columns:repeat(53,var(--heatmap-cell));justify-content:space-between;gap:var(--heatmap-gap);width:calc(100% - 30px);height:1.25rem;margin-left:30px;color:var(--gray);font-family:var(--codeFont);font-size:.62rem;line-height:1}
.daily-heatmap-month{overflow:visible;white-space:nowrap}
.daily-heatmap-body{display:flex;gap:8px;width:100%}
.daily-heatmap-weekdays{display:grid;align-self:stretch;grid-template-rows:repeat(7,var(--heatmap-cell));justify-content:space-between;gap:var(--heatmap-gap);width:22px;color:var(--gray);font-family:var(--codeFont);font-size:.57rem;line-height:1;text-align:right}
.daily-heatmap-weekdays span{align-self:center}
.daily-heatmap-grid{display:grid;flex:1;grid-template-rows:repeat(7,var(--heatmap-cell));grid-template-columns:repeat(53,var(--heatmap-cell));grid-auto-flow:column;justify-content:space-between;gap:var(--heatmap-gap);min-width:0}
.daily-heatmap-day{position:relative;width:var(--heatmap-cell);height:var(--heatmap-cell);border-radius:clamp(1px,.3vw,3px);background:color-mix(in srgb,var(--lightgray) 76%,transparent);outline:1px solid color-mix(in srgb,var(--dark) 5%,transparent);transition:transform .12s ease,outline-color .12s ease,background-color .12s ease}
.daily-heatmap-day[data-active="true"]{background:var(--secondary);outline-color:transparent;box-shadow:0 2px 6px color-mix(in srgb,var(--secondary) 30%,transparent)}
.daily-heatmap-day[data-today="true"]::after{position:absolute;top:50%;left:50%;width:max(2px,28%);height:max(2px,28%);border-radius:50%;background:var(--secondary);content:"";transform:translate(-50%,-50%)}
.daily-heatmap-day[data-active="true"][data-today="true"]::after{background:var(--light)}
a.daily-heatmap-day:hover,a.daily-heatmap-day:focus-visible{z-index:2;transform:scale(1.35);outline:2px solid var(--light);outline-offset:1px}
.daily-heatmap-footer{display:flex;align-items:center;justify-content:flex-end;gap:1rem;margin-top:.85rem}
.daily-heatmap-legend{display:flex;align-items:center;justify-content:flex-end;gap:.4rem;color:var(--gray);font-size:.68rem}
.daily-heatmap-legend i{display:block;width:11px;height:11px;border-radius:3px;background:color-mix(in srgb,var(--lightgray) 76%,transparent);outline:1px solid color-mix(in srgb,var(--dark) 5%,transparent)}
.daily-heatmap-legend i:last-of-type{background:var(--secondary);outline-color:transparent}
.daily-heatmap-tooltip{position:fixed;z-index:10001;max-width:18rem;padding:.5rem .65rem;border:1px solid rgba(255,255,255,.15);border-radius:.55rem;background:rgba(15,23,42,.94);box-shadow:0 8px 30px rgba(0,0,0,.24);color:#f8fafc;font-size:.72rem;line-height:1.4;pointer-events:none;transform:translate(-50%,-100%)}
.daily-heatmap-tooltip[hidden]{display:none}
@media(max-width:800px){.daily-heatmap{margin:1.5rem auto 2.25rem}.daily-heatmap-header{align-items:flex-start;flex-direction:column;gap:.45rem}.daily-heatmap-legend{align-self:flex-end}}
`

const script = `
(() => {
  if (!window.__dailyHeatmapBound) {
    window.__dailyHeatmapBound = true
    const tooltip = document.createElement("div")
    tooltip.className = "daily-heatmap-tooltip"
    tooltip.hidden = true
    tooltip.dataset.persist = ""
    tooltip.setAttribute("role", "tooltip")
    document.body.appendChild(tooltip)

    const show = (cell) => {
      const rect = cell.getBoundingClientRect()
      tooltip.textContent = cell.dataset.tooltip || cell.getAttribute("aria-label") || ""
      tooltip.hidden = false
      tooltip.style.left = rect.left + rect.width / 2 + "px"
      tooltip.style.top = rect.top - 8 + "px"
    }
    const hide = () => { tooltip.hidden = true }

    document.addEventListener("pointerover", (event) => {
      const cell = event.target.closest?.("[data-daily-tooltip]")
      if (cell) show(cell)
    })
    document.addEventListener("pointerout", (event) => {
      if (event.target.closest?.("[data-daily-tooltip]")) hide()
    })
    document.addEventListener("focusin", (event) => {
      const cell = event.target.closest?.("[data-daily-tooltip]")
      if (cell) show(cell)
    })
    document.addEventListener("focusout", hide)
    document.addEventListener("prenav", hide)
  }

})()
`

export const DailyHeatmap = () => {
  const Component = ({ fileData, allFiles, cfg }) => {
    if (fileData.slug !== "daily/index") return null

    const entries = new Map()
    for (const file of allFiles) {
      const match = file.slug?.match(/^daily\/(\d{4}-\d{2}-\d{2})$/)
      if (match) {
        entries.set(match[1], {
          slug: file.slug,
          title: file.frontmatter?.title ?? match[1],
        })
      }
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayKey = isoDate(today)
    const end = new Date(today)
    end.setDate(end.getDate() + (6 - end.getDay()))
    const start = new Date(end.getTime() - (DAYS - 1) * DAY)
    const locale = cfg.locale ?? "zh-CN"

    const cells = Array.from({ length: DAYS }, (_, index) => {
      const date = new Date(start.getTime() + index * DAY)
      const key = isoDate(date)
      const entry = entries.get(key)
      const future = date > today
      const label = `${entry ? `${key} · ${entry.title}` : `${key} · No entry`}${key === todayKey ? " · Today" : ""}`
      const shared = {
        class: "daily-heatmap-day",
        title: label,
        "data-tooltip": label,
        "data-daily-tooltip": "true",
        "data-today": key === todayKey ? "true" : undefined,
      }
      return entry
        ? jsx("a", {
            ...shared,
            href: `./${key}`,
            "aria-label": label,
            "data-active": "true",
          })
        : jsx("span", {
            ...shared,
            "aria-hidden": future ? "true" : undefined,
            style: future ? "visibility:hidden" : undefined,
          })
    })

    const monthLabels = Array.from({ length: WEEKS }, (_, week) => {
      const date = new Date(start.getTime() + week * 7 * DAY)
      const previous = week === 0 ? null : new Date(start.getTime() + (week - 1) * 7 * DAY)
      const changed = !previous || date.getMonth() !== previous.getMonth()
      return jsx("span", {
        class: "daily-heatmap-month",
        children: changed ? date.toLocaleDateString(locale, { month: "short" }) : "",
      })
    })

    const weekdayLabels = ["", "M", "", "W", "", "F", ""]

    return jsxs("section", {
      class: "daily-heatmap",
      "aria-labelledby": "daily-heatmap-title",
      children: [
        jsxs("div", {
          class: "daily-heatmap-header",
          children: [
            jsx("h2", { id: "daily-heatmap-title", children: "Activity" }),
            jsx("p", {
              class: "daily-heatmap-summary",
              children: `${entries.size} logged days`,
            }),
          ],
        }),
        jsx("div", {
          class: "daily-heatmap-scroll",
          children: jsxs("div", {
            class: "daily-heatmap-chart",
            children: [
              jsx("div", { class: "daily-heatmap-months", children: monthLabels }),
              jsxs("div", {
                class: "daily-heatmap-body",
                children: [
                  jsx("div", {
                    class: "daily-heatmap-weekdays",
                    "aria-hidden": "true",
                    children: weekdayLabels.map((label) => jsx("span", { children: label })),
                  }),
                  jsx("div", { class: "daily-heatmap-grid", children: cells }),
                ],
              }),
            ],
          }),
        }),
        jsx("div", {
          class: "daily-heatmap-footer",
          children: jsxs("div", {
            class: "daily-heatmap-legend",
            "aria-hidden": "true",
            children: ["Empty", jsx("i", {}), jsx("i", {}), "Logged"],
          }),
        }),
      ],
    })
  }
  Component.css = styles
  Component.afterDOMLoaded = script
  return Component
}
