let http = require('http');
let formidable = require('formidable');
let fs = require('fs');

http.createServer(function (req, res) {
    console.log(req.url);
    

    if(req.url === '/'){ 
        fs.readFile('./public/index.html', (err, data) => {
            if (err) {
                console.log(err)
                return;
            }
            res.end(data);
        });
    }else if (req.url === '/upload' && req.method.toLowerCase() === 'post') { 
          //Create an instance of the form object
            let form = new formidable.IncomingForm();

            //Process the file upload in Node
            form.parse(req, function (error, fields, file) {
                let filepath = String(file.upload[0].filepath);
                let newpath = './Uploads/';
                newpath += file.upload[0].originalFilename;


                //Copy the uploaded file to a custom folder
                fs.rename(filepath, newpath, function () {
                //Send a NodeJS file upload confirmation message
                fs.readFile('./public/success.html', (err, data) => {
                    if (err) {
                        console.log(err)
                        return;
                    }
                    res.end(data);
                });

                });
            });
    } else {
        fs.readFile('./public/404.html', (err, data) => {
            if (err) {
                console.log(err)
                return;
            }
            res.end(data);
        });
    }

}).listen(4040);