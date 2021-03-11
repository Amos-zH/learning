<template>
    <div>
        <label v-if="label" for="">{{ label }}</label>
        <slot />
        <div v-if="error" class="error">{{ error }}</div>
    </div>
</template>

<script>
import Validator from 'async-validator'

export default {
    name: 'VFormItem',
    inject: ['form'],
    props: {
        label: {
            type: String,
            default: ''
        },
        prop: {
            type: String,
            default: ''
        }
    },
    mounted () {
        this.$on('validate', () => {
            this.validate()
        })
    },
    data () {
        return {
            error: ''
        }
    },
    methods: {
        validate () {
            // 获取校验规则
            const rule = this.form.rules[this.prop]
            // 获取值
            const value = this.form.model[this.prop]
            // 创建校验器
            const validator = new Validator({ [this.prop]: rule })
            // 执行校验，返回一个promise
            return validator.validate({ [this.prop]: value }, (errors) => {
                if (errors) {
                    console.log(errors)
                    this.error = errors[0].message
                } else {
                    this.error = ''
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.error {
    color: red;
}
</style>
