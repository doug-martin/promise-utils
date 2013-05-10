var array = require("../"),
    is = require("is-extended"),
    date = require("date-extended"),
    promise = require("promise-extended"),
    Promise = promise.Promise,
    resolve = promise.resolve,
    when = promise.when,
    assert = require("assert"),
    it = require("it");

it.describe("promise-utils .some", function (it) {
    var arr = [1, 2, 3, 4, 5];

    function asyncArr() {
        return promise.resolve(arr);
    }

    function asyncIndex(index) {
        return promise.resolve(arr[index]);
    }

    it.describe("as a monad", function (it) {

        it.should("loop through results of a promise and return true if some items pass", function () {
            return array(asyncArr()).some(function (item, index) {
                assert.equal(item, arr[index]);
                return item == 1;
            }).then(function (results) {
                    assert.isTrue(results);
                });
        });

        it.should("loop through results of a promise and return false if not items pass", function () {
            return array(asyncArr()).some(function (item, index) {
                assert.equal(item, arr[index]);
                return item > 5;
            }).then(function (results) {
                    assert.isFalse(results);
                });
        });

        it.should("Loop through each item in an array and return true if some items pass", function () {
            return array(arr).async().some(function (item, index) {
                assert.equal(item, arr[index]);
                return item == 1;
            }).then(function (results) {
                    assert.isTrue(results);
                });
        });

        it.should("Loop through each item in an array and return false if no items pass", function () {
            return array(arr).async().some(function (item, index) {
                assert.equal(item, arr[index]);
                return item > 5;
            }).then(function (results) {
                    assert.isFalse(results);
                });
        });

        it.should("wait for inner promises to complete and return true if some items pass", function () {
            return array(arr).async().some(function (item, index) {
                var ret = new Promise();
                process.nextTick(function () {
                    assert.equal(item, arr[index]);
                    ret.callback(item == 1);
                });
                return ret;
            }).then(function (results) {
                    assert.isTrue(results);
                });
        });

        it.should("wait for inner promises to complete and return false if no items pass", function () {
            return array(arr).async().some(function (item, index) {
                var ret = new Promise();
                process.nextTick(function () {
                    assert.equal(item, arr[index]);
                    ret.callback(item > 5);
                });
                return ret;
            }).then(function (results) {
                    assert.isFalse(results);
                });
        });

        it.should("should accept non array items but still loop and return true if the item passes", function () {
            return array(asyncIndex(0)).some(function (item, index) {
                assert.equal(item, 1);
                assert.equal(index, 0);
                return item === 1;
            }).then(function (results) {
                    assert.isTrue(results);
                });
        });

        it.should("should accept non array items but still loop and return false if the item does not pass", function () {
            return array(asyncIndex(0)).some(function (item, index) {
                assert.equal(item, 1);
                assert.equal(index, 0);
                return item != 1;
            }).then(function (results) {
                    assert.isFalse(results);
                });
        });

        it.should("catch thrown errors", function () {
            return array(asyncArr()).some(function (item, index) {
                if (index == 4) {
                    throw new Error("error");
                }
            }).then(assert.fail, function (results) {
                    assert.deepEqual(results.message, "error");
                });
        });

        it.should("catch async errors", function () {
            return array(asyncArr()).some(function (item, index) {
                if (index == 4) {
                    return new Promise().errback(new Error("error"));
                }
            }).then(assert.fail, function (results) {
                    assert.deepEqual(results.message, "error");
                });
        });

    });

    it.describe("as a function", function (it) {

        it.should("loop through results of a promise and return true if some items pass", function () {
            return array.some(asyncArr(),function (item, index) {
                assert.equal(item, arr[index]);
                return item == 1;
            }).then(function (results) {
                    assert.isTrue(results);
                });
        });

        it.should("loop through results of a promise and return false if not items pass", function () {
            return array.some(asyncArr(),function (item, index) {
                assert.equal(item, arr[index]);
                return item > 5;
            }).then(function (results) {
                    assert.isFalse(results);
                });
        });

        it.should("Loop through each item in an array and return true if some items pass", function () {
            return array.some(arr,function (item, index) {
                assert.equal(item, arr[index]);
                return item == 1;
            }).then(function (results) {
                    assert.isTrue(results);
                });
        });

        it.should("Loop through each item in an array and return false if no items pass", function () {
            return array.some(arr,function (item, index) {
                assert.equal(item, arr[index]);
                return item > 5;
            }).then(function (results) {
                    assert.isFalse(results);
                });
        });

        it.should("wait for inner promises to complete and return true if some items pass", function () {
            return array.some(arr,function (item, index) {
                var ret = new Promise();
                process.nextTick(function () {
                    assert.equal(item, arr[index]);
                    ret.callback(item == 1);
                });
                return ret;
            }).then(function (results) {
                    assert.isTrue(results);
                });
        });

        it.should("wait for inner promises to complete and return false if no items pass", function () {
            return array.some(arr,function (item, index) {
                var ret = new Promise();
                process.nextTick(function () {
                    assert.equal(item, arr[index]);
                    ret.callback(item > 5);
                });
                return ret;
            }).then(function (results) {
                    assert.isFalse(results);
                });
        });

        it.should("should accept non array items but still loop and return true if the item passes", function () {
            return array.some(asyncIndex(0),function (item, index) {
                assert.equal(item, 1);
                assert.equal(index, 0);
                return item === 1;
            }).then(function (results) {
                    assert.isTrue(results);
                });
        });

        it.should("should accept non array items but still loop and return false if the item does not pass", function () {
            return array.some(asyncIndex(0),function (item, index) {
                assert.equal(item, 1);
                assert.equal(index, 0);
                return item != 1;
            }).then(function (results) {
                    assert.isFalse(results);
                });
        });

        it.should("catch thrown errors", function () {
            return array.some(asyncArr(),function (item, index) {
                if (index == 4) {
                    throw new Error("error");
                }
            }).then(assert.fail, function (results) {
                    assert.deepEqual(results.message, "error");
                });
        });

        it.should("catch async errors", function () {
            return array.some(asyncArr(),function (item, index) {
                if (index == 4) {
                    return new Promise().errback(new Error("error"));
                }
            }).then(assert.fail, function (results) {
                    assert.deepEqual(results.message, "error");
                });
        });

    });
});
