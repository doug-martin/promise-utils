var array = require("../"),
    is = require("is-extended"),
    date = require("date-extended"),
    promise = require("promise-extended"),
    Promise = promise.Promise,
    resolve = promise.resolve,
    when = promise.when,
    assert = require("assert"),
    it = require("it");

it.describe("promise-utils .removeDuplicates", function (it) {

    function asyncDeepEqual(p, expected) {
        return when(p).then(function (res) {
            assert.deepEqual(res, expected);
        });
    }

    it.describe("as a monad", function (it) {

        it.should("remove duplicates", function () {
            return when(
                asyncDeepEqual(array([1, 2, 2, 3, 3, 3, 4, 4, 4]).async().removeDuplicates(), [1, 2, 3, 4]),
                asyncDeepEqual(array(resolve([1, 2, 2, 3, 3, 3, 4, 4, 4])).removeDuplicates(), [1, 2, 3, 4]),
                asyncDeepEqual(array(["a", "b", "b"]).async().removeDuplicates(), ["a", "b"]),
                asyncDeepEqual(array(resolve(["a", "b", "b"])).removeDuplicates(), ["a", "b"]),
                asyncDeepEqual(array([1, 2, 2, 3, 3, 3, 4, 4, 4]).async().unique(), [1, 2, 3, 4]),
                asyncDeepEqual(array(resolve([1, 2, 2, 3, 3, 3, 4, 4, 4])).unique(), [1, 2, 3, 4]),
                asyncDeepEqual(array(["a", "b", "b"]).async().unique(), ["a", "b"]),
                asyncDeepEqual(array(resolve(["a", "b", "b"])).unique(), ["a", "b"])
            );
        });
    });

    it.describe("as a function", function (it) {

        it.should("remove duplicates", function () {
            return when(
                asyncDeepEqual(array.removeDuplicates([1, 2, 2, 3, 3, 3, 4, 4, 4]), [1, 2, 3, 4]),
                asyncDeepEqual(array.removeDuplicates(resolve([1, 2, 2, 3, 3, 3, 4, 4, 4])), [1, 2, 3, 4]),
                asyncDeepEqual(array.removeDuplicates(["a", "b", "b"]), ["a", "b"]),
                asyncDeepEqual(array.removeDuplicates(resolve(["a", "b", "b"])), ["a", "b"]),
                asyncDeepEqual(array.unique([1, 2, 2, 3, 3, 3, 4, 4, 4]), [1, 2, 3, 4]),
                asyncDeepEqual(array.unique(resolve([1, 2, 2, 3, 3, 3, 4, 4, 4])), [1, 2, 3, 4]),
                asyncDeepEqual(array.unique(["a", "b", "b"]), ["a", "b"]),
                asyncDeepEqual(array.unique(resolve(["a", "b", "b"])), ["a", "b"])
            );
        });
    });

});
