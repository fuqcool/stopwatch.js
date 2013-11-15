'use strict';

function defaultReporter(name, records) {
  var report = '';

  report += 'report: ' + name + '\n';

  var i;
  for (i = 0; i < records.length; i++) {
    if (i !== 0) {
      var lastRecord = records[i - 1];
      var currentRecord = records[i];

      report += lastRecord.info + ' > ' + currentRecord.info + '    costs: ' +
        (currentRecord.time - lastRecord.time) + 'ms\n';
    }
  }

  return report + '\n';
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

  var lap = function (info) {
    records.push({
      info: info,
      time: now()
    });
  };

  var start = function () {
    lap('start');
  };

  var stop = function () {
    lap('stop');
  };

  var reset = function () {
    records.length = 0;
  };

  var report = function () {
    return stopwatch.reporter(name, records);
  };

  return {
    _records: records,
    start: start,
    stop: stop,
    lap: lap,
    reset: reset,
    report: report
  };
}

stopwatch.reporter = defaultReporter;


module.exports = stopwatch;
