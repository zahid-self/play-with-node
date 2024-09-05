import { createServer } from "node:http";

const hostName = 'localhost';
const port = 3000;
const server = createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.end('Hello world!');
})

server.listen(port, hostName, () => {
  console.log(`Server is listening at http://${hostName}:${port}/`)
});