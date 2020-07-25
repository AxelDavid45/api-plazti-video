'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
//Set body urlencoded type
app.use(bodyParser.urlencoded({ extended: false }));

const isLeapYear = year => {
  //Parameters verification
  if (!year) throw new Error('Missing year parameter');
  else if (!Number.isInteger(year)) throw new Error('Year must be an integer');

  let lastNumber = year.toString().charAt(year.length);
  let secondLast = year.toString().charAt(year.length - 1);

  if (lastNumber === '0' && secondLast === '0') {
    //secular
    return year % 400 === 0;
  } else {
    //No secular
    return year % 4 === 0;
  }
};

const handlerLeapYear = (req, res) => {
  let year = req.body.year ? parseInt(req.body.year) : undefined;
  if (!year) {
    res.statusCode = 400;
    res.end('Missing year parameter in body request, must be an integer');
  } else if (Number.isInteger(year)) {
    const leapYear = isLeapYear(year);

    if (leapYear) {
      res.write(`${year} is a leap-year`);
    } else {
      res.write(`${year} is not a leap-year, try another year`);
    }

    res.end();
  } else {
    res.write(Number.isInteger(year));
    res.end();
  }
};

app.post('/bisiesto', handlerLeapYear);

app.listen(3000);