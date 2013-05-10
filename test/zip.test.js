var array = require("../"),
    is = require("is-extended"),
    date = require("date-extended"),
    promise = require("promise-extended"),
    Promise = promise.Promise,
    resolve = promise.resolve,
    when = promise.when,
    assert = require("assert"),
    it = require("it");

it.describe("promise-utils .zip", function (it) {

    var arr = [1, 2, 3, 4, 5];

    function asyncArr() {
        return promise.resolve(arr);
    }


    it.describe("as a monad", function (it) {

        it.should("zip arrays together", function () {
            return array(asyncArr()).zip(asyncArr(), asyncArr()).then(function (zipped) {
                assert.deepEqual(zipped, [
                    [1, 1, 1],
                    [2, 2, 2],
                    [3, 3, 3],
                    [4, 4, 4],
                    [5, 5, 5]
                ]);
            });
        });

    });

    it.describe("as a function", function (it) {

        it.should("zip arrays together", function () {
            return array.zip(asyncArr(), asyncArr(), asyncArr()).then(function (zipped) {
                assert.deepEqual(zipped, [
                    [1, 1, 1],
                    [2, 2, 2],
                    [3, 3, 3],
                    [4, 4, 4],
                    [5, 5, 5]
                ]);
            });
        });

    });

});
