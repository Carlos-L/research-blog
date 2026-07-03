import { Fragment, jsx, jsxs } from "preact/jsx-runtime"

const LIMIT = 5

const timestamp = (file) => {
  const dates = file.dates
  return (dates?.published ?? dates?.modified ?? dates?.created)?.getTime?.() ?? 0
}

const section = ({ files, kicker, title, moreHref }) =>
  jsx("section", {
    class: "home-section",
    children: jsxs(Fragment, {
      children: [
        jsxs("div", {
          class: "home-section-heading",
          children: [
            jsxs("div", {
              children: [
                jsx("p", { class: "home-section-kicker", children: kicker }),
                jsx("h2", { children: title }),
              ],
            }),
            jsx("a", { href: moreHref, children: "View all →" }),
          ],
        }),
        files.map((file) =>
          jsx("a", {
            class: "home-entry",
            href: `./${file.slug}`,
            children: file.frontmatter?.title ?? file.slug.split("/").at(-1),
          }),
        ),
      ],
    }),
  })

export const HomeRecent = () => {
  const Component = ({ fileData, allFiles, cfg }) => {
    if (fileData.slug !== "index") return null

    const visible = allFiles.filter((file) => file.slug && file.unlisted !== true)
    const daily = visible
      .filter((file) => /^daily\/\d{4}-\d{2}-\d{2}$/.test(file.slug))
      .sort((a, b) => b.slug.localeCompare(a.slug))
      .slice(0, LIMIT)
    const notes = visible
      .filter((file) => file.slug.startsWith("notes/") && file.slug !== "notes/index")
      .sort((a, b) => timestamp(b) - timestamp(a))
      .slice(0, LIMIT)
    return jsxs("div", {
      class: "home-sections",
      children: [
        section({
          files: daily,
          kicker: "LAB LOG",
          title: "Recent Daily",
          moreHref: "./daily/",
        }),
        section({
          files: notes,
          kicker: "RESEARCH NOTES",
          title: "Recent Notes",
          moreHref: "./notes/",
        }),
      ],
    })
  }
  return Component
}
