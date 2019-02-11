const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const body = [];

  req.on('data', (chunk) => {
    body.push(chunk);
  });

  req.on('end', () => {
    const receivedMessage = body.toString();
    let template = fs.readFileSync(path.join(__dirname, 'index.html'));

    if (receivedMessage) {
      template = template.toString().replace(/{message}/, receivedMessage);
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write(template);
    res.end();
  });

  req.on('error', (error) => {
    console.log(error);
  });
});

server.listen(3000, console.log('Server listening on port 3000'));
