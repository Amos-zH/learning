function defineReactive (obj, key, val) {
    observe(val) // 如果val是object则需要递归
    Object.defineProperty(obj, key, {
        get () {
            console.log('get', val)
            return val
        },
        set (newVal) {
            console.log('set', newVal)
            observe(newVal) // 如果新添加的属性值是对象，也需要遍历
            val = newVal
        }
    })
}

function observe (obj) {
    // 如果不是对象则直接返回
    if (typeof obj !== 'object' || obj === null) {
        return obj
    }
    // 是对象则遍历循环每个属性并调用defineReactive
    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key])
    })
}

function set (obj, key, val) {
    defineReactive(obj, key, val)
}

const obj = { a: '1', b: '2', c: { d: '3' } }

observe(obj)

// obj.a = 'new val'
// obj.c.d = '4'
// obj.c = { e: '4' }
// obj.c.e = '555'
set(obj, 'abc', 'abc')
obj.abc = 'abcd'
