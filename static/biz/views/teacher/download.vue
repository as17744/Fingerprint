<template>
    <div>
        <div class="search-part download-search">
            <el-select v-model="searchMonth" placeholder="请选择查询月份">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
                <el-option label="3" value="3"></el-option>
                <el-option label="4" value="4"></el-option>
                <el-option label="5" value="5"></el-option>
                <el-option label="6" value="6"></el-option>
                <el-option label="7" value="7"></el-option>
                <el-option label="8" value="8"></el-option>
                <el-option label="9" value="9"></el-option>
                <el-option label="10" value="10"></el-option>
                <el-option label="11" value="11"></el-option>
                <el-option label="12" value="12"></el-option>
            </el-select>
        </div>
        <div class="get-excel" v-for="item in classes">
            <el-button type="primary" @click="exelDownload(item, 1)">下载{{item}}班考勤报表</el-button>
            <el-button type="primary" @click="exelDownload(item, 2)">下载{{item}}班汇总报表</el-button>
        </div>
    </div>
</template>
<script>
    import zstuAjax from '../../../lib/zstuAjax';
    export default {
        data() {
            return {
                classes: [],
                searchMonth: ''
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
            exelDownload(id, type) {
                if (type === 1) {
                    zstuAjax('/excel', {
                        id,
                        month: this.searchMonth
                    }, 'GET').then((res) => {
                        window.location.href = res.path;
                    });
                } else if (type === 2) {
                    zstuAjax('/conclude', {
                        id,
                        month: this.searchMonth
                    }, 'GET').then((res) => {
                        window.location.href = res.path;
                    });
                }
            }
        },
        mounted() {
            this.init();
        }
    }
</script>
<style lang="less">
    .download-search {
        margin-bottom: 20px;
    }
    .get-excel {
        margin-bottom: 20px;
    }
</style>