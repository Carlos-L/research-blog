import crypto from "node:crypto"
import fs from "node:fs/promises"
import path from "node:path"

const defaultOptions = {
  passwordEnv: "QUARTZ_RESTRICTED_PASSWORD",
  iterations: 600000,
  outputPath: "static/restrictedSearchIndex.json",
}

function encrypt(plaintext, password, iterations) {
  const salt = crypto.randomBytes(16)
  const iv = crypto.randomBytes(12)
  const key = crypto.pbkdf2Sync(password, salt, iterations, 32, "sha256")
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv)
  const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()])
  return Buffer.concat([salt, iv, cipher.getAuthTag(), ciphertext]).toString("base64")
}

function stringArray(value) {
  if (!Array.isArray(value)) return []
  return value.filter((item) => typeof item === "string")
}

export function RestrictedSearchCapture() {
  return {
    name: "RestrictedSearchCapture",
    htmlPlugins() {
      return [
        () => (_tree, file) => {
          if (file.data?.restricted !== true) return
          file.data.restrictedSearchText = String(file.data?.text ?? "")
        },
      ]
    },
  }
}

export function RestrictedSearchIndex(userOptions = {}) {
  const options = { ...defaultOptions, ...userOptions }

  return {
    name: "RestrictedSearchIndex",
    async emit(ctx, content) {
      const entries = []
      for (const [, file] of content) {
        if (file.data?.restricted !== true) continue
        const frontmatter = file.data?.frontmatter ?? {}
        entries.push({
          slug: String(file.data?.slug ?? ""),
          title: String(frontmatter.title ?? file.data?.slug ?? ""),
          tags: stringArray(frontmatter.tags),
          aliases: stringArray(frontmatter.aliases),
          content: String(file.data?.restrictedSearchText ?? ""),
        })
      }

      const password = process.env[options.passwordEnv]
      const payload =
        entries.length > 0 && typeof password === "string" && password.length > 0
          ? encrypt(JSON.stringify(entries), password, options.iterations)
          : ""
      const output = {
        version: 1,
        iterations: options.iterations,
        ciphertext: payload,
      }
      const outputPath = path.join(ctx.argv.output, options.outputPath)
      await fs.mkdir(path.dirname(outputPath), { recursive: true })
      await fs.writeFile(outputPath, JSON.stringify(output))
      return [outputPath]
    },
  }
}
