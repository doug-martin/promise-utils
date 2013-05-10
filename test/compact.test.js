var array = require("../"),
    is = require("is-extended"),
    date = require("date-extended"),
    promise = require("promise-extended"),
    Promise = promise.Promise,
    resolve = promise.resolve,
    when = promise.when,
    assert = require("assert"),
    it = require("it");

it.describe("promise-utils .compact", function (it) {

    function asyncDeepEqual(p, expected) {
        return when(p).then(function (res) {
            assert.deepEqual(res, expected);
        });
    }


    it.describe("as a monad", function (it) {
        it.should("compact an array ", function () {
            var x;
            return when(
                asyncDeepEqual(array(resolve([1, null, null, x, 2])).compact(), [1, 2]),
                asyncDeepEqual(array([1, null, null, x, 2]).async().compact(), [1, 2]),
                asyncDeepEqual(array(resolve([1, 2])).compact(), [1, 2])
            );
        });
    });

    it.describe("as a function", function (it) {
        it.should("compact an array ", function () {
            var x;
            return when(
                asyncDeepEqual(array.compact(resolve([1, null, null, x, 2])), [1, 2]),
                asyncDeepEqual(array.compact([1, null, null, x, 2]), [1, 2]),
                asyncDeepEqual(array.compact(resolve([1, 2])), [1, 2]),
                asyncDeepEqual(array.compact([1, 2]), [1, 2])
            );
        });
    });
});

