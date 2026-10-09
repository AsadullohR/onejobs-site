import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

// Serves the Netlify functions at the same URLs during `npm run dev` / `vite preview`,
// so the Telegram and YouTube feeds work locally.
const netlifyFunctionsLocal = () => {
  const names = ['vacancies', 'visas', 'videos']
  const attach = (server, load) =>
    server.middlewares.use('/.netlify/functions', async (req, res, next) => {
      const name = req.url.split(/[/?]/)[1]
      if (!names.includes(name)) return next()
      const mod = await load(`./netlify/functions/${name}/${name}.mjs`)
      const response = await mod.default(new Request('http://localhost' + req.url))
      res.statusCode = response.status
      res.setHeader('Content-Type', response.headers.get('Content-Type'))
      res.end(await response.text())
    })
  return {
    name: 'netlify-functions-local',
    configureServer(server) {
      attach(server, (path) => server.ssrLoadModule(path))
    },
    configurePreviewServer(server) {
      attach(server, (path) => import(pathToFileURL(resolve(path)).href))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), netlifyFunctionsLocal()],
})
