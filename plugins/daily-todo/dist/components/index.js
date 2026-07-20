import { jsx, jsxs } from "preact/jsx-runtime"

const styles = `
.daily-todo-entry{width:min(100%,var(--reading-width));margin:0 auto 1.5rem}
.daily-todo-link{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:1rem;align-items:center;padding:1rem 0;border-top:1px solid var(--border-subtle);border-bottom:1px solid var(--border-subtle);color:var(--dark)}
.daily-todo-link:hover{color:var(--secondary)}
.daily-todo-label{display:grid;gap:.25rem;min-width:0}
.daily-todo-kicker{color:var(--secondary);font-family:var(--codeFont);font-size:.68rem;font-weight:650;letter-spacing:.12em;text-transform:uppercase}
.daily-todo-title{font-size:1.05rem;font-weight:650}
.daily-todo-arrow{color:var(--gray);font-family:var(--codeFont);font-size:1rem;transition:transform .15s ease,color .15s ease}
.daily-todo-link:hover .daily-todo-arrow{color:var(--secondary);transform:translateX(.2rem)}
`

export const DailyTodo = () => {
  const Component = ({ fileData, allFiles }) => {
    if (fileData.slug !== "daily/index") return null

    const todo = allFiles.find((file) => file.slug === "daily/todo-list")
    if (!todo) return null

    const title = todo.frontmatter?.title ?? "Todo List"

    return jsx("section", {
      class: "daily-todo-entry",
      "aria-label": "Todo List",
      children: jsxs("a", {
        class: "daily-todo-link",
        href: "./todo-list",
        children: [
          jsxs("span", {
            class: "daily-todo-label",
            children: [
              jsx("span", { class: "daily-todo-kicker", children: "TASKS" }),
              jsx("span", { class: "daily-todo-title", children: title }),
            ],
          }),
          jsx("span", { class: "daily-todo-arrow", "aria-hidden": "true", children: "->" }),
        ],
      }),
    })
  }
  Component.css = styles
  return Component
}
