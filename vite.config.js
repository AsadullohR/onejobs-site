import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

// Serves the Netlify function at the same URL during `npm run dev` / `vite preview`,
// so the Telegram vacancies feed works locally.
const netlifyFunctionsLocal = () => {
  const attach = (server, load) =>
    server.middlewares.use('/.netlify/functions/vacancies', async (req, res) => {
      const mod = await load()
      const response = await mod.default(new Request('http://localhost' + req.url))
      res.statusCode = response.status
      res.setHeader('Content-Type', response.headers.get('Content-Type'))
      res.end(await response.text())
    })
  const path = './netlify/functions/vacancies/vacancies.mjs'
  return {
    name: 'netlify-functions-local',
    configureServer(server) {
      attach(server, () => server.ssrLoadModule(path))
    },
    configurePreviewServer(server) {
      attach(server, () => import(pathToFileURL(resolve(path)).href))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), netlifyFunctionsLocal()],
})
