<template>
    <div>
        <input :type="type" :value="value" @input="onInput" v-bind="$attrs" />
    </div>
</template>

<script>
import emitter from '@/mixins/emitter'

export default {
    inheritAttrs: false,
    name: 'VInput',
    mixins: [emitter],
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
            // this.$parent.$emit('validate')
            this.dispatch('VFormItem', 'validate')
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
