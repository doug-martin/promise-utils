var promiseUtils = require("../"),
    is = require("is-extended"),
    date = require("date-extended"),
    promise = require("promise-extended"),
    arr = require("array-extended"),
    Promise = promise.Promise,
    resolve = promise.resolve,
    when = promise.when,
    assert = require("assert"),
    it = require("it");

it.describe("promise-utils reduce", function (it) {
    var array = promiseUtils;

    function asyncDeepEqual(p, expected) {
        return when(p).then(function (res) {
            assert.deepEqual(res, expected);
        });
    }

    var arr1 = ["a"],
        arr2 = ["a", "b", "c"];


    it.describe("as a monad", function (it) {
        it.should("reduce the array", function () {
            return when(
                asyncDeepEqual(array(resolve([])).reduce(function (prev, curr) {
                    return prev + curr;
                }, 0), undefined),
                asyncDeepEqual(array(resolve(arr1)).reduce(function (prev, curr, index, currArr) {
                    assert.deepEqual(currArr, arr1);
                    assert.equal(arr.indexOf(arr1, curr), index);
                    return prev + curr;
                }, "a"), "aa"),
                asyncDeepEqual(array(resolve(arr2)).reduce(function (prev, curr, index, currArr) {
                    assert.deepEqual(currArr, arr2);
                    assert.equal(arr.indexOf(arr2, curr), index);
                    return prev + curr;
                }, "b"), "babc"),
                asyncDeepEqual(array(resolve(arr2)).reduce(function (prev, curr, index, currArr) {
                    assert.deepEqual(currArr, arr2);
                    assert.equal(arr.indexOf(arr2, curr), index);
                    return prev + curr;
                }, "c"), "cabc")
            );
        });
    });

    it.describe("as a function", function (it) {

        it.should("reduce the array", function () {
            return when(
                asyncDeepEqual(array.reduce(resolve([]), function (prev, curr) {
                    return prev + curr;
                }, 0), undefined),
                asyncDeepEqual(array.reduce(resolve(arr1), function (prev, curr, index) {
                    assert.equal(arr.indexOf(arr1, curr), index);
                    assert.equal(index, 0);
                    return prev + curr;
                }, "a"), "aa"),
                asyncDeepEqual(array.reduce(resolve(arr2), function (prev, curr, index) {
                    assert.equal(arr.indexOf(arr2, curr), index);
                    return prev + curr;
                }, "b"), "babc"),
                asyncDeepEqual(array.reduce(resolve(arr2), function (prev, curr, index) {
                    assert.equal(arr.indexOf(arr2, curr), index);
                    return prev + curr;
                }, "c"), "cabc")
            );
        });
    });

});
