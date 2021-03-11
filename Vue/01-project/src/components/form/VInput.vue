<template>
    <div>
        <input :type="type" :value="value" @input="onInput" v-bind="$attrs" />
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    name: 'VInput',
    props: {
        type: {
            type: String,
            default: 'text'
        },
        value: {
            type: String,
            default: ''
        }
    },
    methods: {
        onInput (e) {
            this.$emit('input', e.target.value)
            // 验证
            this.$parent.$emit('validate')
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
