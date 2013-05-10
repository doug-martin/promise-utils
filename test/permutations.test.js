var array = require("../"),
    is = require("is-extended"),
    date = require("date-extended"),
    promise = require("promise-extended"),
    Promise = promise.Promise,
    resolve = promise.resolve,
    when = promise.when,
    assert = require("assert"),
    it = require("it");

it.describe("promise-utils .permutations", function (it) {

    function asyncDeepEqual(p, expected) {
        return when(p).then(function (res) {
            assert.deepEqual(res, expected);
        });
    }

    it.describe("as a monad", function (it) {
        it.should("find permutations of an array ", function () {
            var arr = [1, 2, 3];
            return when(
                asyncDeepEqual(array(arr).async().permutations(), [
                    [ 1, 2, 3 ],
                    [ 1, 3, 2 ],
                    [ 2, 3, 1 ],
                    [ 2, 1, 3 ],
                    [ 3, 1, 2 ],
                    [ 3, 2, 1 ]

                ]),
                asyncDeepEqual(array(arr).async().permutations(2), [
                    [ 1, 2],
                    [ 1, 3],
                    [ 2, 3],
                    [ 2, 1],
                    [ 3, 1],
                    [ 3, 2]
                ]),
                asyncDeepEqual(array(arr).async().permutations(1), [
                    [1],
                    [2],
                    [3]
                ]),
                asyncDeepEqual(array(arr).async().permutations(0), [
                    []
                ]),
                asyncDeepEqual(array(arr).async().permutations(4), [])
            );
        });
    });

    it.describe("as a function", function (it) {
        it.should("find permutations of an array ", function () {
            var arr = [1, 2, 3];
            return when(
                asyncDeepEqual(array.permutations(arr), [
                    [ 1, 2, 3 ],
                    [ 1, 3, 2 ],
                    [ 2, 3, 1 ],
                    [ 2, 1, 3 ],
                    [ 3, 1, 2 ],
                    [ 3, 2, 1 ]

                ]),
                asyncDeepEqual(array.permutations(resolve(arr), 2), [
                    [ 1, 2],
                    [ 1, 3],
                    [ 2, 3],
                    [ 2, 1],
                    [ 3, 1],
                    [ 3, 2]
                ]),
                asyncDeepEqual(array.permutations(arr, 1), [
                    [1],
                    [2],
                    [3]
                ]),
                asyncDeepEqual(array.permutations(resolve(arr), 0), [
                    []
                ]),
                asyncDeepEqual(array.permutations(arr, 4), [])
            );
        });
    });

});
