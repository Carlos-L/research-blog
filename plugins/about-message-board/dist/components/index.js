import { jsx, jsxs } from "preact/jsx-runtime"

const styles = `
body[data-slug="about"] .page-footer{width:100%;max-width:var(--site-max-width);margin-inline:auto}
.about-message-board{width:100%;max-width:var(--reading-width);margin:clamp(3rem,7vw,5rem) 0 0;padding-top:clamp(2rem,4vw,3rem);border-top:1px solid var(--border-subtle)}
.message-board-heading{margin-bottom:1.75rem}
.message-board-kicker{margin:0 0 .45rem;color:var(--secondary);font-family:var(--codeFont);font-size:.67rem;font-weight:650;letter-spacing:.12em;text-transform:uppercase}
.message-board-heading h2{margin:0 0 .65rem;font-size:clamp(1.45rem,3vw,1.8rem);letter-spacing:-.035em}
.message-board-heading p:last-child{max-width:36rem;margin:0;color:var(--gray);font-size:.92rem;line-height:1.7}
.message-board-giscus{min-height:160px}
.message-board-giscus .giscus-frame{width:100%}
`

const script = `
const setupAboutMessageBoard = () => {
  const container = document.querySelector(".message-board-giscus")
  if (!container || container.querySelector("script, iframe")) return

  const giscus = document.createElement("script")
  giscus.src = "https://giscus.app/client.js"
  giscus.async = true
  giscus.crossOrigin = "anonymous"
  giscus.setAttribute("data-loading", "lazy")
  giscus.setAttribute("data-repo", "Carlos-L/research-blog")
  giscus.setAttribute("data-repo-id", "R_kgDOTLXb4A")
  giscus.setAttribute("data-category", "Announcements")
  giscus.setAttribute("data-category-id", "DIC_kwDOTLXb4M4DAYAO")
  giscus.setAttribute("data-mapping", "pathname")
  giscus.setAttribute("data-strict", "1")
  giscus.setAttribute("data-reactions-enabled", "1")
  giscus.setAttribute("data-emit-metadata", "0")
  giscus.setAttribute("data-input-position", "top")
  giscus.setAttribute("data-lang", "zh-CN")
  giscus.setAttribute("data-theme", document.documentElement.getAttribute("saved-theme") === "dark" ? "dark" : "light")
  container.appendChild(giscus)
}

const updateAboutMessageBoardTheme = (event) => {
  const frame = document.querySelector("iframe.giscus-frame")
  if (!frame?.contentWindow) return
  frame.contentWindow.postMessage(
    { giscus: { setConfig: { theme: event.detail.theme === "dark" ? "dark" : "light" } } },
    "https://giscus.app",
  )
}

document.addEventListener("nav", setupAboutMessageBoard)
document.addEventListener("render", setupAboutMessageBoard)
document.addEventListener("themechange", updateAboutMessageBoardTheme)
setupAboutMessageBoard()
`

export const AboutMessageBoard = () => {
  const Component = ({ fileData }) => {
    if (fileData.slug !== "about") return null

    return jsxs("section", {
      class: "about-message-board",
      "aria-labelledby": "message-board-title",
      children: [
        jsxs("header", {
          class: "message-board-heading",
          children: [
            jsx("p", { class: "message-board-kicker", children: "Conversation" }),
            jsx("h2", { id: "message-board-title", children: "留言板" }),
            jsx("p", { children: "欢迎留下问题、建议或简单打个招呼。留言由 GitHub Discussions 提供支持。" }),
          ],
        }),
        jsx("div", { class: "message-board-giscus giscus" }),
      ],
    })
  }
  Component.css = styles
  Component.afterDOMLoaded = script
  return Component
}
