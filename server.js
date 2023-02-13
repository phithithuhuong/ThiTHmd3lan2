const http = require('http');
const url = require('url');
const notFound = require('./controller/handler/notFound')
const router = require('./controller/router');

const server = http.createServer((req, res) => {
    let urlParse = url.parse(req.url);
    let path = urlParse.pathname;
    let chooseHandle;
    if (typeof router[path]!=='undefined'){
        chooseHandle =router[path]
    } else {
        chooseHandle = notFound.notFound
    }
    chooseHandle(req,res)
})
server.listen(7777,()=>{
    console.log('http://localhost:7777/list')
})