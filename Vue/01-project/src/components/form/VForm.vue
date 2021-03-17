<template>
    <div>
        <slot />
    </div>
</template>

<script>
export default {
    name: 'VForm',
    componentName: 'VForm',
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
    created () {
        this.fields = []
        this.$on('el.form.addField', item => {
            item && this.fields.push(item)
        })
        this.$on('el.form.removeField', item => {
            item.prop && this.fields.splice(this.fields.indexOf(item), 1)
        })
    },
    methods: {
        validate (cb) {
            // 校验所有表单项
            // const tasks = this.$children
            //     .filter(i => i.prop) // 筛选出有prop的选项
            //     .map(i => i.validate()) // 执行验证函数
            const tasks = this.fields.map(i => i.validate())
            let a = ''
            Promise.all(tasks)
                .then(() => {
                    a = true
                    cb(a)
                })
                .catch(() => {
                    a = false
                    cb(a)
                })
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
