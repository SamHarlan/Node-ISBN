var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/checkprime', function handleProcessGet(request, response) {
  var number = request.query.prime;
  var isPrime = false;
  if(number === 2) {
    isPrime = true;
  }
  else if(number%2 ==0) {
    isPrime = false;
  }else {
    for (var i = 3; i < number /2+1; i++) {
      if (nubmer %i==0) {
        isPrime = false;
        break;
      }
    }
  }
  if (isPrime) {
    response.send("it is a prime");
  }else {
    response.send("Not a Prime");
  }
  console.log(retVal);
  response.send(JSON.stringify(retVal));
});

var server = app.listen(3010, function ServerListner() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Using Forms and Express, listening at http://%s:%s", host, port);
});
