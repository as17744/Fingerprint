<template>
    <el-table :data="requestArr">
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="id" label="学号">
        </el-table-column>
        <el-table-column prop="className" label="班级">
        </el-table-column>
        <el-table-column prop="date" label="修改日期">
        </el-table-column>
        <el-table-column prop="start" label="实际开始打卡时间">
        </el-table-column>
        <el-table-column prop="end" label="实际开始离开时间">
        </el-table-column>
        <el-table-column prop="operation" label="操作">
            <template slot-scope="s">
                <el-button type="primary" size="mini" round @click="allow(s.row.id, s.row.date, s.row.start, s.row.end)">批准</el-button>
                <el-button type="warning" size="mini" round @click="refuse(s.row.id, s.row.date)">拒绝</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
    import zstuAjax from '../../../lib/zstuAjax';
    export default {
        data() {
            return {
                requestArr: []
            }
        },
        methods: {
            init() {
                zstuAjax('/getRequests', {}, 'GET').then((res) => {
                    this.requestArr.splice(0);
                    this.requestArr = this.requestArr.concat(res.data);
                });
            },
            allow(id, date, start, end) {
                zstuAjax('/allowReq', {
                    id,
                    date,
                    start,
                    end
                }, 'GET').then((res) => {
                    this.$message({
                        type: 'success',
                        message: '已经批准'
                    });
                    this.init();
                });
            },
            refuse(id, date) {
                zstuAjax('/deleteReq', {
                    id,
                    date
                }, 'GET').then((res) => {
                    this.$message({
                        type: 'success',
                        message: '已经删除本次请求'
                    });
                    this.init();
                });
            }
        },
        mounted() {
            this.init();
        }
    }
</script>
<style lang="less">

</style>