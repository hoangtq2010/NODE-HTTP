const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    //console.log(req.headers);
    console.log("Request for " + req.url + ' by method ' + req.method);

    //res.statusCode = 200;
    //res.setHeader('Content-Type', 'text/html');
    //res.end('<html><body><h1>Hello World!</h1></body></html>');

    //Kiem tra cac phuong phap
    if (req.method == 'GET') {
        var fileUrl;
        if (req.url == '/') fileUrl = '/index.html'; //neu ko ghi ten tep cu the, thi chi can gui request den port
                                                    //3000 no se tu dong mac dinh la index.html
        else fileUrl = req.url;
        //Vay ban da xay dung 1 tap tin vao may chu
        var filePath  = path.resolve('./public'+ fileUrl);
        const fileExt = path.extname(filePath); //Tu filePath kiem tra phan mo rong tep
        if (fileExt == '.html') {    //neu tap tin ton tai
            fs.exists(filePath, (exists) => {   //Su dung exists(ton tai) de check file ton tai hay ko.Cung cap (path,callback) 
                if(!exists){       //ko ton tai exists
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html><body><h1>Error 404: ' + fileUrl + ' not found</h1></body></html>');

                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                //can doc file va gui file ra
                fs.createReadStream(filePath).pipe(res);//doc va dan phan ung
            
            })     
        }
        else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1>Error 404: ' + fileUrl + ' not an HTML file</h1></body></html>');

            return;
        }
    }
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404: ' + req.method + ' not supported</h1></body></html>');

        return;
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
});