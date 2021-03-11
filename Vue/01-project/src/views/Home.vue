<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <!-- <HelloWorld msg="Welcome to Your Vue.js App" aaa="what vue" /> -->
        <v-form :model="form" :rules="rules" ref="loginForm">
            <v-form-item label="账号" prop="account">
                <v-input v-model="form.account" placeholder="请输入账号"></v-input>
            </v-form-item>
            <v-form-item label="密码" prop="password">
                <v-input
                    v-model="form.password"
                    placeholder="请输入密码"
                    type="password"
                ></v-input>
            </v-form-item>
            <v-form-item><button @click="login">登录</button></v-form-item>
        </v-form>
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import VInput from '@/components/form/VInput'
import VFormItem from '../components/form/VFormItem.vue'
import VForm from '../components/form/VForm.vue'

export default {
    name: 'Home',
    components: {
        // HelloWorld
        VInput,
        VFormItem,
        VForm
    },
    data () {
        return {
            form: {
                account: '',
                password: ''
            },
            rules: {
                account: [{ required: true, message: '账号不能为空！' }],
                password: [{ required: true, message: '密码不能为空！' }]
            }
        }
    },
    methods: {
        login () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    console.log('登录成功！')
                } else {
                    console.log('登录失败！')
                }
            })
        }
    }
}
</script>
