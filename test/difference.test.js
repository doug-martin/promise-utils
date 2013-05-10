var array = require("../"),
    is = require("is-extended"),
    date = require("date-extended"),
    promise = require("promise-extended"),
    Promise = promise.Promise,
    resolve = promise.resolve,
    when = promise.when,
    assert = require("assert"),
    it = require("it");

it.describe("promise-utils .difference", function (it) {

    function asyncDeepEqual(p, expected) {
        return when(p).then(function (res) {
            assert.deepEqual(res, expected);
        });
    }


    it.describe("as a monad", function (it) {
        it.should("find the difference between two arrays", function () {
            var a = {a: 1}, b = {a: 2}, c = {a: 3};
            return when(
                asyncDeepEqual(array(resolve([true, false])).difference(array([false]).async()), [true]),
                asyncDeepEqual(array([true, false]).async().difference(array([false]).async()), [true]),
                asyncDeepEqual(array(resolve([1, 2, 3])).difference([2]), [1, 3]),
                asyncDeepEqual(array([1, 2, 3]).async().difference([2]), [1, 3]),
                asyncDeepEqual(array(resolve([1, 2, 3])).difference([2], array([3]).async()), [1]),
                asyncDeepEqual(array([1, 2, 3]).async().difference([2], [3]), [1]),
                asyncDeepEqual(array(resolve(["a", "b", 3])).difference([3]), ["a", "b"]),
                asyncDeepEqual(array(["a", "b", 3]).async().difference([3]), ["a", "b"]),
                asyncDeepEqual(array(resolve([a, b, c])).difference([b, c]), [a])
            );
        });
    });

    it.describe("as a function", function (it) {
        it.should("find the difference between two arrays", function () {
            var a = {a: 1}, b = {a: 2}, c = {a: 3};
            return when(
                asyncDeepEqual(array.difference([true, false], [false]), [true]),
                asyncDeepEqual(array.difference(resolve([true, false]), [false]), [true]),
                asyncDeepEqual(array.difference(resolve([true, false]), resolve([false])), [true]),
                asyncDeepEqual(array.difference([true, false], resolve([false])), [true]),

                asyncDeepEqual(array.difference([1, 2, 3], [2]), [1, 3]),
                asyncDeepEqual(array.difference(resolve([1, 2, 3]), [2]), [1, 3]),
                asyncDeepEqual(array.difference([1, 2, 3], resolve([2])), [1, 3]),
                asyncDeepEqual(array.difference(resolve([1, 2, 3]), resolve([2])), [1, 3]),

                asyncDeepEqual(array.difference([1, 2, 3], [2], [3]), [1]),
                asyncDeepEqual(array.difference(resolve([1, 2, 3]), [2], [3]), [1]),
                asyncDeepEqual(array.difference(resolve([1, 2, 3]), resolve([2]), [3]), [1]),
                asyncDeepEqual(array.difference(resolve([1, 2, 3]), resolve([2]), resolve([3])), [1]),
                asyncDeepEqual(array.difference([1, 2, 3], [2], array([3]).async()), [1]),

                asyncDeepEqual(array.difference(["a", "b", 3], [3]), ["a", "b"]),
                asyncDeepEqual(array.difference([a, b, c], [b, c]), [a])
            );
        });

    });


});

