import { APP_BASE_HREF } from '@angular/common';
import { renderApplication } from '@angular/platform-server';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { readFileSync } from 'node:fs';

import bootstrap from './main.server';

const server = express();
const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

// Read the index.html template
let indexHtml: string;
try {
  indexHtml = readFileSync(join(browserDistFolder, 'index.html'), 'utf-8');
} catch {
  // Fallback for development
  indexHtml = readFileSync(join(__dirname, '../src/index.html'), 'utf-8');
}

server.set('view engine', 'html');
server.set('views', browserDistFolder);

// Serve static files from /browser
server.get('*.*', express.static(browserDistFolder, {
  maxAge: '1y'
}));

// All regular routes use Angular Universal
server.get('*', async (req, res, next) => {
  try {
    const { protocol, originalUrl, baseUrl, headers } = req;

    const html = await renderApplication(bootstrap, {
      document: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      platformProviders: [
        { provide: APP_BASE_HREF, useValue: baseUrl }
      ]
    });

    res.send(html);
  } catch (err) {
    console.error('SSR Error:', err);
    res.status(500).send('Server Error');
  }
});

const port = process.env['PORT'] || 4000;

server.listen(port, () => {
  console.log(`Angular SSR server listening on http://localhost:${port}`);
});