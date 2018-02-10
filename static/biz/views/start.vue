<template>
    <div>
        <div class="reg-form" v-if="state === 2">
            <div class="title">注册</div>
            <div class="form-wrapper">
                <el-form ref="form2" :model="regForm">
                    <el-form-item label="姓名" prop="name" required>
                        <el-input class="e-input" v-model="regForm.name" placeholder="请输入姓名" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="账号" prop="id" required>
                        <el-input class="e-input" v-model="regForm.id" placeholder="学生输入学号，教师输入工号" clearable></el-input>
                        <el-tooltip class="item" effect="dark" content="学生输入学号，教师输入工号" placement="top-start">
                            <i class="el-icon-question"></i>
                        </el-tooltip>
                    </el-form-item>
                    <el-form-item label="身份" prop="type" required>
                        <el-radio-group v-model="regForm.type">
                            <el-radio label="2">教师</el-radio>
                            <el-radio label="1">学生</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="班级" v-if="+regForm.type === 1" prop="clas" required>
                        <el-select v-model="regForm.clas" placeholder="选择你的班级">
                            <el-option v-for="item in classes" :label="item.name" :value="item.id" :key="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="授课班级" v-if="+regForm.type === 2" prop="classes" required>
                        <el-checkbox-group v-model="regForm.classes">
                            <el-checkbox v-for="item in classes" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass" required>
                        <el-input class="e-input" v-model="regForm.pass" type="password" placeholder="请输入密码" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="重复密码" prop="flagPass" required>
                        <el-input class="e-input" v-model="regForm.flagPass" type="password" placeholder="请重复输入密码" clearable></el-input>
                    </el-form-item>
                </el-form>
                <div class="btt-part">
                    <el-button type="primary" @click="back">返回</el-button>
                    <el-button type="success" @click="reg">注册</el-button>
                </div>
            </div>
        </div>
        <div class="log-form" v-if="state === 1">
            <div class="title">登陆</div>
            <div class="form-wrapper">
                <el-form ref="form" :model="form">
                    <el-form-item label="账号" prop="id">
                        <el-input class="e-input" v-model="form.id" placeholder="学生输入学号，教师输入工号" clearable></el-input>
                        <el-tooltip class="item" effect="dark" content="学生输入学号，教师输入工号" placement="top-start">
                            <i class="el-icon-question"></i>
                        </el-tooltip>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input class="e-input" v-model="form.password" type="password" placeholder="请输入密码" clearable></el-input>
                    </el-form-item>
                </el-form>
                <div class="btt-part">
                    <el-button type="primary" @click="register">注册</el-button>
                    <el-button type="success" @click="login">登陆</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import zstuAjax from '../../lib/zstuAjax';
    export default {
        data() {
            return {
                state: 1,
                classes: [],
                form: {
                    account: '',
                    password: ''
                },
                regForm: {
                    type: '',
                    name: '',
                    id: '',
                    classes: [],
                    clas: '',
                    flagPass: '',
                    pass: ''
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
            back() {
                this.state = 1;
            },
            reg() {
                if (!this.regForm.type) {
                    this.$message.error('请选择自己的身份！');
                } else if (!this.regForm.name) {
                    this.$message.error('请输入姓名！');
                } else if (!this.regForm.id) {
                    this.$message.error('请输入自己的学号或工号！');
                } else if (!this.regForm.pass) {
                    this.$message.error('请输入密码！');
                } else if (this.regForm.pass !== this.regForm.flagPass) {
                    this.$message.error('两次密码不一致！');
                } else {
                    zstuAjax('/add', {
                        name: this.regForm.name,
                        id: this.regForm.id,
                        pass: this.regForm.pass,
                        type: this.regForm.type,
                        classes: JSON.stringify(this.regForm.classes),
                        clas: '' + this.regForm.clas
                    }, 'GET').then((res) => {
                        if (res.success) {
                            this.$message({
                                message: res.message,
                                type: 'success'
                            });
                            this.state = 1;
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                }
            },
            register() {
                zstuAjax('/getClasses', {}, 'GET').then((res) => {
                    this.state = 2;
                    this.regForm = Object.assign({}, {
                        type: '',
                        name: '',
                        id: '',
                        classes: [],
                        clas: '',
                        pass: '',
                        flagPass: ''
                    });
                    this.classes = [].concat(res.data);
                });
            },
            login() {
                zstuAjax('/login', {
                    id: this.form.id,
                    pass: this.form.password
                }, 'GET').then((res) => {
                    if (res.success) {
                        if (+res.type === 3) {
                            this.$router.push('/manager');
                        } else if (+res.type === 2) {
                            this.$router.push('/teacher');
                        }
                    } else {
                        this.$message.error(res.message);
                    }
                })
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
        overflow-y: scroll; 
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
        width: 400px;
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
