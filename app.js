const http = require('http');
const fs = require('fs');
// ways of creating a server call back  function with require and response parameters
// factory function
// function rqListener(req,res){
// }
// http.createServer(rqListener);

// OR 
// anonymous function
// http.createServe(function(req,res){

// });
// OR 
// arrow function
http.createServer((req,res) => {
    console.log(req);

});
const server = http.createServer((req,res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>ENTER MESSAGE</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url === '/message' && method ==='POST'){
        const body = [];
        req.on('data',(chunk)=>{
            console.log(chunk)
            body.push(chunk);
        });
        req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.text',message);
        });
        res.statusCode = 302;
        res.setHeader('Location','/');
        return res.end();
    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body><h1>Welcome to my node js page</h1></body>');
    res.write('</html>');
    res.end();

});
server.listen(3000);

