'use strict';

function defaultReportHandler(records) {
  var report = '';

  report += 'yastopwatch report:\n';

  var i;
  for (i = 0; i < records.length; i++) {
    if (i !== 0) {
      var lastRecord = records[i - 1];
      var currentRecord = records[i];

      report += lastRecord.info + ' > ' + currentRecord.info + ' \t costs: ' +
        (currentRecord.time - lastRecord.time) + 'ms\n';
    }
  }

  return report;
}

function stopwatch() {
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

  var obj;

  var report = function () {
    return obj.reportHandler(records);
  };

  obj = {
    _records: records,
    _defaultReportHandler: defaultReportHandler,
    start: start,
    stop: stop,
    lap: lap,
    reset: reset,
    report: report,
    reportHandler: defaultReportHandler,

  };

  return obj;
}

module.exports = stopwatch();
