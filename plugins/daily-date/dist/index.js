export default function DailyFilenameDate() {
  return {
    name: "DailyFilenameDate",
    markdownPlugins() {
      return [
        () => (_tree, file) => {
          const relativePath = file.data.relativePath?.replaceAll("\\", "/") ?? ""
          const match = relativePath.match(/(?:^|\/)Daily\/(\d{4}-\d{2}-\d{2})\.md$/i)
          if (!match || !file.data.dates) return

          const date = new Date(`${match[1]}T00:00:00`)
          file.data.dates.published = date
          file.data.defaultDateType = "published"
        },
      ]
    },
  }
}
