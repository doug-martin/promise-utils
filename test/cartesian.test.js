var array = require("../"),
    is = require("is-extended"),
    date = require("date-extended"),
    promise = require("promise-extended"),
    Promise = promise.Promise,
    resolve = promise.resolve,
    when = promise.when,
    assert = require("assert"),
    it = require("it");

it.describe("promise-utils .cartesian", function (it) {

    function asyncDeepEqual(p, expected) {
        return when(p).then(function (res) {
            assert.deepEqual(res, expected);
        });
    }


    it.describe("as a monad", function (it) {
        it.should("find the cartesian product", function () {
            return when(
                asyncDeepEqual(array(resolve([1, 2])).cartesian([2, 3]), [
                    [1, 2],
                    [1, 3],
                    [2, 2],
                    [2, 3]
                ]),
                asyncDeepEqual(array([1, 2]).async().cartesian(array(resolve([2, 3, 4]))), [
                    [1, 2],
                    [1, 3],
                    [1, 4] ,
                    [2, 2],
                    [2, 3],
                    [2, 4]
                ]),
                asyncDeepEqual(array(resolve([1, 2, 3])).cartesian([2, 3, 4]), [
                    [1, 2],
                    [1, 3],
                    [1, 4] ,
                    [2, 2],
                    [2, 3],
                    [2, 4] ,
                    [3, 2],
                    [3, 3],
                    [3, 4]
                ])
            );
        });
    });

    it.describe("as a function", function (it) {
        it.should("find the cartesian product", function () {
            return when(
                asyncDeepEqual(array.cartesian(resolve([1, 2]), [2, 3]), [
                    [1, 2],
                    [1, 3],
                    [2, 2],
                    [2, 3]
                ]),
                asyncDeepEqual(array.cartesian(resolve([1, 2]), array([2, 3, 4]).async()), [
                    [1, 2],
                    [1, 3],
                    [1, 4] ,
                    [2, 2],
                    [2, 3],
                    [2, 4]
                ]),
                asyncDeepEqual(array.cartesian(resolve([1, 2, 3]), [2, 3, 4]), [
                    [1, 2],
                    [1, 3],
                    [1, 4] ,
                    [2, 2],
                    [2, 3],
                    [2, 4] ,
                    [3, 2],
                    [3, 3],
                    [3, 4]
                ])
            );
        });
    });


});

