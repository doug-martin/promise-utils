var promiseUtils = require("../"),
    is = require("is-extended"),
    date = require("date-extended"),
    promise = require("promise-extended"),
    Promise = promise.Promise,
    resolve = promise.resolve,
    when = promise.when,
    assert = require("assert"),
    it = require("it");

it.describe("promise-utils chaining", function (it) {
    var arr = [1, 2, 3, 4, 5], array = promiseUtils;

    function asyncArr() {
        return promise.resolve(arr);
    }

    function asyncDeepEqual(p, expected) {
        return when(p).then(function (res) {
            assert.deepEqual(res, expected);
        });
    }

    it.should("allow chaining of operations", function () {
        return asyncDeepEqual(array(asyncArr())
            .map(function (num, i) {
                return num * (i + 1);
            }).filter(function (num) {
                return num % 2;
            }).avg(), 11.666666666666666);
    });


});
