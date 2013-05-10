var array = require("../"),
    is = require("is-extended"),
    date = require("date-extended"),
    promise = require("promise-extended"),
    Promise = promise.Promise,
    resolve = promise.resolve,
    when = promise.when,
    assert = require("assert"),
    it = require("it");

it.describe("promise-utils", function (it) {
    var arr = [1, 2, 3, 4, 5];

    function asyncArr() {
        return promise.resolve(arr);
    }

    function asyncIndex(index) {
        return promise.resolve(arr[index]);
    }

    it.describe(".forEach", function (it) {

        it.describe("as a monad", function (it) {

            it.should("loop through results of a promise return the original array", function () {
                return array(asyncArr()).forEach(function (item, index) {
                    assert.equal(item, arr[index]);
                }).then(function (results) {
                        assert.deepEqual(results, arr);
                    });
            });

            it.should("Loop through each item in an array and return the results", function () {
                return array(arr).async().forEach(function (item, index) {
                    assert.equal(item, arr[index]);
                }).then(function (results) {
                        assert.deepEqual(results, arr);
                    });
            });

            it.should("wait for inner promises to complete and return the original array", function () {
                return array(arr).async().forEach(function (item, index) {
                    var ret = new Promise();
                    process.nextTick(function () {
                        assert.equal(item, arr[index]);
                        ret.callback(item * 2);
                    });
                    return ret;
                }).then(function (results) {
                        assert.deepEqual(results, arr);
                    });
            });

            it.should("should accept non array items but still loop and return the non array item", function () {
                return array(asyncIndex(0)).forEach(function (item, index) {
                    assert.equal(item, 1);
                    assert.equal(index, 0);
                }).then(function (results) {
                        assert.deepEqual(results, 1);
                    });
            });

            it.should("catch thrown errors", function () {
                return array(asyncArr()).forEach(function (item, index) {
                    if (index == 4) {
                        throw new Error("error");
                    }
                }).then(assert.fail, function (results) {
                        assert.deepEqual(results.message, "error");
                    });
            });

            it.should("catch async errors", function () {
                return array(asyncArr()).forEach(function (item, index) {
                    if (index == 4) {
                        return new Promise().errback(new Error("error"));
                    }
                }).then(assert.fail, function (results) {
                        assert.deepEqual(results.message, "error");
                    });
            });

        });

        it.describe("as a function", function (it) {

            it.should("loop through results of a promise return the original array", function () {
                return array.forEach(asyncArr(),function (item, index) {
                    assert.equal(item, arr[index]);
                }).then(function (results) {
                        assert.deepEqual(results, arr);
                    });
            });

            it.should("Loop through each item in an array and return the results", function () {
                return array.forEach(resolve(arr),function (item, index) {
                    assert.equal(item, arr[index]);
                }).then(function (results) {
                        assert.deepEqual(results, arr);
                    });
            });

            it.should("wait for inner promises to complete and return the original array", function () {
                return array.forEach(arr,function (item, index) {
                    var ret = new Promise();
                    process.nextTick(function () {
                        assert.equal(item, arr[index]);
                        ret.callback(item * 2);
                    });
                    return ret;
                }).then(function (results) {
                        assert.deepEqual(results, arr);
                    });
            });

            it.should("should accept non array items but still loop and return the non array item", function () {
                return array.forEach(asyncIndex(0),function (item, index) {
                    assert.equal(item, 1);
                    assert.equal(index, 0);
                }).then(function (results) {
                        assert.deepEqual(results, 1);
                    });
            });

            it.should("catch thrown errors", function () {
                return array.forEach(asyncArr(),function (item, index) {
                    if (index == 4) {
                        throw new Error("error");
                    }
                }).then(assert.fail, function (results) {
                        assert.deepEqual(results.message, "error");
                    });
            });

            it.should("catch async errors", function () {
                return array.forEach(asyncArr(),function (item, index) {
                    if (index == 4) {
                        return new Promise().errback(new Error("error"));
                    }
                }).then(assert.fail, function (results) {
                        assert.deepEqual(results.message, "error");
                    });
            });
        });

    });
});