import fs from 'fs'
import path from 'path'

import { minify } from 'html-minifier-terser'
import type { Plugin } from 'vite'

const MIME: Record<string, string> = {
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

function inlinePublicAssets(): Plugin {
  let outDir = 'dist'

  return {
    name: 'vite:inline-public',
    enforce: 'post',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
      const htmlPath = path.join(outDir, 'index.html')
      let html = fs.readFileSync(htmlPath, 'utf-8')

      const files = fs.readdirSync(outDir).filter((f) => f !== 'index.html')
      for (const file of files) {
        const ext = path.extname(file).toLowerCase()
        const mime = MIME[ext] ?? 'application/octet-stream'
        const filePath = path.join(outDir, file)
        const content = fs.readFileSync(filePath)
        const base64 = content.toString('base64')
        const dataUri = `data:${mime};base64,${base64}`

        const attrRe = new RegExp(
          `(src|href)="([^"]*?)${escapeRe(file)}"`,
          'g'
        )
        html = html.replace(attrRe, (_, attr) => `${attr}="${dataUri}"`)

        const urlRe = new RegExp(
          `url\\([^)]*?${escapeRe(file)}\\)`,
          'g'
        )
        html = html.replace(urlRe, () => `url(${dataUri})`)
        fs.unlinkSync(filePath)
      }

      html = await minify(html, {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        removeEmptyAttributes: true,
      })

      fs.writeFileSync(htmlPath, html)
    },
  }
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export default inlinePublicAssets
