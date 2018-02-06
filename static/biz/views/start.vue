<template>
    <div>
        <div class="reg-form" v-if="state === 2">
            <div class="title">注册</div>
        </div>
        <div class="log-form" v-if="state === 1">
            <div class="title">登陆</div>
            <div class="form-wrapper">
                <el-form ref="form" :model="form">
                    <el-form-item label="账号" prop="account">
                        <el-input class="e-input" v-model="form.account" placeholder="请输入账号" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input class="e-input" v-model="form.password" type="password" placeholder="请输入密码" clearable></el-input>
                    </el-form-item>
                </el-form>
                <div class="btt-part">
                    <el-button type="primary" @click="register">注册</el-button>
                    <el-button type="success">登陆</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                state: 1,
                form: {
                    account: '',
                    password: ''
                }
            }
        },
        mounted() {
            this.form = Object.assign({}, {
                account: '',
                password: ''
            });
        },
        methods: {
            register() {
                this.state = 2;
            }
        }
    }
</script>
<style lang="less">
    @import '../reset.less';
    .reset();
    html {
        height: 100%;
        overflow: hidden;
        background: url('//local.zstu.com/src/back.png') no-repeat;
        background-size: 100% 100%;
    }
    .e-input {
        width: 300px;
    }
    .reg-form {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -300px;
        margin-left: -250px;
        width: 500px;
        height: 600px;
        background: #fff;
        border: 1px solid #DEDEDE;
        border-radius: 5px;
    }
    .log-form {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -150px;
        margin-left: -300px;
        width: 600px;
        height: 300px;
        background: #fff;
        border: 1px solid #DEDEDE;
        border-radius: 5px;
    }
    .form-wrapper {
        overflow: hidden;
        box-sizing: border-box;
        margin: 50px auto;
        width: 350px;
        .btt-part {
            text-align: center;
        }
    }
    .title {
        margin-top: 10px;
        text-align: center;
        font-size: 32px;
        letter-spacing: 15px;
        color: #252172;
    }
</style>
