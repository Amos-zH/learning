const MyPromise = require('./myPromise')

const promise = new MyPromise((resolve, reject) => {
    // setTimeout(() => {
        resolve('success')
    // throw new Error('执行器错误')
    // }, 2000)
})

function other () {
    return new MyPromise((resolve, reject) => {
        resolve('other')
    })
}

// const p1 = promise.then(value => {
//     console.log(1)
//     console.log('resolve', value)
//     return p1
// })
// // 运行的时候会走reject
// p1.then(value => {
//     console.log(2)
//     console.log('resolve', value)
// }, reason => {
//     console.log(3)
//     console.log(reason.message)
// })

// promise.then(value => {
//     console.log(1)
//     console.log('resolve', value)
//     return other()
// }).then(value => {
//     console.log(2)
//     console.log('resolve', value)
// })

// promise.then(val => {
//     console.log(1)
//     console.log('resolve', val)
// })
// promise.then(val => {
//     console.log(2)
//     console.log('resolve', val)
// })
// promise.then(val => {
//     console.log(3)
//     console.log('resolve', val)
// })
// .catch(err => {
//     console.log('catch', err)
// })

// promise.then(value => {
//     console.log(1)
//     console.log('resolve', value)
// }, reason => {
//     console.log(2)
//     console.log(reason.message)
// })

// 第一个then方法中的错误要在第二个then方法中捕获到
promise.then(value => {
    console.log(1)
    console.log('resolve', value)
    throw new Error('then error')
}, reason => {
    console.log(2)
    console.log(reason.message)
}).then(value => {
    console.log(3)
    console.log(value);
}, reason => {
    console.log(4)
    console.log(reason.message)
})