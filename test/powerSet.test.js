var array = require("../"),
    is = require("is-extended"),
    date = require("date-extended"),
    promise = require("promise-extended"),
    Promise = promise.Promise,
    resolve = promise.resolve,
    when = promise.when,
    assert = require("assert"),
    it = require("it");

it.describe("promise-utils .powerSet", function (it) {

    function asyncDeepEqual(p, expected) {
        return when(p).then(function (res) {
            assert.deepEqual(res, expected);
        });
    }

    it.describe("as a monad", function (it) {
        it.should("find the powerset", function () {
            return when(
                asyncDeepEqual(array(resolve([1, 2])).powerSet(), [
                    [],
                    [ 1 ],
                    [ 2 ],
                    [ 1, 2 ]
                ]),
                asyncDeepEqual(array([1, 2, 3]).async().powerSet(), [
                    [],
                    [ 1 ],
                    [ 2 ],
                    [ 1, 2 ],
                    [ 3 ],
                    [ 1, 3 ],
                    [ 2, 3 ],
                    [ 1, 2, 3 ]
                ]),
                asyncDeepEqual(array(resolve([1, 2, 3, 4])).powerSet(), [
                    [],
                    [ 1 ],
                    [ 2 ],
                    [ 1, 2 ],
                    [ 3 ],
                    [ 1, 3 ],
                    [ 2, 3 ],
                    [ 1, 2, 3 ],
                    [ 4 ],
                    [ 1, 4 ],
                    [ 2, 4 ],
                    [ 1, 2, 4 ],
                    [ 3, 4 ],
                    [ 1, 3, 4 ],
                    [ 2, 3, 4 ],
                    [ 1, 2, 3, 4 ]
                ])
            );
        });
    });

    it.describe("as a function", function (it) {
        it.should("find the powerset", function () {
            return when(
                asyncDeepEqual(array.powerSet(resolve([1, 2])), [
                    [],
                    [ 1 ],
                    [ 2 ],
                    [ 1, 2 ]
                ]),
                asyncDeepEqual(array.powerSet([1, 2, 3]), [
                    [],
                    [ 1 ],
                    [ 2 ],
                    [ 1, 2 ],
                    [ 3 ],
                    [ 1, 3 ],
                    [ 2, 3 ],
                    [ 1, 2, 3 ]
                ]),
                asyncDeepEqual(array.powerSet(resolve([1, 2, 3, 4])), [
                    [],
                    [ 1 ],
                    [ 2 ],
                    [ 1, 2 ],
                    [ 3 ],
                    [ 1, 3 ],
                    [ 2, 3 ],
                    [ 1, 2, 3 ],
                    [ 4 ],
                    [ 1, 4 ],
                    [ 2, 4 ],
                    [ 1, 2, 4 ],
                    [ 3, 4 ],
                    [ 1, 3, 4 ],
                    [ 2, 3, 4 ],
                    [ 1, 2, 3, 4 ]
                ])
            );
        });
    });

});
