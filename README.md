yastopwatch [![Build Status](https://travis-ci.org/fuqcool/yastopwatch.png?branch=master)](https://travis-ci.org/fuqcool/yastopwatch)
===========

Yet another stopwatch for performance tests.

### Usage

``` javascript
var stopwatch = require('yastopwatch');

stopwatch.start();
stopwatch.lap('first');
stopwatch.lap('second');
stopwatch.stop();

// print report to console
console.log(stopwatch.report());
```

The default report looks like this:

```
yastopwatch report:
start > first 	 costs: 1ms
first > second 	 costs: 5ms
second > stop 	 costs: 10ms
```

If you are unsatisfied with the default report, you can always define one yourself.

``` javascript
var stopwatch = require('yastopwatch');

stopwatch.reportHandler = function (records) {
  var report = '';

  report += 'my report:\n';

  var i;
  for (i = 0; i < records.length; i++) {
    if (i !== 0) {
      var lastRecord = records[i - 1];
      var currentRecord = records[i];

      report += lastRecord.title + ' - ' + currentRecord.title +
        (currentRecord.time - lastRecord.time) + 'ms\n';
    }
  }

  return report;
};
```

### License

The MIT License (MIT)

Copyright (c) <2014> <fuqcool>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
