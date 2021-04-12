/*
 * @数组去重
 * @Author: Amos 
 * @Date: 2021-04-11 12:45:08 
 * @Last Modified by: Amos
 * @Last Modified time: 2021-04-11 16:05:13
 */

let arr = [1,2,3,2,2,1,5,6]

// 利用indexof，把唯一的元素放进新数组
function singleArr01 (arr) {
    let newArr = []
    arr.forEach(item => {
        newArr.indexOf(item) === -1 && newArr.push(item)
    })
    return newArr
}
// 类似方法1，利用includes判断新数组中是否有某个值，返回true或false
function singleArr02 (arr) {
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
        !newArr.includes(arr[i]) && newArr.push(arr[i])
    }
    return newArr
}
// 利用循环时，当前元素的下标需要与该元素在数组中第一次出现的下标一致来判断唯一性
function singleArr03 (arr) {
    var res = arr.filter(function (item, index, array) {
        return array.indexOf(item) === index
    })
    return res
}
// 利用双层for循环，外层循环元素，内层循环比较，值相同就把这个值从数组中删除
function singleArr04 (arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] === arr[j]) {
                arr.splice(j, 1)
                j--
            }
        }
    }
    return arr
}
// 利用sort排序，把相同的元素放在一起，再依次相邻比较，值不同则放入新数组
function singleArr05 (arr) {
    arr = arr.sort()
    const newArr = [arr[0]]
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] !== arr[i - 1]) {
            newArr.push(arr[i])
        }
    }
    return newArr
}
// 利用ES6的Set
function singleArr06 (arr) {
    return Array.from(new Set(arr))
}
function singleArr07 (arr) {
    return [...new Set(arr)]
}

console.log('singleArr01(arr): ', singleArr01(arr))
console.log('singleArr02(arr): ', singleArr02(arr))
console.log('singleArr03(arr): ', singleArr03(arr))
console.log('singleArr04(arr): ', singleArr04(arr))
console.log('singleArr05(arr): ', singleArr05(arr))
console.log('singleArr06(arr): ', singleArr06(arr))
console.log('singleArr07(arr): ', singleArr07(arr))