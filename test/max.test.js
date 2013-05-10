var array = require("../"),
    is = require("is-extended"),
    date = require("date-extended"),
    promise = require("promise-extended"),
    Promise = promise.Promise,
    resolve = promise.resolve,
    when = promise.when,
    assert = require("assert"),
    it = require("it");

it.describe("promise-utils .max", function (it) {

    function asyncDeepEqual(p, expected) {
        return when(p).then(function (res) {
            assert.deepEqual(res, expected);
        });
    }

    var arr1 = resolve([ 3, -3, -2, -1, 1, 2]),
        arr2 = resolve(["b", "c", "a"]),
        arr3 = resolve([
            {a: 1},
            {a: 2},
            {a: -2}
        ]),
        arr4 = resolve([
            {a: "c"},
            {a: "b"},
            {a: "a"}
        ]),
        maxDate = date.daysFromNow(5),
        arr5 = resolve([
            maxDate,
            date.daysFromNow(4),
            date.daysFromNow(3)
        ]),
        arr6 = resolve([
            {a: maxDate},
            {a: date.daysFromNow(4)},
            {a: date.daysFromNow(3)}
        ]),
        arr7 = resolve([true, false]);

    it.describe("as a monad", function (it) {

        it.should("find the max value of an array", function () {
            return when(
                asyncDeepEqual(array(arr1).max(), 3),
                asyncDeepEqual(array(arr2).max(), "c"),
                asyncDeepEqual(array(arr7).max(), true),
                asyncDeepEqual(array(arr3).max("a"), {a: 2}),
                asyncDeepEqual(array(arr4).max("a"), {a: "c"}),
                asyncDeepEqual(array(arr5).max(), maxDate),
                asyncDeepEqual(array(arr6).max("a"), {a: maxDate})
            );
        });

    });


    it.describe("as a function", function (it) {

        it.should("find the max value of an array", function () {
            return when(
                asyncDeepEqual(array.max(arr1), 3),
                asyncDeepEqual(array.max(arr2), "c"),
                asyncDeepEqual(array.max(arr7), true),
                asyncDeepEqual(array.max(arr3, "a"), {a: 2}),
                asyncDeepEqual(array.max(arr4, "a"), {a: "c"}),
                asyncDeepEqual(array.max(arr5), maxDate),
                asyncDeepEqual(array.max(arr6, "a"), {a: maxDate})
            );
        });

    });

});

