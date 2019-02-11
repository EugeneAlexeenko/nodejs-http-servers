const http = require('http');
const fs = require('fs');
const path = require('path');
const { Transform } = require('stream');


const server = http.createServer((req, res) => {
  const body = [];

  req.on('data', (chunk) => {
    body.push(chunk);
  });

  req.on('end', () => {
    const receivedMessage = body.toString();

    let templateReadStream = fs.createReadStream(path.join(__dirname, 'index.html'));

    if (!receivedMessage) {
      templateReadStream
        .once('data', () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html');
        })
        .pipe(res);

        return;
    }

    const templateTransform = new Transform({
      transform(chunk, encoding, callback) {
        this.push(chunk.toString().replace(/{message}/, receivedMessage));
        callback();
      },
    });

    templateReadStream
      .pipe(templateTransform)
      .once('data', () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
      })
      .pipe(res);
  });

  req.on('error', (error) => {
    console.log(error);
  });
});

server.listen(3000, console.log('Server listening on port 3000'));
