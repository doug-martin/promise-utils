var promiseUtils = require("../"),
    is = require("is-extended"),
    date = require("date-extended"),
    promise = require("promise-extended"),
    Promise = promise.Promise,
    resolve = promise.resolve,
    when = promise.when,
    assert = require("assert"),
    it = require("it");

it.describe("promise-utils avg", function (it) {
    var array = promiseUtils;

    function asyncDeepEqual(p, expected) {
        return when(p).then(function (res) {
            assert.deepEqual(res, expected);
        });
    }


    it.describe("as a monad", function (it) {
        it.should("average an array", function () {
            return when(
                asyncDeepEqual(array(resolve([])).avg(), 0),
                asyncDeepEqual(array(resolve([1, 2, 3])).avg(), 2)
            );
        });

        it.should("throw errors for items that are not numbers", function (next) {

            array(resolve(["A", "B", "C"])).avg().then(next, function (err) {
                assert.equal(err.message, "Cannot average an array of non numbers.");
                next();
            });
        });

    });

    it.describe("as a function", function (it) {

        it.should("average an array", function () {
            return when(
                asyncDeepEqual(array.avg(resolve([])), 0),
                asyncDeepEqual(array.avg(resolve([1, 2, 3])), 2),
                asyncDeepEqual(array.avg([1, 2, 3]), 2)
            );
        });

        it.should("throw errors for items that are not numbers", function (next) {

            array.avg(resolve(["A", "B", "C"])).then(next, function (err) {
                assert.equal(err.message, "Cannot average an array of non numbers.");
                next();
            });
        });
    });

});
