import { Fragment, jsx, jsxs } from "preact/jsx-runtime"

function pathToRoot(slug) {
  const depth = slug.split("/").filter(Boolean).length - 1
  return depth > 0 ? Array(depth).fill("..").join("/") : "."
}

const styles = `
.site-brand{display:inline-flex;align-items:center;gap:.65rem;color:var(--dark);background:transparent;font-family:var(--titleFont);font-size:.96rem;font-weight:650;letter-spacing:-.015em;white-space:nowrap}
.site-brand-mark{display:grid;place-items:center;width:1.9rem;height:1.9rem;border-radius:.45rem;background:var(--secondary);color:white;font-family:var(--codeFont);font-size:.67rem;font-weight:700;letter-spacing:.03em}
.site-header-inner{display:flex;align-items:center;justify-content:space-between;gap:clamp(1rem,4vw,3rem);width:100%}
.site-nav{display:flex;align-items:center;justify-content:center;gap:.15rem;flex-wrap:wrap}
.site-nav a,.site-nav button{padding:.45rem .7rem;border-radius:.45rem;background:transparent;color:var(--gray);font-size:.88rem;font-weight:500;border:0;font-family:inherit;line-height:1.2}
.site-nav a:hover,.site-nav button:hover{color:var(--secondary);text-decoration:underline;text-underline-offset:.22em;text-decoration-thickness:1px}
.site-nav button{cursor:pointer}
body[data-slug="index"] .site-nav [data-nav="home"],body[data-slug^="daily"] .site-nav [data-nav="daily"],body[data-slug^="notes"] .site-nav [data-nav="notes"],body[data-slug="about"] .site-nav [data-nav="about"]{color:var(--secondary);text-decoration:underline;text-underline-offset:.22em;text-decoration-thickness:2px}
@media(max-width:800px){.site-header-inner{display:contents}.site-nav{grid-column:1/-1;grid-row:2;justify-content:flex-start;overflow-x:auto;padding-top:.65rem;scrollbar-width:none}.site-nav::-webkit-scrollbar{display:none}}
`

export const SiteHeader = () => {
  const Component = ({ fileData }) => {
    const root = pathToRoot(fileData.slug ?? "index")
    return jsx("div", {
      class: "site-header-inner",
      children: jsxs(Fragment, {
        children: [
          jsxs("a", {
            class: "site-brand",
            href: root,
            "aria-label": "Carlos Research home",
            children: [
              jsx("span", { class: "site-brand-mark", children: "CR" }),
              jsx("span", { children: "Carlos Research" }),
            ],
          }),
          jsxs("nav", {
            class: "site-nav",
            "aria-label": "Primary navigation",
            children: [
              jsx("a", { "data-nav": "home", href: root, children: "Home" }),
              jsx("a", { "data-nav": "daily", href: `${root}/daily/`, children: "Daily" }),
              jsx("a", { "data-nav": "notes", href: `${root}/notes/`, children: "Notes" }),
              jsx("button", { type: "button", "data-nav": "search", children: "Search" }),
              jsx("a", { "data-nav": "about", href: `${root}/about`, children: "About" }),
            ],
          }),
        ],
      }),
    })
  }
  Component.css = styles
Component.beforeDOMLoaded = `
if (localStorage.getItem("theme") === null) {
  localStorage.setItem("theme", "light")
  document.documentElement.setAttribute("saved-theme", "light")
}

const bindSearchNav = () => {
  const navSearch = document.querySelector('[data-nav="search"]')
  const quartzSearch = document.querySelector(".search-button")
  if (!navSearch || !quartzSearch || navSearch.dataset.bound === "true") return
  navSearch.dataset.bound = "true"
  navSearch.addEventListener("click", () => quartzSearch.click())
}

document.addEventListener("nav", bindSearchNav)
document.addEventListener("render", bindSearchNav)
bindSearchNav()
`
  return Component
}
