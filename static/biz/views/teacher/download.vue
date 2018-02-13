<template>
    <div>
        <div class="get-excel" v-for="item in classes"><el-button type="primary" @click="exelDownload(item)">下载本月{{item}}班考勤报表</el-button></div>
    </div>
</template>
<script>
    import zstuAjax from '../../../lib/zstuAjax';
    export default {
        data() {
            return {
                classes: []
            }
        },
        methods: {
            init() {
                zstuAjax('/checkT', {type: 1}, 'GET').then((res) => {
                    const classes = JSON.parse(res.classes);
                    this.classes.splice(0);
                    this.classes = this.classes.concat(classes);
                });
            },
            exelDownload(id) {
                zstuAjax('/excel', {
                    id
                }, 'GET').then((res) => {
                    window.location.href = res.path;
                });
            }
        },
        mounted() {
            this.init();
        }
    }
</script>
<style lang="less">
    .get-excel {
        float: left;
        margin-left: 10px;
    }
</style>