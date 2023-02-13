const fs = require('fs')
class NotFound {
    static notFound(req,res){
        fs.readFile('./views/err/notFound.html','utf-8',async (err,notFoundHtml)=>{
            if (err){
                console.log(err)
            }
            res.writeHead(200,'text/html')
            res.write(notFoundHtml);
            res.end()
        })
    }

};
module.exports = NotFound