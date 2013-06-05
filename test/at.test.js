var promiseUtils = require("../"),
    is = require("is-extended"),
    date = require("date-extended"),
    promise = require("promise-extended"),
    Promise = promise.Promise,
    resolve = promise.resolve,
    when = promise.when,
    assert = require("assert"),
    it = require("it");

it.describe("promise-utils at", function (it) {
    var array = promiseUtils;

    function asyncDeepEqual(p, expected) {
        return when(p).then(function (res) {
            assert.deepEqual(res, expected);
        });
    }


    it.describe("as a monad", function (it) {
        it.should("pluck the value at the specified index", function () {
            return when(
                asyncDeepEqual(array(resolve([])).at(0), undefined),
                asyncDeepEqual(array(resolve([1, 2, 3])).at(0), 1),
                asyncDeepEqual(array(resolve([1, 2, 3])).at(1), 2),
                asyncDeepEqual(array(resolve([1, 2, 3])).at(2), 3)
            );
        });
    });

    it.describe("as a function", function (it) {

        it.should("pluck the value at the specified index", function () {
            return when(
                asyncDeepEqual(array.at(resolve([]), 0), undefined),
                asyncDeepEqual(array.at(resolve([1, 2, 3]), 0), 1),
                asyncDeepEqual(array.at(resolve([1, 2, 3]), 1), 2),
                asyncDeepEqual(array.at(resolve([1, 2, 3]), 2), 3)
            );
        });
    });

});
