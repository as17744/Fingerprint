<template>
    <el-table :data="restList">
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="id" label="学号">
        </el-table-column>
        <el-table-column prop="date" label="学号">
        </el-table-column>
        <el-table-column prop="reason" label="请假理由">
                <template slot-scope="s">
                    <el-button type="primary" size="mini" round @click="detail(s.row.reason)">查看理由</el-button>
                </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作">
            <template slot-scope="s">
                <el-button type="primary" size="mini" round @click="allow(s.row.id, s.row.date)">批准</el-button>
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
                restList: []
            }
        },
        methods: {
            init() {
                zstuAjax('/vacation', {
                    type: 3
                }, 'GET').then((res) => {
                    this.restList.splice(0);
                    this.restList = this.restList.concat(res.reqList);
                });
            },
            allow(id, date) {
                this.$confirm('是否批准本次假期?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    zstuAjax('/vacation', {
                        type: 2,
                        id,
                        date
                    }).then((res) => {
                        this.init();
                        this.$message({
                            type: 'success',
                            message: '批准成功!'
                        });
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消批准'
                    });          
                });
            },
            refuse(id, date) {
                this.$confirm('是否拒绝批准本次假期?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    zstuAjax('/vacation', {
                        type: 4,
                        id,
                        date
                    }).then((res) => {
                        this.init();
                        this.$message({
                            type: 'success',
                            message: `${res.message}`
                        });
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消操作'
                    });          
                });
            },
            detail(reason) {
                this.$alert(reason, '请假理由', {
                    confirmButtonText: '确定'
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