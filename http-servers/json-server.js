const http = require('http');
const { EOL } = require('os');

const server = http.createServer();

const product = {
  id: 1,
  name: 'Supreme T-Shirt',
  brand: 'Supreme',
  price: 99.99,
  options: [
    { color: 'blue' },
    { size: 'XL' },
  ],
};

server.on('request', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(product));
  res.end(EOL);
});

server.on('error', (error) => {
  console.log(error);
});

server.listen(3000, console.log('Server listening on port 3000'));
