var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/checkisbn', function handleProcessGet(request, response) {
  // length must be 10
      var isbn = request.query.isbn;

      //remove any hyphens
      isbn = isbn.replace(/-/g, "");
      isbn = isbn.replace(/ /g, "");

      var isbn_length = isbn.toString().length;

      if (isbn_length == 10)
      {
        // Computing weighted sum
        // of first 9 digits
        var sum = 0;
        for (var i = 0; i < 9; i++)
        {
            var digit = isbn[i] - '0';
            if (0 > digit || 9 < digit)
            {
                response.write("Bad ISBN\n");
                response.write("10 Digit isbn\n");
                response.write("Contains Inpropper Characters");
                response.end();
            }
            sum += (digit * (10 - i));
        }

        // Checking last digit.
        var last = isbn[9];
        if (last != 'X' && (last < '0' || last > '9'))
        {
          response.write("Bad ISBN\n");
          response.write("10 Digit isbn\n");
          response.write("Bad Final Character");
          response.end();
        }

        // If last digit is 'X', add 10
        // to sum, else add its value.
        sum += ((last == 'X') ? 10 : (last - '0'));

        // Return true if weighted sum
        // of digits is divisible by 11.
        if(sum % 11 == 0)
        {
          response.write("Good ISBN\n");
          response.write("10 Digit isbn");
          response.end();
        }
        else
        {
          response.write("Bad ISBN\n");
          response.write("10 Digit isbn\n");
          response.write("Bad Checksum");
          response.end();
        }
      }

      // 13 digit isbn number
      else if (isbn_length == 13) {

        var tot = 0;
        for ( var i = 0; i < 12; i++ )
        {
             var digit = Number( isbn.substring( i, i + 1 ) );
             tot += (i % 2 == 0) ? digit * 1 : digit * 3;
        }

        //checksum must be 0-9. If calculated as 10 then = 0
        var checksum = 10 - (tot % 10);
        if ( checksum == 10 )
        {
            checksum = 0;
        }
        if (checksum == Number(isbn.substring( 12 ))) {
          response.write("Good ISBN\n");
          response.write("13 Digit isbn");
          response.end();
        }
        else {
          response.write("Bad ISBN\n");
          response.write("13 Digit isbn\n");
          response.write("bad Checksum");
          response.end();
        }
      }
      // isbn length is bad
      else {
        response.write("Bad ISBN \n");
        response.write("Inpropper Length");
        response.end();
      }
});

var server = app.listen(3010, function ServerListner() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Using Forms and Express, listening at http://%s:%s", host, port);
});
