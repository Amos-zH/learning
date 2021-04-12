/*
 * @Author: Amos
 * @Date: 2021-04-12 09:50:55
 * @LastEditTime: 2021-04-12 10:23:13
 * @LastEditors: Please set LastEditors
 * @Description: 数组扁平化
 */
const arr = [0, 1, 2, [3, 4]];
console.log(arr.flat());

function flatArr (arr) {
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            newArr = newArr.concat(flatArr(arr[i]))
        } else {
            newArr.push(arr[i])
        }
    }
    return newArr
}
console.log(flatArr(arr));