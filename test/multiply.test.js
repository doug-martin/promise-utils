var array = require("../"),
    is = require("is-extended"),
    date = require("date-extended"),
    promise = require("promise-extended"),
    Promise = promise.Promise,
    resolve = promise.resolve,
    when = promise.when,
    assert = require("assert"),
    it = require("it");

it.describe("promise-utils .multiply", function (it) {

    function asyncDeepEqual(p, expected) {
        return when(p).then(function (res) {
            assert.deepEqual(res, expected);
        });
    }

    it.describe("as a monad", function (it) {
        it.should("multiply an array", function () {
            return when(
                asyncDeepEqual(array(resolve([1, 2, 3])).multiply(), [1, 2, 3]),
                asyncDeepEqual(array([1, 2, 3]).async().multiply(), [1, 2, 3]),
                asyncDeepEqual(array(resolve([1, 2, 3])).multiply(0), [1, 2, 3]),
                asyncDeepEqual(array([1, 2, 3]).async().multiply(0), [1, 2, 3]),
                asyncDeepEqual(array(resolve([1, 2, 3])).multiply(1), [1, 2, 3]),
                asyncDeepEqual(array([1, 2, 3]).async().multiply(1), [1, 2, 3]),
                asyncDeepEqual(array(resolve([1, 2, 3])).multiply(2), [1, 2, 3, 1, 2, 3]),
                asyncDeepEqual(array([1, 2, 3]).async().multiply(2), [1, 2, 3, 1, 2, 3])
            );
        });
    });

    it.describe("as a function", function (it) {
        it.should("multiply an array", function () {
            return when(
                asyncDeepEqual(array.multiply(resolve([1, 2, 3])), [1, 2, 3]),
                asyncDeepEqual(array.multiply([1, 2, 3]), [1, 2, 3]),
                asyncDeepEqual(array.multiply(resolve([1, 2, 3]), 0), [1, 2, 3]),
                asyncDeepEqual(array.multiply([1, 2, 3], 0), [1, 2, 3]),
                asyncDeepEqual(array.multiply(resolve([1, 2, 3]), 1), [1, 2, 3]),
                asyncDeepEqual(array.multiply([1, 2, 3], 1), [1, 2, 3]),
                asyncDeepEqual(array.multiply(resolve([1, 2, 3]), 2), [1, 2, 3, 1, 2, 3]),
                asyncDeepEqual(array.multiply([1, 2, 3], 2), [1, 2, 3, 1, 2, 3])
            );
        });
    });


});
