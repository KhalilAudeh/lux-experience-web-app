import { dirname, join } from 'path';

import { createServer as createViteServer } from 'vite';
import express from 'express';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();
  
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  app.use(vite.middlewares);

  app.use('*', async (req, res) => {
    try {
      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
      const { html } = render(req.originalUrl);

      const template = await vite.transformIndexHtml(
        req.originalUrl,
        await vite.readFile(join(__dirname, 'index.html'))
      );

      res.status(200).set({ 'Content-Type': 'text/html' }).end(
        template.replace('<!--ssr-outlet-->', html)
      );
    } catch (e) {
      vite.ssrFixStacktrace(e);
      res.status(500).end(e.message);
    }
  });

  app.listen(3000, () => {
    console.log('SSR server running at http://localhost:3000');
  });
}

createServer();