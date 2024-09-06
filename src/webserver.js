const { readFileSync, writeFileSync } = require("node:fs");
const http = require("node:http");
const querystring = require('node:querystring');

const routes = {
  "/": {
    GET: (_req, res) => {
      sendResponse(res, { data: { message: 'Hi' } })
    }
  },
  "/students": {
    GET: (_req, res) => {
      const data = readFileSync('./db/students.json');
      const students = JSON.parse(data);
      sendResponse(res, { data: students })
    },
    POST: (req, res) => {
      let body = ''
      req.on('data', (chunk) => {
        body += chunk.toString()
      })
      req.on('end', () => {
        const student = JSON.parse(body);
        const data = readFileSync('./db/students.json');
        const students = JSON.parse(data);
        students.push(student);
        writeFileSync('./db/students.json', JSON.stringify(students));
        sendResponse(res, { data: students })
      })
    }
  },
  default: (_req, res) => {
    sendResponse(res, { status: 404, data: { message: 'Not found!' } })
  }
}


const sendResponse = (res, { status = 200, data = {} }) => {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(data))
}

const server = http.createServer((req, res) => {
  const { url, method } = req;
  console.log(url);
  const currentRoute = f[url] || routes.default;
  const handler = currentRoute[method] || routes.default;
  handler(req, res);
});

server.listen(4000, () => {
  console.log(`Server is listening 4000`)
})