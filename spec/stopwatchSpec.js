describe("stopwatch tests", function () {
  var watch;

  beforeEach(function () {
    watch = require("../stopwatch.js");
    watch.reset();
    watch.reportHandler = watch._defaultReportHandler;
  });

  it("should add records on start", function () {
    watch.start();

    expect(watch._records.length).toBe(1);
    expect(watch._records[0].info).toBe("start");
  });

  it("should add records on lap", function () {
    watch.lap("first lap");

    expect(watch._records.length).toBe(1);
    expect(watch._records[0].info).toBe("first lap");
  });

  it("should add records on stop", function () {
    watch.stop();

    expect(watch._records.length).toBe(1);
    expect(watch._records[0].info).toBe("stop");
  });

  it("should reset records", function () {
    watch.start();
    watch.lap("first lap");
    watch.stop();

    expect(watch._records.length).toBe(3);

    watch.reset();

    expect(watch._records.length).toBe(0);
  });

  it("should print a default report", function () {
    var startTime = new Date();

    watch._records.push({
      info: "start",
      time: startTime
    });

    watch._records.push({
      info: "first lap",
      time: new Date(startTime.getTime() + 100)
    });

    watch._records.push({
      info: "second lap",
      time: new Date(startTime.getTime() + 1000)
    });

    var expectedReport = 'yastopwatch report:\n' +
      'start > first lap    costs: 100ms\n' +
      'first lap > second lap    costs: 900ms\n\n';

    expect(watch.report()).toBe(expectedReport);
  });


  it("should be able to customize report", function () {
    var myReporter = jasmine.createSpy("myReporter").andReturn("my report");

    watch.reportHandler = myReporter;

    watch.start();
    watch.lap("first lap");
    watch.stop();

    var report = watch.report();

    expect(myReporter).toHaveBeenCalled();
    expect(myReporter.mostRecentCall.args[0].length).toBe(3);
    expect(report).toBe("my report");
  });
});
