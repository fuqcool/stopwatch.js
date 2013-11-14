'use strict';

function defaultReporter(name, records) {
  console.log('report: ', name);

  var i;
  for (i = 0; i < records.length; i++) {
    if (i !== 0) {
      var lastRecord = records[i - 1];
      var currentRecord = records[i];

      console.log(lastRecord.info + ' > ' + currentRecord.info + '    costs: ' +
                  (currentRecord.time - lastRecord.time) + 'ms');
    }
  }

  console.log('');
}

function stopwatch(name) {
  if (typeof name !== 'string') {
    name = 'default';
  }

  var records = [];
  var startTime = null;

  var now = function () {
    return new Date();
  };

  var press = function (info) {
    records.push({
      info: info,
      time: now()
    });
  };

  var start = function () {
    press('start');
  };

  var stop = function () {
    press('stop');
  };

  var report = function () {
    stopwatch.reporter(name, records);
  };

  return {
    start: start,
    stop: stop,
    press: press,
    report: report
  };
}

stopwatch.reporter = defaultReporter;


module.exports = stopwatch;
