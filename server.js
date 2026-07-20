const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const MIME = {
    '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
    '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.xml': 'application/xml',
    '.txt': 'text/plain'
};

http.createServer((req, res) => {
    let filePath = req.url === '/' ? '/index.html' : req.url.split('?')[0];
    filePath = path.join(__dirname, filePath);
    const ext = path.extname(filePath);

    fs.readFile(filePath, (err, content) => {
        if (err) { res.writeHead(404); res.end('404'); }
        else { res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' }); res.end(content); }
    });
}).listen(PORT, () => {
    console.log(`\n  XariciNomreAz server:`);
    console.log(`  Sayt:  http://localhost:${PORT}`);
    console.log(`  Admin: http://localhost:${PORT}/admin.html\n`);
});
