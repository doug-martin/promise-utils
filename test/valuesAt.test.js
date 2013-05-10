var array = require("../"),
    is = require("is-extended"),
    date = require("date-extended"),
    promise = require("promise-extended"),
    Promise = promise.Promise,
    resolve = promise.resolve,
    when = promise.when,
    assert = require("assert"),
    it = require("it");

it.describe("promise-utils .valuesAt", function (it) {

    function asyncDeepEqual(p, expected) {
        return when(p).then(function (res) {
            assert.deepEqual(res, expected);
        });
    }

    it.describe("as a monad", function (it) {

        it.should("find values at particular indexes", function () {
            var arr = ["a", "b", "c", "d"];
            return when(
                asyncDeepEqual(array(arr).async().valuesAt(1, 2, 3), ["b", "c", "d"]),
                asyncDeepEqual(array(arr).async().valuesAt(1, 2, 3, 4), ["b", "c", "d", null]),
                asyncDeepEqual(array(arr).async().valuesAt(0, 3), ["a", "d"])
            );
        });

    });

    it.describe("as a function", function (it) {

        it.should("find values at particular indexes", function () {
            var arr = ["a", "b", "c", "d"];
            return when(
                asyncDeepEqual(array.valuesAt(resolve(arr), 1, 2, 3), ["b", "c", "d"]),
                asyncDeepEqual(array.valuesAt(resolve(arr), 1, 2, 3, 4), ["b", "c", "d", null]),
                asyncDeepEqual(array.valuesAt(resolve(arr), 0, 3), ["a", "d"])
            );
        });

    });

});