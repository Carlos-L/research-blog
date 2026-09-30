const defaultOptions = {
  accessField: "access",
  publicValue: "public",
  passwordEnv: "QUARTZ_RESTRICTED_PASSWORD",
  passwordField: "__restrictedAccessKey",
}

function isRestricted(frontmatter, options) {
  const access = frontmatter[options.accessField]
  if (access === undefined || access === null || access === "") return false
  return String(access).trim().toLowerCase() !== options.publicValue.toLowerCase()
}

function searchableMetadata(frontmatter, file) {
  const values = [frontmatter.title, frontmatter.tags, frontmatter.aliases]
    .flatMap((value) => (Array.isArray(value) ? value : [value]))
    .filter((value) => typeof value === "string" && value.trim().length > 0)
    .map((value) => value.trim())

  if (values.length > 0) return [...new Set(values)].join(" ")
  return String(file.data?.slug ?? file.data?.relativePath ?? "限制访问页面")
}

export default function RestrictedAccess(userOptions = {}) {
  const options = { ...defaultOptions, ...userOptions }

  return {
    name: "RestrictedAccess",
    markdownPlugins() {
      return [
        () => (_tree, file) => {
          const frontmatter = file.data?.frontmatter ?? {}
          if (!isRestricted(frontmatter, options)) return

          file.data.restricted = true
          const password = process.env[options.passwordEnv]
          if (typeof password === "string" && password.length > 0) {
            frontmatter[options.passwordField] = password
          }
        },
      ]
    },
    htmlPlugins() {
      return [
        () => (tree, file) => {
          const frontmatter = file.data?.frontmatter ?? {}
          delete frontmatter[options.passwordField]

          if (file.data?.restricted !== true) return

          file.data.text = searchableMetadata(frontmatter, file)
          file.data.description = "此页面需要密钥访问。"

          if (file.data?.encrypted === true) return

          tree.children = [
            {
              type: "element",
              tagName: "div",
              properties: {
                className: ["restricted-page-unconfigured"],
                role: "alert",
              },
              children: [
                {
                  type: "element",
                  tagName: "strong",
                  properties: {},
                  children: [{ type: "text", value: "此限制页面暂时无法解锁" }],
                },
                {
                  type: "element",
                  tagName: "p",
                  properties: {},
                  children: [
                    {
                      type: "text",
                      value: `部署时缺少 ${options.passwordEnv}，正文已安全隐藏。`,
                    },
                  ],
                },
              ],
            },
          ]
        },
      ]
    },
  }
}
