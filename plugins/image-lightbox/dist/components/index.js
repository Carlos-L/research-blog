const styles = `
.markdown-preview-view img:not(.lightbox-image){cursor:zoom-in}
.markdown-preview-view a img{cursor:pointer}
.image-lightbox{position:fixed;inset:0;z-index:10000;display:none;place-items:center;padding:clamp(1rem,4vw,3rem);background:rgba(5,10,20,.9);backdrop-filter:blur(8px)}
.image-lightbox[data-open="true"]{display:grid}
.image-lightbox-figure{display:grid;place-items:center;gap:.8rem;max-width:100%;max-height:100%;margin:0}
.image-lightbox-image{display:block;max-width:min(96vw,1800px);max-height:88vh;object-fit:contain;border-radius:.35rem;box-shadow:0 24px 80px rgba(0,0,0,.45)}
.image-lightbox-caption{max-width:min(80vw,60rem);color:#e5e7eb;font-size:.82rem;text-align:center}
.image-lightbox-close{position:absolute;top:max(1rem,env(safe-area-inset-top));right:max(1rem,env(safe-area-inset-right));display:grid;place-items:center;width:2.5rem;height:2.5rem;padding:0;border:1px solid rgba(255,255,255,.25);border-radius:999px;background:rgba(15,23,42,.7);color:#fff;font:400 1.55rem/1 sans-serif;cursor:pointer}
.image-lightbox-close:hover{background:rgba(51,65,85,.9)}
body.lightbox-open{overflow:hidden}
`

const script = `
(() => {
  if (window.__imageLightboxBound) return
  window.__imageLightboxBound = true

  const overlay = document.createElement("div")
  overlay.className = "image-lightbox"
  overlay.setAttribute("role", "dialog")
  overlay.setAttribute("aria-modal", "true")
  overlay.setAttribute("aria-label", "Image preview")
  overlay.innerHTML = '<button class="image-lightbox-close" type="button" aria-label="Close image preview">×</button><figure class="image-lightbox-figure"><img class="image-lightbox-image" alt=""><figcaption class="image-lightbox-caption"></figcaption></figure>'
  document.body.appendChild(overlay)

  const preview = overlay.querySelector(".image-lightbox-image")
  const caption = overlay.querySelector(".image-lightbox-caption")
  const closeButton = overlay.querySelector(".image-lightbox-close")
  let previousFocus = null

  const close = () => {
    if (overlay.dataset.open !== "true") return
    delete overlay.dataset.open
    document.body.classList.remove("lightbox-open")
    preview.removeAttribute("src")
    previousFocus?.focus?.()
  }

  document.addEventListener("click", (event) => {
    const image = event.target.closest?.(".markdown-preview-view img")
    if (!image || image.closest("a")) return
    event.preventDefault()
    previousFocus = document.activeElement
    preview.src = image.currentSrc || image.src
    preview.alt = image.alt || ""
    caption.textContent = image.alt || ""
    caption.hidden = !image.alt
    overlay.dataset.open = "true"
    document.body.classList.add("lightbox-open")
    closeButton.focus()
  })

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay || event.target === closeButton) close()
  })
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close()
  })
  document.addEventListener("prenav", close)
})()
`

export const ImageLightbox = () => {
  const Component = () => null
  Component.css = styles
  Component.afterDOMLoaded = script
  return Component
}
