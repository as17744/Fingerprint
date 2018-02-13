<template>
    <div>
        <el-container>
            <el-aside width="200px">
                <el-menu default-active="1" class="el-menu-vertical" @select="handleSelect">
                    <el-menu-item index="1">
                        <i class="el-icon-date"></i>
                        <span slot="title">本月打卡详情</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-edit"></i>
                        <span slot="title">忘打卡请求</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-setting"></i>
                        <span slot="title">密码修改</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main class="main">
                <Detail v-if="key === 1"></Detail>
                <Request v-if="key === 2"></Request>
                <Password v-if="key === 3"></Password>
            </el-main>
        </el-container>
        <div class="hello">你好，{{name}}同学</div>
        <Back></Back>
    </div>
</template>
<script>
    import Back from './common/back.vue';
    import Detail from './student/detail.vue';
    import Request from './student/request.vue';
    import Password from './common/password.vue';
    import zstuAjax from '../../lib/zstuAjax';
    export default {
        data() {
            return {
                name: '',
                key: 1
            }
        },
        methods: {
            handleSelect(index) {
                this.key = +index;
            }
        },
        created() {
            zstuAjax('/check', {}, 'GET').then((res) => {
                if (!res.success) {
                    this.$router.push('/');
                } else {
                    this.name = res.name;
                }
            })
        },
        components: {
            Back,
            Password,
            Detail,
            Request
        }
    }
</script>
<style lang="less">
    .hello {
        position: fixed;
        left: 10px;
        bottom: 50px;
        font-size: 20px; 
        font-weight: 900;
        color: #4F94CD;
    }
</style>