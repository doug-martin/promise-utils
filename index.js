(function () {
    "use strict";

    function definePromiseUtils(extended, promise, is, array, obj) {

        var pSlice = Array.prototype.slice;

        function argsToArray(args, slice) {
            slice = slice || 0;
            return pSlice.call(args, slice);
        }

        var when = promise.when,
            serial = promise.serial,
            chain = promise.chain,
            isDefined = is.isDefined,
            isNumber = is.isNumber,
            isString = is.isString,
            isArray = is.isArray,
            isFunction = is.isFunction,
            Promise = promise.Promise,
            sum = array.sum,
            avg = array.avg,
            sort = array.sort,
            min = array.min,
            max = array.max,
            difference = array.difference,
            removeDuplicates = array.removeDuplicates,
            rotate = array.rotate,
            permutations = array.permutations,
            zip = array.zip,
            transpose = array.transpose,
            valuesAt = array.valuesAt,
            union = array.union,
            intersect = array.intersect,
            powerSet = array.powerSet,
            cartesian = array.cartesian,
            compact = array.compact,
            multiply = array.multiply,
            flatten = array.flatten,
            invoke = array.invoke;

        function _loopResults(cb, scope, results, index, offset, limit) {
            return function () {
                return when(array.map(results.slice(offset, limit + offset), function (r, i) {
                    var ret = new Promise();
                    try {
                        when(cb.apply(scope || results, [r, i + offset, results])).then(ret.callback, ret.errback);
                    } catch (e) {
                        ret.errback(e);
                    }
                    return ret;
                }));
            };
        }

        function asyncLoop(promise, cb, scope, limit) {
            if (isNumber(scope)) {
                limit = scope;
                scope = null;
            }
            return when(promise).then(function (results) {
                var loopResults = (isArray(results) ? results : [results]);
                limit = limit || loopResults.length;
                var list = [], p;
                for (var offset = 0, i = 0, l = loopResults.length; offset < l; offset += limit, i++) {
                    list.push(_loopResults(cb, scope, loopResults, i, offset, limit));
                }
                return serial(list).then(function (loopResults) {
                    return {loopResults: flatten(loopResults) || [], arr: results};
                }, function (error) {
                    error = compact(error);
                    throw (error.length === 1 ? error[0] : error);
                });
            });
        }

        function normalizeResult(result) {
            return isArray(result) ? result : isDefined(result) ? [result] : result;
        }

        function asyncForEach(promise, iterator, scope, limit) {
            return asyncLoop(promise, iterator, scope, limit).then(function (results) {
                return results.arr;
            });
        }

        function asyncMap(promise, iterator, scope, limit) {
            return asyncLoop(promise, iterator, scope, limit).then(function (results) {
                return results.loopResults;
            });
        }

        function asyncFilter(promise, iterator, scope, limit) {
            return asyncLoop(promise, iterator, scope, limit).then(function (results) {
                var loopResults = results.loopResults, resultArr = results.arr;
                return array.filter((isArray(resultArr) ? resultArr : [resultArr]), function (res, i) {
                    return loopResults[i];
                });
            });
        }

        function asyncEvery(promise, iterator, scope, limit) {
            return asyncLoop(promise, iterator, scope, limit).then(function (results) {
                return array.every(results.loopResults, function (res) {
                    return !!res;
                });
            });
        }

        function asyncSome(promise, iterator, scope, limit) {
            return asyncLoop(promise, iterator, scope, limit).then(function (results) {
                return array.some(results.loopResults, function (res) {
                    return !!res;
                });
            });
        }

        function asyncZip() {
            return when.apply(null, argsToArray(arguments)).then(function (result) {
                return zip.apply(array, array.map(normalizeResult(result), function (arg) {
                    return isArray(arg) ? arg : [arg];
                }));
            });
        }

        function asyncAvg(avgPromise) {
            return when(avgPromise).then(function (result) {
                return avg.call(array, normalizeResult(result));
            });
        }

        function asyncCartesian() {
            return when.apply(null, argsToArray(arguments)).then(function (result) {
                return cartesian.apply(array, array.map(normalizeResult(result), function (arg) {
                    return isArray(arg) ? arg : [arg];
                }));
            });
        }

        function asyncCompact(arr) {
            return when(arr).then(function (result) {
                return compact.call(array, normalizeResult(result));
            });
        }


        function asyncDifference() {
            return when.apply(null, argsToArray(arguments)).then(function (result) {
                return difference.apply(array, array.map(normalizeResult(result), function (arg) {
                    return isArray(arg) ? arg : [arg];
                }));
            });
        }

        function asyncFlatten() {
            return when.apply(null, argsToArray(arguments)).then(function (result) {
                return flatten.apply(array, array.map(normalizeResult(result), function (arg) {
                    return isArray(arg) ? arg : [arg];
                }));
            });
        }

        function asyncIntersect() {
            return when.apply(null, argsToArray(arguments)).then(function (result) {
                return intersect.apply(array, array.map(normalizeResult(result), function (arg) {
                    return isArray(arg) ? arg : [arg];
                }));
            });
        }

        function asyncMax() {
            var args = argsToArray(arguments), last = args.pop(), cmp = null;
            if (isFunction(last) || isString(last)) {
                cmp = last;
            } else {
                args.push(last);
            }
            return when.apply(null, args).then(function (result) {
                return max.call(array, normalizeResult(result), cmp);
            });
        }

        function asyncMin() {
            var args = argsToArray(arguments), last = args.pop(), cmp = null;
            if (isFunction(last) || isString(last)) {
                cmp = last;
            } else {
                args.push(last);
            }
            return when.apply(null, args).then(function (result) {
                return min.call(array, normalizeResult(result), cmp);
            });
        }

        function asyncSort() {
            var args = argsToArray(arguments), last = args.pop(), cmp = null;
            if (isFunction(last) || isString(last)) {
                cmp = last;
            } else {
                args.push(last);
            }
            return when.apply(null, args).then(function (result) {
                return sort.call(array, normalizeResult(result), cmp);
            });
        }

        function asyncMultiply() {
            var args = argsToArray(arguments), last = args.pop(), times = null;
            if (isNumber(last)) {
                times = last;
            } else {
                args.push(last);
            }
            return when.apply(null, args).then(function (result) {
                return multiply.call(array, normalizeResult(result), times);
            });
        }

        function asyncPermutations() {
            var args = argsToArray(arguments), last = args.pop(), times = null;
            if (isNumber(last)) {
                times = last;
            } else {
                args.push(last);
            }
            return when.apply(null, args).then(function (result) {
                return permutations.call(array, normalizeResult(result), times);
            });
        }

        function asyncPowerSet(arr) {
            return when(arr).then(function (result) {
                return powerSet.call(array, normalizeResult(result));
            });
        }

        function asyncRemoveDuplicates(arr) {
            return when(arr).then(function (result) {
                return removeDuplicates.call(array, normalizeResult(result));
            });
        }

        function asyncRotate() {
            var args = argsToArray(arguments), last = args.pop(), times = null;
            if (isNumber(last)) {
                times = last;
            } else {
                args.push(last);
            }
            return when.apply(null, args).then(function (result) {
                return rotate.call(array, normalizeResult(result), times);
            });
        }

        function asyncSum(arr) {
            return when(arr).then(function (result) {
                return sum.call(array, normalizeResult(result));
            });
        }

        function asyncTranspose(arr) {
            return when(arr).then(function (result) {
                return transpose.call(array, normalizeResult(result));
            });
        }

        function asyncUnion() {
            return when.apply(null, argsToArray(arguments)).then(function (result) {
                return union.apply(array, array.map(normalizeResult(result), function (arg) {
                    return isArray(arg) ? arg : [arg];
                }));
            });
        }

        function asyncUnique() {
            return asyncRemoveDuplicates.apply(null, arguments);
        }

        function asyncValuesAt(arrPromise) {
            var args = argsToArray(arguments, 1);
            return when(arrPromise).then(function (result) {
                return when(valuesAt.apply(array, [normalizeResult(result)].concat(args)));
            });
        }

        function asyncPluck(arrPromise, property) {
            return when(arrPromise).then(function (result) {
                var prop = property.split(".");
                result = normalizeResult(result);
                return asyncArray(prop).async().forEach(function (prop) {
                    var exec = prop.match(/(\w+)\(\)$/);
                    return asyncArray(result).async().map(function (item) {
                        return exec ? item[exec[1]]() : item[prop];
                    }, 1).then(function (res) {
                            result = res;
                        });
                }, 1).then(function () {
                        return result;
                    });
            });
        }

        function asyncInvoke(arrPromise) {
            var args = argsToArray(arguments, 1);
            return when(arrPromise).then(function (result) {
                return when(invoke.apply(array, [normalizeResult(result)].concat(args)));
            });
        }

        function reverse(arrPromise) {
            return when(arrPromise).then(function (result) {
                return result.reverse();
            });
        }

        function at(arrPromise, index) {
            return when(arrPromise).then(function (result) {
                return result[index];
            });
        }

        function reduce(arrPromise, callback, accumulator) {
            var noaccum = arguments.length < 2;
            return when(arrPromise).then(function (arr) {
                arr = isArray(arr) ? arr : [arr];
                var index = -1;

                if (noaccum) {
                    accumulator = arr[++index];
                }
                return chain(arr.map(function (item, i, arr) {
                    if (i === 0) {
                        return function () {
                            return callback.apply(undefined, [accumulator, item, i, arr]);
                        };
                    } else {
                        return function (accumulator) {
                            return callback.apply(undefined, [accumulator, item, i, arr]);
                        };
                    }
                })).then(function (res) {
                        return res;
                    });
            });
        }

        function reduceRight(arrPromise, callback, accumulator) {
            var noaccum = arguments.length < 2;
            return when(arrPromise).then(function (arr) {
                arr = isArray(arr) ? arr : [arr];
                var index = -1,
                    length = arr.length;

                if (noaccum) {
                    accumulator = arr[++index];
                }
                return chain(arr.slice().reverse().map(function (item, i) {
                    if (i === 0) {
                        return function () {
                            return callback.apply(undefined, [accumulator, item, length - (i + 1), arr]);
                        };
                    } else {
                        return function (accumulator) {
                            return callback.apply(undefined, [accumulator, item, length - (i + 1), arr]);
                        };
                    }
                })).then(function (res) {
                        return res;
                    });
            });
        }

        var promiseUtils = {
            forEach: asyncForEach,
            map: asyncMap,
            filter: asyncFilter,
            every: asyncEvery,
            some: asyncSome,
            zip: asyncZip,
            sum: asyncSum,
            avg: asyncAvg,
            sort: asyncSort,
            min: asyncMin,
            max: asyncMax,
            difference: asyncDifference,
            removeDuplicates: asyncRemoveDuplicates,
            unique: asyncUnique,
            rotate: asyncRotate,
            permutations: asyncPermutations,
            transpose: asyncTranspose,
            valuesAt: asyncValuesAt,
            union: asyncUnion,
            intersect: asyncIntersect,
            powerSet: asyncPowerSet,
            cartesian: asyncCartesian,
            compact: asyncCompact,
            multiply: asyncMultiply,
            flatten: asyncFlatten,
            pluck: asyncPluck,
            invoke: asyncInvoke,
            at: at,
            reduce: reduce,
            reduceRight: reduceRight,
            then: function (p, cb, eb) {
                return p.then(cb, eb);
            },

            both: function (p, cb) {
                return p.both(cb);
            },

            promise: function (p) {
                return p.promise();
            },

            async: function (arr) {
                return arr;
            }
        };

        var asyncArray = extended
            .define(isArray, {
                async: function (arr) {
                    return promise.resolve(arr);
                }
            })
            .define(promise.isPromiseLike, promiseUtils)
            .expose(promiseUtils);

        return asyncArray;


    }

    if ("undefined" !== typeof exports) {
        if ("undefined" !== typeof module && module.exports) {
            module.exports = definePromiseUtils(require("extended"), require("promise-extended"), require("is-extended"), require("array-extended"), require("object-extended"));

        }
    } else if ("function" === typeof define && define.amd) {
        define(["extended", "promise-extended", "is-extended", "array-extended", "object-extended"], function (extended, promise, is, arr, obj) {
            return definePromiseUtils(extended, promise, is, arr, obj);
        });
    } else {
        this.promiseUtils = definePromiseUtils(this.extended, this.promiseExtended, this.isExtended, this.arrayExtended, this.objectExtended);
    }

}).call(this);

