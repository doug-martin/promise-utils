var array = require("../"),
    is = require("is-extended"),
    date = require("date-extended"),
    promise = require("promise-extended"),
    Promise = promise.Promise,
    resolve = promise.resolve,
    when = promise.when,
    assert = require("assert"),
    it = require("it");

it.describe("promise-utils", function (it) {

    function asyncDeepEqual(p, expected) {
        return when(p).then(function (res) {
            assert.deepEqual(res, expected);
        });
    }

    it.describe("as a monad", function (it) {
        it.should("support invoke", function () {
            function person(name, age) {
                return {
                    getName: function () {
                        return when(name);
                    },

                    getOlder: function () {
                        age++;
                        return when(this);
                    },

                    getAge: function () {
                        return when(age);
                    }
                };
            }

            var arr = [when(person("Bob", 40)), when(person("Alice", 35)), when(person("Fred", 50)), when(person("Johnny", 56))];
            asyncDeepEqual(array(arr).async().invoke("getOlder").pluck("getAge"), [41, 36, 51, 57]);
            asyncDeepEqual(array(resolve(arr)).invoke("getOlder").pluck("getAge"), [41, 36, 51, 57]);

        });
    });

    it.describe("as a function", function (it) {
        it.should("support invoke", function () {
            function person(name, age) {
                return {
                    getName: function () {
                        return when(name);
                    },

                    getOlder: function () {
                        age++;
                        return when(this);
                    },

                    getAge: function () {
                        return when(age);
                    }
                };
            }

            var arr = [when(person("Bob", 40)), when(person("Alice", 35)), when(person("Fred", 50)), when(person("Johnny", 56))];
            asyncDeepEqual(array.invoke(arr, "getName"), ["Bob", "Alice", "Fred", "Johnny"]);
            asyncDeepEqual(array.invoke(resolve(arr), "getName"), ["Bob", "Alice", "Fred", "Johnny"]);

        });
    });


});
