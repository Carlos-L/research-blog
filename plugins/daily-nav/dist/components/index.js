import { jsx, jsxs } from "preact/jsx-runtime"

const dailyDatePattern = /^daily\/(\d{4}-\d{2}-\d{2})$/

const styles = `
.daily-nav{width:min(100%,var(--reading-width));margin:0 auto 1.75rem;padding-top:.75rem}
.daily-nav-inner{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.9rem}
.daily-nav-link{display:grid;gap:.25rem;min-height:4rem;padding:.95rem 1rem;border:1px solid var(--border-subtle);border-radius:.8rem;background:var(--light);color:var(--dark)}
.daily-nav-link:hover{border-color:color-mix(in srgb,var(--secondary) 42%,var(--border-subtle));background:var(--highlight);color:var(--secondary)}
.daily-nav-link[data-direction="next"]{text-align:right}
.daily-nav-kicker{color:var(--gray);font-family:var(--codeFont);font-size:.68rem;font-weight:650;letter-spacing:.08em;text-transform:uppercase}
.daily-nav-date{overflow:hidden;text-overflow:ellipsis;font-size:1rem;font-weight:650;white-space:nowrap}
.daily-nav-spacer{visibility:hidden}
@media(max-width:640px){.daily-nav-inner{grid-template-columns:1fr}.daily-nav-spacer{display:none}.daily-nav-link[data-direction="next"]{text-align:left}}
`

const item = (entry, direction, label) =>
  entry
    ? jsxs("a", {
        class: "daily-nav-link",
        "data-direction": direction,
        href: `./${entry.date}`,
        children: [
          jsx("span", { class: "daily-nav-kicker", children: label }),
          jsx("span", { class: "daily-nav-date", children: entry.date }),
        ],
      })
    : jsx("span", { class: "daily-nav-spacer", "aria-hidden": "true" })

export const DailyNav = () => {
  const Component = ({ fileData, allFiles }) => {
    const match = fileData.slug?.match(dailyDatePattern)
    if (!match) return null

    const entries = allFiles
      .map((file) => {
        const entryMatch = file.slug?.match(dailyDatePattern)
        return entryMatch ? { date: entryMatch[1], slug: file.slug } : null
      })
      .filter(Boolean)
      .sort((a, b) => a.date.localeCompare(b.date))

    const index = entries.findIndex((entry) => entry.slug === fileData.slug)
    if (index === -1) return null

    const previous = entries[index - 1]
    const next = entries[index + 1]
    if (!previous && !next) return null

    return jsx("nav", {
      class: "daily-nav",
      "aria-label": "Daily navigation",
      children: jsxs("div", {
        class: "daily-nav-inner",
        children: [
          item(previous, "previous", "上一天"),
          item(next, "next", "下一天"),
        ],
      }),
    })
  }
  Component.css = styles
  return Component
}
