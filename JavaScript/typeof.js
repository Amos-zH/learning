/*
 * @手写typeof
 * @Author: Amos 
 * @Date: 2021-04-09 14:19:46 
 * @Last Modified by: Amos
 * @Last Modified time: 2021-04-11 12:26:39
 */

Object.prototype.toString.call(1)               // "[object Number]"
Object.prototype.toString.call('hi')            // "[object String]"
Object.prototype.toString.call({ a: 'hi' })     // "[object Object]"
Object.prototype.toString.call([1, 'a'])        // "[object Array]"
Object.prototype.toString.call(true)            // "[object Boolean]"
Object.prototype.toString.call(() => { })       // "[object Function]"
Object.prototype.toString.call(null)            // "[object Null]"
Object.prototype.toString.call(undefined)       // "[object Undefined]"
Object.prototype.toString.call(Symbol(1))       // "[object Symbol]"

function MyTypeof (x) {
    const typeString = Object.prototype.toString.call(x).split(' ')[1]
    const target = typeString.substring(0, typeString.length - 1).toLowerCase()
    return target
}
console.log('MyTypeof(1): ', MyTypeof(1)); // number
console.log('MyTypeof("ada"): ', MyTypeof('ada')); // string
console.log('MyTypeof({}): ', MyTypeof({})); // object
console.log('MyTypeof([]): ', MyTypeof([])); // array
console.log('MyTypeof(() => {}): ', MyTypeof(() => {})); // function
console.log('MyTypeof(new Date()): ', MyTypeof(new Date())); // date