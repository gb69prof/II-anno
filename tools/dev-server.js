import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const args = process.argv.slice(2);
const valueAfter = (flag, fallback) => args.includes(flag) ? args[args.indexOf(flag) + 1] : fallback;
const host = valueAfter('--host', '127.0.0.1');
const port = Number(valueAfter('--port', '4173'));
const root = process.cwd();
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml', '.png': 'image/png', '.mp4': 'video/mp4' };

createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
    let file = normalize(join(root, pathname === '/' ? 'index.html' : pathname));
    if (!file.startsWith(root)) throw new Error('Invalid path');
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    // Stream local video and honor byte ranges, as the production static server does.
    if (extname(file) === '.mp4') {
      const { size } = await stat(file);
      const headers = { 'content-type': types['.mp4'], 'accept-ranges': 'bytes', 'cache-control': 'no-store' };
      let start = 0, end = size - 1;
      if (request.headers.range) {
        const range = /^bytes=(\d*)-(\d*)$/.exec(request.headers.range);
        if (!range || (!range[1] && !range[2])) {
          response.writeHead(416, { ...headers, 'content-range': `bytes */${size}` }); response.end(); return;
        }
        if (range[1]) { start = Number(range[1]); end = range[2] ? Math.min(Number(range[2]), end) : end; }
        else start = Math.max(0, size - Number(range[2]));
        if (start > end || start >= size) {
          response.writeHead(416, { ...headers, 'content-range': `bytes */${size}` }); response.end(); return;
        }
        headers['content-range'] = `bytes ${start}-${end}/${size}`;
      }
      headers['content-length'] = end - start + 1;
      response.writeHead(request.headers.range ? 206 : 200, headers);
      if (request.method === 'HEAD') response.end();
      else createReadStream(file, { start, end }).pipe(response);
      return;
    }
    const body = await readFile(file);
    response.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' });
    response.end(body);
  } catch {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
}).listen(port, host, () => console.log(`Antologia disponibile su http://${host}:${port}`));
