var array = require("../"),
    is = require("is-extended"),
    date = require("date-extended"),
    promise = require("promise-extended"),
    Promise = promise.Promise,
    resolve = promise.resolve,
    when = promise.when,
    assert = require("assert"),
    it = require("it");

it.describe("promise-utils", function (it) {

    function asyncDeepEqual(p, expected) {
        return when(p).then(function (res) {
            assert.deepEqual(res, expected);
        });
    }

    it.describe("as a monad", function (it) {
        it.should("intersect properly", function () {
            return when(
                asyncDeepEqual(array(resolve([1, 2])).intersect([2, 3], [2, 3, 5]), [2]),
                asyncDeepEqual(array(resolve([1, 2, 3])).intersect(array(resolve([2, 3, 4, 5])), array(resolve([2, 3, 5]))), [2, 3]),
                asyncDeepEqual(array(resolve([1, 2, 3, 4])).intersect(resolve([2, 3, 4, 5]), resolve([2, 3, 4, 5])), [2, 3, 4]),
                asyncDeepEqual(array(resolve([1, 2, 3, 4, 5])).intersect([1, 2, 3, 4, 5], array(resolve([1, 2, 3]))), [1, 2, 3]),
                asyncDeepEqual(array(resolve([
                    [1, 2, 3, 4, 5],
                    [1, 2, 3, 4, 5],
                    [1, 2, 3]
                ])).intersect(), [1, 2, 3])
            );
        });
    });

    it.describe("as a function", function (it) {
        it.should("intersect properly", function () {
            return when(
                asyncDeepEqual(array.intersect(resolve([1, 2]), [2, 3], [2, 3, 5]), [2]),
                asyncDeepEqual(array.intersect(resolve([1, 2, 3]), array(resolve([2, 3, 4, 5])), array(resolve([2, 3, 5]))), [2, 3]),
                asyncDeepEqual(array.intersect(resolve([1, 2, 3, 4]), resolve([2, 3, 4, 5]), resolve([2, 3, 4, 5])), [2, 3, 4]),
                asyncDeepEqual(array.intersect(resolve([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5], array(resolve([1, 2, 3]))), [1, 2, 3]),
                asyncDeepEqual(array.intersect(resolve([
                    [1, 2, 3, 4, 5],
                    [1, 2, 3, 4, 5],
                    [1, 2, 3]
                ])), [1, 2, 3])
            );
        });
    });


});
