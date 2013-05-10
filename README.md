[![Build Status](https://travis-ci.org/doug-martin/promise-utils.png?branch=master)](https://travis-ci.org/doug-martin/promise-utils)

[![browser support](https://ci.testling.com/doug-martin/promise-utils.png)](http://ci.testling.com/doug-martin/promise-utils)

# promise-utils

`promise-utils` is a Javascript library that provides utilities for working with promises. `promise-utils` can be used as a monad library for promises or each function can be used standalone.

This library uses [`promise-extended`](https://github.com/doug-martin/promise-extended) internally but can be used with any promises A+ compliant library such as [`Q`](https://github.com/kriskowal/q)

`promise-utils` can be used standalone or incorporated into [`extended`](https://github.com/doug-martin/extended)

```javascript
var pUtils = require("promise-utils");
```

Or

```javascript
var myextended = require("extended")
	.register(require("promise-extended"));
```

## Installation

```
npm install promise-utils
```

Or [download the source](https://raw.github.com/doug-martin/promise-utils/master/index.js) ([minified](https://raw.github.com/doug-martin/promise-utils/master/promise-utils.min.js))

## Usage

### Arrays

`promise-utils` can be used with promises or normal arrays by using the `async` method.

**NOTE** The examples below uses a `resolve` method which represents turning an array into a promise resolved with the given array. This is used for brevity where you would typically be working with promises returned from an asynchronous method such as a database call.

```javascript

var arr = [1,2,3];
var promiseArr = resolve(arr);

pUtils(arr).async().forEach(function(item){
    console.log(item);
}).then(function(){
    console.log("Done Looping");
});

//OR

pUtils(promiseArr).forEach(function(item){
    console.log(item);
}).then(function(){
    console.log("Done Looping");
});


```

**Chaining**

When using `promise-utils` as a monad with a promise you may chain methods together.

```javascript

var arr = resolve([1, 2, 3, 4, 5]);
pUtils(arr)
    .map(function (num, i) {
        return num * (i + 1);
    })
    .filter(function (num) {
        return num % 2;
    })
    .avg()
    .then(function(res){
        //11.666666666666666
    });

```

**`forEach`**

Similar to `Array#forEach` except that it resolves with the original array for chaining.

```javascript
//as a monad

pUtils(resolve([1, 2, 3])).forEach(function(item){
    console.log(item);
}).then(function(){
    console.log("Done Looping");
});

pUtils.forEach(resolve([1, 2, 3]), function(item){
    console.log(item);
}).then(function(){
    console.log("Done Looping");
});

```

You may also return a promise from the iterator function, which will prevent the returned promise from resolving until all the returned promises are done.

```javascript
pUtils(resolve([1, 2, 3])).forEach(function(item){
     var ret = new Promise();
     setTimeout(function(){
        ret.callback(item);
     }, 200);
     return ret.promise();
}).then(function(){
    //all promises from iterator function are resolved.
    console.log("Done Looping");
});

```

You may also specify a `limit` which will specify the number of items to be looped at a time, if limit is not specified then all items will be iterated regardless of whether or not the previous item in the array is done.


```javascript

pUtils(resolve([1, 2, 3])).forEach(function(item){
    var ret = new Promise();
    setTimeout(function(){
        ret.callback(item);
    }, 200);
    return ret.promise();
}, 1).then(function(){
    console.log("Done Looping");
});

```

In the above example only one item will be iterated one at a time.

**`map`**

Async version of `Array#map`.

```javascript
//as a monad

pUtils(resolve([1, 2, 3])).map(function(item){
    return item * 2;
}).then(function(result){
    console.log(result); //[2, 4, 6];
});

pUtils.map(resolve([1, 2, 3]), function(item){
    return item * 2;
}).then(function(result){
    console.log(result); //[2, 4, 6];
});

```

You may also return a promise from the iterator function, which will prevent the returned promise from resolving until all the returned promises are done.

```javascript
 //as a monad

pUtils(resolve([1, 2, 3])).map(function(item){
     var ret = new Promise();
     setTimeout(function(){
        ret.callback(item * 2);
     }, 200);
     return ret.promise();
}).then(function(result){
    console.log(result); //[2, 4, 6];
});

```

You may also specify a `limit` which will specify the number of items to be looped at a time, if limit is not specified then all items will be iterated regardless of whether or not the previous item in the array is done.

```javascript

pUtils(resolve([1, 2, 3])).map(function(item){
    var ret = new Promise();
    setTimeout(function(){
        ret.callback(item * 2);
    }, 200);
    return ret.promise();
}, 1).then(function(){
    console.log(result); //[2, 4, 6];
});

```

In the above example only one item will be iterated at a time.

**`filter`**

Async version of `Array#filter`.

```javascript
//as a monad

pUtils(resolve([1, 2, 3])).filter(function(item){
    return item % 2;
}).then(function(result){
    console.log(result); //[1, 3];
});

pUtils.filter(resolve([1, 2, 3]), function(item){
    return item % 2;
}).then(function(result){
    console.log(result); //[1, 3];
});

```

You may also return a promise from the iterator function, which will prevent the returned promise from resolving until all the returned promises are done.

```javascript
 //as a monad

pUtils(resolve([1, 2, 3])).filter(function(item){
     var ret = new Promise();
     setTimeout(function(){
        ret.callback(item % 2);
     }, 200);
     return ret.promise();
}).then(function(result){
    console.log(result); //[1, 3];
});

```

You may also specify a `limit` which will specify the number of items to be looped at a time, if limit is not specified then all items will be iterated regardless of whether or not the previous item in the array is done.

```javascript

pUtils(resolve([1, 2, 3])).filter(function(item){
    var ret = new Promise();
    setTimeout(function(){
        ret.callback(item % 2);
    }, 200);
    return ret.promise();
}, 1).then(function(){
    console.log(result); //[1, 3];
});

```

In the above example only one item will be iterated at a time.

**`every`**

Async version of `Array#every`.

```javascript

pUtils(resolve([1, 2, 3])).every(function(item){
    return isNumber(item);
}).then(function(result){
    console.log(result); //true;
});

pUtils.every(resolve([1, 2, 3]), function(item){
    return isNumber(item);
}).then(function(result){
    console.log(result); //true;
});

```

You may also return a promise from the iterator function, which will prevent the returned promise from resolving until all the returned promises are done.

```javascript
 //as a monad

pUtils(resolve([1, 2, 3])).every(function(item){
     var ret = new Promise();
     setTimeout(function(){
        ret.callback(isNumber(item));
     }, 200);
     return ret.promise();
}).then(function(result){
    console.log(result); //[true];
});

```

You may also specify a `limit` which will specify the number of items to be looped at a time, if limit is not specified then all items will be iterated regardless of whether or not the previous item in the array is done.

```javascript

pUtils(resolve([1, 2, 3])).every(function(item){
    var ret = new Promise();
    setTimeout(function(){
        ret.callback(isNumber(item));
    }, 200);
    return ret.promise();
}, 1).then(function(){
    console.log(result); //true;
});

```

In the above example only one item will be iterated at a time.

**`some`**

Async version of `Array#every`.

```javascript

pUtils(resolve([1, 2, 3])).some(function(item){
    return item === 1;
}).then(function(result){
    console.log(result); //true;
});

pUtils.some(resolve([1, 2, 3]), function(item){
    return item === 1;
}).then(function(result){
    console.log(result); //true;
});

```

You may also return a promise from the iterator function, which will prevent the returned promise from resolving until all the returned promises are done.

```javascript
 //as a monad

pUtils(resolve([1, 2, 3])).some(function(item){
     var ret = new Promise();
     setTimeout(function(){
        ret.callback(item === 1);
     }, 200);
     return ret.promise();
}).then(function(result){
    console.log(result); //[true];
});

```

You may also specify a `limit` which will specify the number of items to be looped at a time, if limit is not specified then all items will be iterated regardless of whether or not the previous item in the array is done.

```javascript

pUtils(resolve([1, 2, 3])).some(function(item){
    var ret = new Promise();
    setTimeout(function(){
        ret.callback(item === 1);
    }, 200);
    return ret.promise();
}, 1).then(function(){
    console.log(result); //true;
});

```

In the above example only one item will be iterated at a time.

**`sum`**

Sums the values of an array

```javascript

pUtils.sum(resolve([1,2,3])).then(function(sum){
   //6
});

pUtils(resolve([1,2,3])).sum().then(function(sum){
    //6
});

```

**`avg`**

Finds the average of an array of numbers.

```javascript

pUtils.avg(resolve([1,2,3])).then(function(avg){
    //2
});

pUtils(resolve([1,2,3])).avg().then(function(avg){
    //2
});
```

**`sort`**

Sorts an array based on a property, by natural ordering, or by a custom comparator.

**Note** this does not change the original array.

```javascript

pUtils.sort(resolve([{a: 1},{a: 2},{a: -2}]), "a").then(function(sorted){
    //[{a: -2},{a: 1},{a: 2}];
})

pUtils(resolve([{a: 1},{a: 2},{a: -2}])).sort("a").then(function(sorted){
    //[{a: -2},{a: 1},{a: 2}];
})


```

**`min`**

Finds the minimum value in an array based on a property, by natural ordering, or by a custom comparator.

```javascript

pUtils.min(resolve([ 3, -3, -2, -1, 1, 2])).then(function(min){
    //-3
});

pUtils.min(resolve([{a: 1},{a: 2},{a: -2}]), "a").then(function(min){
    //{a : -2}
});

pUtils(resolve([ 3, -3, -2, -1, 1, 2])).min().then(function(min){
    //-3
});

pUtils(resolve([{a: 1},{a: 2},{a: -2}])).min("a").then(function(min){
    //{a : -2}
});

```

**`max`**

Finds the maximum value in an array based on a property, by natural ordering, or by a custom comparator.

```javascript

pUtils.max(resolve([ 3, -3, -2, -1, 1, 2])).then(function(max){
     //2
});

pUtils.max(resolve([{a: 1},{a: 2},{a: -2}]), "a").then(function(max){
    //{a : 2}
});

pUtils(resolve([ 3, -3, -2, -1, 1, 2])).max().then(function(max){
    //2
});

pUtils(resolve([{a: 1},{a: 2},{a: -2}])).max("a").then(function(max){
    //{a : 2}
});

```

**`difference`**

Finds the difference between two arrays.

```javascript
pUtils.difference(resolve([1, 2, 3]), [2]).then(function(diff){
    //[1, 3]
});
pUtils.difference(resolve([true, false]), resolve([false])).then(function(diff){
    //[true]
});

pUtils.difference(resolve(["a", "b", 3]), resolve([3])).then(function(diff){
    //["a", "b"]
});

pUtils.difference(resolve([{a: 1}, {a: 2}, {a: 3}]), resolve([{a: 2}, {a: 3}])).then(function(diff){
    //[{a: 1}]
});

pUtils(resolve([true, false])).difference([false]).then(function(diff){
    // [true]
});

pUtils(resolve([1, 2, 3])).difference(resolve([2])).then(function(diff){
    // [1, 3]
});
pUtils(resolve([1, 2, 3])).difference([2], resolve([3])).then(function(diff){
     //[1]
});

pUtils(resolve(["a", "b", 3])).difference([3]).then(function(diff){
     //["a", "b"]
});
pUtils(resolve([{a: 1}, {a: 2}, {a: 3}])).difference(resolve([{a: 2}, {a: 3}])).then(function(diff){
    // [{a: 1}]
});
```

**`unique`**

Removed duplicate values from an array

```javascript

pUtils.unique(resolve([1, 2, 2, 3, 3, 3, 4, 4, 4])).then(function(unique){
    //[1, 2, 3, 4]
}):
pUtils(resolve([1, 2, 2, 3, 3, 3, 4, 4, 4])).unique().then(function(unique){
    //[1, 2, 3, 4]
});

pUtils(resolve(["a", "b", "b"])).unique().then(function(unique){
    //["a", "b"]
});

pUtils.unique(resolve(["a", "b", "b"])).then(function(unique){
    //["a", "b"]
});
```

**`rotate`**

Rotates an array by the number of places for 1 position by default.

```javascript

var arr = pUtils(resolve(["a", "b", "c", "d"]))
arr.rotate();   //resolves with ["b", "c", "d", "a"]
arr.rotate(2);  //resolves with ["c", "d", "a", "b"]
arr.rotate(3);  //resolves with ["d", "a", "b", "c"]
arr.rotate(4);  //resolves with ["a", "b", "c", "d"]
arr.rotate(-1); //resolves with ["d", "a", "b", "c"]
arr.rotate(-2); //resolves with ["c", "d", "a", "b"]
arr.rotate(-3); //resolves with ["b", "c", "d", "a"]
arr.rotate(-4); //resolves with ["a", "b", "c", "d"]

arr = resolve(["a", "b", "c", "d"]);
pUtils.rotate(arr);     //resolves with ["b", "c", "d", "a"]
pUtils.rotate(arr, 2);  //resolves with ["c", "d", "a", "b"]
pUtils.rotate(arr, 3);  //resolves with ["d", "a", "b", "c"]
pUtils.rotate(arr, 4);  //resolves with ["a", "b", "c", "d"]
pUtils.rotate(arr, -1)  //resolves with ["d", "a", "b", "c"]
pUtils.rotate(arr, -2); //resolves with ["c", "d", "a", "b"]
pUtils.rotate(arr, -3); //resolves with ["b", "c", "d", "a"]
pUtils.rotate(arr, -4); //resolves with ["a", "b", "c", "d"]

```

**`permutations`**

Finds all permutations of an array.

```javascript

pUtils(resolve([1, 2, 3])).permutations(); //resolves with [
                                 //   [ 1, 2, 3 ],
                                 //   [ 1, 3, 2 ],
                                 //   [ 2, 3, 1 ],
                                 //   [ 2, 1, 3 ],
                                 //   [ 3, 1, 2 ],
                                 //   [ 3, 2, 1 ]
                                 //]

pUtils(resolve([1, 2, 3])).permutations(2);// resolves with [
                                           //   [ 1, 2],
                                           //   [ 1, 3],
                                           //   [ 2, 3],
                                           //   [ 2, 1],
                                           //   [ 3, 1],
                                           //   [ 3, 2]
                                           //]

pUtils.permutations(resolve([1, 2, 3]));   // resolves with [
                                 //   [ 1, 2, 3 ],
                                 //   [ 1, 3, 2 ],
                                 //   [ 2, 3, 1 ],
                                 //   [ 2, 1, 3 ],
                                 //   [ 3, 1, 2 ],
                                 //   [ 3, 2, 1 ]
                                 //]

pUtils.permutations(resolve([1, 2, 3]), 2); //resolves with [
                                    //   [ 1, 2],
                                    //   [ 1, 3],
                                    //   [ 2, 3],
                                    //   [ 2, 1],
                                    //   [ 3, 1],
                                    //   [ 3, 2]
                                    //]

```

**`zip`**

Zips the values of multiple arrays into a single pUtils.

```javascript

pUtils(resolve([1])).zip(resolve([2]), resolve([3]));//resolves with [
                                                     //  [ 1, 2, 3 ]
                                                     //];

pUtils(resolve([1, 2])).zip(resolve([2]), [3]);      //resolves with [
                                                     //  [ 1, 2, 3 ],
                                                     //  [2, null, null]
                                                     //]

pUtils(resolve([1, 2, 3])).zip([ 4, 5, 6 ], b);      //resolves with [
                                                     //  [1, 4, 7],
                                                     //  [2, 5, 8],
                                                     //  [3, 6, 9]
                                                     //]

pUtils(resolve([1, 2])).zip([ 4, 5, 6 ], resolve([7, 8, 9 ])); //resolves with [
                                                               //  [1, 4, 7],
                                                               //  [2, 5, 8]
                                                               //]

pUtils(resolve([ 4, 5, 6 ])).zip([1, 2], [8]);       //resolves with [
                                                     //  [4, 1, 8],
                                                     //  [5, 2, null],
                                                     //  [6, null, null]
                                                     //]


pUtils.zip(resolve([1]), [2], [3]);                  //resolves with [
                                                     //  [ 1, 2, 3 ]
                                                     //]

pUtils.zip(resolve([1, 2]), resolve([2]), [3]);      //resolves with [
                                                     //  [ 1, 2, 3 ],
                                                     //  [2, null, null]
                                                     //]

pUtils.zip(resolve([1, 2, 3]), [4,5,6],  resolve([7, 8, 9 ])); //resolves with [
                                                               //  [1, 4, 7],
                                                               //  [2, 5, 8],
                                                               //  [3, 6, 9]
                                                               //]

pUtils.zip(resolve([1, 2]), [4,5,6],  [7, 8, 9 ]);    //resolves with [
                                                      //  [1, 4, 7],
                                                      //  [2, 5, 8]
                                                      //]

pUtils.zip([ 4, 5, 6 ], [1, 2], resolve([8]));        //resolves with [
                                                      //  [4, 1, 8],
                                                      //  [5, 2, null],
                                                      //  [6, null, null]
                                                      //]

```

**`transpose`**

Transpose a multi dimensional array.

```javascript
pUtils(resolve([[1, 2, 3],[4, 5, 6]])).transpose();   //resolves with [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
pUtils([[1, 2],[3, 4],[5, 6]]).async().transpose();   //resolves with [ [ 1, 3, 5 ], [ 2, 4, 6 ] ]
pUtils(resolve([[1],[3, 4],[5, 6]])).transpose();     //resolves with [ [1] ]


pUtils.transpose(resolve([[1, 2, 3],[4, 5, 6]]));     //resolves with [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
pUtils.transpose(resolve([[1, 2],[3, 4],[5, 6]]));    //resolves with [ [ 1, 3, 5 ], [ 2, 4, 6 ] ]
pUtils.transpose(resolve([[1],[3, 4],[5, 6]]));       //resolves with [ [1] ]
```

**`valuesAt`**

Gathers values at the specified indexes.

```javascript

var arr = pUtils(resolve(["a", "b", "c", "d"]));
arr.valuesAt(1, 2, 3);      //resolves with ["b", "c", "d"]
arr.valuesAt(1, 2, 3, 4);   //resolves with ["b", "c", "d", null]
arr.valuesAt(0, 3);         //resolves with ["a", "d"]

arr = resolve(["a", "b", "c", "d"]);
pUtils.valuesAt(arr, 1, 2, 3);       //resolves with ["b", "c", "d"]
pUtils.valuesAt(arr, 1, 2, 3, 4);    //resolves with ["b", "c", "d", null]
pUtils.valuesAt(arr, 0, 3);          //resolves with ["a", "d"]
```

**`union`**

Finds the union of two arrays.

```javascript
pUtils(resolve(["a", "b", "c"])).union(["b", "c", "d"]);           //resolves with ["a", "b", "c", "d"]);
pUtils(["a"]).async().union(["b"], ["c"], ["d"], resolve(["c"]));  //resolves with ["a", "b", "c", "d"]);

pUtils.union(resolve(["a", "b", "c"]), ["b", "c", "d"]);           //resolves with ["a", "b", "c", "d"]);
pUtils.union(resolve(["a"]), ["b"], resolve(["c"]), ["d"], ["c"]); //resolves with ["a", "b", "c", "d"]);
```

**`intersect`**

Finds the intersection of arrays.

```javascript
pUtils(resolve([1, 2])).intersect([2, 3], [2, 3, 5]);                            //resolves with [2];
pUtils(resolve([1, 2, 3])).intersect([2, 3, 4, 5], [2, 3, 5]);                   //resolves with [2, 3];
pUtils(resolve([1, 2, 3, 4])).intersect([2, 3, 4, 5], [2, 3, 4, 5]);             //resolves with [2, 3, 4];
pUtils(resolve([1, 2, 3, 4, 5])).intersect([1, 2, 3, 4, 5], [1, 2, 3]);          //resolves with [1, 2, 3];
pUtils(resolve([[1, 2, 3, 4, 5],[1, 2, 3, 4, 5],[1, 2, 3]])).intersect();        //resolves with [1, 2, 3];

pUtils.intersect(resolve([1, 2]), [2, 3], [2, 3, 5]);                             //resolves with [2]
pUtils.intersect(resolve([1, 2, 3]), [2, 3, 4, 5], [2, 3, 5]);                    //resolves with [2, 3]
pUtils.intersect(resolve([1, 2, 3, 4]), [2, 3, 4, 5], resolve([2, 3, 4, 5]));     //resolves with [2, 3, 4]
pUtils.intersect(resolve([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5], [1, 2, 3]);           //resolves with [1, 2, 3]);
pUtils.intersect(resolve([[1, 2, 3, 4, 5],[1, 2, 3, 4, 5], [1, 2, 3]]));          //resolves with [1, 2, 3]);
```

**`powerSet`**

Finds the powerset of a given array.

```javascript
pUtils(resolve([1, 2, 3])).powerSet();
pUtils.powerSet(resolve([1, 2, 3]));
//Both resolve with
//[
//  [],
//  [ 1 ],
//  [ 2 ],
//  [ 1, 2 ],
//  [ 3 ],
//  [ 1, 3 ],
//  [ 2, 3 ],
//  [ 1, 2, 3 ]
//]
```

**`cartesian`**

Finds the cartesian product of arrays.

```javascript
pUtils(resolve([1, 2])).cartesian(resolve([2, 3]));
pUtils.cartesian(resolve([1, 2]), [2, 3]);
//Both resolve with
//[
//  [1, 2],
//  [1, 3],
//  [2, 2],
//  [2, 3]
//]
```

**`compact`**

Compacts the values of an array.

```javascript
pUtils(resolve([1, null, null, x, 2])).compact(); //Resolves with [1, 2]

pUtils([1, 2]).async().compact();  //Resolves with [1, 2]


pUtils.compact(resolve([1, null, null, x, 2])); //Resolves with [1, 2]
pUtils.compact(resolve([1, 2])); //Resolves with [1, 2]
```

**`multiply`**

Reproduces the values in an array the given number of times.

```javascript
pUtils(resolve([1, 2])).multiply(2); //Resolves with[1, 2, 1, 2, 1, 2]

pUtils.multiply(resolve([1, 2, 3]), 2); //Resolves with [1, 2, 3, 1, 2, 3]
```

**`flatten`**

Flatten multiple arrays into a single array.

```javascript

pUtils(resolve([ [1], [2], [3] ])).flatten(); //Resolves with [1, 2, 3]

pUtils.flatten(resolve([1, 2]), [2, 3], resolve([3, 4])); //Resolves with [1, 2, 2, 3, 3, 4]

```

**`pluck`**

Pluck properties from values in an array.

**NOTE** Plucked properties may also be promises. `pluck` will return the resolved value of the promise

```javascript
var arr = resolve([
    {name: {first: "Fred", last: "Jones"}, age: 50, roles: ["a", "b", "c"]},
    {name: {first: resolve("Bob"), last: "Yukon"}, age: resolve(40), roles: resolve(["b", "c"])},
    {name: {first: "Alice", last: "Palace"}, age: 35, roles: ["c"]},
    {name: {first: resolve("Johnny"), last: "P."}, age: 56, roles: resolve([])}
]);

pUtils.pluck(arr, "name.first"); //Resolves with ["Fred", "Bob", "Alice", "Johnny"]
pUtils(arr).pluck("age"); //Resolves with [50, 40, 35, 56]

```

**`invoke`**

Invokes the specified method on each value in an array.

```javascript

function person(name, age) {
    return {
        getName: function () {
            return resolve(name);
        },

        getOlder: function () {
            age++;
            return resolve(this);
        },

        getAge: function () {
            return resolve(age);
        }
    };
};

var arr = resolve([person("Bob", 40), person("Alice", 35), person("Fred", 50), person("Johnny", 56)]);

pUtils.invoke(arr, "getName"); //Resolves with ["Bob", "Alice", "Fred", "Johnny"];
pUtils(arr).invoke("getName"); //Resolves with ["Bob", "Alice", "Fred", "Johnny"];

pUtils(arr).invoke("getOlder").invoke("getAge"); //Resolves with [41, 36, 51, 57];
```
