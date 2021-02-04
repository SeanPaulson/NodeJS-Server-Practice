const router = require('./router.js');
//problem: Need a simple way to look at a users badge count and JavaScript point from a web browser

//solutions: Use node.js to perform profile look ups and serve our template via HTTP

//1. Create web server
const http = require('http');
const https = require('https');



  const hostname = '127.0.0.1';
  const port = 3000;

  const server = http.createServer((req, res) => {
    let username = req.url.replace("/", "");
    console.log('******searching for server req******');
    console.log(req.url);
    /* if(req.url.indexOf('.css') !== -1) {
        router.style(req, res);
    } else */ if(req.url === "/") {
        router.home(req, res);
    } else if(username.length > 0 && username !== 'recources/index.css') {
        router.user(req, res);
    }

  });

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });



