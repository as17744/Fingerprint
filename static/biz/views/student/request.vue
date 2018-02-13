<template>
    <div>
        <el-table :data="failArr">
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column prop="start" label="进入实验室打卡"></el-table-column>
            <el-table-column prop="end" label="离开实验室打卡"></el-table-column>
            <el-table-column>
                <template slot-scope="s">
                    <el-button type="primary" @click="showDialog(s.row.date, s.row.start, s.row.end)">申请</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="title" :visible.sync="dialogFormVisible">
            <el-form>
                <el-form-item label="进入实验室时间" v-if="startShow">
                    <el-time-picker v-model="start">
                    </el-time-picker>
                </el-form-item>
                <el-form-item label="离开实验室时间" v-if="endShow">
                    <el-time-picker v-model="end">
                    </el-time-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import zstuAjax from '../../../lib/zstuAjax';
    export default {
        data() {
            return {
                failArr: [],
                modifyDate: '',
                start: '',
                end: '',
                dialogFormVisible: false,
                startShow: false,
                endShow: false,
                title: ''
            }
        },
        methods: {
            init() {
                zstuAjax('/needReq', {}, 'GET').then((res) => {
                    this.failArr.splice(0);
                    this.failArr = this.failArr.concat(res.data);
                })
            },
            showDialog(date, start, end) {
                this.modifyDate = date;
                this.startShow = false;
                this.endShow = false;
                this.start = '';
                this.end = '';
                this.title = `发起${this.modifyDate}忘打卡申请`;
                if (!start) {
                    this.startShow = true;
                } else {
                    this.start = start;
                }
                if (!end) {
                    this.endShow = true;
                } else {
                    this.end = end;
                }
                this.dialogFormVisible = true;
            },
            confirm() {
                if (!this.start || !this.end) {
                    this.$message.error('请输入进入和离开实验室时间');
                } else {
                    const obj = {};
                    if (!this.startShow) {
                        obj.start = this.start;
                    } else {
                        const sh = this.start.getHours();
                        const sm = this.start.getMinutes();
                        const ss = this.start.getSeconds();
                        obj.start = `${sh}:${sm}:${ss}`;
                    }
                    if (!this.endShow) {
                        obj.end = this.end;
                    } else {
                        const eh = this.end.getHours();
                        const em = this.end.getMinutes();
                        const es = this.end.getSeconds();
                        obj.end = `${eh}:${em}:${es}`;
                    }
                    obj.date = this.modifyDate;
                    zstuAjax('/addReq', obj, 'GET').then((res) => {
                        if (res.success) {
                            this.$message({
                                type: 'success',
                                message: '请求发起成功'
                            })
                            this.dialogFormVisible = false;
                        } else {
                            this.$message.error(res.message);
                        }
                    })
                }
            }
        },
        mounted(){
            this.init();
        }
    }
</script>
<style lang="less"></style>