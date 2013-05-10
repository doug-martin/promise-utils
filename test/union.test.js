var array = require("../"),
    is = require("is-extended"),
    date = require("date-extended"),
    promise = require("promise-extended"),
    Promise = promise.Promise,
    resolve = promise.resolve,
    when = promise.when,
    assert = require("assert"),
    it = require("it");

it.describe("promise-utils .union", function (it) {

    function asyncDeepEqual(p, expected) {
        return when(p).then(function (res) {
            assert.deepEqual(res, expected);
        });
    }

    it.describe("as a monad", function (it) {

        it.should("union arrays", function () {
            return when(
                asyncDeepEqual(array(["a", "b", "c"]).async().union(["b", "c", "d"]), ["a", "b", "c", "d"]),
                asyncDeepEqual(array(resolve(["a", "b", "c"])).union(["b", "c", "d"]), ["a", "b", "c", "d"]),
                asyncDeepEqual(array(resolve(["a"])).union(array(["b"]).async(), ["c"], ["d"], array(["c"]).async()), ["a", "b", "c", "d"])
            );
        });
    });

    it.describe("as a function", function (it) {

        it.should("union arrays", function () {
            return when(
                asyncDeepEqual(array.union(["a", "b", "c"], ["b", "c", "d"]), ["a", "b", "c", "d"]),
                asyncDeepEqual(array.union(resolve(["a", "b", "c"]), ["b", "c", "d"]), ["a", "b", "c", "d"]),
                asyncDeepEqual(array.union(resolve(["a"]), array(["b"]).async(), ["c"], ["d"], array(["c"]).async()), ["a", "b", "c", "d"])
            );
        });
    });


});
