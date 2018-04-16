var http = require('http')
var path = require('path')
var fs = require('fs')
var url = require('url')

function staticRoot(staticPath, req, res){
  console.log(staticPath)
  
  console.log(req.url)
  var pathObj = url.parse(req.url, true);
  var pathName = pathObj.pathname;
  var query = pathObj.query;
  var method = req.method;
  console.log(pathObj);
  
  if(pathName === '/'){
    pathName += 'index.html';
  }

  var index = pathObj.query.index;
  var len = pathObj.query.len;
  var data = [];
  for(let i = 0; i < len; i++){
    data.push("内容" + (parseInt(index) + i));
  }
  
  if(pathName === '/loadmore.html'){
    res.end(JSON.stringify(data));
  }
    
  // var fileContent = fs.readFileSync(filePath,'binary')
  // res.write(fileContent, 'binary')
  // res.end()
  
  var filePath = path.join(staticPath, pathName)
  fs.readFile(filePath, 'binary', function(err, fileContent){
    if(err){
      console.log('404')
      res.writeHead(404, 'not found')
      res.end('<h1>404 Not Found</h1>')
    }else{
      console.log('ok')
      res.writeHead(200, 'OK')
      res.write(fileContent, 'binary')
      res.end()      
    }
  })
  

}

console.log(path.join(__dirname))

var server = http.createServer(function(req, res){
  staticRoot(path.join(__dirname), req, res)
})

server.listen(8080)
console.log('visit http://localhost:8080' )
