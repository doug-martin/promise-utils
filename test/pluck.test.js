var array = require("../"),
    is = require("is-extended"),
    date = require("date-extended"),
    promise = require("promise-extended"),
    Promise = promise.Promise,
    resolve = promise.resolve,
    when = promise.when,
    assert = require("assert"),
    it = require("it");

it.describe("promise-utils .pluck", function (it) {

    function asyncDeepEqual(p, expected) {
        return when(p).then(function (res) {
            assert.deepEqual(res, expected);
        });
    }

    it.describe("as a monad", function (it) {
        it.should("pluck properties", function () {
            var arr = [
                {name: {first: "Fred", last: "Jones"}, age: 50, roles: ["a", "b", "c"]},
                {name: {first: when("Bob"), last: "Yukon"}, age: when(40), roles: when(["b", "c"])},
                {name: {first: "Alice", last: "Palace"}, age: 35, roles: ["c"]},
                {name: {first: when("Johnny"), last: "P."}, age: 56, roles: when([null])}
            ];
            return when(
                asyncDeepEqual(array(arr).async().pluck("name.first"), ["Fred", "Bob", "Alice", "Johnny"]),
                asyncDeepEqual(array(resolve(arr)).pluck("name.first"), ["Fred", "Bob", "Alice", "Johnny"]),
                asyncDeepEqual(array(arr).async().pluck("age"), [50, 40, 35, 56]),
                asyncDeepEqual(array(resolve(arr)).pluck("age"), [50, 40, 35, 56]),
                asyncDeepEqual(array(arr).async().pluck("roles.length"), [3, 2, 1, 1]),
                asyncDeepEqual(array(resolve(arr)).pluck("roles.length"), [3, 2, 1, 1]),
                asyncDeepEqual(array(arr).async().pluck("roles.0"), ["a", "b", "c", null]),
                asyncDeepEqual(array(resolve(arr)).pluck("roles.0"), ["a", "b", "c", null])
            );

        });
    });

    it.describe("as a function", function (it) {
        it.should("pluck properties", function () {
            var arr = [
                {name: {first: "Fred", last: "Jones"}, age: 50, roles: ["a", "b", "c"]},
                {name: {first: when("Bob"), last: "Yukon"}, age: when(40), roles: when(["b", "c"])},
                {name: {first: "Alice", last: "Palace"}, age: 35, roles: ["c"]},
                {name: {first: when("Johnny"), last: "P."}, age: 56, roles: when([null])}
            ];
            return when(
                asyncDeepEqual(array.pluck(arr, "name.first"), ["Fred", "Bob", "Alice", "Johnny"]),
                asyncDeepEqual(array.pluck(resolve(arr), "name.first"), ["Fred", "Bob", "Alice", "Johnny"]),
                asyncDeepEqual(array.pluck(arr, "age"), [50, 40, 35, 56]),
                asyncDeepEqual(array.pluck(resolve(arr), "age"), [50, 40, 35, 56]),
                asyncDeepEqual(array.pluck(arr, "roles.length"), [3, 2, 1, 1]),
                asyncDeepEqual(array.pluck(resolve(arr), "roles.length"), [3, 2, 1, 1]),
                asyncDeepEqual(array.pluck(arr, "roles.0"), ["a", "b", "c", null]),
                asyncDeepEqual(array.pluck(resolve(arr), "roles.0"), ["a", "b", "c", null])
            );

        });
    });

});

