# Quartz v5

> “[One] who works with the door open gets all kinds of interruptions, but [they] also occasionally gets clues as to what the world is and what might be important.” — Richard Hamming

Quartz is a set of tools that helps you publish your [digital garden](https://jzhao.xyz/posts/networked-thought) and notes as a website for free.

🔗 Read the documentation and get started: https://quartz.jzhao.xyz/

## Page access

Pages are public by default. To require the shared access key, add this frontmatter:

```yaml
---
access: restricted
---
```

Use `access: public` when you want the visibility to be explicit. For local builds, copy `.env.local.example` to `.env.local` and set `QUARTZ_RESTRICTED_PASSWORD`, then run `npm run build:site` or `npm run serve`.

The online deployment reads the same value from the GitHub Actions secret named `QUARTZ_RESTRICTED_PASSWORD`. Changing the key requires rebuilding the site. Linked images, PDFs, and other attachments remain separate static files and are not encrypted by this feature.

Restricted pages remain searchable by title, tags, and aliases before unlocking. After a visitor unlocks one restricted page, full-text search for all restricted pages is enabled for the current browser session. The body search index is encrypted and is never written to the public search index in plaintext.

[Join the Discord Community](https://discord.gg/cRFFHYye7t)

## Sponsors

<p align="center">
  <a href="https://github.com/sponsors/jackyzha0">
    <img src="https://cdn.jsdelivr.net/gh/jackyzha0/jackyzha0/sponsorkit/sponsors.svg" />
  </a>
</p>
