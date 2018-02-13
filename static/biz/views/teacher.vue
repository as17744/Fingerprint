<template>
    <div>
        <el-container v-if="allow">
            <el-aside width="200px">
                <el-menu default-active="1" class="el-menu-vertical" @select="handleSelect">
                    <el-menu-item index="1">
                        <i class="el-icon-setting"></i>
                        <span slot="title">时间设置</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-edit"></i>
                        <span slot="title">忘打卡审批</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-download"></i>
                        <span slot="title">报表下载</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">密码修改</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main class="main">
                <Timeset v-if="key === 1"></Timeset>
                <Approve v-if="key === 2"></Approve>
                <Download v-if="key === 3"></Download>
                <Password v-if="key === 4"></Password>
            </el-main>
        </el-container>
        <div class="info">你好， {{name}}老师</div>
        <div class="no-allow" v-if="!allow">
            <div class="content">
                <img src="//local.zstu.com/src/cry.png" class="cry" />
                <span class="content-text">权限不足，请尽快通知管理员开放您的权限！</span>
            </div>
        </div>
        <Back></Back>
    </div>
</template>
<script>
    import _ from 'lodash';
    import zstuAjax from '../../lib/zstuAjax';
    import Timeset from './teacher/timeset.vue';
    import Approve from './teacher/approve.vue';
    import Download from './teacher/download.vue';
    import Password from './common/password.vue';
    import Back from './common/back.vue';
    export default {
        data() {
            return {
                key: 1,
                allow: false,
                name: ''
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
                    zstuAjax('/checkT', {}, 'GET').then((res) => {
                        if (res.status === 0) {
                            this.allow = false;
                        } else {
                            this.allow = true;
                        }
                    })
                }
            })
        },
        components: {
            Timeset,
            Approve,
            Download,
            Password,
            Back
        }
    }
</script>
<style lang="less">
    .info {
        position: fixed;
        left: 10px;
        bottom: 50px;
        font-size: 20px; 
        font-weight: 900;
        color: #4F94CD;
    }
    .main {
        background: #fff;
    }
    .no-allow {
        overflow: hidden;
        width: 100%;
        height: 800px;
        background: #fff;
        .content {
            margin-top: 200px;
            text-align: center;
        }
        .cry {
            width: 100px;
            height: 100px;
        }
        .content-text {
            font-size: 50px;
            line-height: 100px;
            color: #80a9d3;
        }
    }
</style>
