var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/checkisbn', function handleProcessGet(request, response) {
  // length must be 10
      var isbn = request.query.isbn;
      var n = isbn.length();
      if (n != 10)
      {
          response.send("Bad ISBN");
      }

      // Computing weighted sum
      // of first 9 digits
      var sum = 0;
      for (var i = 0; i < 9; i++)
      {
          var digit = isbn[i] - '0';
          if (0 > digit || 9 < digit)
          {
              response.send("Bad ISBN");
          }
          sum += (digit * (10 - i));
      }

      // Checking last digit.
      var last = isbn[9];
      if (last != 'X' && (last < '0' || last > '9'))
      {
          response.send("Bad ISBN");
      }

      // If last digit is 'X', add 10
      // to sum, else add its value.
      sum += ((last == 'X') ? 10 : (last - '0'));

      // Return true if weighted sum
      // of digits is divisible by 11.
      if(sum % 11 == 0)
      {
        response.send("Good ISBN");
      }
      else
      {
        response.send("Bad ISBN");
      }
});

var server = app.listen(3010, function ServerListner() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Using Forms and Express, listening at http://%s:%s", host, port);
});
