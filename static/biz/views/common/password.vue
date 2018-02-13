<template>
    <div>
        <el-form>
            <el-form-item label="新密码">
                <el-input class="e-input" v-model="password" type="password" placeholder="请输入密码" clearable></el-input>
            </el-form-item>
            <el-form-item label="重复输入密码">
                <el-input class="e-input" v-model="reenter" type="password" placeholder="请重复输入密码" clearable></el-input>
            </el-form-item>
        </el-form>
        <el-button type="success" @click="confirm">确定</el-button>
    </div>
</template>
<script>
    import zstuAjax from '../../../lib/zstuAjax';
    export default {
        data() {
            return {
                password: '',
                reenter: ''
            }
        },
        methods: {
            confirm() {
                if (!this.password) {
                    this.$message.error('请输入新密码');
                } else if (!this.reenter) {
                    this.$message.error('请重复输入密码');
                } else if (this.password !== this.reenter) {
                    this.$message.error('两次密码不一致');
                } else {
                    zstuAjax('/modify', {
                        pass: this.password
                    }, 'GET').then((res) => {
                        if (res.success) {
                            this.$message({
                                message: res.message,
                                type: 'success'
                            });
                        } else {
                            this.$message.error(res.message);
                        }
                    })
                }
            }
        }
    }
</script>
<style lang="less"></style>