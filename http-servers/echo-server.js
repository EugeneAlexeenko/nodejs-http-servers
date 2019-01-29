const http = require('http');
const { EOL } = require('os');

const server = http.createServer();

server.on('request', (req, res) => {
  req.pipe(res, { end: false });
  req.on('end', () => {
    res.end(EOL);
  });
});

server.listen(3000, console.log('Server listening on port 3000'));
