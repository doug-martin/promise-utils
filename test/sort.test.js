var array = require("../"),
    is = require("is-extended"),
    date = require("date-extended"),
    promise = require("promise-extended"),
    Promise = promise.Promise,
    resolve = promise.resolve,
    when = promise.when,
    assert = require("assert"),
    it = require("it");

it.describe("promise-utils .sort", function (it) {

    function asyncDeepEqual(p, expected) {
        return when(p).then(function (res) {
            assert.deepEqual(res, expected);
        });
    }

    it.describe("as a monad", function (it) {
        it.should("sort an array", function () {
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
                fiveDays = date.daysFromNow(5),
                fourDays = date.daysFromNow(4),
                threeDays = date.daysFromNow(3),
                arr5 = resolve([
                    fiveDays,
                    fourDays,
                    threeDays
                ]),
                arr6 = resolve([
                    {a: fiveDays},
                    {a: fourDays},
                    {a: threeDays}
                ]),
                arr7 = resolve([true, false]);
            return when(
                asyncDeepEqual(array(arr1).sort(), [-3, -2, -1, 1, 2, 3]),
                asyncDeepEqual(array(arr2).sort(), ["a", "b", "c"]),

                asyncDeepEqual(array(arr7).sort(), [false, true]),

                asyncDeepEqual(array(arr3).sort("a"), [
                    {a: -2},
                    {a: 1},
                    {a: 2}
                ]),

                asyncDeepEqual(array(arr4).sort("a"), [
                    {a: "a"},
                    {a: "b"},
                    {a: "c"}
                ]),

                asyncDeepEqual(array(arr5).sort(), [
                    threeDays,
                    fourDays,
                    fiveDays
                ]),
                asyncDeepEqual(array(arr6).sort("a"), [
                    {a: threeDays},
                    {a: fourDays},
                    {a: fiveDays}
                ]),
                asyncDeepEqual(array(arr6).sort(function (a, b) {
                    return a.a - b.a;
                }), [
                    {a: threeDays},
                    {a: fourDays},
                    {a: fiveDays}
                ])
            );
        });

    });

    it.describe("as a function", function (it) {
        it.should("sort an array", function () {
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
                fiveDays = date.daysFromNow(5),
                fourDays = date.daysFromNow(4),
                threeDays = date.daysFromNow(3),
                arr5 = resolve([
                    fiveDays,
                    fourDays,
                    threeDays
                ]),
                arr6 = resolve([
                    {a: fiveDays},
                    {a: fourDays},
                    {a: threeDays}
                ]),
                arr7 = resolve([true, false]);
            return when(
                asyncDeepEqual(array.sort(arr1), [-3, -2, -1, 1, 2, 3]),
                asyncDeepEqual(array.sort(arr2), ["a", "b", "c"]),

                asyncDeepEqual(array.sort(arr7), [false, true]),

                asyncDeepEqual(array.sort(arr3, "a"), [
                    {a: -2},
                    {a: 1},
                    {a: 2}
                ]),

                asyncDeepEqual(array.sort(arr4, "a"), [
                    {a: "a"},
                    {a: "b"},
                    {a: "c"}
                ]),

                asyncDeepEqual(array.sort(arr5), [
                    threeDays,
                    fourDays,
                    fiveDays
                ]),
                asyncDeepEqual(array.sort(arr6, "a"), [
                    {a: threeDays},
                    {a: fourDays},
                    {a: fiveDays}
                ]),
                asyncDeepEqual(array.sort(arr6, function (a, b) {
                    return a.a - b.a;
                }), [
                    {a: threeDays},
                    {a: fourDays},
                    {a: fiveDays}
                ])
            );
        });

    });

});
