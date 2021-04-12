// 1、Promise是一个类
// 2、执行Promise这个类的时候会传入一个执行器，立即执行
// 3、promise有三种状态：Pending（等待），Fulfilled（成功），Rejected（失败）
// 4、状态只能由Pending->Fulfilled，Pending->Rejected，且状态一旦变更不能修改
// 5、promise使用resolve，reject两个函数来改变状态
// 6、then方法根据状态调用回调函数：状态为成功调用成功的回调函数；状态失败调用失败的回调函数

// 定义三个状态
const Pending = 'pending'
const Fulfilled = 'fulfilled'
const Rejected = 'rejected'

// 新建MyPromise类
class MyPromise {
    constructor(executor) {
        // executor是执行器，立即执行
        // 传入resolve，reject函数
        try {
            executor(this.resolve, this.reject)
        } catch (error) {
            this.reject(error)
        }
    }
    // 内部维持一个状态，初始值是pending
    status = Pending
    // 成功之后的值
    value = null
    // 失败之后的原因
    reason = null
    // 缓存成功之后的回调函数
    onFulfilledCallBacks = []
    // 缓存失败之后的回调函数
    onRejectedCallBacks = []
    // resolve和reject函数为什么用箭头函数
    // 如果直接调用的话，普通函数的this指向window或者undefined
    // 箭头函数就可以指向当前实例

    // 更改成功后的状态
    resolve = (val) => {
        // 只有状态是等待才能转变状态
        if (this.status === Pending) {
            // 保存成功后的值
            this.value = val
            // 把状态改成成功
            this.status = Fulfilled
            // resolve里面将所有成功的回调拿出来执行
            while (this.onFulfilledCallBacks.length) {
                // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
                this.onFulfilledCallBacks.shift()(val)
            }
        }
    }
    // 更改失败后的状态
    reject = (err) => {
        // 只有状态是等待才能改变状态
        if (this.status === Pending) {
            // 保存失败的原因
            this.reason = err
            // 把状态改成失败
            this.status = Rejected
            // resolve里面将所有失败的回调拿出来执行
            while (this.onRejectedCallBacks.length) {
                this.onRejectedCallBacks.shift()(err)
            }
        }
    }
    then (onFulfilled, onRejected) {
        // 如果不传就是用默认函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}
        // 为了链式调用这里直接创建一个 MyPromise，并在后面 return 出去
        const promise2 = new MyPromise((resolve, reject) => {
            // 判断状态
            if (this.status === Fulfilled) {
                // 创建一个微任务等待 promise2 完成初始化
                queueMicrotask(() => {
                    try {
                        // 调用成功状态的回调，把值返回
                        const a = onFulfilled(this.value)
                        // 传入 resolvePromise 集中处理
                        resolvePromise(promise2, a, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            } else if (this.status === Rejected) {
                queueMicrotask(() => {
                    try {
                        // 调用失败状态的回调，把信息返回
                        const a = onRejected(this.reason)
                        // 传入 resolvePromise 集中处理
                        resolvePromise(promise2, a, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            } else if (this.status === Pending) {
                // 等待
                // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存起来

                // 等待执行成功函数的时候再传递
                this.onFulfilledCallBacks.push(() => {
                    queueMicrotask(() => {
                        try {
                            // 获取成功回调函数的执行结果
                            const a = onFulfilled(this.value)
                            // 传入 resolvePromise 集中处理
                            resolvePromise(promise2, a, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    })
                })
                // 等待执行失败函数的时候再传递
                this.onRejectedCallBacks.push(() => {
                    queueMicrotask(() => {
                        try {
                            // 调用失败回调，把原因返回
                            const a = onRejected(this.reason)
                            // 传入 resolvePromise 集中处理
                            resolvePromise(promise2, a, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    })
                })
                // this.onFulfilledCallBack = onFulfilled
                // this.onRejectedCallBack = onRejected
            }
        })
        return promise2
    }
    // catch (onCatched) {
    //     if (this.status === Rejected) {
    //         onCatched(this.reason)
    //     }
    // }
}

function resolvePromise(promise2, x, resolve, reject) {
    // 如果相等了，说明return的是自己，抛出类型错误并返回
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    // 判断x是否为MyPromise实例对象
    if (x instanceof MyPromise) {
        x.then(resolve, reject)
    } else {
        // 普通值
        resolve(x)
    }
}

module.exports = MyPromise