var array = require("../"),
    is = require("is-extended"),
    date = require("date-extended"),
    promise = require("promise-extended"),
    Promise = promise.Promise,
    resolve = promise.resolve,
    when = promise.when,
    assert = require("assert"),
    it = require("it");

it.describe("promise-utils .min", function (it) {

    function asyncDeepEqual(p, expected) {
        return when(p).then(function (res) {
            assert.deepEqual(res, expected);
        });
    }

    it.describe("as a monad", function (it) {
        it.should("find the min value of an array", function () {
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
                minDate = date.daysFromNow(3),
                arr5 = resolve([
                    date.daysFromNow(5),
                    date.daysFromNow(4),
                    minDate
                ]),
                arr6 = resolve([
                    {a: date.daysFromNow(5)},
                    {a: date.daysFromNow(4)},
                    {a: minDate}
                ]),
                arr7 = resolve([true, false]);
            return when(
                asyncDeepEqual(array(arr1).min(), -3),
                asyncDeepEqual(array(arr2).min(), "a"),
                asyncDeepEqual(array(arr7).min(), false),
                asyncDeepEqual(array(arr3).min("a"), {a: -2}),
                asyncDeepEqual(array(arr4).min("a"), {a: "a"}),
                asyncDeepEqual(array(arr5).min(), minDate),
                asyncDeepEqual(array(arr6).min("a"), {a: minDate})
            );

        });

    });

    it.describe("as a function", function (it) {
        it.should("find the min value of an array", function () {
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
                minDate = date.daysFromNow(3),
                arr5 = resolve([
                    date.daysFromNow(5),
                    date.daysFromNow(4),
                    minDate
                ]),
                arr6 = resolve([
                    {a: date.daysFromNow(5)},
                    {a: date.daysFromNow(4)},
                    {a: minDate}
                ]),
                arr7 = resolve([true, false]);
            return when(
                asyncDeepEqual(array.min(arr1), -3),
                asyncDeepEqual(array.min(arr2), "a"),
                asyncDeepEqual(array.min(arr7), false),
                asyncDeepEqual(array.min(arr3, "a"), {a: -2}),
                asyncDeepEqual(array.min(arr4, "a"), {a: "a"}),
                asyncDeepEqual(array.min(arr5), minDate),
                asyncDeepEqual(array.min(arr6, "a"), {a: minDate})
            );

        });

    });


});
