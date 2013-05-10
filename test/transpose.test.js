var array = require("../"),
    is = require("is-extended"),
    date = require("date-extended"),
    promise = require("promise-extended"),
    Promise = promise.Promise,
    resolve = promise.resolve,
    when = promise.when,
    assert = require("assert"),
    it = require("it");

it.describe("promise-utils .transpose", function (it) {

    function asyncDeepEqual(p, expected) {
        return when(p).then(function (res) {
            assert.deepEqual(res, expected);
        });
    }

    it.describe("as a monad", function (it) {

        it.should("transpose an array of arrays", function () {
            return when(
                asyncDeepEqual(array(resolve([
                    [1, 2, 3],
                    [4, 5, 6]
                ])).transpose(), [
                    [ 1, 4 ],
                    [ 2, 5 ],
                    [ 3, 6 ]
                ]),
                asyncDeepEqual(array([
                    [1, 2, 3],
                    [4, 5, 6]
                ]).async().transpose(), [
                    [ 1, 4 ],
                    [ 2, 5 ],
                    [ 3, 6 ]
                ]),
                asyncDeepEqual(array(resolve([
                    [1, 2],
                    [3, 4],
                    [5, 6]
                ])).transpose(), [
                    [ 1, 3, 5 ],
                    [ 2, 4, 6 ]
                ]),
                asyncDeepEqual(array([
                    [1, 2],
                    [3, 4],
                    [5, 6]
                ]).async().transpose(), [
                    [ 1, 3, 5 ],
                    [ 2, 4, 6 ]
                ]),
                asyncDeepEqual(array(resolve([
                    [1],
                    [3, 4],
                    [5, 6]
                ])).transpose(), [
                    [1]
                ]),
                asyncDeepEqual(array([
                    [1],
                    [3, 4],
                    [5, 6]
                ]).async().transpose(), [
                    [1]
                ])
            );
        });

    });

    it.describe("as a function", function (it) {

        it.should("transpose an array of arrays", function () {
            return when(
                asyncDeepEqual(array.transpose(resolve([
                    [1, 2, 3],
                    [4, 5, 6]
                ])), [
                    [ 1, 4 ],
                    [ 2, 5 ],
                    [ 3, 6 ]
                ]),
                asyncDeepEqual(array.transpose([
                    [1, 2, 3],
                    [4, 5, 6]
                ]), [
                    [ 1, 4 ],
                    [ 2, 5 ],
                    [ 3, 6 ]
                ]),
                asyncDeepEqual(array.transpose(resolve([
                    [1, 2],
                    [3, 4],
                    [5, 6]
                ])), [
                    [ 1, 3, 5 ],
                    [ 2, 4, 6 ]
                ]),
                asyncDeepEqual(array.transpose([
                    [1, 2],
                    [3, 4],
                    [5, 6]
                ]), [
                    [ 1, 3, 5 ],
                    [ 2, 4, 6 ]
                ]),
                asyncDeepEqual(array.transpose(resolve([
                    [1],
                    [3, 4],
                    [5, 6]
                ])), [
                    [1]
                ]),
                asyncDeepEqual(array.transpose([
                    [1],
                    [3, 4],
                    [5, 6]
                ]), [
                    [1]
                ])
            );
        });

    });

});
