const styles = `
.encrypted-page {
  position: relative;
  isolation: isolate;
  min-height: 390px;
  overflow: hidden;
  border: 1px solid var(--lightgray);
  border-radius: 16px;
  background: var(--light);
  box-shadow: 0 18px 50px color-mix(in srgb, var(--dark) 8%, transparent);
}

.encrypted-page::before {
  position: absolute;
  inset: 1.25rem;
  z-index: -2;
  content: "";
  border-radius: 12px;
  background:
    linear-gradient(90deg, transparent 0 12%, color-mix(in srgb, var(--darkgray) 13%, transparent) 12% 82%, transparent 82%) 0 1.2rem / 100% 1rem no-repeat,
    repeating-linear-gradient(180deg, color-mix(in srgb, var(--darkgray) 13%, transparent) 0 10px, transparent 10px 28px);
  filter: blur(6px);
  opacity: 0.75;
  transform: scale(1.02);
}

.encrypted-page::after {
  position: absolute;
  inset: 0;
  z-index: -1;
  content: "";
  background: color-mix(in srgb, var(--light) 72%, transparent);
  backdrop-filter: blur(5px);
}

.encrypted-page-form {
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  max-width: 460px;
  padding: 2rem;
  border: 1px solid color-mix(in srgb, var(--secondary) 20%, var(--lightgray));
  border-radius: 14px;
  background: color-mix(in srgb, var(--light) 94%, transparent);
  box-shadow: 0 12px 32px color-mix(in srgb, var(--dark) 10%, transparent);
  backdrop-filter: blur(16px);
}

.encrypted-page-icon {
  color: var(--secondary);
  opacity: 0.9;
}

.restricted-access-kicker {
  margin: -0.35rem 0 -0.55rem;
  color: var(--secondary);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.restricted-access-title {
  margin: 0;
  color: var(--dark);
  font-size: 1.25rem;
}

.encrypted-page-label {
  color: var(--darkgray);
}

.encrypted-page-input {
  min-width: 0;
  border-radius: 8px;
}

.encrypted-page-submit {
  border-radius: 8px;
}

.restricted-access-contact {
  margin: 0;
  color: var(--gray);
  font-size: 0.82rem;
  line-height: 1.6;
}

.restricted-access-contact a {
  color: var(--secondary);
  font-weight: 600;
}

.restricted-page-unconfigured {
  margin: 2rem 0;
  padding: 1.25rem 1.5rem;
  border: 1px solid var(--lightgray);
  border-radius: 12px;
  background: var(--lightgray);
  color: var(--darkgray);
}

.restricted-page-unconfigured p {
  margin-bottom: 0;
}

.restricted-search-result .restricted-search-badge {
  display: inline-block;
  margin-top: 0.45rem;
  padding: 0.15rem 0.45rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--secondary) 12%, transparent);
  color: var(--secondary);
  font-size: 0.72rem;
  font-weight: 700;
}

@media (max-width: 520px) {
  .encrypted-page {
    min-height: 360px;
    padding: 1rem;
  }

  .encrypted-page-form {
    padding: 1.5rem 1.1rem;
  }

  .encrypted-page-input-row {
    flex-direction: column;
  }
}
`

function safeJson(value) {
  return JSON.stringify(value).replaceAll("<", "\\u003c")
}

export const RestrictedAccess = (userOptions = {}) => {
  const contactLabel = userOptions.contactLabel ?? "联系站点作者"
  const contactUrl = userOptions.contactUrl ?? ""
  const script = `
(() => {
  const contactLabel = ${safeJson(contactLabel)}
  const contactUrl = ${safeJson(contactUrl)}
  const passwordStorageKey = "encrypted-pages-passwords"
  const searchCacheKey = "restricted-access-search-index-v1"
  let scheduled = false
  let searchScheduled = false
  let restrictedSearchEntries = []

  const setText = (element, value) => {
    if (element && element.textContent !== value) element.textContent = value
  }

  const base64ToBytes = (value) => {
    const binary = atob(value)
    const bytes = new Uint8Array(binary.length)
    for (let index = 0; index < binary.length; index++) bytes[index] = binary.charCodeAt(index)
    return bytes
  }

  const decryptSearchIndex = async (ciphertext, password, iterations) => {
    const data = base64ToBytes(ciphertext)
    const salt = data.slice(0, 16)
    const iv = data.slice(16, 28)
    const authTag = data.slice(28, 44)
    const encrypted = data.slice(44)
    const encryptedWithTag = new Uint8Array(encrypted.length + authTag.length)
    encryptedWithTag.set(encrypted)
    encryptedWithTag.set(authTag, encrypted.length)

    const encoder = new TextEncoder()
    const passwordKey = await crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      "PBKDF2",
      false,
      ["deriveKey"],
    )
    const key = await crypto.subtle.deriveKey(
      { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
      passwordKey,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"],
    )
    const plaintext = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, encryptedWithTag)
    return JSON.parse(new TextDecoder().decode(plaintext))
  }

  const getCachedPasswords = () => {
    try {
      const passwords = JSON.parse(sessionStorage.getItem(passwordStorageKey) ?? "[]")
      return Array.isArray(passwords) ? passwords : []
    } catch {
      return []
    }
  }

  const restrictedSearchUrl = () => {
    const basePath = document.body?.dataset?.basepath ?? ""
    return (basePath && basePath !== "/" ? basePath : "") + "/static/restrictedSearchIndex.json"
  }

  const normalizeSearchText = (value) =>
    String(value ?? "")
      .toLocaleLowerCase()
      .replace(/[\\[\\]_*~#>]/g, "")
      .replace(/\\s+/g, " ")
      .trim()

  const searchHref = (slug) => {
    const basePath = document.body?.dataset?.basepath ?? ""
    return (basePath && basePath !== "/" ? basePath : "") + "/" + slug
  }

  const searchSnippet = (content, query) => {
    const normalizedContent = normalizeSearchText(content)
    const normalizedQuery = normalizeSearchText(query)
    const index = normalizedContent.indexOf(normalizedQuery)
    if (index < 0) return String(content).slice(0, 180)
    const start = Math.max(0, index - 55)
    const end = Math.min(normalizedContent.length, index + normalizedQuery.length + 95)
    return (start > 0 ? "…" : "") + normalizedContent.slice(start, end) + (end < normalizedContent.length ? "…" : "")
  }

  const renderRestrictedSearchResults = () => {
    searchScheduled = false
    const input = document.querySelector(".search-bar")
    const results = document.querySelector(".search-layout .results-container")
    const layout = document.querySelector(".search-layout")
    if (!input || !results || !layout) return

    results.querySelectorAll(".restricted-search-result").forEach((result) => result.remove())
    const query = input.value.trim()
    const normalizedQuery = normalizeSearchText(query)
    if (!normalizedQuery || restrictedSearchEntries.length === 0) return

    const matches = restrictedSearchEntries
      .filter((entry) =>
        normalizeSearchText(
          [entry.title, ...(entry.tags ?? []), ...(entry.aliases ?? []), entry.content].join(" "),
        ).includes(normalizedQuery),
      )
      .slice(0, 20)
    if (matches.length === 0) return

    results.querySelectorAll(".no-match").forEach((result) => result.remove())
    layout.classList.add("display-results")
    const existingSlugs = new Set(
      Array.from(results.querySelectorAll(".result-card[id]")).map((result) => result.id),
    )

    for (const entry of matches) {
      if (existingSlugs.has(entry.slug)) continue
      const link = document.createElement("a")
      link.className = "result-card restricted-search-result"
      link.id = entry.slug
      link.href = searchHref(entry.slug)

      const title = document.createElement("h3")
      title.className = "card-title"
      title.textContent = entry.title
      link.append(title)

      const snippet = document.createElement("p")
      snippet.className = "card-description"
      snippet.textContent = searchSnippet(entry.content, query)
      link.append(snippet)

      const badge = document.createElement("span")
      badge.className = "restricted-search-badge"
      badge.textContent = "限制内容 · 已解锁全文索引"
      link.append(badge)
      results.append(link)
    }
  }

  const scheduleRestrictedSearch = () => {
    if (searchScheduled) clearTimeout(searchScheduled)
    searchScheduled = setTimeout(renderRestrictedSearchResults, 180)
  }

  const loadRestrictedSearchIndex = async () => {
    const passwords = getCachedPasswords()
    if (passwords.length === 0) return
    try {
      const response = await fetch(restrictedSearchUrl())
      if (!response.ok) return
      const encryptedIndex = await response.json()
      if (!encryptedIndex?.ciphertext) return
      const cacheId = encryptedIndex.ciphertext.slice(0, 48)
      try {
        const cached = JSON.parse(sessionStorage.getItem(searchCacheKey) ?? "null")
        if (cached?.id === cacheId && Array.isArray(cached.entries)) {
          restrictedSearchEntries = cached.entries
          scheduleRestrictedSearch()
          return
        }
      } catch {}

      for (const password of passwords) {
        try {
          const entries = await decryptSearchIndex(
            encryptedIndex.ciphertext,
            password,
            encryptedIndex.iterations,
          )
          if (!Array.isArray(entries)) continue
          restrictedSearchEntries = entries
          sessionStorage.setItem(searchCacheKey, JSON.stringify({ id: cacheId, entries }))
          scheduleRestrictedSearch()
          return
        } catch {}
      }
    } catch {}
  }

  const enhance = () => {
    scheduled = false
    document.querySelectorAll(".encrypted-page-form").forEach((form) => {
      if (!form.querySelector(".restricted-access-kicker")) {
        const icon = form.querySelector(".encrypted-page-icon")
        const kicker = document.createElement("p")
        kicker.className = "restricted-access-kicker"
        kicker.textContent = "Restricted Access"
        icon?.after(kicker)

        const title = document.createElement("h2")
        title.className = "restricted-access-title"
        title.textContent = "此内容已上锁"
        kicker.after(title)
      }

      setText(form.querySelector(".encrypted-page-label"), "请输入访问密钥以查看正文。")

      const input = form.querySelector(".encrypted-page-input")
      if (input) {
        input.placeholder = "访问密钥"
        input.autocomplete = "current-password"
        input.setAttribute("aria-label", "访问密钥")
      }

      const button = form.querySelector(".encrypted-page-submit")
      setText(button, button?.disabled ? "正在解锁…" : "解锁")

      const error = form.querySelector(".encrypted-page-error")
      if (error?.textContent?.includes("Incorrect password")) {
        error.textContent = "密钥不正确，请重试。"
      }

      if (!form.querySelector(".restricted-access-contact")) {
        const contact = document.createElement("p")
        contact.className = "restricted-access-contact"
        contact.append("如需访问权限，请联系：")
        if (contactUrl) {
          const link = document.createElement("a")
          link.href = contactUrl
          link.textContent = contactLabel
          contact.append(link)
        } else {
          contact.append(contactLabel)
        }
        form.append(contact)
      }
    })
  }

  const schedule = () => {
    if (scheduled) return
    scheduled = true
    queueMicrotask(enhance)
  }

  window.__restrictedAccessObserver?.disconnect?.()
  window.__restrictedAccessObserver = new MutationObserver(schedule)
  window.__restrictedAccessObserver.observe(document.documentElement, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: ["disabled"],
  })

  window.__restrictedSearchController?.abort?.()
  window.__restrictedSearchController = new AbortController()
  const searchSignal = window.__restrictedSearchController.signal
  document.addEventListener(
    "input",
    (event) => {
      if (event.target?.matches?.(".search-bar")) scheduleRestrictedSearch()
    },
    { signal: searchSignal },
  )

  const handlePageEvent = () => {
    schedule()
    loadRestrictedSearchIndex()
  }
  document.addEventListener("nav", handlePageEvent, { signal: searchSignal })
  document.addEventListener("render", handlePageEvent, { signal: searchSignal })
  schedule()
  loadRestrictedSearchIndex()
})()
`

  const Component = () => null
  Component.css = styles
  Component.afterDOMLoaded = script
  return Component
}
