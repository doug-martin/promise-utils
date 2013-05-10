var array = require("../"),
    is = require("is-extended"),
    date = require("date-extended"),
    promise = require("promise-extended"),
    Promise = promise.Promise,
    resolve = promise.resolve,
    when = promise.when,
    assert = require("assert"),
    it = require("it");

it.describe("promise-utils .rotate", function (it) {

    function asyncDeepEqual(p, expected) {
        return when(p).then(function (res) {
            assert.deepEqual(res, expected);
        });
    }

    it.describe("as a monad", function (it) {
        it.should("rotate an array ", function () {
            var arr = ["a", "b", "c", "d"];
            return when(
                asyncDeepEqual(array(arr).async().rotate(), ["b", "c", "d", "a"]),
                asyncDeepEqual(array(resolve(arr)).rotate(), ["b", "c", "d", "a"]),
                asyncDeepEqual(array(arr).async().rotate(2), ["c", "d", "a", "b"]),
                asyncDeepEqual(array(resolve(arr)).rotate(2), ["c", "d", "a", "b"]),
                asyncDeepEqual(array(arr).async().rotate(3), ["d", "a", "b", "c"]),
                asyncDeepEqual(array(resolve(arr)).rotate(3), ["d", "a", "b", "c"]),
                asyncDeepEqual(array(arr).async().rotate(4), ["a", "b", "c", "d"]),
                asyncDeepEqual(array(resolve(arr)).rotate(4), ["a", "b", "c", "d"]),
                asyncDeepEqual(array(arr).async().rotate(-1), ["d", "a", "b", "c"]),
                asyncDeepEqual(array(resolve(arr)).rotate(-1), ["d", "a", "b", "c"]),
                asyncDeepEqual(array(arr).async().rotate(-2), ["c", "d", "a", "b"]),
                asyncDeepEqual(array(resolve(arr)).rotate(-2), ["c", "d", "a", "b"]),
                asyncDeepEqual(array(arr).async().rotate(-3), ["b", "c", "d", "a"]),
                asyncDeepEqual(array(resolve(arr)).rotate(-3), ["b", "c", "d", "a"]),
                asyncDeepEqual(array(arr).async().rotate(-4), ["a", "b", "c", "d"]),
                asyncDeepEqual(array(resolve(arr)).rotate(-4), ["a", "b", "c", "d"])
            );
        });
    });

    it.describe("as a function", function (it) {
        it.should("rotate an array ", function () {
            var arr = ["a", "b", "c", "d"];
            return when(
                asyncDeepEqual(array.rotate(arr), ["b", "c", "d", "a"]),
                asyncDeepEqual(array.rotate(resolve(arr)), ["b", "c", "d", "a"]),
                asyncDeepEqual(array.rotate(arr, 2), ["c", "d", "a", "b"]),
                asyncDeepEqual(array.rotate(resolve(arr), 2), ["c", "d", "a", "b"]),
                asyncDeepEqual(array.rotate(arr, 3), ["d", "a", "b", "c"]),
                asyncDeepEqual(array.rotate(resolve(arr), 3), ["d", "a", "b", "c"]),
                asyncDeepEqual(array.rotate(arr, 4), ["a", "b", "c", "d"]),
                asyncDeepEqual(array.rotate(resolve(arr), 4), ["a", "b", "c", "d"]),
                asyncDeepEqual(array.rotate(arr, -1), ["d", "a", "b", "c"]),
                asyncDeepEqual(array.rotate(resolve(arr), -1), ["d", "a", "b", "c"]),
                asyncDeepEqual(array.rotate(arr, -2), ["c", "d", "a", "b"]),
                asyncDeepEqual(array.rotate(resolve(arr), -2), ["c", "d", "a", "b"]),
                asyncDeepEqual(array.rotate(arr, -3), ["b", "c", "d", "a"]),
                asyncDeepEqual(array.rotate(resolve(arr), -3), ["b", "c", "d", "a"]),
                asyncDeepEqual(array.rotate(arr, -4), ["a", "b", "c", "d"]),
                asyncDeepEqual(array.rotate(resolve(arr), -4), ["a", "b", "c", "d"])
            );
        });
    });

});
