<template>
    <div>
        <slot />
    </div>
</template>

<script>
export default {
    name: 'VForm',
    provide () {
        return {
            form: this
        }
    },
    props: {
        model: {
            type: Object,
            required: true
        },
        rules: Object
    },
    methods: {
        validate (cb) {
            // 校验所有表单项
            const tasks = this.$children
                .filter(i => i.prop) // 筛选出有prop的选项
                .map(i => i.validate()) // 执行验证函数

            Promise.all(tasks)
                .then(() => cb(true))
                .catch(() => cb(false))
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
