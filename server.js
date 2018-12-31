const http = require('http');
const ports = [20000, 20001];

const startServer = port => {
    const listening = (server) => {
        console.log(`server${server} is listening on port ${port}`);
    };
    const servername = ports.indexOf(port);
    const server = http.createServer((req, res)=>{
        if(/\/favicon\.ico/g.test(req.url)){
            return res.end();
        }
        console.log(`${new Date()}, Get incoming request to ${servername}, host is ${req.headers.host}, url is ${req.url}`);
        if(/\/data\/check/g.test(req.url)){
            return res.end('success');
        }
        if(/\/data\/mockapi/g.test(req.url)){
            return res.end('data service is succesfully returned');
        }
        res.end('ok');
    }).once('error', (err)=>{
        if(err.code === 'EADDRINUSE'){
            console.error('Address is in use');
            setTimeout(()=>{
                server.close();
                server.listen(port, listening.bind(null, servername))
            }, 3000);
        }else
            console.error(err.stack);
    });
    server.listen(port, listening.bind(null, servername));
    return server;
};

const s1 = startServer(ports[0]);
// const s2 = startServer(ports[1]);

