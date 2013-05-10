var array = require("../"),
    is = require("is-extended"),
    date = require("date-extended"),
    promise = require("promise-extended"),
    Promise = promise.Promise,
    resolve = promise.resolve,
    when = promise.when,
    assert = require("assert"),
    it = require("it");

it.describe("promise-utils .sum", function (it) {

    function asyncDeepEqual(p, expected) {
        return when(p).then(function (res) {
            assert.deepEqual(res, expected);
        });
    }

    it.describe("as a monad", function (it) {

        it.should("sum values of an array", function () {
            var d1 = new Date(1999), d2 = new Date(2000), d3 = new Date(3000);
            return when(
                asyncDeepEqual(array(resolve([])).sum(), 0),
                asyncDeepEqual(array(resolve([1, 2, 3])).sum(), 6),
                asyncDeepEqual(array(resolve(["A", "B", "C"])).sum([]), "ABC"),
                asyncDeepEqual(array(resolve([d1, d2, d3])).sum(), d1.toString() + d2.toString() + d3.toString()),
                asyncDeepEqual(array(resolve([
                    {},
                    {},
                    {}
                ])).sum(), "[object Object][object Object][object Object]")
            );
        });
    });

    it.describe("as a function", function (it) {

        it.should("sum values of an array", function () {
            var d1 = new Date(1999), d2 = new Date(2000), d3 = new Date(3000);
            return when(
                asyncDeepEqual(array.sum(resolve([])), 0),
                asyncDeepEqual(array.sum(resolve([1, 2, 3])), 6),
                asyncDeepEqual(array.sum(resolve(["A", "B", "C"]), []), "ABC"),
                asyncDeepEqual(array.sum(resolve([d1, d2, d3])), d1.toString() + d2.toString() + d3.toString()),
                asyncDeepEqual(array.sum(resolve([
                    {},
                    {},
                    {}
                ])), "[object Object][object Object][object Object]")
            );
        });
    });

});
