// 判断变量的类型
// * 原始类型：Boolean、undefined、Number、bigInt、String、symbol，除了null，以及对象类型function都能通过typeof来判断类型
console.log('typeof true: ', typeof true === 'boolean');
console.log('typeof 1: ', typeof 1 === 'number');
console.log('typeof undefined: ', typeof undefined === 'undefined');
console.log('typeof 1n: ', typeof 1n === 'bigint');
console.log('typeof "String": ', typeof 'String' === 'string');
console.log('typeof Symbol(): ', typeof Symbol() === 'symbol');
console.log('typeof function(){}: ', typeof function () {} === 'function');

// * 判断数组
let arr = []
// 通过 isArray() 判断
console.log('isArray: ', Array.isArray(arr));
// 通过原型链判断
console.log('instanceof: ', arr instanceof Array);
// 通过构造函数判断
console.log('constructor: ', arr.constructor === Array);
// 通过原型链
console.log("Object.prototype.toString.call()", Object.prototype.toString.call(arr) === '[object Array]');

// * 判断对象
let obj = {}
// 通过原型链判断
console.log('instanceof: ', obj instanceof Object);
// 通过构造函数判断
console.log('constructor: ', obj.constructor === Object);
// 通过原型链
console.log("Object.prototype.toString.call()", Object.prototype.toString.call(obj) === '[object Object]');

// * 判断函数
let fuc = function () {}
// 通过typeof判断
console.log('typeof fuc：', typeof fuc === 'function');
// 通过原型链判断
console.log('instanceof: ', fuc instanceof Function);
// 通过构造函数判断
console.log('constructor: ', fuc.constructor === Function);
// 通过原型链
console.log("Object.prototype.toString.call()", Object.prototype.toString.call(fuc) === '[object Function]');

// * 判断null
let nul = null
// 通过全等判断
console.log('null === null: ', null === null);
// 通过null的特点：==比较时，null 和 undefined 相等（它们也与其自身相等），除此以外与其他值都不相等
console.log('null特点：', (!nul && typeof (nul) != 'undefined' && nul != 0 && nul == nul));
// 通过原型：原始对象原型的原型即null
console.log('Object.prototype.__proto__：', Object.prototype.__proto__ === nul);
// 通过typeof是对象，且对象类型中只有null转化为布尔类型为false
console.log('typeof: ', typeof nul == 'object' && !nul);

// * 判断NaN：是否是非数字
console.log('isNaN(1): ', isNaN(1)); // false
console.log('isNaN("1"): ', isNaN('1')); // false
console.log('isNaN(true): ', isNaN(true)); // false
console.log('isNaN(null): ', isNaN(null)); // false
console.log('isNaN(""): ', isNaN('')); // false
console.log('isNaN(new Date()): ', isNaN(new Date())); // false
console.log('isNaN(undefined): ', isNaN(undefined)); // true
console.log('isNaN(NaN): ', isNaN(NaN)); // true
// NaN自身永不相等于自身
// var isNaN = function (value) {
//     var n = Number(value);
//     return n !== n;
// };