var promiseUtils = require("../"),
    is = require("is-extended"),
    arrayExtended = require('array-extended'),
    date = require("date-extended"),
    promise = require("promise-extended"),
    Promise = promise.Promise,
    resolve = promise.resolve,
    when = promise.when,
    assert = require("assert"),
    it = require("it");

it.describe("promise-utils .map", function (it) {
    var arr = [1, 2, 3, 4, 5], array = promiseUtils;

    function asyncArr() {
        return promise.resolve(arr);
    }

    function asyncIndex(index) {
        return promise.resolve(arr[index]);
    }

    it.describe("as a monad", function (it) {

        it.should("loop through results of a promise return the results", function () {
            return array(asyncArr()).map(function (item, index) {
                assert.equal(item, arr[index]);
                return item * 2;
            }).then(function (results) {
                    assert.deepEqual(results, arrayExtended.map(arr, function (i) {
                        return i * 2;
                    }));
                });
        });

        it.should("Loop through each item in an array and return the results", function () {
            return array(arr).async().map(function (item, index) {
                assert.equal(item, arr[index]);
                return item * 2;
            }).then(function (results) {
                    assert.deepEqual(results, arrayExtended.map(arr, function (i) {
                        return i * 2;
                    }));
                });
        });

        it.should("wait for inner promises to complete and return the original array", function () {
            return array(arr).async().map(function (item, index) {
                var ret = new Promise();
                process.nextTick(function () {
                    assert.equal(item, arr[index]);
                    ret.callback(item * 2);
                });
                return ret;
            }).then(function (results) {
                    assert.deepEqual(results, arrayExtended.map(arr, function (i) {
                        return i * 2;
                    }));
                });
        });

        it.should("should accept non array items but still loop and return the non array item", function () {
            return array(asyncIndex(0)).map(function (item, index) {
                assert.equal(item, 1);
                assert.equal(index, 0);
                return item * 2;
            }).then(function (results) {
                    assert.deepEqual(results, [2]);
                });
        });

        it.should("catch thrown errors", function () {
            return array(asyncArr()).map(function (item, index) {
                if (index == 4) {
                    throw new Error("error");
                }
            }).then(assert.fail, function (results) {
                    assert.deepEqual(results.message, "error");
                });
        });

        it.should("catch async errors", function () {
            return array(asyncArr()).map(function (item, index) {
                if (index == 4) {
                    return new Promise().errback(new Error("error"));
                }
            }).then(assert.fail, function (results) {
                    assert.deepEqual(results.message, "error");
                });
        });

    });

    it.describe("as a function", function (it) {
        it.should("loop through results of a promise return the results", function () {
            return array.map(asyncArr(),function (item, index) {
                assert.equal(item, arr[index]);
                return item * 2;
            }).then(function (results) {
                    assert.deepEqual(results, arrayExtended.map(arr, function (i) {
                        return i * 2;
                    }));
                });
        });

        it.should("Loop through each item in an array and return the results", function () {
            return array.map(arr,function (item, index) {
                assert.equal(item, arr[index]);
                return item * 2;
            }).then(function (results) {
                    assert.deepEqual(results, arrayExtended.map(arr, function (i) {
                        return i * 2;
                    }));
                });
        });

        it.should("wait for inner promises to complete and return the original array", function () {
            return array.map(arr,function (item, index) {
                var ret = new Promise();
                process.nextTick(function () {
                    assert.equal(item, arr[index]);
                    ret.callback(item * 2);
                });
                return ret;
            }).then(function (results) {
                    assert.deepEqual(results, arrayExtended.map(arr, function (i) {
                        return i * 2;
                    }));
                });
        });

        it.should("should accept non array items but still loop and return the non array item", function () {
            return array.map(asyncIndex(0),function (item, index) {
                assert.equal(item, 1);
                assert.equal(index, 0);
                return item * 2;
            }).then(function (results) {
                    assert.deepEqual(results, [2]);
                });
        });

        it.should("catch thrown errors", function () {
            return array.map(asyncArr(),function (item, index) {
                if (index == 4) {
                    throw new Error("error");
                }
            }).then(assert.fail, function (results) {
                    assert.deepEqual(results.message, "error");
                });
        });

        it.should("catch async errors", function () {
            return array.map(asyncArr(),function (item, index) {
                if (index == 4) {
                    return new Promise().errback(new Error("error"));
                }
            }).then(assert.fail, function (results) {
                    assert.deepEqual(results.message, "error");
                });
        });
    });

});
