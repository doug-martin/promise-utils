var array = require("../"),
    is = require("is-extended"),
    date = require("date-extended"),
    promise = require("promise-extended"),
    Promise = promise.Promise,
    resolve = promise.resolve,
    when = promise.when,
    assert = require("assert"),
    it = require("it");

it.describe("promise-utils .flatten", function (it) {

    function asyncDeepEqual(p, expected) {
        return when(p).then(function (res) {
            assert.deepEqual(res, expected);
        });
    }


    it.describe("as a monad", function (it) {

        it.should("flatten properly", function () {
            return when(
                asyncDeepEqual(array(resolve([1, 2, 3])).flatten(), [1, 2, 3]),
                asyncDeepEqual(array(resolve([1, 2])).flatten([2, 3], resolve([3, 4])), [1, 2, 2, 3, 3, 4]),
                asyncDeepEqual(array(resolve([
                    [
                        [1, 2],
                        2
                    ],
                    [2, 3],
                    [3, 4]
                ])).flatten(), [
                    [1, 2],
                    2,
                    2,
                    3,
                    3,
                    4
                ]),
                asyncDeepEqual(array(resolve([
                    [1, "A"],
                    [2, "B"],
                    [3, "C"]
                ])).flatten(), [1, "A", 2, "B", 3, "C"])
            )
        });
    });

    it.describe("as a function", function (it) {

        it.should("flatten properly", function () {
            return when(
                asyncDeepEqual(array.flatten(resolve([1, 2, 3])), [1, 2, 3]),
                asyncDeepEqual(array.flatten(resolve([1, 2]), [2, 3], resolve([3, 4])), [1, 2, 2, 3, 3, 4]),
                asyncDeepEqual(array.flatten(resolve([
                    [
                        [1, 2],
                        2
                    ],
                    [2, 3],
                    [3, 4]
                ])), [
                    [1, 2],
                    2,
                    2,
                    3,
                    3,
                    4
                ]),
                asyncDeepEqual(array.flatten(resolve([
                    [1, "A"],
                    [2, "B"],
                    [3, "C"]
                ])), [1, "A", 2, "B", 3, "C"])
            )
        });
    });

});
